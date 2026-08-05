import type { ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S34SchattenWidget } from "./widgets/S34SchattenWidget";

/** Selbsttest-Frage mit aufklappbarer Lösung (Muster aus Kapitel 1). */
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
 * Abschnitt 3.4 — Schattennormen.
 * Quelle: Folien 03-matrix-spur-norm.Rmd, Block „Schattennormen" (Definition
 * über Singulärwerte, Spezialfälle Nuklear-/Frobenius-/Spektralnorm, unitäre
 * Invarianz, Frobenius-Spur-Verbindung). Prosa eigenständig formuliert.
 */
export function S34() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 03-matrix-spur-norm, „Schattennormen".
      </p>
      <p>
        Wir kennen inzwischen zwei Rezepte für Matrixnormen. Die elementweisen Normen aus{" "}
        <a className="underline" href="#sec-3.2">Abschnitt 3.2</a> behandeln die Matrix als
        Zahlenhaufen und verlieren dabei jede Information über die Transformation, die sie
        beschreibt. Die Operatornormen aus{" "}
        <a className="underline" href="#sec-3.3">Abschnitt 3.3</a> messen die Transformation
        direkt — aber nur ihre <em>stärkste</em> Streckung. Eine Matrix streckt verschiedene
        Richtungen jedoch verschieden stark, und diese vollständige Streckungsinformation
        steckt in <em>allen</em>{" "}
        <ConceptLink id="eigenvalue-eigenvector">Eigenwerten</ConceptLink> von{" "}
        <M>{"\\bA^\\top\\bA"}</M>, nicht nur im größten. Die dritte Normfamilie dieses
        Kapitels nutzt sie alle.
      </p>

      <h3 id="sec-3.4.1" className="mb-2 mt-8 text-xl font-semibold">
        3.4.1 Von Eigenwerten zu Singulärwerten
      </h3>
      <p>
        Erinnern wir uns an den Satz über die Spektralnorm aus{" "}
        <a className="underline" href="#sec-3.3">Abschnitt 3.3</a>: Dort war{" "}
        <M>{"\\left\\| \\bA \\right\\|_2 = \\sqrt{\\lambda_{\\max}(\\bA^\\top\\bA)}"}</M>. Die
        Matrix <M>{"\\bA^\\top\\bA"}</M> ist{" "}
        <ConceptLink id="symmetric-matrix">symmetrisch</ConceptLink>, ihre Eigenwerte sind also
        reell — und sogar nie negativ, denn{" "}
        <M>{"\\bx^\\top\\bA^\\top\\bA\\bx = \\left\\| \\bA\\bx \\right\\|_2^2 \\geq 0"}</M>{" "}
        für alle <M>{"\\bx"}</M> (die Matrix ist{" "}
        <ConceptLink id="positive-definite">positiv semidefinit</ConceptLink>). Wir dürfen
        daher aus allen Eigenwerten die Wurzel ziehen:
      </p>
      <MD>{"\\sigma_i := \\sqrt{\\lambda_i}, \\qquad \\lambda_1 \\geq \\lambda_2 \\geq \\cdots \\geq \\lambda_n \\geq 0 \\text{ Eigenwerte von } \\bA^\\top\\bA."}</MD>
      <p>
        Diese Zahlen <M>{"\\sigma_1 \\geq \\cdots \\geq \\sigma_n \\geq 0"}</M> heißen die{" "}
        <em>Singulärwerte</em> (singular values) von <M>{"\\bA"}</M>. Geometrisch sind sie die
        Halbachsenlängen der Ellipse, in die <M>{"\\bA"}</M> die Einheitssphäre abbildet:{" "}
        <M>{"\\sigma_1"}</M> ist die stärkste Streckung (die Spektralnorm!),{" "}
        <M>{"\\sigma_n"}</M> die schwächste. Systematisch entwickeln wir das später mit der{" "}
        <ConceptLink id="singular-value-decomposition">Singulärwertzerlegung</ConceptLink>;
        hier genügt uns: Der Vektor <M>{"(\\sigma_1, \\ldots, \\sigma_n)"}</M> ist der
        vollständige „Streckungs-Fingerabdruck" der Transformation. Auf diesen Vektor wenden
        wir jetzt eine <ConceptLink id="norm">Vektornorm</ConceptLink> an:
      </p>
      <EnvBlock kind="Definition" label="3.4.1 (Schatten-p-Norm)">
        <p>
          Sei <M>{"\\bA \\in \\R^{m \\times n}"}</M>, und sei{" "}
          <M>{"\\blambda = (\\lambda_1, \\ldots, \\lambda_n)"}</M> der Vektor der Eigenwerte
          von <M>{"\\bA^\\top\\bA"}</M>. Die <em>Schatten-p-Norm</em> von <M>{"\\bA"}</M> ist
          für <M>{"1 \\leq p < \\infty"}</M>
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_{S,p} := \\left\\| \\blambda^{1/2} \\right\\|_p = \\left( \\sum_{i=1}^n \\lambda_i^{p/2} \\right)^{1/p} = \\left( \\sum_{i=1}^n \\sigma_i^p \\right)^{1/p}"}</MD>
        <p>
          und für <M>{"p = \\infty"}</M>
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_{S,\\infty} := \\max_{1 \\leq i \\leq n} \\sigma_i = \\sigma_1."}</MD>
      </EnvBlock>
      <EnvBlock kind="Bemerkung" label="3.4.2">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Das Bauprinzip ist dasselbe wie bei der Vektorisierung in{" "}
            <a className="underline" href="#sec-3.2">Abschnitt 3.2</a>: „Wende eine
            Vektor-p-Norm an." Nur wenden wir sie nicht auf die rohen Einträge{" "}
            <M>{"\\vec(\\bA)"}</M> an, sondern auf den Singulärwertvektor — also auf die
            geometrische Wirkung der Matrix statt auf ihre Zahlen.
          </li>
          <li>
            Der Fall <M>{"p = \\infty"}</M> fügt sich nahtlos ein: Wie bei Vektornormen ist
            die Maximumsnorm der Grenzwert der <M>{"p"}</M>-Normen für{" "}
            <M>{"p \\to \\infty"}</M>.
          </li>
          <li>
            Schatten-p-Normen erfüllen tatsächlich alle drei Normaxiome aus{" "}
            <a className="underline" href="#sec-3.2">Abschnitt 3.2</a>. Definitheit und
            absolute Homogenität lassen sich direkt nachrechnen; die Dreiecksungleichung ist
            überraschend knifflig, wir verzichten hier auf den Beweis.
          </li>
        </ul>
      </EnvBlock>

      <h3 id="sec-3.4.2" className="mb-2 mt-8 text-xl font-semibold">
        3.4.2 Die drei wichtigen Spezialfälle
      </h3>
      <p>
        Drei Werte von <M>{"p"}</M> liefern genau die Normen, die in der Praxis dominieren —
        und zwei davon kennen wir schon. Der Schlüssel zum überraschendsten Fall ist die
        Verbindung zwischen Frobenius-Norm und{" "}
        <a className="underline" href="#sec-3.1">Spur</a>:
      </p>
      <EnvBlock kind="Satz" label="3.4.3 (Frobenius-Norm und Spur)">
        <p>
          Für <M>{"\\bA \\in \\R^{m \\times n}"}</M> mit{" "}
          <ConceptLink id="rank">Rang</ConceptLink> <M>{"r"}</M> und Eigenwerten{" "}
          <M>{"\\lambda_1 \\geq \\cdots \\geq \\lambda_r > 0"}</M> von{" "}
          <M>{"\\bA^\\top\\bA"}</M> (alle übrigen sind null) gilt
        </p>
        <MD>{"\\cblue{\\left\\| \\bA \\right\\|_F^2} = \\cred{\\tr\\left(\\bA^\\top\\bA\\right)} = \\cgreen{\\sum_{i=1}^r \\lambda_i}."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              Der Diagonaleintrag <M>{"(\\bA^\\top\\bA)_{jj}"}</M> ist das Skalarprodukt der{" "}
              <M>{"j"}</M>-ten Spalte von <M>{"\\bA"}</M> mit sich selbst, also{" "}
              <M>{"\\sum_{i=1}^m a_{ij}^2"}</M>; Aufsummieren über alle <M>{"j"}</M> ergibt
              die Summe aller quadrierten Einträge — genau die quadrierte Frobenius-Norm aus{" "}
              <a className="underline" href="#sec-3.2">Abschnitt 3.2</a>
            </>
          }
        >
          <MD>{"\\cred{\\tr\\left(\\bA^\\top\\bA\\right)} = \\sum_{j=1}^n \\left(\\bA^\\top\\bA\\right)_{jj} = \\sum_{j=1}^n \\sum_{i=1}^m a_{ij}^2 = \\cblue{\\left\\| \\bA \\right\\|_F^2}"}</MD>
        </PStep>
        <PStep
          why={
            <>
              Spektralzerlegung <M>{"\\bA^\\top\\bA = \\bP\\bLambda\\bP^\\top"}</M> mit{" "}
              <ConceptLink id="orthogonal-matrix">orthogonalem</ConceptLink> <M>{"\\bP"}</M>{" "}
              und <M>{"\\bLambda = \\diag(\\lambda_1, \\ldots, \\lambda_r, 0, \\ldots, 0)"}</M>;
              dann Zyklizität der Spur aus{" "}
              <a className="underline" href="#sec-3.1">Abschnitt 3.1</a> und{" "}
              <M>{"\\bP^\\top\\bP = \\bI"}</M>
            </>
          }
        >
          <MD>{"\\cred{\\tr\\left(\\bA^\\top\\bA\\right)} = \\tr\\left(\\bP\\bLambda\\bP^\\top\\right) = \\tr\\left(\\bLambda\\bP^\\top\\bP\\right) = \\tr(\\bLambda) = \\cgreen{\\sum_{i=1}^r \\lambda_i}"}</MD>
        </PStep>
      </Proof>
      <p>
        Damit fallen die Spezialfälle wie reife Früchte:
      </p>
      <EnvBlock kind="Korollar" label="3.4.4 (Spezialfälle der Schatten-p-Norm)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <M>{"p = \\infty"}</M>:{" "}
            <M>{"\\left\\| \\bA \\right\\|_{S,\\infty} = \\sigma_1 = \\sqrt{\\lambda_{\\max}} = \\left\\| \\bA \\right\\|_2"}</M>{" "}
            — die <strong>Spektralnorm</strong> aus{" "}
            <a className="underline" href="#sec-3.3">Abschnitt 3.3</a>.
          </li>
          <li>
            <M>{"p = 2"}</M>:{" "}
            <M>{"\\left\\| \\bA \\right\\|_{S,2} = \\left(\\sum_{i} \\lambda_i\\right)^{1/2} = \\sqrt{\\tr\\left(\\bA^\\top\\bA\\right)} = \\left\\| \\bA \\right\\|_F"}</M>{" "}
            — die <strong>Frobenius-Norm</strong> (nach Satz 3.4.3).
          </li>
          <li>
            <M>{"p = 1"}</M>:{" "}
            <M>{"\\left\\| \\bA \\right\\|_{S,1} = \\sum_{i=1}^r \\sigma_i =: \\left\\| \\bA \\right\\|_*"}</M>{" "}
            — die <em>Nuklearnorm</em> (nuclear norm), für uns neu.
          </li>
        </ul>
      </EnvBlock>
      <p>
        Der Fall <M>{"p = 2"}</M> ist eine echte Überraschung. Die Frobenius-Norm hatten wir
        in <a className="underline" href="#sec-3.2">Abschnitt 3.2</a> als elementweise Norm
        eingeführt — als Musterbeispiel einer Norm, die von der Transformation nichts weiß.
        Jetzt stellt sich heraus: Sie ist zugleich eine Schatten-Norm, also vollständig durch
        die Singulärwerte bestimmt. Sie weiß mehr über die Transformation, als ihre Definition
        vermuten lässt — das erklärt auch im Nachhinein das Beispiel aus Abschnitt 3.2, in dem
        drei völlig verschiedene Transformationen dieselbe Frobenius-Norm hatten: Ihre
        quadrierten Singulärwerte summierten sich jeweils zu <M>{"2"}</M>.
      </p>
      <EnvBlock kind="Bemerkung" label="3.4.5 (Nuklearnorm und Niedrigrang-Probleme)">
        <p>
          Warum eine dritte Norm, wenn wir schon zwei haben? Der{" "}
          <ConceptLink id="rank">Rang</ConceptLink> von <M>{"\\bA"}</M> ist die Anzahl der
          Singulärwerte <M>{"\\sigma_i > 0"}</M>. Rang-Minimierung ist ein kombinatorisch
          schwieriges Problem — die Nuklearnorm <M>{"\\sum_i \\sigma_i"}</M> ist dagegen
          konvex und wird klein, wenn viele Singulärwerte (nahezu) verschwinden. Sie dient
          deshalb in Statistik und maschinellem Lernen als gutmütiger Ersatz für den Rang,
          etwa bei der{" "}
          <ConceptLink id="low-rank-approximation">Niedrigrang-Approximation</ConceptLink>{" "}
          und beim Vervollständigen von Matrizen mit fehlenden Einträgen
          (Empfehlungssysteme).
        </p>
      </EnvBlock>
      <p>
        Rechnen wir die drei Normen einmal konkret aus — für die Matrix, deren Streckung wir
        in <a className="underline" href="#sec-3.3">Abschnitt 3.3</a> visualisiert haben.
      </p>
      <EnvBlock kind="Beispiel" label="3.4.6">
        <p>
          Sei{" "}
          <M>{"\\bA = \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix}"}</M>. Zuerst die
          Eigenwerte von <M>{"\\bA^\\top\\bA"}</M>:
        </p>
        <MD>{"\\bA^\\top\\bA = \\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix}\\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 4 & 2 \\\\ 2 & 2 \\end{pmatrix},"}</MD>
        <MD>{"\\det\\left(\\bA^\\top\\bA - \\lambda\\bI\\right) = (4 - \\lambda)(2 - \\lambda) - 4 = \\lambda^2 - 6\\lambda + 4 \\overset{!}{=} 0"}</MD>
        <MD>{"\\quimpl \\cred{\\lambda_1} = 3 + \\sqrt{5} \\approx 5{,}236, \\qquad \\cblue{\\lambda_2} = 3 - \\sqrt{5} \\approx 0{,}764."}</MD>
        <p>Die Singulärwerte sind die Wurzeln daraus:</p>
        <MD>{"\\cred{\\sigma_1} = \\sqrt{3 + \\sqrt{5}} \\approx 2{,}288, \\qquad \\cblue{\\sigma_2} = \\sqrt{3 - \\sqrt{5}} \\approx 0{,}874."}</MD>
        <p>
          <strong>Spektralnorm</strong> (<M>{"p = \\infty"}</M>): der größte Singulärwert,
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_{S,\\infty} = \\cred{\\sigma_1} \\approx 2{,}288."}</MD>
        <p>
          <strong>Frobenius-Norm</strong> (<M>{"p = 2"}</M>): über die Singulärwerte und —
          zur Probe — <span style={{ color: "#009E73" }}>elementweise</span>, beides muss
          nach Korollar 3.4.4 dasselbe ergeben:
        </p>
        <MD>{"\\left\\| \\bA \\right\\|_{S,2} = \\sqrt{\\cred{\\lambda_1} + \\cblue{\\lambda_2}} = \\sqrt{6}, \\qquad \\cgreen{\\sqrt{2^2 + 1^2 + 0^2 + 1^2}} = \\sqrt{6} \\approx 2{,}449. \\quad \\checkmark"}</MD>
        <p>
          <strong>Nuklearnorm</strong> (<M>{"p = 1"}</M>): die Summe{" "}
          <M>{"\\cred{\\sigma_1} + \\cblue{\\sigma_2} \\approx 3{,}162"}</M> — hier sogar mit
          geschlossener Form, denn
        </p>
        <MD>{"\\left(\\cred{\\sigma_1} + \\cblue{\\sigma_2}\\right)^2 = \\cred{\\lambda_1} + \\cblue{\\lambda_2} + 2\\sqrt{\\cred{\\lambda_1}\\cblue{\\lambda_2}} = 6 + 2\\sqrt{\\det\\left(\\bA^\\top\\bA\\right)} = 6 + 2\\sqrt{4} = 10,"}</MD>
        <MD>{"\\text{also} \\quad \\left\\| \\bA \\right\\|_{S,1} = \\sqrt{10} \\approx 3{,}162."}</MD>
        <p>
          Dabei haben wir benutzt, dass das Produkt der Eigenwerte die{" "}
          <ConceptLink id="determinant">Determinante</ConceptLink> ist:{" "}
          <M>{"\\cred{\\lambda_1}\\cblue{\\lambda_2} = \\det\\left(\\bA^\\top\\bA\\right) = 4 \\cdot 2 - 2 \\cdot 2 = 4"}</M>.
          In R genügt für die Singulärwerte ein Einzeiler:
        </p>
        <pre className="max-w-prose overflow-x-auto rounded bg-slate-200/70 p-3 font-mono text-sm dark:bg-slate-900/60">
          <code>{"A <- matrix(c(2, 0, 1, 1), 2, 2)\nsqrt(eigen(crossprod(A))$values)\n#> [1] 2.288246 0.874032"}</code>
        </pre>
      </EnvBlock>

      <h3 id="sec-3.4.3" className="mb-2 mt-8 text-xl font-semibold">
        3.4.3 Unitäre Invarianz
      </h3>
      <p>
        Was macht die Schatten-Familie so besonders? Drehen wir eine Matrix — genauer:
        multiplizieren wir sie mit einer{" "}
        <ConceptLink id="orthogonal-matrix">Orthogonalmatrix</ConceptLink> —, dann ändern
        sich ihre Einträge komplett. Elementweise Normen wie Summen- oder Maximumsnorm ändern
        sich mit. Die Streckungswirkung der Transformation bleibt aber dieselbe, nur die
        Richtungen rotieren. Da Schattennormen ausschließlich von den Streckungsfaktoren
        abhängen, dürfen sie sich nicht ändern — und genau das lässt sich beweisen:
      </p>
      <EnvBlock kind="Satz" label="3.4.7 (Unitäre Invarianz)">
        <p>
          Seien <M>{"\\bP \\in \\R^{m \\times m}"}</M> und <M>{"\\bQ \\in \\R^{n \\times n}"}</M>{" "}
          orthogonal. Dann gilt für alle <M>{"\\bA \\in \\R^{m \\times n}"}</M> und alle{" "}
          <M>{"p \\in [1, \\infty]"}</M>:
        </p>
        <MD>{"\\left\\| \\bP\\bA\\bQ \\right\\|_{S,p} = \\left\\| \\bA \\right\\|_{S,p}."}</MD>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              <ConceptLink id="transpose">Transponierregel</ConceptLink>{" "}
              <M>{"(\\bB\\bC)^\\top = \\bC^\\top\\bB^\\top"}</M> und Orthogonalität{" "}
              <M>{"\\bP^\\top\\bP = \\bI"}</M>
            </>
          }
        >
          <MD>{"(\\bP\\bA\\bQ)^\\top(\\bP\\bA\\bQ) = \\bQ^\\top\\bA^\\top\\bP^\\top\\bP\\bA\\bQ = \\bQ^\\top\\left(\\bA^\\top\\bA\\right)\\bQ"}</MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"\\bQ^\\top = \\bQ^{-1}"}</M>, also ist{" "}
              <M>{"\\bQ^\\top\\left(\\bA^\\top\\bA\\right)\\bQ"}</M>{" "}
              <ConceptLink id="similar-matrices">ähnlich</ConceptLink> zu{" "}
              <M>{"\\bA^\\top\\bA"}</M>, und ähnliche Matrizen haben dasselbe
              charakteristische Polynom:{" "}
              <M>{"\\det\\left(\\bQ^\\top\\bM\\bQ - \\lambda\\bI\\right) = \\det\\left(\\bQ^\\top(\\bM - \\lambda\\bI)\\bQ\\right) = \\det(\\bM - \\lambda\\bI)"}</M>
            </>
          }
        >
          <p>
            <M>{"(\\bP\\bA\\bQ)^\\top(\\bP\\bA\\bQ)"}</M> und <M>{"\\bA^\\top\\bA"}</M> haben
            dieselben Eigenwerte <M>{"\\lambda_1, \\ldots, \\lambda_n"}</M>.
          </p>
        </PStep>
        <PStep
          why={
            <>
              Schatten-p-Normen hängen nach Definition 3.4.1 nur vom Eigenwertvektor{" "}
              <M>{"\\blambda"}</M> ab
            </>
          }
        >
          <p>
            Also haben <M>{"\\bP\\bA\\bQ"}</M> und <M>{"\\bA"}</M> dieselben Singulärwerte
            und damit dieselbe Schatten-p-Norm — für jedes <M>{"p"}</M> gleichzeitig.
          </p>
        </PStep>
      </Proof>
      <p>
        Eine bemerkenswerte Konsequenz für die Frobenius-Norm: Ihrer elementweisen Definition
        sieht man die Invarianz{" "}
        <M>{"\\left\\| \\bP\\bA\\bQ \\right\\|_F = \\left\\| \\bA \\right\\|_F"}</M>{" "}
        überhaupt nicht an — erst der Umweg über Korollar 3.4.4 macht sie offensichtlich. Für
        Summen- und Maximumsnorm gilt nichts dergleichen.
      </p>
      <EnvBlock kind="Bemerkung" label="3.4.8 (Namensgeber und Anwendung)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Benannt sind die Normen nach dem Mathematiker <em>Robert Schatten</em>{" "}
            (1911–1977), der sie im Kontext unendlichdimensionaler Operatoren untersuchte.
          </li>
          <li>
            Die unitäre Invarianz macht Schattennormen zum Werkzeug der Wahl für{" "}
            <em>Approximationsprobleme</em>: Wie gut eine Matrix eine andere approximiert,
            sollte nicht davon abhängen, in welchem (orthogonalen) Koordinatensystem wir die
            Daten aufschreiben. Messen wir Approximationsfehler in einer Schatten-Norm, ist
            genau das garantiert — darauf kommen wir bei der Niedrigrang-Approximation
            zurück.
          </li>
        </ul>
      </EnvBlock>
      <ExpandedReading title="Singulärwerte und Schattennormen einer 2×2-Matrix — live">
        <S34SchattenWidget />
      </ExpandedReading>

      <h3 className="mb-2 mt-8 text-xl font-semibold">Selbsttest</h3>
      <ul className="max-w-prose list-disc space-y-3 pl-5">
        <Frage
          q={
            <>
              Sei <M>{"\\bQ \\in \\R^{n \\times n}"}</M> orthogonal. Was sind die
              Singulärwerte von <M>{"\\bQ"}</M> — und damit ihre Spektral-, Frobenius- und
              Nuklearnorm?
            </>
          }
        >
          <p>
            Wegen <M>{"\\bQ^\\top\\bQ = \\bI"}</M> sind alle Eigenwerte von{" "}
            <M>{"\\bQ^\\top\\bQ"}</M> gleich <M>{"1"}</M>, also{" "}
            <M>{"\\sigma_1 = \\cdots = \\sigma_n = 1"}</M>. Damit ist{" "}
            <M>{"\\left\\| \\bQ \\right\\|_{S,\\infty} = 1"}</M>,{" "}
            <M>{"\\left\\| \\bQ \\right\\|_{S,2} = \\sqrt{n}"}</M> und{" "}
            <M>{"\\left\\| \\bQ \\right\\|_{S,1} = n"}</M>. Das passt zu{" "}
            <a className="underline" href="#sec-3.2">Abschnitt 3.2</a>: Auch dort war{" "}
            <M>{"\\left\\| \\bI_n \\right\\|_F = \\sqrt{n}"}</M> — nur die Spektralnorm
            honoriert, dass eine Orthogonalmatrix „nichts streckt".
          </p>
        </Frage>
        <Frage
          q={
            <>
              Warum kann man die Nuklearnorm als „weiche" Version des Rangs auffassen?
            </>
          }
        >
          <p>
            Der Rang ist die <em>Anzahl</em> der Singulärwerte <M>{"\\sigma_i > 0"}</M> —
            eine Zählgröße, die springt, sobald ein Singulärwert exakt null wird, und die
            sich deshalb schlecht optimieren lässt. Die Nuklearnorm{" "}
            <M>{"\\sum_i \\sigma_i"}</M> ersetzt das Zählen durch Summieren: Sie ist als Norm
            konvex und wird genau dann klein, wenn viele Singulärwerte nahe null liegen —
            also wenn die Matrix „fast niedrigen Rang" hat.
          </p>
        </Frage>
      </ul>

      <p className="italic">
        Vertiefung: MML §4.5 (SVD-Bezug: dort werden die Singulärwerte, auf denen die
        Schattennormen aufbauen, über die Singulärwertzerlegung systematisch entwickelt).
      </p>
    </div>
  );
}
