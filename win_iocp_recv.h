#ifndef WIN_IOCP_RECV_H_
#define WIN_IOCP_RECV_H_

#include "common.h"

#ifdef __MINGW32__

#include <winsock2.h>
#include <mswsock.h>
#include <windows.h>

/* --- Pre-posted overlapped recv for Win64 --------------------------------
 *
 * Mirrors io_uring multishot recv: pre-post N WSARecvFrom buffers per socket,
 * drain completions in batch via GetQueuedCompletionStatusEx.
 * One kernel transition to dequeue N completions vs N recvfrom() calls.
 */

/* Headroom before each buffer for in-place conv header insertion */
#define IOCP_RECV_HEADROOM 4  /* sizeof(u32_t) */

/* Pre-posted buffer — one per outstanding recv operation */
struct iocp_buf_t {
    WSAOVERLAPPED ovl;
    WSABUF wbuf;
    char buf[4096];             /* must be >= buf_len from common.h */
    struct sockaddr_storage addr;
    INT addr_len;
    uint8_t tag_type;           /* which socket this buffer belongs to */
    SOCKET socket;              /* socket to re-post on */
};

struct iocp_ctx_t {
    HANDLE iocp;
    int available;

    iocp_buf_t *bufs;
    int buf_count;              /* total buffers (all sockets) */
};

/* Parsed recv result — matches uring_recv_buf_t layout */
struct iocp_recv_buf_t {
    char *data;
    int len;
    struct sockaddr_storage addr;
    INT addr_len;
};

/* Tag types — reuse io_uring values for consistency */
#define IOCP_TAG_CLIENT_LOCAL   0x01
#define IOCP_TAG_CLIENT_REMOTE  0x02
#define IOCP_TAG_SERVER_LOCAL   0x03
#define IOCP_TAG_SERVER_REMOTE  0x04

/*
 * iocp_init: create IOCP and allocate buffer pool.
 * Returns 0 on success, -1 on failure.
 */
int iocp_init(iocp_ctx_t *ctx, int bufs_per_socket);

/*
 * iocp_add_socket: associate socket with IOCP and pre-post recv buffers.
 * For recvfrom sockets (needs source addr): use_recvfrom = 1.
 * For connected sockets (recv only): use_recvfrom = 0.
 * headroom: bytes of headroom before data (for in-place header insertion).
 */
int iocp_add_socket(iocp_ctx_t *ctx, SOCKET s, uint8_t tag_type,
                    int use_recvfrom, int headroom, int bufs_per_socket);

/*
 * iocp_drain: dequeue all pending completions (non-blocking).
 * Calls process_fn for each completed recv.
 * process_fn receives: tag_type, data pointer, data length, source addr/len.
 * Re-posts consumed buffers automatically.
 * Returns number of completions processed.
 */
typedef void (*iocp_process_fn)(uint8_t tag_type, char *data, int data_len,
                                struct sockaddr *addr, int addr_len,
                                void *user_data);
int iocp_drain(iocp_ctx_t *ctx, iocp_process_fn process_fn, void *user_data);

void iocp_destroy(iocp_ctx_t *ctx);

#else /* !__MINGW32__ */

/* Stubs for non-Windows */
struct iocp_ctx_t { int available; };
static inline int iocp_init(iocp_ctx_t *ctx, int) { ctx->available = 0; return -1; }
static inline void iocp_destroy(iocp_ctx_t *) {}

#define IOCP_TAG_CLIENT_LOCAL   0x01
#define IOCP_TAG_CLIENT_REMOTE  0x02
#define IOCP_TAG_SERVER_LOCAL   0x03
#define IOCP_TAG_SERVER_REMOTE  0x04

#endif /* __MINGW32__ */
#endif /* WIN_IOCP_RECV_H_ */
