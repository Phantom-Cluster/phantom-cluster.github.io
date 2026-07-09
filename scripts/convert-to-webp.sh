#!/usr/bin/env bash
# Batch converts all PNG/JPG in static/ to WebP at quality 85
# Prints before/after size for each file. Does NOT delete originals.

set -euo pipefail
STATIC_DIR="$(dirname "$0")/../static"
TOTAL_BEFORE=0
TOTAL_AFTER=0

echo "── Converting images to WebP (quality 85) ──────────────────"

while IFS= read -r -d '' src; do
  ext="${src##*.}"
  webp="${src%.*}.webp"

  # Skip if webp already exists and is newer
  if [ -f "$webp" ] && [ "$webp" -nt "$src" ]; then
    echo "  SKIP (already converted): $webp"
    continue
  fi

  before=$(stat -f%z "$src" 2>/dev/null || stat -c%s "$src")
  ffmpeg -i "$src" -c:v libwebp -quality 85 -y "$webp" 2>/dev/null
  after=$(stat -f%z "$webp" 2>/dev/null || stat -c%s "$webp")

  saved=$(( before - after ))
  pct=$(( saved * 100 / before ))
  echo "  ${ext^^} → WebP  $(( before / 1024 ))KB → $(( after / 1024 ))KB  (-${pct}%)  $(basename "$src")"

  TOTAL_BEFORE=$(( TOTAL_BEFORE + before ))
  TOTAL_AFTER=$(( TOTAL_AFTER + after ))
done < <(find "$STATIC_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0)

SAVED=$(( TOTAL_BEFORE - TOTAL_AFTER ))
echo ""
echo "── Summary ─────────────────────────────────────────────────"
echo "  Before : $(( TOTAL_BEFORE / 1024 / 1024 )) MB"
echo "  After  : $(( TOTAL_AFTER  / 1024 / 1024 )) MB"
echo "  Saved  : $(( SAVED        / 1024 / 1024 )) MB"
echo ""
echo "Next: run  bash scripts/update-refs.sh  to update src paths in Svelte files."
