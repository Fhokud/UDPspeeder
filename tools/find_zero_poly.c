/*
 * find_zero_poly.c — Find sparse zero polynomials for CRC32C over GF(2).
 *
 * A zero polynomial Z(x) satisfies Z(x) mod G(x) = 0.  Sparse zero
 * polynomials (few terms) enable Chorba-style table-free CRC computation.
 *
 * Build:  gcc -O2 -o find_zero_poly tools/find_zero_poly.c
 * Usage:  ./find_zero_poly [max_degree]    (default: 100000)
 *
 * Memory: O(N) — only a remainder array + small hash table.
 * 3-term: O(N) time.  4-term: O(N^2).  5-term: O(N^3) worst case, but
 * searches from smallest degree upward so it stops early once found.
 *
 * Reference: Russell, "Chorba: A novel CRC32 implementation", arXiv:2412.16398
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <time.h>

/*
 * CRC32C (Castagnoli) generator polynomial:
 * G(x) = x^32 + x^28 + x^27 + x^26 + x^25 + x^23 + x^22 + x^20 + x^19
 *       + x^18 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^6 + 1
 */
#define G_CRC32C_LOW  0x1EDC6F41u

static int popcount32(uint32_t x)
{
    x = x - ((x >> 1) & 0x55555555u);
    x = (x & 0x33333333u) + ((x >> 2) & 0x33333333u);
    return (int)(((x + (x >> 4)) & 0x0F0F0F0Fu) * 0x01010101u >> 24);
}

static uint32_t *precompute_remainders(int max_n)
{
    uint32_t *rem = (uint32_t *)malloc((size_t)(max_n + 1) * sizeof(uint32_t));
    if (!rem) { fprintf(stderr, "OOM for %d remainders\n", max_n + 1); exit(1); }

    uint32_t r = 1;
    rem[0] = r;
    for (int n = 1; n <= max_n; n++) {
        int msb = (r >> 31) & 1;
        r <<= 1;
        if (msb)
            r ^= G_CRC32C_LOW;
        rem[n] = r;
    }
    return rem;
}

/* ------------------------------------------------------------------ */
/* Open-addressing hash table: maps uint32_t -> int (smallest index)  */
/* Right-sized to fit L2 cache for better lookup throughput.          */
/* ------------------------------------------------------------------ */

struct ht_entry { uint32_t key; int val; uint8_t used; };

struct ht {
    struct ht_entry *entries;
    int bits;
    uint32_t mask;
};

static struct ht ht_alloc(int n_entries)
{
    struct ht h;
    /* Size to ~25% load factor (next power of 2 above 4*n), min 2^14 */
    h.bits = 14;
    while ((1 << h.bits) < n_entries * 4 && h.bits < 28)
        h.bits++;
    h.mask = (1u << h.bits) - 1;
    size_t sz = (size_t)(1 << h.bits) * sizeof(struct ht_entry);
    h.entries = (struct ht_entry *)calloc((size_t)1 << h.bits, sizeof(struct ht_entry));
    if (!h.entries) { fprintf(stderr, "OOM for hash table (%zu MB)\n", sz >> 20); exit(1); }
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

/* Returns -1 if not found */
static inline int ht_lookup(const struct ht *h, uint32_t key)
{
    uint32_t idx = ht_hash(h, key);
    while (h->entries[idx].used) {
        if (h->entries[idx].key == key)
            return h->entries[idx].val;
        idx = (idx + 1) & h->mask;
    }
    return -1;
}

/* ------------------------------------------------------------------ */
/* 3-term: x^a + x^b + 1  —  O(N) time, O(N) memory                 */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* 4-term: x^a + x^b + x^c + 1  —  O(N^2) time, O(N) memory        */
/*                                                                    */
/* rem[a] ^ rem[b] = rem[c] ^ 1                                      */
/* Hash table of (rem[c] ^ 1) for all c.  Iterate pairs (a, b).      */
/* ------------------------------------------------------------------ */
static void search_4term(const uint32_t *rem, int max_n)
{
    printf("\n--- 4-term zero polynomials (x^a + x^b + x^c + 1) ---\n\n");

    struct ht ht = ht_alloc(max_n + 1);
    for (int c = 1; c <= max_n; c++)
        ht_insert(&ht, rem[c] ^ 1u, c);

    int found = 0;
    long long checked = 0;
    time_t t0 = time(NULL);

    for (int a = 3; a <= max_n && found < 10; a++) {
        for (int b = 2; b < a && found < 10; b++) {
            int c = ht_lookup(&ht, rem[a] ^ rem[b]);
            if (c > 0 && c < b && c != a && c != b) {
                printf("  degree %7d: x^%d + x^%d + x^%d + 1\n", a, a, b, c);
                found++;
            }
            checked++;
        }
        if (a % 10000 == 0) {
            time_t now = time(NULL);
            printf("  ... a=%d/%d (%lds)\n", a, max_n, (long)(now - t0));
        }
    }
    if (!found)
        printf("  None found up to degree %d (%lld pairs, %lds)\n",
               max_n, checked, (long)(time(NULL) - t0));

    ht_free(&ht);
}

/* ------------------------------------------------------------------ */
/* 5-term: x^a + x^b + x^c + x^d + 1                                */
/*                                                                    */
/* O(N) memory, O(D^3) time where D = degree of smallest result.     */
/* Hash table of rem[n] for all n.  Triple loop (a > b > c > 0),     */
/* compute target_d = rem[a]^rem[b]^rem[c]^1, hash lookup for d.     */
/*                                                                    */
/* Searches from smallest degree upward — stops as soon as we have   */
/* enough results.  If smallest 5-term is at degree 300 (like IEEE), */
/* this finishes in milliseconds.                                     */
/* ------------------------------------------------------------------ */
static void search_5term(const uint32_t *rem, int max_n)
{
    printf("\n--- 5-term zero polynomials (x^a + x^b + x^c + x^d + 1) ---\n");
    printf("  O(N) memory, searching from smallest degree upward...\n\n");

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
            double ops_per_sec = elapsed > 0 ? (double)ops / elapsed : 0;
            double est_total = (double)a * (double)a * (double)a / 6.0;
            double est_max = (double)max_n * (double)max_n * (double)max_n / 6.0;
            double pct = 100.0 * est_total / est_max;
            double est_remain_s = ops_per_sec > 0 ?
                (est_max - (double)ops) / ops_per_sec : 0;
            printf("  ... a=%d/%d  %lld ops  %lds  (%.0f Mop/s)  ~%.0f%% done  ~%.0fh remain\n",
                   a, max_n, ops, elapsed,
                   ops_per_sec / 1e6, pct, est_remain_s / 3600.0);
        }
    }

    time_t elapsed = time(NULL) - t0;
    if (!found)
        printf("  None found up to degree %d (%lld ops, %lds)\n",
               max_n, ops, (long)elapsed);
    else
        printf("  Found %d results (%lld ops, %lds)\n",
               found, ops, (long)elapsed);

    ht_free(&ht);
}

/* ------------------------------------------------------------------ */
/* 6-term: x^a + x^b + x^c + x^d + x^e + 1  (even weight)           */
/*                                                                    */
/* O(N) memory, O(D^4) time.  Hash table of rem[n], quadruple loop.  */
/* CRC32C has (x+1)|G, so only even-weight zero polys exist.          */
/* This is the smallest useful weight class for CRC32C.               */
/* ------------------------------------------------------------------ */
static void search_6term(const uint32_t *rem, int max_n)
{
    printf("\n--- 6-term zero polynomials (x^a+x^b+x^c+x^d+x^e+1) ---\n");
    printf("  O(N) memory, O(D^4) time\n\n");

    struct ht ht = ht_alloc(max_n + 1);
    for (int n = 0; n <= max_n; n++)
        ht_insert(&ht, rem[n], n);

    int found = 0;
    time_t t0 = time(NULL);
    long long ops = 0;

    for (int a = 5; a <= max_n && found < 10; a++) {
        for (int b = 4; b < a && found < 10; b++) {
            uint32_t ab = rem[a] ^ rem[b];
            for (int c = 3; c < b && found < 10; c++) {
                uint32_t abc = ab ^ rem[c];
                for (int d = 2; d < c; d++) {
                    int e = ht_lookup(&ht, abc ^ rem[d] ^ 1u);
                    if (e > 0 && e < d) {
                        printf("  degree %5d: x^%d + x^%d + x^%d + x^%d + x^%d + 1\n",
                               a, a, b, c, d, e);
                        found++;
                        if (found >= 10) break;
                    }
                    ops++;
                }
            }
        }
        if (a % 100 == 0) {
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
    else
        printf("  Found %d results (%lld ops, %lds)\n",
               found, ops, (long)elapsed);

    ht_free(&ht);
}

/* ------------------------------------------------------------------ */
/* 8-term: x^a+x^b+x^c+x^d+x^e+x^f+x^g+1  (even weight)           */
/*                                                                    */
/* O(N) memory, O(D^6) time.  Only practical for small D (< ~200).   */
/* ------------------------------------------------------------------ */
static void search_8term(const uint32_t *rem, int max_n)
{
    printf("\n--- 8-term zero polynomials (x^a+...+x^g+1) ---\n");
    printf("  O(N) memory, O(D^6) time\n\n");

    struct ht ht = ht_alloc(max_n + 1);
    for (int n = 0; n <= max_n; n++)
        ht_insert(&ht, rem[n], n);

    int found = 0;
    time_t t0 = time(NULL);
    long long ops = 0;

    for (int a = 7; a <= max_n && found < 10; a++) {
        for (int b = 6; b < a && found < 10; b++) {
            uint32_t ab = rem[a] ^ rem[b];
            for (int c = 5; c < b && found < 10; c++) {
                uint32_t abc = ab ^ rem[c];
                for (int d = 4; d < c && found < 10; d++) {
                    uint32_t abcd = abc ^ rem[d];
                    for (int e = 3; e < d && found < 10; e++) {
                        uint32_t abcde = abcd ^ rem[e];
                        for (int f = 2; f < e; f++) {
                            int g = ht_lookup(&ht, abcde ^ rem[f] ^ 1u);
                            if (g > 0 && g < f) {
                                printf("  degree %5d: x^%d+x^%d+x^%d+x^%d+x^%d+x^%d+x^%d+1\n",
                                       a, a, b, c, d, e, f, g);
                                found++;
                                if (found >= 10) break;
                            }
                            ops++;
                        }
                    }
                }
            }
        }
        if (a % 20 == 0) {
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
    else
        printf("  Found %d results (%lld ops, %lds)\n",
               found, ops, (long)elapsed);

    ht_free(&ht);
}

/* ------------------------------------------------------------------ */
/* Dense 6-term: x^a + x^b + x^c + x^d + x^e + 1                    */
/* Inner terms (b,c,d,e) ≤ max_inner; 'a' is the far term found via  */
/* hash lookup.  O(max_inner^4) time — trivial for max_inner ≤ 128.  */
/* Produces polynomials like Russell's x^14870+x^22+x^11+x^7+1 for  */
/* IEEE, where inner terms cluster near zero for register-only work.  */
/* ------------------------------------------------------------------ */
static void search_6term_dense(const uint32_t *rem, int max_n)
{
    int max_inner = 128;
    if (max_inner > max_n) max_inner = max_n;

    printf("\n--- Dense 6-term zero polynomials (inner terms ≤ %d) ---\n", max_inner);
    printf("  Looking for x^a + x^b + x^c + x^d + x^e + 1\n");
    printf("  where b,c,d,e ≤ %d and a > %d\n\n", max_inner, max_inner);

    struct ht ht = ht_alloc(max_n + 1);
    for (int n = 0; n <= max_n; n++)
        ht_insert(&ht, rem[n], n);

    int found = 0;
    long long ops = 0;
    time_t t0 = time(NULL);

    /* Collect results, then sort by degree */
    struct { int a, b, c, d, e; } results[200];
    int nresults = 0;

    for (int b = 4; b <= max_inner; b++) {
        for (int c = 3; c < b; c++) {
            uint32_t bc = rem[b] ^ rem[c];
            for (int d = 2; d < c; d++) {
                uint32_t bcd = bc ^ rem[d];
                for (int e = 1; e < d; e++) {
                    uint32_t target = bcd ^ rem[e] ^ 1u;
                    int a = ht_lookup(&ht, target);
                    if (a > max_inner && nresults < 200) {
                        results[nresults].a = a;
                        results[nresults].b = b;
                        results[nresults].c = c;
                        results[nresults].d = d;
                        results[nresults].e = e;
                        nresults++;
                    }
                    ops++;
                }
            }
        }
    }

    /* Sort by degree (a), then by max inner term (b) */
    for (int i = 0; i < nresults - 1; i++)
        for (int j = i + 1; j < nresults; j++)
            if (results[j].a < results[i].a ||
                (results[j].a == results[i].a && results[j].b < results[i].b)) {
                __typeof__(results[0]) tmp = results[i];
                results[i] = results[j];
                results[j] = tmp;
            }

    /* Print top results */
    int show = nresults < 30 ? nresults : 30;
    for (int i = 0; i < show; i++) {
        int a = results[i].a, b = results[i].b, c = results[i].c;
        int d = results[i].d, e = results[i].e;
        printf("  degree %7d: x^%d + x^%d + x^%d + x^%d + x^%d + 1  (stride %d)\n",
               a, a, b, c, d, e, (a + 7) / 8);
    }

    time_t elapsed = time(NULL) - t0;
    printf("\n  %d results total (%lld ops, %lds)\n", nresults, ops, (long)elapsed);

    ht_free(&ht);
}

/* ------------------------------------------------------------------ */
int main(int argc, char *argv[])
{
    int max_n = 100000;
    if (argc > 1) max_n = atoi(argv[1]);
    if (max_n < 100) max_n = 100;

    /* Line-buffer stdout so progress appears immediately when piped */
    setvbuf(stdout, NULL, _IOLBF, 0);

    printf("================================================================\n");
    printf("CRC32C Zero Polynomial Search (max degree = %d)\n", max_n);
    printf("Generator: G(x) = 0x1_1EDC6F41 (18 terms)\n");
    /* Hash table: 4*max_n entries, 12 bytes each */
    size_t ht_entries = 1;
    { int b = 14; while ((int)(1 << b) < (max_n+1)*4 && b < 28) b++; ht_entries = (size_t)1 << b; }
    printf("RAM: ~%d MB (remainder array) + ~%d MB (hash table)\n",
           (int)((size_t)(max_n + 1) * 4 / (1024*1024)),
           (int)(ht_entries * sizeof(struct ht_entry) / (1024*1024)));
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
        uint32_t r = rem[n];
        printf("  x^%-4d mod G = 0x%08X  (%2d terms in zero poly, %2d XORs/word)\n",
               n, r, popcount32(r) + 1, popcount32(r));
    }

    /* Extended generator */
    printf("\n--- Extended generator: x^64 + (x^64 mod G) ---\n\n");
    {
        uint32_t r64 = rem[64];
        printf("  R = 0x%08X\n", r64);
        printf("  Terms: x^64");
        for (int bit = 31; bit >= 0; bit--)
            if (r64 & (1u << bit))
                printf(" + x^%d", bit);
        printf("\n");
        printf("  Total %d terms, %d XORs per 64-bit word\n",
               popcount32(r64) + 1, popcount32(r64));
    }

    /* Searches.
     * Note: CRC32C has (x+1)|G(x) (18 terms = even), so ALL zero polynomials
     * must have even weight.  3-term and 5-term are provably impossible. */
    search_3term(rem, max_n);
    search_4term(rem, max_n < 100000 ? max_n : 100000);

    printf("\n  [5-term: SKIPPED — (x+1)|G forces even weight only]\n");

    search_6term(rem, max_n < 1000 ? max_n : 1000);
    search_8term(rem, max_n < 200 ? max_n : 200);
    search_6term_dense(rem, max_n);

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
