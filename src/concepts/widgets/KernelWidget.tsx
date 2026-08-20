/**
 * Konzept-Widget `kernel` (Kern / Nullraum).
 *
 * DIE EINE EINSICHT: Der Kern ist keine einzelne Richtung, sondern eine ganze
 * Gerade — und man findet sie nicht durch Rechnen, sondern daran, dass die
 * Ausgabe verschwindet. Genau diese Richtung ist die, die A nicht mehr
 * unterscheiden kann.
 *
 * FARBROLLEN: rot = der Eingabevektor v, den wir ziehen; blau = seine Ausgabe
 * Av; orange = die Kerngerade span{(2, −1)}, auf der Av verschwindet.
 *
 * PROVENIENZ: Aufbau aus dem Vorgängerwidget (Stand 2026-08-18); Achsen,
 * Ziehen und der Unterraum als Gerade kommen aus der Lib-`TransformCanvas`.
 * Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV0/KernelWidget.mjs,
 * 2026-08-20), A = [[1, 2], [0,5, 1]]: det A = 0, A·(2, −1) = (0, 0) exakt.
 * Die Kernrichtung liegt bei −26,57° (bzw. 153,43°). Das Bild ist die Gerade
 * span{(1; 0,5)}; nach dem Rangsatz ist mit Rang 1 die Kerndimension
 * 2 − 1 = 1, die Gerade ist also der ganze Kern.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  TransformCanvas,
  Verdikt,
  fmtDe,
} from "../../lib";

const A: [[number, number], [number, number]] = [
  [1, 2],
  [0.5, 1],
];
const KERN: [number, number] = [2, -1];

export function KernelWidget() {
  const [v, setV] = useState<[number, number]>([1.5 * Math.cos(0.8), 1.5 * Math.sin(0.8)]);
  const Av: [number, number] = [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
  const rest = Math.hypot(Av[0], Av[1]);
  const winkel = Math.atan2(v[1], v[0]);
  const radius = Math.hypot(v[0], v[1]);
  const imKern = rest < 0.08;

  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>Drehen wir v, bis der blaue Pfeil verschwindet.</Aufgabe>
      <TransformCanvas
        matrix={A}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        worldHalf={3.2}
        xLabel="x₁"
        yLabel="x₂"
        vectors={[
          { v, color: FMM_COLORS.rot, label: "v", draggable: true },
          { v: Av, color: FMM_COLORS.blau, label: "Av" },
        ]}
        onVectorChange={(_i, nv) => setV([nv[0], nv[1]])}
        lines={[{ dir: KERN, color: FMM_COLORS.orange, label: "Kern(A)", dash: true }]}
        ariaLabel={`Der Eingabevektor v und sein Bild Av mit der Länge ${fmtDe(rest, 2)}; die Kerngerade verläuft in Richtung (2, −1).`}
      />
      <Slider
        label="Richtung von v"
        value={winkel}
        onChange={(w) => setV([radius * Math.cos(w), radius * Math.sin(w)])}
        min={-Math.PI}
        max={Math.PI}
        step={0.005}
        accent={FMM_COLORS.rot}
      />
      <Slider
        label="Länge von v"
        value={radius}
        onChange={(r) => setV([r * Math.cos(winkel), r * Math.sin(winkel)])}
        min={0.2}
        max={3}
        step={0.05}
        accent={FMM_COLORS.rot}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Eingabe v ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Ausgabe Av ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> Kerngerade
      </p>
      <Verdikt kind={imKern ? "ok" : "neutral"}>
        {imKern ? (
          <>
            ‖Av‖ = {fmtDe(rest, 3)}: v liegt auf der orangen Geraden, also im Kern. Und nicht nur
            dieses eine v – jedes Vielfache von (2, −1) wird auf null geschickt, der Kern ist die
            ganze Gerade. Mit Rang 1 bleibt nach dem Rangsatz genau 2 − 1 = 1 Dimension für ihn
            übrig.
          </>
        ) : (
          <>
            ‖Av‖ = {fmtDe(rest, 2)} ist nicht null, dieses v liegt also nicht im Kern. Die
            gesuchte Richtung ist die, in der sich die beiden Spalten von A gerade wegheben:
            1·2 + 2·(−1) = 0.
          </>
        )}
      </Verdikt>
    </div>
  );
}
