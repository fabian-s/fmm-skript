import { useState } from "react";
import { LabeledTransformCanvas, M, sigmaMax, Slider } from "../../lib";

/** Adjustable 2x2 map: grid lines stay straight and evenly spaced, origin fixed. */
export function LinearMapWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);
  const [c, setC] = useState(0);
  const [d, setD] = useState(1);
  const mat: [[number, number], [number, number]] = [
    [a, b],
    [c, d],
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="a" value={a} onChange={setA} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="b" value={b} onChange={setB} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="c" value={c} onChange={setC} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="d" value={d} onChange={setD} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 text-center text-sm">
        <M>
          {`\\bA = \\begin{bmatrix} ${a.toFixed(1)} & ${b.toFixed(1)} \\\\ ${c.toFixed(
            1
          )} & ${d.toFixed(1)} \\end{bmatrix}, \\quad \\det(\\bA) = ${(a * d - b * c).toFixed(2)}`}
        </M>
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={mat}
        vectors={[
          { v: [1, 0], color: "#38bdf8", label: "e₁" },
          { v: [0, 1], color: "#f472b6", label: "e₂" },
        ]}
        size={280}
        worldHalf={Math.max(3.2, 1.2 * sigmaMax(mat))}
      />
      <p className="mt-1 text-xs text-slate-300">
        Wie auch immer wir die vier Zahlen wählen: Das Gitter bleibt ein Gitter
        aus geraden, gleichmäßig verteilten Linien, und der Ursprung bewegt
        sich nie: der Fingerabdruck einer linearen Abbildung.
      </p>
    </div>
  );
}
