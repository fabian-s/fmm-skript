import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S32NormBallWidget } from "./widgets/S32NormBallWidget";
import { S32VecNormWidget } from "./widgets/S32VecNormWidget";

/**
 * Abschnitt 3.2 — Matrixnormen: Definition und Beispiele.
 * Quelle: Folien 03-matrix-spur-norm.Rmd, Block „Matrixnormen - Definition
 * und Beispiele". Prosa eigenständig aus den Folien formuliert; der
 * Einheitskugel-Widget-Code ist aus der internen heath-ch2-App recycelt.
 */
export function S32() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 03-matrix-spur-norm, „Matrixnormen – Definition und Beispiele".
      </p>
      <p>
        In <a className="underline" href="#sec-3.1">Abschnitt 3.1</a> haben wir mit der
        Frobenius-Norm bereits eine erste Möglichkeit kennengelernt, die „Größe" einer Matrix in
        einer einzigen Zahl zusammenzufassen. In diesem Abschnitt gehen wir das Thema
        grundsätzlicher an: Wir legen axiomatisch fest, was eine Matrixnorm überhaupt ist,
        konstruieren eine ganze Familie von Beispielen — und entdecken dann, dass diese
        naheliegenden Normen einen blinden Fleck haben. Das motiviert die Operatornormen des{" "}
        <a className="underline" href="#sec-3.3">nächsten Abschnitts</a>.
      </p>

      <h3 id="sec-3.2.1" className="mb-2 mt-8 text-xl font-semibold">
        3.2.1 Warum Matrixnormen?
      </h3>
      <p>
        Für Vektoren sind <ConceptLink id="norm">Normen</ConceptLink> unser wichtigstes
        Messinstrument: Sie machen aus einem Fehler<em>vektor</em> eine Fehler<em>größe</em>,
        mit der wir rechnen und argumentieren können. Genau dasselbe brauchen wir für Matrizen —
        aus vier konkreten Anlässen:
      </p>
      <ul className="max-w-prose list-disc space-y-1 pl-5">
        <li>
          die „Größe" einer Matrix messen — analog zur Länge eines Vektors;
        </li>
        <li>
          <em>Fehler</em> quantifizieren: Wie weit liegt eine mit{" "}
          <ConceptLink id="rounding-error">Rundungsfehlern</ConceptLink> gespeicherte oder
          näherungsweise berechnete Matrix von der exakten entfernt?
        </li>
        <li>
          <em>Konvergenz</em> von Algorithmen analysieren: Iterative Verfahren erzeugen Folgen
          von Matrizen oder Vektoren, und die Aussage „<M>{"\\bA_k \\to \\bA"}</M>" braucht ein
          Abstandsmaß (<ConceptLink id="convergence">Konvergenz</ConceptLink>);
        </li>
        <li>
          die <em>Konditionierung</em> von Problemen verstehen: Die{" "}
          <ConceptLink id="condition-number">Konditionszahl</ConceptLink> einer Matrix wird
          über Matrixnormen definiert.
        </li>
      </ul>
      <p>
        Frischen wir zunächst das Vorwissen auf. Für Vektoren kennen wir neben der{" "}
        <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink>{" "}
        <M>{"\\|\\bx\\|_2"}</M> die ganze Familie der <M>{"p"}</M>-Normen, und ihr
        „Aussehen" lässt sich am besten über ihre Einheitskugeln{" "}
        <M>{"\\{\\bx : \\|\\bx\\|_p = 1\\}"}</M> vergleichen: Raute, Kreis, Quadrat.
      </p>
      <ExpandedReading title="Auffrischung: die Einheitskugeln der p-Normen — interaktiv">
        <S32NormBallWidget />
      </ExpandedReading>

      <h3 id="sec-3.2.2" className="mb-2 mt-8 text-xl font-semibold">
        3.2.2 Die Axiome
      </h3>
      <p>
        Was macht eine Funktion auf Matrizen zu einer „Norm"? Dieselben drei Forderungen, die
        wir schon von Vektornormen kennen:
      </p>
      <EnvBlock kind="Definition" label="3.2.1 (Matrixnorm)">
        <p>
          Eine Funktion <M>{"\\|\\cdot\\| : \\R^{m \\times n} \\to [0, \\infty)"}</M> heißt{" "}
          <em>Matrixnorm</em>, wenn für alle <M>{"\\bA, \\bB \\in \\R^{m \\times n}"}</M> und{" "}
          <M>{"c \\in \\R"}</M> gilt:
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            <em>Definitheit</em>: <M>{"\\|\\bA\\| = 0 \\iff \\bA = \\bnull"}</M>
          </li>
          <li>
            <em>absolute Homogenität</em>: <M>{"\\|c\\bA\\| = |c| \\cdot \\|\\bA\\|"}</M>
          </li>
          <li>
            <em>Dreiecksungleichung</em>: <M>{"\\|\\bA + \\bB\\| \\le \\|\\bA\\| + \\|\\bB\\|"}</M>
          </li>
        </ol>
      </EnvBlock>
      <EnvBlock kind="Bemerkung" label="3.2.2">
        <p>
          Das sind exakt die Axiome einer Vektornorm — kein Zufall: Die Menge{" "}
          <M>{"\\R^{m \\times n}"}</M> ist ein{" "}
          <ConceptLink id="vector-space">Vektorraum</ConceptLink> (der Dimension{" "}
          <M>{"mn"}</M>), und eine Matrixnorm ist schlicht eine Norm auf diesem Raum.
          Umgekehrt ist jede Vektornorm eine Matrixnorm auf dem Raum{" "}
          <M>{"\\R^{n \\times 1}"}</M> der einspaltigen Matrizen. Was eine Matrixnorm über
          diese Grundaxiome hinaus leisten <em>sollte</em> — etwa gut mit dem Matrixprodukt
          zusammenzuspielen — untersuchen wir in{" "}
          <a className="underline" href="#sec-3.5">Abschnitt 3.5</a>.
        </p>
      </EnvBlock>

      <h3 id="sec-3.2.3" className="mb-2 mt-8 text-xl font-semibold">
        3.2.3 Matrixnormen durch Vektorisierung
      </h3>
      <p>
        Wie kommen wir am schnellsten an Matrixnormen? Mit einem einfachen Rezept: Wir rollen
        die Matrix zu einem langen Vektor aus und wenden darauf eine Vektornorm an, die wir
        schon kennen.
      </p>
      <EnvBlock kind="Definition" label="3.2.3 (Vektorisierung)">
        <p>
          Die <em>Vektorisierung</em> einer Matrix <M>{"\\bA \\in \\R^{m \\times n}"}</M>{" "}
          stapelt ihre Spalten zu einem Vektor der Länge <M>{"mn"}</M>:
        </p>
        <MD>{"\\vec(\\bA) = \\left(a_{11}, \\ldots, a_{m1},\\; a_{12}, \\ldots, a_{m2},\\; \\ldots,\\; a_{1n}, \\ldots, a_{mn}\\right)^\\top \\in \\R^{mn}."}</MD>
      </EnvBlock>
      <p>
        Dass dieses Rezept wirklich immer eine Matrixnorm liefert, ist einfach zu sehen — die
        Vektorisierung sortiert die Einträge ja nur um:
      </p>
      <EnvBlock kind="Satz" label="3.2.4">
        <p>
          Ist <M>{"\\|\\cdot\\|"}</M> eine Vektornorm auf <M>{"\\R^{mn}"}</M>, so ist
        </p>
        <MD>{"\\bA \\mapsto \\left\\| \\vec(\\bA) \\right\\|"}</MD>
        <p>
          eine Matrixnorm auf <M>{"\\R^{m \\times n}"}</M>.
        </p>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              <M>{"\\vec"}</M> sortiert die Einträge nur um: Jeder Eintrag von{" "}
              <M>{"\\bA"}</M> landet an genau einer Position des langen Vektors, Addition und
              Skalarmultiplikation wirken eintragsweise
            </>
          }
        >
          <p>
            Die Abbildung <M>{"\\vec : \\R^{m \\times n} \\to \\R^{mn}"}</M> ist{" "}
            <ConceptLink id="linear-map">linear</ConceptLink> und bijektiv:
          </p>
          <MD>{"\\begin{gathered} \\vec(\\bA + \\bB) = \\vec(\\bA) + \\vec(\\bB), \\qquad \\vec(c\\bA) = c \\, \\vec(\\bA), \\\\ \\vec(\\bA) = \\bnull \\quequiv \\bA = \\bnull. \\end{gathered}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Definitheit der Vektornorm auf <M>{"\\R^{mn}"}</M>, dann die letzte Äquivalenz
              aus dem vorigen Schritt
            </>
          }
        >
          <MD>{"\\left\\| \\vec(\\bA) \\right\\| = 0 \\quequiv \\vec(\\bA) = \\bnull \\quequiv \\bA = \\bnull."}</MD>
        </PStep>
        <PStep
          why={
            <>
              erst Linearität von <M>{"\\vec"}</M>, dann absolute Homogenität der Vektornorm
            </>
          }
        >
          <MD>{"\\left\\| \\vec(c\\bA) \\right\\| = \\left\\| c \\, \\vec(\\bA) \\right\\| = |c| \\cdot \\left\\| \\vec(\\bA) \\right\\|."}</MD>
        </PStep>
        <PStep
          why={
            <>
              erst Additivität von <M>{"\\vec"}</M>, dann Dreiecksungleichung der Vektornorm
            </>
          }
        >
          <MD>{"\\left\\| \\vec(\\bA + \\bB) \\right\\| = \\left\\| \\vec(\\bA) + \\vec(\\bB) \\right\\| \\le \\left\\| \\vec(\\bA) \\right\\| + \\left\\| \\vec(\\bB) \\right\\|."}</MD>
        </PStep>
      </Proof>
      <p>
        Die drei wichtigsten Vertreter dieser Bauart entstehen aus den drei vertrauten
        Vektornormen:
      </p>
      <EnvBlock kind="Beispiel" label="3.2.5 (Vektorisierungsnormen)">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <em>Frobenius-Norm</em> (aus der <M>{"2"}</M>-Norm):{" "}
            <MD>{"\\cblue{\\left\\| \\bA \\right\\|_F} = \\left\\| \\vec(\\bA) \\right\\|_2 = \\sqrt{\\sum_{i,j} a_{ij}^2}"}</MD>
            — das stimmt mit der Definition aus{" "}
            <a className="underline" href="#sec-3.1">Abschnitt 3.1</a> überein, wo wir außerdem{" "}
            <M>{"\\cblue{\\left\\| \\bA \\right\\|_F} = \\sqrt{\\tr(\\bA^\\top\\bA)}"}</M>{" "}
            gezeigt haben.
          </li>
          <li>
            <em>Summennorm</em> (aus der <M>{"1"}</M>-Norm):{" "}
            <MD>{"\\corange{\\left\\| \\bA \\right\\|_S} = \\left\\| \\vec(\\bA) \\right\\|_1 = \\sum_{i,j} \\left| a_{ij} \\right|"}</MD>
          </li>
          <li>
            <em>Maximumsnorm</em> (aus der <M>{"\\infty"}</M>-Norm):{" "}
            <MD>{"\\cpurp{\\left\\| \\bA \\right\\|_M} = \\left\\| \\vec(\\bA) \\right\\|_\\infty = \\max_{i,j} \\left| a_{ij} \\right|"}</MD>
          </li>
        </ul>
      </EnvBlock>
      <ExpandedReading title="Frobenius-, Summen- und Maximumsnorm — live nachgerechnet">
        <S32VecNormWidget />
      </ExpandedReading>

      <h3 id="sec-3.2.4" className="mb-2 mt-8 text-xl font-semibold">
        3.2.4 Was elementweise Normen nicht sehen
      </h3>
      <p>
        Diese Vektorisierungsnormen sind billig zu berechnen und erfüllen alle Axiome. Trotzdem
        haben sie einen konzeptionellen Haken: Sie behandeln die Matrix wie einen langen Vektor
        — jede Umordnung der Einträge lässt die Norm unverändert. Eine Matrix ist aber mehr als
        eine Tabelle von Zahlen: Sie repräsentiert die{" "}
        <ConceptLink id="linear-transformation">lineare Abbildung</ConceptLink>{" "}
        <M>{"\\bx \\mapsto \\bA\\bx"}</M>, und von dieser Abbildung wissen die elementweisen
        Normen nichts. Ihnen fehlt damit auch eine direkte geometrische Interpretation: Was
        genau <M>{"\\left\\| \\bA \\right\\|_F = 5"}</M> über die Wirkung von <M>{"\\bA"}</M>{" "}
        auf Vektoren aussagt, bleibt unklar. Wie drastisch das schiefgehen kann, zeigt das
        folgende Beispiel von den Folien.
      </p>
      <EnvBlock kind="Beispiel" label="3.2.6 (Gleiche Frobenius-Norm, völlig verschiedene Abbildungen)">
        <p>Betrachten wir die drei Matrizen</p>
        <MD>{"\\cred{\\bA_1} = \\cred{\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}}, \\qquad \\cblue{\\bA_2} = \\cblue{\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}}, \\qquad \\cgreen{\\bA_3} = \\cgreen{\\begin{pmatrix} \\sqrt{2} & 0 \\\\ 0 & 0 \\end{pmatrix}}."}</MD>
        <p>Ihre Frobenius-Normen rechnen wir direkt aus:</p>
        <MD>{"\\left\\| \\cred{\\bA_1} \\right\\|_F = \\sqrt{\\cred{1}^2 + 0^2 + 0^2 + \\cred{1}^2} = \\sqrt{2}, \\qquad \\left\\| \\cblue{\\bA_2} \\right\\|_F = \\sqrt{0^2 + \\cblue{1}^2 + \\cblue{1}^2 + 0^2} = \\sqrt{2},"}</MD>
        <MD>{"\\left\\| \\cgreen{\\bA_3} \\right\\|_F = \\sqrt{\\left(\\cgreen{\\sqrt{2}}\\right)^2 + 0^2 + 0^2 + 0^2} = \\sqrt{2}."}</MD>
        <p>
          Alle drei Matrizen haben also <em>dieselbe</em> Frobenius-Norm{" "}
          <M>{"\\sqrt{2}"}</M>. Als Abbildungen könnten sie kaum unterschiedlicher sein.
          Verfolgen wir den Vektor <M>{"\\bx = (1, 0)^\\top"}</M>:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <M>{"\\cred{\\bA_1}\\bx = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\bx"}</M> —
            die <ConceptLink id="identity-matrix">Identität</ConceptLink> lässt{" "}
            <em>jeden</em> Vektor unverändert.
          </li>
          <li>
            <M>{"\\cblue{\\bA_2}\\bx = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}"}</M> — die{" "}
            <ConceptLink id="permutation-matrix">Permutationsmatrix</ConceptLink>{" "}
            <M>{"\\cblue{\\bA_2}"}</M> vertauscht die beiden Koordinaten. Geometrisch ist das
            eine <ConceptLink id="reflection">Spiegelung</ConceptLink> an der
            Winkelhalbierenden <M>{"x_2 = x_1"}</M> (keine Drehung: es gilt{" "}
            <M>{"\\det \\cblue{\\bA_2} = -1"}</M>, siehe{" "}
            <ConceptLink id="determinant">Determinante</ConceptLink>).
          </li>
          <li>
            <M>{"\\cgreen{\\bA_3}\\bx = \\begin{pmatrix} \\sqrt{2} \\\\ 0 \\end{pmatrix}"}</M>{" "}
            — <M>{"\\cgreen{\\bA_3}"}</M> streckt die erste Koordinate um den Faktor{" "}
            <M>{"\\sqrt{2}"}</M> und löscht die zweite komplett:{" "}
            <M>{"\\cgreen{\\bA_3}(0,1)^\\top = \\bnull"}</M>. Diese Matrix ist singulär (nicht{" "}
            <ConceptLink id="matrix-inverse">invertierbar</ConceptLink>) — sie kollabiert die
            ganze Ebene auf die <M>{"x_1"}</M>-Achse.
          </li>
        </ul>
        <p>
          Zwei längentreue Abbildungen und eine, die eine ganze Dimension vernichtet — und die
          Frobenius-Norm kann sie nicht auseinanderhalten.
        </p>
      </EnvBlock>
      <p>
        Dasselbe Problem zeigt sich aus einer zweiten Richtung, wenn wir die Dimension wachsen
        lassen:
      </p>
      <EnvBlock kind="Beispiel" label="3.2.7 (Identität in wachsender Dimension)">
        <p>
          Für die Identitätsmatrix <M>{"\\bI_n \\in \\R^{n \\times n}"}</M> (mit <M>{"n"}</M>{" "}
          Einsen auf der Diagonale und sonst Nullen) liefern die drei Vektorisierungsnormen
        </p>
        <MD>{"\\cblue{\\left\\| \\bI_n \\right\\|_F} = \\sqrt{\\underbrace{1 + \\cdots + 1}_{n}} = \\cblue{\\sqrt{n}}, \\qquad \\corange{\\left\\| \\bI_n \\right\\|_S} = \\corange{n}, \\qquad \\cpurp{\\left\\| \\bI_n \\right\\|_M} = \\cpurp{1}."}</MD>
        <p>
          Die Abbildung <M>{"\\bx \\mapsto \\bI_n\\bx = \\bx"}</M> ändert überhaupt nichts —
          trotzdem wachsen Frobenius- und Summennorm mit <M>{"n"}</M> über alle Grenzen.
        </p>
      </EnvBlock>
      <p>
        Eine Norm, die die Matrix als <em>Abbildung</em> misst, sollte der Identität den Wert{" "}
        <M>{"1"}</M> geben — unabhängig von der Dimension. Die Maximumsnorm trifft diesen Wert
        hier zwar zufällig, bleibt aber genauso blind für das, was{" "}
        <M>{"\\bA"}</M> mit Vektoren <em>tut</em> (im{" "}
        <ConceptLink id="matrix-vector-product">Matrix-Vektor-Produkt</ConceptLink>{" "}
        <M>{"\\bA\\bx"}</M>). Die Lösung sind <em>Operatornormen</em>, die die Transformation{" "}
        <M>{"\\bx \\mapsto \\bA\\bx"}</M> direkt vermessen: Wie stark kann <M>{"\\bA"}</M>{" "}
        einen Vektor höchstens verlängern? Ihnen widmen wir den{" "}
        <a className="underline" href="#sec-3.3">nächsten Abschnitt</a>.
      </p>

      <p className="italic">Vertiefung: Heath §2.3.</p>
    </div>
  );
}
