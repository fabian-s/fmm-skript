import { ConceptLink, EnvBlock, M, MD } from "../../lib";

/**
 * Abschnitt 4.4 — Zusammenfassung.
 * Quelle: Folien 04-fehler.Rmd, Blöcke „Übersicht" und „Wrap-up".
 * Prosa eigenständig aus den Folien formuliert; bewusst schlank gehalten.
 */
export function S44() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 04-fehler, „Übersicht" und „Wrap-up".
      </p>
      <p>
        Fassen wir das Kapitel zusammen. Der rote Faden war die Frage, warum ein berechnetes
        Ergebnis <M>{"\\wt{f}(\\wt{\\bx})"}</M> vom idealen Ergebnis <M>{"f(\\bx)"}</M>{" "}
        abweicht — und wie wir diese Abweichung messen, zerlegen und den beiden Schuldigen
        zuordnen: dem <em>Problem</em> und dem <em>Algorithmus</em>.
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
              <td className="py-1 pr-6">absoluter / relativer Fehler</td>
              <td className="py-1 pr-6">
                <M>{"\\bDelta_{\\bv} = \\wt{\\bv} - \\bv"}</M> bzw.{" "}
                <M>{"\\delta_{\\bv} = \\left\\| \\wt{\\bv} - \\bv \\right\\| / \\left\\| \\bv \\right\\|"}</M>{" "}
                — gemessen in einer <ConceptLink id="norm">Norm</ConceptLink> unserer Wahl
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-4.1">4.1</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">Fehlerzerlegung</td>
              <td className="py-1 pr-6">
                Gesamtfehler = algorithmischer Fehler{" "}
                <M>{"\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}"}</M> + Input-Folgefehler{" "}
                <M>{"\\corange{f(\\wt{\\bx}) - f(\\bx)}"}</M>
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-4.1">4.1</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">Kondition</td>
              <td className="py-1 pr-6">
                Sensitivität eines <em>Problems</em> bezüglich Inputfehlern — unabhängig vom
                verwendeten Algorithmus
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-4.2">4.2</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">Konditionszahlen</td>
              <td className="py-1 pr-6">
                <M>{"\\kappa_{abs}"}</M> und <M>{"\\kappa_{rel}"}</M>: kleinste
                Verstärkungsfaktoren von absolutem bzw. relativem Inputfehler; gut
                konditioniert (<M>{"\\kappa \\lesssim 1"}</M>), schlecht konditioniert (
                <M>{"\\kappa \\gg 1"}</M>), schlecht gestellt (<M>{"\\kappa = \\infty"}</M>)
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-4.2">4.2</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">
                <ConceptLink id="condition-number">Konditionszahl einer Matrix</ConceptLink>
              </td>
              <td className="py-1 pr-6">
                <M>{"\\kappa(\\bA) = \\left\\| \\bA \\right\\| \\left\\| \\bA^{-1} \\right\\|"}</M>{" "}
                in einer <ConceptLink id="matrix-norm">Matrixnorm</ConceptLink> — obere Schranke
                für die relative Kondition des Problems <M>{"\\bx \\mapsto \\bA^{-1}\\bx"}</M>{" "}
                (eingeführt in{" "}
                <a className="underline" href="?k=03-matrix-spur-norm#sec-3.5">Abschnitt 3.5</a>)
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-4.2">4.2</a>
              </td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <td className="py-1 pr-6">Stabilität</td>
              <td className="py-1 pr-6">
                Eigenschaft eines <em>Algorithmus</em>: <M>{"\\wt{f}"}</M> ist stabil, wenn der
                algorithmische Fehler <M>{"\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}"}</M>{" "}
                klein ist
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-4.3">4.3</a>
              </td>
            </tr>
            <tr>
              <td className="py-1 pr-6">zusammengesetzte Algorithmen</td>
              <td className="py-1 pr-6">
                Fehlerfortpflanzung über Teilschritte: Die Kondition eines späteren
                Teilschritts verstärkt die Fehler aller früheren
              </td>
              <td className="py-1">
                <a className="underline" href="#sec-4.3">4.3</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-6 text-lg font-semibold">Kondition und Stabilität — die Arbeitsteilung</h3>
      <p>
        Die beiden zentralen Begriffe des Kapitels beantworten verschiedene Fragen, und die
        Fehlerzerlegung aus <a className="underline" href="#sec-4.1">Abschnitt 4.1</a> hält sie
        sauber auseinander:
      </p>
      <MD>{"\\wt{f}(\\wt{\\bx}) - f(\\bx) = \\underbrace{\\cred{\\wt{f}(\\wt{\\bx}) - f(\\wt{\\bx})}}_{\\text{algorithmischer Fehler}} + \\underbrace{\\corange{f(\\wt{\\bx}) - f(\\bx)}}_{\\text{Input-Folgefehler}}"}</MD>
      <p>
        Die <em>Kondition</em> beschreibt die <strong>Sensitivität des Problems</strong>: Sie
        kontrolliert den <span className="font-semibold" style={{ color: "#E69F00" }}>orangen</span>{" "}
        Term, also wie stark <M>{"f"}</M> selbst — in exakter Arithmetik — Inputfehler
        verstärkt. Daran kann kein noch so guter Algorithmus etwas ändern. Die{" "}
        <em>Stabilität</em> beschreibt die <strong>Robustheit des Algorithmus</strong>: Sie
        kontrolliert den <span className="font-semibold" style={{ color: "#D55E00" }}>roten</span>{" "}
        Term, also wie viel zusätzlichen Fehler die Umsetzung{" "}
        <M>{"\\wt{f}"}</M> durch{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> in{" "}
        <ConceptLink id="floating-point">Gleitkommaarithmetik</ConceptLink> obendrauf legt. Ein
        stabiler Algorithmus für ein schlecht konditioniertes Problem liefert also trotzdem
        ungenaue Ergebnisse — aber nicht ungenauer, als das Problem es erzwingt.
      </p>
      <EnvBlock kind="Bemerkung" label="4.4.1 (Merkregel)">
        <p className="font-semibold">
          Schlecht konditionierte Teilschritte möglichst früh ausführen!
        </p>
        <p>
          Warum? Nach der Fehlerfortpflanzungs-Schranke aus{" "}
          <a className="underline" href="#sec-4.3">Abschnitt 4.3</a> verstärkt die Kondition
          eines Teilschritts die angesammelten Fehler aller <em>vorangegangenen</em> Schritte.
          Ein schlecht konditionierter Schritt am Ende der Kette trifft auf einen Input, der
          schon viele Fehler trägt — und bläst sie alle auf. Derselbe Schritt am Anfang sieht
          nur den unvermeidbaren Inputfehler. Genau das haben wir am Varianz-Beispiel gesehen:
          Die Verschiebungsformel hebt sich die schlecht konditionierte Subtraktion (Stichwort{" "}
          <ConceptLink id="cancellation">Auslöschung</ConceptLink>) bis zum Schluss auf, die
          Zwei-Pass-Formel zieht sie vor — und ist deshalb stabil.
        </p>
      </EnvBlock>

      <h3 className="mt-6 text-lg font-semibold">Wie geht es weiter?</h3>
      <p>
        Im nächsten Kapitel wenden wir das neue Vokabular auf das wichtigste Rechenproblem der
        Statistik an: die numerische Lösung{" "}
        <ConceptLink id="linear-system">linearer Gleichungssysteme</ConceptLink>{" "}
        <M>{"\\bA\\bx = \\bb"}</M>. Die Konditionszahl <M>{"\\kappa(\\bA)"}</M> sagt uns dann,
        wie genau die Lösung überhaupt sein <em>kann</em> — und die Stabilitätsanalyse, welche
        Lösungsverfahren diese Genauigkeit auch wirklich erreichen.
      </p>

      <p className="italic">Vertiefung: Heath §1.2.</p>
    </div>
  );
}
