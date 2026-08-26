# Kürzungs-Review Kapitel 8 — Numerische Lineare Algebra: Iteration & Zufall

**Kapitel:** `src/chapters/08-la-misc/` (S81–S85)
**Deck:** `slides/08-la-misc.qmd` (4782 Wörter, inkl. Anhang mit 8 uncounted-Folien)
**Wörter gesamt:** 13 813

| Klasse | Wörter | Anteil |
| --- | ---: | ---: |
| KERN | ~8 300 | 60 % |
| BRÜCKE | ~2 550 | 19 % |
| EXTRA | ~2 960 | 21 % |

Der Anhang des Decks (Ähnlichkeits-Rechnung, QR-Beweis, LGS-Konvergenzbeweis,
Einbettungs-Beweis, SVD-Panel, Sketching-Tabelle) zählt hier als KERN: Diese
Folien existieren, werden verlinkt und gehören zum Vorlesungsmaterial.

---

## 1. Abschnittstabelle

| Datei | Wörter | EXTRA-Anteil | Ein-Satz-Urteil |
| --- | ---: | ---: | --- |
| S81 Potenzmethode & QR-Iteration | 4782 | ~17 % | Rückgrat des Kapitels, folienecht aufgebaut; überlang sind nur der Rayleigh-Exkurs und die Sortierbedingung der QR-Iteration. |
| S82 PageRank, PCA, approx. SVD | 1318 | ~15 % | Kompakt und gut, einzig der Perron-Frobenius-/Spektralradius-Beweis in 8.2.1 geht klar über die Folie hinaus. |
| S83 Iterative LGS-Löser | 2913 | ~14 % | Sehr nah an den Folien und didaktisch sauber; einziger Ballast sind drei Wiederholungen derselben `O(log 1/ε)`-Zahlen und eine fehlplatzierte Frage. |
| S84 Matrix-Sketching | 3694 | ~31 % | Der mit Abstand aufgeblähteste Abschnitt: Zusatzsatz mit Beweis, Zusatzkorollar mit Beweis und drei Meta-Bemerkungen, die die Folien nicht einmal andeuten. |
| S85 Zusammenfassung | 1106 | ~36 % | Als Prüfungs-Repetitorium genau richtig dimensioniert, enthält aber eine echte Fragen-Dublette. |

---

## 2. Befund zu den vorhandenen `:::vertiefung`-Blöcken (Auftragspunkt 4)

Kapitel 8 hat **sechs** `:::vertiefung`-Blöcke — und **alle sechs sind reine
Widget-Rahmen** (S81:361, S81:761, S82:78, S82:115, S83:547, S84:204), zusammen
nur ~390 Wörter. Kein einziger enthält vertiefenden Fließtext.

Das heißt: Der Vertiefungs-Mechanismus wird in diesem Kapitel **gar nicht für
seinen eigentlichen Zweck genutzt**. Sämtliches echte Zusatzmaterial (Satz 8.4.2
mit Beweis, Korollar 8.4.9 mit Beweis, Bemerkungen 8.1.3, 8.4.7, 8.4.8, 8.4.15)
steht ununterscheidbar im Hauptfluss. Umgekehrt ist **kein Kernstoff in einer
Vertiefung versteckt** — die Widgets sind zu Recht dort, wo sie sind.

Das ist die größte Einzel-Chance des Kapitels: Nicht streichen, sondern
markieren. Rund 1 570 Wörter können unverändert stehen bleiben und trotzdem als
„für die Prüfung überspringbar" erkennbar werden.

---

## 3. Priorisierte Empfehlungen

### A. Satz 8.4.2 + Beweis + Beispiel 8.4.3 → ALS VERTIEFUNG MARKIEREN
- **Datei:Zeilen:** `S84.mdx:31–124` (Satz 8.4.2 „Zufallsrichtungen stehen fast senkrecht aufeinander", 4-schrittiger Beweis, Beispiel 8.4.3)
- **Wörter:** 392 (318 + 74)
- **Begründung:** Die Folie „Idee: Matrix-Sketching" behauptet die Fast-Orthogonalität als *geometrisches Faktum in einer Zeile* und beweist nichts. Das Skript liefert Drehinvarianz, `E[uuᵀ] = I/n`, bedingte Momente und Tschebyscheff. Schön, aber der Einbettungssatz 8.4.6 baut **nicht** darauf auf — 8.4.2 ist ein Seitenarm.
- **Aktion:** Aussage („Die Streuung des Kosinus schrumpft wie `1/√n`", Zeilen 107–110) im Hauptfluss lassen, Beweis und Beispiel 8.4.3 in `<ExpandedReading>`.
- **Abhängigkeiten:** Satz 8.4.2 wird nur aus Beispiel 8.4.3 heraus zitiert (`S84.mdx:114`) — beide wandern gemeinsam, sonst keine. Kein Verweis aus anderen Kapiteln.

### B. Korollar 8.4.9 + Beweis → ALS VERTIEFUNG MARKIEREN
- **Datei:Zeilen:** `S84.mdx:361–409`
- **Wörter:** 213
- **Begründung:** Polarisationsformel + Parallelogrammgleichung, um Skalarprodukte (und damit Winkel) aus der Längenaussage zurückzugewinnen. Die Folien erwähnen Winkel nur beschreibend („Winkel: `∠(Sx,Sy) ≈ ∠(x,y)`"). Für die Prüfung reicht der Satz ohne Beweis restlos.
- **Abhängigkeiten:** `grep "8.4.9"` findet **keinen** Verweis. Frei verschiebbar. Der anschließende Absatz (Zeilen 406–409, „Für Einheitsvektoren steht rechts schlicht ε…") sollte mitwandern.

### C. S84: drei Meta-Bemerkungen → ALS VERTIEFUNG MARKIEREN
- **Datei:Zeilen:** `S84.mdx:322–341` (8.4.7 „Warum die Momentenbedingung an der Projektion ansetzt", 134 W), `S84.mdx:343–359` (8.4.8 „Von Quadraten zu Längen und Abständen", 127 W), `S84.mdx:587–600` (zweiter Absatz von 8.4.15, χ²-Rechnung + Konzentrationsungleichungen, ~130 W)
- **Wörter:** 391
- **Begründung:** Alle drei kommentieren die *Beweistechnik* statt das Resultat: warum Cauchy-Schwarz zu grob wäre, wie man von `‖Sx‖²` zu `‖Sx‖` kommt, warum Tschebyscheff das Achtfache des exakten `m` verlangt. Ausgezeichnetes Material für Interessierte, für die Klausur irrelevant.
- **Abhängigkeiten:** 8.4.7 und 8.4.15 werden nirgends zitiert. Von 8.4.8 wird **eine** Aussage in Beispiel 8.4.14 gebraucht (`S84.mdx:562–563`, „in der Länge selbst auf rund 5 %") — diesen Halbsatz dort selbsttragend formulieren, dann ist auch 8.4.8 frei.

### D. Bemerkung 8.1.14, Passage zur Sortierreihenfolge → STREICHEN
- **Datei:Zeilen:** `S81.mdx:663–675` (von „Dass die Eigenwerte dort auch absteigend…" bis „…wo sie die Dreiecksgestalt selbst herstellt.")
- **Wörter:** ~170
- **Begründung:** Verlangt, dass `X⁻¹` eine LU-Zerlegung ohne Zeilentausch besitzt, und führt dann zwei Gegenbeispiele (`diag(1,2)`, obere Dreiecksmatrix) vor. Das steht nirgends auf den Folien, ist die technischste Stelle des ganzen Kapitels und beantwortet eine Frage, die im Kurs niemand stellt. Der Rest von 8.1.14 (90°-Drehung als Gegenbeispiel, Konvergenz gegen Schur-Form, symmetrischer Fall) ist KERN und bleibt.
- **Abhängigkeiten:** Bemerkung 8.1.14 als Ganzes wird 3× zitiert (`S81.mdx:769`, `S81.mdx:863`, `S85.mdx:19`) — alle drei Verweise zielen auf die *Konvergenzaussage* bzw. das Rotations-Gegenbeispiel, nicht auf die Sortierbedingung. Der Block bleibt bestehen, nur die Passage fällt.

### E. Bemerkung 8.1.3 + Rayleigh-Passage in Beispiel 8.1.5 → KÜRZEN / MARKIEREN
- **Datei:Zeilen:** `S81.mdx:109–145` (Bem. 8.1.3, 240 W) und `S81.mdx:327–334` (drittes Beobachtungs-Bündel in Beispiel 8.1.5, ~110 W)
- **Wörter:** ~270 von 350 verschiebbar
- **Begründung:** Die Folie hat dazu genau eine Klammerbemerkung („Die Norm liefert nur den *Betrag* |λ₁|; für negatives λ₁ oszilliert x⁽ᵏ⁾"). Das Skript macht daraus: rohe vs. normierte Iteration, Rayleigh-Quotient, quadratische statt lineare Genauigkeit, Vorzeichenproblem im Abbruchkriterium — plus im Beispiel eine ganze Tabellenspalte `ρ⁽ᵏ⁾` und die Auswertung „asymptotisch um den Faktor 3,7 genauer".
- **Aktion:** Ersten Absatz von 8.1.3 auf ~60 Wörter eindampfen (Normierung ⇒ `λ⁽ᵏ⁾ = ‖Ax⁽ᵏ⁻¹⁾‖`, konvergiert gegen `|λ₁|`) und im Hauptfluss lassen; Rayleigh-Quotient, Konvergenzordnung und Abbruch-Vorzeichen in eine Vertiefung. Die `ρ⁽ᵏ⁾`-Spalte in der Tabelle darf bleiben (kostet nichts), nur die Auswertung dazu wandert mit.
- **Abhängigkeiten:** Der Rayleigh-Quotient wird in `S83.mdx:139–141` erwähnt (Notationswarnung „`ρ` hier ≠ `ρ⁽ᵏ⁾` aus 8.1") — dieser Halbsatz bleibt gültig, solange der Quotient irgendwo in 8.1 steht, auch in einer Vertiefung.

### F. Bemerkung 8.2.1, erster Absatz → ALS VERTIEFUNG MARKIEREN
- **Datei:Zeilen:** `S82.mdx:32–46`
- **Wörter:** ~150 von 282
- **Begründung:** Beweist über Spaltenstochastizität, Transponieren, Spaltensummennorm und Spektralradius, dass 1 der betragsgrößte Eigenwert ist, plus Perron-Frobenius für die Nichtnegativität. Die Folie sagt dazu nichts; sie hat nur die Dämpfungs-Fußnote.
- **Aktion:** Erster Absatz in Vertiefung, **zweiter Absatz bleibt im Hauptfluss** — der trägt den Dämpfungsfaktor α, und darauf verweist der Fließtext direkt danach (`S82.mdx:73–75`, „Zum klassischen Dämpfungsfaktor α = 0,85 aus Bemerkung 8.2.1").
- **Abhängigkeiten:** genau dieser eine Verweis; er zielt auf den zweiten Absatz.

### G. Satz 8.1.12 + Beweis → ALS VERTIEFUNG MARKIEREN
- **Datei:Zeilen:** `S81.mdx:569–622`
- **Wörter:** 215
- **Begründung:** Die Aussage `Aᵏ = Q_k R_k` ist KERN (sie trägt Bemerkung 8.1.13, „simultane Potenzmethode"). Der Induktionsbeweis mit dem `(⋆)`-Durchschieben steht auf den Folien aber **im Anhang** und wird dort zweimal als „→ Anhang" verlinkt — das Deck selbst stuft ihn also schon als Nachschlagematerial ein. Das Skript sollte dieselbe Abstufung sichtbar machen.
- **Aktion:** Satzaussage im Hauptfluss, `::::beweis`-Block (Zeilen 581–622, ~160 W) in eine Vertiefung.
- **Abhängigkeiten:** Gleichung (8.1.3) wird in Bemerkung 8.1.13 benutzt (`S81.mdx:625`) — die Gleichung bleibt ja stehen, nur ihr Beweis wandert. Unkritisch.

### H. Fragen-Dublette im Selbsttest → STREICHEN
- **Datei:Zeilen:** `S85.mdx:103–107`
- **Wörter:** ~55
- **Begründung:** Echte Dublette, kein legitimes Wiederholen: Im **selben** `::::quiz`-Block steht bei `S85.mdx:151–160` dieselbe Aussage noch einmal („Verdoppeln wir beim Sketching die Zeilenzahl m, so halbiert sich die Verzerrung", falsch) — und in `S84.mdx:654–662` ein drittes Mal. Drei Fragen zu `ε ∝ 1/√m`, zwei davon nebeneinander. Die zu streichende Variante ist zusätzlich die schwächste, weil sie auf das Sketching-Widget verweist, das in S85 gar nicht mehr sichtbar ist.
- **Aktion:** `S85.mdx:103–107` streichen, die beiden anderen behalten (eine in S84 am Ort der Herleitung, eine in S85 als Repetitorium — das ist in Ordnung).
- **Abhängigkeiten:** keine.

### I. Dreifache `O(log 1/ε)`-Rechnung → EINMAL ZUSAMMENLEGEN
- **Datei:Zeilen:** `S83.mdx:367–372`, `S85.mdx:72–79`, `S85.mdx:141–149`
- **Wörter:** ~70 einsparbar
- **Begründung:** Dieselben Zahlen (`ρ ≈ 0,405`, `e₀ ≈ 0,643`, „rund zweieinhalb Schritte je Dezimalstelle") stehen dreimal. In S83 direkt nach Korollar 8.3.6 gehören sie hin; in S85 einmal in Bemerkung 8.5.2 und einmal in der Selbsttest-Auflösung ist einmal zu viel.
- **Aktion:** Zahlen-Absatz in `S83.mdx:367–372` behalten (dort trägt er), in `S85.mdx:74–77` auf einen Verweis kürzen.
- **Abhängigkeiten:** keine.

### J. Bemerkung 8.1.17, zweiter Absatz → ZUSAMMENLEGEN mit S82
- **Datei:Zeilen:** `S81.mdx:808–816`
- **Wörter:** ~65
- **Begründung:** Lanczos für große dünnbesetzte Matrizen, iterative SVD, `irlba`, Verweis auf 6.5 und auf PageRank. Genau das steht 60 Zeilen später ausführlicher in `S82.mdx:134–148` (Bem. 8.2.2) und in der Vergleichstabelle `S82.mdx:203–215`. Der erste Absatz von 8.1.17 (Hessenberg-Reduktion, Sweep-Kosten) ist KERN und bleibt.
- **Abhängigkeiten:** Bemerkung 8.1.17 wird aus dem Selbsttest zitiert (`S81.mdx:874`), aber wegen des Aufwand-Arguments aus dem ersten Absatz.

### K. Widget-Boilerplate → STREICHEN
- **Datei:Zeilen:** `S81.mdx:367`, `S81.mdx:773`, `S82.mdx:84`, `S82.mdx:121`, `S83.mdx:555`, `S84.mdx:210`
- **Wörter:** ~65
- **Begründung:** Jeder der sechs Vertiefungs-Blöcke schließt mit einem formelhaften Satz nach demselben Muster („Das Widget verbindet den Startanteil mit der Konvergenzbedingung aus Satz 8.1.4.", „Das Widget ordnet die beobachtete Abweichung als typische Streuung ein."). Das ist Prosa, die nur wiederholt, was das Widget ohnehin zeigt, und der Wiederholungs-Rhythmus fällt beim Durchblättern sofort auf (STYLE.md: „Zweimal im Kapitel ist Stil, siebenmal ist ein Tick").
- **Sonderfall:** `S83.mdx:555–559` sagt es sogar **zweimal hintereinander** („Die Auflösung verbindet die geschätzte Schwelle mit der Kontraktionsbedingung." und direkt danach „Die Auflösung markiert die Grenze der Konvergenz. Satz 8.3.5 erklärt den Wechsel: …"). Der erste Satz ist ersatzlos zu streichen — das ist ein Redaktionsversehen, kein Stilproblem.

### L. Nicht kürzen, aber verschieben: zwei fehlplatzierte Quiz-Fragen
- **Datei:Zeilen:** `S83.mdx:39–45` und `S81.mdx:252–258`
- **Wörter:** 0 (Netto-Nulloperation, reine Platzierung)
- **Befund:** Die Frage in `S83.mdx:39–45` fragt nach dem Richardson-Widget und zitiert **Satz 8.3.5** — beide erscheinen erst ~500 Zeilen später (Widget bei 552, Satz bei 120). Sie steht mitten in der Residuums-Definition. Analog fragt `S81.mdx:252–258` nach der Rate, die der Potenzmethoden-Stepper anzeigt, 110 Zeilen bevor dieser Stepper eingebunden wird.
- **Aktion:** beide in bzw. direkt hinter den jeweiligen Vertiefungs-Block verschieben. Aufgaben sind laut Auftrag kein Kürzungsziel — hier geht es nur darum, dass sie am falschen Ort unbeantwortbar sind.

---

## 4. Summe der empfohlenen Ersparnis

| Aktion | Wörter | Anteil am Kapitel |
| --- | ---: | ---: |
| **STREICHEN** (D, H, I, J, K) | **~425** | 3,1 % |
| **ALS VERTIEFUNG MARKIEREN** (A, B, C, E, F, G) | **~1 630** | 11,8 % |
| **Summe aus dem Pflicht-Lesefluss** | **~2 055** | **14,9 %** |

Der prüfungsrelevante Fließtext schrumpft damit von 13 813 auf ~11 760 Wörter,
ohne dass ein einziger Satz, Beweis oder Beispielwert verloren geht — 80 % der
Ersparnis ist reine Umsortierung in bereits existierende Container.

Schwerpunkt: **S84 allein trägt ~1 000 Wörter davon** (A + B + C), also gut die
Hälfte, bei einem Abschnittsanteil von nur 27 %.

---

## 5. Redundanz Prosa ↔ Widget, Abschnitt ↔ Abschnitt

- **Prosa/Widget:** Unkritisch. Die sechs Widgets sind knapp eingeleitet (jeweils
  2–3 Sätze mit einer echten Frage: „Was geschieht, wenn der Start genau auf der
  zweiten Eigenrichtung liegt?"). Einziger Ballast sind die formelhaften
  Schlusssätze (Punkt K) und die Doppelung in S83.
- **S81 ↔ S82:** Aufwand/Lanczos/`irlba` doppelt (Punkt J).
- **S82 intern:** Bemerkung 8.2.2 und der Abschnitt „Approximative SVD in der
  Praxis" nennen beide `irlba::irlba()`/`irlba::svdr()` mit derselben
  Begründung — tolerierbar, weil der zweite Abschnitt sie tatsächlich laufen
  lässt.
- **S83 ↔ S85:** `O(log 1/ε)`-Zahlen dreifach (Punkt I).
- **S84 ↔ S85:** Sketching-Skalierung `1/√m` dreifach, zweimal im selben
  Quiz-Block (Punkt H).
- **S81 „Was wir mitbringen" ↔ Deck „Verwendete Vorkenntnisse":** identisch, aber
  das ist erwünscht — bleibt.

---

## 6. Gesamturteil (3 Sätze)

Überlang ist praktisch nur S84: Satz 8.4.2 mit Beweis, Korollar 8.4.9 mit Beweis
und drei beweistechnische Meta-Bemerkungen bauen rund um den einen Satz, den die
Folien tatsächlich bringen (8.4.6), einen zweiten, unmarkierten Apparat auf — und
weil Kapitel 8 seine sechs `:::vertiefung`-Blöcke ausnahmslos als Widget-Rahmen
verbraucht, ist für den Lesenden nirgends erkennbar, was Pflicht und was Kür ist.
Genau richtig und unantastbar sind dagegen S81 (Potenzmethode und QR-Iteration
sind folienecht, farbcodiert und mit den beiden durchgerechneten
2×2-Beispielen 8.1.5/8.1.15 das didaktische Rückgrat des Kapitels) sowie S83, das
die Folien fast eins zu eins abbildet und mit Bemerkung 8.3.2 (Gradientenabstieg)
und Beispiel 8.3.9 (Richardson/Jacobi/Gauss-Seidel im Vergleich) zwei Brücken
schlägt, die die Vorlesung nur andeutet. S85 ist mit 8 % des Kapitelumfangs als
Prüfungs-Repetitorium gut dimensioniert und sollte bis auf die eine
Fragen-Dublette unangetastet bleiben.
