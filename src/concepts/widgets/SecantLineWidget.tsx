/**
 * QA-L3-Nachprüfung: `scripts/verify/QA-L3/verify-widgets.mjs`, 2026-08-20.
 * Konzept-Widget für `secant-line` UND `derivative` (Dublettenauflösung D6,
 * 2026-08-19; das frühere DerivativeWidget ist entfallen).
 *
 * DIE EINE EINSICHT: Die Sekantensteigung ist keine Näherung mit unbekanntem
 * Fehler — auf f(x) = x² an der Stelle 1 ist sie exakt 2 + h, der Abstand zur
 * Tangentensteigung ist also genau h und schrumpft im Gleichschritt mit dem
 * Punktabstand.
 *
 * VARIANTEN: `variante="sekante"` zeigt nur die Sekante durch P und Q;
 * `variante="ableitung"` blendet zusätzlich die Tangente in P ein, gegen die
 * die Sekante kippt.
 *
 * FARBROLLEN: blau = der Graph von f; rot = die Sekante samt ihren beiden
 * Punkten P und Q; grün = die Tangente in P (nur in der Ableitungsvariante).
 *
 * PROVENIENZ: aus den beiden Vorgängerwidgets SecantLineWidget und
 * DerivativeWidget (Stand 2026-08-18) zusammengeführt; Achsen, Legende und
 * Ticks kommen aus der Lib-`Plot`-Komponente, alle Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV2/SecantLineWidget.mjs,
 * 2026-08-20): f(x) = x², x₀ = 1, Sekantensteigung (f(1+h) − f(1))/h = 2 + h
 * exakt; h = 2 → 4, h = 1 → 3, h = 0,5 → 2,5, h = 0,1 → 2,1, h = 0,05 → 2,05.
 * Der Abstand zur Tangentensteigung f′(1) = 2 ist in jedem Fall genau h.
 * Die Sekante durch x = 1 und x = 2 hat Steigung 3 (das Beispiel der
 * Konzeptseite). Tangente in x₀ = 1: y = 2x − 1.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Plot, Slider, Verdikt, fmtDe } from "../../lib";

const f = (x: number) => x * x;
const X0 = 1;

export function SecantWidget({
  variante = "sekante",
}: {
  variante?: "sekante" | "ableitung";
}) {
  const [h, setH] = useState(1);
  const steigung = (f(X0 + h) - f(X0)) / h;
  const sekante = (x: number) => f(X0) + steigung * (x - X0);
  const tangente = (x: number) => f(X0) + 2 * (x - X0);
  const abstand = Math.abs(steigung - 2);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Schieben wir Q an P heran und verfolgen wir dabei die Sekantensteigung.
      </Aufgabe>
      <Plot
        series={[
          { f, color: FMM_COLORS.blau, label: "f(x) = x²" },
          { f: sekante, color: FMM_COLORS.rot, dash: [6, 4], label: "Sekante durch P und Q" },
          ...(variante === "ableitung"
            ? [{ f: tangente, color: FMM_COLORS.gruen, label: "Tangente in P" }]
            : []),
        ]}
        xDomain={[-0.5, 3.2]}
        yDomain={[-1.5, 8]}
        width={330}
        height={205}
        xLabel="x"
        yLabel="f(x)"
        points={[
          { x: X0, y: f(X0), color: FMM_COLORS.rot, label: "P" },
          { x: X0 + h, y: f(X0 + h), color: FMM_COLORS.rot, label: "Q" },
        ]}
        ariaLabel={`Parabel mit der Sekante durch P bei x = 1 und Q bei x = ${fmtDe(X0 + h, 2)}; die Sekantensteigung ist ${fmtDe(steigung, 2)}.`}
      />
      <Slider
        label="Abstand h"
        value={h}
        onChange={setH}
        min={0.05}
        max={2}
        step={0.01}
        accent={FMM_COLORS.rot}
      />
      <Verdikt kind={abstand < 0.1 ? "ok" : "neutral"}>
        Sekantensteigung = {fmtDe(steigung, 3)} = 2 + h, also genau um {fmtDe(abstand, 3)} von
        der Tangentensteigung 2 entfernt.{" "}
        {abstand < 0.1
          ? "Bei diesem winzigen Abstand ist die Sekante von der Tangente kaum noch zu unterscheiden: das ist der Grenzwert, den die Ableitung meint."
          : "Halbieren wir h, halbiert sich auch dieser Abstand – der Grenzwert 2 wird also erreicht, ohne dass wir h je auf null setzen müssten."}
      </Verdikt>
    </div>
  );
}
