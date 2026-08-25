#!/usr/bin/env bash
# Publishing needs the private slide sources and therefore lives in fmm-lmu.
set -euo pipefail
publisher="../publish/deploy.sh"
if [[ -x "$publisher" ]]; then
  exec "$publisher" "$@"
fi
echo "ERROR: deploy from the parent fmm-lmu checkout with publish/deploy.sh" >&2
exit 1
