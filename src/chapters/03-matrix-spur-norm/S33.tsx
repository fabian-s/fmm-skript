import type { ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S33OperatornormWidget } from "./widgets/S33OperatornormWidget";

/**
 * Abschnitt 3.3 — Operatornormen.
 * Quelle: Folien 03-matrix-spur-norm.Rmd, Block „Operatornormen" (Definition,
 * induzierte 1-/2-/∞-Normen, Einschub Orthogonalmatrizen, Spektralnorm-Satz,
 * Beispiele). Prosa eigenständig aus den Folien formuliert; Widget-Code nach
 * dem Muster der internen heath-ch2-App recycelt.
 */

/** Selbsttest-Frage mit aufklappbarer Lösung (Muster aus 01-intro/S11). */
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

export function S33() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 03-matrix-spur-norm, „Operatornormen".
      </p>
      <p>
        Die elementweisen Matrixnormen aus{" "}
        <a className="underline" href="#sec-3.2">Abschnitt 3.2</a> haben einen blinden
        Fleck: Sie behandeln die Matrix als bloße Zahlentabelle. Die Identitätsmatrix{" "}
        <ConceptLink id="identity-matrix"><M>{"\\bI_n"}</M></ConceptLink> etwa verändert
        als Abbildung überhaupt nichts — trotzdem wächst ihre Frobenius-Norm{" "}
        <M>{"\\left\\| \\bI_n \\right\\|_F = \\sqrt{n}"}</M> mit der Dimension. Was die
        Matrix als <ConceptLink id="linear-map">lineare Abbildung</ConceptLink>{" "}
        <M>{"\\bx \\mapsto \\bA\\bx"}</M> <em>tut</em>, sehen diese Normen nicht. In
        diesem Abschnitt bauen wir Normen, die genau das messen: Wie stark kann{" "}
        <M>{"\\bA"}</M> einen Vektor strecken?
      </p>

      <h3 id="sec-3.3.1" className="mb-2 mt-8 text-xl font-semibold">
        3.3.1 Definition und Interpretation
      </h3>
      <p>
        Die Idee: Wir schicken alle Vektoren <M>{"\\bx \\neq \\bnull"}</M> durch die
        Abbildung und vergleichen die Länge des Bildes <M>{"\\bA\\bx"}</M> mit der Länge
        des Urbildes <M>{"\\bx"}</M> — gemessen mit einer{" "}
        <ConceptLink id="norm">Vektornorm</ConceptLink> unserer Wahl. Der größte
        auftretende Streckfaktor ist die Norm der Matrix.
      </p>
      <EnvBlock kind="Definition" label="3.3.1 (Operatornorm)">
        <p>
          Sei <M>{"\\left\\| \\cdot \\right\\|_V"}</M> eine Vektornorm. Die{" "}
          <em>Operatornorm</em> (auch: <em>induzierte Norm</em>) von{" "}
          <M>{"\\bA \\in \\R^{m \\times n}"}</M> ist
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_V := \\max_{\\bx \\neq \\bnull} \\frac{\\left\\| \\bA\\bx \\right\\|_V}{\\left\\| \\bx \\right\\|_V} = \\max_{\\left\\| \\bx \\right\\|_V = 1} \\left\\| \\bA\\bx \\right\\|_V."}</MD>
      </EnvBlock>
      <p>
        Der Quotient{" "}
        <M>{"R_{\\bA}(\\bx) = \\left\\| \\bA\\bx \\right\\|_V / \\left\\| \\bx \\right\\|_V"}</M>{" "}
        heißt <em>Rayleigh-Quotient</em>: Er gibt an, um welchen Faktor <M>{"\\bA"}</M>{" "}
        den Vektor <M>{"\\bx"}</M> streckt. Eine große Operatornorm bedeutet also: Es
        gibt mindestens eine Richtung, in der <M>{"\\bA"}</M> stark streckt. Eine kleine
        Operatornorm bedeutet: <M>{"\\bA"}</M> staucht jeden Vektor (oder lässt ihn
        höchstens schwach wachsen). Die zweite Gleichheit in der Definition gilt, weil
        der Rayleigh-Quotient skaleninvariant ist: Ersetzen wir <M>{"\\bx"}</M> durch{" "}
        <M>{"c\\,\\bx"}</M> mit <M>{"c \\neq 0"}</M>, kürzt sich <M>{"|c|"}</M> heraus.
        Wir dürfen uns deshalb auf Vektoren der Länge 1 beschränken.
      </p>
      <EnvBlock kind="Bemerkung" label="3.3.2">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Genau genommen brauchen wir zwei Normen: eine auf <M>{"\\R^n"}</M> für{" "}
            <M>{"\\bx"}</M> und eine auf <M>{"\\R^m"}</M> für <M>{"\\bA\\bx"}</M>. Wir
            verwenden stets dieselbe Normfamilie in der jeweils passenden Dimension und
            schreiben dafür dasselbe Symbol.
          </li>
          <li>
            Warum dürfen wir „max" statt „sup" schreiben? Die Funktion{" "}
            <M>{"\\bx \\mapsto \\left\\| \\bA\\bx \\right\\|_V"}</M> ist{" "}
            <ConceptLink id="continuous-function">stetig</ConceptLink>, und die
            Einheitssphäre{" "}
            <M>{"\\{\\bx : \\left\\| \\bx \\right\\|_V = 1\\}"}</M> ist eine{" "}
            <ConceptLink id="closed-bounded-set">abgeschlossene und beschränkte
            Menge</ConceptLink> — das Maximum wird also tatsächlich angenommen.
          </li>
        </ul>
      </EnvBlock>
      <p>
        Schauen wir uns das geometrisch an. In der euklidischen Norm (
        <M>{"p = 2"}</M>) ist die Menge aller Einheitsvektoren der Einheitskreis. Sein
        Bild unter einer <M>{"2 \\times 2"}</M>-Matrix ist eine Ellipse, und die
        Operatornorm ist die längste Halbachse dieser Ellipse.
      </p>
      <EnvBlock kind="Beispiel" label="3.3.3 (Visualisierung)">
        <p>
          Betrachten wir{" "}
          <M>{"\\bA = \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix}"}</M>. Wie wir in
          Satz 3.3.7 beweisen werden, ist{" "}
          <M>{"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\corange{\\lambda_{\\max}(\\bA^\\top\\bA)}}"}</M>.
          Rechnen wir nach:
        </p>
        <MD>{"\\bA^\\top\\bA = \\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix} \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 4 & 2 \\\\ 2 & 2 \\end{pmatrix}."}</MD>
        <p>
          Die <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> sind die
          Nullstellen des charakteristischen Polynoms{" "}
          <M>{"\\lambda^2 - 6\\lambda + 4"}</M>, also{" "}
          <M>{"\\lambda_{1,2} = 3 \\pm \\sqrt{5}"}</M>, und damit
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\corange{3 + \\sqrt{5}}} \\approx 2{,}29."}</MD>
        <p>
          In R können wir das direkt nachprüfen — <code>crossprod(A)</code> berechnet{" "}
          <M>{"\\bA^\\top\\bA"}</M>:
        </p>
        <pre className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-sm dark:bg-slate-900/60">
          <code>{"A <- matrix(c(2, 1,\n              0, 1), nrow = 2, byrow = TRUE)\nAtA <- crossprod(A)   # t(A) %*% A\nsqrt(eigen(AtA)$values)\n#> [1] 2.288246 0.874032"}</code>
        </pre>
        <p>
          Der größte Wert ist die Operatornorm: Kein Einheitsvektor wird um mehr als den
          Faktor <M>{"2{,}29"}</M> gestreckt. Der kleinere Wert <M>{"0{,}874"}</M> ist
          die kürzeste Halbachse der Bildellipse — die stärkste Stauchung. Dieselbe
          Matrix begegnet uns in Beispiel 3.4.6 (
          <a className="underline" href="#sec-3.4">Abschnitt 3.4</a>) wieder — dort
          berechnen wir ihre Schattennormen aus genau diesen Eigenwerten.
        </p>
      </EnvBlock>
      <ExpandedReading title="Operatornorm zum Anfassen — der Einheitskreis unter A">
        <S33OperatornormWidget />
      </ExpandedReading>

      <h3 id="sec-3.3.2" className="mb-2 mt-8 text-xl font-semibold">
        3.3.2 Die wichtigsten Operatornormen
      </h3>
      <p>
        Jede <M>{"p"}</M>-Norm{" "}
        <M>{"\\left\\| \\bv \\right\\|_p = \\left( \\sum_i |v_i|^p \\right)^{1/p}"}</M>{" "}
        induziert ihre eigene Operatornorm. Drei Fälle sind so wichtig, dass sie eigene
        Namen tragen — und für zwei davon gibt es erfreulich einfache Formeln:
      </p>
      <EnvBlock kind="Satz" label="3.3.4 (Induzierte p-Normen)">
        <p>
          Sei <M>{"\\bA \\in \\R^{m \\times n}"}</M> mit Einträgen <M>{"a_{ij}"}</M>.
          Dann gilt:
        </p>
        <p>
          <em>Spektralnorm</em> (<M>{"p = 2"}</M>):
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_2 = \\max_{\\left\\| \\bx \\right\\|_2 = 1} \\left\\| \\bA\\bx \\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}</MD>
        <p>
          <em>Spaltensummennorm</em> (<M>{"p = 1"}</M>):
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_1 = \\max_{\\left\\| \\bx \\right\\|_1 = 1} \\left\\| \\bA\\bx \\right\\|_1 = \\max_{1 \\leq j \\leq n} \\sum_{i=1}^m |a_{ij}|"}</MD>
        <p>
          <em>Zeilensummennorm</em> (<M>{"p = \\infty"}</M>):
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_\\infty = \\max_{\\left\\| \\bx \\right\\|_\\infty = 1} \\left\\| \\bA\\bx \\right\\|_\\infty = \\max_{1 \\leq i \\leq m} \\sum_{j=1}^n |a_{ij}|"}</MD>
      </EnvBlock>
      <p>
        Die 1-Norm einer Matrix ist also einfach die größte betragsmäßige Spaltensumme,
        die <M>{"\\infty"}</M>-Norm die größte betragsmäßige Zeilensumme — beide lassen
        sich ohne jede Eigenwertrechnung ablesen. Als Eselsbrücke: Die <M>{"1"}</M>{" "}
        steht senkrecht wie eine Spalte, das Symbol <M>{"\\infty"}</M> liegt waagrecht
        wie eine Zeile. Die Spektralnorm ist
        teurer zu berechnen, dafür passt sie zur euklidischen Geometrie: Sie ist die
        längste Halbachse der Bildellipse aus Beispiel 3.3.3. Ihre Formel beweisen wir
        in Satz 3.3.7; für die Spaltensummennorm holen wir den Beweis in der folgenden
        Vertiefung nach, der Fall <M>{"p = \\infty"}</M> verläuft völlig analog und ist
        eine gute Übung.
      </p>
      <ExpandedReading title="Beweis der Spaltensummenformel">
        <p className="text-sm">
          Wir zeigen{" "}
          <M>{"\\left\\| \\bA \\right\\|_1 = \\max_j \\cgreen{c_j}"}</M> mit den
          Spaltensummen <M>{"\\cgreen{c_j} := \\sum_{i=1}^m |a_{ij}|"}</M>. Die Farbe
          Grün verfolgt dabei die Spaltensummen durch die gesamte Rechnung.
        </p>
        <Proof>
          <PStep
            why={
              <>
                <M>{"i"}</M>-te Komponente von <M>{"\\bA\\bx"}</M> ausschreiben;
                Dreiecksungleichung <M>{"|u + v| \\leq |u| + |v|"}</M> im Betrag
              </>
            }
          >
            <MD>{"\\left\\| \\bA\\bx \\right\\|_1 = \\sum_{i=1}^m \\left| \\sum_{j=1}^n a_{ij} x_j \\right| \\leq \\sum_{i=1}^m \\sum_{j=1}^n |a_{ij}|\\,|x_j|"}</MD>
          </PStep>
          <PStep
            why={
              <>
                Summationsreihenfolge tauschen (endliche Summen), dann{" "}
                <M>{"\\sum_i |a_{ij}| = \\cgreen{c_j}"}</M> einsetzen
              </>
            }
          >
            <MD>{"\\sum_{i=1}^m \\sum_{j=1}^n |a_{ij}|\\,|x_j| = \\sum_{j=1}^n |x_j| \\sum_{i=1}^m |a_{ij}| = \\sum_{j=1}^n |x_j|\\,\\cgreen{c_j}"}</MD>
          </PStep>
          <PStep
            why={
              <>
                jede Spaltensumme durch die größte abschätzen;{" "}
                <M>{"\\sum_j |x_j| = \\left\\| \\bx \\right\\|_1 = 1"}</M>
              </>
            }
          >
            <MD>{"\\sum_{j=1}^n |x_j|\\,\\cgreen{c_j} \\leq \\left( \\max_j \\cgreen{c_j} \\right) \\sum_{j=1}^n |x_j| = \\max_j \\cgreen{c_j}"}</MD>
          </PStep>
          <PStep
            why={
              <>
                die Schranke wird angenommen: Für den Einheitsvektor{" "}
                <M>{"\\be_{j^*}"}</M> zur maximalen Spalte <M>{"j^*"}</M> ist{" "}
                <M>{"\\bA\\be_{j^*}"}</M> genau die <M>{"j^*"}</M>-te Spalte von{" "}
                <M>{"\\bA"}</M>
              </>
            }
          >
            <MD>{"\\left\\| \\bA\\be_{j^*} \\right\\|_1 = \\sum_{i=1}^m |a_{ij^*}| = \\cgreen{c_{j^*}} = \\max_j \\cgreen{c_j}"}</MD>
          </PStep>
        </Proof>
      </ExpandedReading>

      <h3 id="sec-3.3.3" className="mb-2 mt-8 text-xl font-semibold">
        3.3.3 Einschub: Orthogonalmatrizen
      </h3>
      <p>
        Für den Beweis der Spektralnorm-Formel brauchen wir eine besondere Klasse von
        Matrizen: solche, die Längen überhaupt nicht verändern. Sie werden uns im ganzen
        Kurs immer wieder begegnen — gerade <em>weil</em> sie Normen unangetastet
        lassen.
      </p>
      <EnvBlock kind="Definition" label="3.3.5 (Orthogonalmatrix)">
        <p>
          Eine Matrix <M>{"\\bQ \\in \\R^{n \\times n}"}</M> heißt{" "}
          <em>Orthogonalmatrix</em>, wenn ihre Spalten{" "}
          <ConceptLink id="orthonormal-basis">orthonormale Vektoren</ConceptLink> sind,
          also
        </p>
        <MD>{"\\bQ^\\top\\bQ = \\bI."}</MD>
      </EnvBlock>
      <EnvBlock kind="Bemerkung" label="3.3.6 (Eigenschaften von Orthogonalmatrizen)">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Geometrisch beschreibt <M>{"\\bQ"}</M> eine{" "}
            <ConceptLink id="rotation-matrix">Rotation</ConceptLink> und/oder{" "}
            <ConceptLink id="reflection">Spiegelung</ConceptLink> in <M>{"\\R^n"}</M>.
          </li>
          <li>
            <M>{"\\bQ"}</M> erhält die{" "}
            <ConceptLink id="euclidean-norm">euklidische Norm</ConceptLink>: Für alle{" "}
            <M>{"\\bx \\in \\R^n"}</M> gilt
            <MD>{"\\left\\| \\bQ\\bx \\right\\|_2 = \\sqrt{\\bx^\\top\\bQ^\\top\\bQ\\bx} = \\sqrt{\\bx^\\top\\bx} = \\left\\| \\bx \\right\\|_2."}</MD>
            Insbesondere ist <M>{"\\left\\| \\bQ \\right\\|_2 = 1"}</M>: Jeder
            Rayleigh-Quotient ist exakt 1.
          </li>
          <li>
            <M>{"\\bQ^{-1} = \\bQ^\\top"}</M> — die{" "}
            <ConceptLink id="matrix-inverse">Inverse</ConceptLink> ist gratis: Statt
            eines Gleichungssystems genügt Transponieren.
          </li>
          <li>
            Alle <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> haben
            Betrag 1: Aus <M>{"\\bQ\\bx = \\lambda\\bx"}</M> mit{" "}
            <M>{"\\bx \\neq \\bnull"}</M> folgt{" "}
            <M>{"\\left\\| \\bx \\right\\|_2 = \\left\\| \\bQ\\bx \\right\\|_2 = |\\lambda| \\left\\| \\bx \\right\\|_2"}</M>,
            also <M>{"|\\lambda| = 1"}</M>.
          </li>
          <li>
            Mit <M>{"\\bQ"}</M> ist auch <M>{"\\bQ^{-1} = \\bQ^\\top"}</M> orthogonal
            (denn <M>{"(\\bQ^\\top)^\\top\\bQ^\\top = \\bQ\\bQ^\\top = \\bI"}</M>), hat
            also ebenfalls Spektralnorm 1. Für die{" "}
            <ConceptLink id="condition-number">Konditionszahl</ConceptLink> folgt{" "}
            <M>{"\\kappa_2(\\bQ) = \\left\\| \\bQ \\right\\|_2 \\left\\| \\bQ^{-1} \\right\\|_2 = 1"}</M>{" "}
            — Multiplikation mit <M>{"\\bQ"}</M> oder{" "}
            <M>{"\\bQ^{-1}"}</M> ist immer gut konditioniert und verschlechtert die
            Stabilität von Algorithmen nicht. Das ist der Grund, warum orthogonale
            Transformationen das Arbeitspferd der numerischen linearen Algebra sind
            (mehr dazu bei der QR-Zerlegung in Kapitel 7).
          </li>
          <li>
            Produkte bleiben orthogonal: Sind <M>{"\\bQ_1, \\dots, \\bQ_k"}</M>{" "}
            orthogonal, dann auch <M>{"\\bQ = \\bQ_1 \\cdots \\bQ_k"}</M>. Warum? Weil{" "}
            <M>{"(\\bQ_1\\bQ_2)^\\top \\bQ_1\\bQ_2 = \\bQ_2^\\top \\bQ_1^\\top \\bQ_1 \\bQ_2 = \\bQ_2^\\top \\bQ_2 = \\bI"}</M>{" "}
            (<ConceptLink id="transpose">Transponierregeln</ConceptLink>), und dann
            induktiv weiter.
          </li>
        </ul>
      </EnvBlock>

      <h3 id="sec-3.3.4" className="mb-2 mt-8 text-xl font-semibold">
        3.3.4 Spektralnorm und Spektralzerlegung
      </h3>
      <p>
        Jetzt können wir die Formel{" "}
        <M>{"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}</M>{" "}
        beweisen. Der Schlüssel: <M>{"\\bA^\\top\\bA"}</M> ist{" "}
        <ConceptLink id="symmetric-matrix">symmetrisch</ConceptLink> und besitzt deshalb
        eine Spektralzerlegung <M>{"\\bA^\\top\\bA = \\bP\\bLambda\\bP^\\top"}</M> mit
        einer <em>orthogonalen</em> Eigenvektormatrix <M>{"\\bP"}</M> — und genau die
        Normerhaltung aus Bemerkung 3.3.6 macht den Beweis kurz. Die Eigenwerte sind
        dabei automatisch nichtnegativ, denn{" "}
        <M>{"\\bx^\\top\\bA^\\top\\bA\\bx = \\left\\| \\bA\\bx \\right\\|_2^2 \\geq 0"}</M>{" "}
        (<M>{"\\bA^\\top\\bA"}</M> ist{" "}
        <ConceptLink id="positive-definite">positiv semidefinit</ConceptLink>).
      </p>
      <EnvBlock kind="Satz" label="3.3.7 (Spektralnorm und Spektralzerlegung)">
        <p>
          Sei <M>{"\\bA \\in \\R^{m \\times n}"}</M> mit{" "}
          <ConceptLink id="rank">Rang</ConceptLink> <M>{"r"}</M> und Spektralzerlegung{" "}
          <M>{"\\bA^\\top\\bA = \\bP\\bLambda\\bP^\\top"}</M>, wobei{" "}
          <M>{"\\bLambda = \\diag(\\corange{\\lambda_1}, \\ldots, \\lambda_r, 0, \\ldots, 0)"}</M>{" "}
          mit <M>{"\\corange{\\lambda_1} \\geq \\lambda_2 \\geq \\cdots \\geq \\lambda_r > 0"}</M>.
          Dann gilt
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\corange{\\lambda_1}} = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              euklidische Norm als Skalarprodukt schreiben, dann die Spektralzerlegung
              einsetzen
            </>
          }
        >
          <MD>{"\\left\\| \\bA\\bx \\right\\|_2^2 = \\bx^\\top\\bA^\\top\\bA\\,\\bx = \\bx^\\top\\bP\\bLambda\\bP^\\top\\bx"}</MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\bLambda = \\bLambda^{1/2}\\bLambda^{1/2}"}</M> mit{" "}
              <M>{"\\bLambda^{1/2} = \\diag(\\sqrt{\\lambda_i})"}</M> aufspalten und die
              Faktoren den beiden Seiten zuschlagen — wieder eine quadrierte Norm
            </>
          }
        >
          <MD>{"\\bx^\\top\\bP\\bLambda\\bP^\\top\\bx = \\left( \\bLambda^{1/2}\\cbgreen{\\bP^\\top\\bx} \\right)^\\top \\left( \\bLambda^{1/2}\\cbgreen{\\bP^\\top\\bx} \\right) = \\left\\| \\bLambda^{1/2}\\,\\cbgreen{\\bP^\\top\\bx} \\right\\|_2^2"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Substitution <M>{"\\cbgreen{\\by} = \\cbgreen{\\bP^\\top\\bx}"}</M>: Weil{" "}
              <M>{"\\bP"}</M> orthogonal ist, gilt{" "}
              <M>{"\\left\\| \\cbgreen{\\by} \\right\\|_2 = \\left\\| \\bx \\right\\|_2"}</M>{" "}
              (Bemerkung 3.3.6), und <M>{"\\bx \\mapsto \\bP^\\top\\bx"}</M> ist
              bijektiv — <M>{"\\cbgreen{\\by}"}</M> durchläuft also die Einheitssphäre,
              wenn <M>{"\\bx"}</M> dies tut
            </>
          }
        >
          <MD>{"\\max_{\\left\\| \\bx \\right\\|_2 = 1} \\left\\| \\bLambda^{1/2}\\,\\cbgreen{\\bP^\\top\\bx} \\right\\|_2^2 = \\max_{\\left\\| \\cbgreen{\\by} \\right\\|_2 = 1} \\left\\| \\bLambda^{1/2}\\,\\cbgreen{\\by} \\right\\|_2^2"}</MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\bLambda^{1/2}"}</M> ist diagonal; jeden Koeffizienten durch den
              größten Eigenwert <M>{"\\corange{\\lambda_1}"}</M> abschätzen und{" "}
              <M>{"\\sum_i y_i^2 = 1"}</M> benutzen
            </>
          }
        >
          <MD>{"\\left\\| \\bLambda^{1/2}\\,\\cbgreen{\\by} \\right\\|_2^2 = \\corange{\\lambda_1} y_1^2 + \\lambda_2 y_2^2 + \\cdots + \\lambda_r y_r^2 \\leq \\corange{\\lambda_1} \\left( y_1^2 + \\cdots + y_r^2 \\right) \\leq \\corange{\\lambda_1}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Schranke wird angenommen: Für{" "}
              <M>{"\\cbgreen{\\by} = \\be_1"}</M> — also <M>{"\\bx = "}</M> erste Spalte
              von <M>{"\\bP"}</M>, der Eigenvektor zu{" "}
              <M>{"\\corange{\\lambda_1}"}</M> — gilt Gleichheit; Wurzel ziehen liefert
              die Behauptung
            </>
          }
        >
          <MD>{"\\left\\| \\bA \\right\\|_2^2 = \\max_{\\left\\| \\bx \\right\\|_2 = 1} \\left\\| \\bA\\bx \\right\\|_2^2 = \\corange{\\lambda_1}"}</MD>
        </PStep>
      </Proof>
      <p>
        Die Interpretation: Der größte Eigenwert von <M>{"\\bA^\\top\\bA"}</M> ist die
        quadrierte maximale Streckung, und die Richtung der stärksten Streckung ist der
        zugehörige Eigenvektor — im Widget oben der graue Pfeil <M>{"\\bx^*"}</M>. Noch
        intuitiver wird das über die Singulärwerte von <M>{"\\bA"}</M> und die{" "}
        <ConceptLink id="singular-value-decomposition">Singulärwertzerlegung</ConceptLink>{" "}
        — dazu später mehr.
      </p>

      <h3 id="sec-3.3.5" className="mb-2 mt-8 text-xl font-semibold">
        3.3.5 Beispiele
      </h3>
      <EnvBlock kind="Beispiel" label="3.3.8">
        <p>
          Berechnen wir alle drei Operatornormen von{" "}
          <M>{"\\bA = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}"}</M>.
        </p>
        <p>
          <strong>Spaltensummennorm</strong> — Grün verfolgt die erste, Blau die zweite
          Spalte:
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_1 = \\max\\left\\{ \\cgreen{|2| + |0|},\\; \\cblue{|1| + |3|} \\right\\} = \\max\\{\\cgreen{2}, \\cblue{4}\\} = \\cblue{4}."}</MD>
        <p>
          <strong>Zeilensummennorm</strong> — Rot verfolgt die erste, Violett die zweite
          Zeile:
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_\\infty = \\max\\left\\{ \\cred{|2| + |1|},\\; \\cpurp{|0| + |3|} \\right\\} = \\max\\{\\cred{3}, \\cpurp{3}\\} = 3."}</MD>
        <p>
          <strong>Spektralnorm</strong> — hier müssen wir rechnen:
        </p>
        <MD>{"\\bA^\\top\\bA = \\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix} \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix} = \\begin{pmatrix} 4 & 2 \\\\ 2 & 10 \\end{pmatrix}."}</MD>
        <p>
          Das charakteristische Polynom ist{" "}
          <M>{"\\lambda^2 - 14\\lambda + 36"}</M> (Spur 14, Determinante{" "}
          <M>{"4 \\cdot 10 - 2 \\cdot 2 = 36"}</M>), mit Nullstellen{" "}
          <M>{"\\lambda_{1,2} = 7 \\pm \\sqrt{13}"}</M>. Also
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\corange{\\lambda_{\\max}(\\bA^\\top\\bA)}} = \\sqrt{\\corange{7 + \\sqrt{13}}} \\approx \\sqrt{10{,}61} \\approx 3{,}26."}</MD>
        <p>
          Die drei Normen liefern verschiedene Werte (<M>{"4"}</M>,{" "}
          <M>{"3{,}26"}</M>, <M>{"3"}</M>) — sie messen die maximale Streckung ja auch
          in verschiedenen Geometrien. Weit auseinander liegen können sie aber nie; mehr
          dazu in <a className="underline" href="#sec-3.5">Abschnitt 3.5</a>.
        </p>
      </EnvBlock>
      <EnvBlock kind="Beispiel" label="3.3.9 (Identitätsmatrix)">
        <p>
          Für die Identitätsmatrix <M>{"\\bI_n"}</M> gilt in jeder Operatornorm{" "}
          <M>{"\\left\\| \\bI_n\\bx \\right\\| / \\left\\| \\bx \\right\\| = 1"}</M> für
          alle <M>{"\\bx \\neq \\bnull"}</M>, also
        </p>
        <MD>{"\\left\\| \\bI_n \\right\\|_1 = \\left\\| \\bI_n \\right\\|_2 = \\left\\| \\bI_n \\right\\|_\\infty = 1. \\quad \\checkmark"}</MD>
        <p>
          Das ist genau das Verhalten, das wir uns eingangs gewünscht haben: Eine
          Abbildung, die nichts verändert, bekommt Norm 1 — unabhängig von der
          Dimension. Der Schönheitsfehler der elementweisen Normen (
          <M>{"\\left\\| \\bI_n \\right\\|_F = \\sqrt{n}"}</M>) ist behoben.
        </p>
      </EnvBlock>

      <h4 className="mt-6 font-semibold">Selbsttest</h4>
      <ul className="max-w-prose list-none space-y-3 pl-0">
        <Frage
          q={
            <>
              Berechnen wir <M>{"\\left\\| \\bA \\right\\|_1"}</M> und{" "}
              <M>{"\\left\\| \\bA \\right\\|_\\infty"}</M> für{" "}
              <M>{"\\bA = \\begin{pmatrix} 1 & -2 \\\\ 3 & 4 \\end{pmatrix}"}</M> — ganz
              ohne Eigenwerte.
            </>
          }
        >
          <p>
            Spaltensummen: <M>{"|1| + |3| = 4"}</M> und <M>{"|{-2}| + |4| = 6"}</M>,
            also <M>{"\\left\\| \\bA \\right\\|_1 = 6"}</M>. Zeilensummen:{" "}
            <M>{"|1| + |{-2}| = 3"}</M> und <M>{"|3| + |4| = 7"}</M>, also{" "}
            <M>{"\\left\\| \\bA \\right\\|_\\infty = 7"}</M>. Vorsicht: Die Beträge
            nicht vergessen — das Minuszeichen in <M>{"-2"}</M> zählt positiv.
          </p>
        </Frage>
        <Frage
          q={
            <>
              Wahr oder falsch: Für jede Orthogonalmatrix <M>{"\\bQ"}</M> gilt{" "}
              <M>{"\\left\\| \\bQ \\right\\|_2 = 1"}</M>.
            </>
          }
        >
          <p>
            Wahr. Wegen{" "}
            <M>{"\\left\\| \\bQ\\bx \\right\\|_2 = \\left\\| \\bx \\right\\|_2"}</M>{" "}
            (Bemerkung 3.3.6) ist jeder Rayleigh-Quotient gleich 1 — also auch das
            Maximum. Geometrisch: Eine Drehung oder Spiegelung streckt nichts, der
            Einheitskreis bleibt ein Einheitskreis.
          </p>
        </Frage>
        <Frage
          q={
            <>
              Warum gilt <M>{"\\left\\| \\bI_n \\right\\| = 1"}</M> für <em>jede</em>{" "}
              Operatornorm, egal welche Vektornorm wir zugrunde legen?
            </>
          }
        >
          <p>
            Weil <M>{"\\bI_n\\bx = \\bx"}</M> für alle <M>{"\\bx"}</M>: Der
            Rayleigh-Quotient ist konstant{" "}
            <M>{"\\left\\| \\bx \\right\\| / \\left\\| \\bx \\right\\| = 1"}</M>, also
            ist auch sein Maximum 1. Elementweise Normen wie die Frobenius-Norm haben
            diese Eigenschaft nicht — genau deshalb haben wir die Operatornormen
            eingeführt.
          </p>
        </Frage>
      </ul>

      <p className="italic">Vertiefung: Heath §2.3.2.</p>
    </div>
  );
}
