# Straffung Kapitel 10, Teil 1 (S101–S105): Bericht

Stand 2026-09-26. Grundlage: BRIEF.md, Plan `10-differentialrechnung-plan.md` (Gruppe 1),
Decks `10-ableitungen-I.qmd` und `11-ableitungen-II.qmd`. Ein Vorlauf hatte noch nichts
geändert (`git diff 21b998d` leer), der Durchgang ist also vollständig aus diesem Lauf.
Alle fünf Dateien wurden ganz gelesen und Zeile für Zeile bearbeitet.

## 1. Zahlen (`zaehlen.mjs 10-differentialrechnung`)

| Datei | Haupttext vorher → nachher | Vertiefung vorher → nachher | gesamt vorher → nachher |
| --- | ---: | ---: | ---: |
| S101 | 2 393 → 2 068 (−13,6 %) | 278 → 278 | 2 671 → 2 346 (−12,2 %) |
| S102 | 3 282 → 2 846 (−13,3 %) | 137 → 137 | 3 419 → 2 983 (−12,8 %) |
| S103 | 3 093 → 2 533 (−18,1 %) | 938 → 921 | 4 031 → 3 454 (−14,3 %) |
| S104 | 2 670 → 2 137 (−20,0 %) | 1 414 → 1 632 | 4 084 → 3 769 (−7,7 %) |
| S105 | 2 231 → 2 017 (−9,6 %) | 699 → 404 | 2 930 → 2 421 (−17,4 %) |
| Summe | 13 669 → 11 601 (−15,1 %) | 3 466 → 3 372 | 17 135 → 14 973 (−12,6 %) |

Der Plan hatte für Gruppe 1 etwa 11 440 Wörter Haupttext angesetzt (−16 %). Die Differenz
von rund 160 Wörtern kommt aus drei Stellen, an denen ich bewusst weniger gestrichen habe
als geplant (siehe §5). Gedankenstriche: in allen fünf Dateien null.

## 2. In Vertiefungen verlagert

- **S103, Beweis zu `lemma:die-matrix-der-linearen-naeherung`** → neue
  `:::::vertiefung[Warum die Matrix der linearen Näherung die Jacobimatrix ist]`. EXTRA:
  Die Folie gibt nur D f(h) = J h an, einen Beweis gibt es dort nicht. Die Aussage bleibt
  im Haupttext, denn S102, S105, S109 und die Klausur-Konzeptfrage stützen sich darauf.
- **S103, exakte Restterm-Rechnung in `beispiel:quadrieren-in-der-ebene`** (r(h) = f(h),
  ‖r‖ = ‖h‖², Zahlen 0,02/0,0002) → an den Anfang der bestehenden Vertiefung, jetzt
  `::::vertiefung[Der exakte Restterm und die Jacobi-Determinante als Flächenfaktor]`.
  EXTRA: die dritte Restterm-Demonstration im Kapitel. Im Haupttext bleibt ein Satz
  (r(h) = f(h), Länge ‖h‖², „ein Zehntel Schrittweite kostet ein Hundertstel Fehler“);
  die zahlfrage „Faktor 4“ lässt sich damit weiter beantworten.
- **S104, Herleitungs-Absatz „Alle drei Formeln lassen sich als Muster lesen …“ und
  `beispiel:probe-der-frobenius-identitaet`** → neue `::::vertiefung[Woher die drei Identitäten kommen]`
  direkt hinter `satz:identitaeten-fuer-matrix-zu-skalar`. EXTRA: Deck 10 nennt die
  Identitäten ohne Herleitung. Die Frobenius-Rechnung ist die dritte von fünf Fassungen
  desselben Falls. Anstups-Kasten, zahlfrage 0,16 und Selbsttest kommen ohne diese Box aus.
- **S105, Gegenrichtung:** Die Vertiefung „Warum Differenzierbarkeit Stetigkeit erzwingt“
  ist aufgelöst. Ihr Beweis steht jetzt als `::::beweis` mit drei Schritten im Haupttext,
  weil Deck 11 ihn auf einer gezählten Folie führt. Die bisherigen Schritte 2 und 3 sind
  zusammengelegt, die O-Kurzform aus der Folie steht am Ende von Schritt 2. Dass nur die
  Beschränktheit eingeht, steht jetzt im why von Schritt 1.

## 3. Gestrichen

- **S101** `bemerkung:ausblick-andere-ableitungsbegriffe` (nur in S101 zitiert). Ein Halbsatz
  zu Gateaux und Hadamard steht jetzt im Fréchet-Absatz, wie auf der Folie. Außerdem
  gestrichen: der Stützgeraden- und Subgradienten-Exkurs in
  `bemerkung:wenn-es-keine-eindeutige-tangente-gibt`, der Kurzschreibweise-Satz nach der
  Definition (Dublette zu *Der Restterm*), die Zeile „Vier Punkte zur Definition:“ und die
  Meta-Sätze „Wir gehen die Definition Punkt für Punkt durch“ und „…das lässt sich präzise
  sagen“.
- **S102** Tabelle „Halbieren wir h …“ in `beispiel:gradient-einer-quadratischen-funktion`,
  weil Sekanten-Widget (S101) und Quadrieren-Beispiel (S103) dasselbe zeigen. Weiter
  gestrichen: das ausgeschriebene e_j-Argument (steht als Lemma in S103, hier nur noch ein
  Satz mit Verweis) und in `bemerkung:drei-nachtraege-…` Determinante 2A, Eigenwerte
  3 ± √10 und Eigenrichtungen. Die Quizantwort nennt 6,162/−0,162 weiter selbst. Im
  GD-Kasten fällt der Schlussteil zum Sattel weg (steht schon im Lead-in),
  in der Höhenlinien-Bemerkung der Halbsatz zum Satz über implizite Funktionen.
- **S103** `:::::vertiefung[Der Beweis in Koordinaten]` komplett (≈ 270 Wörter). Dasselbe
  Argument ist der Beweis zu `@satz:kettenregel` in S106 (Deck 11). Ersetzt durch einen Satz:
  „Der Satz ist die Koordinatenfassung der allgemeinen Kettenregel …; dort steht auch der
  Beweis“. Ebenfalls gestrichen: der Regularisierungsabsatz in
  `bemerkung:die-gradientenkette-eines-netzes` (nicht auf den Folien, nirgends gebraucht)
  und der Nullmengen-Satz zu ReLU-Schaltstellen.
- **S104** Punkt *Der Restterm* in `bemerkung:das-format-bleibt-erhalten` bis auf einen Satz.
  Weiter: die Werte bei x = 2 in der 2×3-Übung, „Das ist eine der meistbenutzten Formeln der
  Statistik“ und in `bemerkung:der-ableitungsterm-ist-ein-skalarprodukt` der Halbsatz zur
  Frobenius-Norm aus Kapitel 3.
- **S105** Rückblick „Woran wir anknüpfen“ von ≈ 360 auf ≈ 150 Wörter gekürzt: den
  Begriffsteil-Rückblick, die D/E-Erwartungswert-Notiz (steht in S101) und den Absatz „Die
  drei konkreten Gestalten …“ gestrichen. Außerdem der Landau-Schlusssatz in
  `bemerkung:gross-o-und-klein-o-fuer-kleine` (steht in S101), der Absatz „Üblicherweise
  fasst man …“ aus dem alten Vertiefungsbeweis, die Schlusssätze der Merkregel-Bemerkung,
  die Farbcode-Sätze der Diagramm-Unterschrift, „Ein zweiter Blick … lohnt sich“ und der
  Tensor-Satz am Ende von `bemerkung:fuenf-spezialfaelle-derselben-aussage`.
- Kastenprosa in allen Widget-Kästen auf zwei bis vier Sätze gekürzt, keine auf null.
  Die Auflösung der Schätzfrage im Lupen-Kasten bleibt verdeckt.

## 4. Reparierte Fehler

- **S102, GD-Kasten, Fachfehler:** „Die Lernrate ist durch das Verhältnis der Eigenwerte
  begrenzt“ war falsch. Die Schwelle ist 2/λ_max; das Verhältnis bestimmt nur, wie gut die
  beste Rate ist. Die neue Fassung nennt ρ(α), die beste Wahl und den Grenzfall
  2/λ_max. Die Metaphern „kriechen/davonlaufen“ sind durch „kommen kaum voran/divergieren“
  ersetzt.
- **S103 „Verkettung“:** Der kaputte Satz „Jetzt schalten wir mehrere hintereinander, wenn
  also die Ausgabe der einen …“ ist repariert. In der Flächenfaktor-Bemerkung stand
  „Weil sich das krumme Bild … übereinstimmt“ (Grammatik), und der Satz „Das Bild dazu: …“
  verwies auf ein Bild, das es im Skript nicht gibt; er ist gestrichen. „mal einer
  Matrix“ heißt jetzt zweimal „mal eine Matrix“.
- **S104:** Der Spur-Beweis kündigte die numerische Prüfung „am Ende dieses Abschnitts“ an,
  sie steht aber in der Mitte. Jetzt steht dort „unten“.
- **S105:** „Umgekehrt darf uns ein glatt aussehender Graph nicht beruhigen“ passte nicht
  zu Knicken. Neu: „Umgekehrt beweist ein Graph ohne Sprünge noch keine
  Differenzierbarkeit, denn Knicke sind mit Stetigkeit verträglich.“ Im Rückblick fehlte
  nach der Kürzung „normierte Vektorräume D und E“; das ist ergänzt.
- **Getippte Nummern (KONVENTIONEN):** In S101 fällt „am Ende von Kapitel 12“ weg. In S102
  heißen die Titel jetzt „Drei Nachträge zur quadratischen Form“ und „Warum im Update ein
  Transponiertes steht“ (IDs unverändert). Der Handlink „[Kapitel 9](?k=09-tensoren#sec-9.2)“
  ist jetzt `@sec:tensoren/tensoren`.
- **Titel (Deslop):** Die Kästen heißen jetzt „Konzeptkarte zu Analysis und Optimierung“,
  „Gradient und Höhenlinie“, „Richtungsableitung im Kompass“, „Linearisierung bei
  schrumpfendem Fenster“, „Die drei Identitäten im numerischen Vergleich“ und „Lokale
  Linearität unter der Lupe“. Eine Vertiefung heißt jetzt „Aufwand der Jacobi-Kette und
  Backpropagation“, eine Bemerkung „Was hier linear ist“ (ohne „eigentlich“). Die
  Schlüsselwörter der zahlfragen (Kompass, Linearisierung, Lupe, Anstups) sind erhalten.
- **Einzeltells:** entfernt wurden „nicht nur … sondern“, „genau das/der/diesen“, „bloß“,
  „schlicht“, „wörtlich“, „Lehrreich“, „Bezahlen“, „Landkarte“, „Tür“, „Vorsicht“,
  „Wie das Widget zeigt“, „aufgeblasen“ und „Davonlaufen“; „man“ steht jetzt in Wir-Form.

## 5. Ermessensentscheidungen und offene Fragen

- **Abweichungen vom Plan, alle zugunsten der Substanz:**
  - S101, Sekanten-Kasten: Die Beobachtung „knapp neben dem Knick läuft eine Sekante über
    ihn hinweg“ bleibt als Halbsatz. Ohne sie steht der Schlusssatz „Lineare Approximation
    ist eine lokale Aussage“ unbegründet da.
  - S104, `bemerkung:das-format-bleibt-erhalten`: Vom Restterm-Punkt bleibt ein Satz
    (matrixwertiger Rest in beliebiger Matrixnorm, Normäquivalenz). Sonst erklärt nichts,
    was o(|h|) bei einer Matrix misst.
  - S105: Der Vorkenntnis-Absatz bleibt, verdichtet. Er gibt die gezählte Folie
    „Verwendete Vorkenntnisse“ aus Deck 11 wieder und trägt fünf Konzept-Pop-up-Links
    (Ableitung, Taylorreihe, Skalarprodukt, quadratische Form, Komposition). Der Plan
    wollte ihn streichen.
  - S101: Der Karten-Kasten heißt „Konzeptkarte …“ statt „Übersicht: …“. Das Widget ist
    eine Konzeptkarte, und „Konzeptkarte“ ist ein Fachbegriff, keine Metapher.
- **Zur Durchsicht durch den Dozenten** (so im Plan vorgesehen):
  - Der Koordinatenbeweis der Jacobi-Kettenregel ist gestrichen (S103).
  - Der Stetigkeitsbeweis steht wieder im Haupttext (S105).
  - Neu im Haupttext von S103 ist der Satz „*Backpropagation* ist die effiziente
    Auswertung dieser Kette: von links …“. Er holt den Folien-Satz in den Haupttext; in der
    Vertiefung ist Backpropagation jetzt nicht mehr kursiv.
- **Weggefallene Konzept-Links** (sie standen nur in gestrichenen Sätzen): S103
  `matrix-norm`, S105 `big-o-notation`, `gradient`, `norm`, `tensor`, `vector-space`.
  Bis auf `gradient` sind alle an anderer Stelle im Kapitel verlinkt. `gradient` hängt
  jetzt nur noch an S109. Wenn der Dozent den Link früh im Kapitel will, passt er in
  `definition:gradient` (S102).
- **Offen, nicht geändert:** In S101 verweist die Antwort zur dritten Selbsttestfrage auf
  „Schritt 1 und 2 des Beweises“, und dieser Beweis steht in einer Vertiefung (die Box
  klappt über den Verweis auf). Die Frage selbst lässt sich aus der Satzaussage
  beantworten, die im Haupttext steht.

## 6. Prüfungen

Nach jeder Datei `npm run typecheck:mdx` und `node scripts/gen-numbers.mjs --check`; am Ende
alle vier:

- `npm run typecheck:mdx`: 206 MDX-Dateien statisch geprüft, Exit 0.
- `node scripts/gen-numbers.mjs --check`: keine `FEHLER`-Zeile. Exit 1 kommt nur von „Tabelle
  ist nicht aktuell“ und ist nach Edits erwartet.
- `npm run test:mdx`: 137/137 Fixtures, Inventar-/Orakeltests bestanden, Exit 0.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0. Die Zeile „\cbblue{…}
  FEHLER: Makroname erscheint als Literaltext“ ist der eingebaute Negativtest des
  Makro-Checkers. Kein Prüfscript musste angepasst werden, keine Lösungszahl und keine
  `loesung=`/`toleranz=`-Angabe wurde angefasst.
- Fehler in fremden Dateien sind keine aufgetreten. S106–S108 sind vom parallelen Editor
  geändert und wurden nicht angefasst.
