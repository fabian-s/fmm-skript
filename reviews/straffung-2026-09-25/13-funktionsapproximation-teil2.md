# Straffung Kapitel 13, Teil 2 (S136–S139), 2026-09-26

Grundlage: Plan `13-funktionsapproximation-plan.md`, Decks 15/16. Beim Start
waren S136–S139 gegenüber 21b998d unverändert; alles unten stammt aus diesem
Lauf. Deslop- und Schreibpass Zeile für Zeile über alle vier Dateien, danach ein
zweiter Grep-Durchgang (Füllwörter „also/deshalb/genau“, Preis-/Kosten-Metaphern,
Ankündigungen).

## 1. Zahlen (`zaehlen.mjs`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S136 | 2649 → 1875 (−29,2 %) | 372 → 828 | 3021 → 2703 (−10,5 %) |
| S137 | 3153 → 2421 (−23,2 %) | 642 → 933 | 3795 → 3354 (−11,6 %) |
| S138 | 2892 → 2407 (−16,8 %) | 592 → 592 | 3484 → 2999 (−13,9 %) |
| S139 | 3913 → 3088 (−21,1 %) | 610 → 666 | 4523 → 3754 (−17,0 %) |
| **Teil 2** | **12607 → 9791 (−22,3 %)** | **2216 → 3019** | **14823 → 12810 (−13,6 %)** |

## 2. In Vertiefungen verlagert

- **S136, `#welcher-spline-die-konstante-traegt`** → `::::vertiefung[Natürlicher oder eingespannter Spline]`.
  EXTRA: e^x-Raten, x³-Rechnung, 33/65-Knoten-Vergleich. Die Folie hat davon nur
  das Kleingedruckte „eingespannter Spline“. Im Haupttext steht direkt nach dem
  Satz ein Absatz mit drei Sätzen: 5/384 gilt für den eingespannten Spline; der natürliche erzwingt
  s″ = 0 und verliert dann die globale Ordnung h⁴; das Beispiel rechnet deshalb
  eingespannt. Quiz Q3 bleibt, weil er aus diesem Absatz beantwortbar ist.
  Den Plan-Titel habe ich um „wer die Konstante trägt“ gekürzt.
- **S136, `#das-muster-hinter-dem-exponenten`** in die Beweis-Vertiefung, die
  jetzt `[Beweis für Geradenstücke und das allgemeine Muster]` heißt.
  Plan-Titel „…der linearen Schranke…“ nicht übernommen, weil die Schranke
  quadratisch in h ist. Im Haupttext stehen nach dem linearen Satz zwei Sätze:
  h^{q+1} gehört zur (q+1)-ten Ableitung, und bei festem Grad tritt kein
  Runge-Problem auf. Die „Zu beachten ist“-Passage ist in der Bemerkung
  aufgegangen.
- **S137, Beweis zu `#glaettung-ist-ein-lineares-kleinste`** (sechs Schritte)
  → `:::::vertiefung[Beweis der Kleinste-Quadrate-Darstellung]`. EXTRA, weil der
  Beweis Kapitel 7 zitiert und die Folie nur das Problem hinstellt. Quiz Q5
  verweist jetzt auf den Satz selbst, der die Eindeutigkeit von Bâ schon
  ausspricht.
- **S139, „### Verstreute Punkte ohne Gitter“**: Der Absatz ist jetzt der erste Absatz der
  RBF-Vertiefung, die Überschrift ist entfernt, der Titel lautet
  `[Radiale Basisfunktionen für verstreute Punkte]`. EXTRA, weil das Thema nur auf einer
  Anhangsfolie (Deck 15) steht.

## 3. Gestrichen (Dubletten, Meta, Wiederholungen)

- **S136**: „Das holen wir jetzt nach.“ und „Zuerst brauchen wir ein Maß …“
  (Ankündigungen). „Zwei Details der Definition“ ist auf einen Satz gekürzt;
  dass die Randpunkte Knoten sind, steht schon in der Definition. Absatz „Die
  Voraussetzung f ∈ C⁴ … drei Faktoren“ gestrichen; der `smooth-function`-Link
  sitzt jetzt in Punkt 2 der Bemerkung. Ebenfalls gestrichen:
  „Zwei Beobachtungen.“, die Verhältniszahlen 0,33 … 0,20, „Damit sind die
  theoretischen Eigenschaften … beisammen.“ und „Genau so rechnet das Widget
  oben.“. Im Interaktiv-Nachtext fällt die Wiederholung von 0,71/„unter null“
  weg (steht im Beispiel).
- **S137**: „In diesem Abschnitt rechnen wir …“ gestrichen. Punkt 2 der
  Fehlerannahme (Identifizierbarkeit) ist als Halbsatz in Punkt 1
  eingefaltet. Gestrichen wurde der Absatz „i-te Zeile / k-te Spalte“ als
  Dublette zu S132 `#was-in-b-steckt…`; stattdessen steht dort „Das ist die
  Matrix aus @satz:das-interpolationsproblem-ist-ein“. Weitere Streichungen:
  - Absatz „Bei K = n ist B quadratisch …“ (doppelt zur Definition und zu Quiz Q3).
  - Vorspannsatz „Unterschieden werden sie allein durch die Größe des
    Ansatzraums“: Er widersprach der Definition direkt darunter.
  - Lack-of-fit-Klausel zu σ̂; Cox-de-Boor/Cholesky-Details im Widget-Vortext.
  - „Drei Beobachtungen ordnen …“, „Drei Details.“ und „Ausgaben drucken wir
    hier keine ab …“.
  - Der doppelte „Anschaulich …“-Satz in der Schoenberg-Whitney-Vertiefung.
  - **Quiz Q7 (λ → ∞)**: Der Stoff steht nur in der Vertiefung.
- **S138**: gestrichen wurden:
  - Meta-Satz „Dieser Abschnitt macht …“, „Zwei Eigenschaften … sind wichtig“
    und „Die Annahmen sind wesentlich …“.
  - Im Heuristik-Block die Sätze „Der Exponent 1/9 entsteht aus 8 + 1 …“ und
    „punktweise notiert …“.
  - „Zwei Beobachtungen.“ und der Satz zum diskreten Optimum.
  - „Grün steht in beiden Tafeln …“, im Widget-Nachtext die zweite
    Beschreibung des Auffächerns (sie steht schon im Varianz-Vorspann) und
    „Beide gehen auf die Log-Likelihood zurück“.
  - Der Mittelsatz der Q2-Erklärung.

  Minimax-Hinweis und Ein-Neuntel-Absatz sind je auf einen Satz gekürzt; die
  Rechnung ist unverändert.
- **S139**: gestrichen wurden:
  - **`#drei-stellschrauben-drei-wirkungen` samt Label** (refs = 0, im ganzen
    Repo gegrept). Das war die zweite Zusammenfassung; ihr Inhalt steht jetzt
    als ein Satz mit drei Verweisen in Kernkonzepte Punkt 2.
  - **Kapitel-Quiz Q11** (Bias monoton): Dublette zu S138 Q1.
  - Die Selbsttest-Einleitung und die GiB-Nebenrechnung.
  - Der (d+1)^k-Satz in der Tensorkapitel-Bemerkung.
  - Der Rückverweis auf das Balance-Modell in `#was-die-rate…`.

  Die beiden Zähl-Absätze des GAM sind zu einem zusammengezogen, der KAN-Absatz
  der ML-Vertiefung ist auf einen Satz mit Verweis auf S131 gekürzt. Die
  Kernkonzepte sind von 500 auf 363 Wörter gekürzt: keine Nebensätze zu
  „anderen Verfahren“, kein farbiger `<span>` mehr, ein Satz je Punkt plus
  Verweis. Die neun Punkte bleiben.

## 4. Reparierte Fehler

- **S139, Schätzfrage**: Der Vortext sagte „eine Variable weglassen“, gerechnet
  wird aber p = 10 → 8. Jetzt steht dort „zwei Variablen“, ebenso in `verdeckt`.
  Deren Schluss („K steht im Exponenten der Basis, p im Exponenten selbst“) war
  unklar und lautet jetzt: Die Verdopplung von K verdoppelt alle acht Faktoren
  von K⁸, das Weglassen spart nur zwei Faktoren 10. Props sind unverändert.
- **S139, Quiz „Grad wächst“**: Der Schlusssatz „Am wachsenden maximalen Grad
  hängt, dass die Oszillationen … ausbleiben“ sagte das Gegenteil. Jetzt: Weil
  der Grad bei Splines nicht mitwächst, treten sie nicht auf.
- **S139, Quiz Q12**: `minimax-` am Zeilenende erzeugte „minimax- optimale“;
  der Ausdruck steht jetzt auf einer Zeile.
- **S139**: „die Identitätslink“ → „den Identitätslink“. Label-Titel „Was
  Kapitel 9 …“ → „Was das Tensorkapitel …“; die ID bleibt.
- **S137**: zwei getippte „Kapitel 7“ → `@kap:kq`. In Q1 war „überanpasst“ kein
  Verb; die Erklärung belegt die Aussage jetzt mit der Tabelle (K = 40:
  kleinste RSS, größter Abstand).
- **S138**: „und steuert die Glattheit“ → „steuern“.
- **S136, Punkt 3 der Schranken-Bemerkung**: „wo f stark gekrümmt ist und
  schwingt“ ist ungenau, denn Krümmung ist f″, die Schranke hängt aber an
  f⁽⁴⁾. Jetzt steht dort „wo |f⁽⁴⁾| groß ist, f also stark von einem kubischen
  Polynom abweicht“, wie auf der Folie.
- **S136, `verdeckt`**: Dort stand, der Faktor „nähert sich erst am rechten
  Ende: 21,59, 21,44 und schließlich 16,91“, als lägen 21,59 und 21,44 schon
  nahe bei 16. Die Werte stehen jetzt bei den schwankenden groben Gittern. Die
  Zahlen sind unverändert.
- **Terminologie S136**: „vollständiger“ → „eingespannter“ Spline, wie in
  S134/S135 und auf der Folie.
- **Titel-Tells**: Überschriften S138 „Bias/Varianz: der Preis für …“ →
  „Bias/Varianz: zu wenige/zu viele Basisfunktionen“; „Der Preis.“ →
  „Die Einschränkung.“. Umbenannte Interaktiv-Kästen:
  - „Zwölf Kurven, drei Balken, ein Regler“ → „Bias, Varianz und MSE in der
    Simulation“
  - „Zwei Kurven auf logarithmischer Achse“ → „Koeffizientenzahl von
    Tensorprodukt und additivem Modell“

  Umbenannte Bemerkungstitel (IDs unverändert):
  - „Schranke und Messung sind zweierlei“ → „Schranke und gemessener Fehler“
  - „… wirklich lösen“ → „… numerisch lösen“
  - „… erzählt“ → „… besagt“
  - „Der Gewinn, und was er kostet“ → „Vorteile und Grenzen additiver Modelle“

## 5. Ermessen und offene Fragen

1. **S137, R-Code** (nicht angefasst, Brief §5): Die Folie übergibt schon im
   ersten Aufruf `bs(x, …, Boundary.knots = c(0, 2 * pi))`, das Skript nicht.
   Dann liegen die Randknoten von `B` auf `range(x)`, und `x_new` auf
   [0, 2π] ragt darüber hinaus; `bs()` warnt vermutlich. Im Container gibt es
   kein R, ungeprüft. Soll der Code der Folie folgen?
2. **Prüfscript-Kommentare veraltet** (fremde Datei, nicht geändert):
   `scripts/verify/REV29/13-funktionsapproximation-S139Skalierung.mjs`. Z. 45
   sagt „74,5 GiB (steht so im Fließtext)“, der Satz ist gestrichen. Z. 53 sagt
   „eine Variable weniger“, richtig sind zwei. Die Prüfung selbst läuft grün.
3. **S138 bei −16,8 %**, unter dem Planziel von −19 bis −22 %. Der Abschnitt
   ist Klausurstoff (ws2526-2), und der Plan sieht keine Verlagerung vor. Noch
   mehr Kürzung hätte Quiz-Begründungen oder die Balance-Rechnung angegriffen.
4. **Gesamtumfang Teil 2 −13,6 %** (Brief: 5–10 %). Der Großteil sind echte
   Dubletten (Q7, Q11, Stellschrauben, Nachbetrachtungen); die Vertiefungen
   sind um 36 % gewachsen.
5. **S139: drei Vertiefungen hintereinander** (Stone-Rate, RBF, Splines im ML).
   Ich habe sie getrennt gelassen, weil es drei Themen sind, jedes über
   60 Wörter. Sie ließen sich zu einer Ausblick-Box zusammenlegen.
6. **Folienabgleich**:
   - Die h⁴-Tabelle der Folie hat eine Zeile mit 7 Knoten, die im Skript fehlt;
     dafür hat das Skript 33/65/129 Knoten. Keine Zahl ergänzt.
   - Die Bias-Varianz-Zahlen der Folie (K = 5: 0,416/0,421, äquidistantes
     Design) weichen von den eigenen Simulationszahlen des Skripts ab
     (0,4103/0,4147, feste Zufallsstellen). Das war schon so.
7. **Entfernte Konzeptlinks**: `likelihood` fehlt jetzt in Kapitel 13 (war nur
   in S138 verlinkt, sonst im Skript mehrfach). `taylor-theorem` steht in S136
   nur noch in der Vertiefung; S134 verlinkt es weiter.
8. Plan-Posten S137 „Folienzeile zum Strafterm in den Haupttext holen“: umgesetzt
   ohne `mgcv::gam()`, das S138 nennt; stattdessen der Folienbegriff „Grundlage
   der additiven Modelle“.

## 6. Prüfungen

- `npm run typecheck:mdx`: Exit 0 (206 Dateien), nach jeder Datei und am Ende.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen, nach jeder Datei und
  am Ende. Gemeldet wird nur „Tabelle ist nicht aktuell“, was erwartet ist.
- `npm run test:mdx`: Exit 0 (137/137 Fixtures, Orakel-Regressionstest bestanden).
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich. Die
  `\cbblue`-FEHLER-Zeile ist der bekannte Negativtest.
- Gedankenstriche: S136 1, S137 1 (in `verdeckt`), S138 0, S139 1 (in
  `verdeckt`), kein „—“.
- Fehler in fremden Dateien: keine beobachtet.
