/** Konzept-Tooltip: QR-Zerlegung — Gram-Schmidt-Sicht und Kleinste Quadrate. */
import { useState } from "react";
import { ConceptLink, LabeledTransformCanvas, M, MD, registerConcept, Slider } from "../lib";

const IDENT: [[number, number], [number, number]] = [
  [1, 0],
  [0, 1],
];

/**
 * Gram-Schmidt-Sicht der QR-Zerlegung für eine 2x2-Matrix: a1 ist fest, die
 * Richtung von a2 hängt am Slider. q1, q2 sind die orthonormalisierten
 * Spalten (sie liegen auf dem Einheitskreis); die Einträge von R werden live
 * neu berechnet.
 */
function GramSchmidtWidget() {
  const a1: [number, number] = [1.5, 2]; // ||a1|| = 2.5, q1 = (0.6, 0.8)
  const [th, setTh] = useState(2.2);
  const a2: [number, number] = [2 * Math.cos(th), 2 * Math.sin(th)];
  const r11 = Math.hypot(a1[0], a1[1]);
  const q1: [number, number] = [a1[0] / r11, a1[1] / r11];
  const r12 = q1[0] * a2[0] + q1[1] * a2[1];
  const u: [number, number] = [a2[0] - r12 * q1[0], a2[1] - r12 * q1[1]];
  const r22 = Math.hypot(u[0], u[1]);
  const q2: [number, number] =
    r22 > 1e-9 ? [u[0] / r22, u[1] / r22] : [-q1[1], q1[0]]; // Notlösung, falls a2 ∥ a1
  const nearParallel = r22 < 0.15;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung von a₂" value={th} onChange={setTh} min={0} max={6.28} step={0.02} />
      <LabeledTransformCanvas
        matrix={IDENT}
        showGrid={false}
        showUnitCircle={true}
        size={250}
        worldHalf={2.6}
        tickClass="text-slate-300"
        vectors={[
          { v: a1, color: "#0284c7", label: "a₁" },
          { v: a2, color: "#059669", label: "a₂" },
          { v: q1, color: "#f59e0b", label: "q₁" },
          { v: q2, color: "#dc2626", label: "q₂" },
        ]}
      />
      <p className="mt-1 text-xs">
        <M>
          {`\\bR = \\begin{bmatrix} ${r11.toFixed(2)} & ${r12.toFixed(2)} \\\\ 0 & ${r22.toFixed(2)} \\end{bmatrix}`}
        </M>
        {" — "}
        <M>{"\\bq_1"}</M> ist <M>{"\\ba_1"}</M>, auf Länge 1 geschrumpft;{" "}
        <M>{"\\bq_2"}</M> ist das, was von <M>{"\\ba_2"}</M> übrig bleibt,
        nachdem wir seinen <M>{"\\bq_1"}</M>-Anteil (
        <M>{"r_{12}\\bq_1"}</M>) abgezogen haben, wieder auf Länge 1 skaliert.
        Beide Spitzen liegen im rechten Winkel zueinander auf dem
        Einheitskreis.
        {nearParallel && (
          <>
            {" "}
            Gerade eben ist <M>{"\\ba_2"}</M> fast parallel zu{" "}
            <M>{"\\ba_1"}</M>: <M>{`r_{22} \\approx ${r22.toFixed(2)}`}</M>,
            die Matrix hat beinahe keinen vollen{" "}
            <ConceptLink id="rank">Rang</ConceptLink> mehr und{" "}
            <M>{"\\bq_2"}</M> ist schlecht bestimmt.
          </>
        )}
      </p>
    </div>
  );
}

registerConcept({
  id: "qr-factorization",
  title: "QR-Zerlegung",
  body: (
    <>
      <p>
        Die <em>QR-Zerlegung</em> (QR factorization) spaltet eine Matrix auf
        in <M>{"\\bA = \\bQ\\bR"}</M>, wobei <M>{"\\bQ"}</M> eine{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrix</ConceptLink>{" "}
        ist und <M>{"\\bR"}</M> eine{" "}
        <ConceptLink id="triangular-matrix">obere Dreiecksmatrix</ConceptLink>.
        Die Idee dahinter ist Gram-Schmidt: Wir bauen eine{" "}
        <ConceptLink id="orthonormal-basis">Orthonormalbasis</ConceptLink> für
        den von den Spalten von <M>{"\\bA"}</M> aufgespannten Raum, und{" "}
        <M>{"\\bR"}</M> hält das Rezept fest, wie sich jede ursprüngliche
        Spalte aus diesen Basisvektoren zusammensetzt. Eine kleine Instanz:
      </p>
      <MD>
        {"\\underbrace{\\begin{bmatrix} 3 & -1 \\\\ 4 & 7 \\end{bmatrix}}_{\\bA} = \\underbrace{\\begin{bmatrix} 0.6 & -0.8 \\\\ 0.8 & 0.6 \\end{bmatrix}}_{\\bQ} \\underbrace{\\begin{bmatrix} 5 & 5 \\\\ 0 & 5 \\end{bmatrix}}_{\\bR}."}
      </MD>
      <p>
        Ihr Gewinn für das{" "}
        <ConceptLink id="linear-least-squares">
          lineare Kleinste-Quadrate-Problem
        </ConceptLink>
        : Multiplikation eines Vektors mit <M>{"\\bQ^{\\mathsf T}"}</M> ändert
        seine{" "}
        <ConceptLink id="euclidean-norm">euklidische Länge</ConceptLink> nie,
        also
      </p>
      <MD>
        {"\\left\\| \\bb - \\bA\\bx \\right\\|_2 = \\left\\| \\bQ^{\\mathsf T}\\bb - \\bR\\bx \\right\\|_2 ,"}
      </MD>
      <p>
        und für eine hohe <M>{"m \\times n"}</M>-Matrix sind die unteren{" "}
        <M>{"m - n"}</M> Zeilen von <M>{"\\bR"}</M> null: Der Minimierer kommt
        aus einem einzigen billigen{" "}
        <ConceptLink id="triangular-solve">
          Lösen eines Dreieckssystems
        </ConceptLink>{" "}
        mit dem oberen <M>{"n \\times n"}</M>-Block, und die unbeeinflussbaren
        unteren Einträge von <M>{"\\bQ^{\\mathsf T}\\bb"}</M> liefern die
        Residuennorm gratis dazu. Weil <M>{"\\bA^{\\mathsf T}\\bA"}</M> nie
        gebildet wird, wird auch die{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink> nicht
        quadriert — der entscheidende Genauigkeitsvorteil gegenüber den{" "}
        <ConceptLink id="normal-equations">Normalengleichungen</ConceptLink>.
        Produktionsreife Software berechnet <M>{"\\bQ"}</M> mit
        Householder-
        <ConceptLink id="reflection">Spiegelungen</ConceptLink> oder Givens-
        <ConceptLink id="rotation-matrix">Rotationen</ConceptLink>, die
        numerisch robuster sind als das Lehrbuch-Gram-Schmidt.
      </p>
      <GramSchmidtWidget />
    </>
  ),
});
