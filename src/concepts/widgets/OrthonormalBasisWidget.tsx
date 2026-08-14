import { useState } from "react";
import { LabeledTransformCanvas, Slider } from "../../lib";

/**
 * Rotate an orthonormal pair q1, q2 and read off the coordinates of a fixed
 * vector w by dot products; no linear system needed.
 */
export function OrthonormalBasisWidget() {
  const [th, setTh] = useState(0.5);
  const q1: [number, number] = [Math.cos(th), Math.sin(th)];
  const q2: [number, number] = [-Math.sin(th), Math.cos(th)];
  const w: [number, number] = [2, 1];
  const c1 = w[0] * q1[0] + w[1] * q1[1];
  const c2 = w[0] * q2[0] + w[1] * q2[1];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Winkel θ"
        value={th}
        onChange={setTh}
        min={0}
        max={3.14}
        step={0.01}
        fmt={(v) => v.toFixed(2)}
      />
      <p className="my-1 font-mono text-xs">
        q₁ᵀq₂ = 0, ‖q₁‖ = ‖q₂‖ = 1; w = c₁q₁ + c₂q₂ mit c₁ = wᵀq₁ ={" "}
        {c1.toFixed(2)}, c₂ = wᵀq₂ = {c2.toFixed(2)}
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        vectors={[
          { v: q1, color: "#38bdf8", label: "q₁" },
          { v: q2, color: "#f472b6", label: "q₂" },
          { v: w, color: "#facc15", label: "w" },
        ]}
        size={280}
        worldHalf={2.6}
      />
      <p className="mt-1 text-xs text-slate-300">
        Wie auch immer wir das Paar drehen: q₁ und q₂ bleiben senkrechte
        Einheitsvektoren, und die Koordinaten des festen gelben Vektors w
        in dieser Basis sind einfach die beiden Skalarprodukte. Kein
        Gleichungssystem nötig.
      </p>
    </div>
  );
}
