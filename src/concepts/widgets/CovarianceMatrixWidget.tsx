/** Einsicht: ρ dreht und streckt die Kovarianzellipse. Farben: Blau = Punkte, Orange = Ellipse/Achsen. Provenienz: Box--Muller neu. Verifikation: Determinismus über lib-mulberry32, keine Zahlenclaims (2026-08-20, FA). */
import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  mulberry32,
  randn,
  Slider,
  Verdikt,
  W_PANEL,
  W_TEXT,
} from "../../lib";
const Z = (() => {
  const r = mulberry32(42);
  return Array.from({ length: 180 }, () => [randn(r), randn(r)] as [number, number]);
})();
export function CovScatterWidget() {
  const [rho, setRho] = useState(0.8),
    w = 280,
    h = 200,
    s = 32,
    pts = useMemo(
      () =>
        Z.map(([z1, z2]) => [
          w / 2 + s * z1,
          h / 2 - s * (rho * z1 + Math.sqrt(1 - rho * rho) * z2),
        ]),
      [rho],
    );
  const angle = 45 * (rho < 0 ? -1 : 1),
    major = s * Math.sqrt(1 + Math.abs(rho)) * 2,
    minor = s * Math.sqrt(1 - Math.abs(rho)) * 2;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Verschieben wir ρ und verfolgen wir die Hauptachsen der Wolke.</Aufgabe>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="max-w-full h-auto"
        role="img"
        aria-label="Punktwolke mit Kovarianzellipse und Hauptachsen."
      >
        <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="var(--w-axis)" />
        <line x1={w / 2} y1="0" x2={w / 2} y2={h} stroke="var(--w-axis)" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill={FMM_COLORS.blau} opacity=".55" />
        ))}
        <g transform={`rotate(${-angle} ${w / 2} ${h / 2})`}>
          <ellipse
            cx={w / 2}
            cy={h / 2}
            rx={major}
            ry={minor}
            fill="none"
            stroke={FMM_COLORS.orange}
            strokeWidth="2"
          />
          <line
            x1={w / 2 - major}
            y1={h / 2}
            x2={w / 2 + major}
            y2={h / 2}
            stroke={FMM_COLORS.orange}
          />
          <line
            x1={w / 2}
            y1={h / 2 - minor}
            x2={w / 2}
            y2={h / 2 + minor}
            stroke={FMM_COLORS.orange}
          />
        </g>
      </svg>
      <p className={`text-xs ${W_TEXT}`}>
        Blau: feste Standardnormalstichprobe; Orange: Kovarianzellipse und Hauptachsen.
      </p>
      <Slider
        label="Korrelation ρ"
        value={rho}
        onChange={setRho}
        min={-0.95}
        max={0.95}
        step={0.05}
      />
      <Verdikt kind={Math.abs(rho) > 0.8 ? "warn" : "neutral"}>
        {Math.abs(rho) > 0.8
          ? "Die kurze Nebenachse zeigt: Die beiden Koordinaten bewegen sich fast nur noch gemeinsam entlang einer Richtung."
          : "Die Ellipse macht Richtung und Stärke der gemeinsamen Bewegung sichtbar."}
      </Verdikt>
    </div>
  );
}
