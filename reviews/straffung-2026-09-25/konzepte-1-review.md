# Gutachten: Konzept-Pop-ups, Batch 1 (basis … function)

Stand 2026-09-26. Geprüft: der Editor-Durchgang (Commit f0e12e9, Bericht `konzepte-1.md`) an
34 Dateien in `src/concepts/`, gegen den Ausgangsstand 21b998d. Für jedes Pop-up: alte und neue
Fassung ganz gelesen, Widget-TSX auf Aufgabe/Legende/Verdikt geprüft, alle Linkstellen
(`grep -rn "{#<id>}" src/chapters src/concepts`) mit Kontext angesehen, Tell-Regex aus
`german-tells.md` erneut laufen lassen. 22 Dateien hat die Gutachterin nachgebessert.
Nur Prosa geändert; Titel, Imports, Widget-Tags, Formeln, Zahlen und Anker blieben unangetastet.

## 1. Zahlen (`zaehlen.mjs concepts`, Summe der 34 Dateien, inkl. Kommentarköpfe)

| Stand | Wörter | gegenüber Ausgang |
| --- | ---: | ---: |
| Ausgangsstand (Baseline) | 6 781 | |
| nach Editor | 6 347 | −6,4 % |
| nach Review | 6 252 | −7,8 % |

Median 178, Maximum 242 (Baseline dieser 34 Dateien: 183 bzw. 303). Pop-ups haben keine Vertiefungen (Vertiefung = 0).

Von der Gutachterin geänderte Dateien (Baseline → Editor → Review):

| Pop-up | Wörter | Änderung der Gutachterin |
| --- | ---: | --- |
| big-o-notation | 235 → 225 → 215 | „halbieren wir $t$, viertelt er sich“ (für einen $O$-Term falsch) → „viertelt sich seine Schranke $C\,t^2$“; Merkhilfe-Satz (wiederholt die beiden Unterklammern) gestrichen; Leitfrage ohne „wirklich“, mit dem Widget-Begriff Hüllkurve |
| binomial-coefficient | 157 → 164 → 169 | Lead-out „Jeder Eintrag“ → „Jeder innere Eintrag … in der Zeile darüber“ (Randeinträge sind 1, wie das Widget-Verdikt sagt) |
| bisection | 179 → 179 → 179 | „Zutaten“ → „Voraussetzungen“ |
| cancellation | 202 → 209 → 203 | **Fachlich:** Editor-Lead-out „ab einigen Ziffern trägt nur noch der alte Rundungsfehler die Differenz“ stimmt für das Widget ($k \le 8$, danach noch ≥ 8 Stellen) nicht → „Jede gemeinsame führende Ziffer verzehnfacht den Verstärkungsfaktor $\lvert a\rvert/\lvert a-b\rvert$ und kostet damit eine signifikante Stelle“ (= Widget-Verdikt $10^k$). Metapher „Die Kur ist nie …“ → „Abhilfe schafft nicht genaueres Rechnen, sondern Umformen“; ASCII-Schlusszeichen `"` → `“` |
| chain-rule | 157 → 149 → 145 | „Dahinter steht ein einfaches Bild:“ → „Anschaulich:“ |
| change-of-basis | 170 → 154 → 156 | **Kaputter Satz:** „gibt jedem Vektor neue Koordinaten, und ebenso jeder lineare Abbildung“ (Kasus falsch, und eine Abbildung bekommt keine Koordinaten) → „… und jeder linearen Abbildung eine neue Matrix: aus $\bA$ wird“; „überstehen“ → „bleiben … gleich“ |
| characteristic-polynomial | 155 → 154 → 154 | Editor-Edit erzeugte zwei Doppelpunkte in einem Satz → Semikolon |
| cholesky-factorization | 202 → 202 → 203 | undefinierte Abkürzung „SPD-Spezialisierung“ → „spezialisiert die LU-Zerlegung … auf solche Matrizen“ |
| closed-bounded-set | 245 → 234 → 230 | Lead-out „der kleinste Wert wird angenähert“ (ohne Minimum gibt es keinen kleinsten Wert) → „untere Grenze (dem Infimum)“, wie im Widget-Verdikt; Leitfrage „wenn wir nur den Randpunkt entfernen“ passte nicht zum Widget (schaltet $[0{,}2; 1]$ ↔ $(0; 1]$) → „wenn der linke Randpunkt nicht zur Menge gehört“; „Keine Punkte entkommen ins Unendliche“ gestrichen |
| complex-numbers | 268 → 247 → 215 | Drehstreckungs-Satz gestrichen: „Argument“ ist im Pop-up undefiniert, und die Aussage gilt nur in geeigneten Koordinaten; keine Linkstelle braucht ihn (S31, spectral-radius, polynomial-roots brauchen komplexe Eigenwerte, konjugierte Paare, Betrag, alles bleibt). Geometrie-Sätze zusammengezogen; „praktischen“, „vielleicht“ raus; „wurde eingeführt“ → wir-Form |
| condition-number | 222 → 216 → 214 | **Zurückgeholt:** „Für rechteckige Matrizen tritt an die Stelle von $\bA^{-1}$ die Pseudoinverse (vgl. Heath §3.3)“. Kap. 6/7 verlinken die Konditionszahl für rechteckiges $\bA$/$\bX$ (S64, S73 Best-Case-Kondition, S76 „quadriert die Konditionszahl“); ohne den Satz definiert das Pop-up dort nichts Passendes. Dafür den Satz „eine fast singuläre Matrix drückt …“ gestrichen (Leitfrage und Lead-out sagen es) |
| convexity | 303 → 232 → 223 | **Zurückgeholt:** Epigraph-Satz. S115 (Z. 428) verlinkt `:k[Epigraph]{#convexity}`, das gekürzte Pop-up erklärte das Wort nicht mehr; jetzt in einem Absatz mit der Definition der konvexen Menge, die vorher ohne Zweck am Ende des Eindeutigkeitsabsatzes hing. „Minimierer, **also** ist jeder Punkt mit Gradient null das Minimum“ (falsche Kausalität: das folgt aus Konvexität, nicht aus der Eindeutigkeit) → „und“. Leitfrage „Welche der vier Kurven verletzt“ → „verletzen“ (im Widget verletzen zwei: Doppelmulde und konkave Kurve). Zum Ausgleich KQ-Satz (Querbezug, Kap. 7 und linear-least-squares sagen es selbst) und Beispielsatz gestrafft |
| derivative | 182 → 169 → 162 | „hebt ein winziges Anheben von $x$ den Wert $f(x)$ um ungefähr das Doppelte davon an“ → „wächst $f(x)$ etwa doppelt so schnell wie $x$“ |
| determinant | 183 → 182 → 187 | „quetscht … keine Fläche überlebt“ → „drückt die Ebene auf eine Gerade (oder einen Punkt) zusammen, jede Fläche wird null“ (Nullmatrix-Fall ergänzt) |
| diagonal-matrix | 218 → 188 → 202 | **Zurückgeholt (kompakt):** Pseudoinverse von $\bSigma$ eintragsweise aus den Kehrwerten. S76 (Z. 28) verlinkt die Diagonalmatrix genau an $\bSigma_r^{-1} = \diag(1/\sigma_i)$ in der Pseudoinverse. „winzige Gleichung“ → „Gleichung“ |
| dot-product | 298 → 257 → 226 | **Zurückgeholt:** „$V$ heißt dann *Skalarproduktraum*“. S113 (Projektionstheorem) verlinkt `:k[Skalarproduktraum]{#dot-product}`. Zum Ausgleich: Statistik-Satz (Stichprobenkovarianz) gestrichen, Vorzeichen-Satz und Funktionen-Satz gestrafft; Lead-out ohne „in dem Moment“ |
| eigenvalue-eigenvector | 165 → 157 → 162 | „Deshalb verbinden die Eigenwerte von $\bA^T\bA$ …“ (Sprung) → „Das gilt insbesondere für die symmetrische Matrix $\bA^T\bA$; ihre Eigenwerte …“; Leitfrage „überstehen“ → „bleiben erhalten“ |
| euclidean-norm | 190 → 179 → 179 | ASCII-Schlusszeichen → „…“ |
| factorial | 167 → 165 → 167 | Leitfrage „Wie schnell trennt sich die Größenordnung …“ (unklar, wovon) → „Wächst $k!$ auf einer logarithmischen Skala wie ein festes $c^k$, also entlang einer Geraden, oder schneller?“ (die Frage, die das statische Widget beantwortet) |
| fixed-point-iteration | 293 → 245 → 234 | **Kaputter Satz nach Editor-Kürzung:** „… und iterieren. Ob sie das tut, …“ (Bezug von „sie“ verloren) → „Die Iteration konvergiert, wenn $g$ Abstände verkleinert“. Editor hatte „abstoßend“ auf „Die Iteration entfernt sich von ihm“ verkürzt (gilt nicht für $x_0 = x^*$); jetzt in das zweite Beispiel integriert: „$g'(x) = 2 > 1$ und der Fixpunkt *abstoßend*: … der Fehler verdoppelt sich pro Schritt“. Matrix-Satz „an die Stelle von $g'$ tritt eine Matrix“ präzisiert: „… von $\lvert g'\rvert$ eine Matrixnorm der Jacobimatrix von $g$“ (`{#matrix-norm}` wieder verlinkt) |
| floating-point | 256 → 255 → 242 | **Fachlich:** „0,1 wird nach $t$ Bits abgeschnitten“ widersprach dem folgenden „auf den nächsten Gitterpunkt gerundet“ → „auf $t$ Bits gerundet“; Doppelung „gespeichert wird nur eine darstellbare Zahl in der Nähe“ raus; Lead-out „bleibt überall unter“ → „bleibt unter $2^{-(t+1)}$, gleich wie groß die Zahl ist“ |
| function-composition | 180 → 176 → 176 | ASCII-Schlusszeichen → „…“ |

## 2. Geprüft und bestätigt (Editor-Änderungen in Ordnung)

- basis: Interpolation-vs-KQ-Exkurs raus ist richtig; Linkstellen (Kap. 1, 2, 3, 9, 13) brauchen nur Basis und Koordinaten, die Funktionsbasis bleibt.
- continuity: Interpolations-Absatz raus, Norm-Stetigkeit bleibt (S33 braucht sie); neue Leitfrage und neuer Lead-out passen genau zum Widget (Fensterbreite δ, Ausgabespanne, Sprunghöhe $\lvert c\rvert$). Kap. 13 (S134, S136) braucht nur den Begriff.
- convergence, cauchy-schwarz-inequality (Eckart–Young-Bezug wird von keiner Linkstelle gebraucht; Lead-out 0°/180° passt zum Grad-Regler), covariance-matrix (Lead-out = Widget-Verdikt; Sampling-Satz reicht für S54), differentiability (Glattheitsklassen für S135 bleiben), domain-codomain, density-estimation, dimension, expected-value, function (Fehler „Wertebereich“ → „Zielbereich“ richtig erkannt), binomial-theorem (Lead-out = Widget-Verdikt), cholesky (Leitfrage passt zu Niveaumenge und zweitem Wurzelschritt im Widget).
- Alle fünf Fehlerkorrekturen des Editors (cancellation „In diesem Kapitel“, condition-number „Satz 4.2.6“, convexity „bestätigen nie“, function „Wertebereich“, binomial-theorem/function-composition) sind richtig.

## 3. Anmerkungen zum Editor-Bericht

- „Residual-Grep … keine Treffer mehr“ stimmte nicht: „einfaches Bild“, „winzige“ (2×), „quetscht/überlebt“, „überstehen“ (2×), „wirklich“, „Kur“, „Zutaten“ standen noch drin (jetzt behoben; „im einfachsten Fall“ bleibt, ist sachlich).
- Entfernte Nebensatz-Links: Außer den fünf genannten hat der Editor in fixed-point-iteration auch `{#linear-system}` und `{#spectral-radius}` gestrichen. Endstand gegenüber Baseline: weg sind `{#geometric-series}`, `{#span}`, `{#real-coordinate-space}`, `{#linear-system}`, `{#spectral-radius}` (alle Module existieren, 3–18 weitere Linkstellen); `{#pseudoinverse}` und `{#matrix-norm}` sind wieder da.
- Drei der sechs Pop-ups, die der Editor über 220 Wörtern stehen ließ, verloren beim Kürzen Stoff, den eine Linkstelle braucht (convexity/Epigraph, dot-product/Skalarproduktraum) oder den Kap. 6/7 voraussetzen (condition-number/rechteckig). Ursache: Linkstellen gezählt, Linktexte nicht gelesen (Lesson angehängt).

## 4. Offene Fragen für den Dozenten

1. **floating-point:** „nahe $1000$ ist [die Lücke] etwa tausendmal breiter“ ist um den Faktor 2 ungenau: $1000 \in [2^9, 2^{10})$, die Lücke ist $2^9 = 512$-mal so breit wie bei 1. Zahl nicht angefasst (Brief §5); Vorschlag „rund $500$-mal“ oder „nahe $1024$ …  $1024$-mal“.
2. **big-o-notation:** wie der Editor (Frage 2): Kap. 10 (S102, S103, S105) verlinkt das Pop-up für das kleine $o(\cdot)$, das Pop-up definiert nur $O(\cdot)$. S102 und S105 erklären $o$ selbst, daher nicht ergänzt. Ein Satz „$R(t) = o(t)$ heißt $R(t)/t \to 0$“ wäre neuer Stoff im Pop-up; Entscheidung beim Dozenten.
3. **Widgets (TSX, nicht angefasst):** ClosedBoundedSetWidget schaltet zwischen $[0{,}2; 1]$ und $(0; 1]$, entfernt also nicht nur den Randpunkt (Minimum 0,2 vs. Infimum 0); die Leitfrage ist jetzt neutral formuliert. CancellationWidget sagt ab $k = 6$ „Jetzt dominieren die schon vorhandenen Fehler den kleinen Rest“, obwohl noch rund 10 Stellen tragen. ConditionNumberWidget nennt im Kopfkommentar noch „Satz 4.2.6“ (nur Kommentar; die Verdikte nutzen `ref()`).
4. **Weiter über ~220 Wörtern** (Zählung inkl. Kommentarkopf): floating-point 242 (davon 23 Kopf), fixed-point-iteration 234 (8 Kopf), closed-bounded-set 230 (20 Kopf), dot-product 226, convexity 223. Prosa damit bei rund 210–226. Weiter kürzen hieße das zweite Fixpunkt-Beispiel (trägt „abstoßend“ und „die Umformung entscheidet“), den Epigraph/Skalarproduktraum (von Linkstellen gebraucht) oder die Doppelte-Genauigkeit-Angabe (S139 setzt sie voraus) opfern.
5. **complex-numbers:** Der Drehstreckungs-Satz ist ganz gestrichen, nicht nur präzisiert (Ermessen: Nebenthema, im Pop-up ungenau). Falls gewünscht, präzise Fassung: „Eine reelle $2\times2$-Matrix mit Eigenwerten $a \pm bi$, $b \neq 0$, wirkt in geeigneten Koordinaten als Drehstreckung.“
6. Notation (unverändert, Mathe): `^T` neben `^\top` in cholesky, dot-product, euclidean-norm, diagonal-matrix, eigenvalue; Binärpunkt `(1.b_1…)_2` neben `(1{,}101)_2` in floating-point.

## 5. Prüfungen (nach allen Edits)

- `npm run typecheck:mdx`: 206 Dateien, ohne Befund (Exit 0).
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur die erwartete Meldung „Tabelle ist nicht aktuell“).
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich (Exit 0); die Zeile „FEHLER: Makroname erscheint als Literaltext“ ist der beabsichtigte `\cbblue`-Negativtest.
- Headless-MathJax über alle 406 Mathe-Literale der 34 Dateien: 0 Fehler.
- Tell-Regex (`german-tells.md` plus „einfach|winzig|quetsch|wirklich|überleb|überst|Kur|Zutat“): nur noch sachliche Treffer („im einfachsten Fall“, „einfache Bausteine“, „Porto-Preistabelle“, echte Kontraste „nicht X, sondern Y“ in cancellation und expected-value). Keine Gedankenstriche, keine handgetippten Nummern.
