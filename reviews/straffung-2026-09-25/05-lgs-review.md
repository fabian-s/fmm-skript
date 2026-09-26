# Gutachten Straffung Kap. 5 (05-lgs), 2026-09-26

Geprüft: Diff `21b998d..` für S51–S55, alle fünf Dateien im neuen Stand
vollständig gelesen (auch im Zuklapp-Modus), Foliensatz
`slides-2627/slides/05-lgs.qmd` vollständig, Bericht `05-lgs.md`, alle
Widget-TSX des Kapitels, Klausur-Gegenprobe (WS25/26-1 Nullpivot (0 1; 1 1),
WS25/26-2 LDLᵀ-Lösen, `questions/lgs/aufgabe1.tex` exakte Flop-Zahl n²).

## 1. Endzahlen (`zaehlen.mjs 05-lgs`)

| | vorher (21b998d) | nach Editor | nach Review |
| --- | ---: | ---: | ---: |
| Haupttext | 6308 | 6517 (+3,3 %) | 6546 (+3,8 %) |
| Vertiefung | 1515 | 929 | 929 |
| gesamt | 7823 | 7446 (−4,8 %) | 7475 (−4,4 %) |

Der Richtwert (−5 bis −10 % Haupttext) ist verfehlt, die Begründung des
Editors trägt aber: Strassen-Folie, Hilbert-Demo, Komplexitätssumme mit
Kosten-Kasten und die L_k⁻¹-Aussage stehen auf **gezählten** Folien und lagen
vorher in Vertiefungen; der R-Chunk der Cholesky-Demo und die Opener-Quizfrage 2
fehlten ganz. Ohne diese rund 730 Wörter Kern ist der alte Haupttext um rund
8 % geschrumpft. Ich habe jeden dieser Posten gegen die Folie geprüft: alle Kern.
Eine weitere Kürzung hätte nur noch Folienstoff getroffen; ich habe nicht
nachgelegt. Meine Korrekturen kosten +29 Wörter.

## 2. Eigene Änderungen (8)

1. **S51, Bemerkung „Warum wir trotzdem mit O(nmk) rechnen":** „meist"
   wiederhergestellt („sind diese Konstanten meist so groß"). Die Straffung hatte
   die Einschränkung der Folie gestrichen; ohne sie wird die Aussage
   pauschal.
2. **S51, Quiz Addition O(n²m²):** „kein Eintrag trifft einen anderen" war
   wörtlich falsch (a_ij trifft b_ij) → „Einträge an verschiedenen Positionen
   treffen nie aufeinander".
3. **S52, Hilbert-Beispiel:** Folienzahl ergänzt: „für n = 11 ist
   κ₂(H₁₁) ≈ 5·10¹⁴" (Folie: κ₂ ≈ 10¹⁴). Nachgerechnet mit exakter
   Hilbert-Inverse (Binomialformel, in `fractions` gegen H·H⁻¹ = I geprüft) und
   Potenzmethode: 5,23·10¹⁴. Das Beispiel sagte vorher nur „sehr schlecht
   konditioniert" und hatte keine Zahl.
4. **S52, Kasten „Rückwärtseinsetzen":** „Zählen wir beim Durchschieben die
   Divisionen" → „Zählen wir dabei die Divisionen" (Wortwahl).
5. **S53, „Elimination als Zerlegung":** „lässt sich in zwei Faktoren
   verbuchen" → „halten zwei Faktoren fest" (Buchhaltungsmetapher; „Buchhalterisch"
   hatte der Editor an anderer Stelle schon gestrichen).
6. **S53, „Ein vollständiges Beispiel":** Satzfragment „Farbcode: Pivots rot, …"
   direkt unter der Überschrift → „Wir rechnen im Farbcode des Kapitels: …".
7. **S53, Kosten-Kasten:** „läuft der Ersparnisfaktor gegen n/3" → „gegen rund
   n/3". Der exakte Grenzwert von J(n³/3 + n²)/(n³/3 + Jn²) ist n/3 + 1; das
   Widget-Verdikt schreibt selbst „≈ n/3".
8. **S54, Kasten „Welche Richtung widerlegt positive Definitheit?":** Die neue
   Auswertung nannte nur den Bereich 45°–135° und nur die Nullrichtung 45°. Der
   Regler in `SpdRichtung.tsx` läuft über 0–360°, und q = cos 2θ ist auch
   zwischen 225° und 315° negativ und auch bei 135°, 225° und 315° null. Jetzt
   stehen beide Bereiche und alle vier Nullrichtungen da. Außerdem heißt
   Abschnitt und Einleitungssatz jetzt „SPD- und PSD-Matrizen in Statistik und
   ML" (wie die Folie): Die Liste sagt selbst, dass Kovarianz- und Gram-Matrizen
   im Allgemeinen nur PSD sind.

## 3. Geprüft und in Ordnung

- **Haupttext-Vollständigkeit gegen die Folien:** jede gezählte Folie
  (Vorkenntnisse, Opener-Quiz 1+2, Matrizenrechnung + beide Quizfolien,
  Strassen, LGS/„Invertiere niemals" + Demo, Gauß + Rückwärtssubstitution +
  Quiz, Warum Zerlegungen, Intuition LU, L_k, L_k⁻¹ und L, 3×3-Beispiel,
  LU-Theorem, Lösen-Beispiel, Pivotierung, Quiz k-ter Schritt, Komplexität,
  SPD/PSD, SPD in Statistik, Cholesky-Theorem, 2×2-Beispiel, Kovarianz unter L,
  Demo-Chunk, Vergleich LU/Cholesky, Wrap-up, Self-Check 1–3) findet sich im
  Haupttext. Die drei Vertiefungen (Beweis der Produktformel für L,
  Induktionsbeweis Cholesky, pivotierte Cholesky) sind EXTRA bzw. Anhangsfolien.
- **Zuklapp-Test:** Keine Vertiefung definiert eine ID; der Haupttext benutzt
  keine Symbole aus den Beweisen (l_k, a, c, B, L̃). S55 nennt die pivotierte
  Variante PᵀAP = LLᵀ, das deckt die gezählte Vergleichsfolie ab, die Formel
  steht dort selbst.
- **Sinn der Kürzungen:** Alle geänderten Stellen mit dem alten Stand
  verglichen. Neu formulierte Aussagen stimmen: L_k⁻¹ mit umgekehrten
  Vorzeichen; Eindeutigkeit der Cholesky-Zerlegung über l₁₁ = √a,
  l = c/√a und die Induktionsvoraussetzung; „Radikanden sind die Quadrate der
  positiven l_jj"; SPD-Charakterisierung der Kovarianz (keine Linearkombination
  fast sicher konstant); neue Selbsttestfrage (1 2; 2 1) mit x = (1, −1)ᵀ ergibt
  −2, det(−I₂) = 1; Hilbert-Kasten (Schwelle n = 9 und „Inversenweg nie
  genauer" prüft `REV29/05-lgs-S52Hilbert.mjs`).
- **Übereifer:** Gestrichen wurden nur Dubletten (Merkregel = Algorithmus),
  Relikte alter Folienfehler (L_n, „Zum Quantor") und Meta-Sätze. Nichts davon
  gehört in eine Vertiefung. Keine Mini-Boxen.
- **Untereifer:** Tell-Regex aus german-tells.md: 0 Treffer. Gedankenstriche:
  0. Du-Imperative: nur „Wähle" im Algorithmus (erlaubt). Getippte
  Kapitelnummern/`?k=`/`#sec-`: 0.
- **IDs:** entfernt wurden nur `kondition-der-grundoperationen` und
  `merkregel-ein-lgs-zwei-dreieckssysteme`; beide kommen repo-weit nur noch in
  der generierten Nummerntabelle vor. Alle `:k[…]{#id}`-Links unverändert
  (gleiche Anzahl je id). Neue `@sec:`-Ziele zeigen auf dieselben Abschnitte
  wie die alten `?k=`-Links (2.1, 2.3, 2.4, 3.2, 3.3, 4.2, 4.3, 7.3).
  Fremdverweise auf Kap. 5 (`@sec:lgs/…`, `@bemerkung:struktur-ausnutzen`,
  TSX-`ref()`/`num()`) finden ihr Ziel und den erwarteten Inhalt (S108/S112:
  Cholesky scheitert bei nicht-PD, steht in S54/S55).
- **Klausur-Gegenprobe:** alle drei Punkte im Haupttext (exakt n² Operationen
  im S52-Quiz, Nullpivot/Pivotierung in S53/S55, Lösen über Dreieckssysteme +
  Diagonale in S53/S52).

## 4. Restpunkte und Fragen an den Dozenten

1. **Hilbert-Zahlen (offen, wie im Editor-Bericht):** Die Folie nennt für R
   ≈ 0,3 gegen ≈ 3·10⁻⁴ (Faktor ≈ 1000), das Skript zitiert die JS-Werte
   0,373 gegen 9,66·10⁻³ (Faktor 38,6). Mit numpy (OpenBLAS-LAPACK, gleicher
   Code) erhalte ich 0,199 gegen 2,37·10⁻³ (Faktor 84). Die Zahlen hängen also
   stark an der LAPACK/BLAS-Implementierung; die R-Folienzahlen ließen sich
   hier nicht nachrechnen (kein Rscript). Ich habe sie nicht ins Skript
   übernommen. Der Hinweis „R rechnet mit LAPACK und kann andere Zahlen
   liefern" deckt das ab; soll die Folie ggf. „ca. 1000×" abschwächen?
2. **`CholeskyStepper.tsx` (TSX, nicht angefasst), fachlich zu stark:** Bei
   exakt 0 unter der Wurzel meldet das Widget „Die Matrix ist positiv
   semidefinit, aber nicht positiv definit". Das folgt nicht: (0 1; 1 0) liefert
   im ersten Schritt ebenfalls 0 und ist indefinit. Richtig wäre „kann positiv
   semidefinit sein" (so formuliert es auch die Selbsttestfrage in S54).
3. **S53, Kosten-Kasten, Doppelfrage:** `LUKosten.tsx` enthält eine
   Schaetzfrage („Bei wie vielen rechten Seiten lohnt sich das einmalige
   Zerlegen?", Lösung 2), die MDX-`zahlfrage` im selben Kasten fragt dasselbe.
   Im Web doppelt, im PDF (Widget = Platzhalter) trägt nur die zahlfrage.
   Vorbestand, nicht geändert; ggf. zahlfrage streichen, wenn das PDF die
   Schaetzfrage aus dem TSX nicht braucht.
4. **Literaturhinweis S51 „zur Komplexitätsanalyse Heath §1.1":** Heath §1.1
   ist die allgemeine Einführung; Operationszählung steht in Heath „Notation"
   (S. xx) und §2.4.7 „Complexity of Solving Linear Systems" (im
   Heath-Volltext geprüft). Kap. 2 zitiert §1.1 ebenso; nicht geändert.
5. **Fremde Kapitel (vom Editor gemeldet, bestätigt):** `13-…/S132.mdx:52,
   :214` und `S133.mdx:166` verweisen für „Kern"/„invertierbar" auf
   `@sec:lgs/grundlagen`, das beides nicht behandelt.
6. Kommentar in `scripts/verify/REV29/05-lgs-S52Hilbert.mjs` nennt
   „S52.mdx:66-72"; die Zahlen stehen jetzt in Z. 65–71. Prüft nichts in MDX,
   bricht nicht; fremde Datei, nicht geändert.

## 5. Prüfergebnis (Endstand)

- `npm run typecheck:mdx`: ok (206 Dateien).
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen, nur „Tabelle ist
  nicht aktuell".
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich (die
  `\cbblue`-Zeile ist der bekannte Negativtest).
- Headless-MathJax (Kapitelvariante, 187 Makros, ohne `noundefined`): 576
  Literale, 0 Fehler, Negativtest `\foo` erkannt.
- `npm run lint:numbers`: keine Treffer in 05-lgs.
- Fehler in fremden Dateien: keine aufgetreten.
