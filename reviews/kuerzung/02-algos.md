# Kürzungs-Review Kapitel 2 — „Algorithmen und Komplexität"

**Kapitel:** `src/chapters/02-algos` (S21–S25)
**Deck:** `slides/02-algos.qmd` (679 Zeilen, inkl. Anhang mit 2 Zusatzfolien)
**Wörter gesamt:** 9 258 (S21 1 683 · S22 1 330 · S23 2 066 · S24 1 852 · S25 2 327)
**Bereits vorhanden:** 6 `:::vertiefung`-Blöcke (S21 1, S23 1, S24 2, S25 2), keine `<ExpandedReading>`.

| Klasse | Wörter (geschätzt) | Anteil |
| --- | --- | --- |
| KERN (steht so/ähnlich auf den Folien) | ≈ 5 450 | 59 % |
| BRÜCKE (nötig, damit der Kern im Fließtext trägt) | ≈ 2 030 | 22 % |
| EXTRA (geht über die Folien hinaus) | ≈ 1 780 | 19 % |

Das ist im Vergleich zum Rest des Skripts ein **schlankes, folientreues Kapitel**. Die
EXTRA-Masse konzentriert sich fast vollständig auf **zwei ausgeführte Beweise**
(Rechenregeln-Lemma 2.4.4, Satz 2.5.6) und liegt sonst schon in Vertiefungsboxen.

---

## 1. Abschnittstabelle

| Datei | Abschnitt | Wörter | EXTRA-Anteil | Urteil in einem Satz |
| --- | --- | --- | --- | --- |
| `S21.mdx` | 2.1 Numerische Probleme und Algorithmen | 1 683 | ~9 % | Fast 1:1 die Folien 41–161, die zusätzliche Exaktrechnung in Beispiel 2.1.3 ist die beste BRÜCKE des Kapitels — nicht anfassen. |
| `S22.mdx` | 2.2 Fibonacci und Verwandte | 1 330 | ~15 % | Folientreu, aber §2.2.4 wiederholt die drei Achsen aus Bemerkung 2.1.6 fast vollständig. |
| `S23.mdx` | 2.3 Aufwand und Komplexität | 2 066 | ~12 % | Kern des Kapitels, dicht an den Folien; einzig der zweite Wachstums-Explorer (Konstanten-Widget) ist doppelt gemoppelt. |
| `S24.mdx` | 2.4 Landau-Symbole und Rechenregeln | 1 852 | ~30 % | Definitionen, Beispiele und Selbsttest sind KERN, der sechsschrittige Beweis der Rechenregeln ist reines EXTRA. |
| `S25.mdx` | 2.5 Fibonacci-Komplexitätsanalyse | 2 327 | ~27 % | Die Pointe des Kapitels, aber der Beweis von Satz 2.5.6 (obere *und* untere Schranke, $n^k = o(T(n))$) ersetzt eine einzige Folienzeile. |

Externe Abhängigkeiten geprüft (`grep -rnE "(Satz|Lemma|Bemerkung|Beispiel|Definition|Algorithmus) 2\.[1-5]\." src/`):
**kein einziger Verweis auf ein Environment-Label aus Kapitel 2 aus einem anderen Kapitel.**
Verwiesen wird ausschließlich auf Abschnittsebene (`?k=02-algos#sec-2.1`, `#sec-2.3`,
`#sec-2.4`) — 26 Treffer in den Kapiteln 4, 5, 6, 8, 9, 10, 12, 13. Die Abschnitte selbst
müssen also bestehen bleiben; einzelne Blöcke darin sind risikofrei verschiebbar.

---

## 2. Priorisierte Empfehlungen

### P1 — Beweis des Rechenregeln-Lemmas in eine Vertiefung
- **Ort:** `S24.mdx:155–214` (`::::beweis` zu Lemma 2.4.4, 6 `:::schritt`)
- **Wörter:** 295
- **Klasse:** EXTRA — die Folie (Z. 490–515) stellt das Lemma ohne jeden Beweis auf.
- **Aktion:** **ALS VERTIEFUNG MARKIEREN** (`:::::vertiefung[Warum die Rechenregeln gelten]`
  um den `::::beweis`; Achtung: fünf Doppelpunkte außen, s. KONVENTIONEN.md Migration 3.3).
  Der vorangehende Satz „Die Beweise sind kurze Grenzwertargumente" (Z. 152–153) bleibt im
  Hauptstrang und wird zur Ankündigung.
- **Begründung:** Sechs Routine-Grenzwertabschätzungen (Dreiecksungleichung, Nenner
  verkleinern, Produkt beschränkter Folgen). Wer die Regeln *anwendet* — und genau das ist
  in 2.4.4/2.4.6 und in jedem späteren Aufwandsargument verlangt — braucht sie nie.
  Grösster homogener EXTRA-Block des Kapitels.
- **Abhängigkeiten:** keine. Die *Aussage* des Lemmas wird in `S24.mdx:226/247`,
  `S25.mdx:48` und aus Kapitel 5/6/10/13 benutzt, der Beweis nirgends.

### P2 — Beweis von Satz 2.5.6 in eine Vertiefung
- **Ort:** `S25.mdx:170–229` (`::::beweis` zu Satz 2.5.6, 7 `:::schritt`)
- **Wörter:** 300
- **Klasse:** EXTRA — Folie Z. 593–599 begnügt sich mit „jede Iteration macht 2 Aufrufe …
  $\implies O(2^n)$"; die *untere* Schranke $(\sqrt2)^{n-1}$ und $n^k = o(T(n))$ kommen auf
  den Folien überhaupt nicht vor.
- **Aktion:** **ALS VERTIEFUNG MARKIEREN.** Satz 2.5.6 selbst bleibt im Hauptstrang (er ist
  die präzise Fassung der Kernbotschaft). Der Absatz `S25.mdx:152–156` liefert das
  informelle Argument bereits vollständig und trägt den Leser über die verschobene
  Ausführung hinweg — der Übergang funktioniert ohne Umformulierung.
- **Begründung:** Vollständige Induktion + iterierte Rekurrenz + Standard-Analysis-Limes;
  in der Prüfungsvorbereitung überspringbar, ohne dass „exponentiell, nicht nur
  ≤ exponentiell" verlorengeht.
- **Abhängigkeiten:** Der Selbsttest `S25.mdx:336–343` sagt „So haben wir die untere
  Schranke in Satz 2.5.6 bewiesen" — bleibt korrekt, ggf. „(Vertiefung)" ergänzen. Der
  Speicher-Schritt (Z. 221–228) wird im Selbsttest `S25.mdx:318–325` zitiert; entweder den
  Speicher-Schritt im Hauptstrang lassen (er ist inhaltlich der interessanteste) oder den
  Selbsttest auf die Satzaussage statt den Beweis verweisen lassen.

### P3 — §2.2.4 mit Bemerkung 2.1.6 zusammenlegen
- **Ort:** `S22.mdx:177–197` (Überschrift „Algorithmenarten in ML und Statistik",
  Beispiel 2.2.4, Nachsatz) gegen `S21.mdx:243–261` (Bemerkung 2.1.6)
- **Wörter:** 142 (S22) bzw. 128 (S21)
- **Klasse:** echte Redundanz zwischen zwei Abschnitten.
- **Aktion:** **ZUSAMMENLEGEN** — Beispiel 2.2.4 auf die drei ML-Stichwortlisten reduzieren
  und als Beispielblock direkt an Bemerkung 2.1.6 hängen (oder umgekehrt: 2.1.6 auf die
  Achsendefinitionen kürzen und *alle* Beispiele nach 2.2.4 verlagern). Nur eine der beiden
  Stellen darf den Kombinationssatz führen.
- **Begründung:** Beide Blöcke erklären dieselben drei Achsen mit denselben Belegen
  (Gauß direkt, Newton/Gradient iterativ, Monte-Carlo randomisiert) und schließen beide mit
  demselben Satz über den stochastischen Gradientenabstieg als „iterativ + approximativ +
  probabilistisch" (`S21.mdx:259–260` ≙ `S22.mdx:194–197`). Auf den Folien sind es zwei
  Folien (Z. 154–161 und Z. 216–234), im Fließtext liest sich die Wiederholung nach zwei
  Seiten Abstand als Versehen.
- **Ersparnis:** ~120 Wörter STREICHEN.
- **Abhängigkeiten:** `S22.mdx:179` („Der Fibonacci-Algorithmus ist also exakt, direkt und
  deterministisch") ist der Anschluss an den Selbsttest 2.2.3 und muss bleiben.

### P4 — Zweites Wachstums-Widget in S23 streichen oder als Vertiefung markieren
- **Ort:** `S23.mdx:317–327` (Einleitungssatz, `<S23KonstantenWidget />`, Auswertungsabsatz)
- **Wörter:** 95 Prosa + ein Widget
- **Klasse:** EXTRA/Redundanz — auf den Folien steht die Aussage als **zwei Spiegelstriche**
  (Z. 447–450).
- **Aktion:** **STREICHEN** (Widget-Datei `widgets/S23Aufwand.tsx` behält den Export für
  den Fall der Fälle) **oder** minimal `:::vertiefung` um den Block.
- **Begründung:** Dreifachbelegung derselben Einsicht in wenigen Zeilen:
  Bemerkung 2.3.8 (Z. 308–315) rechnet den Vorfaktor-Effekt bereits mit konkreten Zahlen
  vor ($n = 100$: 110 000 gegen 10 000), das Widget zeigt denselben Schnittpunkt noch
  einmal, und `S24.mdx:269–278` bietet mit dem Wachstumsraten-Explorer dieselbe Frage in
  allgemeinerer Form — der Text verweist an `S23.mdx:304–306` sogar selbst dorthin
  („findet den zugehörigen Explorer in Abschnitt 2.4").
- **Abhängigkeiten:** Die Zahlfrage `S23.mdx:333–340` (`loesung=1010`) referenziert „das
  Widget oben"; bei Streichung Fragetext auf „für den Algorithmus mit $1000n + 10\,000$
  Operationen" umstellen — die Frage selbst ist gut und soll bleiben.

### P5 — Beweis von Satz 2.3.3 auf zwei Schritte kürzen
- **Ort:** `S23.mdx:79–109` (4 `:::schritt`)
- **Wörter:** 131
- **Klasse:** BRÜCKE, aber aufgebläht.
- **Aktion:** **KÜRZEN auf** zwei Schritte (Komponentenformel + Multiplikation mit $n$).
  Schritt 4 (Speicher) ist eine Aufzählung der drei Objekte und gehört in die
  Satzaussage bzw. eine `::why`-Zeile.
- **Begründung:** Direkt vor dem Beweis steht Beispiel 2.3.2, das die Zählung an $3\times2$
  komplett vorführt; danach folgt die Faustregel-Prosa. Der Beweis ist der dritte Durchgang
  durch dieselbe Rechnung.
- **Ersparnis:** ~60 Wörter STREICHEN. **Abhängigkeiten:** Satz 2.3.3 wird in
  `S23.mdx:188/291` und `S25.mdx:19` nur als Aussage zitiert.

### P6 — Beweis von Lemma 2.5.4 in die Lemma-Aussage falten
- **Ort:** `S25.mdx:112–128`
- **Wörter:** 67
- **Aktion:** **KÜRZEN**: zwei Sätze im Anschluss an das Lemma („Für $n \le 1$ greift die
  Abbruchbedingung …; sonst besteht der Aufrufbaum aus der Wurzel und den beiden
  Teilbäumen") statt eines `::::beweis`-Blocks mit zwei `:::schritt`.
- **Begründung:** Der „Beweis" liest die Codezeilen ab; die `::why`-Texte sind länger als
  die Behauptungen. Ersparnis ~50 Wörter STREICHEN, kein Verständnisverlust.
- **Abhängigkeiten:** Lemma 2.5.4 wird in `S25.mdx:181/258` benutzt (Aussage, nicht Beweis).

### P7 — Nachprosa der Auslöschungs-Vertiefung einsortieren
- **Ort:** `S21.mdx:207–215` (Absatz „Die Tafel macht das Kriterium sichtbar …")
- **Wörter:** 90
- **Aktion:** **IN DIE VERTIEFUNG VERSCHIEBEN** (Z. 192–205), zusätzlich die letzten beiden
  Sätze („Wer $k$ weiter nach oben schiebt … reiner Rundungszufall", ~40 W) **STREICHEN**.
- **Begründung:** Struktureller Defekt, keine Kürzung: Der Absatz wertet ein Widget aus, das
  in einer Vertiefungsbox steckt — wer die Box überspringt, liest „Die Tafel macht …" ohne
  Tafel. Die Schwellenwerte ($c = 10^8$, $10^9$, $10^{15}/10^{16}$) gehören inhaltlich in
  die Box; die Zahl $10^{16}$ wird von der Zahlfrage `S21.mdx:272–279` gebraucht, die
  Erklärung dort steht aber ohnehin schon vollständig.
- **Abhängigkeiten:** Zahlfrage `S21.mdx:272` verweist auf „im Widget oben" — bleibt gültig.

---

## 3. Prüfung der bestehenden Vertiefungen (Auftragspunkt 4)

| Vertiefung | Datei:Zeilen | Urteil |
| --- | --- | --- |
| „Zwei Gesichter derselben Auslöschung" | `S21.mdx:192–205` | Korrekt EXTRA (Schätzfrage + Widget, nicht auf den Folien) — aber die Auswertung steht außerhalb, s. P7. |
| „FLOP-Zähler" | `S23.mdx:119–121` | Korrekt EXTRA; die 5 Zeilen Auswertung danach (Z. 123–127) sind hier der *Übergang* zum Komplexitätsbegriff und dürfen draußen bleiben. |
| „Warum manchmal Theta?" | `S24.mdx:104–119` | **Korrekt und bewusst gesetzt** — die Folie führt $\Theta$ nur als „Zusatz" (Z. 473–475); die Verschiebung in die Vertiefung ist ein erledigtes To-do (KONVENTIONEN.md, Punkt 1). Nicht anfassen. |
| „Wachstumsraten-Explorer" | `S24.mdx:269–271` | Korrekt EXTRA. |
| „Gezählte Schritte gegen die Landau-Vorhersage" | `S25.mdx:236–238` | Korrekt EXTRA. |
| „Der goldene Schnitt im Aufrufbaum" | `S25.mdx:254–278` | **Enthält Kernmaterial.** Siehe unten. |

**Befund: Kernmaterial in einer Vertiefung.** Die Vertiefung `S25.mdx:254–278` leitet
$T(n) = 2F_{n+1}-1$ und $T(n) = O(\varphi^n)$ her. Beide Ergebnisse werden im **Hauptstrang**
weiterverwendet: die Vergleichstabelle `S25.mdx:283–295` rechnet die Spalte „naiv" explizit
mit $\cred{T(n) = 2F_{n+1} - 1}$, und die **Kapitelzusammenfassung** `S25.mdx:365–366`
formuliert die Kernbotschaft als „$O(n)$ gegen $O(\varphi^n)$". Wer die Vertiefung
überspringt, trifft $\varphi$ zweimal unerklärt.
**Empfehlung:** die drei Zeilen der Induktion $T(n) = 2F_{n+1}-1$ und das Fazit
$T(n) = O(\varphi^n)$ in Bemerkung 2.5.7 (Z. 245–252) hochziehen; in der Vertiefung bleibt
nur die Binet-Formel samt Herleitung. Netto ±0 Wörter, behebt aber die Lücke.

---

## 4. Redundanz Prosa ↔ Widget / Abschnitt ↔ Abschnitt (Auftragspunkt 5)

- **Kein systematisches Prosa-wiederholt-Widget-Problem.** Das Kapitel folgt durchgängig dem
  guten Muster „Frage stellen → Widget → *eine* Auswertungsaussage, die das Widget nicht
  zeigt" (`S23.mdx:123–127`, `S24.mdx:273–278`, `S25.mdx:240–243`). Die Auswertungsabsätze
  liefern jeweils die Schwelle/den Faktor als *merkbares Ergebnis* und sind damit
  gerechtfertigt.
- **Echte Dublette:** §2.2.4 ↔ Bemerkung 2.1.6 (P3).
- **Dreifachbelegung:** Vorfaktoren-vs.-Ordnung — Bemerkung 2.3.8, `S23KonstantenWidget`,
  `S24WachstumWidget` (P4).
- **Grenzfall, kein Handlungsbedarf:** Die Speicherkomplexität $O(n)$ der Rekursion steht in
  Satz 2.5.6, in dessen Beweis-Schritt und im Selbsttest `S25.mdx:318–325`; das ist bewusste
  didaktische Wiederholung eines beliebten Missverständnisses.
- **Aufgaben:** 4 `::::quiz`-Blöcke + 4 `SelfTest`-Karten + 2 `Schaetzfrage`. Keine Dublette
  gefunden, alle mit eigenem Prüffokus — auftragsgemäß **nicht** als Kürzungsziel gemeldet.

---

## 5. Summe der empfohlenen Ersparnis

| Aktion | Blöcke | Wörter |
| --- | --- | --- |
| **STREICHEN** | P3 (120) · P4 (95) · P5 (60) · P6 (50) · P7-Restsätze (40) | **≈ 365** (4 % des Kapitels) |
| **ALS VERTIEFUNG MARKIEREN** | P1 (295) · P2 (300) | **≈ 595** (6 % des Kapitels) |
| **UMSORTIEREN (±0)** | P7 (90 W in die Box) · φ-Ergebnisse in den Hauptstrang | 0 |
| Summe „vom Prüfungsstoff entlastet" | | **≈ 960 (10 %)** |

Fließtext im Hauptstrang nach Umsetzung: ~8 300 Wörter statt 9 258; davon liegen dann
~2 380 Wörter (26 %) sichtbar in Vertiefungsboxen statt bisher ~790 (9 %).

---

## 6. Gesamturteil (3 Sätze)

Kapitel 2 ist bereits eines der disziplinierteren Kapitel des Skripts — 59 % Kernstoff,
kaum Anwendungsexkurse, keine Mehrfachbeispiele zum selben Punkt —, und überlang sind nur
die beiden ausgeführten Beweise (Rechenregeln 2.4.4, Satz 2.5.6, zusammen ~600 Wörter), die
je eine einzige Folienzeile ersetzen und in Vertiefungsboxen gehören. Echte Streichmasse
gibt es fast nur dort, wo dieselbe Aussage zweimal steht: die Algorithmenarten in §2.1
*und* §2.2.4, und der Vorfaktor-vs.-Ordnung-Punkt in Bemerkung 2.3.8, im
Konstanten-Widget *und* im Explorer von §2.4. Unangetastet bleiben müssen: die
Exaktrechnung in Beispiel 2.1.3 (die einzige Stelle im Kurs, an der man *sieht*, warum die
Verschiebungsformel 0 liefert), der Fibonacci-Aufrufbaum 2.5.5, die Vergleichstabelle
2.5.3 und sämtliche Aufgaben.

---

## Anhang: Nebenbefunde (keine Kürzungsfragen)

1. **`S23.mdx:22–23` gegen `S25.mdx:30–40`.** Definition 2.3.1 beschränkt den Zeitaufwand
   auf $f_i \in \{+,-,\cdot,/\}$; der Beweis von Satz 2.5.1 zählt dann „eine
   Schreiboperation pro Eintrag" und „1 Zuweisung" pro Durchlauf mit. Die Folie (Z. 258)
   ist hier weiter gefasst („aber auch Vergleiche, Zuweisungen und Speicherzugriffe") — die
   Skript-Definition sollte diesen Halbsatz übernehmen, sonst widerspricht sich das Kapitel.
2. **`S25.mdx:40`.** Die `::why` zu Schritt 2 sagt „pro Durchlauf zählen wir 2 Additionen
   und 1 Zuweisung"; der Schleifenrumpf `x[i+1] <- x[i] + x[i-1]` enthält **eine** Addition
   (die Indexrechnungen werden im selben Satz ausdrücklich *nicht* mitgezählt). Die 3
   Operationen pro Durchlauf lassen sich sauber als 1 Addition + 1 Zuweisung + 1
   Indexrechnung begründen — an der Ordnung ändert sich nichts, aber die Zählung sollte
   stimmen.
