/*
 * sys/epoll.h — wepoll shim for libev on Windows
 *
 * Provides Linux-compatible int-based epoll API by wrapping wepoll's
 * HANDLE-based functions. libev's ev_epoll.c includes <sys/epoll.h>
 * and expects int return types; wepoll returns HANDLE (void*).
 *
 * wepoll.c is compiled with renamed exports (wepoll_create, etc.)
 * to avoid symbol collisions with our int-based wrappers.
 */
#ifndef WEPOLL_SHIM_SYS_EPOLL_H
#define WEPOLL_SHIM_SYS_EPOLL_H

#include <stdint.h>
#include <winsock2.h>

/* ---- epoll constants (matching Linux <sys/epoll.h>) ---- */

#define EPOLLIN      (1U <<  0)
#define EPOLLPRI     (1U <<  1)
#define EPOLLOUT     (1U <<  2)
#define EPOLLERR     (1U <<  3)
#define EPOLLHUP     (1U <<  4)
#define EPOLLRDNORM  (1U <<  6)
#define EPOLLRDBAND  (1U <<  7)
#define EPOLLWRNORM  (1U <<  8)
#define EPOLLWRBAND  (1U <<  9)
#define EPOLLRDHUP   (1U << 13)
#define EPOLLONESHOT (1U << 31)

#define EPOLL_CTL_ADD 1
#define EPOLL_CTL_MOD 2
#define EPOLL_CTL_DEL 3

#define EPOLL_CLOEXEC 0x80000  /* no-op on Windows, but libev checks for it */

typedef union epoll_data {
    void    *ptr;
    int      fd;
    uint32_t u32;
    uint64_t u64;
} epoll_data_t;

struct epoll_event {
    uint32_t     events;
    epoll_data_t data;
};

/* ---- wepoll renamed exports (linked from wepoll.o) ---- */

#ifdef __cplusplus
extern "C" {
#endif

typedef void *WEPOLL_HANDLE;
typedef uintptr_t WEPOLL_SOCKET;

WEPOLL_HANDLE wepoll_create(int size);
WEPOLL_HANDLE wepoll_create1(int flags);
int wepoll_close(WEPOLL_HANDLE ephnd);
int wepoll_ctl(WEPOLL_HANDLE ephnd, int op, WEPOLL_SOCKET sock,
               struct epoll_event *event);
int wepoll_wait(WEPOLL_HANDLE ephnd, struct epoll_event *events,
                int maxevents, int timeout);

#ifdef __cplusplus
}
#endif

/* ---- HANDLE → int mapping (libev creates 1 epoll instance) ---- */

#define _WEPOLL_FD_BASE 900
static WEPOLL_HANDLE _wepoll_handles[4];
static int _wepoll_count = 0;

static inline WEPOLL_HANDLE _wepoll_fd_to_handle(int fd) {
    int idx = fd - _WEPOLL_FD_BASE;
    if (idx >= 0 && idx < 4) return _wepoll_handles[idx];
    return NULL;
}

static inline int epoll_create(int size) {
    (void)size;
    if (_wepoll_count >= 4) return -1;
    WEPOLL_HANDLE h = wepoll_create1(0);
    if (!h) return -1;
    int idx = _wepoll_count++;
    _wepoll_handles[idx] = h;
    return _WEPOLL_FD_BASE + idx;
}

static inline int epoll_create1(int flags) {
    (void)flags;
    return epoll_create(256);
}

static inline int epoll_ctl(int epfd, int op, int fd,
                             struct epoll_event *event) {
    WEPOLL_HANDLE h = _wepoll_fd_to_handle(epfd);
    if (!h) return -1;
    return wepoll_ctl(h, op, (WEPOLL_SOCKET)fd, event);
}

static inline int epoll_wait(int epfd, struct epoll_event *events,
                              int maxevents, int timeout) {
    WEPOLL_HANDLE h = _wepoll_fd_to_handle(epfd);
    if (!h) return -1;
    return wepoll_wait(h, events, maxevents, timeout);
}

/* ---- Stub out POSIX calls that ev_epoll.c uses ---- */

/* fcntl(backend_fd, F_SETFD, FD_CLOEXEC) — no-op on Windows */
#ifndef F_SETFD
#define F_SETFD 2
#endif
#ifndef FD_CLOEXEC
#define FD_CLOEXEC 1
#endif
#ifndef fcntl
static inline int _wepoll_fcntl(int fd, int cmd, ...) {
    (void)fd; (void)cmd;
    return 0;
}
#define fcntl _wepoll_fcntl
#endif

#endif /* WEPOLL_SHIM_SYS_EPOLL_H */
