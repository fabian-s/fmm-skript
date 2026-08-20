/**
 * DIE EINE EINSICHT: Funktionswerte können sich einer oberen Schranke
 * beliebig nähern, ohne sie anzunehmen; die Schranke ist dann ein Supremum,
 * aber kein Maximum.
 *
 * FARBROLLEN: blau = f(x) und der gewählte Funktionswert; rot = die obere
 * Schranke 1.
 *
 * PROVENIENZ: Eigenbau (2026-08-20).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/HDR2/SupremumWidget.mjs,
 * 2026-08-20): f(4) = 0,800; f(99) = 0,990; f(99,5) = 0,99005 > 0,99.
 * Für jedes x ≥ 0 gilt f(x) < 1, während der Regler bis x = 110 den Wert
 * f(110) = 0,99099 erreicht.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_PANEL, fmtDe } from "../../lib";
export function SupWidget() {
  const [x, setX] = useState(4);
  const y = x / (1 + x);
  const hit = y > 0.99;
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Schieben wir x nach rechts: kommen wir über 0,99, ohne die obere Schranke zu berühren?
      </Aufgabe>
      <Plot
        series={[{ f: (t) => t / (1 + t), color: FMM_COLORS.blau, label: "f(x)" }]}
        xDomain={[0, 110]}
        yDomain={[0, 1.15]}
        xLabel="x"
        yLabel="f(x)"
        readout
        markers={[{ x, y, color: FMM_COLORS.blau, label: "aktuell" }]}
        hlines={[{ at: 1, color: FMM_COLORS.rot, dash: [6, 4], label: "obere Schranke" }]}
      />
      <Slider
        label="x"
        value={x}
        onChange={setX}
        min={0}
        max={110}
        step={0.5}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={hit ? "ok" : "neutral"}>
        {hit ? (
          <>
            f({fmtDe(x, 1)}) = {fmtDe(y, 3)} liegt über 0,99 und bleibt dennoch unter 1.
          </>
        ) : (
          <>
            f({fmtDe(x, 1)}) = {fmtDe(y, 3)}. Wir brauchen ein größeres x für 0,99.
          </>
        )}
      </Verdikt>
    </div>
  );
}
