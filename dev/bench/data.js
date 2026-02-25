window.BENCHMARK_DATA = {
  "lastUpdate": 1772039377944,
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
      }
    ]
  }
}