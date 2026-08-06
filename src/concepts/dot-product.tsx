import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledTransformCanvas } from "../lib";

/**
 * Rotate y around a fixed x and watch x^T y trace out ||x|| ||y|| cos(theta):
 * largest when aligned, zero at a right angle, negative when opposed.
 */
function DotProductWidget() {
  const [deg, setDeg] = useState(35);
  const x: [number, number] = [2, 1];
  const th = (deg * Math.PI) / 180;
  const y: [number, number] = [2 * Math.cos(th), 2 * Math.sin(th)];
  const dot = x[0] * y[0] + x[1] * y[1];
  const nx = Math.hypot(x[0], x[1]);
  const ny = 2;
  const cos = dot / (nx * ny);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung von y (°)" value={deg} onChange={setDeg} min={0} max={360} step={1} fmt={(v) => v.toFixed(0)} />
      <p className="my-1 font-mono text-xs">
        xᵀy = {dot.toFixed(2)}{"   "}cos θ = {cos.toFixed(2)}
        {Math.abs(dot) < 0.1 ? "  → (fast) orthogonal!" : ""}
      </p>
      <LabeledTransformCanvas
        tickClass="text-slate-300"
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        worldHalf={2.6}
        vectors={[
          { v: x, color: "#38bdf8", label: "x" },
          { v: y, color: "#f472b6", label: "y" },
        ]}
      />
    </div>
  );
}

registerConcept({
  id: "dot-product",
  title: "Skalarprodukt (inner product)",
  body: (
    <>
      <p>
        Das <em>Skalarprodukt</em> (engl. <em>inner product</em> oder{" "}
        <em>dot product</em>) zweier{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink> gleicher Länge
        multipliziert die zusammengehörigen Komponenten und summiert alles auf;
        mit der <ConceptLink id="transpose">Transposition</ConceptLink>{" "}
        schreiben wir es als Matrixprodukt:
      </p>
      <MD>{"\\bx^T \\by = x_1 y_1 + x_2 y_2 + \\cdots + x_n y_n ."}</MD>
      <p>
        Zum Beispiel liefern <M>{"[1, 2]^T"}</M> und <M>{"[3, 1]^T"}</M> den
        Wert <M>{"1 \\cdot 3 + 2 \\cdot 1 = 5"}</M>. Das Ergebnis ist eine
        einzelne Zahl, die misst, wie stark zwei Vektoren in dieselbe Richtung
        zeigen: Geometrisch gilt{" "}
        <M>{"\\bx^T \\by = \\|\\bx\\|_2 \\|\\by\\|_2 \\cos\\theta"}</M>, wobei{" "}
        <M>{"\\theta"}</M> der Winkel zwischen den Vektoren ist: positiv, wenn
        sie grob in dieselbe Richtung zeigen, null, wenn sie senkrecht
        aufeinander stehen (
        <ConceptLink id="orthogonality">Orthogonalität</ConceptLink>), negativ,
        wenn sie einander entgegengesetzt sind. Außerdem erzeugt es die{" "}
        <ConceptLink id="euclidean-norm">euklidische Norm</ConceptLink> über{" "}
        <M>{"\\|\\bx\\|_2^2 = \\bx^T \\bx"}</M>. Diese enge Verbindung von
        Länge, Winkel und einer einfachen algebraischen Formel ist ein
        Hauptgrund, warum die Kleinste-Quadrate-Methode die 2-Norm ihren
        Konkurrentinnen vorzieht.
      </p>
      <DotProductWidget />
    </>
  ),
});
