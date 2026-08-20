/** EINSICHT: Die Indexreihenfolge einer Folge ist sichtbar. FARBEN: blau Glieder, rot Grenzwert. PROVENIENZ: neu. */
export function SequenceDots() {
  const W = 280;
  const H = 120;
  const N = 20;
  const xOf = (n: number) => 14 + ((n - 1) / (N - 1)) * (W - 28);
  const yOf = (a: number) => H - 14 - a * (H - 28);
  const dots = Array.from({ length: N }, (_, i) => {
    const n = i + 1;
    return { n, a: 1 / n };
  });
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="max-w-full h-auto rounded" role="img" aria-label="Punktfolge eins durch n mit Grenzwert null">
        <line
          x1={8}
          y1={yOf(0)}
          x2={W - 4}
          y2={yOf(0)}
          stroke="#D55E00"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {dots.map((d) => (
          <circle key={d.n} cx={xOf(d.n)} cy={yOf(d.a)} r={3.5} fill="#0072B2" />
        ))}
      </svg>
      <p className="mt-1 text-xs text-slate-300">
        Die Folge a<sub>n</sub> = 1/n, ein Punkt pro Index n = 1, 2, …, 20. Die
        Glieder behalten ihre Reihenfolge und drängen sich immer dichter an 0
        (rote Linie).
      </p>
    </div>
  );
}
