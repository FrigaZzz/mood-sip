#!/usr/bin/env bash

# MoodSip App/Web and Server Setup Script
# Installs Python backend (FastAPI+LLMs) & npm frontend in recommended structure.

set -e

echo "---- [1/3] Checking Requirements ----"
if ! command -v python3 &>/dev/null; then
    echo 'ERROR: Python3 not found.'; exit 1;
fi

PYV=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
if [[ $(echo "$PYV < 3.11" | bc -l) == 1 ]]; then
  echo "ERROR: Python 3.11+ is required, found $PYV"
  exit 1
fi

if ! command -v node &>/dev/null || ! command -v npm &>/dev/null; then
    echo 'ERROR: node and/or npm not found (required for webapp).'; exit 1;
fi

echo -e "\n---- [2/3] Setting up Python backend server ----"
cd 1-mood-sip/src/edge_vision_engine

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate

# Prefer uv if installed, else fallback to pip
if command -v uv &>/dev/null; then
    uv pip install -r requirements.txt || uv pip install .
else
    # Use requirements.txt if available, else fallback to pyproject.toml's dependencies
    if [ -f requirements.txt ]; then
        pip install --upgrade pip
        pip install -r requirements.txt
    else
        pip install --upgrade pip
        pip install .
    fi
fi

deactivate
cd ../../../..

echo -e "\n---- [3/3] Setting up Web frontend ----"
cd 1-mood-sip/src/mood-sip-web
npm install
cd ../../../..

echo -e "\n[OK] Setup complete!"
echo "To run the backend:"
echo "  cd 1-mood-sip/src/edge_vision_engine"
echo "  source venv/bin/activate"
echo "  python main.py"
echo
echo "To run the webapp (HTTPS):"
echo "  cd 1-mood-sip/src/mood-sip-web"
echo "  npm run dev:https"
echo ""
echo "To run the webapp (plain HTTP, less secure, Web Bluetooth won't work on production devices):"
echo "  npm run dev"
echo ""
