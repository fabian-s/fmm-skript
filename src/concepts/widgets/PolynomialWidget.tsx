import { useState } from "react";
import { Plot, Slider } from "../../lib";

export function MonomialWidget() {
  const [n, setN] = useState(2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Grad n des Bausteins xⁿ" value={n} onChange={setN} min={0} max={6} step={1} />
      <Plot
        series={[{ f: (x) => Math.pow(x, n), color: "#0284c7" }]}
        xDomain={[-1.6, 1.6]}
        yDomain={[-2, 2]}
        width={280}
        height={190}
      />
      <p className="mt-1 text-xs text-slate-300">
        Die Potenzfunktionen xⁿ (hier n = {n}) sind die Bausteine; ein Polynom
        ist eine gewichtete Summe endlich vieler davon.
      </p>
    </div>
  );
}
