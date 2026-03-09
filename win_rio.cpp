#include "win_rio.h"

rio_ctx_t *g_rio_ctx = NULL;

#ifdef __MINGW32__

#include "log.h"
#include <stdlib.h>
#include <string.h>

/* WSAID_MULTIPLE_RIO: {8509e081-96dd-4005-b165-9e2ee8c79e3f} */
static const GUID wsaid_rio = {
    0x8509e081, 0x96dd, 0x4005,
    { 0xb1, 0x65, 0x9e, 0x2e, 0xe8, 0xc7, 0x9e, 0x3f }
};

static int rio_load_functions(rio_ctx_t *ctx) {
    /* Need a temporary socket to query RIO extensions */
    SOCKET s = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
    if (s == INVALID_SOCKET) {
        mylog(log_warn, "rio: socket() failed (%d)\n", WSAGetLastError());
        return -1;
    }

    DWORD bytes = 0;
    ctx->fn.cbSize = sizeof(ctx->fn);
    int ret = WSAIoctl(s, SIO_GET_MULTIPLE_EXTENSION_FUNCTION_POINTER,
                       (void *)&wsaid_rio, sizeof(wsaid_rio),
                       &ctx->fn, sizeof(ctx->fn), &bytes, NULL, NULL);
    closesocket(s);

    if (ret == SOCKET_ERROR) {
        mylog(log_info, "rio: WSAIoctl failed (%d) — RIO not available\n",
              WSAGetLastError());
        return -1;
    }
    if (bytes != sizeof(ctx->fn)) {
        mylog(log_warn, "rio: function table size mismatch (%lu vs %lu)\n",
              (unsigned long)bytes, (unsigned long)sizeof(ctx->fn));
        return -1;
    }

    mylog(log_info, "rio: function table loaded\n");
    return 0;
}

/* Encode tag_type + slot index into RequestContext for completions.
 * Bit 63 = 1 for send, 0 for recv. Bits 7:0 = tag_type. Bits 31:8 = slot. */
static inline PVOID rio_encode_recv_ctx(uint8_t tag_type, int slot) {
    return (PVOID)(uintptr_t)((uint64_t)slot << 8 | tag_type);
}
static inline PVOID rio_encode_send_ctx(int slot) {
    return (PVOID)(uintptr_t)((uint64_t)1 << 63 | (uint64_t)slot << 8 | 0xFF);
}
static inline int rio_is_send(ULONGLONG ctx) { return (ctx >> 63) & 1; }
static inline uint8_t rio_get_tag(ULONGLONG ctx) { return (uint8_t)(ctx & 0xFF); }
static inline int rio_get_slot(ULONGLONG ctx) { return (int)((ctx >> 8) & 0x7FFFFF); }

int rio_init(rio_ctx_t *ctx, int recv_per_socket, int send_count,
             int recv_buf_size, int send_buf_size) {
    memset(ctx, 0, sizeof(*ctx));
    ctx->available = 0;
    ctx->cq = RIO_INVALID_CQ;

    if (getenv("UDPSPEEDER_NO_RIO")) {
        mylog(log_info, "rio: disabled by UDPSPEEDER_NO_RIO\n");
        return -1;
    }

    if (rio_load_functions(ctx) < 0) return -1;

    /* Max recv buffers = 4 sockets * recv_per_socket (generous headroom) */
    int max_recv = 4 * recv_per_socket;
    /* CQ must hold all outstanding recv + send completions across all sockets.
     * 4 sockets × recv_per_socket recvs + send_count sends + headroom. */
    int cq_size = max_recv + send_count + 256;

    /* Create shared completion queue */
    ctx->cq = ctx->fn.RIOCreateCompletionQueue(cq_size, NULL);
    if (ctx->cq == RIO_INVALID_CQ) {
        mylog(log_warn, "rio: CreateCompletionQueue failed (%d)\n",
              WSAGetLastError());
        return -1;
    }

    /* --- Recv buffer pool --- */
    ctx->recv_count = max_recv;
    ctx->recv_buf_size = recv_buf_size;
    ctx->recv_pool = (char *)calloc(max_recv, recv_buf_size);
    ctx->recv_addr_pool = (char *)calloc(max_recv, RIO_ADDR_SIZE);
    ctx->recv_slots = (rio_recv_slot_t *)calloc(max_recv, sizeof(rio_recv_slot_t));
    ctx->recv_data_bufs = (RIO_BUF *)calloc(max_recv, sizeof(RIO_BUF));
    ctx->recv_addr_bufs = (RIO_BUF *)calloc(max_recv, sizeof(RIO_BUF));

    if (!ctx->recv_pool || !ctx->recv_addr_pool || !ctx->recv_slots ||
        !ctx->recv_data_bufs || !ctx->recv_addr_bufs) {
        mylog(log_warn, "rio: recv pool alloc failed\n");
        rio_destroy(ctx);
        return -1;
    }

    ctx->recv_buf_id = ctx->fn.RIORegisterBuffer(ctx->recv_pool,
                                                   max_recv * recv_buf_size);
    if (ctx->recv_buf_id == RIO_INVALID_BUFFERID) {
        mylog(log_warn, "rio: RIORegisterBuffer(recv) failed (%d)\n",
              WSAGetLastError());
        rio_destroy(ctx);
        return -1;
    }

    ctx->recv_addr_id = ctx->fn.RIORegisterBuffer(ctx->recv_addr_pool,
                                                    max_recv * (DWORD)RIO_ADDR_SIZE);
    if (ctx->recv_addr_id == RIO_INVALID_BUFFERID) {
        mylog(log_warn, "rio: RIORegisterBuffer(recv_addr) failed (%d)\n",
              WSAGetLastError());
        rio_destroy(ctx);
        return -1;
    }

    /* Pre-compute RIO_BUF descriptors for recv */
    for (int i = 0; i < max_recv; i++) {
        ctx->recv_data_bufs[i].BufferId = ctx->recv_buf_id;
        ctx->recv_data_bufs[i].Offset = i * recv_buf_size;
        ctx->recv_data_bufs[i].Length = recv_buf_size;
        ctx->recv_addr_bufs[i].BufferId = ctx->recv_addr_id;
        ctx->recv_addr_bufs[i].Offset = i * (ULONG)RIO_ADDR_SIZE;
        ctx->recv_addr_bufs[i].Length = (ULONG)RIO_ADDR_SIZE;
    }

    /* --- Send buffer pool --- */
    ctx->send_count = send_count;
    ctx->send_buf_size = send_buf_size;
    ctx->send_pool = (char *)calloc(send_count, send_buf_size);
    ctx->send_addr_pool = (char *)calloc(send_count, RIO_ADDR_SIZE);
    ctx->send_slots = (rio_send_slot_t *)calloc(send_count, sizeof(rio_send_slot_t));
    ctx->send_data_bufs = (RIO_BUF *)calloc(send_count, sizeof(RIO_BUF));
    ctx->send_addr_bufs = (RIO_BUF *)calloc(send_count, sizeof(RIO_BUF));

    if (!ctx->send_pool || !ctx->send_addr_pool || !ctx->send_slots ||
        !ctx->send_data_bufs || !ctx->send_addr_bufs) {
        mylog(log_warn, "rio: send pool alloc failed\n");
        rio_destroy(ctx);
        return -1;
    }

    ctx->send_buf_id = ctx->fn.RIORegisterBuffer(ctx->send_pool,
                                                   send_count * send_buf_size);
    if (ctx->send_buf_id == RIO_INVALID_BUFFERID) {
        mylog(log_warn, "rio: RIORegisterBuffer(send) failed (%d)\n",
              WSAGetLastError());
        rio_destroy(ctx);
        return -1;
    }

    ctx->send_addr_id = ctx->fn.RIORegisterBuffer(ctx->send_addr_pool,
                                                    send_count * (DWORD)RIO_ADDR_SIZE);
    if (ctx->send_addr_id == RIO_INVALID_BUFFERID) {
        mylog(log_warn, "rio: RIORegisterBuffer(send_addr) failed (%d)\n",
              WSAGetLastError());
        rio_destroy(ctx);
        return -1;
    }

    /* Pre-compute RIO_BUF descriptors for send */
    for (int i = 0; i < send_count; i++) {
        ctx->send_data_bufs[i].BufferId = ctx->send_buf_id;
        ctx->send_data_bufs[i].Offset = i * send_buf_size;
        ctx->send_data_bufs[i].Length = send_buf_size; /* adjusted per-send */
        ctx->send_addr_bufs[i].BufferId = ctx->send_addr_id;
        ctx->send_addr_bufs[i].Offset = i * (ULONG)RIO_ADDR_SIZE;
        ctx->send_addr_bufs[i].Length = (ULONG)RIO_ADDR_SIZE;
    }
    ctx->send_next = 0;

    ctx->socket_count = 0;
    ctx->available = 1;

    mylog(log_info, "rio: initialized (recv=%d×%d, send=%d×%d, cq=%d)\n",
          max_recv, recv_buf_size, send_count, send_buf_size, cq_size);
    return 0;
}

/* Find the RQ for a given tag_type */
static RIO_RQ rio_find_rq(rio_ctx_t *ctx, uint8_t tag_type) {
    for (int i = 0; i < ctx->socket_count; i++) {
        if (ctx->sockets[i].tag_type == tag_type)
            return ctx->sockets[i].rq;
    }
    return RIO_INVALID_RQ;
}

int rio_add_socket(rio_ctx_t *ctx, SOCKET s, uint8_t tag_type,
                   int use_recvfrom, int headroom, int recv_count) {
    if (!ctx->available) return -1;
    if (ctx->socket_count >= 4) {
        mylog(log_warn, "rio: max sockets reached\n");
        return -1;
    }

    /* Per-socket send limit: divide pool among max 4 sockets */
    int max_sends_per_socket = ctx->send_count / 4;
    if (max_sends_per_socket < 32) max_sends_per_socket = 32;

    /* Create request queue: recv_count recvs, shared send pool, shared CQ */
    RIO_RQ rq = ctx->fn.RIOCreateRequestQueue(
        s,
        recv_count,             /* MaxOutstandingReceive */
        1,                      /* MaxReceiveDataBuffers */
        max_sends_per_socket,   /* MaxOutstandingSend */
        1,                      /* MaxSendDataBuffers */
        ctx->cq,                /* ReceiveCQ */
        ctx->cq,                /* SendCQ (shared) */
        (PVOID)(uintptr_t)tag_type  /* SocketContext */
    );
    if (rq == RIO_INVALID_RQ || rq == NULL) {
        mylog(log_warn, "rio: CreateRequestQueue failed (%d)\n",
              WSAGetLastError());
        return -1;
    }

    int idx = ctx->socket_count;
    ctx->sockets[idx].rq = rq;
    ctx->sockets[idx].sock = s;
    ctx->sockets[idx].tag_type = tag_type;
    ctx->sockets[idx].headroom = headroom;

    /* Pre-post recv buffers */
    int base = idx * (ctx->recv_count / 4); /* divide pool evenly */
    for (int i = 0; i < recv_count; i++) {
        int slot = base + i;
        ctx->recv_slots[slot].tag_type = tag_type;
        ctx->recv_slots[slot].headroom = headroom;

        /* Adjust data buf offset for headroom */
        RIO_BUF data_buf = ctx->recv_data_bufs[slot];
        data_buf.Offset += headroom;
        data_buf.Length -= headroom;

        /* Always use RIOReceiveEx with address buffer — even for connected
         * sockets. RIO requires address buffers on all UDP sockets. */
        int ret = ctx->fn.RIOReceiveEx(rq, &data_buf, 1,
                                        NULL, &ctx->recv_addr_bufs[slot],
                                        NULL, NULL, 0,
                                        rio_encode_recv_ctx(tag_type, slot));
        if (!ret) {
            mylog(log_warn, "rio: RIOReceiveEx pre-post failed (%d) slot=%d\n",
                  WSAGetLastError(), slot);
        }
    }

    ctx->socket_count++;

    mylog(log_info, "rio: socket %llu added (tag=%d, %d recvs, headroom=%d)\n",
          (unsigned long long)s, tag_type, recv_count, headroom);
    return 0;
}

/* Re-post a single recv buffer after processing */
static void rio_repost_recv(rio_ctx_t *ctx, int slot) {
    uint8_t tag_type = ctx->recv_slots[slot].tag_type;
    int headroom = ctx->recv_slots[slot].headroom;
    RIO_RQ rq = rio_find_rq(ctx, tag_type);
    if (rq == RIO_INVALID_RQ) return;

    RIO_BUF data_buf = ctx->recv_data_bufs[slot];
    data_buf.Offset += headroom;
    data_buf.Length -= headroom;

    ctx->fn.RIOReceiveEx(rq, &data_buf, 1,
                          NULL, &ctx->recv_addr_bufs[slot],
                          NULL, NULL, 0,
                          rio_encode_recv_ctx(tag_type, slot));
}

int rio_drain(rio_ctx_t *ctx, rio_recv_fn recv_fn, void *user_data) {
    if (!ctx->available) return 0;

    RIORESULT results[64];
    int total_recv = 0;

    for (;;) {
        ULONG count = ctx->fn.RIODequeueCompletion(ctx->cq, results, 64);
        if (count == 0 || count == RIO_CORRUPT_CQ) break;

        for (ULONG i = 0; i < count; i++) {
            ULONGLONG rctx = results[i].RequestContext;
            ULONG bytes = results[i].BytesTransferred;

            if (rio_is_send(rctx)) {
                /* Send completion — recycle slot */
                int slot = rio_get_slot(rctx);
                if (slot >= 0 && slot < ctx->send_count)
                    ctx->send_slots[slot].in_flight = 0;
                continue;
            }

            /* Recv completion */
            uint8_t tag = rio_get_tag(rctx);
            int slot = rio_get_slot(rctx);

            if (bytes > 0 && slot >= 0 && slot < ctx->recv_count) {
                int headroom = ctx->recv_slots[slot].headroom;
                char *data_ptr = ctx->recv_pool +
                                 slot * ctx->recv_buf_size + headroom;

                /* Address from registered addr buffer */
                struct sockaddr *addr = NULL;
                int addr_len = 0;
                if (tag == RIO_TAG_CLIENT_LOCAL || tag == RIO_TAG_SERVER_LOCAL) {
                    addr = (struct sockaddr *)(ctx->recv_addr_pool +
                                               slot * RIO_ADDR_SIZE);
                    /* Determine actual addr length from family */
                    if (addr->sa_family == AF_INET)
                        addr_len = sizeof(struct sockaddr_in);
                    else if (addr->sa_family == AF_INET6)
                        addr_len = sizeof(struct sockaddr_in6);
                    else
                        addr_len = (int)RIO_ADDR_SIZE;
                }

                recv_fn(tag, data_ptr, (int)bytes, addr, addr_len, user_data);
                total_recv++;
            }

            /* Re-post this recv buffer */
            rio_repost_recv(ctx, slot);
        }
    }

    return total_recv;
}

/* Allocate a send slot (round-robin, skip in-flight) */
static int rio_alloc_send_slot(rio_ctx_t *ctx) {
    for (int tries = 0; tries < ctx->send_count; tries++) {
        int slot = ctx->send_next;
        ctx->send_next = (ctx->send_next + 1) % ctx->send_count;
        if (!ctx->send_slots[slot].in_flight)
            return slot;
    }
    return -1; /* all slots in flight */
}

int rio_send_batch(rio_ctx_t *ctx, uint8_t tag_type,
                   char **data_arr, int *len_arr, int count,
                   struct sockaddr *addr, int addr_len) {
    if (!ctx->available || count <= 0) return 0;

    RIO_RQ rq = rio_find_rq(ctx, tag_type);
    if (rq == RIO_INVALID_RQ) return 0;

    int queued = 0;
    for (int i = 0; i < count; i++) {
        int slot = rio_alloc_send_slot(ctx);
        if (slot < 0) break; /* no free slots */

        /* Copy data into registered send buffer */
        int len = len_arr[i];
        if (len > ctx->send_buf_size) len = ctx->send_buf_size;
        memcpy(ctx->send_pool + slot * ctx->send_buf_size,
               data_arr[i], len);

        RIO_BUF data_buf = ctx->send_data_bufs[slot];
        data_buf.Length = len;

        /* Copy address into registered addr buffer */
        PRIO_BUF addr_buf_ptr = NULL;
        if (addr && addr_len > 0) {
            memcpy(ctx->send_addr_pool + slot * RIO_ADDR_SIZE,
                   addr, addr_len);
            ctx->send_addr_bufs[slot].Length = addr_len;
            addr_buf_ptr = &ctx->send_addr_bufs[slot];
        }

        /* Use RIO_MSG_DEFER for all but last to batch kernel transition */
        DWORD flags = (i < count - 1) ? RIO_MSG_DEFER : 0;

        BOOL ret = ctx->fn.RIOSendEx(rq, &data_buf, 1,
                                       NULL, addr_buf_ptr,
                                       NULL, NULL, flags,
                                       rio_encode_send_ctx(slot));
        if (ret) {
            ctx->send_slots[slot].in_flight = 1;
            queued++;
        } else {
            mylog(log_debug, "rio: RIOSendEx failed (%d)\n",
                  WSAGetLastError());
        }
    }

    return queued;
}

int rio_send(rio_ctx_t *ctx, uint8_t tag_type,
             char *data, int len,
             struct sockaddr *addr, int addr_len) {
    return rio_send_batch(ctx, tag_type, &data, &len, 1, addr, addr_len);
}

int rio_upgrade_listen_socket(int &fd, struct sockaddr *addr, int addr_len) {
    int family = addr->sa_family;

    /* Close old socket first to release the address */
    closesocket((SOCKET)fd);
    fd = -1;

    SOCKET new_s = WSASocket(family, SOCK_DGRAM, IPPROTO_UDP, NULL, 0,
                              WSA_FLAG_OVERLAPPED | WSA_FLAG_REGISTERED_IO);
    if (new_s == INVALID_SOCKET) {
        mylog(log_warn, "rio: WSASocket for upgrade failed (%d)\n",
              WSAGetLastError());
        return -1;
    }

    if (::bind(new_s, addr, addr_len) == SOCKET_ERROR) {
        mylog(log_warn, "rio: rebind failed (%d)\n", WSAGetLastError());
        closesocket(new_s);
        return -1;
    }

    u_long mode = 1;
    ioctlsocket(new_s, FIONBIO, &mode);

    fd = (int)new_s;
    mylog(log_info, "rio: upgraded listen socket to RIO (fd=%d)\n", fd);
    return 0;
}

int rio_upgrade_connected_socket(int &fd, struct sockaddr *addr, int addr_len) {
    int family = addr->sa_family;

    closesocket((SOCKET)fd);
    fd = -1;

    SOCKET new_s = WSASocket(family, SOCK_DGRAM, IPPROTO_UDP, NULL, 0,
                              WSA_FLAG_OVERLAPPED | WSA_FLAG_REGISTERED_IO);
    if (new_s == INVALID_SOCKET) {
        mylog(log_warn, "rio: WSASocket for upgrade failed (%d)\n",
              WSAGetLastError());
        return -1;
    }

    if (::connect(new_s, addr, addr_len) == SOCKET_ERROR) {
        mylog(log_warn, "rio: reconnect failed (%d)\n", WSAGetLastError());
        closesocket(new_s);
        return -1;
    }

    u_long mode = 1;
    ioctlsocket(new_s, FIONBIO, &mode);

    fd = (int)new_s;
    mylog(log_info, "rio: upgraded connected socket to RIO (fd=%d)\n", fd);
    return 0;
}

int rio_send_batch_fd(rio_ctx_t *ctx, SOCKET fd,
                      char **data_arr, int *len_arr, int count,
                      struct sockaddr *addr, int addr_len) {
    if (!ctx || !ctx->available) return -1;

    /* Find tag_type by socket fd */
    for (int i = 0; i < ctx->socket_count; i++) {
        if (ctx->sockets[i].sock == fd) {
            return rio_send_batch(ctx, ctx->sockets[i].tag_type,
                                  data_arr, len_arr, count, addr, addr_len);
        }
    }
    return -1; /* fd not registered */
}

void rio_destroy(rio_ctx_t *ctx) {
    if (!ctx) return;

    if (ctx->cq != RIO_INVALID_CQ && ctx->fn.RIOCloseCompletionQueue) {
        ctx->fn.RIOCloseCompletionQueue(ctx->cq);
        ctx->cq = RIO_INVALID_CQ;
    }

    if (ctx->recv_buf_id != RIO_INVALID_BUFFERID && ctx->fn.RIODeregisterBuffer)
        ctx->fn.RIODeregisterBuffer(ctx->recv_buf_id);
    if (ctx->recv_addr_id != RIO_INVALID_BUFFERID && ctx->fn.RIODeregisterBuffer)
        ctx->fn.RIODeregisterBuffer(ctx->recv_addr_id);
    if (ctx->send_buf_id != RIO_INVALID_BUFFERID && ctx->fn.RIODeregisterBuffer)
        ctx->fn.RIODeregisterBuffer(ctx->send_buf_id);
    if (ctx->send_addr_id != RIO_INVALID_BUFFERID && ctx->fn.RIODeregisterBuffer)
        ctx->fn.RIODeregisterBuffer(ctx->send_addr_id);

    free(ctx->recv_pool);
    free(ctx->recv_addr_pool);
    free(ctx->recv_slots);
    free(ctx->recv_data_bufs);
    free(ctx->recv_addr_bufs);
    free(ctx->send_pool);
    free(ctx->send_addr_pool);
    free(ctx->send_slots);
    free(ctx->send_data_bufs);
    free(ctx->send_addr_bufs);

    ctx->available = 0;
}

#endif /* __MINGW32__ */
