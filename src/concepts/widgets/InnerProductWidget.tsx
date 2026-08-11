import { useState } from "react";
import { LabeledTransformCanvas, M, Slider } from "../../lib";

export function AngleWidget() {
  const [deg, setDeg] = useState(40);
  const th = (deg * Math.PI) / 180;
  const x: [number, number] = [2, 1];
  const y: [number, number] = [1.8 * Math.cos(th), 1.8 * Math.sin(th)];
  const ip = x[0] * y[0] + x[1] * y[1];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Drehen wir <M>{"\\by"}</M> (rot): Das Vorzeichen von{" "}
        <M>{"\\bx^T \\by"}</M> wechselt genau dann, wenn die beiden Vektoren
        senkrecht aufeinander stehen.
      </p>
      <Slider
        label="Winkel von y"
        value={deg}
        onChange={setDeg}
        min={0}
        max={360}
        step={1}
        fmt={(v) => `${v.toFixed(0)}°`}
      />
      <LabeledTransformCanvas
        matrix={[[1, 0], [0, 1]]}
        vectors={[
          { v: x, color: "#60a5fa", label: "x" },
          { v: y, color: "#f87171", label: "y" },
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={220}
        worldHalf={2.4}
        tickClass="text-slate-300"
      />
      <p className="mt-1 font-mono text-sm">
        x&middot;y = {ip.toFixed(2)}{" "}
        {Math.abs(ip) < 0.05 ? "(≈ senkrecht!)" : ip > 0 ? "(Winkel < 90°)" : "(Winkel > 90°)"}
      </p>
    </div>
  );
}
