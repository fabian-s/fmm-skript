import { useState } from "react";
import { M, Slider, TransformCanvas } from "../../lib";

export function ShearUndoWidget() {
  const [s, setS] = useState(1);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Scherung s" value={s} onChange={setS} min={-2} max={2} step={0.05} />
      <div className="flex flex-wrap gap-2">
        <div>
          <TransformCanvas
            matrix={[[1, s], [0, 1]]}
            vectors={[{ v: [1, 1], color: "#dc2626", label: "Ax" }]}
            size={170}
            worldHalf={2.5}
          />
          <p className="text-center text-xs">
            <M>{"\\bA"}</M> (Scherung)
          </p>
        </div>
        <div>
          <TransformCanvas
            matrix={[[1, -s], [0, 1]]}
            vectors={[{ v: [1, 1], color: "#16a34a", label: "A⁻¹x" }]}
            size={170}
            worldHalf={2.5}
          />
          <p className="text-center text-xs">
            <M>{"\\bA^{-1}"}</M> (schert zurück)
          </p>
        </div>
      </div>
      <p className="mt-1 text-xs">
        Die Inverse der Scherung <M>{"\\bA = \\begin{pmatrix} 1 & s \\\\ 0 & 1 \\end{pmatrix}"}</M>{" "}
        ist die entgegengesetzte Scherung <M>{"\\begin{pmatrix} 1 & -s \\\\ 0 & 1 \\end{pmatrix}"}</M>:
        Wenden wir beide nacheinander an, bleibt jeder Punkt, wo er war.
      </p>
    </div>
  );
}
