import type { ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S35SubmultWidget } from "./widgets/S35SubmultWidget";

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

/**
 * Abschnitt 3.5 – Eigenschaften von Matrixnormen.
 * Quelle: Folien 03-matrix-spur-norm.Rmd, Block „Eigenschaften von
 * Matrixnormen" (Normenäquivalenz, Submultiplikativität, Verträglichkeit,
 * Konditionierung, Fehleranalyse). Prosa eigenständig aus den Folien
 * formuliert.
 */
export function S35() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 03-matrix-spur-norm, „Eigenschaften von Matrixnormen".
      </p>
      <p>
        In den <a className="underline" href="#sec-3.2">Abschnitten 3.2</a> bis{" "}
        <a className="underline" href="#sec-3.4">3.4</a> haben wir einen ganzen Zoo von
        Matrixnormen kennengelernt: elementweise Normen wie die Frobenius- und die Maximumsnorm,
        die Operatornormen und die Schatten-Normen. Drei Fragen drängen sich jetzt auf. Erstens:
        Wie hängen all diese Normen zusammen? Kann dieselbe Matrix in einer Norm „klein" und in
        einer anderen „riesig" sein? Zweitens: Wie verhalten sich Matrixnormen unter der
        wichtigsten Matrixoperation überhaupt, der Multiplikation? Und drittens: Was haben wir
        davon? Die Antworten auf die ersten beiden Fragen heißen <em>Normenäquivalenz</em>,{" "}
        <em>Submultiplikativität</em> und <em>Verträglichkeit</em>; die Antwort auf die dritte
        führt uns zur <ConceptLink id="condition-number">Konditionszahl</ConceptLink> und zur
        Fehleranalyse, also mitten hinein in die Numerik.
      </p>

      <h3 id="sec-3.5.1" className="mb-2 mt-8 text-xl font-semibold">
        3.5.1 Normenäquivalenz
      </h3>
      <p>
        Beginnen wir mit der ersten Frage. Für <ConceptLink id="norm">Vektornormen</ConceptLink>{" "}
        auf <M>{"\\R^n"}</M> gilt bekanntlich: Alle Normen sind äquivalent, d. h. je zwei Normen
        schätzen sich gegenseitig bis auf konstante Faktoren ab. Weil Matrixnormen auf{" "}
        <M>{"\\R^{m \\times n}"}</M> denselben Axiomen gehorchen (eine Matrix ist aus Sicht der
        Normaxiome nur ein langer Vektor mit <M>{"mn"}</M> Einträgen), überträgt sich dieses
        Resultat direkt:
      </p>
      <EnvBlock kind="Satz" label="3.5.1 (Alle Matrixnormen sind äquivalent)">
        <p>
          Für je zwei Matrixnormen <M>{"\\left\\|\\cdot\\right\\|_a"}</M> und{" "}
          <M>{"\\left\\|\\cdot\\right\\|_b"}</M> auf <M>{"\\R^{m \\times n}"}</M> (bei festen{" "}
          <M>{"m, n"}</M>) existieren Konstanten <M>{"c, C > 0"}</M> mit
        </p>
        <MD>{"c\\left\\|\\bA\\right\\|_a \\le \\left\\|\\bA\\right\\|_b \\le C\\left\\|\\bA\\right\\|_a \\quad \\text{für alle } \\bA \\in \\R^{m \\times n}."}</MD>
      </EnvBlock>
      <p>
        Der Beweis läuft wie im Vektorfall über ein Kompaktheitsargument (jede Norm ist als
        Funktion stetig und nimmt auf der Einheitssphäre einer Referenznorm ihr Minimum und
        Maximum an); wir übernehmen das Resultat hier ohne Beweis. Interessanter für die Praxis
        ist, <em>wie groß</em> die Konstanten für die konkreten Normen aus den letzten
        Abschnitten ausfallen:
      </p>
      <EnvBlock kind="Beispiel" label="3.5.2 (Explizite Äquivalenzkonstanten)">
        <p>
          Für <M>{"\\bA \\in \\R^{m \\times n}"}</M> gilt unter anderem:
        </p>
        <MD>{"\\left\\|\\bA\\right\\|_2 \\le \\left\\|\\bA\\right\\|_F \\le \\sqrt{\\min(m,n)}\\, \\left\\|\\bA\\right\\|_2,"}</MD>
        <MD>{"\\left\\|\\bA\\right\\|_F \\le \\left\\|\\bA\\right\\|_* \\le \\sqrt{\\min(m,n)}\\, \\left\\|\\bA\\right\\|_F,"}</MD>
        <MD>{"\\tfrac{1}{\\sqrt{n}} \\left\\|\\bA\\right\\|_\\infty \\le \\left\\|\\bA\\right\\|_2 \\le \\sqrt{m}\\, \\left\\|\\bA\\right\\|_\\infty."}</MD>
        <p>
          (<M>{"\\left\\|\\cdot\\right\\|_\\infty"}</M> ist hier die Zeilensummennorm aus{" "}
          <a className="underline" href="#sec-3.3">Abschnitt 3.3</a>, nicht zu verwechseln mit
          der elementweisen Maximumsnorm <M>{"\\left\\|\\cdot\\right\\|_M"}</M>.) Die Konstanten
          hängen also nur über die Dimensionen <M>{"m, n"}</M> von der Matrix ab,
          und sie wachsen mit der Dimension. Für sehr große Matrizen können zwei Normen also
          durchaus um Größenordnungen auseinanderliegen.
        </p>
      </EnvBlock>
      <p>
        Die erste Kette können wir mit dem Schatten-Blick aus{" "}
        <a className="underline" href="#sec-3.4">Abschnitt 3.4</a> vollständig beweisen. Dort
        haben wir gesehen: Sind <M>{"\\lambda_1 \\ge \\cdots \\ge \\lambda_r > 0"}</M> die
        positiven <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> von{" "}
        <M>{"\\bA^\\top\\bA"}</M> (mit <M>{"r = \\rang(\\bA)"}</M>), so ist{" "}
        <M>{"\\left\\|\\bA\\right\\|_2 = \\sqrt{\\cred{\\lambda_1}}"}</M> und{" "}
        <M>{"\\left\\|\\bA\\right\\|_F = \\sqrt{\\cgreen{\\sum_{i=1}^r \\lambda_i}}"}</M>. Wir
        verfolgen <M>{"\\cred{\\lambda_1}"}</M> rot und die Eigenwertsumme grün:
      </p>
      <Proof>
        <PStep
          why={
            <>
              alle <M>{"\\lambda_i"}</M> sind positiv, die Summe ist also mindestens so groß wie
              ihr größter Summand <M>{"\\cred{\\lambda_1}"}</M>
            </>
          }
        >
          <MD>{"\\left\\|\\bA\\right\\|_2^2 = \\cred{\\lambda_1} \\le \\cgreen{\\sum_{i=1}^r \\lambda_i} = \\left\\|\\bA\\right\\|_F^2"}</MD>
        </PStep>
        <PStep
          why={
            <>
              jeder der <M>{"r"}</M> Summanden ist höchstens <M>{"\\cred{\\lambda_1}"}</M>; und
              der <ConceptLink id="rank">Rang</ConceptLink> erfüllt{" "}
              <M>{"r \\le \\min(m,n)"}</M>
            </>
          }
        >
          <MD>{"\\left\\|\\bA\\right\\|_F^2 = \\cgreen{\\sum_{i=1}^r \\lambda_i} \\le r \\cdot \\cred{\\lambda_1} \\le \\min(m,n) \\cdot \\cred{\\lambda_1} = \\min(m,n) \\cdot \\left\\|\\bA\\right\\|_2^2"}</MD>
        </PStep>
        <PStep why={<>Wurzelziehen ist monoton, erhält also beide Ungleichungen</>}>
          <MD>{"\\left\\|\\bA\\right\\|_2 \\le \\left\\|\\bA\\right\\|_F \\le \\sqrt{\\min(m,n)}\\, \\left\\|\\bA\\right\\|_2"}</MD>
        </PStep>
      </Proof>
      <EnvBlock kind="Bemerkung" label="3.5.3 (Äquivalenz ist nicht Gleichheit)">
        <p>
          Vorsicht: Äquivalenz heißt nur, dass keine Norm „unendlich viel größer" sein kann als
          eine andere. Verschiedene Normen können Matrizen aber durchaus{" "}
          <em>unterschiedlich ordnen</em>. Betrachten wir
        </p>
        <MD>{"\\bA = \\bI_2 = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}, \\qquad \\bB = \\begin{pmatrix} 1{,}2 & 0 \\\\ 0 & 0 \\end{pmatrix}."}</MD>
        <p>
          In der Frobenius-Norm ist <M>{"\\bA"}</M> die größere Matrix:{" "}
          <M>{"\\left\\|\\bA\\right\\|_F = \\sqrt{2} \\approx 1{,}41 > 1{,}2 = \\left\\|\\bB\\right\\|_F"}</M>.
          In der Spektralnorm ist es umgekehrt:{" "}
          <M>{"\\left\\|\\bA\\right\\|_2 = 1 < 1{,}2 = \\left\\|\\bB\\right\\|_2"}</M>. Beide
          Antworten sind richtig, denn jede Norm misst eben etwas anderes: Die Frobenius-Norm
          summiert die „Gesamtmasse" aller Einträge, die Spektralnorm die maximale Streckung.
          Welche Norm die passende ist, entscheidet die Anwendung.
        </p>
      </EnvBlock>

      <h3 id="sec-3.5.2" className="mb-2 mt-8 text-xl font-semibold">
        3.5.2 Submultiplikativität
      </h3>
      <p>
        Kommen wir zur zweiten Frage. Die Normaxiome aus{" "}
        <a className="underline" href="#sec-3.2">Abschnitt 3.2</a> regeln per
        Dreiecksungleichung, wie sich Normen unter <em>Addition</em> verhalten:{" "}
        <M>{"\\left\\|\\bA + \\bB\\right\\| \\le \\left\\|\\bA\\right\\| + \\left\\|\\bB\\right\\|"}</M>.
        Über das Matrix<em>produkt</em> sagen sie dagegen gar nichts. Für die Numerik ist das
        Produkt aber die zentrale Operation: Algorithmen sind Ketten von
        Matrixmultiplikationen, und wir wollen abschätzen können, wie stark so eine Kette
        Fehler aufbläht. Normen, die das erlauben, bekommen einen eigenen Namen:
      </p>
      <EnvBlock kind="Definition" label="3.5.4 (Submultiplikative Matrixnorm)">
        <p>
          Eine Matrixnorm <M>{"\\left\\|\\cdot\\right\\|"}</M> heißt{" "}
          <em>submultiplikativ</em>, wenn für alle Matrizen mit passenden Formaten (
          <M>{"\\cbred{\\bA} \\in \\R^{m \\times n}"}</M>,{" "}
          <M>{"\\cblue{\\bB} \\in \\R^{n \\times p}"}</M>) gilt:
        </p>
        <MD>{"\\left\\|\\cbred{\\bA}\\cblue{\\bB}\\right\\| \\le \\left\\|\\cbred{\\bA}\\right\\| \\cdot \\left\\|\\cblue{\\bB}\\right\\|."}</MD>
      </EnvBlock>
      <p>
        Die gute Nachricht: Die wichtigsten Normen aus diesem Kapitel haben diese Eigenschaft.
      </p>
      <EnvBlock kind="Satz" label="3.5.5 (Operatornormen sind submultiplikativ)">
        <p>
          Jede Operatornorm (<a className="underline" href="#sec-3.3">Abschnitt 3.3</a>) ist
          submultiplikativ.
        </p>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              Definition der Operatornorm als Maximum des Quotienten{" "}
              <M>{"\\left\\|\\bA\\by\\right\\|_V / \\left\\|\\by\\right\\|_V"}</M>: das Maximum
              ist mindestens so groß wie der Quotient für jedes einzelne{" "}
              <M>{"\\by \\ne \\bnull"}</M>; für <M>{"\\by = \\bnull"}</M> stehen links und
              rechts null
            </>
          }
        >
          <p>
            Zuerst eine Hilfsungleichung: Für jede Matrix <M>{"\\bM"}</M> und jeden Vektor{" "}
            <M>{"\\by"}</M> gilt
          </p>
          <MD>{"\\left\\|\\bM\\by\\right\\|_V \\le \\left\\|\\bM\\right\\|_V \\cdot \\left\\|\\by\\right\\|_V."}</MD>
        </PStep>
        <PStep
          why={
            <>
              Hilfsungleichung zweimal anwenden: erst auf <M>{"\\cbred{\\bA}"}</M> mit dem
              Vektor <M>{"\\cblue{\\bB}\\bx"}</M>, dann auf <M>{"\\cblue{\\bB}"}</M> mit{" "}
              <M>{"\\bx"}</M>, wobei <M>{"\\left\\|\\bx\\right\\|_V = 1"}</M>
            </>
          }
        >
          <p>
            Sei nun <M>{"\\bx"}</M> ein Vektor mit <M>{"\\left\\|\\bx\\right\\|_V = 1"}</M>.
            Dann:
          </p>
          <MD>{"\\left\\|(\\cbred{\\bA}\\cblue{\\bB})\\bx\\right\\|_V = \\left\\|\\cbred{\\bA}(\\cblue{\\bB}\\bx)\\right\\|_V \\le \\left\\|\\cbred{\\bA}\\right\\|_V \\left\\|\\cblue{\\bB}\\bx\\right\\|_V \\le \\left\\|\\cbred{\\bA}\\right\\|_V \\left\\|\\cblue{\\bB}\\right\\|_V."}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Operatornorm von <M>{"\\cbred{\\bA}\\cblue{\\bB}"}</M> ist das Maximum der
              linken Seite über alle <M>{"\\bx"}</M> mit{" "}
              <M>{"\\left\\|\\bx\\right\\|_V = 1"}</M>; die rechte Seite hängt nicht von{" "}
              <M>{"\\bx"}</M> ab
            </>
          }
        >
          <MD>{"\\left\\|\\cbred{\\bA}\\cblue{\\bB}\\right\\|_V = \\max_{\\left\\|\\bx\\right\\|_V = 1} \\left\\|(\\cbred{\\bA}\\cblue{\\bB})\\bx\\right\\|_V \\le \\left\\|\\cbred{\\bA}\\right\\|_V \\cdot \\left\\|\\cblue{\\bB}\\right\\|_V"}</MD>
        </PStep>
      </Proof>
      <p>
        Auch alle Schatten-Normen aus{" "}
        <a className="underline" href="#sec-3.4">Abschnitt 3.4</a> (insbesondere die
        Frobenius-Norm und die Nuklearnorm) sind submultiplikativ. Der Beweis braucht
        Ungleichungen für Singulärwerte von Produkten, die wir hier nicht entwickeln; wir merken
        uns das Resultat. Nicht jede Matrixnorm ist aber submultiplikativ; das prominenteste
        Gegenbeispiel ist die Maximumsnorm:
      </p>
      <EnvBlock kind="Beispiel" label="3.5.6 (Die Maximumsnorm ist nicht submultiplikativ)">
        <p>
          Betrachten wir die Einsermatrix{" "}
          <M>{"\\cbred{\\bA} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}"}</M> und ihr
          Quadrat. Jeder Eintrag von <M>{"\\cgreen{\\bA^2}"}</M> ist ein Skalarprodukt aus einer
          Zeile und einer Spalte voller Einsen:
        </p>
        <MD>{"\\cgreen{\\bA^2} = \\begin{pmatrix} \\cred{1} \\cdot \\cred{1} + \\cred{1} \\cdot \\cred{1} & 1 \\cdot 1 + 1 \\cdot 1 \\\\ 1 \\cdot 1 + 1 \\cdot 1 & 1 \\cdot 1 + 1 \\cdot 1 \\end{pmatrix} = \\cgreen{\\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix}}."}</MD>
        <p>Damit ist</p>
        <MD>{"\\left\\|\\cgreen{\\bA^2}\\right\\|_M = 2 > 1 = 1 \\cdot 1 = \\left\\|\\cbred{\\bA}\\right\\|_M \\cdot \\left\\|\\cbred{\\bA}\\right\\|_M."}</MD>
        <p>
          Die Maximumsnorm „übersieht", dass bei der Matrixmultiplikation viele Produkte{" "}
          <em>aufsummiert</em> werden, denn sie schaut nur auf den größten einzelnen Eintrag.
        </p>
      </EnvBlock>
      <EnvBlock kind="Bemerkung" label="3.5.7 (Reparatur: die Gesamtnorm)">
        <p>
          Der Defekt lässt sich durch einen dimensionsabhängigen Faktor beheben: Die{" "}
          <em>Gesamtnorm</em>{" "}
          <M>{"\\left\\|\\bA\\right\\|_G := \\sqrt{mn}\\, \\left\\|\\bA\\right\\|_M"}</M> ist
          submultiplikativ. Der Nachweis ist eine gute Übung. Er benutzt genau die
          Summenstruktur der Matrixmultiplikation, die die Maximumsnorm ignoriert. (Probe am
          Beispiel 3.5.6 mit <M>{"m = n = 2"}</M>, also <M>{"\\sqrt{mn} = 2"}</M>:{" "}
          <M>{"\\left\\|\\bA\\right\\|_G = 2 \\cdot 1 = 2"}</M> und{" "}
          <M>{"\\left\\|\\bA^2\\right\\|_G = 2 \\cdot 2 = 4 \\le 4 = \\left\\|\\bA\\right\\|_G^2"}</M>,{" "}
          es passt.)
        </p>
      </EnvBlock>
      <p>
        Warum ist Submultiplikativität so wertvoll? Drei Gründe. Erstens kontrolliert sie die{" "}
        <em>Fehlerfortpflanzung</em>: Für eine Kette{" "}
        <M>{"\\bA_1 \\bA_2 \\cdots \\bA_k"}</M> folgt durch wiederholtes Anwenden{" "}
        <M>{"\\left\\|\\bA_1 \\cdots \\bA_k\\right\\| \\le \\left\\|\\bA_1\\right\\| \\cdots \\left\\|\\bA_k\\right\\|"}</M>;{" "}
        die Normen der Faktoren deckeln die Norm des Produkts. Zweitens ermöglicht sie{" "}
        <ConceptLink id="convergence">Konvergenz</ConceptLink>analysen iterativer Verfahren: Aus{" "}
        <M>{"\\left\\|\\bA\\right\\| < 1"}</M> folgt{" "}
        <M>{"\\left\\|\\bA^k\\right\\| \\le \\left\\|\\bA\\right\\|^k \\to 0"}</M>, die Potenzen
        einer „kontrahierenden" Matrix sterben also garantiert aus. Drittens verbindet sie
        Normen mit dem <ConceptLink id="spectral-radius">Spektralradius</ConceptLink>: Man kann
        zeigen, dass <M>{"\\rho(\\bA) \\le \\left\\|\\bA\\right\\|"}</M> für jede
        submultiplikative Norm gilt: Jede solche Norm ist eine obere Schranke für die
        betragsgrößten Eigenwerte.
      </p>
      <ExpandedReading title="Submultiplikativität ausprobieren: ‖AB‖ gegen ‖A‖·‖B‖">
        <S35SubmultWidget />
      </ExpandedReading>

      <h3 id="sec-3.5.3" className="mb-2 mt-8 text-xl font-semibold">
        3.5.3 Verträglichkeit von Normen
      </h3>
      <p>
        Submultiplikativität vergleicht Matrixnormen mit Matrixnormen. Genauso oft brauchen wir
        aber ein gemischtes Szenario: Eine Matrix wirkt auf einen <em>Vektor</em>, und wir
        wollen <M>{"\\left\\|\\bA\\bx\\right\\|"}</M> durch die Norm von <M>{"\\bA"}</M> und
        die Norm von <M>{"\\bx"}</M> abschätzen. Das führt auf folgenden Begriff:
      </p>
      <EnvBlock kind="Definition" label="3.5.8 (Verträgliche Norm)">
        <p>
          Eine Matrixnorm <M>{"\\left\\|\\cdot\\right\\|"}</M> ist <em>verträglich</em>{" "}
          (kompatibel) mit einer <ConceptLink id="norm">Vektornorm</ConceptLink>{" "}
          <M>{"\\left\\|\\cdot\\right\\|_V"}</M>, wenn für alle{" "}
          <M>{"\\bA \\in \\R^{m \\times n}"}</M> und <M>{"\\bx \\in \\R^n"}</M> gilt:
        </p>
        <MD>{"\\left\\|\\bA\\bx\\right\\|_V \\le \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bx\\right\\|_V."}</MD>
        <p>
          (Dabei bezeichnet <M>{"\\left\\|\\cdot\\right\\|_V"}</M> die Vektornorm gleichen Typs
          auf <M>{"\\R^n"}</M> und auf <M>{"\\R^m"}</M>.)
        </p>
      </EnvBlock>
      <EnvBlock kind="Satz" label="3.5.9 (Wichtige Verträglichkeiten)">
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Jede submultiplikative Matrixnorm ist mit „sich selbst" verträglich, d. h. mit der
            Vektornorm, die entsteht, wenn wir <M>{"\\bx \\in \\R^n"}</M> als{" "}
            <M>{"n \\times 1"}</M>-Matrix lesen.
          </li>
          <li>
            Jede Operatornorm ist mit der Vektornorm verträglich, die sie induziert.
          </li>
          <li>
            Die Frobenius-Norm ist mit der{" "}
            <ConceptLink id="euclidean-norm">euklidischen Norm</ConceptLink> verträglich:{" "}
            <M>{"\\left\\|\\bA\\bx\\right\\|_2 \\le \\left\\|\\bA\\right\\|_F \\left\\|\\bx\\right\\|_2"}</M>.
          </li>
        </ol>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              Submultiplikativität (Definition 3.5.4), angewendet auf das Matrixprodukt einer{" "}
              <M>{"m \\times n"}</M>- mit einer <M>{"n \\times 1"}</M>-Matrix
            </>
          }
        >
          <p>
            <em>Zu (1):</em> Lesen wir <M>{"\\bx"}</M> als <M>{"n \\times 1"}</M>-Matrix, so
            ist <M>{"\\bA\\bx"}</M> ein Matrixprodukt, und die Submultiplikativität liefert
            direkt
          </p>
          <MD>{"\\left\\|\\bA\\bx\\right\\| \\le \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bx\\right\\|."}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Operatornorm ist als Maximum des Quotienten definiert, also ist sie mindestens
              so groß wie der Quotient an jeder einzelnen Stelle <M>{"\\bx \\ne \\bnull"}</M>
            </>
          }
        >
          <p>
            <em>Zu (2):</em> Das ist die Hilfsungleichung aus dem Beweis von Satz 3.5.5: Für{" "}
            <M>{"\\bx \\ne \\bnull"}</M> gilt
          </p>
          <MD>{"\\frac{\\left\\|\\bA\\bx\\right\\|_V}{\\left\\|\\bx\\right\\|_V} \\le \\max_{\\by \\ne \\bnull} \\frac{\\left\\|\\bA\\by\\right\\|_V}{\\left\\|\\by\\right\\|_V} = \\left\\|\\bA\\right\\|_V."}</MD>
        </PStep>
        <PStep
          why={
            <>
              <ConceptLink id="cauchy-schwarz-inequality">Cauchy-Schwarz-Ungleichung</ConceptLink>{" "}
              für jedes einzelne Skalarprodukt{" "}
              <M>{"\\cred{\\ba_i}^\\top \\cblue{\\bx}"}</M>
            </>
          }
        >
          <p>
            <em>Zu (3):</em> Schreiben wir <M>{"\\bA"}</M> zeilenweise mit Zeilenvektoren{" "}
            <M>{"\\cred{\\ba_1}^\\top, \\ldots, \\cred{\\ba_m}^\\top"}</M>. Die <M>{"i"}</M>-te
            Komponente von <M>{"\\bA\\cblue{\\bx}"}</M> ist das Skalarprodukt{" "}
            <M>{"\\cred{\\ba_i}^\\top\\cblue{\\bx}"}</M>, also
          </p>
          <MD>{"\\left\\|\\bA\\cblue{\\bx}\\right\\|_2^2 = \\sum_{i=1}^m \\left(\\cred{\\ba_i}^\\top\\cblue{\\bx}\\right)^2 \\le \\sum_{i=1}^m \\left\\|\\cred{\\ba_i}\\right\\|_2^2 \\left\\|\\cblue{\\bx}\\right\\|_2^2."}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Summe der quadrierten Zeilennormen ist genau die Summe aller quadrierten
              Einträge, also <M>{"\\left\\|\\bA\\right\\|_F^2"}</M>; dann Wurzel ziehen
            </>
          }
        >
          <MD>{"\\left\\|\\bA\\cblue{\\bx}\\right\\|_2^2 \\le \\left(\\sum_{i=1}^m \\left\\|\\cred{\\ba_i}\\right\\|_2^2\\right) \\left\\|\\cblue{\\bx}\\right\\|_2^2 = \\left\\|\\bA\\right\\|_F^2 \\left\\|\\cblue{\\bx}\\right\\|_2^2"}</MD>
        </PStep>
      </Proof>
      <p>
        Wozu das Ganze? Verträglichkeit ist das Werkzeug für <em>Fehlerabschätzungen</em>.
        Steckt in einem Vektor ein Fehler <M>{"\\be"}</M> (etwa aus{" "}
        <ConceptLink id="rounding-error">Rundungsfehlern</ConceptLink> früherer
        Rechenschritte) und multiplizieren wir mit <M>{"\\bA"}</M>, dann garantiert{" "}
        <M>{"\\left\\|\\bA\\be\\right\\|_V \\le \\left\\|\\bA\\right\\| \\cdot \\left\\|\\be\\right\\|_V"}</M>:
        Ein kleiner Eingangsfehler bleibt nach der Multiplikation kontrolliert, denn die Matrixnorm
        ist der Verstärkungsfaktor im schlimmsten Fall. Diese Denkfigur bauen wir jetzt zu
        den zwei wichtigsten Anwendungen aus.
      </p>

      <h3 id="sec-3.5.4" className="mb-2 mt-8 text-xl font-semibold">
        3.5.4 Matrixnormen und Konditionierung
      </h3>
      <p>
        Die <ConceptLink id="condition-number">Konditionszahl</ConceptLink> kennen wir bereits
        als Maß dafür, wie stark ein Problem relative Eingabefehler verstärkt. Für das Lösen
        linearer <ConceptLink id="linear-system">Gleichungssysteme</ConceptLink>{" "}
        <M>{"\\bA\\bx = \\bb"}</M> lässt sich dieser Verstärkungsfaktor direkt aus Matrixnormen
        gewinnen. Das rechnen wir im Kapitel über lineare Gleichungssysteme nach, halten die
        Definition aber schon hier fest:
      </p>
      <EnvBlock kind="Definition" label="3.5.10 (Konditionszahl einer Matrix)">
        <p>
          Für eine <ConceptLink id="matrix-inverse">invertierbare</ConceptLink> Matrix{" "}
          <M>{"\\bA \\in \\R^{n \\times n}"}</M> und eine submultiplikative Matrixnorm{" "}
          <M>{"\\left\\|\\cdot\\right\\|"}</M> ist die <em>Konditionszahl</em>
        </p>
        <MD>{"\\kappa(\\bA) = \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bA^{-1}\\right\\|;"}</MD>
        <p>
          für singuläre Matrizen setzen wir <M>{"\\kappa(\\bA) = \\infty"}</M>. Speziell für die
          Spektralnorm ergibt sich die <em>Spektralkondition</em>
        </p>
        <MD>{"\\kappa_2(\\bA) = \\left\\|\\bA\\right\\|_2 \\cdot \\left\\|\\bA^{-1}\\right\\|_2 = \\frac{\\lambda_{\\max}(\\bA^\\top\\bA)^{1/2}}{\\lambda_{\\min}(\\bA^\\top\\bA)^{1/2}}."}</MD>
      </EnvBlock>
      <p>
        Die zweite Gleichheit sieht man so: Nach{" "}
        <a className="underline" href="#sec-3.3">Abschnitt 3.3</a> ist{" "}
        <M>{"\\left\\|\\bA\\right\\|_2 = \\lambda_{\\max}(\\bA^\\top\\bA)^{1/2}"}</M>, und die
        Eigenwerte von <M>{"(\\bA^{-1})^\\top\\bA^{-1} = (\\bA\\bA^\\top)^{-1}"}</M> sind die
        Kehrwerte der Eigenwerte von <M>{"\\bA\\bA^\\top"}</M>, und{" "}
        <M>{"\\bA\\bA^\\top"}</M> hat dieselben Eigenwerte wie <M>{"\\bA^\\top\\bA"}</M>. Der
        größte Eigenwert von <M>{"(\\bA\\bA^\\top)^{-1}"}</M> ist also{" "}
        <M>{"1/\\lambda_{\\min}(\\bA^\\top\\bA)"}</M>. Die Konditionszahl misst damit das{" "}
        <em>Verhältnis der extremen Streckungsfaktoren</em>: maximale Streckung durch{" "}
        <M>{"\\bA"}</M> geteilt durch minimale Streckung. Noch durchsichtiger wird das mit der{" "}
        <ConceptLink id="singular-value-decomposition">Singulärwertzerlegung</ConceptLink>, die
        wir später kennenlernen: <M>{"\\kappa_2(\\bA)"}</M> ist der Quotient aus größtem und
        kleinstem Singulärwert. Für <em>symmetrische</em> Matrizen sind die Singulärwerte
        gerade die Beträge der Eigenwerte; dort ist{" "}
        <M>{"\\kappa_2(\\bA) = \\max_i |\\lambda_i| \\,/\\, \\min_i |\\lambda_i|"}</M>, das
        Verhältnis der betragsmäßig extremen Eigenwerte.
      </p>
      <EnvBlock kind="Bemerkung" label="3.5.11 (Interpretation der Konditionszahl)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <M>{"\\kappa(\\bA) \\approx 1"}</M>: gut konditioniert; <M>{"\\bA"}</M> streckt
            alle Richtungen ungefähr gleich stark.
          </li>
          <li>
            <M>{"\\kappa(\\bA) \\gg 1"}</M>: schlecht konditioniert; manche Richtungen werden
            enorm gestreckt, andere fast plattgedrückt.
          </li>
          <li>
            <M>{"\\kappa(\\bA) = \\infty"}</M>: singulär.
          </li>
        </ul>
        <p>
          Kleiner als 1 kann die Konditionszahl (in einer Operatornorm) nie werden: Wegen{" "}
          <M>{"\\left\\|\\bI\\right\\| = 1"}</M> und der Submultiplikativität gilt
        </p>
        <MD>{"1 = \\left\\|\\bI\\right\\| = \\left\\|\\bA\\bA^{-1}\\right\\| \\le \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bA^{-1}\\right\\| = \\kappa(\\bA)."}</MD>
        <p>
          Den Idealwert <M>{"\\kappa_2 = 1"}</M> erreichen zum Beispiel{" "}
          <ConceptLink id="orthogonal-matrix">Orthogonalmatrizen</ConceptLink>: Sie lassen alle
          euklidischen Längen unverändert (
          <a className="underline" href="#sec-3.3">Abschnitt 3.3</a>), strecken also jede
          Richtung mit dem Faktor 1.
        </p>
      </EnvBlock>

      <h3 id="sec-3.5.5" className="mb-2 mt-8 text-xl font-semibold">
        3.5.5 Normen in der Fehleranalyse
      </h3>
      <p>
        Zum Abschluss zeigen wir an einem konkreten Resultat, wie Matrixnormen in der
        Fehleranalyse arbeiten. Angenommen, wir lösen <M>{"\\bA\\bx = \\bb"}</M> numerisch und
        erhalten (dank Rundungsfehlern) nicht die exakte Lösung, sondern eine Näherung{" "}
        <M>{"\\wt{\\bx}"}</M>. Die <em>Rückwärts-Fehleranalyse</em> (backward error analysis)
        stellt die Frage geschickt um: Statt zu fragen, wie falsch <M>{"\\wt{\\bx}"}</M> ist
        (Vorwärtsfehler), fragen wir: <em>Für welches gestörte Problem ist{" "}
        <M>{"\\wt{\\bx}"}</M> die exakte Lösung?</em> Ist die nötige Störung winzig, hat der
        Algorithmus sein Bestes getan; alles Weitere ist Sache der Kondition des Problems.
      </p>
      <EnvBlock kind="Satz" label="3.5.12 (Rückwärtsfehler beim linearen Gleichungssystem)">
        <p>
          Sei <M>{"\\wt{\\bx} \\ne \\bnull"}</M> eine Näherungslösung von{" "}
          <M>{"\\bA\\bx = \\bb"}</M> mit Residuum{" "}
          <M>{"\\cbpurp{\\br} = \\bA\\wt{\\bx} - \\bb"}</M>. Dann löst <M>{"\\wt{\\bx}"}</M>{" "}
          das gestörte System
        </p>
        <MD>{"(\\bA + \\cblue{\\bDelta\\bA})\\,\\wt{\\bx} = \\bb \\qquad \\text{mit} \\qquad \\cblue{\\bDelta\\bA} = -\\frac{\\cbpurp{\\br}\\,\\wt{\\bx}^\\top}{\\left\\|\\wt{\\bx}\\right\\|_2^2}"}</MD>
        <p>exakt, und die relative Größe der Störung ist</p>
        <MD>{"\\frac{\\left\\|\\cblue{\\bDelta\\bA}\\right\\|_2}{\\left\\|\\bA\\right\\|_2} = \\frac{\\left\\|\\cbpurp{\\br}\\right\\|_2}{\\left\\|\\bA\\right\\|_2 \\cdot \\left\\|\\wt{\\bx}\\right\\|_2}."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              <M>{"\\cbpurp{\\br}\\,\\wt{\\bx}^\\top"}</M> ist ein{" "}
              <ConceptLink id="outer-product">äußeres Produkt</ConceptLink>; multiplizieren wir
              es mit <M>{"\\wt{\\bx}"}</M>, entsteht das Skalarprodukt{" "}
              <M>{"\\wt{\\bx}^\\top\\wt{\\bx} = \\left\\|\\wt{\\bx}\\right\\|_2^2"}</M>, das
              sich gegen den Nenner kürzt
            </>
          }
        >
          <MD>{"\\cblue{\\bDelta\\bA}\\,\\wt{\\bx} = -\\frac{\\cbpurp{\\br}\\,(\\wt{\\bx}^\\top\\wt{\\bx})}{\\left\\|\\wt{\\bx}\\right\\|_2^2} = -\\cbpurp{\\br}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Definition des Residuums:{" "}
              <M>{"\\bA\\wt{\\bx} = \\bb + \\cbpurp{\\br}"}</M>
            </>
          }
        >
          <MD>{"(\\bA + \\cblue{\\bDelta\\bA})\\,\\wt{\\bx} = \\bA\\wt{\\bx} - \\cbpurp{\\br} = \\bb + \\cbpurp{\\br} - \\cbpurp{\\br} = \\bb"}</MD>
        </PStep>
        <PStep
          why={
            <>
              für Rang-1-Matrizen gilt{" "}
              <M>{"\\left\\|\\bu\\bv^\\top\\right\\|_2 = \\left\\|\\bu\\right\\|_2 \\left\\|\\bv\\right\\|_2"}</M>:
              wegen <M>{"(\\bu\\bv^\\top)\\bx = (\\bv^\\top\\bx)\\,\\bu"}</M> wird{" "}
              <M>{"\\left\\|(\\bu\\bv^\\top)\\bx\\right\\|_2 = |\\bv^\\top\\bx| \\left\\|\\bu\\right\\|_2"}</M>{" "}
              nach <ConceptLink id="cauchy-schwarz-inequality">Cauchy-Schwarz</ConceptLink>{" "}
              maximal für <M>{"\\bx = \\bv / \\left\\|\\bv\\right\\|_2"}</M>
            </>
          }
        >
          <MD>{"\\left\\|\\cblue{\\bDelta\\bA}\\right\\|_2 = \\frac{\\left\\|\\cbpurp{\\br}\\,\\wt{\\bx}^\\top\\right\\|_2}{\\left\\|\\wt{\\bx}\\right\\|_2^2} = \\frac{\\left\\|\\cbpurp{\\br}\\right\\|_2 \\left\\|\\wt{\\bx}\\right\\|_2}{\\left\\|\\wt{\\bx}\\right\\|_2^2} = \\frac{\\left\\|\\cbpurp{\\br}\\right\\|_2}{\\left\\|\\wt{\\bx}\\right\\|_2}"}</MD>
        </PStep>
        <PStep why={<>beide Seiten durch <M>{"\\left\\|\\bA\\right\\|_2"}</M> teilen</>}>
          <MD>{"\\frac{\\left\\|\\cblue{\\bDelta\\bA}\\right\\|_2}{\\left\\|\\bA\\right\\|_2} = \\frac{\\left\\|\\cbpurp{\\br}\\right\\|_2}{\\left\\|\\bA\\right\\|_2 \\cdot \\left\\|\\wt{\\bx}\\right\\|_2}"}</MD>
        </PStep>
      </Proof>
      <p>
        Lesen wir das Resultat noch einmal in Ruhe. Links steht die <em>relative Störung des
        Problems</em>, die nötig wäre, damit unsere Näherung exakt richtig ist. Rechts stehen
        nur Größen, die wir nach der Rechnung kennen: das Residuum{" "}
        <M>{"\\cbpurp{\\br}"}</M> und die Normen von <M>{"\\bA"}</M> und{" "}
        <M>{"\\wt{\\bx}"}</M>. Matrixnormen machen den Rückwärtsfehler also <em>berechenbar</em>:
        Ein kleines relatives Residuum bedeutet, dass <M>{"\\wt{\\bx}"}</M> die exakte Lösung
        eines nur winzig gestörten Systems ist. Wie weit <M>{"\\wt{\\bx}"}</M> dann von der
        wahren Lösung entfernt sein kann, entscheidet die Konditionszahl aus Definition 3.5.10.
        Als Faustregel gilt: Vorwärtsfehler <M>{"\\lesssim \\kappa(\\bA) \\times"}</M>{" "}
        Rückwärtsfehler. Normen quantifizieren beide Seiten dieser Rechnung.
      </p>

      <h3 className="mb-2 mt-8 text-xl font-semibold">Selbsttest</h3>
      <ul className="max-w-prose list-none space-y-4 pl-0">
        <Frage
          q={
            <>
              Gilt <M>{"\\left\\|\\bA^2\\right\\| \\le \\left\\|\\bA\\right\\|^2"}</M> für{" "}
              <em>jede</em> Matrixnorm?
            </>
          }
        >
          <p>
            Nein, das gilt nur für submultiplikative Normen. Die Maximumsnorm liefert ein
            Gegenbeispiel: Für die Einsermatrix aus Beispiel 3.5.6 ist{" "}
            <M>{"\\left\\|\\bA^2\\right\\|_M = 2 > 1 = \\left\\|\\bA\\right\\|_M^2"}</M>.
            Operator- und Schatten-Normen (also auch Spektral-, Frobenius- und Nuklearnorm)
            erfüllen die Ungleichung dagegen immer.
          </p>
        </Frage>
        <Frage
          q={
            <>
              Sei <M>{"\\bQ"}</M> eine Orthogonalmatrix. Was ist{" "}
              <M>{"\\kappa_2(\\bQ)"}</M>?
            </>
          }
        >
          <p>
            <M>{"\\kappa_2(\\bQ) = 1"}</M>. Wegen{" "}
            <M>{"\\left\\|\\bQ\\bx\\right\\|_2 = \\left\\|\\bx\\right\\|_2"}</M> für alle{" "}
            <M>{"\\bx"}</M> ist <M>{"\\left\\|\\bQ\\right\\|_2 = 1"}</M>; und{" "}
            <M>{"\\bQ^{-1} = \\bQ^\\top"}</M> ist selbst orthogonal, also auch{" "}
            <M>{"\\left\\|\\bQ^{-1}\\right\\|_2 = 1"}</M>. Orthogonalmatrizen sind perfekt
            konditioniert – ein Hauptgrund, warum numerische Verfahren so gerne mit ihnen
            arbeiten.
          </p>
        </Frage>
        <Frage
          q={
            <>
              Für die Einheitsmatrix gilt <M>{"\\left\\|\\bI_n\\right\\|_2 = 1"}</M>, aber{" "}
              <M>{"\\left\\|\\bI_n\\right\\|_F = \\sqrt{n}"}</M>. Widerspricht das der
              Normenäquivalenz (Satz 3.5.1)? Und was sagt uns das Beispiel über die Konstante{" "}
              <M>{"\\sqrt{\\min(m,n)}"}</M> aus Beispiel 3.5.2?
            </>
          }
        >
          <p>
            Kein Widerspruch: Satz 3.5.1 gilt bei <em>festen</em> Dimensionen, und die
            Konstanten dürfen von <M>{"m, n"}</M> abhängen. Das Beispiel zeigt sogar, dass die
            Konstante scharf ist: <M>{"\\bI_n"}</M> erfüllt{" "}
            <M>{"\\left\\|\\bI_n\\right\\|_F = \\sqrt{n} = \\sqrt{\\min(n,n)} \\cdot \\left\\|\\bI_n\\right\\|_2"}</M>;{" "}
            die obere Schranke aus Beispiel 3.5.2 wird hier mit Gleichheit angenommen, besser
            geht es also nicht.
          </p>
        </Frage>
      </ul>

      <p className="italic">Vertiefung: Heath §2.3.</p>
    </div>
  );
}
