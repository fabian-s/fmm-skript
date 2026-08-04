# KONVENTIONEN — FMM-Skript (VOR JEDER ARBEIT VOLLSTÄNDIG LESEN)

Lebendes Dokument; der Abschnitt **Lessons** am Ende überschreibt alles
davor. Sprache und Ton: siehe STYLE.md (verbindlich).

## Mission

Öffentliches interaktives Begleit-Skript (deutsch) zur LMU-Vorlesung
„Fortgeschrittene mathematische Methoden in der Statistik".
Struktur folgt den FOLIEN (`fmm-lmu/slides/*.Rmd`), NICHT den Büchern.
Repo ist ÖFFENTLICH (github.com/fabian-s/fmm-skript): jede Prosa ist
eigenständig formuliert; niemals Buchpassagen übersetzen oder eng
paraphrasieren (Übersetzungen sind abgeleitete Werke). Heath/MML dienen
als fachliche Referenz und werden als Literaturhinweise zitiert
(„Vertiefung: Heath §3.5").

## Technik (identisch zur interactive-textbook-Bibliothek)

- `<ConceptLink id="kebab-id">Text</ConceptLink>` — Tooltip-Link;
  Module in `src/concepts/*.tsx` registrieren sich selbst (import.meta.glob).
- `<M>/<MD>` Mathe (Backslashes in TSX doppelt escapen!), `<Eq tag>` NUR
  wenn das Skript selbst nummerierte Gleichungen vergibt (Schema
  „(K.n)", K = Foliensatz-Nummer).
- `<EnvBlock kind="Definition|Satz|Lemma|Korollar|Beispiel|Bemerkung|Algorithmus" label="7.3">`.
- `<Proof><PStep why={<>Begründung</>}>…</PStep></Proof>` — annotierte,
  schrittweise aufdeckbare Beweise; jede nichttriviale Zeile bekommt ein
  `why`.
- `<ExpandedReading title="…">` — „Vertiefung:"-Boxen (Präfix kommt vom
  Component); Widgets hier hinein.
- Widgets: `Slider`, `MatrixInput`, `LabeledPlot`, `LabeledTransformCanvas`
  (+ `sigmaMax`/`maxAbsCoord`); eigene Widgets nach
  `src/chapters/<kap>/widgets/` bzw. `src/concepts/widgets/`.
- **Kursmakros direkt verwenden** (`\\bx`, `\\bA`, `\\wh{}`, `\\R`,
  `\\quimpl`, `\\sumin`, …) — sie sind aus
  `fmm-lmu/slides/_mathjax-macros.qmd` generiert (src/fmm-macros.ts;
  Regeneration: `node scripts/gen-macros.mjs`). KEINE
  `\\mathbf`-Umschreibungen.
- Farbcodierung: `\\cbred/\\cblue/\\cgreen/\\cborange/\\cpurp` (FMM-Palette).
  EINE Farbe verfolgt EINEN Teilausdruck durch die gesamte Herleitung.
- Kapitel sind lazy geladen: `src/chapters/<id>/` mit `index.ts`
  (default-Export `{ sections }`), registriert in `src/chapters/index.ts`
  (NUR der Orchestrator editiert die Registry).
- Nach Änderungen: `npx tsc --noEmit` im Repo-Root (LMU: Achtung, immer
  aus dem App-Verzeichnis heraus!). KEINE git-Kommandos für Agenten.

## Tooltip-Konzepte (deutsch)

- Module in `src/concepts/<id>.tsx`; die **id bleibt englisch/kebab-case**
  (Code-Ebene, geteilt mit den internen Apps), `title` und Prosa deutsch.
- Ton: wir-Form, sanft erklärend — zuerst die Intuition, dann die präzise
  Aussage, dann ein kleines konkretes Beispiel; Widget wo es hilft.
  Publikum: BSc-Statistik, 3. Semester, LinAlg/Analysis „gesehen, aber
  wenig hängengeblieben".
- Fachbegriff-Übersetzungen: deutscher Begriff zuerst, englischer beim
  ersten Auftreten in Klammern, wenn er in der Literatur dominiert.
- KEINE App-internen Querverweise übernehmen: `href="#sec-…"`-Anker aus
  den Quell-Apps entfernen (durch Klartext ersetzen); Buch-Verweise wie
  „(MML §5.2)" dürfen als Literaturhinweis bleiben — Format
  „(vgl. MML §5.2)" / „(vgl. Heath §3.5)".
- Verschachtelte `<ConceptLink>`s beibehalten (ids unverändert).

## Kapitel (für spätere Kapitel-Workflows)

- Quelle: der jeweilige Foliensatz (`.Rmd` direkt lesen); Abschnitt =
  Folien-„## "-Block; jeder Abschnitt nennt seine Folien
  („Folien 07-kq, ‚QR-Zerlegung‘").
- Alle Rechenbeispiele der Folien vollständig und farbcodiert nachrechnen;
  Zahlen aus den Folien übernehmen und VERIFIZIEREN (nachrechnen!).
- Beweise aus den Folien als `<Proof>` mit Begründungs-Annotationen.
- Konzepte, die das Skript-Kapitel selbst einführt: Abschnittsanker statt
  Tooltip; Vorwissen: Tooltip (`ls src/concepts/`, kanonische ids nutzen).

## Lessons (einzeilig anhängen; Neuestes zuletzt)

- \cb*-Farbmakros sind in src/fmm-macros.ts math-sicher überschrieben
  (\textbf bricht \boldsymbol-Argumente in MathJax).
- SVG-MathJax-Fehler sind data-mml-node="merror", NICHT mjx-merror —
  Prüfungen müssen beide Selektoren zählen.
