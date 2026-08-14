/** Widget zum Konzept-Tooltip „Konditionszahl": Einheitskreis, Ellipse, cond(A). */
import { useState } from "react";
import {
  LabeledTransformCanvas,
  M,
  sigmaMax,
  Slider,
} from "../../lib";

export function CondWidget() {
  const [eps, setEps] = useState(0.3);
  const A: [[number, number], [number, number]] = [
    [1, 1],
    [1, 1 + eps],
  ];
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0]; // = eps
  const s1 = sigmaMax(A);
  const s2 = Math.abs(det) / s1;
  const cond = s1 / s2;
  const worldHalf = Math.max(2.6, s1 * 1.15);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="ε"
        value={eps}
        onChange={setEps}
        min={0.02}
        max={1}
        step={0.02}
      />
      <div className="mb-1 font-mono text-xs">
        A = [[1, 1], [1, {(1 + eps).toFixed(2)}]] &nbsp;&nbsp; &sigma;
        <sub>max</sub> = {s1.toFixed(3)}, &sigma;<sub>min</sub> = {s2.toFixed(4)}
        , &nbsp;cond(A) = {cond.toFixed(1)}
      </div>
      <LabeledTransformCanvas
        matrix={A}
        tickClass="text-slate-300"
        size={260}
        worldHalf={worldHalf}
        showGrid={false}
        showUnitCircle={true}
      />
      <p className="mt-1 text-xs opacity-80">
        Der gestrichelte Einheitskreis wird von <M>{"\\bA"}</M> auf die
        durchgezogene Ellipse abgebildet. Für <M>{"\\eps \\to 0"}</M> werden
        die beiden Spalten gleich, die Ellipse kollabiert zu einer Nadel, und
        cond(A), das Verhältnis ihrer längsten zur kürzesten Achse,
        explodiert.
      </p>
    </div>
  );
}
