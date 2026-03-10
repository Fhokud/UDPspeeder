#ifndef WIN_RIO_H_
#define WIN_RIO_H_

#include "common.h"

#ifdef __MINGW32__

#include <winsock2.h>
#include <mswsock.h>
#include <windows.h>

/* --- Registered I/O (RIO) type definitions for MinGW ---------------------
 *
 * MinGW headers don't include RIO types. We define them manually.
 * All function pointers loaded at runtime via WSAIoctl.
 */

#ifndef SIO_GET_MULTIPLE_EXTENSION_FUNCTION_POINTER
#define SIO_GET_MULTIPLE_EXTENSION_FUNCTION_POINTER _WSAIORW(IOC_WS2, 36)
#endif

/* Opaque handle types */
typedef struct RIO_BUFFERID_t *RIO_BUFFERID;
typedef void *RIO_CQ;
typedef void *RIO_RQ;

#define RIO_INVALID_BUFFERID ((RIO_BUFFERID)0)
#define RIO_INVALID_CQ       ((RIO_CQ)(ULONG_PTR)-1)
#define RIO_INVALID_RQ       ((RIO_RQ)(ULONG_PTR)-1)
#define RIO_CORRUPT_CQ       ((ULONG)-1)

/* Flag constants */
#define RIO_MSG_DEFER          0x00000001
#define RIO_MSG_DONT_NOTIFY    0x00000004

/* Structures */
typedef struct _RIO_BUF {
    RIO_BUFFERID BufferId;
    ULONG        Offset;
    ULONG        Length;
} RIO_BUF, *PRIO_BUF;

typedef struct _RIORESULT {
    LONG      Status;
    ULONG     BytesTransferred;
    ULONGLONG SocketContext;
    ULONGLONG RequestContext;
} RIORESULT;

typedef enum _RIO_NOTIFICATION_COMPLETION_TYPE {
    RIO_EVENT_COMPLETION = 1,
    RIO_IOCP_COMPLETION  = 2
} RIO_NOTIFICATION_COMPLETION_TYPE;

typedef struct _RIO_NOTIFICATION_COMPLETION {
    RIO_NOTIFICATION_COMPLETION_TYPE Type;
    union {
        struct {
            HANDLE EventHandle;
            BOOL   NotifyReset;
        } Event;
        struct {
            HANDLE IocpHandle;
            PVOID  CompletionKey;
            PVOID  Overlapped;
        } Iocp;
    };
} RIO_NOTIFICATION_COMPLETION;

/* Function pointer typedefs */
typedef RIO_CQ (WSAAPI *LPFN_RIOCREATECOMPLETIONQUEUE)(
    DWORD QueueSize,
    RIO_NOTIFICATION_COMPLETION *NotificationCompletion);

typedef RIO_RQ (WSAAPI *LPFN_RIOCREATEREQUESTQUEUE)(
    SOCKET Socket, ULONG MaxOutstandingReceive, ULONG MaxReceiveDataBuffers,
    ULONG MaxOutstandingSend, ULONG MaxSendDataBuffers,
    RIO_CQ ReceiveCQ, RIO_CQ SendCQ, PVOID SocketContext);

typedef RIO_BUFFERID (WSAAPI *LPFN_RIOREGISTERBUFFER)(PCHAR DataBuffer, DWORD DataLength);
typedef void (WSAAPI *LPFN_RIODEREGISTERBUFFER)(RIO_BUFFERID BufferId);

typedef BOOL (WSAAPI *LPFN_RIOSENDEX)(
    RIO_RQ SocketQueue, PRIO_BUF pData, ULONG DataBufferCount,
    PRIO_BUF pLocalAddress, PRIO_BUF pRemoteAddress,
    PRIO_BUF pControlContext, PRIO_BUF pFlags,
    DWORD Flags, PVOID RequestContext);

typedef int (WSAAPI *LPFN_RIORECEIVEEX)(
    RIO_RQ SocketQueue, PRIO_BUF pData, ULONG DataBufferCount,
    PRIO_BUF pLocalAddress, PRIO_BUF pRemoteAddress,
    PRIO_BUF pControlContext, PRIO_BUF pFlags,
    DWORD Flags, PVOID RequestContext);

typedef BOOL (WSAAPI *LPFN_RIOSEND)(
    RIO_RQ SocketQueue, PRIO_BUF pData, ULONG DataBufferCount,
    DWORD Flags, PVOID RequestContext);

typedef BOOL (WSAAPI *LPFN_RIORECEIVE)(
    RIO_RQ SocketQueue, PRIO_BUF pData, ULONG DataBufferCount,
    DWORD Flags, PVOID RequestContext);

typedef ULONG (WSAAPI *LPFN_RIODEQUEUECOMPLETION)(
    RIO_CQ CQ, RIORESULT *Array, ULONG ArraySize);

typedef int (WSAAPI *LPFN_RIONOTIFY)(RIO_CQ CQ);
typedef void (WSAAPI *LPFN_RIOCLOSECOMPLETIONQUEUE)(RIO_CQ CQ);
typedef BOOL (WSAAPI *LPFN_RIORESIZECOMPLETIONQUEUE)(RIO_CQ CQ, DWORD QueueSize);
typedef BOOL (WSAAPI *LPFN_RIORESIZEREQUESTQUEUE)(
    RIO_RQ RQ, DWORD MaxOutstandingReceive, DWORD MaxOutstandingSend);

/* RIO function table — loaded via WSAIoctl at runtime */
typedef struct _RIO_EXTENSION_FUNCTION_TABLE {
    DWORD                         cbSize;
    LPFN_RIORECEIVE               RIOReceive;
    LPFN_RIORECEIVEEX             RIOReceiveEx;
    LPFN_RIOSEND                  RIOSend;
    LPFN_RIOSENDEX                RIOSendEx;
    LPFN_RIOCLOSECOMPLETIONQUEUE  RIOCloseCompletionQueue;
    LPFN_RIOCREATECOMPLETIONQUEUE RIOCreateCompletionQueue;
    LPFN_RIOCREATEREQUESTQUEUE    RIOCreateRequestQueue;
    LPFN_RIODEQUEUECOMPLETION     RIODequeueCompletion;
    LPFN_RIODEREGISTERBUFFER      RIODeregisterBuffer;
    LPFN_RIONOTIFY                RIONotify;
    LPFN_RIOREGISTERBUFFER        RIORegisterBuffer;
    LPFN_RIORESIZECOMPLETIONQUEUE RIOResizeCompletionQueue;
    LPFN_RIORESIZEREQUESTQUEUE    RIOResizeRequestQueue;
} RIO_EXTENSION_FUNCTION_TABLE;

/* --- UDPspeeder RIO context --------------------------------------------- */

/* Address buffer layout for RIOReceiveEx/RIOSendEx.
 * RIO stores addresses as raw SOCKADDR with no length prefix. */
#define RIO_ADDR_SIZE  sizeof(struct sockaddr_storage)

/* Per-recv-slot: data buffer + address buffer (both registered) */
struct rio_recv_slot_t {
    uint8_t tag_type;
    int     headroom;       /* bytes before data (for conv header) */
};

/* Per-send-slot: data buffer + address buffer */
struct rio_send_slot_t {
    int in_flight;          /* 1 if submitted but not yet completed */
};

struct rio_ctx_t {
    int available;

    RIO_EXTENSION_FUNCTION_TABLE fn;

    /* Completion queue (shared for recv + send) */
    RIO_CQ cq;

    /* Buffer registration */
    RIO_BUFFERID recv_buf_id;
    RIO_BUFFERID recv_addr_id;
    RIO_BUFFERID send_buf_id;
    RIO_BUFFERID send_addr_id;

    /* Recv buffer pool */
    char *recv_pool;        /* recv_count * recv_buf_size bytes */
    char *recv_addr_pool;   /* recv_count * RIO_ADDR_SIZE bytes */
    rio_recv_slot_t *recv_slots;
    RIO_BUF *recv_data_bufs;  /* pre-computed RIO_BUF per slot */
    RIO_BUF *recv_addr_bufs;
    int recv_count;
    int recv_buf_size;

    /* Send buffer pool */
    char *send_pool;        /* send_count * send_buf_size bytes */
    char *send_addr_pool;   /* send_count * RIO_ADDR_SIZE bytes */
    rio_send_slot_t *send_slots;
    RIO_BUF *send_data_bufs;
    RIO_BUF *send_addr_bufs;
    int send_count;
    int send_buf_size;
    int send_next;          /* round-robin allocation index */

    /* Request queues (one per socket) */
    struct rio_socket_t {
        RIO_RQ rq;
        SOCKET sock;
        uint8_t tag_type;
        int headroom;
    } sockets[4];
    int socket_count;
};

/* Tag types — same values as IOCP/io_uring for consistency */
#define RIO_TAG_CLIENT_LOCAL   0x01
#define RIO_TAG_CLIENT_REMOTE  0x02
#define RIO_TAG_SERVER_LOCAL   0x03
#define RIO_TAG_SERVER_REMOTE  0x04

/* Recv headroom — matches io_uring/IOCP */
#define RIO_RECV_HEADROOM  4  /* sizeof(u32_t) */

/* Callback for recv completions */
typedef void (*rio_recv_fn)(uint8_t tag_type, char *data, int data_len,
                            struct sockaddr *addr, int addr_len,
                            void *user_data);

/*
 * rio_init: Load RIO function table and create shared completion queue.
 * Returns 0 on success, -1 if RIO unavailable.
 */
int rio_init(rio_ctx_t *ctx, int recv_per_socket, int send_count,
             int recv_buf_size, int send_buf_size);

/*
 * rio_add_socket: Create request queue for socket, pre-post recv buffers.
 * For recvfrom (needs address): use_recvfrom=1.
 */
int rio_add_socket(rio_ctx_t *ctx, SOCKET s, uint8_t tag_type,
                   int use_recvfrom, int headroom, int recv_count);

/*
 * rio_drain: Dequeue all completions (recv + send). Non-blocking.
 * Calls recv_fn for each recv completion. Send completions just recycle slots.
 * Returns number of recv completions processed.
 */
int rio_drain(rio_ctx_t *ctx, rio_recv_fn recv_fn, void *user_data);

/*
 * rio_send_batch: Queue batch of sends to a socket's RQ.
 * Copies data into registered send buffers. Last send triggers flush.
 * Returns number of sends queued.
 */
int rio_send_batch(rio_ctx_t *ctx, uint8_t tag_type,
                   char **data_arr, int *len_arr, int count,
                   struct sockaddr *addr, int addr_len);

/*
 * rio_send: Queue single send.
 */
int rio_send(rio_ctx_t *ctx, uint8_t tag_type,
             char *data, int len,
             struct sockaddr *addr, int addr_len);

/*
 * rio_upgrade_listen_socket: Close existing socket, recreate with
 * WSA_FLAG_REGISTERED_IO, rebind to same address.
 * Returns 0 on success, -1 on failure (fd unchanged on failure).
 */
int rio_upgrade_listen_socket(int &fd, struct sockaddr *addr, int addr_len);

/*
 * rio_upgrade_connected_socket: Close existing socket, recreate with
 * WSA_FLAG_REGISTERED_IO, reconnect to same address.
 * Returns 0 on success, -1 on failure (fd unchanged on failure).
 */
int rio_upgrade_connected_socket(int &fd, struct sockaddr *addr, int addr_len);

/*
 * rio_send_batch_fd: Like rio_send_batch but looks up RQ by socket fd.
 * Returns number queued, or -1 if fd not registered with RIO.
 */
int rio_send_batch_fd(rio_ctx_t *ctx, SOCKET fd,
                      char **data_arr, int *len_arr, int count,
                      struct sockaddr *addr, int addr_len);

void rio_destroy(rio_ctx_t *ctx);

/* Global pointer — set in tunnel event loop, used by packet.cpp */
extern rio_ctx_t *g_rio_ctx;

/* --- RIO slab send (zero-copy from slab memory) ------------------------- */

/*
 * rio_slab_ctx_t: lightweight RIO context for send-only from slab memory.
 * Used by send_slab.cpp to send FEC shards directly from the slab without
 * memcpy into separate registered buffers.
 *
 * Requires socket with WSA_FLAG_REGISTERED_IO. Can coexist with IOCP recv
 * on the same socket (IOCP uses overlapped WSARecvFrom, RIO uses RIOSendEx).
 */
struct rio_slab_ctx_t {
    int available;

    RIO_EXTENSION_FUNCTION_TABLE fn;
    RIO_CQ send_cq;             /* send-only completion queue */

    RIO_BUFFERID slab_buf_id;   /* registered slab pool memory */
    char *slab_base;            /* base pointer of registered slab memory */
    int slab_size;              /* total registered bytes */

    RIO_BUFFERID addr_buf_id;   /* registered address buffer (small) */
    char *addr_buf;             /* address storage for sendto */

    /* Per-socket send request queues */
    struct rio_slab_socket_t {
        RIO_RQ rq;
        SOCKET sock;
    } sockets[4];
    int socket_count;

    int sends_in_flight;        /* total across all sockets */
    int max_in_flight;          /* limit per CQ */
};

/*
 * rio_slab_init: Load RIO functions, create send CQ, register slab memory.
 * slab_mem/slab_bytes: the slab pool's contiguous allocation.
 * Returns 0 on success.
 */
int rio_slab_init(rio_slab_ctx_t *ctx, char *slab_mem, int slab_bytes,
                  int max_in_flight);

/*
 * rio_slab_add_socket: Create send-only RQ for a socket.
 * Socket must have WSA_FLAG_REGISTERED_IO.
 */
int rio_slab_add_socket(rio_slab_ctx_t *ctx, SOCKET s);

/*
 * rio_slab_send_batch: Send segments directly from slab memory.
 * seg_base: offset from slab_base to first segment.
 * seg_size: bytes per segment (uniform).
 * count: number of segments.
 * No memcpy — RIO_BUF references slab offsets directly.
 */
int rio_slab_send_batch(rio_slab_ctx_t *ctx, SOCKET fd,
                        int seg_base_offset, int seg_size, int count,
                        struct sockaddr *addr, int addr_len);

/*
 * rio_slab_drain: Dequeue send completions. Non-blocking.
 * Returns number of completions drained.
 */
int rio_slab_drain(rio_slab_ctx_t *ctx);

void rio_slab_destroy(rio_slab_ctx_t *ctx);

#else /* !__MINGW32__ */

/* Stubs for non-Windows */
struct rio_ctx_t { int available; };
static inline int rio_init(rio_ctx_t *ctx, int, int, int, int) {
    ctx->available = 0; return -1;
}
static inline void rio_destroy(rio_ctx_t *) {}

struct rio_slab_ctx_t { int available; };
static inline int rio_slab_init(rio_slab_ctx_t *ctx, char *, int, int) {
    ctx->available = 0; return -1;
}
static inline void rio_slab_destroy(rio_slab_ctx_t *) {}

#define RIO_TAG_CLIENT_LOCAL   0x01
#define RIO_TAG_CLIENT_REMOTE  0x02
#define RIO_TAG_SERVER_LOCAL   0x03
#define RIO_TAG_SERVER_REMOTE  0x04
#define RIO_RECV_HEADROOM      4

extern rio_ctx_t *g_rio_ctx;

#endif /* __MINGW32__ */
#endif /* WIN_RIO_H_ */
