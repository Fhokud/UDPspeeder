window.BENCHMARK_DATA = {
  "lastUpdate": 1772042353251,
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
        "date": 1772042352215,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 83.8,
            "unit": "MB/s"
          },
          {
            "name": "throughput/fec-20-10",
            "value": 57,
            "unit": "MB/s"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 69.2,
            "unit": "MB/s"
          },
          {
            "name": "baseline/throughput/fec-20-10",
            "value": 37,
            "unit": "MB/s"
          }
        ]
      }
    ]
  }
}