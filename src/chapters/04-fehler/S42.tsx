import { type ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { KehrwertWidget, SummenKonditionWidget } from "./widgets/S42Kondition";

/**
 * Abschnitt 4.2 — Kondition.
 * Quelle: Folien 04-fehler.Rmd, Block „Kondition" (Z. 179–297): Motivation,
 * 1/x-Beispiel, Definition absolute/relative Konditionszahl, Interpretation,
 * Beispiel f(x) = A⁻¹x, Quiz und Aufgabe. Prosa eigenständig formuliert;
 * die Folien-Herleitung zur relativen Konditionszahl (Z. 240–246) ist hier
 * sauber als Beweis aufgeschrieben.
 */

/** Aufklappbare Selbsttest-Frage: erst selbst überlegen, dann Lösung ansehen. */
function SelfTest({ frage, children }: { frage: ReactNode; children: ReactNode }) {
  return (
    <details className="my-2 max-w-prose rounded-md border border-slate-300 dark:border-slate-600">
      <summary className="cursor-pointer select-none px-3 py-2">
        <span className="font-semibold">Selbsttest.</span> {frage}{" "}
        <span className="text-sm text-slate-500 dark:text-slate-400">(Lösung aufklappen)</span>
      </summary>
      <div className="space-y-2 border-t border-slate-200 px-3 py-2 dark:border-slate-700">
        {children}
      </div>
    </details>
  );
}

export function S42() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 04-fehler, „Kondition".
      </p>
      <p>
        In <a className="underline" href="#sec-4.1">Abschnitt 4.1</a> haben wir den Gesamtfehler
        einer numerischen Rechnung in zwei Teile zerlegt: den Fehler des Algorithmus selbst und
        den Folgefehler, der aus einem fehlerhaften Input entsteht. Um den zweiten Teil geht es
        jetzt. Inputfehler betrachten wir als <em>unvermeidbar</em>: Messwerte sind ungenau,
        Daten wurden gerundet gespeichert, und schon das Ablegen einer reellen Zahl als{" "}
        <ConceptLink id="floating-point">Gleitkommazahl</ConceptLink> erzeugt einen relativen{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> von der Größenordnung der{" "}
        <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>.
      </p>
      <p>
        Die entscheidende Beobachtung: Wie stark sich solche Inputfehler im Ergebnis
        niederschlagen, ist eine Eigenschaft des <em>Problems</em> <M>{"f"}</M> — noch bevor
        irgendein Algorithmus ins Spiel kommt. Stellen wir uns die Menge aller Inputs vor, die
        wir von <M>{"\\bx"}</M> nicht unterscheiden können, weil ihr relativer Fehler unter einer
        Toleranz <M>{"\\delta"}</M> liegt:
      </p>
      <MD>{"E = \\left\\{ \\wt{\\bx} \\colon \\left\\| \\wt{\\bx} - \\bx \\right\\| / \\left\\| \\bx \\right\\| \\le \\delta \\right\\}."}</MD>
      <p>
        Jeder Punkt in <M>{"E"}</M> ist ein plausibler Input, also ist jeder Punkt der Bildmenge{" "}
        <M>{"R = f(E)"}</M> ein plausibles Ergebnis. Ist <M>{"R"}</M> <em>groß</em> im Vergleich
        zu <M>{"E"}</M>, bläst <M>{"f"}</M> kleine Eingabestörungen zu großen
        Ergebnisänderungen auf — wir nennen das Problem dann{" "}
        <em>schlecht konditioniert</em>. Vorsicht: Kein noch so guter Algorithmus kann das
        reparieren, denn er sieht nur <M>{"\\wt{\\bx}"}</M> und kann nicht wissen, welcher Punkt
        von <M>{"E"}</M> der „wahre" Input war.
      </p>

      <h3 id="sec-4.2.1" className="mt-6 text-lg font-semibold">
        4.2.1 Ein Warnbeispiel: der Kehrwert
      </h3>
      <p>
        Wie schlimm kann es werden? Ein bewusst extremes Beispiel von den Folien:
      </p>
      <EnvBlock kind="Beispiel" label="4.2.1 (Kehrwert nahe null)">
        <p>
          Sei <M>{"f(x) = x^{-1}"}</M> mit Input <M>{"x = 10^{-17}"}</M>, und sei der gestörte
          Input <M>{"\\wt{x} = x + \\cred{\\eps}"}</M> mit{" "}
          <M>{"\\cred{\\eps} \\in \\left(-10^{-17},\\, 10^{-17}\\right)"}</M>. Dann durchläuft{" "}
          <M>{"\\wt{x}"}</M> das Intervall <M>{"\\left(0,\\, 2 \\cdot 10^{-17}\\right)"}</M> und
          damit
        </p>
        <MD>{"f(\\wt{x}) = \\frac{1}{\\wt{x}} \\in \\left( \\tfrac{1}{2} \\cdot 10^{17},\\, \\infty \\right)."}</MD>
        <p>
          Der Output kann also um <em>Größenordnungen</em> vom wahren Wert{" "}
          <M>{"f(x) = 10^{17}"}</M> abweichen. Rechnen wir den relativen Outputfehler explizit
          aus — die Störung <M>{"\\cred{\\eps}"}</M> verfolgen wir in Rot:
        </p>
        <MD>{"f(\\wt{x}) - f(x) = \\frac{1}{x + \\cred{\\eps}} - \\frac{1}{x} = \\frac{x - (x + \\cred{\\eps})}{(x + \\cred{\\eps})\\, x} = \\frac{-\\cred{\\eps}}{(x + \\cred{\\eps})\\, x},"}</MD>
        <p>und nach Division durch <M>{"f(x) = 1/x"}</M>:</p>
        <MD>{"\\cgreen{\\frac{\\left| f(\\wt{x}) - f(x) \\right|}{\\left| f(x) \\right|}} = \\frac{\\left| \\cred{\\eps} \\right|}{\\left| x + \\cred{\\eps} \\right|} = \\corange{\\frac{|x|}{\\left| x + \\cred{\\eps} \\right|}} \\cdot \\frac{\\left| \\cred{\\eps} \\right|}{|x|}."}</MD>
        <p>
          Der <span style={{ color: "#009E73" }}>relative Outputfehler</span> ist also der{" "}
          <span style={{ color: "#D55E00" }}>relative Inputfehler</span>, multipliziert mit dem{" "}
          <span style={{ color: "#E69F00" }}>Verstärkungsfaktor</span>{" "}
          <M>{"\\corange{|x| / |x + \\cred{\\eps}|}"}</M>. Für{" "}
          <M>{"\\cred{\\eps} \\to -10^{-17}"}</M> wächst dieser Faktor über alle Grenzen —
          insgesamt durchläuft der relative Outputfehler das gesamte Intervall{" "}
          <M>{"[0, \\infty)"}</M>. Und das, obwohl die Störung absolut winziger ist als jede
          Messgenauigkeit der Welt: <M>{"|\\cred{\\eps}| < 10^{-17}"}</M>. Relativ zu{" "}
          <M>{"x"}</M> kann sie allerdings bis zu 100 % betragen — diesen Unterschied schauen wir
          uns gleich noch genauer an.
        </p>
      </EnvBlock>
      <ExpandedReading title="Kondition-Spielwiese: der Kehrwert unter Störungen">
        <KehrwertWidget />
      </ExpandedReading>

      <h3 id="sec-4.2.2" className="mt-6 text-lg font-semibold">
        4.2.2 Konditionszahlen
      </h3>
      <p>
        Um „sensitiv gegenüber Inputfehlern" quantitativ zu fassen, setzen wir Output- und
        Inputfehler direkt ins Verhältnis — einmal für absolute, einmal für relative Fehler. Im
        Folgenden betrachten wir Abbildungen <M>{"f \\colon \\R^n \\to \\R^m"}</M>;{" "}
        <M>{"\\left\\| \\cdot \\right\\|"}</M> bezeichnet eine beliebige Vektor
        <ConceptLink id="norm">norm</ConceptLink> bzw. die von ihr induzierte{" "}
        <ConceptLink id="matrix-norm">Operatornorm</ConceptLink> für Matrizen (
        <a className="underline" href="?k=03-matrix-spur-norm#sec-3.3">Abschnitt 3.3</a>).
      </p>
      <EnvBlock kind="Definition" label="4.2.2 (Konditionszahl)">
        <p>Sei <M>{"f"}</M> ein Problem mit Input <M>{"\\bx"}</M>.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Die <em>absolute Konditionszahl</em>{" "}
            <M>{"\\kappa_{abs} = \\kappa_{abs}(f, \\bx)"}</M> ist die kleinste Zahl mit
            <MD>{"\\left\\| f(\\wt{\\bx}) - f(\\bx) \\right\\| \\le \\kappa_{abs} \\left\\| \\wt{\\bx} - \\bx \\right\\|, \\quad \\text{für } \\wt{\\bx} \\to \\bx."}</MD>
          </li>
          <li>
            Die <em>relative Konditionszahl</em>{" "}
            <M>{"\\kappa_{rel} = \\kappa_{rel}(f, \\bx)"}</M> ist die kleinste Zahl mit
            <MD>{"\\frac{\\left\\| f(\\wt{\\bx}) - f(\\bx) \\right\\|}{\\left\\| f(\\bx) \\right\\|} \\le \\kappa_{rel} \\frac{\\left\\| \\wt{\\bx} - \\bx \\right\\|}{\\left\\| \\bx \\right\\|}, \\quad \\text{für } \\wt{\\bx} \\to \\bx."}</MD>
          </li>
        </ul>
      </EnvBlock>
      <EnvBlock kind="Bemerkung" label="4.2.3 (Wie lesen wir das?)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Der Zusatz „für <M>{"\\wt{\\bx} \\to \\bx"}</M>" bedeutet: Die Ungleichung muss
            nicht für alle <M>{"\\wt{\\bx}"}</M> gelten, sondern nur für hinreichend kleine
            Störungen. <M>{"\\kappa"}</M> ist also der schlimmste Verstärkungsfaktor{" "}
            <em>im Grenzfall</em> verschwindender Störung — Konditionszahlen sind asymptotische
            Größen, und sie hängen sowohl vom Problem <M>{"f"}</M> als auch von der
            konkreten Stelle <M>{"\\bx"}</M> ab.
          </li>
          <li>
            Für <ConceptLink id="differentiability">differenzierbares</ConceptLink>{" "}
            <M>{"f \\colon \\R \\to \\R"}</M> können wir die Konditionszahlen direkt ausrechnen:
            Wegen <M>{"f(\\wt{x}) - f(x) \\approx f'(x)\\,(\\wt{x} - x)"}</M> (
            <ConceptLink id="taylor-series">Taylor-Näherung</ConceptLink> erster Ordnung) gilt
            <MD>{"\\kappa_{abs} = \\left| f'(x) \\right| \\quad \\text{und} \\quad \\kappa_{rel} = \\frac{\\left| f'(x) \\right| \\, |x|}{\\left| f(x) \\right|}."}</MD>
          </li>
          <li>
            Meist ist <M>{"\\kappa_{rel}"}</M> die relevantere Größe: Gleitkommarechnung
            erzeugt naturgemäß <em>relative</em> Fehler (
            <a className="underline" href="#sec-4.1">Abschnitt 4.1</a>), und relative Fehler
            sind unabhängig von Maßeinheiten und Skalierung.
          </li>
        </ul>
      </EnvBlock>
      <p>
        Die Konditionszahl sortiert Probleme in gutartige und bösartige — mit einem wichtigen
        Extremfall:
      </p>
      <EnvBlock kind="Bemerkung" label="4.2.4 (Interpretation)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <em>gut konditioniert</em> (<M>{"\\kappa \\lesssim 1"}</M>): Ein Inputfehler führt
            zu einem ähnlich großen oder kleineren Outputfehler.
          </li>
          <li>
            <em>schlecht konditioniert</em> (<M>{"\\kappa \\gg 1"}</M>): Jeglicher Inputfehler
            führt zu einem viel größeren Outputfehler. Als Faustregel bei{" "}
            <M>{"\\kappa_{rel} \\approx 10^k"}</M>: Wir verlieren bis zu <M>{"k"}</M>{" "}
            signifikante Dezimalstellen gegenüber der Genauigkeit des Inputs.
          </li>
          <li>
            <em>schlecht gestellt</em> (engl. <em>ill-posed</em>, <M>{"\\kappa = \\infty"}</M>):
            Bei Inputfehlern ist das Problem praktisch nicht lösbar — beliebig kleine Störungen
            können das Ergebnis beliebig stark verfälschen.
          </li>
        </ul>
      </EnvBlock>
      <p>
        Mit den Formeln aus Bemerkung 4.2.3 können wir nun auch das Rätsel aus dem Warnbeispiel
        auflösen:
      </p>
      <EnvBlock kind="Beispiel" label="4.2.5 (Der Kehrwert, aufgelöst)">
        <p>
          Für <M>{"f(x) = x^{-1}"}</M> ist <M>{"f'(x) = -x^{-2}"}</M>, also an der Stelle{" "}
          <M>{"x = 10^{-17}"}</M>:
        </p>
        <MD>{"\\kappa_{abs} = \\left| f'(x) \\right| = \\frac{1}{x^2} = 10^{34}, \\qquad \\kappa_{rel} = \\frac{\\left| f'(x) \\right| \\, |x|}{\\left| f(x) \\right|} = \\frac{x^{-2} \\cdot x}{x^{-1}} = 1."}</MD>
        <p>
          Absolut gemessen ist das Problem also katastrophal sensitiv (<M>{"\\kappa_{abs} = 10^{34}"}</M>),
          relativ gemessen dagegen völlig harmlos: Asymptotisch wird ein relativer Inputfehler
          von 0,1 % zu einem relativen Outputfehler von ebenfalls 0,1 %. Das Drama in
          Beispiel 4.2.1 entsteht, weil die Störungen dort <em>relativ zu</em> <M>{"x"}</M>{" "}
          eben nicht klein waren (bis zu 100 %): Ein absoluter Fehler fester Größe — etwa ein
          additiver Messfehler — bedeutet bei winzigem <M>{"x"}</M> eine riesige relative
          Störung. Merken wir uns: <em>Welche</em> Konditionszahl zählt, hängt davon ab, welche
          Fehlerart im Input unvermeidbar ist. Im Widget oben sehen wir beide Regime — für
          kleine <M>{"\\eps/x"}</M> liegt die Verstärkung nahe 1, erst wenn <M>{"\\eps"}</M> in
          die Größenordnung von <M>{"x"}</M> kommt, explodiert sie.
        </p>
      </EnvBlock>

      <h3 id="sec-4.2.3" className="mt-6 text-lg font-semibold">
        4.2.3 Kondition eines linearen Gleichungssystems
      </h3>
      <p>
        Nun zum wichtigsten Beispiel dieses Kapitels. Wir lösen ein{" "}
        <ConceptLink id="linear-system">lineares Gleichungssystem</ConceptLink>{" "}
        <M>{"\\bA \\by = \\bx"}</M> mit invertierbarem{" "}
        <M>{"\\bA \\in \\R^{n \\times n}"}</M>, wobei die rechte Seite <M>{"\\bx"}</M> der
        fehlerbehaftete Input ist. Als Problem geschrieben:{" "}
        <M>{"f(\\bx) = \\bA^{-1} \\bx = \\by"}</M> — wobei die{" "}
        <ConceptLink id="matrix-inverse">Inverse</ConceptLink> hier nur die Lösungsabbildung
        bezeichnet, nicht etwa eine Empfehlung, sie auszurechnen. Wie sensitiv reagiert die
        Lösung <M>{"\\by"}</M> auf Störungen von <M>{"\\bx"}</M>? Die Antwort führt genau auf
        die <em>Konditionszahl der Matrix</em>{" "}
        <M>{"\\kappa(\\bA) = \\left\\| \\bA \\right\\| \\left\\| \\bA^{-1} \\right\\|"}</M>,
        die wir in <a className="underline" href="?k=03-matrix-spur-norm#sec-3.5">Abschnitt 3.5</a> kennengelernt
        haben.
      </p>
      <EnvBlock kind="Satz" label="4.2.6 (Kondition der Lösung eines LGS)">
        <p>
          Sei <M>{"\\bA \\in \\R^{n \\times n}"}</M> invertierbar und{" "}
          <M>{"f(\\bx) = \\bA^{-1} \\bx"}</M>. Bezüglich einer beliebigen Vektornorm und der von
          ihr induzierten Operatornorm gilt dann
        </p>
        <MD>{"\\kappa_{abs} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|}, \\qquad \\kappa_{rel} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|} \\, \\frac{\\left\\| \\bx \\right\\|}{\\left\\| \\bA^{-1} \\bx \\right\\|} \\; \\le \\; \\left\\| \\bA \\right\\| \\cgreen{\\left\\| \\bA^{-1} \\right\\|} = \\corange{\\kappa(\\bA)}."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              <M>{"f"}</M> ist <ConceptLink id="linear-map">linear</ConceptLink>; wir kürzen die
              Störung als <M>{"\\cbred{\\bh} = \\wt{\\bx} - \\bx"}</M> ab
            </>
          }
        >
          <MD>{"f(\\wt{\\bx}) - f(\\bx) = \\bA^{-1} \\wt{\\bx} - \\bA^{-1} \\bx = \\bA^{-1} \\cbred{\\bh}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              definierende Eigenschaft der Operatornorm:{" "}
              <M>{"\\left\\| \\bA^{-1} \\bv \\right\\| \\le \\left\\| \\bA^{-1} \\right\\| \\left\\| \\bv \\right\\|"}</M>{" "}
              für alle <M>{"\\bv"}</M> (<a className="underline" href="?k=03-matrix-spur-norm#sec-3.3">Abschnitt 3.3</a>)
            </>
          }
        >
          <MD>{"\\left\\| f(\\wt{\\bx}) - f(\\bx) \\right\\| = \\left\\| \\bA^{-1} \\cbred{\\bh} \\right\\| \\le \\cgreen{\\left\\| \\bA^{-1} \\right\\|} \\left\\| \\cbred{\\bh} \\right\\| \\quimpl \\kappa_{abs} \\le \\cgreen{\\left\\| \\bA^{-1} \\right\\|}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Operatornorm ist ein Maximum:{" "}
              <M>{"\\cgreen{\\left\\| \\bA^{-1} \\right\\|} = \\max_{\\bv \\ne \\bnull} \\left\\| \\bA^{-1} \\bv \\right\\| / \\left\\| \\bv \\right\\|"}</M>,
              und eine maximierende Richtung dürfen wir beliebig klein skalieren
            </>
          }
        >
          <p>
            Keine kleinere Konstante genügt: Wählen wir <M>{"\\cbred{\\bh}"}</M> (beliebig
            klein) entlang einer maximierenden Richtung, gilt in der Ungleichung Gleichheit.
            Also ist <M>{"\\kappa_{abs} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|}"}</M>.
          </p>
        </PStep>
        <PStep
          why={
            <>
              den Quotienten aus relativem Output- und Inputfehler umsortieren; dann liefern
              Schritt 2 und 3 wieder Schranke und Gleichheitsfall für den ersten Faktor
            </>
          }
        >
          <MD>{"\\frac{\\left\\| \\bA^{-1} \\cbred{\\bh} \\right\\| / \\left\\| \\bA^{-1} \\bx \\right\\|}{\\left\\| \\cbred{\\bh} \\right\\| / \\left\\| \\bx \\right\\|} = \\underbrace{\\frac{\\left\\| \\bA^{-1} \\cbred{\\bh} \\right\\|}{\\left\\| \\cbred{\\bh} \\right\\|}}_{\\le\\, \\cgreen{\\left\\| \\bA^{-1} \\right\\|}} \\cdot \\frac{\\left\\| \\bx \\right\\|}{\\left\\| \\bA^{-1} \\bx \\right\\|} \\quimpl \\kappa_{rel} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|} \\, \\frac{\\left\\| \\bx \\right\\|}{\\left\\| \\bA^{-1} \\bx \\right\\|}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              substituiere <M>{"\\by = \\bA^{-1} \\bx"}</M>, also <M>{"\\bx = \\bA \\by"}</M>;
              Operatornorm-Schranke{" "}
              <M>{"\\left\\| \\bA \\by \\right\\| \\le \\left\\| \\bA \\right\\| \\left\\| \\by \\right\\|"}</M>
            </>
          }
        >
          <MD>{"\\kappa_{rel} = \\cgreen{\\left\\| \\bA^{-1} \\right\\|} \\, \\frac{\\left\\| \\bA \\by \\right\\|}{\\left\\| \\by \\right\\|} \\le \\left\\| \\bA \\right\\| \\cgreen{\\left\\| \\bA^{-1} \\right\\|} = \\corange{\\kappa(\\bA)}"}</MD>
        </PStep>
      </Proof>
      <EnvBlock kind="Bemerkung" label="4.2.7 (Konditionszahl einer Matrix)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Die relative Kondition des Gleichungslösens hängt von der rechten Seite{" "}
            <M>{"\\bx"}</M> ab; <M>{"\\corange{\\kappa(\\bA)} = \\left\\| \\bA \\right\\| \\left\\| \\bA^{-1} \\right\\|"}</M>{" "}
            ist die von <M>{"\\bx"}</M> unabhängige <em>Worst-Case</em>-Schranke — und sie wird
            für ungünstige <M>{"\\bx"}</M> auch angenommen. Das erklärt im Nachhinein, warum
            genau dieses Produkt in{" "}
            <a className="underline" href="?k=03-matrix-spur-norm#sec-3.5">Abschnitt 3.5</a> den Namen{" "}
            <em>Konditionszahl von</em> <M>{"\\bA"}</M> bekommen hat.
          </li>
          <li>
            Für die von <M>{"\\left\\| \\cdot \\right\\|_2"}</M> induzierte Operatornorm (
            <em>Spektralnorm</em>) gilt
            <MD>{"\\kappa_2(\\bA) = \\frac{\\sqrt{\\lambda_{\\max}\\left(\\bA^\\top\\bA\\right)}}{\\sqrt{\\lambda_{\\min}\\left(\\bA^\\top\\bA\\right)}} = \\frac{\\sigma_{\\max}(\\bA)}{\\sigma_{\\min}(\\bA)},"}</MD>
            das Verhältnis des größten zum kleinsten{" "}
            <ConceptLink id="singular-value-decomposition">Singulärwert</ConceptLink> (bzw. der
            Wurzeln der extremen{" "}
            <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> von{" "}
            <M>{"\\bA^\\top\\bA"}</M>).
          </li>
        </ul>
      </EnvBlock>
      <SelfTest
        frage={
          <>
            Sei{" "}
            <M>{"\\bA = \\begin{pmatrix} 2 & 0 & 0 \\\\ 0 & 5 & 0 \\\\ 0 & 0 & 0{,}1 \\end{pmatrix}"}</M>.
            Was ist die Konditionszahl <M>{"\\kappa_2(\\bA)"}</M> bezüglich der 2-Norm — 2, 5,
            20 oder 50?
          </>
        }
      >
        <p>
          Für eine <ConceptLink id="diagonal-matrix">Diagonalmatrix</ConceptLink> ist{" "}
          <M>{"\\bA^\\top\\bA = \\diag\\left(4,\\, 25,\\, 0{,}01\\right)"}</M>, die
          Singulärwerte sind also die Beträge der Diagonaleinträge:{" "}
          <M>{"\\sigma \\in \\{2,\\, 5,\\, 0{,}1\\}"}</M>. Damit
        </p>
        <MD>{"\\kappa_2(\\bA) = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}} = \\frac{5}{0{,}1} = 50."}</MD>
        <p>
          Vorsicht vor der Distraktor-Antwort 20 <M>{"= 2/0{,}1"}</M>: Der größte Singulärwert
          ist 5, nicht der erste Diagonaleintrag 2. Die Werte 2 und 5 wären nur Normen, keine
          Konditionszahlen — <M>{"\\kappa_2"}</M> misst das <em>Verhältnis</em> von stärkster zu
          schwächster Streckung.
        </p>
      </SelfTest>

      <h3 id="sec-4.2.4" className="mt-6 text-lg font-semibold">
        4.2.4 Aufgabe: die Kondition einer Summe
      </h3>
      <p>
        Zum Abschluss eine Aufgabe von den Folien — versuchen wir es erst selbst, bevor wir die
        Lösung aufklappen. Sie sieht harmlos aus, trägt aber den Keim eines Phänomens in sich,
        das wir schon kennen.
      </p>
      <EnvBlock kind="Beispiel" label="4.2.8 (Aufgabe: Kondition der Summe)">
        <p>
          Sei{" "}
          <M>{"f(\\bx) = x_1 + x_2 = \\binom{1}{1}^\\top \\bx = \\symbf{1}^\\top \\bx"}</M> mit{" "}
          <M>{"\\bx \\in \\R^2"}</M> und der euklidischen Norm{" "}
          <M>{"\\left\\| \\cdot \\right\\|_2"}</M>.
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Was sind die Konditionszahlen?</li>
          <li>Für welche <M>{"\\bx"}</M> ist das Problem schlecht konditioniert?</li>
        </ol>
        <details className="mt-2 rounded border border-slate-300 bg-white/60 px-3 py-1.5 dark:border-slate-600 dark:bg-slate-900/40">
          <summary className="cursor-pointer select-none font-medium">Lösung anzeigen</summary>
          <div className="space-y-2 pt-2">
            <p>
              <strong>1.</strong> Für die Störung <M>{"\\cbred{\\bh} = \\wt{\\bx} - \\bx"}</M>{" "}
              liefert die{" "}
              <ConceptLink id="cauchy-schwarz-inequality">Cauchy-Schwarz-Ungleichung</ConceptLink>
            </p>
            <MD>{"\\left| f(\\wt{\\bx}) - f(\\bx) \\right| = \\left| \\symbf{1}^\\top \\cbred{\\bh} \\right| \\le \\left\\| \\symbf{1} \\right\\|_2 \\left\\| \\cbred{\\bh} \\right\\|_2 = \\sqrt{2}\\, \\left\\| \\cbred{\\bh} \\right\\|_2,"}</MD>
            <p>
              mit Gleichheit genau dann, wenn <M>{"\\cbred{\\bh}"}</M> parallel zu{" "}
              <M>{"\\symbf{1} = (1, 1)^\\top"}</M> liegt — solche beliebig kleinen Störungen
              gibt es, also ist die Schranke scharf:{" "}
              <M>{"\\kappa_{abs} = \\sqrt{2}"}</M>. (Die Folien notieren nur{" "}
              <M>{"\\kappa_{abs} \\le \\sqrt{2}"}</M>; der Gleichheitsfall von Cauchy-Schwarz
              liefert sogar Gleichheit.) Da <M>{"f"}</M> linear ist, tritt derselbe
              Gleichheitsfall auch beim relativen Fehlerquotienten auf, und wie im Beweis von
              Satz 4.2.6 folgt
            </p>
            <MD>{"\\kappa_{rel} = \\kappa_{abs}\\, \\frac{\\left\\| \\bx \\right\\|_2}{\\left| f(\\bx) \\right|} = \\corange{\\frac{\\sqrt{2}\\, \\left\\| \\bx \\right\\|_2}{\\left| x_1 + x_2 \\right|}}."}</MD>
            <p>
              <strong>2.</strong> Schlecht konditioniert ist das Problem, wenn{" "}
              <M>{"\\corange{\\kappa_{rel}} \\gg 1"}</M>, also wenn{" "}
              <M>{"\\left| x_1 + x_2 \\right| \\approx 0"}</M>, während{" "}
              <M>{"\\left\\| \\bx \\right\\|_2"}</M> nicht klein ist — sprich für{" "}
              <M>{"x_1 \\approx -x_2"}</M>, nahe der Antidiagonalen. Dort heben sich die beiden
              Summanden fast auf: Das ist exakt die{" "}
              <ConceptLink id="cancellation">Auslöschung</ConceptLink> aus{" "}
              <a className="underline" href="?k=02-algos#sec-2.1">Abschnitt 2.1</a>, jetzt als
              Konditionsaussage über das <em>Problem</em> „addiere zwei Zahlen" — unabhängig
              davon, wie wir die Summe ausrechnen. Auf der Diagonalen{" "}
              <M>{"x_1 = x_2"}</M> gilt dagegen <M>{"\\kappa_{rel} = 1"}</M>: besser geht es
              nicht.
            </p>
          </div>
        </details>
      </EnvBlock>
      <ExpandedReading title="Kondition-Spielwiese: die Summe zweier Zahlen in der Ebene">
        <SummenKonditionWidget />
      </ExpandedReading>
      <p>
        Diese Rechnung ist mehr als eine Fingerübung: In{" "}
        <a className="underline" href="#sec-4.3">Abschnitt 4.3</a> wird genau die Kondition der
        Differenz zweier fast gleicher Zahlen erklären, warum die
        Verschiebungsformel für die Varianz numerisch scheitert.
      </p>

      <p className="italic">
        Vertiefung: Heath §1.2.5–1.2.6 (Fehlerfortpflanzung, Sensitivität und Kondition).
      </p>
    </div>
  );
}
