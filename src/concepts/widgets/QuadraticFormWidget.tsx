/**
 * DIE EINE EINSICHT: Eine Richtung u auf dem Einheitskreis bestimmt die
 * Krümmung q(tu) = q(u)t² der quadratischen Form in genau dieser Richtung.
 *
 * FARBROLLEN: blau = gewählte Richtung u und ihre Parabel; grau =
 * Einheitskreis als Menge aller Richtungen.
 *
 * PROVENIENZ: Eigenbau (2026-08-20).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/HDR2/QuadraticFormWidget.mjs,
 * 2026-08-20): Für B = ((2, 1), (0, 1)) ist q(u) = 2c² + cs + s². Die
 * Krümmungen auf dem Einheitskreis liegen zwischen (3 − √2)/2 = 0,7929 und
 * (3 + √2)/2 = 2,2071; bei φ = 0,50 ist q(u) = 2,1909.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_PANEL, fmtDe } from "../../lib";
const q = (p: number) => 2 * Math.cos(p) ** 2 + Math.cos(p) * Math.sin(p) + Math.sin(p) ** 2;
export function QuadFormWidget() {
  const [phi, setPhi] = useState(0.5);
  const z = q(phi),
    u: [number, number] = [Math.cos(phi), Math.sin(phi)];
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Drehen wir die Richtung auf dem Einheitskreis und vergleichen wir die zugehörige Parabel.
      </Aufgabe>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <Plot
          series={[
            {
              f: (x) => Math.sqrt(Math.max(0, 1 - x * x)),
              color: FMM_COLORS.grau,
              label: "Einheitskreis",
            },
            { f: (x) => -Math.sqrt(Math.max(0, 1 - x * x)), color: FMM_COLORS.grau },
          ]}
          xDomain={[-1.2, 1.2]}
          yDomain={[-1.2, 1.2]}
          xLabel="x₁"
          yLabel="x₂"
          markers={[{ x: u[0], y: u[1], color: FMM_COLORS.blau, label: "u(φ)" }]}
          polylines={[{ pts: [[0, 0], u], color: FMM_COLORS.blau, label: "Richtung" }]}
        />
        <Plot
          series={[{ f: (t) => z * t * t, color: FMM_COLORS.blau, label: "q(tu)" }]}
          xDomain={[-1.5, 1.5]}
          yDomain={[-0.5, 5]}
          xLabel="t"
          yLabel="q(tu)"
          readout
        />
      </div>
      <Slider
        label="Richtung φ"
        value={phi}
        onChange={setPhi}
        min={0}
        max={Math.PI}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={z < 1.1 ? "warn" : z > 2 ? "ok" : "neutral"}>
        {z < 1.1 ? (
          <>Diese Richtung ist flach: q(tu) = {fmtDe(z, 2)} t². Schon kleine Änderungen von t kosten hier wenig.</>
        ) : z > 2 ? (
          <>Diese Richtung ist steil: q(tu) = {fmtDe(z, 2)} t². Dieselbe Änderung von t lässt die Form hier stärker wachsen.</>
        ) : (
          <>In dieser Zwischenrichtung ist q(tu) = {fmtDe(z, 2)} t². Dabei zählt nur der symmetrische Teil von B.</>
        )}
      </Verdikt>
    </div>
  );
}
