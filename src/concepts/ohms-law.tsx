/** Konzept-Tooltip: Ohmsches Gesetz, V = iR, mit Mini-Plot zur Linearität. */
import { useState } from "react";
import { M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

function OhmWidget() {
  const [R, setR] = useState(2);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <p className="mb-1 text-sm">
        Spannung gegen Stromstärke an einem Widerstand: immer eine Gerade
        durch den Ursprung, mit Steigung <M>{"R"}</M>.
      </p>
      <Slider label="R (Ohm)" value={R} onChange={setR} min={0.5} max={5} step={0.1} />
      <LabeledPlot
        xLabel="Stromstärke i (A)"
        yLabel="Spannung V (V)"
        tickClass="text-slate-300"
        series={[{ f: (i) => R * i }]}
        xDomain={[0, 2]}
        yDomain={[0, 10.5]}
        width={280}
        height={180}
      />
    </div>
  );
}

registerConcept({
  id: "ohms-law",
  title: "Ohmsches Gesetz",
  body: (
    <>
      <p>
        Das Ohmsche Gesetz beschreibt, wie elektrischer Strom durch einen
        Widerstand fließt (stellen wir uns eine enge Stelle in einem Rohr
        vor, durch die sich der Strom quetschen muss). Schicken wir einen
        Strom <M>{"i"}</M> durch den Widerstand, wächst der Spannungsabfall{" "}
        <M>{"V"}</M> darüber in strenger Proportion:
      </p>
      <MD>{"V = i\\,R,"}</MD>
      <p>
        wobei der Widerstandswert <M>{"R"}</M> die
        Proportionalitätskonstante ist. Schicken wir einen Strom von 3 durch
        einen Widerstand von 2, fällt die Spannung um 6; verdoppeln wir den
        Strom, verdoppelt sich der Abfall auf 12. Genau diese strenge
        Proportionalität macht das Gesetz <em>linear</em>.
      </p>
      <p>
        Das Ohmsche Gesetz ist auch der Motor hinter einem klassischen
        Beispiel für lineare Gleichungssysteme (vgl. Heath Kap. 2, Beispiel
        2.1): Laufen wir einmal um jede Masche eines Stromkreises herum,
        trägt jeder Widerstand einen Spannungsabfall der Form
        (Widerstand)&nbsp;&times;&nbsp;(Strom) bei. Jede Masche liefert also
        eine lineare Gleichung in den unbekannten Strömen &mdash; und der
        Stromkreis als Ganzes ein lineares Gleichungssystem.
      </p>
      <OhmWidget />
    </>
  ),
});
