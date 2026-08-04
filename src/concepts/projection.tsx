/** Konzept-Tooltip: Projektion. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider, TransformCanvas } from "../lib";

function ProjectionWidget() {
  const [theta, setTheta] = useState(0.5);
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  // P = b b^T für den Einheitsvektor b = (cos θ, sin θ)^T
  const P: [[number, number], [number, number]] = [
    [c * c, c * s],
    [c * s, s * s],
  ];
  const x: [number, number] = [2, 1.4];
  const px: [number, number] = [P[0][0] * x[0] + P[0][1] * x[1], P[1][0] * x[0] + P[1][1] * x[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Winkel θ der Geraden"
        value={theta}
        onChange={setTheta}
        min={0}
        max={Math.PI}
        step={0.02}
      />
      <TransformCanvas
        matrix={P}
        size={250}
        worldHalf={3}
        showUnitCircle={false}
        vectors={[
          { v: x, color: "#dc2626", label: "x" },
          { v: px, color: "#0284c7", label: "πx" },
        ]}
      />
      <p className="mt-1 text-xs opacity-80">
        Das ganze Gitter kollabiert auf die Gerade mit Winkel{" "}
        <M>{"\\theta"}</M>; <M>{"\\pi\\bx"}</M> ist der Fußpunkt des Lots, das
        wir von <M>{"\\bx"}</M> auf diese Gerade fällen.
      </p>
    </div>
  );
}

registerConcept({
  id: "projection",
  title: "Projektion",
  body: (
    <>
      <p>
        Eine <em>Projektion</em> ist eine{" "}
        <ConceptLink id="linear-map">lineare Abbildung</ConceptLink>{" "}
        <M>{"\\pi"}</M>, die den Raum auf einen{" "}
        <ConceptLink id="subspace">Untervektorraum</ConceptLink> <M>{"U"}</M>{" "}
        plättet und dabei jeden Punkt, der schon in <M>{"U"}</M> liegt, an
        seinem Platz lässt. Zweimal projizieren ändert deshalb nichts
        gegenüber einmal projizieren:{" "}
        <M>{"\\pi \\circ \\pi = \\pi"}</M> — gleichwertig erfüllt ihre{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink>{" "}
        <M>{"\\bP^2 = \\bP"}</M>.
      </p>
      <p>
        Das Arbeitspferd ist die <em>orthogonale</em> Projektion: Sie schickt{" "}
        <M>{"\\bx"}</M> auf den Punkt von <M>{"U"}</M>, der ihm am nächsten
        liegt, sodass der Fehler <M>{"\\bx - \\pi(\\bx)"}</M>{" "}
        <ConceptLink id="orthogonality">orthogonal</ConceptLink> zu{" "}
        <M>{"U"}</M> steht. Für die von einem Einheitsvektor <M>{"\\bb"}</M>{" "}
        aufgespannte Gerade gilt
      </p>
      <MD>
        {"\\pi(\\bx) = (\\bb^\\top \\bx)\\,\\bb, \\qquad \\bP = \\bb\\bb^\\top,"}
      </MD>
      <p>
        wobei <M>{"\\bb^\\top\\bx"}</M> das{" "}
        <ConceptLink id="dot-product">Skalarprodukt</ConceptLink> ist. Kleines
        Beispiel: Projizieren wir <M>{"(2, 3)^\\top"}</M> auf die{" "}
        <M>{"x_1"}</M>-Achse (also <M>{"\\bb = (1, 0)^\\top"}</M>), erhalten
        wir <M>{"(2, 0)^\\top"}</M> — die zweite Koordinate wird schlicht
        verworfen. Die Kleinste-Quadrate-Schätzung in der Statistik ist genau
        so eine Projektion: die des Datenvektors auf den Untervektorraum der
        Modellvorhersagen.
      </p>
      <ProjectionWidget />
    </>
  ),
});
