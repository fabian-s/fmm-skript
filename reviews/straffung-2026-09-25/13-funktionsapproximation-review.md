# Gutachten Straffung Kapitel 13 (Funktionsapproximation), 2026-09-26

Gelesen: Brief, KONVENTIONEN (Technik, Nummerierung, Tooltips, Lessons), STYLE,
Deslop-Skill mit german-tells und long-document-procedure, LESSONS.md, Plan,
beide Editorberichte, beide Decks (15/16) vollständig, der Diff gegen 21b998d
für alle neun Dateien und alle neun Dateien im neuen Stand vollständig.

## Gesamturteil

Der Durchgang ist gut. Die Verlagerungen folgen dem Muster „Satz im Haupttext,
Beweis in der Vertiefung“, die Kürzungen treffen fast nur Meta-Sätze,
Ankündigungen, Doppelungen und Nachbetrachtungen. Beim Vergleich jeder
geänderten Stelle mit dem alten Stand habe ich keinen verstümmelten Satz und
keinen gerissenen Bezug gefunden. Die von den Editoren gemeldeten
Fachkorrekturen habe ich nachgeprüft, sie stimmen (S132 Dreieckssystem O(K²);
S139 Schätzfrage mit zwei weggelassenen Variablen, 20⁸ · 8 B ≈ 205 GB und
2⁸/10² = 2,56; S136 „eingespannt“ statt „vollständig“ wie auf der Folie; S133
Chebyshev-Vertiefung „an der Basis“ statt „am Ansatzraum“). Nachzubessern
waren eine Folienlücke, zwei verlorene Präzisierungen, ein verlorener
Konzeptlink, eine zu knappe Widget-Auswertung und eine Boxenfolge.

## Meine Änderungen (8)

1. **S133, `#der-ausweg-orthogonalisierte-basen`: Gram-Schmidt im
   Funktionenraum ergänzt (Haupttext, +~110 Wörter).** Die Folie „Orthogonale
   Polynome: Gram-Schmidt im Funktionenraum“ ist gezählt, und der Wrap-up von
   Deck 15 nennt sie als Lernziel. Im Skript kam sie nur als Nennung vor. Plan
   und Teil 1 hatten die Lücke als offene Frage gemeldet. Ich habe den
   Folieninhalt übertragen und nichts hinzuerfunden: Skalarprodukt
   ⟨f, g⟩ = ∫₋₁¹ f g dx, Gram-Schmidt auf 1, x, x² liefert p₂ = x² − 1/3 ∝ P₂,
   Legendre/Chebyshev/Hermite als Gram-Schmidt zu verschiedenen Gewichten,
   `poly()` orthogonalisiert bezüglich Σ f(xᵢ)g(xᵢ). Nachgerechnet:
   ⟨x², 1⟩ = 2/3, ⟨1, 1⟩ = 2, ⟨x², x⟩ = ⟨x, 1⟩ = 0. Die Formeln laufen headless
   in MathJax ohne Fehler (Negativtest `\foo` schlägt an). Neue Konzeptlinks:
   `inner-product-functions` und `gram-schmidt` (beide Module existieren).
   Verweis auf `@sec:kq/qr`.
2. **S133: Polynomdivisions-Absatz in die Vertiefung verlagert.** Er begründet
   die Gleichwertigkeit der beiden Fassungen des Fundamentalsatzes und steht
   nicht auf der Folie (EXTRA, Beweisskizze). Neuer Titel der Box: „Gleichwertigkeit der
   Fassungen und Beweis der Folgerung“. Das gleicht Nr. 1 teilweise aus.
3. **S133, Interaktiv „Runges Funktion, zwei Knotenfamilien“: einen Satz
   Auswertung ergänzt.** Nach der Kürzung stand im Kasten nur noch ein Satz,
   der die zweite Tafel beschreibt. Im PDF fehlte damit das Ergebnis des
   Vergleichs (Brief §4: 2–4 Sätze, Teil 1 hatte das als Frage 6 gemeldet).
   Neu steht dort, dass die Knöpfe zwischen den Knotenfamilien wechseln und was
   jede zeigt. Die Aussage ist mit dem Widget-Verdikt (Chebyshev erst ab
   mittlerem n im Vorteil) und der Chebyshev-Bemerkung abgeglichen und nennt
   keine neuen Zahlen.
4. **S134, `#konditionszahlen-eine-groessenordnung`: Halbsatz
   wiederhergestellt.** Die Folie sagt „rund 14 Größenordnungen“, der gekürzte
   Text nur „gut fünfzehn“. Der gestrichene Halbsatz „mit dem aufgerundeten
   Tabellenwert 10² vierzehn“ gleicht beides ab und ist jetzt wieder da.
5. **S137, `#fuenfzig-verrauschte-punkte`: Lack-of-fit-Vorbehalt
   wiederhergestellt.** Nach der Kürzung hieß σ̂ ohne Einschränkung „eine
   Schätzung von σ“. In der Tabelle steht bei K = 4 aber σ̂ = 0,374 gegen die
   wahre Streuung 0,3, und dafür gab es keine Erklärung mehr. Jetzt steht dort
   in einem Halbsatz, dass σ̂ zusätzlich den Anpassungsfehler enthält, wenn f
   nicht im Ansatzraum liegt, „wie bei K = 4“.
6. **S138, `#drei-auswege`: Konzeptlink `:k[Log-Likelihood]{#likelihood}`
   wiederhergestellt.** Das war der einzige Link auf diesen Begriff im Kapitel,
   und die AIC/BIC-Formeln n log(RSS/n) + … hängen gerade daran. Die Formulierung
   ist jetzt „zur Anpassungsgüte, der negativen doppelten Log-Likelihood“; das
   ist auch genauer als vorher.
7. **S139: die Vertiefungen „Radiale Basisfunktionen …“ und „Splines im
   maschinellen Lernen“ zu einer Box zusammengelegt**, Titel „Radiale
   Basisfunktionen und Splines im maschinellen Lernen“. Beide stammen von
   derselben Ausblicksfolie von Deck 15, und vorher standen drei Boxen
   hintereinander (Brief §4, Teil 2 Frage 5). Die Stone-Box „Additivität ist
   mehr als ein Verzicht“ bleibt eigenständig, weil sie zum additiven Modell
   direkt darüber gehört.
8. **S139, Beweisvertiefung zur multivariaten Rate:** Das Verstärkerwort
   „wörtlich“ ist gestrichen.

## Geprüft ohne Befund

- **Haupttext gegen die Folien (Vertiefungen zugeklappt):** Alle gezählten
  Folien beider Decks sind abgedeckt, einschließlich der Quizfolien, Opener-
  und Self-Check-Lösungen. Geprüft habe ich drei Varianten, ML-Anwendungen,
  Quiz Interpolationsproblem, vier Interpolanten, Funktionenräume,
  Basis 1/x/1+x, LGS-Quiz B/a/y, Basisdarstellung konkret, Fundamentalsatz mit
  Folgerung, Eindeutigkeit, „höchstens, nicht genau“, R-Code, Kondition samt
  Tabelle, Stabilität, Runge (nicht monoton), Splinedefinition, m+q-Zählung,
  Randbedingungen, 12×12-System, B-Splines, Rekursion (Definition im
  Haupttext), bs(), Kondition/Band, Eigenschaften, minimale Krümmung samt
  Beweis und Beispiel 6/8, h⁴-Satz, Buckel, Zusammenfassung, Glättungsmodell,
  KQ-Problem, K = n/K < n, Smoothing/Penalized Splines, Methodentabelle,
  Bias, Varianz, MSE, n^{1/9}, Beispiel, CV/AIC/BIC/GCV, Tensorprodukt, Fluch,
  GAM, Ausblick. Die einzige Lücke war Gram-Schmidt (Nr. 1).
- **Selbsttests:** Alle sind aus dem Haupttext beantwortbar. Fragen mit
  Verweis auf ein Vertiefungslabel (S135 Q2, S136 Q3, S137 Q4) tragen ihre
  Begründung selbst oder stützen sich auf den Haupttextsatz. Die gestrichenen
  Fragen (S132 Q5, S134 Q7, S137 Q7, S139 Q11) waren Dubletten oder hingen an
  verlagertem Stoff.
- **IDs, Anker, Links:** Entfernt ist nur `#drei-stellschrauben-drei-wirkungen`.
  Global gegrept (src/, scripts/): Die ID steht nur noch in
  `numbers.generated.json`, und gen-numbers erzeugt diese Datei neu. Von den
  Konzeptlinks fehlt jetzt `{#polynomial}` in S135; S131, S132, S133 und S136
  verlinken den Begriff weiter. Alle `ref()`/`num()`-Ziele der Kapitel-Widgets
  existieren. Getippte Skriptnummern gibt es keine mehr, „Kapitel 7“ und
  Ähnliches steht nur noch in Literaturangaben.
- **Syntax:** Fence-Verschachtelung per Skript über alle neun Dateien geprüft,
  alles korrekt. Vertiefungs- und Interaktiv-Titel sind Klartext.
- **Deslop:** Die Grep-Regex aus german-tells.md trifft über alle Dateien nur
  drei Gedankenstriche, einen im Fließtext (S134) und zwei in `verdeckt`
  (S137, S139), dazu einen Tabellenplatzhalter in S136. Das liegt weit unter
  dem Budget, und „—“ kommt nicht vor. Ankündigungs-Tics („Zwei
  Beobachtungen.“, „Drei Details.“), Meta-Sätze und Preis-Metaphern sind weg.

## Restpunkte und Fragen an den Dozenten

1. **Gram-Schmidt-Absatz (Nr. 1) bitte ansehen.** Er steht als Kernstoff im
   Haupttext, weil die Folie gezählt ist. Soll er stattdessen kürzer sein oder
   in eine Vertiefung?
2. **S137, R-Code (übernommen aus Teil 2, Frage 1):** Die Folie übergibt
   `Boundary.knots = c(0, 2 * pi)` schon beim ersten `bs()`-Aufruf, das Skript
   nicht. Dann reicht `x_new` über `range(x)` hinaus, und `bs()` dürfte warnen.
   Den Code-Fence habe ich nach Brief §5 nicht angefasst. Nachprüfen ließ es
   sich nicht, weil der Container kein R hat. Soll der Code der Folie folgen?
3. **S137, Quiz λ → ∞** ist gestrichen. Der Inhalt steht weiter in der
   Vertiefung (`#was-der-strafterm-bewirkt`, Punkt 2).
4. **Prüfscript-Kommentare in `scripts/verify/REV29/13-funktionsapproximation-S139Skalierung.mjs`**
   sind veraltet (74,5-GiB-Satz gestrichen, „eine Variable weniger“; aus Teil 2).
   Ich habe die fremde Datei nicht geändert, die Prüfung selbst läuft grün.
5. **Folienabgleich (aus Teil 2):** Die h⁴-Tabelle der Folie hat eine Zeile mit
   7 Knoten, das Skript nicht. Die Bias-Varianz-Zahlen der Folie (äquidistant)
   weichen von der eigenen Simulation des Skripts ab. Beides bestand schon vor
   diesem Durchgang.
6. **Richtwert:** Der Haupttext liegt bei −19,8 %, also knapp an der unteren
   Grenze von −20 bis −30 %. Die Editoren hatten −20,3 % erreicht; meine
   Ergänzungen (Kernstoff Gram-Schmidt, drei wiederhergestellte
   Präzisierungen, eine Widget-Auswertung) wiegen die Verlagerung aus Nr. 2 auf.
   S133 liegt deshalb bei −9 % und S138 bei −17 %. Weiter kürzen ließe sich dort
   nur an Kern- und Klausurstoff (Existenzbeweis, Lagrange-Satz, GCV,
   Balance-Rechnung), und das halte ich nicht für vertretbar.
7. Deck 16 nennt unter „Vorkenntnisse“ auch Kreuzvalidierung/AIC/BIC. Die
   gekürzte Bemerkung in S135 führt sie nicht auf, schon vor dem Durchgang nicht.
   Behandelt werden sie in S138.

## Endzahlen (`zaehlen.mjs`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S131 | 2082 → 1617 (−22,3 %) | 118 → 337 | 2200 → 1954 (−11,2 %) |
| S132 | 2386 → 1973 (−17,3 %) | 157 → 273 | 2543 → 2246 (−11,7 %) |
| S133 | 3217 → 2925 (−9,1 %) | 237 → 443 | 3454 → 3368 (−2,5 %) |
| S134 | 3845 → 3047 (−20,8 %) | 462 → 770 | 4307 → 3817 (−11,4 %) |
| S135 | 2621 → 2093 (−20,1 %) | 277 → 511 | 2898 → 2604 (−10,1 %) |
| S136 | 2649 → 1875 (−29,2 %) | 372 → 828 | 3021 → 2703 (−10,5 %) |
| S137 | 3153 → 2438 (−22,7 %) | 642 → 933 | 3795 → 3371 (−11,2 %) |
| S138 | 2892 → 2411 (−16,6 %) | 592 → 592 | 3484 → 3003 (−13,8 %) |
| S139 | 3913 → 3088 (−21,1 %) | 610 → 662 | 4523 → 3750 (−17,1 %) |
| **Summe** | **26758 → 21467 (−19,8 %)** | **3467 → 5349** | **30225 → 26816 (−11,3 %)** |

## Prüfergebnis (Brief §7, nach allen Änderungen)

- `npm run typecheck:mdx`: Exit 0, 206 Dateien.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen. Die Meldung
  „Tabelle ist nicht aktuell“ ist nach Edits erwartet.
- `npm run test:mdx`: Exit 0, 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich. Die
  `\cbblue`-FEHLER-Zeile ist der bekannte Negativtest.
- Zusätzlich: `npm run lint:numbers` Exit 0 ohne Treffer in Kapitel 13;
  Fence-Skript über alle neun Dateien ohne Befund; headless-MathJax für die
  neuen Formeln fehlerfrei.
- Fehler in fremden Dateien: keine beobachtet.
