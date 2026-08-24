/**
 * DIE EINE EINSICHT: Die Steigung a gibt an jeder Stelle die gleiche Änderung
 * pro Schritt nach rechts an; b verschiebt diese Gerade nur vertikal.
 *
 * FARBROLLEN: blau = Gerade f(x) = ax + b; orange = ein Schritt nach rechts
 * und der dazugehörige Höhenunterschied.
 *
 * PROVENIENZ: Eigenbau (2026-08-20).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/HDR2/LinearFunctionWidget.mjs,
 * 2026-08-20): Für den Startwert a = 1,0 und b = 0,5 gilt f(0) = 0,5 und
 * f(1) − f(0) = 1,0. Allgemein ist f(x + 1) − f(x) = a; das
 * Steigungsdreieck mit Breite 1 zeigt daher genau a als Höhenunterschied.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_PANEL, fmtDe } from "../../lib";
export function LinearWidget() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0.5);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Verändern wir Steigung und Achsenabschnitt und lesen wir den Einheitsanstieg ab.
      </Aufgabe>
      <Plot
        series={[{ f: (x) => a * x + b, color: FMM_COLORS.blau, label: "f(x)=ax+b" }]}
        xDomain={[-3, 3]}
        yDomain={[-3, 3]}
        xLabel="x"
        yLabel="f(x)"
        readout
        markers={[
          { x: 0, y: b, label: "b" },
          { x: 1, y: b, color: FMM_COLORS.orange, label: "1 rechts" },
          { x: 1, y: a + b, color: FMM_COLORS.orange, label: "Anstieg" },
        ]}
        polylines={[
          {
            pts: [
              [0, b],
              [1, b],
              [1, a + b],
            ],
            color: FMM_COLORS.orange,
            dash: [3, 2],
            label: "Steigungsdreieck",
          },
        ]}
      />
      <Slider
        label="a (Steigung)"
        value={a}
        onChange={setA}
        min={-3}
        max={3}
        step={0.1}
        accent={FMM_COLORS.blau}
      />
      <Slider label="b (Abschnitt)" value={b} onChange={setB} min={-2} max={2} step={0.1} />
      <Verdikt kind={a === 0 ? "neutral" : a > 0 ? "ok" : "warn"}>
        {a === 0 ? (
          <>Die Gerade ist waagerecht; b = {fmtDe(b, 1)} legt ihre Höhe fest.</>
        ) : (
          <>
            Die Gerade {a > 0 ? "steigt" : "fällt"} um {fmtDe(Math.abs(a), 1)} pro Schritt nach rechts;
            b = {fmtDe(b, 1)} verschiebt sie nur vertikal.
          </>
        )}
      </Verdikt>
    </div>
  );
}
