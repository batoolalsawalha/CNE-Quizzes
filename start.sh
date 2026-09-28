#!/usr/bin/env bash
# Academic Challenge Platform Launcher for Linux / macOS
cd "$(dirname "$0")"

echo "==================================================="
echo "    Starting Academic Challenge Web Platform"
echo "==================================================="
echo ""

if command -v node >/dev/null 2>&1; then
    echo "Using system Node.js..."
    node server/server.js
else
    echo "ERROR: Node.js is not installed or not in PATH."
    echo "Please install Node.js (https://nodejs.org) to run this application."
    exit 1
fi
