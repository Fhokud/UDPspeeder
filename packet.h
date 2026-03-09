/*
 * packet.h
 *
 *  Created on: Sep 15, 2017
 *      Author: root
 */

#ifndef PACKET_H_
#define PACKET_H_

#include "common.h"
#include "fd_manager.h"
#include "packet_cook.h"
#include "send_slab.h"

extern cook_ctx_t cook_ctx;

extern u64_t packet_send_count;
extern u64_t dup_packet_send_count;
extern u64_t packet_recv_count;
extern u64_t dup_packet_recv_count;
extern int disable_replay_filter;
extern int random_drop;
extern send_slab_pool_t *g_slab_pool;

int my_send(const dest_t &dest, char *data, int len);
int my_send_batch(const dest_t &dest, char **data_arr, int *len_arr, int count);

int add_seq(char *data, int &data_len);
int remove_seq(char *data, int &data_len);

int sendto_ip_port(u32_t ip, int port, char *buf, int len, int flags);
int send_fd(int fd, char *buf, int len, int flags);

int put_conv(u32_t conv, const char *input, int len_in, char *&output, int &len_out);
int put_conv_inplace(u32_t conv, char *buf, int data_len, int &len_out);
int get_conv(u32_t &conv, const char *input, int len_in, char *&output, int &len_out);
int put_conv0(u32_t conv, const char *input, int len_in, char *&output, int &len_out);
int get_conv0(u32_t &conv, const char *input, int len_in, char *&output, int &len_out);
#endif /* PACKET_H_ */
