#!/usr/bin/env bash
# Baut die Druckfassung des Skripts: MDX -> LaTeX -> PDF.
#
#   bash scripts/pdf/build.sh            # normaler Lauf
#   bash scripts/pdf/build.sh --strict   # Konvertierungswarnungen sind Fehler
#
# Drei xelatex-Laeufe: Inhaltsverzeichnis und die #sec-Querverweise brauchen
# zwei Durchgaenge, der dritte stabilisiert die Seitenzahlen nach dem
# Umbruch, den das fertige Verzeichnis ausloest.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
out="$root/build/pdf"
job=fmm-skript

cd "$root"
node scripts/pdf/mdx-to-latex.mjs --out "$out" "$@"

cd "$out"
for pass in 1 2 3; do
  echo "xelatex Durchgang $pass …"
  if ! xelatex -interaction=nonstopmode -halt-on-error "$job.tex" > "pass$pass.log" 2>&1; then
    echo "xelatex ist in Durchgang $pass gescheitert:" >&2
    grep -nE "^! " -A4 "pass$pass.log" | head -40 >&2
    exit 1
  fi
done

# Ein leeres oder einseitiges PDF sieht wie ein Erfolg aus, wenn man nur den
# Exitcode prueft — deshalb die Seitenzahl gegenpruefen.
pages=$(pdfinfo "$job.pdf" | awk '/^Pages:/{print $2}')
if [[ -z "$pages" || "$pages" -lt 100 ]]; then
  echo "PDF hat nur ${pages:-0} Seiten — das kann nicht stimmen." >&2
  exit 1
fi

undef=$(grep -c "undefined on input line" "pass3.log" || true)
overfull=$(grep -c "^Overfull \\\\hbox" "pass3.log" || true)
shrunk=$(grep -c "FMM-WIDE-MATH" "pass3.log" || true)

echo
echo "fertig: $out/$job.pdf ($pages Seiten)"
echo "  offene Querverweise:    $undef"
echo "  ueberbreite Zeilen:     $overfull"
echo "  geschrumpfte Formeln:   $shrunk"
[[ "$undef" -eq 0 ]] || { echo "  -> siehe: grep 'undefined on input line' $out/pass3.log" ; }
