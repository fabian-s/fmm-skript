/** Konzept-Tooltip: Bild (Spaltenraum) einer linearen Abbildung. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider, TransformCanvas } from "../lib";

function ImageWidget() {
  const [th, setTh] = useState(0.8);
  const v: [number, number] = [1.5 * Math.cos(th), 1.5 * Math.sin(th)];
  // A v für A = [[1,2],[0.5,1]] (Rang 1, Bild = span{(1, 0.5)})
  const Av: [number, number] = [v[0] + 2 * v[1], 0.5 * v[0] + v[1]];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Richtung von v"
        value={th}
        onChange={setTh}
        min={-Math.PI / 2}
        max={Math.PI / 2}
      />
      <TransformCanvas
        matrix={[
          [1, 2],
          [0.5, 1],
        ]}
        showGrid={false}
        size={260}
        worldHalf={3}
        vectors={[
          { v, color: "#dc2626", label: "v" },
          { v: Av, color: "#0284c7", label: "Av" },
        ]}
      />
      <p className="mt-1 text-xs">
        Drehen wir v, wohin wir wollen: Die Ausgabe Av landet immer auf der
        Geraden durch (1, 0.5) — diese Gerade ist das gesamte Bild dieser
        Rang-1-Matrix.
      </p>
    </div>
  );
}

registerConcept({
  id: "image",
  title: "Bild (einer linearen Abbildung)",
  body: (
    <>
      <p>
        Das <em>Bild</em> (image, range) einer{" "}
        <ConceptLink id="linear-map">linearen Abbildung</ConceptLink>{" "}
        <M>{"\\bx \\mapsto \\bA\\bx"}</M> ist die Menge aller Ausgaben, die die
        Abbildung tatsächlich erzeugen kann:
      </p>
      <MD>{"\\operatorname{Im}(\\bA) = \\{ \\bA\\bx : \\bx \\in \\R^n \\}."}</MD>
      <p>
        Da <M>{"\\bA\\bx"}</M> genau eine{" "}
        <ConceptLink id="linear-combination">Linearkombination</ConceptLink>{" "}
        der Spalten der <ConceptLink id="matrix">Matrix</ConceptLink> ist, ist
        das Bild der <ConceptLink id="span">Spann</ConceptLink> der Spalten
        &mdash; daher der alternative Name <em>Spaltenraum</em> (column space).
        Es ist immer ein{" "}
        <ConceptLink id="subspace">Unterraum</ConceptLink> des Zielraums, und
        seine <ConceptLink id="dimension">Dimension</ConceptLink> ist genau der{" "}
        <ConceptLink id="rank">Rang</ConceptLink> von <M>{"\\bA"}</M>. Ein{" "}
        <ConceptLink id="linear-system">lineares Gleichungssystem</ConceptLink>{" "}
        <M>{"\\bA\\bx = \\bb"}</M> ist genau dann lösbar, wenn{" "}
        <M>{"\\bb"}</M> im Bild liegt. Bild und{" "}
        <ConceptLink id="kernel">Kern</ConceptLink> stehen im Tausch
        zueinander: Nach dem{" "}
        <ConceptLink id="rank-nullity-theorem">Rangsatz</ConceptLink> fehlen
        dem Bild genau die Dimensionen, die an den Kern verloren gehen. Zum
        Beispiel zeigen bei{" "}
        <M>{"\\bA = \\begin{pmatrix} 1 & 2 \\\\ 0.5 & 1 \\end{pmatrix}"}</M>{" "}
        beide Spalten entlang <M>{"(1, 0.5)^\\top"}</M>, das Bild ist also nur
        diese eine Gerade &mdash; probieren wir es aus:
      </p>
      <ImageWidget />
    </>
  ),
});
