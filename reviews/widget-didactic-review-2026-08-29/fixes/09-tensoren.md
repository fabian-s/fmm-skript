# Fix-Log Kapitel 9 — Tensoren & Tensorprodukte (2026-08-29)

Grundlage: `reviews/widget-didactic-review-2026-08-29/09-tensoren.md`.
Verifikation: sechs neue Prüfskripte unter
`scripts/verify/REV29/09-tensoren-*.mjs` (alle grün, von
`npm run verify:numbers` erfasst; die bestehenden `scripts/verify/KAP09/*.mjs`
laufen unverändert weiter) und ein eigener CDP-Pass auf einem Dev-Server
(Port 4183) bei 1300 px und 390 px.

Das Kapitel war laut Review „sauber" – die Fixes sind deshalb ausschließlich die
konkretisierten Einzelbefunde, keine Umbauten der Rahmung.

---

## S91Bilinear.tsx — BilinearitaetsDemo (Kasten 1)

**Umgesetzt:** MAJOR `S91.mdx:140-147` (die `bemerkung` „Das Vierfache,
geometrisch gelesen" steht jetzt **hinter** dem Kasten und liest sich dort als
Erklärung der Auflösung; vorher gab sie die Antwort der Schätzfrage), MAJOR
`:92-93` (die beiden Modusknöpfe nutzen `W_BUTTON` / `W_BUTTON_AKTIV` aus
`surface.ts` und haben damit einen sichtbaren Aktivzustand), MINOR `:83`
(y-Beschriftung wandert an die Innenseite der Achse und `PAD` von 32 auf 46 –
das abgeschnittene „= 2,0" ist weg), MINOR `:64-69` (y-Achse bekommt Ticks),
MINOR `:96` (der Zweig „gemeinsam" ist `warn`, nicht `fail` – es scheitert
nichts, der Faktor 4 ist die erwartete Aussage), MINOR
`scripts/verify/KAP09/s91-bilinear.mjs:3-8` (F6: statt das bestehende Skript zu
ändern, spiegelt das neue `09-tensoren-S91Bilinear.mjs` die
Skalierungsformeln `vergroessertX`/`vergroessertY` aus dem Widget-Quelltext und
prüft sie über den ganzen Reglerbereich – eine Änderung dort lässt es
fehlschlagen).

**Rationale:** Das einzige Predict-then-reveal-Widget des Kapitels war technisch
korrekt gebaut und wurde von der Prosa davor entwertet; die Umstellung kostet
kein einziges Wort. Und zwei nackte Textstücke ohne Rand sind für sehende Leser
kein Umschalter – der aktive Modus war nur an `aria-pressed` ablesbar.

## S92Scheiben.tsx — ZahlenTensor (Kasten 2)

**Umgesetzt:** MAJOR `:139-143` (die vier Scheiben sind jetzt eine
Fallunterscheidung statt vier Zufallszahlenblöcke: k = 1 ohne Struktur, k = 2
mit konstanter dritter Zeile, k = 3 symmetrisch, k = 4 mit einem einzelnen
Ausreißer T₂₃₄ = 5; jeder Fall hat ein eigenes Verdikt, das sagt, was am
Höhenfeld dadurch zu sehen ist), MINOR `:107`/`:111` (`role="group"` statt
`role="img"`, damit die vier klickbaren Scheiben für Hilfsmittel nicht hinter
einem Blatt verschwinden).

**Rationale:** Ein Verdikt, das für alle Zustände dasselbe sagt, ist kein
Verdikt. Jetzt lohnt sich das Durchklicken: Der dritte Index wählt nicht nur
andere Zahlen, sondern eine andere Gestalt der Fläche, und genau das behaupten
die vier Zweige – nachgeprüft vom Skript, das Symmetrie, konstante Zeile und
Ausreißer an den Daten selbst verifiziert.

## S92Scheiben.tsx — FarbBild (Kasten 3)

**Umgesetzt:** MAJOR `:160` (das eine 610 px breite SVG ist durch vier gleich
breite Tafeln in einem `grid-cols-2 sm:grid-cols-4` ersetzt; bei 390 px stehen
sie 2 × 2, alle vier innerhalb des Bildschirms), MAJOR `:160-166` (Doppelpfad:
zwei Regler „Zeile i" und „Spalte j" unter den Tafeln, der Klickpfad bleibt),
MINOR `:188-189` (der Pixel wird in der Reihenfolge (Zeile, Spalte) genannt,
wie $\bI_{i,j,k}$ im Text).
**Zusätzlich (im Prüfskript gefunden, nicht im Review):** Der Zweig „erscheint
annähernd grau" war unerreichbar – die kleinste Kanalspanne im ganzen Bild ist
106, die Schwelle stand bei 35. Statt einer toten Verzweigung nennt das Verdikt
jetzt den dominierenden Kanal; alle drei Kanäle kommen im Bild als Maximum vor
(13 / 14 / 37 Pixel), das Skript prüft beides.

**Rationale:** Die eine Einsicht des Widgets ist „drei Scheiben, ein Bild" – und
genau das RGB-Bild lag auf dem Handy vollständig außerhalb des Bildschirms.
Klick-only war außerdem die einzige Verletzung der harten Doppelpfad-Regel im
Kapitel.

## S93RangEins.tsx — RangEinsExplorer (Kasten 4)

**Umgesetzt:** MAJOR `:88`/`:221-222` (drei Zustände für den Kern: `skalar === 0`
exakt – über die Regler mit Schritt 0,1 und über den Preset erreichbar –,
|wᵀx| < 0,08 als „klein, aber nicht null", sonst der Normalfall), MAJOR
`:87`/`:219-220` (die Nullmatrix-Aussage hängt jetzt an `‖v‖ === 0 || ‖w‖ === 0`;
für 0 < ‖v‖ < 0,12 gibt es einen eigenen Zweig, der sagt, dass A weiterhin Rang 1
hat und nur im Maßstab des Bildes verschwindet).
**Offen:** MINOR `S93.mdx:90-91` (kein Satz im Kasten vor dem Widget) – der
Review nennt das selbst „formal A5, praktisch unkritisch, weil der Absatz direkt
anschließt"; nicht angefasst, um die Wortzahl nicht ohne Ertrag zu erhöhen.

**Rationale:** Der Ziehgriff ist laut Aufgabe das Primärmittel, und über ihn
erreichte man ständig Zustände, in denen die Karte darüber „Ax = 0,05 · v"
zeigte und das Verdikt „Ax = 0" behauptete. Ebenso war v = (0,1; 0) keine
Nullmatrix – die alte Formulierung war schlicht falsch.

## S93Kronecker.tsx — KroneckerRechner (Kasten 5)

**Umgesetzt:** MAJOR `:58` (die Aufgabe verspricht nicht mehr etwas über vec(X),
das im Widget nicht vorkommt, sondern fragt nach dem, was zu sehen ist: wo die
Einträge von Bᵀ landen, wo die Blöcke von A, und was die Vertauschung ändert),
MAJOR `:76-80` (die drei Presets heißen jetzt „A = I", „B = I", „beide voll
besetzt" und sind damit eine Fallunterscheidung; jeder Fall hat einen eigenen
Verdikt-Zweig, der sagt, was an der Blockstruktur abzulesen ist), MINOR `:68-74`
(`W_BUTTON_AKTIV` statt bloßer Randfarbe).
**Offen:** MINOR `:35-37` (die Blockeinfärbung rechnet mit `Math.floor(i/2)` und
gilt nur für 2 × 2-Faktoren) – im Review als Hinweis geführt, alle Presets sind
2 × 2; eine Verallgemeinerung wäre ein Umbau ohne sichtbaren Ertrag.

**Rationale:** Drei Presets, die denselben Text erzeugen, sind drei
Zahlenbeispiele. Mit A = I sieht man, dass Bᵀ ganze Einheitsblöcke skaliert; mit
B = I, dass A getrennt auf jede Spalte wirkt; erst im dritten Fall mischen sich
Zeilen- und Spaltenwirkung. Das ist die Argumentation, die der Abschnitt braucht.

## S93Kovarianz.tsx — SeparierbareKovarianzDemo (Kasten 6)

**Umgesetzt:** MAJOR `:28` (`role="img"` auf dem Textcontainer entfernt – der
Satz „Vergleich einer allgemeinen und einer separierbaren Kovarianzmatrix"
ersetzte für Hilfsmittel den gesamten quantitativen Inhalt), MINOR `:30`
(Σ ∈ ℝ^{d×d} wird per MathJax gesetzt statt als Klartext), MINOR `:46` (die
beiden Zweige sagen jetzt Verschiedenes: oben die Wachstumsordnungen (mn)²/2
gegen (m²+n²)/2, unten, dass die Ersparnis auf kleinem Gitter den Verlust an
Flexibilität noch nicht lohnt).

**Rationale:** Zwei Verdikt-Zweige, die dasselbe mit anderen Worten sagen, sind
einer zu viel; und ein `role="img"` über zwei Zahlenkarten macht die Zahlen für
Screenreader unerreichbar – ausgerechnet in einem Widget, das nur aus Zahlen
besteht.

## S94Tensorbasis.tsx — TensorbasisExplorer (Kasten 7)

**Umgesetzt:** MINOR `:83-88` (drei Presets „Ebene (c₂₂ = 0)", „nur der
gemischte Anteil", „Beispiel 2 + 3x − y + 5xy" – die Fallunterscheidung des
Abschnitts ist damit anklickbar), MINOR `:91-95` (das Verdikt nimmt Vorzeichen
und Wirkung von c₂₂ auf: positives c₂₂ hebt die Ecke (1,1), negatives senkt sie;
zugleich prüft der Ebenen-Zweig `c₂₂ === 0` exakt statt über eine Float-Toleranz
auf einem Reglerrastwert), MINOR `:73` (die Niveaubeschriftungen stehen jetzt am
Ende der jeweiligen Höhenlinie statt als Zahlenspalte am rechten Rand).

**Rationale:** Sechs Regler ohne einen einzigen Preset sind ein Sandkasten; mit
den drei Knöpfen ist die Fallunterscheidung des Abschnitts in drei Klicks
durchlaufbar. Und die Zuordnung Zahl → Höhenlinie war bei 390 px schlicht nicht
herstellbar.

## S95Vektorisierung.tsx — VektorisierungMatrixgleichung (Kasten 8)

**Umgesetzt:** MAJOR `:31`/`:58-62` (zwei Knöpfe „Bᵀ ⊗_K A" und „A ⊗_K Bᵀ"; die
falsche Reihenfolge liefert nachweislich einen anderen Vektor, damit ist der
`fail`-Zweig erreichbar und die Kastenfrage „Welche der beiden Rechnungen
liefert denselben Vektor?" bekommt eine Antwort, die man finden muss; ein
dritter, seltener Zweig fängt den Fall ab, in dem beide Anordnungen zufällig
zusammenfallen), MINOR `:37-48` (C = AXB wird als Matrix angezeigt, und das
Gleichheitszeichen zwischen den beiden Vektoren wechselt auf ≠, wenn sie
abweichen), MINOR `:40-48` (das rein wiederholende SVG ist gestrichen), MINOR
`:51-53` (drei kuratierte Presets „Beispiel 9.5.4", „B = I", „A = I" neben den
zwölf Zahlenfeldern).

**Rationale:** Ein Verdikt, das über alle Zustände wörtlich identisch ist, ist
nach Muster 6 kein Verdikt – und eine Prüfung, die nicht scheitern kann, ist
keine Prüfung. Der zweite Knopf macht aus der Identität eine Behauptung, die man
widerlegen können muss und die standhält.

---

## Entscheidung nötig

- **`S93Kovarianz.tsx:25-51` — SeparierbareKovarianzDemo: STATIC.** Der Review
  empfiehlt entweder eine kuratierte Dreizeilen-Tabelle im Fließtext (dann ist
  das Widget entbehrlich) oder einen log-Plot beider Parameterzahlen über mn mit
  dem aktuellen Punkt als Marke. Beides ist eine Editorial- bzw.
  Neubau-Entscheidung und wurde nicht ausgeführt; die beiden
  Accessibility-/Verdikt-Befunde desselben Widgets sind unabhängig davon gefixt.
- **`S92Scheiben.tsx:93-144` — Kastenhöhe des ZahlenTensors.** Der Kasten ist bei
  1300 px rund 1250 px hoch (4 Matrizen, 3D-Fläche, drei Regler, Legende,
  Verdikt). Der Review schlägt vor, die 3D-Fläche in eine Vertiefung zu setzen
  oder zu streichen – eine Streichungsentscheidung, deshalb offen gelassen.
- **H4-Lücke:** §9.1, §9.3, §9.4 und §9.5 schließen ohne widgetgebundene
  Selbsttestfrage (schwächste Abdeckung im Prüfumfang). Vier neue Quizfragen sind
  eine inhaltliche Erweiterung, kein Fix; im Review stehen Vorschläge.

## lib-Befund

Keiner. `src/lib` wurde nicht angefasst; `W_BUTTON` / `W_BUTTON_AKTIV` werden aus
`../../../lib` importiert (bereits exportiert).

## Wortzahl-Delta (Ziel ≤ +3 %)

S91 ±0 % (die Bemerkung wurde verschoben, nicht ergänzt) · S92 ±0 % ·
S93 ±0 % · S94 ±0 % · S95 ±0 %. Alle Kapitel-9-Fixes liegen im TSX.

## Browser-Nachweis (Dev-Server 4183, CDP 9333)

- 8 Kästen bei 1300 px und 390 px; kein Element ragt in einem der beiden Fälle
  über seinen Kasten hinaus.
- Kasten 1: Die Bemerkung „Das Vierfache, geometrisch gelesen" liegt jetzt
  nachweislich **nach** dem Kasten (DOM-Position geprüft), das Wort „viermal"
  kommt im Kasten nicht mehr vor; nach dem Auflösen liefern die beiden
  Modusknöpfe die Verdikte „f(2x,2y) = 24,00 = 4·f(x,y)" und
  „f(2x,y) = 12,00 = 2·f(x,y)" und tragen die Aktiv-Klasse.
- Kasten 2: k = 1/2/3/4 liefern vier verschiedene Verdikte (ohne Struktur,
  konstante dritte Zeile, symmetrisch, Ausreißer); der Stapel trägt
  `role="group"`.
- Kasten 3: bei 390 px liegen die vier Tafeln als 2 × 2 (x-Bereiche 37–184 und
  192–338, zwei Zeilen), alle innerhalb des Viewports; die beiden Regler „Zeile i"
  und „Spalte j" sind vorhanden und ändern das Verdikt („Pixel (6, 2) – Zeile,
  dann Spalte, wie bei Iᵢⱼₖ – entsteht aus (162, 215, 12)").
- Kasten 4: Preset „x im Kern" liefert „wᵀx = 0 exakt"; v = (0,1; 0) liefert
  „weiterhin Rang 1"; v = 0 liefert „ist der Nullvektor".
- Kasten 5: die drei Presets liefern drei verschiedene Verdikte.
- Kasten 6: das `role="img"` auf dem Kartencontainer ist weg.
- Kasten 7: die drei Preset-Knöpfe sind da; „Ebene" liefert den c₂₂-=-0-Zweig,
  „nur der gemischte Anteil" den Vorzeichen-Zweig.
- Kasten 8: „Bᵀ ⊗_K A" liefert „Die vier Einträge stimmen überein",
  „A ⊗_K Bᵀ" liefert „Die beiden Seiten weichen um 17,0000 ab"; C = A X B wird
  angezeigt.
