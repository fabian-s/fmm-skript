/**
 * Konzept-Widget `trace`.
 *
 * DIE EINE EINSICHT: Spur und Determinante sind die beiden Zahlen, die die
 * Eigenwerte gemeinsam preisgeben — ihre Summe und ihr Produkt. Deshalb bleiben
 * sie stehen, während die Eigenwerte in der Gaußebene wandern, sich treffen und
 * als komplexes Paar von der reellen Achse abheben.
 *
 * FARBROLLEN: orange = die Spur (Summe der Eigenwerte); violett = die
 * Determinante (ihr Produkt); blau = die Eigenwerte in der Gaußebene, wo sie
 * bei negativer Diskriminante spiegelbildlich zur reellen Achse liegen.
 *
 * PROVENIENZ: Rechenkern und Fallunterscheidung aus dem Vorgängerwidget (Stand
 * 2026-08-18); die Gaußebene, das Zahlformat (`fmtDe`) und das Verdikt sind
 * neu, die Ticks auf der imaginären Achse aus dem Re-Audit QA-O1.
 *
 * ACHTUNG: Die Tafel ist bewusst breiter als hoch (200 × 110), Re- und
 * Im-Achse haben deshalb verschiedene Pixelmaßstäbe. Die Ticks auf beiden
 * Achsen sind der einzige verlässliche Weg, Lagen abzulesen; Abstände dürfen
 * nicht über die Achsen hinweg verglichen werden.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV2/TraceWidget.mjs, 2026-08-20):
 *   A = [[3, 1], [1, 3]] (Voreinstellung): tr = 6, det = 8, λ₁ = 4, λ₂ = 2,
 *       Summe 6, Produkt 8 — dieselben Werte wie auf der Konzeptseite;
 *   A = [[0, −1], [1, 0]]: tr = 0, det = 1, λ = ±i, Summe 0, |λ|² = 1;
 *   A = [[2, 1], [0, 2]]: tr = 4, det = 4, λ₁ = λ₂ = 2 (doppelter Eigenwert).
 */
import { useState } from "react";
import { Aufgabe, ConceptLink, FMM_COLORS, M, MatrixInput, Verdikt, fmtDe, fmtTick, niceTicks } from "../../lib";

const B = 200;
const H = 110;

export function TraceWidget() {
  const [m, setM] = useState<number[][]>([
    [3, 1],
    [1, 3],
  ]);
  const [[a, b], [c, d]] = m;
  const tr = a + d;
  const det = a * d - b * c;
  const disc = tr * tr - 4 * det;
  const reell = disc >= 0;
  const re = tr / 2;
  const ab = reell ? Math.sqrt(disc) / 2 : 0;
  const im = reell ? 0 : Math.sqrt(-disc) / 2;
  const punkte: [number, number][] = reell ? [[re + ab, 0], [re - ab, 0]] : [[re, im], [re, -im]];

  // Fenster der Gaußebene: alle Eigenwerte plus Rand
  const grenze = Math.max(2, 1.25 * Math.max(...punkte.map(([x, y]) => Math.max(Math.abs(x), Math.abs(y)))));
  const px = (x: number) => B / 2 + (x / grenze) * (B / 2 - 12);
  const py = (y: number) => H / 2 - (y / grenze) * (H / 2 - 12);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Ändern wir die Nebendiagonale, bis die Eigenwerte die reelle Achse verlassen.</Aufgabe>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <span className="text-xs">
          <M>{"\\bA ="}</M>
        </span>
        <MatrixInput value={m} onChange={setM} step={1} />
      </div>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        className="mt-1 h-auto max-w-full rounded"
        role="img"
        aria-label={
          reell
            ? `Gaußebene mit den reellen Eigenwerten ${fmtDe(re + ab, 2)} und ${fmtDe(re - ab, 2)}.`
            : `Gaußebene mit dem komplexen Eigenwertpaar ${fmtDe(re, 2)} plus minus ${fmtDe(im, 2)} i.`
        }
      >
        <rect x={0.5} y={0.5} width={B - 1} height={H - 1} rx={4} fill="var(--w-bg)" stroke="var(--w-border)" />
        <line x1={8} y1={py(0)} x2={B - 8} y2={py(0)} stroke="var(--w-axis)" strokeWidth={1} />
        <line x1={px(0)} y1={8} x2={px(0)} y2={H - 8} stroke="var(--w-axis)" strokeWidth={1} />
        <text x={B - 10} y={py(0) - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          Re
        </text>
        <text x={px(0) + 4} y={12} fontSize={9} fill="var(--w-muted)">
          Im
        </text>
        {/* Spur/2 als Mittelpunkt: die Eigenwerte liegen immer symmetrisch dazu */}
        <line
          x1={px(re)}
          y1={8}
          x2={px(re)}
          y2={H - 8}
          stroke={FMM_COLORS.orange}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <text x={px(re) + 3} y={H - 12} fontSize={9} fill={FMM_COLORS.orange}>
          tr/2
        </text>
        {niceTicks(-grenze, grenze, 4)
          .filter((t) => Math.abs(t) > 1e-9 && Math.abs(t) < grenze * 0.95)
          .map((t) => (
            <g key={`re${t}`}>
              <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="var(--w-axis)" strokeWidth={1} />
              <text x={px(t)} y={py(0) + 14} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
                {fmtTick(t)}
              </text>
            </g>
          ))}
        {niceTicks(-grenze, grenze, 4)
          .filter((t) => Math.abs(t) > 1e-9 && Math.abs(t) < grenze * 0.8)
          .map((t) => (
            <g key={`im${t}`}>
              <line x1={px(0) - 3} y1={py(t)} x2={px(0) + 3} y2={py(t)} stroke="var(--w-axis)" strokeWidth={1} />
              <text x={px(0) - 6} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
                {fmtTick(t)}i
              </text>
            </g>
          ))}
        {punkte.map(([x, y], i) => (
          <circle key={i} cx={px(x)} cy={py(y)} r={4.5} fill={FMM_COLORS.blau} />
        ))}
      </svg>
      <div className="my-1 font-mono text-xs leading-5">
        <span style={{ color: FMM_COLORS.orange }}>
          tr(A) = {fmtDe(a, 2)} + {fmtDe(d, 2)} = {fmtDe(tr, 2)}
        </span>{" "}
        ·{" "}
        <span style={{ color: FMM_COLORS.violett }}>det(A) = {fmtDe(det, 2)}</span>
      </div>
      <Verdikt kind={reell ? "ok" : "warn"}>
        {reell ? (
          <>
            λ₁ = {fmtDe(re + ab, 2)}, λ₂ = {fmtDe(re - ab, 2)}: ihre Summe ist{" "}
            {fmtDe(2 * re, 2)} = tr(A), ihr Produkt {fmtDe(det, 2)} = det(A). Beide Punkte liegen
            spiegelbildlich um tr/2, denn sie sind die Nullstellen von λ² − tr(A)λ + det(A).
          </>
        ) : (
          <>
            Die Eigenwerte haben die reelle Achse verlassen: λ₁,₂ = {fmtDe(re, 2)} ±{" "}
            {fmtDe(im, 2)}i, ein{" "}
            <ConceptLink id="complex-numbers">komplex</ConceptLink> konjugiertes Paar. Summe und
            Produkt bleiben trotzdem reell – {fmtDe(2 * re, 2)} = tr(A) und {fmtDe(det, 2)} =
            det(A). Genau deshalb taugen die beiden als Prüfgrößen, auch wenn die Eigenwerte
            selbst unhandlich werden.
          </>
        )}
      </Verdikt>
    </div>
  );
}
