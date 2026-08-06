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

## KAPITEL 3 (Foliensatz 03-matrix-spur-norm) — Bauauftrag 2026-08-05

- `src/chapters/03-matrix-spur-norm/`, S31–S36, Anker `#sec-3.1` …
  `#sec-3.6`; Labels „3.k.n". Regeln wie Kapitel-7-Block (sinngemäß).
- Widget-Recycling: die private App
  `/home/fabians/lehre/FMM/fmm-lmu/interactive/heath-ch2/` enthält zu
  Vektor-/Matrixnormen erprobte Widgets (S23.tsx: Einheitskugel-Vergleich
  der p-Normen; S233.tsx: Konditionszahl-Spielwiese mit Einheitskreis-
  Ellipse). NUR CODE übernehmen, Labels deutsch, Prosa eigenständig
  (App-Prosa ist buchadaptiert, Skript ist öffentlich).
- Passende Tooltips existieren: euclidean-norm, norm, trace,
  eigenvalue-eigenvector, singular-value-decomposition, spectral-radius,
  cauchy-schwarz-inequality, … (`ls src/concepts/`).
- Kapitel 3.6 (Zusammenfassung) schlank halten.

## KAPITEL 4 (Foliensatz 04-fehler) — Bauauftrag 2026-08-05

- `src/chapters/04-fehler/`, S41–S44, Anker `#sec-4.1` … `#sec-4.4`;
  Labels „4.k.n". Regeln wie Kapitel-7-Block (sinngemäß).
- Zwischenüberschriften einheitlich: h3 mit
  className="mt-6 text-lg font-semibold" (Review-Befund Kapitel 3:
  S32–S35 wichen ab — nicht wiederholen).
- Querbezüge: Auslöschung/Varianz-Verschiebungsformel ist in Kapitel 2
  (`#sec-2.1`, AusloeschungDemo in 02-algos/widgets/S21Demos.tsx) schon
  ausführlich — im Varianz-Stabilitätsbeispiel VERLINKEN, nicht
  duplizieren. Konditionszahl einer Matrix κ(A)=‖A‖‖A⁻¹‖ ist in
  Kapitel 3 (`#sec-3.5`) eingeführt — darauf verweisen.
- Widget-Recycling: private App
  `/home/fabians/lehre/FMM/fmm-lmu/interactive/heath-ch2/` (Kondition/
  Fehlerfortpflanzung) — NUR CODE, Labels deutsch, Prosa eigenständig.
- Passende Tooltips existieren: condition-number, rounding-error,
  cancellation, machine-epsilon, floating-point, norm, euclidean-norm,
  taylor-series, gradient-descent, … (`ls src/concepts/` prüfen).
- Kapitel 4.4 (Zusammenfassung) schlank halten.

## KAPITEL 5 (Foliensatz 05-lgs) — Bauauftrag 2026-08-05

- `src/chapters/05-lgs/`, S51–S55, Anker `#sec-5.1` … `#sec-5.5`;
  Labels „5.k.n". Regeln wie Kapitel-7-Block (sinngemäß); h3-Konvention
  „mt-6 text-lg font-semibold".
- Farbcode-Vorgabe VOR dem Schreiben abstimmen: Der Kapitel-4-Lauf
  brauchte einen Nachputz, weil drei Abschnitte drei verschiedene
  Farben für denselben Begriff wählten. Für Kapitel 5: in
  Eliminations-/Zerlegungsrechnungen Pivot rot (\cred), aktuelle
  Zeile/Multiplikator blau (\cblue), Ergebnis-/L-Einträge grün
  (\cgreen); κ/Verstärkung bleibt orange.
- Querbezüge: Komplexität/O-Notation → Kapitel 2 (`?k=02-algos#sec-2.4`),
  Konditionszahl κ(A) → `?k=03-matrix-spur-norm#sec-3.5` und
  `?k=04-fehler#sec-4.2`, Stabilität/„schlecht konditionierte Schritte
  früh" → `?k=04-fehler#sec-4.3`, Dreieckssysteme/QR/KQ →
  `?k=07-kq` (dort Vorwärts-/Rückwärtseinsetzen im KQ-Kontext).
  Quer-Kapitel-Links IMMER als `?k=<kapitel>#sec-…` (Lesson!).
- Widget-Recycling: private App
  `/home/fabians/lehre/FMM/fmm-lmu/interactive/heath-ch2/` behandelt
  genau LGS/Elimination/LU/Cholesky (Heath Kap. 2) — Widget-CODE
  (Eliminations-Stepper, Matrix-Renderer) darf recycelt werden, Labels
  deutsch, Prosa/Captions eigenständig. Prosa-Verbot gilt weiterhin.
- Passende Tooltips existieren: lu-decomposition,
  cholesky-factorization, gaussian-elimination, triangular-matrix,
  triangular-solve, positive-definite, symmetric-matrix, sparse-matrix,
  permutation-matrix, covariance-matrix, … (`ls src/concepts/` prüfen).
- Kapitel 5.5 (Zusammenfassung) schlank halten.

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
- Folien-R-Chunks mit matrix(c(...)) prüfen: R füllt SPALTENWEISE — zeilenweise gemeinte Folien-Matrizen bauen stillschweigend Aᵀ (03-matrix-spur-norm „Visualisierung Operatornorm"; Singulärwerte zufällig identisch, gedrucktes A/AtA aber falsch) — Skript-Codeblöcke mit byrow=TRUE schreiben und Output per Rscript --vanilla verifizieren.
- Folien 03 (Eigenschaften/Zusammenfassung): Maximumsnorm-Gegenbeispiel und Quiz-SOLUTIONs stehen nur in AUSKOMMENTIERTEN Folienblöcken — im Skript ausformulieren (nachgerechnet: A=Einsermatrix ⇒ ‖A²‖_M=2>1=‖A‖_M²; Zufallstest: alle anderen Kapitel-3-Normen submultiplikativ).
- Deutsche Anführungszeichen „…" NICHT in JSX-String-Attributen (z. B. EnvBlock label="…") verwenden — das schließende Zeichen wird im Bestand als ASCII-Quote gesetzt und beendet dort das Attribut (Parse-Fehler); im JSX-Fließtext ist „…" dagegen fein, Attribut-Labels umformulieren.
- Folienfehler 03 „Schattennormen": Def.-Satz verstümmelt („…mit AᵀA mit Eigenwerten…") und der ‖A‖F²=tr(AᵀA)-„Beweis" setzt die Behauptung in der ersten Gleichung voraus und schreibt tr(PᵀΛP) statt tr(PΛPᵀ) — Skript §3.4 (Satz 3.4.3) beweist elementweise + Spur-Zyklizität; Beispiel 3.4.6 rechnet A=(2 1; 0 1), dieselbe Matrix wie die §3.3-Operatornorm-Visualisierung (σ ≈ 2,288/0,874) — S33 kann darauf verweisen.
- Foliensatz 03: die Frobenius-Norm ist bereits im Folien-Block „Die Spur einer Matrix" definiert und in Skript §3.1 (Def. 3.1.8, Satz 3.1.10 mit Spur-Darstellung) ausgearbeitet — §3.2 nicht neu definieren, sondern auf §3.1 verweisen.
- Folienfehler 03-matrix-spur-norm (Z. 534, auskommentiert): das Gegenbeispiel zu tr(AB)≠tr(A)·tr(B) ist falsch (vergleicht I₂ mit tr(I₁)·tr(I₁)=1, wo Gleichheit sogar gälte) — Skript §3.6 nutzt A=B=I₂: tr(AB)=2, tr(A)·tr(B)=4; Scratchpad ist zwischen parallelen Agenten geteilt, Prüfskripte eindeutig benennen (check-math-s36.mjs).
- Widget-Readouts nach dem Objekt benennen, aus dem sie gerechnet werden (S34: ‖Q_θA‖, nicht ‖A‖ — sonst zeigt die Invarianz-Demo scheinbar nur Konstanten); Satz-/Korollar-Nummern in Widget-Captions beim Review mitprüfen (S34-Caption zitierte „Satz 3.4.6" statt 3.4.7).
- Folien-Ungenauigkeiten 03 „Eigenschaften der Spur" (Z. 82–87): Eigenschaft 1 heißt dort „Linear", ist aber nur die Additivität (Homogenität steht separat als 2), und das in Eigenschaft 4 benutzte P wird im Satzkopf nicht deklariert — Skript Satz 3.1.4 schreibt „Additiv" und ergänzt „invertierbares P ∈ R^{n×n}".
- Review 3.6: Folien-Stichpunktlisten („Anwendungen", „Praktische Hinweise") zählen zur Vollständigkeit — Ähnlichkeitsinvarianz/char. Polynom fehlten in der Zusammenfassung; die Folien-Formulierung „Kondition = Verhältnis der extremen Eigen-/Singulärwerte" (Z. 500) nur mit Einschränkung übernehmen (Eigenwerte: symmetrischer Fall, Beträge).
- Review 3.3: die Folien-Implikation „|λ(Q)|=1 ⇒ κ₂(Q)=1" (Orthogonalmatrizen, Z. 307-308) nicht wörtlich übernehmen (Eigenwertbeträge bestimmen κ₂ i. A. nicht) — Skript leitet κ₂(Q)=‖Q‖₂‖Q⁻¹‖₂=1 über die Orthogonalität von Q⁻¹=Qᵀ her; außerdem fehlt in der Folien-p-Norm-Definition (Z. 278) der Betrag (v_i^p statt |v_i|^p) — Skript setzt |v_i|^p.
- Review 3.5: Kapitel 3 nutzt ‖·‖_∞ (Zeilensummen-Operatornorm) UND ‖·‖_M (elementweise Maximumsnorm) — in Äquivalenzketten explizit sagen, welche gemeint ist; Widget-Statustexte auf Grenzfälle prüfen: submultiplikative Normen erreichen Quotient ‖AB‖/(‖A‖‖B‖) = 1 exakt (A=B=I), also „höchstens 1" schreiben, nicht „unter 1".
- Folienfehler 03 Z. 221: die Vertauschungsmatrix (0 1; 1 0) ist KEINE „Rotation um 90°", sondern eine Spiegelung an x₂=x₁ (det = −1; Rotation wäre (0 −1; 1 0)) — Skript §3.2 (Beispiel 3.2.6) sagt korrekt Spiegelung.
- Integrationslauf Kap. 3 (2026-08-05) ohne Reparaturbedarf: tsc/Build grün, alle 2737 Mathe-Literale headless fehlerfrei, 118 verlinkte Konzept-ids vollständig (133 Module, keine Duplikate) — der Gesamt-Check liegt als check-math-final.mjs im Scratchpad und deckt chapters+concepts inkl. Template-Literale ab.
- Varianz-Beispiel §4.3 (Rscript verifiziert): mean(x^2)-mean(x)^2 liefert bei c=10^10 exakt 16384 = 2^14 = ULP bei 10^20 (gute Pointe); Widgets mit an c gekoppelten Termen a=c²+1, b=c² müssen |a−b|=1 ANALYTISCH setzen — in Doubles ist (c²+1)−c² für c ≥ 10^8 schon 0, der „Konditions-Rechner" zeigte sonst κ=∞ statt 2c².
- Folienfehler 04-fehler „Beispiel: Fehlerzerlegung" (Z. 174–175): Vorzeichenfehler in den Zwischenzeilen — der Algorithmusfehler ~f(3)−f(3) ist −Σ_{n=3}^∞ 3^n/n! (Minus fehlt) bzw. 8,5−e³ (Folie schreibt e³−(1+3+9/2) = +11,585); die Endwerte −11,6 und −3 stimmen — Skript §4.1 (Beispiel 4.1.6, nachgerechnet: −11,586 −3,055 −14,641) rechnet korrekt; Eq-Literale in eigener Zeile (<Eq tag>\n{"…"}) erfasst das check-math-Skript nur mit zusätzlicher <Eq>-Regex (check-math-s41.mjs).
- Farbwörter im Fließtext („der grüne Term") NICHT als \text{…} in Mathe-Literale packen (Umlaut+JSX-Escaping fragil) — stattdessen <span> mit inline-Hex aus der \cb*-Palette (so in 04-fehler/S44.tsx).
- Review 4.4: κ(A)=‖A‖‖A⁻¹‖ ist nur OBERE Schranke der relativen Kondition von x↦A⁻¹x (Folie 04 Z. 245: κ_rel=κ_abs‖Ay‖/‖y‖ ≤ κ(A)), nicht „die" Kondition — Formulierungen entsprechend abschwächen; Folien-Übersicht Z. 400 schreibt Δ_v unfett, die Definition (Z. 85) fett \bDelta — Skript nutzt durchgehend \bDelta.
- Review 4.1: Widget-Statustexte, die Beispielzahlen zitieren, müssen mit den Live-Readouts UND untereinander arithmetisch konsistent sein („−11,59 + (−3,06) = −14,64" war falsch gerundet: Summe wäre −14,65, Readout zeigte −3,055 — jetzt −11,586 + (−3,055) = −14,641); ConceptLink-id triangle-inequality ist in S41 verlinkt, Modul fehlt noch (Konzept-Pool).
- Folienfehler/-lücken 04 „Kondition": die κ_rel-Herleitung für f(x)=A⁻¹x (Z. 240–246) ist verdreht (behauptet κ_abs‖x‖/‖A⁻¹x‖ ≤ κ_rel und springt dann zur Gleichheit) — Skript Satz 4.2.6 leitet κ_rel = ‖A⁻¹‖‖x‖/‖A⁻¹x‖ sauber über den Gleichheitsfall der Operatornorm her; außerdem hat f(x)=1/x asymptotisch κ_rel = 1 (der Blow-up im Folienbeispiel Z. 191–200 betrifft κ_abs = 1/x² bzw. relativ nicht-kleine Störungen) — Beispiel 4.2.5 klärt das, und in Aufgabe Z. 291 gilt sogar κ_abs = √2 (Cauchy-Schwarz-Gleichheitsfall), nicht nur ≤.
- Review 4.3 (Folien Z. 298–396 fehlerfrei, alle Zahlen per Rscript/Ableitung bestätigt: 1.023151, 16384=2^14=ULP(10^20), κ·ε≈4·10⁴): der Fehlerzerlegungs-Recap in S43 färbt den Folgefehler bewusst BLAU statt orange wie Eq (4.1.1), weil Orange in §4.2/§4.3 durchgehend κ_rel markiert — nicht „korrigieren"; Heath-Verweis Stabilität ist §1.2.7 „Stability and Accuracy" (per pdftotext verifiziert).
- Widget-Readout-Formatter: NaN (undefinierter Quotient, z. B. Verstärkung bei ε=0) von Infinity trennen — fmt(NaN) zeigte fälschlich ∞, und `x < s`-Statusverzweigungen kippen bei NaN in den falschen Zweig (mit !(x >= s) verzweigen); Slider-Bereiche so wählen, dass der gestörte Punkt im SVG-viewBox bleibt (Review 4.2: x max 2,8 statt 3 bei ε ≤ 0,55, Kurvenende 3,35).
- Konzept-Modul `triangle-inequality` existiert jetzt (beide Formen: normal + umgekehrt, Sandwich-Widget |‖a‖−‖b‖| ≤ ‖a+b‖ ≤ ‖a‖+‖b‖) — S41-Links auflösbar; alle übrigen Kap.-4-Konzept-ids (norm, condition-number, matrix-norm, rounding-error, floating-point, cancellation, linear-system) hatten schon Module.
- Kapitel werden EINZELN per ?k= geladen: Quer-Kapitel-Links als href="?k=<kapitel-id>#sec-K.n" schreiben (nackte #sec-Links anderer Kapitel sind tote Links; Integrationslauf Kap. 4 fixte 12 Stück in 04-fehler) — App.tsx scrollt jetzt nach dem Lazy-Load selbst zum Hash (useEffect auf mod), sodass Fragment-Deep-Links funktionieren.
- Gedankenstrich-Budget aus STYLE.md ist HART und wird gemessen: höchstens
  einer pro 300 Wörter, „ – " statt „—". Ungebremst schreiben Agenten einen
  pro 70 Wörter; das war die erste Leserkritik von aussen (2026-08-06).
- Erklärfenster (src/lib/tooltip): Hover öffnet eine sofort benutzbare
  Vorschau, Klick (oder 📌) heftet sie fest — angeheftete Fenster sind
  verschiebbar, überleben Scrollen und schliessen nur per ×/Esc/Klick daneben.
  Kein Lock-Timer, kein Korridor mehr. src/lib ist für Kapitel-Agenten tabu.
- Gendern: KEIN Gender-Doppelpunkt („Statistiker:innen"). Der kollidiert mit
  der MDX-Direktiven-Syntax (`:name[...]`) und lässt den Build scheitern.
  Dozenten-Entscheidung 2026-08-06: „Statistiker/innen" oder
  „Statistiker*innen" verwenden, beides ist gleichwertig.
- Quiz-Blöcke werden als MDX-Direktiven geschrieben (`::::quiz` /
  `:::frage{wahr|falsch}`), nicht als JS-Array im MDX. Dozenten-Entscheidung
  2026-08-06. Dafür gehört EINE generische <Quiz>/<Frage>-Komponente nach
  src/lib/ — sie ersetzt die vier kopierten QuizWidget-Duplikate in den
  Kapiteln.
- MDX wird das Autorenformat, und die BESTEHENDEN Kapitel werden ebenfalls
  migriert (Dozenten-Entscheidung 2026-08-06), also 28 Abschnittsdateien
  plus die 134 Konzept-Module. Reihenfolge: erst den vorbestehenden
  Dev-Server-Bug (typesetzt gar keine Mathe) fixen, dann Plugin +
  <Quiz>/<Frage> nach src/lib, dann Kapitel 5 als erstes echtes MDX-Kapitel,
  dann die Migration der Altkapitel.

## Als Nächstes (offen, aus Council-Runde 2 vom 2026-08-06)

1. **Proof/Quiz sind deutsch verdrahtet.** `src/lib/Proof.tsx` schreibt
   „Beweis.", „Schritt für Schritt", „nächster Schritt"; `src/lib/Quiz.tsx`
   schreibt „wahr"/„falsch", „Richtig!", „Leider nein, …". Für das Skript ist
   das richtig, aber die Bibliothek liegt in acht Apps, und die
   interactive-textbook-Skill baut standardmässig ENGLISCHE Bücher. Seit die
   Direktiven englische Zweitnamen haben (`::::proof`, `:::question{true}`),
   ist die Hälfte der Übersetzung fertig und die andere fehlt: ein englisches
   Buch bekommt eine deutsche Beweis-Box. Lösung wie bei `TooltipProvider`:
   ein `labels`-Prop bzw. ein Provider mit DEUTSCHEN Defaults, damit das
   Skript unverändert bleibt, und englische Labels im Skill-Template.
2. **Das Orakel sieht Inline-Auszeichnung nicht.** `contentSignature` in
   `mdx/inventory.mjs` läuft durch `<em>/<strong>/<code>/<sub>/<sup>`
   hindurch, deshalb vergleichen sich `x<sub>1</sub>` und `x1` sowie
   `<code>fib(5)</code>` und `fib(5)` als GLEICH. In einem Mathetext ist ein
   verlorener Index echter Schaden. Beim Migrieren der restlichen 27
   Abschnitte also zusätzlich per Auge prüfen — oder die Marker in
   `contentSignature` um diese Elemente erweitern (dann aber gegen den
   Pilotabschnitt auf Fehlalarme testen).

Beides ist in der Skill-Doku (`references/verification.md`) als bekannter
blinder Fleck vermerkt, nicht stillschweigend fallengelassen.
