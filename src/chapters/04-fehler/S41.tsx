import { ConceptLink, EnvBlock, Eq, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { FehlermassRechner, FehlerzerlegungExplorer } from "./widgets/S41Widgets";

/**
 * Abschnitt 4.1: Fehlermaße und Fehlerzerlegung.
 * Quelle: Folien 04-fehler.Rmd, Kapitelauftakt + Blöcke „Fehleranalyse"
 * (absolute/relative Fehler, Fehlermaß, Fehlerschranken-Lemma,
 * Vektor-Beispiel) und „Fehlerzerlegung" (Schema, Zerlegungsformel,
 * e^π-Beispiel). Prosa eigenständig aus den Folien formuliert; alle
 * Zahlenwerte nachgerechnet.
 */
export function S41() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 04-fehler, „Fehleranalyse" und „Fehlerzerlegung".
      </p>
      <p>
        In Kapitel 2 haben wir gesehen, dass Computer praktisch nie exakt rechnen: Schon das
        Speichern einer Zahl im <ConceptLink id="floating-point">Gleitkommaformat</ConceptLink>{" "}
        erzeugt <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink>, und jede
        Rechenoperation kann weitere hinzufügen (
        <a className="underline" href="?k=02-algos#sec-2.1">Abschnitt 2.1</a>). Für Statistiker/innen kommt
        noch etwas Grundsätzlicheres dazu: Unsere Inputs sind Daten, und Daten sind gemessen,
        also selbst schon fehlerbehaftet, bevor der Computer überhaupt anfängt zu rechnen. Dieses
        Kapitel entwickelt das Handwerkszeug, um mit beidem systematisch umzugehen. Wir klären
        zuerst, wie man Fehler überhaupt <em>misst</em>, und zerlegen dann den Gesamtfehler eines
        berechneten Ergebnisses in seine zwei grundverschiedenen Quellen. Diese Zerlegung ist der
        rote Faden des ganzen Kapitels: Sie führt direkt auf die Begriffe <em>Kondition</em>{" "}
        (<a className="underline" href="#sec-4.2">Abschnitt 4.2</a>) und <em>Stabilität</em>{" "}
        (<a className="underline" href="#sec-4.3">Abschnitt 4.3</a>).
      </p>
      <EnvBlock kind="Bemerkung" label="4.1.1 (Verwendete Vorkenntnisse)">
        <p>Dieses Kapitel setzt voraus:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            aus Kapitel 2: den Algorithmusbegriff und die Komplexitätsanalyse (
            <a className="underline" href="?k=02-algos#sec-2.1">Abschnitte 2.1</a>–
            <a className="underline" href="?k=02-algos#sec-2.3">2.3</a>) sowie das Verständnis, dass
            Algorithmen meist nur <em>approximative</em> Lösungen berechnen,
          </li>
          <li>
            aus der linearen Algebra: Vektor- und{" "}
            <ConceptLink id="matrix-norm">Matrixnormen</ConceptLink> (Kapitel 3, insbesondere{" "}
            <a className="underline" href="?k=03-matrix-spur-norm#sec-3.2">Abschnitt 3.2</a>) mit den{" "}
            <ConceptLink id="norm">Normeigenschaften</ConceptLink> Definitheit, Homogenität und{" "}
            <ConceptLink id="triangle-inequality">Dreiecksungleichung</ConceptLink>, außerdem
            Matrixoperationen und{" "}
            <ConceptLink id="matrix-vector-product">Matrix-Vektor-Produkte</ConceptLink>,
          </li>
          <li>
            aus der Analysis: <ConceptLink id="limit">Grenzwerte</ConceptLink> und{" "}
            <ConceptLink id="convergence">Konvergenz</ConceptLink>,{" "}
            <ConceptLink id="continuity">Stetigkeit</ConceptLink> und die Grundlagen der{" "}
            <ConceptLink id="taylor-series">Taylor-Approximation</ConceptLink>.
          </li>
        </ul>
      </EnvBlock>

      <h3 id="sec-4.1.1" className="mt-6 text-lg font-semibold">
        4.1.1 Absolute und relative Fehler
      </h3>
      <p>
        Beginnen wir mit dem einfachsten Fall: Eine einzelne Zahl soll gespeichert oder berechnet
        werden, und statt des <M>{"\\cgreen{\\text{tatsächlichen Werts}}"}</M> erhalten wir einen{" "}
        <M>{"\\cblue{\\text{fehlerhaften Wert}}"}</M>. Die naheliegendste Art, den Fehler zu
        quantifizieren, ist die Differenz der beiden:
      </p>
      <MD>{"\\text{absoluter Fehler} = \\cblue{\\text{fehlerhafter Wert}} - \\cgreen{\\text{tatsächlicher Wert}}."}</MD>
      <p>
        Der absolute Fehler hat aber einen Schönheitsfehler: Er hängt von der Skala ab. Ein
        Fehler von einem Meter ist beim Vermessen eines Zimmers eine Katastrophe, beim Abstand
        zwischen München und Hamburg belanglos. Deshalb ist es üblicher, Fehler <em>relativ</em>{" "}
        zum tatsächlichen Wert zu betrachten:
      </p>
      <MD>{"\\corange{\\text{relativer Fehler}} = \\frac{\\cblue{\\text{fehlerhafter Wert}} - \\cgreen{\\text{tatsächlicher Wert}}}{\\cgreen{\\text{tatsächlicher Wert}}}."}</MD>
      <p>
        Der Vorteil: Der relative Fehler ist einheitenfrei und lässt sich als Prozentzahl lesen.
        Der Nachteil: Der tatsächliche Wert darf nicht <M>{"0"}</M> sein. Lösen wir die
        Definition nach dem fehlerhaften Wert auf, erhalten wir eine Umformung, die uns noch oft
        begegnen wird:
      </p>
      <MD>{"\\cblue{\\text{fehlerhafter Wert}} = \\cgreen{\\text{tatsächlicher Wert}} \\cdot \\left(1 + \\corange{\\text{relativer Fehler}}\\right)."}</MD>
      <p>
        Ein fehlerbehafteter Wert ist also der wahre Wert, multiplikativ verzerrt um den Faktor{" "}
        <M>{"1 + \\corange{\\text{relativer Fehler}}"}</M>. So lässt sich auch das aus
        Kapitel 2 bekannte Runden im Gleitkommaformat beschreiben: Dort ist der relative Fehler
        höchstens die{" "}
        <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>.
      </p>

      <h3 id="sec-4.1.2" className="mt-6 text-lg font-semibold">
        4.1.2 Fehlermaße und Fehlerschranken
      </h3>
      <p>
        In der Statistik sind unsere Ergebnisse selten einzelne Zahlen: Wir rechnen mit
        Vektoren von Schätzern, mit Kovarianzmatrizen, mit ganzen Funktionen. Um Fehler auch
        dort messen zu können, brauchen wir statt des Betrags eine{" "}
        <ConceptLink id="norm">Norm</ConceptLink>. Genau dafür haben wir in Kapitel 3 die
        Normbegriffe bereitgestellt; jetzt zahlt sich das aus. Die folgende Definition überträgt
        beide Fehlerbegriffe wörtlich auf beliebige{" "}
        <ConceptLink id="vector-space">Vektorräume</ConceptLink>:
      </p>
      <EnvBlock kind="Definition" label="4.1.2 (Fehlermaß)">
        <p>
          Sei <M>{"V"}</M> ein Vektorraum mit (Semi-)Norm <M>{"\\left\\| \\cdot \\right\\|"}</M>{" "}
          und <M>{"\\cblue{\\wt{\\bv}} \\in V"}</M> eine Approximation zu{" "}
          <M>{"\\cgreen{\\bv} \\in V"}</M>. Dann ist
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            der <em>absolute Fehler</em>
            <MD>{"\\cred{\\bDelta_{\\bv}} = \\cblue{\\wt{\\bv}} - \\cgreen{\\bv},"}</MD>
          </li>
          <li>
            der <em>relative Fehler</em>
            <MD>{"\\corange{\\delta_{\\bv}} = \\frac{\\left\\| \\cblue{\\wt{\\bv}} - \\cgreen{\\bv} \\right\\|}{\\left\\| \\cgreen{\\bv} \\right\\|} = \\frac{\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|}{\\left\\| \\cgreen{\\bv} \\right\\|} \\qquad \\text{(sofern } \\left\\| \\cgreen{\\bv} \\right\\| \\neq 0\\text{)}."}</MD>
          </li>
        </ul>
      </EnvBlock>
      <p>
        Beachten wir den kleinen, aber wichtigen Unterschied: Der absolute Fehler{" "}
        <M>{"\\cred{\\bDelta_{\\bv}}"}</M> ist selbst ein Element von <M>{"V"}</M> und sagt uns
        auch, <em>in welche Richtung</em> die Approximation danebenliegt. Der relative Fehler{" "}
        <M>{"\\corange{\\delta_{\\bv}}"}</M> ist dagegen eine einzelne nichtnegative Zahl. Für
        Skalare (<M>{"V = \\R"}</M> mit dem Betrag als Norm) liefert die Definition gerade den
        Betrag des relativen Fehlers aus{" "}
        <a className="underline" href="#sec-4.1.1">Abschnitt 4.1.1</a>.
      </p>
      <p>
        Oft kennen wir den Fehler nicht exakt, sonst könnten wir ihn ja einfach abziehen und
        exakt rechnen. Was wir realistischerweise angeben können, ist eine Garantie nach oben:
        Gilt <M>{"\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\| \\le \\eps"}</M> bzw.{" "}
        <M>{"\\corange{\\delta_{\\bv}} \\le \\eps"}</M>, so nennen wir <M>{"\\eps"}</M> eine{" "}
        <em>absolute</em> bzw. <em>relative Fehlerschranke</em>. Das folgende Lemma zeigt, was
        eine relative Fehlerschranke praktisch wert ist: Sie kontrolliert, wie stark die Norm der
        Approximation von der Norm des wahren Werts abweichen kann.
      </p>
      <EnvBlock kind="Lemma" label="4.1.3 (Fehlerschranken)">
        <p>Es gilt</p>
        <MD>{"\\left\\| \\cgreen{\\bz} \\right\\| \\left(1 - \\corange{\\delta_{\\bz}}\\right) \\;\\le\\; \\left\\| \\cblue{\\wt{\\bz}} \\right\\| \\;\\le\\; \\left\\| \\cgreen{\\bz} \\right\\| \\left(1 + \\corange{\\delta_{\\bz}}\\right)."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              Definition des relativen Fehlers <M>{"\\corange{\\delta_{\\bz}}"}</M>, beide Seiten
              mit <M>{"\\left\\| \\cgreen{\\bz} \\right\\| > 0"}</M> multipliziert
            </>
          }
        >
          <MD>{"\\corange{\\delta_{\\bz}} = \\frac{\\left\\| \\cblue{\\wt{\\bz}} - \\cgreen{\\bz} \\right\\|}{\\left\\| \\cgreen{\\bz} \\right\\|} \\quimpl \\left\\| \\cblue{\\wt{\\bz}} - \\cgreen{\\bz} \\right\\| = \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\|"}</MD>
        </PStep>
        <PStep
          why={
            <>
              umgekehrte{" "}
              <ConceptLink id="triangle-inequality">Dreiecksungleichung</ConceptLink>:{" "}
              <M>{"\\bigl| \\left\\| \\ba \\right\\| - \\left\\| \\bb \\right\\| \\bigr| \\le \\left\\| \\ba - \\bb \\right\\|"}</M>{" "}
              für alle <M>{"\\ba, \\bb \\in V"}</M>
            </>
          }
        >
          <MD>{"\\Bigl| \\left\\| \\cblue{\\wt{\\bz}} \\right\\| - \\left\\| \\cgreen{\\bz} \\right\\| \\Bigr| \\le \\left\\| \\cblue{\\wt{\\bz}} - \\cgreen{\\bz} \\right\\| = \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\|"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Definition des Betrags: <M>{"|t| \\le c \\quequiv -c \\le t \\le c"}</M>
            </>
          }
        >
          <MD>{"-\\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\| \\;\\le\\; \\left\\| \\cblue{\\wt{\\bz}} \\right\\| - \\left\\| \\cgreen{\\bz} \\right\\| \\;\\le\\; \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\|"}</MD>
        </PStep>
        <PStep
          why={
            <>
              überall <M>{"\\left\\| \\cgreen{\\bz} \\right\\|"}</M> addiert; Ausklammern liefert
              die Behauptung
            </>
          }
        >
          <MD>{"\\left\\| \\cgreen{\\bz} \\right\\| - \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\| \\;\\le\\; \\left\\| \\cblue{\\wt{\\bz}} \\right\\| \\;\\le\\; \\left\\| \\cgreen{\\bz} \\right\\| + \\corange{\\delta_{\\bz}} \\left\\| \\cgreen{\\bz} \\right\\|"}</MD>
        </PStep>
      </Proof>
      <p>
        Ein relativer Fehler von zum Beispiel <M>{"\\corange{\\delta_{\\bz}} = 0{,}01"}</M>{" "}
        garantiert also: Die Norm der Approximation liegt zwischen <M>{"99\\,\\%"}</M> und{" "}
        <M>{"101\\,\\%"}</M> der wahren Norm. Rechnen wir das Ganze einmal konkret an einem
        Vektor durch.
      </p>
      <EnvBlock kind="Beispiel" label="4.1.4 (Fehlermaße für Vektoren)">
        <p>
          Sei <M>{"\\cgreen{\\bv} = \\cgreen{\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}}"}</M> und{" "}
          <M>{"\\cblue{\\wt{\\bv}} = \\cblue{\\begin{pmatrix} 3{,}2 \\\\ 4{,}3 \\end{pmatrix}}"}</M>{" "}
          mit der <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink>{" "}
          <M>{"\\left\\| \\cdot \\right\\|_2"}</M>.
        </p>
        <p>
          <strong>Absoluter Fehler</strong>, komponentenweise Differenz:
        </p>
        <MD>{"\\cred{\\bDelta_{\\bv}} = \\cblue{\\wt{\\bv}} - \\cgreen{\\bv} = \\cblue{\\begin{pmatrix} 3{,}2 \\\\ 4{,}3 \\end{pmatrix}} - \\cgreen{\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}} = \\cred{\\begin{pmatrix} 0{,}2 \\\\ 0{,}3 \\end{pmatrix}}."}</MD>
        <p>
          <strong>Norm des absoluten Fehlers:</strong>
        </p>
        <MD>{"\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|_2 = \\sqrt{0{,}2^2 + 0{,}3^2} = \\sqrt{0{,}04 + 0{,}09} = \\sqrt{0{,}13} \\approx 0{,}361."}</MD>
        <p>
          <strong>Relativer Fehler</strong>, wegen{" "}
          <M>{"\\left\\| \\cgreen{\\bv} \\right\\|_2 = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5"}</M>:
        </p>
        <MD>{"\\corange{\\delta_{\\bv}} = \\frac{\\left\\| \\cred{\\bDelta_{\\bv}} \\right\\|_2}{\\left\\| \\cgreen{\\bv} \\right\\|_2} = \\frac{\\sqrt{0{,}13}}{5} \\approx \\frac{0{,}361}{5} \\approx 0{,}072 = 7{,}2\\,\\%."}</MD>
        <p>
          <strong>Fehlerschranke:</strong> Wegen{" "}
          <M>{"\\corange{\\delta_{\\bv}} \\approx 0{,}072 \\le 0{,}1"}</M> ist{" "}
          <M>{"\\eps = 0{,}1"}</M> eine relative Fehlerschranke.
        </p>
        <p>
          Zur Probe können wir auch Lemma 4.1.3 nachrechnen: Es ist{" "}
          <M>{"\\left\\| \\cblue{\\wt{\\bv}} \\right\\|_2 = \\sqrt{3{,}2^2 + 4{,}3^2} = \\sqrt{28{,}73} \\approx 5{,}3600"}</M>,
          und tatsächlich gilt{" "}
          <M>{"5 \\cdot (1 - \\corange{\\delta_{\\bv}}) \\approx 4{,}6394 \\le 5{,}3600 \\le 5{,}3606 \\approx 5 \\cdot (1 + \\corange{\\delta_{\\bv}})"}</M>.
        </p>
      </EnvBlock>
      <ExpandedReading title="Fehlermaß-Rechner: v und ṽ selbst wählen">
        <FehlermassRechner />
      </ExpandedReading>

      <h3 id="sec-4.1.3" className="mt-6 text-lg font-semibold">
        4.1.3 Fehlerzerlegung
      </h3>
      <p>
        Jetzt zur zweiten Leitfrage: <em>Woher</em> kommt der Fehler in einem berechneten
        Ergebnis? Formalisieren wir dazu die Situation. Sei <M>{"f"}</M> ein Problem (eine
        Funktion, die wir auswerten wollen) mit idealem Input <M>{"\\bx"}</M>. Was der Computer
        stattdessen ausführt, ist ein Algorithmus <M>{"\\wt{f}"}</M> (eine Näherung an{" "}
        <M>{"f"}</M>), und zwar am tatsächlichen Input <M>{"\\wt{\\bx}"}</M>, einer Näherung an{" "}
        <M>{"\\bx"}</M>:
      </p>
      <MD>{"\\text{Input } \\wt{\\bx} \\quad \\longrightarrow \\quad \\text{Algorithmus } \\wt{f} \\quad \\longrightarrow \\quad \\text{Ergebnis } \\cblue{\\wt{f}(\\wt{\\bx})}."}</MD>
      <p>
        Weicht das Ergebnis <M>{"\\cblue{\\wt{f}(\\wt{\\bx})}"}</M> vom idealen Wert{" "}
        <M>{"\\cgreen{f(\\bx)}"}</M> ab, kann das an zwei ganz verschiedenen Stellen liegen:
      </p>
      <ul className="max-w-prose list-disc space-y-1 pl-5">
        <li>
          am <em>Fehler im Input</em>, also <M>{"\\wt{\\bx} \\neq \\bx"}</M>, etwa durch Messen oder
          Speichern von <M>{"\\bx"}</M>. Diese Fehler sind <em>unvermeidbar</em>: Sie entstehen,
          bevor unser Programm die erste Zeile ausführt.
        </li>
        <li>
          am <em>Fehler im Algorithmus</em>, also <M>{"\\wt{f} \\neq f"}</M>, etwa durch Rundung in
          Maschinenarithmetik oder durch bewusste Approximation (abgebrochene Reihen,
          Diskretisierung, endlich viele Iterationen). Diese Fehler <em>können wir
          beeinflussen</em>: durch die Wahl eines besseren Algorithmus.
        </li>
      </ul>
      <p>
        Der zentrale Trick dieses Kapitels ist nun, den Gesamtfehler exakt in diese zwei Anteile
        zu zerlegen. Dazu subtrahieren und addieren wir den Zwischenwert{" "}
        <M>{"f(\\wt{\\bx})"}</M> (das ideale Problem, ausgewertet am tatsächlichen Input):
      </p>
      <Eq tag="4.1.1">
        {"\\cpurp{\\underbrace{\\wt{f}(\\wt{\\bx}) - f(\\bx)}_{\\text{Gesamtfehler}}} \\;=\\; \\cred{\\underbrace{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}_{\\substack{\\text{Fehler im Algorithmus} \\\\ \\text{(Maschinenarithmetik)}}}} \\;+\\; \\corange{\\underbrace{f(\\wt{\\bx}) - f(\\bx)}_{\\substack{\\text{Folgefehler aus Input} \\\\ \\text{(exakte Arithmetik)}}}}"}
      </Eq>
      <p>
        Warum ist diese Zerlegung so nützlich? Weil die beiden Terme sauber getrennte
        Verantwortlichkeiten haben:
      </p>
      <EnvBlock kind="Bemerkung" label="4.1.5 (Stabilität und Kondition: Ausblick)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Der erste Term <M>{"\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}"}</M> vergleicht
            Algorithmus und Problem <em>am selben Input</em> und hängt damit nicht vom
            Inputfehler ab. Ist er „klein", nennen wir den Algorithmus <em>stabil</em> (
            <a className="underline" href="#sec-4.3">Abschnitt 4.3</a>).
          </li>
          <li>
            Der zweite Term <M>{"\\corange{f(\\wt{\\bx}) - f(\\bx)}"}</M> vergleicht das ideale
            Problem <M>{"f"}</M> an zwei Inputs, in exakter Arithmetik, und hängt damit nicht
            vom Algorithmus <M>{"\\wt{f}"}</M> ab. Ist er „klein", nennen wir das Problem{" "}
            <M>{"f"}</M> an der Stelle <M>{"\\bx"}</M> <em>gut konditioniert</em> (
            <a className="underline" href="#sec-4.2">Abschnitt 4.2</a>).
          </li>
        </ul>
      </EnvBlock>
      <p>
        Die Zerlegung (4.1.1) trennt also, was der Algorithmus verbockt, von dem, was am
        gestörten Input liegt – und nur den ersten Anteil können wir durch bessere Software
        reparieren. Sehen wir uns das an einem vollständig durchgerechneten Beispiel an.
      </p>
      <EnvBlock kind="Beispiel" label="4.1.6 (Fehlerzerlegung: Berechnung von e^π)">
        <p>
          Bekanntlich lässt sich die Exponentialfunktion als{" "}
          <ConceptLink id="power-series">Potenzreihe</ConceptLink> schreiben:{" "}
          <M>{"e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}"}</M>. Angenommen, wir wollen{" "}
          <M>{"f(\\pi) = e^{\\pi}"}</M> berechnen und verwenden dazu zwei Näherungen: als Input{" "}
          <M>{"\\wt{\\pi} = 3"}</M> (auf eine ganze Zahl gerundet) und als Algorithmus die nach
          dem quadratischen Glied abgebrochene Reihe{" "}
          <M>{"\\wt{f}(x) = \\sum_{n=0}^{2} \\frac{x^n}{n!} = 1 + x + \\tfrac{x^2}{2}"}</M>.
          Zerlegen wir den Gesamtfehler wie in (4.1.1). Am besten erst selbst probieren, dann
          weiterlesen.
        </p>
        <p>
          Der Algorithmus liefert{" "}
          <M>{"\\wt{f}(3) = 1 + 3 + \\tfrac{9}{2} = 8{,}5"}</M>. Einsetzen des Zwischenwerts{" "}
          <M>{"f(3) = e^3"}</M> ergibt die Zerlegung
        </p>
        <MD>{"\\cpurp{\\wt{f}(3) - f(\\pi)} = \\cred{\\bigl[\\wt{f}(3) - f(3)\\bigr]} + \\corange{\\bigl[f(3) - f(\\pi)\\bigr]}."}</MD>
        <p>
          <strong>Fehler im Algorithmus</strong>, also die abgebrochene Reihe gegen{" "}
          <M>{"e^3"}</M>; der Fehler ist gerade der weggelassene Reihenrest, mit Minuszeichen:
        </p>
        <MD>{"\\cred{\\wt{f}(3) - f(3)} = \\left(1 + 3 + \\tfrac{9}{2}\\right) - e^3 = -\\sum_{n=3}^{\\infty} \\frac{3^n}{n!} \\approx 8{,}5 - 20{,}086 = \\cred{-11{,}586}."}</MD>
        <p>
          <strong>Folgefehler aus dem Input</strong>, das exakte Problem <M>{"f"}</M> an den
          zwei Inputs <M>{"3"}</M> und <M>{"\\pi"}</M>:
        </p>
        <MD>{"\\corange{f(3) - f(\\pi)} = e^3 - e^{\\pi} \\approx 20{,}086 - 23{,}141 = \\corange{-3{,}055}."}</MD>
        <p>
          <strong>Gesamtfehler</strong>, zur Probe direkt und über die Zerlegung:
        </p>
        <MD>{"\\cpurp{\\wt{f}(3) - f(\\pi)} \\approx 8{,}5 - 23{,}141 = \\cpurp{-14{,}641} = \\cred{(-11{,}586)} + \\corange{(-3{,}055)}. \\quad \\checkmark"}</MD>
        <p>
          Beide Anteile sind hier negativ, und das aus jeweils gutem Grund: Die abgebrochene
          Reihe lässt nur positive Terme weg und unterschätzt <M>{"e^3"}</M> deshalb systematisch;
          und wegen <M>{"3 < \\pi"}</M> und der Monotonie von <M>{"e^x"}</M> ist auch{" "}
          <M>{"e^3 < e^{\\pi}"}</M>. Der Algorithmusfehler dominiert klar (<M>{"-11{,}6"}</M>{" "}
          gegenüber <M>{"-3{,}1"}</M>). Hier würde sich also zuerst ein besserer Algorithmus
          lohnen (mehr Reihenglieder), nicht ein genauerer Input.
        </p>
      </EnvBlock>
      <ExpandedReading title="Fehlerzerlegungs-Explorer: Abbruchordnung und Input-Genauigkeit selbst steuern">
        <FehlerzerlegungExplorer />
      </ExpandedReading>
      <p>
        Damit haben wir das Vokabular beisammen: Fehler messen wir mit Normen (absolut oder
        relativ), und den Gesamtfehler eines berechneten Ergebnisses zerlegen wir in den
        Algorithmus-Anteil und den Folgefehler aus dem Input. Die nächsten beiden Abschnitte
        quantifizieren die zwei Anteile: Die <em>Kondition</em> eines Problems misst, wie stark
        Inputfehler im Ergebnis verstärkt werden; die <em>Stabilität</em> beurteilt, wie viel
        Fehler der Algorithmus selbst hinzufügt.
      </p>

      <p className="italic">Vertiefung: Heath §1.2.</p>
    </div>
  );
}
