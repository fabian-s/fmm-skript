import { useState, type ReactNode } from "react";
import { ConceptLink, EnvBlock, M, MD } from "../../lib";

/**
 * Abschnitt 3.6 – Zusammenfassung.
 * Quelle: Folien 03-matrix-spur-norm.Rmd, Block „Zusammenfassung" (Quiz-Folien,
 * Kernkonzepte Spur/Normen, ML-Verbindung, Rechenaufwand). Prosa eigenständig
 * aus den Folien formuliert; bewusst schlank gehalten.
 */

type QuizItem = { statement: ReactNode; wahr: boolean; expl: ReactNode };

function WahrFalschQuiz({ items }: { items: QuizItem[] }) {
  const [chosen, setChosen] = useState<(boolean | null)[]>(items.map(() => null));
  const pick = (i: number, v: boolean) =>
    setChosen((c) => c.map((old, j) => (i === j ? v : old)));
  return (
    <div className="space-y-3">
      {items.map((q, i) => {
        const c = chosen[i];
        const answered = c !== null;
        const correct = answered && c === q.wahr;
        return (
          <div key={i} className="rounded border border-slate-200 p-3 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grow">{q.statement}</span>
              <span className="flex gap-2">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      answered && c === v
                        ? correct
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                        : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
                    }`}
                    onClick={() => pick(i, v)}
                  >
                    {v ? "wahr" : "falsch"}
                  </button>
                ))}
              </span>
            </div>
            {answered && (
              <p
                className={`mt-2 text-sm ${
                  correct
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {correct ? "Richtig! " : `Leider nein, die Aussage ist ${q.wahr ? "wahr" : "falsch"}. `}
                <span className="text-slate-600 dark:text-slate-300">{q.expl}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Frage({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <div>{q}</div>
      <details className="rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40">
        <summary className="cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300">
          Lösung anzeigen
        </summary>
        <div className="space-y-2 pt-1.5">{children}</div>
      </details>
    </div>
  );
}

const SPUR_QUIZ: QuizItem[] = [
  {
    statement: (
      <M>{"\\tr(\\bA\\bB) = \\tr(\\bA) \\cdot \\tr(\\bB)"}</M>
    ),
    wahr: false,
    expl: (
      <>
        Die Spur ist mit dem Matrixprodukt nicht verträglich. Gegenbeispiel{" "}
        <M>{"\\bA = \\bB = \\bI_2"}</M>: links steht{" "}
        <M>{"\\tr(\\bI_2) = 2"}</M>, rechts <M>{"2 \\cdot 2 = 4"}</M>.
      </>
    ),
  },
  {
    statement: <M>{"\\tr(\\bA\\bB) = \\tr(\\bB\\bA)"}</M>,
    wahr: true,
    expl: (
      <>
        Das ist die zyklische Eigenschaft aus{" "}
        <a className="underline" href="#sec-3.1">Abschnitt 3.1</a>, die wichtigste Rechenregel
        der Spur.
      </>
    ),
  },
  {
    statement: <M>{"\\tr(\\bA^\\top) = -\\tr(\\bA)"}</M>,
    wahr: false,
    expl: (
      <>
        Transponieren spiegelt an der Diagonale und lässt die Diagonaleinträge unverändert; es
        gilt <M>{"\\tr(\\bA^\\top) = \\tr(\\bA)"}</M>, ohne Vorzeichenwechsel.
      </>
    ),
  },
  {
    statement: <M>{"\\tr(\\bI_n) = n"}</M>,
    wahr: true,
    expl: (
      <>
        Auf der Diagonale stehen <M>{"n"}</M> Einsen, also ist die Summe <M>{"n"}</M>.
      </>
    ),
  },
  {
    statement: (
      <>
        Ist <M>{"\\bA"}</M> invertierbar, so gilt{" "}
        <M>{"\\tr\\left(\\bA^{-1}\\right) = 1/\\tr(\\bA)"}</M>.
      </>
    ),
    wahr: false,
    expl: (
      <>
        Gegenbeispiel <M>{"\\bA = 2\\bI_2"}</M>: dann ist{" "}
        <M>{"\\bA^{-1} = \\tfrac{1}{2}\\bI_2"}</M>, also{" "}
        <M>{"\\tr\\left(\\bA^{-1}\\right) = 1"}</M>, aber{" "}
        <M>{"1/\\tr(\\bA) = \\tfrac{1}{4}"}</M>.
      </>
    ),
  },
];

export function S36() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 03-matrix-spur-norm, „Zusammenfassung".
      </p>
      <p>
        Fassen wir das Kapitel zusammen. Der rote Faden war die Frage, wie wir die „Größe" einer
        Matrix messen, und zwar so, dass die Zahl etwas über die{" "}
        <ConceptLink id="linear-transformation">lineare Abbildung</ConceptLink>{" "}
        <M>{"\\bx \\mapsto \\bA\\bx"}</M> aussagt, nicht nur über die Einträge. Als Werkzeuge
        haben wir die Spur als skalare Invariante und drei Familien von Matrixnormen
        kennengelernt.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Die Konzepte im Überblick</h3>
      <div className="max-w-prose overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr className="border-b border-slate-300 text-left dark:border-slate-600">
              <th className="py-1 pr-6">Konzept</th>
              <th className="py-1 pr-6">Kernaussage</th>
              <th className="py-1">Abschnitt</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">Spur</td>
              <td className="py-1 pr-6">
                <M>{"\\tr(\\bA) = \\sumin a_{ii}"}</M>; linear, zyklisch (
                <M>{"\\tr(\\bA\\bB) = \\tr(\\bB\\bA)"}</M>) und damit ähnlichkeitsinvariant;
                gleich der Summe der{" "}
                <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> (Koeffizient
                des charakteristischen Polynoms)
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-3.1">3.1</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">Matrixnorm</td>
              <td className="py-1 pr-6">
                dieselben Axiome wie bei <ConceptLink id="norm">Vektornormen</ConceptLink>:
                Definitheit, absolute Homogenität, Dreiecksungleichung
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-3.2">3.2</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">elementweise Normen</td>
              <td className="py-1 pr-6">
                Vektornorm auf <M>{"\\vec(\\bA)"}</M>:{" "}
                <M>{"\\left\\|\\bA\\right\\|_F, \\left\\|\\bA\\right\\|_S, \\left\\|\\bA\\right\\|_M"}</M>;{" "}
                billig, aber blind für die Transformation
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-3.2">3.2</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">Operatornormen</td>
              <td className="py-1 pr-6">
                maximale Streckung{" "}
                <M>{"\\max_{\\bx \\neq \\bnull} \\left\\|\\bA\\bx\\right\\|_V / \\left\\|\\bx\\right\\|_V"}</M>
                : Spaltensummennorm <M>{"\\left\\|\\bA\\right\\|_1"}</M>, Spektralnorm{" "}
                <M>{"\\left\\|\\bA\\right\\|_2"}</M>, Zeilensummennorm{" "}
                <M>{"\\left\\|\\bA\\right\\|_\\infty"}</M>
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-3.3">3.3</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">Schatten-p-Normen</td>
              <td className="py-1 pr-6">
                <M>{"p"}</M>-Norm des Vektors der Wurzeln der Eigenwerte von{" "}
                <M>{"\\bA^\\top\\bA"}</M>; invariant unter{" "}
                <ConceptLink id="orthogonal-matrix">orthogonalen Transformationen</ConceptLink>
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-3.4">3.4</a>
              </td>
            </tr>
            <tr>
              <td className="py-1 pr-6">Eigenschaften</td>
              <td className="py-1 pr-6">
                Normäquivalenz, Submultiplikativität (
                <M>{"\\left\\|\\bA\\bB\\right\\| \\le \\left\\|\\bA\\right\\| \\left\\|\\bB\\right\\|"}</M>
                ), Verträglichkeit mit Vektornormen
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-3.5">3.5</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Die drei Familien sind dabei kein loses Nebeneinander, sondern eng verwoben. Die
        Frobenius-Norm gehört gleich zwei Familien an: Sie ist elementweise Norm (die{" "}
        <ConceptLink id="euclidean-norm">euklidische Norm</ConceptLink> von{" "}
        <M>{"\\vec(\\bA)"}</M>) und zugleich die Schatten-Norm mit <M>{"p = 2"}</M>. Die
        Brücke schlägt die Spur:{" "}
        <M>{"\\left\\|\\bA\\right\\|_F^2 = \\tr\\left(\\bA^\\top\\bA\\right)"}</M>. Und die
        Spektralnorm verbindet Operator- und Schatten-Welt: Sie ist die von der euklidischen
        Norm induzierte Operatornorm <em>und</em> die Schatten-Norm mit{" "}
        <M>{"p = \\infty"}</M>, berechenbar als{" "}
        <M>{"\\left\\|\\bA\\right\\|_2 = \\sqrt{\\lambda_{\\max}\\left(\\bA^\\top\\bA\\right)}"}</M>,{" "}
        der Anknüpfungspunkt zur{" "}
        <ConceptLink id="singular-value-decomposition">Singulärwertzerlegung</ConceptLink>,
        die uns später noch ausführlich beschäftigen wird.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Was kostet die Berechnung?</h3>
      <p>
        Für die Praxis ist entscheidend, wie teuer die einzelnen Normen sind. Spalten- und
        Zeilensummennorm sowie die Frobenius-Norm brauchen nur einen Durchlauf über alle
        Einträge. Spektral- und Nuklearnorm dagegen erfordern eine (partielle)
        Spektralzerlegung bzw. SVD; für sehr große Matrizen weichen wir deshalb auf
        approximative Verfahren aus.
      </p>
      <div className="max-w-prose overflow-x-auto">
        <table className="text-sm">
          <thead>
            <tr className="border-b border-slate-300 text-left dark:border-slate-600">
              <th className="py-1 pr-6">Norm</th>
              <th className="py-1 pr-6">Aufwand</th>
              <th className="py-1">Algorithmus</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6"><M>{"\\left\\|\\bA\\right\\|_1"}</M></td>
              <td className="py-1 pr-6"><M>{"O(mn)"}</M></td>
              <td className="py-1">Spaltensummen berechnen</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6"><M>{"\\left\\|\\bA\\right\\|_\\infty"}</M></td>
              <td className="py-1 pr-6"><M>{"O(mn)"}</M></td>
              <td className="py-1">Zeilensummen berechnen</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6"><M>{"\\left\\|\\bA\\right\\|_F"}</M></td>
              <td className="py-1 pr-6"><M>{"O(mn)"}</M></td>
              <td className="py-1">Quadratsumme aller Einträge</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6"><M>{"\\left\\|\\bA\\right\\|_2"}</M></td>
              <td className="py-1 pr-6"><M>{"O\\left(\\min\\left(m^2 n, m n^2\\right)\\right)"}</M></td>
              <td className="py-1">partielle SVD</td>
            </tr>
            <tr>
              <td className="py-1 pr-6"><M>{"\\left\\|\\bA\\right\\|_*"}</M></td>
              <td className="py-1 pr-6"><M>{"O\\left(\\min\\left(m^2 n, m n^2\\right)\\right)"}</M></td>
              <td className="py-1">SVD, dann Singulärwerte summieren</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EnvBlock kind="Bemerkung" label="3.6.1 (Ausblick: Normen als Regularisierer)">
        <p>
          Normen messen nicht nur Fehler: Im maschinellen Lernen steuern sie als Strafterme,{" "}
          <em>welche</em> Lösung ein Schätzproblem liefert. Drei prominente Beispiele, alle
          Varianten des <ConceptLink id="linear-least-squares">KQ-Problems</ConceptLink>:
        </p>
        <MD>{"\\text{Ridge: } \\min_{\\bx}\\, \\left\\|\\bA\\bx - \\bb\\right\\|_2^2 + \\lambda \\left\\|\\bx\\right\\|_2^2, \\qquad \\text{LASSO: } \\min_{\\bx}\\, \\left\\|\\bA\\bx - \\bb\\right\\|_2^2 + \\lambda \\left\\|\\bx\\right\\|_1,"}</MD>
        <MD>{"\\text{Matrix Completion: } \\min_{\\bX}\\, \\left\\|\\bP_\\Omega(\\bX) - \\bP_\\Omega(\\bM)\\right\\|_F^2 + \\lambda \\left\\|\\bX\\right\\|_*."}</MD>
        <p>
          Verschiedene Normen erzwingen verschiedene Lösungseigenschaften: Die{" "}
          <M>{"2"}</M>-Norm schrumpft alle Koeffizienten gleichmäßig, die <M>{"1"}</M>-Norm
          setzt viele exakt auf null, und die Nuklearnorm aus{" "}
          <a className="underline" href="#sec-3.4">Abschnitt 3.4</a> begünstigt Lösungen mit
          kleinem Rang (<ConceptLink id="low-rank-approximation">Niedrigrang-Approximation</ConceptLink>).
        </p>
      </EnvBlock>

      <h3 className="mt-6 text-lg font-semibold">Selbsttest</h3>
      <p>
        Prüfen wir zum Abschluss, ob die Kernaussagen sitzen. Welche der folgenden Aussagen
        über die Spur sind wahr (<M>{"\\bA, \\bB \\in \\R^{n \\times n}"}</M>)?
      </p>
      <div className="max-w-prose">
        <WahrFalschQuiz items={SPUR_QUIZ} />
      </div>
      <div className="max-w-prose">
        <Frage
          q={
            <>
              Berechnen wir für{" "}
              <M>{"\\bA = \\begin{pmatrix} 1 & 2 \\\\ 3 & 0 \\end{pmatrix}"}</M> die
              Spaltensummennorm <M>{"\\left\\|\\bA\\right\\|_1"}</M>, die Zeilensummennorm{" "}
              <M>{"\\left\\|\\bA\\right\\|_\\infty"}</M> und die Frobenius-Norm{" "}
              <M>{"\\left\\|\\bA\\right\\|_F"}</M>.
            </>
          }
        >
          <p>
            <strong>Spaltensummennorm:</strong> Die Beträge spaltenweise summieren; die{" "}
            <M>{"\\cred{\\text{erste Spalte}}"}</M> gewinnt:
          </p>
          <MD>{"\\left\\|\\bA\\right\\|_1 = \\max\\left\\{ \\cred{|1| + |3|},\\; |2| + |0| \\right\\} = \\max\\{\\cred{4}, 2\\} = 4."}</MD>
          <p>
            <strong>Zeilensummennorm:</strong> Die Beträge zeilenweise summieren; hier liefern{" "}
            <M>{"\\cblue{\\text{beide Zeilen}}"}</M> denselben Wert:
          </p>
          <MD>{"\\left\\|\\bA\\right\\|_\\infty = \\max\\left\\{ \\cblue{|1| + |2|},\\; \\cblue{|3| + |0|} \\right\\} = \\max\\{\\cblue{3}, \\cblue{3}\\} = 3."}</MD>
          <p>
            <strong>Frobenius-Norm:</strong> Wurzel aus der Quadratsumme aller Einträge:
          </p>
          <MD>{"\\left\\|\\bA\\right\\|_F = \\sqrt{1^2 + 2^2 + 3^2 + 0^2} = \\sqrt{14} \\approx 3{,}74."}</MD>
          <p>
            Probe über die Spur (<a className="underline" href="#sec-3.2">Abschnitt 3.2</a>):{" "}
            <M>{"\\bA^\\top\\bA = \\begin{pmatrix} 10 & 2 \\\\ 2 & 4 \\end{pmatrix}"}</M>, also{" "}
            <M>{"\\tr\\left(\\bA^\\top\\bA\\right) = 10 + 4 = 14 = \\left\\|\\bA\\right\\|_F^2"}</M>.{" "}
            <M>{"\\checkmark"}</M> Zum Vergleich: Die Spektralnorm ist{" "}
            <M>{"\\left\\|\\bA\\right\\|_2 = \\sqrt{\\lambda_{\\max}\\left(\\bA^\\top\\bA\\right)} = \\sqrt{7 + \\sqrt{13}} \\approx 3{,}26"}</M>,{" "}
            wie es sein muss kleiner als die Frobenius-Norm.
          </p>
        </Frage>
      </div>

      <h3 className="mt-6 text-lg font-semibold">Wie geht es weiter?</h3>
      <p>
        Warum der ganze Aufwand? Weil Matrixnormen das zentrale Messwerkzeug der{" "}
        <em>Fehleranalyse</em> sind, mit der wir uns im nächsten Kapitel beschäftigen: Die{" "}
        <ConceptLink id="condition-number">Konditionszahl</ConceptLink>{" "}
        <M>{"\\kappa(\\bA) = \\left\\|\\bA\\right\\| \\cdot \\left\\|\\bA^{-1}\\right\\|"}</M>{" "}
        misst, wie stark eine Matrix relative Störungen der Eingabe verstärken kann; für die
        Spektralnorm ist das gerade das Verhältnis von größtem zu kleinstem Singulärwert (bei
        symmetrischen Matrizen: der Beträge der Eigenwerte). Und wenn ein Algorithmus statt der exakten Lösung von{" "}
        <M>{"\\bA\\bx = \\bb"}</M> nur ein <M>{"\\wt{\\bx}"}</M> liefert, sagen uns Normen, für
        welches gestörte Problem <M>{"(\\bA + \\bDelta\\bA)\\,\\wt{\\bx} = \\bb"}</M> dieses{" "}
        <M>{"\\wt{\\bx}"}</M> die exakte Lösung ist. Die Größe{" "}
        <M>{"\\left\\|\\bDelta\\bA\\right\\|_2 / \\left\\|\\bA\\right\\|_2"}</M> quantifiziert
        dann den Rückwärtsfehler. Submultiplikativität und Verträglichkeit aus{" "}
        <a className="underline" href="#sec-3.5">Abschnitt 3.5</a> sind genau die
        Eigenschaften, die solche Abschätzungen erst möglich machen.
      </p>

      <p className="italic">Vertiefung: Heath §2.3; MML §4.1/4.5.</p>
    </div>
  );
}
