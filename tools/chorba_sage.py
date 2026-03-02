#!/usr/bin/env python3
"""
Find zero polynomials for CRC32C (Castagnoli, 0x1EDC6F41) using GF(2) arithmetic.

Adapts the Chorba technique (Russell, arXiv:2412.16398) from CRC32-IEEE to CRC32C.
All polynomial arithmetic is over GF(2): addition = XOR, no carries.

A zero polynomial Z(x) satisfies Z(x) mod G(x) = 0. Adding Z(x) to any message
doesn't change its CRC. Sparse zero polynomials (few terms) enable efficient
table-free CRC computation: each term costs one XOR per 64-bit word processed.

Usage: python3 tools/chorba_sage.py
"""

import sys
from collections import defaultdict

# CRC32C generator polynomial: x^32 + x^28 + x^27 + x^26 + x^25 + x^23 + x^22
# + x^20 + x^19 + x^18 + x^14 + x^13 + x^11 + x^10 + x^9 + x^8 + x^6 + 1
# In "normal" (MSB-first) representation with bit i = coefficient of x^i:
G_CRC32C = (
    (1 << 32) | (1 << 28) | (1 << 27) | (1 << 26) | (1 << 25) |
    (1 << 23) | (1 << 22) | (1 << 20) | (1 << 19) | (1 << 18) |
    (1 << 14) | (1 << 13) | (1 << 11) | (1 << 10) | (1 << 9) |
    (1 << 8) | (1 << 6) | (1 << 0)
)
G_LOW = G_CRC32C & 0xFFFFFFFF  # G without x^32 term = 0x1EDC6F41

# CRC32-IEEE for comparison
G_IEEE = (
    (1 << 32) | (1 << 26) | (1 << 23) | (1 << 22) | (1 << 16) |
    (1 << 12) | (1 << 11) | (1 << 10) | (1 << 8) | (1 << 7) |
    (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0)
)


def poly_to_hex(p):
    """Convert polynomial (integer) to hex string."""
    return "0x{:X}".format(p)


def poly_to_terms(p):
    """Convert polynomial to human-readable x^n + ... form."""
    terms = []
    bit = 0
    tmp = p
    while tmp:
        if tmp & 1:
            terms.append(bit)
        tmp >>= 1
        bit += 1
    terms.reverse()
    parts = []
    for t in terms:
        if t == 0:
            parts.append("1")
        elif t == 1:
            parts.append("x")
        else:
            parts.append("x^{}".format(t))
    return " + ".join(parts)


def popcount(n):
    """Count set bits."""
    c = 0
    while n:
        c += 1
        n &= n - 1
    return c


def degree(p):
    """Degree of polynomial (highest set bit position)."""
    if p == 0:
        return -1
    return p.bit_length() - 1


def poly_mod(a, g):
    """Compute a(x) mod g(x) in GF(2)[x]."""
    dg = degree(g)
    da = degree(a)
    while da >= dg:
        a ^= g << (da - dg)
        da = degree(a)
    return a


def xn_mod_g(n, g_low):
    """Compute x^n mod G(x) iteratively for CRC32C.

    g_low = G(x) without the x^32 leading term (the 32-bit reduction constant).
    Returns a 32-bit value representing the remainder.
    """
    if n < 32:
        return 1 << n
    r = 1 << 0  # start at x^0
    # Build up to x^n by repeated multiply-by-x with reduction
    # Actually, more efficient: use the identity and shift
    r = 1
    for _ in range(n):
        r <<= 1
        if r & (1 << 32):
            r ^= (1 << 32) | g_low
    return r


def precompute_remainders(max_n, g_low):
    """Precompute x^n mod G for n = 0..max_n using iterative multiply-by-x."""
    rem = [0] * (max_n + 1)
    r = 1  # x^0 mod G = 1
    rem[0] = r
    for n in range(1, max_n + 1):
        r <<= 1
        if r & (1 << 32):
            r ^= (1 << 32) | g_low
        rem[n] = r
    return rem


def verify_zero_poly(terms, g):
    """Verify that x^terms[0] + x^terms[1] + ... is a zero polynomial of G."""
    z = 0
    for t in terms:
        z |= (1 << t)
    return poly_mod(z, g) == 0


def search_3term(rem, max_n):
    """Find 3-term zero polynomials: x^a + x^b + 1 where rem[a] ^ rem[b] = 1.

    Returns list of (degree, [a, b, 0]) sorted by degree.
    """
    # Build reverse lookup: remainder -> smallest n
    lookup = {}
    for n in range(max_n + 1):
        r = rem[n]
        if r not in lookup:
            lookup[r] = n

    results = []
    for a in range(1, max_n + 1):
        # Need rem[a] ^ rem[b] ^ rem[0] = 0, rem[0] = 1
        # So rem[b] = rem[a] ^ 1
        target = rem[a] ^ 1
        if target in lookup:
            b = lookup[target]
            if 0 < b < a:
                results.append((a, [a, b, 0]))
    results.sort()
    return results


def search_5term(rem, max_n):
    """Find 5-term zero polynomials: x^a + x^b + x^c + x^d + 1.

    Uses meet-in-the-middle: build dict of pair XORs, then lookup.
    Returns list of (degree, [a, b, c, d, 0]) sorted by degree.
    """
    # Build dict: rem[i] ^ rem[j] -> (i, j) for all pairs with i > j > 0
    pair_xor = {}
    for i in range(1, max_n + 1):
        for j in range(1, i):
            val = rem[i] ^ rem[j]
            if val not in pair_xor:
                pair_xor[val] = (i, j)

    results = []
    seen = set()
    # For each pair (c, d), check if rem[c] ^ rem[d] ^ 1 is a known pair XOR
    for c in range(1, max_n + 1):
        for d in range(1, c):
            target = rem[c] ^ rem[d] ^ 1  # ^ rem[0] where rem[0]=1
            if target in pair_xor:
                a, b = pair_xor[target]
                # Ensure all indices are distinct and a > b > c > d > 0
                indices = sorted([a, b, c, d], reverse=True)
                if len(set(indices)) == 4 and indices[-1] > 0:
                    key = tuple(indices)
                    if key not in seen:
                        seen.add(key)
                        results.append((indices[0], indices + [0]))

    results.sort()
    return results


def search_generator_ext(rem, g_low):
    """Compute x^64 + R(x) where R = x^64 mod G. This is the 'extended generator'
    zero polynomial used for processing 64 bits at a time."""
    r = rem[64]
    terms = [64]
    for bit in range(32):
        if r & (1 << bit):
            terms.append(bit)
    terms.sort(reverse=True)
    return terms


def main():
    print("=" * 72)
    print("CRC32C Zero Polynomial Search")
    print("Generator: G(x) = {} ({} terms)".format(
        poly_to_hex(G_CRC32C), popcount(G_CRC32C)))
    print("         = {}".format(poly_to_terms(G_CRC32C)))
    print("=" * 72)

    # --- Compute key reduction constants ---
    print("\n--- Key reduction constants ---\n")

    for n in [32, 64, 96, 128]:
        r = xn_mod_g(n, G_LOW)
        terms = popcount(r) + 1  # +1 for x^n itself
        print("x^{:<3d} mod G = {} ({} terms in zero poly x^{} + R)".format(
            n, poly_to_hex(r), terms, n))
        # Verify
        z = (1 << n) | r
        assert poly_mod(z, G_CRC32C) == 0, "VERIFICATION FAILED for x^{}".format(n)
        print("       verified: (x^{} + {}) mod G = 0".format(n, poly_to_hex(r)))

    # --- Generator polynomial info ---
    print("\n--- Generator polynomial comparison ---\n")
    print("CRC32C G(x): {} terms, degree 32".format(popcount(G_CRC32C)))
    print("  = {}".format(poly_to_terms(G_CRC32C)))
    print("CRC32-IEEE : {} terms, degree 32".format(popcount(G_IEEE)))
    print("  = {}".format(poly_to_terms(G_IEEE)))

    # --- Extended generator (x^64 + R) ---
    print("\n--- Extended generator: x^64 + (x^64 mod G) ---\n")
    MAX_REM = 100000  # precompute up to this degree
    print("Precomputing x^n mod G for n = 0..{}...".format(MAX_REM))
    rem = precompute_remainders(MAX_REM, G_LOW)
    print("Done.")

    gen64_terms = search_generator_ext(rem, G_LOW)
    print("\nExtended generator zero polynomial ({} terms):".format(len(gen64_terms)))
    print("  Z(x) = {}".format(poly_to_terms(sum(1 << t for t in gen64_terms))))
    print("  Cost: {} XORs per 64-bit word".format(len(gen64_terms) - 1))
    assert verify_zero_poly(gen64_terms, G_CRC32C), "VERIFICATION FAILED"
    print("  Verified: Z(x) mod G(x) = 0")

    # --- Search for 3-term zero polynomials ---
    print("\n--- 3-term zero polynomials (x^a + x^b + 1) ---\n")
    results_3 = search_3term(rem, MAX_REM)
    if results_3:
        # Show smallest degree
        deg, terms = results_3[0]
        print("Smallest: degree {} -> {}".format(deg, poly_to_terms(sum(1 << t for t in terms))))
        assert verify_zero_poly(terms, G_CRC32C), "VERIFICATION FAILED"
        print("  Verified.")
        # Show first few
        for i, (d, t) in enumerate(results_3[:5]):
            print("  deg {:>6d}: {}".format(d, poly_to_terms(sum(1 << tt for tt in t))))
    else:
        print("None found up to degree {}".format(MAX_REM))
        print("(Expected: smallest 3-term is at degree ~91639 for IEEE)")

    # --- Search for 5-term zero polynomials ---
    # Limit search range for efficiency in Python
    SEARCH_5T = 2000  # degree limit for 5-term pair search
    print("\n--- 5-term zero polynomials (x^a + x^b + x^c + x^d + 1) ---")
    print("    Searching degrees 1..{} (meet-in-the-middle)...\n".format(SEARCH_5T))
    results_5 = search_5term(rem, SEARCH_5T)
    if results_5:
        deg, terms = results_5[0]
        print("Smallest: degree {} -> {}".format(deg, poly_to_terms(sum(1 << t for t in terms))))
        assert verify_zero_poly(terms, G_CRC32C), "VERIFICATION FAILED"
        print("  Verified.")
        # Show candidates suitable for packet sizes
        print("\nCandidates with degree <= 1500 (fits 1500B packets):")
        for d, t in results_5:
            if d > 1500:
                break
            scaled = d * 8
            fits_64 = "yes" if scaled <= 512 else "no"
            fits_1500 = "yes" if scaled <= 12000 else "no"
            print("  deg {:>4d} (scaled {:>5d}B): {} [fits 64B: {}, 1500B: {}]".format(
                d, scaled // 8, poly_to_terms(sum(1 << tt for tt in t)),
                fits_64, fits_1500))
    else:
        print("None found up to degree {}".format(SEARCH_5T))

    # --- Build Table III equivalent ---
    print("\n--- Minimum degree by term count (CRC32C) ---\n")
    print("{:<8s} {:<12s}".format("Terms", "Min degree"))
    print("-" * 20)

    # 15+ terms: generator itself
    print("{:<8d} {:<12d}  (generator polynomial)".format(
        popcount(G_CRC32C), 32))

    # x^64 + R
    print("{:<8d} {:<12d}  (extended generator, x^64 + R)".format(
        len(gen64_terms), 64))

    if results_3:
        print("{:<8d} {:<12d}  (3-term, x^a + x^b + 1)".format(
            3, results_3[0][0]))
    else:
        print("{:<8d} {:<12s}  (3-term, not found <= {})".format(
            3, ">{}".format(MAX_REM), MAX_REM))

    if results_5:
        print("{:<8d} {:<12d}  (5-term, x^a + ... + 1)".format(
            5, results_5[0][0]))

    # --- Output C constants ---
    print("\n" + "=" * 72)
    print("C CONSTANTS FOR IMPLEMENTATION")
    print("=" * 72)

    r64 = rem[64]
    print("\n/* x^64 mod G_CRC32C(x) — generator_64 reduction constant */")
    print("/* {} terms, {} XORs per 64-bit word */".format(
        popcount(r64) + 1, popcount(r64)))
    print("#define CRC32C_X64_MOD_G  {}".format(poly_to_hex(r64)))
    print("/* = {} */".format(poly_to_terms(r64)))

    # Print bit positions for the XOR loop
    bits = []
    for bit in range(32):
        if r64 & (1 << bit):
            bits.append(bit)
    print("/* Set bit positions: {} */".format(bits))

    r96 = rem[96]
    r128 = rem[128]
    print("\n/* Additional constants for PCLMUL folding (future use) */")
    print("#define CRC32C_X96_MOD_G  {}".format(poly_to_hex(r96)))
    print("#define CRC32C_X128_MOD_G {}".format(poly_to_hex(r128)))

    if results_5:
        best5 = results_5[0]
        print("\n/* Best 5-term zero polynomial for Chorba */")
        print("/* degree {}, {} XORs per word */".format(best5[0], 4))
        terms_list = best5[1][:-1]  # exclude the +1 term
        print("/* Z(x) = {} */".format(
            poly_to_terms(sum(1 << t for t in best5[1]))))
        print("#define CHORBA5_TERMS {{ {} }}".format(
            ", ".join(str(t) for t in terms_list)))
        print("#define CHORBA5_DEGREE {}".format(best5[0]))

    print()


if __name__ == "__main__":
    main()
