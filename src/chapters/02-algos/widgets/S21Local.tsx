import type { ReactNode } from "react";
import { ConceptLink, M, Schaetzfrage, W_MUTED } from "../../../lib";

/**
 * §2.1: Selbsttest „Was gibt R aus?" zu den vier R-Ausdrücken der Folien.
 *
 * DIE EINE EINSICHT: Vier Ausdrücke, die auf dem Papier offensichtlich
 * aussehen, liefern in Gleitkommaarithmetik drei Überraschungen — und man
 * merkt sich das nur, wenn man vorher getippt hat.
 *
 * Muster 1 (predict-then-reveal) über die Lib-Komponente <Schaetzfrage>:
 * erst eine Antwort wählen, dann die R-Ausgabe aufdecken. Die Vorfassung
 * (2026-08-11) zeigte nur einen „Lösung anzeigen"-Knopf ohne Tipp.
 *
 * FARBROLLEN: keine; die Tafel ist reiner Text.
 *
 * VERIFIZIERTE ZAHLEN (Rscript --vanilla, 2026-08-19, protokolliert in
 * historische Prüfung, Skript nicht mehr vorhanden):
 *   1.0 - 1.0              → 0
 *   1.0 - 0.9 - 0.1        → -2.775558e-17
 *   100 * 0.58 == 58       → FALSE   (100 * 0.58 = 57,999999999999992895)
 *   sum(x) - sum(rev(x))   → -262144 = −2^18, mit x = seq(1, 2e16, length = 1e5)
 * Der vierte Wert ist eine R-Ausgabe: R summiert intern in erweiterter
 * Genauigkeit, dieselbe Schleife in JS liefert 0. Die Größenordnung stimmt
 * in beiden Fällen — bei Zwischensummen um 10^21 ist der Abstand
 * benachbarter Maschinenzahlen 131072 = 2^17.
 */

interface RFrage {
  code: string;
  ausgabe: string;
  optionen: { id: string; text: string }[];
  loesung: string;
  expl: ReactNode;
}

const RTEST: RFrage[] = [
  {
    code: "1.0 - 1.0",
    ausgabe: "0",
    optionen: [
      { id: "null", text: "genau 0" },
      { id: "nicht", text: "etwas knapp neben 0" },
    ],
    loesung: "null",
    expl: (
      <>
        Hier passiert nichts Böses: <M>{"1{,}0"}</M> ist als Maschinenzahl exakt darstellbar,
        die Differenz ist exakt <M>{"0"}</M>. Entwarnung, aber nur hier.
      </>
    ),
  },
  {
    code: "1.0 - 0.9 - 0.1",
    ausgabe: "-2.775558e-17",
    optionen: [
      { id: "null", text: "genau 0" },
      { id: "nicht", text: "etwas knapp neben 0" },
    ],
    loesung: "nicht",
    expl: (
      <>
        Weder <M>{"0{,}9"}</M> noch <M>{"0{,}1"}</M> besitzen eine endliche
        Binärdarstellung; gespeichert werden gerundete Näherungen, und deren Rundungsreste
        bleiben nach der Subtraktion übrig. Das Ergebnis liegt in der Größenordnung der{" "}
        <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>{" "}
        (<M>{"\\approx 2^{-52} \\approx 2{,}2 \\cdot 10^{-16}"}</M>).
      </>
    ),
  },
  {
    code: "100 * 0.58 == 58",
    ausgabe: "FALSE",
    optionen: [
      { id: "true", text: "TRUE" },
      { id: "false", text: "FALSE" },
    ],
    loesung: "false",
    expl: (
      <>
        Auch <M>{"0{,}58"}</M> ist nicht exakt darstellbar: Gespeichert wird eine Zahl knapp
        daneben, und <M>{"100 \\cdot 0{,}58"}</M> ergibt <M>{"57{,}99999999999999\\ldots"}</M>{" "}
        statt <M>{"58"}</M>. Merkregel: Gleitkommazahlen niemals mit <code>==</code> auf exakte
        Gleichheit testen.
      </>
    ),
  },
  {
    code: "x <- seq(1, 2e16, length = 10^5)\nsum(x) - sum(rev(x))",
    ausgabe: "-262144",
    optionen: [
      { id: "null", text: "genau 0" },
      { id: "klein", text: "eine winzige Zahl" },
      { id: "gross", text: "eine sechsstellige Zahl" },
    ],
    loesung: "gross",
    expl: (
      <>
        Dieselben <M>{"10^5"}</M> Zahlen, nur in umgekehrter Reihenfolge summiert, und die
        beiden Summen unterscheiden sich um <M>{"262144 = 2^{18}"}</M>. Bei Zwischensummen der
        Größenordnung <M>{"10^{21}"}</M> liegen benachbarte Maschinenzahlen über{" "}
        <M>{"10^{5}"}</M> auseinander; welche Summanden dabei unter die Räder kommen, hängt von
        der Reihenfolge ab.
      </>
    ),
  },
];

/** Selbsttest zu den vier R-Ausdrücken: erst tippen, dann die Ausgabe aufdecken. */
export function RSelbsttest() {
  return (
    <div className="my-4 max-w-prose space-y-4">
      {RTEST.map((q) => (
        <Schaetzfrage
          key={q.code}
          variante="auswahl"
          frage="Was gibt R aus?"
          optionen={q.optionen}
          loesung={q.loesung}
          verdeckt={
            <div className="space-y-1 text-sm">
              <p className="font-mono font-semibold">{`## [1] ${q.ausgabe}`}</p>
              <p className={W_MUTED}>{q.expl}</p>
            </div>
          }
        >
          <pre className="overflow-x-auto rounded bg-slate-200/70 p-2 font-mono text-sm dark:bg-slate-900/60">
            <code>{q.code}</code>
          </pre>
        </Schaetzfrage>
      ))}
    </div>
  );
}
