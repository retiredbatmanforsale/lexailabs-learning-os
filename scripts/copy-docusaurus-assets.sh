#!/bin/bash
# Copies Docusaurus build assets into the Next.js public/ directory
# so that /assets/css/*, /assets/js/*, /img/* are served statically.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
BUILD="$ROOT/docusaurus/build"
PUBLIC="$ROOT/public"

if [ ! -d "$BUILD" ]; then
  echo "Error: Docusaurus build directory not found at $BUILD"
  echo "Run 'npm run docs:build' first."
  exit 1
fi

# Copy JS/CSS/image assets (Docusaurus bundles)
mkdir -p "$PUBLIC/assets/css" "$PUBLIC/assets/js" "$PUBLIC/assets/images"
cp -r "$BUILD/assets/css/"* "$PUBLIC/assets/css/" 2>/dev/null
cp -r "$BUILD/assets/js/"* "$PUBLIC/assets/js/" 2>/dev/null
cp -r "$BUILD/assets/images/"* "$PUBLIC/assets/images/" 2>/dev/null

# Copy static images (favicon, logos, etc.)
mkdir -p "$PUBLIC/img"
cp -r "$BUILD/img/"* "$PUBLIC/img/" 2>/dev/null

echo "Docusaurus assets copied to public/"
