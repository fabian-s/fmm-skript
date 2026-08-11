import { useState } from "react";
import { LabeledTransformCanvas, M, Slider } from "../../lib";

export function ReflectionWidget() {
  const [deg, setDeg] = useState(30);
  const th = (deg * Math.PI) / 180;
  const c2 = Math.cos(2 * th);
  const s2 = Math.sin(2 * th);
  // Beispielpunkt und sein Spiegelbild
  const a: [number, number] = [2, 1];
  const Ha: [number, number] = [c2 * a[0] + s2 * a[1], s2 * a[0] - c2 * a[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Winkel der Spiegelachse (Grad)" value={deg} onChange={setDeg} min={0} max={180} step={1} />
      <div className="my-1 font-mono text-xs">
        H a = ({Ha[0].toFixed(2)}, {Ha[1].toFixed(2)})ᵀ, det H = −1
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [c2, s2],
          [s2, -c2],
        ]}
        vectors={[
          { v: [2.6 * Math.cos(th), 2.6 * Math.sin(th)], color: "#64748b", label: "Spiegelachse" },
          { v: a, color: "#dc2626", label: "a" },
          { v: Ha, color: "#16a34a", label: "H a" },
        ]}
        size={240}
        worldHalf={3}
      />
      <p className="mt-1 text-xs opacity-80">
        Der grüne Pfeil ist das Spiegelbild des roten an der grauen Achse.
        Zweimal spiegeln bringt jeden Punkt an seinen Ausgangsort zurück:{" "}
        <M>{"\\bH^2 = \\bI"}</M>.
      </p>
    </div>
  );
}
