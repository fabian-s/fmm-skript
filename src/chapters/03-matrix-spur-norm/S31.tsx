import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S31SpurWidget } from "./widgets/S31SpurWidget";

/**
 * Abschnitt 3.1 — Die Spur einer Matrix.
 * Quelle: Folien 03-matrix-spur-norm.Rmd, Kapitelauftakt + Block
 * „Die Spur einer Matrix" (Definition, Eigenschaften, zyklische
 * Vertauschung, Spur = Eigenwertsumme, Frobenius-Norm). Prosa
 * eigenständig aus den Folien formuliert.
 */
export function S31() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 03-matrix-spur-norm, „Die Spur einer Matrix".
      </p>
      <p>
        Mit diesem Kapitel beginnt der Numerik-Teil des Kurses in der linearen Algebra. Bevor wir
        in den folgenden Kapiteln Gleichungssysteme zerlegen und lösen, brauchen wir ein
        Handwerkszeug, das dort auf Schritt und Tritt auftaucht: Wir müssen{" "}
        <ConceptLink id="matrix">Matrizen</ConceptLink> <em>messen</em> können. Wie groß ist eine
        Matrix? Wie stark verstärkt sie Fehler? Wann konvergiert ein iteratives Verfahren? Alle
        diese Fragen verlangen, eine ganze Tabelle voller Zahlen zu einer einzigen aussagekräftigen
        Kennzahl zu verdichten. Dieses Kapitel stellt die beiden wichtigsten solchen Kennzahlen
        vor: die <em>Spur</em> (dieser Abschnitt) und die <em>Matrixnormen</em> (Rest des
        Kapitels). Beide begegnen uns in der Statistik ständig — die Gesamtvarianz eines
        Zufallsvektors ist zum Beispiel die Spur seiner{" "}
        <ConceptLink id="covariance-matrix">Kovarianzmatrix</ConceptLink>.
      </p>
      <EnvBlock kind="Bemerkung" label="3.1.1 (Verwendete Vorkenntnisse)">
        <p>Dieses Kapitel setzt voraus:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <ConceptLink id="norm">Normen</ConceptLink> als Fehlermaße und{" "}
            <ConceptLink id="condition-number">Konditionszahlen</ConceptLink>,
          </li>
          <li>
            aus der linearen Algebra: Matrixoperationen (Addition,{" "}
            <ConceptLink id="matrix-multiplication">Multiplikation</ConceptLink>,{" "}
            <ConceptLink id="transpose">Transposition</ConceptLink>),{" "}
            <ConceptLink id="eigenvalue-eigenvector">Eigenwerte und Eigenvektoren</ConceptLink>,{" "}
            <ConceptLink id="orthogonality">Orthogonalität</ConceptLink>,{" "}
            <ConceptLink id="dot-product">Skalarprodukte</ConceptLink> sowie die grundlegenden
            Vektornormen (<ConceptLink id="euclidean-norm">euklidische Norm</ConceptLink>{" "}
            <M>{"\\left\\| \\bx \\right\\|_2"}</M> und <M>{"p"}</M>-Normen),
          </li>
          <li>
            aus der Analysis: <ConceptLink id="limit">Grenzwerte</ConceptLink> und{" "}
            <ConceptLink id="supremum">Suprema</ConceptLink>, Maximum und Minimum von Funktionen.
          </li>
        </ul>
      </EnvBlock>

      <h3 id="sec-3.1.1" className="mt-6 text-lg font-semibold">
        3.1.1 Definition und erste Beispiele
      </h3>
      <p>
        Die einfachste Art, eine quadratische Matrix zu einer Zahl zu verdichten, ist zugleich die
        billigste: Wir addieren einfach die Diagonalelemente. Das klingt zunächst willkürlich —
        warum ausgerechnet die Diagonale? Die Antwort liefert dieser Abschnitt: Diese Summe ist
        eine erstaunlich stabile Kenngröße der Matrix, die sich von Basiswechseln nicht
        beeindrucken lässt und die Summe der Eigenwerte liefert, ohne dass wir auch nur einen
        davon ausrechnen müssten.
      </p>
      <EnvBlock kind="Definition" label="3.1.2 (Spur)">
        <p>
          Die <em>Spur</em> (<em>trace</em>) einer quadratischen Matrix{" "}
          <M>{"\\bA \\in \\R^{n \\times n}"}</M> ist die Summe ihrer Diagonalelemente:
        </p>
        <MD>{"\\tr(\\bA) = \\sum_{i=1}^n \\cgreen{a_{ii}}."}</MD>
      </EnvBlock>
      <p>
        Zwei Dinge halten wir gleich fest: Erstens ist die Spur <em>nur für quadratische
        Matrizen</em> definiert — bei einer rechteckigen Matrix hat „die Diagonale" keine
        sinnvolle Bedeutung. Zweitens ist die Spur eine <em>skalare Invariante</em> der Matrix:
        Sie ändert sich nicht, wenn wir dieselbe lineare Abbildung in einer anderen{" "}
        <ConceptLink id="basis">Basis</ConceptLink> darstellen (das ist die
        Ähnlichkeitsinvarianz, die wir gleich in Satz 3.1.4 beweisen). Nebenbei bemerkt ist die
        Spur auch numerisch ein Schnäppchen: <M>{"n - 1"}</M> Additionen, keine einzige
        Multiplikation.
      </p>
      <EnvBlock kind="Beispiel" label="3.1.3">
        <p>
          Für die <ConceptLink id="identity-matrix">Einheitsmatrix</ConceptLink> stehen auf der
          Diagonale <M>{"n"}</M> Einsen, also <M>{"\\tr(\\bI_n) = n"}</M>. Zwei konkrete
          Rechnungen (die Diagonalelemente sind grün markiert):
        </p>
        <MD>{"\\tr\\begin{pmatrix} \\cgreen{1} & 2 \\\\ 3 & \\cgreen{4} \\end{pmatrix} = \\cgreen{1} + \\cgreen{4} = 5, \\qquad \\tr\\begin{pmatrix} \\cgreen{2} & -1 & 0 \\\\ 0 & \\cgreen{3} & 5 \\\\ 1 & 0 & \\cgreen{-2} \\end{pmatrix} = \\cgreen{2} + \\cgreen{3} + (\\cgreen{-2}) = 3."}</MD>
        <p>
          Alle Einträge abseits der Diagonale sind für die Spur unsichtbar — die <M>{"5"}</M> im
          zweiten Beispiel könnte genauso gut <M>{"5000"}</M> sein.
        </p>
      </EnvBlock>

      <h3 id="sec-3.1.2" className="mt-6 text-lg font-semibold">
        3.1.2 Rechenregeln und zyklische Vertauschung
      </h3>
      <p>
        Der eigentliche Wert der Spur liegt in ihren Rechenregeln. Sie machen aus der harmlosen
        Diagonalsumme ein Werkzeug, mit dem sich viele Matrixausdrücke drastisch vereinfachen
        lassen.
      </p>
      <EnvBlock kind="Satz" label="3.1.4 (Eigenschaften der Spur)">
        <p>
          Für Matrizen <M>{"\\bA, \\bB \\in \\R^{n \\times n}"}</M>, invertierbares{" "}
          <M>{"\\bP \\in \\R^{n \\times n}"}</M> und <M>{"c \\in \\R"}</M> gilt:
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            <em>Additiv:</em> <M>{"\\tr(\\bA + \\bB) = \\tr(\\bA) + \\tr(\\bB)"}</M>
          </li>
          <li>
            <em>Homogen:</em> <M>{"\\tr(c\\bA) = c \\cdot \\tr(\\bA)"}</M>
          </li>
          <li>
            <em>Zyklisch:</em> <M>{"\\tr(\\bA\\bB) = \\tr(\\bB\\bA)"}</M>
          </li>
          <li>
            <em>Ähnlichkeitsinvariant:</em> <M>{"\\tr(\\bP\\bA\\bP^{-1}) = \\tr(\\bA)"}</M>
          </li>
          <li>
            <em>Transpositionsinvariant:</em> <M>{"\\tr(\\bA^\\top) = \\tr(\\bA)"}</M>
          </li>
        </ol>
      </EnvBlock>
      <p>
        Die Eigenschaften 1, 2 und 5 folgen direkt aus der Definition: Addition und Skalierung
        wirken eintragsweise, also insbesondere auf jedes Diagonalelement einzeln, und das{" "}
        <ConceptLink id="transpose">Transponieren</ConceptLink> spiegelt die Matrix an der
        Diagonale — die Diagonalelemente selbst bleiben dabei, wo sie sind. Interessant sind die
        Eigenschaften 3 und 4; die beweisen wir jetzt.
      </p>
      <Proof>
        <PStep
          why={
            <>
              Definition der Spur; der Diagonaleintrag <M>{"(\\bA\\bB)_{ii}"}</M> ist das{" "}
              <ConceptLink id="dot-product">Skalarprodukt</ConceptLink> aus <M>{"i"}</M>-ter Zeile
              von <M>{"\\bA"}</M> und <M>{"i"}</M>-ter Spalte von <M>{"\\bB"}</M> (
              <ConceptLink id="matrix-multiplication">Matrixprodukt</ConceptLink>)
            </>
          }
        >
          <p>Zu Eigenschaft 3: Wir schreiben beide Seiten als Doppelsumme aus.</p>
          <MD>{"\\tr(\\bA\\bB) = \\sum_{i=1}^n (\\bA\\bB)_{ii} = \\sum_{i=1}^n \\sum_{k=1}^n \\cred{a_{ik}}\\,\\cblue{b_{ki}}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              endliche Summen dürfen wir vertauschen, und die Faktoren <M>{"\\cred{a_{ik}}"}</M>,{" "}
              <M>{"\\cblue{b_{ki}}"}</M> sind Skalare, kommutieren also
            </>
          }
        >
          <MD>{"= \\sum_{k=1}^n \\sum_{i=1}^n \\cblue{b_{ki}}\\,\\cred{a_{ik}} = \\sum_{k=1}^n (\\bB\\bA)_{kk} = \\tr(\\bB\\bA)"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Eigenschaft 3, angewendet auf die beiden Faktoren <M>{"\\bP\\bA"}</M> und{" "}
              <M>{"\\bP^{-1}"}</M>; dann <M>{"\\bP^{-1}\\bP = \\bI"}</M> (
              <ConceptLink id="inverse-matrix">Inverse</ConceptLink>)
            </>
          }
        >
          <p>Eigenschaft 4 ist damit ein Einzeiler:</p>
          <MD>{"\\tr(\\bP\\bA\\bP^{-1}) = \\tr\\left((\\bP\\bA)\\,\\bP^{-1}\\right) = \\tr\\left(\\bP^{-1}(\\bP\\bA)\\right) = \\tr(\\bA)."}</MD>
        </PStep>
      </Proof>
      <p>
        Eigenschaft 3 ist die <em>wichtigste</em> Eigenschaft der Spur. Wenden wir sie auf ein
        Produkt aus drei Matrizen an (mit den Faktorpaaren{" "}
        <M>{"\\bA \\cdot (\\bB\\bC)"}</M> bzw. <M>{"(\\bA\\bB) \\cdot \\bC"}</M>), erhalten wir
        die <em>zyklische Vertauschung</em>:
      </p>
      <MD>{"\\tr(\\bA\\bB\\bC) = \\tr(\\bB\\bC\\bA) = \\tr(\\bC\\bA\\bB)."}</MD>
      <p>
        Wir dürfen die Faktoren unter der Spur also „im Kreis herumschieben" — so, als stünden
        sie auf einem Karussell: Die Reihenfolge im Kreis bleibt erhalten, nur der Startpunkt
        wandert.
      </p>
      <EnvBlock kind="Bemerkung" label="3.1.5 (Vorsicht: Was die Spur nicht kann)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Die Spur ist <em>nicht</em> multiplikativ: <M>{"\\tr(\\bA\\bB) = \\tr(\\bB\\bA)"}</M>,
            aber <M>{"\\tr(\\bA\\bB) \\neq \\tr(\\bA) \\cdot \\tr(\\bB)"}</M>! Kleinstes
            Gegenbeispiel: <M>{"\\bA = \\bB = \\bI_2"}</M>, denn{" "}
            <M>{"\\tr(\\bI_2 \\bI_2) = \\tr(\\bI_2) = 2"}</M>, aber{" "}
            <M>{"\\tr(\\bI_2) \\cdot \\tr(\\bI_2) = 4"}</M>.
          </li>
          <li>
            Erlaubt sind nur <em>zyklische</em> Vertauschungen, keine beliebigen: Im Allgemeinen
            ist <M>{"\\tr(\\bA\\bB\\bC) \\neq \\tr(\\bA\\bC\\bB)"}</M> — die Umordnung{" "}
            <M>{"\\bA\\bC\\bB"}</M> lässt sich nicht durch Weiterdrehen aus{" "}
            <M>{"\\bA\\bB\\bC"}</M> erzeugen.
          </li>
        </ul>
      </EnvBlock>
      <EnvBlock kind="Beispiel" label="3.1.6 (Zyklische Vertauschung in der Statistik)">
        <p>
          Ein Vorgeschmack darauf, warum die zyklische Vertauschung in der Statistik ein
          Dauerbrenner ist: In der{" "}
          <ConceptLink id="linear-regression">linearen Regression</ConceptLink> mit Designmatrix{" "}
          <M>{"\\bX \\in \\R^{n \\times p}"}</M> (voller Spaltenrang) erzeugt die „Hutmatrix"{" "}
          <M>{"\\bH = \\bX(\\bX^\\top\\bX)^{-1}\\bX^\\top \\in \\R^{n \\times n}"}</M> die
          gefitteten Werte <M>{"\\wh{\\by} = \\bH\\by"}</M>. Ihre Spur zählt die effektiven
          Parameter des Modells — und die zyklische Vertauschung berechnet sie, ohne dass wir
          einen einzigen Eintrag der <M>{"n \\times n"}</M>-Matrix <M>{"\\bH"}</M> kennen müssen:
        </p>
        <MD>{"\\tr(\\bH) = \\tr\\left(\\cred{\\bX}\\,\\cblue{(\\bX^\\top\\bX)^{-1}\\bX^\\top}\\right) = \\tr\\left(\\cblue{(\\bX^\\top\\bX)^{-1}\\bX^\\top}\\,\\cred{\\bX}\\right) = \\tr(\\bI_p) = p."}</MD>
        <p>
          Im zweiten Schritt haben wir den Faktor <M>{"\\cred{\\bX}"}</M> einmal im Kreis nach
          hinten geschoben; dann kürzt sich <M>{"(\\bX^\\top\\bX)^{-1}\\,\\bX^\\top\\bX"}</M> zur{" "}
          <M>{"p \\times p"}</M>-Einheitsmatrix.
        </p>
      </EnvBlock>

      <h3 id="sec-3.1.3" className="mt-6 text-lg font-semibold">
        3.1.3 Spur und Eigenwerte
      </h3>
      <p>
        Warum ist ausgerechnet die Diagonalsumme so invariant? Das folgende Resultat liefert die
        tiefere Erklärung: Die Spur ist in Wahrheit eine Kennzahl der{" "}
        <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> — und die hängen nur
        von der linearen Abbildung ab, nicht von der Basis, in der wir sie aufschreiben.
      </p>
      <EnvBlock kind="Satz" label="3.1.7 (Spur als Summe der Eigenwerte)">
        <p>
          Für eine Matrix <M>{"\\bA \\in \\R^{n \\times n}"}</M> mit Eigenwerten{" "}
          <M>{"\\lambda_1, \\ldots, \\lambda_n"}</M> gilt
        </p>
        <MD>{"\\tr(\\bA) = \\sum_{i=1}^n \\lambda_i."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              <M>{"\\bA"}</M> diagonalisierbar heißt gerade: Es gibt eine Basis aus Eigenvektoren
              (Spalten von <M>{"\\bP"}</M>), und in dieser Basis ist die Abbildung eine{" "}
              <ConceptLink id="diagonal-matrix">Diagonalmatrix</ConceptLink> mit den Eigenwerten
              auf der Diagonale
            </>
          }
        >
          <p>
            Wir führen den Beweis für <em>diagonalisierbare</em> <M>{"\\bA"}</M>. Sei dazu
          </p>
          <MD>{"\\bA = \\bP\\bD\\bP^{-1} \\quad \\text{mit} \\quad \\bD = \\diag(\\cblue{\\lambda_1}, \\ldots, \\cblue{\\lambda_n})"}</MD>
          <p>
            eine Diagonalisierung von <M>{"\\bA"}</M>.
          </p>
        </PStep>
        <PStep
          why={
            <>
              Ähnlichkeitsinvarianz der Spur (Satz 3.1.4, Eigenschaft 4) —{" "}
              <ConceptLink id="similar-matrices">ähnliche Matrizen</ConceptLink> haben dieselbe
              Spur
            </>
          }
        >
          <MD>{"\\tr(\\bA) = \\tr\\left(\\bP\\bD\\bP^{-1}\\right) = \\tr(\\bD)"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Definition der Spur: Die Diagonalelemente von <M>{"\\bD"}</M> sind genau die
              Eigenwerte
            </>
          }
        >
          <MD>{"\\tr(\\bD) = \\sum_{i=1}^n \\cblue{\\lambda_i}."}</MD>
        </PStep>
      </Proof>
      <p>
        Der Satz gilt auch für nicht diagonalisierbare Matrizen; der allgemeine Beweis läuft über
        einen Koeffizientenvergleich im charakteristischen Polynom{" "}
        <M>{"\\det(\\bA - \\lambda\\bI)"}</M> (
        <ConceptLink id="determinant">Determinante</ConceptLink>) und ist hier nicht unser Thema.
        Zwei Feinheiten sind trotzdem erwähnenswert: Die Eigenwerte zählen wir mit ihrer
        algebraischen Vielfachheit, und sie dürfen{" "}
        <ConceptLink id="complex-numbers">komplex</ConceptLink> sein — eine reelle Matrix kann
        komplexe Eigenwerte haben. Die treten dann aber immer als konjugierte Paare{" "}
        <M>{"a \\pm b\\,i"}</M> auf, deren Imaginärteile sich in der Summe wegheben: Die Spur
        bleibt reell, wie es sich für eine Summe reeller Diagonalelemente gehört. Praktisch
        bedeutet der Satz: Die Spur verrät uns die Summe aller Eigenwerte zum Preis von{" "}
        <M>{"n - 1"}</M> Additionen — die Eigenwerte selbst zu berechnen wäre um Größenordnungen
        teurer.
      </p>
      <ExpandedReading title="Spur = Eigenwertsumme — live ausprobieren">
        <S31SpurWidget />
      </ExpandedReading>

      <h3 id="sec-3.1.4" className="mt-6 text-lg font-semibold">
        3.1.4 Die Frobenius-Norm
      </h3>
      <p>
        Die Spur verdichtet eine Matrix zu einer Zahl — aber als Maß für die „Größe" einer Matrix
        taugt sie nicht: Sie ignoriert alle Einträge abseits der Diagonale, kann negativ werden
        und ist für rechteckige Matrizen gar nicht definiert. Für ein echtes Größenmaß liegt eine
        andere Idee nahe: Wir behandeln die <M>{"m \\cdot n"}</M> Einträge der Matrix wie einen
        langen Vektor und nehmen dessen{" "}
        <ConceptLink id="euclidean-norm">euklidische Norm</ConceptLink>.
      </p>
      <EnvBlock kind="Definition" label="3.1.8 (Frobenius-Norm)">
        <p>
          Die <em>Frobenius-Norm</em> einer Matrix <M>{"\\bA \\in \\R^{m \\times n}"}</M> ist
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_F := \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2}."}</MD>
      </EnvBlock>
      <EnvBlock kind="Bemerkung" label="3.1.9">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Die Frobenius-Norm ist das exakte Analogon zur euklidischen Vektornorm: Quadrieren,
            aufsummieren, Wurzel ziehen — nur eben über alle <M>{"m \\cdot n"}</M> Einträge. Sie
            ist insbesondere auch für rechteckige Matrizen definiert.
          </li>
          <li>
            In der Literatur heißt sie auch <em>Hilbert-Schmidt-Norm</em>.
          </li>
          <li>
            Sie misst so etwas wie die „Größe" der Matrix — ob sie das <em>richtige</em> Maß für
            unsere Zwecke ist, klären wir im{" "}
            <a className="underline" href="#sec-3.2">nächsten Abschnitt</a>.
          </li>
        </ul>
      </EnvBlock>
      <p>
        Das folgende Resultat verknüpft die beiden Begriffe dieses Abschnitts: Die Frobenius-Norm
        lässt sich vollständig durch die Spur ausdrücken. Damit stehen ihr alle Rechenregeln aus
        Satz 3.1.4 zur Verfügung — insbesondere die zyklische Vertauschung.
      </p>
      <EnvBlock kind="Satz" label="3.1.10 (Frobenius-Norm über die Spur)">
        <p>
          Für <M>{"\\bA \\in \\R^{m \\times n}"}</M> gilt
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2} = \\sqrt{\\tr(\\bA^\\top\\bA)}."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              Eintrag <M>{"(j, k)"}</M> von <M>{"\\bA^\\top\\bA"}</M> ist das Skalarprodukt aus{" "}
              <M>{"j"}</M>-ter Zeile von <M>{"\\bA^\\top"}</M> — also <M>{"j"}</M>-ter{" "}
              <em>Spalte</em> von <M>{"\\bA"}</M> — und <M>{"k"}</M>-ter Spalte von{" "}
              <M>{"\\bA"}</M>; auf der Diagonale (<M>{"j = k"}</M>, grün) steht also jede Spalte
              im Skalarprodukt mit sich selbst
            </>
          }
        >
          <p>
            Wir berechnen <M>{"\\bA^\\top\\bA \\in \\R^{n \\times n}"}</M> eintragsweise:
          </p>
          <MD>{"\\bA^\\top\\bA = \\begin{pmatrix} \\cgreen{\\sum_{i=1}^m a_{i1}^2} & \\sum_{i=1}^m a_{i1}a_{i2} & \\cdots \\\\ \\sum_{i=1}^m a_{i2}a_{i1} & \\cgreen{\\sum_{i=1}^m a_{i2}^2} & \\cdots \\\\ \\vdots & \\vdots & \\ddots \\end{pmatrix}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Spur summiert die grünen Diagonalelemente; zusammen durchlaufen die beiden
              Summen alle <M>{"m \\cdot n"}</M> Einträge von <M>{"\\bA"}</M> genau einmal
            </>
          }
        >
          <MD>{"\\quimpl \\tr(\\bA^\\top\\bA) = \\sum_{j=1}^n \\cgreen{\\sum_{i=1}^m a_{ij}^2} = \\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2"}</MD>
        </PStep>
        <PStep why={<>Wurzel ziehen auf beiden Seiten; Definition 3.1.8</>}>
          <MD>{"\\quimpl \\sqrt{\\tr(\\bA^\\top\\bA)} = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n a_{ij}^2} = \\left\\| \\bA \\right\\|_F."}</MD>
        </PStep>
      </Proof>
      <p>
        Diese Spur-Darstellung ist mehr als eine Kuriosität: Sie macht die Frobenius-Norm in
        Rechnungen handhabbar, in denen die Doppelsumme unhandlich wäre. Ob die Frobenius-Norm
        allerdings das misst, was wir bei der Fehleranalyse wirklich brauchen — nämlich wie stark
        eine Matrix Vektoren verzerren kann —, ist eine andere Frage. Ihr gehen wir im{" "}
        <a className="underline" href="#sec-3.2">nächsten Abschnitt</a> nach, wo wir den Begriff
        der Matrixnorm systematisch entwickeln.
      </p>

      <p className="italic">Vertiefung: Heath §2; MML §4.1.</p>
    </div>
  );
}
