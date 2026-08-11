import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../lib";

export function RootsWidget() {
  const [c, setC] = useState(-1);
  const real = c <= 0;
  const r = Math.sqrt(Math.abs(c));
  const marks = real
    ? [
        { x: -r, y: 0, color: "#dc2626", label: r === 0 ? "doppelte Nullstelle" : "−√(−c)" },
        ...(r > 0 ? [{ x: r, y: 0, color: "#dc2626", label: "√(−c)" }] : []),
      ]
    : [];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="c" value={c} onChange={setC} min={-2} max={2} step={0.1} fmt={(v) => v.toFixed(1)} />
      <div className="my-1 font-mono text-xs">
        {real
          ? c === 0
            ? "Nullstellen: x = 0 (Vielfachheit 2)"
            : `Nullstellen: x = ±${r.toFixed(2)} (beide reell)`
          : `Nullstellen: x = ±${r.toFixed(2)}i (komplexes Paar, Graph berührt die Achse nie)`}
      </div>
      <LabeledPlot
        xLabel="x"
        yLabel="p(x)"
        tickClass="text-slate-300"
        series={[{ f: (x) => x * x + c, color: "#0284c7" }]}
        markers={marks}
        xDomain={[-3, 3]}
        yDomain={[-2.5, 4]}
        width={280}
        height={190}
      />
      <p className="mt-1 text-xs opacity-80">
        Schieben wir <M>{"c"}</M> nach oben: Die beiden reellen Nullstellen von{" "}
        <M>{"p(x) = x^2 + c"}</M> verschmelzen bei <M>{"c = 0"}</M> zu einer
        doppelten Nullstelle und verlassen dann die reelle Achse ganz. Sie
        verschwinden aber nicht, sondern wandern als Paar{" "}
        <M>{"\\pm i\\sqrt{c}"}</M> in die komplexe Ebene, die Anzahl bleibt
        zwei.
      </p>
    </div>
  );
}
