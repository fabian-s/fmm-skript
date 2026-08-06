import { type ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S24WachstumWidget } from "./widgets/S24WachstumWidget";

/**
 * Abschnitt 2.4: Landau-Symbole und Rechenregeln.
 * Quelle: Folien 02-algos.Rmd, Block „Landausymbole" bis „Quiz" (Z. 371–482).
 * Prosa eigenständig aus den Folien formuliert.
 */

/** Aufklappbare Selbsttest-Frage: erst selbst entscheiden, dann Lösung ansehen. */
function SelfTest({ nr, frage, children }: { nr: number; frage: ReactNode; children: ReactNode }) {
  return (
    <details className="my-2 max-w-prose rounded-md border border-slate-300 dark:border-slate-600">
      <summary className="cursor-pointer select-none px-3 py-2">
        <span className="font-semibold">Frage {nr}.</span> {frage}{" "}
        <span className="text-sm text-slate-500 dark:text-slate-400">(Lösung aufklappen)</span>
      </summary>
      <div className="space-y-2 border-t border-slate-200 px-3 py-2 dark:border-slate-700">
        {children}
      </div>
    </details>
  );
}

export function S24() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 02-algos, „Landausymbole" bis „Quiz".
      </p>
      <p>
        In <a className="underline" href="#sec-2.3">Abschnitt 2.3</a> haben wir den Aufwand von
        Algorithmen gemessen, indem wir elementare Operationen gezählt haben. Das Ergebnis sind
        Ausdrücke wie <M>{"4n^3 + 16n^2 + 239"}</M>: exakt, aber unhandlich. Für den Vergleich
        von Algorithmen interessiert uns fast immer nur eine Frage: Wie schnell wächst der
        Aufwand, wenn die Problemgröße <M>{"n"}</M> groß wird? Die konkreten Vorfaktoren hängen
        ohnehin von Maschine, Programmiersprache und Zählweise ab. Wir brauchen also eine
        Notation, die genau das Wachstumsverhalten festhält und alles Unwesentliche wegwirft.
        Das leisten die <em>Landau-Symbole</em> (engl. <em>big-O notation</em>).
      </p>

      <h3 id="sec-2.4.1" className="mb-2 mt-8 text-xl font-semibold">
        2.4.1 Klein-o und Groß-O
      </h3>
      <p>
        Die Idee: Wir vergleichen den Aufwand <M>{"a_n"}</M> mit einer möglichst einfachen
        Vergleichsfolge <M>{"b_n"}</M> (etwa <M>{"n^2"}</M> oder <M>{"2^n"}</M>), indem wir den{" "}
        <ConceptLink id="limit">Grenzwert</ConceptLink> des Quotienten{" "}
        <M>{"a_n / b_n"}</M> betrachten. Bleibt der Quotient beschränkt, wächst <M>{"a_n"}</M>{" "}
        höchstens so schnell wie <M>{"b_n"}</M>; verschwindet er sogar, wächst <M>{"a_n"}</M>{" "}
        echt langsamer.
      </p>
      <EnvBlock kind="Definition" label="2.4.1 (Landau-Symbole)">
        <p>
          Seien <M>{"a_n, b_n"}</M> <ConceptLink id="sequence">Folgen</ConceptLink>.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <M>{"a_n = o(b_n)"}</M> („<M>{"a_n"}</M> <em>ist klein-o von</em> <M>{"b_n"}</M>"),
            wenn
            <MD>{"\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = 0."}</MD>
          </li>
          <li>
            <M>{"a_n = O(b_n)"}</M> („<M>{"a_n"}</M> <em>ist groß-O von</em> <M>{"b_n"}</M>"),
            wenn
            <MD>{"\\limsup_{n \\to \\infty} \\left\\vert \\frac{a_n}{b_n} \\right\\vert < \\infty."}</MD>
          </li>
        </ul>
      </EnvBlock>
      <p>
        Die Interpretation der beiden Symbole:
      </p>
      <ul className="max-w-prose list-disc space-y-1 pl-5">
        <li>
          <M>{"a_n = o(b_n)"}</M>: <M>{"a_n"}</M> wächst <em>langsamer</em> als <M>{"b_n"}</M>;
          gegenüber <M>{"b_n"}</M> wird <M>{"a_n"}</M> vernachlässigbar klein.
        </li>
        <li>
          <M>{"a_n = O(b_n)"}</M>: <M>{"a_n"}</M> wächst <em>höchstens so schnell</em> wie{" "}
          <M>{"b_n"}</M>; die Vergleichsfolge <M>{"b_n"}</M> ist gegenüber <M>{"a_n"}</M> nicht
          vernachlässigbar.
        </li>
      </ul>
      <EnvBlock kind="Bemerkung" label="2.4.2 (Zwei Feinheiten der Definition)">
        <p>
          <em>Warum Limes superior statt Grenzwert?</em> Der Quotient <M>{"a_n/b_n"}</M> muss
          nicht <ConceptLink id="convergence">konvergieren</ConceptLink>; er darf zum Beispiel
          oszillieren. Der Limes superior (der größte Häufungswert, gebildet als Grenzwert der{" "}
          <ConceptLink id="supremum">Suprema</ConceptLink> der Restfolgen) existiert dagegen
          immer, notfalls als <M>{"\\infty"}</M>. Die Bedingung{" "}
          <M>{"\\limsup_{n \\to \\infty} \\left\\vert a_n / b_n \\right\\vert < \\infty"}</M>{" "}
          bedeutet schlicht: Ab irgendeinem Index gilt{" "}
          <M>{"\\left\\vert a_n \\right\\vert \\le C \\cdot \\left\\vert b_n \\right\\vert"}</M>{" "}
          für eine Konstante <M>{"C"}</M>.
        </p>
        <p>
          <em>Das Gleichheitszeichen ist ein Notationsmissbrauch:</em>{" "}
          <M>{"a_n = O(b_n)"}</M> liest man besser als „<M>{"a_n"}</M> gehört zur Klasse{" "}
          <M>{"O(b_n)"}</M>". Insbesondere ist die Beziehung nicht symmetrisch: Aus{" "}
          <M>{"5n = O(n^2)"}</M> folgt nicht <M>{"n^2 = O(5n)"}</M>.
        </p>
      </EnvBlock>

      <h3 id="sec-2.4.2" className="mb-2 mt-8 text-xl font-semibold">
        2.4.2 Rechenbeispiele
      </h3>
      <p>
        Wie weist man eine Landau-Beziehung konkret nach? Wir bilden den Quotienten und rechnen
        seinen Grenzwert aus. In den folgenden drei Beispielen verfolgt{" "}
        <M>{"\\cred{\\text{Rot}}"}</M> die untersuchte Folge <M>{"\\cred{a_n}"}</M> und{" "}
        <M>{"\\cblue{\\text{Blau}}"}</M> die Vergleichsfolge <M>{"\\cblue{b_n}"}</M>.
      </p>
      <EnvBlock kind="Beispiel" label="2.4.3">
        <p>
          <strong>(a)</strong> Wir zeigen <M>{"\\cred{3n^2 + 5n} = O(\\cblue{n^2})"}</M>:
        </p>
        <MD>{"\\lim_{n \\to \\infty} \\frac{\\cred{3n^2 + 5n}}{\\cblue{n^2}} = \\lim_{n \\to \\infty} \\left(3 + \\frac{5}{n}\\right) = 3 < \\infty \\quimpl \\cred{3n^2 + 5n} = O(\\cblue{n^2}). \\quad \\checkmark"}</MD>
        <p>
          Der Quotient konvergiert gegen <M>{"3"}</M>, also ist auch sein Limes superior{" "}
          <M>{"3 < \\infty"}</M>.
        </p>
        <p>
          <strong>(b)</strong> Wir zeigen <M>{"\\cred{5n} = o(\\cblue{n^2})"}</M>:
        </p>
        <MD>{"\\lim_{n \\to \\infty} \\frac{\\cred{5n}}{\\cblue{n^2}} = \\lim_{n \\to \\infty} \\frac{5}{n} = 0 \\quimpl \\cred{5n} = o(\\cblue{n^2}). \\quad \\checkmark"}</MD>
        <p>
          <strong>(c)</strong> Gilt <M>{"\\cred{n^2} = O(\\cblue{n})"}</M>? <strong>Nein!</strong>
        </p>
        <MD>{"\\lim_{n \\to \\infty} \\frac{\\cred{n^2}}{\\cblue{n}} = \\lim_{n \\to \\infty} n = \\infty \\quad \\text{(divergiert!)} \\quimpl \\cred{n^2} \\neq O(\\cblue{n})."}</MD>
        <p>
          Der Quotient wächst über jede Schranke hinaus; <M>{"\\cred{n^2}"}</M> wächst echt
          schneller als <M>{"\\cblue{n}"}</M>.
        </p>
      </EnvBlock>
      <EnvBlock kind="Bemerkung" label="2.4.4 (Scharfe Schranken)">
        <p>
          Meist suchen wir eine möglichst <em>einfache</em> Vergleichsfolge <M>{"b_n"}</M>,
          sodass <M>{"a_n = O(b_n)"}</M>, aber <em>nicht</em> <M>{"a_n = o(b_n)"}</M> gilt:
          eine Schranke, die das Wachstum genau trifft. Für <M>{"3n^2 + 5n"}</M> ist das{" "}
          <M>{"b_n = n^2"}</M>: Der Quotient konvergiert gegen <M>{"3 \\neq 0"}</M>. Zwar wäre
          auch <M>{"3n^2 + 5n = O(n^3)"}</M> formal korrekt, aber wertlos grob, so wie „die
          Fahrt dauert höchstens drei Wochen" für eine Zugfahrt nach Berlin.
        </p>
      </EnvBlock>

      <h3 id="sec-2.4.3" className="mb-2 mt-8 text-xl font-semibold">
        2.4.3 Rechenregeln
      </h3>
      <p>
        Aufwandsausdrücke entstehen durch Hintereinanderausführung (Addition der Kosten) und
        Verschachtelung (Multiplikation der Kosten) von Algorithmus-Bausteinen. Praktischerweise
        vertragen sich die Landau-Symbole genau mit diesen beiden Operationen, so dass wir die
        Grenzwertrechnung nicht jedes Mal neu machen müssen:
      </p>
      <EnvBlock kind="Lemma" label="2.4.5 (Rechenregeln für Landau-Symbole)">
        <p>
          Seien <M>{"a_n, b_n > 0"}</M> Vergleichsfolgen.
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Sei <M>{"\\cred{f_n} = O(a_n)"}</M> und <M>{"\\cgreen{g_n} = O(b_n)"}</M>. Dann gilt
            <MD>{"\\cred{f_n} + \\cgreen{g_n} = O(a_n + b_n) \\quad\\text{und}\\quad \\cred{f_n} \\cdot \\cgreen{g_n} = O(a_n \\cdot b_n)."}</MD>
          </li>
          <li>
            Sei <M>{"\\cred{f_n} = O(a_n)"}</M> und <M>{"\\cgreen{g_n} = o(b_n)"}</M>. Dann gilt
            <MD>{"\\cred{f_n} \\cdot \\cgreen{g_n} = o(a_n \\cdot b_n)."}</MD>
          </li>
          <li>
            Sei <M>{"\\cred{f_n} = O(a_n + b_n)"}</M> mit <M>{"a_n = O(b_n)"}</M>. Dann gilt
            <MD>{"\\cred{f_n} = O(b_n)."}</MD>
          </li>
        </ol>
      </EnvBlock>
      <p>
        Die Positivität der Vergleichsfolgen setzen wir voraus, damit sich in{" "}
        <M>{"a_n + b_n"}</M> nichts wegheben kann. Für Aufwandsvergleiche ist das keine
        Einschränkung, denn Operationenzahlen sind positiv. Die Beweise sind kurze
        Grenzwertargumente:
      </p>
      <Proof>
        <PStep
          why={
            <>
              Dreiecksungleichung; danach verkleinern wir die Nenner (<M>{"a_n + b_n \\ge a_n"}</M>{" "}
              bzw. <M>{"\\ge b_n"}</M>, da beide Folgen positiv sind), was die Brüche höchstens
              vergrößert
            </>
          }
        >
          <p>
            <em>Regel 1, Addition.</em> Wir schätzen den Quotienten ab:
          </p>
          <MD>{"\\frac{\\left\\vert \\cred{f_n} + \\cgreen{g_n} \\right\\vert}{a_n + b_n} \\le \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n + b_n} + \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{a_n + b_n} \\le \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n} + \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{b_n}."}</MD>
        </PStep>
        <PStep
          why={
            <>
              beide Summanden haben nach Voraussetzung endlichen Limes superior, und der Limes
              superior einer Summe ist höchstens die Summe der Limites superiores
            </>
          }
        >
          <MD>{"\\limsup_{n \\to \\infty} \\frac{\\left\\vert \\cred{f_n} + \\cgreen{g_n} \\right\\vert}{a_n + b_n} < \\infty \\quimpl \\cred{f_n} + \\cgreen{g_n} = O(a_n + b_n)."}</MD>
        </PStep>
        <PStep why={<>Betrag und Bruch faktorisieren, beide Faktoren kennen wir schon</>}>
          <p>
            <em>Regel 1, Multiplikation, und Regel 2.</em> Der Quotient zerfällt in ein Produkt:
          </p>
          <MD>{"\\frac{\\left\\vert \\cred{f_n} \\cdot \\cgreen{g_n} \\right\\vert}{a_n \\cdot b_n} = \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n} \\cdot \\frac{\\left\\vert \\cgreen{g_n} \\right\\vert}{b_n}."}</MD>
        </PStep>
        <PStep
          why={
            <>
              das Produkt zweier beschränkter Folgen ist beschränkt; das Produkt einer
              beschränkten Folge mit einer Nullfolge ist eine Nullfolge
            </>
          }
        >
          <p>
            Der erste Faktor ist beschränkt (<M>{"\\cred{f_n} = O(a_n)"}</M>). Ist{" "}
            <M>{"\\cgreen{g_n} = O(b_n)"}</M>, so ist auch der zweite Faktor beschränkt und das
            Produkt bleibt beschränkt: <M>{"\\cred{f_n} \\cgreen{g_n} = O(a_n b_n)"}</M>. Ist
            dagegen <M>{"\\cgreen{g_n} = o(b_n)"}</M>, so konvergiert der zweite Faktor gegen{" "}
            <M>{"0"}</M> und damit das ganze Produkt:{" "}
            <M>{"\\cred{f_n} \\cgreen{g_n} = o(a_n b_n)"}</M>.
          </p>
        </PStep>
        <PStep
          why={
            <>
              <M>{"a_n = O(b_n)"}</M> macht den ersten Summanden beschränkt; die Konstante{" "}
              <M>{"1"}</M> ist es sowieso
            </>
          }
        >
          <p>
            <em>Regel 3.</em> Zuerst zeigen wir <M>{"a_n + b_n = O(b_n)"}</M>:
          </p>
          <MD>{"\\frac{a_n + b_n}{b_n} = \\frac{a_n}{b_n} + 1 = O(1)."}</MD>
        </PStep>
        <PStep
          why={
            <>
              Produkt zweier beschränkter Folgen; das ist gerade Regel 1 (Multiplikation) mit{" "}
              <M>{"b_n \\cdot 1"}</M> als Vergleichsfolge
            </>
          }
        >
          <MD>{"\\frac{\\left\\vert \\cred{f_n} \\right\\vert}{b_n} = \\frac{\\left\\vert \\cred{f_n} \\right\\vert}{a_n + b_n} \\cdot \\frac{a_n + b_n}{b_n} \\quimpl \\cred{f_n} = O(b_n)."}</MD>
        </PStep>
      </Proof>

      <h3 id="sec-2.4.4" className="mb-2 mt-8 text-xl font-semibold">
        2.4.4 Anwendung: auf den dominanten Term reduzieren
      </h3>
      <p>
        Sehen wir die Regeln im Einsatz. Wieder verfolgt <M>{"\\cred{\\text{Rot}}"}</M> die
        Folge <M>{"\\cred{f_n}"}</M> und <M>{"\\cgreen{\\text{Grün}}"}</M> die Folge{" "}
        <M>{"\\cgreen{g_n}"}</M>.
      </p>
      <EnvBlock kind="Beispiel" label="2.4.6 (Addition und Multiplikation)">
        <p>
          Gegeben seien <M>{"\\cred{f_n} = 3n^2 = O(n^2)"}</M> und{" "}
          <M>{"\\cgreen{g_n} = 5n = O(n)"}</M>.
        </p>
        <p>
          <strong>Addition</strong> (Regel 1, dann Regel 3):
        </p>
        <MD>{"\\cred{f_n} + \\cgreen{g_n} = \\cred{3n^2} + \\cgreen{5n} = O(n^2 + n) = O(n^2), \\quad \\text{denn } n = O(n^2)."}</MD>
        <p>
          <strong>Multiplikation</strong> (Regel 1):
        </p>
        <MD>{"\\cred{f_n} \\cdot \\cgreen{g_n} = \\cred{3n^2} \\cdot \\cgreen{5n} = 15n^3 = O(n^2 \\cdot n) = O(n^3)."}</MD>
      </EnvBlock>
      <EnvBlock kind="Beispiel" label="2.4.7 (Vereinfachung eines Aufwandsausdrucks)">
        <p>
          Ein Algorithmus benötige <M>{"\\cred{4n^3} + 16n^2 + 239"}</M> Operationen. Rot
          verfolgt jetzt den am schnellsten wachsenden Term:
        </p>
        <MD>{"\\cred{4n^3} + 16n^2 + 239 = O(\\cred{n^3} + n^2 + 1) = O(\\cred{n^3}),"}</MD>
        <p>
          denn <M>{"n^2 = O(n^3)"}</M> und <M>{"1 = O(n^3)"}</M>, zweimal Regel 3 angewandt.
          Dass auch der Vorfaktor <M>{"4"}</M> verschwindet, liegt an der Definition: Für jede
          Konstante <M>{"c > 0"}</M> ist{" "}
          <M>{"\\limsup_{n \\to \\infty} \\left\\vert c \\, b_n / b_n \\right\\vert = c < \\infty"}</M>,
          also <M>{"c \\cdot b_n = O(b_n)"}</M>.
        </p>
      </EnvBlock>
      <p>
        <strong>
          Wir können komplexe Aufwandsausdrücke also auf ihren dominanten Term reduzieren.
        </strong>{" "}
        Deshalb sprechen wir von einem „<M>{"O(n^3)"}</M>-Algorithmus", ohne Vorfaktoren
        oder niedrigere Terme zu nennen: Für großes <M>{"n"}</M> bestimmt allein der dominante
        Term, wie sich die Laufzeit verhält. Und die üblichen Komplexitätsklassen bilden eine
        strikte Hierarchie, in der jede klein-o-mäßig langsamer wächst als die nächste:
      </p>
      <MD>{"\\log n \\,,\\quad n \\,,\\quad n \\log n \\,,\\quad n^2 \\,,\\quad n^3 \\,,\\quad 2^n."}</MD>
      <p>
        Wie drastisch sich diese Klassen unterscheiden (und ab welchem <M>{"n"}</M> ein
        schneller wachsender Term jeden noch so großen Vorfaktor überholt), zeigt das folgende
        Widget. Der <ConceptLink id="logarithm">Logarithmus</ConceptLink>-Trick der log-Skala
        macht dabei aus <M>{"2^n"}</M> eine Gerade.
      </p>
      <ExpandedReading title="Wachstumsraten-Explorer: wer dominiert wen, und ab wann?">
        <p className="mb-3 max-w-prose text-sm">
          Wählen Sie Komplexitätsklassen aus und vergleichen Sie sie auf linearer und
          logarithmischer Skala. Der Schieberegler für den Vorfaktor <M>{"c"}</M> skaliert die{" "}
          <M>{"n^2"}</M>-Kurve: Selbst <M>{"c = 1000"}</M> verschiebt nur den Schnittpunkt mit{" "}
          <M>{"2^n"}</M> und <M>{"n^3"}</M> nach rechts – gewinnen kann der langsamer wachsende
          Term nie. Das ist die praktische Bedeutung von{" "}
          <M>{"n^2 = o(n^3)"}</M>: Vorfaktoren sind auf lange Sicht bedeutungslos.
        </p>
        <S24WachstumWidget />
      </ExpandedReading>

      <h3 id="sec-2.4.5" className="mb-2 mt-8 text-xl font-semibold">
        2.4.5 Selbsttest
      </h3>
      <p>
        Welche der folgenden Aussagen sind wahr? Erst selbst entscheiden (Quotient bilden!),
        dann die Lösung aufklappen.
      </p>
      <SelfTest nr={1} frage={<M>{"2n = O(n^2)"}</M>}>
        <p>
          <strong>Wahr.</strong>{" "}
          <M>{"\\lim_{n \\to \\infty} \\frac{2n}{n^2} = \\lim_{n \\to \\infty} \\frac{2}{n} = 0 < \\infty"}</M>;
          es gilt sogar die stärkere Aussage <M>{"2n = o(n^2)"}</M>. Die <em>scharfe</em>{" "}
          Schranke im Sinne von Bemerkung 2.4.4 wäre <M>{"2n = O(n)"}</M>.
        </p>
      </SelfTest>
      <SelfTest nr={2} frage={<M>{"7/n = o(1)"}</M>}>
        <p>
          <strong>Wahr.</strong> Mit <M>{"b_n = 1"}</M> ist{" "}
          <M>{"\\lim_{n \\to \\infty} \\frac{7/n}{1} = 0"}</M>. Landau-Symbole beschreiben also
          nicht nur Wachstum, sondern auch das Abklingen von Nullfolgen. So werden wir später
          Approximations- und Rundungsfehler klassifizieren.
        </p>
      </SelfTest>
      <SelfTest nr={3} frage={<M>{"8n^3 + 7n^2 + n = O(n)"}</M>}>
        <p>
          <strong>Falsch.</strong>{" "}
          <M>{"\\lim_{n \\to \\infty} \\frac{8n^3 + 7n^2 + n}{n} = \\lim_{n \\to \\infty} \\left(8n^2 + 7n + 1\\right) = \\infty"}</M>;
          der Quotient divergiert. Richtig wäre <M>{"O(n^3)"}</M>: der dominante Term
          entscheidet (Beispiel 2.4.7).
        </p>
      </SelfTest>
      <SelfTest nr={4} frage={<M>{"n^{-3} + n^{-2} = O(n^{-2})"}</M>}>
        <p>
          <strong>Wahr.</strong>{" "}
          <M>{"\\lim_{n \\to \\infty} \\frac{n^{-3} + n^{-2}}{n^{-2}} = \\lim_{n \\to \\infty} \\left(\\frac{1}{n} + 1\\right) = 1 < \\infty. \\quad \\checkmark"}</M>{" "}
          Auch <M>{"n^{-3} + n^{-2} = o(1)"}</M> wäre richtig (die Folge ist eine Nullfolge),
          aber <M>{"O(n^{-2})"}</M> ist die schärfere Aussage: Sie sagt nicht nur <em>dass</em>,
          sondern <em>wie schnell</em> die Folge verschwindet.
        </p>
      </SelfTest>

      <p>
        Damit haben wir das Handwerkszeug beisammen. Im{" "}
        <a className="underline" href="#sec-2.5">nächsten Abschnitt</a> setzen wir es ein, um
        die Komplexität unserer Fibonacci-Algorithmen aus{" "}
        <a className="underline" href="#sec-2.2">Abschnitt 2.2</a> präzise zu bestimmen – mit
        einem drastischen Ergebnis.
      </p>

      <p className="italic">
        Vertiefung: Heath §1.1 (Aufwand und Genauigkeit numerischer Verfahren); Cormen,
        Leiserson, Rivest &amp; Stein, <em>Introduction to Algorithms</em>, Kap. 3
        (asymptotische Notation, dort auch <M>{"\\Theta"}</M> und <M>{"\\Omega"}</M>).
      </p>
    </div>
  );
}
