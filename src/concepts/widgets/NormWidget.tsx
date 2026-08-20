/**
 * Konzept-Widget `norm`.
 *
 * DIE EINE EINSICHT: „Länge" ist eine Wahl. Ein und derselbe Punkt liegt je
 * nach Norm innerhalb oder außerhalb der Einheitskugel – die Kugelform ist das
 * Bild dieser Wahl.
 *
 * FARBROLLEN: orange = 1-Norm (Raute), blau = 2-Norm (Kreis), violett =
 * ∞-Norm (Quadrat); die aktive Norm ist dick gezeichnet. Der Punkt x trägt die
 * Farbe der gerade gewählten Norm.
 *
 * PROVENIENZ: Kugelfamilie und Drag-Rezept aus der Vorfassung (Stand
 * 2026-08-20); Achsen mit Ticks und Achsennamen, der Ortsvektor und das
 * zustandsabhängige Verdikt sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * Startpunkt x = (0,9 | 0,6) hat ‖x‖₁ = 1,50, ‖x‖₂ = √1,17 = 1,08 und
 * ‖x‖∞ = 0,90. Er liegt also außerhalb der 1- und der 2-Kugel, aber innerhalb
 * der ∞-Kugel; nachgerechnet ist ebenfalls die für alle x geltende Ordnung
 * ‖x‖∞ ≤ ‖x‖₂ ≤ ‖x‖₁, aus der die Schachtelung B₁ ⊆ B₂ ⊆ B∞ folgt.
 */
import { useState } from "react";
import {
  Aufgabe,
  clamp,
  DragHandle,
  FMM_COLORS,
  Slider,
  useDrag,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  W_PANEL,
  fmtDe,
  fmtTick,
} from "../../lib";

const FELD = 240;
const PAD_L = 26;
const PAD_R = 8;
const PAD_T = 8;
const PAD_B = 22;
const B = FELD + PAD_L + PAD_R;
const H = FELD + PAD_T + PAD_B;
const HALB = 1.7;

const NAMEN = { 1: "1", 2: "2", 3: "∞" } as const;

export function NormWidget() {
  const [p, setP] = useState<[number, number]>([0.9, 0.6]);
  const [aktiv, setAktiv] = useState<1 | 2 | 3>(2);

  const px = (v: number) => PAD_L + ((v + HALB) / (2 * HALB)) * FELD;
  const py = (v: number) => PAD_T + (1 - (v + HALB) / (2 * HALB)) * FELD;

  const normen = [
    Math.abs(p[0]) + Math.abs(p[1]),
    Math.hypot(p[0], p[1]),
    Math.max(Math.abs(p[0]), Math.abs(p[1])),
  ];
  const wert = normen[aktiv - 1];
  const farben = [FMM_COLORS.orange, FMM_COLORS.blau, FMM_COLORS.violett];
  const farbe = farben[aktiv - 1];

  const drag = useDrag<"p">({
    feld: { x0: PAD_L, y0: PAD_T, w: FELD, h: FELD },
    welt: { x0: -HALB, x1: HALB, y0: -HALB, y1: HALB },
    greifPosition: () => p,
    clamp: (q) => [clamp(q[0], -1.5, 1.5), clamp(q[1], -1.5, 1.5)],
    onDrag: (q) => setP(q),
  });

  const lage = wert < 0.98 ? "innen" : wert > 1.02 ? "außen" : "rand";

  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Ziehen wir x und schalten die Norm um, deren Einheitskugel gilt.</Aufgabe>
      <svg
        {...drag.svgProps}
        viewBox={`0 0 ${B} ${H}`}
        className="h-auto max-w-full"
        role="img"
        aria-label={`Einheitskugeln der Eins-, Zwei- und Unendlichnorm; der Punkt x liegt ${
          lage === "innen" ? "innerhalb" : lage === "außen" ? "außerhalb" : "auf dem Rand"
        } der ${NAMEN[aktiv]}-Kugel.`}
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
        {[-1, 0, 1].map((t) => (
          <g key={t}>
            <line
              x1={PAD_L}
              x2={B - PAD_R}
              y1={py(t)}
              y2={py(t)}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <line
              x1={px(t)}
              x2={px(t)}
              y1={PAD_T}
              y2={H - PAD_B}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, 1)}
            </text>
            {t !== 0 && (
              <text x={px(t)} y={H - PAD_B + 12} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
                {fmtTick(t, 1)}
              </text>
            )}
          </g>
        ))}
        <text x={B - PAD_R} y={H - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x₁
        </text>
        <text x={PAD_L - 4} y={PAD_T + 8} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          x₂
        </text>
        {/* Einheitskugeln */}
        <polygon
          points={`${px(1)},${py(0)} ${px(0)},${py(1)} ${px(-1)},${py(0)} ${px(0)},${py(-1)}`}
          fill="none"
          stroke={farben[0]}
          strokeWidth={aktiv === 1 ? 3 : 1.2}
          opacity={aktiv === 1 ? 1 : 0.55}
        />
        <circle
          cx={px(0)}
          cy={py(0)}
          r={px(1) - px(0)}
          fill="none"
          stroke={farben[1]}
          strokeWidth={aktiv === 2 ? 3 : 1.2}
          opacity={aktiv === 2 ? 1 : 0.55}
        />
        <rect
          x={px(-1)}
          y={py(1)}
          width={px(1) - px(-1)}
          height={py(-1) - py(1)}
          fill="none"
          stroke={farben[2]}
          strokeWidth={aktiv === 3 ? 3 : 1.2}
          opacity={aktiv === 3 ? 1 : 0.55}
        />
        {/* Ortsvektor: macht die gemessene Länge sichtbar */}
        <line x1={px(0)} y1={py(0)} x2={px(p[0])} y2={py(p[1])} stroke={farbe} strokeWidth={1.6} />
        <DragHandle
          x={px(p[0])}
          y={py(p[1])}
          farbe={farbe}
          aktiv={drag.dragging === "p"}
          {...drag.handleProps("p")}
        />
      </svg>
      <div className="mt-1 flex flex-wrap gap-1" role="group" aria-label="Norm wählen">
        {([1, 2, 3] as const).map((i) => (
          <button
            key={i}
            type="button"
            className={aktiv === i ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={aktiv === i}
            onClick={() => setAktiv(i)}
          >
            ‖x‖<sub>{NAMEN[i]}</sub>
          </button>
        ))}
      </div>
      <Slider
        label="x₁"
        value={p[0]}
        onChange={(v) => setP([v, p[1]])}
        min={-1.5}
        max={1.5}
        step={0.05}
        accent={farbe}
      />
      <Slider
        label="x₂"
        value={p[1]}
        onChange={(v) => setP([p[0], v])}
        min={-1.5}
        max={1.5}
        step={0.05}
        accent={farbe}
      />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: farben[0] }}>▮</span> 1-Norm (Raute) ·{" "}
        <span style={{ color: farben[1] }}>▮</span> 2-Norm (Kreis) ·{" "}
        <span style={{ color: farben[2] }}>▮</span> ∞-Norm (Quadrat)
      </p>
      <Verdikt kind={lage === "innen" ? "ok" : lage === "außen" ? "warn" : "neutral"}>
        {lage === "innen" ? (
          <>
            ‖x‖<sub>{NAMEN[aktiv]}</sub> = {fmtDe(wert, 2)} &lt; 1: in dieser Norm liegt x noch
            innerhalb der Einheitskugel. In den beiden anderen misst derselbe Punkt{" "}
            {normen
              .map((n, i) => (i === aktiv - 1 ? null : `${fmtDe(n, 2)}`))
              .filter(Boolean)
              .join(" und ")}{" "}
            – die Länge hängt an der Wahl der Norm, nicht am Punkt.
          </>
        ) : lage === "außen" ? (
          <>
            ‖x‖<sub>{NAMEN[aktiv]}</sub> = {fmtDe(wert, 2)} &gt; 1: hier liegt x außerhalb der
            Einheitskugel. Weil stets ‖x‖<sub>∞</sub> ≤ ‖x‖<sub>2</sub> ≤ ‖x‖<sub>1</sub> gilt, ist
            die Raute in den Kreis und der Kreis ins Quadrat geschachtelt – ein Punkt kann also
            außerhalb der 1-Kugel und zugleich innerhalb der ∞-Kugel liegen.
          </>
        ) : (
          <>
            ‖x‖<sub>{NAMEN[aktiv]}</sub> = {fmtDe(wert, 2)}: x liegt genau auf dem Rand dieser
            Einheitskugel. Genau die Punkte mit Norm 1 bilden sie – und je nach Norm ist das eine
            Raute, ein Kreis oder ein Quadrat.
          </>
        )}
      </Verdikt>
    </div>
  );
}
