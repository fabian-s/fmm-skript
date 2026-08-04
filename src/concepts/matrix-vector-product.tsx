import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";

/** A = [[1,2],[3,4]] fest; wir bewegen x und sehen Ax als Spaltenmischung. */
function ProductWidget() {
  const [x1, setX1] = useState(2);
  const [x2, setX2] = useState(1);
  const r = (v: number) => Math.round(v * 10) / 10;
  const b1 = r(1 * x1 + 2 * x2);
  const b2 = r(3 * x1 + 4 * x2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x₁" value={x1} onChange={setX1} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <Slider label="x₂" value={x2} onChange={setX2} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <MD>
        {`\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} ${r(x1)} \\\\ ${r(x2)} \\end{bmatrix} = ${r(x1)} \\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} + ${r(x2)} \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} ${b1} \\\\ ${b2} \\end{bmatrix}`}
      </MD>
    </div>
  );
}

registerConcept({
  id: "matrix-vector-product",
  title: "Matrix-Vektor-Produkt",
  body: (
    <>
      <p>
        Das Produkt <M>{"\\bA\\bx"}</M> verknüpft eine{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> und einen{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> zu einem neuen Vektor.
        Das zeilenweise Rezept: Eintrag <M>{"i"}</M> des Ergebnisses
        multipliziert jeden Eintrag von Zeile <M>{"i"}</M> mit dem passenden
        Eintrag von <M>{"\\bx"}</M> und summiert alles auf. Zum Beispiel:
      </p>
      <MD>
        {"\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1\\cdot 2 + 2\\cdot 1 \\\\ 3\\cdot 2 + 4\\cdot 1 \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 10 \\end{bmatrix}."}
      </MD>
      <p>
        Genauso wichtig ist die Spaltensicht: <M>{"\\bA\\bx"}</M> ist die{" "}
        <ConceptLink id="linear-combination">Linearkombination</ConceptLink>{" "}
        der Spalten von <M>{"\\bA"}</M> mit den Einträgen von <M>{"\\bx"}</M>{" "}
        als Gewichten. Ein Gleichungssystem als <M>{"\\bA\\bx = \\bb"}</M> zu
        schreiben nutzt genau das: <M>{"\\bb"}</M> aus einem bekannten{" "}
        <M>{"\\bx"}</M> zu berechnen ist eine einzige Multiplikation, und eine
        Bedingung wie <M>{"\\bA\\bz \\neq \\bo"}</M> besagt, dass das Rezept
        angewandt auf <M>{"\\bz"}</M> nicht den Nullvektor liefert. Probieren
        wir es aus: Bewegen wir unten die Gewichte und beobachten, wie das
        Ergebnis die beiden Spalten mischt.
      </p>
      <ProductWidget />
    </>
  ),
});
