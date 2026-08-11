import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../lib";

export function OneEquationWidget() {
  const [a1, setA1] = useState(1);
  const [a2, setA2] = useState(1);
  const [b, setB] = useState(1);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Die Lösungsmenge der einzelnen Gleichung{" "}
        <M>{"a_1 x_1 + a_2 x_2 = b"}</M> ist eine Gerade, eine
        Hyperebene im <M>{"\\R^2"}</M>. Verschieben wir die Koeffizienten,
        kippt und wandert die Gerade, aber sie bleibt immer eine
        Gerade.
      </p>
      <Slider label="a₁" value={a1} onChange={setA1} min={-3} max={3} step={0.1} />
      <Slider label="a₂" value={a2} onChange={setA2} min={0.3} max={3} step={0.1} />
      <Slider label="b" value={b} onChange={setB} min={-3} max={3} step={0.1} />
      <p className="my-1 text-center text-sm">
        <M>{`${a1.toFixed(1)}\\, x_1 ${a2 < 0 ? "-" : "+"} ${Math.abs(a2).toFixed(1)}\\, x_2 = ${b.toFixed(1)}`}</M>
      </p>
      <LabeledPlot
        xLabel="x₁"
        yLabel="x₂"
        tickClass="text-slate-300"
        series={[{ f: (x) => (b - a1 * x) / a2 }]}
        xDomain={[-4, 4]}
        yDomain={[-4, 4]}
        width={280}
        height={200}
      />
    </div>
  );
}
