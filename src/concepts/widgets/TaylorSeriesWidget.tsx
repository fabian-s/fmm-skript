import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../lib";

/** Taylor-Polynom von sin um 0, abgeschnitten bei Grad n (n ungerade). */
function sinTaylor(x: number, n: number): number {
  let term = x; // x^1 / 1!
  let sum = x;
  for (let k = 1; 2 * k + 1 <= n; k++) {
    term *= (-x * x) / (2 * k * (2 * k + 1));
    sum += term;
  }
  return sum;
}

export function TaylorWidget() {
  const [n, setN] = useState(3);
  const errPi = Math.abs(Math.sin(Math.PI) - sinTaylor(Math.PI, n));
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        <span className="text-sky-400">sin(x)</span> und sein{" "}
        <span className="text-red-400">Taylor-Polynom vom Grad n</span> um{" "}
        <M>{"a = 0"}</M>. Nahe 0 passt es hervorragend; weiter draußen
        schießt das Polynom irgendwann aus dem Bild; ein größeres{" "}
        <M>{"n"}</M> verbreitert den Bereich guter Übereinstimmung.
      </p>
      <Slider label="Grad n" value={n} onChange={setN} min={1} max={13} step={2} />
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[
          { f: (x) => Math.sin(x), color: "#0284c7" },
          { f: (x) => sinTaylor(x, n), color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-7, 7]}
        yDomain={[-3, 3]}
        width={280}
        height={200}
      />
      <p className="mt-1 font-mono text-xs">
        Fehler bei x = π: {errPi.toExponential(2)}
      </p>
    </div>
  );
}
