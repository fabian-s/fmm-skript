/** Konzept-Tooltip: Supremum (und Infimum): kleinste obere Schranke, wird evtl. nie angenommen. */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

/** f(x) = x/(1+x) klettert für immer Richtung 1, ohne sie zu erreichen: sup = 1, kein Maximum. */
function SupWidget() {
  const [x, setX] = useState(4);
  const fx = x / (1 + x);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x" value={x} onChange={setX} min={0} max={40} step={0.5} />
      <div className="mb-1 text-xs">
        <M>{"f(x) = \\tfrac{x}{1+x}"}</M> an der Stelle{" "}
        <M>{`x = ${x.toFixed(1)}`}</M> liefert{" "}
        <M>{`f(x) = ${fx.toFixed(3)}`}</M>. Schieben wir <M>{"x"}</M>{" "}
        beliebig weit nach rechts: Der Wert kriecht auf die gestrichelte Linie{" "}
        <M>{"y = 1"}</M> zu, berührt sie aber nie. Also ist{" "}
        <M>{"\\sup_x f(x) = 1"}</M>, während <M>{"\\max_x f(x)"}</M> nicht
        existiert.
      </div>
      <Plot
        series={[
          { f: (t) => t / (1 + t) },
          { f: () => 1, color: "#dc2626", dash: [6, 4] },
        ]}
        xDomain={[0, 50]}
        yDomain={[0, 1.15]}
        width={280}
        height={160}
        markers={[{ x, y: fx, label: `f(${x.toFixed(0)})` }]}
      />
    </div>
  );
}

registerConcept({
  id: "supremum",
  title: "Supremum & Infimum",
  body: (
    <>
      <p>
        Das Supremum einer Menge von Zahlen ist ihre <em>kleinste obere
        Schranke</em> (least upper bound): die kleinste Zahl, die immer noch{" "}
        <M>{"\\geq"}</M> jedem Element der Menge ist. Hat die Menge ein
        größtes Element, dann <em>ist</em> das Supremum einfach dieses
        Maximum. Der Witz des neuen Begriffs ist, dass ein Supremum
        auch dann existieren kann, wenn ein Maximum fehlt. Die{" "}
        <ConceptLink id="sequence">Folge</ConceptLink> der Werte{" "}
        <M>{"1 - \\tfrac{1}{n}"}</M>, also{" "}
        <M>{"0, \\tfrac{1}{2}, \\tfrac{2}{3}, \\tfrac{3}{4}, \\dots"}</M>, hat
        kein größtes Element (jedes wird vom nächsten übertroffen), aber{" "}
        <M>{"1"}</M> beschränkt sie alle und nichts Kleineres tut das:
      </p>
      <MD>{"\\sup_{n \\in \\N} \\left( 1 - \\tfrac{1}{n} \\right) = 1, \\qquad \\text{aber } \\max_n \\left( 1 - \\tfrac{1}{n} \\right) \\text{ existiert nicht.}"}</MD>
      <p>
        Für eine <ConceptLink id="function">Funktion</ConceptLink> meint{" "}
        <M>{"\\sup_x f(x)"}</M> das Supremum aller Werte <M>{"f(x)"}</M>,{" "}
        die Höhe, der sich der Graph nähert, selbst wenn kein
        einzelnes <M>{"x"}</M> sie je annimmt (dafür brauchen wir keinen{" "}
        <ConceptLink id="limit">Grenzwert</ConceptLink>-Apparat, nur
        Schranken). Das Spiegelbild ist das <em>Infimum</em>, die größte
        untere Schranke, mit{" "}
        <M>{"\\inf_x f(x) = -\\sup_x \\left( -f(x) \\right)"}</M>. Genau diese
        Robustheit ist der Grund, warum etwa die Definition der konvexen
        Konjugierten (vgl. MML §7.3.3) ein Supremum verwendet: Für eine
        geknickte Funktion wie <M>{"f(x) = |x|"}</M> gibt es keine
        Ableitungsbedingung, um eine Maximalstelle zu finden, und für manche
        Steigungen existiert gar keine Maximalstelle; das Supremum ist
        trotzdem in jedem Fall eine wohldefinierte Zahl (oder{" "}
        <M>{"+\\infty"}</M>).
      </p>
      <SupWidget />
    </>
  ),
});
