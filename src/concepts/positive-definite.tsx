/** Konzept-Tooltip: positive Definitheit — quadratische Form auf dem Einheitskreis. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

/**
 * Definitheits-Test auf dem Einheitskreis: plotte q(θ) = x(θ)ᵀA x(θ) für
 * Einheitsvektoren x(θ) = (cos θ, sin θ) und A = [[2, c], [c, 2]]. Positiv
 * definit genau dann, wenn die ganze Kurve über null bleibt, d.h. wenn der
 * kleinste Eigenwert 2 − |c| > 0 ist.
 */
function PositiveDefiniteWidget() {
  const [c, setC] = useState(1);
  // x(θ)ᵀ A x(θ) = 2 + 2c sinθ cosθ = 2 + c sin(2θ)
  const q = (th: number) => 2 + c * Math.sin(2 * th);
  const lmin = 2 - Math.abs(c);
  const pd = lmin > 0;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Nebendiagonale c" value={c} onChange={setC} min={-3} max={3} step={0.1} fmt={(v) => v.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        A = [[2, {c.toFixed(1)}], [{c.toFixed(1)}, 2]], Minimum über Einheitsvektoren ={" "}
        λ_min = {lmin.toFixed(1)} →{" "}
        {pd ? "positiv definit ✓" : "NICHT positiv definit ✗"}
      </p>
      <LabeledPlot
        xLabel="θ (Richtung des Einheitsvektors x)"
        yLabel="xᵀA x"
        tickClass="text-slate-300"
        series={[{ f: q, color: pd ? "#4ade80" : "#f87171" }]}
        xDomain={[0, 3.15]}
        yDomain={[-1.5, 5.5]}
        width={280}
        height={180}
      />
      <p className="mt-1 text-xs text-slate-300">
        Jedes θ steht für eine Richtung x = (cos θ, sin θ); die Kurve zeigt die
        quadratische Form xᵀAx in dieser Richtung. Für |c| &lt; 2 bleibt die
        Kurve strikt oberhalb der Nulllinie — A ist positiv definit. Schieben
        wir |c| über 2, liefern manche Richtungen xᵀAx ≤ 0.
      </p>
    </div>
  );
}

registerConcept({
  id: "positive-definite",
  title: "Positive Definitheit",
  body: (
    <>
      <p>
        Eine{" "}
        <ConceptLink id="symmetric-matrix">symmetrische Matrix</ConceptLink>{" "}
        <M>{"\\bA"}</M> heißt <em>positiv definit</em> (positive definite),
        wenn die Zahl <M>{"\\bx^T \\bA \\bx"}</M> — ihre{" "}
        <em>quadratische Form</em> — für jeden Vektor{" "}
        <M>{"\\bx \\neq \\bnull"}</M> strikt positiv ist:
      </p>
      <MD>
        {"\\bx^T \\bA \\bx > 0 \\quad \\text{für alle } \\bx \\neq \\bnull."}
      </MD>
      <p>
        Stellen wir uns das als Matrix-Version von „eine positive Zahl" vor:
        In einer Dimension lautet die Bedingung <M>{"a x^2 > 0"}</M>, also{" "}
        <M>{"a > 0"}</M>. Gleichwertig: Alle{" "}
        <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> von{" "}
        <M>{"\\bA"}</M> sind positiv. Symmetrische positiv definite (SPD)
        Matrizen sind die gutartigsten linearen Gleichungssysteme überhaupt —
        sie lassen sich stabil und billig per{" "}
        <ConceptLink id="cholesky-factorization">
          Cholesky-Zerlegung
        </ConceptLink>{" "}
        lösen. Das zentrale Beispiel für uns ist{" "}
        <M>{"\\bA^T \\bA"}</M>: Wegen{" "}
        <M>{"\\bx^T \\bA^T \\bA \\bx = \\left\\| \\bA\\bx \\right\\|_2^2 \\geq 0"}</M>{" "}
        ist die quadratische Form eine quadrierte{" "}
        <ConceptLink id="euclidean-norm">Länge</ConceptLink> — und sie ist
        genau dann strikt positiv für alle <M>{"\\bx \\neq \\bnull"}</M>, wenn
        kein <M>{"\\bx \\neq \\bnull"}</M> die Gleichung{" "}
        <M>{"\\bA\\bx = \\bnull"}</M> erfüllt, d.h. wenn{" "}
        <ConceptLink id="rank">
          <M>{"\\rang(\\bA) = n"}</M>
        </ConceptLink>{" "}
        gilt. Das ist genau die Bedingung, unter der die{" "}
        <ConceptLink id="hessian-matrix">Hesse-Matrix</ConceptLink>{" "}
        <M>{"2\\bA^T\\bA"}</M> ein eindeutiges Kleinste-Quadrate-Minimum
        garantiert.
      </p>
      <PositiveDefiniteWidget />
    </>
  ),
});
