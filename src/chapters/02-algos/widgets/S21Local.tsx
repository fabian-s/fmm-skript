/**
 * Lokale Begleitkomponente für Abschnitt 2.1 (aus der TSX-Fassung von S21
 * portiert, MDX-Migration 2026-08-11; Rendering unverändert).
 *
 * Selbsttest „Was gibt R aus?" zu den vier R-Ausdrücken der Folien: Code
 * sichtbar, Ausgabe und Erklärung klappen per Knopf auf. Das ist kein
 * wahr/falsch-Quiz und deshalb nicht als ::::quiz-Direktive abbildbar.
 */
import { useState, type ReactNode } from "react";
import { ConceptLink, M } from "../../../lib";

const RTEST: { code: string; antwort: string; expl: ReactNode }[] = [
  {
    code: "1.0 - 1.0",
    antwort: "0",
    expl: (
      <>
        Hier passiert nichts Böses: <M>{"1{,}0"}</M> ist als Maschinenzahl exakt
        darstellbar, die Differenz ist exakt <M>{"0"}</M>. Entwarnung – aber nur hier.
      </>
    ),
  },
  {
    code: "1.0 - 0.9 - 0.1",
    antwort: "-2.775558e-17",
    expl: (
      <>
        Nicht <M>{"0"}</M>! Weder <M>{"0{,}9"}</M> noch <M>{"0{,}1"}</M> besitzen eine
        endliche Binärdarstellung; gespeichert werden gerundete Näherungen, und deren
        Rundungsreste bleiben nach der Subtraktion übrig. Das Ergebnis liegt in der
        Größenordnung der <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>{" "}
        (<M>{"\\approx 2^{-52} \\approx 2{,}2 \\cdot 10^{-16}"}</M>).
      </>
    ),
  },
  {
    code: "100 * 0.58 == 58",
    antwort: "FALSE",
    expl: (
      <>
        Auch <M>{"0{,}58"}</M> ist nicht exakt darstellbar: Gespeichert wird eine Zahl
        knapp daneben, und <M>{"100 \\cdot 0{,}58"}</M> ergibt{" "}
        <M>{"57{,}99999999999999\\ldots"}</M> statt <M>{"58"}</M>. Merkregel: Gleitkommazahlen
        niemals mit <code>==</code> auf exakte Gleichheit testen.
      </>
    ),
  },
  {
    code: "x <- seq(1, 2e16, length = 10^5)\nsum(x) - sum(rev(x))",
    antwort: "-262144",
    expl: (
      <>
        Dieselben <M>{"10^5"}</M> Zahlen, nur in umgekehrter Reihenfolge summiert, und
        die beiden Summen unterscheiden sich um <M>{"262144 = 2^{18}"}</M>. Bei
        Zwischensummen der Größenordnung <M>{"10^{21}"}</M> liegen benachbarte
        Maschinenzahlen über <M>{"10^{5}"}</M> auseinander; welche Summanden dabei
        „unter die Räder kommen", hängt von der Reihenfolge ab.
      </>
    ),
  },
];

/** Selbsttest zu den vier R-Ausdrücken; jede Lösung einzeln aufklappbar. */
export function RSelbsttest() {
  const [offen, setOffen] = useState<boolean[]>(RTEST.map(() => false));
  const toggle = (i: number) => setOffen((o) => o.map((v, j) => (i === j ? !v : v)));
  return (
    <div className="my-4 max-w-prose space-y-3">
      {RTEST.map((q, i) => (
        <div key={i} className="rounded border border-slate-200 p-3 dark:border-slate-700">
          <pre className="overflow-x-auto rounded bg-slate-200/70 p-2 font-mono text-sm dark:bg-slate-900/60">
            <code>{q.code}</code>
          </pre>
          <button
            type="button"
            className="mt-2 rounded bg-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
            onClick={() => toggle(i)}
          >
            {offen[i] ? "Lösung verbergen" : "Lösung anzeigen"}
          </button>
          {offen[i] && (
            <div className="mt-2 text-sm">
              <p className="font-mono font-semibold">{"## [1] " + q.antwort}</p>
              <p className="mt-1 text-slate-600 dark:text-slate-300">{q.expl}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
