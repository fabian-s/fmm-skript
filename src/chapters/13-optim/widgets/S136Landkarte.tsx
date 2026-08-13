import { useMemo, useState } from "react";
import { M } from "../../../lib";

/**
 * Die optim()-Beispielfunktion der Folien als begehbare Landkarte (§13.6):
 * f(x1, x2) = log(1 + (x1^2 + sin(3 x2))^2) + 0,1 x1^2 + 0,1 x2^2.
 * Ein Klick (oder eine Voreinstellung) setzt den Startpunkt, dann läuft
 * Gradientenabstieg mit dem KORREKTEN analytischen Gradienten (der
 * Folien-R-Code hat einen Klammerfehler, siehe Skripttext). Verschiedene
 * Startpunkte enden in verschiedenen Minima; genau das meint "falsche
 * Konvergenz" bei optim().
 *
 * Per node verifiziert: Start (-1; -0,5) endet im globalen Minimum (0; 0)
 * mit f = 0, Startpunkte (-1; 1) und (1,2; 0,8) enden im lokalen Minimum
 * (0; 1,036) mit f = 0,108. Alles deterministisch, kein Math.random.
 * Farbcode Kapitel 13: Trajektorie blau, Endpunkt gruen, Startpunkt orange.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ORANGE = "#E69F00";

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

const fmt = (v: number, d = 2) =>
  v.toFixed(d).replace(".", ",").replace(/^-/, "−");

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

/** Landkarte der optim()-Beispielfunktion mit klickbarem GD-Start. */
export function OptimLandkarte() {
  const [start, setStart] = useState<[number, number]>([-1, -0.5]);
  const raster = useMemo(() => {
    let fmax = 0;
    const werte: number[][] = [];
    for (let i = 0; i < N; i++) {
      const zeile: number[] = [];
      for (let j = 0; j < N; j++) {
        const x1 = -LIM + ((j + 0.5) / N) * 2 * LIM;
        const x2 = LIM - ((i + 0.5) / N) * 2 * LIM;
        const v = f(x1, x2);
        zeile.push(v);
        if (v > fmax) fmax = v;
      }
      werte.push(zeile);
    }
    return { werte, fmax };
  }, []);
  const lauf = useMemo(() => abstieg(start), [start]);

  const klick = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 * LIM - LIM;
    const y = LIM - ((e.clientY - r.top) / r.height) * 2 * LIM;
    setStart([Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
  };

  const zelle = W / N;
  return (
    <div className="my-2">
      <p className="mb-2 text-sm">
        Helle Flächen liegen tief, dunkle hoch. Ein Klick in die Karte setzt
        den Startpunkt (orange), von dort läuft Gradientenabstieg mit dem
        korrekten analytischen Gradienten in <M>{"3000"}</M> Schritten
        (<M>{"\\gamma = 0{,}05"}</M>, blaue Spur) bis zum Endpunkt (grün).
        Das globale Minimum liegt bei <M>{"(0;\\ 0)"}</M> mit{" "}
        <M>{"f = 0"}</M>; daneben gibt es lokale Mulden, etwa bei{" "}
        <M>{"(0;\\ \\pm 1{,}04)"}</M> mit <M>{"f \\approx 0{,}11"}</M>. Wo wir
        starten, entscheidet, wo wir ankommen.
      </p>
      <div className="mb-2 flex flex-wrap gap-2 text-sm">
        {(
          [
            [-1, -0.5],
            [-1, 1],
            [1.2, 0.8],
          ] as [number, number][]
        ).map((p) => (
          <button
            key={p.join(",")}
            type="button"
            onClick={() => setStart(p)}
            className="rounded border border-slate-400 bg-slate-100 px-2 py-1 font-mono text-xs dark:bg-slate-800"
          >
            Start ({fmt(p[0], 1)}; {fmt(p[1], 1)})
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-5">
        <svg
          width={W}
          height={W}
          onClick={klick}
          className="cursor-crosshair rounded border border-slate-300"
        >
          {raster.werte.map((zeile, i) =>
            zeile.map((v, j) => {
              const t = Math.min(1, v / 2.2);
              const hell = Math.round(248 - t * 130);
              return (
                <rect
                  key={i * N + j}
                  x={j * zelle}
                  y={i * zelle}
                  width={zelle + 0.5}
                  height={zelle + 0.5}
                  fill={`rgb(${hell - 14}, ${hell}, 255)`}
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
          <circle cx={sx(start[0])} cy={sy(start[1])} r={5} fill={ORANGE} />
          <circle
            cx={sx(lauf.ende[0])}
            cy={sy(lauf.ende[1])}
            r={5}
            fill={GRUEN}
          />
        </svg>
        <div className="min-w-52 text-sm">
          <p className="font-mono text-xs">
            Start: ({fmt(start[0])}; {fmt(start[1])})
          </p>
          <p className="mt-1 font-mono text-xs">
            Ende: ({fmt(lauf.ende[0])}; {fmt(lauf.ende[1])})
          </p>
          <p className="mt-1 font-mono text-xs">f(Ende) = {fmt(lauf.fEnde, 4)}</p>
          <p className="mt-2 text-xs" style={{ color: "#64748b" }}>
            {lauf.fEnde < 0.01
              ? "Das ist das globale Minimum."
              : "Das ist ein lokales Minimum, nicht das globale. Ein anderer Startpunkt findet einen tieferen Wert."}
          </p>
        </div>
      </div>
    </div>
  );
}
