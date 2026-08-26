/**
 * Konzept-Widget `determinant`.
 *
 * DIE EINE EINSICHT: det A ist der Flächeninhalt des Parallelogramms, zu dem
 * das Einheitsquadrat wird – mit Vorzeichen. Wer die Spalten zieht, sieht das
 * Parallelogramm mitwandern; legt man beide Spalten auf eine Gerade, fällt es
 * in sich zusammen und det wird null.
 *
 * FARBROLLEN: rot = Ae₁ (erste Spalte), grün = Ae₂ (zweite Spalte), so setzt
 * es die Lib; orange = die Fläche des Bildparallelogramms, neutral = das
 * Einheitsquadrat als Urbild.
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18) mit reiner Zahleneingabe.
 * Spalten-Drag, Achsen und Fläche kommen aus der Lib-`TransformCanvas`
 * (`columnsDraggable`, `overlay`); das Parallelogramm und die Texte sind neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-19):
 *   A = [[3, 1], [2, 2]] : det = 4     Flächenfaktor 4, Orientierung erhalten
 *   A = [[1, 2], [2, 4]] : det = 0     Kollaps auf eine Gerade
 *   A = [[0, 1], [1, 0]] : det = −1    Fläche 1, Orientierung gespiegelt
 * Die Fläche des Bildes des Einheitsquadrats ist rechnerisch |ad − bc| und
 * stimmt für die Voreinstellung mit dem Wert 4 überein.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MatrixInput,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
  maxAbsCoord,
  type Mat2,
} from "../../lib";

export function DetWidget() {
  // Voreinstellung [[3,1],[2,2]]: det = 4, also ein Parallelogramm mit
  // vierfacher Fläche – der Effekt ist sofort sichtbar, ohne Interaktion.
  const [m, setM] = useState<Mat2>([
    [3, 1],
    [2, 2],
  ]);
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  // Drei Zustände statt zwei – eine kleine Determinante ist keine Null:
  //   exakt singulär   det = 0, über die Zahleneingabe erreichbar (Spalten
  //                    (1, 2) und (2, 4): det = 1·4 − 2·2 = 0),
  //   nahe singulär    0 < |det| < 0,05: platt aussehend, aber invertierbar –
  //                    das entsteht beim Ziehen laufend,
  //   regulär          sonst.
  // Die 1e-12 sind reiner Fließkommaschutz für die Zahleneingabe, keine
  // Aussage „ungefähr null“: Gezogene Werte treffen die Null praktisch nie,
  // und der Kollaps darf nur im exakten Fall behauptet werden.
  const exaktSingulaer = Math.abs(det) < 1e-12;
  const nahSingulaer = !exaktSingulaer && Math.abs(det) < 0.05;
  const detText = fmtDe(det, nahSingulaer ? 4 : 2);

  const ae1: [number, number] = [m[0][0], m[1][0]];
  const ae2: [number, number] = [m[0][1], m[1][1]];
  const summe: [number, number] = [ae1[0] + ae2[0], ae1[1] + ae2[1]];
  const worldHalf = Math.max(3.2, 1.2 * maxAbsCoord(ae1, ae2, summe));

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Ziehen wir die Spalten, bis das orange Parallelogramm fast in sich
        zusammenfällt – und tragen wir es danach als exaktes Vielfaches ein.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={m}
        size={280}
        worldHalf={worldHalf}
        showUnitCircle={false}
        columnsDraggable
        onMatrixChange={setM}
        overlay={(toPx) => {
          const p = [
            toPx(0, 0),
            toPx(ae1[0], ae1[1]),
            toPx(summe[0], summe[1]),
            toPx(ae2[0], ae2[1]),
          ];
          const q = [toPx(0, 0), toPx(1, 0), toPx(1, 1), toPx(0, 1)];
          return (
            <g pointerEvents="none">
              <polygon
                points={q.map(([x, y]) => `${x},${y}`).join(" ")}
                fill="var(--w-axis)"
                fillOpacity={0.18}
                stroke="var(--w-axis)"
                strokeWidth={1}
              />
              <polygon
                points={p.map(([x, y]) => `${x},${y}`).join(" ")}
                fill={FMM_COLORS.orange}
                fillOpacity={0.22}
                stroke={FMM_COLORS.orange}
                strokeWidth={1.4}
              />
            </g>
          );
        }}
        ariaLabel={`Das Einheitsquadrat und sein Bildparallelogramm unter A; die Determinante beträgt ${detText}.`}
      />
      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
        <span>A =</span>
        <MatrixInput
          value={m}
          onChange={(next) =>
            setM([
              [next[0][0], next[0][1]],
              [next[1][0], next[1][1]],
            ])
          }
          step={0.5}
          cellLabels={[
            ["erste Spalte, erste Zeile", "zweite Spalte, erste Zeile"],
            ["erste Spalte, zweite Zeile", "zweite Spalte, zweite Zeile"],
          ]}
        />
      </div>
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Ae₁ ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> Ae₂ ·{" "}
        <span style={{ color: FMM_COLORS.orange }}>▮</span> Bild des
        Einheitsquadrats
      </p>
      <Verdikt kind={exaktSingulaer ? "fail" : nahSingulaer ? "warn" : "neutral"}>
        det A = {detText}, das Parallelogramm hat also den Flächeninhalt{" "}
        {fmtDe(Math.abs(det), nahSingulaer ? 4 : 2)}.{" "}
        {exaktSingulaer
          ? "Beide Spalten liegen auf einer Ursprungsgeraden, das Parallelogramm ist platt: A drückt die ganze Ebene auf eine Gerade und besitzt keine Inverse."
          : nahSingulaer
            ? "Das Parallelogramm sieht platt aus, ist es aber nicht: Wegen det A ≠ 0 bleibt A invertierbar, nur schlecht konditioniert. Platt wird es erst, wenn eine Spalte ein exaktes Vielfaches der anderen ist."
            : det < 0
              ? `Das Vorzeichen ist negativ: die Abbildung klappt die Ebene um, aus dem Umlauf Ae₁ → Ae₂ gegen den Uhrzeigersinn wird ein Umlauf im Uhrzeigersinn. Flächen werden dabei mit ${fmtDe(Math.abs(det), 2)} skaliert.`
              : `Jede Fläche wird mit dem Faktor ${fmtDe(det, 2)} skaliert, und der Umlaufsinn bleibt erhalten. Weil det A ≠ 0 ist, ist A invertierbar.`}
      </Verdikt>
    </div>
  );
}
