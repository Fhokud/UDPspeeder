#ifndef PACKET_COOK_H_
#define PACKET_COOK_H_

struct cook_ctx_t {
    char key[1000];
    int key_len;              /* cached strlen(key), set by cook_ctx_prepare_key */
    int key_tile_len;         /* lcm(key_len, vec_width), 0 if no key */
    char key_tile[16000];     /* key repeated to tile_len for SIMD XOR */
    int iv_min;
    int iv_max;
    int disable_checksum;
    int disable_obscure;
    int disable_xor;
    int force_iv_len;       /* >0: use fixed IV length (for GSO uniform sizes) */
};

void cook_ctx_prepare_key(cook_ctx_t *ctx);
int do_cook(cook_ctx_t *ctx, char *data, int &len);
int de_cook(cook_ctx_t *ctx, char *data, int &len);

#endif /* PACKET_COOK_H_ */
