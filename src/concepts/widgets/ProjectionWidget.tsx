import { useState } from "react";
import { M, Slider, TransformCanvas } from "../../lib";

export function ProjectionWidget() {
  const [theta, setTheta] = useState(0.5);
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  // P = b b^T für den Einheitsvektor b = (cos θ, sin θ)^T
  const P: [[number, number], [number, number]] = [
    [c * c, c * s],
    [c * s, s * s],
  ];
  const x: [number, number] = [2, 1.4];
  const px: [number, number] = [P[0][0] * x[0] + P[0][1] * x[1], P[1][0] * x[0] + P[1][1] * x[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Winkel θ der Geraden"
        value={theta}
        onChange={setTheta}
        min={0}
        max={Math.PI}
        step={0.02}
      />
      <TransformCanvas
        matrix={P}
        size={250}
        worldHalf={3}
        showUnitCircle={false}
        vectors={[
          { v: x, color: "#dc2626", label: "x" },
          { v: px, color: "#0284c7", label: "πx" },
        ]}
      />
      <p className="mt-1 text-xs opacity-80">
        Das ganze Gitter kollabiert auf die Gerade mit Winkel{" "}
        <M>{"\\theta"}</M>; <M>{"\\pi\\bx"}</M> ist der Fußpunkt des Lots, das
        wir von <M>{"\\bx"}</M> auf diese Gerade fällen.
      </p>
    </div>
  );
}
