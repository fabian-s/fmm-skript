import { useState } from "react";
import { MatrixInput } from "../../lib";
import { LabeledTransformCanvas, sigmaMax } from "../../lib";

export function DetWidget() {
  const [m, setM] = useState<number[][]>([
    [3, 1],
    [2, 2],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const mat: [[number, number], [number, number]] = [
    [m[0][0], m[0][1]],
    [m[1][0], m[1][1]],
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex items-center gap-3">
        {/* tooltip panel text is near-white; inputs keep a white bg, so restore dark text */}
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={m} onChange={setM} step={0.5} />
        </span>
        <div className="font-mono text-xs">
          <div>det = {det.toFixed(2)}</div>
          <div>Flächenfaktor = {Math.abs(det).toFixed(2)}</div>
        </div>
      </div>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={mat}
        size={260}
        worldHalf={Math.max(3.2, 1.2 * sigmaMax(mat))}
      />
      <p className="mt-1 text-xs opacity-80">
        {Math.abs(det) < 1e-9
          ? "det = 0: das Gitter kollabiert auf eine Gerade, die Matrix ist singulär."
          : "Die Fläche jeder Gitterzelle wird um den Faktor |det| skaliert; ein negatives det kehrt zusätzlich die Orientierung um."}
      </p>
    </div>
  );
}
