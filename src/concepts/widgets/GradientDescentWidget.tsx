import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

const L = (t: number) => t * t;

export function GradientDescentWidget() {
  const [gamma, setGamma] = useState(0.15);
  const [path, setPath] = useState<number[]>([2.4]);
  const theta = path[path.length - 1];
  const step = () => {
    // dL/dθ = 2θ, der Update-Schritt ist also θ ← θ − γ · 2θ.
    setPath((p) => [...p, p[p.length - 1] * (1 - 2 * gamma)].slice(-9));
  };
  const reset = () => setPath([2.4]);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Schrittweite γ" value={gamma} onChange={setGamma} min={0.05} max={1.15} step={0.05} />
      <div className="mb-1 flex items-center gap-2">
        <button
          onClick={step}
          className="rounded bg-sky-600 px-2 py-0.5 text-xs text-white hover:bg-sky-500"
        >
          einen Schritt gehen
        </button>
        <button
          onClick={reset}
          className="rounded bg-slate-500 px-2 py-0.5 text-xs text-white hover:bg-slate-400"
        >
          zurücksetzen
        </button>
        <span className="text-xs">
          <M>{`\\theta = ${theta.toFixed(3)}`}</M>
        </span>
      </div>
      <div className="mb-1 text-xs">
        Kleines <M>{"\\gamma"}</M>: langsam, aber sicher. Bei{" "}
        <M>{"\\gamma = 0.5"}</M>: ein perfekter Sprung. Jenseits von{" "}
        <M>{"\\gamma \\approx 0.5"}</M> schießt das Verfahren über das Ziel
        hinaus und zickzackt; ab <M>{"\\gamma = 1"}</M> explodieren die
        Schritte.
      </div>
      <Plot
        series={[{ f: L }]}
        xDomain={[-3, 3]}
        yDomain={[-0.6, 7]}
        width={280}
        height={180}
        markers={path.map((x, i) => ({
          x,
          y: L(x),
          color: i === path.length - 1 ? "#dc2626" : "#f9a8a4",
          label: i === path.length - 1 ? "θ" : undefined,
        }))}
      />
    </div>
  );
}
