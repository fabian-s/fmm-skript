import { useState } from "react";
import { Slider } from "../../lib";
import { LabeledTransformCanvas } from "../../lib";

export function DiagWidget() {
  const [d1, setD1] = useState(2);
  const [d2, setD2] = useState(0.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="d₁" value={d1} onChange={setD1} min={-3} max={3} step={0.1} />
      <Slider label="d₂" value={d2} onChange={setD2} min={-3} max={3} step={0.1} />
      <div className="my-1 font-mono text-xs">
        D = diag({d1.toFixed(1)}, {d2.toFixed(1)}): e₁ wird um {d1.toFixed(1)} gestreckt, e₂ um {d2.toFixed(1)}
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [d1, 0],
          [0, d2],
        ]}
        vectors={[
          { v: [d1, 0], color: "#dc2626", label: "D e₁" },
          { v: [0, d2], color: "#16a34a", label: "D e₂" },
        ]}
        size={240}
        worldHalf={3.4}
      />
      <p className="mt-1 text-xs opacity-80">
        Eine Diagonalmatrix streckt jede Achse um ihren eigenen Faktor und
        mischt die Koordinaten nie; das Gitter bleibt rechteckig.
      </p>
    </div>
  );
}
