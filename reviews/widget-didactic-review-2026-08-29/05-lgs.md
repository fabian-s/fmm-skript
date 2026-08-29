# Kapitel 5 (05-lgs) — Widget-Didaktik-Review, 2026-08-29

Nenner: 8 Widget-Dateien in `src/chapters/05-lgs/widgets/` plus `shared.tsx`
(Bausteine ohne eigenes Widget); 8 `:::interaktiv`-Kästen in S52–S54.
S51 und S55 sind widgetfrei.

Render-Pass: eigene CDP-Läufe bei 1300 px und 390 px, je Widget eine
Zustandssequenz (Stepper vollständig durchfahren und zurück, jeder Preset,
Reglerextreme, Schätzfrage vor und nach dem Auflösen). Die Batch-Screenshots
unter `shots/05/` sind wie in Kapitel 4 nicht durchgesetzt (MathJax-Lazy-Load,
Artefakt des Aufnahmeskripts) — die Befunde beruhen auf eigenen Aufnahmen.

---

## Kapitelweiter Befund vorab (F1/F6)

- [MAJOR] `CholeskySampler.tsx:14`, `CholeskyStepper.tsx:16`, `LUKosten.tsx:11`,
  `LUStepper.tsx:14`, `PivotDemo.tsx:12`, `RueckSubStepper.tsx:15`,
  `SpdRichtung.tsx:8` — Alle sieben Widget-Header zitieren
  `verify-05-lgs/verify.mjs`. **Diesen Pfad gibt es im Repo nicht**
  (`find` über den ganzen Baum: kein Treffer). Das committete Kapitel-5-Skript
  heißt `scripts/verify/R3/widgets-05.mjs` und wird von `npm run verify:numbers`
  ausgeführt. Klassifikation für alle sieben: *Header ohne Zahlen-Nachweis*
  (schlechter als die „historische Notiz" in Kapitel 4, weil der Verweis
  Existenz suggeriert). Fix: Pfad korrigieren und die Deckung nachziehen —
  `widgets-05.mjs` prüft derzeit nur drei Dinge (x = (2;1;2), die
  LU-Kostenschwelle J = 2, q(π/4) = 0). Nicht abgedeckt sind: Cholesky-Faktor
  L = (2,0,0; 1,3,0; −1,1,2), L₂₂ = σ₂√(1−ρ²), die LU-Standardzerlegung, die
  Float64-Grenzen der Pivot-Demo, sämtliche Hilbert-Zahlen und die „9
  Operationen" aus `RueckSubStepper.tsx:15`.

---

## S52Hilbert.tsx — HilbertInverseVergleich (§5.2, Vertiefung „Kondition und Rechenweg")

L1 — REVISE — Rechnet ehrlich und mit vorsichtiger Sprache, ist aber eine
Zahlentafel ohne Bild und ohne Frage davor.

- [MAJOR] `src/chapters/05-lgs/widgets/S52Hilbert.tsx:8-10` — F1: Der Header
  führt als Nachweis „Node-Scratchpad (2026-08-26)" an. Sitzungs-Scratchpads
  sind ausdrücklich kein Beleg (Rubrik F1). Die dort genannten Werte
  (κ∞ = 1,2306·10¹⁵, Fehler 9,6588·10⁻³ bzw. 3,7311·10⁻¹) stehen wörtlich auch
  im Fließtext `S52.mdx:66-72`. Klassifikation: *Header ohne Zahlen-Nachweis*.
  Fix: `scripts/verify/…` mit derselben partiell pivotierten Elimination und
  hartkodierten Sollwerten.
- [MINOR] `src/chapters/05-lgs/S52.mdx:91-93` — A1: Der `:::interaktiv`-Kasten
  beginnt ohne Frage; auf die Kastenüberschrift folgt direkt
  `<HilbertInverseVergleich />`. Alle anderen sieben Kästen des Kapitels stellen
  vorher eine Frage. Fix: eine Zeile ergänzen, etwa „Ab welcher Ordnung trennen
  die Rundungsfehler die beiden Rechenwege sichtbar?".
- [MINOR] `S52Hilbert.tsx:84-91` — B1: Der Anfangszustand sind drei Zahlkacheln
  und ein Regler. Die eigentliche Aussage ist ein *Verlauf* über n; als
  Log-Plot (κ∞, Fehler direkt, Fehler über Inverse gegen n) wäre sie in einem
  Blick lesbar und der Regler bekäme einen Marker statt der einzigen Ansicht.
  In dieser Form ist das Widget nah an der STATIC-Grenze.
- [MINOR] `S52Hilbert.tsx:73-75` — `sci()` schreibt „2,70e1" / „6,66e−16". Der
  Rest des Skripts setzt große und kleine Zahlen als Mantisse · 10^Exponent
  (`fmtWiss` in `04-fehler/widgets/S41Widgets.tsx:70-77`). E5-Drift.
- [MINOR] `S52Hilbert.tsx:92-96` — Der Schwellwert `n >= 9` für den Wechsel von
  „neutral" auf „warn" ist nicht begründet und im Verdikt auch nicht benannt.
  Fix: an κ∞ koppeln (etwa κ∞ · ε ≳ 1) und den Grund nennen.
- [NOTE] Positiv: Der Text vermeidet konsequent „singulär" und schreibt
  stattdessen „stark empfindlich"; der neutrale Zweig gibt sogar zu, dass das
  Fehlerverhältnis nicht monoton wächst. Genau diese Ehrlichkeit ist gemeint.

## RueckSubStepper.tsx (§5.2, Kasten „Rückwärtseinsetzen Schritt für Schritt")

L2 — REVISE — Der Stepper ist sauber gebaut, startet aber im leeren Zustand
und hat für drei seiner vier Schritte kein Verdikt.

- [MAJOR] `src/chapters/05-lgs/widgets/RueckSubStepper.tsx:28` — B1/B2: `t = 0`
  ist die Voreinstellung. Der Anfangszustand (Rendershot) zeigt die
  erweiterte Matrix, eine x-Spalte aus drei Punkten, keine Protokollzeile und
  kein Verdikt — die tote Ansicht ist der Trivialfall. Fix: mit `t = 1`
  starten (erste Komponente steht, Formelzeile sichtbar) oder mit `t = maxT` und
  den Regler als Rückweg anbieten.
- [MAJOR] `RueckSubStepper.tsx:95-105` — D1: Ein Verdikt gibt es nur bei
  `shown === maxT`. In den Zwischenzuständen trägt allein die
  Stepper-Narration („1 von 3 Komponenten bekannt"), die den Zustand zählt,
  aber nicht deutet. Fix: pro Schritt einen Satz („Zeile 2 ist an der Reihe:
  x₃ ist bekannt, eingesetzt bleibt eine Gleichung in x₂ …"), wie es
  `LUStepper.tsx:145-194` bereits vormacht.
- [MINOR] `RueckSubStepper.tsx:104` — „benötigt hier drei Divisionen" ist eine
  feste Zahl im Verdikt. Sie stimmt, weil `MatrixInput` die Dimension nicht
  ändern kann (`src/lib/widgets/MatrixInput.tsx` bietet nur Zelleneingaben) —
  sauberer wäre trotzdem `trace.lines.length`.
- [MINOR] `src/chapters/05-lgs/widgets/shared.tsx:85` und
  `RueckSubStepper.tsx:96-101` — `Math.abs(U[i][i]) < 1e-12` wird als „Das
  Diagonalelement dieser Zeile ist 0" verkauft. Toleranz als Gleichheit; für den
  Abschnitt, der wenige Zeilen später vor *kleinen* Pivots warnt
  (`S52.mdx:147`), fehlt genau der mittlere Zustand („winzig, aber nicht null:
  die Division bläst den Fehler auf"). Fix: dritten Zweig ergänzen.
- [MINOR] `RueckSubStepper.tsx:81-86` — B3: Die farbigen Zellen (rot = Pivot,
  blau = aktuelle Zeile, grün = fertig) haben keine sichtbare Legende. Der
  Farbcode steht nur in `S52.mdx:135-138`, also außerhalb des Kastens, und im
  Print-Export fehlt er ganz.
- [NOTE] Die Zahlfrage `S52.mdx:162-166` („Wie viele Divisionen …?") ist
  widget-abhängig ✓, aber das Widget zeigt die Zahl nirgends an; sie muss aus
  dem Protokoll gezählt werden. Das ist als Aufgabe legitim, sollte aber in der
  Aufgabenzeile stehen.

## LUStepper.tsx — LUZerlegungStepper (§5.3, Kasten „LU-Zerlegung Schritt für Schritt")

L3 — KEEP — Das stärkste Widget des Kapitels: sechs Phasen, für jede eine
Erklärung, Fail-Zweig, L·U-Probe am Ende.

- [MINOR] `src/chapters/05-lgs/widgets/LUStepper.tsx:57-62` und `:232-238` —
  F3: `Math.abs(piv) < 1e-12` → „Auf dem Pivotplatz steht eine Null" und
  `doneX.failRow >= 0` → „Diese Matrix ist singulär". Beides ist eine Toleranz,
  als Gleichheit formuliert; ein „sehr kleines, aber von null verschiedenes
  Pivot" hat keinen eigenen Zweig, obwohl §5.3 genau davon handelt und
  `PivotDemo` es zwei Kästen später vorführt. Fix: dritte Stufe „|Pivot| winzig:
  der Multiplikator wird riesig — siehe die Pivot-Demo unten".
- [MINOR] `LUStepper.tsx:246` — `fmtNum` rundet auf drei Nachkommastellen, die
  Probe zeigt deshalb immer „max |A − L·U| = 0,000", auch wenn der Rest 4·10⁻⁴
  wäre. Eine Probe, die nicht scheitern kann, ist keine Probe. Fix:
  Exponentialdarstellung wie in `06-svd/widgets/S62Rechner.tsx:331`.
- [MINOR] `LUStepper.tsx:209` — Der Stepper zeigt „Schritt 5 von 5", die
  Narration darunter „Phase 6 von 6" (Rendershot). Zwei Zählungen für dasselbe.
- [NOTE] Farbrollen exakt nach KONVENTIONEN „KAPITEL 5" (Pivot rot, aktuelle
  Zeile/Multiplikator blau, L-Einträge grün) — und sie werden in den Phasentexten
  `:154-175` inline benannt. Das ist das Muster, das den anderen Steppern fehlt.
- [NOTE] `LUStepper.tsx:14` — Header zitiert den nicht existierenden Pfad
  (kapitelweiter Befund oben); die Standardzerlegung selbst ist in
  `widgets-05.mjs` nicht abgedeckt.

## PivotDemo.tsx — PivotVergleich (§5.3, Kasten „Kleine Pivots, große Fehler")

L4 — REVISE — Rechnet echtes float64 und erkennt die vollständige Auslöschung
korrekt über Float-Gleichheit; der Startzustand zeigt aber, dass nichts passiert.

- [MAJOR] `src/chapters/05-lgs/widgets/PivotDemo.tsx:27` — B2: Voreinstellung
  `e = -8`. Im Rendershot zeigen beide Tabellenzeilen x₁ = 1,0000 und
  x₂ = 1,0000; unterschieden sind nur die Fehlerspalten (6,08·10⁻⁹ gegen 0),
  und das Verdikt trägt einen grünen Haken („Der Eintrag a₂₂ = 1 hat die
  Subtraktion überstanden"). Die tote Ansicht behauptet also das Gegenteil des
  Kastentitels. Fix: mit e = −15 oder −16 starten (dort steht x₁ = 0,888 bzw.
  2,220 gegen 1,0000, der Effekt ist ohne Interaktion sichtbar).
- [MINOR] `PivotDemo.tsx:41-60` — B1: Der Anfangszustand ist eine
  Zweizeilentabelle. Der eigentliche Befund ist der *Verlauf* des Fehlers über
  ε (nachgerechnet: 8,9·10⁻¹⁶ / 1,1·10⁻¹³ / 6,1·10⁻⁹ / 1,3·10⁻⁴ / 1,1·10⁻¹ /
  1,0 bei e = −1/−4/−8/−12/−15/−17 ohne Tausch, durchgehend ≈ 0 mit Tausch).
  Als zwei Kurven über log₁₀ ε wäre das ein druckreifes Bild und der Regler
  bekäme einen Marker.
- [MINOR] `PivotDemo.tsx:1-12` — F7: Der Kopfkommentar ist zerrissen; Satz 4
  bricht mitten ab („… alle Texte") und die neuen Header-Zeilen („Einsicht:",
  „Farbrollen:", …) stehen darin. Fix: Kommentar neu setzen.
- [MINOR] `PivotDemo.tsx:47-53` — E3: Die Fehlerspalte codiert „gut/schlecht"
  allein über Rot bzw. Grün, ohne Zeichen. Das Verdikt darunter trägt zwar das
  Zeichen, die Tabelle selbst nicht.
- [MINOR] `src/lib/widgets/Slider.tsx:67` — Das Wertfeld ist auf `w-14` fixiert;
  der Text „ε = 1e-18" bricht darin auf zwei Zeilen um (Rendershot 1300 px und
  390 px). Betrifft in diesem Kapitel nur diesen Regler, gehört aber in die lib
  (breitere Zahlenspalte oder `fmt` kürzen).
- [NOTE] Positiv und ausdrücklich zu erhalten: `absorbed = u22 === -m`
  (`:44`) ist **kein** Toleranzvergleich, sondern eine echte
  Gleitkomma-Aussage („die Subtraktion hat die 1 restlos geschluckt"). Die
  Prosa-Zahlen in `S53.mdx:364-368` (vier Nachkommastellen bei ε = 10⁻¹²,
  vollständige Auslöschung ab ε ≈ 10⁻¹⁶) sind nachgerechnet korrekt — nur eben
  nicht durch ein Skript belegt.

## LUKosten.tsx — LUKostenPlot (§5.3, Kasten „Einmal zerlegen oder jedes Mal neu?")

L5 — REVISE — Richtige Kostenformeln und ein echter Side-by-side-Vergleich,
aber ein konstantes Verdikt, ein verratener Tipp und ein Plotfenster, das die
gefragte Stelle versteckt.

- [MAJOR] `src/chapters/05-lgs/widgets/LUKosten.tsx:108` — D1: Es gibt genau
  **ein** Verdikt für alle Zustände: „Bei J = {J} beträgt die Ersparnis aktuell
  X×; die Auflösung ordnet den Schwellenwert ein." Der Text echot den Readout
  darüber und nennt keinen mathematischen Grund. Fix: Zweige für J = 1
  (Gleichstand, weil n³/3 + n² = 1·(n³/3 + n²)), 2 ≤ J ≲ 5 (die Zerlegung ist
  amortisiert) und J ≫ n (die Ersparnis läuft gegen den Faktor
  (n³/3 + n²)/n² ≈ n/3).
- [MAJOR] `LUKosten.tsx:98-100` — C8/B2: Das Plotfenster ist `xDomain=[1, 500]`.
  Die Schätzfrage (`:83`) fragt nach der Schwelle J = 2 — die liegt im ersten
  Pixel der x-Achse und ist im Bild nicht auflösbar (Rendershot). Fix:
  `xDomain` an `J` koppeln oder eine zweite, hineingezoomte Tafel J ∈ [1, 10]
  danebenstellen (Muster 4).
- [MAJOR] `src/chapters/05-lgs/S53.mdx:474-476` — C7: Die Konsolidierung steht
  im selben Kasten unter der ungelösten Schätzfrage und verrät die Antwort:
  „Schon ab der zweiten rechten Seite liegt die gespeicherte Zerlegung vorn."
  Die Quizfrage `:479-483` wiederholt sie ein drittes Mal. Fix: den Satz nach
  `verdeckt` verschieben.
- [MINOR] `LUKosten.tsx:83` gegen `S53.mdx:469` — Zwei fast identische Fragen
  stehen übereinander („Ab wann überwiegt der einmalige Aufwand …?" /
  „Bei wie vielen rechten Seiten lohnt sich das einmalige Zerlegen?"). H6.
- [MINOR] `LUKosten.tsx:83` — `Schaetzfrage` ohne `verdeckt`; nach dem Auflösen
  erscheint nur „Tatsächlich: 2". Die im Verdikt versprochene „Auflösung, die
  den Schwellenwert einordnet", gibt es nicht. Fix: kleine `verdeckt`-Tafel mit
  der Gleichsetzung n³/3 + J n² = J(n³/3 + n²).
- [MINOR] `LUKosten.tsx:83` — `start` fehlt, der Default ist (min+max)/2 = 5,5
  bei `schritt=1`.

## SpdRichtung.tsx (§5.4, Kasten „Welche Richtung widerlegt positive Definitheit?")

L6 — REVISE — Die richtige Idee (eine Richtung widerlegt, keine beweist), aber
die Aufgabe ist beim Laden bereits gelöst.

- [MAJOR] `src/chapters/05-lgs/widgets/SpdRichtung.tsx:17, 25, 40` — C8/D4/B2:
  Voreinstellung θ = 45° bei `fall = "nicht"` (A = diag(1, −1)). Dort ist
  q = cos²45° − sin²45° = 0 (numerisch 6·10⁻¹⁷), `hit = q <= 1e-9` ist wahr, und
  das Widget begrüßt den Leser mit „✗ Aufgabe geschafft: Diese Richtung liefert
  xᵀAx ≤ 0 und widerlegt positive Definitheit" (Rendershot des Startzustands).
  Die Aufgabenzeile („drehen den Einheitsvektor bis die quadratische Form nicht
  mehr positiv ist") und die Frage im Kasten (`S54.mdx:35-37`) sind damit
  entwertet. Fix: Start bei θ = 20° (dort q = +0,766), zusätzlich `hit` an
  `q < 0` binden und den Randfall q = 0 als eigene Stufe („genau auf der
  Nullrichtung: semidefinit, aber nicht definit") ausweisen — das ist ohnehin der
  didaktisch interessantere Fall und im Text `S54.mdx:28-33` vorbereitet.
- [MAJOR] `SpdRichtung.tsx:8` — F1: Header verweist auf
  `verify-05-lgs/verify.mjs` (existiert nicht). Ironischerweise ist genau dieser
  Randfall im echten Skript abgedeckt: `scripts/verify/R3/widgets-05.mjs:11-12`
  assertiert `q(π/4) = 0`, also den Wert der Voreinstellung.
- [MINOR] `SpdRichtung.tsx:20-22` — G5: Die beiden Fall-Knöpfe bauen ihr Styling
  per Inline-`style` selbst, statt `W_BUTTON`/`W_BUTTON_AKTIV` aus
  `src/lib/widgets/surface.ts` zu benutzen; im Tooltip-Panel und im Dunkelmodus
  fällt das aus der Reihe.
- [MINOR] `SpdRichtung.tsx:31-38` — B3: Die Tafel hat weder Achsenbeschriftung
  noch Ticks, und die Beschriftung „x" sitzt am Ursprung (`x={C+8} y={C-8}`)
  statt an der Vektorspitze (Rendershot).
- [MINOR] `SpdRichtung.tsx:36` — C1: Der Einheitsvektor auf dem Kreis ist das
  natürliche Drag-Objekt; im ganzen Kapitel gibt es kein einziges `useDrag`.
  `useDrag` mit `clamp` auf den Einheitskreis plus dem vorhandenen θ-Regler als
  Doppelpfad wäre hier fast geschenkt.
- [NOTE] `SpdRichtung.tsx:40` — Der „besteht den Test, beweist aber nichts"-Zweig
  ist genau die von der Rubrik geforderte Nicht-Ereignis-Deutung. Erhalten.

## CholeskyStepper.tsx (§5.4, Kasten „Cholesky-Zerlegung Schritt für Schritt")

L7 — REVISE — Der Ablauf ist richtig und der Fehlschlag gut inszeniert; der
Startzustand ist leer und die Legende steht nur für Screenreader da.

- [MAJOR] `src/chapters/05-lgs/widgets/CholeskyStepper.tsx:95` — B1/B2: `t = 0`.
  Der Anfangszustand (Rendershot) zeigt A, ein L aus lauter Punkten, kein
  Protokoll, kein Verdikt. Wie bei `RueckSubStepper` ist die tote Ansicht der
  Leerfall. Fix: bei t = 1 starten.
- [MAJOR] `CholeskyStepper.tsx:143-155` — B3: Der gesamte Farbschlüssel (rot =
  verglichener A-Eintrag, blau = gesuchter L-Eintrag, grün = fertig) und der
  Hinweis auf die automatische Symmetrisierung stehen in einem
  `<p className="sr-only">`. Sehende Leser bekommen im Kasten **keine**
  Legende. Fix: sichtbare einzeilige Legende wie in
  `06-svd/widgets/S62Geometrie.tsx:181-187`, den sr-only-Text auf die
  Zusatzinformation kürzen.
- [MAJOR] `CholeskyStepper.tsx:47-56` — F3: `if (!(s > 1e-12))` liefert den Text
  „Unter der Wurzel steht X ≤ 0: die eingegebene Matrix ist nicht positiv
  definit". Für 0 < s < 10⁻¹² ist die Aussage „≤ 0" falsch, und der Fall s = 0
  (positiv **semi**definit — genau die Unterscheidung, die `S54.mdx:28-33`
  einführt und die Vertiefung `S54.mdx:400+` vertieft) wird mit dem Fall s < 0
  in einen Topf geworfen. Fix: drei Zweige (s < 0 / s = 0 exakt / s winzig).
- [MINOR] `CholeskyStepper.tsx:167-198` — F7: Ein vollständiger zweiter
  Knopfleisten-Block liegt tot im Markup (`className="hidden my-2 flex …"`; per
  CDP geprüft: alle drei Knöpfe `offsetParent === null`, Breite 0). Ersatzlos
  streichen.
- [MINOR] `CholeskyStepper.tsx:140` — „Schieben wir durch die sechs Einträge von
  L" nennt die 6 fest; korrekt für 3×3 (die Dimension ist nicht änderbar), aber
  `maxT` steht direkt daneben zur Verfügung.
- [NOTE] Der Fehlschlag-Durchlauf (a₁₁ = −1, per CDP getestet) funktioniert
  sauber: Stepper springt auf „Schritt 1 von 1", das Protokoll zeigt
  `l₁₁ = √(−1,000) ✗`, das Verdikt zitiert Satz 5.4.2. Das ist der Zielzustand.

## CholeskySampler.tsx (§5.4, Kasten „Wie L eine runde Punktwolke verformt")

L8 — KEEP — Fester Seed, drei sinnvolle Verdiktstufen, korrekte Sprache
(„fast singulär"); die „Probe" ist allerdings keine.

- [MAJOR] `src/chapters/05-lgs/widgets/CholeskySampler.tsx:87-91, 185` — F6: Die
  angezeigte „Probe: max |LLᵀ − Σ| = 0,000" kann nicht scheitern. L₁₁, L₂₁, L₂₂
  werden `:51-53` aus σ₁, σ₂, ρ in geschlossener Form gesetzt, Σ `:48-50` aus
  denselben drei Zahlen; der erste Vergleich ist wörtlich s1·s1 − s1·s1, die
  beiden anderen unterscheiden sich nur um die Klammerung, also um ein ULP. Das
  ist das `x − x`-Antimuster, dem Leser als Verifikation präsentiert. Fix:
  entweder die Probe streichen (die geschlossene Form braucht keine) oder L
  tatsächlich per Koeffizientenvergleich aus Σ rechnen und dann prüfen.
- [MINOR] `CholeskySampler.tsx:99-107` — B3: wie beim Stepper steht die Legende
  (grau = z-Wolke und Referenzkreis, grün = Bild y = Lz und Bildellipse) nur in
  einem `sr-only`-Absatz. Im Bild selbst ist nichts beschriftet.
- [MINOR] `CholeskySampler.tsx:113-117` — G6: `width={W} height={H}` ohne
  `h-auto` und mit fest gesetztem `bg-white`. Die README verbietet feste
  Pixelmaße und eigene Farben außerhalb von `FMM_COLORS`
  (`src/lib/widgets/README-widgets.md:70-72`); im Dunkelmodus und im
  `.w-dark`-Tooltip-Panel bleibt die Fläche weiß. Fix: `className="max-w-full
  h-auto"`, Hintergrund über `fill="var(--w-bg)"`.
- [NOTE] `CholeskySampler.tsx:20-31` — Feste 200-Punkte-Stichprobe mit
  kuratiertem Seed und ohne „neue Stichprobe"-Knopf; das ist bewusst und für die
  Aussage richtig (F2 erfüllt). Ein optionaler Resample-Knopf würde zeigen, dass
  die Ellipse die Verteilung ist und nicht die Punkte — als NOTE, kein Defekt.
- [NOTE] Das Verdikt `:187` unterscheidet ρ ≈ 0, mittleres ρ und |ρ| > 0,9 und
  nennt für den Grenzfall korrekt „fast singulär" statt „singulär". Vorbildlich.

## shared.tsx

L9 — KEEP — Reine Bausteine (`fmtNum`, `MatTable`, `WidgetLabel`, `backSub`),
Header vorhanden, Provenienz (heath-ch2, nur Code) benannt.

- [MINOR] `src/chapters/05-lgs/widgets/shared.tsx:36-58` — G3: `MatTable`
  rendert Matrizen als `inline-grid` aus `<div>`s ohne `role="table"`/`row`/
  `cell` und ohne Zeilen-/Spaltenköpfe. Für Screenreader ist eine 3×4-Matrix
  damit eine Zahlenfolge ohne Struktur; alle drei Stepper des Kapitels hängen
  daran. Fix: ARIA-Grid-Rollen oder ein echtes `<table>` mit `aria-label`.
- [NOTE] `shared.tsx:85` — Die 1e-12-Schwelle in `backSub` ist der gemeinsame
  Ursprung des F3-Befunds bei `RueckSubStepper` und `LUStepper`; ein Fix an
  dieser Stelle repariert beide.

---

## Kapitel-Fazit (H1–H6)

**H1 Dichte.** Acht Kästen auf drei Abschnitte: S52 zwei (einer in einer
Vertiefung, also optionales Material ✓), S53 drei, S54 drei. Pro
Unterabschnitt höchstens einer. Passt.

**H2 Dramaturgie.** Gut: Rückwärtseinsetzen (Mechanik isoliert) → LU-Stepper
(Mechanik kombiniert) → Pivot-Demo (Störung) → Kosten (Ökonomie) → SPD-Test →
Cholesky-Stepper → Sampler (Anwendung). Der Hilbert-Kasten sitzt korrekt in
einer Vertiefung.

**H3 Farbrollen.** Der Bauauftrag („Pivot rot, aktuelle Zeile/Multiplikator
blau, Ergebnis-/L-Einträge grün; κ orange") wird von den drei Steppern exakt
befolgt. Zwei dokumentierte Umwidmungen daneben: `S52Hilbert.tsx` färbt den
Inversenweg rot und das direkte Lösen grün, `SpdRichtung.tsx` die
Matrixfamilien. Beides steht im jeweiligen Header und ist vertretbar, aber Rot
trägt im Kapitel damit drei Bedeutungen.

**H4 Selbsttests.** `S54.mdx` schließt **ohne Quiz** — als einziger Abschnitt
des Kapitels (S51 zwei Quizblöcke, S52 einer, S53 zwei, S55 einer). Damit fehlt
gerade zu Cholesky, SPD und dem Sampler jede Selbstkontrolle, und keine der
drei S54-Widgets ist irgendwo prüfungsrelevant. Widget-abhängige Fragen gibt es
nur zweimal (`S52.mdx:162`, `S53.mdx:479`), und beide fragen eine Zahl ab, die
auch ohne Widget herleitbar ist. Nachzuziehen: mindestens eine Frage, die ohne
den Cholesky-Stepper oder den Sampler nicht zu beantworten ist.

**H5 Altbestand.** Keine minifizierten Dateien, kein `Math.random`, keine
Idle-Loops. Zwei Reste aus früheren Ständen: der tote Knopfblock in
`CholeskyStepper.tsx:167` und der abgebrochene Kopfkommentar in
`PivotDemo.tsx:1-12`.

**H6 Länge.** Unauffällig; die Verdikte sind eher zu knapp als zu lang (siehe
L5 und L2).

### Die drei wichtigsten Muster

1. **Sieben von acht Headern zitieren ein Prüfskript, das es nicht gibt.**
   `verify-05-lgs/verify.mjs` existiert im Repo nicht; das echte
   `scripts/verify/R3/widgets-05.mjs` deckt drei von rund zwanzig behaupteten
   Zahlen ab, und der Hilbert-Header führt stattdessen ein Sitzungs-Scratchpad
   an. Das ist schlechter als eine ehrliche „historische Notiz", weil der
   Verweis Deckung vortäuscht.
2. **Die toten Anfangszustände zeigen den Trivialfall.** Beide Stepper starten
   mit `t = 0` (leere Lösung, leeres L), die Pivot-Demo mit ε = 10⁻⁸ (kein
   sichtbarer Unterschied, grüner Haken), und `SpdRichtung` startet umgekehrt
   direkt auf der Lösung. Vier von acht Widgets bestehen den Screenshot-Test
   nicht — bei drei davon reicht ein anderer `useState`-Startwert.
3. **Verdikte sind das schwächste Glied, wo kein Stepper sie erzwingt.** Der
   LU-Stepper hat für jede Phase einen Text und ist deshalb das beste Widget des
   Kapitels; Rückwärtseinsetzen und Cholesky haben nur am Ende eines, der
   Kostenplot genau ein konstantes für alle Zustände. Dazu kommt in vier
   Widgets dieselbe Toleranz-als-Gleichheit („= 0" / „singulär" / „nicht positiv
   definit" bei 10⁻¹²), obwohl §5.3 selbst lehrt, dass zwischen „null" und
   „winzig" der ganze Unterschied liegt.
