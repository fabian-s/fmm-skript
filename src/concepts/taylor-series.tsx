/** Konzept-Tooltip: Taylor-Reihe — lokale Polynom-Näherung um einen Punkt. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

/** Taylor-Polynom von sin um 0, abgeschnitten bei Grad n (n ungerade). */
function sinTaylor(x: number, n: number): number {
  let term = x; // x^1 / 1!
  let sum = x;
  for (let k = 1; 2 * k + 1 <= n; k++) {
    term *= (-x * x) / (2 * k * (2 * k + 1));
    sum += term;
  }
  return sum;
}

function TaylorWidget() {
  const [n, setN] = useState(3);
  const errPi = Math.abs(Math.sin(Math.PI) - sinTaylor(Math.PI, n));
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        <span className="text-sky-400">sin(x)</span> und sein{" "}
        <span className="text-red-400">Taylor-Polynom vom Grad n</span> um{" "}
        <M>{"a = 0"}</M>. Nahe 0 passt es hervorragend; weiter draußen
        schießt das Polynom irgendwann aus dem Bild &mdash; ein größeres{" "}
        <M>{"n"}</M> verbreitert den Bereich guter Übereinstimmung.
      </p>
      <Slider label="Grad n" value={n} onChange={setN} min={1} max={13} step={2} />
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[
          { f: (x) => Math.sin(x), color: "#0284c7" },
          { f: (x) => sinTaylor(x, n), color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-7, 7]}
        yDomain={[-3, 3]}
        width={280}
        height={200}
      />
      <p className="mt-1 font-mono text-xs">
        Fehler bei x = π: {errPi.toExponential(2)}
      </p>
    </div>
  );
}

registerConcept({
  id: "taylor-series",
  title: "Taylor-Reihe",
  body: (
    <>
      <p>
        Eine Taylor-Reihe (Taylor series) nähert eine glatte Funktion in der
        Nähe eines einzelnen Punktes <M>{"a"}</M> durch ein Polynom an, das
        ausschließlich aus dem Verhalten der Funktion <em>an</em> diesem
        Punkt gebaut ist: ihrem Wert, ihrer Steigung, ihrer Krümmung und so
        weiter. Die abgeschnittene Reihe vom Grad <M>{"n"}</M> ist das
        eindeutige Polynom, dessen Wert und erste <M>{"n"}</M>{" "}
        <ConceptLink id="derivative">Ableitungen</ConceptLink> an der Stelle{" "}
        <M>{"a"}</M> alle mit denen von <M>{"f"}</M> übereinstimmen:
      </p>
      <MD>
        {"f(x) \\approx f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\cdots + \\frac{f^{(n)}(a)}{n!}(x-a)^n."}
      </MD>
      <p>
        Schneiden wir schon nach dem linearen Term ab, erhalten wir die{" "}
        <ConceptLink id="tangent-line">Tangente</ConceptLink>; jeder weitere
        Term (der mehr{" "}
        <ConceptLink id="differentiability">Glattheit</ConceptLink> von{" "}
        <M>{"f"}</M> verlangt) biegt das Polynom so zurecht, dass es sich
        über einen breiteren Bereich an die Kurve schmiegt. Kleines Beispiel:
        Für <M>{"f(x) = \\sin(x)"}</M> um <M>{"a = 0"}</M> lautet das
        Polynom vom Grad 3 <M>{"x - x^3/6"}</M>; an der Stelle{" "}
        <M>{"x = 0.5"}</M> liefert es <M>{"0.47917"}</M> gegenüber dem wahren
        Wert <M>{"\\sin(0.5) = 0.47943"}</M>. Weil alle Information aus einem
        einzigen Punkt stammt, können wir die abgeschnittene Taylor-Reihe als
        Extremfall der Interpolation auffassen &mdash; als ihren
        Ein-Punkt-Grenzfall (vgl. Heath §7.3.5).
      </p>
      <TaylorWidget />
    </>
  ),
});
