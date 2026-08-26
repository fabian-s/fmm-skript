# Kürzungs-Review: Kapitel 5 — `src/chapters/05-lgs`

**Deck:** `slides/05-lgs.qmd` (3 680 Wörter, inkl. Anhang mit Cholesky-Induktionsbeweis
und „Cholesky mit Pivotierung", beide `visibility="uncounted"`)
**Skript:** S51–S55, **7 743 Wörter** (1 461 Zeilen)

| Klasse | Wörter | Anteil |
| --- | ---: | ---: |
| KERN (steht so/ähnlich auf den Folien) | ≈ 4 740 | 61 % |
| BRÜCKE (nötig zum Lesen, nicht auf den Folien) | ≈ 1 890 | 24 % |
| EXTRA (geht über die Folien hinaus) | ≈ 1 115 | 14 % |

Kapitel 5 ist **eines der disziplinierteren Kapitel des Skripts**: Die Folien-Struktur
ist praktisch 1:1 abgebildet, es gibt keine zusätzlichen Verfahren, keine
Anwendungsexkurse, keine Doppel-Beispiele. Das EXTRA konzentriert sich fast vollständig
auf **zwei ausformulierte Beweise** und einen Abschnitt, der auf den Folien im
*uncounted* Anhang steht.

---

## 1. Abschnittsübersicht

| Datei | Wörter | EXTRA | Ein-Satz-Urteil |
| --- | ---: | ---: | --- |
| `S51.mdx` (Matrizenrechnung, Komplexität) | 954 | ~3 % | Deckt die Folien fast wortgetreu ab (inkl. Strassen/AlphaTensor, die auf einer eigenen Folie stehen) — **nichts zu kürzen**. |
| `S52.mdx` (LGS, Gauß, Warum Zerlegungen) | 1 261 | ~3 % | Ebenfalls folientreu; die einzige Redundanz ist das vorweggenommene $(\begin{smallmatrix}0&1\\1&0\end{smallmatrix})$-Beispiel, das in S53 nochmal voll ausgeführt wird. |
| `S53.mdx` (LU-Zerlegung) | 2 678 | ~14 % | Solide, aber mit einem folienfremden Rang-1-Beweis (Satz 5.3.3) und dreifacher Wiederholung der Botschaft „die Zerlegung hängt nicht von $\bb$ ab". |
| `S54.mdx` (Cholesky) | 2 111 | ~29 % | **Der Kürzungs-Schwerpunkt**: Der 6-schrittige Induktionsbeweis und „Cholesky mit Pivotierung" stehen auf den Folien nur im uncounted Anhang. |
| `S55.mdx` (Vergleich, Zusammenfassung) | 739 | ~8 % | Guter Abschluss, aber drei aufeinanderfolgende Zusammenfassungen (Tabelle → Fazit 5.5.1 → „Was wir mitnehmen"). |

---

## 2. Priorisierte Empfehlungen

### A. ALS VERTIEFUNG MARKIEREN (nicht löschen — als überspringbar kennzeichnen)

**A1 — `S54.mdx:114–216`, Beweis von Satz 5.4.2 (Cholesky) + Quantor-/Eindeutigkeits-Nachtrag — 494 Wörter**
*Aktion:* in `:::::vertiefung[Warum die Zerlegung immer existiert: der Induktionsbeweis]`
(fünf Doppelpunkte, weil ein `::::beweis` darin liegt — KONVENTIONEN.md, Migration 3.3).
*Begründung:* Genau dieser Beweis steht auf den Folien im **Anhang** (`#cholesky-beweis-induktion`,
`visibility="uncounted"`), verlinkt aus dem Satz mit „*(Beweis per Induktion → Anhang)*". Die
Vorlesung behandelt ihn also selbst schon als optional. Es ist zugleich der längste
zusammenhängende Block des Kapitels (6 `:::schritt` mit vollständigen `::why`).
*Abhängigkeiten:* `S54.mdx:265` („Der Beweis von Satz 5.4.2 zeigt, dass das für SPD-Matrizen
immer so ausgeht") und `S54.mdx:82` (Existenzgarantie) verweisen auf die **Aussage**, nicht auf
die Beweisschritte; ebenso `widgets/CholeskyStepper.tsx:210`, `widgets/SpdRichtung.tsx:39` und
kapitelübergreifend `chapters/10-differentialrechnung/S107.mdx:243`. Alle bleiben intakt. Der
Nachtrag `S54:209–216` (positive Diagonale ⇒ Eindeutigkeit) sollte **außerhalb** der Vertiefung
in zwei Sätzen bleiben, weil die Folien die Eindeutigkeit im Theorem selbst führen.

**A2 — `S53.mdx:105–153`, Beweis von Satz 5.3.3 (Gauß ⇒ LU) — 289 Wörter**
*Aktion:* `:::::vertiefung[Die Eliminationsmatrizen sauber zusammenrechnen]`.
*Begründung:* Der Rang-1-Formalismus $\bL_k = \bI - \bl_k\be_k^\top$, die Inversenformel und das
Verschwinden der Mischterme kommen auf den Folien **überhaupt nicht** vor. Die Folie
(`05-lgs.qmd:261–295`) behauptet nur „Jedes $\bL_k^{-1}$ ist eine untere Dreiecksmatrix, also auch
$\bL$" + Bild + „$\bL$ sammelt einfach alle Eliminationskoeffizienten ein". Für die
Prüfungsvorbereitung reicht exakt das.
*Abhängigkeiten:* keine. `S53:236–237` verweist nur auf die Satz-Aussage.

**A3 — `S54.mdx:392–421`, „Cholesky mit Pivotierung" — 182 Wörter**
*Aktion:* `:::vertiefung[Cholesky mit Pivotierung: semidefinite und rangdefiziente Matrizen]`.
*Begründung:* Steht auf den Folien im Anhang (`#cholesky-pivotierung`, `visibility="uncounted"`),
angebunden nur über einen „(Details → Anhang)"-Link. Inhaltlich (rang-aufdeckend, low-rank
$O(k^2n)$, $p>n$) ist das Ausblicksmaterial.
*Abhängigkeiten:* `S55.mdx:42–45` verweist darauf („Für nur *semi*definite Matrizen springt die
pivotierte Variante ein (Abschnitt 5.4)") — ein Verweis auf eine Vertiefungsbox ist unschädlich.

> **Zwischensumme MARKIEREN: 965 Wörter** (12,5 % des Kapitels), Textbestand unverändert.

### B. STREICHEN / KÜRZEN

**B1 — `S55.mdx:47–54`, Bemerkung 5.5.1 (Fazit) — 59 Wörter → ZUSAMMENLEGEN mit „Was wir mitnehmen" (`S55:56–75`), Ersparnis ≈ 55**
*Begründung:* Drei Zusammenfassungen hintereinander: Vergleichstabelle (`S55:10–17`), Fazit-Bemerkung,
dann „Was wir mitnehmen". Die Folien haben zwar beides (Fazit auf der Vergleichsfolie, Wrap-up am
Ende), aber dort trennen sie mehrere Klicks; im Fließtext liest sich das als Triplikat. Der eine
inhaltliche Zusatz („Hesse-Matrizen sind nur unter Krümmungsannahmen positiv definit") wandert als
Halbsatz in den Cholesky-Punkt von „Was wir mitnehmen".
*Abhängigkeiten:* keine (`5.5.1` wird nirgends referenziert).

**B2 — `S53.mdx:262–268`, zweiter Absatz von Beispiel 5.3.6 — 67 Wörter → STREICHEN**
*Begründung:* Der Absatz zeigt, dass der Widerspruch auch ohne die Einsen-Normierung von $\bL$
bestehen bleibt. Der Widerspruch selbst ist im ersten Absatz (`S53:248–260`) schon vollständig
hergeleitet; die Verallgemeinerung beantwortet eine Frage, die die Folien gar nicht aufwerfen, und
kostet den Leser zwei zusätzliche Rechnungen für null neue Einsicht.
*Abhängigkeiten:* Beispiel 5.3.6 wird referenziert von `S53:351`, `S55:107` und
`widgets/LUStepper.tsx:179` — alle meinen den Nullpivot-Kern, nicht diesen Absatz.

**B3 — `S53.mdx:442–472`, Beweis von Satz 5.3.10 — 119 Wörter → KÜRZEN auf ≈ 55**
*Begründung:* Schritt 1 wiederholt wörtlich die gerade darüber stehende Quiz-Antwort (sein `::why`
sagt sogar „siehe Quiz"), Schritt 3 wiederholt Abschnitt 5.2 und Bemerkung 5.3.9. Übrig bleiben
muss nur die Summenrechnung (Schritt 2) — die Folie (`05-lgs.qmd:416–424`) erledigt die ganze
Komplexitätsaussage in vier Zeilen.
*Abhängigkeiten:* `S55:98` verweist auf die Satz-Aussage.

**B4 — `S54.mdx:312–344`, Beweis von Satz 5.4.4 (Kovarianz unter $\bL$) — 112 Wörter → KÜRZEN auf ≈ 60**
*Begründung:* Die Folie (`05-lgs.qmd:529–537`) führt die ganze Rechnung in **einer** Zeile. Schritte
1 und 2 sind je ein Satz Standardwissen (Linearität des Erwartungswerts, zentrierte Vektoren); das
`::why` von Schritt 3 enthält bereits das komplette Argument. Ein `::::beweis` mit einem Schritt
plus `::why` genügt.
*Abhängigkeiten:* Satz 5.4.4 wird referenziert von `S54:352`, `S54:360` und
`widgets/CholeskySampler.tsx:186` — jeweils die Aussage.

**B5 — `S55.mdx:24–35`, Wachstumsfaktor-Passage — ≈ 90 Wörter → KÜRZEN auf ≈ 45**
*Begründung:* Der Teil bis „Partielle Pivotierung hält alle Multiplikatoren im Betrag bei höchstens 1"
wiederholt `S53:360–369` fast wörtlich; danach folgt mit „Jeder Eliminationsschritt darf den
betragsgrößten Eintrag verdoppeln, im schlimmsten Fall exponentiell" ein Argument, das die Folie
(`05-lgs.qmd:604–607`) nicht bringt. Der $\kappa(\bA)\cdot\eps$-Satz am Ende (`S55:32–35`) ist KERN
und muss bleiben.
*Abhängigkeiten:* keine.

**B6 — `S53.mdx:333–339`, Bemerkung 5.3.9 — 58 Wörter → ZUSAMMENLEGEN mit Satz 5.3.10 Teil 3, Ersparnis ≈ 45**
*Begründung:* „Die Faktoren hängen nur von $\bA$ ab" steht im Abschnitt bereits dreimal:
`S53:28–30`, Bemerkung 5.3.2 und Satz 5.3.10 Teil 3 — plus zweimal in S55 (`S55:65–68`,
Selbsttest-Frage 2). Der QR-Ausblick am Ende von 5.3.9 kann als Halbsatz an 5.3.10 anschließen.
*Abhängigkeiten:* das `::why` in `S53:469` verweist auf Bemerkung 5.3.9 — beim Zusammenlegen
umformulieren.

**B7 — `S54.mdx:378–390`, „### Selbsttest" mit einer einzigen `:::frage` — 35 Wörter → ZUSAMMENLEGEN mit dem Kapitel-Selbsttest in S55**
*Begründung:* Kein Kürzungsziel wegen der Frage (Aufgaben sind billig), sondern **echte Dublette**:
Die Frage sagt aus, was Definition 5.4.1 sagt und was das SpdRichtung-Widget in seinem eigenen
`Verdikt` (`widgets/SpdRichtung.tsx:39`) und die Prosa `S54:40–42` bereits zweimal formulieren. Eine
eigene `###`-Überschrift für eine Einzelfrage ist zudem strukturell teuer.
*Abhängigkeiten:* keine.

**B8 — `S52.mdx:97–103`, Pivot-Absatz — 55 Wörter → KÜRZEN auf ≈ 25**
*Begründung:* Das $(\begin{smallmatrix}0&1\\1&0\end{smallmatrix})$-Gegenbeispiel wird hier
angerissen, in Beispiel 5.3.6 vollständig ausgeführt und in der Selbsttest-Frage `S55:105–109` ein
drittes Mal aufgerufen. An dieser Stelle genügen zwei Sätze („Invertierbarkeit allein reicht nicht,
ein Nullpivot kann trotzdem auftreten — siehe Beispiel 5.3.6") plus die Bemerkung zum kleinen Pivot.
*Abhängigkeiten:* keine.

**B9 — Widget-Echo-Prosa, verstreut — ≈ 60 Wörter → STREICHEN**
Sätze, die nur ankündigen, was das Widget ohnehin zeigt, ohne eine Aussage zu treffen:
`S52:110`, `S53:376`, `S53:483`, `S54:288`, `S54:375`.
Beispiel `S53:483`: „Das Kostenbild stellt die wiederverwendete Zerlegung dem vollständigen Neubeginn
gegenüber." — das ist die Bildunterschrift des Widgets, nicht Skripttext.
**Nicht streichen**: `S53:345–346` („Wie das Widget zeigt, werden die Multiplikatoren in $\bL$
gespeichert, während die Arbeitsmatrix zu $\bU$ wird") — das trägt Inhalt.

> **Zwischensumme STREICHEN/KÜRZEN: ≈ 450 Wörter** (5,8 % des Kapitels).

---

## 3. Audit der bestehenden `:::vertiefung`-Blöcke

Das Kapitel hat **drei** Vertiefungen, alle Widget-Boxen:

| Ort | Inhalt | Urteil |
| --- | --- | --- |
| `S53:371–377` „Kleine Pivots, große Fehler" (`PivotVergleich`) | korrekt platziert — die Kernbotschaft zur partiellen Pivotierung steht bereits **außerhalb** in `S53:360–369`; die Box liefert nur die Illustration. | OK |
| `S53:478–484` „Einmal zerlegen oder jedes Mal neu?" (`LUKostenPlot`) | korrekt platziert. **Aber:** die `:::zahlfrage` in `S53:486–492` („Ab wie vielen rechten Seiten ist die gespeicherte LU-Zerlegung im Kosten-Widget günstiger?") steht **außerhalb** der Box und ist ohne sie nicht beantwortbar → in die Vertiefung verschieben. | OK, Frage umhängen |
| `S54:357–376` „Wie $\bL$ eine runde Punktwolke verformt" (`CholeskySampler`) | **einziger Fall von Kernstoff in einer Vertiefung**: Die Folien haben die Simulationsdemo als volle, gezählte Folie (`05-lgs.qmd:539–598`, inkl. Gitter-Plot und $\rho = 0{,}9$-Beispiel). Da eine Vertiefungsbox nichts versteckt, sondern nur labelt, ist das vertretbar; wenn es genau eine Box im Kapitel geben soll, die keine ist, dann diese. | grenzwertig |

Umgekehrt ist **kein** Kernstoff in einer Vertiefung vergraben. Die drei Empfehlungen A1–A3 würden
die Zahl der Vertiefungen von 3 auf 6 heben — angemessen, weil die Folien bei A1 und A3 die
Anhang-Markierung bereits selbst vornehmen.

---

## 4. Redundanz zwischen Abschnitten und zwischen Prosa und Widgets

- **„Zerlegung hängt nicht von $\bb$ ab"**: sechsmal (`S53:28–30`, Bem. 5.3.2, Bem. 5.3.9,
  Satz 5.3.10.3, `S55:65–68`, `S55` Selbsttest-Frage 2). → B6.
- **Nullpivot-Gegenbeispiel $(\begin{smallmatrix}0&1\\1&0\end{smallmatrix})$**: dreimal
  (`S52:99–101`, Beispiel 5.3.6, `S55:105–109`). → B8.
- **Kleine Pivots ⇒ Instabilität**: dreimal (`S52:101–103`, `S53:360–369`, `S55:18–31`). → B5, B8.
- **„Keine explizite Inverse bilden"**: dreimal (Bem. 5.2.1, `S55:60–64`, `S55` Selbsttest-Frage 1) —
  **hier nichts kürzen**, das ist die Schlagzeile des Foliensatzes („*Invertiere niemals eine
  Matrix!*") und die Wiederholung ist gewollt.
- **Prosa vs. Widget**: fünf reine Echo-Sätze (B9); ansonsten sind Widget und Text sauber getrennt.

**Nicht-Kürzungs-Beobachtung (Lücke, kein Wortproblem):** Die Folien belegen die
Inversen-Warnung empirisch mit dem Hilbert-Matrix-Demo (`05-lgs.qmd:158–172`: Fehler $0{,}3$ über
$\bA^{-1}$ vs. $3\cdot10^{-4}$ direkt). Im Skript fehlt jede Zahl dazu; Bemerkung 5.2.1 argumentiert
rein verbal — und relativiert die Folienaussage sogar („nicht grundsätzlich instabil"). Ein
kleines Zahlenbeispiel oder ein Widget wäre hier mehr wert als jede Kürzung.

---

## 5. Summe

| Aktion | Wörter | Anteil am Kapitel |
| --- | ---: | ---: |
| **ALS VERTIEFUNG MARKIEREN** (A1–A3) | **965** | 12,5 % |
| **STREICHEN / KÜRZEN** (B1–B9) | **≈ 450** | 5,8 % |
| zusammen als „in der Prüfungsvorbereitung überspringbar" gekennzeichnet oder entfernt | ≈ 1 415 | 18,3 % |

Der laufende Text schrumpft also um knapp 6 %, und weitere 12,5 % werden für den lesenden
Studierenden als optional erkennbar. Mehr ist ohne Substanzverlust nicht drin.

---

## 6. Gesamturteil (3 Sätze)

Kapitel 5 ist eines der folientreuesten Kapitel des Skripts — überlang sind praktisch nur die
beiden ausformulierten Beweise (Satz 5.3.3, Satz 5.4.2, zusammen 780 Wörter, beide auf den Folien
gar nicht bzw. nur im uncounted Anhang) sowie die dreifach ausgesprochene Botschaft „die Zerlegung
hängt nicht von $\bb$ ab" und der dreifache Schluss in S55. Unantastbar sind S51 und S52 komplett
(sie bilden die Folien nahezu 1:1 ab und enthalten kein einziges nennenswertes EXTRA), die beiden
durchgerechneten Beispiele 5.3.4/5.3.8 und 5.4.3 samt Farbcode, die Vergleichstabelle in S55 und
sämtliche `:::frage`/`:::zahlfrage`-Blöcke. Wenn nur eine einzige Maßnahme umgesetzt wird, dann A1:
der Cholesky-Induktionsbeweis ist mit fast 500 Wörtern der größte Einzelbrocken des Kapitels und
steht auf den Folien selbst schon als „→ Anhang" markiert.
