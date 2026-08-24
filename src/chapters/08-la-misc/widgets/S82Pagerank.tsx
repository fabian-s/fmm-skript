import { useState } from "react";
import { Aufgabe, FMM_COLORS, M, Verdikt, fmtDe } from "../../../lib";

/**
 * PageRank-Mini-Netz für §8.2: Potenz-Iteration x, Ax, A²x, … auf einem
 * Vier-Seiten-Web konvergiert gegen den PageRank-Vektor x* (Eigenvektor zum
 * Eigenwert 1). Graph-Daten, edgePath() und die Iterationsmechanik sind aus
 * der privaten mml-ch4-App portiert (PageRankWidget.tsx). Sämtliche Texte
 * sind aus §8.2 heraus neu formuliert (Review 8.2: die erste Fassung war
 * eingedeutschte App-Prosa). Farbcode Kapitel 8: Iterierte blau,
 * Einsicht: Wiederholtes Anwenden der Linkmatrix führt zur stationären Verteilung.
 * Farbrollen: Iterierte blau, Grenzwert grün, Fehler rot. Provenienz: Rechenidee
 * aus mml-ch4 portiert, Prosa neu; Zahlen: check-widgets.mjs, 2026-08-19.
 */

// Mini-Netz: a→b, a→c, b→c, c→a, c→d, d→a.
// Spalte j der Übergangsmatrix: wohin ein Surfer auf Seite j gleichverteilt klickt.
const T: number[][] = [
  [0, 0, 0.5, 1],
  [0.5, 0, 0, 0],
  [0.5, 1, 0, 0],
  [0, 0, 0.5, 0],
];
const NAMES = ["a", "b", "c", "d"];
const START = [0.25, 0.25, 0.25, 0.25];
// exakter stationärer Vektor (Eigenvektor zu λ = 1), von Hand nachgerechnet
const STAR = [1 / 3, 1 / 6, 1 / 3, 1 / 6];

const { blau: BLUE, gruen: GREEN } = FMM_COLORS;

/** deutsche Dezimalzahl mit Minuszeichen U+2212, wie in den Nachbar-Widgets */
const fmt = fmtDe;

const step = (x: number[]) => T.map((row) => row.reduce((s, v, j) => s + v * x[j], 0));

const POS: [number, number][] = [
  [70, 50],
  [230, 50],
  [230, 150],
  [70, 150],
];
const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 0],
  [2, 3],
  [3, 0],
];

function edgePath([i, j]: [number, number]) {
  const [x1, y1] = POS[i];
  const [x2, y2] = POS[j];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  // Start/Ende um den Knotenradius einrücken; leichte Krümmung trennt die a↔c-Doppelkante
  const r = 22;
  const sx = x1 + ux * r;
  const sy = y1 + uy * r;
  const ex = x2 - ux * r;
  const ey = y2 - uy * r;
  const mx = (sx + ex) / 2 - uy * 14;
  const my = (sy + ey) / 2 + ux * 14;
  return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
}

/** Potenz-Iteration auf dem Vier-Seiten-Netz: x, Ax, A²x, … → PageRank x*. */
export function PagerankDemo() {
  const [x, setX] = useState<number[]>(START);
  const [iter, setIter] = useState(0);

  const doSteps = (k: number) => {
    let y = x;
    for (let i = 0; i < k; i++) y = step(y);
    setX(y);
    setIter(iter + k);
  };
  const delta = Math.max(...x.map((v, i) => Math.abs(v - STAR[i])));
  const converged = delta < 5e-4;

  return (
    <div className="my-2">
      <Aufgabe>Wenden wir die Linkmatrix an und vergleichen die vier Scores nach jedem Schritt.</Aufgabe>
      <p className="mb-2 text-sm sr-only">
        Vier Seiten, sechs Links. Spalte <M>{"j"}</M> von <M>{"\\bA"}</M> hält fest,
        wie Seite <M>{"j"}</M> ihren Score weitergibt: zu gleichen Teilen an jede
        Seite, auf die sie zeigt. Jede Spalte summiert sich damit zu <M>{"1"}</M>,
        und weil die Startscores zusammen <M>{"1"}</M> ergeben, bleibt diese Summe
        erhalten. Wir wenden <M>{"\\bA"}</M> deshalb einfach an, ohne zu normieren;
        die Folge <M>{"\\bx, \\bA\\bx, \\bA^2\\bx, \\dots"}</M> läuft dann auf den
        Fixvektor <M>{"\\bx^*"}</M> mit <M>{"\\bA\\bx^* = \\bx^*"}</M> zu, und die
        Kreise wachsen mit dem Score ihrer Seite. Im Grenzwert bekommen{" "}
        <M>{"a"}</M> und <M>{"c"}</M> doppelt so viel
        wie <M>{"b"}</M> und <M>{"d"}</M>: Auf die ersten beiden zeigen je zwei
        Links, auf die anderen nur einer.
      </p>
      <div className="flex flex-wrap items-start gap-5">
        <svg
          width={300}
          height={200}
          className="rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <defs>
            <marker id="arrPR8" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 z" fill="var(--w-muted)" />
            </marker>
          </defs>
          {EDGES.map((e, k) => (
            <path
              key={k}
              d={edgePath(e)}
              fill="none"
              stroke="var(--w-muted)"
              strokeWidth={1.5}
              markerEnd="url(#arrPR8)"
            />
          ))}
          {POS.map(([px, py], i) => {
            const r = 10 + 40 * x[i];
            return (
              <g key={i}>
                <circle cx={px} cy={py} r={r} fill={converged ? GREEN : BLUE} opacity={0.75} />
                <text x={px} y={py + 4} fontSize={13} textAnchor="middle" fill="white" fontStyle="italic">
                  {NAMES[i]}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="min-w-60 grow text-sm">
          <div className="mb-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => doSteps(1)}
              className="rounded border border-slate-400 bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800"
            >
              A anwenden
            </button>
            <button
              type="button"
              onClick={() => doSteps(10)}
              className="rounded border border-slate-400 bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800"
            >
              × 10
            </button>
            <button
              type="button"
              onClick={() => {
                setX(START);
                setIter(0);
              }}
              className="rounded border border-slate-400 px-3 py-1"
            >
              zurücksetzen
            </button>
          </div>
          {x.map((v, i) => (
            <div key={i} className="my-1 flex items-center gap-2">
              <span className="w-20 font-mono text-xs">
                x_{NAMES[i]} = {fmt(v)}
              </span>
              <div className="h-3 grow rounded bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-3 rounded transition-all duration-300"
                  style={{ width: `${100 * v}%`, background: converged ? GREEN : BLUE }}
                />
              </div>
            </div>
          ))}
          <Verdikt kind={converged ? "ok" : "neutral"}>
            Iteration {iter}
            {converged ? (
              <>
                :{" "}
                <span style={{ color: GREEN, fontWeight: 600 }}>
                  Der Abstand zu x* ist unter 5 · 10⁻⁴ gefallen. Erreicht ist
                  x* = (1/3, 1/6, 1/3, 1/6), der auf Summe 1 normierte Eigenvektor von A
                  zum Eigenwert 1.
                </span>
              </>
            ) : (
              <>
                ; größter Abstand zu x*: {fmt(delta, 4)}. Er halbiert sich in jedem
                Schritt, und die Scores nähern sich x* nicht von einer Seite, sondern
                pendeln um ihre Grenzwerte.
              </>
            )}
          </Verdikt>
        </div>
      </div>
    </div>
  );
}
