import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  MatrixInput,
  Slider,
  Verdikt,
  W_MUTED,
  fmtDe,
} from "../../../lib";

/**
 * §3.4: Schattennormen und ihre unitäre Invarianz.
 *
 * DIE EINE EINSICHT: Eine Drehung ändert jeden einzelnen Matrixeintrag, aber
 * keinen einzigen Singulärwert – und damit keine Schattennorm (Satz 3.4.7).
 * Das Widget macht die Invarianz messbar: Es zeigt die größte Abweichung der
 * Normen über den ganzen bisher durchfahrenen Drehbereich.
 *
 * FARBROLLEN (Kapitel-3-Tabelle): rot = σ₁, der größte Streckfaktor, blau =
 * σ₂ und die Bildellipse, grün = die elementweise gerechnete Kontrollzahl
 * (dieselbe Rolle wie die grüne Diagonale in §3.1), grau = Urbild-Einheitskreis
 * und Achsen. Rot und Blau für σ₁ und σ₂ übernehmen die Farben aus
 * Beispiel 3.4.6 im Fließtext.
 *
 * INTERAKTION: Der Drehregler θ ist hier der richtige Hauptweg, denn die
 * Drehung ist eine kontinuierliche Einparameterfamilie; die Matrixeingabe
 * bleibt der Präzisionsweg für A.
 *
 * PROVENIENZ: Eigenbau (2026-08-05); neu sind Aufgabenzeile, Invarianzmessung
 * und Verdikt.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-03-matrix-spur-norm/
 * check-kap03.mjs, 2026-08-19): Für A = (2 1; 0 1) ist σ₁ = 2,288246,
 * σ₂ = 0,874032, ‖A‖_F = 2,449490 = √6 und ‖A‖_{S,1} = 3,162278 = √10
 * (Beispiel 3.4.6). Über θ ∈ [0°, 360°] in 1°-Schritten beträgt die größte
 * Abweichung von σ₁, σ₂ und ‖·‖_F 8,88e−16, also reines Rundungsrauschen;
 * Summennorm (4,0) und Maximumsnorm (2,0) bleiben bei θ = 0, 90, 180, 270 nur
 * zufällig gleich und wandern dazwischen: bei θ = 45° steht die Summennorm bei
 * 4,2426 und die Maximumsnorm bei 1,4142. Die Nuklearnorm bleibt überall bei
 * σ₁ + σ₂ = 3,162278 = √10.
 */

const ROT = FMM_COLORS.rot; // sigma_1
const BLAU = FMM_COLORS.blau; // sigma_2 und Bildellipse
const GRUEN = FMM_COLORS.gruen; // elementweise Kontrolle
const GRAU = FMM_COLORS.grau;

type Mat2 = number[][];

function matMul(P: Mat2, A: Mat2): Mat2 {
  return [
    [P[0][0] * A[0][0] + P[0][1] * A[1][0], P[0][0] * A[0][1] + P[0][1] * A[1][1]],
    [P[1][0] * A[0][0] + P[1][1] * A[1][0], P[1][0] * A[0][1] + P[1][1] * A[1][1]],
  ];
}

function drehung(grad: number): Mat2 {
  const t = (grad * Math.PI) / 180;
  return [
    [Math.cos(t), -Math.sin(t)],
    [Math.sin(t), Math.cos(t)],
  ];
}

/** Singulärwerte und -richtungen einer 2x2-Matrix über die Eigenwerte von BᵀB. */
function singulaerwerte(B: Mat2) {
  const a = B[0][0] * B[0][0] + B[1][0] * B[1][0];
  const b = B[0][0] * B[0][1] + B[1][0] * B[1][1];
  const c = B[0][1] * B[0][1] + B[1][1] * B[1][1];
  const halb = (a + c) / 2;
  const disc = Math.sqrt(Math.max(0, halb * halb - (a * c - b * b)));
  const l1 = Math.max(0, halb + disc);
  const l2 = Math.max(0, halb - disc);
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

/** Deutsche Dezimalzahl für MathJax-Strings: 0,874 -> "0{,}874". */
const deMath = (v: number, d = 3) => fmtDe(v, d).replace(",", "{,}");

/** Zehnerpotenz-Schreibweise mit echten Hochzahlen: 8,9 · 10⁻¹⁶. */
function wissenschaftlich(x: number): string {
  if (!(Math.abs(x) > 0)) return "0";
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / 10 ** e;
  const hoch = String(e)
    .replace("-", "\u207b")
    .replace(/[0-9]/g, (d) => "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079"[Number(d)]);
  return `${fmtDe(m, 1)} \u00b7 10${hoch}`;
}

const summennorm = (B: Mat2) => B.flat().reduce((a, x) => a + Math.abs(x), 0);
const maxnorm = (B: Mat2) => Math.max(...B.flat().map(Math.abs));

export function S34SchattenWidget() {
  const [A, setA] = useState<Mat2>([
    [2, 1],
    [0, 1],
  ]);
  const [theta, setTheta] = useState(0);
  // Bisher durchfahrener Drehbereich; er trägt die Invarianz-Messung.
  const [bereich, setBereich] = useState<[number, number]>([0, 0]);

  const B = matMul(drehung(theta), A);
  const { s1, s2, u1, u2 } = singulaerwerte(B);
  const nuklear = s1 + s2;
  const frob = Math.hypot(s1, s2);
  const frobElement = Math.sqrt(B[0][0] ** 2 + B[0][1] ** 2 + B[1][0] ** 2 + B[1][1] ** 2);

  // Größte Abweichung der drei Schattennormen über den besuchten Bereich …
  const basis = singulaerwerte(A);
  let abwSchatten = 0;
  let abwElement = 0;
  const [von, bis] = bereich;
  for (let k = 0; k <= 60; k++) {
    const g = von + ((bis - von) * k) / 60;
    const C = matMul(drehung(g), A);
    const s = singulaerwerte(C);
    abwSchatten = Math.max(
      abwSchatten,
      Math.abs(s.s1 - basis.s1),
      Math.abs(s.s2 - basis.s2),
      Math.abs(s.s1 + s.s2 - (basis.s1 + basis.s2)),
    );
    // … und, zum Vergleich, der beiden elementweisen Normen
    abwElement = Math.max(
      abwElement,
      Math.abs(summennorm(C) - summennorm(A)),
      Math.abs(maxnorm(C) - maxnorm(A)),
    );
  }

  const setzeTheta = (v: number) => {
    setTheta(v);
    setBereich(([lo, hi]) => [Math.min(lo, v), Math.max(hi, v)]);
  };
  const setzeA = (m: Mat2) => {
    setA(m);
    setBereich([theta, theta]);
  };

  const size = 300;
  const mitte = size / 2;
  const halbWelt = Math.max(1.6, s1 * 1.2);
  const sc = (size / 2 - 14) / halbWelt;
  const px = (x: number, y: number): [number, number] => [mitte + x * sc, mitte - y * sc];

  const n = 120;
  const ellipse = Array.from({ length: n + 1 }, (_, i) => {
    const w = (2 * Math.PI * i) / n;
    const [ex, ey] = px(
      B[0][0] * Math.cos(w) + B[0][1] * Math.sin(w),
      B[1][0] * Math.cos(w) + B[1][1] * Math.sin(w),
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

  const zeile = (name: React.ReactNode, wert: string, farbe?: string): React.ReactNode => (
    <div className="flex items-baseline justify-between gap-3">
      <span>{name}</span>
      <span className="font-mono text-sm tabular-nums" style={farbe ? { color: farbe } : undefined}>
        {wert}
      </span>
    </div>
  );

  const spanne = bis - von;

  return (
    <div className="space-y-3">
      <Aufgabe>
        Drehen wir <M>{"\\theta"}</M> einmal ganz durch und vergleichen wir, welche der Zahlen
        rechts sich mitbewegen.
      </Aufgabe>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        <span style={{ color: GRAU }}>grau</span> der Einheitskreis,{" "}
        <span style={{ color: BLAU }}>blau</span> sein Bild unter <M>{"\\bQ_\\theta\\bA"}</M> mit der
        Halbachse <M>{"\\sigma_2"}</M>, <span style={{ color: ROT }}>rot</span> die lange Halbachse{" "}
        <M>{"\\sigma_1"}</M>, <span style={{ color: GRUEN }}>grün</span> die elementweise gerechnete
        Kontrollzahl.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="max-w-full h-auto rounded"
            style={{ background: "var(--w-bg)", border: "1px solid var(--w-border)" }}
            role="img"
            aria-label={`Einheitskreis und seine Bildellipse unter Q A; die Halbachsen sind ${fmtDe(s1, 2)} und ${fmtDe(s2, 2)}.`}
          >
            <line x1={0} y1={mitte} x2={size} y2={mitte} stroke="var(--w-grid)" />
            <line x1={mitte} y1={0} x2={mitte} y2={size} stroke="var(--w-grid)" />
            <circle cx={mitte} cy={mitte} r={sc} fill="none" stroke={GRAU} strokeDasharray="5 4" />
            <path d={ellipse} fill={BLAU} fillOpacity={0.1} stroke={BLAU} strokeWidth={1.5} />
            {pfeil(u1, ROT)}
            {pfeil(u2, BLAU)}
            <text x={8} y={18} fontSize={12} fill={ROT}>
              σ₁ ≈ {fmtDe(s1, 2)}
            </text>
            <text x={8} y={34} fontSize={12} fill={BLAU}>
              σ₂ ≈ {fmtDe(s2, 2)}
            </text>
          </svg>
        </div>
        <div className="min-w-0 space-y-3 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <M>{"\\bA ="}</M>
            <MatrixInput value={A} onChange={setzeA} />
          </div>
          <Slider
            label="Drehung θ"
            value={theta}
            onChange={setzeTheta}
            min={0}
            max={360}
            step={1}
            unit="°"
            accent={ROT}
            fmt={(v) => `${Math.round(v)}`}
          />
          <div>
            <div className={`mb-1 text-xs ${W_MUTED}`}>
              Einträge von <M>{"\\bQ_\\theta\\bA"}</M> (ändern sich mit θ):
            </div>
            <div
              className="inline-grid grid-cols-2 gap-x-3 gap-y-0.5 rounded border-x-2 px-2 py-1 font-mono text-xs tabular-nums"
              style={{ borderColor: "var(--w-border)" }}
            >
              {B.flat().map((v, i) => (
                <span key={i} className="text-right">
                  {fmtDe(v, 2)}
                </span>
              ))}
            </div>
          </div>
          <div
            className="space-y-1 rounded p-2"
            style={{ border: "1px solid var(--w-border)" }}
          >
            {zeile(<M>{"\\cred{\\sigma_1}"}</M>, fmtDe(s1, 3), ROT)}
            {zeile(<M>{"\\cblue{\\sigma_2}"}</M>, fmtDe(s2, 3), BLAU)}
            <hr style={{ borderColor: "var(--w-border)" }} />
            {zeile(
              <>
                <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,1}"}</M> (Nuklearnorm)
              </>,
              fmtDe(nuklear, 3),
            )}
            {zeile(
              <>
                <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,2}"}</M> (Frobenius)
              </>,
              fmtDe(frob, 3),
            )}
            {zeile(
              <>
                <M>{"\\cgreen{\\sqrt{\\textstyle\\sum_{i,j} (\\bQ_\\theta\\bA)_{ij}^2}}"}</M>{" "}
                (elementweise)
              </>,
              fmtDe(frobElement, 3),
              GRUEN,
            )}
            {zeile(
              <>
                <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_{S,\\infty}"}</M> (Spektralnorm)
              </>,
              fmtDe(s1, 3),
            )}
            <hr style={{ borderColor: "var(--w-border)" }} />
            {zeile(
              <>
                <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_S"}</M> (Summennorm)
              </>,
              fmtDe(summennorm(B), 3),
            )}
            {zeile(
              <>
                <M>{"\\left\\| \\bQ_\\theta\\bA \\right\\|_M"}</M> (Maximumsnorm)
              </>,
              fmtDe(maxnorm(B), 3),
            )}
          </div>
        </div>
      </div>
      <Verdikt kind={spanne < 1 ? "neutral" : "ok"}>
        {spanne < 1 ? (
          <>
            Noch steht die Drehung still. Die Halbachsen der Ellipse sind{" "}
            <M>{`\\sigma_1 = ${deMath(s1)}`}</M> und <M>{`\\sigma_2 = ${deMath(s2)}`}</M>; alle
            Schattennormen rechts sind aus diesen beiden Zahlen gebaut (Definition 3.4.1).
          </>
        ) : (
          <>
            Über die durchfahrenen {fmtDe(spanne, 0)}° hinweg beträgt die größte Abweichung der
            Schattennormen {wissenschaftlich(abwSchatten)} –
            das ist Rundungsrauschen, keine Änderung: Satz 3.4.7 in Zahlen. Summen- und
            Maximumsnorm dagegen bewegen sich um bis zu {fmtDe(abwElement, 3)}. Und die grüne
            elementweise Summe trifft weiterhin die Frobenius-Norm auf{" "}
            {wissenschaftlich(Math.abs(frobElement - frob))}{" "}
            genau, wie Korollar 3.4.4 es verlangt.
          </>
        )}
      </Verdikt>
    </div>
  );
}
