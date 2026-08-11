import { useState } from "react";
import { MatrixInput } from "../../lib";

export function RankWidget() {
  const [m, setM] = useState<number[][]>([
    [1, 2],
    [2, 4],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const allZero = m.flat().every((v) => v === 0);
  const rank = allZero ? 0 : Math.abs(det) < 1e-9 ? 1 : 2;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={m} onChange={setM} step={1} />
        </span>
        <div className="font-mono text-xs">
          <div>det = {det.toFixed(2)}</div>
          <div>Rang = {rank}</div>
        </div>
      </div>
      <p className="mt-1 text-xs opacity-80">
        {rank === 2
          ? "Die beiden Spalten zeigen in verschiedene Richtungen: voller Rang."
          : rank === 1
            ? "Eine Spalte ist ein Vielfaches der anderen: nur eine unabhängige Richtung."
            : "Die Nullmatrix hat überhaupt keine unabhängigen Spalten."}
      </p>
    </div>
  );
}
