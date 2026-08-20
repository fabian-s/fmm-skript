/**
 * DIE EINE EINSICHT: Die Steigung a ist der gerichtete Höhenunterschied pro
 * Schritt der Breite 1; ihr Vorzeichen entscheidet über Auf- oder Abstieg.
 *
 * FARBROLLEN: blau = Gerade y = ax; orange = waagerechter Einheitsschritt
 * und sein Höhenunterschied.
 *
 * PROVENIENZ: Eigenbau (2026-08-20).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/HDR2/SlopeWidget.mjs,
 * 2026-08-20): Beim Startwert a = 1,5 führt der Schritt von (0, 0) nach
 * (1, 1,5). Für a = −1,5 endet derselbe Schritt bei (1, −1,5); für a = 0
 * bleibt er bei (1, 0). Damit stimmen die drei Verdiktfälle mit y = ax überein.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_PANEL, fmtDe } from "../../lib";
export function SlopeWidget() {
  const [a, setA] = useState(1.5);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Verändern wir die Gerade und lesen wir das Steigungsdreieck für einen Schritt nach rechts.
      </Aufgabe>
      <Plot
        series={[{ f: (x) => a * x, color: FMM_COLORS.blau, label: "y=ax" }]}
        xDomain={[-2, 2]}
        yDomain={[-3, 3]}
        xLabel="x"
        yLabel="y"
        readout
        markers={[
          { x: 0, y: 0, label: "Start" },
          { x: 1, y: 0, color: FMM_COLORS.orange, label: "1 rechts" },
          { x: 1, y: a, color: FMM_COLORS.orange, label: "Anstieg" },
        ]}
        polylines={[
          {
            pts: [
              [0, 0],
              [1, 0],
              [1, a],
            ],
            color: FMM_COLORS.orange,
            dash: [3, 2],
            label: "Steigungsdreieck",
          },
        ]}
      />
      <Slider
        label="Steigung a"
        value={a}
        onChange={setA}
        min={-3}
        max={3}
        step={0.1}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={a === 0 ? "neutral" : "ok"}>
        {a === 0 ? (
          "Die Gerade ist flach."
        ) : (
          <>
            Ein Schritt nach rechts bedeutet {fmtDe(a, 1)} nach {a > 0 ? "oben" : "unten"}.
          </>
        )}
      </Verdikt>
    </div>
  );
}
