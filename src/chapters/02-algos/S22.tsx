import { useState, type ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD } from "../../lib";
import { FibonacciStepper } from "./widgets/FibonacciStepper";

/**
 * Abschnitt 2.2, Algorithmen konkret: Fibonacci und Verwandte.
 * Quelle: Folien 02-algos.Rmd, Block „Beispiel: Fibonacci-Zahlen" bis
 * „Gute Algorithmen". Prosa eigenständig aus den Folien formuliert.
 */

/* ------------------------------------------------------------------ */
/* Selbsttest (Folie „Quiz": Der Algorithmus ist …; richtig: 1, 3)     */
/* ------------------------------------------------------------------ */

const QUIZ: { statement: ReactNode; wahr: boolean; expl: ReactNode }[] = [
  {
    statement: (
      <>
        Der Algorithmus ist <em>exakt</em>.
      </>
    ),
    wahr: true,
    expl: (
      <>
        Es gilt <M>{"f(n) = \\wt{f}(n)"}</M>: Der Algorithmus liefert genau die definierten
        Fibonacci-Zahlen, keine Näherung. (Die Einschränkung „bis auf{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink>" aus der Definition greift
        hier erst, wenn <M>{"x_n"}</M> für sehr großes <M>{"n"}</M> den exakt darstellbaren
        Ganzzahlbereich der <ConceptLink id="floating-point">Gleitkommazahlen</ConceptLink>{" "}
        verlässt.)
      </>
    ),
  },
  {
    statement: (
      <>
        Der Algorithmus ist <em>approximativ</em>.
      </>
    ),
    wahr: false,
    expl: (
      <>
        Approximativ hieße <M>{"f(n) \\approx \\wt{f}(n)"}</M>: der Algorithmus bricht etwa bei
        einem Toleranzlevel ab, bevor die exakte Lösung erreicht ist. Hier gibt es nichts zu
        approximieren: Nach <M>{"n"}</M> Schritten steht das exakte Ergebnis fest.
      </>
    ),
  },
  {
    statement: (
      <>
        Der Algorithmus ist <em>iterativ</em>.
      </>
    ),
    wahr: true,
    expl: (
      <>
        Dieselbe Vorschrift („hänge die Summe der letzten beiden Elemente an") wird für{" "}
        <M>{"i = 2, \\dots, n-1"}</M> immer wieder ausgeführt. Genau das meint <em>iterativ</em>.
      </>
    ),
  },
  {
    statement: (
      <>
        Der Algorithmus ist <em>probabilistisch</em>.
      </>
    ),
    wahr: false,
    expl: (
      <>
        Es kommt kein Zufall vor: Der Algorithmus ist deterministisch und liefert bei jedem
        Aufruf mit demselben <M>{"n"}</M> exakt dasselbe Ergebnis.
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
                  : `Leider nein, die Aussage ist ${q.wahr ? "wahr" : "falsch"}. `}
                <span className="text-slate-600 dark:text-slate-300">{q.expl}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Der Abschnitt                                                       */
/* ------------------------------------------------------------------ */

export function S22() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 02-algos, „Beispiel: Fibonacci-Zahlen" bis „Gute Algorithmen".
      </p>
      <p>
        In <a className="underline" href="#sec-2.1">Abschnitt 2.1</a> haben wir Algorithmen
        abstrakt definiert: als Verkettung{" "}
        <M>{"\\wt{f} = \\wt{f}_s \\circ \\cdots \\circ \\wt{f}_1"}</M> elementarer Rechenschritte.
        Diese Definition bleibt blass, solange wir sie nicht einmal vollständig durchspielen.
        Das tun wir jetzt an einem Problem, das einfach genug ist, um jeden einzelnen
        Schritt hinzuschreiben, und trotzdem reich genug, um uns durch das ganze Kapitel zu
        begleiten: den Fibonacci-Zahlen. Danach ordnen wir das Beispiel in die Landschaft der
        Algorithmenarten ein, die uns in Statistik und Machine Learning begegnen, und überlegen,
        was einen <em>guten</em> Algorithmus eigentlich auszeichnet.
      </p>

      <h3 id="sec-2.2.1" className="mb-2 mt-8 text-xl font-semibold">
        2.2.1 Beispiel: Fibonacci-Zahlen
      </h3>
      <EnvBlock kind="Definition" label="2.2.1 (Fibonacci-Zahlen)">
        <p>
          Die <em>Fibonacci-Zahlen</em> sind die{" "}
          <ConceptLink id="sequence">Folge</ConceptLink>{" "}
          <M>{"(x_n)_{n \\in \\N}"}</M> mit
        </p>
        <MD>{"x_1 = 0, \\quad x_2 = 1, \\quad x_{n+1} = \\cblue{x_n} + \\cgreen{x_{n-1}} \\quad (n \\ge 2)."}</MD>
      </EnvBlock>
      <p>
        Jedes Folgenglied ist also die Summe seiner beiden Vorgänger; die Folge beginnt mit{" "}
        <M>{"0, 1, 1, 2, 3, 5, 8, 13, 21, \\dots"}</M> (Manche Bücher lassen die Folge bei{" "}
        <M>{"1, 1"}</M> oder mit dem Index <M>{"0"}</M> beginnen; wir bleiben bei der Konvention
        der Folien.) Unser numerisches Problem lautet:{" "}
        <em>Berechne die ersten <M>{"n"}</M> Fibonacci-Zahlen.</em> In der Sprache von{" "}
        <a className="underline" href="#sec-2.1">Abschnitt 2.1</a>: Das Problem ist die Abbildung{" "}
        <M>{"f"}</M> mit Input <M>{"n"}</M> und Lösung{" "}
        <M>{"f(n) = (x_1, \\dots, x_n)"}</M>.
      </p>
      <p>
        Wie berechnen wir das? Die Definition selbst gibt den Weg vor: Wir bauen den
        Ergebnisvektor von links nach rechts auf und gewinnen jeden neuen Eintrag durch{" "}
        <em>eine</em> Addition aus den beiden zuletzt berechneten. Als Verkettung elementarer
        Schritte (<ConceptLink id="function-composition">Komposition</ConceptLink> von
        Funktionen) aufgeschrieben:
      </p>
      <EnvBlock kind="Algorithmus" label="2.2.2 (Fibonacci, iterativ)">
        <MD>{"\\wt{f} : \\N \\to \\N_0^n, \\qquad \\wt{f}(n) = \\left(\\wt{f}_n \\circ \\cdots \\circ \\wt{f}_3 \\circ \\wt{f}_2 \\circ \\wt{f}_1\\right)(n)"}</MD>
        <p>mit den elementaren Schritten</p>
        <MD>{"\\wt{f}_1(n) = 0, \\qquad \\wt{f}_2(x) = (x, 1), \\qquad \\wt{f}_{i+1}(x_1, \\dots, x_i) = \\left(x_1, \\dots, x_i,\\ \\corange{\\cblue{x_i} + \\cgreen{x_{i-1}}}\\right) \\quad (i \\ge 2)."}</MD>
      </EnvBlock>
      <p>
        Lesen wir die Verkettung wie immer von rechts nach links: <M>{"\\wt{f}_1"}</M> ignoriert
        den Input und setzt den Startwert <M>{"x_1 = 0"}</M>; <M>{"\\wt{f}_2"}</M> hängt{" "}
        <M>{"x_2 = 1"}</M> an; jeder weitere Schritt <M>{"\\wt{f}_{i+1}"}</M> hängt an das bisher
        berechnete Tupel die Summe aus dem <M>{"\\cblue{\\text{letzten}}"}</M> und dem{" "}
        <M>{"\\cgreen{\\text{vorletzten}}"}</M> Element als{" "}
        <M>{"\\corange{\\text{neues Element}}"}</M> an. Nach dem letzten Schritt{" "}
        <M>{"\\wt{f}_n"}</M> steht das vollständige Ergebnis da. (Kleine Korrektur gegenüber den
        Folien: Da <M>{"x_1 = 0"}</M> ist, leben die Outputs in <M>{"\\N_0^n"}</M>, nicht in{" "}
        <M>{"\\N^n"}</M>.)
      </p>
      <EnvBlock kind="Beispiel" label="2.2.3 (Die ersten 6 Fibonacci-Zahlen)">
        <p>
          Berechnen wir <M>{"\\wt{f}(6)"}</M> Schritt für Schritt. Die Farben verfolgen die Rollen
          aus Algorithmus 2.2.2: <M>{"\\cblue{\\text{letztes Element}}"}</M>,{" "}
          <M>{"\\cgreen{\\text{vorletztes Element}}"}</M>,{" "}
          <M>{"\\corange{\\text{neu berechnete Summe}}"}</M>.
        </p>
        <MD>{"\\begin{aligned} \\wt{f}_1(6) &= 0 \\\\ \\wt{f}_2(0) &= (0, 1) \\\\ \\wt{f}_3(\\cgreen{0}, \\cblue{1}) &= (0, 1, \\corange{1}) \\\\ \\wt{f}_4(0, \\cgreen{1}, \\cblue{1}) &= (0, 1, 1, \\corange{2}) \\\\ \\wt{f}_5(0, 1, \\cgreen{1}, \\cblue{2}) &= (0, 1, 1, 2, \\corange{3}) \\\\ \\wt{f}_6(0, 1, 1, \\cgreen{2}, \\cblue{3}) &= (0, 1, 1, 2, 3, \\corange{5}) \\end{aligned}"}</MD>
        <p>
          Ergebnis: <M>{"\\wt{f}(6) = (0, 1, 1, 2, 3, 5)"}</M> – vier Additionen (
          <M>{"\\corange{1}, \\corange{2}, \\corange{3}, \\corange{5}"}</M>) für sechs Zahlen.
        </p>
      </EnvBlock>

      <h3 id="sec-2.2.2" className="mb-2 mt-8 text-xl font-semibold">
        2.2.2 Vom Algorithmus zum Programm
      </h3>
      <p>
        Der Algorithmus lässt sich fast wörtlich in Code übersetzen. Lege zuerst einen Vektor
        der Länge <M>{"n"}</M> an, mit Nullen vorbelegt; damit ist <M>{"x_1 = 0"}</M> bereits
        erledigt. Setze dann (falls <M>{"n > 1"}</M>) das zweite Element auf <M>{"1"}</M>.
        Durchlaufe schließlich <M>{"i = 2, \\dots, n-1"}</M> und setze in jedem Durchlauf{" "}
        <M>{"x_{i+1} = \\cblue{x_i} + \\cgreen{x_{i-1}}"}</M>. In R:
      </p>
      <pre className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-sm dark:bg-slate-900/60">
        <code>
          {
            "fibonacci <- function(n) {\n  x <- numeric(n)  # Vektor (0, ..., 0) der Länge n\n  if (n > 1) {\n    x[2] <- 1\n  }\n  if (n > 2) {\n    for (i in 2:(n - 1)) {\n      x[i + 1] <- x[i] + x[i - 1]\n    }\n  }\n  x\n}"
          }
        </code>
      </pre>
      <p>
        Eine Schleife, eine Addition pro Durchlauf, und jedes Zwischenergebnis wird genau
        einmal berechnet und dann wiederverwendet.
      </p>
      <p>
        Dass hier <em>nichts doppelt</em> gerechnet wird, ist keine Selbstverständlichkeit. Die
        Definition 2.2.1 legt nämlich noch einen zweiten, verführerisch eleganten Weg nahe: Um{" "}
        <M>{"x_n"}</M> zu berechnen, rufe dieselbe Rechenvorschrift rekursiv für{" "}
        <M>{"x_{n-1}"}</M> und <M>{"x_{n-2}"}</M> auf, ohne Zwischenergebnisse zu speichern.
        Das liefert dieselben Zahlen, aber zu einem absurden Preis: Beide Teilaufrufe berechnen
        große Teile der Folge unabhängig voneinander noch einmal, und deren Teilaufrufe wieder.
        Das folgende Widget stellt beide Varianten nebeneinander; die genaue Analyse, <em>wie</em>{" "}
        schnell die naive Rekursion explodiert, folgt in{" "}
        <a className="underline" href="#sec-2.5">Abschnitt 2.5</a>.
      </p>
      <ExpandedReading title="Fibonacci-Stepper: Iteration gegen naive Rekursion, mit Zählern">
        <FibonacciStepper />
      </ExpandedReading>

      <h3 id="sec-2.2.3" className="mb-2 mt-8 text-xl font-semibold">
        2.2.3 Selbsttest
      </h3>
      <p>
        Ordnen wir Algorithmus 2.2.2 in die Arten aus{" "}
        <a className="underline" href="#sec-2.1">Abschnitt 2.1</a> ein. Für jede Aussage: wahr
        oder falsch?
      </p>
      <QuizWidget />

      <h3 id="sec-2.2.4" className="mb-2 mt-8 text-xl font-semibold">
        2.2.4 Algorithmenarten in ML und Statistik
      </h3>
      <p>
        Der Fibonacci-Algorithmus ist also exakt <em>und</em> iterativ. Die vier Arten schließen
        sich nicht gegenseitig aus. Wie verteilen sich die Algorithmen, mit denen wir in
        Statistik und Machine Learning tatsächlich arbeiten, auf diese Kategorien?
      </p>
      <EnvBlock kind="Beispiel" label="2.2.4 (Algorithmenarten in ML und Statistik)">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Exakt/direkt:</strong> die Lösung{" "}
            <ConceptLink id="linear-system">linearer Gleichungssysteme</ConceptLink> per{" "}
            <ConceptLink id="gaussian-elimination">Gauß-Elimination</ConceptLink> (dazu später
            im Kurs viel mehr) oder die{" "}
            <ConceptLink id="matrix-multiplication">Matrixmultiplikation</ConceptLink>: nach
            endlich vielen, vorab bekannten Schritten steht das exakte Ergebnis fest.
          </li>
          <li>
            <strong>Approximativ:</strong> Monte-Carlo-Integration, die Integrale durch
            Stichprobenmittel schätzt (ein Integral ist ein{" "}
            <ConceptLink id="expected-value">Erwartungswert</ConceptLink>, und den schätzen
            Statistiker/innen mit Stichproben); das Training{" "}
            <ConceptLink id="neural-network">neuronaler Netze</ConceptLink>, das nur bis zu
            einem Toleranzlevel optimiert.
          </li>
          <li>
            <strong>Iterativ:</strong> der{" "}
            <ConceptLink id="gradient-descent">Gradientenabstieg</ConceptLink> im Machine
            Learning und das{" "}
            <ConceptLink id="newtons-method">Newton-Verfahren</ConceptLink> zum
            Nullstellenfinden: dieselbe Update-Vorschrift wird wiederholt, bis das Ergebnis gut
            genug ist.
          </li>
          <li>
            <strong>Probabilistisch:</strong> randomisierte Quicksort-Varianten (das
            Pivot-Element wird zufällig gewählt) und MCMC-Verfahren in der Bayesianischen
            Statistik, die die gesuchte Verteilung durch Zufallspfade erkunden.
          </li>
        </ul>
      </EnvBlock>
      <p>
        In der Praxis treten die Arten meist kombiniert auf: Das Training eines neuronalen
        Netzes per stochastischem Gradientenabstieg etwa ist iterativ (wiederholte Updates),
        approximativ (Abbruch bei einer Toleranz statt am exakten Optimum) <em>und</em>{" "}
        probabilistisch (zufällig gewählte Teilstichproben in jedem Schritt) zugleich.
      </p>

      <h3 id="sec-2.2.5" className="mb-2 mt-8 text-xl font-semibold">
        2.2.5 Was ist ein guter Algorithmus?
      </h3>
      <EnvBlock kind="Bemerkung" label="2.2.5 (Eine Analogie)">
        <p>
          Problem: <em>Koche Schweinsbraten wie bei Oma.</em> Dann entspricht der Algorithmus
          dem Kochrezept, und der Computer dem Koch, der sich zwar an das Rezept hält, dabei
          aber Fehler macht.
        </p>
      </EnvBlock>
      <p>
        Die Analogie trägt weiter, als sie zunächst wirkt. Erstens: Für dasselbe Gericht gibt es
        viele Rezepte, und sie sind nicht gleich gut, genau wie unsere beiden
        Fibonacci-Varianten dasselbe Problem lösen, aber zu drastisch verschiedenen Kosten.
        Zweitens: Ein gutes Rezept ist <em>robust</em> gegen die kleinen Ungenauigkeiten des
        Kochs; ein gutes numerisches Verfahren verstärkt die unvermeidlichen{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> des Computers nicht
        unnötig. Zusammengefasst wollen wir Algorithmen, die
      </p>
      <ul className="max-w-prose list-disc space-y-1 pl-5">
        <li>möglichst exakte Ergebnisse liefern,</li>
        <li>schnell sind,</li>
        <li>wenig Speicher brauchen.</li>
      </ul>
      <p>
        Diese drei Wünsche stehen oft in Konkurrenz: Mehr Genauigkeit kostet in der Regel
        Rechenzeit oder Speicher, und der schnellste Weg ist nicht immer der stabilste. Um
        solche Abwägungen treffen zu können, müssen wir „schnell" und „wenig Speicher" erst
        einmal präzise messen. Das ist das Thema des{" "}
        <a className="underline" href="#sec-2.3">nächsten Abschnitts</a>. Wie wir „möglichst
        exakt" trotz Rundungsfehlern erreichen, beschäftigt uns dann ausführlich in Kapitel 3.
      </p>

      <p className="italic">
        Vertiefung: Heath §1.1 (Näherungen und Fehlerquellen im wissenschaftlichen Rechnen);
        Cormen, Leiserson, Rivest &amp; Stein, <em>Introduction to Algorithms</em>, der
        Klassiker zu Entwurf und Analyse von Algorithmen.
      </p>
    </div>
  );
}
