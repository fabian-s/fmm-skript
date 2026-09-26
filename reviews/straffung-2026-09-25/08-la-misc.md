# Straffung Kapitel 8 (08-la-misc), 2026-09-26

Ausgangsstand: keine Vorarbeit (git diff gegen 21b998d war für S81–S85 leer).

## 1. Zahlen (`zaehlen.mjs 08-la-misc`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | --- | --- | --- |
| S81 | 3664 → 3562 (−2,8 %) | 976 → 868 | 4640 → 4430 (−4,5 %) |
| S82 | 1202 → 1143 (−4,9 %) | 190 → 210 | 1392 → 1353 (−2,8 %) |
| S83 | 2413 → 2075 (−14,0 %) | 435 → 648 | 2848 → 2723 (−4,4 %) |
| S84 | 2458 → 2072 (−15,7 %) | 1336 → 1463 | 3794 → 3535 (−6,8 %) |
| S85 | 1029 → 764 (−25,8 %) | 0 → 0 | 1029 → 764 (−25,8 %) |
| **Summe** | **10766 → 9616 (−10,7 %)** | **2937 → 3189** | **13703 → 12805 (−6,6 %)** |

Der Richtwert von −15 bis −20 % für den Haupttext ist nicht erreicht. Gut 350 Wörter
Folienstoff (KERN) lagen in Vertiefungen und sind jetzt wieder im Haupttext (siehe unten).
Ohne diese Rückholung läge der Haupttext bei etwa −14 %.

## 2. Verlagerungen

**In Vertiefungen verschoben (EXTRA)**

- S81 „Genauigkeit der beiden Schätzungen“: Zwei Boxen zusammengelegt. Sie behandeln die quadratische Genauigkeit des Rayleigh-Quotienten, den Faktor 3,7 aus Beispiel 8.1.5 und das Abbruchkriterium für λ₁ < 0. Die Folie hat dazu nur eine Klammerbemerkung. Die kleine Box im Beispiel (unter 60 Wörtern) ist aufgelöst.
- S81 „Beweis von Teil 1 über das charakteristische Polynom“: der Beweis über Determinante und Spur. Die Folie beweist nur Teil 2.
- S81 „Reihenfolge der Eigenwerte und Rücktransformation“ (im Beispiel zur Diagonalisierung): Die Anmerkung zur Reihenfolge und die Probe zu Teil 2 stehen nicht auf den Folien.
- S81 „Beweise der Ähnlichkeit und der Potenzzerlegung“: Zwei getrennte Beweis-Boxen sind jetzt eine. Der Induktionsbeweis steht auf einer Anhangsfolie.
- S82 „Die Qualität der Rekonstruktionen messen“: der zweite R-Block (Anhangsfolie `svd-error-full`) mit seiner Deutung. Im Haupttext steht dazu eine Satzfolge über die Qualität.
- S83 „Das Residuum als negativer Gradient“: die Bemerkung mit der quadratischen Form. Die Folie hat nur die Analogiezeile, die im Haupttext bleibt.
- S83 „Beweis des Konvergenzsatzes und eine Folgerung“: Der Absatz „Die Voraussetzung ist stärker, als sie aussieht“ ist in die Beweis-Box gewandert.
- S83 „Richardson, Jacobi und Gauss-Seidel im Vergleich“: Beispiel die-drei-wahlen-an-einem-2-2-system, nicht auf den Folien.
- S83 „Abbruch nach dem Residuum“: nicht auf den Folien.
- S84 „Fast-Orthogonalität zufälliger Vektoren“: Satz zufallsrichtungen-stehen-fast-senkrecht mit Beweis und Beispiel. Die Folie nennt die Tatsache nur qualitativ. Der Haupttext trägt die Aussage jetzt als Prosa: E = 0, Var = 1/n, Streuung wie 1/√n.
- S84: Die Cauchy-Schwarz-Bemerkung (warum-die-momentenbedingung-an-der) steht jetzt in der Beweis-Box des Einbettungssatzes. Das spart eine Box.
- S84 „Winkeltreue und viele Paare“: Die Überlegung zu mehreren Paaren kam aus der gestrichenen Bemerkung dazu.
- S84 „Sketching für ein Kleinste-Quadrate-Problem“: Algorithmus sketching-fuer-ein-kq-problem. Die Folie hat nur die Zeile min‖SAx−Sb‖.
- S84 „Wie scharf die Schranke ist“: Rückrechnung für m = 600, exakte χ²-Rechnung (m = 768, 9,97 %, Anteile unter 3 % und 1 %) und Konzentrationsungleichungen. Der χ²-Teil aus dem Zahlenbeispiel ist hier zusammengeführt. Die Faustregel 1/√(2m) = 10 % bleibt im Haupttext, weil Folie und Widget-Zahlfrage sie brauchen.
- S84 „Vergleich der Sketching-Matrizen“ (Anhangsfolie): steht jetzt direkt hinter den drei Bauarten. Das Rademacher-Detail (für v = e₁ ist K = 1) kam aus dem Beispiel dazu.

**In den Haupttext zurückgeholt (KERN, lag in Vertiefungen)**

- S81: Algebra der Potenzmethode samt @eq:eq-8-1-1 (Folie „Potenzmethode – Algebraisch“). Klausur WS25/26-1 fragt nach Idee und Startvektoren. Die Beweis-Box setzt jetzt bei der Restabschätzung an.
- S81: Beweis von Teil 2 des Satzes über ähnliche Matrizen. Er steht auf der Folie.
- S81: Definition des Rayleigh-Quotienten in der Bemerkung „Zwei Schätzungen“. Tabelle und Widget im Haupttext benutzen ρ⁽ᵏ⁾.
- S82: Bemerkung „Warum iterativ? Lanczos für große p“ (Folie PCA, „Warum iterative Methoden?“).
- S83: Herleitung von Korollar zahl-der-iterationen. Sie ist die Self-Check-Lösung auf einer gezählten Folie, jetzt in zwei statt drei Schritten.
- S84: Die Schranke ist konservativ, in der Praxis reicht m = 50 (Folie „Praktische Konsequenz“). Neu im Haupttext stehen auch: Subsampling kostet O(m), taugt aber nur bei gestreuter Information; SRHT verbindet schnelle Anwendung mit sehr guter Qualität (Self-Check 2/2).
- S82: dichte Speicherung mit 10²⁰ Einträgen und Zerlegung mit 10³⁰ Operationen (Folie PageRank).

## 3. Gestrichen

- S84, Bemerkung von-quadraten-zu-laengen-und-abstaenden (kein Verweis im Repo): Wurzelziehen und Abstand doppelten den Absatz nach dem Beweis. Die Schranke 0,949 bis 1,049 steht jetzt dort.
- S84, Bemerkung zwei-nachtraege-zur-rechnung (kein Verweis): Sie doppelte das Beispiel. Der Kern (Gewinn ist n/m, nicht (n/m)²; Kovarianzmatrix) steht als Halbsatz im Beispiel.
- S85, zwei Selbsttestfragen: „Schrittzahl wächst logarithmisch“ doppelte die S83-Frage, „Verdoppeln von m“ die S84-Frage.
- S85: Die Bemerkung „Die drei Kernideen“ ist um Wiederholungen gekürzt (etwa 430 → 300 Wörter). Ebenso gekürzt sind der Einleitungsabsatz und der Schlusssatz des Ausblicks.
- S83: Die allgemeine Formel O(c_Schritt·max{1,…}) entfällt; sie ist nur Korollar mal Schrittkosten. Die Kernaussage O(n² log) gegenüber O(n³) steht jetzt vorn.
- S83: Aus der Einleitung fiel ein Satz, der „Warum geben wir uns mit Näherungen zufrieden“ doppelte. Im Beweis des Konvergenzsatzes fiel die wiederholte Display-Gleichung der Fixpunktform.
- S84: Gestrichen sind der Merksatz-Satz („nur gut für spezielle Daten … in dieser Richtung zu lesen“; der Merksatz kommt im Skript gar nicht vor) und der Zusatz „nicht mit m/n“.
- Meta- und Überleitungssätze: „Rechnen wir das … durch“, „sehen wir gleich am Widget“, „Probieren wir beide aus, bevor wir weiterlesen“, „Die Vorschrift mit Laufindex:“, „Bisher haben wir plausibel gemacht … Jetzt beweisen wir es“.
- Deslop-Tells: schlicht, wörtlich, bequem, kriechen, kippen, Preis/Preise (Bemerkungstitel in S85), „genau das/diese“, „nicht nur … sondern auch“, Buchführung, „Erstens/Zweitens“. Kapitelweit steht kein Gedankenstrich mehr.
- Verweise: Alle getippten Links (`?k=…#sec-…`, `(#sec-8.1)`, „Kapitel 5/6/7“) sind auf @sec:, @kap: und @satz: umgestellt; im Kapitel steht keiner mehr.

## 4. Reparierte Fehler

- S81, „Zwei Schätzungen“: Dort stand, Zähler und Nenner hätten denselben Grenzwert, der Quotient laufe gegen 1. Nach der Normierung sind beide exakt 1. Der Titel versprach außerdem zwei Schätzungen, der Haupttext brachte nur eine; das ist jetzt behoben.
- S81, „Wann die Potenzmethode versagt“: „konvergiert nicht mehr“ stimmt für c₁ = 0 nicht, das Verfahren konvergiert gegen eine andere Richtung. Neu: „liefert nicht λ₁, v₁“. Außerdem „größten“ → „betragsgrößten“ Eigenwert.
- S81, Beispiele: „schrumpft um 0,444“ → „auf das 0,444-Fache“, ebenso bei 0,198. Im QR-Beispiel wuchs im ersten Schritt nicht der Schrumpffaktor, sondern der Eintrag.
- S81, QR-Widget: „Alle drei Fälle des Satzes“ → „der Bemerkung“. „Hängt allein am Spektrum“ war falsch, weil Symmetrie keine Spektraleigenschaft ist; neu: „an den Eigenschaften von A“.
- S81, Bemerkung „Aufwand“: Sie nannte nur O(n²) je Sweep nach der Hessenberg-Reduktion, der Selbsttest zitierte sie aber für „O(n³) je QR-Iteration“. Jetzt nennt sie beides.
- S81, Selbsttest: „Eigenvektoren sind verschieden“ → „im Allgemeinen nicht gleich“. Im Widget-Kasten war v₂ grün eingefärbt, obwohl Grün für v₁ steht.
- S82: „Der Surfer“ war nicht eingeführt → „ein zufälliger Surfer“. Der Link „warum numerisch klüger … Kapitel 6“ zeigte auf 6.5 (Zusammenfassung) und zeigt jetzt auf @sec:svd/anwendungen, wo das Argument steht.
- S83, Selbsttest O(n³): „B = I − γA als Matrixprodukt aufbauen“ ist für C = γI kein Matrixprodukt → „Matrixprodukt wie CA“. Die Einleitung „zwei Fragen“ stand vor vier Aussagen. „Präconditionierung“ → „Präkonditionierung“.
- S84, Selbsttest: Der Verweis auf „die Tabelle oben“ zeigte in eine Vertiefung. Die Antwort ist jetzt selbsttragend.
- S85: „Die Zahlen dazu stehen bei @beispiel:richardson-iteration“ war falsch, sie stehen nach dem Korollar; der Verweis ist gestrichen. „Nützlich ist das selten“ klang, als gelte es auch für CG; es ist jetzt auf den Fall C = A⁻¹ beschränkt.

## 5. Ermessensentscheidungen und offene Fragen

- Richtwert Haupttext nicht erreicht (−10,7 %). Weiter kürzen ginge nur an Kernstoff oder an den drei Selbsttestfragen in S81, die nicht von den Folien stammen: Ähnlichkeit und charakteristisches Polynom, QR-Gegenbeispiel Drehung, Aufwand eines Potenzschritts. Das sollte der Dozent entscheiden.
- S82, Lanczos: Die Folienangabe „O(kp²) statt O(p³), rund 10 000-mal schneller“ ist nicht übernommen. Ein früherer Durchgang hatte den pauschalen Faktor verworfen; der Text sagt weiterhin, dass es keinen solchen Faktor gibt. Bitte prüfen.
- S82: Die Folienzahlen „~40× bzw. ~11× schneller“ (knitr-Ausgabe) sind nicht übernommen, weil der Container kein Rscript hat und nichts nachgerechnet werden konnte.
- S84, SRHT: Das Skript nennt O(n log n) für die volle Transformation, die Folie O(n log m). Beibehalten.
- Folien-Quizfragen ohne Selbsttest: Opener-F2 (geometrische Reihe) steht nur als Vorkenntnis im Text, Self-Check F3 (SRHT) nur als Prosa im Haupttext. Opener-F1 (Aᵏv = λᵏv) steht jetzt im Haupttext.
- S83/S85: Die Kernideen in S85 verweisen für den Spektralradius auf das Beispiel die-drei-wahlen…, das jetzt in einer Vertiefung steht. Der Verweis klappt die Box auf. Im Jacobi-Punkt steht ein Konzept-Link auf spectral-radius.
- Vertiefungen im Kapitel: 16 → 17 Boxen, die kleinste hat 67 Wörter, keine zwei stehen direkt nebeneinander.

## 6. Prüfungen (Endstand)

- `npm run typecheck:mdx`: 206 Dateien, ok.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER. Nur „Tabelle ist nicht aktuell“, wie erwartet.
- `npm run test:mdx`: 137/137 Fixtures, Inventar-Test bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte. Die bekannte \cbblue-Negativzeile erscheint wie üblich. Die Kapitel-8-Scripte lesen nur Widget-TSX, ihre Zahlen sind unberührt.
- Headless MathJax (alle 187 Makros, `noundefined` entfernt, Negativtest greift): 1034 Mathe-Literale in S81–S85, 0 Fehler.
- Entfernte Labels (2, beide ohne Verweis): `von-quadraten-zu-laengen-und-abstaenden`, `zwei-nachtraege-zur-rechnung`.
- Keine Fehler in fremden Dateien beobachtet.
