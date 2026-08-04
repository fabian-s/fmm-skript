/** Konzept-Tooltip: Polynom (Potenz-Bausteine, Taylor-Polynome). */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

function MonomialWidget() {
  const [n, setN] = useState(2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Grad n des Bausteins xⁿ" value={n} onChange={setN} min={0} max={6} step={1} />
      <Plot
        series={[{ f: (x) => Math.pow(x, n), color: "#0284c7" }]}
        xDomain={[-1.6, 1.6]}
        yDomain={[-2, 2]}
        width={280}
        height={190}
      />
      <p className="mt-1 text-xs text-slate-300">
        Die Potenzfunktionen xⁿ (hier n = {n}) sind die Bausteine; ein Polynom
        ist eine gewichtete Summe endlich vieler davon.
      </p>
    </div>
  );
}

registerConcept({
  id: "polynomial",
  title: "Polynom",
  body: (
    <>
      <p>
        Ein Polynom ist eine{" "}
        <ConceptLink id="function">Funktion</ConceptLink>, die nur aus Potenzen
        von <M>{"x"}</M> aufgebaut ist — jede mit einer festen Zahl (einem
        Koeffizienten) multipliziert und dann aufsummiert:
      </p>
      <MD>{"p(x) = a_0 + a_1 x + a_2 x^2 + \\cdots + a_n x^n = \\sum_{i=0}^{n} a_i x^i,"}</MD>
      <p>
        kompakt geschrieben in{" "}
        <ConceptLink id="summation-notation">Summennotation</ConceptLink>. Die
        höchste Potenz mit Koeffizient ungleich null ist der <em>Grad</em>:
        Grad 1 liefert eine gewöhnliche{" "}
        <ConceptLink id="linear-function">lineare Funktion</ConceptLink>, Grad
        2 eine Parabel. Zum Beispiel hat <M>{"p(x) = 3 - x + 2x^2"}</M> Grad 2,
        und <M>{"p(1) = 3 - 1 + 2 = 4"}</M>. Polynome begegnen uns gleich
        doppelt: Die Ableitung der Potenzfunktion <M>{"f(x) = x^n"}</M> ist das
        Grundbeispiel der Differentialrechnung (vgl. MML §5.2), und
        Taylor-Polynome <M>{"T_n"}</M> haben genau diese Form &mdash; mit
        Koeffizienten aus Ableitungen und{" "}
        <ConceptLink id="factorial">Fakultäten</ConceptLink> &mdash; um
        komplizierte Funktionen anzunähern. Warum ausgerechnet Polynome? Weil
        sich Polynome allein durch Addieren und Multiplizieren auswerten
        lassen.
      </p>
      <MonomialWidget />
    </>
  ),
});
