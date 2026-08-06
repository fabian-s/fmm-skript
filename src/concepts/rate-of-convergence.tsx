/** Konzept-Tooltip: Konvergenzrate: linear vs. quadratisch. */
import { useState } from "react";
import { ConceptLink, M, MD, registerConcept, Slider } from "../lib";
import { LabeledPlot } from "../lib";

const E0 = 0.1;
const FLOOR = -16; // doppelte Genauigkeit: ~16 korrekte Stellen

function RateWidget() {
  const [c, setC] = useState(0.5);
  // log10 des Fehlers nach k Schritten
  const linLog = (k: number) => Math.log10(E0) + k * Math.log10(c);
  const quadLog = (k: number) => Math.pow(2, k) * Math.log10(E0);
  const marks: { x: number; y: number; color?: string }[] = [];
  for (let k = 0; k <= 8; k++) {
    const l = linLog(k);
    const q = quadLog(k);
    if (l >= FLOOR) marks.push({ x: k, y: l, color: "#dc2626" });
    if (q >= FLOOR) marks.push({ x: k, y: q, color: "#0284c7" });
  }
  const linDigits = -Math.log10(c);
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Slider label="linearer Faktor C" value={c} onChange={setC} min={0.05} max={0.95} step={0.05} />
      <div className="my-1 font-mono text-xs">
        linear: ≈ {linDigits.toFixed(2)} neue Stelle(n) pro Schritt · quadratisch: Stellenzahl verdoppelt sich pro Schritt
      </div>
      <LabeledPlot
        xLabel="Iteration k"
        yLabel="log₁₀ Fehler"
        tickClass="text-slate-300"
        series={[
          { f: linLog, color: "#dc2626", label: "linear" },
          { f: quadLog, color: "#0284c7", label: "quadratisch" },
        ]}
        markers={marks}
        xDomain={[0, 8]}
        yDomain={[FLOOR, 0]}
        width={280}
        height={190}
      />
      <p className="mt-1 text-xs opacity-80">
        Beide starten mit Fehler <M>{"10^{-1}"}</M>. Die{" "}
        <span className="text-red-400">lineare</span> Folge sinkt entlang
        einer Geraden, deren Steigung wir über <M>{"C"}</M> steuern; die{" "}
        <span className="text-sky-400">quadratische</span> stürzt nach wenigen
        Schritten aus dem Diagramm. Der Plot endet bei <M>{"10^{-16}"}</M>,
        ungefähr die{" "}
        <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>{" "}
        in doppelter Genauigkeit; darunter bringen weitere Iterationen nichts
        mehr.
      </p>
    </div>
  );
}

registerConcept({
  id: "rate-of-convergence",
  title: "Konvergenzrate",
  body: (
    <>
      <p>
        Ein iterativer Algorithmus erzeugt eine Folge von Näherungen{" "}
        <M>{"x_1, x_2, x_3, \\ldots"}</M>, die sich (hoffentlich) der wahren
        Lösung <M>{"x^*"}</M> nähern. Schreiben wir{" "}
        <M>{"e_k = \\|x_k - x^*\\|"}</M> für den Fehler in Schritt{" "}
        <M>{"k"}</M>, dann beschreibt die <em>Konvergenzrate</em> (rate of
        convergence), wie schnell die Fehler schrumpfen, typischerweise über
      </p>
      <MD>{"e_{k+1} \\approx C\\, e_k^{\\,r}."}</MD>
      <p>
        Mit <M>{"r = 1"}</M> und <M>{"0 < C < 1"}</M> heißt die Konvergenz{" "}
        <em>linear</em>: Jeder Schritt multipliziert den Fehler mit demselben
        Faktor <M>{"C"}</M> und liefert damit eine konstante Anzahl neuer
        korrekter Stellen pro Iteration (mit <M>{"C = 0.1"}</M> genau eine
        Stelle pro Schritt). Mit <M>{"r = 2"}</M> ist sie{" "}
        <em>quadratisch</em>: Der Fehler wird in jedem Schritt ungefähr{" "}
        <em>quadriert</em>, aus <M>{"10^{-2}"}</M> wird also{" "}
        <M>{"10^{-4}"}</M>, dann <M>{"10^{-8}"}</M>: die Anzahl korrekter
        Stellen verdoppelt sich mit jeder Iteration. Kubische Konvergenz (
        <M>{"r = 3"}</M>) verdreifacht sie.
      </p>
      <p>
        Deshalb lohnt sich Eigenwert-Analyse für Algorithmen: Die
        Potenziteration (power iteration) konvergiert linear mit Faktor{" "}
        <M>{"C = |\\lambda_2 / \\lambda_1|"}</M>, einem Verhältnis von
        Eigenwerten. Wer die Eigenwerte der Iterationsmatrix analysiert, weiß
        also im Voraus, ob das Verfahren überhaupt konvergiert und wie viele
        Schritte es braucht. Am anderen Ende der Skala konvergiert die
        Rayleigh-Quotienten-Iteration sogar kubisch.
      </p>
      <RateWidget />
    </>
  ),
});
