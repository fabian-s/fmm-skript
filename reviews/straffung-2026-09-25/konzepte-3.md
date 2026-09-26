# Konzept-Pop-ups, Batch 3 (matrix … rotation-matrix): Straffung und Deslop

Stand 2026-09-26. 34 Dateien in `src/concepts/`, geändert wurde nur Prosa. `export const title`,
Imports und Widget-Tags sind unverändert (geprüft gegen `git show HEAD`). Formeln und Zahlen sind
unverändert, mit vier Ausnahmen: Hausstil-Dezimalkomma im QR-Beispiel (`0.6` → `0{,}6`), Fettdruck
nach Hausstil in neural-network (`x`, `A`, `b` → `\bx`, `\bA`, `\bb`), ein Satzpunkt am Ende der
QR-Anzeige statt Komma und das gestrichene Zahlenbeispiel in normal-equations (siehe 5.2). Keine
Vertiefungen, kein git-Schreibbefehl, kein gen:numbers.

Pro Pop-up: Datei ganz gelesen, Linkstellen mit Linktext gezählt
(`grep -rhoE ':k\[[^]]*\]\{#<id>\}'`), zwei bis drei im Kontext gelesen, Widget-TSX (Kopf,
Aufgabe, Verdikt, verifizierte Zahlen) gelesen. Die Lead-outs rechnen nur mit Zahlen, die im
Widget-Kopf verifiziert sind.

## 1. Zahlen (`zaehlen.mjs concepts`, Wörter inkl. Mathe, Imports und Kommentarkopf)

Summe der 34 Dateien: 6 608 → 6 517 (−1,4 %). Median 200 → 194, Maximum 257 → 247.
Über 220 lagen vorher 6 Pop-ups, jetzt 5. Deren Rohzahlen enthalten viel Mathe (QR mit
`\underbrace`-Anzeige): Ohne Mathe, Kommentar und Imports haben positive-definite 156,
qr-factorization 162, quadratic-form 157, rank-nullity-theorem 162 und newtons-method 176 Wörter
Prosa. Vertiefung = 0.

Der Rückgang ist klein, aus zwei Gründen. Viele Lead-outs sagten vorher nur, das Widget „zeige“
etwas; jetzt beantworten sie die Leitfrage (Rubrik §2), das kostet Wörter. Außerdem fehlten
Begriffe, die an vielen Stellen verlinkt werden (5.1).

| Pop-up | vorher → nachher | was raus / was repariert |
| --- | ---: | --- |
| matrix | 135 → 119 | „Zahlengitter in ein Objekt packen“, „Buchführungs-Trick“, „jonglieren“ raus |
| mean-value-theorem | 202 → 201 | „Blitzer-Intuition:“ raus; Fixpunkt-Absatz raus (keine Linkstelle braucht ihn); **Lücke:** *Cauchysche Fassung* ergänzt (S108 verlinkt „Mittelwertsatzes in der Cauchyschen Fassung“, das Pop-up kannte sie nicht); Einschränkung „nicht wo“ stand doppelt (Text + Lead-out), jetzt einmal; Lead-out beantwortet die Leitfrage („Nein … bei manchen Lagen zwei“) |
| neighborhood | 208 → 214 | „einfach“, „leistet die eigentliche Arbeit“, Gedankenstrich raus; „Radius selbst wählen … winzig“ → präzise „es gibt ein ε > 0“; **Lücke:** „in jeder noch so kleinen Umgebung = für jedes ε“ ergänzt (S107, S115 verlinken genau diese Wendung); Lead-out mit der Schwelle als Antwort, Stützstellen-Klammer raus |
| nelder-mead | 148 → 155 | Zugnamen englisch → deutsch wie in S123 (Reflexion, Expansion, Kontraktion, Schrumpfen); „tastet sich“, „Der Preis:“ raus; **Fachfehler:** „Voreinstellung von `optim()`, wenn kein Gradient übergeben wird“ → Voreinstellung unabhängig vom Gradienten, nur `method` wechselt (so S126) |
| neural-network | 153 → 169 | Auto-Encoder-Satz mit zweifelhaftem Verweis „MML Kap. 7“ raus; Vektoren/Matrizen fett (Hausstil); Satz „Ohne σ wäre das Netz nur eine affine Abbildung“ ergänzt (S92 verlinkt genau dafür); Lead-out „Die Figur zeigt die Komposition“ → Kanten = Einträge von $\bA_0$ (4×3) und $\bA_1$ (2×4) |
| newtons-method | 209 → 222 | zwei Gedankenstriche, „davonlaufen“, Verweis „vgl. MML §5.7“ raus (§5.7 behandelt Ableitungen höherer Ordnung, keine Konvergenzgeschwindigkeit); **Ungenauigkeit:** „springt in deren Minimum“ → „Scheitel“ (bei $f'' < 0$ hat die Parabel kein Minimum, der nächste Absatz sagt selbst „kritischer Punkt“); Alias *Newton-Raphson* ergänzt (S108); $f$ und Minimum $x = 1$ vor dem Widget genannt; Lead-out mit Widget-Ergebnis (Fehler quadriert sich; bei $x_0 = 0{,}3$ schießt der erste Schritt weit hinaus) |
| norm | 162 → 184 | PageRank-Exkurs (MML §4.2) mit Gedankenstrich raus; „Umwege lohnen sich nie“ → *Dreiecksungleichung* mit Link; **Lücke:** 1-Norm und Maximumsnorm definiert (die Leitfrage fragte nach ihnen, der Text kannte nur die euklidische); Lead-out „Form der Einheitskugel zeigt …“ → Ungleichungskette und Schachtelung (Widget-Verdikt) |
| normal-equations | 253 → 217 | „eigentlich“, „Schüssel“, Gedankenstrich raus; **Lücke:** $\br$ wurde benutzt, aber nie definiert → $\br = \bb - \bA\bx$; Zahlenbeispiel (3 Punkte) gestrichen, siehe 5.2; Leitfrage führt die Widget-Spalte $\ba$ ein; Lead-out mit $x = 4/5$ (Widget-Kopf) |
| null-space | 208 → 217 | „Mini-Beispiel“, „Eine zentrale Tatsache“, „Suchen wir … einmal selbst“ raus; kaputte Mischnotation „Rang$(\bA)$ + dim null$(\bA) = n$“ → Satz mit definiertem $n$; Skript-Notation $\operatorname{Kern}(\bA)$ genannt (S61, S76 verlinken „Kern“); Lead-out „Eins plus eins ergibt …“ → Bildgerade $(1,1)^T$, Kernrichtung $(1,-1)^T$, Rang 1 + 1 = 2 |
| objective-function | 154 → 160 | „Klassiker“ raus; Lead-out „Beide Tafeln verknüpfen …“ → tiefster Punkt der Verlustkurve = KQ-Gerade |
| ohms-law | 215 → 194 | Rohr-Analogie, Gedankenstrich-Paar, „strenge Proportion“, „Motor hinter“ raus; Lead-out „nichts als die Steigung“ → Zahlen aus dem Widget (1,5 A: 3 V an 2 Ω, doppelt an 4 Ω). Maschen-Absatz bleibt: einzige Linkstelle (linear-system) braucht ihn |
| optimization | 173 → 166 | „nichts anderes“, „verrät ihnen“, „anders als wir“ raus; Lead-out ohne Gedankenstrich, verrät die Schaetzfrage-Lösung (θ ≈ −1,04) weiterhin nicht |
| orthogonal-complement | 208 → 196 | „Der Gewinn ist“, „vgl. Heath §3.2“ raus; Zerlegung als Aussage „jeder Vektor zerlegt sich eindeutig“; $\bP$ bekommt Link auf projection; Lead-out „zwei unabhängige Stücke“ (unscharf) → $\|\bb\|^2 = \|\bp\|^2 + \|\br\|^2$ (Widget-Kopf: 4,25) |
| orthogonal-matrix | 217 → 197 | „einfach“, „unangetastet“, „Motor hinter“, „leichtes“ raus; **Ungenauigkeit:** „Spiegelungen um den Ursprung“ (klingt nach Punktspiegelung, die ist eine Drehung um 180°) → „Spiegelungen an Ursprungsgeraden“; Lead-out beantwortet die Leitfrage („An den Längen“, det ±1) |
| orthogonality | 195 → 187 | „(also: senkrecht)“, „sauber zerfallen“, Kette aus zwei „vgl.“ gestrafft; **Lücke:** allgemeines Skalarprodukt mit Link auf inner-product-functions (S133 verlinkt Orthogonalität von Polynomen); Leitfrage führt $\bu$, $\bv$ ein; Lead-out: Pythagoras gilt *genau* bei $\bu^T\bv = 0$, unabhängig von der Länge |
| orthonormal-basis | 204 → 190 | „das einfachste Koordinatensystem“, „packt“, „erzeugt und vernichtet nichts“ raus; **Ungenauigkeit:** „liefern dieselben Skalarprodukte die orthogonale Projektion“ → „die Koeffizienten der orthogonalen Projektion“; Lead-out mit dem Fall $c_2 = 0$ aus der Widget-Aufgabe |
| outer-product | 170 → 182 | „kollabiert“, „Mini-Beispiel“ raus; **Fachfehler:** „Deshalb schreibt die abgeschnittene SVD $\bA = \sum_i \sigma_i\bu_i\bv_i^T$“ (die volle SVD schreibt die Summe, die abgeschnittene behält die ersten Summanden; „Deshalb“ war ein Fehlschluss) → korrigiert, Link auf SVD; Alias *dyadisches Produkt* und $\bu \otimes \bv$ ergänzt (S75 bzw. S95 verlinken so); Lead-out begründet Rang 1 über die Zeilen $u_i\bv^T$ |
| overfitting | 167 → 166 | „Paradebeispiel“, „Zahlengefühl“, „Wer“, Gedankenstrich raus; „wirkt hervorragend … versagt“ → sachlich |
| partial-derivative | 222 → 196 | „wackeln“, „Kleines Beispiel“ raus; KQ-Nachsatz mit „man“, $\phi$ (neben $f$) und Heath-Verweis raus; undefiniertes $n$ raus; Lead-out nennt $\partial f/\partial x = 2x + y$ |
| permutation-matrix | 198 → 194 | „schiebt Daten umher“, „Rückgängigmachen einer Mischung“, „führen Buch“ raus; **falscher Verweis:** LU-Pivotierung „vgl. Heath §3.5“ (das ist QR) → §2.4 (so zitiert Kap. 5); Lead-out mit $(5,7,9) \to (7,9,5)$ und zurück (Widget-Kopf) |
| polynomial-roots | 209 → 212 | „Kleines Beispiel“, „Gleichwertig formuliert“, „Diese Abzählung garantiert“, „eben“ raus; $x^2 + 1$-Beispiel raus (das Widget zeigt genau diesen Fall); Leitfrage nennt $x^2 + c$; Lead-out mit $\pm\sqrt{c}\,i$ |
| polynomial | 181 → 192 | Verweis „vgl. MML §5.2“ für die Ableitung von $x^n$ raus (§5.2 sind partielle Ableitungen); „begegnen uns doppelt“ → Taylor-Polynome und Interpolation (S131–S136 verlinken dort); Lead-out „Regler zeigen …“ → Rolle von $a_0$, $a_1$ und höchstem Koeffizienten |
| positive-definite | 232 → 231 | „Matrix-Version von ‚eine positive Zahl‘“, „billig“, Gedankenstrich, Konditions- und Hesse-Nachsatz raus; **Lücke:** *positiv semidefinit* definiert (S33, S34, S62, S114, covariance-matrix verlinken „positiv semidefinit“ hierher); **Fehler:** $n$ in $\rang(\bA) = n$ undefiniert → $\bA \in \R^{m\times n}$; Widget-Matrix vor der Leitfrage genannt; Lead-out mit Eigenwerten $2 \pm c$ |
| power-series | 178 → 186 | „genau“ raus; Lead-out präzisiert „gut passendes Stück“ → Genauigkeit 0,1 (Radien im Widget-Kopf), Schaetzfrage-Antwort ($n = 4$) nicht vorweggenommen |
| projection | 191 → 209 | „plättet“, „Kleines Beispiel“, „Wo genau“ raus; KQ-Satz präzisiert (die Schätzung projiziert den Datenvektor); **Lücke:** Projektion auf abgeschlossene konvexe Mengen (nicht linear) in einem Satz, weil S113 („*Projektion* von $\bx$ auf $\Xcal$“) und S115 („Projektionstheorem“) hierher verlinken; Lead-out „abgeworfene Rest … Ziel“ → Lotfußpunkt |
| pseudoinverse | 177 → 176 | „Kleines Beispiel“, Gedankenstrich raus; „ungleich Null“/„bleibt Null“ → klein |
| qr-factorization | 257 → 247 | Gedankenstrich, „Eine kleine Instanz“, „Ihr Gewinn“, „billigen“, „man“, „eigentlich“ raus; Householder/Givens-Satz raus (reflection/rotation-matrix erklären beides selbst); `0.6` → `0{,}6`; Lead-out nennt $r_{22}$ und den Fall paralleler Spalten |
| quadratic-form | 227 → 223 | „Matrix-Sandwich“ (mit ASCII-Schlusszeichen), „Vetter der Schulparabel“, „Standard-Identität des Matrix-Kalküls“, MML-Verweis raus; Lead-out „verlinkte Bilder verbinden …“ → $q(t\bu) = q(\bu)t^2$, Vorfaktor zwischen 0,79 und 2,21 (Widget-Kopf) |
| rank-nullity-theorem | 203 → 221 | „Keine entsteht neu …“ (doppelt zu „Erhaltungssatz“), „Kleines Beispiel“ raus; Leitfrage nennt die 2×3-Matrix; Lead-out „bilanziert … stets“ → Rang +1 ⇔ Kern −1, Bild höchstens $m = 2$ |
| rank | 158 → 165 | „Bemerkenswerterweise“, „wirklich“, ASCII-Schlusszeichen, „Kleines Beispiel“, „Sehen wir uns an“ raus; Lead-out beantwortet die Frage (Gerade, Rang 1) |
| rate-of-convergence | 237 → 196 | „(hoffentlich)“, Gedankenstrich raus; Potenziteration/Rayleigh-Exkurs raus (Nebenthema, keine Linkstelle); **Lücke:** Begriff *Konvergenzordnung* für $r$ ergänzt (S108, S121, S124, S136 verlinken „Konvergenzordnung“) |
| real-coordinate-space | 149 → 141 | „genau gleich“, „einfach“, „Lesen wir also irgendwo etwas wie“, „ganz“ raus |
| reflection | 217 → 212 | Doppel-Semikolon aufgelöst; „Kern der“, „geschickt“, „wirft“, „löscht auf einen Schlag“ raus; Lead-out benennt $+1$/$-1$ als Eigenwerte |
| rotation-matrix | 191 → 180 | „zu Null machen“, „eines der wichtigsten Werkzeuge“, „eigentlich“, „wie sich zeigt“ raus; *Givens-Rotationen* kursiv |

## 2. Verlagert in Vertiefungen

Keine (Brief §9: keine Vertiefungen in Pop-ups).

## 3. Gestrichen (Auswahl, alles ohne Linkstelle, die es braucht)

- mean-value-theorem: Fixpunkt-Konvergenzargument (Kap. 12 verlinkt den Mittelwertsatz nicht).
- neural-network: Auto-Encoder-Satz samt Verweis „vgl. MML Kap. 7“ (Kap. 7 von MML ist
  kontinuierliche Optimierung).
- norm: PageRank-Normierung (vgl. MML §4.2).
- normal-equations: Zahlenbeispiel Ausgleichsgerade (siehe 5.2).
- partial-derivative: KQ-Nachsatz „das Objekt, das man … gleich null setzt“.
- polynomial-roots: Beispiel $x^2 + 1$ (Widget-Fall $c = 1$).
- qr-factorization: Householder/Givens-Praxissatz.
- rate-of-convergence: Potenziteration $C = |\lambda_2/\lambda_1|$ mit Voraussetzungen und
  Rayleigh-Quotienten-Iteration.
- Weggefallene verschachtelte Links (mit ihren Sätzen): normal-equations `{#transpose}`,
  positive-definite `{#condition-number}`, `{#hessian-matrix}`, qr-factorization `{#reflection}`,
  `{#rotation-matrix}`, rate-of-convergence `{#symmetric-matrix}`. Neu:
  norm `{#euclidean-norm}`, `{#triangle-inequality}`; orthogonal-complement `{#projection}`;
  orthogonality `{#inner-product-functions}`; outer-product `{#singular-value-decomposition}`.
  Alle Ziele existieren.

## 4. Reparierte Fehler

Fachlich: nelder-mead (`optim()`-Voreinstellung, Widerspruch zu S126), outer-product
(abgeschnittene SVD, „Deshalb“), orthogonal-matrix („Spiegelung um den Ursprung“),
newtons-method („Minimum“ der Modellparabel → Scheitel), orthonormal-basis (Projektion vs.
Koeffizienten der Projektion), positive-definite ($n$ undefiniert), normal-equations ($\br$
undefiniert), null-space (Mischnotation „dim null“), partial-derivative ($n$ und $\phi$ ohne
Bezug). Verweise: permutation-matrix Heath §3.5 → §2.4; zweifelhafte MML-Verweise gestrichen
(newtons-method §5.7, polynomial §5.2, neural-network Kap. 7). Gedankenstriche: 11 raus, 0 übrig.

## 5. Ermessensfragen

1. **Ergänzte Begriffe** (je ein Satz, von Linkstellen verlangt): Cauchyscher Mittelwertsatz mit
   Formel (S108), „in jeder noch so kleinen Umgebung“ (S107, S115), positiv semidefinit (5 Stellen),
   Konvergenzordnung (4 Stellen), dyadisches Produkt / $\otimes$ (S75, S95), Projektion auf
   konvexe Mengen (S113, S115), Orthogonalität bzgl. anderer Skalarprodukte (S133), 1- und
   Maximumsnorm (Widget-Leitfrage). Die Cauchy-Formel ist die einzige neue Formel; sie steht
   in S108 schon, das Pop-up nennt nur die Voraussetzung $g' \neq 0$ dazu.
2. **normal-equations ohne Zahlenbeispiel:** Die Ausgleichsgerade mit $\bx = (2/3; 1/2)$ steht
   identisch in linear-least-squares, dort nach dem Batch-2-Review bewusst hinter dem Widget
   (Spoiler-Split). Hier stand sie ohne die Datenpunkte, also nicht nachrechenbar. Das Widget
   (eine Spalte $\ba$) dient jetzt als Beispiel. Wer das Rechenbeispiel behalten will, sollte die
   Punkte $(1,1), (2,2), (3,2)$ dazuschreiben.
3. **neural-network in Fettdruck:** $\bx^{(k)}$, $\bA_{k-1}$, $\bb_{k-1}$ statt kursiv
   (STYLE: Kursmakros). S103 benutzt eine andere Notation ($\bz_k$, $\bW_k$); nicht angeglichen.
4. **ohms-law „vgl. Heath Kap. 2, Beispiel 2.1“** und **MML Theorem 2.24** (rank-nullity) sowie
   **MML Gl. (5.107)** (jetzt gestrichen) konnten nicht nachgeschlagen werden (kein PDF-Werkzeug
   im Container); stehen gelassen bzw. nur gestrichen, wo der Inhalt nicht passte.
5. Rohzahl über 220 bei qr-factorization (247), positive-definite (231), quadratic-form (223),
   newtons-method (222), rank-nullity-theorem (221): Die Prosa liegt bei 156–176 Wörtern, der Rest
   ist Mathe. Weiteres Kürzen hätte Linkstellen-Inhalt (SPD/Cholesky, $\bA^T\bA$, Gradient der
   Form) oder die Lead-out-Antworten gekostet.

## 6. Prüfungen

- `npm run typecheck:mdx`: 206 MDX-Dateien, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen; „Tabelle ist nicht aktuell“ (erwartet,
  parallele Kapitel-Edits).
- `npm run test:mdx`: 137/137 Fixtures, Exit 0.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0.
- Headless-MathJax (Makrotabelle mit String- und Array-Makros, `noundefined` aus, Negativtest
  `\foo` erkannt): 500 Literale in den 34 Dateien, 0 Fehler.
