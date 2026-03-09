/*
 * sys/epoll.h — zero-overhead wepoll shim for libev on Windows
 *
 * wepoll returns HANDLE (void*), libev expects int backend_fd.
 * Since libev creates exactly one epoll instance, we store a single
 * global HANDLE and return a sentinel int. All inline, no branches
 * on the hot path (epoll_ctl / epoll_wait).
 *
 * wepoll.c must be compiled with renamed exports (-Depoll_create=wepoll_create
 * etc.) to avoid symbol collisions.
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

#define EPOLL_CLOEXEC 0x80000  /* no-op on Windows */

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

/* ---- Single-instance HANDLE (zero lookup overhead) ----
 *
 * libev creates exactly one epoll instance. We store the HANDLE in a
 * global and return sentinel fd 900. epoll_ctl/epoll_wait go straight
 * to the global — no table, no bounds check, no branch.
 */
static WEPOLL_HANDLE _wepoll_h;

static inline int epoll_create(int size) {
    (void)size;
    _wepoll_h = wepoll_create1(0);
    return _wepoll_h ? 900 : -1;
}

static inline int epoll_create1(int flags) {
    (void)flags;
    return epoll_create(256);
}

static inline int epoll_ctl(int epfd, int op, int fd,
                             struct epoll_event *event) {
    (void)epfd;
    return wepoll_ctl(_wepoll_h, op, (WEPOLL_SOCKET)fd, event);
}

static inline int epoll_wait(int epfd, struct epoll_event *events,
                              int maxevents, int timeout) {
    (void)epfd;
    return wepoll_wait(_wepoll_h, events, maxevents, timeout);
}

/* ---- Stubs for POSIX calls in ev_epoll.c ---- */

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
