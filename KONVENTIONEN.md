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

## KAPITEL 7 (Foliensatz 07-kq) — Bauauftrag 2026-08-04

- Quelle: `/home/fabians/lehre/FMM/fmm-lmu/slides/07-kq.Rmd` (Zeilenbereiche
  pro Abschnitt stehen im Workflow-Prompt). Folieninhalte sind EIGENES
  Material — wörtliche Übernahme von Folientext ist erlaubt, aber Prosa
  soll ausformulieren, was die Folien nur stichpunktartig sagen.
- Abschnitte/Anker: `#sec-7.1` … `#sec-7.6` (Registry in
  `src/chapters/07-kq/index.ts`, NICHT editieren; nur den eigenen Stub
  `S7x.tsx` überschreiben).
- Nummerierung: Abschnitt 7.k vergibt seine Labels als „7.k.1, 7.k.2, …"
  in Reihenfolge des Auftretens (z. B. Definition 7.3.1, Satz 7.3.2) —
  eindeutig und kollisionsfrei zwischen parallel arbeitenden Agenten.
- Gleichungsnummern `<Eq tag="7.k.n">` nur für Gleichungen, auf die
  verwiesen wird.
- **Widget-Recycling:** Die private App
  `/home/fabians/lehre/FMM/fmm-lmu/interactive/heath-ch3/` enthält zu
  fast jedem Thema dieses Kapitels erprobte Widgets
  (`src/sections/S3*.tsx`, `widgets/`). Ihr dürft WIDGET-/SVG-/
  Berechnungs-CODE übernehmen und die Labels ins Deutsche übersetzen.
  **VERBOTEN: Prosa aus diesen Apps übernehmen oder übersetzen** — sie
  ist aus einem urheberrechtlich geschützten Buch adaptiert, das Skript
  ist ÖFFENTLICH. Prosa entsteht ausschließlich aus den Folien + eurem
  eigenen Verständnis.
- Alle Folien-Rechenbeispiele (z. B. die QR-Beispiele) vollständig
  nachrechnen und farbcodiert darstellen; Zahlen verifizieren.
- Beweise/Herleitungen der Folien als `<Proof>`-Blöcke mit
  `why`-Annotationen.
- Literaturhinweise am Abschnittsende: „Vertiefung: Heath §3.x" passend
  zum Thema (KQ/Kondition → §3.1–3.3, Normalgleichungen/Cholesky → §3.4,
  QR/Givens/Householder → §3.5, SVD/Pseudoinverse → §3.6, Vergleich →
  §3.7; MML §7.1 für den Gradientenblick).

## KAPITEL 1 + 2 (Foliensätze 01-intro, 02-algos) — Bauauftrag 2026-08-05

- Kapitel 1 (`src/chapters/01-intro/`, ein Abschnitt S11, Anker
  `#sec-1.1`): SEHR KURZ und rein konzeptionell — Dozentenvorgabe.
  Keine Organisation/Logistik/Klausurtermine aus den Folien übernehmen;
  nur: worum geht es (Numerik für die Statistik), die drei Themenblöcke
  des Kurses, warum Statistiker:innen das brauchen. Richtwert: eine
  Bildschirmseite Prosa, höchstens 1 kleine Vertiefung, kein
  Environments-Feuerwerk.
- Kapitel 2 (`src/chapters/02-algos/`, S21–S25, Anker `#sec-2.1` …
  `#sec-2.5`): volle Skript-Tiefe wie Kapitel 7. Labels „2.k.n".
- Nummerierung/Regeln wie im Kapitel-7-Block (sinngemäß, Kapitelnummer
  1 bzw. 2). Für Kapitel 2 existieren passende Tooltips bereits:
  big-o-notation, machine-epsilon, rounding-error, cancellation,
  floating-point, matrix-vector-product, … (`ls src/concepts/`).
- Widget-Ideen Kapitel 2: Fibonacci-Stepper (naiv vs. iterativ,
  Aufruf-Zähler), Wachstumsraten-Plot der Komplexitätsklassen
  (log-Skala), Auslöschungs-Demo, Landau-„Wer dominiert wen"-Explorer.
  Kein passendes Recycling aus den privaten Apps nötig — Prosa-Verbot
  für private Apps gilt weiterhin.

## Lessons (einzeilig anhängen; Neuestes zuletzt)

- \cb*-Farbmakros sind in src/fmm-macros.ts math-sicher überschrieben
  (\textbf bricht \boldsymbol-Argumente in MathJax).
- SVG-MathJax-Fehler sind data-mml-node="merror", NICHT mjx-merror —
  Prüfungen müssen beide Selektoren zählen.
- Deutsche Dezimalzahlen in MathJax als `0{,}8` setzen (nacktes `0,8` erzeugt
  Abstand nach dem Komma); heath-ch3-SVG/Canvas-Widgets portieren 1:1 — nur
  Labels/Prosa neu, `px()`-V2-Arrays stringifizieren in `points=` korrekt.
- Folie „Beispiel: QR-Zerlegung (2)" (07-kq.Rmd Z. 372) zeigt eine falsche
  Matrix A (Tippfehler); die gerechneten Werte gehören zu A=(1 2; 0 0; 0 2)
  von der Vorfolie — Skript §7.4 nutzt durchgehend die korrekte Matrix.
- Widget-SVG-Farben an die \cb*-Makros angleichen (fmmColorBootstrap in
  src/fmm-macros.ts): grün #009E73, blau #0072B2, rot #D55E00,
  orange #E69F00, violett #9E57D5 — dann trägt EINE Farbe denselben
  Teilausdruck in Text UND Widget.
- Es gibt KEIN \cbblue-Makro (nur \cblue): blauen Fettdruck als
  \cblue{\wh{\bx}} o. ä. schreiben — die \b*-Makros sind schon fett; für
  Skalare die farb-only-Makros (\cred, \corange, \cpurp, …) verwenden.
- heath-ch3-Widget-STATUSTEXTE sind Prosa (neu formulieren, nicht übersetzen!); außerdem ist die dortige AᵀA-Kollaps-Schwelle „k ≈ 7,9" falsch — fl(1+ε²)=1 erst ab ε ≤ 2^-26,5 ≈ 1,05e-8 (k ≈ 8), sonst widerspricht der Live-Zustand des Widgets dem Text.
- Kern(A) im Mathe-Modus als \operatorname{Kern} setzen — \kern ist ein TeX-Spacing-Primitiv und würde das Folgende schlucken.
- Heath-§3.7-Vergleichswidgets (Cost/Accuracy/MethodChooser) liegen deutsch portiert in chapters/07-kq/widgets/S76Compare.tsx — wiederverwenden statt neu portieren.
- <Proof> rendert das QED-Zeichen (∎) selbst — KEIN manuelles \blacksquare im letzten PStep; mehrteilige Beweise in EINEM <Proof>-Block halten (zwei Blöcke = zwei „Beweis."-Überschriften), Zwischentext als <p> in den betreffenden PStep.
- Zwischenüberschriften im Kapiteltext: h3 mit className="mt-6 text-lg font-semibold", h4 mit "mt-4 font-semibold" (so in S72) — für einheitliche Optik übernehmen; Gradzeichen in Mathe als ^\circ, nicht als Unicode °.
- ConceptLink-ids `singular-value-decomposition` und `matrix-norm` sind in Kap. 7 (S71/S72/S76) verlinkt, aber es gibt noch KEINE Module in src/concepts/ — Konzept-Pool muss sie anlegen; In-Text-Abschnittslinks als `<a className="underline" href="#sec-7.k">`; Orange ist im Text für κ₂(A) reserviert — Widget-Readouts für κ₂ orange färben, Δx̂ neutral lassen.
- Auch WIDGET-Begleittexte (Captions/Anleitungen) aus heath-ch3/MML sind verbotene Buch-App-Prosa — nur Widget-CODE übernehmen, Captions aus eigenem Verständnis neu schreiben (Review 7.1 fand 3 übersetzte Captions).
- Mathe-Literale lassen sich ohne Dev-Server prüfen: mathjax/es5/node-main.js mit loader input/tex-full + fmmMacros (packages ams/color/unicode), dann tex2svg je Literal und auf data-mjx-error/merror greppen.
- ConceptLink-id "cancellation" existiert nicht — Auslöschung auf "rounding-error" verlinken (dessen Modul behandelt katastrophale Auslöschung); Bestand prüfen mit `ls src/concepts/`.
- OBSOLET (Vorzeile): Konzept-Module `singular-value-decomposition`, `pseudoinverse`, `matrix-norm`, `cancellation`, `low-rank-approximation` existieren jetzt in src/concepts/ — Auslöschung darf direkt auf "cancellation" verlinken (z. B. S75 Bem. 7.5.9 umstellen).
- Headless-MathJax-Check: `mathjax.init({loader:{load:["input/tex-full","output/svg"]},…})` aus node-main.js verwenden — das `globalThis.MathJax`-Config+require-Muster hängt (unsettled top-level await); Integrationslauf 2026-08-04: S75 Bem. 7.5.9 verlinkt jetzt direkt auf "cancellation".
- Wachstums-Vergleichswidgets (S25): log10-Skala fahren — Landau-Vorhersagen als Series-FUNKTIONEN (Geraden im Semilog), exakte Zählungen als markers; lib-Plot überspringt NaN/non-finite, also f(x)=NaN für undefinierte Bereiche zurückgeben; Aufrufbäume als <pre> mit farbigen <span>s (Farbwerte der \cb*-Palette inline per style).
- R-Chunk-Outputs nicht blind in Live-Widgets spiegeln: Rs mean() rechnet mit Nachkorrektur, die naive JS-Summe weicht ab (Varianz-Auslöschungs-Demo, c=1e9: R liefert 0, JS -128) — Widget zeigt seine eigenen IEEE-Werte, der Fließtext zitiert die R-Ausgabe; beide vorher nachrechnen (Rscript + node).
- Es gibt KEIN \bf-Makro (TeX-Primitiv, fehlt bewusst in fmm-macros): Folien-Vektoren namens „f" im Skript umbenennen (z. B. \bz); Multiple-Choice-Selbsttest-Komponente (Optionen mit Feedback + aufklappbare Lösung) liegt wiederverwendbar in 02-algos/S23.tsx.
- Quiz-Folien als aufklappbare Selbsttests: natives `<details>/<summary>` reicht (lazy MathJax typesetzt beim Aufklappen via IntersectionObserver) — Muster: SelfTest-Komponente in 02-algos/S24.tsx, für weitere Quiz-Folien wiederverwenden.
- Quiz-/Selbsttest-Folien: aufklappbares `<details>/<summary>`-Muster als lokale `<Frage>`-Komponente in chapters/01-intro/S11.tsx — für weitere Selbsttests dieses Muster übernehmen (Frage sichtbar, „Lösung anzeigen" klappt auf).
- Folien-Quizfolien als Selbsttest: das wahr/falsch-QuizWidget-Muster aus S71 (Statement + Buttons + Erklärung bei Antwort) 1:1 wiederverwenden — auch für Mehrfachauswahl-Folien (jede Option als eigene wahr/falsch-Aussage), so in 02-algos/S22 umgesetzt.
- STYLE-Falle du/Sie: Widget-Captions, Quiz-Aufforderungen und Feedback-Texte rutschen leicht in die du-Form (Review 2.3 fand 8 Stellen) oder Sie-Form (S21Demos.tsx Z. 82) — auch dort wir-Form („Probieren wir aus", „Schieben wir n nach oben").
- Feste Hex-Textfarben in Widget-Beschriftungen (Legenden/Tabellen) müssen auch im Dark-Mode lesbar sein: kein slate-700 #334155 auf Seitenhintergrund — neutral #64748b (slate-500) funktioniert auf weißem Canvas UND dunkler Seite (Review S24).
- Folienfehler 01-intro: „Warum so viel Mathe" (Z. 84) hat n = 1.000 bei p = 10.000 (XᵀX wäre singulär, naive Formel unanwendbar) — Skript §1.1 nutzt n = 100.000; in Beispiel 1 (Z. 126/130) ist die Störung 0,005 %, nicht „0.01%" (0,0001/2,0001 ≈ 5·10⁻⁵).
- Argument-Makros (\wt, \wh) IMMER mit Klammern schreiben (\wt{f}, nie \wt f) — der Bestand nutzt durchgehend \wt{f}; R-Code von Folien als <pre><code>-Block im S73-Stil zeigen, nicht nur paraphrasieren (Review 2.2).
- Live-IEEE-Widgets neben R-zitierender Prosa brauchen einen expliziten Diskrepanz-Hinweis IM Widget (naive JS-Summe vs. R-mean-Nachkorrektur, z. B. k=9: -128 statt 0) — sonst widerspricht der Default-Zustand dem Beispiel im Text (Review 2.1).
- Folien-R-Code auf KAPITEL-Ebene auf Abdeckung prüfen: der naive Rekursions-Code (02-algos „Komplexitätsanalyse 2") fehlte im ganzen Kapitel, weil S22 nur den iterativen zeigt — Review 2.5 hat ihn als <pre><code>-Block in S25 ergänzt; Vergleichstabelle 2.5.3 (T(n)=2F_{n+1}−1, Modellzeiten) per node nachgerechnet: alle Werte korrekt.
- Anker-Audits: die Top-Level-Anker sec-K.n stehen NICHT in den Abschnittsdateien, sondern werden von App.tsx als id={`sec-${id}`} pro Registry-Section erzeugt — ein grep nur über src/chapters meldet sie fälschlich als fehlend (Integrationslauf Kap. 1+2: alle 688 Mathe-Literale headless fehlerfrei, Konzept-Abschluss vollständig, Build grün).
