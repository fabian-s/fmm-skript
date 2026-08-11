import { useState } from "react";
import { ConceptLink, LabeledTransformCanvas, M, Slider } from "../../lib";

const IDENT: [[number, number], [number, number]] = [
  [1, 0],
  [0, 1],
];

/**
 * Gram-Schmidt-Sicht der QR-Zerlegung für eine 2x2-Matrix: a1 ist fest, die
 * Richtung von a2 hängt am Slider. q1, q2 sind die orthonormalisierten
 * Spalten (sie liegen auf dem Einheitskreis); die Einträge von R werden live
 * neu berechnet.
 */
export function GramSchmidtWidget() {
  const a1: [number, number] = [1.5, 2]; // ||a1|| = 2.5, q1 = (0.6, 0.8)
  const [th, setTh] = useState(2.2);
  const a2: [number, number] = [2 * Math.cos(th), 2 * Math.sin(th)];
  const r11 = Math.hypot(a1[0], a1[1]);
  const q1: [number, number] = [a1[0] / r11, a1[1] / r11];
  const r12 = q1[0] * a2[0] + q1[1] * a2[1];
  const u: [number, number] = [a2[0] - r12 * q1[0], a2[1] - r12 * q1[1]];
  const r22 = Math.hypot(u[0], u[1]);
  const q2: [number, number] =
    r22 > 1e-9 ? [u[0] / r22, u[1] / r22] : [-q1[1], q1[0]]; // Notlösung, falls a2 ∥ a1
  const nearParallel = r22 < 0.15;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung von a₂" value={th} onChange={setTh} min={0} max={6.28} step={0.02} />
      <LabeledTransformCanvas
        matrix={IDENT}
        showGrid={false}
        showUnitCircle={true}
        size={250}
        worldHalf={2.6}
        tickClass="text-slate-300"
        vectors={[
          { v: a1, color: "#0284c7", label: "a₁" },
          { v: a2, color: "#059669", label: "a₂" },
          { v: q1, color: "#f59e0b", label: "q₁" },
          { v: q2, color: "#dc2626", label: "q₂" },
        ]}
      />
      <p className="mt-1 text-xs">
        <M>
          {`\\bR = \\begin{bmatrix} ${r11.toFixed(2)} & ${r12.toFixed(2)} \\\\ 0 & ${r22.toFixed(2)} \\end{bmatrix}`}
        </M>
        {": "}
        <M>{"\\bq_1"}</M> ist <M>{"\\ba_1"}</M>, auf Länge 1 geschrumpft;{" "}
        <M>{"\\bq_2"}</M> ist das, was von <M>{"\\ba_2"}</M> übrig bleibt,
        nachdem wir seinen <M>{"\\bq_1"}</M>-Anteil (
        <M>{"r_{12}\\bq_1"}</M>) abgezogen haben, wieder auf Länge 1 skaliert.
        Beide Spitzen liegen im rechten Winkel zueinander auf dem
        Einheitskreis.
        {nearParallel && (
          <>
            {" "}
            Gerade eben ist <M>{"\\ba_2"}</M> fast parallel zu{" "}
            <M>{"\\ba_1"}</M>: <M>{`r_{22} \\approx ${r22.toFixed(2)}`}</M>,
            die Matrix hat beinahe keinen vollen{" "}
            <ConceptLink id="rank">Rang</ConceptLink> mehr und{" "}
            <M>{"\\bq_2"}</M> ist schlecht bestimmt.
          </>
        )}
      </p>
    </div>
  );
}
