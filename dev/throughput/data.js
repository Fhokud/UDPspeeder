window.BENCHMARK_DATA = {
  "lastUpdate": 1772233958523,
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
        "date": 1772076937826,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 974.9,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 629.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 597.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 338,
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
          "id": "7b8b1ee1262d8e74b82fe4e399ce5648482ff68c",
          "message": "Document io_uring optimization: +27% throughput over recvfrom\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T03:54:36Z",
          "tree_id": "1de678b09b148fa0cc17d3c92f04db9d40086e3a",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/7b8b1ee1262d8e74b82fe4e399ce5648482ff68c"
        },
        "date": 1772078419943,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 975.4,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 635.5,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 632.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 348,
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
          "id": "a563c5e2f7ece94379823cf5d98057b441788601",
          "message": "Batch FEC output sends with sendmmsg to reduce syscall overhead\n\nReplace N individual sendto() calls per FEC batch with a single\nsendmmsg() syscall. Adds my_send_batch() and delay_send_batch()\nthat cook all packets then send via one kernel transition.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T17:39:58Z",
          "tree_id": "59afc3de9bb30f24a15d7892e051b44784c6a0e9",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/a563c5e2f7ece94379823cf5d98057b441788601"
        },
        "date": 1772127951912,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1498.6,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 1088.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 891.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 499.9,
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
          "id": "de1d99f5afd6eacb8ecfdbaee10ffaf5cc15238f",
          "message": "Replace std::map with flat array in FEC decode hot path\n\nfec_group_t::group_mp was a std::map<int,int> (red-black tree) used\nfor shard indices 0..254. Replace with a flat int[256] array for O(1)\nlookup/insert and zero heap allocation per shard. Also cache mp[seq]\nreference to avoid repeated unordered_map lookups.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T18:27:34Z",
          "tree_id": "01d0029b1dcd29a81a3b58a81b646d08ce0e17c2",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/de1d99f5afd6eacb8ecfdbaee10ffaf5cc15238f"
        },
        "date": 1772130799231,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 973.1,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 652.5,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 649.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 356.1,
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
          "id": "fd7c55514d3c2d3eedf285d3813b9f2e27d95ef5",
          "message": "Zero-copy io_uring recv: eliminate per-packet memcpy for conv header\n\nReserve 4-byte headroom (URING_RECV_HEADROOM) before each provided\nbuffer so callers can write the conv header in-place instead of\ncopying the entire payload to a stack buffer.\n\n- Buffer registration offsets by +4 bytes, reducing usable size by 4\n- recvmsg path (CLIENT_LOCAL): 140+ bytes of natural headroom from\n  the recvmsg_out header + sockaddr area, plus the 4-byte offset\n- recv path (SERVER_REMOTE): 4-byte headroom from buffer offset\n- Both paths now use recv_buf.data - sizeof(u32_t) directly\n\nSaves ~1400-byte memcpy per packet on the io_uring encode path.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T19:17:16Z",
          "tree_id": "b29764feb707a9b1bcbcdd0a2d2301dab17bb819",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/fd7c55514d3c2d3eedf285d3813b9f2e27d95ef5"
        },
        "date": 1772133821697,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 962.8,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 677.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 617.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 367.1,
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
          "id": "f9bb47809087491b6cc59c23def7a0f57f9abacc",
          "message": "Replace anti_replay unordered_map with direct-mapped table\n\nThe old anti_replay_t used an unordered_map (90K buckets, ~2MB scattered)\nplus a 240KB ring buffer — 1-3 hash lookups per incoming FEC shard.\n\nReplace with a u32_t[32768] direct-mapped table (128KB contiguous):\n- is_vaild: single array access + compare (~3 ns vs ~30-100 ns)\n- set_invaild: single array write (~2 ns vs ~100-200 ns)\n- No hash function, no pointer chasing, fits in L2 cache\n- Effective window ~32K groups, comparable to old 30K ring buffer\n- Old entries naturally evicted by new seqs mapping to same slot\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T19:28:30Z",
          "tree_id": "b7f57e0ae80f2457a27174434da1bcd4efa93a24",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/f9bb47809087491b6cc59c23def7a0f57f9abacc"
        },
        "date": 1772134553743,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1517,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 1082.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 860.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 509.1,
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
          "id": "a0e8d1fb0e1574250fa43dc4c48894d684c064f5",
          "message": "Replace fec_group unordered_map with direct-mapped flat table\n\nReplace unordered_map<u32_t, fec_group_t> in fec_decode_manager with a\npre-allocated flat array indexed by seq & mask. Eliminates per-group\nmalloc/free (~50K allocs/sec) and reduces group init from 1KB memset\n(shard_idx[256]) to 32-byte bitmap clear.\n\nKey changes:\n- fec_group_t: add seq field, bitmap-based shard tracking (has_shard/set_shard)\n- group_table: heap-allocated array, size = next_pow2(fec_buff_num * 2)\n- Direct-mapped lookup: group_table[seq & mask], safe because monotonic\n  seqs guarantee no two concurrent groups collide when table > max groups\n- Per-shard cost: array index + compare vs hash + pointer chase\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T20:58:21Z",
          "tree_id": "b71d634c4f64c273a1eface207c704377c08edc7",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/a0e8d1fb0e1574250fa43dc4c48894d684c064f5"
        },
        "date": 1772139859504,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 941.9,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 656.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 637.8,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 363.5,
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
          "id": "6044a173b081b34162b8051b262fea2b80bd39d0",
          "message": "Update OPTIMIZATION.md with full optimization series results\n\nDocument optimizations 9-13 (sendmmsg batching, flat decode arrays,\nzero-copy recv, anti-replay table, flat group table with bitmap).\nAdd end-to-end throughput results (+48-76% no-fec, +81-113% fec-20:10\nvs baseline). Analyze diminishing returns and remaining architectural\nmemcpy bottleneck.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T21:14:15Z",
          "tree_id": "34aba49f1c6613fb10d2afd7d87569a48c47da02",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/6044a173b081b34162b8051b262fea2b80bd39d0"
        },
        "date": 1772140808695,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 943.9,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 645.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 640.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 358,
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
          "id": "2f0ac6a6fd84881879c4eda7104028df62d15b5c",
          "message": "Add PowerPC e500v2 SPE support for XOR cook pipeline\n\n- New xor_spe.S: SPE assembly (evldd/evxor/evstdd) for 8-byte XOR,\n  4x unrolled main loop (32 bytes/iter), with alignment handling\n  and tile wrap-around. Uses %r prefix and addic for r0 correctness.\n\n- packet_cook.cpp: HAVE_PPC_SPE dispatch tier (COOK_VEC_WIDTH=8),\n  word-width generic fallback for all non-x86/ARM platforms,\n  tile buffer padding to handle SPE cross-boundary loads.\n\n- makefile: SPE=1 flag sets -DHAVE_PPC_SPE -Wa,-mspe for both\n  FLAGS and BENCH_FLAGS. xor_spe.S added to all source lists.\n\n- CI: PowerPC matrix entry with OpenWrt 25.12.0-rc5 mpc85xx/p1010\n  toolchain, qemu-ppc-static -cpu e500v2 tests, QEMU benchmarks,\n  separate PPC benchmark dashboard. Also adds QEMU tests for aarch64.\n\nTested: native x86 (make test/bench/all), PPC cross-compile + QEMU\n(all 55 tests pass including cook round-trip at all sizes).\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T22:40:57Z",
          "tree_id": "fdbfa6516f9c5399c4e460317e9ce3cdc2454e2b",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/2f0ac6a6fd84881879c4eda7104028df62d15b5c"
        },
        "date": 1772146443766,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 952.5,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 652.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 616.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 360.5,
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
          "id": "2eac606992b16593e75795ff087636323ff36959",
          "message": "Document PPC e500v2 results and cross-architecture notes\n\n- Section 14: SPE XOR assembly, QEMU benchmarks, gotchas\n- Cross-architecture notes: x86_64, ARMv8, e500v2, MIPS, RISC-V\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-26T23:24:02Z",
          "tree_id": "29e0e55a84cdf4de6adce48949797967ee895e78",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/2eac606992b16593e75795ff087636323ff36959"
        },
        "date": 1772148613427,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 975.5,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 660.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 644.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 366,
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
          "id": "fbdbbb89db0848b8dbff5579f1962fd79a2c36f7",
          "message": "Add cross-architecture interop tests with MIPS and RISC-V support\n\nExpand CI build matrix from 3 to 5 architectures (add MIPS big-endian\nand RISC-V 64) and add a new interop job that verifies data integrity\nacross 8 arch pairs x 3 configs (24 tests total) via QEMU-user.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T22:23:16Z",
          "tree_id": "5b043bc97a6b182c7855dad5f286636b5f32f445",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/fbdbbb89db0848b8dbff5579f1962fd79a2c36f7"
        },
        "date": 1772231513989,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1517.3,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 1063.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 866.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 509.9,
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
          "id": "1f22e31c2d9c801c7b0e6848809c390f9b9e869c",
          "message": "Fix __BYTE_ORDER redefinition warning on musl toolchains\n\nGuard the __BYTE_ORDER define with #ifndef so it doesn't conflict\nwith musl's built-in definition (affects RISC-V and PPC cross builds).\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T22:33:02Z",
          "tree_id": "915c3012fa32d0259ba4435e0fccab4e419e31a1",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/1f22e31c2d9c801c7b0e6848809c390f9b9e869c"
        },
        "date": 1772231998458,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 974.8,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 668.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 608.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 364.4,
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
          "id": "ec732d11541bd3c884725b61fafcfaf0889a6ad1",
          "message": "Add -lgcc_eh to cross targets for musl static linking\n\nFixes undefined reference to _Unwind_Resume when statically linking\nwith musl-based OpenWrt toolchains (RISC-V, PowerPC).\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T22:37:56Z",
          "tree_id": "b118fc01bc6dd515f81efca70773415783f79a4b",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/ec732d11541bd3c884725b61fafcfaf0889a6ad1"
        },
        "date": 1772232218125,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 977.9,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 679.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 638.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 363.2,
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
          "id": "ba80f8792a0d7ae10c0860054fabce417bf508e4",
          "message": "Auto-dump tunnel logs on interop test failure\n\nCaptures server/client stderr at log-level 4 (info) to temp files\nand prints last 80 lines on failure. Helps diagnose cross-arch\nissues like the PPC+FEC failure without manual re-runs.\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-27T23:05:36Z",
          "tree_id": "0a08614e654d6061c32066c79551611350616a2c",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/ba80f8792a0d7ae10c0860054fabce417bf508e4"
        },
        "date": 1772233958039,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 964.6,
            "unit": "Mbps"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 681.8,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 593.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 348.8,
            "unit": "Mbps"
          }
        ]
      }
    ]
  }
}