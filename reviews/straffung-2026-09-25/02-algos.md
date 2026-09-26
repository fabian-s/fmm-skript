# Straffung Kapitel 2 (02-algos): Bericht

Dateien: `src/chapters/02-algos/S21.mdx` bis `S25.mdx`. Grundlage: Folien
`slides-2627/slides/02-algos.qmd`, alter Klassifikationsbericht `reviews/kuerzung/02-algos.md`,
Klausur-Gegenprobe (`fmm-lmu/exams`, WS25/26-1 Aufgabe c: „möglichst einfache, möglichst
langsam wachsende b_n mit a_n = O(b_n)“).

## 1. Zahlen (`zaehlen.mjs 02-algos`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | --- | --- | --- |
| S21 | 1636 → 1432 (−12,5 %) | 0 → 0 | 1636 → 1432 |
| S22 | 1258 → 1098 (−12,7 %) | 0 → 0 | 1258 → 1098 |
| S23 | 1721 → 1610 (−6,4 %) | 225 → 0 | 1946 → 1610 |
| S24 | 1270 → 1185 (−6,7 %) | 540 → 492 | 1810 → 1677 |
| S25 | 1575 → 1477 (−6,2 %) | 669 → 463 | 2244 → 1940 |
| **Summe** | **7460 → 6802 (−8,8 %)** | **1434 → 955** | **8894 → 7757 (−12,8 %)** |

Der Haupttext liegt unter dem Richtwert (−10 bis −15 %), weil rund 250–300 Wörter
Folienstoff neu in den Haupttext kamen oder aus Vertiefungen zurückgeholt wurden (siehe
§2 und §4). Ohne diese Zugänge läge die Kürzung bei etwa −12 %. Ich habe das bewusst
so gelassen, statt weiteren Kernstoff zu kürzen.

## 2. Vertiefungen: verlagert, zusammengelegt, zurückgeholt

Neu in Vertiefungen kam kein Stoff. Die vorhandenen Boxen wurden neu geordnet:

- **S24, „Limes superior, Schreibweise und Theta“**: die beiden Boxen „Technische
  Feinheiten der Landau-Definition“ (mit @bemerkung:zwei-feinheiten-der-definition, Titel
  jetzt „Feinheiten der Definition“) und „Warum manchmal Theta?“ zu EINER Box
  zusammengelegt, hinter die Rechenbeispiele gestellt. EXTRA, weil limsup-Erklärung,
  Notationsmissbrauch und die Motivation für Θ über die Folie hinausgehen. Die
  Θ-*Definition* selbst steht jetzt als Zeile im Haupttext (siehe §5).
- **S25, „Exakte Aufrufzahl und goldener Schnitt“**: die Boxen „Die exakte Aufrufzahl“
  (@bemerkung:wie-schlimm-ist-es-wirklich, Titel jetzt „Die exakte Aufrufzahl“) und „Der
  goldene Schnitt im Aufrufbaum“ zusammengelegt. EXTRA, weil T(n) = 2F₍ₙ₊₁₎ − 1, Binet-Formel
  und φ auf keiner Folie stehen. Den Satz zu den Steigungen im Widget (0,209 gegen 0,301)
  habe ich mit in die Box genommen.
- **S25, zurück in den Haupttext: Beweis zu @satz:komplexitaet-der-iterativen-variante**.
  Die Folie „Fibonacci: Komplexitätsanalyse 1“ führt genau diese Zählung vor
  (Initialisierung O(n), n − 2 Durchläufe, Speicher O(n)). Außerdem rechnet die
  Vergleichstabelle im Haupttext mit 4n − 6 und der Konstante c aus diesem Beweis.
- **S23, zurück in den Haupttext: Faustregel ≈ 2nd bzw. ≈ 2ndm**. Der Satz zur
  Matrix-Matrix-Multiplikation stand nur in der Beweis-Vertiefung, aber der FLOP-Kasten, seine
  Schätzfrage, die Zahlfrage „Faktor 8“ und das Widget-Verdikt rechnen damit.

## 3. Gestrichen

- S23, Vertiefung „Beweis durch genaues Zählen der Operationen“: zwei Beweisschritte, die das
  unmittelbar vorangehende 3×2-Beispiel wiederholen. Ersetzt durch einen Satz im Haupttext
  (y_i als Summe mit d Multiplikationen und d − 1 Additionen).
- S23, Vertiefung „Wie groß ist exponentieller Aufwand?“ (55 Wörter, 2²⁰⁰ ≈ 1,6·10⁶⁰, 5·10³⁴
  Jahre). Die Box liegt unter der 60-Wörter-Grenze, und die Aussage wiederholt die Tabelle
  und den Hardware-Satz in @sec:fibonacci-komplexitaet (36 000 Jahre bei n = 100, tausendmal
  schnellerer Rechner).
- S22, Quizfrage „Der Algorithmus ist *approximativ*“: nur die Verneinung der Frage „exakt“.
  Die Folie hat drei Fragen (exakt, iterativ, probabilistisch), und die bleiben.
- S21, @bemerkung:arten-von-algorithmen: die Beispielsätze (Gauß, Newton/Gradient,
  Monte Carlo) und der Satz zum stochastischen Gradientenverfahren doppelten
  @beispiel:algorithmenarten-in-ml-und-statistik in S22 (Dublette laut altem Bericht P3).
  Die Bemerkung enthält jetzt nur noch die drei Achsen und verweist auf das Beispiel.
- Rückblicke und Ankündigungen: S21-Schlusssatz („Im nächsten Abschnitt sehen wir …“),
  Einleitungen von S22, S23, S24, S25 (jeweils auf ein bis zwei Sätze), der Vorsatz zu „Zwei
  warnende Beispiele“, „Bevor wir T(n) allgemein abschätzen …“, der S24-Schlusssatz mit dem
  handgeschriebenen Link `[nächsten Abschnitt](#sec-2.5)`, „Vier Aussagen … Welche sind
  wahr?“ (S25), „Die Beweise sind kurze Grenzwertargumente“ (S24, Box folgt direkt).
- Doppelte Aussagen: S23 „Die Wachstumsfaktoren, nicht die absoluten Zahlen, entscheiden …“
  (sagt der Kasten direkt davor), S23 Einleitungsabsatz vor der Aufwands-Definition
  (wiederholte die Definition), S24 zweite Hälfte des Idee-Absatzes (wiederholte die
  Interpretation nach der Definition), Wiederholungen in S21-Quiz und S25-Speicherabsatz.
- Deslop: „harmlose Exponentialfunktion“, „Kurz gesagt“, „völlig offen“, „keinerlei
  Information“, „sauber aus“, „eleganteren Weg“, „Das ist elegant“, „die Schere geht auf“,
  „explodiert“, „kauft … vierzehn Schritte“, „übrigens“, „einfach“, „Genau dafür“, zwei
  „nicht nur … sondern auch“ (S24-Selbsttest), „der Klassiker“ (Literaturzeile S22).
  Titel: „Zwei Gesichter derselben Auslöschung“ → „Varianz und Klammerung bei wachsender
  Verschiebung“, „Wachstumsraten-Explorer: wer dominiert wen, und ab wann?“ →
  „Wachstumsraten-Explorer: Klassen und Vorfaktoren“, „Was wird hier eigentlich
  berechnet?“ → „Was die Rekursion berechnet“, „Wie schlimm ist es wirklich?“ → „Die exakte
  Aufrufzahl“, „Woher die beiden Schranken … kommen“ → „Beweis der Schranken für die
  Aufrufzahl“. IDs unverändert.

## 4. Reparierte Fehler und geschlossene Folienlücken

- **S23, Beschreibung der Wachstumsbilder:** „die anderen Kurven sind daneben kaum von der
  Achse zu unterscheiden“ stimmt für n² nicht (im Fenster 0–1000 erreicht n² bei n = 30 den
  Wert 900, siehe `S23WachstumsBild`). Jetzt: „während n und n² bis n = 30 darin bleiben“.
- **S22, Quiz „exakt“:** Die Lösung zitierte die Einschränkung „bis auf Rundungsfehler“ aus
  „der Definition“, aber die Bemerkung sagte das nicht. Die Folienformulierung
  (f̃(x) = f(x) bis auf Rundungsfehler bzw. f̃(x) ≈ f(x)) steht jetzt in
  @bemerkung:arten-von-algorithmen.
- **S22, Algorithmus:** Die Beispielrechnung benutzte f̃₁, …, f̃₆, ohne dass die
  Einzelschritte definiert waren. Die Komposition der Folie (f̃₁(n) = 0, f̃₂(x) = (x, 1),
  f̃ᵢ₊₁(x₁, …, xᵢ) = (x₁, …, xᵢ, xᵢ + xᵢ₋₁)) steht jetzt unter dem Algorithmus. Im
  Algorithmus-Block steht f̃ statt f (Algorithmus statt Problem, wie in der Definition und
  auf der Folie).
- **S21, Definition Algorithmus:** Folienzusatz „des Problems f(x)“ ergänzt.
- **S24, Folienlücke:** Der Satz der Folie „Meist suchen wir eine möglichst einfache Folge b_n
  mit a_n = O(b_n), aber nicht a_n = o(b_n)“ fehlte. Klausur WS25/26-1 c) fragt genau das.
  Jetzt als kurzer Absatz mit dem vorhandenen Beispiel 3n² + 5n.
- **S24, Θ:** Die aktuelle Folie „Landausymbole“ (gezählt) führt Θ als „Zusatz“. Jetzt eine
  Zeile in der Interpretationsliste im Haupttext, siehe §5.
- **S23, Komplexitätsklassen:** O-Bezeichnungen der Folie (O(1), O(log n), O(n), O(n²),
  O(2ⁿ)) in die Liste gesetzt; der Meta-Vorsatz entfällt dafür.
- **S22, ML-Beispiel:** jetzt nach der Folienliste. Neuronale Netze (approximativ) und
  Matrix Sketching (probabilistisch, @sec:la-misc/sketching) sind neu, randomisiertes
  Quicksort (nicht auf der Folie) ist entfallen. Dazu der Folien-Kombinationssatz.
- **S25, Kastenprosa beim Widget:** „Die rote Gerade hat eine eigene Basis“ nahm die
  Schätzfrage (Antwort „dazwischen“) teilweise vorweg. Jetzt neutral formuliert.
- **S25, Haupttext ohne φ:** Kapitelzusammenfassung und Vergleichsabschnitt sprachen von
  O(φⁿ), obwohl φ nur in der Vertiefung erklärt ist. Jetzt „linear gegen exponentiell“,
  und die Tabelle verweist für T(n) auf @bemerkung:wie-schlimm-ist-es-wirklich.
- **S21, Überanspruch:** „ist die häufigste numerische Falle“ → „eine der häufigsten
  numerischen Fehlerquellen“.
- **S25:** „verdoppeln sich diese Dopplungen“ → „vervielfachen sich solche Wiederholungen“.
- Getippte Kapitelverweise: S25-Zusammenfassung „Im nächsten Kapitel … Kapitel 4“ →
  @kap:matrix-spur-norm, @kap:fehler. du-Imperative: S22 („Lege … Setze … Durchlaufe“,
  „rufe … auf“) und S23 („Berechne y = Ax“ → „Gesucht ist“).

## 5. Ermessensentscheidungen und offene Fragen für den Dozenten

1. **Ist die Fibonacci-Schleife „iterativ“? (Konflikt mit der Folie.)** Das Quiz auf der
   Folie hat die Lösung „1, 2“ (exakt und iterativ), passend zur Foliendefinition „iterativ:
   gleiche Vorschrift wird mehrfach ausgeführt“. Das Skript benutzt die Numerik-Definition
   (Folge von Näherungen mit Abbruchkriterium). Es wertet „numerisch iterativ“ als *falsch*
   und nennt den Algorithmus „direkt“. Die Lösung erwähnt die umgangssprachliche
   „iterative Variante“. Das habe ich nicht angefasst. Bitte entscheiden, welche Lesart
   gelten soll. Die Folie „Algorithmenarten in ML/Statistik“ benutzt die numerische Lesart.
2. **Θ im Haupttext:** Das To-do 1 in KONVENTIONEN (2026-08-20) sagt „die Folien tun das
   nicht“. Das galt für `fmm-lmu/slides/02-algos.Rmd`. Die aktuelle Fassung
   `slides-2627` hat Θ als „Zusatz“ auf einer gezählten Folie. Deshalb steht jetzt eine
   Zeile im Haupttext, Motivation und Beispiel bleiben in der Vertiefung. Falls „Zusatz“
   als optional gemeint ist, kann die Zeile zurück in die Box.
3. Die **Zahlfrage „Faktor 8“ in S23** wiederholt fast wörtlich die Schätzfrage im
   FLOP-Kasten. Ich habe sie behalten, weil `scripts/verify/REV29/02-algos-S23Aufwand.mjs`
   sie ausdrücklich fordert („zahlfrage Faktor 8 fehlt“) und sie im PDF die statische
   Fassung liefert. Das Prüfscript prüft weiterhin 2²⁰⁰ ≈ 1,6·10⁶⁰ und 5·10³⁴ Jahre aus der
   gestrichenen Box: Die Rechnung ist harmlos, gehört aber zu keiner Textstelle mehr. Ich
   habe das Skript nicht geändert.
4. Der Kasten **„Varianz und Klammerung bei wachsender Verschiebung“ (S21)** geht über die
   Folien hinaus. Er bleibt im Haupttext, weil sein Thema (Auslöschung) Kern ist und zwei
   Selbsttestfragen daran hängen.
5. **S24, Beispiele (b) und (c)** kommen von einer Anhangsfolie (uncounted). Sie bleiben im
   Haupttext, weil sie zusammen unter 60 Wörtern liegen und (c) die Symmetrie-Quizfrage
   stützt.
6. Die Live-Messung der Folie (×180 bei n = 30) fehlt weiter. Mangels Rscript ist sie nicht
   nachgerechnet, die Modelltabelle bleibt. Die Tabellenwerte (21 891, 2 692 537, 4,07·10¹⁰,
   1,15·10²¹, ≈ 36 000 Jahre) und die Zahlfrage n = 80 (7,6·10¹⁶ Aufrufe, gut zwei Jahre,
   314 Operationen) habe ich mit exakten Fibonacci-Zahlen nachgerechnet.

## 6. Prüfungen

- `npm run typecheck:mdx`: 206 Dateien, keine Fehler.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen („Tabelle nicht aktuell“ ist nach
  den Edits erwartet; die Umgebungsreihenfolge in S24 hat sich geändert).
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, alle sechs `02-algos`-Scripte ok.
- Zusätzlich: headless MathJax über alle 573 Mathe-Literale des Kapitels mit 0 Fehlern
  (187 Makros geladen, der Negativtest `\foo` wird erkannt); `lint:numbers` ohne Treffer in
  02-algos; 0 Gedankenstriche im Kapitel; alle `:k[…]{#id}`-Ziele, Env-IDs, `:id[…]`- und
  `id="…"`-Anker je Datei unverändert (Mengenvergleich gegen 21b998d).
- Fremde Fehler: keine beobachtet.
