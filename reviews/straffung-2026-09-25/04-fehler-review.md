# Gutachten zum Straffungs-Durchgang Kap. 4 „Numerische Fehleranalyse" (S41–S44)

Grundlage: Bericht `04-fehler.md`, Diff gegen 21b998d, Kapitel im neuen Zustand vollständig
gelesen (S41–S44), Foliensatz `04-fehler.qmd` vollständig, Widget-TSX (Presets,
Verdikt-Schwellen, Schätzfragen), Klausur-Gegenprobe (`questions/kondition/*`,
`diverses*.tex`, WS25/26-1 und -2). Der Editor-Stand steckt inzwischen im WIP-Commit f1523ca;
`git diff HEAD -- src/chapters/04-fehler` zeigt deshalb nur meine Korrekturen.

Gesamturteil: sauberer, zurückhaltender Durchgang. Kein Folien-Kernstoff fehlt im Haupttext,
keine ID/kein Verweis verloren, keine Aussage verfälscht. Die zwei Fachkorrekturen des Editors
(Faustregel zurückgeholt, SGD-Folienlücke geschlossen) sind richtig. Ich habe acht kleine
Stellen nachgebessert.

## 1. Meine Änderungen (je mit Grund)

1. **S41, Kasten „Fehlermaß-Rechner"**: Die aus dem Beispiel in den Kasten verlagerte
   Lemma-Probe stand als nackte Kette „4,6394 ≤ 5,3600 ≤ 5,3606"; woher die Schranken kommen,
   war nicht mehr zu sehen. Die Rahmung aus dem Ausgangsstand zurückgeholt:
   `5·(1 − δ) ≈ 4,6394 ≤ 5,3600 ≤ 5,3606 ≈ 5·(1 + δ)` (Präzision, keine neuen Zahlen).
2. **S42, Kasten „Die Kondition der Summe in der Ebene"**: „in einer schmalen Umgebung der
   Antidiagonalen" → „in einem schmalen Keil um die Antidiagonale". κ_rel = 1/|cos θ| hängt nur
   von der Richtung ab (das sagt der Satz davor); die schlecht konditionierten Punkte bilden
   einen Kegel, keinen Streifen.
3. **S42, ebenda**: doppeltes „also" in zwei aufeinanderfolgenden Sätzen, eines gestrichen.
4. **S43, @bemerkung:was-folgt-daraus-und-was-nicht**: „Ein Satz ist das nicht:" →
   „Die Faustregel ist allerdings kein Satz:". Im Mathe-Text war „Satz" mehrdeutig
   (Theorem/Satzgebilde) und der Bezug „das" unscharf.
5. **S43, Kasten „Der κ-Rechner für den letzten Schritt"**: Frame „Der Rechner macht die
   Faustregel … zur Ablesehilfe" → „Nach der Faustregel aus @bemerkung:interpretation zeigt der
   Rechner log₁₀ κ_rel als Zahl der verlorenen Dezimalstellen." (Deslop; Readout im TSX
   geprüft, die Zahlfrage darunter braucht ihn.)
6. **S43, Selbsttest Frage 3**: „bläht … auf" (Personifikation, im selben Durchgang in S42/S44
   schon entfernt) → „vergrößert".
7. **S43, Zahlfrage κ-Rechner**: Nachsatz „die Verschiebungsformel liefert hier noch eine Zahl,
   aber nur noch mit einer Handvoll gültiger Stellen" gestrichen; wiederholt „bleiben knapp 6
   übrig".
8. **S43, zweite Vertiefung**: Titel „Die Rechnung im Detail" → „Kondition der Differenz:
   Beweis im Detail" (Brief §4: sachlicher, themennennender Titel; Fence und Inhalt unverändert).

Nichts zurückgeholt: Alle gestrichenen Stellen des Editors habe ich gegen den Ausgangsstand
gelesen; es sind Rückblicke, Ankündigungen, Widget-Nacherzählungen und die dritte/vierte
Fassung der Fehlerzerlegung. Die „Arbeitsteilung" aus dem alten S44 trägt jetzt S43 („Die
Kondition ist eine Eigenschaft des Problems … den [Algorithmus] wählen wir") plus Tabelle und
Kapitel-Quiz; die Begründung der Faustregel steht in S43. Kein Übereifer gefunden.

## 2. Geprüft ohne Befund

- **Folienabdeckung (Zuklapp-Lesung):** Vorkenntnisse, absoluter/relativer Fehler mit
  Vor-/Nachteil und Umformung, Def. Fehlermaß, Fehlerschranke, Lemma mit Beweis,
  Vektor-Beispiel, Fehlerzerlegung (Schema, Formel, stabil/gut konditioniert), e^π-Beispiel,
  E/R-Bild, 1/x-Beispiel mit Achtung-Notiz, Def. Konditionszahl, Interpretation (drei Fälle),
  A⁻¹x mit κ(A) als obere Schranke und κ₂-Formel, κ₂-Quiz, LGS-Demo, Aufgabe Summe,
  Stabilität, SGD (inkl. Zuordnung f / f̃ / algorithmischer Fehler), Satz Komposition mit
  Beweis, Indiz + Faustregel, Varianz (Problem, zwei Algorithmen, κ_rel(h), R-Chunk),
  Übersicht, Wrap-up: alles im Haupttext.
- **Vertiefungen:** beide EXTRA (Vorwärts-/Rückwärtsstabilität steht nicht auf den Folien; die
  Folie nennt κ_rel der Differenz ohne Beweis, der Haupttext hat die Beweisidee in zwei Sätzen).
  Kein Haupttext-Verweis auf @definition:vorwaerts-und-rueckwaertsstabilitaet;
  „rückwärtsstabil" im Haupttext hat den Ersatz-Halbsatz.
- **Selbsttests:** alle aus dem Haupttext lösbar; Quiz-Stellen, die Kasten-Titel nennen
  („SGD-Demo", „κ-Rechner", „Widget zur Kondition der Summe", „LGS-Widget"), passen zu den
  neuen Titeln; die Presets „Diagonale" und „schlecht konditioniert" existieren im TSX.
- **Klausur-Gegenprobe:** κ_rel = |f′||x|/|f| (x², 1/x, Konstante), yᵀx per Cauchy-Schwarz,
  κ₂ einer Diagonalmatrix, LGS-Störung: alles im Haupttext.
- **Schätzfragen:** Keine Auflösung nach vorn gezogen (Kehrwert-Widget: ε = −0,54 steht nur in
  `verdeckt`; SGD-Schwelle α = 1 erst in der Prosa nach dem Widget, wie im Ausgangsstand).
- **Offene Frage des Editors „Dominanz zwischen N = 4 und N = 6" (S41-Explorer):** keine
  Ungenauigkeit. Das Widget klassifiziert mit Faktor-2-Band (TSX-Kopf: N = 4 und N = 5
  „vergleichbar", Verhältnisse 1,21 und 0,55); die Prosa „bis N = 3 mehr als doppelt, ab N = 6
  umgekehrt" beschreibt genau dieses Band. Unverändert gelassen.
- **Syntax:** keine Env-/Gleichungs-/Überschriften-ID entfernt oder neu; entfallene
  `:k[…]`-Links in S44 (floating-point, rounding-error, cancellation) sind im Kapitel weiter
  vorhanden; Fence-Stufen korrekt; keine getippten Kapitelnummern; keine du-Imperative.
- **Tells:** Regex aus `german-tells.md` über S41–S44: 0 Treffer (nach meinen Edits).
  Gedankenstriche: 0 in allen vier Dateien.

## 3. Restpunkte und Fragen für den Dozenten

- **Richtwert:** Haupttext −9,9 % (Richtwert −10 bis −15 %). Das Kapitel ist fast
  vollständig Folienstoff; weiteres Kürzen ginge nur an Quiz-Erklärungen oder Folieninhalt.
  Ich habe bewusst nicht nachgelegt.
- **Faustregel-Balance (S43-Bemerkung):** Regel + Begründung + Einschränkung stehen jetzt in
  einer Bemerkung, S44 wiederholt den Merksatz als Wrap-up. Beides zusammen ist die einzige
  Doppelung im Kapitel; ich halte sie für vertretbar (Kapitelzusammenfassung).
- **Beispieltitel „Fehlerzerlegung: Berechnung von e^π"** (Ausgangsstand): ASCII-Mathe im
  Label, `typecheck:mdx` akzeptiert es. Bei Bedarf in Klartext umbenennen (ID bleibt).
- **`\wt f`, `\wt g`, `\wt h` ohne Klammern** in S43 (Vertiefung und Satz, Ausgangsstand):
  rendert korrekt, widerspricht aber der Lesson „Argument-Makros immer mit Klammern". Als
  Mathe-Quelltext nicht angefasst.
- **Veraltete Zeilenangaben in Prüfscript-Kommentaren** (nicht meine Dateien, nur gemeldet):
  `scripts/verify/REV29/04-fehler-S41Widgets.mjs` nennt „S41.mdx:383" und „S41.mdx:334-338",
  `04-fehler-S42Lgs.mjs` „S44.mdx:117"; die Stellen stehen jetzt bei S41 ≈ Z. 353 bzw. 312,
  S44 ≈ Z. 92. Die Prüfungen selbst lesen nur TSX und laufen grün.
- Die Frage des Editors zur Satzfassung (Skript asymptotisch mit o(1), Folie exakte Ungleichung
  mit ‖h(y)‖) teile ich: Skriptfassung ist die saubere, ggf. Folie angleichen.

## 4. Zahlen (`zaehlen.mjs 04-fehler`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | --- | --- | --- |
| S41 | 2108 → 1873 (−11,1 %) | 0 → 0 | 2108 → 1873 |
| S42 | 2439 → 2250 (−7,7 %) | 0 → 0 | 2439 → 2250 |
| S43 | 1896 → 1794 (−5,4 %) | 308 → 303 | 2204 → 2097 |
| S44 | 669 → 489 (−26,9 %) | 0 → 0 | 669 → 489 |
| **Summe** | **7112 → 6406 (−9,9 %)** | **308 → 303** | **7420 → 6709 (−9,6 %)** |

(Editor-Stand: Haupttext 6409, Vertiefung 301, gesamt 6710; S41 +12 Wörter durch die
zurückgeholte Lemma-Rahmung.)

## 5. Prüfungen (Brief §7, nach meinen Edits)

- `npm run typecheck:mdx`: grün (206 Dateien).
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen, nur „Tabelle ist nicht aktuell".
- `npm run test:mdx`: grün (137/137 Fixtures, Orakel-Regressionstest bestanden).
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich (die bekannte
  Negativtest-Zeile `\cbblue{…}` ist kein Fehler).
- Headless-MathJax-Check S41–S44 (187 Makros, `noundefined` aus): 442 Literale, 0 Fehler,
  Negativtest greift.
- Keine Fehler in fremden Dateien beobachtet.
