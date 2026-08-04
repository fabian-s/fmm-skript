/**
 * §7.1 Kleinste Quadrate: Problem und Motivation.
 * Grundlage: Folien 07-kq.Rmd, Auftakt (Vorkenntnisse) und Block
 * „Recap: Kleinste Quadrate" (Zeilen 1–154). Prosa eigenständig
 * ausformuliert; Widget-Code adaptiert aus interactive/heath-ch3
 * (QuadraticFitWidget, OrthogonalityWidget — Labels deutsch).
 */
import { useState } from "react";
import {
  ConceptLink,
  EnvBlock,
  Eq,
  ExpandedReading,
  M,
  MD,
  Proof,
  PStep,
  Slider,
} from "../../lib";

/* FMM-Palette (identisch zu den \cb*-Makros in src/fmm-macros.ts) */
const FMM = {
  red: "#D55E00",
  blue: "#0072B2",
  green: "#009E73",
  orange: "#E69F00",
  purple: "#9E57D5",
  slate: "#334155",
};

/* ------------------------------------------------------------------ */
/* SVG-Helfer (adaptiert aus heath-ch3/S32.tsx)                        */
/* ------------------------------------------------------------------ */

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 9): string {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const p = (a: number) => `${x2 - size * Math.cos(ang + a)},${y2 - size * Math.sin(ang + a)}`;
  return `${x2},${y2} ${p(0.42)} ${p(-0.42)}`;
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  dash,
  width = 2.2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dash?: string;
  width?: number;
}) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash} />
      <polygon points={arrowHead(x1, y1, x2, y2)} fill={color} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Widget 1: Regressionsgerade von Hand anpassen                       */
/* (Code-Gerüst: heath-ch3 QuadraticFitWidget, hier Geraden-Fit)       */
/* ------------------------------------------------------------------ */

/** Fiktive Daten: Wohnfläche in m² und Kaufpreis in 1000 €. */
const REG_X = [31, 42, 48, 55, 62, 68, 74, 85, 92, 103, 110, 120];
const REG_Y = [175, 230, 235, 285, 315, 320, 370, 420, 440, 490, 525, 565];

function regSsr(b0: number, b1: number): number {
  let s = 0;
  for (let i = 0; i < REG_X.length; i++) {
    const d = REG_Y[i] - (b0 + b1 * REG_X[i]);
    s += d * d;
  }
  return s;
}

/** KQ-Lösung der einfachen linearen Regression (geschlossene Formel). */
function lsLine(): { b0: number; b1: number; ssr: number } {
  const n = REG_X.length;
  let sx = 0,
    sy = 0,
    sxx = 0,
    sxy = 0;
  for (let i = 0; i < n; i++) {
    sx += REG_X[i];
    sy += REG_Y[i];
    sxx += REG_X[i] * REG_X[i];
    sxy += REG_X[i] * REG_Y[i];
  }
  const b1 = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const b0 = (sy - b1 * sx) / n;
  return { b0, b1, ssr: regSsr(b0, b1) };
}

const REG_FIT = lsLine();

const RW = 460;
const RH = 300;
const RML = 44;
const RMB = 26;
const RMT = 8;
const RMR = 8;
const RX0 = 0;
const RX1 = 130;
const RY0 = 0;
const RY1 = 650;
const rpx = (x: number) => RML + ((x - RX0) / (RX1 - RX0)) * (RW - RML - RMR);
const rpy = (y: number) => RMT + ((RY1 - y) / (RY1 - RY0)) * (RH - RMT - RMB);

function RegressionWidget() {
  const [b0, setB0] = useState(100);
  const [b1, setB1] = useState(2);
  const [showLS, setShowLS] = useState(false);
  const ssr = regSsr(b0, b1);
  const linePath = (a0: number, a1: number) =>
    `M${rpx(RX0).toFixed(1)},${rpy(a0 + a1 * RX0).toFixed(1)} L${rpx(RX1).toFixed(1)},${rpy(a0 + a1 * RX1).toFixed(1)}`;
  const xTicks = [0, 25, 50, 75, 100, 125];
  const yTicks = [0, 100, 200, 300, 400, 500, 600];

  return (
    <div>
      <div className="overflow-x-auto">
        <svg
          width={RW}
          height={RH}
          viewBox={`0 0 ${RW} ${RH}`}
          className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <defs>
            <clipPath id="s71-reg-clip">
              <rect x={RML} y={RMT} width={RW - RML - RMR} height={RH - RMT - RMB} />
            </clipPath>
          </defs>
          {/* Achsen */}
          <line x1={RML} y1={rpy(0)} x2={RW - RMR} y2={rpy(0)} stroke="#94a3b8" />
          <line x1={rpx(0)} y1={RMT} x2={rpx(0)} y2={RH - RMB} stroke="#94a3b8" />
          {xTicks.map((t) => (
            <g key={`x${t}`}>
              <line x1={rpx(t)} y1={rpy(0)} x2={rpx(t)} y2={rpy(0) + 4} stroke="#94a3b8" />
              <text x={rpx(t)} y={RH - 8} textAnchor="middle" fontSize={10} fill="#64748b">
                {t}
              </text>
            </g>
          ))}
          {yTicks.map((y) => (
            <g key={`y${y}`}>
              <line x1={rpx(0) - 4} y1={rpy(y)} x2={rpx(0)} y2={rpy(y)} stroke="#94a3b8" />
              <text x={RML - 7} y={rpy(y) + 3} textAnchor="end" fontSize={10} fill="#64748b">
                {y}
              </text>
            </g>
          ))}
          <text x={RW - RMR - 4} y={rpy(0) - 6} textAnchor="end" fontSize={11} fill="#64748b">
            Fläche x (m²)
          </text>
          <text x={RML + 8} y={RMT + 10} fontSize={11} fill="#64748b">
            Preis y (Tsd. €)
          </text>
          <g clipPath="url(#s71-reg-clip)">
            {/* Residuen: Datenpunkt -> Nutzer-Gerade */}
            {REG_X.map((x, i) => (
              <line
                key={`r${i}`}
                x1={rpx(x)}
                y1={rpy(REG_Y[i])}
                x2={rpx(x)}
                y2={rpy(b0 + b1 * x)}
                stroke={FMM.purple}
                strokeWidth={1.5}
              />
            ))}
            {/* KQ-Gerade (auf Wunsch) */}
            {showLS && (
              <path d={linePath(REG_FIT.b0, REG_FIT.b1)} fill="none" stroke={FMM.green} strokeWidth={2} strokeDasharray="6 4" />
            )}
            {/* Nutzer-Gerade */}
            <path d={linePath(b0, b1)} fill="none" stroke={FMM.blue} strokeWidth={2} />
            {/* Datenpunkte */}
            {REG_X.map((x, i) => (
              <circle key={`p${i}`} cx={rpx(x)} cy={rpy(REG_Y[i])} r={3} fill={FMM.slate} />
            ))}
          </g>
        </svg>
      </div>
      <div className="mt-2">
        <Slider label="β₀ (Achsenabschnitt)" value={b0} onChange={setB0} min={-100} max={250} step={1} fmt={(v) => v.toFixed(0)} />
        <Slider label="β₁ (Steigung)" value={b1} onChange={setB1} min={0} max={8} step={0.05} />
      </div>
      <p className="mt-2 text-sm">
        Aktuelle Gerade:{" "}
        <M>{`\\wh{y} = ${b0.toFixed(0)} + ${b1.toFixed(2)} \\cdot x`}</M>
      </p>
      <p className="text-sm">
        Summe der quadrierten Residuen (Gesamtlänge² der{" "}
        <span className="font-semibold" style={{ color: FMM.purple }}>
          violetten Strecken
        </span>
        ): <span className="font-mono font-semibold" style={{ color: FMM.orange }}>{ssr.toFixed(0)}</span>
        {showLS && (
          <>
            {" "}
            — KQ-Optimum:{" "}
            <span className="font-mono font-semibold" style={{ color: FMM.green }}>
              {REG_FIT.ssr.toFixed(0)}
            </span>{" "}
            bei <M>{`\\wh{\\bbeta} \\approx (${REG_FIT.b0.toFixed(1)},\\; ${REG_FIT.b1.toFixed(2)})^\\top`}</M>
          </>
        )}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-slate-200 px-2 py-1 text-xs hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
          onClick={() => setShowLS((s) => !s)}
        >
          KQ-Gerade {showLS ? "ausblenden" : "einblenden"}
        </button>
        <button
          type="button"
          className="rounded bg-slate-200 px-2 py-1 text-xs hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
          onClick={() => {
            setB0(REG_FIT.b0);
            setB1(REG_FIT.b1);
            setShowLS(true);
          }}
        >
          Regler auf KQ-Lösung setzen
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Widget 2: Projektion — senkrechtes Residuum in R²                   */
/* (Code adaptiert aus heath-ch3 OrthogonalityWidget)                  */
/* ------------------------------------------------------------------ */

/** Spielzeugproblem: a = (3,1)ᵀ, b = (1,2)ᵀ, Kandidat y = x·a. */
function ProjektionWidget() {
  const [x, setX] = useState(0.1);
  const a: [number, number] = [3, 1];
  const b: [number, number] = [1, 2];
  const y: [number, number] = [a[0] * x, a[1] * x];
  const r: [number, number] = [b[0] - y[0], b[1] - y[1]];
  const atr = a[0] * r[0] + a[1] * r[1]; // = 5 - 10x
  const rn = Math.hypot(r[0], r[1]);
  const an = Math.hypot(a[0], a[1]);
  const cosAng = rn > 1e-9 ? atr / (an * rn) : 0;
  const angDeg = (Math.acos(Math.max(-1, Math.min(1, cosAng))) * 180) / Math.PI;
  const perp = Math.abs(cosAng) < 0.04;
  // Projektion b̂ = ((aᵀb)/(aᵀa))·a = 0.5·a = (1.5, 0.5)
  const bh: [number, number] = [1.5, 0.5];

  // Weltfenster: X in [-0.6, 4.2], Y in [-1.2, 2.6]
  const W = 360;
  const H = 285;
  const sx = (u: number) => ((u + 0.6) / 4.8) * W;
  const sy = (v: number) => H - ((v + 1.2) / 3.8) * H;
  // Marker für den rechten Winkel zwischen col(A)-Richtung und r
  const ah: [number, number] = [a[0] / an, a[1] / an];
  const rh: [number, number] = rn > 1e-9 ? [r[0] / rn, r[1] / rn] : [0, 0];
  const m = 0.16;
  const q1: [number, number] = [y[0] - m * ah[0], y[1] - m * ah[1]];
  const q2: [number, number] = [q1[0] + m * rh[0], q1[1] + m * rh[1]];
  const q3: [number, number] = [y[0] + m * rh[0], y[1] + m * rh[1]];

  return (
    <div className="flex flex-wrap items-start gap-4">
      <div className="inline-block text-[10px] text-slate-500 dark:text-slate-400">
        <div className="mb-0.5 text-[11px]">x₂ ↑</div>
        <svg width={W} height={H} className="rounded border border-slate-300 bg-white dark:border-slate-600">
          {/* Achsen mit ganzzahligen Ticks */}
          <line x1={sx(-0.6)} y1={sy(0)} x2={sx(4.2)} y2={sy(0)} stroke="#cbd5e1" />
          <line x1={sx(0)} y1={sy(-1.2)} x2={sx(0)} y2={sy(2.6)} stroke="#cbd5e1" />
          {[1, 2, 3, 4].map((t) => (
            <g key={`x${t}`}>
              <line x1={sx(t)} y1={sy(0) - 3} x2={sx(t)} y2={sy(0) + 3} stroke="#94a3b8" />
              <text x={sx(t)} y={sy(0) + 13} textAnchor="middle" fill="#64748b">
                {t}
              </text>
            </g>
          ))}
          {[-1, 1, 2].map((t) => (
            <g key={`y${t}`}>
              <line x1={sx(0) - 3} y1={sy(t)} x2={sx(0) + 3} y2={sy(t)} stroke="#94a3b8" />
              <text x={sx(0) - 6} y={sy(t) + 3} textAnchor="end" fill="#64748b">
                {t}
              </text>
            </g>
          ))}
          {/* col(A) = span{a} */}
          <line x1={sx(-0.54)} y1={sy(-0.18)} x2={sx(4.14)} y2={sy(1.38)} stroke="#94a3b8" strokeWidth={1.5} />
          <text x={sx(3.35)} y={sy(1.35)} fill="#64748b" fontSize="11">
            col(𝑨)
          </text>
          {/* Zielpunkt b̂ = Projektion von b */}
          <circle cx={sx(bh[0])} cy={sy(bh[1])} r={3.5} fill="none" stroke={FMM.green} strokeWidth={2} />
          <text x={sx(bh[0]) + 6} y={sy(bh[1]) - 7} fill={FMM.green} fontSize="12" fontStyle="italic">
            b̂
          </text>
          {/* rechter Winkel nur, wenn wirklich orthogonal */}
          {perp && (
            <polyline
              points={`${sx(q1[0])},${sy(q1[1])} ${sx(q2[0])},${sy(q2[1])} ${sx(q3[0])},${sy(q3[1])}`}
              fill="none"
              stroke="#475569"
              strokeWidth={1.3}
            />
          )}
          {/* Vektoren */}
          <Arrow x1={sx(0)} y1={sy(0)} x2={sx(b[0])} y2={sy(b[1])} color={FMM.slate} />
          <text x={sx(b[0]) - 16} y={sy(b[1]) - 6} fill={FMM.slate} fontSize="13" fontStyle="italic">
            𝒃
          </text>
          <Arrow x1={sx(0)} y1={sy(0)} x2={sx(y[0])} y2={sy(y[1])} color={FMM.blue} />
          <text x={sx(y[0]) + 6} y={sy(y[1]) + 14} fill={FMM.blue} fontSize="13" fontStyle="italic">
            𝑨x = x·𝒂
          </text>
          <Arrow x1={sx(y[0])} y1={sy(y[1])} x2={sx(b[0])} y2={sy(b[1])} color={FMM.purple} dash="6 5" />
          <text
            x={sx((y[0] + b[0]) / 2) + 8}
            y={sy((y[1] + b[1]) / 2)}
            fill={FMM.purple}
            fontSize="13"
            fontStyle="italic"
          >
            𝒓
          </text>
        </svg>
        <div className="mt-0.5 text-center text-[11px]">x₁ →</div>
      </div>
      <div className="min-w-[220px] grow text-sm">
        <Slider label="x" value={x} onChange={setX} min={0} max={1.2} step={0.01} />
        <ul className="ml-4 list-disc space-y-1 font-mono text-xs">
          <li>aᵀr = {atr.toFixed(2)}</li>
          <li>‖r‖₂² = {(rn * rn).toFixed(3)}</li>
          <li>Winkel(a, r) = {angDeg.toFixed(1)}°</li>
        </ul>
        <p className="mt-2">
          Kleiner geht ein KQ-Problem nicht: <M>{"m = 2"}</M>, <M>{"n = 1"}</M>. Die Matrix hat
          als einzige Spalte <M>{"\\ba = (3, 1)^\\top"}</M>, gesucht ist ein einzelner Skalar{" "}
          <M>{"x"}</M>, und <M>{"\\col(\\bA)"}</M> ist die graue Ursprungsgerade. Rechnen wir das
          Skalarprodukt mit dem Residuum <M>{"\\cpurp{\\br} = \\bb - x\\ba"}</M> für{" "}
          <M>{"\\bb = (1, 2)^\\top"}</M> aus:{" "}
          <M>{"\\ba^\\top \\cpurp{\\br} = \\ba^\\top\\bb - x\\,\\ba^\\top\\ba = 5 - 10x"}</M>.
          Dieser Wert wird genau bei <M>{"x = 1/2"}</M> null. Dort steht{" "}
          <M>{"\\cpurp{\\br}"}</M> also senkrecht auf <M>{"\\col(\\bA)"}</M> (der Winkelmarker
          erscheint), <M>{"\\cblue{\\bA\\bx}"}</M> fällt auf die Projektion{" "}
          <M>{"\\cgreen{\\wh{\\bb}} = \\tfrac{1}{2}\\ba = (1{,}5,\\; 0{,}5)^\\top"}</M>, und{" "}
          <M>{"\\left\\| \\cpurp{\\br} \\right\\|_2^2"}</M> ist so klein wie möglich — links und
          rechts davon kippt das Residuum aus der Senkrechten und wird wieder länger.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Selbsttest-Quiz (Folien 07-kq, Folie „Quiz")                        */
/* ------------------------------------------------------------------ */

const QUIZ: { statement: React.ReactNode; wahr: boolean; expl: React.ReactNode }[] = [
  {
    statement: <M>{"\\bA \\bA\\pinv = \\bI_m"}</M>,
    wahr: false,
    expl: (
      <>
        <M>{"\\bA\\bA\\pinv = \\bA(\\bA^\\top\\bA)^{-1}\\bA^\\top"}</M> ist die
        Projektionsmatrix auf <M>{"\\col(\\bA)"}</M> — die Identität auf <M>{"\\R^m"}</M> ist das
        nur, wenn <M>{"\\col(\\bA) = \\R^m"}</M> gilt, also für invertierbares quadratisches{" "}
        <M>{"\\bA"}</M>. (Richtig ist dagegen stets <M>{"\\bA\\pinv\\bA = \\bI_n"}</M> bei vollem
        Spaltenrang.)
      </>
    ),
  },
  {
    statement: <M>{"\\bA \\bA\\pinv \\bb = \\proj_{\\col(\\bA)} \\bb"}</M>,
    wahr: true,
    expl: (
      <>
        <M>{"\\bA\\bA\\pinv\\bb = \\bA\\wh{\\bx} = \\cgreen{\\wh{\\bb}}"}</M>: die KQ-Lösung
        bildet <M>{"\\bb"}</M> gerade auf seine Projektion in den Spaltenraum ab (Satz 7.1.4).
      </>
    ),
  },
  {
    statement: <M>{"\\br = \\bb - \\bA\\wh{\\bx} \\perp \\col(\\bA)"}</M>,
    wahr: true,
    expl: (
      <>
        Das ist genau die Aussage der Normalengleichungen:{" "}
        <M>{"\\bA^\\top(\\bb - \\bA\\wh{\\bx}) = \\bnull"}</M> heißt, das Residuum steht senkrecht
        auf allen Spalten von <M>{"\\bA"}</M>.
      </>
    ),
  },
  {
    statement: (
      <>
        <M>{"\\bb = \\proj_{V} \\bb + \\proj_{V^\\perp} \\bb"}</M> für jeden Untervektorraum{" "}
        <M>{"V \\subseteq \\R^m"}</M>
      </>
    ),
    wahr: true,
    expl: (
      <>
        Wegen <M>{"\\R^m = V \\oplus V^\\perp"}</M> zerfällt jeder Vektor eindeutig in seine
        Anteile in <M>{"V"}</M> und im orthogonalen Komplement <M>{"V^\\perp"}</M>.
      </>
    ),
  },
];

function QuizWidget() {
  const [chosen, setChosen] = useState<(boolean | null)[]>(QUIZ.map(() => null));
  const pick = (i: number, v: boolean) =>
    setChosen((c) => c.map((old, j) => (i === j ? v : old)));
  return (
    <div className="space-y-3">
      {QUIZ.map((q, i) => {
        const c = chosen[i];
        const answered = c !== null;
        const correct = answered && c === q.wahr;
        return (
          <div key={i} className="rounded border border-slate-200 p-3 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grow">{q.statement}</span>
              <span className="flex gap-2">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      answered && c === v
                        ? correct
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                        : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
                    }`}
                    onClick={() => pick(i, v)}
                  >
                    {v ? "wahr" : "falsch"}
                  </button>
                ))}
              </span>
            </div>
            {answered && (
              <p className={`mt-2 text-sm ${correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
                {correct ? "Richtig! " : `Leider nein — die Aussage ist ${q.wahr ? "wahr" : "falsch"}. `}
                <span className="text-slate-600 dark:text-slate-300">{q.expl}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Der Abschnitt                                                       */
/* ------------------------------------------------------------------ */

const P = "my-3 max-w-prose leading-relaxed";
const H3 = "mt-6 text-lg font-semibold";

export function S71() {
  return (
    <>
      <p className="text-sm italic text-slate-500 dark:text-slate-400">
        Grundlage: Folien 07-kq, Auftakt und „Recap: Kleinste Quadrate".
      </p>

      <p className={P}>
        In den bisherigen Kapiteln haben wir{" "}
        <ConceptLink id="linear-system">lineare Gleichungssysteme</ConceptLink>{" "}
        <M>{"\\bA\\bx = \\bb"}</M> mit quadratischer Matrix gelöst — genauso viele Gleichungen wie
        Unbekannte. In der Statistik ist die Lage fast immer anders: Wir haben{" "}
        <em>viel mehr</em> Beobachtungen als Modellparameter, und die Beobachtungen sind
        fehlerbehaftet. Ein Gleichungssystem mit mehr Gleichungen als Unbekannten
        (<em>überbestimmt</em>, engl. <em>overdetermined</em>) hat in aller Regel gar keine exakte
        Lösung. Was tun? Wir geben den Anspruch auf, alle Gleichungen exakt zu erfüllen, und
        suchen stattdessen den Vektor, der sie <em>möglichst gut</em> erfüllt — gemessen an der{" "}
        <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink> des Fehlers. Das ist die{" "}
        <em>Methode der Kleinsten Quadrate</em> (engl. <em>least squares</em>), das Arbeitspferd
        der gesamten Regressionsrechnung. Dieses Kapitel behandelt, wie man solche Probleme{" "}
        <em>numerisch</em> löst: stabil, effizient und mit kontrollierbarem Fehler.
      </p>
      <p className={P}>
        Wir bauen dabei auf früheren Kapiteln auf:{" "}
        <ConceptLink id="condition-number">Kondition und Konditionszahl</ConceptLink>{" "}
        <M>{"\\kappa(\\bA)"}</M>, <ConceptLink id="norm">Matrixnormen</ConceptLink> (besonders{" "}
        <M>{"\\|\\cdot\\|_2"}</M>),{" "}
        <ConceptLink id="orthogonal-matrix">Orthogonalmatrizen</ConceptLink>, die{" "}
        <ConceptLink id="lu-decomposition">LU-</ConceptLink> und{" "}
        <ConceptLink id="cholesky-factorization">Cholesky-Zerlegung</ConceptLink> sowie die{" "}
        <ConceptLink id="singular-value-decomposition">Singulärwertzerlegung</ConceptLink>{" "}
        <M>{"\\bA = \\bU\\bSigma\\bV^\\top"}</M> (auch in reduzierter Form) mit der{" "}
        <ConceptLink id="pseudoinverse">Pseudoinversen</ConceptLink> <M>{"\\bA\\pinv"}</M>. Aus
        der linearen Algebra brauchen wir{" "}
        <ConceptLink id="projection">orthogonale Projektionen</ConceptLink> auf{" "}
        <ConceptLink id="subspace">Unterräume</ConceptLink> und die{" "}
        <ConceptLink id="normal-equations">Normalengleichungen</ConceptLink>, aus der Statistik
        das <ConceptLink id="linear-regression">lineare Regressionsmodell</ConceptLink> und die
        Methode der Kleinsten Quadrate (OLS), die wir hier aus numerischer Sicht neu betrachten.
      </p>

      <h3 className={H3} id="sec-7.1-problem">
        Vom Gleichungssystem zum Ausgleichsproblem
      </h3>

      <EnvBlock kind="Definition" label="7.1.1 (Kleinste-Quadrate-Problem, KQ-Problem)">
        <p>
          Gegeben seien eine Matrix <M>{"\\bA \\in \\R^{m \\times n}"}</M> und ein Vektor{" "}
          <M>{"\\bb \\in \\R^m"}</M>. Gesucht ist ein Vektor <M>{"\\wh{\\bx} \\in \\R^n"}</M>,
          der die Norm des <em>Residuums</em> minimiert:
        </p>
        <MD>{"\\wh{\\bx} \\in \\argmin_{\\bx \\in \\R^n} \\left\\| \\bA\\bx - \\bb \\right\\|_2\\,."}</MD>
      </EnvBlock>

      <p className={P}>
        Da <M>{"t \\mapsto t^2"}</M> auf <M>{"[0, \\infty)"}</M> streng monoton wächst, können wir
        genauso gut <M>{"\\left\\| \\bA\\bx - \\bb \\right\\|_2^2"}</M> minimieren — dieselben
        Minimalstellen, aber ohne Wurzel. Ausgeschrieben ist das eine Summe von Quadraten,
      </p>
      <MD>{"\\left\\| \\bA\\bx - \\bb \\right\\|_2^2 = \\sum_{i=1}^m \\left( (\\bA\\bx)_i - b_i \\right)^2,"}</MD>
      <p className={P}>daher der Name der Methode.</p>

      <EnvBlock kind="Bemerkung" label="7.1.2">
        <p>
          Hat das Gleichungssystem <M>{"\\bA\\bx = \\bb"}</M> eine exakte Lösung{" "}
          <M>{"\\bx^*"}</M>, dann gilt <M>{"\\left\\| \\bA\\bx^* - \\bb \\right\\|_2 = 0"}</M>,
          und <M>{"\\bx^*"}</M> löst automatisch auch das KQ-Problem — das KQ-Problem
          verallgemeinert also das Lösen von Gleichungssystemen. Interessant ist es vor allem für
          „Gleichungssysteme" <M>{"\\bA\\bx \\approx \\bb"}</M>, die <em>keine</em> exakte Lösung
          besitzen: typischerweise überbestimmte Systeme mit <M>{"m > n"}</M>, bei denen{" "}
          <M>{"\\bb"}</M> wegen Messfehlern nicht im{" "}
          <ConceptLink id="span">Spaltenraum</ConceptLink> von <M>{"\\bA"}</M> liegt.
        </p>
      </EnvBlock>

      <h3 className={H3} id="sec-7.1-motivation">
        Motivation: Regression und Ausgleichsrechnung
      </h3>

      <p className={P}>
        Warum ist gerade dieses Problem so wichtig? Weil die KQ-Methode das Fundament von
        Statistik und Machine Learning ist: Jedes Mal, wenn wir ein lineares Modell an Daten
        anpassen, lösen wir ein KQ-Problem.
      </p>

      <EnvBlock kind="Beispiel" label="7.1.3 (Lineare Regression)">
        <p>
          Wir wollen Immobilienpreise anhand der Wohnfläche vorhersagen. Unsere Daten sind{" "}
          <M>{"n"}</M> Beobachtungen <M>{"(x_i, y_i)"}</M> mit <M>{"x_i"}</M> = Fläche in{" "}
          <M>{"m^2"}</M> und <M>{"y_i"}</M> = Preis in €. Als Modell wählen wir eine Gerade mit
          Fehlerterm <M>{"\\epsilon_i"}</M>:
        </p>
        <MD>{"y_i = \\beta_0 + \\beta_1 x_i + \\epsilon_i, \\qquad i = 1, \\ldots, n."}</MD>
        <p>
          In Matrixform lauten die <M>{"n"}</M> Modellgleichungen{" "}
          <M>{"\\bb \\approx \\bA\\bbeta"}</M> mit
        </p>
        <MD>
          {"\\cbred{\\bA} = \\begin{pmatrix} 1 & x_1 \\\\ 1 & x_2 \\\\ \\vdots & \\vdots \\\\ 1 & x_n \\end{pmatrix}, \\qquad \\bb = \\begin{pmatrix} y_1 \\\\ y_2 \\\\ \\vdots \\\\ y_n \\end{pmatrix}, \\qquad \\cblue{\\bbeta} = \\begin{pmatrix} \\beta_0 \\\\ \\beta_1 \\end{pmatrix}."}
        </MD>
        <p>
          Sobald <M>{"n > 2"}</M> Datenpunkte nicht alle exakt auf einer gemeinsamen Geraden
          liegen — bei verrauschten Messungen praktisch immer —, liegt <M>{"\\bb"}</M> nicht im
          Spaltenraum von <M>{"\\cbred{\\bA}"}</M>: Kein Parameterpaar{" "}
          <M>{"(\\beta_0, \\beta_1)"}</M> erfüllt alle <M>{"n"}</M> Gleichungen zugleich. Die
          KQ-Lösung
        </p>
        <MD>
          {"\\cblue{\\wh{\\bbeta}} = (\\cbred{\\bA}^\\top\\cbred{\\bA})^{-1} \\cbred{\\bA}^\\top \\bb"}
        </MD>
        <p>
          minimiert stattdessen die Summe der quadrierten Abweichungen{" "}
          <M>{"\\sumin \\left( y_i - \\beta_0 - \\beta_1 x_i \\right)^2 = \\left\\| \\cbred{\\bA}\\cblue{\\bbeta} - \\bb \\right\\|_2^2"}</M>{" "}
          — das ist genau der Kleinste-Quadrate-Schätzer (OLS) aus der Einführungsvorlesung.
          Woher die Lösungsformel kommt, klären die Sätze 7.1.5 und 7.1.7 unten.
        </p>
      </EnvBlock>

      <p className={P}>
        Die lineare Regression ist nur der Anfang. KQ-Probleme stecken auch in{" "}
        <em>generalisierten linearen Modellen</em> und <em>additiven Modellen</em> (dort löst man
        iterativ gewichtete KQ-Probleme), im Training{" "}
        <ConceptLink id="neural-network">neuronaler Netze</ConceptLink> (der quadratische
        Verlust ist ein KQ-Kriterium), in der Computer Vision (Kamerakalibrierung,
        3D-Rekonstruktion aus 2D-Bildern), im Signal Processing (De-Noising, Signalschätzung)
        und in der Geodäsie (GPS-Positionsbestimmung gleicht widersprüchliche Distanzmessungen
        aus). Wer KQ-Probleme schnell und stabil lösen kann, hat also einen Universalschlüssel
        in der Hand.
      </p>

      <ExpandedReading title="Regressionsgerade von Hand anpassen">
        <p className="my-2">
          Jeder Punkt ist ein (fiktiver) Wohnungsverkauf: Fläche gegen Preis in Tsd. €. Die{" "}
          <span className="font-semibold" style={{ color: FMM.blue }}>
            blaue Gerade
          </span>{" "}
          gehört zum aktuell eingestellten Parameterpaar <M>{"(\\beta_0, \\beta_1)"}</M>, jede{" "}
          <span className="font-semibold" style={{ color: FMM.purple }}>
            violette Strecke
          </span>{" "}
          zeigt ein Residuum <M>{"y_i - \\beta_0 - \\beta_1 x_i"}</M>. Probieren wir aus, wie
          klein wir die Summe der Residuen<em>quadrate</em> mit den beiden Reglern bekommen — und
          vergleichen dann mit der KQ-Geraden. Besser als sie kann keine Wahl von{" "}
          <M>{"(\\beta_0, \\beta_1)"}</M> abschneiden, denn sie löst genau das
          Minimierungsproblem aus Definition 7.1.1.
        </p>
        <RegressionWidget />
        <p className="my-2 text-sm">
          Auffällig ist auch, wie <em>empfindlich</em> das Kriterium auf große Residuen reagiert:
          Quadrieren bestraft einen doppelt so großen Fehler viermal so stark. Deshalb zieht die
          KQ-Gerade spürbar zu Ausreißern hin — ein statistischer Preis für die schöne
          Geometrie und die effizienten Algorithmen, die wir in diesem Kapitel entwickeln.
        </p>
      </ExpandedReading>

      <h3 className={H3} id="sec-7.1-geometrie">
        Die Geometrie: Projektion auf den Spaltenraum
      </h3>

      <p className={P}>
        Der Schlüssel zum KQ-Problem ist ein Perspektivwechsel. Während <M>{"\\bx"}</M> alle
        Vektoren in <M>{"\\R^n"}</M> durchläuft, durchläuft <M>{"\\cblue{\\bA\\bx}"}</M> genau
        den <ConceptLink id="span">Spaltenraum</ConceptLink>{" "}
        <M>{"\\col(\\bA) \\subseteq \\R^m"}</M>, also alle{" "}
        <ConceptLink id="linear-combination">Linearkombinationen</ConceptLink> der Spalten von{" "}
        <M>{"\\bA"}</M>. Das KQ-Problem fragt daher: Welcher Punkt des Unterraums{" "}
        <M>{"\\col(\\bA)"}</M> liegt am nächsten an <M>{"\\bb"}</M>? Aus der linearen Algebra
        wissen wir: der Fußpunkt des Lots, also die{" "}
        <ConceptLink id="projection">orthogonale Projektion</ConceptLink> von <M>{"\\bb"}</M> auf{" "}
        <M>{"\\col(\\bA)"}</M>. Das folgende Resultat macht diese Anschauung präzise.
      </p>

      <EnvBlock kind="Satz" label="7.1.4 (KQ-Lösung als Projektion)">
        <p>
          Die Lösungsmenge des KQ-Problems zu <M>{"\\bA"}</M> und <M>{"\\bb"}</M> gleicht der
          Lösungsmenge des linearen Gleichungssystems
        </p>
        <MD>
          {"\\bA\\wh{\\bx} = \\cgreen{\\wh{\\bb}} \\qquad \\text{mit } \\cgreen{\\wh{\\bb}} = \\proj_{\\col(\\bA)} \\bb\\,."}
        </MD>
      </EnvBlock>

      <Proof>
        <PStep
          why={
            <>
              <M>{"\\R^m = \\col(\\bA) \\oplus \\col(\\bA)^\\perp"}</M>: Zerlegung in Unterraum
              und{" "}
              <ConceptLink id="orthogonal-complement">orthogonales Komplement</ConceptLink>{" "}
              existiert und ist eindeutig
            </>
          }
        >
          <p>
            Wir zerlegen <M>{"\\bb"}</M> orthogonal bezüglich <M>{"S := \\col(\\bA)"}</M>:
          </p>
          <MD>
            {"\\bb = \\cgreen{\\wh{\\bb}} + \\cpurp{\\br}, \\qquad \\cgreen{\\wh{\\bb}} = \\proj_{S} \\bb \\in S, \\quad \\cpurp{\\br} \\perp S\\,."}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\cblue{\\bA\\bx} \\in S"}</M> und <M>{"\\cgreen{\\wh{\\bb}} \\in S"}</M>;{" "}
              <M>{"S"}</M> ist ein <ConceptLink id="subspace">Untervektorraum</ConceptLink>, also
              liegt auch die Differenz in <M>{"S"}</M>
            </>
          }
        >
          <p>
            Für ein beliebiges <M>{"\\bx \\in \\R^n"}</M> schreiben wir das Residuum als
          </p>
          <MD>
            {"\\bb - \\cblue{\\bA\\bx} = \\underbrace{\\left( \\cgreen{\\wh{\\bb}} - \\cblue{\\bA\\bx} \\right)}_{\\in\\, S} + \\underbrace{\\cpurp{\\br}}_{\\perp\\, S}\\,."}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Satz des Pythagoras: für <M>{"\\bu \\perp \\bv"}</M> gilt{" "}
              <M>{"\\left\\| \\bu + \\bv \\right\\|_2^2 = \\left\\| \\bu \\right\\|_2^2 + \\left\\| \\bv \\right\\|_2^2"}</M>
            </>
          }
        >
          <MD>
            {"\\left\\| \\bb - \\cblue{\\bA\\bx} \\right\\|_2^2 = \\left\\| \\cgreen{\\wh{\\bb}} - \\cblue{\\bA\\bx} \\right\\|_2^2 + \\left\\| \\cpurp{\\br} \\right\\|_2^2 \\;\\geq\\; \\left\\| \\cpurp{\\br} \\right\\|_2^2\\,."}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\left\\| \\bv \\right\\|_2 = 0 \\quequiv \\bv = \\bnull"}</M>{" "}
              (Definitheit der Norm)
            </>
          }
        >
          <p>
            Die untere Schranke <M>{"\\left\\| \\cpurp{\\br} \\right\\|_2^2"}</M> hängt nicht von{" "}
            <M>{"\\bx"}</M> ab, und Gleichheit gilt genau für{" "}
            <M>{"\\cblue{\\bA\\bx} = \\cgreen{\\wh{\\bb}}"}</M>. Also minimiert{" "}
            <M>{"\\bx"}</M> das KQ-Kriterium genau dann, wenn{" "}
            <M>{"\\bA\\bx = \\cgreen{\\wh{\\bb}}"}</M> gilt.
          </p>
        </PStep>
      </Proof>

      <p className={P}>
        Der Beweis zeigt mehr als die Behauptung: Das optimale Residuum ist genau der Anteil{" "}
        <M>{"\\cpurp{\\br}"}</M> von <M>{"\\bb"}</M>, der <em>senkrecht</em> auf{" "}
        <M>{"\\col(\\bA)"}</M> steht — der Teil der Daten, den das Modell prinzipiell nicht
        erklären kann. Vorsicht: Das Gleichungssystem{" "}
        <M>{"\\bA\\wh{\\bx} = \\cgreen{\\wh{\\bb}}"}</M> ist stets lösbar (denn{" "}
        <M>{"\\cgreen{\\wh{\\bb}} \\in \\col(\\bA)"}</M>), aber seine Lösung ist nur dann
        eindeutig, wenn die Spalten von <M>{"\\bA"}</M>{" "}
        <ConceptLink id="linear-independence">linear unabhängig</ConceptLink> sind — dazu gleich
        mehr.
      </p>

      <ExpandedReading title="Projektion und senkrechtes Residuum zum Anfassen">
        <p className="my-2">
          Verfolgen wir Satz 7.1.4 an einem Miniaturbeispiel: Der Regler schiebt den Kandidaten{" "}
          <M>{"\\cblue{\\bA\\bx}"}</M> den Spaltenraum entlang; daneben stehen{" "}
          <M>{"\\left\\| \\cpurp{\\br} \\right\\|_2^2"}</M> und der Winkel zwischen{" "}
          <M>{"\\ba"}</M> und <M>{"\\cpurp{\\br}"}</M>. Das Minimum liegt exakt dort, wo das
          Residuum senkrecht steht — und der Kandidat dabei die grün markierte Projektion{" "}
          <M>{"\\cgreen{\\wh{\\bb}}"}</M> trifft.
        </p>
        <ProjektionWidget />
      </ExpandedReading>

      <h3 className={H3} id="sec-7.1-normalengleichungen">
        Normalengleichungen und eindeutige Lösung
      </h3>

      <p className={P}>
        Satz 7.1.4 ist geometrisch erhellend, aber unpraktisch: Um{" "}
        <M>{"\\cgreen{\\wh{\\bb}}"}</M> auszurechnen, müssten wir die Projektion schon kennen.
        Die Orthogonalitätsbedingung lässt sich aber in ein Gleichungssystem übersetzen, das nur{" "}
        <M>{"\\bA"}</M> und <M>{"\\bb"}</M> enthält — die aus der linearen Algebra bekannten{" "}
        <ConceptLink id="normal-equations">Normalengleichungen</ConceptLink>.
      </p>

      <EnvBlock kind="Satz" label="7.1.5 (Normalengleichungen)">
        <p>
          Die Lösungsmenge des KQ-Problems gleicht der Lösungsmenge der{" "}
          <em>Normalengleichungen</em>
        </p>
        <Eq tag="7.1.1">{"\\bA^\\top \\bA\\, \\wh{\\bx} = \\bA^\\top \\bb\\,."}</Eq>
      </EnvBlock>

      <Proof>
        <PStep
          why={
            <>
              Zerlegung aus dem Beweis von Satz 7.1.4:{" "}
              <M>{"\\bb - \\bA\\wh{\\bx} = (\\cgreen{\\wh{\\bb}} - \\bA\\wh{\\bx}) + \\cpurp{\\br}"}</M>{" "}
              mit <M>{"\\cgreen{\\wh{\\bb}} - \\bA\\wh{\\bx} \\in \\col(\\bA)"}</M> und{" "}
              <M>{"\\cpurp{\\br} \\perp \\col(\\bA)"}</M>
            </>
          }
        >
          <p>
            Nach Satz 7.1.4 löst <M>{"\\wh{\\bx}"}</M> das KQ-Problem genau dann, wenn{" "}
            <M>{"\\bA\\wh{\\bx} = \\cgreen{\\wh{\\bb}}"}</M> — und das ist genau dann der Fall,
            wenn das Residuum <em>nur</em> aus dem senkrechten Anteil besteht:
          </p>
          <MD>
            {"\\bA\\wh{\\bx} = \\cgreen{\\wh{\\bb}} \\quequiv \\bb - \\bA\\wh{\\bx} = \\cpurp{\\br} \\perp \\col(\\bA)\\,."}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\col(\\bA) = \\spann\\{\\ba_1, \\ldots, \\ba_n\\}"}</M>: senkrecht auf dem{" "}
              <ConceptLink id="span">Spann</ConceptLink> heißt senkrecht auf jedem Erzeuger;{" "}
              <M>{"\\bA^\\top \\bv"}</M> stapelt gerade die Skalarprodukte{" "}
              <M>{"\\ba_j^\\top \\bv"}</M>
            </>
          }
        >
          <p>
            Senkrecht auf dem ganzen Spaltenraum zu stehen heißt, senkrecht auf jeder einzelnen
            Spalte <M>{"\\ba_j"}</M> zu stehen:
          </p>
          <MD>
            {"\\bb - \\bA\\wh{\\bx} \\perp \\col(\\bA) \\quequiv \\ba_j^\\top \\left( \\bb - \\bA\\wh{\\bx} \\right) = 0 \\;\\; \\forall j \\quequiv \\bA^\\top \\left( \\bb - \\bA\\wh{\\bx} \\right) = \\bnull\\,."}
          </MD>
        </PStep>
        <PStep why={<>Ausmultiplizieren und Umstellen</>}>
          <MD>{"\\bA^\\top \\bb - \\bA^\\top\\bA\\,\\wh{\\bx} = \\bnull \\quequiv \\bA^\\top\\bA\\,\\wh{\\bx} = \\bA^\\top\\bb\\,."}</MD>
        </PStep>
      </Proof>

      <EnvBlock kind="Bemerkung" label="7.1.6 (Analysis-Perspektive)">
        <p>
          Dieselben Gleichungen liefert auch die Analysis, ganz ohne Geometrie: Die Zielfunktion{" "}
          <M>{"g(\\bx) = \\left\\| \\bA\\bx - \\bb \\right\\|_2^2 = \\bx^\\top\\bA^\\top\\bA\\bx - 2\\,\\bb^\\top\\bA\\bx + \\bb^\\top\\bb"}</M>{" "}
          ist eine <ConceptLink id="convex-function">konvexe</ConceptLink>{" "}
          <ConceptLink id="quadratic-form">quadratische Funktion</ConceptLink> mit{" "}
          <ConceptLink id="gradient">Gradient</ConceptLink>
        </p>
        <MD>{"\\nabla g(\\bx) = 2\\,\\bA^\\top\\bA\\,\\bx - 2\\,\\bA^\\top\\bb\\,."}</MD>
        <p>
          Nullsetzen ergibt exakt (7.1.1); wegen der Konvexität ist die notwendige Bedingung auch
          hinreichend. Diese Sichtweise wird uns im Optimierungsteil der Vorlesung wieder
          begegnen (vgl. MML §7.1).
        </p>
      </EnvBlock>

      <p className={P}>
        Bleibt die Frage nach der Eindeutigkeit. Sie hängt am{" "}
        <ConceptLink id="rank">Rang</ConceptLink> von <M>{"\\bA"}</M>: Genau bei vollem
        Spaltenrang gibt es nur eine Lösung.
      </p>

      <EnvBlock kind="Satz" label="7.1.7 (Eindeutige Lösung bei vollem Spaltenrang)">
        <p>
          Falls <M>{"\\rang(\\bA) = n"}</M>, ist <M>{"\\bA^\\top\\bA"}</M>{" "}
          <ConceptLink id="matrix-inverse">invertierbar</ConceptLink> und das KQ-Problem hat die
          eindeutige Lösung
        </p>
        <MD>{"\\wh{\\bx} = (\\bA^\\top\\bA)^{-1} \\bA^\\top \\bb =: \\bA\\pinv \\bb\\,."}</MD>
      </EnvBlock>

      <Proof>
        <PStep
          why={
            <>
              volle Spaltenzahl im Rang <M>{"\\quimpl"}</M> Spalten linear unabhängig{" "}
              <M>{"\\quimpl"}</M> <ConceptLink id="kernel">Kern</ConceptLink>{" "}
              <M>{"= \\{\\bnull\\}"}</M>
            </>
          }
        >
          <p>
            Sei <M>{"\\bx \\neq \\bnull"}</M> beliebig. Wegen <M>{"\\rang(\\bA) = n"}</M> sind
            die Spalten von <M>{"\\bA"}</M> linear unabhängig, also{" "}
            <M>{"\\bA\\bx \\neq \\bnull"}</M>.
          </p>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\bx^\\top\\bA^\\top\\bA\\bx = (\\bA\\bx)^\\top(\\bA\\bx)"}</M>; Definitheit
              der Norm
            </>
          }
        >
          <p>
            Damit ist <M>{"\\bA^\\top\\bA"}</M>{" "}
            <ConceptLink id="symmetric-matrix">symmetrisch</ConceptLink> und{" "}
            <ConceptLink id="positive-definite">positiv definit</ConceptLink>:
          </p>
          <MD>
            {"\\bx^\\top \\bA^\\top\\bA\\, \\bx = \\left\\| \\bA\\bx \\right\\|_2^2 > 0 \\quad \\text{für alle } \\bx \\neq \\bnull\\,."}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              positiv definit <M>{"\\quimpl"}</M> alle{" "}
              <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink>{" "}
              <M>{"> 0"}</M> <M>{"\\quimpl"}</M> <M>{"\\det(\\bA^\\top\\bA) \\neq 0"}</M>
            </>
          }
        >
          <p>
            Eine positiv definite Matrix ist invertierbar. Die Normalengleichungen (7.1.1) haben
            daher genau eine Lösung, und Auflösen liefert{" "}
            <M>{"\\wh{\\bx} = (\\bA^\\top\\bA)^{-1}\\bA^\\top\\bb"}</M>.
          </p>
        </PStep>
      </Proof>

      <p className={P}>
        Die Matrix <M>{"\\bA\\pinv = (\\bA^\\top\\bA)^{-1}\\bA^\\top"}</M> ist genau die aus dem
        SVD-Kapitel bekannte{" "}
        <ConceptLink id="pseudoinverse">Pseudoinverse</ConceptLink> von <M>{"\\bA"}</M>{" "}
        (eingeschränkt auf den Fall <M>{"\\rang(\\bA) = n"}</M>): Für quadratisches,
        invertierbares <M>{"\\bA"}</M> gilt <M>{"\\bA\\pinv = \\bA^{-1}"}</M>, und allgemein
        löst <M>{"\\bA\\pinv\\bb"}</M> das KQ-Problem. Wie man <M>{"\\wh{\\bx}"}</M>{" "}
        <em>numerisch</em> am besten berechnet — über die Normalengleichungen sicher{" "}
        <em>nicht</em> immer! — ist das Thema der Abschnitte{" "}
        <a className="underline" href="#sec-7.3">
          7.3
        </a>{" "}
        bis{" "}
        <a className="underline" href="#sec-7.6">
          7.6
        </a>
        ; zuvor klären wir in Abschnitt{" "}
        <a className="underline" href="#sec-7.2">
          7.2
        </a>
        , wie gut das Problem überhaupt <em>konditioniert</em> ist.
      </p>

      <EnvBlock kind="Beispiel" label="7.1.8 (Rechenbeispiel: Regressionsgerade durch drei Punkte)">
        <p>
          Rechnen wir die Lösungsformel einmal komplett durch. Drei Wohnungen wurden verkauft:{" "}
          <M>{"50\\,m^2"}</M> für <M>{"250"}</M>, <M>{"75\\,m^2"}</M> für <M>{"350"}</M> und{" "}
          <M>{"100\\,m^2"}</M> für <M>{"500"}</M> (Preise in Tsd. €). Mit dem Modell aus
          Beispiel 7.1.3:
        </p>
        <MD>
          {"\\cbred{\\bA} = \\begin{pmatrix} 1 & 50 \\\\ 1 & 75 \\\\ 1 & 100 \\end{pmatrix}, \\qquad \\bb = \\begin{pmatrix} 250 \\\\ 350 \\\\ 500 \\end{pmatrix}."}
        </MD>
        <p>Wir bilden die Bausteine der Normalengleichungen:</p>
        <MD>
          {"\\cbred{\\bA^\\top\\bA} = \\begin{pmatrix} 3 & 225 \\\\ 225 & 18\\,125 \\end{pmatrix}, \\qquad \\corange{\\bA^\\top\\bb} = \\begin{pmatrix} 1\\,100 \\\\ 88\\,750 \\end{pmatrix}."}
        </MD>
        <p>
          Wegen{" "}
          <M>{"\\det(\\cbred{\\bA^\\top\\bA}) = 3 \\cdot 18\\,125 - 225^2 = 54\\,375 - 50\\,625 = 3\\,750 \\neq 0"}</M>{" "}
          ist die Lösung eindeutig (Satz 7.1.7), und mit der Inversionsformel für{" "}
          <M>{"2 \\times 2"}</M>-Matrizen erhalten wir
        </p>
        <MD>
          {"\\cblue{\\wh{\\bbeta}} = (\\cbred{\\bA^\\top\\bA})^{-1} \\corange{\\bA^\\top\\bb} = \\frac{1}{3\\,750} \\begin{pmatrix} 18\\,125 & -225 \\\\ -225 & 3 \\end{pmatrix} \\begin{pmatrix} 1\\,100 \\\\ 88\\,750 \\end{pmatrix} = \\begin{pmatrix} -25/3 \\\\ 5 \\end{pmatrix} \\approx \\begin{pmatrix} -8{,}33 \\\\ 5 \\end{pmatrix}."}
        </MD>
        <p>
          Jeder Quadratmeter kostet also geschätzt <M>{"5\\,000"}</M> € mehr. Zur Probe berechnen
          wir angepasste Werte und Residuum:
        </p>
        <MD>
          {"\\cgreen{\\wh{\\bb}} = \\cbred{\\bA}\\cblue{\\wh{\\bbeta}} = \\frac{1}{3}\\begin{pmatrix} 725 \\\\ 1\\,100 \\\\ 1\\,475 \\end{pmatrix} \\approx \\begin{pmatrix} 241{,}7 \\\\ 366{,}7 \\\\ 491{,}7 \\end{pmatrix}, \\qquad \\cpurp{\\br} = \\bb - \\cgreen{\\wh{\\bb}} = \\frac{1}{3}\\begin{pmatrix} 25 \\\\ -50 \\\\ 25 \\end{pmatrix}."}
        </MD>
        <p>
          Tatsächlich gilt{" "}
          <M>{"\\cbred{\\bA}^\\top \\cpurp{\\br} = \\bnull"}</M>: Die Summe der Residuen ist{" "}
          <M>{"(25 - 50 + 25)/3 = 0"}</M>, und{" "}
          <M>{"\\sumin x_i r_i = (50 \\cdot 25 - 75 \\cdot 50 + 100 \\cdot 25)/3 = 0"}</M> — das
          Residuum steht senkrecht auf beiden Spalten, genau wie Satz 7.1.5 verspricht. Der
          minimale Zielfunktionswert ist{" "}
          <M>{"\\left\\| \\cpurp{\\br} \\right\\|_2^2 = (625 + 2\\,500 + 625)/9 = 1\\,250/3 \\approx 416{,}7"}</M>
          .
        </p>
      </EnvBlock>

      <h3 className={H3} id="sec-7.1-quiz">
        Selbsttest
      </h3>
      <p className={P}>
        Zum Abschluss vier Aussagen über die Pseudoinverse und Projektionen (aus der Vorlesung).
        Welche sind wahr? Es sei dabei <M>{"\\rang(\\bA) = n"}</M> mit <M>{"m > n"}</M> und{" "}
        <M>{"\\wh{\\bx} = \\bA\\pinv\\bb"}</M>.
      </p>
      <QuizWidget />

      <p className="mt-8 text-sm italic text-slate-600 dark:text-slate-400">
        Vertiefung: Heath §3.1–3.2; MML §7.1 (Gradienten-Perspektive) und §9.2 (lineare
        Regression aus statistischer Sicht).
      </p>
    </>
  );
}
