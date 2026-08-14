import { useState } from "react";
import { M, Slider } from "../../lib";

export function TriangleWidget() {
  const [omega, setOmega] = useState(0.9);
  const na = 2.0; // ‖a‖
  const nb = 1.3; // ‖b‖
  const nsum = Math.sqrt(na * na + nb * nb + 2 * na * nb * Math.cos(omega));
  const lower = Math.abs(na - nb);
  const upper = na + nb;
  const w = 300;
  const h = 215;
  const s = 55;
  const ox = 35;
  const oy = h - 25;
  const ax = ox + s * na;
  const px = ox + s * (na + nb * Math.cos(omega));
  const py = oy - s * nb * Math.sin(omega);
  const barW = 140;
  const barX = 120;
  const fmt = (v: number) => v.toFixed(2).replace(".", ",");
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider
        label="Winkel ω zwischen a und b"
        value={omega}
        onChange={setOmega}
        min={0}
        max={Math.PI}
        step={0.02}
        fmt={(t) => `${((t * 180) / Math.PI).toFixed(0)}°`}
      />
      <svg width={w} height={h} className="rounded bg-slate-900/60">
        {/* Vergleichsbalken: Sandwich |‖a‖−‖b‖| ≤ ‖a+b‖ ≤ ‖a‖+‖b‖ */}
        <text x={8} y={20} fill="#e2e8f0" fontSize={11}>
          |‖a‖−‖b‖| = {fmt(lower)}
        </text>
        <rect x={barX} y={12} width={(barW * lower) / upper} height={9} fill="#94a3b8" />
        <text x={8} y={38} fill="#009E73" fontSize={11}>
          ‖a+b‖ = {fmt(nsum)}
        </text>
        <rect x={barX} y={30} width={(barW * nsum) / upper} height={9} fill="#009E73" />
        <text x={8} y={56} fill="#e2e8f0" fontSize={11}>
          ‖a‖+‖b‖ = {fmt(upper)}
        </text>
        <rect x={barX} y={48} width={barW} height={9} fill="#94a3b8" />
        {/* Dreieck: a vom Ursprung, b ab der Spitze von a, a+b als Luftlinie */}
        <line x1={ox} y1={oy} x2={ax} y2={oy} stroke="#0072B2" strokeWidth={2.5} />
        <line x1={ax} y1={oy} x2={px} y2={py} stroke="#D55E00" strokeWidth={2.5} />
        <line x1={ox} y1={oy} x2={px} y2={py} stroke="#009E73" strokeWidth={2.5} />
        <text x={ox + (s * na) / 2 - 4} y={oy + 14} fill="#0072B2" fontSize={13}>
          a
        </text>
        <text x={(ax + px) / 2 + 7} y={(oy + py) / 2 + 4} fill="#D55E00" fontSize={13}>
          b
        </text>
        <text x={(ox + px) / 2 - 20} y={(oy + py) / 2 - 4} fill="#009E73" fontSize={13}>
          a+b
        </text>
      </svg>
      <p className="mt-1 text-xs opacity-80">
        Schieben wir den Winkel <M>{"\\omega"}</M>: die grüne Luftlinie{" "}
        <M>{"\\lVert \\ba + \\bb \\rVert"}</M> pendelt zwischen den beiden grauen
        Schranken. Die obere erreicht sie nur bei <M>{"\\omega = 0^\\circ"}</M>{" "}
        (gleiche Richtung, Dreieck fällt zur Strecke zusammen), die untere nur
        bei <M>{"\\omega = 180^\\circ"}</M> (Gegenrichtung). Das ist die
        umgekehrte Dreiecksungleichung, angewandt auf <M>{"\\ba"}</M> und{" "}
        <M>{"-\\bb"}</M>.
      </p>
    </div>
  );
}
