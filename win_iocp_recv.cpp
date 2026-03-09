#include "win_iocp_recv.h"

#ifdef __MINGW32__

#include "log.h"
#include <stdlib.h>
#include <string.h>

/* Re-post a single buffer for overlapped recv on its socket */
static void iocp_repost(iocp_buf_t *pb) {
    memset(&pb->ovl, 0, sizeof(pb->ovl));
    pb->addr_len = sizeof(pb->addr);

    DWORD flags = 0, bytes = 0;

    /* Determine recv offset: if this buffer has headroom, start after it
     * so the caller gets data pointer with headroom before it. */
    char *recv_start = pb->wbuf.buf;
    DWORD recv_len = pb->wbuf.len;

    int ret;
    if (pb->tag_type == IOCP_TAG_CLIENT_LOCAL ||
        pb->tag_type == IOCP_TAG_SERVER_LOCAL) {
        /* recvfrom — needs source address */
        ret = WSARecvFrom(pb->socket, &pb->wbuf, 1, &bytes, &flags,
                          (struct sockaddr *)&pb->addr, &pb->addr_len,
                          &pb->ovl, NULL);
    } else {
        /* recv — connected socket, no address */
        ret = WSARecv(pb->socket, &pb->wbuf, 1, &bytes, &flags,
                      &pb->ovl, NULL);
    }
    /* ret == 0 means immediate completion (queued to IOCP).
     * ret == SOCKET_ERROR + WSA_IO_PENDING means pending (normal).
     * Other errors: buffer won't complete, but we can't do much here. */
    (void)ret;
}

int iocp_init(iocp_ctx_t *ctx, int bufs_per_socket) {
    memset(ctx, 0, sizeof(*ctx));
    ctx->available = 0;

    if (getenv("UDPSPEEDER_NO_IOCP")) {
        mylog(log_info, "iocp: disabled by UDPSPEEDER_NO_IOCP\n");
        return -1;
    }

    ctx->iocp = CreateIoCompletionPort(INVALID_HANDLE_VALUE, NULL, 0, 1);
    if (ctx->iocp == NULL) {
        mylog(log_warn, "iocp: CreateIoCompletionPort failed (%lu)\n",
              GetLastError());
        return -1;
    }

    /* Allocate max buffers — 2 sockets × bufs_per_socket.
     * Actual count grows as sockets are added. */
    int max_bufs = 4 * bufs_per_socket; /* headroom for server dynamic sockets */
    ctx->bufs = (iocp_buf_t *)calloc(max_bufs, sizeof(iocp_buf_t));
    if (!ctx->bufs) {
        CloseHandle(ctx->iocp);
        ctx->iocp = NULL;
        return -1;
    }
    ctx->buf_count = 0;
    ctx->available = 1;

    mylog(log_info, "iocp: initialized (pool=%d buffers)\n", max_bufs);
    return 0;
}

int iocp_add_socket(iocp_ctx_t *ctx, SOCKET s, uint8_t tag_type,
                    int use_recvfrom, int headroom, int bufs_per_socket) {
    if (!ctx->available) return -1;

    /* Associate socket with our IOCP */
    HANDLE h = CreateIoCompletionPort((HANDLE)s, ctx->iocp,
                                      (ULONG_PTR)tag_type, 0);
    if (h == NULL) {
        mylog(log_warn, "iocp: associate socket failed (%lu)\n",
              GetLastError());
        return -1;
    }

    /* Pre-post recv buffers */
    int base = ctx->buf_count;
    for (int i = 0; i < bufs_per_socket; i++) {
        iocp_buf_t *pb = &ctx->bufs[base + i];
        pb->tag_type = tag_type;
        pb->socket = s;
        /* Set up WSABUF to point into buf with headroom */
        pb->wbuf.buf = pb->buf + headroom;
        pb->wbuf.len = sizeof(pb->buf) - headroom;
        iocp_repost(pb);
    }
    ctx->buf_count += bufs_per_socket;

    mylog(log_info, "iocp: socket %llu added (tag=%d, %d buffers, headroom=%d)\n",
          (unsigned long long)s, tag_type, bufs_per_socket, headroom);
    return 0;
}

int iocp_drain(iocp_ctx_t *ctx, iocp_process_fn process_fn, void *user_data) {
    if (!ctx->available) return 0;

    OVERLAPPED_ENTRY entries[64];
    ULONG count = 0;
    int total = 0;

    /* Non-blocking drain: timeout = 0 */
    while (GetQueuedCompletionStatusEx(ctx->iocp, entries, 64,
                                        &count, 0, FALSE)) {
        for (ULONG i = 0; i < count; i++) {
            DWORD bytes = entries[i].dwNumberOfBytesTransferred;

            /* Recover our buffer struct from the OVERLAPPED pointer */
            iocp_buf_t *pb = (iocp_buf_t *)entries[i].lpOverlapped;

            if (bytes > 0) {
                /* Deliver to caller.
                 * data pointer is at wbuf.buf (after headroom).
                 * For recvfrom sockets, addr/addr_len are populated.
                 * For connected sockets, addr is unused. */
                process_fn(pb->tag_type, pb->wbuf.buf, (int)bytes,
                           (struct sockaddr *)&pb->addr, pb->addr_len,
                           user_data);
                total++;
            }

            /* Re-post this buffer for the next recv */
            iocp_repost(pb);
        }
        count = 0;
    }

    return total;
}

void iocp_destroy(iocp_ctx_t *ctx) {
    if (!ctx) return;
    if (ctx->iocp) {
        CloseHandle(ctx->iocp);
        ctx->iocp = NULL;
    }
    if (ctx->bufs) {
        free(ctx->bufs);
        ctx->bufs = NULL;
    }
    ctx->available = 0;
}

#endif /* __MINGW32__ */
