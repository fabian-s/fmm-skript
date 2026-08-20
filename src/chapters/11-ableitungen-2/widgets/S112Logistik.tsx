import { useState, type ReactNode } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  fmtDe,
  fmtTick,
  niceTicks,
} from "../../../lib";

/**
 * §11.2, Anwendung: Die EINE Einsicht — der Gradient des logistischen Verlusts
 * ist Fehler mal Merkmal, ∇ℓ(β) = (ŷ − y)·x. Vorzeichen und Betrag hängen
 * damit an einer Größe, die wir sehen können. Links die Sigmoidkurve mit der
 * aktuellen Vorhersage, rechts der Verlust als Funktion von β samt Tangente
 * und Gradientenschritt.
 *
 * Eigenbau; die SVG-Tafel (Achsen, Ticks, Clip-Bereich, deutsche Formatierung)
 * folgt dem Muster von 10-ableitungen-1/widgets/S101Sekante.tsx.
 *
 * Farbrollen Kapitel 11: Funktion und Funktionswerte blau, Ableitungsterm und
 * Tangente grün, Ableitungsobjekte (Fehlerbalken, Gradientenpfeil) orange.
 *
 * Deterministisch: keine Zufallszahlen, alle Kurven aus geschlossenen Formeln.
 *
 * Verifizierte Zahlen (scratchpad/verify-11-ableitungen-2/check-s112.mjs,
 * 2026-08-19). Der geschlossene Gradient (ŷ − y)·x stimmt in BEIDEN Klassen
 * mit dem zentralen Differenzenquotienten (ε = 10⁻⁶) überein, Abweichung
 * höchstens 6·10⁻¹¹; geprüfte Stellen (β; x) = (0,5; 1,5), (−1,2; 1,5),
 * (2; −0,8), (0,5; 0). Beispielwerte für y = 1 und x = 1,5: β = 0,5 gibt
 * ŷ = 0,6792 und Gradient −0,4812, β = −1,5 gibt ŷ = 0,0953 und −1,3570.
 * Die Schranke |∇ℓ| < |x| gilt immer, weil |ŷ − y| < 1 ist. Für x = 0 ist der
 * Verlust konstant log 2 = 0,693147 und der Gradient null. Damit sind die
 * beiden Folienfehler (vertauschte Klassen, falsches Vorzeichen für y = 0)
 * numerisch abgedeckt: In beiden Fällen steht (ŷ − y)·x.
 * R4-Nachprüfung: check-r4-claims.mjs, 2026-08-20.
 */

const BLAU = FMM_COLORS.blau; // Funktionswerte, Kurven
const GRUEN = FMM_COLORS.gruen; // Tangente, Ableitungsterm
const ORANGE = FMM_COLORS.orange; // Fehlerbalken, Gradient, Abstiegsschritt

const sigma = (t: number) => 1 / (1 + Math.exp(-t));

const W = 300;
const H = 210;
const PAD_L = 38;
const PAD_B = 18;
const N_SAMPLES = 240;
const EPS = 1e-6;
/** Schrittweite des gezeigten Gradientenschritts. */
const ALPHA = 0.5;

const fmt = (v: number, d = 3) => fmtDe(v, d);

interface TafelProps {
  titel: string;
  xLabel: string;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  clipId: string;
  ariaLabel: string;
  kinder: (px: (t: number) => number, py: (v: number) => number) => ReactNode;
}

/** Tafel mit beschrifteten Achsen; alles Gezeichnete liegt im Clip-Bereich. */
function Tafel({ titel, xLabel, x0, x1, y0, y1, clipId, ariaLabel, kinder }: TafelProps) {
  const px = (t: number) => PAD_L + ((t - x0) / (x1 - x0)) * W;
  const py = (v: number) => ((y1 - v) / (y1 - y0)) * H;
  const yTicks = niceTicks(y0, y1);
  const xTicks = niceTicks(x0, x1);
  const dY = yTicks.length > 1 ? yTicks[1] - yTicks[0] : undefined;
  const dX = xTicks.length > 1 ? xTicks[1] - xTicks[0] : undefined;
  return (
    <div className={`select-none text-[10px] ${W_MUTED}`}>
      <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
        {titel} ↑
      </div>
      <svg
        viewBox={`0 0 ${PAD_L + W + 8} ${H + PAD_B}`}
        role="img"
        aria-label={ariaLabel}
        className="h-auto max-w-full rounded border"
        style={{ background: "var(--w-bg)", borderColor: "var(--w-border)" }}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={PAD_L} y={0} width={W} height={H} />
          </clipPath>
        </defs>
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line
              x1={PAD_L}
              x2={PAD_L + W}
              y1={py(t)}
              y2={py(t)}
              stroke={t === 0 ? "var(--w-axis)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="var(--w-text)" fontSize={10}>
              {fmtTick(t, dY)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <g key={`x${t}`}>
            <line
              y1={0}
              y2={H}
              x1={px(t)}
              x2={px(t)}
              stroke={t === 0 ? "var(--w-axis)" : "var(--w-grid)"}
              strokeWidth={t === 0 ? 1.2 : 0.6}
            />
            <text x={px(t)} y={H + 12} textAnchor="middle" fill="var(--w-text)" fontSize={10}>
              {fmtTick(t, dX)}
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

  let art: "neutral" | "ok" | "warn" = "neutral";
  let status: string;
  if (x === 0) {
    art = "warn";
    status =
      `Bei x = 0 hängt gar nichts von beta ab: Es ist t = 0, also ŷ = 0,5 für jedes beta, der Verlust ` +
      `bleibt konstant bei log 2 = 0,693147, und der Gradient (ŷ − y)·x aus Gleichung (11.2.6) ist null. Ein ` +
      `Merkmal, das immer null ist, trägt keine Information, und die Verlustkurve ist eine waagrechte ` +
      `Gerade.`;
  } else if (Math.abs(yhat - y) < 0.05) {
    art = "ok";
    status =
      `Die Vorhersage ŷ = ${fmt(yhat, 3)} liegt schon dicht an der Beobachtung y = ${y}. Der Fehler ` +
      `ŷ − y = ${fmt(yhat - y, 3)} ist klein, also ist nach Gleichung (11.2.6) auch der Gradient ` +
      `${fmt(grad, 4)} klein: Die Verlustkurve ist hier fast flach, ein Gradientenschritt verschiebt ` +
      `beta kaum noch.`;
  } else if (Math.abs(yhat - y) > 0.9) {
    art = "warn";
    status =
      `Hier liegt das Modell selbstbewusst daneben: ŷ = ${fmt(yhat, 3)} bei y = ${y}. Der Fehler ` +
      `ŷ − y = ${fmt(yhat - y, 3)} schöpft seinen Wertebereich fast aus, entsprechend groß ist der ` +
      `Gradient ${fmt(grad, 3)}. Länger als |x| = ${fmt(Math.abs(x), 2)} kann er trotzdem nie werden, ` +
      `denn |ŷ − y| ist immer kleiner als 1 – das ist die zweite Konsequenz aus Bemerkung 11.2.11.`;
  } else {
    art = "ok";
    status =
      `Der Fehler ŷ − y = ${fmt(yhat - y, 3)} wird mit dem Merkmal x = ${fmt(x, 2)} gewichtet, das ` +
      `ergibt nach Gleichung (11.2.6) den Gradienten ${fmt(grad, 4)}. Er ist ` +
      `${grad > 0 ? "positiv" : "negativ"}, der Abstiegsschritt schiebt beta also nach ` +
      `${grad > 0 ? "links" : "rechts"}, auf ${fmt(betaNeu, 2)}. Die grüne Tangente hat genau diese ` +
      `Steigung, und die Gegenprobe darunter kommt ohne Beispiel 11.2.10 aus und bestätigt sie.`;
  }
  const gleicheFormel =
    y === 1
      ? "Für y = 1 steht in Gleichung (11.2.6) der Faktor ŷ − 1, für y = 0 der Faktor ŷ."
      : "Für y = 0 steht in Gleichung (11.2.6) der Faktor ŷ, für y = 1 der Faktor ŷ − 1.";
  status = `${status} ${gleicheFormel} Beides ist derselbe Ausdruck (ŷ − y)·x; die Folienfassung dreht hier das Vorzeichen.`;

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir beta, bis der orange Fehlerbalken links am längsten wird, und lesen rechts ab,
        was das für die Steigung der Verlustkurve bedeutet.
      </Aufgabe>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm">beobachtete Klasse:</span>
        <button
          type="button"
          aria-pressed={y === 1}
          className={y === 1 ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setY(1)}
        >
          y = 1
        </button>
        <button
          type="button"
          aria-pressed={y === 0}
          className={y === 0 ? W_BUTTON_AKTIV : W_BUTTON}
          onClick={() => setY(0)}
        >
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

      <div className="grid gap-4 sm:grid-cols-2">
        <Tafel
          titel="σ(t)"
          xLabel="t = beta·x"
          x0={T0}
          x1={T1}
          y0={-0.12}
          y1={1.15}
          clipId="s112-log-sigma"
          ariaLabel={`Die Sigmoidkurve; der Punkt liegt bei t = ${fmt(t, 2)} mit Vorhersage ${fmt(yhat, 2)}, die gestrichelte Linie markiert die beobachtete Klasse y = ${y}.`}
          kinder={(px, py) => (
            <>
              <line
                x1={px(T0)}
                x2={px(T1)}
                y1={py(y)}
                y2={py(y)}
                stroke="var(--w-axis)"
                strokeWidth={1}
                strokeDasharray="5 4"
              />
              <text x={px(T0) + 4} y={py(y) - 4} fill="var(--w-muted)" fontSize={10}>
                y = {y}
              </text>
              <path d={pfad(sigma, T0, T1, px, py)} fill="none" stroke={BLAU} strokeWidth={2.4} />
              <line
                x1={px(t)}
                y1={py(yhat)}
                x2={px(t)}
                y2={py(-0.12)}
                stroke="var(--w-axis)"
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
          ariaLabel={`Der Verlust als Funktion von beta mit der Tangente der Steigung ${fmt(grad, 3)} im aktuellen Punkt.`}
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

      <Verdikt kind={art}>{status}</Verdikt>
    </div>
  );
}
