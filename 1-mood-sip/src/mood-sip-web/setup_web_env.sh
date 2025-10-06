#!/usr/bin/env bash

# MoodSip Web Frontend (React + Vite) Environment Setup Script

set -e

echo "---- [1/2] Checking Node.js and npm presence ----"
if ! command -v node &>/dev/null || ! command -v npm &>/dev/null; then
    echo 'ERROR: Node.js and npm are required. Install them from https://nodejs.org/';
    exit 1
fi

echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"

echo -e "\n---- [2/2] Installing npm dependencies ----"
npm install

echo -e "\n[OK] Setup complete!"
echo "To start the development server (HTTPS, required for Web Bluetooth):"
echo "  npm run dev:https"
echo
echo "To build and preview the production build:"
echo "  npm run build"
echo "  npm run preview"
echo
echo "(If you haven't generated development SSL certificates, see README for steps or use mkcert.)"
