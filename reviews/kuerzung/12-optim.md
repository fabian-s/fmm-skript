# Kürzungs-Review Kapitel 12 — Nichtlineare Gleichungen & Optimierung

**Kapitel:** `src/chapters/12-optim` (S121–S126)
**Folien:** `slides/13-optim-I.qmd` (765 Z.) und `slides/14-optim-II.qmd` (659 Z.)
**Arbeitsstand:** wie auf Platte, inkl. der uncommitteten Änderungen in S121.mdx,
S126.mdx und `widgets/S126Landkarte.tsx` (der Autor hat dort bereits
Bem. 12.6.4 „Analytische Gradienten gehören geprüft", ~230 W, gestrichen und
12.6.5 → 12.6.4 umnummeriert — das ist die Kalibrierung, an der ich mich
unten orientiere).

**Wörter gesamt: 27 740** (`wc -w` über die sechs `.mdx`)

| Klasse | Wörter | Anteil |
| --- | ---: | ---: |
| KERN (steht so oder ähnlich auf den Folien) | ~14 400 | 52 % |
| BRÜCKE (nötig für Lesbarkeit: Beweise, Rechnungen, Widget-Rahmen) | ~8 100 | 29 % |
| EXTRA (über die Folien hinaus) | ~5 240 | 19 % |

Empfohlen: **~2 270 W streichen/kürzen (8 %)** und **~2 510 W als Vertiefung
markieren (9 %)**. Zusammen sind das 17 % des Kapitels, die ein Studierender in
der Prüfungsvorbereitung überspringen kann.

---

## 1. Abschnittstabelle

| Datei | Titel | Wörter | EXTRA-Anteil | Urteil in einem Satz |
| --- | --- | ---: | ---: | --- |
| S121 | Nichtlineare Gleichungen | 6 195 | ~27 % | Bisektion und Newton-Raphson sind sauber am Folienstoff, aber der Abschnitt „Fixpunktiteration erster Ordnung" (1 577 W) baut eine Anhangsfolie zu einem vollen Unterkapitel mit Satz, Fünf-Schritt-Beweis und zwei langen Bemerkungen aus. |
| S122 | Optimalität und Sattelpunkte | 4 710 | ~19 % | Didaktisch der beste Abschnitt des Kapitels; überlang sind nur Bem. 12.2.8 (Parallelogrammgleichung, Maximumsnorm-Gegenbeispiel) und die Münzwurf-Heuristik in 12.2.12. |
| S123 | Nelder-Mead und Gradientenabstieg | 6 269 | ~19 % | Kern des Kapitels und fast durchgehend deckungsgleich mit Folie 13; einziger großer Zusatz ist der Quadrik-Satz 12.3.15 samt Beweis und Beispiel (749 W), der auf keiner Folie steht. |
| S124 | Newton, Quasi-Newton und SGD | 5 851 | ~15 % | Dicht am Foliensatz 14, inklusive der Anhangsfolien; Streichkandidaten sind Einzelabsätze (affine Invarianz, Shanno-Anekdote, Shuffle-Detail), keine Blöcke. |
| S125 | Beschränkte Optimierung | 2 896 | ~15 % | Der schlankste Abschnitt, praktisch 1:1 die Folien 14; nur der LP-Ausblick und Satz 12.5.12 gehen darüber hinaus — nicht anfassen außer dem LP-Absatz. |
| S126 | Optimierung in R und Zusammenfassung | 1 819 | ~8 % | Nach dem Streichen der Gradienten-Tippfehler-Bemerkung durch den Autor genau richtig; nichts weiter zu holen. |

---

## 2. Priorisierte Empfehlungen

Sortiert nach Ersparnis pro verlorener Qualität. „Ersparnis" = geschätzt
eingesparte Wörter.

### A. S121, Abschnitt „Fixpunktiteration erster Ordnung" — 1 577 W

`S121.mdx:673–938`. Auf den Folien steht dieser Stoff **nur im Anhang**, mit dem
ausdrücklichen Vermerk „(in der Vorlesung nur als Bemerkung: GD ist die
Fixpunktiteration für ∇f(x)ᵀ = 0)". Das Skript macht daraus ein volles
Unterkapitel. Das ist der mit Abstand größte EXTRA-Block des Kapitels.

Der Abschnitt kann **nicht komplett weg** — 12.1.16 wird von
`widgets/S121Fixpunkt.tsx:175,220` zitiert, das Richardson-Argument trägt zwei
Selbsttestfragen (`S121.mdx:986–1019`), und die Fixpunktlesart wird in 12.2.5,
12.3.5 und 12.4.12 wieder aufgegriffen. Empfehlung deshalb: **den ganzen
Abschnitt als Vertiefung markieren** und drei Teile kürzen.

| # | Stelle | Label | W | Aktion | Begründung | Abhängigkeiten |
| --- | --- | --- | ---: | --- | --- | --- |
| A1 | `S121.mdx:726–797` | Beweis zu Satz 12.1.16 | 315 | **KÜRZEN auf ~150** | Fünf `:::schritt` für eine Standard-Kontraktionsabschätzung; Schritte 1–3 lassen sich zu einem Schritt zusammenziehen. | Schritt 5 (affiner Fall) MUSS bleiben: `S121Fixpunkt.tsx:220` verweist wörtlich darauf, ebenso die Selbsttestfrage `S121.mdx:986–995`. |
| A2 | `S121.mdx:804–839` | Bem. 12.1.17 (Was die Monotonie-Annahme leistet) | 259 | **STREICHEN**, ersatzweise 3 Sätze (~60) | Der Begriff „monotoner Operator" kommt im ganzen Skript nicht wieder; die hergeleitete γ-Schranke ist nur hinreichend, und der Absatz sagt das selbst („trifft die wahre Grenze exakt / liefert γ < 0,02, während in Wahrheit 0,2 gutgeht"). Bem. 12.1.18 beantwortet dieselbe Frage besser. | Keine. `grep -rn "12.1.17" src/` → 0 Treffer. |
| A3 | `S121.mdx:854–884` | Bem. 12.1.18, Absätze „Wie eng das Fenster ist" + „Im Eindimensionalen" | ~250 | **ZUSAMMENLEGEN mit Satz 12.3.15 / Bsp. 12.3.16** (`S123.mdx:573–683`) | Beide Stellen rechnen dieselbe Eigenzerlegung von $\bI-\gamma\bA$ durch, mit denselben Schwellen $2/\lambda_{\max}$, derselben optimalen Rate und demselben Zickzack-Fazit — nur einmal für $\bJ_f$ und einmal für $\bH_f$. Ein Verweis genügt. | Selbsttestfrage `S121.mdx:1008–1019` (Verdoppeln der optimalen Schrittweite) hängt an diesem Absatz; sie darf bleiben, wenn die Formel als Kurzform stehen bleibt. |

**Ersparnis A: ~565 W gestrichen, ~1 000 W als Vertiefung markiert.**

### B. S123, Quadrik-Analyse — 749 W

`S123.mdx:568–683` (Übergangsprosa 41 W + Satz 12.3.15 103 W + Beweis 367 W +
Bsp. 12.3.16 238 W). Steht auf **keiner Folie**. Trägt aber das Canyon-Widget
(`S123Canyon.tsx:20,170,191`), zwei Selbsttestfragen (`S123.mdx:883–891`,
`964–974`) und die Begründung des Zickzacks in Bem. 12.3.14.

- **Aktion: ALS VERTIEFUNG MARKIEREN**, nicht streichen.
- **Zusätzlich KÜRZEN:** Beweis `S123.mdx:592–656`, 367 W → ~180 W. Schritte 1
  und 2 (Fehlerrekursion, Spektralzerlegung) lassen sich zusammenziehen;
  Schritt 4 (Bedingung an $\gamma$) ist zwei Sätze.
- **Ersparnis: ~180 W gestrichen, ~570 W markiert.**

### C. Widget-Nacherzählungen — 1 557 W in 13 Absätzen

Nach jedem `:::vertiefung`-Widget folgt ein Absatz, der die Ablesewerte des
Widgets in Prosa wiederholt. Systematisch, quer durchs Kapitel:

| Stelle | W | Stelle | W |
| --- | ---: | --- | ---: |
| `S121.mdx:500–512` (Bisektion) | 125 | `S124.mdx:227–241` (Newton-Parabel) | 170 |
| `S121.mdx:638–651` (Newton-Nullstelle) | 161 | `S124.mdx:540–552` (BFGS) | 138 |
| `S121.mdx:916–930` (Fixpunkt-Spirale) | 142 | `S124.mdx:719–727` (Momentum) | 107 |
| `S123.mdx:152–163` (Nelder-Mead) | 140 | `S125.mdx:153–164` (Lagrange) | 139 |
| `S123.mdx:706–716` (Canyon) | 130 | `S125.mdx:323–330` (Ridge/Lasso) | 82 |
| `S123.mdx:868–877` (Armijo) | 111 | `S126.mdx:132–138` (Landkarte) | 87 |
| `S123.mdx:269–271` | 25 | | |

**Aktion: KÜRZEN auf je 2–4 Sätze (Zahlen behalten, Erzählung streichen),
Ersparnis ~700 W.**

**Warnung, bitte nicht überlesen:** Diese Absätze sind im PDF der *einzige*
Inhalt an dieser Stelle. `scripts/pdf/mdx-to-latex.mjs:694–697` ersetzt jedes
Widget durch eine schmale `\fmmwidget{}`-Marke. Wer die Nacherzählungen
streicht, reißt in der 544-Seiten-Druckfassung 13 Löcher. Deshalb kürzen, nicht
entfernen — und die Zahlen (35/88/336 Schritte, ρ = 0,3536, r = 1,3429,
f = 0,1085) unbedingt behalten, weil die Selbsttests sie abfragen.

Ein zusätzlicher Fall derselben Art: `S122.mdx:476–486` (129 W) rechnet die
GD-Trajektorie am Sattel mit denselben Zahlen vor, die 25 Zeilen später in
Bem. 12.2.12 (`S122.mdx:510–524`) noch einmal hergeleitet werden. Hier reicht
eine der beiden Fassungen; ~90 W.

### D. Die λ↔c-Korrespondenz bei Ridge/Lasso — viermal erzählt

| Stelle | Label | W |
| --- | --- | ---: |
| `S121.mdx:176–192` | Bsp. 12.1.4, Absatz „Zwei Feinheiten" | 146 |
| `S125.mdx:233–238` | §-Intro „Anwendung: Ridge und Lasso" | 58 |
| `S125.mdx:268–279` | Bsp. 12.5.10, zweite Hälfte | 109 |
| `S125.mdx:414–428` | Selbsttestfrage | 105 |

Die Folien sagen dazu genau zwei Sätze (Folie 14, „Statistische Anwendung").
**Aktion: ZUSAMMENLEGEN.** Die Feinheit einmal ausführen, und zwar in
Bsp. 12.5.10, wo die KKT-Komplementarität sie überhaupt erst begründet; in
S121 auf einen Satz („zu jedem λ > 0 gibt es ein passendes Budget c, umgekehrt
nur solange die Nebenbedingung bindet") und im §-Intro auf einen Halbsatz.
Die Selbsttestfrage bleibt (billig, und sie prüft die Richtung, die wirklich
schiefgeht). **Ersparnis ~180 W.** Keine externen Abhängigkeiten;
Kap. 13 verweist nur auf `#sec-12.5` als Ganzes (`S137.mdx:469`,
`S138.mdx:529`).

### E. S122, Bem. 12.2.8, zweite Hälfte — 279 W

`S122.mdx:294–328`, Absätze „Das Projektionstheorem …", „Warum quadriert?"
(Parallelogrammgleichung ($12.2.4$)) und „Und das gilt nur in
Skalarprodukträumen" (Maximumsnorm-Gegenbeispiel). Auf der Folie steht dazu
**ein Bullet**. ($12.2.4$) wird nirgends sonst im Skript referenziert
(`grep -rn "12.2.4" src/` → 0 Treffer außerhalb S122).

- **Aktion: ALS VERTIEFUNG MARKIEREN**, dabei das Maximumsnorm-Beispiel
  streichen (~130 W). Der erste Teil von 12.2.8 (`281–293`, die Menge
  $\{-1,+1\}$ mit $f(y)=y^2$) ist BRÜCKE und muss bleiben — die Selbsttestfrage
  `S122.mdx:686–695` hängt daran.
- **Ersparnis: ~130 W gestrichen, ~150 W markiert.**

### F. S121, Bem. 12.1.9, robuste Fassung — 272 W

`S121.mdx:418–453`: zweiter Codeblock plus Fließkomma-Diskussion
(`a + (b-a)/2` gegen `(a+b)/2`, Vorzeichentest statt Produkttest). Die Folie
zeigt nur die naive Siebenzeiler-Fassung. Schöner Rückverweis auf Kapitel 4,
aber prüfungsfern; keine Referenzen.
**Aktion: ALS VERTIEFUNG MARKIEREN** (nicht streichen — der Hinweis auf die
Rückgabe der Intervallmitte, `S121.mdx:413–416`, gehört zu Satz 12.1.8 und
bleibt im Fließtext). **~272 W markiert.**

### G. S122, Bem. 12.2.12, „Eine hochdimensionale Vorzeichenheuristik" — 156 W

`S122.mdx:526–543`. Das Münzwurfmodell wird hier eingeführt, obwohl der Text
selbst sagt, es stehe schon in Abschnitt 10.7 — und der Folgeabsatz
(`536–543`) nimmt es dann über 100 Wörter wieder zurück („Toy-Modell, keine
Verteilungsaussage"). Folie 13: ein Bullet („In hohen Dimensionen sind sie i. A.
häufiger als lokale Minima").
**Aktion: KÜRZEN auf ~50 W** (Verweis auf 10.7 + ein Satz zur geometrischen
Aussage). Dann muss die zugehörige Selbsttestfrage `S122.mdx:741–752` (77 W)
mitgekürzt oder gestrichen werden. **Ersparnis ~150 W.**

### H. S123, Bem. 12.3.19, zwei Absätze — ~165 W

`S123.mdx:825–831` („Warum die Schleife endet", 72 W) und `839–846`
(„Ein Zahlenbeispiel", 93 W). Das Zahlenbeispiel rechnet Beispiel 12.3.6 zum
dritten Mal durch, und die Widget-Nacherzählung (`868–877`) sagt danach
noch einmal „ein bis zwei Halbierungen genügen".
**Aktion: das Zahlenbeispiel STREICHEN**, den Endlichkeitsbeweis behalten (er
ist die einzige Stelle, an der die Terminierung begründet wird).
**Ersparnis ~90 W.**

### I. S124, Bem. 12.4.7, affine Invarianz — 170 W

`S124.mdx:312–334`. Die Rechnung, dass sich $\bA$ im Newton-Schritt herauskürzt,
steht auf keiner Folie und wird nirgends referenziert. Der Kostenabsatz
(`336–341`, 56 W, $O(n^2)$-Speicher / $O(n^3)$-Zerlegung) ist dagegen KERN
(Folie 14, Quasi-Newton-Motivation).
**Aktion: ALS VERTIEFUNG MARKIEREN. ~170 W markiert.**

### J. S125, LP-Ausblick — 71 W

`S125.mdx:369–376`. Lineare Programmierung, Polyeder, Simplex-Verfahren,
Innere-Punkte-Methoden — und der Absatz sagt selbst, dass „dieses Skript [sie]
nicht behandelt". Auf keiner Folie, keine Referenz.
**Aktion: STREICHEN** (oder auf einen Satz: „Sind Ziel und alle
Nebenbedingungen affin, heißt die Aufgabe *lineares Programm*; dafür gibt es
eigene Verfahren."). **Ersparnis ~71 W.**

### K. S124, Satz 12.4.10 + Beweis — 161 W

`S124.mdx:449–494`. Die Folie stellt die Sekantenbedingung nur auf.
Referenziert von `S124Bfgs.tsx:8,168,173` und der Selbsttestfrage
`S124.mdx:895–903` → **nicht streichen**.
**Aktion: ALS VERTIEFUNG MARKIEREN. ~161 W markiert.**

### L. S122, Satz 12.2.13 Teil 2 + zugehöriger Beweis — ~180 W

`S122.mdx:556–557` und `564–599` (163 W). Die Folie führt nur die notwendige
Bedingung erster und die hinreichende zweiter Ordnung. Teil 2 (positive
Semidefinitheit als notwendige Bedingung) trägt aber Bem. 12.2.14 und die
Selbsttestfrage `S122.mdx:709–717`.
**Aktion: nur den Beweisteil ALS VERTIEFUNG MARKIEREN**, die Satzaussage bleibt
im Fließtext. **~163 W markiert.**

### M–P. Kleinkram, zusammen ~245 W

| # | Stelle | W | Aktion | Begründung |
| --- | --- | ---: | --- | --- |
| M | `S124.mdx:836–842` („Und was wirklich passiert", Shuffle statt i.i.d.-Ziehung) | 66 | **STREICHEN** oder auf einen Satz | Implementierungsdetail, nicht auf den Folien, relativiert Satz 12.4.15 ohne Konsequenz für den Stoff. |
| N | `S124.mdx:426–428` (Shanno ≠ Shannon) | 27 | **STREICHEN** | Reine Anekdote. |
| O | `S123.mdx:106–120` (94 W) + `S124.mdx:604–607` (41 W) + `S126.mdx:193–196` (42 W) | 177 | **ZUSAMMENLEGEN**, ~120 sparen | Dreimal derselbe Satz: `optim()`-Default ist Nelder-Mead, und ein über `gr` übergebener Gradient wechselt die Methode nicht. Einmal ausführen (in 12.6), zweimal auf einen Halbsatz mit Verweis. |
| P | `S124.mdx:111–132` (Jacobimatrix von $\bg=\nabla f^\top$ ist $\bH_f$) | 87 | **KÜRZEN auf ~40** | Der Text sagt selbst „so hatte ihn Bemerkung 12.1.14 schon einmal aufgeschrieben". Die Tabelle in 12.4.3 (Folie 14) reicht; die Herleitung steht in 12.1.14. |

### Q. Zwei echte Aufgaben-Dubletten — ~146 W

Aufgaben sind laut Auftrag kein Kürzungsziel; diese zwei sind aber wörtliche
Doppelungen derselben Frage mit derselben Zahl:

- `S123.mdx:932–941` (Zahlfrage „336 Schritte bei κ = 100") wiederholt die
  Schätzfrage `S123.mdx:695–703` im Canyon-Widget. 69 W.
- `S125.mdx:442–451` (Zahlfrage „r = 1,34") wiederholt die Schätzfrage
  `S125.mdx:307–320` im Ridge/Lasso-Widget. 77 W.

Grenzfälle (qualitative Schätzfrage vs. numerische Selbsttestfrage, also
vertretbar): `S121.mdx:964–973` vs. `624–635` (arctan-Schwelle) und
`S124.mdx:926–935` vs. `701–713` (Momentum bei κ = 5).

---

## 3. Summe der empfohlenen Ersparnis

| Aktion | Wörter | Anteil des Kapitels |
| --- | ---: | ---: |
| **STREICHEN / KÜRZEN** (A1, A2, A3, B-Beweis, C, C-Sattel, D, E, G, H, J, M, N, O, P) | **~2 270** | 8,2 % |
| **ALS VERTIEFUNG MARKIEREN** (A-Rest, B-Rest, E-Rest, F, I, K, L) | **~2 510** | 9,0 % |
| Zusammen | ~4 780 | 17,2 % |
| Optional: zwei Aufgaben-Dubletten (Q) | ~146 | 0,5 % |

Aufschlüsselung der Streichungen: A 565, B 180, C 700 + 90, D 180, E 130,
G 150, H 90, J 71, M 66, N 27, O 120, P 47 ≈ 2 416 W brutto; abzüglich der
Ersatztexte (~150 W) bleiben ~2 270 W netto.

---

## 4. Zu Punkt 4 des Auftrags: die `:::vertiefung`-Blöcke

**Befund: Das Kapitel hat 11 `:::vertiefung`-Blöcke, und keiner davon ist
Vertiefung im Sinne von „darf übersprungen werden".** Alle elf sind
Widget-Rahmen: Titel, zwei bis drei Sätze Bedienungsanleitung, eine
`<Schaetzfrage>`, das Widget. Das ist repo-weit so — von 99
`:::vertiefung`-Blöcken im ganzen Skript ist praktisch jeder ein
Widget-Container (Stichproben in 07-kq, 11-konvexitaet bestätigen das).

Daraus folgen zwei Dinge:

1. **In den Vertiefungen steckt Kernmaterial, nicht Zusatzstoff.** Die
   interaktiven Tafeln sind das Beste am Kapitel und tragen mehrere
   Selbsttestfragen. Nichts davon markieren oder streichen.
2. **Umgekehrt steht der echte Zusatzstoff ungekennzeichnet im Fließtext** —
   als gewöhnliche `:::bemerkung`/`:::satz` in voller Schriftgröße, also
   optisch gleichwertig mit dem Prüfungsstoff. Das sind genau die Punkte
   A, B, E, F, I, K, L oben, zusammen ~2 500 W.

**Empfehlung:** Für „extra / weniger zentral als die Folien" wird ein zweiter
Marker gebraucht. `ExpandedReading` existiert bereits
(`src/lib/ExpandedReading.tsx`, exportiert in `src/lib/index.ts`), wird aber in
**keinem** Kapitel benutzt. Entweder den in Betrieb nehmen, oder
`:::vertiefung` in `:::widget` o. ä. umbenennen und `:::vertiefung` für den
Zusatzstoff freiräumen. Solange beides dieselbe graue Box ist
(`scripts/pdf/preamble.tex:173`), hat der Student keinen Anhaltspunkt, was er
weglassen darf — und genau das war die Frage des Autors.

---

## 5. Zu Punkt 5: Redundanz

**Prosa vs. Widget:** siehe C — systematisch, ~1 560 W, aber im PDF
unverzichtbar. Kürzen, nicht streichen.

**Zwischen Abschnitten**, nach Schwere:

| Thema | Stellen | Bewertung |
| --- | --- | --- |
| Eigenzerlegung von $\bI-\gamma\bA$, optimale Schrittweite, Divergenzgrenze | Bem. 12.1.18 (S121) und Satz 12.3.15/Bsp. 12.3.16 (S123) | **Echte Dublette**, zusammenlegen (A3/B) |
| λ ↔ c bei Ridge/Lasso | Bsp. 12.1.4, S125-Intro, Bsp. 12.5.10, S125-Selbsttest | **4×**, auf 1× reduzieren (D) |
| `optim()`-Default ist Nelder-Mead, `gr` wechselt nichts | Bem. 12.3.3, Bem. 12.4.12, S126 §„Wann welches Verfahren" | **3×**, auf 1× (O) |
| Newton-Optimierung = Newton-Raphson für $\nabla f = 0$ | Bem. 12.1.14, Bem. 12.2.12, Bem. 12.4.3 + §-Überschrift | Spiegelt die zwei Vorlesungen (beide Decks bringen es), **also berechtigt** — nur die Jacobi-Herleitung in 12.4.3 kürzen (P) |
| GD als Fixpunktiteration | Bem. 12.1.3, Bem. 12.2.5, Bem. 12.3.5, Bem. 12.4.12 | 4×, aber jedesmal mit anderer Pointe (Motivation / Notation / Lesart / Systematik) — **belassen** |
| Zickzack bei schlechter Kondition | S121-Widgetprosa, Bem. 12.3.14, Bsp. 12.3.16, Canyon-Widget, S124-Momentum-Intro | 5×, aber es ist das Leitmotiv des Kapitels und steht auf beiden Foliensätzen — **belassen** |
| Sattel-Trajektorie des GD mit $\gamma = 0{,}25$ | `S122.mdx:476–486` und Bem. 12.2.12 (`510–524`) | **Echte Dublette** innerhalb eines Abschnitts, ~90 W (C) |

---

## 6. Gesamturteil (3 Sätze)

Überlang ist genau eine Stelle strukturell — der Abschnitt „Fixpunktiteration
erster Ordnung" in S121 (1 577 W), der eine unnumerierte Anhangsfolie zu einem
Unterkapitel mit Satz, Fünf-Schritt-Beweis und zwei ausufernden Bemerkungen
ausbaut; alles andere ist Absatz-Speck (affine Invarianz, Münzwurf-Heuristik,
Parallelogrammgleichung, LP-Ausblick, Shanno-Anekdote) plus eine viermal
erzählte λ↔c-Korrespondenz. Genau richtig und unantastbar sind S125
(praktisch 1:1 die Folien), die elf Widget-Blöcke samt ihren Schätzfragen, die
Selbsttests und der Gradientenabstiegs-Kern von S123 (Bem. 12.3.7,
Def. 12.3.8–12.3.14) — dort steht kein Wort zu viel. Das eigentliche Problem
des Kapitels ist aber kein Umfangs-, sondern ein Signalproblem: `:::vertiefung`
markiert hier (und im ganzen Skript) die Widgets, also das Zentralste, während
der echte Zusatzstoff optisch gleichwertig im Fließtext steht — der
ungenutzte `ExpandedReading`-Block wäre der Ort, das zu reparieren.
