/**
 * DIE EINE EINSICHT: Der Kosinuswert ist an jeder Stelle die
 * Tangentensteigung des Sinus und bestimmt damit, ob der Sinus dort steigt,
 * fällt oder fast waagerecht verläuft.
 *
 * FARBROLLEN: blau = Sinus und seine Tangente; orange = Kosinuswert als
 * ablesbare Tangentensteigung.
 *
 * PROVENIENZ: Eigenbau (2026-08-20).
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/HDR2/SineCosineWidget.mjs,
 * 2026-08-20): sin(0) = 0 und cos(0) = 1. Beim mit Schrittweite 0,05
 * erreichbaren x = 1,55 ist cos(x) = 0,0208 und damit kleiner als die
 * Verdiktgrenze 0,08; bei x = 1,45 ist cos(x) = 0,1205 und sie wird nicht
 * erreicht.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, W_PANEL, fmtDe } from "../../lib";
export function SinCosExplorer() {
  const [x, setX] = useState(0);
  const s = Math.sin(x),
    c = Math.cos(x);
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>
        Verschieben wir x und vergleichen wir den Kosinuswert mit der Tangente an den Sinus.
      </Aufgabe>
      <Plot
        series={[
          { f: Math.sin, color: FMM_COLORS.blau, label: "sin x" },
          { f: Math.cos, color: FMM_COLORS.orange, dash: [5, 4], label: "cos x" },
          { f: (t) => s + c * (t - x), color: FMM_COLORS.blau, dash: [2, 3], label: "Tangente" },
        ]}
        xDomain={[-6.5, 6.5]}
        yDomain={[-1.6, 1.6]}
        xLabel="x"
        yLabel="Wert"
        readout
        markers={[
          { x, y: s, color: FMM_COLORS.blau, label: "sin x" },
          { x, y: c, color: FMM_COLORS.orange, label: "cos x" },
        ]}
      />
      <Slider
        label="x"
        value={x}
        onChange={setX}
        min={-6.3}
        max={6.3}
        step={0.05}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={Math.abs(c) < 0.08 ? "neutral" : "ok"}>
        {Math.abs(c) < 0.08 ? (
          <>Bei x = {fmtDe(x, 2)} ist cos(x) = {fmtDe(c, 2)} fast null: Die Sinuskurve hat dort fast eine waagerechte Tangente.</>
        ) : (
          <>Bei x = {fmtDe(x, 2)} hat die Sinus-Tangente die Steigung {fmtDe(c, 2)}, also den Kosinuswert. Das Vorzeichen sagt, ob der Sinus dort steigt oder fällt.</>
        )}
      </Verdikt>
    </div>
  );
}
