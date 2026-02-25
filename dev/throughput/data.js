window.BENCHMARK_DATA = {
  "lastUpdate": 1772059600939,
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
      }
    ]
  }
}