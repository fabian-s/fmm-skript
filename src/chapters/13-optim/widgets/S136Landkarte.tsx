import { useMemo, useState } from "react";
import {
  Aufgabe,
  clamp,
  DragHandle,
  FMM_COLORS,
  fmtDe,
  Slider,
  useDrag,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
} from "../../../lib";

/**
 * §13.6 — DIE EINE EINSICHT: Verschiedene Startpunkte enden in verschiedenen
 * Minima. Genau das meint „falsche Konvergenz" bei `optim()`: Das Verfahren
 * meldet Erfolg, denn es hat ein lokales Minimum gefunden — nur eben nicht das
 * globale, und niemand warnt davor.
 *
 * Die optim()-Beispielfunktion der Folien als begehbare Landkarte:
 * f(x₁, x₂) = log(1 + (x₁² + sin(3x₂))²) + 0,1·x₁² + 0,1·x₂². Ein Klick, ein
 * Zug oder eine Voreinstellung setzt den Startpunkt, dann läuft
 * Gradientenabstieg mit dem KORREKTEN analytischen Gradienten (der
 * Folien-R-Code hat einen Klammerfehler, siehe Bemerkung 13.6.4). Der
 * Startpunkt lässt sich zusätzlich über zwei Regler setzen (Doppelpfad).
 * Eigenbau, kein portierter Code, kein Math.random.
 *
 * Farbcode Kapitel 13: Trajektorie blau, Endpunkt (Grenzwert) grün,
 * Startpunkt violett (die im Kapitel freie Farbe; Orange ist den Gradienten-
 * und Suchrichtungen vorbehalten). Die Höhenskala bleibt neutral grau, damit
 * sie nicht mit dem Blau der Iterierten kollidiert.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-13-optim/s135.mjs, 2026-08-19;
 * ältere Prüfungen rev136-b.mjs, rev136-c.mjs bestätigt):
 *  - Die drei Voreinstellungen sind die Startpunkte der Folien. (−1; −0,5)
 *    endet im globalen Minimum (0; 0) mit f = 0, (−1; 1) im oberen lokalen
 *    Minimum (0; 1,0357) und (−0,5; −1) im unteren (0; −1,0357), beide mit
 *    f = 0,108456.
 *  - Über ein 81×81-Gitter von Startpunkten im ganzen Fenster gibt es genau
 *    diese DREI Grenzwerte (bis auf das Vorzeichen der Null), der Pfad
 *    verlässt das Fenster nie (größte Koordinate 1,036), und f(Ende) ist
 *    entweder 0 oder 0,108456 — die Schwelle 0,01 im Verdikt trennt sauber.
 */

const BLAU = FMM_COLORS.blau; // Trajektorie
const GRUEN = FMM_COLORS.gruen; // Grenzwert
const VIOLETT = FMM_COLORS.violett; // Startpunkt

const f = (x1: number, x2: number) => {
  const u = x1 * x1 + Math.sin(3 * x2);
  return Math.log1p(u * u) + 0.1 * x1 * x1 + 0.1 * x2 * x2;
};
// korrekter Gradient: Kettenregel mit d/du log(1+u^2) = 2u/(1+u^2)
const grad = (x1: number, x2: number): [number, number] => {
  const u = x1 * x1 + Math.sin(3 * x2);
  const d = (2 * u) / (1 + u * u);
  return [d * 2 * x1 + 0.2 * x1, d * 3 * Math.cos(3 * x2) + 0.2 * x2];
};

const LIM = 1.6;
const W = 320;
const N = 96;

const fmt = (v: number, d = 2) => fmtDe(v, d);

function abstieg(start: [number, number]) {
  let p: [number, number] = [start[0], start[1]];
  const pfad: [number, number][] = [[p[0], p[1]]];
  for (let k = 0; k < 3000; k++) {
    const g = grad(p[0], p[1]);
    p = [p[0] - 0.05 * g[0], p[1] - 0.05 * g[1]];
    if (k % 15 === 0) pfad.push([p[0], p[1]]);
  }
  pfad.push([p[0], p[1]]);
  return { pfad, ende: p, fEnde: f(p[0], p[1]) };
}

const sx = (x: number) => ((x + LIM) / (2 * LIM)) * W;
const sy = (y: number) => (1 - (y + LIM) / (2 * LIM)) * W;

/** Die drei Startpunkte der Folien; sie SIND die Fallunterscheidung. */
const VOREINSTELLUNGEN: [number, number][] = [
  [-1, -0.5],
  [-1, 1],
  [-0.5, -1],
];

/** Landkarte der optim()-Beispielfunktion mit klickbarem GD-Start. */
export function OptimLandkarte() {
  const [start, setStart] = useState<[number, number]>([-1, -0.5]);

  const raster = useMemo(() => {
    const werte: number[][] = [];
    for (let i = 0; i < N; i++) {
      const zeile: number[] = [];
      for (let j = 0; j < N; j++) {
        const x1 = -LIM + ((j + 0.5) / N) * 2 * LIM;
        const x2 = LIM - ((i + 0.5) / N) * 2 * LIM;
        zeile.push(f(x1, x2));
      }
      werte.push(zeile);
    }
    return werte;
  }, []);
  const lauf = useMemo(() => abstieg(start), [start]);

  // Die ganze Karte ist der Griff: ein Klick setzt den Startpunkt, Ziehen
  // schiebt ihn weiter (deshalb KEIN greifPosition, der Punkt soll springen).
  const zieh = useDrag<"p">({
    feld: { x0: 0, y0: 0, w: W, h: W },
    welt: { x0: -LIM, x1: LIM, y0: -LIM, y1: LIM },
    clamp: ([a, b]) => [clamp(a, -LIM, LIM), clamp(b, -LIM, LIM)],
    snap: 0.01,
    onDrag: ([a, b]) => setStart([a, b]),
  });

  const global = lauf.fEnde < 0.01;
  const oben = !global && lauf.ende[1] > 0;
  const art = global ? "ok" : "warn";
  const titel = global
    ? "im globalen Minimum gelandet"
    : oben
      ? "in der oberen Mulde gelandet"
      : "in der unteren Mulde gelandet";
  const text = global
    ? `Von (${fmt(start[0])}; ${fmt(start[1])}) aus läuft der Abstieg nach (0; 0) mit f = 0, dem globalen Minimum. Das ist der Glücksfall, und von außen nicht zu erkennen: Der Rückgabewert sieht genauso aus wie in den beiden anderen Fällen.`
    : `Von (${fmt(start[0])}; ${fmt(start[1])}) aus läuft der Abstieg nach (${fmt(lauf.ende[0])}; ${fmt(lauf.ende[1], 4)}) mit f = ${fmt(lauf.fEnde, 4)}. Dort ist der Gradient null und die Hesse-Matrix positiv definit, es ist also ein sauberes lokales Minimum, nur liegt das globale bei (0; 0) mit f = 0 um ${fmt(lauf.fEnde, 4)} tiefer. Genau das meint Bemerkung 13.6.2 mit „falscher Konvergenz": Das Verfahren hat nichts falsch gemacht, es hat nur nicht gefunden, was wir suchen. Abhilfe schafft keine bessere Schrittweite, sondern nur ein anderer Startpunkt.`;

  const zelle = W / N;
  return (
    <div className="my-2 space-y-3">
      <Aufgabe>
        Setzen wir den Startpunkt an drei verschiedene Stellen und vergleichen die drei
        Endwerte f(Ende).
      </Aufgabe>
      <div className="flex flex-wrap gap-2 text-sm">
        {VOREINSTELLUNGEN.map((p) => {
          const aktiv = Math.abs(start[0] - p[0]) < 1e-9 && Math.abs(start[1] - p[1]) < 1e-9;
          return (
            <button
              key={p.join(",")}
              type="button"
              aria-pressed={aktiv}
              onClick={() => setStart(p)}
              className={`${aktiv ? W_BUTTON_AKTIV : W_BUTTON} font-mono text-xs`}
            >
              Start ({fmt(p[0], 1)}; {fmt(p[1], 1)})
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-start gap-5">
        <svg
          viewBox={`0 0 ${W} ${W}`}
          width={W}
          height={W}
          role="img"
          aria-label={`Höhenkarte der Beispielfunktion mit der Abstiegsbahn von (${fmt(start[0])}; ${fmt(start[1])}) nach (${fmt(lauf.ende[0])}; ${fmt(lauf.ende[1], 2)}).`}
          className="max-w-full h-auto rounded border border-slate-300"
          {...zieh.svgProps}
          {...zieh.surfaceProps("p")}
        >
          {raster.map((zeile, i) =>
            zeile.map((v, j) => {
              // f reicht im Fenster bis 3,09; oberhalb von 2,2 wird die
              // Skala abgeschnitten, sonst verschwinden die flachen Mulden.
              const t = Math.min(1, v / 2.2);
              const hell = Math.round(248 - t * 130);
              return (
                <rect
                  key={i * N + j}
                  x={j * zelle}
                  y={i * zelle}
                  width={zelle + 0.5}
                  height={zelle + 0.5}
                  fill={`rgb(${hell}, ${hell}, ${hell})`}
                />
              );
            }),
          )}
          <polyline
            points={lauf.pfad.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ")}
            fill="none"
            stroke={BLAU}
            strokeWidth={2}
          />
          <circle cx={sx(lauf.ende[0])} cy={sy(lauf.ende[1])} r={5} fill={GRUEN} />
          <DragHandle
            x={sx(start[0])}
            y={sy(start[1])}
            farbe={VIOLETT}
            r={5}
            aktiv={zieh.dragging === "p"}
            {...zieh.handleProps("p")}
          />
        </svg>
        <div className="min-w-52 space-y-2 text-sm">
          <p className="font-mono text-xs">
            Start: ({fmt(start[0])}; {fmt(start[1])})
          </p>
          <p className="font-mono text-xs">
            Ende: ({fmt(lauf.ende[0])}; {fmt(lauf.ende[1], 4)})
          </p>
          <p className="font-mono text-xs">f(Ende) = {fmt(lauf.fEnde, 4)}</p>
          <Slider
            label="Start x₁"
            value={start[0]}
            onChange={(v) => setStart([Math.round(v * 100) / 100, start[1]])}
            min={-LIM}
            max={LIM}
            step={0.01}
            accent={VIOLETT}
          />
          <Slider
            label="Start x₂"
            value={start[1]}
            onChange={(v) => setStart([start[0], Math.round(v * 100) / 100])}
            min={-LIM}
            max={LIM}
            step={0.01}
            accent={VIOLETT}
          />
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Helle Flächen liegen tief, dunkle hoch. Vom violetten Startpunkt läuft der
            Gradientenabstieg über 3000 Schritte mit γ = 0,05 (blaue Spur) bis zum Grenzwert
            (grün).
          </p>
        </div>
      </div>
      <Verdikt kind={art} titel={titel}>
        {text}
      </Verdikt>
    </div>
  );
}
