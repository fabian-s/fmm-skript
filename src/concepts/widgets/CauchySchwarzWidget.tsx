/** Widget zum Konzept-Tooltip „Cauchy-Schwarz-Ungleichung": Winkel und Balkenvergleich. */
import { useState } from "react";
import { M, Slider } from "../../lib";

export function AngleWidget() {
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
