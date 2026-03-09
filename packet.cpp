/*
 * packet.cpp
 *
 *  Created on: Sep 15, 2017
 *      Author: root
 */

#include "common.h"
#include "log.h"
#include "packet.h"
#include "misc.h"
#include "crc32c.h"
#include "win_rio.h"

cook_ctx_t cook_ctx = { {}, 0, 0, {}, 4, 32, 0, 0, 0 };

u64_t packet_send_count = 0;
u64_t dup_packet_send_count = 0;
u64_t packet_recv_count = 0;
u64_t dup_packet_recv_count = 0;

typedef u64_t anti_replay_seq_t;
int disable_replay_filter = 0;

int random_drop = 0;

/*
int sendto_fd_ip_port (int fd,u32_t ip,int port,char * buf, int len,int flags)
{

        sockaddr_in tmp_sockaddr;

        memset(&tmp_sockaddr,0,sizeof(tmp_sockaddr));
        tmp_sockaddr.sin_family = AF_INET;
        tmp_sockaddr.sin_addr.s_addr = ip;
        tmp_sockaddr.sin_port = htons(uint16_t(port));

        return sendto(fd, buf,
                        len , 0,
                        (struct sockaddr *) &tmp_sockaddr,
                        sizeof(tmp_sockaddr));
}*/

int sendto_fd_addr(int fd, address_t addr, char *buf, int len, int flags) {
    return sendto(fd, buf,
                  len, 0,
                  (struct sockaddr *)&addr.inner,
                  addr.get_len());
}
/*
int sendto_ip_port (u32_t ip,int port,char * buf, int len,int flags)
{
        return sendto_fd_ip_port(local_listen_fd,ip,port,buf,len,flags);
}*/

int send_fd(int fd, char *buf, int len, int flags) {
    return send(fd, buf, len, flags);
}

int my_send_batch(const dest_t &dest, char **data_arr, int *len_arr, int count) {
    if (count <= 0) return 0;
    if (count == 1) return my_send(dest, data_arr[0], len_arr[0]);

    /* Cook all packets */
    if (dest.cook) {
        for (int i = 0; i < count; i++)
            do_cook(&cook_ctx, data_arr[i], len_arr[i]);
    }

    /* Resolve fd and optional destination address.
     * Copy address out of const dest (same as sendto_fd_addr taking addr by value). */
    int fd;
    address_t addr_copy;
    struct sockaddr *addr_ptr = NULL;
    socklen_t addr_len = 0;

    switch (dest.type) {
        case type_fd_addr:
            fd = dest.inner.fd_addr.fd;
            addr_copy = dest.inner.fd_addr.addr;
            addr_ptr = (struct sockaddr *)&addr_copy.inner;
            addr_len = addr_copy.get_len();
            break;
        case type_fd64_addr:
            if (!fd_manager.exist(dest.inner.fd64)) return -1;
            fd = fd_manager.to_fd(dest.inner.fd64);
            addr_copy = dest.inner.fd64_addr.addr;
            addr_ptr = (struct sockaddr *)&addr_copy.inner;
            addr_len = addr_copy.get_len();
            break;
        case type_fd64:
            if (!fd_manager.exist(dest.inner.fd64)) return -1;
            fd = fd_manager.to_fd(dest.inner.fd64);
            break;
        case type_fd:
            fd = dest.inner.fd;
            break;
        default:
            for (int i = 0; i < count; i++)
                my_send(dest, data_arr[i], len_arr[i]);
            return count;
    }

#ifdef __linux__
    struct mmsghdr msgs[max_fec_packet_num];
    struct iovec iovecs[max_fec_packet_num];

    for (int i = 0; i < count; i++) {
        iovecs[i].iov_base = data_arr[i];
        iovecs[i].iov_len = len_arr[i];
        msgs[i].msg_hdr.msg_iov = &iovecs[i];
        msgs[i].msg_hdr.msg_iovlen = 1;
        msgs[i].msg_hdr.msg_name = addr_ptr;
        msgs[i].msg_hdr.msg_namelen = addr_len;
        msgs[i].msg_hdr.msg_control = NULL;
        msgs[i].msg_hdr.msg_controllen = 0;
        msgs[i].msg_hdr.msg_flags = 0;
        msgs[i].msg_len = 0;
    }

    int ret = sendmmsg(fd, msgs, count, 0);
    if (ret < 0) {
        mylog(log_warn, "sendmmsg failed: %s\n", strerror(errno));
    } else if (ret < count) {
        mylog(log_debug, "sendmmsg partial: %d/%d sent\n", ret, count);
    }
    return ret;
#elif defined(__MINGW32__)
    /* RIO send path disabled: memcpy into registered buffers is slower than
     * plain WSASendTo for FEC workloads with high send amplification (e.g.
     * 20:10 FEC = 30 sends per recv). IOCP pre-posting (+25%) beats RIO (+4%)
     * for this workload. Keep RIO code for future experimentation. */

    /*
     * Windows batch send via overlapped WSASendTo.
     * Each WSASendTo is non-blocking (overlapped with NULL event),
     * so we fire all sends before checking completions. This
     * pipelines kernel transitions — ~2x faster than serial sendto()
     * for batch sizes >4.
     */
    WSAOVERLAPPED ovls[max_fec_packet_num];
    WSABUF wbufs[max_fec_packet_num];
    memset(ovls, 0, sizeof(WSAOVERLAPPED) * count);

    int fired = 0;
    for (int i = 0; i < count; i++) {
        wbufs[i].buf = data_arr[i];
        wbufs[i].len = len_arr[i];
        DWORD bytesSent = 0;
        int ret = WSASendTo((SOCKET)fd, &wbufs[i], 1, &bytesSent, 0,
                            addr_ptr, addr_len, &ovls[i], NULL);
        if (ret == 0 || WSAGetLastError() == WSA_IO_PENDING)
            fired++;
    }
    return fired;
#else
    int sent = 0;
    for (int i = 0; i < count; i++) {
        int ret;
        if (addr_ptr)
            ret = sendto(fd, data_arr[i], len_arr[i], 0, addr_ptr, addr_len);
        else
            ret = send(fd, data_arr[i], len_arr[i], 0);
        if (ret >= 0) sent++;
    }
    return sent;
#endif
}

int my_send(const dest_t &dest, char *data, int len) {
    if (dest.cook) {
        do_cook(&cook_ctx, data, len);
    }
    switch (dest.type) {
        case type_fd_addr: {
            return sendto_fd_addr(dest.inner.fd, dest.inner.fd_addr.addr, data, len, 0);
            break;
        }
        case type_fd64_addr: {
            if (!fd_manager.exist(dest.inner.fd64)) return -1;
            int fd = fd_manager.to_fd(dest.inner.fd64);

            return sendto_fd_addr(fd, dest.inner.fd64_addr.addr, data, len, 0);
            break;
        }
        case type_fd: {
            return send_fd(dest.inner.fd, data, len, 0);
            break;
        }
        case type_write_fd: {
            return write(dest.inner.fd, data, len);
            break;
        }
        case type_fd64: {
            if (!fd_manager.exist(dest.inner.fd64)) return -1;
            int fd = fd_manager.to_fd(dest.inner.fd64);

            return send_fd(fd, data, len, 0);
            break;
        }
        /*
        case type_fd64_ip_port_conv:
        {
                if(!fd_manager.exist(dest.inner.fd64)) return -1;
                int fd=fd_manager.to_fd(dest.inner.fd64);

                char *new_data;
                int new_len;

                put_conv(dest.conv,data,len,new_data,new_len);
                return sendto_fd_ip_port(fd,dest.inner.fd64_ip_port.ip_port.ip,dest.inner.fd64_ip_port.ip_port.port,new_data,new_len,0);
                break;
        }*/

        /*
        case type_fd64_conv:
        {
                char *new_data;
                int new_len;
                put_conv(dest.conv,data,len,new_data,new_len);

                if(!fd_manager.exist(dest.inner.fd64)) return -1;
                int fd=fd_manager.to_fd(dest.inner.fd64);
                return send_fd(fd,new_data,new_len,0);
        }*/
        /*
        case type_fd:
        {
                send_fd(dest.inner.fd,data,len,0);
                break;
        }*/
        default:
            assert(0 == 1);
    }
    return 0;
}

int put_conv0(u32_t conv, const char *input, int len_in, char *&output, int &len_out) {
    assert(len_in >= 0);
    static char buf[buf_len];
    output = buf;
    u32_t n_conv = htonl(conv);
    memcpy(output, &n_conv, sizeof(n_conv));
    memcpy(output + sizeof(n_conv), input, len_in);
    u32_t crc32 = (u32_t)crc32c(output, len_in + sizeof(crc32));
    u32_t crc32_n = htonl(crc32);
    len_out = len_in + (int)(sizeof(n_conv)) + (int)sizeof(crc32_n);
    memcpy(output + len_in + (int)(sizeof(n_conv)), &crc32_n, sizeof(crc32_n));
    return 0;
}
int get_conv0(u32_t &conv, const char *input, int len_in, char *&output, int &len_out) {
    assert(len_in >= 0);
    u32_t n_conv;
    memcpy(&n_conv, input, sizeof(n_conv));
    conv = ntohl(n_conv);
    output = (char *)input + sizeof(n_conv);
    u32_t crc32_n;
    len_out = len_in - (int)sizeof(n_conv) - (int)sizeof(crc32_n);
    if (len_out < 0) {
        mylog(log_debug, "len_out<0\n");
        return -1;
    }
    memcpy(&crc32_n, input + len_in - (int)sizeof(crc32_n), sizeof(crc32_n));
    u32_t crc32 = ntohl(crc32_n);
    if (crc32 != (u32_t)crc32c(input, len_in - sizeof(crc32_n))) {
        mylog(log_debug, "crc32 check failed\n");
        return -1;
    }
    return 0;
}
/*
int do_obs()
{

}
int de_obs()*/
int put_conv(u32_t conv, const char *input, int len_in, char *&output, int &len_out) {
    static char buf[buf_len];
    output = buf;
    u32_t n_conv = htonl(conv);
    memcpy(output, &n_conv, sizeof(n_conv));
    memcpy(output + sizeof(n_conv), input, len_in);
    len_out = len_in + (int)(sizeof(n_conv));

    return 0;
}
int put_conv_inplace(u32_t conv, char *buf, int data_len, int &len_out) {
    /* buf must have data at buf+sizeof(u32_t) with sizeof(u32_t) bytes of headroom.
     * Writes conv header at buf[0..3], total len = data_len + 4. */
    u32_t n_conv = htonl(conv);
    memcpy(buf, &n_conv, sizeof(n_conv));
    len_out = data_len + (int)sizeof(n_conv);
    return 0;
}
int get_conv(u32_t &conv, const char *input, int len_in, char *&output, int &len_out) {
    u32_t n_conv;
    memcpy(&n_conv, input, sizeof(n_conv));
    conv = ntohl(n_conv);
    output = (char *)input + sizeof(n_conv);
    len_out = len_in - (int)sizeof(n_conv);
    if (len_out < 0) {
        mylog(log_debug, "len_out<0\n");
        return -1;
    }
    return 0;
}
