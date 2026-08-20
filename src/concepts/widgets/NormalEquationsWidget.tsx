/**
 * Konzept-Widget `normal-equations`.
 *
 * DIE EINE EINSICHT: Das Residuum wird genau dann am kürzesten, wenn es
 * senkrecht auf dem Spaltenraum steht. Die Normalengleichung ist nichts anderes
 * als diese Rechtwinkligkeit, aufgeschrieben als aᵀr = 0.
 *
 * FARBROLLEN: blau = b; orange = die Näherung x·a im Spaltenraum; rot = das
 * Residuum r = b − x·a; grün = die Winkelmarke, die den Treffer bestätigt.
 * Die Gerade span{a} bleibt neutral.
 *
 * PROVENIENZ: Rechenkern und die bewusst isotrope Skala (S Pixel pro Einheit,
 * damit der rechte Winkel als rechter Winkel erscheint) aus der Vorfassung
 * (Stand 2026-08-19); Achsen mit Ticks, Themenfarben und die Anordnung
 * Regler-unter-Grafik sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * a = (2 | 1), b = (1 | 2) ⇒ x* = aᵀb/aᵀa = 4/5 = 0,8 exakt; entlang der Geraden
 * gilt aᵀr(x) = 5·(0,8 − x), im Startzustand x = 0,3 also aᵀr = 2,50. Das
 * kleinste Residuum hat Länge ‖r(x*)‖ = 3/√5 = 1,3416.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, W_MUTED, fmtDe, fmtTick } from "../../lib";

const S = 60; // Pixel je Einheit — isotrop, sonst lügt der rechte Winkel
const X0 = -0.9;
const X1 = 3.7;
const Y0 = -0.7;
const Y1 = 2.5;
const W = (X1 - X0) * S; // 276
const H = (Y1 - Y0) * S; // 192
const PAD_L = 24;
const PAD_R = 10;
const PAD_T = 8;
const PAD_B = 20;

export function ProjectionWidget() {
  const a: [number, number] = [2, 1];
  const b: [number, number] = [1, 2];
  const opt = (a[0] * b[0] + a[1] * b[1]) / (a[0] * a[0] + a[1] * a[1]); // 4/5
  const [x, setX] = useState(0.3);

  const p: [number, number] = [x * a[0], x * a[1]];
  const r: [number, number] = [b[0] - p[0], b[1] - p[1]];
  const aTr = a[0] * r[0] + a[1] * r[1];
  const rNorm = Math.hypot(r[0], r[1]);

  const px = (v: number) => (v - X0) * S;
  const py = (v: number) => H - (v - Y0) * S;

  // kleines Winkelquadrat bei p, ausgerichtet an a und r (nur wenn ⊥)
  const na = Math.hypot(a[0], a[1]);
  const ua: [number, number] = [a[0] / na, a[1] / na];
  const ur: [number, number] = rNorm > 1e-9 ? [r[0] / rNorm, r[1] / rNorm] : [-ua[1], ua[0]];
  const q = 0.16;
  const treffer = Math.abs(aTr) < 0.08;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Schieben wir x, bis der grüne rechte Winkel erscheint.</Aufgabe>
      <svg
        viewBox={`${-PAD_L} ${-PAD_T} ${W + PAD_L + PAD_R} ${H + PAD_T + PAD_B}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label={
          treffer
            ? "Projektion von b auf den Spann der Spalte a; das Residuum steht senkrecht auf der Geraden."
            : `Projektion von b auf den Spann der Spalte a; das Residuum schließt noch keinen rechten Winkel ein, a hoch T mal r ist ${fmtDe(aTr)}.`
        }
      >
        <rect
          x={-PAD_L + 0.5}
          y={-PAD_T + 0.5}
          width={W + PAD_L + PAD_R - 1}
          height={H + PAD_T + PAD_B - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {/* Achsen mit Ticks */}
        <line x1={px(X0)} y1={py(0)} x2={px(X1)} y2={py(0)} stroke="var(--w-axis)" strokeWidth={1} />
        <line x1={px(0)} y1={py(Y0)} x2={px(0)} y2={py(Y1)} stroke="var(--w-axis)" strokeWidth={1} />
        {[1, 2, 3].map((t) => (
          <g key={`tx${t}`}>
            <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="var(--w-axis)" strokeWidth={1} />
            <text x={px(t)} y={py(0) + 14} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, 1)}
            </text>
          </g>
        ))}
        {[1, 2].map((t) => (
          <g key={`ty${t}`}>
            <line x1={px(0) - 3} y1={py(t)} x2={px(0) + 3} y2={py(t)} stroke="var(--w-axis)" strokeWidth={1} />
            <text x={px(0) - 6} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, 1)}
            </text>
          </g>
        ))}
        <text x={px(X1)} y={py(0) - 5} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x₁
        </text>
        <text x={px(0) + 5} y={py(Y1) + 8} fontSize={9} fill="var(--w-muted)">
          x₂
        </text>
        {/* span{a} */}
        <line
          x1={px(-0.3 * a[0])}
          y1={py(-0.3 * a[1])}
          x2={px(1.8 * a[0])}
          y2={py(1.8 * a[1])}
          stroke="var(--w-grid-strong)"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <text x={px(1.5 * a[0])} y={py(1.5 * a[1]) - 7} fontSize={10} fill="var(--w-text)">
          span&#123;a&#125;
        </text>
        {treffer && (
          <polyline
            points={
              `${px(p[0] + q * ua[0])},${py(p[1] + q * ua[1])} ` +
              `${px(p[0] + q * (ua[0] + ur[0]))},${py(p[1] + q * (ua[1] + ur[1]))} ` +
              `${px(p[0] + q * ur[0])},${py(p[1] + q * ur[1])}`
            }
            fill="none"
            stroke={FMM_COLORS.gruen}
            strokeWidth={2}
          />
        )}
        {/* b */}
        <line x1={px(0)} y1={py(0)} x2={px(b[0])} y2={py(b[1])} stroke={FMM_COLORS.blau} strokeWidth={2} />
        <circle cx={px(b[0])} cy={py(b[1])} r={3.5} fill={FMM_COLORS.blau} />
        <text x={px(b[0]) - 14} y={py(b[1]) - 4} fontSize={11} fill={FMM_COLORS.blau}>
          b
        </text>
        {/* Residuum */}
        <line x1={px(p[0])} y1={py(p[1])} x2={px(b[0])} y2={py(b[1])} stroke={FMM_COLORS.rot} strokeWidth={2} />
        <text
          x={(px(p[0]) + px(b[0])) / 2 + 6}
          y={(py(p[1]) + py(b[1])) / 2}
          fontSize={11}
          fill={FMM_COLORS.rot}
        >
          r
        </text>
        {/* Näherung x·a */}
        <circle cx={px(p[0])} cy={py(p[1])} r={3.5} fill={FMM_COLORS.orange} />
        <text x={px(p[0]) + 5} y={py(p[1]) + 14} fontSize={11} fill={FMM_COLORS.orange}>
          x·a
        </text>
      </svg>
      <Slider
        label="Koeffizient x"
        value={x}
        onChange={setX}
        min={-0.3}
        max={1.6}
        step={0.01}
        accent={FMM_COLORS.orange}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> b ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> Näherung x·a ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Residuum r = b − x·a
      </p>
      <Verdikt kind={treffer ? "ok" : "neutral"}>
        {treffer ? (
          <>
            Treffer: aᵀr = {fmtDe(aTr)}, und das Residuum ist mit ‖r‖ = {fmtDe(rNorm)} so kurz wie
            es überhaupt werden kann. Erst jetzt lesen wir den Lösungskoeffizienten x* ={" "}
            {fmtDe(opt, 1)} ab – genau das steht in der Normalengleichung aᵀa·x = aᵀb.
          </>
        ) : (
          <>
            aᵀr = {fmtDe(aTr)} ≠ 0, das Residuum hat also noch einen Anteil in Richtung a und ist
            mit ‖r‖ = {fmtDe(rNorm)} länger als nötig. Solange dieser Anteil nicht verschwindet,
            lässt sich das Residuum durch Verschieben von x weiter verkürzen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
