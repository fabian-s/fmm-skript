/** Konzept-Tooltip: Stetigkeit, keine Sprünge, Grenzwert gleich Funktionswert. */
import { useState } from "react";
import { M, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function JumpWidget() {
  const [c, setC] = useState(1);
  const left = (x: number) => (x < 1 ? 0.5 * x * x : NaN);
  const right = (x: number) => (x >= 1 ? 0.5 * x * x + c : NaN);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Verschieben wir die Sprunghöhe <M>{"c"}</M>. Der Ast für{" "}
        <M>{"x \\ge 1"}</M> ist um <M>{"c"}</M> nach oben verschoben; die
        Funktion ist also genau dann stetig in <M>{"x = 1"}</M>, wenn{" "}
        <M>{"c = 0"}</M> ist und die beiden Punkte verschmelzen.
      </p>
      <Slider label="c" value={c} onChange={setC} min={-1.5} max={1.5} step={0.05} />
      <LabeledPlot
        xLabel="x"
        yLabel="f(x)"
        tickClass="text-slate-300"
        series={[{ f: left }, { f: right }]}
        xDomain={[-2, 2.2]}
        yDomain={[-1.7, 4.2]}
        width={280}
        height={200}
        markers={[
          { x: 1, y: 0.5, color: "#0284c7", label: "linksseitiger Grenzwert" },
          { x: 1, y: 0.5 + c, color: "#dc2626", label: "f(1)" },
        ]}
      />
      <p className="mt-1 font-mono text-xs">
        linksseitiger Grenzwert = 0.500&ensp;f(1) = {(0.5 + c).toFixed(3)}&ensp;
        {Math.abs(c) < 0.026 ? "→ stetig" : "→ Sprung!"}
      </p>
    </div>
  );
}

registerConcept({
  id: "continuity",
  title: "Stetigkeit",
  body: (
    <>
      <p>
        Eine Funktion ist <em>stetig</em> (continuous), wenn ihr Graph keine
        Sprünge oder Löcher hat; salopp: wir können ihn zeichnen, ohne
        den Stift abzusetzen. Präzise: <M>{"f"}</M> ist stetig in einem Punkt{" "}
        <M>{"x = a"}</M>, wenn die Werte <M>{"f(x)"}</M> beliebig nahe an{" "}
        <M>{"f(a)"}</M> herankommen, sobald <M>{"x"}</M> nur nahe genug an{" "}
        <M>{"a"}</M> liegt; kleine Änderungen der Eingabe verursachen dann nur
        kleine Änderungen der Ausgabe. Zum Beispiel ist{" "}
        <M>{"f(x) = x^2"}</M> überall stetig, während eine Treppenfunktion wie
        eine Porto-Preistabelle an bestimmten Stellen springt und dort
        unstetig ist.
      </p>
      <p>
        Warum das hier zählt: eine stetige Funktion trägt unendlich viel
        Information (einen Wert für jeden Punkt eines Intervalls), und doch
        will die Interpolation sie durch endlich viele Zahlen festnageln
        (vgl. Heath §7.1). Stetigkeit ist genau das, was diese Hoffnung
        vernünftig macht: benachbarte Eingaben haben benachbarte Ausgaben,
        also schränkt schon eine Tabelle von Stützwerten die Funktion
        dazwischen ein.
      </p>
      <JumpWidget />
    </>
  ),
});
