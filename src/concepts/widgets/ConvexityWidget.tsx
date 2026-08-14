import { useState } from "react";
import { Slider } from "../../lib";
import { LabeledPlot } from "../../lib";

/**
 * Chord test: pick two points on the graph; for a convex function the chord
 * between them never dips below the curve. A toggle switches to a non-convex
 * function where the chord test fails.
 */
export function ChordWidget() {
  const [a, setA] = useState(-1.5);
  const [b, setB] = useState(1.0);
  const [nonconvex, setNonconvex] = useState(false);
  const f = nonconvex ? (x: number) => (x * x * x * x) / 4 - x * x : (x: number) => x * x;
  const fa = f(a);
  const fb = f(b);
  const slope = (fb - fa) / (b - a || 1e-9);
  const chord = (x: number) => fa + slope * (x - a);
  // does the chord dip below f between a and b?
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  let dips = false;
  for (let x = lo; x <= hi; x += 0.05) {
    if (chord(x) < f(x) - 1e-6) dips = true;
  }
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <label className="mb-1 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={nonconvex} onChange={(e) => setNonconvex(e.target.checked)} />
        ein nicht-konvexes f ausprobieren
      </label>
      <Slider label="a" value={a} onChange={setA} min={-2.4} max={2.4} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="b" value={b} onChange={setB} min={-2.4} max={2.4} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        f = {nonconvex ? "x⁴/4 − x²" : "x²"}
        {"  →  "}
        {dips ? (
          <span className="text-rose-300">Sehne taucht unter den Graphen: nicht konvex</span>
        ) : (
          <span className="text-emerald-300">Sehne bleibt zwischen a und b oberhalb des Graphen</span>
        )}
      </p>
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        xDomain={[-2.6, 2.6]}
        yDomain={[-2, 6]}
        width={280}
        height={190}
        series={[
          { f, color: "#38bdf8" },
          { f: chord, color: "#f472b6", dash: [5, 4] },
        ]}
        markers={[
          { x: a, y: fa, color: "#f472b6", label: "a" },
          { x: b, y: fb, color: "#f472b6", label: "b" },
        ]}
      />
    </div>
  );
}
