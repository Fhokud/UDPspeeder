# Chorba CRC32C: Table-Free CRC Investigation

Investigating the Chorba algorithm (Russell, arXiv:2412.16398) as a
table-free CRC32C implementation for platforms without hardware CRC
and where the 8KB slicing-by-8 lookup tables pollute L1 data cache
(notably PPC e500v2 with 16KB L1D).

## Background

The Chorba algorithm computes CRC without lookup tables by exploiting
**zero polynomials**: polynomials Z(x) where Z(x) mod G(x) = 0. If
Z(x) has few terms (low weight), XORing Z into the message buffer at
any position preserves the CRC, enabling a fold-and-reduce strategy
with cost proportional to the number of terms in Z.

Russell demonstrated this for CRC32-IEEE (0x04C11DB7) using weight-3,
weight-4, and weight-5 zero polynomials. The best performer was
x^14870 + x^22 + x^11 + x^7 + 1 (weight 5, dense inner terms).

This document records the adaptation to CRC32C (Castagnoli, 0x1EDC6F41).

## Key theoretical result: (x+1) divides G(x)

CRC32C's generator polynomial has **18 terms** (even count):

    G(x) = x^32 + x^28 + x^27 + x^26 + x^25 + x^23 + x^22 + x^20
          + x^19 + x^18 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8
          + x^6 + 1

Since the term count is even, G(1) = 0 over GF(2), meaning **(x+1)
divides G(x)**.

This has a critical consequence for zero polynomial weights. If Z(x)
is a zero polynomial (i.e., G(x) | Z(x)), then (x+1) | Z(x) as well.
Evaluating Z(1) = 0 means Z must have an even number of terms.

**All odd-weight zero polynomials (weight 3, 5, 7, ...) are
mathematically impossible for CRC32C.**

This is why Russell found weight-3 and weight-5 zero polynomials for
CRC32-IEEE (15 terms, odd count, G(1) = 1) but no such polynomials
can exist for CRC32C. The search strategy must target weight 4, 6, 8.

For reference, CRC32-IEEE has its smallest weight-5 zero poly at degree
300. CRC32C's smallest weight-6 zero poly is at degree 209 — similar
order of magnitude, confirming the even-weight restriction is the only
fundamental difference.

## Zero polynomial search results

Search tool: `tools/find_zero_poly.c`. Precomputes x^n mod G for n up
to max_degree, then searches for sparse zero polynomials via hash table
lookup. Complexity varies by weight class.

### Weight 2 (trinomials): none exist

No x^a + x^b + 1 found up to degree 100,000. Expected — CRC32C was
designed for maximal Hamming distance, which requires large minimum-weight
multiples.

### Weight 4: first at degree 5,275

```
x^5275 + x^4508 + x^2751 + 1
x^5282 + x^4921 + x^1672 + 1
x^5321 + x^3574 + x^2491 + 1
```

3 XORs per message byte. Minimum packet: 660 bytes. Terms are widely
spaced (stride 659 bytes), causing poor cache locality despite the low
XOR count.

### Weight 6: first at degree 209

```
x^209 + x^144 + x^54 + x^39 + x^14 + 1
x^210 + x^185 + x^66 + x^41 + x^12 + 1
x^266 + x^143 + x^121 + x^88 + x^71 + 1
```

5 XORs per message byte. Minimum packet: 27 bytes. All fold targets
within 27 bytes of the fold position — excellent cache locality, fitting
entirely within a single cache line.

### Weight 8: first at degree 79

```
x^79 + x^75 + x^71 + x^58 + x^18 + x^12 + x^1 + 1
x^82 + x^79 + x^73 + x^44 + x^38 + x^9  + x^2 + 1
```

7 XORs per byte with 10-byte stride. Higher XOR count than weight-6
with only slightly better locality — not competitive.

### Dense weight 6 (inner terms clustered near zero)

Inspired by Russell's best IEEE result (x^14870 + x^22 + x^11 + x^7 + 1
where inner terms cluster for register-only computation), searched for
CRC32C weight-6 polys with all inner terms ≤ 128:

```
x^1059  + x^88 + x^85 + x^43 + x^4  + 1   (stride 133B)
x^1281  + x^90 + x^21 + x^14 + x^13 + 1   (stride 161B)
x^1285  + x^40 + x^38 + x^19 + x^8  + 1   (stride 161B)
x^2570  + x^80 + x^76 + x^38 + x^16 + 1   (stride 322B)
```

200 results found in <1 second (O(max_inner^4) search, trivial for
inner ≤ 128).

The degree-1285 polynomial has the tightest inner cluster: all terms
within 40 bits = 5 bytes. All fold targets land within 7 bytes (offsets
155-161 from fold position), enabling a single 64-bit load-XOR-store
per fold step.

## Implementations

All implementations work in **reflected convention** (LSB-first, like
zlib-ng). No byte reflection needed; ~init XORed into first 4 bytes in
LE order; buffer = [message][0000] with trailing zeros for x^32
multiplication.

### chorba_gen64 (baseline Chorba)

Uses the generator zero polynomial x^64 + (x^64 mod G). For CRC32C,
x^64 mod G = 0x3AAB4576, which has 17 set bits. Cost: 17 XORs per
message byte. Fold stride: 8 bytes.

### chorba_w4 (weight-4, degree 5275)

3 XORs/byte. Falls back to gen64 for packets < 660B. Fold stride:
660 bytes.

### chorba_w6 (weight-6, degree 209)

5 XORs/byte. Falls back to gen64 for packets < 27B. Fold stride:
27 bytes. All fold targets within a single cache line.

Fold offsets from x^209:
```
dist 209-144 =  65 bits → byte_off= 8, shift=1
dist 209-54  = 155 bits → byte_off=19, shift=3
dist 209-39  = 170 bits → byte_off=21, shift=2
dist 209-14  = 195 bits → byte_off=24, shift=3
dist 209-0   = 209 bits → byte_off=26, shift=1
```

### chorba_w6_dense (weight-6, degree 1285)

5 XORs/byte via single 64-bit word operation. Falls back to w6 for
packets < 162B. Fold stride: 162 bytes.

All fold targets pack into a 64-bit word at offset i+155:
```
(uint64_t)b <<  5   dist 1245: byte 155, bit 5
(uint64_t)b <<  7   dist 1247: byte 155, bit 7
(uint64_t)b << 26   dist 1266: byte 158, bit 2
(uint64_t)b << 37   dist 1277: byte 159, bit 5
(uint64_t)b << 45   dist 1285: byte 160, bit 5
```

Max bit position: 45 + 7 = 52 < 64 — no overflow. Single load, 5
shift-XOR, single store per fold step.

## Benchmark results

Intel i5-7300U (Kaby Lake), gcc -O2. All values in MB/s.

| Method | 64B | 256B | 512B | 1024B | 1500B |
|---|---|---|---|---|---|
| **slice8** (8KB tables) | **2528** | **2332** | **2338** | **2381** | **2419** |
| **chorba_w6** (deg 209) | **134** | **174** | **178** | **188** | **188** |
| chorba_w6_dense (deg 1285) | 100 | 135 | 135 | 129 | 129 |
| bitwise (reference) | 99 | 98 | 100 | 100 | 95 |
| chorba_w4 (deg 5275) | 29 | 29 | 28 | 43 | 43 |
| chorba_gen64 (x^64) | 30 | 30 | 28 | 30 | 25 |

### Analysis

**chorba_w6 is the clear winner** among table-free Chorba variants:
2x faster than bitwise, and the best Chorba result at every packet size.

**Dense weight-6 is slower than non-dense** despite fewer memory
operations per fold step. The 155-byte gap between the read position
and the write cluster (2-3 cache lines apart) creates pipeline stalls
that outweigh the 64-bit word optimization. With degree 209, reads and
writes are within 27 bytes — same cache line. **Cache locality
dominates arithmetic operation count.**

**Weight-4 is poor despite fewest XORs.** The 660-byte stride means
fold targets scatter across 10+ cache lines. For packets under 660B
it falls back to gen64 entirely.

**Chorba remains 13x slower than slice8.** The 8KB lookup tables enable
8 bytes of input per table-lookup cycle. Chorba's byte-at-a-time fold
with 5 shift-XOR pairs per byte cannot compete. The fundamental issue:
slice8 does O(1) work per 8-byte chunk via precomputed tables, while
Chorba does O(weight) work per byte via live computation.

## Conclusions

1. **CRC32C's (x+1)|G property eliminates odd-weight zero polynomials.**
   This is the key structural difference from CRC32-IEEE. Weight-3 and
   weight-5 zero polynomials (the most useful for Chorba) cannot exist.
   The minimum useful weight is 6.

2. **Degree 209, weight 6 is optimal for CRC32C Chorba.** The 27-byte
   fold stride provides sub-cache-line locality. No higher-degree dense
   polynomial can beat it because the cache advantage of tight locality
   outweighs the word-packing optimization.

3. **Chorba CRC32C achieves ~188 MB/s table-free**, which is 2x faster
   than bitwise and adequate for low-throughput embedded platforms. But
   it is 13x slower than slicing-by-8 with its 8KB tables.

4. **Practical recommendation for UDPspeeder:** Keep slicing-by-8 as the
   software CRC32C fallback. The 8KB table cost is acceptable even on
   16KB L1D (e500v2) because CRC is called once per packet, allowing
   tables to stay warm. Chorba would only be justified if table memory
   were absolutely unavailable (bare-metal, no-heap environments).

## Files

| File | Description |
|---|---|
| `tools/chorba_crc32c.c` | Standalone prototype with all 6 implementations + tests + benchmarks |
| `tools/find_zero_poly.c` | Zero polynomial search tool (weight 2-8, dense) |
| `tools/find_zero_poly_mitm.c` | Meet-in-the-middle search (built for weight-5, now moot) |
| `tools/chorba_sage.py` | Python prototype of polynomial search (predates C tool) |
| `doc/2412.16398v1.pdf` | Russell, "Chorba: A novel CRC32 implementation" |

## Building

```bash
# Chorba prototype (test + benchmark)
gcc -O2 -o chorba_proto tools/chorba_crc32c.c -lrt
./chorba_proto              # run 27 tests
./chorba_proto --bench      # run benchmarks

# Zero polynomial search
gcc -O2 -o find_zero_poly tools/find_zero_poly.c
./find_zero_poly 100000     # search up to degree 100,000

# Static build for remote execution
gcc -O2 -static -o find_zero_poly tools/find_zero_poly.c
```

## Key constants

```c
/* CRC32C zero polynomials (reflected convention) */
#define CRC32C_POLY_REF         0x82F63B78u

/* x^64 mod G — generator_64 (17 XORs/word) */
#define CRC32C_X64_MOD_G        0x3AAB4576u

/* Weight-6 degree 209: x^209 + x^144 + x^54 + x^39 + x^14 + 1
 * Fold offsets: (8,1), (19,3), (21,2), (24,3), (26,1)
 * Min packet: 27 bytes, fold stride: 27 bytes */

/* Weight-4 degree 5275: x^5275 + x^4508 + x^2751 + 1
 * Fold offsets: (95,7), (315,4), (659,3)
 * Min packet: 660 bytes */

/* Dense weight-6 degree 1285: x^1285 + x^40 + x^38 + x^19 + x^8 + 1
 * 64-bit word fold at offset 155: shifts 5, 7, 26, 37, 45
 * Min packet: 162 bytes (negative result — slower than degree 209) */
```
