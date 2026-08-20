/**
 * DIE EINE EINSICHT: Koeffizienten gewichten die Potenzbausteine eines Polynoms.
 * FARBROLLEN: blau = Summe, orange = regelbare Koeffizienten. PROVENIENZ: neu.
 * VERIFIZIERTE ZAHLEN: `verify/QA-L2/verify-qa-l2.mjs`, 2026-08-20, prüft die
 * Potenzsumme; der Verdiktwert p(1) ist jeweils die Summe der vier Reglerwerte.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function MonomialWidget() {
  const [c, setC] = useState([0, 1, 0.5, 0]);
  const f = (x: number) => c.reduce((s, a, i) => s + a * x ** i, 0);
  const set = (i: number, v: number) => setC(c.map((x, j) => (i === j ? v : x)));
  const nullPolynom = c.every((v) => Math.abs(v) < 1e-9);
  const grad = c.reduce((bester, v, i) => (Math.abs(v) > 1e-9 ? i : bester), -1);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>Gewichten wir die vier Potenzbausteine und beobachten wir ihre Summe.</Aufgabe>
      <Plot
        series={[{ f, label: "p(x)", color: FMM_COLORS.blau }]}
        xDomain={[-2, 2]}
        yDomain={[-4, 4]}
        xLabel="x"
        yLabel="p(x)"
        readout
        ariaLabel="Polynom aus vier regelbaren Koeffizienten"
      />
      {c.map((v, i) => (
        <Slider
          key={i}
          label={`a${i}`}
          value={v}
          onChange={(w) => set(i, w)}
          min={-2}
          max={2}
          step={0.1}
          accent={FMM_COLORS.orange}
        />
      ))}
      <Verdikt kind={nullPolynom ? "warn" : "ok"}>
        {nullPolynom
          ? "Alle Gewichte sind null. Damit bleibt nur das Nullpolynom übrig."
          : `Bei x = 1 addieren sich die Gewichte zu p(1) = ${fmtDe(f(1), 1)}. Der höchste aktive Baustein ist x${grad === 0 ? "⁰" : `^${grad}`}, also hat das aktuelle Polynom Grad ${grad}.`}
      </Verdikt>
    </div>
  );
}
