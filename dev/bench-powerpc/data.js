window.BENCHMARK_DATA = {
  "lastUpdate": 1772244495806,
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
          "id": "23cf4a28bf8c3c675e176ccb86a0bda91f4cbb1e",
          "message": "Fix interop log capture: UDPspeeder logs to stdout, not stderr\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T23:12:51Z",
          "tree_id": "e9b4bf7d6abc4cf2834034002eeafd1208fc24a0",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/23cf4a28bf8c3c675e176ccb86a0bda91f4cbb1e"
        },
        "date": 1772234024730,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.44,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 439.753,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1659.42,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2436.47,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37205,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 123699,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42248.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 133108,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 128.191,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 450.834,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1744.37,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2609.45,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 108.07,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 332.09,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1228.77,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1803.53,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 113.71,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 337.452,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1235.6,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1806.09,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 701.441,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1152.99,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2970.1,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4086.36,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 409.475,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 884.4,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2801.99,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3975.25,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1980.46,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1420.17,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1049.85,
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
          "id": "41ed1156a226ec5c33a30aad3bf5880540723a0f",
          "message": "Fix SPE xor_tile alignment bug + diagnostic CI for PPC interop\n\nMove head-alignment and tile rotation into C (packet_cook.cpp) so the\nSPE assembly always receives 8-byte-aligned data at tile offset 0.\nThe old assembly head loop left the tile offset misaligned (1-7) after\naligning the data pointer, causing every subsequent evldd to read from\na misaligned tile address — silent corruption on e500v2.\n\nAlso: add --log-level pass-through to interop.sh, enable trace logging\nfor PPC-client CI pairs, add no-fec-key interop config to isolate key\nXOR failures, and add unaligned-buffer cook unit tests.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T23:42:26Z",
          "tree_id": "33119efeddb9026f057f6618c8bfb8ca5edf0ce8",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/41ed1156a226ec5c33a30aad3bf5880540723a0f"
        },
        "date": 1772235805446,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 139.668,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 444.607,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1687.04,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2459.73,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37870.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125010,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43333.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135918,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 130.785,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 458.503,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1777.46,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2650.11,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 109.262,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 336.376,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1244.88,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1823.79,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 115.616,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 342.321,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1242.9,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1822.71,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 741.539,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1201.36,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3072.32,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4192.08,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 432.051,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 912.161,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2863.73,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4075.91,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2010.5,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1447.92,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1072.76,
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
          "id": "09eb177275275a1d7238202422dfbe8f10bd2345",
          "message": "Remove diagnostic trace logging for PPC interop tests\n\nThe SPE alignment bug is fixed (41ed115). Drop the --log-level 6\noverride for PPC-client pairs; default level 4 is sufficient.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T23:57:32Z",
          "tree_id": "09ca5471f304510e9512c9905be669fff8686b5a",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/09eb177275275a1d7238202422dfbe8f10bd2345"
        },
        "date": 1772236709879,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.763,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 441.719,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1664.88,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2447.29,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37237.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 123201,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42550.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 134491,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 131.468,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 457.6,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1759.3,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2630.91,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 107.709,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 331.925,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1229.06,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1797.49,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 114.422,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 336.036,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1234.07,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1816.13,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 737.192,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1188.72,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3000.59,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4123.84,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 421.993,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 897.404,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2822.52,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3989.82,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1983.55,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1441,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1068.46,
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
          "id": "73a6487ef00470a19a7423bfbf12149c548b4f35",
          "message": "Add AVX-512BW addmul1 and XOR cook with runtime CPUID dispatch\n\naddmul1_avx512: 512-bit GF(2^8) multiply-accumulate using vpshufb\nfor nibble table lookups and vpternlogd (0x96) for 3-way XOR in one\ninstruction. 128 bytes/iteration (2x unrolled), with 64B/32B/16B/scalar\ntails.\n\nxor_tile_avx512: 512-bit XOR cook pipeline with broadcast fast path\nfor tile_len=16 and 4x128-bit insert for arbitrary tile lengths.\n\nCPUID detection checks OSXSAVE, XCR0 bits 1,2,5,6,7 (SSE+AVX+opmask+\nZMM), and CPUID.7.EBX[30] (AVX-512BW). Falls back to AVX2 → SSSE3/SSE2\non older hardware.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-28T00:23:45Z",
          "tree_id": "cca6cdf670f7380e8a68ae1bac9cbb48a718c9a5",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/73a6487ef00470a19a7423bfbf12149c548b4f35"
        },
        "date": 1772238273523,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.549,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 440.926,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1664.73,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2436.11,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37298.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 123219,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42569.9,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 134225,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 128.711,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 451.736,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1744.97,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2612.15,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 109.356,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 334.296,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1230.25,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1799.67,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 114.718,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 337.249,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1235.52,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1804.37,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 724.832,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1180.69,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2990.19,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4122.09,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 422.936,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 901.31,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2818.51,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3994.02,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1986.17,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1431.56,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1061.52,
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
          "id": "f16fa22a3d413876df9b4e5329d8b5effbd3f32a",
          "message": "Print detected SIMD tier in benchmark output\n\nAdds SIMD banner at bench startup showing which codepath was selected:\n  SIMD: addmul1=avx512bw  xor_cook=avx512bw  vec_width=16\n\nExposes bench_addmul1_impl() and bench_xor_tile_impl() from the\nrespective source files, reading the runtime dispatch state directly.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-28T00:32:31Z",
          "tree_id": "a43a380c643b5961bc01bd9f0da6ebd0519c487b",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/f16fa22a3d413876df9b4e5329d8b5effbd3f32a"
        },
        "date": 1772238787518,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.868,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 446.486,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1671.56,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2445.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37362.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 123696,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 62321,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 133700,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 130.604,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 454.111,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1748.02,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2611.96,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 107.377,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 331.658,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1237.04,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1800.66,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 116.033,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 339.303,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1235.71,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1802.21,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 725.859,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1174.81,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2991.62,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4110.92,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 420.548,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 897.227,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2830.06,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3990.35,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1972.95,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1425.35,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1053.76,
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
          "id": "979b8f504f81a5577e5bcd21f4b449878f056c5f",
          "message": "Unroll NEON addmul1 and XOR cook loops 2x for ILP\n\nARMv8 has 32 NEON registers so 2x unrolling is free in register\npressure. Processes 32 bytes/iteration in the main loop with a\n16-byte tail, matching the x86 unroll pattern.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-28T00:59:48Z",
          "tree_id": "1a72a74d46d4a90d16ee84fe5e1394a60ee1dc79",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/979b8f504f81a5577e5bcd21f4b449878f056c5f"
        },
        "date": 1772240570267,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 90.234,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 268.405,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 986.762,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1432.84,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 22297.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 73299.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 26910.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 82608.8,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 83.3397,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 304.485,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1162.21,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 1783.05,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 92.7219,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 328.109,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1258.34,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1847.73,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 97.0242,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 332.458,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1262.75,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1854.41,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 716.017,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1143.86,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2941.76,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4018.03,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 389.598,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 834.929,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2699.54,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3819.75,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2014.58,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1364.6,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 962.719,
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
          "id": "3374e3bb8df0ef321d8b77f6980c14a3d897f215",
          "message": "Add workflow_dispatch trigger to CI for manual runs\n\nCo-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-02-28T02:06:20Z",
          "tree_id": "5fc7c4bd801466d915c34bbe285dee83f9fd666a",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/3374e3bb8df0ef321d8b77f6980c14a3d897f215"
        },
        "date": 1772244495283,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 136.913,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 440.414,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1663.16,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2438.02,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37157.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 123762,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42185.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 132525,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 127.879,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 452.236,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1744.18,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2607.99,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 107.513,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 331.814,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1231.7,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1796.28,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 114.108,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 338.281,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1238.92,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1805.9,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 723.06,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1182.9,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3006.67,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4105.02,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 426.424,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 892.56,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2810.08,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3983.68,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1972.26,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1430.63,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1055.71,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}