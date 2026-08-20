/**
 * Widgets für §7.1 „Kleinste Quadrate: Problem und Motivation".
 *
 * DIE EINE EINSICHT je Widget:
 *   RegressionWidget – Keine Wahl von (β₀, β₁) unterbietet die Quadratsumme
 *     der KQ-Geraden; man kann sich von Hand nur annähern.
 *   ProjektionWidget – Die Quadratsumme ist genau dort minimal, wo das
 *     Residuum senkrecht auf col(A) steht (Satz 7.1.4).
 *
 * FARBROLLEN Kapitel 7 (durchgehend, vgl. Header S72Kondition.tsx):
 *   b / Daten .................. rot   (FMM_COLORS.rot)
 *   ŷ = Ax̂, KQ-Anpassung ....... grün  (FMM_COLORS.gruen)
 *   Residuum r, SSR ............ violett
 *   Störungen Δb, E ............ blau  – hier: die vom Leser gezogene Gerade,
 *                                d. h. die „Störung" der optimalen Wahl
 *   κ₂(A) ...................... orange (in §7.1 nicht gebraucht)
 *   Datenpunkte, Achsen ........ grau
 *
 * PROVENIENZ: Grundgerüst der SVG-Zeichnung aus der internen App
 * interactive/heath-ch3 (QuadraticFitWidget, OrthogonalityWidget) portiert;
 * Ziehgriffe (useDrag/DragHandle), Verdikte und sämtliche Texte sind für
 * dieses Skript neu. Prosa niemals aus der Quell-App übernommen.
 *
 * PRÜFSTATUS (historische Notiz, 2026-08-19): Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen:
 *   Regressionsdaten (12 Punkte): KQ-Lösung β̂ = (36,686075; 4,415469),
 *   SSR(β̂) = 714,1240; Gegenprobe über die Normalengleichungen stimmt auf
 *   2,8e−14, Σrᵢ = 2,8e−14 und Σxᵢrᵢ = −2,7e−12 (Orthogonalität).
 *   Startzustand (120; 3,6): SSR = 12 814 = 17,94 × Optimum (+1694 %); die
 *   mittlere Residuenlänge ist dort 32,7 Einheiten und damit rund 13 px hoch,
 *   also sichtbar. Die zuvor gewählte Startgerade (60; 4,2) lag mit SSR
 *   = 1767,4 zwar näher am Optimum, ihre Residuen waren im Bild aber nur
 *   5 px lang und praktisch unsichtbar.
 *   Griffhöhen der KQ-Geraden bei x = 40 bzw. 110: 213,30 und 522,39.
 *   Projektionsbeispiel a = (3,1)ᵀ, b = (1,2)ᵀ: x* = 0,5, b̂ = (1,5; 0,5),
 *   r = (−0,5; 1,5), ‖r‖² = 2,5, aᵀr = 0 exakt; ‖r‖²(x) = 10x² − 10x + 5,
 *   Startwert x = 0,1 liefert ‖r‖² = 4,1 = 1,64 × Minimum, Winkel 51,34°.
 *   Die Winkelschwellen 85° und 95° liegen bei x = 0,4563 bzw. 0,5437.
 */
import { useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  M,
  Slider,
  Verdikt,
  clamp,
  fmtDe,
  fmtInt,
  useDrag,
} from "../../../lib";

/** Deutsche Dezimalzahl für MathJax-Literale (nacktes „,“ setzt dort Abstand). */
const mathDe = (v: number, d = 2) => fmtDe(v, d).replace(",", "{,}").replace("−", "-");

/* ------------------------------------------------------------------ */
/* SVG-Helfer                                                          */
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

/** Die beiden x-Stellen, an denen die Gerade angefasst werden kann. */
const GRIFF_A = 40;
const GRIFF_B = 110;
const B0_MIN = -100;
const B0_MAX = 250;
const B1_MIN = 0;
const B1_MAX = 8;

export function RegressionWidget() {
  // Startgerade: die Residuen müssen SICHTBAR sein (rund 13 px), sonst ist
  // die Aufgabe nicht lesbar – SSR = 12 814 = 17,9 × Optimum.
  const [b0, setB0] = useState(120);
  const [b1, setB1] = useState(3.6);
  const [zeigeKQ, setZeigeKQ] = useState(false);
  const [beruehrt, setBeruehrt] = useState(false);

  const ssr = regSsr(b0, b1);
  const ueberschuss = ssr / REG_FIT.ssr - 1;

  const setzen = (n0: number, n1: number) => {
    const k1 = clamp(n1, B1_MIN, B1_MAX);
    setB1(k1);
    setB0(clamp(n0, B0_MIN, B0_MAX));
    setBeruehrt(true);
  };

  /** Ziehen an den beiden Griffen: die Griffhöhen bestimmen (β₀, β₁). */
  const zieh = useDrag<"A" | "B">({
    feld: { x0: RML, y0: RMT, w: RW - RML - RMR, h: RH - RMT - RMB },
    welt: { x0: RX0, x1: RX1, y0: RY0, y1: RY1 },
    greifPosition: (id) =>
      id === "A" ? [GRIFF_A, b0 + b1 * GRIFF_A] : [GRIFF_B, b0 + b1 * GRIFF_B],
    onDrag: ([, y], id) => {
      const yA = id === "A" ? y : b0 + b1 * GRIFF_A;
      const yB = id === "B" ? y : b0 + b1 * GRIFF_B;
      const n1 = (yB - yA) / (GRIFF_B - GRIFF_A);
      const k1 = clamp(n1, B1_MIN, B1_MAX);
      setzen((id === "A" ? yA : yB) - k1 * (id === "A" ? GRIFF_A : GRIFF_B), k1);
    },
  });

  const linePath = (a0: number, a1: number) =>
    `M${rpx(RX0).toFixed(1)},${rpy(a0 + a1 * RX0).toFixed(1)} L${rpx(RX1).toFixed(1)},${rpy(a0 + a1 * RX1).toFixed(1)}`;
  const xTicks = [0, 25, 50, 75, 100, 125];
  const yTicks = [0, 100, 200, 300, 400, 500, 600];

  return (
    <div>
      <Aufgabe>
        Ziehen wir die Gerade an den beiden blauen Griffen (oder über die Regler) so, dass die
        violetten Residuen zusammen möglichst kurz werden.
      </Aufgabe>
      <svg
        width={RW}
        height={RH}
        viewBox={`0 0 ${RW} ${RH}`}
        className="h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        role="img"
        aria-label={`Streudiagramm aus zwölf Wohnungsverkäufen mit einer frei verschiebbaren Geraden; die aktuelle Quadratsumme der Residuen beträgt ${fmtInt(ssr)}.`}
        {...zieh.svgProps}
      >
        <defs>
          <clipPath id="s71-reg-clip">
            <rect x={RML} y={RMT} width={RW - RML - RMR} height={RH - RMT - RMB} />
          </clipPath>
        </defs>
        {/* Achsen */}
        <line x1={RML} y1={rpy(0)} x2={RW - RMR} y2={rpy(0)} stroke="var(--w-axis)" />
        <line x1={rpx(0)} y1={RMT} x2={rpx(0)} y2={RH - RMB} stroke="var(--w-axis)" />
        {xTicks.map((t) => (
          <g key={`x${t}`}>
            <line x1={rpx(t)} y1={rpy(0)} x2={rpx(t)} y2={rpy(0) + 4} stroke="var(--w-axis)" />
            <text x={rpx(t)} y={RH - 8} textAnchor="middle" fontSize={10} fill="var(--w-muted)">
              {t}
            </text>
          </g>
        ))}
        {yTicks.map((y) => (
          <g key={`y${y}`}>
            <line x1={rpx(0) - 4} y1={rpy(y)} x2={rpx(0)} y2={rpy(y)} stroke="var(--w-axis)" />
            <text x={RML - 7} y={rpy(y) + 3} textAnchor="end" fontSize={10} fill="var(--w-muted)">
              {y}
            </text>
          </g>
        ))}
        <text x={RW - RMR - 4} y={rpy(0) - 6} textAnchor="end" fontSize={11} fill="var(--w-muted)">
          Fläche x (m²)
        </text>
        <text x={RML + 8} y={RMT + 10} fontSize={11} fill="var(--w-muted)">
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
              stroke={FMM_COLORS.violett}
              strokeWidth={2}
            />
          ))}
          {/* KQ-Gerade (erst nach dem Aufdecken) */}
          {zeigeKQ && (
            <path
              d={linePath(REG_FIT.b0, REG_FIT.b1)}
              fill="none"
              stroke={FMM_COLORS.gruen}
              strokeWidth={2}
              strokeDasharray="6 4"
            />
          )}
          {/* Nutzer-Gerade */}
          <path d={linePath(b0, b1)} fill="none" stroke={FMM_COLORS.blau} strokeWidth={2} />
          {/* Datenpunkte */}
          {REG_X.map((x, i) => (
            <circle key={`p${i}`} cx={rpx(x)} cy={rpy(REG_Y[i])} r={3} fill={FMM_COLORS.rot} />
          ))}
        </g>
        {/* Ziehgriffe auf der Geraden */}
        {(["A", "B"] as const).map((id) => {
          const x = id === "A" ? GRIFF_A : GRIFF_B;
          return (
            <DragHandle
              key={id}
              x={rpx(x)}
              y={rpy(b0 + b1 * x)}
              r={5}
              farbe={FMM_COLORS.blau}
              aktiv={zieh.dragging === id}
              {...zieh.handleProps(id)}
            />
          );
        })}
      </svg>
      <div className="mt-2">
        <Slider
          label="β₀ (Achsenabschnitt)"
          value={b0}
          onChange={(v) => setzen(v, b1)}
          min={B0_MIN}
          max={B0_MAX}
          step={1}
          accent={FMM_COLORS.blau}
          fmt={(v) => fmtDe(v, 0)}
        />
        <Slider
          label="β₁ (Steigung)"
          value={b1}
          onChange={(v) => setzen(b0, v)}
          min={B1_MIN}
          max={B1_MAX}
          step={0.05}
          accent={FMM_COLORS.blau}
        />
      </div>
      <p className="mt-2 text-sm">
        <M>{`\\wh{y} = ${mathDe(b0, 0)} + ${mathDe(b1, 2)} \\cdot x`}</M>
      </p>
      <p className="text-sm">
        Quadratsumme der <span style={{ color: FMM_COLORS.violett }}>Residuen</span>:{" "}
        <span className="font-mono font-semibold tabular-nums">{fmtInt(ssr)}</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-slate-200 px-2 py-1 text-xs hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-700 dark:hover:bg-slate-600"
          disabled={!beruehrt}
          onClick={() => setZeigeKQ((s) => !s)}
        >
          KQ-Gerade {zeigeKQ ? "ausblenden" : "einblenden"}
        </button>
        <button
          type="button"
          className="rounded bg-slate-200 px-2 py-1 text-xs hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
          onClick={() => {
            setB0(REG_FIT.b0);
            setB1(REG_FIT.b1);
            setBeruehrt(true);
            setZeigeKQ(true);
          }}
        >
          Regler auf KQ-Lösung setzen
        </button>
      </div>
      {!zeigeKQ ? (
        <Verdikt kind="neutral" className="mt-2">
          Die violetten Strecken sind die Residuen <M>{"y_i - \\beta_0 - \\beta_1 x_i"}</M>, ihre
          Quadratsumme ist <M>{"\\left\\| \\bA\\bbeta - \\bb \\right\\|_2^2"}</M> aus Definition
          7.1.1 und steht gerade bei <span className="font-mono">{fmtInt(ssr)}</span>.{" "}
          {beruehrt
            ? "Schieben wir weiter, bis wir sie nicht mehr verkleinern können; dann decken wir die KQ-Gerade auf."
            : "Solange wir nichts bewegt haben, bleibt die KQ-Gerade verdeckt."}
        </Verdikt>
      ) : ueberschuss > 0.2 ? (
        <Verdikt kind="warn" className="mt-2" titel="Noch Luft nach unten:">
          Unsere Gerade kommt auf <span className="font-mono">{fmtInt(ssr)}</span>, die
          KQ-Gerade <M>{`\\wh{\\bbeta} \\approx (${mathDe(REG_FIT.b0, 1)};\\; ${mathDe(REG_FIT.b1, 2)})^\\top`}</M>{" "}
          auf <span className="font-mono">{fmtInt(REG_FIT.ssr)}</span> – das sind{" "}
          <span className="font-mono">{fmtDe(100 * ueberschuss, 0)} %</span> Aufschlag. Unter{" "}
          <span className="font-mono">{fmtInt(REG_FIT.ssr)}</span> kommt keine Wahl von{" "}
          <M>{"(\\beta_0, \\beta_1)"}</M>, denn genau dieses Minimum definiert Definition 7.1.1.
        </Verdikt>
      ) : ueberschuss > 0.005 ? (
        <Verdikt kind="ok" className="mt-2" titel="Schon nah dran:">
          <span className="font-mono">{fmtInt(ssr)}</span> gegen{" "}
          <span className="font-mono">{fmtInt(REG_FIT.ssr)}</span>, also nur noch{" "}
          <span className="font-mono">{fmtDe(100 * ueberschuss, 1)} %</span> Aufschlag. Die letzten
          Prozente per Hand zu finden ist mühsam; die Normalengleichungen (Satz 7.1.5) liefern sie
          in einem Rechenschritt.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" className="mt-2" titel="Das ist die KQ-Gerade:">
          <span className="font-mono">{fmtInt(ssr)}</span> ist auf Reglergenauigkeit das Minimum{" "}
          <span className="font-mono">{fmtInt(REG_FIT.ssr)}</span>. Jede Bewegung von hier aus
          macht die Quadratsumme wieder größer: Das Minimum aus Definition 7.1.1 ist erreicht, und
          Satz 7.1.7 sagt, dass es hier nur dieses eine gibt.
        </Verdikt>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Widget 2: Projektion, senkrechtes Residuum in R²                    */
/* ------------------------------------------------------------------ */

const PW = 360;
const PH = 285;
const psx = (u: number) => ((u + 0.6) / 4.8) * PW;
const psy = (v: number) => PH - ((v + 1.2) / 3.8) * PH;

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
  const angDeg = (Math.acos(clamp(cosAng, -1, 1)) * 180) / Math.PI;
  const perp = Math.abs(angDeg - 90) < 2;
  // Projektion b̂ = ((aᵀb)/(aᵀa))·a = 0.5·a = (1.5, 0.5)
  const bh: [number, number] = [1.5, 0.5];

  /** Ziehen: der Kandidat bleibt auf der Geraden col(A) = span{a}. */
  const zieh = useDrag<"y">({
    feld: { x0: 0, y0: 0, w: PW, h: PH },
    welt: { x0: -0.6, x1: 4.2, y0: -1.2, y1: 2.6 },
    onDrag: ([px, py]) => setX(clamp((a[0] * px + a[1] * py) / (an * an), 0, 1.2)),
  });

  // Marker für den rechten Winkel zwischen col(A)-Richtung und r
  const ah: [number, number] = [a[0] / an, a[1] / an];
  const rh: [number, number] = rn > 1e-9 ? [r[0] / rn, r[1] / rn] : [0, 0];
  const m = 0.16;
  const q1: [number, number] = [y[0] - m * ah[0], y[1] - m * ah[1]];
  const q2: [number, number] = [q1[0] + m * rh[0], q1[1] + m * rh[1]];
  const q3: [number, number] = [y[0] + m * rh[0], y[1] + m * rh[1]];

  return (
    <div>
      <Aufgabe>
        Ziehen wir den blauen Punkt <M>{"\\bA\\bx"}</M> die graue Gerade entlang (oder nehmen den
        Regler) und achten auf den Winkel zwischen <M>{"\\ba"}</M> und dem Residuum.
      </Aufgabe>
      <div className="flex flex-wrap items-start gap-4">
        <div className="inline-block text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]">x₂ ↑</div>
          <svg
            width={PW}
            height={PH}
            viewBox={`0 0 ${PW} ${PH}`}
            className="h-auto max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
            role="img"
            aria-label={`Der Vektor b und sein Residuum zum Kandidaten Ax auf der Geraden col(A); der Winkel zwischen a und dem Residuum beträgt aktuell ${fmtDe(angDeg, 0)} Grad.`}
            {...zieh.svgProps}
          >
            {/* Achsen mit ganzzahligen Ticks */}
            <line x1={psx(-0.6)} y1={psy(0)} x2={psx(4.2)} y2={psy(0)} stroke="var(--w-grid)" />
            <line x1={psx(0)} y1={psy(-1.2)} x2={psx(0)} y2={psy(2.6)} stroke="var(--w-grid)" />
            {[1, 2, 3, 4].map((t) => (
              <g key={`x${t}`}>
                <line x1={psx(t)} y1={psy(0) - 3} x2={psx(t)} y2={psy(0) + 3} stroke="var(--w-axis)" />
                <text x={psx(t)} y={psy(0) + 13} textAnchor="middle" fill="var(--w-muted)">
                  {t}
                </text>
              </g>
            ))}
            {[-1, 1, 2].map((t) => (
              <g key={`y${t}`}>
                <line x1={psx(0) - 3} y1={psy(t)} x2={psx(0) + 3} y2={psy(t)} stroke="var(--w-axis)" />
                <text x={psx(0) - 6} y={psy(t) + 3} textAnchor="end" fill="var(--w-muted)">
                  {t}
                </text>
              </g>
            ))}
            {/* col(A) = span{a} */}
            <line
              x1={psx(-0.54)}
              y1={psy(-0.18)}
              x2={psx(4.14)}
              y2={psy(1.38)}
              stroke="var(--w-axis)"
              strokeWidth={1.5}
            />
            <text x={psx(3.35)} y={psy(1.35)} fill="var(--w-muted)" fontSize="11">
              col(𝑨)
            </text>
            {/* Zielpunkt b̂ = Projektion von b */}
            <circle cx={psx(bh[0])} cy={psy(bh[1])} r={3.5} fill="none" stroke={FMM_COLORS.gruen} strokeWidth={2} />
            <text x={psx(bh[0]) + 6} y={psy(bh[1]) - 7} fill={FMM_COLORS.gruen} fontSize="12" fontStyle="italic">
              b̂
            </text>
            {/* rechter Winkel nur, wenn wirklich orthogonal */}
            {perp && (
              <polyline
                points={`${psx(q1[0])},${psy(q1[1])} ${psx(q2[0])},${psy(q2[1])} ${psx(q3[0])},${psy(q3[1])}`}
                fill="none"
                stroke="var(--w-text)"
                strokeWidth={1.3}
              />
            )}
            {/* Vektoren */}
            <Arrow x1={psx(0)} y1={psy(0)} x2={psx(b[0])} y2={psy(b[1])} color={FMM_COLORS.rot} />
            <text x={psx(b[0]) - 16} y={psy(b[1]) - 6} fill={FMM_COLORS.rot} fontSize="13" fontStyle="italic">
              𝒃
            </text>
            <Arrow x1={psx(0)} y1={psy(0)} x2={psx(y[0])} y2={psy(y[1])} color={FMM_COLORS.blau} />
            <text x={psx(y[0]) + 6} y={psy(y[1]) + 22} fill={FMM_COLORS.blau} fontSize="13" fontStyle="italic">
              𝑨x = x·𝒂
            </text>
            <Arrow x1={psx(y[0])} y1={psy(y[1])} x2={psx(b[0])} y2={psy(b[1])} color={FMM_COLORS.violett} dash="6 5" />
            <text
              x={psx((y[0] + b[0]) / 2) + 8}
              y={psy((y[1] + b[1]) / 2)}
              fill={FMM_COLORS.violett}
              fontSize="13"
              fontStyle="italic"
            >
              𝒓
            </text>
            <DragHandle
              x={psx(y[0])}
              y={psy(y[1])}
              r={5}
              farbe={FMM_COLORS.blau}
              aktiv={zieh.dragging === "y"}
              {...zieh.handleProps("y")}
            />
          </svg>
          <div className="mt-0.5 text-center text-[11px]">x₁ →</div>
        </div>
        <div className="min-w-[220px] grow text-sm">
          <Slider label="x" value={x} onChange={setX} min={0} max={1.2} step={0.01} accent={FMM_COLORS.blau} />
          <ul className="ml-4 list-disc space-y-1 font-mono text-xs tabular-nums">
            <li>aᵀr = {fmtDe(atr, 2)}</li>
            <li>‖r‖₂² = {fmtDe(rn * rn, 3)}</li>
            <li>Winkel(a, r) = {fmtDe(angDeg, 1)}°</li>
          </ul>
        </div>
      </div>
      {angDeg < 85 ? (
        <Verdikt kind="warn" className="mt-2" titel="Noch nicht senkrecht:">
          Der Winkel liegt bei <span className="font-mono">{fmtDe(angDeg, 1)}°</span>, also unter
          90°: <M>{"\\ba^\\top\\cpurp{\\br} = 5 - 10x"}</M> ist mit{" "}
          <span className="font-mono">{fmtDe(atr, 2)}</span> noch positiv. Ein Stück weiter nach
          rechts verkürzt das Residuum, <M>{"\\left\\| \\cpurp{\\br} \\right\\|_2^2"}</M> steht
          gerade bei <span className="font-mono">{fmtDe(rn * rn, 3)}</span>.
        </Verdikt>
      ) : angDeg > 95 ? (
        <Verdikt kind="warn" className="mt-2" titel="Über das Ziel hinaus:">
          Mit <span className="font-mono">{fmtDe(angDeg, 1)}°</span> ist der Winkel größer als 90°,{" "}
          <M>{"\\ba^\\top\\cpurp{\\br}"}</M> also negativ (
          <span className="font-mono">{fmtDe(atr, 2)}</span>). Das Residuum kippt zur anderen Seite
          und wird wieder länger:{" "}
          <M>{"\\left\\| \\cpurp{\\br} \\right\\|_2^2"}</M> ={" "}
          <span className="font-mono">{fmtDe(rn * rn, 3)}</span>.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" className="mt-2" titel="Hier steht es senkrecht:">
          <span className="font-mono">{fmtDe(angDeg, 1)}°</span> und{" "}
          <M>{"\\ba^\\top\\cpurp{\\br} \\approx 0"}</M> – genau der Fall aus Satz 7.1.4. Der
          Kandidat sitzt auf der Projektion{" "}
          <M>{"\\cgreen{\\wh{\\bb}} = \\tfrac{1}{2}\\ba = (1{,}5;\\; 0{,}5)^\\top"}</M>, und{" "}
          <M>{"\\left\\| \\cpurp{\\br} \\right\\|_2^2"}</M> erreicht mit{" "}
          <span className="font-mono">{fmtDe(rn * rn, 3)}</span> seinen kleinsten Wert 2,5.
        </Verdikt>
      )}
    </div>
  );
}
