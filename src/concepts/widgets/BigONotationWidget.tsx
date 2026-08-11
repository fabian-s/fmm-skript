/** Widget zum Konzept-Tooltip „O-Notation": Restglied gegen Hüllkurve C·t². */
import { useState } from "react";
import { M, Slider } from "../../lib";
import { LabeledPlot } from "../../lib";

export function RemainderWidget() {
  const [C, setC] = useState(1.0);
  const remainder = (t: number) => Math.abs(Math.exp(t) - (1 + t));
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Das Restglied <M>{"|e^t - (1 + t)|"}</M> (durchgezogen) im Vergleich
        zur Hüllkurve <M>{"C\\,t^2"}</M> (gestrichelt). Nahe <M>{"t = 0"}</M>{" "}
        fängt schon ein moderates <M>{"C"}</M> das Restglied ein; genau
        diese Schranke behauptet <M>{"O(t^2)"}</M>.
      </p>
      <Slider label="C" value={C} onChange={setC} min={0} max={2} step={0.05} />
      <LabeledPlot
        xLabel="t"
        yLabel="Größe"
        tickClass="text-slate-300"
        series={[
          { f: remainder },
          { f: (t) => C * t * t, color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-1, 1]}
        yDomain={[0, 0.8]}
        width={280}
        height={180}
      />
    </div>
  );
}
