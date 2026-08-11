import { useState } from "react";
import { M, Slider, TransformCanvas } from "../../lib";

export function CompositionWidget() {
  const [s, setS] = useState(0.8);
  const [k, setK] = useState(1.5);
  // B = Scherung, A = horizontale Streckung; Produkt AB = [[k, k s], [0, 1]]
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Scherung s (B)" value={s} onChange={setS} min={-1.5} max={1.5} step={0.05} />
      <Slider label="Streckung k (A)" value={k} onChange={setK} min={0.3} max={2} step={0.05} />
      <TransformCanvas
        matrix={[[k, k * s], [0, 1]]}
        vectors={[{ v: [1, 1], color: "#dc2626", label: "ABx" }]}
        size={200}
        worldHalf={3}
      />
      <p className="mt-1 text-xs">
        Die einzelne Matrix{" "}
        <M>{"\\bA\\bB = \\begin{pmatrix} k & ks \\\\ 0 & 1 \\end{pmatrix}"}</M>{" "}
        führt beide Schritte auf einmal aus: erst die Scherung <M>{"\\bB"}</M>,
        dann die Streckung <M>{"\\bA"}</M>.
      </p>
    </div>
  );
}
