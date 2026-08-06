/** Concept tooltip: expected value, the probability-weighted average E[X]. */
import { useState } from "react";
import { ConceptLink, M, MD, Plot, registerConcept, Slider } from "../lib";

/** Expected winnings of a simple bet as the win probability varies. */
function BetWidget() {
  const [p, setP] = useState(0.4);
  const ev = 10 * p - 2 * (1 - p);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Slider label="Gewinnwahrsch. p" value={p} onChange={setP} min={0} max={1} step={0.01} />
      <div className="mb-1 text-xs">
        Eine Wette zahlt <M>{"+10"}</M> € mit Wahrscheinlichkeit <M>{"p"}</M>{" "}
        und kostet sonst <M>{"2"}</M> €:{" "}
        <M>{`\\E[X] = 10p - 2(1-p) = ${ev.toFixed(2)}`}</M> €. Ab{" "}
        <M>{"p = 1/6"}</M> lohnt sie sich.
      </div>
      <Plot
        series={[{ f: (q) => 12 * q - 2 }]}
        xDomain={[0, 1]}
        yDomain={[-3, 11]}
        width={280}
        height={160}
        markers={[{ x: p, y: ev, label: "E[X]" }]}
      />
    </div>
  );
}

registerConcept({
  id: "expected-value",
  title: "Erwartungswert",
  body: (
    <>
      <p>
        Der <em>Erwartungswert</em> (engl. <em>expected value</em>) einer
        Zufallsgröße <M>{"X"}</M> ist ihr
        wahrscheinlichkeitsgewichteter Mittelwert: Jedes mögliche Ergebnis
        trägt seinen Wert mal die Wahrscheinlichkeit bei, mit der es
        eintritt. Für endlich viele Ergebnisse (in{" "}
        <ConceptLink id="summation-notation">Σ-Notation</ConceptLink>) gilt
      </p>
      <MD>{"\\E[X] = \\sum_{k} x_k \\, P(X = x_k) ,"}</MD>
      <p>
        und für stetige Größen wird aus der Summe ein Integral über die Dichte
        (vgl. MML §6.4.1). Kleines Beispiel: Ein fairer Würfel hat{" "}
        <M>{"\\E[X] = \\tfrac{1}{6}(1 + 2 + \\dots + 6) = 3.5"}</M>. Kein
        einzelner Wurf zeigt 3.5, aber der Durchschnitt vieler Würfe landet auf
        lange Sicht dort. Diese Verbindung nutzt das stochastische
        Gradientenverfahren: Ein Mittelwert über alle Datenpunkte (wie die
        volle Gradientensumme) ist die empirische Schätzung eines
        Erwartungswerts, und der Mittelwert über eine zufällige Teilstichprobe
        schätzt dieselbe Größe, nur mit mehr Rauschen.
      </p>
      <BetWidget />
    </>
  ),
});
