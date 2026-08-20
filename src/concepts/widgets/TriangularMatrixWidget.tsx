/** Statisches Nullmuster-Diagramm: obere vs. untere Dreiecksmatrix, 5x5. */
export function TriPattern({ lower, caption }: { lower: boolean; caption: string }) {
  const n = 5;
  const cells = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const nonzero = lower ? j <= i : j >= i;
      cells.push(
        <div
          key={`${i}-${j}`}
          className={`flex h-6 w-6 items-center justify-center rounded-sm font-mono text-[10px] ${
            nonzero ? "bg-sky-600/80 text-white" : "bg-slate-600/40 text-slate-400"
          }`}
        >
          {nonzero ? "\u2217" : "0"}
        </div>
      );
    }
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="inline-grid gap-0.5 rounded border-x-2 border-slate-500 p-1"
        style={{ gridTemplateColumns: `repeat(${n}, 1.5rem)` }}
      >
        {cells}
      </div>
      <span className="text-xs text-slate-300">{caption}</span>
    </div>
  );
}

/** EINSICHT: Die Nullseite bestimmt die Einsetzrichtung. FARBEN: blau frei, neutral null. PROVENIENZ: neu. */
export function TriangularMatrixWidget() {
  return <div className="mt-2 flex flex-wrap justify-center gap-6 rounded bg-slate-700/60 p-3"><TriPattern lower={false} caption="obere Dreiecksmatrix" /><TriPattern lower caption="untere Dreiecksmatrix" /></div>;
}
