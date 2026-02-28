#include "bench_common.h"
#include "lib/rs.h"
#include <cstdio>
#include <cstdlib>
#include <cstring>

#define TEST(name, expr) do { \
    if (!(expr)) { printf("  FAIL: %s\n", name); failures++; } \
    else { printf("  ok:   %s\n", name); } \
} while(0)

static void fill_pattern(char *buf, int sz, int seed) {
    for (int i = 0; i < sz; i++)
        buf[i] = (char)((i + seed) & 0xFF);
}

static int test_addmul1_identity() {
    int failures = 0;
    const int sz = 256;
    gf dst[256], src[256], expected[256];

    /* Multiply by 1: dst ^= src * 1 == dst ^= src */
    memset(dst, 0, sz);
    for (int i = 0; i < sz; i++) src[i] = (gf)(i & 0xFF);

    bench_addmul1(dst, src, 1, sz);

    TEST("addmul1(dst=0, src, c=1) == src", memcmp(dst, src, sz) == 0);

    /* Multiply by 0: dst should be unchanged */
    for (int i = 0; i < sz; i++) dst[i] = (gf)i;
    memcpy(expected, dst, sz);

    bench_addmul1(dst, src, 0, sz);

    TEST("addmul1(dst, src, c=0) leaves dst unchanged", memcmp(dst, expected, sz) == 0);

    return failures;
}

static int test_addmul1_linearity() {
    int failures = 0;
    const int sz = 256;
    gf src[256], dst_a[256], dst_b[256], dst_ab[256];

    for (int i = 0; i < sz; i++) src[i] = (gf)((i * 37 + 11) & 0xFF);

    /* addmul1(c=a) then addmul1(c=b) should equal addmul1(c=a^b)
     * in GF(2^8), addition is XOR, but multiplication distributes:
     *   src*a XOR src*b == src*(a XOR b)  [only in GF(2^n)]
     * We verify this by running both paths. */
    gf a = 0x53, b = 0xCA;

    memset(dst_a, 0, sz);
    bench_addmul1(dst_a, src, a, sz);
    bench_addmul1(dst_a, src, b, sz);

    memset(dst_ab, 0, sz);
    /* In GF(2^8), src*a ^ src*b = src*(a^b) */
    bench_addmul1(dst_ab, src, a ^ b, sz);

    TEST("addmul1 linearity: (src*a)^(src*b) == src*(a^b)",
         memcmp(dst_a, dst_ab, sz) == 0);

    return failures;
}

static int test_addmul1_sizes() {
    int failures = 0;

    /* Test that addmul1 works at all benchmark sizes (catches off-by-one in unrolling) */
    for (int i = 0; i < bench_sizes_count; i++) {
        int sz = (int)bench_sizes[i];
        gf *dst = (gf *)calloc(sz, 1);
        gf *src = (gf *)calloc(sz, 1);

        for (int j = 0; j < sz; j++) src[j] = (gf)((j * 7) & 0xFF);
        bench_addmul1(dst, src, 1, sz);

        char name[64];
        snprintf(name, sizeof(name), "addmul1 c=1 at %d bytes", sz);
        TEST(name, memcmp(dst, src, sz) == 0);

        free(dst);
        free(src);
    }
    return failures;
}

static int test_rs_roundtrip(int k, int n, int pkt_sz) {
    int failures = 0;
    int redundant = n - k;
    char label[64];
    snprintf(label, sizeof(label), "rs round-trip k=%d n=%d sz=%d", k, n, pkt_sz);

    /* Allocate and fill original data */
    char **data = (char **)calloc(n, sizeof(char *));
    char **orig = (char **)calloc(k, sizeof(char *));
    for (int i = 0; i < n; i++)
        data[i] = (char *)calloc(1, pkt_sz);
    for (int i = 0; i < k; i++) {
        fill_pattern(data[i], pkt_sz, i * 31);
        orig[i] = (char *)calloc(1, pkt_sz);
        memcpy(orig[i], data[i], pkt_sz);
    }

    /* Encode */
    rs_encode2(k, n, data, pkt_sz);

    /* Simulate losing the first 'redundant' data packets */
    for (int i = 0; i < redundant; i++)
        data[i] = NULL;

    /* Decode */
    int rc = rs_decode2(k, n, data, pkt_sz);
    if (rc != 0) {
        snprintf(label, sizeof(label), "rs_decode2 returned %d for k=%d n=%d", rc, k, n);
        TEST(label, 0);
        goto cleanup;
    }

    /* Verify recovered data matches originals */
    for (int i = 0; i < k; i++) {
        snprintf(label, sizeof(label), "rs data[%d] matches (k=%d n=%d)", i, k, n);
        TEST(label, data[i] != NULL && memcmp(data[i], orig[i], pkt_sz) == 0);
    }

cleanup:
    /* Free all non-null pointers in data[] (decode may have rearranged them) */
    /* Since rs_decode reuses memory, we need to track what was allocated */
    /* Simple approach: free orig separately, free remaining data bufs */
    for (int i = 0; i < k; i++) free(orig[i]);
    free(orig);
    /* data[] pointers may alias the original allocations; the calloc'd buffers
     * that weren't NULLed are still valid. We allocated n buffers initially,
     * NULLed 'redundant' of them. The decode reused the non-null ones.
     * Since we can't easily track which are unique, just leak here — it's a test. */
    free(data);

    return failures;
}

/*
 * RS round-trip losing specific shard indices (instead of always the first r).
 * lose_idx[0..lose_count-1] lists which of the n shards to NULL before decode.
 */
static int test_rs_roundtrip_pattern(int k, int n, int pkt_sz,
                                     const int *lose_idx, int lose_count,
                                     const char *pattern_name) {
    int failures = 0;
    int redundant = n - k;
    char label[128];

    if (lose_count > redundant) {
        snprintf(label, sizeof(label), "rs k=%d n=%d %s: lose_count(%d) > redundant(%d)",
                 k, n, pattern_name, lose_count, redundant);
        TEST(label, 0);
        return failures;
    }

    char **data = (char **)calloc(n, sizeof(char *));
    char **orig = (char **)calloc(k, sizeof(char *));
    for (int i = 0; i < n; i++)
        data[i] = (char *)calloc(1, pkt_sz);
    for (int i = 0; i < k; i++) {
        fill_pattern(data[i], pkt_sz, i * 31);
        orig[i] = (char *)calloc(1, pkt_sz);
        memcpy(orig[i], data[i], pkt_sz);
    }

    rs_encode2(k, n, data, pkt_sz);

    for (int i = 0; i < lose_count; i++)
        data[lose_idx[i]] = NULL;

    int rc = rs_decode2(k, n, data, pkt_sz);
    snprintf(label, sizeof(label), "rs k=%d n=%d %s: decode ok", k, n, pattern_name);
    if (rc != 0) {
        TEST(label, 0);
        goto cleanup;
    }
    TEST(label, 1);

    for (int i = 0; i < k; i++) {
        snprintf(label, sizeof(label), "rs k=%d n=%d %s: data[%d] matches",
                 k, n, pattern_name, i);
        TEST(label, data[i] != NULL && memcmp(data[i], orig[i], pkt_sz) == 0);
    }

cleanup:
    for (int i = 0; i < k; i++) free(orig[i]);
    free(orig);
    free(data);
    return failures;
}

int run_fec_tests() {
    int failures = 0;

    /* GF tables are initialized inside fec_new; force init via a dummy allocation */
    void *dummy = fec_new(2, 3);
    fec_free(dummy);

    printf("[addmul1 identity]\n");
    failures += test_addmul1_identity();

    printf("[addmul1 linearity]\n");
    failures += test_addmul1_linearity();

    printf("[addmul1 sizes]\n");
    failures += test_addmul1_sizes();

    printf("[rs round-trip: lose first r]\n");
    failures += test_rs_roundtrip(2, 4, 1500);
    failures += test_rs_roundtrip(5, 8, 1500);
    failures += test_rs_roundtrip(10, 15, 1024);

    /* Additional k/n combos */
    printf("[rs round-trip: more k/n combos]\n");
    failures += test_rs_roundtrip(1, 2, 1500);
    failures += test_rs_roundtrip(1, 3, 1500);
    failures += test_rs_roundtrip(20, 30, 1024);
    failures += test_rs_roundtrip(50, 75, 512);

    /* Diverse loss patterns */
    printf("[rs round-trip: lose last r]\n");
    {
        /* k=5 n=8: lose shards 5,6,7 (last 3) */
        int lose[] = {5, 6, 7};
        failures += test_rs_roundtrip_pattern(5, 8, 1500, lose, 3, "lose-last");
    }
    {
        /* k=10 n=15: lose shards 10,11,12,13,14 */
        int lose[] = {10, 11, 12, 13, 14};
        failures += test_rs_roundtrip_pattern(10, 15, 1024, lose, 5, "lose-last");
    }

    printf("[rs round-trip: lose every-other]\n");
    {
        /* k=5 n=8: lose shards 0,2,4 (every other, 3 lost = r) */
        int lose[] = {0, 2, 4};
        failures += test_rs_roundtrip_pattern(5, 8, 1500, lose, 3, "lose-evens");
    }
    {
        /* k=10 n=15: lose shards 1,3,5,7,9 (odd indices, 5 lost = r) */
        int lose[] = {1, 3, 5, 7, 9};
        failures += test_rs_roundtrip_pattern(10, 15, 1024, lose, 5, "lose-odds");
    }

    printf("[rs round-trip: lose middle]\n");
    {
        /* k=5 n=8: lose shards 2,3,4 (middle) */
        int lose[] = {2, 3, 4};
        failures += test_rs_roundtrip_pattern(5, 8, 1500, lose, 3, "lose-middle");
    }
    {
        /* k=20 n=30: lose shards 5,10,15,20,25,6,11,16,21,26 (scattered) */
        int lose[] = {5, 6, 10, 11, 15, 16, 20, 21, 25, 26};
        failures += test_rs_roundtrip_pattern(20, 30, 512, lose, 10, "lose-scattered");
    }

    /* Multi-threaded RS tests: enable threads, re-run same tests */
    printf("[rs MT round-trip: threads=2]\n");
    fec_set_threads(2);
    failures += test_rs_roundtrip(5, 8, 1500);
    failures += test_rs_roundtrip(10, 15, 1024);
    failures += test_rs_roundtrip(20, 30, 1024);
    {
        int lose[] = {5, 6, 10, 11, 15, 16, 20, 21, 25, 26};
        failures += test_rs_roundtrip_pattern(20, 30, 512, lose, 10, "MT-lose-scattered");
    }

    printf("[rs MT round-trip: threads=4]\n");
    fec_set_threads(4);
    failures += test_rs_roundtrip(5, 8, 1500);
    failures += test_rs_roundtrip(10, 15, 1024);
    failures += test_rs_roundtrip(20, 30, 1024);
    failures += test_rs_roundtrip(50, 75, 512);
    {
        int lose[] = {1, 3, 5, 7, 9};
        failures += test_rs_roundtrip_pattern(10, 15, 1024, lose, 5, "MT-lose-odds");
    }

    /* Restore single-threaded */
    fec_set_threads(1);

    return failures;
}
