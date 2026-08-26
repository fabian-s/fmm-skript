# Kürzungs-Review: Kapitel 10 „Differentialrechnung"

**Kapitel:** `skript/src/chapters/10-differentialrechnung/` (S101–S109, Abschnitte 10.1–10.9)
**Decks:** `slides/10-ableitungen-I.qmd` (3 042 W) **und** `slides/11-ableitungen-II.qmd` (4 672 W) — **zwei** Vorlesungen
**Umfang Skript:** 36 861 Wörter (längstes Kapitel; ~4,8× der beiden Decks zusammen)

**Geschätzte Aufteilung**

| Klasse | Wörter | Anteil |
| --- | ---: | ---: |
| KERN (steht so/ähnlich auf den Folien) | ~14 400 | 39 % |
| BRÜCKE (nötig zum Verständnis des Kerns) | ~8 900 | 24 % |
| EXTRA (über die Folien hinaus) | ~13 600 | 37 % |

Zum Vergleich: die beiden Decks haben zusammen 24 Anhang-/„uncounted"-Folien bzw.
Beweisskizzen, die im Skript durchweg als **vollausgeführte Sätze mit Beweis** im Hauptstrang
stehen. Das ist der größte einzelne Grund für den EXTRA-Anteil.

---

## 1. Abschnittstabelle

| Datei | Abschnitt | Wörter | EXTRA | Ein-Satz-Urteil |
| --- | --- | ---: | ---: | --- |
| S101 | 10.1 Ableitung als lineare Approximation | 2 761 | ~15 % | Der schlankeste und beste Abschnitt des Kapitels — nichts anfassen. |
| S102 | 10.2 Der Gradient | 3 510 | ~25 % | Kern sitzt; EXTRA ist die Konvergenzraten-Analyse ρ(α) des Abstiegs-Widgets, die zu Kapitel 12 gehört. |
| S103 | 10.3 Die Jacobimatrix | 4 093 | ~35 % | Gute Substanz, aber der Backprop-Teil (1 190 W) ist eine Folie, und der Kettenregel-Beweis wird in 10.6 ein zweites Mal geführt. |
| S104 | 10.4 Matrixableitungen | 4 245 | ~40 % | Definitionen/Identitäten sind Kern; Matrix Completion (1 107 W) und das Jacobi-Diagonalbeispiel stehen auf den Folien nur im **Anhang**. |
| S105 | 10.5 Stetigkeit & Linearität | 3 214 | ~30 % | Solide, aber der Einstieg wiederholt 10.1–10.4 und Beispiel 10.5.3 dupliziert Bemerkung 10.1.2 fast wörtlich. |
| S106 | 10.6 Produkt- & Kettenregel | 4 667 | ~35 % | Sehr gut gebaut; die logistische Regression (790 W) ist auf den Folien Anhang, nicht Vorlesungsstoff. |
| S107 | 10.7 Höhere Ableitungen | **5 513** | ~40 % | Längster Abschnitt, **kein einziger `:::vertiefung`-Block**, und er enthält zwei Beweise, die die Vorlesung nur zitiert. |
| S108 | 10.8 Taylorapproximation | 4 518 | ~35 % | Kern (Taylorpolynom, Korollar 10.8.9, Newton) sitzt; die beiden vollständigen Taylor-Beweise sind Folien-Anhang. |
| S109 | 10.9 Zusammenfassung | 4 340 | ~65 % | Der klarste Kürzungskandidat: dreifache Wiederholung desselben Stoffs plus 2 072 W Selbsttest mit Dubletten. |

---

## 2. Prüfung der bestehenden `:::vertiefung`-Blöcke

14 Blöcke im Kapitel (S101:1, S102:2, S103:2, S104:3, S105:1, S106:2, S107:**0**, S108:3, S109:**0**).

**Befund 1 — die Markierung trägt derzeit fast nichts.** Alle 14 Blöcke sind reine
*Widget-Rahmen*: 2–6 Zeilen Bedienhinweis plus `<Widget />`. Der eigentliche Zusatzinhalt —
die inhaltliche Auswertung („Wie das Widget zeigt, …") — steht jeweils **hinter** dem
schließenden `:::` im normalen Fließtext. Beispiele: S102:460–469 (226 W Konvergenzraten),
S103:335–346 (254 W), S104:273–280, S104:648–656, S108:511–524, S108:657–671.
Wer beim Lernen „Vertiefung überspringt", spart also 130–190 Wörter Bedienhinweis und liest
den Zusatzstoff trotzdem. **Empfehlung: die Nachbereitungsabsätze in den jeweiligen
`:::vertiefung`-Block hineinziehen** — kostet keine Substanz und macht das Signal erst wirksam
(~1 500 W werden dadurch als überspringbar sichtbar).

**Befund 2 — Kernstoff steckt in keiner Vertiefung.** Die vier ungerahmten Widgets
(`Gradientenfeld` S102:249, `LinearisierungsWidget` S103:326, `MerkregelDiagramm` S105:212,
`HesseSchaetzung` S107:476) sind zu Recht ungerahmt: alle vier illustrieren Folieninhalte
(Gradient ⊥ Höhenlinie, Jacobi-Linearisierung, diff ⇒ stetig, Definitheit im kritischen
Punkt). Hier ist nichts zu ändern.

**Befund 3 — umgekehrt fehlt die Markierung dort, wo sie am nötigsten wäre.** S107 (der
längste Abschnitt) und S109 haben null Vertiefungen, obwohl S107 zwei Folien-Anhang-Beweise
im Hauptstrang führt. Siehe Empfehlungen 2, 4, 6, 11.

---

## 3. Priorisierte Empfehlungen

Sortiert nach *Ersparnis pro Qualitätsverlust*.

### E1 — S109 Zusammenfassung entdreifachen · **STREICHEN ~760 W**
`S109.mdx:6–158` (Bemerkung 10.9.1 „Fünf Begriffe" + 10.9.2 „Vier Bausteine" +
Beweismuster-Absatz, 1 110 W) und `S109.mdx:248–267` (Tabelle „Das Wichtigste in Kürze",
320 W) und `S109.mdx:261–267` („Vier Dinge nehmen wir mit", 57 W) sagen **dreimal
hintereinander dasselbe**. Deck 10/11 haben je einen Wrap-up-Slide mit ~40 Wörtern.

**Aktion:** Die Tabelle (250 W) behalten — sie ist die beste der drei Fassungen. 10.9.1/10.9.2
auf je einen Absatz pro Abschnitt eindampfen (~350 W statt 1 110 W); den
Beweismuster-Absatz (`S109:142–158`, 171 W) behalten, er sagt als einziger etwas, das
nirgends sonst steht. Den „Vier Dinge"-Absatz streichen.
**Abhängigkeiten:** keine — kein anderes Kapitel referenziert 10.9.1/10.9.2.

### E2 — S104 Matrix Completion als Vertiefung · **MARKIEREN 884 W**
`S104.mdx:487–634`, Satz 10.4.12 + Beweis (3 Schritte), Algorithmus 10.4.13, Nichtkonvexitäts-
und Nichteindeutigkeitsdiskussion. Auf **Deck 10 ist das eine `visibility="uncounted"`-
Anhangfolie** („Anwendung: Matrixzerlegung & Matrix Completion"). Das Widget (`S104:639–646`)
ist bereits `:::vertiefung`; der ganze mathematische Unterbau davor nicht.

**Aktion:** Den kompletten Unterabschnitt „Anwendung: Matrixzerlegung und Matrix Completion"
in `<ExpandedReading>` bzw. `:::vertiefung` legen (Widget + Nachbereitung `S104:648–656`
gleich mit hinein). Nichts streichen — die Rechnung ist korrekt und schön.
**Abhängigkeiten:** keine externen Verweise auf 10.4.12/10.4.13 (`grep` über `src/` negativ).

### E3 — S106 Logistische Regression als Vertiefung · **MARKIEREN 719 W**
`S106.mdx:591–705` (Einleitung + Beispiel 10.6.10 + Bemerkung 10.6.11 „Fehler mal Merkmal",
605 W) plus Nachbereitung `S106:716–726` (114 W). Auf **Deck 11 steht das als
„Alternatives Beispiel (Kettenregel): Logistische Regression" im Anhang**, ausdrücklich als
Alternative zur KQ-Anwendung, die tatsächlich vorgetragen wird.

**Aktion:** Unterabschnitt in `:::vertiefung`. Das Widget ist bereits gerahmt und wandert mit.
Bemerkung 10.6.11 (drei Konsequenzen, davon zwei rein interpretativ) bei der Gelegenheit auf
die erste Konsequenz + die Schranke |ŷ−y|<1 kürzen: weitere ~80 W.
**Abhängigkeiten:** keine externen Verweise auf 10.6.10/10.6.11.

### E4 — S107 Beweis zum Satz von Schwarz als Vertiefung · **MARKIEREN 387 W**
`S107.mdx:160–225`, vier annotierte Beweisschritte (doppelte Differenz, zweimal
Mittelwertsatz). **Deck 11 gibt Satz 10.7.4 ohne jeden Beweis** und nennt nur die Folgerung
„H_f symmetrisch". Der Beweis ist der zweitlängste Einzelbeweis des Kapitels und der
technischste; für die Prüfungsvorbereitung ist er entbehrlich, die **Aussage** nicht.

**Aktion:** Satz 10.7.4 (`S107:150–158`) im Hauptstrang lassen, den `::::beweis`-Block in
`:::vertiefung` legen. Bemerkung 10.7.5 („was die Symmetrie spart") bleibt im Hauptstrang, sie
steht als Folienbullet.
**Abhängigkeiten:** Satz 10.7.4 wird zitiert in `11-konvexitaet/S114.mdx:636`,
`12-optim/S124.mdx:38`, sowie kapitelintern in 10.7.6/10.7.9/10.8. Alle Verweise gelten der
**Aussage**, keiner dem Beweis — Markieren ist unkritisch, Streichen wäre es auch, aber der
Beweis ist gut und sollte erhalten bleiben.

### E5 — S108 die beiden Taylor-Beweise als Vertiefung · **MARKIEREN 774 W**
- `S108.mdx:83–176` (484 W): Beweis zu Satz 10.8.2 (Taylor I), fünf Schritte mit
  Hilfsfunktionen F, G, Teleskopsumme und Cauchy-Mittelwertsatz.
- `S108.mdx:329–408` (290 W): Beweis zu Satz 10.8.7 (Taylor II) mit Integralrestglied plus
  Bemerkung 10.8.8 („Warum hier die Integralform steht").

**Deck 11 verweist für beide ausdrücklich auf den Anhang** („*Beweisskizze: → Anhang*"), und
selbst dort stehen nur Skizzen. Die Skript-Fassungen sind vollständige Beweise.
**Aktion:** Beide `::::beweis`-Blöcke plus Bemerkung 10.8.8 in `:::vertiefung`. Die Sätze
10.8.2/10.8.7 und Bemerkung 10.8.3 (zwei Restglieder, Grenzfall k=1) bleiben Hauptstrang —
Bemerkung 10.8.3 ist der Anschluss an Satz 10.1.3 und trägt.
**Abhängigkeiten:** Satz 10.8.2 → `11-konvexitaet/S114.mdx:509`; Satz 10.8.7 →
`12-optim/S124.mdx:14`. Beide zitieren nur die Aussage.

### E6 — S103 Backprop-Aufwandsanalyse als Vertiefung · **MARKIEREN 465 W**
`S103.mdx:547–601`: Bemerkung 10.3.13 („Wie die Kette ausgewertet wird", Klammerungskosten
1 200 vs. 10 500 Multiplikationen), Widget-Rahmen und Nachbereitung. Auf **Deck 11 ist
Backpropagation genau eine Folie**, die die Jacobi-Kette hinschreibt und in einem Satz sagt
„Backpropagation = effiziente Berechnung dieser Kette".

**Aktion:** Bemerkung 10.3.13 + Widget + Nachbereitung in einen `:::vertiefung`-Block
zusammenziehen. Bemerkung 10.3.10 (die Kette selbst, `10.3.3`) und Beispiel 10.3.12
(ReLU-Jacobimatrix, `10.3.4`) bleiben Kern — die Folie zeigt genau diese beiden Formeln.
Bemerkung 10.3.11 („Wo die Kette aufhört", 130 W) ist eine echte Stolperstellen-Warnung und
sollte im Hauptstrang bleiben.
**Abhängigkeiten:** kapitelintern nur aus dem Selbsttest 10.3 und 10.9.

### E7 — Kettenregel wird zweimal bewiesen · **STREICHEN ~264 W (ZUSAMMENLEGEN)**
`S103.mdx:370–431` (Beweis zu Satz 10.3.9, Kettenregel für Jacobimatrizen, 264 W) und
`S106.mdx:424–502` (Beweis zu Satz 10.6.8, allgemeine Kettenregel, 410 W) führen **dasselbe
Argument in derselben Reihenfolge**: Zuwachs k := f(x+h) − f(x) abkürzen, ‖k‖ ≤ (M_f+1)‖h‖
abschätzen, Linearität zum Aufspalten, Beschränktheit für den einen Restterm, Bezugspunkt-
wechsel für den anderen. Deck 11 beweist die Kettenregel **einmal**, allgemein, und gibt die
Jacobi-Fassung als eine von fünf Bauformen.

**Aktion:** Den Beweis in 10.3 auf 3–4 Sätze eindampfen („dieselbe Rechnung wie in
Satz 10.6.8, hier in Koordinaten: …") **oder** — didaktisch sauberer — Satz 10.3.9 in 10.3
ohne Beweis stellen mit Vorwärtsverweis auf 10.6.8. Skript verweist bereits in
`S106:400–406` rückwärts („Für Jacobimatrizen haben wir die Regel in Abschnitt 10.3 schon
bewiesen"), die Doppelung ist also bewusst; sie kostet aber 264 W an einer Stelle, an der
Studierende die abstrakte Fassung noch gar nicht kennen.
**Abhängigkeiten:** Satz 10.3.9 wird intern viermal zitiert (10.3.12, 10.6.9, 10.9.1) — nur
die Aussage.

### E8 — S105 Betragsfunktion wird zweimal vermessen · **STREICHEN ~175 W**
`S105.mdx:154–193` (Beispiel 10.5.3, 235 W) rechnet die einseitigen Differenzenquotienten von
|x| in 0 aus — dieselbe Rechnung steht bereits in `S101.mdx:92–111` (Bemerkung 10.1.2), und
Beispiel 10.5.3 sagt das selbst („Wir haben diesen Knick in Abschnitt 10.1 schon vermessen").
Deck 11 wiederholt sie, weil zwischen den beiden Vorlesungen eine Woche liegt — im
durchgelesenen Skript liegt dazwischen ein Abschnitt.

**Aktion:** Auf ~60 W kürzen: Stetigkeit in 0 (zwei Zeilen) plus Rückverweis auf
Bemerkung 10.1.2 für die Nichtdifferenzierbarkeit. Der eigentliche Punkt von 10.5.3 ist ja
nur, dass die *Umkehrung* von Satz 10.5.2 falsch ist.
**Abhängigkeiten:** 10.5.3 wird in 10.5.4, im Selbsttest 10.5 und in 10.9.2 zitiert — alle
Verweise überleben die Kürzung.

### E9 — S105 „Woran wir anknüpfen" kürzen · **STREICHEN ~240 W**
`S105.mdx:4–60` (363 W) wiederholt Definition 10.1.5 im Volltext samt Gleichung `(10.5.1)`,
die Notationsklärung zu 𝔻/𝔼, die drei konkreten Gestalten und die Vorkenntnisliste. Das ist
die Übersetzung der „Verwendete Vorkenntnisse"-Folie von Deck 11 — sinnvoll für eine
Vorlesung nach einer Woche Pause, im Skript direkt nach 10.4 eine Wiederholung.

**Aktion:** Auf ~120 W kürzen: Gleichung `(10.5.1)` behalten (sie wird in jedem Beweis dieses
Abschnitts referenziert), die Liste der drei Gestalten und die Vorkenntnis-Aufzählung durch
zwei Sätze mit Abschnittsverweisen ersetzen. Der Fahrplan-Absatz (`S105:55–60`) bleibt.
**Abhängigkeiten:** `(10.5.1)` wird in 10.5.2/10.5.5 und in 10.6.3 gebraucht → **die
Gleichungsnummer muss stehen bleiben**.

### E10 — S104 Jacobi-Formel-Diagonalbeispiel als Vertiefung · **MARKIEREN 331 W**
`S104.mdx:194–259`: Beispiel 10.4.5 (Determinantenableitung von diag(x, 2x) direkt und über
die Jacobi-Formel) plus Bemerkung 10.4.6. Auf **Deck 10 steht das Rechenbeispiel im Anhang**
(„Beispiel: Ableitung der Determinante", `visibility="uncounted"`); die Hauptfolie verweist
darauf.

**Aktion:** Beispiel 10.4.5 in `:::vertiefung`; **Bemerkung 10.4.6 im Hauptstrang lassen** —
die log-det-Formel für die Score-Funktion des Normalmodells ist die Begründung dafür, dass
die Jacobi-Formel im Kurs überhaupt vorkommt (Folie: „wichtig z.B. für Ableitungen von
Likelihood-Funktionen"). Ersparnis dann ~250 W.
**Abhängigkeiten:** 10.4.5 wird nur im eigenen Vertiefungs-Widget und im Selbsttest zitiert.

### E11 — S107 Beweis zu Satz 10.7.17 · **STREICHEN 213 W**
`S107.mdx:755–805`. Der Beweis sagt in Schritt 2 selbst, worum es geht: „reine Buchführung
über Indexnamen … Benennen wir links i in l und j in i um, so stehen zweimal dieselben
Summanden." Deck 11 stellt die Formeln in den Anhang („Höhere Ableitungen für
Vektor-zu-Vektor: explizite Formeln"), ohne jede Herleitung.

**Aktion:** Beweis streichen und durch einen Satz ersetzen („Beide Seiten stimmen nach
Umbenennung der Summationsindizes überein; der Satz von Schwarz wird nirgends gebraucht.").
Schritt 3 (Kontrolle m=1 gegen Satz 10.7.6, ~60 W) behalten, er ist die einzige inhaltliche
Aussage des Beweises.
**Abhängigkeiten:** 10.7.17 nur aus 10.9.2 zitiert.

### E12 — S107 Bemerkung 10.7.12 und 10.7.16 als Vertiefung · **MARKIEREN ~410 W**
- `S107.mdx:524–545` (219 W), Bemerkung 10.7.12 „Warum die Menge offen und konvex sein muss"
  mit zwei konstruierten Gegenbeispielen.
- `S107.mdx:660–698` (191 W), Bemerkung 10.7.16 „Cramér-Rao, sauber formuliert".

Beides ist über Deck 11 hinaus (dort: zwei Zeilen zu Konvexität, drei zu Cramér-Rao). Beides
ist aber **inhaltlich wertvoll**, weil es je eine kursierende Halbwahrheit richtigstellt.
**Aktion:** Als Vertiefung markieren, nicht kürzen.
**Abhängigkeiten:** ⚠️ Bemerkung 10.7.12 wird **extern zitiert**
(`11-konvexitaet/S114.mdx:538`: „Bemerkung 10.7.12 führt beide Fälle mit Gegenbeispielen
vor"). Markieren ist fein, Streichen wäre ein Bruch.

### E13 — S102 Konvergenzraten-Analyse des Abstiegs kürzen · **STREICHEN ~120 W**
`S102.mdx:443–447` und `S102.mdx:460–469` (zusammen 226 W): ρ(α) = maxᵢ|1 − αλᵢ|, optimales
α = 2/(λ_min+λ_max), Divergenz ab 2/λ_max. Das ist Konvergenzanalyse des Gradientenverfahrens
und gehört nach `12-optim` — Deck 10 sagt zum Gradientenabstieg nur „α > 0: Lernrate".
Zusätzlich taucht dieselbe Analyse in `S107.mdx:574–588` (Bemerkung 10.7.13, ML-Absatz mit
κ = λ_max/λ_min und dem Faktor 0,447 **an derselben Matrix**) ein zweites Mal auf.

**Aktion:** Eine der beiden Stellen auf die Aussage „die Lernrate ist durch das
Eigenwertverhältnis begrenzt (→ Kapitel 12)" reduzieren. Die S107-Fassung ist die bessere,
weil sie den Bogen zur Hesse-Matrix schlägt; also in S102 kürzen und dorthin verweisen.
**Abhängigkeiten:** die Zahlfrage `S102:540–547` (α = 0,4) hängt daran — die Zahl steht aber
im Widget, die Frage bleibt beantwortbar.

### E14 — S104 dritte Rechnung für ∂‖X‖²_F/∂X · **STREICHEN ~110 W**
`S104.mdx:426–464` (Beispiel 10.4.11, 170 W). Dieselbe Rechnung steht bereits als Satz
10.4.10(3) mit Herleitung im Absatz `S104:414–424` („(10.4.12) ist der Spezialfall A = I")
und wird ein drittes Mal im Anstups-Widget und dessen Nachbereitung (`S104:480–485`)
vorgeführt, ein viertes Mal im Selbsttest `S104:727–733` und ein fünftes Mal in
`S109:352–363`.

**Aktion:** Beispiel 10.4.11 auf die Restterm-Rechnung kürzen (der Teil ab „Anders als in
Beispiel 10.4.9 ist der Restterm hier nicht null") — der ist der einzige, der etwas Neues
sagt. Den 1×2-Minimalfall streichen.
**Abhängigkeiten:** aus `S109:361` zitiert („Beispiel 10.4.11") — Verweis überlebt.

### E15 — Kleinere Streichungen · **STREICHEN ~230 W**
- `S106.mdx:314–331` Bemerkung 10.6.6 (Varianz einer Linearkombination, 96 W): dritte
  Anwendung derselben Produktregel-Bauform in Folge (nach 10.6.5 quadratische Form, vor
  10.6.7 Ridge), auf keinem Deck. **STREICHEN.** Keine Verweise.
- `S103.mdx:303–320` Bemerkung 10.3.8 (Determinante als Flächenfaktor, 150 W) + die
  zugehörige Widget-Nachbereitung: Deck 10 hat zwei Bilderfolien zur geometrischen Intuition,
  aber nichts zum Flächenfaktor oder zum Transformationssatz für Dichten.
  **MARKIEREN** statt streichen — der Bezug zur Wahrscheinlichkeitsrechnung ist wertvoll,
  und zwei Zahlfragen im Selbsttest 10.3 hängen daran.
- `S107.mdx:31–67` Definition 10.7.1: der 𝓛^j-Apparat mit Operatornorm (131 W) ist deutlich
  über Folienniveau (Deck 11 hat eine kompaktere, dafür ungenauere Fassung). Er wird
  **einmal** gebraucht, im Beweis zu Satz 10.8.7. **KÜRZEN um ~60 W**, indem die
  Operatornorm-Definition zur Fußnote/Vertiefung wird; ebenso den Punkt „Warum die
  Operatornorm entscheidend ist" in Bemerkung 10.7.2 (~60 W).
- `S108.mdx:613–636` Bemerkung 10.8.13, zweiter Absatz (Score-Entwicklung → asymptotische
  Normalität, ~90 W): Deck 11 nennt nur „Maximum-Likelihood-Schätzung; IRLS/IWLS für GLMs;
  Trust-Region". **MARKIEREN.**

### E16 — S109 Selbsttest: echte Dubletten · **STREICHEN ~600 W**
`S109.mdx:284–593` sind 2 072 Wörter Selbsttest in zwei Runden (17 Fragen). Aufgaben sind
laut Auftrag kein Kürzungsziel — gemeldet werden hier nur die **wörtlichen Dubletten** zu
den Abschnitts-Selbsttests:

| S109-Frage | dupliziert |
| --- | --- |
| `S109:365–376` „Weil L skalar ist, ist jede Jacobimatrix ein Zeilenvektor" | `S103:659–668` (Auswertungsreihenfolge, dieselben Zahlen 1 200/10 500) |
| `S109:352–363` „f(X)=‖X‖²_F, x₁₂ um h erhöhen" | `S104:727–733` (Anstups-Zahlfrage, derselbe Restterm h²) |
| `S109:414–422` Zahlfrage „Richtungsableitung längs der Höhenlinie" | `S102:532–538` (Kompass-Zahlfrage, dieselbe Aussage cos 90° = 0) |
| `S109:578–591` Zahlfrage „Faktor 4 für T₁" | `S108:720–730` (dieselbe Aussage, dieselben Zahlen 4,34/8,07) |
| `S109:403–412` „Wirbel: det J = 1" | `S103:670–678` + Nachbereitung `S103:343–346` |

**Aktion:** Diese fünf streichen. Die übrigen zwölf sind *neue* Aufgaben (Gegenbeispiel
partielle Ableitungen ohne Differenzierbarkeit, Schwarz-Gegenbeispiel, det H < 0 in ℝ²,
o-Aussage vs. Schrittfaktor, Newton auf ½xᵀAx − bᵀx, kritischer Punkt konvexer Funktionen) —
die sind das Beste am Abschnitt und dürfen nicht angetastet werden.

---

## 4. Summe der empfohlenen Ersparnis

| Aktion | Wörter | Anteil am Kapitel |
| --- | ---: | ---: |
| **STREICHEN** (E1, E7, E8, E9, E11, E13, E14, E15-Teil, E16) | **~2 710** | 7,4 % |
| **ALS VERTIEFUNG MARKIEREN** (E2, E3, E4, E5, E6, E10, E12, E15-Teil) | **~4 220** | 11,4 % |
| zusätzlich sichtbar überspringbar durch Umrahmung der Widget-Nachbereitungen (Befund 1) | ~1 500 | 4,1 % |
| **Summe „darf ein Prüfling überspringen"** | **~8 430** | **22,9 %** |

Nach Umsetzung: ~34 150 Wörter Lauftext, davon ~5 700 als Vertiefung gekennzeichnet, also
~28 400 Wörter Pflichtstrang gegenüber jetzt 36 861 — eine Reduktion des *zu lesenden*
Kernstoffs um rund 23 %, ohne dass ein einziger Satz, Beweisschritt oder Zahlenwert
verlorenginge, den ein Studierender für die Folien braucht.

---

## 5. Redundanz Prosa ↔ Widget

Sechs Nachbereitungsabsätze protokollieren im Wesentlichen Zahlen nach, die im Widget
ablesbar sind. Sie sind nicht wertlos — jeder zieht am Ende eine Pointe —, aber der
Zahlenteil ist ersetzbar:

- `S103:335–346` (254 W): drei Voreinstellungen mit Zahlen 5,24 / 5,015 / 1,65 / 1,000.
  Pointe („Flächentreue heißt nicht Linearität") steht erst im letzten Satz.
- `S104:648–656` (223 W): k=1 vs. k=2 Vorhersagen 2,5/2,4 gegen 1,583/0,909 plus
  Lernraten-Schwellen 0,14/0,25. Pointe: „Größerer Rang heißt nicht bessere Rekonstruktion."
- `S108:511–524` (258 W): Faktoren 4,34 / 8,07 / 3,99 / 8,78 / „ungefähr 16".
- `S108:657–671` (183 W): Iterationsfolge 1,25 / 1,025 / 1,00030 / 1,00000005 mit
  Fehlerspalte — hier ist das Nachprotokollieren berechtigt, weil quadratische Konvergenz
  ohne die Zahlenreihe nicht greifbar wird.
- `S102:460–469`, `S107:478–500`: siehe E13 bzw. E15.

**Empfehlung:** In den ersten drei Fällen je einen Zahlensatz behalten und die
Vollprotokolle streichen (~200 W); wichtiger ist aber, die Absätze in den
`:::vertiefung`-Block zu ziehen (Befund 1).

Redundanz zwischen Abschnitten, jenseits der oben genannten:
- **∇(xᵀAx) wird dreimal hergeleitet**: Satz 10.2.8 (Indexrechnung, 4 Schritte),
  Beispiel 10.6.5 (Produktregel), plus das Newton-Zwischenspiel `S108:544–550`. Das ist
  **didaktisch gewollt** (Indexrechnung vs. Regelkalkül ist genau die Pointe von 10.6) und
  entspricht den Folien, die es ebenfalls zweimal rechnen. **Nicht antasten.**
  Das *Gegenbeispiel* A = ((2,1),(0,3)) bzw. ((0,1),(0,0)) taucht allerdings **viermal**
  auf (`S102:382–386`, `S102:492–500`, `S106:299–307`, `S106:792–801`) — hier reicht dreimal.
- **Zeilen- vs. Spaltenkonvention** wird an fünf Stellen begründet (10.2.2, 10.2.11, 10.3.2,
  10.3.5, 10.9 „Zum Nachschlagen"). Das ist die zentrale Konvention des Kapitels und
  rechtfertigt Wiederholung; 10.3.5 könnte auf zwei Sätze.

---

## 6. Gefundene Fehler (nicht Kürzung, aber beim Anfassen mitzunehmen)

- **`S105.mdx:347`**: „Den Beweis lassen wir als Übung stehen." — steht **unmittelbar nach dem
  vollständig ausgeführten vierschrittigen Beweis** zu Satz 10.5.5. Offenbar ein Rest aus der
  Folienvorlage (Deck 11: „*Beweis:* → Übung"), der beim Ausbau des Beweises nicht entfernt
  wurde. Der Folgesatz („Die Rechnung dahinter ist genau die eben geführte") versucht die
  Kurve zu kriegen, macht es aber nur schlimmer.
- **`S107.mdx:388–392`** dokumentiert selbst eine Inkonsistenz: Index- und
  Ableitungsreihenfolge laufen in Definition 10.7.3 und Bemerkung 10.7.8 gegenläufig
  („sauberer wäre eine einheitliche Wahl"). Bei einer Überarbeitung des Abschnitts
  vereinheitlichen und die Bemerkung streichen (~50 W).

---

## 7. Gesamturteil (3 Sätze)

Überlang sind das Zusammenfassungs-Kapitel 10.9, das denselben Stoff dreimal referiert und
fünf Selbsttestfragen wörtlich aus früheren Abschnitten wiederholt, sowie vier
Anwendungs-/Beweisblöcke, die auf den Folien ausdrücklich im Anhang stehen (Matrix
Completion, logistische Regression, die beiden Taylor-Beweise) und im Skript als
Hauptstrang-Material erscheinen — dazu der 5 513 Wörter lange Abschnitt 10.7, der als
einziger keine einzige Vertiefungsmarkierung trägt, obwohl er den Beweis zum Satz von Schwarz
führt, den die Vorlesung nur zitiert. Genau richtig und unantastbar sind Abschnitt 10.1 (die
sauberste Einführung der Fréchet-Ableitung, die ich in einem BSc-Skript gesehen habe), die
Kette Definition → Format → Rechenbeispiel in 10.2–10.4, die Beweise zur Produkt- und
Kettenregel in 10.6 sowie sämtliche `:::frage`/`:::zahlfrage`-Blöcke der Abschnitte 10.1–10.8,
die durchweg an echten Fehlvorstellungen ansetzen. Der wirksamste Einzelgriff kostet gar
keine Substanz: die „Wie das Widget zeigt …"-Absätze stehen derzeit alle **außerhalb** der
`:::vertiefung`-Blöcke, sodass die Markierung nur den Bedienhinweis versteckt und nicht den
Zusatzstoff — sie hineinzuziehen macht auf einen Schlag ~1 500 Wörter als überspringbar
sichtbar.
