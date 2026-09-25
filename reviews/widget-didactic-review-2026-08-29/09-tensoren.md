# Kapitel 9 — Tensoren & Tensorprodukte: Widget-Review (2026-08-29)

Nenner aus dem Quellbaum: **7 Widget-Dateien** mit **8 gerenderten Widgets**
(`S92Scheiben.tsx` exportiert über die Prop `bild` zwei verschiedene Widgets)
in **8 `:::interaktiv`-Kästen** über 5 MDX-Abschnitte. Beide Pässe gefahren:
volle Quelltextlektüre und ein eigener CDP-Render-Pass bei 1300 px und 390 px
mit der Pflicht-Sequenz (Regler min/kritisch/max, jeder Preset, Schätzfrage vor
und nach dem Aufdecken, Drag- und Klick-Extreme, Matrixeingaben).

Das Kapitel ist nach der Nutzerkritik neu gebaut worden, und das sieht man:
**alle sieben Dateien zitieren ein committetes Prüfskript unter
`scripts/verify/KAP09/`, alle sechs zitierten Dateien existieren und laufen in
`npm run verify:numbers`.** Das ist der einzige Teil des Prüfumfangs, in dem F1
erfüllt ist – Kapitel 7 und 8 haben durchweg „historische Notizen" oder tote
Pfade. Ebenso gelungen: die MDX-Rahmung. Sieben von acht Kästen stellen die
Frage *vor* dem Widget und schließen mit einer inhaltlichen Konsolidierung
*im* Kasten (A1/A4) – das Muster, das Kapitel 7 achtmal und Kapitel 8 fünfmal
verfehlt.

Kein horizontaler Seitenüberlauf bei 1300 px. Bei 390 px ragt genau ein
Element über den Viewport (`S92Scheiben` FarbBild, siehe dort).

---

## S91Bilinear.tsx (§9.1 Multilineare Abbildungen)

**BilinearitaetsDemo** — KEEP — `Schaetzfrage` mit drei Optionen, Vergleichs-
rechteck erst nach dem Tipp, ziehbare Ecke plus zwei Regler, exakt erreichbarer
Entartungsfall; im Render alle vier Zustände durchgefahren.

- [MAJOR] `src/chapters/09-tensoren/S91.mdx:140-147` — Die `bemerkung`
  unmittelbar **vor** dem Kasten gibt die Antwort der Schätzfrage: „Der Faktor
  **4** braucht keine Rechnung. Verdoppeln wir beide Seiten, passt das alte
  Rechteck **viermal** in das neue". Die Schätzfrage im Kasten darunter
  (S91.mdx:148-152) fragt genau das (C7). Fix: die Bemerkung hinter den
  Kasten stellen; sie liest sich dort als Erklärung der Auflösung mindestens
  so gut.
- [MAJOR] `src/chapters/09-tensoren/widgets/S91Bilinear.tsx:92-93` — Die
  beiden Modus-Knöpfe tragen nur `className="rounded px-3 py-1 text-sm"`:
  kein Rand, kein Hintergrund, kein sichtbarer Aktivzustand. Im Render (1300 px
  und 390 px) stehen dort zwei nackte Textstücke „Beide Seiten verdoppeln
  y festhalten"; welcher Modus gerade gilt, ist nur an `aria-pressed`
  ablesbar, also für sehende Leser gar nicht (E3/G3/C3). Fix: `W_BUTTON` /
  `W_BUTTON_AKTIV` aus `surface.ts` verwenden wie die übrigen Widgets des
  Kapitels.
- [MINOR] `src/chapters/09-tensoren/widgets/S91Bilinear.tsx:83` — Die
  y-Beschriftung sitzt bei `x = px(0) − 10 = 22` mit `textAnchor="end"` und
  wird links abgeschnitten; im Render steht dort „= 2,0" statt „y = 2,0"
  (G6). Fix: `PAD` auf ≥ 44 erhöhen oder Label über die Achse setzen.
- [MINOR] `src/chapters/09-tensoren/widgets/S91Bilinear.tsx:64-69` — Nur die
  x-Achse trägt Ticks; die y-Achse hat keine, obwohl die Aussage
  (Fläche = x·y) quantitativ ist (B3).
- [MINOR] `src/chapters/09-tensoren/widgets/S91Bilinear.tsx:96` — Der Zweig
  „gemeinsam" bekommt `kind="fail"` (rotes ✗). Es scheitert aber nichts: der
  Faktor 4 ist die korrekte, erwartete Aussage über Bilinearität. Fix:
  `"warn"` oder `"neutral"`.
- [NOTE] `src/chapters/09-tensoren/widgets/S91Bilinear.tsx:39` — `entartet =
  flaeche < 1e-8` mit Regler-Schritt 0,1: x = 0 bzw. y = 0 sind exakt
  erreichbar, der nächste Zustand liegt bei 0,1·y. Die Schwelle trennt also
  wirklich exakt, und der Verdikt-Zweig erklärt den Fall („einen
  Skalierungsfaktor können wir dort nicht ablesen"). Richtig gelöst.
- [MINOR] `scripts/verify/KAP09/s91-bilinear.mjs:3-8` — F6/F8: Das Skript
  existiert und wird ausgeführt, rechnet aber nur mit Literalen
  (`assert.equal(3*2, 6)`); es berührt den Code des Widgets nicht. Eine
  Änderung an `vergroessertX`/`vergroessertY` (Zeile 36-38) würde das Skript
  nicht zum Scheitern bringen. Fix: die beiden Skalierungsformeln aus dem
  Widget spiegeln und gegen 12 bzw. 24 assertieren – das ist genau die
  Behauptung der Verdikte.

---

## S92Scheiben.tsx, `<TensorScheibenViewer />` (§9.2 Ein Stufe-3-Tensor)

**ZahlenTensor** — REVISE — Aufgefächerter Stapel mit klickbaren Scheiben,
Regler als Doppelpfad, Höhenfeld daneben; die Darstellung trägt, das Verdikt
nicht.

- [MAJOR] `src/chapters/09-tensoren/widgets/S92Scheiben.tsx:139-143` — Der
  Verdikt-Zweig für k ≥ 2 lautet in allen drei Fällen wörtlich gleich, nur die
  Zahl wechselt: „Für k = 2/3/4 wechselt nicht nur das Etikett: Das Höhenfeld
  übernimmt genau die 2./3./4. Matrixscheibe." Im Render bestätigt. Ein
  Verdikt, das für alle Zustände dasselbe sagt, trägt keine Einsicht (D1).
  Die vier Scheiben sind auch nicht didaktisch unterschieden – es sind vier
  gleichartige Zufallszahlenblöcke (C4). Fix: eine Scheibe so wählen, dass
  sie etwas zeigt (z. B. eine mit konstanter Zeile, eine schiefsymmetrische,
  eine mit einem Ausreißer) und die Verdikte daran aufhängen; oder das Widget
  auf eine Scheibe und die Frage „wo steckt der dritte Index?" reduzieren.
- [MINOR] `src/chapters/09-tensoren/widgets/S92Scheiben.tsx:107` +
  `:111` — Das SVG trägt `role="img"`, enthält aber vier klickbare
  `<g onClick>`-Gruppen. `role="img"` macht den Teilbaum für Hilfsmittel zum
  Blatt und verdeckt die Ziele (G3). Der Tastaturpfad ist über den Regler
  „Scheibe k" gesichert, der Befund bleibt formal. Fix: `role="group"`.
- [MINOR] `src/chapters/09-tensoren/widgets/S92Scheiben.tsx:104-144` — Der
  Kasten ist im Render bei 1300 px 1364 px hoch (zwei Bildschirmhöhen bei
  390 px: 2 Teilschüsse nötig): 4 Matrizen à 16 Zahlen, eine 3D-Fläche, ein
  Regler, zwei Sichtregler, Legende, Verdikt. Für „welche Matrix gehört zu
  k?" ist das viel Apparat (Ladder, Muster 11). Fix: die 3D-Fläche in eine
  Vertiefung oder ganz streichen – die Matrixtafel allein zeigt die Einsicht.
- [NOTE] `scripts/verify/KAP09/s92-scheiben.mjs` deckt die Zahl 64 aus dem
  Selbsttest (S92.mdx:421) und die RGB-Bereiche ab; die Formate werden
  assertiert. Die Kanalformel `(i·29 + j·17 + k·53) % 256` wird nur auf ihren
  Wertebereich geprüft, kein im Verdikt behaupteter Wert (F8, dünn, aber
  keine falsche Behauptung).

**FarbBild** — REVISE — Die Nebeneinanderstellung der drei Kanäle plus RGB-Bild
ist genau die richtige Antwort auf die Nutzerkritik; sie funktioniert nur auf
großen Schirmen und nur mit der Maus.

- [MAJOR] `src/chapters/09-tensoren/widgets/S92Scheiben.tsx:160` — Das SVG
  trägt `min-w-[610px]` in einem `overflow-x-auto`-Container. Bei 390 px sind
  im Render **nur der Rot- und der halbe Grün-Kanal sichtbar**; der Blaukanal
  ist angeschnitten, das zusammengesetzte RGB-Bild liegt vollständig außerhalb
  des Bildschirms. Damit ist die eine Einsicht des Widgets („drei Scheiben,
  ein Bild") auf dem Handy nicht sichtbar (G1/G6). Fix: bei schmaler Breite
  die vier Tafeln 2 × 2 statt 1 × 4 anordnen (`sm:`-Breakpoint), oder die
  Kanäle stapeln und das RGB-Bild oben halten.
- [MAJOR] `src/chapters/09-tensoren/widgets/S92Scheiben.tsx:160-166` — Der
  Pixel lässt sich **nur** durch Klick auf eine Zelle wählen: kein Regler,
  kein Zahlenfeld, kein fokussierbares Element (im Render gemessen: 192
  klickbare `<g>`, 0 fokussierbare Elemente im SVG). Verstoß gegen die harte
  Doppelpfad-Regel und gegen G3 (der Tastaturpfad vollendet die Aufgabe
  nicht). Fix: zwei kleine Regler „Zeile i" / „Spalte j" unter die Tafel.
- [MINOR] `src/chapters/09-tensoren/widgets/S92Scheiben.tsx:188-189` — Der
  Verdikt nennt den Pixel als `(pixel[1]+1, pixel[0]+1)`, also
  (Spalte, Zeile); im Render steht „Pixel (5, 4)" für i = 3, j = 4. §9.2
  nummeriert Tensoreinträge durchgehend als $\bI_{i,j,k}$ mit i = Zeile
  (S92.mdx:295-300). Fix: (Zeile, Spalte) in derselben Reihenfolge wie im
  Text.
- [NOTE] Die Kanalwerte kommen aus einer geschlossenen Formel, nicht aus
  `Math.random` – deterministisch und im Prüfskript auf [0, 255] geprüft (F2/F4).

---

## S93RangEins.tsx (§9.3 Eine Rang-1-Matrix und was sie tut)

**RangEinsExplorer** — KEEP — Das am sorgfältigsten gebaute Widget des
Kapitels: zwei benannte Rechenschritte als Karten, ziehbares x mit
Reglerpaar, zwei Presets, die genau die Fallunterscheidung sind, und v/w
hinter einem `<details>`, von dem nichts Sichtbares abhängt (A8 sauber).

- [MAJOR] `src/chapters/09-tensoren/widgets/S93RangEins.tsx:88` + `:221-222` —
  `kernTreffer = |wᵀx| < 0.08`, und der Zweig behauptet dann
  „2. Auf v ablegen: **Ax = 0 · v = 0**. Genau deshalb gehört x zum Kern."
  Über die Regler (Schritt 0,1) trennt die Schwelle noch sauber, über den
  **Ziehgriff** – der laut Aufgabe (Zeile 109) das Primärmittel ist – nicht:
  bei wᵀx = 0,05 zeigt die Karte darüber „Ax = 0,05 · v = (0,05; 0,05)ᵀ",
  während das Verdikt Ax = 0 behauptet. Der exakte Fall ist über den
  Preset „x im Kern" und über x₁ = 0 exakt erreichbar. Fix: drei Zustände –
  `skalar === 0` exakt, |skalar| < 0,08 als „fast im Kern: Ax ist schon sehr
  kurz, aber nicht null", sonst.
- [MAJOR] `src/chapters/09-tensoren/widgets/S93RangEins.tsx:87` + `:219-220` —
  `rangEins = norm(v) > 0.12 && norm(w) > 0.12`; darunter sagt das Verdikt
  „Mindestens einer der Faktoren ist **der Nullvektor**: A ist dann die
  **Nullmatrix** und keine Rang-1-Matrix." Im Render mit v = (0,1; 0)
  bestätigt: v ist nicht der Nullvektor, A = ((0,1 0),(0,1 0)) ist nicht die
  Nullmatrix und hat sehr wohl Rang 1. Die Nullvektoren sind über die Regler
  exakt erreichbar (Schritt 0,1). Fix: `norm(v) === 0 || norm(w) === 0` für
  den exakten Fall; für 0 < ‖v‖ < 0,12 ein eigener Text („v ist sehr kurz, A
  hat weiterhin Rang 1, aber das Bild ist im Maßstab kaum zu sehen").
- [NOTE] `scripts/verify/KAP09/s93-rang-eins.mjs` assertiert A = ((1,0),(1,0)),
  Ax für den Standard- und den Kernfall sowie det A = 0 – deckt genau die im
  Header und im Verdikt behaupteten Zahlen ab (F1/F8 erfüllt).
- [NOTE] `src/chapters/09-tensoren/widgets/S93RangEins.tsx:31-34` +
  `:178-186` — Läuft Ax aus dem Fenster, wird der Pfeil auf den Rand geklemmt
  und die Marke auf „Ax (außerhalb)" umgestellt. Sauber gelöste Randlage.
- [MINOR] `src/chapters/09-tensoren/S93.mdx:90-91` — Im Kasten steht vor dem
  Widget kein Satz; die Frage lebt im Absatz davor (S93.mdx:88). Formal A5,
  praktisch unkritisch, weil der Absatz direkt anschließt.

---

## S93Kronecker.tsx (§9.3 Das Kroneckerprodukt)

**KroneckerRechner** — REVISE — Die Blockdarstellung mit rotem Trennkreuz ist
gut gewählt; die Aufgabe verspricht jedoch etwas, das das Widget nicht zeigt,
und die drei Presets ändern das Verdikt nicht.

- [MAJOR] `src/chapters/09-tensoren/widgets/S93Kronecker.tsx:58` — Die Aufgabe
  lautet „Welche Blockmatrix wirkt **auf vec(X)**?", und der Verdikt behauptet
  „bildet Bᵀ ⊗_K A die gestapelten Spalten von X genau zu vec(AXB) ab". Im
  Widget kommen weder X noch vec(X) noch vec(AXB) vor – zu sehen sind nur A,
  Bᵀ und das Produkt. Die gestellte Aufgabe ist mit den angebotenen Controls
  nicht durchführbar (C8/A7). Fix: entweder ein festes X mit vec(X) daneben
  einblenden (dann ist das Widget die Vorstufe zu S95) oder die Aufgabe auf
  das reduzieren, was zu sehen ist: „Wo landen die Einträge von Bᵀ, wo die
  Blöcke von A, und was ändert die Vertauschung?".
- [MAJOR] `src/chapters/09-tensoren/widgets/S93Kronecker.tsx:76-80` — Der
  Verdikt hängt ausschließlich an `vertauscht`. Im Render liefern alle drei
  Presets („Vektorisierung", „Diagonale Faktoren", „Gemischte Vorzeichen")
  denselben Text; die Presets sind damit keine Fallunterscheidung, sondern
  drei Zahlenbeispiele (C4/D1). Fix: Presets so wählen und kommentieren, dass
  sie etwas trennen – z. B. „A = I: B wirkt blockweise", „B = I:
  A wiederholt sich diagonal", „beide voll besetzt" – und je einen
  Verdikt-Zweig geben.
- [MINOR] `src/chapters/09-tensoren/widgets/S93Kronecker.tsx:68-74` — Der
  aktive Preset wird nur über die Randfarbe markiert; ohne Hintergrund oder
  Zeichen ist der Zustand allein farbcodiert (E3). Fix: `W_BUTTON_AKTIV`.
- [MINOR] `src/chapters/09-tensoren/widgets/S93Kronecker.tsx:35-37` — Die
  Blockeinfärbung rechnet mit `Math.floor(i/2)`, gilt also nur für
  2 × 2-Faktoren; alle Presets sind 2 × 2, das Widget ist damit nicht auf
  andere Formate erweiterbar (F7, Hinweis).
- [NOTE] `scripts/verify/KAP09/kronecker-vektorisierung.mjs:47-50` assertiert
  die Permutationsähnlichkeit P(A⊗B)Pᵀ = B⊗A, also genau die Aussage des
  „vertauscht"-Verdikts. F1/F8 erfüllt.

---

## S93Kovarianz.tsx (§9.3 Anwendung: separierbare Kovarianz)

**SeparierbareKovarianzDemo** — STATIC — Zwei Zahlen, zwei Regler; die
Einsicht („separierbar spart quadratisch") ist eine Tabelle oder eine Kurve,
keine Interaktion.

- [MAJOR] `src/chapters/09-tensoren/widgets/S93Kovarianz.tsx:28` — Auf dem
  `<div>`, das **beide Zahlenkarten** enthält, steht `role="img"` mit einem
  einzigen `aria-label`. Damit ersetzt der Satz „Vergleich einer allgemeinen
  und einer separierbaren Kovarianzmatrix" den gesamten quantitativen Inhalt:
  Parameterzahl, Speicherzahl und Dimension sind für Hilfsmittel nicht mehr
  erreichbar (G3). `role="img"` gehört auf *statische Grafiken*, nicht auf
  Textcontainer. Fix: `role` entfernen; die Zahlen sind bereits Text.
- [MAJOR] `src/chapters/09-tensoren/widgets/S93Kovarianz.tsx:25-51` — Ladder
  (Muster 11): Das Widget zeigt in jedem Zustand genau zwei Zahlen und einen
  Prozentsatz. Der eigentliche Punkt – dass die eine Kurve quadratisch, die
  andere linear in mn wächst – ist nirgends gezeichnet; der Leser muss ihn
  aus zwei Momentaufnahmen erschließen, und das Verdikt behauptet ihn nur
  („Mit wachsendem Gitter wächst der Vorteil quadratisch"). Fix: entweder
  eine kuratierte Tabelle mit drei Zeilen (m×n = 4, 500, 2500) im Fließtext –
  dann ist das Widget entbehrlich – oder ein log-Plot beider Parameterzahlen
  über mn mit dem aktuellen Punkt als Marke. Letzteres macht das Widget
  wieder tragfähig.
- [MINOR] `src/chapters/09-tensoren/widgets/S93Kovarianz.tsx:30` — „Σ ∈
  ℝ^{dimension}×{dimension}" wird als Klartext gesetzt und erscheint im
  Render als „Σ ∈ ℝ^500×500"; die Hochstellung fehlt, das Kapitel setzt
  solche Angaben sonst per MathJax (E5).
- [MINOR] `src/chapters/09-tensoren/widgets/S93Kovarianz.tsx:46` — Die
  Schwelle `dimension >= 100` trennt zwei Verdikt-Zweige, die dasselbe sagen
  (einmal mit Sparquote, einmal ohne). D1: der Unterschied ist rhetorisch,
  nicht mathematisch.
- [NOTE] `scripts/verify/KAP09/s93-kovarianz.mjs` assertiert alle vier im
  Header behaupteten Zahlen (125 250 / 1 330 / 250 000 / 2 600) für die
  Voreinstellung m = 10, n = 50 – vorbildlich, weil die Voreinstellung genau
  der geprüfte Fall ist.

---

## S94Tensorbasis.tsx (§9.4 Tensorproduktbasen für Funktionen)

**TensorbasisExplorer** — KEEP — Zwei verknüpfte Darstellungen desselben
Zustands (Höhenlinientafel und Fläche, derselbe orange Punkt), Doppelpfad für
alles, sechs Regler als Abschluss-Sandkasten am richtigen Ort (Muster 9).

- [MINOR] `src/chapters/09-tensoren/widgets/S94Tensorbasis.tsx:83-88` — Sechs
  Regler, kein einziger Preset. Die Fallunterscheidung des Abschnitts (reine
  Ebene / gekoppelt / nur gemischter Anteil) ist nicht anklickbar (C4). Fix:
  drei Knöpfe „Ebene (c₂₂ = 0)", „nur der gemischte Anteil (c₁₁ = c₂₁ =
  c₁₂ = 0)", „Beispiel 2 + 3x − y + 5xy".
- [MINOR] `src/chapters/09-tensoren/widgets/S94Tensorbasis.tsx:91-95` — Der
  Zweig für c₂₂ ≠ 0 liest sich für alle Werte gleich (nur die Zahlen
  wechseln); Vorzeichen und Betrag von c₂₂ ändern die Fläche sichtbar, das
  Verdikt sagt dazu nichts (D1). Fix: Vorzeichen aufnehmen („positives c₂₂
  hebt die Ecke (1,1), negatives senkt sie").
- [NOTE] `src/chapters/09-tensoren/widgets/S94Tensorbasis.tsx:48` — Bei allen
  vier Koeffizienten auf 0 wird `zDom` künstlich auf [lo−1, hi+1] gespreizt;
  im Render bleibt die Fläche flach und der Verdikt korrekt. Entartungsfall
  sauber abgefangen (F3).
- [NOTE] `scripts/verify/KAP09/s94-tensorbasis.mjs` assertiert die vier
  Eckwerte 2, 5, 1, 9 und den gemischten Koeffizienten 5 der Voreinstellung
  (F1/F8 erfüllt).
- [NOTE] Farbrollen: Der Header dokumentiert violett für Funktionswerte,
  orange für den gewählten Punkt. Der Bauauftrag (KONVENTIONEN „KAPITEL 9")
  reserviert Orange für Produkt-Einträge; hier gibt es keine, die Umwidmung
  ist dokumentiert und innerhalb der Tafel eindeutig. Kein Drift-Befund.
- [MINOR] `src/chapters/09-tensoren/widgets/S94Tensorbasis.tsx:73` — Die
  Niveaubeschriftungen stehen als vier Zahlen untereinander am rechten Rand
  (x = 252), nicht an den Linien. Bei 390 px ist die Zuordnung
  Zahl → Höhenlinie nicht herstellbar (B3/G6). Fix: Beschriftung am
  Linienende oder eine kleine Farbskala.

---

## S95Vektorisierung.tsx (§9.5 Zusammenfassung: der vec-Trick)

**VektorisierungMatrixgleichung** — REVISE — Die Rechnung ist korrekt und das
zugehörige Prüfskript ist das beste im ganzen Prüfumfang; das Widget selbst
kann aber nie etwas anderes sagen als „stimmt".

- [MAJOR] `src/chapters/09-tensoren/widgets/S95Vektorisierung.tsx:31` +
  `:58-62` — `stimmt` vergleicht zwei Rechenwege derselben Identität und ist
  deshalb **immer wahr**; der `fail`-Zweig („Das wäre ein Gegenbeispiel zu
  Satz 9.5.3") kann nicht eintreten. Im Render mit geänderten A-, X- und
  B-Einträgen bestätigt: der Verdikt ist über alle Zustände wörtlich
  identisch. Ein Verdikt ohne Zustandsklassen ist nach Muster 6 kein Verdikt
  (D1), und die Aufgabe „prüfen wir die beiden Vektoren Eintrag für Eintrag"
  (Zeile 34) sowie die Kastenfrage „Welche der beiden Rechnungen liefert
  denselben Vektor?" (S95.mdx:140) versprechen eine Prüfung, die nicht
  scheitern kann (F6-Geist, F8). Fix: einen dritten Knopf „falsche
  Reihenfolge: A ⊗_K Bᵀ" anbieten. Dann trennt der Verdikt echte Fälle, der
  `fail`-Zweig wird erreichbar, und die Kastenfrage bekommt eine Antwort, die
  man finden muss.
- [MINOR] `src/chapters/09-tensoren/widgets/S95Vektorisierung.tsx:37-48` —
  Weder C = AXB noch X selbst werden als Matrix angezeigt, obwohl der Verdikt
  von „vec(C)" spricht (A7). Fix: C daneben ausgeben; die
  Matrix-Eingabefelder für X stehen ohnehin darunter.
- [MINOR] `src/chapters/09-tensoren/widgets/S95Vektorisierung.tsx:40-48` — Das
  kleine SVG („A X B = C → (Bᵀ ⊗_K A) vec(X)") wiederholt nur die Formel, die
  drei Zeilen darüber schon als Überschriften der beiden Vektoren steht; es
  trägt keine eigene Information (E2). Fix: streichen oder durch eine
  Skizze ersetzen, die zeigt, *wie* die Spalten von X gestapelt werden.
- [MINOR] `src/chapters/09-tensoren/widgets/S95Vektorisierung.tsx:51-53` — Die
  einzige Eingabe sind zwölf Zahlenfelder (C1: höchste Interaktionsbarriere),
  ohne kuratierte Presets. Fix: zwei bis drei Knöpfe („B = I", „A = I",
  „Beispiel 9.5.4") wie im Kronecker-Rechner.
- [NOTE] `scripts/verify/KAP09/kronecker-vektorisierung.mjs:28-40` — 24
  geseedete Zufallsfälle vergleichen `vec(AXB)` mit `(Bᵀ⊗A)vec(X)` über zwei
  strukturell verschiedene Rechenwege, dazu das Beispiel 9.5.4 gegen das
  Literal [5, 2, 17, 8]. Das ist der einzige widerlegbare, wirklich
  aussagekräftige Test im gesamten Prüfumfang und sollte als Vorlage für
  Kapitel 7 und 8 dienen.

---

## Kapitel-Fazit (H1–H6)

**H1 Widget-Dichte.** 8 Widgets auf 5 Abschnitte: §9.1 eines, §9.2 zwei,
§9.3 drei, §9.4 eines, §9.5 eines. §9.3 ist mit drei Kästen (Rang-1,
Kronecker, Kovarianz) am dichtesten, hängt sie aber an drei verschiedene
Unterabschnitte. Kein Widget steckt in einer Vertiefung – alle acht Kästen
sind offen, kein A8-Verstoß im Kapitel.

**H2 Dramaturgie.** Sauber aufgebaut: Bilinearität am Rechteck (eine
Mechanik), Tensor als Zahlenstapel und als Bild (Darstellung), dann die
Produkte einzeln (äußeres, Kronecker, Anwendung), dann der Funktionenraum,
zum Schluss vec als Zusammenführung. Der Sandkasten (`TensorbasisExplorer`,
sechs Regler) steht korrekt spät.

**H3 Farbrollen.** Der Bauauftrag (KONVENTIONEN „KAPITEL 9": erster Faktor
blau, zweiter grün, Produkt-Einträge orange, Warnungen rot) wird in allen
sieben Headern zitiert und im Code eingehalten; die beiden Abweichungen
(RGB-Kanalfarben in S92, violett für Funktionswerte in S94) sind sachlich
zwingend bzw. dokumentiert. Kein Farbdrift-Befund. Auch die
Notations-Nachtrag-Regel (`⊗_K` als Klartext in Widget-Labels) ist
durchgehend befolgt.

**H4 Selbsttest-Abdeckung.** Fünf Abschnitte, fünf Quizblöcke. Widgetgebunden
ist genau eine Frage (S92.mdx:421, „64 Einträge"). §9.1, §9.3, §9.4 und §9.5
schließen ohne Frage, die das Widget verlangt – die schwächste Abdeckung im
Prüfumfang. Fix: je eine Frage, die nur am Widget zu beantworten ist
(z. B. „Welchen Wert zeigt der Rang-1-Explorer für wᵀx, wenn x auf der
gestrichelten Kernrichtung liegt?", „Wie viele freie Parameter zeigt die
Kovarianz-Demo bei 50 Orten und 50 Zeitpunkten?").

**H5 Ältere Generation.** Alle sieben Dateien sind Neubau und nutzen die
aktuellen Bausteine (`Aufgabe`, `Verdikt`, `Slider`, `useDrag`, `Surface3D`,
`Schaetzfrage`, `MatrixInput`). Kein Altlastenbefund.

**H6 Länge.** Angemessen: sieben von acht Kästen schließen mit zwei bis drei
inhaltlichen Sätzen; keine Wiederholung derselben Warnung in Prosa, Aufgabe,
Verdikt und Abschluss. Die Konsolidierungen sagen etwas über die Sache, nicht
über das Widget – das Gegenteil des Kapitel-7-Musters.

### Die drei wichtigsten Muster

1. **Toleranzschwelle als Gleichheit im Verdikt** – zweimal in
   `S93RangEins.tsx` (Kern bei |wᵀx| < 0,08, Nullmatrix bei ‖v‖ < 0,12),
   beide Male mit einem Readout im selben Kasten, das den Satz widerlegt, und
   beide Male mit einem exakt erreichbaren Zustand daneben. Kapitel 9 ist
   sonst frei davon; die Drei-Zustands-Regel ist hier mit wenigen Zeilen
   herzustellen.
2. **Verdikte ohne Zustandsklassen** – `S92Scheiben`/ZahlenTensor (vier
   gleichlautende Zweige), `S93Kronecker` (drei Presets, ein Text),
   `S95Vektorisierung` (ein einziger erreichbarer Zweig). In allen drei Fällen
   fehlt nicht die Grafik, sondern die *Fallunterscheidung*: die Presets sind
   Zahlenbeispiele statt Argumente (Muster 5).
3. **Interaktion ohne Doppelpfad und ohne Handybreite** – das RGB-Widget
   (`S92Scheiben.tsx:160-166`) ist klick-only und bei 390 px zu zwei Dritteln
   außerhalb des Bildschirms; die Modusknöpfe in `S91Bilinear.tsx:92-93` sind
   ohne sichtbaren Zustand. Beides sind Befunde, die nur der Render-Pass
   findet.

### Was gut ist und Schule machen sollte

- **F1/F6 ist in diesem Kapitel gelöst.** Alle sieben Header zitieren einen
  existierenden, ausgeführten Prüfpfad unter `scripts/verify/KAP09/`; die
  Skripte assertieren mehrheitlich genau die Zahlen, die in Verdikten,
  Presets und Selbsttests behauptet werden. `kronecker-vektorisierung.mjs`
  mit 24 geseedeten Fällen über zwei unabhängige Rechenwege ist der Maßstab.
- **Die MDX-Rahmung** (Frage vor dem Widget, inhaltliche Konsolidierung im
  Kasten) ist in sieben von acht Kästen erfüllt – das Muster, an dem Kapitel 7
  und 8 scheitern.
- **`S93RangEins`** trennt die beiden Rechenschritte von A = vwᵀ in zwei
  benannte Karten („1 · Messen", „2 · Auf v ablegen") und macht damit sichtbar,
  *warum* w⊥ der Kern ist – das ist echte Erklärungsarbeit und nicht bloß
  Visualisierung. Dass v und w hinter einem `<details>` liegen, hält den
  Hauptpfad kurz, ohne dass Sichtbares davon abhängt.
- **`S91Bilinear`** ist das einzige Widget im Kapitel mit
  predict-then-reveal, und die Vergleichsfläche erscheint tatsächlich erst
  nach dem Tipp – die technische Umsetzung ist korrekt, nur die Prosa davor
  verrät die Antwort.
