/** Konzept-Tooltip: quadratische Form — x^T B x als skalare Funktion von x. */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

/** q(phi) = u^T B u für den Einheitsvektor u = (cos phi, sin phi), B = [[2,1],[0,1]]. */
const qOf = (phi: number) => {
  const c = Math.cos(phi);
  const s = Math.sin(phi);
  return 2 * c * c + c * s + s * s;
};

function QuadFormWidget() {
  const [phi, setPhi] = useState(0.5);
  const q = qOf(phi);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Richtung φ" value={phi} onChange={setPhi} min={0} max={3.14} step={0.01} />
      <div className="mb-1 text-xs">
        Laufen wir die Gerade{" "}
        <M>{"\\bx = t \\, (\\cos\\varphi, \\sin\\varphi)^\\top"}</M> entlang,
        zeichnet die quadratische Form{" "}
        <M>{"\\bx^\\top \\bB \\bx"}</M> mit{" "}
        <M>{"\\bB = \\begin{bmatrix} 2 & 1 \\\\ 0 & 1 \\end{bmatrix}"}</M>{" "}
        die Parabel{" "}
        <M>{`${q.toFixed(2)} \\, t^2`}</M> — immer eine Parabel, aber wie
        steil sie ist, hängt von der gewählten Richtung ab.
      </div>
      <Plot
        series={[{ f: (t) => q * t * t }]}
        xDomain={[-1.5, 1.5]}
        yDomain={[-0.5, 5]}
        width={280}
        height={170}
      />
    </div>
  );
}

registerConcept({
  id: "quadratic-form",
  title: "Quadratische Form",
  body: (
    <>
      <p>
        Eine <em>quadratische Form</em> schickt einen{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> <M>{"\\bx"}</M> durch
        ein „Matrix-Sandwich": Zuerst{" "}
        <ConceptLink id="matrix-multiplication">multiplizieren</ConceptLink>{" "}
        wir die quadratische{" "}
        <ConceptLink id="matrix">Matrix</ConceptLink> <M>{"\\bB"}</M> mit{" "}
        <M>{"\\bx"}</M>, dann bilden wir das{" "}
        <ConceptLink id="dot-product">Skalarprodukt</ConceptLink> des
        Ergebnisses noch einmal mit <M>{"\\bx"}</M> — also ist{" "}
        <M>{"\\bx^\\top \\bB \\bx"}</M> eine einzelne Zahl, und wenn{" "}
        <M>{"\\bx"}</M> variiert, definiert das eine skalarwertige{" "}
        <ConceptLink id="function">Funktion</ConceptLink>. Für zwei Einträge
        ausgeschrieben ist sie ein{" "}
        <ConceptLink id="polynomial">Polynom</ConceptLink>, in dem jeder Term
        genau Grad zwei hat — der mehrdimensionale Vetter der Schulparabel{" "}
        <M>{"b x^2"}</M>:
      </p>
      <MD>
        {"\\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix}^\\top \\begin{bmatrix} 2 & 1 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = 2x_1^2 + x_1 x_2 + x_2^2 ."}
      </MD>
      <p>
        Weil ein <M>{"1 \\times 1"}</M>-Ergebnis gleich seiner eigenen{" "}
        <ConceptLink id="transpose">Transponierten</ConceptLink> ist, gilt{" "}
        <M>{"\\bx^\\top \\bB \\bx = \\bx^\\top \\bB^\\top \\bx"}</M> — nur der{" "}
        <ConceptLink id="symmetric-matrix">symmetrische</ConceptLink> Anteil{" "}
        <M>{"\\tfrac{1}{2}(\\bB + \\bB^\\top)"}</M> von <M>{"\\bB"}</M>{" "}
        zählt. Dieselbe Kombination taucht beim Differenzieren auf: Eine
        Standard-Identität des Matrix-Kalküls (vgl. MML Gl. (5.107)) besagt,
        dass der Gradient von <M>{"\\bx^\\top \\bB \\bx"}</M> nach{" "}
        <M>{"\\bx"}</M> gerade <M>{"\\bx^\\top (\\bB + \\bB^\\top)"}</M> ist —
        für symmetrisches <M>{"\\bB"}</M> also{" "}
        <M>{"2\\bx^\\top \\bB"}</M>, ganz analog zu{" "}
        <M>{"\\tfrac{\\mathrm{d}}{\\mathrm{d}x} (b x^2) = 2bx"}</M>.
      </p>
      <QuadFormWidget />
    </>
  ),
});
