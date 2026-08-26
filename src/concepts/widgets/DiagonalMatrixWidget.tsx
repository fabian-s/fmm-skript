/**
 * Konzept-Widget `diagonal-matrix`.
 *
 * DIE EINE EINSICHT: Eine Diagonalmatrix behandelt jede Koordinatenachse für
 * sich. Deshalb bleibt das Gitter achsenparallel, egal wie wir an den beiden
 * Faktoren ziehen, und jede der beiden Zahlen erzählt für sich, was mit ihrer
 * Achse geschieht: strecken, stauchen, spiegeln oder plattdrücken.
 *
 * FARBROLLEN: rot = De₁ (das Bild der ersten Achse, erste Spalte), grün = De₂
 * (zweite Spalte), blau = das transformierte Gitter (Lib-Vorgabe).
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18) mit zwei Reglern und einer
 * statischen Schlusszeile. Neu: ziehbare Achsenbilder (Lib-`TransformCanvas`,
 * Drag frei, in `onVectorChange` auf die Achse projiziert), Verdikt für die
 * Sonderfälle d = 0 und d < 0. 2026-08-26: Das Verdikt trennt jetzt drei
 * Zustände – exakt entartet (ein oder beide Faktoren gleich 0), nahe entartet
 * (|d| < 0,06, aber ≠ 0: invertierbar, schlecht konditioniert) und regulär.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L0/verify-qa-l0.mjs,
 * 2026-08-19):
 *   D = diag(2; 0,5)  : De₁ = (2; 0), De₂ = (0; 0,5), det = 1,00 – die
 *                       Streckung der einen Achse hebt die Stauchung der
 *                       anderen exakt auf, die Fläche bleibt erhalten.
 *   D = diag(2; −0,8) : det = −1,60, Orientierung gespiegelt.
 *   D = diag(1,5; 0)  : det = 0, Kollaps auf die erste Achse.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  clamp,
  fmtDe,
  type Mat2,
} from "../../lib";

export function DiagWidget() {
  // Voreinstellung diag(2; 0,5): eine Achse gestreckt, die andere gestaucht –
  // das Bild zeigt sofort, dass beide Achsen unabhängig behandelt werden.
  const [d1, setD1] = useState(2);
  const [d2, setD2] = useState(0.5);

  const D: Mat2 = [
    [d1, 0],
    [0, d2],
  ];
  const flaeche = d1 * d2;
  // Drei Zustände statt zwei: exakt entartet (ein Faktor ist wirklich 0, über den
  // Regler exakt erreichbar), nahe entartet (klein, aber ungleich 0 — D ist noch
  // invertierbar, nur schlecht konditioniert) und regulär. Ein ε-kleiner Faktor
  // wird also nicht als "= 0" ausgegeben.
  const klein = Math.min(Math.abs(d1), Math.abs(d2));
  const gross = Math.max(Math.abs(d1), Math.abs(d2));
  const beideNull = d1 === 0 && d2 === 0;
  const exaktNull = d1 === 0 || d2 === 0;
  const naheNull = !exaktNull && klein < 0.06;
  // Für D = diag(d₁; d₂) ist κ₂(D) = max|dᵢ| / min|dᵢ|; Beispiel diag(2; 0,05):
  // κ₂ = 2/0,05 = 40.
  const kappa = gross / klein;
  const gespiegelt = flaeche < 0;

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Ziehen wir die beiden Achsenbilder und achten darauf, was mit den
        Gitterlinien passiert.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={D}
        size={280}
        worldHalf={3.4}
        showUnitCircle={false}
        vectors={[
          { v: [d1, 0], color: FMM_COLORS.rot, label: "De₁", draggable: true },
          { v: [0, d2], color: FMM_COLORS.gruen, label: "De₂", draggable: true },
        ]}
        onVectorChange={(i, v) =>
          i === 0 ? setD1(clamp(v[0], -3, 3)) : setD2(clamp(v[1], -3, 3))
        }
        ariaLabel={`Das Bild des Gitters unter der Diagonalmatrix mit den Faktoren ${fmtDe(d1, 1)} und ${fmtDe(d2, 1)}; die Gitterlinien bleiben achsenparallel.`}
      />
      <Slider
        label="d₁"
        value={d1}
        onChange={setD1}
        min={-3}
        max={3}
        step={0.1}
        accent={FMM_COLORS.rot}
      />
      <Slider
        label="d₂"
        value={d2}
        onChange={setD2}
        min={-3}
        max={3}
        step={0.1}
        accent={FMM_COLORS.gruen}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        D = diag({fmtDe(d1, 1)}; {fmtDe(d2, 1)}) ·{" "}
        <span style={{ color: FMM_COLORS.rot }}>▮</span> De₁ ·{" "}
        <span style={{ color: FMM_COLORS.gruen }}>▮</span> De₂
      </p>
      <Verdikt kind={exaktNull ? "fail" : naheNull ? "warn" : "neutral"}>
        {beideNull
          ? `Beide Faktoren sind exakt null: das ganze Gitter fällt auf den Ursprung zusammen, d₁·d₂ = 0, und D besitzt keine Inverse.`
          : exaktNull
            ? `Genau ein Faktor ist exakt null: diese Koordinate wird gelöscht, das Bild liegt ganz auf der anderen Achse. Der Flächenfaktor d₁·d₂ = 0 sagt dasselbe, und D besitzt keine Inverse.`
            : naheNull
              ? `Kein Faktor ist exakt null, einer aber mit ${fmtDe(klein, 2)} sehr klein: D bleibt invertierbar, ist nur schlecht konditioniert – κ₂(D) = max|dᵢ|/min|dᵢ| = ${fmtDe(kappa, 0)}.`
              : gespiegelt
                ? `Ein Faktor ist negativ: diese Achse wird umgeklappt, die andere bleibt, wie sie ist. Der Flächenfaktor d₁·d₂ = ${fmtDe(flaeche, 2)} trägt deshalb ein Minus. Die Gitterlinien bleiben trotzdem achsenparallel.`
                : `Jede Koordinate wird nur mit ihrem eigenen Faktor multipliziert, die Achsen mischen sich nie: das Gitter bleibt rechteckig. Flächen werden mit d₁·d₂ = ${fmtDe(flaeche, 2)} skaliert${Math.abs(flaeche - 1) < 0.02 ? ", hier hebt die Streckung der einen Achse die Stauchung der anderen also gerade auf" : ""}.`}
      </Verdikt>
    </div>
  );
}
