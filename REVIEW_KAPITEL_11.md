# Review von Kapitel 11

**Stand:** `claude/textbook-skill-workflow-olwbzr` bei `c72999add337d7d329c6ef0ebbbb0dbb4713d975`  
**Gegenstand:** Didaktische Qualität und fachliche Korrektheit des vollständig ausgearbeiteten Kapitels 11. Geprüft wurden Lehrtext, Definitionen, Sätze, Beweise, Beispiele, Selbsttests und sämtliche Kapitel-Widgets.

## Kurzfazit

Kapitel 11 ist didaktisch sehr stark. Es führt nicht bloß weitere Ableitungsformeln ein, sondern hält die Fréchet-Ableitung als lineare Approximation konsequent als Leitidee fest. Besonders gelungen sind die allgemeine Produktregel für beschränkte bilineare Abbildungen, die sorgfältige Formatkontrolle bei Gradienten und Jacobimatrizen, die Verbindung von Hesse-Matrix, Optimierung und Fisher-Information sowie die Gegenüberstellung von lokaler Taylorapproximation und globalem Verhalten. Die Widgets rechnen die zentralen Aussagen nachvollziehbar nach; ihre Formeln und fest eingebauten Zahlenbeispiele sind korrekt.

Vier Punkte sollten vor Veröffentlichung fachlich korrigiert werden. Die rekursive Definition höherer Fréchet-Ableitungen formuliert weder die nötige lokale Existenz noch die Konvergenz in Operatornorm sauber. Der Beweis der allgemeinen Taylorentwicklung verwendet anschließend ein skalares Lagrange-Restglied für vektorwertige Funktionen, was so nicht zulässig ist. Im Ridge-Beispiel wird Nicht-Eindeutigkeit mit Nicht-Lösbarkeit verwechselt. Schließlich werden beim Newton-Verfahren einige Aussagen über quadratische Funktionen, Minima und singuläre Hesse-Matrizen zu stark formuliert.

Der Ausgangsstand baut fehlerfrei: `npm run build` prüft 190 MDX-Dateien und erstellt die Anwendung; `npm run test:mdx` besteht mit 81/81 Fixtures und erfolgreichem Orakel-Regressionstest.

## Priorität A: fachlich vor Veröffentlichung korrigieren

### A1. Höhere Fréchet-Ableitungen müssen lokal und in Operatornorm definiert werden

**Fundstelle:** `src/chapters/11-ableitungen-2/S113.mdx:31–105`

Definition 11.3.1 nennt `k`-malige Differenzierbarkeit „an der Stelle `x`“, verwendet aber zugleich `D^{j-1}_{x+h}f`, ohne vorauszusetzen, dass die niedrigeren Ableitungen in einer ganzen Umgebung existieren. Zudem wird der Rest punktweise nach eingesetzten Richtungen formuliert. Die Fréchet-Differenzierbarkeit der Abbildung

\[
x\longmapsto D^{j-1}_x f
\]

verlangt jedoch Kleinheit in der Operatornorm auf dem Raum der beschränkten multilinearen Abbildungen, also gleichmäßig über alle Richtungen mit Norm höchstens eins. Punktweise Konvergenz für jede feste Richtungswahl ist schwächer.

Auch der Term `o(‖h‖)∏‖h_i‖` ist wie schon in der alten Fassung von Definition 10.1.5 nicht sauber typisiert: Er beschreibt eine Größenordnung, während die übrigen Terme Werte in `E` sind.

**Empfehlung:** Rekursiv definieren: `f` muss `(j−1)`-mal differenzierbar in einer Umgebung von `x` sein, und `x↦D^{j-1}_x f` muss als Abbildung in den normierten Raum der beschränkten `(j−1)`-linearen Abbildungen Fréchet-differenzierbar sein. Die äquivalente Restbedingung explizit in Operatornorm angeben. Damit werden Existenz, Gleichmäßigkeit und Wertebereich gleichzeitig geklärt.

### A2. Der Beweis der allgemeinen Taylorentwicklung ist für vektorwertige Funktionen ungültig

**Fundstelle:** `src/chapters/11-ableitungen-2/S114.mdx:305–427`

Satz 11.4.7 behauptet die Taylorentwicklung für Abbildungen zwischen allgemeinen normierten Räumen. Die Beweisskizze reduziert auf eine Kurve `ψ` und wendet dann das eindimensionale Lagrange-Restglied an. Dieses Restglied mit einer einzelnen Zwischenstelle `θ` ist ein skalares Resultat. Bei komponentenweiser Anwendung auf `W=R^m` entstehen im Allgemeinen verschiedene Zwischenstellen pro Komponente; für einen allgemeinen normierten Zielraum ist die komponentenweise Argumentation überhaupt nicht verfügbar.

Bemerkung 11.4.8 verwendet anschließend dennoch einen gemeinsamen Wert `ψ^(k)(θ)` und leitet daraus eine Operatornormschranke ab. Genau dieser Schritt ist nicht gerechtfertigt.

**Empfehlung:** Den Zielraum als Banachraum voraussetzen und die Integralform des Taylor-Restglieds verwenden:

\[
R_k(h)=\frac{1}{(k-1)!}\int_0^1(1-t)^{k-1}
\bigl(D^k_{x+th}f-D^k_xf\bigr)(h,\ldots,h)\,dt.
\]

Die Operatornorm und die Stetigkeit von `D^k f` liefern unmittelbar `‖R_k(h)‖=o(‖h‖^k)`, gleichmäßig über alle Richtungen. Alternativ den Satz ausdrücklich auf endlichdimensionale Zielräume beschränken und dort mit einer normunabhängigen komponentenweisen Schranke argumentieren.

### A3. Rangdefiziente ungestrafte Normalengleichungen sind lösbar, nur nicht eindeutig

**Fundstelle:** `src/chapters/11-ableitungen-2/S112.mdx:335–390`

Im Ridge-Beispiel steht, das ungestrafte System sei „nur bei vollem Spaltenrang“ lösbar. Das ist falsch. Für jedes `X` und `y` besitzt das Kleinste-Quadrate-Problem mindestens einen Minimierer, und die Normalengleichungen

\[
X^T X\beta=X^T y
\]

sind stets konsistent. Bei Rangdefizienz ist die Lösung nicht eindeutig. Der Ridge-Term macht `X^T X+λI` positiv definit und erzeugt daher eine eindeutige Lösung.

**Empfehlung:** „stets eindeutig lösbar“ für Ridge gegenüber „lösbar, aber bei Rangdefizienz nicht eindeutig“ für das ungestrafte Problem stellen. Das knüpft direkt an Pseudoinverse und Minimalnormlösung aus Kapitel 6/7 an.

### A4. Newton trifft bei quadratischen Funktionen nicht automatisch ein Minimum

**Fundstelle:** `src/chapters/11-ableitungen-2/S114.mdx:534–616`, Selbsttest `:693–700`

Für eine quadratische Funktion mit invertierbarer Hesse-Matrix trifft Newton in einem Schritt den eindeutigen *kritischen Punkt*. Dieser ist nur bei positiver Definitheit ein Minimum; bei negativer Definitheit ist er ein Maximum, bei indefiniter Hesse-Matrix ein Sattelpunkt. Bei singulärer Hesse-Matrix kann die quadratische Näherung keine kritischen Punkte oder einen affinen Lösungsraum positiver Dimension besitzen, nicht notwendig „eine ganze Gerade“.

Die Bemerkung, Newton laufe bei indefiniter Hesse-Matrix „zielstrebig in einen Sattelpunkt“, ist ebenfalls zu allgemein. Die Definitheit der Hesse-Matrix am aktuellen Iterationspunkt klassifiziert die quadratische Näherung, nicht den späteren Grenzpunkt der nichtquadratischen Funktion.

**Empfehlung:** Durchgehend zwischen stationärem Punkt von `T₂`, kritischem Punkt von `f` und Minimum unterscheiden. Den Selbsttest auf „invertierbare positiv definite Hesse-Matrix“ einschränken beziehungsweise nur den kritischen Punkt behaupten.

## Priorität B: fachlich und didaktisch präzisieren

### B1. Die Fréchet-Erinnerung in Abschnitt 11.1 sollte den vektorwertigen Rest verwenden

**Fundstelle:** `src/chapters/11-ableitungen-2/S111.mdx:10–32`

Gleichung (11.1.1) wiederholt die alte Kurzfassung `+o(‖h‖)`. Nach der Korrektur in Kapitel 10 sollte Kapitel 11 konsistent einen Rest `r(h)∈E` mit `‖r(h)‖_E/‖h‖_D→0` verwenden und erst danach die Kurzschreibweise erklären.

### B2. „Taylorpolynom k-ten Grades“ kann tatsächlich niedrigeren Grad haben

**Fundstelle:** `src/chapters/11-ableitungen-2/S114.mdx:40–53`

Wenn `f^(k)(x)=0`, hat das Polynom nicht Grad `k`. Fachlich sauber ist „Taylorpolynom der Ordnung `k`“ oder „vom Grad höchstens `k`“.

### B3. Eine konstante Tangentialebene hat nicht gar keine Niveaumengen

**Fundstelle:** `src/chapters/11-ableitungen-2/S114.mdx:485–501`

Ist `T₁` konstant, ist die Niveaumenge zum konstanten Wert der ganze Definitionsraum; alle anderen Niveaumengen sind leer. „Hat gar keine“ ist daher falsch. Gemeint ist, dass es keine regulären Höhenlinien gibt, die eine ausgezeichnete Gradientenrichtung erkennen lassen.

### B4. Aussagen über Sattelpunkte in hoher Dimension als Heuristik begrenzen

**Fundstelle:** `src/chapters/11-ableitungen-2/S113.mdx:527–542`, Selbsttest `:849–859`

Die unabhängige Münzwurfzählung der Eigenwertvorzeichen ist ausdrücklich als Faustregel markiert. Die anschließende Aussage, ein hängenbleibendes hochdimensionales Netz stecke „fast nie“ in einem schlechten lokalen Minimum, folgt daraus jedoch nicht ohne ein Modell für die Verlustlandschaft und die vom Optimierer erreichten kritischen Punkte. Auch entkommt SGD nicht automatisch jedem Sattel.

**Empfehlung:** Als qualitative Motivation kennzeichnen: Indefinite kritische Punkte werden kombinatorisch wahrscheinlicher, und Rauschen *kann* das Entkommen aus instabilen Sattelregionen erleichtern.

### B5. Die Konditionsaussage über die Hesse-Matrix ist lokal

**Fundstelle:** `src/chapters/11-ableitungen-2/S113.mdx:549–560`

Das Verhältnis `λ_max/λ_min` beschreibt die Kondition und exakte Konvergenzrate im dargestellten streng konvexen quadratischen Modell. Für allgemeine nichtquadratische Verlustfunktionen ist die Hesse-Matrix ortsabhängig, kann indefinit sein, und globale Konvergenzraten benötigen zusätzliche Glattheits- und starke Konvexitätsannahmen.

### B6. Fisher-Information benötigt Regularitätsbedingungen

**Fundstelle:** `src/chapters/11-ableitungen-2/S113.mdx:567–665`

Die Definition über die erwartete negative Hesse-Matrix ist unter den üblichen Differentiations- und Integrabilitätsbedingungen korrekt. Diese Bedingungen sollten wenigstens genannt werden; andernfalls ist die äquivalente Darstellung als Varianz des Scores nicht garantiert. Im Bernoulli-Beispiel sollte `0<p<1` explizit stehen. „Beobachtete Fisher-Information“ kann an jedem Parameterwert ausgewertet werden; das Einsetzen des MLE ist eine häufige Anwendung, nicht Teil der Definition.

### B7. „Normierte Räume“ konsistent als normierte Vektorräume bezeichnen

**Fundstellen:** insbesondere `S111.mdx`, `S112.mdx`, `S113.mdx`, `S114.mdx`

Fréchet-Ableitungen, lineare und multilineare Abbildungen setzen Vektorraumstruktur voraus. Die Kurzform ist im Kontext verständlich, aber nach der expliziten Präzisierung in Kapitel 10 sollte Kapitel 11 dieselbe Terminologie verwenden.

## Didaktische Beurteilung nach Abschnitt

### 11.1 — klarer Anschluss an Kapitel 10

Der Stetigkeitsbeweis ist sauber und die Unterscheidung „linear in der Funktion, nicht notwendig in der Stelle“ trifft eine häufige Fehlvorstellung. Das Mengenbild ist einfach, aber nützlich. B1/B7 stellen lediglich die formale Konsistenz mit dem korrigierten Kapitel 10 her.

### 11.2 — besonders gelungen

Die allgemeine Produktregel über beschränkte bilineare Abbildungen erklärt Skalarprodukt, Matrixprodukt und Spurausdrücke mit einer einzigen Struktur. Die Resttermabschätzung ist ausführlich, aber an dieser Stelle gerechtfertigt. Kettenregel, Logistik-Widget und Normbeispiel sind korrekt und didaktisch stark. A3 ist ein lokaler, aber wichtiger Fehler im Ridge-Beispiel.

### 11.3 — inhaltlich reich und statistisch gut angebunden

Hesse-Matrix, Schwarz, Definitheit, Konvexität und Fisher-Information greifen überzeugend ineinander. Besonders gut ist die saubere Trennung von definit und semidefinit sowie von Cramér-Rao-Schranke und asymptotischer Effizienz. A1 betrifft allerdings das formale Fundament des Abschnitts. B4–B6 begrenzen einige motivierende Aussagen auf den Rahmen, in dem sie gelten.

### 11.4 — starke Beispiele, Beweisfundament reparieren

Die univariate Taylorentwicklung, das Gegenbeispiel zur globalen Verbesserung und die Newton-Anwendung sind sehr gut ausgewählt. Die zweidimensionalen Widgets machen Fehlerordnungen und Krümmung ungewöhnlich anschaulich. A2 muss den allgemeinen Satz mathematisch tragen; A4 verhindert die typische Gleichsetzung von Newton-Schritt und Minimierung.

### 11.5 — kompakte, brauchbare Zusammenfassung

Der Wrap-up setzt die richtigen Schwerpunkte und verweist sinnvoll auf die Anwendungen. Nach den Korrekturen in 11.3/11.4 sollten die entsprechenden Kurzfassungen dort synchron angepasst werden.

## Empfohlene Reihenfolge der Überarbeitung

1. Höhere Ableitungen rekursiv in Operatornorm definieren (A1) und die Terminologie in 11.1/11.3 harmonisieren (B1, B7).
2. Den allgemeinen Taylorbeweis durch eine gültige Integralrestform ersetzen (A2).
3. Ridge-Lösbarkeit und Newton-Aussagen korrigieren (A3, A4).
4. Die lokalen Präzisierungen zu Taylorgrad, Niveaumengen, hoher Dimension, Kondition und Fisher-Information einarbeiten (B2–B6).
5. Wrap-up und Selbsttests synchronisieren; danach Build und MDX-Regressionstests erneut ausführen.

## Gesamturteil

Kapitel 11 ist bereits ein sehr gutes Lehrkapitel und enthält bemerkenswert viele Korrekturen typischer Folienverkürzungen. Die verbleibenden Probleme sind nicht breit gestreut, liegen aber teilweise im formalen Kern. Nach A1/A2 und den kleineren Ridge-/Newton-Korrekturen ist das Kapitel fachlich belastbar und didaktisch veröffentlichungsreif.
