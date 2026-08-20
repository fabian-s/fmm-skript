/** Einsicht: Residuen machen kleinste Quadrate als sichtbare Minimierungsaufgabe verständlich. Farben: blau Gerade, orange Residuen, grün Erfolg. Provenienz: original. VERIFIZIERTE ZAHLEN (node, scratchpad/verify/REV0/LinearRegressionWidget.mjs, 2026-08-20): Die Daten haben das Kleinste-Quadrate-Optimum a = 0,93, b = 0,28, SSE = 0,179; die Aufgaben-Schranke SSE < 0,25 ist damit erreichbar. */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
const d: [number, number][] = [
  [-2, -1.4],
  [-1, -0.9],
  [0, 0.4],
  [1, 1],
  [2, 2.3],
];
export function RegressionWidget() {
  const [a, setA] = useState(0.3);
  const [b, setB] = useState(1);
  const s = d.reduce((z, [x, y]) => z + (y - a * x - b) ** 2, 0);
  const ok = s < 0.25;
  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>Finden wir eine Gerade mit Fehlerquadratsumme unter 0,25.</Aufgabe>
      <Plot
        series={[{ f: (x) => a * x + b, color: FMM_COLORS.blau, label: "Gerade" }]}
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        xLabel="x"
        yLabel="y"
        readout
        markers={d.map(([x, y]) => ({ x, y, color: FMM_COLORS.orange, label: "Daten" }))}
        polylines={d.map(([x, y]) => ({
          pts: [
            [x, y],
            [x, a * x + b],
          ],
          color: FMM_COLORS.orange,
          dash: [3, 2],
        }))}
      />
      <Slider
        label="Steigung a"
        value={a}
        onChange={setA}
        min={-1}
        max={2}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Slider label="Abschnitt b" value={b} onChange={setB} min={-2} max={2} step={0.01} />
      <Verdikt kind={ok ? "ok" : "neutral"}>
        {ok ? (
          <>
            Geschafft: SSE = {fmtDe(s, 3)}. Die kleinsten Quadrate belohnen kurze vertikale
            Residuen.
          </>
        ) : (
          <>
            SSE = {fmtDe(s, 3)}. Die orangefarbenen Strecken zeigen, welche Fehler noch dominieren.
          </>
        )}
      </Verdikt>
    </div>
  );
}
