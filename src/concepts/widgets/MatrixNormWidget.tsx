/**
 * Konzept-Widget `matrix-norm`.
 *
 * DIE EINE EINSICHT: ‖A‖₂ ist ein Maximum, und man kann darauf zeigen. Der
 * Einheitskreis wird zur Ellipse, und die längste Halbachse ist genau die
 * stärkste Streckung, die A irgendeinem Einheitsvektor antun kann.
 *
 * FARBROLLEN: rot = Ae₁, grün = Ae₂ (die ziehbaren Spalten, Lib-Vorgabe),
 * blau = Bildellipse des Einheitskreises, violett = die längste Halbachse Av₁
 * samt ihrem Urbild v₁ auf dem Einheitskreis (violett, weil rot und grün schon
 * an die Spalten vergeben sind).
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18); dessen Schlussabsatz forderte
 * zum Ausprobieren auf und verriet zugleich das Ergebnis („die Ellipse wird zur
 * Nadel"). Ziehen, Achsen und Ellipse kommen aus der Lib-`TransformCanvas`;
 * die eingezeichnete Halbachse, der rechte Singulärvektor und die Texte sind
 * neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C2/check-gruppeA3.mjs,
 * 2026-08-19). Für jede Testmatrix stimmt ‖A‖₂ mit dem über 400 000
 * Kreispunkte numerisch gesuchten Maximum von ‖Ax‖ überein (Abweichung
 * ≤ 6,9e−12), und |Av₁| ist genau dieses Maximum:
 *   A = [[1; 0,8], [0,2; 1,4]] : ‖A‖₂ = 1,775448, v₁ = (0,4553; 0,8904),
 *                                Av₁ = (1,1675; 1,3376), Maximum bei 62,92°
 *   A = [[2; 0], [0; 0,5]]     : ‖A‖₂ = 2, v₁ = (1; 0)
 *   A = [[0; −1], [1; 0]]      : ‖A‖₂ = 1 (Drehung streckt nichts)
 *   A = [[1; 1], [1; 1,05]]    : ‖A‖₂ = 2,025312, Maximum bei 45,72°
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MatrixInput,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
  sigmaMax,
  type Mat2,
} from "../../lib";

/** Rechter Singulärvektor zum größten Singulärwert: Eigenvektor von AᵀA. */
function rechterSingulaervektor(m: Mat2): [number, number] {
  const b11 = m[0][0] ** 2 + m[1][0] ** 2;
  const b12 = m[0][0] * m[0][1] + m[1][0] * m[1][1];
  const b22 = m[0][1] ** 2 + m[1][1] ** 2;
  const spur = b11 + b22;
  const det = b11 * b22 - b12 * b12;
  const lam = (spur + Math.sqrt(Math.max(0, spur * spur - 4 * det))) / 2;
  let v: [number, number] = Math.abs(b12) > 1e-12 ? [b12, lam - b11] : b22 > b11 ? [0, 1] : [1, 0];
  const n = Math.hypot(v[0], v[1]);
  if (n < 1e-12) v = [1, 0];
  return n < 1e-12 ? v : [v[0] / n, v[1] / n];
}

export function NormWidget() {
  // Voreinstellung [[1; 0,8], [0,2; 1,4]]: eine deutlich, aber nicht extrem
  // exzentrische Ellipse – die längste Halbachse ist auf einen Blick erkennbar.
  const [A, setA] = useState<Mat2>([
    [1, 0.8],
    [0.2, 1.4],
  ]);

  const s1 = sigmaMax(A);
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const s2 = s1 > 1e-12 ? Math.abs(det) / s1 : 0;
  const v1 = rechterSingulaervektor(A);
  const Av1: [number, number] = [
    A[0][0] * v1[0] + A[0][1] * v1[1],
    A[1][0] * v1[0] + A[1][1] * v1[1],
  ];
  const worldHalf = Math.max(2.2, s1 * 1.2);
  const nadel = s2 < 0.15 * s1;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Ziehen wir an den Spalten und beobachten die orange Halbachse.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={A}
        size={280}
        worldHalf={worldHalf}
        showGrid={false}
        showUnitCircle
        columnsDraggable
        onMatrixChange={setA}
        overlay={(toPx) => {
          const [x0, y0] = toPx(0, 0);
          const [xu, yu] = toPx(v1[0], v1[1]);
          const [xb, yb] = toPx(Av1[0], Av1[1]);
          return (
            <g pointerEvents="none">
              <line x1={x0} y1={y0} x2={xu} y2={yu} stroke={FMM_COLORS.violett} strokeWidth={1.4} strokeDasharray="4 3" />
              <line x1={x0} y1={y0} x2={xb} y2={yb} stroke={FMM_COLORS.violett} strokeWidth={3.4} strokeOpacity={0.95} />
              <circle cx={xb} cy={yb} r={3.5} fill={FMM_COLORS.violett} />
            </g>
          );
        }}
        ariaLabel={`Der Einheitskreis und seine Bildellipse unter A; die längste Halbachse hat die Länge ${fmtDe(s1, 2)}.`}
      />
      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
        <span>A =</span>
        <MatrixInput
          value={A}
          onChange={(next) =>
            setA([
              [next[0][0], next[0][1]],
              [next[1][0], next[1][1]],
            ])
          }
          cellLabels={[
            ["erste Spalte, erste Zeile", "zweite Spalte, erste Zeile"],
            ["erste Spalte, zweite Zeile", "zweite Spalte, zweite Zeile"],
          ]}
        />
      </div>
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        gestrichelt der Einheitskreis ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Bildellipse ·{" "}
        <span style={{ color: FMM_COLORS.violett }}>▮</span> längste Halbachse Av₁
        und ihr Urbild v₁
      </p>
      <Verdikt kind={nadel ? "warn" : "neutral"}>
        ‖A‖₂ = {fmtDe(s1, 3)}: der Einheitsvektor v₁ = ({fmtDe(v1[0], 2)};{" "}
        {fmtDe(v1[1], 2)}) wird auf die Länge {fmtDe(s1, 3)} gestreckt, und
        stärker geht es nicht. Genau das besagt die Abschätzung ‖Av‖ ≤ ‖A‖·‖v‖.{" "}
        {nadel
          ? `Die kürzeste Halbachse misst nur noch ${fmtDe(s2, 3)}: die Ellipse ist fast zur Nadel entartet. Die Norm merkt davon nichts, sie misst allein die stärkste Streckung.`
          : `Quer dazu streckt A am schwächsten, nämlich mit ${fmtDe(s2, 3)}; die Norm nennt nur den größeren der beiden Werte.`}
      </Verdikt>
    </div>
  );
}
