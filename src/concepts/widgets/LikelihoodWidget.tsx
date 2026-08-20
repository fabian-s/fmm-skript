/** Einsicht: Die Daten legen die Lage des Likelihood-Maximums fest. Farben: blau Likelihood, rot Schätzung. Provenienz: neu mit Schaetzfrage. VERIFIZIERTE ZAHLEN (node, scratchpad/verify/REV0/LikelihoodWidget.mjs, 2026-08-20): für h = 7, n = 10 ist p̂ = 0,7, L(0,7) = 0,0022235661 und die relative Likelihood dort 1; für jedes h = 0,…,10 maximiert p̂ = h/10 die Binomial-Likelihood. */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Schaetzfrage, Slider, Verdikt, fmtDe } from "../../lib";
export function LikelihoodWidget() {
  const [h, setH] = useState(7);
  const n = 10;
  const pHat = h / n;
  const peak = Math.pow(pHat, h) * Math.pow(1 - pHat, n - h);
  const L = (p: number) => (Math.pow(p, h) * Math.pow(1 - p, n - h)) / peak;
  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>
        Tippen wir zuerst die plausibelste Kopf-Wahrscheinlichkeit und lösen dann auf.
      </Aufgabe>
      <Schaetzfrage
        frage={`Welche Wahrscheinlichkeit passt zu ${h} Köpfen in ${n} Würfen?`}
        loesung={pHat}
        toleranz={0.08}
        min={0}
        max={1}
        schritt={0.05}
      >
        <Plot
          series={[{ f: L, label: "relative Likelihood", color: FMM_COLORS.blau }]}
          xDomain={[0, 1]}
          yDomain={[0, 1.15]}
          xLabel="p"
          yLabel="L(p)"
          readout
          markers={[{ x: pHat, y: 1, color: FMM_COLORS.rot, label: "Maximum" }]}
          ariaLabel="Likelihood der Kopf-Wahrscheinlichkeit"
        />
      </Schaetzfrage>
      <Slider
        label="Köpfe h"
        value={h}
        onChange={setH}
        min={0}
        max={10}
        step={1}
        fmt={(v) => fmtDe(v, 0)}
      />
      <Verdikt kind="ok">
        Nach der Auflösung liegt das Maximum bei p̂ = {fmtDe(pHat, 1)}; dort erklärt dieses Modell
        die beobachteten Daten am besten.
      </Verdikt>
    </div>
  );
}
