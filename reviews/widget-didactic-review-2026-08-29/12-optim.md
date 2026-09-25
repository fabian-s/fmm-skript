# Kapitel 12 — Optimierung: Widget-Didaktik-Review

Scope: `src/chapters/12-optim/` — 14 Widget-Dateien mit **14 exportierten
Widgets** in 6 MDX-Abschnitten; im Browser 14 `:::interaktiv`-Kästen, keine
Tafel außerhalb.

Zwei Pässe je Widget: volle Quelltextlektüre und Render-Pass per CDP bei 1300 px
und 390 px mit den Pflicht-Interaktionssequenzen (Regler min / didaktisch
kritische Stelle / max, jeder Preset einmal, Stepper vorwärts **und** zurück,
Schätzfrage vor und nach dem Auflösen, Ziehgriffe an die Extreme). Alle
Verdikt-Zweige, die dieser Report als „erreicht" nennt, habe ich im Browser
wirklich ausgelöst. Kapitel-Farbrollen nachgeschlagen in KONVENTIONEN.md,
Abschnitt „KAPITEL 13 (Foliensatz 13-optim)" (ALTE Zählung): Iterierte und
Trajektorien blau, Optimum/Grenzwert grün, Gradienten- und Suchrichtungen
orange, Nebenbedingungen und Divergenzwarnungen rot. Violett ist im Kapitel
frei; jede Datei, die es benutzt, schreibt ihre Rolle in den Header, und die
Rolle wechselt zwischen den Tafeln (Graph von f in S121/S123, stationärer Punkt
in S122, Momentum-Bahn in S124, KQ-Punkt in S125) — siehe H3. Der Gradient als
Zeilenvektor ist Konvention und wird nirgends als Fehler gemeldet.

Alle Zahlen aus Headern, Verdikten und Konsolidierungen habe ich mit `node`
unabhängig nachgerechnet. **Keine einzige ist falsch.** Die Befunde dieses
Kapitels betreffen nicht die Zahlen, sondern die Frage, ob der Leser sie selbst
findet — und in einem Fall, ob der Verdikttext zu dem passt, was daneben steht.

*Screenshot-Hinweis:* In den Startzustand-Aufnahmen der letzten drei Kästen
(11–13) stehen `\(...\)`-Literale statt gesetzter Formeln. Das ist ein Artefakt
der Aufnahme (MathJax setzt beim Scrollen nach); nach echtem Hineinscrollen und
6 s Wartezeit sind es im Browser 0 rohe Literale. Kein Befund.

---

## S121Bisektion.tsx (12.1)

BisektionStepper — KEEP — Vorbildlicher Stepper mit Protokolltabelle und
Sonderfall-Zweig; die Antwort auf die Schätzfrage steht zweimal daneben.

- [MAJOR] `src/chapters/12-optim/S121.mdx:392-394` und `S121.mdx:501-503` — Die
  Schätzfrage lautet „Wie viele Halbierungen braucht die Bisektion auf [1, 2],
  bis das Intervall kürzer ist als ε = 10⁻⁶?" (`loesung={20}`,
  `S121.mdx:491-496`). Die Antwort steht **vor** dem Kasten („also brauchen wir
  $20$ Schritte", Z. 393) und noch einmal **im** Kasten unter dem Widget
  („$10$ Schritte für $\epsilon = 10^{-3}$, $20$ für $10^{-6}$, $34$ für
  $10^{-10}$", Z. 501-503). Im Render-Pass in der Phase „tippen" bestätigt: der
  Kastentext enthält „20 für" schon vor der Eingabe. Das ist das Anti-Muster aus
  design-patterns §1 in Reinform. Fix: Z. 392-397 auf die Rechnung ohne
  Ergebniszahl kürzen, Z. 501-503 in das `verdeckt`-Feld verschieben.
- [NOTE] `S121Bisektion.tsx:225-229` — Legendenabsatz im Widget; als eine
  Legende (zwei Sätze) noch vertretbar, aber die Farbzuordnung steht damit
  zweimal (auch in Z. 226-228 und in der MDX-Prosa).
- Gut: `Stepper` ohne `playable`, also scrubbar und rückwärts begehbar; drei
  Verdikt-Zweige (Ausgangslage / Sonderfall „drei Nullstellen, eine Klammer" beim
  kubischen Beispiel / laufender Schritt / am Ziel), alle im Render-Pass
  erreicht; der Endzustand meldet „Fertig nach 20 Halbierungen … ⌈log₂((b−a)/ε)⌉
  = 20 … und das ist keine Schätzung, sondern die exakte Zahl" und vergleicht
  die garantierte Schranke 4,77·10⁻⁷ mit dem tatsächlichen Fehler 9,50·10⁻⁸.
  Genau so soll ein Verdikt aussehen.
- F1/F6: `S121Bisektion.tsx:31-41` — „historische Notiz", **kein committetes
  Prüfskript**. Nachgerechnet ✓: 10 / 20 / 34 Schritte für ε = 10⁻³ / 10⁻⁶ /
  10⁻¹⁰, 1/log₁₀2 = 3,3219, die drei Nullstellen des kubischen Beispiels auf
  12 Stellen.

## S121Newton.tsx (12.1)

NewtonNullstelle — REVISE — Fünf saubere Verdikt-Zweige, aber die Schrittzahl
im Verdikt zählt die Reglerstellung statt der Konvergenz, und die
Konsolidierung beschreibt einen anderen Startwert als die Voreinstellung.

- [MAJOR] `S121Newton.tsx:267` — `titel = \`am Ziel nach ${kk} Schritten\``: `kk`
  ist die **aktuelle Stellung des Schrittreglers**, nicht der Schritt, in dem die
  Iteration ankam. Im Browser reproduziert: auf x³ − 3x + 1 ab x⁽⁰⁾ = −2 meldet
  das Widget am Reglerende „am Ziel nach 8 Schritten", obwohl der Fehler schon
  ab Schritt 4 unter 10⁻¹⁰ liegt (nachgerechnet); dasselbe ab x⁽⁰⁾ = 2 (Ankunft
  bei Schritt 5). Der Header (`Z. 43-46`) behauptet dagegen „ab −2 in 5
  Schritten, ab 0 in 5 Schritten, ab 2 in 7 Schritten". Damit widerspricht die
  angezeigte Zahl dem Header, und der Leser kann sie nicht als Aufwandsmaß
  lesen. Fix: den ersten Index mit `fehler[i] < 1e-10` bestimmen und den
  ausgeben; die Headerzahlen an dieselbe Definition anpassen.
- [MAJOR] `S121.mdx:626-637, 646-648` — Die Schätzfrage („Findet Newton die
  einzige Nullstelle von arctan von jedem Startpunkt aus?", `loesung="nein"`)
  wird von der Konsolidierung im selben Kasten beantwortet, samt der Zahl aus
  dem `verdeckt`-Feld: „ab $|x^{(0)}| > 1{,}3917$ überholt jeder Schritt den
  vorigen, und die Iterierten … laufen auseinander". Im Render-Pass in Phase
  „tippen" bestätigt („1,3917" im Kastentext). Zugleich ist damit die
  Selbsttest-Zahlfrage `S121.mdx:957-966` (`loesung=1.39`) beantwortet. Fix: den
  Satz in `verdeckt` verschieben.
- [MINOR] `S121.mdx:639-641` — Die Konsolidierung nennt die Fehlerfolge
  „8,6·10⁻² und 2,5·10⁻³ auf 1,6·10⁻¹²". Das ist der Lauf ab x⁽⁰⁾ = 1; die
  **Voreinstellung** des Widgets ist aber x⁽⁰⁾ = 3 (`S121Newton.tsx:121`), und
  dort steht in der Tabelle 4,19·10⁻¹ / 4,79·10⁻² / 7,85·10⁻⁴ / 2,18·10⁻⁷
  (nachgerechnet, im Browser bestätigt). Der Leser sucht Zahlen, die nicht da
  sind. Fix: Startwert auf 1 setzen oder die Prosa auf den Vorgabelauf umstellen.
- [MINOR] `S121Newton.tsx:160` / `S121.mdx:645` — `K_MAX = 8`; die
  Konsolidierung behauptet für x⁽⁰⁾ = 1,05 „der Lauf braucht zehn Schritte statt
  fünf". Im Widget endet der Regler bei 8, und dort steht „am Ziel nach 8
  Schritten". Der beworbene Fall ist nicht vorführbar (F8). Fix: `K_MAX` auf 12
  heben oder die Prosa auf das anpassen, was das Widget zeigt.
- [NOTE] `S121Newton.tsx:268` — Der „am Ziel"-Text erklärt den Quotienten immer
  am Beispiel x² − 2, auch wenn gerade das kubische Beispiel oder arctan läuft.
  Als Rückverweis lesbar, aber am kubischen Beispiel steht dann eine Zahl
  (0,3536), die zur gezeigten Tabelle nicht gehört.
- Gut: Der Header (`Z. 52-59`) zählt auf, **wie oft** jeder Verdikt-Zweig über
  das Reglerraster feuert, und erklärt, warum der Zweig „flache Tangente"
  zusätzlich `|f′| < 1` verlangt. Genau diese Buchführung verlangt F8. Alle fünf
  Zweige im Render-Pass erreicht (waagerechte Tangente bei x⁽⁰⁾ = 1, Divergenz
  ab 1,40 auf arctan, weiter erster Schritt bei 1,05, am Ziel, unterwegs).
- F1/F6: „historische Notiz", kein Skript. Nachgerechnet ✓: arctan-Schwelle
  1,391745200 (löst arctan(ξ)(1+ξ²) = 2ξ), die Divergenzfolge
  1,5 → −1,694080 → 2,321127 → −5,114088 → 32,295684 → −1575,32, f′(1,05) =
  0,3075 mit erstem Schritt nach 4,277236.

## S121Fixpunkt.tsx (12.1)

FixpunktSpirale — KEEP — Vier Zweige mit vorbildlicher Drei-Zustands-Behandlung
bei ρ = 1; die Ablesetafel gibt die Lösung der Schätzfrage preis.

- [MAJOR] `S121Fixpunkt.tsx:291-293` und `S121.mdx:878-880` — Die Schätzfrage
  fragt „Das dritte System hat A = diag(1, 10) … Ab welchem γ divergiert es?"
  (`loesung={0.2}`, `S121.mdx:861-866`). Die Antwort steht an zwei Stellen
  sichtbar: die Ablesetafel des Widgets zeigt dauerhaft
  „bestes γ ≈ … · Divergenz ab γ > …" (für das dritte System 0,20), und jeder
  Verdikt-Zweig nennt `sys.gammaMax` im Klartext (Z. 183, 209); dazu sagt die
  Konsolidierung im selben Kasten „erst unterhalb von $0{,}2$ läuft die Iteration
  zusammen". Im Render-Pass in Phase „tippen" bestätigt. Ein Klick auf das dritte
  System genügt. Fix: die Zeile „Divergenz ab γ > …" erst nach dem Auflösen
  zeigen (die `Schaetzfrage` reicht `aufgeloest` an eine Render-Prop durch) und
  Z. 878-880 in `verdeckt` verschieben.
- [MINOR] `S121Fixpunkt.tsx:155-164, 294-299` — Divergente Bahnen werden über
  `q()` auf den Fensterrand geklemmt; das Bild zeigt dann eine dichte
  Punktwolke auf dem Rahmen, die wie Konvergenz gegen eine Ecke aussieht. Der
  erklärende Satz steht in der Ablesetafel, nicht am Bild. Fix: geklemmte Punkte
  in Rot und ohne Verbindungslinie zeichnen.
- Gut: Die Behandlung von ρ = 1 ist genau die Drei-Zustands-Regel — bei
  γ = 0,2 auf A = diag(1, 10) ist ρ exakt 1, und das Verdikt sagt dann
  „Gewachsen ist er nicht: Bei ρ = 1 hält die Iteration den Fehler in mindestens
  einer Richtung genau fest" statt einfach „divergiert" (im Browser ausgelöst).
  Alle vier Zweige erreicht, das Optimum γ* ist auf dem 0,01-Raster für alle drei
  Systeme wirklich erreichbar (0,29 / 0,20 / 0,18).
- F1/F6: `S121Fixpunkt.tsx:23-32` — „historische Notiz", kein Skript.
  Nachgerechnet ✓: ρ(0,25) = 0,4045 und ρ(2/7) = 0,3194 für A = (4 1; 1 3),
  ρ_min = 2/√5 = 0,8944 für die Drehung, ρ(0,25) = 1,5 und ρ(2/11) = 0,8182 für
  diag(1, 10).

## S122Sattel.tsx (12.2)

SattelpunktWidget — KEEP — Drei verlinkte Darstellungen und vier Zweige, die die
Sattelgeometrie wirklich erklären; die Antwort steht im Preset-Knopf.

- [MAJOR] `S122.mdx:385-387` und `S122Sattel.tsx:108` — Die Schätzfrage fragt
  „Von welchen Startpunkten aus läuft der *Gradientenabstieg* in den
  Sattelpunkt?" mit der Option „nur von der grünen Achse aus" (`loesung="achse"`,
  `S122.mdx:389-401`). Der Einleitungssatz **über** der Frage nennt bereits „der
  Sonderfall auf der grünen Achse", und der Preset-Knopf heißt wörtlich
  „Startstrahl y = 0" — beides im Render-Pass in Phase „tippen" sichtbar. Die
  Konsolidierung (Z. 408-411) setzt mit „Nur auf dem Startstrahl y = 0 kriecht
  auch er hinein" nach. Fix: den Preset neutral benennen („der zweite Start"),
  Z. 385-387 auf „drei Voreinstellungen, die sich lohnen" kürzen und Z. 408-411
  in `verdeckt`.
- [MINOR] `S122Sattel.tsx:70` / `S122.mdx:409-411` — `SCHRITTE = 8`; die
  Konsolidierung behauptet „aus $x = 1{,}5$ stehen die Iterierten dann nach
  zwanzig Schritten bei $1{,}4 \cdot 10^{-6}$". Das Widget rechnet nur acht
  Schritte und meldet „steht nach 8 Schritten bei 0,0059" (im Browser
  bestätigt). Der beworbene Zustand ist unerreichbar (F8). Fix: entweder die
  Schrittzahl regelbar machen oder die Prosa auf acht Schritte umstellen.
- [MINOR] `S122Sattel.tsx:409-417` / Header `Z. 55-56` — Der Header nennt den
  Fall „γ = 0,5 macht den x-Faktor exakt null (ein Schritt genügt)"; der Regler
  endet bei 0,45. Der Fall ist nicht einstellbar. Fix: `max` auf 0,5 heben, dann
  ist der didaktisch schönste Fall (Newton-Schritt in einer Richtung) auch
  vorführbar.
- [MINOR] `S122Sattel.tsx:379-383, 399-404, 439-461` — Drei Prosablöcke im
  Widget (zwei Tafelbeschriftungen à vier Sätze plus eine Infobox mit drei
  Absätzen). Zusammen mehr Text als das Verdikt. README-widgets: Motivation
  gehört in den Absatz davor.
- [NOTE] `S122Sattel.tsx:427-437` — Der Knopf „ein Newton-Schritt" setzt den
  Punkt hart auf (0; 0), statt den Schritt zu rechnen. Für dieses quadratische f
  ist das Ergebnis identisch und im Header begründet; bei einer späteren
  Änderung der Funktion wäre es still falsch.
- [NOTE] Farbrollen: Grün markiert hier die x-Achse (Minimumsrichtung), Rot die
  y-Achse (Maximumsrichtung) — im Kapitel-Farbcode sind das „Optimum" und
  „Divergenzwarnung". Die Übertragung auf Richtungen ist im Header (Z. 37-41)
  begründet und in sich stimmig; ein Satz im Bauauftrag würde sie absichern.
- Gut: Alle vier Zweige im Render-Pass erreicht (stationär, Startstrahl y = 0,
  Maximumsachse, entkommt), und der Zusatzsatz zum Newton-Schritt erscheint nur,
  wenn der Knopf gedrückt wurde. Die 3D- und Schnitt-Tafeln behaupten keine
  eigenen Zahlen (D7 eingehalten).
- F1/F6: „historische Notiz", kein Skript. Nachgerechnet ✓: Faktoren 0,5 / 1,5
  bei γ = 0,25, Endpunkt (5,8594·10⁻³; 10,2516) nach acht Schritten,
  1,5 · 0,5²⁰ = 1,431·10⁻⁶.

## S123NelderMead.tsx (12.3)

NelderMeadSimplex — KEEP — Der Zugzähler ist genau das richtige Beweismittel,
und der zweite Startsimplex macht den vierten Zug erreichbar; die
Konsolidierung nimmt das Ergebnis vorweg.

- [MAJOR] `S123.mdx:145-149` — Die Schätzfrage fragt „Welcher der vier Züge
  fällt auf dieser Testfunktion am häufigsten?" (`loesung="kontraktion"`,
  `S123.mdx:130-143`). Die Konsolidierung im selben Kasten nennt die volle
  Statistik: „der Zähler steht dann auf $23$ Kontraktionen, $13$ Reflexionen und
  $4$ Expansionen; ein Schrumpfschritt … kommt auf diesem Weg gar nicht vor". Im
  Render-Pass in Phase „tippen" bestätigt. Fix: Zahlen in `verdeckt`, in der
  Prosa nur die Formbeobachtung (Z. 149-154) stehen lassen.
- [MINOR] `S123NelderMead.tsx:295-299` — Der Absatz über die Zielfunktion steht
  wörtlich schon in der MDX-Prosa vor dem Kasten (`S123.mdx:125-126`). H6.
- [NOTE] `S123NelderMead.tsx:216-220` — Der Kontraktions-Zweig sagt „Im
  gekrümmten Rosenbrock-Tal ist das der häufigste Zug" und verrät damit die
  Antwort schon beim ersten Kontraktionsschritt. Weil der Zugzähler das ohnehin
  zeigt, ist das erträglich; als Prüfmittel wäre der Zähler allein sauberer.
- [NOTE] `S123NelderMead.tsx:231` — Das Widget bringt seinen eigenen weißen
  Kasten mit (`rounded bg-white p-3`), sitzt aber schon im `:::interaktiv`-Kasten:
  ein Rahmen im Rahmen. Dasselbe in S123GdStepper, S123Canyon und S123Armijo.
- Gut: `Stepper … playable` startet nie von selbst und ist rückwärts begehbar;
  der Lauf wird deterministisch aus `(Start, k)` gerechnet, es gibt keinen
  versteckten Zustand (F2/F4 ✓). Im Render-Pass bestätigt: Schritt 40 des
  ersten Simplex liefert exakt 13 / 4 / 23 / 0 und f = 6,48·10⁻⁷, der zweite
  Startsimplex den Schrumpfschritt bei Schritt 4.
- F1/F6: `S123NelderMead.tsx:24-34` — „historische Notiz", kein Skript. Die
  beiden Zählerstände habe ich im Browser nachgeprüft.

## S123GdStepper.tsx (12.3)

GdStepper1D — KEEP — Fünf Verdikt-Zweige, die exakt die fünf Fälle der
Bemerkung sind; die Antwort steht in der eigenen Ablesetafel.

- [MAJOR] `S123GdStepper.tsx:288` — Die Ablesezeile lautet dauerhaft „f(x) =
  (x − 2)² + 1, f′(x) = 2x − 4, L = f″ = 2, **also 1/L = 0,5 und 2/L = 1**". Die
  Schätzfrage darüber fragt „Ab welchem γ läuft die Iteration davon?"
  (`loesung={1}`, `S123.mdx:256-264`); die Antwort steht also im Startzustand
  über dem Eingabefeld (im Render-Pass in Phase „tippen" bestätigt), verstärkt
  durch den Einleitungssatz „liegen die beiden Schwellen direkt auf dem
  Reglerraster" (`S123.mdx:252-253`). Fix: die Zeile auf „L = f″ = 2" kürzen und
  die abgeleiteten Schwellen erst im Verdikt nennen — dort stehen sie ohnehin.
- [MINOR] `S123.mdx:250-265` — Der Kasten endet **ohne** Konsolidierung; die
  Auflösung steht im nachfolgenden Bemerkungsblock (Z. 271-309) außerhalb des
  Kastens. Im Druckexport steht neben dem Platzhalter dann nichts, was die
  Einsicht trägt (A4). Fix: zwei bis vier Sätze in den Kasten holen.
- Gut: Fünf Zweige (γ < 1/L, γ = 1/L, 1/L < γ < 2/L, γ = 2/L, γ > 2/L), alle im
  Render-Pass ausgelöst; die beiden Gleichheitsfälle werden über den
  **kontrollierten** Parameter γ erkannt (`|γ − 1/L| < 1e−9` auf einem
  0,05-Raster), nicht über einen abgeleiteten Float — genau die Drei-Zustands-
  Regel. Der Zustand wird deterministisch aus (γ, x₀, k) gerechnet, der Regler
  ist scrubbar.
- F1/F6: `S123GdStepper.tsx:21-26` — „historische Notiz", kein Skript.
  Nachgerechnet ✓: die Fehlerfolge 2,5 / −0,5 / 0,1 / −0,02 bei γ = 0,6 und die
  sieben Faktoren 1 − 2γ.

## S123Canyon.tsx (12.3)

CanyonWidget — KEEP — Der ehrlichste Header des Kapitels; nur die
Konsolidierung nimmt der Schätzfrage die Arbeit ab.

- [MAJOR] `S123.mdx:699-701` — Die Schätzfrage fragt nach der Schrittzahl bei
  κ = 100 (`loesung={336}`, `S123.mdx:689-697`). Die Konsolidierung im selben
  Kasten sagt „bei $\kappa = 10$ sind es $35$ Schritte …, bei $\kappa = 25$ schon
  $88$ und bei $\kappa = 100$ dann $336$". Im Render-Pass in Phase „tippen"
  bestätigt („336" im Kastentext). Fix: die drei Zahlen in `verdeckt`; die
  Ablesetafel des Widgets nennt sie ohnehin, sobald der Leser κ verstellt.
- [NOTE] `S123Canyon.tsx:193-200` — Zwei Verdikt-Zweige („γ = 1/μ trifft die
  flache Richtung exakt", „beide Richtungen schießen über") feuern auf dem
  Reglerraster nie. Das ist **im Header dokumentiert** (Z. 53-59: „sie bleiben als
  Absicherung stehen und sind hier ausdrücklich als unerreichbar dokumentiert").
  So gehört F8 gehandhabt; als Aufräumarbeit ließen sich beide entfernen oder
  das Raster so wählen, dass γ = 1/μ trifft.
- Gut: Drei Tafeln (Höhenlinien, halblogarithmische Fehlerkurve, 3D-Fläche) mit
  demselben Zustand; die Schranke des Satzes wird nur gezeichnet, wenn sie
  überhaupt gilt (`schrankeGilt`, Z. 140, 349), sonst steht in Rot „für γ > 1/L
  gibt der Satz keine Schranke her" — eine der besten Ehrlichkeits-Anzeigen des
  ganzen Skripts. Sechs Zweige im Render-Pass erreicht (κ = 1 in einem Schritt,
  γ = 1/L exakt, Zickzack, monoton, γ = 2/L, Divergenz).
- F1/F6: `S123Canyon.tsx:40-59` — „historische Notiz", kein Skript.
  Nachgerechnet ✓ (alle Schrittzahlen exakt): γ = 0,9·2/L → 31 / 35 / 88 / 336
  für κ = 1 / 10 / 25 / 100; γ = 1/L → 1 / 64 / 161 / 608.

## S123Armijo.tsx (12.3)

ArmijoWidget — KEEP — Der einzige Kasten des Kapitels ohne Spoiler, weil er ohne
Schätzfrage auskommt; Aufgabe, Verdikt und Konsolidierung greifen sauber
ineinander.

- [MINOR] `S123Armijo.tsx:264-268, 295-298` — Zwei zusätzliche Erklärabsätze im
  Widget. Der zweite (warum der c-Regler bei 0,05 beginnt) ist eine
  Bau-Erläuterung und gehört in den Header, nicht auf die Seite.
- [NOTE] `S123Armijo.tsx:62-65, 78` — Die Voreinstellung ist `c = 0,2`, keiner
  der beiden Presets („c = 0,05: Praxis", „c = 0,3: Lehrbuch"); im Startzustand
  ist deshalb kein Knopf aktiv. Die MDX-Konsolidierung spricht von „der
  Voreinstellung" und meint diesen dritten Wert — das stimmt (γ = 1 verworfen,
  γ = 0,5 angenommen, nachgerechnet), liest sich aber wie ein Preset.
- [NOTE] `S123Armijo.tsx:132-135` — Der „abgebrochen"-Zweig ist unerreichbar;
  im Header (Z. 35-39) ausdrücklich als Absicherung deklariert, mit der
  gemessenen Höchstzahl 16 Verkleinerungen. Ich habe das Raster nachgerechnet:
  Maximum 16, angenommen bei x = (−1,75; −2), c = 0,5, ρ = 0,9 — exakt die
  Angabe des Headers.
- Gut: Die Konsolidierung (`S123.mdx:851-859`) beantwortet die vorher gestellte
  Frage in vier Sätzen und bleibt im Kasten. Der Zweig „kein Gradient, keine
  Suchrichtung" ist über x = (0; 0) erreichbar (Reglerraster 0,25).
- F1/F6: „historische Notiz", kein Skript. Nachgerechnet ✓: φ(0) = 15,
  φ(1) = 40, φ(0,5) = 8,75, γ* = 1/3, c = 0,3 → γ = 0,25 mit φ = 7,1875.

## S124Newton.tsx (12.4)

NewtonParabelLab — KEEP — Sechs Zweige, korrekt gezählte Schritte, das
Modell-Overlay macht den Mechanismus sichtbar; die Konsolidierung verrät den
Preis.

- [MAJOR] `S124.mdx:214-224` — Die Schätzfrage fragt „Wo landet Newton auf der
  nicht-konvexen Funktion, wenn wir bei $x^{(0)} = 0{,}5$ starten?"
  (`loesung="max"`). Die Konsolidierung im selben Kasten antwortet: „$0{,}5$
  landet in einem einzigen Schritt exakt auf dem lokalen Maximum bei $0$". Im
  Render-Pass in Phase „tippen" bestätigt. Fix: Satz in `verdeckt`.
- [NOTE] `S124Newton.tsx:132-149` — Drei der fünf Ausgänge („flach", „weg",
  „maxIter") sind reiner Rechenschutz; das steht als Kommentar über der Funktion
  (Z. 126-131) und ist damit sauber dokumentiert.
- Gut: Anders als S121Newton zählt dieses Widget die Schritte korrekt
  (`xs.length - 1`, Z. 261 ff.). Im Render-Pass bestätigt: x⁽⁰⁾ = 0,5 → „im
  lokalen Maximum gelandet … nach 1 Schritt"; 1,2 → „nur ein lokales Minimum …
  in 14 Schritten" plus der Zusatz über f″ = −0,08 und den Sprung nach −25,2;
  2,5 → „globales Minimum … in 5 Schritten"; auf der konvexen Funktion ab 4,5 →
  „aus dem Definitionsbereich gesprungen". Alle Zahlen decken sich mit der
  Konsolidierung.
- F1/F6: `S124Newton.tsx:44-54` — „historische Notiz", kein Skript.
  Nachgerechnet ✓: f″(1,2) = −0,08, erster Schritt −25,2; kritische Punkte −1,
  0, 2 mit f = 1,5833 / 2 / −0,6667.

## S124Bfgs.tsx (12.4)

BfgsStepper — KEEP — Sauberer Stepper mit Sekantenprobe; keine Schätzfrage,
keine Spoiler.

- [NOTE] `S124Bfgs.tsx` — Der Schrittregler ist ein `Slider` statt eines
  `Stepper`; damit fehlen ◀ ▶ ⏮ und die Schrittnarration. Für acht Schritte ist
  das brauchbar, weicht aber vom Muster der übrigen Stepper des Kapitels ab (G5).
- Gut: Drei Zweige, alle im Render-Pass erreicht (Ausgangslage B₀ = I, „der
  erste Schritt geht zu weit" bei α = 1, „nach n = 2 Schritten exakt" mit
  Häkchen). Das Häkchen für die exakte Schrittweite ist genau die
  Fallunterscheidung, um die es geht, und die Konsolidierung im Kasten
  (`S124.mdx:527-540`) nennt beide Ergebnisse in vier Sätzen.
- F1/F6: `S124Bfgs.tsx:27-37` — „historische Notiz", kein Skript. Die im Browser
  angezeigten Werte (f: 15 → 40 → 2,963 …, Abstand 0,011 nach sechs Schritten,
  α₀ = 1/3 und α₁ = 0,6 bei exakter Suche) decken sich mit dem Header.

## S124Momentum.tsx (12.4)

MomentumVergleich — KEEP — Acht Verdikt-Zweige und ein echter Seite-an-Seite-
Vergleich; die Konsolidierung verrät beide Zahlen, und eine Zahl der Prosa ist
im Widget gar nicht ablesbar.

- [MAJOR] `S124.mdx:699-701` — Die Schätzfrage fragt „Hilft der Standardwert
  $\alpha = 0{,}9$ bei einer *gut* konditionierten Quadrik, etwa $\kappa = 5$?"
  (`loesung="nein"`). Die Konsolidierung im selben Kasten: „Bei $\kappa = 5$
  dreht sich das Ergebnis sogar um: $106$ Schritte mit gegen $31$ ohne
  Momentum." Im Render-Pass in Phase „tippen" bestätigt. Damit ist auch die
  Selbsttest-Zahlfrage `S124.mdx:914-923` (`loesung=31`) erledigt (H4). Fix:
  Zahlen in `verdeckt`.
- [MINOR] `S124Momentum.tsx:74` / `S124.mdx:702` — `PRUEFE = 400`: Bei κ = 100
  meldet das Widget „der reine Gradientenabstieg schafft es in 400 Schritten
  nicht" (im Browser bestätigt), während Prosa und Header die Zahl **608**
  nennen. Nachgerechnet stimmt 608, sie ist im Widget nur nicht zu sehen (F8).
  Fix: `PRUEFE` auf 1000 heben — die Rechnung kostet nichts.
- [MINOR] `S124Momentum.tsx:196, 219` — Schweizer „ss" statt „ß" in
  lesersichtbarem Verdikttext: „grössere Schritte", „schiessen über das Tal
  hinaus", „Grössenordnungen". Einzelfall im ganzen Kapitel.
- Gut: Acht Zweige, im Render-Pass erreicht: α = 0 (beide Wege identisch), „hier
  schadet der Schwung" (κ = 5: 106 gegen 31), „nur Momentum kommt an" (κ = 100),
  „nur Momentum bleibt stabil" (γL = 2,5), „beide divergieren". Die
  Stabilitätsgrenzen 2 und 2(1 + α) sind am Regler ablesbar, weil γ als
  Vielfaches von 1/L geführt wird — ein guter Griff.
- F1/F6: `S124Momentum.tsx:29-39` — „historische Notiz", kein Skript.
  Nachgerechnet ✓, alle vier Paare exakt: κ = 5 → 31/106, κ = 10 → 64/103,
  κ = 25 → 161/103, κ = 100 → 608/121.

## S125Lagrange.tsx (12.5)

LagrangeGeometrie — KEEP — Drei Modi, sechs Statustexte und eine korrekte
KKT-Argumentation; nur das Verdikt-Zeichen passt in einem Modus nicht zum Text.

- [MINOR] `S125Lagrange.tsx:473` — Die Verdikt-Art hängt allein an `parallel`.
  Im Modus „x + y ≤ 1" steht deshalb im Punkt (0,5; 0,5) ein grünes ✓ mit dem
  Titel „die Pfeile sind parallel", während der Text darunter erklärt, dass genau
  dieser Punkt **kein** KKT-Punkt ist („Die duale Zulässigkeit … verbietet das:
  Kein Randpunkt ist ein KKT-Punkt"). Zeichen und Aussage widersprechen sich
  (E3/D1). Fix: `kind` aus dem Modus mitableiten — im „le"-Modus `warn` mit dem
  Titel „parallel, aber μ < 0: kein KKT-Punkt".
- [NOTE] `S125Lagrange.tsx:258-263` — Vierzeilige Legende im Widget; hier
  vertretbar, weil sie fünf Farbrollen auf einmal erklärt.
- Gut: Kein Schätzfragen-Spoiler (der Kasten hat keine); die Frage steht vorher
  (`S125.mdx:140-141`), die Konsolidierung danach im Kasten. Die
  Parallelitätsprüfung läuft über das Kreuzprodukt und wird bei t = 0,50 exakt
  null, weil der Regler auf 0,05 rastet — Drei-Zustands-Regel eingehalten. Der
  „zum Optimum"-Knopf heißt im „le"-Modus korrekt „zum Berührpunkt (0,5; 0,5)",
  weil das Optimum dort nicht auf der Geraden liegt.
- F1/F6: „historische Notiz", kein Skript. Nachgerechnet ✓: auf der Geraden ist
  f(t, 1−t) minimal bei t = 0,5 mit f = 0,5; das Kreuzprodukt 4t − 2
  verschwindet nur dort; λ* = −1, μ = 1 bzw. μ = −1 je nach Modus.

## S125RidgeLasso.tsx (12.5)

RidgeLassoGeometrie — REVISE — Der Seite-an-Seite-Vergleich sitzt, aber das
Verdikt widerspricht in einem erreichbaren Fenster der eigenen Ablesezeile, und
im Startzustand steht die Lösung der Schätzfrage darin.

- [MAJOR] `S125RidgeLasso.tsx:228-231` — Der mittlere Zweig behauptet „Beide
  Nebenbedingungen binden noch, beide Multiplikatoren sind nach Satz 12.5.7
  positiv". Er greift für jedes r über 1,30, solange nur die **Lasso**-Bedingung
  aktiv ist (`else if (lasso.aktiv)`). Für r zwischen 1,85 und 2,45 (13
  Reglerstellungen) ist die Ridge-Bedingung aber längst inaktiv: Im Browser bei
  r = 1,90 reproduziert — unter der linken Tafel steht „NB inaktiv, μ = 0",
  während das Verdikt darunter „beide Nebenbedingungen binden noch" sagt. Fix:
  einen vierten Zweig für „nur noch Lasso bindet" einziehen und `ridge.aktiv`
  im Text auswerten.
- [MAJOR] `S125RidgeLasso.tsx:226` und `S125.mdx:318-319` — Die Schätzfrage
  fragt „Bis zu welchem Radius $r$ bleibt die Lasso-Lösung in der Ecke?"
  (`loesung={1.342857}`, `S125.mdx:303-317`). Das Verdikt des Widgets schließt
  im **Startzustand** (r = 1,00) mit „Die Ecke bleibt optimal bis r = 1,3429",
  und die Konsolidierung darunter wiederholt „Die Eckenschwelle liegt bei
  $r = 1{,}3429$". Beides im Render-Pass in Phase „tippen" bestätigt. Fix: den
  Schlusssatz des Verdikts streichen (die Ablesezeile „Ecke!" ist das
  Beweismittel, das die Frage meint) und Z. 318-319 in `verdeckt`.
- [NOTE] `S125RidgeLasso.tsx:218` — Der Schwellentest des Verdikts ist
  `c <= 1.3 + 1e-9`, also an das 0,05-Raster gebunden, während die Panels die
  Ecke geometrisch prüfen. Beide Wege stimmen auf dem aktuellen Raster überein
  (im Browser geprüft: r = 1,30 Ecke, r = 1,35 keine Ecke mehr), koppeln die
  Aussage aber an die Reglerschrittweite.
- Gut: Echter Nebeneinander-Vergleich mit einem gemeinsamen Regler (Muster 4
  richtig umgesetzt), und die Ablesezeile jeder Tafel meldet „Ecke!" bzw. „NB
  inaktiv, μ = 0" — genau die zwei Zustände, um die es geht.
- F1/F6: `S125RidgeLasso.tsx:22-30` — „historische Notiz", kein Skript. Die drei
  Schwellen (Ecke bis 1,342857, Ridge inaktiv ab 1,835756, Lasso ab 2,5) habe
  ich im Browser an den Zustandswechseln bestätigt.

## S126Landkarte.tsx (12.6)

OptimLandkarte — KEEP — Vorbildliche Bedienung (Klick, Zug und zwei Regler auf
derselben Zustandsquelle); die Konsolidierung nennt die Antwort in ihrem ersten
Satz.

- [MAJOR] `S126.mdx:131` — Die Schätzfrage fragt „Wie viele verschiedene
  Grenzwerte findet der Gradientenabstieg auf diesem Ausschnitt?"
  (`loesung="drei"`). Die Konsolidierung beginnt mit „Es sind genau drei." und
  nennt anschließend die Endwerte, womit auch die Selbsttest-Zahlfrage
  `S126.mdx:280-289` (`loesung=0.1085`) erledigt ist. Im Render-Pass in Phase
  „tippen" bestätigt. Fix: erste Zeile in `verdeckt`, den Rest der
  Konsolidierung stehen lassen.
- [MINOR] `S126Landkarte.tsx:178-190` — Die Karte hat weder Achsenstriche noch
  Zahlen; das Verdikt nennt aber Koordinaten wie (0; 1,0357), und die Presets
  heißen „Start (−1,0; −0,5)". Der Leser kann das Gelesene nicht im Bild
  verorten (B3). Fix: vier Ticks je Achse, wie in den übrigen Kapitel-Tafeln.
- [NOTE] `S126Landkarte.tsx:183-186` — `role="img"` auf einem SVG, das
  gleichzeitig Ziehfläche (`surfaceProps`) und Griff ist. Der Doppelpfad über die
  beiden Regler rettet die Tastaturbedienung, aber `role="group"` wäre hier
  korrekt (G3). Dasselbe Muster in S121Newton, S122Sattel und S125Lagrange.
- Gut: Der Gradient ist der **korrigierte** aus dem Bauauftrag
  (`d = 2u/(1 + u²)`, Z. 50-55), nicht die fehlerhafte Folienfassung. Drei
  Verdikt-Zweige, alle über die drei Presets erreichbar; die Schwelle 0,01
  trennt sauber, weil es nur die Endwerte 0 und 0,108456 gibt (von mir über ein
  81 × 81-Raster nachgerechnet: genau drei Grenzwerte, größte Koordinate 1,036).
- F1/F6: `S126Landkarte.tsx:34-42` — „historische Notiz", kein Skript. Alle
  Headerzahlen nachgerechnet ✓.

---

## Kapitel-Fazit (H1–H6)

**H1 Widget-Dichte.** 14 Kästen auf 6 Abschnitte: 12.1 drei, 12.3 vier, 12.4
drei, 12.2/12.5 je zwei, 12.6 einer. In 12.3 stehen vier Kerneinsichten
nebeneinander (Nelder-Mead, Schrittweite 1D, Kondition/Zickzack, Armijo), jede
mit eigenem Kasten — an der oberen Grenze, aber jeder Kasten trägt eine eigene
Aussage. Alle Kästen sind offen, kein Kernwidget steckt in einer Vertiefung. ✓

**H2 Dramaturgie.** Nullstellen (Bisektion → Newton → Fixpunkt) → Optimalität →
ableitungsfrei und erster Ordnung → zweiter Ordnung → Nebenbedingungen → Praxis
in R. Jede Mechanik wird isoliert eingeführt, bevor sie kombiniert wird; der
Kasten in 12.6 ist der Sandkasten und steht ganz am Ende. Vorbildlich. ✓

**H3 Farbrollen.** Blau/grün/orange/rot durchgehend nach dem Bauauftrag
(„KAPITEL 13"). Violett ist im Kapitel frei und wird von fünf Widgets benutzt,
aber mit **wechselnder** Rolle: Graph von f (S121Bisektion, S121Newton,
S123GdStepper, S123Armijo), stationärer Punkt (S122Sattel), Momentum-Bahn
(S124Momentum), KQ-Punkt und erreichte Höhenlinie (S125). Jede Datei begründet
ihre Wahl im Header, und S124Momentum weist ausdrücklich auf die Kollision hin
— trotzdem ist „EINE Farbe = EIN Teilausdruck" damit auf Kapitelebene verletzt.
Fix wäre eine Zeile im Bauauftrag, die Violett festnagelt (etwa: „Violett = das
zweite, verglichene Objekt").

**H4 Selbsttest-Abdeckung.** Alle sechs Abschnitte schließen mit einem Quiz, und
vier haben eine ausdrücklich widget-abhängige Zahlfrage (`S121.mdx:957`,
`S122.mdx:648`, `S124.mdx:914`, `S126.mdx:280`). Drei davon sind durch die
Konsolidierung im Widget-Kasten vorweggenommen (1,3917 / 31 Schritte / 0,1085).
Sauber ist nur `S122.mdx:648`: Der Faktor 1 + 2γ = 1,5 steht in der Ablesetafel
des Widgets, aber in keiner Prosa — das ist die einzige Frage des Kapitels, für
die der Leser das Widget wirklich anfassen muss. Nach dem Verschieben der
Auflösungen in `verdeckt` wären die anderen drei ebenso echte Widget-Fragen.

**H5 Ältere Generation.** Keine. Alle 14 Dateien tragen einen vollständigen
Header mit „DIE EINE EINSICHT", Provenienz (die portierten Rechenkerne sind
einzeln benannt), Farbrollen und Prüfstatus; kein `Math.random`, keine
Idle-Schleife, kein minifizierter Einzeiler, keine hartcodierten Satznummern
(durchgehend `num()`/`ref()`). Im Render-Pass 0 `merror`; bei 390 px kein
kollabiertes SVG (alle Haupttafeln 282–316 px), kein horizontaler Seitenüberlauf
(`scrollX` bleibt 0; die einzige zu breite Box ist eine MathJax-Displayformel in
ihrem eigenen `overflow-x: auto`-Container).

**H6 Länge.** Die Konsolidierungen sind mit 5–9 Sätzen deutlich länger als die
geforderten 2–4 und enthalten fast immer genau die Zahlen, die das Widget
liefern soll. Drei Widgets tragen zusätzlich Erklärabsätze im Kasten
(S122Sattel, S123Armijo, S125Lagrange), teils wörtlich doppelt zur MDX-Prosa
(S123NelderMead).

### Die drei wichtigsten Muster

1. **Der Schätzfragen-Spoiler ist hier systematisch, nicht vereinzelt.** Von den
   **elf** Kästen mit `Schaetzfrage` steht in **allen elf** die Antwort schon in
   der Phase „tippen" im selben Kasten — im Render-Pass einzeln nachgewiesen
   (Boxen 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 13). Zehnmal ist die Konsolidierungs-
   prosa die Quelle, zweimal zusätzlich die Ablesetafel oder das Verdikt des
   Widgets selbst (`S121Fixpunkt.tsx:291-293`, `S123GdStepper.tsx:288`,
   `S125RidgeLasso.tsx:226`), einmal der Preset-Name
   (`S122Sattel.tsx:108`) und einmal ein Satz **vor** dem Kasten
   (`S121.mdx:392-394`). Die Kästen ohne Schätzfrage (Armijo, BFGS, Lagrange)
   sind genau die drei ohne dieses Problem. Ein einziger Durchgang, der die
   Auflösungszahlen konsequent in `verdeckt` schiebt, repariert elf MAJOR-Befunde
   und drei Selbsttestfragen auf einmal.

2. **Beworbene Zustände außerhalb des erreichbaren Zustandsraums.** Vier Stellen
   nennen Zahlen, die das Widget nicht zeigen kann: „zehn Schritte" bei K_MAX = 8
   (`S121Newton.tsx:160`), „nach zwanzig Schritten" bei SCHRITTE = 8
   (`S122Sattel.tsx:70`), γ = 0,5 jenseits des Reglermaximums 0,45
   (`S122Sattel.tsx:409-417`), 608 Schritte jenseits von PRUEFE = 400
   (`S124Momentum.tsx:74`). Alle vier Zahlen sind richtig, nur unbeobachtbar —
   und alle vier ließen sich durch Anheben einer Konstante beobachtbar machen.
   Positives Gegenstück: S123Canyon und S123Armijo dokumentieren ihre
   unerreichbaren Verdikt-Zweige ausdrücklich im Header. So soll F8 aussehen.

3. **Zwei Verdikte, die dem widersprechen, was daneben steht.**
   `S125RidgeLasso.tsx:228-231` behauptet „beide Nebenbedingungen binden noch",
   während die Ablesezeile der Ridge-Tafel im selben Zustand „NB inaktiv, μ = 0"
   meldet; `S121Newton.tsx:267` meldet eine Schrittzahl, die nur die
   Reglerstellung wiedergibt und dem eigenen Header widerspricht. Beides sind
   Einzelfälle in einem sonst sehr sorgfältigen Kapitel, aber es sind die
   einzigen Stellen, an denen der Leser einer falschen Aussage begegnet.

### Numerik-Ehrlichkeit (F1/F6) auf einen Blick

| Datei | Klassifikation |
|---|---|
| S121Bisektion.tsx | historische Notiz, kein Skript — Zahlen von mir bestätigt |
| S121Newton.tsx | historische Notiz, kein Skript — Zahlen bestätigt, Schrittzählung im Verdikt falsch definiert |
| S121Fixpunkt.tsx | historische Notiz, kein Skript — bestätigt |
| S122Sattel.tsx | historische Notiz, kein Skript — bestätigt |
| S123NelderMead.tsx | historische Notiz, kein Skript — bestätigt |
| S123GdStepper.tsx | historische Notiz, kein Skript — bestätigt |
| S123Canyon.tsx | historische Notiz, kein Skript — bestätigt, unerreichbare Zweige dokumentiert |
| S123Armijo.tsx | historische Notiz, kein Skript — bestätigt (Maximum 16 Halbierungen exakt) |
| S124Newton.tsx | historische Notiz, kein Skript — bestätigt |
| S124Bfgs.tsx | historische Notiz, kein Skript — bestätigt |
| S124Momentum.tsx | historische Notiz, kein Skript — bestätigt (alle vier κ-Paare exakt) |
| S125Lagrange.tsx | historische Notiz, kein Skript — bestätigt |
| S125RidgeLasso.tsx | historische Notiz, kein Skript — bestätigt |
| S126Landkarte.tsx | historische Notiz, kein Skript — bestätigt |

**14 von 14** Dateien behaupten Zahlen ohne committetes Prüfskript unter
`scripts/verify/`. Inhaltlich ist keine dieser Zahlen falsch — ich habe jede
einzelne nachgerechnet, einschließlich der Grenzfälle (arctan-Schwelle
1,391745200, Armijo-Maximum 16, Momentum 608/121, Canyon 336). Die Header sind
außerdem ungewöhnlich gründlich: mehrere zählen aus, wie oft jeder Verdikt-Zweig
über das Reglerraster feuert, und benennen die unerreichbaren. Es fehlt
ausschließlich der maschinelle Nachweis. Ein Skript
`scripts/verify/K12/verify-optim.mjs`, das die vierzehn Zahlenblöcke nachrechnet
(Bisektionsschritte, Newton-Fehlerfolgen und arctan-Schwelle, ρ-Werte der drei
Systeme, Sattel-Faktoren, Nelder-Mead-Zugzähler, GD-Faktoren, Canyon- und
Momentum-Schrittzahlen, Armijo-Halbierungen, BFGS-Sekantenresiduen,
Lagrange-Multiplikatoren, Ridge/Lasso-Schwellen, Landkarten-Grenzwerte), würde
die Kapitelschuld auf einen Schlag tilgen — die Rechnungen dafür stehen alle
schon in den Headern, und sie stimmen.
