import { useState } from "react";
import { Plot, Slider } from "../../lib";

export function LimitWidget() {
  const [h, setH] = useState(1.2);
  // difference quotient of x^2 at x0 = 1: ((1+h)^2 - 1)/h = 2 + h, undefined at h = 0
  const g = (t: number) => (Math.abs(t) < 1e-9 ? NaN : ((1 + t) * (1 + t) - 1) / t);
  const hEff = Math.abs(h) < 0.01 ? 0.01 : h;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="h" value={h} onChange={setH} min={-1.5} max={1.5} step={0.01} />
      <Plot
        series={[{ f: g, color: "#0284c7" }]}
        xDomain={[-1.6, 1.6]}
        yDomain={[0, 4]}
        width={280}
        height={190}
        markers={[
          { x: hEff, y: g(hEff), label: `g(h) = ${g(hEff).toFixed(2)}` },
          { x: 0, y: 2, color: "#16a34a", label: "Grenzwert 2" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        g(h) = ((1+h)² − 1)/h ist bei h = 0 nicht definiert. Schieben wir h
        aber gegen 0, nähert sich der Wert 2 an. Der Grenzwert für h → 0 ist
        also 2.
      </p>
    </div>
  );
}
