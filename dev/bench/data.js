window.BENCHMARK_DATA = {
  "lastUpdate": 1772235852026,
  "repoUrl": "https://github.com/slartibardfast/UDPspeeder",
  "entries": {
    "UDPspeeder Benchmarks": [
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
          "id": "107d3e4631f6050bc8c00b210fd9ad5abc7c5a91",
          "message": "Add CI static builds and profiling script for target hardware\n\nRework CI into test + build-static jobs. Build bench/test/production\nbinaries for x86_64 (g++ -static) and aarch64 (cross-compile), upload\nas downloadable artifacts with a POSIX sh profiling script.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-20T20:55:20Z",
          "tree_id": "f601aa62c80b71d7724ce807bda37df1a6c3e918",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/107d3e4631f6050bc8c00b210fd9ad5abc7c5a91"
        },
        "date": 1771621867968,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.3396,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 12.317,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.9689,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.569,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 660.858,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2187.85,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1320.81,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3508.08,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6404,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.2796,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.965,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.563,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.9314,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.208,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.002,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 669.198,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.96518,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7595,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.243,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.235,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65665,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7523,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.262,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.27,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 215.789,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 246.746,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 645.381,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 542.282,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 69.8399,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 91.3933,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 281.538,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 368.904,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 206.988,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 313.495,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 135.706,
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
          "id": "0a87d347e3628ab452127437d3ca995c1eb64341",
          "message": "Baseline: enable CI benchmark storage on baseline branch\n\nTemporary commit to capture pre-optimization benchmark numbers.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-20T21:29:55Z",
          "tree_id": "c5cdfaabc020139856e12484397e7c24ff683e56",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/0a87d347e3628ab452127437d3ca995c1eb64341"
        },
        "date": 1771623019307,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 27.8768,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 101.593,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 415.792,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 597.604,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 9126.58,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 30094.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 9764.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 31482.6,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5647,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.4526,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 266.1,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 444.468,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.3078,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 101.999,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 441.278,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 652.809,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65522,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9116,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.66,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.556,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66517,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7726,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.839,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.894,
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
          "id": "d95ea86ce5466fddc29e65aad046553385dfe082",
          "message": "Add .gitignore to exclude private .claude directory\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T17:08:23Z",
          "tree_id": "7068d9ba7cc5597f1ea3e76ee2f4b623a67a7d75",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/d95ea86ce5466fddc29e65aad046553385dfe082"
        },
        "date": 1772039377095,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2621,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 12.4069,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.9825,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.5663,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 661.681,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2154.31,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1194.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3515.76,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.7042,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.3035,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.185,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.321,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.1262,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.972,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 451.904,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 671.162,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.96659,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7696,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.353,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.344,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66137,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7657,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.327,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.231,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 216.224,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 243.734,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 430.771,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 539.755,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 67.8746,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 115.881,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 267.233,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 389.768,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.106,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 313.434,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 136.404,
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
          "id": "6763602bc5ad38b305bb425dd4b802ce708ea4cc",
          "message": "Add end-to-end tunnel throughput harness and CI workflow\n\nbench/throughput.sh: loopback tunnel throughput test using Python UDP\nsender/receiver. Runs 3 iterations, reports median MB/s. Tests with\nand without FEC.\n\nthroughput.yml: CI workflow comparing current branch against baseline\n(origin/baseline) for vectorization impact measurement.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T17:34:45Z",
          "tree_id": "ea913c0b05730cc080ddfd41a2874826abef4deb",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/6763602bc5ad38b305bb425dd4b802ce708ea4cc"
        },
        "date": 1772040930109,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.3053,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 12.4512,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.1348,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.5006,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 662.464,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2152.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1210.72,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3542.16,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5462,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.1714,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.472,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.138,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.2636,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.276,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 454.885,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.966,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.98433,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.8987,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.633,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 165.148,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.71212,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.8554,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.957,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.808,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 216.569,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 244.386,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 429.231,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 538.401,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 67.5982,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 83.6386,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 270.031,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 369.247,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.239,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 312.819,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 135.784,
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
          "id": "e7410a48fbc821f404a94e5d69f8b66cc6a63b09",
          "message": "Fix throughput.sh permission denied in CI\n\nSet executable bit in git index and add chmod fallback in workflow.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T17:41:15Z",
          "tree_id": "061e8594a050c3275b05adc93518a8d0a135e062",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/e7410a48fbc821f404a94e5d69f8b66cc6a63b09"
        },
        "date": 1772041300790,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.3137,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 12.3811,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.9496,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.4876,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 661.376,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2152.67,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1213.63,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3507.08,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5739,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.9433,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.199,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.572,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.1436,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.92,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 456.812,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 671.643,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.96849,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9206,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.407,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.606,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.6634,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7801,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.46,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.389,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 228.85,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 249.399,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 433.633,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 542.967,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 70.7892,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 103.497,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 271.161,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 385.631,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.236,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 313.443,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 136.235,
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
          "id": "58fe76514e7da37fcf817c64e16e15b83949514a",
          "message": "Fix JSON output in throughput harness\n\n- Use printf instead of echo for JSON to avoid encoding issues\n- Default median to 0.0 if empty\n- Build JSON array in one printf call instead of echo concatenation\n- Add JSON validation step in CI\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T17:45:53Z",
          "tree_id": "468db5900bc008d0269efb933627814cb43de27e",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/58fe76514e7da37fcf817c64e16e15b83949514a"
        },
        "date": 1772041600345,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.3264,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 12.6207,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.983,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.5369,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 659.039,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2150.73,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1222.19,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3558.37,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6305,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.1082,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.3,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.162,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.014,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.711,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 452.838,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 672.024,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.0054,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.8083,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.477,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.275,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65931,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7631,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.599,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.334,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 215.67,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 245.5,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 429.675,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 538.575,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 62.1366,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 125.385,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 307.587,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 364.668,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.278,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 314.505,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 136.105,
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
          "id": "e080e0f5bcb43d9534b15adc3aa3b1fc8a6bb0fc",
          "message": "Fix throughput.sh: wait for receiver instead of killing it\n\nThe receiver was being killed before its socket timeout fired,\nso stdout was never flushed to the tmpfile. Now we:\n- Wait for the receiver to exit naturally (2s socket timeout)\n- Kill only tunnel processes after receiver finishes\n- Add debug output to stderr for CI visibility\n- Use sys.stdout.flush() for explicit buffer flush\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T17:51:21Z",
          "tree_id": "b758505fb44d5804ddf570ec229048bc40de60e0",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/e080e0f5bcb43d9534b15adc3aa3b1fc8a6bb0fc"
        },
        "date": 1772041911421,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.3394,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 12.2887,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.9193,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.5188,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 660.287,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2156.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1222.34,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3913.97,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 19.1164,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 70.3488,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.402,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 454.294,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.4867,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.358,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 455.35,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.269,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.96739,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.8918,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.772,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.184,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66343,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7783,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.65,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 165.884,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 220.294,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 248.071,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 436.108,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 547.647,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 76.2295,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 110.222,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 258.759,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 402.674,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.145,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 318.379,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 137.079,
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
          "id": "39657027903412eb625c7f6ce9d83c74ed9475a5",
          "message": "Add baseline results to throughput benchmark tracking\n\nBoth current and baseline throughput are now stored as separate\nseries (throughput/* and baseline/throughput/*) so they appear\nside by side on the gh-pages chart.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T17:56:48Z",
          "tree_id": "1b3c6d86527c5111b1e1c8bc82d232838cb71502",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/39657027903412eb625c7f6ce9d83c74ed9475a5"
        },
        "date": 1772042237900,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2775,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 12.387,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.9653,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.5155,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 657.351,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2160.53,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1205.59,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3539.57,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5685,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.0099,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 272.035,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.09,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.9836,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.027,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.934,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 669.759,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97577,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9013,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.964,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 165.024,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66595,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.8445,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.79,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.267,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 215.725,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 243.724,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 429.574,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 538.685,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 51.7822,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 103.326,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 287.931,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 383.337,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.15,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 314.659,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 136.15,
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
          "id": "37808a2c9bcae658b2a0f233c91b6afc081799c7",
          "message": "Switch throughput unit from MB/s to Mbps\n\nMultiply bytes/sec by 8 for megabits per second, the standard\nnetworking throughput unit.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T18:13:50Z",
          "tree_id": "a0270e4ac7e96aff8dc8330ba4b281c59076cbbb",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/37808a2c9bcae658b2a0f233c91b6afc081799c7"
        },
        "date": 1772043250114,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.3105,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 12.423,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.9244,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.4767,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 660.825,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2158.21,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1205.01,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3525.91,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.738,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9506,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 274.814,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 456.629,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.9986,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.151,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 452.491,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.3,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97215,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7806,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 110.918,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.327,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65837,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7696,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.285,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.266,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 215.497,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 242.918,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 429.852,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 541.046,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 65.8329,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 111.3,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 288.622,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 386.5,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.105,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 312.797,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 137.19,
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
          "id": "649fd4dc00e077ae555c9e853dd344203476fafe",
          "message": "Reduce per-packet overhead: zero-copy conv header, skip delay memcpy, SIMD unrolling\n\nZero-copy changes (latency-neutral, eliminates 2 full-packet memcpys):\n- Receive into data+4 headroom, write conv header in-place (put_conv_inplace)\n- Skip memcpy in delay_send for delay=0 (common case), send from caller's buffer\n\nSIMD improvements:\n- addmul1: 2x loop unrolling for SSSE3 (32B/iter) and AVX2 (64B/iter)\n- xor_tile: AVX2 variant with broadcast fast path for tile_len==16, runtime CPUID dispatch\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T22:28:08Z",
          "tree_id": "7bafb6241f1d7acd01664bcf6995b0ae06955d04",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/649fd4dc00e077ae555c9e853dd344203476fafe"
        },
        "date": 1772058533842,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2356,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8272,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.053,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.9207,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 651.215,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2144.44,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1296.75,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3576.22,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5681,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.7958,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.41,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.673,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.5796,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.976,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 441.702,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 652.733,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.67289,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.001,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.416,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.683,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65702,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7662,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.385,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.112,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.966,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 169.83,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.555,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 376.075,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.7007,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.4131,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 186.941,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 256.5,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 208.201,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 207.606,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.9085,
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
          "id": "00ba006ce188c0e2abc7b989135ef3ae90f91a68",
          "message": "Fix inverted throughput alert threshold\n\nFor customBiggerIsBetter, alert-threshold 70% alerts when\ncurrent <= previous/0.70, which is almost always true. Change\nto 115% to alert on ~13% throughput drops (same as microbench).\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T22:36:36Z",
          "tree_id": "beda112280f68e470e7d46b26df055a7eb4eac4a",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/00ba006ce188c0e2abc7b989135ef3ae90f91a68"
        },
        "date": 1772059089290,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.1931,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8363,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.7113,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.8256,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 651.224,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2134.33,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1314.05,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3461.75,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.4923,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9986,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.243,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.376,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.4201,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 103.115,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 442.872,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 649.43,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65767,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9346,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.69,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.7,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66078,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7823,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.314,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.65,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.728,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 169.919,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 305.443,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.359,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.6215,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.2988,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 184.459,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.734,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.222,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 209.069,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.8985,
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
          "id": "77eb8d3e9e07fd699dd35dbff33de91c3fb111d2",
          "message": "Fix const sockaddr* build error in extracted functions\n\nfrom_sockaddr() takes non-const sockaddr*, so drop const from\nthe extracted function signatures to match.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T22:40:54Z",
          "tree_id": "16b993b817f56fcdfb5796f1ec7d12d304638695",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/77eb8d3e9e07fd699dd35dbff33de91c3fb111d2"
        },
        "date": 1772059275524,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2199,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8165,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.6163,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.7585,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 657.726,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2121.98,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1306.84,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3504.33,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5449,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.872,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.037,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 450.292,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.2754,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.859,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 440.708,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 655.396,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.67283,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9316,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.642,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.688,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65805,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7768,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.466,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.602,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.623,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.013,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 306.158,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.632,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.6569,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.8875,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 186.383,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 255.938,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 208.224,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 208.847,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 80.0724,
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
          "id": "452493e388a7669313f283571fc21551686460a2",
          "message": "Add io_uring multishot receive integration\n\nEliminate per-packet recvfrom/recv syscalls on Linux 6.0+ by using\nio_uring with multishot recv/recvmsg and provided buffer rings.\nShared-memory SQ/CQ rings avoid user↔kernel context switches; one\nmultishot SQE serves many CQEs without resubmission.\n\nNew files:\n- io_uring_recv.h/cpp: raw syscall wrappers (no liburing dependency),\n  buffer ring management, CQE parsing, multishot recv/recvmsg API\n\nIntegration:\n- tunnel_client.cpp: extract client_process_remote_packet(), add\n  client_uring_cb() dispatching by tag type, conditionalize init\n- tunnel_server.cpp: extract server_process_remote_packet(), add\n  server_uring_cb(), conditionalize init + new-connection path\n- connection.cpp: cancel uring multishot on conv expiry\n- makefile: add io_uring_recv.cpp to SOURCES0\n\nRuntime fallback: uring_init() probes io_uring_setup + PBUF_RING\nregistration. On failure (kernel <6.0 or missing features), falls\nback transparently to existing libev ev_io callbacks.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T23:30:46Z",
          "tree_id": "0f3a3edb75ff25caeff3a0418bc1b6892ad00239",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/452493e388a7669313f283571fc21551686460a2"
        },
        "date": 1772062301789,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2394,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8132,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.8133,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.7064,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 684.858,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2147.54,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1321.73,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3465.04,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6405,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.0509,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 269.961,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.036,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.4873,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.78,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 440.674,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 650.463,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65854,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9859,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.775,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.738,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65621,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7611,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.294,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.58,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.656,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.175,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.943,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.393,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.5934,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.3684,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 185.528,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.808,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.03,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 210.342,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.9056,
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
          "id": "a623c5d5533f7958715980b5563407964677b7cf",
          "message": "Fix io_uring build: C++ atomics, remove struct fallbacks\n\n- Replace C11 _Atomic/stdatomic.h with GCC __atomic_store_n/__atomic_load_n\n  builtins which work in C++11\n- Remove struct fallback definitions (io_uring_buf, io_uring_buf_ring,\n  io_uring_buf_reg, io_uring_recvmsg_out) that conflict with kernel headers\n  on Ubuntu 24.04 — require kernel 6.0+ headers for compilation\n- Fix buf_ring_add: br->tail is __u16, use __atomic_store_n directly\n  instead of unsigned* wrapper\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T23:37:13Z",
          "tree_id": "00d4449a24487e0c1f85ecd40ae8d0b73ebfa764",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/a623c5d5533f7958715980b5563407964677b7cf"
        },
        "date": 1772063059118,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2348,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.817,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.0259,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.2871,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 1028.08,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2163.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1315.33,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3475.98,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5068,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.0818,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.416,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.704,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.4003,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 118.665,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 486.526,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 686.215,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.66098,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9298,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.668,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.626,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.68558,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 29.2786,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.363,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.594,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 195.592,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.621,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.73,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.633,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.6721,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.2543,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 186.189,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 255.681,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.104,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 365.14,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 150.978,
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
          "id": "a4d32c346458b0310be5b0fa2aef9db1d85ac489",
          "message": "Fix crash: validate IV length in de_obscure against configured range\n\nde_obscure() read iv_len from the last byte of incoming data without\nchecking it against iv_min/iv_max. Corrupt or malicious packets could\nproduce iv_len up to 255, causing lcm(255, 16) = 4080 which overflows\nthe 512-byte stack tile in xor_with_pattern. Pre-existing bug exposed\nby io_uring multishot receive delivering packets that hit this path.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T00:17:14Z",
          "tree_id": "7de0f8848c9059d3099cb6347a059c60b078c537",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/a4d32c346458b0310be5b0fa2aef9db1d85ac489"
        },
        "date": 1772065433173,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.1885,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8143,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 28.9264,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.7522,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 649.195,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2125.04,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1316.71,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3473.05,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.4914,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.7883,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.372,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.234,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.4641,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 104.016,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 440.34,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 650.55,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.66213,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9268,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.674,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.63,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65876,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7617,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.288,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.473,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.614,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.259,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.923,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 374.707,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.564,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 60.8477,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 186.727,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.548,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 208.1,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 207.299,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.9274,
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
          "id": "bb3649609ac7d94879737c2e071be21abf96776f",
          "message": "Fix io_uring recvmsg parsing, optimize CQ/buffer batching\n\n- Fix recvmsg_out payload offset: use template msg_namelen (128) instead\n  of hdr->namelen (16), matching liburing's io_uring_recvmsg_payload()\n- Fix CQ tail read: use acquire barrier (required for ARM correctness)\n- Batch CQ head advancement: single release store per drain batch\n- Batch buffer ring recycling: deferred adds with single tail commit\n- Combined submit+flush into single io_uring_enter syscall\n- Increase CQ ring to 4x buffer count to avoid multishot stalls\n- Add COOP_TASKRUN + SINGLE_ISSUER flags with fallback\n- Eliminate memcpy for SERVER_LOCAL and CLIENT_REMOTE paths\n- Add UDPSPEEDER_NO_URING env var for A/B throughput testing\n- Add throughput CI comparison (io_uring vs recvfrom)\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T03:27:17Z",
          "tree_id": "9aef135f8a14be7f89e83b86536c8d26fbce2c48",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/bb3649609ac7d94879737c2e071be21abf96776f"
        },
        "date": 1772076690968,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2209,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8151,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.6678,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.7863,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 652.761,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2117.75,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1313.86,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3455.28,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.3908,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.8107,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.245,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.678,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.4603,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.839,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 443.251,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 652.241,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.66333,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9287,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.704,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.664,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65859,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.782,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.281,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.975,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 155.222,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 171.291,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 305.389,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.604,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.8124,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.5443,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 185.381,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 256.426,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.4,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 208.479,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.8951,
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
          "id": "7b8b1ee1262d8e74b82fe4e399ce5648482ff68c",
          "message": "Document io_uring optimization: +27% throughput over recvfrom\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T03:54:36Z",
          "tree_id": "1de678b09b148fa0cc17d3c92f04db9d40086e3a",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/7b8b1ee1262d8e74b82fe4e399ce5648482ff68c"
        },
        "date": 1772078171639,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2029,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8544,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.6445,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.8161,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 648.338,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2119.74,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1308.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 5984.03,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 31.853,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.9061,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.202,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 450.979,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.3307,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.839,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 444.024,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 651.044,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65693,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.0877,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.856,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.697,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65808,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7734,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.445,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.715,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.65,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 169.791,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.615,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.203,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.6589,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.1232,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 186.292,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 261.86,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 208.607,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 355.267,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.9036,
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
          "id": "a563c5e2f7ece94379823cf5d98057b441788601",
          "message": "Batch FEC output sends with sendmmsg to reduce syscall overhead\n\nReplace N individual sendto() calls per FEC batch with a single\nsendmmsg() syscall. Adds my_send_batch() and delay_send_batch()\nthat cook all packets then send via one kernel transition.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T17:39:58Z",
          "tree_id": "59afc3de9bb30f24a15d7892e051b44784c6a0e9",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/a563c5e2f7ece94379823cf5d98057b441788601"
        },
        "date": 1772127702409,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.1999,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8159,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.7518,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.844,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 659.006,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2153.48,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1349.38,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3498.42,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5841,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.0704,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 273.336,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 455.238,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.7623,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 103.064,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 441.204,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 649.762,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65769,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9181,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.667,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.733,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.7082,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.9066,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 110.098,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.626,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.799,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.068,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.521,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.262,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.5894,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.094,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 186.058,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.97,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.106,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 211.027,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.8566,
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
          "id": "de1d99f5afd6eacb8ecfdbaee10ffaf5cc15238f",
          "message": "Replace std::map with flat array in FEC decode hot path\n\nfec_group_t::group_mp was a std::map<int,int> (red-black tree) used\nfor shard indices 0..254. Replace with a flat int[256] array for O(1)\nlookup/insert and zero heap allocation per shard. Also cache mp[seq]\nreference to avoid repeated unordered_map lookups.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T18:27:34Z",
          "tree_id": "01d0029b1dcd29a81a3b58a81b646d08ce0e17c2",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/de1d99f5afd6eacb8ecfdbaee10ffaf5cc15238f"
        },
        "date": 1772130549351,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2099,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8259,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.6071,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.1225,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 653.789,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2147.36,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1315.81,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3459.46,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5201,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.2314,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.071,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.678,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.5809,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.711,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 441.634,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 652.2,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.69337,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9618,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.744,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.722,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66395,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.9009,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.346,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.694,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.657,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.186,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.799,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.359,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.535,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.0319,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 184.965,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.214,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.223,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 208.558,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.8644,
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
          "id": "fd7c55514d3c2d3eedf285d3813b9f2e27d95ef5",
          "message": "Zero-copy io_uring recv: eliminate per-packet memcpy for conv header\n\nReserve 4-byte headroom (URING_RECV_HEADROOM) before each provided\nbuffer so callers can write the conv header in-place instead of\ncopying the entire payload to a stack buffer.\n\n- Buffer registration offsets by +4 bytes, reducing usable size by 4\n- recvmsg path (CLIENT_LOCAL): 140+ bytes of natural headroom from\n  the recvmsg_out header + sockaddr area, plus the 4-byte offset\n- recv path (SERVER_REMOTE): 4-byte headroom from buffer offset\n- Both paths now use recv_buf.data - sizeof(u32_t) directly\n\nSaves ~1400-byte memcpy per packet on the io_uring encode path.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T19:17:16Z",
          "tree_id": "b29764feb707a9b1bcbcdd0a2d2301dab17bb819",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/fd7c55514d3c2d3eedf285d3813b9f2e27d95ef5"
        },
        "date": 1772133563146,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2728,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8946,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.9377,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.8052,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 650.914,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2124.26,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1297.53,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3461.1,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5093,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9577,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.227,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.211,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.4361,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.999,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 442.936,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 651.603,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.70953,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9777,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.199,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.68,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66013,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7765,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.785,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.191,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.623,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.212,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.7,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 375.688,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.6514,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 60.9832,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 187.084,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 255.344,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.247,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 207.693,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.9529,
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
          "id": "f9bb47809087491b6cc59c23def7a0f57f9abacc",
          "message": "Replace anti_replay unordered_map with direct-mapped table\n\nThe old anti_replay_t used an unordered_map (90K buckets, ~2MB scattered)\nplus a 240KB ring buffer — 1-3 hash lookups per incoming FEC shard.\n\nReplace with a u32_t[32768] direct-mapped table (128KB contiguous):\n- is_vaild: single array access + compare (~3 ns vs ~30-100 ns)\n- set_invaild: single array write (~2 ns vs ~100-200 ns)\n- No hash function, no pointer chasing, fits in L2 cache\n- Effective window ~32K groups, comparable to old 30K ring buffer\n- Old entries naturally evicted by new seqs mapping to same slot\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T19:28:30Z",
          "tree_id": "b7f57e0ae80f2457a27174434da1bcd4efa93a24",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/f9bb47809087491b6cc59c23def7a0f57f9abacc"
        },
        "date": 1772134307567,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2286,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8198,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.8457,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.7448,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 650.138,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2122.76,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1306.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3603.88,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 23.882,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9442,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.181,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.52,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.4653,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.807,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 440.028,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 649.477,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65907,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.0098,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.389,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.588,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.6579,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7754,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.307,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.624,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 152.666,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.176,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 304.888,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 376.378,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.581,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 60.9873,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 185.886,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 256.161,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.217,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 209.233,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 80.3966,
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
          "id": "a0e8d1fb0e1574250fa43dc4c48894d684c064f5",
          "message": "Replace fec_group unordered_map with direct-mapped flat table\n\nReplace unordered_map<u32_t, fec_group_t> in fec_decode_manager with a\npre-allocated flat array indexed by seq & mask. Eliminates per-group\nmalloc/free (~50K allocs/sec) and reduces group init from 1KB memset\n(shard_idx[256]) to 32-byte bitmap clear.\n\nKey changes:\n- fec_group_t: add seq field, bitmap-based shard tracking (has_shard/set_shard)\n- group_table: heap-allocated array, size = next_pow2(fec_buff_num * 2)\n- Direct-mapped lookup: group_table[seq & mask], safe because monotonic\n  seqs guarantee no two concurrent groups collide when table > max groups\n- Per-shard cost: array index + compare vs hash + pointer chase\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T20:58:21Z",
          "tree_id": "b71d634c4f64c273a1eface207c704377c08edc7",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/a0e8d1fb0e1574250fa43dc4c48894d684c064f5"
        },
        "date": 1772139608317,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 7.6655,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 9.47264,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 24.6002,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 40.0035,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 690.547,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2363.29,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1124.35,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3447.47,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 30.0248,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 64.1341,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 251.287,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 418.469,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 17.446,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 92.1796,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 406.009,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 605.689,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.39202,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 11.4789,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 66.9463,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 113.687,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 5.82803,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 11.7177,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 66.9987,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 113.545,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 287.649,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 307.54,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 422.683,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 486.998,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 30.8002,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 50.3073,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 160.656,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 225.272,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 176.697,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 311.476,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 54.8021,
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
          "id": "6044a173b081b34162b8051b262fea2b80bd39d0",
          "message": "Update OPTIMIZATION.md with full optimization series results\n\nDocument optimizations 9-13 (sendmmsg batching, flat decode arrays,\nzero-copy recv, anti-replay table, flat group table with bitmap).\nAdd end-to-end throughput results (+48-76% no-fec, +81-113% fec-20:10\nvs baseline). Analyze diminishing returns and remaining architectural\nmemcpy bottleneck.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T21:14:15Z",
          "tree_id": "34aba49f1c6613fb10d2afd7d87569a48c47da02",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/6044a173b081b34162b8051b262fea2b80bd39d0"
        },
        "date": 1772140555531,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.1981,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8187,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.8388,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.7912,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 652.65,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2111.86,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1314.26,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3446.62,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.3632,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.036,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.668,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.96,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.3416,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.334,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 440.824,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 653.034,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65619,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9289,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.304,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.815,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65793,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7633,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.326,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.891,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 155.115,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 175.147,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 308.279,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 378.124,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.5444,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.5329,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 184.977,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.859,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.139,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 208.98,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 79.8673,
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
          "id": "66df8ad0f1cf16240b3c3a017f486e03548e531d",
          "message": "Add PowerPC e500v2 cross-compilation and QEMU CI\n\n- makefile: add bench-static, test-static, test-cross, all-cross targets\n- CI: add build-powerpc job with OpenWrt 25.12.0-rc5 mpc85xx toolchain,\n  qemu-ppc-static -cpu e500v2 tests, separate PPC benchmark dashboard\n\nProvides baseline PPC numbers (scalar everything, no SPE) for comparison\nwith the optimized branch_libev which has SPE XOR assembly.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T22:44:36Z",
          "tree_id": "9bbdd721b40a692a31760151b5742ef0edffbd88",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/66df8ad0f1cf16240b3c3a017f486e03548e531d"
        },
        "date": 1772146114416,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 27.6651,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 103.346,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 405.81,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 608.487,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 9079.31,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 30091.1,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 9775.42,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 31458.3,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.4605,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.4521,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 267.279,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 444.196,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.4036,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 102.61,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 437.535,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 656.937,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.66842,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9517,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.689,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.908,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66074,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7746,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.39,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.769,
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
          "id": "2f0ac6a6fd84881879c4eda7104028df62d15b5c",
          "message": "Add PowerPC e500v2 SPE support for XOR cook pipeline\n\n- New xor_spe.S: SPE assembly (evldd/evxor/evstdd) for 8-byte XOR,\n  4x unrolled main loop (32 bytes/iter), with alignment handling\n  and tile wrap-around. Uses %r prefix and addic for r0 correctness.\n\n- packet_cook.cpp: HAVE_PPC_SPE dispatch tier (COOK_VEC_WIDTH=8),\n  word-width generic fallback for all non-x86/ARM platforms,\n  tile buffer padding to handle SPE cross-boundary loads.\n\n- makefile: SPE=1 flag sets -DHAVE_PPC_SPE -Wa,-mspe for both\n  FLAGS and BENCH_FLAGS. xor_spe.S added to all source lists.\n\n- CI: PowerPC matrix entry with OpenWrt 25.12.0-rc5 mpc85xx/p1010\n  toolchain, qemu-ppc-static -cpu e500v2 tests, QEMU benchmarks,\n  separate PPC benchmark dashboard. Also adds QEMU tests for aarch64.\n\nTested: native x86 (make test/bench/all), PPC cross-compile + QEMU\n(all 55 tests pass including cook round-trip at all sizes).\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T22:40:57Z",
          "tree_id": "fdbfa6516f9c5399c4e460317e9ce3cdc2454e2b",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/2f0ac6a6fd84881879c4eda7104028df62d15b5c"
        },
        "date": 1772146185334,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8209,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.6683,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6574,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 657.938,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2125.22,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1312.21,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3443.44,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.7783,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.714,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 267.361,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 446.496,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.014,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 107.942,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 465.134,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 687.732,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65938,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9338,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.345,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.68,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66081,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7788,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 108.721,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.249,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 156.779,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.642,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 290.144,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.612,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.4362,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.0731,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 167.756,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.723,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.261,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 197.738,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 70.4604,
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
        "date": 1772148358488,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2381,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8214,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.6683,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6326,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 650.186,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2140.93,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 2024.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 5389.24,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 30.7435,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.7675,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 265.857,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 444.989,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.5638,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 107.957,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 464.685,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 688.749,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65812,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.044,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.869,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.695,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65761,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 15.8504,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 108.675,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.268,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 155.909,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.883,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 289.637,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 351.769,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.5682,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.2523,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 167.644,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 225.025,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 196.776,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 183.288,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.6842,
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
          "id": "fbdbbb89db0848b8dbff5579f1962fd79a2c36f7",
          "message": "Add cross-architecture interop tests with MIPS and RISC-V support\n\nExpand CI build matrix from 3 to 5 architectures (add MIPS big-endian\nand RISC-V 64) and add a new interop job that verifies data integrity\nacross 8 arch pairs x 3 configs (24 tests total) via QEMU-user.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T22:23:16Z",
          "tree_id": "5b043bc97a6b182c7855dad5f286636b5f32f445",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/fbdbbb89db0848b8dbff5579f1962fd79a2c36f7"
        },
        "date": 1772231260946,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.1906,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8113,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.6872,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6435,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 649.528,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2129.13,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1314.88,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3481.06,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.7469,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.5548,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 266.356,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 444.257,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.7685,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 108.798,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 465.01,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 688.918,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.66633,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9215,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.717,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.609,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65728,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7618,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 108.649,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.704,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 157.785,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 172.179,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 292.781,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 355.23,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.4788,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.4627,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 167.948,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 231.612,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.175,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 198.448,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 70.1463,
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
          "id": "1f22e31c2d9c801c7b0e6848809c390f9b9e869c",
          "message": "Fix __BYTE_ORDER redefinition warning on musl toolchains\n\nGuard the __BYTE_ORDER define with #ifndef so it doesn't conflict\nwith musl's built-in definition (affects RISC-V and PPC cross builds).\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T22:33:02Z",
          "tree_id": "915c3012fa32d0259ba4435e0fccab4e419e31a1",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/1f22e31c2d9c801c7b0e6848809c390f9b9e869c"
        },
        "date": 1772231752784,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2289,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8292,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.3548,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.8264,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 1076.54,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 3469.96,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 2041.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 5422.22,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 19.0372,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.2933,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 266.833,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 449.576,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.8274,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 107.691,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 465.936,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 686.271,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65996,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9426,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.682,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.62,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.70684,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.9362,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.543,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.337,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 157.281,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.658,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 289.43,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.225,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.4941,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.1822,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 167.864,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.776,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.082,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 196.866,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.7477,
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
        "date": 1772231969371,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.1892,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8203,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.0919,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6283,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 653.847,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2126.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1319.45,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3529.73,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.7753,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.4898,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 266.88,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 445.538,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.7789,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 107.817,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 466.211,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 687.213,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.65912,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.9444,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.707,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.704,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65903,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7624,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 108.797,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 169.546,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 241.262,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 258.793,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 305.491,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.241,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.4294,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.2965,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 167.876,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.991,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.278,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 197.894,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.7849,
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
        "date": 1772233709027,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2316,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8742,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.6083,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.9892,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 655.566,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2135.07,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1307.27,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3620.96,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 23.1747,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 76.2507,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 277.982,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 459.945,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.7527,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 107.851,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 464.955,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 686.945,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.66556,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.1058,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.341,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.686,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.6574,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7778,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 108.953,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.672,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 157.938,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.374,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 290.656,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 352.663,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.4828,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.5338,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 167.842,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 232.624,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.192,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 199.703,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.7221,
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
        "date": 1772234062927,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2023,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8197,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.4821,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6205,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 650.889,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2152.56,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1311.02,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3448.77,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.7541,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.3814,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 266.395,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 444.717,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.2357,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 108.456,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 466.618,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 693.335,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.66646,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.0752,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.913,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.798,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.68959,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7646,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 108.704,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.692,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 156.035,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 170.837,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 290.864,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 351.124,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.5109,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.2804,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 170.95,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 232.805,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.165,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 198.621,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.7628,
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
        "date": 1772235851754,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2123,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8346,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.3027,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6219,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 648.498,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2140.09,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1319.34,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3421.91,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.7113,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.3036,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 267.155,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 444.885,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.9136,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 108.331,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 465.75,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 686.608,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.67699,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.016,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.925,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.378,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.6753,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.9141,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 108.973,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.31,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 156.473,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 171.397,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 290.05,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 351.464,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.4794,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.1712,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 167.75,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.773,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.258,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 197.553,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.7877,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}