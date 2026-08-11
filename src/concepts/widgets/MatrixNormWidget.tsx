import { useState } from "react";
import { LabeledTransformCanvas, M, MatrixInput, sigmaMax } from "../../lib";

/** ‖A‖₂ als maximale Streckung: Einheitskreis → Ellipse, längste Halbachse = Norm. */
export function NormWidget() {
  const [A, setA] = useState<number[][]>([
    [1, 0.8],
    [0.2, 1.4],
  ]);
  const M2: [[number, number], [number, number]] = [
    [A[0][0], A[0][1]],
    [A[1][0], A[1][1]],
  ];
  const s1 = sigmaMax(M2);
  const worldHalf = Math.max(2.2, s1 * 1.15);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="mb-1 flex items-center gap-3">
        <span>
          <M>{"\\bA ="}</M>
        </span>
        <MatrixInput value={A} onChange={setA} />
        <span className="font-mono text-xs">
          ‖A‖₂ = {Number.isFinite(s1) ? s1.toFixed(3) : "–"}
        </span>
      </div>
      <LabeledTransformCanvas
        matrix={M2}
        tickClass="text-slate-300"
        size={260}
        worldHalf={worldHalf}
        showGrid={false}
        showUnitCircle={true}
      />
      <p className="mt-1 text-xs opacity-80">
        Alle Vektoren auf dem gestrichelten Einheitskreis werden von <M>{"\\bA"}</M> auf die
        Ellipse geschickt. Die 2-Norm <M>{"\\|\\bA\\|_2"}</M> ist die Länge der längsten
        Halbachse, also die stärkste Streckung, die <M>{"\\bA"}</M> irgendeinem Einheitsvektor
        antut. Probieren wir Einträge nahe an einer singulären Matrix: Die Ellipse wird zur
        Nadel, aber die Norm bleibt die halbe Nadellänge.
      </p>
    </div>
  );
}
