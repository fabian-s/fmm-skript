# Kapitel 1 — Fix-Log (Umsetzung der Befunde aus `01-intro.md`)

Stand 2026-08-29. Verifikation: `node scripts/verify/REV29/01-intro-S12Landkarte.mjs`
(neu) und `node scripts/verify/HDR/verify-hdr.mjs` (repariert) laufen grün; Browser-Pass
im Dev-Server (Port 4181) per CDP bei 1300 px und 390 px, inklusive angeklicktem Knoten
„Kap. 6".

---

## S11Widgets.tsx (Abschnitt 1.1, `<SelbsttestFrage />`)

**Umgesetzt**

- [MINOR] `S11Widgets.tsx:4-5` — Farbrollenzeile behauptete Grün/Rot, die die Komponente
  nirgends verwendet. Jetzt: „keine; die Komponente trägt keine mathematische
  Farbcodierung".
- [MINOR] `S11Widgets.tsx:8` — Header-Zitat auf `verify-hdr.mjs` ohne Deckung gestrichen;
  es bleibt „keine numerischen Claims".
- [MINOR] `S11Widgets.tsx:32-33` — verwaister Doc-Kommentar am Dateiende gelöscht.
- [MINOR] `S11Widgets.tsx:22-26` — hartcodierte Slate-Ketten durch `W_PANEL`/`W_MUTED`
  aus `src/lib/widgets/surface.ts` ersetzt; die Komponente deckt damit auch die
  `.w-dark`-Oberfläche ab.
- [MINOR] `scripts/verify/HDR/verify-hdr.mjs:7` — `assert.equal(15, 15); assert.equal(17, 17)`
  durch eine echte Zählung aus `S101Konzeptkarte.tsx` ersetzt (Knoten, Kanten,
  Farbgruppen, keine Kante ins Leere, keine Dubletten). **Nebenbefund:** Die Prüfung
  konnte nicht scheitern und hat deshalb verdeckt, dass die Karte **18** statt der im
  Header behaupteten 17 Kanten hat. Header von `S101Konzeptkarte.tsx` (Kapitel 10)
  entsprechend korrigiert — sonst wäre `npm run verify:numbers` ab sofort rot.

**Rationale.** Ein Header, der eine andere Komponente beschreibt und ein Prüfskript
zitiert, das die Datei nicht berührt, ist irreführender als gar keiner; und ein
Selbsttestkasten, der auf dunklem Grund unlesbar wird, ist auf der Tooltip-Oberfläche
kaputt. Beides kostet vier Zeilen.

## S12Landkarte.tsx / KursKarte (Abschnitt 1.2, Kasten 1)

**Umgesetzt**

- [MAJOR] 390 px: Die Karte skalierte den 705 Einheiten breiten `viewBox` auf 316 px
  herunter, Beschriftungen landeten bei ~6 px, die Kästen bei ~20 px. Fix ohne Eingriff
  in `src/lib`: Das SVG bekommt eine Mindestbreite (`[&_svg]:min-w-[680px]`, ab `lg`
  wieder aufgehoben), sein Container den Seitwärts-Scroll (`[&>div]:overflow-x-auto`).
  Weil Legende und Detailzeile Geschwister des SVG sind, behalten sie die volle
  Kastenbreite und laufen normal um. Zusätzlich Kastenhöhe 38 → 44 viewBox-Einheiten und
  Zeilenabstand 57 → 62.
  **Gemessen (CDP):** 390 px → SVG 680 px im Scrollcontainer (Client 316 px), Maßstab
  0,964, Beschriftung 12,0 px, Kastenhöhe 42,4 px, Legende/Detailzeile 316 px, kein
  horizontaler Überlauf der Seite (0 px). 1300 px → 654 px, Maßstab 0,927, Beschriftung
  11,6 px, Kastenhöhe 40,8 px, kein Scroll.
- [MINOR] Legende „Teil 1 (Kap. 1–9)" gegen Prosa „Teil 1 (Kapitel 2–9)": Die Legende
  heißt jetzt „Einführung und Teil 1 · Numerische lineare Algebra (Kap. 1–9)", damit die
  blaue Gruppe nicht behauptet, Kapitel 1 gehöre zu Teil 1.
- [MINOR] `S12.mdx` schloss ohne Selbsttest, keine Frage im Kapitel war widgetabhängig
  (H4-Lücke). Neu am Ende von 1.2: eine `:::zahlfrage` „Wie viele Kapitel bauen laut der
  Karte direkt auf @kap:svd auf?" (Lösung 3). Das Prüfskript hält die Lösung gegen die
  Kantenliste des Widgets, sie kann also nicht still veralten.
- [F1/F6] Header „Verifizierte Zahlen" nennt jetzt `scripts/verify/REV29/01-intro-S12Landkarte.mjs`;
  das Skript rekonstruiert Knoten und Kanten aus der Quelle, gleicht die 13 Kapitel gegen
  `src/chapters/index.ts` ab und asserted die Aufschlüsselung 5 + 11 + 14 = 30.

**Rationale.** Die Karte war auf dem Handy unlesbar und im ganzen Kapitel nirgends
tragend — man konnte sie überspringen, ohne etwas zu verlieren. Jetzt ist sie lesbar,
antippbar (42 px Ziel) und wird von einer Selbsttestfrage gebraucht, die man ohne sie
nicht beantworten kann; und ihre drei Kennzahlen sind zum ersten Mal nachgewiesen statt
behauptet.

---

## Offen gelassen

- [MINOR] `ConceptFlow.tsx:331-361` — Die Detailzeile ist ein Readout („baut auf: … /
  führt zu: …") ohne Deutungssatz. **lib-Befund**: `src/lib` ist in diesem Lauf tabu.
- [MINOR] `ConceptFlow.tsx:331` — `min-h-16` reicht nicht, der Kasten springt beim
  Auswählen. Nachgemessen: die Zeile wächst bei „Kap. 6" auf 90 px (1300 px) bzw. 143 px
  (390 px), `min-h-16` sind 64 px. **lib-Befund.**
- [NOTE] `S12Landkarte.tsx:9` und `S12.mdx:6,25,43,…` — getippte Kapitelnummern in
  Header-Kommentar und Prosa. NOTE, nicht umgesetzt; die Prosa-Stellen sind nicht lokal
  (jede Umstellung zieht Satzumbauten nach sich).

## Entscheidung nötig

- Keine STATIC/REMOVE-Empfehlung in diesem Kapitel.
- Zur Kenntnis: Die vier Kopien der `SelbsttestFrage` in Kapitel 3 sind mit der hier
  aufgeräumten Komponente aus `S11Widgets.tsx` identisch. Die Zusammenlegung zu einer
  Lib-Komponente `src/lib/widgets/SelbsttestFrage.tsx` ist ein **lib-Befund** und
  braucht eine Entscheidung im lib-Lauf (siehe `03-matrix-spur-norm.md`).
