/**
 * Konzept-Widget `linear-independence`.
 *
 * DIE EINE EINSICHT: Lineare Abhängigkeit ist ein Flächenmaß. Solange das von
 * a und b aufgespannte Parallelogramm noch Fläche hat, steuert b eine neue
 * Richtung bei; genau wenn die Fläche verschwindet, liegt b auf der Geraden
 * durch a und ist ein Vielfaches davon.
 *
 * FARBROLLEN: blau = der feste Vektor a, rot = der gezogene Vektor b, grau
 * gestrichelt = die Ursprungsgerade durch a (die verbotene Zone), orange = das
 * aufgespannte Parallelogramm.
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18); dessen Urteil war allein
 * über Textfarbe kodiert (rot/grün) und verletzte damit E3. Ziehen, Achsen und
 * Gerade kommen aus der Lib-`TransformCanvas`, Fläche und Texte sind neu; das
 * Urteil trägt jetzt Zeichen und Wort über `Verdikt`.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C2/check-gruppeA2.mjs,
 * 2026-08-19), a = (2; 1); Parallelogrammfläche = |a₁b₂ − a₂b₁| = |2b₂ − b₁|:
 *   b = (−1; 1,5) : Fläche 4,00  unabhängig  (Voreinstellung)
 *   b = (4; 2)    : Fläche 0     abhängig, b = 2a
 *   b = (1; 0,5)  : Fläche 0     abhängig, b = a/2
 *   b = (3; 1)    : Fläche 1,00  unabhängig
 * Kontrolle über die Höhe: |a| = 2,2361 mal Abstand von b zur Geraden durch a
 * (1,7889) ergibt für die Voreinstellung exakt die Fläche 4.
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
const A: [number, number] = [2, 1];

export function IndependenceWidget() {
  // Voreinstellung (−1; 1,5): b zeigt deutlich von der Geraden durch a weg,
  // das Parallelogramm ist groß und die Ausgangslage damit „unabhängig".
  const [b, setB] = useState<[number, number]>([-1, 1.5]);

  const kreuz = A[0] * b[1] - A[1] * b[0]; // = 2b₂ − b₁
  const flaeche = Math.abs(kreuz);
  const laengeB = Math.hypot(b[0], b[1]);
  const nullvektor = laengeB < 0.08;
  const abhaengig = flaeche < 0.05;
  const half = Math.max(3.2, 1.3 * maxAbsCoord(A, b, [A[0] + b[0], A[1] + b[1]]));

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Ziehen wir b auf die gestrichelte Gerade durch a.</Aufgabe>
      <TransformCanvas
        matrix={IDENT}
        size={280}
        worldHalf={half}
        showGrid={false}
        showUnitCircle={false}
        lines={[{ dir: A, color: FMM_COLORS.grau, dash: true }]}
        vectors={[
          { v: A, color: FMM_COLORS.blau, label: "a" },
          { v: b, color: FMM_COLORS.rot, label: "b", draggable: true },
        ]}
        onVectorChange={(_i, p) => setB([clamp(p[0], -3, 3), clamp(p[1], -3, 3)])}
        overlay={(toPx) => {
          const eck = [
            toPx(0, 0),
            toPx(A[0], A[1]),
            toPx(A[0] + b[0], A[1] + b[1]),
            toPx(b[0], b[1]),
          ];
          return (
            <polygon
              pointerEvents="none"
              points={eck.map(([x, y]) => `${x},${y}`).join(" ")}
              fill={FMM_COLORS.orange}
              fillOpacity={0.18}
              stroke={FMM_COLORS.orange}
              strokeWidth={1.2}
            />
          );
        }}
        ariaLabel={`Die Vektoren a und b spannen ein Parallelogramm mit dem Flächeninhalt ${fmtDe(flaeche, 2)} auf.`}
      />
      <Slider
        label="b, 1. Eintrag"
        value={b[0]}
        onChange={(v) => setB([v, b[1]])}
        min={-3}
        max={3}
        step={0.1}
        accent={FMM_COLORS.rot}
      />
      <Slider
        label="b, 2. Eintrag"
        value={b[1]}
        onChange={(v) => setB([b[0], v])}
        min={-3}
        max={3}
        step={0.1}
        accent={FMM_COLORS.rot}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> a = (2; 1) ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> b ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> aufgespanntes
        Parallelogramm · gestrichelt: Gerade durch a
      </p>
      <Verdikt
        kind={abhaengig ? "fail" : "ok"}
        labels={{ fail: "Abhängig", ok: "Unabhängig" }}
      >
        Fläche = |2·{fmtDe(b[1], 1)} − {b[0] < 0 ? `(${fmtDe(b[0], 1)})` : fmtDe(b[0], 1)}| ={" "}
        {fmtDe(flaeche, 2)}.{" "}
        {nullvektor
          ? "b ist der Nullvektor, und der ist ein Vielfaches von allem: jede Sammlung, die ihn enthält, ist linear abhängig."
          : abhaengig
            ? `b liegt auf der Geraden durch a, ist also ein Vielfaches von a (Faktor ${fmtDe((b[0] * A[0] + b[1] * A[1]) / (A[0] * A[0] + A[1] * A[1]), 2)}). Das Paar steuert nur eine Richtung bei und ist linear abhängig.`
            : "b zeigt von der Geraden durch a weg. Keiner der beiden lässt sich aus dem anderen bauen, das Paar spannt die ganze Ebene auf."}
      </Verdikt>
    </div>
  );
}
