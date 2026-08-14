import { useState } from "react";
import { M, Plot } from "../../lib";

const f = (x: number) => (x * x * x * x) / 4 - x + 1;
const f1 = (x: number) => x * x * x - 1;
const f2 = (x: number) => 3 * x * x;

export function NewtonWidget() {
  const [x, setX] = useState(2.5);
  const quad = (t: number) => f(x) + f1(x) * (t - x) + 0.5 * f2(x) * (t - x) * (t - x);
  const step = () => setX((cur) => cur - f1(cur) / f2(cur));
  const reset = () => setX(2.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 flex items-center gap-2">
        <button
          onClick={step}
          className="rounded bg-sky-600 px-2 py-0.5 text-xs text-white hover:bg-sky-500"
        >
          Newton-Schritt
        </button>
        <button
          onClick={reset}
          className="rounded bg-slate-500 px-2 py-0.5 text-xs text-white hover:bg-slate-400"
        >
          zurücksetzen
        </button>
        <span className="text-xs">
          <M>{`x = ${x.toFixed(4)}`}</M>
        </span>
      </div>
      <div className="mb-1 text-xs">
        Blau: <M>{"f(x) = \\tfrac{1}{4}x^4 - x + 1"}</M> (Minimum bei{" "}
        <M>{"x = 1"}</M>). Gestrichelt: die Parabel, die am roten Punkt Wert,
        Steigung und Krümmung teilt. Jeder Schritt springt zum tiefsten Punkt
        der Parabel. Beobachten wir, wie wenige Schritte nötig sind.
      </div>
      <Plot
        series={[{ f }, { f: quad, color: "#dc2626", dash: [5, 4] }]}
        xDomain={[-0.5, 3]}
        yDomain={[-1, 9]}
        width={280}
        height={190}
        markers={[{ x, y: f(x), label: "x" }]}
      />
    </div>
  );
}
