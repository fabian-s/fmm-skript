/**
 * DIE EINE EINSICHT: Ein Knick verhindert schon die erste Ableitung und
 * schließt damit Glattheit aus, während ein Polynom glatt bleibt.
 *
 * FARBROLLEN: blau = die glatte Vergleichsfunktion x²/2; rot = |x| und sein
 * Knick.
 *
 * PROVENIENZ: Eigenbau (2026-08-20); statische Vergleichsfigur, weil die
 * sichtbaren einseitigen Steigungen die vollständige Einsicht tragen.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/HDR2/SmoothFunctionWidget.mjs,
 * 2026-08-20): Für x²/2 ist f′(x) = x und insbesondere f′(0) = 0. Für |x|
 * sind die einseitigen Steigungen bei 0 gleich −1 und 1, also verschieden;
 * daher ist |x| bei 0 nicht differenzierbar.
 */
import { Aufgabe, FMM_COLORS, Plot, Verdikt, W_PANEL } from "../../lib";
export function SmoothPlot() {
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Vergleichen wir den glatten Graphen mit dem vergrößert markierten Knick bei null.
      </Aufgabe>
      <Plot
        series={[
          { f: (x) => 0.5 * x * x, color: FMM_COLORS.blau, label: "x²/2" },
          { f: (x) => Math.abs(x), color: FMM_COLORS.rot, dash: [5, 4], label: "|x|" },
        ]}
        xDomain={[-2, 2]}
        yDomain={[-0.5, 2.2]}
        xLabel="x"
        yLabel="f(x)"
        markers={[{ x: 0, y: 0, color: FMM_COLORS.rot, r: 5, label: "Knick" }]}
        readout
      />
      <Verdikt kind="fail">
        Am Knick von |x| gibt es keine eindeutige Tangentensteigung; die Funktion ist dort nicht
        differenzierbar.
      </Verdikt>
    </div>
  );
}
