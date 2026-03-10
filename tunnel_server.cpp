/*
 * tunnel.cpp
 *
 *  Created on: Oct 26, 2017
 *      Author: root
 */

#include "tunnel.h"
#include "io_uring_recv.h"
#include "win_iocp_recv.h"
#include "win_rio.h"
#include "send_slab.h"

static void conn_timer_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents);
static void fec_encode_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents);
static void remote_cb(struct ev_loop *loop, struct ev_io *watcher, int revents);

enum tmp_mode_t { is_from_remote = 0,
                  is_fec_timeout,
                  is_conn_timer };

static void server_process_remote_packet(conn_info_t &conn_info, fd64_t fd64, char *data, int data_len) {
    /* Pre-condition: fd_manager.exist(fd64), data received at data + sizeof(u32_t) */
    assert(conn_info.conv_manager.s.is_data_used(fd64));

    u32_t conv = conn_info.conv_manager.s.find_conv_by_data(fd64);
    conn_info.conv_manager.s.update_active_time(conv);
    conn_info.update_active_time();

    if (data_len == max_data_len + 1) {
        mylog(log_warn, "huge packet from upper level, data_len > %d, packet truncated, dropped\n", max_data_len);
        return;
    }

    mylog(log_trace, "received a packet from udp_fd,len:%d,conv=%d\n", data_len, conv);

    if (data_len < 0) {
        mylog(log_debug, "udp fd,recv_len<0 continue,%s\n", get_sock_error());
        return;
    }

    if (!disable_mtu_warn && data_len >= mtu_warn) {
        mylog(log_warn, "huge packet,data len=%d (>=%d).strongly suggested to set a smaller mtu at upper level,to get rid of this warn\n ", data_len, mtu_warn);
    }

    int new_len;
    put_conv_inplace(conv, data, data_len, new_len);

    address_t &addr = conn_info.addr;
    int &local_listen_fd = conn_info.local_listen_fd;

    int out_n;
    char **out_arr;
    int *out_len;
    my_time_t *out_delay;
    dest_t dest;
    dest.inner.fd_addr.fd = local_listen_fd;
    dest.inner.fd_addr.addr = addr;
    dest.type = type_fd_addr;
    dest.cook = 1;

    from_normal_to_fec(conn_info, data, new_len, out_n, out_arr, out_len, out_delay);

    mylog(log_trace, "out_n=%d\n", out_n);
    delay_send_batch(out_n, out_delay, dest, out_arr, out_len);
}

void data_from_remote_or_fec_timeout_or_conn_timer(conn_info_t &conn_info, fd64_t fd64, tmp_mode_t mode) {
    int ret;

    char data[buf_len];
    int data_len;
    // fd64_t fd64=events[idx].data.u64;
    // mylog(log_trace,"events[idx].data.u64 >u32_t(-1),%llu\n",(u64_t)events[idx].data.u64);

    // assert(fd_manager.exist_info(fd64));
    // ip_port_t ip_port=fd_manager.get_info(fd64).ip_port;

    // conn_info_t &conn_info=conn_manager.find(ip_port);
    address_t &addr = conn_info.addr;
    assert(conn_manager.exist(addr));

    int &local_listen_fd = conn_info.local_listen_fd;

    int out_n = -2;
    char **out_arr;
    int *out_len;
    my_time_t *out_delay;

    dest_t dest;
    dest.inner.fd_addr.fd = local_listen_fd;
    dest.inner.fd_addr.addr = addr;
    dest.type = type_fd_addr;
    dest.cook = 1;

    if (mode == is_fec_timeout) {
        assert(fd64 == 0);
        // uint64_t value;
        // if((ret=read(fd_manager.to_fd(fd64), &value, 8))!=8)
        //{
        //	mylog(log_trace,"fd_manager.to_fd(fd64), &value, 8)!=8 ,%d\n",ret);
        //	continue;
        // }
        // if(value==0)
        //{
        //	mylog(log_trace,"value==0\n");
        //	continue;
        // }
        // assert(value==1);
        from_normal_to_fec(conn_info, 0, 0, out_n, out_arr, out_len, out_delay);
    } else if (mode == is_conn_timer) {
        assert(fd64 == 0);
        // uint64_t value;
        // read(conn_info.timer.get_timer_fd(), &value, 8);
        conn_info.conv_manager.s.clear_inactive();
        if (debug_force_flush_fec) {
            from_normal_to_fec(conn_info, 0, 0, out_n, out_arr, out_len, out_delay);
        }

        conn_info.stat.report_as_server(addr);
        return;
    } else if (mode == is_from_remote) {
        if (!fd_manager.exist(fd64))  // fd64 has been closed
        {
            mylog(log_warn, "!fd_manager.exist(fd64)\n");
            return;
        }

        int fd = fd_manager.to_fd(fd64);
        /* Receive with sizeof(u32_t) headroom for in-place conv header */
        data_len = recv(fd, data + sizeof(u32_t), max_data_len + 1, 0);
        server_process_remote_packet(conn_info, fd64, data, data_len);
        return;
    } else {
        assert(0 == 1);
    }

    mylog(log_trace, "out_n=%d\n", out_n);
    delay_send_batch(out_n, out_delay, dest, out_arr, out_len);
}

static void server_process_tunnel_packet(struct ev_loop *loop, int local_listen_fd,
                                          char *data, int data_len,
                                          struct sockaddr *src_addr, socklen_t src_addr_len) {
    int ret;

    if (data_len == max_data_len + 1) {
        mylog(log_warn, "huge packet, data_len > %d, packet truncated, dropped\n", max_data_len);
        return;
    }

    address_t addr;
    addr.from_sockaddr(src_addr, src_addr_len);

    mylog(log_trace, "Received packet from %s,len: %d\n", addr.get_str(), data_len);

    if (!disable_mtu_warn && data_len >= mtu_warn) {
        mylog(log_warn, "huge packet,data len=%d (>=%d).strongly suggested to set a smaller mtu at upper level,to get rid of this warn\n ", data_len, mtu_warn);
    }

    if (de_cook(&cook_ctx, data, data_len) != 0) {
        mylog(log_debug, "de_cook error");
        return;
    }

    if (!conn_manager.exist(addr)) {
        if (conn_manager.mp.size() >= max_conn_num) {
            mylog(log_warn, "new connection %s ignored bc max_conn_num exceed\n", addr.get_str());
            return;
        }

        conn_info_t &conn_info = conn_manager.find_insert(addr);
        conn_info.addr = addr;
        conn_info.loop = ev_default_loop(0);
        conn_info.local_listen_fd = local_listen_fd;

        conn_info.timer.data = &conn_info;
        ev_init(&conn_info.timer, conn_timer_cb);
        ev_timer_set(&conn_info.timer, 0, timer_interval / 1000.0);
        ev_timer_start(loop, &conn_info.timer);

        conn_info.fec_encode_manager.set_data(&conn_info);
        conn_info.fec_encode_manager.set_loop_and_cb(loop, fec_encode_cb);

        mylog(log_info, "new connection from %s\n", addr.get_str());
    }
    conn_info_t &conn_info = conn_manager.find_insert(addr);

    conn_info.update_active_time();
    int out_n;
    char **out_arr;
    int *out_len;
    my_time_t *out_delay;
    from_fec_to_normal(conn_info, data, data_len, out_n, out_arr, out_len, out_delay);

    mylog(log_trace, "out_n= %d\n", out_n);
    for (int i = 0; i < out_n; i++) {
        u32_t conv;
        char *new_data;
        int new_len;
        if (get_conv(conv, out_arr[i], out_len[i], new_data, new_len) != 0) {
            mylog(log_debug, "get_conv failed");
            continue;
        }

        if (!conn_info.conv_manager.s.is_conv_used(conv)) {
            if (conn_info.conv_manager.s.get_size() >= max_conv_num) {
                mylog(log_warn, "ignored new udp connect bc max_conv_num exceed\n");
                continue;
            }

            int new_udp_fd;
            ret = new_connected_socket2(new_udp_fd, remote_addr, out_addr, out_interface);

            if (ret != 0) {
                mylog(log_warn, "[%s]new_connected_socket failed\n", addr.get_str());
                continue;
            }

            fd64_t fd64 = fd_manager.create(new_udp_fd);

            conn_info.conv_manager.s.insert_conv(conv, fd64);
            fd_manager.get_info(fd64).addr = addr;

#ifdef __linux__
            if (g_uring_ctx && g_uring_ctx->available) {
                uring_add_multishot_recv(g_uring_ctx, new_udp_fd,
                                          uring_tag(URING_TAG_SERVER_REMOTE, fd64));
                uring_submit(g_uring_ctx);
            } else
#endif
            {
                ev_io &io_watcher = fd_manager.get_info(fd64).io_watcher;
                io_watcher.u64 = fd64;
                io_watcher.data = &conn_info;

                ev_init(&io_watcher, remote_cb);
                ev_io_set(&io_watcher, new_udp_fd, EV_READ);
                ev_io_start(conn_info.loop, &io_watcher);
            }

            mylog(log_info, "[%s]new conv %x,fd %d created,fd64=%llu\n", addr.get_str(), conv, new_udp_fd, fd64);
        }
        conn_info.conv_manager.s.update_active_time(conv);
        fd64_t fd64 = conn_info.conv_manager.s.find_data_by_conv(conv);
        dest_t dest;
        dest.type = type_fd64;
        dest.inner.fd64 = fd64;
        delay_send(out_delay[i], dest, new_data, new_len);
    }
}

static void local_listen_cb(struct ev_loop *loop, struct ev_io *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    int local_listen_fd = watcher->fd;

    char data[buf_len];
    int data_len;
    address_t::storage_t udp_new_addr_in = {0};
    socklen_t udp_new_addr_len = sizeof(address_t::storage_t);
    data_len = recvfrom(local_listen_fd, data, max_data_len + 1, 0,
                        (struct sockaddr *)&udp_new_addr_in, &udp_new_addr_len);
    if (data_len < 0) {
        mylog(log_error, "recv_from error,err=%s\n", get_sock_error());
        return;
    }

    server_process_tunnel_packet(loop, local_listen_fd, data, data_len,
                                  (struct sockaddr *)&udp_new_addr_in, udp_new_addr_len);
}

static void remote_cb(struct ev_loop *loop, struct ev_io *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    conn_info_t &conn_info = *((conn_info_t *)watcher->data);
    fd64_t fd64 = watcher->u64;

    data_from_remote_or_fec_timeout_or_conn_timer(conn_info, fd64, is_from_remote);
}

static void fifo_cb(struct ev_loop *loop, struct ev_io *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    int fifo_fd = watcher->fd;

    char buf[buf_len];
    int len = read(fifo_fd, buf, sizeof(buf));
    if (len < 0) {
        mylog(log_warn, "fifo read failed len=%d,errno=%s\n", len, get_sock_error());
        return;
    }
    buf[len] = 0;
    handle_command(buf);
}

static void delay_manager_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    // uint64_t value;
    // read(delay_manager.get_timer_fd(), &value, 8);
    // mylog(log_trace,"events[idx].data.u64 == (u64_t)delay_manager.get_timer_fd()\n");

    // do nothing
}

static void fec_encode_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    conn_info_t &conn_info = *((conn_info_t *)watcher->data);

    data_from_remote_or_fec_timeout_or_conn_timer(conn_info, 0, is_fec_timeout);
}

static void conn_timer_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    conn_info_t &conn_info = *((conn_info_t *)watcher->data);

    data_from_remote_or_fec_timeout_or_conn_timer(conn_info, 0, is_conn_timer);
}

static void server_uring_drain(struct ev_loop *loop);

#ifdef __MINGW32__
static iocp_ctx_t server_iocp_ctx;
static rio_ctx_t server_rio_ctx;
static int server_batch_listen_fd;
static struct ev_loop *server_batch_loop;

static void server_batch_idle_cb(struct ev_loop *loop, struct ev_idle *watcher, int revents) {
    (void)loop; (void)watcher; (void)revents;
}

static void server_iocp_process(uint8_t tag_type, char *data, int data_len,
                                 struct sockaddr *addr, int addr_len,
                                 void *user_data) {
    (void)user_data;

    if (tag_type == IOCP_TAG_SERVER_LOCAL) {
        server_process_tunnel_packet(server_batch_loop, server_batch_listen_fd,
                                      data, data_len, addr, (socklen_t)addr_len);
    }
}

static void server_rio_process(uint8_t tag_type, char *data, int data_len,
                                struct sockaddr *addr, int addr_len,
                                void *user_data) {
    (void)user_data;

    if (tag_type == RIO_TAG_SERVER_LOCAL) {
        server_process_tunnel_packet(server_batch_loop, server_batch_listen_fd,
                                      data, data_len, addr, (socklen_t)addr_len);
    }
}
#endif

static void prepare_cb(struct ev_loop *loop, struct ev_prepare *watcher, int revents) {
    assert(!(revents & EV_ERROR));

#ifdef __MINGW32__
    if (server_rio_ctx.available) {
        rio_drain(&server_rio_ctx, server_rio_process, NULL);
    } else if (server_iocp_ctx.available) {
        iocp_drain(&server_iocp_ctx, server_iocp_process, NULL);
    }
#endif

    delay_manager.check();
}

#ifdef __linux__
#endif

static void global_timer_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    // uint64_t value;
    // read(timer.get_timer_fd(), &value, 8);
    conn_manager.clear_inactive();
    mylog(log_trace, "events[idx].data.u64==(u64_t)timer.get_timer_fd()\n");
}

#ifdef __linux__
static uring_ctx_t server_uring_ctx;
static int server_local_listen_fd;

static void server_uring_drain(struct ev_loop *loop) {
    uring_ctx_t *ctx = &server_uring_ctx;
    int local_listen_fd = server_local_listen_fd;

    for (;;) {
        unsigned ready = uring_cq_ready(ctx);
        if (ready == 0)
            break;

        int need_submit = 0;

        for (unsigned i = 0; i < ready; i++) {
            struct io_uring_cqe *cqe = uring_cqe_at(ctx, i);
            uint8_t type = uring_tag_type(cqe->user_data);
            int more = cqe->flags & IORING_CQE_F_MORE;

            if (cqe->res < 0) {
                if (!more && cqe->res != -ECANCELED) {
                    if (type == URING_TAG_SERVER_LOCAL) {
                        uring_add_multishot_recvmsg(ctx, local_listen_fd, cqe->user_data);
                        need_submit = 1;
                    } else if (type == URING_TAG_SERVER_REMOTE) {
                        fd64_t fd64 = (fd64_t)uring_tag_payload(cqe->user_data);
                        if (fd_manager.exist(fd64)) {
                            uring_add_multishot_recv(ctx, fd_manager.to_fd(fd64), cqe->user_data);
                            need_submit = 1;
                        }
                    }
                }
                continue;
            }

            if (type == URING_TAG_SERVER_LOCAL) {
                uring_recv_buf_t recv_buf;
                if (uring_parse_recvmsg_cqe(ctx, cqe, &recv_buf) == 0) {
                    server_process_tunnel_packet(loop, local_listen_fd, recv_buf.data, recv_buf.len,
                                                  (struct sockaddr *)&recv_buf.addr, recv_buf.addr_len);
                    uring_recycle_buf(ctx, recv_buf.buf_id);
                }
            } else if (type == URING_TAG_SERVER_REMOTE) {
                fd64_t fd64 = (fd64_t)uring_tag_payload(cqe->user_data);
                uring_recv_buf_t recv_buf;
                if (uring_parse_recv_cqe(ctx, cqe, &recv_buf) == 0) {
                    if (fd_manager.exist(fd64)) {
                        address_t &addr = fd_manager.get_info(fd64).addr;
                        if (conn_manager.exist(addr)) {
                            conn_info_t &conn_info = conn_manager.find_insert(addr);
                            /* Zero-copy: URING_RECV_HEADROOM bytes before data
                               reserved for in-place conv header insertion. */
                            char *data = recv_buf.data - sizeof(u32_t);
                            int data_len = recv_buf.len < (int)(buf_len - sizeof(u32_t)) ? recv_buf.len : (int)(buf_len - sizeof(u32_t));
                            server_process_remote_packet(conn_info, fd64, data, data_len);
                        }
                    }
                    uring_recycle_buf(ctx, recv_buf.buf_id);
                }
            }

            if (!more) {
                if (type == URING_TAG_SERVER_LOCAL) {
                    uring_add_multishot_recvmsg(ctx, local_listen_fd, cqe->user_data);
                    need_submit = 1;
                } else if (type == URING_TAG_SERVER_REMOTE) {
                    fd64_t fd64 = (fd64_t)uring_tag_payload(cqe->user_data);
                    if (fd_manager.exist(fd64)) {
                        uring_add_multishot_recv(ctx, fd_manager.to_fd(fd64), cqe->user_data);
                        need_submit = 1;
                    }
                }
            }
        }

        /* Single batched advance + buffer commit */
        uring_cq_advance(ctx, ready);
        uring_buf_ring_commit(ctx);

        /* Submit any re-arms and flush deferred completions in one syscall */
        if (need_submit)
            uring_submit_and_flush(ctx);
        else
            uring_flush(ctx);
    }
}

static void server_uring_cb(struct ev_loop *loop, struct ev_io *watcher, int revents) {
    assert(!(revents & EV_ERROR));
    server_uring_drain(loop);
}
#endif

int tunnel_server_event_loop() {
    int i, j, k;
    int ret;
    int yes = 1;
    // int epoll_fd;
    // int remote_fd;

    int local_listen_fd;
    new_listen_socket2(local_listen_fd, local_addr);

    // epoll_fd = epoll_create1(0);
    // assert(epoll_fd>0);

    // const int max_events = 4096;
    // struct epoll_event ev, events[max_events];
    // if (epoll_fd < 0) {
    //	mylog(log_fatal,"epoll return %d\n", epoll_fd);
    //	myexit(-1);
    // }

    struct ev_loop *loop = ev_default_loop(0);
    assert(loop != NULL);

    // ev.events = EPOLLIN;
    // ev.data.u64 = local_listen_fd;
    // ret = epoll_ctl(epoll_fd, EPOLL_CTL_ADD, local_listen_fd, &ev);
    // if (ret!=0) {
    //	mylog(log_fatal,"add  udp_listen_fd error\n");
    //	myexit(-1);
    // }
    int use_batch_recv = 0;
#ifdef __linux__
    server_local_listen_fd = local_listen_fd;
    if (uring_init(&server_uring_ctx, 64, 256, buf_len) == 0) {
        g_uring_ctx = &server_uring_ctx;
        static struct ev_io uring_watcher;
        ev_io_init(&uring_watcher, server_uring_cb, server_uring_ctx.ring_fd, EV_READ);
        ev_io_start(loop, &uring_watcher);

        uring_add_multishot_recvmsg(&server_uring_ctx, local_listen_fd,
                                      uring_tag(URING_TAG_SERVER_LOCAL, 0));
        uring_submit(&server_uring_ctx);
        use_batch_recv = 1;
        mylog(log_info, "io_uring: active for server sockets\n");
    }
#endif

#ifdef __MINGW32__
    /* RIO slab send: upgrade tunnel socket for zero-copy FEC send. */
    int rio_send_upgraded = 0;
    if (!use_batch_recv && getenv("UDPSPEEDER_USE_RIO_SEND")) {
        if (rio_upgrade_listen_socket(local_listen_fd,
                                       (struct sockaddr *)&local_addr.inner,
                                       local_addr.get_len()) == 0) {
            rio_send_upgraded = 1;
            mylog(log_info, "rio_slab: upgraded tunnel socket for RIO send\n");
        } else {
            mylog(log_info, "rio_slab: socket upgrade failed, using WSASendTo\n");
        }
    }

    /* IOCP is default (+25% throughput). RIO opt-in via UDPSPEEDER_USE_RIO=1. */
    if (!use_batch_recv && !getenv("UDPSPEEDER_USE_RIO") &&
        iocp_init(&server_iocp_ctx, 32) == 0) {
        server_batch_listen_fd = local_listen_fd;
        server_batch_loop = loop;
        iocp_add_socket(&server_iocp_ctx, (SOCKET)local_listen_fd,
                        IOCP_TAG_SERVER_LOCAL, 1, 0, 32);
        use_batch_recv = 1;
        mylog(log_info, "iocp: active for server tunnel socket\n");

        static struct ev_idle iocp_idle;
        ev_idle_init(&iocp_idle, server_batch_idle_cb);
        ev_idle_start(loop, &iocp_idle);
    }

    if (!use_batch_recv && rio_init(&server_rio_ctx, 32, 512, buf_len, buf_len) == 0) {
        int rio_ok = 1;
        if (rio_upgrade_listen_socket(local_listen_fd,
                                       (struct sockaddr *)&local_addr.inner,
                                       local_addr.get_len()) < 0)
            rio_ok = 0;

        if (rio_ok) {
            server_batch_listen_fd = local_listen_fd;
            server_batch_loop = loop;
            g_rio_ctx = &server_rio_ctx;
            rio_add_socket(&server_rio_ctx, (SOCKET)local_listen_fd,
                           RIO_TAG_SERVER_LOCAL, 1, 0, 32);
            use_batch_recv = 1;
            mylog(log_info, "rio: active for server tunnel socket\n");

            static struct ev_idle rio_idle;
            ev_idle_init(&rio_idle, server_batch_idle_cb);
            ev_idle_start(loop, &rio_idle);
        } else {
            rio_destroy(&server_rio_ctx);
            mylog(log_info, "rio: socket upgrade failed, falling back\n");
        }
    }
#endif

    struct ev_io local_listen_watcher;
    ev_io_init(&local_listen_watcher, local_listen_cb, local_listen_fd, EV_READ);
    if (!use_batch_recv)
        ev_io_start(loop, &local_listen_watcher);

    delay_manager.set_loop_and_cb(loop, delay_manager_cb);

    // mylog(log_debug," delay_manager.get_timer_fd() =%d\n", delay_manager.get_timer_fd());

    mylog(log_info, "now listening at %s\n", local_addr.get_str());

    // my_timer_t timer;
    // timer.add_fd_to_epoll(epoll_fd);
    // timer.set_timer_repeat_us(timer_interval*1000);

    ev_timer global_timer;
    ev_init(&global_timer, global_timer_cb);
    ev_timer_set(&global_timer, 0, timer_interval / 1000.0);
    ev_timer_start(loop, &global_timer);

    // mylog(log_debug," timer.get_timer_fd() =%d\n",timer.get_timer_fd());

    struct ev_io fifo_watcher;

    int fifo_fd = -1;

    if (fifo_file[0] != 0) {
        fifo_fd = create_fifo(fifo_file);
        // ev.events = EPOLLIN;
        // ev.data.u64 = fifo_fd;

        // ret = epoll_ctl(epoll_fd, EPOLL_CTL_ADD, fifo_fd, &ev);
        // if (ret!= 0) {
        // mylog(log_fatal,"add fifo_fd to epoll error %s\n",strerror(errno));
        // myexit(-1);
        //}
        ev_io_init(&fifo_watcher, fifo_cb, fifo_fd, EV_READ);
        ev_io_start(loop, &fifo_watcher);

        mylog(log_info, "fifo_file=%s\n", fifo_file);
    }

    ev_prepare prepare_watcher;
    ev_init(&prepare_watcher, prepare_cb);
    ev_prepare_start(loop, &prepare_watcher);

    /* Init send slab pool for GSO/RIO batching */
    static send_slab_pool_t server_slab_pool;
    if (slab_pool_init(&server_slab_pool, 4, slab_max_segments, buf_len) == 0) {
        g_slab_pool = &server_slab_pool;

#ifdef __MINGW32__
        if (rio_send_upgraded && server_slab_pool.pool_mem) {
            static rio_slab_ctx_t server_rio_slab;
            size_t slab_bytes = (size_t)slab_max_segments * buf_len * 4;
            if (rio_slab_init(&server_rio_slab, server_slab_pool.pool_mem,
                              (int)slab_bytes, 512) == 0) {
                if (rio_slab_add_socket(&server_rio_slab,
                                         (SOCKET)local_listen_fd) == 0) {
                    server_slab_pool.backend_ctx = &server_rio_slab;
                    mylog(log_info, "rio_slab: active for server send\n");
                } else {
                    rio_slab_destroy(&server_rio_slab);
                }
            }
        }
#endif
    }

    ev_run(loop, 0);

    mylog(log_warn, "ev_run returned\n");
    myexit(0);

    /*
    while(1)////////////////////////
    {

            if(about_to_exit) myexit(0);

            int nfds = epoll_wait(epoll_fd, events, max_events, 180 * 1000);
            if (nfds < 0) {  //allow zero
                    if(errno==EINTR  )
                    {
                            mylog(log_info,"epoll interrupted by signal,continue\n");
                    }
                    else
                    {
                            mylog(log_fatal,"epoll_wait return %d,%s\n", nfds,strerror(errno));
                            myexit(-1);
                    }
            }
            int idx;
            for (idx = 0; idx < nfds; ++idx)
            {
                    if(events[idx].data.u64==(u64_t)timer.get_timer_fd())
                    {

                    }

                    else if (events[idx].data.u64 == (u64_t)fifo_fd)
                    {

                    }

                    else if (events[idx].data.u64 == (u64_t)local_listen_fd)
                    {


                    }
                else if (events[idx].data.u64 == (u64_t)delay_manager.get_timer_fd()) {

                    }
                    else if (events[idx].data.u64 >u32_t(-1))
                    {


                    }
                    else
                    {
                            mylog(log_fatal,"unknown fd,this should never happen\n");
                            myexit(-1);
                    }
            }

    }*/

    return 0;
}
