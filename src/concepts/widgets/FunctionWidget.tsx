/**
 * DIE EINE EINSICHT: Jede gewählte Eingabe besitzt genau eine Ausgabe.
 * FARBROLLEN: blau = Graph und gewählter Punkt; grau = Zuordnungslote. PROVENIENZ: Originalwidget.
 * VERIFIZIERTE ZAHLEN: f(1,2) = 1,44, node, scratchpad/verify/QA-L0/verify-qa-l0.mjs, 2026-08-20.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";
export function FunctionWidget() {
  const [x, setX] = useState(1.2);
  const y = x * x;
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Wählen wir eine Eingabe und verfolgen wir ihr Lot zum einzigen Funktionswert.
      </Aufgabe>
      <Plot
        series={[{ f: (t) => t * t, color: FMM_COLORS.blau, label: "f(x)=x²" }]}
        xDomain={[-2.2, 2.2]}
        yDomain={[-1, 4.5]}
        xLabel="x"
        yLabel="f(x)"
        readout
        markers={[{ x, y, color: FMM_COLORS.blau, label: "f(x)" }]}
        vlines={[{ at: x, color: FMM_COLORS.grau, dash: [3, 3] }]}
        hlines={[{ at: y, color: FMM_COLORS.grau, dash: [3, 3] }]}
      />
      <Slider
        label="Eingabe x"
        value={x}
        onChange={setX}
        min={-2}
        max={2}
        step={0.01}
        accent={FMM_COLORS.blau}
      />
      <Verdikt kind={x === 0 ? "neutral" : "ok"}>
        {x === 0
          ? "Auch am Scheitel gehört zur Eingabe 0 nur eine Ausgabe, nämlich f(0) = 0."
          : `x = ${fmtDe(x, 2)} führt zu genau einer Ausgabe, nämlich f(x) = ${fmtDe(y, 2)}.`}
      </Verdikt>
    </div>
  );
}
