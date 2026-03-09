/*
 * fec.c -- forward error correction based on Vandermonde matrices
 * 980624
 * (C) 1997-98 Luigi Rizzo (luigi@iet.unipi.it)
 *
 * Portions derived from code by Phil Karn (karn@ka9q.ampr.org),
 * Robert Morelos-Zaragoza (robert@spectra.eng.hawaii.edu) and Hari
 * Thirumoorthy (harit@spectra.eng.hawaii.edu), Aug 1995
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials
 *    provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 * OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */

/*
 * The following parameter defines how many bits are used for
 * field elements. The code supports any value from 2 to 16
 * but fastest operation is achieved with 8 bit elements
 * This is the only parameter you may want to change.
 */
#ifndef GF_BITS
#define GF_BITS  8	/* code over GF(2**GF_BITS) - change to suit */
#endif

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

typedef unsigned long u_long;
/*
 * compatibility stuff
 */
#if defined(MSDOS)||defined(__MINGW32__)	/* but also for others, e.g. sun... */
#define NEED_BCOPY
#define bcmp(a,b,n) memcmp(a,b,n)
#endif

#ifdef NEED_BCOPY
#define bcopy(s, d, siz)        memcpy((d), (s), (siz))
#define bzero(d, siz)   memset((d), '\0', (siz))
#endif

/*
 * stuff used for testing purposes only
 */

#ifdef	TEST
#define DEB(x)
#define DDB(x) x
#define	DEBUG	0	/* minimal debugging */
#ifdef	MSDOS
#include <time.h>
struct timeval {
    unsigned long ticks;
};
#define gettimeofday(x, dummy) { (x)->ticks = clock() ; }
#define DIFF_T(a,b) (1+ 1000000*(a.ticks - b.ticks) / CLOCKS_PER_SEC )
typedef unsigned long u_long ;
typedef unsigned short u_short ;
#else /* typically, unix systems */
#include <sys/time.h>
#define DIFF_T(a,b) \
	(1+ 1000000*(a.tv_sec - b.tv_sec) + (a.tv_usec - b.tv_usec) )
#endif

#define TICK(t) \
	{struct timeval x ; \
	gettimeofday(&x, NULL) ; \
	t = x.tv_usec + 1000000* (x.tv_sec & 0xff ) ; \
	}
#define TOCK(t) \
	{ u_long t1 ; TICK(t1) ; \
	  if (t1 < t) t = 256000000 + t1 - t ; \
	  else t = t1 - t ; \
	  if (t == 0) t = 1 ;}
	
u_long ticks[10];	/* vars for timekeeping */
#else
#define DEB(x)
#define DDB(x)
#define TICK(x)
#define TOCK(x)
#endif /* TEST */

/*
 * You should not need to change anything beyond this point.
 * The first part of the file implements linear algebra in GF.
 *
 * gf is the type used to store an element of the Galois Field.
 * Must constain at least GF_BITS bits.
 *
 * Note: unsigned char will work up to GF(256) but int seems to run
 * faster on the Pentium. We use int whenever have to deal with an
 * index, since they are generally faster.
 */
#if (GF_BITS < 2  && GF_BITS >16)
#error "GF_BITS must be 2 .. 16"
#endif
#if (GF_BITS <= 8)
typedef unsigned char gf;
#else
typedef unsigned short gf;
#endif

#define	GF_SIZE ((1 << GF_BITS) - 1)	/* powers of \alpha */

/*
 * Primitive polynomials - see Lin & Costello, Appendix A,
 * and  Lee & Messerschmitt, p. 453.
 */
static const char *allPp[] = {    /* GF_BITS	polynomial		*/
    NULL,		    /*  0	no code			*/
    NULL,		    /*  1	no code			*/
    "111",		    /*  2	1+x+x^2			*/
    "1101",		    /*  3	1+x+x^3			*/
    "11001",		    /*  4	1+x+x^4			*/
    "101001",		    /*  5	1+x^2+x^5		*/
    "1100001",		    /*  6	1+x+x^6			*/
    "10010001",		    /*  7	1 + x^3 + x^7		*/
    "101110001",	    /*  8	1+x^2+x^3+x^4+x^8	*/
    "1000100001",	    /*  9	1+x^4+x^9		*/
    "10010000001",	    /* 10	1+x^3+x^10		*/
    "101000000001",	    /* 11	1+x^2+x^11		*/
    "1100101000001",	    /* 12	1+x+x^4+x^6+x^12	*/
    "11011000000001",	    /* 13	1+x+x^3+x^4+x^13	*/
    "110000100010001",	    /* 14	1+x+x^6+x^10+x^14	*/
    "1100000000000001",	    /* 15	1+x+x^15		*/
    "11010000000010001"	    /* 16	1+x+x^3+x^12+x^16	*/
};



/*
 * To speed up computations, we have tables for logarithm, exponent
 * and inverse of a number. If GF_BITS <= 8, we use a table for
 * multiplication as well (it takes 64K, no big deal even on a PDA,
 * especially because it can be pre-initialized an put into a ROM!),
 * otherwhise we use a table of logarithms.
 * In any case the macro gf_mul(x,y) takes care of multiplications.
 */

static gf gf_exp[2*GF_SIZE];	/* index->poly form conversion table	*/
static int gf_log[GF_SIZE + 1];	/* Poly->index form conversion table	*/
static gf inverse[GF_SIZE+1];	/* inverse of field elem.		*/
				/* inv[\alpha**i]=\alpha**(GF_SIZE-i-1)	*/

/*
 * modnn(x) computes x % GF_SIZE, where GF_SIZE is 2**GF_BITS - 1,
 * without a slow divide.
 */
static inline gf
modnn(int x)
{
    while (x >= GF_SIZE) {
	x -= GF_SIZE;
	x = (x >> GF_BITS) + (x & GF_SIZE);
    }
    return x;
}

#define SWAP(a,b,t) {t tmp; tmp=a; a=b; b=tmp;}

/*
 * gf_mul(x,y) multiplies two numbers. If GF_BITS<=8, it is much
 * faster to use a multiplication table.
 *
 * USE_GF_MULC, GF_MULC0(c) and GF_ADDMULC(x) can be used when multiplying
 * many numbers by the same constant. In this case the first
 * call sets the constant, and others perform the multiplications.
 * A value related to the multiplication is held in a local variable
 * declared with USE_GF_MULC . See usage in addmul1().
 */
#if (GF_BITS <= 8)
static gf gf_mul_table[GF_SIZE + 1][GF_SIZE + 1];

#define gf_mul(x,y) gf_mul_table[x][y]

#define USE_GF_MULC gf * __gf_mulc_
#define GF_MULC0(c) __gf_mulc_ = gf_mul_table[c]
#define GF_ADDMULC(dst, x) dst ^= __gf_mulc_[x]

static void
init_mul_table()
{
    int i, j;
    for (i=0; i< GF_SIZE+1; i++)
	for (j=0; j< GF_SIZE+1; j++)
	    gf_mul_table[i][j] = gf_exp[modnn(gf_log[i] + gf_log[j]) ] ;

    for (j=0; j< GF_SIZE+1; j++)
	    gf_mul_table[0][j] = gf_mul_table[j][0] = 0;
}

/*
 * SIMD nibble lookup tables for GF(2^8) multiply-by-constant.
 * For each constant c, lo_table[c][i] = c*i and hi_table[c][i] = c*(i<<4).
 * This enables PSHUFB/TBL to process 16 bytes per instruction pair.
 */
static gf gf_lo_table[GF_SIZE + 1][16] __attribute__((aligned(16)));
static gf gf_hi_table[GF_SIZE + 1][16] __attribute__((aligned(16)));

static void
init_simd_tables()
{
    int c, i;
    for (c = 0; c <= GF_SIZE; c++) {
	for (i = 0; i < 16; i++) {
	    gf_lo_table[c][i] = gf_mul_table[c][i];
	    gf_hi_table[c][i] = gf_mul_table[c][i << 4];
	}
    }
}

#else	/* GF_BITS > 8 */
static inline gf
gf_mul(x,y)
{
    if ( (x) == 0 || (y)==0 ) return 0;
     
    return gf_exp[gf_log[x] + gf_log[y] ] ;
}
#define init_mul_table()

#define USE_GF_MULC gf * __gf_mulc_
#define GF_MULC0(c) __gf_mulc_ = &gf_exp[ gf_log[c] ]
#define GF_ADDMULC(dst, x) { if (x) dst ^= __gf_mulc_[ gf_log[x] ] ; }
#endif

/*
 * Generate GF(2**m) from the irreducible polynomial p(X) in p[0]..p[m]
 * Lookup tables:
 *     index->polynomial form		gf_exp[] contains j= \alpha^i;
 *     polynomial form -> index form	gf_log[ j = \alpha^i ] = i
 * \alpha=x is the primitive element of GF(2^m)
 *
 * For efficiency, gf_exp[] has size 2*GF_SIZE, so that a simple
 * multiplication of two numbers can be resolved without calling modnn
 */

/*
 * i use malloc so many times, it is easier to put checks all in
 * one place.
 */
static void *
my_malloc(int sz, const char *err_string)
{
    void *p = malloc( sz );
    if (p == NULL) {
	fprintf(stderr, "-- malloc failure allocating %s\n", err_string);
	exit(1) ;
    }
    return p ;
}

#define NEW_GF_MATRIX(rows, cols) \
    (gf *)my_malloc(rows * cols * sizeof(gf), " ## __LINE__ ## " )

/*
 * initialize the data structures used for computations in GF.
 */
static void
generate_gf(void)
{
    int i;
    gf mask;
    const char *Pp =  allPp[GF_BITS] ;

    mask = 1;	/* x ** 0 = 1 */
    gf_exp[GF_BITS] = 0; /* will be updated at the end of the 1st loop */
    /*
     * first, generate the (polynomial representation of) powers of \alpha,
     * which are stored in gf_exp[i] = \alpha ** i .
     * At the same time build gf_log[gf_exp[i]] = i .
     * The first GF_BITS powers are simply bits shifted to the left.
     */
    for (i = 0; i < GF_BITS; i++, mask <<= 1 ) {
	gf_exp[i] = mask;
	gf_log[gf_exp[i]] = i;
	/*
	 * If Pp[i] == 1 then \alpha ** i occurs in poly-repr
	 * gf_exp[GF_BITS] = \alpha ** GF_BITS
	 */
	if ( Pp[i] == '1' )
	    gf_exp[GF_BITS] ^= mask;
    }
    /*
     * now gf_exp[GF_BITS] = \alpha ** GF_BITS is complete, so can als
     * compute its inverse.
     */
    gf_log[gf_exp[GF_BITS]] = GF_BITS;
    /*
     * Poly-repr of \alpha ** (i+1) is given by poly-repr of
     * \alpha ** i shifted left one-bit and accounting for any
     * \alpha ** GF_BITS term that may occur when poly-repr of
     * \alpha ** i is shifted.
     */
    mask = 1 << (GF_BITS - 1 ) ;
    for (i = GF_BITS + 1; i < GF_SIZE; i++) {
	if (gf_exp[i - 1] >= mask)
	    gf_exp[i] = gf_exp[GF_BITS] ^ ((gf_exp[i - 1] ^ mask) << 1);
	else
	    gf_exp[i] = gf_exp[i - 1] << 1;
	gf_log[gf_exp[i]] = i;
    }
    /*
     * log(0) is not defined, so use a special value
     */
    gf_log[0] =	GF_SIZE ;
    /* set the extended gf_exp values for fast multiply */
    for (i = 0 ; i < GF_SIZE ; i++)
	gf_exp[i + GF_SIZE] = gf_exp[i] ;

    /*
     * again special cases. 0 has no inverse. This used to
     * be initialized to GF_SIZE, but it should make no difference
     * since noone is supposed to read from here.
     */
    inverse[0] = 0 ;
    inverse[1] = 1;
    for (i=2; i<=GF_SIZE; i++)
	inverse[i] = gf_exp[GF_SIZE-gf_log[i]];
}

/*
 * Various linear algebra operations that i use often.
 */

/*
 * addmul() computes dst[] = dst[] + c * src[]
 *
 * SIMD paths use nibble decomposition: c*x = lo_table[x & 0x0F] ^ hi_table[x >> 4]
 * where each table has 16 entries fitting in one 128-bit SIMD register.
 * PSHUFB (x86 SSSE3) / TBL (ARM NEON) performs 16 parallel lookups.
 */
#define addmul(dst, src, c, sz) \
    if (c != 0) addmul1(dst, src, c, sz)

#if defined(__x86_64__)
#include <immintrin.h>
#include <cpuid.h>

static int cpu_has_avx2(void)
{
    unsigned int eax, ebx, ecx, edx;

    /* OSXSAVE — OS supports XSAVE */
    if (!__get_cpuid(1, &eax, &ebx, &ecx, &edx))
	return 0;
    if (!(ecx & (1u << 27)))
	return 0;

    /* XCR0 bits 1-2 — OS saves SSE+AVX state */
    unsigned int xcr0;
    __asm__ __volatile__("xgetbv" : "=a"(xcr0) : "c"(0) : "edx");
    if ((xcr0 & 0x6) != 0x6)
	return 0;

    /* AVX2: leaf 7, sub-leaf 0, EBX bit 5 */
    if (!__get_cpuid_count(7, 0, &eax, &ebx, &ecx, &edx))
	return 0;
    return (ebx >> 5) & 1;
}

static int cpu_has_avx512bw(void)
{
    unsigned int eax, ebx, ecx, edx;

    /* OSXSAVE — OS supports XSAVE */
    if (!__get_cpuid(1, &eax, &ebx, &ecx, &edx))
	return 0;
    if (!(ecx & (1u << 27)))
	return 0;

    /* XCR0 bits 1,2 (SSE+AVX) + 5,6,7 (opmask, ZMM_Hi256, Hi16_ZMM) */
    unsigned int xcr0;
    __asm__ __volatile__("xgetbv" : "=a"(xcr0) : "c"(0) : "edx");
    if ((xcr0 & 0xE6) != 0xE6)
	return 0;

    /* AVX-512BW: leaf 7, sub-leaf 0, EBX bit 30 */
    if (!__get_cpuid_count(7, 0, &eax, &ebx, &ecx, &edx))
	return 0;
    return (ebx >> 30) & 1;
}

__attribute__((target("ssse3")))
static void
addmul1_ssse3(gf *dst, gf *src, gf c, int sz)
{
    __m128i tbl_lo = _mm_load_si128((const __m128i *)gf_lo_table[c]);
    __m128i tbl_hi = _mm_load_si128((const __m128i *)gf_hi_table[c]);
    __m128i mask   = _mm_set1_epi8(0x0F);

    int i = 0;
    /* 2x unrolled: process 32 bytes per iteration for better ILP */
    for (; i + 32 <= sz; i += 32) {
	__m128i x1 = _mm_loadu_si128((const __m128i *)(src + i));
	__m128i x2 = _mm_loadu_si128((const __m128i *)(src + i + 16));
	__m128i lo1 = _mm_shuffle_epi8(tbl_lo, _mm_and_si128(x1, mask));
	__m128i hi1 = _mm_shuffle_epi8(tbl_hi, _mm_and_si128(_mm_srli_epi64(x1, 4), mask));
	__m128i lo2 = _mm_shuffle_epi8(tbl_lo, _mm_and_si128(x2, mask));
	__m128i hi2 = _mm_shuffle_epi8(tbl_hi, _mm_and_si128(_mm_srli_epi64(x2, 4), mask));
	__m128i d1 = _mm_loadu_si128((const __m128i *)(dst + i));
	__m128i d2 = _mm_loadu_si128((const __m128i *)(dst + i + 16));
	_mm_storeu_si128((__m128i *)(dst + i),
		_mm_xor_si128(d1, _mm_xor_si128(lo1, hi1)));
	_mm_storeu_si128((__m128i *)(dst + i + 16),
		_mm_xor_si128(d2, _mm_xor_si128(lo2, hi2)));
    }
    /* 16-byte tail */
    for (; i + 16 <= sz; i += 16) {
	__m128i x = _mm_loadu_si128((const __m128i *)(src + i));
	__m128i lo = _mm_shuffle_epi8(tbl_lo, _mm_and_si128(x, mask));
	__m128i hi = _mm_shuffle_epi8(tbl_hi,
		_mm_and_si128(_mm_srli_epi64(x, 4), mask));
	__m128i d = _mm_loadu_si128((const __m128i *)(dst + i));
	_mm_storeu_si128((__m128i *)(dst + i),
		_mm_xor_si128(d, _mm_xor_si128(lo, hi)));
    }

    /* scalar tail */
    USE_GF_MULC ;
    GF_MULC0(c) ;
    for (; i < sz; i++)
	GF_ADDMULC(dst[i], src[i]);
}

__attribute__((target("avx2")))
static void
addmul1_avx2(gf *dst, gf *src, gf c, int sz)
{
    __m128i tbl128_lo = _mm_load_si128((const __m128i *)gf_lo_table[c]);
    __m128i tbl128_hi = _mm_load_si128((const __m128i *)gf_hi_table[c]);
    __m256i tbl_lo = _mm256_broadcastsi128_si256(tbl128_lo);
    __m256i tbl_hi = _mm256_broadcastsi128_si256(tbl128_hi);
    __m256i mask   = _mm256_set1_epi8(0x0F);

    int i = 0;
    /* 2x unrolled: process 64 bytes per iteration for better ILP */
    for (; i + 64 <= sz; i += 64) {
	__m256i x1  = _mm256_loadu_si256((const __m256i *)(src + i));
	__m256i x2  = _mm256_loadu_si256((const __m256i *)(src + i + 32));
	__m256i lo1 = _mm256_shuffle_epi8(tbl_lo, _mm256_and_si256(x1, mask));
	__m256i hi1 = _mm256_shuffle_epi8(tbl_hi, _mm256_and_si256(_mm256_srli_epi64(x1, 4), mask));
	__m256i lo2 = _mm256_shuffle_epi8(tbl_lo, _mm256_and_si256(x2, mask));
	__m256i hi2 = _mm256_shuffle_epi8(tbl_hi, _mm256_and_si256(_mm256_srli_epi64(x2, 4), mask));
	__m256i d1  = _mm256_loadu_si256((const __m256i *)(dst + i));
	__m256i d2  = _mm256_loadu_si256((const __m256i *)(dst + i + 32));
	_mm256_storeu_si256((__m256i *)(dst + i),
		_mm256_xor_si256(d1, _mm256_xor_si256(lo1, hi1)));
	_mm256_storeu_si256((__m256i *)(dst + i + 32),
		_mm256_xor_si256(d2, _mm256_xor_si256(lo2, hi2)));
    }
    /* 32-byte tail */
    for (; i + 32 <= sz; i += 32) {
	__m256i x  = _mm256_loadu_si256((const __m256i *)(src + i));
	__m256i lo = _mm256_shuffle_epi8(tbl_lo, _mm256_and_si256(x, mask));
	__m256i hi = _mm256_shuffle_epi8(tbl_hi,
		_mm256_and_si256(_mm256_srli_epi64(x, 4), mask));
	__m256i d  = _mm256_loadu_si256((const __m256i *)(dst + i));
	_mm256_storeu_si256((__m256i *)(dst + i),
		_mm256_xor_si256(d, _mm256_xor_si256(lo, hi)));
    }

    /* SSE tail: at most one 16-byte chunk */
    if (i + 16 <= sz) {
	__m128i mx = _mm_set1_epi8(0x0F);
	__m128i x  = _mm_loadu_si128((const __m128i *)(src + i));
	__m128i lo = _mm_shuffle_epi8(tbl128_lo, _mm_and_si128(x, mx));
	__m128i hi = _mm_shuffle_epi8(tbl128_hi,
		_mm_and_si128(_mm_srli_epi64(x, 4), mx));
	__m128i d  = _mm_loadu_si128((const __m128i *)(dst + i));
	_mm_storeu_si128((__m128i *)(dst + i),
		_mm_xor_si128(d, _mm_xor_si128(lo, hi)));
	i += 16;
    }

    /* scalar tail */
    USE_GF_MULC ;
    GF_MULC0(c) ;
    for (; i < sz; i++)
	GF_ADDMULC(dst[i], src[i]);
}

__attribute__((target("avx512bw")))
static void
addmul1_avx512(gf *dst, gf *src, gf c, int sz)
{
    __m512i tbl_lo = _mm512_broadcast_i32x4(
	_mm_load_si128((const __m128i *)gf_lo_table[c]));
    __m512i tbl_hi = _mm512_broadcast_i32x4(
	_mm_load_si128((const __m128i *)gf_hi_table[c]));
    __m512i mask   = _mm512_set1_epi8(0x0F);

    int i = 0;
    /* 2x unrolled: process 128 bytes per iteration for better ILP */
    for (; i + 128 <= sz; i += 128) {
	__m512i x1  = _mm512_loadu_si512(src + i);
	__m512i x2  = _mm512_loadu_si512(src + i + 64);
	__m512i lo1 = _mm512_shuffle_epi8(tbl_lo, _mm512_and_si512(x1, mask));
	__m512i hi1 = _mm512_shuffle_epi8(tbl_hi,
		_mm512_and_si512(_mm512_srli_epi64(x1, 4), mask));
	__m512i lo2 = _mm512_shuffle_epi8(tbl_lo, _mm512_and_si512(x2, mask));
	__m512i hi2 = _mm512_shuffle_epi8(tbl_hi,
		_mm512_and_si512(_mm512_srli_epi64(x2, 4), mask));
	__m512i d1  = _mm512_loadu_si512(dst + i);
	__m512i d2  = _mm512_loadu_si512(dst + i + 64);
	_mm512_storeu_si512(dst + i,
		_mm512_ternarylogic_epi64(d1, lo1, hi1, 0x96));
	_mm512_storeu_si512(dst + i + 64,
		_mm512_ternarylogic_epi64(d2, lo2, hi2, 0x96));
    }
    /* 64-byte tail */
    for (; i + 64 <= sz; i += 64) {
	__m512i x  = _mm512_loadu_si512(src + i);
	__m512i lo = _mm512_shuffle_epi8(tbl_lo, _mm512_and_si512(x, mask));
	__m512i hi = _mm512_shuffle_epi8(tbl_hi,
		_mm512_and_si512(_mm512_srli_epi64(x, 4), mask));
	__m512i d  = _mm512_loadu_si512(dst + i);
	_mm512_storeu_si512(dst + i,
		_mm512_ternarylogic_epi64(d, lo, hi, 0x96));
    }

    /* AVX2 tail: at most one 32-byte chunk */
    if (i + 32 <= sz) {
	__m256i tbl256_lo = _mm256_broadcastsi128_si256(
		_mm_load_si128((const __m128i *)gf_lo_table[c]));
	__m256i tbl256_hi = _mm256_broadcastsi128_si256(
		_mm_load_si128((const __m128i *)gf_hi_table[c]));
	__m256i m256 = _mm256_set1_epi8(0x0F);
	__m256i x  = _mm256_loadu_si256((const __m256i *)(src + i));
	__m256i lo = _mm256_shuffle_epi8(tbl256_lo, _mm256_and_si256(x, m256));
	__m256i hi = _mm256_shuffle_epi8(tbl256_hi,
		_mm256_and_si256(_mm256_srli_epi64(x, 4), m256));
	__m256i d  = _mm256_loadu_si256((const __m256i *)(dst + i));
	_mm256_storeu_si256((__m256i *)(dst + i),
		_mm256_xor_si256(d, _mm256_xor_si256(lo, hi)));
	i += 32;
    }

    /* SSE tail: at most one 16-byte chunk */
    if (i + 16 <= sz) {
	__m128i mx = _mm_set1_epi8(0x0F);
	__m128i x  = _mm_loadu_si128((const __m128i *)(src + i));
	__m128i lo = _mm_shuffle_epi8(
		_mm_load_si128((const __m128i *)gf_lo_table[c]),
		_mm_and_si128(x, mx));
	__m128i hi = _mm_shuffle_epi8(
		_mm_load_si128((const __m128i *)gf_hi_table[c]),
		_mm_and_si128(_mm_srli_epi64(x, 4), mx));
	__m128i d  = _mm_loadu_si128((const __m128i *)(dst + i));
	_mm_storeu_si128((__m128i *)(dst + i),
		_mm_xor_si128(d, _mm_xor_si128(lo, hi)));
	i += 16;
    }

    /* scalar tail */
    USE_GF_MULC ;
    GF_MULC0(c) ;
    for (; i < sz; i++)
	GF_ADDMULC(dst[i], src[i]);
}

static void (*addmul1_x86_fn)(gf *, gf *, gf, int) = addmul1_ssse3;
#endif /* __x86_64__ */

#if defined(__aarch64__)
#include <arm_neon.h>

static void
addmul1_neon(gf *dst, gf *src, gf c, int sz)
{
    uint8x16_t tbl_lo = vld1q_u8(gf_lo_table[c]);
    uint8x16_t tbl_hi = vld1q_u8(gf_hi_table[c]);
    uint8x16_t mask   = vdupq_n_u8(0x0F);

    int i = 0;
    for (; i + 32 <= sz; i += 32) {
	uint8x16_t x1 = vld1q_u8(src + i);
	uint8x16_t x2 = vld1q_u8(src + i + 16);
	uint8x16_t lo1 = vqtbl1q_u8(tbl_lo, vandq_u8(x1, mask));
	uint8x16_t hi1 = vqtbl1q_u8(tbl_hi, vshrq_n_u8(x1, 4));
	uint8x16_t lo2 = vqtbl1q_u8(tbl_lo, vandq_u8(x2, mask));
	uint8x16_t hi2 = vqtbl1q_u8(tbl_hi, vshrq_n_u8(x2, 4));
	uint8x16_t d1 = vld1q_u8(dst + i);
	uint8x16_t d2 = vld1q_u8(dst + i + 16);
	vst1q_u8(dst + i,      veorq_u8(d1, veorq_u8(lo1, hi1)));
	vst1q_u8(dst + i + 16, veorq_u8(d2, veorq_u8(lo2, hi2)));
    }
    for (; i + 16 <= sz; i += 16) {
	uint8x16_t x = vld1q_u8(src + i);
	uint8x16_t lo = vqtbl1q_u8(tbl_lo, vandq_u8(x, mask));
	uint8x16_t hi = vqtbl1q_u8(tbl_hi, vshrq_n_u8(x, 4));
	uint8x16_t d = vld1q_u8(dst + i);
	vst1q_u8(dst + i, veorq_u8(d, veorq_u8(lo, hi)));
    }

    /* scalar tail */
    USE_GF_MULC ;
    GF_MULC0(c) ;
    for (; i < sz; i++)
	GF_ADDMULC(dst[i], src[i]);
}
#endif /* __aarch64__ */

#define UNROLL 16 /* 1, 4, 8, 16 */
static void
addmul1(gf *dst1, gf *src1, gf c, int sz)
{
#if defined(__x86_64__)
    addmul1_x86_fn(dst1, src1, c, sz);
#elif defined(__aarch64__)
    addmul1_neon(dst1, src1, c, sz);
#else
    /*
     * Scalar fallback for MIPS, i486, ARMv7, etc.
     *
     * NOT auto-vectorizable: the 256-entry table lookup (gf_mulc_table[c][src[i]])
     * is a data-dependent gather. The nibble decomposition that makes PSHUFB/TBL
     * work requires GF(2^8) algebraic insight no compiler performs. Pragmas like
     * omp simd, __restrict__, and -ftree-vectorize don't help — they grant
     * permission to vectorize but can't transform the lookup. Deliberate choice.
     */
    if (sz <= 0) return;
    USE_GF_MULC ;
    gf *dst = dst1, *src = src1 ;
    gf *lim = &dst[sz - UNROLL + 1] ;

    GF_MULC0(c) ;

#if (UNROLL > 1)
    for (; dst < lim ; dst += UNROLL, src += UNROLL ) {
	GF_ADDMULC( dst[0] , src[0] );
	GF_ADDMULC( dst[1] , src[1] );
	GF_ADDMULC( dst[2] , src[2] );
	GF_ADDMULC( dst[3] , src[3] );
#if (UNROLL > 4)
	GF_ADDMULC( dst[4] , src[4] );
	GF_ADDMULC( dst[5] , src[5] );
	GF_ADDMULC( dst[6] , src[6] );
	GF_ADDMULC( dst[7] , src[7] );
#endif
#if (UNROLL > 8)
	GF_ADDMULC( dst[8] , src[8] );
	GF_ADDMULC( dst[9] , src[9] );
	GF_ADDMULC( dst[10] , src[10] );
	GF_ADDMULC( dst[11] , src[11] );
	GF_ADDMULC( dst[12] , src[12] );
	GF_ADDMULC( dst[13] , src[13] );
	GF_ADDMULC( dst[14] , src[14] );
	GF_ADDMULC( dst[15] , src[15] );
#endif
    }
#endif
    lim += UNROLL - 1 ;
    for (; dst < lim; dst++, src++ )
	GF_ADDMULC( *dst , *src );
#endif /* architecture dispatch */
}

/*
 * computes C = AB where A is n*k, B is k*m, C is n*m
 */
static void
matmul(gf *a, gf *b, gf *c, int n, int k, int m)
{
    int row, col, i ;

    for (row = 0; row < n ; row++) {
	for (col = 0; col < m ; col++) {
	    gf *pa = &a[ row * k ];
	    gf *pb = &b[ col ];
	    gf acc = 0 ;
	    for (i = 0; i < k ; i++, pa++, pb += m )
		acc ^= gf_mul( *pa, *pb ) ;
	    c[ row * m + col ] = acc ;
	}
    }
}

#ifdef DEBUG
/*
 * returns 1 if the square matrix is identiy
 * (only for test)
 */
static int
is_identity(gf *m, int k)
{
    int row, col ;
    for (row=0; row<k; row++)
	for (col=0; col<k; col++)
	    if ( (row==col && *m != 1) ||
		 (row!=col && *m != 0) )
		 return 0 ;
	    else
		m++ ;
    return 1 ;
}
#endif /* debug */

/*
 * invert_mat() takes a matrix and produces its inverse
 * k is the size of the matrix.
 * (Gauss-Jordan, adapted from Numerical Recipes in C)
 * Return non-zero if singular.
 */
DEB( int pivloops=0; int pivswaps=0 ; /* diagnostic */)
static int
invert_mat(gf *src, int k)
{
    gf c, *p ;
    int irow, icol, row, col, i, ix ;

    int error = 1 ;
    int indxc[k];
    int indxr[k];
    int ipiv[k];
    gf id_row[k];

    memset(id_row, 0, (unsigned)k * sizeof(gf));
    DEB( pivloops=0; pivswaps=0 ; /* diagnostic */ )
    /*
     * ipiv marks elements already used as pivots.
     */
    for (i = 0; i < k ; i++)
	ipiv[i] = 0 ;

    for (col = 0; col < k ; col++) {
	gf *pivot_row ;
	/*
	 * Zeroing column 'col', look for a non-zero element.
	 * First try on the diagonal, if it fails, look elsewhere.
	 */
	irow = icol = -1 ;
	if (ipiv[col] != 1 && src[col*k + col] != 0) {
	    irow = col ;
	    icol = col ;
	    goto found_piv ;
	}
	for (row = 0 ; row < k ; row++) {
	    if (ipiv[row] != 1) {
		for (ix = 0 ; ix < k ; ix++) {
		    DEB( pivloops++ ; )
		    if (ipiv[ix] == 0) {
			if (src[row*k + ix] != 0) {
			    irow = row ;
			    icol = ix ;
			    goto found_piv ;
			}
		    } else if (ipiv[ix] > 1) {
			fprintf(stderr, "singular matrix\n");
			goto fail ; 
		    }
		}
	    }
	}
	if (icol == -1) {
	    fprintf(stderr, "XXX pivot not found!\n");
	    goto fail ;
	}
found_piv:
	++(ipiv[icol]) ;
	/*
	 * swap rows irow and icol, so afterwards the diagonal
	 * element will be correct. Rarely done, not worth
	 * optimizing.
	 */
	if (irow != icol) {
	    for (ix = 0 ; ix < k ; ix++ ) {
		SWAP( src[irow*k + ix], src[icol*k + ix], gf) ;
	    }
	}
	indxr[col] = irow ;
	indxc[col] = icol ;
	pivot_row = &src[icol*k] ;
	c = pivot_row[icol] ;
	if (c == 0) {
	    fprintf(stderr, "singular matrix 2\n");
	    goto fail ;
	}
	if (c != 1 ) { /* otherwhise this is a NOP */
	    /*
	     * this is done often , but optimizing is not so
	     * fruitful, at least in the obvious ways (unrolling)
	     */
	    DEB( pivswaps++ ; )
	    c = inverse[ c ] ;
	    pivot_row[icol] = 1 ;
	    for (ix = 0 ; ix < k ; ix++ )
		pivot_row[ix] = gf_mul(c, pivot_row[ix] );
	}
	/*
	 * from all rows, remove multiples of the selected row
	 * to zero the relevant entry (in fact, the entry is not zero
	 * because we know it must be zero).
	 * (Here, if we know that the pivot_row is the identity,
	 * we can optimize the addmul).
	 */
	id_row[icol] = 1;
	if (bcmp(pivot_row, id_row, k*sizeof(gf)) != 0) {
	    for (p = src, ix = 0 ; ix < k ; ix++, p += k ) {
		if (ix != icol) {
		    c = p[icol] ;
		    p[icol] = 0 ;
		    addmul(p, pivot_row, c, k );
		}
	    }
	}
	id_row[icol] = 0;
    } /* done all columns */
    for (col = k-1 ; col >= 0 ; col-- ) {
	if (indxr[col] <0 || indxr[col] >= k)
	    fprintf(stderr, "AARGH, indxr[col] %d\n", indxr[col]);
	else if (indxc[col] <0 || indxc[col] >= k)
	    fprintf(stderr, "AARGH, indxc[col] %d\n", indxc[col]);
	else
	if (indxr[col] != indxc[col] ) {
	    for (row = 0 ; row < k ; row++ ) {
		SWAP( src[row*k + indxr[col]], src[row*k + indxc[col]], gf) ;
	    }
	}
    }
    error = 0 ;
fail:
    return error ;
}

/*
 * fast code for inverting a vandermonde matrix.
 * XXX NOTE: It assumes that the matrix
 * is not singular and _IS_ a vandermonde matrix. Only uses
 * the second column of the matrix, containing the p_i's.
 *
 * Algorithm borrowed from "Numerical recipes in C" -- sec.2.8, but
 * largely revised for my purposes.
 * p = coefficients of the matrix (p_i)
 * q = values of the polynomial (known)
 */

int
invert_vdm(gf *src, int k)
{
    int i, j, row, col ;
    gf *b, *c, *p;
    gf t, xx ;

    if (k == 1) 	/* degenerate case, matrix must be p^0 = 1 */
	return 0 ;
    /*
     * c holds the coefficient of P(x) = Prod (x - p_i), i=0..k-1
     * b holds the coefficient for the matrix inversion
     */
    c = NEW_GF_MATRIX(1, k);
    b = NEW_GF_MATRIX(1, k);

    p = NEW_GF_MATRIX(1, k);
   
    for ( j=1, i = 0 ; i < k ; i++, j+=k ) {
	c[i] = 0 ;
	p[i] = src[j] ;    /* p[i] */
    }
    /*
     * construct coeffs. recursively. We know c[k] = 1 (implicit)
     * and start P_0 = x - p_0, then at each stage multiply by
     * x - p_i generating P_i = x P_{i-1} - p_i P_{i-1}
     * After k steps we are done.
     */
    c[k-1] = p[0] ;	/* really -p(0), but x = -x in GF(2^m) */
    for (i = 1 ; i < k ; i++ ) {
	gf p_i = p[i] ; /* see above comment */
	for (j = k-1  - ( i - 1 ) ; j < k-1 ; j++ )
	    c[j] ^= gf_mul( p_i, c[j+1] ) ;
	c[k-1] ^= p_i ;
    }

    for (row = 0 ; row < k ; row++ ) {
	/*
	 * synthetic division etc.
	 */
	xx = p[row] ;
	t = 1 ;
	b[k-1] = 1 ; /* this is in fact c[k] */
	for (i = k-2 ; i >= 0 ; i-- ) {
	    b[i] = c[i+1] ^ gf_mul(xx, b[i+1]) ;
	    t = gf_mul(xx, t) ^ b[i] ;
	}
	for (col = 0 ; col < k ; col++ )
	    src[col*k + row] = gf_mul(inverse[t], b[col] );
    }
    free(c) ;
    free(b) ;
    free(p) ;
    return 0 ;
}

static int fec_initialized = 0 ;
static void
init_fec()
{
    TICK(ticks[0]);
    generate_gf();
    TOCK(ticks[0]);
    DDB(fprintf(stderr, "generate_gf took %ldus\n", ticks[0]);)
    TICK(ticks[0]);
    init_mul_table();
    TOCK(ticks[0]);
    DDB(fprintf(stderr, "init_mul_table took %ldus\n", ticks[0]);)
#if (GF_BITS <= 8)
    init_simd_tables();
#endif
#if defined(__x86_64__)
    if (cpu_has_avx512bw())
	addmul1_x86_fn = addmul1_avx512;
    else if (cpu_has_avx2())
	addmul1_x86_fn = addmul1_avx2;
#endif
    fec_initialized = 1 ;
}

/*
 * This section contains the proper FEC encoding/decoding routines.
 * The encoding matrix is computed starting with a Vandermonde matrix,
 * and then transforming it into a systematic matrix.
 */

#define FEC_MAGIC	0xFECC0DEC

struct fec_parms {
    u_long magic ;
    int k, n ;		/* parameters of the code */
    gf *enc_matrix ;
    gf *dec_matrix ;	/* k*k scratch for build_decode_matrix */
    gf *dec_buf ;	/* k*dec_buf_sz scratch for fec_decode */
    int dec_buf_sz ;	/* current sz capacity, 0 = not yet allocated */
} ;

void
fec_free(void *p0)
{
	struct fec_parms *p= (struct fec_parms *) p0;
    if (p==NULL ||
       p->magic != ( ( (FEC_MAGIC ^ p->k) ^ p->n) ^ (int)((intptr_t)p->enc_matrix)) ) {
	fprintf(stderr, "bad parameters to fec_free\n");
	return ;
    }
    free(p->enc_matrix);
    free(p->dec_matrix);
    free(p->dec_buf);
    free(p);
}

/*
 * create a new encoder, returning a descriptor. This contains k,n and
 * the encoding matrix.
 */
struct fec_parms *
fec_new(int k, int n)
{
    int row, col ;
    gf *p, *tmp_m ;

    struct fec_parms *retval ;

    if (fec_initialized == 0)
	init_fec();

    if (k > GF_SIZE + 1 || n > GF_SIZE + 1 || k > n ) {
	fprintf(stderr, "Invalid parameters k %d n %d GF_SIZE %d\n",
		k, n, GF_SIZE );
	return NULL ;
    }
    retval = (struct fec_parms *)my_malloc(sizeof(struct fec_parms), "new_code");
    retval->k = k ;
    retval->n = n ;
    retval->enc_matrix = NEW_GF_MATRIX(n, k);
    retval->dec_matrix = NEW_GF_MATRIX(k, k);
    retval->dec_buf = NULL ;
    retval->dec_buf_sz = 0 ;
    retval->magic = ( ( FEC_MAGIC ^ k) ^ n) ^ (int)((intptr_t)retval->enc_matrix) ;
    tmp_m = NEW_GF_MATRIX(n, k);
    /*
     * fill the matrix with powers of field elements, starting from 0.
     * The first row is special, cannot be computed with exp. table.
     */
    tmp_m[0] = 1 ;
    for (col = 1; col < k ; col++)
	tmp_m[col] = 0 ;
    for (p = tmp_m + k, row = 0; row < n-1 ; row++, p += k) {
	for ( col = 0 ; col < k ; col ++ )
	    p[col] = gf_exp[modnn(row*col)];
    }

    /*
     * quick code to build systematic matrix: invert the top
     * k*k vandermonde matrix, multiply right the bottom n-k rows
     * by the inverse, and construct the identity matrix at the top.
     */
    TICK(ticks[3]);
    invert_vdm(tmp_m, k); /* much faster than invert_mat */
    matmul(tmp_m + k*k, tmp_m, retval->enc_matrix + k*k, n - k, k, k);
    /*
     * the upper matrix is I so do not bother with a slow multiply
     */
    bzero(retval->enc_matrix, k*k*sizeof(gf) );
    for (p = retval->enc_matrix, col = 0 ; col < k ; col++, p += k+1 )
	*p = 1 ;
    free(tmp_m);
    TOCK(ticks[3]);

    DDB(fprintf(stderr, "--- %ld us to build encoding matrix\n",
	    ticks[3]);)
    DEB(pr_matrix(retval->enc_matrix, n, k, "encoding_matrix");)
    return retval ;
}

/*
 * fec_encode accepts as input pointers to n data packets of size sz,
 * and produces as output a packet pointed to by fec, computed
 * with index "index".
 */
void
fec_encode(void *code0, void *src0[], void *fec0, int index, int sz)
//fec_encode(struct fec_parms *code0, gf *src[], gf *fec, int index, int sz)
{
	struct fec_parms * code= (struct fec_parms *)code0;
	gf **src=(gf**) src0;
	gf* fec=(gf*)fec0;
    int i, k = code->k ;
    gf *p ;

    if (GF_BITS > 8)
	sz /= 2 ;

    if (index < k)
         bcopy(src[index], fec, sz*sizeof(gf) ) ;
    else if (index < code->n) {
	p = &(code->enc_matrix[index*k] );
	bzero(fec, sz*sizeof(gf));
	for (i = 0; i < k ; i++)
	    addmul(fec, src[i], p[i], sz ) ;
    } else
	fprintf(stderr, "Invalid index %d (max %d)\n",
	    index, code->n - 1 );
}

/*
 * shuffle move src packets in their position
 */
static int
shuffle(gf *pkt[], int index[], int k)
{
    int i;

    for ( i = 0 ; i < k ; ) {
	if (index[i] >= k || index[i] == i)
	    i++ ;
	else {
	    /*
	     * put pkt in the right position (first check for conflicts).
	     */
	    int c = index[i] ;

	    if (index[c] == c) {
		DEB(fprintf(stderr, "\nshuffle, error at %d\n", i);)
		return 1 ;
	    }
	    SWAP(index[i], index[c], int) ;
	    SWAP(pkt[i], pkt[c], gf *) ;
	}
    }
    DEB( /* just test that it works... */
    for ( i = 0 ; i < k ; i++ ) {
	if (index[i] < k && index[i] != i) {
	    fprintf(stderr, "shuffle: after\n");
	    for (i=0; i<k ; i++) fprintf(stderr, "%3d ", index[i]);
	    fprintf(stderr, "\n");
	    return 1 ;
	}
    }
    )
    return 0 ;
}

/*
 * build_decode_matrix constructs the encoding matrix given the
 * indexes. The matrix must be already allocated as
 * a vector of k*k elements, in row-major order
 */
static int
build_decode_matrix(struct fec_parms *code, gf *pkt[], int index[], gf *matrix)
{
    int i , k = code->k ;
    gf *p ;

    TICK(ticks[9]);
    for (i = 0, p = matrix ; i < k ; i++, p += k ) {
#if 1 /* this is simply an optimization, not very useful indeed */
	if (index[i] < k) {
	    bzero(p, k*sizeof(gf) );
	    p[i] = 1 ;
	} else
#endif
	if (index[i] < code->n )
	    bcopy( &(code->enc_matrix[index[i]*k]), p, k*sizeof(gf) );
	else {
	    fprintf(stderr, "decode: invalid index %d (max %d)\n",
		index[i], code->n - 1 );
	    return -1 ;
	}
    }
    TICK(ticks[9]);
    if (invert_mat(matrix, k)) {
	return -1 ;
    }
    TOCK(ticks[9]);
    return 0 ;
}

/*
 * fec_decode receives as input a vector of packets, the indexes of
 * packets, and produces the correct vector as output.
 *
 * Input:
 *	code: pointer to code descriptor
 *	pkt:  pointers to received packets. They are modified
 *	      to store the output packets (in place)
 *	index: pointer to packet indexes (modified)
 *	sz:    size of each packet
 */
int
fec_decode(void *code0, void *pkt0[], int index[], int sz)
//fec_decode(struct fec_parms *code, gf *pkt[], int index[], int sz)
{
	struct fec_parms * code=(struct fec_parms*)code0;
	gf **pkt=(gf**)pkt0;
    int row, col , k = code->k ;
    gf *new_pkt[k] ;

    if (GF_BITS > 8)
	sz /= 2 ;

    if (shuffle(pkt, index, k))	/* error if true */
	return 1 ;
    if (build_decode_matrix(code, pkt, index, code->dec_matrix))
	return 1 ; /* error */

    /* ensure decode scratch buffer is large enough */
    if (code->dec_buf_sz < sz) {
	free(code->dec_buf);
	code->dec_buf = (gf *)my_malloc(k * sz * sizeof(gf), "dec_buf");
	code->dec_buf_sz = sz ;
    }
    /*
     * do the actual decoding
     */
    for (row = 0 ; row < k ; row++ ) {
	if (index[row] >= k) {
	    new_pkt[row] = code->dec_buf + row * sz ;
	    bzero(new_pkt[row], sz * sizeof(gf) ) ;
	    for (col = 0 ; col < k ; col++ )
		addmul(new_pkt[row], pkt[col], code->dec_matrix[row*k + col], sz) ;
	}
    }
    /*
     * move pkts to their final destination
     */
    for (row = 0 ; row < k ; row++ ) {
	if (index[row] >= k) {
	    bcopy(new_pkt[row], pkt[row], sz*sizeof(gf));
	}
    }

    return 0;
}
int get_n(void *code0)
{
	struct fec_parms * code= (struct fec_parms *)code0;
	return code->n;
}
int get_k(void *code0)
{
	struct fec_parms * code= (struct fec_parms *)code0;
	return code->k;
}
/*********** end of FEC code -- beginning of test code ************/

#if (TEST || DEBUG)
void
test_gf()
{
    int i ;
    /*
     * test gf tables. Sufficiently tested...
     */
    for (i=0; i<= GF_SIZE; i++) {
        if (gf_exp[gf_log[i]] != i)
	    fprintf(stderr, "bad exp/log i %d log %d exp(log) %d\n",
		i, gf_log[i], gf_exp[gf_log[i]]);

        if (i != 0 && gf_mul(i, inverse[i]) != 1)
	    fprintf(stderr, "bad mul/inv i %d inv %d i*inv(i) %d\n",
		i, inverse[i], gf_mul(i, inverse[i]) );
	if (gf_mul(0,i) != 0)
	    fprintf(stderr, "bad mul table 0,%d\n",i);
	if (gf_mul(i,0) != 0)
	    fprintf(stderr, "bad mul table %d,0\n",i);
    }
}
#endif /* TEST */

#ifdef BENCH_EXPOSE_INTERNALS
void bench_addmul1(gf *dst, gf *src, gf c, int sz) {
    addmul1(dst, src, c, sz);
}
const char *bench_addmul1_impl() {
#if defined(__x86_64__)
    if (addmul1_x86_fn == addmul1_avx512) return "avx512bw";
    if (addmul1_x86_fn == addmul1_avx2) return "avx2";
    return "ssse3";
#elif defined(__aarch64__)
    return "neon";
#else
    return "scalar";
#endif
}
#endif
