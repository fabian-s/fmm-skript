import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

/** q(phi) = u^T B u für den Einheitsvektor u = (cos phi, sin phi), B = [[2,1],[0,1]]. */
const qOf = (phi: number) => {
  const c = Math.cos(phi);
  const s = Math.sin(phi);
  return 2 * c * c + c * s + s * s;
};

export function QuadFormWidget() {
  const [phi, setPhi] = useState(0.5);
  const q = qOf(phi);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung φ" value={phi} onChange={setPhi} min={0} max={3.14} step={0.01} />
      <div className="mb-1 text-xs">
        Laufen wir die Gerade{" "}
        <M>{"\\bx = t \\, (\\cos\\varphi, \\sin\\varphi)^\\top"}</M> entlang,
        zeichnet die quadratische Form{" "}
        <M>{"\\bx^\\top \\bB \\bx"}</M> mit{" "}
        <M>{"\\bB = \\begin{bmatrix} 2 & 1 \\\\ 0 & 1 \\end{bmatrix}"}</M>{" "}
        die Parabel{" "}
        <M>{`${q.toFixed(2)} \\, t^2`}</M>: immer eine Parabel, aber wie
        steil sie ist, hängt von der gewählten Richtung ab.
      </div>
      <Plot
        series={[{ f: (t) => q * t * t }]}
        xDomain={[-1.5, 1.5]}
        yDomain={[-0.5, 5]}
        width={280}
        height={170}
      />
    </div>
  );
}
