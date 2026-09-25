# Fix-Brief — Umsetzung der Widget-Review-Befunde 2026-08-29

Auftrag: die Befunde aus `reviews/widget-didactic-review-2026-08-29/<kapitel>.md`
umsetzen. Arbeite NUR die dir zugewiesenen Kapitel ab, sequentiell.

## Scope-Politik

- **CRITICAL und MAJOR: fixen.** MINOR: fixen, wenn lokal und billig (< ~20 Zeilen);
  sonst als „offen" im Fix-Log notieren. NOTE: nicht umsetzen, außer trivial.
- **STATIC/REMOVE-Empfehlungen NICHT ausführen.** Das ist eine Editorial-Entscheidung
  des Dozenten; im Fix-Log unter „Entscheidung nötig" sammeln.
- Kein Widget neu erfinden; die kleinste Änderung, die den Befund behebt. Fix-Runden
  BLÄHEN AUF (bekannte Lehre: +19 % Wörter durch Caveat-Wiederholung in Prosa +
  Aufgabe + Verdikt + Schluss) — jeder Caveat steht an GENAU EINER Stelle. Nach den
  Fixes je MDX-Datei Wortzahl gegen `git show HEAD:<datei> | wc -w` prüfen: Ziel ≤ +3 %.

## Die Sammelfixes (einheitlich umsetzen, nicht je Fundstelle neu entscheiden)

1. **Spoiler-Split**: Konsolidierungsprosa, die eine Schätzfrage beantwortet, wandert
   aus dem sichtbaren Kastentext in `verdeckt={…}` der Schaetzfrage ODER hinter das
   Auflösen (Text nach dem Widget ist ok, wenn er erst NACH dem Kasten steht und die
   Schätzfrage im Kasten hängt — Ziel: beim Tippen ist die Antwort nicht sichtbar).
   Prüfe danach im Browser, dass die Auflösung nach dem Tippen wirklich erscheint.
   Selbsttest-`zahlfrage`n, deren Lösung ein verschobener Satz war, müssen lösbar
   bleiben (Widget liefert den Wert nach Interaktion).
2. **Drei-Zustands-Regel**: Verdikte mit Toleranzschwelle-als-Gleichheit bekommen die
   drei Zweige: exakt entartet NUR über den kontrollierten Parameter (Slider-Rastwert,
   Preset), nahe entartet („schlecht konditioniert", nie „singulär/senkrecht/exakt"),
   regulär. Keine `=== 0`-Vergleiche auf abgeleiteten Floats.
3. **Zustandsraum = geprüfter Raum**: Entweder Verdikt-Zweig/Headerzahl für den vollen
   Regler-/Preset-Bereich ergänzen ODER den Bereich auf das Verifizierte klemmen —
   was didaktisch mehr trägt, entscheidet der Befundtext.
4. **SVG-Kollaps/390 px**: `viewBox` + `max-w-full h-auto` + explizite `width`/`height`-
   Attribute, Geschwisterspalten `min-w-0`; bei 390 px Controls unter der Grafik.
   Nach dem Fix per CDP `getBoundingClientRect` nachmessen (beide Breiten).
5. **F1/F6-Ehrlichkeit**: Für jede Zahl, die ein gefixtes Widget behauptet, ein
   committetes Prüfskript unter `scripts/verify/REV29/<kapitel>-<widget>.mjs`
   (widerlegbare Assertions: unabhängiger Rechenweg, NIE `x−x` oder `assert.equal(a,a)`).
   Header aktualisieren: Skriptpfad + Datum, „historische Notiz" raus, wo jetzt ein
   Skript existiert. Tote Skriptpfade in Headern, deren Widgets du ohnehin anfasst,
   auf existierende/neue Skripte umstellen. Neue Skripte in `npm run verify:numbers`
   einhängen (Konvention in scripts/verify/run-all.mjs prüfen).

## Regeln (Verstoß = Regression)

- Sprache: wir-Form; „ – " nie „—" (Budget ≤ 1/300 Wörter); deutsche Zahlformate
  (`fmtDe`); keine Mathe/Backticks in Env-Labels (`:::bemerkung[…]`).
- KEINE Folienkritik im Skript (auch nicht in Statustexten).
- Der Gradient ist ein ZEILENVEKTOR (Def. 10.2.1).
- Satznummern in TSX via `num()/ref()` aus `../../numbers.generated`, nie hartcodiert.
- Farbrollen des Kapitels (KONVENTIONEN.md „KAPITEL <n>") beibehalten.
- `src/lib` ist TABU (LIB-Befunde gehen in einen separaten Lauf; ins Fix-Log unter
  „lib-Befund" eintragen statt fixen).
- Kein `npm run typecheck:mdx` parallel zu anderen Agenten (Race über
  `.mdx-check.tsx`-Tempdateien) — der Orchestrator läuft die Gates zentral am Ende.
  Du darfst gezielt einzelne verify-Skripte per `node` laufen lassen.
- Verwaiste `.mdx-check.tsx` nicht committen.

## Verifikation je Kapitel (Pflicht, vor dem Abschlussbericht)

1. Eigene neue/geänderte `scripts/verify/REV29/*.mjs` per node laufen lassen.
2. Betroffene Widgets im Browser prüfen (Preview 4179, CDP 9333, Muster
   `scripts/dev/shot-widgets.mjs`): der konkrete Befund ist weg, bei 1300 UND 390 px,
   inklusive des interagierten Zustands (Schwellen-Rastwert, Preset, Reveal).
3. Kein neuer Spoiler, kein neues Float-`===`, keine du/Sie-Form eingeschleppt.

## Fix-Log (Pflicht-Deliverable je Kapitel)

`reviews/widget-didactic-review-2026-08-29/fixes/<kapitel>.md` mit je Widget:
- Befund-IDs umgesetzt (Kurzform) / offen gelassen (warum) / „Entscheidung nötig"
- 1–3 Sätze RATIONALE pro Widget (was didaktisch besser ist — wird dem Dozenten
  in der Vorher/Nachher-Galerie gezeigt; auf Deutsch, wir-Form nicht nötig)

Zusätzlich Maschinen-Log `reviews/widget-didactic-review-2026-08-29/fixes/<kapitel>.json`:
```json
[{ "widget": "src/chapters/…/S42Kondition.tsx",
   "kapitel": "04-fehler", "anker": "sec-kondition",
   "boxIndexe": [3], "severityFixed": ["MAJOR","MINOR"],
   "titel": "Kondition-Spielwiese",
   "rationale": "…ein Satz…" }]
```
`boxIndexe` = 1-basierte Position(en) des/der `:::interaktiv`-Kästen des Widgets in
der Kapitel-Reihenfolge (= Nummer `-NN-` im Dateinamen der before-shots unter
/tmp/claude-0/-home-user-fmm-skript/48b18df4-287c-5fe3-b4ce-ec0ad631f309/scratchpad/before-shots/<KK>/).
MDX-only-Fixes (Spoiler-Verschiebung) zählen als Eintrag mit dem betroffenen Kasten.
