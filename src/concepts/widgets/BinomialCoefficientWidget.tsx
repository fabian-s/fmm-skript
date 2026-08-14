/** Widget zum Konzept-Tooltip „Binomialkoeffizient": n über i live rechnen. */
import { useState } from "react";
import { MD, Slider } from "../../lib";

function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let j = 1; j <= k; j++) r = (r * (n - k + j)) / j;
  return Math.round(r);
}

export function ChooseWidget() {
  const [n, setN] = useState(5);
  const [kRaw, setKRaw] = useState(2);
  const k = Math.min(kRaw, n);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="n" value={n} onChange={setN} min={0} max={10} step={1} />
      <Slider label="i" value={kRaw} onChange={setKRaw} min={0} max={10} step={1} />
      <MD>{`\\binom{${n}}{${k}} = \\frac{${n}!}{${k}!\\,(${n - k})!} = ${choose(n, k)}`}</MD>
      <p className="mt-1 text-xs text-slate-300">
        {`Es gibt ${choose(n, k)} Möglichkeiten, ${k} Objekt${k === 1 ? "" : "e"} aus ${n} auszuwählen.`}
        {kRaw > n ? " (i ist bei n gedeckelt: wir können nicht mehr auswählen, als da ist.)" : ""}
      </p>
    </div>
  );
}
