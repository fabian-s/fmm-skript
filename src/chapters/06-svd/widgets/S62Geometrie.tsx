import { useState } from "react";
import { LabeledTransformCanvas, MatrixInput, maxAbsCoord, sigmaMax } from "../../../lib";

/**
 * SVD-Geometrie-Explorer für §6.2: eine editierbare 2×2-Matrix A wird live in
 * A = UΣVᵀ zerlegt, und die vier Tafeln zeigen den Weg des Einheitskreises
 * durch die drei Teilschritte (Vᵀ, Σ, U).
 *
 * Rechenkern und Tafel-Aufbau sind aus der privaten mml-ch4-App portiert
 * (widgets/svdMath.ts: svd2x2; widgets/SvdStages2x2.tsx: Panel-Kette);
 * alle sichtbaren Texte, Beschriftungen und die Farbgebung sind neu und
 * folgen dem Kapitel-Farbcode: blau = rechte Singulärvektoren, orange =
 * Singulärwerte, grün = linke Singulärvektoren.
 */

const BLUE = "#0072B2";
const GREEN = "#009E73";
const ORANGE = "#E69F00";
const GREY = "#64748b";

type Mat2 = [[number, number], [number, number]];

interface Svd2 {
  v1: [number, number];
  v2: [number, number];
  u1: [number, number];
  u2: [number, number];
  s1: number;
  s2: number;
}

/** Geschlossene SVD einer 2×2-Matrix über die Eigenzerlegung von AᵀA. */
function svd2x2(A: Mat2): Svd2 {
  const [[a, b], [c, d]] = A;
  const E = a * a + c * c; // (AᵀA)₁₁
  const F = a * b + c * d; // (AᵀA)₁₂
  const G = b * b + d * d; // (AᵀA)₂₂
  const theta = 0.5 * Math.atan2(2 * F, E - G); // Richtung des dominanten Eigenvektors
  const mean = (E + G) / 2;
  const h = Math.hypot((E - G) / 2, F);
  const s1 = Math.sqrt(Math.max(mean + h, 0));
  const s2 = Math.sqrt(Math.max(mean - h, 0));
  const v1: [number, number] = [Math.cos(theta), Math.sin(theta)];
  const v2: [number, number] = [-Math.sin(theta), Math.cos(theta)];
  const mul = (v: [number, number]): [number, number] => [
    a * v[0] + b * v[1],
    c * v[0] + d * v[1],
  ];
  const im1 = mul(v1);
  const im2 = mul(v2);
  const u1: [number, number] = s1 > 1e-9 ? [im1[0] / s1, im1[1] / s1] : [1, 0];
  const u2: [number, number] = s2 > 1e-9 ? [im2[0] / s2, im2[1] / s2] : [-u1[1], u1[0]];
  return { v1, v2, u1, u2, s1, s2 };
}

/** 3 Dezimalen, deutsches Komma, kein −0; NaN und ±∞ getrennt ausgewiesen. */
function fmt(v: number): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  let r = Math.round(v * 1000) / 1000;
  if (Object.is(r, -0)) r = 0;
  return r.toFixed(3).replace("-", "−").replace(".", ",");
}

const vecStr = (v: [number, number]) => `(${fmt(v[0])}, ${fmt(v[1])})`;

export function SvdGeometrieExplorer() {
  // voreingestellt die 2×2-Matrix aus Kapitel 3 (σ₁ ≈ 2,288, σ₂ ≈ 0,874)
  const [raw, setRaw] = useState<number[][]>([
    [2, 1],
    [0, 1],
  ]);
  const A: Mat2 = [
    [raw[0][0] || 0, raw[0][1] || 0],
    [raw[1][0] || 0, raw[1][1] || 0],
  ];
  const { v1, v2, u1, u2, s1, s2 } = svd2x2(A);

  const I2: Mat2 = [
    [1, 0],
    [0, 1],
  ];
  // Vᵀ hat die v_i als ZEILEN, ΣVᵀ zusätzlich mit σ_i skaliert
  const VT: Mat2 = [
    [v1[0], v1[1]],
    [v2[0], v2[1]],
  ];
  const SVT: Mat2 = [
    [s1 * v1[0], s1 * v1[1]],
    [s2 * v2[0], s2 * v2[1]],
  ];

  // Weltausschnitt so wählen, dass Bildkreis und alle Pfeile im Canvas bleiben
  const half =
    Math.max(
      1,
      sigmaMax(A),
      maxAbsCoord(v1, v2, [s1, s2], [s1 * u1[0], s1 * u1[1]], [s2 * u2[0], s2 * u2[1]])
    ) + 0.6;

  const panels: {
    key: string;
    titel: string;
    m: Mat2;
    vecs: { v: [number, number]; color: string; label: string }[];
  }[] = [
    {
      key: "start",
      titel: "0 · Ausgangslage: Einheitskreis mit v₁, v₂",
      m: I2,
      vecs: [
        { v: v1, color: BLUE, label: "v₁" },
        { v: v2, color: BLUE, label: "v₂" },
      ],
    },
    {
      key: "vt",
      titel: "1 · nach Vᵀ: v₁, v₂ liegen auf den Achsen",
      m: VT,
      vecs: [
        { v: [1, 0], color: BLUE, label: "e₁" },
        { v: [0, 1], color: BLUE, label: "e₂" },
      ],
    },
    {
      key: "svt",
      titel: "2 · nach ΣVᵀ: Streckung um σ₁, σ₂",
      m: SVT,
      vecs: [
        { v: [s1, 0], color: ORANGE, label: "σ₁e₁" },
        { v: [0, s2], color: ORANGE, label: "σ₂e₂" },
      ],
    },
    {
      key: "a",
      titel: "3 · nach UΣVᵀ = A: Ellipse in ihrer Endlage",
      m: A,
      vecs: [
        { v: [s1 * u1[0], s1 * u1[1]], color: GREEN, label: "σ₁u₁" },
        { v: [s2 * u2[0], s2 * u2[1]], color: GREEN, label: "σ₂u₂" },
      ],
    },
  ];

  // Probe: rekonstruieren wir A aus U, Σ und Vᵀ, bleibt kein Rest
  const rekonstruiert: Mat2 = [
    [s1 * u1[0] * v1[0] + s2 * u2[0] * v2[0], s1 * u1[0] * v1[1] + s2 * u2[0] * v2[1]],
    [s1 * u1[1] * v1[0] + s2 * u2[1] * v2[0], s1 * u1[1] * v1[1] + s2 * u2[1] * v2[1]],
  ];
  let rest = 0;
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++) rest = Math.max(rest, Math.abs(rekonstruiert[i][j] - A[i][j]));

  const kappa = s2 > 0 ? s1 / s2 : s1 > 0 ? Infinity : NaN;

  return (
    <div>
      <p className="text-sm">
        Die drei Etappen der Merkregel stehen hier nebeneinander. Gestrichelt sehen wir in
        jeder Tafel den Einheitskreis, durchgezogen sein aktuelles Bild; die Pfeile tragen den
        Namen, den sie an der jeweiligen Station haben. Der Farbcode ist der des Kapitels:{" "}
        <span style={{ color: BLUE, fontWeight: 600 }}>blau</span> die rechten Singulärvektoren
        und was aus ihnen wird, <span style={{ color: ORANGE, fontWeight: 600 }}>orange</span>{" "}
        die Streckung um σ₁ und σ₂,{" "}
        <span style={{ color: GREEN, fontWeight: 600 }}>grün</span> die linken
        Singulärvektoren. Ändern wir die Matrix, wandern Achsenrichtungen und Streckungen
        sofort mit.
      </p>
      <div className="my-3 flex flex-wrap items-center gap-3 text-sm">
        <span>A =</span>
        <MatrixInput value={raw} onChange={setRaw} />
        <span className="font-mono text-xs" style={{ color: ORANGE }}>
          σ₁ = {fmt(s1)}, σ₂ = {fmt(s2)}
        </span>
        <span className="font-mono text-xs" style={{ color: GREY }}>
          σ₁/σ₂ = {fmt(kappa)}
        </span>
      </div>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {panels.map((p) => (
          <figure key={p.key} className="m-0">
            <LabeledTransformCanvas
              matrix={p.m}
              vectors={p.vecs}
              size={190}
              worldHalf={half}
              xLabel="x₁"
              yLabel="x₂"
            />
            <figcaption className="mt-1 text-xs" style={{ color: GREY }}>
              {p.titel}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-3 font-mono text-xs leading-relaxed">
        <div style={{ color: BLUE }}>
          v₁ = {vecStr(v1)} &nbsp; v₂ = {vecStr(v2)}
        </div>
        <div style={{ color: GREEN }}>
          u₁ = {vecStr(u1)} &nbsp; u₂ = {vecStr(u2)}
        </div>
        <div style={{ color: GREY }}>
          größter Abstand zwischen UΣVᵀ und A: {fmt(rest)}
        </div>
      </div>
      <p className="mt-2 text-sm" style={{ color: GREY }}>
        {s1 < 1e-9
          ? "Beide Singulärwerte sind null: die Nullmatrix schickt jeden Vektor in den Ursprung, vom Kreis bleibt ein Punkt."
          : s2 < 1e-9
            ? "σ₂ = 0: die Matrix drückt eine ganze Richtung auf null, aus dem Kreis wird eine Strecke. Das Verhältnis σ₁/σ₂ ist dann nicht mehr endlich, die Matrix ist singulär."
            : s1 / s2 > 5
              ? `σ₁/σ₂ = ${fmt(kappa)}: die Ellipse ist stark in die Länge gezogen, die Matrix wirkt in den beiden Richtungen sehr unterschiedlich.`
              : s1 / s2 > 1.5
                ? `σ₁/σ₂ = ${fmt(kappa)}: eine deutlich erkennbare Ellipse, Haupt- und Nebenachse unterscheiden sich klar.`
                : `σ₁/σ₂ = ${fmt(kappa)}: die Ellipse ist fast ein Kreis, die Matrix streckt alle Richtungen ähnlich stark.`}
      </p>
    </div>
  );
}
