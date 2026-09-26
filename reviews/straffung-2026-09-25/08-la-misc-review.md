# Gutachten zum Straffungs-Durchgang Kapitel 8 (08-la-misc), 2026-09-26

Grundlage: Bericht `08-la-misc.md`, Diff gegen 21b998d (liegt inzwischen im
WIP-Commit 4dd1da4; meine eigenen Änderungen zeigt `git diff HEAD`), Kapitel im
neuen Stand vollständig gelesen, Folien `slides-2627/slides/08-la-misc.qmd`
vollständig, Klausuren WS23/24 bis WS25/26 nach Kapitel-8-Stoff durchsucht.

Gesamturteil: Der Durchgang ist sauber. Der Haupttext ist bei zugeklappten
Vertiefungen vollständig; alle gezählten Folien, Quizfragen und
Self-Check-Lösungen stehen im Haupttext. Die Rückholungen von Folienstoff aus
Vertiefungen (Algebra der Potenzmethode, Rayleigh-Quotient, Beweis von Teil 2,
Lanczos-Bemerkung, Herleitung des Korollars) sind richtig. Gestrichen wurde
nichts, was in eine Vertiefung gehört hätte. Die Deslop-Arbeit ist gründlich
(Tell-Regex: 0 Treffer, kein Gedankenstrich im Kapitel). Ich habe sechs
Stellen nachgebessert, meist Präzision, die beim Kürzen verloren ging.

## 1. Eigene Änderungen (6)

1. **S81, Bemerkung zwei-schaetzungen-fuer-den-eigenwert.** Den Quotienten
   $\|\bz^{(k)}\|/\|\bz^{(k-1)}\|$ der rohen Iteration wieder ausdrücklich
   genannt. Grund: Die Musterlösung der Klausur WS25/26-1 (Aufgabe b,
   Potenzmethode) schätzt $|\lambda_1|$ genau über
   $\|\bA^k\bx\|/\|\bA^{k-1}\bx\|$. Die Straffung hatte diese Form durch
   „Diesen Streckfaktor misst …" ersetzt; jetzt steht beides da, rohe und
   normierte Fassung.
2. **S81, Bemerkung wann-die-potenzmethode-versagt (Fachfehler, schon vor dem
   Durchgang vorhanden).** „Gilt $|\lambda_1| = |\lambda_2|$ …, so ist die Rate 1
   und nichts konvergiert mehr" stimmte so nicht. Für $\lambda_2 = -\lambda_1$
   konvergiert die Normschätzung $\lambda^{(k)}$ weiter gegen $|\lambda_1|$
   (per node nachgerechnet, diag(2, −2, 1): $\lambda^{(k)} = 2{,}000000$, Richtung
   springt zwischen zwei Vektoren). Für $\lambda_1 = \lambda_2$ (doppelter
   Eigenwert) findet die Methode sogar einen Eigenvektor. Neu: „mit
   $\lambda_2 \neq \lambda_1$ … und die Iterierten laufen gegen keine feste
   Richtung mehr."
3. **S81, Beispiel qr-iteration-an-der-beispielmatrix.** „dieselbe
   Diagonalisierung" → „dieselbe Diagonalisierung, dort mit vertauschter
   Reihenfolge". Grund: Die Erklärung, warum dort $(4, 9)$ und hier $(9, 4)$ auf
   der Diagonalen steht, liegt jetzt in der Vertiefung „Reihenfolge der
   Eigenwerte". Im Haupttext hätten Lesende sonst einen scheinbaren Widerspruch
   gesehen.
4. **S84, Beispiel sketching-zweier-vektoren-mit-10-000.** Die Vorhersagefrage
   der gezählten Folie „Beispiel: Sketching in R" (eher 50 %, 3 % oder unter
   0,1 %?) als einen Satz vor den R-Code gesetzt. Grund: Brief §1 verlangt jede
   Quizfrage der Folien im Haupttext; die Auflösung (3 % bzw. 1 %) stand schon
   im Beispiel. Keine neuen Zahlen.
5. **S84, Selbsttest „Aussage über einen vorher festgelegten Vektor".** „brauchen
   mehr" → „brauchen ein Netzargument, eine Vereinigungsschranke und ein etwas
   größeres $m$". Grund: Die Kürzung hatte die Antwort unpräzise gemacht; der
   alte Wortlaut nannte das Netzargument, die Bemerkung nennt alle drei Zutaten.
6. **S85, Bemerkung die-drei-kernideen, Punkt 2.** Verstümmelten Satz repariert:
   „wird eine Korrektur, ausmultipliziert die affine Vorschrift …" →
   „wird eine Korrektur; ausmultipliziert ergibt das die affine Vorschrift …".

## 2. Geprüft und für gut befunden

- **Zuklapp-Lesetest** (Skript: Vertiefungen per Fence-Regex ausblenden,
  `@typ:id`-Ziele gegen die in Vertiefungen definierten IDs abgleichen): Nur
  `@algorithmus:sketching-fuer-ein-kq-problem` wird zweimal aus dem Haupttext
  angesprungen (S84, Bemerkung ein-fester-vektor und Bemerkung wo-skizzen-helfen).
  Beide Stellen tragen die Formel $\min\|\bS\bA\bx - \bS\bb\|$ selbst, der
  Verweis klappt nur die Box auf. Kein Begriff, keine Gleichung und keine
  Selbsttest-Antwort hängt allein an Vertiefungsstoff. Widget-TSX-`ref()`-Ziele
  (S81Potenz, S83Richardson, S84Sketching) liegen alle im Haupttext; der
  Rayleigh-Quotient, den der Potenz-Stepper anzeigt, ist dort definiert.
- **Folienabdeckung** (jede gezählte Folie abgehakt): Opener-F1 steht als
  $\bA^k\bv_i = \lambda_i^k\bv_i$ im Haupttext, F2 als Vorkenntnis mit Formel;
  Quiz Potenzmethode, Quiz $O(n^2)$, Self-Check F1 und F2 als Selbsttests,
  Self-Check F3 (SRHT) als Prosa. Die Anhangsfolien (Rechnung zur Ähnlichkeit,
  Beweise, SVD-Fehlervergleich, Sketching-Tabelle) liegen in Vertiefungen oder
  sind, wie die Ähnlichkeitsrechnung, als Beispiel ohnehin im Haupttext.
- **Kap. 12 braucht aus S83** das Richardson-Verfahren und
  $\|\bI - \gamma\bA\| < 1$ (S121 verweist dreimal auf @sec:la-misc/iterative-loeser):
  beides steht im Haupttext.
- **Entfernte IDs:** `von-quadraten-zu-laengen-und-abstaenden`,
  `zwei-nachtraege-zur-rechnung`; repo-weit kein Verweis (nur die generierte
  Tabelle). Konzept-Links: S84 verliert `{#covariance-matrix}`, S85
  `{#similar-matrices}` und `{#spectral-radius}`; alle drei sind im Kapitel
  weiter verlinkt.
- **Vertiefungen:** 17 Boxen, die kleinste hat 61 Wörter (S83 „Das Residuum als
  negativer Gradient"), keine zwei stehen direkt hintereinander, Fence-Stufen
  korrekt, Titel ohne Mathe und Markup.
- **Zahlen nachgerechnet:** Iterationszahlen 8/15/23 aus @eq:zahl-der-iterationen
  (ρ = 0,405, e₀ = 0,643), Richardson-Schritt 4 (25/256, 160/256),
  Winkelquotienten 0,46/0,45 und Eigenwertfehler-Quotient ≈ 0,2 im
  Potenzmethoden-Beispiel, Rademacher-K = 1 für $\be_1$.

## 3. Restpunkte und Fragen an den Dozenten

1. **Richtwert verfehlt: Haupttext −10,6 % statt −15 bis −20 %.** Ich halte das
   für vertretbar. Der Kapitelhaupttext war nach dem Kürzungsdurchgang vom
   August schon schlank, und rund 350 Wörter Folienstoff mussten aus
   Vertiefungen zurück. Was im Haupttext steht, ist Folienstoff oder die
   Brücke dorthin. Weiter kürzen ginge nur an Stellen, die der Dozent
   entscheiden sollte:
   - die drei Selbsttestfragen in S81, die nicht von den Folien stammen
     (charakteristisches Polynom, Drehung als QR-Gegenbeispiel,
     $O(n^3)$ je Potenzschritt), zusammen ≈ 180 Wörter; die letzten beiden
     wiederholen Bemerkungen fast wörtlich;
   - der Selbsttest in S84 (fünf Fragen, ≈ 330 Wörter, vier davon nicht von
     den Folien);
   - die Handrechnung des ersten QR-Schritts in S81 (≈ 150 Wörter; die Folie
     zeigt nur eine Grafik). Ich würde sie behalten, sie ist die einzige
     konkrete QR-Rechnung im Kapitel.
2. **S82, Lanczos-Faktor.** Die Folie sagt „$O(kp^2)$ statt $O(p^3)$, bei
   $p = 100\,000$, $k = 10$ rund 10 000-mal schneller". Das Skript sagt
   ausdrücklich, ein pauschaler Faktor wie $p/k$ lasse sich nicht angeben. Einer
   der beiden Texte sollte angepasst werden.
3. **S82, Benchmark.** Die Folienzahlen „~40× bzw. ~11× schneller" fehlen, weil
   der Container kein Rscript hat (und der Bauauftrag Kap. 8 verbietet,
   knitr-Ergebnisse zu erfinden). Der Satz „wie viel Rechenzeit das spart, misst
   der Vergleich oben" bleibt damit ohne Ergebnis. Wer den Chunk einmal
   ausführt, kann die Größenordnung nachtragen.
4. **S84, SRHT.** Skript $O(n\log n)$ für die volle Hadamard-Transformation,
   Folie und Self-Check F3 $O(n\log m)$ (geprunte Variante). Skript
   unverändert; eventuell die Folie präzisieren.
5. **Kleine Ungenauigkeiten im Bericht der Bearbeiter:** Die Zahlen dort
   (Haupttext 9616) passen nicht ganz zu `zaehlen.mjs` (9572 vor meinen
   Änderungen). Der Punkt „S85 verweist für den Spektralradius auf
   die-drei-wahlen…" ist überholt; dieser Verweis wurde gestrichen, der
   Spektralradius steht im Haupttext nur noch beim Jacobi-Verfahren in S83. Die
   Aussage, der Kern von „zwei-nachtraege" (Gewinn $n/m$, nicht $(n/m)^2$;
   Kovarianzmatrix) stehe als Halbsatz im Beispiel, trifft nur zur Hälfte zu:
   „Gewinn um den Faktor $n/m$" steht da, der Hinweis auf $(n/m)^2$ und die
   Kovarianzmatrix nicht. Das halte ich für verzichtbar.

## 4. Endzahlen (`node reviews/straffung-2026-09-25/zaehlen.mjs 08-la-misc`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | --- | --- | --- |
| S81 | 3664 → 3555 (−3,0 %) | 976 → 868 | 4640 → 4423 (−4,7 %) |
| S82 | 1202 → 1143 (−4,9 %) | 190 → 208 | 1392 → 1351 (−2,9 %) |
| S83 | 2413 → 2091 (−13,3 %) | 435 → 648 | 2848 → 2739 (−3,8 %) |
| S84 | 2458 → 2080 (−15,4 %) | 1336 → 1463 | 3794 → 3543 (−6,6 %) |
| S85 | 1029 → 757 (−26,4 %) | 0 → 0 | 1029 → 757 (−26,4 %) |
| **Summe** | **10766 → 9626 (−10,6 %)** | **2937 → 3187** | **13703 → 12813 (−6,5 %)** |

Meine Änderungen erhöhen den Haupttext gegenüber dem Stand der Bearbeiter um
54 Wörter (9572 → 9626).

## 5. Prüfergebnis (Endstand)

- `npm run typecheck:mdx`: 206 Dateien, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER, nur „Tabelle ist nicht
  aktuell" (erwartet).
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte (bekannte
  \cbblue-Negativzeile). Die Kapitel-8-Prüfscripte lesen nur Widget-TSX.
- Headless MathJax (187 Makros, `noundefined` entfernt, Negativtest greift):
  1043 Mathe-Literale in S81–S85, 0 Fehler.
- Tell-Regex aus german-tells.md: 0 Treffer; Gedankenstriche: 0.
- Keine Fehler in fremden Dateien beobachtet.
