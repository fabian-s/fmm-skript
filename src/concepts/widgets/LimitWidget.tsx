/** Einsicht: Der Differenzenquotient strebt gegen 2, obwohl sein Wert bei h = 0 undefiniert ist. Farben: blau Quotient, grün Grenzwert. Provenienz: original. VERIFIZIERTE ZAHLEN (node, scratchpad/verify/REV0/LimitWidget.mjs, 2026-08-20): g(h) = ((1+h)²−1)/h = 2+h für h ≠ 0; g(0,01) = 2,01 und g(−0,01) = 1,99. */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function LimitWidget() {
  const [h, setH] = useState(1.2);
  const g = (t: number) => (Math.abs(t) < 1e-9 ? NaN : ((1 + t) ** 2 - 1) / t);
  const near = Math.abs(h) < 0.1;
  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>
        Schieben wir h von beiden Seiten gegen null und beobachten wir den Differenzenquotienten.
      </Aufgabe>
      <Plot
        series={[{ f: g, color: FMM_COLORS.blau, label: "g(h)" }]}
        xDomain={[-1.6, 1.6]}
        yDomain={[0, 4]}
        xLabel="h"
        yLabel="g(h)"
        readout
        markers={[
          { x: h, y: g(h), color: FMM_COLORS.blau, label: "aktuell" },
          { x: 0, y: 2, color: FMM_COLORS.gruen, label: "offener Punkt" },
        ]}
        hlines={[{ at: 2, color: FMM_COLORS.gruen, dash: [4, 3], label: "Grenzwert" }]}
      />
      <Slider
        label="h"
        value={h}
        onChange={setH}
        min={-1.5}
        max={1.5}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={near ? "ok" : "neutral"}>
        {near ? (
          "Nahe bei null liegt g(h) nahe bei 2, obwohl bei h = 0 ein offener Punkt bleibt."
        ) : (
          <>
            g({fmtDe(h, 2)}) = {fmtDe(g(h), 2)}; verkleinern wir |h| weiter.
          </>
        )}
      </Verdikt>
    </div>
  );
}
