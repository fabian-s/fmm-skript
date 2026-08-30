# Fix-Log Kapitel 8 — Iteration & Zufall (2026-08-29)

Grundlage: `reviews/widget-didactic-review-2026-08-29/08-la-misc.md`.
Verifikation: fünf neue Prüfskripte unter `scripts/verify/REV29/08-la-misc-*.mjs`
(alle grün, von `npm run verify:numbers` erfasst) und ein eigener CDP-Pass auf
einem Dev-Server (Port 4183) bei 1300 px und 390 px mit Stepper-Sequenzen,
Presets und dem Auflösen der Schätzfrage.

Der kapitelweite F1-Befund ist damit erledigt: kein Header zitiert mehr
`check-widgets.mjs` oder `verify-08-la-misc/check-widgets.mjs`, keiner trägt
noch den verstümmelten Baustein „in historische Prüfung, Skript nicht mehr
vorhanden … verifiziert".

---

## S81Potenz.tsx — PotenzmethodenStepper (Kasten 1)

**Umgesetzt:** MAJOR `S81.mdx:340-355` (die Bemerkung vor dem Kasten nennt die
Auflösung nicht mehr: der Satz „Ax⁽⁰⁾ = 4·x⁽⁰⁾ … hartnäckig 4 statt 9" ist in
den Preset-Verdikt gewandert), MINOR `S81.mdx:364-369` (zwei Sätze
Konsolidierung im Kasten), MINOR `:58` (von Annäherung an die Rate ist erst ab
k ≥ 3 die Rede; davor „noch dominiert der v₂-Anteil"), MINOR `:80` (grünes ✓
erst, wenn der Winkelrest unter 0,1 liegt), MINOR `:53` (Tippfehler
„Ausnahmfall"), NOTE `:48-49` (dritter Zweig „fast auf v₂: c₁ = 0,008, es dauert
lange" – die Drei-Zustands-Regel ist damit vollständig), MAJOR `:10-11`
(F1/F6-Header auf `scripts/verify/REV29/08-la-misc-S81Potenz.mjs`).

**Rationale:** Der Kasten fragte, was passiert, wenn der Start auf v₂ liegt –
und der Absatz direkt darüber beantwortete es Wort für Wort. Jetzt steht die
Antwort dort, wo der Leser sie sich holt: im Verdikt nach dem Klick. Der neue
Zwischenzweig zeigt außerdem, dass „c₁ ≠ 0" in der Praxis wenig tröstet, wenn
c₁ = 0,008 ist.

## S81QR.tsx — QrIterationsDemo (Kasten 2)

**Umgesetzt:** MAJOR `:19`/`:313` (KMAX von 20 auf 40; der Erfolgszweig
|a₂₁| < 10⁻⁹ wird für das symmetrische Standardbeispiel bei k = 29 erreicht und
war mit 20 Schritten unerreichbar), MAJOR `:14` (F1/F6: der Header zitierte
`check-widgets.mjs`, das es im Repo nicht gibt – jetzt
`scripts/verify/REV29/08-la-misc-S81QR.mjs`), MINOR `:209-226` (18 Zeilen
auskommentierter Knopf-Code entfernt), MINOR `:290-299` (`ariaLabel` für den
Log-Plot), MINOR `S81.mdx:768-777` (der Rahmentext nennt die beiden
Zusatz-Presets, ohne ihren Ausgang zu verraten), MINOR `S81.mdx:768-780`
(Konsolidierung nach dem Widget).

**Rationale:** Die Aufgabe lautete „verfolgen wir, ob der rote Eintrag
verschwindet" – und mit der Voreinstellung verschwand er innerhalb des
Steppers nie. Eine einzige Zahl im Code trennte eine erfüllbare von einer
unerfüllbaren Aufgabe.

## S82Pagerank.tsx — PagerankDemo (Kasten 3)

**Umgesetzt:** MAJOR `:87-99` (der einzige erklärende Absatz war `sr-only`
gestellt; er ist jetzt sichtbar, auf drei Sätze gekürzt und erklärt auch, was
die Kreisgröße bedeutet – die Auflösung „a und c bekommen doppelt so viel" ist
in den Konvergenz-Verdikt und in die MDX-Konsolidierung gewandert), MAJOR
`:134-159` (der eigene Knopfsatz ist durch den gemeinsamen `Stepper` ersetzt;
die Iterierten werden deterministisch aus dem Schrittindex gerechnet, damit
Zurückgehen und Scrubben funktionieren), MINOR `:101-105` (`role` und
`aria-label` für das Graph-SVG, dazu `viewBox` und `max-w-full`), MINOR
`:176-182` („auf vier Nachkommastellen erreicht" statt „Erreicht ist"), MINOR
`S82.mdx:82-87` (Konsolidierung), MAJOR `:13` (F1/F6-Header auf
`scripts/verify/REV29/08-la-misc-S82.mjs`).

**Rationale:** Sehende Leser sahen vier gleich große Kreise ohne Legende,
Screenreader-Nutzer bekamen dafür die Auflösung vorab – die Zuordnung war genau
verkehrt herum. Und ein Iterationswidget, das nur vorwärts kann, nimmt dem
Leser die Möglichkeit, einen Schritt noch einmal anzusehen.

## S82Pca.tsx — PcaDirectionDemo (Kasten 4)

**Umgesetzt:** MAJOR `:37`/`:52` (Reglerschritt von 1° auf 0,5°; drei Zustände:
exakt nur über den neuen Preset-Knopf „genau auf die Eigenrichtung springen",
weil θ* = 17,5504° auf keinem Rastwert liegt, „praktisch am Maximum" für das
Nahband, sonst der Normalfall), MAJOR `:48` (die grün gestrichelte
Eigenrichtung erscheint erst nach dem ersten eigenen Drehen; der Preset-Knopf
ist bis dahin gesperrt), MINOR `:49` (λ₁-Marke am Varianzbalken), MINOR `:30`
(wirkungslose `useMemo` entfernt), MINOR `S82.mdx:117-122` (Konsolidierung),
MAJOR `:10-12` (F1/F6-Header auf `scripts/verify/REV29/08-la-misc-S82.mjs`; das
Skript rechnet die hartkodierte Kovarianzmatrix aus DATA neu aus und bestimmt
λ₁, λ₂ und θ* durch einen Rasterlauf über 3,6 Mio. Winkel).

**Rationale:** Drei verschiedene Winkel konnten nicht alle „das Maximum" sein –
die angezeigten Varianzen widerlegten den Satz selbst. Jetzt gibt es genau einen
Zustand, in dem die Behauptung stimmt, und er ist über einen Knopf erreichbar.
Dass das Ziel nicht mehr von Anfang an eingezeichnet ist, macht aus dem
„Zielfinden ohne Suche" wieder eine Suche.

## S83Richardson.tsx — RichardsonStepper (Kasten 5)

**Umgesetzt:** MAJOR `S83.mdx:550-558` (die `Schaetzfrage` hat jetzt ein
`verdeckt`-Element und ein `onAufloesen`, das den γ-Regler auf γ* fährt und im
Fehlerplot die Waagerechte einzeichnet, auf der der Fehler bei ρ = 1 stehen
bliebe; dafür wurde die Schätzfrage als `RichardsonSchaetzfrage` in die
Widget-Datei gezogen, die den γ-Zustand hält), MINOR `:281-286` (Reglerschritt
0,001 statt 0,005 – der Grenzzweig ρ ≈ 1 ist damit bei γ = 0,433 erreichbar,
vorher sprang ρ von 0,986 auf 1,009), MINOR `:102-106`/`:249-258` (`aria-label`
für das Ebenen-SVG und `ariaLabel` für den Plot), MAJOR `:17-18` (F1/F6: der
Header zitierte `verify-08-la-misc/check-widgets.mjs`, das es nicht gibt – jetzt
`scripts/verify/REV29/08-la-misc-S83Richardson.mjs`).
**Zusätzlich (im Render gefunden, nicht im Review):** Das Ebenen-SVG hatte keine
`viewBox` und ragte bei 390 px über seinen Kasten hinaus; mit `viewBox` +
`max-w-full` + `min-w-0` skaliert es jetzt mit (Sammelfix 4).

**Rationale:** Der Kastentext versprach „die Auflösung markiert die Grenze der
Konvergenz", und beim Klick auf „Auflösen" passierte im Widget nichts. Jetzt
springt der Regler auf die Grenze, das Verdikt wechselt in den Grenzfall-Zweig,
und der Plot zeigt, was ρ = 1 bedeutet.

## S84Sketching.tsx — SketchingDemo (Kasten 6)

**Umgesetzt:** MINOR `:152` (die Faustregel ±1/√(2m) ist per Default
eingeblendet, der Knopf bleibt zum Ausblenden), MINOR `:166-179` (Inline-Legende
für die beiden Markerserien), MINOR `:213-222` (`ariaLabel` für den Plot), MINOR
`S84.mdx:167-206` (die Prosa spricht das kleinere Format n = 200 jetzt an,
statt zwischen n = 10 000 und n = 200 zu wechseln, ohne es zu sagen), MINOR
`S84.mdx:208-213` (Konsolidierung), MAJOR `:24-30` (F1/F6-Header auf
`scripts/verify/REV29/08-la-misc-S84Sketching.mjs`; das Skript belegt die
Standardabweichungen 9,97 % / 7,06 % und die Bandabdeckung 68,2 % aus der
exakten χ²-Verteilung statt aus einer Simulation).

**Rationale:** Der tote Startzustand zeigte die Streuung, aber nicht ihren
Maßstab – genau die Zahl, um die es in dem Abschnitt geht. Und ein Widget, das
mit n = 200 rechnet, während die Prosa n = 10 000 eingeführt hat, führt „beides"
eben nicht vor.

---

## Entscheidung nötig

Keine STATIC- oder REMOVE-Empfehlung im Kapitel-8-Review; alle sechs Widgets
sind KEEP oder REVISE.

## lib-Befund

- `src/lib/widgets/Schaetzfrage.tsx`: `onAufloesen` bekommt den Tipp übergeben,
  aber es gibt keinen Weg, aus dem Kind heraus zu erfahren, ob schon aufgelöst
  wurde, ohne den Zustand doppelt zu halten (die Render-Prop-Variante liefert
  `aufgeloest`, die Kind-als-Element-Variante nicht). In §8.3 mussten wir dafür
  einen eigenen `aufgeloest`-State neben dem der Komponente führen. Kein Fix,
  nur notiert.

## Wortzahl-Delta (Ziel ≤ +3 %)

S81 +1,4 % · S82 **+5,9 %** · S83 −0,7 % · S84 +1,5 % · S85 ±0 %.
S82 reißt das Ziel, weil dort beide Kästen überhaupt keine Konsolidierung
hatten (H6-Befund) und die Datei mit 1314 Wörtern die kürzeste des Kapitels ist:
zwei Pflicht-Konsolidierungen à ~35 Wörter schlagen dort mit 5 % zu Buche. Beide
sind bereits auf zwei Sätze gekürzt.

## Browser-Nachweis (Dev-Server 4183, CDP 9333)

- 6 Kästen bei 1300 px und 390 px; nach dem SVG-Fix ragt kein Element mehr über
  seinen Kasten hinaus (vorher tat es das Ebenen-SVG in Kasten 5 bei 390 px).
- Kasten 1: Preset „Versagensfall v₂" liefert „Der Start liegt exakt auf v₂ …
  4 statt 9"; θ = 27° liefert „Fast, aber nicht ganz auf v₂: c₁ = 0,0076";
  k = 1 „noch dominiert der v₂-Anteil", k = 6 „nähert sich der Rate"; die
  Konsolidierung steht im Kasten, der Spoilersatz nicht mehr in der Bemerkung.
- Kasten 2: Stepper geht bis „Schritt 40 von 40", und dort greift der
  Erfolgszweig „Nebendiagonale ist auf Rechengenauigkeit verschwunden"; die
  unsymmetrische Matrix erreicht ihn nach 20 Schritten, die Drehung liefert den
  Stillstands-Zweig.
- Kasten 3: der Erklärabsatz ist sichtbar, das Graph-SVG trägt `role="img"` und
  ein aussagekräftiges `aria-label`; Stepper „Schritt 8 von 20" erreicht den
  Konvergenz-Zweig, ein Schritt zurück funktioniert.
- Kasten 4: die grüne Linie fehlt im Startzustand und erscheint nach dem ersten
  Drehen, der Preset-Knopf ist bis dahin gesperrt; θ = 17,5° liefert „praktisch
  am Maximum", der Preset „liegt das Maximum".
- Kasten 5: „Auflösen" ist bis zum Tipp gesperrt; nach dem Auflösen steht der
  γ-Regler auf 0,433, der Text nennt die Kippgrenze 0,4331, der Plot trägt zwei
  gestrichelte Serien, und das Verdikt wechselt auf „ρ ≈ 1: der Grenzfall".
  γ = 0,50 liefert „ρ > 1".
- Kasten 6: der Faustregel-Knopf steht im Startzustand auf „ausblenden", die
  Legende ist sichtbar.
