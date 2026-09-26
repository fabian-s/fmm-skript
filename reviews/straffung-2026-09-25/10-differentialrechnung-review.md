# Gutachten: Straffung Kapitel 10 „Differentialrechnung" (S101–S109)

Stand 2026-09-26. Grundlage: BRIEF.md, Plan und beide Berichte (Teil 1, Teil 2), Diff gegen
`21b998d`, alle neun Dateien im neuen Zustand vollständig gelesen, Decks
`10-ableitungen-I.qmd` und `11-ableitungen-II.qmd` vollständig gelesen.

## 1. Gesamturteil

Der Durchgang ist sorgfältig. Die Kürzungen betreffen fast nur Rückblicke, Dubletten,
Widget-Nachbetrachtungen und Metasätze; Folienkern, Klausurstoff (Ridge, Newton aus T₂,
Lagrange-Restglied, Hesse-Definitheit, Richtungsableitung) und alle von anderen Kapiteln
zitierten Stellen (Ridge-Zahlen für S125, T₂ = f für S124, Münzwurf für S122, x⁴/−x⁴ für
S114) stehen im Haupttext. Die Folien-Abgleiche der Editoren stimmen; sechs Folieninhalte
(Stetigkeitsbeweis, Backprop-Satz, Var ≈ I⁻¹, Hesse-Skizze k = 2, Self-Check F2, Folie
„Bemerkungen") wurden zu Recht in den Haupttext geholt. Echte Fehler habe ich keine
gefunden, wohl aber einige gerissene Bezüge und verlorene Begründungen (§2).

## 2. Meine Änderungen (15)

**Haupttext-Vollständigkeit / gerissene Bezüge**

1. **S103, „Was die Jacobimatrix geometrisch anstellt":** ein Satz zum Flächenfaktor
   ergänzt (Quadrat der Fläche a² → Parallelogramm der Fläche |det J|·a², im Grenzwert auch
   für f). Grund: Der Haupttext-Kasten „Linearisierung bei schrumpfendem Fenster" und die
   zahlfrage (det J = 5) benutzen den Begriff *Flächenfaktor*, der sonst nur in der
   Vertiefung erklärt war (Altbestand, durch die Straffung nicht behoben).
2. **S102, Selbsttest „Verschwindet der Gradient …":** Die Antwort verwies für die Eigenwerte
   6,162/−0,162 auf `@bemerkung:drei-nachtraege-…`, aus der Teil 1 die Eigenwerte gestrichen
   hat. Verweis jetzt hinter „Sattel", die Hesse-Matrix (2 3; 3 4) steht explizit in der
   Antwort (vorher undefiniertes Objekt im Quiz).
3. **S101, Selbsttest Frage 3:** Antwort verwies auf „Schritt 1 und 2 des Beweises"
   (Vertiefung). Jetzt aus der Satzaussage begründet; damit ist auch der offene Punkt aus
   Bericht Teil 1 erledigt.
4. **S109, zahlfrage „Richtungsableitung längs der Höhenlinie":** „Gradienten-Widget" →
   „Kompass-Widget". Der beschriebene Schnitt mit grüner Gerade gehört zum Kompass
   (`RichtungsWidget`), nicht zum Gradientenfeld (Altbestand, mehrdeutig).

**Sinn / Präzision (durch Kürzung verloren)**

5. **S102, `bemerkung:drei-nachtraege-…`:** Nach der Kürzung stand nur „nicht positiv
   definit (Determinante −1/4), und im Nullpunkt … Sattel". „Nicht positiv definit" allein
   begründet keinen Sattel. Jetzt: det < 0 ⇒ Eigenwerte verschiedener Vorzeichen ⇒ Sattel.
6. **S105, Beweis Stetigkeit, Schritt 2:** Beim Zusammenlegen der Schritte wurde δ benutzt,
   ohne eingeführt zu sein. Jetzt „Es gibt also ein δ > 0, sodass …".
7. **S102, `bemerkung:zeilenvektor-nicht-spaltenvektor`:** „Dafür steht dort …" (nach
   Streichung von „Bezahlen müssen wir …" mehrdeutig) → „Im Gegenzug steht dort …".
8. **S106, Beweis Kettenregel, Schritt 1:** M_f wurde ohne Einführung benutzt (Altbestand);
   Klammer „M_f ist die Schranke von D_x f" ergänzt.
9. **S108, Kasten „Taylorpolynome der Exponentialfunktion":** „Faustwert |x|/(k+1) für den
   Fehlerquotienten" war nach Streichung des Satzes „ein Sechstel bis ein Achtel" unklar.
   Jetzt: der Faktor, mit dem sich der Fehler beim Schritt auf die Ordnung k multipliziert
   (so rechnet auch `S108Taylor1D.tsx`).
10. **S108, Quiz in der Vertiefung „Beweis der allgemeinen Taylorentwicklung":** Die Antwort
    sprach von „einer festen Richtung u", der Beweis im Skript hat kein u (das stammt aus
    der Folienskizze). → „längs einer festen Geraden".

**Übereifer**

11. **S107, Fisher-Information:** Teil 2 hat „Unter denselben Regularitätsbedingungen ist die
    erwartete Score-Funktion null und es gilt I(θ) = E[∇ℓᵀ∇ℓ]" gestrichen. Nicht auf den
    Folien, aber gutes Material, auf dem die Asymptotik-Vertiefung in S108 (Score normal
    nach ZGWS) stillschweigend aufbaut. In die Vertiefung zurückgeholt (Satz unverändert,
    Farben wie im Kapitel).
12. **S107, zwei direkt benachbarte Vertiefungen** („Fisher-Information im Bernoulli-Modell"
    und „Die Varianz des ML-Schätzers und die Cramér-Rao-Schranke") zu einer Box
    „Fisher-Information im Bernoulli-Modell und Cramér-Rao-Schranke" zusammengelegt
    (Brief §4: benachbartes EXTRA in eine Box; die Cramér-Rao-Bemerkung verweist ohnehin
    auf das Bernoulli-Beispiel). Labels unverändert.

**Untereifer / Deslop**

13. **S108:** „Dann ist @eq:… wörtlich …" → „Dann lautet @eq:…" (Tell „wörtlich").
14. **S109, „Was wir ausgelassen haben":** „Für eine Störungsanalyse … Für eine feste
    Störungsrichtung" → „Bei fester Störungsrichtung".
15. **S109, Vertiefung „Leere Felder …":** Der Satz „Ableitungen von Abbildungen zwischen
    Funktionenräumen bleiben hier eine Übungsaufgabe" stand wortgleich im neuen
    Haupttext-Absatz und in der Vertiefung; in der Vertiefung gestrichen.

Keine Zahl, keine Formel, kein Label, keine `loesung=`/`toleranz=`-Angabe angefasst.
Neue Mathe-Literale headless mit MathJax (fmm-macros) geprüft: fehlerfrei.

## 3. Geprüft und für gut befunden

- **Entfernte IDs:** nur `ausblick-andere-ableitungsbegriffe`, `fuenf-begriffe-die-bleiben`,
  `vier-bausteine-die-bleiben`; global nur noch in `numbers.generated.*` (regeneriert der
  Orchestrator). Alle `ref()`/`num()`-Ziele der Widget-TSX existieren.
- **Konzept-ids:** keine neu, keine verändert; weggefallen nur in gestrichenen Sätzen
  (S103 `matrix-norm`, S105 fünf Links, S109 sechs Links), alle bis auf `gradient` anderswo
  im Kapitel verlinkt; `gradient` ist unnötig, das Kapitel definiert den Begriff selbst.
- **Selbsttests:** alle aus dem Haupttext beantwortbar (nach Nr. 2–4). Die einzige Frage zu
  Vertiefungsstoff (S108, Taylor-II-Beweis) steht jetzt korrekt in der Vertiefung.
- **Fence-Stufen:** korrekt, `typecheck:mdx` grün. Vertiefungen: 21 Boxen, alle ≥ 109 Wörter.
- **Titel:** Klartext, keine Mathe, kein Markup; getippte Nummern in Titeln und Links
  („Satz 10.2.8", „Gleichung 10.2.4", `?k=…`) sind entfernt.
- **Deslop-Grep** (Regex aus german-tells.md über S101–S109): verbleibende Treffer sind
  echte Kontraste („nicht nur den einer einzelnen", „nicht nur näherungsweise"),
  „Genau $1$" als Zahlantwort und „Zoom" (falsch positiv). Gedankenstriche: 0 in allen
  neun Dateien.
- **Streichungen ohne Verlagerung**, einzeln gegen den alten Stand geprüft: Koordinatenbeweis
  der Jacobi-Kettenregel (S103, gleicher Gedankengang wie der Folienbeweis in S106),
  Halbierungs-Tabelle (S102), Zahlenchecks 4,2997 und (6, 13)/(4, 14) (S106, Letzteres steht
  in der Quizantwort), zwei Zusammenfassungs-Bemerkungen in S109 (Dubletten zur Tabelle).
  Alles Dubletten oder Einzelsätze unter der Box-Schwelle; außer Nr. 11 nichts
  wiederhergestellt.

## 4. Restpunkte und Fragen an den Dozenten

1. **Richtwert Haupttext knapp verfehlt:** −17,8 % statt −20 … −30 %. Begründung: rund
   450 Wörter Folienkern kamen in den Haupttext zurück (Stetigkeitsbeweis, Backprop-Satz,
   Var ≈ I⁻¹, Hesse-Skizze, Self-Check F2, „Was wir ausgelassen haben", Flächenfaktor); ohne
   sie läge das Kapitel bei etwa −19,5 %. Der Gesamtumfang liegt mit −13,3 % schon über
   dem Ziel (−5 … −10 %), weitere Kürzungen müssten also Verlagerungen sein. Kandidaten,
   falls gewünscht: (a) die Beweisskizze zum Hesse-Kriterium in S107 (≈ 130 W, Standardmuster
   „Satz im Haupttext, Beweis in der Vertiefung"; der Plan hielt sie als kanonische Stelle
   im Haupttext), (b) `bemerkung:beispiele-und-warum-die-schranke-selten` in S106 (≈ 190 W,
   aber zwei Selbsttests stützen sich darauf). Ich habe beides nicht verschoben.
2. **Backprop-Widget in der Vertiefung** (S103, „Vorwärts und rückwärts durch ein winziges
   Netz"): Backpropagation ist Folienkern, der Kasten liegt aber seit der Kürzung vom
   2026-08-26 in der Aufwands-Vertiefung. Nach Brief §4 gehörte er eher in den Haupttext
   (≈ +150 W). Soll er heraus?
3. **Ermessensposten aus den Berichten, bitte ansehen:** Koordinatenbeweis der
   Jacobi-Kettenregel gestrichen (S103); Stetigkeitsbeweis wieder im Haupttext (S105);
   S109-Tabelle als einzige Zusammenfassung; neue Haupttext-Sätze (Backprop, Var ≈ I⁻¹,
   Hesse-Skizze k = 2, Self-Check-F2-Frage, „Was wir ausgelassen haben").
4. **TSX-Fehler, nicht in meinem Auftrag (bestätigt den Hinweis aus Teil 2):**
   `widgets/S108Taylor1D.tsx`, `verdeckt`-Text der Schätzfrage „T₃ gegen T₂": „Faustwert
   |x|/(k+1) = 0,5/3 = 0,167, also ein Sechstel, und dass es etwas besser läuft …". Für den
   Schritt auf k = 3 ist der Faustwert nach dem eigenen Statustext des Widgets
   0,5/4 = 0,125, ein Achtel, und der gemessene Faktor 8,2 trifft ihn. Der Text sollte
   „0,5/4 = 0,125, also ein Achtel" sagen; die Begründung „etwas besser wegen e^ξ" entfällt
   dann.
5. **Klein, nicht geändert:** S109, Selbsttest „partielle Ableitungen": Der Schlusssatz
   verweist auf Schritt 3 im Beweis zu `satz:erste-und-zweite-ableitung-in` (Vertiefung).
   Die Frage selbst ist ohne ihn beantwortbar.

## 5. Zahlen (`zaehlen.mjs 10-differentialrechnung`, Endstand)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S101 | 2 393 → 2 063 (−13,8 %) | 278 → 278 | 2 671 → 2 341 |
| S102 | 3 282 → 2 865 (−12,7 %) | 137 → 137 | 3 419 → 3 002 |
| S103 | 3 093 → 2 562 (−17,2 %) | 938 → 921 | 4 031 → 3 483 |
| S104 | 2 670 → 2 137 (−20,0 %) | 1 414 → 1 632 | 4 084 → 3 769 |
| S105 | 2 231 → 2 023 (−9,3 %) | 699 → 404 | 2 930 → 2 427 |
| S106 | 3 606 → 3 031 (−15,9 %) | 848 → 834 | 4 454 → 3 865 |
| S107 | 3 703 → 2 913 (−21,3 %) | 1 650 → 1 763 | 5 353 → 4 676 |
| S108 | 3 421 → 2 713 (−20,7 %) | 895 → 956 | 4 316 → 3 669 |
| S109 | 2 679 → 1 939 (−27,6 %) | 670 → 826 | 3 349 → 2 765 |
| **Summe** | **27 078 → 22 246 (−17,8 %)** | **7 529 → 7 751** | **34 607 → 29 997 (−13,3 %)** |

Vor meinem Review: Haupttext 22 183, Vertiefung 7 753, gesamt 29 936.

## 6. Prüfungen (Brief §7, Endstand)

- `npm run typecheck:mdx`: 206 MDX-Dateien, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (Exit 1 nur wegen „Tabelle ist
  nicht aktuell", erwartet).
- `npm run test:mdx`: 137/137 Fixtures, Inventar- und Orakeltest bestanden, Exit 0.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0 (die `\cbblue`-Zeile ist der
  eingebaute Negativtest).
- Zusätzlich: `npm run lint:numbers` ohne Treffer in Kapitel 10; headless-MathJax-Probe der
  neuen Literale fehlerfrei. Fehler in fremden Dateien: keine aufgetreten.
