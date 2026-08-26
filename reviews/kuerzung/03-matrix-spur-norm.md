# Kürzungs-Review: Kapitel 03 — Matrix-Spur und Matrixnormen

**Kapitel:** `src/chapters/03-matrix-spur-norm` (S31–S36)
**Deck:** `slides/03-matrix-spur-norm.qmd` (2389 Wörter Folientext inkl. Anhang: Beweisskizze Spur/EW, Beweis Spektralnorm, Gegenbeispiel Maximumsnorm, Ausblick ML)
**Wörter gesamt:** 11 578

| Klasse | Wörter (geschätzt) | Anteil |
|---|---|---|
| KERN (steht so/ähnlich auf den Folien) | ~6 300 | ~54 % |
| BRÜCKE (nicht auf den Folien, aber tragend) | ~3 300 | ~29 % |
| EXTRA (geht über die Folien hinaus) | ~1 980 | ~17 % |

Zum Vergleich: Das Kapitel ist mit 11,6k Wörtern **eines der kürzeren** des Skripts
(215k / 13 Kapitel ≈ 16,5k Schnitt). Der EXTRA-Anteil von 17 % ist niedrig, und er
sitzt sehr ungleich verteilt: fast die Hälfte davon in S35.

---

## 1. Abschnittsübersicht

| Datei | Abschnitt | Wörter | Anteil EXTRA | Ein-Satz-Urteil |
|---|---|---:|---:|---|
| S31.mdx | 3.1 Die Spur einer Matrix | 1 859 | ~12 % | Deckt die vier Folien 1:1 ab und fügt genau das hinzu, was Folien nicht können (Beweis der Zyklizität, Hutmatrix-Beispiel) — kaum etwas zu holen. |
| S32.mdx | 3.2 Matrixnormen: Definition und Beispiele | 1 644 | ~14 % | Straff; einziger echter Überhang ist der Routine-Beweis, dass Vektorisierungsnormen Normen sind. |
| S33.mdx | 3.3 Operatornormen | 2 305 | ~13 % | Der längste Abschnitt, aber praktisch alles ist Folienstoff oder bereits als `:::vertiefung` markiert; nicht antasten. |
| S34.mdx | 3.4 Schattennormen | 1 852 | ~16 % | Die Singulärwert-Brücke ist besser als die Folie und muss bleiben; nur das durchgerechnete Beispiel 3.4.6 hat eine überflüssige Schlussrechnung. |
| S35.mdx | 3.5 Eigenschaften von Matrixnormen | 2 881 | ~24 % | **Der Hebel des Kapitels:** vier Beweise (550 W), die die Vorlesung sämtlich nur zitiert, plus eine Herleitung, die Kapitel 4 ohnehin nochmal macht. |
| S36.mdx | 3.6 Zusammenfassung | 1 037 | ~29 % | Als Zusammenfassung zu lang: Aufwandstabelle und ML-Ausblick sind Zusatzstoff, „Wie geht es weiter?" wiederholt 3.5.4/3.5.5 fast wörtlich. |

---

## 2. Priorisierte Empfehlungen

### A. MARKIEREN als `:::vertiefung` (größter Effekt, null Qualitätsverlust)

Die Folien nennen diese Resultate, führen sie aber **nicht** vor. Wer für die Klausur
liest, kann jeden dieser Blöcke überspringen, ohne dass der Faden reißt — die Sätze
selbst bleiben ja im Lesepfad.

| # | Datei:Zeilen | Label | W | Aktion | Begründung / Abhängigkeiten |
|---|---|---|---:|---|---|
| A1 | `S32.mdx:101-148` | Satz 3.2.4 + 4-Schritt-Beweis | 198 | `:::vertiefung` | Folie sagt nur „Methode: Vektorisierung → Vektornorm anwenden"; der Nachweis der drei Axiome ist reine Fingerübung (vec ist linear und bijektiv). **Definition 3.2.3 (`\vec`) muss außerhalb bleiben** — sie wird in `S36` (Konzepttabelle) und in `09-tensoren/S93.mdx`, `S95.mdx` gebraucht. Satz 3.2.4 selbst wird nirgends extern referenziert. |
| A2 | `S35.mdx:292-338` | Beweis zu Satz 3.5.9 (Verträglichkeiten) | 168 | `:::vertiefung` | Folie listet die drei Verträglichkeiten ohne jede Begründung. (1) und (2) sind Einzeiler aus schon Bewiesenem, (3) ist eine Cauchy-Schwarz-Rechnung. Keine externen Verweise auf 3.5.9. |
| A3 | `S36.mdx:78-124` | „Was kostet die Berechnung?" + Aufwandstabelle | 166 | `:::vertiefung` | Steht auf keiner Folie. Nützlich und schön kompakt, aber nichts, was in einer Klausur abgefragt wird; O-Notation kommt aus Kapitel 2. Keine Abhängigkeiten. |
| A4 | `S35.mdx:73-99` | Beweis der Kette ‖A‖₂ ≤ ‖A‖_F ≤ √min(m,n)·‖A‖₂ | 133 | `:::vertiefung` | Folie führt die Konstanten nur als Liste auf. Die Schärfe der Konstante wird im Selbsttest `S35.mdx:514-521` und im Äquivalenz-Widget erneut behandelt — die dortige Argumentation trägt allein, der Beweis ist Zugabe. |
| A5 | `S35.mdx:163-195` | Beweis zu Satz 3.5.5 (Operatornormen submultiplikativ) | 138 | `:::vertiefung` (**nur Schritte 2–3**, ~100 W) | Folie behauptet die Aussage ohne Beweis. **Achtung:** Schritt 1 (Hilfsungleichung ‖My‖ ≤ ‖M‖·‖y‖) ist tragend — er wird in Satz 3.5.9(2) wiederverwendet und die `why`-Zeile in `04-fehler/S42.mdx:246` verweist genau darauf („definierende Eigenschaft der Operatornorm … Abschnitt 3.3"). Schritt 1 als eigene Bemerkung **außerhalb** der Box stehen lassen. |
| A6 | `S35.mdx:448-482` | Beweis zu Satz 3.5.12 (Rückwärtsfehler) | 111 | `:::vertiefung` | Die Folie „Normen in der Fehleranalyse" gibt Formel und Ergebnis, keinen Beweis. Der vierte Schritt braucht zusätzlich die Rang-1-Norm-Identität ‖uvᵀ‖₂ = ‖u‖₂‖v‖₂, die im Skript sonst nicht vorkommt. Kein externer Verweis auf 3.5.12; Kapitel 4.3 definiert Rückwärtsfehler unabhängig neu. |
| A7 | `S36.mdx:126-144` | Bemerkung 3.6.1 (Ausblick: Normen als Regularisierer) | 93 | `:::vertiefung` | Steht im Folien-**Anhang** unter der Überschrift „Ausblick" — also schon dort als Zusatz gekennzeichnet. Inhaltlich hübsch (Ridge/LASSO/Matrix Completion), aber Vorgriff auf Kapitel 12/13. |
| A8 | `S33.mdx:43-55` | Bemerkung 3.3.2 (zwei Normen; max statt sup) | 95 | `:::vertiefung` | Nicht auf den Folien. Beantwortet eine echte Studierendenfrage (Kompaktheit der Einheitssphäre), ist aber für jede Rechnung entbehrlich. Grenzfall — nur markieren, nicht streichen. |

**Summe MARKIEREN: ~1 064 Wörter (9,2 % des Kapitels)**

### B. STREICHEN / KÜRZEN (echte Einsparung)

| # | Datei:Zeilen | Label | W | Aktion | Begründung / Abhängigkeiten |
|---|---|---|---:|---|---|
| B1 | `S36.mdx:231-248` | „Wie geht es weiter?" | 127 | **KÜRZEN auf ~40** (Ersparnis 87) | Wiederholt drei Dinge, die zwei Bildschirmseiten vorher stehen: die Definition κ(A) = ‖A‖·‖A⁻¹‖ (Def. 3.5.10), κ₂ = σ_max/σ_min (Abschn. 3.5.4, inkl. des Symmetrie-Zusatzes wörtlich) und die Rückwärtsfehler-Formel (Satz 3.5.12) — und die κ-Zeile steht zusätzlich in der Konzepttabelle `S36:56-58`. Zwei Sätze Überleitung nach Kapitel 4 genügen. Keine Abhängigkeiten. |
| B2 | `S35.mdx:380-395` | Herleitung der zweiten Gleichheit in κ₂ | 108 | **KÜRZEN auf ~40** (Ersparnis 68) | Die Kette „EW von (A⁻¹)ᵀA⁻¹ = Kehrwerte der EW von AAᵀ, und AAᵀ hat dieselben EW wie AᵀA" wird in `04-fehler/S42.mdx` (Bem. 4.2.7) und in Kapitel 6 über die SVD noch **zweimal** sauberer erzählt. Hier reicht der Verweis plus die Interpretation („Verhältnis der extremen Streckungsfaktoren"). Der Zusatz κ_F(Iₙ)=n (Z. 375-378) ist dagegen wertvoll und muss bleiben. |
| B3 | `S33.mdx:407-414` | 3. `SelbsttestFrage` („Warum gilt ‖Iₙ‖ = 1 für jede Operatornorm?") | 70 | **STREICHEN** | Echte Dublette: Beispiel 3.3.9 (`S33:375-388`) sagt Frage *und* Antwort bereits vollständig, inklusive des Kontrasts zu ‖Iₙ‖_F = √n — die Selbsttest-Antwort formuliert denselben Zweizeiler noch einmal. (Einzige Quizausnahme; die übrigen `:::frage`/`:::zahlfrage` sind alle widget- oder rechenbezogen und sollen bleiben.) |
| B4 | `S34.mdx:199-213` | Beispiel 3.4.6, Schlussrechnung Nuklearnorm | 74 | **KÜRZEN auf ~15** (Ersparnis 59) | σ₁+σ₂ ≈ 3,162 steht bereits numerisch da; die geschlossene Form über (σ₁+σ₂)² = λ₁+λ₂+2√det ist ein hübscher, aber folgenloser Rechentrick. **Abhängigkeit:** die `:::zahlfrage` in `S34:329-337` nennt „3,162 = √10" — der Wert √10 muss also als Einzeiler erhalten bleiben, die Herleitung nicht. |
| B5 | `S31.mdx:220-232` | Nachsatz zu Satz 3.1.7 | 113 | **KÜRZEN auf ~60** (Ersparnis 53) | Der Schlusssatz „Die Spur verrät die Summe aller Eigenwerte zum Preis von n−1 Additionen" wiederholt `S31:54-56` („numerisch ein Schnäppchen: n−1 Additionen, keine einzige Multiplikation"). Behalten: algebraische Vielfachheit + konjugierte Paare — darauf bauen der Selbsttest (`S31:337-343`, `345-354`) und das Spur-Widget auf. |
| B6 | `S35.mdx:484-493` | Schlussprosa zu Satz 3.5.12 | 97 | **KÜRZEN auf ~60** (Ersparnis 37) | Erste Hälfte liest den gerade bewiesenen Satz Term für Term noch einmal vor („links steht … rechts stehen …"). Die zweite Hälfte (Faustregel Vorwärtsfehler ≲ κ · Rückwärtsfehler) ist die Pointe und bleibt. |
| B7 | `S32.mdx:187-190` | Schlusssatz der Widget-Prosa | 25 | **KÜRZEN** | „Genau diese Blindheit führt … zu den Operatornormen" steht **dreifach**: im `Verdikt` von `S32VecNormWidget.tsx:139-143`, hier, und in der Selbsttest-Antwort `S32.mdx:284`. Eines der drei Vorkommen reicht; die *Beschreibung* dessen, was der Tauschknopf tut, muss bleiben (siehe Abschnitt 4). |

**Summe STREICHEN/KÜRZEN: ~399 Wörter (3,4 % des Kapitels)**

**Gesamt: ~1 463 Wörter (12,6 %) aus dem Kern-Lesepfad, davon nur 399 wirklich gelöscht.**

### C. Ausdrücklich NICHT kürzen (geprüft und verworfen)

- `S31.mdx:95-125` — Beweis zu Satz 3.1.4 (103 W). Die Doppelsummen-Rechnung für tr(AB)=tr(BA) ist der einzige Beweis im Kapitel, der *rein aus der Definition* läuft, und Eigenschaft 4 fällt als Einzeiler daraus ab. Satz 3.1.4 wird extern in `10-differentialrechnung/S104.mdx:374` benutzt. Behalten.
- `S31.mdx:153-170` — Beispiel 3.1.6 (Hutmatrix, tr(H)=p, 108 W). Nicht auf den Folien, aber die statistische Rechtfertigung des ganzen Abschnitts und in 100 Wörtern erledigt. Behalten.
- `S34.mdx:24-81` — Einführung der Singulärwerte (322 W). Die Folie definiert Schattennormen nur über die Eigenwerte von AᵀA; das Skript macht daraus die geometrisch tragfähige Version (Halbachsen der Bildellipse), auf die Kapitel 6 (`S61`, `S64`, `S65`) direkt aufsetzt. **Kernstoff, nicht antasten.**
- `S34.mdx:162-198` — Rest von Beispiel 3.4.6. Das einzige durchgerechnete Schattennorm-Beispiel des Skripts, mit Probe elementweise vs. über Singulärwerte. Behalten.
- `S35.mdx:397-418` — Bemerkung 3.5.11 inkl. κ ≥ 1. Steht auf der Folie und liefert die Schranke, die die Folie schuldig bleibt.
- `S35.mdx:215-244` — Beispiel 3.5.6 + Bemerkung 3.5.7 (Gesamtnorm). Beides im Folien-Anhang; die Gesamtnorm wird sonst nirgends im Skript erwähnt, ist aber die Pointe des Gegenbeispiels.
- Alle `:::frage`/`:::zahlfrage` außer B3 — pro Brief kein Kürzungsziel, und die widgetbezogenen Zahlfragen sind der einzige Mechanismus, der Leser tatsächlich an die Regler bringt.

---

## 3. Prüfung der bestehenden `:::vertiefung`-Blöcke

Das Kapitel hat **6** `:::vertiefung`-Blöcke. Fünf davon enthalten **ausschließlich ein
Widget** und keine Prosa:

| Datei:Zeile | Titel | Inhalt | Urteil |
|---|---|---|---|
| `S32.mdx:46-48` | „Auffrischung: Was misst die Norm an der Einheitskugel?" | nur `<S32NormBallWidget/>` | Korrekt — Vorkenntnis-Auffrischung, überspringbar. |
| `S32.mdx:183-185` | „Frobenius-, Summen- und Maximumsnorm: was sehen sie, was nicht?" | nur `<S32VecNormWidget/>` | Inhalt ist **KERN** (Folie „Problem mit element-weisen Normen"), aber die Prosa davor/danach trägt ihn vollständig — Box unschädlich. |
| `S33.mdx:158-197` | „Beweis der Spaltensummenformel" | echter Beweis, 156 W | **Vorbildlich** — genau die Sorte Block, die in die Box gehört. Einziger echter Vertiefungsblock. |
| `S34.mdx:290-292` | „Was überlebt eine Drehung?" | nur `<S34SchattenWidget/>` | Inhalt ist **KERN** (Folie „unitär invariant"), Satz 3.4.7 steht aber außerhalb. Unschädlich. |
| `S35.mdx:125-127` | „Wie scharf sind die Äquivalenzkonstanten?" | nur `<S35AequivalenzWidget/>` | Korrekt — die Schärfefrage ist echtes Extra. |
| `S35.mdx:207-209` | „Gilt ‖AB‖ ≤ ‖A‖·‖B‖ für jede Matrixnorm?" | nur `<S35SubmultWidget/>` | Inhalt ist **KERN** (Folien-Anhang), Beispiel 3.5.6 trägt ihn außerhalb. Unschädlich. |

**Befund:** In diesem Kapitel ist `:::vertiefung` faktisch zu einem *Widget-Wrapper*
umgewidmet worden — nur einer von sechs Blöcken markiert wirklich „Zusatzstoff".
Damit steht dem Leser genau das Signal, das sich der Autor wünscht, hier praktisch
nicht zur Verfügung. Die Empfehlungen A1–A8 stellen es wieder her. **Kernstoff ist
umgekehrt nirgends in einer Vertiefung versteckt** (die drei KERN-Widgets sind alle
prosaisch abgesichert).

---

## 4. Redundanz Prosa ↔ Widget

Jedes der sechs Widgets trägt ein `<Verdikt>` mit dynamisch generiertem Fließtext, und
in fünf Fällen sagt der Absatz *direkt nach* dem Widget im Kern dasselbe:

| Widget | Prosa danach | W | Deckungsgrad mit dem `Verdikt` |
|---|---|---:|---|
| `S31SpurWidget` | `S31.mdx:240-244` | 100 | hoch (konjugierte Paare, Imaginärteile heben sich weg, Spur liest nur die Diagonale — im Verdikt Z. 337-344 wortgleich in der Sache) |
| `S32VecNormWidget` | `S32.mdx:187-190` | 60 | hoch, Schlusssatz **wörtlich** identisch (siehe B7) |
| `S33OperatornormWidget` | `S33.mdx:108-115` | 135 | mittel-hoch (Pendeln zwischen den Halbachsen, Sonderfälle Drehung/singulär) |
| `S34SchattenWidget` | `S34.mdx:294-299` | 90 | hoch (inkl. der Zahl 10⁻¹⁶ für das Rundungsrauschen) |
| `S35AequivalenzWidget` | `S35.mdx:129-133` | 85 | hoch (beide Ränder werden angenommen, Konstante nicht verbesserbar) |
| `S35SubmultWidget` | `S35.mdx:211-213` | 40 | mittel |

**Empfehlung: diese Absätze NICHT streichen** (Ausnahme: der eine wörtliche Dreifach-Satz
B7). Grund: Die Druckfassung ersetzt jedes Widget durch einen Platzhalter
(`scripts/pdf/mdx-to-latex.mjs:696-697` → `\fmmwidget{…}`), das `Verdikt` erscheint im
544-Seiten-PDF also **überhaupt nicht**. Die Nachbereitungs-Prosa ist dort der einzige
Träger der Beobachtung. Wer hier kürzt, reißt Löcher ins Buch, nicht in die Website.

Abschnittsübergreifende Redundanz sonst: gering und meist gewollt (Iₙ als roter Faden
3.2 → 3.3 → 3.4; Frobenius über die Spur in 3.1.10 und noch einmal als Schritt 1 von
Satz 3.4.3 — letzteres ist die *nötige* Verzahnung, weil dort die Spektralzerlegung
dazukommt). Einzige unnötige Wiederholung: B1 und B5.

---

## 5. Gesamturteil (3 Sätze)

Überlang ist praktisch nur **S35**: vier Beweise, die die Vorlesung sämtlich nur zitiert
(550 W), plus eine κ₂-Herleitung, die Kapitel 4 und 6 ohnehin wiederholen — und **S36**,
das als Zusammenfassung mit Aufwandstabelle, ML-Ausblick und einem Ausblicksabsatz endet,
der 3.5.4/3.5.5 nacherzählt. Genau richtig und unantastbar sind S31 (die Spur wird in
1 850 Wörtern von der Diagonalsumme bis zur Hutmatrix vollständig motiviert), die
Singulärwert-Brücke in 3.4.1, auf die Kapitel 6 direkt aufsetzt, und die
Nachbereitungs-Prosa zu allen sechs Widgets, die im PDF die Widgets ersetzt. Der reale
Kürzungsspielraum ist mit ~400 gestrichenen Wörtern klein — der Gewinn liegt im
Markieren: 1 064 Wörter (9 %) können als `:::vertiefung` aus dem Prüfungslesepfad
verschwinden, ohne dass ein einziger Satz des Kapitels verloren geht.
