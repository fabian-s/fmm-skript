/** Konzept-Tooltip: Sinus und Kosinus — Werte, Periodizität, Ableitungen. */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

function SinCosExplorer() {
  const [x, setX] = useState(0);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="x" value={x} onChange={setX} min={-6.3} max={6.3} step={0.05} />
      <Plot
        series={[
          { f: Math.sin, color: "#0284c7", label: "sin" },
          { f: Math.cos, color: "#ea580c", dash: [5, 4], label: "cos" },
        ]}
        markers={[
          { x, y: Math.sin(x), color: "#0284c7", label: `sin=${Math.sin(x).toFixed(2)}` },
          { x, y: Math.cos(x), color: "#ea580c", label: `cos=${Math.cos(x).toFixed(2)}` },
        ]}
        xDomain={[-6.5, 6.5]}
        yDomain={[-1.6, 1.6]}
        width={290}
        height={170}
      />
      <div className="mt-1 text-xs">
        Blau: <M>{"\\sin x"}</M>, orange gestrichelt: <M>{"\\cos x"}</M>. Die
        Steigung der blauen Kurve ist an jeder Stelle gleich dem orangen Wert
        dort: <M>{"(\\sin x)' = \\cos x"}</M>.
      </div>
    </div>
  );
}

registerConcept({
  id: "sine-cosine",
  title: "Sinus und Kosinus",
  body: (
    <>
      <p>
        <M>{"\\sin"}</M> und <M>{"\\cos"}</M> sind die beiden grundlegenden
        schwingenden <ConceptLink id="function">Funktionen</ConceptLink>. Für
        einen Winkel <M>{"x"}</M> (gemessen im Bogenmaß, eine volle Umdrehung
        ist also <M>{"2\\pi \\approx 6{,}28"}</M>) sind <M>{"\\cos x"}</M> und{" "}
        <M>{"\\sin x"}</M> die horizontale und die vertikale Koordinate des
        Punkts, den wir erreichen, wenn wir die Strecke <M>{"x"}</M> auf dem
        Einheitskreis entlanglaufen. Beide pendeln zwischen <M>{"-1"}</M> und{" "}
        <M>{"1"}</M> und wiederholen sich mit Periode <M>{"2\\pi"}</M>.
      </p>
      <p>
        Die Werte, die wir uns hier merken: <M>{"\\sin 0 = 0"}</M> und{" "}
        <M>{"\\cos 0 = 1"}</M>. Beide Funktionen sind{" "}
        <ConceptLink id="smooth-function">glatt</ConceptLink>, und ihre
        Ableitungen rotieren durch einen Viererzyklus:
      </p>
      <MD>{"(\\sin x)' = \\cos x, \\quad (\\cos x)' = -\\sin x, \\quad (-\\sin x)' = -\\cos x, \\quad (-\\cos x)' = \\sin x."}</MD>
      <p>
        Viermal ableiten bringt <M>{"\\cos"}</M> also zurück zu{" "}
        <M>{"\\cos"}</M> — und darum durchlaufen die Ableitungswerte an der
        Stelle <M>{"x_0 = 0"}</M>, die wir für eine Taylorreihe brauchen, den
        Zyklus <M>{"1, 0, -1, 0, 1, \\dots"}</M>
      </p>
      <SinCosExplorer />
    </>
  ),
});
