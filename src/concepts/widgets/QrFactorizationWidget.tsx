/**
 * Konzept-Widget für `qr-factorization` UND `gram-schmidt`
 * (Dublettenauflösung D6, 2026-08-19; das frühere GramSchmidtWidget ist
 * entfallen).
 *
 * DIE EINE EINSICHT: Orthonormalisieren heißt Schatten abziehen. Von a₂ bleibt
 * genau der Anteil übrig, der senkrecht auf a₁ steht — und wie viel das ist,
 * steht als r₂₂ in R. Werden die Spalten fast parallel, schrumpft dieser Rest
 * gegen null, und q₂ ist kaum noch bestimmt.
 *
 * VARIANTEN: `zeigeR` (Standard) blendet die Matrix R ein; die
 * Gram-Schmidt-Seite mountet das Widget mit `zeigeR={false}` und zeigt
 * stattdessen nur den abgezogenen Anteil.
 *
 * FARBROLLEN: blau = a₁, grün = a₂ (die Ausgangsspalten); orange = q₁ und q₂
 * (die fertige Orthonormalbasis); rot = der Rest u₂ = a₂ − r₁₂q₁, der nach dem
 * Abziehen des Schattens übrig bleibt.
 *
 * PROVENIENZ: Rechenkern und Aufbau aus dem Vorgängerwidget
 * QrFactorizationWidget (Stand 2026-08-18), Schatten-Darstellung aus dem
 * entfallenen GramSchmidtWidget; Ziehen und Achsen aus der Lib. Texte neu.
 *
 * VERIFIZIERTE ZAHLEN (node,
 * scripts/verify/REV1/QrFactorizationWidget.mjs,
 * 2026-08-20), a₁ = (1,5; 2), ‖a₂‖ = 2:
 *   r₁₁ = ‖a₁‖ = 2,5 und q₁ = (0,6; 0,8) exakt;
 *   Voreinstellung θ = 2,2: a₂ = (−1,177; 1,617), r₁₂ = 0,5874, r₂₂ = 1,9118;
 *   a₂ senkrecht auf a₁ (θ = 2,4981): r₁₂ = 0, r₂₂ = 2;
 *   a₂ parallel zu a₁ (θ = 0,9273): r₁₂ = 2, r₂₂ = 0;
 *   θ + 0,05 rad daneben: r₂₂ = 0,1000.
 *   Es gilt r₂₂ = 2·|sin(Winkel zwischen a₁ und a₂)|, die Warnschwelle
 *   r₂₂ < 0,15 entspricht also einem Winkel unter 4,30°.
 *   |det[a₁ a₂]| = r₁₁·r₂₂ in allen geprüften Fällen.
 *   Über 6283 Winkel: max |q₁ᵀq₂| = 5,9e−13, max |‖q₂‖ − 1| = 2,3e−16.
 */
import { useState } from "react";
import {
  Aufgabe,
  ConceptLink,
  FMM_COLORS,
  M,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
} from "../../lib";

const IDENT: [[number, number], [number, number]] = [
  [1, 0],
  [0, 1],
];
const A1: [number, number] = [1.5, 2];
const LAENGE_A2 = 2;

/** Deutsche Dezimalzahl fuer MathJax: Komma als {,}, echtes Minus als -. */
const tex = (v: number) => fmtDe(v, 2).replace("−", "-").replace(",", "{,}");

export function GramSchmidtWidget({ zeigeR = true }: { zeigeR?: boolean }) {
  const [th, setTh] = useState(2.2);
  const a2: [number, number] = [LAENGE_A2 * Math.cos(th), LAENGE_A2 * Math.sin(th)];

  const r11 = Math.hypot(A1[0], A1[1]);
  const q1: [number, number] = [A1[0] / r11, A1[1] / r11];
  const r12 = q1[0] * a2[0] + q1[1] * a2[1];
  const schatten: [number, number] = [r12 * q1[0], r12 * q1[1]];
  const u: [number, number] = [a2[0] - schatten[0], a2[1] - schatten[1]];
  const r22 = Math.hypot(u[0], u[1]);
  const q2: [number, number] = r22 > 1e-9 ? [u[0] / r22, u[1] / r22] : [-q1[1], q1[0]];
  const fastParallel = r22 < 0.15;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Ziehen wir a₂ auf a₁ zu und beobachten wir, was vom Rest übrig bleibt.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={IDENT}
        showGrid={false}
        showUnitCircle
        size={270}
        worldHalf={2.6}
        xLabel="x₁"
        yLabel="x₂"
        vectors={[
          { v: A1, color: FMM_COLORS.blau, label: "a₁" },
          { v: a2, color: FMM_COLORS.gruen, label: "a₂", draggable: true },
          { v: q1, color: FMM_COLORS.orange, label: "q₁" },
          { v: q2, color: FMM_COLORS.orange, label: "q₂" },
          { v: u, color: FMM_COLORS.rot, label: "u₂" },
        ]}
        onVectorChange={(_i, v) => {
          if (Math.hypot(v[0], v[1]) < 1e-6) return;
          setTh(Math.atan2(v[1], v[0]));
        }}
        overlay={(toPx) => {
          const [xa, ya] = toPx(a2[0], a2[1]);
          const [xs, ys] = toPx(schatten[0], schatten[1]);
          return (
            <line
              x1={xa}
              y1={ya}
              x2={xs}
              y2={ys}
              stroke={FMM_COLORS.rot}
              strokeWidth={1.2}
              strokeDasharray="4 3"
              pointerEvents="none"
            />
          );
        }}
        ariaLabel={`Die Spalten a₁ und a₂ mit der daraus orthonormalisierten Basis q₁, q₂; der Rest u₂ hat die Länge ${fmtDe(r22, 2)}.`}
      />
      <Slider
        label="Richtung von a₂"
        value={th}
        onChange={setTh}
        min={0}
        max={6.28}
        step={0.01}
        accent={FMM_COLORS.gruen}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.blau }}>▮</span> a₁ ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> a₂ ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> q₁, q₂ ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Rest u₂ = a₂ − r₁₂q₁
      </p>
      {zeigeR && (
        <p className="mt-1 text-xs">
          <M>
            {`\\bR = \\begin{bmatrix} ${tex(r11)} & ${tex(r12)} \\\\ 0 & ${tex(r22)} \\end{bmatrix}`}
          </M>
        </p>
      )}
      <Verdikt kind={fastParallel ? "warn" : "ok"}>
        Vom Schatten r₁₂ = {fmtDe(r12, 2)} befreit, bleibt ein Rest der Länge r₂₂ ={" "}
        {fmtDe(r22, 2)}; auf Länge 1 gebracht ist das q₂, und es steht senkrecht auf q₁.{" "}
        {fastParallel ? (
          <>
            Nur zeigt a₂ gerade fast in dieselbe Richtung wie a₁ (weniger als 4,3° Unterschied).
            Der Rest verschwindet fast, die Matrix verliert ihren vollen{" "}
            <ConceptLink id="rank">Rang</ConceptLink>, und die Richtung von q₂ hängt an einer
            winzigen Differenz zweier fast gleicher Vektoren.
          </>
        ) : (
          <>Es gilt r₂₂ = 2·|sin(Winkel zwischen a₁ und a₂)|: je schiefer die beiden stehen, desto mehr bleibt übrig.</>
        )}
      </Verdikt>
    </div>
  );
}
