# Konzept-Pop-ups, Batch 1 (basis … function): Straffung und Deslop

Stand 2026-09-25. 34 Dateien in `src/concepts/`, nur Prosa geändert; `export const title`,
Imports, Widget-Tags, Formeln und alle `{#id}`-Anker unverändert (bis auf fünf ganz
entfernte Nebensatz-Links, siehe unten). Keine Vertiefungen, kein git, kein gen:numbers.

## 1. Zahlen (`zaehlen.mjs concepts`, Wörter inkl. Mathe/Markup/Kommentarkopf)

Summe der 34 Dateien: 6 781 → 6 347 (−6,4 %). Vorher lagen 12 Pop-ups über 220 Wörtern,
jetzt 6 (alle ≤ 257, davon je 10–25 Wörter Kommentarkopf/Imports).

| Pop-up | vorher → nachher | was raus / was repariert |
| --- | ---: | --- |
| basis | 214 → 181 | Interpolation-vs-KQ-Exkurs (Heath §3.1) raus; Gedankenstrich im Lead-out → Doppelpunkt |
| big-o-notation | 235 → 225 | „Kette von Ungleichungen mitschleppen", „unter den Teppich" → sachlich; Lead-out ohne „nicht X, sondern Y" |
| binomial-coefficient | 157 → 164 | nur Lead-out: nennt jetzt die Pascal-Rekursion, die das Widget zeigt |
| binomial-theorem | 157 → 165 | kaputter Satz „Das nutzt die Rechnung aus" repariert; Lead-out beantwortet die Leitfrage (Term $n x^{n-1}$ bleibt) |
| bisection | 179 → 179 | Deslop („unverwüstlich" → „zuverlässig") |
| cancellation | 202 → 209 | **Fehler:** „In diesem Kapitel" (Pop-up wird aus Kap. 2, 4, 6, 7, 9 verlinkt) → „Beispiel aus der QR-Zerlegung"; „gefährlich/harmlos" raus; Leitfrage und Lead-out passen jetzt zum Widget (Stellenverlust je gemeinsamer Ziffer) |
| cauchy-schwarz-inequality | 175 → 170 | Eckart–Young-Querbezug (MML (4.99)) raus; Lead-out nennt den Gleichheitsfall konkret (0°/180°) statt „erklärt unmittelbar" |
| chain-rule | 157 → 149 | „wichtigstes Werkzeug der Differentialrechnung" (Überhöhung) raus; „wörtlich" → „unverändert" |
| change-of-basis | 170 → 154 | „gottgegeben", „etikettiert um", doppeltes „wirklich" raus; Lead-out sagt, was das Widget zeigt (Koordinaten ändern sich, Pfeil nicht) |
| characteristic-polynomial | 155 → 154 | „man" → wir-Form; Gedankenstrich → Doppelpunkt |
| cholesky-factorization | 202 → 202 | „billige" raus, „Genau am Rand" → „Am Rand", Heath-Verweis ins vgl.-Format; Leitfrage konkret (Niveaumenge + zweiter Wurzelschritt, wie im Widget) |
| closed-bounded-set | 245 → 234 | „kaufen uns" raus; Beispiel $f(x)=x$ auf $(0,1]$ raus (das Widget zeigt genau diesen Fall); Formel direkt an den Satz gehängt; Lead-out nennt Infimum-vs-Minimum statt „erreichbarer Kandidat" |
| complex-numbers | 268 → 247 | Dynamik-Exkurs ($\bx_{k+1}=\bA\bx_k$, $e^{i\omega t}$, Heath Bsp. 4.1) auf einen Satz „Drehstreckung" eingedampft |
| condition-number | 222 → 216 | **Fehler:** handgetippte Nummer „Satz 4.2.6" im Lead-out → Prosa („höchstens verstärken", passend zur Oberschranken-Aussage in Kap. 4); Pseudoinverse-Nebensatz (Heath §3.3) raus; „sauber", „quetscht platt" raus |
| continuity | 257 → 198 | Interpolations-Exkurs (Heath §7.1) samt Lead-out raus; Norm-Stetigkeit (für Kap. 3 gebraucht) bleibt; Leitfrage/Lead-out jetzt zum Widget (Ausgabespanne vs. Fensterbreite) |
| convergence | 195 → 170 | Meta-Satz „Probieren wir das im Widget unten aus" raus; Reihen-Absatz auf einen Satz, geometrische Reihe als drittes Beispiel raus |
| convexity | 303 → 232 | **Fehler:** „bestätigen dagegen nie" → „nicht durch Ausprobieren endlich vieler Paare"; KQ-Absatz auf einen Satz (Heath §3.2 raus), $\spann(\bA)$/Heath §3.1 und Epigraph raus; Eindeutigkeitsargument bleibt; Leitfrage konkret (welche Kurve, wo) |
| covariance-matrix | 211 → 209 | „Reine Buchhaltung", „winziges", „billiges" raus; Sampling-Absatz auf einen Satz, semidefinite Cholesky-Variante raus; `0.8` → `0{,}8`; Lead-out nennt, was das Widget zeigt (Vorzeichen dreht, Betrag staucht, $\rho\to\pm1$ singulär) |
| density-estimation | 156 → 155 | Gedankenstrich → Komma |
| derivative | 182 → 169 | „Schlüssel zu gekrümmten Problemen" gestrafft; Lead-out ohne „kein Kunstgriff, sondern" (Abstand ∝ h, wie im Widget) |
| determinant | 183 → 182 | „Was genau" → „Was"; Gedankenstrich-Nachsatz → eigener Satz |
| diagonal-matrix | 218 → 188 | SVD-Exkurs („der ganze Witz", Pseudoinverse eintragsweise) auf einen Satz; `0.5` → `0{,}5` (2×); Leitfrage gestrafft |
| differentiability | 179 → 156 | „Knick oder Ecke" doppelt → „Knick"; Interpolanten-Satz raus, Spline-Beispiel bleibt (Heath §7.4) |
| dimension | 136 → 130 | Doppel-Gedankenstrich → Klammer; „festnageln", „Dieser Zusatz ist wichtig" raus |
| domain-codomain | 144 → 144 | Lead-out konkret (Element ohne Urbild, wie im Widget) statt Wiederholung des Textes |
| dot-product | 298 → 257 | KQ-Präferenz-Satz („Konkurrentinnen") raus; „Skalarproduktraum"/$\R^n$-Standardbeispiel raus; Winkelsatz entschachtelt; Leitfrage als Frage, Lead-out ohne „genau"/„kippt" |
| eigenvalue-eigenvector | 165 → 157 | „einfach", „Die Suche zeigt:", „genau zwei" gestrafft |
| euclidean-norm | 190 → 179 | KQ-Nachsatz („per Definition die Wahl der 2-Norm") raus; „besondere", „einfach" raus |
| expected-value | 171 → 170 | Gedankenstrich → Doppelpunkt |
| factorial | 167 → 165 | „vielleicht", „am wichtigsten", Doppelung „liefert dort genau den Nenner" raus; Lead-out ohne Gedankenstrich und ohne verdrehte Kausalität |
| fixed-point-iteration | 293 → 245 | „lassen die Iteration den Rest erledigen" → „iterieren"; Beispiel gestrafft; Matrix-Absatz (lineare Löser, Spektralradius, Matrixnorm) auf einen Satz: Kap. 8 definiert die Matrixform an der Linkstelle selbst |
| floating-point | 256 → 255 | Format-Klammer und 0,1-Satz gestrafft; „Binade" (undefiniert) im Lead-out → „zwischen je zwei Zweierpotenzen"; Lead-out nennt die Schranke $2^{-(t+1)}$ aus dem Widget-Verdikt; Gedankenstrich → Doppelpunkt |
| function-composition | 180 → 176 | verdrehten Satz „ist das, was die Kettenregel ausnutzt" begradigt; Lead-out konkret ($f(x)$ = Ausgabe und Eingabe) |
| function | 159 → 161 | **Fehler:** Linktext „Definitions- und Wertebereich" → „Definitions- und Zielbereich" (Wertebereich = Bild, das Pop-up unterscheidet Zielbereich und Bild); Lead-out ohne „im Widget" |

## 2. Verlagert in Vertiefungen

Keine (Pop-ups haben keine Vertiefungen, Brief §9).

## 3. Gestrichen (Nebenthemen, Exkurse, Querbezugsketten)

Siehe Tabelle. Dabei entfernte Nebensatz-Links (ids nur gestrichen, nirgends umbenannt):
`{#pseudoinverse}` (condition-number), `{#geometric-series}` (convergence), `{#span}`
(convexity), `{#real-coordinate-space}` (dot-product), `{#matrix-norm}`
(fixed-point-iteration). Alle Ziel-Module existieren weiter und sind anderswo verlinkt.

## 4. Reparierte Fehler

- cancellation: „In diesem Kapitel" in einem kapitelübergreifenden Pop-up.
- condition-number: handgetippte Satznummer „Satz 4.2.6" (Regel „Wir schreiben nie eine
  Nummer"; lint-numbers prüft Konzepte nicht); Aussage jetzt als Oberschranke formuliert.
- convexity: „bestätigen lässt sich Konvexität nie" (Brief §9).
- function: Linktext „Wertebereich" für den Zielbereich.
- binomial-theorem, function-composition: unklare/verdrehte Sätze.
- floating-point: undefinierter Fachbegriff „Binade" im Lead-out.
- covariance-matrix, diagonal-matrix: Dezimalpunkte in Mathe (`0.8`, `0.5`) auf
  Hausstil `0{,}8`/`0{,}5` gesetzt (Werte unverändert).

## 5. Ermessensentscheidungen und offene Fragen

1. **Sechs Pop-ups bleiben über 220 Wörtern** (dot-product 257, floating-point 255,
   complex-numbers 247, fixed-point-iteration 245, closed-bounded-set 234, convexity 232).
   Grund: der Rest ist Definition + ein Beispiel + Widget-Rahmen; weiter kürzen hieße
   Kerninhalt (z. B. das allgemeine Skalarprodukt, das Kap. 11/12 an den Linkstellen
   voraussetzt) oder das einzige Beispiel opfern. Dozent kann entscheiden, ob z. B. in
   dot-product der Statistik-Satz (Stichprobenkovarianz) oder der Absatz zum allgemeinen
   Skalarprodukt fallen soll.
2. **big-o-notation** wird in Kap. 10 (S103, S105) auch für das kleine $o(\cdot)$
   verlinkt („Landau-Bedingung", „Landau-Symbole"); das Pop-up definiert nur $O(\cdot)$.
   Nicht ergänzt (kein neuer Stoff laut Brief §5); S105 erklärt $o$ selbst. Falls gewünscht:
   ein Satz zu $o(\cdot)$ wäre dort sinnvoll.
3. **cancellation** behält das Householder-Beispiel (zweites Beispiel neben der
   Varianzformel), weil es die einzige konkrete Illustration der „Kur" (Umformen) ist.
4. **complex-numbers**: der Dynamik-Exkurs ist auf „Drehstreckung" reduziert; die
   Eigenwert-Motivation bleibt, weil Kap. 3 (S31) genau dafür verlinkt.
5. **closed-bounded-set**: das Prosa-Beispiel zu $(0,1]$ ist gestrichen, weil das Widget
   exakt diesen Fall (Randpunkt ein/aus) vorführt; im PDF trägt jetzt der Lead-out.
6. Nicht angefasst: `\bL\bL^T` / `^T` statt `^\top` in cholesky, dot-product,
   euclidean-norm, diagonal-matrix, eigenvalue (Mathe-Inhalt, Brief §5).

## 6. Prüfungen

- `npm run typecheck:mdx`: 206 Dateien, ohne Befund (vor und nach den Edits).
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen.
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich (Exit 0); die Zeile „FEHLER:
  Makroname erscheint als Literaltext" im Log ist der beabsichtigte Negativtest
  `\cbblue` vs. `\cblue`, kein Befund.
- Residual-Grep über die 34 Dateien mit der Tell-Regex aus `german-tells.md` (plus
  „einfach", „festnagel", „Buchhaltung", „ man "): keine Treffer mehr.
