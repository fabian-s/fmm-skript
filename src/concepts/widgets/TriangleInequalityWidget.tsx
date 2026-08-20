import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, Verdikt, fmtDe } from "../../lib";

/** EINSICHT: Die Länge a+b liegt zwischen Differenz- und Summenschranke. FARBEN: blau a, orange b, grün Summe. PROVENIENZ: neu. VERIFIZIERT: verify/FB/verify-numbers.mjs, 2026-08-20 (Kosinussatz und Schranken). */
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
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Verändern wir den Winkel und verfolgen die grüne Luftlinie zwischen beiden Schranken.</Aufgabe><Slider
        label="Winkel ω zwischen a und b"
        value={omega}
        onChange={setOmega}
        min={0}
        max={Math.PI}
        step={0.02}
        fmt={(t) => `${((t * 180) / Math.PI).toFixed(0)}°`}
      />
      <svg viewBox={`0 0 ${w} ${h}`} className="max-w-full h-auto rounded" role="img" aria-label="Dreieck und Schranken der Dreiecksungleichung">
        {/* Vergleichsbalken: Sandwich |‖a‖−‖b‖| ≤ ‖a+b‖ ≤ ‖a‖+‖b‖ */}
        <text x={8} y={20} fill="#e2e8f0" fontSize={11}>
          |‖a‖−‖b‖| = {fmtDe(lower)}
        </text>
        <rect x={barX} y={12} width={(barW * lower) / upper} height={9} fill="#94a3b8" />
        <text x={8} y={38} fill="#009E73" fontSize={11}>
          ‖a+b‖ = {fmtDe(nsum)}
        </text>
        <rect x={barX} y={30} width={(barW * nsum) / upper} height={9} fill="#009E73" />
        <text x={8} y={56} fill="#e2e8f0" fontSize={11}>
          ‖a‖+‖b‖ = {fmtDe(upper)}
        </text>
        <rect x={barX} y={48} width={barW} height={9} fill="#94a3b8" />
        {/* Dreieck: a vom Ursprung, b ab der Spitze von a, a+b als Luftlinie */}
        <line x1={ox} y1={oy} x2={ax} y2={oy} stroke={FMM_COLORS.blau} strokeWidth={2.5} />
        <line x1={ax} y1={oy} x2={px} y2={py} stroke={FMM_COLORS.rot} strokeWidth={2.5} />
        <line x1={ox} y1={oy} x2={px} y2={py} stroke={FMM_COLORS.gruen} strokeWidth={2.5} />
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
      <Verdikt>Für diesen Winkel gilt {fmtDe(lower)} ≤ {fmtDe(nsum)} ≤ {fmtDe(upper)}. Die grüne Strecke bleibt damit zwischen beiden Schranken.</Verdikt>
    </div>
  );
}
