# Straffung Kap. 5 (05-lgs), 2026-09-26

Dateien: `src/chapters/05-lgs/S51.mdx` … `S55.mdx`. Grundlage: Foliensatz
`slides-2627/slides/05-lgs.qmd` (alle Folien gelesen), alter Bericht
`reviews/kuerzung/05-lgs.md` (A1–A3 und B1–B9 waren bereits umgesetzt), Klausur-
Gegenprobe (`exams/questions/lgs/aufgabe1.tex`: exakte Flop-Zahl der
Rückwärtssubstitution n²; WS25/26-1: Nullpivot bei (0 1; 1 1) und Pivotierung;
WS25/26-2: LDLᵀ-Lösen). Alle drei Klausurpunkte stehen im Haupttext.

## 1. Zahlen (`zaehlen.mjs 05-lgs`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S51 | 763 → 824 (+8,0 %) | 180 → 0 | 943 → 824 (−12,6 %) |
| S52 | 1235 → 1327 (+7,4 %) | 228 → 0 | 1463 → 1327 (−9,3 %) |
| S53 | 2134 → 2176 (+2,0 %) | 470 → 275 | 2604 → 2451 (−5,9 %) |
| S54 | 1503 → 1544 (+2,7 %) | 637 → 654 | 2140 → 2198 (+2,7 %) |
| S55 | 673 → 646 (−4,0 %) | 0 → 0 | 673 → 646 (−4,0 %) |
| **Summe** | **6308 → 6517 (+3,3 %)** | **1515 → 929** | **7823 → 7446 (−4,8 %)** |

Der Haupttext wächst, statt um 5–10 % zu schrumpfen. Grund: Frühere Durchgänge
hatten Stoff von **gezählten** Folien in Vertiefungen gesteckt (Strassen-Folie,
Hilbert-Demo, Komplexitätssumme samt Kosten-Widget, L_k⁻¹-Aussage), und zwei
Folienlücken fehlten ganz (R-Chunk der Cholesky-Simulation, Opener-Quizfrage 2).
Zusammen sind das rund 730 Wörter Kern, die jetzt im Haupttext stehen. Ohne sie
wäre der bestehende Haupttext um rund 520 Wörter (≈ −8 %) kürzer geworden. Das
Gesamtvolumen sinkt um 4,8 %.

## 2. Verlagerungen

### Aus Vertiefungen zurück in den Haupttext (Kern, gezählte Folie)

- **S51, Vertiefung „Schnellere Matrixmultiplikation" aufgelöst**: Strassen,
  Alman et al., AlphaTensor und `@bemerkung:warum-wir-trotzdem-mit-o-nmk-rechnen`
  stehen auf der gezählten Folie „Matrixmultiplikation". Jetzt unter
  „### Geht Matrixmultiplikation schneller?" im Haupttext, gestrafft („Seither in
  kleinen Schritten gedrückt", „Die Suche geht weiter" gestrichen).
- **S52, Vertiefung „Ein empfindliches Zahlenbeispiel zur expliziten Inversen"
  aufgelöst**: `@beispiel:hilbert-matrix-inverse-vs-loesen` samt R-Code und
  Kasten „Kondition und Rechenweg" ist die Demo-Spalte der gezählten Folie
  „Lineare Gleichungssysteme" (Beleg für „Invertiere niemals eine Matrix!").
  Beispiel und Kasten stehen jetzt als Geschwister im Haupttext (vorher lag der
  Kasten im Beispiel). Die Kasten-Auswertung ist jetzt konkret (Schwelle n = 9,
  Inversenweg nie genauer; beides prüft `REV29/05-lgs-S52Hilbert.mjs`).
- **S53, Vertiefung „Herleitung der Aufwandsordnung und exakte Kosten"
  aufgelöst**: Die Summe Σ O((n−k)²) = O(n³) steht auf der Folie „Komplexität".
  Sie steht jetzt als zwei Sätze Prosa nach `@satz:komplexitaet-der-lu-zerlegung`
  (die `::::beweis`-Hülle mit einem Schritt entfällt). Die exakte Konstante n³/3
  ist mit der Quadratsumme zusammengelegt. Der Kasten „Einmal zerlegen oder jedes
  Mal neu?" mit Zahlfrage gehört zum Kern-Thema O(n³ + Jn²) und steht jetzt im
  Haupttext.
- **S53, L_k⁻¹-Aussage**: „Inverse macht die Operation rückgängig, Vorzeichen
  kippen; L ist als Produkt unterer Dreiecksmatrizen wieder eine" stand auf der
  Folie, im Skript aber nur in Beweisschritt 2 der Vertiefung. Jetzt steht sie als
  kurzer Absatz vor `@satz:die-gauss-elimination-liefert-eine-lu`; Schritt 2 im
  Beweis ist entsprechend gekürzt.

### Neu im Haupttext (Folienlücken)

- **S54, `@bemerkung:ziehen-aus-der-multivariaten`**: R-Chunk der gezählten
  Folie „Demo: Aus N(0, Σ) simulieren" mit dem Hinweis, dass `chol()` den oberen
  Faktor R = Lᵀ liefert (`t(chol(Sigma))`). Code ohne Ausgabe, **nicht
  ausgeführt** (kein Rscript im Container).
- **S54, Selbsttest**: Die Aussage der Opener-Quizfolie, Frage 2 (positive
  Einträge bzw. det > 0 reichen nicht für positive Definitheit), fehlte im
  Kapitel. Neue `:::frage{falsch}` mit zwei Minimal-Gegenbeispielen:
  (1 2; 2 1) mit x = (1, −1)ᵀ liefert xᵀAx = −2, und −I₂ hat det = 1.
  Beide von Hand nachgerechnet.
- **S55, Selbsttest-Frage 3**: ein Satz zur Self-Check-Folie, Frage 2
  (Pivotierung, sobald ein Pivot null oder nahe null ist).

### Bestehende Vertiefungen (bleiben, nur Titel und Deslop)

- S53 „Die Eliminationsmatrizen sauber zusammenrechnen" → **„Beweis der
  Produktformel für L"**. EXTRA: Die Rang-1-Rechnung steht auf keiner Folie.
- S54 „Warum die Zerlegung immer existiert: der Induktionsbeweis" →
  **„Induktionsbeweis der Cholesky-Zerlegung"**. EXTRA: Anhangsfolie
  (uncounted). Der Relikt-Absatz „Zum Quantor" (korrigierte einen Folienfehler,
  den der aktuelle Foliensatz nicht mehr hat) wurde durch das
  Eindeutigkeitsargument der Anhangsfolie ersetzt.
- S54 „Cholesky mit Pivotierung …": Anhangsfolie. Nur der Link wurde auf
  `@sec:fehler/kondition` umgestellt.

Neu in eine Vertiefung verlagert wurde nichts. Das EXTRA-Material des Kapitels
stand schon in den drei Boxen oben.

## 3. Gestrichen oder zusammengelegt

- **S51**: Die Env `:::bemerkung[#kondition-der-grundoperationen]` (kein
  Verweis im Repo) ist jetzt ein Satz Prosa, zusammengelegt mit der Überleitung
  zur Komplexität. Außerdem gestrichen: die doppelte Nennung von Kondition und
  Komplexität (Einleitung und Liste, beide verlinkt), „Beginnen wir mit …",
  „Dieses Kapitel baut auf … auf", der Schlusssatz einer Quiz-Erklärung
  („unterschätzt drastisch").
- **S52**: Rückblick „In @sec:grundlagen haben wir gezählt …". In der Bemerkung
  zur Inversen: die rhetorische Frage, der Schlusssatz „Wo immer …", der die
  Eröffnung wiederholte, „Die Warnung bezieht sich …"; die Einschränkung „muss
  nicht in jedem Fall scheitern" ist im Genauigkeitspunkt aufgegangen. Im
  Hilbert-Beispiel: die Leerformel „In dieser Rechnung fügt das explizite
  Invertieren einen empfindlichen Rechenweg hinzu". Im Quiz: die Einleitung
  „Prüfen wir die vier Antwortmöglichkeiten einzeln" und die Doppelfrage
  (Lead-in und Zahlfrage fragten beide nach der Zahl der Divisionen).
  Außerdem „bequemer", „gratis", „bezahlen".
- **S53**: `@bemerkung:merkregel-ein-lgs-zwei-dreieckssysteme` war eine Dublette
  von `@algorithmus:loesen-von-ax-b-mit-der-lu-zerlegung`; der einzige Verweis
  stand im selben Abschnitt. Ersetzt durch einen Satz mit Verweis auf den
  Algorithmus. Die Underbrace-Formel steht jetzt direkt vor dem Algorithmus.
  Ebenfalls gestrichen:
  - das Relikt „ein n-ter Schritt wäre arbeitslos (L_n Einheitsmatrix)" (alter
    Folienfehler L_n statt L_{n−1});
  - Meta-Sätze („In diesem Abschnitt wechseln wir den Blickwinkel", „nicht nur …
    sie zerlegt", „Rechnen wir das einmal komplett durch");
  - die Vorwegnahme des Existenzsatzes in der Einleitung davor;
  - „Buchhalterisch", „zugegeben langweilige", „Wie das Widget zeigt".
- **S54**: Der Kovarianz-Absatz vor „SPD-Matrizen in Statistik und ML" war eine
  Dublette des Listenpunkts 1 und ist mit ihm zusammengelegt. Der Absatz zur
  Normierung l_ii > 0 ist gekürzt und steht jetzt vor dem Beweis. Ebenfalls
  gestrichen:
  - „Es lohnt sich, diese Struktur auszunutzen";
  - „das der Beweis schon angedeutet hat";
  - „Auf der Diagonalen steht also eine Wurzel …" (Dublette zum Stepper-Kasten);
  - der Erwartungswert-Satz vor dem Satz (Dublette zum `::why`; der
    `:k[Erwartungswert]{#expected-value}`-Link steht jetzt im `::why`);
  - „war kein Zufall", „Wie das Widget zeigt".
- **S55**: „Zum Abschluss stellen wir …", „Drei Punkte zum Merken:", die
  handgeschriebenen `#sec-5.x`-Links in der Tabelle, „die vielseitigste aller
  Matrixzerlegungen".

## 4. Reparierte Fehler

- **S55**, unklarer oder verdrehter Satz: „Ein Abbruch ist daher ein
  Diagnosehinweis, aber kein Beweis dafür, dass allein eine große Konditionszahl
  die Ursache war." Jetzt steht dort die Folienaussage: Der Abbruch ist ein
  Diagnosehinweis, entweder ist A nicht SPD oder numerisch an der Grenze.
- **S55**, fachlich falsch: „Kovarianz- und Gram-Matrizen tragen diese Struktur
  [SPD] von Haus aus". Richtig ist: stets positiv semidefinit, SPD bei vollem
  Rang (so jetzt im Text, passend zu S54).
- **S55**: „scheitert für Matrizen, die nicht positiv definit sind" →
  „bricht für jede symmetrische, nicht positiv definite Matrix ab".
- **S54**: Die PSD-Definition hatte keine Symmetrievoraussetzung, jetzt „ein
  symmetrisches A" (wie auf der Folie).
- **S54**: Die Aufzählung „SPD-Matrizen garantieren" war grammatisch uneinheitlich
  (Fragment, Fragment, ganzer Satz). Jetzt ist sie durchgängig.
- **24 handgeschriebene Links** (`?k=…#sec-…`, `#sec-5.x`, „Kapitel 2/4/7" als
  Linktext) sind auf `@sec:`/`@kap:` umgestellt oder als Dublette entfallen:
  S51 12, S52 2, S53 1, S54 4, S55 5.

## 5. Ermessensentscheidungen und offene Fragen

1. **Hilbert-Zahlen, Folie gegen Skript.** Die Folie (R/LAPACK) nennt einen
   maximalen Fehler von ≈ 0,3 über A⁻¹ gegen ≈ 3·10⁻⁴ direkt, also etwa
   1000-mal genauer. Skript und Widget (JavaScript, verifiziert in
   `REV29/05-lgs-S52Hilbert.mjs`) haben 3,73·10⁻¹ gegen 9,66·10⁻³, also etwa
   39-mal. Das Skript zeigt den R-Code, zitiert aber die JS-Zahlen. Ergänzt ist
   nur der Halbsatz „R rechnet mit LAPACK und kann andere Zahlen liefern". Die
   R-Werte sind **nicht nachgerechnet** (weder Rscript noch numpy im Container).
   Soll die Folienzahl zusätzlich ins Skript?
2. **Satz Cholesky erweitert.** `@satz:cholesky-zerlegung` sagt jetzt wie das
   Folien-Theorem „mit positiven Diagonaleinträgen; eindeutig". Vorher standen
   beide Aussagen nur in der Prosa danach. Die Eindeutigkeit wird in der
   Vertiefung mit dem Argument der Anhangsfolie bewiesen.
3. **Neue Selbsttestfrage** (S54) mit zwei Minimal-Gegenbeispielen, die nicht
   auf den Folien stehen: (1 2; 2 1) und −I₂. Sie sind nötig, um die
   Opener-Quizfolie ohne Behauptung „ins Blaue" aufzulösen.
4. **Auswertung im SpdRichtung-Kasten** nennt jetzt die Winkel 45° und 135°.
   Abgeleitet aus diag(1, −1): xᵀAx = cos 2θ, negativ strikt zwischen 45° und
   135°, null bei 45°.
5. **Kosten-Kasten S53** nennt zusätzlich den Grenzwert n/3 des
   Ersparnisfaktors. Er steht auch im Verdikt des Widgets `LUKosten.tsx`.
6. **Fremde Kapitel, nicht geändert:** `13-funktionsapproximation/S132.mdx:52`,
   `:214` und `S133.mdx:166` verweisen für „Kern" bzw. „invertierbar" auf
   `@sec:lgs/grundlagen`. Abschnitt 5.1 behandelt weder den Kern noch
   Invertierbarkeitskriterien; `@sec:lgs/lgs` oder das Pop-up `kernel` wären
   passender.
7. Nicht geprüft: der Literaturhinweis „zur Komplexitätsanalyse Heath §1.1"
   (S51).
8. Farbcode: Auf der Folie ist das Pivot blau, im Skript rot (Multiplikatoren
   blau). Die Skript-Konvention aus KONVENTIONEN (Kap. 5) bleibt.

## 6. Prüfungen (Endstand)

- `npm run typecheck:mdx`: ok (206 MDX-Dateien).
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen, nur das erwartete
  „Tabelle ist nicht aktuell".
- `npm run test:mdx`: ok (137/137 Fixtures, Orakel-Regressionstest bestanden).
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich. Die
  `\cbblue`-Zeile ist der bekannte Negativtest.
- Headless-MathJax (Kapitel-Variante von `k6-checkmath.mjs`, 187 Makros, ohne
  `noundefined`): 569 Literale, 0 Fehler, Negativtest `\foo` erkannt.
- `npm run lint:numbers`: keine Treffer in 05-lgs. Einziger Treffer im Repo:
  `09-tensoren/widgets/S95Vektorisierung.tsx:29` („Beispiel 9.5.4" im
  TSX-String), fremde Datei.
- Gedankenstriche im Kapitel: 0.
