/** Einsicht: Der Zwischenwert ist Ausgabe von f und Eingabe von g. Farben: Blau=f, Grün=g. Provenienz: neu; keine Zahlenclaims (2026-08-20, FA). */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt, W_PANEL, W_TEXT } from "../../lib";
export function CompositionPipeline() {
  const [x, setX] = useState(1),
    fx = x + 1,
    gfx = fx * fx,
    plot = (kind: "f" | "g") => {
      const W = 130,
        H = 90,
        X = (v: number) => 8 + ((v + 3) / 6) * 114,
        Y = (v: number) => 82 - ((v - (kind === "f" ? -2 : 0)) / (kind === "f" ? 8 : 16)) * 68,
        pts = Array.from({ length: 40 }, (_, i) => -3 + (i * 6) / 39)
          .map((t) => `${X(t)},${Y(kind === "f" ? t + 1 : t * t)}`)
          .join(" "),
        v = kind === "f" ? x : fx,
        out = kind === "f" ? fx : gfx;
      return (
        <svg viewBox={`0 0 ${W} ${H}`} className="max-w-full h-auto" aria-label={`${kind}-Plot`}>
          <line x1="8" y1="82" x2="122" y2="82" stroke="var(--w-axis)" />
          <polyline
            points={pts}
            fill="none"
            stroke={kind === "f" ? FMM_COLORS.blau : FMM_COLORS.gruen}
            strokeWidth="2"
          />
          <circle cx={X(v)} cy={Y(out)} r="4" fill={FMM_COLORS.orange} />
          <text x="10" y="14" fill="var(--w-text)" fontSize="11">
            {kind === "f" ? "f(t)=t+1" : "g(t)=t²"}
          </text>
        </svg>
      );
    };
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Verändern wir x und verfolgen wir den orange markierten Zwischenwert in beiden Bildern.
      </Aufgabe>
      <div className={`font-mono text-xs ${W_TEXT}`}>
        x = {fmtDe(x, 1)} → f(x) = {fmtDe(fx, 1)} → g(f(x)) = {fmtDe(gfx, 2)}
      </div>
      <div className="mt-1 grid grid-cols-2 gap-2">
        {plot("f")}
        {plot("g")}
      </div>
      <p className={`text-xs ${W_TEXT}`}>Blau: f; Grün: g; Orange: der weitergereichte Wert.</p>
      <Slider label="x" value={x} onChange={setX} min={-3} max={3} step={0.1} />
      <Verdikt kind="neutral">
        f liefert {fmtDe(fx, 1)}; genau dieser Wert ist die Eingabe von g und führt zu{" "}
        {fmtDe(gfx, 2)}.
      </Verdikt>
    </div>
  );
}
