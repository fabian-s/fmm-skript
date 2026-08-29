import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, M, Stepper, Verdikt, fmtDe } from "../../../lib";

/**
 * PageRank-Mini-Netz für §8.2: Potenz-Iteration x, Ax, A²x, … auf einem
 * Vier-Seiten-Web konvergiert gegen den PageRank-Vektor x* (Eigenvektor zum
 * Eigenwert 1). Graph-Daten, edgePath() und die Iterationsmechanik sind aus
 * der privaten mml-ch4-App portiert (PageRankWidget.tsx). Sämtliche Texte
 * sind aus §8.2 heraus neu formuliert (Review 8.2: die erste Fassung war
 * eingedeutschte App-Prosa). Farbcode Kapitel 8: Iterierte blau,
 * Einsicht: Wiederholtes Anwenden der Linkmatrix führt zur stationären Verteilung.
 * Farbrollen: Iterierte blau, Grenzwert grün, Fehler rot. Provenienz: Rechenidee
 * aus mml-ch4 portiert, Prosa neu.
 * PRÜFSTATUS: scripts/verify/REV29/08-la-misc-S82.mjs (2026-08-29), Teil von
 * `npm run verify:numbers`. Das Skript bestätigt x* = (1/3, 1/6, 1/3, 1/6) als
 * Fixpunkt von T über zwei Wege (Anwenden von T und Lösen von (T − I)x = 0 mit
 * Summenbedingung), belegt den exakten Halbierungsfaktor q = 1/2 und das
 * alternierende Vorzeichen des Fehlers und prüft, ab welchem Schritt der
 * Konvergenzzweig (Abstand < 5·10⁻⁴) erreicht wird.
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

/** Höchster Schrittindex des Steppers (der Fixpunkt ist längst erreicht). */
const KMAX = 20;

/** Die ganze Folge x, Ax, A²x, … – deterministisch aus dem Schrittindex. */
function lauf(): number[][] {
  const xs = [START];
  for (let k = 1; k <= KMAX; k++) xs.push(step(xs[k - 1]));
  return xs;
}

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
  const [iter, setIter] = useState(0);
  const xs = useMemo(lauf, []);
  const x = xs[iter];
  const delta = Math.max(...x.map((v, i) => Math.abs(v - STAR[i])));
  const converged = delta < 5e-4;

  return (
    <div className="my-2">
      <Aufgabe>
        Klicken wir uns Schritt für Schritt durch die Iteration (und einmal zurück) und
        vergleichen dabei die vier Scores.
      </Aufgabe>
      <p className="mb-2 text-sm">
        Spalte <M>{"j"}</M> von <M>{"\\bA"}</M> hält fest, wie Seite <M>{"j"}</M> ihren
        Score weitergibt: zu gleichen Teilen an jede Seite, auf die sie zeigt. Weil jede
        Spalte sich zu <M>{"1"}</M> summiert, bleibt die Gesamtsumme erhalten, und wir
        wenden <M>{"\\bA"}</M> ohne Normieren an. Die Kreisfläche im Graphen und der
        Balken rechts zeigen beide den Score der jeweiligen Seite.
      </p>
      <div className="flex flex-wrap items-start gap-5">
        <svg
          width={300}
          height={200}
          viewBox="0 0 300 200"
          className="h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
          role="img"
          aria-label={`Das Vier-Seiten-Netz mit den Links a nach b, a nach c, b nach c, c nach a, c nach d und d nach a; die Kreisgröße ist der aktuelle Score, im Schritt ${iter} sind das ${x.map((v, i) => `${NAMES[i]} = ${fmt(v)}`).join(", ")}.`}
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
          <Stepper
            step={iter}
            setStep={setIter}
            max={KMAX}
            className="mb-2"
            narration={`Ein Schritt ist ein Matrix-Vektor-Produkt x ↦ Ax; A⁰x ist die Gleichverteilung.`}
          />
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
                  Der Abstand zu x* ist unter 5 · 10⁻⁴ gefallen: auf vier
                  Nachkommastellen erreicht ist x* = (1/3, 1/6, 1/3, 1/6), der auf Summe 1
                  normierte Eigenvektor von A zum Eigenwert 1. Auf a und c zeigen je zwei
                  Links, auf b und d nur einer – deshalb der Faktor 2.
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
