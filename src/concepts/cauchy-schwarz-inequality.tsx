/** Konzept-Tooltip: Cauchy-Schwarz-Ungleichung. */
import { useState } from "react";
import { M, MD, ConceptLink, registerConcept, Slider } from "../lib";

function AngleWidget() {
  const [phi, setPhi] = useState(0.5);
  const nx = 2.2; // |x|
  const ny = 1.6; // |y|
  const alpha = 0.35; // Richtung von x
  const w = 280;
  const h = 190;
  const cx = w / 2;
  const cy = h / 2 + 20;
  const s = 42;
  const px: [number, number] = [cx + s * nx * Math.cos(alpha), cy - s * nx * Math.sin(alpha)];
  const py: [number, number] = [
    cx + s * ny * Math.cos(alpha + phi),
    cy - s * ny * Math.sin(alpha + phi),
  ];
  const dot = nx * ny * Math.cos(phi);
  const bound = nx * ny;
  const barW = 150;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Winkel ω"
        value={phi}
        onChange={setPhi}
        min={0}
        max={Math.PI}
        step={0.02}
        fmt={(t) => `${((t * 180) / Math.PI).toFixed(0)}°`}
      />
      <svg width={w} height={h} className="rounded bg-slate-900/60">
        <line x1={cx} y1={cy} x2={px[0]} y2={px[1]} stroke="#38bdf8" strokeWidth={2.5} />
        <line x1={cx} y1={cy} x2={py[0]} y2={py[1]} stroke="#f472b6" strokeWidth={2.5} />
        <text x={px[0] + 4} y={px[1]} fill="#38bdf8" fontSize={13}>
          x
        </text>
        <text x={py[0] + 4} y={py[1]} fill="#f472b6" fontSize={13}>
          y
        </text>
        {/* Vergleichsbalken */}
        <text x={10} y={20} fill="#e2e8f0" fontSize={11}>
          |x·y| = {Math.abs(dot).toFixed(2)}
        </text>
        <rect
          x={100}
          y={12}
          width={(barW * Math.abs(dot)) / bound}
          height={9}
          fill="#38bdf8"
        />
        <text x={10} y={38} fill="#e2e8f0" fontSize={11}>
          ‖x‖·‖y‖ = {bound.toFixed(2)}
        </text>
        <rect x={100} y={30} width={barW} height={9} fill="#94a3b8" />
      </svg>
      <p className="mt-1 text-xs opacity-80">
        Der blaue Balken <M>{"|\\bx^\\top\\by|"}</M> wächst nie über den grauen
        Balken <M>{"\\lVert\\bx\\rVert \\, \\lVert\\by\\rVert"}</M> hinaus;
        gleich groß sind sie genau bei Winkel <M>{"0^\\circ"}</M> oder{" "}
        <M>{"180^\\circ"}</M>, also wenn die Vektoren parallel sind.
      </p>
    </div>
  );
}

registerConcept({
  id: "cauchy-schwarz-inequality",
  title: "Cauchy-Schwarz-Ungleichung",
  body: (
    <>
      <p>
        Für zwei beliebige <ConceptLink id="vector">Vektoren</ConceptLink> kann
        das <ConceptLink id="dot-product">Skalarprodukt</ConceptLink> das
        Produkt der Längen nie übertreffen:
      </p>
      <MD>
        {"\\left| \\bx^\\top \\by \\right| \\;\\leq\\; \\lVert \\bx \\rVert \\, \\lVert \\by \\rVert,"}
      </MD>
      <p>
        mit Gleichheit genau dann, wenn ein Vektor ein Vielfaches des anderen
        ist (vgl. MML Gl. (3.17)). In der Ebene ist das schlicht
        Trigonometrie: wegen{" "}
        <M>{"\\bx^\\top\\by = \\lVert\\bx\\rVert\\,\\lVert\\by\\rVert \\cos\\omega"}</M>{" "}
        für den Winkel <M>{"\\omega"}</M> zwischen den Vektoren und{" "}
        <M>{"|\\cos\\omega| \\leq 1"}</M> ist die Schranke automatisch erfüllt.
        Kurzer Check mit <M>{"\\bx = (1, 2)^\\top"}</M>,{" "}
        <M>{"\\by = (3, 4)^\\top"}</M>:{" "}
        <M>{"|\\bx^\\top\\by| = 11 \\leq \\sqrt{5} \\cdot 5 \\approx 11.18"}</M>,{" "}
        fast scharf, weil die beiden Vektoren in fast dieselbe Richtung
        zeigen. Dieselbe Ungleichung gilt für <em>jedes</em> Skalarprodukt und
        die davon induzierte <ConceptLink id="norm">Norm</ConceptLink>, etwa
        für Matrizen mit dem Spur-Skalarprodukt{" "}
        <M>{"\\langle \\bA, \\bB \\rangle = \\operatorname{tr}(\\bA^\\top\\bB)"}</M>.{" "}
        Das ist die Version, die im Beweis von Eckart–Young benutzt wird
        (vgl. MML Ungl. (4.99)).
      </p>
      <AngleWidget />
    </>
  ),
});
