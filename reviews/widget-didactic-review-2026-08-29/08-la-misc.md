# Kapitel 8 — Numerische Lineare Algebra: Iteration & Zufall: Widget-Review (2026-08-29)

Nenner aus dem Quellbaum: **6 Widget-Dateien**, **6 exportierte Widgets**,
**6 `:::interaktiv`-Kästen** über 5 MDX-Abschnitte (§8.5 Zusammenfassung ohne
Widget – korrekt so). Beide Pässe gefahren: volle Quelltextlektüre und ein
eigener CDP-Render-Pass bei 1300 px und 390 px mit der Pflicht-Sequenz
(Stepper bis zum Ende und zurück, jeder Preset, Regler min/kritisch/max,
Schätzfrage vor und nach dem Aufdecken, mehrfaches Neuziehen der Zufallsmatrix).

Kein horizontaler Seitenüberlauf, weder bei 1300 px noch bei 390 px
(`document.scrollWidth === window.innerWidth`); kein Element ragt über den
Viewport hinaus. G1 ist damit für alle sechs Widgets erfüllt.

---

## S81Potenz.tsx (§8.1 Die Potenzmethode)

**PotenzmethodenStepper** — KEEP — Ziehbarer Startvektor auf dem Einheitskreis
mit Winkelregler als Doppelpfad, echter `Stepper` (rückwärts und scrubbar),
drei Presets, die die Fallunterscheidung des Satzes sind; die Rate 0,444 wird
im Render bei k = 18 exakt getroffen.

- [MAJOR] `src/chapters/08-la-misc/S81.mdx:340-355` (Bemerkung „Wann die Potenzmethode versagt", Kernsatz Z. 349-352) — Die `bemerkung`
  unmittelbar **vor** dem Kasten löst die Frage des Kastens vollständig auf:
  „In Beispiel … trifft das auf x⁽⁰⁾ = c·v₂ zu. Dann ist Ax⁽⁰⁾ = 4·x⁽⁰⁾, die
  normierte Iterierte bleibt für immer stehen, und beide Schätzungen liefern
  hartnäckig 4 statt 9." Der Kasten (S81.mdx:364-369) fragt genau das:
  „Was geschieht, wenn der Start genau auf der zweiten Eigenrichtung liegt?
  … testen wir diese Vermutung." Nichts bleibt zu testen (C7). Fix:
  die Auflösung aus der Bemerkung in den Preset-Verdikt verschieben oder den
  Kasten mit einer `Schaetzfrage` („bleibt stehen / konvergiert langsamer /
  konvergiert wie sonst") vor die Bemerkung ziehen.
- [MINOR] `src/chapters/08-la-misc/S81.mdx:364-369` — Der Kasten schließt
  direkt hinter dem Widget: keine Konsolidierung (A4/D5). Fix: zwei Sätze,
  die den Ausnahmefall und die Rate zusammenfassen.
- [MINOR] `src/chapters/08-la-misc/widgets/S81Potenz.tsx:58` — Der
  Standard-Verdikt lautet ab k = 1 „die beobachtete Rate **0,975** nähert sich
  der Rate |λ₂/λ₁| = 0,444"; im Render bei k = 1 steht dort tatsächlich 0,975
  neben dem Wort „nähert sich". Der Satz ist zustandsunabhängige Schablone
  (D1). Fix: erst ab k ≥ 3 von Annäherung sprechen, davor „noch dominiert der
  v₂-Anteil".
- [MINOR] `src/chapters/08-la-misc/widgets/S81Potenz.tsx:80` — `kind` ist ab
  k > 0 immer `"ok"` (grünes ✓), auch wenn die Iterierte noch im falschen
  Quadranten steht. Fix: `"neutral"`, solange sinPhi > 0,1.
- [MINOR] `src/chapters/08-la-misc/widgets/S81Potenz.tsx:53` — Tippfehler
  „Ausnahmfall" → „Ausnahmefall" (im Render sichtbar).
- [NOTE] `src/chapters/08-la-misc/widgets/S81Potenz.tsx:48-49` — `fails` und
  `hit` sind nur über die Preset-Knöpfe exakt erreichbar (der Winkelregler
  läuft in ganzen Grad); die Schwelle 1e−8 trennt damit wirklich exakt. Gut
  gelöst. Fehlt: der *fast*-Fall. Bei θ = 27° (0,4° neben v₂) zeigt das
  Widget im Render den Normalverdikt, obwohl die Konvergenz dort quälend
  langsam ist – genau das, was die Bemerkung als „weniger dramatisch, als es
  klingt" beschreibt. Ein dritter Zweig („fast senkrecht auf v₁: c₁ = 0,008,
  es dauert lange") würde die Drei-Zustands-Regel vervollständigen.
- [MAJOR] `src/chapters/08-la-misc/widgets/S81Potenz.tsx:10-11` — F1/F6: Der
  Header enthält einen verstümmelten Satz („Zahlen sind in historische
  Prüfung, Skript nicht mehr vorhanden am 2026-08-19 verifiziert") und zitiert
  kein Skript. λ₁ = 9, λ₂ = 4 und die Rate 4/9, die der Selbsttest
  (S81.mdx:372) abfragt, sind in `scripts/verify/R3/widgets-08.mjs` **nicht**
  enthalten. Fix: drei Zeilen dort ergänzen und den Header darauf umstellen.

---

## S81QR.tsx (§8.1 Die QR-Iteration)

**QrIterationsDemo** — REVISE — Der Aufbau ist der beste des Kapitels
(Matrizen, Faktoren, aufgesammeltes Q, Log-Plot mit Theoriegerade, drei
Presets, die genau die drei Fälle sind); zwei Dinge kippen ihn: der
Erfolgszweig ist für die Standardmatrix unerreichbar, und der Header zitiert
ein Prüfskript, das es nicht gibt.

- [MAJOR] `src/chapters/08-la-misc/widgets/S81QR.tsx:19` + `:313` — Der Zweig
  `offJetzt < 1e-9` („Die Nebendiagonale ist auf Rechengenauigkeit
  verschwunden") ist für den Startzustand (symmetrisches Beispiel, Rate 4/9)
  **nicht erreichbar**: nachgerechnet ist |a₂₁| nach KMAX = 20 Schritten noch
  1,81·10⁻⁷. Im Render steht bei k = 0 wie bei k = 20 wörtlich derselbe
  Neutral-Verdikt „… Klicken wir uns weiter, bis der Schrumpffaktor die
  vorhergesagte Rate trifft." Die Aufgabe (Zeile 167) „verfolgen wir, ob der
  rote Eintrag unter der Diagonale verschwindet" ist mit der Voreinstellung
  nicht erfüllbar (C8/F8/D1). Fix: KMAX auf 40 anheben (oder die Schwelle auf
  1e−6), damit der Standardfall im Widget zu Ende geht.
- [MAJOR] `src/chapters/08-la-misc/widgets/S81QR.tsx:14` — F1/F6: „Zahlen
  verifiziert in **check-widgets.mjs**, 2026-08-19". Diese Datei existiert im
  Repo nicht (`find . -name check-widgets.mjs` → keine Treffer). Ein Header,
  der ein nicht existierendes Prüfskript zitiert, ist schlechter als gar
  keiner. Fix: auf `scripts/verify/R3/widgets-08.mjs` umstellen und die dort
  fehlenden Werte (Eigenwerte 9/4 bzw. 5/1, Rate 0,444 bzw. 0,2) ergänzen.
- [MINOR] `src/chapters/08-la-misc/widgets/S81QR.tsx:209-226` — Auskommentierter
  Knopf-Block (18 Zeilen toter Code) mitten in der Komponente (F7).
- [MINOR] `src/chapters/08-la-misc/widgets/S81QR.tsx:290-299` — `LabeledPlot`
  ohne `ariaLabel`, obwohl die Schwesterwidgets eines mitgeben (G3).
- [MINOR] `src/chapters/08-la-misc/S81.mdx:768-777` — Der Rahmentext nennt die
  beiden Zusatz-Presets samt Ausgang („die Drehung …, bei der gar nichts
  passiert"). Damit ist ein Preset entwertet, bevor er geklickt wurde (C7).
  Fix: „probieren wir auch die Drehung" ohne Ergebnis.
- [MINOR] `src/chapters/08-la-misc/S81.mdx:768-780` (Kastenende) — Keine Konsolidierung
  nach dem Widget im Kasten (A4).
- [NOTE] `src/chapters/08-la-misc/widgets/S81QR.tsx:308-317` — Die drei
  Verdikte für die drei Presets sind im Render alle erreicht und sagen
  wirklich Verschiedenes (komplexe Eigenwerte / Rate 1 / konvergiert, dabei
  symmetrisch vs. unsymmetrisch mit dem Zusatz zur Sortierung). Das ist gute
  Verdikt-Arbeit.

---

## S82Pagerank.tsx (§8.2 Google PageRank)

**PagerankDemo** — REVISE — Die Zahlen stimmen (die Halbierung je Schritt und
das Pendeln um x* habe ich nachgerechnet: q = 0,5 exakt, Vorzeichenmuster
alterniert), aber die gesamte Erklärung ist unsichtbar gestellt und die
Iteration lässt sich nicht zurücknehmen.

- [MAJOR] `src/chapters/08-la-misc/widgets/S82Pagerank.tsx:87-99` — Der
  einzige erklärende Absatz des Widgets (13 Zeilen: was Spalte j bedeutet,
  warum die Summe erhalten bleibt, warum a und c doppelt so viel bekommen)
  trägt die Klasse `sr-only` und ist damit **visuell nicht vorhanden**. Der
  390-px-Schuss bestätigt es: der Leser sieht einen Graphen mit vier gleich
  großen Kreisen, vier Balken und keinerlei Legende dafür, was die
  Kreisgröße bedeutet (B3). Screenreader-Nutzer bekommen umgekehrt die
  Auflösung („Im Grenzwert bekommen a und c doppelt so viel") vorab. Fix:
  den Absatz sichtbar machen und auf zwei Sätze kürzen, den Rest in die
  MDX-Konsolidierung.
- [MAJOR] `src/chapters/08-la-misc/widgets/S82Pagerank.tsx:134-159` — Die
  Iteration kennt nur „A anwenden", „× 10" und „zurücksetzen": kein Schritt
  zurück, kein Scrubben (C5). Die Schwesterwidgets §8.1 und §8.3 benutzen den
  gemeinsamen `Stepper` (◀ ▶ ⏮ plus Regler); hier ist er nicht wiederverwendet
  (G5). Fix: Zustand als `k` führen und `<Stepper>` einsetzen; die Iterierten
  sind deterministisch aus k berechenbar.
- [MAJOR] `src/chapters/08-la-misc/widgets/S82Pagerank.tsx:13` — F1/F6:
  „Zahlen: **check-widgets.mjs**, 2026-08-19" – Datei existiert nicht.
  Ärgerlich, weil `scripts/verify/R3/widgets-08.mjs:8-10` den stationären
  Vektor (1/3, 1/6, 1/3, 1/6) als Fixpunkt von T tatsächlich assertiert; nur
  zitiert ihn niemand.
- [MINOR] `src/chapters/08-la-misc/widgets/S82Pagerank.tsx:101-105` — Das SVG
  hat weder `role` noch `aria-label` (G3), obwohl es die Hauptdarstellung ist.
- [MINOR] `src/chapters/08-la-misc/widgets/S82Pagerank.tsx:176-182` — „Der
  Abstand zu x* ist unter 5·10⁻⁴ gefallen. **Erreicht ist** x* = (1/3, 1/6,
  1/3, 1/6)". Die Schwelle wird zwar genannt, „erreicht" ist trotzdem zu
  stark. Fix: „auf vier Nachkommastellen erreicht".
- [MINOR] `src/chapters/08-la-misc/S82.mdx:82-87` — Keine Konsolidierung nach
  dem Widget im Kasten (A4).
- [NOTE] Die Verdikt-Aussage „Er halbiert sich in jedem Schritt, und die
  Scores … pendeln um ihre Grenzwerte" ist im Render und in der Nachrechnung
  bestätigt (q = 0,5000 in jedem Schritt, Vorzeichen des Fehlers alterniert).
  Eine Behauptung, die stimmt und die man am Widget nachprüfen kann.
- [NOTE] F5: Der Header nennt `mml-ch4/PageRankWidget.tsx` als Codequelle und
  hält fest, dass die erste Fassung eingedeutschte App-Prosa enthielt und
  ersetzt wurde. Die Quell-App liegt in dieser Sitzung nicht im Workspace,
  ein Diff war nicht möglich; die vorhandenen Texte sind Wir-Form und ohne
  englische Reste.

---

## S82Pca.tsx (§8.2 Hauptkomponentenanalyse)

**PcaDirectionDemo** — REVISE — Richtige Idee (Richtung ziehen, Varianzbalken
mitlaufen lassen), aber das Ziel ist von Anfang an eingezeichnet und das
Verdikt erklärt gleich vier Winkel zum Maximum.

- [MAJOR] `src/chapters/08-la-misc/widgets/S82Pca.tsx:37` + `:52` — `max` gilt
  für |sin(θ − 17,55°)| < 0,035, also für θ ∈ {16°, …, 19°}. Im Render sagt
  das Widget bei θ = 17°, 18° und 19° jeweils „Bei θ = … **liegt das
  Maximum** mit Varianz 4,437 / 4,438 / 4,435: Das ist v₁ von Σ." Drei
  verschiedene Richtungen können nicht alle der Maximierer sein; die
  angezeigten Varianzen widerlegen den Satz selbst. Der exakte Maximierer
  17,55° ist über den Regler (Schritt 1°) gar nicht erreichbar. Fix:
  Regler-Schritt 0,5° oder feiner und drei Zustände – exakt (|θ − θ*| < 0,05°:
  „hier ist v₁, Varianz = λ₁"), fast („4,437 gegen λ₁ = 4,438, also praktisch
  am Maximum"), sonst.
- [MAJOR] `src/chapters/08-la-misc/widgets/S82Pca.tsx:48` — Die grün
  gestrichelte Eigenrichtung ist im toten Startzustand eingezeichnet. Die
  Aufgabe des Kastens (S82.mdx:117-119: „wie sieht die dazugehörige Richtung
  in einer Punktwolke aus? Drehen wir eine Projektion durch die Daten") ist
  damit beantwortet, bevor der Leser zieht (C7); das Verdikt fordert sogar
  ausdrücklich auf, „zur grün gestrichelten Richtung" zu drehen – ein
  Zielfinden ohne Suche. Fix: die grüne Linie erst nach dem ersten Ziehen
  einblenden oder eine `Schaetzfrage` (Variante `klick`) davor.
- [MAJOR] `src/chapters/08-la-misc/widgets/S82Pca.tsx:10-12` — F1/F6:
  verstümmelter Header („in historische Prüfung, Skript nicht mehr vorhanden
  am 2026-08-19 verifiziert"), kein Skript. Die Kovarianzmatrix ist als
  Literal hartcodiert (`:18`), obwohl sie aus `DATA` berechenbar wäre; ein
  Prüfskript, das beides vergleicht, wäre zwei Zeilen lang und würde zugleich
  λ₁ = 4,438 aus dem Selbsttest (S82.mdx:125) abdecken.
- [MINOR] `src/chapters/08-la-misc/widgets/S82Pca.tsx:44/49/52` — Drei
  JSX-Zeilen mit 250–380 Zeichen; nicht minifiziert im Sinne des
  Quantitativ-Scans, aber am Rand der Lesbarkeit (F7).
- [MINOR] `src/chapters/08-la-misc/widgets/S82Pca.tsx:49` — Der Varianzbalken
  rechts trägt nur die Zahl, keine Achse und keine Marke für λ₁; der Leser
  sieht nicht, wo „voll" ist (B3). Fix: eine gestrichelte λ₁-Linie am Balken.
- [MINOR] `src/chapters/08-la-misc/widgets/S82Pca.tsx:30` — `useMemo` mit
  Abhängigkeit `[theta, v]`, wobei `v` in jedem Render neu entsteht: die
  Memoisierung greift nie (G4, folgenlos, aber irreführend).
- [MINOR] `src/chapters/08-la-misc/S82.mdx:117-122` — Keine Konsolidierung
  nach dem Widget im Kasten (A4).

---

## S83Richardson.tsx (§8.3 Iterative Löser)

**RichardsonStepper** — KEEP — Zwei verknüpfte Darstellungen (Weg in der Ebene
und Fehlerkurve mit Theoriegerade), echter `Stepper`, drei Rate-Zweige, und
die Schätzlösung γ* = 2/λ_max = 0,4331 ist als einziger Wert im Kapitel in
`scripts/verify/R3/widgets-08.mjs:7` tatsächlich assertiert.

- [MAJOR] `src/chapters/08-la-misc/S83.mdx:550-558` — Die `Schaetzfrage` wird
  ohne `verdeckt` aufgerufen. Der Kastentext behauptet aber: „**Die Auflösung
  markiert die Grenze der Konvergenz.**" Im Render passiert beim Klick auf
  „Auflösen" im Widget nichts: kein Marker am γ-Regler, keine Linie im
  Fehlerplot, γ bleibt auf 0,25. Der Leser bekommt nur die Zahl im
  Schätzfrage-Kasten und muss die Grenze selbst suchen (F8/C7). Fix:
  `verdeckt={…}` mit einer Marke bei γ = 0,4331 im Plot **und**
  `onAufloesen={() => setGamma(0.435)}` wie in den Kapitel-7-Widgets.
- [MAJOR] `src/chapters/08-la-misc/widgets/S83Richardson.tsx:17-18` — F1/F6:
  Header zitiert `verify-08-la-misc/check-widgets.mjs` – dieser Pfad existiert
  im Repo nicht. Fix: auf `scripts/verify/R3/widgets-08.mjs` umstellen (dort
  stehen λ_max, λ_min und 2/λ_max bereits) und ρ(0,25) = 0,405 ergänzen.
- [MINOR] `src/chapters/08-la-misc/widgets/S83Richardson.tsx:281-286` — Der
  Grenzzweig `rho <= 1.001` ist praktisch unerreichbar: mit Regler-Schritt
  0,005 springt ρ von 0,986 (γ = 0,430) auf 1,009 (γ = 0,435), im Render
  belegt. Ein beworbener Zustand („der Grenzfall") ohne erreichbaren
  Parameter (F8). Fix: Schritt 0,001 oder einen Preset-Knopf „γ = γ*".
- [MINOR] `src/chapters/08-la-misc/widgets/S83Richardson.tsx:102-106` und
  `:249-258` — Weder das Ebenen-SVG noch `LabeledPlot` bekommt ein
  `aria-label` (G3).
- [NOTE] `src/chapters/08-la-misc/S83.mdx:479-548` — Das Rechenbeispiel vor
  dem Widget listet die Fehlerfolge und ρ = 0,405 für genau die
  Voreinstellung. Das ist hier kein Spoiler, sondern der Sinn der Sache: das
  Widget bestätigt die Handrechnung. Die Schätzfrage zielt auf einen anderen
  Wert (die Kippgrenze), der in der Prosa nicht vorkommt – sauber getrennt.
- [NOTE] `src/chapters/08-la-misc/widgets/S83Richardson.tsx:78-84` — Bei
  Divergenz bleibt der Ausschnitt auf der Lösung zentriert statt dem
  Schwerpunkt der davonfliegenden Punkte zu folgen, und Punkte außerhalb
  werden ausgeblendet. Im Render bei γ = 0,55 sauber. Gute Detailarbeit.

---

## S84Sketching.tsx (§8.4 Sketching)

**SketchingDemo** — KEEP — Vorbildliche Zufallsführung: fester Seed, „neue
Sketchmatrix ziehen" als expliziter Knopf, „zurücksetzen" auf den
Ausgangs-Seed, kein `Math.random` im Render; ein Ziehungspfad statt
unabhängiger Experimente, und die Bildunterschrift sagt das auch.

- [MINOR] `src/chapters/08-la-misc/widgets/S84Sketching.tsx:152` — Die
  Faustregel `±1/√(2m)` ist per Default **aus**; das Verdikt sagt dann nur
  „Blenden wir die Faustregel ein …". Der tote Startzustand zeigt damit die
  Streuung, aber nicht ihren Maßstab (B2). Fix: Default `true`; der Knopf
  bleibt zum Ausblenden.
- [MINOR] `src/chapters/08-la-misc/widgets/S84Sketching.tsx:166-179` — Der
  Plot trägt zwei Markerserien (Distanz rot, Winkel violett) ohne Legende im
  Bild; die Zuordnung steht nur in den Fließtextzeilen darunter (B3/E1). Fix:
  Inline-Legende über dem Plot.
- [MINOR] `src/chapters/08-la-misc/widgets/S84Sketching.tsx:213-222` —
  `LabeledPlot` ohne `ariaLabel` (G3).
- [MINOR] `src/chapters/08-la-misc/S84.mdx:167-206` vs.
  `src/chapters/08-la-misc/widgets/S84Sketching.tsx:81` — Das Zahlenbeispiel
  der Prosa arbeitet mit n = 10 000 und m = 50, und schließt mit „Das Widget
  unten führt beides vor". Das Widget rechnet aber mit n = **200**
  (im Render als „n = 200, m = 25, Kompression 8,0×" abzulesen). Ein
  Szenario, das die Prosa nie eingeführt hat (A7). Fix: entweder n im Text
  ansprechen („dasselbe Experiment in kleinerem Format, n = 200") oder das
  Widget auf n = 10 000 heben.
- [MINOR] `src/chapters/08-la-misc/S84.mdx:208-213` — Keine Konsolidierung
  nach dem Widget im Kasten (A4).
- [MAJOR] `src/chapters/08-la-misc/widgets/S84Sketching.tsx:24-30` — F1/F6:
  verstümmelter Header („Verifiziert in historische Prüfung, Skript nicht mehr
  vorhanden, 2026-08-19"), kein Skript. Behauptet werden ‖x − y‖ = 5,6954,
  ∠(x,y) = 41,714°, Standardabweichungen 9,97 % und 7,06 % sowie „4000
  Ziehungen: 68,2 %" – alles nachvollziehbare, aber unbelegte Zahlen; die
  ersten beiden stehen im Render sichtbar im Readout. Fix: ein Skript, das
  X und Y einliest, die beiden Kennzahlen assertiert und die χ²-Standard-
  abweichung gegen 1/√(2m) prüft.
- [NOTE] Der Selbsttest S84.mdx:216 (Faustregel = 10 % bei m = 50) verlangt,
  den Faustregel-Knopf zu benutzen – widgetgebunden, gut.

---

## Kapitel-Fazit (H1–H6)

**H1 Widget-Dichte.** 6 Widgets auf 5 Abschnitte, §8.1 trägt zwei (an zwei
verschiedenen Unterabschnitten), §8.2 zwei (PageRank, PCA), §8.3 und §8.4 je
eines, §8.5 keines. Angemessen; kein Widget steckt in einer Vertiefung, alle
sechs Kästen sind offen.

**H2 Dramaturgie.** Sauber: die Mechanik zuerst isoliert (Potenzmethode),
dann das allgemeinere Verfahren (QR-Iteration), dann zwei Anwendungen,
danach der iterative Löser und zum Schluss der Zufall. Kein Sandkasten.

**H3 Farbrollen.** Der Bauauftrag (KONVENTIONEN, „KAPITEL 8": Iterierte blau,
Grenzwert/Eigenvektor grün, Rate orange, Residuum rot) wird in allen sechs
Headern zitiert und im Code eingehalten. Kein Farbdrift-Befund.

**H4 Selbsttest-Abdeckung.** Jeder Abschnitt schließt mit einem Quiz;
widgetgebunden sind S81 (Rate 0,444), S82 (λ₁ = 4,43 und die Summenerhaltung),
S83 (ρ > 1) und S84 (Faustregel 10 %). Gute Abdeckung. Kein A8-Verstoß: alle
befragten Widgets liegen in offenen Kästen.

**H5 Ältere Generation.** `S82Pagerank` fällt sichtbar aus dem Rahmen: eigener
Knopfsatz statt `Stepper`, SVG ohne `role`/`aria-label`, Erklärung
`sr-only` gestellt. Das ist die einzige Datei des Kapitels, die die aktuellen
Bausteine nicht nutzt.

**H6 Länge.** Umgekehrtes Problem zu Kapitel 7: **fünf von sechs Kästen**
haben überhaupt keine Konsolidierung nach dem Widget (S81 beide, S82 beide,
S84); nur §8.3 schließt mit zwei Sätzen, die die Einsicht tragen. Für den
Druckleser bleibt in fünf Fällen ein Platzhalter ohne Deutung.

### Die drei wichtigsten Muster

1. **Header zitieren nicht existierende Prüfskripte.** Drei von sechs Dateien
   (`S81QR.tsx:14`, `S82Pagerank.tsx:13`, `S83Richardson.tsx:17-18`) nennen
   `check-widgets.mjs` bzw. `verify-08-la-misc/check-widgets.mjs`; beide Pfade
   existieren nicht (`find . -name check-widgets.mjs` → leer). Die übrigen drei
   tragen den verstümmelten Baustein „in historische Prüfung, Skript nicht mehr
   vorhanden … verifiziert". Tatsächlich vorhanden ist
   `scripts/verify/R3/widgets-08.mjs` mit vier Assertions (λ_max, λ_min,
   2/λ_max, PageRank-Fixpunkt) – kein Header zitiert es. F1 ist damit
   kapitelweit verletzt, obwohl die halbe Arbeit schon getan ist.
2. **Die Auflösung steht vor der Frage.** Zweimal wird die Pointe des Kastens
   im Absatz davor ausgesprochen (S81.mdx:349 zur Potenzmethode,
   S81.mdx:776 zum Drehungs-Preset), einmal ist das Ziel schon eingezeichnet
   (PCA, grüne Eigenrichtung), und einmal löst die `Schaetzfrage` gar nichts
   auf (Richardson ohne `verdeckt`). Von vier Vorhersage-Gelegenheiten trägt
   keine.
3. **Toleranz als Gleichheit im PCA-Verdikt** und **unerreichbare Zweige**
   (QR-Erfolgszweig bei KMAX = 20, Richardson-Grenzfall bei Reglerschritt
   0,005). In beiden Fällen genügt eine Zahl im Code, um den beworbenen
   Zustand erreichbar zu machen.

### Was gut ist

- **S84Sketching** ist die sauberste Zufallsführung im gesamten Prüfumfang:
  Seed sichtbar, Neuziehen nur auf Knopfdruck, Rücksetzen auf den
  Ausgangs-Seed, und der Header erklärt, warum die Kurve ein Pfad und keine
  Folge unabhängiger Experimente ist.
- **S81QR** zeigt drei Presets, die wirklich die drei mathematischen Fälle
  sind (symmetrisch → diagonal, unsymmetrisch → dreieckig, komplexe
  Eigenwerte → Stillstand), jeweils mit eigenem, begründendem Verdikt.
- **S83Richardson** verknüpft zwei Darstellungen desselben Zustands (Weg in
  der Ebene, Fehlerkurve im Log-Bild) und zeichnet die Theorievorhersage als
  Funktion, nicht als Punktfolge – dadurch bleibt sie auch bei Divergenz eine
  Gerade.
