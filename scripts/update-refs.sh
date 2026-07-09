#!/usr/bin/env bash
# Updates all .png / .jpg / .jpeg image references to .webp inside src/
# Only touches strings that point at a file that was already converted.

set -euo pipefail
SRC_DIR="$(dirname "$0")/../src"
STATIC_DIR="$(dirname "$0")/../static"

echo "── Updating image references in src/ ───────────────────────"

# Find every Svelte / TS / JS file
while IFS= read -r -d '' file; do
  changed=false

  # Replace .png → .webp  (skip if no webp sibling exists)
  while IFS= read -r match; do
    # match is something like: /videos/Themeisle/Furniture.png
    disk="${STATIC_DIR}${match}"   # absolute path to static file
    webp="${disk%.png}.webp"
    if [ -f "$webp" ]; then
      escaped=$(printf '%s\n' "$match" | sed 's/[[\.*^$()+?{|]/\\&/g')
      new="${match%.png}.webp"
      sed -i '' "s|${escaped}|${new}|g" "$file"
      changed=true
    fi
  done < <(grep -oE '/[^"'"'"' ]+\.png' "$file" || true)

  # Replace .jpg → .webp
  while IFS= read -r match; do
    disk="${STATIC_DIR}${match}"
    webp="${disk%.jpg}.webp"
    if [ -f "$webp" ]; then
      escaped=$(printf '%s\n' "$match" | sed 's/[[\.*^$()+?{|]/\\&/g')
      new="${match%.jpg}.webp"
      sed -i '' "s|${escaped}|${new}|g" "$file"
      changed=true
    fi
  done < <(grep -oE '/[^"'"'"' ]+\.jpg' "$file" || true)

  if $changed; then
    echo "  Updated: $file"
  fi
done < <(find "$SRC_DIR" -type f \( -name "*.svelte" -o -name "*.ts" -o -name "*.js" \) -print0)

echo ""
echo "Done. Verify visually in the browser, then delete original PNGs:"
echo "  find static/ -name '*.png' -delete"
echo "  find static/ -name '*.jpg' -delete"
