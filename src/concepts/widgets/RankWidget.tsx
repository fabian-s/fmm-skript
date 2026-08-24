/**
 * Konzept-Widget `rank`.
 *
 * DIE EINE EINSICHT: Der Rang ist keine Zahl, die aus der Determinante fällt,
 * sondern die Dimension dessen, was die Spalten erreichen. Man sieht ihn:
 * zwei Richtungen füllen die Ebene, eine erzeugt nur eine Gerade, keine nur
 * den Ursprung.
 *
 * FARBROLLEN: rot = die erste Spalte, grün = die zweite (so setzt es die Lib
 * beim Spalten-Drag); orange = der von den Spalten erreichte Raum.
 *
 * PROVENIENZ: Rechenkern aus dem Vorgängerwidget (Stand 2026-08-18), das gar
 * kein Bild hatte; das Spaltenbild samt Ziehen kommt aus der
 * Lib-`TransformCanvas` (`columnsDraggable`). Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node,
 * scripts/verify/REV1/RankWidget.mjs,
 * 2026-08-20): [[1, 2], [2, 4]] hat det 0 und Rang 1 (die zweite Spalte ist
 * das Doppelte der ersten); [[1, 2], [2, 5]] hat det 1 und Rang 2; die
 * Nullmatrix hat Rang 0. Das sind genau die drei Fälle der Konzeptseite.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MatrixInput,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
  type Mat2,
} from "../../lib";

export function RankWidget() {
  const [m, setM] = useState<Mat2>([
    [1, 2],
    [2, 4],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const s1: [number, number] = [m[0][0], m[1][0]];
  const s2: [number, number] = [m[0][1], m[1][1]];
  const n1 = Math.hypot(s1[0], s1[1]);
  const n2 = Math.hypot(s2[0], s2[1]);
  const allesNull = n1 < 1e-9 && n2 < 1e-9;
  const rang = allesNull ? 0 : Math.abs(det) < 1e-9 ? 1 : 2;
  const richtung: [number, number] = n1 > 1e-9 ? s1 : s2;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>Ziehen wir die zweite Spalte auf die erste und beobachten wir das Bild.</Aufgabe>
      <LabeledTransformCanvas
        matrix={m}
        size={260}
        worldHalf={5}
        showUnitCircle={false}
        xLabel="x₁"
        yLabel="x₂"
        columnsDraggable
        onMatrixChange={setM}
        lines={rang === 1 ? [{ dir: richtung, color: FMM_COLORS.orange }] : []}
        ariaLabel={`Die beiden Spalten der Matrix; ihr Bild hat die Dimension ${rang}.`}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> erste Spalte ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> zweite Spalte
        {rang === 1 && (
          <>
            {" "}
            · <span style={{ color: FMM_COLORS.orange }}>▮</span> erreichbare Gerade
          </>
        )}
      </p>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <MatrixInput value={m} onChange={(next) => setM([[next[0][0], next[0][1]], [next[1][0], next[1][1]]])} step={0.5} />
        <div className="font-mono text-xs">
          <div>det = {fmtDe(det, 2)}</div>
          <div>Rang = {rang}</div>
        </div>
      </div>
      <Verdikt kind={rang === 2 ? "ok" : rang === 1 ? "warn" : "fail"}>
        {rang === 2 ? (
          <>
            Die beiden Spalten zeigen in verschiedene Richtungen, und ihre Vielfachen decken damit
            die ganze Ebene ab: Rang 2, volle Dimension, det = {fmtDe(det, 2)} ≠ 0. Das
            transformierte Gitter bleibt ein Gitter.
          </>
        ) : rang === 1 ? (
          <>
            Beide Spalten liegen auf derselben Geraden, deshalb ist det = 0 und erreichbar bleibt
            nur diese eine Gerade: Rang 1. Das Gitter ist auf sie zusammengefallen, und mit ihm
            eine ganze Dimension.
          </>
        ) : (
          <>
            Ohne von null verschiedene Spalte gibt es keine einzige Richtung; das Bild ist nur der
            Ursprung, der Rang also 0. Nur die Nullmatrix schafft das.
          </>
        )}
      </Verdikt>
    </div>
  );
}
