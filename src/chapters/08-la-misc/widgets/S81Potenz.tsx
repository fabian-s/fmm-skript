import { useMemo, useState } from "react";
import { Slider } from "../../../lib";

/**
 * Potenzmethoden-Stepper für §8.1 (ersetzt die Folien-Abbildung
 * resources/power_method_viz.pdf): die Iteration x^(k) = A x^(k-1) / ||A x^(k-1)||
 * an der Beispielmatrix A = (5 -2; -2 8) auf dem Einheitskreis, mit
 * Norm- und Rayleigh-Schätzung, Winkel zum gesuchten Eigenvektor und der
 * beobachteten Konvergenzrate.
 *
 * Eigenbau: aus der privaten mml-ch4-App war hier nichts zu holen (EigenExplorer
 * dreht einen Vektor von Hand, EigenspectrumFig zeichnet ein Spektrum; beide
 * iterieren nicht). Farbcode wie im Kapitel: blau = Iterierte, grün = gesuchter
 * Eigenvektor, orange = Konvergenzrate, rot = Fehler.
 */

const BLUE = "#0072B2";
const GREEN = "#009E73";
const ORANGE = "#E69F00";
const RED = "#D55E00";
const GREY = "#64748b";

const A: [[number, number], [number, number]] = [
  [5, -2],
  [-2, 8],
];
const LAM1 = 9;
const LAM2 = 4;
const RATE = LAM2 / LAM1;
const S5 = Math.sqrt(5);
const V1: [number, number] = [-1 / S5, 2 / S5];
const V2: [number, number] = [2 / S5, 1 / S5];

const KMAX = 24;

type Vec = [number, number];

const mv = (x: Vec): Vec => [A[0][0] * x[0] + A[0][1] * x[1], A[1][0] * x[0] + A[1][1] * x[1]];
const norm = (x: Vec) => Math.hypot(x[0], x[1]);
const dot = (x: Vec, y: Vec) => x[0] * y[0] + x[1] * y[1];

/** 3 Nachkommastellen, deutsches Komma, kein −0; NaN und ±∞ getrennt. */
function fmt(v: number): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  let r = Math.round(v * 1000) / 1000;
  if (Object.is(r, -0)) r = 0;
  return r.toFixed(3).replace("-", "−").replace(".", ",");
}

const HOCH: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
  "+": "",
};

/** kleine Zahlen als Zehnerpotenz, sonst wie fmt */
function fmtSci(v: number): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  if (v === 0) return "0";
  if (Math.abs(v) >= 0.001) return fmt(v);
  const [mant, exp] = v.toExponential(1).split("e");
  const hoch = exp
    .split("")
    .map((c) => HOCH[c] ?? c)
    .join("");
  return `${mant.replace("-", "−").replace(".", ",")} · 10${hoch}`;
}

const vecStr = (x: Vec) => `(${fmt(x[0])}; ${fmt(x[1])})`;

type Schritt = {
  x: Vec;
  /** ||A x^(k-1)||, die Normschätzung für |λ₁| (bei k = 0 nicht definiert) */
  nu: number;
  /** Rayleigh-Quotient x^(k)ᵀ A x^(k) */
  rho: number;
  /** |sin| des Winkels zwischen x^(k) und v₁ */
  sinPhi: number;
};

/** Iterierte 0 … KMAX zu einem Startvektor; leer, wenn der Start null ist. */
function iterate(start: Vec): Schritt[] {
  const n0 = norm(start);
  if (!(n0 > 0)) return [];
  const out: Schritt[] = [];
  let x: Vec = [start[0] / n0, start[1] / n0];
  const eintrag = (x: Vec, nu: number): Schritt => ({
    x,
    nu,
    rho: dot(x, mv(x)),
    sinPhi: Math.abs(x[0] * V1[1] - x[1] * V1[0]),
  });
  out.push(eintrag(x, NaN));
  for (let k = 1; k <= KMAX; k++) {
    const y = mv(x);
    const nu = norm(y);
    if (!(nu > 0)) break;
    x = [y[0] / nu, y[1] / nu];
    out.push(eintrag(x, nu));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Zeichenfläche                                                       */
/* ------------------------------------------------------------------ */

const PAD_L = 32;
const PAD_R = 12;
const PAD_T = 12;
const PAD_B = 22;
const SIZE = 268;
const HALF = 1.35;

const px = (x: number) => PAD_L + ((x + HALF) / (2 * HALF)) * SIZE;
const py = (y: number) => PAD_T + ((HALF - y) / (2 * HALF)) * SIZE;

function Pfeil({
  to,
  color,
  width = 2,
  opacity = 1,
  dash,
}: {
  to: Vec;
  color: string;
  width?: number;
  opacity?: number;
  dash?: string;
}) {
  const len = norm(to);
  if (!(len > 1e-9)) return null;
  const ux = to[0] / len;
  const uy = to[1] / len;
  const tipX = px(to[0]);
  const tipY = py(to[1]);
  // Pfeilspitze in Pixelkoordinaten (y ist dort nach unten gerichtet)
  const s = 7 + width;
  const hx = -ux * s;
  const hy = uy * s;
  const nx = -uy * s * 0.42;
  const ny = -ux * s * 0.42;
  return (
    <g opacity={opacity}>
      <line
        x1={px(0)}
        y1={py(0)}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dash}
      />
      <polygon
        points={`${tipX},${tipY} ${tipX + hx + nx},${tipY + hy + ny} ${tipX + hx - nx},${tipY + hy - ny}`}
        fill={color}
      />
    </g>
  );
}

function Tafel({ schritte, k }: { schritte: Schritt[]; k: number }) {
  const W = PAD_L + SIZE + PAD_R;
  const H = PAD_T + SIZE + PAD_B;
  const kreis: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (2 * Math.PI * i) / 96;
    kreis.push(`${px(Math.cos(t)).toFixed(1)},${py(Math.sin(t)).toFixed(1)}`);
  }
  const ticks = [-1, 0, 1];
  return (
    <svg
      width={W}
      height={H}
      className="shrink-0 rounded border border-slate-300 bg-white dark:border-slate-600"
      role="img"
      aria-label="Einheitskreis mit den Iterierten der Potenzmethode"
    >
      {/* Achsen */}
      <line x1={px(-HALF)} y1={py(0)} x2={px(HALF)} y2={py(0)} stroke="#94a3b8" />
      <line x1={px(0)} y1={py(-HALF)} x2={px(0)} y2={py(HALF)} stroke="#94a3b8" />
      {ticks.map((t) => (
        <g key={`tx-${t}`}>
          <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="#94a3b8" />
          <text x={px(t)} y={PAD_T + SIZE + 13} fontSize={9} textAnchor="middle" fill={GREY}>
            {t === 0 ? "0" : t === 1 ? "1" : "−1"}
          </text>
        </g>
      ))}
      {ticks
        .filter((t) => t !== 0)
        .map((t) => (
          <g key={`ty-${t}`}>
            <line x1={px(0) - 3} y1={py(t)} x2={px(0) + 3} y2={py(t)} stroke="#94a3b8" />
            <text x={PAD_L - 5} y={py(t) + 3} fontSize={9} textAnchor="end" fill={GREY}>
              {t === 1 ? "1" : "−1"}
            </text>
          </g>
        ))}
      <text x={PAD_L + SIZE} y={py(0) - 5} fontSize={10} textAnchor="end" fill={GREY}>
        x₁
      </text>
      <text x={px(0) + 5} y={PAD_T + 9} fontSize={10} fill={GREY}>
        x₂
      </text>
      {/* Einheitskreis */}
      <polyline points={kreis.join(" ")} fill="none" stroke="#cbd5e1" strokeDasharray="3 3" />
      {/* Eigenrichtungen */}
      <line
        x1={px(-V1[0] * HALF)}
        y1={py(-V1[1] * HALF)}
        x2={px(V1[0] * HALF)}
        y2={py(V1[1] * HALF)}
        stroke={GREEN}
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.7}
      />
      <Pfeil to={V2} color={GREY} width={1.5} dash="4 3" />
      <Pfeil to={V1} color={GREEN} width={2.5} />
      <text x={px(V1[0]) - 6} y={py(V1[1]) - 6} fontSize={11} textAnchor="end" fill={GREEN}>
        v₁
      </text>
      <text x={px(V2[0]) + 6} y={py(V2[1]) - 6} fontSize={11} fill={GREY}>
        v₂
      </text>
      {/* Iterierte */}
      {schritte.slice(0, k + 1).map((s, i) => (
        <Pfeil
          key={i}
          to={s.x}
          color={BLUE}
          width={i === k ? 2.5 : 1.2}
          opacity={i === k ? 1 : 0.2 + (0.5 * i) / Math.max(1, k)}
        />
      ))}
      {schritte[k] ? (
        <text
          x={px(schritte[k].x[0]) + (schritte[k].x[0] < 0 ? -6 : 6)}
          y={py(schritte[k].x[1]) + (schritte[k].x[1] < 0 ? 14 : -8)}
          fontSize={11}
          textAnchor={schritte[k].x[0] < 0 ? "end" : "start"}
          fill={BLUE}
        >
          x⁽{k}⁾
        </text>
      ) : null}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

export function PotenzmethodenStepper() {
  const [x0, setX0] = useState<Vec>([2, 1.3]);
  const [k, setK] = useState(0);

  const schritte = useMemo(() => iterate(x0), [x0]);
  const maxK = Math.max(0, schritte.length - 1);
  const kk = Math.min(k, maxK);
  const jetzt = schritte[kk];
  const vorher = kk > 0 ? schritte[kk - 1] : undefined;

  const c1 = dot(x0, V1);
  const c2 = dot(x0, V2);
  const nullstart = !(norm(x0) > 0);
  const versagt = Math.abs(c1) < 1e-12 && !nullstart;
  const beobachteteRate = vorher && vorher.sinPhi > 0 ? jetzt.sinPhi / vorher.sinPhi : NaN;
  /** Text für die beobachtete Rate: vor dem ersten Schritt bzw. bei 0/0 gibt es keine. */
  const rateText = !vorher
    ? "erst ab k = 1"
    : !(vorher.sinPhi > 0)
      ? "nicht definiert, der Abstand war schon null"
      : fmt(beobachteteRate);
  const winkelGrad = jetzt ? (Math.asin(Math.min(1, jetzt.sinPhi)) * 180) / Math.PI : NaN;
  /** Startvektor liegt schon exakt auf der gesuchten Eigenrichtung */
  const volltreffer = !nullstart && schritte.length > 0 && schritte[0].sinPhi < 1e-12;

  const setzen = (v: Vec) => {
    setX0(v);
    setK(0);
  };

  return (
    <div>
      <p className="text-sm">
        Wir starten mit einem Vektor unserer Wahl und wenden A immer wieder an, mit Normierung
        nach jedem Schritt. Alle Iterierten liegen deshalb auf dem Einheitskreis. Grün ist die
        gesuchte Richtung v₁ zum größten Eigenwert λ₁ = 9, grau die zweite Eigenrichtung v₂ zu
        λ₂ = 4.
      </p>
      <div className="my-3 flex flex-wrap items-start gap-4">
        <Tafel schritte={schritte} k={kk} />
        <div className="min-w-[19rem] grow">
          <Slider
            label="Start x₁⁽⁰⁾"
            value={x0[0]}
            onChange={(v) => setzen([v, x0[1]])}
            min={-3}
            max={3}
            step={0.1}
            fmt={(v) => v.toFixed(1).replace("-", "−").replace(".", ",")}
          />
          <Slider
            label="Start x₂⁽⁰⁾"
            value={x0[1]}
            onChange={(v) => setzen([x0[0], v])}
            min={-3}
            max={3}
            step={0.1}
            fmt={(v) => v.toFixed(1).replace("-", "−").replace(".", ",")}
          />
          <div className="my-2 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-0.5 text-xs"
              onClick={() => setzen([2, 1.3])}
            >
              Beispiel der Folien (2; 1,3)
            </button>
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-0.5 text-xs"
              onClick={() => setzen([2, 1])}
            >
              Versagensfall x⁽⁰⁾ = v₂
            </button>
            <button
              type="button"
              className="rounded border border-slate-400 px-2 py-0.5 text-xs"
              onClick={() => setzen([-1, 2])}
            >
              Volltreffer x⁽⁰⁾ = v₁
            </button>
          </div>
          <div className="my-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="rounded border border-slate-400 px-3 py-1 text-sm disabled:opacity-40"
              onClick={() => setK((v) => Math.max(0, v - 1))}
              disabled={kk <= 0}
            >
              ◀ zurück
            </button>
            <button
              type="button"
              className="rounded border border-slate-400 bg-slate-100 px-3 py-1 text-sm font-medium disabled:opacity-40 dark:bg-slate-800"
              onClick={() => setK((v) => Math.min(maxK, v + 1))}
              disabled={kk >= maxK}
            >
              nächster Schritt ▶
            </button>
            <span className="text-sm" style={{ color: GREY }}>
              Schritt k = {kk} von {maxK}
            </span>
          </div>
          {nullstart ? (
            <p className="text-sm" style={{ color: RED }}>
              Der Startvektor ist der Nullvektor. Die Normierung teilt dann durch null, die
              Iteration ist gar nicht erst definiert.
            </p>
          ) : (
            <div className="space-y-1 text-sm">
              <div>
                <span style={{ color: GREY }}>Zerlegung des Starts: </span>
                x⁽⁰⁾ = <span style={{ color: GREEN }}>{fmt(c1)}</span> · v₁ +{" "}
                <span style={{ color: GREY }}>{fmt(c2)}</span> · v₂
              </div>
              <div>
                <span style={{ color: GREY }}>Iterierte: </span>
                <span style={{ color: BLUE }}>x⁽{kk}⁾ = {vecStr(jetzt.x)}</span>
              </div>
              <div>
                {kk === 0 ? (
                  <>
                    <span style={{ color: GREY }}>Normschätzung ‖A x⁽ᵏ⁻¹⁾‖ = </span>
                    erst ab k = 1
                  </>
                ) : (
                  <>
                    <span style={{ color: GREY }}>Normschätzung ‖A x⁽{kk - 1}⁾‖ = </span>
                    {fmt(jetzt.nu)}
                  </>
                )}
                <span style={{ color: GREY }}> , Rayleigh-Quotient = </span>
                {fmt(jetzt.rho)}
              </div>
              <div>
                <span style={{ color: RED }}>
                  Abstand zur Eigenrichtung: sin ∠(x⁽{kk}⁾, v₁) = {fmtSci(jetzt.sinPhi)} (
                  {fmt(winkelGrad)}°)
                </span>
              </div>
              <div>
                <span style={{ color: ORANGE }}>beobachtete Rate = {rateText}</span>
                <span style={{ color: GREY }}> , vorhergesagt λ₂/λ₁ = {fmt(RATE)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm" style={{ color: GREY }}>
        {nullstart
          ? "Wählen wir einen Startvektor ungleich null, dann rechnet das Widget wieder."
          : versagt
            ? "Dieser Start hat keinen Anteil in Richtung v₁ (der grüne Koeffizient ist null). A streckt ihn nur um λ₂ = 4, die Iterierte bleibt stehen, und beide Schätzungen liefern hartnäckig 4 statt 9. In exakter Arithmetik kommt die Methode hier nie an."
            : volltreffer
              ? "Der Start liegt schon exakt auf der grünen Richtung. A streckt ihn nur um λ₁ = 9, die Normierung macht das rückgängig, und die Iterierte rührt sich nicht mehr vom Fleck. Einen Abstand, der schrumpfen könnte, gibt es hier nicht."
              : kk === 0
                ? "Noch ist nichts passiert. Der grüne Koeffizient ist ungleich null, also wird die Iteration die grüne Richtung finden; wie schnell, entscheidet das Verhältnis der beiden Koeffizienten."
                : jetzt.sinPhi < 5e-4
                  ? "Iterierte und Eigenrichtung sind auf Zeichengenauigkeit nicht mehr zu unterscheiden. Der Rayleigh-Quotient trifft λ₁ = 9 jetzt auf mehrere Stellen genau."
                  : "Der Abstand zur grünen Richtung schrumpft in jedem Schritt ungefähr um den Faktor λ₂/λ₁ = 0,444. Die orange Rate nähert sich diesem Wert an, sobald der Startanteil in Richtung v₂ abgearbeitet ist."}
      </p>
      {schritte.length > 1 && !nullstart ? (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[30rem] text-left text-xs">
            <thead>
              <tr style={{ color: GREY }}>
                <th className="py-1 pr-3 font-medium">k</th>
                <th className="py-1 pr-3 font-medium">x⁽ᵏ⁾</th>
                <th className="py-1 pr-3 font-medium">‖A x⁽ᵏ⁻¹⁾‖</th>
                <th className="py-1 pr-3 font-medium">Rayleigh</th>
                <th className="py-1 pr-3 font-medium">sin ∠(x⁽ᵏ⁾, v₁)</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {schritte.slice(0, kk + 1).map((s, i) => (
                <tr key={i} className={i === kk ? "font-semibold" : undefined}>
                  <td className="py-0.5 pr-3">{i}</td>
                  <td className="py-0.5 pr-3" style={{ color: BLUE }}>
                    {vecStr(s.x)}
                  </td>
                  <td className="py-0.5 pr-3">{i === 0 ? "–" : fmt(s.nu)}</td>
                  <td className="py-0.5 pr-3">{fmt(s.rho)}</td>
                  <td className="py-0.5 pr-3" style={{ color: RED }}>
                    {fmtSci(s.sinPhi)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
