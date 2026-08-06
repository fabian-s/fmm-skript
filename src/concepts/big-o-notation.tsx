/** Konzept-Tooltip: O-Notation, Restglied-Sinn (t→0) und Aufwands-Sinn (n→∞). */
import { useState } from "react";
import { M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function RemainderWidget() {
  const [C, setC] = useState(1.0);
  const remainder = (t: number) => Math.abs(Math.exp(t) - (1 + t));
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Das Restglied <M>{"|e^t - (1 + t)|"}</M> (durchgezogen) im Vergleich
        zur Hüllkurve <M>{"C\\,t^2"}</M> (gestrichelt). Nahe <M>{"t = 0"}</M>{" "}
        fängt schon ein moderates <M>{"C"}</M> das Restglied ein; genau
        diese Schranke behauptet <M>{"O(t^2)"}</M>.
      </p>
      <Slider label="C" value={C} onChange={setC} min={0} max={2} step={0.05} />
      <LabeledPlot
        xLabel="t"
        yLabel="Größe"
        tickClass="text-slate-300"
        series={[
          { f: remainder },
          { f: (t) => C * t * t, color: "#dc2626", dash: [5, 4] },
        ]}
        xDomain={[-1, 1]}
        yDomain={[0, 0.8]}
        width={280}
        height={180}
      />
    </div>
  );
}

registerConcept({
  id: "big-o-notation",
  title: "O-Notation (big-O)",
  body: (
    <>
      <p>
        Die Schreibweise <M>{"O(\\cdot)"}</M> (&bdquo;big-O&ldquo;) ist
        absichtliche Ungenauigkeit: sie benennt eine Größe, deren exakten Wert
        wir nicht wissen wollen, und verspricht nur eine Schranke der
        angegebenen Größenordnung. Präzise: ein Term ist <M>{"O(t^2)"}</M> für{" "}
        <M>{"t \\to 0"}</M>, wenn ihn eine Konstante <M>{"C"}</M> für alle
        hinreichend kleinen <M>{"t"}</M> unter <M>{"C\\,t^2"}</M> hält. Die
        Numerik benutzt das in zwei Richtungen:
      </p>
      <MD>{"\\underbrace{x(t) = x(0) + t\\,x'(0) + O(t^2)}_{\\text{kleiner Parameter } t \\to 0} \\qquad \\underbrace{\\text{Aufwand} \\approx \\tfrac{n^3}{3} \\text{ Flops, d.h. } O(n^3)}_{\\text{großer Parameter } n \\to \\infty}"}</MD>
      <p>
        Im ersten Sinn (Restglied) schrumpft ein <M>{"O(t^2)"}</M>-Term{" "}
        <em>schneller</em> als der <M>{"t"}</M>-Term, wenn{" "}
        <M>{"t \\to 0"}</M> geht: halbieren wir <M>{"t"}</M>, viertelt
        er sich. Deshalb können wir ihn durch eine ganze Kette von
        Ungleichungen mitschleppen und am Ende weglassen. Im zweiten Sinn
        (Aufwand) sagt <M>{"O(n^3)"}</M>, dass die Zahl der Rechenoperationen
        für große Matrizen wie <M>{"n^3"}</M> wächst: verdoppeln wir{" "}
        <M>{"n"}</M>, wächst der Aufwand etwa um den Faktor acht, während
        konstante Faktoren und Terme niedrigerer Ordnung wie <M>{"n^2"}</M>{" "}
        unter den Teppich gekehrt werden.
      </p>
      <RemainderWidget />
    </>
  ),
});
