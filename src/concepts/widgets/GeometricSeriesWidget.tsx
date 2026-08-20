/**
 * Konzept-Widget `geometric-series`.
 *
 * DIE EINE EINSICHT: Die Partialsummen der geometrischen Reihe pendeln sich
 * genau dann ein, wenn |r| < 1; ab |r| = 1 klingen die Terme nicht mehr ab und
 * die Punktfolge läuft davon. Die Grenze liegt nicht „ungefähr“ bei 1, sondern
 * exakt dort.
 *
 * FARBROLLEN: blau = die Partialsummen Sₖ; rot = der Grenzwert 1/(1−r), der
 * nur im konvergenten Fall existiert. Achsen, Ticks und Beschriftungen aus den
 * Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   S₁₅(0,5) = Σ_{k=0}^{15} 0,5^k = 2 − 2⁻¹⁵ = 1,999969…, Grenzwert 1/(1−r) = 2.
 *   S₁₅(1,2) = (1,2¹⁶ − 1)/0,2 = 87,442 — der Divergenzfall ist auf dem
 *   0,05-Raster erreichbar, ebenso r = 1 und r = −1 (beide divergent).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, fmtTick, niceTicks, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const W = 300;
const H = 170;
const PAD_L = 34;
const PAD_R = 8;
const PAD_T = 10;
const PAD_B = 26;
const K_MAX = 15;

export function GeometricSumWidget() {
  const [r, setR] = useState(0.5);
  let s = 0;
  const sums = Array.from({ length: K_MAX + 1 }, (_, k) => (s += r ** k));
  const conv = Math.abs(r) < 1;
  const grenz = conv ? 1 / (1 - r) : 0;
  const lo = Math.min(0, ...sums, grenz) - 0.3;
  const hi = Math.max(1, ...sums, grenz) + 0.3;
  const y = (v: number) => PAD_T + (1 - (v - lo) / (hi - lo)) * (H - PAD_T - PAD_B);
  const x = (k: number) => PAD_L + (k / K_MAX) * (W - PAD_L - PAD_R);
  const ticks = niceTicks(lo, hi, 4);
  const schritt = ticks.length > 1 ? ticks[1] - ticks[0] : undefined;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Schieben wir r über 1 hinaus und beobachten wir die Partialsummen.</Aufgabe>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label={`Die Partialsummen von Σ rᵏ für r = ${fmtDe(r, 2)}; die Reihe ${conv ? "konvergiert" : "divergiert"}.`}
      >
        {ticks.map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(t)}
              y2={y(t)}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1 : 0.6}
            />
            <text x={PAD_L - 4} y={y(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, schritt)}
            </text>
          </g>
        ))}
        {[0, 5, 10, 15].map((k) => (
          <g key={`x${k}`}>
            <line
              x1={x(k)}
              y1={H - PAD_B}
              x2={x(k)}
              y2={H - PAD_B + 4}
              stroke="var(--w-axis)"
            />
            <text
              x={x(k)}
              y={H - PAD_B + 14}
              textAnchor="middle"
              fontSize={9}
              fill="var(--w-muted)"
            >
              {k}
            </text>
          </g>
        ))}
        <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="var(--w-axis)" />
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="var(--w-axis)" />
        <text x={W - PAD_R} y={H - 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          k
        </text>
        <text x={PAD_L - 4} y={PAD_T + 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          Sₖ
        </text>
        {conv && (
          <>
            <line
              x1={PAD_L}
              y1={y(grenz)}
              x2={W - PAD_R}
              y2={y(grenz)}
              stroke={FMM_COLORS.rot}
              strokeDasharray="4 3"
            />
            <text
              x={W - PAD_R - 2}
              y={y(grenz) - 4}
              textAnchor="end"
              fontSize={9}
              fill={FMM_COLORS.rot}
            >
              1/(1−r) = {fmtDe(grenz, 2)}
            </text>
          </>
        )}
        {sums.map((v, k) => (
          <circle key={k} cx={x(k)} cy={y(v)} r="3" fill={FMM_COLORS.blau} />
        ))}
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: die Partialsummen Sₖ = r⁰ + r¹ + … + rᵏ; Rot: der Grenzwert 1/(1−r).
      </p>
      <Slider label="Quotient r" value={r} onChange={setR} min={-1.2} max={1.2} step={0.05} />
      <Verdikt kind={conv ? "ok" : "fail"}>
        {conv
          ? `|r| = ${fmtDe(Math.abs(r), 2)} < 1: die Punkte legen sich auf die rote Linie. S₁₅ = ${fmtDe(sums[K_MAX], 5)} liegt nur noch ${fmtDe(Math.abs(grenz - sums[K_MAX]), 5)} vom Grenzwert ${fmtDe(grenz, 3)} entfernt.`
          : `|r| = ${fmtDe(Math.abs(r), 2)} ≥ 1: die Terme rᵏ klingen nicht ab, S₁₅ = ${fmtDe(sums[K_MAX], 2)}. Es gibt keinen Grenzwert, 1/(1−r) ist hier bedeutungslos.`}
      </Verdikt>
    </div>
  );
}
