/**
 * Konzept-Widget `linear-combination`.
 *
 * DIE EINE EINSICHT: Die Gewichte einer Linearkombination sind Koordinaten.
 * Wer einen Zielpunkt vorgibt, sucht damit die Lösung eines linearen
 * Gleichungssystems – und weil v₁ und v₂ nicht auf einer Geraden liegen, gibt
 * es zu jedem Ziel genau ein Paar (c₁, c₂), notfalls mit negativen Anteilen.
 *
 * FARBROLLEN: blau = v₁, grün = v₂, rot = die Mischung c₁v₁ + c₂v₂ (das
 * Objekt in der Hand), orange = der Zielpunkt und das aufgespannte
 * Parallelogramm der beiden Anteile.
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18) mit zwei Reglern ohne
 * Aufgabe. Ziehen und Achsen aus der Lib-`TransformCanvas`; Zielpunkt,
 * Parallelogramm der Anteile und Texte sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C2/check-gruppeA2.mjs,
 * 2026-08-19), v₁ = (2; 1), v₂ = (−1; 1), det[v₁ v₂] = 3:
 *   Ziel (3; 0)   ⇒ c₁ = 1,    c₂ = −1     (im Reglerbereich)
 *   Ziel (1; 2)   ⇒ c₁ = 1,    c₂ = 1
 *   Ziel (5; 1)   ⇒ c₁ = 2,    c₂ = −1     (außerhalb des Reglerbereichs)
 *   Voreinstellung c₁ = 1, c₂ = 0,5 ⇒ Mischung (1,5; 1,5)
 * Die Rückrechnung c₁v₁ + c₂v₂ trifft die Ziele exakt (Abweichung 0).
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  TransformCanvas,
  Verdikt,
  clamp,
  fmtDe,
  maxAbsCoord,
} from "../../lib";

const IDENT: [[number, number], [number, number]] = [
  [1, 0],
  [0, 1],
];
const V1: [number, number] = [2, 1];
const V2: [number, number] = [-1, 1];
const DET = V1[0] * V2[1] - V2[0] * V1[1]; // = 3
const ZIEL: [number, number] = [3, 0];

export function MixWidget() {
  // Voreinstellung (1; 0,5): die Mischung liegt sichtbar zwischen v₁ und v₂,
  // das Parallelogramm der beiden Anteile ist gut zu erkennen.
  const [c1, setC1] = useState(1);
  const [c2, setC2] = useState(0.5);

  const mix: [number, number] = [
    c1 * V1[0] + c2 * V2[0],
    c1 * V1[1] + c2 * V2[1],
  ];
  const abstand = Math.hypot(mix[0] - ZIEL[0], mix[1] - ZIEL[1]);
  const getroffen = abstand < 0.12;
  const half = Math.max(3.4, 1.25 * maxAbsCoord(V1, V2, mix, ZIEL));

  /** Ziehen der Mischung: die Gewichte sind die Koordinaten in der Basis v₁, v₂. */
  const zieheMix = (p: [number, number]) => {
    setC1(clamp((p[0] * V2[1] - p[1] * V2[0]) / DET, -1.5, 1.5));
    setC2(clamp((V1[0] * p[1] - V1[1] * p[0]) / DET, -1.5, 1.5));
  };

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Treffen wir mit der Mischung den orangen Ring bei (3; 0).</Aufgabe>
      <TransformCanvas
        matrix={IDENT}
        size={280}
        worldHalf={half}
        showGrid={false}
        showUnitCircle={false}
        vectors={[
          { v: V1, color: FMM_COLORS.blau, label: "v₁" },
          { v: V2, color: FMM_COLORS.gruen, label: "v₂" },
          { v: mix, color: FMM_COLORS.rot, label: "c₁v₁+c₂v₂", draggable: true },
        ]}
        onVectorChange={(_i, p) => zieheMix([p[0], p[1]])}
        overlay={(toPx) => {
          const a: [number, number] = [c1 * V1[0], c1 * V1[1]];
          const b: [number, number] = [c2 * V2[0], c2 * V2[1]];
          const eck = [toPx(0, 0), toPx(a[0], a[1]), toPx(mix[0], mix[1]), toPx(b[0], b[1])];
          const [zx, zy] = toPx(ZIEL[0], ZIEL[1]);
          return (
            <g pointerEvents="none">
              <polygon
                points={eck.map(([x, y]) => `${x},${y}`).join(" ")}
                fill={FMM_COLORS.orange}
                fillOpacity={0.15}
                stroke={FMM_COLORS.orange}
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <circle
                cx={zx}
                cy={zy}
                r={7}
                fill="none"
                stroke={FMM_COLORS.orange}
                strokeWidth={2}
              />
            </g>
          );
        }}
        ariaLabel={`Die beiden Vektoren v eins und v zwei und ihre Mischung; sie liegt aktuell ${fmtDe(abstand, 2)} vom Zielpunkt entfernt.`}
      />
      <Slider
        label="c₁"
        value={c1}
        onChange={setC1}
        min={-1.5}
        max={1.5}
        step={0.1}
        accent={FMM_COLORS.blau}
      />
      <Slider
        label="c₂"
        value={c2}
        onChange={setC2}
        min={-1.5}
        max={1.5}
        step={0.1}
        accent={FMM_COLORS.gruen}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> v₁ = (2; 1) ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> v₂ = (−1; 1) ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Mischung · orange: Ziel und
        die Anteile
      </p>
      <Verdikt kind={getroffen ? "ok" : "neutral"}>
        {fmtDe(c1, 1)}·(2; 1) + {fmtDe(c2, 1)}·(−1; 1) = ({fmtDe(mix[0], 2)};{" "}
        {fmtDe(mix[1], 2)}).{" "}
        {getroffen
          ? "Getroffen, mit c₁ = 1 und c₂ = −1: ein negatives Gewicht heißt einfach, dass v₂ rückwärts eingesetzt wird. Diese beiden Zahlen sind genau die Lösung des Gleichungssystems mit den Spalten v₁ und v₂."
          : "Noch daneben. Das gestrichelte Parallelogramm zeigt die beiden Anteile: der blaue Anteil c₁v₁ und der grüne Anteil c₂v₂ ergeben zusammen die Spitze der roten Mischung."}
      </Verdikt>
    </div>
  );
}
