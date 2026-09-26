# Gutachten: Konzept-Pop-ups, Batch 2 (gaussian-elimination … matrix-vector-product)

Stand 2026-09-26. Geprüft: der Editor-Durchgang (Bericht `konzepte-2.md`) an 34 Dateien in
`src/concepts/`, gegen den Ausgangsstand 21b998d. Für jedes Pop-up: alte und neue Fassung ganz
gelesen, Widget-TSX auf Kopfkommentar (Einsicht, verifizierte Zahlen), Aufgabe und Verdikt
geprüft, alle Linkstellen (`grep -rn "{#<id>}" src/chapters src/concepts`) mit Linktext
angesehen, Tell-Regex aus `german-tells.md` erneut laufen lassen. 12 Dateien hat die
Gutachterin nachgebessert (14 Edits). Nur Prosa; Titel, Imports, Widget-Tags, Anker und
`{#id}`-Links unverändert (einzige Abweichung gegenüber Baseline bleibt der neue Link
`{#logarithm}` des Editors in likelihood).

## 1. Zahlen (`zaehlen.mjs concepts`, Summe der 34 Dateien, inkl. Kommentarköpfe)

| Stand | Wörter | gegenüber Ausgang |
| --- | ---: | ---: |
| Ausgangsstand (Baseline) | 6 563 | |
| nach Editor | 6 357 | −3,1 % |
| nach Review | 6 357 | −3,1 % |

Median 194 → 188 → 188, Maximum 253 → 239 → 230. Über ~220 Wörtern liegt nur noch
linear-least-squares (230, davon rund 18 Wörter Titel, Import und Kommentarkopf). Pop-ups
haben keine Vertiefungen (Vertiefung = 0).

Von der Gutachterin geänderte Dateien (Baseline → Editor → Review):

| Pop-up | Wörter | Änderung der Gutachterin |
| --- | ---: | --- |
| gaussian-elimination | 218 → 183 → 187 | **Fachlich zu stark:** „Für Kleinste-Quadrate-Probleme taugt die Elimination nicht“ widerspricht Kap. 7 (Normalengleichungen + Cholesky sind ein Eliminationsverfahren) → „Auf ein Kleinste-Quadrate-Problem dürfen wir die Elimination nicht direkt anwenden“ (gemeint ist das Umformen des überbestimmten Systems, wie S73 Z. 236 es sagt) |
| gaussian-mixture-model | 152 → 153 → 153 | Komma-Spleiß „ist das nicht, wir brauchen“ → Semikolon |
| gradient-descent | 184 → 179 → 182 | Synonym *Gradientenabstieg* ergänzt: 10 von 15 Linkstellen verlinken „Gradientenabstieg“ (S12, S43, S83, S103, S104, S107, S114, S115, S122, S123), das Pop-up nannte nur „Gradientenverfahren“ |
| gradient | 207 → 211 → 211 | Lead-out „Der Gradient steht senkrecht“ → „$\nabla \phi(\bx)^T$ steht senkrecht“ (das Pop-up führt den Gradienten ausdrücklich als Zeilenvektor, die Richtung ist das Transponierte) |
| intermediate-value-theorem | 194 → 188 → 188 | „Ohne Stetigkeit gilt der Satz nicht“ (ein Satz „gilt“ nicht unter anderen Voraussetzungen) → „Ohne Stetigkeit kann die Folgerung scheitern“ |
| limit | 207 → 201 → 205 | **Schiefe Aussage:** „Darauf beruht der Differenzenquotient“ (der Quotient braucht keinen Grenzwert, die Ableitung schon) → „Darauf beruht die Ableitung als Grenzwert des Differenzenquotienten“ |
| linear-least-squares | 244 → 239 → 230 | **Spoiler nach hinten:** „Lösung $\bx = (2/3, 1/2)$“ stand in der Anzeige vor dem Widget, dessen Kopf ausdrücklich einen Spoiler-Split verlangt (KQ-Gerade erscheint erst nach dem Auflösen der Schätzfrage). Lösung aus der Anzeige genommen und in den Lead-out gesetzt: „… liefern das Minimum $\bx = (2/3; 1/2)^\top$ in einem Schritt“ (Zahl unverändert, nur verschoben; Muster wie likelihood). Einstiegssatz gestrafft |
| linear-system | 207 → 212 → 209 | „Genau dann gibt es genau eine Lösung, wenn sie ungleich null ist, sonst …“ → „Ist sie ungleich null, gibt es genau eine Lösung, sonst keine oder unendlich viele“ |
| low-rank-approximation | 213 → 207 → 210 | Lead-out „Spektralfehler“ (im Pop-up undefiniert) → „Fehler in der Spektralnorm“ |
| lu-decomposition | 232 → 221 → 216 | Cholesky-Satz verdichtet („halbiert … die Arbeit“), Links bleiben; damit unter 220 |
| matrix-product | 208 → 204 → 206 | Lead-out „ergibt eine andere Endlage als umgekehrt“ → „im Allgemeinen“ (das Widget hat einen eigenen Verdikt-Zweig für den Fall gleicher Endlage) |
| matrix-vector-product | 181 → 155 → 156 | Personifizierung „Eintrag $i$ … multipliziert jeden Eintrag“ → „Für Eintrag $i$ … multiplizieren wir“ |

## 2. Geprüft und bestätigt (Editor-Änderungen in Ordnung)

- **Fachkorrekturen des Editors, alle richtig:** hessian-matrix (PD von $2\bA^T\bA$ nur bei
  vollem Spaltenrang), hyperplane ($\ba \neq \bnull$ in der Definition; S93/S113/S114
  brauchen den Normalenvektor), level-sets ($\R^n$ statt $\R^2$; Ellipsen nur bei PD-Hesse-Matrix),
  linear-independence (Betrag der Determinante), linear-least-squares (Konvexität allein gibt
  keine geschlossene Lösung), linear-regression (Normalverteilung, gleiche Varianz),
  matrix-inverse („bis zu“ $\kappa$), machine-epsilon (absolute vs. relative Lücke; Schranke
  $\varepsilon/2$ exakt), kernel ($n$ = Spaltenzahl), likelihood (Bezug „Sie“), gradient-descent
  (Backpropagation-„Deshalb“), linear-combination (zirkulärer Satz), lu-decomposition
  („Identität“), low-rank-approximation (getippte Kapitelnummern).
- **Ergänzungen des Editors, alle von Linkstellen gedeckt:** likelihood/Log-Likelihood
  (S54, S104, S106, S107, S114, S122, S125 verlinken „(negative) Log-Likelihood“, S108 die ML-Schätzung über die Log-Likelihood), matrix-norm/Frobenius
  (Link aus low-rank-approximation), matrix-inverse/„invertierbar“ (S32, S35, S52, S53, S71,
  similar-matrices), limit/„einseitige“ (S105), logarithm/Monotonie (S83, likelihood),
  Skript-Notation $\col$, $\operatorname{Kern}$, $\eps$ (S62, S72, S93, S94; S43, S55, S65, S76).
- **Gestrichenes, von keiner Linkstelle gebraucht:** KQ-Vorbehalt mit $\bM$-Formel
  (gaussian-elimination; S73 Z. 236 erklärt die Scherungen selbst), Eigenraum-Satz
  (gram-schmidt), $\bL\bu = \boldsymbol f$ (linear-transformation; S32/S36 brauchen nur den
  Abbildungsbegriff), MML-Aufgabenexkurs (linear-map), $\bA\bz \neq \bo$ (matrix-vector-product),
  Entropie (logarithm), Regularisierungsabsatz auf einen Satz (low-rank; S76 Z. 203 bekommt
  „Abschneiden als Regularisierung“ weiter), $\sqrt{\eps}$ auf zwei Sätze (machine-epsilon;
  S65 braucht nur „$\delta^2$ neben $1$ unter der Auflösung“).
- **Lead-outs gegen Widget-Kopf/Verdikt nachgerechnet:** gaussian-elimination (Multiplikatoren
  2, 1, −1), geometric-series (Regler −1,2 … 1,2), infinite-series ($2 - S_n = 2^{-n}$, Regler
  heißt „Index n“), kernel ($(2; -1)$), linear-combination ($c_1 = 4/3$, $c_2 = 5/3$ für
  $\bv_1 = (2;1)$, $\bv_2 = (-1;1)$), linear-regression ($0{,}28$; $0{,}93$; $0{,}179$),
  low-rank (95,001 %, $\sigma_3 = 2{,}5$), matrix-vector-product ($(4; 10)$), inner-product-functions
  (Startpaar $1$, $t^2$ ohne rote Fläche, nicht orthogonal), level-sets (λ = 1,8, nicht radial),
  lu-decomposition (beide Nullpivot-Fälle wie im korrigierten Verdikt), matrix-norm (kürzeste
  Halbachse „merkt die Norm nicht“), hyperplane (Aufgabe $a_2 \to 0$, Verdikt $\ba = \bnull$).

## 3. Anmerkungen zum Editor-Bericht

- Der Bericht ist zutreffend und vollständig; kein `{#id}`-Link ging verloren (gegen Baseline
  verglichen), keine Gedankenstriche, keine handgetippten Nummern.
- Offene Frage 4 des Editors (linear-least-squares-Spoiler) hat die Gutachterin entschieden:
  verschoben statt gestrichen (siehe Tabelle). Grund: Der Widget-Kopf dokumentiert den
  Spoiler-Split als bewusste Designentscheidung (VIS-Audit), und die Lösungsgerade in der
  Anzeige hebelte ihn aus.
- Die im Bericht genannte MathJax-Prüfung ist belastbar (Editor-Skript lädt `fmmMacros` direkt).
  Das Batch-1-Skript `check-math-k1.mjs` lud dagegen nur die Array-Makros; nachgeprüft mit
  korrigiertem Loader: alle 1 638 Literale aller Pop-ups fehlerfrei (Lesson angehängt).

## 4. Offene Fragen für den Dozenten

1. **likelihood und linear-least-squares:** Die Auflösung ($\hat p = 7/10$ bzw.
   $\bx = (2/3; 1/2)^\top$) steht jetzt im Lead-out direkt unter dem Widget. Im Pop-up ist sie
   damit ohne Scrollen sichtbar, aber erst nach dem Widget. Wer die Schätzfrage ganz schützen
   will, müsste die Zahlen aus dem Lead-out nehmen; die Einsicht „Maximum bei der beobachteten
   Häufigkeit“ ist selbst die Antwort.
2. **gradient als Linkziel für Subgradienten** (wie Editor, Frage 2): S115 Z. 107
   `:k[Subdifferential]{#gradient}` und Z. 439 `:k[Subgradient]{#gradient}` führen auf ein
   Pop-up, das nur den Gradienten erklärt. Vorschlag an Kap. 11: Link entfernen oder auf
   `@definition:subgradient-und-subdifferential` umstellen (Chapter-Datei, nicht in diesem Auftrag).
3. **gaussian-elimination:** „Pivotierung“ (Skriptbegriff) ist gesetzt; das Widget
   LuDecompositionWidget sagt im Verdikt (Z. 144) und im Kopfkommentar noch „Teilpivotisierung“.
4. **Widgets (TSX, nicht angefasst)**, wie Editor Frage 6: MatrixNormWidget-Aufgabe sagt
   „orange Halbachse“, gezeichnet ist sie violett; GramSchmidt-Widget nennt die Vektoren
   $a_1, a_2$, das Pop-up $\bv_1, \bv_2$.
5. **Getippte Kapitelnummern außerhalb des Auftrags:** `src/chapters/07-kq/S76.mdx` Z. 204
   „aus Kapitel 6“, `src/chapters/04-fehler/S41.mdx` Z. 33 „(Kapitel 3, …“ → `@kap:svd`
   bzw. `@kap:matrix-spur-norm`.
6. **linear-least-squares (230 Wörter):** Weiter kürzen hieße die Designmatrix (trägt das
   Widget) oder den Satz „Eindeutig nur bei vollem Spaltenrang … Pseudoinverse“ (S115 und das
   pseudoinverse-Pop-up setzen ihn voraus) opfern. Die Prosa liegt ohne Kopf bei rund 212.

## 5. Prüfungen (nach allen Edits)

- `npm run typecheck:mdx`: 206 Dateien, ohne Befund (Exit 0).
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur die erwartete Meldung
  „Tabelle ist nicht aktuell“).
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich (Exit 0; „Matrix-inverse claims: OK“);
  die Zeile „FEHLER: Makroname erscheint als Literaltext“ ist der beabsichtigte `\cbblue`-Negativtest.
- Headless-MathJax (187 Kursmakros geladen, `noundefined` entfernt, Negativtest `\foo` erkannt):
  436 Literale der 34 Dateien, 0 Fehler; alle 1 638 Literale aller Pop-ups, 0 Fehler.
- Tell-Regex (`german-tells.md` plus „einfach|winzig|wirklich|Rezept|man|sichtbar|greifbar|
  Vorsicht|eigentlich|billig|Trick|Motor|enorm|riesig|gratis|wunderbar|genau“): nur sachliche
  Treffer („genau dann“, „genau eine Lösung“, „einfachste Potenzreihe“, Buch-§-Angaben).
  Keine Gedankenstriche, keine handgetippten Skript-Nummern.
- `{#id}`-Links, Imports, Titel, Widget-Tags gegen 21b998d: unverändert bis auf `{#logarithm}`
  (likelihood, vom Editor).
