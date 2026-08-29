# Widget-Didaktik-Review 2026-08-29 — Konsolidierung

Vollreview aller 117 Kapitel-Widget-Dateien (Zwei-Pass: vollständiger Quelltext +
Rendering bei 1300/390 px MIT durchgefahrenen Interaktionssequenzen), Rubrik
`slds-lmu/ai-scaffolding` → explorable-widgets (Stand 2026-08-27). Einzelreports
mit allen Befunden (Datei:Zeile) liegen je Kapitel in diesem Ordner; Baseline in
`00-quantitative-scan.md`.

## Gesamtbild

| Kapitel | KEEP | REVISE | STATIC | REMOVE | CRITICAL | MAJOR |
|---|---|---|---|---|---|---|
| 01-intro | 1 | 1 | 0 | 0 | 0 | 1 |
| 02-algos | 7 | 4 | 0 | 1 | 1 | 8 |
| 03-matrix-spur-norm | 9 | 2 | 0 | 0 | 1 | 4 |
| 04-fehler | 5 | 4 | 0 | 0 | 0 | 13 |
| 05-lgs | 3 | 6 | 0 | 0 | 0 | 14 |
| 06-svd | 6 | 3 | 0 | 0 | 1 | 5 |
| 07-kq | 10 | 6 | 1 | 0 | 0 | 21 |
| 08-la-misc | 3 | 3 | 0 | 0 | 0 | 13 |
| 09-tensoren | 3 | 4 | 1 | 0 | 0 | 12 |
| 10-differentialrechnung | 9 | 9 | 1 | 0 | 2 | 22 |
| 11-konvexitaet | 6 | 2 | 3 | 0 | 1 | 4 |
| 12-optim | 12 | 2 | 0 | 0 | 0 | 13 |
| 13-funktionsapproximation | 6 | 10 | 0 | 0 | 4 | 39 |
| **Summe** | **80** | **56** | **6** | **1** | **10** | **169** |

(Zählung je Report; einige Dateien enthalten mehrere beurteilte Widgets.)
Kein Kapitel ist strukturell überbaut; die Substanz des Overhauls 2026-08 trägt.
Die Schulden sind konzentriert und wiederholen sich — sechs Muster decken den
Großteil der 169 MAJOR ab.

## Die sechs schlechten Muster (nach Hebel sortiert)

### 1. Spoiler-Split verletzt: die Prosa beantwortet die Schätzfrage im selben Kasten
Das mit Abstand häufigste Muster (≈ 40 Kästen; in Kap. 12 alle 11, in Kap. 13 alle 6,
in Kap. 10 neun von zehn). Die `Schaetzfrage`-Komponente sperrt ihre Zahlen korrekt
bis zum Auflösen — aber die Konsolidierungsprosa, die Aufgabenzeile, ein Preset-Label
(„Einsermatrix (Beispiel 3.5.7)", „Startstrahl y = 0", Glättung „passend") oder das
Widget-Verdikt im Grundzustand nennt die Antwort sichtbar, bevor getippt wird.
Folgeschaden: die widget-abhängigen Selbsttest-Zahlfragen sind ohne Widget lösbar.
Fix: Auflösung nach `verdeckt={…}` bzw. hinter das Auflösen; Preset-Labels didaktisch
statt lösungsnennend.

### 2. Toleranzschwelle als Gleichheit im Verdikt (Drei-Zustands-Regel verletzt)
≈ 20 Verdikte behaupten einen exakten Zustand („steht senkrecht", „jede Richtung ist
Maximalstelle", „κ = ∞", „Ax = 0") auf einer Float-Schwelle, oft während das Readout
daneben die Gegenzahl anzeigt (CRITICAL in S61Ellipse). In praktisch allen Fällen ist
der exakte Zustand über den kontrollierten Parameter erreichbar — der Fix (exakt/nahe/
regulär verzweigen) kostet wenige Zeilen pro Stelle.

### 3. Erreichbarer Zustandsraum > geprüfter Zustandsraum
Verdikt-Fallbäume und Header-Tabellen decken nicht den vollen Regler-/Preset-Bereich:
„exakt 22,5 für jedes k", widerlegbar ab k = 16 (CRITICAL Kap. 2); Maximumsnorm ohne
Verdikt-Zweig im Submultiplikativitäts-Widget (CRITICAL Kap. 3); beworbene Zustände
außerhalb des Reglerbereichs (Kap. 12: „zehn Schritte" bei K_MAX = 8); Presets, die
0,05 neben dem kritischen Punkt landen; unerreichbare Erfolgszweige (S81QR).
Fix je Fundstelle: Zweig ergänzen ODER Bereich klemmen — plus Prüfskript, das jeden
beworbenen Fall anfährt (F8).

### 4. Numerik-Nachweise behauptet statt committet
60/117 Header tragen die „historische Notiz" (Skript verloren), weitere zitieren
Pfade, die nie existierten (Kap. 5: 7/8 Header; Kap. 8: 2 Pfade; Kap. 10: 6 Skripte;
Kap. 13: 10 Pfade OHNE Kennzeichnung), oder Skripte mit unwiderlegbaren Assertions
(`assert.equal(17,17)`, `close(5−10·0,5, 0)`, `assert.deepEqual([2,8],[2,8])`).
Sie haben real Fehler durchgelassen: 18 statt 17 Kanten (Konzeptkarte Kap. 10),
Raster trifft den Knick nicht → Zahlfrage unlösbar (CRITICAL S105Zoom).
Kontrast: Kap. 9 ist vollständig sauber (Maßstab: `KAP09/kronecker-vektorisierung.mjs`,
24 geseedete Fälle, zwei unabhängige Rechenwege); R6/spline-buckel und
FIX-VERDACHT/check-s143-cheb ebenso. Fix: `scripts/verify/REV29/` je angefasstem Widget.

### 5. Rendering-Defekte, die nur der Browser-Pass findet
Zwei Haupttafeln auf ~50 px kollabiert (S107Hesse, S108Newton — viewBox ohne
width/height im Flex, die bekannte Falle); 390-px-Beschnitt (S64Empfehlung,
S92Scheiben, S134Konstruktion); eine als Diagonale gezeichnete Achse (S75Local);
sr-only-Legende, die Sehenden fehlt und Screenreadern die Lösung vorab verrät
(S82Pagerank); 2+1-Umbruch, der „links/Mitte/rechts"-Prosa falsch macht
(S115Landschaften); PSD-Kegel-Polygon zeichnet für b = 0 das falsche Gebiet
(CRITICAL Kap. 11). Quelltext-Pass allein hätte keinen davon gefunden — die
Overhaul-Lehre („Abnahme braucht BEIDE Pässe") bestätigt sich erneut.

### 6. Startzustand trivial oder Aufgabe schon erledigt
Vier Kap.-5-Widgets starten im Trivialzustand; SpdRichtung begrüßt mit „Aufgabe
geschafft"; S112KonvexTest setzt beim Mengenwechsel sofort das Gegenbeispiel, das
der Leser suchen soll; im PCA-Widget ist die Zielrichtung von Anfang an eingezeichnet.
Fix: Defaults auf den phänomenzeigenden, aber unerledigten Zustand.

## Was nachweislich gut ist (Konventionen, die tragen)

Keine minifizierten Einzeiler mehr, alle 117 Header vorhanden, kein ungeseedeter
Zufall, keine Idle-Loops, 0 merror im gesamten Buch, Dual-Path bei allen
Drag-Interaktionen, durchweg dokumentierte (und meist eingehaltene) Farbrollen,
lückenlos widget-abhängige Selbsttests in Kap. 2/3/4/6. Musterwidgets, an denen
sich Fixes orientieren sollen: S33Operatornorm, S24Wachstum, S107Hesse
(Drei-Zustands-Regel mustergültig), S62Geometrie (fünf begründete Verdiktstufen),
S136Konvergenz (Referenz-Prüfskript), Kap.-9-Header insgesamt.

## Offene Editorial-Entscheidungen (nicht umgesetzt, Dozenten-Call)

Die 6 STATIC- und 1 REMOVE-Empfehlungen der Reports (u. a. Kap. 7 Kostentabelle,
Kap. 9, 3× Kap. 11, Kap. 10 Konzeptkarte, 1 Widget Kap. 2) sowie der nicht
durchführbare F5-Diff von S76Compare gegen heath-ch3 (Quell-App liegt nicht in
dieser Umgebung). Details in den Fix-Logs unter „Entscheidung nötig".

## Prozessnotizen

- Beide CRITICALs in Kap. 2/3 und mehrere MAJOR waren NUR über die
  Interaktionssequenzen findbar (Slider ans Raster-Ende, Preset-Durchlauf) —
  die Sequenz-Pflicht gehört dauerhaft in die Abnahme.
- Batch-Screenshots brauchen den content-visibility-Override + MathJax-Nachlauf
  (scripts/dev/shot-widgets.mjs, gefixt in diesem Lauf), sonst leere Clips/Roh-TeX.
- Violett trägt in Kap. 12 vier verschiedene Rollen (je Header begründet, auf
  Kapitelebene aber Drift) — bei nächster Gelegenheit vereinheitlichen (H3).
