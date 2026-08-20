/** Insight: a probability moves the expected payoff across zero. Colors: blue payoff, red break-even. Provenance: original. Numbers 1/6 and E=12p−2 verified algebraically in verify-konzepte-C4b/expected-value.mjs, 2026-08-19. */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, M, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function BetWidget() {
  const [p, setP] = useState(0.4);
  const ev = 12 * p - 2;
  const lohnt = ev >= 0;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Verschieben wir die Gewinnwahrscheinlichkeit bis die Wette gerade nicht mehr verliert.
      </Aufgabe>
      <Slider
        label="Gewinnwahrsch. p"
        value={p}
        onChange={setP}
        min={0}
        max={1}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Plot
        series={[{ f: (q) => 12 * q - 2, color: FMM_COLORS.blau, label: "E[X]" }]}
        xDomain={[0, 1]}
        yDomain={[-3, 11]}
        xLabel="p"
        yLabel="E[X]"
        readout
        markers={[{ x: p, y: ev, color: FMM_COLORS.blau, label: "aktuell" }]}
        hlines={[{ at: 0, color: FMM_COLORS.rot, dash: [5, 4], label: "Gewinnschwelle" }]}
        ariaLabel="Erwartungswert einer Wette"
      />
      <Verdikt kind={lohnt ? "ok" : "warn"}>
        {lohnt ? (
          <>
            Bei p = {fmtDe(p, 2)} ist E[X] = {fmtDe(ev, 2)} € nichtnegativ; die Wette lohnt sich.
          </>
        ) : (
          <>
            Bei p = {fmtDe(p, 2)} ist E[X] = {fmtDe(ev, 2)} € negativ. Noch gleicht der Gewinn den
            Verlust nicht aus.
          </>
        )}
      </Verdikt>
    </div>
  );
}
