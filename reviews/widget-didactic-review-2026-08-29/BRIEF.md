# Reviewer-Brief — Widget-Didaktik-Review 2026-08-29

Auftrag: Kapitel-Widgets des fmm-skript didaktisch reviewen. **Nur Befunde, keine
Fixes** (Rubrik-Regel: Reviews produzieren Findings; Fixes sind ein separater Schritt).

## Pflichtlektüre vor dem ersten Urteil (in dieser Reihenfolge)

1. `/home/user/slds-lmu/ai-scaffolding/skills/explorable-widgets/SKILL.md`
2. `/home/user/slds-lmu/ai-scaffolding/skills/explorable-widgets/references/review-rubric.md`
   (Verfahren + Kriterien A–H; KEEP/REVISE/STATIC/REMOVE; CRITICAL/MAJOR/MINOR/NOTE)
3. `/home/user/slds-lmu/ai-scaffolding/skills/explorable-widgets/references/design-patterns.md`
4. `/home/user/fmm-skript/STYLE.md` (komplett) und
   `/home/user/fmm-skript/src/lib/widgets/README-widgets.md`
5. `reviews/widget-didactic-review-2026-08-29/00-quantitative-scan.md` (Baseline/Deltas —
   dort Genanntes NICHT neu entdecken, sondern nur je Widget konkretisieren)

## Projektkonventionen, die Befunde sonst zu False Positives machen

- **Der Gradient ist im Skript ein ZEILENVEKTOR** (Def. 10.2.1). Formeln wie
  θ − γ(∇L)ᵀ sind korrekt. Ein früherer Audit hat das als Prio-1-Fehler gemeldet — falsch.
- **Drei-Zustands-Regel** für Verdikte: exakt entartet (nur über den KONTROLLIERTEN
  Parameter erkannt, nie `=== 0` auf einem abgeleiteten Float) / nahe entartet
  („schlecht konditioniert", nie „singulär") / regulär. Toleranzschwelle als
  Gleichheit verkauft = MAJOR.
- **Folienkritik-Verbot**: Das Skript (auch Widget-Statustexte!) darf keine Fehler der
  Vorlesungsfolien thematisieren. Neutrale Herkunftsangaben sind ok.
- Sprache: wir-Form (nie du/Sie), deutsche Zahlformatierung (`fmtDe`), Halbgeviertstrich
  „ – " nie „—", Budget ≤ 1 pro 300 Wörter.
- Farbrollen: \cb*-Palette grün #009E73, blau #0072B2, rot #D55E00, orange #E69F00,
  violett #9E57D5; EINE Farbe = EIN Teilausdruck in Text UND Widget; Rollen sind je
  Kapitel im Bauauftrag (KONVENTIONEN.md, Abschnitt „KAPITEL <n>") fixiert — dort
  nachschlagen, bevor eine „Farbrollen-Drift" gemeldet wird.
- Nummerierung: Verweise in TSX via `num()/ref()` aus `../../numbers.generated`;
  hartcodierte Satznummern in Widget-Texten sind ein Befund (MINOR).
- SVG-Fallen (beide sind im Browser sichtbar, nicht im Quelltext): `viewBox` ohne
  `width`/`height` kollabiert, wenn das SVG nicht selbst Flex-Item ist; unbekannte
  MathJax-Makros werden STILL als Literaltext gesetzt (kein merror).

## Zwei Pässe je Widget (Pflicht, Rubrik Schritt 4)

- **Quelltext**: die volle `.tsx`-Datei + die umgebende MDX (Frage davor? Konsolidierung
  danach? Aufgabenzeile? A7-Selbständigkeit?).
- **Rendering**: Screenshots liegen unter
  `/tmp/claude-0/-home-user-fmm-skript/48b18df4-287c-5fe3-b4ce-ec0ad631f309/scratchpad/shots/<NN>/`
  je Kasten bei 1300 px und 390 px (Vertiefungen wurden vor dem Schuss aufgeklappt).
  Screenshots sind der TOTE Anfangszustand — für Interaktionszustände (Reveal, Presets,
  Slider-Extreme) selbst per CDP nachfassen: Preview-Server läuft auf Port 4179,
  Headless-Chrome mit `--remote-debugging-port=9333`; Muster in
  `scripts/dev/shot-widgets.mjs` / `scripts/dev/shot-concept.mjs` (eigenes Target
  öffnen, nach Gebrauch schließen). **Interaktion ist Pflicht, nicht Kür**: je Widget
  eine SEQUENZ von Zuständen durchfahren und screenshotten, nicht nur das tote
  Startbild – Slider von min über die didaktisch kritische Stelle bis max (mind.
  3 Stände), jeden Preset einmal, Stepper bis zum Ende (und einmal zurück),
  Schaetzfrage vor UND nach dem Aufdecken, Drag-Handles an eine Extremposition.
  Erst diese Sequenz zeigt, ob Verdikte wirklich umschalten, ob Entartungsfälle
  erklärt werden und ob beim Reveal nichts vorher schon sichtbar war. React-States
  setzt man dabei über die echten DOM-Controls (native Setter + Events:
  `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,v);
  el.dispatchEvent(new Event('input',{bubbles:true}))` für Slider; `.click()` für
  Buttons), nie durch Style-Manipulation.

## Numerik-Ehrlichkeit (F1/F6)

Je Widget klassifizieren: gültiges committetes Prüfskript (`scripts/verify/…`, von
`npm run verify:numbers` erfasst) / „historische Notiz"-Header ohne Skript / Header ohne
Zahlen-Nachweis / keine numerischen Claims. Bei vorhandenem Skript stichprobenartig
prüfen, ob die Assertions widerlegbar sind (kein `x − x`-Vergleich) und ob sie die im
Verdikt/Preset behaupteten Zahlen wirklich abdecken (F8: jeder beworbene Fall erreichbar
und asserted).

## Report

Eine Datei je Kapitel: `reviews/widget-didactic-review-2026-08-29/<kapitel-dir>.md`,
auf Deutsch, im Format der Rubrik (Schritt 6):

```
## <WidgetDatei> (<Abschnitt>)
<id> — KEEP|REVISE|STATIC|REMOVE — <ein Satz>
- [CRITICAL|MAJOR|MINOR|NOTE] pfad:zeile — Befund. Fix-Vorschlag.
```

Danach ein Kapitel-Fazit (H1–H6) mit den 2–4 wichtigsten Mustern. Kein Lobpolster,
aber ehrlich benennen, was gut ist (verifizierte Header, Verdikt-Qualität), damit die
Konventionen sichtbar bleiben. Jeder Befund trägt Datei UND Zeile.
