# Gutachten Straffung Kapitel 9 (tensoren): S91–S95

Stand 2026-09-26. Geprüft: Diff `21b998d..` für `src/chapters/09-tensoren`, alle fünf
Dateien im neuen Stand vollständig, Folien `slides-2627/slides/09-tensoren.qmd`,
Editor-Bericht `09-tensoren.md`, Klausuren WS25/26 (Kronecker-Rechnung, „Dimension“ des
Tensorprodukts, Tensornorm).

Vorbemerkung: Zwischen dem Editor-Bericht (382ff88) und 4dd1da4 liegen schon Änderungen
eines früheren, abgebrochenen Review-Laufs ohne eigenen Bericht (LESSONS-Zeile „Review
Kap. 9“): Feature-Map-Halbsatz (S92), Q/K/V/d_k im Haupttext (S93), R^{6×8} in der
Kronecker-Quizantwort, Folien-Self-Check 1 als `zahlfrage` (265), Titel „Stufe und Anordnung
der Einträge“, B̃_k in der Designmatrix-Bemerkung, Satztitel „…, vec-Trick“. Ich habe sie
mitgeprüft und belassen; sie sind fachlich richtig und schließen echte Lücken.

## 1. Eigene Änderungen (je mit Grund)

1. **S94, Haupttext nach @definition:tensorprodukt-von-vektorraeumen:** zwei Sätze
   ergänzt: Nicht jede bilineare Abbildung taugt als ⊗ (Nullabbildung → Nullraum), gemeint
   ist ein ⊗ mit universeller Eigenschaft (Vertiefung), die die Beispiele erfüllen. Grund:
   Die Editoren haben die universelle Eigenschaft aus der Definition in die Vertiefung
   verschoben. Damit war @satz:tensorproduktbasis im Haupttext für ein beliebiges
   bilineares ⊗ falsch (lineare Unabhängigkeit bricht). Die Vertiefung beginnt jetzt mit
   der Aussage der Eigenschaft; der doppelte Nullabbildungs-Satz dort ist auf einen
   Halbsatz gekürzt.
2. **S94, @bemerkung:kronecker-designmatrix-tensorprodukt-splines:** den R-Chunk der
   gezählten Folie „Tensorprodukt-Splines – Designmatrix“ übernommen (`bs(x, df = 6)`,
   `kronecker(By, Bx)`, `dim(B)  # 2500 Gitterpunkte, 6*6 Koeffizienten`). Folien-Kern,
   stand nie im Skript. Nicht mit R ausgeführt (kein Rscript); das Format folgt aus
   50·50 × 6·6.
3. **S93, @bemerkung:inneres-und-aeusseres-produkt:** „die langen Dimensionen“ → „die
   beiden Längen … ergeben das Format m × n“. Grund: Das Kapitel trennt in S92 ausdrücklich
   Indexposition, Format und Dimension; „Dimension“ für eine Formatangabe widersprach dem
   zwei Seiten später.
4. **S93, Vertiefung „Empirische Kovarianz und Attention“:** Voraussetzung x ≠ μ ergänzt;
   @satz:eigenschaften-des-aeusseren-produkts gilt nur für Faktoren ≠ 0.
5. **S92, @bemerkung:stufe-und-dimension-sind-zwei:** „Für Matrizen ist es die spaltenweise
   Vektorisierung“ → „Zählen wir bei einer Matrix Spalte für Spalte, ist das die
   Vektorisierung …“. Grund: reshape ist nur bei spaltenweiser Reihenfolge gleich vec.
6. **S92, Bemerkung Stufe/Menge:** Kommaspleiß → Doppelpunkt („… an: Zu jedem Indextupel …“).
7. **S91, Rechteck-Kasten:** Kommaspleiß mit elliptischem „zweimal“ → Semikolon und
   vollständiger Satz.
8. **Titel (IDs unverändert):** „Bilinear, und eine Warnung“ → „Bilinearität und
   Linearität“; „Allgemeine Dimension, und was sie kostet“ → „Allgemeine Dimension und Fluch
   der Dimensionalität“. Grund: Titel-Tic „X, und …“ (zusammen mit „Was die Annahme spart
   und was sie kostet“ dreimal „kostet“); `grep` nach Titeltext in `src/`, `scripts/`: keine
   Verweise.
9. **S95, Selbsttest (d+1)^k:** Antwort wiederholte den Gesamtgrad-Vergleich (286) aus
   @bemerkung:allgemeine-dimension-und-was-sie-kostet wörtlich; auf die Zahl 4^10 und den
   Verweis gekürzt.
10. **S95, „Wie es weitergeht“:** Der erste Absatz wiederholte Punkt 6 der Zusammenfassung
    (univariate Basen → multivariate Basis); zu einem Satz mit dem Verweis auf
    @kap:funktionsapproximation zusammengezogen.

## 2. Geprüft und für richtig befunden

- **Zuklapp-Lesetest** (Skript blendet Vertiefungen per Fence-Regex aus und gleicht
  `@typ:id` gegen die in Vertiefungen definierten IDs ab): einziger Treffer
  `@eq:elementarer-tensor-in-produktbasis` in @bemerkung:eine-feinheit (S94); die
  Bemerkung nennt die Produktform c_ij = a_i b_j selbst, der Verweis zeigt nur auf die
  Herleitung. Keine Haupttext-Stelle braucht einen Begriff, der nur in einer Vertiefung
  steht (geprüft: elementare Tensoren, Einheitstensoren, Rang-1-Tensor, Feature-Map,
  Q/K/V, vec-Trick).
- **Folien-Abdeckung**, Folie für Folie: alle gezählten Definitionen, Sätze, Beispiele,
  Quiz- und Self-Check-Fragen stehen im Haupttext. Die Kronecker-Quizfrage 1 (Format
  R^{6×8}) steckt nur in der Antwort einer anderen Frage (S93), nicht als eigene Frage.
- **Selbsttests:** alle 29 Haupttext-Fragen aus dem Haupttext lösbar; die zwei
  Feature-Map-Fragen stehen mit ihrem Stoff in der Vertiefung.
- **Übereifer:** Gestrichenes (Positionsformel in S ⊗_K I_n, „Die Struktur von B wiederholt
  sich …“, SVD-Grenze ab Stufe 3 auf einen Satz, Schlussabsatz S94) ist redundant oder in
  S95 erhalten. Die Verlagerungen (empirische Kovarianz, Kronecker zweier Vektoren,
  universelle Eigenschaft, Erzeugendensystem-Beweis, „Große Systeme“) sind EXTRA; die
  Boxen haben 94–733 Wörter, keine Mini-Boxen.
- **Rechnungen nachgeprüft:** vec-Beispiel (5, 2, 17, 8), vertauschte Fassung
  (1, 17, 0, 6); Kovarianz-Eigenwerte 4,5/2,7/0,5/0,3, Spur 8, Determinante 1,8225;
  Parameterzahlen 125 250/1 330 und 265/264; Kovarianz-Verschiebungsformel.
- **Deslop-Regex** aus `german-tells.md` über S91–S95: 0 Treffer; Gedankenstriche 0;
  alle „genau“ sind „genau dann/genau eine“.
- **Widget-Kästen** gegen die TSX gelesen (S91 Schätzfrage-Auflösung erst nach dem Widget,
  S93 Kronecker `Bᵀ ⊗_K A`/Tausch-Knopf, S93 Kovarianz, S94 Höhenlinien): Prosa passt.

## 3. Restpunkte und Fragen für den Dozenten

1. **Richtwert:** Haupttext −13,6 % statt −15 bis −20 %. Nach den Editoren lag das Kapitel
   bei −15,0 %; der frühere Review-Lauf und dieses Gutachten haben Folien-Kern und eine
   fachlich nötige Voraussetzung ergänzt (zusammen etwa +160 Wörter). Im Haupttext steht
   kein EXTRA-Block mehr über ~60 Wörter. Kürzbar wären auf Wunsch noch: der
   Korrelationsabsatz in @beispiel:zwei-orte-zwei-zeitpunkte, der Tensorrang-Satz am Ende
   von @beispiel:tensorprodukt-dreier-vektoren, der Speicher-Hinweis in der
   Designmatrix-Bemerkung, das Wetterfeld-Beispiel. Ich habe sie gelassen, weil jede davon
   einen Punkt trägt, den die Folie nur andeutet.
2. **Struktur (vom Editor übernommen):** Der vec-Trick steht in S95 (Zusammenfassung), wird
   aber in S93 (Kronecker-Kasten) und S94 (Designmatrix) schon benutzt. Ein Umzug nach S93
   bräuchte Registry- und Nummernänderungen.
3. **S94-Beispiel** f = 2 + 3x − y + 5xy weicht von der Folie (2 − x + 3y + 5xy) ab; Widget-Preset
   und Prüfscript hängen daran. Kein Fehler.
4. **Veraltete Nummern in Kommentaren (nicht mein Auftrag):** `widgets/S93Kronecker.tsx`
   Z. 10 und der Kap.-9-Abschnitt in `KONVENTIONEN.md` nennen „Definition 9.3.12“, die
   Tabelle hat 9.3.11. `lint:numbers` meldet weiter den Preset-Namen „Beispiel 9.5.4“ in
   `widgets/S95Vektorisierung.tsx:29` (stimmt noch).
5. `numbers.generated.*` ist wegen der entfallenen @bemerkung:das-vierfache-geometrisch-gelesen
   (Editoren; ID nur noch in den generierten Dateien) neu zu erzeugen.

## 4. Endzahlen (`zaehlen.mjs 09-tensoren`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S91 | 1 660 → 1 394 (−16,0 %) | 136 → 135 | 1 796 → 1 529 (−14,9 %) |
| S92 | 1 809 → 1 607 (−11,2 %) | 986 → 918 | 2 795 → 2 525 (−9,7 %) |
| S93 | 3 979 → 3 541 (−11,0 %) | 762 → 897 | 4 741 → 4 438 (−6,4 %) |
| S94 | 2 595 → 2 285 (−11,9 %) | 520 → 627 | 3 115 → 2 912 (−6,5 %) |
| S95 | 1 578 → 1 214 (−23,1 %) | 166 → 274 | 1 744 → 1 488 (−14,7 %) |
| Kapitel | 11 621 → 10 041 (−13,6 %) | 2 570 → 2 851 | 14 191 → 12 892 (−9,2 %) |

Vor diesem Gutachten (Stand 4dd1da4): Haupttext 9 967, Vertiefung 2 865, gesamt 12 832.

## 5. Prüfergebnis

- `npm run typecheck:mdx`: grün, 206 Dateien.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen, nur „Tabelle ist nicht aktuell“.
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte; KAP09 und REV29-09 alle bestätigt (die
  „\cbblue … FEHLER“-Zeile ist der bekannte Negativtest).
- Headless-MathJax (187 Makros, `noundefined` abgeschaltet, Negativtest `\foo` greift):
  1 056 Literale in S91–S95, 0 Fehler.
- IDs, `{#eq-…}`, `:id[…]`, `:k[…]{#id}` gegen 21b998d: nur
  `das-vierfache-geometrisch-gelesen` entfällt (Editoren), global nur noch in
  `numbers.generated.*`. Widget-`ref()`-Ziele (`satz:vektorisierung-eines-matrixprodukts`)
  vorhanden. Fence-Stufen korrekt, Titel ohne Mathe und Markup.
