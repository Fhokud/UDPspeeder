#!/bin/bash
# bench/throughput_win.sh — Measure Win64 tunnel throughput via WSL2 interop
#
# Uses python.exe (Windows Python) for sender/receiver so all UDP
# traffic stays in the Windows network namespace with the .exe tunnel.
#
# Usage: ./bench/throughput_win.sh <speederv2.exe> [options]
#   --duration N     seconds per iteration (default: 5)
#   --fec X:Y        FEC parameter (default: disabled)
#   --disable-fec    explicitly disable FEC
#   --iterations N   number of runs, reports median (default: 5)

set -euo pipefail

BINARY=""
DURATION=5
FEC_ARGS="--disable-fec"
FEC_LABEL="no-fec"
ITERATIONS=5

while [[ $# -gt 0 ]]; do
    case "$1" in
        --duration) DURATION="$2"; shift 2 ;;
        --fec) FEC_ARGS="-f $2"; FEC_LABEL="fec-${2//:/-}"; shift 2 ;;
        --disable-fec) FEC_ARGS="--disable-fec"; FEC_LABEL="no-fec"; shift ;;
        --iterations) ITERATIONS="$2"; shift 2 ;;
        -*) echo "Unknown option: $1" >&2; exit 1 ;;
        *) BINARY="$1"; shift ;;
    esac
done

if [[ -z "$BINARY" ]]; then
    echo "Usage: $0 <speederv2.exe> [--duration N] [--fec X:Y]" >&2
    exit 1
fi

if ! command -v python.exe &>/dev/null; then
    echo "Error: python.exe (Windows Python) not found in PATH" >&2
    exit 1
fi

# Use 127.0.0.2 for app endpoints to avoid port conflicts with tunnel on 127.0.0.1
PORT_TUNNEL=33000
PORT_APP=33001
PORT_CLIENT=33002

EXE_NAME=$(basename "$BINARY" 2>/dev/null) || true

kill_tunnel() {
    local pids
    pids=$(jobs -p 2>/dev/null) || true
    if [[ -n "$pids" ]]; then
        kill $pids 2>/dev/null || true
        wait $pids 2>/dev/null || true
    fi
    # Kill lingering Windows .exe processes that WSL2 kill doesn't reach
    if [[ -n "$EXE_NAME" ]]; then
        taskkill.exe /F /IM "$EXE_NAME" >/dev/null 2>&1 || true
    fi
    sleep 1
}
trap kill_tunnel EXIT

run_once() {
    local tmpfile
    tmpfile=$(mktemp)
    kill_tunnel

    # Start tunnel (.exe) first — python.exe startup is slow
    $BINARY -s -l 127.0.0.1:$PORT_TUNNEL -r 127.0.0.2:$PORT_APP $FEC_ARGS --log-level 0 >/dev/null 2>&1 &
    local server_pid=$!

    $BINARY -c -l 127.0.0.2:$PORT_CLIENT -r 127.0.0.1:$PORT_TUNNEL $FEC_ARGS --log-level 0 >/dev/null 2>&1 &
    local client_pid=$!

    sleep 1

    # Receiver: Windows Python on 127.0.0.2
    python.exe -c "
import socket, time, sys
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
sock.bind(('127.0.0.2', $PORT_APP))
sock.settimeout(2)
total = 0
start = None
try:
    while True:
        data = sock.recv(65535)
        if start is None:
            start = time.monotonic()
        total += len(data)
except socket.timeout:
    pass
elapsed = time.monotonic() - start if start else 0
result = f'{total} {elapsed:.6f}'
sys.stdout.write(result + '\n')
sys.stdout.flush()
" > "$tmpfile" 2>/dev/null &
    local recv_pid=$!

    sleep 1

    # Sender: Windows Python blasts for DURATION seconds
    python.exe -c "
import socket, time
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
payload = b'\x00' * 1400
end = time.monotonic() + $DURATION
while time.monotonic() < end:
    try:
        sock.sendto(payload, ('127.0.0.2', $PORT_CLIENT))
    except OSError:
        pass
"
    echo "  sender done, waiting for receiver..." >&2

    wait $recv_pid 2>/dev/null || true

    kill $server_pid $client_pid 2>/dev/null || true
    wait $server_pid $client_pid 2>/dev/null || true

    local result bytes elapsed
    result=$(cat "$tmpfile")
    rm -f "$tmpfile"

    bytes=$(echo "$result" | awk '{print $1}')
    elapsed=$(echo "$result" | awk '{print $2}')

    echo "  received $bytes bytes in ${elapsed}s" >&2

    if [[ -z "$bytes" || "$bytes" == "0" ]]; then
        echo "0.0"
        return
    fi

    python3 -c "print(f'{$bytes / $elapsed / 1e6 * 8:.1f}')"
}

# Warmup
echo "  Warmup run..." >&2
run_once > /dev/null

results=()
for i in $(seq 1 "$ITERATIONS"); do
    echo "  Run $i/$ITERATIONS..." >&2
    mbps=$(run_once)
    results+=("$mbps")
    echo "  → $mbps Mbps" >&2
done

IFS=$'\n' sorted=($(printf '%s\n' "${results[@]}" | sort -n)); unset IFS
median_idx=$(( ITERATIONS / 2 ))
median=${sorted[$median_idx]}
median=${median:-0.0}

echo "Throughput ($FEC_LABEL): $median Mbps  [runs: ${results[*]}]"
