# Gutachten Straffung Kapitel 6 (SVD), 2026-09-26

Geprüft: `git diff 21b998d -- src/chapters/06-svd`, alle fünf Dateien im neuen
Zustand vollständig (Haupttext und Vertiefungen), Foliensatz
`slides-2627/slides/06-svd.qmd` Folie für Folie, Klausur-Gegenprobe
(`exams/ws2526-klausur-1`, `konzeptfragen-entwurf.qmd`, `questions/lgs/aufgabe2.tex`).
Meine Änderungen sind genau `git diff HEAD -- src/chapters/06-svd`
(HEAD = WIP-Commit 4dd1da4 mit dem Editor-Stand).

## 1. Gesamturteil

Der Durchgang ist sauber. Kein Fachfehler eingeführt, keine ID verloren, die
vier vom Editor gemeldeten Fachkorrekturen (Rangbedingung für Nullblöcke,
„deshalb" → „allerdings" im Eckart-Young-Quiz, Tabellenzeile „Existenz", NMF)
stimmen. Die Rückholung von Folienstoff aus Vertiefungen (AᵀA-Beweis,
Rechenaufwand, Ellenbogen, Frobenius-Fall, R-Demo, A⁺ = 0) ist richtig und
erklärt den Richtwert (siehe §4). Übereifer habe ich nicht gefunden: Alles
Gestrichene war Dublette, Meta-Satz oder Rückblick; die beiden gestrichenen
Stücke mit Inhalt (Bemerkung „Wo die Diagonalisierung aufhört", Selbsttest
„1000 × 50 vom Rang 5") wiederholten nur, was direkt davor im Text bzw. in
der Bemerkung steht.

## 2. Meine Korrekturen (8)

1. **S61, Selbsttest: Opener-Quiz Frage 1 ergänzt** (neue `:::frage{wahr}`:
   symmetrisch ⇒ `A = QDQᵀ` mit reellem D; Eigenwerte dürfen negativ, null
   oder mehrfach sein, Beispiel `I`). Grund: gezählte Quizfolie „Opener-Quiz"
   (Lösung im HTML-Kommentar), im Kapitel bisher nur die Umkehrung
   („jede quadratische Matrix orthogonal diagonalisierbar", falsch). Frage 2
   (Rang von (1 1; 1 1; 0 0)) deckt @beispiel:alle-unterraeume-einer-rang-1-matrix
   mit genau dieser Matrix ab; nicht ergänzt.
2. **S62, R-Demo:** Leitsatz „In R lässt sich die Handrechnung prüfen:" →
   „Stimmt die Handrechnung? Was liefert `svd(A)` in R?" Grund: Die Folie
   stellt hier eine Vorhersagefrage; sie gehört als ein Satz vor die Auflösung.
3. **S62, Bemerkung `singulaerwerte-sind-streckungsfaktoren`:** Beim Fall
   m < n hatte die Straffung den Bezug „in der erweiterten Konvention ist das
   σₙ = 0" gestrichen; ohne ihn ist σₙ für m < n im Punkt davor gar nicht
   erklärt. Als Halbsatz mit Verweis auf den letzten Punkt der Liste
   wiederhergestellt.
4. **S62, Beispiel `die-gestalt-von`:** „Die dritte [Spalte] ergänzen wir … zu
   einer Orthonormalbasis" war schief (ergänzt werden u₁, u₂, nicht die dritte
   Spalte). Jetzt: „Die dritte ergänzt u₁, u₂ wie in … zu einer
   Orthonormalbasis des ℝ³".
5. **S62, Merkregel:** „Ist r < n, drückt A also Richtungen auf null, so wird
   daraus …" (Konditionalsatz mit eingeschobenem „also", holpert) →
   „Drückt A Richtungen auf null, ist also r < n, so wird daraus …".
6. **S63, Auswertung im Kasten „Welche Blöcke fallen weg?":** „Bei r = 1 fällt
   der Speicherbedarf unter den der Matrix selbst" gilt nur für das Preset
   (5 × 4: 10 < 20), nicht für alle Reglerstellungen (m = n = 2, r = 1: 5 > 4).
   Jetzt „Im Preset r = 1 … im Preset r = m = n …" (TSX-Presets geprüft; bei
   4 × 4 × 4 sind es 36 = 36, „schrumpft nichts" stimmt).
7. **S64, Einleitung Summenform:** „verpackt alles in drei Matrizen …
   Darstellung, die für Anwendungen handlicher ist" (Vorgeplänkel) auf einen
   Satz gestrafft, Inhalt (Nullen außerhalb der Diagonalen ⇒ ein Term je
   σᵢ > 0) unverändert.
8. **S65, Vertiefung „Der Umweg über AᵀA an einem Beispiel":** Der
   verlagerte Einleitungssatz begann bezugslos mit „Nach dem Aufstellen …";
   jetzt „Ist AᵀA erst aufgestellt, …" und „Rundungsverlust" statt „Verlust".

## 3. Geprüft, ohne Änderung

- **Zuklapp-Lesetest** (Vertiefungen per Fence-Regex ausgeblendet): kein
  `@typ:id` im Haupttext zeigt in eine Vertiefung; Vertiefungs-IDs:
  `pseudoinverse-der-beispielmatrix`, `typische-singulaerwert-verlaeufe-und-der`,
  `staerken-schwaechen-ausblick` (nur aus S64Empfehlung.tsx per `ref()`,
  klappt die Box auf), `der-umweg-ueber-a-a`. Keine Definition oder
  Bezeichnung des Haupttexts lebt nur in einer Vertiefung; „Auslöschung" steht
  seit der Verlagerung nur noch in der Box und wird im Haupttext nicht mehr
  benutzt.
- **Folienabdeckung:** Jede gezählte Folie hat ihre Entsprechung im
  Haupttext (Vorkenntnisse, Diagonalisierung limitiert, Was wir wollen,
  Geometrie inkl. ℝ³ → ℝ², Grundidee + Notation, AᵀA mit Beweis (2), beide
  Beispiele, Singulärwerte/-vektoren mit Beispielen, R-Demo, Fundamentalräume
  + Rechenbeispiel (1)/(2), Hauptsatz, Struktur von Σ, Drehen-Strecken-Drehen,
  reduzierte SVD mit Vorteilen, Pseudoinverse mit Bemerkung A⁺ = 0,
  Eigenschaften mit „Warum Projektion?" und Spezialfällen, Spektralnorm,
  Summenform, Eckart–Young inkl. Nicht-Eindeutigkeit, drei k-Kriterien +
  Ellenbogen, Bildkompression 659 × 512 / 58 600 / 83 %, Empfehlungssysteme mit
  Deutung der Faktoren, „Wann nützlich" + Rechenaufwand, Vergleichstabelle,
  Zusammenfassung mit Golub–Reinsch/`irlba`/`svdr`, Self-Check). Anhangsfolien
  (Orthogonalitätsbeweis, Beweisskizze, Singulärwert-Verläufe,
  Empfehlungs-Details) stehen in Vertiefungen, die vollständige
  Singulärvektor-Rechnung im Haupttext (sie steckt fast ganz in der gezählten
  Beispielfolie).
- **Klausur-Gegenprobe:** WS 25/26-1 c) (Bildkompression, Speicher
  mk + nk + k) und Konzeptfrage κ₂(AᵀA) = κ₂(A)² stehen im Haupttext
  (S64 Beispiel/Algorithmus, S65 Praktische Hinweise).
- **Selbsttests:** alle aus dem Haupttext lösbar; die Quizfrage zu langsam
  abfallenden Spektren steht mit ihrem Stoff in der Vertiefung.
  Widget-Presets der Zahlfragen („Strecken und Stauchen", 5 × 4 × 2, Ada /
  „Sternenstaub", A = (1 1; 1 1), b = (1, 5)) im TSX nachgesehen.
- **Neue Auswertungsprosa des Editors** in den Kästen S62-Rechner,
  S62-Geometrie, S64-Rang-k, S64-Empfehlung gegen Widget-Code und
  Statustexte geprüft: stimmt (Preset „zwei gleiche Spalten" = (1 1; 1 1),
  σ₂ = 0 → Strecke; Statustext S62Rechner Z. 321).
- **R-Demo S62:** d = 3,087253 / 1,211970 analytisch aus λ = (11 ± √65)/2
  nachgerechnet (node); kein Rscript im Container, die Vorzeichen von u, v
  werden bewusst nicht behauptet.
- **IDs:** Einzige entfernte ID `bemerkung:wo-die-diagonalisierung-aufhoert`;
  global gegrept (src/, scripts/): nur noch in `numbers.generated.*`. Der
  frühere Verweis im S65-Selbsttest zeigt jetzt auf `@sec:motivation`.
  Externe Verweise auf Kap.-6-Umgebungen (S82, S93, S94: Eckart–Young,
  Hauptsatz, Summenform) zeigen alle in den Haupttext; S82 „warum das
  numerisch klüger ist, steht in @sec:svd/anwendungen" findet dort den
  Absatz „Punkt 4 und Punkt 5 haben denselben Kern" im Haupttext.
- **Deslop:** Grep-Regex aus `german-tells.md` über S61–S65: 0 Treffer.
  Erweiterte Suche (sogar, überhaupt, gar nicht, wirklich, man …) nur
  unauffällige Einzelfälle. Gedankenstriche: 0 in allen fünf Dateien.
  `lint:numbers`: keine Treffer in Kap. 6. Titel ohne Mathe/Markup.
- **Fence-Stufen:** alle Vertiefungen korrekt geschachtelt (`:::::vertiefung`
  > `::::beweis` > `:::schritt`; `::::vertiefung` um einzelne
  `:::beispiel`/`:::bemerkung`; `:::vertiefung` nur um eine Liste).
  14 Vertiefungen, kleinste 86 Wörter („Querverbindungen"), keine Mini-Boxen.

## 4. Zahlen (`zaehlen.mjs 06-svd`, Endstand)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S61 | 1646 → 1554 (−5,6 %) | 137 → 137 | 1783 → 1691 (−5,2 %) |
| S62 | 2903 → 2944 (+1,4 %) | 775 → 650 | 3678 → 3594 (−2,3 %) |
| S63 | 3036 → 2363 (−22,2 %) | 692 → 1131 | 3728 → 3494 (−6,3 %) |
| S64 | 2720 → 2620 (−3,7 %) | 759 → 527 | 3479 → 3147 (−9,5 %) |
| S65 | 1018 → 759 (−25,4 %) | 256 → 372 | 1274 → 1131 (−11,2 %) |
| **Summe** | **11 323 → 10 240 (−9,6 %)** | 2619 → 2817 | **13 942 → 13 057 (−6,3 %)** |

Vor meinem Review: Haupttext 10 184 (−10,1 %), gesamt 13 000 (−6,8 %). Die
Differenz (+56 Wörter) ist fast ganz die ergänzte Opener-Quizfrage.

Der Richtwert (−15 bis −20 %) ist verfehlt. Ich halte das für begründet und
habe nicht nachgelegt: Rund 490 Wörter gezählter Folienstoff standen vorher
in Vertiefungen oder fehlten und stehen jetzt im Haupttext; S62 und S64 sind
danach fast reiner Folienstoff (durchgerechnete Folienbeispiele, Sätze,
Tabellen). Weitere Kürzungen gingen an BRÜCKE-Material, das Selbsttests oder
Nachbarkapitel brauchen (κ₂-Deutung im Singulärwert-Beispiel,
u₃ = (1, −2, 3)/√14 für S63, k ≤ 287 für den Speicher-Selbsttest). Der
Gesamtumfang liegt im Zielkorridor.

## 5. Restpunkte und Fragen an den Dozenten

- **Richtwert:** Soll Kap. 6 trotz des Folienstoffs näher an −15 % heran?
  Kandidaten wären die „Zwei Proben" (Spur/Determinante) in
  @beispiel:die-matrix-a-a-einer-3-2-matrix, die historische Notiz zu
  Eckart/Young/Mirsky (S64) und der dritte Fall in
  @beispiel:die-gestalt-von; zusammen gut 120 Wörter, alle korrekt und
  lesenswert. Ich habe sie gelassen.
- **Opener-Quiz Frage 2** steht nicht als eigene Selbsttestfrage im Skript
  (die Matrix wird in S62 vollständig durchgerechnet, Rang 1). Reicht das?
- **Prüfscript-Kommentare** in `scripts/verify/REV29/06-svd-Widgets.mjs`
  nennen Zeilennummern („Zahlfrage S62.mdx:729", „S64.mdx:572/585"), die seit
  der Straffung nicht mehr stimmen; Zahlen und Prüfungen sind unverändert
  gültig. Fremde Datei, nicht angefasst.
- Titel „Die Identität im Detail" (S61, Beweis von
  @satz:streckung-als-quadratische-form) ist unverändert aus dem alten Stand;
  sachlicher wäre „Beweis der Streckungsidentität". Nicht geändert, weil
  kein Tell und reine Geschmacksfrage.

## 6. Prüfungen (Endstand, nach meinen Änderungen)

- `npm run typecheck:mdx`: 206 MDX-Dateien, ok.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER (nur „Tabelle ist nicht
  aktuell", erwartet).
- `npm run test:mdx`: Exit 0, 137/137 Fixtures bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich (die
  `\cbblue`-Zeile ist der bekannte Negativtest).
- `npm run lint:numbers`: Exit 0, keine Treffer in Kap. 6 (die 5 Warnungen
  liegen in fremden Kapiteln, u. a. S51/S54).
- Headless-MathJax (`scratchpad/k6/k6-checkmath.mjs`, 187 Makros,
  `noundefined` aus, Negativtest `\foo` erkannt): 1167 Literale, 0 Fehler.
- Keine Fehler in fremden Dateien beobachtet.
