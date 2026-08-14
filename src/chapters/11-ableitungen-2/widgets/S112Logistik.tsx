import { useState, type ReactNode } from "react";
import { Slider, niceTicks } from "../../../lib";

/**
 * §11.2, Anwendung: Der Gradient des logistischen Verlusts bei einem einzigen
 * Merkmal. Links die Sigmoidkurve mit der aktuellen Vorhersage, rechts der
 * Verlust als Funktion von beta samt Tangente und Gradientenschritt.
 *
 * Eigenbau; die SVG-Tafel (Achsen, Ticks, Clip-Bereich, deutsche Formatierung)
 * folgt dem Muster von 10-ableitungen-1/widgets/S101Sekante.tsx.
 *
 * Farben nach dem Kapitel-11-Code: Funktion und Funktionswerte blau,
 * Ableitungsterm/Tangente grün, Ableitungsobjekt (Gradientenpfeil) orange.
 *
 * Deterministisch: keine Zufallszahlen, alle Kurven aus geschlossenen Formeln.
 */

const BLAU = "#0072B2"; // Funktionswerte, Kurven
const GRUEN = "#009E73"; // Tangente, Ableitungsterm
const ORANGE = "#E69F00"; // Gradient, Abstiegsschritt
const ACHSE = "#64748b";
const GITTER = "#cbd5e1";

const sigma = (t: number) => 1 / (1 + Math.exp(-t));

const W = 300;
const H = 210;
const PAD_L = 38;
const PAD_B = 18;
const N_SAMPLES = 240;
const EPS = 1e-6;
/** Schrittweite des gezeigten Gradientenschritts. */
const ALPHA = 0.5;

/** Deutsche Dezimalzahl; unterscheidet undefiniert (NaN) von unendlich. */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  return (Number(s) === 0 ? Math.abs(Number(s)).toFixed(d) : s)
    .replace(".", ",")
    .replace(/^-/, "−");
}

interface TafelProps {
  titel: string;
  xLabel: string;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  clipId: string;
  kinder: (px: (t: number) => number, py: (v: number) => number) => ReactNode;
}

/** Tafel mit beschrifteten Achsen; alles Gezeichnete liegt im Clip-Bereich. */
function Tafel({ titel, xLabel, x0, x1, y0, y1, clipId, kinder }: TafelProps) {
  const px = (t: number) => PAD_L + ((t - x0) / (x1 - x0)) * W;
  const py = (v: number) => ((y1 - v) / (y1 - y0)) * H;
  return (
    <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        {titel} ↑
      </div>
      <svg
        width={PAD_L + W + 8}
        height={H + PAD_B}
        className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={PAD_L} y={0} width={W} height={H} />
          </clipPath>
        </defs>
        {niceTicks(y0, y1).map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={PAD_L + W}
              y1={py(t)}
              y2={py(t)}
              stroke={t === 0 ? ACHSE : GITTER}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill={ACHSE} fontSize={10}>
              {fmt(t, Math.abs(t) >= 1 || t === 0 ? 0 : 1)}
            </text>
          </g>
        ))}
        {niceTicks(x0, x1).map((t) => (
          <g key={`x${t}`}>
            <line
              y1={0}
              y2={H}
              x1={px(t)}
              x2={px(t)}
              stroke={t === 0 ? ACHSE : GITTER}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={px(t)} y={H + 12} textAnchor="middle" fill={ACHSE} fontSize={10}>
              {fmt(t, Math.abs(t) >= 1 || t === 0 ? 0 : 1)}
            </text>
          </g>
        ))}
        <g clipPath={`url(#${clipId})`}>{kinder(px, py)}</g>
      </svg>
      <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
        {xLabel} →
      </div>
    </div>
  );
}

/** Pfad einer Funktion über [x0, x1] in Tafelkoordinaten. */
function pfad(
  f: (t: number) => number,
  x0: number,
  x1: number,
  px: (t: number) => number,
  py: (v: number) => number,
): string {
  const teile: string[] = [];
  for (let i = 0; i <= N_SAMPLES; i++) {
    const t = x0 + ((x1 - x0) * i) / N_SAMPLES;
    teile.push(`${i === 0 ? "M" : "L"}${px(t).toFixed(1)},${py(f(t)).toFixed(1)}`);
  }
  return teile.join(" ");
}

const T0 = -6;
const T1 = 6;
const B0 = -3;
const B1 = 3;

export function LogistikWidget() {
  const [y, setY] = useState(1);
  const [beta, setBeta] = useState(0.5);
  const [x, setX] = useState(1.5);

  const verlust = (b: number) => {
    const p = sigma(b * x);
    return -(y * Math.log(p) + (1 - y) * Math.log(1 - p));
  };

  const t = beta * x;
  const yhat = sigma(t);
  const ell = verlust(beta);
  const grad = (yhat - y) * x;
  const numerisch = (verlust(beta + EPS) - verlust(beta - EPS)) / (2 * EPS);
  const betaNeu = beta - ALPHA * grad;

  // Verlustachse an die tatsächlich auftretenden Werte anpassen.
  let maxVerlust = 0;
  for (let i = 0; i <= N_SAMPLES; i++) {
    maxVerlust = Math.max(maxVerlust, verlust(B0 + ((B1 - B0) * i) / N_SAMPLES));
  }
  const ly1 = Math.max(1.2, 1.12 * maxVerlust);
  const ly0 = -0.09 * ly1;

  let status: string;
  if (x === 0) {
    status =
      `Bei x = 0 hängt gar nichts von beta ab: Es ist t = 0, also ŷ = 0,5 für jedes beta, der Verlust ` +
      `bleibt konstant bei log 2 ≈ 0,693, und der Gradient (ŷ − y)·x ist null. Ein Merkmal, das immer ` +
      `null ist, trägt keine Information, und die Verlustkurve ist eine waagrechte Gerade.`;
  } else if (Math.abs(yhat - y) < 0.05) {
    status =
      `Die Vorhersage ŷ = ${fmt(yhat, 3)} liegt schon dicht an der Beobachtung y = ${y}. Der Fehler ` +
      `ŷ − y = ${fmt(yhat - y, 3)} ist klein, also ist auch der Gradient ${fmt(grad, 4)} klein: Die ` +
      `Verlustkurve ist hier fast flach, ein Gradientenschritt verschiebt beta kaum noch.`;
  } else if (Math.abs(yhat - y) > 0.9) {
    status =
      `Hier liegt das Modell selbstbewusst daneben: ŷ = ${fmt(yhat, 3)} bei y = ${y}. Der Fehler ` +
      `ŷ − y = ${fmt(yhat - y, 3)} schöpft seinen Wertebereich fast aus, entsprechend groß ist der ` +
      `Gradient ${fmt(grad, 3)}. Länger als |x| = ${fmt(Math.abs(x), 2)} kann er nie werden, denn ` +
      `|ŷ − y| ist immer kleiner als 1.`;
  } else {
    status =
      `Der Fehler ŷ − y = ${fmt(yhat - y, 3)} wird mit dem Merkmal x = ${fmt(x, 2)} gewichtet, das ` +
      `ergibt den Gradienten ${fmt(grad, 4)}. Er ist ${grad > 0 ? "positiv" : "negativ"}, der ` +
      `Abstiegsschritt schiebt beta also nach ${grad > 0 ? "links" : "rechts"}, auf ` +
      `${fmt(betaNeu, 2)}. Die grüne Tangente hat genau diese Steigung.`;
  }

  const knopf = (aktiv: boolean) =>
    `rounded border px-2 py-1 text-sm ${
      aktiv
        ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
        : "border-slate-300 dark:border-slate-600"
    }`;

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Eine einzige Beobachtung, ein einziges Merkmal x und ein einziger Parameter beta. Links steht
        die Sigmoidkurve: Sie macht aus dem linearen Score t = beta·x die Wahrscheinlichkeit ŷ, und
        der orange Balken misst den Fehler ŷ − y, also genau den einen Faktor des Gradienten. Rechts
        steht der Verlust als Funktion von beta, dazu die grüne Tangente mit der Steigung
        ∇ℓ(beta) = (ŷ − y)·x und der orange Abstiegsschritt mit Schrittweite 0,5. Der offene Kreis
        zeigt, wo dieser Schritt landet.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm">beobachtete Klasse:</span>
        <button type="button" className={knopf(y === 1)} onClick={() => setY(1)}>
          y = 1
        </button>
        <button type="button" className={knopf(y === 0)} onClick={() => setY(0)}>
          y = 0
        </button>
      </div>

      <Slider
        label="beta"
        value={beta}
        onChange={(v) => setBeta(Math.round(v * 20) / 20)}
        min={-2.5}
        max={2.5}
        step={0.05}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider
        label="x (Merkmal)"
        value={x}
        onChange={(v) => setX(Math.round(v * 10) / 10)}
        min={-2}
        max={2}
        step={0.1}
        fmt={(v) => fmt(v, 1)}
      />

      <div className="flex flex-wrap gap-4">
        <Tafel
          titel="σ(t)"
          xLabel="t = beta·x"
          x0={T0}
          x1={T1}
          y0={-0.12}
          y1={1.15}
          clipId="s112-log-sigma"
          kinder={(px, py) => (
            <>
              <line
                x1={px(T0)}
                x2={px(T1)}
                y1={py(y)}
                y2={py(y)}
                stroke={ACHSE}
                strokeWidth={1}
                strokeDasharray="5 4"
              />
              <text x={px(T0) + 4} y={py(y) - 4} fill={ACHSE} fontSize={10}>
                y = {y}
              </text>
              <path d={pfad(sigma, T0, T1, px, py)} fill="none" stroke={BLAU} strokeWidth={2.4} />
              <line
                x1={px(t)}
                y1={py(yhat)}
                x2={px(t)}
                y2={py(-0.12)}
                stroke={ACHSE}
                strokeWidth={0.8}
                strokeDasharray="2 3"
              />
              <line
                x1={px(t)}
                y1={py(yhat)}
                x2={px(t)}
                y2={py(y)}
                stroke={ORANGE}
                strokeWidth={3}
              />
              <circle cx={px(t)} cy={py(yhat)} r={4.5} fill={BLAU} />
              <text x={px(t) + 7} y={py(yhat) - 5} fill={BLAU} fontSize={11}>
                ŷ = {fmt(yhat, 2)}
              </text>
            </>
          )}
        />

        <Tafel
          titel="ℓ(beta)"
          xLabel="beta"
          x0={B0}
          x1={B1}
          y0={ly0}
          y1={ly1}
          clipId="s112-log-verlust"
          kinder={(px, py) => (
            <>
              <line
                x1={px(B0)}
                y1={py(ell + grad * (B0 - beta))}
                x2={px(B1)}
                y2={py(ell + grad * (B1 - beta))}
                stroke={GRUEN}
                strokeWidth={2.2}
              />
              <path d={pfad(verlust, B0, B1, px, py)} fill="none" stroke={BLAU} strokeWidth={2.4} />
              {Math.abs(grad) > 1e-9 && (
                <>
                  <line
                    x1={px(beta)}
                    y1={py(ell)}
                    x2={px(betaNeu)}
                    y2={py(ell)}
                    stroke={ORANGE}
                    strokeWidth={2.6}
                  />
                  <polygon
                    points={`${px(betaNeu)},${py(ell)} ${px(betaNeu) + (betaNeu > beta ? -8 : 8)},${py(ell) - 4} ${
                      px(betaNeu) + (betaNeu > beta ? -8 : 8)
                    },${py(ell) + 4}`}
                    fill={ORANGE}
                  />
                  <circle
                    cx={px(betaNeu)}
                    cy={py(verlust(betaNeu))}
                    r={4}
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth={2}
                  />
                </>
              )}
              <circle cx={px(beta)} cy={py(ell)} r={4.5} fill={BLAU} />
            </>
          )}
        />
      </div>

      <div className="max-w-prose font-mono text-sm">
        <div style={{ color: BLAU }}>
          Score t = beta·x = {fmt(t, 3)}, Vorhersage ŷ = σ(t) = {fmt(yhat, 4)}
        </div>
        <div style={{ color: BLAU }}>Verlust ℓ(beta) = {fmt(ell, 4)}</div>
        <div style={{ color: ORANGE }}>
          Gradient ∇ℓ(beta) = (ŷ − y)·x = ({fmt(yhat, 3)} − {y}) · {fmt(x, 1)} = {fmt(grad, 4)}
        </div>
        <div>Gegenprobe (ℓ(beta+ε) − ℓ(beta−ε))/(2ε) = {fmt(numerisch, 4)}</div>
      </div>

      <p className="max-w-prose text-sm">{status}</p>
    </div>
  );
}
