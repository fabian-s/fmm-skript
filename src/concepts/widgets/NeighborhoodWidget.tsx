/**
 * Konzept-Widget `neighborhood`.
 *
 * DIE EINE EINSICHT: „lokal" ist keine Eigenschaft der Stelle, sondern eine
 * Eigenschaft des Radius. Dieselbe Stelle x* = 1 ist Minimum-Zeuge, solange die
 * Umgebung klein genug bleibt — und hört auf, es zu sein, sobald der linke Ast
 * hereinragt.
 *
 * FARBROLLEN: blau = f; rot = die Stelle x* und ihr Niveau f(x*); grün =
 * Umgebung, in der f(x) ≥ f(x*) noch überall gilt; orange = Umgebung, in der
 * die Bedingung bereits verletzt ist.
 *
 * PROVENIENZ: Funktion, Scan-Test und Fensterausschnitt aus der Vorfassung
 * (Stand 2026-08-19); Achsen mit Ticks, Themenfarben, Aufgabe und Verdikt sind
 * neu. Der erklärende Absatz steht jetzt in neighborhood.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * f(x) = x⁴/4 + x³/3 − x² hat die kritischen Stellen −2, 0, 1; f(1) = −5/12 =
 * −0,416667 (lokales Minimum), f(0) = 0 (lokales Maximum), f(−2) = −8/3
 * (globales Minimum). Links von x* fällt f erstmals bei x = (−5+√10)/3 =
 * −0,6126 wieder unter f(x*), die Schwelle ist also ε* = (8−√10)/3 = 1,6126;
 * der 400-Punkt-Scan bestätigt das (hält bei ε = 1,60, scheitert bei ε = 1,63).
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, W_MUTED, fmtDe, fmtTick } from "../../lib";

const XSTAR = 1;
const f = (x: number) => (x * x * x * x) / 4 + (x * x * x) / 3 - x * x;
const FSTAR = f(XSTAR); // = −5/12

const B = 300;
const H = 200;
const PAD_L = 30;
const PAD_R = 8;
const PAD_T = 22;
const PAD_B = 26;
const X0 = -2.8;
const X1 = 2.0;
const Y0 = -3.1;
const Y1 = 3.1;

export function NeighborhoodWidget() {
  const [eps, setEps] = useState(0.6);

  const px = (x: number) => PAD_L + ((x - X0) / (X1 - X0)) * (B - PAD_L - PAD_R);
  const py = (y: number) => PAD_T + (1 - (y - Y0) / (Y1 - Y0)) * (H - PAD_T - PAD_B);

  const lo = Math.max(X0, XSTAR - eps);
  const hi = Math.min(X1, XSTAR + eps);

  // Gilt f(x) ≥ f(x*) auf der ganzen Umgebung? (400-Punkt-Scan)
  let haelt = true;
  let tiefste = XSTAR;
  for (let i = 0; i <= 400; i++) {
    const x = lo + ((hi - lo) * i) / 400;
    if (f(x) < f(tiefste)) tiefste = x;
    if (f(x) < FSTAR - 1e-9) haelt = false;
  }

  const kurve = Array.from({ length: 301 }, (_, i) => {
    const x = X0 + ((X1 - X0) * i) / 300;
    return `${px(x).toFixed(1)},${py(Math.max(Y0, Math.min(Y1, f(x)))).toFixed(1)}`;
  }).join(" ");

  const bandFarbe = haelt ? FMM_COLORS.gruen : FMM_COLORS.orange;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Vergrößern wir ε, bis ein tieferer Punkt in die Umgebung rutscht.</Aufgabe>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={
          haelt
            ? `Umgebung mit Radius ${fmtDe(eps, 2)} um x* = 1; f bleibt darin überall über f(x*).`
            : `Umgebung mit Radius ${fmtDe(eps, 2)} um x* = 1; f unterschreitet f(x*) am linken Rand.`
        }
      >
        <rect
          x={0.5}
          y={0.5}
          width={B - 1}
          height={H - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {/* Gitter + Ticks */}
        {[-3, -2, -1, 0, 1, 2, 3].map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={B - PAD_R}
              y1={py(t)}
              y2={py(t)}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, 1)}
            </text>
          </g>
        ))}
        {[-2, -1, 0, 1, 2].map((t) => (
          <g key={`x${t}`}>
            <line
              x1={px(t)}
              x2={px(t)}
              y1={PAD_T}
              y2={H - PAD_B}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={px(t)} y={H - PAD_B + 12} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, 1)}
            </text>
          </g>
        ))}
        <text x={B - PAD_R} y={H - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x
        </text>
        <text x={PAD_L - 4} y={12} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          f
        </text>
        {/* Umgebung */}
        <rect
          x={px(lo)}
          y={PAD_T}
          width={px(hi) - px(lo)}
          height={H - PAD_T - PAD_B}
          fill={bandFarbe}
          opacity={0.18}
        />
        {/* Niveau f(x*) */}
        <line
          x1={PAD_L}
          y1={py(FSTAR)}
          x2={B - PAD_R}
          y2={py(FSTAR)}
          stroke={FMM_COLORS.rot}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <polyline points={kurve} fill="none" stroke={FMM_COLORS.blau} strokeWidth={1.8} />
        <circle cx={px(XSTAR)} cy={py(FSTAR)} r={4} fill={FMM_COLORS.rot} />
        <text x={px(XSTAR) + 6} y={py(FSTAR) + 13} fontSize={10} fill={FMM_COLORS.rot}>
          x*
        </text>
      </svg>
      <Slider
        label="Radius ε"
        value={eps}
        onChange={setEps}
        min={0.1}
        max={2.4}
        step={0.05}
        accent={bandFarbe}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> f(x) = x⁴/4 + x³/3 − x² ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> x* = 1 und das Niveau f(x*) ·{" "}
        <span style={{ color: bandFarbe }}>▮</span> Umgebung (x* − ε, x* + ε)
      </p>
      <Verdikt kind={haelt ? "ok" : "fail"}>
        {haelt ? (
          <>
            Auf ({fmtDe(lo, 2)}; {fmtDe(hi, 2)}) bleibt f überall auf oder über f(x*) ={" "}
            {fmtDe(FSTAR, 3)}. Diese Umgebung bezeugt also das lokale Minimum – mehr verlangt die
            Definition nicht.
          </>
        ) : (
          <>
            Zu weit: bei x = {fmtDe(tiefste, 2)} ist f nur noch {fmtDe(f(tiefste), 3)} und damit
            unter f(x*) = {fmtDe(FSTAR, 3)}. Ab ε = 1,61 ragt der linke Ast herein; jedes kleinere ε
            tut es aber weiterhin, und genau ein solches darf die Definition sich aussuchen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
