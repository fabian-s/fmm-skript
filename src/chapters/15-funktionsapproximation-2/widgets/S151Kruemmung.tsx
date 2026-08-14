import { useMemo, useState } from "react";
import { niceTicks } from "../../../lib";

/**
 * §15.1: Kruemmungsvergleich am Beispiel (0,0), (1,1), (2,0).
 *
 * Eigenbau; ersetzt den R-Chunk `kruemmung-plot` der Folie
 * (15-funktionsapproximation-II.Rmd). Kein Code und kein Text ist aus einer
 * fremden App uebernommen, die Integrale rechnet das Widget selbst
 * (Simpson-Regel je Teilintervall).
 *
 * Gezeigt wird die ganze Schar g_t = s + t (p - s): Weil p - s an den drei
 * Stuetzstellen verschwindet, interpoliert JEDES g_t dieselben Punkte.
 * t = 0 ist der natuerliche kubische Spline, t = 1 die Parabel.
 *
 * Farbrollen nach dem Kapitel-15-Code: Daten blau, Schaetzer/Interpolant s
 * gruen, Knoten orange, Abweichung h und Vergleichsfunktion g_t rot.
 *
 * Nachgerechnet (node, check-math-s151.mjs):
 * - s ist C^2, natuerlich (s''(0) = s''(2) = 0) und interpoliert die Punkte.
 * - J(s) = 3 + 3 = 6, J(p) = 4 * 2 = 8, Kreuzterm exakt 0.
 * - J(g_t) = 6 + 2t^2 (Simpson trifft die Formel ueber den ganzen
 *   Reglerbereich auf 1e-9 genau).
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ORANGE = "#E69F00";
const ROT = "#D55E00";
const ACHSE = "#64748b";

const DATEN: Array<[number, number]> = [
  [0, 0],
  [1, 1],
  [2, 0],
];

/** natuerlicher kubischer Spline durch (0,0), (1,1), (2,0) */
const sVal = (x: number) =>
  x <= 1 ? 1.5 * x - 0.5 * x ** 3 : 1.5 * (2 - x) - 0.5 * (2 - x) ** 3;
/** zweite Ableitung des Splines: zwei Geradenstuecke */
const sZwei = (x: number) => (x <= 1 ? -3 * x : -3 * (2 - x));
/** Parabel durch dieselben drei Punkte */
const pVal = (x: number) => -x * x + 2 * x;
const P_ZWEI = -2;

/** Vergleichsinterpolant g_t = s + t (p - s) */
const gVal = (x: number, t: number) => (1 - t) * sVal(x) + t * pVal(x);
const gZwei = (x: number, t: number) => (1 - t) * sZwei(x) + t * P_ZWEI;

/** Simpson-Regel mit gerader Intervallzahl */
function simpson(f: (x: number) => number, a: number, b: number, n = 2000): number {
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  for (let i = 1; i < n; i++) sum += (i % 2 === 1 ? 4 : 2) * f(a + i * h);
  return (sum * h) / 3;
}

/** Kruemmungsfunktional, je Teilintervall getrennt (Knick von s'' bei x = 1) */
function funktional(t: number): number {
  const q = (x: number) => gZwei(x, t) ** 2;
  return simpson(q, 0, 1) + simpson(q, 1, 2);
}

const W = 430;
const H = 260;
const PAD = { l: 42, r: 12, t: 12, b: 28 };

function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  return (Number(s) === 0 ? Math.abs(Number(s)).toFixed(d) : s)
    .replace(".", ",")
    .replace(/^-/, "−");
}

interface Ansicht {
  id: "kurven" | "kruemmung";
  label: string;
  yd: [number, number];
  achse: string;
  sLegende: string;
  gLegende: string;
  fs: (x: number) => number;
  fg: (x: number, t: number) => number;
}

const ANSICHTEN: Ansicht[] = [
  {
    id: "kurven",
    label: "Kurven f(x)",
    yd: [-0.25, 1.3],
    achse: "f(x)",
    sLegende: "Spline s",
    gLegende: "g_t",
    fs: sVal,
    fg: gVal,
  },
  {
    id: "kruemmung",
    label: "zweite Ableitung f″(x)",
    yd: [-4.6, 2.6],
    achse: "f″(x)",
    sLegende: "s″",
    gLegende: "g_t″",
    fs: sZwei,
    fg: gZwei,
  },
];

export function KruemmungsVergleich() {
  const [ansichtId, setAnsichtId] = useState<"kurven" | "kruemmung">("kurven");
  const [tPromille, setTPromille] = useState(1000);

  const t = tPromille / 1000;
  const ansicht = ANSICHTEN.find((a) => a.id === ansichtId) ?? ANSICHTEN[0];

  const Js = useMemo(() => funktional(0), []);
  const Jg = useMemo(() => funktional(t), [t]);

  const xd: [number, number] = [-0.12, 2.12];
  const px = (x: number) =>
    PAD.l + ((x - xd[0]) / (xd[1] - xd[0])) * (W - PAD.l - PAD.r);
  const py = (y: number) =>
    PAD.t + ((ansicht.yd[1] - y) / (ansicht.yd[1] - ansicht.yd[0])) * (H - PAD.t - PAD.b);

  /** Kurvenzug in zwei Stuecken, damit der Knick bei x = 1 exakt sitzt */
  const pfad = (f: (x: number) => number) => {
    let d = "";
    for (const [a, b] of [
      [0, 1],
      [1, 2],
    ]) {
      const n = 120;
      for (let i = 0; i <= n; i++) {
        const x = a + ((b - a) * i) / n;
        const y = f(x);
        if (!Number.isFinite(y)) continue;
        d += `${i === 0 ? "M" : "L"}${px(x).toFixed(1)} ${py(y).toFixed(1)}`;
      }
    }
    return d;
  };

  const pfadS = pfad(ansicht.fs);
  const pfadG = pfad((x) => ansicht.fg(x, t));
  const deckungsgleich = Math.abs(t) < 1e-9;

  const knopf = (aktiv: boolean) =>
    `rounded border px-2 py-1 text-sm ${
      aktiv
        ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
        : "border-slate-300 dark:border-slate-600"
    }`;

  let status: string;
  if (deckungsgleich) {
    status =
      `Bei t = 0 ist g₀ der natürliche kubische Spline selbst, die rote Kurve liegt auf der ` +
      `grünen. Das Krümmungsintegral steht bei ${fmt(Jg)} und ist über den ganzen Regler ` +
      `hinweg der kleinste erreichbare Wert: Der Beweis zu Satz 15.1.4 liefert ` +
      `J(g) = J(s) + ∫(h″)², und der Zusatzterm ist genau dann null, wenn h verschwindet.`;
  } else if (Math.abs(t - 1) < 1e-9) {
    status =
      `Bei t = 1 steht die Parabel p(x) = −x² + 2x da. Ihre zweite Ableitung ist konstant −2, ` +
      `das Integral also 4 · 2 = ${fmt(Jg)}. Der Spline kommt mit ${fmt(Js)} aus, der Überschuss ` +
      `${fmt(Jg - Js)} ist ∫(h″)² mit h = p − s. Beide Kurven treffen dieselben drei blauen Punkte.`;
  } else {
    let lage: string;
    if (t < 0) {
      lage =
        `Wegen p − s ≥ 0 liegt g_t für negative t zwischen den Stützstellen unter dem Spline, ` +
        `und im Knoten x = 1 ist es mit g_t″(1) = ${fmt(-3 + t, 2)} stärker gekrümmt als der ` +
        `Spline mit −3.`;
    } else if (t < 1) {
      lage = `Für t zwischen 0 und 1 verläuft g_t zwischen Spline und Parabel.`;
    } else {
      lage = `Für t über 1 zieht g_t noch über die Parabel hinaus.`;
    }
    status =
      `Der Regler steht bei t = ${fmt(t, 2)}. Die rote Kurve g_t = s + t·(p − s) interpoliert ` +
      `dieselben drei Punkte wie der Spline, denn p − s verschwindet an den Stützstellen. Ihr ` +
      `Krümmungsintegral ist ${fmt(Jg)} gegen ${fmt(Js)} beim Spline, der Überschuss ${fmt(Jg - Js)} ` +
      `stimmt mit 2t² = ${fmt(2 * t * t)} überein. ${lage}`;
  }

  const zeigeKruemmung = ansichtId === "kruemmung";

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Blau sind die drei Datenpunkte, orange die Knoten, grün der natürliche kubische Spline s,
        rot der Vergleichsinterpolant g_t = s + t·(p − s). Bei t = 1 ist das genau die Parabel
        p(x) = −x² + 2x. Die Integrale rechnet das Widget mit der Simpson-Regel auf beiden
        Teilintervallen aus.
      </p>

      <div className="flex flex-wrap gap-2">
        {ANSICHTEN.map((a) => (
          <button
            key={a.id}
            type="button"
            className={knopf(a.id === ansichtId)}
            onClick={() => setAnsichtId(a.id)}
          >
            {a.label}
          </button>
        ))}
        <button type="button" className={knopf(false)} onClick={() => setTPromille(0)}>
          t = 0 (Spline)
        </button>
        <button type="button" className={knopf(false)} onClick={() => setTPromille(1000)}>
          t = 1 (Parabel)
        </button>
      </div>

      <label className="my-1 flex items-center gap-3 text-sm">
        <span className="w-28 shrink-0 text-right">Mischung t</span>
        <input
          type="range"
          className="grow accent-sky-600"
          min={-1000}
          max={2000}
          step={50}
          value={tPromille}
          onChange={(e) => setTPromille(Number(e.target.value))}
        />
        <span className="w-16 shrink-0 font-mono text-xs">{fmt(t, 2)}</span>
      </label>

      <div className="flex flex-wrap items-start gap-4">
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <rect
            x={PAD.l}
            y={PAD.t}
            width={W - PAD.l - PAD.r}
            height={H - PAD.t - PAD.b}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth={0.8}
          />
          {niceTicks(xd[0], xd[1]).map((v) => (
            <g key={`x${v}`}>
              <line x1={px(v)} x2={px(v)} y1={H - PAD.b} y2={H - PAD.b + 3} stroke={ACHSE} />
              <text x={px(v)} y={H - PAD.b + 14} textAnchor="middle" fontSize={9} fill={ACHSE}>
                {String(v).replace("-", "−").replace(".", ",")}
              </text>
            </g>
          ))}
          {niceTicks(ansicht.yd[0], ansicht.yd[1]).map((v) => (
            <g key={`y${v}`}>
              <line x1={PAD.l - 3} x2={PAD.l} y1={py(v)} y2={py(v)} stroke={ACHSE} />
              <text x={PAD.l - 5} y={py(v) + 3} textAnchor="end" fontSize={9} fill={ACHSE}>
                {String(v).replace("-", "−").replace(".", ",")}
              </text>
            </g>
          ))}
          <line x1={PAD.l} x2={W - PAD.r} y1={py(0)} y2={py(0)} stroke={ACHSE} strokeWidth={1} />
          <text x={W - PAD.r - 4} y={py(0) - 5} textAnchor="end" fontSize={10} fill={ACHSE}>
            x
          </text>
          <text x={PAD.l + 3} y={PAD.t + 10} fontSize={10} fill={ACHSE}>
            {ansicht.achse}
          </text>

          {DATEN.map(([x]) => (
            <line
              key={`k${x}`}
              x1={px(x)}
              x2={px(x)}
              y1={PAD.t}
              y2={H - PAD.b}
              stroke={ORANGE}
              strokeDasharray="2 4"
              strokeWidth={1}
            />
          ))}

          <path d={pfadS} fill="none" stroke={GRUEN} strokeWidth={2.6} />
          <path d={pfadG} fill="none" stroke={ROT} strokeWidth={1.8} strokeDasharray="6 3" />

          {!zeigeKruemmung &&
            DATEN.map(([x, y]) => (
              <circle key={`d${x}`} cx={px(x)} cy={py(y)} r={4.5} fill={BLAU} />
            ))}

          <g fontSize={10}>
            <text x={W - PAD.r - 8} y={PAD.t + 14} textAnchor="end" fill={GRUEN}>
              Spline s
            </text>
            <text x={W - PAD.r - 8} y={PAD.t + 27} textAnchor="end" fill={ROT}>
              g_t
            </text>
          </g>
        </svg>

        <div className="min-w-56 grow space-y-2">
          <table className="w-full text-right font-mono text-xs">
            <tbody>
              <tr>
                <td className="px-2 py-0.5 text-left">Mischung t</td>
                <td className="px-2 py-0.5">{fmt(t, 2)}</td>
              </tr>
              <tr>
                <td className="px-2 py-0.5 text-left" style={{ color: GRUEN }}>
                  J(s) = ∫₀² |s″|²
                </td>
                <td className="px-2 py-0.5" style={{ color: GRUEN }}>
                  {fmt(Js)}
                </td>
              </tr>
              <tr>
                <td className="px-2 py-0.5 text-left" style={{ color: ROT }}>
                  J(g_t) = ∫₀² |g_t″|²
                </td>
                <td className="px-2 py-0.5" style={{ color: ROT }}>
                  {fmt(Jg)}
                </td>
              </tr>
              <tr className="font-semibold">
                <td className="px-2 py-0.5 text-left">Überschuss ∫(h″)²</td>
                <td className="px-2 py-0.5">{fmt(Jg - Js)}</td>
              </tr>
            </tbody>
          </table>
          <p className="px-2 text-xs text-slate-600 dark:text-slate-400">
            Die Teilintegrale des Splines sind ∫₀¹ 9x² dx = 3 und ∫₁² 9(2 − x)² dx = 3.
          </p>
        </div>
      </div>

      <p className="max-w-prose text-sm text-slate-700 dark:text-slate-300">{status}</p>
    </div>
  );
}
