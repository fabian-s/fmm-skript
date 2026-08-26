# Kürzungs-Review: Kapitel 01-intro

**Kapitel:** `src/chapters/01-intro/` (S11.mdx, S12.mdx)
**Deck:** `slides/01-intro.qmd` (1536 Wörter Quelltext)
**Wörter gesamt:** 2075 (S11: 1167, S12: 908) — das ist **0,97 %** des Skripts (~215 000 Wörter). Kleinstes Kapitel mit Abstand (nächstkleines: 02-algos mit 9258).

| Klasse | Wörter | Anteil |
| --- | --- | --- |
| KERN (steht so/ähnlich auf den Folien) | ~1050 | 51 % |
| BRÜCKE (nötig fürs Lesen, nicht auf den Folien) | ~330 | 16 % |
| EXTRA (über die Folien hinaus) | ~695 | 33 % |

Das gesamte EXTRA dieses Kapitels sind ~695 Wörter ≈ **1,7 PDF-Seiten**. Wer 544 Seiten kürzen will, holt hier
nichts Nennenswertes. Der Report ist deshalb bewusst kurz und legt den Schwerpunkt auf die zwei echten Befunde
(eine überflüssige Widget-Nacherzählung, eine Doppelung der Drei-Blöcke-Erklärung) und auf drei Sachfehler/Lücken,
die beim Lesen aufgefallen sind.

---

## 1. Abschnittstabelle

| Datei | Abschnitt | Wörter | Anteil EXTRA | Ein-Satz-Urteil |
| --- | --- | --- | --- | --- |
| S11.mdx | 1.1 gesamt | 1167 | ~7 % | Fast reine Folien-Ausformulierung; einziger Zusatz ist die Leseanleitung — nicht antasten. |
| S11.mdx | Einleitungsabsatz (3–9) | 75 | 0 % | KERN, deckt die Folien „Statistik früher & heute" + „Motivation" ab. |
| S11.mdx | „Warum Numerik?" (11–36) | 126 | 0 % | KERN, 1:1 die Folie „Warum so viel Mathe? Ein Beispiel" (Kondition/Komplexität/Speicher). |
| S11.mdx | Beispiel 1.1.1 (38–65) | 177 | 0 % | KERN (Folie „Beispiel 1: Kondition"); die zusätzliche Zeilensubtraktion ist BRÜCKE und trägt ihr Gewicht. |
| S11.mdx | „Die drei Themenblöcke" (67–106) | 274 | ~18 % | KERN (Folie „Themen" + Folien-Beispiele 3/4/5 komprimiert); letzter Absatz doppelt aber 1.2. |
| S11.mdx | „Wie dieses Skript funktioniert" (108–118) | 90 | 0 % (BRÜCKE) | Unverzichtbare Leseanleitung — enthält allerdings zwei falsche Angaben (s. §4). |
| S11.mdx | Selbsttest-Einleitung (120–127) | 59 | 0 % | KERN (Folie „Benötigte Vorkenntnisse" inkl. 3blue1brown-Empfehlung). |
| S11.mdx | Selbsttest-Fragen (128–188) | 337 | 0 % | KERN + Aufgaben, laut Auftrag kein Kürzungsziel; hier fehlt eher etwas (s. §4). |
| S11.mdx | Vertiefungszeile (190–192) | 23 | 100 % | Konventionelle Literaturzeile, bleibt. |
| S12.mdx | 1.2 gesamt | 908 | ~62 % | Landkarte + Kapitelüberblick + Querschnittsthemen; komplett folienfrei, aber überwiegend sinnvolle Orientierung. |
| S12.mdx | Landkarten-Einleitung (3–16) | 136 | 0 % (BRÜCKE) | Führt das Widget ein und begründet es — behalten. |
| S12.mdx | „Die Detailzeile…" (18–20) | 28 | 100 % | Reine Nacherzählung der Widget-Bedienung, die der Absatz davor schon erklärt hat. |
| S12.mdx | „Die drei Teile des Skripts" (22–80) | 437 | ~80 % | Kapitel-für-Kapitel-Roadmap, weit über die Folie „Themen" hinaus, aber genau das, was ein Skript-Vorwort leisten soll. |
| S12.mdx | „Was sich durch das ganze Skript zieht" (82–117) | 237 | 100 % | Vier Querschnittsthemen inkl. Zerlegungstabelle: für die Prüfungsvorbereitung wertvoll, beim Erstlesen unverständlicher Vorgriff. |
| S12.mdx | Vertiefungszeile (119–124) | 64 | 100 % | Referenzliste des ganzen Skripts, gehört an genau diese Stelle. |

---

## 2. Priorisierte Empfehlungen

### E1 — STREICHEN: Widget-Nacherzählung
- **Datei/Zeilen:** `src/chapters/01-intro/S12.mdx:18–20`
- **Label:** kein Env (Prosa nach `<KursKarte />`)
- **Wörter:** 28
- **Aktion:** **STREICHEN** (ersatzlos).
- **Begründung:** Der Absatz sagt nur „Die Detailzeile unter der Karte ordnet die Auswahl ein und führt direkt
  zum gewählten Kapitel" — beides sieht man beim ersten Klick, und der Absatz *davor* (Z. 10–14) erklärt die
  Interaktion bereits („Tippen wir ein Kapitel an: Die Karte hebt hervor, worauf es aufbaut und wohin es führt").
  Der Schlusssatz („So macht die Karte sichtbar, dass die Reihenfolge allein nicht alle Voraussetzungen erklärt")
  wiederholt wörtlich die These aus Z. 5–9. Genau der Prosa-Typ, den der Auftrag als Widget-Redundanz sucht.
- **Abhängigkeiten:** keine.

### E2 — KÜRZEN: doppelte Drei-Blöcke-Zusammenfassung
- **Datei/Zeilen:** `src/chapters/01-intro/S11.mdx:102–106` (Absatz „Die Blöcke bauen aufeinander auf: …")
- **Label:** Abschnitt „Die drei Themenblöcke"
- **Wörter:** 50
- **Aktion:** **KÜRZEN auf** den Schlusssatz mit dem Verweis („Welche Kapitel worauf aufbauen, zeigt die Landkarte
  in [Abschnitt 1.2](#sec-1.2).") → Ersparnis ~35 Wörter.
- **Begründung:** Der Absatz beschreibt in Worten exakt das, was 1.2 zwei Bildschirme später als *Bild* zeigt
  (Rechenkerne → Gradienten → Funktionsapproximation, Teil 3 unabhängig von Teil 2). Die Landkarte macht das
  besser, und S12:3–9 sagt es zusätzlich noch einmal in Prosa. Dreifach ist zu viel.
- **Abhängigkeiten:** Der Link auf `#sec-1.2` muss erhalten bleiben (er ist der einzige Vorwärtsverweis in 1.1).
  `src/chapters/08-la-misc/S85.mdx:90` und `src/chapters/13-funktionsapproximation/S131.mdx:7` verweisen auf
  `?k=01-intro#sec-1.1` — beide zielen auf das Numerik-Motivationsbeispiel (Z. 11–36), nicht auf diesen Absatz.

### E3 — ALS VERTIEFUNG MARKIEREN: Querschnittsthemen
- **Datei/Zeilen:** `src/chapters/01-intro/S12.mdx:82–117`
- **Label:** „Was sich durch das ganze Skript zieht" (Stabilität / Rechenaufwand / Matrixzerlegungen-Tabelle /
  Von exakt zu approximativ)
- **Wörter:** 237
- **Aktion:** **ALS VERTIEFUNG MARKIEREN** (`:::vertiefung[Was sich durch das ganze Skript zieht]`),
  Text unverändert lassen.
- **Begründung:** Vier Vorgriffe auf Stoff, den in Kapitel 1 niemand beurteilen kann: Konditionszahl (Kap. 4),
  Komplexitätsklassen (Kap. 2), die vier Zerlegungen (Kap. 5/6/7), Konvexität (Kap. 11). Beim Erstlesen ist das
  eine Liste unerklärter Begriffe; in der Prüfungsvorbereitung ist es die beste Übersichtsseite des Skripts.
  Genau dafür ist die ausklappbare Vertiefung da — nichts geht verloren, der rote Faden von Kapitel 1
  („Warum Numerik? → drei Teile → Vorwissen") wird kürzer und klarer.
  **Caveat:** Das ist der *wertvollste* EXTRA-Block des Kapitels. Wenn nur eine der drei Empfehlungen umgesetzt
  wird, dann E1, nicht E3.
- **Abhängigkeiten:** Keine Rückverweise aus späteren Kapiteln auf diesen Abschnitt (`grep` auf `sec-1.2`
  findet nur S11:106). Die Zerlegungstabelle steht in Kap. 5/6/7 jeweils im Detail, geht also nicht verloren.

### E4 — NICHT KÜRZEN (ausdrücklich): „Die drei Teile des Skripts"
- **Datei/Zeilen:** `S12.mdx:22–80`, 437 Wörter, davon ~350 EXTRA gegenüber der Folie „Themen".
- **Aktion:** **BEHALTEN, unverändert.**
- **Begründung:** Der Auftrag würde diesen Block formal als EXTRA einstufen (die Folie hat vier Bullet-Blöcke,
  das Skript 13 Kapitelbeschreibungen). Aber das ist kein aufgeblähtes Extra, sondern die Kernleistung eines
  Skript-Vorworts: Jedes Kapitel bekommt eine Leitfrage und eine Begründung, warum es an dieser Stelle steht
  („niemals eine Matrix invertieren!", „Teil 3 setzt Teil 2 nicht voraus"). Pro Kapitel sind das ~34 Wörter —
  das ist knapp, nicht großzügig. Kürzen hieße hier Qualitätsverlust ohne messbaren Gewinn.

---

## 3. Summe der empfohlenen Ersparnis

| Aktion | Wörter | Anteil am Kapitel | Anteil am Skript |
| --- | --- | --- | --- |
| **STREICHEN** (E1 + E2-Kürzung) | **63** | 3,0 % | 0,03 % |
| **ALS VERTIEFUNG MARKIEREN** (E3) | **237** | 11,4 % | 0,11 % |
| Summe berührt | 300 | 14,5 % | 0,14 % |

Sichtbarer Effekt im PDF: unter einer Seite gestrichen, gut eine halbe Seite als optional markiert.

---

## 4. Qualitätsbefunde (keine Kürzungen, aber beim Lesen aufgefallen)

1. **Falsche Angabe in der Leseanleitung.** `S11.mdx:113–115`: „Ausklappbare ‚Vertiefung'-Boxen (wie die
   Landkarte oben)". Die Landkarte steht (a) *unten*, nämlich in Abschnitt 1.2 nach 1.1, und ist (b) **keine**
   Vertiefungsbox, sondern regulärer Abschnittsinhalt (`<KursKarte />` direkt in S12.mdx). Das Beispiel in der
   Klammer trifft also weder Ort noch Typ. Wird E3 umgesetzt, ließe sich das mit einem Verweis auf den dann
   tatsächlich existierenden Vertiefungsblock reparieren — sonst ist die Klammer ersatzlos zu streichen.
2. **Kapitel 1 enthält null `:::vertiefung`-Blöcke** (Skript gesamt: 98) und **keinen Beweis-Stepper** — obwohl
   `S11.mdx:110–118` beide Elemente als Lesehilfe ankündigt. Die Leserin trifft die Ankündigung, bevor sie das
   Angekündigte je gesehen hat. E3 würde nebenbei genau das beheben.
3. **Zwei KERN-Lücken gegenüber dem Deck** (keine Kürzung, sondern fehlender Stoff):
   - Deck-Folie „**Beispiel 2: Komplexität**" (Matrixmultiplikation naiv / Strassen / optimiert, Tabelle mit
     $O(n^3)$ / $O(n^{2{,}807})$ / $O(n^{2{,}373})$, `01-intro.qmd:160–176`) hat **kein** Gegenstück im Skript.
     Komplexität kommt in S11 nur als Nebensatz („kostet $O(p^3)$") vor. Wenn irgendwo Text *hinzukommt*,
     dann hier — nicht als Kürzungskandidat.
   - Deck-Selbsttest LA-Frage **5** („Wann bilden Vektoren eine *Basis* des $\R^n$? Was ist ihr *Span*?",
     `01-intro.qmd:321`) fehlt im Skript-Selbsttest (`S11.mdx:128–163` hat nur 4 Fragen). Das ist ausgerechnet
     der Begriff, auf den Kapitel 13 („Basis von Funktionenräumen") aufsetzt; die auskommentierte Recap-Folie
     `01-intro.qmd:296–311` sagt das sogar explizit. Eine `SelbsttestFrage` mehr kostet ~50 Wörter und schließt
     die Lücke.
4. **Redundanz Prosa ↔ Widget sonst unauffällig.** Außer E1 wiederholt keine Prosa den Widget-Inhalt; die
   `<Aufgabe>`-Zeile im Widget selbst („Tippen wir ein Kapitel an…") überschneidet sich allerdings mit
   `S12.mdx:11–12` — wenn E1 umgesetzt wird, lohnt ein Blick, ob auch dieser Satz im MDX entbehrlich ist
   (weitere ~15 Wörter).
5. **Redundanz zwischen Abschnitten:** nur die in E2 behandelte Doppelung 1.1↔1.2. Die Drei-Blöcke-Erzählung
   in S11 (motivierend, mit den Folien-Beispielen Matrix-Kalkül/Taylor/GPT-3) und die in S12 (kapitelweise
   Roadmap) haben unterschiedliche Granularität und dürfen beide bleiben.

---

## 5. Gesamturteil

Kapitel 1 ist mit 2075 Wörtern (0,97 % des Skripts) **nicht Teil des Längenproblems** und über weite Strecken
eine disziplinierte Ausformulierung des Decks — Beispiel 1.1.1, das $p=10\,000$-Motivationsbeispiel, die
Selbsttests und die Leseanleitung sind exakt richtig dimensioniert und dürfen nicht angetastet werden.
Überlang ist hier gar nichts; lediglich 28 Wörter Widget-Nacherzählung (S12:18–20) und ein 50-Wörter-Absatz,
der die Landkarte in Prosa nacherzählt (S11:102–106), sind echter Ballast.
Der einzige größere Vorgriffsblock („Was sich durch das ganze Skript zieht", 237 Wörter) sollte als Vertiefung
markiert statt gekürzt werden — er ist beim Erstlesen unverständlich und in der Prüfungsvorbereitung Gold.
