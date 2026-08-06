import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

/**
 * Basisfunktionen-Widget: die Monome 1, t, t² (gestrichelt) bilden eine Basis
 * der quadratischen Polynome; die Slider wählen die Koordinaten, die
 * durchgezogene Kurve ist die resultierende Linearkombination.
 */
function BasisFunctionWidget() {
  const [c1, setC1] = useState(1);
  const [c2, setC2] = useState(0.5);
  const [c3, setC3] = useState(-0.8);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="c₁ (mal 1)" value={c1} onChange={setC1} min={-2} max={2} step={0.1} fmt={(x) => x.toFixed(1)} />
      <Slider label="c₂ (mal t)" value={c2} onChange={setC2} min={-2} max={2} step={0.1} fmt={(x) => x.toFixed(1)} />
      <Slider label="c₃ (mal t²)" value={c3} onChange={setC3} min={-2} max={2} step={0.1} fmt={(x) => x.toFixed(1)} />
      <p className="my-1 font-mono text-xs">
        f(t) = {c1.toFixed(1)} + {c2.toFixed(1)}·t + {c3.toFixed(1)}·t²
      </p>
      <LabeledPlot
        xLabel="t"
        yLabel="f(t)"
        tickClass="text-slate-300"
        xDomain={[-2, 2]}
        yDomain={[-4, 4]}
        width={280}
        height={190}
        series={[
          { f: () => 1, color: "#94a3b8", dash: [4, 3], label: "1" },
          { f: (t) => t, color: "#38bdf8", dash: [4, 3], label: "t" },
          { f: (t) => t * t, color: "#fbbf24", dash: [4, 3], label: "t²" },
          { f: (t) => c1 + c2 * t + c3 * t * t, color: "#f472b6", label: "f" },
        ]}
      />
      <p className="mt-1 text-xs text-slate-300">
        Gestrichelt: die drei Basisfunktionen 1 (grau), t (blau), t² (gelb).
        Durchgezogen in Pink: unsere Linearkombination. Die Koordinaten
        (c₁, c₂, c₃) legen jedes quadratische Polynom eindeutig fest.
      </p>
    </div>
  );
}

registerConcept({
  id: "basis",
  title: "Basis",
  body: (
    <>
      <p>
        Eine <em>Basis</em> eines{" "}
        <ConceptLink id="vector-space">Vektorraums</ConceptLink> (oder{" "}
        <ConceptLink id="subspace">Unterraums</ConceptLink>) ist ein
        kleinstmöglicher Satz von Bausteinen: eine Sammlung{" "}
        <ConceptLink id="linear-independence">
          linear unabhängiger
        </ConceptLink>{" "}
        <ConceptLink id="vector">Vektoren</ConceptLink>, deren{" "}
        <ConceptLink id="span">Spann</ConceptLink> der ganze Raum ist. Weil es
        keine Redundanz gibt, lässt sich jedes Element des Raums auf genau{" "}
        <em>eine</em> Weise als{" "}
        <ConceptLink id="linear-combination">Linearkombination</ConceptLink>{" "}
        der Basis schreiben; die Koeffizienten sind seine{" "}
        <em>Koordinaten</em>. In <M>{"\\R^2"}</M> lautet die Standardbasis
      </p>
      <MD>{"\\be_1 = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}, \\quad \\be_2 = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}, \\qquad \\begin{bmatrix} 3 \\\\ 5 \\end{bmatrix} = 3\\,\\be_1 + 5\\,\\be_2 ."}</MD>
      <p>
        Die Anzahl der Basisvektoren ist die{" "}
        <ConceptLink id="dimension">Dimension</ConceptLink> des Raums. Dieselbe
        Idee funktioniert auch für Funktionen: die Monome{" "}
        <M>{"1, t, t^2"}</M> bilden eine Basis aller quadratischen Polynome,
        und ein Modell <M>{"f(t) = x_1 + x_2 t + x_3 t^2"}</M> anzupassen
        heißt, die Koordinaten <M>{"x_1, x_2, x_3"}</M> in dieser Basis zu
        wählen. Interpolation wählt sie so, dass die Kurve exakt durch alle
        Datenpunkte läuft; die Methode der kleinsten Quadrate wählt sie so,
        dass die Kurve den Daten möglichst nahe kommt, wenn ein exakter Fit
        unmöglich ist (vgl. Heath §3.1).
      </p>
      <BasisFunctionWidget />
    </>
  ),
});
