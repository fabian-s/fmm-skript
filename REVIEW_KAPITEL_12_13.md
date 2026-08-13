# Review Kapitel 12 und 13: Konvexität und Optimierung

Stand: 13. August 2026  
Geprüfte Fassung: `claude/textbook-skill-workflow-olwbzr` bei `4ba578e`, zusammengeführt in den Stand von PR #3

## Kurzurteil

Beide Kapitel sind fachlich und didaktisch bereits ungewöhnlich stark. Die Texte bauen die Theorie nicht nur aus den Folien nach, sondern machen Voraussetzungen sichtbar, beweisen zentrale Aussagen, korrigieren zahlreiche Folienfehler und verbinden die Mathematik konsequent mit Statistik und maschinellem Lernen. Besonders gelungen sind die Projektion auf konvexe Mengen, die drei Konvexitätskriterien, die Trennung von notwendiger und hinreichender Optimalität, die schrittweise Entwicklung von Bisektion über Gradientenabstieg zu Newton/BFGS sowie die KKT-Beispiele.

Die interaktiven Elemente sind überwiegend fachlich sauber und didaktisch sinnvoll. Die numerischen Kernaussagen der Widgets zu Bisektion, Fixpunktiteration, Sattelpunkten, Gradientenabstieg, Armijo, Newton, BFGS, Momentum und der R-Beispielfunktion stimmen mit den zugehörigen Formeln überein. Der Produktions-Build und die MDX-Tests laufen vor den Korrekturen vollständig durch.

Es bleiben fünf Korrekturen der Priorität A und mehrere Präzisierungen der Priorität B. Die wichtigsten Probleme sind keine Rechenfehler in den langen Beweisen, sondern zu weit formulierte Schlussfolgerungen: exakte Niveaumengen werden mit Subniveaumengen verwechselt, Softwareausgaben werden ohne Konvergenzprüfung zu optimalen Lösungen erklärt, eine Münzwurf-Heuristik wird als allgemeine Aussage über hochdimensionale Sattelpunkte präsentiert, und ein Newton-Selbsttest behauptet für beliebige quadratische Funktionen ein Minimum.

## Prüfumfang und Methode

Geprüft wurden die vollständigen Abschnitte `S121.mdx` bis `S125.mdx` und `S131.mdx` bis `S136.mdx` einschließlich aller zugehörigen Widgets. Die Prüfung umfasste:

- mathematische Definitionen, Voraussetzungen, Beweise, Beispiele und Selbsttests;
- Konsistenz von Zeilen-/Spaltenkonventionen und `argmin`-Notation;
- Abgrenzung notwendiger, hinreichender, lokaler und globaler Aussagen;
- statistische Interpretationen von Ridge, Lasso, Likelihood und SGD;
- Übereinstimmung zwischen Fließtext, Widget-Parametrisierung und Widget-Rechenlogik;
- Links und MDX-Verarbeitung über den vollständigen Build;
- die vorhandenen 81 MDX-Parser-Fixtures und den Oracle-Regressionstest.

## Priorität A – vor Veröffentlichung korrigieren

### A1. Konvex sind Subniveaumengen, nicht notwendig Niveaumengen

**Fundstelle:** `src/chapters/12-konvexitaet/S125.mdx`, direkt nach Satz 12.5.3

Der Text beweist korrekt, dass

\[
\{x : f(x) \le c\}
\]

konvex ist, nennt diese Menge zunächst korrekt *Subniveaumenge* und schließt dann: „Konvexe Funktionen haben also konvexe Niveaumengen.“ Exakte Niveaumengen \(\{x:f(x)=c\}\) sind jedoch im Allgemeinen nicht konvex; für \(f(x)=x^2\) ist das Niveau \(c=1\) die Menge \(\{-1,1\}\). Die Schlussformulierung muss bei *Subniveaumengen* bleiben. Das ist besonders wichtig, weil das Glossarziel „Niveaumengen“ sonst eine falsche allgemeine Eigenschaft vermittelt.

**Empfohlene Korrektur:** „Konvexe Funktionen haben also konvexe Subniveaumengen.“ Optional kann ein Halbsatz den Unterschied zu exakten Niveaumengen nennen.

### A2. Zwei verschiedene Lasso-Ausgaben sind nicht automatisch beide optimal

**Fundstelle:** `src/chapters/12-konvexitaet/S125.mdx`, letzter Selbsttest

Die Aussage ist als wahr markiert:

> Meldet ein LASSO-Programm bei zwei verschiedenen Startwerten zwei verschiedene Koeffizientenvektoren, so sind trotzdem beide optimal.

Konvexität garantiert, dass jedes *lokale Minimum* global ist. Sie garantiert nicht, dass jede Softwareausgabe ein lokales Minimum ist. Ein Verfahren kann wegen Iterationslimit, unpassender Toleranz, numerischer Probleme oder eines Implementierungsfehlers vorzeitig abbrechen. Gerade Kapitel 13.6 warnt später ausdrücklich davor, den Konvergenzcode nicht zu lesen.

**Empfohlene Korrektur:** Die Aussage an eine nachgewiesene Optimalitätsbedingung knüpfen, etwa: „Erfüllen beide Ausgaben die Optimalitätsbedingungen, können beide trotz Verschiedenheit global optimal sein.“ In der Erklärung sollte auf Zielwert, KKT-/Subgradientenbedingung und Konvergenzstatus verwiesen werden.

### A3. Die hochdimensionale Sattelpunkt-Heuristik wird zur Tatsachenbehauptung überdehnt

**Fundstellen:** `src/chapters/13-optim/S132.mdx`, Bemerkung 13.2.12 und letzter Selbsttest

Die Münzwurfrechnung ist als bewusstes Toy-Modell nützlich: Unter unabhängigen, fairen Vorzeichen wäre positive Definitheit exponentiell selten. Daraus folgt aber nicht allgemein,

- dass genauere Zufallsmatrixmodelle „am Bild nichts ändern“,
- dass ein Verfahren bei neuronalen Netzen „fast immer“ an einem Sattel und „fast nie“ an einem schlechten lokalen Minimum stoppt, oder
- dass stationäre Punkte in hohen Dimensionen ohne Modellannahmen „typischerweise“ Sattelpunkte sind.

Die Eigenwertvorzeichen sind weder unabhängig noch fair verteilt; außerdem ist die Verteilung der *vom Optimierer besuchten* stationären Punkte nicht die Verteilung beliebiger kritischer Punkte. Degenerierte Hesse-Matrizen und nahezu flache Richtungen sind in überparametrisierten Modellen ebenfalls zentral. Der derzeit als wahr markierte Selbsttest prüft daher keine allgemeingültige Aussage.

**Empfohlene Korrektur:** Den Absatz ausdrücklich als Vorzeichenheuristik bezeichnen und die belastbare Aussage stehen lassen: Bei invertierbarer Hesse-Matrix genügt bereits je ein positives und negatives Eigenwertvorzeichen für einen Sattel, während ein lokales Minimum positive Definitheit verlangt. Den Selbsttest auf die Konsequenz *unter dem Münzwurfmodell* beschränken.

### A4. „Sattelpunkt“ wird zu eng definiert

**Fundstelle:** `src/chapters/13-optim/S132.mdx`, Definition 13.2.10

Die Definition nennt jeden stationären Punkt mit indefiniter Hesse-Matrix „Sattelpunkt“ und räumt danach ein, dass etwa \(x^3\) trotz verschwindender, semidefiniter Hesse-Matrix weder Minimum noch Maximum ist. Damit wird ein hinreichendes, nicht ausgeartetes Kriterium als allgemeine Definition verwendet. Das führt direkt zu einer begrifflichen Lücke: Der Text beschreibt \(x^3\) inhaltlich als Sattelverhalten, darf den Punkt nach seiner eigenen Definition aber nicht so nennen.

**Empfohlene Korrektur:** Die Definition „nicht ausgearteter Sattelpunkt“ oder „strikter Sattelpunkt“ nennen. Danach kann der allgemeinere geometrische Sattelbegriff erläutert werden. So bleibt die für Algorithmen wichtige indefinite Hesse-Matrix im Mittelpunkt, ohne den Oberbegriff zu verengen.

### A5. Newton trifft nicht auf jeder quadratischen Funktion ein Minimum

**Fundstelle:** `src/chapters/13-optim/S134.mdx`, zweiter Selbsttest

Als wahr markiert ist:

> Auf einer quadratischen Funktion trifft Newton das Minimum in einem Schritt, ganz gleich, wie schlecht konditioniert sie ist und wo wir starten.

Das gilt nur für eine quadratische Funktion mit invertierbarer positiv definiter Hesse-Matrix. Bei negativer Definitheit trifft Newton ein Maximum, bei Indefinitheit einen Sattel, und bei singulärer Hesse-Matrix ist der Schritt in der angegebenen Form nicht definiert. Der Abschnitt erklärt diese Fälle vorher korrekt; der Selbsttest hebt die nötige Voraussetzung wieder auf.

**Empfohlene Korrektur:** „Auf einer strikt konvexen quadratischen Funktion …“ und in der Erklärung explizit „positiv definite Hesse-Matrix“ ergänzen. Der kapitelweite Selbsttest in S136 formuliert es bereits korrekt.

## Priorität B – fachlich oder didaktisch deutlich verbessern

### B1. Der Epigraph braucht einen linearen Umgebungsraum

**Fundstelle:** `src/chapters/12-konvexitaet/S123.mdx`, Definitionen 12.3.5 und 12.3.6

Wenn \(\mathcal X\) zunächst nur eine Menge ist, ist „konvexe Teilmenge von \(\mathcal X\times\mathbb R\)“ formal nicht definiert: Konvexität lebt in einem Vektorraum. Sauber ist \(\mathcal X\subseteq\mathbb R^n\) und \(\operatorname{epi}(f)\subseteq\mathbb R^n\times\mathbb R\). Dann folgt aus der Konvexität des Epigraphen tatsächlich die Konvexität von \(\mathcal X\).

### B2. Die Ridge-Aussage zu Kondition und Varianz braucht Voraussetzungen

**Fundstelle:** `src/chapters/12-konvexitaet/S123.mdx`, Bemerkung 12.3.17

Das Addieren von \(\lambda I\) hebt die Eigenwerte von \(X^TX\) und verbessert für \(\lambda>0\) dessen spektrale Konditionszahl. Dass zugleich die Varianz der Schätzung sinkt, gilt in der üblichen linearen Modellrechnung im Vergleich zum KQ-Schätzer beziehungsweise komponentenweise in den Singulärrichtungen. Ohne diese statistischen Voraussetzungen ist „drückt … die Varianz der Schätzung“ zu pauschal.

### B3. Startwerte beeinflussen den Rechenweg auch bei eindeutiger Lösung

**Fundstelle:** `src/chapters/12-konvexitaet/S125.mdx`, Bemerkung 12.5.7

„Startwerte spielen keine Rolle“ ist nur für die mathematische Lösung richtig. Laufzeit, Konvergenzgeschwindigkeit, Abbruchstatus und numerische Stabilität können auch bei strikt konvexen Problemen vom Startwert abhängen. Präziser ist: „Jeder korrekt konvergierte Lauf hat dieselbe Lösung; der Rechenweg kann trotzdem vom Startwert abhängen.“

### B4. Die Landkarte nicht-konvexer Probleme spricht in Allsätzen

**Fundstelle:** `src/chapters/12-konvexitaet/S125.mdx`, Bemerkung 12.5.7

„Nicht-konvexe Probleme haben lokale Minima und Sattelpunkte. Verschiedene Startwerte führen zu verschiedenen Lösungen“ ist nicht allgemein richtig. Nicht-konvexe Funktionen *können* solche Punkte und verschiedene Einzugsgebiete haben; manche besitzen dennoch genau ein Minimum, und ein konkretes Verfahren kann von allen betrachteten Starts dasselbe Ergebnis liefern.

### B5. Die Lasso-Selbsttesterklärung formuliert die Rangabhängigkeit missverständlich

**Fundstelle:** `src/chapters/12-konvexitaet/S125.mdx`, Selbsttest zur Summe einer konvexen und einer strikt konvexen Funktion

Der Kleinste-Quadrate-Term „ist nur konvex, sobald die Designmatrix rangdefizient ist“ klingt, als sei er sonst nicht konvex. Er ist immer konvex und bei vollem Spaltenrang strikt konvex; bei Rangdefizienz ist er *nur konvex, nicht strikt konvex*.

### B6. `argmin` wird als Punkt statt als Menge definiert

**Fundstellen:** `src/chapters/13-optim/S131.mdx`, Definition 13.1.2 und Beispiele; `S132.mdx`, Definition 13.2.1

S132 weist später selbst korrekt darauf hin, dass `argmin` eine Menge ist. In den definierenden Gleichungen steht dennoch \(x^\star=\arg\min f\). Gerade weil Mehrdeutigkeit in Kapitel 12 ausführlich behandelt wurde, sollte in den Definitionen \(x^\star\in\arg\min f\) stehen. In informellen Modellformeln kann die übliche Kurzschreibweise anschließend als Konvention erlaubt werden.

### B7. Penalisiertes und beschränktes Problem sind nicht ohne Qualifikation „äquivalent“

**Fundstellen:** `src/chapters/13-optim/S131.mdx`, Beispiel 13.1.4; `S135.mdx`, Ridge/Lasso-Einleitung

Für konvexe Probleme lässt sich zu einer penalisierten Lösung ein passendes Budget wählen. Umgekehrt entspricht eine bindende Nebenbedingung unter geeigneten Regularitätsbedingungen einem nichtnegativen Multiplikator; bei inaktiver Nebenbedingung ist er null. Die Zuordnung ist datenabhängig und nicht notwendig eindeutig. S135 erklärt einen Teil davon später korrekt, die einleitende Behauptung „zwei äquivalente Arten“ sollte diese Einschränkung bereits ankündigen.

### B8. Quadratische Newton-Konvergenz verlangt Glattheit, nicht nur eine einfache Nullstelle

**Fundstellen:** `src/chapters/13-optim/S131.mdx`, Bemerkung 13.1.13; `S134.mdx`, Bemerkungen 13.4.3 und 13.4.12

Die einfache Nullstelle beziehungsweise invertierbare Hesse-Matrix ist notwendig für die übliche lokale Theorie, aber nicht allein hinreichend für die angegebene quadratische Rate. Benötigt wird zusätzlich ausreichende Glattheit, typischerweise eine lokal Lipschitz-stetige Ableitung des Nullstellensystems (bei Optimierung: lokal Lipschitz-stetige Hesse-Matrix). Die Formel mit \(f''(x^\star)\) setzt entsprechende Regularität ohnehin implizit voraus.

### B9. Eine Folge \(\gamma_k\to0\) ist nicht die allgemeine Schrittweitenlösung

**Fundstelle:** `src/chapters/13-optim/S131.mdx`, Ende von Bemerkung 13.1.18

Der Text empfiehlt für die deterministische Fixpunktiteration „in der Praxis“ große, dann gegen null gehende Schritte und verweist auf die Liniensuche. Eine gegen null gehende Folge kann die Iteration unnötig ausbremsen oder bei zu schnell fallenden Schritten vor dem Ziel festhalten. Armijo-Backtracking wählt adaptive Schritte, verlangt aber gerade nicht \(\gamma_k\to0\). Diminishing step sizes gehören später in den stochastischen Kontext von SGD, dort mit zusätzlichen Summierbarkeitsbedingungen.

### B10. Lipschitz-Stetigkeit und Differenzierbarkeit sind nicht geordnet

**Fundstelle:** `src/chapters/13-optim/S133.mdx`, nach Definition 13.3.8

„Lipschitz-Stetigkeit ist … schwächer als Differenzierbarkeit“ ist falsch. Die Eigenschaften sind ohne weitere Einschränkungen nicht vergleichbar: \(|x|\) ist Lipschitz-stetig, aber in null nicht differenzierbar; \(x^2\) ist auf \(\mathbb R\) differenzierbar, aber nicht global Lipschitz-stetig. Auf kompakten Intervallen folgt aus stetiger Differenzierbarkeit Lipschitz-Stetigkeit, aber das ist eine zusätzliche Voraussetzung.

### B11. Newton-Globalisierung garantiert kein globales Minimum

**Fundstelle:** `src/chapters/13-optim/S134.mdx`, Bemerkung 13.4.5

Positive-Definitheitsmodifikation, Trust Region und Liniensuche können aus dem Newton-Schritt eine Abstiegsrichtung machen und das globale Konvergenzverhalten zu einem stationären Punkt verbessern. Sie „reparieren“ aber nicht das Problem mehrerer lokaler Minima und garantieren bei nicht-konvexen Funktionen kein globales Optimum. Der Absatz sollte zwischen „Sattel/Maximum vermeiden“ und „globales Minimum finden“ unterscheiden.

### B12. Der Ridge/Lasso-Widget-Regler verwendet zwei verschiedene Budgetkonventionen

**Fundstellen:** `src/chapters/13-optim/S135.mdx`, Gleichung zur beschränkten Form; `src/chapters/13-optim/widgets/S135RidgeLasso.tsx`

Im Fließtext steht für Ridge \(\|\beta\|_2^2\le c\), sodass der Kreis Radius \(\sqrt c\) hat. Das Widget beschriftet und implementiert dagegen \(\|\beta\|_2\le c\), also Radius \(c\). Beide Familien beschreiben nach Umparametrisierung dieselben zulässigen Mengen, aber derselbe Reglerwert \(c\) hat nicht dieselbe Bedeutung. Das Widget sollte die Umparametrisierung ausdrücklich nennen oder der Abschnitt sollte einheitlich Normbudgets \(\|\beta\|_p\le c\) verwenden.

### B13. Ein lineares Programm hat nicht immer „das Optimum in einer Ecke“

**Fundstelle:** `src/chapters/13-optim/S135.mdx`, Ausblick nach Satz 13.5.12

Ein lineares Programm kann unzulässig oder unbeschränkt sein; selbst bei existierendem Optimum kann eine ganze Fläche optimal sein. Unter passenden Voraussetzungen existiert *mindestens ein* optimaler Extrempunkt. Diese Formulierung trägt die beabsichtigte Motivation des Simplexverfahrens, ohne Eindeutigkeit oder Existenz zu unterstellen.

### B14. „Unimodal“ ist mehr als „genau eine Talsohle“

**Fundstelle:** `src/chapters/13-optim/S136.mdx`, Bemerkung 13.6.1

Für die verlässliche Intervallsuche braucht die Funktion die übliche unimodale Struktur: bis zum Minimum nicht steigend und danach nicht fallend (in der strikten Variante jeweils strikt). Eine Funktion kann ein eindeutiges globales Minimum besitzen und trotzdem weitere lokale Wellen haben. Die derzeitige Kurzdefinition über „genau eine Talsohle“ ist deshalb zu schwach.

## Priorität C – kleinere Präzisierungen

### C1. Offene Bälle setzen einen positiven Radius voraus

**Fundstelle:** `src/chapters/12-konvexitaet/S122.mdx`, Beispiel zum offenen Ball

Die Konvexitätsrechnung teilt sinngemäß durch beziehungsweise vergleicht mit dem Radius. Die übliche Definition sollte ausdrücklich \(r>0\) voraussetzen.

### C2. „Beschränktes Optimierungsproblem“ kann mit „bounded“ verwechselt werden

**Fundstellen:** Kapitel 13 durchgehend, besonders Definitionen 13.1.2 und 13.5.1

Für *constrained optimization* sind „Optimierung mit Nebenbedingungen“ oder „restringiertes Optimierungsproblem“ eindeutiger. „Beschränkt“ kann im Deutschen auch bedeuten, dass die zulässige Menge beschränkt ist, was hier nicht verlangt wird. Falls die Folienterminologie beibehalten werden soll, genügt ein einmaliger Hinweis.

### C3. Der BFGS- und Newton-Vergleich sollte Rechen- und Auswertungskosten noch konsequenter trennen

**Fundstelle:** `src/chapters/13-optim/S134.mdx`, Tabelle in „Vier Verfahren nebeneinander“

Die nachfolgende Bemerkung erklärt korrekt, dass die Tabelle nur lineare Algebra zählt. Ein kurzer Zusatz direkt in der Tabellenüberschrift („lineare Algebra, ohne Auswertung von \(f\) und Ableitungen“) würde verhindern, dass \(O(n)\) beim Gradientenabstieg als Gesamtkosten gelesen wird.

## Abschnittsweises didaktisches Urteil

### Kapitel 12

- **12.1 Konvexkombinationen:** Sehr guter Einstieg über Erwartungswerte und statistische Mischungen. Die Abgrenzung zu allgemeinen Linearkombinationen und die induktive Erweiterung auf endlich viele Punkte sind angemessen ausführlich.
- **12.2 Konvexe Mengen:** Besonders stark sind die Gegenbeispiele, der Simplex und die saubere Behandlung des PSD-Kegels. Die Extrempunktdiskussion bereitet lineare Optimierung gut vor.
- **12.3 Projektion und konvexe Funktionen:** Das Projektionstheorem ist didaktisch hervorragend aufbereitet. Die Epigraphdefinition braucht nur die formale Korrektur des Umgebungsraums. Die quadratischen Beispiele verbinden lineare Algebra und Statistik sehr überzeugend.
- **12.4 Rechenregeln und Kriterien:** Die drei Zugänge – Abschlussregeln, Jensen, Ableitungen/Subgradienten – sind klar gestaffelt. Die Beweise sind ausführlich, aber funktional: Jeder Schritt erklärt eine später benötigte Technik.
- **12.5 Konvexe Optimierung:** Die Trennung von Existenz, Eindeutigkeit und Globalität ist eine große Stärke. Die beiden fehlerhaften Schlussformulierungen zu Subniveaumengen und Lasso-Software sind gerade deshalb auffällig und sollten unbedingt korrigiert werden.

### Kapitel 13

- **13.1 Nichtlineare Gleichungen:** Sehr gelungene Progression von Existenz über Bisektion zu Newton und Fixpunktiteration. Die Fehler- und Ratenanalyse ist für den Kurs anspruchsvoll, aber gut motiviert. `argmin`, Newton-Regularität und Schrittweitenempfehlung brauchen Präzisierung.
- **13.2 Optimalität:** Die Beispiele und die Klassifikation nach Eigenwerten sind sehr klar. Die hochdimensionale Sattelheuristik ist der fachlich schwächste Teil des Kapitels, weil sie ihre Modellannahmen am Ende wieder vergisst.
- **13.3 Gradientenabstieg:** Der stärkste Abschnitt des Kapitels. Schrittweite, Glattheit, starke Konvexität, Kondition, Abbruch und Armijo greifen sauber ineinander. Zu korrigieren ist vor allem die Beziehung zwischen Lipschitz-Stetigkeit und Differenzierbarkeit.
- **13.4 Newton, BFGS, Momentum und SGD:** Inhaltlich reich, gut verbunden und rechnerisch konsistent. Die Widgets tragen echten Erkenntnisgewinn. Bei Newton müssen lokale Regularität und die Grenzen von Globalisierungsverfahren genauer formuliert werden.
- **13.5 Nebenbedingungen:** Die LICQ-Voraussetzung, Komplementarität und KKT-Suffizienz werden deutlich sauberer behandelt als in vielen Einführungen. Die Ridge/Lasso-Parametrisierung und der Ausblick auf lineare Programme brauchen kleine, aber relevante Korrekturen.
- **13.6 Optimierung in R:** Praxisnah und nützlich, insbesondere die Warnung vor Konvergenzcodes und der korrigierte analytische Gradient. Die Abgrenzung zwischen Widget-Trajektorie und tatsächlichem `optim()`-Lauf ist vorbildlich.

## Empfohlene Reihenfolge der Korrekturen

1. A1–A5, weil hier Selbsttests oder Merksätze fachlich falsche Generalisierungen festigen.
2. B6–B11, weil diese Punkte die Voraussetzungen der zentralen Optimierungsverfahren betreffen.
3. B1–B5 und B12–B14, weil sie Terminologie, Statistikbezug und Widget-Konsistenz verbessern.
4. C1–C3 als redaktionelle Abrundung.

Nach diesen Korrekturen sind Kapitel 12 und 13 aus didaktischer Sicht veröffentlichungsreif. Die noch offenen Punkte erfordern keine strukturelle Umarbeitung; sie lassen sich lokal korrigieren, ohne die gelungene Dramaturgie oder die Widgets neu zu bauen.
