import { useState } from "react";
import { MatrixInput } from "../../lib";

function MatDisplay({ m }: { m: number[][] }) {
  return (
    <div
      className="inline-grid gap-1 rounded border-x-2 border-slate-500 px-1.5 py-1 font-mono text-xs"
      style={{ gridTemplateColumns: `repeat(${m[0].length}, minmax(0, 3rem))` }}
    >
      {m.flat().map((v, i) => (
        <span key={i} className="text-center">
          {Number.isInteger(v) ? v : v.toFixed(2)}
        </span>
      ))}
    </div>
  );
}

export function LuWidget() {
  const [m, setM] = useState<number[][]>([
    [2, 1],
    [4, 5],
  ]);
  const a = m[0][0];
  const pivotOk = Math.abs(a) > 1e-9;
  const l21 = pivotOk ? m[1][0] / a : 0;
  const L = [
    [1, 0],
    [l21, 1],
  ];
  const U = [
    [m[0][0], m[0][1]],
    [0, m[1][1] - l21 * m[0][1]],
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={m} onChange={setM} step={1} />
        </span>
        {pivotOk ? (
          <>
            <span className="font-mono text-xs">=</span>
            <MatDisplay m={L} />
            <MatDisplay m={U} />
          </>
        ) : (
          <span className="text-xs text-red-400">
            Null-Pivot oben links: erst die Zeilen tauschen (partielle
            Pivotisierung)
          </span>
        )}
      </div>
      <p className="mt-1 text-xs opacity-80">
        Links: unsere Matrix A. Rechts: ihre Faktoren L (untere Dreiecksmatrix
        mit Einsen auf der Diagonale, enthält den Multiplikator{" "}
        {pivotOk ? l21.toFixed(2) : "–"}) und U (obere Dreiecksmatrix).
        Multiplizieren wir sie zurück, erhalten wir LU = A.
      </p>
    </div>
  );
}
