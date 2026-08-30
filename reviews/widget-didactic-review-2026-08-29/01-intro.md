# Kapitel 1 — Widget-Didaktik-Review (2026-08-29)

Nenner aus dem Quellbaum: **2 Widget-Dateien** (`src/chapters/01-intro/widgets/`),
**2 MDX-Abschnitte** (S11 „Worum geht es", S12 „Landkarte"), **1 `:::interaktiv`-Kasten**.
Beide Pässe durchgeführt: Quelltext vollständig gelesen; Rendering bei 1300 px und 390 px
selbst erzeugt (die mitgelieferten Baseline-Shots unter `shots/01/` sind **leer** — die
Abschnitte tragen `content-visibility:auto`, der Kasten war beim Schuss nie im Viewport;
das ist ein Artefakt des Schuss-Skripts, kein Produktfehler). Interaktionssequenz:
Knoten „Kap. 7", „Kap. 13", „Lineare Algebra I" angeklickt, jeweils bei 1300 und 390 px.

## S11Widgets.tsx (Abschnitt 1.1, Selbsttest „Reicht das Vorwissen?")

S11Widgets — **KEEP** — Eine `<details>`-Selbsttestzeile ohne Interaktionsanspruch; genau
die richtige Sprosse der Leiter (Muster 11), aber der Header beschreibt eine andere Datei.

**F1/F6-Klassifikation:** keine numerischen Claims; zitiertes Skript existiert, deckt die
Datei aber nicht ab (siehe unten).

- [MINOR] `src/chapters/01-intro/widgets/S11Widgets.tsx:4-5` — Der Header behauptet
  Farbrollen („Grün bestätigt eine richtige Wahl, Rot kennzeichnet eine falsche"), die die
  Komponente nirgends verwendet: gerendert wird ausschließlich ein neutraler
  `<details>`-Kasten in Slate-Tönen. Rest aus einer Vorfassung. Fix: Farbrollenzeile auf
  „keine; die Komponente trägt keine mathematische Farbcodierung" ändern.
- [MINOR] `src/chapters/01-intro/widgets/S11Widgets.tsx:8` — „Geprüft mit verify-hdr.mjs,
  2026-08-20" zitiert ein reales Skript (`scripts/verify/HDR/verify-hdr.mjs`), das über
  diese Datei kein einziges Wort verliert (es prüft S101 und S141–S144). Ein Header-Zitat
  ohne Deckung ist irreführender als gar keins. Fix: Zeile streichen, „keine numerischen
  Claims" genügt.
- [MINOR] `scripts/verify/HDR/verify-hdr.mjs:7` — `assert.equal(15, 15); assert.equal(17, 17);`
  als „Prüfung" der Knoten- und Kantenzahl der Landkarte: eine Zusicherung, die
  nicht scheitern kann (F6). Fix: die Zahlen aus der Kantenliste des Widgets importieren
  bzw. aus `src/chapters/index.ts` zählen und gegen die Erwartung prüfen.
- [MINOR] `src/chapters/01-intro/widgets/S11Widgets.tsx:32-33` — Datei endet mit einem
  freistehenden Doc-Kommentar („Konzeptionelle SVG-Landkarte der drei Themenblöcke"), zu
  dem keine Deklaration mehr gehört (F7, Rest der Migration). Fix: löschen.
- [MINOR] `src/chapters/01-intro/widgets/S11Widgets.tsx:22-26` — Hartcodierte
  Slate-Klassenketten statt `W_PANEL`/`W_MUTED` aus `src/lib/widgets/surface.ts`; die
  Komponente deckt damit die `.w-dark`-Oberfläche (Tooltip-Panel) nicht ab (H5, ältere
  Generation). Fix: auf die Klassenketten der Lib umstellen — sie ist dann identisch mit
  den vier Kopien in Kapitel 3 und lässt sich mit ihnen zusammenlegen.
- [NOTE] `src/chapters/01-intro/S11.mdx:150-216` — Acht Selbsttestfragen, keine davon
  widgetabhängig. In 1.1 gibt es kein Widget, also ist das korrekt; die H4-Lücke sitzt in
  1.2 (siehe dort).

## S12Landkarte.tsx (Abschnitt 1.2, `:::interaktiv[Landkarte …]`)

KursKarte — **REVISE** — Als tote Figur bei 1300 px vorbildlich (alle 13 Kapitel, Vorwissen,
Vorgriffsbögen, Legende), bei 390 px aber unlesbar, und die Detailzeile deutet nichts,
sondern listet nur auf.

**F1/F6-Klassifikation:** Header ohne Zahlen-Nachweis. Die drei behaupteten Zahlen
(13 Kapitel, 3 Vorwissensknoten, 30 Abhängigkeiten) habe ich von Hand nachgezählt: **alle
drei stimmen** (5 Vorwissenskanten + 11 Lesereihenfolge + 7 Vorgriffe + 7 Anker = 30).
Nachgewiesen sind sie damit trotzdem nicht.

- [MAJOR] `src/lib/widgets/ConceptFlow.tsx:223-229` + `src/chapters/01-intro/widgets/S12Landkarte.tsx:42-53`
  (gerendert: `ix/01/01-m-kap7.png`) — Bei 390 px skaliert das SVG den 590 Einheiten
  breiten `viewBox` auf 316 px herunter. Die Kapitelbeschriftungen (`fontSize={12.5}`)
  landen damit bei effektiv ~6,7 px und sind nicht mehr lesbar; die Kästen (Höhe 38
  Einheiten) sind ~20 px hoch, also halb so groß wie das 40-px-Mindesttouchziel (G1/G6).
  Fix: für schmale Viewports ein zweispaltiges Layout (Kästen untereinander, halbe
  Spinne) oder ein horizontal scrollbarer Container mit fester Mindestbreite ~560 px; die
  Kastenhöhe auf ≥ 56 viewBox-Einheiten anheben.
- [MINOR] `src/chapters/01-intro/widgets/S12Landkarte.tsx:98` vs.
  `src/chapters/01-intro/S12.mdx:25` — Die Legende schreibt „Teil 1 · Numerische lineare
  Algebra (Kap. 1–9)", die Prosa im selben Abschnitt „Teil 1 – Numerische lineare Algebra
  (Kapitel 2–9)". Ursache: `teil(num)` in `S12Landkarte.tsx:40` steckt Kapitel 1 in
  `teil1`. Fix: entweder Kapitel 1 als eigene Gruppe „Einführung" führen oder die
  Prosa auf 1–9 angleichen.
- [MINOR] `src/lib/widgets/ConceptFlow.tsx:331-361` — Die Zeile unter dem Graphen ist ein
  reiner Readout („baut auf: … / führt zu: …"), kein Verdikt: Sie nennt keine Bedeutung,
  keine Konsequenz und keinen Grund (D1/D5). Bei einer Landkarte ist das vertretbar, aber
  eine Zeile wie „Kapitel 7 braucht die Zerlegungen aus 5 und 6 sowie die Fehlermaße aus
  4 — wer 7 lesen will, sollte diese drei parat haben" wäre die Deutung, die die Rubrik
  verlangt. Fix: einen kurzen, aus `pre`/`post` generierten Deutungssatz ergänzen.
- [MINOR] `src/lib/widgets/ConceptFlow.tsx:331` — `min-h-16` reicht nicht: die Detailzeile
  wächst beim Auswählen eines Kapitels mit vielen Nachbarn von zwei auf drei Zeilen, der
  Kasten springt um 26 px (gemessen 1188 → 1214 px, `ix/01/01-b-kap7-gepinnt.png`). Fix:
  `min-h-24` bzw. feste Höhe für drei Zeilen.
- [MINOR] `src/chapters/01-intro/S12.mdx:1-127` — Abschnitt 1.2 schließt ohne Selbsttest;
  keine einzige Frage im Kapitel setzt die Karte voraus (H4: „mindestens eine Frage nur
  mit dem Widget beantwortbar"). Fix: eine `:::zahlfrage` im Stil von „Wie viele Kapitel
  bauen laut Karte direkt auf Kapitel 6 auf?" (Antwort 3: 7, 8, 9) ans Ende von 1.2.
- [NOTE] `src/chapters/01-intro/widgets/S12Landkarte.tsx:9` — „aus Beispiel 1.1.1" als
  getippte Nummer im Header-Kommentar. Nicht leserseitig, aber dieselbe Zeitbombe wie im
  Fließtext; `num()`/`ref()` gäbe es auch hier.
- [NOTE] `src/chapters/01-intro/S12.mdx:6,25,43,49,56,68` — Getippte Kapitelnummern in der
  Prosa („Kapitel 3", „Kapitel 2–9", „Kapitel 10–12"). KONVENTIONEN.md („Grundregel: Wir
  schreiben nie eine Nummer") verlangt `@kap:`/`@num:`; hier verweist der Abschnitt gerade
  auf Kapitelgrenzen, die sich bei der nächsten Umstrukturierung verschieben. Fix:
  `@num:matrix-spur-norm` usw.

## Kapitel-Fazit (H1–H6)

**H1 Widget-Dichte:** 1 Kernwidget in 1.2, keins in 1.1 — angemessen für ein bewusst
kurzes Einführungskapitel (Dozentenvorgabe im Bauauftrag). Kein Befund.

**H2 Dramaturgie:** Der Aufbau stimmt: Motivation (1.1, zwei Rechenbeispiele) → Überblick
(1.2, Karte) → Vertiefungen mit Detailtext. Kein Befund.

**H3 Farbrollen:** Die Karte belegt Grau/Blau/Orange/Violett als *Gruppenfarben* und sagt
im Header ausdrücklich, dass das keine Fehler- oder Lösungsfarben sind
(`S12Landkarte.tsx:7-9`). Das ist die richtige Art, eine Ausnahme zu dokumentieren — vor
allem, weil Rot/Grün in 1.1 im Beispiel „schlecht konditioniertes Problem" (`S11.mdx:71-80`)
tatsächlich exakte vs. gestörte Lösung tragen. Kein Farbkonflikt.

**H4 Selbsttest-Abdeckung:** 1.1 hat acht Fragen, 1.2 gar keine, und **keine einzige Frage
im Kapitel ist widgetabhängig**. Das ist die größte didaktische Lücke des Kapitels: Die
Karte ist damit nirgends tragend, sondern Dekoration am Abschnittsanfang.

**H5 Ältere Generation:** Bestätigt. `S11Widgets.tsx` läuft außerhalb der
`:::interaktiv`-Konvention — das ist für einen Selbsttest **korrekt** (die Konvention gilt
für Widgets, nicht für aufklappbare Lösungen), aber die Komponente stammt sichtbar aus der
Zeit vor `surface.ts`: hartcodierte Slate-Klassen, ein Header, der eine andere Komponente
beschreibt, und ein verwaister Doc-Kommentar. Dieselbe Komponente existiert in Kapitel 3
noch viermal (siehe `03-matrix-spur-norm.md`); zusammen sind das fünf Kopien.

**H6 Länge:** Die Auswertungsprosa im Kasten (`S12.mdx:14-18`) sind drei Sätze und steht
korrekt *innerhalb* des Kastens. Kein Wiederholungsbefund; der Gedankenstrich-Etat ist in
beiden MDX-Dateien eingehalten (0 Geviertstriche).

### Die drei wichtigsten Muster

1. **Kein Prüfskript im Repo.** Beide Dateien tragen entweder gar keinen Zahlen-Nachweis
   oder zitieren `verify-hdr.mjs`, das ihre Zahlen nicht abdeckt — und dessen einzige auf
   die Landkarte gemünzte Zusicherung `assert.equal(15, 15)` lautet.
2. **Das Rendering bei 390 px ist der blinde Fleck.** Der Quelltext ist sauber
   (`viewBox` + `w-full`), aber die Skalierung macht die Karte auf dem Handy unlesbar.
   Genau dieser Defektklasse ist mit einem Quelltextpass nicht beizukommen.
3. **Das Widget ist nicht tragend.** Ohne widgetabhängige Selbsttestfrage und ohne
   deutende Verdiktzeile bleibt die Karte eine Illustration; die Rubrik verlangt beides.
