/**
 * Concept-Tooltip: Mittelwertsatz: irgendwo stimmt die momentane Steigung
 * mit der durchschnittlichen Steigung überein.
 */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function MvtWidget() {
  const [a, setA] = useState(-2);
  const [b, setB] = useState(1.6);
  const f = (x: number) => (x * x * x) / 3 - x;
  // Sekantensteigung für f(x) = x^3/3 - x: m = (a^2 + ab + b^2)/3 - 1
  const m = (a * a + a * b + b * b) / 3 - 1;
  // f'(x) = x^2 - 1 = m  =>  xi = +-sqrt(m + 1); nur die in (a, b) behalten
  const r = Math.sqrt(Math.max(0, m + 1));
  const xis = [r, -r].filter((x, i) => x > a + 1e-9 && x < b - 1e-9 && (i === 0 || r > 1e-9));
  const secant = (x: number) => f(a) + m * (x - a);
  const tangents = xis.map((xi) => ({
    f: (x: number) => f(xi) + m * (x - xi),
    color: "#059669",
    dash: [5, 4],
  }));
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        <M>{"f(x) = x^3/3 - x"}</M>: Die rote Sekante von <M>{"a"}</M> nach <M>{"b"}</M> hat
        Steigung <M>{"m = " + m.toFixed(3)}</M>; die grün gestrichelte(n) Tangente(n) bei{" "}
        <M>{"\\xi = " + xis.map((x) => x.toFixed(3)).join(",\\; ")}</M> haben exakt dieselbe
        Steigung, für jede Wahl der Endpunkte.
      </p>
      <div className="flex flex-wrap gap-x-6">
        <div className="w-40">
          <Slider label="a" value={a} onChange={setA} min={-2.5} max={-0.2} step={0.05} />
        </div>
        <div className="w-40">
          <Slider label="b" value={b} onChange={setB} min={0.3} max={2.5} step={0.05} />
        </div>
      </div>
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[{ f }, { f: secant, color: "#dc2626" }, ...tangents]}
        xDomain={[-2.6, 2.6]}
        yDomain={[-3, 3]}
        width={300}
        height={210}
        markers={[
          { x: a, y: f(a), color: "#dc2626" },
          { x: b, y: f(b), color: "#dc2626" },
          ...xis.map((xi) => ({ x: xi, y: f(xi), color: "#059669", label: "ξ" })),
        ]}
      />
    </div>
  );
}

registerConcept({
  id: "mean-value-theorem",
  title: "Mittelwertsatz",
  body: (
    <>
      <p>
        Ist <M>{"f"}</M> auf <M>{"[a, b]"}</M>{" "}
        <ConceptLink id="continuity">stetig</ConceptLink> und dazwischen{" "}
        <ConceptLink id="differentiability">differenzierbar</ConceptLink>, dann stimmt irgendwo
        in <M>{"(a, b)"}</M> die momentane Steigung mit der durchschnittlichen Steigung über das
        ganze Intervall überein. Das ist der <em>Mittelwertsatz</em> (engl.{" "}
        <em>mean value theorem</em>): Es gibt einen Punkt <M>{"\\xi \\in (a, b)"}</M> mit
      </p>
      <MD>{"f(b) - f(a) = f'(\\xi)\\,(b - a)."}</MD>
      <p>
        Blitzer-Intuition: Wenn eine 100&nbsp;km lange Fahrt genau eine Stunde gedauert hat, dann
        zeigte der Tacho in irgendeinem Moment genau 100&nbsp;km/h; die{" "}
        <ConceptLink id="tangent-line">Tangente</ConceptLink> ist an einem inneren Punkt parallel
        zur Sekante. Der Haken: Der Satz garantiert nur, dass so ein <M>{"\\xi"}</M> existiert,
        er verrät aber nicht, wo es liegt.
      </p>
      <p>
        So nutzt ihn das Konvergenzargument für Fixpunkt-Iterationen:
        Schreiben wir <M>{"g(x_k) - g(x^*) = g'(\\theta_k)(x_k - x^*)"}</M> für ein unbekanntes{" "}
        <M>{"\\theta_k"}</M> zwischen <M>{"x_k"}</M> und <M>{"x^*"}</M>, dann wird ein
        Iterationsschritt zu einer exakten Aussage darüber, wie der Fehler schrumpft, ohne{" "}
        <M>{"\\theta_k"}</M> je zu lokalisieren.
      </p>
      <MvtWidget />
    </>
  ),
});
