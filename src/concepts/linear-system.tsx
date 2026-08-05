import { ConceptLink, M, MD, Plot, registerConcept } from "../lib";

function ZweiGeradenFigur() {
  // statische Abbildung ZUM SYSTEM AUS DEM TEXT: 2x + 3y = 5 und x - y = 1,
  // also y = (5 - 2x)/3 bzw. y = x - 1; Schnittpunkt (8/5, 3/5).
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Plot
        series={[
          { f: (x) => (5 - 2 * x) / 3, color: "#0284c7" },
          { f: (x) => x - 1, color: "#dc2626" },
        ]}
        xDomain={[-2, 4]}
        yDomain={[-3, 3]}
        width={280}
        height={200}
        markers={[{ x: 1.6, y: 0.6, color: "#16a34a", label: "Lösung" }]}
      />
      <p className="mt-1 text-xs">
        Jede der beiden Gleichungen beschreibt eine Gerade:{" "}
        <span style={{ color: "#0284c7" }}>2x + 3y = 5</span> und{" "}
        <span style={{ color: "#dc2626" }}>x − y = 1</span>. Die Lösung des Systems ist ihr
        Schnittpunkt <M>{"(x, y) = (8/5,\\, 3/5)"}</M>.
      </p>
    </div>
  );
}

registerConcept({
  id: "linear-system",
  title: "Lineares Gleichungssystem",
  body: (
    <>
      <p>
        Ein lineares Gleichungssystem ist eine Sammlung von Gleichungen, in
        denen jede Unbekannte nur mit einer Zahl multipliziert und aufsummiert
        vorkommt — keine Quadrate, keine Produkte von Unbekannten, keine
        anderen nichtlinearen Terme. Zum Beispiel bilden{" "}
        <M>{"2x + 3y = 5"}</M> und <M>{"x - y = 1"}</M> zusammen ein System in
        den zwei Unbekannten <M>{"x, y"}</M>; eine Lösung ist jede Belegung der
        Unbekannten, die <em>alle</em> Gleichungen gleichzeitig erfüllt.
        Stapeln wir die Koeffizienten in eine{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bA"}</M> und die
        Unbekannten in einen <ConceptLink id="vector">Vektor</ConceptLink>{" "}
        <M>{"\\bx"}</M>, schrumpft das ganze System auf eine Gleichung:
      </p>
      <MD>
        {"\\begin{pmatrix} 2 & 3 \\\\ 1 & -1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 1 \\end{pmatrix}, \\quad \\text{d.h.} \\quad \\bA\\bx = \\bb."}
      </MD>
      <p>
        Systeme lassen sich mechanisch mit dem{" "}
        <ConceptLink id="gaussian-elimination">Gauß-Verfahren</ConceptLink>{" "}
        lösen, und ob <M>{"\\bA\\bx = \\bb"}</M> genau eine Lösung hat,
        entscheidet die Determinante von <M>{"\\bA"}</M>: genau eine Lösung,
        wenn sie ungleich null ist.
      </p>
      <ZweiGeradenFigur />
    </>
  ),
});
