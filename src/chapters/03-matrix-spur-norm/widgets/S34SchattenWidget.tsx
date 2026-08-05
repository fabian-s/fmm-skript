import { useState } from "react";
import { M, MatrixInput, Slider } from "../../../lib";

/**
 * Singulärwerte einer 2x2-Matrix live: Einheitskreis -> Ellipse, Halbachsen
 * sigma_1/sigma_2, daraus Schatten-1/2/unendlich-Norm. Ein Drehregler
 * demonstriert die unitäre Invarianz: Q_theta*A ändert die Einträge, aber
 * keine der Schattennormen. (Eigenständige Implementierung.)
 */

const ROT = "#D55E00"; // sigma_1 (wie \cred im Text)
const BLAU = "#0072B2"; // sigma_2 (wie \cblue im Text)
const GRUEN = "#009E73"; // elementweise Frobenius-Kontrolle (wie \cgreen)
const NEUTRAL = "#64748b";

type Mat2 = number[][];

function matMul(P: Mat2, A: Mat2): Mat2 {
  return [
    [P[0][0] * A[0][0] + P[0][1] * A[1][0], P[0][0] * A[0][1] + P[0][1] * A[1][1]],
    [P[1][0] * A[0][0] + P[1][1] * A[1][0], P[1][0] * A[0][1] + P[1][1] * A[1][1]],
  ];
}

/** Singulärwerte und -richtungen einer 2x2-Matrix über die Eigenwerte von BᵀB. */
function singulaerwerte(B: Mat2) {
  // BᵀB = [[a, b], [b, c]] (symmetrisch)
  const a = B[0][0] * B[0][0] + B[1][0] * B[1][0];
  const b = B[0][0] * B[0][1] + B[1][0] * B[1][1];
  const c = B[0][1] * B[0][1] + B[1][1] * B[1][1];
  const halb = (a + c) / 2;
  const disc = Math.sqrt(Math.max(0, halb * halb - (a * c - b * b)));
  const l1 = Math.max(0, halb + disc);
  const l2 = Math.max(0, halb - disc);
  // Eigenvektor von BᵀB zu l1 (rechte Singulärrichtung v1), v2 senkrecht dazu
  let v1: [number, number];
  if (Math.abs(b) > 1e-12) {
    const n = Math.hypot(b, l1 - a);
    v1 = [b / n, (l1 - a) / n];
  } else {
    v1 = a >= c ? [1, 0] : [0, 1];
  }
  const v2: [number, number] = [-v1[1], v1[0]];
  const anw = (v: [number, number]): [number, number] => [
    B[0][0] * v[0] + B[0][1] * v[1],
    B[1][0] * v[0] + B[1][1] * v[1],
  ];
  return { s1: Math.sqrt(l1), s2: Math.sqrt(l2), u1: anw(v1), u2: anw(v2) };
}

const de = (x: number, k = 3) => x.toFixed(k).replace(".", ",");

export function S34SchattenWidget() {
  const [A, setA] = useState<Mat2>([
    [2, 1],
    [0, 1],
  ]);
  const [theta, setTheta] = useState(0);

  const t = (theta * Math.PI) / 180;
  const Q: Mat2 = [
    [Math.cos(t), -Math.sin(t)],
    [Math.sin(t), Math.cos(t)],
  ];
  const B = matMul(Q, A);
  const { s1, s2, u1, u2 } = singulaerwerte(B);
  const nuklear = s1 + s2;
  const frob = Math.hypot(s1, s2);
  const frobElement = Math.sqrt(B[0][0] ** 2 + B[0][1] ** 2 + B[1][0] ** 2 + B[1][1] ** 2);

  // Zeichenfläche: Weltkoordinaten -> Pixel
  const size = 320;
  const mitte = size / 2;
  const halbWelt = Math.max(1.6, s1 * 1.2);
  const sc = (size / 2 - 14) / halbWelt;
  const px = (x: number, y: number): [number, number] => [mitte + x * sc, mitte - y * sc];

  // Bild des Einheitskreises unter B (Ellipse mit Halbachsen sigma_1, sigma_2)
  const n = 120;
  const ellipse = Array.from({ length: n + 1 }, (_, i) => {
    const w = (2 * Math.PI * i) / n;
    const [ex, ey] = px(
      B[0][0] * Math.cos(w) + B[0][1] * Math.sin(w),
      B[1][0] * Math.cos(w) + B[1][1] * Math.sin(w)
    );
    return `${i === 0 ? "M" : "L"}${ex.toFixed(1)},${ey.toFixed(1)}`;
  }).join(" ");

  const pfeil = (u: [number, number], farbe: string) => {
    const [zx, zy] = px(u[0], u[1]);
    const len = Math.hypot(zx - mitte, zy - mitte);
    if (len < 4) return null;
    const dx = (zx - mitte) / len;
    const dy = (zy - mitte) / len;
    const kopf = 8;
    return (
      <g stroke={farbe} fill={farbe}>
        <line x1={mitte} y1={mitte} x2={zx} y2={zy} strokeWidth={2.5} />
        <polygon
          points={`${zx},${zy} ${zx - kopf * dx + 0.45 * kopf * dy},${zy - kopf * dy - 0.45 * kopf * dx} ${zx - kopf * dx - 0.45 * kopf * dy},${zy - kopf * dy + 0.45 * kopf * dx}`}
        />
      </g>
    );
  };

  const zeile = (
    name: React.ReactNode,
    wert: string,
    farbe?: string
  ): React.ReactNode => (
    <div className="flex items-baseline justify-between gap-3">
      <span>{name}</span>
      <span className="font-mono text-sm" style={farbe ? { color: farbe } : undefined}>
        {wert}
      </span>
    </div>
  );

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Links sehen wir den Einheitskreis (gestrichelt) und sein Bild unter{" "}
        <M>{"\\bQ_\\theta\\bA"}</M>: eine Ellipse, deren Halbachsen genau die Singulärwerte{" "}
        <M>{"\\cred{\\sigma_1}"}</M> und <M>{"\\cblue{\\sigma_2}"}</M> sind. Ändern wir die
        Einträge von <M>{"\\bA"}</M>, ändern sich Ellipse und Normen. Drehen wir dagegen nur
        mit <M>{"\\bQ_\\theta"}</M>, rotiert die Ellipse — alle Einträge der Matrix ändern
        sich, aber keine einzige Schattennorm.
      </p>
      <div className="flex flex-wrap items-start gap-5">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <line x1={0} y1={mitte} x2={size} y2={mitte} stroke="#e2e8f0" />
          <line x1={mitte} y1={0} x2={mitte} y2={size} stroke="#e2e8f0" />
          <circle
            cx={mitte}
            cy={mitte}
            r={sc}
            fill="none"
            stroke={NEUTRAL}
            strokeDasharray="5 4"
          />
          <path d={ellipse} fill="rgba(2,132,199,0.08)" stroke="#475569" strokeWidth={1.5} />
          {pfeil(u1, ROT)}
          {pfeil(u2, BLAU)}
          <text x={8} y={18} fontSize={12} fill={ROT}>
            σ₁ ≈ {de(s1, 2)}
          </text>
          <text x={8} y={34} fontSize={12} fill={BLAU}>
            σ₂ ≈ {de(s2, 2)}
          </text>
        </svg>
        <div className="min-w-[16rem] max-w-xs grow space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <M>{"\\bA ="}</M>
            <MatrixInput value={A} onChange={setA} />
          </div>
          <Slider
            label="Drehung θ"
            value={theta}
            onChange={setTheta}
            min={0}
            max={360}
            step={1}
            fmt={(v) => `${v.toFixed(0)}°`}
          />
          <div>
            <div className="mb-1 text-xs text-slate-500 dark:text-slate-400">
              Einträge von <M>{"\\bQ_\\theta\\bA"}</M> (ändern sich mit θ):
            </div>
            <div className="inline-grid grid-cols-2 gap-x-3 gap-y-0.5 rounded border-x-2 border-slate-500 px-2 py-1 font-mono text-xs">
              {B.flat().map((v, i) => (
                <span key={i} className="text-right">
                  {de(v, 2)}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1 rounded border border-slate-300 p-2 dark:border-slate-600">
            {zeile(<M>{"\\cred{\\sigma_1}"}</M>, de(s1), ROT)}
            {zeile(<M>{"\\cblue{\\sigma_2}"}</M>, de(s2), BLAU)}
            <hr className="border-slate-300 dark:border-slate-600" />
            {zeile(
              <>
                <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,1}"}</M> (Nuklearnorm)
              </>,
              de(nuklear)
            )}
            {zeile(
              <>
                <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,2}"}</M> (Frobenius)
              </>,
              de(frob)
            )}
            {zeile(
              <>
                <M>{"\\cgreen{\\sqrt{\\textstyle\\sum_{i,j} (\\bQ_\\theta\\bA)_{ij}^2}}"}</M>{" "}
                (elementweise)
              </>,
              de(frobElement),
              GRUEN
            )}
            {zeile(
              <>
                <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,\\infty}"}</M> (Spektralnorm)
              </>,
              de(s1)
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Probieren wir es aus: Schieben wir θ durch — die vier Matrixeinträge ändern sich
            laufend, die Singulärwerte und alle drei Schattennormen bleiben exakt gleich
            (Satz 3.4.7). Die grüne elementweise Summe stimmt dabei stets mit{" "}
            <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,2}"}</M> überein (Korollar 3.4.4).
          </p>
        </div>
      </div>
    </div>
  );
}
