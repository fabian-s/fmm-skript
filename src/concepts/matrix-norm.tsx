import { useState } from "react";
import {
  ConceptLink,
  LabeledTransformCanvas,
  M,
  MatrixInput,
  MD,
  registerConcept,
  sigmaMax,
} from "../lib";

/** ‖A‖₂ als maximale Streckung: Einheitskreis → Ellipse, längste Halbachse = Norm. */
function NormWidget() {
  const [A, setA] = useState<number[][]>([
    [1, 0.8],
    [0.2, 1.4],
  ]);
  const M2: [[number, number], [number, number]] = [
    [A[0][0], A[0][1]],
    [A[1][0], A[1][1]],
  ];
  const s1 = sigmaMax(M2);
  const worldHalf = Math.max(2.2, s1 * 1.15);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <div className="mb-1 flex items-center gap-3">
        <span>
          <M>{"\\bA ="}</M>
        </span>
        <MatrixInput value={A} onChange={setA} />
        <span className="font-mono text-xs">
          ‖A‖₂ = {Number.isFinite(s1) ? s1.toFixed(3) : "–"}
        </span>
      </div>
      <LabeledTransformCanvas
        matrix={M2}
        tickClass="text-slate-300"
        size={260}
        worldHalf={worldHalf}
        showGrid={false}
        showUnitCircle={true}
      />
      <p className="mt-1 text-xs opacity-80">
        Alle Vektoren auf dem gestrichelten Einheitskreis werden von <M>{"\\bA"}</M> auf die
        Ellipse geschickt. Die 2-Norm <M>{"\\|\\bA\\|_2"}</M> ist die Länge der längsten
        Halbachse, also die stärkste Streckung, die <M>{"\\bA"}</M> irgendeinem Einheitsvektor
        antut. Probieren wir Einträge nahe an einer singulären Matrix: Die Ellipse wird zur
        Nadel, aber die Norm bleibt die halbe Nadellänge.
      </p>
    </div>
  );
}

registerConcept({
  id: "matrix-norm",
  title: "Matrixnorm (natürliche/induzierte Norm)",
  body: (
    <>
      <p>
        Wie „groß" ist eine Matrix? Für Fehlerabschätzungen wollen wir nicht die Einträge
        messen, sondern die <em>Wirkung</em> von <M>{"\\bA"}</M> als lineare Abbildung. Die von
        einer <ConceptLink id="norm">Vektornorm</ConceptLink> <em>induzierte</em> (oder{" "}
        <em>natürliche</em>, auch <em>Operator-</em>) Norm misst genau das, die maximale
        Streckung eines Vektors:
      </p>
      <MD>
        {"\\|\\bA\\| := \\max_{\\bx \\neq \\bnull} \\frac{\\|\\bA\\bx\\|}{\\|\\bx\\|} = \\max_{\\|\\bx\\| = 1} \\|\\bA\\bx\\|."}
      </MD>
      <p>
        Direkt aus der Definition folgt die Abschätzung, die wir in Beweisen ständig benutzen:{" "}
        <M>{"\\|\\bA\\bv\\| \\le \\|\\bA\\| \\, \\|\\bv\\|"}</M> für alle <M>{"\\bv"}</M>{" "}
        (Verträglichkeit mit der Vektornorm), und daraus die{" "}
        <em>Submultiplikativität</em> <M>{"\\|\\bA\\bB\\| \\le \\|\\bA\\| \\, \\|\\bB\\|"}</M>.
        Beide kontrollieren, wie stark sich Fehler durch Matrixprodukte fortpflanzen.
      </p>
      <p>
        Der wichtigste Spezialfall ist die von der{" "}
        <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink> induzierte{" "}
        <em>2-Norm</em> (Spektralnorm): <M>{"\\|\\bA\\|_2 = \\sigma_{\\max}(\\bA)"}</M>, der
        größte Singulärwert aus der{" "}
        <ConceptLink id="singular-value-decomposition">SVD</ConceptLink>. Eine{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrix</ConceptLink> streckt nichts:{" "}
        <M>{"\\|\\bQ\\|_2 = 1"}</M>. Aus <M>{"\\|\\bA\\|"}</M> und{" "}
        <M>{"\\|\\bA^{-1}\\|"}</M> zusammengesetzt entsteht die{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink>{" "}
        <M>{"\\kappa(\\bA) = \\|\\bA\\| \\, \\|\\bA^{-1}\\|"}</M>.
      </p>
      <NormWidget />
    </>
  ),
});
