window.BENCHMARK_DATA = {
  "lastUpdate": 1772043250562,
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
      }
    ]
  }
}