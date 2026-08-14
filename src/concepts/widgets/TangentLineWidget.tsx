import { useState } from "react";
import { LabeledPlot, M, Slider } from "../../lib";

export function ZoomWidget() {
  const [zoom, setZoom] = useState(0);
  const a = 1;
  const w = 1.6 / Math.pow(2, zoom); // halbe Breite des Sichtfensters
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        <M>{"f(x) = x^2"}</M> (blau) und ihre Tangente{" "}
        <M>{"y = 2x - 1"}</M> im Punkt <M>{"(1,1)"}</M> (rot, gestrichelt).
        Zoomen wir hinein: Die Kurve wird von ihrer Tangente ununterscheidbar.
      </p>
      <Slider
        label="Zoom"
        value={zoom}
        onChange={setZoom}
        min={0}
        max={5}
        step={0.1}
        fmt={(v) => `${Math.pow(2, v).toFixed(1)}×`}
      />
      <LabeledPlot
        xLabel="x"
        yLabel="y"
        tickClass="text-slate-300"
        series={[
          { f: (x) => x * x },
          { f: (x) => 2 * x - 1, color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[a - w, a + w]}
        yDomain={[1 - 2.2 * w, 1 + 2.2 * w]}
        width={280}
        height={200}
        markers={[{ x: 1, y: 1, color: "#dc2626" }]}
      />
    </div>
  );
}
