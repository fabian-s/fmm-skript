/** Konzept-Tooltip: erwartungstreuer Schätzer — im Mittel richtig, E[θ̂] = θ. */
import { ConceptLink, M, MD, registerConcept } from "../lib";

// fester "zufälliger" Scatter (deterministisch, damit das Widget stabil ist)
const UNBIASED: [number, number][] = [
  [-18, 6], [11, -15], [4, 19], [-9, -11], [22, 3],
  [-3, -22], [15, 12], [-20, -4], [7, 8], [-6, 14],
];
const BIASED: [number, number][] = [
  [14, -12], [19, -8], [12, -17], [17, -14], [21, -11],
  [15, -9], [18, -16], [13, -11], [20, -14], [16, -13],
];

function Board({ pts, title }: { pts: [number, number][]; title: string }) {
  const S = 130;
  const c = S / 2;
  return (
    <div className="flex flex-col items-center">
      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        className="rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        {[55, 38, 21].map((r) => (
          <circle key={r} cx={c} cy={c} r={r} fill="none" stroke="#94a3b8" strokeWidth={1} />
        ))}
        <circle cx={c} cy={c} r={4} fill="#0284c7" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={c + x} cy={c + y} r={2.8} fill="#dc2626" />
        ))}
      </svg>
      <span className="mt-1 text-xs text-slate-300">{title}</span>
    </div>
  );
}

function DartboardWidget() {
  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <div className="flex justify-center gap-4">
        <Board pts={UNBIASED} title="erwartungstreu: gestreut, aber zentriert" />
        <Board pts={BIASED} title="verzerrt: eng beisammen, aber daneben" />
      </div>
      <p className="mt-1 text-xs text-slate-300">
        Blauer Punkt: der wahre Wert θ. Rote Punkte: Schätzungen aus
        wiederholten Stichproben. Links: Die einzelnen Schätzungen sind
        verrauscht, aber ihr Mittel sitzt auf dem Ziel. Rechts: Die
        Schätzungen stimmen untereinander überein — und liegen alle
        systematisch daneben.
      </p>
    </div>
  );
}

registerConcept({
  id: "unbiased-estimator",
  title: "Erwartungstreuer Schätzer",
  body: (
    <>
      <p>
        Ein Schätzer <M>{"\\hat{\\theta}"}</M> ist ein Rezept, das aus einer
        zufälligen Stichprobe eine Schätzung für eine unbekannte Größe{" "}
        <M>{"\\theta"}</M> macht. Weil die Daten zufällig sind, ist es auch
        die Schätzung — und der Schätzer heißt <em>erwartungstreu</em> (engl.{" "}
        <em>unbiased</em>), wenn sein{" "}
        <ConceptLink id="expected-value">Erwartungswert</ConceptLink> über
        wiederholte Stichproben die Wahrheit exakt trifft:
      </p>
      <MD>{"\\E\\big[\\hat{\\theta}\\big] = \\theta ."}</MD>
      <p>
        Kleines Beispiel: Das Stichprobenmittel{" "}
        <M>{"\\bar{X} = \\tfrac{1}{n}(X_1 + \\dots + X_n)"}</M> ist
        erwartungstreu für den Populationsmittelwert <M>{"\\mu"}</M> — jedes
        einzelne <M>{"\\bar{X}"}</M> liegt daneben, aber es gibt keine
        systematische Drift in eine Richtung. Erwartungstreu heißt{" "}
        <em>nicht</em> präzise: Ein erwartungstreuer Schätzer kann sehr
        verrauscht sein. Genau diese Eigenschaft lässt das stochastische
        Gradientenverfahren (stochastic gradient descent, vgl. MML §7.1.3)
        funktionieren: Der mittlere Gradient über ein zufälliges Mini-Batch
        ist eine erwartungstreue Schätzung des Gradienten über alle Daten —
        im Mittel zeigt also jeder verrauschte Schritt in die richtige
        Richtung.
      </p>
      <DartboardWidget />
    </>
  ),
});
