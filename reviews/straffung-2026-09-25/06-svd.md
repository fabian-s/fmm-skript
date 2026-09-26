# Straffung Kapitel 6 (SVD), 2026-09-26

Dateien: `src/chapters/06-svd/S61.mdx` bis `S65.mdx`. Vorgänger-Stand: keine
Änderungen gegenüber 21b998d vorhanden, der Lauf hat bei null begonnen.

## 1. Zahlen (`zaehlen.mjs 06-svd`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S61 | 1646 → 1499 (−8,9 %) | 137 → 137 | 1783 → 1636 (−8,2 %) |
| S62 | 2903 → 2929 (+0,9 %) | 775 → 650 | 3678 → 3579 (−2,7 %) |
| S63 | 3036 → 2361 (−22,2 %) | 692 → 1131 | 3728 → 3492 (−6,3 %) |
| S64 | 2720 → 2636 (−3,1 %) | 759 → 527 | 3479 → 3163 (−9,1 %) |
| S65 | 1018 → 759 (−25,4 %) | 256 → 371 | 1274 → 1130 (−11,3 %) |
| **Summe** | **11 323 → 10 184 (−10,1 %)** | 2619 → 2816 | **13 942 → 13 000 (−6,8 %)** |

Der Haupttext liegt unter dem Richtwert (−15 bis −20 %). Grund: Rund 490 Wörter
Folienstoff (gezählte Folien) standen bisher in Vertiefungen oder fehlten ganz
und stehen jetzt im Haupttext (Liste in §5). Ohne diese Zugänge wäre der
Haupttext um rund 14 % gestrafft. Der Gesamtumfang sinkt im Zielkorridor
(5–10 %).

## 2. In Vertiefungen verlagert

- **S63, „Beweis der reduzierten Darstellung"**: der dreischrittige
  Blockmultiplikations-Beweis zu `satz:reduzierte-darstellung`. EXTRA, weil die
  Folie nur die Idee nennt („Spalten werden mit 0 multipliziert").
- **S63, „Die geschlossene Formel an der Beispielmatrix"**
  (`beispiel:pseudoinverse-der-beispielmatrix`): zweites durchgerechnetes
  Pseudoinversen-Beispiel. EXTRA, weil es auf keiner Folie steht und dieselbe
  Pointe hat wie das Rang-1-Beispiel. Die Bemerkung `voller-spaltenrang-eine-geschlossene`
  (A⁺ = (AᵀA)⁻¹Aᵀ) bleibt als Brücke zu Kap. 7 im Haupttext.
- **S63, „Eindeutigkeit der Pseudoinversen"**: den Spiegelstrich zur
  Wohldefiniertheit aus `bemerkung:zum-bau-der-pseudoinversen` in die schon
  vorhandene Vertiefung gezogen (vorher Aussage im Haupttext, Begründung in der
  Box). EXTRA, nicht auf den Folien.
- **S65, „Querverbindungen zu anderen Kapiteln"**: die beiden Spiegelstriche
  Normen und Matrixzerlegungen. EXTRA (Querbezüge, keine Folie). Der
  Schlusssatz „Wer die SVD einer Matrix kennt, …" bleibt im Haupttext.
- **S65, Auslöschungs-Satz** in die Vertiefung „Der Umweg über AᵀA an einem
  Beispiel" gezogen; Kondition, Rundungsfehler und die Faustregel √ε·σ₁ bleiben
  im Haupttext (Kap. 8 S82 verweist auf dieses Argument).

## 3. Gestrichen oder verdichtet

- S61 `bemerkung:wo-die-diagonalisierung-aufhoert`: wiederholte die beiden
  Absätze direkt davor; ihr dritter Punkt steht jetzt als ein Satz im Text.
  Einziger Verweis (Selbsttest S65) zeigt jetzt auf `@sec:motivation`.
- S64: Vertiefungs-Beweis zu `satz:spektralnorm-und-groesster-singulaerwert`
  (drei Schritte für zwei Gleichungen) durch die Zwei-Zeilen-Begründung der
  Folie im Haupttext ersetzt; Nachbetrachtung („sieht man gelegentlich als
  Definition …") gestrichen. σ₁ = ‖A‖₂ wurde vorher viermal gesagt, jetzt in S62
  als Vorverweis und in S64 als Satz.
- S62: Rückblick am Abschnittsanfang, „Zwei Eigenschaften machen AᵀA so
  nützlich …", Ankündigung vor dem Beispiel, Satz „Zum Wechsel zwischen (1) und
  (2)" (Dublette zu Satz und Selbsttest), die ausführliche κ₂-Herleitung im
  Singulärwert-Beispiel verdichtet, Doppelerklärung der Vorzeichenwahl.
- S63: Meta-Sätze („In diesem Abschnitt …", „Jetzt rechnen wir nach …", „Dem
  verkleinerten Ergebnis geben wir einen Namen", „Das gilt allgemein"),
  Rechenzeit-Punkt der Speicherbemerkung auf einen Satz (dritte Nennung der
  Schwelle r(m+n+1)), Motivationsabsatz der Pseudoinversen gestrafft,
  Selbsttestfrage „1000 × 50 vom Rang 5" (wiederholte Zahlen der Bemerkung
  wörtlich).
- S64: Abschnittsvorschau, Einleitung „So notiert verlangt sie einen Umweg …",
  Summenform-Nachbetrachtung, „Die Fehlerformeln sind leicht zu merken und
  sagen viel", Schlusssatz der Bildkompressions-Einleitung, „Die Robustheit hat
  ihren Preis".
- S65: Rückblick am Anfang, erster Absatz der Querverbindungen (wiederholte
  die fünf Kernkonzepte), Hinweis „als Vertiefung markiert", Quiz-Einleitungssatz.
- Deslop durchgehend: „entscheidende Beobachtung", „bequem", „harmlos",
  „nichts anderes als", „drastisch", „Bemerkenswert", „übrigens",
  „gewichtiger Einwand", „schlicht", „Vorsicht bei …", mehrfaches „gar nicht";
  Box-Titel „Bildkompression zum Schieben" → „Bildkompression mit der
  Rang-k-Approximation", „Wie der Umweg einen Singulärwert verschluckt" → „Der
  Umweg über AᵀA an einem Beispiel", „… und was danach kommt" → „Stärken,
  Schwächen und neuere Verfahren". Gedankenstriche im Kapitel: 0.
- Getippte Links ersetzt: `[Kapitel 5](?k=05-lgs…)`, `[Kapitel 3](…)`,
  `[Kapitel 7](?k=07-kq#sec-7.6)` (zweimal), `[Normen](…)`, `[LU](…)`,
  `[Cholesky](…)` sowie „Kapitel 3"/„dem dritten Kapitel" in Prosa → `@kap:`/`@sec:`.
  `lint:numbers` meldet für Kap. 6 nichts mehr.

## 4. Reparierte Fehler

- S63, Einleitung: „Hat A den Rang r < min(m, n), so besteht … Σ aus Nullen"
  war zu eng. Nullblöcke gibt es, sobald r < m oder r < n (etwa bei der
  3×2-Beispielmatrix mit vollem Rang). Jetzt so formuliert.
- S64, Selbsttest Eckart–Young: „Der einzige Minimierer ist A_k **deshalb**
  nicht" war ein Fehlschluss; jetzt „allerdings nicht".
- S64, Vergleichstabelle: Zeile „singuläre Matrizen: Eigenwert 0; ohne Basis
  aus Eigenvektoren gibt es die Zerlegung gar nicht" vermischte Singularität und
  Diagonalisierbarkeit. Jetzt wie auf der Folie: Zeile „Existenz: nur für
  diagonalisierbare Matrizen | immer, auch für singuläre".
- S64, Stärken-Box: „die (nichtnegative) Matrixfaktorisierung ist die
  bekannteste Variante" (unbelegt) → Folienaussage (NMF als Variante mit
  Nichtnegativitäts-Nebenbedingung).
- S63: der JSX-Span „rote" war mit `var(--w-text)` gar nicht rot gefärbt;
  Satz umformuliert, Span entfernt.

## 5. Ermessensentscheidungen und offene Fragen

In den Haupttext geholt, weil es auf gezählten Folien steht:

- S62, Beweis von `satz:eigenschaften-von-a-a` (Folie „Die Matrix AᵀA",
  „Beweis für (2)"): aus der Vertiefung genommen, Schritte gestrafft.
- S62, R-Live-Demo `svd(A)` (Folie „Live-Demo: SVD in R"): kurzer Codeblock
  mit Deutung (d = 3,087/1,212; Vorzeichen von u, v können abweichen).
  **Nicht in R nachgerechnet** (kein Rscript im Container); die Werte sind die
  von Hand berechneten Singulärwerte, zu den Vorzeichen wird nichts behauptet.
- S63, Konvention A⁺ = 0 für die Nullmatrix (Folie „Moore-Penrose
  Pseudoinverse", Bemerkung).
- S64, Ellenbogen-Heuristik als Satz im Haupttext (Folie „Wahl der optimalen
  Rang-k Approximation"); typische Verläufe bleiben Vertiefung (Anhangsfolie).
- S64, Bemerkung `rechenaufwand` aus der Vertiefung genommen (Folie „Wann ist
  SVD besonders nützlich?").
- S64, Frobenius-Fall des Nicht-Eindeutigkeitsbeispiels (nur b = 3 optimal,
  Fehler √((3−b)²+2²)), steht auf der Folie.
- S65, `irlba::svdr(A, k)` (randomisiert) in den Codeblock ergänzt (Folie
  „Zusammenfassung").
- Auswertungsprosa in Widget-Kästen ergänzt, wo sie fehlte (PDF-Platzhalter):
  S62 Rechner (σ₂ = 0 bei abhängigen Spalten), S62 Geometrie (Σ bestimmt die
  Form, U nur die Lage), S64 Rang-k-Explorer; im Empfehlungs-Kasten ist der
  Einwand „Schritt 1 erfindet Daten" jetzt die Auswertung im Kasten.

Weitere Punkte:

- Die Opener-Quizfragen der Folien (symmetrische Matrix orthogonal
  diagonalisierbar; Rang der Matrix (1 1; 1 1; 0 0)) stehen nicht wörtlich als
  Selbsttest im Skript; inhaltlich decken sie S61 (Selbsttest) und das
  Rang-1-Beispiel in S62 ab. Nicht ergänzt.
- S62 bleibt mit +0,9 % Haupttext praktisch gleich lang: Er ist fast
  vollständig Folienstoff (zwei durchgerechnete Folienbeispiele, Hauptsatz,
  Merkregel).
- Prüfscript-Kommentare in `scripts/verify/REV29/06-svd-Widgets.mjs` nennen
  Zeilennummern („Zahlfrage S62.mdx:729", „S64.mdx:572/585"). Die Zahlen sind
  unverändert, die Zeilennummern sind jetzt veraltet. Nicht angefasst (fremde
  Datei).

## 6. Prüfungen (Endstand)

- `npm run typecheck:mdx`: 206 MDX-Dateien, ok.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER (nur „Tabelle ist nicht
  aktuell", erwartet).
- `npm run test:mdx`: 137/137 Fixtures bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich.
- `npm run lint:numbers`: keine Treffer in Kap. 6.
- Headless-MathJax über alle Literale von S61–S65 (Skript
  `scratchpad/k6/k6-checkmath.mjs`, `noundefined` aus, Negativtest greift):
  1156 Literale, 0 Fehler.
