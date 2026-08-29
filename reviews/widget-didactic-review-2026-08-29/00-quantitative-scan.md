# Widget-Didaktik-Review 2026-08-29 — Quantitativer Scan (Rubrik Schritt 1–2)

Scope: alle Kapitel-Widgets `src/chapters/*/widgets/*.tsx` (117 Dateien + `05-lgs/widgets/shared.tsx`).
Rubrik: `slds-lmu/ai-scaffolding` → `skills/explorable-widgets/references/review-rubric.md`
(Stand 3d31f13, 2026-08-27 — die revidierte Fassung mit den fmm-skript-Lessons).

## Nenner (aus dem Quellbaum gezählt)

| Kapitel | Widget-Dateien | MDX-Abschnitte |
|---|---|---|
| 01-intro | 2 | 2 |
| 02-algos | 9 | 5 |
| 03-matrix-spur-norm | 11 | 6 |
| 04-fehler | 6 | 4 |
| 05-lgs | 8 (+shared) | 5 |
| 06-svd | 8 | 5 |
| 07-kq | 7 | 6 |
| 08-la-misc | 6 | 5 |
| 09-tensoren | 7 | 5 |
| 10-differentialrechnung | 16 | 9 |
| 11-konvexitaet | 8 | 5 |
| 12-optim | 14 | 6 |
| 13-funktionsapproximation | 15 | 9 |
| **Summe** | **117** | **72** |

## Deltas gegen die Baseline des Widget-Overhauls (2026-08-24)

- **Minifizierte Einzeiler: 0** (Baseline: 19 offen, u. a. ganz Kap. 13). Diese Schuld ist
  getilgt: keine Datei hat mehr Zeilen > 610 Zeichen, alle 117 Dateien tragen einen
  `/** … */`-Header.
- **`Math.random` im Code: 0** (10 Treffer sind ausnahmslos Header-Kommentare der Form
  „kein Math.random").
- **Keine Idle-Loops**: 0 Treffer für `setInterval`/`requestAnimationFrame`.

## Offene Flächen laut Scan (Prüfauftrag für die Kapitel-Reviews)

1. **F1/F6 (Prüfskript-Deckung): 60 von 117 Headern tragen die „historische
   Notiz … nicht reproduzierbar"** — Zahlen behauptet, aber das zitierte Prüfskript ist
   verloren. Nur 21 Dateien zitieren ein committetes `scripts/verify/…`-Skript
   (69 Skripte vorhanden, `npm run verify:numbers` grün). Je Widget klassifizieren:
   gültiges Skript / fehlendes Skript / fehlender Header / keine numerischen Claims.
2. **Interaktions-Mix**: 28/117 Dateien nutzen `useDrag` (Objekt-Manipulation),
   90 `Slider`, 24 `Schaetzfrage` (predict-then-reveal), 111 `Verdikt`, 103 `Aufgabe`,
   76 `aria-*`. Prüfen: C1 (wo wäre Drag statt Slider das natürliche Primärmittel),
   C7 (wo fehlt predict-then-reveal bei überraschender Antwort), G3 (die 41 Dateien
   ohne aria).
3. **LIB2-Batch aus dem Overhaul-Status noch offen**: Tooltip-Panel klemmt sich nicht
   an den Viewport (448 px sprengt 390-px-Handys); Labels clippen statt textAnchor zu
   spiegeln; Legende zeichnet über die Datenebene. Beim Render-Pass gezielt prüfen.
4. **Kapitel-Ebene**: H1–H6 je Kapitel; Kapitel 1 hat nur 1 `:::interaktiv`-Kasten
   (S11-Selbsttests laufen außerhalb der Kasten-Konvention → H5 prüfen).

## Render-Pass-Grundlage

Screenshots aller `[data-interaktiv]`-Kästen (inkl. aufgeklappter Vertiefungen) bei
1300 px und 390 px liegen im Sitzungs-Scratchpad unter `shots/<kap>/`; erzeugt mit
`scripts/dev/shot-widgets.mjs` (neu, CDP-basiert wie `shot-concept.mjs`).
merror-Zählung je Kapitel im Screenshot-Log.
