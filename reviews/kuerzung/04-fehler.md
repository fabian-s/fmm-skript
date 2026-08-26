# Kürzungs-Review Kapitel 4 „Numerische Fehleranalyse"

**Kapitel:** `src/chapters/04-fehler` (S41–S44)
**Deck:** `slides/04-fehler.qmd` (449 Zeilen, ~2 070 Wörter; 24 Folien)
**Wörter gesamt (wc -w über die vier `.mdx`, inkl. JSX/Kommentar-Rauschen):** 8 013

| Klasse | Wörter (geschätzt) | Anteil |
| --- | --- | --- |
| KERN (steht so/ähnlich auf den Folien) | ~4 300 | 54 % |
| BRÜCKE (nötig, damit der Kern im Skript trägt) | ~2 100 | 26 % |
| EXTRA (über die Folien hinaus) | ~1 620 | 20 % |

Zum Vergleich: Kapitel 4 ist mit 8 013 Wörtern **eines der kürzesten** im Skript
(Mittel bei 13 Kapiteln / 215 000 Wörtern ≈ 16 500). Der EXTRA-Anteil ist mit 20 %
niedrig, und der größte Teil davon ist bereits in `:::vertiefung` gekapselt. Das
Kürzungspotenzial liegt hier **nicht** im Streichen von Stoff, sondern in einer
sauberen Kapselung der Widget-Passagen und in drei echten Dubletten.

---

## 1. Abschnittstabelle

| Datei | Abschnitt | Wörter | EXTRA-Anteil | Urteil in einem Satz |
| --- | --- | --- | --- | --- |
| `S41.mdx` | 4.1 Fehlermaße und Fehlerzerlegung | 2 221 | ~15 % | Deckt die Folien 1:1 ab, sehr straff geschrieben; das einzige Überhangfett sind die zwei Widget-Rahmenpassagen und eine Nachrechen-Probe. |
| `S42.mdx` | 4.2 Kondition | 2 682 | ~13 % | Fachlich der Kern des Kapitels und durchweg gerechtfertigt; die Aussage „κ(A) ist nur eine obere Schranke" wird allerdings **fünfmal** gemacht. |
| `S43.mdx` | 4.3 Stabilität von Algorithmen | 2 281 | ~33 % | Der einzige Abschnitt mit echtem Überhang: Vorwärts-/Rückwärtsstabilität steht gar nicht auf den Folien, und der Beweis von Lemma 4.3.6 wiederholt Beispiel 4.2.8. |
| `S44.mdx` | 4.4 Zusammenfassung | 829 | ~24 % | Die Tabelle ist genau richtig; der Fließtext danach sagt zum vierten Mal, was die Fehlerzerlegung trennt, und wiederholt Bemerkung 4.3.4 fast wörtlich. |

---

## 2. Priorisierte Empfehlungen

### R1 — Widget-Rahmenprosa in die `:::vertiefung` hineinziehen (größter Hebel, null Substanzverlust)

**Wörter: 747 · Aktion: ALS VERTIEFUNG MARKIEREN (verschieben, nichts löschen)**

Das Kapitel benutzt durchgängig das Muster

```
[Teaser-Frage, im Lesefluss]
:::vertiefung[…]  <Widget />  :::
[Auswertungsabsatz, im Lesefluss]
```

Damit stehen Frage *und* Antwort im Hauptfluss, während der Kollaps-Block dazwischen
zugeklappt ist. Für eine Leserin, die die Vertiefung nicht öffnet, sind diese Absätze
schlicht unverständlich, weil sie auf Widget-Zustände verweisen, die sie nie gesehen hat
(„bei $\eps = -0{,}45$ (der Voreinstellung) ist sie 4", „stellen wir die Voreinstellung
‚Diagonale' ein"). Beide Hälften gehören **in** die Box.

| Datei:Zeilen | Inhalt | Wörter |
| --- | --- | --- |
| `S41.mdx:208-212` + `:218-224` | Teaser + Auswertung `FehlermassRechner` | 55 + 90 |
| `S41.mdx:325-327` + `:333-337` | Teaser + Auswertung `FehlerzerlegungExplorer` | 35 + 72 |
| `S42.mdx:82-84` + `:110-116` | Teaser + Auswertung `KehrwertWidget` | 41 + 71 |
| `S42.mdx:408-410` + `:416-427` | Teaser + Auswertung `SummenKonditionWidget` | 33 + 111 |
| `S43.mdx:107-110` + `:116-124` | Teaser + Auswertung `SgdLernratenDemo` (ρ(α) = \|1−2α\|) | 43 + 95 |
| `S43.mdx:333-335` + `:341-347` | Teaser + Auswertung `KappaRechner` | 31 + 70 |

**Begründung:** Das ist kein Qualitätsverlust, sondern eine Verbesserung — im HTML wird
der Hauptfluss um 747 Wörter kürzer, im PDF bleibt alles erhalten (`:::vertiefung` →
`\begin{fmmvertiefung}` tcolorbox, `scripts/pdf/mdx-to-latex.mjs:564-566`), nur eben
sichtbar als Vertiefung markiert. Genau das, was der Auftrag will: „klar signalisieren,
was extra ist".
**Abhängigkeiten:** Vier Selbsttest-Aufgaben verweisen auf diese Widgets
(`S41.mdx:381-391`, `S42.mdx:466-475`, `S43.mdx:409-430`, `S44.mdx:142-153`) — die bleiben
gültig, die Widgets werden ja nicht entfernt.
**Ausnahme, nicht anfassen:** `S42.mdx:310` `<LgsKonditionWidget />` steht bewusst *ohne*
Vertiefung im Fluss — dieses Widget ist als iframe auf der Folie (`04-fehler.qmd:282`)
und damit KERN.

---

### R2 — Beweis zu Lemma 4.3.6 durch Verweis auf Beispiel 4.2.8 ersetzen

**`S43.mdx:245-271`, „Lemma 4.3.6 (Kondition der Differenz)", Beweis · 174 Wörter · Aktion: KÜRZEN auf ~25 · Ersparnis ~150**

Der Beweis ist Schritt für Schritt **derselbe** wie die Lösung von Beispiel 4.2.8
(`S42.mdx:371-389`): Linearität → Skalarprodukt mit $(1,\pm1)^\top$ → Cauchy-Schwarz mit
$\|(1,\pm1)^\top\|_2 = \sqrt2$ → Gleichheitsfall → Division durch $|h(\ba)|$. Einziger
Unterschied ist ein Vorzeichen. Auf den Folien wird die Formel
$\kappa_{rel} = \sqrt2\sqrt{a^2+b^2}/|a-b|$ ohne jeden Beweis hingeschrieben
(`04-fehler.qmd:402-405`).
**Vorschlag:** Lemma-Aussage behalten, Beweis ersetzen durch zwei Zeilen: „Der Beweis ist
Wort für Wort der von Beispiel 4.2.8, nur mit $(1,-1)^\top$ statt $(1,1)^\top$ — auch dort
liefert Cauchy-Schwarz $\kappa_{abs} = \sqrt2$, und Division durch $|a-b|$ ergibt die
Behauptung." Alternativ: den Beweis stehen lassen, aber in `:::vertiefung`.
**Abhängigkeiten:** Nur `widgets/S43Widgets.tsx:398` zitiert *Lemma 4.3.6* (die Aussage,
nicht den Beweis). Sicher.
**Nebeneffekt:** Der Verweis macht die didaktisch schönste Verbindung des Kapitels
explizit — die Auslöschung in 4.2.8 und die Varianzformel in 4.3 sind dieselbe Rechnung.

---

### R3 — „Kondition und Stabilität: die Arbeitsteilung" (S44) auf drei Sätze kürzen

**`S44.mdx:64-85` · 117 Wörter · Aktion: KÜRZEN auf ~45 · Ersparnis ~70**

Der Absatz zeigt die Fehlerzerlegungsformel zum **vierten** Mal im Kapitel
(`S41.mdx:255` als (4.1.1), `S43.mdx:18`, `S44.mdx:71`, plus Tabellenzeile 2 in
`S44.mdx:31-33`) und wiederholt inhaltlich Bemerkung 4.1.5 (`S41.mdx:261-272`) und die
Tabellenzeilen „Kondition"/„Stabilität" direkt darüber. Auf den Folien steht das genau
einmal (Übersicht) plus eine Wrap-up-Zeile.
**Vorschlag:** Formeldisplay `S44.mdx:70-72` streichen (die Tabelle zwei Zoll höher hat
sie schon), den erklärenden Text auf den letzten, tatsächlich neuen Satz eindampfen:
„Ein stabiler Algorithmus für ein schlecht konditioniertes Problem liefert trotzdem
ungenaue Ergebnisse — aber nicht ungenauer, als das Problem es erzwingt."
**Abhängigkeiten:** Keine.

---

### R4 — Selbsttest-Dublette in S44 streichen

**`S44.mdx:131-140`, `:::frage{falsch}` „κ(A) ist die relative Kondition" · 76 Wörter · Aktion: STREICHEN · Ersparnis 76**

Diese Frage ist inhaltlich identisch mit `S42.mdx:455-464` (`:::frage{wahr}`, „Für dieselbe
Matrix A kann das Lösen je nach rechter Seite gut oder schlecht konditioniert sein") —
gleiche Aussage, gleiche Begründung, gleicher Satz 4.2.6. Aufgaben sind laut Auftrag kein
Kürzungsziel, aber das hier ist eine echte Dublette.
**Kontext:** Der Punkt „κ(A) ist nur die Worst-Case-Schranke" wird im Kapitel **fünfmal**
gemacht: Satz 4.2.6 (`S42:231`), Bemerkung 4.2.7 Bullet 1 (`S42:281-287`),
LGS-Widget-Prosa (`S42:318-323`), Selbsttest S42 (`S42:455-464`), Selbsttest S44
(`S44:131-140`). Zweimal reicht.
**Abhängigkeiten:** Keine.

---

### R5 — Definition 4.3.1 (Vorwärts-/Rückwärtsstabilität) als Vertiefung markieren

**`S43.mdx:33-55` (Definition) + `:57-61` (O-Konstanten, Rundungseinheit) · 171 Wörter · Aktion: ALS VERTIEFUNG MARKIEREN, ~50 Wörter im Fluss behalten**

Auf den Folien steht zu Stabilität **ein Satz**: „Ist [der algorithmische Fehler] ‚klein',
nennen wir $\wt f$ stabil" (`04-fehler.qmd:319`). Das Skript setzt hier stattdessen die
volle numerische Definition mit $\eta_{vor}$, $\eta_{rück} = \inf\{\dots\}$,
Rundungseinheit $u$ und zwei $O$-Aussagen. Für die Prüfungsvorbereitung im 3. Semester ist
das der klassische Überschuss: korrekt, aber nichts, was auf den Folien abgefragt werden
kann.
**Vorschlag:** `:::definition[4.3.1]` samt dem Absatz zu den $O$-Konstanten
(`S43.mdx:57-61`) in eine `:::vertiefung[Vorwärts- und Rückwärtsstabilität, präzise]`.
Im Hauptfluss bleiben die zwei Sätze `S43.mdx:61-67` („Wichtig ist die Arbeitsteilung:
Kondition = Problem, Stabilität = Algorithmus … zwei mathematisch äquivalente Rechenwege
können dramatisch unterschiedlich stabil sein") — das ist der Folienstoff.
**Abhängigkeiten (bitte prüfen, bevor gestrichen — Markieren ist unkritisch):**
`05-lgs/S52.mdx:43` und `05-lgs/S55.mdx:38` verwenden „rückwärtsstabil" als bekannten
Begriff; `03-matrix-spur-norm/S35.mdx:427-493` (Satz 3.5.12) führt Vorwärts-/
Rückwärtsfehler bereits ein. Deshalb: **nicht streichen**, nur markieren — und ggf. in
Kapitel 3 zurückverweisen statt neu zu definieren (das wäre eine kapitelübergreifende
Redundanz, die außerhalb meines Auftrags liegt, aber sichtbar ist).

---

### R6 — LGS-Widget-Auswertung entdoppeln

**`S42.mdx:318-323` · 52 Wörter · Aktion: KÜRZEN auf ~20 · Ersparnis ~32**

Die letzten drei Sätze („Das ist der Unterschied zwischen der Kondition des *Problems an
dieser Stelle* und der Worst-Case-Schranke … deshalb die Zahl, die wir angeben, wenn wir
die rechte Seite nicht kennen") wiederholen Bemerkung 4.2.7 Bullet 1 (`S42:281-287`) knapp
20 Zeilen weiter oben fast wörtlich. Der numerische Teil (`S42:312-318`: κ_rel ≈ 82,0
schöpft die Schranke zu 99,99 % aus, 5 % → 410 %) ist dagegen der eigentliche Ertrag des
Widgets und muss bleiben.
**Abhängigkeiten:** Keine.

---

### R7 — Zwei kleine EXTRA-Absätze

| Datei:Zeilen | Inhalt | Wörter | Aktion |
| --- | --- | --- | --- |
| `S43.mdx:344-347` | „Das deckt sich mit Beispiel 4.3.7: Bei $c=10^{10}$ liegt der erwartete relative Fehler bei $\kappa_{rel}\eps \approx 4\cdot10^4$…" | 37 | KÜRZEN auf ~12 — rechnet exakt die Probe nach, die Beispiel 4.3.7 (`S43:316-324`) 20 Zeilen vorher schon vorgeführt hat |
| `S43.mdx:102-105` | Gradient Clipping / Lernratenpläne / Mixed Precision | 32 | STREICHEN — der entsprechende Block ist auf der Folie bewusst **auskommentiert** (`04-fehler.qmd:344-351`); reiner ML-Exkurs ohne Anschluss im Kapitel |
| `S41.mdx:202-206` | „Zur Probe können wir auch Lemma 4.1.3 nachrechnen …" | 42 | IN DIE VERTIEFUNG von R1 verschieben — genau das zeigt der `FehlermassRechner` (dessen Header-Kommentar `S41Widgets.tsx:46` dieselben Zahlen führt) |
| `S44.mdx:100-103` | „Vorsicht: Das ist eine Faustregel, kein Satz …" | 37 | KÜRZEN auf einen Verweis „(vgl. Bemerkung 4.3.4)" — ist die fast wörtliche Wiederholung von `S43.mdx:196-199` | 

Ersparnis zusammen ~115 gestrichen/gekürzt + 42 markiert.

---

## 3. Prüfung der bestehenden `:::vertiefung`-Blöcke (Auftrag Punkt 4)

Sechs Vertiefungen im Kapitel, alle sechs enthalten **nur** ein Widget:

| Ort | Inhalt | Urteil |
| --- | --- | --- |
| `S41:214-216` | `FehlermassRechner` | zu Recht Vertiefung (Folie hat kein Widget) |
| `S41:329-331` | `FehlerzerlegungExplorer` | zu Recht Vertiefung |
| `S42:86-108` | `Schaetzfrage` + `KehrwertWidget` | zu Recht Vertiefung |
| `S42:412-414` | `SummenKonditionWidget` | zu Recht Vertiefung |
| `S43:112-114` | `SgdLernratenDemo` | zu Recht Vertiefung |
| `S43:337-339` | `KappaRechner` | zu Recht Vertiefung |

**Kein Kern-Material ist in einer Vertiefung versteckt.** Umgekehrt gilt aber: Das einzige
Widget, das auf den Folien *tatsächlich* vorkommt (`LgsKonditionWidget`, Folie
„Interaktive Demo: Kondition"), steht korrekt ohne Vertiefung im Fluss. Die Zuordnung ist
also durchweg richtig — es fehlt nur die Kapselung der zugehörigen Prosa (R1).

Der einzige echte Kandidat für eine *neue* Vertiefung ist Definition 4.3.1 (R5).

---

## 4. Redundanz Prosa ↔ Widget und zwischen Abschnitten (Auftrag Punkt 5)

- **Prosa, die nur wiederholt, was das Widget zeigt:** in diesem Kapitel kaum. Die
  Auswertungsabsätze aus R1 leiten in der Regel *zusätzlich* die Formel her (ρ(α)=|1−2α|
  in `S43:116-124`, Homogenität von $\kappa_{rel}$ in `S42:416-422`) oder tragen die
  Zahlenwerte, die im PDF sonst fehlten. Sie sind deshalb **nicht** zu streichen, nur zu
  verschieben. Einzige echte Wiederholung: `S43:344-347` (R7) und `S41:202-206` (R7).
- **Abschnittsübergreifend:**
  1. Fehlerzerlegungsformel 4×: (4.1.1) `S41:255` / `S43:18` / `S44:71` / Tabelle
     `S44:31-33`. Auf den Folien 2×. → R3.
  2. „κ(A) ist nur die Schranke" 5× (siehe R4).
  3. Beispiel 4.2.8 vs. Lemma 4.3.6: identische Rechnung, zweimal ausgeschrieben. → R2.
  4. Bemerkung 4.3.4 vs. der Vorsicht-Absatz in Bemerkung 4.4.1: fast wörtlich. → R7.
- **Nicht als Redundanz zählen:** Beispiel 4.2.1 (Kehrwert, „Warnbeispiel") und Beispiel
  4.2.5 (derselbe Kehrwert, „aufgelöst"). Das ist das didaktische Rückgrat des Abschnitts —
  erst Paradox, dann Auflösung mit der eben definierten Konditionszahl — und steht so auch
  auf der Folie (Beispiel + „Achtung"-Kasten, `04-fehler.qmd:188-205`). Bitte nicht antasten.

---

## 5. Summe der empfohlenen Ersparnis

| Kategorie | Wörter | Anteil am Kapitel |
| --- | --- | --- |
| **STREICHEN / KÜRZEN** (R2, R3, R4, R6, R7 ohne den verschobenen Teil) | **~410** | 5,1 % |
| **ALS VERTIEFUNG MARKIEREN** (R1: 747, R5: ~120, R7/S41:202-206: 42) | **~909** | 11,3 % |
| Summe „aus dem Hauptlesefluss verschwunden" | **~1 320** | 16,5 % |

Nach Umsetzung bliebe der Hauptfluss des Kapitels bei ~6 700 Wörtern, davon praktisch
alles KERN oder tragende BRÜCKE.

---

## 6. Gesamturteil (3 Sätze)

Kapitel 4 ist eines der diszipliniertesten Kapitel des Skripts — mit 8 000 Wörtern auf 24
Folien liegt es unter dem Kapitelmittel, und 80 % des Textes sind Folienstoff oder
unmittelbare Herleitung dazu; hier ist wenig zu holen, außer man kapselt konsequent, was
schon als Vertiefung gedacht war. Überlang sind einzig **§4.3** (Definition 4.3.1 geht
weit über die Folien hinaus, und der Beweis von Lemma 4.3.6 schreibt Beispiel 4.2.8 ein
zweites Mal aus) und die **Zusammenfassung S44**, die die Fehlerzerlegung zum vierten Mal
erklärt statt sie nur zu tabellieren. Nicht antasten: die Doppelspur Kehrwert
(Beispiel 4.2.1 → 4.2.5), Satz 4.2.6 mit seinem fünfschrittigen Beweis, die
Varianz-Anwendung 4.3.5–4.3.7 inklusive der $16384 = 2^{14}$-Beobachtung, und sämtliche
`:::frage`/`:::zahlfrage` außer der einen Dublette in S44.
