# Gutachten Straffung Kap. 1 (01-intro)

Geprüft: `git diff 21b998d -- src/chapters/01-intro`, S11/S12 im neuen Stand
vollständig, Folien `slides-2627/slides/01-intro.qmd` (gezählt: Motivation,
„Warum so viel Mathe", Themen, Beispiele 1–5, Vorkenntnisse, zwei
Selbsttestfolien mit Lösungen in Kommentaren; der Recap „Basis & Span" ist
auskommentiert), `concept-map.qmd` (Quelle der S12-Vertiefungen), alte
Klausuren (kein Kap.-1-Stoff abgefragt).

## 1. Urteil über den Durchgang

Die Arbeit des Kapitel-Agenten ist sauber. Fachkorrekturen (Kondition als
Problemeigenschaft, veralteter Exponent 2,373 nicht mehr „bester bekannter",
Invertierbarkeit notwendig/äquivalent getrennt, x₀ in der ε-δ-Definition
gebunden, „braucht aus Teil 2 wenig" passend zur Kante 11 → 13 und zu
concept-map.qmd, K/p/ε in den O-Ausdrücken definiert) habe ich einzeln gegen
Folien, Kap. 8/13 und `S12Landkarte.tsx` nachgeprüft: alle richtig. Die
Umstellung der Beispiele in Folienreihenfolge (Kondition vor Komplexität) ist
richtig und macht nebenbei den Code-Kommentar in `S12Landkarte.tsx` Z. 9
(„Lösungsfarben aus Beispiel 1.1.1" = Konditionsbeispiel) nach `gen:numbers`
wieder zutreffend. Keine ID, kein `:k`-Link, kein `@`-Verweis entfernt (nur
neue `@kap:`/`@num:`-Verweise dazu). Das Leitprinzip steht wie vorgegeben in
zwei Sätzen am Anfang von „Wie dieses Skript funktioniert", ohne Aussage zur
Klausurrelevanz.

Zuklapp-Test: Der Haupttext (S11 ganz, S12 Einleitung, Karte, Zahlfrage) ist
ohne die zwei Vertiefungen lückenlos; die Zahlfrage ist aus der Karte im
Haupttext lösbar; alle Folien-Kernaussagen stehen im Haupttext (Beispiel 5
nur mit GPT-3 statt der Dreiertabelle, für ein konzeptionelles Kapitel
ausreichend).

## 2. Eigene Änderungen (8)

S11.mdx:

1. „Die Theorie liefert die Formel β̂ = …" → „Hat X vollen Spaltenrang,
   liefert die Theorie die Formel …". Grund: Folienvoraussetzung „(falls
   rang(X) = p)" fehlte schon im Ausgangsstand (Folien-Kern, Präzision).
2. Komplexitätsbeispiel: „etwa 2·10¹⁰ Operationen gegenüber" → „etwa 2·10¹⁰
   der schnellsten Verfahren gegenüber". Grund: Bezug war offen; Strassen
   hätte bei n = 10 000 einen ganz anderen Faktor (Folie: „Optimiert").
3. Teil 1: „…; am Ende stehen Tensoren." → „…; zum Schluss kommen
   :k[Tensoren]{#tensor} dazu." Grund: abgehackter Anhängsel-Halbsatz; der
   im Haupttext sonst unerklärte Begriff bekommt den vorhandenen Tooltip.
4. Teil 2: „Die Verlustfunktionen neuronaler Netze sind nicht konvex" →
   „sind meist nicht konvex". Grund: Pauschalaussage zu stark (einschichtige
   Modelle wie die logistische Regression der Folientabelle sind konvex).
5. Teil 3: „Schon e^x ≈ 1 + x + x²/2 liefert …" → „Schon die Näherung zweiter
   Ordnung um x₀ = 0, e^x ≈ …, liefert …". Grund: Folie „Taylor-Approximation
   2. Ordnung … um x₀ = 0"; die allgemeine Formel steht im Tooltip
   taylor-series.
6. Leseanleitung: „Blaue „Interaktiv"-Kästen enthalten Widgets mit einer
   Aufgabe und ihrer Auswertung und gehören zum Haupttext." → „… gehören zum
   Haupttext; sie enthalten Widgets mit einer Aufgabe und ihrer Auswertung."
   Grund: und-Kette, Kernaussage nach vorn.

S12.mdx (Vertiefung „Was sich durch das ganze Skript zieht"):

7. Stabilität: „Deshalb nehmen wir Zerlegungen statt Inversion, wo immer
   möglich orthogonale Matrizen (…), und führen …" war mehrdeutig („wo immer
   möglich" hing an beiden Gliedern), und mit dem gestrichenen du-Imperativ
   „Wähle Algorithmen, die Fehler nicht verstärken" war das Prinzip selbst
   weg. Jetzt: „… die Stabilität wählen wir mit dem Algorithmus: Er soll
   Fehler nicht zusätzlich verstärken. Deshalb lösen wir mit Zerlegungen statt
   per Inversion, arbeiten wo immer möglich mit orthogonalen Matrizen (…) und
   führen …" (Prinzip aus concept-map.qmd, `:k`-id unverändert).
8. Teil 2: „@kap:optim ordnet die Verfahren dann nach der Ordnung …" →
   „sortiert die Verfahren …" (ordnet/Ordnung).

Nicht geändert, bewusst: die zwei Vertiefungen in S12 bleiben getrennt
(verschiedene Themen, je > 60 Wörter; S11 zählt „die ersten beiden");
„goldene Regel" (Kursbegriff aus concept-map.qmd), „perfekt konditioniert"
(κ = 1), „Landkarte" (Name des Abschnitts in der Registry, nicht Metapher).

## 3. Zahlen (`zaehlen.mjs 01-intro`)

| | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| Ausgangsstand | 1545 | 642 | 2187 |
| nach Kapitel-Agent | 1538 (−0,5 %) | 595 | 2133 (−2,5 %) |
| nach Gutachten | 1554 (+0,6 %) | 605 | 2159 (−1,3 %) |

Richtwert −0 bis −10 %: Der Haupttext liegt 9 Wörter über dem Ausgangsstand.
Begründung: Das vorgegebene Leitprinzip und fünf Folien-Präzisierungen
(Rangvoraussetzung, Taylor-Ordnung, Bezug „schnellste Verfahren", Tensoren,
„meist") kamen dazu; echte Dubletten oder EXTRA-Blöcke gibt es im Haupttext
nicht mehr. Gedankenstriche: 0. Grep-Regex aus german-tells.md: nur
„Landkarte" (Eigenname), keine Tells.

## 4. Restpunkte und Fragen für den Dozenten

1. **Farbe der Vertiefungsboxen** (wie im Bericht des Kapitel-Agenten): Der
   Leitsatz sagt, wie vorgegeben, „die gelben Boxen"; im PDF ist der Kasten
   grau („Vertiefung (optional):", scripts/pdf/preamble.tex). Die ganze
   Leseanleitung ist web-bezogen (Tooltips, aufdeckbare Beweise).
2. **Folienzahlen Matrixmultiplikation** (Ergänzung zum Bericht): Nicht nur
   die dritte Zeile passt nicht zum Exponenten (1000^2,373 ≈ 1,3·10⁷ statt
   2·10⁸), auch Strassen nicht (1000^2,807 ≈ 2,6·10⁸ statt 6·10⁸). Der
   „Faktor 50" hängt an diesen Zahlen. Unverändert gelassen (Folienzahlen);
   Vorschlag: mit der Folie gemeinsam korrigieren oder als „mit Konstanten,
   grob" kennzeichnen.
3. **Kap. 8, fremde Datei** `08-la-misc/S85.mdx` Z. 78: „Mit diesem Kapitel
   endet der erste Block des Skripts" widerspricht S11 (Teil 1 endet jetzt
   ausdrücklich mit Tensoren, Kap. 9), der Karten-Legende „Kap. 1–9" und
   concept-map.qmd. Nicht angefasst.
4. **Widget-Kommentar** `S12Landkarte.tsx` Z. 73 „Kap. 13 setzt Teil 2 nicht
   voraus" neben der Kante 11 → 13: Die Prosa folgt der Kante (so auch
   concept-map.qmd CONV → FA2).
5. Nach `gen:numbers` tauschen die Beispielnummern 1.1.1/1.1.2 (keine
   Verweise betroffen).

## 5. Prüfungen (Endstand, nach allen Edits)

- `npm run typecheck:mdx`: Exit 0, 206 MDX-Dateien.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen, nur „Tabelle ist
  nicht aktuell" (erwartet).
- `npm run test:mdx`: Exit 0 (137/137 Fixtures, Orakel-Test bestanden).
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte, darunter
  `REV29 01-intro-S12Landkarte: ok` (die `\cbblue`-FEHLER-Zeile ist der
  bekannte Negativtest).
- Headless-MathJax über alle Literale in S11/S12 (187 Makros, ohne
  `noundefined`, Negativtest `\foo` greift): 100 Literale, 0 Fehler.
- Keine Fehler in fremden Dateien beobachtet.
