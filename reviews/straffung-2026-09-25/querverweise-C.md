# Querverweise C: inhaltliche Prüfung (Quellkapitel 05, 08, 10, 11)

Umfang: alle 107 Einträge aus `crossrefs-C.json`. Zu jedem Eintrag habe ich
den Satz um den Verweis und das Ziel gelesen (Umgebung bzw. Abschnitt mit
Überschriften und den passenden Stellen per grep). Bei Zielen in einer
Vertiefung habe ich außerdem geprüft, ob die Quellstelle im Haupttext steht.

## Befunde (außer OK)

| # | Quelle | Verweis | Urteil | Änderung |
| --- | --- | --- | --- | --- |
| 1 | `05-lgs/S54.mdx:79` | `@sec:fehler/stabilitaet` | ÜBERBEHAUPTUNG (leicht) | Der Listenpunkt „ihre numerische Stabilität ohne Pivotierung (@sec:fehler/stabilitaet)“ steht parallel zu „Existenz … (@satz:cholesky-zerlegung)“ und liest sich deshalb wie ein Beleg. Kap. 4.3 behandelt Cholesky aber gar nicht. Neu: „ihre numerische Stabilität (im Sinne von @sec:fehler/stabilitaet) auch ohne Pivotierung“. Damit belegt der Verweis nur den Begriff. Die Aussage selbst steht für sich (so auch in 5.5). |
| 2 | `08-la-misc/S81.mdx:28` | `@sec:matrix-spur-norm/schattennormen` | FALSCHES ZIEL | Orthogonalmatrizen werden in 3.3 eingeführt („Einschub: Orthogonalmatrizen“), nicht in 3.4. Umgestellt auf `@definition:operatornormen-orthogonalmatrix`. |
| 3 | `08-la-misc/S81.mdx:31` | `@sec:lgs/lgs` | FALSCHES ZIEL (zu eng) | „Lineare Gleichungssysteme samt ihrer direkten Lösungsverfahren“: In 5.2 stehen nur die Problemstellung und die Gauß-Elimination, LU und Cholesky folgen in 5.3/5.4 (S83 benutzt später LU). Umgestellt auf `@kap:lgs`. |
| 4 | `10-differentialrechnung/S106.mdx:61` | `@sec:matrix-spur-norm/spur` | ÜBERBEHAUPTUNG | Verdachtsfall bestätigt: Kap. 3.1 führt weder ein Frobenius-Skalarprodukt noch Cauchy-Schwarz in der Frobenius-Norm ein. Es definiert die Frobenius-Norm aber als euklidische Norm der Einträge als langer Vektor (Def. `frobenius-norm`). Neu: „… also bilinear. Die Frobenius-Norm ist die euklidische Norm der Einträge als langer Vektor (@definition:frobenius-norm), also gibt Cauchy-Schwarz für diese Vektoren wieder K = 1.“ Die Mathematik ist unverändert. |
| 5 | `10-differentialrechnung/S108.mdx:542` | `@sec:lgs/lu` | FALSCHES ZIEL | „LGS lösen statt invertieren: kostet weniger und ist stabiler (@sec:lgs/lu)“. Die Begründung steht in 5.2, `@bemerkung:fuer-ein-lgs-keine-explizite-inverse` (Aufwand und Genauigkeit), nicht im LU-Abschnitt. Umgestellt. |
| 6 | `11-konvexitaet/S115.mdx:397` | `@sec:differentialrechnung/matrixableitungen` | VERTIEFUNG (nur gemeldet) | Die Quelle steht im Haupttext (Bemerkung „Eine Übersicht der Optimierungsprobleme“): „Die Zielfunktion aus @sec:… ist in U und V jeweils konvex, in beiden zusammen aber nicht.“ Die Matrix-Completion-Zielfunktion steht in 10.4 nur in der Vertiefung „Anwendung: Matrixzerlegung und Matrix Completion“. Die Abhängigkeit ist schwach: Es ist ein Listenpunkt, der Leser braucht nur die Form ‖P_Ω ⊙ (Y − UVᵀ)‖². Nicht verschoben. |

**OK: 101 von 107 Verweisen.**

## Ermessensfälle und offene Fragen

- **S108:542 (Befund 5):** Die Quelle sagt „stabiler“, die Zielbemerkung
  argumentiert mit *Genauigkeit* (zusätzliche Rundungen der Inversenbildung
  können den Fehler vergrößern), nicht mit Stabilität im Sinne von Kap. 4.3.
  Den Wortlaut habe ich gelassen. Soll dort „genauer“ stehen?
- **S54:79 (Befund 1):** Dass Cholesky ohne Pivotierung (rückwärts)stabil ist,
  steht im Skript nur als Behauptung (5.4, 5.5), nirgends mit Beleg. Für die
  Vorlesung reicht das vermutlich. Falls ein Beleg gewünscht ist, fehlt ein
  Literaturverweis (z. B. Higham, analog zur LU-Stelle in 5.5).
- **S115:168 → @sec:optim/beschraenkt (als OK gewertet):** „Konvexe
  Subniveaumengen … daran hängt in 12.5 die Beschreibung zulässiger
  Bereiche.“ 12.5 beschreibt zulässige Bereiche über h_j(x) ≤ 0 (also
  Subniveaumengen) und setzt in `satz:kkt-und-konvexitaet` konvexe h_j
  voraus. Dass der zulässige Bereich dann konvex ist, sagt 12.5 aber nicht
  ausdrücklich. Die Formulierung ist vage, trägt aber.
- **S51:19 → @sec:algos/probleme-algorithmen (als OK gewertet):** Die Quelle
  charakterisiert „direkte Methoden“ als „endlich viele Schritte, exakte Lösung
  in exakter Arithmetik“. 2.1 (`bemerkung:arten-von-algorithmen`) führt
  *direkt* und *exakt* dagegen als unabhängige Achsen. Für LU/Cholesky trifft
  beides zu, deshalb nicht geändert.
- **S114:440 → @korollar:taylorapproximation-fuer-vektor-zu (als OK
  gewertet):** Das Korollar setzt f ∈ C³ voraus, die Quelle hat nur C². Das
  Korollar sagt aber ausdrücklich, dass die zweite Zeile schon mit C² auskommt.
- Die Verdachtsfälle aus dem Auftrag zu 12-optim/S121, 04-fehler/S42,
  06-svd/S64 und 13-funktionsapproximation/S132, S133 gehören nicht zu Liste C
  und sind hier nicht geprüft. Nebenbei gesehen: S64 verweist für die
  quadrierte Konditionszahl inzwischen auf
  `@sec:effizient-aber-moeglicherweise-instabil` (Kap. 7.3), nicht auf Kap. 3.
- In 02-algos habe ich nichts geändert und dort auch keine Befunde (alle
  Ziele in Kap. 2 tragen die Aussagen: Landau, Aufwand, Algorithmusbegriff).

## Geänderte Dateien

- `src/chapters/05-lgs/S54.mdx`
- `src/chapters/08-la-misc/S81.mdx` (zwei Verweise)
- `src/chapters/10-differentialrechnung/S106.mdx`
- `src/chapters/10-differentialrechnung/S108.mdx`

Keine IDs oder Anker geändert, keine Zieldateien angefasst.

## Prüfungen

- `npm run typecheck:mdx`: 206 MDX-Dateien geprüft, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen. Exit 1 nur wegen
  „Tabelle ist nicht aktuell“, das ist nach Edits erwartet.
- Die geänderten Formulierungen kommen in `scripts/` nicht vor
  (verify:numbers ist also nicht betroffen).
