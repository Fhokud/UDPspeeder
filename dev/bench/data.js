window.BENCHMARK_DATA = {
  "lastUpdate": 1772063059677,
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
      }
    ]
  }
}