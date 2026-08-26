# Kürzungs-Review Kapitel 6 (SVD)

**Kapitel:** `src/chapters/06-svd/` (S61–S65)
**Deck:** `slides/06-svd.qmd` (3 433 Wörter Quelltext inkl. YAML/Anhang)
**Wörter gesamt:** 14 703 (S61 1 842 · S62 3 744 · S63 3 885 · S64 3 774 · S65 1 458)

| Klasse | Wörter (geschätzt) | Anteil |
| --- | --- | --- |
| KERN (steht so/ähnlich auf den Folien) | ≈ 6 550 | ≈ 45 % |
| BRÜCKE (nötig, damit der Kernstoff im Skript trägt) | ≈ 4 900 | ≈ 33 % |
| EXTRA (über die Folien hinaus) | ≈ 3 250 | ≈ 22 % |

Zum Vergleich: Das Deck deckt den Stoff auf 32 Hauptfolien + 6 Anhangsfolien ab. Das
Skript ist damit knapp 4,5-mal so lang wie die Folienquelle — für ein Kapitel, das
eine einzige Vorlesung trägt, ist das viel, aber es ist eines der *besser*
proportionierten Kapitel: Der EXTRA-Anteil sitzt fast ausschließlich in Beweisen und
in zwei Beispiel-Dubletten, nicht in Themen, die die Vorlesung gar nicht behandelt.

---

## 1. Abschnittstabelle

| Datei | Wörter | Anteil EXTRA | Ein-Satz-Urteil |
| --- | --- | --- | --- |
| `S61.mdx` (6.1 Motivation) | 1 842 | ≈ 3 % | Praktisch folienidentisch, nur mit ausgeschriebener Geometrie-Intuition; **nicht antasten**. |
| `S62.mdx` (6.2 Singulärwerte/-vektoren, Hauptsatz) | 3 744 | ≈ 13 % | Der Kern des Kapitels, sauber gebaut; einziger echter Zusatz ist der 4-Schritt-Beweis von Satz 6.2.11 (Folie zeigt den Satz ohne Beweis). |
| `S63.mdx` (6.3 Reduzierte SVD, Pseudoinverse) | 3 885 | ≈ 31 % | Der überlangste Abschnitt: ein 7-Schritt-Beweis, zwei vollständig durchgerechnete Pseudoinversen-Beispiele und eine Vierfach-Bemerkung, die die Folie in drei Zeilen abhandelt. |
| `S64.mdx` (6.4 Anwendungen, Eckart–Young) | 3 774 | ≈ 22 % | Inhaltlich fast durchgehend auf der Folie, aber mit einer Indexbeweis-Passage und zwei Folien-*Anhang*-Bemerkungen, die im Fließtext gleichrangig mitlaufen. |
| `S65.mdx` (6.5 Zusammenfassung) | 1 458 | ≈ 41 % | Als Zusammenfassung zu lang: Die Querverbindungsliste wiederholt 6.5.1 und die Abschnittseinstiege, das Auslöschungsbeispiel ist ein eigenständiger Exkurs. |

---

## 2. Priorisierte Empfehlungen

Sortiert nach *Ersparnis pro Qualitätsverlust*. „MARKIEREN" heißt: Text bleibt, wandert
aber in `:::vertiefung` (bei Beweisen: **fünf** Doppelpunkte außen, `:::::vertiefung >
::::beweis > :::schritt`, vgl. KONVENTIONEN.md Migration 3.3).

### A. Beweise, die die Vorlesung nur zitiert → VERTIEFUNG

**A1. `S63.mdx:359–461` — Beweis zu Satz 6.3.8 (Eigenschaften der Pseudoinversen), 444 W → MARKIEREN**
Sieben Schritte für vier Aussagen. Die Folie („Eigenschaften der Pseudoinverse") zeigt
davon genau eine Zeile: `AA⁺ = U_rΣ_rV_r^TV_rΣ_r^{-1}U_r^T = U_rU_r^T`. Die Schritte 3–5
(Wirkung auf `col(A)`, auf dem orthogonalen Komplement, Zusammensetzen) sind das
Standard-Projektionsargument und in Kapitel 7 ohnehin nochmals präsent.
*Begründung:* größter Einzelblock des Kapitels, Aussage 1–4 sind ohne ihn vollständig
benutzbar, Beispiel 6.3.7 liefert die Anschauung bereits.
*Abhängigkeiten:* Beispiel 6.3.11 (`S63:582`) verweist auf „Schritt 2 im Beweis zu Satz
6.3.8"; Beweis zu Korollar 6.3.9 (`S63:481`) auf „Schritt 1 des vorigen Beweises". Beide
Verweise überleben eine Vertiefung, brauchen aber ggf. eine Umformulierung.
*Alternative (falls Vertiefung zu grob):* Schritte 3–5 zu einem Schritt zusammenziehen
→ ca. 200 W echte Ersparnis.

**A2. `S62.mdx:431–489` — Beweis zu Satz 6.2.11 (fundamentale Unterräume), 296 W → MARKIEREN**
Vier Schritte (Kern, Umkehrung, Spaltenraum, Zeilenraum). Auf der Folie steht der Satz
ohne jeden Beweis; das Rechenbeispiel (6.2.12) übernimmt dort die Beweislast.
*Abhängigkeiten:* keine Rückverweise auf einzelne Schritte. Satz 6.2.11 selbst wird
mehrfach zitiert (S63:44, S63:397, S65:61) — das Label bleibt, nur der Beweis wandert.

**A3. `S64.mdx:105–153` — Beweis zu Satz 6.4.2 (Summenform), 234 W → KÜRZEN auf ≈ 130 W**
Schritte 1–2 (Doppelsumme kollabiert auf die Diagonale) sind die eigentliche Einsicht
und sollten bleiben. Schritt 3 (Rang 1) und Schritt 4 (‖u_ivᵢᵀ‖_F = 1) beweisen zwei
Aussagen, die die Folie schlicht behauptet, und sind je vier Zeilen Rechnung für eine
Trivialität.
*Ersparnis:* ≈ 104 W.
*Abhängigkeiten:* **Satz 6.4.2 wird von außen zitiert** — `09-tensoren/S93.mdx:188` und
`09-tensoren/S94.mdx:241`. Label und Aussage müssen unverändert bleiben; nur die
Beweisschritte 3–4 kürzen.

**A4. `S63.mdx:475–503` — Beweis zu Korollar 6.3.9 (Spezialfälle), ≈ 120 W → KÜRZEN auf ≈ 50 W**
Drei Schritte für drei Zeilen Aussage; Schritt 3 („beide Fälle greifen gleichzeitig")
steht wortgleich schon in der Selbsttest-Antwort `S63:684–690`.
*Ersparnis:* ≈ 70 W.

### B. Doppelt gerechnete Beispiele → KÜRZEN / ZUSAMMENLEGEN

**B1. `S63.mdx:537–588` — Beispiel 6.3.11 (Pseudoinverse der Beispielmatrix), 364 W → KÜRZEN auf ≈ 150 W**
Das ist das *zweite* vollständig durchgerechnete Pseudoinversen-Beispiel des Abschnitts.
Beispiel 6.3.7 (Rang-1-Matrix) hat AA⁺ und A⁺A bereits ausgerechnet und beide „das ist
keine Einheitsmatrix, und zwar aus je eigenem Grund" durchgespielt; 6.3.11 wiederholt
diese Pointe mit anderen Zahlen. Steht so auch nicht auf den Folien.
Behaltenswert davon: die Anwendung von ($6.3.6$), also A⁺ = (AᵀA)⁻¹Aᵀ ohne Singulärwerte,
plus die Probe A⁺A = I₂ (Zeilen 549–570). Streichbar: der zweite Teil ab Zeile 572
(AA⁺ ≠ I₃, `I₃ − u₃u₃ᵀ`) und der Spur-Exkurs (Zeilen 582–587, ≈ 85 W), der die zyklische
Vertauschbarkeit der Spur aus Kapitel 3 nur noch einmal vorführt.
*Ersparnis:* ≈ 214 W.
*Abhängigkeiten:* `u₃` stammt aus Beispiel 6.2.14; keine externen Verweise auf 6.3.11.

**B2. `S65.mdx:118–155` — Beispiel 6.5.2 (Der Umweg über AᵀA), 272 W → MARKIEREN**
Sauber gerechnet und didaktisch gut, aber die Folie sagt dazu genau einen Halbsatz
(„SVD **nicht** über AᵀA berechnen (numerisch instabil)"). Das ist Lehrbuchmaterial für
Interessierte, nicht Prüfungsstoff.
*Abhängigkeiten:* `08-la-misc/S82.mdx:113` verweist auf „Kapitel 6 …#sec-6.5" für genau
dieses Argument, `08-la-misc/S81.mdx:813` auf `#sec-6.5` für `irlba`. Beides sind
Abschnitts-Anker, keine Label-Verweise — eine Vertiefung innerhalb von 6.5 bricht sie nicht.
Die Faustregel `σ < √ε·σ₁` (Zeilen 151–154) sollte im Fließtext bleiben, auch wenn das
Beispiel wandert.

### C. Folien-Anhangsmaterial, das im Skript gleichrangig mitläuft → VERTIEFUNG

**C1. `S64.mdx:300–320` — Bemerkung 6.4.7 (Typische Singulärwert-Verläufe, Ellenbogen), 156 W → MARKIEREN**
Auf der Folie ist genau das der Anhang „Typische Singulärwert-Verläufe"
(`06-svd.qmd:704–723`), von der Hauptfolie nur verlinkt. Im Skript steht es zwischen
zwei Kern-Bemerkungen.
*Abhängigkeiten:* Verweise aus `S64:357` (Algorithmus 6.4.9), `S64:647` (Selbsttest),
`S65:107`. Alle bleiben gültig.

**C2. `S64.mdx:452–471` — Bemerkung 6.4.13 (Stärken, Schwächen, Ausblick / Matrix Completion), 148 W → MARKIEREN**
Entspricht 1:1 dem Folienanhang „Empfehlungssysteme: Details" (`06-svd.qmd:725–746`).
Der Einwand „Schritt 1 erfindet Daten" ist der stärkste Satz des Abschnitts und sollte
als *ein* Satz im Fließtext bleiben; der Rest (Speicher, Glättung, Robustheit, NMF) darf
in die Vertiefung.
*Abhängigkeiten:* Selbsttest `S64:596` verweist auf 6.4.13 — bleibt gültig.

### D. Reine Wiederholungen → STREICHEN / KÜRZEN

**D1. `S65.mdx:46–88` — „Querverbindungen", 274 W → KÜRZEN auf ≈ 120 W**
Sechs Spiegelstriche, von denen vier (Eigenwerttheorie, fundamentale Unterräume,
Projektionen, Optimierung) inhaltlich das wiederholen, was 6.5.1 unmittelbar davor als
„fünf Kernkonzepte" aufzählt, und was die jeweiligen Abschnittseinstiege schon gesagt
haben. Der Normen-Punkt (σ₁ = ‖A‖₂, ‖A‖_F, κ₂) trägt echte neue Information und sollte
bleiben, ebenso der Matrixzerlegungs-Punkt (LU/Cholesky/SVD im Vergleich).
*Ersparnis:* ≈ 154 W. Auf den Folien gibt es keine Entsprechung.

**D2. `S64.mdx:63–77` — Nachbetrachtung zu Satz 6.4.1, 118 W → KÜRZEN auf ≈ 50 W**
Zwei Absätze, die dreimal dasselbe sagen: „($6.4.1$) sieht man gelegentlich als
Definition", „Der Satz bündelt zwei Sichtweisen", „Bemerkung 6.2.5 hält das bereits
fest". Bemerkung 6.2.5 (`S62:185–189`) hat ‖A‖₂ = σ₁ tatsächlich schon ausgesprochen —
Satz 6.4.1 ist damit ohnehin ein Nachtrag, und die Nachbetrachtung ein Nachtrag zum
Nachtrag.
*Ersparnis:* ≈ 68 W.

**D3. `S64.mdx:233–241` und `S64:253–255` — Bemerkung 6.4.5, Punkte „k = 0 ist erlaubt" und „ab k = r ist nichts mehr zu holen", ≈ 110 W → STREICHEN**
Zwei Randfälle des Satzes von Eckart–Young. Der k=0-Punkt existiert nur, um
‖A‖_F = √Σσᵢ² zu zitieren, was in `S65:70` und in Kapitel 3 (Korollar 3.4.4) ohnehin
steht. Die zwei substanziellen Punkte der Bemerkung (Fehler steht in den weggeworfenen
σ; beide Normen, ein Sieger) und die Nicht-Eindeutigkeit (die als `{.small}`-Block
tatsächlich auf der Folie steht) bleiben.
*Abhängigkeiten:* `S64:660` (Selbsttest) verweist auf „den letzten Punkt von Bemerkung
6.4.5" — die Antwort müsste um einen Satz umformuliert werden.

**D4. `S63.mdx:270–292` — Bemerkung 6.3.6, Anmerkungen 2–4, ≈ 176 W → Punkt 4 MARKIEREN / STREICHEN (≈ 120 W)**
Punkt 1 (Σ_r⁻¹ = diag(1/σ), „durch null teilt niemand") ist Kern und steht auf der Folie.
Punkt 4 — Wohldefiniertheit von A⁺ trotz Nicht-Eindeutigkeit der Singulärvektoren, inkl.
der Q-Drehung im mehrfachen Eigenraum — ist ein sauberes, aber echtes Extra, das die
Vorlesung nicht erwähnt.
*Ersparnis:* ≈ 120 W.

**D5. `S63.mdx:143–148` — Bemerkung 6.3.3, Punkt 2 „Rechenzeit", ≈ 90 W → KÜRZEN auf einen Satz**
Rechnet r(m+n+1) gegen mn — dieselbe Zahl wie Punkt 1, und dieselbe Schwelle taucht in
`S64:633–639` (Selbsttest zur Speicherersparnis) und in `S64:349–352` (Beispiel 6.4.8)
noch zweimal auf. Dreifach ist zu viel.
*Ersparnis:* ≈ 60 W.

**D6. `S64.mdx:563–567` — Fußnote nach der Vergleichstabelle, ≈ 55 W → STREICHEN**
Erläutert die Tabellenzeile „singuläre Matrizen", die in der Tabelle bereits ausformuliert
dasteht („Eigenwert 0; ohne Basis aus Eigenvektoren gibt es die Zerlegung gar nicht").
Reine Verdopplung.

**D7. `S65.mdx:101–107` — Ellenbogen-/Kriterien-Wiederholung, ≈ 60 W → auf Querverweis kürzen**
Wiederholt Bemerkung 6.4.6 und 6.4.7 vollständig, mitsamt der log-σ-Auftragung. In einer
Zusammenfassung genügt „(Bemerkung 6.4.6 und 6.4.7)".

**D8. `S62.mdx:165–172` — unnummerierte Bemerkung „Konvention bei breiten Matrizen", 53 W → ZUSAMMENLEGEN mit Bemerkung 6.2.5**
Ein Präzisierungs-Kleingedrucktes ohne Nummer, das zwischen Definition 6.2.4 und
Bemerkung 6.2.5 steht und den Lesefluss an der wichtigsten Stelle des Kapitels bremst.
Die Sache selbst muss bleiben (Definition 6.2.7 und Satz 6.2.11 berufen sich auf die
„erweiterte Liste"), aber sie gehört als Spiegelstrich in 6.2.5 oder in eine Vertiefung.
*Ersparnis bei Zusammenlegung:* ≈ 25 W plus ein Environment weniger.

**D9. Widget-Bildunterschriften, 6 Stück, ≈ 75 W → STREICHEN**
`S61:126`, `S62:399`, `S62:713`, `S63:622`, `S64:372`, `S64:449`. Alle nach demselben
Muster gebaut („Das Widget verbindet …", „Die vier Tafeln trennen …", „Das Widget macht
sichtbar, dass …") und alle sagen nur, was der Absatz *vor* dem Widget schon angekündigt
hat. Das ist der Redundanz-Punkt aus dem Auftrag in Reinform.

**D10. `S63.mdx:218–223` — Prosa nach dem Blockschema-Widget, ≈ 60 W → KÜRZEN**
Beschreibt in Worten, was der Nutzer im Widget durch zwei Klicks selbst sieht (r = 1 und
r = m = n). Ein Satz genügt.

---

## 3. Summe der empfohlenen Ersparnis

| Aktion | Blöcke | Wörter |
| --- | --- | --- |
| **STREICHEN / KÜRZEN** (Text verschwindet) | A3, A4, B1, D1–D10 | ≈ 1 100 |
| **ALS VERTIEFUNG MARKIEREN** (Text bleibt, wird aber als optional erkennbar) | A1, A2, B2, C1, C2, D4 | ≈ 1 360 |
| **Summe** | | ≈ 2 460 (**17 %** des Kapitels) |

Davon entfallen ≈ 800 W auf S63, ≈ 640 W auf S64, ≈ 490 W auf S65, ≈ 350 W auf S62 und
≈ 15 W auf S61. Nach Umsetzung läge das Kapitel bei ≈ 13 600 Wörtern, von denen ≈ 1 360
sichtbar als „darf man überspringen" markiert wären.

---

## 4. Bestehende Vertiefungen und versteckter Kernstoff

Fünf `:::vertiefung`-Blöcke im Kapitel: `S62:389`, `S62:702`, `S63:208`, `S63:613`,
`S64:440`.

- **Alle fünf sind Widget-Hüllen** und enthalten keinen Satz, keine Definition und keine
  Aussage, die anderswo gebraucht wird. Als Vertiefung sind sie korrekt eingestuft:
  Wer sie überspringt, verliert nur die Interaktion.
- **Kein Kernmaterial ist in einer Vertiefung versteckt.** Geprüft: Die geometrische
  Deutung steht als Bemerkung 6.2.15 *außerhalb* der Geometrie-Vertiefung; die
  Minimalnorm-Aussage steht in Bemerkung 6.3.12 *außerhalb* der Pseudoinversen-Vertiefung;
  die Speicherformel steht in Bemerkung 6.3.3 *außerhalb* der Blockschema-Vertiefung.
- **Umgekehrt fehlt die Vertiefungs-Markierung dort, wo sie am nötigsten wäre:** Im ganzen
  Kapitel ist **kein einziger Beweis** als Vertiefung markiert, obwohl vier davon
  (6.2.11, 6.3.8, 6.3.9, 6.4.2) auf den Folien überhaupt nicht vorkommen. Das ist die
  strukturelle Hauptbeobachtung dieses Reviews: Die Vertiefungs-Auszeichnung wird derzeit
  ausschließlich für Interaktives benutzt, nicht für fachliche Tiefe.
- Die beiden Widgets *außerhalb* von Vertiefungen (`S61:124` Einheitskreis-Ellipse,
  `S64:370` Rang-k-Explorer) sind zu Recht im Fließtext: Beide werden von den Folien
  ausdrücklich verlinkt (`06-svd.qmd:100` bzw. die Shiny-App auf `06-svd.qmd:533`).

## 5. Redundanz Prosa ↔ Widget und zwischen Abschnitten

- **Prosa ↔ Widget:** gering, mit den zwei Ausnahmen D9 (die sechs formelhaften
  Bildunterschriften) und D10 (S63:218–223). Die Einleitungsabsätze *vor* den Widgets
  formulieren durchweg eine Frage statt eines Ergebnisses („Welche der drei Etappen ist
  für die Form zuständig …?") — das ist genau richtig und sollte so bleiben.
- **Zwischen Abschnitten:** drei Dubletten.
  1. σ₁ = ‖A‖₂ wird viermal gesagt: Bemerkung 6.2.5 (`S62:185`), Satz 6.4.1, dessen
     Beweis, dessen Nachbetrachtung (`S64:63–77`) und nochmals `S65:66`. → D2.
  2. Die Speicherschwelle r(m+n+1) vs. mn erscheint dreimal: `S63:143`, `S64:349`,
     `S64:633`. → D5.
  3. Ellenbogen/Wahl von k erscheint zweimal vollständig: Bemerkung 6.4.6/6.4.7 und
     `S65:101–107`. → D7.
- **Kapitelübergreifend:** Bemerkung 6.3.10 (A⁺ = (AᵀA)⁻¹Aᵀ bei vollem Spaltenrang)
  überlappt mit `07-kq/S71.mdx:300–341`, wo dieselbe Formel noch einmal hergeleitet wird.
  Das ist **keine** Kürzungsempfehlung: 6.3.10 ist die Brücke, auf die Kapitel 7
  zurückverweist, und mit 117 W billig.
- Die Aufgabenblöcke (`:::frage`, `:::zahlfrage`, zusammen ≈ 2 160 W) sind auftragsgemäß
  kein Kürzungsziel. Echte Dubletten habe ich nur eine gefunden: `S65:207–218`
  („Jede quadratische Matrix ist diagonalisierbar") und `S61:274–282` („Jede quadratische
  Matrix lässt sich orthogonal diagonalisieren") behandeln denselben Punkt — allerdings
  bewusst mit der Unterscheidung diagonalisierbar/orthogonal diagonalisierbar, und die
  S65-Fassung stammt direkt vom Folien-Self-Check. Stehen lassen.

---

## 6. Gesamturteil (3 Sätze)

Überlang ist vor allem **S63**: Der 7-Schritt-Beweis zu Satz 6.3.8 und das zweite
vollständig durchgerechnete Pseudoinversen-Beispiel (6.3.11) machen zusammen 800 Wörter
aus, für die die Folie zwei Zeilen und kein Beispiel vorsieht — dicht gefolgt von den
vier Beweisen (6.2.11, 6.3.9, 6.4.2, 6.3.8), die als einzige Blöcke des Kapitels
fachliche Tiefe tragen, ohne je als Vertiefung markiert zu sein.
Genau richtig und unantastbar sind **S61 komplett** (die Motivationskette
Diagonalisierung-scheitert → Einheitskreis → max‖Ax‖² → AᵀA ist die beste Passage des
Kapitels und kostet nur 1 842 Wörter) sowie in S62 die Kette Satz 6.2.1 → Korollar 6.2.2
→ Definition 6.2.4/6.2.7 → Satz 6.2.8 → Satz 6.2.13 mit den beiden durchgerechneten
Beispielen 6.2.9 und 6.2.12.
Wer nur *eine* Maßnahme umsetzen will, sollte die vier folienlosen Beweise in
`:::::vertiefung` setzen: Das kostet keine Zeile Verständlichkeit, signalisiert
Studierenden in der Prüfungsvorbereitung präzise, was sie überspringen dürfen, und
markiert 1 100 der 14 700 Wörter als optional.
