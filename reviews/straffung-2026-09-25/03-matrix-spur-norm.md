# Straffung Kapitel 3 (matrix-spur-norm): S31–S36

Stand 2026-09-26. Grundlage: `BRIEF.md`, Folien `slides-2627/slides/03-matrix-spur-norm.qmd`,
alter Bericht `reviews/kuerzung/03-matrix-spur-norm.md` (A1–A8 und B1–B7 waren großteils
schon umgesetzt). Der Vorgängerlauf hatte an Kap. 3 nichts geändert (`git diff 21b998d` leer).

## 1. Zahlen (`zaehlen.mjs 03-matrix-spur-norm`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S31 | 1 437 → 1 272 (−11,5 %) | 324 → 209 | 1 761 → 1 481 (−15,9 %) |
| S32 | 1 373 → 1 237 (−9,9 %) | 187 → 187 | 1 560 → 1 424 (−8,7 %) |
| S33 | 1 744 → 1 540 (−11,7 %) | 445 → 447 | 2 189 → 1 987 (−9,2 %) |
| S34 | 1 501 → 1 327 (−11,6 %) | 242 → 78 | 1 743 → 1 405 (−19,4 %) |
| S35 | 2 244 → 1 828 (−18,5 %) | 509 → 525 | 2 753 → 2 353 (−14,5 %) |
| S36 | 676 → 642 (−5,0 %) | 265 → 245 | 941 → 887 (−5,7 %) |
| Kapitel | 8 975 → 7 846 (−12,6 %) | 1 972 → 1 691 | 10 947 → 9 537 (−12,9 %) |

Die Vertiefungen schrumpfen, weil Folienstoff aus ihnen in den Haupttext zurückkam (S31,
S34, siehe §2) und weil S34 eine Rechnung doppelt hatte. Der Gesamtumfang liegt damit etwas
über dem Rahmen von 5–10 %; gestrichen wurden aber nur Dubletten, Meta-Sätze und
Überleitungen (§3).

## 2. Verlagert

In Vertiefungen:

- **S35, @bemerkung:reparatur-die-gesamtnorm** → `::::vertiefung[Reparatur der Maximumsnorm]`.
  EXTRA: Die Gesamtnorm steht nur auf der Anhangsfolie. Das Gegenbeispiel selbst bleibt im
  Haupttext (siehe §5).
- **S33, Hinweis „Fall p = ∞ analog, gute Übung“** aus dem Haupttext in den Einleitungssatz
  der bestehenden Box „Beweis der Spaltensummenformel“.

Aus Vertiefungen zurück in den Haupttext, weil der Stoff auf gezählten Folien steht:

- **S34, Beweis von @satz:unitaere-invarianz**: Box aufgelöst, der `::::beweis` steht jetzt im
  Haupttext. Der Beweis steht auf der gezählten Folie „Schatten-Normen“.
- **S34, @bemerkung:namensgeber-und-anwendung** (Robert Schatten, Approximationsprobleme):
  Box aufgelöst und gestrafft. Steht auf derselben gezählten Folie.
- **S31, Spur = Summe der Eigenwerte für diagonalisierbare A**: Die Folie „Spur und
  Eigenwerte“ nennt die Kernidee (Ähnlichkeitsinvarianz, A = PDP⁻¹) im gezählten Teil. Die
  Dreischritt-Box „Beweisskizze für diagonalisierbare Matrizen“ ist durch einen Einzeiler mit
  Formel im Haupttext ersetzt. Die Links `diagonal-matrix` und `similar-matrices` sind
  mitgewandert.

## 3. Gestrichen

- **S34, Beispiel @beispiel:beispiel-3-4-6**: Die zweite Rechnung von AᵀA, das
  charakteristische Polynom und der R-Einzeiler waren Dubletten von @beispiel:visualisierung
  (S33, gleiche Matrix, gleiche R-Ausgabe). Jetzt steht dort ein Verweis, die Eigenwerte
  bleiben stehen. √10 für die Zahlfrage bleibt.
- **S34, Selbsttest „Nuklearnorm als weiche Version des Rangs“**: Die Frage hing an der
  Nuklearnorm-Vertiefung und wiederholte deren Bemerkung fast wörtlich.
- **S33, Selbsttest „‖Q‖₂ = 1 für jede Orthogonalmatrix“**: Dublette von
  @bemerkung:operatornormen-eigenschaften-von-orthogonalmatrizen („Insbesondere ist ‖Q‖₂ = 1“)
  und vom S35-Selbsttest zu κ₂(Q).
- **S35, Quizfrage „Würfelknopf … geseedeter Generator“**: fragt nach Widget-Interna, kein
  Lernwert.
- **S34, Beweis von @satz:frobenius-norm-und-spur, Schritt 1**: Das `why` wiederholte die
  Rechnung aus S31 und verweist jetzt auf @satz:frobenius-norm-ueber-die-spur.
- **S35, Verträglichkeitsbeweis Teil (2)**: Formel und `why` wiederholten
  @bemerkung:operatornorm-hilfsungleichung; jetzt steht dort nur der Verweis.
- **S31**: Die Motivation „warum die Diagonale / invariant“ stand dreimal da, jetzt einmal.
  Gestrichen sind außerdem der Meta-Satz „ausführlicher Beweis nicht erforderlich“ und der
  Schlussabsatz nach dem Frobenius-Beweis (Dublette von Bemerkung und S32-Einstieg). Die
  Widget-Auswertung wiederholte die konjugierten Paare und ist auf drei Sätze gekürzt.
- **S32**: gestrichen sind der Einstieg „In diesem Abschnitt …“, der Vorverweis am Ende von
  @bemerkung:bemerkung-3-2-2 und der Satz „Auch bei Matrixnormen werden wir gleich fragen,
  welche Menge … Einheitskugel“ (wird nie eingelöst). Ebenso der Selbsttest-Schlusssatz
  „Diese Schwäche führt … zu den Operatornormen“ (stand dreimal da, B7 im alten Bericht).
- **S33**: Der Einstieg wiederholte das Ende von S32 (Iₙ, √n) und ist auf zwei Sätze
  gekürzt. Gestrichen ist auch „Wir dürfen uns deshalb auf Vektoren der Länge 1 beschränken“.
- **S35**: Der Einstieg war ein Rückblick auf 3.2–3.4 mit drei Fragen und ist auf zwei Fragen
  gekürzt. Gestrichen sind außerdem die Überleitungen („Das bauen wir jetzt …“, „Zum Abschluss
  zeigen wir …“, „Rechnen wir diesen Fall von Hand nach“). Die dritte Begründung für κ₂(Q) = 1
  ist durch einen Verweis ersetzt. Aus „Erstens/Zweitens/Drittens“ ist Fließtext geworden.
- **S36**: Einleitung gekürzt, dazu der Einleitungssatz der Aufwand-Box und das „nicht nur“
  im ML-Ausblick.

Deslop in allen Dateien: gratis, billig, schlicht, eben, ja, genau, komplett, „sterben aus“ und
„dank Rundungsfehlern“ sind raus, „man“ ist durch die wir-Form ersetzt. Das Label der
Bemerkung „Vorsicht: Was die Spur nicht kann“ heißt jetzt „Was die Spur nicht kann“ (die ID
ist unverändert). Gedankenstriche im Fließtext: keine.

## 4. Reparierte Fehler und Folienlücken

- **S36, Normen-Selbsttest**: „Probe über die Spur (@sec:matrixnormen)“ zeigte auf den falschen
  Abschnitt und verweist jetzt auf @satz:frobenius-norm-ueber-die-spur.
- **S36, Quiz**: „Die Spur ist mit dem Matrixprodukt nicht verträglich“ kollidierte mit dem
  Fachbegriff *Verträglichkeit* aus 3.5 und heißt jetzt „nicht multiplikativ“.
- **S35, Konditionierung**: „Das rechnen wir im Kapitel über lineare Gleichungssysteme nach“
  stimmte nicht, die Herleitung von κ steht in Kap. 4. Jetzt steht dort @sec:fehler/kondition.
- **S31**: „bei einer rechteckigen Matrix hat die Diagonale keine sinnvolle Bedeutung“ war
  ungenau und ist gestrichen. Übrig bleibt: „nur für quadratische Matrizen definiert“.
- **Widget-Auswertungen ohne Antwort** (im PDF trägt nur die Prosa):
  - S32: Aus „Der Tauschknopf beantwortet die Frage.“ ist die Antwort in Prosa geworden. Im
    TSX geprüft: `durchtauschen` bildet [[a,b],[c,d]] auf [[d,c],[a,b]] ab, aus der
    Default-Identität wird also eine singuläre Matrix.
  - S35: Die Submultiplikativitäts-Auswertung nennt jetzt die Beobachtung (höchstens 1 in
    Operator- und Schattennormen, über 1 in der Maximumsnorm) und verrät die Zahl 2 der
    Zahlfrage nicht.
- **S33, Widget-Auswertung**: „Nur der obere Wert ist die Operatornorm“ direkt nach „zwei
  Hochpunkte“ war missverständlich, denn beide Hochpunkte sind gleich hoch. Umformuliert. Die
  Aussage „x* liegt schief“ gilt jetzt ausdrücklich für die Voreinstellung „schiefe Streckung“.
- **S35, Definition submultiplikativ**: Die Klammer „(⏎$A…$“ renderte „( A“ und ist korrigiert.
- **S35, Selbsttest**: „das gilt nur für submultiplikative Normen“ heißt jetzt „garantiert
  ist das nur …“, denn für einzelne Matrizen kann die Ungleichung auch sonst gelten.
- **Folienlücke S32**: ‖A‖_F² = Σⱼ ‖Aeⱼ‖₂² steht auf der gezählten Folie „Motivation“ und fehlte
  im ganzen Kapitel. Jetzt steht die Formel in „Was elementweise Normen nicht sehen“
  (nachgerechnet: Aeⱼ ist die j-te Spalte).
- **Folienlücke S36**: Die Folien-Zusammenfassung nennt unter „Verbindungen“ die
  Konditionszahl κ(A) = ‖A‖‖A⁻¹‖. Sie ist in der Konzepttabelle (Zeile „Eigenschaften“)
  ergänzt.

## 5. Ermessensentscheidungen und offene Fragen

- **Äquivalenz-Widget (S35)** bleibt im Haupttext, obwohl die Schärfe der Konstanten EXTRA
  ist. Es veranschaulicht die Folienkette ‖A‖₂ ≤ ‖A‖_F ≤ √min(m,n)‖A‖₂, und eine Zahlfrage
  sowie ein Selbsttest hängen daran.
- **Einheitskugel-Widget (S32)**, eine Auffrischung zu Vektornormen, bleibt im Haupttext:
  Die Folien setzen Vektornormen voraus, und zwei Selbsttests hängen daran.
- **Maximumsnorm-Gegenbeispiel (S35)** steht auf einer Anhangsfolie und bleibt trotzdem im
  Haupttext. Es macht die Aussage der gezählten Folie („die Maximumsnorm nicht“) konkret;
  Widget, Quiz und Selbsttest hängen daran. Nur die Gesamtnorm ging in die Vertiefung.
- **S36**: Die zwei benachbarten Vertiefungen (Rechenaufwand, ML-Ausblick) sind nicht
  zusammengelegt, weil sie thematisch nichts verbindet. Der Brief verlangt eigentlich eine
  Box für benachbartes EXTRA-Material.
- **S31**: Die Beweisskizze ist als Einzeiler in den Haupttext gewandert, die Box fiel weg
  (siehe §2). Das Widget-TSX `S31SpurWidget.tsx:391` („Der Beweis von Satz … aus dem Skript
  greift hier nicht“) passt weiterhin.
- **Offen, fremde Dateien (nicht geändert)**:
  - `12-optim/S121.mdx:709` verweist für die Verträglichkeit der induzierten Norm auf
    @sec:matrix-spur-norm/operatornormen. Die Ungleichung steht aber als
    @bemerkung:operatornorm-hilfsungleichung in @sec:matrix-spur-norm/eigenschaften.
  - `06-svd/S64.mdx:448` sagt, die Normalgleichungen quadrieren die Konditionszahl, mit Verweis
    auf @sec:matrix-spur-norm/eigenschaften. κ(AᵀA) = κ(A)² steht in Kap. 3 nirgends
    ausdrücklich.
- Es gibt keine neuen R-Ausgaben. Der R-Block in S33 ist unverändert, der in S34 ist als
  Dublette entfallen.

## 6. Prüfungen (Endstand)

- `npm run typecheck:mdx`: 206 MDX-Dateien geprüft, Exit 0.
- `node scripts/gen-numbers.mjs --check`: keine `FEHLER`-Zeilen, nur „Tabelle ist nicht
  aktuell“ (erwartet).
- `npm run test:mdx`: 137/137 Fixtures, der Inventory-Test und der Orakel-Regressionstest
  bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0. Die Zeile zu `\cbblue` ist
  der bekannte Negativtest. Kein Prüfscript liest MDX aus Kap. 3.
- Headless-MathJax (Makros aus `src/fmm-macros.ts`, 187 geladen, ohne `noundefined`):
  676 Literale in S31–S36, 0 Fehler, Negativtest `\foo` erkannt.
- Zuklapp-Test (Vertiefungen per Fence-Regex ausgeblendet): Kein Verweis im Haupttext zielt auf
  eine ID, die nur in einer Vertiefung definiert ist, und es gibt keine „Schritt N“-Treffer.
- IDs, Anker und `:k[…]{#id}`-Links sind je Datei unverändert (Mengenvergleich gegen
  21b998d). Es gibt keine getippten Kapitel- oder Satznummern und keine Komposita mit
  Zeilenumbruch nach dem Bindestrich.
