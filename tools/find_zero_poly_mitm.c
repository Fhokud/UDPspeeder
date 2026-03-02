/*
 * find_zero_poly_mitm.c — Meet-in-the-middle 5-term zero polynomial search.
 *
 * Finds 5-term zero polynomials (x^a + x^b + x^c + x^d + 1) mod G = 0
 * for CRC32C using O(D^2) time + O(D^2) memory, vs the O(D^3) brute force
 * in find_zero_poly.c.
 *
 * Also includes the O(N) 3-term and O(N^2) 4-term searches from the
 * original tool.
 *
 * Target: ARMv8 Neoverse N1, 4 cores, 24 GB RAM.
 * Cross-compile: aarch64-linux-gnu-gcc -O2 -static -pthread \
 *                -o find_zero_poly_mitm tools/find_zero_poly_mitm.c
 * Native:        gcc -O2 -static -pthread \
 *                -o find_zero_poly_mitm tools/find_zero_poly_mitm.c
 *
 * Memory usage for 5-term MITM:
 *   D=30000 →  3.4 GB     D=40000 →  6.0 GB
 *   D=50000 →  9.3 GB     D=55000 → 11.3 GB
 *
 * Reference: Russell, "Chorba: A novel CRC32 implementation", arXiv:2412.16398
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <time.h>
#include <pthread.h>

/* CRC32C generator: x^32 + ... + 1 (low 32 bits of the 33-bit polynomial) */
#define G_CRC32C  0x1EDC6F41u

static int popcount32(uint32_t x)
{
    x = x - ((x >> 1) & 0x55555555u);
    x = (x & 0x33333333u) + ((x >> 2) & 0x33333333u);
    return (int)(((x + (x >> 4)) & 0x0F0F0F0Fu) * 0x01010101u >> 24);
}

/* ================================================================
 * Remainder precomputation: rem[n] = x^n mod G(x) in normal form
 * ================================================================ */

static uint32_t *precompute_remainders(int max_n)
{
    uint32_t *rem = (uint32_t *)malloc((size_t)(max_n + 1) * sizeof(uint32_t));
    if (!rem) { fprintf(stderr, "OOM for %d remainders\n", max_n + 1); exit(1); }

    uint32_t r = 1; /* x^0 mod G = 1 */
    rem[0] = r;
    for (int n = 1; n <= max_n; n++) {
        int msb = (r >> 31) & 1;
        r <<= 1;
        if (msb) r ^= G_CRC32C;
        rem[n] = r;
    }
    return rem;
}

/* ================================================================
 * Simple hash table: uint32_t key → int value (first inserted wins)
 * ================================================================ */

struct ht_entry { uint32_t key; int val; uint8_t used; };

struct ht {
    struct ht_entry *entries;
    int bits;
    uint32_t mask;
};

static struct ht ht_alloc(int n_entries)
{
    struct ht h;
    h.bits = 14;
    while ((1 << h.bits) < n_entries * 4 && h.bits < 28)
        h.bits++;
    h.mask = (1u << h.bits) - 1;
    h.entries = (struct ht_entry *)calloc((size_t)1 << h.bits, sizeof(struct ht_entry));
    if (!h.entries) {
        fprintf(stderr, "OOM for hash table (%zu MB)\n",
                ((size_t)1 << h.bits) * sizeof(struct ht_entry) >> 20);
        exit(1);
    }
    return h;
}

static void ht_free(struct ht *h) { free(h->entries); h->entries = NULL; }

static inline uint32_t ht_hash(const struct ht *h, uint32_t key)
{
    return (key * 2654435761u) >> (32 - h->bits);
}

static void ht_insert(struct ht *h, uint32_t key, int val)
{
    uint32_t idx = ht_hash(h, key);
    while (h->entries[idx].used && h->entries[idx].key != key)
        idx = (idx + 1) & h->mask;
    if (!h->entries[idx].used) {
        h->entries[idx].key = key;
        h->entries[idx].val = val;
        h->entries[idx].used = 1;
    }
}

static inline int ht_lookup(const struct ht *h, uint32_t key)
{
    uint32_t idx = ht_hash(h, key);
    while (h->entries[idx].used) {
        if (h->entries[idx].key == key) return h->entries[idx].val;
        idx = (idx + 1) & h->mask;
    }
    return -1;
}

/* ================================================================
 * 3-term search: x^a + x^b + 1 — O(N) time
 * ================================================================ */

static void search_3term(const uint32_t *rem, int max_n)
{
    printf("\n--- 3-term zero polynomials (x^a + x^b + 1) ---\n\n");

    struct ht ht = ht_alloc(max_n + 1);
    for (int n = 0; n <= max_n; n++)
        ht_insert(&ht, rem[n], n);

    int found = 0;
    for (int a = 2; a <= max_n && found < 10; a++) {
        int b = ht_lookup(&ht, rem[a] ^ 1u);
        if (b > 0 && b < a) {
            printf("  degree %7d: x^%d + x^%d + 1\n", a, a, b);
            found++;
        }
    }
    if (!found)
        printf("  None found up to degree %d\n", max_n);

    ht_free(&ht);
}

/* ================================================================
 * 4-term search: x^a + x^b + x^c + 1 — O(N^2) time
 * ================================================================ */

static void search_4term(const uint32_t *rem, int max_n)
{
    printf("\n--- 4-term zero polynomials (x^a + x^b + x^c + 1) ---\n\n");

    struct ht ht = ht_alloc(max_n + 1);
    for (int c = 1; c <= max_n; c++)
        ht_insert(&ht, rem[c] ^ 1u, c);

    int found = 0;
    time_t t0 = time(NULL);

    for (int a = 3; a <= max_n && found < 10; a++) {
        for (int b = 2; b < a && found < 10; b++) {
            int c = ht_lookup(&ht, rem[a] ^ rem[b]);
            if (c > 0 && c < b) {
                printf("  degree %7d: x^%d + x^%d + x^%d + 1\n", a, a, b, c);
                found++;
            }
        }
        if (a % 10000 == 0) {
            time_t now = time(NULL);
            printf("  ... a=%d/%d (%lds)\n", a, max_n, (long)(now - t0));
        }
    }
    if (!found)
        printf("  None found up to degree %d (%lds)\n",
               max_n, (long)(time(NULL) - t0));

    ht_free(&ht);
}

/* ================================================================
 * 5-term MITM search: x^a + x^b + x^c + x^d + 1
 *
 * Equation: rem[a] ^ rem[b] ^ rem[c] ^ rem[d] = rem[0] = 1
 * Split:    rem[a] ^ rem[b] = rem[c] ^ rem[d] ^ 1
 *
 * Phase 1: build sorted array of (xor_val, i, j) for all pairs
 *          1 ≤ j < i ≤ D.  N_pairs = D*(D-1)/2.
 * Phase 2: for each pair (c, d) with c > d ≥ 1, binary search
 *          for target = rem[c] ^ rem[d] ^ 1 in the sorted array.
 *          If found as (a, b) with a > c and no index overlap,
 *          we have a 5-term zero polynomial.
 *
 * Memory: N_pairs * 8 bytes (4B xor_val + 2B i + 2B j).
 * Time:   O(D^2 log D) for sort, O(D^2 log D) for probe.
 * ================================================================ */

/* Packed pair entry: 4 bytes xor_val, 2 bytes i, 2 bytes j (i > j) */
struct pair_entry {
    uint32_t xor_val;
    uint16_t i;
    uint16_t j;
};

/* Comparison for qsort — sort by xor_val, break ties by i then j */
static int pair_cmp(const void *a, const void *b)
{
    const struct pair_entry *pa = (const struct pair_entry *)a;
    const struct pair_entry *pb = (const struct pair_entry *)b;
    if (pa->xor_val < pb->xor_val) return -1;
    if (pa->xor_val > pb->xor_val) return  1;
    if (pa->i < pb->i) return -1;
    if (pa->i > pb->i) return  1;
    if (pa->j < pb->j) return -1;
    if (pa->j > pb->j) return  1;
    return 0;
}

/* Binary search: find first entry with xor_val == target.
 * Returns index or -1.  Caller must scan forward for all matches. */
static long long bsearch_pair(const struct pair_entry *arr, long long n,
                              uint32_t target)
{
    long long lo = 0, hi = n - 1;
    long long result = -1;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (arr[mid].xor_val < target)
            lo = mid + 1;
        else if (arr[mid].xor_val > target)
            hi = mid - 1;
        else {
            result = mid;
            hi = mid - 1; /* find first */
        }
    }
    return result;
}

/* Thread argument for parallel probe */
struct probe_arg {
    const struct pair_entry *pairs;
    long long n_pairs;
    const uint32_t *rem;
    int d_lo, d_hi;  /* range of outer index d for this thread */
    int max_n;
    /* results */
    int best_degree;
    int best_a, best_b, best_c, best_d;
    long long ops;
};

static void *probe_worker(void *arg)
{
    struct probe_arg *p = (struct probe_arg *)arg;
    int best = p->max_n + 1;
    int ba = 0, bb = 0, bc = 0, bd = 0;
    long long ops = 0;

    for (int d = p->d_lo; d <= p->d_hi; d++) {
        for (int c = d + 1; c <= p->max_n; c++) {
            uint32_t target = p->rem[c] ^ p->rem[d] ^ 1u;
            long long idx = bsearch_pair(p->pairs, p->n_pairs, target);
            if (idx < 0) { ops++; continue; }

            /* Scan all entries with this xor_val */
            for (long long k = idx;
                 k < p->n_pairs && p->pairs[k].xor_val == target;
                 k++) {
                int a = (int)p->pairs[k].i;
                int b = (int)p->pairs[k].j;
                /* Need a > b, c > d, all four distinct, and a > c
                 * (so degree = a, and we find smallest a first) */
                if (a == c || a == d || b == c || b == d) continue;
                if (a <= c) continue; /* degree = max(a,c) = a */
                if (a < best) {
                    best = a; ba = a; bb = b; bc = c; bd = d;
                }
            }
            ops++;
        }
    }

    p->best_degree = best;
    p->best_a = ba; p->best_b = bb; p->best_c = bc; p->best_d = bd;
    p->ops = ops;
    return NULL;
}

static void search_5term_mitm(const uint32_t *rem, int max_n, int n_threads)
{
    printf("\n--- 5-term zero polynomials (MITM, x^a + x^b + x^c + x^d + 1) ---\n");

    if (max_n > 65535) {
        printf("  max_n capped at 65535 (16-bit index packing)\n");
        max_n = 65535;
    }

    long long n_pairs = (long long)max_n * ((long long)max_n - 1) / 2;
    size_t mem_bytes = (size_t)n_pairs * sizeof(struct pair_entry);
    printf("  D=%d  pairs=%lld  memory=%.1f GB  threads=%d\n",
           max_n, n_pairs, (double)mem_bytes / (1024.0*1024*1024), n_threads);
    fflush(stdout);

    struct pair_entry *pairs = (struct pair_entry *)malloc(mem_bytes);
    if (!pairs) {
        fprintf(stderr, "  OOM: need %.1f GB for pair table\n",
                (double)mem_bytes / (1024.0*1024*1024));
        return;
    }

    /* Phase 1: build pair table */
    printf("  Phase 1: building pair table...\n"); fflush(stdout);
    time_t t0 = time(NULL);
    {
        long long idx = 0;
        for (int i = 2; i <= max_n; i++) {
            for (int j = 1; j < i; j++) {
                pairs[idx].xor_val = rem[i] ^ rem[j];
                pairs[idx].i = (uint16_t)i;
                pairs[idx].j = (uint16_t)j;
                idx++;
            }
            if (i % 5000 == 0) {
                time_t now = time(NULL);
                printf("    i=%d/%d  %lld pairs  %lds\n",
                       i, max_n, idx, (long)(now - t0));
                fflush(stdout);
            }
        }
    }
    time_t t1 = time(NULL);
    printf("  Phase 1 done: %lld pairs in %lds\n", n_pairs, (long)(t1 - t0));
    fflush(stdout);

    /* Phase 2: sort by xor_val */
    printf("  Phase 2: sorting...\n"); fflush(stdout);
    qsort(pairs, (size_t)n_pairs, sizeof(struct pair_entry), pair_cmp);
    time_t t2 = time(NULL);
    printf("  Phase 2 done: sorted in %lds\n", (long)(t2 - t1));
    fflush(stdout);

    /* Phase 3: probe — split d range across threads */
    printf("  Phase 3: probing (%d threads)...\n", n_threads);
    fflush(stdout);

    pthread_t *threads = (pthread_t *)malloc((size_t)n_threads * sizeof(pthread_t));
    struct probe_arg *args = (struct probe_arg *)malloc(
        (size_t)n_threads * sizeof(struct probe_arg));

    int chunk = (max_n - 1) / n_threads;
    if (chunk < 1) chunk = 1;

    for (int t = 0; t < n_threads; t++) {
        args[t].pairs = pairs;
        args[t].n_pairs = n_pairs;
        args[t].rem = rem;
        args[t].d_lo = 1 + t * chunk;
        args[t].d_hi = (t == n_threads - 1) ? (max_n - 1) : (args[t].d_lo + chunk - 1);
        args[t].max_n = max_n;
        args[t].best_degree = max_n + 1;
        args[t].ops = 0;
        pthread_create(&threads[t], NULL, probe_worker, &args[t]);
    }

    /* Wait and collect results */
    int overall_best = max_n + 1;
    int oa = 0, ob = 0, oc = 0, od = 0;
    long long total_ops = 0;

    for (int t = 0; t < n_threads; t++) {
        pthread_join(threads[t], NULL);
        total_ops += args[t].ops;
        if (args[t].best_degree < overall_best) {
            overall_best = args[t].best_degree;
            oa = args[t].best_a;
            ob = args[t].best_b;
            oc = args[t].best_c;
            od = args[t].best_d;
        }
    }

    time_t t3 = time(NULL);
    printf("  Phase 3 done: %lld probes in %lds\n", total_ops, (long)(t3 - t2));

    if (overall_best <= max_n) {
        /* Sort exponents descending for display */
        int exp[4] = {oa, ob, oc, od};
        for (int i = 0; i < 3; i++)
            for (int j = i+1; j < 4; j++)
                if (exp[j] > exp[i]) { int tmp = exp[i]; exp[i] = exp[j]; exp[j] = tmp; }
        printf("\n  FOUND degree %d: x^%d + x^%d + x^%d + x^%d + 1\n",
               exp[0], exp[0], exp[1], exp[2], exp[3]);

        /* Verify */
        uint32_t check = rem[exp[0]] ^ rem[exp[1]] ^ rem[exp[2]] ^ rem[exp[3]];
        printf("  Verify: rem[%d]^rem[%d]^rem[%d]^rem[%d] = 0x%08X (expect 0x00000001) %s\n",
               exp[0], exp[1], exp[2], exp[3], check,
               check == 1 ? "OK" : "FAIL!");
    } else {
        printf("\n  No 5-term zero polynomial found up to degree %d\n", max_n);
    }

    printf("  Total time: %lds\n", (long)(t3 - t0));

    free(pairs);
    free(threads);
    free(args);
}

/* Also include the original O(D^3) 5-term search for lower ranges
 * where MITM memory overhead isn't worth it */
static void search_5term_brute(const uint32_t *rem, int max_n)
{
    printf("\n--- 5-term zero polynomials (brute force, x^a + x^b + x^c + x^d + 1) ---\n");
    printf("  O(N) memory, O(D^3) time, searching from smallest degree upward...\n\n");

    struct ht ht = ht_alloc(max_n + 1);
    for (int n = 0; n <= max_n; n++)
        ht_insert(&ht, rem[n], n);

    int found = 0;
    time_t t0 = time(NULL);
    long long ops = 0;

    for (int a = 4; a <= max_n && found < 10; a++) {
        for (int b = 3; b < a && found < 10; b++) {
            uint32_t ab = rem[a] ^ rem[b] ^ 1u;
            for (int c = 2; c < b; c++) {
                int d = ht_lookup(&ht, ab ^ rem[c]);
                if (d > 0 && d < c) {
                    printf("  degree %5d: x^%d + x^%d + x^%d + x^%d + 1\n",
                           a, a, b, c, d);
                    found++;
                    if (found >= 10) break;
                }
                ops++;
            }
        }
        if (a % 1000 == 0) {
            time_t now = time(NULL);
            long elapsed = (long)(now - t0);
            double mops = elapsed > 0 ? (double)ops / elapsed / 1e6 : 0;
            printf("  ... a=%d/%d  %lld ops  %lds  (%.0f Mop/s)\n",
                   a, max_n, ops, elapsed, mops);
            fflush(stdout);
        }
    }

    time_t elapsed = time(NULL) - t0;
    if (!found)
        printf("  None found up to degree %d (%lld ops, %lds)\n",
               max_n, ops, (long)elapsed);

    ht_free(&ht);
}

/* ================================================================
 * Main
 * ================================================================ */

static void usage(const char *prog)
{
    fprintf(stderr,
        "Usage: %s [options] [max_degree]\n"
        "\n"
        "Options:\n"
        "  -t N       Number of threads for MITM probe (default: 4)\n"
        "  -brute N   Use brute-force O(D^3) for 5-term up to degree N\n"
        "             instead of MITM.  Use for small ranges or low RAM.\n"
        "  -skip5     Skip 5-term search entirely\n"
        "\n"
        "Default max_degree: 50000\n"
        "\n"
        "Memory for 5-term MITM: D^2/2 * 8 bytes\n"
        "  D=30000 →  3.4 GB     D=40000 →  6.0 GB\n"
        "  D=50000 →  9.3 GB     D=55000 → 11.3 GB\n"
        "\n", prog);
}

int main(int argc, char *argv[])
{
    int max_n = 50000;
    int n_threads = 4;
    int brute_limit = 0; /* 0 = use MITM */
    int skip5 = 0;

    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-t") == 0 && i + 1 < argc) {
            n_threads = atoi(argv[++i]);
            if (n_threads < 1) n_threads = 1;
            if (n_threads > 64) n_threads = 64;
        } else if (strcmp(argv[i], "-brute") == 0 && i + 1 < argc) {
            brute_limit = atoi(argv[++i]);
        } else if (strcmp(argv[i], "-skip5") == 0) {
            skip5 = 1;
        } else if (strcmp(argv[i], "-h") == 0 || strcmp(argv[i], "--help") == 0) {
            usage(argv[0]);
            return 0;
        } else if (argv[i][0] != '-') {
            max_n = atoi(argv[i]);
        }
    }
    if (max_n < 100) max_n = 100;

    setvbuf(stdout, NULL, _IOLBF, 0);

    printf("================================================================\n");
    printf("CRC32C Zero Polynomial Search (MITM)\n");
    printf("Generator: G(x) = 0x1_1EDC6F41 (18 terms)\n");
    printf("Max degree: %d   Threads: %d\n", max_n, n_threads);
    if (brute_limit > 0)
        printf("5-term: brute force up to %d\n", brute_limit);
    else if (!skip5) {
        long long np = (long long)max_n * ((long long)max_n - 1) / 2;
        printf("5-term: MITM, %.1f GB pair table\n",
               (double)np * 8 / (1024.0*1024*1024));
    }
    printf("================================================================\n");

    printf("\nPrecomputing x^n mod G for n = 0..%d...\n", max_n);
    uint32_t *rem = precompute_remainders(max_n);
    printf("Done.\n");

    /* Key constants */
    printf("\n--- Key reduction constants ---\n\n");
    int terms_table[] = {32, 64, 96, 128, 256, 512, 1024};
    for (int i = 0; i < 7; i++) {
        int n = terms_table[i];
        if (n > max_n) break;
        printf("  x^%-4d mod G = 0x%08X  (%2d terms, %2d XORs/word)\n",
               n, rem[n], popcount32(rem[n]) + 1, popcount32(rem[n]));
    }

    /* Searches */
    search_3term(rem, max_n);
    search_4term(rem, max_n < 100000 ? max_n : 100000);

    if (!skip5) {
        if (brute_limit > 0) {
            search_5term_brute(rem, brute_limit < max_n ? brute_limit : max_n);
        } else {
            search_5term_mitm(rem, max_n, n_threads);
        }
    }

    /* Summary */
    printf("\n================================================================\n");
    printf("C CONSTANTS\n");
    printf("================================================================\n\n");
    printf("#define CRC32C_X64_MOD_G   0x%08Xu\n", rem[64]);
    printf("#define CRC32C_X96_MOD_G   0x%08Xu\n", rem[96]);
    printf("#define CRC32C_X128_MOD_G  0x%08Xu\n", rem[128]);
    printf("\n");

    free(rem);
    return 0;
}
