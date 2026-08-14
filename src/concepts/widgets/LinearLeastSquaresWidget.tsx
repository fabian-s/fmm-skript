import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../lib";

// Data for the tiny running example: fit y ≈ x1 + x2 t to three points.
const T = [1, 2, 3];
const Y = [1, 2, 2];
// Least squares solution of [[1,1],[1,2],[1,3]] x ≅ (1,2,2):
// A^T A = [[3,6],[6,14]], A^T b = (5,11)  =>  x = (2/3, 1/2), min SSR = 1/6.
const BEST0 = 2 / 3;
const BEST1 = 1 / 2;

export function LsFitWidget() {
  const [c0, setC0] = useState(0);
  const [c1, setC1] = useState(1);
  const line = (t: number) => c0 + c1 * t;
  const res = T.map((t, i) => Y[i] - line(t));
  const ssr = res.reduce((s, r) => s + r * r, 0);
  // Dynamic y-window: always contains the movable line over the plotted t-range
  // AND the data points, so nothing is clipped at slider extremes.
  const yAll = [line(0), line(4), ...Y, 0, 3];
  const yDom: [number, number] = [Math.min(...yAll) - 0.4, Math.max(...yAll) + 0.4];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Achsenabschnitt x₁" value={c0} onChange={setC0} min={-1} max={2} step={0.01} />
      <Slider label="Steigung x₂" value={c1} onChange={setC1} min={-0.5} max={1.5} step={0.01} />
      <LabeledPlot
        xLabel="t"
        yLabel="y"
        tickClass="text-slate-300"
        series={[
          { f: line, color: "#0284c7", label: "deine Gerade" },
          { f: (t) => BEST0 + BEST1 * t, color: "#059669", dash: [5, 4], label: "KQ-Lösung" },
        ]}
        markers={T.map((t, i) => ({ x: t, y: Y[i], color: "#dc2626" }))}
        xDomain={[0, 4]}
        yDomain={yDom}
        width={300}
        height={190}
      />
      <p className="mt-1 text-xs">
        Residuen <M>{`(${res.map((r) => r.toFixed(2)).join(",\\; ")})`}</M>, Quadratsumme{" "}
        <M>{`${ssr.toFixed(3)}`}</M>. Das Minimum <M>{"1/6 \\approx 0.167"}</M> erreicht nur
        die gestrichelte Gerade <M>{"y = \\tfrac{2}{3} + \\tfrac{1}{2}\\,t"}</M>. Versuchen
        wir, sie zu schlagen.
      </p>
    </div>
  );
}
