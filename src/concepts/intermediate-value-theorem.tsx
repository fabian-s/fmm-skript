/**
 * Konzept-Tooltip: Zwischenwertsatz. Ein Vorzeichenwechsel einer stetigen
 * Funktion erzwingt eine Nullstelle.
 */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function JumpBreaksIvtWidget() {
  const [c, setC] = useState(0);
  // f(x) = x^2/2 - 1 für x < 1, plus ein Sprung der Höhe c für x >= 1
  const left = (x: number) => (x < 1 ? 0.5 * x * x - 1 : NaN);
  const right = (x: number) => (x >= 1 ? 0.5 * x * x - 1 + c : NaN);
  const hasRoot = c <= 0.5 + 1e-12;
  const root = hasRoot ? Math.sqrt(2 * (1 - c)) : NaN;
  const markers = [
    { x: 0, y: -1, color: "#0284c7", label: "f(0) < 0" },
    { x: 2, y: 1 + c, color: "#0284c7", label: "f(2) > 0" },
    ...(hasRoot ? [{ x: root, y: 0, color: "#dc2626", label: "Nullstelle" }] : []),
  ];
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Die Randpunkte schließen die Null immer ein: <M>{"f(0) = -1 < 0"}</M>{" "}
        und <M>{"f(2) = " + (1 + c).toFixed(2) + " > 0"}</M>. Ziehen wir an der
        Sprunghöhe <M>{"c"}</M> bei <M>{"x = 1"}</M> und beobachten, was mit
        der Nullstelle passiert.
      </p>
      <Slider label="Sprung c" value={c} onChange={setC} min={0} max={1.2} step={0.05} />
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[{ f: left }, { f: right }]}
        xDomain={[-0.2, 2.2]}
        yDomain={[-1.6, 2.6]}
        width={280}
        height={200}
        markers={markers}
      />
      <p className="mt-1 font-mono text-xs">
        {hasRoot
          ? `stetig genug: Nullstelle bei x = ${root.toFixed(3)}`
          : "c > 0.5: der Graph SPRINGT über die Null: Vorzeichenwechsel, aber keine Nullstelle!"}
      </p>
    </div>
  );
}

registerConcept({
  id: "intermediate-value-theorem",
  title: "Zwischenwertsatz",
  body: (
    <>
      <p>
        Eine <ConceptLink id="continuity">stetige</ConceptLink> Funktion kann
        keine Werte überspringen: Ist <M>{"f"}</M> stetig auf{" "}
        <M>{"[a, b]"}</M>, dann nimmt sie auf dem Weg von <M>{"f(a)"}</M> nach{" "}
        <M>{"f(b)"}</M> <em>jeden</em> Wert dazwischen an. Das ist der{" "}
        <em>Zwischenwertsatz</em> (intermediate value theorem). Der Fall, den
        die Nullstellensuche ständig benutzt, ist der Wert <M>{"0"}</M>: Wenn{" "}
        <M>{"f(a)"}</M> und <M>{"f(b)"}</M> entgegengesetzte Vorzeichen haben,
      </p>
      <MD>{"f(a)\\,f(b) < 0 \\;\\implies\\; f(x^*) = 0 \\text{ für ein } x^* \\in (a, b)."}</MD>
      <p>
        Kleines Beispiel: <M>{"f(x) = x^2 - 2"}</M> hat{" "}
        <M>{"f(1) = -1 < 0"}</M> und <M>{"f(2) = 2 > 0"}</M>, also muss
        zwischen 1 und 2 eine Nullstelle liegen, nämlich{" "}
        <M>{"\\sqrt{2} \\approx 1.414"}</M>. Deshalb macht ein
        Vorzeichenwechsel das Intervall <M>{"[a, b]"}</M> zu einem
        Einschlussintervall (bracket), das garantiert eine Lösung enthält, und
        das ist das gesamte Korrektheitsargument hinter der Bisektion.
      </p>
      <p>
        Die Stetigkeit ist dabei wesentlich, keine Dekoration: Eine Funktion
        mit Sprung kann das Vorzeichen wechseln, ohne je null zu sein;
        probieren wir es unten aus.
      </p>
      <JumpBreaksIvtWidget />
    </>
  ),
});
