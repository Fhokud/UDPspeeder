#!/bin/bash
# bench/interop.sh — Cross-architecture interop test
#
# Runs a UDPspeeder tunnel between two (possibly different-arch) binaries
# and verifies data integrity. Both binaries can be prefixed with QEMU.
#
# Usage: ./bench/interop.sh --server-cmd CMD --client-cmd CMD [options]
#   --server-cmd CMD   Command to run server (may include QEMU prefix)
#   --client-cmd CMD   Command to run client (may include QEMU prefix)
#   --fec X:Y          FEC parameter (default: disabled)
#   --disable-fec      Explicitly disable FEC (default)
#   --key KEY          Encryption key
#   --packets N        Number of packets to send (default: 200)
#   --label LABEL      Label for output (default: "interop")

set -euo pipefail

SERVER_CMD=""
CLIENT_CMD=""
FEC_ARGS="--disable-fec"
KEY_ARGS=""
PACKETS=200
LABEL="interop"
LOG_LEVEL=4

while [[ $# -gt 0 ]]; do
    case "$1" in
        --server-cmd) SERVER_CMD="$2"; shift 2 ;;
        --client-cmd) CLIENT_CMD="$2"; shift 2 ;;
        --fec) FEC_ARGS="-f $2"; shift 2 ;;
        --disable-fec) FEC_ARGS="--disable-fec"; shift ;;
        --key) KEY_ARGS="-k $2"; shift 2 ;;
        --packets) PACKETS="$2"; shift 2 ;;
        --label) LABEL="$2"; shift 2 ;;
        --log-level) LOG_LEVEL="$2"; shift 2 ;;
        *) echo "Unknown option: $1" >&2; exit 1 ;;
    esac
done

if [[ -z "$SERVER_CMD" || -z "$CLIENT_CMD" ]]; then
    echo "Error: --server-cmd and --client-cmd are required" >&2
    exit 1
fi

PORT_TUNNEL=20010
PORT_APP=20011
PORT_CLIENT=20012

RECV_RESULT=$(mktemp)
SERVER_LOG=$(mktemp)
CLIENT_LOG=$(mktemp)

cleanup() {
    local pids
    pids=$(jobs -p 2>/dev/null) || true
    if [[ -n "$pids" ]]; then
        kill $pids 2>/dev/null || true
        wait $pids 2>/dev/null || true
    fi
    rm -f "$RECV_RESULT" "$SERVER_LOG" "$CLIENT_LOG"
}
trap cleanup EXIT

dump_logs() {
    echo "  --- SERVER LOG (last 80 lines) ---" >&2
    tail -80 "$SERVER_LOG" >&2 2>/dev/null || true
    echo "  --- CLIENT LOG (last 80 lines) ---" >&2
    tail -80 "$CLIENT_LOG" >&2 2>/dev/null || true
    echo "  --- END LOGS ---" >&2
}

# Receiver: validate each packet's content
# Packet format: 4-byte big-endian seq + 1396 bytes of (seq & 0xFF)
python3 -c "
import socket, struct, sys

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
sock.bind(('127.0.0.1', $PORT_APP))
sock.settimeout(10)

valid = 0
invalid = 0

try:
    while True:
        data = sock.recv(65535)
        sock.settimeout(3)  # shorter timeout after first packet
        if len(data) < 4:
            invalid += 1
            continue
        seq = struct.unpack('>I', data[:4])[0]
        fill = seq & 0xFF
        expected = data[:4] + bytes([fill]) * (len(data) - 4)
        if data == expected:
            valid += 1
        else:
            invalid += 1
            sys.stderr.write('CORRUPT seq=%d len=%d\n' % (seq, len(data)))
            sys.stderr.flush()
except socket.timeout:
    pass

print('%d %d' % (valid, invalid))
" > "$RECV_RESULT" 2>&1 &
RECV_PID=$!

# Start tunnel (io_uring disabled — QEMU can't translate those syscalls;
# GSO disabled — QEMU user-mode doesn't byte-swap UDP_SEGMENT cmsg data,
# so big-endian guests write a swapped segment size that the host kernel
# misinterprets, sending one giant packet instead of N segments)
UDPSPEEDER_NO_URING=1 UDPSPEEDER_NO_GSO=1 $SERVER_CMD \
    -s -l 127.0.0.1:$PORT_TUNNEL -r 127.0.0.1:$PORT_APP \
    $FEC_ARGS $KEY_ARGS --log-level $LOG_LEVEL >"$SERVER_LOG" 2>&1 &

UDPSPEEDER_NO_URING=1 UDPSPEEDER_NO_GSO=1 $CLIENT_CMD \
    -c -l 127.0.0.1:$PORT_CLIENT -r 127.0.0.1:$PORT_TUNNEL \
    $FEC_ARGS $KEY_ARGS --log-level $LOG_LEVEL >"$CLIENT_LOG" 2>&1 &

sleep 2  # let QEMU-emulated binaries start

# Sender: N packets, each 1400 bytes with verifiable content
python3 -c "
import socket, struct, time

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
for seq in range($PACKETS):
    header = struct.pack('>I', seq)
    fill = bytes([seq & 0xFF]) * 1396
    sock.sendto(header + fill, ('127.0.0.1', $PORT_CLIENT))
    time.sleep(0.001)
"

echo "  [$LABEL] sender done ($PACKETS packets), waiting for receiver..." >&2

wait $RECV_PID 2>/dev/null || true

# Parse results
RESULT=$(cat "$RECV_RESULT")

VALID=$(echo "$RESULT" | tail -1 | awk '{print $1}')
INVALID=$(echo "$RESULT" | tail -1 | awk '{print $2}')
VALID=${VALID:-0}
INVALID=${INVALID:-0}

echo "  [$LABEL] valid=$VALID invalid=$INVALID sent=$PACKETS" >&2

if [[ "$INVALID" -ne 0 ]]; then
    echo "FAIL [$LABEL]: $INVALID corrupted packets" >&2
    dump_logs
    exit 1
fi

if [[ "$VALID" -eq 0 ]]; then
    echo "FAIL [$LABEL]: no packets received" >&2
    dump_logs
    exit 1
fi

MIN_EXPECTED=$(( PACKETS / 2 ))
if [[ "$VALID" -lt "$MIN_EXPECTED" ]]; then
    echo "FAIL [$LABEL]: only $VALID/$PACKETS packets (expected >=$MIN_EXPECTED)" >&2
    dump_logs
    exit 1
fi

echo "PASS [$LABEL]: $VALID/$PACKETS packets, 0 corrupt"
