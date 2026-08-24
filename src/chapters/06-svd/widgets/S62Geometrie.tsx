import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MatrixInput,
  TransformCanvas,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  fmtDe,
  maxAbsCoord,
  sigmaMax,
} from "../../../lib";

/**
 * DIE EINE EINSICHT: Jede lineare Abbildung der Ebene ist Drehen, Strecken,
 * Drehen, und vier Tafeln nebeneinander zeigen denselben Kreis vor Vᵀ, nach Vᵀ,
 * nach ΣVᵀ und nach UΣVᵀ = A (Muster 4: Vergleich statt Umschalter).
 *
 * FARBROLLEN (Kapitel 6): blau = rechte Singulärvektoren v und was aus ihnen
 * wird, orange = Streckung um σ₁ und σ₂, grün = linke Singulärvektoren u,
 * grau = Nebenangaben. Rot bleibt Rest- und Fehlertermen vorbehalten.
 *
 * PROVENIENZ: Rechenkern und Tafelkette sind aus der privaten mml-ch4-App
 * portiert (widgets/svdMath.ts: svd2x2; widgets/SvdStages2x2.tsx); alle
 * sichtbaren Texte, die Presets und die Farbgebung sind neu.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen,
 * 2026-08-19): Voreinstellung A = (2 1; 0 1) hat σ₁ = 2,2882 = √(3+√5),
 * σ₂ = 0,8740 = √(3−√5), σ₁/σ₂ = 2,618, v₁ = (0,851; 0,526);
 * Presets: Drehung (0 −1; 1 0) σ₁ = σ₂ = 1; gleiche Spalten (1 1; 1 1)
 * σ₁ = 2, σ₂ = 0; Scherung (1 1,5; 0 1) σ₁ = 2, σ₂ = 0,5.
 */

const BLUE = FMM_COLORS.blau;
const GREEN = FMM_COLORS.gruen;
const ORANGE = FMM_COLORS.orange;
const GREY = FMM_COLORS.grau;

const PRESETS: { id: string; name: string; A: number[][] }[] = [
  { id: "beispiel", name: "Beispiel aus Kapitel 3", A: [[2, 1], [0, 1]] },
  { id: "drehung", name: "Drehmatrix", A: [[0, -1], [1, 0]] },
  { id: "scherung", name: "Scherung", A: [[1, 1.5], [0, 1]] },
  { id: "gleich", name: "zwei gleiche Spalten", A: [[1, 1], [1, 1]] },
];

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

/** 3 Dezimalen, deutsches Komma (fmtDe aus der lib). */
const fmt = (v: number) => fmtDe(v, 3);

const vecStr = (v: [number, number]) => `(${fmt(v[0])}, ${fmt(v[1])})`;

export function SvdGeometrieExplorer() {
  // voreingestellt die 2×2-Matrix aus Kapitel 3 (σ₁ ≈ 2,288, σ₂ ≈ 0,874)
  const [raw, setRaw] = useState<number[][]>(PRESETS[0].A);
  const [preset, setPreset] = useState("beispiel");
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
      titel: "Station 0 · Einheitskreis, dazu v₁ und v₂",
      m: I2,
      vecs: [
        { v: v1, color: BLUE, label: "v₁" },
        { v: v2, color: BLUE, label: "v₂" },
      ],
    },
    {
      key: "vt",
      titel: "Station 1 · Bild unter Vᵀ: v₁, v₂ liegen jetzt auf den Achsen",
      m: VT,
      vecs: [
        { v: [1, 0], color: BLUE, label: "e₁" },
        { v: [0, 1], color: BLUE, label: "e₂" },
      ],
    },
    {
      key: "svt",
      titel: "Station 2 · Bild unter ΣVᵀ: gestreckt um σ₁ und σ₂",
      m: SVT,
      vecs: [
        { v: [s1, 0], color: ORANGE, label: "σ₁e₁" },
        { v: [0, s2], color: ORANGE, label: "σ₂e₂" },
      ],
    },
    {
      key: "a",
      titel: "Station 3 · Bild unter UΣVᵀ = A: die Ellipse in ihrer Endlage",
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
      <Aufgabe>
        Wählen wir eine Matrix und verfolgen wir denselben Kreis über die vier Tafeln;{" "}
        <span style={{ color: BLUE, fontWeight: 600 }}>blau</span> die rechten,{" "}
        <span style={{ color: GREEN, fontWeight: 600 }}>grün</span> die linken
        Singulärvektoren, <span style={{ color: ORANGE, fontWeight: 600 }}>orange</span> die
        Streckung.
      </Aufgabe>
      <div className="my-3 flex flex-wrap items-center gap-3 text-sm">
        <span>A =</span>
        <MatrixInput
          value={raw}
          onChange={(m) => {
            setPreset("frei");
            setRaw(m);
          }}
        />
        <span className="font-mono text-xs" style={{ color: ORANGE }}>
          σ₁ = {fmt(s1)}, σ₂ = {fmt(s2)}
        </span>
        <span className="font-mono text-xs" style={{ color: GREY }}>
          σ₁/σ₂ = {fmt(kappa)}
        </span>
      </div>
      <div className="my-2 flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={preset === p.id ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={preset === p.id}
            onClick={() => {
              setPreset(p.id);
              setRaw(p.A);
            }}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {panels.map((p) => (
          <figure key={p.key} className="m-0">
            <TransformCanvas
              matrix={p.m}
              vectors={p.vecs}
              size={190}
              worldHalf={half}
              transitionMs={250}
              xLabel="x₁"
              yLabel="x₂"
              ariaLabel={`${p.titel}; σ₁ = ${fmt(s1)}, σ₂ = ${fmt(s2)}.`}
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
      {s1 < 1e-9 ? (
        <Verdikt kind="warn" titel="Nullmatrix:">
          Beide Singulärwerte sind null. Die Abbildung schickt jeden Vektor in den Ursprung,
          vom Kreis bleibt ein Punkt, und Station 2 löscht alles aus.
        </Verdikt>
      ) : s2 < 1e-9 ? (
        <Verdikt kind="warn" titel="Singulär:">
          σ₂ = 0: Station 2 drückt eine ganze Richtung auf null, aus dem Kreis wird eine
          Strecke. Das Verhältnis σ₁/σ₂ ist nicht mehr endlich, der Rang ist 1 (Satz 6.2.11),
          und die letzte Drehung legt die Strecke nur noch in ihre Endlage.
        </Verdikt>
      ) : s1 / s2 > 5 ? (
        <Verdikt kind="warn" titel="Stark verzerrt:">
          σ₁/σ₂ = {fmt(kappa)}: Die Ellipse ist weit in die Länge gezogen, die Abbildung wirkt
          in den beiden Richtungen sehr unterschiedlich. Genau dieses Verhältnis ist die
          Konditionszahl κ₂(A) aus Abschnitt 3.5.
        </Verdikt>
      ) : s1 / s2 > 1.5 ? (
        <Verdikt kind="neutral">
          σ₁/σ₂ = {fmt(kappa)}: eine deutlich erkennbare Ellipse. Station 1 dreht v₁ und v₂ auf
          die Achsen, Station 2 streckt um {fmt(s1)} und {fmt(s2)}, Station 3 dreht in die
          Endlage; zusammen ist das Bemerkung 6.2.15.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" titel="Fast winkeltreu:">
          σ₁/σ₂ = {fmt(kappa)}: Die Ellipse ist beinahe ein Kreis, alle Richtungen werden
          ähnlich stark gestreckt. Bei σ₁ = σ₂ hat Station 2 nichts zu tun, und A ist ein
          Vielfaches einer Orthogonalmatrix.
        </Verdikt>
      )}
    </div>
  );
}
