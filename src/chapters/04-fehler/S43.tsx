/**
 * §4.3 Stabilität von Algorithmen.
 * Quelle: Folien 04-fehler.Rmd, Block „Stabilität von Algorithmen"
 * (Zeilen 298–396): Fehlerzerlegung wiederaufgegriffen, Definition stabil,
 * Beispiel SGD, Satz zur Stabilität zusammengesetzter Algorithmen mit
 * Beweis, Beispiel Stabilität der Varianz. Prosa eigenständig aus den
 * Folien formuliert; alle Rechnungen (κ_rel-Formel, R-Ausgaben) verifiziert.
 */
import { type ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { KappaRechner, SgdLernratenDemo } from "./widgets/S43Widgets";

const P = "my-3 max-w-prose leading-relaxed";
const H3 = "mt-6 text-lg font-semibold";

/** Selbsttest-Frage mit aufklappbarer Lösung (Muster aus 01-intro/S11.tsx). */
function Frage({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <li className="space-y-1">
      <div>{q}</div>
      <details className="rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40">
        <summary className="cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300">
          Lösung anzeigen
        </summary>
        <div className="pt-1.5">{children}</div>
      </details>
    </li>
  );
}

export function S43() {
  return (
    <>
      <p className="text-sm italic text-slate-500 dark:text-slate-400">
        Grundlage: Folien 04-fehler, „Stabilität von Algorithmen".
      </p>

      <p className={P}>
        Erinnern wir uns an die Fehlerzerlegung aus{" "}
        <a className="underline" href="#sec-4.1">
          Abschnitt 4.1
        </a>
        : Wenn wir ein Problem <M>{"f"}</M> mit einem Algorithmus <M>{"\\wt{f}"}</M> auf
        einem fehlerbehafteten Input <M>{"\\wt{\\bx}"}</M> lösen, zerfällt der Gesamtfehler
        in zwei Teile:
      </p>
      <MD>
        {
          "\\text{Gesamtfehler} = \\wt{f}(\\wt{\\bx}) - f(\\bx) = \\underbrace{\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}}_{\\text{Fehler im Algorithmus}} + \\underbrace{\\corange{f(\\wt{\\bx}) - f(\\bx)}}_{\\text{Folgefehler aus Input}}"
        }
      </MD>
      <p className={P}>
        Den <M>{"\\corange{\\text{zweiten Summanden}}"}</M> haben wir in{" "}
        <a className="underline" href="#sec-4.2">
          Abschnitt 4.2
        </a>{" "}
        untersucht: Er hängt nur vom Problem ab, nicht vom Algorithmus, und die{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink> sagt uns, wie stark
        er den unvermeidbaren Inputfehler verstärkt. Jetzt nehmen wir uns den{" "}
        <M>{"\\cred{\\text{ersten Summanden}}"}</M> vor: den Fehler, den der Algorithmus{" "}
        <em>selbst</em> hinzufügt — durch{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> in jeder einzelnen{" "}
        <ConceptLink id="floating-point">Gleitkomma</ConceptLink>-Operation, durch
        abgebrochene Reihen, durch geschätzte Zwischengrößen. Dieser Anteil hängt nicht vom
        Inputfehler ab; er entsteht, selbst wenn der Input exakt ist. Ganz analog zur
        Kondition geben wir ihm einen Namen:
      </p>
      <EnvBlock kind="Definition" label="4.3.1 (Stabilität)">
        <p>
          Sei <M>{"f"}</M> ein Problem und <M>{"\\wt{f}"}</M> ein Algorithmus dafür. Ist der{" "}
          <em>algorithmische Fehler</em> <M>{"\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}"}</M>{" "}
          „klein", nennen wir <M>{"\\wt{f}"}</M> <em>stabil</em> (stable), andernfalls{" "}
          <em>instabil</em>.
        </p>
      </EnvBlock>
      <p className={P}>
        Die Definition ist bewusst informell — was „klein" heißt, hängt vom Kontext ab. Ein
        brauchbarer Maßstab ist die Kondition des Problems selbst: Inputfehler und Kondition
        erzwingen ohnehin einen gewissen Fehler im Ergebnis, und ein stabiler Algorithmus
        soll nicht wesentlich <em>mehr</em> Fehler produzieren als diesen unvermeidbaren
        Anteil. Wichtig ist die Arbeitsteilung der beiden Begriffe: Die{" "}
        <em>Kondition</em> ist eine Eigenschaft des <em>Problems</em> — wir können sie nicht
        wählen. Die <em>Stabilität</em> ist eine Eigenschaft des <em>Algorithmus</em> — und
        den wählen wir sehr wohl. Genau deshalb lohnt sich dieser Abschnitt: Für dasselbe
        Problem können zwei mathematisch äquivalente Rechenwege dramatisch unterschiedlich
        stabil sein.
      </p>

      <h3 className={H3}>Ein Beispiel aus dem maschinellen Lernen: SGD</h3>
      <p className={P}>
        Bevor wir Stabilität quantitativ fassen, ein Beispiel, das zeigt, dass der Begriff
        weit über Rundungsfehler hinaus trägt.
      </p>
      <EnvBlock kind="Beispiel" label="4.3.2 (Stochastic Gradient Descent)">
        <p>
          Beim Training von Machine-Learning-Modellen minimieren wir eine{" "}
          <ConceptLink id="objective-function">Verlustfunktion</ConceptLink>{" "}
          <M>{"L(\\theta)"}</M> mit dem{" "}
          <ConceptLink id="gradient-descent">Gradientenabstieg</ConceptLink> in seiner
          stochastischen Variante (SGD):
        </p>
        <MD>{"\\theta_{k+1} = \\theta_k - \\alpha\\, \\wh{\\nabla} L(\\theta_k),"}</MD>
        <p>
          wobei <M>{"\\wh{\\nabla} L(\\theta_k)"}</M> nur eine <em>Schätzung</em> des{" "}
          <ConceptLink id="gradient">Gradienten</ConceptLink> ist (berechnet auf einem
          zufälligen Teil der Daten, in endlicher Gleitkomma-Genauigkeit) und{" "}
          <M>{"\\alpha > 0"}</M> die <em>Lernrate</em> (learning rate).
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <em>Kleine Lernrate</em> (etwa <M>{"\\alpha = 0{,}001"}</M>): Jeder Schritt ist
            vorsichtig, die Schätz- und Rundungsfehler des Gradienten akkumulieren nur
            langsam — das Verfahren konvergiert zuverlässig gegen ein Optimum.
          </li>
          <li>
            <em>Zu große Lernrate</em> (etwa <M>{"\\alpha = 1"}</M>): Jeder Schritt
            verstärkt die Fehler des geschätzten Gradienten — die Iterierten oszillieren
            um das Optimum oder divergieren ganz.
          </li>
        </ul>
        <p>
          In der Sprache dieses Kapitels: Das <em>Problem</em> <M>{"f"}</M> ist „finde das
          Minimum von <M>{"L"}</M>", der <em>Algorithmus</em> <M>{"\\wt{f}"}</M> ist SGD
          mit endlicher Präzision, und der algorithmische Fehler ist das, was sich über
          die Iterationen <M>{"k"}</M> an Rundungs- und Schätzfehlern ansammelt. Die
          Lernrate ist ein Stabilitätsregler: Sie steuert, ob diese Fehler pro Schritt
          gedämpft oder verstärkt werden.
        </p>
      </EnvBlock>
      <p className={P}>
        Die Praxis kennt dafür eigene Stabilisierungstechniken: <em>Gradient Clipping</em>{" "}
        (deckelt zu große Updates), <em>Batch Normalization</em> (kontrolliert die
        zufälligen Fehler der Gradientenschätzung) und <em>Mixed Precision Training</em>{" "}
        (kontrolliert die Rundungsfehler bei reduzierter Genauigkeit). Alle drei tun im
        Kern dasselbe: Sie verhindern, dass sich kleine Fehler von Schritt zu Schritt
        aufschaukeln.
      </p>
      <ExpandedReading title="Die Lernrate als Stabilitätsregler — SGD zum Ausprobieren">
        <SgdLernratenDemo />
      </ExpandedReading>

      <h3 className={H3}>Zusammengesetzte Algorithmen: die wichtigste Erkenntnis</h3>
      <p className={P}>
        Praktisch jeder Algorithmus ist eine Kette von Teilschritten. Was passiert mit den
        Fehlern der frühen Schritte, wenn spätere Schritte darauf aufbauen? Das folgende
        Resultat verknüpft die Stabilität eines zusammengesetzten Algorithmus mit der{" "}
        <em>Kondition seiner Teilschritte</em> — es ist die wichtigste Erkenntnis dieses
        Abschnitts. Wir betrachten dazu ein Problem, das als{" "}
        <ConceptLink id="function-composition">Verkettung</ConceptLink> zweier Teilprobleme
        geschrieben ist.
      </p>
      <EnvBlock kind="Satz" label="4.3.3 (Stabilität zusammengesetzter Algorithmen)">
        <p>
          Sei <M>{"f"}</M> ein Problem mit Input <M>{"\\bx"}</M>, wobei{" "}
          <M>{"f(\\bx) = (h \\circ g)(\\bx)"}</M> für zwei Teilprobleme <M>{"g"}</M> und{" "}
          <M>{"h"}</M>. Dann gilt für einen Algorithmus{" "}
          <M>{"\\wt{f} = \\wt{h} \\circ \\wt{g}"}</M>:
        </p>
        <MD>
          {
            "\\frac{\\|\\wt{f}(\\bx) - f(\\bx)\\|}{\\|f(\\bx)\\|} \\le \\cred{\\frac{\\|\\wt{h}(\\wt{\\by}) - h(\\wt{\\by})\\|}{\\|h(\\by)\\|}} + \\corange{\\kappa_{rel}(h, g(\\bx))}\\, \\cblue{\\frac{\\|\\wt{g}(\\bx) - g(\\bx)\\|}{\\|g(\\bx)\\|}},"
          }
        </MD>
        <p>
          wobei <M>{"\\by = g(\\bx)"}</M> und <M>{"\\wt{\\by} = \\wt{g}(\\bx)"}</M>.
        </p>
      </EnvBlock>
      <p className={P}>
        Lesen wir die Schranke Term für Term: Der{" "}
        <M>{"\\cred{\\text{erste Summand}}"}</M> ist der algorithmische Fehler von{" "}
        <M>{"\\wt{h}"}</M> allein — er misst, wie stabil der <em>zweite</em> Teilschritt
        für sich genommen ist. Der <M>{"\\cblue{\\text{blaue Faktor}}"}</M> ist der relative
        Fehler, den der <em>erste</em> Teilschritt <M>{"\\wt{g}"}</M> produziert (der Input{" "}
        <M>{"\\bx"}</M> ist hier exakt, es handelt sich also um den algorithmischen Fehler
        von <M>{"\\wt{g}"}</M>). Und dieser Fehler wird multipliziert mit{" "}
        <M>{"\\corange{\\kappa_{rel}(h, g(\\bx))}"}</M> — der Kondition des zweiten
        Teilproblems an der Übergabestelle: Aus Sicht von <M>{"h"}</M> ist das Ergebnis von{" "}
        <M>{"\\wt{g}"}</M> nichts anderes als ein fehlerbehafteter Input.
      </p>
      <Proof>
        <PStep
          why={
            <>
              Einsetzen der Definitionen: <M>{"f = h \\circ g"}</M> und{" "}
              <M>{"\\wt{f} = \\wt{h} \\circ \\wt{g}"}</M>
            </>
          }
        >
          <MD>
            {
              "\\frac{\\|\\wt{f}(\\bx) - f(\\bx)\\|}{\\|f(\\bx)\\|} = \\frac{\\|\\wt{h}(\\wt{g}(\\bx)) - h(g(\\bx))\\|}{\\|h(g(\\bx))\\|}"
            }
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Nulladdition: Wir ziehen <M>{"h(\\wt{g}(\\bx))"}</M> ab und addieren es sofort
              wieder. Dieser Term vergleicht das <em>exakte</em> <M>{"h"}</M> mit dem{" "}
              <em>berechneten</em> <M>{"\\wt{h}"}</M> am <em>selben</em> (gestörten) Input —
              genau dadurch trennt sich der Fehler von <M>{"\\wt{h}"}</M> vom Fehler aus{" "}
              <M>{"\\wt{g}"}</M>
            </>
          }
        >
          <MD>
            {
              "= \\frac{\\|\\wt{h}(\\wt{g}(\\bx)) - h(\\wt{g}(\\bx)) + h(\\wt{g}(\\bx)) - h(g(\\bx))\\|}{\\|h(g(\\bx))\\|}"
            }
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Dreiecksungleichung der <ConceptLink id="norm">Norm</ConceptLink>:{" "}
              <M>{"\\|\\bu + \\bv\\| \\le \\|\\bu\\| + \\|\\bv\\|"}</M>
            </>
          }
        >
          <MD>
            {
              "\\le \\cred{\\frac{\\|\\wt{h}(\\wt{g}(\\bx)) - h(\\wt{g}(\\bx))\\|}{\\|h(g(\\bx))\\|}} + \\frac{\\|h(\\wt{g}(\\bx)) - h(g(\\bx))\\|}{\\|h(g(\\bx))\\|}"
            }
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Erster Summand: nur Umbenennung <M>{"\\wt{\\by} = \\wt{g}(\\bx)"}</M>,{" "}
              <M>{"\\by = g(\\bx)"}</M>. Zweiter Summand: Definition der relativen
              Konditionszahl von <M>{"h"}</M> an der Stelle <M>{"\\by"}</M>, angewandt auf
              den gestörten Input <M>{"\\wt{\\by}"}</M> — dabei ist{" "}
              <M>{"\\wt{\\by} - \\by = \\wt{g}(\\bx) - g(\\bx)"}</M>
            </>
          }
        >
          <MD>
            {
              "\\le \\cred{\\frac{\\|\\wt{h}(\\wt{\\by}) - h(\\wt{\\by})\\|}{\\|h(\\by)\\|}} + \\corange{\\kappa_{rel}(h, g(\\bx))}\\, \\cblue{\\frac{\\|\\wt{g}(\\bx) - g(\\bx)\\|}{\\|g(\\bx)\\|}}"
            }
          </MD>
        </PStep>
      </Proof>
      <p className={P}>
        Eine kleine Feinheit: Die Konditionszahl ist über den Grenzwert kleiner Störungen
        definiert (
        <a className="underline" href="#sec-4.2">
          Abschnitt 4.2
        </a>
        ), die letzte Abschätzung gilt also in diesem Sinne — als Näherung erster Ordnung
        für kleine Fehler in <M>{"\\wt{g}"}</M>. Für unsere Zwecke ist das genau die
        richtige Lesart: Wir wollen wissen, um welchen <em>Faktor</em> kleine Fehler
        verstärkt werden.
      </p>
      <EnvBlock kind="Bemerkung" label="4.3.4 (Merkregel)">
        <p>
          Ein schlecht konditioniertes Teilproblem <M>{"h"}</M> (an der Stelle{" "}
          <M>{"\\by = g(\\bx)"}</M>) verstärkt alle Fehler, die <M>{"\\wt{g}"}</M> vorher
          gemacht hat — ein <em>Indiz</em> für die Instabilität von <M>{"\\wt{f}"}</M>.
          Deshalb:{" "}
          <span className="font-semibold">
            Schlecht konditionierte Schritte so früh wie möglich ausführen!
          </span>{" "}
          Ein früher schlecht konditionierter Schritt verstärkt nur den (ohnehin
          unvermeidbaren) Inputfehler. Derselbe Schritt am <em>Ende</em> des Algorithmus
          verstärkt zusätzlich alle Rundungsfehler, die sich bis dahin in den
          Zwischenschritten angesammelt haben.
        </p>
      </EnvBlock>

      <h3 className={H3}>Anwendung: Stabilität der Varianzberechnung</h3>
      <p className={P}>
        Wenden wir den Satz auf ein Beispiel an, das wir aus{" "}
        <a className="underline" href="?k=02-algos#sec-2.1">
          Abschnitt 2.1
        </a>{" "}
        schon kennen — dort haben wir <em>beobachtet</em>, dass die Verschiebungsformel für
        die Varianz katastrophal versagen kann. Jetzt können wir <em>erklären</em>, warum,
        und zwar quantitativ.
      </p>
      <EnvBlock kind="Beispiel" label="4.3.5 (Zwei Algorithmen für die Varianz)">
        <p>
          <strong>Problem:</strong> Berechne die Stichprobenvarianz{" "}
          <M>{"f(\\bx) = \\frac{1}{n} \\sumin \\left(x_i - \\bar{x}\\right)^2"}</M>.
        </p>
        <p>
          <strong>Algorithmen:</strong> Wir vergleichen die zweistufige Rechnung (erst
          zentrieren, dann quadrieren) mit der Verschiebungsformel:
        </p>
        <MD>
          {
            "\\wt{f}_1(\\bx) = \\frac{1}{n} \\sumin \\left(x_i - \\bar{x}\\right)^2, \\qquad \\wt{f}_2(\\bx) = \\cred{\\left(\\frac{1}{n} \\sumin x_i^2\\right)} - \\cblue{\\bar{x}^2}."
          }
        </MD>
        <p>
          Mathematisch sind beide identisch. Als Rechenvorschriften sind sie es nicht:{" "}
          <M>{"\\wt{f}_2"}</M> ist eine Verkettung <M>{"\\wt{f}_2 = \\wt{h} \\circ \\wt{g}"}</M>{" "}
          im Sinne von Satz 4.3.3 — der erste Schritt <M>{"g"}</M> berechnet das Paar
        </p>
        <MD>
          {
            "g(\\bx) = (\\cred{a}, \\cblue{b}) \\quad \\text{mit} \\quad \\cred{a} = \\frac{1}{n} \\sumin x_i^2 \\quad \\text{und} \\quad \\cblue{b} = \\bar{x}^2,"
          }
        </MD>
        <p>
          und der <em>letzte</em> Schritt bildet die Differenz{" "}
          <M>{"h(\\cred{a}, \\cblue{b}) = \\cred{a} - \\cblue{b}"}</M>.
        </p>
      </EnvBlock>
      <p className={P}>
        Nach Satz 4.3.3 müssen wir also die Kondition des letzten Schritts an der
        Übergabestelle untersuchen. Rechnen wir sie aus.
      </p>
      <EnvBlock kind="Lemma" label="4.3.6 (Kondition der Differenz)">
        <p>
          Für <M>{"h(\\cred{a}, \\cblue{b}) = \\cred{a} - \\cblue{b}"}</M> gilt bezüglich
          der <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink>
        </p>
        <MD>
          {
            "\\kappa_{rel}\\bigl(h, (\\cred{a}, \\cblue{b})\\bigr) = \\sqrt{2}\\, \\frac{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}{\\left|\\cred{a} - \\cblue{b}\\right|}."
          }
        </MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              <M>{"h"}</M> ist linear: Die Differenz zweier Funktionswerte ist{" "}
              <M>{"h"}</M>, angewandt auf die Differenz der Inputs — geschrieben als
              Skalarprodukt mit dem Vektor <M>{"(1, -1)^\\top"}</M>
            </>
          }
        >
          <MD>
            {
              "h(\\wt{a}, \\wt{b}) - h(\\cred{a}, \\cblue{b}) = (\\wt{a} - \\cred{a}) - (\\wt{b} - \\cblue{b}) = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}^\\top \\begin{pmatrix} \\wt{a} - \\cred{a} \\\\ \\wt{b} - \\cblue{b} \\end{pmatrix}"
            }
          </MD>
        </PStep>
        <PStep
          why={
            <>
              <ConceptLink id="cauchy-schwarz-inequality">Cauchy-Schwarz-Ungleichung</ConceptLink>{" "}
              mit <M>{"\\left\\| (1, -1)^\\top \\right\\|_2 = \\sqrt{2}"}</M>; für
              Störungen proportional zu <M>{"(1, -1)^\\top"}</M> gilt Gleichheit, die
              Schranke wird also angenommen — <M>{"\\sqrt{2}"}</M> ist die{" "}
              <em>kleinste</em> solche Konstante und damit{" "}
              <M>{"\\kappa_{abs} = \\sqrt{2}"}</M>
            </>
          }
        >
          <MD>
            {
              "\\left| h(\\wt{a}, \\wt{b}) - h(\\cred{a}, \\cblue{b}) \\right| \\le \\sqrt{2}\\, \\left\\| \\begin{pmatrix} \\wt{a} - \\cred{a} \\\\ \\wt{b} - \\cblue{b} \\end{pmatrix} \\right\\|_2"
            }
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Definition der relativen Konditionszahl (
              <a className="underline" href="#sec-4.2">
                Abschnitt 4.2
              </a>
              ): beide Seiten durch <M>{"|h(\\cred{a}, \\cblue{b})| = |\\cred{a} - \\cblue{b}|"}</M>{" "}
              teilen und mit der Inputnorm{" "}
              <M>{"\\left\\| (\\cred{a}, \\cblue{b})^\\top \\right\\|_2 = \\sqrt{\\cred{a}^2 + \\cblue{b}^2}"}</M>{" "}
              erweitern
            </>
          }
        >
          <MD>
            {
              "\\frac{\\left| h(\\wt{a}, \\wt{b}) - h(\\cred{a}, \\cblue{b}) \\right|}{\\left|\\cred{a} - \\cblue{b}\\right|} \\le \\underbrace{\\sqrt{2}\\, \\frac{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}{\\left|\\cred{a} - \\cblue{b}\\right|}}_{=\\, \\corange{\\kappa_{rel}}} \\cdot \\frac{\\left\\| (\\wt{a} - \\cred{a},\\; \\wt{b} - \\cblue{b})^\\top \\right\\|_2}{\\sqrt{\\cred{a}^2 + \\cblue{b}^2}}"
            }
          </MD>
        </PStep>
      </Proof>
      <p className={P}>
        Die Formel sagt präzise, wann es gefährlich wird: Sind <M>{"\\cred{a}"}</M> und{" "}
        <M>{"\\cblue{b}"}</M> <em>groß</em>, liegen aber <em>nah beieinander</em> (
        <M>{"\\cred{a} \\approx \\cblue{b}"}</M>), dann ist der Zähler riesig und der
        Nenner winzig — <M>{"\\corange{\\kappa_{rel}}"}</M> explodiert, und der letzte
        Schritt verstärkt <em>alle</em> vorangegangenen Fehler mit diesem Faktor. Genau das
        passiert bei der Varianz von Daten mit großem Mittelwert: Für{" "}
        <M>{"x_i = c + z_i"}</M> mit Verschiebung <M>{"c"}</M> und Varianz <M>{"1"}</M> ist{" "}
        <M>{"\\cred{a} \\approx c^2 + 1"}</M> und <M>{"\\cblue{b} \\approx c^2"}</M>,
        während die Differenz — die Varianz — bei <M>{"1"}</M> bleibt. Damit wächst
      </p>
      <MD>
        {
          "\\corange{\\kappa_{rel}} \\approx \\sqrt{2}\\, \\frac{\\sqrt{2}\\, c^2}{1} = 2c^2"
        }
      </MD>
      <p className={P}>
        <em>quadratisch</em> in der Verschiebung. Das ist die{" "}
        <ConceptLink id="cancellation">katastrophale Auslöschung</ConceptLink> aus{" "}
        <a className="underline" href="?k=02-algos#sec-2.1">
          Abschnitt 2.1
        </a>{" "}
        — dort können wir mit der interaktiven Demo nachspielen, ab welcher Verschiebung
        die Formel kippt. Und die Merkregel 4.3.4 erklärt, warum <M>{"\\wt{f}_1"}</M>{" "}
        so viel besser dasteht: Auch <M>{"\\wt{f}_1"}</M> subtrahiert fast gleich große
        Zahlen (<M>{"x_i - \\bar{x}"}</M> mit <M>{"x_i \\approx \\bar{x} \\approx c"}</M>),
        aber dieser schlecht konditionierte Schritt kommt <em>zuerst</em> und arbeitet auf
        Zahlen der Größenordnung <M>{"c"}</M>. Bei <M>{"\\wt{f}_2"}</M> kommt die
        Subtraktion ganz am <em>Ende</em>, nach dem Quadrieren, auf Zahlen der
        Größenordnung <M>{"c^2"}</M> — der Verstärkungsfaktor ist <M>{"\\sim c^2"}</M>{" "}
        statt <M>{"\\sim c"}</M>, und er trifft alle vorher akkumulierten Rundungsfehler.
      </p>
      <EnvBlock kind="Beispiel" label="4.3.7 (Die Instabilität in R)">
        <p>
          Das Zahlenexperiment von den Folien: <M>{"n = 1000"}</M> standardnormalverteilte
          Werte, um <M>{"c = 10^{10}"}</M> verschoben. Die wahre Varianz ist <M>{"1"}</M>.
        </p>
        <pre className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-sm dark:bg-slate-900/60">
          <code>{`set.seed(5)
x <- rnorm(10^3, mean = 0, sd = 1) + 10^10
mean((x - mean(x))^2)
#> [1] 1.023151
mean(x^2) - mean(x)^2
#> [1] 16384`}</code>
        </pre>
        <p>
          Die zweistufige Rechnung <M>{"\\wt{f}_1"}</M> liefert <M>{"1{,}023"}</M> — eine
          völlig plausible Stichprobenvarianz. Die Verschiebungsformel <M>{"\\wt{f}_2"}</M>{" "}
          liefert <M>{"16384"}</M>: um mehr als vier Größenordnungen daneben. Passt das zu
          unserer Analyse? Mit <M>{"c = 10^{10}"}</M> ist{" "}
          <M>{"\\corange{\\kappa_{rel}} \\approx 2c^2 = 2 \\cdot 10^{20}"}</M>; die
          Zwischenergebnisse <M>{"\\cred{a}, \\cblue{b} \\approx 10^{20}"}</M> tragen
          relative Rundungsfehler der Größenordnung{" "}
          <ConceptLink id="machine-epsilon">
            <M>{"\\eps \\approx 2{,}2 \\cdot 10^{-16}"}</M>
          </ConceptLink>
          , also erwarten wir relative Fehler im Ergebnis bis etwa{" "}
          <M>{"\\corange{\\kappa_{rel}} \\cdot \\eps \\approx 4 \\cdot 10^{4}"}</M> —
          beobachtet: <M>{"16384/1{,}02 \\approx 1{,}6 \\cdot 10^4"}</M>. Die
          Größenordnung stimmt.
        </p>
        <p>
          Ein hübsches Detail: <M>{"16384 = 2^{14}"}</M> ist genau der Abstand zweier
          benachbarter Maschinenzahlen in der Größenordnung <M>{"10^{20}"}</M>. Was die
          Verschiebungsformel als „Varianz" ausgibt, ist hier also schlicht ein einzelner
          Rundungsschritt der Zwischenergebnisse — mit den Daten hat diese Zahl nichts
          mehr zu tun.
        </p>
      </EnvBlock>
      <ExpandedReading title="Wie schlimm wird es? Der κ-Rechner für den letzten Schritt">
        <KappaRechner />
      </ExpandedReading>

      <h3 className={H3}>Selbsttest</h3>
      <p className={P}>Prüfen wir das Verständnis — erst selbst überlegen, dann aufklappen.</p>
      <ol className="max-w-prose list-decimal space-y-3 pl-5">
        <Frage
          q={
            <>
              Sei <M>{"f = h \\circ g"}</M>, und <M>{"h"}</M> sei an der Stelle{" "}
              <M>{"g(\\bx)"}</M> schlecht konditioniert. Ist der Algorithmus{" "}
              <M>{"\\wt{f} = \\wt{h} \\circ \\wt{g}"}</M> dann zwangsläufig instabil?
            </>
          }
        >
          <p>
            Nein. Satz 4.3.3 liefert nur eine <em>obere Schranke</em>: Die schlechte
            Kondition von <M>{"h"}</M> verstärkt den Fehler von <M>{"\\wt{g}"}</M> — wenn{" "}
            <M>{"\\wt{g}"}</M> aber (nahezu) exakt rechnet, bleibt der verstärkte Term
            trotzdem klein. Eine schlecht konditionierte Zwischenstelle ist deshalb ein{" "}
            <em>Indiz</em> für Instabilität, kein Beweis.
          </p>
        </Frage>
        <Frage
          q={
            <>
              Auch <M>{"\\wt{f}_1"}</M> subtrahiert fast gleich große Zahlen (
              <M>{"x_i - \\bar{x}"}</M> mit <M>{"x_i \\approx \\bar{x}"}</M>). Warum ist{" "}
              <M>{"\\wt{f}_1"}</M> trotzdem viel stabiler als <M>{"\\wt{f}_2"}</M>?
            </>
          }
        >
          <p>
            Wegen Position und Größenordnung des schlecht konditionierten Schritts. Bei{" "}
            <M>{"\\wt{f}_1"}</M> steht die Subtraktion ganz am <em>Anfang</em> und
            verarbeitet Zahlen der Größenordnung <M>{"c"}</M> — die absoluten
            Rundungsfehler sind <M>{"\\sim c \\cdot \\eps"}</M>, und alles Weitere
            (Quadrieren, Mitteln) ist gut konditioniert. Bei <M>{"\\wt{f}_2"}</M> steht
            sie ganz am <em>Ende</em>, nach dem Quadrieren, auf Zahlen der Größenordnung{" "}
            <M>{"c^2"}</M>: Fehler <M>{"\\sim c^2 \\cdot \\eps"}</M>, und der Schritt
            verstärkt zusätzlich alle vorher akkumulierten Fehler. Genau die Merkregel
            4.3.4.
          </p>
        </Frage>
        <Frage
          q={
            <>
              Beim Training eines neuronalen Netzes beginnt der Verlust nach wenigen
              Epochen zu oszillieren und wächst dann über alle Grenzen. Welche
              Stellschraube prüfen wir zuerst — und warum?
            </>
          }
        >
          <p>
            Die Lernrate <M>{"\\alpha"}</M>. Oszillation mit wachsender Amplitude ist das
            Signaturverhalten eines instabilen Iterationsverfahrens: Der
            Verstärkungsfaktor pro Schritt liegt über <M>{"1"}</M>, jeder Schritt bläht
            die Fehler des geschätzten Gradienten weiter auf. Eine kleinere Lernrate
            (oder Gradient Clipping) drückt den Faktor wieder unter <M>{"1"}</M> — in der
            SGD-Demo oben lässt sich der Umschlag direkt beobachten.
          </p>
        </Frage>
      </ol>

      <p className={`${P} italic`}>
        Vertiefung: Heath §1.2.7 (Stabilität und Genauigkeit).
      </p>
    </>
  );
}
