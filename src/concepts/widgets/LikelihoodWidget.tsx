import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

export function LikelihoodWidget() {
  const [h, setH] = useState(7);
  const n = 10;
  const pHat = h / n;
  const peak = Math.pow(pHat, h) * Math.pow(1 - pHat, n - h); // Math.pow(0,0)=1
  const L = (p: number) =>
    p < 0 || p > 1 ? NaN : (Math.pow(p, h) * Math.pow(1 - p, n - h)) / peak;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Anzahl Kopf h"
        value={h}
        onChange={setH}
        min={0}
        max={10}
        step={1}
        fmt={(v) => v.toFixed(0)}
      />
      <div className="mb-1 text-xs">
        Likelihood von <M>{"p"}</M> nach {h}-mal Kopf bei 10 Würfen (skaliert,
        sodass das Maximum 1 ist). Sie ist maximal bei{" "}
        <M>{`\\hat{p} = ${pHat.toFixed(1)}`}</M>, dem
        Maximum-Likelihood-Schätzer.
      </div>
      <Plot
        series={[{ f: L }]}
        xDomain={[0, 1]}
        yDomain={[-0.1, 1.15]}
        width={280}
        height={180}
        markers={[{ x: pHat, y: 1, label: "p̂" }]}
      />
    </div>
  );
}
