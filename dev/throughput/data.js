window.BENCHMARK_DATA = {
  "lastUpdate": 1772042071140,
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
          "id": "e080e0f5bcb43d9534b15adc3aa3b1fc8a6bb0fc",
          "message": "Fix throughput.sh: wait for receiver instead of killing it\n\nThe receiver was being killed before its socket timeout fired,\nso stdout was never flushed to the tmpfile. Now we:\n- Wait for the receiver to exit naturally (2s socket timeout)\n- Kill only tunnel processes after receiver finishes\n- Add debug output to stderr for CI visibility\n- Use sys.stdout.flush() for explicit buffer flush\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-02-25T17:51:21Z",
          "tree_id": "b758505fb44d5804ddf570ec229048bc40de60e0",
          "url": "https://github.com/slartibardfast/UDPspeeder/commit/e080e0f5bcb43d9534b15adc3aa3b1fc8a6bb0fc"
        },
        "date": 1772042070266,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 77,
            "unit": "MB/s"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 54.8,
            "unit": "MB/s"
          }
        ]
      }
    ]
  }
}