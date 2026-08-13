import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * §13.3: Gradientenabstieg auf f(x) = (x − 2)² + 1, dem Beispiel der Folie
 * „Beispiel Gradientenabstieg: Schritt für Schritt“ (13-optim.Rmd Z. 481–497).
 * Eigenbau; nichts davon ist aus einer Buch-App portiert.
 *
 * Die Schrittweite γ ist frei einstellbar, und weil hier f'' ≡ 2 ist, liegen
 * die drei Schwellen exakt auf dem Reglerraster: 1/L = 0,5 (Treffer in einem
 * Schritt), 2/L = 1 (Dauerpendeln), darüber Divergenz. Der Fehler erfüllt
 * exakt x^(k) − 2 = (1 − 2γ)^k (x^(0) − 2).
 *
 * Farbrollen nach dem Kapitel-13-Code: Iterierte blau, das Minimum grün, der
 * Schritt −γ f'(x^(k)) und die Tangente orange, Divergenzwarnung rot; der
 * Graph von f trägt das im Kapitel freie Violett (wie in S131Bisektion).
 *
 * Nachgerechnet (node, check-math-s133.mjs): γ = 0,6 ab x^(0) = 4,5 liefert
 * 4,5 → 1,5 → 2,1 → 1,98 → 2,004 → 1,9992 mit den Fehlern 2,5 / −0,5 / 0,1 /
 * −0,02 / 0,004 / −0,0008, Faktor also −0,2 = 1 − 2·0,6. Für γ = 0,2/0,4/0,5/
 * 0,9/1,0/1,1 sind die Faktoren 0,6 / 0,2 / 0 / −0,8 / −1 / −1,2.
 */

const BLAU = "#0072B2"; // Iterierte
const GRUEN = "#009E73"; // Minimum
const ORANGE = "#E69F00"; // Schritt und Tangente
const ROT = "#D55E00"; // Divergenzwarnung
const VIOLETT = "#9E57D5"; // Graph von f
const ACHSE = "#64748b";

const f = (x: number) => (x - 2) ** 2 + 1;
const df = (x: number) => 2 * x - 4;
const L = 2; // f'' ≡ 2

const W = 430;
const H = 260;
const PAD_L = 34;
const PAD_B = 24;
const PAD_T = 8;
const PAD_R = 8;
const XMIN = -2.5;
const XMAX = 6.5;
const YMIN = 0;
const YMAX = 22;

const px = (x: number) => PAD_L + ((x - XMIN) / (XMAX - XMIN)) * (W - PAD_L - PAD_R);
const py = (y: number) => H - PAD_B - ((y - YMIN) / (YMAX - YMIN)) * (H - PAD_B - PAD_T);
const clampX = (x: number) => Math.max(XMIN, Math.min(XMAX, x));
const clampY = (y: number) => Math.max(YMIN, Math.min(YMAX, y));

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 4): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  if (Math.abs(v) >= 1e5)
    return v
      .toExponential(2)
      .replace(".", ",")
      .replace("e+", " · 10^")
      .replace("e-", " · 10^−")
      .replace(/^-/, "−");
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

export function GdStepper1D() {
  const [gamma, setGamma] = useState(0.6);
  const [x0, setX0] = useState(4.5);
  const [k, setK] = useState(0);

  // Die ganze Bahn wird aus den Reglern neu gerechnet, es gibt keinen
  // versteckten Zustand ausser der Schrittzahl.
  const bahn: number[] = [x0];
  for (let i = 0; i < k; i++) {
    const x = bahn[bahn.length - 1];
    const next = x - gamma * df(x);
    bahn.push(Number.isFinite(next) ? next : next > 0 ? 1e308 : -1e308);
  }
  const x = bahn[bahn.length - 1];
  const faktor = 1 - gamma * L;

  const kurve: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const xx = XMIN + ((XMAX - XMIN) * i) / 240;
    const yy = f(xx);
    if (yy <= YMAX) kurve.push(`${px(xx).toFixed(1)},${py(yy).toFixed(1)}`);
  }

  const xt = [-2, 0, 2, 4, 6];
  const yt = [5, 10, 15, 20];

  // Tangente im aktuellen Punkt, gezeichnet über eine feste x-Spanne
  const tangSpanne = 1.1;
  const tx1 = clampX(x - tangSpanne);
  const tx2 = clampX(x + tangSpanne);
  const tang = (t: number) => f(x) + df(x) * (t - x);

  const naechste = x - gamma * df(x);
  const imBild = Math.abs(x) < 1e6 && f(x) <= YMAX;

  const tabelle = bahn
    .map((v, i) => ({ i, v, g: df(v), fv: f(v), e: v - 2 }))
    .slice(-7);

  const eps = 1e-9;
  let status: string;
  let statusFarbe = ACHSE;
  if (Math.abs(gamma - 1 / L) < eps) {
    status =
      "γ = 1/L = 0,5 trifft das Minimum in einem einzigen Schritt: der Faktor 1 − γf'' ist genau null. Bei einer Parabel ist das kein Zufall, sondern derselbe Schritt, den das Newton-Verfahren macht.";
    statusFarbe = GRUEN;
  } else if (gamma < 1 / L) {
    status = `γ < 1/L: der Faktor 1 − γf″ = ${fmt(
      faktor,
      2
    )} ist positiv, der Fehler behält sein Vorzeichen und schrumpft in jedem Schritt auf das ${fmt(
      faktor,
      2
    )}-fache. Die Iterierten nähern sich von einer Seite, dafür langsam.`;
    statusFarbe = BLAU;
  } else if (gamma < 2 / L - eps) {
    status = `1/L < γ < 2/L: der Faktor 1 − γf″ = ${fmt(
      faktor,
      2
    )} ist negativ, die Iterierten springen also über das Minimum hinweg. Weil sein Betrag unter 1 liegt, wird der Sprung trotzdem in jedem Schritt kleiner.`;
    statusFarbe = BLAU;
  } else if (Math.abs(gamma - 2 / L) < eps) {
    status =
      "γ = 2/L = 1 ist die Grenze: der Fehler wechselt nur noch das Vorzeichen und behält seinen Betrag. Die Iteration pendelt für immer zwischen zwei Punkten, ohne je näher zu kommen.";
    statusFarbe = ROT;
  } else {
    status = `γ > 2/L: der Betrag des Faktors ist ${fmt(
      Math.abs(faktor),
      2
    )} > 1, jeder Schritt vergrößert den Fehler. Die Folge läuft davon, obwohl sie in jedem einzelnen Schritt in die richtige Richtung startet.`;
    statusFarbe = ROT;
  }

  return (
    <div className="my-3 rounded bg-white p-3 dark:bg-slate-800/60">
      <div className="flex flex-wrap items-start gap-4">
        <div className="inline-block">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            className="max-w-full overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <line x1={PAD_L} y1={py(0)} x2={W - PAD_R} y2={py(0)} stroke={ACHSE} strokeWidth={1} />
            <line x1={px(0)} y1={PAD_T} x2={px(0)} y2={H - PAD_B} stroke={ACHSE} strokeWidth={1} />
            {xt.map((t) => (
              <g key={`x${t}`}>
                <line x1={px(t)} y1={py(0)} x2={px(t)} y2={py(0) + 4} stroke={ACHSE} />
                <text x={px(t)} y={py(0) + 15} fontSize="9" fill={ACHSE} textAnchor="middle">
                  {t}
                </text>
              </g>
            ))}
            {yt.map((t) => (
              <g key={`y${t}`}>
                <line x1={px(0) - 4} y1={py(t)} x2={px(0)} y2={py(t)} stroke={ACHSE} />
                <text x={px(0) - 6} y={py(t) + 3} fontSize="9" fill={ACHSE} textAnchor="end">
                  {t}
                </text>
              </g>
            ))}
            <text x={W - PAD_R} y={py(0) - 6} fontSize="10" fill={ACHSE} textAnchor="end">
              x
            </text>
            <text x={px(0) + 5} y={PAD_T + 9} fontSize="10" fill={ACHSE}>
              f(x)
            </text>

            <polyline points={kurve.join(" ")} fill="none" stroke={VIOLETT} strokeWidth={2} />

            {/* Minimum */}
            <circle cx={px(2)} cy={py(1)} r={5} fill="none" stroke={GRUEN} strokeWidth={2} />
            <text x={px(2)} y={py(1) + 20} fontSize="9" fill={GRUEN} textAnchor="middle">
              x* = 2
            </text>

            {/* Weg der Iterierten auf dem Graphen */}
            <polyline
              points={bahn
                .filter((v) => Number.isFinite(v))
                .map((v) => `${px(clampX(v)).toFixed(1)},${py(clampY(f(v))).toFixed(1)}`)
                .join(" ")}
              fill="none"
              stroke={BLAU}
              strokeWidth={1.2}
              strokeDasharray="4 3"
              opacity={0.8}
            />
            {bahn.map((v, i) =>
              Number.isFinite(v) ? (
                <circle
                  key={i}
                  cx={px(clampX(v))}
                  cy={py(clampY(f(v)))}
                  r={i === bahn.length - 1 ? 5 : 3}
                  fill={BLAU}
                  opacity={i === bahn.length - 1 ? 1 : 0.55}
                />
              ) : null
            )}

            {imBild && (
              <>
                {/* Tangente: die Steigung, aus der der Schritt gebaut wird */}
                <line
                  x1={px(tx1)}
                  y1={py(clampY(tang(tx1)))}
                  x2={px(tx2)}
                  y2={py(clampY(tang(tx2)))}
                  stroke={ORANGE}
                  strokeWidth={1.6}
                />
                {/* Schritt −γ f'(x) auf der x-Achse */}
                <line
                  x1={px(clampX(x))}
                  y1={py(0)}
                  x2={px(clampX(naechste))}
                  y2={py(0)}
                  stroke={ORANGE}
                  strokeWidth={3}
                />
                <line
                  x1={px(clampX(x))}
                  y1={py(clampY(f(x)))}
                  x2={px(clampX(x))}
                  y2={py(0)}
                  stroke={BLAU}
                  strokeWidth={0.9}
                  strokeDasharray="2 3"
                />
                <text
                  x={px(clampX((x + naechste) / 2))}
                  y={py(0) - 6}
                  fontSize="9"
                  fill={ORANGE}
                  textAnchor="middle"
                >
                  −γ f′(x⁽ᵏ⁾)
                </text>
              </>
            )}
            {!imBild && (
              <text x={W / 2} y={H / 2} fontSize="11" fill={ROT} textAnchor="middle">
                x⁽ᵏ⁾ liegt ausserhalb des Fensters
              </text>
            )}
          </svg>
        </div>

        <div className="min-w-60 grow">
          <Slider label="Schrittweite γ" value={gamma} onChange={setGamma} min={0.05} max={1.2} step={0.05} />
          <Slider label="Startwert x⁽⁰⁾" value={x0} onChange={setX0} min={0.5} max={5} step={0.25} />
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setK((v) => v + 1)}
              className="rounded bg-sky-700 px-3 py-1 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Schritt
            </button>
            <button
              onClick={() => setK((v) => v + 5)}
              className="rounded bg-sky-700 px-3 py-1 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Schritt ×5
            </button>
            <button
              onClick={() => setK(0)}
              className="rounded bg-slate-500 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-400"
            >
              Zurücksetzen
            </button>
          </div>
          <div className="mt-2 font-mono text-xs">
            <p>
              f(x) = (x − 2)² + 1, f′(x) = 2x − 4, L = f″ = 2, also 1/L = 0,5 und 2/L = 1
            </p>
            <p>Fehlerfaktor 1 − γf″ = {fmt(faktor, 2)}</p>
            <table className="mt-1 w-full text-right">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400">
                  <th className="pr-2 text-left">k</th>
                  <th className="pr-2">x⁽ᵏ⁾</th>
                  <th className="pr-2">f′(x⁽ᵏ⁾)</th>
                  <th className="pr-2">f(x⁽ᵏ⁾)</th>
                  <th>x⁽ᵏ⁾ − 2</th>
                </tr>
              </thead>
              <tbody>
                {tabelle.map((z) => (
                  <tr key={z.i}>
                    <td className="pr-2 text-left">{z.i}</td>
                    <td className="pr-2">{fmt(z.v)}</td>
                    <td className="pr-2">{fmt(z.g)}</td>
                    <td className="pr-2">{fmt(z.fv)}</td>
                    <td>{fmt(z.e)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm font-semibold" style={{ color: statusFarbe }}>
            {status}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Der orange Balken auf der x-Achse ist der Schritt −γ f′(x⁽ᵏ⁾); die orange
            Gerade darüber ist die Tangente, aus deren Steigung er gebaut wird. In der
            Voreinstellung γ = 0,6 und x⁽⁰⁾ = 4,5 lesen wir die Zahlen aus dem
            Rechenbeispiel des Abschnitts ab. Schieben wir γ nach oben, bis der Fehler das
            Vorzeichen wechselt, und weiter, bis er wächst.
          </p>
        </div>
      </div>
    </div>
  );
}
