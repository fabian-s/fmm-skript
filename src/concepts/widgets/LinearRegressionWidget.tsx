import { useState } from "react";
import { M, Plot, Slider } from "../../lib";

const data: [number, number][] = [
  [-2, -1.4],
  [-1, -0.9],
  [0, 0.4],
  [1, 1.0],
  [2, 2.3],
];

export function RegressionWidget() {
  const [a, setA] = useState(0.3);
  const [b, setB] = useState(1);
  const sse = data.reduce((s, [x, y]) => s + (y - (a * x + b)) ** 2, 0);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Steigung a" value={a} onChange={setA} min={-1} max={2} />
      <Slider label="Achsenabschnitt b" value={b} onChange={setB} min={-2} max={2} />
      <div className="mb-1 text-xs">
        Passen wir die Gerade <M>{"f(x) = a x + b"}</M> an die Punkte an.
        Summe der quadrierten Fehler: <M>{`${sse.toFixed(2)}`}</M>. Schaffen
        wir es unter 0.25?
      </div>
      <Plot
        series={[{ f: (x) => a * x + b }]}
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        width={280}
        height={200}
        markers={data.map(([x, y]) => ({ x, y }))}
      />
    </div>
  );
}
