/**
 * DIE EINE EINSICHT: Bandbreite balanciert lokale Struktur gegen Glättung.
 * FARBROLLEN: blau = Kernschätzung; grau = Daten. PROVENIENZ: Originalwidget;
 * das Verdikt zählt seit 2026-08-26 die Moden nach, statt zwei abgelesene
 * h-Schwellen wie allgemeine Kategorien zu behandeln (Audit 2026-08-26).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L0/verify-qa-l0.mjs, 2026-08-20;
 * Modenzahlen nachgerechnet 2026-08-26): Die fest codierte Stichprobe hat 13
 * Werte in zwei Gruppen (7 links, 6 rechts). Zahl der lokalen Maxima von p̂_h
 * auf [−4, 4] über die Reglerwerte h = 0,10; 0,15; 0,20; …; 1,00:
 *   9, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1
 * also mehr als zwei Moden nur für h ≤ 0,15, genau zwei für 0,20 ≤ h ≤ 0,85
 * und nur noch eine ab h = 0,90. Die Zählung ist gitterunabhängig (identische
 * Werte für N = 800, 1600, 3200, 6400, 12800 Stützstellen).
 */
import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_MUTED, fmtDe, fmtInt } from "../../lib";
const data = [-1.9, -1.6, -1.4, -1.2, -1.1, -0.9, -0.6, 0.4, 0.7, 0.9, 1.2, 1.5, 1.9];
const g = (x: number, m: number, s: number) =>
  Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));

/** Lokale Maxima auf einem festen Gitter über [−4, 4] auszählen. */
function modenZahl(f: (x: number) => number): number {
  const a = -4;
  const N = 1600;
  const st = 8 / N;
  let n = 0;
  let vor = f(a);
  let jetzt = f(a + st);
  for (let i = 2; i <= N; i++) {
    const nach = f(a + i * st);
    if (jetzt > vor && jetzt >= nach) n++;
    vor = jetzt;
    jetzt = nach;
  }
  return n;
}

export function DensityWidget() {
  const [h, setH] = useState(0.35);
  const d = useMemo(
    () => (x: number) => data.reduce((s, z) => s + g(x, z, h), 0) / data.length,
    [h]
  );
  const moden = useMemo(() => modenZahl(d), [d]);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Verändern wir die Bandbreite und vergleichen wir Datenpunkte mit der Dichteschätzung.
      </Aufgabe>
      <Plot
        series={[{ f: d, label: "Kernschätzung", color: FMM_COLORS.blau }]}
        xDomain={[-3, 3]}
        yDomain={[0, 1.1]}
        xLabel="Wert"
        yLabel="Dichte"
        readout
        markers={data.map((x) => ({ x, y: 0.025, color: FMM_COLORS.grau, r: 3 }))}
        ariaLabel={`Dichteschätzung für dreizehn Datenpunkte mit Bandbreite ${fmtDe(h, 2)}; sie hat ${fmtInt(moden)} lokale Maxima.`}
      />
      <Slider label="Bandbreite h" value={h} onChange={setH} min={0.1} max={1} step={0.05} />
      <p className={`mt-1 text-xs ${W_MUTED}`}>
        Die Maxima werden auf einem Gitter über [−4, 4] ausgezählt; die Grenzen gelten für diese
        Stichprobe von 13 Werten, nicht allgemein.
      </p>
      <Verdikt kind={moden === 2 ? "ok" : "warn"}>
        {moden > 2
          ? `Die Schätzung hat ${fmtInt(moden)} lokale Maxima: Sie zeichnet einzelne Beobachtungen nach – Unterglättung.`
          : moden === 2
            ? "Genau zwei lokale Maxima: Die beiden Gruppen der Stichprobe bleiben getrennt sichtbar."
            : "Nur noch ein Maximum: Die beiden Gruppen sind zu einer breiten Form verschmolzen – Überglättung."}{" "}
        Aktuell h = {fmtDe(h, 2)}.
      </Verdikt>
    </div>
  );
}
