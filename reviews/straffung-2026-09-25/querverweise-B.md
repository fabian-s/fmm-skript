# Querverweise B: inhaltliche Prüfung (06-svd, 09-tensoren, 13-funktionsapproximation)

Umfang: alle 85 Einträge aus `crossrefs-B.json`. Je Eintrag Satz ±3 Zeilen und
Ziel gelesen (bei Abschnittsverweisen Überschriften und einschlägige Stellen per grep).

- **OK:** 77
- **Befunde:** 8 (3 × FALSCHES ZIEL, 5 × ÜBERBEHAUPTUNG), alle behoben
- **VERTIEFUNG:** 0 (kein Haupttext baut auf einem Ziel in einer Vertiefung auf)

## Befunde

| Quelle | Verweis | Urteil | Änderung |
| --- | --- | --- | --- |
| `06-svd/S64.mdx:448` | `@sec:matrix-spur-norm/eigenschaften` für „$\bX^\top\bX$ quadriert die Konditionszahl“ | FALSCHES ZIEL | Kap. 3 definiert κ nur für quadratische, invertierbare Matrizen, $\kappa_2(\bA^\top\bA)=\kappa_2(\bA)^2$ steht dort nicht. Die Aussage samt Begründung steht in 07-kq/S73 („Woher kommt das Quadrat?“). Umgestellt auf `@sec:effizient-aber-moeglicherweise-instabil` (Unterüberschrift 7.3.3). |
| `09-tensoren/S95.mdx:260` | `@sec:differentialrechnung/matrixableitungen` für „Ableitung eines matrixwertigen Ausdrucks nach einer Matrix ist ein mehrdimensionales Zahlenfeld“ | FALSCHES ZIEL | S104 behandelt nur Skalar→Matrix und Matrix→Skalar. Matrix→Matrix als Tensor der Stufe 3/4 plus Vektorisierung steht im Haupttext von S109 („Was wir ausgelassen haben“). Umgestellt auf `@sec:differentialrechnung/zusammenfassung`. |
| `13-funktionsapproximation/S132.mdx:52` (Vertiefung) | `@sec:lgs/grundlagen` für „spezielle Lösung plus Kern“ | ÜBERBEHAUPTUNG | S51 behandelt weder Kern noch Lösungsmengen, und auch sonst trägt kein Label die Aussage. Sie ist LA-I-Stoff und steht für sich, der `:k[Kern]`-Pop-up bleibt. Verweis entfernt. |
| `13-funktionsapproximation/S132.mdx:214` | `@sec:lgs/grundlagen` für „genau dann für jede rechte Seite eindeutig lösbar, wenn $\bB$ invertierbar“ | FALSCHES ZIEL | S51 sagt dazu nichts. S52 („Problemstellung“) verknüpft eindeutige Lösbarkeit mit Invertierbarkeit. Umgestellt auf `@sec:lgs/lgs`. |
| `13-funktionsapproximation/S132.mdx:371` | `@sec:lgs/lu` (mit `@sec:algos/landau`) für „Bandsystem linear, Dreieck quadratisch, voll kubisch“ | ÜBERBEHAUPTUNG (teilweise) | S53 belegt $O(n^2)$ und $O(n^3)$, führt Bandstruktur aber nur als „ausnutzbar“ auf, ohne „linear“. Den linearen Aufwand ($O(Nq^2)$) zeigt das Kapitel selbst in `@bemerkung:bandstruktur-und-aufwand` (S134). Der Verweis wurde ergänzt: „…; zum Bandsystem @bemerkung:bandstruktur-und-aufwand“. |
| `13-funktionsapproximation/S133.mdx:166` | `@sec:lgs/grundlagen` für „trivialer Kern ⇒ invertierbar“ | ÜBERBEHAUPTUNG | Kein Abschnitt behandelt das. Die Aussage ist LA-I-Stoff und steht für sich, der `:k[Kern]`-Pop-up (Rangsatz) trägt sie. Verweis entfernt. |
| `13-funktionsapproximation/S134.mdx:451` | `@sec:fehler/kondition` direkt hinter „etwa sechzehn signifikanten Stellen eines `double`“ | ÜBERBEHAUPTUNG (Platzierung) | S42 nennt keine 16 Stellen. Es trägt die Faustregel „$\kappa\approx10^k$ kostet bis zu $k$ Stellen“, und die ist der eigentliche Beleg des Satzes. Verweis ans Satzende verschoben: „… Stellen kostet (Faustregel in @sec:fehler/kondition).“ |
| `13-funktionsapproximation/S139.mdx:85` | `@sec:fehler/fehlermasse` für „doppelte Genauigkeit, also 8 Byte“ | ÜBERBEHAUPTUNG | „8 Byte“ steht weder in S41 noch sonst im Skript oder im Pop-up. Die Aussage ist Standardwissen und steht für sich. Verweis entfernt. |

## Bekannte Verdachtsfälle aus den Gutachten

- `06-svd/S64.mdx`, κ(XᵀX) = κ(X)²: **bestätigt**, siehe Tabelle.
- `13-funktionsapproximation/S132.mdx` (zwei Stellen) und `S133.mdx`,
  `@sec:lgs/grundlagen`: **bestätigt**, alle drei Stellen behoben.
  Es gab außerdem eine dritte Stelle in S132 (Bandsystem).
- `12-optim/S121`, `04-fehler/S42` (‖Mv‖ ≤ ‖M‖‖v‖) und
  `10-differentialrechnung/S106` (Frobenius-Cauchy-Schwarz): nicht in Liste B,
  deshalb nicht geprüft.

## Grenzfälle, als OK gewertet (zur Ansicht)

- `06-svd/S61.mdx:47`: „Das gelingt genau für symmetrische Matrizen
  (Spektralsatz, @sec:matrix-spur-norm/operatornormen)“. S33 wendet den
  Spektralsatz nur beiläufig an („Als symmetrische Matrix hat $\bA^\top\bA$ eine
  orthogonale Eigenvektormatrix“). Allgemein formuliert steht er in keinem Label
  des Skripts, nur im Pop-up `spectral-theorem`. Falls gewünscht: Verweis durch
  `:k[Spektralsatz]{#spectral-theorem}` ersetzen.
- `13-funktionsapproximation/S133.mdx:292`: „$\eps \approx 2{,}2\cdot10^{-16}$
  (Maschinengenauigkeit, @sec:fehler/fehlermasse)“. S41 erwähnt die
  Maschinengenauigkeit nur in einem Satz als Schranke des relativen
  Rundungsfehlers. Den Zahlenwert liefert der Pop-up `machine-epsilon`, der an
  derselben Stelle verlinkt ist.
- `13-funktionsapproximation/S131.mdx:28`: „LGS und ihre Lösbarkeit
  (@sec:lgs/lgs)“. S52 setzt Invertierbarkeit voraus, statt Lösbarkeit zu
  diskutieren. Für eine Vorkenntnisliste reicht das.
- `13-funktionsapproximation/S139.mdx:352` (Vertiefung): Die Aussage „Dichte
  enthält |det J|“ steht in `@bemerkung:wie-stark-die-flaeche-verzerrt-wird`,
  also in einer Vertiefung von S103. Die Quelle steht selbst in einer
  Vertiefung, deshalb ist das kein VERTIEFUNG-Befund. Der Abschnittsverweis ist
  korrekt, aber unscharf.

## 02-algos

Vier Verweise der Liste zielen auf 02-algos (`landau`, `probleme-algorithmen`).
Alle vier sind OK, und in 02-algos war nichts zu melden.

## Prüfungen

- `npm run typecheck:mdx`: Exit 0, 206 MDX-Dateien geprüft.
- `node scripts/gen-numbers.mjs --check`: **0 FEHLER-Zeilen**. Exit 1 kommt nur
  von „Tabelle ist nicht aktuell“, das ist nach Edits erwartet.
- `scripts/verify/` prüft keinen der geänderten Wortlaute (grep).
