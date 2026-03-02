/*
 * chorba_crc32c.c — Standalone Chorba CRC32C prototype.
 *
 * Implements the Chorba table-free CRC32C algorithm (adapted from Russell,
 * arXiv:2412.16398) and benchmarks it against slicing-by-8.
 *
 * Three CRC32C implementations:
 *   1. crc32c_bitwise()  — bit-at-a-time reference (no tables)
 *   2. crc32c_slice8()   — slicing-by-8 (8KB tables, the current UDPspeeder sw path)
 *   3. crc32c_chorba()   — Chorba generator_64 (table-free, buffer-based)
 *
 * Build:  gcc -O2 -o chorba_proto tools/chorba_crc32c.c
 * Usage:  ./chorba_proto
 *
 * Reference: Russell, "Chorba: A novel CRC32 implementation", arXiv:2412.16398
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <time.h>

/* ================================================================
 * CRC32C constants
 * ================================================================ */

/* Reflected (LSB-first) polynomial */
#define CRC32C_POLY_REF  0x82F63B78u

/*
 * x^64 mod G(x) in normal (non-reflected) representation.
 * Computed by find_zero_poly.c / chorba_sage.py.
 * 17 set bits → 17 XORs per 64-bit word in generator_64 path.
 */
#define CRC32C_K64  0x3AAB4576u

/*
 * Bit positions set in CRC32C_K64 (for manual shift+XOR):
 * 29,28,27,25,23,21,19,17,16,14,10,8,6,5,4,2,1
 */

/* ================================================================
 * 1. Bitwise reference — reflected, no tables
 * ================================================================ */

static uint32_t crc32c_bitwise(const void *data, size_t len, uint32_t init)
{
    const uint8_t *p = (const uint8_t *)data;
    uint32_t crc = ~init;

    for (size_t i = 0; i < len; i++) {
        crc ^= p[i];
        for (int j = 0; j < 8; j++)
            crc = (crc >> 1) ^ (CRC32C_POLY_REF & (-(int32_t)(crc & 1)));
    }
    return ~crc;
}

/* ================================================================
 * 2. Slicing-by-8 — reflected, 8KB tables
 * ================================================================ */

static uint32_t s8_table[8][256];
static int s8_ready = 0;

static void s8_init(void)
{
    if (s8_ready) return;
    for (int i = 0; i < 256; i++) {
        uint32_t crc = (uint32_t)i;
        for (int j = 0; j < 8; j++)
            crc = (crc >> 1) ^ (CRC32C_POLY_REF & (-(int32_t)(crc & 1)));
        s8_table[0][i] = crc;
    }
    for (int i = 0; i < 256; i++) {
        uint32_t crc = s8_table[0][i];
        for (int s = 1; s < 8; s++) {
            crc = s8_table[0][crc & 0xFF] ^ (crc >> 8);
            s8_table[s][i] = crc;
        }
    }
    s8_ready = 1;
}

static uint32_t crc32c_slice8(const void *data, size_t len, uint32_t init)
{
    s8_init();
    const uint8_t *p = (const uint8_t *)data;
    uint32_t crc = ~init;

    while (len >= 8) {
        crc ^= (uint32_t)p[0] | ((uint32_t)p[1] << 8) |
               ((uint32_t)p[2] << 16) | ((uint32_t)p[3] << 24);
        crc = s8_table[7][crc & 0xFF] ^
              s8_table[6][(crc >> 8) & 0xFF] ^
              s8_table[5][(crc >> 16) & 0xFF] ^
              s8_table[4][(crc >> 24) & 0xFF] ^
              s8_table[3][p[4]] ^
              s8_table[2][p[5]] ^
              s8_table[1][p[6]] ^
              s8_table[0][p[7]];
        p += 8;
        len -= 8;
    }
    while (len--)
        crc = s8_table[0][(crc ^ *p++) & 0xFF] ^ (crc >> 8);

    return ~crc;
}

/* ================================================================
 * 3. Chorba generator_64 — table-free, buffer-based
 * ================================================================
 *
 * Adapted from Russell, "Chorba: A novel CRC32 implementation",
 * arXiv:2412.16398, for CRC32C (Castagnoli polynomial).
 *
 * The zero polynomial Z(x) = x^64 + R(x) satisfies Z mod G = 0,
 * where R = x^64 mod G = 0x3AAB4576 (17 set bits).
 *
 * Works in REFLECTED convention (like zlib-ng's Chorba):
 *   - No byte reflection needed; message bytes used as-is
 *   - ~init XORed into first 4 bytes in little-endian order
 *   - Buffer = [message][0000] (len + 4 bytes, trailing zeros = x^32 multiply)
 *
 * Byte-at-a-time fold: for each message byte buf[i], XOR its contribution
 * forward by 4..8 bytes using R's set-bit offsets (17 shift+XOR per byte).
 * Fold is valid for bytes 0..len-5 (all targets within buffer bounds).
 * Remaining 4 bytes reduced by bit-at-a-time CRC register, then XOR
 * trailing 4 zero-augmentation bytes.
 *
 * Cost: 17 XORs/byte fold + 4-byte CRC tail.  No lookup tables.
 */

/*
 * Precompute fold offsets from R = x^64 mod G.
 * For each set bit k in R, the fold for byte at position i targets:
 *   byte_offset = (64 - k) / 8    (4..8)
 *   bit_shift   = (64 - k) % 8    (0..7)
 * XOR (byte << shift) into buf[i + offset],
 * XOR (byte >> (8 - shift)) into buf[i + offset + 1] (when shift > 0).
 */
struct fold_term {
    int byte_off;
    int bit_shift;
};

static int init_fold_terms(struct fold_term *terms, uint32_t R)
{
    int n = 0;
    for (int k = 0; k < 32; k++) {
        if (R & (1u << k)) {
            int dist = 64 - k;
            terms[n].byte_off = dist / 8;
            terms[n].bit_shift = dist % 8;
            n++;
        }
    }
    return n;
}

static uint32_t crc32c_chorba(const void *data, size_t len, uint32_t init)
{
    if (len == 0)
        return init;

    /*
     * Chorba generator_64 — REFLECTED convention (like zlib-ng).
     *
     * Buffer: [message_as_is][0000]  (len + 4 bytes, no byte reflection)
     * Init XORed in LE order into first 4 bytes.
     *
     * In reflected CRC, bit 0 of each byte = highest degree within that byte.
     * Fold shifts use << sh (main byte) and >> (8-sh) (spill byte).
     * Tail reduction: bit-at-a-time reflected CRC (right-shift + 0x82F63B78).
     */
    size_t buflen = len + 4;
    uint8_t *buf = (uint8_t *)calloc(1, buflen + 16);
    if (!buf) return 0;

    /* Copy message as-is (reflected convention, no byte reflection) */
    memcpy(buf, data, len);

    /* XOR ~init into first 4 bytes in LE order */
    uint32_t ninit = ~init;
    buf[0] ^= (uint8_t)(ninit);
    buf[1] ^= (uint8_t)(ninit >> 8);
    buf[2] ^= (uint8_t)(ninit >> 16);
    buf[3] ^= (uint8_t)(ninit >> 24);

    /* Build fold table from R = x^64 mod G */
    struct fold_term terms[32];
    int nterms = init_fold_terms(terms, CRC32C_K64);

    /* Fold bytes 0..fold_stop.
     * Each fold writes to byte offsets i+4 through i+8.  For the fold
     * to be valid, ALL targets must be within the buffer (degree ≥ 0),
     * i.e., i + 8 ≤ buflen - 1, so i ≤ buflen - 9 = len - 5. */
    int fold_stop = (int)len - 5;
    for (int i = 0; i <= fold_stop; i++) {
        uint8_t b = buf[i];
        if (b == 0) continue;
        buf[i] = 0;
        for (int t = 0; t < nterms; t++) {
            int off = terms[t].byte_off;
            int sh  = terms[t].bit_shift;
            buf[i + off]     ^= (uint8_t)(b << sh);
            if (sh > 0)
                buf[i + off + 1] ^= (uint8_t)(b >> (8 - sh));
        }
    }

    /* Tail: reduce remaining bytes via polynomial division.
     *
     * Residue = buf[tail_start..len+3] where tail_start = fold_stop + 1.
     * Split into M_residue (bytes tail_start..len-1) and T (bytes len..len+3).
     *
     * The reflected CRC register computes M_residue(x) * x^32 mod G.
     * The full polynomial is P(x) = M_residue(x) * x^32 + T(x), and since
     * both the register result and T have degree < 32:
     *   P(x) mod G = (M_residue * x^32 mod G) XOR T
     */
    int tail_start = fold_stop + 1;
    if (tail_start < 0) tail_start = 0;

    /* CRC register over M_residue bytes (the "message" part of residue) */
    uint32_t rem = 0;
    for (int j = tail_start; j < (int)len; j++) {
        rem ^= (uint32_t)buf[j];
        for (int bit = 0; bit < 8; bit++) {
            if (rem & 1u)
                rem = (rem >> 1) ^ CRC32C_POLY_REF;
            else
                rem >>= 1;
        }
    }

    /* XOR trailing 4 bytes (the low-degree part, read as LE 32-bit) */
    rem ^= (uint32_t)buf[len] | ((uint32_t)buf[len+1] << 8) |
           ((uint32_t)buf[len+2] << 16) | ((uint32_t)buf[len+3] << 24);

    free(buf);
    return ~rem;
}

/* ================================================================
 * 4. Chorba weight-4 — uses x^5275 + x^4508 + x^2751 + 1
 * ================================================================
 *
 * The weight-4 zero poly has only 3 non-constant terms → 3 XORs/byte
 * for the main fold (vs 17 for generator_64).  Trade-off: minimum
 * message size 660 bytes (5275 bits / 8).
 *
 * For packets ≥ 660B: weight-4 fold → generator_64 fold → bitwise tail.
 * For packets < 660B: falls back to pure generator_64.
 *
 * Fold offsets from x^5275 + x^4508 + x^2751 + 1:
 *   dist 5275-4508 =  767 bits → byte_off= 95, sh=7
 *   dist 5275-2751 = 2524 bits → byte_off=315, sh=4
 *   dist 5275-0    = 5275 bits → byte_off=659, sh=3
 */
static uint32_t crc32c_chorba_w4(const void *data, size_t len, uint32_t init)
{
    if (len < 660)
        return crc32c_chorba(data, len, init);

    size_t buflen = len + 4;
    uint8_t *buf = (uint8_t *)calloc(1, buflen + 16);
    if (!buf) return 0;

    memcpy(buf, data, len);

    uint32_t ninit = ~init;
    buf[0] ^= (uint8_t)(ninit);
    buf[1] ^= (uint8_t)(ninit >> 8);
    buf[2] ^= (uint8_t)(ninit >> 16);
    buf[3] ^= (uint8_t)(ninit >> 24);

    /* Phase 1: weight-4 fold (3 XORs/byte).
     * Max write = i + 660.  Valid when i + 660 ≤ buflen - 1 = len + 3. */
    int w4_stop = (int)len - 657;
    for (int i = 0; i <= w4_stop; i++) {
        uint8_t b = buf[i];
        if (b == 0) continue;
        buf[i] = 0;
        buf[i +  95] ^= (uint8_t)(b << 7);
        buf[i +  96] ^= (uint8_t)(b >> 1);
        buf[i + 315] ^= (uint8_t)(b << 4);
        buf[i + 316] ^= (uint8_t)(b >> 4);
        buf[i + 659] ^= (uint8_t)(b << 3);
        buf[i + 660] ^= (uint8_t)(b >> 5);
    }

    /* Phase 2: generator_64 fold for remaining bytes (17 XORs/byte) */
    struct fold_term terms[32];
    int nterms = init_fold_terms(terms, CRC32C_K64);
    int g64_start = w4_stop + 1;
    if (g64_start < 0) g64_start = 0;
    int g64_stop = (int)len - 5;
    for (int i = g64_start; i <= g64_stop; i++) {
        uint8_t b = buf[i];
        if (b == 0) continue;
        buf[i] = 0;
        for (int t = 0; t < nterms; t++) {
            int off = terms[t].byte_off;
            int sh  = terms[t].bit_shift;
            buf[i + off]     ^= (uint8_t)(b << sh);
            if (sh > 0)
                buf[i + off + 1] ^= (uint8_t)(b >> (8 - sh));
        }
    }

    /* Phase 3: tail (same as generator_64) */
    int tail_start = g64_stop + 1;
    if (tail_start < 0) tail_start = 0;
    uint32_t rem = 0;
    for (int j = tail_start; j < (int)len; j++) {
        rem ^= (uint32_t)buf[j];
        for (int bit = 0; bit < 8; bit++) {
            if (rem & 1u)
                rem = (rem >> 1) ^ CRC32C_POLY_REF;
            else
                rem >>= 1;
        }
    }
    rem ^= (uint32_t)buf[len] | ((uint32_t)buf[len+1] << 8) |
           ((uint32_t)buf[len+2] << 16) | ((uint32_t)buf[len+3] << 24);

    free(buf);
    return ~rem;
}

/* ================================================================
 * 5. Chorba weight-6 — uses x^209 + x^144 + x^54 + x^39 + x^14 + 1
 * ================================================================
 *
 * The smallest even-weight zero poly for CRC32C.  5 XORs/byte for
 * the main fold.  Minimum message: 27 bytes (209 bits / 8).
 * All fold targets within 27 bytes — excellent cache locality.
 *
 * Fold offsets:
 *   dist 209-144 =  65 → off= 8, sh=1
 *   dist 209-54  = 155 → off=19, sh=3
 *   dist 209-39  = 170 → off=21, sh=2
 *   dist 209-14  = 195 → off=24, sh=3
 *   dist 209-0   = 209 → off=26, sh=1
 */
static uint32_t crc32c_chorba_w6(const void *data, size_t len, uint32_t init)
{
    if (len < 27)
        return crc32c_chorba(data, len, init);

    size_t buflen = len + 4;
    uint8_t *buf = (uint8_t *)calloc(1, buflen + 16);
    if (!buf) return 0;

    memcpy(buf, data, len);

    uint32_t ninit = ~init;
    buf[0] ^= (uint8_t)(ninit);
    buf[1] ^= (uint8_t)(ninit >> 8);
    buf[2] ^= (uint8_t)(ninit >> 16);
    buf[3] ^= (uint8_t)(ninit >> 24);

    /* Weight-6 fold (5 XORs/byte).
     * Max write = i + 27 (off=26, sh=1 → spill at 27).
     * Valid when i + 27 ≤ buflen - 1 = len + 3, i.e. i ≤ len - 24. */
    int fold_stop = (int)len - 24;
    for (int i = 0; i <= fold_stop; i++) {
        uint8_t b = buf[i];
        if (b == 0) continue;
        buf[i] = 0;
        buf[i +  8] ^= (uint8_t)(b << 1);  /* dist 65 */
        buf[i +  9] ^= (uint8_t)(b >> 7);
        buf[i + 19] ^= (uint8_t)(b << 3);  /* dist 155 */
        buf[i + 20] ^= (uint8_t)(b >> 5);
        buf[i + 21] ^= (uint8_t)(b << 2);  /* dist 170 */
        buf[i + 22] ^= (uint8_t)(b >> 6);
        buf[i + 24] ^= (uint8_t)(b << 3);  /* dist 195 */
        buf[i + 25] ^= (uint8_t)(b >> 5);
        buf[i + 26] ^= (uint8_t)(b << 1);  /* dist 209 */
        buf[i + 27] ^= (uint8_t)(b >> 7);
    }

    /* Tail: bitwise CRC over remaining bytes + trailing 4 */
    int tail_start = fold_stop + 1;
    if (tail_start < 0) tail_start = 0;
    uint32_t rem = 0;
    for (int j = tail_start; j < (int)len; j++) {
        rem ^= (uint32_t)buf[j];
        for (int bit = 0; bit < 8; bit++) {
            if (rem & 1u)
                rem = (rem >> 1) ^ CRC32C_POLY_REF;
            else
                rem >>= 1;
        }
    }
    rem ^= (uint32_t)buf[len] | ((uint32_t)buf[len+1] << 8) |
           ((uint32_t)buf[len+2] << 16) | ((uint32_t)buf[len+3] << 24);

    free(buf);
    return ~rem;
}

/* ================================================================
 * 6. Chorba dense weight-6 — uses x^1285 + x^40 + x^38 + x^19 + x^8 + 1
 * ================================================================
 *
 * "Dense" = inner terms cluster near zero.  All fold targets land
 * within 7 bytes (offsets 155..161), enabling a single 64-bit
 * load-XOR-store instead of 10 separate byte operations.
 *
 * Minimum packet: 162 bytes (1285/8 + 1 for spill).
 * Falls back to w6 (degree 209) for shorter packets.
 *
 * Fold distances from x^1285:
 *   1285-40  = 1245 bits → byte 155, bit 5
 *   1285-38  = 1247 bits → byte 155, bit 7
 *   1285-19  = 1266 bits → byte 158, bit 2
 *   1285-8   = 1277 bits → byte 159, bit 5
 *   1285-0   = 1285 bits → byte 160, bit 5
 *
 * In a LE 64-bit word loaded from buf[i+155]:
 *   byte 155 = bits 0-7, byte 156 = bits 8-15, ...
 * All contributions fit within bits 0..52 — no 64-bit overflow.
 */

static inline uint64_t load64_le(const uint8_t *p)
{
    uint64_t v;
    memcpy(&v, p, 8);
    return v;
}

static inline void store64_le(uint8_t *p, uint64_t v)
{
    memcpy(p, &v, 8);
}

static uint32_t crc32c_chorba_w6_dense(const void *data, size_t len, uint32_t init)
{
    if (len < 162)
        return crc32c_chorba_w6(data, len, init);

    size_t buflen = len + 4;
    uint8_t *buf = (uint8_t *)calloc(1, buflen + 16);
    if (!buf) return 0;

    memcpy(buf, data, len);

    uint32_t ninit = ~init;
    buf[0] ^= (uint8_t)(ninit);
    buf[1] ^= (uint8_t)(ninit >> 8);
    buf[2] ^= (uint8_t)(ninit >> 16);
    buf[3] ^= (uint8_t)(ninit >> 24);

    /* Phase 1: dense weight-6 fold (5 XORs via single 64-bit word).
     * Max write = i + 161.  Valid when i + 161 ≤ buflen - 1 = len + 3,
     * i.e. i ≤ len - 158. */
    int dense_stop = (int)len - 158;
    for (int i = 0; i <= dense_stop; i++) {
        uint8_t b = buf[i];
        if (b == 0) continue;
        buf[i] = 0;
        uint64_t w = load64_le(buf + i + 155);
        w ^= ((uint64_t)b <<  5);  /* dist 1245: byte 155, bit 5 */
        w ^= ((uint64_t)b <<  7);  /* dist 1247: byte 155, bit 7 */
        w ^= ((uint64_t)b << 26);  /* dist 1266: byte 158, bit 2 */
        w ^= ((uint64_t)b << 37);  /* dist 1277: byte 159, bit 5 */
        w ^= ((uint64_t)b << 45);  /* dist 1285: byte 160, bit 5 */
        store64_le(buf + i + 155, w);
    }

    /* Phase 2: w6 (degree 209) fold for remaining bytes */
    int w6_start = dense_stop + 1;
    if (w6_start < 0) w6_start = 0;
    int w6_stop = (int)len - 24;
    for (int i = w6_start; i <= w6_stop; i++) {
        uint8_t b = buf[i];
        if (b == 0) continue;
        buf[i] = 0;
        buf[i +  8] ^= (uint8_t)(b << 1);
        buf[i +  9] ^= (uint8_t)(b >> 7);
        buf[i + 19] ^= (uint8_t)(b << 3);
        buf[i + 20] ^= (uint8_t)(b >> 5);
        buf[i + 21] ^= (uint8_t)(b << 2);
        buf[i + 22] ^= (uint8_t)(b >> 6);
        buf[i + 24] ^= (uint8_t)(b << 3);
        buf[i + 25] ^= (uint8_t)(b >> 5);
        buf[i + 26] ^= (uint8_t)(b << 1);
        buf[i + 27] ^= (uint8_t)(b >> 7);
    }

    /* Phase 3: bitwise tail */
    int tail_start = w6_stop + 1;
    if (tail_start < 0) tail_start = 0;
    uint32_t rem = 0;
    for (int j = tail_start; j < (int)len; j++) {
        rem ^= (uint32_t)buf[j];
        for (int bit = 0; bit < 8; bit++) {
            if (rem & 1u)
                rem = (rem >> 1) ^ CRC32C_POLY_REF;
            else
                rem >>= 1;
        }
    }
    rem ^= (uint32_t)buf[len] | ((uint32_t)buf[len+1] << 8) |
           ((uint32_t)buf[len+2] << 16) | ((uint32_t)buf[len+3] << 24);

    free(buf);
    return ~rem;
}

/* ================================================================
 * Tests
 * ================================================================ */

static int test_count = 0;
static int fail_count = 0;

#define TEST(name, expr) do { \
    test_count++; \
    if (!(expr)) { \
        printf("  FAIL: %s\n", name); \
        fail_count++; \
    } else { \
        printf("  ok:   %s\n", name); \
    } \
} while (0)

static void run_tests(void)
{
    printf("\n--- Tests ---\n\n");

    /* Known answer: CRC32C("123456789") = 0xE3069283 */
    const char *check_str = "123456789";
    uint32_t ka_bitwise = crc32c_bitwise(check_str, 9, 0);
    uint32_t ka_slice8  = crc32c_slice8(check_str, 9, 0);
    uint32_t ka_chorba  = crc32c_chorba(check_str, 9, 0);

    uint32_t ka_w4     = crc32c_chorba_w4(check_str, 9, 0);
    uint32_t ka_w6     = crc32c_chorba_w6(check_str, 9, 0);
    uint32_t ka_w6d    = crc32c_chorba_w6_dense(check_str, 9, 0);

    TEST("bitwise known-answer", ka_bitwise == 0xE3069283);
    TEST("slice8  known-answer", ka_slice8  == 0xE3069283);
    TEST("chorba  known-answer", ka_chorba  == 0xE3069283);
    TEST("w4      known-answer", ka_w4      == 0xE3069283);
    TEST("w6      known-answer", ka_w6      == 0xE3069283);
    TEST("w6dense known-answer", ka_w6d     == 0xE3069283);

    /* Agreement tests across sizes */
    uint8_t testbuf[1600];
    for (int i = 0; i < 1600; i++)
        testbuf[i] = (uint8_t)(i * 37 + 13);

    int agree_ok = 1, agree_w4_ok = 1, agree_w6_ok = 1, agree_w6d_ok = 1;
    int first_fail = -1, first_fail_w4 = -1, first_fail_w6 = -1, first_fail_w6d = -1;
    for (int sz = 0; sz <= 1500; sz++) {
        uint32_t ref = crc32c_bitwise(testbuf, (size_t)sz, 0);
        uint32_t s8  = crc32c_slice8(testbuf, (size_t)sz, 0);
        uint32_t ch  = crc32c_chorba(testbuf, (size_t)sz, 0);
        uint32_t w4  = crc32c_chorba_w4(testbuf, (size_t)sz, 0);
        uint32_t w6  = crc32c_chorba_w6(testbuf, (size_t)sz, 0);
        uint32_t w6d = crc32c_chorba_w6_dense(testbuf, (size_t)sz, 0);
        if (ref != s8 || ref != ch) {
            if (agree_ok) {
                first_fail = sz;
                printf("  MISMATCH at size %d: bitwise=0x%08X slice8=0x%08X chorba=0x%08X\n",
                       sz, ref, s8, ch);
            }
            agree_ok = 0;
        }
        if (ref != w4) {
            if (agree_w4_ok) {
                first_fail_w4 = sz;
                printf("  W4 MISMATCH at size %d: bitwise=0x%08X w4=0x%08X\n", sz, ref, w4);
            }
            agree_w4_ok = 0;
        }
        if (ref != w6) {
            if (agree_w6_ok) {
                first_fail_w6 = sz;
                printf("  W6 MISMATCH at size %d: bitwise=0x%08X w6=0x%08X\n", sz, ref, w6);
            }
            agree_w6_ok = 0;
        }
        if (ref != w6d) {
            if (agree_w6d_ok) {
                first_fail_w6d = sz;
                printf("  W6D MISMATCH at size %d: bitwise=0x%08X w6d=0x%08X\n", sz, ref, w6d);
            }
            agree_w6d_ok = 0;
        }
    }
    TEST("agreement (sizes 0..1500)", agree_ok);
    if (!agree_ok) printf("  First failure at size %d\n", first_fail);
    TEST("w4 agreement (sizes 0..1500)", agree_w4_ok);
    if (!agree_w4_ok) printf("  First w4 failure at size %d\n", first_fail_w4);
    TEST("w6 agreement (sizes 0..1500)", agree_w6_ok);
    if (!agree_w6_ok) printf("  First w6 failure at size %d\n", first_fail_w6);
    TEST("w6dense agreement (sizes 0..1500)", agree_w6d_ok);
    if (!agree_w6d_ok) printf("  First w6dense failure at size %d\n", first_fail_w6d);

    /* Chaining (incremental CRC) */
    uint32_t full = crc32c_bitwise(testbuf, 1000, 0);
    uint32_t part1_bw = crc32c_bitwise(testbuf, 500, 0);
    uint32_t part2_bw = crc32c_bitwise(testbuf + 500, 500, part1_bw);
    uint32_t part1_s8 = crc32c_slice8(testbuf, 500, 0);
    uint32_t part2_s8 = crc32c_slice8(testbuf + 500, 500, part1_s8);
    uint32_t part1_ch = crc32c_chorba(testbuf, 500, 0);
    uint32_t part2_ch = crc32c_chorba(testbuf + 500, 500, part1_ch);
    uint32_t full_1k = crc32c_bitwise(testbuf, 1400, 0);
    uint32_t part1_w4 = crc32c_chorba_w4(testbuf, 700, 0);
    uint32_t part2_w4 = crc32c_chorba_w4(testbuf + 700, 700, part1_w4);

    TEST("chaining bitwise", part2_bw == full);
    TEST("chaining slice8",  part2_s8 == full);
    TEST("chaining chorba",  part2_ch == full);
    TEST("chaining w4",      part2_w4 == full_1k);
    uint32_t full_200 = crc32c_bitwise(testbuf, 200, 0);
    uint32_t part1_w6 = crc32c_chorba_w6(testbuf, 100, 0);
    uint32_t part2_w6 = crc32c_chorba_w6(testbuf + 100, 100, part1_w6);
    TEST("chaining w6",      part2_w6 == full_200);
    uint32_t part1_w6d = crc32c_chorba_w6_dense(testbuf, 800, 0);
    uint32_t part2_w6d = crc32c_chorba_w6_dense(testbuf + 800, 800, part1_w6d);
    TEST("chaining w6dense", part2_w6d == crc32c_bitwise(testbuf, 1600, 0));

    /* Empty input */
    TEST("empty bitwise", crc32c_bitwise("", 0, 0) == 0);
    TEST("empty slice8",  crc32c_slice8("", 0, 0) == 0);
    TEST("empty chorba",  crc32c_chorba("", 0, 0) == 0);
    TEST("empty w4",      crc32c_chorba_w4("", 0, 0) == 0);
    TEST("empty w6",      crc32c_chorba_w6("", 0, 0) == 0);
    TEST("empty w6dense", crc32c_chorba_w6_dense("", 0, 0) == 0);

    /* Single byte */
    uint8_t one = 0xAB;
    uint32_t ref1 = crc32c_bitwise(&one, 1, 0);
    TEST("single-byte slice8", crc32c_slice8(&one, 1, 0) == ref1);
    TEST("single-byte chorba", crc32c_chorba(&one, 1, 0) == ref1);
    TEST("single-byte w4",     crc32c_chorba_w4(&one, 1, 0) == ref1);
    TEST("single-byte w6",     crc32c_chorba_w6(&one, 1, 0) == ref1);
    TEST("single-byte w6dense",crc32c_chorba_w6_dense(&one, 1, 0) == ref1);

    printf("\n  %d/%d tests passed\n", test_count - fail_count, test_count);
}

/* ================================================================
 * Benchmarks
 * ================================================================ */

static double time_ns(struct timespec *start, struct timespec *end)
{
    return (double)(end->tv_sec - start->tv_sec) * 1e9 +
           (double)(end->tv_nsec - start->tv_nsec);
}

static void bench_one(const char *name,
                      uint32_t (*fn)(const void *, size_t, uint32_t),
                      const uint8_t *data, size_t len, int iters)
{
    /* Warmup */
    volatile uint32_t sink = 0;
    for (int i = 0; i < 10; i++)
        sink ^= fn(data, len, 0);

    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (int i = 0; i < iters; i++)
        sink ^= fn(data, len, 0);
    clock_gettime(CLOCK_MONOTONIC, &t1);

    double total_ns = time_ns(&t0, &t1);
    double per_call = total_ns / iters;
    double throughput_mbps = (double)len * iters / (total_ns / 1e9) / 1e6;

    printf("  %-28s %4zuB  %8.1f ns/call  %7.1f MB/s\n",
           name, len, per_call, throughput_mbps);

    (void)sink;
}

static void run_benchmarks(void)
{
    printf("\n--- Benchmarks ---\n\n");

    int sizes[] = {64, 256, 512, 1024, 1500};
    int nsizes = 5;

    uint8_t *data = (uint8_t *)malloc(1500);
    for (int i = 0; i < 1500; i++)
        data[i] = (uint8_t)(i * 53 + 7);

    for (int si = 0; si < nsizes; si++) {
        int sz = sizes[si];
        /* Adjust iterations for roughly 0.5s per measurement */
        int iters = (int)(500000000.0 / (sz * 20)); /* rough estimate */
        if (iters < 1000) iters = 1000;

        printf("  --- %dB ---\n", sz);
        bench_one("slice8",       crc32c_slice8,     data, (size_t)sz, iters);
        bench_one("chorba_w6_dense", crc32c_chorba_w6_dense, data, (size_t)sz, iters);
        bench_one("chorba_w6",    crc32c_chorba_w6,  data, (size_t)sz, iters);
        bench_one("chorba_gen64", crc32c_chorba,     data, (size_t)sz, iters);
        bench_one("chorba_w4",    crc32c_chorba_w4,  data, (size_t)sz, iters);
        bench_one("bitwise",      crc32c_bitwise,    data, (size_t)sz, iters / 10);
        printf("\n");
    }

    free(data);
}

/* ================================================================
 * Main
 * ================================================================ */

int main(int argc, char *argv[])
{
    int do_bench = 0;
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "--bench") == 0)
            do_bench = 1;
    }

    printf("Chorba CRC32C Prototype\n");
    printf("  Generator: G(x) = 0x1EDC6F41 (CRC32C)\n");
    printf("  x^64 mod G = 0x%08X (17 XORs/byte)\n", CRC32C_K64);
    printf("  Method: generator_64, table-free, reflected convention\n");

    run_tests();

    if (do_bench) {
        run_benchmarks();
    } else {
        printf("\nRun with --bench for timing comparison.\n");
    }

    return fail_count > 0 ? 1 : 0;
}
