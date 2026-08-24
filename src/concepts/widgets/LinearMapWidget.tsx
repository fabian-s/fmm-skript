/**
 * Konzept-Widget `linear-map`.
 *
 * DIE EINE EINSICHT: Die Matrix ist nichts anderes als die Liste der Bilder
 * der Standardbasis. Wer Ae₁ und Ae₂ verschiebt, schreibt die Matrix um — und
 * das ganze Gitter folgt, weil eine lineare Abbildung durch diese beiden
 * Pfeile bereits vollständig festgelegt ist.
 *
 * FARBROLLEN: rot = Ae₁ (erste Spalte), grün = Ae₂ (zweite Spalte); blau = das
 * Bild des Gitters und des Einheitskreises unter A (so setzt es die Lib).
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18) hatte nur die Zahleneingabe;
 * Spalten-Drag, Achsen und Fläche kommen aus der Lib-`TransformCanvas`
 * (`columnsDraggable`). Texte neu geschrieben. Dieses Widget ist die
 * Referenz für den Spalten-Drag in der Konzeptschicht.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV0/LinearMapWidget.mjs,
 * 2026-08-20), Voreinstellung A = [[1, −0,5], [0,5, 1]]:
 * Ae₁ = (1; 0,5), Ae₂ = (−0,5; 1), det A = 1,2500. Die Spalten sind also
 * exakt die beiden Pfeile, und det A ist der Flächenfaktor des von ihnen
 * aufgespannten Parallelogramms.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MatrixInput,
  TransformCanvas,
  Verdikt,
  fmtDe,
  type Mat2,
} from "../../lib";

export function LinearMapWidget() {
  const [m, setM] = useState<Mat2>([
    [1, -0.5],
    [0.5, 1],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const singulaer = Math.abs(det) < 0.02;

  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>Ziehen wir die Spitzen von Ae₁ und Ae₂ und lesen wir die Matrix mit.</Aufgabe>
      <TransformCanvas
        matrix={m}
        size={280}
        worldHalf={3}
        xLabel="x₁"
        yLabel="x₂"
        columnsDraggable
        onMatrixChange={setM}
        ariaLabel={`Das Bild des Einheitsgitters unter A; die Spalten Ae₁ und Ae₂ sind ziehbar, die Determinante beträgt ${fmtDe(det, 2)}.`}
      />
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
        <span>A =</span>
        <MatrixInput
          value={m}
          onChange={(next) => setM([[next[0][0], next[0][1]], [next[1][0], next[1][1]]])}
          step={0.1}
          cellLabels={[
            ["erste Spalte, erste Zeile", "zweite Spalte, erste Zeile"],
            ["erste Spalte, zweite Zeile", "zweite Spalte, zweite Zeile"],
          ]}
        />
      </div>
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Ae₁ = erste Spalte ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> Ae₂ = zweite Spalte
      </p>
      <Verdikt kind={singulaer ? "warn" : "neutral"}>
        Ae₁ = ({fmtDe(m[0][0], 2)}; {fmtDe(m[1][0], 2)}), Ae₂ = ({fmtDe(m[0][1], 2)};{" "}
        {fmtDe(m[1][1], 2)}) – genau die Spalten von A. det A = {fmtDe(det, 2)}.{" "}
        {singulaer
          ? "Beide Pfeile zeigen fast in dieselbe Richtung: das Parallelogramm ist platt, die Ebene wird auf eine Gerade gedrückt."
          : det < 0
            ? "Das Vorzeichen ist negativ, die Abbildung dreht also die Orientierung um; dem Betrag nach werden Flächen mit " +
              fmtDe(Math.abs(det), 2) +
              " skaliert."
            : "Jedes Gitterquadrat wird zu einem Parallelogramm mit dem " +
              fmtDe(det, 2) +
              "-fachen Flächeninhalt; der Ursprung bleibt liegen und Geraden bleiben Geraden."}
      </Verdikt>
    </div>
  );
}
