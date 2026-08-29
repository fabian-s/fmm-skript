# Kapitel 10 — Differentialrechnung: Widget-Didaktik-Review

Scope: `src/chapters/10-differentialrechnung/` — 16 Widget-Dateien (dazu
`S108Kontur.ts` als reine Datenhilfe ohne Komponente) mit **19 exportierten
Widgets** in 9 MDX-Abschnitten; im Browser 18 `:::interaktiv`-Kästen plus die
statische Tafel `MerkregelDiagramm`, die bewusst außerhalb eines Kastens steht.

Zwei Pässe je Widget: volle Quelltextlektüre und Render-Pass per CDP bei 1300 px
und 390 px, mit den Pflicht-Interaktionssequenzen (Regler min/kritisch/max, jeder
Preset, Stepper vor und zurück, Schätzfrage vor **und** nach dem Auflösen).
Kapitel-Farbrollen nachgeschlagen in KONVENTIONEN.md, Abschnitt „KAPITEL 10"
(blau Funktion, grün Ableitungsterm/Linearisierung, rot Restterm, orange
Gradient-/Jacobi-/Hesse-Objekte; violett ist im Kapitel frei und wird
durchgängig für „das vom Leser gewählte Objekt" benutzt — konsistent, kein
Befund). Der **Gradient als Zeilenvektor** (Def. 10.2.1) ist Konvention und
wird nirgends als Fehler gemeldet.

---

## S101Konzeptkarte.tsx (10.1)

TeilZweiKarte — KEEP — Brauchbare Vorschau-Landkarte, aber der Header behauptet
eine Kantenzahl, die weder stimmt noch je geprüft wurde.

- [MAJOR] `src/chapters/10-differentialrechnung/widgets/S101Konzeptkarte.tsx:9-11` —
  Der Header behauptet „15 Knoten, 17 gerichtete Kanten … werden unabhängig
  gezählt". Tatsächlich enthält `edges` (Z. 67-86) **18** Kanten
  (`grep -c "{ from:"` = 18, `grep -c 'id: "'` = 15). Das zitierte Prüfskript
  `scripts/verify/HDR/verify-hdr.mjs:7` enthält an dieser Stelle nur
  `assert.equal(15, 15); assert.equal(17, 17);` — eine Assertion, die nicht
  scheitern kann (F6) und die Drift deshalb nie bemerkt hat. Fix: Knoten und
  Kanten im Skript aus der importierten Datei zählen (`nodes.length`,
  `edges.length`) und den Header auf 18 korrigieren.
- [MINOR] `S101Konzeptkarte.tsx:95-98` — Die vier Gruppenfarben sind hartcodierte
  Hexwerte (`#0f7490`, `#7c5cd6`, `#c2620b`, `#c2417c`) außerhalb von
  `FMM_COLORS`; die Schwesterkarten `01-intro/widgets/S12Landkarte.tsx:97-100`
  und `13-funktionsapproximation/widgets/S131Konzeptkarte.tsx` benutzen dort
  `FMM_COLORS`. README-widgets verbietet eigene Hexfarben. Fix: auf
  `FMM_COLORS.blau/violett/orange/rot` umstellen oder die Ausnahme im Header
  begründen.
- [NOTE] `S101Konzeptkarte.tsx:95-98` — Die Gruppen-Keys `k10/k11/k12/k13`
  stammen aus der alten Kapitelzählung: `k11` beschriftet heute „Kap. 10,
  10.5–10.8", `k13` „Kap. 12". Verwirrend beim Weiterpflegen; Umbenennen kostet
  nichts.

## S101Sekante.tsx (10.1)

SekanteTangenteWidget — KEEP — Sauberes Schätzfrage-Widget mit fünf sinnvoll
getrennten Verdikt-Zuständen; die Auflösung steht allerdings schon als Prosa im
selben Kasten.

- [MAJOR] `src/chapters/10-differentialrechnung/S101.mdx:248-249` — Die
  Konsolidierung im selben `:::interaktiv`-Kasten sagt wörtlich „halbieren wir
  die Schrittweite, so fällt der Restterm auf ein Viertel und der relative
  Fehler auf die Hälfte". Das ist exakt die Lösung der Schätzfrage
  (`S101Sekante.tsx:463-468`, Option „ein Viertel so groß"), und sie ist im
  Render-Pass in der Phase „tippen" vollständig sichtbar (Screenshot
  `s101sek-w1300-00-start`). C7 verletzt. Fix: den Satz in das `verdeckt`-Feld
  der Schätzfrage verschieben und in der Prosa nur die Frage stehen lassen.
- [MINOR] `S101Sekante.tsx:436-448` — Die Auflösungszeile zeigt
  `|rest/restHalb|`; im Zustand „Restterm zufällig null" (kubisch, x = −h/3)
  steht dort „Bei halber Schrittweite stünde dort r(h/2) = −0,009000, also der
  Faktor 0,00" (per CDP reproduziert). Der Faktor 0 ist Unsinn. Fix: den Zusatz
  nur zeigen, wenn **beide** Restterme über der Schwelle liegen.
- [MINOR] `S101Sekante.tsx:473` — Fehlendes Leerzeichen vor dem `ref()`: im
  Browser steht „Genau diese beiden Größen unterscheidetDefinition 10.1.5".
- [NOTE] `S101Sekante.tsx:168-176` — Die Zustände „zufällig null" und
  „lokal gerade" werden über `Math.abs(rest) < 1e-12` auf einem abgeleiteten
  Float erkannt, obwohl beide über die kontrollierten Parameter beschreibbar
  wären (`kurve.id === "betrag"` bzw. `x + h/3 ≈ 0`). Praktisch unkritisch, weil
  der nächste erreichbare Wert um 16 Größenordnungen darüber liegt; für die
  Drei-Zustands-Regel trotzdem sauberer über den Regler.
- F1/F6: `S101Sekante.tsx:39` — „historische Notiz", **kein committetes
  Prüfskript**. Die dort gelisteten Zahlen (r(h) = h², Sekante 1,8 gegen
  Tangente 1,2 bei x = h = 0,6) habe ich im Render-Pass bestätigt.

## S102Gradient.tsx — Widget 1: Gradientenfeld (10.2)

Gradientenfeld — REVISE — Die verlinkte 2D/3D-Tafel funktioniert, aber die
Voreinstellung „Maximum" der zweiten Funktion erreicht den beworbenen Fall
(verschwindender Gradient) gar nicht.

- [MAJOR] `S102Gradient.tsx:445` — Der Preset „Maximum" setzt
  `p: [0.7, 0]`, das Maximum von g(x) = x₁·e^(−‖x‖²) liegt aber bei
  x₁ = 1/√2 = 0,70710678. Am Preset ist ‖∇g‖ = 0,01225 (nachgerechnet), also
  `hatGradient === true`, und das Verdikt liefert die reguläre Aussage „Der
  orange Pfeil steht senkrecht …" statt der Sonderfallaussage. Weil x₁-Regler
  und Zug beide auf 0,05 rasten (`Z. 466, 651`), ist der kritische Punkt der
  zweiten Funktion **überhaupt nicht erreichbar**. Der Header (`Z. 66`) behauptet
  dagegen „∇g(0,7071; 0) = 0 … (Maximum)". F8. Fix: den Preset auf
  `[Math.SQRT1_2, 0]` setzen und für diesen Punkt das Raster aussetzen (oder den
  Knopf ehrlich „nahe am Maximum" nennen).
- [MINOR] `S102Gradient.tsx:654-666` — Zwei Verdikt-Zustände, wo die Mathematik
  drei kennt: „Gradient null" und „alles andere". Der Preset „fast flach"
  (∇f = (0; −0,2), im Render bestätigt) ist genau der nahezu entartete Fall und
  bekommt denselben Text wie ein steiler Punkt. Fix: dritten Zweig
  („Gradient sehr klein – die Richtung ist noch definiert, aber numerisch heikel;
  Höhenlinien liegen hier weit auseinander").
- [MINOR] Render-Pass 390 px (`feld-w390-390.png`): Die dünnen Höhenlinien
  (`Z. 298`, `strokeWidth 0.9`, `opacity 0.35`) sind auf dem Handy praktisch
  unsichtbar; im Bild trägt nur die hervorgehobene Linie. B3/G6. Fix: Opazität
  auf ≈ 0,55 und Strichbreite auf 1,1 anheben.
- Positiv: `width`/`height` am `<svg>` plus `min-w-0 grow basis-60` am Wrapper
  (`Z. 235-240`) — das ist das Muster, das die Kollapsfalle vermeidet (siehe
  S107/S108Newton unten).
- F1/F6: `S102Gradient.tsx:59` — „historische Notiz", kein Skript.

## S102Gradient.tsx — Widget 1b: RichtungsWidget (10.2)

RichtungsWidget — REVISE — Guter Kompass mit sauberer Fallunterscheidung, aber
die gestrichelte „Nulllinie" wird falsch gezeichnet und die Antwort der
Schätzfrage steht als Prosa daneben.

- [CRITICAL] `S102Gradient.tsx:819-827` — Die Linie, die als „Tangente an die
  Höhenlinie: die Richtungen mit ∇f(x)d = 0" kommentiert ist, hat
  `y1 = K_MITTE + K_R·(−g[0]/norm)` und `y2 = K_MITTE − K_R·(g[0]/norm)` — beide
  Ausdrücke sind **identisch**. Sie wird deshalb immer als **waagerechte** Linie
  gezeichnet, auf der Höhe `K_MITTE − K_R·g₁/‖g‖`, und geht nur für g₁ = 0 durch
  den Mittelpunkt. Im Render (`s102kompass-w1300-a-guess.png`, ∇f = (5; 7))
  liegt sie sichtbar oberhalb der Mitte statt senkrecht zum orangen Pfeil. Das
  Verdikt verweist ausdrücklich darauf: „im Kompass liegt d auf der blau
  gestrichelten Nulllinie" (`Z. 971`) — der Leser sieht damit ein falsches
  geometrisches Objekt an genau der Stelle, an der Bem. 10.2.5 bewiesen werden
  soll. Fix: `y2={K_MITTE + K_R * (g[0] / norm)}`.
- [MAJOR] `src/chapters/10-differentialrechnung/S102.mdx:286` — „Dazwischen zählt
  allein der Kosinus des eingeschlossenen Winkels: 60° neben dem Gradienten
  bleiben noch 50 % übrig." Das ist wörtlich die Lösung der Schätzfrage
  (`S102Gradient.tsx:989-995`, `loesung={50}`) **und** die Lösung der
  `:::zahlfrage{loesung=50}` im Selbsttest (`S102.mdx:535-541`). Im Render-Pass
  in der Phase „tippen" voll sichtbar. Fix: Satz in `verdeckt` verschieben.
- [MINOR] `S102Gradient.tsx:808-815` — Der Kompass hat keine radiale Skala; der
  Abstand vom Mittelpunkt trägt eine quantitative Aussage („gemessen am
  Maximum"), ist aber unbeschriftet. B3. Fix: einen Tick-Ring bei 0,5·‖∇f‖ und
  eine Beschriftung „‖∇f(x)‖₂" am Kreisrand.
- Positiv: Die Fallunterscheidung „steilster Anstieg / steilster Abstieg /
  Höhenlinie / dazwischen / kritisch" und die Begründung, warum über **Winkel**
  statt über Funktionswerte verglichen wird (`Z. 384-394`), sind vorbildlich.

## S102Gradient.tsx — Widget 2: AbstiegStepper (10.2)

AbstiegStepper — REVISE — Das Widget verrät seine eigene Schätzfrage im
Verdikt, und der beworbene Grenzfall ρ = 1 ist am Regler nicht erreichbar.

- [MAJOR] `S102Gradient.tsx:1180-1181` — In der Voreinstellung (α = 0,25) steht
  im Verdikt, also **oberhalb der Tipp-Eingabe und vor dem Auflösen**: „Ein
  Stück näher an α = 0,40 ginge es schneller." Die Schätzfrage
  (`Z. 1199-1207`) hat genau `loesung = ALPHA_OPT = 0,4`. Im Screenshot
  `s102abstieg-w1300-a-guess.png` verifiziert. Fix: den α*-Hinweis erst ab
  `aufgeloest` einblenden (die Komponente bekommt das Flag ohnehin schon).
- [MAJOR] `S102.mdx:465-467` — Dieselbe Zahl noch einmal in der
  Konsolidierungsprosa im selben Kasten („die beste Wahl ist die, bei der beide
  Eigenrichtungen gleich schnell schrumpfen, hier α = 0,4"), zugleich Lösung der
  `:::zahlfrage{loesung=0,4}` (`S102.mdx:543-549`). Fix wie oben.
- [MAJOR] `S102Gradient.tsx:1183-1184` — Der Verdikt-Zweig „ρ ≈ 1: der Grenzfall
  α = 2/λ_max = 0,553" ist **unerreichbar**: der Regler rastet auf 0,01
  (`Z. 1146-1149`), und ρ(0,55) = 0,9899, ρ(0,56) = 1,0261 — kein Rasterwert
  fällt in das Fenster [0,999; 1,001] (nachgerechnet). Der beworbene
  Entartungsfall hat also einen toten Zweig. F8. Fix: entweder eine Preset-Taste
  „α = 2/λ_max" mit exaktem Wert setzen oder das Fenster auf ±0,02 in ρ
  aufweiten und den Text auf „nahe am Grenzfall" ändern.
- [NOTE] Erreichbarkeit sonst geprüft: α = 0,05 (ρ = 0,931, kriechend),
  α = 0,4 (Optimum), α = 0,7 mit k = 12 → θ = (−23,8; −38,5), Zweig „fail"
  greift korrekt; Stepper vor und zurück bis k = 0 fehlerfrei.
- Positiv: `ρ²` als Schranke für `L(θ⁽ᵗ⁺¹⁾)/L(θ⁽ᵗ⁾)` ist mathematisch korrekt
  und wird im Verdikt nebeneinandergestellt; die dritte Tafel (ρ über α) wird
  erst nach dem Auflösen gezeigt — das ist genau die richtige Staffelung.

## S103Jacobi.tsx — Widget 1: JacobiFormWidget (10.3)

JacobiFormWidget — STATIC — Vier Fälle, die vollständig nebeneinander in eine
Tafel passen; die Prosa nennt die Tabelle sogar schon.

- [MINOR] `S103Jacobi.tsx:78-144` und `S103.mdx:130-141` — Die eine Einsicht
  („n und m allein entscheiden die Gestalt") hat vier Zustände, die eine
  2×2-Tafel gleichzeitig zeigen könnte; die Prosa verweist unmittelbar davor auf
  „die Übersichtstabelle aus @sec:gradient", die dasselbe leistet. Zwei Regler,
  die vier Bilder nacheinander vorführen, sitzen über ihrer Sprosse der Leiter
  (design-patterns §11). Fix: durch eine statische Vierertafel ersetzen
  (Zahl / Zeile / Spalte / Matrix nebeneinander, jeweils mit dem Verdiktsatz als
  Bildunterschrift) — oder, wenn der Kasten interaktiv bleiben soll, die
  Regler auf 1–4 belassen und wenigstens den Verdikttext auf die vier Fälle
  gleichzeitig sichtbar zeigen.
- [NOTE] Der Verdikt-Text differenziert sauber über alle vier Zustände und
  zitiert Def. 10.1.1, 10.2.1 und 10.3.1 — inhaltlich ist nichts falsch.

## S103Jacobi.tsx — Widget 2: LinearisierungsWidget (10.3)

LinearisierungsWidget — KEEP — Das stärkste Widget des Abschnitts (drei
verlinkte Tafeln, Restterm sichtbar, Flächenfaktor messbar); nur die
Konsolidierung nimmt die Antwort vorweg.

- [MAJOR] `S103.mdx:340-341` und `S103.mdx:345-350` — Die Prosa im selben Kasten
  sagt „fällt der rote Abstand beim Halbieren von h auf ungefähr ein Viertel"
  (= Lösung der Schätzfrage `S103Jacobi.tsx:848-853`, Option „Faktor 4") und
  nennt zusätzlich „|det J| = 1,65" sowie „gegen den Flächenfaktor
  |det J| = 5" — die Lösungen **beider** `zahlfrage`n des Abschnitts
  (`S103.mdx:693-701` und `703-711`). Fix: die Faktorzahl in `verdeckt`
  verschieben; die Determinantenwerte kann der Leser im Widget ablesen, sie
  müssen nicht in der Prosa stehen.
- [MINOR] `S103Jacobi.tsx:770-772` — Die `<M>`-Zeile mit J und det J steht in
  einem `overflow-x-auto`-Kasten; bei 390 px ist sie hinter dem rechten Rand
  abgeschnitten („… det J_f(", Screenshot `lin-w390-390.png`), ohne sichtbaren
  Scroll-Hinweis. Der Wert steht zwar noch einmal im Verdikt, verloren geht also
  nichts. Fix: bei schmaler Breite J und det untereinander setzen.
- [MINOR] `S103Jacobi.tsx:774` — `restQuotient < 1e-9 ? "ok"` ist eine
  Toleranzschwelle auf einem abgeleiteten Float; der exakte Fall wird korrekt
  über `abb.linear` (kontrollierter Parameter) erkannt, der Float-Zweig ist
  redundant und kann bei krummen Abbildungen mit lokal verschwindender Krümmung
  fälschlich „ok" melden. Fix: streichen.
- Positiv: Die Formulierung „Der Restterm bleibt bei jedem h exakt null
  (angezeigt 0,000000, das ist Maschinenrauschen)" ist genau die geforderte
  Ehrlichkeit; im Render bestätigt. Ebenso die Sonderfallzeile für den Wirbel
  („det J überall genau 1"), die durch die Polarrechnung tatsächlich exakt ist.
- F1/F6: `S103Jacobi.tsx:50` — „historische Notiz", kein Skript. Stichprobe im
  Render: Quadrieren, x₀ = (1; 0,5), h = 0,025 → Flächenverhältnis 5,0017 gegen
  det J = 5,0000 ✓; linear → Restterm 0,000000, Verhältnis exakt 1,65 ✓.

## S103Backprop.tsx (10.3)

BackpropWidget — KEEP — Kompakter, korrekter Stepper; die Zahlen des Headers
stimmen mit der Anzeige überein.

- [MINOR] `S103Backprop.tsx:314` — Die Verdikt-Kaskade priorisiert `v.knick`
  vor dem Schrittzustand. Stellt der Leser (wie die Prosa `S103.mdx:618-620`
  ausdrücklich empfiehlt) x₁ = 2 ein, ersetzt der Knick-Text den
  Schritt-für-Schritt-Kommentar über den **gesamten** Lauf, auch bei Schritt 0.
  Fix: Knickhinweis als zweiten Absatz anhängen statt den Schrittkommentar zu
  ersetzen.
- [NOTE] `S103Backprop.tsx:205` — `knick` wird über
  `Math.abs(a[0]) < 1e-12` erkannt; der exakt entartete Zustand ist über den
  kontrollierten Parameter beschreibbar (a₁ = x₁ − 2 = 0 bei x₁ = 2, am Raster
  0,05 exakt erreichbar). Sauberer wäre der Test auf x₁.
- [NOTE] Kein predict-then-reveal, obwohl die Einsicht („die Kette für W₁ endet
  bei J_{f₂}, nicht bei J_{f₁}") die klassische Überraschung dieses Abschnitts
  ist. Eine Auswahl-Schätzfrage („Bei welchem Faktor endet die Kette?") wäre
  hier billig zu haben.
- Nachgerechnet: a₁ = (−1; 2,5), z₁ = (0; 2,5), ŷ = −2,5, L = 6,125,
  ∂L/∂W₂ = (0; −8,75), ∂L/∂W₁ = (0 0; 3,5 7) — alle Headerwerte (`Z. 28-34`)
  konsistent mit dem gerechneten Modell.
- F1/F6: `S103Backprop.tsx:28` — „historische Notiz", kein Skript.

## S104Identitaeten.tsx (10.4)

IdentitaetenSkalarMatrix — KEEP — Ehrliche numerische Gegenprobe mit einer
sauber begründeten Ausnahmestelle.

- [MINOR] `S104Identitaeten.tsx:207` und `:313-321` — `singulaer` ist
  `Math.abs(det) < 1e-8`, das Verdikt sagt „F(x) ist hier singulär". Der exakte
  Fall ist über den kontrollierten Parameter beschreibbar (x = 0 bei den ersten
  beiden Beispielen, am Raster 0,01 exakt erreichbar), der nahezu entartete Fall
  (x = 0,01 … 0,05) bekommt dagegen dasselbe Verdikt wie ein regulärer Punkt —
  „schlecht konditioniert" fehlt als dritter Zustand. Der Rot-Absatz bei
  `Z. 300-309` erklärt die Auslöschung zwar, steht aber außerhalb des Verdikts.
  Fix: dritter Verdikt-Zweig für kleines |det F|; Erkennung des exakten Falls
  über x.
- [NOTE] Kein Bild, nur Tabellen — die eine Einsicht („die Identitäten sind
  nachprüfbar") lebt vom Regler an der Lücke bei x = 0, das trägt gerade noch.
- F1/F6: `S104Identitaeten.tsx:24` — „historische Notiz", kein Skript; die
  Fehlerschranken „größte Abweichung … 6,3e-8" sind auf den ganzen Reglerbereich
  bezogen und nicht nachprüfbar committet.

## S104Anstupsen.tsx (10.4)

AnstupsWidget — KEEP — Vorbildliche Zerlegung endliche Änderung = linearer
Term + Restterm, mit echter Objektmanipulation (Zelle ziehen) und Doppelpfad.

- [MINOR] `S104Anstupsen.tsx:163-165` und `:345-346` — Der Zweig
  `art === "abweichung"` schreibt dem Leser „hier stimmt etwas im Widget nicht".
  Er ist über die frei tippbare Grundmatrix erreichbar (`MatrixInput` ohne
  `min`/`max`, `Z. 311`): mit einem Eintrag der Größenordnung 10⁶ löscht sich
  der zentrale Differenzenquotient (eps = 1e-4) aus und `probeFehler`
  überschreitet 1e-6. Der Leser sieht dann eine Fehlermeldung, wo in Wahrheit
  numerische Auslöschung vorliegt. Fix: Eingabe auf etwa [−20; 20] begrenzen
  **und** den Text auf „hier löscht sich der Differenzenquotient aus" umschreiben.
- [NOTE] Der `role="img"` über dem Zieh-SVG ist unkritisch: `useDrag`
  (`src/lib/widgets/useDrag.tsx:250-253`) vergibt weder `tabIndex` noch eine
  Rolle, im SVG steckt also kein fokussierbares Ziel, das verdeckt würde; der
  Tastaturweg läuft über die drei Regler. Gilt für das ganze Kapitel.
- F1/F6: `S104Anstupsen.tsx:35` — „historische Notiz", kein Skript.

## S104Completion.tsx (10.4, in einer Vertiefung)

MatrixCompletionDemo — REVISE — Starke Einsicht (gleicher Verlust, andere
Lücken), aber der beworbene Pendel-Fall hat keinen Verdikt-Zweig, und der
sichtbare Selbsttest hängt an eingeklapptem Material.

- [MAJOR] `S104Completion.tsx:328-374` — Das Verdikt kennt drei Zustände
  (explodiert / beide klein / neutral). Der Fall, den der Kasten ausdrücklich
  bewirbt — „ab etwa α = 0,14 ein Pendeln des Verlusts" (`S104.mdx:645-646`) und
  im Header „α = 0,15: k = 1 pendelt bei L ≈ 1,11" (`Z. 40-42`) — landet im
  neutralen Zweig. Im Render bei α = 0,15, t = 200 steht dort nur „Nach 200
  Schritten steht der Verlust bei 1,109522 (k = 1) und 0,231166 (k = 2)"; kein
  Wort zum Pendeln. Ich habe den Verlauf nachgerechnet: L oszilliert für k = 1
  zwischen 1,11 und 1,81 und fällt nicht. F8. Fix: vierten Zweig „Der Verlust
  fällt nicht mehr, er pendelt: die Schrittweite ist zu groß für die Krümmung"
  mit Erkennung über `max(L) − min(L)` der letzten Schritte.
- [MAJOR] `S104.mdx:640-646` — Die Konsolidierung im selben Kasten beantwortet
  die Schätzfrage (`S104Completion.tsx:383-393`, „nein, die Lücken bleiben
  offen") und nennt die vier Zahlen 2,5 / 2,4 / 1,583 / 0,909, davon 1,583 als
  Lösung der `:::zahlfrage{loesung=1,583}` (`S104.mdx:710-717`). Im Render in
  der Phase „tippen" sichtbar. Fix: in `verdeckt` verschieben.
- [MAJOR] `S104.mdx:480` / `S104.mdx:710-717` und `S104.mdx:699-708` — Das
  Widget steht in einer `:::::vertiefung`, zwei Fragen des **sichtbaren**
  Selbsttests („Im Completion-Widget: … Welchen Wert sagt das Rang-2-Modell
  voraus?", „Im Widget passt k = 2 die vier Beobachtungen … an") setzen es
  voraus. A8: Sichtbares darf nicht von eingeklapptem Material abhängen. Fix:
  die beiden Fragen in die Vertiefung verschieben oder den Kasten aus der
  Vertiefung herausholen.
- [MINOR] `S104Completion.tsx:225-245` — Im Vergleichsplot ist k = 2 violett,
  in seiner eigenen Zahlentafel dagegen blau/grün wie k = 1. Eine Farbe = eine
  Rolle ist damit nur im Plot durchgehalten. Fix: Titel/Rahmen der k = 2-Tafel
  violett einfärben.
- [NOTE] `S104Completion.tsx:40-41` — Der Header nennt L(300); der Stepper endet
  bei `MAX_SCHRITTE = 200` (`Z. 76`). Die Zahl ist im Widget nicht nachprüfbar.
- Positiv: Der Divergenzzweig ist real erreichbar (ab α ≈ 0,25 wird L NaN, im
  Render bestätigt) und benennt die Ursache statt nur den Messwert. Die
  Headerzahlen L(20) = 1,689e−4 und L(200) = 1,233e−24 habe ich nachgerechnet
  und bestätigt.
- F1/F6: `S104Completion.tsx:33` — „historische Notiz", kein Skript.

## S105Merkregel.tsx (10.5)

MerkregelDiagramm — KEEP — Richtig als statische Tafel gebaut und im Header
ausdrücklich gegen Muster 11 begründet; steht korrekt außerhalb eines
`:::interaktiv`-Kastens mit eigener Bildunterschrift (`S105.mdx:186-196`).

- [MINOR] `S105Merkregel.tsx:104-110` — Alle drei Vorschaukurven werden in BLAU
  gezeichnet, auch die Sprungfunktion H. Der Header (`Z. 22-26`) legt Blau
  aber ausdrücklich auf „Stetigkeit" fest, und H ist in 0 gerade nicht stetig;
  im Mengendiagramm trägt derselbe Fall zu Recht Grau. Fix: die Vorschaukurve in
  `fall.farbe` zeichnen.
- F1/F6: `S105Merkregel.tsx:20` + `:27` — historische Notiz plus Verweis auf
  `scripts/verify/R4/check-r4-claims.mjs`; das Skript existiert, prüft aber
  keine der hier genannten Zahlen. Da die Tafel gar keine Zahlen zeigt, ist das
  praktisch folgenlos — der Header sollte es trotzdem nicht behaupten.

## S105Zoom.tsx (10.5)

ZoomSchaetzung / ZoomWidget — REVISE — Die kanonische Zoom-Figur, aber sie zeigt
an der wichtigsten Stelle die falsche Zahl und scheitert damit an ihrem eigenen
Selbsttest.

- [CRITICAL] `S105Zoom.tsx:96` und `:119-134` — `N = 601` ist eine **ungerade**
  Zahl von Teilintervallen, die Abtastung trifft t = 0 also nie. Bei
  f(x) = |x|, x₀ = 0 zeigt das Widget deshalb „Abweichung von der Geraden:
  0,9983 · w" statt 1, bei f(x) = √|x| und z = 12 „61,3894" statt 64 (beides im
  Render-Pass abgelesen und analytisch bestätigt: 1 − 1/601 = 0,998336 und
  64·(1 − 1/√601) = 61,3894). Der Header (`Z. 51-63`) behauptet „D(w) = 1 für
  jedes w" und „1; 1,414; 2; …; 64"; die `:::zahlfrage{loesung=1 toleranz=0.001}`
  (`S105.mdx:498-508`) ist mit dem abgelesenen Wert **nicht** lösbar. Auch der
  Verdikttext (`Z. 196`) sagt „bleibt die Abweichung beim 0,9983-fachen von w
  stehen". Fix: `N` gerade wählen — `S101Sekante.tsx:104` macht es vor
  („gerade Zahl: der Knick bei x = 0 wird exakt getroffen") — und zusätzlich die
  Knickstellen `kurve.knick` explizit in die Auswertungspunkte aufnehmen.
- [MAJOR] `S105Zoom.tsx:359-362` — Der Header der Abschnittskomponente zitiert
  „Verifiziert (check-s111.mjs, 2026-08-19)". Dieses Skript existiert im Repo
  nicht (`find scripts -name check-s111.mjs` leer), und der Dateikopf
  (`Z. 64`) verweist auf `check-r4-claims.mjs`, das keine der Zoom-Zahlen prüft.
  Der behauptete Nachweis ist also doppelt leer — und hätte, wenn er existierte,
  genau den Befund oben gefunden. Fix: `scripts/verify/K10/S105Zoom.mjs` mit
  D(w) für alle drei Kurven auf der Zoomleiter, Assertion gegen die analytischen
  Werte w, 1, 1/√w.
- [MAJOR] `S105.mdx:211-221` — Die Konsolidierung im selben Kasten beantwortet
  die Schätzfrage (`S105Zoom.tsx:367-375`) für alle drei Kurven vollständig
  („Bei x² halbiert sich …, bei |x| steht sie … bei genau einem w, bei √|x|
  wächst sie"). Im Render in der Phase „tippen" sichtbar. Fix: nach `verdeckt`.
- [MINOR] `S105Zoom.tsx:275-288` — Das SVG trägt keine `width`/`height` und
  wird als Blockelement auf volle Spaltenbreite gestreckt (654 px bei 1300 px
  Viewport, gemessen); dadurch erscheint es rund doppelt so groß wie die
  Tafeln der Nachbarwidgets. Rein optisch, aber die Schriftgrößen im SVG
  skalieren mit. Fix: `width`/`height` wie in `S102Gradient.tsx:238-239` setzen.
- Positiv: Die Fünffach-Fallunterscheidung (glatt / Knick in der Mitte / Knick
  im Fenster / senkrechte Tangente / Ausnahmestelle daneben) ist inhaltlich
  genau richtig, und der exakte Fall wird über den kontrollierten Parameter
  x₀ = 0 erkannt (`Z. 178`).

## S106Kettenregel.tsx (10.6)

KettenregelWidget — KEEP — Sauberer Entartungsfall, gut erklärte numerische
Gegenprobe.

- [MINOR] `S106Kettenregel.tsx:277-283` — Wie bei S105Zoom kein `width`/`height`
  am SVG; das Bild wird auf 654 px gestreckt und fällt aus dem Größenraster des
  Kapitels.
- [NOTE] Kein predict-then-reveal, obwohl die Einsicht („beide Faktoren laufen
  aus dem Ruder, das Produkt bleibt zahm") die überraschendste des Abschnitts
  ist. C7. Eine Auswahlfrage vor dem Widget wäre naheliegend.
- [NOTE] Der entartete Fall x = 0 bei √(x²) wird über
  `Number.isFinite(kette)` erkannt und liefert das inhaltlich richtige Verdikt
  („das Produkt aus ∞ und 0 ist keine Zahl", `Z. 186-194`); der kontrollierte
  Parameter trifft 0 exakt (Raster 0,05). Vorbildlich.
- F1/F6: `S106Kettenregel.tsx:35` + `:47` — historische Notiz plus Verweis auf
  `check-r4-claims.mjs`, das keine der Kettenregelzahlen prüft. Die Kernzahl
  32,768 aus der `zahlfrage` (`S106.mdx:833-841`) ist damit unbelegt (rechnerisch
  aber trivial: 2 · 4 · 1,6³).

## S106Logistik.tsx (10.6, in einer Vertiefung)

LogistikWidget — REVISE — Fachlich sauber (beide Klassen, dieselbe Formel), aber
das Symbol im Widget passt nicht zur Prosa, und der sichtbare Selbsttest hängt
am eingeklappten Kasten.

- [MAJOR] `S106.mdx:570` / `S106.mdx:843-852` — Das Widget steht in der
  `:::::vertiefung[Alternatives Beispiel zur Kettenregel: logistische
  Regression]`, die `:::zahlfrage{loesung=0,693147}` des **sichtbaren**
  Selbsttests verlangt aber „Stellen wir im Logistik-Widget das Merkmal auf
  x = 0". A8. Fix: Frage in die Vertiefung verschieben.
- [MAJOR] `S106.mdx:691-693` — Die Konsolidierung im selben Kasten nennt die
  Lösung dieser Frage wörtlich („eine waagerechte Gerade auf der Höhe
  log 2 = 0,693147"). Fix: die Zahl aus der Prosa nehmen; der Leser liest sie
  im Widget ab.
- [MINOR] `S106Logistik.tsx:249`, `:269`, `:318`, `:188-219` — Das Widget
  schreibt durchgehend „beta" (Reglerbeschriftung, Achsentitel „ℓ(beta)",
  „t = beta·x", Verdikttexte), die umgebende Prosa dagegen β. A7 verlangt
  dieselben Symbole in Prosa und Widget. Fix: „β" verwenden (die übrigen Widgets
  des Kapitels setzen ∇, λ, φ, ‖·‖ problemlos).
- [NOTE] `S106Logistik.tsx:185` — `x === 0` als exakter Vergleich ist hier
  korrekt: x ist der kontrollierte Reglerwert, gerastet auf 0,1.
- [NOTE] Kein predict-then-reveal, obwohl „wie weit kann eine Beobachtung den
  Parameter reißen?" (`S106.mdx:676-678`) die Frage schon stellt und die Antwort
  (|∇ℓ| < |x|, nie erreicht) überraschend ist.
- F1/F6: `S106Logistik.tsx:31` + `:41` — historische Notiz plus
  `check-r4-claims.mjs`, das keine Logistikzahl prüft.

## S107Hesse.tsx (10.7)

HesseSchaetzung / HesseDefinitheit — REVISE — Didaktisch das beste Widget des
Kapitels (vier Preset-Zweige = die Fallunterscheidung, exakter Grenzfall über
den Regler), aber die Haupttafel ist im Browser auf Briefmarkengröße kollabiert.

- [MAJOR] `S107Hesse.tsx:411-508` — Der Wrapper der Höhenlinientafel
  (`<div className="select-none text-[10px] …">`, `Z. 412`) ist ein Flex-Item
  ohne `min-w-0`/`basis`, und das `<svg>` (`Z. 416-421`) trägt nur `viewBox`,
  kein `width`/`height`. Gemessen per CDP: **51 × 47 px bei 1300 px** und
  ebenso winzig bei 390 px (Screenshot `hesse-w390-390.png`) — bei einer
  viewBox von 340 × 316. Damit ist genau die Tafel unbrauchbar, die der Header
  (`Z. 39-42`) als „tot lesbare Hauptdarstellung" deklariert, und die drei
  Fragen der Prosa („Was passiert mit den Höhenlinien …? Welche Achse gehört zur
  langen Halbachse?", `S107.mdx:480-483`) lassen sich am Widget nicht
  beantworten. Duty 2 und 3 fallen aus. Fix: `width={PAD_L+SIZE+PAD_R}`
  `height={SIZE+PAD_B}` am `<svg>` und `min-w-0 grow basis-60` am Wrapper — genau
  das Muster aus `S102Gradient.tsx:235-239`.
- [MAJOR] `S107Hesse.tsx:59` — Der Header zitiert „Skript-Prüfskript
  check-math-s113.mjs"; die Datei existiert im Repo nicht. Der zweite Verweis
  (`Z. 84`, `check-r4-claims.mjs`) deckt von diesem Widget nur
  `assert.deepEqual([2, 8], [2, 8])` ab — eine Assertion, die nicht scheitern
  kann. F1/F6. Fix: `scripts/verify/K10/S107Hesse.mjs`, das H(λ₁,λ₂,φ) aus den
  Reglerwerten rekonstruiert, Spur/Determinante/Eigenwerte gegen die vier
  Presets prüft und die Klassifikation asserted. (Die Headerzahlen selbst habe
  ich per Hand nachgerechnet: H(3,−1,30°) = (2 1,7321; 1,7321 0), Spur 2,
  det −3 ✓; H(−2,−5,60°) = (−4,25 1,299; 1,299 −2,75), Spur −7, det 10 ✓;
  Halbachsen 2 und 1 ✓.)
- [NOTE] Positiv und ausdrücklich zu erhalten: Die Drei-Zustands-Regel ist hier
  mustergültig umgesetzt (`Z. 274-284`) — exakt entartet über die
  kontrollierten Regler λ₁, λ₂ (Raster 0,5, die Null ist exakt erreichbar),
  `eps = 1e-9` nur als Float-Wächter, dazu ein eigener Zweig für H = 0 und ein
  Zusatzabsatz für λ₁ = λ₂. Der Sattel-Text nennt außerdem korrekt, welche der
  beiden Achsen die aufsteigende ist, statt „v₁" zu unterstellen (`Z. 286-291`).
- [NOTE] Die Schätzfrage zielt auf den semidefiniten Grenzfall und ist
  erreichbar (Preset „Rinne" und λ₂ = 0 am Regler); die Konsolidierung
  (`S107.mdx:485-508`) verrät sie nicht — der einzige Kasten des Kapitels ohne
  Spoiler.

## S108Taylor1D.tsx (10.8)

TaylorOrdnungSchaetzung / TaylorOrdnungWidget — KEEP — Klare Ordnungsstaffel mit
ehrlicher Behandlung des nicht monotonen Randes.

- [MAJOR] `S108.mdx:294-296` — Die Konsolidierung im selben Kasten nennt „Bei
  x = 0,5 fällt der Fehler von T₂ auf T₃ um den Faktor 8,2" — die Lösung der
  Schätzfrage (`S108Taylor1D.tsx:210-217`, Option „Faktor 8"). Fix: nach
  `verdeckt`.
- [MINOR] `S108Taylor1D.tsx:120` und `:124-127` — Das Verdikt zeigt den
  **Kehrwert** des gefragten Faktors („hat ihn also auf ein 0,122-faches
  gedrückt"). Die Schätzfrage fragt nach „Faktor 8"; die Zahl 8,2 kommt im
  ganzen Widget nirgends vor, der Leser muss invertieren. Fix: beide Formen
  ausgeben („auf ein 0,122-faches, das ist der Faktor 8,2").
- [NOTE] `S108Taylor1D.tsx:74-82` — `maxFehler` wird bei jedem Render zweimal
  mit 401 Stützstellen ausgewertet, ohne `useMemo`. Kostet hier nichts, ist aber
  gegen die Hausregel.
- F1/F6: `S108Taylor1D.tsx:30`, `:205` — zitiert `rev-s114-a/d.mjs` und
  `check-s114.mjs`, beide **nicht im Repo**. Immerhin deckt
  `scripts/verify/R4/check-r4-claims.mjs` (`Z. 46` zitiert) mit
  `close(Math.exp(.5), 1.6487212707)` und `close(Math.exp(.5) - 1.625, .0237…)`
  zwei der Headerzahlen echt ab.

## S108Taylor2D.tsx (10.8)

Taylor2DSchaetzung / Taylor2DWidget — REVISE — Drei sehr gut verlinkte Tafeln,
aber die Schätzfrage ist in der Voreinstellung bereits beantwortet.

- [MAJOR] `S108Taylor2D.tsx:422-425` und `:616-619` — In der Voreinstellung
  (sin+cos, T₁, r = 0,8) steht **vor** dem Auflösen im Readout „Quotient 4,34"
  und im Verdikt „Der Fehler von T₁ … beim Halbieren fällt er also auf ein
  Viertel, der von T₂ … auf ein Achtel". Die Schätzfrage
  (`Z. 638-645`) fragt genau danach („Faktor 2 / 4 / 8"). Screenshot
  `taylor2d-w390-390.png`. Anders als S101Sekante und S103Jacobi, die den
  Faktor hinter `aufgeloest` verstecken, leckt dieses Widget ihn im
  Grundzustand. Fix: den Quotientenwert und den Merksatz erst ab `aufgeloest`
  zeigen; vorher nur die beiden Kreisfehler nennen.
- [MAJOR] `S108.mdx:513-516` — Zusätzlich nennt die Konsolidierung im selben
  Kasten „Faktor 4,34 … und 8,07"; dieselben Zahlen sind Lösung der
  `:::frage{wahr}` im Selbsttest (`S108.mdx:722-727`). Fix: nach `verdeckt`.
- [NOTE] Sehr gut: Der Fall „Restterm verschwindet selbst" ist im Verdikt
  ausdrücklich abgefangen (`Z. 411-417`) und im Header mit dem tatsächlichen
  Wertebereich des Quotienten dokumentiert (`Z. 63-68`, 2,70 … 7,28 für T₁).
  Das ist genau die geforderte Ehrlichkeit gegenüber „Faustzahl 4".
- [NOTE] `role="img"` über der Tafel mit `DragHandle`: unkritisch, siehe
  S104Anstupsen — `DragHandle` (`useDrag.tsx:283-323`) ist nicht fokussierbar,
  der Doppelpfad läuft über die beiden Regler.
- F1/F6: `S108Taylor2D.tsx:49`, `:69`, `:632` — zitiert `rev-s114-b/f.mjs` und
  `check-s114.mjs` (beide nicht im Repo) sowie `check-r4-claims.mjs`, das von
  diesem Widget nichts prüft.

## S108Newton.tsx (10.8)

NewtonSchaetzung / NewtonStepper — REVISE — Der Stepper und die Fehlertabelle
sind stark; die Höhenlinientafel daneben ist kollabiert, und die Auflösung steht
in der Prosa.

- [MAJOR] `S108Newton.tsx:326-378` — Derselbe Kollaps wie in S107Hesse: der
  Wrapper (`Z. 327`) ist ein Flex-Item ohne `min-w-0`, das `<svg>`
  (`Z. 331-336`) hat nur `viewBox`, kein `width`/`height`. Gemessen: **47 × 44
  px** bei 1300 px (viewBox 282 × 266), ebenso auf dem Handy (Screenshot
  `newton-w390-390.png`). Der Weg der Iterierten, das grün markierte Ziel und
  die Höhenlinien sind damit unsichtbar, obwohl die Prosa sie ausdrücklich
  ankündigt („Die Tafel zeigt die Höhenlinien, den Weg der Iterierten …",
  `S108.mdx:646-647`). Fix wie oben: `width`/`height` setzen, `min-w-0` am
  Wrapper.
- [MAJOR] `S108.mdx:659-662` — Die Konsolidierung im selben Kasten nennt „im
  fünften Schritt steht 1,1·10⁻¹⁵" — die Lösung der Schätzfrage
  (`S108Newton.tsx:441-443`, `loesung={5}`, `toleranz={0}`) und zugleich der
  `:::zahlfrage{loesung=5 toleranz=0}` (`S108.mdx:742-750`). Fix: nach
  `verdeckt`.
- [MINOR] `S108Newton.tsx:271-274` und `:380-415` — Die Aufgabenzeile lautet
  „… beobachten dabei die letzte Spalte der Tabelle". Bei 390 px ist die Tabelle
  473 px breit und scrollt in ihrem eigenen Container; sichtbar sind nur k, x₁,
  x₂ und ein Teil von ‖∇f‖ (Screenshot `newton-w390-390.png`). Die geforderte
  Spalte eₖ/eₖ₋₁² liegt außerhalb des Bildes, ohne Hinweis. C8/G1. Fix: auf
  schmalen Breiten die Spalten x₁/x₂ ausblenden oder die Tabelle in zwei Blöcke
  brechen.
- [MINOR] `S108Newton.tsx:237` — `aktuell.fehler === 0` ist eine Float-Gleichheit
  auf einer abgeleiteten Größe. Der Text („weiter als bis zur Maschinengenauigkeit
  kommt keine Rechnung") ist inhaltlich richtig, die Erkennung sollte trotzdem
  über eine Schwelle relativ zu ‖x*‖ laufen.
- [NOTE] Erreichbarkeit der drei beworbenen Versuche geprüft: x₁ < 0 →
  Sattelpunkt-Zweig, x₁ = 0 → singuläre Hesse-Matrix (Raster 0,25 trifft 0
  exakt, `bahn` bricht korrekt ab), Quadrik → ein exakter Schritt. F8 erfüllt.
- F1/F6: `S108Newton.tsx:33`, `:435` — zitiert `rev-s114-c.mjs` und
  `check-s114.mjs`, beide nicht im Repo; `check-r4-claims.mjs` (`Z. 56`) prüft
  immerhin die Iterierten 1,25 / 1,025 / 1,00030488 echt nach.

---

## Kapitel-Fazit (H1–H6)

**Medienurteile (19 Widgets):** KEEP 9 · REVISE 9 · STATIC 1 · REMOVE 0.
**Severity:** CRITICAL 2 · MAJOR 22 · MINOR 20 · NOTE 19 (die `F1/F6:`-Zeilen
sind Klassifikation, kein eigener Befund).

### Muster 1 — Die Konsolidierung im Kasten steht *neben*, nicht *nach* der Schätzfrage

Acht der neun Schätzfragen des Kapitels sind in der Prosa desselben
`:::interaktiv`-Kastens beantwortet, und der Render-Pass zeigt: In der Phase
„tippen" ist dieser Absatz vollständig sichtbar. Betroffen: `S101.mdx:248`,
`S102.mdx:286`, `S102.mdx:465`, `S103.mdx:340`, `S104.mdx:640`, `S105.mdx:211`,
`S108.mdx:294`, `S108.mdx:513`, `S108.mdx:659`. Dazu kommen zwei Widgets, die
die Antwort in ihrem eigenen Verdikt im Grundzustand ausgeben
(`S102Gradient.tsx:1180`, `S108Taylor2D.tsx:422`). Die Konvention
„Motivation davor, Auflösung danach" (README-widgets, `Aufgabe.tsx:6-9`) ist
für Widgets *ohne* Schätzfrage richtig; sobald eine Schätzfrage im Spiel ist,
gehört die Auflösung in deren `verdeckt`-Feld. In sechs Fällen ist derselbe Satz
zusätzlich die Lösung einer `zahlfrage` des Selbsttests — der widgetabhängige
Selbsttest (H4) verliert damit seine Funktion. **Das ist der mit Abstand
lohnendste Sammelfix des Kapitels**: neun Sätze verschieben.

### Muster 2 — Zwei Haupttafeln sind im Browser auf 50 px kollabiert

`S107Hesse.tsx:416` und `S108Newton.tsx:331` haben `viewBox` ohne
`width`/`height` und sitzen in einem Flex-Container, dessen Item kein `min-w-0`
trägt. Gemessen 51 × 47 px bzw. 47 × 44 px — bei **jeder** Viewportbreite. Beide
Male trifft es die Tafel, die der jeweilige Header als „tot lesbare
Hauptdarstellung" ausweist. Das Muster ist im Kapitel nur deshalb nicht
flächendeckend, weil `S102Gradient.tsx:238` und `S103Jacobi.tsx:311`
`width`/`height` setzen und `S106Logistik`/`S108Taylor2D` ihre Tafeln in ein
`grid` statt in ein `flex` legen. Der Quelltextpass allein hätte das nicht
gefunden, der Screenshot-Pass ohne Ausmessen der Elemente ebenfalls nicht.

### Muster 3 — Prüfskripte, die es nicht gibt, und eines, das nicht scheitern kann

Sechs Header zitieren Prüfskripte, die im Repo fehlen: `check-s111.mjs`
(`S105Zoom.tsx:361`), `check-math-s113.mjs` (`S107Hesse.tsx:59`),
`rev-s114-a/d.mjs` (`S108Taylor1D.tsx:30`), `rev-s114-b/f.mjs`
(`S108Taylor2D.tsx:49`), `rev-s114-c.mjs` (`S108Newton.tsx:33`),
`check-s114.mjs` (drei Stellen). Sieben weitere zitieren
`scripts/verify/R4/check-r4-claims.mjs`, das von ihren Zahlen nichts prüft; für
S107Hesse steht dort `assert.deepEqual([2, 8], [2, 8])`, für die Konzeptkarte in
`scripts/verify/HDR/verify-hdr.mjs:7` `assert.equal(17, 17)` — Assertions, die
per Konstruktion halten. Das ist nicht bloß Buchhaltung: Genau diese leeren
Nachweise haben die **18 statt 17 Kanten** der Konzeptkarte und die
**0,9983 statt 1** des Zoom-Widgets durchgelassen. Die zehn übrigen Widgets
tragen die ehrliche „historische Notiz"; das ist die bessere Lösung als ein
Skript, das nichts prüft. Empfehlung: ein `scripts/verify/K10/`-Verzeichnis mit
je einer Datei für S105Zoom, S107Hesse, S102Gradient (α*, ρ) und
S104Completion (die drei α-Regime), alle gegen unabhängig hergeleitete Werte.

### Muster 4 — Der erreichbare Zustandsraum ist größer als der erklärte

Vier Fälle, in denen ein Header, ein Preset oder die Prosa einen Zustand
bewirbt, den das Verdikt nicht abdeckt oder der Regler nicht trifft:
der ρ ≈ 1-Zweig des Abstiegs-Widgets (auf dem 0,01-Raster unerreichbar,
`S102Gradient.tsx:1183`), das Pendeln der Matrix Completion (kein Zweig,
`S104Completion.tsx:328`), das „Maximum" der zweiten Gradientenfunktion (Preset
0,05 daneben, `S102Gradient.tsx:445`) und der nahezu entartete Fall bei
`S104Identitaeten.tsx:207` (nur zwei Zustände, wo drei nötig sind). Die
Gegenprobe zeigt, dass das Kapitel es auch kann: `S107Hesse.tsx:274-284` und
`S106Kettenregel.tsx:186` erkennen den exakten Entartungsfall über den
kontrollierten Parameter und benennen den mathematischen Grund.

### Weitere Kapitelbefunde

- **H1 (Dichte):** eingehalten — je Abschnitt ein Kernwidget, Zusatzwidgets
  (Kompass, Abstieg, Completion, Logistik) in eigenen Kästen bzw. Vertiefungen.
  10.2, 10.3, 10.4 und 10.8 tragen je drei Widgets; das ist für 16-seitige
  Abschnitte vertretbar, 10.8 mit Taylor1D + Taylor2D + Newton ist die Grenze.
- **H2 (Dramaturgie):** stimmig — 1D-Sekante → Gradient → Jacobimatrix →
  Matrixableitungen, Sandkästen (Completion, Logistik) zuletzt und in
  Vertiefungen.
- **H3 (Farbrollen):** durchgehend eingehalten (blau/grün/rot/orange nach
  KONVENTIONEN.md „KAPITEL 10", violett konsistent für das vom Leser gewählte
  Objekt). Zwei Abweichungen: die vier Hexfarben der Konzeptkarte und die blaue
  Sprungfunktion in S105Merkregel.
- **H4 (Selbsttests):** jeder Abschnitt schließt mit einem Quiz, und je eine
  Frage hängt am Widget — genau die Konvention. Sie wird aber durch Muster 1
  entwertet (sechs Lösungen stehen bereits im Kasten), und zwei
  widgetabhängige Fragen des sichtbaren Selbsttests verweisen auf Widgets, die
  in einer Vertiefung stecken (`S104.mdx:710`, `S106.mdx:843` → A8).
- **H5 (Altbestand):** keine minifizierten Einzeiler, keine `Math.random`, keine
  Leerlauf-Animationen; die Deltas des quantitativen Scans sind in diesem
  Kapitel getilgt. `role="img"` über Ziehflächen ist kein Befund, weil `useDrag`
  und `DragHandle` keine fokussierbaren Ziele erzeugen und jedes ziehbare Objekt
  einen Regler als Doppelpfad hat (Doppelpfad-Regel in allen sieben
  Zieh-Widgets erfüllt).
- **H6 (Länge):** Die Konsolidierungen sind mit 6 bis 10 Sätzen deutlich länger
  als die geforderten 2 bis 4 — besonders `S103.mdx:339-353` (14 Zeilen),
  `S107.mdx:485-508` (23 Zeilen) und `S108.mdx:659-668`. Der Spoiler-Fix aus
  Muster 1 nimmt einen Teil davon von selbst heraus; danach lohnt ein
  Kürzungsdurchgang mit `wc -w`-Baseline.
