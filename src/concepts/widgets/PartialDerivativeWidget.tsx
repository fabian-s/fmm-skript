import { useState } from "react";
import { LabeledPlot, Slider } from "../../lib";

/**
 * Schneide f(x, y) = x² + xy bei festem y auf und leite die Schnittkurve ab:
 * die Steigung der Tangente an die Schnittkurve IST ∂f/∂x.
 */
export function PartialDerivativeWidget() {
  const [y0, setY0] = useState(1);
  const [x0, setX0] = useState(0.8);
  const g = (x: number) => x * x + x * y0; // die Schnittkurve
  const slope = 2 * x0 + y0; // ∂f/∂x an (x0, y0)
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="y festhalten bei" value={y0} onChange={setY0} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="x₀" value={x0} onChange={setX0} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        ∂f/∂x = 2x + y, also bei (x₀, y) = ({x0.toFixed(1)}, {y0.toFixed(1)}):
        Steigung = {slope.toFixed(2)}
      </p>
      <LabeledPlot
        xLabel="x"
        yLabel="f(x, y) bei festem y"
        tickClass="text-slate-300"
        series={[
          { f: g, color: "#38bdf8" },
          { f: (x) => g(x0) + slope * (x - x0), color: "#f59e0b", dash: [5, 4] },
        ]}
        markers={[{ x: x0, y: g(x0), color: "#f59e0b" }]}
        xDomain={[-2.5, 2.5]}
        yDomain={[-3, 8]}
        width={280}
        height={190}
      />
      <p className="mt-1 text-xs text-slate-300">
        Blau: die Schnittkurve von f(x, y) = x² + xy bei dem von uns
        festgehaltenen y, eine ganz gewöhnliche Kurve in einer Variablen. Die
        Steigung der gestrichelten Tangente bei x₀ ist die partielle Ableitung
        ∂f/∂x = 2x₀ + y. Ändern wir das festgehaltene y, verschiebt sich die
        ganze Schnittkurve (und mit ihr die Steigung).
      </p>
    </div>
  );
}
