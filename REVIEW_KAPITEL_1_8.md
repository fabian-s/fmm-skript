# Review der Kapitel 1–8

**Stand:** `claude/textbook-skill-workflow-olwbzr` bei `552553d27af6013e4bf93125e5f2b5982c191e8d`  
**Gegenstand:** Didaktische Qualität und fachliche Korrektheit der Kapitel 1–8. Geprüft wurden der Lehrtext, Definitionen, Sätze, Beweise, Beispiele und Selbsttests; Widget-Code wurde dort einbezogen, wo er für einen Befund relevant ist.

## Umsetzungsstand

Die in diesem Review aufgeführten 13 Befunde der Priorität A und 12 Befunde der
Priorität B sind auf dem PR-Branch umgesetzt. Die Änderungen betreffen insbesondere
die Grundbegriffe zu Algorithmen, $O$ versus $\Theta$, Kondition und Stabilität,
Pivotierung, KQ-Störungsrechnung, Voraussetzungen und Kosten iterativer Verfahren
sowie Sketching. Zusätzlich wurden die kleineren didaktischen Präzisierungen aus den
Kapitelurteilen eingearbeitet, soweit sie direkt an diesen Korrekturen hingen.

Verifiziert wurde der resultierende Stand mit dem Produktions-Build, der statischen
Prüfung aller 180 MDX-Dateien und der vollständigen MDX-Regression mit 81 von 81
bestandenen Fixtures.

## Kurzfazit

Das Skript ist didaktisch deutlich überdurchschnittlich. Es motiviert Begriffe vor der Formalisierung, führt Farben und Interaktion konsistent als Verständnishilfen ein, zerlegt viele Beweise in überprüfbare Schritte und stellt numerische Verfahren fast immer über die drei richtigen Fragen vor: Was berechnen sie, was kosten sie und wie verlässlich sind sie? Besonders stark sind die Fibonacci-Fallstudie, die geometrische Entwicklung der Matrixnormen und SVD, die Gegenüberstellung der KQ-Löser sowie die ungewöhnlich sorgfältige Sketching-Einführung.

Vor einer Veröffentlichung sind dennoch mehrere fachliche Korrekturen nötig. Die schwerwiegendsten betreffen:

1. die lokale Definition der Konditionszahl und daraus abgeleitete exakte statt asymptotische Schranken in Kapitel 4 und 7;
2. die Behauptung, Invertierbarkeit garantiere bei Gauß-Elimination ohne Pivotierung von null verschiedene Pivots;
3. die Vermischung von Big-O-Schranken und scharfen Wachstumsordnungen;
4. mehrere zu pauschale Stabilitäts- und Komplexitätsaussagen;
5. Kostenangaben für QR/Lanczos und iterative LGS-Verfahren;
6. einen Fehler beim Koordinaten-Subsampling mit Zurücklegen.

Die Kapitel 5–8 sind inhaltlich ambitioniert und weitgehend korrekt, aber in Kapitel 8 wird aus einem Lehrkapitel stellenweise ein kleines Nachschlagewerk. Eine explizite Trennung in Kernstoff und Vertiefung würde die Lernkurve erheblich verbessern.

## Priorität A: fachlich vor Veröffentlichung korrigieren

### A1. Lokale Konditionszahl als Limes superior definieren

**Fundstelle:** `src/chapters/04-fehler/S42.mdx:95–129`

Die Konditionszahl wird als „kleinste Zahl“ definiert, für die eine Ungleichung „für `x̃ → x`“ gilt. Eine solche kleinste lokale Konstante muss nicht existieren. Für `f(t)=t+t²` bei `t=0` etwa konvergiert der Fehlerquotient gegen 1, ist aber in jeder punktierten Umgebung größer als 1.

**Empfehlung:**

\[
\kappa_{\mathrm{abs}}(f,x)=
\limsup_{\tilde x\to x,\,\tilde x\ne x}
\frac{\|f(\tilde x)-f(x)\|}{\|\tilde x-x\|}
\]

und analog die relative Kondition definieren. Für die relative Version `x≠0` und `f(x)≠0` voraussetzen. Bei differenzierbarem `f` folgt dann `κ_abs(f,x)=\|Df(x)\|`.

### A2. Satz 4.3.3 ist asymptotisch, wird aber als exakte Ungleichung formuliert

**Fundstelle:** `src/chapters/04-fehler/S43.mdx:125–176`

Eine infinitesimale Konditionszahl liefert im Allgemeinen keine exakte Schranke für eine endliche Störung. Der Hinweis nach dem Beweis erklärt zwar die gewünschte Lesart erster Ordnung, korrigiert aber nicht die Aussage des Satzes. Zudem normiert der erste Term mit `\|h(y)\|`, nicht mit `\|h(ỹ)\|`; er ist daher nicht ohne Zusatzfaktor der übliche relative algorithmische Fehler von `h̃` am gestörten Input.

**Empfehlung:** Entweder eine asymptotische Formel mit Restterm `o(\|ỹ-y\|)` oder eine echte endliche Schranke mit lokaler Lipschitz-Konstante formulieren. Die Normierung des ersten Terms explizit korrigieren.

### A3. Stabilität nicht als bloß „kleinen algorithmischen Fehler“ definieren

**Fundstelle:** `src/chapters/04-fehler/S43.mdx:37–57`

Die Definition beschreibt Vorwärtsgenauigkeit, nicht Stabilität im üblichen numerisch-mathematischen Sinn. Vorwärts-, Rückwärts- und gemischte Stabilität sollten getrennt und relativ zur Rundungseinheit beziehungsweise zu zulässigen Datenstörungen definiert werden.

**Empfehlung:** Die aktuelle Passage als Motivation markieren; anschließend mindestens Rückwärtsstabilität definieren. Dann ergibt sich die zentrale Kette sauber: kleiner Rückwärtsfehler plus gute Kondition impliziert kleinen Vorwärtsfehler.

### A4. Der Normquotient ist kein Rayleigh-Quotient

**Fundstelle:** `src/chapters/03-matrix-spur-norm/S33.mdx:34–42`, erneut `:219` und in den Selbsttests

`\|Ax\|/\|x\|` wird Rayleigh-Quotient genannt. Der Rayleigh-Quotient ist üblicherweise `xᵀAx/(xᵀx)`; die Ausdrücke haben unterschiedliche Eigenschaften.

**Empfehlung:** Durchgehend „Streckfaktor“ oder „Normquotient“ verwenden.

### A5. Big-O und scharfe Wachstumsordnung trennen

**Fundstelle:** insbesondere `src/chapters/02-algos/S23.mdx`, Abschnitt 2.3.4; Zusammenfassung in `S25.mdx:345–356`

Aussagen wie „bei `O(n)` verdoppelt sich der Aufwand“ folgen nicht aus Big-O: Eine konstante Laufzeit ist ebenfalls `O(n)`. Die Verdopplungsregeln gelten für Modellfunktionen oder scharfe `Θ`-Klassen. Spätere Selbsttests erklären die Unschärfe von Big-O korrekt; dadurch entsteht ein interner Widerspruch.

**Empfehlung:** `Θ` bereits hier einführen und für scharfe Wachstumsordnungen verwenden oder ausdrücklich von repräsentativen Modellen `T(n)=cn`, `cn²` usw. sprechen.

### A6. Algorithmusarten als unabhängige Achsen darstellen

**Fundstelle:** `src/chapters/02-algos/S21.mdx:217–241`, `S22.mdx:140–181`

„exakt/direkt“, „approximativ“, „iterativ“ und „probabilistisch“ beantworten verschiedene Fragen. Exakt versus approximativ, direkt versus iterativ und deterministisch versus randomisiert sind kombinierbare Achsen. Die Fibonacci-Schleife ist informatisch iterativ, erfüllt aber nicht die zuvor gegebene numerische Charakterisierung, nach der jede Wiederholung eine Näherung verbessert.

**Empfehlung:** Die drei Achsen in einer Tabelle trennen und bei Fibonacci „schleifenbasiert/dynamische Programmierung“ von iterativen Näherungsverfahren abgrenzen.

### A7. Invertierbarkeit verhindert keine Nullpivots ohne Zeilentausch

**Fundstelle:** `src/chapters/05-lgs/S52.mdx:61–97`

Die Aussage „Weil A invertierbar ist, sind alle Pivots von null verschieden“ ist falsch. Die invertierbare Vertauschungsmatrix

\[
\begin{pmatrix}0&1\\1&0\end{pmatrix}
\]

hat bereits im ersten Schritt einen Nullpivot. Der Text widerspricht damit dem späteren Beispiel und Selbsttest zur Notwendigkeit von Pivotierung.

**Empfehlung:** Schon Algorithmus 5.2.2 mit partieller Pivotierung formulieren oder explizit voraussetzen, dass die Elimination ohne Zeilentausch durchläuft. Rückwärtssubstitution benötigt lediglich `u_ii≠0`; die Elimination muss diese Gestalt erst sicher herstellen.

### A8. KQ-Kondition bezüglich b: obere Schranke nicht als exakte Konditionszahl ausgeben

**Fundstelle:** `src/chapters/07-kq/S72.mdx:96–201`

Für `f(b)=A†b` ist die exakte relative lokale Kondition

\[
\|A^\dagger\|\,\frac{\|b\|}{\|A^\dagger b\|}.
\]

Der Satz leitet dagegen die gröbere obere Schranke `κ₂(A)\|b\|/\|P_A b\|` her und nennt sie anschließend „die Konditionszahl“. Entsprechend sind „Best case = κ₂(A)“ und die Regressionsinterpretation zu kategorisch: Für ein festes `b` kann die exakte Kondition kleiner sein. Bei `A†b=0` ist der relative Fehler zunächst nicht definiert; `∞` ist eine sinnvolle Konvention, sollte aber als solche benannt werden.

**Empfehlung:** Exakte Kondition und geometrisch anschauliche obere Schranke getrennt angeben.

### A9. KQ-Kondition bezüglich A nur als lokale/erste-Ordnung-Aussage formulieren

**Fundstelle:** `src/chapters/07-kq/S72.mdx:209–265`

Satz 7.2.4 wird als exakte Ungleichung für `Ã` formuliert. Die angegebene Formel ist eine lokale Störungsabschätzung erster Ordnung und benötigt insbesondere kleinen Abstand sowie Erhalt des vollen Spaltenrangs. Bei endlichen Störungen fehlt ein Restterm beziehungsweise ein Nenner, der den Abstand zum Rangdefekt kontrolliert.

**Empfehlung:** Als asymptotische Konditionszahl oder First-order bound formulieren und Voraussetzungen (`A` voller Spaltenrang, `Ã` hinreichend nahe) ergänzen.

### A10. Richardson, Jacobi und Gauss-Seidel benötigen Voraussetzungen

**Fundstelle:** `src/chapters/08-la-misc/S83.mdx:382–402`

Für eine beliebige zuvor zugelassene Matrix konvergiert Richardson nicht einfach für „hinreichend kleines `γ>0`“; bei `A=-I` existiert kein solches positives `γ`. Für die übliche Aussage sollte `A` SPD sein und `0<γ<2/λ_max(A)` gelten. Jacobi und Gauss-Seidel benötigen mindestens von null verschiedene Diagonaleinträge; ihre Konvergenz ist ebenfalls nicht automatisch.

**Empfehlung:** Die Verfahren samt Wohldefiniertheits- und Konvergenzvoraussetzungen angeben und klar zwischen „Iterationsvorschrift existiert“ und „Iteration konvergiert“ unterscheiden.

### A11. Gesamtaufwand iterativer LGS-Verfahren hängt über ρ von n und κ ab

**Fundstelle:** `src/chapters/08-la-misc/S83.mdx:440–455`

`O(n² log(1/ε))` behandelt die Kontraktionsrate `ρ` als von `n` unabhängige Konstante. In typischen Problemfolgen nähert sich `ρ` mit wachsendem `n` der 1; die Iterationszahl hängt dann wesentlich von Kondition und Präconditioner ab. Die Folgerung, Iteration spare generell einen Faktor `n`, ist daher falsch. Auch direkte Löser können bei Band-, Sparse- oder anderer Struktur deutlich unter `O(n³)` liegen.

**Empfehlung:** Den Aufwand als `O(cost(step) · log(e₀/ε)/(-log ρ))` angeben und erst unter der Zusatzannahme `ρ≤ρ₀<1` vereinfachen. Präconditionierung als den Mechanismus einführen, der diese Annahme praktisch erreichbar macht.

### A12. Lanczos- und QR-Kosten in Kapitel 8 korrigieren

**Fundstellen:** `src/chapters/08-la-misc/S81.mdx:796–802`, `S82.mdx:115–126` und `:181–195`

- Der praktische QR-Eigenwertalgorithmus reduziert eine volle Matrix einmalig in `O(n³)` auf Hessenbergform; danach kostet ein QR-Sweep `O(n²)` (symmetrisch nach Tridiagonalisierung noch weniger), nicht jedes Mal `O(n³)`.
- Bei Lanczos fehlt in der Tabelle bei voller Reorthogonalisierung der Dimensionsfaktor: `m` Schritte kosten grob `O(m·nnz(A)+n m²)`, nicht `O(m·nnz(A)+m²)`.
- Für PCA über die Datenmatrix ist die relevante iterative SVD-Kostengröße eher `O(k·nnz(X))` plus Orthogonalisierung und Iterationsfaktoren, nicht pauschal `O(kp²)`. „Aus Tagen werden Sekunden“ folgt nicht allein aus `p/k`.

**Empfehlung:** Vorverarbeitung, Kosten pro Iteration, Zahl der Iterationen und Reorthogonalisierung getrennt ausweisen.

### A13. Subsampling mit Zurücklegen trifft eine Koordinate nicht mit Wahrscheinlichkeit m/n

**Fundstelle:** `src/chapters/08-la-misc/S84.mdx:459–477`

Die Indizes `K_i` sind unabhängig gleichverteilt, also wird mit Zurücklegen gezogen. Eine bestimmte Koordinate wird mindestens einmal mit Wahrscheinlichkeit

\[
1-(1-1/n)^m
\]

getroffen, nicht `m/n`. Letzteres gilt beim Ziehen ohne Zurücklegen (und nur für `m≤n`).

**Empfehlung:** Entweder die Wahrscheinlichkeit korrigieren oder die Konstruktion konsistent auf Ziehen ohne Zurücklegen umstellen und Erwartungs-/Unabhängigkeitsargumente entsprechend anpassen.

## Priorität B: fachlich präzisieren

### B1. Veraltete Kapitelverweise in Kapitel 2

**Fundstellen:** `S21.mdx:84–90`, `:213–218`, `:248–251`; `S22.mdx:202–207`; `S25.mdx:345–356`

Rundungsfehler, Kondition und Stabilität werden Kapitel 3 beziehungsweise „dem nächsten Kapitel“ zugeordnet. In der aktuellen Struktur liefert Kapitel 3 die Normen; die Fehleranalyse folgt in Kapitel 4.

### B2. Matrixkondition geometrisch nur für Operatornormen interpretieren

**Fundstelle:** `src/chapters/03-matrix-spur-norm/S35.mdx:336–387`

Die Definition erlaubt allgemeine submultiplikative Matrixnormen, die anschließende Interpretation als Verhältnis extremer Streckungen gilt aber für induzierte Operatornormen. Beispielsweise ist `κ_F(I_n)=n`.

### B3. SGD-Beispiel fachlich enger fassen

**Fundstelle:** `src/chapters/04-fehler/S43.mdx:59–119`

Eine Lernrate von `0,001` garantiert ohne Skalierungs- und Glattheitsannahmen keine Konvergenz gegen ein Optimum. Batch Normalization „kontrolliert“ nicht die zufälligen Fehler der Gradientenschätzung, und Mixed Precision ist nicht an sich stabilisierend. Entweder klar als Analogie kennzeichnen oder durch ein klassisches numerisches Beispiel ersetzen.

### B4. Die Reihenfolge-Merkregel für schlecht konditionierte Schritte abschwächen

**Fundstelle:** `src/chapters/04-fehler/S43.mdx:178–190`, später in der Varianzerklärung

„Schlecht konditionierte Schritte so früh wie möglich ausführen“ ist keine allgemeine Regel. Konditionszahlen sind Worst-Case-Schranken und nicht jede Fehlerrichtung wird maximal verstärkt. Bei der Varianz ist der entscheidende Vorteil die Vermeidung einer abschließenden Differenz zweier Größen der Ordnung `c²`, nicht allein die Reihenfolge.

### B5. Explizite Inverse: richtige Empfehlung, zu pauschale Stabilitätsbegründung

**Fundstelle:** `src/chapters/05-lgs/S52.mdx:26–52`, ähnlich `07-kq/S73.mdx:95–134`

„Nicht explizit invertieren, wenn nur ein System zu lösen ist“ ist eine gute Regel. Eine berechnete Inverse ist aber nicht notwendig „relativ instabil“, und Gauß-Elimination ist nur mit geeigneter Pivotierung rückwärts stabil. Besser mit Mehrarbeit, Speicher, Strukturverlust und typischerweise schlechterem Residuum argumentieren.

### B6. Cholesky scheitert nicht genau bei „extrem schlechter Kondition“

**Fundstelle:** `src/chapters/05-lgs/S55.mdx:12–47`

Eine schlecht konditionierte SPD-Matrix kann erfolgreich faktorisiert werden; umgekehrt kann eine nominell SPD-Matrix durch Daten-/Rundungsfehler numerisch indefinit erscheinen. Der Abbruch ist kein eindeutiger Konditionsdiagnostiker. Die Aussage sollte über Abstand zur Menge positiv semidefiniter Matrizen und Rundungsniveau formuliert werden.

### B7. SVD-Konvention für breite Matrizen explizit machen

**Fundstelle:** `src/chapters/06-svd/S62.mdx:155–178`, SVD-Hauptsatz `:562–586`

Es werden `n` Singulärwerte als Wurzeln aller Eigenwerte von `AᵀA` definiert. Bei `m<n` enthält diese Liste `n-m` erzwungene Nullen, während `Σ∈R^{m×n}` nur `min(m,n)` Diagonalplätze hat. Die Konvention ist möglich, sollte aber ausdrücklich erklärt und von der üblichen Liste von `min(m,n)` Singulärwerten abgegrenzt werden.

### B8. Minimalnorm-Lösung ist nicht bereits Regularisierung gegen Fast-Rangdefekt

**Fundstelle:** `src/chapters/07-kq/S76.mdx`, Methodenvergleich

Die Moore-Penrose-Lösung regularisiert exakt unidentifizierte Nullraumanteile durch die Minimalnorm-Auswahl. Gegen kleine, aber positive Singulärwerte ist die untrunkierte Pseudoinverse gerade sehr empfindlich. Erst truncated SVD oder Tikhonov regularisiert den Fast-Rangdefekt. Diese Unterscheidung sollte explizit sein.

### B9. QR-Definition benötigt m≥n oder eine andere Blockform

**Fundstelle:** `src/chapters/07-kq/S74.mdx:111–132`

Die dargestellte volle QR-Form enthält einen Block der Größe `(m-n)×n` und setzt daher `m≥n` voraus, behauptet anschließend aber Existenz für jede `m×n`-Matrix. Im KQ-Kontext genügt `m≥n`; diese Voraussetzung sollte in der Definition stehen.

### B10. PCA-Terminologie: Richtungen/Loadings und Scores unterscheiden

**Fundstelle:** `src/chapters/08-la-misc/S82.mdx:96–113`

Eigenvektoren der Kovarianzmatrix sind Hauptachsen beziehungsweise Loading-Vektoren; die Hauptkomponentenscores sind `Xv_j`. „Eigenvektoren sind die Hauptkomponenten“ ist verbreitete Kurzsprache, für ein Lehrbuch aber unnötig mehrdeutig.

### B11. SRHT-Zeit und Speicher konsistent ausweisen

**Fundstelle:** `src/chapters/08-la-misc/S84.mdx:505–511`, `:591–617`

Für eine klassische SRHT wird gewöhnlich eine Hadamard-Transformation in `O(n log n)` angewandt und danach gesampelt; `O(n log m)` verlangt eine speziell geprunte/schnelle Variante und sollte belegt oder präzisiert werden. Die Tabelle nennt `O(m)` Speicher, der Folgetext räumt aber selbst mindestens `n` Zufallszeichen oder einen reproduzierbaren Generatorzustand ein.

### B12. Iterationszahl-Formel bei bereits erfüllter Toleranz

**Fundstelle:** `src/chapters/08-la-misc/S83.mdx:304–351`

Für `ε≥e₀` kann die rechte Seite negativ werden. Korrekt ist `k≥max{0, ceil(...)}` oder die Voraussetzung `0<ε<e₀`.

## Didaktische Beurteilung nach Kapitel

### Kapitel 1 — sehr starker Einstieg

Konkrete Skalierungsbeispiele motivieren numerische Mathematik glaubwürdig; Lernziele und Selbsttests orientieren gut. Die Aussage, Abstiegsverfahren fänden „im Allgemeinen nur lokale Minima“, sollte zu „garantieren im Allgemeinen kein globales Minimum; können zu lokalen Minima oder stationären Punkten konvergieren“ präzisiert werden.

### Kapitel 2 — hervorragende Fallstudie, begrifflich noch nicht ganz sauber

Fibonacci trägt die Progression von Algorithmus über Aufwand und Landau-Notation bis zur exakten Analyse ausgezeichnet. Die Hauptarbeit liegt in A5, A6 und B1. Die funktionale Komposition von Schritten mit wechselnden Tupellängen erzeugt unnötige formale Last; Pseudocode plus Schleifeninvariante wäre lernwirksamer.

### Kapitel 3 — anschaulich und reichhaltig, aber dicht

Die Verbindung von Spur, Normen, Geometrie, Statistik und Regularisierung ist stark. Nach A4/B2 sollte der Kernstoff früher zusammengefasst werden. Spur, elementweise Normen, Operatornormen, Orthogonalität, unitäre Invarianz, Submultiplikativität, Kondition und Schattennormen in einem Kapitel sind für einen ersten Durchgang viel.

### Kapitel 4 — starke Beispiele, formaler Kern überarbeiten

Fehlerzerlegung, Kehrwert und Varianzbeispiel sind sehr gut gewählt. A1–A3 betreffen jedoch genau die tragenden Definitionen und sollten gemeinsam korrigiert werden. Danach lassen sich B3/B4 lokal reparieren.

### Kapitel 5 — sehr gute erste numerische lineare Algebra

Die Progression Dreieckssystem → LU → Pivotierung → Cholesky ist klar, die Stepper sitzen an den richtigen Stellen, und die Statistikbeispiele für SPD-Matrizen sind hervorragend. A7 muss früh korrigiert werden, weil es der späteren Pivotierungslehre widerspricht. Die Slogans zur Inversion und Cholesky-Stabilität sollten fachlich enger werden.

### Kapitel 6 — fachlich das stärkste der neuen Kapitel

Die SVD wird ungewöhnlich gut aus `AᵀA`, Geometrie und fundamentalen Unterräumen aufgebaut. Reduzierte SVD, Pseudoinverse und Eckart–Young greifen sauber ineinander. Das Kapitel ist allerdings sehr lang; Abschnitt 6.2 allein hat 765 Zeilen. Fundamentale Unterräume und ausführliche Pseudoinversen-Beweise könnten als Vertiefung markiert werden. B7/B8 sind die wichtigsten Präzisierungen.

### Kapitel 7 — überzeugender Methodenvergleich, Konditionsabschnitt korrigieren

Normalengleichungen, QR, Householder/Givens und SVD werden didaktisch sinnvoll als konkurrierende Lösungswege entwickelt. Besonders gelungen ist die Verbindung von Projektionsgeometrie und numerischer Stabilität. A8/A9 sind substanziell; die Methodenwahl sollte außerdem zwischen exakter Rangdefizienz und Fast-Rangdefizienz unterscheiden.

### Kapitel 8 — ambitioniert und in Teilen exzellent, aber überladen

Potenzmethode, QR-Iteration, PageRank/PCA, stationäre Iterationen und Sketching sind einzeln gut motiviert. Die Sketching-Herleitung ist besonders sorgfältig und korrigiert mehrere Fehler der Folien transparent. Als gemeinsames Kapitel sind 2.500+ Zeilen Kerntext jedoch zu viel. Sinnvoll wäre:

- 8A Kernstoff: Potenzmethode, PageRank/PCA, einfache stationäre Iteration;
- 8B Vertiefung: unverschobene QR-Iteration mit Konvergenzdetails;
- 8C Vertiefung: Randomized Linear Algebra/Sketching.

Die Kostenmodelle A11/A12 und die Subsampling-Rechnung A13 sollten vor einer Nutzung in der Lehre korrigiert werden.

## Empfohlene Reihenfolge der Überarbeitung

1. Kapitel 4: Konditions- und Stabilitätsdefinitionen sowie Satz 4.3.3 neu formulieren.
2. Kapitel 7: Konditionsabschnitt an die korrigierte lokale Theorie anpassen.
3. Kapitel 5: Nullpivot-Aussage und Stabilitätsslogans korrigieren.
4. Kapitel 8: Voraussetzungen und Komplexitäten der Iterations-/Eigenwertverfahren korrigieren; Subsampling-Wahrscheinlichkeit reparieren.
5. Kapitel 2/3: `O` versus `Θ`, Algorithmusachsen und Normterminologie bereinigen.
6. Kapitel 6–8: Kernstoff und Vertiefung sichtbar trennen.
7. Kapitelverweise und kleinere Terminologieprobleme global bereinigen.

## Gesamturteil

Der Aufbau muss nicht neu erfunden werden. Das Manuskript besitzt bereits einen sehr guten didaktischen Stil und viele fachlich starke Passagen. Die kritischen Probleme sitzen vor allem in wenigen Definitionen, Störungssätzen und Kostenmodellen. Nach deren Korrektur und einer stärkeren Gewichtung von Kernstoff versus Vertiefung können die Kapitel 1–8 ein ausgezeichnetes interaktives Skript zur numerischen Mathematik für Statistik und Data Science bilden.
