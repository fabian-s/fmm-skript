import { useState } from "react";
import {
  ConceptLink,
  LabeledTransformCanvas,
  M,
  MD,
  registerConcept,
  sigmaMax,
  Slider,
} from "../lib";

function CondWidget() {
  const [eps, setEps] = useState(0.3);
  const A: [[number, number], [number, number]] = [
    [1, 1],
    [1, 1 + eps],
  ];
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0]; // = eps
  const s1 = sigmaMax(A);
  const s2 = Math.abs(det) / s1;
  const cond = s1 / s2;
  const worldHalf = Math.max(2.6, s1 * 1.15);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider
        label="ε"
        value={eps}
        onChange={setEps}
        min={0.02}
        max={1}
        step={0.02}
      />
      <div className="mb-1 font-mono text-xs">
        A = [[1, 1], [1, {(1 + eps).toFixed(2)}]] &nbsp;&nbsp; &sigma;
        <sub>max</sub> = {s1.toFixed(3)}, &sigma;<sub>min</sub> = {s2.toFixed(4)}
        , &nbsp;cond(A) = {cond.toFixed(1)}
      </div>
      <LabeledTransformCanvas
        matrix={A}
        tickClass="text-slate-300"
        size={260}
        worldHalf={worldHalf}
        showGrid={false}
        showUnitCircle={true}
      />
      <p className="mt-1 text-xs opacity-80">
        Der gestrichelte Einheitskreis wird von <M>{"\\bA"}</M> auf die
        durchgezogene Ellipse abgebildet. Für <M>{"\\eps \\to 0"}</M> werden
        die beiden Spalten gleich, die Ellipse kollabiert zu einer Nadel, und
        cond(A), das Verhältnis ihrer längsten zur kürzesten Achse,
        explodiert.
      </p>
    </div>
  );
}

registerConcept({
  id: "condition-number",
  title: "Konditionszahl",
  body: (
    <>
      <p>
        Die <em>Konditionszahl</em> (condition number) einer regulären
        quadratischen <ConceptLink id="matrix">Matrix</ConceptLink> misst, wie
        empfindlich die Lösung von <M>{"\\bA\\bx = \\bb"}</M> auf kleine
        Änderungen in den Eingangsdaten reagiert. Definiert ist sie über eine{" "}
        <ConceptLink id="euclidean-norm">Matrixnorm</ConceptLink> und die{" "}
        <ConceptLink id="matrix-inverse">Inverse</ConceptLink>:
      </p>
      <MD>
        {"\\operatorname{cond}(\\bA) = \\|\\bA\\| \\cdot \\|\\bA^{-1}\\| \\;\\ge\\; 1."}
      </MD>
      <p>
        Ihre Rolle: tragen die Daten des Systems einen relativen Fehler{" "}
        <M>{"\\delta"}</M> (aus Messung oder{" "}
        <ConceptLink id="rounding-error">Rundung</ConceptLink>), kann der
        relative Fehler der berechneten Lösung ungefähr bis zu{" "}
        <M>{"\\operatorname{cond}(\\bA) \\cdot \\delta"}</M> betragen.
        Faustregel: wir verlieren etwa{" "}
        <M>{"\\log_{10} \\operatorname{cond}(\\bA)"}</M> Dezimalstellen an
        Genauigkeit. Mit{" "}
        <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>{" "}
        <M>{"\\approx 10^{-16}"}</M> lässt eine Konditionszahl von{" "}
        <M>{"10^{12}"}</M> nur noch etwa vier verlässliche Stellen übrig.
      </p>
      <p>
        In der 2-Norm hat die Konditionszahl eine saubere geometrische
        Bedeutung: <M>{"\\bA"}</M> bildet den Einheitskreis auf eine Ellipse
        ab, und{" "}
        <M>{"\\operatorname{cond}_2(\\bA) = \\sigma_{\\max} / \\sigma_{\\min}"}</M>{" "}
        ist das Verhältnis der stärksten zur schwächsten Streckung (der
        Singulärwerte). Eine Matrix mit{" "}
        <M>{"\\operatorname{cond}(\\bA) = 1"}</M> (zum Beispiel eine{" "}
        <ConceptLink id="orthogonal-matrix">orthogonale Matrix</ConceptLink>)
        behandelt jede Richtung gleich; eine fast singuläre Matrix quetscht
        irgendeine Richtung beinahe platt und hat eine riesige Konditionszahl.
      </p>
      <p>
        Das Konzept stammt aus der Theorie linearer Gleichungssysteme
        (vgl. Heath Kap. 2); für rechteckige Matrizen ersetzt man{" "}
        <M>{"\\bA^{-1}"}</M> durch die Pseudoinverse:{" "}
        <M>{"\\operatorname{cond}(\\bA) = \\|\\bA\\|_2 \\cdot \\|\\bA^{+}\\|_2"}</M>{" "}
        (vgl. Heath §3.3).
      </p>
      <CondWidget />
    </>
  ),
});
