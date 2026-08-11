import { useState } from "react";
import { M, MatrixInput, TransformCanvas } from "../../lib";

export function LinearMapWidget() {
  const [m, setM] = useState<number[][]>([
    [1, -0.5],
    [0.5, 1],
  ]);
  const matrix: [[number, number], [number, number]] = [
    [m[0][0], m[0][1]],
    [m[1][0], m[1][1]],
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 flex flex-wrap items-center gap-3 text-xs">
        <MatrixInput value={m} onChange={setM} />
        <span>
          Die Pfeile sind die Bilder der Standardbasisvektoren: Sie sind genau
          die <em>Spalten</em> von <M>{"\\bA"}</M>.
        </span>
      </div>
      <TransformCanvas
        matrix={matrix}
        vectors={[
          { v: [matrix[0][0], matrix[1][0]], color: "#dc2626", label: "Ae₁" },
          { v: [matrix[0][1], matrix[1][1]], color: "#16a34a", label: "Ae₂" },
        ]}
      />
      <div className="mt-1 text-xs">
        Gitterquadrate werden zu Parallelogrammen, der Ursprung bleibt fest,
        und Geraden bleiben Geraden: die Erkennungszeichen einer linearen
        Abbildung.
      </div>
    </div>
  );
}
