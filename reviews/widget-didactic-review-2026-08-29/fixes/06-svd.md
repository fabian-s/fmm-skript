# Fix-Log Kapitel 6 (06-svd) — REV29, 2026-08-29

Grundlage: `reviews/widget-didactic-review-2026-08-29/06-svd.md`.
Prüfskripte: `scripts/verify/REV29/06-svd-S61Ellipse.mjs` (Rasterlauf über
3,6 Mio. Winkel) und `scripts/verify/REV29/06-svd-Widgets.mjs` (zyklischer
Jacobi-Eigenlöser auf AᵀA, Rang-k als Projektion A V_k V_kᵀ).

---

## S1 — EinheitskreisEllipse (`S61EllipseWidget.tsx`, Kasten 1)

**Umgesetzt**
- [CRITICAL] `:137, :297-303, :153-161` Die 2-%-Toleranz entscheidet keine
  Strukturaussage mehr. „Vielfaches einer Orthogonalmatrix" und „singulär" werden
  **exakt auf den eingegebenen Rasterwerten** entschieden (`istIsotrop`: AᵀA = λI,
  `istEntartet`: det A = 0, beides in Ganzzahlarithmetik auf dem 10⁻⁶-Raster).
  Dazwischen liegen zwei ehrliche Stufen: „fast ein Kreis" (κ < 1,02, Maximalstelle
  eindeutig, aber schlecht abzulesen) und „fast entartet" (κ > 10³, σ₂
  wissenschaftlich formatiert, Sprache „schlecht konditioniert, nicht singulär").
  Im Trickfrage-Zweig heißt die Standardleiste jetzt „Eine Maximalstelle unter
  vielen", widerspricht dem Verdikt also nicht mehr.
  Browser-Nachweis (CDP, 1300 px): diag(1; 1,01) → „Fast ein Kreis" mit
  „Tatsächlich 90,0°"; diag(1; 0,0005) → „Fast entartet"; (1 2; 2 4) → „Entartet";
  Drehung und (3 −4; 4 3) → „Alle Richtungen gleich".
- [MAJOR] `S61.mdx:127-146` C7: Das `:::beispiel` mit 2,288, (0,851; 0,526) und
  „rund 31,7°" steht jetzt **hinter** dem interaktiven Kasten. Im Kastentext kommt
  keine dieser Zahlen mehr vor (per CDP geprüft).
- [MAJOR] `:136, :289-296` F3: siehe oben, plus wissenschaftliche Formatierung
  kleiner σ (kein „0,000" mehr für 10⁻⁵).
- [MAJOR] `:45-52` F1/F6: „historische Notiz" raus. Das neue Skript rechnet σ₁, σ₂
  und beide Extremstellen per Rasterlauf über 3,6 Mio. Winkel (also auf einem
  anderen Weg als das Widget), prüft v₁, u₁ᵀu₂ = 0, σ₁/σ₂ = 2,618 und alle drei
  Presets — und sichert die neue Fallunterscheidung gegen Rückfälle ab.
- [NOTE] `:218-246` Der Header behauptet nicht mehr, das Widget verrate vor dem
  Auflösen nichts; er sagt jetzt, dass die Kurve absichtlich gezeichnet ist.

**Rationale.** Das Widget verkaufte eine 2-%-Toleranz als Strukturaussage über A
und widersprach dabei seinem eigenen Readout. Strukturfragen entscheidet jetzt
die Eingabe, Größenfragen das Verhältnis σ₁/σ₂ — und dazwischen steht genau die
Stufe, die dem Kapitel über κ₂ = σ₁/σ₂ ohnehin fehlte.

## S2 — SingulaerwertRechner (`S62Rechner.tsx`, Kasten 2)

**Umgesetzt**
- [MINOR] `:322-323` fehlendes Leerzeichen vor `{ref(...)}`.
- [MINOR] `:158-162` Schritt 2 druckt bei det = 0 kein „+ 0" mehr
  (Browser: „λ² − 30λ").
- [MINOR] `:27-36` F1: Header verweist auf das neue Skript; dort sind AᵀA = (6 4; 4 5),
  Spur 11, det 14, λ₁/λ₂, σ₁/σ₂ = 2,547 (Zahlfrage `S62.mdx:729`), v₁, Av₁, u₁ und
  die Rekonstruktion asserted.

**Offen**
- [MINOR] `:118` Ein Zweig „numerisch rangdefizient: σ₂ ist winzig, aber nicht
  null" fehlt weiterhin. Für die ganzzahligen Eingaben des Kastens unkritisch;
  der Fall gehört didaktisch an §6.4 und hätte einen weiteren Verdiktstapel in
  den ohnehin längsten Kasten des Kapitels gesetzt.

## S3 — EllipseImRaum (`S62Raum.tsx`, an Kasten 2 angehängt)

**Umgesetzt**
- [MINOR] `:31-34` E1: Der Header beschreibt die Farben jetzt so, wie gezeichnet
  wird (grün auch für die Halbachsenpfeile σᵢuᵢ, deren Länge σᵢ ist); orange wird
  ausdrücklich als in dieser Tafel nicht vorkommend ausgewiesen.
- [MINOR] `:40-45` F1: σ₁, σ₂, u₁, u₂ und die Ellipsenfläche πσ₁σ₂ = 11,755 sind
  im neuen Skript geprüft.

**Offen**
- [MINOR] `:94, :229-235` `!(sig[1] > 1e-9)` bleibt eine Toleranz; der Text „Wegen
  σ₂ = 0" ist für die ganzzahligen Presets korrekt. Ein exakter Test wie in S61
  wäre möglich, würde aber die 3×2-Eingabe umbauen.
- [MINOR] `:96-129` Im Rang-1-Fall bleibt die Raumtafel leer wirkend (Fenster an
  die Streckenlänge anpassen) — Umbau der Kameralogik.

## S4 — SvdGeometrieExplorer (`S62Geometrie.tsx`, Kasten 3)

**Umgesetzt**
- [MINOR] `:173` gegen `:246-258` Eine benannte `NULLSCHWELLE = 1e-9` für Readout
  und Verdikte; der Widerspruch „σ₁/σ₂ = 1,0·10¹²" neben „σ₂ = 0" ist weg, und der
  Text nennt die Schwelle.
- [MINOR] `:243` Der Rest zu A steht in Exponentialschreibweise (Browser:
  „4,44 · 10^-16" statt „0,000").
- [MINOR] `:29-33` F1: σ₁ = 2,2882, σ₂ = 0,8740, κ = 2,618 und die Preset-Spektren
  sind im Skript geprüft.

**lib-Befund**
- [MINOR] E1: `TransformCanvas` zeichnet die Bildellipse blau und kollidiert damit
  mit der V-Rolle. Die Komponente liegt in `src/lib` (tabu).

## S5 — ReduzierteSvdBloecke (`S63Bloecke.tsx`, Kasten 4)

**Umgesetzt**
- [MAJOR] `:174, :334-335` G3: Die sechs Blöcke sind jetzt
  `role="button" tabIndex={0} aria-pressed aria-label` mit `onKeyDown`
  (Enter/Leertaste); das SVG trägt `role="group"` statt `role="img"`, die Blöcke
  sind also auch für Screenreader vorhanden. Browser-Nachweis: Fokus lässt sich
  setzen, Enter und Leertaste verschieben `aria-pressed` auf den angewählten Block.
- [MINOR] `:29-33` F1: Die Speicherbilanz (45/20/20, 10, 36/36/16, 1 002 550/5255)
  ist im Skript asserted, samt Postenzählung der reduzierten Form.

## S6 — PseudoinverseExplorer (`S63Pseudo.tsx`, Kasten 5)

**Umgesetzt**
- [MINOR] `S63.mdx:609-617` A4: Der Kasten schließt jetzt mit zwei Sätzen
  Konsolidierung (Residuum hängt nur an der Projektion, die Norm unterscheidet die
  Lösungen) — im Print-Export stand dort vorher nur die Frage.
- [MINOR] `:33-42` F1: A⁺ = ¼(1 1; 1 1), ‖A⁺b‖ = 2,1213 (Zahlfrage `S63.mdx:635`),
  ‖r‖ = 2,8284, ‖x(1)‖ = 2,3452 und die Konstanz des Residuums entlang der
  Lösungsgeraden sind im Skript geprüft.

**Offen**
- [MINOR] `:154` Der Zweig `rNorm < 1e-9` bleibt eine Toleranz auf dem Residuum;
  der Test über die Projektion von b auf col(A) wäre der saubere Weg, ändert aber
  die Fallunterscheidung des besten Widgets im Kapitel.

**lib-Befund**
- [MINOR] Die col(A)-Gerade läuft ohne `clipPath` über den Rahmen; sie wird von
  `TransformCanvas` (`lines`-Prop) gezeichnet, also in `src/lib`.

## S7 — RangKExplorer (`S64RangK.tsx`, Kasten 6)

**Umgesetzt**
- [MINOR] `:131` Start bei k = 1 statt auf `KNICK` — der Regler steht nicht mehr
  beim Laden auf der Lösung der eigenen Schätzfrage (im Browser bestätigt).
- [MINOR] `:31-40` F1: Das Testbild wird im Skript nachgebaut; σ₁…σ₆, ‖A‖_F,
  alle Nachbarquotienten (der Knick σ₄/σ₃ = 0,187 ist nachweislich der kleinste),
  die Energieanteile 93,68/98,59/99,80 % (Zahlfrage `S64.mdx:572`), die
  Frobenius-Fehler 4,48 % (k = 3) und 3,21 % (k = 6) sowie die Kompressionsgrenze
  k ≤ 21 sind asserted; zusätzlich Eckart-Young als Gegenprobe.

**Offen**
- [MINOR] Spektrumbalken ohne Achse/Skala (B3) — braucht eine eigene
  (logarithmische) Achse, also ein neues Bild.

## S8 — EmpfehlungsExplorer (`S64Empfehlung.tsx`, Kasten 7)

**Umgesetzt**
- [MAJOR] `:213-219, :265-269` G1/G6: `min-w-0` an beiden Flex-Kindern. Nachgemessen
  per CDP bei 390 px: Kasten `clientWidth 348 = scrollWidth 348` (vorher 348/437),
  die Tabellencontainer scrollen jetzt selbst (316/527 bzw. 316/394), und die
  Namensspalte steht bei 37…84 px **innerhalb** des Kastens (vorher `left = −68`).
- [MINOR] `:238-246` G3: Die Bewertungszellen tragen `aria-label`
  („Bewertung 5 von Ada für Sternenstaub, wird verwendet") und `aria-pressed`.
- [MINOR] `:30-40` F1: Beide „historischen" Notizen sind ersetzt; das Skript prüft
  die Spaltenmittel, das Gesamtmittel 3,364, die Singulärwerte 15,574/2,844/2,671/
  0,464/0, die RMSE 1,143/0,735/0,108 und die zurückgehaltene Bewertung für Ada
  (1,744/1,793/1,950; gerundet 1,8 — Zahlfrage `S64.mdx:585`).

**Offen**
- [MINOR] A5/H6: Die vier bis fünf Absätze Widget-interner Prosa unter den Tafeln
  stehen weiterhin dort. Sie in Prosa und Verdikt umzuräumen ist eine
  Textentscheidung über den ganzen Abschnitt, nicht ein lokaler Fix.
- [MINOR] Heatmap ohne Skala/Legende (B3).
- [MINOR] `S64.mdx:440-448` A4: Konsolidierung außerhalb des Kastens belassen (der
  „Einwand" ist bewusst der Übergang zur Vertiefung).

---

## Entscheidung nötig (nicht ausgeführt)

- **Spektrumbalken (S7) und Heatmap (S8) mit Skala**: beides neue Bildelemente.
- **Widget-interne Prosa im Empfehlungs-Explorer (S8)**: Umzug in die Prosa vor
  dem Kasten würde den Abschnittstext umbauen.
- **Rang-1-Fenster der Raumtafel (S3)**: Kameralogik.

## lib-Befunde (nicht angefasst, `src/lib` ist tabu)

- `TransformCanvas`: Bildellipse blau (kollidiert mit der V-Rolle), und die
  `lines`-Geraden werden nicht auf die Tafel geclippt.
