# Kürzungs-Review: Kapitel 11 „Konvexität"

**Kapitel:** `src/chapters/11-konvexitaet/` (S111–S115)
**Deck:** `slides/12-konvexitaet.qmd` (3 707 Wörter inkl. YAML/Anhang) — **eine** Vorlesung
**Nebendeck (relevant, s. u.):** `slides/13-optim-I.qmd` (Abschnitt 11.5 lebt fachlich dort)

| | Wörter | Anteil |
| --- | ---: | ---: |
| **Kapitel gesamt** | **24 616** | 100 % |
| davon KERN (steht so/ähnlich auf den Folien) | ~11 600 | 47 % |
| davon BRÜCKE (nötig, damit der Kernstoff lesbar ist) | ~4 800 | 20 % |
| davon EXTRA (über die Folien hinaus) | ~8 200 | 33 % |

Verhältnis Skript : Folien ≈ **6,6 : 1**. Das ist für ein Begleitskript nicht per se zu viel —
aber das Kapitel deckt mit S115 zusätzlich Stoff der *nächsten* Vorlesung ab und dupliziert ihn
dort ein zweites Mal (Kapitel 12.2), und in S113/S114 stehen drei komplette Themenblöcke, die
auf keinem der beiden Decks vorkommen.

---

## 1. Abschnitts-Übersicht

| Datei | Abschnitt | Wörter | EXTRA | Ein-Satz-Urteil |
| --- | --- | ---: | ---: | --- |
| `S111.mdx` | 11.1 Konvexkombinationen & konvexe Hülle | 3 204 | ~23 % | Sitzt eng an den Folien (inkl. Folien-Anhang „Dreieck im $\R^2$"), einziger Ballast ist die doppelt geführte Extrempunkt-Definition. |
| `S112.mdx` | 11.2 Konvexe Mengen | 5 633 | ~33 % | Kernteil (Def, Quiz, Simplex, PSD-Kegel, Konvexitätserhaltung, $\conv$ als Durchschnitt) deckt die Folien exakt; der Schlussabschnitt „lineare Ziele in Ecken" macht aus einem Folien-Halbsatz 1 170 Wörter mit vollem Beweis. |
| `S113.mdx` | 11.3 Projektion & konvexe Funktionen | 4 864 | ~34 % | Sehr gut gebaut, aber mit Satz 11.3.3 (stumpfer Winkel) + Beispiel 11.3.4 (Projektionsformeln) und Bemerkung 11.3.17 (Kondition/Ausblick) hängen ~1 100 Wörter dran, die auf keiner Folie stehen. |
| `S114.mdx` | 11.4 Eigenschaften konvexer Funktionen | 6 364 | ~41 % | Längster und extra-reichster Abschnitt: der komplette Subgradienten-Teil (~1 330 W) kommt auf keinem Deck vor, dazu vier Beispiele für dieselbe Baukastenregel. |
| `S115.mdx` | 11.5 Konvexe Optimierung & Zusammenfassung | 4 551 | ~27 % | Fachlich Folien**satz 13**, nicht 12 — und die beiden Hauptsätze stehen fast wortgleich noch einmal in Kapitel 12.2; dazu drei Zusammenfassungen hintereinander. |

---

## 2. Priorisierte Empfehlungen

Reihenfolge: größte Ersparnis bei geringstem Qualitätsverlust zuerst.

### A. STREICHEN / KÜRZEN

**A1 — Doppelte Sätze zwischen 11.5 und 12.2 auflösen (~700 W, kapitelübergreifend)**
`S115.mdx:68–122` (Bem. 11.5.2, 431 W) und `S115.mdx:209–247` (Satz 11.5.5 + Beweis + Nachtext, ~250 W)
vs. `12-optim/S122.mdx:191–237` (Satz 12.2.6 + Beweis) und `:239–280` (Satz 12.2.7 + Beweis).
*Befund:* Der ableitungsfreie „lokal ⇒ global"-Beweis in Bemerkung 11.5.2 (Z. 73–91) und der
Beweis von Satz 12.2.6 sind **dasselbe Argument, Schritt für Schritt**; der Mittelpunkt-Beweis
von Satz 11.5.5 und der von Satz 12.2.7 ebenfalls. Bemerkung 12.2.15 leitet zudem Satz 11.5.1
Schritt 2 ein **drittes** Mal her.
*Aktion:* Eine Fassung behalten. Empfehlung: **Beweise bleiben in 11.5** (dort ist die Ernte des
Kapitels), und `12-optim/S122.mdx` ersetzt Satz 12.2.6/12.2.7 durch Zitate mit einem Satz
Begründung (Ersparnis **~700 W in Kapitel 12**). Falls der Orchestrator umgekehrt entscheidet,
sind in 11.5 ~350 W frei (Bem. 11.5.2 Z. 73–91 und Beweis 11.5.5).
*Abhängigkeiten:* `S122.mdx:384–387`, `S123.mdx:514–516`, `S125.mdx:363` verweisen auf
`#sec-11.4`/`#sec-11.5` — Ankerverweise, keine Label-Verweise; unkritisch.

**A2 — Bemerkung 11.3.17 „Krümmung, Kondition und ein Ausblick" (`S113.mdx:706–740`, 338 W) → KÜRZEN auf ~60 W**
Ersparnis **~280 W**. Der Block rekapituliert Konditionszahl (Kap. 3.5), Krümmung/Hesse (Kap. 10.7),
Zick-Zack (Kap. 12.3), Newton/Trust-Region (Kap. 12.4) und Fisher-Information in einem Zug —
fünf Vorgriffe, von denen keiner hier gebraucht wird. **0 Verweise** aus dem übrigen Skript auf
11.3.17 (`grep -rn "11.3.17" src/`). Der Ridge-Zahlenteil (κ = ∞ → 29) ist der einzige Teil, der
an Beispiel 11.3.16 hängt; den als zwei Sätze dort anhängen.

**A3 — Beispiel 11.4.11, zweite Hälfte (`S114.mdx:571–590`, ~230 W) → STREICHEN**
Ersparnis **~230 W**. Die Konstruktion „$\bQ$ hat positive Eigenwerte, ist aber nicht konvex"
plus die Warnung zur Richtungswahl dupliziert inhaltlich Bemerkung 11.3.13 (`S113.mdx:581–594`)
und die Selbsttest-Frage `S115.mdx:549–560`. **0 Verweise** auf 11.4.11. Die erste Hälfte
(Hesse der Quadrik, Z. 551–570) ist BRÜCKE und bleibt.

**A4 — Bemerkung 11.1.8, Literatur-Fassung (`S111.mdx:236–251`, ~200 W) → ZUSAMMENLEGEN mit Definition 11.2.5**
Ersparnis **~180 W**. Der Absatz führt die allgemeine Extrempunkt-Definition ein *und* rechnet die
Äquivalenz zur Gewichts-Definition nach — 130 Wörter später steht sie als Definition 11.2.5
(`S112.mdx:247–258`) noch einmal. In 11.1.8 genügt ein Satz („die in der Literatur übliche Fassung
steht als Definition 11.2.5"), der Äquivalenznachweis gehört als Bemerkung neben 11.2.5.
*Abhängigkeiten:* 11.1.8 wird 4× referenziert (`S111.mdx:279`, `:424`, Vertiefung Hülle) — alle
zielen auf die Aussage „Extrempunkt ist eine Eigenschaft der Menge", die erhalten bleibt.

**A5 — Beweis zu Satz 11.2.14 (`S112.mdx:717–793`, 495 W) → KÜRZEN auf Schritte 1–2 + Skizze (~290 W)**
Ersparnis **~200 W**. Die Folie sagt dazu genau einen Halbsatz („Man kann zeigen, dass das Maximum
(auch) an einem Extrempunkt von $\conv(\Xcal)$ angenommen wird"). Schritte 3–6 (Norm-Maximierer,
Identität (11.2.2), Teil 3) sind ein technisch sauberer, aber für die Aussage entbehrlicher
Extremalpunkt-Existenzbeweis. Zusätzlich **als Vertiefung markieren** (s. B3).

**A6 — Zusammenfassungs-Stapel in S115 (`S115.mdx:420–481`, ~670 W) → ZUSAMMENLEGEN auf ~420 W**
Ersparnis **~250 W**. Drei Zusammenfassungen laufen hintereinander: Bemerkung 11.5.8 „Fünf
Bausteine" (305 W), Tabelle „Das Wichtigste in Kürze" (~250 W) und „Nächstes Kapitel" (~110 W).
Die Tabelle wiederholt Bemerkung 11.5.8 Zeile für Zeile. Empfehlung: **Tabelle behalten** (sie ist
die prüfungstaugliche Form), Bemerkung 11.5.8 auf die fünf Labelketten eindampfen.

**A7 — Bemerkung 11.5.7, Nicht-konvex-Liste (`S115.mdx:389–417`, ~330 W) → KÜRZEN auf ~130 W**
Ersparnis **~200 W**. Acht Aufzählungspunkte (Netze, Clustering, Bäume, latente Variablen, $L_0$,
tSNE/UMAP, NMF/Tensoren, graphische Modelle) plus Hyperparameter-Nachtrag; die Folie
(13-optim-I:266–307) listet drei. Vier Punkte mit je einem Satz reichen. Die beiden konvexen
Blöcke davor (Z. 340–388) sind KERN und bleiben unangetastet.
*Abhängigkeit:* 11.5.7 wird nur einmal referenziert (`S115.mdx:587`, Selbsttest).

**A8 — Beweis zu Satz 11.4.15, Schritte 1–3 (`S114.mdx:710–775`, ~350 W) → KÜRZEN auf ~100 W**
Ersparnis **~250 W**. Der eindimensionale Fall wird in drei Schritten voll ausgerechnet
(Monotonie der Differenzenquotienten, Existenz der einseitigen Ableitungen, jedes
$v \in [f'_-, f'_+]$ ist Subgradient), Schritt 4 verweist für $n > 1$ dann ohnehin auf eine
unbewiesene Trennungsaussage. Ein Beweis, der im entscheidenden Fall zitiert, darf im leichten
Fall skizzieren.

**A9 — Widget-nacherzählende Prosa (2 Stellen, zusammen ~220 W)**
- `S113.mdx:398–407` (~200 W → ~80 W): „Über das Reglerraster gerechnet bestehen 1110 der 3081
  Paare …", „bei 1482 Paaren" — Zahlen, die nur die Widget-Statistik referieren. Die didaktische
  Pointe (Nachweis vs. Widerlegung; Gleichheit beim Betrag) steht schon in den ersten drei Sätzen.
  Ersparnis **~120 W**.
- `S112.mdx:52–62` (~190 W → ~90 W): Prozentangaben „scheitert in gut 60 % der Fälle … nur in etwa
  13 %" plus Bisektionsgrenzen. Die $\lambda$-Grenzen $0{,}380/0{,}620$ werden 150 Zeilen später in
  der Zahlfrage (`:208–216`) noch einmal genannt. Ersparnis **~100 W**.

**A10 — Kleinere Kürzungen (zusammen ~660 W)**
| Stelle | Wörter | Aktion | Ersparnis |
| --- | ---: | --- | ---: |
| `S112.mdx:345–354` PSD-Symmetrie-Exkurs | 230 | auf 3 Sätze kürzen (Spektralsatz/Cholesky genügt) | ~100 |
| `S112.mdx:285–297` Extrempunkte des Simplex, Beweis in beide Richtungen | 180 | eine Richtung + „umgekehrt analog" | ~110 |
| `S112.mdx:824–848` Bem. 11.2.16 (3 Absätze) | 262 | nur „Die Arbeit verschiebt sich" behalten | ~150 |
| `S113.mdx:195–217` Nachtext zu Satz 11.3.3 | 290 | Eindeutigkeits-Nebenprodukt + Untervektorraum-Fall genügen | ~100 |
| `S113.mdx:127–135` Bem. 11.3.2, unendlichdimensionaler Fall | 90 | streichen (ein Satz als Fußnote) | ~90 |
| `S114.mdx:166–192` Bem. 11.4.4 (4 Absätze) | 280 | Kegel + Vorzeichen behalten, sup-Präzisierung und Glattheitsverlust auf je 1 Satz | ~100 |
| `S114.mdx:662–670` Gradiententerm-Warnung in Bem. 11.4.13 | 110 | 2 Sätze | ~60 |
| `S115.mdx:194–207` Erläuterung zu Def. 11.5.4 | 180 | dupliziert Bem. 11.3.9 (`S113.mdx:368–376`), wo „strikt konvex" bereits eingeführt wird — Rückverweis statt Wiederholung | ~120 |
| `S114.mdx:194–228` Bsp. 11.4.5 (4 Beispiele) | 332 | Ridge + Hinge/SVM behalten, LASSO und empirisches Risiko auf je 2 Sätze | ~110 |

**Summe STREICHEN/KÜRZEN in Kapitel 11: ~3 000 W (12 % des Kapitels)**
**Zusätzlich in Kapitel 12 (A1): ~700 W**

---

### B. ALS VERTIEFUNG MARKIEREN

Alles Folgende ist gut geschrieben und soll **bleiben** — es steht nur auf keinem Deck und darf
in der Prüfungsvorbereitung übersprungen werden. `:::vertiefung` bzw. `<ExpandedReading>` ist
dafür schon etabliert (7 Blöcke im Kapitel, 98 im Skript).

**B1 — Stützgeraden und Subgradienten (`S114.mdx:673–852`, ~1 330 W; nach A8 ~1 080 W)**
Def. 11.4.14, Satz 11.4.15 + Beweis, Bsp. 11.4.16 (Subdifferential des Betrags, LASSO-Schwellenwert),
Bem. 11.4.17 (Randpunkte, Jensen für allgemeine ZV, Subgradientenverfahren). **Weder auf Deck 12
noch auf Deck 13.** Bem. 11.4.17 sagt selbst: „die Subgradienten-Varianten gehören nicht mehr zum
Stoff dieses Skripts". Der größte einzelne Off-Folien-Block des Kapitels.
*Abhängigkeiten:* `S115.mdx:105–121` (Bem. 11.5.2, „Und ohne Ableitung?"), `S115.mdx:562–588`
(zwei Selbsttestfragen), `12-optim/S122.mdx:387`. Alle vier bleiben lesbar, wenn der Block als
Vertiefung dasteht — sie verweisen darauf, sie setzen ihn nicht voraus.

**B2 — Satz 11.3.3 „Kriterium des stumpfen Winkels" + Beweis + Beispiel 11.3.4
(`S113.mdx:138–250`, ~790 W; nach A10 ~690 W)**
Steht auf keiner Folie. Fachlich wertvoll (liefert die Normalgleichungen aus Kapitel 7 als
Spezialfall und die Rechenvorschrift für das Projektions-Widget), aber für den Kernstoff
„Projektion existiert und ist eindeutig" nicht nötig. **Nicht streichen** — die Brücke zu Kapitel 7
ist eines der besten Stücke des Kapitels.
*Abhängigkeiten:* 11 Nennungen von 11.3.3, alle innerhalb S113 (Beispiel 11.3.4, Vertiefung
„Projektion zum Ziehen"); nichts außerhalb.

**B3 — Anwendung „lineare Ziele werden in Ecken angenommen" (`S112.mdx:684–848`, ~1 170 W; nach A5/A10 ~820 W)**
Satz 11.2.14 + Beweis + Bsp. 11.2.15 (Budgetschranke) + Bem. 11.2.16. Auf der Folie ein
Vier-Bullet-Beispiel mit „Man kann zeigen". **Bsp. 11.2.15 unbedingt behalten** — es ist die
einzige Stelle, an der der Nutzen der Extrempunkte an Zahlen sichtbar wird (3 statt 19 Punkte
geprüft).
*Abhängigkeiten:* 11.2.14 → 2 Nennungen, 11.2.15 → 1, 11.2.16 → 0; alle innerhalb S112.

**B4 — Einzelblöcke (zusammen ~750 W)**
| Stelle | Wörter | Warum Vertiefung |
| --- | ---: | --- |
| `S114.mdx:593–631` Bsp. 11.4.12 logistische Regression | 207 | Nicht auf Deck 12; sehr wertvoll (wird von 11.5.6 und 11.5.7 gebraucht), aber Extra gegenüber den Folien |
| `S114.mdx:551–591` Bsp. 11.4.11 (nach A3) | ~145 | Nachrechnung eines Satzes, der schon zweimal bewiesen ist |
| `S114.mdx:166–192` Bem. 11.4.4 (nach A10) | ~180 | Kegelstruktur, Differenzen, sup-Feinheit |
| `S115.mdx:271–287` Bem. 11.5.6, perfekte Trennbarkeit | 180 | Ausgezeichnetes statistisches Gegenbeispiel, aber weit über die Folie hinaus |
| `S112.mdx:222–239` Bsp. 11.2.4 offener Ball, Feinheit Z. 234–238 | 60 | Randfall-Diskussion |

**Summe ALS VERTIEFUNG MARKIEREN: ~3 500 W (14 % des Kapitels)**

---

## 3. Audit der bestehenden `:::vertiefung`-Blöcke

Sieben Vertiefungen im Kapitel, alle sieben sind Widget-Blöcke:

| Block | Wörter | Urteil |
| --- | ---: | --- |
| `S111.mdx:267–285` Punktwolke/Hülle | 172 | ✔ korrekt Vertiefung |
| `S111.mdx:343–380` Konvexkombinationen schieben | 272 | ⚠ enthält am Ende (Z. 360–379) die Gewichts-Zusammenfassung, also die Beweisidee der Induktion aus Satz 11.2.3 — dort aber ohnehin vollständig bewiesen, also unschädlich |
| `S112.mdx:437–458` Kegel zum Anfassen | 232 | ✔ korrekt |
| `S113.mdx:252–266` Projektion zum Ziehen | 140 | ✔ korrekt |
| `S114.mdx:337–357` Jensen zum Schieben | 205 | ✔ korrekt |
| `S115.mdx:296–310` Drei Landschaften | 133 | ✖ **Kernstoff in einer Vertiefung**: Die Folie 13-optim-I:258–264 („Optimierungslandschaften") zeigt genau diese drei Fälle. Als normalen Text führen. |
| `S115.mdx:318–332` Abstieg auf der Doppelmulde | 121 | ⚠ Gradientenabstieg gehört Kapitel 12.3; als Vertiefung korrekt, aber Prosa auf ~60 W kürzen |

**Umgekehrter Fall (Kern versteckt): nur `S115.mdx:296–310`.** Alle anderen Kernaussagen stehen im
Fließtext.

**Nicht in Vertiefungen stehende Widgets** (Abweichung von KONVENTIONEN „Widgets hier hinein"):
`KonvexTest` (`S112.mdx:50`), `EpigraphSkizze` (`S113.mdx:288`), `KonvexKonkavPanels`
(`S113.mdx:382`), `SehnenTest` (`S113.mdx:396`). Inhaltlich richtig so — `KonvexKonkavPanels`
ersetzt eine Folienabbildung, `EpigraphSkizze` ebenfalls. Nur die Nacherzählungs-Prosa um
`SehnenTest` und `KonvexTest` ist zu lang (→ A9).

---

## 4. Redundanz zwischen Abschnitten

1. **Extrempunkt wird zweimal definiert** — Bem. 11.1.8 (`S111.mdx:230–252`) und Def. 11.2.5
   (`S112.mdx:247–258`), inklusive Äquivalenznachweis in der ersten. → A4.
2. **„Strikt konvex" wird zweimal eingeführt** — Bem. 11.3.9 (`S113.mdx:368–376`) und Def. 11.5.4
   + Erläuterung (`S115.mdx:183–207`), beide inklusive der Bemerkung zur Zweitbezeichnung
   „streng konvex". → A10.
3. **Der symmetrische Anteil entscheidet** — dreimal: Bem. 11.3.13 (`S113.mdx:581–594`),
   Bsp. 11.4.11 zweite Hälfte (`S114.mdx:571–590`), Selbsttest `S115.mdx:549–560`. → A3.
4. **Würfel/Varianz-Rechnung** — dreimal mit identischen Zahlen (91/6, 12,25, 35/12):
   Bsp. 11.1.3 (`S111.mdx:121–125`), Bsp. 11.4.8 (`S114.mdx:330–334`), Selbsttest
   `S115.mdx:537–547`. Hier ist die Wiederholung **gewollt und richtig** (Vorgriff → Beweis →
   Prüfungsfrage) — nicht antasten.
5. **Ridge/KQ als Beispiel** — Bsp. 11.3.16 (244 W), Bsp. 11.4.5 (Absatz, ~70 W), Bem. 11.5.6
   (~60 W), Bem. 11.5.7 (~40 W), Selbsttest `S115.mdx:523–535`. Vier Kurzverweise auf ein
   ausführliches Beispiel — vertretbar, weil jeder Verweis eine andere Eigenschaft nutzt
   (konvex / strikt / Existenz / Software-Konsequenz).
6. **Kapitel 11.5 ↔ Kapitel 12.2** — siehe A1. Die gravierendste Dublette des Kapitels.

**Prosa, die nur Widget-Ergebnisse wiederholt:** `S113.mdx:398–407` und `S112.mdx:52–62` (→ A9).
Alle übrigen Widget-Nachtexte tragen eine eigene Pointe (z. B. `S111.mdx:274–284`: Extrempunktzahl
fällt bei $k=5,6,8,\dots$ — das *ist* die Aussage von Bem. 11.1.8 am Bild).

---

## 5. Summe der empfohlenen Ersparnis

| | Wörter | % des Kapitels |
| --- | ---: | ---: |
| **STREICHEN / KÜRZEN** (A1–A10, in Kap. 11) | **~3 000** | **12 %** |
| davon reine Dubletten (A4, A9, A10-Zeilen 8) | ~520 | 2 % |
| zusätzlich in Kapitel 12 (A1) | ~700 | — |
| **ALS VERTIEFUNG MARKIEREN** (B1–B4) | **~3 500** | **14 %** |
| Kapitel nach Umsetzung | ~21 600 | 88 % |
| davon prüfungsrelevant sichtbar | ~18 100 | 74 % |

Für die Prüfungsvorbereitung schrumpft das Kapitel damit von 24 600 auf ~18 100 Wörter (−26 %),
ohne dass ein einziger Satz verlorengeht, den die Vorlesung nennt.

---

## 6. Gesamturteil (3 Sätze)

Überlang sind drei Stellen: der Subgradienten-Teil und die Ecken-Anwendung (11.2.14 ff.), die
zusammen ~2 500 Wörter für zwei Folien-Halbsätze aufwenden, und Abschnitt 11.5, der Stoff der
*nächsten* Vorlesung vorwegnimmt und ihn in Kapitel 12.2 gleich noch einmal beweist.
Genau richtig — und nicht anzutasten — sind die Abschnitte 11.1 bis 11.3 bis einschließlich der
Sehnenungleichung: Sie folgen den Folien Folie für Folie, rechnen jedes Folienbeispiel sauber nach
(Dreieck, Simplex, PSD-Kegel, Betrag, KQ/Ridge) und lösen mit den Quizzes die Folien-Self-Checks ein.
Ebenfalls unangetastet bleiben sollten alle `:::frage`/`:::zahlfrage`-Blöcke (2 900 W, 12 %): Sie
sind billig, an die Widgets gekoppelt und die einzige Stelle, an der das Kapitel prüfbar wird.
