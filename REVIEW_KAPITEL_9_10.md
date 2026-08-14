# Review der Kapitel 9–10

**Stand:** `claude/textbook-skill-workflow-olwbzr` bei `0f5bb5bcded5080a21d85c314412b41b7d99c073`  
**Gegenstand:** Didaktische Qualität und fachliche Korrektheit der vollständig ausgearbeiteten Kapitel 9 und 10. Geprüft wurden Lehrtext, Definitionen, Sätze, Beweise, Beispiele, Selbsttests und die fachlich relevanten Teile aller Kapitel-Widgets. Kapitel 11 ist auf diesem Stand nur ein Gerüst und daher nicht Gegenstand dieses Reviews.

## Kurzfazit

Beide Kapitel sind didaktisch stark und fast durchgehend fachlich sorgfältig. Kapitel 9 schafft den schwierigen Übergang von konkreten mehrdimensionalen Zahlenfeldern zum abstrakten Tensorprodukt mit vielen tragfähigen Beispielen. Kapitel 10 baut die Fréchet-Ableitung konsequent als lineare Approximation auf und hält die Zeilenkonvention für Gradienten und Jacobimatrizen bemerkenswert konsistent bis zur Backpropagation und Matrixrechnung durch. Die Widgets sind keine Dekoration, sondern rechnen zentrale Aussagen nachvollziehbar nach; ihre Formeln und fest eingebauten Zahlenbeispiele sind weitgehend korrekt.

Vor einer Veröffentlichung sollten dennoch sieben fachliche Punkte korrigiert werden. Der wichtigste ist die Definition des Tensorprodukts von Vektorräumen: Der Spann des Bildes einer beliebigen bilinearen Abbildung ist kein Tensorprodukt. In Kapitel 10 betreffen die wesentlichen Korrekturen die saubere Typisierung des Fréchet-Restterms, die implizite Wahl der euklidischen Norm, eine fehlende Voraussetzung in der Backpropagationsformel, eine zu pauschale Aussage zur ReLU-Differenzierbarkeit sowie die Trennung von partiellen Ableitungen und Fréchet-Differenzierbarkeit.

Der Ausgangsstand baut fehlerfrei: `npm run build` prüft 190 MDX-Dateien und erstellt die Anwendung; `npm run test:mdx` besteht mit 81/81 Fixtures und erfolgreichem Orakel-Regressionstest.

## Priorität A: fachlich vor Veröffentlichung korrigieren

### A1. Die Definition des Tensorprodukts verwendet eine beliebige bilineare Abbildung

**Fundstelle:** `src/chapters/09-tensoren/S94.mdx:20–88`

Definition 9.4.1 beginnt mit einer beliebigen bilinearen Abbildung `(v,w) ↦ v⊗w` und definiert `V⊗W` als Spann ihres Bildes. Das ist im Allgemeinen nicht das Tensorprodukt. Für die Nullabbildung wäre der so definierte Raum beispielsweise der Nullraum, auch wenn `V` und `W` nicht trivial sind. Bemerkung 9.4.3 erkennt zwar, dass die universelle Eigenschaft eine zusätzliche Forderung ist, lässt sie aber außerhalb der Definition; dadurch tragen auch ungeeignete Paare bereits den Namen Tensorprodukt.

**Empfehlung:** Das Tensorprodukt als Paar aus einem Vektorraum `T` und einer bilinearen kanonischen Abbildung `τ:V×W→T` definieren, das die universelle Eigenschaft erfüllt. Anschließend festhalten, dass `T` von den elementaren Tensoren aufgespannt wird und bis auf eindeutigen Isomorphismus bestimmt ist. Das äußere Produkt in `R^{m×n}` und das punktweise Produkt in den Funktionsbeispielen danach als konkrete Realisierungen verifizieren.

### A2. Der Fréchet-Restterm ist in der Definition nicht sauber typisiert

**Fundstelle:** `src/chapters/10-ableitungen-1/S101.mdx:247–280`

In

\[
f(x+h)=f(x)+D_xf(h)+o(\lVert h\rVert)
\]

liegt der linke Teil in `E`, während `o(‖h‖)` zunächst eine skalare Größenordnung bezeichnet. Die folgende Bemerkung erklärt mit einem `E`-wertigen Rest `r(h)` korrekt, was gemeint ist; die tragende Definition selbst bleibt aber formal mehrdeutig. Außerdem sind `D` und `E` normierte Vektorräume, nicht bloß „normierte Räume“.

**Empfehlung:** In der Definition einen Rest `r(h)∈E` einführen und explizit

\[
\frac{\lVert r(h)\rVert_E}{\lVert h\rVert_D}\to0
\]

fordern. Optional gleich die übliche lokale Form `f:U→E` für eine offene Menge `U⊂D` verwenden. Die spätere Kurzschreibweise mit `o(‖h‖)` kann danach erklärt werden.

### A3. „Stärkster Anstieg“ setzt die euklidische Norm voraus

**Fundstelle:** `src/chapters/10-ableitungen-1/S102.mdx:109–172`, Selbsttest `:471–479`

Definition 10.2.3 und Satz 10.2.4 schreiben nur `‖d‖=1`. Der Beweis verwendet jedoch das euklidische Skalarprodukt und Cauchy–Schwarz; die Richtung `∇f(x)ᵀ/‖∇f(x)‖` ist genau für die euklidische 2-Norm die Richtung des stärksten Anstiegs. Bei anderen Normen wird die maximale Richtungsableitung durch die duale Norm beschrieben und die maximierende Richtung muss nicht der normierte Gradient sein.

**Empfehlung:** In Definition, Satz, Beweis, Widget-Erklärung und Selbsttest konsequent `‖·‖₂` schreiben. Ein kurzer Hinweis auf die Normabhängigkeit wäre didaktisch wertvoll, weil Abschnitt 10.1 ausdrücklich mit allgemeinen Normen startet.

### A4. Die Backpropagationsformel ignoriert eine zuvor zugelassene direkte Parameterabhängigkeit

**Fundstelle:** `src/chapters/10-ableitungen-1/S103.mdx:425–468`

Der Text führt die Verlustfunktion als `L(ŷ;θ)` ein, Formel (10.3.3) enthält für `∂L/∂θ_k` aber nur den Pfad über `ŷ`. Das ist nur korrekt, wenn `L` bei festgehaltener Vorhersage nicht direkt von `θ` abhängt. Bei einem Regularisierungsterm, etwa Weight Decay, fehlt ein direkter Summand.

**Empfehlung:** Entweder hier `L=L(ŷ,y)` ohne direkte Parameterabhängigkeit definieren oder Formel (10.3.3) um den partiellen direkten Term bei festem `ŷ` ergänzen. Eine knappe Bemerkung zu Regularisierung verhindert, dass Lernende die Kettenregel später falsch verallgemeinern.

### A5. Die Aussage zur Nichtdifferenzierbarkeit eines ReLU-Layers ist zu pauschal

**Fundstelle:** `src/chapters/10-ableitungen-1/S103.mdx:483–525`, Selbsttest `:626–633`

Aus `(Wz)_i=0` folgt nicht in jedem Fall, dass der Layer `z↦max(0,Wz)` an `z` undifferenzierbar ist. Ist die betreffende Zeile von `W` der Nullvektor, ist diese Ausgabekomponente identisch null und damit differenzierbar. Für eine von null verschiedene Zeile entsteht dagegen tatsächlich ein Knick entlang der zugehörigen Hyperebene. Die Ergänzung, solche Stellen würden „so gut wie nie“ exakt getroffen, ist bei kontinuierlichen Zufallsmodellen plausibel, aber nicht allgemein: Nullgewichte, diskrete oder strukturierte Daten können sie systematisch erzeugen.

**Empfehlung:** Die Nichtdifferenzierbarkeitsaussage auf aktive Schalthyperebenen mit nichtverschwindender Zeile einschränken und die Praxisbemerkung probabilistisch konditionieren. Den Selbsttest entsprechend präzisieren.

### A6. Existierende partielle Ableitungen ergeben noch keine Fréchet-Ableitung

**Fundstelle:** `src/chapters/10-ableitungen-1/S104.mdx:275–303`

Definition 10.4.7 nennt die Matrix aller partiellen Ableitungen bereits „Ableitung von `f` nach `X`“, sobald alle partiellen Ableitungen existieren. In endlich vielen Variablen reicht deren Existenz allein nicht für Fréchet-Differenzierbarkeit. Die nachfolgende Darstellung des linearen Terms wird zwar auf „differenzierbares `f`“ eingeschränkt, doch die Terminologie verwischt genau die Unterscheidung, die Kapitel 10 zuvor aufgebaut hat.

**Empfehlung:** Entweder Fréchet-Differenzierbarkeit von `f` voraussetzen und dann die darstellende Gradientenmatrix definieren oder das Objekt bei bloßer Existenz der partiellen Ableitungen „Matrix der partiellen Ableitungen“ nennen und erst im differenzierbaren Fall als Darstellung von `D_Xf` identifizieren.

### A7. Nichtkonvexität garantiert kein lokales Minimum

**Fundstelle:** `src/chapters/10-ableitungen-1/S104.mdx:597–603`

Aus der Nichtkonvexität von `L(U,V)` folgt nicht, dass Gradientenabstieg „nur ein lokales Minimum“ findet. Je nach Lernrate, Start und Geometrie kann er divergieren, oszillieren oder gegen einen anderen stationären Punkt konvergieren; auch ein globales Minimum ist möglich. Die im selben Widget sichtbaren divergierenden Läufe widersprechen der pauschalen Formulierung bereits anschaulich.

**Empfehlung:** Formulieren, dass es keine allgemeine Garantie für ein globales Minimum gibt und der Verlauf vom Startpunkt und der Lernrate abhängt. Lokale Minima und andere stationäre Punkte als mögliche, nicht notwendige Ergebnisse nennen.

## Priorität B: fachlich und didaktisch präzisieren

### B1. Das äußere Produkt steht als Voraussetzung vor seiner Einführung

**Fundstelle:** `src/chapters/09-tensoren/S91.mdx:14–28`

Die Vorkenntnisliste setzt das äußere Produkt voraus, obwohl es erst in Abschnitt 9.3 systematisch definiert wird. Wer dem Skript linear folgt, begegnet damit einer rückwärts gerichteten Voraussetzung.

**Empfehlung:** Den Punkt aus der Voraussetzungsliste entfernen oder ausdrücklich als kurze Vorschau markieren und erst in 9.3 definieren.

### B2. Die Hardwareaussage zu TPUs und Tensor Cores ist absolut formuliert

**Fundstelle:** `src/chapters/09-tensoren/S92.mdx:381–388`

„TPUs und Tensor Cores tun nichts anderes“ reduziert komplexe Beschleuniger beziehungsweise Recheneinheiten auf Blockmultiplikationen. Matrix-Multiply-Accumulate ist ihr Kern, aber Datentransfer, Akkumulation, Spezialfunktionen und weitere Operationen gehören ebenfalls dazu.

**Empfehlung:** „sind auf solche Matrix- und Tensoroperationen spezialisiert“ genügt als korrekte Motivation.

### B3. Der Low-Rank-Hinweis bei Attention gilt vor dem Softmax

**Fundstelle:** `src/chapters/09-tensoren/S93.mdx:229–254`

`QKᵀ` hat Rang höchstens `d_k`; die zeilenweise Softmax-Abbildung ist jedoch nicht linear und kann den Rang erhöhen. „Hinter der riesigen Aufmerksamkeitsmatrix“ klingt so, als sei auch die Matrix der Attention-Gewichte niedrig-rangig.

**Empfehlung:** Explizit von der Logit- beziehungsweise Scorematrix `QKᵀ` sprechen und hinzufügen, dass die Rangschranke nach Softmax im Allgemeinen nicht erhalten bleibt.

### B4. Skalenmehrdeutigkeit von Kovarianzfaktoren nur für positive Faktoren

**Fundstelle:** `src/chapters/09-tensoren/S93.mdx:699–725`

Die algebraische Identität mit `c≠0` stimmt. Sollen beide Faktoren weiterhin Kovarianzmatrizen, also positiv semidefinit, sein, muss der verschobene Skalenfaktor positiv sein. Negative `c` machen beide Faktoren negativ semidefinit.

**Empfehlung:** In diesem Kovarianzkontext `c>0` schreiben; die Zählung eines nicht identifizierbaren Skalenparameters bleibt unverändert.

### B5. Stützgeraden sind keine konkurrierenden Tangenten

**Fundstelle:** `src/chapters/10-ableitungen-1/S101.mdx:82–99`

Die Geraden `y=mx` für `m∈[-1,1]` sind Stützgeraden der konvexen Betragsfunktion und entsprechen Subgradienten. Sie als „zu viele Kandidaten“ für eine Tangente zu präsentieren, vermischt Differenzierbarkeit mit konvexer Subdifferentialrechnung. Für die Nichtdifferenzierbarkeit genügen die verschiedenen einseitigen Sekantensteigungen.

**Empfehlung:** Entweder den Stützgeradenabsatz weglassen oder ihn ausdrücklich als Vorschau auf Subgradienten kennzeichnen.

### B6. Niedriger Rang allein identifiziert eine Matrix Completion nicht

**Fundstelle:** `src/chapters/10-ableitungen-1/S104.mdx:470–510`, `:608–619`

Der Text zeigt am `k=2`-Fall überzeugend, dass die Lücken unterbestimmt sein können. Die allgemeine Einführung könnte noch klarer sagen, dass niedriger Rang allein keine eindeutige Rekonstruktion garantiert: Beobachtungsmuster, Zahl der Beobachtungen und zusätzliche Bedingungen beziehungsweise Regularisierung sind entscheidend.

**Empfehlung:** Vor der Verlustfunktion einen Satz zur Identifizierbarkeit ergänzen und die Ausgabe des Algorithmus als modellabhängige Vorhersage statt als automatisch „gesuchten“ Wert beschreiben.

### B7. Die symbolische Inversenformel sollte von der numerischen Umsetzung getrennt werden

**Fundstelle:** `src/chapters/09-tensoren/S95.mdx:187–195`

Die Formel `X=A⁻¹CB⁻¹` ist algebraisch korrekt, kollidiert aber ohne Umsetzungshinweis mit der früheren Empfehlung, explizite Inversen beim numerischen Rechnen zu vermeiden.

**Empfehlung:** Als symbolische Identität beibehalten und direkt ergänzen, dass `X` praktisch durch zwei lineare Lösevorgänge berechnet wird.

### B8. Kernstoff und Anwendungen in Kapitel 9 deutlicher markieren

Kapitel 9 deckt in kurzer Folge multilineare Abbildungen, Tensorindexierung, drei Produktbegriffe, separierbare Kovarianzen, das abstrakte Tensorprodukt, Funktionsbasen und die Vec-Kronecker-Identität ab. Die Beispiele sind jeweils gut, aber für einen ersten Durchgang konkurrieren viele neue Begriffe um Aufmerksamkeit.

**Empfehlung:** Als Kernstoff Bilinearität, Tensorformat, äußeres/Kroneckerprodukt und Tensorproduktbasis markieren; Attention, separierbare Kovarianzen und die Vec-Anwendung sichtbar als zweite Lernschicht führen.

## Didaktische Beurteilung nach Kapitel

### Kapitel 9 — anschaulich, anwendungsnah und begrifflich ambitioniert

Die Progression von Bilinearität über konkrete Tensoren zu Produkten und schließlich zu Tensorprodukträumen ist grundsätzlich überzeugend. Besonders stark sind die konsequente Formatkontrolle, die Unterscheidung von äußerem Produkt, Tensorprodukt und Kroneckerprodukt sowie die Kovarianz- und Funktionsbasisbeispiele. Die Widgets machen Indexreihenfolge, Blockstruktur und Basisentwicklung wirklich sichtbar. A1 betrifft allerdings den abstrakten Kern des Kapitels und muss vor Veröffentlichung behoben werden; erst dann tragen Dimensionssatz und Tensorproduktbasis auf einem sauberen Fundament. B1–B4 sind lokale Präzisierungen, B8 eine Empfehlung für die Kursplanung.

### Kapitel 10 — sehr gute Leitidee und außergewöhnlich konsistente Notation

Die Ableitung wird nicht als Sammlung von Formeln, sondern als beschränkte lineare Approximation entwickelt. Das ist didaktisch die richtige Leitidee für Gradient, Jacobimatrix, Kettenregel und Matrixableitungen. Die Zeilenkonvention wird nicht nur genannt, sondern in Formaten, Kettenprodukten und Backpropagation konsequent durchgehalten. Die Beweise sind kleinschrittig, ohne den mathematischen Kern zu verlieren; die numerischen Ableitungschecks in den Widgets sind besonders gelungen.

A2, A3 und A6 schärfen die Grundlagen, A4 und A5 verhindern falsche Verallgemeinerungen in neuronalen Netzen, A7 korrigiert eine typische Überinterpretation nichtkonvexer Optimierung. Nach diesen Änderungen ist Kapitel 10 fachlich sehr belastbar. Für einen ersten Kurs könnte die Matrix-Completion-Anwendung als Vertiefung gelesen werden, sie ist in sich aber gut gewählt und korrekt gerechnet.

## Empfohlene Reihenfolge der Überarbeitung

1. Tensorprodukt über die universelle Eigenschaft neu fassen und die konkreten Realisierungen daran anbinden (A1).
2. Fréchet-Definition sowie Gradient-/Matrixableitungsdefinitionen formal harmonisieren (A2, A3, A6).
3. Backpropagation und ReLU an ihren Voraussetzungen präzisieren (A4, A5).
4. Nichtkonvexitäts- und Matrix-Completion-Aussagen abschwächen beziehungsweise ergänzen (A7, B6).
5. Die lokalen Präzisierungen in Kapitel 9 und die Stützgeradenpassage einarbeiten (B1–B5, B7).
6. Abschließend Build, MDX-Regressionstests und einen gezielten Inhaltsvergleich der geänderten Selbsttests durchführen.

## Gesamturteil

Die Kapitel 9 und 10 sind bereits auf einem hohen didaktischen Niveau und enthalten keine breitflächigen Rechenfehler. Die nötigen Änderungen betreffen überwiegend Voraussetzungen und Begriffsgrenzen; sie sind aber an zentralen Stellen wichtig. Nach den Priorität-A-Korrekturen und den kompakten Präzisierungen aus Priorität B sind beide Kapitel veröffentlichungsreif. Kapitel 11 sollte separat geprüft werden, sobald es über das derzeitige Gerüst hinaus ausgearbeitet ist.
