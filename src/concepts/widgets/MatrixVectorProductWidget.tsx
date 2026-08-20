import { useState } from "react";
import { Aufgabe, FMM_COLORS, LabeledTransformCanvas, MD, Slider, Verdikt } from "../../lib";

/** EINSICHT: Ax ist die gewichtete Pfeilsumme seiner Spalten. FARBEN: rot x₁a₁, grün x₂a₂, blau Ax. PROVENIENZ: neu, LabeledTransformCanvas. */
export function ProductWidget() {
  const [x1, setX1] = useState(2);
  const [x2, setX2] = useState(1);
  const r = (v: number) => Math.round(v * 10) / 10;
  const b1 = r(1 * x1 + 2 * x2);
  const b2 = r(3 * x1 + 4 * x2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verändern wir beide Gewichte und verfolgen die Pfeilkette.</Aufgabe>
      <LabeledTransformCanvas matrix={[[1, 2], [3, 4]]} size={260} vectors={[{ v: [x1, 3 * x1], color: FMM_COLORS.rot, label: "x₁a₁" }, { v: [2 * x2, 4 * x2], color: FMM_COLORS.gruen, label: "x₂a₂" }, { v: [b1, b2], color: FMM_COLORS.blau, label: "Ax" }]} ariaLabel="Spaltenmischung für das Matrix-Vektor-Produkt" />
      <Slider label="x₁" value={x1} onChange={setX1} min={-3} max={3} step={0.1} />
      <Slider label="x₂" value={x2} onChange={setX2} min={-3} max={3} step={0.1} />
      <MD>
        {`\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} ${r(x1)} \\\\ ${r(x2)} \\end{bmatrix} = ${r(x1)} \\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} + ${r(x2)} \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} ${b1} \\\\ ${b2} \\end{bmatrix}`}
      </MD>
      <Verdikt>Die rote und grüne Spalte werden mit x₁ bzw. x₂ gewichtet; ihre Summe ist Ax.</Verdikt>
    </div>
  );
}
