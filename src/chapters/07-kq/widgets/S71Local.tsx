/**
 * Lokale Hilfskomponenten aus der TSX-Fassung von §7.1 (MDX-Migration
 * 2026-08-11; Rendering unverändert übernommen, Namen beibehalten).
 * Widget-Code adaptiert aus interactive/heath-ch3 (QuadraticFitWidget,
 * OrthogonalityWidget, Labels deutsch).
 */
import { useState } from "react";
import { M, Slider } from "../../../lib";

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

export function RegressionWidget() {
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
            ; KQ-Optimum:{" "}
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
/* Widget 2: Projektion, senkrechtes Residuum in R²                    */
/* (Code adaptiert aus heath-ch3 OrthogonalityWidget)                  */
/* ------------------------------------------------------------------ */

/** Spielzeugproblem: a = (3,1)ᵀ, b = (1,2)ᵀ, Kandidat y = x·a. */
export function ProjektionWidget() {
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
          <M>{"\\left\\| \\cpurp{\\br} \\right\\|_2^2"}</M> ist so klein wie möglich. Links und
          rechts davon kippt das Residuum aus der Senkrechten und wird wieder länger.
        </p>
      </div>
    </div>
  );
}
