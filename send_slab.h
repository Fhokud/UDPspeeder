#ifndef SEND_SLAB_H_
#define SEND_SLAB_H_

#include "common.h"
#include "fec_manager.h"
#include "packet_cook.h"

/*
 * send_slab — contiguous buffer for packing cooked FEC shards for GSO send.
 *
 * Usage: after fec_encode_manager_t::output() returns shard pointers, cook
 * each shard in-place (in input_buf[]), then pack the cooked shards
 * contiguously into a slab for GSO sendmsg (one syscall for N segments).
 *
 * GSO requires all segments to be the same size. This holds when:
 *   - FEC shards are uniform (always true: fec_len + 8B header)
 *   - Cook expansion is uniform (true when disable_obscure or iv_min==iv_max)
 *
 * When GSO is not available or cook sizes vary, the fallback sends directly
 * from the original buffers via sendmmsg/sendmsg/WSASendTo (no packing).
 *
 * Lifecycle:  FREE → alloc → pack → submit → FREE (synchronous backends)
 *             FREE → alloc → pack → submit → IN_FLIGHT → drain → FREE (async)
 */

/* Maximum segments per slab — matches max FEC shards (data + redundant) */
const int slab_max_segments = max_fec_packet_num + 5;

struct send_slab_t {
    char  *buf;           /* contiguous memory for packed cooked segments */
    int    seg_count;     /* number of segments packed */
    int    seg_size;      /* bytes per segment (uniform after cooking) */
    int    in_flight;     /* 1 = submitted to kernel, awaiting completion */
};

struct send_slab_pool_t;

/* Backend vtable — platform-specific submit/drain */
struct slab_backend_t {
    int  (*submit)(send_slab_pool_t *pool, int slab_id, int fd,
                   struct sockaddr *addr, socklen_t addrlen);
    int  (*drain)(send_slab_pool_t *pool);
    void (*destroy)(send_slab_pool_t *pool);
};

struct send_slab_pool_t {
    send_slab_t *slabs;
    int    count;          /* total slabs (small: 2-4) */
    int    max_segments;   /* max segments per slab */
    int    seg_stride;     /* max bytes per segment slot (buf_len) */

    char  *pool_mem;       /* single allocation backing all slabs */

    slab_backend_t backend;

    int    gso_available;  /* 1 if UDP GSO probe succeeded */
    void  *backend_ctx;    /* opaque platform-specific state */
};

/*
 * slab_pool_init: allocate pool with slab_count slabs, each able to hold
 * max_segments segments of seg_stride bytes. Probes for GSO on Linux.
 * Returns 0 on success.
 */
int  slab_pool_init(send_slab_pool_t *pool, int slab_count,
                    int max_segments, int seg_stride);

/*
 * slab_pool_alloc: get a free slab for filling. Returns slab index or -1
 * if all slabs are in-flight.
 */
int  slab_pool_alloc(send_slab_pool_t *pool);

/*
 * slab_cook_pack_submit: the main entry point. Replaces my_send_batch for
 * FEC output. Cooks each shard in-place (in out_arr buffers), then:
 *
 *   - If GSO available AND all cooked sizes are uniform:
 *     pack into slab contiguously, one sendmsg(UDP_SEGMENT)
 *   - Otherwise:
 *     sendmmsg/sendmsg/WSASendTo directly from out_arr buffers
 *
 * Returns number of shards sent, or -1 to signal "use my_send_batch instead".
 */
int  slab_cook_pack_submit(send_slab_pool_t *pool,
                           cook_ctx_t *cook, int do_cook_flag,
                           char **out_arr, int *out_len, int count,
                           int fd, struct sockaddr *addr, socklen_t addrlen);

/*
 * slab_pool_drain: recycle completed slabs. Non-blocking.
 * Returns number of slabs recycled.
 */
int  slab_pool_drain(send_slab_pool_t *pool);

void slab_pool_destroy(send_slab_pool_t *pool);

#endif /* SEND_SLAB_H_ */
