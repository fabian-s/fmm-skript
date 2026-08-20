import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, fmtDe } from "../../lib";

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
      <Aufgabe>Verändern wir die Bandbreite und vergleichen die Speicherzahlen.</Aufgabe><Slider label="Bandbreite" value={band} onChange={setBand} min={0} max={5} step={1} />
      <div className="my-1 font-mono text-xs">
        Nichtnull-Einträge: {count} von {N * N} ({((100 * count) / (N * N)).toFixed(0)}%)
        <br />dünn: {count}; dicht: {N * N} Zahlen
      </div>
      <svg
        viewBox={`0 0 ${N * cell + 2} ${N * cell + 2}`}
        className="max-w-full h-auto rounded border"
        role="img" aria-label="Besetzungsmuster einer Bandmatrix"
      >
        {cells.map(({ i, j, nz }) => (
          <rect
            key={`${i}-${j}`}
            x={1 + j * cell}
            y={1 + i * cell}
            width={cell - 1}
            height={cell - 1}
            fill={nz ? FMM_COLORS.blau : "var(--w-bg)"}
          />
        ))}
      </svg>
      <Verdikt kind={band <= 1 ? "ok" : "neutral"}>{band === 1 ? `Bandbreite 1 ergibt eine Tridiagonalmatrix mit ${count} Nichtnull-Einträgen.` : `Bei Bandbreite ${band} brauchen wir ${count} statt ${N * N} Speicherplätze; für große n wächst das wie O(nb) statt O(n²).`}</Verdikt>
    </div>
  );
}
