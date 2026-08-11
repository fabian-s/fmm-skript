import { useState } from "react";
import { LabeledTransformCanvas, M, Slider } from "../../lib";

/** Drehen–Strecken–Drehen live: A = U diag(σ1,σ2) Vᵀ als Bild des Einheitskreises. */
export function SvdWidget() {
  const [theta, setTheta] = useState(0.5);
  const [s1, setS1] = useState(1.8);
  const [s2, setS2] = useState(0.6);
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  // A = R(theta) · diag(s1, s2)  (V = I; eine Drehung im Kreis ist unsichtbar)
  const A: [[number, number], [number, number]] = [
    [c * s1, -s * s2],
    [s * s1, c * s2],
  ];
  const worldHalf = Math.max(2.2, s1 * 1.15);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Drehung θ (U)" value={theta} onChange={setTheta} min={0} max={3.14} />
      <Slider label="σ₁" value={s1} onChange={setS1} min={0.1} max={2.5} />
      <Slider label="σ₂" value={s2} onChange={setS2} min={0} max={2.5} />
      <LabeledTransformCanvas
        matrix={A}
        tickClass="text-slate-300"
        size={260}
        worldHalf={worldHalf}
        showGrid={false}
        showUnitCircle={true}
      />
      <p className="mt-1 text-xs opacity-80">
        Der gestrichelte Einheitskreis wird von <M>{"\\bA = \\bU\\bSigma\\bV^\\top"}</M> auf eine
        Ellipse mit Halbachsen <M>{"\\sigma_1, \\sigma_2"}</M> abgebildet; <M>{"\\bU"}</M> dreht
        die Ellipse um <M>{"\\theta"}</M>. Die erste Drehung <M>{"\\bV^\\top"}</M> sehen wir hier
        nicht; sie dreht nur den Kreis in sich selbst. Für <M>{"\\sigma_2 \\to 0"}</M> kollabiert
        die Ellipse zu einer Strecke: <M>{"\\bA"}</M> verliert Rang.
      </p>
    </div>
  );
}
