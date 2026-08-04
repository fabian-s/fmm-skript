#!/usr/bin/env bash
# Build and publish dist/ to the gh-pages branch (GitHub Pages).
# Usage: npm run deploy   (from the repo root)
set -euo pipefail
npm run build
tmp=$(mktemp -d)
trap 'git worktree remove --force "$tmp" 2>/dev/null || true' EXIT
git fetch origin gh-pages
git worktree add "$tmp" gh-pages
cp -r dist/. "$tmp"/
touch "$tmp/.nojekyll"
git -C "$tmp" add -A
git -C "$tmp" commit -m "Deploy $(git rev-parse --short HEAD)" || { echo "nothing new to deploy"; exit 0; }
git -C "$tmp" push origin gh-pages
echo "deployed: https://fabian-s.github.io/fmm-skript/"
