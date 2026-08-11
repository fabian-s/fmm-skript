import { useState } from "react";
import { Plot, Slider } from "../../lib";

const gauss = (x: number, mu: number, s: number) =>
  Math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));

export function MixtureWidget() {
  const [pi1, setPi1] = useState(0.5);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Gewicht π₁" value={pi1} onChange={setPi1} min={0} max={1} step={0.01} />
      <Plot
        series={[
          { f: (x) => pi1 * gauss(x, -1.5, 0.6), dash: [5, 4], color: "#16a34a" },
          { f: (x) => (1 - pi1) * gauss(x, 1, 0.9), dash: [5, 4], color: "#dc2626" },
          { f: (x) => pi1 * gauss(x, -1.5, 0.6) + (1 - pi1) * gauss(x, 1, 0.9) },
        ]}
        xDomain={[-4, 4]}
        yDomain={[0, 0.75]}
        width={280}
        height={180}
      />
      <p className="mt-1 text-xs text-slate-300">
        Durchgezogen: Mischdichte. Gestrichelt: die beiden gewichteten
        Gauß-Komponenten.
      </p>
    </div>
  );
}
