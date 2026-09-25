# Fix-Log Kapitel 4 (04-fehler) — REV29, 2026-08-29

Grundlage: `reviews/widget-didactic-review-2026-08-29/04-fehler.md`.
Prüfskripte: `scripts/verify/REV29/04-fehler-S41Widgets.mjs`,
`…-S42Kondition.mjs`, `…-S42Lgs.mjs`, `…-S43Widgets.mjs`; zusätzlich die
tautologische Assertion in `scripts/verify/R2/check-s43-claims.mjs:15` ersetzt.

---

## F1 — FehlermassRechner (`S41Widgets.tsx`, Kasten 1)

**Umgesetzt**
- [MAJOR] `:200-206` Drei-Zustands-Regel: `nv < 0.2` ist in drei Zweige zerlegt —
  `nv === 0` (exakt entartet, nur über beide Zahlenfelder auf 0 erreichbar),
  „‖v‖ winzig" (δ riesig, Band formal gültig) und die bisherigen Toleranzstufen.
- [MAJOR] `:204-205` „Auch Lemma 4.1.3 sagt hier nichts mehr" ersetzt durch die
  wahre Aussage: das Lemma gilt weiter, das Band trägt nur keine Information mehr;
  der Zweig druckt die Schranken jetzt selbst mit aus.
- [MAJOR] `:44-54` F1/F6: „historische Notiz" raus, Header verweist auf das neue
  Skript. Es prüft Bsp. 4.1.4 (‖Δ‖, δ, Band, Abstand zur oberen Schranke),
  δ = 10 % ⇔ ‖Δ‖ = 0,5 (daran hängt `S41.mdx:383`) und Bsp. 4.1.6.
- [MINOR] `:219-220`, `:227` fehlende Leerzeichen vor `{ref(...)}` (`{" "}`).
- [MINOR] `:256-273` `clipPath` auf die Zeichenfläche; Band und Toleranzkreis
  laufen nicht mehr über den Rand.
- [MINOR] `:257, 290` Band und Kreis werden jetzt für jedes `nv > 0` gezeichnet;
  nur das Verdikt schaltet um. Aufgabenzeile und Konsolidierung beschreiben damit
  wieder Sichtbares.

**Rationale.** Der Rechner behauptete Undefiniertheit, wo sein eigener Readout
δ = 3691 % zeigte. Jetzt trennt er sauber: null ist null (und nur über die
Eingabe erkennbar), winzig ist winzig — und die Aussage über Lemma 4.1.3 stimmt
in beiden Fällen.

## F2 — FehlerzerlegungExplorer (`S41Widgets.tsx`, Kasten 2)

**Umgesetzt**
- [MINOR] `:459-464` Bei `N === 10` (Reglermaximum) rät der Zweig nicht mehr zu
  einem größeren N, sondern sagt, dass der Regler ausgereizt ist.
- [MINOR] F1/F6 wie oben: Bsp. 4.1.6, der Dominanzwechsel (N ≤ 3 / N = 4,5 /
  N ≥ 6) und die Erfüllbarkeit der Aufgabe („beide Balken gleich lang", N = 6/k = 1
  und N = 9/k = 2) sind im Skript asserted.

**Offen**
- [NOTE] `:442` Vorzeichenwechsel des Folgefehlers ab k = 3 wird weiterhin nicht
  kommentiert (NOTE, kostet Text im ohnehin dichten Kasten).

**Rationale.** Ein Ratschlag, den das Widget selbst nicht mehr befolgen kann,
entwertet das Verdikt; der Sonderzweig macht das Reglerende zur Aussage.

## F3 — KehrwertWidget (`S42Kondition.tsx`, Kasten 3)

**Umgesetzt**
- [MAJOR] `S42.mdx:109-115` Spoiler-Split: Die Konsolidierung nennt keine Zahlen
  mehr; „Verstärkung genau 10" und der Vergleichswert 4 stehen im `verdeckt`-Block
  der Schätzfrage. Da freie Ausdrücke im MDX-Fließtext verboten sind (remark-fmm),
  ist die `Schaetzfrage` in das Widget gewandert — dasselbe Muster wie bei
  `SgdLernratenDemo`; die MDX ruft nur noch `<KehrwertWidget />`.
- [MAJOR] `:299` Der Verstärkungs-Readout zeigt vor dem Auflösen
  „nach dem Auflösen", das Verdikt ist durch einen neutralen Hinweis ersetzt, und
  auch das `aria-label` der Grafik verrät die Zahl nicht mehr.
- [MINOR] `:99, 126-132` Polstelle: `valid` läuft über das Reglerraster
  (Ganzzahlvergleich) statt über `xt > 0.001`; „genau auf der Polstelle" (x̃ = 0)
  und „hinter der Polstelle" (x̃ < 0) sind getrennte Zweige mit korrektem Text.
- [MINOR] `:42-52` Header-Hygiene: „historische Notiz" gestrichen, der
  Skriptverweis bleibt und ist um das REV29-Skript ergänzt.

**Rationale.** Die Sperre war technisch da, aber zweimal umgangen — im Fließtext
und im Live-Readout. Jetzt ist die Antwort bis zum Auflösen nirgends sichtbar, und
der Grenzfall x̃ = 0 heißt Polstelle statt „falsches Vorzeichen".

## F4 — SummenKonditionWidget (`S42Kondition.tsx`, Kasten 5)

**Umgesetzt**
- [MAJOR] `:360, :371-376` Nullpunkt-Zweig ergänzt: im Ursprung ist κ_rel nach
  Definition 4.2.2 gar nicht erklärt (Readout „–", eigener Verdikttext), statt
  „κ = ∞ auf der Antidiagonalen".
- [MINOR] `:360` `Math.abs(summe) < 1e-12` ersetzt durch den exakten Test auf dem
  0,01-Raster (`p1 === -p2`), Ursprung getrennt behandelt.
- [MINOR] `:374-375` fehlendes Leerzeichen behoben.
- [MINOR] F8: `κ(1,5; −1,5) = ∞` ist jetzt asserted (im REV29-Skript, damit
  `check-s42-claims.mjs` unverändert bleibt).

**Offen**
- [MINOR] `:465-468` Farbbalken mit Skala statt Textlegende — mehr als eine
  lokale Änderung (eigene Legendenkomponente mit Achsenbeschriftung).
- [NOTE] `:427-435` Rot/Grün für Anti-/Diagonale: bewusste Umwidmung, im Header
  dokumentiert; keine Änderung ohne Farbentscheid des Dozenten.

**Rationale.** Der Ursprung war der einzige Punkt, an dem das Widget etwas
Falsches behauptete; die Unterscheidung „nicht definiert" gegen „unendlich" ist
genau die Lesart von Definition 4.2.2.

## F5 — LgsKonditionWidget (`S42Lgs.tsx`, Kasten 4)

**Umgesetzt**
- [MAJOR] `:219-226` Der ok-Zweig hängt jetzt an `anteil < 0.15 && kappaRel < 3`;
  darunter ein neuer Zweig „weit unter der Schranke, trotzdem stark verstärkend"
  mit Inputfehler, Outputfehler und verlorenen Stellen.
- [MAJOR] `:44-55` F1/F6: neues Skript prüft σ_max/σ_min/κ₂ aller vier Presets
  (Abtastung über 360 000 Richtungen statt geschlossener Form), das Maximum von
  κ_rel gegen κ₂ (< 0,03 %), die ungünstigste Richtung 45,7°, die Voreinstellung
  (κ_rel = 82,031 = 99,99 % der Schranke) und y = (41; −40) für x = (1; −1) —
  daran hängt `S44.mdx:117`.
- [MINOR] `:222-223` fehlendes Leerzeichen.
- [MINOR] `:194, 375-378` „ausgeschöpft zu 0 %" zeigt bei undefiniertem κ_rel „–".
- [MINOR] `:302-308` `clipPath` auf die Lösungsebene.

**Rationale.** Ein grüner Haken bei 448 % Outputfehler ist die gefährlichste Art
von Verdikt. Der Ausschöpfungsgrad misst die Lage zur Schranke, nicht die
Verstärkung — das steht jetzt wörtlich im neuen Zweig.

## F6 — SgdLernratenDemo (`S43Widgets.tsx`, Kasten 6)

**Umgesetzt**
- [MAJOR] `S43.mdx:115-124` Die Regime-Aufzählung ist raus; im Fließtext bleibt
  die Herleitung ρ(α) = |1 − 2α| samt Hinweis auf die nach dem Auflösen
  eingeblendete ρ-Kurve (die dieselbe Fallunterscheidung ohnehin zeigt).
- [MAJOR] `:98-103, :158-171` F8: fünfter Preset „ein Schritt (α = 0,5)" und ein
  eigener Zweig „ρ = 0: ein Schritt genügt"; α = 0,5 und α = 1 werden exakt über
  das Reglerraster erkannt, nicht über eine Toleranz auf ρ.
- [MAJOR] `:152-157` Der Grenzfall-Zweig nennt jetzt den rauschfreien Wert
  θ₀ ρ^N = 2,50; der verrauschte Endwert steht getrennt im Zusatzsatz.
- [MAJOR] `check-s43-claims.mjs:15` Die Assertion `close(theta(1.15,30), 2.5·1.3³⁰)`
  verglich x mit x; sie prüft jetzt gegen die Konstante 6549,9891.

**Offen**
- [MINOR] `:179-215` L(θ)-Achse für die Parabeltafel — der Plot müsste eine zweite
  Achse samt Skala bekommen; das ist ein Umbau der Tafel, kein lokaler Fix.

**Rationale.** Die Sperre im Widget war vorbildlich und durch drei Zeilen Prosa
wirkungslos. Zusätzlich war der einzige Fall, in dem SGD in einem Schritt fertig
ist, beworben, aber nicht erreichbar — jetzt hat er Preset und Verdikt.

## F7 — KappaRechner (`S43Widgets.tsx`, Kasten 7)

**Umgesetzt**
- [MAJOR] `:438-444` Die Formel steht in `<MD>` (bringt `overflow-x-auto` mit);
  bei 390 px scrollt sie, statt am Rand abgeschnitten zu werden (per CDP geprüft:
  der Container trägt `my-3 overflow-x-auto`, der Kasten misst 348/348).
- [MINOR] `:419-420` fehlendes Leerzeichen.
- [MINOR] `S43.mdx:348-351` „bei c = 10⁸ genau 16" → „gut 16" (das Widget zeigt
  16,3; im Skript asserted).
- [MINOR] F6/F8: Der Standardzustand des freien Modus (a = 2000, b = 1999,
  κ_rel = 3999,0) ist jetzt abgedeckt, ebenso der Pfad bei α = 0,72; die im Header
  mitten im Satz zerrissene Zeile ist neu gesetzt.

**Offen / Entscheidung nötig**
- [MINOR] B1 „Zahlenkasten ohne Bild": Ein log₁₀ κ-über-k-Plot mit 16-Stellen-Linie
  wäre der eigentliche Fix, ändert aber die Anlage des Kastens (Bild statt Tabelle)
  und braucht eine Entscheidung des Dozenten.

**Rationale.** Der Kasten war auf dem Handy unbenutzbar, weil die zentrale Formel
mitten im Term abbrach; alles andere daran rechnet und formuliert korrekt.

## F8/F9 — `S42Local.tsx`, `S43Local.tsx`

**Offen**
- [NOTE] Formulierung „Geprüft mit verify-hdr.mjs" kann als Zahlennachweis
  missverstanden werden. Reine Wortwahl in zwei Header-Kommentaren; nicht
  angefasst, weil beide Dateien keine Zahlen behaupten.

---

## Entscheidung nötig (nicht ausgeführt)

- **KappaRechner als Plot** (F7/B1, s. o.).
- **Farbrampe der Summen-Karte**: Farbbalken mit Skala (F4) — betrifft die
  Bildsprache des Kastens.

## lib-Befunde (nicht angefasst, `src/lib` ist tabu)

- keine in Kapitel 4.
