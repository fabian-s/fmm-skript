# Gutachten Straffung Kapitel 2 (02-algos)

Geprüft: Diff `21b998d..` für `S21.mdx` bis `S25.mdx` (inzwischen als WIP-Commit
b80ab4b eingecheckt), das Kapitel im neuen Zustand vollständig, der Bericht
`02-algos.md`, das Deck `slides-2627/slides/02-algos.qmd` Folie für Folie und die
Klausuren (`fmm-lmu/exams`, Fragen und Musterlösungen).

## Urteil

Die Straffung ist gelungen. Die Kürzungen treffen fast nur Rückblicke,
Ankündigungen, doppelte Sätze und Stilfloskeln. Die Vertiefungen sind jetzt
wenige, zusammenhängende Boxen (S24: 2, S25: 2). Die Folienlücken hat der
Durchgang sauber geschlossen: Θ, „möglichst einfache b_n mit O, aber nicht o",
die f̃-Komposition, die ML-Liste und der Beweis der linearen Laufzeit. Die
Kürzung hat keinen Fachfehler erzeugt. Ich fand vier Stellen, an denen Bezug
oder Präzision verloren gegangen war, und eine Klausurlücke, die schon vorher
bestand. Alle fünf sind repariert.

## Meine Änderungen (6)

1. **S24, Haupttext nach „Anschaulich heißt das"-Liste: neuer Absatz zum Limes
   superior** (Grund: Klausur-Gegenprobe). WS25/26-1 c) verlangt
   `cos(πn) + ln(n)/n + 2 = O(1)`, also einen oszillierenden Quotienten. Der
   Haupttext sagte nur „Grenzwert des Quotienten ausrechnen". Dass der
   Quotient nicht konvergieren muss und dass `limsup < ∞` gleichbedeutend ist
   mit „ab einem Index |a_n| ≤ C·|b_n|", stand ausschließlich in der
   Vertiefung. Die beiden Sätze stehen jetzt im Haupttext, der Link
   `:k[konvergieren]{#convergence}` ist mitgewandert. In der Vertiefung bleibt
   nur noch, was der Limes superior ist (größter Häufungswert, Suprema der
   Restfolgen, existiert immer). Dublette vermieden.
2. **S24, „Eine Landau-Beziehung weisen wir *meist* nach, indem wir den Grenzwert
   … ausrechnen"**. Ohne „meist" widersprach der Satz dem neuen Absatz, denn
   bei oszillierenden Quotienten gibt es keinen Grenzwert.
3. **S25, Hardware-Satz**. Nachdem der Vordersatz gekürzt war, bezog sich
   „Schnellere Hardware ändert *daran* wenig" auf „Die iterative Variante
   bleibt unter einer Mikrosekunde". Jetzt steht dort: „Am Abstand ändert
   schnellere Hardware wenig: … verkürzt die 36 000 Jahre der Rekursion auf
   36 Jahre."
4. **S25, Einleitung der Vergleichstabelle**. Der Satz verwies für T(n) auf
   `@bemerkung:wie-schlimm-ist-es-wirklich`, also in die Vertiefung. Jetzt
   verweist er auf `@lemma:rekurrenz-der-aufrufzahl` im Haupttext. Die
   Tabellenwerte folgen direkt aus der Rekurrenz, und der Zuklapp-Test meldet
   keinen Haupttext-Verweis mehr auf Vertiefungsstoff.
5. **S21, @bemerkung:arten-von-algorithmen**. Die Kürzung hatte aus „Auch ein
   direkter Algorithmus *kann* Schleifen enthalten" die Aussage „auch direkte
   Algorithmen *enthalten* Schleifen" gemacht und bei „noch nicht *numerisch*
   iterativ" das „numerisch" gestrichen. Beides verschärft den Konflikt mit der
   Folien-Definition (siehe Frage 1). Wiederhergestellt als „noch nicht
   *numerisch* iterativ; auch direkte Algorithmen können Schleifen enthalten".
6. **S22, Satz unter der Komposition**. „Jeder Schritt hängt … die Summe … an"
   stimmt für f̃₁ und f̃₂ nicht. Vorher stand dort „Jeder Schleifendurchlauf".
   Jetzt: „Jeder Schritt ab f̃₃ …".

Dazu kommt ein Zeilenumbruch in S25 (eine überlange Quellzeile, rein
kosmetisch). IDs, Anker und `:k`-ids habe ich nicht angefasst.

## Geprüft ohne Befund

- **Folienabdeckung** (jede gezählte Folie gegen den Haupttext): Probleme,
  Live-Demo (RSelbsttest), Schwierigkeiten, Auslöschung, Assoziativität,
  Algorithmus-Definition und Arten, Fibonacci mit f̃-Komposition,
  Implementierung, Quiz, ML-Arten, Analogie, gute Algorithmen, Aufwand,
  MV-Beispiel und allgemeine Formel, Quiz Zeit/Speicher, Komplexität,
  Komplexitätsklassen samt „Vorsicht", Landau-Definition mit Θ,
  Rechenbeispiel, „möglichst einfache b_n", Rechenregeln, Anwendungsbeispiele,
  beide Komplexitätsanalysen, Self-Check, Zusammenfassung. Alles steht im
  Haupttext. Die Anhangsbeispiele (b) und (c) stehen ebenfalls dort (unter 60
  Wörter; (c) trägt die Symmetrie-Quizfrage). Ausnahme: die Live-Messung, siehe
  Frage 2.
- **Zuklapp-Test** (Skript `scratchpad/k2r/k2r_zuklapp.py`): Nach Änderung 4
  verweist der Haupttext auf keine ID mehr, die nur in einer Vertiefung
  definiert ist. Es gibt keine „Schritt N"-Bezüge. Die Selbsttests sind aus
  dem Haupttext lösbar. Die Faustregel 2nd bzw. 2ndm, auf die Kasten und
  Zahlfrage aufbauen, steht jetzt im Haupttext (der Bericht holte sie
  zurück).
- **Übereifer**: Die gestrichene Box „Wie groß ist exponentieller Aufwand?"
  (55 Wörter, 2²⁰⁰) wiederholt das Argument der S25-Tabelle
  (36 000 Jahre, tausendmal schnellerer Rechner). Die Streichung ist
  vertretbar. Der gestrichene MV-Zählbeweis ist durch einen Satz ersetzt, der
  dieselbe Zählung enthält. Die gestrichene Quizfrage „approximativ" steht
  nicht auf der Folie. Die Beispiele aus @bemerkung:arten-von-algorithmen
  stehen vollständig in @beispiel:algorithmenarten-in-ml-und-statistik. Beim
  Deslop ging keine Präzision verloren, außer an den Stellen 5 und 6.
- **Untereifer**: Die Tell-Regex aus german-tells.md liefert 2 Treffer, beide
  falsch positiv („kein Zufall vor" im Wortsinn, „nicht nur nach oben" als
  echter Kontrast). Weitere Suche nach Pet-Phrasen (eigentlich, einfach,
  wirklich, sogar, explodiert, Schere, Buchhaltung …): nur sachliche
  Verwendungen, „sogar" 5-mal, jedes Mal mit echtem Kontrast. Gedankenstriche:
  0. du-Imperative: keine (die Aufgabenzeile „*Berechne die ersten n
  Fibonacci-Zahlen.*" ist die Problemformulierung). Getippte Kapitelnummern:
  keine. Keine Mehrfach-Zusammenfassung: Es gibt eine Kapitelzusammenfassung
  am Ende von S25, der Kapitelanfang in S21 ist eine Vorschau.
- **Zahlen nachgerechnet** (node, BigInt): T(5) = 15, T(20) = 21 891,
  T(30) = 2 692 537, T(50) = 4,07·10¹⁰, T(80) = 7,58·10¹⁶ (2,40 Jahre),
  T(100) = 1,15·10²¹ (36 324 Jahre), 4n − 6 = 74/114/194/314/394.
  Stepper: x₈ 20 Additionen/41 Aufrufe, x₁₀ 54, x₁₅ 609, Iteration 6/8/13.
  Schwellen 2ⁿ gegen c·n²: 5, 15 (c = 100), 19 (c = 1000). Varianzbeispiel:
  122,5 − 100, ULP bei 10¹⁸ = 128. Alles stimmt.
- **Syntax und IDs**: Mengenvergleich aller `[#id]`, `{#…}`, `:id[…]`,
  `id="…"` je Datei gegen 21b998d. Es fehlt keine ID. Entfernt wurden nur
  Verweise (`@kap:matrix-spur-norm` in S21/S22, `@sec:zeit-und-speicheraufwand`,
  `@sec:fibonacci` in S24), die neuen Ziele (`@sec:aufwand`,
  `@sec:la-misc/sketching`, `@kap:lgs`, `@sec:algorithmenarten-in-ml-und-statistik`)
  lösen auf. Fence-Stufen stimmen (`::::vertiefung` > `:::bemerkung`,
  `:::::vertiefung` > `::::beweis` > `:::schritt`). Die Titel enthalten weder
  Mathe noch Markup.

## Restpunkte und Fragen für den Dozenten

1. **Ist die Fibonacci-Schleife „iterativ"?** Diesen Konflikt habe ich nicht
   aufgelöst, er ist der wichtigste offene Punkt. Die Folie „Algorithmen"
   definiert *iterativ* als „gleiche Vorschrift wird mehrfach ausgeführt",
   und die Quizlösung der Folie lautet „1, 2" (exakt und iterativ).
   @bemerkung:arten-von-algorithmen benutzt dagegen die numerische Lesart
   (Näherungsfolge mit Abbruchkriterium, eingeführt in 81fb816), und der
   Selbsttest in S22 wertet „numerisch iterativ" als *falsch*. Die Folie
   „Algorithmenarten in ML/Statistik" ordnet Gauß „direkt" und
   Gradientenabstieg „iterativ" zu. Das passt zur numerischen Lesart, nicht zur
   Quizlösung. Die Folien sind also in sich uneinheitlich. Bitte entweder die
   Folienquizlösung auf „1" ändern oder im Skript die Folien-Definition
   übernehmen.
2. **Live-Messung ×180 bei n = 30** (Folie „Komplexitätsanalyse 2") fehlt
   weiter. Der zweite Teil der Folienpointe („liefert sogar alle ersten n
   Zahlen") steht in @bemerkung:was-wird-hier-eigentlich-berechnet. In diesem
   Container gibt es kein R, darum konnte ich die Messung nicht nachrechnen.
   Außerdem hängt sie von der Maschine ab (bei `system.time` wirkt ×180
   angesichts der ms-Auflösung eher zufällig). Die Modelltabelle ersetzt die
   Messung. Falls die Messung ins Skript soll: ein Satz mit einer eigenen,
   dokumentierten Messung.
3. **S25, Basis φ**: Der Haupttext fragt, welche Basis zwischen √2 und 2 es
   ist, und verweist für die Antwort auf die Vertiefung („rechnet die folgende
   Vertiefung nach"). Die Kastenprosa nennt φ bewusst nicht, weil der Kasten
   eine Schätzfrage enthält. Im PDF ohne Widget bleibt die Antwort also in der
   optionalen Box. Da φ kein Folienstoff ist, halte ich das für richtig. Falls
   das PDF die Antwort tragen soll, genügt ein Satz im Kasten.
4. **Zahlfrage „Faktor 8" (S23)** wiederholt die Schätzfrage im FLOP-Kasten,
   bleibt aber, weil `scripts/verify/REV29/02-algos-S23Aufwand.mjs` sie
   fordert. Dasselbe Script prüft weiter 2²⁰⁰ ≈ 1,6·10⁶⁰ und 5·10³⁴ Jahre.
   Diese Zahlen standen in der gestrichenen Box, der PRÜFSTATUS-Kopf in
   `S23Aufwand.tsx` erwähnt sie noch. Das ist harmlos, aber veraltet. Fremde
   Dateien habe ich nicht geändert.
5. Nebenbefund, schon vor diesem Durchgang so: `S23KonstantenWidget` (Schätzfrage
   zum Schnittpunkt n ≈ 1010, passend zu @bemerkung:vorsicht-konstanten) ist in
   `S23Aufwand.tsx` implementiert und geprüft, wird aber in keinem MDX
   eingebunden.
6. **Richtwert**: Der Haupttext sinkt um 8,2 % (Richtwert −10 bis −15 %). Der
   Grund sind Zugänge an Kernstoff: rund 300 Wörter durch den Durchgang (siehe
   Bericht §2, §4) und 35 Wörter durch Änderung 1. Ohne diese Zugänge läge
   die Kürzung bei etwa −12 %. Weitere Kandidaten habe ich geprüft (Aufrufbaum-
   Beispiel, Konstanten-Bemerkung, Widget-Selbsttests): Sie sind Brücke oder
   hängen an Kernkästen. Weiter kürzen würde Kernstoff kosten.

## Endzahlen (`node reviews/straffung-2026-09-25/zaehlen.mjs 02-algos`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | --- | --- | --- |
| S21 | 1636 → 1434 (−12,3 %) | 0 → 0 | 1636 → 1434 |
| S22 | 1258 → 1100 (−12,6 %) | 0 → 0 | 1258 → 1100 |
| S23 | 1721 → 1610 (−6,4 %) | 225 → 0 | 1946 → 1610 |
| S24 | 1270 → 1227 (−3,4 %) | 540 → 473 | 1810 → 1700 |
| S25 | 1575 → 1481 (−6,0 %) | 669 → 463 | 2244 → 1944 |
| **Summe** | **7460 → 6852 (−8,2 %)** | **1434 → 936** | **8894 → 7788 (−12,4 %)** |

Vor meiner Durchsicht: Haupttext 6802, gesamt 7757.

## Prüfergebnis (Brief §7, nach allen Änderungen)

- `npm run typecheck:mdx`: 206 Dateien, keine Fehler.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen. „Tabelle nicht
  aktuell" war erwartet.
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich, alle sechs
  `02-algos`-Scripte ok.
- Zusätzlich: headless MathJax über alle 574 Mathe-Literale des Kapitels mit 0
  Fehlern (187 Makros, Negativtest `\foo` erkannt). `lint:numbers` meldet
  nichts in 02-algos. Der einzige Treffer liegt in 09-tensoren und gehört
  nicht zu diesem Auftrag.
- Fremde Fehler: keine.
