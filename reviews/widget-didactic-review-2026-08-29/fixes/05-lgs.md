# Fix-Log Kapitel 5 (05-lgs) — REV29, 2026-08-29

Grundlage: `reviews/widget-didactic-review-2026-08-29/05-lgs.md`.
Prüfskripte: `scripts/verify/REV29/05-lgs-S52Hilbert.mjs`,
`…-Stepper.mjs` (RueckSub, LU, Cholesky, Pivot), `…-Anwendungen.mjs`
(LUKosten, SpdRichtung, CholeskySampler).

---

## Kapitelweiter Befund (F1/F6)

**Umgesetzt**
- [MAJOR] Alle sieben Header, die `verify-05-lgs/verify.mjs` zitierten, zeigen
  jetzt auf existierende Skripte (`scripts/verify/R3/widgets-05.mjs` und die drei
  neuen REV29-Skripte). Das Skript `05-lgs-Stepper.mjs` prüft am Ende explizit,
  dass der tote Pfad in keiner der acht Widget-Dateien zurückkehrt.
- Neu abgedeckt: Cholesky-Faktor L = (2 0 0; 1 3 0; −1 1 2) und die
  SPD-Eigenschaft der Standardmatrix, die LU-Standardzerlegung samt L·U = A und
  L y = b, die drei Divisionen und neun Operationen des Rückwärtseinsetzens, der
  vollständige Fehlerverlauf der Pivot-Demo über den Regler, sämtliche
  Hilbert-Zahlen (n = 2 … 11) und L₂₂ = σ₂√(1 − ρ²) des Samplers.

**Rationale.** Ein Header, der ein nicht existierendes Skript nennt, ist
schlechter als eine ehrliche Notiz. Die drei Skripte decken jetzt die Zahlen ab,
an denen die Verdikte und die Quizfragen hängen.

## L1 — HilbertInverseVergleich (`S52Hilbert.tsx`, Kasten 1)

**Umgesetzt**
- [MAJOR] `:8-10` Der Scratchpad-Nachweis ist ersetzt. Das neue Skript rechnet
  κ∞ zusätzlich **exakt** (Binomialformel der Hilbert-Inversen in BigInt) und
  verlangt, dass die Gleitkommarechnung des Widgets ihn auf 1 % trifft; die
  Fehlerwerte für n = 11 stehen hartkodiert.
- [MINOR] `S52.mdx:91-93` A1: Der Kasten beginnt jetzt mit einer Frage.
- [MINOR] `:73-75` E5: `sci()` schreibt Mantisse · 10^Exponent statt „2,70e1".
- [MINOR] `:92-96` Die Schwelle heißt nicht mehr „n ≥ 9", sondern κ∞ · ε > 10⁻⁴,
  und das Verdikt nennt den aktuellen Wert samt Begründung („von 16 Stellen
  bleiben höchstens vier"). Dass die Schwelle weiterhin genau ab n = 9 greift,
  prüft das Skript für den ganzen Reglerbereich.

**Offen / Entscheidung nötig**
- [MINOR] B1: Log-Plot über n statt drei Zahlkacheln. Das ist der Umbau, der das
  Widget aus der Nähe der STATIC-Grenze holen würde — Anlageentscheidung.

## L2 — RueckSubStepper (Kasten 2)

**Umgesetzt**
- [MAJOR] `:28` Start bei `t = 1`: erste Komponente steht, Formelzeile und
  Verdikt sind sichtbar (Screenshot-Test bestanden).
- [MAJOR] `:95-105` D1: Zwischenschritte haben jetzt ein Verdikt („Zeile 2 ist an
  der Reihe …"), nicht nur die Stepper-Narration.
- [MINOR] `:104` „drei Divisionen" kommt aus `trace.lines.length`.
- [MINOR] `shared.tsx:85` Drei-Zustands-Regel: `backSub` meldet, ob das Pivot
  **exakt** null ist; zusätzlich warnt der Stepper, wenn das kleinste Pivot winzig
  gegen den Rest der Matrix ist („zwischen null und winzig liegt der Unterschied").
- [MINOR] `:81-86` Sichtbare Farblegende im Kasten (vorher nur in der MDX).

**Rationale.** Die tote Ansicht zeigte den Trivialfall und schwieg drei Schritte
lang; jetzt trägt jeder Reglerstand eine Deutung, und der Abschnitt, der vor
kleinen Pivots warnt, unterscheidet sie endlich von echten Nullen.

## L3 — LUZerlegungStepper (Kasten 3)

**Umgesetzt**
- [MINOR] `:57-62, :232-238` F3: Der Abbruchtext unterscheidet „exakt null" von
  „winzig, aber nicht null"; dasselbe am Ende für das Diagonalelement von U
  („singulär" nur noch bei exakter Null).
- [MINOR] `:246` Die L·U-Probe steht in Exponentialschreibweise; „0,000" kann
  keinen Rest von 4·10⁻⁴ mehr verstecken.
- [MINOR] `:209` Doppelzählung behoben: der Stepper zählt „Schritt k von n", die
  Narration benennt jetzt die Phase.

## L4 — PivotVergleich (Kasten 4)

**Umgesetzt**
- [MAJOR] `:27` Start bei ε = 10⁻¹⁵: die tote Ansicht zeigt 0,8882 gegen 1,0000
  und einen Fehler von 1,1·10⁻¹ gegen 4,4·10⁻¹⁶ (per CDP nachgemessen).
- [MINOR] `:1-12` F7: Der zerrissene Kopfkommentar ist neu gesetzt.
- [MINOR] `:47-53` E3: Die Fehlerspalte trägt zusätzlich ✓/✗, nicht nur Farbe.

**Offen**
- [MINOR] B1: Fehlerverlauf als zwei Kurven über log₁₀ ε — neues Bild, kein
  lokaler Fix. Die Zahlen dafür sind im Skript bereits abgesichert.

**lib-Befund**
- [MINOR] `src/lib/widgets/Slider.tsx:67` Das Wertfeld ist `w-14` breit, „ε = 1e-18"
  bricht darin um. `src/lib` ist tabu, gehört in den lib-Lauf.

## L5 — LUKostenPlot (Kasten 5)

**Umgesetzt**
- [MAJOR] `:108` D1: vier Verdikt-Zweige statt eines konstanten — Gleichstand bei
  J = 1 (mit Begründung n³/3 + n² = 1·(n³/3 + n²)), amortisiert bis J = 5,
  „deutlich billiger" dazwischen und für J ≥ n die Schranke n/3.
- [MAJOR] `:98-100` C8/B2: `xDomain` ist an J gekoppelt (`[1, max(10, 2J)]`); die
  Schwelle J = 2 liegt nicht mehr im ersten Pixel.
- [MAJOR] `S53.mdx:474-476` C7: „Schon ab der zweiten rechten Seite …" ist aus der
  Konsolidierung in den `verdeckt`-Block gewandert.
- [MINOR] `:83` gegen `S53.mdx:469` H6: Die doppelte Frage über dem Widget ist
  durch eine Hinführung ersetzt; die Frage stellt die Schätzfrage.
- [MINOR] `:83` `verdeckt` ergänzt (Gleichsetzung der Kosten) und `start={5}` gesetzt.

**Rationale.** Ein Verdikt, das nur den Readout wiederholt, deutet nichts; die
drei Regime benennen jeweils den Grund. Und die gefragte Schwelle ist jetzt im
Bild auffindbar.

## L6 — SpdRichtung (Kasten 6)

**Umgesetzt**
- [MAJOR] `:17, 25, 40` Start bei θ = 20° (q = +0,766, Aufgabe offen); `hit` hängt
  an `q < 0`; die Nullrichtung ist ein eigener Zweig und wird exakt über das
  1°-Raster erkannt (θ ≡ 45° mod 90°), nicht über `q <= 1e-9`.
- [MAJOR] `:8` F1: Header zeigt auf `05-lgs-Anwendungen.mjs`; dort ist q(θ) = cos 2θ
  über den ganzen Regler geprüft, inklusive der vier Nullrichtungen.
- [MINOR] `:20-22` G5: Die Fall-Knöpfe benutzen `W_BUTTON`/`W_BUTTON_AKTIV`.
- [MINOR] `:31-38` B3: Achsenbeschriftung x₁/x₂, Ticks bei ±1, und das „x" sitzt
  an der Vektorspitze statt am Ursprung.

**Offen**
- [MINOR] `:36` C1: `useDrag` auf dem Einheitskreis als Doppelpfad — sinnvoll,
  aber ein neuer Interaktionspfad, kein lokaler Fix.

**Rationale.** Das Widget begrüßte den Leser mit „Aufgabe geschafft"; jetzt ist
die Aufgabe beim Laden offen, und der Randfall q = 0 (semidefinit, nicht definit)
ist der didaktisch interessanteste Zustand statt eines Toleranztreffers.

## L7 — CholeskyStepper (Kasten 7)

**Umgesetzt**
- [MAJOR] `:95` Start bei `t = 1`.
- [MAJOR] `:143-155` B3: sichtbare einzeilige Farblegende; der `sr-only`-Absatz
  trägt nur noch die Zusatzinformation.
- [MAJOR] `:47-56` F3: drei Abbruchtexte — s < 0 („nicht einmal semidefinit"),
  s = 0 exakt („semidefinit, aber nicht definit", mit Verweis auf die pivotierte
  Variante) und 0 < s < 10⁻¹² („positiv, aber numerisch nicht unterscheidbar").
- [MINOR] `:167-198` F7: Der tote Knopfleisten-Block ist gestrichen.
- [MINOR] `:140` Die Aufgabenzeile nennt `maxT` statt der festen 6.
- Zusätzlich: die L·Lᵀ-Probe in Exponentialschreibweise.

## L8 — CholeskySampler (Kasten 8)

**Umgesetzt**
- [MAJOR] `:87-91, 185` F6: L wird nicht mehr aus σ₁, σ₂, ρ abgelesen, sondern per
  Koeffizientenvergleich aus Σ **zurückgerechnet**; die Probe max |LLᵀ − Σ| ist
  damit eine echte Probe (über den Reglerbereich in rund einem Drittel der
  Zustände ≠ 0, im Browser z. B. 2,220 · 10⁻¹⁶) und wird exponentiell gedruckt.
  Die geschlossene Form steht weiter als Formelzeile daneben und ist im Skript
  gegen die Rekursion geprüft.
- [MINOR] `:99-107` B3: sichtbare Legende.
- [MINOR] `:113-117` G6: `max-w-full h-auto`, Hintergrund über `var(--w-bg)` statt
  `bg-white` (Dunkelmodus, Tooltip-Panel).

**Rationale.** Eine Probe, die nicht scheitern kann, ist als Verifikation
irreführend — gerade in einem Kapitel, das Proben ernst nimmt.

## L9 — `shared.tsx`

**Umgesetzt**
- [MINOR] `:36-58` G3: `MatTable` bekommt eine Textalternative (`role="img"` plus
  zeilenweise vorgelesene Matrix mit optionalem Namen). ARIA-Grid-Rollen hätten
  eine andere DOM-Schachtelung gebraucht und das Zellenraster gesprengt.

---

## Selbsttest §5.4 (H4)

**Umgesetzt**: `S54.mdx` schließt jetzt mit einem Quiz. Die Zahlfrage ist ohne den
Sampler nicht zu beantworten (L₂₂ bei σ₁ = σ₂ = 1, ρ = 0,9 → 0,436, im Skript
asserted), die zweite Frage prüft genau den neuen semidefiniten Randfall des
Cholesky-Steppers.
**Wortzahl**: S54 +3,25 % gegen HEAD — leicht über dem 3-%-Ziel des Fix-Briefs;
der Überhang ist ausschließlich das geforderte Quiz, der übrige Abschnitt wurde
dafür zweimal gekürzt.

## Entscheidung nötig (nicht ausgeführt)

- **`S52Hilbert` als Log-Plot** (L1/B1): würde das Widget von der STATIC-Grenze
  wegholen, ändert aber seine Anlage.
- **`PivotDemo` als Fehlerkurve über ε** (L4/B1): dito.
- **`SpdRichtung` mit `useDrag`** (L6/C1): zusätzlicher Interaktionspfad.

## lib-Befunde (nicht angefasst)

- `src/lib/widgets/Slider.tsx:67` — Wertfeld `w-14` zu schmal für „ε = 1e-18".
