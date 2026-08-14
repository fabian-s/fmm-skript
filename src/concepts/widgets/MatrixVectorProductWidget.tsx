import { useState } from "react";
import { MD, Slider } from "../../lib";

/** A = [[1,2],[3,4]] fest; wir bewegen x und sehen Ax als Spaltenmischung. */
export function ProductWidget() {
  const [x1, setX1] = useState(2);
  const [x2, setX2] = useState(1);
  const r = (v: number) => Math.round(v * 10) / 10;
  const b1 = r(1 * x1 + 2 * x2);
  const b2 = r(3 * x1 + 4 * x2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x₁" value={x1} onChange={setX1} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="x₂" value={x2} onChange={setX2} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <MD>
        {`\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} ${r(x1)} \\\\ ${r(x2)} \\end{bmatrix} = ${r(x1)} \\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} + ${r(x2)} \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} ${b1} \\\\ ${b2} \\end{bmatrix}`}
      </MD>
    </div>
  );
}
