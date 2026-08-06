/** Konzept-Tooltip: Tensor (mehrdimensionales Zahlen-Array). */
import { useState } from "react";
import { ConceptLink, M, registerConcept, Slider } from "../lib";

function TensorStackWidget() {
  const [layer, setLayer] = useState(1);
  const k = Math.round(layer);
  const cell = 26;
  const off = 16; // Tiefenversatz pro Schicht
  const gridSize = 3 * cell;
  const w = gridSize + 2 * off + 20;
  const h = gridSize + 2 * off + 20;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Schicht k" value={layer} onChange={setLayer} min={1} max={3} step={1} />
      <div className="mb-1 text-xs">
        Ein 3 × 3 × 3-Tensor, gezeichnet als drei gestapelte
        3 × 3-Matrizen; Schicht <M>{`k = ${k}`}</M> (hervorgehoben) enthält
        die Einträge <M>{`a_{ij${k}}`}</M>.
      </div>
      <svg
        width={w}
        height={h}
        className="rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        {[3, 2, 1].map((l) => {
          const dx = 10 + (l - 1) * off;
          const dy = 10 + (3 - l) * off;
          const active = l === k;
          return (
            <g key={l}>
              {Array.from({ length: 3 }, (_, i) =>
                Array.from({ length: 3 }, (_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={dx + j * cell}
                    y={dy + i * cell}
                    width={cell - 2}
                    height={cell - 2}
                    rx={3}
                    fill={active ? "#0284c7" : "#e2e8f0"}
                    stroke={active ? "#075985" : "#94a3b8"}
                    opacity={active ? 0.95 : 0.8}
                  />
                ))
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

registerConcept({
  id: "tensor",
  title: "Tensor",
  body: (
    <>
      <p>
        Ein Tensor (in dem hier gemeinten Sinn) ist einfach ein
        mehrdimensionales Zahlen-Array, der natürliche nächste Schritt
        in einer Folge, die wir schon kennen: Eine einzelne Zahl ist ein
        0-dimensionales Array, ein{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> ein 1-dimensionales,
        eine <ConceptLink id="matrix">Matrix</ConceptLink> ein
        2-dimensionales. Ein 3-dimensionaler Tensor{" "}
        <M>{"\\mathsf{A} \\in \\R^{m \\times n \\times p}"}</M> ist wie{" "}
        <M>{"p"}</M> hintereinander gestapelte Matrizen der Größe{" "}
        <M>{"m \\times n"}</M>; jeder Eintrag <M>{"a_{ijk}"}</M> braucht drei
        Indizes zur Adressierung.
      </p>
      <p>
        Tensoren tauchen beim Ableiten auf, weil Differenzieren die Dimension
        der Buchführung erhöht: Die Ableitung eines matrixwertigen Ausdrucks
        nach einer Matrix hat vier Indexpositionen, ist also ein
        4-dimensionaler Tensor. Deshalb verlieren vertraute Matrix-Gewohnheiten
        wie das{" "}
        <ConceptLink id="transpose">Transponieren</ConceptLink> ihre
        Selbstverständlichkeit: bei drei oder mehr Indexpositionen
        gibt es nicht mehr die eine natürliche Art, „Zeilen und Spalten zu
        vertauschen&ldquo;.
      </p>
      <TensorStackWidget />
    </>
  ),
});
