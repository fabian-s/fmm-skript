/**
 * DIE EINE EINSICHT: Mehr Taylor-Terme nähern cos(x) auf einem sichtbar breiteren
 * Intervall an. FARBROLLEN: blau = Partialsumme, grau = Referenz. PROVENIENZ: neu.
 * VERIFIZIERTE ZAHLEN: `scripts/verify/QA-L2/verify-qa-l2.mjs`, 2026-08-20, prüft
 * T₈(0) = 1 und T₈(1) = cos(1) bis 3·10⁻¹⁴.
 *
 * FENSTER (geändert 2026-08-26): vorher x ∈ [−7, 7] bei y ∈ [−2,5; 2,5]; die
 * niedrigen Ordnungen waren dort fast vollständig abgeschnitten (T₁(±7) = −23,5).
 * Jetzt x ∈ [−6, 6], y ∈ [−2, 2], Startwert n = 2. Nachgerechnet (node,
 * 2026-08-26): Die Partialsumme verlässt den Streifen |y| ≤ 2 bei
 *   n = 0: nie (konstant 1)   n = 1: x = 2,45   n = 2: x = 3,71
 *   n = 3: x = 3,99           n = 4: x = 4,90   n = 5: x = 5,87
 *   n ≥ 6: nie im Fenster.
 * Jede einstellbare Ordnung ist also auf einem echten Stück des Fensters
 * sichtbar. Die Radien mit |Tₙ(x) − cos x| ≤ 0,1 für alle |x| ≤ r lauten
 *   n:  0     1     2     3     4     5     6     7     8
 *   r:  0,45  1,26  2,06  2,85  3,63  4,40  5,16  5,92  ≥ 6
 * (Schrittweite 0,01). Ab n = 4 ist damit das Kosinusminimum bei x = π ≈ 3,14
 * erfasst, bei n = 3 noch nicht – das ist die Antwort auf die Schätzfrage.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
const fac = (k: number) => {
  let r = 1;
  for (let i = 2; i <= k; i++) r *= i;
  return r;
};
export function CosSeriesWidget() {
  // Startwert n = 2: die Partialsumme folgt dem Kosinus schon ein gutes Stück
  // und verlässt das Fenster erst bei x = 3,71 – kein trivialer Ausgangszustand.
  const [n, setN] = useState(2);
  const p = (x: number) =>
    Array.from({ length: n + 1 }, (_, k) => ((-1) ** k * x ** (2 * k)) / fac(2 * k)).reduce(
      (a, b) => a + b,
      0,
    );
  // Größtes r ≤ 6 mit |p(x) − cos x| ≤ 0,1 für alle 0 ≤ x ≤ r (Raster 0,01).
  let grenze = 0;
  for (let x = 0; x <= 6.0001; x += 0.01) {
    if (Math.abs(p(x) - Math.cos(x)) > 0.1) break;
    grenze = x;
  }
  const ganzesFenster = grenze >= 5.995;
  const erreichtPi = grenze >= Math.PI;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Schätzen wir zuerst, wie viele Terme nötig sind, damit die Partialsumme dem Kosinus bis
        zu seinem Minimum bei x = π folgt – und prüfen wir es dann mit dem Regler.
      </Aufgabe>
      <Plot
        series={[
          { f: Math.cos, color: FMM_COLORS.grau, dash: [5, 4], label: "cos x" },
          { f: p, color: FMM_COLORS.blau, label: "Partialsumme" },
        ]}
        xDomain={[-6, 6]}
        yDomain={[-2, 2]}
        xLabel="x"
        yLabel="Wert"
        readout
        ariaLabel={`Kosinus und seine Taylor-Partialsumme bis zum Index n = ${n}; bis etwa x = ${fmtDe(grenze, 2)} liegen beide Kurven aufeinander.`}
      />
      <Slider
        label="oberster Index n"
        value={n}
        onChange={(v) => setN(Math.round(v))}
        min={0}
        max={8}
        step={1}
        fmt={(v) => String(v)}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={erreichtPi ? "ok" : "neutral"}>
        {ganzesFenster
          ? `Im ganzen Fenster |x| ≤ 6 bleibt die Abweichung vom Kosinus unter 0,1 – mit weiteren Termen lässt sich jedes Intervall erreichen, eine feste Termzahl aber nirgends überall.`
          : `Bis etwa |x| = ${fmtDe(grenze, 2)} weicht die Partialsumme um weniger als 0,1 vom Kosinus ab; das Kosinusminimum bei x = π ≈ 3,14 ${erreichtPi ? "ist damit erfasst" : "liegt noch außerhalb"}.`}
      </Verdikt>
    </div>
  );
}
