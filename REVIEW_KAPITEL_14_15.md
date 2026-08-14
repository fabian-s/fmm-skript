# Review Kapitel 14 und 15: Funktionsapproximation I und II

Stand: 14. August 2026  
Geprüfte Fassung: `claude/textbook-skill-workflow-olwbzr` bei `b32779a`, zusammengeführt in den Stand von PR #3

## Kurzurteil

Die beiden Abschlusskapitel sind in Aufbau, Umfang und didaktischem Ehrgeiz sehr stark. Kapitel 14 entwickelt den Weg von der unterbestimmten Interpolationsaufgabe über Funktionenräume und Basissysteme bis zu B-Splines nachvollziehbar und mit ungewöhnlich vielen sauber ausgeführten Beweisen. Kapitel 15 verbindet dieselbe Konstruktion überzeugend mit Minimal­krümmung, Approximationsordnung, Regression, Bias-Varianz und mehrdimensionalen Modellen. Die meisten Korrekturen der zugrunde liegenden Folien sind fachlich gut begründet und transparent dokumentiert.

Die Widgets sind nicht bloß Illustrationen, sondern rechnen die zentralen Beispiele eigenständig nach. Die Implementierungen der Vandermonde-, Runge-, Spline-, Glättungs- und Bias-Varianz-Beispiele stimmen im Wesentlichen mit den Formeln im Text überein. Besonders gelungen sind die Gegenüberstellung verschiedener Interpolanten, die Live-Konstruktion des kubischen Splines und die Trennung von Bias und Varianz an den Entwurfsstellen.

Vor der Veröffentlichung sind dennoch fünf Punkte der Priorität A zu korrigieren. Zwei davon betreffen Grunddefinitionen: Das Glättungsmodell verwendet in Kapitel 14 die Schätzung anstelle der unbekannten wahren Funktion, und Kapitel 15 definiert Interpolation beziehungsweise Glättung allein über `K = n` und `K < n`, obwohl Rang, Datenvektor und Strafterm entscheidend sind. Schwerer wiegt die asymptotische Argumentation: Aus einer einseitigen `O(K^{-8})`-Schranke werden ein tatsächliches MSE-Minimum, eine optimale Knotenzahl und sogar ein fester Bias-Anteil abgeleitet. Dieselbe Überdehnung wird im mehrdimensionalen Satz wiederholt. Schließlich behauptet ein Selbsttest fälschlich, eine Verdopplung der Knotenzahl halbiere die Gitterweite exakt.

## Prüfumfang und Methode

Geprüft wurden die vollständigen Abschnitte `S141.mdx` bis `S145.mdx` und `S151.mdx` bis `S155.mdx` einschließlich aller zugehörigen Widgets und der gemeinsamen B-Spline-Hilfsfunktionen. Die Prüfung umfasste:

- mathematische Definitionen, Voraussetzungen, Beweise, Beispiele und Selbsttests;
- Konsistenz von Knoten-, Stützstellen-, Basis- und Dimensionsnotation;
- Trennung von Approximation, Interpolation, Regression und penalisiertem Glätten;
- Gültigkeit der Konditions-, Fehler-, Bias-, Varianz- und Konvergenzaussagen;
- Randbedingungen kubischer Splines und Wiederverwendung von B-Spline-Basen in R;
- Übereinstimmung zwischen Fließtext, Widget-Beschriftung und Widget-Rechenlogik;
- Tensorprodukt- und additive Modellierung einschließlich Parameterzählung und Raten;
- die offiziellen R-Hinweise zu `splines::bs()` sowie die im Text genannten Primärquellen zu Spline-Fehlerschranken und additiven Raten.

## Priorität A – vor Veröffentlichung korrigieren

### A1. Das Glättungsmodell setzt die Schätzung an die Stelle der wahren Funktion

**Fundstellen:** `src/chapters/14-funktionsapproximation/S141.mdx`, Definition 14.1.3; `widgets/S141DreiProbleme.tsx`

Der Text schreibt

\[
y_i = \widehat f(x_i) + \varepsilon_i
\]

und nennt `\widehat f` anschließend die gesuchte Funktion. Damit wird eine Schätzung, die erst aus den Daten berechnet werden soll, zugleich zur daten­erzeugenden Funktion. Das korrekte Regressionsmodell lautet

\[
y_i = f(x_i) + \varepsilon_i,
\]

wobei `f` unbekannt ist und `\widehat f` aus den Beobachtungen geschätzt wird. Abschnitt 15.3 verwendet diese Trennung später richtig. Das Widget wiederholt die Verwechslung in seiner Formel und beschreibt die grüne wahre Kurve als `\widehat f`.

**Empfohlene Korrektur:** Definition und Widget auf `y_i=f(x_i)+\varepsilon_i` umstellen und explizit zwischen unbekanntem Signal `f`, Beobachtungen `y_i` und Schätzung `\widehat f` unterscheiden.

### A2. `K = n` definiert keine Interpolation und `K < n` keine Glättung

**Fundstellen:** `src/chapters/15-funktionsapproximation-2/S153.mdx`, Definition 15.3.8, Bemerkung 15.3.9 und Selbsttest; `S155.mdx`, Kapitel-Selbsttest und Zusammenfassung

Bei `K=n` interpoliert die unbestrafte KQ-Lösung nur, wenn die quadratische Designmatrix invertierbar ist. Umgekehrt kann auch ein Raum mit `K<n` einen konkreten Datenvektor exakt treffen, wenn `y` im Spaltenraum von `B` liegt. Noch deutlicher widerlegt der Text seine eigene Definition wenige Absätze später: Ein Glättungsspline arbeitet mit Knoten in allen Datenstellen und damit effektiv mit einem datengroßen Raum, glättet aber wegen des Strafterms statt zu interpolieren.

Die nachfolgende Aussage „Bei `K<n` ist [exaktes Treffen] nicht mehr möglich“ ist daher ebenfalls falsch. Richtig ist nur: Bei vollem Spaltenrang und `K<n` kann nicht *jeder* Datenvektor interpoliert werden; für generische verrauschte Daten bleibt ein Residuum.

**Empfohlene Korrektur:** Interpolation über das Verschwinden der Residuen beziehungsweise die Bedingungen `B a = y` definieren. `K=n` und `K<n` nur als typische unbestrafte Regime mit den nötigen Rang- und Datenbedingungen beschreiben. Penalisiertes Glätten getrennt einordnen.

### A3. Aus einer `O(K^{-8})`-Schranke folgt kein tatsächliches MSE-Optimum

**Fundstellen:** `src/chapters/15-funktionsapproximation-2/S154.mdx`, Gleichung 15.4.7, Bemerkung 15.4.7, Beispiel 15.4.8, Selbsttests und Zusammenfassung; `widgets/S154BiasVarianz.tsx`

Satz 15.4.2 beweist eine *obere Schranke* für den gemittelten quadrierten Bias. Daraus wird anschließend die Gleichung

\[
\operatorname{MSE}=O(K^{-8})+\sigma^2K/n
\]

als wäre der erste Term asymptotisch gleich einer positiven Konstante mal `K^{-8}`. Der Text ersetzt das Landau-Symbol dann ohne zusätzliche Annahme durch `c_1K^{-8}` und leitet daraus `K^\star\asymp n^{1/9}`, `MSE=O(n^{-8/9})` und einen Bias-Anteil von exakt einem Neuntel ab.

Eine einseitige obere Schranke erlaubt diese Schlüsse nicht. Der Bias kann schneller fallen, auf Teilfolgen null sein oder wegen wechselnder, nicht geschachtelter Räume oszillieren. Für die Rate als Optimalitäts- oder Minimax­aussage braucht es eine passende untere Schranke beziehungsweise eine zweiseitige asymptotische Äquivalenz und weitere Annahmen an Funktionsklasse, Design und Raumfolge. Das Widget verstärkt die Überdehnung, indem es das zufällig beobachtete Verhältnis von etwa einem Neuntel als Vorhersage von Bemerkung 15.4.7 ausgibt.

**Empfohlene Korrektur:** Die Rechnung ausdrücklich als heuristisches Balance-Modell unter der zusätzlichen Annahme `Bias² \asymp c_1K^{-8}` kennzeichnen. Die bewiesene Aussage als MSE-Obergrenze formulieren. Den Ein-Neuntel-Anteil nur als Eigenschaft des Proxy-Modells nennen, nicht als allgemeinen Satz und nicht als theoretische Bestätigung der Simulation.

### A4. Der multivariate „Satz“ wiederholt dieselbe unbewiesene Optimalitätsbehauptung

**Fundstellen:** `src/chapters/15-funktionsapproximation-2/S155.mdx`, Satz 15.5.5, Bemerkung 15.5.6, Widget und Kapitel-Selbsttest

Auch hier wird aus einem Bias-Oberterm `O(K^{-8})` und der exakten gemittelten Varianz `\sigma^2K^p/n` ein tatsächlich minimierendes `K^\star\sim n^{1/(8+p)}` und eine erreichte Rate `O(n^{-8/(8+p)})` abgeleitet. Als *Wahl, die die gezeigte Obergrenze ausbalanciert*, ist die Rechnung sinnvoll. Als Aussage über das tatsächliche Optimum folgt sie nicht aus dem vorangehenden Beweis.

Zusätzlich setzt die Tensorprodukt-Approximation mehr voraus als „beschränkte vierte partielle Ableitungen“ in beiläufiger Form: Die verwendete Approximationsschranke, ein reguläres Design und eine geeignete Folge von Tensorprodukt-Räumen müssen festgelegt werden. Die Tabelle „`n` für MSE ≤ 0,01“ invertiert anschließend eine Landau-Rate mit versteckter Konstante und sieht dadurch genauer aus, als die Theorie erlaubt.

**Empfohlene Korrektur:** Satz als Obergrenzen- und Balance-Aussage formulieren; die benötigte Tensorprodukt-Approximationsannahme nennen. Die Datenmengen ausschließlich als Proxy „bei Konstante 1“ beschriften. Aussagen über minimax-optimale Raten nur mit entsprechender Quelle und den zugehörigen Funktionsklassen- und Designannahmen machen.

### A5. Verdoppelte Knotenzahl halbiert die Gitterweite nicht exakt

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S155.mdx`, zweiter Kapitel-Selbsttest

Auf einem gleichmäßigen Gitter mit `N` Knoten gibt es `N-1` Teilintervalle und

\[
h=(b-a)/(N-1).
\]

Eine Verdopplung von `N` auf `2N` multipliziert `h` daher mit `(N-1)/(2N-1)`, nicht exakt mit `1/2`. Die Tabellen in Abschnitt 15.2 machen es korrekt: Sie verdoppeln die Zahl der Teilintervalle und gehen deshalb bei den Knotenzahlen von `5` auf `9`, dann `17` und `33`.

**Empfohlene Korrektur:** Im Selbsttest „Verdoppeln wir die Zahl der Teilintervalle (also `N` Knoten auf `2N-1`)“ schreiben. Dann sind die Faktoren 16 und 4 für die Schranken exakt.

## Priorität B – fachlich oder didaktisch deutlich verbessern

### B1. Das Approximationsproblem ist mit `\|f-\widehat f\|\approx0` nicht definiert

**Fundstelle:** `src/chapters/14-funktionsapproximation/S141.mdx`, Definition 14.1.1 und Bemerkung 14.1.5

„Ungefähr null“ ist weder eine Bedingung noch eine Optimierungsaufgabe. Sauber ist, einen Ansatzraum `\mathcal A` vorzugeben und `\widehat f` als Minimierer von `\|f-g\|` über `g\in\mathcal A` zu suchen oder eine konkrete Toleranz zu verlangen. Ebenso ist „Approximationsprobleme lösen wir fast nie direkt“ zu pauschal: Kleinste-Quadrate- und Minimax-Approximation minimieren Normen gerade direkt; Interpolation an ausgewählten Stellen ist nur ein wichtiger Weg.

### B2. Die Konditionszahl beschreibt relative Lösungssensitivität, nicht einfach „Fehlerverstärkung durch B“

**Fundstelle:** `src/chapters/14-funktionsapproximation/S142.mdx`, Kriterienliste

Bei `B a=y` hängt die absolute Wirkung einer Störung in `y` an `\|B^{-1}\|`; `\kappa(B)` kontrolliert unter den üblichen Voraussetzungen eine *relative* Störungsabschätzung. Die Kurzform im Text lässt Matrixwirkung und Inversionssensitivität ineinanderlaufen. Eine präzise Formulierung würde zugleich den späteren Unterschied zwischen Koeffizientenkondition und Stabilität des Interpolationsoperators klarer machen.

### B3. Die Aussage zu `poly()` vermischt zwei verschiedene Matrizen

**Fundstelle:** `src/chapters/14-funktionsapproximation/S143.mdx`, Bemerkung 14.3.12

`poly(x,3)` liefert drei zentrierte orthonormale Spalten und hat für sich in 2-Norm Konditionszahl 1. Erst `cbind(1, poly(x,3))` ergänzt die unnormierte konstante Spalte; dann ist die Konditionszahl `\sqrt n`. Der Text springt zwischen diesen beiden Objekten. Der Rechentrick bleibt richtig, sollte aber matrixgenau beschrieben werden.

### B4. Lokaler B-Spline-Träger garantiert nicht allgemein geometrischen Abfall der Fit-Änderung

**Fundstellen:** `src/chapters/14-funktionsapproximation/S144.mdx`, Bemerkung 14.4.17; `S145.mdx`, Vergleichstabelle

Kompakter Träger macht die Designmatrix dünn besetzt, aber ihre Inverse ist im Allgemeinen dicht. Ein entfernter Koeffizient oder Funktionswert kann daher reagieren. Geometrischer Abfall folgt für geeignete, gleichmäßig kontrollierte Bandsysteme aus zusätzlichen Konditionsannahmen; der Faktor „gut ein Viertel je Knotenabstand“ ist nur der konkrete Widget-Datensatz. Der Text räumt die fehlende exakte Abschottung ein, formuliert den geometrischen Abfall davor aber als allgemeine Eigenschaft.

### B5. Das R-Beispiel in Kapitel 14 konserviert die B-Spline-Basis nicht vollständig

**Fundstelle:** `src/chapters/14-funktionsapproximation/S144.mdx`, Bemerkung 14.4.12

Beim zweiten Aufruf von `splines::bs()` werden nur die inneren `knots` weitergereicht. Laut offizieller R-Dokumentation hängt die Basis ohne explizite `Boundary.knots` weiter vom Wertebereich des neuen `x` ab. Abschnitt 15.3 erklärt und repariert genau diesen Fehler bereits. Kapitel 14 sollte dieselbe vollständige Fassung mit `Boundary.knots = attr(B, "Boundary.knots")` verwenden; optional sollte auch `degree` explizit gleich gehalten werden.

### B6. „Monoton“ reicht für einen invertierbaren Normalizing Flow nicht

**Fundstelle:** `src/chapters/14-funktionsapproximation/S145.mdx`, Ausblick zu Normalizing Flows

Eine nur nicht fallende Splinefunktion kann konstante Stücke besitzen und ist dann nicht invertierbar. Normalizing Flows benötigen eine strikt monotone, bijektive Transformation mit geeigneter Ableitung; häufig werden monotone rationale quadratische Splines verwendet. Der Ausblick sollte „streng monoton“ sagen und die globale Bijektivität beziehungsweise Randbehandlung nicht ausblenden.

### B7. Das Fehler-Setup in Abschnitt 15.3 nimmt mit `iid` bereits mehr an als behauptet

**Fundstellen:** `src/chapters/15-funktionsapproximation-2/S153.mdx`, Definition 15.3.1 und Bemerkung 15.3.2

Bei festen Entwurfsstellen ist `iid` stärker als nötig und impliziert bei existierender Varianz bereits gleiche Randverteilungen. Für die KQ-Herleitung genügt bedingter Mittelwert null; Abschnitt 15.4 fügt Unkorreliertheit und Homoskedastizität ausdrücklich hinzu. Didaktisch sauberer ist es, in 15.3 nur die tatsächlich benötigte Mittelwertannahme zu setzen und die stärkeren Annahmen später einzuführen.

### B8. Die Schoenberg-Whitney-Bedingung braucht eine Randkonvention

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S153.mdx`, Bemerkung 15.3.7 und zugehöriger Selbsttest

Die strikte Bedingung `\tau_k<x_{i_k}<\tau_{k+q+1}` ist die klassische Positivitätsbedingung im Inneren. Bei offenen, an den Rändern geklemmten Knotenvektoren werden jedoch auch Auswertungen an den Randpunkten verwendet, an denen die erste beziehungsweise letzte B-Spline-Basisfunktion positiv ist, obwohl die strikte Ungleichung formal scheitert. Die „genau dann“-Formulierung sollte die übliche Randkonvention nennen oder sicherer über `B_k(x_{i_k})>0` formulieren.

### B9. `\widehat\sigma=\sqrt{RSS/(n-K)}` ist nicht voraussetzungslos eine Schätzung der Messstreuung

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S153.mdx`, Beispiel 15.3.10 und Widget

Die Residuenvarianz ist unter vollem Rang und korrekt spezifiziertem linearem Mittelwertmodell unverzerrt für `\sigma^2`. Liegt die wahre Funktion nicht im Ansatzraum, enthält `RSS/(n-K)` zusätzlich Lack-of-fit; bei starkem Overfitting oder schlechter Kondition ist die Interpretation ebenfalls problematisch. Im Beispiel wird der Wert sinnvoll als Diagnose benutzt, aber als „übliche Schätzung der Fehlerstreuung“ zu vorbehaltlos bezeichnet.

### B10. Die Zusammenfassung der `O(h^4)`-Ordnung verliert die Randbedingung wieder

**Fundstellen:** `src/chapters/15-funktionsapproximation-2/S152.mdx`, Bemerkung 15.2.9; `S155.mdx`, Kernkonzepte und Selbsttest

Bemerkung 15.2.4 erklärt vorbildlich, dass der natürliche kubische Spline ohne passende Randdaten global nur Ordnung `h^2` haben kann. Die spätere Stärkenliste sagt dann wieder pauschal „Approximationsfehler `O(h^4)`“ und verbindet ihn mit dem natürlichen Spline des Abschnitts. Die Kurzfassungen müssen „bei passenden Randbedingungen“ mitnehmen. Die Konstante `5/384` gilt insbesondere für vollständige Randbedingungen und auch für passende zweite Randableitungen; der Sinusfall erfüllt letztere, weil `f''` an beiden Enden null ist.

### B11. Der GCV-Abschnitt widerspricht der vorher erklärten Nicht-Schachtelung

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S154.mdx`, Bemerkung 15.4.13

„Der Zähler allein fällt monoton in `K`“ gilt nur für geschachtelte Modellräume. Abschnitt 15.3 zeigt ausdrücklich, dass quantilbasierte Knoten beim Wechsel von `K` nicht geschachtelt sind und `RSS` in elf von 36 Schritten steigt. Der Nenner ist trotzdem nötig, weil Trainings-RSS die Flexibilität systematisch bevorzugt, aber die Monotoniebegründung muss an die bereits erklärte Einschränkung angepasst werden. Zudem entspricht die Hatmatrix-Formel dem Leave-one-out-Fit bei *festgehaltener Basis*; werden Knoten nach jedem Weglassen neu aus den Daten bestimmt, ist es nicht exakt derselbe Fit.

### B12. Der mehrdimensionale Ansatz sollte auf Produktintervallen statt pauschal auf `\mathbb R^p` definiert werden

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S155.mdx`, Definition 15.5.1

Die verwendeten B-Splines leben auf festgelegten Intervallen mit Randknoten, nicht ohne Weiteres auf ganz `\mathbb R`. Sauber sind möglicherweise verschiedene Räume und Größen `K_j` auf Intervallen `I_j`, mit Tensorprodukt auf `I_1\times\cdots\times I_p`. Für die anschließende Zählung darf danach der Spezialfall `K_j=K` verwendet werden.

### B13. Die angegebene GAM-Definition ist zunächst ein additives Regressionsmodell

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S155.mdx`, Definition 15.5.8

`\widehat f(x)=\beta_0+\sum_j f_j(x_j)` ist ein additives Modell für einen metrischen Erwartungswert. Ein *generalisiertes* additives Modell ergänzt eine Antwortverteilung aus der Exponentialfamilie und eine Linkfunktion, etwa `g(E[Y\mid X=x])=\beta_0+\sum_j f_j(x_j)`. Für den roten Faden genügt das additive Gauß-Modell; es sollte nur nicht als vollständige Definition eines GAM ausgegeben werden.

## Priorität C – kleinere Präzisierungen

### C1. „Jeder Interpolant schätzt f schlecht“ ist zu stark

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S153.mdx`, Bemerkung 15.3.3

Aus `RSS=0` folgt keine gute Schätzung, aber auch nicht logisch, dass jeder Interpolant schlecht sein muss. Treffender ist: Die Trainings-RSS kann zwischen sehr guten und beliebig schlechten Interpolanten nicht unterscheiden und bietet deshalb ohne Strukturannahme keine Grundlage für die Auswahl.

### C2. Der Grad des Polynominterpolanten muss nicht mit jedem Datenpunkt steigen

**Fundstelle:** `src/chapters/14-funktionsapproximation/S145.mdx`, letzter Selbsttest

Mit `n` Punkten wächst der verwendete Ansatzraum bis zum Grad `n-1`; der tatsächlich resultierende Interpolant kann weiterhin kleineren Grad haben. Genau diese Unterscheidung erklärt Abschnitt 14.3 vorher ausführlich. Die Schlussformulierung sollte nicht wieder sagen, die Punkte „treiben den Grad auf `n-1`“.

### C3. Die GCV-Definition gilt im dargestellten Fall mit vollem Rang

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S154.mdx`, Definition 15.4.12

Für den unbestraften KQ-Fit mit vollem Rang ist `tr(H)=K`. Allgemeiner steht in GCV die effektive Freiheitsgradzahl `tr(H)`, besonders bei penalisierten Splines. Der Text erwähnt dies später; ein Halbsatz in der Definition würde die Reichweite sofort klären.

### C4. Die Pseudoinverse ist für die Varianzrechnung nicht grundsätzlich nötig

**Fundstelle:** `src/chapters/15-funktionsapproximation-2/S151.mdx`, Vorkenntnisliste

Bei vollem Spaltenrang kann die Varianzrechnung vollständig mit `(B^T B)^{-1}B^T` durchgeführt werden. Die Pseudoinverse ist die einheitliche und rangrobuste Schreibweise, aber „ohne die Pseudoinverse gar nicht“ ist didaktisch unnötig absolut.

### C5. Die Tabelle zur Zielgenauigkeit ist eine Rate-Illustration, keine Stichprobenplanung

**Fundstellen:** `src/chapters/15-funktionsapproximation-2/S155.mdx`, Bemerkung 15.5.6; `widgets/S155Skalierung.tsx`

Die vorhandene Fußnote weist bereits auf versteckte Konstanten hin. Überschrift und Widget-Readout sollten noch deutlicher „Proxy bei Konstante 1“ sagen, damit die Zahlen nicht als garantierte Mindeststichprobenumfänge gelesen werden.

## Abschnittsweises didaktisches Urteil

### Kapitel 14

- **14.1 Drei Aufgaben:** Anschaulicher Einstieg und sehr gute Gegenüberstellung der Interpolanten. Das falsche Glättungsmodell und die informelle Approximationsdefinition betreffen allerdings genau die Begriffe, auf denen beide Kapitel aufbauen, und müssen früh korrigiert werden.
- **14.2 Basisdarstellung:** Sehr klare Übersetzung von Funktionenräumen in lineare Algebra. Der Satz zur Koordinatenabbildung verhindert ein häufiges Missverständnis. Kondition und absolute beziehungsweise relative Sensitivität sollten noch etwas sauberer getrennt werden.
- **14.3 Polynominterpolation:** Fachlich der stärkste Abschnitt des Kapitels. Existenz, Eindeutigkeit, Basisabhängigkeit, Lebesgue-Verstärkung und Runge-Phänomen greifen überzeugend ineinander. Die `poly()`-Passage ist die einzige konkrete rechnerische Präzisierung.
- **14.4 Splines und B-Splines:** Inhaltlich reich und weitgehend korrekt, insbesondere bei Dimension, Randbedingungen und korrigierter Knotenfolge. Die R-Basis muss vollständig konserviert werden; die lokale Wirkung darf nicht aus dem kompakten Träger allein als allgemeiner geometrischer Abfall gefolgert werden.
- **14.5 Ausblick:** Gute Zusammenfassung und sinnvoller Übergang zu Statistik und maschinellem Lernen. Normalizing Flows benötigen strikte Monotonie, und der tatsächliche Polynomgrad darf in der Schlussformulierung nicht wieder mit dem maximal erlaubten Grad verwechselt werden.

### Kapitel 15

- **15.1 Minimale Krümmung:** Sehr sauberer Satz mit vollständig ausgeführtem Beweis. Die Randterme, Eindeutigkeit und Existenz werden genauer behandelt als in vielen Einführungen. Hier bestehen nur kleinere redaktionelle Präzisierungen.
- **15.2 Approximationsordnung:** Die Trennung zwischen Existenzsatz, Randbedingungen, Schranke und gemessenem Fehler ist ausgezeichnet. Wichtig ist, diese Einschränkungen in den späteren Zusammenfassungen nicht wieder zu verlieren und die Gitterverfeinerung über Teilintervalle statt ungenau über „verdoppelte Knoten“ zu formulieren.
- **15.3 Glättung als KQ:** Der Basis- und Projektionszugang ist überzeugend; die R-Reproduktion ist korrekt. Die Definition über `K=n` beziehungsweise `K<n` ist jedoch fachlich zu grob und kollidiert mit dem späteren penalisierten Glättungsspline. Rang, konkrete rechte Seite und Strafterm müssen in die Begriffsbildung eingehen.
- **15.4 Bias-Varianz:** Die exakte Varianzformel und ihre Herleitung über die Spur der Hatmatrix sind hervorragend. Der zentrale Schwachpunkt ist die Verwandlung einer Bias-Obergrenze in eine exakte asymptotische Form. Mit klarer Kennzeichnung als Balance-Heuristik bleibt die didaktische Pointe vollständig erhalten.
- **15.5 Mehrdimensionale Modelle:** Sehr guter Abschlussbogen vom Tensorprodukt zum Fluch der Dimensionalität und zu additiven Strukturen. Rate und Stichprobenzahlen müssen als Obergrenzen beziehungsweise Proxys formuliert werden; außerdem sollte zwischen additivem Modell und GAM unterschieden werden.

## Empfohlene Reihenfolge der Korrekturen

1. A1 und A2, weil sie die Grundbegriffe Glättung und Interpolation betreffen und in Widgets beziehungsweise Selbsttests wiederholt werden.
2. A3 und A4, weil aus einer bewiesenen Obergrenze derzeit unbelegte Optimalitätsaussagen entstehen.
3. A5 sowie B10 und B11, weil Selbsttests und Zusammenfassungen sonst falsche Verallgemeinerungen festigen.
4. B3–B9, weil sie Rechenpraxis, R-Code, Rangbedingungen und Widget-Interpretation betreffen.
5. B1–B2, B12–B13 und C1–C5 als terminologische und didaktische Abrundung.

Nach diesen Korrekturen sind die Kapitel inhaltlich sehr stark und als Abschluss des Skripts geeignet. Die Dramaturgie, die Beweise und fast alle Widgets können bestehen bleiben; nötig sind vor allem präzisere Voraussetzungen und eine klarere Trennung zwischen bewiesener Schranke, heuristischer Balance und tatsächlicher Optimalitätsaussage.
