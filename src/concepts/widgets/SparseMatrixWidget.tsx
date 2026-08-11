import { useState } from "react";
import { Slider } from "../../lib";

const N = 12;

export function SpyWidget() {
  const [band, setBand] = useState(1);
  const cell = 14;
  const cells: { i: number; j: number; nz: boolean }[] = [];
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const nz = Math.abs(i - j) <= band;
      if (nz) count++;
      cells.push({ i, j, nz });
    }
  }
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="Bandbreite" value={band} onChange={setBand} min={0} max={5} step={1} />
      <div className="my-1 font-mono text-xs">
        Nichtnull-Einträge: {count} von {N * N} ({((100 * count) / (N * N)).toFixed(0)}%)
      </div>
      <svg
        width={N * cell + 2}
        height={N * cell + 2}
        className="rounded border border-slate-500 bg-white"
      >
        {cells.map(({ i, j, nz }) => (
          <rect
            key={`${i}-${j}`}
            x={1 + j * cell}
            y={1 + i * cell}
            width={cell - 1}
            height={cell - 1}
            fill={nz ? "#0284c7" : "#f1f5f9"}
          />
        ))}
      </svg>
      <p className="mt-1 text-xs opacity-80">
        Besetzungsmuster (spy plot) einer 12×12-Bandmatrix: blau =
        Nichtnull-Eintrag (Zeile i, Spalte j), grau = Null, die wir gar nicht
        erst speichern müssen. Bandbreite 1 ergibt eine{" "}
        <em>Tridiagonalmatrix</em>: nur {3 * N - 2} von {N * N}{" "}
        Einträgen können ungleich Null sein.
      </p>
    </div>
  );
}
