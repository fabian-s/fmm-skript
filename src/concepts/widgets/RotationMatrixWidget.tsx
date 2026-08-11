import { useState } from "react";
import { LabeledTransformCanvas, MD, Slider } from "../../lib";

export function RotationWidget() {
  const [deg, setDeg] = useState(35);
  const th = (deg * Math.PI) / 180;
  const c = Math.cos(th);
  const s = Math.sin(th);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="θ (Grad)" value={deg} onChange={setDeg} min={-180} max={180} step={1} />
      <div className="my-1 font-mono text-xs">
        cos θ = {c.toFixed(3)}, sin θ = {s.toFixed(3)}
      </div>
      <MD>{`\\bQ = \\begin{pmatrix} ${c.toFixed(2)} & ${(-s).toFixed(2)} \\\\ ${s.toFixed(2)} & ${c.toFixed(2)} \\end{pmatrix}`}</MD>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [c, -s],
          [s, c],
        ]}
        vectors={[
          { v: [c, s], color: "#dc2626", label: "Q e₁" },
          { v: [-s, c], color: "#16a34a", label: "Q e₂" },
        ]}
        size={240}
        worldHalf={1.6}
      />
      <p className="mt-1 text-xs opacity-80">
        Der gestrichelte Einheitskreis landet exakt auf sich selbst: Drehen
        ändert keine einzige Länge, es dreht nur die ganze Ebene um θ.
      </p>
    </div>
  );
}
