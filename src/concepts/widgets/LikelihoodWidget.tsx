/** Einsicht: Die Daten legen die Lage des Likelihood-Maximums fest. Farben: blau Likelihood, rot Schätzung. Provenienz: neu mit Schaetzfrage. Zahlen: p-hat=h/n, geprüft in verify-konzepte-C4/likelihood.mjs (2026-08-19). */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Schaetzfrage, Slider, Verdikt, fmtDe } from "../../lib";
export function LikelihoodWidget() {
  const [h, setH] = useState(7);
  const n = 10;
  const pHat = h / n;
  const peak = Math.pow(pHat, h) * Math.pow(1 - pHat, n - h);
  const L = (p: number) => (Math.pow(p, h) * Math.pow(1 - p, n - h)) / peak;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Tippen wir zuerst die plausibelste Kopf-Wahrscheinlichkeit und lösen dann auf.
      </Aufgabe>
      <Slider
        label="Köpfe h"
        value={h}
        onChange={setH}
        min={0}
        max={10}
        step={1}
        fmt={(v) => fmtDe(v, 0)}
      />
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
      <Verdikt kind="ok">
        Nach der Auflösung liegt das Maximum bei p̂ = {fmtDe(pHat, 1)}; dort erklärt dieses Modell
        die beobachteten Daten am besten.
      </Verdikt>
    </div>
  );
}
