# Kapitel 4 (04-fehler) — Widget-Didaktik-Review, 2026-08-29

Nenner: 6 Dateien in `src/chapters/04-fehler/widgets/`, davon 2 reine
MDX-Hilfskomponenten (`S42Local.tsx`, `S43Local.tsx`) ohne Interaktion; 7
`:::interaktiv`-Kästen in S41–S43, S44 ohne Widget.

Render-Pass: eigene CDP-Läufe (Preview 4179, CDP 9333) bei 1300 px und 390 px,
je Widget eine Zustandssequenz (Regler min/kritisch/max, jedes Preset,
Schätzfrage vor **und** nach dem Auflösen). **Hinweis zum Batch:** die
Screenshots unter `shots/04/` zeigen durchgehend rohes TeX (`\(\corange{…}\)`)
— das ist ein Artefakt des Aufnahmeskripts (`Math.tsx` setzt via
IntersectionObserver mit 1500 px rootMargin verzögert; 700 ms Wartezeit
reichen nicht), **kein** Produktfehler. Nach Scroll + 2,5 s Wartezeit ist alles
sauber gesetzt; darauf beruhen die Befunde unten.

---

## S41Widgets.tsx — FehlermassRechner (§4.1, Kasten „Fehlermaß-Rechner")

F1 — KEEP — Geometrisch überzeugend, Doppelpfad sauber, aber der Grenzfall
`‖v‖ → 0` behauptet Undefiniertheit, wo der eigene Readout eine Zahl zeigt.

- [MAJOR] `src/chapters/04-fehler/widgets/S41Widgets.tsx:200-206` — Der Zweig
  `nv < 0.2` textet „der relative [Fehler ist nicht definiert]: Definition 4.1.2
  verlangt ‖v‖ ≠ 0". Im Rendershot mit v = (0,1; 0,1) steht drei Zeilen darüber
  im Readout `δ = 0,0721 … 3691,21 %`. Das ist eine Toleranzschwelle, als
  Gleichheit verkauft (Drei-Zustands-Regel). Fix: „exakt entartet" nur über die
  kontrollierte Eingabe v = (0; 0) erkennen (beide Zahlenfelder auf 0), dazwischen
  eine eigene Stufe „‖v‖ winzig: δ wird riesig, das Band aus Lemma 4.1.3 ist
  formal gültig, praktisch aber wertlos".
- [MAJOR] `S41Widgets.tsx:204-205` — „Auch Lemma 4.1.3 sagt hier nichts mehr" ist
  sachlich falsch. Das Lemma gilt weiter; im selben Shot zeigt das Widget
  −5,079 ≤ ‖ṽ‖₂ = 5,360 ≤ 5,362. Fix: den Satz durch „das Band wird so breit,
  dass es keine Information mehr trägt" ersetzen (die Aussage bleibt wahr).
- [MAJOR] `S41Widgets.tsx:44-54` — F1/F6: „node, historische Prüfung, Skript nicht
  mehr vorhanden". Behauptet werden Bsp. 4.1.4 (‖Δ‖ = 0,36056, δ = 7,2111 %,
  Band [4,63944; 5,36056]) und „δ = 10 % entspricht ‖Δ‖ = 0,5". An der letzten
  Zahl hängt die Zahlfrage `S41.mdx:383` (loesung = 0.5). Klassifikation:
  *„historische Notiz" ohne Skript*. Fix: `scripts/verify/…/S41Fehlermass.mjs`
  mit widerlegbaren Assertions gegen unabhängig gerechnete Werte.
- [MINOR] `S41Widgets.tsx:219-220` — JSX verschluckt das Leerzeichen zwischen
  `{ref(...)}` und der Folgezeile; gerendert steht „Nach Lemma 4.1.3liegt"
  (im Shot verifiziert). Gleiche Stelle nochmals `:227` („…Ring aus" +
  `{ref(...)}`). Fix: `{" "}` einfügen.
- [MINOR] `S41Widgets.tsx:256-273` — Das Lemma-Band hat keinen `clipPath` und läuft
  im Rendering links und oben über die Zeichenfläche hinaus. Fix: `<clipPath>`
  auf das `rect` FX/FY/FW/FH legen.
- [MINOR] `S41Widgets.tsx:257, 290` — Bei `nv ≤ 0.2` verschwinden Toleranzkreis
  **und** Band. Aufgabenzeile (`:236-239`) und Konsolidierung (`S41.mdx:217-223`)
  beschreiben dann Bildelemente, die nicht existieren. Fix: beide Elemente
  weiterzeichnen, solange `nv > 0`, und nur das Verdikt umschalten.

## S41Widgets.tsx — FehlerzerlegungExplorer (§4.1, Kasten „Fehlerzerlegungs-Explorer")

F2 — KEEP — Zwei getrennte Stellschrauben, drei Balken, Probe zu (4.1.1): die
Einsicht ist sauber operationalisiert.

- [MINOR] `S41Widgets.tsx:459-464` — Der Zweig „Der Algorithmus dominiert" rät
  „hilft hier nur ein besserer Algorithmus (größeres N)". Bei k = 6 und N = 10
  (Reglermaximum, Shot) ist genau das nicht mehr möglich. Fix: bei `N === 10`
  auf „N ist ausgereizt; hier hilft nur noch mehr Rechengenauigkeit im Input"
  umschalten.
- [MINOR] `S41Widgets.tsx:44-54` — F1/F6 wie oben: Bsp. 4.1.6 (−11,5855 / −3,05516
  / −14,6407) und der Dominanzwechsel (bis N = 3 Faktor > 2, ab N = 6 Faktor 0,22)
  sind nachgerechnet korrekt, aber nur „historische Notiz". Die Konsolidierung
  `S41.mdx:334-338` zitiert exakt diese Zahlen.
- [NOTE] `S41Widgets.tsx:442` — Ab k = 3 ist π̃ > π, der Folgefehler wechselt das
  Vorzeichen und der orange Balken kippt auf die andere Seite. Das ist ein
  hübscher Nebenbefund, den weder Verdikt noch Konsolidierung erwähnen.
- [NOTE] C8 geprüft: „beide Balken gleich lang" ist erreichbar (N = 6/k = 1 mit
  Verhältnis 0,91; N = 9/k = 2 mit 0,96) — Aufgabenzeile `:482-485` ist erfüllbar.

## S42Kondition.tsx — KehrwertWidget (§4.2, Kasten „Kondition-Spielwiese: der Kehrwert")

F3 — REVISE — Sehr gutes Bild und ein gültiges Prüfskript, aber die
Schätzfrage ist doppelt verraten.

- [MAJOR] `src/chapters/04-fehler/S42.mdx:109-115` — Die Konsolidierung steht im
  selben `:::interaktiv`-Kasten **unter** dem noch nicht aufgelösten
  `<Schaetzfrage>`-Block und nennt die Antwort wörtlich: „Bei x = 0,6 und
  ε = −0,54 ist die Verstärkung genau 10". Im Rendershot der Tippphase ist der
  Satz zwei Zeilen unter dem „Auflösen"-Knopf sichtbar. Fix: den Satz in den
  `verdeckt`-Block der Schätzfrage verschieben (dort steht bereits die
  Herleitung, `S42.mdx:98-104`), die Konsolidierung auf das Regime-Argument
  ohne Zahl kürzen.
- [MAJOR] `S42Kondition.tsx:299` — Zweiter Spoiler: Der Readout
  „Verstärkung x/|x + ε|" ist in der Tippphase live. Wer ε auf −0,54 zieht, liest
  4,00 → 10,00 ab und tippt dann fehlerfrei (per CDP nachgestellt). Fix:
  Verstärkungs-Readout und Verdikt bis zum Auflösen ausblenden — genau so, wie es
  `S43Widgets.tsx:225-251` beim SGD-Widget schon macht.
- [MINOR] `S42Kondition.tsx:99, 126-132` — `valid = xt > 0.001`; der Verdikttext
  behauptet dann „Für x̃ = x + ε ≤ 0". Über die Regler ist x̃ nur auf dem
  0,005-Raster erreichbar, praktisch also nur x̃ = 0 — der Text stimmt trotzdem
  nicht (bei x̃ = 0 gibt es kein falsches Vorzeichen, sondern eine Polstelle).
  Fix: eigener Zweig „genau auf der Polstelle" gegen „hinter der Polstelle".
- [MINOR] `S42Kondition.tsx:42-52` — Header-Hygiene: Zeilen 42-51 tragen die
  Standard-„historische Notiz … nicht reproduzierbar", Zeile 52 zitiert aber
  `scripts/verify/R2/check-s42-claims.mjs`. Beides zusammen ist widersprüchlich.
  Klassifikation ist in Wahrheit *gültiges committetes Skript*: das Skript prüft
  0,75 / 3 / 4 sowie amp = 2, 5, 10 gegen hartkodierte Sollwerte, die Assertions
  sind widerlegbar. Fix: die Notiz streichen, den Skriptverweis stehen lassen.
- [NOTE] `S42Kondition.tsx:156` — `Number.isFinite(amp) ? … : "∞"` ist in diesem
  Zweig toter Code (`valid` garantiert Endlichkeit).

## S42Kondition.tsx — SummenKonditionWidget (§4.2, Kasten „die Summe zweier Zahlen")

F4 — KEEP — Die Landkarte trägt die Einsicht („nur die Richtung zählt"),
Presets sind die Fallunterscheidung; ein Zustand ist mathematisch falsch.

- [MAJOR] `S42Kondition.tsx:360` und `:371-376` — Über die beiden Regler ist
  x = (0; 0) erreichbar. Das Widget zeigt dort `‖x‖₂ = 0,00` und
  `κ_rel = ∞` und begründet mit „Auf der Antidiagonalen ist x₁ + x₂ = 0"
  (Rendershot). Beides ist falsch: im Ursprung ist κ_rel nach
  Definition 4.2.2 gar nicht definiert (dort wird ‖x‖ ≠ 0 **und**
  ‖f(x)‖ ≠ 0 verlangt), und der Ursprung ist kein Punkt „auf der
  Antidiagonalen" im gemeinten Sinn. `S42Lgs.tsx:195-202` macht es für
  denselben Fall richtig. Fix: Nullpunkt-Zweig analog ergänzen.
- [MINOR] `S42Kondition.tsx:360` — `Math.abs(summe) < 1e-12` ist eine
  Toleranzschwelle auf einem abgeleiteten Float. Auf dem 0,01-Raster trifft sie
  praktisch nur die exakte Null, sauberer wäre der symbolische Test
  `p[0] === -p[1]` bzw. die Preset-Kennung.
- [MINOR] `S42Kondition.tsx:374-375` — fehlendes Leerzeichen: gerendert steht
  „Das ist der dritte Fall ausBemerkung 4.2.4" (Shot).
- [MINOR] `S42Kondition.tsx:465-468` — Die Farbrampe hat nur eine Textlegende
  („hell nahe 1, dunkel ab 100"), keinen Farbbalken mit Skala. Bei einer Karte,
  aus der quantitativ abgelesen werden soll (B3), fehlt damit die Achse.
- [MINOR] F8 — `scripts/verify/R2/check-s42-claims.mjs:17-21` prüft κ(1,2;−0,85),
  κ(1,4;1,4) und κ(1,5;−1,45), aber nicht den vierten beworbenen Fall
  „schlecht gestellt" (1,5; −1,5) mit κ = ∞ aus `S42Kondition.tsx:334` und dem
  Header `:51`. Fix: Assertion auf `Number.isFinite(kappa(1.5,-1.5)) === false`.
- [NOTE] `S42Kondition.tsx:427-435` — Rot für die Antidiagonale und Grün für die
  Diagonale kollidieren mit den im eigenen Header (`:32-37`) vergebenen Rollen
  (rot = Störung ε, grün = relativer Outputfehler). Orange = κ ist dagegen
  durchgehend korrekt.

## S42Lgs.tsx — LgsKonditionWidget (§4.2, Kasten „aus dem Kreis wird eine Ellipse")

F5 — REVISE — Zwei Ebenen nebeneinander, vier Presets, Nullpunkt korrekt
behandelt; das „ok"-Verdikt klassifiziert aber nach dem falschen Kriterium.

- [MAJOR] `src/chapters/04-fehler/widgets/S42Lgs.tsx:219-226` — Der Zweig
  `anteil < 0.15` meldet „✓ Gutmütige rechte Seite … der Quotient bleibt klein".
  Im Preset „fast singulär" (Rendershot) steht dabei κ_rel(f, x) = 89,57 und
  „rel. Outputfehler 448 %" auf dem Bildschirm — also gut zwei verlorene
  Dezimalstellen, mit grünem Haken quittiert. Das Verdikt misst nur den
  Ausschöpfungsgrad κ_rel/κ(A), nicht die absolute Verstärkung. Fix: den
  ok-Zweig zusätzlich an `kappaRel` binden (z. B. `anteil < 0.15 && kappaRel < 3`)
  und sonst „weit unter der Schranke, trotzdem stark verstärkend" texten.
- [MINOR] `S42Lgs.tsx:222-223` — fehlendes Leerzeichen: gerendert „NachSatz 4.2.6"
  (Shot).
- [MINOR] `S42Lgs.tsx:194, 375-378` — Bei x = (0; 0) ist `kappaRel` NaN und
  `anteil` wird auf 0 gesetzt; die Statuszeile zeigt dann „ausgeschöpft zu 0 %",
  obwohl nichts definiert ist. Fix: „–" wie in der κ_rel-Zeile.
- [MINOR] `S42Lgs.tsx:302-308` — Die Bildellipse hat keinen `clipPath` und läuft
  im Preset „fast singulär" sichtbar über den Rahmen der rechten Tafel hinaus
  (Shots 1300 px und 390 px).
- [MAJOR] `S42Lgs.tsx:44-55` — F1/F6: „historische Notiz". Behauptet werden
  σ_max/σ_min/κ₂ aller vier Presets, κ_rel = 82,031 = 99,99 % der Schranke, die
  ungünstigste Richtung 45,7° und y = (41; −40) für x = (1; −1). An κ₂ ≈ 82
  hängt die Zahlfrage `S44.mdx:117`. Klassifikation: *„historische Notiz" ohne
  Skript* — das vorhandene `check-s42-claims.mjs` deckt §4.2.3 **nicht** ab.
- [NOTE] Preset-Benennung „fast singulär" ist genau die richtige Sprache
  (σ_min = 0,0025 ≠ 0). Das sollte beim Nachziehen der Verdikte erhalten bleiben.

## S43Widgets.tsx — SgdLernratenDemo (§4.3, Kasten „Die Lernrate als Stabilitätsregler")

F6 — REVISE — Vorbildlich gebautes predict-then-reveal (ρ, Presets und
ρ-Kurve sind bis zum Auflösen gesperrt), das die Prosa danebenstellt.

- [MAJOR] `src/chapters/04-fehler/S43.mdx:115-124` — Die Konsolidierung steht im
  selben Kasten unter der ungelösten Schätzfrage und nennt alle vier Regime samt
  Schwelle: „monotone Konvergenz für α < 0,5, ein einziger Schritt bei α = 0,5,
  Oszillation … für 0,5 < α < 1, und ab α > 1 Divergenz" (Rendershot der
  Tippphase). Damit ist die Sperre in `S43Widgets.tsx:225-251` wirkungslos.
  Fix: Regime-Aufzählung in den `verdeckt`-Block (die `RhoKurve` sagt dasselbe
  ohnehin schon), im Fließtext nur die Herleitung ρ(α) = |1 − 2α| stehen lassen.
- [MAJOR] `S43Widgets.tsx:98-103` und `:158-171` — F8: Der Fall α = 0,5
  (ρ = 0, Konvergenz in einem einzigen Schritt) wird im Header `:49-50`, in der
  `RhoKurve`-Bildunterschrift `:296-300` und in der MDX-Konsolidierung beworben,
  hat aber weder einen Preset noch einen eigenen Verdikt-Zweig. Im Rendershot
  bei α = 0,5 zeigt die Tafel den einen Sprung auf θ = 0, das Verdikt sagt aber
  „Monoton konvergent. Die Iterierten laufen von einer Seite auf das Optimum zu,
  nach 30 Schritten ist |θ_k| = 0." Fix: Zweig `rho < 1e-9` („ρ = 0: ein Schritt
  genügt") plus fünfter Preset.
- [MAJOR] `S43Widgets.tsx:152-157` — Der Grenzfall-Zweig beginnt mit „Ohne
  Rauschen springen die Iterierten mit konstanter Amplitude …: |θ_k| bleibt bei
  X" und setzt für X den **verrauschten** Wert ein. Im Shot (α = 1, σ = 1,5)
  steht dort 6,69, ohne Rauschen wären es 2,5. Fix: den Wert aus einer
  rauschfreien Parallelrechnung nehmen oder den Satz bei σ > 0 umformulieren.
- [MINOR] `S43Widgets.tsx:179-215` — Die Parabeltafel hat nur eine θ-Achse mit
  Ticks; für L(θ) gibt es weder Achse noch Skala, obwohl die Punkte auf der
  Höhe θ² sitzen (B3).
- [MAJOR] `scripts/verify/R2/check-s43-claims.mjs:15` —
  `close(theta(1.15, 30), 2.5 * 1.3 ** 30, 1e-8)` vergleicht
  `2.5 * (1 - 2*1.15)**30` mit `2.5 * 1.3**30`, also x mit x: die Assertion kann
  nicht scheitern (genau das F6-Antimuster). Der im Header `:50-51` behauptete
  Wert θ₃₀ = 6,55 · 10³ steht nirgends. Fix: gegen die Konstante 6553,6…
  assertieren. Ebenfalls nicht abgedeckt: der Pfad bei α = 0,72
  (2,5 · −1,1 · 0,484 · …) aus `:51-52`.
- [NOTE] Positiv: `useSeed` + „Rauschen neu würfeln" nur bei σ > 0, kein
  `Math.random`, kein Idle-Loop, `aria-label` beschreibt den aktuellen Zustand.

## S43Widgets.tsx — KappaRechner (§4.3, Kasten „Der κ-Rechner für den letzten Schritt")

F7 — REVISE — Rechnet richtig und ehrlich (idealisiertes a = c² + 1 wird
offengelegt), ist aber ein Zahlenkasten ohne Bild und auf dem Handy beschnitten.

- [MAJOR] `S43Widgets.tsx:438-444` — Die zentrale Formel steht als `<M>` (inline)
  in einem `max-w-prose`-`div` ohne `overflow-x-auto`. Bei 390 px bricht sie am
  rechten Rand ab: sichtbar ist nur noch „… , ε ≈ 2,2 ·" (Rendershot 390 px).
  Fix: `<MD>` verwenden (bringt `overflow-x-auto` mit) oder den Container
  entsprechend wrappen.
- [MINOR] `S43Widgets.tsx:419-420` — fehlendes Leerzeichen: gerendert „Als
  Faustregel ausBemerkung 4.2.4" (Shot 390 px).
- [MINOR] `src/chapters/04-fehler/S43.mdx:348-351` — „bei c = 10⁸ genau 16"; das
  Widget zeigt an derselben Stelle 16,3 verlorene Stellen. Fix: „gut 16".
- [MINOR] B1 — Der Anfangszustand ist eine fünfzeilige Tabelle. Die Einsicht
  („log₁₀ κ zählt die Stellen, und bei 16 ist Schluss") wäre als kleine Kurve
  log₁₀ κ über k mit waagerechter 16-Stellen-Linie in einem Blick lesbar; der
  Regler bekäme dann auch etwas zu bewegen. Fix: Plot ergänzen (die
  `Plot`-Komponente kann das direkt).
- [NOTE] F6 teilweise erfüllt: `check-s43-claims.mjs:17-21` prüft κ für
  k = 2, 5, 8, 10 gegen unabhängige Sollwerte (widerlegbar ✓). Nicht abgedeckt
  ist der **Standardzustand des freien Modus** a = 2000, b = 1999 mit
  κ = 3999,0 aus Header `:56-58`. Dieselbe Headerzeile ist außerdem mitten im
  Satz zerrissen („Frei a = 2000, b = 1999: / R2-Nachprüfung: … / κ_rel = 3999,0").

## S42Local.tsx, S43Local.tsx

F8/F9 — KEEP — `SelfTest` und `SelbsttestFrage` sind `<details>`-Hüllen der
MDX-Schicht, keine Widgets: keine numerischen Claims, keine Interaktion außer
Auf-/Zuklappen. Header vorhanden, korrekt als „keine mathematischen Zahlen"
klassifiziert.

- [NOTE] `S43Local.tsx:1-8` und `S42Local.tsx:1-8` zitieren `verify-hdr.mjs`; das
  ist ein Header-Linter, kein Zahlen-Prüfskript. Formulierung „Geprüft mit
  verify-hdr.mjs" kann als Zahlennachweis missverstanden werden.

---

## Kapitel-Fazit (H1–H6)

**H1 Dichte.** Sieben Kästen auf drei Abschnitte, je Unterabschnitt genau einer.
Passt. §4.4 (Zusammenfassung) bleibt korrekt widgetfrei.

**H2 Dramaturgie.** Sauber: Fehlermaß → Zerlegung → Kondition (Skalar → Summe →
LGS) → Stabilität. Der κ-Rechner am Ende ist der einzige Kasten ohne
geometrisches Bild und fällt gegenüber den vorherigen ab.

**H3 Farbrollen.** Orange = κ_rel bzw. Verstärkung ist über alle sechs Widgets
konsistent; der bewusst blau gefärbte Folgefehler im S43-Recap ist dokumentiert
und kein Befund. Zwei kleine Drifts: rot/grün als Linienfarben der
Anti-/Diagonalen in `S42Kondition.tsx:427-435` und die Rampe
weiß→orange→rot (`:315-323`), die Rot als Skalenende und nicht als Störungsrolle
benutzt.

**H4 Selbsttests.** Jeder Abschnitt schließt mit einem Quiz, und jeweils
mindestens eine Frage ist ohne Widget nicht zu beantworten (`S41.mdx:383`
Fehlermaß-Rechner, `S42.mdx:466` Summen-Karte, `S43.mdx:414` und `:426`
κ-Rechner und SGD, `S44.mdx:117` LGS-Widget). Vorbildlich.

**H5 Altbestand.** Keine minifizierten Dateien, alle sechs mit Header, keine
Idle-Loops, kein `Math.random` — die Overhaul-Schulden von 2026-08-24 sind hier
getilgt.

**H6 Länge.** Die Verdikte bleiben knapp; die Konsolidierungen sind mit 3–5
Sätzen an der Obergrenze, aber tragen (Print-Leser bekommen nur sie).

### Die drei wichtigsten Muster

1. **Der Spoiler steht im selben Kasten.** Beide `Schaetzfrage`-Widgets des
   Kapitels sind technisch korrekt gesperrt, die Antwort steht aber im Fließtext
   direkt darunter — sichtbar, bevor getippt wird (`S42.mdx:113-115`,
   `S43.mdx:118-122`). Die Auflösung gehört in `verdeckt`, nicht in die
   Konsolidierung.
2. **Toleranz als Gleichheit, und der eigene Readout widerspricht.** Drei
   Verdikte behaupten Entartung, wo die Zahl daneben etwas anderes sagt:
   `S41Widgets.tsx:200` (δ „nicht definiert" neben δ = 3691 %),
   `S42Kondition.tsx:371` (κ = ∞ im Ursprung), `S42Lgs.tsx:219` („gutmütig" bei
   448 % Outputfehler). Alle drei brauchen die Drei-Zustands-Regel plus eine
   Bindung an die tatsächliche Größe, nicht nur an den Ausschöpfungsgrad.
3. **F1/F6 ist zweigeteilt.** `check-s42-claims.mjs` und `check-s43-claims.mjs`
   sind committet, laufen unter `verify:numbers` und decken die
   §4.2.1/§4.2.2- und die ρ/κ-Zahlen mit widerlegbaren Assertions ab — das ist
   der Zielzustand. Daneben stehen aber (a) eine tautologische Assertion
   (`check-s43-claims.mjs:15`), (b) drei unbelegte Widgets (S41-Zahlen,
   §4.2.3-Zahlen, freier κ-Modus), an denen drei Quizfragen hängen, und
   (c) Header, die gleichzeitig „nicht reproduzierbar" und einen Skriptpfad
   nennen. Ein Aufräumdurchgang sollte die Notizzeile überall dort löschen, wo
   das Skript existiert, und für die Lücken je ein Skript nachziehen.
