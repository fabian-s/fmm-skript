import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S73KreuzproduktWidget } from "./widgets/S73KreuzproduktWidget";
import { S73NormerhaltungWidget } from "./widgets/S73NormerhaltungWidget";

/**
 * Abschnitt 7.3 — Normalengleichungen und Cholesky-Zerlegung.
 * Quelle: Folien 07-kq.Rmd, Block „Lösungsverfahren" (Frage-Folien,
 * Cholesky-Zerlegung, Alternative Lösungswege). Prosa eigenständig aus den
 * Folien formuliert; Widget-Code aus der internen heath-ch3-App recycelt.
 */
export function S73() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 07-kq, „Lösungsverfahren".
      </p>
      <p>
        Aus <a className="underline" href="#sec-7.1">Abschnitt 7.1</a> wissen wir, dass das{" "}
        <ConceptLink id="linear-least-squares">Kleinste-Quadrate-Problem</ConceptLink> für{" "}
        <M>{"\\bA \\in \\R^{m \\times n}"}</M> mit <M>{"\\rang(\\bA) = n"}</M> die eindeutige
        Lösung <M>{"\\wh{\\bx} = (\\bA^\\top\\bA)^{-1}\\bA^\\top\\bb"}</M> besitzt. Das ist eine
        Formel — aber noch kein Rechenverfahren. In diesem Abschnitt entwickeln wir das erste und
        einfachste Lösungsverfahren: Wir leiten die Normalengleichungen her, lösen sie mit der{" "}
        <ConceptLink id="cholesky-factorization">Cholesky-Zerlegung</ConceptLink> und sehen dann,
        warum dieser bequeme Weg numerisch seinen Preis hat. Das motiviert am Ende des Abschnitts
        die orthogonalen Transformationen, die uns im Rest des Kapitels beschäftigen werden.
      </p>

      <h3 id="sec-7.3.1" className="mb-2 mt-8 text-xl font-semibold">
        7.3.1 Die Normalengleichungen
      </h3>
      <p>
        Beginnen wir mit der Herleitung. Die{" "}
        <ConceptLink id="normal-equations">Normalengleichungen</ConceptLink> haben wir in{" "}
        <a className="underline" href="#sec-7.1">Abschnitt 7.1</a> bereits benutzt; jetzt zeigen
        wir, warum sie das KQ-Problem charakterisieren. Die Idee ist rein analytisch: Die
        Zielfunktion ist eine nach oben geöffnete{" "}
        <ConceptLink id="quadratic-form">quadratische Form</ConceptLink> in <M>{"\\bx"}</M>, also
        finden wir ihr Minimum, indem wir den{" "}
        <ConceptLink id="gradient">Gradienten</ConceptLink> null setzen.
      </p>
      <EnvBlock kind="Satz" label="7.3.1 (Normalengleichungen)">
        <p>
          Sei <M>{"\\bA \\in \\R^{m \\times n}"}</M> und <M>{"\\bb \\in \\R^m"}</M>. Ein Vektor{" "}
          <M>{"\\wh{\\bx} \\in \\R^n"}</M> minimiert{" "}
          <M>{"g(\\bx) = \\left\\| \\bA\\bx - \\bb \\right\\|_2^2"}</M> genau dann, wenn er die{" "}
          <em>Normalengleichungen</em>
        </p>
        <MD>{"\\cbred{\\bA^\\top\\bA}\\,\\wh{\\bx} = \\cgreen{\\bA^\\top\\bb}"}</MD>
        <p>erfüllt.</p>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              Skalarprodukt ausmultiplizieren; <M>{"(\\bA\\bx)^\\top\\bb = \\bx^\\top\\bA^\\top\\bb"}</M>{" "}
              (<ConceptLink id="transpose">Transponierregeln</ConceptLink>)
            </>
          }
        >
          <MD>{"g(\\bx) = (\\bA\\bx - \\bb)^\\top(\\bA\\bx - \\bb) = \\bx^\\top\\cbred{\\bA^\\top\\bA}\\,\\bx - 2\\,\\bx^\\top\\cgreen{\\bA^\\top\\bb} + \\bb^\\top\\bb"}</MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\nabla_{\\bx}\\left(\\bx^\\top\\bM\\bx\\right) = 2\\bM\\bx"}</M> für
              symmetrisches <M>{"\\bM"}</M> und{" "}
              <M>{"\\nabla_{\\bx}\\left(\\bx^\\top\\bc\\right) = \\bc"}</M>;{" "}
              <M>{"\\cbred{\\bA^\\top\\bA}"}</M> ist symmetrisch
            </>
          }
        >
          <MD>{"\\nabla g(\\bx) = 2\\,\\cbred{\\bA^\\top\\bA}\\,\\bx - 2\\,\\cgreen{\\bA^\\top\\bb}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              notwendige Bedingung erster Ordnung für ein Minimum der differenzierbaren Funktion{" "}
              <M>{"g"}</M>
            </>
          }
        >
          <MD>{"\\nabla g(\\wh{\\bx}) = \\bnull \\quequiv \\cbred{\\bA^\\top\\bA}\\,\\wh{\\bx} = \\cgreen{\\bA^\\top\\bb}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Hessematrix <M>{"\\nabla^2 g = 2\\,\\cbred{\\bA^\\top\\bA}"}</M> ist positiv
              semidefinit, also ist <M>{"g"}</M>{" "}
              <ConceptLink id="convex-function">konvex</ConceptLink> und jeder stationäre Punkt
              ein globales Minimum
            </>
          }
        >
          <p>
            Die Bedingung ist auch hinreichend: Jede Lösung der Normalengleichungen ist ein globales
            Minimum von <M>{"g"}</M>.
          </p>
        </PStep>
      </Proof>
      <EnvBlock kind="Bemerkung" label="7.3.2 (Geometrische Deutung)">
        <p>
          Schreiben wir die Normalengleichungen als{" "}
          <M>{"\\bA^\\top(\\bb - \\bA\\wh{\\bx}) = \\bA^\\top\\wh{\\br} = \\bnull"}</M>, so sagen
          sie: Das Residuum <M>{"\\wh{\\br} = \\bb - \\bA\\wh{\\bx}"}</M> steht{" "}
          <ConceptLink id="orthogonality">senkrecht</ConceptLink> auf allen Spalten von{" "}
          <M>{"\\bA"}</M>. Das ist genau die{" "}
          <ConceptLink id="projection">Projektions</ConceptLink>-Sicht aus{" "}
          <a className="underline" href="#sec-7.1">Abschnitt 7.1</a>: <M>{"\\bA\\wh{\\bx}"}</M>{" "}
          ist der Punkt in <M>{"\\col(\\bA)"}</M>, der <M>{"\\bb"}</M> am nächsten liegt — daher
          der Name <em>Normal</em>gleichungen.
        </p>
      </EnvBlock>

      <h3 id="sec-7.3.2" className="mb-2 mt-8 text-xl font-semibold">
        7.3.2 Warum wir niemals invertieren
      </h3>
      <p>
        Wie berechnen wir <M>{"\\wh{\\bx}"}</M> nun konkret? Betrachten wir dazu eine kleine
        Programmieraufgabe von den Folien. Gegeben ist eine R-Funktion, die die Lösungsformel{" "}
        <M>{"\\wh{\\bx} = (\\bA^\\top\\bA)^{-1}\\bA^\\top\\bb"}</M> wörtlich umsetzt — sie
        bildet also erst die <ConceptLink id="matrix-inverse">Inverse</ConceptLink> von{" "}
        <M>{"\\bA^\\top\\bA"}</M> und multipliziert dann:
      </p>
      <pre className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-sm dark:bg-slate-900/60">
        <code>{"kq_solve <- function(A, b) {\n  solve(t(A) %*% A) %*% t(A) %*% b\n}"}</code>
      </pre>
      <p>
        <em>Aufgabe: Finde den Fehler in der Funktion.</em> Der Fehler ist kein Tippfehler,
        sondern der Ansatz selbst:
      </p>
      <EnvBlock kind="Bemerkung" label="7.3.3 (Merkregel)">
        <p className="font-semibold text-rose-600 dark:text-rose-400">
          Invertiere niemals eine Matrix!
        </p>
        <p>
          Die Formel <M>{"\\wh{\\bx} = (\\bA^\\top\\bA)^{-1}\\bA^\\top\\bb"}</M> ist ein{" "}
          <em>mathematisches</em> Objekt, keine Rechenvorschrift. Numerisch lösen wir stattdessen
          das lineare Gleichungssystem{" "}
          <M>{"(\\bA^\\top\\bA)\\,\\wh{\\bx} = \\bA^\\top\\bb"}</M> — mit einer geeigneten
          Zerlegung der Matrix.
        </p>
      </EnvBlock>
      <p>
        Warum ist das explizite Invertieren so schlecht? Erstens ist es teurer: Die Inverse zu
        berechnen heißt, <M>{"n"}</M> lineare Gleichungssysteme zu lösen (eines pro Spalte von{" "}
        <M>{"\\bI"}</M>), obwohl wir nur die Lösung zu <em>einer</em> rechten Seite brauchen.
        Zweitens ist es ungenauer: Jeder Eintrag der berechneten Inversen trägt eigene{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink>, die sich bei der
        anschließenden Multiplikation weiter verstärken — eine Zerlegung mit Substitution löst
        dasselbe System direkter und stabiler. Und drittens zerstört die Inverse Struktur:
        Die Inverse einer{" "}
        <ConceptLink id="sparse-matrix">dünnbesetzten</ConceptLink> Matrix ist typischerweise
        voll besetzt. Genau wie beim{" "}
        <ConceptLink id="gaussian-elimination">Gauß-Verfahren</ConceptLink> mit seiner{" "}
        <ConceptLink id="lu-decomposition">LR-Zerlegung</ConceptLink> gilt also: Zerlegen und
        substituieren statt invertieren.
      </p>

      <h3 id="sec-7.3.3" className="mb-2 mt-8 text-xl font-semibold">
        7.3.3 Das Cholesky-Verfahren
      </h3>
      <p>
        Welche Zerlegung passt zu <M>{"\\bA^\\top\\bA"}</M>? Die Matrix hat eine besondere
        Struktur, die wir ausnutzen können:
      </p>
      <EnvBlock kind="Lemma" label="7.3.4">
        <p>
          Sei <M>{"\\bA \\in \\R^{m \\times n}"}</M> mit <M>{"\\rang(\\bA) = n"}</M>. Dann ist{" "}
          <M>{"\\bA^\\top\\bA \\in \\R^{n \\times n}"}</M>{" "}
          <ConceptLink id="symmetric-matrix">symmetrisch</ConceptLink> und{" "}
          <ConceptLink id="positive-definite">positiv definit</ConceptLink>.
        </p>
      </EnvBlock>
      <Proof>
        <PStep why={<>Rechenregeln fürs Transponieren: <M>{"(\\bB\\bC)^\\top = \\bC^\\top\\bB^\\top"}</M></>}>
          <MD>{"(\\bA^\\top\\bA)^\\top = \\bA^\\top(\\bA^\\top)^\\top = \\bA^\\top\\bA"}</MD>
        </PStep>
        <PStep why={<>Definition der <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink></>}>
          <MD>{"\\bx^\\top(\\bA^\\top\\bA)\\bx = (\\bA\\bx)^\\top(\\bA\\bx) = \\left\\| \\bA\\bx \\right\\|_2^2 \\ge 0 \\quad \\text{für alle } \\bx \\in \\R^n"}</MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\rang(\\bA) = n"}</M>: Die Spalten von <M>{"\\bA"}</M> sind linear
              unabhängig, der <ConceptLink id="kernel">Kern</ConceptLink> ist also trivial
            </>
          }
        >
          <MD>{"\\left\\| \\bA\\bx \\right\\|_2^2 = 0 \\quequiv \\bA\\bx = \\bnull \\quequiv \\bx = \\bnull"}</MD>
        </PStep>
      </Proof>
      <p>
        Symmetrisch positiv definit — das ist genau die Klasse von Matrizen, für die die{" "}
        <ConceptLink id="cholesky-factorization">Cholesky-Zerlegung</ConceptLink>{" "}
        <M>{"\\bM = \\bL\\bL^\\top"}</M> mit einer unteren{" "}
        <ConceptLink id="triangular-matrix">Dreiecksmatrix</ConceptLink> <M>{"\\bL"}</M>{" "}
        existiert. Damit zerfällt das KQ-Problem in eine Kette einfacher Teilschritte:
      </p>
      <EnvBlock kind="Algorithmus" label="7.3.5 (Cholesky-Verfahren für das KQ-Problem)">
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Berechne <M>{"\\cbred{\\bM} = \\bA^\\top\\bA"}</M> und{" "}
            <M>{"\\cbgreen{\\bc} = \\bA^\\top\\bb"}</M>.
          </li>
          <li>
            Berechne die Cholesky-Zerlegung <M>{"\\cbred{\\bM} = \\cborange{\\bL}\\cborange{\\bL}^\\top"}</M>.
          </li>
          <li>
            Löse <M>{"\\cborange{\\bL}\\,\\cbpurp{\\by} = \\cbgreen{\\bc}"}</M> durch{" "}
            <ConceptLink id="triangular-solve">Vorwärtssubstitution</ConceptLink>.
          </li>
          <li>
            Löse <M>{"\\cborange{\\bL}^\\top\\cblue{\\wh{\\bx}} = \\cbpurp{\\by}"}</M> durch
            Rückwärtssubstitution.
          </li>
        </ol>
      </EnvBlock>
      <p>
        Schritt 1 ersetzt das <M>{"m \\times n"}</M>-Ausgangsproblem durch ein quadratisches{" "}
        <M>{"n \\times n"}</M>-Gleichungssystem. Die Schritte 2–4 lösen dieses System dann so,
        wie wir es von der LR-Zerlegung kennen: zerlegen, dann zweimal substituieren — denn
        Dreieckssysteme können wir direkt auflösen. Rechnen wir das einmal vollständig durch.
      </p>
      <EnvBlock kind="Beispiel" label="7.3.6">
        <p>
          Wie im Wohnungspreis-Beispiel 7.1.8 aus{" "}
          <a className="underline" href="#sec-7.1">Abschnitt 7.1</a> fitten wir eine{" "}
          <ConceptLink id="linear-regression">Regressionsgerade</ConceptLink>{" "}
          <M>{"y = \\beta_0 + \\beta_1 x"}</M> — diesmal mit bewusst kleinen Zahlen, durch die
          drei Punkte <M>{"(1, 2),\\ (2, 3),\\ (3, 5)"}</M>:
        </p>
        <MD>{"\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{pmatrix}, \\qquad \\bb = \\begin{pmatrix} 2 \\\\ 3 \\\\ 5 \\end{pmatrix}."}</MD>
        <p>
          <strong>Schritt 1</strong> — <M>{"\\cbred{\\bM}"}</M> und <M>{"\\cbgreen{\\bc}"}</M>{" "}
          aufstellen:
        </p>
        <MD>{"\\cbred{\\bM} = \\bA^\\top\\bA = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\end{pmatrix} \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{pmatrix} = \\cbred{\\begin{pmatrix} 3 & 6 \\\\ 6 & 14 \\end{pmatrix}}, \\qquad \\cbgreen{\\bc} = \\bA^\\top\\bb = \\cbgreen{\\begin{pmatrix} 10 \\\\ 23 \\end{pmatrix}}."}</MD>
        <p>
          <strong>Schritt 2</strong> — Cholesky-Zerlegung{" "}
          <M>{"\\cbred{\\bM} = \\cborange{\\bL}\\cborange{\\bL}^\\top"}</M>. Für{" "}
          <M>{"2 \\times 2"}</M> lauten die Formeln{" "}
          <M>{"\\corange{\\ell_{11}} = \\sqrt{\\cred{m_{11}}}"}</M>,{" "}
          <M>{"\\corange{\\ell_{21}} = \\cred{m_{21}}/\\corange{\\ell_{11}}"}</M>,{" "}
          <M>{"\\corange{\\ell_{22}} = \\sqrt{\\cred{m_{22}} - \\corange{\\ell_{21}}^2}"}</M>:
        </p>
        <MD>{"\\corange{\\ell_{11}} = \\sqrt{\\cred{3}}, \\qquad \\corange{\\ell_{21}} = \\frac{\\cred{6}}{\\sqrt{3}} = 2\\sqrt{3}, \\qquad \\corange{\\ell_{22}} = \\sqrt{\\cred{14} - \\left(2\\sqrt{3}\\right)^2} = \\sqrt{2},"}</MD>
        <MD>{"\\text{also} \\quad \\cborange{\\bL} = \\cborange{\\begin{pmatrix} \\sqrt{3} & 0 \\\\ 2\\sqrt{3} & \\sqrt{2} \\end{pmatrix}}."}</MD>
        <p>
          <strong>Schritt 3</strong> — Vorwärtssubstitution{" "}
          <M>{"\\cborange{\\bL}\\,\\cbpurp{\\by} = \\cbgreen{\\bc}"}</M>, Zeile für Zeile von
          oben:
        </p>
        <MD>{"\\cpurp{y_1} = \\frac{\\cgreen{10}}{\\corange{\\sqrt{3}}} = \\frac{10}{\\sqrt{3}}, \\qquad \\cpurp{y_2} = \\frac{\\cgreen{23} - \\corange{2\\sqrt{3}} \\cdot \\cpurp{\\tfrac{10}{\\sqrt{3}}}}{\\corange{\\sqrt{2}}} = \\frac{23 - 20}{\\sqrt{2}} = \\frac{3}{\\sqrt{2}}."}</MD>
        <p>
          <strong>Schritt 4</strong> — Rückwärtssubstitution{" "}
          <M>{"\\cborange{\\bL}^\\top\\cblue{\\wh{\\bx}} = \\cbpurp{\\by}"}</M>, Zeile für Zeile
          von unten:
        </p>
        <MD>{"\\cblue{x_2} = \\frac{\\cpurp{3/\\sqrt{2}}}{\\corange{\\sqrt{2}}} = \\frac{3}{2}, \\qquad \\cblue{x_1} = \\frac{\\cpurp{\\tfrac{10}{\\sqrt{3}}} - \\corange{2\\sqrt{3}} \\cdot \\cblue{\\tfrac{3}{2}}}{\\corange{\\sqrt{3}}} = \\frac{10}{3} - 3 = \\frac{1}{3}."}</MD>
        <p>
          Die KQ-Lösung ist also{" "}
          <M>{"\\cblue{\\wh{\\bx}} = \\left(\\tfrac{1}{3}, \\tfrac{3}{2}\\right)^\\top"}</M>, die
          Regressionsgerade <M>{"\\wh{y} = \\tfrac{1}{3} + \\tfrac{3}{2}\\,x"}</M>. Probe mit den
          Normalengleichungen:
        </p>
        <MD>{"\\cbred{\\bM}\\,\\cblue{\\wh{\\bx}} = \\begin{pmatrix} 3 \\cdot \\tfrac{1}{3} + 6 \\cdot \\tfrac{3}{2} \\\\ 6 \\cdot \\tfrac{1}{3} + 14 \\cdot \\tfrac{3}{2} \\end{pmatrix} = \\begin{pmatrix} 10 \\\\ 23 \\end{pmatrix} = \\cbgreen{\\bc}. \\quad \\checkmark"}</MD>
        <p>
          Auch die geometrische Deutung aus Bemerkung 7.3.2 können wir nachprüfen: Das Residuum{" "}
          <M>{"\\wh{\\br} = \\bb - \\bA\\cblue{\\wh{\\bx}} = \\left(\\tfrac{1}{6}, -\\tfrac{1}{3}, \\tfrac{1}{6}\\right)^\\top"}</M>{" "}
          erfüllt <M>{"\\bA^\\top\\wh{\\br} = \\bnull"}</M> — es steht senkrecht auf beiden
          Spalten von <M>{"\\bA"}</M>.
        </p>
      </EnvBlock>

      <h3 id="sec-7.3.4" className="mb-2 mt-8 text-xl font-semibold">
        7.3.4 Effizient, aber möglicherweise instabil
      </h3>
      <p>
        Das Cholesky-Verfahren ist effizient: Ab Schritt 2 rechnen wir nur noch mit der kleinen{" "}
        <M>{"n \\times n"}</M>-Matrix <M>{"\\bA^\\top\\bA"}</M> statt mit der{" "}
        <M>{"m \\times n"}</M>-Matrix <M>{"\\bA"}</M>, und die Cholesky-Zerlegung nutzt deren
        Symmetrie aus — sie kostet nur etwa halb so viel wie eine LR-Zerlegung. Für gut
        konditionierte Probleme ist das Verfahren in der Praxis brauchbar. Es hat aber einen
        eingebauten Schwachpunkt, und der liegt ausgerechnet im allerersten Schritt.
      </p>
      <EnvBlock kind="Bemerkung" label="7.3.7 (Stabilität des Cholesky-Verfahrens)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Fehler, die beim Aufstellen von <M>{"\\bA^\\top\\bA"}</M> passieren, beeinflussen
            alle folgenden Schritte — kein späterer Schritt kann sie reparieren.
          </li>
          <li>
            Man kann zeigen: Der relative algorithmische Fehler ist bestenfalls{" "}
            <M>{"O\\!\\left(\\kappa_2(\\bA)^2\\right)"}</M>.
          </li>
          <li>
            Zum Vergleich: Die Best-Case-<ConceptLink id="condition-number">Kondition</ConceptLink>{" "}
            des KQ-Problems selbst ist <M>{"O\\!\\left(\\kappa_2(\\bA)\\right)"}</M> (
            <a className="underline" href="#sec-7.2">Abschnitt 7.2</a>).
          </li>
        </ul>
      </EnvBlock>
      <p>
        Woher kommt das Quadrat? Ab Schritt 2 rechnen wir mit <M>{"\\bA^\\top\\bA"}</M>, und
        deren Konditionszahl ist{" "}
        <M>{"\\kappa_2(\\bA^\\top\\bA) = \\kappa_2(\\bA)^2"}</M> — denn die Singulärwerte von{" "}
        <M>{"\\bA^\\top\\bA"}</M> sind die Quadrate der Singulärwerte von <M>{"\\bA"}</M>. Diese
        quadrierte Kondition erben alle weiteren Schritte, ganz gleich, wie empfindlich das
        eigentliche KQ-Problem ist. Besonders ärgerlich ist das im günstigsten Fall: Bei kleinem
        Residuum gilt <M>{"\\kappa \\approx \\kappa_2(\\bA)"}</M>, der Algorithmus verstärkt
        Fehler aber trotzdem mit <M>{"\\kappa_2(\\bA)^2"}</M> — er ist also deutlich
        fehleranfälliger, als die Kondition des Problems erzwingt. Genau solche Verfahren nennen
        wir <em>instabil</em>. Es gibt noch einen zweiten Effekt, den die Konditionszahl allein
        gar nicht erfasst: Schon beim Ausrechnen von <M>{"\\bA^\\top\\bA"}</M> in{" "}
        <ConceptLink id="floating-point">Gleitkommaarithmetik</ConceptLink> kann Information
        über die Spalten von <M>{"\\bA"}</M> verloren gehen — im Extremfall macht ein einziger
        Rundungsschritt aus einer Matrix mit vollem Spaltenrang eine numerisch singuläre.
      </p>
      <ExpandedReading title="Informationsverlust beim Bilden von AᵀA — live im Browser">
        <S73KreuzproduktWidget />
      </ExpandedReading>

      <h3 id="sec-7.3.5" className="mb-2 mt-8 text-xl font-semibold">
        7.3.5 Alternative Lösungswege: orthogonale Transformationen
      </h3>
      <p>
        Wir würden <M>{"\\bA^\\top\\bA"}</M> also gerne ganz vermeiden und direkt auf{" "}
        <M>{"\\bA"}</M> operieren. Erinnern wir uns an die Ausgangsform des Problems:
      </p>
      <MD>{"\\wh{\\bx} = \\argmin_{\\bx} \\left\\| \\bA\\bx - \\bb \\right\\|_2."}</MD>
      <p>
        Die Idee: Wir transformieren das Problem mit einer Matrix <M>{"\\bQ"}</M> zu einem
        „einfacheren" Problem <M>{"\\bQ\\bA\\bx \\approx \\bQ\\bb"}</M> — ohne die Lösung zu
        ändern. Wann ändert sich die Lösung nicht? Wenn die Zielfunktion für <em>jedes</em>{" "}
        <M>{"\\bx"}</M> denselben Wert behält, das Transformieren also alle Normen unangetastet
        lässt. Genau das leisten{" "}
        <ConceptLink id="orthogonal-matrix">Orthogonalmatrizen</ConceptLink>{" "}
        (<M>{"\\bQ^\\top\\bQ = \\bI"}</M>, ausführlich in{" "}
        <a className="underline" href="#sec-7.4">Abschnitt 7.4</a>), denn für diese gilt
      </p>
      <MD>{"\\left\\| \\bQ\\bA\\bx - \\bQ\\bb \\right\\|_2 = \\left\\| \\bQ(\\bA\\bx - \\bb) \\right\\|_2 = \\left\\| \\bA\\bx - \\bb \\right\\|_2."}</MD>
      <p>
        Die erste Gleichheit ist nur Ausklammern; die zweite ist die Norminvarianz:{" "}
        <M>{"\\left\\| \\bQ\\bv \\right\\|_2^2 = \\bv^\\top\\bQ^\\top\\bQ\\bv = \\bv^\\top\\bv = \\left\\| \\bv \\right\\|_2^2"}</M>{" "}
        für jeden Vektor <M>{"\\bv"}</M>. Jedes <M>{"\\bx"}</M> liefert im transformierten
        Problem also exakt denselben Zielfunktionswert wie im ursprünglichen — insbesondere
        stimmen die Minimierer überein.
      </p>
      <p>
        Vorsicht: Nicht jede Transformation, die ein System „einfacher" macht, ist hier erlaubt.
        Das <ConceptLink id="gaussian-elimination">Gauß-Verfahren</ConceptLink> etwa bringt{" "}
        <M>{"\\bA"}</M> zwar auf Dreiecksform, aber seine Eliminationsschritte sind Scherungen —
        sie verzerren Längen und würden den Minimierer verschieben. Für KQ-Probleme brauchen wir
        die norm-erhaltenden Transformationen:{" "}
        <ConceptLink id="rotation-matrix">Drehungen</ConceptLink> und{" "}
        <ConceptLink id="reflection">Spiegelungen</ConceptLink>. Wie wir mit ihnen{" "}
        <M>{"\\bQ\\bA"}</M> gezielt auf Dreiecksform bringen — die{" "}
        <em>QR-Zerlegung</em> —, ist das Thema der{" "}
        <a className="underline" href="#sec-7.4">nächsten Abschnitte</a>.
      </p>
      <ExpandedReading title="Drehungen und Spiegelungen erhalten Längen — Scherungen nicht">
        <S73NormerhaltungWidget />
      </ExpandedReading>

      <p className="italic">
        Vertiefung: Heath §3.4 (Normalengleichungen, Cholesky-Verfahren, orthogonale
        Transformationen); Heath §3.2 zur Herleitung; MML §7.1 für den Gradientenblick auf
        Optimierungsprobleme.
      </p>
    </div>
  );
}
