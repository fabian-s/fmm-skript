import { useState } from "react";
import { Slider } from "../../lib";
import { LabeledPlot } from "../../lib";

/**
 * Basisfunktionen-Widget: die Monome 1, t, t² (gestrichelt) bilden eine Basis
 * der quadratischen Polynome; die Slider wählen die Koordinaten, die
 * durchgezogene Kurve ist die resultierende Linearkombination.
 */
export function BasisFunctionWidget() {
  const [c1, setC1] = useState(1);
  const [c2, setC2] = useState(0.5);
  const [c3, setC3] = useState(-0.8);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="c₁ (mal 1)" value={c1} onChange={setC1} min={-2} max={2} step={0.1} fmt={(x) => x.toFixed(1)} />
      <Slider label="c₂ (mal t)" value={c2} onChange={setC2} min={-2} max={2} step={0.1} fmt={(x) => x.toFixed(1)} />
      <Slider label="c₃ (mal t²)" value={c3} onChange={setC3} min={-2} max={2} step={0.1} fmt={(x) => x.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        f(t) = {c1.toFixed(1)} + {c2.toFixed(1)}·t + {c3.toFixed(1)}·t²
      </p>
      <LabeledPlot
        xLabel="t"
        yLabel="f(t)"
        tickClass="text-slate-300"
        xDomain={[-2, 2]}
        yDomain={[-4, 4]}
        width={280}
        height={190}
        series={[
          { f: () => 1, color: "#94a3b8", dash: [4, 3], label: "1" },
          { f: (t) => t, color: "#38bdf8", dash: [4, 3], label: "t" },
          { f: (t) => t * t, color: "#fbbf24", dash: [4, 3], label: "t²" },
          { f: (t) => c1 + c2 * t + c3 * t * t, color: "#f472b6", label: "f" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Gestrichelt: die drei Basisfunktionen 1 (grau), t (blau), t² (gelb).
        Durchgezogen in Pink: unsere Linearkombination. Die Koordinaten
        (c₁, c₂, c₃) legen jedes quadratische Polynom eindeutig fest.
      </p>
    </div>
  );
}
