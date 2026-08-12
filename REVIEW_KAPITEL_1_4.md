# Review der Kapitel 1–4

**Stand:** `main` bei `f32579bd7f88beb6afc3795fc92b3c77443ecf48`  
**Gegenstand:** Didaktische Qualität und fachliche Korrektheit der Kapitel 1–4 einschließlich der eingebetteten Beispiele, Beweise, Selbsttests und interaktiven Vertiefungen.

## Kurzfazit

Die ersten vier Kapitel sind didaktisch ungewöhnlich stark. Sie motivieren Begriffe vor der Formalisierung, arbeiten mit guten Gegenbeispielen, zerlegen Beweise nachvollziehbar in Einzelschritte und nutzen Interaktion dort, wo sie tatsächlich Erkenntnis bringt. Besonders gelungen sind die Fibonacci-Fallstudie in Kapitel 2, die geometrische Interpretation von Matrixnormen in Kapitel 3 und die Gegenüberstellung von Kondition und Stabilität in Kapitel 4.

Vor einer Veröffentlichung sollten jedoch einige fachliche Punkte korrigiert werden. Am wichtigsten sind die lokale Definition der Konditionszahl und der daraus abgeleitete Satz über zusammengesetzte Algorithmen in Kapitel 4. Außerdem werden in Kapitel 2 mehrere unabhängige Klassifikationsachsen von Algorithmen vermischt und Aussagen über scharfes Wachstum mit bloßen Big-O-Schranken formuliert. Kapitel 3 enthält einen falschen Fachbegriff und muss die geometrische Interpretation der Matrixkondition klarer auf Operatornormen beschränken.

## Priorität A: fachlich vor Veröffentlichung korrigieren

### A1. Lokale Konditionszahl sauber als Grenzgröße definieren

**Fundstelle:** `src/chapters/04-fehler/S42.tsx:115–138`

Die Konditionszahl wird als „kleinste Zahl“ definiert, für die eine Ungleichung „für `x̃ → x`“ gilt. Eine solche kleinste lokale Konstante muss nicht existieren. Beispiel: Für `f(t)=t+t²` bei `t=0` konvergiert der Fehlerquotient gegen 1, ist aber in jeder punktierten Umgebung größer als 1. Der Infimumwert wird lokal also nicht als zulässige Konstante angenommen.

**Empfehlung:** Die absolute Kondition als

\[
\kappa_{\mathrm{abs}}(f,x)
=\limsup_{\tilde x\to x,\,\tilde x\ne x}
\frac{\|f(\tilde x)-f(x)\|}{\|\tilde x-x\|}
\]

definieren. Die relative Kondition entsprechend als Limes superior des Quotienten aus relativem Output- und Inputfehler. Dabei ausdrücklich `x ≠ 0` und `f(x) ≠ 0` voraussetzen. Für differenzierbares `f` kann anschließend `κ_abs(f,x)=\|Df(x)\|` hergeleitet werden.

### A2. Satz 4.3.3 ist nur asymptotisch, wird aber als exakte Ungleichung formuliert

**Fundstelle:** `src/chapters/04-fehler/S43.tsx:152–253`

Die lokale Konditionszahl liefert im Allgemeinen keine exakte Schranke für eine endliche Störung `ỹ-y`. Der Hinweis nach dem Beweis räumt ein, dass die Abschätzung nur als Näherung erster Ordnung gemeint ist; damit ist die Aussage des Satzes in ihrer jetzigen Form dennoch falsch.

Außerdem normiert der erste rote Term mit `\|h(y)\|`, nicht mit `\|h(ỹ)\|`. Er ist daher nicht ohne Weiteres der übliche relative algorithmische Fehler von `h̃` am gestörten Input, wie der Folgetext behauptet.

**Empfehlung:** Eine der beiden Varianten wählen:

1. asymptotisch mit einem `o(\|ỹ-y\|)`-Rest formulieren, oder
2. für eine feste Umgebung eine lokale Lipschitz-Konstante statt der infinitesimalen Konditionszahl verwenden.

Beim ersten Term entweder die vorhandene Normierung ausdrücklich benennen oder durch Multiplikation mit `\|h(ỹ)\|/\|h(y)\|` auf den üblichen relativen Fehler umstellen.

### A3. „Kleiner Vorwärtsfehler“ ist keine hinreichende Definition von Stabilität

**Fundstelle:** `src/chapters/04-fehler/S43.tsx:68–86`

Die Definition nennt einen Algorithmus stabil, wenn sein algorithmischer Fehler klein ist. Das beschreibt zunächst Vorwärtsgenauigkeit. In der numerischen Mathematik werden Vorwärts-, Rückwärts- oder gemischte Stabilität spezifiziert und an die Rundungseinheit beziehungsweise an zulässige Datenstörungen gekoppelt. Ein gut konditioniertes Problem und ein rückwärts stabiler Algorithmus führen typischerweise zu einem kleinen Vorwärtsfehler; diese Begriffe sind aber nicht identisch.

**Empfehlung:** Die Stelle als informelle Motivation markieren und danach mindestens Vorwärts- und Rückwärtsstabilität definieren. Eine kompakte Formulierung wäre: Ein Algorithmus ist rückwärts stabil, wenn sein berechnetes Ergebnis die exakte Lösung eines nur gering gestörten Eingabeproblems ist; der Vorwärtsfehler folgt dann aus Rückwärtsfehler und Kondition.

### A4. Der Normquotient ist kein Rayleigh-Quotient

**Fundstelle:** `src/chapters/03-matrix-spur-norm/S33.tsx:66–74` sowie `:260–262`

`\|Ax\|/\|x\|` wird als Rayleigh-Quotient bezeichnet. Der übliche Rayleigh-Quotient ist `xᵀAx/(xᵀx)` für eine quadratische Matrix. Beide Ausdrücke haben unterschiedliche mathematische Eigenschaften.

**Empfehlung:** Durchgehend „Streckfaktor“, „Normquotient“ oder „richtungsabhängiger Streckfaktor“ verwenden.

### A5. Big-O-Schranke und scharfe Wachstumsordnung nicht gleichsetzen

**Fundstelle:** `src/chapters/02-algos/S23.tsx:425–450`, zusammenfassend auch `src/chapters/02-algos/S25.mdx:345–356`

Die Aussagen „bei `O(n)` verdoppelt sich der Aufwand“ und „bei `O(n²)` vervierfacht er sich“ folgen nicht aus Big-O. Big-O gibt nur eine obere Schranke an; zum Beispiel ist eine konstante Laufzeit ebenfalls `O(n)`. Die Verdopplungsregeln beschreiben die Modellfunktionen `n`, `n²`, `2ⁿ` beziehungsweise scharfe `Θ`-Klassen.

**Empfehlung:** `Θ` gleichzeitig mit `O` einführen und für scharfe Wachstumsangaben verwenden. Alternativ die Passage ausdrücklich als Heuristik für repräsentative Modelle `T(n)=c n`, `c n²` usw. kennzeichnen. Die spätere Selbsttest-Antwort, dass `O(n²)` für einen linearen Algorithmus wahr, aber unscharf ist, sollte mit dieser Passage konsistent sein.

### A6. Unabhängige Klassifikationsachsen von Algorithmen trennen

**Fundstelle:** `src/chapters/02-algos/S21.tsx:325–355`; Fibonacci-Bezeichnung in `src/chapters/02-algos/S22.tsx:183–195`

„exakt/direkt“, „approximativ“, „iterativ“ und „probabilistisch“ stehen derzeit nebeneinander, obwohl sie verschiedene Fragen beantworten:

- exakt versus approximativ: Welche Lösung wird in exakter Arithmetik geliefert?
- direkt versus iterativ: Wird nach endlich vorab bestimmbaren Schritten geliefert oder eine Folge von Näherungen verbessert?
- deterministisch versus randomisiert: Wird Zufall verwendet?

Die Kategorien können kombiniert werden. Die Fibonacci-Schleife ist im informatischen Sinn iterativ, erfüllt aber nicht die zuvor gegebene numerische Definition „jede Wiederholung verbessert die aktuelle Näherung“.

**Empfehlung:** Die drei Achsen in einer kleinen Tabelle trennen. Für Fibonacci „schleifenbasiert“ oder „dynamische Programmierung“ verwenden und den Unterschied zum iterativen Näherungsverfahren erwähnen.

### A7. Kapitelverweise auf Rundungsfehler, Kondition und Stabilität sind veraltet

**Fundstellen:**

- `src/chapters/02-algos/S21.tsx:196–204`, `:310–323`, `:365–368`
- `src/chapters/02-algos/S22.tsx:331–338`
- `src/chapters/02-algos/S25.mdx:345–356`

Mehrere Stellen verweisen für Rundungsfehler, Genauigkeit, Kondition und Stabilität auf Kapitel 3 beziehungsweise auf „das nächste Kapitel“. In der aktuellen Struktur behandelt Kapitel 3 Matrizen, Spur und Normen; die Fehleranalyse folgt in Kapitel 4.

**Empfehlung:** Auf Kapitel 4 verweisen. Am Kapitelende von Kapitel 2 kann der Übergang lauten: Zunächst stellt Kapitel 3 die benötigten Normbegriffe bereit; Kapitel 4 behandelt anschließend Rundungsfehler, Kondition und Stabilität.

### A8. Geometrische Interpretation der Matrixkondition auf Operatornormen beschränken

**Fundstelle:** `src/chapters/03-matrix-spur-norm/S35.tsx:394–449`

Die Definition erlaubt jede submultiplikative Matrixnorm. Direkt danach wird `κ(A)` jedoch als Verhältnis extremer Streckungen interpretiert und `κ≈1` als Ideal beschrieben. Diese Geometrie gilt für induzierte Operatornormen, insbesondere für die 2-Norm, nicht für jede submultiplikative Norm. Beispielsweise gilt für die Frobeniusnorm `κ_F(I_n)=n`, nicht 1.

**Empfehlung:** Entweder die Konditionszahl hier nur für induzierte Normen definieren oder die geometrische Interpretation ausdrücklich auf Operatornormen beschränken. Die Definition für allgemein submultiplikative Normen kann separat als algebraische Verallgemeinerung stehen.

### A9. Exakte und approximative Kosten der Spektralnorm trennen

**Fundstelle:** `src/chapters/03-matrix-spur-norm/S36.tsx:256–299`

Die Tabelle nennt für die Spektralnorm eine „partielle SVD“, gibt aber den Aufwand einer dichten vollständigen SVD an. Eine iterative partielle SVD hat einen von Iterationszahl, Spektrallücke und gewünschter Genauigkeit abhängigen Aufwand; typischerweise dominiert pro Iteration ein Matrix-Vektor-Produkt. Für die Nuklearnorm werden dagegen alle Singulärwerte benötigt.

**Empfehlung:** Zwei Fälle ausweisen: „exakt, dichte vollständige SVD“ und „approximativ, iterative führende Singulärwerte“. Bei der Nuklearnorm klarstellen, dass für eine exakte Auswertung grundsätzlich das gesamte Spektrum benötigt wird.

## Priorität B: fachlich präzisieren

### B1. SGD nicht als Beispiel numerischer Stabilität überdehnen

**Fundstelle:** `src/chapters/04-fehler/S43.tsx:89–139`

Eine Lernrate von `0,001` garantiert ohne Annahmen über Funktion, Skalierung und Rauschen keine zuverlässige Konvergenz „gegen ein Optimum“. Batch Normalization kontrolliert nicht einfach die zufälligen Fehler der Gradientenschätzung, und Mixed Precision ist nicht an sich eine Stabilisierungstechnik; sie benötigt gerade Techniken wie Loss Scaling oder Master Weights, um zusätzliche Rundungsprobleme zu beherrschen.

**Empfehlung:** Das Beispiel als Analogie zur dynamischen Stabilität kennzeichnen oder durch ein klassisches numerisches Beispiel ersetzen. Falls es bleibt, Lernraten relativ zur Krümmung/Lipschitz-Konstante diskutieren und die drei Praxisbegriffe fachlich enger beschreiben.

### B2. Die Merkregel zur Reihenfolge schlecht konditionierter Schritte abschwächen

**Fundstelle:** `src/chapters/04-fehler/S43.tsx:255–268` sowie `:380–410`

„Schlecht konditionierte Schritte so früh wie möglich ausführen“ ist keine allgemeine Regel. Eine Konditionszahl ist eine Worst-Case-Schranke und sagt nicht, dass jede Fehlerrichtung maximal verstärkt wird. Das Umordnen kann außerdem das Problem oder die Rundungsstruktur verändern.

**Empfehlung:** Formulieren: Schlecht konditionierte Zwischenabbildungen können bereits akkumulierte Fehler stark verstärken; nach Möglichkeit sollte man sie reformulieren oder vermeiden. Bei der Varianz ist der zentrale Punkt nicht nur die Reihenfolge, sondern die Vermeidung der Differenz zweier Größen der Ordnung `c²`.

### B3. Populationsvarianz und exakte Stichprobenvarianz unterscheiden

**Fundstelle:** `src/chapters/04-fehler/S43.tsx:412–439`

Für den konkret mit `set.seed(5)` erzeugten Datenvektor ist die mathematisch exakte empirische Varianz ungefähr `1,023151`; der Wert 1 ist die Varianz der erzeugenden Normalverteilung. „Die wahre Varianz ist 1“ vermischt beides.

**Empfehlung:** „Die Populationsvarianz der erzeugenden Verteilung ist 1; die gesuchte empirische Varianz dieses Datenvektors liegt bei etwa 1,023151.“

### B4. Maschinengenauigkeit und Rundungseinheit unterscheiden

**Fundstelle:** `src/chapters/04-fehler/S41.tsx:83–90`

Wenn `ε_mach=2⁻⁵²` als Abstand von 1 zur nächsten darstellbaren Binär64-Zahl definiert wird, ist die scharfe relative Rundungsschranke bei Rundung zum nächsten Wert die Rundungseinheit `u=2⁻⁵³` (abgesehen von Unterlauf, Überlauf und Sonderfällen). „höchstens die Maschinengenauigkeit“ ist als grobe Schranke nicht falsch, aber die spätere Fehleranalyse profitiert von sauberer Terminologie.

**Empfehlung:** `ε_mach` und `u` einmal unterscheiden oder ausdrücklich „höchstens ungefähr `ε_mach`“ schreiben und die Konvention nennen.

### B5. Fibonacci-Abbildung hat einen inputabhängigen Zielraum

**Fundstelle:** `src/chapters/02-algos/S22.tsx:183–195`

Die Signatur `f̃: N → N₀ⁿ` verwendet `n` zugleich als Eingabe und in der Angabe des Zielraums. Das ist keine gewöhnliche Abbildung zwischen zwei festen Mengen. Auch die Komposition von Schritten mit wechselnden Tupellängen ist für den didaktischen Zweck unnötig schwer.

**Empfehlung:** Als Pseudocode plus Schleifeninvariante darstellen. Falls die funktionale Form wichtig ist, einen disjunkten Vereinigungsraum `⋃_{n≥1} N₀ⁿ` als Zielraum verwenden.

### B6. Abstiegsverfahren garantieren nicht einmal ein lokales Minimum

**Fundstelle:** `src/chapters/01-intro/S11.tsx:295–302`

„Abstiegsverfahren finden im Allgemeinen nur lokale Minima“ ist als Kontrast zum globalen Minimum verständlich, aber zu stark: Je nach Verfahren und Voraussetzungen können sie an Sattelpunkten oder anderen stationären Punkten enden oder gar nicht konvergieren.

**Empfehlung:** „Abstiegsverfahren garantieren im Allgemeinen kein globales Minimum; unter geeigneten Voraussetzungen konvergieren sie zu lokalen Minima oder stationären Punkten.“

### B7. Kapitel 3 nennt einen im Kapitel erst entwickelten Begriff als Voraussetzung

**Fundstelle:** `src/chapters/03-matrix-spur-norm/S31.tsx:30–45`

Konditionszahlen stehen unter „verwendete Vorkenntnisse“, obwohl die Matrixkondition erst in Abschnitt 3.5 eingeführt und in Kapitel 4 systematisch erklärt wird.

**Empfehlung:** Konditionszahlen aus der Voraussetzungsliste entfernen und in der Motivation als späteres Anwendungsziel ankündigen.

### B8. Orthogonale Transformationen nicht pauschal als stabilitätsneutral bezeichnen

**Fundstelle:** `src/chapters/03-matrix-spur-norm/S33.tsx:276–285`

Orthogonale Multiplikation ist in exakter Arithmetik bezüglich der 2-Norm perfekt konditioniert. Das Bilden und Anwenden einer orthogonalen Transformation erzeugt in Gleitkommaarithmetik trotzdem Rundungsfehler.

**Empfehlung:** „verschlechtert die 2-Norm-Kondition nicht; stabile Implementierungen orthogonaler Transformationen sind deshalb zentral“ statt „verschlechtert die Stabilität von Algorithmen nicht“.

## Didaktische Beurteilung nach Kapitel

### Kapitel 1: sehr starker Einstieg

**Stärken**

- Konkrete Daten- und Rechenbeispiele beantworten früh die Frage, wozu numerische Mathematik benötigt wird.
- Die Skalierungsargumente machen die Grenzen naiver Formeln anschaulich.
- Lernziele, Voraussetzungen und Selbsttests geben gute Orientierung.

**Verbesserung**

- Die Aussage zu lokalen Minima präzisieren (B6).
- Am Kapitelende eine sehr kurze „Nach diesem Kapitel können Sie …“-Zusammenfassung ergänzen; die Eingangsziele sind gut, werden aber nicht explizit wieder aufgegriffen.

### Kapitel 2: hervorragende Fallstudie, kleine begriffliche Brüche

**Stärken**

- Fibonacci ist ein ausgezeichnetes durchgehendes Beispiel für Algorithmusbegriff, Laufzeit, Speicher und asymptotische Analyse.
- Die Beweise sind in begründete Schritte zerlegt und dadurch für Selbstlernende gut überprüfbar.
- Selbsttests prüfen typische Fehlvorstellungen, nicht nur Rechenroutine.

**Verbesserung**

- Algorithmusachsen trennen (A6), `O` und `Θ` konsistent verwenden (A5), Kapitelverweise reparieren (A7).
- Die formale Komposition der Fibonacci-Schritte durch Pseudocode und Schleifeninvariante ersetzen oder ergänzen (B5). Die derzeitige Formalisierung erhöht die kognitive Last, ohne die spätere Komplexitätsanalyse zu erleichtern.
- Bei der Speicherkomplexität einmal explizit festlegen, ob Gesamtspeicher oder zusätzlicher Hilfsspeicher gemeint ist.

### Kapitel 3: reichhaltig und anschaulich, aber sehr dicht

**Stärken**

- Die Normtaxonomie verbindet Algebra, Geometrie, Statistik und Regularisierung überzeugend.
- Beispiele und Gegenbeispiele motivieren, warum verschiedene Matrixnormen verschiedene Fragen beantworten.
- Die Spur- und Hat-Matrix-Beispiele schlagen eine sehr gute Brücke zur Statistik.

**Verbesserung**

- Fachbegriff und Konditionsinterpretation korrigieren (A4, A8), Kostentabelle präzisieren (A9).
- Das Kapitel ist für einen ersten Durchgang sehr umfangreich: Spur, elementweise Normen, Operatornormen, orthogonale Matrizen, unitäre Invarianz, Submultiplikativität, Kondition, SVD/Schattennormen und Regularisierung. „Kernstoff“ und „Vertiefung“ deutlicher markieren und nach Abschnitt 3.3 eine Zwischenzusammenfassung einfügen.
- Die Voraussetzungsliste entwirren (B7) und Aussagen zu orthogonalen Transformationen präzisieren (B8).

### Kapitel 4: starke Beispiele, aber der formale Kern braucht Überarbeitung

**Stärken**

- Die Fehlerzerlegung liefert einen klaren roten Faden.
- Das Kehrwertbeispiel erklärt den Unterschied zwischen absoluter und relativer Kondition hervorragend.
- Das Beispiel zum linearen Gleichungssystem trennt stellenabhängige Problemkondition und Matrix-Worst-Case nachvollziehbar.
- Die Varianzberechnung verbindet abstrakte Kondition mit einem reproduzierbaren Zahlenexperiment.

**Verbesserung**

- Definition und Satz zuerst korrigieren (A1–A3), da alle späteren Erklärungen darauf aufbauen.
- Das SGD-Beispiel fachlich enger fassen (B1) und die Reihenfolge-Merkregel durch eine vorsichtigere Aussage ersetzen (B2).
- Bei Worst-Case-Schranken konsequent „kann verstärken“ statt „verstärkt alle Fehler“ schreiben.
- Populations- und empirische Varianz unterscheiden (B3).

## Empfohlene Reihenfolge der Überarbeitung

1. Definition der Konditionszahl und Satz 4.3.3 mathematisch neu formulieren.
2. Stabilitätsbegriff als Vorwärts-/Rückwärts-/gemischte Stabilität ordnen.
3. Kapitel-2-Taxonomie und `O`/`Θ` konsistent machen.
4. Kapitelverweise aktualisieren.
5. Rayleigh-Begriff, Konditionsnorm und SVD-Kostentabelle korrigieren.
6. SGD-, Varianz- und Orthogonalitätsformulierungen präzisieren.
7. Kapitel 3 durch Kernstoff-/Vertiefungsmarkierungen entlasten.

## Gesamturteil

Das Manuskript hat eine sehr gute didaktische Grundlage und benötigt keinen grundlegenden Neuaufbau. Die meisten Probleme sind lokal reparierbar. Kapitel 4 bildet die Ausnahme insofern, als Definition 4.2.2, Definition 4.3.1 und Satz 4.3.3 gemeinsam überarbeitet werden sollten, damit die zentrale Unterscheidung zwischen Kondition, Vorwärtsfehler und Stabilität fachlich trägt. Nach diesen Korrekturen sind die ersten vier Kapitel als interaktives Lehrmaterial deutlich überdurchschnittlich stark.
