/**
 * §2.1 Numerische Probleme und Algorithmen.
 * Quelle: Folien 02-algos.Rmd, Auftakt („Verwendete Vorkenntnisse") und
 * Block „Numerische Probleme und Algorithmen" (Zeilen 1–135). Prosa
 * eigenständig aus den Folien formuliert; alle Zahlenbeispiele in R
 * nachgerechnet und verifiziert.
 */
import { useState, type ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD } from "../../lib";
import { AusloeschungDemo, AssoziativDemo } from "./widgets/S21Demos";

const P = "my-3 max-w-prose leading-relaxed";
const H3 = "mt-6 text-lg font-semibold";

/* ------------------------------------------------------------------ */
/* Selbsttest: „Was gibt R aus?" (Folie mit den vier R-Ausdrücken)     */
/* ------------------------------------------------------------------ */

const RTEST: { code: string; antwort: string; expl: ReactNode }[] = [
  {
    code: "1.0 - 1.0",
    antwort: "0",
    expl: (
      <>
        Hier passiert nichts Böses: <M>{"1{,}0"}</M> ist als Maschinenzahl exakt
        darstellbar, die Differenz ist exakt <M>{"0"}</M>. Entwarnung — aber nur hier.
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
        Dieselben <M>{"10^5"}</M> Zahlen, nur in umgekehrter Reihenfolge summiert — und
        die beiden Summen unterscheiden sich um <M>{"262144 = 2^{18}"}</M>. Bei
        Zwischensummen der Größenordnung <M>{"10^{21}"}</M> liegen benachbarte
        Maschinenzahlen über <M>{"10^{5}"}</M> auseinander; welche Summanden dabei
        „unter die Räder kommen", hängt von der Reihenfolge ab.
      </>
    ),
  },
];

function RSelbsttest() {
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

/* ------------------------------------------------------------------ */
/* Der Abschnitt                                                       */
/* ------------------------------------------------------------------ */

export function S21() {
  return (
    <>
      <p className="text-sm italic text-slate-500 dark:text-slate-400">
        Grundlage: Folien 02-algos, Auftakt und „Numerische Probleme und Algorithmen".
      </p>

      <p className={P}>
        Mit diesem Kapitel beginnt die eigentliche Numerik. Statistische Methoden sind am
        Ende immer Rechenvorschriften, die ein Computer ausführt — und Computer rechnen
        anders als die Mathematik auf dem Papier. In diesem Kapitel klären wir zuerst,
        was ein <em>numerisches Problem</em> und was ein <em>Algorithmus</em> überhaupt
        ist. Dann sehen wir an konkreten Beispielen, warum es entscheidend darauf
        ankommt, <em>wie</em> wir etwas berechnen — dieselbe Formel kann als
        Rechenvorschrift brillant oder katastrophal sein. In den folgenden Abschnitten
        fragen wir dann, wie <em>teuer</em> ein Algorithmus ist, und entwickeln mit den
        Landau-Symbolen die Sprache, um Rechenaufwand zu vergleichen.
      </p>

      <h3 className={H3}>Verwendete Vorkenntnisse</h3>
      <p className={P}>
        Wir brauchen in diesem Kapitel nur Grundbegriffe aus dem ersten Semester: aus der
        Analysis <ConceptLink id="sequence">Folgen</ConceptLink> und ihre{" "}
        <ConceptLink id="limit">Grenzwerte</ConceptLink> sowie die Grundidee der{" "}
        <ConceptLink id="convergence">Konvergenz</ConceptLink>; aus der linearen Algebra{" "}
        <ConceptLink id="matrix">Matrizen</ConceptLink> und ihre Grundoperationen,
        insbesondere <ConceptLink id="matrix-vector-product">Matrix-Vektor-</ConceptLink>{" "}
        und <ConceptLink id="matrix-multiplication">Matrixmultiplikation</ConceptLink> —
        und ein erstes Gespür dafür, wie viele Einzelrechnungen darin stecken.
      </p>

      <h3 id="sec-2.1-numerische-probleme" className={H3}>
        Numerische Probleme
      </h3>
      <p className={P}>
        Was ist ein numerisches Problem? Kurz gesagt: eine Rechenaufgabe, deren Lösung
        aus einer oder mehreren Zahlen besteht. Drei typische Beispiele aus der
        Statistik: der Wert eines Integrals (etwa eine Wahrscheinlichkeit als Fläche
        unter einer Dichte), die Lösung eines{" "}
        <ConceptLink id="linear-system">linearen Gleichungssystems</ConceptLink> (etwa
        die Koeffizienten einer Regression) oder die{" "}
        <ConceptLink id="basis">Basis</ConceptLink>-Koeffizienten einer
        Funktionsapproximation. Allgemein fassen wir das so:
      </p>
      <EnvBlock kind="Definition" label="2.1.1 (Numerisches Problem)">
        <p>
          Ein <em>numerisches Problem</em> ist eine Aufgabe der Form:{" "}
          <em>
            Gegeben ein Problem <M>{"f"}</M> mit Input <M>{"\\bx"}</M>, berechne die
            Lösung <M>{"f(\\bx)"}</M>.
          </em>
        </p>
      </EnvBlock>
      <p className={P}>
        Die Schreibweise ist bewusst abstrakt: <M>{"f"}</M> ist die mathematische
        Abbildung von den Eingabedaten auf die exakte Lösung — beim Gleichungssystem{" "}
        <M>{"\\bA\\by = \\bb"}</M> etwa <M>{"f(\\bA, \\bb) = \\bA^{-1}\\bb"}</M>. Ob und
        wie wir <M>{"f(\\bx)"}</M> tatsächlich ausrechnen können, ist damit noch völlig
        offen. Genau da beginnen die Schwierigkeiten.
      </p>

      <h3 className={H3}>Zwei grundsätzliche Schwierigkeiten</h3>
      <p className={P}>
        Computer sind so gut wie nie exakt. Das liegt nicht an schlampiger Technik,
        sondern an zwei prinzipiellen Beschränkungen jeder endlichen Maschine:
      </p>
      <EnvBlock kind="Bemerkung" label="2.1.2 (Grenzen des Rechnens)">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Computer können nur <em>endlich viele Zahlen mit endlich vielen Stellen</em>{" "}
            darstellen. Schon
            <MD>{"\\pi = 3{,}141592653589793238462643383279\\ldots"}</MD>
            passt in keinen endlichen Speicher — gespeichert wird immer nur eine
            gerundete Näherung.
          </li>
          <li>
            Computer können nur <em>endlich viele Rechenoperationen</em> ausführen.
            Schon die harmlose Exponentialfunktion ist über eine{" "}
            <ConceptLink id="infinite-series">unendliche Reihe</ConceptLink> definiert,
            <MD>{"e^x = \\sum_{n = 0}^\\infty \\frac{x^n}{n!},"}</MD>
            und unendlich viele Summanden kann keine Maschine aufaddieren — jede
            Auswertung bricht irgendwo ab.
          </li>
        </ul>
      </EnvBlock>
      <p className={P}>
        Deshalb ist es wichtig, <em>wie</em> wir Dinge berechnen. Wie schlimm kann es
        schon sein? Testen Sie Ihre Intuition an vier kurzen R-Ausdrücken von den
        Folien — überlegen Sie sich jeweils zuerst selbst eine Vorhersage, bevor Sie
        die Lösung aufklappen:
      </p>
      <RSelbsttest />
      <p className={P}>
        Halten wir die Beobachtungen fest: Computer können nur endlich viele Zahlen
        darstellen. Das führt zu <em>Rundungsfehlern</em> (
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink>; ausführlich in
        Kapitel 3), und diese Fehler können sich <em>akkumulieren</em>. Der Fehler einer
        einzelnen Operation ist meist vernachlässigbar klein — gefährlich wird die Summe
        vieler kleiner Fehler. Und weil jede Operation frisch rundet, spielt sogar die{" "}
        <em>Reihenfolge</em> unserer Rechenschritte eine Rolle. Eine erste praktische
        Empfehlung, die wir gleich zweimal in Aktion sehen: besonders große und
        besonders kleine Zahlen im selben Ausdruck vermeiden.
      </p>

      <h3 className={H3}>Zwei warnende Beispiele</h3>
      <p className={P}>
        Die beiden folgenden Beispiele zeigen die zwei wichtigsten Mechanismen, mit
        denen Gleitkommarechnung schiefgeht. Beide sehen auf dem Papier völlig harmlos
        aus.
      </p>
      <EnvBlock kind="Beispiel" label="2.1.3 (Katastrophale Auslöschung)">
        <p>
          Wir berechnen die Varianz von <M>{"\\bx"}</M> mit der bekannten
          Verschiebungsformel
        </p>
        <MD>{"\\text{Var}(x) = \\cred{\\frac{1}{n}\\sumin x_i^2} - \\cblue{\\left(\\frac{1}{n}\\sumin x_i\\right)^2}"}</MD>
        <p>
          (wir teilen der Einfachheit halber durch <M>{"n"}</M> statt <M>{"n-1"}</M>; am
          Phänomen ändert das nichts). Die Daten sind vier kleine Zahlen, verschoben um
          eine große Konstante:
        </p>
        <MD>{"\\bx = \\left(4 + 10^9,\\; 7 + 10^9,\\; 13 + 10^9,\\; 16 + 10^9\\right)."}</MD>
        <p>
          Rechnen wir zunächst exakt. Der Mittelwert ist{" "}
          <M>{"\\bar{x} = 10^9 + 10"}</M>, die Abweichungen davon sind{" "}
          <M>{"-6, -3, 3, 6"}</M>, also
        </p>
        <MD>{"\\text{Var}(x) = \\frac{36 + 9 + 9 + 36}{4} = \\frac{90}{4} = 22{,}5."}</MD>
        <p>Für die beiden Terme der Verschiebungsformel gilt exakt</p>
        <MD>{"\\cred{\\frac{1}{n}\\sumin x_i^2} = 10^{18} + 2 \\cdot 10^{10} + 122{,}5, \\qquad \\cblue{\\bar{x}^2} = 10^{18} + 2 \\cdot 10^{10} + 100,"}</MD>
        <p>
          und die Differenz <M>{"\\cred{122{,}5} - \\cblue{100} = 22{,}5"}</M> stimmt.
          Aber: Beide Terme sind riesig (<M>{"\\approx 10^{18}"}</M>), und ihre gesamte
          Information über die Varianz steckt in den letzten drei Ziffern. Bei der
          Größenordnung <M>{"10^{18}"}</M> liegen benachbarte{" "}
          <ConceptLink id="floating-point">Gleitkommazahlen</ConceptLink> aber schon{" "}
          <M>{"128"}</M> auseinander — feiner kann die Maschine dort nicht auflösen. In
          R (Doppelpräzision) werden deshalb <em>beide</em> Terme auf dieselbe
          Maschinenzahl gerundet:
        </p>
        <MD>{"\\cred{1\\,000\\,000\\,020\\,000\\,000\\,128} - \\cblue{1\\,000\\,000\\,020\\,000\\,000\\,128} = 0."}</MD>
        <p>
          Die berechnete „Varianz" ist <M>{"0"}</M> statt <M>{"22{,}5"}</M> — nicht
          ungefähr falsch, sondern komplett informationsfrei. Die zweistufige Rechnung{" "}
          <M>{"\\frac{1}{n}\\sumin \\left(x_i - \\bar{x}\\right)^2"}</M> liefert dagegen
          exakt <M>{"22{,}5"}</M>, denn sie subtrahiert die großen Zahlen, <em>bevor</em>{" "}
          quadriert wird, und arbeitet danach nur noch mit den kleinen Abweichungen.
        </p>
        <p>
          <strong>Ursache</strong> des Desasters ist die Subtraktion zweier fast gleich
          großer Zahlen: Die übereinstimmenden führenden Ziffern heben sich weg, übrig
          bleiben nur die (verrauschten) hinteren Stellen. Dieses Phänomen heißt{" "}
          <em><ConceptLink id="cancellation">katastrophale Auslöschung</ConceptLink></em>{" "}
          (engl. <em>catastrophic cancellation</em>) und ist der Klassiker unter den
          numerischen Fallen.
        </p>
      </EnvBlock>
      <ExpandedReading title="Auslöschung zum Nachspielen: Ab welcher Verschiebung kippt die Varianz-Formel?">
        <AusloeschungDemo />
      </ExpandedReading>

      <EnvBlock kind="Beispiel" label="2.1.4 (Verletzte Assoziativität)">
        <p>
          Gleitkomma-Addition ist nicht assoziativ! Seien{" "}
          <M>{"\\cred{x = 10^{30}}"}</M>, <M>{"\\cblue{y = -10^{30}}"}</M> und{" "}
          <M>{"\\cgreen{z = 1}"}</M>. Mathematisch ist{" "}
          <M>{"x + y + z = 1"}</M>, egal wie wir klammern. Die Maschine rechnet:
        </p>
        <MD>{"(\\cred{x} + \\cblue{y}) + \\cgreen{z} = (\\cred{10^{30}} + \\cblue{(-10^{30})}) + \\cgreen{1} = 0 + \\cgreen{1} = 1,"}</MD>
        <MD>{"\\cred{x} + (\\cblue{y} + \\cgreen{z}) = \\cred{10^{30}} + (\\cblue{(-10^{30})} + \\cgreen{1}) \\;\\stackrel{!!}{\\approx}\\; \\cred{10^{30}} + \\cblue{(-10^{30})} = 0."}</MD>
        <p>
          Die erste Klammerung ist exakt: <M>{"\\cred{x} + \\cblue{y} = 0"}</M> löscht
          die riesigen Zahlen sauber aus, danach überlebt die <M>{"\\cgreen{1}"}</M>. In
          der zweiten Klammerung muss die Maschine{" "}
          <M>{"\\cblue{-10^{30}} + \\cgreen{1}"}</M> als Gleitkommazahl speichern — aber
          bei der Größenordnung <M>{"10^{30}"}</M> liegen benachbarte Maschinenzahlen
          etwa <M>{"10^{14}"}</M> auseinander. Die <M>{"\\cgreen{1}"}</M> ist viel
          kleiner als diese Auflösung, das Zwischenergebnis wird auf{" "}
          <M>{"\\cblue{-10^{30}}"}</M> zurückgerundet, und am Ende steht <M>{"0"}</M>{" "}
          statt <M>{"1"}</M>.
        </p>
        <p>
          <M>{"\\impl"}</M> Die Reihenfolge (Klammerung) einer Summe beeinflusst das
          Ergebnis. Genau das haben wir oben im Selbsttest bei{" "}
          <code>sum(x) - sum(rev(x))</code> beobachtet: vorwärts und rückwärts summiert
          ergeben dieselben <M>{"10^5"}</M> Zahlen verschiedene Summen.
        </p>
      </EnvBlock>
      <ExpandedReading title="Assoziativität zum Nachspielen: Wann verschluckt 10^k die 1?">
        <AssoziativDemo />
      </ExpandedReading>

      <h3 id="sec-2.1-algorithmen" className={H3}>
        Algorithmen
      </h3>
      <p className={P}>
        Die Beispiele zeigen: Zum numerischen Problem <M>{"f"}</M> gehört immer noch
        eine zweite Zutat — die konkrete Rechenvorschrift, mit der wir <M>{"f(\\bx)"}</M>{" "}
        zu berechnen versuchen. Für dieselbe Varianz gab es zwei Vorschriften mit
        drastisch verschiedenem Ausgang. Diese zweite Zutat bekommt jetzt einen Namen:
      </p>
      <EnvBlock kind="Definition" label="2.1.5 (Algorithmus)">
        <p>
          Ein <em>Algorithmus</em> ist ein Verfahren{" "}
          <M>{"\\wt{f} = \\wt{f}_s \\circ \\cdots \\circ \\wt{f}_1"}</M>, das für Inputs{" "}
          <M>{"\\bx"}</M> eine mögliche Lösung <M>{"\\wt{f}(\\bx)"}</M> berechnet.
        </p>
      </EnvBlock>
      <p className={P}>
        Lesen wir die Definition genau. Ein Algorithmus ist eine{" "}
        <ConceptLink id="function-composition">Verkettung</ConceptLink>{" "}
        <M>{"\\wt{f}_s \\circ \\cdots \\circ \\wt{f}_1"}</M> endlich vieler elementarer
        Rechenschritte <M>{"\\wt{f}_1, \\ldots, \\wt{f}_s"}</M> — erst wird{" "}
        <M>{"\\wt{f}_1"}</M> auf den Input angewandt, dann <M>{"\\wt{f}_2"}</M> auf
        dessen Ergebnis, und so weiter. Die Tilde ist Programm: <M>{"\\wt{f}"}</M> ist
        nicht dasselbe wie <M>{"f"}</M>, sondern nur ein Versuch, <M>{"f"}</M>{" "}
        nachzubauen — die Definition verspricht vorsichtig nur eine „mögliche Lösung".
        Wie gut <M>{"\\wt{f}(\\bx)"}</M> die wahre Lösung <M>{"f(\\bx)"}</M> trifft, ist
        genau die Frage, die uns in Kapitel 3 beschäftigen wird. Zu einem Problem{" "}
        <M>{"f"}</M> gibt es dabei meist viele verschiedene Algorithmen, und sie
        unterscheiden sich in Genauigkeit <em>und</em> Rechenaufwand.
      </p>
      <EnvBlock kind="Bemerkung" label="2.1.6 (Arten von Algorithmen)">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <em>exakt/direkt</em>: Es gilt <M>{"f(\\bx) = \\wt{f}(\\bx)"}</M> (bis auf
            Rundungsfehler). Beispiel: das{" "}
            <ConceptLink id="gaussian-elimination">Gauß-Verfahren</ConceptLink> für
            lineare Gleichungssysteme — nach endlich vielen Schritten steht die exakte
            Lösung da, wäre da nicht die Gleitkommarundung.
          </li>
          <li>
            <em>approximativ</em>: Es gilt lediglich{" "}
            <M>{"f(\\bx) \\approx \\wt{f}(\\bx)"}</M> — schon in exakter Arithmetik.
            Beispiel: die nach endlich vielen Summanden abgebrochene Reihe für{" "}
            <M>{"e^x"}</M>.
          </li>
          <li>
            <em>iterativ</em>: Dieselbe Vorschrift wird mehrfach ausgeführt, und jede
            Wiederholung verbessert die aktuelle Näherung. Beispiel: das{" "}
            <ConceptLink id="newtons-method">Newton-Verfahren</ConceptLink> oder das{" "}
            <ConceptLink id="gradient-descent">Gradientenverfahren</ConceptLink>.
          </li>
          <li>
            <em>probabilistisch</em>: Das Verfahren beruht auf Zufall — es würfelt.
            Beispiel: Monte-Carlo-Integration, die ein Integral durch den Mittelwert
            zufällig gezogener Funktionswerte schätzt.
          </li>
        </ul>
        <p>
          Die Kategorien schließen sich nicht aus: Das stochastische Gradientenverfahren
          etwa, das Arbeitspferd des maschinellen Lernens, ist iterativ, approximativ und
          probabilistisch zugleich.
        </p>
      </EnvBlock>
      <p className={P}>
        Im nächsten Abschnitt sehen wir an einem klassischen Beispiel — den
        Fibonacci-Zahlen —, dass zwei exakte Algorithmen für dasselbe Problem sich im
        Rechenaufwand so drastisch unterscheiden können, dass der eine praktisch
        unbrauchbar ist.
      </p>

      <p className="my-3 max-w-prose italic">
        Vertiefung: Heath §1.1–1.2 (wissenschaftliches Rechnen, Näherungen und
        Fehlerquellen); die Gleitkomma-Arithmetik hinter den Beispielen behandelt
        Heath §1.3 — und unser Kapitel 3.
      </p>
    </>
  );
}
