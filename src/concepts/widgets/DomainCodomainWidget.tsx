/** Widget zum Konzept-Tooltip „Definitionsbereich, Zielbereich & Bild". */
import { M } from "../../lib";

export function MappingDiagram() {
  // domain blob with -2, 0, 2 mapping to squares 4, 0 in the codomain
  const inputs: { label: string; y: number; target: number }[] = [
    { label: "−2", y: 45, target: 45 },
    { label: "0", y: 85, target: 125 },
    { label: "2", y: 125, target: 45 },
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 text-xs">
        <M>{"f(x) = x^2"}</M>: Aus jeder Eingabe führt genau ein Pfeil
        heraus; die tatsächlich getroffenen Ausgaben (hervorgehoben) bilden
        das Bild.
      </div>
      <svg
        width={280}
        height={170}
        className="rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        <defs>
          <marker
            id="dc-arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 z" fill="#64748b" />
          </marker>
        </defs>
        <ellipse cx={65} cy={85} rx={45} ry={65} fill="#e0f2fe" stroke="#0284c7" />
        <ellipse cx={215} cy={85} rx={45} ry={65} fill="#f1f5f9" stroke="#94a3b8" />
        <ellipse cx={215} cy={85} rx={26} ry={52} fill="#fee2e2" stroke="#dc2626" strokeDasharray="4 3" />
        <text x={8} y={22} fontSize="12" fill="#0284c7">
          Definitionsbereich
        </text>
        <text x={178} y={22} fontSize="12" fill="#64748b">
          Zielbereich
        </text>
        <text x={205} y={162} fontSize="12" fill="#dc2626">
          Bild
        </text>
        {inputs.map(({ label, y, target }) => (
          <g key={label}>
            <text x={58} y={y + 4} fontSize="13" fill="#0f172a" textAnchor="middle">
              {label}
            </text>
            <line
              x1={78}
              y1={y}
              x2={192}
              y2={target}
              stroke="#64748b"
              strokeWidth={1.3}
              markerEnd="url(#dc-arrowhead)"
            />
          </g>
        ))}
        <text x={212} y={49} fontSize="13" fill="#0f172a" textAnchor="middle">
          4
        </text>
        <text x={212} y={129} fontSize="13" fill="#0f172a" textAnchor="middle">
          0
        </text>
        <text x={234} y={90} fontSize="13" fill="#94a3b8" textAnchor="middle">
          −1
        </text>
      </svg>
    </div>
  );
}
