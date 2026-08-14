/** Widget zum Concept-Tooltip Matrixmultiplikation (Zeile mal Spalte). */
import { useState } from "react";
import { MatrixInput } from "../../lib";

function fmt(x: number): string {
  return Number.isInteger(x) ? String(x) : x.toFixed(2).replace(/\.?0+$/, "");
}

function multiply2x2(A: number[][], B: number[][]): number[][] {
  return [0, 1].map((i) =>
    [0, 1].map((j) => A[i][0] * B[0][j] + A[i][1] * B[1][j])
  );
}

export function ProductWidget() {
  const [A, setA] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ]);
  const [B, setB] = useState<number[][]>([
    [5, 6],
    [7, 8],
  ]);
  const C = multiply2x2(A, B);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-xs">
      <div className="mb-1 text-slate-300">
        Ändern wir die Einträge: das Produkt aktualisiert sich Eintrag für
        Eintrag (Zeile der linken Matrix mal Spalte der rechten):
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={A} onChange={setA} step={1} />
        </span>
        <span className="text-slate-300">×</span>
        <span className="text-slate-900 dark:text-slate-100">
          <MatrixInput value={B} onChange={setB} step={1} />
        </span>
        <span className="text-slate-300">=</span>
        <div
          className="inline-grid gap-1 rounded border-x-2 border-slate-500 px-1.5 py-1"
          style={{ gridTemplateColumns: "repeat(2, minmax(0,3.5rem))" }}
        >
          {C.map((row, i) =>
            row.map((v, j) => (
              <span
                key={`${i}-${j}`}
                className="rounded bg-slate-800 px-1 py-0.5 text-center font-mono"
              >
                {fmt(v)}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="mt-1 text-slate-400">
        z.&nbsp;B. Eintrag oben links: {fmt(A[0][0])}·{fmt(B[0][0])} +{" "}
        {fmt(A[0][1])}·{fmt(B[1][0])} = {fmt(C[0][0])}
      </div>
    </div>
  );
}
