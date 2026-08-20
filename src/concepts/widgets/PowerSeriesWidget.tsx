/**
 * DIE EINE EINSICHT: Mehr Taylor-Terme nähern cos(x) auf einem sichtbar breiteren
 * Intervall an. FARBROLLEN: blau = Partialsumme, grau = Referenz. PROVENIENZ: neu.
 * VERIFIZIERTE ZAHLEN: `verify/QA-L2/verify-qa-l2.mjs`, 2026-08-20, prüft
 * T₈(0) = 1 und T₈(1) = cos(1) bis 3·10⁻¹⁴.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt } from "../../lib";
const fac = (k: number) => {
  let r = 1;
  for (let i = 2; i <= k; i++) r *= i;
  return r;
};
export function CosSeriesWidget() {
  const [n, setN] = useState(1);
  const p = (x: number) =>
    Array.from({ length: n + 1 }, (_, k) => ((-1) ** k * x ** (2 * k)) / fac(2 * k)).reduce(
      (a, b) => a + b,
      0,
    );
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Erhöhen wir die Termzahl und beobachten wir das wachsende gute Näherungsintervall.
      </Aufgabe>
      <Plot
        series={[
          { f: Math.cos, color: FMM_COLORS.grau, dash: [5, 4], label: "cos x" },
          { f: p, color: FMM_COLORS.blau, label: "Partialsumme" },
        ]}
        xDomain={[-7, 7]}
        yDomain={[-2.5, 2.5]}
        xLabel="x"
        yLabel="Wert"
        readout
      />
      <Slider
        label="Terme bis k"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={0}
        max={8}
        step={1}
        fmt={(v) => String(v)}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={n >= 4 ? "ok" : "neutral"}>
        {n >= 4
          ? "Mehr Terme folgen dem Kosinus über ein deutlich breiteres Intervall."
          : "Nahe beim Entwicklungspunkt 0 ist die Approximation bereits erkennbar."}
      </Verdikt>
    </div>
  );
}
