/**
 * DIE EINE EINSICHT: Die Wahrscheinlichkeit verschiebt den Erwartungswert über die Gewinnschwelle.
 * FARBROLLEN: blau = Erwartungswert; rot = Gewinnschwelle. PROVENIENZ: Originalwidget.
 *
 * DIE WETTE (im Konzepttext vor dem Widget eingeführt): Einsatz 2 €, Auszahlung
 * 12 € bei Gewinn. Der Gewinn X ist also +10 € mit Wahrscheinlichkeit p und
 * −2 € mit Wahrscheinlichkeit 1 − p.
 *
 * VERIFIZIERTE ZAHLEN: E[X] = 10p − 2(1 − p) = 10p − 2 + 2p = 12p − 2; die
 * Nullstelle 12p − 2 = 0 liegt bei p = 1/6 ≈ 0,1667. Probe p = 0,10:
 * 10·0,10 − 2·0,90 = 1 − 1,8 = −0,8. Probe p = 0,50: 5 − 1 = 4 = 12·0,5 − 2.
 * (node, scripts/verify/QA-L0/verify-qa-l0.mjs, 2026-08-20)
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function BetWidget() {
  // Voreinstellung p = 0,10 (unter der Schwelle 1/6): die Aufgabe „verschieben,
  // bis die Wette gerade nicht mehr verliert" wäre bei p = 0,4 (E[X] = 2,80)
  // schon gelöst gewesen (visuelle Abnahme 2026-08-20).
  const [p, setP] = useState(0.1);
  const ev = 12 * p - 2;
  const lohnt = ev >= 0;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Verschieben wir die Gewinnwahrscheinlichkeit p, bis die Wette gerade nicht mehr verliert.
      </Aufgabe>
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
      <Slider
        label="Gewinnwahrsch. p"
        value={p}
        onChange={setP}
        min={0}
        max={1}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        Ausgänge der Wette: +10 € mit Wahrscheinlichkeit p, −2 € mit Wahrscheinlichkeit 1 − p.
      </p>
      <Verdikt kind={lohnt ? "ok" : "warn"}>
        Bei p = {fmtDe(p, 2)} ist E[X] = 10 · {fmtDe(p, 2)} − 2 · {fmtDe(1 - p, 2)} ={" "}
        {fmtDe(ev, 2)} €.{" "}
        {lohnt
          ? "Der seltene Gewinn von 10 € wiegt den häufigen Verlust von 2 € auf: Auf lange Sicht legt diese Wette im Mittel zu."
          : "Der Verlust von 2 € tritt so viel häufiger ein, dass ihn der Gewinn von 10 € im Mittel nicht ausgleicht."}
      </Verdikt>
    </div>
  );
}
