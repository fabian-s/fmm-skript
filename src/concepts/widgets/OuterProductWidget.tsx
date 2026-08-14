import { useState } from "react";
import { MatrixInput, MD } from "../../lib";

export function OuterWidget() {
  const [u, setU] = useState<number[][]>([[1], [2], [3]]);
  const [v, setV] = useState<number[][]>([[4], [5]]);
  const rows = u
    .map((ur) => v.map((vr) => (ur[0] * vr[0]).toFixed(1).replace(/\.0$/, "")).join(" & "))
    .join(" \\\\ ");
  const allZero = u.every((r) => r[0] === 0) || v.every((r) => r[0] === 0);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="flex items-center gap-4">
        <div>
          <div className="mb-1 text-xs">u</div>
          <span className="text-slate-900 dark:text-slate-100">
            <MatrixInput value={u} onChange={setU} step={1} />
          </span>
        </div>
        <div>
          <div className="mb-1 text-xs">v</div>
          <span className="text-slate-900 dark:text-slate-100">
            <MatrixInput value={v} onChange={setV} step={1} />
          </span>
        </div>
      </div>
      <MD>{`\\bu\\bv^T = \\begin{pmatrix} ${rows} \\end{pmatrix}`}</MD>
      <p className="mt-1 text-xs opacity-80">
        {allZero
          ? "Mit einem Null-Faktor ist das äußere Produkt die Nullmatrix (Rang 0)."
          : "Jede Zeile ist ein Vielfaches von vᵀ und jede Spalte ein Vielfaches von u: Rang 1, egal welche Zahlen wir eintippen."}
      </p>
    </div>
  );
}
