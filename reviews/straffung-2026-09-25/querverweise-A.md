# Querverweise, Liste A: inhaltliche Prüfung

Umfang: alle 81 Verweise aus `crossrefs-A.json` (Quellen in 02-algos, 03, 04 und
12-optim). Je Verweis wurden der Satz um den Verweis und das Ziel gelesen, bei
Abschnittsverweisen die Überschriften und die einschlägigen Stellen per grep.

**OK: 75 Verweise.** Befunde: 6, davon 4 mit umgestelltem Ziel oder
angepasstem Wortlaut und 1 Präzisierung bei einem Beweis, der in einer
Vertiefung steht. Keine Änderung in 02-algos.

## Befunde

| # | Quelle | Verweis (vorher) | Urteil | Änderung |
| --- | --- | --- | --- | --- |
| 1 | `04-fehler/S42.mdx:209` (Beweis, `::why`) | `@sec:matrix-spur-norm/operatornormen` für ‖A⁻¹v‖ ≤ ‖A⁻¹‖‖v‖ | FALSCHES ZIEL. S33 enthält nur die Definition der Operatornorm; die Ungleichung steht als eigene Aussage in S35. | → `@bemerkung:operatornorm-hilfsungleichung` (S35, Haupttext). „definierende Eigenschaft der Operatornorm“ → „die Operatornorm als Streckungsschranke“: Die Ungleichung folgt aus der Definition, ist aber nicht die Definition selbst. |
| 2 | `12-optim/S121.mdx:709` (Beweis in Vertiefung, `::why`) | `@sec:matrix-spur-norm/operatornormen` für „Verträglichkeit der induzierten Norm, ‖Mv‖ ≤ ‖M‖‖v‖“ | FALSCHES ZIEL. Die Verträglichkeit steht in S35 (`@satz:wichtige-vertraeglichkeiten`, Teil 2), nicht in S33. | → `@satz:wichtige-vertraeglichkeiten` |
| 3 | `12-optim/S121.mdx:103–104` | „den Splitting-Verfahren (`@sec:la-misc/iterative-loeser`)“ | ÜBERBEHAUPTUNG (nur der Begriff). Das Ziel behandelt Richardson, Jacobi und Gauss-Seidel als *Korrekturiteration*; das Wort „Splitting“ kommt im ganzen Skript sonst nicht vor. | „den Splitting-Verfahren“ → „den Korrekturiterationen für lineare Gleichungssysteme“; Verweis unverändert. |
| 4 | `12-optim/S122.mdx:185` (Bemerkung `beide-saetze-brauchen-zwei`) | „der Widerspruch aus `@satz:hoechstens-eine-minimalstelle`“ | VERTIEFUNG (leicht). Der Widerspruch steht nicht im Satz selbst, sondern im Beweis, und der steht in der Vertiefung „Beweis der Eindeutigkeit bei strikter Konvexität“. Der Haupttext bleibt trotzdem lesbar, weil der vorige Satz der Bemerkung das Argument zusammenfasst (Vergleichspunkt zulässig und besser). | Präzisiert zu „der Widerspruch aus dem Beweis von `@satz:…`“; nichts verschoben. |
| 5 | `12-optim/S122.mdx:261` (Beispiel `vier-konvexe-verlustfunktionen`) | „bei der logistischen Regression aus `@sec:differentialrechnung/produkt-kettenregel`“ als Beleg für eine konkave Log-Likelihood | FALSCHES ZIEL. S106 leitet nur den Gradienten her (in der Vertiefung „Alternatives Beispiel zur Kettenregel“); die Konkavität zeigt `@beispiel:logistische-regression-ist-ein-konvexes` (S114). | → `@beispiel:logistische-regression-ist-ein-konvexes`. Hinweis: Auch dieses Ziel liegt in einer Vertiefung (S114, „Zwei weitere Beispiele zum Hesse-Kriterium“). Die Quelle nennt die logistische Regression aber nur als Beispiel und baut nicht darauf auf, deshalb kein VERTIEFUNG-Befund. |
| 6 | `12-optim/S124.mdx:84` (Bemerkung `was-der-schritt-voraussetzt-und-wie-wir`) | „Das [LGS lösen statt invertieren] ist billiger und stabiler (`@sec:lgs/lu`)“ | FALSCHES ZIEL. S53 (LU) vergleicht Lösen und Invertieren nicht; genau das begründet `@bemerkung:fuer-ein-lgs-keine-explizite-inverse` (S52, Aufwand und Genauigkeit). | → `@bemerkung:fuer-ein-lgs-keine-explizite-inverse` |

## Die gemeldeten Verdachtsfälle

- **12-optim/S121 und 04-fehler/S42, ‖Mv‖ ≤ ‖M‖‖v‖:** bestätigt (Befunde 1
  und 2). Wir verweisen nicht auf den ganzen Abschnitt `…/eigenschaften`,
  sondern auf die Labels, die die Aussage wörtlich tragen; beide stehen in S35
  im Haupttext. Die übrigen Operatornorm-Verweise dieser Liste (S42:91 „die
  induzierte Operatornorm“) sind OK.
- **06-svd/S64 (κ(XᵀX) = κ(X)²), 10-differentialrechnung/S106 (Frobenius),
  13-funktionsapproximation/S132, S133 (`@sec:lgs/grundlagen`):** Diese
  Quellen stehen nicht in Liste A, sondern in B bzw. C. Ich habe sie nicht
  geprüft und nichts daran geändert.

## OK, aber enger fassbar (nicht geändert)

Die Aussage steht jeweils im verwiesenen Abschnitt; ein Umstellen auf ein
Umgebungs-Label wäre möglich, ist aber nicht nötig:

- `12-optim/S124.mdx:15`: `@satz:taylorentwicklung-ii` trägt „Rest
  o(‖h‖²) für C²“. Die ausgeschriebene Form mit Gradient und Hesse-Matrix,
  die direkt folgt, ist `@korollar:taylorapproximation-fuer-vektor-zu`.
- `12-optim/S125.mdx:48`: „der Gradient steht senkrecht auf den Höhenlinien“
  → wäre genauer `@bemerkung:der-gradient-steht-senkrecht-auf-der`.
- `12-optim/S125.mdx:340`: „negative Log-Likelihood einer Exponentialfamilie
  in kanonischer Parametrisierung“ → im Ziel steht die engere Fassung
  (verallgemeinerte lineare Modelle mit kanonischem Link,
  `@bemerkung:eine-landkarte-der-optimierungsprobleme`).
- `12-optim/S124.mdx:104`: „Jacobimatrix von ∇fᵀ ist nach
  `@definition:hesse-matrix` die Hesse-Matrix“ stimmt mit der Definition und
  der Symmetrie (Satz von Schwarz), die der Nachbarsatz ohnehin nennt.
- `12-optim/S124.mdx:87`: „ob die Cholesky-Zerlegung gelingt, ist zugleich die
  Probe auf Definitheit“ steht in S54 nicht wörtlich. Es folgt aber aus
  `@satz:cholesky-zerlegung` (Scheitern ⇒ nicht SPD), die Gegenrichtung ist
  elementar (A = LLᵀ mit positiver Diagonale ⇒ SPD). Die Aussage trägt sich
  selbst, der Verweis gilt der Zerlegung.
- `12-optim/S122.mdx:156, 177`: „die Beweise in
  `@sec:konvexitaet/konvexe-optimierung`“: Beide Beweise stehen dort in
  Vertiefungen. Die Quelle fasst das Argument selbst zusammen und baut nicht
  darauf auf, deshalb kein VERTIEFUNG-Befund.
- `02-algos/S22.mdx:182` (nur melden, nicht bearbeitet): „approximative
  Singulärwertzerlegung durch Matrix Sketching (`@sec:la-misc/sketching`)“ ist
  OK, weil der Verweis am Sketching hängt. Die approximative SVD selbst steht
  in `@sec:la-misc/anwendungen` (8.2); S84 erwähnt sie nur in
  `@bemerkung:wo-skizzen-helfen`.

## Parallelfall außerhalb meiner Liste

`10-differentialrechnung/S108.mdx:541–542` (Bemerkung `drei-vorbehalte`,
Liste C) sagt dasselbe wie Befund 6 („kostet weniger und ist stabiler
(`@sec:lgs/lu`)“). Dort passt `@bemerkung:fuer-ein-lgs-keine-explizite-inverse`
vermutlich ebenso. Nicht geändert.

## Offene Fragen

1. Befund 3: Soll der Begriff „Splitting-Verfahren“ lieber im Skript
   eingeführt werden, etwa als Nebensatz in S83, statt ihn in S121 zu ersetzen?
   Ich habe ihn ersetzt, weil in S83 nichts Neues hinzukommen sollte.
2. Befund 5: Die Konkavität der logistischen Log-Likelihood steht nur in einer
   Vertiefung (S114). Wenn sie Klausurstoff ist, müsste
   `@beispiel:logistische-regression-ist-ein-konvexes` in den Haupttext
   zurück. Das hat der Bearbeiter von Kapitel 11 zu entscheiden.

## Prüfungen

- `npm run typecheck:mdx`: 206 MDX-Dateien geprüft, keine Fehler.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen; gemeldet wird nur
  „Tabelle ist nicht aktuell“ (nach Edits erwartet).
- Geänderte Dateien: `src/chapters/04-fehler/S42.mdx`,
  `src/chapters/12-optim/S121.mdx`, `S122.mdx`, `S124.mdx`. Keine IDs oder
  Anker geändert, keine Zieldateien angefasst.
