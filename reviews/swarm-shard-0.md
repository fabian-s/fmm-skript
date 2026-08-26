basis — REVISE — Die Mini-Erklärung und die direkte Koeffizienten-Manipulation sind tragfähig, aber die Interpolationsaussage braucht eine Größen-/Kompatibilitätsbedingung.
- [MAJOR] skript/src/concepts/basis.mdx:22-24 — „Interpolation“ wird so formuliert, als könne ein quadratisches Polynom immer durch alle Datenpunkte laufen; das gilt nur für höchstens drei Punkte mit verschiedenen Abszissen (oder bei kompatiblen Daten). Bedingung ergänzen und die Kleinste-Quadrate-Alternative entsprechend abgrenzen.

characteristic-polynomial — REVISE — Die Definition und das 2×2-Beispiel stimmen, aber die numerische Schlussfolgerung ist als absolute Aussage zu pauschal.
- [MINOR] skript/src/concepts/characteristic-polynomial.mdx:25-28 — „Numerisch berechnet man Eigenwerte nie über Polynom-Nullstellen“ ist ohne Kontext zu absolut; die Koeffizienten-/Nullstellenformulierung ist für große Probleme instabil, während spezielle kleine oder symbolische Probleme anders behandelt werden können. Auf „in der numerischen Standardpraxis“ einschränken und den Grund knapp benennen.

density-estimation — REVISE — Das Pop-up motiviert die Bandbreite, erklärt aber weder das im Widget verwendete Schätzverfahren noch die Bedeutung der konkreten Schwellen vollständig.
- [MAJOR] skript/src/concepts/density-estimation.mdx:11-16 — Das Widget zeichnet eine Kernel-Dichteschätzung, die Prosa erklärt aber weder Kernel noch Bandbreite h; unmittelbar vor der Leitfrage fehlt damit die zentrale Definition des veränderbaren Parameters. Eine kurze Formel (z. B. Mittel der skalierten Gaußkerne) und „h bestimmt die Breite jedes Kerns“ ergänzen.
- [MINOR] skript/src/concepts/widgets/DensityEstimationWidget.tsx:15-20 — Die Grenzen h < 0,2 und h > 0,75 sind datensatz- und rasterabhängige Heuristiken, erscheinen im Verdikt aber wie allgemeine Kategorien. Als „für diese Stichprobe“ kennzeichnen oder die Schwellen fachlich motivieren.

eigenvalue-eigenvector — REVISE — Der Suchaufbau ist sinnvoll, enthält aber eine falsche allgemeine Aussage im Verdikt.
- [MAJOR] skript/src/concepts/widgets/EigenvalueEigenvectorWidget.tsx:121-123 — „eine 2×2-Matrix hat höchstens zwei“ Eigenrichtungen ist allgemein falsch (z. B. ein skalares Vielfaches der Einheitsmatrix hat unendlich viele); höchstens zwei verschiedene Eigenwerte gilt nur unter zusätzlicher Einschränkung, und für diese konkrete Matrix gibt es zwei Geraden. Aussage auf die konkrete Matrix bzw. auf verschiedene Eigenwerte korrigieren.
- [MINOR] skript/src/concepts/widgets/EigenvalueEigenvectorWidget.tsx:83-85 — Die Aufgabe „blauer Pfeil genau auf dem roten“ erklärt nicht, dass die Pfeile bei Eigenrichtung kollinear sein müssen und ggf. entgegengesetzt zeigen dürfen. „auf derselben Geraden liegen“ als Handlungsanweisung verwenden.

gaussian-mixture-model — REVISE — Formel und Controls zeigen die Rollen der Parameter, aber „getrennte Hügel“ wird mit einer groben Regel statt als anschauliche, datensatzabhängige Einschätzung behandelt.
- [MAJOR] skript/src/concepts/widgets/GaussianMixtureModelWidget.tsx:17,54-57 — Die Bedingung gap > 2σ sowie 0,15 < π₁ < 0,85 ist keine allgemeine Trennbarkeitsgrenze für Gaußmischungen; insbesondere hängt die Zahl der Modi auch vom Gewichtsverhältnis ab. Das Verdikt ausdrücklich als Heuristik für dieses symmetrische Zwei-Komponenten-Setup ausweisen oder die Modenzahl numerisch prüfen.
- [MINOR] skript/src/concepts/gaussian-mixture-model.mdx:18-25 — Die Notation σ² wird erklärt, die Widget-Beschriftung regelt aber σ; der Unterschied zwischen Standardabweichung und Varianz sollte vor der Interaktion explizit gemacht werden.

image — REVISE — Die lineare-Algebra-Erklärung ist gut, aber die zentrale Widget-Aufgabe fordert vergeblich eine unmögliche Ausgabe.
- [MAJOR] skript/src/concepts/widgets/ImageWidget.tsx:46 — „eine Ausgabe abseits der blauen Geraden“ kann für die fest codierte Rang-1-Matrix nicht gefunden werden; das erzeugt eine unauflösbare Suchaufgabe. Stattdessen zum Vorhersagen/Bestätigen auffordern, dass jede Ausgabe auf der Bildgeraden liegt.
- [MINOR] skript/src/concepts/widgets/ImageWidget.tsx:85-96 — Das Verdikt nennt den Rang 1 nur im Nichtnull-Zweig; die Nullausgabe bei Kernvektoren ist korrekt, aber die Verbindung „alle Ausgaben liegen auf einer Geraden, die auch die Null enthält“ sollte unabhängig vom gewählten v explizit bleiben.

linear-function — REVISE — Die Interaktion macht Steigung und Achsenabschnitt sichtbar, aber der deutsche Fachbegriff wird mit einer affinen Funktion belegt.
- [MAJOR] skript/src/concepts/linear-function.mdx:7-10 — f(x)=ax+b ist im üblichen linearen-Algebra-Sinn affin; eine lineare Abbildung/Funktion erfüllt f(0)=0 und hat b=0. Das kollidiert unmittelbar mit späteren Verwendungen, die „linear“ für Abbildungen wie h↦f'(x)h benötigen (skript/src/chapters/10-differentialrechnung/S101.mdx:203-215). „Affine Funktion“ verwenden und die lineare Spezialform abgrenzen.

lu-decomposition — REVISE — Das Beispiel und die Buchführungsintuition funktionieren, die Nullpivot-Aussage des Widgets ist jedoch zu stark.
- [CRITICAL] skript/src/concepts/widgets/LuDecompositionWidget.tsx:83-88 — Aus einem Nullpivot folgt nicht allgemein, dass kein A=L U existiert und erst ein Zeilentausch die Zerlegung möglich macht; manche singulären Matrizen besitzen trotz Nullpivot eine LU-Zerlegung (und Pivoting ist eine algorithmische Strategie). Auf „dieser Eliminationsschritt ist ohne Pivoting nicht möglich“ einschränken und PA=LU als mögliche Fortsetzung erklären.
- [MINOR] skript/src/concepts/lu-decomposition.mdx:38-42 — Der Exkurs zum symmetrisch-indefiniten erweiterten Kleinste-Quadrate-System führt mehrere unmotivierte Varianten ein, ohne sie zu definieren; für die Mini-Erklärung streichen oder auf einen passenden Begriff verlinken.

neighborhood — KEEP — Definition, lokales Gegenbeispiel und Radius-Interaktion bilden einen selbstständigen und fachlich passenden Bogen.
- [NOTE] skript/src/concepts/widgets/NeighborhoodWidget.tsx:51-58 — Der 400-Punkt-Scan ist für die Darstellung ausreichend, kann aber eine numerische Prüfung mit einer Garantie verwechseln; im erklärenden Text klar sagen, dass die Visualisierung testet und nicht den mathematischen Beweis ersetzt.

ohms-law — STATIC — Der statische Vergleich der zwei Ursprungsgeraden trägt die einzige Pointe vollständig; ein Regler würde keine zusätzliche Einsicht liefern.
- [MAJOR] skript/src/concepts/ohms-law.mdx:7-21 — Die strenge Proportionalität gilt für einen ohmschen Widerstand unter passenden Betriebsbedingungen, nicht für beliebige elektrische Bauteile; diese Voraussetzung fehlt und „Strom von 3“/„Widerstand von 2“ lässt zudem die Einheiten aus. „3 A“, „2 Ω“ und den Gültigkeitsbereich ergänzen.

permutation-matrix — STATIC — Definition, Matrix-Vektor-Beispiel und sechs diskrete Fälle sind als Tabelle/Formelsatz ausreichend; die Buttonfolge wiederholt dieselbe Operation.
- [MINOR] skript/src/concepts/permutation-matrix.mdx:7-13 — „Zeilen (oder Spalten) durchgemischt“ und die Aussagen zu P x versus A P hängen von der gewählten Konvention ab; eine konkrete Konvention (linke Multiplikation vertauscht Zeilen, rechte Spalten) mit einem 2×2/3×3-Beispiel explizit festlegen.
- [NOTE] skript/src/concepts/widgets/PermutationMatrixWidget.tsx:50-68 — Sechs Buttons zeigen nur sechs bereits vollständig aufzählbare Permutationen; durch eine statische Tabelle mit P, Px und Identitätsfall ersetzen.

rank-nullity-theorem — REVISE — Die Bilanzdarstellung ist zugänglich, aber der externe SVD-Exkurs und ein unerreichbarer Sliderzustand schwächen die Selbstständigkeit.
- [MAJOR] skript/src/concepts/rank-nullity-theorem.mdx:24-27 — Die Behauptung über den Eckart-Young-Beweis nennt weder die Dimensionsbedingung noch die beiden konkreten Unterräume; „allein die Dimensionen schließen ... aus“ ist ohne diese Voraussetzung zu breit. Exkurs entfernen oder die beteiligten Räume und Ungleichung explizit angeben.
- [MAJOR] skript/src/concepts/widgets/RankNullityTheoremWidget.tsx:79-103 — Der Regler erlaubt r=3 für A:ℝ³→ℝ², obwohl dieser Zustand für die angegebene Abbildung unmöglich ist; das Widget zeigt damit zunächst eine inkonsistente Bilanz und korrigiert sie erst im Verdikt. Maximalwert auf m=2 begrenzen oder den Regler ausdrücklich als abstrakte Bilanz einer anderen Abbildung kennzeichnen.

sequence — REVISE — Die Punktabbildung erklärt Ordnung und Annäherung gut, ist aber mit der Indexierung des Textes inkonsistent.
- [MAJOR] skript/src/concepts/sequence.mdx:7-18,20-28 — Zuerst wird a₀ als erstes Glied und n∈ℕ als Index verwendet, danach a_n=1/n und der Widget-Fall n=1,…,20; bei a₀=1/0 ist das Beispiel nicht definiert. Einheitlich bei n=1 beginnen (oder a_n=1/(n+1) verwenden) und die Konvention nennen.
- [MINOR] skript/src/concepts/widgets/SequenceWidget.tsx:14-16,40 — Die Darstellung zeigt nur die ersten 20 Glieder, während das Verdikt „Grenzwert“ und „immer dichter“ nahelegt, die ganze unendliche Folge zu sehen. „Ausschnitt der Folge“ und die analytisch bekannte Grenzwertaussage ergänzen.

sparse-matrix — REVISE — Das Bandmuster und der Speichervergleich funktionieren, aber die Aussagen zu Erhaltung des Nullmusters sind zu pauschal.
- [MAJOR] skript/src/concepts/sparse-matrix.mdx:14-23 — Givens-Rotationen lassen nicht generell das gesamte restliche Nullmuster unverändert; auch sie können bei weiteren Eliminationsschritten Fill-in erzeugen. Auf gezielte Rotationen bei geeignetem sparsamen Muster einschränken und Householder als Trade-off statt als pauschal ungeeignet darstellen.
- [MINOR] skript/src/concepts/widgets/SparseMatrixWidget.tsx:100-108 — O(nb) gilt hier für die dargestellte Bandmatrix und den gespeicherten Bandbereich; bei b in der Größenordnung von n wird die exakte Zählung relevant. „für festes b“ auch im Verdikt direkt an die O-Aussage binden.

taylor-theorem — REVISE — Das Widget visualisiert eine echte Restgliedgarantie, aber die einleitenden Sätze vermischen Taylor-Satz, formale Glattheit und eine nicht automatisch gültige O-Aussage.
- [MAJOR] skript/src/concepts/taylor-theorem.mdx:7-10 — „Eine glatte Funktion lässt sich ... rekonstruieren“ ist ohne präzise Differenzierbarkeits-/Restgliedbedingungen und ohne Aussage „lokal bis zur Ordnung n“ irreführend; endlich viele Ableitungen bestimmen keine beliebige glatte Funktion global. Voraussetzungen und lokalen Gültigkeitsbereich nennen.
- [MAJOR] skript/src/concepts/taylor-theorem.mdx:17-25 — „O(t²) schrumpft garantiert wie t²“ und „weitere Terme ... drücken das Restglied auf höhere Potenzen“ benötigen beschränkte weitere Ableitungen; als allgemeine Garantie ist das zu stark. Die Lagrange-Bedingung passend zur Widget-Funktion sin explizit machen.
- [MINOR] skript/src/concepts/widgets/TaylorTheoremWidget.tsx:88-97 — Die Aufgabe spricht vom roten Band „um die Kurve“, obwohl das Band um pₙ liegt und die sin-Kurve nur darin liegen soll; diese Rollen sprachlich präzisieren.

vector-space — REVISE — Die Beispiele sind anschaulich, aber die Definition über zwei Abschlussbedingungen allein reicht fachlich nicht aus.
- [MAJOR] skript/src/concepts/vector-space.mdx:3-10 — Abschluss unter Addition und Skalierung ist notwendig, aber ohne Nichtleerheit/Nullvektor, additive Inversen und die Vektorraumaxiome keine hinreichende Definition (z. B. positive reelle Zahlen sind unter den genannten Operationen abgeschlossen, aber kein Vektorraum). Kurz die vollständige Struktur bzw. „Untermenge eines bekannten Vektorraums mit Null und Inversen“ angeben.
- [MINOR] skript/src/concepts/vector-space.mdx:22-25 — „Anzahl der unabhängigen Richtungen“ ist nur eine Intuition und setzt endliche Dimension voraus; als Dimension einer Basis definieren und die informelle Formulierung danach stellen.
