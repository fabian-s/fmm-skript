import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import {
  FastRangdefektWidget,
  FigKQGeometrie,
  KonditionsQuadrierungLab,
  WinkelWidget,
} from "./widgets/S72Kondition";

/** §7.2 Kondition des Kleinste-Quadrate-Problems (Folien 07-kq, „Kondition"). */
export function S72() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm italic text-slate-500 dark:text-slate-400">
        Folien: 07-kq, Abschnitt „Kondition".
      </p>

      <p>
        Bevor wir in den folgenden Abschnitten Algorithmen zur Lösung des
        KQ-Problems entwickeln, stellen wir dieselbe Frage wie seinerzeit bei
        den linearen Gleichungssystemen: Wie empfindlich reagiert die Lösung{" "}
        <M>{"\\wh{\\bx}"}</M> auf kleine Störungen der Eingaben? Die Antwort
        gibt die <ConceptLink id="condition-number">Kondition</ConceptLink> des
        Problems — und sie legt fest, welche Genauigkeit wir von{" "}
        <em>jedem</em> Algorithmus bestenfalls erwarten dürfen. Denn die
        Kondition ist eine Eigenschaft des Problems selbst, nicht des
        Lösungswegs. Beim KQ-Problem gibt es zwei Eingaben, die gestört sein
        können: den Datenvektor <M>{"\\bb"}</M> und die Matrix{" "}
        <M>{"\\bA"}</M>. Wir behandeln beide Fälle getrennt.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Vorbemerkungen</h3>

      <p>
        Wir untersuchen nun die Kondition von KQ-Problemen{" "}
        <M>{"\\bA\\bx \\approx \\bb"}</M> mit <M>{"\\bA \\in \\R^{m \\times n}"}</M>{" "}
        und <M>{"\\bb \\in \\R^m"}</M>. Dabei beschränken wir uns auf den Fall{" "}
        <M>{"m \\ge n"}</M> und <M>{"\\rang(\\bA) = n"}</M> — dann existiert,
        wie in <a className="underline" href="#sec-7.1">Abschnitt 7.1</a> gesehen, eine eindeutige
        Lösung <M>{"\\wh{\\bx}"}</M>. Als Norm verwenden wir im Folgenden stets{" "}
        <M>{"\\left\\|\\cdot\\right\\| = \\left\\|\\cdot\\right\\|_2"}</M>: Das
        KQ-Problem minimiert gerade einen Abstand in der{" "}
        <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink>, sie
        ist also die natürliche Wahl.
      </p>

      <p>
        Die Abbildung von den Daten zur Lösung schreiben wir als{" "}
        <M>{"\\wh{\\bx} = \\bA\\pinv\\bb"}</M>. Hier bezeichnet{" "}
        <M>{"\\bA\\pinv"}</M> die <em>Pseudoinverse</em> von <M>{"\\bA"}</M>,
        die wir in <a className="underline" href="#sec-7.6">Abschnitt 7.6</a> genauer kennenlernen.
        Für den Moment genügt: <M>{"\\bA\\pinv"}</M> ist die Matrix, die jedem{" "}
        <M>{"\\bb"}</M> seine eindeutige KQ-Lösung zuordnet, und für
        quadratisches, reguläres <M>{"\\bA"}</M> gilt schlicht{" "}
        <M>{"\\bA\\pinv = \\bA^{-1}"}</M>. Damit können wir die vertraute
        Definition der Konditionszahl auf rechteckige Matrizen übertragen:
      </p>

      <EnvBlock kind="Definition" label="7.2.1">
        <p>
          Für eine nicht notwendigerweise quadratische Matrix{" "}
          <M>{"\\bA \\in \\R^{m \\times n}"}</M> mit <M>{"m \\ge n"}</M>{" "}
          definieren wir die <em>Konditionszahl</em>
        </p>
        <MD>
          {"\\kappa(\\bA) = \\begin{cases} \\infty, & \\rang(\\bA) < n, \\\\ \\left\\|\\bA\\right\\| \\left\\|\\bA\\pinv\\right\\|, & \\text{sonst}. \\end{cases}"}
        </MD>
      </EnvBlock>

      <EnvBlock kind="Bemerkung" label="7.2.2">
        <p>
          Für quadratisches, reguläres <M>{"\\bA"}</M> ist{" "}
          <M>{"\\bA\\pinv = \\bA^{-1}"}</M>, und wir erhalten die bekannte
          Konditionszahl{" "}
          <M>{"\\kappa(\\bA) = \\left\\|\\bA\\right\\| \\left\\|\\bA^{-1}\\right\\|"}</M>{" "}
          zurück. In der 2-Norm gilt außerdem — mit den Singulärwerten aus der{" "}
          <ConceptLink id="singular-value-decomposition">SVD</ConceptLink> —
        </p>
        <MD>{"\\kappa_2(\\bA) = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}},"}</MD>
        <p>
          denn <M>{"\\left\\|\\bA\\right\\|_2 = \\sigma_{\\max}"}</M> und{" "}
          <M>{"\\left\\|\\bA\\pinv\\right\\|_2 = 1/\\sigma_{\\min}"}</M>. Die
          Fallunterscheidung in Definition 7.2.1 ist dabei konsistent: Nähert
          sich <M>{"\\bA"}</M> dem <ConceptLink id="rank">Rang</ConceptLink>defekt,
          geht <M>{"\\sigma_{\\min} \\to 0"}</M> und damit{" "}
          <M>{"\\kappa_2(\\bA) \\to \\infty"}</M>.
        </p>
      </EnvBlock>

      <ExpandedReading title="Konditionszahl als Nähe zum Rangdefekt">
        <p className="mb-3 text-sm">
          Zwei Einheitsspalten im Winkel α zueinander: Je kleiner α, desto
          näher ist <M>{"\\bA"}</M> am Rangdefekt — und desto größer{" "}
          <M>{"\\kappa_2(\\bA)"}</M>. Ziehen Sie am Regler und beobachten Sie,
          wie das Bild des Einheitskreises kollabiert.
        </p>
        <FastRangdefektWidget />
      </ExpandedReading>

      <h3 className="mt-6 text-lg font-semibold">
        Kondition bezüglich <M>{"\\bb"}</M>
      </h3>

      <p>
        Beginnen wir mit dem statistisch wichtigsten Fall: <M>{"\\bA"}</M> ist
        fix, aber der Datenvektor <M>{"\\bb"}</M> ist gestört — etwa durch
        Messfehler oder schlicht durch{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> beim
        Einlesen. Das Problem ist dann die Abbildung{" "}
        <M>{"f(\\bb) = \\bA\\pinv\\bb"}</M>, und wir fragen: Wie stark ändert
        sich <M>{"f(\\bb)"}</M> relativ, wenn wir <M>{"\\bb"}</M> durch ein
        gestörtes <M>{"\\tilde{\\bb}"}</M> ersetzen?
      </p>

      <EnvBlock kind="Satz" label="7.2.3">
        <p>
          Sei <M>{"\\bA \\in \\R^{m \\times n}"}</M> fix mit{" "}
          <M>{"\\rang(\\bA) = n"}</M>, und sei <M>{"f"}</M> das Problem mit
          Lösung <M>{"f(\\bb) = \\bA\\pinv\\bb"}</M>. Dann gilt
        </p>
        <MD>
          {"\\frac{\\left\\|f(\\tilde{\\bb}) - f(\\bb)\\right\\|}{\\left\\|f(\\bb)\\right\\|} \\le \\kappa\\, \\frac{\\left\\|\\cblue{\\tilde{\\bb} - \\bb}\\right\\|}{\\left\\|\\bb\\right\\|} \\quad \\text{mit} \\quad \\kappa = \\corange{\\kappa_2(\\bA)}\\, \\frac{\\left\\|\\bb\\right\\|}{\\left\\|\\cgreen{\\proj_{\\col(\\bA)} \\bb}\\right\\|}."}
        </MD>
      </EnvBlock>

      <p>
        Die Konditionszahl des Problems ist also <em>nicht</em> einfach{" "}
        <M>{"\\corange{\\kappa_2(\\bA)}"}</M>: Es kommt ein zweiter Faktor
        hinzu, der misst, wie viel von <M>{"\\bb"}</M> überhaupt im
        Spaltenraum (<ConceptLink id="image">Bild</ConceptLink>){" "}
        <M>{"\\col(\\bA)"}</M> liegt. Der Beweis ist eine kurze Kette von
        Normabschätzungen; wir verfolgen die Störung{" "}
        <M>{"\\cblue{\\tilde{\\bb} - \\bb}"}</M> in Blau und die Projektion{" "}
        <M>{"\\cgreen{\\proj_{\\col(\\bA)} \\bb}"}</M> in Grün.
      </p>

      <Proof>
        <PStep
          why={
            <>
              <M>{"\\bA\\pinv"}</M> ist eine Matrix, die Abbildung{" "}
              <M>{"\\bb \\mapsto \\bA\\pinv\\bb"}</M> also linear
            </>
          }
        >
          <MD>
            {"\\frac{\\left\\|\\bA\\pinv\\tilde{\\bb} - \\bA\\pinv\\bb\\right\\|}{\\left\\|\\bA\\pinv\\bb\\right\\|} = \\frac{\\left\\|\\bA\\pinv(\\cblue{\\tilde{\\bb} - \\bb})\\right\\|}{\\left\\|\\bA\\pinv\\bb\\right\\|}"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Submultiplikativität der natürlichen{" "}
              <ConceptLink id="matrix-norm">Matrixnorm</ConceptLink>:{" "}
              <M>{"\\left\\|\\bA\\pinv\\bv\\right\\| \\le \\left\\|\\bA\\pinv\\right\\| \\left\\|\\bv\\right\\|"}</M>
            </>
          }
        >
          <MD>
            {"\\le \\frac{\\left\\|\\bA\\pinv\\right\\| \\left\\|\\cblue{\\tilde{\\bb} - \\bb}\\right\\|}{\\left\\|\\bA\\pinv\\bb\\right\\|}"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              Definition 7.2.1:{" "}
              <M>{"\\corange{\\kappa_2(\\bA)} = \\left\\|\\bA\\right\\| \\left\\|\\bA\\pinv\\right\\|"}</M>
              , also{" "}
              <M>{"\\left\\|\\bA\\pinv\\right\\| = \\corange{\\kappa_2(\\bA)} / \\left\\|\\bA\\right\\|"}</M>
            </>
          }
        >
          <MD>
            {"= \\frac{\\corange{\\kappa_2(\\bA)}}{\\left\\|\\bA\\right\\| \\left\\|\\bA\\pinv\\bb\\right\\|}\\, \\left\\|\\cblue{\\tilde{\\bb} - \\bb}\\right\\|"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              nochmals Submultiplikativität:{" "}
              <M>{"\\left\\|\\bA\\bA\\pinv\\bb\\right\\| \\le \\left\\|\\bA\\right\\| \\left\\|\\bA\\pinv\\bb\\right\\|"}</M>{" "}
              — wir verkleinern den Nenner, der Bruch kann nur wachsen
            </>
          }
        >
          <MD>
            {"\\le \\frac{\\corange{\\kappa_2(\\bA)}}{\\left\\|\\bA\\bA\\pinv\\bb\\right\\|}\\, \\left\\|\\cblue{\\tilde{\\bb} - \\bb}\\right\\|"}
          </MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\bA\\bA\\pinv\\bb = \\bA\\wh{\\bx} = \\cgreen{\\proj_{\\col(\\bA)} \\bb}"}</M>
              : Die KQ-Lösung ist die orthogonale{" "}
              <ConceptLink id="projection">Projektion</ConceptLink> von{" "}
              <M>{"\\bb"}</M> auf <M>{"\\col(\\bA)"}</M> (
              <a className="underline" href="#sec-7.1">Abschnitt 7.1</a>); anschließend erweitern wir
              mit <M>{"\\left\\|\\bb\\right\\|"}</M>
            </>
          }
        >
          <MD>
            {"= \\corange{\\kappa_2(\\bA)}\\, \\frac{\\left\\|\\bb\\right\\|}{\\left\\|\\cgreen{\\proj_{\\col(\\bA)} \\bb}\\right\\|} \\cdot \\frac{\\left\\|\\cblue{\\tilde{\\bb} - \\bb}\\right\\|}{\\left\\|\\bb\\right\\|}"}
          </MD>
        </PStep>
      </Proof>

      <h4 className="mt-4 font-semibold">Geometrische Interpretation</h4>

      <FigKQGeometrie />

      <p>
        Der Faktor{" "}
        <M>{"\\left\\|\\bb\\right\\| / \\left\\|\\cgreen{\\proj_{\\col(\\bA)} \\bb}\\right\\|"}</M>{" "}
        hat eine anschauliche Bedeutung. Erinnern wir uns an den Satz des
        Pythagoras: <M>{"\\bb"}</M> zerlegt sich orthogonal in seinen Anteil
        im Spaltenraum und seinen Anteil im{" "}
        <ConceptLink id="orthogonal-complement">orthogonalen Komplement</ConceptLink>,
      </p>
      <MD>
        {"\\left\\|\\bb\\right\\|^2 = \\left\\|\\cgreen{\\proj_{\\col(\\bA)} \\bb}\\right\\|^2 + \\left\\|\\proj_{\\col(\\bA)^\\perp} \\bb\\right\\|^2 \\ge \\left\\|\\cgreen{\\proj_{\\col(\\bA)} \\bb}\\right\\|^2,"}
      </MD>
      <p>
        also ist der Faktor stets <M>{"\\ge 1"}</M> und damit{" "}
        <M>{"\\kappa \\ge \\corange{\\kappa_2(\\bA)}"}</M>. Bezeichnet{" "}
        <M>{"\\theta"}</M> den Winkel zwischen <M>{"\\bb"}</M> und{" "}
        <M>{"\\col(\\bA)"}</M> (siehe Abbildung), dann ist{" "}
        <M>{"\\left\\|\\cgreen{\\proj_{\\col(\\bA)} \\bb}\\right\\| = \\cos(\\theta) \\left\\|\\bb\\right\\|"}</M>{" "}
        und damit
      </p>
      <MD>{"\\kappa = \\frac{\\corange{\\kappa_2(\\bA)}}{\\cos(\\theta)}."}</MD>
      <p>Was sind nun best und worst case für <M>{"\\kappa"}</M>?</p>
      <ul className="max-w-prose list-disc space-y-2 pl-6">
        <li>
          <strong>Best case:</strong>{" "}
          <M>{"\\bb = \\cgreen{\\proj_{\\col(\\bA)} \\bb}"}</M>, d.&thinsp;h.{" "}
          <M>{"\\bb \\in \\col(\\bA)"}</M> und <M>{"\\theta = 0"}</M>. Dann ist{" "}
          <M>{"\\kappa = \\corange{\\kappa_2(\\bA)}"}</M> — besser geht es
          nicht.
        </li>
        <li>
          <strong>Worst case:</strong>{" "}
          <M>{"\\cgreen{\\proj_{\\col(\\bA)} \\bb} = \\bnull"}</M>, d.&thinsp;h.{" "}
          <M>{"\\bb \\perp \\col(\\bA)"}</M> und <M>{"\\theta = 90^\\circ"}</M>. Dann
          ist <M>{"\\kappa = \\infty"}</M>. Warum? Weil dann{" "}
          <M>{"\\wh{\\bx} = \\bA\\pinv\\bb = \\bnull"}</M> gilt: Schon eine
          winzige Störung mit Anteil in <M>{"\\col(\\bA)"}</M> erzeugt einen
          beliebig großen <em>relativen</em> Fehler in der Lösung.
        </li>
      </ul>
      <p>
        Für die Regression heißt das: Je weniger die Daten <M>{"\\bb"}</M> vom
        Spaltenraum der Designmatrix erklärt werden — je schlechter also der
        Fit —, desto schlechter konditioniert ist die Bestimmung der
        Koeffizienten. Und zwar unabhängig davon, wie gut <M>{"\\bA"}</M>{" "}
        selbst konditioniert ist.
      </p>

      <ExpandedReading title="Störungen von b interaktiv">
        <p className="mb-3 text-sm">
          Das einfachste nichttriviale KQ-Problem: <M>{"m = 2"}</M>,{" "}
          <M>{"n = 1"}</M>, <M>{"\\bA = (1, 0)^\\top"}</M>, also{" "}
          <M>{"\\kappa_2(\\bA) = 1"}</M> und <M>{"\\col(\\bA)"}</M> gleich der
          horizontalen Achse. Verstellen Sie den Winkel θ und die Störung Δb —
          und beobachten Sie, wann die Schranke aus Satz 7.2.3 tatsächlich
          angenommen wird.
        </p>
        <WinkelWidget />
      </ExpandedReading>

      <h3 className="mt-6 text-lg font-semibold">
        Kondition bezüglich <M>{"\\bA"}</M>
      </h3>

      <p>
        Nun der umgekehrte Fall: <M>{"\\bb"}</M> ist fix, aber die Matrix{" "}
        <M>{"\\bA"}</M> selbst ist gestört. Auch das ist praktisch relevant —
        etwa durch Messfehler in den Kovariablen oder durch Rundungsfehler,
        die beim Speichern von <M>{"\\bA"}</M> und in den Zwischenschritten
        der Algorithmen zwangsläufig entstehen. Das Problem ist jetzt die
        Abbildung <M>{"f(\\bA) = \\bA\\pinv\\bb"}</M>. Das Ergebnis sieht auf
        den ersten Blick ähnlich aus wie Satz 7.2.3, hat aber eine
        entscheidend andere Struktur:
      </p>

      <EnvBlock kind="Satz" label="7.2.4">
        <p>
          Sei <M>{"\\bb \\in \\R^m"}</M> fix und <M>{"f"}</M> das Problem mit
          Lösung <M>{"f(\\bA) = \\bA\\pinv\\bb"}</M>. Dann gilt
        </p>
        <MD>
          {"\\frac{\\left\\|f(\\tilde{\\bA}) - f(\\bA)\\right\\|}{\\left\\|f(\\bA)\\right\\|} \\le \\kappa\\, \\frac{\\left\\|\\cblue{\\tilde{\\bA} - \\bA}\\right\\|}{\\left\\|\\bA\\right\\|} \\quad \\text{mit} \\quad \\kappa = \\corange{\\kappa_2(\\bA)} + \\corange{\\kappa_2(\\bA)}^2\\, \\frac{\\left\\|\\cpurp{\\br}\\right\\|}{\\left\\|\\cgreen{\\proj_{\\col(\\bA)} \\bb}\\right\\|},"}
        </MD>
        <p>
          wobei <M>{"\\cpurp{\\br} = \\bb - \\bA\\wh{\\bx}"}</M> das Residuum
          des ungestörten Problems bezeichnet.
        </p>
      </EnvBlock>

      <EnvBlock kind="Bemerkung" label="7.2.5">
        <p>
          Der Beweis ist — anders als der von Satz 7.2.3 — eine sehr
          aufwändige und, offen gesagt, langweilige Rechnung. Wir verzichten
          darauf und verweisen auf die Literatur (vgl. Heath §3.3).
        </p>
      </EnvBlock>

      <h4 className="mt-4 font-semibold">Interpretation</h4>

      <p>
        Der erste Summand <M>{"\\corange{\\kappa_2(\\bA)}"}</M> ist vertraut.
        Neu ist der zweite: Er koppelt das <em>Quadrat</em> der Konditionszahl
        an das Verhältnis von Residuum zu Projektion. Mit dem Winkel{" "}
        <M>{"\\theta"}</M> von oben ist{" "}
        <M>{"\\left\\|\\cpurp{\\br}\\right\\| = \\sin(\\theta) \\left\\|\\bb\\right\\|"}</M>{" "}
        — das Residuum ist gerade die zu <M>{"\\col(\\bA)"}</M>{" "}
        <ConceptLink id="orthogonality">orthogonale</ConceptLink> Komponente
        von <M>{"\\bb"}</M> —, also
      </p>
      <MD>
        {"\\kappa = \\corange{\\kappa_2(\\bA)} + \\corange{\\kappa_2(\\bA)}^2 \\tan(\\theta)."}
      </MD>
      <ul className="max-w-prose list-disc space-y-2 pl-6">
        <li>
          <strong>Best case:</strong> <M>{"\\cpurp{\\br} = \\bnull"}</M>,
          d.&thinsp;h. <M>{"\\bA\\bx = \\bb"}</M> ist exakt lösbar. Dann ist{" "}
          <M>{"\\kappa = \\corange{\\kappa_2(\\bA)}"}</M> — wie bei einem
          gewöhnlichen{" "}
          <ConceptLink id="linear-system">linearen Gleichungssystem</ConceptLink>.
        </li>
        <li>
          <strong>Worst case:</strong>{" "}
          <M>{"\\cgreen{\\proj_{\\col(\\bA)} \\bb} = \\bnull"}</M>, aber{" "}
          <M>{"\\cpurp{\\br} \\ne \\bnull"}</M>: Dann ist{" "}
          <M>{"\\bA\\bx = \\bb"}</M> nicht lösbar,{" "}
          <M>{"\\bb \\perp \\col(\\bA)"}</M>, und es gilt{" "}
          <M>{"\\kappa = \\infty"}</M>.
        </li>
        <li>
          <strong>Normalfall:</strong> <M>{"\\cpurp{\\br} \\ne \\bnull"}</M>{" "}
          und <M>{"\\cgreen{\\proj_{\\col(\\bA)} \\bb} \\ne \\bnull"}</M>. Dann
          ist <M>{"\\kappa = O\\left(\\corange{\\kappa_2(\\bA)}^2\\right)"}</M>:
          Die Konditionszahl geht <em>quadratisch</em> ein!
        </li>
      </ul>
      <p>
        Vorsicht also: Sobald das Residuum nicht verschwindet — und in der
        Statistik verschwindet es praktisch nie —, kann eine Störung von{" "}
        <M>{"\\bA"}</M> mit dem Quadrat der Konditionszahl verstärkt werden.
        Dieses Quadrat wird uns in <a className="underline" href="#sec-7.3">Abschnitt 7.3</a> gleich
        wieder begegnen: Der Lösungsweg über die Normalengleichungen handelt es
        sich <em>immer</em> ein, also auch im gutartigen Fall kleiner
        Residuen, in dem das Problem selbst nur mit{" "}
        <M>{"\\corange{\\kappa_2(\\bA)}"}</M> reagiert.
      </p>

      <ExpandedReading title="Die quadrierte Kondition im Experiment">
        <p className="mb-2 text-sm">
          Wir stören eine konkrete Problemfamilie mit einstellbarem{" "}
          <M>{"\\eps"}</M>:
        </p>
        <MD>
          {"\\bA = \\begin{pmatrix} 1 & 1 \\\\ \\eps & -\\eps \\\\ 0 & 0 \\end{pmatrix}, \\quad \\tilde{\\bA} = \\bA + \\cblue{\\bE} \\text{ mit } \\cblue{\\bE} = \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\\\ -\\eps & \\eps \\end{pmatrix}, \\quad \\bb = \\begin{pmatrix} 1 \\\\ 0 \\\\ b_3 \\end{pmatrix}."}
        </MD>
        <p className="mb-3 text-sm">
          Hier ist <M>{"\\kappa_2(\\bA) = 1/\\eps"}</M>, und die relative
          Störung ist{" "}
          <M>{"\\left\\|\\cblue{\\bE}\\right\\|_2 / \\left\\|\\bA\\right\\|_2 = \\eps"}</M>.
          Die ungestörte Lösung ist stets{" "}
          <M>{"\\wh{\\bx} = (1/2,\\, 1/2)^\\top"}</M> — unabhängig von{" "}
          <M>{"\\eps"}</M> und <M>{"b_3"}</M>. Der Regler für{" "}
          <M>{"b_3"}</M> steuert die Größe des Residuums und schaltet damit
          zwischen den beiden Regimen von Satz 7.2.4 um.
        </p>
        <KonditionsQuadrierungLab />
      </ExpandedReading>

      <p>
        <em>Vertiefung:</em> Heath §3.1–3.3 — insbesondere §3.3 („Sensitivity
        and Conditioning") mit der vollständigen Störungsanalyse inklusive des
        Beweises von Satz 7.2.4; zum KQ-Problem als Optimierungsproblem und
        seiner Rolle in der Regression außerdem MML §7.1 und §9.2.
      </p>
    </div>
  );
}
