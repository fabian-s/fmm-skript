/** Einsicht: Der Rest einer konvergenten Reihe ist sichtbar als Lücke. Farben: blau = Summanden, rot = Rest. Provenienz: Eigenbau. Verifiziert: S_n=2-2^-n, R_n=2^-n, verify-konzepte-C6/infinite-series.mjs (2026-08-19). */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, fmtDe } from "../../lib";
export function PartialSumBar() {
  const [n, setN] = useState(3);
  const part = 2 - 2 ** -n,
    rest = 2 ** -n;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Erhöhen wir n und beobachten wir die verbleibende Lücke.</Aufgabe>
      <svg
        viewBox="0 0 280 55"
        className="max-w-full h-auto"
        role="img"
        aria-label="Partialsummenbalken der geometrischen Reihe."
      >
        <rect x="0" y="12" width={140 * part} height="24" fill={FMM_COLORS.blau} />
        <rect
          x={140 * part}
          y="12"
          width={140 * rest}
          height="24"
          fill={FMM_COLORS.rot}
          fillOpacity=".35"
        />
        <text x={140 * part + 4} y="52" fontSize="10" fill="var(--w-text)">
          Rest Rₙ = {fmtDe(rest, 4)}
        </text>
      </svg>
      <Slider
        label="Summanden n"
        value={n}
        onChange={setN}
        min={1}
        max={12}
        step={1}
        fmt={(v) => fmtDe(v, 0)}
      />
      <Verdikt kind="ok">
        Sₙ = {fmtDe(part, 4)}; die rote Lücke ist genau Rₙ = 2<sup>−{n}</sup>.
      </Verdikt>
    </div>
  );
}
