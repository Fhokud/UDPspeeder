window.BENCHMARK_DATA = {
  "lastUpdate": 1772146145827,
  "repoUrl": "https://github.com/slartibardfast/UDPspeeder",
  "entries": {
    "UDPspeeder Benchmarks (PowerPC e500v2 via QEMU) — Baseline": [
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
        "date": 1772146145536,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.628,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 440.241,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1672.53,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2448.73,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 54350.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 124598,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 44261.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 169777,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 128.434,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 452.729,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1748.5,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2606.44,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 107.501,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 332.978,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1236.56,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1793.51,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 113.071,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 336.448,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1235.48,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1798.38,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}