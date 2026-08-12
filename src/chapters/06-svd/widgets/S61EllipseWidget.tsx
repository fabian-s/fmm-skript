import { useState } from "react";
import {
  LabeledPlot,
  LabeledTransformCanvas,
  M,
  MatrixInput,
  Slider,
  sigmaMax,
} from "../../../lib";

/**
 * Einheitskreis → Ellipse: Wie lang ist das Bild eines Einheitsvektors, und
 * in welcher Richtung wird am stärksten gestreckt?
 *
 * Berechnungs-/Canvas-Code nach dem Muster der internen SVD-Widgets
 * (mml-ch4: SvdFigure48, SvdStages2x2) und des Operatornorm-Widgets aus
 * Kapitel 3; sämtliche Beschriftungen und Statustexte eigenständig
 * formuliert.
 *
 * Die Folie zeigt eine Abbildung von R^3 nach R^2 (Einheitssphäre → Ellipse
 * in der Ebene). Hier steht das 2x2-Analogon: Einheitskreis in R^2 →
 * Ellipse in R^2. Die Aussage ist dieselbe, nur ohne Perspektivzeichnung.
 */

type Mat2 = [[number, number], [number, number]];

const GRAU = "#64748b";
const ORANGE = "#E69F00";
const BLAU = "#0072B2";
const GRUEN = "#009E73";

/** kleinste Streckung: kleinster Singulärwert einer 2x2-Matrix */
function sigmaMin(m: Mat2): number {
  const [[a, b], [c, d]] = m;
  const T = a * a + b * b + c * c + d * d;
  const det = a * d - b * c;
  return Math.sqrt(Math.max(0, (T - Math.sqrt(Math.max(0, T * T - 4 * det * det))) / 2));
}

/** Einheitsvektor, in dessen Richtung ‖Ax‖ maximal wird (Eigenvektor von AᵀA zum größten Eigenwert) */
function maxStreckRichtung(m: Mat2): [number, number] {
  const [[a, b], [c, d]] = m;
  const p = a * a + c * c;
  const q = a * b + c * d;
  const r = b * b + d * d;
  if (Math.abs(q) < 1e-12) return p >= r ? [1, 0] : [0, 1];
  const spur = p + r;
  const det = p * r - q * q;
  const l1 = (spur + Math.sqrt(Math.max(0, spur * spur - 4 * det))) / 2;
  const v: [number, number] = [q, l1 - p];
  const n = Math.hypot(v[0], v[1]);
  return [v[0] / n, v[1] / n];
}

/** Winkel eines Vektors in Grad, auf [0, 360) normiert */
function winkelGrad(v: [number, number]): number {
  const g = (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  return ((g % 360) + 360) % 360;
}

/** Zahlenausgabe: unbestimmte Werte und Unendlich sauber trennen */
function fmt(x: number, stellen = 3): string {
  if (Number.isNaN(x)) return "nicht definiert";
  if (!Number.isFinite(x)) return "∞";
  return x.toFixed(stellen).replace(".", ",");
}

export function EinheitskreisEllipse() {
  const [Aroh, setAroh] = useState<number[][]>([
    [2, 1],
    [0, 1],
  ]);
  const [theta, setTheta] = useState(20);
  const [zeigeExtreme, setZeigeExtreme] = useState(false);

  const A: Mat2 = [
    [Aroh[0][0] || 0, Aroh[0][1] || 0],
    [Aroh[1][0] || 0, Aroh[1][1] || 0],
  ];
  const bild = (x: [number, number]): [number, number] => [
    A[0][0] * x[0] + A[0][1] * x[1],
    A[1][0] * x[0] + A[1][1] * x[1],
  ];
  const laenge = (grad: number): number => {
    const t = (grad * Math.PI) / 180;
    return Math.hypot(...bild([Math.cos(t), Math.sin(t)]));
  };

  const t = (theta * Math.PI) / 180;
  const x: [number, number] = [Math.cos(t), Math.sin(t)];
  const Ax = bild(x);
  const nAx = Math.hypot(...Ax);

  const smax = sigmaMax(A);
  const smin = sigmaMin(A);
  const xStern = maxStreckRichtung(A);
  const xSenk: [number, number] = [-xStern[1], xStern[0]];
  const AxStern = bild(xStern);
  const AxSenk = bild(xSenk);
  const thetaStern = winkelGrad(xStern);
  const thetaSenk = winkelGrad(xSenk);

  const worldHalf = Math.max(2.4, 1.25 * smax);
  const yMax = Math.max(1, 1.15 * smax);

  const pfeile = [
    { v: x, color: GRAU, label: "x" },
    { v: Ax, color: ORANGE, label: "Ax" },
  ];
  if (zeigeExtreme) {
    pfeile.push(
      { v: xStern, color: BLAU, label: "x*" },
      { v: xSenk, color: BLAU, label: "x⊥" },
      { v: AxStern, color: GRUEN, label: "Ax*" },
      { v: AxSenk, color: GRUEN, label: "Ax⊥" }
    );
  }

  const marker = [
    { x: thetaStern, y: smax, color: ORANGE, label: "max" },
    { x: (thetaStern + 180) % 360, y: smax, color: ORANGE },
    { x: thetaSenk, y: smin, color: ORANGE, label: "min" },
    { x: (thetaSenk + 180) % 360, y: smin, color: ORANGE },
    { x: theta, y: nAx, color: GRAU },
  ];

  return (
    <div className="text-sm">
      <p className="my-2">
        Links läuft der Einheitsvektor <M>{"\\bx"}</M> (grau) auf dem Einheitskreis, sein
        Bild <M>{"\\bA\\bx"}</M> (orange) läuft dabei auf der Bildellipse. Rechts steht
        dieselbe Bewegung als Kurve: Wir tragen die Länge <M>{"\\left\\| \\bA\\bx \\right\\|"}</M>{" "}
        über dem Winkel <M>{"\\theta"}</M> auf. Suchen wir zuerst von Hand das Maximum,
        bevor wir uns die Extremrichtungen einblenden lassen. Diese zeigen dann die beiden
        ausgezeichneten Urbildrichtungen in Blau und ihre Bilder in Grün.
      </p>
      <div className="my-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <M>{"\\bA ="}</M>
          <MatrixInput value={Aroh} onChange={setAroh} />
        </div>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            className="accent-sky-600"
            checked={zeigeExtreme}
            onChange={(e) => setZeigeExtreme(e.target.checked)}
          />
          Extremrichtungen einblenden
        </label>
      </div>
      <Slider
        label="Winkel θ (°)"
        value={theta}
        onChange={setTheta}
        min={0}
        max={360}
        step={1}
        fmt={(g) => g.toFixed(0) + "°"}
      />
      <div className="my-2 flex flex-wrap items-start gap-4">
        <LabeledTransformCanvas
          matrix={A}
          showGrid={false}
          showUnitCircle
          size={260}
          worldHalf={worldHalf}
          vectors={pfeile}
        />
        <LabeledPlot
          xLabel="θ in Grad"
          yLabel="‖Ax(θ)‖"
          xDomain={[0, 360]}
          yDomain={[0, yMax]}
          width={280}
          height={230}
          series={[
            { f: laenge, color: ORANGE },
            { f: () => smax, color: GRAU, dash: [4, 4] },
            { f: () => smin, color: GRAU, dash: [4, 4] },
          ]}
          markers={marker}
        />
        <div className="min-w-56 grow">
          <div className="rounded bg-slate-100 p-2 font-mono text-xs dark:bg-slate-800">
            ‖x‖ = 1 (fest)
            <br />
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              ‖Ax(θ)‖ = {fmt(nAx)} bei θ = {theta.toFixed(0)}°
            </span>
            <br />
            größte Streckung = {fmt(smax)} bei θ = {fmt(thetaStern, 1)}°
            <br />
            kleinste Streckung = {fmt(smin)} bei θ = {fmt(thetaSenk, 1)}°
          </div>
          <p className="mt-2">
            Die Kurve hat Periode <M>{"180^\\circ"}</M>: Ein halber Umlauf führt von{" "}
            <M>{"\\bx"}</M> zu <M>{"-\\bx"}</M>, und das Bild wechselt dabei nur das
            Vorzeichen. Das Maximum der Kurve ist die längste Halbachse der Ellipse, das
            Minimum die kürzeste, und die beiden zugehörigen Richtungen{" "}
            <M>{"\\bx^*"}</M> und <M>{"\\bx^\\perp"}</M> stehen im Urbild wie im Bild
            senkrecht aufeinander. Das ist kein Zufall dieser Matrix:
            Probieren wir eine Drehung wie{" "}
            <M>{"\\begin{pmatrix} 0{,}6 & -0{,}8 \\\\ 0{,}8 & 0{,}6 \\end{pmatrix}"}</M>{" "}
            (die Kurve wird flach, alle Richtungen werden gleich behandelt) oder eine
            singuläre Matrix wie{" "}
            <M>{"\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}"}</M> (die Ellipse fällt
            zu einer Strecke zusammen, die kleinste Streckung ist 0).
          </p>
        </div>
      </div>
    </div>
  );
}
