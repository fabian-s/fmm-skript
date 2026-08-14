import { useState } from "react";
import { LabeledPlot, Slider } from "../../lib";

/**
 * Definitheits-Test auf dem Einheitskreis: plotte q(θ) = x(θ)ᵀA x(θ) für
 * Einheitsvektoren x(θ) = (cos θ, sin θ) und A = [[2, c], [c, 2]]. Positiv
 * definit genau dann, wenn die ganze Kurve über null bleibt, d.h. wenn der
 * kleinste Eigenwert 2 − |c| > 0 ist.
 */
export function PositiveDefiniteWidget() {
  const [c, setC] = useState(1);
  // x(θ)ᵀ A x(θ) = 2 + 2c sinθ cosθ = 2 + c sin(2θ)
  const q = (th: number) => 2 + c * Math.sin(2 * th);
  const lmin = 2 - Math.abs(c);
  const pd = lmin > 0;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Nebendiagonale c" value={c} onChange={setC} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        A = [[2, {c.toFixed(1)}], [{c.toFixed(1)}, 2]], Minimum über Einheitsvektoren ={" "}
        λ_min = {lmin.toFixed(1)} →{" "}
        {pd ? "positiv definit ✓" : "NICHT positiv definit ✗"}
      </p>
      <LabeledPlot
        xLabel="θ (Richtung des Einheitsvektors x)"
        yLabel="xᵀA x"
        tickClass="text-slate-300"
        series={[{ f: q, color: pd ? "#4ade80" : "#f87171" }]}
        xDomain={[0, 3.15]}
        yDomain={[-1.5, 5.5]}
        width={280}
        height={180}
      />
      <p className="mt-1 text-xs text-slate-300">
        Jedes θ steht für eine Richtung x = (cos θ, sin θ); die Kurve zeigt die
        quadratische Form xᵀAx in dieser Richtung. Für |c| &lt; 2 bleibt die
        Kurve strikt oberhalb der Nulllinie, A ist also positiv definit. Schieben
        wir |c| über 2, liefern manche Richtungen xᵀAx ≤ 0.
      </p>
    </div>
  );
}
