import { useState } from "react";
import { LabeledTransformCanvas, M, MatrixInput, sigmaMax } from "../../../lib";

/**
 * Operatornorm-Widget: Bild des Einheitskreises unter x ↦ Ax (Ellipse),
 * maximaler Streckfaktor ‖A‖₂ = längste Halbachse sichtbar als gestrichelter
 * Kreis mit Radius σmax. Canvas-/Berechnungscode nach dem Muster der internen
 * Konditions-Spielwiese (heath-ch2 S233), hier auf die Norm fokussiert;
 * alle Texte eigenständig formuliert.
 */

const asMat2 = (A: number[][]): [[number, number], [number, number]] => [
  [A[0][0], A[0][1]],
  [A[1][0], A[1][1]],
];

/** kleinster Singulärwert einer 2×2-Matrix (stärkste Stauchung) */
function sigmaMin(m: [[number, number], [number, number]]): number {
  const [[a, b], [c, d]] = m;
  const T = a * a + b * b + c * c + d * d;
  const det = a * d - b * c;
  return Math.sqrt(Math.max(0, (T - Math.sqrt(Math.max(0, T * T - 4 * det * det))) / 2));
}

/** Einheitsvektor x*, in dessen Richtung ‖Ax‖₂ maximal wird (Eigenvektor von AᵀA zum größten Eigenwert) */
function maxStretchDir(m: [[number, number], [number, number]]): [number, number] {
  const [[a, b], [c, d]] = m;
  const p = a * a + c * c;
  const q = a * b + c * d;
  const r = b * b + d * d;
  if (Math.abs(q) < 1e-12) return p >= r ? [1, 0] : [0, 1];
  const tr = p + r;
  const det = p * r - q * q;
  const l1 = (tr + Math.sqrt(Math.max(0, tr * tr - 4 * det))) / 2;
  const v: [number, number] = [q, l1 - p];
  const n = Math.hypot(v[0], v[1]);
  return [v[0] / n, v[1] / n];
}

/** Spaltensummennorm ‖A‖₁ einer 2×2-Matrix */
const norm1 = (A: number[][]): number =>
  Math.max(Math.abs(A[0][0]) + Math.abs(A[1][0]), Math.abs(A[0][1]) + Math.abs(A[1][1]));

/** Zeilensummennorm ‖A‖∞ einer 2×2-Matrix */
const normInf = (A: number[][]): number =>
  Math.max(Math.abs(A[0][0]) + Math.abs(A[0][1]), Math.abs(A[1][0]) + Math.abs(A[1][1]));

const fmt = (x: number): string =>
  Number.isFinite(x) ? x.toFixed(3).replace(".", ",") : "∞";

export function S33OperatornormWidget() {
  const [A, setA] = useState<number[][]>([
    [2, 1],
    [0, 1],
  ]);
  const m = asMat2(A);
  const smax = sigmaMax(m);
  const smin = sigmaMin(m);
  const xStar = maxStretchDir(m);
  const AxStar: [number, number] = [
    m[0][0] * xStar[0] + m[0][1] * xStar[1],
    m[1][0] * xStar[0] + m[1][1] * xStar[1],
  ];
  const worldHalf = Math.max(2.4, 1.25 * smax);
  const annotate = (
    ctx: CanvasRenderingContext2D,
    toPx: (x: number, y: number) => [number, number]
  ) => {
    if (!(smax > 1e-9)) return;
    const [cx, cy] = toPx(0, 0);
    const [ex] = toPx(smax, 0);
    ctx.strokeStyle = "#0072B2";
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, ex - cx, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
  };
  return (
    <div>
      <p className="text-sm">
        Die Matrix <M>{"\\bA"}</M> bildet den Einheitskreis (gestrichelt, grau) auf eine
        Ellipse ab (blau, durchgezogen). Die Operatornorm{" "}
        <M>{"\\left\\| \\bA \\right\\|_2"}</M> ist die längste Halbachse dieser Ellipse:
        Der gestrichelte blaue Kreis hat genau den Radius{" "}
        <M>{"\\left\\| \\bA \\right\\|_2"}</M>, und die Ellipse berührt ihn in Richtung
        des am stärksten gestreckten Einheitsvektors <M>{"\\bx^*"}</M> (grauer Pfeil; sein
        Bild <M>{"\\bA\\bx^*"}</M> ist der blaue Pfeil).
      </p>
      <div className="my-3 flex flex-wrap items-start gap-4">
        <div className="flex items-center gap-2">
          <M>{"\\bA ="}</M>
          <MatrixInput value={A} onChange={setA} />
        </div>
        <LabeledTransformCanvas
          matrix={m}
          showGrid={false}
          showUnitCircle
          size={240}
          worldHalf={worldHalf}
          vectors={[
            { v: xStar, color: "#64748b", label: "x*" },
            { v: AxStar, color: "#0072B2", label: "Ax*" },
          ]}
          annotate={annotate}
        />
        <div className="min-w-52 grow text-sm">
          <div className="rounded bg-slate-100 p-2 font-mono text-xs dark:bg-slate-800">
            <span className="font-semibold text-sky-700 dark:text-sky-400">
              ‖A‖₂ = σ<sub>max</sub> = {fmt(smax)}
            </span>
            <br />
            stärkste Stauchung σ<sub>min</sub> = {fmt(smin)}
            <br />
            ‖A‖₁ (max. Spaltensumme) = {fmt(norm1(A))}
            <br />
            ‖A‖∞ (max. Zeilensumme) = {fmt(normInf(A))}
          </div>
          <p className="mt-2">
            Probieren wir ein paar Fälle aus: Mit der Voreinstellung{" "}
            <M>{"\\bA = \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix}"}</M> sehen wir
            die Werte aus Beispiel 3.3.3 (<M>{"\\left\\| \\bA \\right\\|_2 \\approx 2{,}29"}</M>).
            Eine Drehmatrix wie{" "}
            <M>{"\\begin{pmatrix} 0{,}6 & -0{,}8 \\\\ 0{,}8 & 0{,}6 \\end{pmatrix}"}</M>{" "}
            lässt den Kreis unverzerrt — alle Streckfaktoren sind 1. Skalieren wir alle
            Einträge mit 10, wächst die Norm um denselben Faktor mit. Und die drei
            Operatornormen stimmen im Allgemeinen nicht überein, liegen aber stets in
            derselben Größenordnung.
          </p>
        </div>
      </div>
    </div>
  );
}
