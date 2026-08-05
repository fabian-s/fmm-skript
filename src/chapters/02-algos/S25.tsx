import { useState } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S25FibVergleichWidget } from "./widgets/S25FibVergleich";

/**
 * Abschnitt 2.5 — Fibonacci: Komplexitätsanalyse.
 * Quelle: Folien 02-algos.Rmd, „Fibonacci: Komplexitätsanalyse 1/2" und
 * „Wrap-up". Prosa eigenständig aus den Folien formuliert.
 */

const H3 = "mt-6 text-lg font-semibold";

export function S25() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 02-algos, „Fibonacci: Komplexitätsanalyse" und „Wrap-up".
      </p>
      <p>
        Jetzt wird geerntet. In{" "}
        <a className="underline" href="#sec-2.2">Abschnitt 2.2</a> haben wir zwei Algorithmen
        für dasselbe Problem kennengelernt — die ersten <M>{"n"}</M> Fibonacci-Zahlen zu
        berechnen — und im Widget dort beobachtet, dass die rekursive Variante schon für
        moderate <M>{"n"}</M> unangenehm viele Aufrufe produziert. In{" "}
        <a className="underline" href="#sec-2.3">Abschnitt 2.3</a> haben wir gelernt, Aufwand
        zu zählen, und in <a className="underline" href="#sec-2.4">Abschnitt 2.4</a>, die
        Zählerei mit Landau-Symbolen auf ihre Ordnung einzudampfen. Mit diesen Werkzeugen
        können wir den Unterschied zwischen beiden Varianten nun präzise machen — und er ist
        drastischer, als man zunächst vermuten würde: Es geht nicht um einen konstanten
        Faktor, sondern um <em>linear gegen exponentiell</em>.
      </p>

      <h3 id="sec-2.5.1" className={H3}>
        2.5.1 Die iterative Variante: linearer Aufwand
      </h3>
      <p>
        Erinnern wir uns an den iterativen Algorithmus aus{" "}
        <a className="underline" href="#sec-2.2">Abschnitt 2.2</a>: Er legt einen
        Ergebnisvektor der Länge <M>{"n"}</M> an, setzt die Startwerte{" "}
        <M>{"x_1 = 0"}</M> und <M>{"x_2 = 1"}</M> und füllt dann in einer einzigen Schleife
        jeden weiteren Eintrag als Summe seiner beiden Vorgänger:{" "}
        <M>{"x_{i+1} = x_i + x_{i-1}"}</M> für <M>{"i = 2, \\dots, n-1"}</M>. Zählen wir die
        Schritte — so wie wir es beim{" "}
        <ConceptLink id="matrix-vector-product">Matrix-Vektor-Produkt</ConceptLink> in{" "}
        <a className="underline" href="#sec-2.3">Abschnitt 2.3</a> geübt haben.
      </p>
      <EnvBlock kind="Satz" label="2.5.1 (Komplexität der iterativen Variante)">
        <p>
          Der iterative Fibonacci-Algorithmus berechnet die ersten <M>{"n"}</M>{" "}
          Fibonacci-Zahlen mit Zeitkomplexität <M>{"\\cblue{O(n)}"}</M> und
          Speicherkomplexität <M>{"O(n)"}</M>.
        </p>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              das Anlegen des Ergebnisvektors schreibt <M>{"n"}</M> Nullen — eine
              Schreiboperation pro Eintrag
            </>
          }
        >
          <p>
            <em>Initialisierung:</em> <M>{"n"}</M> Operationen.
          </p>
        </PStep>
        <PStep
          why={
            <>
              die Schleife durchläuft <M>{"i = 2, \\dots, n-1"}</M>, das sind{" "}
              <M>{"(n-1) - 2 + 1 = n-2"}</M> Durchläufe; pro Durchlauf zählen die Folien 2
              Additionen und 1 Zuweisung — man könnte auch die Indexrechnungen{" "}
              <M>{"i+1"}</M>, <M>{"i-1"}</M> mitzählen, für die Ordnung ist das egal
              (Bemerkung 2.5.2)
            </>
          }
        >
          <MD>{"\\text{Schleife: } (n-2) \\cdot 3 \\text{ Operationen.}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Summen- und Dominanzregel aus{" "}
              <a className="underline" href="#sec-2.4">Abschnitt 2.4</a>: mit{" "}
              <M>{"n = O(n)"}</M> und <M>{"1 = O(n)"}</M> ist{" "}
              <M>{"O(n) + O(n) + O(1) = O(n)"}</M>; die Konstante <M>{"c"}</M> deckt
              Funktionsaufruf und die beiden <M>{"\\texttt{if}"}</M>-Abfragen ab
            </>
          }
        >
          <MD>{"\\cblue{a_n} = n + 3\\,(n-2) + c = 4n + (c - 6) \\quimpl \\cblue{a_n = O(n)}."}</MD>
        </PStep>
        <PStep
          why={
            <>
              gespeichert werden der Vektor <M>{"\\bx"}</M> mit <M>{"n"}</M> Einträgen und
              konstant viele Hilfsgrößen (<M>{"n"}</M>, Laufindex <M>{"i"}</M>)
            </>
          }
        >
          <p>
            <em>Speicher:</em> <M>{"n + O(1) = O(n)"}</M> Speicherzellen.
          </p>
        </PStep>
      </Proof>
      <EnvBlock kind="Bemerkung" label="2.5.2 (Zählen ist Konvention — die Ordnung nicht)">
        <p>
          Ob wir pro Schleifendurchlauf 3, 5 oder 10 Elementaroperationen ansetzen, ändert am
          Ergebnis nichts: Jede konstante Zahl von Operationen pro Durchlauf liefert einen
          Gesamtaufwand der Form <M>{"c_1 n + c_2"}</M>, und der ist immer{" "}
          <M>{"\\cblue{O(n)}"}</M>. Genau dafür haben wir die Landau-Notation in{" "}
          <a className="underline" href="#sec-2.4">Abschnitt 2.4</a> eingeführt: Sie macht
          die Analyse unabhängig von solchen Zählkonventionen. Schneller als linear geht es
          für dieses Problem übrigens prinzipiell nicht — allein das Hinschreiben der{" "}
          <M>{"n"}</M> Ergebniszahlen kostet schon <M>{"n"}</M> Schritte. Die iterative
          Variante ist also ordnungsoptimal.
        </p>
      </EnvBlock>

      <h3 id="sec-2.5.2" className={H3}>
        2.5.2 Die naive Rekursion: exponentieller Aufwand
      </h3>
      <p>
        Die zweite Variante aus <a className="underline" href="#sec-2.2">Abschnitt 2.2</a>{" "}
        übersetzt die mathematische Definition wörtlich in Code: Eine Funktion{" "}
        <M>{"\\texttt{fib\\_rek}(n)"}</M> gibt für <M>{"n \\le 1"}</M> direkt <M>{"n"}</M>{" "}
        zurück und ruft sich sonst zweimal selbst auf, mit <M>{"n-1"}</M> und{" "}
        <M>{"n-2"}</M>, und addiert die Ergebnisse. In R (auf den Folien heißt die Funktion{" "}
        <M>{"\\texttt{fib\\_recursive}"}</M>):
      </p>
      <pre className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-sm dark:bg-slate-900/60">
        <code>
          {
            "fib_rek <- function(n) {\n  if (n <= 1) {\n    return(n)\n  }\n  return(fib_rek(n - 1) + fib_rek(n - 2))\n}"
          }
        </code>
      </pre>
      <p>
        Das ist verführerisch elegant — der Code <em>ist</em> praktisch die Rekursionsformel.
        Aber die Eleganz täuscht.
      </p>
      <EnvBlock kind="Bemerkung" label="2.5.3 (Was wird hier eigentlich berechnet?)">
        <p>
          Zwei Feinheiten, die die Folien stillschweigend übergehen: Erstens berechnet{" "}
          <M>{"\\texttt{fib\\_rek}(n)"}</M> nur eine <em>einzelne</em> Fibonacci-Zahl{" "}
          <M>{"F_n"}</M> (mit der Zählung <M>{"F_0 = 0"}</M>, <M>{"F_1 = 1"}</M>,{" "}
          <M>{"F_n = F_{n-1} + F_{n-2}"}</M>), nicht den ganzen Vektor der ersten{" "}
          <M>{"n"}</M> Zahlen; in der Notation aus{" "}
          <a className="underline" href="#sec-2.2">Abschnitt 2.2</a> gilt{" "}
          <M>{"F_n = x_{n+1}"}</M>. Zweitens macht das den Vergleich nicht etwa unfair,
          sondern erst recht vernichtend: Die Rekursion braucht schon für <em>eine</em> Zahl
          exponentiell viele Schritte, während die Iteration <em>alle</em> ersten{" "}
          <M>{"n"}</M> Zahlen in <M>{"\\cblue{O(n)}"}</M> liefert.
        </p>
      </EnvBlock>
      <p>
        Was kostet ein Aufruf von <M>{"\\texttt{fib\\_rek}(n)"}</M>? Außer den beiden
        rekursiven Aufrufen passiert pro Aufruf nur konstant viel (ein Vergleich, eine
        Addition). Das richtige Aufwandsmaß ist deshalb die <em>Gesamtzahl der
        Funktionsaufrufe</em>: Nennen wir sie <M>{"\\cred{T(n)}"}</M>, den Startaufruf
        mitgezählt. Diese <ConceptLink id="sequence">Folge</ConceptLink> erbt die
        Fibonacci-Struktur des Algorithmus:
      </p>
      <EnvBlock kind="Lemma" label="2.5.4 (Rekurrenz der Aufrufzahl)">
        <p>
          Die Aufrufzahl <M>{"\\cred{T(n)}"}</M> von <M>{"\\texttt{fib\\_rek}(n)"}</M>{" "}
          erfüllt
        </p>
        <MD>{"\\cred{T(0)} = \\cred{T(1)} = 1, \\qquad \\cred{T(n)} = 1 + \\cred{T(n-1)} + \\cred{T(n-2)} \\quad (n \\ge 2)."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              für <M>{"n \\le 1"}</M> greift die Abbruchbedingung: Die Funktion kehrt sofort
              zurück, ohne sich selbst aufzurufen
            </>
          }
        >
          <p>
            Für <M>{"n \\in \\{0, 1\\}"}</M> gibt es genau einen Aufruf, also{" "}
            <M>{"\\cred{T(0)} = \\cred{T(1)} = 1"}</M>.
          </p>
        </PStep>
        <PStep
          why={
            <>
              der Aufrufbaum von <M>{"\\texttt{fib\\_rek}(n)"}</M> besteht aus der Wurzel
              (dem Aufruf selbst) und den beiden vollständigen Teilbäumen der rekursiven
              Aufrufe
            </>
          }
        >
          <MD>{"\\cred{T(n)} = \\underbrace{1}_{\\text{Aufruf selbst}} + \\underbrace{\\cred{T(n-1)}}_{\\texttt{fib\\_rek}(n-1)} + \\underbrace{\\cred{T(n-2)}}_{\\texttt{fib\\_rek}(n-2)}."}</MD>
        </PStep>
      </Proof>
      <p>
        Bevor wir <M>{"\\cred{T(n)}"}</M> allgemein abschätzen, sehen wir uns den
        Aufrufbaum einmal konkret an — dann ist auch sofort klar, <em>woher</em> die
        Explosion kommt.
      </p>
      <EnvBlock kind="Beispiel" label="2.5.5 (Der Aufrufbaum für n = 5)">
        <p>
          Der Aufruf <M>{"\\texttt{fib\\_rek}(5)"}</M> erzeugt den folgenden Baum (jeder
          Knoten ist ein Funktionsaufruf):
        </p>
        <pre className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-xs leading-relaxed dark:bg-slate-900/60">
          {"fib_rek(5)\n├── fib_rek(4)\n│   ├── "}
          <span style={{ color: "#D55E00", fontWeight: 600 }}>{"fib_rek(3)"}</span>
          {"          ← 1. Berechnung von F(3)\n│   │   ├── fib_rek(2)\n│   │   │   ├── fib_rek(1)\n│   │   │   └── fib_rek(0)\n│   │   └── fib_rek(1)\n│   └── fib_rek(2)\n│       ├── fib_rek(1)\n│       └── fib_rek(0)\n└── "}
          <span style={{ color: "#D55E00", fontWeight: 600 }}>{"fib_rek(3)"}</span>
          {"              ← 2. Berechnung: komplett doppelte Arbeit\n    ├── fib_rek(2)\n    │   ├── fib_rek(1)\n    │   └── fib_rek(0)\n    └── fib_rek(1)"}
        </pre>
        <p>
          Zählen wir nach: <M>{"F_5"}</M> und <M>{"F_4"}</M> werden je einmal berechnet,{" "}
          <M>{"F_3"}</M> aber <M>{"\\cred{2}"}</M>-mal, <M>{"F_2"}</M> schon{" "}
          <M>{"\\cred{3}"}</M>-mal, <M>{"F_1"}</M> sogar <M>{"\\cred{5}"}</M>-mal und{" "}
          <M>{"F_0"}</M> noch <M>{"\\cred{3}"}</M>-mal — zusammen{" "}
          <M>{"1 + 1 + 2 + 3 + 5 + 3 = \\cred{15}"}</M> Aufrufe. Das passt zum Lemma: Aus{" "}
          <M>{"\\cred{T(2)} = 3"}</M> und <M>{"\\cred{T(3)} = 1 + 3 + 1 = 5"}</M> folgt{" "}
          <M>{"\\cred{T(4)} = 1 + 5 + 3 = 9"}</M> und{" "}
          <M>{"\\cred{T(5)} = 1 + 9 + 5 = \\cred{15}"}</M>. <M>{"\\checkmark"}</M>
        </p>
        <p>
          Die Wurzel des Übels ist rot markiert: Der komplette Teilbaum unter{" "}
          <M>{"\\texttt{fib\\_rek}(3)"}</M> wird zweimal durchgerechnet, denn die Rekursion
          „vergisst" alles, was sie schon berechnet hat. Bei größerem <M>{"n"}</M>{" "}
          verdoppeln sich diese Dopplungen immer weiter — die iterative Variante berechnet
          dagegen jede Zahl genau einmal, weil sie die Zwischenergebnisse im Vektor
          aufbewahrt.
        </p>
      </EnvBlock>
      <p>
        Jetzt die allgemeine Analyse. Die Folien argumentieren kurz und bündig: Jeder Aufruf
        erzeugt bis zu 2 weitere Aufrufe, diese wieder je 2, und so fort über bis zu{" "}
        <M>{"n"}</M> Ebenen — insgesamt höchstens{" "}
        <M>{"1 + 2 + 4 + \\dots + 2^n"}</M> Aufrufe, also <M>{"O(2^n)"}</M>. Das folgende
        Resultat macht dieses Argument präzise und ergänzt die Gegenrichtung: Das Wachstum
        ist auch wirklich exponentiell, nicht nur durch eine Exponentialfunktion beschränkt.
      </p>
      <EnvBlock kind="Satz" label="2.5.6 (Exponentielle Laufzeit der naiven Rekursion)">
        <p>Für alle <M>{"n \\ge 0"}</M> gilt</p>
        <MD>{"\\left(\\sqrt{2}\\right)^{n-1} \\;\\le\\; \\cred{T(n)} \\;\\le\\; 2^{n+1} - 1."}</MD>
        <p>
          Insbesondere ist <M>{"\\cred{T(n)} = O(2^n)"}</M>, und für jedes feste{" "}
          <M>{"k \\in \\N"}</M> gilt <M>{"n^k = o\\left(\\cred{T(n)}\\right)"}</M>: Die
          Aufrufzahl wächst exponentiell und überholt jedes Polynom. Die Speicherkomplexität
          ist dagegen nur <M>{"O(n)"}</M>.
        </p>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              Induktionsanfang: <M>{"\\cred{T(0)} = \\cred{T(1)} = 1"}</M> und{" "}
              <M>{"2^1 - 1 = 1"}</M>, <M>{"2^2 - 1 = 3"}</M>
            </>
          }
        >
          <p>
            <em>Obere Schranke</em>, per vollständiger Induktion: Für <M>{"n \\le 1"}</M>{" "}
            gilt <M>{"\\cred{T(n)} \\le 2^{n+1} - 1"}</M>.
          </p>
        </PStep>
        <PStep
          why={
            <>
              Rekurrenz aus Lemma 2.5.4, dann Induktionsvoraussetzung für <M>{"n-1"}</M> und{" "}
              <M>{"n-2"}</M> einsetzen; zuletzt{" "}
              <M>{"2^n + 2^{n-1} = 3 \\cdot 2^{n-1} \\le 4 \\cdot 2^{n-1} = 2^{n+1}"}</M>
            </>
          }
        >
          <MD>{"\\cred{T(n)} = 1 + \\cred{T(n-1)} + \\cred{T(n-2)} \\le 1 + \\left(2^{n} - 1\\right) + \\left(2^{n-1} - 1\\right) = 2^n + 2^{n-1} - 1 \\le 2^{n+1} - 1."}</MD>
        </PStep>
        <PStep
          why={
            <>
              Definition von <M>{"O"}</M> aus{" "}
              <a className="underline" href="#sec-2.4">Abschnitt 2.4</a>:{" "}
              <M>{"\\cred{T(n)}/2^n \\le 2"}</M> für alle <M>{"n"}</M>, der Limes superior
              ist also endlich
            </>
          }
        >
          <MD>{"\\cred{T(n)} = O(2^n)."}</MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\cred{T}"}</M> ist monoton wachsend — in der Rekurrenz kommt zu{" "}
              <M>{"\\cred{T(n-1)}"}</M> nur Positives hinzu —, also{" "}
              <M>{"\\cred{T(n-1)} \\ge \\cred{T(n-2)}"}</M>
            </>
          }
        >
          <p>
            <em>Untere Schranke:</em> Für <M>{"n \\ge 2"}</M> ist
          </p>
          <MD>{"\\cred{T(n)} \\ge \\cred{T(n-1)} + \\cred{T(n-2)} \\ge 2\\,\\cred{T(n-2)}."}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Ungleichung <M>{"\\lfloor n/2 \\rfloor"}</M>-mal anwenden — bei jedem
              Schritt verdoppelt sich der Faktor wie bei einer{" "}
              <ConceptLink id="geometric-series">geometrischen Folge</ConceptLink>, bis das
              Argument <M>{"0"}</M> oder <M>{"1"}</M> erreicht (dort ist{" "}
              <M>{"\\cred{T} = 1"}</M>); schließlich{" "}
              <M>{"\\lfloor n/2 \\rfloor \\ge (n-1)/2"}</M>
            </>
          }
        >
          <MD>{"\\cred{T(n)} \\ge 2\\,\\cred{T(n-2)} \\ge 4\\,\\cred{T(n-4)} \\ge \\dots \\ge 2^{\\lfloor n/2 \\rfloor} \\ge 2^{(n-1)/2} = \\left(\\sqrt{2}\\right)^{n-1}."}</MD>
        </PStep>
        <PStep
          why={
            <>
              exponentiell schlägt polynomiell: Der{" "}
              <ConceptLink id="limit">Grenzwert</ConceptLink>{" "}
              <M>{"n^k / q^n \\to 0"}</M> für jedes <M>{"q > 1"}</M> ist ein
              Analysis-Standardresultat — hier mit <M>{"q = \\sqrt{2}"}</M>
            </>
          }
        >
          <MD>{"\\frac{n^k}{\\cred{T(n)}} \\le \\frac{n^k}{\\left(\\sqrt{2}\\right)^{n-1}} \\longrightarrow 0 \\quimpl n^k = o\\left(\\cred{T(n)}\\right)."}</MD>
        </PStep>
        <PStep
          why={
            <>
              gleichzeitig „offen" ist immer nur der Pfad von der Wurzel zum aktuellen
              Aufruf; der längste Pfad <M>{"n \\to n-1 \\to \\dots \\to 1"}</M> hat Länge{" "}
              <M>{"n"}</M>
            </>
          }
        >
          <p>
            <em>Speicher:</em> Der Aufrufbaum hat zwar exponentiell viele Knoten, aber er
            steht nie ganz gleichzeitig im Speicher: Auf dem Aufruf-Stapel (call stack)
            liegen höchstens <M>{"n"}</M> offene Aufrufe, also <M>{"O(n)"}</M>{" "}
            Speicherzellen.
          </p>
        </PStep>
      </Proof>
      <EnvBlock kind="Bemerkung" label="2.5.7 (Wie schlimm ist es wirklich?)">
        <p>
          Zwischen unserer unteren Schranke (Basis <M>{"\\sqrt{2} \\approx 1{,}41"}</M>) und
          der oberen (Basis <M>{"2"}</M>) klafft noch eine Lücke — die Folienangabe{" "}
          <M>{"O(2^n)"}</M> ist eine korrekte obere Schranke, aber nicht scharf. Der wahre
          Wachstumsfaktor liegt dazwischen und ist eine alte Bekannte: der goldene Schnitt{" "}
          <M>{"\\varphi \\approx 1{,}618"}</M> (Vertiefung unten). Für das Urteil{" "}
          <em>„katastrophal langsam"</em> ist das aber einerlei: Jede Basis{" "}
          <M>{"q > 1"}</M> bedeutet, dass eine um <M>{"1"}</M> größere Eingabe den Aufwand
          um den <em>Faktor</em> <M>{"q"}</M> vervielfacht.
        </p>
      </EnvBlock>
      <ExpandedReading title="Der goldene Schnitt im Aufrufbaum">
        <div className="space-y-3">
          <p className="max-w-prose">
            Die Aufrufzahl lässt sich sogar exakt angeben — und sie ist selbst fast eine
            Fibonacci-Zahl. Per Induktion zeigen wir{" "}
            <M>{"\\cred{T(n)} = 2 F_{n+1} - 1"}</M>: Der Anfang stimmt wegen{" "}
            <M>{"\\cred{T(0)} = 1 = 2 F_1 - 1"}</M> und{" "}
            <M>{"\\cred{T(1)} = 1 = 2 F_2 - 1"}</M>, und der Schritt folgt direkt aus der
            Rekurrenz:
          </p>
          <MD>{"\\cred{T(n)} = 1 + \\left(2 F_n - 1\\right) + \\left(2 F_{n-1} - 1\\right) = 2\\left(F_n + F_{n-1}\\right) - 1 = 2 F_{n+1} - 1."}</MD>
          <p className="max-w-prose">
            Für die Fibonacci-Zahlen selbst gilt die Binet-Formel{" "}
            <M>{"F_n = \\left(\\varphi^n - \\psi^n\\right)/\\sqrt{5}"}</M> mit{" "}
            <M>{"\\varphi = \\left(1 + \\sqrt{5}\\right)/2 \\approx 1{,}618"}</M> (dem
            goldenen Schnitt) und <M>{"\\psi = 1 - \\varphi \\approx -0{,}618"}</M>. Weil{" "}
            <M>{"|\\psi| < 1"}</M> ist, stirbt der zweite Term aus, und es bleibt{" "}
            <M>{"F_{n+1} \\approx \\varphi^{n+1}/\\sqrt{5}"}</M>, also
          </p>
          <MD>{"\\cred{T(n)} = \\Theta\\left(\\varphi^n\\right), \\qquad \\varphi \\approx 1{,}618."}</MD>
          <p className="max-w-prose">
            Das tatsächliche Wachstum hat also die Basis <M>{"\\varphi"}</M> — sauber
            zwischen unseren Schranken <M>{"\\sqrt{2}"}</M> und <M>{"2"}</M>. Im Widget
            unten können wir das sehen: Auf der logarithmischen Skala liegen die gezählten
            Aufrufe exakt auf einer Geraden mit Steigung{" "}
            <M>{"\\log_{10} \\varphi \\approx 0{,}209"}</M>, nicht auf der steileren{" "}
            <M>{"2^n"}</M>-Geraden.
          </p>
        </div>
      </ExpandedReading>

      <h3 id="sec-2.5.3" className={H3}>
        2.5.3 Der Vergleich: Ordnung schlägt Konstante
      </h3>
      <p>
        Was bedeuten <M>{"\\cblue{O(n)}"}</M> gegen <M>{"\\cred{O(2^n)}"}</M> in echten
        Zahlen? Setzen wir unsere gezählten Aufwände ein — iterativ{" "}
        <M>{"\\cblue{4n - 6}"}</M> Operationen (die additive Konstante <M>{"c"}</M> aus dem
        Beweis von Satz 2.5.1 lassen wir weg), naiv rekursiv{" "}
        <M>{"\\cred{T(n) = 2F_{n+1} - 1}"}</M> Aufrufe — und rechnen als grobes Modell mit{" "}
        <M>{"10^9"}</M> Elementarschritten pro Sekunde (ein realer Funktionsaufruf in R
        kostet deutlich mehr, das macht es nur schlimmer):
      </p>
      <div className="max-w-prose overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr className="border-b border-slate-300 text-left dark:border-slate-600">
              <th className="py-1 pr-6"><M>{"n"}</M></th>
              <th className="py-1 pr-6">
                iterativ (<M>{"\\cblue{4n-6}"}</M>)
              </th>
              <th className="py-1 pr-6">
                naiv (<M>{"\\cred{T(n)}"}</M>)
              </th>
              <th className="py-1">Zeit naiv (Modell)</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            <tr>
              <td className="py-1 pr-6">20</td>
              <td className="py-1 pr-6">74</td>
              <td className="py-1 pr-6">21 891</td>
              <td className="py-1">≈ 22 µs</td>
            </tr>
            <tr>
              <td className="py-1 pr-6">30</td>
              <td className="py-1 pr-6">114</td>
              <td className="py-1 pr-6">2 692 537</td>
              <td className="py-1">≈ 2,7 ms</td>
            </tr>
            <tr>
              <td className="py-1 pr-6">50</td>
              <td className="py-1 pr-6">194</td>
              <td className="py-1 pr-6">≈ 4,1 · 10¹⁰</td>
              <td className="py-1">≈ 41 s</td>
            </tr>
            <tr>
              <td className="py-1 pr-6">100</td>
              <td className="py-1 pr-6">394</td>
              <td className="py-1 pr-6">≈ 1,1 · 10²¹</td>
              <td className="py-1">≈ 36 000 Jahre</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Die iterative Spalte bleibt dabei durchgehend im Nanosekundenbereich. Das ist die
        zentrale Botschaft dieses Kapitels: Der Unterschied zwischen den beiden Varianten
        ist kein Implementierungsdetail und keine Frage schnellerer Hardware — ein tausendmal
        schnellerer Rechner verschiebt die <M>{"36\\,000"}</M> Jahre lediglich auf{" "}
        <M>{"36"}</M> Jahre. Nur ein <em>besserer Algorithmus</em> hilft, und die
        Landau-Notation ist das Instrument, mit dem wir „besser" präzise ausdrücken:{" "}
        <em>Die iterative Lösung ist dramatisch effizienter — sie liegt in einer anderen
        Komplexitätsklasse.</em>
      </p>
      <ExpandedReading title="Gezählte Schritte gegen die Landau-Vorhersage — live">
        <S25FibVergleichWidget />
      </ExpandedReading>
      <p>
        Dass im Widget die <ConceptLink id="logarithm">logarithmische</ConceptLink> Skala
        nötig ist, um beide Varianten überhaupt in ein gemeinsames Bild zu bekommen, ist
        dabei selbst schon die halbe Pointe.
      </p>

      <h3 id="sec-2.5-quiz" className={H3}>
        Selbsttest
      </h3>
      <p>
        Vier Aussagen zu diesem Abschnitt — welche sind wahr?
      </p>
      <QuizWidget />

      <h3 id="sec-2.5-summary" className={H3}>
        Zusammenfassung des Kapitels
      </h3>
      <p>
        In diesem Kapitel haben wir den Grundwortschatz der Vorlesung aufgebaut: Ein{" "}
        <em>numerisches Problem</em> ist eine Abbildung <M>{"f"}</M>, die Eingabedaten{" "}
        <M>{"\\bx"}</M> eine gesuchte Lösung <M>{"f(\\bx)"}</M> zuordnet, und ein{" "}
        <em>Algorithmus</em> ist eine endliche Folge elementarer Rechenschritte, die diese
        Lösung exakt oder näherungsweise berechnet (
        <a className="underline" href="#sec-2.1">Abschnitte 2.1</a>–
        <a className="underline" href="#sec-2.2">2.2</a>). Gute Algorithmen erkennen wir
        daran, dass sie mit wenig Laufzeit und Speicher auskommen; beides messen wir als
        Funktion der Problemgröße <M>{"n"}</M> (
        <a className="underline" href="#sec-2.3">Abschnitt 2.3</a>) und beschreiben es nur
        noch durch seine Ordnung — mit Landau-Symbolen und ihren Rechenregeln (
        <a className="underline" href="#sec-2.4">Abschnitt 2.4</a>). Die Fibonacci-Fallstudie
        dieses Abschnitts hat gezeigt, wie viel diese komprimierte Sprache leistet:{" "}
        <M>{"\\cblue{O(n)}"}</M> gegen <M>{"\\cred{O(2^n)}"}</M> ist der Unterschied
        zwischen „sofort fertig" und „Jahrtausende". Im nächsten Kapitel kommt die zweite
        Gütedimension hinzu: Was passiert mit schnellen Algorithmen, wenn jede einzelne
        Rechenoperation kleine{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> macht? Das führt uns
        zu Kondition und Stabilität.
      </p>

      <p className="mt-8 text-sm italic text-slate-600 dark:text-slate-400">
        Vertiefung: Heath §1.1 (wissenschaftliches Rechnen: Probleme, Algorithmen und die
        Rolle des Aufwands).
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Selbsttest (eigene Fragen zum Abschnitt, Stil wie Kapitel 7)        */
/* ------------------------------------------------------------------ */

const QUIZ: { statement: React.ReactNode; wahr: boolean; expl: React.ReactNode }[] = [
  {
    statement: (
      <>
        Die Laufzeit der iterativen Variante ist <M>{"O(n^2)"}</M>.
      </>
    ),
    wahr: true,
    expl: (
      <>
        <M>{"O"}</M> ist nur eine <em>obere</em> Schranke: <M>{"4n - 6"}</M> wächst
        höchstens so schnell wie <M>{"n^2"}</M>, also gilt <M>{"O(n^2)"}</M> — die Aussage
        ist wahr, aber wenig informativ. Die scharfe Beschreibung ist{" "}
        <M>{"O(n)"}</M>, und mehr noch: <M>{"4n - 6"}</M> ist sogar <M>{"o(n^2)"}</M>.
      </>
    ),
  },
  {
    statement: (
      <>
        Die naive Rekursion braucht exponentiell viel <em>Speicher</em>, weil ihr
        Aufrufbaum exponentiell viele Knoten hat.
      </>
    ),
    wahr: false,
    expl: (
      <>
        Der Baum wird nie ganz gleichzeitig gespeichert: Auf dem Aufruf-Stapel liegt immer
        nur der aktive Pfad von der Wurzel zum aktuellen Aufruf, und der ist höchstens{" "}
        <M>{"n"}</M> Aufrufe lang — Speicherkomplexität <M>{"O(n)"}</M> (Satz 2.5.6).
        Exponentiell ist nur die <em>Zeit</em>.
      </>
    ),
  },
  {
    statement: (
      <>
        Zählt man pro Schleifendurchlauf 5 statt 3 Operationen, ändert sich die
        Zeitkomplexität der iterativen Variante nicht.
      </>
    ),
    wahr: true,
    expl: (
      <>
        Konstante Faktoren und additive Konstanten verschwinden in der Landau-Notation:{" "}
        <M>{"n + 5(n-2) + c = O(n)"}</M> genauso wie <M>{"n + 3(n-2) + c"}</M>{" "}
        (Bemerkung 2.5.2). Genau diese Robustheit gegen Zählkonventionen ist der Zweck der
        Notation.
      </>
    ),
  },
  {
    statement: (
      <>
        Aus <M>{"T(n) \\ge 2\\,T(n-2)"}</M> für alle <M>{"n \\ge 2"}</M> (mit{" "}
        <M>{"T(0), T(1) \\ge 1"}</M>) folgt bereits, dass <M>{"T"}</M> mindestens
        exponentiell wächst.
      </>
    ),
    wahr: true,
    expl: (
      <>
        Wiederholtes Einsetzen liefert{" "}
        <M>{"T(n) \\ge 2^{\\lfloor n/2 \\rfloor} \\ge \\left(\\sqrt{2}\\right)^{n-1}"}</M> —
        geometrisches Wachstum mit Basis <M>{"\\sqrt{2} > 1"}</M>. Genau so haben wir die
        untere Schranke in Satz 2.5.6 bewiesen.
      </>
    ),
  },
];

function QuizWidget() {
  const [chosen, setChosen] = useState<(boolean | null)[]>(QUIZ.map(() => null));
  const pick = (i: number, v: boolean) =>
    setChosen((c) => c.map((old, j) => (i === j ? v : old)));
  return (
    <div className="space-y-3">
      {QUIZ.map((q, i) => {
        const c = chosen[i];
        const answered = c !== null;
        const correct = answered && c === q.wahr;
        return (
          <div key={i} className="rounded border border-slate-200 p-3 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grow">{q.statement}</span>
              <span className="flex gap-2">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      answered && c === v
                        ? correct
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                        : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
                    }`}
                    onClick={() => pick(i, v)}
                  >
                    {v ? "wahr" : "falsch"}
                  </button>
                ))}
              </span>
            </div>
            {answered && (
              <p
                className={`mt-2 text-sm ${
                  correct
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {correct
                  ? "Richtig! "
                  : `Leider nein — die Aussage ist ${q.wahr ? "wahr" : "falsch"}. `}
                <span className="text-slate-600 dark:text-slate-300">{q.expl}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
