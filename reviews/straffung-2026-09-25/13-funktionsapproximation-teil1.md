# Straffung Kapitel 13, Gruppe 1 (S131–S135)

Grundlage: Plan `13-funktionsapproximation-plan.md`, Decks 15/16. S131 war vom
abgebrochenen Vorlauf zu großen Teilen umgesetzt (Konzeptkarte, Vorkenntnisse,
ML-Vertiefung, #unendlich-viele-loesungen); ich habe den Stand übernommen und
fertiggestellt. S131 ist inzwischen im WIP-Commit 01e9605 des Orchestrators.

## 1. Zahlen (`zaehlen.mjs`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | --- | --- | --- |
| S131 | 2082 → 1617 (−22,3 %) | 118 → 337 | 2200 → 1954 (−11,2 %) |
| S132 | 2386 → 1973 (−17,3 %) | 157 → 273 | 2543 → 2246 (−11,7 %) |
| S133 | 3217 → 2818 (−12,4 %) | 237 → 390 | 3454 → 3208 (−7,1 %) |
| S134 | 3845 → 3041 (−20,9 %) | 462 → 770 | 4307 → 3811 (−11,5 %) |
| S135 | 2621 → 2093 (−20,1 %) | 277 → 511 | 2898 → 2604 (−10,1 %) |
| Summe | 14151 → 11542 (−18,4 %) | 1251 → 2281 | 15402 → 13823 (−10,3 %) |

## 2. Verlagert in Vertiefungen

- **S131** `#interpolation-im-maschinellen-lernen-und` → `::::vertiefung[Interpolation im maschinellen Lernen]`. EXTRA: Die Folie nennt nur die vier Stichworte; die Diskussion (Latent-Space-Formel, RoPE, KAN) geht darüber hinaus. Im Haupttext steht ein Absatz mit den vier Stichworten und der Unterscheidung Interpolation/Analogie. S139 verweist weiter auf das Label.
- **S132** Vorspann + `#unendlich-viele-freiheitsgrade-endlich` → `::::vertiefung[Die Auswertungsabbildung und der Rangsatz]`. EXTRA, weil die Folie nur „unendlichdimensional ⇒ unendlich viele Interpolanten" sagt; dieser Satz steht jetzt im Haupttext. Den Schlussabsatz der Bemerkung habe ich gestrichen, weil er den neuen Haupttextsatz wiederholte.
- **S133** Beweis zu `#zu-viele-nullstellen-erzwingen-das` → `:::::vertiefung[Beweis der Folgerung aus dem Fundamentalsatz]`. EXTRA: Die Folie bringt die Folgerung ohne Beweis. Das Korollar bleibt im Haupttext.
- **S134** `#warum-die-knotenfolge-so-lang-sein-muss`, `#grad-1-die-hutfunktionen` und die bisherige Vertiefung „Ein Rekursionsschritt Stück für Stück" sind jetzt EINE Box `:::::vertiefung[Die Cox-de-Boor-Rekursion von Hand]` (darin `::::interaktiv`), direkt nach dem Interaktiv „Die B-Spline-Basis erkunden". EXTRA: Die Folie führt die Rekursion „nur zur Referenz/Transparenz". Der `ref()` aus S134BSplineBasis.tsx zeigt weiter auf das Label.
- **S135** `#was-die-randterme-wirklich-brauchen` (430 W) → `::::vertiefung[Was der Beweis von den Randbedingungen braucht]`, direkt hinter dem Beweis. EXTRA: Die Folie führt den Beweis, aber keine Nachbetrachtung. Quiz Q2 verweist weiter auf das Label; die Frage ist aus Schritt 5 des Beweises beantwortbar.

## 3. Gestrichen

- **S131:** Satz „Teil 2 wird hier nirgends gebraucht" (stimmte nicht), Einleitungssatz der Vorkenntnisse, Schlusssatz „Auf diesem Umweg beruhen …", stückweise Formel für f̂₂−p, „Der folgende Satz beschreibt die gesamte Lösungsmenge" (doppelt zum Nachtext des Widgets), Lead-in „Wie viel, zeigt schon das kleinste …", in Q4 der Widget-Satz. Außerdem: Die Drumroll „Der erste … Der zweite … Der dritte" ist aufgelöst.
- **S132:** „Dieser Abschnitt behebt das", „Der erste Schritt: Funktionen sind Vektoren.", die wiederholte Suchraum-Einschränkung am Anfang von „Ansatzräume", „Drei Beobachtungen dazu.", „Dass es auch anders geht …", der Halbsatz zu ‖B⁻¹‖ und **Quiz Q5**, weil er wortgleich mit `#einsetzen-ist-hier-nicht` ist.
- **S133:** Meta-Satz „Dieser Abschnitt zeigt beide Seiten", „Wir brauchen den Satz allerdings nicht in dieser Stärke", „… und das brauchen wir gleich", die poly()-Feinheit „κ = 1 nach Normierung", der erste Satz im Nachtext des Runge-Widgets (doppelt zu `#divergenz-…`), „Die Tabelle oben nennt vier Knotenzahlen …". Die Bilanz ist auf zwei Sätze gekürzt.
- **S134:** „Drei Punkte zur Definition.", „Höhere Grade sind möglich …", die 16×16-Rangzählung zum periodischen Spline, „Zwei Beobachtungen.", „Ihr Name kommt von Basis …", der Nebensatz „runden wir auf 10² auf, werden es vierzehn", der letzte Absatz von `#was-die-lokalitaet-…` und **Quiz Q7** (Knotenfolge; der Stoff ist verlagert).
- **S135:** Die Aufzählung der Vorkenntnisse ist auf zwei Sätze gekürzt (dabei fällt das Detail zu (BᵀB)⁻¹Bᵀ weg), die Spline-Wiederholung auf einen Satz plus den unveränderten Absatz zur Benennung. Gestrichen sind außerdem: „Damit lässt sich die Ausgangsfrage präzise stellen.", „Die drei Eigenschaften prüfen wir der Reihe nach.", im Vortext des Widgets die Farbliste und die Leitfrage (die `frage=` der Schätzfrage stellt sie schon) und der Schlusssatz der Erklärung zu Q5.

## 4. Reparierte Fehler

- S132, Algorithmus Schritt 4: handgeschriebenen Link `[Kapitel 5](?k=05-lgs#sec-5.2)` durch `@sec:lgs/lgs` ersetzt.
- **S132, „Effiziente Lösbarkeit":** „Dreiecks- und Bandmatrizen … Aufwand linear statt kubisch" war für Dreieckssysteme falsch. Das sind O(K²), und der Text sagt es zwei Absätze vorher selbst. Neu: Band linear, Dreieck quadratisch, voll kubisch. Der Plan hatte die falsche Fassung übernommen.
- S134, `#konditionszahlen-eine-groessenordnung`: kaputter Satz „Die obere Zeile setzt die Tabelle aus @sec:… ;" um das fehlende „fort" ergänzt.
- S134: Grammatik korrigiert („an jeder Stelle ist höchstens q+1 der Basisfunktionen" → „sind … Basisfunktionen"; Hutfunktionen „Jede … jedes … jedes").
- S135, Literaturhinweis: `@sec:kq/qr` mitten in der Deuflhard/Hohmann-Angabe entfernt.
- S131, Definition Approximationsproblem: „Existiert ein Minimierer, gilt Gleichheit" → „Ist f̂ ein Minimierer, gilt Gleichheit".
- S133, Chebyshev-Vertiefung: „Am Ansatzraum liegt es nicht" widersprach dem Haupttext („dann hilft nur ein anderer Ansatzraum"). Die Aussage ist jetzt auf die Basis beschränkt.
- S133: „und nicht am stärksten dort, wo wir geändert haben" → „oft nicht …", weil das keine allgemeine Aussage ist.
- S134, Eröffnung: „der Ausschlag wächst mit der Zahl der Punkte" gestrichen, weil das der nichtmonotonen Runge-Tabelle in S133 widerspricht.
- S134, B-Spline-Vorspann: „fast alle auf dem halben Intervall von null verschieden" präzisiert zu „jede ist auf dem ganzen Stück rechts ihres Knotens von null verschieden".

## 5. Ermessensentscheidungen und offene Fragen

1. **Folienlücke** (Deck 15, „Orthogonale Polynome: Gram-Schmidt im Funktionenraum", Legendre P₂, `poly()` diskret orthogonal): Im Skript wird das nur in `#der-ausweg-orthogonalisierte-basen` genannt. Ich habe die Lücke nicht geschlossen (nichts erfinden). Soll ein Absatz dazukommen?
2. S134: Die 16×16-Rangzählung zum periodischen Spline ist gestrichen; die Aussage (s(a)=s(b) zählt nicht) bleibt als ein Satz.
3. S135: Die Bemerkung zu den Vorkenntnissen und die Spline-Erinnerung sind stark gekürzt, obwohl Deck 16 beide Folien hat. Im durchlaufenden Skript sind das Migrationsartefakte. Die Folie nennt auch Kreuzvalidierung/AIC/BIC; die standen schon vorher nicht im Skript.
4. S134, Probe des Vier-Punkte-Splines: nicht wie im Plan auf einen Satz ohne Zahlen gekürzt, sondern auf einen Satz, der die Nahtwerte behält. Die Probe bleibt so nachrechenbar.
5. S134: Der Titel von `#vorsicht-bei-den-ableitungen` heißt jetzt „Ableitungen und Integral des Splines" (ID unverändert).
6. S133, Runge-Widget: Der Nachtext hat nach dem Plan nur noch einen Satz (zur zweiten Tafel). Der Brief wünscht 2–4 Sätze Auswertungsprosa; der gestrichene Satz war eine Dublette. Bitte die PDF-Fassung prüfen.
7. S132 (−17 %), S133 (−12 %) und S135 (−20 %) liegen unter den Planzielen. Alle STRAFFEN-Posten sind umgesetzt. Der Rest ist Material, das laut Plan nicht angefasst wird: der Existenzbeweis, der Lagrange-Satz samt Beweis, Tabellen, R-Code, der Beweis zur minimalen Krümmung und das Drei-Punkte-Beispiel. Weiter kürzen ginge nur am Kernstoff.
8. S135, Eröffnung: „der kubische Spline" → „der natürliche kubische Spline", passend zum Satz.
9. S131: Der Titel der Vertiefung ist kürzer als im Plan (Vorlauf-Entscheidung). Den langen Titel trägt die Bemerkung darin.

## 6. Prüfungen

- `npm run typecheck:mdx`: 206 Dateien geprüft, OK.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen (nur „Tabelle nicht aktuell", wie erwartet).
- `npm run test:mdx`: 137/137 Fixtures bestanden, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich. Die `\cbblue`-FEHLER-Zeile ist der bekannte Negativtest. Kein Prüfscript liest S131–S135.
- Fence-Struktur aller fünf Dateien per Skript geprüft (alle Boxen korrekt geschlossen).
- Gedankenstriche: einer in S134 (erlaubt), sonst keine.
