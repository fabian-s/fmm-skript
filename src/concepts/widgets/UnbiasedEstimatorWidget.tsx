// fester "zufälliger" Scatter (deterministisch, damit das Widget stabil ist)
const UNBIASED: [number, number][] = [
  [-18, 6], [11, -15], [4, 19], [-9, -11], [22, 3],
  [-3, -22], [15, 12], [-20, -4], [7, 8], [-6, 14],
];
const BIASED: [number, number][] = [
  [14, -12], [19, -8], [12, -17], [17, -14], [21, -11],
  [15, -9], [18, -16], [13, -11], [20, -14], [16, -13],
];

function Board({ pts, title }: { pts: [number, number][]; title: string }) {
  const S = 130;
  const c = S / 2;
  return (
    <div className="flex flex-col items-center">
      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        className="rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        {[55, 38, 21].map((r) => (
          <circle key={r} cx={c} cy={c} r={r} fill="none" stroke="#94a3b8" strokeWidth={1} />
        ))}
        <circle cx={c} cy={c} r={4} fill="#0284c7" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={c + x} cy={c + y} r={2.8} fill="#dc2626" />
        ))}
      </svg>
      <span className="mt-1 text-xs text-slate-300">{title}</span>
    </div>
  );
}

export function DartboardWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="flex justify-center gap-4">
        <Board pts={UNBIASED} title="erwartungstreu: gestreut, aber zentriert" />
        <Board pts={BIASED} title="verzerrt: eng beisammen, aber daneben" />
      </div>
      <p className="mt-1 text-xs text-slate-300">
        Blauer Punkt: der wahre Wert θ. Rote Punkte: Schätzungen aus
        wiederholten Stichproben. Links: Die einzelnen Schätzungen sind
        verrauscht, aber ihr Mittel sitzt auf dem Ziel. Rechts: Die
        Schätzungen stimmen untereinander überein, liegen aber alle
        systematisch daneben.
      </p>
    </div>
  );
}
