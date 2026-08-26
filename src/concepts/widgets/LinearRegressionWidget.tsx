/** Einsicht: Residuen machen kleinste Quadrate als sichtbare Minimierungsaufgabe verständlich. Farben: blau Gerade, orange Residuen, grün Erfolg. Provenienz: original. VERIFIZIERTE ZAHLEN (node, scripts/verify/REV0/LinearRegressionWidget.mjs, 2026-08-20): Die Daten haben das Kleinste-Quadrate-Optimum θ₁ = 0,93, θ₀ = 0,28, SSE = 0,179; die Aufgaben-Schranke SSE < 0,25 ist damit erreichbar. Nachgerechnet 2026-08-26: Σx = 0, Σx² = 10, Σxy = 9,3, Σy = 1,4, also θ₁ = 9,3/10 = 0,93 und θ₀ = 1,4/5 = 0,28; Residuen 0,18, −0,25, 0,12, −0,21, 0,16 mit Quadratsumme 0,179. */
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
  // a = Steigung θ₁, b = Achsenabschnitt θ₀; die Regler tragen die Symbole der
  // Prosa (θ₀, θ₁), die kurzen Namen bleiben nur intern.
  const [a, setA] = useState(0.3);
  const [b, setB] = useState(1);
  const s = d.reduce((z, [x, y]) => z + (y - a * x - b) ** 2, 0);
  const ok = s < 0.25;
  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>
        Finden wir eine Gerade mit Fehlerquadratsumme unter 0,25 – eine frei gesetzte Suchmarke,
        erreichbar, aber nicht geschenkt.
      </Aufgabe>
      <Plot
        series={[{ f: (x) => a * x + b, color: FMM_COLORS.blau, label: "Gerade" }]}
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        xLabel="x"
        yLabel="y"
        readout
        markers={d.map(([x, y], i) => ({
          x,
          y,
          color: FMM_COLORS.orange,
          // Nur ein Label: fünffaches „Daten" war Rauschen, und das Label des
          // Punkts (2; 2,3) kollidierte mit der Legende (VIS-1 2026-08-20).
          label: i === 0 ? "Daten" : undefined,
        }))}
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
        label="Steigung θ₁"
        value={a}
        onChange={setA}
        min={-1}
        max={2}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Slider label="Achsenabschnitt θ₀" value={b} onChange={setB} min={-2} max={2} step={0.01} />
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
