#include "send_slab.h"
#include "log.h"

#include <string.h>
#include <stdlib.h>

#ifdef __linux__
#include <sys/socket.h>
#include <netinet/udp.h>   /* UDP_SEGMENT, SOL_UDP */
#endif

/* ---- GSO probe --------------------------------------------------------- */

#ifdef __linux__
#ifndef UDP_SEGMENT
#define UDP_SEGMENT 103
#endif
#ifndef SOL_UDP
#define SOL_UDP 17
#endif

static int probe_gso(void) {
    int fd = socket(AF_INET, SOCK_DGRAM, 0);
    if (fd < 0) return 0;

    /* Probe via actual sendmsg with UDP_SEGMENT cmsg, not setsockopt.
     * WSL2 rejects setsockopt(UDP_SEGMENT) but accepts the cmsg. */
    struct sockaddr_in dst;
    memset(&dst, 0, sizeof(dst));
    dst.sin_family = AF_INET;
    dst.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
    dst.sin_port = htons(0);  /* port 0 = will fail sendmsg but after cmsg parse */

    char data[2] = {0, 0};
    struct iovec iov = { data, 2 };

    char cmsg_buf[CMSG_SPACE(sizeof(uint16_t))];
    struct msghdr mh;
    memset(&mh, 0, sizeof(mh));
    mh.msg_name = &dst;
    mh.msg_namelen = sizeof(dst);
    mh.msg_iov = &iov;
    mh.msg_iovlen = 1;
    mh.msg_control = cmsg_buf;
    mh.msg_controllen = sizeof(cmsg_buf);

    struct cmsghdr *cm = CMSG_FIRSTHDR(&mh);
    cm->cmsg_level = SOL_UDP;
    cm->cmsg_type = UDP_SEGMENT;
    cm->cmsg_len = CMSG_LEN(sizeof(uint16_t));
    *((uint16_t *)CMSG_DATA(cm)) = 1;

    /* sendmsg to port 0 — may fail with ECONNREFUSED or succeed.
     * What matters: if it returns ENOPROTOOPT, GSO is not supported. */
    int ret = sendmsg(fd, &mh, MSG_NOSIGNAL);
    int err = errno;
    close(fd);

    if (ret >= 0) return 1;                  /* sent successfully */
    if (err == ENOPROTOOPT) return 0;        /* kernel doesn't know UDP_SEGMENT */
    return 1;  /* other errors (ECONNREFUSED, etc.) mean cmsg was accepted */
}
#else
static int probe_gso(void) { return 0; }
#endif

/* ---- Fallback submit (sendmmsg / sendmsg / WSASendTo) ------------------ */

/* Send from the slab's contiguous packed buffer, seg_stride apart */
static int fallback_submit(send_slab_pool_t *pool, int slab_id, int fd,
                           struct sockaddr *addr, socklen_t addrlen) {
    send_slab_t *s = &pool->slabs[slab_id];
    int count = s->seg_count;
    int seg_size = s->seg_size;

    if (count <= 0) return 0;

#ifdef __linux__
    struct mmsghdr msgs[slab_max_segments];
    struct iovec iovecs[slab_max_segments];

    for (int i = 0; i < count; i++) {
        iovecs[i].iov_base = s->buf + (size_t)i * seg_size;
        iovecs[i].iov_len = seg_size;
        memset(&msgs[i], 0, sizeof(msgs[i]));
        msgs[i].msg_hdr.msg_iov = &iovecs[i];
        msgs[i].msg_hdr.msg_iovlen = 1;
        msgs[i].msg_hdr.msg_name = addr;
        msgs[i].msg_hdr.msg_namelen = addrlen;
    }

    int ret = sendmmsg(fd, msgs, count, 0);
    if (ret < 0)
        mylog(log_warn, "slab fallback sendmmsg failed: %s\n", strerror(errno));

#elif defined(__MINGW32__)
    WSAOVERLAPPED ovls[slab_max_segments];
    WSABUF wbufs[slab_max_segments];
    memset(ovls, 0, sizeof(WSAOVERLAPPED) * count);

    for (int i = 0; i < count; i++) {
        wbufs[i].buf = s->buf + (size_t)i * seg_size;
        wbufs[i].len = seg_size;
        DWORD bytesSent = 0;
        WSASendTo((SOCKET)fd, &wbufs[i], 1, &bytesSent, 0,
                  addr, addrlen, &ovls[i], NULL);
    }

#else
    for (int i = 0; i < count; i++) {
        char *p = s->buf + (size_t)i * seg_size;
        if (addr)
            sendto(fd, p, seg_size, 0, addr, addrlen);
        else
            send(fd, p, seg_size, 0);
    }
#endif

    /* Synchronous — slab is free immediately */
    s->in_flight = 0;
    s->seg_count = 0;
    return count;
}

/* ---- GSO submit (Linux 4.18+) ----------------------------------------- */

#ifdef __linux__
static int gso_submit(send_slab_pool_t *pool, int slab_id, int fd,
                      struct sockaddr *addr, socklen_t addrlen) {
    send_slab_t *s = &pool->slabs[slab_id];
    int count = s->seg_count;
    int seg_size = s->seg_size;

    if (count <= 0) return 0;

    /* Single segment — plain sendto, no GSO overhead */
    if (count == 1) {
        int ret;
        if (addr)
            ret = sendto(fd, s->buf, seg_size, 0, addr, addrlen);
        else
            ret = send(fd, s->buf, seg_size, 0);

        s->in_flight = 0;
        s->seg_count = 0;
        return (ret >= 0) ? 1 : 0;
    }

    /* GSO: one sendmsg with UDP_SEGMENT cmsg, contiguous buffer */
    struct iovec iov;
    iov.iov_base = s->buf;
    iov.iov_len = (size_t)count * seg_size;

    char cmsg_buf[CMSG_SPACE(sizeof(uint16_t))];

    struct msghdr mh;
    memset(&mh, 0, sizeof(mh));
    mh.msg_name = addr;
    mh.msg_namelen = addrlen;
    mh.msg_iov = &iov;
    mh.msg_iovlen = 1;
    mh.msg_control = cmsg_buf;
    mh.msg_controllen = sizeof(cmsg_buf);

    struct cmsghdr *cm = CMSG_FIRSTHDR(&mh);
    cm->cmsg_level = SOL_UDP;
    cm->cmsg_type = UDP_SEGMENT;
    cm->cmsg_len = CMSG_LEN(sizeof(uint16_t));
    *((uint16_t *)CMSG_DATA(cm)) = (uint16_t)seg_size;

    int ret = sendmsg(fd, &mh, 0);
    if (ret < 0) {
        mylog(log_debug, "slab GSO sendmsg failed: %s, falling back\n",
              strerror(errno));
        return fallback_submit(pool, slab_id, fd, addr, addrlen);
    }

    s->in_flight = 0;
    s->seg_count = 0;
    return count;
}
#endif

/* ---- Drain / destroy (synchronous backends) ---------------------------- */

static int sync_drain(send_slab_pool_t *pool) {
    (void)pool;
    return 0;
}

static void default_destroy(send_slab_pool_t *pool) {
    (void)pool;
}

/* ---- Public API -------------------------------------------------------- */

int slab_pool_init(send_slab_pool_t *pool, int slab_count,
                   int max_segments, int seg_stride) {
    memset(pool, 0, sizeof(*pool));

    pool->count = slab_count;
    pool->max_segments = max_segments;
    pool->seg_stride = seg_stride;

    pool->slabs = (send_slab_t *)calloc(slab_count, sizeof(send_slab_t));
    if (!pool->slabs) return -1;

    size_t slab_bytes = (size_t)max_segments * seg_stride;
    pool->pool_mem = (char *)calloc(slab_count, slab_bytes);
    if (!pool->pool_mem) {
        free(pool->slabs);
        pool->slabs = NULL;
        return -1;
    }

    for (int i = 0; i < slab_count; i++) {
        pool->slabs[i].buf = pool->pool_mem + i * slab_bytes;
        pool->slabs[i].seg_count = 0;
        pool->slabs[i].seg_size = 0;
        pool->slabs[i].in_flight = 0;
    }

    pool->gso_available = probe_gso();

    /* UDPSPEEDER_NO_GSO=1 disables GSO for A/B benchmarking */
    if (pool->gso_available && getenv("UDPSPEEDER_NO_GSO"))
        pool->gso_available = 0;

#ifdef __linux__
    if (pool->gso_available) {
        mylog(log_info, "slab: UDP GSO available, using GSO send path\n");
        pool->backend.submit = gso_submit;
    } else {
        mylog(log_info, "slab: UDP GSO not available, using sendmmsg fallback\n");
        pool->backend.submit = fallback_submit;
    }
#else
    pool->backend.submit = fallback_submit;
#endif

    pool->backend.drain = sync_drain;
    pool->backend.destroy = default_destroy;

    return 0;
}

int slab_pool_alloc(send_slab_pool_t *pool) {
    for (int i = 0; i < pool->count; i++) {
        if (!pool->slabs[i].in_flight && pool->slabs[i].seg_count == 0)
            return i;
    }
    return -1;
}

int slab_cook_pack_submit(send_slab_pool_t *pool,
                          cook_ctx_t *cook, int do_cook_flag,
                          char **out_arr, int *out_len, int count,
                          int fd, struct sockaddr *addr, socklen_t addrlen) {
    if (count <= 0) return 0;

    /* --- Cook all shards in-place (in their original buffers) --- */
    if (do_cook_flag && cook) {
        /* Force uniform IV length for GSO compatibility */
        int saved_force = cook->force_iv_len;
        if (pool->gso_available && !cook->disable_obscure)
            cook->force_iv_len = cook->iv_max;

        for (int i = 0; i < count; i++)
            do_cook(cook, out_arr[i], out_len[i]);

        cook->force_iv_len = saved_force;
    }

    /* --- Check uniform cooked size (required for GSO) --- */
    int uniform = 1;
    int seg_size = out_len[0];
    for (int i = 1; i < count; i++) {
        if (out_len[i] != seg_size) {
            uniform = 0;
            break;
        }
    }

    /* --- GSO path: pack contiguously into slab, one sendmsg --- */
    if (pool->gso_available && uniform && count > 1) {
        int slab_id = slab_pool_alloc(pool);
        if (slab_id >= 0) {
            send_slab_t *s = &pool->slabs[slab_id];

            /* Pack cooked shards contiguously */
            for (int i = 0; i < count; i++)
                memcpy(s->buf + (size_t)i * seg_size, out_arr[i], seg_size);

            s->seg_count = count;
            s->seg_size = seg_size;

            return pool->backend.submit(pool, slab_id, fd, addr, addrlen);
        }
        /* slab exhausted — fall through to direct send */
    }

    /* --- Fallback: sendmmsg/sendmsg directly from out_arr buffers --- */
#ifdef __linux__
    struct mmsghdr msgs[slab_max_segments];
    struct iovec iovecs[slab_max_segments];

    for (int i = 0; i < count; i++) {
        iovecs[i].iov_base = out_arr[i];
        iovecs[i].iov_len = out_len[i];
        memset(&msgs[i], 0, sizeof(msgs[i]));
        msgs[i].msg_hdr.msg_iov = &iovecs[i];
        msgs[i].msg_hdr.msg_iovlen = 1;
        msgs[i].msg_hdr.msg_name = addr;
        msgs[i].msg_hdr.msg_namelen = addrlen;
    }

    int ret = sendmmsg(fd, msgs, count, 0);
    if (ret < 0)
        mylog(log_warn, "slab direct sendmmsg failed: %s\n", strerror(errno));
    return (ret > 0) ? ret : 0;

#elif defined(__MINGW32__)
    WSAOVERLAPPED ovls[slab_max_segments];
    WSABUF wbufs[slab_max_segments];
    memset(ovls, 0, sizeof(WSAOVERLAPPED) * count);

    int fired = 0;
    for (int i = 0; i < count; i++) {
        wbufs[i].buf = out_arr[i];
        wbufs[i].len = out_len[i];
        DWORD bytesSent = 0;
        int r = WSASendTo((SOCKET)fd, &wbufs[i], 1, &bytesSent, 0,
                          addr, addrlen, &ovls[i], NULL);
        if (r == 0 || WSAGetLastError() == WSA_IO_PENDING)
            fired++;
    }
    return fired;

#else
    int sent = 0;
    for (int i = 0; i < count; i++) {
        int r;
        if (addr)
            r = sendto(fd, out_arr[i], out_len[i], 0, addr, addrlen);
        else
            r = send(fd, out_arr[i], out_len[i], 0);
        if (r >= 0) sent++;
    }
    return sent;
#endif
}

int slab_pool_drain(send_slab_pool_t *pool) {
    return pool->backend.drain(pool);
}

void slab_pool_destroy(send_slab_pool_t *pool) {
    if (pool->backend.destroy)
        pool->backend.destroy(pool);

    free(pool->pool_mem);
    pool->pool_mem = NULL;
    free(pool->slabs);
    pool->slabs = NULL;
}
