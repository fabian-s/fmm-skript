/**
 * DIE EINE EINSICHT: Dieselbe Steigung bewegt gleichzeitig die Regressionsgerade
 * und ihren Punkt auf der Verlustkurve. FARBROLLEN: blau = Modell und Verlust,
 * orange = Daten und aktueller Parameter. PROVENIENZ: neu.
 * VERIFIZIERTE ZAHLEN: `scripts/verify/QA-L2/verify-qa-l2.mjs`, 2026-08-20, prüft
 * für a = 1 den Wert L(a) = 0,0925 und die im Widget verwendete MSE-Formel.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
const d: [number, number][] = [
  [-2, -1.6],
  [-1, -0.8],
  [1, 1.1],
  [2, 2.4],
];
const loss = (a: number) => d.reduce((s, [x, y]) => s + (y - a * x) ** 2, 0) / d.length;
export function ObjectiveWidget() {
  const [a, setA] = useState(0.2);
  const l = loss(a);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Verschieben wir die Gerade und verfolgen wir denselben Parameter auf der Verlustkurve.
      </Aufgabe>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <Plot
          series={[{ f: (x) => a * x, color: FMM_COLORS.blau, label: "y=ax" }]}
          xDomain={[-2.5, 2.5]}
          yDomain={[-3, 3]}
          width={240}
          height={190}
          xLabel="x"
          yLabel="y"
          markers={d.map(([x, y], i) => ({
            x,
            y,
            color: FMM_COLORS.orange,
            label: i === 0 ? "Daten" : undefined,
          }))}
        />
        <Plot
          series={[{ f: loss, color: FMM_COLORS.blau, label: "L(a)" }]}
          xDomain={[-0.5, 2.5]}
          yDomain={[0, 6]}
          width={240}
          height={190}
          xLabel="a"
          yLabel="L(a)"
          readout
          markers={[{ x: a, y: l, color: FMM_COLORS.orange, label: "aktuell" }]}
        />
      </div>
      <Slider
        label="Steigung a"
        value={a}
        onChange={setA}
        min={-0.5}
        max={2.5}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={l < 0.12 ? "ok" : "neutral"}>
        a = {fmtDe(a, 2)} erzeugt L(a) = {fmtDe(l, 3)}. Beide Tafeln zeigen denselben
        Modellparameter.
      </Verdikt>
    </div>
  );
}
