import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

function factorial(k: number): number {
  let r = 1;
  for (let i = 2; i <= k; i++) r *= i;
  return r;
}

/** Partialsummen der Kosinus-Potenzreihe im Vergleich zum Kosinus selbst. */
export function CosSeriesWidget() {
  const [n, setN] = useState(1);
  const partial = (x: number) => {
    let s = 0;
    for (let k = 0; k <= n; k++) {
      s += (Math.pow(-1, k) * Math.pow(x, 2 * k)) / factorial(2 * k);
    }
    return s;
  };
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Terme bis k"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={0}
        max={8}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <Plot
        series={[
          { f: Math.cos, color: "#94a3b8", dash: [5, 4], label: "cos" },
          { f: partial, color: "#0284c7", label: "Partialsumme" },
        ]}
        xDomain={[-7, 7]}
        yDomain={[-2.5, 2.5]}
        width={290}
        height={170}
      />
      <div className="mt-1 text-xs">
        Blau: <M>{"\\sum_{k=0}^{n} (-1)^k x^{2k}/(2k)!"}</M>. Jeder weitere
        Term schmiegt sich auf einem breiteren Intervall an <M>{"\\cos x"}</M>{" "}
        (grau gestrichelt) an.
      </div>
    </div>
  );
}
