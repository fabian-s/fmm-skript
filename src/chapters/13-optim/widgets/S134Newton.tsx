import { useMemo, useState } from "react";
import { niceTicks, Slider } from "../../../lib";

/**
 * §13.4: Newton-Labor zu den Folien „Newton-Verfahren: Idee",
 * „Newton-Verfahren: Geometrische Intuition" (zwei Tafeln) und „Newton für
 * nicht-konvexe Funktionen" (13-optim.Rmd Z. 660-721). Es ersetzt die
 * Grafiken resources/optim-newton-intuition.pdf, -iter2.pdf und
 * -nonconvex.pdf.
 *
 * CODE-Vorlage: NewtonBasinLab und der Funktionsplotter FPlot aus
 * heath-ch5-6/src/sections/widgets/S64Widgets.tsx (Startpunkt-Regler,
 * Modell-Overlay, Statusabfrage flach/divergent). Sämtliche Beschriftungen,
 * Statustexte und Beispielfunktionen sind neu; die Prosa der Quell-App ist
 * buchadaptiert und wird hier nicht verwendet.
 *
 * Zwei Beispielfunktionen:
 *  (1) f(x) = x - 2 ln x auf (0, 5]: strikt konvex, Minimum x* = 2. Der
 *      Newton-Schritt ist x -> x(4-x)/2, der Fehler erfüllt EXAKT
 *      e_{k+1} = e_k^2 / 2 (nachgerechnet: von x0 = 1 aus 1,5 / 1,875 /
 *      1,9921875 / 1,99996948 mit Fehlern 1 / 0,5 / 0,125 / 7,8125e-3 /
 *      3,0518e-5 und Quotienten konstant 0,5 = |f'''(2)|/(2 f''(2))).
 *      Ab x0 >= 4 springt der Schritt aus dem Definitionsbereich.
 *  (2) f(x) = x^4/4 - x^3/3 - x^2 + 2: kritische Punkte -1 (lokales Minimum,
 *      f = 1,583), 0 (lokales Maximum, f = 2) und 2 (globales Minimum,
 *      f = -0,667); f'' verschwindet bei -0,5486 und 1,2153. Von x0 = -2 aus
 *      landet Newton im LOKALEN Minimum, von x0 = 0,5 aus exakt im lokalen
 *      MAXIMUM (ein Schritt), von x0 = 2,5 aus im globalen Minimum.
 *
 * Farbrollen (Farbcode Kapitel 13): blau die Funktion und die Iterierten,
 * orange das quadratische Modell T_2 samt Scheitel (es kommt aus Gradient
 * und Hesse-Matrix), grün das Minimum, rot Warnungen (Modell nach unten
 * geöffnet, Schritt undefiniert, Definitionsbereich verlassen).
 *
 * Alles ist deterministisch; kein Math.random.
 */

const BLAU = "#0072B2"; // Funktion und Iterierte
const GRUEN = "#009E73"; // Minimum
const ROT = "#D55E00"; // Warnungen
const ORANGE = "#E69F00"; // quadratisches Modell und sein Scheitel

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

function fmtE(v: number): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  if (v === 0) return "0";
  const [m, e] = v.toExponential(2).split("e");
  return `${m.replace(".", ",").replace(/^-/, "−")}·10^${Number(e)}`;
}

interface Beispiel {
  name: string;
  formel: string;
  f: (x: number) => number;
  f1: (x: number) => number;
  f2: (x: number) => number;
  xd: [number, number];
  yd: [number, number];
  x0min: number;
  x0max: number;
  x0step: number;
  start: number;
  /** Stellen, an denen der Gradient verschwindet, mit Rolle. */
  kritisch: { x: number; art: "min" | "max"; global?: boolean }[];
}

const KONVEX: Beispiel = {
  name: "konvex: f(x) = x − 2 ln x",
  formel: "f(x) = x − 2 ln x,  f′(x) = 1 − 2/x,  f″(x) = 2/x²",
  f: (x) => (x > 0 ? x - 2 * Math.log(x) : NaN),
  f1: (x) => (x > 0 ? 1 - 2 / x : NaN),
  f2: (x) => (x > 0 ? 2 / (x * x) : NaN),
  xd: [0.15, 5],
  yd: [0.3, 3.2],
  x0min: 0.3,
  x0max: 4.6,
  x0step: 0.1,
  start: 1,
  kritisch: [{ x: 2, art: "min", global: true }],
};

const NICHTKONVEX: Beispiel = {
  name: "nicht konvex: f(x) = x⁴/4 − x³/3 − x² + 2",
  formel: "f(x) = x⁴/4 − x³/3 − x² + 2,  f′(x) = x³ − x² − 2x,  f″(x) = 3x² − 2x − 2",
  f: (x) => x ** 4 / 4 - x ** 3 / 3 - x * x + 2,
  f1: (x) => x ** 3 - x * x - 2 * x,
  f2: (x) => 3 * x * x - 2 * x - 2,
  xd: [-2.1, 3.1],
  yd: [-1.2, 5],
  x0min: -2,
  x0max: 3,
  x0step: 0.05,
  start: -2,
  kritisch: [
    { x: -1, art: "min" },
    { x: 0, art: "max" },
    { x: 2, art: "min", global: true },
  ],
};

const BEISPIELE = [KONVEX, NICHTKONVEX];

type Ausgang = "konvergiert" | "flach" | "undefiniert" | "weg" | "maxIter";

/** Newton-Iteration für f′ = 0; bricht bei singulärer Krümmung ab. */
function newtonLauf(b: Beispiel, x0: number): { xs: number[]; ausgang: Ausgang } {
  const xs = [x0];
  let x = x0;
  for (let i = 0; i < 60; i++) {
    const eins = b.f1(x);
    const zwei = b.f2(x);
    if (!Number.isFinite(eins) || !Number.isFinite(zwei)) return { xs, ausgang: "undefiniert" };
    if (Math.abs(eins) < 1e-13) return { xs, ausgang: "konvergiert" };
    if (Math.abs(zwei) < 1e-12) return { xs, ausgang: "flach" };
    const neu = x - eins / zwei;
    xs.push(neu);
    if (!Number.isFinite(neu) || Math.abs(neu) > 1e6) return { xs, ausgang: "weg" };
    if (!Number.isFinite(b.f(neu))) return { xs, ausgang: "undefiniert" };
    if (Math.abs(neu - x) < 1e-14) return { xs, ausgang: "konvergiert" };
    x = neu;
  }
  return { xs, ausgang: "maxIter" };
}

const W = 470;
const H = 260;
const PL = 44;
const PB = 30;
const PT = 10;
const PR = 12;
const IW = W - PL - PR;
const IH = H - PT - PB;

/** Kurve als SVG-Pfad; nicht definierte Stellen unterbrechen den Zug. */
function pfad(g: (x: number) => number, xd: [number, number], sx: (x: number) => number, sy: (y: number) => number) {
  let d = "";
  let stift = false;
  for (let i = 0; i <= 400; i++) {
    const x = xd[0] + ((xd[1] - xd[0]) * i) / 400;
    const y = g(x);
    if (!Number.isFinite(y)) {
      stift = false;
      continue;
    }
    d += `${stift ? "L" : "M"}${sx(x).toFixed(1)} ${sy(y).toFixed(1)} `;
    stift = true;
  }
  return d;
}

export function NewtonParabelLab() {
  const [wahl, setWahl] = useState(0);
  const b = BEISPIELE[wahl];
  const [x0, setX0] = useState(b.start);
  const [modell, setModell] = useState(true);

  const { xs, ausgang } = useMemo(() => newtonLauf(b, x0), [b, x0]);

  const sx = (x: number) => PL + ((x - b.xd[0]) / (b.xd[1] - b.xd[0])) * IW;
  const sy = (y: number) => PT + ((b.yd[1] - y) / (b.yd[1] - b.yd[0])) * IH;
  const drin = (x: number) => x >= b.xd[0] && x <= b.xd[1];

  const g0 = b.f1(x0);
  const h0 = b.f2(x0);
  const T2 = (x: number) => b.f(x0) + g0 * (x - x0) + 0.5 * h0 * (x - x0) ** 2;
  const scheitel = Math.abs(h0) > 1e-12 ? x0 - g0 / h0 : null;

  const ziel = xs[xs.length - 1];
  const getroffen = b.kritisch.find((k) => Math.abs(ziel - k.x) < 1e-6);
  const globalesMin = b.kritisch.find((k) => k.global)!;
  const fehler = xs.map((x) => Math.abs(x - (getroffen ? getroffen.x : globalesMin.x)));

  let urteil: string;
  if (ausgang === "flach") {
    urteil =
      "An dieser Stelle verschwindet f″. Die Parabel aus Algorithmus 13.4.1 hat dann keinen tiefsten Punkt mehr, den wir ansteuern könnten, und die Division im Newton-Schritt ist nicht ausführbar. Das ist der eindimensionale Fall der Voraussetzung, dass die Hesse-Matrix invertierbar sein muss.";
  } else if (ausgang === "undefiniert") {
    urteil = `Nach ${xs.length - 1} Schritt${xs.length === 2 ? "" : "en"} steht die Iteration bei x = ${fmt(ziel, 3)}, und dort ist f gar nicht mehr erklärt. Newton konvergiert nur lokal: Weit vom Ziel entfernt taugt die Parabel nicht als Modell, und der Schritt kann überall hin zeigen.`;
  } else if (ausgang === "weg") {
    urteil =
      "Die Iterierten laufen davon. Ist die Krümmung an der aktuellen Stelle fast null, so wird der Schritt beliebig lang, und das Modell hat mit der Funktion nichts mehr zu tun.";
  } else if (xs.length === 1) {
    urteil = `Hier ist der Gradient schon null, die Iteration steht also von Anfang an still. ${
      getroffen && getroffen.art === "max"
        ? "Allerdings in einem lokalen Maximum: Newton unterscheidet nicht, welche Sorte kritischer Punkt vor ihm liegt."
        : "Wir stehen bereits in einem Minimum."
    }`;
  } else if (getroffen && getroffen.art === "max") {
    urteil = `Nach ${xs.length - 1} Schritt${xs.length === 2 ? "" : "en"} bleibt die Iteration bei x = ${fmt(getroffen.x, 2)} stehen. Dort hat f ein lokales Maximum. Gesucht war ein Minimum, gefunden hat das Verfahren eine Nullstelle der Ableitung, und das ist beides. Verraten hätte es die Krümmung: Bei f″ < 0 öffnet sich die Parabel nach unten, ihr Scheitel ist der höchste und nicht der tiefste Punkt.`;
  } else if (getroffen && !getroffen.global) {
    urteil = `Die Iteration läuft in ${xs.length - 1} Schritten nach x = ${fmt(getroffen.x, 2)}. Dort liegt zwar ein lokales Minimum, aber nicht das globale: Bei x = ${fmt(globalesMin.x, 2)} ist f um ${fmt(b.f(getroffen.x) - b.f(globalesMin.x), 2)} kleiner. Welches Tal wir finden, entscheidet allein der Startpunkt.`;
  } else if (getroffen) {
    urteil = `Die Iteration erreicht das globale Minimum x⋆ = ${fmt(globalesMin.x, 2)} in ${xs.length - 1} Schritten. In der Nähe des Ziels zeigt die Fehlerspalte die quadratische Konvergenz: Der Quotient eₖ/eₖ₋₁² bleibt beschränkt, die Zahl der richtigen Stellen verdoppelt sich also grob von Schritt zu Schritt. Weiter draußen kann es dagegen dauern, bis die Iteration überhaupt in diese Nähe kommt.`;
  } else {
    urteil = `Nach ${xs.length - 1} Schritten steht die Iteration bei x = ${fmt(ziel, 4)} und ist noch nicht zur Ruhe gekommen.`;
  }

  const zeigeModell = modell && Number.isFinite(g0) && Number.isFinite(h0);

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Blau die Funktion, orange die Parabel, mit der Algorithmus 13.4.1 an der aktuellen Stelle
        rechnet. Wo diese Parabel ihren tiefsten Punkt hat, steht im nächsten Schritt die
        Iterierte; die weiteren blauen Punkte zeigen, wie es danach weitergeht. Wir verschieben
        den Startpunkt und sehen zu, wo die Iteration landet.
      </p>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {BEISPIELE.map((e, i) => (
          <button
            key={e.name}
            type="button"
            className={`rounded border px-3 py-1 ${
              i === wahl
                ? "border-sky-600 bg-sky-50 dark:border-sky-400 dark:bg-sky-900/40"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => {
              setWahl(i);
              setX0(BEISPIELE[i].start);
            }}
          >
            {e.name}
          </button>
        ))}
      </div>
      <Slider
        label="Startpunkt x⁽⁰⁾"
        value={x0}
        onChange={(v) => setX0(Math.round(v / b.x0step) * b.x0step)}
        min={b.x0min}
        max={b.x0max}
        step={b.x0step}
        fmt={(v) => fmt(v, 2)}
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={modell} onChange={(e) => setModell(e.target.checked)} />
        <span>quadratisches Modell T₂ am Startpunkt zeigen</span>
      </label>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: W, maxWidth: "100%" }}
          className="rounded border border-slate-300 bg-white text-slate-500 dark:border-slate-600"
        >
          <defs>
            <clipPath id="s134-newton-clip">
              <rect x={PL} y={PT} width={IW} height={IH} />
            </clipPath>
          </defs>
          <rect x={PL} y={PT} width={IW} height={IH} fill="none" stroke="#cbd5e1" />
          {niceTicks(b.xd[0], b.xd[1]).map((t) => (
            <g key={`x${t}`}>
              <line x1={sx(t)} y1={PT + IH} x2={sx(t)} y2={PT + IH + 4} stroke="#94a3b8" />
              <text x={sx(t)} y={PT + IH + 15} fontSize={10} textAnchor="middle" fill="currentColor">
                {fmt(t, Math.abs(t) < 1 && t !== 0 ? 1 : 0)}
              </text>
            </g>
          ))}
          {niceTicks(b.yd[0], b.yd[1]).map((t) => (
            <g key={`y${t}`}>
              <line x1={PL - 4} y1={sy(t)} x2={PL} y2={sy(t)} stroke="#94a3b8" />
              <text x={PL - 6} y={sy(t) + 3} fontSize={10} textAnchor="end" fill="currentColor">
                {fmt(t, 0)}
              </text>
            </g>
          ))}
          <text x={PL + IW / 2} y={H - 3} fontSize={11} textAnchor="middle" fill="currentColor">
            x
          </text>
          <text
            x={12}
            y={PT + IH / 2}
            fontSize={11}
            textAnchor="middle"
            fill="currentColor"
            transform={`rotate(-90 12 ${PT + IH / 2})`}
          >
            f(x)
          </text>
          <g clipPath="url(#s134-newton-clip)">
            {b.kritisch.map((k) => (
              <line
                key={`k${k.x}`}
                x1={sx(k.x)}
                y1={PT}
                x2={sx(k.x)}
                y2={PT + IH}
                stroke={k.art === "min" ? GRUEN : ROT}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.7}
              />
            ))}
            <path d={pfad(b.f, b.xd, sx, sy)} fill="none" stroke={BLAU} strokeWidth={2} />
            {zeigeModell && (
              <path d={pfad(T2, b.xd, sx, sy)} fill="none" stroke={ORANGE} strokeWidth={2} strokeDasharray="6 4" />
            )}
            {zeigeModell && scheitel !== null && drin(scheitel) && (
              <line
                x1={sx(scheitel)}
                y1={PT}
                x2={sx(scheitel)}
                y2={PT + IH}
                stroke={ORANGE}
                strokeWidth={1.2}
                strokeDasharray="2 3"
              />
            )}
            <polyline
              points={xs
                .filter((x) => drin(x) && Number.isFinite(b.f(x)))
                .map((x) => `${sx(x).toFixed(1)},${sy(b.f(x)).toFixed(1)}`)
                .join(" ")}
              fill="none"
              stroke={BLAU}
              strokeWidth={1.2}
              strokeDasharray="3 3"
              opacity={0.8}
            />
            {xs.slice(0, 6).map(
              (x, i) =>
                drin(x) &&
                Number.isFinite(b.f(x)) && (
                  <circle key={`p${i}`} cx={sx(x)} cy={sy(b.f(x))} r={i === 0 ? 5 : 3.4} fill={BLAU} opacity={i === 0 ? 1 : 0.75} />
                ),
            )}
            {zeigeModell && scheitel !== null && drin(scheitel) && Number.isFinite(T2(scheitel)) && (
              <circle cx={sx(scheitel)} cy={sy(T2(scheitel))} r={4.5} fill={ORANGE} />
            )}
            {b.kritisch
              .filter((k) => k.art === "min")
              .map((k) => (
                <circle key={`m${k.x}`} cx={sx(k.x)} cy={sy(b.f(k.x))} r={5.5} fill="none" stroke={GRUEN} strokeWidth={2} />
              ))}
          </g>
        </svg>
      </div>
      <div className="max-w-prose space-y-2 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p className="font-mono text-xs">{b.formel}</p>
        <p>
          Am Startpunkt <span className="font-mono">x⁽⁰⁾ = {fmt(x0, 2)}</span>:{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            f′ = {fmt(g0)}, f″ = {fmt(h0)}
          </span>
          {h0 < 0 && (
            <span style={{ color: ROT }}> (negativ: die Parabel ist nach unten geöffnet, ihr Scheitel ein Hochpunkt)</span>
          )}
          {scheitel !== null && (
            <>
              {" "}
              Scheitel und damit nächste Iterierte:{" "}
              <span className="font-mono" style={{ color: BLAU }}>
                x⁽¹⁾ = {fmt(scheitel, 4)}
              </span>
              .
            </>
          )}
        </p>
        <table className="font-mono text-xs">
          <thead>
            <tr className="text-slate-500 dark:text-slate-400">
              <th className="pr-4 text-left">k</th>
              <th className="pr-4 text-left">x⁽ᵏ⁾</th>
              <th className="pr-4 text-left">f′(x⁽ᵏ⁾)</th>
              <th className="pr-4 text-left">eₖ</th>
              <th className="text-left">eₖ / eₖ₋₁²</th>
            </tr>
          </thead>
          <tbody>
            {xs.slice(0, 6).map((x, i) => (
              <tr key={`r${i}`}>
                <td className="pr-4">{i}</td>
                <td className="pr-4">{fmt(x, 8)}</td>
                <td className="pr-4">{fmtE(b.f1(x))}</td>
                <td className="pr-4">{fmtE(fehler[i])}</td>
                <td>{i > 0 && fehler[i - 1] > 1e-13 ? fmt(fehler[i] / fehler[i - 1] ** 2, 4) : "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>{urteil}</p>
      </div>
    </div>
  );
}
