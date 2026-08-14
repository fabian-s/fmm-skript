import { useState } from "react";
import { Slider } from "../../lib";
import { LabeledPlot } from "../../lib";

/**
 * Chord test: pick two points on the graph; the function is convex iff the
 * chord between them never dips below the graph. Toggle to a non-convex
 * double-well to see the test fail.
 */
export function ConvexWidget() {
  const [u, setU] = useState(-1.6);
  const [v, setV] = useState(1.2);
  const [wavy, setWavy] = useState(false);
  const f = wavy
    ? (x: number) => (x * x * x * x) / 4 - x * x + 1
    : (x: number) => 0.6 * x * x + 0.2 * x;
  const lo = Math.min(u, v);
  const hi = Math.max(u, v);
  const chord = (x: number) =>
    x < lo || x > hi ? NaN : f(lo) + ((f(hi) - f(lo)) * (x - lo)) / (hi - lo || 1);
  const mid = (lo + hi) / 2;
  const ok = f(mid) <= chord(mid) + 1e-9;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <label className="mb-1 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={wavy} onChange={(e) => setWavy(e.target.checked)} />
        zu einer nicht-konvexen Funktion wechseln
      </label>
      <Slider label="u" value={u} onChange={setU} min={-2.4} max={2.4} step={0.1} fmt={(x) => x.toFixed(1)} />
      <Slider label="v" value={v} onChange={setV} min={-2.4} max={2.4} step={0.1} fmt={(x) => x.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        am Mittelpunkt: f = {f(mid).toFixed(2)} vs. Sehne ={" "}
        {Number.isFinite(chord(mid)) ? chord(mid).toFixed(2) : "–"}{" "}
        {ok ? "→ Graph unter der Sehne ✓" : "→ Graph ÜBER der Sehne ✗"}
      </p>
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[
          { f, color: "#38bdf8" },
          { f: chord, color: "#f59e0b", dash: [5, 4] },
        ]}
        markers={[
          { x: lo, y: f(lo), color: "#f59e0b" },
          { x: hi, y: f(hi), color: "#f59e0b" },
        ]}
        xDomain={[-2.6, 2.6]}
        yDomain={[-1.5, 5]}
        width={280}
        height={190}
      />
      <p className="mt-1 text-xs text-slate-300">
        Bei der parabelartigen Funktion bleibt jede Sehne oberhalb des Graphen,
        egal wohin wir u und v legen. Beim Doppelmulden-Graphen tauchen Sehnen
        über den mittleren Buckel hinweg unter den Graphen: der Konvexitätstest
        schlägt fehl, und tatsächlich hat diese Funktion zwei getrennte Minima.
      </p>
    </div>
  );
}
