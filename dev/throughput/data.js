window.BENCHMARK_DATA = {
  "lastUpdate": 1772065734289,
  "repoUrl": "https://github.com/slartibardfast/UDPspeeder",
  "entries": {
    "UDPspeeder Throughput": [
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
        "date": 1772043358650,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 668.8,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 453.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 504.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 328.8,
            "unit": "Mbps"
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
        "date": 1772059600499,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 756.1,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 533.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 627.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 353,
            "unit": "Mbps"
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
        "date": 1772063359973,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 0,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 0,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 607.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 362.4,
            "unit": "Mbps"
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
        "date": 1772065733790,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 0,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 0,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 624.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 368,
            "unit": "Mbps"
          }
        ]
      }
    ]
  }
}