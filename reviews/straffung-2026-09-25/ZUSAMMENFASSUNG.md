# Straffungs-Durchgang 2026-09-25/26: Zusammenfassung

Auftrag: weiterer Deslop- und Schreibdurchgang, der das Skript zugleich kürzt
und Zusatzstoff deutlicher als optional absetzt; Kapitel und Konzept-Pop-ups;
Qualität vor Mengenreduktion. Regeln für alle Agenten: [`BRIEF.md`](BRIEF.md).

## Ergebnis in Zahlen

„Haupttext" = alles außerhalb von `:::vertiefung`, also das, was bei
zugeklappten Boxen zu lesen ist. Zählung: `node reviews/straffung-2026-09-25/zaehlen.mjs`
(Wörter inkl. Mathe/Markup, gegen den eingefrorenen Ausgangsstand).

| Kapitel | Haupttext vorher | nachher | Δ | gesamt Δ |
| --- | ---: | ---: | ---: | ---: |
| 01 intro | 1 545 | 1 554 | +0,6 % | −1,3 % |
| 02 algos | 7 460 | 6 852 | −8,2 % | −12,4 % |
| 03 matrix-spur-norm | 8 975 | 7 843 | −12,6 % | −12,9 % |
| 04 fehler | 7 112 | 6 401 | −10,0 % | −9,7 % |
| 05 lgs | 6 308 | 6 550 | +3,8 % | −4,4 % |
| 06 svd | 11 323 | 10 240 | −9,6 % | −6,3 % |
| 07 kq | 10 767 | 9 681 | −10,1 % | −4,9 % |
| 08 la-misc | 10 766 | 9 623 | −10,6 % | −6,5 % |
| 09 tensoren | 11 621 | 10 041 | −13,6 % | −9,2 % |
| 10 differentialrechnung | 27 078 | 22 257 | −17,8 % | −13,3 % |
| 11 konvexitaet | 16 093 | 11 844 | −26,4 % | −14,1 % |
| 12 optim | 22 458 | 18 046 | −19,6 % | −13,1 % |
| 13 funktionsapproximation | 26 758 | 21 470 | −19,8 % | −11,3 % |
| **Summe Kapitel** | **168 264** | **142 402** | **−15,4 %** | **−10,7 %** |
| Konzept-Pop-ups (134) | 26 003 | 24 900 | | −4,2 % |

Wo ein Kapitel unter dem Richtwert blieb oder sein Haupttext wuchs (Kap. 1, 2,
5, 6, 7), liegt das fast immer an Folienstoff, den die Kürzung vom 2026-08-26 in
Vertiefungen versteckt hatte oder der ganz fehlte, und den die Agenten jetzt in
den Haupttext zurückgeholt haben (Kap. 5: Strassen-Folie, Hilbert-Demo,
L_k⁻¹-Aussage, Cholesky-R-Chunk, Opener-Quiz 2; Kap. 6: rund 490 Wörter;
Kap. 2: Θ, f̃-Komposition u. a.). Das Leitprinzip „Haupttext = Folien
vollständig" geht dem Kürzungsziel vor.

## Was gemacht wurde

- **Leitprinzip:** Der Haupttext deckt jede gezählte Folie ab (inkl.
  Quizfolien) und ist bei zugeklappten Vertiefungen lückenlos lesbar;
  Klausurthemen der alten Klausuren bleiben im Haupttext. Grundlage waren die
  aktuellen Decks (`fmm-lmu`, Zweig `revise2627`, `slides/*.qmd`).
- **Je Kapitel:** Editor (bei Kap. 10–13 zuerst ein Planer, dann zwei
  Editoren) → unabhängiges Gutachten mit Reparatur gegen den Ausgangsstand
  `21b998d` → Commit. Berichte: `<kapitel>.md` bzw. `-plan.md`/`-teil*.md`,
  Gutachten `-review.md`.
- **Pop-ups:** vier Batches à ~34, je Editor + Gutachten
  (`konzepte-*.md`). Ziel ≤ ~180 Wörter Prosa; wo Linkstellen Stoff brauchen,
  blieb er. Gekürzt wurden vor allem die langen Pop-ups (Maximum 367 → 248
  Wörter inkl. Mathe); der Median lag schon nahe am Ziel und blieb fast gleich
  (189 → 187). Der Hauptgewinn bei den Pop-ups ist Qualität: Fachfehler,
  verstümmelte Sätze und Leitfragen, die nicht zum Widget passten.
- **Querverweise:** alle 273 kapitelübergreifenden `@`-Verweise inhaltlich
  geprüft (Trägt das Ziel die Aussage?), 18 korrigiert
  (`querverweise-{A,B,C}.md`).
- **Oberfläche:** Marke „Vertiefung · optional", PDF-Label
  „Vertiefung (optional)", Bedienungshinweis korrigiert (sprach noch von
  Vertiefungen als Widget-Rahmen), Leitsatz in S11.
- **Fachfehler** (Auswahl, alle gegen Quelle bzw. Nachrechnung geprüft):
  floating-point „tausendmal" → 512-mal; Taylor-Widget Faustwert 1/6 → 1/8;
  Cholesky-Widget „positiv semidefinit" bei s = 0 → „nicht positiv definit";
  Pop-up spectral-radius „für jedes c"; optimization-Lead-out „Mulden-Minimum
  nie global" gestrichen; S81 „konvergiert nichts mehr" bei |λ₁| = |λ₂|;
  S85 erster Teil endet mit Kap. 9; S94 Tensorproduktbasis braucht die
  universelle Eigenschaft; S125 umgekehrte Selbsttestantwort (Lasso-Ecke).
  Die Gutachten listen je Kapitel alle Korrekturen.

## Entscheidungen für den Dozenten

Sortiert nach Gewicht. Details und weitere Kleinfragen stehen im jeweiligen
Gutachten, Abschnitt „Restpunkte".

**Klausurstoff, der im Skript fehlt**
1. Kap. 7: Klausur WS23/24-1 (QR in die Normalengleichungen → `Rx = Qᵀb`) und
   WS23/24-2 (dieselbe Reduktion mit der SVD) stehen weder auf den Folien noch
   im Skript. Je ein Satz in S74/S76?

**Folienstoff, der noch in einer Vertiefung liegt**
2. Kap. 10 S103: Backprop-Widget („Vorwärts und rückwärts durch ein winziges
   Netz") liegt seit August in einer Vertiefung; Backprop selbst steht jetzt
   als Prosa im Haupttext. Widget zurückholen (+~150 Wörter)?
3. Kap. 7: Householder-Vorzeichenwahl (Bemerkung mit Auslöschungs-Widget) in
   der Vertiefung, die Regel als Satz im Haupttext. Prüfungsrelevant?
4. Kap. 11 S114: Konkavität der logistischen Log-Likelihood (Beispiel) nur in
   einer Vertiefung; Kap. 12 verweist darauf. Kap. 10: Matrix-Completion-
   Zielfunktion nur in einer Vertiefung, die Übersicht in S115 (Haupttext)
   nennt sie.
5. Kap. 3: Folie „Ausblick: Normen in Machine Learning" steht nach dem
   Anhang-Marker, trägt selbst aber kein `visibility=uncounted`. Gezählt?
   Dann gehören Ridge/LASSO/Nuklearnorm in den S36-Haupttext.

**Folien und Skript widersprechen sich** (für das Folienfehler-Register)
6. Kap. 1: Matrixmultiplikation 1000^2,373 ≈ 1,3·10⁷ (Folie 2·10⁸),
   1000^2,807 ≈ 2,6·10⁸ (Folie 6·10⁸); daran hängt „Faktor 50".
7. Kap. 2: Ist die Fibonacci-Schleife „iterativ"? Folie (Definition + Quiz)
   ja, Folie „Algorithmenarten in ML" und Skript nein.
8. Kap. 4: Kompositionssatz auf der Folie exakt mit ‖h(y)‖, im Skript
   asymptotisch (o(1)) mit ‖h(ỹ)‖.
9. Kap. 5: Hilbert-Demo „ca. 1000×" hängt an LAPACK/BLAS (JS 38,6×, numpy
   84×); ohne R nicht nachrechenbar.
10. Kap. 8: Lanczos „O(kp²), 10 000-mal schneller" (Folie) vs. kein pauschaler
    Faktor (Skript); SRHT O(n log m) (Folie) vs. O(n log n) (Skript);
    Benchmark-Zahlen der Folie (~40×/~11×) fehlen im Skript.
11. Kap. 9: S94-Beispielpolynom weicht von der Folie ab (Widget-Preset und
    Prüfscript hängen daran).
12. Kap. 13: S137 `bs()` ohne `Boundary.knots = c(0, 2*pi)` (Folie mit);
    h⁴-Tabelle der Folie hat eine Zeile mit 7 Knoten; Bias-Varianz-Zahlen der
    Folie weichen von der Skript-Simulation ab.

**Umfang und Stil**
13. Weitere Kürzungskandidaten, falls gewünscht (alle korrekt, aber
    entbehrlich): Kap. 6 (~120 W), Kap. 8 (Selbsttests ohne Folienbezug,
    ~180–330 W), Kap. 9 (Korrelationsabsatz, Wetterfeld), Kap. 10
    (Hesse-Beweisskizze S107, Schranken-Bemerkung S106). Umgekehrt ist Kap. 11
    mit −26 % leicht über dem Richtwert.
14. Kap. 13 S133: Gram-Schmidt/Legendre-Absatz (gezählte Folie) steht jetzt im
    Haupttext. So lassen?
15. Pop-up big-o-notation: Kap. 10 verlinkt es auch für klein-o, das Pop-up
    definiert nur O. Einen Satz zu o(·) ergänzen?

## Nicht angefasst, nur gemeldet

- **Widget-TSX** (außerhalb des Auftrags): CancellationWidget sagt ab k = 6
  „dominieren die vorhandenen Fehler" bei noch ~10 Stellen;
  ClosedBoundedSetWidget vergleicht [0,2; 1] mit (0; 1]; trace-Widget lässt
  die Diagonale editieren, der Lead-out setzt 3/3 voraus; GramSchmidt-Widget
  nennt a₁, a₂, das Pop-up v₁, v₂; LUKosten-Schätzfrage und MDX-Zahlfrage
  fragen in S53 dasselbe; S23KonstantenWidget ist gebaut, aber nirgends
  eingebunden.
- **Prüfscript-Kommentare** mit veralteten Zeilennummern oder Bezug auf
  gestrichene Stellen (06-svd, 04-fehler, 07-kq, 13-…-S139, 02-…-S23); die
  Prüfungen selbst sind gültig.
- `lint:numbers` meldet noch einen Preset-String „Beispiel 9.5.4" in
  `S95Vektorisierung.tsx` (vorher 24 Warnungen).

## Prüfungen (Endstand)

`npm run build` (gen:toc, gen:numbers, lint:numbers, typecheck:mdx über 206
Dateien, test:mdx inkl. Orakel, test:lib, tsc, vite build) grün;
`npm run verify:numbers` 124/124 grün; `gen-numbers --check` aktuell.
Headless-Rendering von Kap. 1, 2, 11: 0 MathJax-Fehler, 0 Seitenfehler, Marke
„Vertiefung · optional" sichtbar.

## Ablauf und Lektionen

Zwei Workflows mit je zwei Bahnen (4 Agenten parallel). Zweimal brach ein
Nutzungslimit den Lauf ab; die Arbeit auf der Platte wurde jeweils als
WIP-Commit gesichert und der Rest neu gestartet. Ein Wiederaufsetzen per
`resumeFromRunId` startete schon erledigte Aufrufe neu und wurde nach einer
Minute ohne Schaden gestoppt. Die Lektionen stehen im deslop-Skill
(`.claude/skills/deslop/references/long-document-procedure.md` §7) und im
ai-Repo (agent-orchestration).
