# Kürzungs-Review Kapitel 9 „Tensoren und Tensorprodukte"

**Kapitel:** `src/chapters/09-tensoren/` (S91–S95)
**Deck:** `slides/09-tensoren.qmd` (4 675 Wörter inkl. YAML/Code; ~30 Folien + 4 Anhangsfolien)
**Kapitelumfang:** 14 720 Wörter (S91 1 860, S92 2 793, S93 4 982, S94 3 337, S95 1 748)

| Klasse | Wörter (geschätzt) | Anteil |
| --- | --- | --- |
| **KERN** (steht so/ähnlich auf den Folien) | ~7 900 | 54 % |
| **BRÜCKE** (nötig zum Verständnis, inkl. aller `:::quiz`) | ~3 700 | 25 % |
| **EXTRA** (über die Folien hinaus) | ~3 000 | 20 % |

Die Quizblöcke (1 973 Wörter, 13 % des Kapitels) sind hier durchgängig als BRÜCKE
gezählt und laut Auftrag **kein** Kürzungsziel; ohne sie liegt der EXTRA-Anteil bei ~24 %.

---

## 1. Abschnittsübersicht

| Datei | Wörter | ~EXTRA | Ein-Satz-Urteil |
| --- | --- | --- | --- |
| `S91.mdx` Multilineare Abbildungen | 1 860 | ~11 % | Sehr nah an den Folien und gut proportioniert; einziges echtes Extra ist die Beweisskizze zum Darstellungssatz (Bem. 9.1.9), dazu zwei kleine Doppelungen um das Rechteckbeispiel. |
| `S92.mdx` Tensoren | 2 793 | ~26 % | Der mathematische Teil ist knapp und richtig dimensioniert, aber der Deep-Learning-Anwendungsteil (696 W) bildet vier Folien nach, von denen drei im Deck ausdrücklich Anhang (`visibility="uncounted"`) sind. |
| `S93.mdx` Produkte von Tensoren | 4 982 | ~21 % | Der längste Abschnitt und inhaltlich der stärkste; überlang sind die Anwendungsexkurse (Attention, empirische Kovarianz, Eigenwerte des Kroneckerprodukts) und drei Routine-Beweisschritte. |
| `S94.mdx` Tensorprodukt von Vektorräumen | 3 337 | ~26 % | Der abstrakteste Abschnitt: Er hebt die universelle Eigenschaft — im Deck nur eine unnummerierte Anhangsfolie — zur Definition und schleppt sie durch drei weitere Blöcke plus Beweis. |
| `S95.mdx` Zusammenfassung | 1 748 | ~11 % | Für eine Zusammenfassung eher lang, weil sie zusätzlich Definition, Satz, Beweis und Beispiel zur Vektorisierung enthält; zwei Zusammenfassungen (Bem. 9.5.1 und Schlusstabelle) stehen nebeneinander. |

---

## 2. Priorisierte Empfehlungen

Reihenfolge: größte Ersparnis bei geringstem Qualitätsverlust zuerst.
„MARKIEREN" = in `:::vertiefung` verschieben (bleibt lesbar, zählt für die
Prüfungsvorbereitung als überspringbar), „STREICHEN" = ersatzlos weg.

### E1 — Deep-Learning-Anwendungen in S92 als Vertiefung
- **Datei/Zeilen:** `S92.mdx:275–390` (Abschnittsüberschrift „Anwendungen: Bilder, Stapel, Feature-Maps" bis Bem. 9.2.11)
- **Labels:** Bsp. 9.2.7, 9.2.8, 9.2.9; Bem. 9.2.10, 9.2.11
- **Wörter:** 696 (+ ~30 Einleitungsprosa)
- **Aktion:** **ALS VERTIEFUNG MARKIEREN**, Ersparnis im Haupttext ~550 W
- **Begründung:** Im Deck steht dazu **eine** Hauptfolie („Anwendung: Tensoren in Deep Learning") mit fünf Stichpunkten; RGB-Details, Batch-Tensoren und Feature-Maps sind dort ausdrücklich in den **Anhang** verschoben (`{#anhang-rgb-bilder … visibility="uncounted"}`, `{#anhang-feature-maps …}`). Das Skript spiegelt also drei Anhangsfolien im Fließtext. Im Haupttext genügen 6–8 Zeilen: Graustufenbild = Matrix, Farbbild = Stufe 3 (150 528 Zahlen), Stapel/Video = Stufe 4, Faltungsschicht bildet Tensor auf Tensor ab, Spezialhardware. Bem. 9.2.10 (Faltungsschicht ist bei festen Gewichten linear, mit Gewichten als zweitem Argument bilinear) steht auf keiner Folie und ist der stärkste Vertiefungskandidat des Abschnitts.
- **Abhängigkeiten:** zwei Quizfragen in `S92.mdx:439–459` verweisen auf 9.2.7 und 9.2.9 — funktioniert weiter, da Vertiefungen aufklappbar sind; das Widget `<TensorScheibenViewer bild />` (`S92.mdx:280–284`) sollte im Haupttext bleiben.

### E2 — Universelle Eigenschaft in S94 aus dem Hauptstrang nehmen
- **Datei/Zeilen:** `S94.mdx:31–39` (UP-Teil von Def. 9.4.1), `86–99` (Bem. 9.4.3), `125–136` (UP-Nachweis in Bsp. 9.4.4), `329–347` (Beweisschritt 3 zu Satz 9.4.9), `391–396` (Injektivitätsabsatz)
- **Labels:** Def. 9.4.1 (Teil), Bem. 9.4.3, Bsp. 9.4.4 (Teil), Satz 9.4.9 (Beweisschritt)
- **Wörter:** ~450
- **Aktion:** **ALS VERTIEFUNG MARKIEREN** (ein Kasten „Die universelle Eigenschaft"), Ersparnis im Haupttext ~450 W
- **Begründung:** Das Deck definiert schlicht $V \otimes W = \spann\{\bv \otimes \bw\}$ mit bilinearem $\otimes$; die universelle Eigenschaft erscheint nur auf der **letzten, unnummerierten Anhangsfolie** („Universelle Eigenschaft des Tensorprodukts", `visibility="uncounted"`). Im Skript trägt sie dagegen die Definition, ein eigenes Bemerkungs-Kapitelchen, den halben Beispielbeweis 9.4.4 und den Unabhängigkeitsschritt von Satz 9.4.9 — für ein BSc-3.-Semester-Publikum die härteste Stelle des Kapitels, und zwar für Stoff, den die Vorlesung nicht prüft.
- **Qualitäts-Caveat:** Die Definition muss dann wieder die Folienfassung sein (Spann + Bilinearität, Gl. 9.4.1). Der Beweisschritt zur linearen Unabhängigkeit in Satz 9.4.9 benutzt die UP; für $V,W$ endlichdimensional geht er genauso über Koordinaten (Koeffizientenvergleich in der konkreten Realisierung $\R^{m\times n}$) — oder er wandert mit E3 komplett in die Vertiefung, dann löst sich das von selbst.
- **Abhängigkeiten:** keine Verweise aus anderen Kapiteln (`grep` auf `9.4.1`/`9.4.3` liefert nur kapitelinterne Treffer und die Gleichungsnummer (9.4.3)).

### E3 — Beweis zu Satz 9.4.9 (Tensorproduktbasis)
- **Datei/Zeilen:** `S94.mdx:302–356`
- **Label:** Beweis zu Satz 9.4.9
- **Wörter:** 259
- **Aktion:** **ALS VERTIEFUNG MARKIEREN**, davon Schritt 1 (Erzeugendensystem, ~70 W) als drei Zeilen im Haupttext lassen → Ersparnis ~190 W
- **Begründung:** Das Deck bringt den Satz als reines Theorem ohne Beweis. Schritt 1 ist didaktisch wertvoll, weil er zeigt, *warum* Produkte von Basisvektoren alles erzeugen; die Schritte 2–4 (Spann-Argument, UP-Unabhängigkeit, Abzählen) sind Routine bzw. hängen an E2.
- **Abhängigkeiten:** `S94.mdx:588` (Quiz) verweist auf „Schritt 1 des Beweises zu Satz 9.4.9" — bleibt gültig, wenn Schritt 1 im Haupttext steht.

### E4 — Bem. 9.3.7 (Attention)
- **Datei/Zeilen:** `S93.mdx:238–266`
- **Label:** Bem. 9.3.7
- **Wörter:** 193
- **Aktion:** **ALS VERTIEFUNG MARKIEREN**
- **Begründung:** Im Deck ein einziger Stichpunkt („KI: $\text{Attention}(\bQ,\bK,\bV) = \dots$") in einer Dreierliste von Anwendungen. Das Skript erklärt Queries/Keys/Values, die Score-Matrix als Summe äußerer Produkte, die Rangschranke $d_k$ und den Softmax-Vorbehalt. Schöner Exkurs, aber reine Zusatzanwendung.
- **Abhängigkeiten:** **keine** — `grep -rn "9\.3\.7"` findet keinen Verweis, weder im Kapitel noch außerhalb.

### E5 — Eigenwert-Passage in Bem. 9.3.20
- **Datei/Zeilen:** `S93.mdx:733–759` („Dass $\bSigma$ überhaupt eine Kovarianzmatrix sein kann …" bis „… die Determinante von $\bSigma$")
- **Label:** Bem. 9.3.20 (Teil)
- **Wörter:** ~156
- **Aktion:** **ALS VERTIEFUNG MARKIEREN**
- **Begründung:** Die Folie „Anwendung: Separierbare Kovarianz" bringt nur Modellannahme, Parameterzahl und das $2\times2$-Beispiel. Die Mischprodukt-Regel $(\bA \kron \bB)(\bC \kron \bD) = (\bA\bC)\kron(\bB\bD)$, das Spektralsatz-Argument und die Spur-/Determinantenprobe sind Zusatzsätze. Im Haupttext bleiben die Parameterzählung, die Nicht-Identifizierbarkeit des Skalenfaktors (steht im Deck im Lösungskommentar zum Self-Check) und der Absatz „Bezahlt wird die Sparsamkeit …".
- **Abhängigkeiten:** ⚠ `S95.mdx:204–207` verweist genau auf diese Passage („Dort lesen wir die Eigenwerte von $\bSigma$ als Produkte der Eigenwerte beider Faktoren ab … (Bemerkung 9.3.20)"). Der Verweis bleibt gültig, sollte aber beim Umbau geprüft werden.

### E6 — Empirische Kovarianz in Bem. 9.3.6
- **Datei/Zeilen:** `S93.mdx:221–235` (ab „Für jede einzelne Realisierung …")
- **Label:** Bem. 9.3.6 (Teil)
- **Wörter:** ~120 von 240
- **Aktion:** **ALS VERTIEFUNG MARKIEREN** (oder KÜRZEN auf zwei Sätze)
- **Begründung:** Auf der Folie steht nur die Verschiebungsformel als Stichpunkt. Die Rang-1-Lesart und $\rang(\wh{\bSigma}) \le N-1$ sind statistisch wertvoll, aber nicht Vorlesungsstoff dieses Kapitels. Die Verschiebungsformel samt Auslöschungs-Querverweis bleibt im Haupttext.
- **Abhängigkeiten:** keine Verweise auf 9.3.6.

### E7 — Bem. 9.1.9 (Beweisidee zum Darstellungssatz)
- **Datei/Zeilen:** `S91.mdx:238–265`
- **Label:** Bem. 9.1.9
- **Wörter:** 183
- **Aktion:** **ALS VERTIEFUNG MARKIEREN**, ein Kernsatz bleibt im Haupttext → Ersparnis ~150 W
- **Begründung:** Das Deck zitiert Satz 9.1.8 ohne Beweis. Der eine Satz, der stehen bleiben muss: $a_{i_1,\dots,i_k,j}$ ist die $j$-te Komponente von $T(\be_{i_1},\dots,\be_{i_k})$, weil daraus die Eindeutigkeit folgt.
- **Abhängigkeiten:** `S91.mdx:330` (Quiz) verweist auf Bem. 9.1.9 — bleibt gültig.

### E8 — Beweis zu Satz 9.5.3 (Vektorisierung)
- **Datei/Zeilen:** `S95.mdx:104–134`
- **Label:** Beweis zu Satz 9.5.3
- **Wörter:** 163
- **Aktion:** **ALS VERTIEFUNG MARKIEREN**
- **Begründung:** Das Deck benutzt den vec-Trick als Rechenregel („vec-Trick"-Block) und verifiziert ihn per R-Code; einen Beweis führt es nicht. Bsp. 9.5.4 rechnet die Identität ohnehin an Zahlen nach, sodass der blockweise Beweis für die Prüfungsvorbereitung entbehrlich ist.
- **Abhängigkeiten:** Satz 9.5.3 selbst wird häufig referenziert (`S93.mdx:573`, `S95.mdx:53,230`, `10-differentialrechnung/S109.mdx:180`) — der **Satz** muss im Haupttext bleiben, nur der Beweis wandert.

### E9 — Drei Routine-Beweisschritte kürzen
| Ort | Label | Wörter | Aktion | Ersparnis |
| --- | --- | --- | --- | --- |
| `S93.mdx:329–356` | Beweis zu Satz 9.3.10 (Tensorprodukt bilinear) | 140 | **KÜRZEN auf zwei Sätze** („beide Aussagen folgen eintragsweise aus der Distributivität in $\R$"; Schritt 2 als ein Satz behalten) | ~100 |
| `S92.mdx:204–226` | Beweis zu Satz 9.2.5, Schritte 1–2 | ~134 | **KÜRZEN auf 3 Zeilen** | ~90 |
| `S93.mdx:114–130` | Beweis zu Satz 9.3.4, Schritt 1 | ~90 | **KÜRZEN auf 2 Zeilen** (Spalten/Zeilen sind direkt aus (9.3.1) ablesbar) | ~55 |
- **Abhängigkeiten:** ⚠ **Schritt 3 des Beweises zu Satz 9.2.5 muss unangetastet bleiben** — `S93.mdx:413` baut ausdrücklich auf den dort konstruierten Basistensoren $\bE^{(i,j,k)}$ auf. Die Schritte 2–4 des Beweises zu Satz 9.3.4 (Bild, Kern, Rang) sind Kern und bleiben; Satz 9.3.4 ist außerdem der einzige Kapitel-9-Satz, der aus einem anderen Kapitel per Label zitiert wird (`10-differentialrechnung/S109.mdx:384`).

### E10 — Doppelte Beweise / doppelte Rechnungen streichen
| Ort | Label | Wörter | Aktion | Begründung |
| --- | --- | --- | --- | --- |
| `S93.mdx:544–554` | Bem. 9.3.15 | ~65 | **STREICHEN** (ausgeschriebene transponierte $6\times6$-Matrix) | Die Indexbegründung darüber genügt; die untransponierte Matrix steht 20 Zeilen höher in Bsp. 9.3.14. |
| `S94.mdx:178–196` | Bsp. 9.4.6 | ~55 | **KÜRZEN**: einen der beiden Beweise streichen | Komponenten-Widerspruch **und** Rangargument stehen direkt hintereinander für dieselbe Aussage; das Rangargument ist der kürzere und schließt an Satz 9.3.4 an. |
| `S94.mdx:450–471` | Bsp. 9.4.12 | ~90 | **STREICHEN oder MARKIEREN** (Ecken-Rückrechnung) | Das Deck bringt nur die Entwicklung $f = 2\phi_{11}+3\phi_{12}-\phi_{21}+5\phi_{22}$; die Bijektion „vier Ecken ↔ vier Koeffizienten" ist hübsch, aber nicht tragend. |
| `S92.mdx:137–141` | Bsp. 9.2.2 | ~50 | **STREICHEN** („Klammern wir andersherum …") | Reine Wiederholung derselben Zahl 44 in anderer Klammerung. Die Passage zu Bilinearform/quadratischer Form davor bleibt (Brücke zu Kap. 10/11). |
| `S91.mdx:156–162` | Bsp. 9.1.5 | 43 | **ZUSAMMENLEGEN mit Bsp. 9.1.3** | Das Skript sagt selbst: „Das ist wörtlich die Rechnung aus Beispiel 9.1.3 ohne die geometrische Deutung." Ein Halbsatz in 9.1.3 reicht. Auf der Folie steht es zwar separat, aber dort ohne den Rechteck-Kontext. |
| `S91.mdx:136–143` | Bem. 9.1.4 | 85 | **KÜRZEN auf zwei Sätze** | Wiederholt den Faktor 4 aus Bsp. 9.1.3 mit geometrischer Begründung plus Zahlenbeispiel — und genau das zeigt direkt darunter das Widget `<BilinearitaetsDemo />`. |
| `S94.mdx:258–267` | Bem. 9.4.8 | 93 | **KÜRZEN auf einen Satz in Satz 9.4.7** | Der Schlusssatz („Für Tensoren höherer Stufe gibt es dazu kein ebenso vollständiges Gegenstück; schon die kleinste Zahl von Summanden ist dort erheblich schwerer zu bestimmen") wiederholt fast wörtlich das Ende von Bsp. 9.3.11 (`S93.mdx:416–419`). Abhängigkeit: `S94.mdx:579` (Quiz) verweist auf 9.4.8 → auf 9.4.7 umbiegen. |
| `S95.mdx:209–216` | Tabelle „Das Wichtigste in Kürze" | ~130 | **STREICHEN oder mit Bem. 9.5.1 zusammenlegen** | Sie sagt abschnittsweise dasselbe wie die sechs Punkte 40 Zeilen darüber; das Deck hat genau **eine** Zusammenfassungsfolie. |

**Zwischensumme E10:** ~610 W, davon ~430 STREICHEN und ~180 MARKIEREN.

### E11 — S94, Funktionen-Vorspann
- **Datei/Zeilen:** `S94.mdx:386–403`
- **Wörter:** ~170 (Injektivitätsabsatz ~90 + Notationsverabredung ~80)
- **Aktion:** **KÜRZEN auf 3–4 Zeilen** → Ersparnis ~100 W
- **Begründung:** Der Injektivitätsabsatz existiert nur, weil vorher die universelle Eigenschaft eingeführt wurde (fällt mit E2 mit); die Notationsverabredung „$x$ im ersten, $y$ im zweiten Faktor" lässt sich in einem Satz sagen. Das Deck springt direkt von der univariaten Basis zu $\phi_{jk} = b_j \otimes b_k$.

---

## 3. Summe der empfohlenen Ersparnis

| Aktion | Wörter | Anteil am Kapitel |
| --- | --- | --- |
| **ALS VERTIEFUNG MARKIEREN** (E1–E8, E10-Teil) | ~2 350 | 16 % |
| **STREICHEN / KÜRZEN** (E9, E10-Rest, E11) | ~1 000 | 7 % |
| **Summe Entlastung des Haupttextes** | **~3 350** | **23 %** |

Danach läge der Haupttext bei ~11 400 Wörtern, bei unverändertem Informationsgehalt
(nur ~1 000 Wörter verschwinden tatsächlich, und davon sind ~600 echte Dubletten).

---

## 4. Prüfung der bestehenden `:::vertiefung`-Blöcke

Das Kapitel enthält **7** `:::vertiefung`-Blöcke — und **alle sieben sind reine
Widget-Rahmen** von 7 bis 37 Wörtern:

| Datei:Zeile | Titel | Wörter | Inhalt |
| --- | --- | --- | --- |
| S91:145 | Verdoppeln, einmal beide Seiten und einmal nur eine | 28 | `<BilinearitaetsDemo />` |
| S92:267 | Ein Stufe-3-Tensor, Scheibe für Scheibe | 20 | `<TensorScheibenViewer />` |
| S92:280 | Farbbild als Kanäle | 20 | `<TensorScheibenViewer bild />` |
| S93:90 | Ein Bildraum als Gerade | 7 | `<RangEinsExplorer />` |
| S93:571 | Kroneckerprodukte selbst ausrechnen | 37 | `<KroneckerRechner />` |
| S93:767 | Separierbare Kovarianz zum Schieben | 25 | `<SeparierbareKovarianzDemo />` |
| S94:491 | Vier Koeffizienten, eine Fläche | 27 | `<TensorbasisExplorer />` |
| S95:136 | Die Matrixgleichung als lineares System | 22 | `<VektorisierungMatrixgleichung />` |

**Befund:** In Kapitel 9 wird `:::vertiefung` ausschließlich als Widget-Container
benutzt, nie als Kennzeichnung von Zusatzstoff. Damit gibt es **kein Kernmaterial,
das in einer Vertiefung versteckt wäre** (gut), aber auch **keine einzige Markierung,
die einem Studierenden sagt, was er überspringen darf** (schlecht) — genau die Lücke,
die E1–E8 schließen. Sollte das Widget-Muster als eigenes Format erhalten bleiben,
wäre eine Trennung sinnvoll: Widgets in einem eigenen Kasten, Zusatzstoff in
`:::vertiefung` / `<ExpandedReading>`.

---

## 5. Redundanz Prosa ↔ Widget, Abschnitt ↔ Abschnitt

- **Widget-Nachsätze:** Jeder Vertiefungsblock wird von einem Ein-Satz-Fazit
  gefolgt („Wie das Widget zeigt, …", 7×, ~25 W je Satz, ~175 W gesamt). Das ist
  offensichtlich Konvention und für die Druckfassung ohne Widgets sogar nötig —
  **kein Kürzungsziel**.
- **Echte Prosa/Widget-Redundanz:** nur bei Bem. 9.1.4 (siehe E10) — der Text
  rechnet den Verdopplungsfaktor 4 mit Zahlen vor, den das Widget direkt darunter
  interaktiv zeigt.
- **Abschnittsredundanz:**
  1. Bsp. 9.3.11 (Ende, `S93.mdx:416–419`) ↔ Bem. 9.4.8 (Ende, `S94.mdx:264–266`) —
     dieselbe Aussage über Tensoren ab Stufe 3, fast wörtlich (siehe E10).
  2. Bem. 9.5.1 ↔ Tabelle „Das Wichtigste in Kürze" (beide `S95.mdx`) — zwei
     Zusammenfassungen desselben Kapitels hintereinander (siehe E10).
  3. Bem. 9.3.13 (Zwei Bedeutungen, zwei Zeichen) ↔ Quizfrage `S95.mdx:271–281`
     ↔ Quizfrage `S93.mdx:820–828`: dreimal „dieselben $mnpq$ Zahlen, anders
     angeordnet". Da die S95-Quizfragen als Wiederholung gedacht sind, ist das
     vertretbar; ebenso die Doublette S95-Quiz 1 (Nicht-Kommutativität) ↔
     S93-Quiz 6. Nur als Hinweis vermerkt, **nicht** zur Streichung empfohlen.

---

## 6. Nebenbefunde (keine Kürzungen)

- **Defekt:** `S93.mdx:571–574`, Vertiefung „Kroneckerprodukte selbst ausrechnen" —
  der Text ist verstümmelt: „Der Rechner zeigt beide Faktoren und das Produkt in
  Blockdarstellung. **Der erste Warum steht** in Satz 9.5.3 gerade
  $\bB^\top \kron \bA$ vor $\vec(\bX)$ …". Da ist offenbar eine Bearbeitung
  halb gelandet; der Satz ist grammatisch kaputt.
- **Lücken gegenüber dem Deck** (Gegenrichtung zur Kürzung, der Vollständigkeit halber):
  Zwei Folien haben im Skript keine Entsprechung — das Sylvester-/Lyapunov-Beispiel
  zum vec-Trick (`slides/09-tensoren.qmd:487–511`, inkl. R-Code; „Sylvester" kommt
  in `src/` nirgends vor) und die Tensorprodukt-Spline-Designmatrix
  $\vec(\bF) = (\bB_y \kron \bB_x)\vec(\bC)$ (`slides/09-tensoren.qmd:612–656`);
  Kapitel 13 (`S139.mdx:67–90`) benutzt dort eine allgemeine Designmatrix
  $\bB \in \R^{n \times K^p}$ ohne die Kronecker-Gitterstruktur. Falls gekürzt
  wird, wären das die einzigen zwei Stellen, an denen eher etwas *fehlt*.

---

## 7. Gesamturteil (3 Sätze)

Überlang sind in Kapitel 9 vor allem zwei Dinge: der Deep-Learning-Anwendungsteil in
S92, der drei ausdrückliche **Anhangs**folien des Decks im Fließtext nachbaut, und der
Apparat um die universelle Eigenschaft in S94, der eine einzige unnummerierte
Anhangsfolie zur Definition befördert und dann durch Bemerkung, Beispiel und Beweis
schleppt — zusammen mit vier Routine-Beweisen und einer Handvoll doppelt geführter
Rechnungen sind das ~3 350 Wörter, die als Vertiefung markiert oder gestrichen werden
können, ohne dass ein einziger prüfungsrelevanter Satz verloren geht.
Genau richtig und unantastbar sind dagegen S93 von Def. 9.3.1 bis Bsp. 9.3.17
(äußeres Produkt, Satz 9.3.4 mit Bild/Kern/Rang, Tensorprodukt, Kroneckerprodukt und
die beiden Blockstruktur-Beispiele) — das ist der dichteste, am besten mit Farbe
geführte Teil des ganzen Kapitels und wird aus Kapitel 10 heraus zitiert — ebenso die
Vektorisierung in S95 (Def. 9.5.2, Satz 9.5.3, Bsp. 9.5.4) und der Vorkenntnis-Block
in S91.
Die Quizblöcke (1 973 Wörter) sind gut kalibriert, hängen fast durchgängig an
konkreten Labels und sollten unverändert bleiben; die einzige strukturelle Schwäche
des Kapitels ist, dass `:::vertiefung` bisher nur Widgets umschließt und deshalb
niemandem signalisiert, was optional ist.
