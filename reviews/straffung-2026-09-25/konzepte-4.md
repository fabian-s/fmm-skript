# Konzept-Pop-ups, Batch 4 (rounding-error … vector): Straffung und Deslop

Stand 2026-09-26. 32 Dateien in `src/concepts/`, geändert wurde nur Prosa. `export const title`,
Imports und Widget-Tags sind unverändert (gegen `git show HEAD` geprüft). Formeln und Zahlen sind
unverändert, mit diesen Ausnahmen: Dezimalkomma nach Hausstil in taylor-series (`0.5` → `0{,}5`
usw., dieselben Werte), Funktionssymbol $x(t)$ → $f(t)$ in taylor-theorem und das Beispiel
$\bL\bu = \boldsymbol{f}$ → $\bA\bx = \bb$ in vector (siehe 5.1, 5.2). Keine Vertiefungen, kein
git-Schreibbefehl, kein gen:numbers.

Pro Pop-up: Datei ganz gelesen, Linktexte gezählt (`grep -rhoE ':k\[[^]]*\]\{#<id>\}'`), zwei bis
drei Linkstellen im Kontext gelesen, Widget-TSX (Kopf mit verifizierten Zahlen, Aufgabe, Verdikt)
gelesen. Lead-outs rechnen nur mit Zahlen aus dem Widget-Kopf oder aus eigener Nachrechnung.
Buchverweise gegen die PDF-Extrakte (k3r/heath.txt, k3r/mml.txt) geprüft: Heath §2.1, §3.1, §3.4,
§3.5, §7.3.5 und MML Def. 5.1, §4.4, §7.1.3 stimmen.

## 1. Zahlen (`zaehlen.mjs concepts`, Wörter inkl. Mathe, Imports und Kommentarkopf)

Summe der 32 Dateien: 6 051 → 5 876 (−2,9 %). Median 184 → 183, Maximum 367 → 287.
Über 220 lagen vorher 8 Pop-ups, jetzt 6 (siehe 5.4); ihre Prosa ohne Mathe liegt bei 139–178
Wörtern. Vertiefung = 0. Gesamtzahl aller Pop-ups laut Skript: 26 003 → 24 966 (−4,0 %, inkl.
Batch 1–3).

Der Rückgang ist klein: Viele Lead-outs sagten nur, das Widget „zeige“ etwas, und beantworten jetzt
die Leitfrage; mehrere Leitfragen nannten das Widget-Objekt nicht (Formeln, Matrix, Bandbreite).
Dazu kamen Begriffe, die Linkstellen verlangen, das Pop-up aber nicht erklärte (5.3).

| Pop-up | vorher → nachher | was raus / was repariert |
| --- | ---: | --- |
| rounding-error | 235 → 222 | „mikroskopisch“, „harmlos“, „harte Untergrenze … Normalfall“ raus; Auslöschung verdichtet und auf `{#cancellation}` verlinkt; **ungenau:** „höchstens etwa“ ε → „höchstens“ (Schranke ist ε/2); Leitfrage nannte die „zwei Formeln“ nie → $(1-\cos x)/x^2$ und $2\sin^2(x/2)/x^2$ genannt; Lead-out mit Widget-Werten (8 Stellen bei $10^{-4}$, $0$ statt $0{,}5$ ab $10^{-8}$) |
| scalar | 116 → 114 | „einfach“, „skaliert“ (zirkulär) raus; Schlusssatz „ein freier Skalar erzeugt unendlich viele Lösungen“ klarer an eine Lösungsformel gebunden |
| secant-line | 160 → 153 | „genau“, „die ganze Idee hinter“, Vorgeplänkel „Probieren wir aus“ raus; Differenzenquotient als Begriff kursiv; Leitfrage nennt $f = x^2$, $x_0 = 1$; Lead-out: Abstand zur Tangentensteigung genau $h$ |
| sequence | 182 → 186 | „einfach“, „pendeln sich ein“, Gedankenstrich raus; Schreibweise $(a_n)_{n\in\N}$ ergänzt (S22 verlinkt genau dort); Lead-out mit $a_1 = 1$, $a_{20} = 0{,}05$ statt „sichtbar sind nur die ersten zwanzig“ |
| set-builder-notation | 130 → 124 | **kaputter Satz:** Absatz begann mit „: Nimm jeden …“ hinter einer Anzeigeformel, dazu du-Form → Formel inline, wir-Form; „genau“ raus |
| sherman-morrison-formula | 218 → 207 | „flickt“, „Kleine Probe“, „billig“ raus; Broyden-Absatz auf einen Nebensatz gekürzt, dafür die Rang-1-Änderung beim Weglassen eines Datenpunkts ($\bX^T\bX$ verliert $\bx_i\bx_i^T$), weil die einzige Linkstelle (S138, LOOCV) genau dafür verlinkt |
| similar-matrices | 171 → 168 | „Dahinter steckt Anschauung“, „zwei Verkleidungen“, Gedankenstrich und die vage Konventionsklammer raus; **Lücke:** Form $\bB = \bQ\bA\bQ^{-1}$ und Begriff *Ähnlichkeitstransformation* (S81 verlinkt mit genau dieser Formel), charakteristisches Polynom (S34, S81) |
| sine-cosine | 193 → 213 | „pendeln“, „rotieren durch einen Viererzyklus“, „Die Werte, die wir uns hier merken“ raus; Ableitungszyklus eindeutig dem Kosinus zugeordnet, Link `{#taylor-series}`; Leitfrage/Lead-out: Vorzeichen von $\cos x$ entscheidet Steigen/Fallen (statt „wird als gemeinsame Bewegung sichtbar“) |
| singular-value-decomposition | 206 → 202 | ASCII-Schlusszeichen, „eigentlich“, „lediglich“ raus; **ungenau:** „die Wurzeln der Eigenwerte von $\bA^\top\bA$“ (bei $m < n$ hat $\bA^\top\bA$ mehr Eigenwerte) → „Wurzeln von Eigenwerten“ (Wortlaut S65); Lead-out benennt die Rollen von $\bV^\top$ und $\bU$ |
| slope | 146 → 155 | Doppelverweis MML Def. 5.1 (steht in secant-line) raus; Lead-out „gerichtetes Verhältnis“ → Vorzeichen = Richtung, Betrag = Steilheit, mit Widget-Wert $a = -1{,}5$ |
| smooth-function | 165 → 154 | Satz über $|x|$ vor dem Widget raus (Lead-out beantwortet ihn); „beliebig oft differenzierbar“ wörtlich (S133, S139 verlinken so); Link `{#taylor-series}`; Lead-out mit einseitigen Steigungen $-1$/$+1$ |
| span | 160 → 146 | „immer … immer“, „heißt genau“ raus; Geometrie-Satz vor dem Widget und Lead-out zu einem zusammengelegt; **Lücke:** *Spaltenraum* $\col(\bA)$ (S61, S71 verlinken „Spaltenraum“) |
| sparse-matrix | 186 → 180 | Gedankenstrich, Householder-Detail („fill-in-reduzierende Spaltenanordnung“) raus; Linktext „LR-Zerlegung“ → „LU-Zerlegung“ (Skript: 80× LU, 6× LR); **Lücke:** Bandbreite $b$ vor dem Widget definiert ($|i-j| \le b$); Lead-out mit 34 statt 144 (Widget-Kopf) |
| spectral-radius | 235 → 226 | „Warum das wichtig ist:“, Gedankenstrich raus; **undefiniertes Symbol:** „$\rho(\bG(\bx^*)) < 1$ … Fixpunkt-Iteration für Gleichungssysteme“ ($\bG$ nirgends erklärt) → lineare Iteration $\bx_{k+1} = \bG\bx_k + \bc$ mit Iterationsmatrix (S83 verlinkt genau dafür); $\rho(\bA) \le \|\bA\|$ ergänzt (S35, S82, S83); Polynomfaktor-Nebensatz raus, „nur auf lange Sicht“ bleibt (Widget-Kopf verlangt es) |
| spectral-theorem | 124 → 125 | „das zentrale Ergebnis“ → „Hauptsatz“; **ungenau:** „nur noch eine Streckung“ (negative Eigenwerte spiegeln) → „jede Achse wird mit ihrem Eigenwert multipliziert“ |
| subspace | 190 → 191 | Gedankenstrich mit hängendem Relativsatz („… am nächsten liegt – der typischerweise außerhalb liegt“) repariert; Leitfrage „diese Probe“ (ohne Bezug) → „Welche der drei Mengen im Widget …“; Lead-out mit dem Summen-Gegenbeispiel aus dem Widget |
| summation-notation | 166 → 162 | „Buchführung“, „zufällig“, „einfach“ raus |
| supremum | 277 → 229 | „Der Witz des neuen Begriffs“, „einfach“, Grenzwert-Klammer (mit `{#limit}`), Exkurs konvexe Konjugierte (MML §7.3.3) raus; Beispielformel inline; **ungenau:** „die Höhe, der sich der Graph nähert“ (gilt nur ohne Maximum) → „niedrigste Höhe, über die der Graph nirgends hinausreicht“; Existenzaussage ($+\infty$ bei Unbeschränktheit) bleibt (S24); Lead-out mit $x > 99$ und $\sup = 1$ ohne Maximum |
| symmetric-matrix | 205 → 191 | „gutartigsten“, Projektor-Nebensatz raus; Link `{#spectral-theorem}`; **ungenau:** „reine Streckung“ → „streckt oder spiegelt“; Leitfrage nennt die Widget-Matrix $\begin{bmatrix} 2 & c \\ c & 1 \end{bmatrix}$ ($c$ kam im Lead-out ohne Einführung vor); Lead-out mit Eigenwerten $(3 \pm \sqrt{1+4c^2})/2$ und Vorzeichenwechsel bei $|c| > \sqrt2$ |
| tangent-line | 175 → 176 | „hervorragender Ersatz“, „handfeste geometrische Grund“, „interessanten Punkt“ raus; „glatte“ → „differenzierbare“ (reicht und ist die richtige Voraussetzung); Lead-out wiederholte das Verdikt → Abstand $\le w^2$, 1,1 % bei 32-fachem Zoom |
| taylor-series | 247 → 232 | „Kleines Beispiel“, „schmiegt“, „läuft davon“, Exkurs Interpolation (Heath §7.3.5, keine Linkstelle in Kap. 13) raus; **Unklarheit:** Reihe und Polynom wurden gleichgesetzt → *Taylor-Polynom* benannt (Linktext in S108), Reihe als $n \to \infty$; Linktext „Glattheit“ auf `{#differentiability}` → „Differenzierbarkeit“; Dezimalkomma; Lead-out mit Fehlern bei $x = \pi$ (3,14 → 2·10⁻⁵) und $2\pi$ (Widget-Kopf) |
| taylor-theorem | 225 → 240 | „Die Aussage ist lokal …“ und „garantiert das Symbol allerdings nicht“ (schief) raus; Funktionssymbol $x$ → $f$ (5.1); allgemeine Sinus-Schranke $|R_n| \le |t|^{n+1}/(n+1)!$ vor dem Widget; **Fachfehler im Lead-out:** „Bei größeren $t$ ist sie großzügig“, laut Widget-Kopf ist es umgekehrt (n = 3: 10 % bei t = 0,5, 36 % bei t = 2) → großzügig bei *kleinem* $t$, weil $|\sin\xi|$ dort klein ist |
| tensor | 158 → 166 | „einfach“, „(in dem hier gemeinten Sinn)“, „Buchführung“, „Selbstverständlichkeit“ raus; „3-/4-dimensionaler Tensor“ → *Stufe* (S95, S107, S109 verlinken „Tensor dritter Stufe“, „der Stufe 3 oder 4“); Lead-out mit 27 Zellen |
| trace | 189 → 195 | „so billig … etwas Tiefes“, „praktische Invarianten … schiefgelaufen“ raus; **Fachfehler in der Leitfrage:** „während Spur und Determinante gleich bleiben“, die Widget-Aufgabe ändert die Nebendiagonale, also die Determinante → korrigiert; **Lücke:** Linearität und Zyklizität $\tr(\bA\bB) = \tr(\bB\bA)$ (S106, S109 „denn sie ist linear“, S138 Zyklizität); Link `{#similar-matrices}`; Lead-out mit Schwelle $\det > 9$ |
| transpose | 137 → 148 | „Platzsparerei“ raus; Schreibweise $\bA^\top$ ergänzt (Skript: 1 661× `\top`, 22× `^T`); **Lücke:** $(\bA\bB)^T = \bB^T\bA^T$ (S33, S34 verlinken „Transponierregel(n)“) |
| triangle-inequality | 367 → 287 | ASCII-Schlusszeichen, fette Zwischenüberschrift, Herleitungsschritte, Anwendungs- und Beispielsatz zur umgekehrten Form, Summen-/Maximumsnorm-Aufzählung raus; **Lücke:** untere Schranke $\bigl|\|\ba\| - \|\bb\|\bigr| \le \|\ba + \bb\|$ ergänzt (das Widget zeigt genau dieses Sandwich, der Text kannte nur die Form mit $\ba - \bb$); Lead-out: beide Schranken werden angenommen |
| triangular-matrix | 223 → 212 | „besessen“, „fast schon gelöst“, „entwirrt sich“, „ganz ohne Tricks“, „ganze Arbeit“ raus; Leitfrage fragte, was der Text schon beantwortet hatte → „Wo steht die Gleichung mit nur einer Unbekannten?“; Lead-out Einsetzrichtung |
| triangular-solve | 222 → 215 | Gedankenstrich, „Einmal zahlen“, „billig“, Normalengleichungs-Durchlauf (mit unerklärtem $\bL$) raus; „eine Größenordnung billiger“ → „einen Faktor $n$ weniger“; **Lücke:** *Rücksubstitution*/*Vorwärtssubstitution* (S53, S73, S75, S83, S132 verlinken so); Lead-out mit $x = (1, 2, 3)$ und 9 Operationen (Widget-Kopf) |
| unbiased-estimator | 187 → 200 | Gedankenstrich, „Kleines Beispiel“, „Genau darauf“ raus; **Lücke:** *unverzerrt* (S124 verlinkt „unverzerrten Schätzer“); „Jedes einzelne $\bar X$ liegt daneben“ → „meist“; Lead-out beschreibt die beiden Scheiben |
| variance | 147 → 151 | „liest man ab“ (man) raus; Begründung geordnet: Nichtnegativität aus der ersten Form, der Verschiebungssatz macht daraus $\E[X^2] \ge (\E[X])^2$ = Jensen (so benutzen S111, S114 den Link) |
| vector-space | 180 → 177 | „dem Raum entkommen wir nie“, Gedankenstrich, Geraden-Test (steht in subspace) raus; **Lücke:** Matrizen und Funktionen/Polynome als Vektorräume (S92, S131, S132, S134 verlinken dort) |
| vector | 129 → 129 | „einfach“ raus; Beispiel $\bL\bu = \boldsymbol{f}$ mit unerklärtem $\bL$ (Überbleibsel der Quell-App) → $\bA\bx = \bb$ |

## 2. Verlagert in Vertiefungen

Keine (Brief §9).

## 3. Gestrichen (Auswahl; keine Linkstelle braucht es)

- supremum: Exkurs konvexe Konjugierte (vgl. MML §7.3.3) samt $|x|$-Beispiel; Grenzwert-Klammer.
- taylor-series: Taylor-Polynom als Ein-Punkt-Grenzfall der Interpolation (vgl. Heath §7.3.5).
- triangle-inequality: Herleitungskette der umgekehrten Form, Beispiel $|3-4| \le 5$,
  Fehlerabschätzungs-Satz.
- sparse-matrix: Householder-Detail zur Spaltenanordnung.
- spectral-radius: nichtlineare Fixpunktbedingung, Polynomfaktor bei nicht diagonalisierbarem $\bA$.
- triangular-solve: Normalengleichungs-Durchlauf mit $\bL$.
- symmetric-matrix: Projektor-Nebensatz; vector-space: Geraden-Test; taylor-theorem: Lokalitätssatz.
- Weggefallene verschachtelte Links: supremum `{#limit}`. Neu: rounding-error `{#cancellation}`,
  sine-cosine und smooth-function `{#taylor-series}`, symmetric-matrix `{#spectral-theorem}`,
  trace `{#similar-matrices}`. Alle Ziele existieren.

## 4. Reparierte Fehler

Fachlich: taylor-theorem (Lead-out „großzügig bei größeren $t$“ widersprach den Widget-Zahlen),
trace (Leitfrage „Determinante bleibt gleich“ widersprach der Widget-Aufgabe), spectral-radius
(undefiniertes $\bG(\bx^*)$), rounding-error („höchstens etwa“), SVD (Eigenwerte von $\bA^\top\bA$
bei $m < n$), supremum („Höhe, der sich der Graph nähert“), spectral-theorem und symmetric-matrix
(„Streckung“ bei negativen Eigenwerten), tangent-line (glatt → differenzierbar), unbiased-estimator
(„jedes“ → „meist“). Satzbau: set-builder-notation (Absatz mit „:“, du-Form), subspace (hängender
Relativsatz). Undefinierte Symbole: symmetric-matrix ($c$), vector ($\bL$), sparse-matrix
(Bandbreite), rounding-error (die zwei Formeln). ASCII-Schlusszeichen: SVD, triangle-inequality.
Gedankenstriche: 7 raus, 0 übrig. Keine getippten Skript-Nummern (grep leer).

## 5. Ermessensfragen

1. **taylor-theorem, $x(t)$ → $f(t)$:** Das Pop-up nannte die Funktion $x$; das Widget beschriftet
   die Achse „f(t)“, alle sechs Linkstellen (S108, S114, S122, S124, S134, S136) schreiben $f$.
   Reine Umbenennung, keine Rechnung geändert.
2. **vector, $\bL\bu = \boldsymbol{f}$ → $\bA\bx = \bb$:** $\bL$ war nirgends erklärt (FEM-Beispiel
   aus der Quell-App). Wer das Ursache/Wirkung-Bild behalten will, müsste $\bL$ einführen.
3. **Ergänzte Begriffe** (je ein Satz oder Halbsatz, von Linkstellen verlangt, Tabelle oben):
   Ähnlichkeitstransformation, Spaltenraum, Stufe, Transponierregel, Linearität/Zyklizität der Spur,
   unverzerrt, Rück-/Vorwärtssubstitution, beliebig oft differenzierbar, $(a_n)_{n\in\N}$,
   $\rho \le \|\bA\|$ und lineare Iteration, Funktionenräume, $\bA^\top$-Schreibweise. Neue Formeln:
   $(\bA\bB)^T = \bB^T\bA^T$, $\tr(\bA\bB) = \tr(\bB\bA)$, $\bB = \bQ\bA\bQ^{-1}$,
   $\bx_{k+1} = \bG\bx_k + \bc$, $\rho(\bA) \le \|\bA\|$, $\bigl|\|\ba\| - \|\bb\|\bigr| \le \|\ba + \bb\|$,
   $\bX^T\bX$ minus $\bx_i\bx_i^T$; alle Standardfakten, im Skript an den Linkstellen vorhanden.
4. **Rohzahl über 220:** triangle-inequality (287), taylor-theorem (240), taylor-series (232),
   supremum (229), spectral-radius (226), rounding-error (222). Prosa ohne Mathe 139–178 Wörter;
   `\lVert … \rVert` und die Restglied-Anzeige treiben die Zählung. Weiteres Kürzen hätte
   Linkstellen-Inhalt gekostet (umgekehrte Form: S41, continuity; Gleichheitsfall: S122;
   $\sup = +\infty$: S24; $\rho$ vs. Norm: S83).
5. **smooth-function:** Das Skript schreibt $\Ccal^k$ (70× in den Kapiteln), das Pop-up und sein
   Titel $C^k$/$C^\infty$. Nicht angeglichen, weil der Titel unverändert bleiben muss.
6. **sherman-morrison-formula:** Das Broyden-Verfahren kommt im Skript nicht vor (nur BFGS in S124);
   als Nebensatz stehen gelassen, weil der Kommentarkopf darauf verweist. Streichen wäre vertretbar.
7. **spectral-radius:** Die nichtlineare Fixpunktbedingung ist weg; S121 (Vertiefung
   Fixpunktiteration) verlinkt `{#fixed-point-iteration}`, nicht dieses Pop-up.
8. **trace-Widget:** Die Aufgabe „Ändern wir die Nebendiagonale“ lässt auch die Diagonale editierbar;
   die Leitfrage „Die Spur bleibt 6“ gilt nur, solange die Diagonale 3/3 bleibt.

## 6. Prüfungen (nach allen Edits)

- `npm run typecheck:mdx`: 206 MDX-Dateien, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen; „Tabelle ist nicht aktuell“ (erwartet).
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0. Kein Prüfscript liest eine der
  32 Dateien.
- Headless-MathJax (`k3r/k3r-checkmath.mjs`, 187 Makros, `noundefined` aus, Negativtest `\foo`
  erkannt): 459 Literale der 32 Dateien, 0 Fehler.
- Tell-Regex aus `german-tells.md` plus „einfach|eigentlich|billig|wirklich|Buchführung|man|
  lediglich“: nur sachliche Treffer („im einfachsten Fall“, Kommentarkopf, `ZoomWidget`).
- Titel, Imports, Widget-Tags gegen HEAD unverändert; `{#id}`-Bilanz wie in Abschnitt 3.
