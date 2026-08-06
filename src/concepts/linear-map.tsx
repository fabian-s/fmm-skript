/** Concept tooltip: lineare Abbildung (Matrix als lineare Transformation). */
import { useState } from "react";
import {
  ConceptLink,
  M,
  MD,
  MatrixInput,
  registerConcept,
  TransformCanvas,
} from "../lib";

function LinearMapWidget() {
  const [m, setM] = useState<number[][]>([
    [1, -0.5],
    [0.5, 1],
  ]);
  const matrix: [[number, number], [number, number]] = [
    [m[0][0], m[0][1]],
    [m[1][0], m[1][1]],
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="mb-1 flex flex-wrap items-center gap-3 text-xs">
        <MatrixInput value={m} onChange={setM} />
        <span>
          Die Pfeile sind die Bilder der Standardbasisvektoren: Sie sind genau
          die <em>Spalten</em> von <M>{"\\bA"}</M>.
        </span>
      </div>
      <TransformCanvas
        matrix={matrix}
        vectors={[
          { v: [matrix[0][0], matrix[1][0]], color: "#dc2626", label: "Ae₁" },
          { v: [matrix[0][1], matrix[1][1]], color: "#16a34a", label: "Ae₂" },
        ]}
      />
      <div className="mt-1 text-xs">
        Gitterquadrate werden zu Parallelogrammen, der Ursprung bleibt fest,
        und Geraden bleiben Geraden: die Erkennungszeichen einer linearen
        Abbildung.
      </div>
    </div>
  );
}

registerConcept({
  id: "linear-map",
  title: "Lineare Abbildung",
  body: (
    <>
      <p>
        Eine lineare Abbildung (linear map) ist eine{" "}
        <ConceptLink id="function">Funktion</ConceptLink>{" "}
        <M>{"\\Phi : \\R^n \\to \\R^m"}</M>, die Addition und Skalierung von{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink> respektiert:
      </p>
      <MD>{"\\Phi(\\bx + \\by) = \\Phi(\\bx) + \\Phi(\\by), \\qquad \\Phi(\\lambda \\bx) = \\lambda\\, \\Phi(\\bx) ."}</MD>
      <p>
        Jede solche Abbildung ist die{" "}
        <ConceptLink id="matrix-multiplication">Multiplikation</ConceptLink>{" "}
        mit einer <ConceptLink id="matrix">Matrix</ConceptLink>,{" "}
        <M>{"\\Phi(\\bx) = \\bA\\bx"}</M>, und die Matrix lässt sich leicht
        ablesen: Spalte <M>{"j"}</M> von <M>{"\\bA"}</M> ist das Bild des{" "}
        <M>{"j"}</M>-ten Standardbasisvektors. Das ist der Trick hinter der
        Aufgabe, die Einheitsquadrat-zu-Parallelogramm-Transformation zu
        identifizieren (vgl. MML Abb. 5.5): Wir schauen, wo <M>{"(1,0)"}</M>{" "}
        und <M>{"(0,1)"}</M> landen. Diese beiden Bilder, als Spalten
        geschrieben, sind schon die ganze Abbildung. Linearität heißt außerdem:
        Der Ursprung bleibt liegen, und gleichmäßig verteilte Gitterlinien
        bleiben gleichmäßig verteilt: kein Verbiegen, kein Verschieben.
      </p>
      <LinearMapWidget />
    </>
  ),
});
