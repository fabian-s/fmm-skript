/** Konzept-Tooltip: Gradientenverfahren, iterative Abstiegsschritte auf einer Zielfunktion. */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

const L = (t: number) => t * t;

function GradientDescentWidget() {
  const [gamma, setGamma] = useState(0.15);
  const [path, setPath] = useState<number[]>([2.4]);
  const theta = path[path.length - 1];
  const step = () => {
    // dL/dθ = 2θ, der Update-Schritt ist also θ ← θ − γ · 2θ.
    setPath((p) => [...p, p[p.length - 1] * (1 - 2 * gamma)].slice(-9));
  };
  const reset = () => setPath([2.4]);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Schrittweite γ" value={gamma} onChange={setGamma} min={0.05} max={1.15} step={0.05} />
      <div className="mb-1 flex items-center gap-2">
        <button
          onClick={step}
          className="rounded bg-sky-600 px-2 py-0.5 text-xs text-white hover:bg-sky-500"
        >
          einen Schritt gehen
        </button>
        <button
          onClick={reset}
          className="rounded bg-slate-500 px-2 py-0.5 text-xs text-white hover:bg-slate-400"
        >
          zurücksetzen
        </button>
        <span className="text-xs">
          <M>{`\\theta = ${theta.toFixed(3)}`}</M>
        </span>
      </div>
      <div className="mb-1 text-xs">
        Kleines <M>{"\\gamma"}</M>: langsam, aber sicher. Bei{" "}
        <M>{"\\gamma = 0.5"}</M>: ein perfekter Sprung. Jenseits von{" "}
        <M>{"\\gamma \\approx 0.5"}</M> schießt das Verfahren über das Ziel
        hinaus und zickzackt; ab <M>{"\\gamma = 1"}</M> explodieren die
        Schritte.
      </div>
      <Plot
        series={[{ f: L }]}
        xDomain={[-3, 3]}
        yDomain={[-0.6, 7]}
        width={280}
        height={180}
        markers={path.map((x, i) => ({
          x,
          y: L(x),
          color: i === path.length - 1 ? "#dc2626" : "#f9a8a4",
          label: i === path.length - 1 ? "θ" : undefined,
        }))}
      />
    </div>
  );
}

registerConcept({
  id: "gradient-descent",
  title: "Gradientenverfahren",
  body: (
    <>
      <p>
        Das <em>Gradientenverfahren</em> (gradient descent) ist das
        Arbeitspferd hinter dem „Trainieren“ eines Modells: Es löst das{" "}
        <ConceptLink id="optimization">Optimierungsproblem</ConceptLink>, eine{" "}
        <ConceptLink id="objective-function">Zielfunktion</ConceptLink>{" "}
        <M>{"L(\\btheta)"}</M> zu minimieren, wenn wir die besten Parameter
        nicht direkt ausrechnen können. Das Rezept: Wir stehen am aktuellen
        Parameter-<ConceptLink id="vector">Vektor</ConceptLink>, berechnen den{" "}
        <ConceptLink id="gradient">Gradienten</ConceptLink> von <M>{"L"}</M>{" "}
        (die Richtung des steilsten <em>Anstiegs</em>) und machen einen kleinen
        Schritt in die Gegenrichtung,
      </p>
      <MD>
        {"\\btheta_{t+1} = \\btheta_t - \\gamma \\, \\big(\\nabla_{\\btheta} L(\\btheta_t)\\big)^\\top,"}
      </MD>
      <p>
        wobei die Schrittweite <M>{"\\gamma > 0"}</M> (die „Lernrate“)
        steuert, wie weit jeder Schritt geht. Kleines Beispiel: Für{" "}
        <M>{"L(\\theta) = \\theta^2"}</M> lautet der Update-Schritt{" "}
        <M>{"\\theta_{t+1} = \\theta_t - \\gamma \\cdot 2\\theta_t"}</M>. Er
        wandert zum Minimum bei <M>{"0"}</M>, solange <M>{"\\gamma"}</M> nicht
        zu groß ist. Genau deshalb steckt Backpropagation (vgl. MML §5.6) so
        viel Aufwand in die Gradienten der Verlustfunktion eines{" "}
        <ConceptLink id="neural-network">neuronalen Netzes</ConceptLink> nach
        seinen Parametern: Jeder Trainingsschritt braucht einen. Eine
        ausführliche Behandlung des Verfahrens findet sich in der Literatur
        (vgl. MML §7.1).
      </p>
      <GradientDescentWidget />
    </>
  ),
});
