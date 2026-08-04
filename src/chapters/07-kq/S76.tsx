import { ConceptLink, EnvBlock, Eq, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { AccuracyWidget, CostWidget, MethodChooser } from "./widgets/S76Compare";

/**
 * §7.6 Pseudoinverse, SVD-Lösung und Methodenvergleich.
 * Quelle: Folien 07-kq.Rmd, „Pseudoinverse und Kleinste Quadrate" bis „Wrap-up".
 */
export function S76() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose [&>ul]:max-w-prose">
      <p className="text-sm italic text-slate-500 dark:text-slate-400">
        Folien: 07-kq, „Pseudoinverse und Kleinste Quadrate“ bis „Wrap-up“.
      </p>

      <p>
        Zwei Lösungswege für das{" "}
        <a className="underline decoration-dotted" href="#sec-7.1">
          Kleinste-Quadrate-Problem
        </a>{" "}
        kennen wir schon: die{" "}
        <a className="underline decoration-dotted" href="#sec-7.3">
          Normalengleichungen
        </a>{" "}
        mit{" "}
        <ConceptLink id="cholesky-factorization">Cholesky-Zerlegung</ConceptLink> und die{" "}
        <a className="underline decoration-dotted" href="#sec-7.4">
          QR-Zerlegung
        </a>
        . Beide setzen stillschweigend <M>{"\\rang(\\bA) = n"}</M> voraus. Was aber, wenn{" "}
        <M>{"\\bA"}</M> rangdefizient oder fast singulär ist? Dann ist{" "}
        <M>{"\\bA^\\top\\bA"}</M> singulär, die Cholesky-Zerlegung bricht ab, und auch{" "}
        <M>{"\\bR"}</M> in der QR-Zerlegung wird singulär. Genau hier hilft die{" "}
        <ConceptLink id="singular-value-decomposition">Singulärwertzerlegung</ConceptLink> (SVD)
        aus Kapitel 6 — sie liefert das dritte und robusteste Lösungsverfahren. Am Ende des
        Abschnitts vergleichen wir alle drei Methoden und fassen das Kapitel zusammen.
      </p>

      <h3 className="mt-6 text-lg font-semibold" id="sec-7.6-svd-loesung">
        Die SVD-Lösung über die Pseudoinverse
      </h3>

      <p>
        Erinnern wir uns an Kapitel 6: Für <M>{"\\bA \\in \\R^{m \\times n}"}</M> mit{" "}
        <ConceptLink id="rank">Rang</ConceptLink> <M>{"r"}</M> und reduzierter SVD{" "}
        <M>{"\\bA = \\bU_r \\bSigma_r \\bV_r^\\top"}</M> ist die{" "}
        <ConceptLink id="pseudoinverse">Moore-Penrose-Pseudoinverse</ConceptLink>{" "}
        definiert als <M>{"\\bA\\pinv = \\bV_r \\bSigma_r^{-1} \\bU_r^\\top \\in \\R^{n \\times m}"}</M>,
        wobei <M>{"\\bSigma_r^{-1} = \\diag(1/\\sigma_1, \\ldots, 1/\\sigma_r)"}</M> eine{" "}
        <ConceptLink id="diagonal-matrix">Diagonalmatrix</ConceptLink> ist. Die zentrale
        Eigenschaft aus Kapitel 6: <M>{"\\bA\\bA\\pinv"}</M> ist die{" "}
        <ConceptLink id="projection">Projektion</ConceptLink> auf den Spaltenraum{" "}
        <M>{"\\col(\\bA)"}</M>. Das ist exakt das, was wir für Kleinste Quadrate brauchen — denn
        in{" "}
        <a className="underline decoration-dotted" href="#sec-7.1">
          Abschnitt 7.1
        </a>{" "}
        haben wir gesehen: <M>{"\\wh{\\bx}"}</M> löst das KQ-Problem genau dann, wenn{" "}
        <M>{"\\bA\\wh{\\bx} = \\proj_{\\col(\\bA)}\\bb"}</M>.
      </p>

      <EnvBlock kind="Satz" label="7.6.1 (SVD-Lösung des KQ-Problems)">
        <p>
          Sei <M>{"\\bA \\in \\R^{m \\times n}"}</M> mit <M>{"\\rang(\\bA) = r"}</M> und
          reduzierter SVD <M>{"\\bA = \\bU_r \\bSigma_r \\bV_r^\\top"}</M>, und sei{" "}
          <M>{"\\bb \\in \\R^m"}</M>. Dann löst
        </p>
        <Eq tag="7.6.1">
          {"\\wh{\\bx} = \\bA\\pinv\\bb = \\bV_r \\bSigma_r^{-1} \\bU_r^\\top \\bb"}
        </Eq>
        <p>
          das Kleinste-Quadrate-Problem <M>{"\\min_{\\bx} \\left\\| \\bA\\bx - \\bb \\right\\|_2"}</M>.
          Ist <M>{"r = n"}</M>, so ist <M>{"\\wh{\\bx}"}</M> die eindeutige Lösung. Ist{" "}
          <M>{"r < n"}</M>, so ist <M>{"\\wh{\\bx}"}</M> unter allen KQ-Lösungen diejenige mit
          minimaler Norm:
        </p>
        <MD>
          {"\\bA\\pinv\\bb = \\argmin \\left\\{ \\left\\| \\bx \\right\\|_2 : \\bx \\text{ minimiert } \\left\\| \\bA\\bx - \\bb \\right\\|_2 \\right\\}."}
        </MD>
      </EnvBlock>

      <p>
        Der Beweis besteht aus zwei Teilen. Zuerst zeigen wir, dass <M>{"\\bA\\wh{\\bx}"}</M>{" "}
        tatsächlich die Projektion von <M>{"\\bb"}</M> auf <M>{"\\col(\\bA)"}</M> ist; die Farben
        verfolgen <M>{"\\cbred{\\bU_r}"}</M>, <M>{"\\cgreen{\\bSigma_r}"}</M> und{" "}
        <M>{"\\cblue{\\bV_r}"}</M> durch die Rechnung.
      </p>

      <Proof>
        <PStep
          why={
            <>
              reduzierte SVD und Definition der Pseudoinversen einsetzen; die inneren Faktoren
              treffen aufeinander
            </>
          }
        >
          <MD>
            {"\\bA\\bA\\pinv = \\cbred{\\bU_r}\\cgreen{\\bSigma_r}\\cblue{\\bV_r^\\top}\\,\\cblue{\\bV_r}\\cgreen{\\bSigma_r^{-1}}\\cbred{\\bU_r^\\top}"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\cblue{\\bV_r^\\top\\bV_r} = \\bI_r"}</M>, denn die Spalten von{" "}
              <M>{"\\cblue{\\bV_r}"}</M> sind orthonormal; danach{" "}
              <M>{"\\cgreen{\\bSigma_r\\bSigma_r^{-1}} = \\bI_r"}</M>
            </>
          }
        >
          <MD>{"\\bA\\bA\\pinv = \\cbred{\\bU_r}\\cgreen{\\bSigma_r\\bSigma_r^{-1}}\\cbred{\\bU_r^\\top} = \\cbred{\\bU_r\\bU_r^\\top}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Spalten von <M>{"\\cbred{\\bU_r}"}</M> bilden eine{" "}
              <ConceptLink id="orthonormal-basis">Orthonormalbasis</ConceptLink> von{" "}
              <M>{"\\col(\\bA)"}</M>, also ist <M>{"\\cbred{\\bU_r\\bU_r^\\top}"}</M> die
              Projektionsmatrix auf <M>{"\\col(\\bA)"}</M>
            </>
          }
        >
          <MD>{"\\bA\\wh{\\bx} = \\bA\\bA\\pinv\\bb = \\cbred{\\bU_r\\bU_r^\\top}\\bb = \\proj_{\\col(\\bA)}\\bb"}</MD>
        </PStep>
        <PStep
          why={
            <>
              das ist genau die geometrische Charakterisierung der KQ-Lösung aus Abschnitt 7.1
            </>
          }
        >
          <p>
            Also minimiert <M>{"\\wh{\\bx} = \\bA\\pinv\\bb"}</M> die Norm{" "}
            <M>{"\\left\\| \\bA\\bx - \\bb \\right\\|_2"}</M>.
          </p>
        </PStep>
        <PStep
          why={
            <>
              jede KQ-Lösung <M>{"\\bx"}</M> erfüllt dieselbe Projektionsgleichung{" "}
              <M>{"\\bA\\bx = \\proj_{\\col(\\bA)}\\bb = \\bA\\wh{\\bx}"}</M>; die Differenz{" "}
              <M>{"\\cpurp{\\bz} = \\bx - \\wh{\\bx}"}</M> liegt also im Kern
            </>
          }
        >
          <p className="mb-1">
            Nun zur Minimal-Norm-Eigenschaft. Ab hier verfolgt <M>{"\\cpurp{\\bz}"}</M> den
            Anteil einer beliebigen KQ-Lösung, der im{" "}
            <ConceptLink id="null-space">Kern</ConceptLink> von <M>{"\\bA"}</M> liegt:
          </p>
          <MD>{"\\bx = \\wh{\\bx} + \\cpurp{\\bz} \\quad \\text{mit} \\quad \\bA\\cpurp{\\bz} = \\bnull"}</MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\wh{\\bx}"}</M> ist eine Linearkombination der Spalten von{" "}
              <M>{"\\cblue{\\bV_r}"}</M>; deren Spann ist der Zeilenraum{" "}
              <M>{"\\col(\\bA^\\top)"}</M>, und der steht senkrecht auf dem Kern (
              <ConceptLink id="orthogonal-complement">orthogonales Komplement</ConceptLink>,
              Kapitel 6)
            </>
          }
        >
          <MD>
            {"\\wh{\\bx} = \\cblue{\\bV_r}\\left(\\bSigma_r^{-1}\\bU_r^\\top\\bb\\right) \\in \\spann(\\cblue{\\bV_r}) = \\col(\\bA^\\top) \\perp \\operatorname{Kern}(\\bA) \\ni \\cpurp{\\bz}"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Satz des Pythagoras für <M>{"\\wh{\\bx} \\perp \\cpurp{\\bz}"}</M>; Gleichheit nur
              für <M>{"\\cpurp{\\bz} = \\bnull"}</M>
            </>
          }
        >
          <MD>
            {"\\left\\| \\bx \\right\\|_2^2 = \\left\\| \\wh{\\bx} \\right\\|_2^2 + \\left\\| \\cpurp{\\bz} \\right\\|_2^2 \\;\\geq\\; \\left\\| \\wh{\\bx} \\right\\|_2^2"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              für <M>{"\\rang(\\bA) = n"}</M> ist <M>{"\\operatorname{Kern}(\\bA) = \\{\\bnull\\}"}</M>,
              also <M>{"\\cpurp{\\bz} = \\bnull"}</M> erzwungen
            </>
          }
        >
          <p>
            <M>{"\\wh{\\bx}"}</M> hat unter allen KQ-Lösungen die kleinste Norm — und ist bei
            vollem Rang die einzige Lösung.
          </p>
        </PStep>
      </Proof>

      <p>
        Rechnen wir das an einem bewusst „kaputten“ Beispiel durch — einer Matrix, an der die
        Normalengleichungen scheitern.
      </p>

      <EnvBlock kind="Beispiel" label="7.6.2 (rangdefizientes KQ-Problem)">
        <p>Betrachten wir</p>
        <MD>
          {"\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\\\ 1 & 1 \\end{pmatrix}, \\qquad \\bb = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}, \\qquad \\rang(\\bA) = 1 < n = 2."}
        </MD>
        <p>
          Die Normalengleichungen sind hier chancenlos:{" "}
          <M>{"\\bA^\\top\\bA = \\left(\\begin{smallmatrix} 3 & 3 \\\\ 3 & 3 \\end{smallmatrix}\\right)"}</M>{" "}
          ist singulär, die Cholesky-Zerlegung bricht ab. Die reduzierte SVD existiert trotzdem
          (<M>{"r = 1"}</M>): Wegen <M>{"\\bA^\\top\\bA"}</M> mit Eigenwerten <M>{"6"}</M> und{" "}
          <M>{"0"}</M> ist <M>{"\\cgreen{\\sigma_1} = \\sqrt{6}"}</M>, und
        </p>
        <MD>
          {"\\bA = \\cbred{\\bu_1}\\cgreen{\\sigma_1}\\cblue{\\bv_1^\\top} \\quad \\text{mit} \\quad \\cbred{\\bu_1} = \\tfrac{1}{\\sqrt{3}}\\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad \\cgreen{\\sigma_1} = \\sqrt{6}, \\quad \\cblue{\\bv_1} = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}."}
        </MD>
        <p>
          (Probe: <M>{"\\cgreen{\\sqrt{6}} \\cdot \\tfrac{1}{\\sqrt{3}} \\cdot \\tfrac{1}{\\sqrt{2}} = 1"}</M>{" "}
          — jeder Eintrag von <M>{"\\cbred{\\bu_1}\\cgreen{\\sigma_1}\\cblue{\\bv_1^\\top}"}</M>{" "}
          ist <M>{"1"}</M>.) Die Pseudoinverse wird damit
        </p>
        <MD>
          {"\\bA\\pinv = \\cblue{\\bv_1}\\,\\cgreen{\\sigma_1^{-1}}\\,\\cbred{\\bu_1^\\top} = \\tfrac{1}{\\sqrt{2}} \\cdot \\cgreen{\\tfrac{1}{\\sqrt{6}}} \\cdot \\tfrac{1}{\\sqrt{3}} \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{pmatrix} = \\tfrac{1}{6}\\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{pmatrix},"}
        </MD>
        <p>und die SVD-Lösung nach (7.6.1):</p>
        <MD>
          {"\\wh{\\bx} = \\bA\\pinv\\bb = \\tfrac{1}{6}\\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} = \\tfrac{1}{6}\\begin{pmatrix} 6 \\\\ 6 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}."}
        </MD>
        <p>
          Probe: <M>{"\\bA\\wh{\\bx} = (2, 2, 2)^\\top"}</M> ist genau die Projektion von{" "}
          <M>{"\\bb"}</M> auf <M>{"\\col(\\bA) = \\spann\\{(1,1,1)^\\top\\}"}</M> (der Mittelwert
          von <M>{"\\bb"}</M> ist <M>{"2"}</M>). Alle KQ-Lösungen erfüllen{" "}
          <M>{"x_1 + x_2 = 2"}</M> — etwa auch <M>{"(2, 0)^\\top"}</M> mit Norm <M>{"2"}</M>.
          Unsere Lösung <M>{"\\wh{\\bx} = (1,1)^\\top"}</M> hat Norm{" "}
          <M>{"\\sqrt{2} \\approx 1{,}41"}</M> — die kleinste, wie Satz 7.6.1 verspricht.
        </p>
      </EnvBlock>

      <h3 className="mt-6 text-lg font-semibold" id="sec-7.6-svd-vs-ne">
        SVD vs. Normalengleichungen
      </h3>

      <p>
        Stellen wir die beiden extremen Zugänge einander gegenüber. Die{" "}
        <a className="underline decoration-dotted" href="#sec-7.3">
          Normalengleichungen
        </a>{" "}
        <M>{"\\bA^\\top\\bA\\,\\bx = \\bA^\\top\\bb"}</M> sind schnell, haben aber drei
        strukturelle Schwächen: <M>{"\\bA^\\top\\bA"}</M> kann schlecht konditioniert sein — aus{" "}
        <a className="underline decoration-dotted" href="#sec-7.2">
          Abschnitt 7.2
        </a>{" "}
        wissen wir <M>{"\\kappa(\\bA^\\top\\bA) \\approx \\kappa(\\bA)^2"}</M>, die{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink> wird quadriert. Sie
        funktionieren gar nicht, wenn <M>{"\\bA^\\top\\bA"}</M> singulär ist. Und{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> werden entsprechend
        verstärkt.
      </p>
      <p>
        Der SVD-Zugang <M>{"\\wh{\\bx} = \\bA\\pinv\\bb"}</M> vermeidet all das: Er arbeitet
        direkt mit <M>{"\\bA"}</M> statt mit <M>{"\\bA^\\top\\bA"}</M>, quadriert die Kondition
        also nicht. Singuläre und rangdefiziente Probleme behandelt er automatisch — Beispiel
        7.6.2 hat das vorgeführt. Formel (7.6.1) ist zudem eine <em>explizite Konstruktion</em>{" "}
        der Lösung: Sobald die SVD vorliegt, ist kein Gleichungssystem mehr zu lösen, nur noch
        Matrix-Vektor-Produkte auszuwerten. Er hat eine klare geometrische Interpretation (Projektion auf{" "}
        <M>{"\\col(\\bA)"}</M> plus Minimal-Norm-Auswahl). Und für <M>{"\\rang(\\bA) < n"}</M>{" "}
        wirkt die Minimal-Norm-Eigenschaft aus Satz 7.6.1 wie eine eingebaute{" "}
        <em>Regularisierung</em>: Unter unendlich vielen Lösungen wählt die Pseudoinverse
        reproduzierbar die „kleinste“ aus.
      </p>

      <h3 className="mt-6 text-lg font-semibold" id="sec-7.6-vergleich">
        Praktischer Methodenvergleich
      </h3>

      <p>
        Warum dann nicht immer SVD? Weil Robustheit ihren Preis hat. Fassen wir die
        Praxis-Regeln der Folien zusammen:
      </p>

      <EnvBlock kind="Bemerkung" label="7.6.3 (Anmerkungen zur Methodenwahl)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Die QR-Zerlegung ist stabiler, aber langsamer als der Cholesky-Weg über die
            Normalengleichungen.
          </li>
          <li>
            Die SVD ist am langsamsten, aber sinnvoll, wenn <M>{"\\bA"}</M> fast singulär ist,
            d.&thinsp;h. <M>{"\\sigma_{\\min}(\\bA) \\approx 0 \\impl \\kappa(\\bA) \\gg 1"}</M>.
          </li>
          <li>
            Wir können dann <M>{"\\bSigma_r"}</M> verkleinern, indem wir die <M>{"r - k"}</M>{" "}
            kleinsten Singulärwerte auf <M>{"0"}</M> setzen — das ist die{" "}
            <ConceptLink id="low-rank-approximation">Rang-k-Approximation</ConceptLink> aus
            Kapitel 6, hier als gezielte Glättung eines fast singulären Problems.
          </li>
          <li>
            Alle genannten Methoden haben für <M>{"m \\gg n"}</M> eine{" "}
            <ConceptLink id="big-o-notation">Komplexität</ConceptLink> von{" "}
            <M>{"O(mn^2 + n^3)"}</M> — aber die Konstanten unterscheiden sich deutlich.
          </li>
        </ul>
      </EnvBlock>

      <ExpandedReading title="Was kostet welche Methode? (interaktiv)">
        <p className="mb-2 text-sm">
          Die <M>{"O"}</M>-Klasse ist bei allen drei Methoden gleich — entscheidend sind die
          Konstanten. Stellen wir <M>{"n"}</M> und das Seitenverhältnis <M>{"m/n"}</M> ein und
          vergleichen die ungefähren Operationszahlen. Die SVD-Konstante hängt vom Algorithmus
          ab (typisch 4–12, iterative Verfahren, vgl. Kapitel 6).
        </p>
        <CostWidget />
      </ExpandedReading>

      <ExpandedReading title="Genauigkeit: wie viele korrekte Stellen? (interaktiv)">
        <p className="mb-2 text-sm">
          Der Rundungsfehler der Normalengleichungen wächst wie{" "}
          <M>{"\\kappa_2(\\bA)^2 \\, \\eps"}</M>, der von QR nur wie{" "}
          <M>{"\\left(\\kappa_2(\\bA) + \\left\\|\\br\\right\\|_2 \\kappa_2(\\bA)^2\\right)\\eps"}</M>{" "}
          mit der <ConceptLink id="machine-epsilon">Maschinengenauigkeit</ConceptLink>{" "}
          <M>{"\\eps"}</M>. Verschieben wir Kondition und Residuumsnorm und beobachten, wann
          welche Methode ihre Stellen verliert.
        </p>
        <AccuracyWidget />
      </ExpandedReading>

      <h3 className="mt-6 text-lg font-semibold" id="sec-7.6-zusammenfassung">
        Zusammenfassung: das Kapitel im Überblick
      </h3>

      <p>Damit haben wir alle Bausteine des Kapitels beisammen:</p>

      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          <strong>Kleinste-Quadrate-Problem</strong> (
          <a className="underline decoration-dotted" href="#sec-7.1">
            Abschnitt 7.1
          </a>
          ): minimiere <M>{"\\left\\| \\bA\\bx - \\bb \\right\\|_2"}</M> für ein überbestimmtes{" "}
          <ConceptLink id="linear-system">LGS</ConceptLink>. Geometrisch:{" "}
          <M>{"\\bA\\wh{\\bx}"}</M> ist die Projektion von <M>{"\\bb"}</M> auf{" "}
          <M>{"\\col(\\bA)"}</M>.
        </li>
        <li>
          <strong>Kondition</strong> (
          <a className="underline decoration-dotted" href="#sec-7.2">
            Abschnitt 7.2
          </a>
          ): bzgl. <M>{"\\bb"}</M> hängt sie vom Winkel zwischen <M>{"\\bb"}</M> und{" "}
          <M>{"\\col(\\bA)"}</M> ab, bzgl. <M>{"\\bA"}</M> ist sie typischerweise{" "}
          <M>{"O(\\kappa_2(\\bA)^2)"}</M> — die quadrierte Konditionszahl.
        </li>
        <li>
          <strong>Normalengleichungen + Cholesky</strong> (
          <a className="underline decoration-dotted" href="#sec-7.3">
            Abschnitt 7.3
          </a>
          ): löse <M>{"\\bA^\\top\\bA\\,\\bx = \\bA^\\top\\bb"}</M>, also{" "}
          <M>{"\\wh{\\bx} = (\\bA^\\top\\bA)^{-1}\\bA^\\top\\bb"}</M> falls{" "}
          <M>{"\\rang(\\bA) = n"}</M>; <M>{"O(mn^2 + n^3)"}</M>. Schnell, aber wegen{" "}
          <M>{"\\kappa^2"}</M> potenziell
          instabil. Möglich, weil <M>{"\\bA^\\top\\bA"}</M>{" "}
          <ConceptLink id="positive-definite">SPD</ConceptLink> ist (falls{" "}
          <M>{"\\rang(\\bA) = n"}</M>).
        </li>
        <li>
          <strong>QR-Zerlegung</strong> (
          <a className="underline decoration-dotted" href="#sec-7.4">
            Abschnitte 7.4
          </a>
          –
          <a className="underline decoration-dotted" href="#sec-7.5">
            7.5
          </a>
          ): <M>{"\\bA = \\bQ \\left(\\begin{smallmatrix} \\bR \\\\ \\bnull \\end{smallmatrix}\\right)"}</M>,
          löse <M>{"\\bR\\bx = \\bc_1"}</M> mit{" "}
          <M>{"\\bQ^\\top\\bb = \\left(\\begin{smallmatrix} \\bc_1 \\\\ \\bc_2 \\end{smallmatrix}\\right)"}</M>;{" "}
          <M>{"O(mn^2)"}</M>. Stabil, quadriert die Kondition nicht — die Standardwahl.
        </li>
        <li>
          <strong>SVD und Pseudoinverse</strong> (dieser Abschnitt):{" "}
          <M>{"\\wh{\\bx} = \\bA\\pinv\\bb"}</M>; <M>{"O(\\min(m^2n,\\, mn^2))"}</M> mit großen
          Konstanten. Am stabilsten, funktioniert auch für rangdefiziente <M>{"\\bA"}</M> und
          liefert dann die Minimal-Norm-Lösung.
        </li>
      </ul>

      <p>
        Warum ist das für die Statistik zentral? Wir haben fast immer mehr Beobachtungen als
        Parameter (<M>{"m > n"}</M>): Das{" "}
        <ConceptLink id="linear-regression">lineare Modell</ConceptLink>{" "}
        <M>{"\\by = \\bX\\bbeta + \\bepsilon"}</M> ist genau ein Kleinste-Quadrate-Problem, und
        auch nichtlineare Probleme werden oft iterativ gelöst: linear approximieren,
        Approximation minimieren, wiederholen. Die Projektionsgeometrie liefert dabei die
        Intuition, die Analysis die Normalengleichungen (<M>{"\\nabla \\left\\| \\bA\\bx - \\bb \\right\\|_2^2 = \\bnull"}</M>),
        und die numerische lineare Algebra sagt uns, welchen Lösungsweg wir wählen sollten:
        einen Kompromiss aus Geschwindigkeit und Stabilität.
      </p>

      <ExpandedReading title="Entscheidungshilfe: welche Methode wählen? (interaktiv)">
        <p className="mb-2 text-sm">
          Die Abwägungen des Kapitels als Daumenregel-Automat: Form von <M>{"\\bA"}</M>,
          Kondition und Anspruch einstellen — die Empfehlung samt Begründung erscheint unten.
        </p>
        <MethodChooser />
      </ExpandedReading>

      <p>
        Damit endet unser Rundgang durch die Kleinste-Quadrate-Verfahren. Im nächsten Kapitel
        wechseln wir die Perspektive: probabilistische Sichtweisen und iterative Methoden.
      </p>

      <p className="border-t border-slate-200 pt-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
        <em>Vertiefung:</em> Heath §3.6 (SVD und Pseudoinverse) und §3.7 (Methodenvergleich);
        MML §7.1 verbindet Kleinste Quadrate mit dem Gradientenblick auf Optimierung.
      </p>
    </div>
  );
}
