/**
 * Konzept-Widget `factorial`.
 *
 * DIE EINE EINSICHT: k! wächst multiplikativ, nicht additiv — auf einer
 * logarithmischen Achse steigt die Punktfolge deshalb immer steiler, statt eine
 * Gerade zu bilden.
 *
 * BEWUSST STATISCH (Muster 11 „Don't build a widget“): Es gibt keinen Parameter,
 * an dem sich zu drehen lohnte; die Tabelle plus der Log-Plot ist die
 * instruktivste Darstellung. Deshalb ist auch das Verdikt zustandsfrei — es
 * beschreibt die sichtbare Relation, nicht einen Interaktionszustand.
 *
 * FARBROLLEN: blau = die Werte k!. Achsen, Ticks und Beschriftungen aus den
 * Theme-Variablen (--w-axis / --w-grid / --w-muted).
 *
 * PROVENIENZ: eigener Aufbau.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify/QA-O0/check-o0.mjs, 2026-08-20):
 *   0! … 6! = 1, 1, 2, 6, 24, 120, 720 (Produktdefinition, per Assertion).
 *   log₁₀ davon = 0; 0; 0,301; 0,778; 1,380; 2,079; 2,857 — der letzte Wert
 *   liegt unter 3, die y-Achse [0; 3] deckt also alle Punkte ab.
 *   Von 3! auf 6! wächst der Wert um den Faktor 720/6 = 120.
 */
import { Aufgabe, FMM_COLORS, fmtDe, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const WERTE = [1, 1, 2, 6, 24, 120, 720];
const W = 300;
const H = 130;
const PAD_L = 28;
const PAD_R = 10;
const PAD_T = 12;
const PAD_B = 26;

export function FactorialTable() {
  const x = (i: number) => PAD_L + (i / (WERTE.length - 1)) * (W - PAD_L - PAD_R);
  const y = (v: number) => H - PAD_B - (Math.log10(v) / 3) * (H - PAD_T - PAD_B);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Vergleichen wir Tabelle und Logarithmus-Plot für die ersten Fakultäten.</Aufgabe>
      <table className={`text-xs ${W_TEXT}`}>
        <tbody>
          <tr>
            <th className="pr-2 text-left">k</th>
            {WERTE.map((_, i) => (
              <td className="px-2" key={i}>
                {i}
              </td>
            ))}
          </tr>
          <tr>
            <th className="pr-2 text-left">k!</th>
            {WERTE.map((v, i) => (
              <td className="px-2" key={i}>
                {v}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-full h-auto"
        role="img"
        aria-label="Logarithmischer Miniplot der Fakultäten 0! bis 6!."
      >
        {[0, 1, 2, 3].map((t) => (
          <g key={t}>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={y(10 ** t)}
              y2={y(10 ** t)}
              stroke={t === 0 ? "var(--w-axis)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1 : 0.6}
            />
            <text
              x={PAD_L - 4}
              y={y(10 ** t) + 3}
              textAnchor="end"
              fontSize={9}
              fill="var(--w-muted)"
            >
              {t}
            </text>
          </g>
        ))}
        <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={y(1)} stroke="var(--w-axis)" />
        <text x={2} y={PAD_T - 3} fontSize={9} fill="var(--w-muted)">
          log₁₀(k!)
        </text>
        {WERTE.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r="3.5" fill={FMM_COLORS.blau} />
            <text
              x={x(i)}
              y={y(1) + 14}
              textAnchor="middle"
              fill="var(--w-muted)"
              fontSize={9}
            >
              {i}
            </text>
          </g>
        ))}
        <text x={W - PAD_R} y={H - 3} textAnchor="end" fontSize={9} fill="var(--w-muted)">
          k
        </text>
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: log₁₀(k!) — eine Gerade wäre reines Zehnerpotenz-Wachstum, hier steigt die Folge
        aber immer steiler.
      </p>
      <Verdikt kind="neutral">
        Von 3! = 6 auf 6! = 720 wächst der Wert um den Faktor 120, während k nur um 3 steigt.
        Selbst auf der logarithmischen Achse werden die Abstände von Punkt zu Punkt größer: das
        ist mehr als exponentielles Wachstum, und genau das zähmt die Nenner k! in
        Taylor-Polynomen. Als feste Tafel gedacht — hier gibt es nichts zu verstellen.
      </Verdikt>
    </div>
  );
}
