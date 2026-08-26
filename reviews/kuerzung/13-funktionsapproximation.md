# Kürzungs-Review: Kapitel 13 „Funktionsapproximation"

**Kapitel:** `skript/src/chapters/13-funktionsapproximation/` (S131–S139, 9 Abschnitte)
**Decks:** `slides/15-funktionsapproximation-I.qmd` (3 322 W) + `slides/16-funktionsapproximation-II.qmd` (3 176 W)
**Wörter gesamt:** 31 109 (davon 4 589 in `::::quiz`-Blöcken)
**Arbeitsstand:** wie auf der Platte, inkl. der uncommitteten Änderungen des Autors an `S136.mdx` (neue Vertiefungsprosa zum `sin(3πx)`-Widget) und an vier Widgets.

| Klasse | Wörter | Anteil |
|:--|--:|--:|
| KERN (steht so oder ähnlich auf den Folien, inkl. Aufgaben) | ≈ 17 600 | 57 % |
| BRÜCKE (nötig, damit der Kernstoff im Skript trägt) | ≈ 6 150 | 20 % |
| EXTRA (über die Folien hinaus) | ≈ 7 350 | 24 % |

Die Verhältnisse sind für ein Begleitskript unauffällig; das Kapitel ist nicht
flächig aufgebläht, sondern hat rund fünfzehn klar abgrenzbare Zusatzblöcke,
die zusammen etwa ein Viertel des Umfangs ausmachen.

---

## 1. Abschnittstabelle

| Datei | Titel | Wörter | davon Quiz | EXTRA | Urteil in einem Satz |
|:--|:--|--:|--:|--:|:--|
| S131 | Approximation, Interpolation, Glättung | 2 184 | 289 | ~22 % | Sitzt eng an der Einstiegsfolie; einziger Ballast sind die ML-Analogien-Kritik (13.1.6) und die Doppelung von Satz 13.1.8 durch Bemerkung 13.1.9. |
| S132 | Interpolation durch Basisdarstellung | 2 671 | 373 | ~27 % | Kernstoff der Folien plus drei Vertiefungsschichten (Auswertungsabbildung, Newton-Basis, Vorwärtssubstitutions-Exkurs), die sich alle rechtfertigen lassen, aber nicht alle nebeneinander. |
| S133 | Polynominterpolation | 3 540 | 415 | ~22 % | Sehr guter Abschnitt; nur die Vandermonde-Determinante und die Lebesgue-Konstanten gehen über die Folien hinaus. |
| S134 | Splines und B-Splines | 4 396 | 540 | ~22 % | Längster Abschnitt, der Beweis zu Satz 13.4.4 (380 W Induktion über abgeschnittene Potenzen) ist der größte Einzelblock des Kapitels und steht auf keiner Folie. |
| S135 | Minimale Krümmung | 3 233 | 376 | ~32 % | Höchster EXTRA-Anteil des Kapitels: Der Beweis selbst ist Folienstoff, aber die Nachbereitung (13.5.5) und die Existenzabzählung (13.5.7) sind zusammen 720 Wörter Zugabe, dazu eine überflüssige Spline-Wiederholung. |
| S136 | Approximationsfehler | 2 709 | 432 | ~23 % | Kompakt und gut; der komplette Rolle-Beweis für den linearen Fall (337 W) ist die einzige größere Zugabe und didaktisch wertvoll. |
| S137 | Glättung und Regression | 3 894 | 431 | ~22 % | Trägt die Folie sauber; Schoenberg-Whitney, die `Boundary.knots`-Falle und der Ridge-Vergleich sind Zusatz und teils Doppelung zu S134/S138. |
| S138 | Bias-Varianz und Modellwahl | 3 695 | 422 | ~22 % | Rechnerisch dichter als die Folie, aber jede Rechnung wird gebraucht; Ballast sind nur der σ-vs-σ²-Exkurs und die GCV-Herleitung. |
| S139 | Multivariat und Zusammenfassung | 4 787 | 1 307 | ~23 % | Zwei Drittel Abschluss-Apparat: 509 W Kernkonzepte, 1 307 W Kapitel-Selbsttest, dazu eine Vergleichstabelle, die schon Gesagtes ein viertes Mal aufschreibt. |

---

## 2. Priorisierte Empfehlungen

Sortiert nach Ersparnis pro Qualitätsrisiko. „Abhängigkeiten" = Verweise
innerhalb des Kapitels (`grep` über `src/`); **außerhalb des Kapitels
existieren keine Verweise auf Labels aus Kapitel 13** – nur zwei generische
Links auf `sec-13.1` aus `01-intro/S12.mdx:80` und `09-tensoren/S95.mdx:223`.
Kapitel 13 ist das letzte Kapitel, Streichungen sind also nach hinten
folgenlos.

### A. Als Vertiefung markieren (bleibt erhalten, verschwindet aus dem Lesefluss)

| # | Ort | Label | W | Aktion | Begründung | Abhängigkeiten |
|:--|:--|:--|--:|:--|:--|:--|
| A1 | `S134.mdx:107–167` | Beweis zu Satz 13.4.4 | 380 | VERTIEFUNG | Größter Einzelblock des Kapitels. Vier Beweisschritte mit Induktion über abgeschnittene Potenzen; die Folie („Warum $m+q$ Parameter?") macht nur die Abzählung, und die steht als Bemerkung 13.4.5 direkt darunter im Skript. Satzaussage bleibt im Fluss. | 13.4.5 verweist auf „Satz 13.4.4 liefert genau das nach"; 13.4.11 und Quiz S134 verweisen auf den Satz, nicht auf den Beweis. Unkritisch. |
| A2 | `S136.mdx:135–200` | Beweis zu Satz 13.6.5 | 337 | VERTIEFUNG | Sechs Schritte Rolle-Argument für die stückweise lineare Interpolation. Steht auf keiner Folie. Bemerkung 13.6.6 („Das Muster hinter dem Exponenten") erklärt die Pointe in 187 W ohne den Beweis. | Satz 13.6.5 wird 6× referenziert (13.6.3, 13.6.9, 13.8.3, Quiz S136, S139) – immer die Aussage, nie der Beweis. |
| A3 | `S135.mdx:312–350` | Bem. 13.5.7 (Existenz: die Abzählung geht auf) | 292 | VERTIEFUNG | Momentengleichung, Diagonaldominanz, Tridiagonalsystem. Auf keiner Folie; sachlich schön (es ist der tatsächliche Algorithmus), aber in der Prüfungsvorbereitung überspringbar. | Nur ein Verweis: 13.6.9 Punkt 1 („tridiagonales System"). Verweis auf die Vertiefung umbiegen. |
| A4 | `S139.mdx:147–198` | Beweis zu Satz 13.9.5 | 242 | VERTIEFUNG | Schritte 3–4 wiederholen die Ableitungs- und Einsetzrechnung aus Bemerkung 13.8.7 mit $p$ im Exponenten. Die Folie gibt nur $K \sim n^{1/(8+p)}$ und $O(n^{-8/(8+p)})$. | Keine. |
| A5 | `S137.mdx:234–263` | Bem. 13.7.7 (Schoenberg-Whitney) | 225 | VERTIEFUNG | Die Folie erledigt die Rangbedingung in einer Klammer („bei B-Splines: Schoenberg-Whitney-Bedingung"). Das Skript bringt die volle Indexbedingung plus eigene Gegenrechnung mit $K=35$. | 3 Verweise, alle im Selbsttest S137 und in 13.7.5. Aussage bleibt zitierbar. |
| A6 | `S138.mdx:478–502` | Bem. 13.8.13 (Warum der Nenner nötig ist) | 195 | VERTIEFUNG | Leave-one-out-Identität via Sherman-Morrison. Die Folie gibt die GCV-Formel ohne jede Herleitung. Der letzte Absatz („Faustregel") sollte im Fluss bleiben. | Keine. |
| A7 | `S139.mdx:349–371` | Bem. 13.9.11 (Radiale Basisfunktionen) | 160 | VERTIEFUNG | Steht nur im Folien-Anhang („Ausblick") als Stichwort. Vollwertiger Exkurs auf ein Verfahren, das im Kapitel nirgends wieder auftaucht. | Keine. |
| A8 | `S133.mdx:476–498` | Bem. 13.3.17 (Knoten anders legen) | 160 | VERTIEFUNG | Chebyshev-Knoten als Runge-Gegenmittel. Auf der Folie ist der einzige genannte Ausweg „stückweise Polynome → Splines"; Chebyshev kommt dort nur als *orthogonale Basis* vor, was etwas anderes ist. | 3 Verweise (13.3.12, Quiz S133, 13.9.13). Alle bleiben gültig. |
| A9 | `S133.mdx:408–417` | 2. Absatz von Bem. 13.3.14 (Lebesgue-Konstanten $\Lambda_n$) | 130 | VERTIEFUNG | Der erste Absatz (Faktor 4,03, Maximum am anderen Intervallende) ist genau die Folienaussage und bleibt. Die $\Lambda_n$-Werte für gleichmäßige und Chebyshev-Knoten sind Zusatz. | Quiz S133 zitiert den Faktor 4,03 aus Absatz 1. |
| A10 | `S139.mdx:329–340` | Bem. 13.9.10 (Warum das mehr ist als eine Notlösung) | 108 | VERTIEFUNG | Stone-Optimalität additiver Schätzer. Sachlich der stärkste Punkt für GAMs, aber auf keiner Folie und ohne Beweisskizze nur zitierbar. | Keine. |
| | | **Summe A** | **≈ 2 230** | | | |

*(Optional, wenn stärker gekürzt werden soll: `S134.mdx:354–379`, Beispiel
13.4.10 „Die Hutfunktionen", 193 W. Es ist die einzige Stelle, an der die
Cox-de-Boor-Rekursion konkret ausgerechnet wird – ich würde es behalten,
denn die Folie sagt zur Rekursion ausdrücklich „nur zur Referenz", und ohne
ein gerechnetes Beispiel bleibt sie im Skript genauso undurchsichtig.)*

### B. Streichen bzw. kürzen (echte Ersparnis)

| # | Ort | Label | W | Aktion | Begründung | Abhängigkeiten |
|:--|:--|:--|--:|:--|:--|:--|
| B1 | `S135.mdx:250–298` | Bem. 13.5.5 (Was die Randterme wirklich brauchen) | 428 | KÜRZEN auf ≈ 180 (Punkte 1–3 behalten; Absätze zu $h''(a)=h''(b)$, zum Gleichheitsfall bei $n=1$ und zur Voraussetzung $a=x_1$ streichen) | Längste Bemerkung des Kapitels. Die drei gestrichenen Absätze stehen inhaltlich **wortgleich** in den Selbsttestfragen desselben Abschnitts (`S135.mdx:498–506` = der $g''$-Punkt, `518–527` = der $n=1$-Punkt). Die Aufgabe trägt die Aussage, der Fließtext muss sie nicht vorwegnehmen. | 2 Verweise, beide auf 13.5.5 als Ganzes. **Ersparnis ≈ 250** |
| B2 | `S135.mdx:52–76` | Bem. 13.5.2 (Spline) | 194 | KÜRZEN auf ≈ 60 | Vollständige Wiederholung von Definition 13.4.1 und Beispiel 13.4.3 – drei Abschnitte vorher im *selben Kapitel*. Auf den Folien ist die Wiederholung berechtigt (neue Vorlesung, eine Woche später), im durchlaufenden Skript ist sie ein Migrationsartefakt. Genuin neu ist nur der Absatz zur Umbenennung $\xi_k \to x_{k+1}$; der muss bleiben, weil Satz 13.5.4 andere Buchstaben verwendet. | 4 Verweise auf das Label; Block bleibt bestehen. **Ersparnis ≈ 135** |
| B3 | `S139.mdx:474–506` | Tabelle „Die beiden Ansatzräume nebeneinander" + Bem. 13.9.13 | ~250 | STREICHEN oder ZUSAMMENLEGEN mit 13.9.12 Punkte 3–4 | Vierte Wiederholung derselben Zahlen: $\kappa_1 = 4{,}4\cdot10^{16}$ vs. $37$ steht bereits in 13.4.13, der Faktor 4,03 in 13.3.14, $O(Nq^2)$ vs. $O(n^3)$ in 13.4.14 *und* in 13.9.12 Punkt 4. Bemerkung 13.9.13 („Drei Stellschrauben") ist die einzige Zutat mit eigenem Wert – die drei Bullets als Absatz in 13.9.12 einhängen. | 13.9.13 hat keine eingehenden Verweise. **Ersparnis ≈ 200** |
| B4 | `S137.mdx:450–482` + `S138.mdx:518–534` | Bem. 13.7.14 (Penalized Splines / Ridge) + Bem. 13.8.15 (groß wählen und bestrafen) | 214 + 140 | ZUSAMMENLEGEN auf ≈ 200 | Beide sagen dasselbe: großzügiges $K$ plus Strafterm, formale Nähe zur Ridge-Regression aus 12.5, stufenloser statt ganzzahliger Regler, `mgcv::gam()`. 13.7.14 hat die Matrixform, 13.8.15 die effektiven Freiheitsgrade – beides gehört in einen Block, sinnvollerweise nach 13.8.15, wo die Modellwahl das Thema ist. | 13.7.14: 0 eingehende Verweise. 13.8.15: 0. **Ersparnis ≈ 155** |
| B5 | `S134.mdx:334–352` | Bem. 13.4.9 (Warum die Knotenfolge so lang sein muss) | 169 | KÜRZEN auf ≈ 60 (nur den Absatz zur Indexkollision behalten) | Reine Index-Buchführung zur erweiterten Knotenfolge; auf keiner Folie. Absatz 1 und Absatz 3 (Nenner in $\tau$ statt $\xi$) sind aus Definition 13.4.8 direkt ablesbar. | Quiz S134 („Für $m+q$ B-Splines genügt eine Knotenfolge mit $m+q$ Gliedern") zitiert Absatz 1 – der bleibt in der Aufgabe erhalten. **Ersparnis ≈ 110** |
| B6 | `S139.mdx:373–395` | Abschnitt „Splines im maschinellen Lernen" | ~300 | KÜRZEN auf ≈ 150 bzw. ZUSAMMENLEGEN mit Bem. 13.1.6 | Der KAN-Absatz verweist selbst auf Bemerkung 13.1.6 und wiederholt sie. Der Normalizing-Flows-Absatz ist der einzige neue Inhalt; auf der Folie steht dazu ein Stichwort im Anhang. | 13.1.6 wird von hier referenziert. **Ersparnis ≈ 120** |
| B7 | `S132.mdx:45–76` | Bem. 13.2.2 (Unendlich viele Freiheitsgrade) | 173 | KÜRZEN auf ≈ 80 oder ZUSAMMENLEGEN mit Bem. 13.1.9 | Beide Bemerkungen begründen dieselbe Sache: Die Menge der Interpolanten ist „spezielle Lösung + unendlichdimensionaler Kern". 13.1.9 gibt die konkrete Familie $c\prod(x-x_i)$, 13.2.2 die abstrakte Fassung über die Auswertungsabbildung und den Rangsatz. Eine der beiden Fassungen genügt; die abstrakte ist die entbehrlichere, weil die Folie nur den Befund braucht. | 13.1.9 wird im Quiz S131 zitiert, 13.2.2 nirgends. **Ersparnis ≈ 90** |
| B8 | `S138.mdx:426–437` | Bem. 13.8.10 (Sigma oder Sigma-Quadrat?) | 121 | STREICHEN | Ein Rechen-Hygiene-Exkurs über eine mögliche Verwechslung, die im Text gar nicht auftritt. Kein Folienbezug, keine eingehenden Verweise, keine Aufgabe darauf. Wenn er bleiben soll: als Fußnote von zwei Sätzen unter Satz 13.8.4. | Keine. **Ersparnis ≈ 121** |
| B9 | `S138.mdx:332–348` | Bem. 13.8.7, Absätze 2–3 | ~180 | KÜRZEN auf ≈ 80 | Die Ein-Neuntel-Aufteilung wird danach noch dreimal aufgeschrieben: in Beispiel 13.8.8 („11 Prozent"), im Selbsttest S138 („Im Minimum sind Bias² und Varianz gleich groß") und im Selbsttest S139. Der $n = 10^9$-Absatz ist derselbe Gedanke wie die Folienzeile „rein asymptotische Ordnung". Absatz 1 (die Ableitung von $K^\star$) ist Folienstoff und bleibt. | 13.8.7 wird 6× referenziert, immer auf $K^\star \asymp n^{1/9}$ aus Absatz 1. **Ersparnis ≈ 100** |
| B10 | `S133.mdx:176–190` | Bem. 13.3.6 (Die Vandermonde-Determinante) | 95 | STREICHEN | Die Invertierbarkeit ist im Beweis zu Satz 13.3.5 (Schritte 3–4) bereits sauber gezeigt; die Determinantenformel wird im ganzen Kapitel nirgends verwendet, ist auf keiner Folie und hat keinen eingehenden Verweis. Der Schlusssatz („wie wenig sie über die Numerik sagt") wird von Beispiel 13.3.11 ohnehin besser gemacht. | Keine. Quiz S133 nennt $\det \bB \neq 0$, aber ohne Bezug auf die Formel. **Ersparnis ≈ 95** |
| B11 | `S137.mdx:529–542` | Bem. 13.7.15 (Was ohne Boundary.knots passiert) | 116 | ZUSAMMENLEGEN mit Bem. 13.4.12 | Bemerkung 13.4.12 („B-Splines in R") warnt bereits vor exakt derselben Falle („die neue Basismatrix muss zu *derselben* Basis gehören … Deshalb werden innere Knoten, Randknoten und Grad weitergereicht"). Zwei Warnungen, ein Fehler. | Keine. **Ersparnis ≈ 100** |
| B12 | `S135.mdx:19–48` | Bem. 13.5.1 (Was die zweite Kapitelhälfte voraussetzt) | 172 | KÜRZEN auf ≈ 70 | Der zweite Vorkenntnis-Katalog innerhalb desselben Kapitels; im Skript ein Artefakt der alten Zwei-Vorlesungs-Teilung (S131 hat schon einen). Die Punkte „Aus der ersten Kapitelhälfte" sind reine Rückverweise auf 13.1/13.2/13.4. Behalten: Kleinste Quadrate/Pseudoinverse und $\Ccal^k$, weil sie tatsächlich neu gebraucht werden. | Keine. **Ersparnis ≈ 100** |
| B13 | `S134.mdx:564–567` | Bem. 13.4.17, letzter Absatz | 60 | STREICHEN | Nimmt das Ergebnis der direkt folgenden Vertiefung vorweg („je Knotenabstand ungefähr ein Viertel"), die dieselbe Zahl dann mit der ganzen Balkenfolge wiederholt – und der Selbsttest ein drittes Mal. | Quiz S134 zitiert die Zahlen aus der Vertiefung. **Ersparnis ≈ 60** |
| B14 | `S132.mdx:293–304` | Bem. 13.2.11 (Einsetzen ist nicht Vorwärtssubstitution) | 86 | KÜRZEN auf zwei Sätze | Die Aussage steht vollständig in der Selbsttestfrage `S132.mdx:454–462` und wird von Beispiel 13.2.12 (Newton-Basis, echte Dreiecksgestalt) unmittelbar danach ohnehin vorgeführt. | Quiz S132. **Ersparnis ≈ 50** |
| B15 | `S137.mdx:364–373` | Bem. 13.7.11 (Die Residuen fallen nicht immer) | 97 | KÜRZEN auf ≈ 45 | Dieselben Zahlen ($3{,}435 \to 4{,}016$, elf von 36 Schritten) stehen im Selbsttest S137 und ein drittes Mal in Bemerkung 13.8.13. | 4 Verweise auf das Label. **Ersparnis ≈ 50** |
| | | **Summe B** | | | | **≈ 1 736** |

### C. Aufgaben – nur echte Dubletten

Aufgaben sind laut Auftrag kein Kürzungsziel; folgende sind aber wörtliche
Dubletten und lassen sich ohne jeden Verlust streichen:

1. **Vier `:::zahlfrage`-Items wiederholen die `Schaetzfrage` der eigenen
   Vertiefung im selben Abschnitt**, mit identischer Lösung und Toleranz:
   `S135.mdx:465–469` (t = 0) ↔ `S135.mdx:450`; `S136.mdx:340–344` (Faktor 16)
   ↔ `S136.mdx:294`; `S138.mdx:540–544` (K = 12) ↔ `S138.mdx:421`;
   `S139.mdx:715–719` (80 GB) ↔ `S139.mdx:324`. Der Leser hat die Antwort
   zwei Bildschirmseiten vorher geraten und bekommt dieselbe Frage nochmal.
   Ersparnis ≈ 90 W, aber vor allem: der Selbsttest wirkt dadurch redundant.
2. `S139.mdx:658–668` („Mit wachsendem $K$ fällt der quadrierte Bias monoton")
   ist inhaltlich identisch mit `S138.mdx:546–555` („Je größer $K$, desto
   kleiner der Bias") – gleiche Zahlen (0,0344 / 0,1174), gleiche Begründung.
   Ersparnis ≈ 110 W.
3. `S139.mdx:541–550` („Interpolieren wir an den $m+1$ Knoten … quadratisch")
   deckt sich mit `S134.mdx:636–644` („… so ist der Interpolant eindeutig
   bestimmt"). Beide leben von „$m+3$ Spalten gegen $m+1$ Zeilen".
   Ersparnis ≈ 90 W.

Der Kapitel-Selbsttest in S139 hat 1 307 Wörter (17 Items). Nach Abzug der
drei Dubletten bleiben 14 Items – das ist für einen Kapitelabschluss
angemessen und sollte nicht weiter angetastet werden.

---

## 3. Prüfung der bestehenden `:::vertiefung`-Blöcke

Das Kapitel hat **13 `:::vertiefung`-Blöcke, und alle 13 sind Widget-Container**
(kurze Einleitungsprosa + `<Widget />`, sieben davon zusätzlich in eine
`<Schaetzfrage>` gehüllt). Kein einziger enthält optionale *Theorie*.
Zwei Konsequenzen:

- **Das Signal ist belegt.** Der Leser lernt in diesem Kapitel „Vertiefung =
  interaktive Grafik". Wenn dort ab jetzt auch Beweise landen (Empfehlungen
  A1–A10), wird die Auszeichnung mehrdeutig. Die Konventionen sehen
  `<ExpandedReading title="…">` als „Vertiefung:"-Box ausdrücklich für Widgets
  vor – für optionale Theorie braucht es entweder einen eigenen Titelzusatz
  („Für Interessierte: Beweis von Satz 13.4.4") oder eine zweite Auszeichnung.
  Das ist eine Entscheidung, die über dieses Kapitel hinausgeht.
- **Umgekehrt steckt Kernstoff in Widget-Boxen.** Drei Fälle, die ich beim
  Kürzen *nicht* antasten würde, die aber falsch einsortiert sind:
  - `S137.mdx:375–398` („Ein Regler für die Flexibilität") enthält die
    Dreiteilung *zu starr / passend / überangepasst* mit den Zahlen
    $\wh\sigma \in [0{,}278;\,0{,}306]$ – das ist die Kernaussage des
    Abschnitts und steht nur hier.
  - `S138.mdx:399–424` („Zwölf Kurven, drei Balken, ein Regler") enthält die
    einzige anschauliche Erklärung, *warum* viele Kurven auffächern – der
    Fließtext rechnet nur.
  - `S134.mdx:262–277` („Das Zwölf-mal-zwölf-System live") enthält die
    Beobachtung „beim Verschieben eines einzigen Messwerts ändern sich *alle*
    zwölf Koeffizienten", die die Motivation für B-Splines trägt.
  Diese drei Sätze sollten in den Fließtext, auch wenn das Widget bleibt.

---

## 4. Redundanz zwischen Prosa und Widgets

Das Kapitel hat ein wiederkehrendes Muster: **dieselbe Zahlenreihe wird
dreimal erzählt** – einmal in einer Bemerkung, einmal in der Vertiefungsprosa
zum Widget, einmal in der Selbsttestfrage. Belegt bei:

| Zahlenreihe | Bemerkung | Vertiefung | Selbsttest |
|:--|:--|:--|:--|
| 1,732 / 0,464 / 0,124 / 0,031 / 0,010 (Lokalität) | 13.4.17, `S134:564` | `S134:578–586` | `S134:665–675` |
| 0,44 → 0,30 (Runge nicht monoton) | 13.3.16, `S133:461–466` | `S133:507` | `S133:564–571` |
| 18,8 / 16,9 / 16,2 (Konvergenzfaktoren) | 13.6.7, `S136:244–256` | `S136:286–290` | `S136:356–365` |
| 3,435 → 4,016 (RSS steigt) | 13.7.11 | – | `S137:603–611` |
| 0,0344 → 0,1174 (Bias nicht monoton) | 13.8.9 | – | `S138:546`, `S139:658` |
| 11 % / ein Neuntel | 13.8.7, 13.8.8 | – | `S138:587`, `S139:670` |

Die Selbsttestfassung ist jeweils die didaktisch wertvollste (sie zwingt zur
Anwendung), die Vertiefungsfassung die anschaulichste. **Empfehlung: in der
Bemerkung nur noch die Aussage, die Zahlen einmal – dort, wo sie hingehören.**
Das ist über alle sechs Fälle zusammen eine Ersparnis von rund 250 Wörtern und
kostet nichts, weil keine Information verloren geht. (In den obigen Tabellen
sind davon B13 und B15 bereits einzeln aufgeführt.)

Umgekehrt gibt es **keinen** Fall, in dem die Prosa bloß beschreibt, was das
Widget zeigt, ohne etwas hinzuzufügen – die Vertiefungstexte nennen
durchgehend Zahlen und Beobachtungen, die man dem Bild nicht ansieht. Das ist
gut gemacht und sollte so bleiben.

---

## 5. Summe der empfohlenen Ersparnis

| | Wörter | % des Kapitels |
|:--|--:|--:|
| **STREICHEN / KÜRZEN** (Abschnitt B + C) | **≈ 2 030** | 6,5 % |
| **ALS VERTIEFUNG MARKIEREN** (Abschnitt A, bleibt erhalten) | **≈ 2 230** | 7,2 % |
| Summe: aus dem Hauptlesefluss entfernt | ≈ 4 260 | 13,7 % |

Bleibt ein Hauptstrang von rund 26 900 Wörtern. Mit der optionalen Zugabe
(Beispiel 13.4.10, `<ExpandedReading>` für Beweis 13.5.4, das die Folie zwar
zeigt, aber in 30 Zeilen statt in 534 Wörtern) wären weitere ~600 Wörter zu
holen; das würde ich nicht empfehlen.

---

## 6. Gesamturteil (3 Sätze)

Überlang sind allein die Nachbereitungen: Beweise, die auf keiner Folie stehen
(13.4.4, 13.6.5, 13.9.5), die Randterm-Exegese in 13.5.5 und der Abschluss-
apparat in S139, der Kernkonzepte, Vergleichstabelle, Bemerkung 13.9.13 und
17 Selbsttestfragen nebeneinanderstellt und dabei viermal dieselben
Konditionszahlen aufschreibt. Genau richtig und unantastbar sind der
Erzählbogen S131→S133→S134 (Problem, Diagnose, Ausweg – jeder Abschnitt endet
mit dem Grund für den nächsten), der Krümmungsbeweis in S135, die
Bias-Varianz-Rechnung in S138 und sämtliche Widget-Vertiefungen mit ihren
nachgerechneten Zahlen. Der einzige strukturelle Fund, der über Kürzen
hinausgeht: `:::vertiefung` ist in diesem Kapitel zu 100 % mit Widgets belegt,
während drei dieser Widget-Boxen Kernaussagen tragen, die im Fließtext fehlen
– das gehört vor dem großen Markierungsdurchlauf entschieden.
