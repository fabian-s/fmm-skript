/** Static SVG sketch of a small feed-forward neural network (3-4-2). */
export function NetworkDiagram() {
  const layers = [3, 4, 2];
  const xs = [45, 140, 235];
  const H = 170;
  const yFor = (n: number, i: number) => H / 2 + (i - (n - 1) / 2) * 36;

  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (let i = 0; i < layers[l]; i++) {
      for (let j = 0; j < layers[l + 1]; j++) {
        edges.push({
          x1: xs[l],
          y1: yFor(layers[l], i),
          x2: xs[l + 1],
          y2: yFor(layers[l + 1], j),
        });
      }
    }
  }

  return (
    <svg
      width={280}
      height={H + 24}
      viewBox={`0 0 280 ${H + 24}`}
      className="mt-2 rounded border border-slate-300 bg-white dark:border-slate-600"
    >
      {edges.map((e, k) => (
        <line
          key={k}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="#94a3b8"
          strokeWidth={1}
        />
      ))}
      {layers.map((n, l) =>
        Array.from({ length: n }, (_, i) => (
          <circle
            key={`${l}-${i}`}
            cx={xs[l]}
            cy={yFor(n, i)}
            r={9}
            fill={l === 0 ? "#0284c7" : l === layers.length - 1 ? "#dc2626" : "#64748b"}
          />
        )),
      )}
      <text x={xs[0]} y={H + 16} textAnchor="middle" fontSize={11} fill="#475569">
        Eingabe
      </text>
      <text x={xs[1]} y={H + 16} textAnchor="middle" fontSize={11} fill="#475569">
        verborgene Schicht
      </text>
      <text x={xs[2]} y={H + 16} textAnchor="middle" fontSize={11} fill="#475569">
        Ausgabe
      </text>
    </svg>
  );
}
