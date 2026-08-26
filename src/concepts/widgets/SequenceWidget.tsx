/**
 * Konzept-Widget `sequence`.
 *
 * DIE EINE EINSICHT: Eine Folge ist ein Bild über dem Index. Erst die
 * n-Achse macht sichtbar, dass die Reihenfolge zur Folge gehört — dieselben
 * Zahlen in anderer Ordnung wären ein anderes Bild.
 *
 * FARBROLLEN: blau = die Glieder a_n; rot = der Grenzwert 0 als Niveaulinie.
 *
 * PROVENIENZ: Punktbild aus der Vorfassung (Stand 2026-08-19); Achsen mit
 * Ticks und Achsennamen, Themenfarben, Aufgabe und Verdikt sind neu. Der
 * erklärende Absatz steht jetzt in sequence.mdx.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O1/check-o1.mjs, 2026-08-20):
 * a_n = 1/n für n = 1 … 20 ist streng monoton fallend und durchweg positiv;
 * a_1 = 1, a_20 = 0,05, und erstmals unter 0,1 fällt die Folge bei n = 11.
 */
import { FMM_COLORS, Aufgabe, Verdikt, W_MUTED, fmtTick } from "../../lib";

const B = 300;
const H = 150;
const PAD_L = 30;
const PAD_R = 10;
const PAD_T = 22;
const PAD_B = 26;
const N = 20;

export function SequenceDots() {
  const px = (n: number) => PAD_L + ((n - 1) / (N - 1)) * (B - PAD_L - PAD_R);
  const py = (a: number) => PAD_T + (1 - a / 1.05) * (H - PAD_T - PAD_B);
  const punkte = Array.from({ length: N }, (_, i) => ({ n: i + 1, a: 1 / (i + 1) }));

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verfolgen wir die Punkte entlang der n-Achse von links nach rechts.</Aufgabe>
      <svg
        viewBox={`0 0 ${B} ${H}`}
        className="h-auto max-w-full rounded"
        role="img"
        aria-label="Punktfolge a_n = 1 durch n für n von 1 bis 20; die Werte fallen streng monoton gegen null."
      >
        <rect
          x={0.5}
          y={0.5}
          width={B - 1}
          height={H - 1}
          rx={4}
          fill="var(--w-bg)"
          stroke="var(--w-border)"
        />
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={B - PAD_R}
              y1={py(t)}
              y2={py(t)}
              stroke={t === 0 ? "var(--w-grid-strong)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, 0.2)}
            </text>
          </g>
        ))}
        {[1, 5, 10, 15, 20].map((t) => (
          <g key={`x${t}`}>
            <line
              x1={px(t)}
              x2={px(t)}
              y1={PAD_T}
              y2={H - PAD_B}
              stroke="var(--w-grid)"
              strokeWidth={0.6}
            />
            <text x={px(t)} y={H - PAD_B + 12} textAnchor="middle" fontSize={9} fill="var(--w-muted)">
              {fmtTick(t, 1)}
            </text>
          </g>
        ))}
        <text x={B - PAD_R} y={H - 4} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          n
        </text>
        <text x={PAD_L - 4} y={12} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          aₙ
        </text>
        {/* Grenzwert 0 */}
        <line
          x1={PAD_L}
          y1={py(0)}
          x2={B - PAD_R}
          y2={py(0)}
          stroke={FMM_COLORS.rot}
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        {punkte.map((d) => (
          <circle key={d.n} cx={px(d.n)} cy={py(d.a)} r={3.2} fill={FMM_COLORS.blau} />
        ))}
      </svg>
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> aₙ = 1/n, Ausschnitt n = 1 … 20 ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Grenzwert 0
      </p>
      <Verdikt>
        Jeder Punkt hat eine eigene Stelle auf der n-Achse: a₁ = 1 ganz links, a₂₀ = 0,05 ganz
        rechts. Die Werte rücken zwar immer dichter an die rote Linie, aber ihre Position auf der
        n-Achse hält die Reihenfolge fest – die Folge ist mehr als die Menge ihrer Werte. Dass es
        hinter n = 20 so weitergeht, wissen wir aus 1/n &lt; ε für n &gt; 1/ε, nicht aus dem Bild.
      </Verdikt>
    </div>
  );
}
