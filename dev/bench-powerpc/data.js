window.BENCHMARK_DATA = {
  "lastUpdate": 1772233667117,
  "repoUrl": "https://github.com/slartibardfast/UDPspeeder",
  "entries": {
    "UDPspeeder Benchmarks (PowerPC e500v2 via QEMU)": [
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "slartibardfast"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "slartibardfast"
          },
          "distinct": true,
          "id": "2f0ac6a6fd84881879c4eda7104028df62d15b5c",
          "message": "Add PowerPC e500v2 SPE support for XOR cook pipeline\n\n- New xor_spe.S: SPE assembly (evldd/evxor/evstdd) for 8-byte XOR,\n  4x unrolled main loop (32 bytes/iter), with alignment handling\n  and tile wrap-around. Uses %r prefix and addic for r0 correctness.\n\n- packet_cook.cpp: HAVE_PPC_SPE dispatch tier (COOK_VEC_WIDTH=8),\n  word-width generic fallback for all non-x86/ARM platforms,\n  tile buffer padding to handle SPE cross-boundary loads.\n\n- makefile: SPE=1 flag sets -DHAVE_PPC_SPE -Wa,-mspe for both\n  FLAGS and BENCH_FLAGS. xor_spe.S added to all source lists.\n\n- CI: PowerPC matrix entry with OpenWrt 25.12.0-rc5 mpc85xx/p1010\n  toolchain, qemu-ppc-static -cpu e500v2 tests, QEMU benchmarks,\n  separate PPC benchmark dashboard. Also adds QEMU tests for aarch64.\n\nTested: native x86 (make test/bench/all), PPC cross-compile + QEMU\n(all 55 tests pass including cook round-trip at all sizes).\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T22:40:57Z",
          "tree_id": "fdbfa6516f9c5399c4e460317e9ce3cdc2454e2b",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/2f0ac6a6fd84881879c4eda7104028df62d15b5c"
        },
        "date": 1772146136669,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 134.681,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 439.77,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1664.04,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2441.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37196,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 123045,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43717.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 197559,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 128.47,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 452.178,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1746.42,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2608.9,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 107.802,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 332.384,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1229.02,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1798.17,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 114.374,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 336.815,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1234.88,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1801.27,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 705.865,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1154.6,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2970.84,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4095.19,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 403.97,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 878.71,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2794.85,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3984.31,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1977.24,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1421.06,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1098.37,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "slartibardfast"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "slartibardfast"
          },
          "distinct": true,
          "id": "2eac606992b16593e75795ff087636323ff36959",
          "message": "Document PPC e500v2 results and cross-architecture notes\n\n- Section 14: SPE XOR assembly, QEMU benchmarks, gotchas\n- Cross-architecture notes: x86_64, ARMv8, e500v2, MIPS, RISC-V\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T23:24:02Z",
          "tree_id": "29e0e55a84cdf4de6adce48949797967ee895e78",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/2eac606992b16593e75795ff087636323ff36959"
        },
        "date": 1772148316853,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 134.582,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 442.65,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1663.81,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2434.25,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37221.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 122918,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42079.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 132745,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 128.06,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 451.51,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1745.23,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2632.66,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 108.053,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 333.415,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1231.49,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1797.34,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 113.644,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 337.275,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1235.06,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1803.53,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 696.875,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1148.68,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2972.61,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4097.56,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 406.364,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 893.827,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2794.79,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4080.26,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1997.92,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1422.03,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1090.47,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "slartibardfast"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "slartibardfast"
          },
          "distinct": true,
          "id": "ec732d11541bd3c884725b61fafcfaf0889a6ad1",
          "message": "Add -lgcc_eh to cross targets for musl static linking\n\nFixes undefined reference to _Unwind_Resume when statically linking\nwith musl-based OpenWrt toolchains (RISC-V, PowerPC).\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T22:37:56Z",
          "tree_id": "b118fc01bc6dd515f81efca70773415783f79a4b",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/ec732d11541bd3c884725b61fafcfaf0889a6ad1"
        },
        "date": 1772231919466,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.985,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 441.978,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1665.72,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2445.26,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 54145.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 123562,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42432.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 133035,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 128.465,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 455.224,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1748.89,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2615.69,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 107.506,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 332.14,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1228.52,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1803.62,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 113.389,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 336.041,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1234.6,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1801.46,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 698.025,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1151.46,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2973.25,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4089.75,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 406.338,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 884.849,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2799.3,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3969.02,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1978.53,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1413.97,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1042.99,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "slartibardfast"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "slartibardfast"
          },
          "distinct": true,
          "id": "ba80f8792a0d7ae10c0860054fabce417bf508e4",
          "message": "Auto-dump tunnel logs on interop test failure\n\nCaptures server/client stderr at log-level 4 (info) to temp files\nand prints last 80 lines on failure. Helps diagnose cross-arch\nissues like the PPC+FEC failure without manual re-runs.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T23:05:36Z",
          "tree_id": "0a08614e654d6061c32066c79551611350616a2c",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/ba80f8792a0d7ae10c0860054fabce417bf508e4"
        },
        "date": 1772233666102,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 137.439,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 443.107,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1667.75,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2434.32,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37189.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 123235,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42338.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 133806,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 128.326,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 451.008,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1744.78,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2609.25,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 107.794,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 331.566,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1227.5,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1798.31,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 114.641,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 458.295,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1244.98,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1805.88,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 697.546,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1149.11,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2963.51,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4104.1,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 407.47,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 882.086,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2801.37,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4005.45,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1979.67,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1410.65,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1047.65,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}