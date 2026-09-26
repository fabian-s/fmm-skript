# Gutachten: Konzept-Pop-ups, Batch 3 (matrix … rotation-matrix)

Stand 2026-09-26. Geprüft wurde der Editor-Durchgang (Bericht `konzepte-3.md`) an 34 Dateien in
`src/concepts/`, gegen den Ausgangsstand 21b998d. Der Editor-Stand steckt inzwischen im
WIP-Commit 382ff88; meine Edits liegen als Arbeitsbaum-Änderungen darüber (11 Dateien).

Je Pop-up: alte und neue Fassung ganz gelesen, Widget-TSX auf Kopfkommentar (Einsicht,
verifizierte Zahlen), Aufgabe und Verdikt geprüft, alle Linkstellen mit Linktext gezählt
(`grep -rnoE ':k\[[^]]*\]\{#<id>\}'`) und die fachlich heiklen im Kontext gelesen. Die Tell-Regex
aus `german-tells.md` lief erneut. Neu gegenüber Batch 1/2: Die Buchverweise habe ich gegen die
PDFs geprüft (pypdf-Extraktion von Heath und MML, siehe Lesson). 17 Edits in 11 Dateien, nur
Prosa; Titel, Imports und Widget-Tags sind unverändert, einziger neuer Link ist
`{#taylor-series}` in newtons-method.

## 1. Zahlen (`zaehlen.mjs concepts`, Summe der 34 Dateien, inkl. Kommentarköpfe)

| Stand | Wörter | gegenüber Ausgang |
| --- | ---: | ---: |
| Ausgangsstand (Baseline) | 6 608 | |
| nach Editor | 6 517 | −1,4 % |
| nach Review | 6 481 | −1,9 % |

Median 200 → 194 → 193,5, Maximum 257 → 247 → 248. Über ~220 Wörtern liegen noch
qr-factorization (248) und rank-nullity-theorem (221), siehe 4.1. Vertiefung = 0.

Von der Gutachterin geänderte Dateien (Baseline → Editor → Review):

| Pop-up | Wörter | Änderung der Gutachterin |
| --- | ---: | --- |
| matrix | 135 → 119 → 102 | Schlusssatz „So können wir über ‚das System‘ als ein einziges Objekt $\bA$ sprechen …“ gestrichen: Er war schief ($\bA$ ist nicht das System $\bA\bx = \bb$) und wiederholte „speichert die Matrix alle Koeffizienten der Gleichungen auf einmal“ aus dem Satz davor |
| newtons-method | 209 → 222 → 220 | **Fachlich zu stark:** „geht nur bei positiv definiter $\bH$ bergab“ → „sicher bergab zeigt er nur bei positiv definiter $\bH$“. Bei PD-Hesse-Matrix ist die *Richtung* ein Abstieg, der volle Schritt nicht unbedingt; das Widget zeigt genau das (bei $x_0 = 0{,}3$ ist $f'' > 0$, der Schritt nach 3,90 erhöht $f$ von 0,70 auf rund 55). „(Taylor-Polynom zweiter Ordnung, vgl. MML §5.1)“ → verschachtelter Link `:k[Taylor-Polynom]{#taylor-series}` (Verweis war richtig, MML Def. 5.3; der Link ersetzt ihn und bringt das Pop-up auf 220) |
| null-space | 208 → 217 → 217 | „Rang 1 plus Kerndimension 1 ergibt die zwei Spalten von $\bA$“ → „ergibt 2, die Spaltenzahl von $\bA$“ |
| optimization | 173 → 166 → 164 | Lead-out „hat damit noch kein globales Minimum gefunden“ war falsch herum (in der tieferen Mulde *ist* das gefundene Minimum global) → „muss nicht das globale sein“ |
| normal-equations | 253 → 217 → 218 | Bezug „lautet es“ (auf „System“ zwei Sätze vorher) → „lautet das System“ |
| quadratic-form | 227 → 223 → 218 | **Undefiniertes Symbol:** Der Lead-out rechnete mit $q(t\bu)$, das Pop-up führte $q$ nie ein → Definition $q(\bx) = \bx^\top\bB\bx$ im ersten Satz; Gradienten-Satz damit kürzer („Dieselbe Kombination steckt im Gradienten von $q$ …“). Lead-out „Entlang einer Richtung $\bu$“ → „Für einen Einheitsvektor $\bu$“: Die Schranken 0,79 bis 2,21 gelten nur für $\|\bu\| = 1$ (Widget-Kopf: $(3 \mp \sqrt2)/2$) |
| qr-factorization | 257 → 247 → 248 | Lead-out „fast auf der ersten … winzig“ → „fast parallel zur ersten … fast null“ (Widget-Kopf: $r_{22} = 2\lvert\sin\angle(\ba_1, \ba_2)\rvert$) |
| orthonormal-basis | 204 → 190 → 191 | „liegt $\bw$ auf $\bq_1$ … die erste gleich $\|\bw\|_2$“ → „zeigt $\bw$ in Richtung $\bq_1$“ (in Gegenrichtung wäre die Koordinate $-\|\bw\|_2$) |
| positive-definite | 232 → 231 → 218 | Unter 220 gekürzt: KQ-Nachsatz „Dann hat das Kleinste-Quadrate-Problem zu $\bA$ genau eine Lösung“ gestrichen (keine der 28 Linkstellen braucht ihn, S71/S73/S76 verlinken für „$\bA^\top\bA$ ist SPD“; linear-least-squares und normal-equations sagen es selbst), Lead-out-Nachsatz „Richtungen durchprobieren müssen wir nicht“ gestrichen (wiederholt den Satz davor). „ganz ohne Pivotsuche“ → „sie braucht keine Pivotierung“ (Skriptbegriff, Kap. 5: 18× „Pivotierung“, 0× „Pivotsuche“) |
| permutation-matrix | 198 → 194 → 193 | „Die partielle Pivotsuche der LU-Zerlegung“ → „Die Pivotierung der LU-Zerlegung“ (Skriptbegriff wie oben) |
| projection | 191 → 209 → 210 | Ergänzung des Editors präzisiert: Projektion auf eine *nichtleere*, abgeschlossene, konvexe Menge (so die Voraussetzung von `@satz:projektionstheorem` in S113, das hierher verlinkt) |

## 2. Geprüft und bestätigt (Editor-Änderungen in Ordnung)

- **Fachkorrekturen des Editors, alle richtig:** nelder-mead (`optim()`-Voreinstellung
  unabhängig von `gr`, deckungsgleich mit S126 Z. 60–64), outer-product (volle SVD ist die
  Summe, die abgeschnittene behält die ersten Summanden; „Deshalb“ weg), orthogonal-matrix
  („Spiegelungen an Ursprungsgeraden“), newtons-method („Scheitel“ statt „Minimum“),
  orthonormal-basis („Koeffizienten der Projektion“), positive-definite ($\bA \in \R^{m\times n}$
  für $\rang(\bA) = n$), normal-equations ($\br$ definiert), null-space (Mischnotation weg),
  partial-derivative ($n$, $\phi$ weg), neural-network (Fettdruck nach Hausstil).
- **Buchverweise gegen die PDFs:** permutation-matrix Heath §2.4 richtig (§2.4.5 Pivoting, §3.5
  wäre Orthogonalisierung); ohms-law „Heath Kap. 2, Beispiel 2.1“ richtig (Example 2.1
  Electrical Circuit; offene Frage 4 des Editors damit erledigt); rank-nullity „MML Theorem 2.24“
  richtig (Rank-Nullity Theorem, §2.7.3); null-space Heath §3.4.5 richtig (dort steht
  $\operatorname{span}(\bA)^\perp = \operatorname{null}(\bA^T)$); reflection Heath §3.5.1
  (Householder Transformations) richtig. Die gestrichenen Verweise waren tatsächlich unpassend:
  MML §5.7 ist „Higher-Order Derivatives“, MML Kap. 7 „Continuous Optimization“.
- **Ergänzungen des Editors, alle von Linkstellen gedeckt:** Cauchysche Fassung (S108 Z. 111,
  Formel dort identisch), „in jeder noch so kleinen Umgebung“ (S107 Z. 398, S115 Z. 89), positiv semidefinit
  (S33, S34, S62, S114, covariance-matrix), Konvergenzordnung (S108, S121, S124, S136), dyadisches
  Produkt und $\otimes$ (S75 Z. 202, S95 Z. 21), Projektion auf konvexe Mengen (S113, S115),
  „Ohne σ … affine Abbildung“ (S92 Z. 362), Newton-Raphson (S108 Z. 481), SPD (S76 Z. 245).
- **Gestrichenes, von keiner Linkstelle gebraucht:** Fixpunkt-Absatz (mean-value-theorem; Kap. 12
  verlinkt den Satz nicht), Potenziteration/Rayleigh (rate-of-convergence; S83 verlinkt nur
  „lineare Konvergenz“), Zahlenbeispiel normal-equations (steht in linear-least-squares, hier ohne
  Datenpunkte nicht nachrechenbar; Entscheidung des Editors geteilt), PageRank (norm),
  Householder/Givens-Satz (qr-factorization; reflection und rotation-matrix sind von S73–S75
  direkt verlinkt).
- **Lead-outs gegen Widget-Kopf/Verdikt nachgerechnet:** mean-value-theorem (Startlage
  $\xi = \pm1{,}058$, also zwei), neighborhood ($\varepsilon^* = (8-\sqrt{10})/3$, $x^* = 1$),
  neural-network (3–4–2: 12 bzw. 8 Kanten, $\bA_0$ 4×3, $\bA_1$ 2×4), newtons-method
  ($e_{k+1}/e_k^2 \to 1$; $x_0 = 0{,}3 \to x_1 = 3{,}90$), norm (Startpunkt (0,9; 0,6):
  1,50 / 1,08 / 0,90), normal-equations ($x^* = 4/5$), null-space (Kern $(1,-1)^T$, Bild
  $(1,1)^T$), ohms-law (1,5 A: 3 V / 6 V), orthogonal-complement ($\|\bb\|^2 = 4{,}25$),
  orthogonal-matrix (det ±1), orthogonality ($2\bu^T\bv$, längenunabhängig), orthonormal-basis
  ($c_2 = 0$ bei 26,57°), outer-product (Zeilen $u_i\bv^T$), partial-derivative ($2x + y$),
  permutation-matrix ((5,7,9) → (7,9,5)), polynomial-roots ($\pm\sqrt{c}\,i$), positive-definite
  ($2 \pm c$), power-series (Radien 0,45; 1,26; 2,06; 2,85 …, Schätzfrage $n = 4$ nicht
  vorweggenommen), rank-nullity (Regler endet bei $r = m = 2$), rate-of-convergence (15 bzw. 328
  Schritte, quadratisch 4), optimization (Schätzfrage θ ≈ −1,04 nicht vorweggenommen).

## 3. Anmerkungen zum Editor-Bericht

- Zutreffend und vollständig; die Link-Bilanz (6 weggefallene, 6 neue `{#id}`) stimmt mit dem
  Vergleich gegen 21b998d überein, alle Ziele existieren. Keine Gedankenstriche, keine getippten
  Skript-Nummern.
- Die Aussage „Lead-outs rechnen nur mit Zahlen aus dem Widget-Kopf“ trifft zu; übersehen hatte
  der Editor nur, dass quadratic-form dabei ein im Pop-up undefiniertes $q$ benutzt.

## 4. Offene Fragen für den Dozenten

1. **Rohzahl über 220:** qr-factorization (248) hat rund 170 Wörter Prosa, der Rest ist Mathe
   (die `\underbrace`-Zerlegung allein ~20 Token). Jeder Satz trägt Linkstellen-Inhalt: das
   Beispiel, Gram-Schmidt als Idee (Widget), Normerhaltung und Dreieckssystem (S11/S12,
   linear-least-squares), Konditionszahl nicht quadriert (normal-equations verlinkt genau dafür).
   Ich habe nicht weiter gekürzt. rank-nullity-theorem (221) liegt auf der Schwelle; gelassen.
2. **S71 Z. 28** verlinkt „Matrixnormen“ auf `{#norm}`; das Pop-up erklärt nur Vektornormen.
   Vorschlag an Kap. 7: `{#matrix-norm}` (Chapter-Datei, nicht in diesem Auftrag).
3. **S12 Z. 41** „nach den Kriterien aus Kapitel 4“: getippte Kapitelnummer → `@kap:fehler`
   (Chapter-Datei, nicht in diesem Auftrag).
4. **S132 Z. 55** zieht den Rangsatz für einen unendlichdimensionalen Kern heran; das Pop-up
   formuliert ihn nur für $\R^n \to \R^m$. Für die Intuition reicht es; ein Halbsatz „gilt
   sinngemäß auch für unendlichdimensionale Definitionsräume“ wäre möglich, kostet aber Wörter.
5. Wie Editor Frage 3: neural-network schreibt $\bx^{(k)}$, $\bA_{k-1}$, $\bb_{k-1}$, S103 nutzt
   $\bz_k$, $\bW_k$. Nicht angeglichen.

## 5. Prüfungen (nach allen Edits)

- `npm run typecheck:mdx`: 206 MDX-Dateien, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur „Tabelle ist nicht aktuell“,
  erwartet bei parallelen Kapitel-Edits).
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0 (die Zeile „FEHLER: Makroname
  erscheint als Literaltext“ ist der beabsichtigte `\cbblue`-Negativtest). Kein Prüfscript liest
  eine der 34 Konzeptdateien.
- Headless-MathJax (187 Kursmakros, `noundefined` entfernt, Negativtest `\foo` erkannt):
  497 Literale der 34 Dateien, 0 Fehler; alle 1 721 Literale aller Pop-ups, 0 Fehler.
- Tell-Regex (`german-tells.md` plus „winzig|einfach|eigentlich|billig|Motor|wirklich“): nur
  sachliche Treffer („einfache Funktionen“, „genau dann“, „genau das Quadrat“ als Gleichheit).
- Titel, Imports, Widget-Tags gegen 21b998d unverändert; `{#id}`-Links wie im Editor-Bericht plus
  `{#taylor-series}` (newtons-method).
