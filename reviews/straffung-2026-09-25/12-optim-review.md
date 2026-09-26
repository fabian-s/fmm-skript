# Gutachten Straffung Kapitel 12 (optim)

Stand 2026-09-26. Geprüft: Diff `21b998d..` für S121–S126, alle sechs Dateien im
neuen Zustand vollständig gelesen, Folien `13-optim-I.qmd` und `14-optim-II.qmd`
Folie für Folie abgeglichen, Berichte `12-optim-teil1.md`, `12-optim-teil2.md` und
Plan gegengelesen. Gesamturteil: Der Durchgang ist sauber. Die Verlagerungen
entsprechen dem Brief, Selbsttests hängen nirgends mehr an Vertiefungsstoff,
IDs sind unverändert. Ich habe zehn kleine Korrekturen gemacht, darunter eine
Sinnumkehr in einer Selbsttest-Antwort und eine fehlende Folienaussage.

## 1. Zahlen (`zaehlen.mjs 12-optim`)

| Datei | Haupttext Basis → nach Teil 1+2 → nach Review | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S121 | 3 913 → 3 058 → 3 059 (−21,8 %) | 1 900 → 1 946 | 5 813 → 5 005 |
| S122 | 3 836 → 2 710 → 2 725 (−29,0 %) | 321 → 587 | 4 157 → 3 312 |
| S123 | 5 356 → 4 422 → 4 422 (−17,4 %) | 562 → 813 | 5 918 → 5 235 |
| S124 | 4 917 → 3 981 → 4 012 (−18,4 %) | 609 → 938 | 5 526 → 4 950 |
| S125 | 2 668 → 2 343 → 2 326 (−12,8 %) | 0 → 139 | 2 668 → 2 465 |
| S126 | 1 768 → 1 504 → 1 499 (−15,2 %) | 0 → 0 | 1 768 → 1 499 |
| **Summe** | **22 458 → 18 018 → 18 043 (−19,7 %)** | **3 392 → 4 423** | **25 850 → 22 466 (−13,1 %)** |

Richtwert −20 bis −30 %: knapp an der Untergrenze. Das halte ich für
begründet. Der Rest steht auf gezählten Folien oder trägt Selbsttests; die
Editoren und ich haben Folienlücken geschlossen (Self-Check-Frage, Nesterov,
AdamW und Lernratenplan, Lasso-Subgradient, Brent, Gradient Clipping), was den
Haupttext um gut 150 Wörter wachsen ließ. Weiter kürzen hieße Folienstoff kürzen.
Gesamtumfang −13,1 % liegt über dem Brief-Ziel (5–10 %).

## 2. Meine Änderungen (je mit Grund)

1. **S125, Selbsttest „Die Lasso-Lösung muss nicht in einer Ecke der Raute
   liegen" (wahr).** Die gekürzte Antwort begann mit „Nur solange das Budget klein
   genug ist." Als Antwort auf die Aussage gelesen, kehrt das den Sinn um. Jetzt:
   „In der Ecke liegt sie nur, solange das Budget klein genug ist."
2. **S124, Bemerkung „Rauschen und Mini-Batches".** Die gezählte Folie „SGD:
   Grundlage moderner AI" nennt Gradient Clipping und „Mini-Batch-Rauschen kann
   helfen, Sattelpunkte und Plateaus zu verlassen"; beides fehlte im Kapitel
   (offene Frage aus Teil 2). Ein Satz ergänzt, mit Verweis auf
   @bemerkung:was-sattelpunkte-fuer-die-verfahren.
3. **S121, Vertiefung „Fixpunktiteration", @bemerkung:das-dilemma-der-schrittweite.**
   Halbsatz zurückgeholt: Die akzeptierten Liniensuche-Schrittweiten müssen nicht
   gegen null gehen, Folgen γₖ → 0 spielen erst bei SGD eine Rolle. Grund: Die
   Anhangsfolie sagt „In der Praxis: Folge γₖ → 0", das Skript sagt jetzt ohne
   Erklärung etwas anderes (offene Frage aus Teil 1; Präzision).
4. **S122, @beispiel:vier-konvexe-verlustfunktionen, erster Satz.** Die Folie
   „(Non-)Konvexe Optimierung in ML & Statistik" (13-optim-I, gezählt) steht
   ausführlich nur in 11.5 (@bemerkung:eine-landkarte-der-optimierungsprobleme).
   Statt „Vier Standardfälle, die im Skript wiederkehren." jetzt ein Satz, der
   dorthin verweist; hier bleiben die vier nachgerechneten Fälle.
5. **S124, @bemerkung:warum-newton-die-kondition-nicht-spuert, erster Satz.**
   „…hing an der Konditionszahl, die von Newton nicht." war eine schwer lesbare
   Ellipse. Jetzt „…hängt an der Konditionszahl (@sec:…), die des
   Newton-Verfahrens nicht."
6. **S124, Vertiefung „Warum Newton die Kondition nicht spürt: affine Invarianz".**
   Nach der Verlagerung hing „Gemeint ist die Zahl der Schritte" ohne Bezug; der
   Vorsatz („@beispiel:ein-zug-statt-vieler zeigt eine Rechnung, in der die
   Kondition nicht vorkommt", ein 1D-Beispiel ohne Kondition) trug nichts. Jetzt:
   „Unabhängig von der Kondition ist die Zahl der Newton-Schritte, nicht die
   Rechnung darin: …"
7. **S124, Selbsttest Momentum (Q5).** „α\* ≈ 0,15" benutzte ein Symbol, das nur
   noch in der Vertiefung definiert ist. Jetzt „ein Momentumparameter von etwa
   0,15" (Zahl unverändert, nachgerechnet: ((√5−1)/(√5+1))² = 0,146).
8. **S121, @bemerkung:quadratische-konvergenz, erster Satz.** „Der Fehler eₖ := …
   des nächsten Schrittes verhält sich wie …" (Definition mitten im Subjekt,
   eₖ ist der *aktuelle* Fehler) → „Mit eₖ := … verhält sich der Fehler des
   nächsten Schrittes wie das Quadrat des aktuellen".
9. **S125, @bemerkung:kreis-gegen-raute-warum-lasso-nullen.** Der Satz „Zwingend
   ist das nicht: Bei großem Budget c kann auch die Lasso-Lösung auf einer Kante
   liegen …" gestrichen. Dublette: Der Kasten direkt darunter sagt dasselbe mit
   Zahlen, der Selbsttest ein drittes Mal.
10. **S126, Absatz nach dem ersten `optim()`-Block.** „Ein über `gr` übergebener
    Gradient wechselt die Methode nicht; Nelder-Mead bleibt die Voreinstellung,
    bis `method` etwas anderes sagt" sagte dasselbe zweimal → „… wechselt die
    Methode nicht, das tut nur `method`."

Keine ID, kein Verweisziel, keine Zahl, keine Mathe und kein Widget-Prop geändert.

## 3. Geprüft und bestätigt (ohne Änderung)

- **Haupttext bei zugeklappten Vertiefungen.** Alle vier Rückbezugsstellen nach
  Verlagerungen sind repariert (S121 „Quadratische Konvergenz", S123
  Konditionszahl-Bemerkung mit den zwei Ersatzsätzen und Zickzack-Kasten, S124
  Parabel-Kasten nennt Funktion und Start selbst, S125 Satz im Haupttext mit
  Ersatzsatz zur Umkehrung). Die Überschrift „Newton Schritt für Schritt" trägt
  bei zugeklappter Box den Parabel-Kasten; das liest sich.
- **Quizfragen (50, davon 40 in den Selbsttests).** Jede einzeln gegen die
  Fence-Struktur geprüft: alle Haupttext-Fragen sind aus dem Haupttext beantwortbar. Die Quizfragen in der Fixpunkt-Vertiefung
  (S121) hängen an Vertiefungsstoff und stehen selbst in der Vertiefung. Die
  Folien-Quizfragen (Opener I/II, Zwischenfrage, beide Self-Checks) sind im
  Haupttext abgedeckt; Self-Check I Frage 1 ist jetzt Selbsttestfrage in S123
  (Rechnung nachgeprüft: (2,1) − 0,25·(4,8) = (1,−1)).
- **Folienabgleich.** Jede gezählte Folie beider Decks hat ihren Stoff im
  Haupttext von Kap. 12, mit zwei Ausnahmen, die in 11.x liegen (siehe §4).
  Klausurthemen (Zickzack/Kondition, Momentum, Newton in einem Schritt, Newton
  zu Sattel/Maximum, Quasi-Newton nähert H⁻¹, Divergenz bei zu großem γ,
  Lagrange auf der Geraden, Hesse-Eigenwerte, Sattelpunkte in hoher Dimension,
  Newton-Kosten) stehen alle im Haupttext.
- **Fachliche Korrekturen der Editoren** (Teil 1 §4, Teil 2 §4) einzeln
  nachvollzogen; alle zutreffend, u. a. κ = 25 schon 103 gegen 161 (Momentum),
  „stark" statt „strikt" konvex beim Heavy-Ball-Zyklus, „kann divergieren".
- **R-Aussagen in S126** (Teil 2 hatte „nicht nachgerechnet" vermerkt). Mangels
  `Rscript` habe ich Rs `nmmin` (Nelder-Mead) und `vmmin` (BFGS, numerischer
  Gradient mit `ndeps = 1e-3`) aus `src/appl/optim.c` nach JavaScript portiert
  (nur Scratchpad, nicht im Repo) und die Aufrufe der Folie nachgerechnet:
  (−1; −0,5) endet bei beiden Verfahren in (0; 0); Nelder-Mead aus (−1; 1) in
  (0; 1,0357) mit f = 0,1085 und `convergence = 0`; BFGS aus (−0,5; −1) in
  (0; −1,0357); `maxit = 50` bricht bei (−0,58; −0,15) mit `convergence = 1` ab.
  Die neue Formulierung „endet der Lauf in der oberen/unteren Mulde" stimmt also.
- **Übereifer.** Gestrichen wurde nur EXTRA ohne Folienbezug oder Dubletten
  (Zahlenbeispiele 84,34/1,66 und 28/0 → 59/3, Münzwurf-Zahlen mit Verweis auf
  @bemerkung:praxisrelevanz-der-hesse-matrix in Kap. 10, √(1+x²)−x, Existenzabsatz
  nach dem stark-konvexen Satz, LP-Absatz, R-Codeblock-Dublette in S123). Nichts
  davon gehört zwingend in eine Vertiefung; das Newton-mit-eingefrorener-
  Ableitung-Argument lebt in S123 („das ist der Newton-Schritt") und S124 Q2 weiter.
- **Vertiefungen:** 16 Boxen, keine unter 60 Wörtern außer dem vorbestehenden
  „Beweis der Unverzerrtheit" (69); keine benachbarten Mini-Boxen. Fence-Stufen
  korrekt, Titel Klartext.
- **Untereifer/Deslop.** Grep-Regex aus `german-tells.md` über alle sechs
  Dateien: verbleibende Treffer sind echter Kontrast („nicht nur … sondern auch
  ungefähr wie weit", „nicht nur nach oben, sondern auch nach unten") und
  „Landkarte" als Kastentitel/Widgetname (wörtlich eine Karte, Plan erlaubt es).
  „genau" nur noch mathematisch. Gedankenstriche: 0 in allen Dateien.
- **IDs.** Alle `[#…]`, `{#…}`, `:id[…]` und `:k[…]{#…}` je Datei vorher/nachher
  identisch (sortierter Vergleich, mit Vielfachheit). Keine Widget-`ref()`-Ziele
  betroffen.

## 4. Restpunkte und Fragen für den Dozenten

1. **Abhängigkeit von 11.x (für den späteren Agenten dort).** Folgender
   Folienstoff aus 13-optim-I/14-optim-II steht nur in Kapitel 11 und muss dort im
   Haupttext bleiben, weil Kap. 12 nur darauf verweist:
   @satz:kritischer-punkt-und-globales-minimum, @definition:strikte-konvexitaet,
   @satz:hoechstens-eine-minimalstelle, der Kasten „Drei Landschaften
   nebeneinander" (Folie „Optimierungslandschaften"),
   @bemerkung:eine-landkarte-der-optimierungsprobleme (Folie „(Non-)Konvexe
   Optimierung") sowie in 11.4 @definition:subgradient-und-subdifferential und
   @satz:existenz-von-subgradienten-im-inneren (Folie „Exkurs: Subgradienten",
   gezählt). Die Beweise dazu dürfen Vertiefung bleiben (Anhangsfolie).
2. **Verlagerungen laut Plan zur Durchsicht** (Quadrik-Satz S123,
   Newton-Zahlenbeispiel S124): Ich halte beide für richtig; die Ersatzsätze
   tragen Zickzack, Eigenrichtungs-Faktoren und die 0,81-gegen-0,9-Frage. Die
   Abweichung vom Plan in S125 (KKT-Konvexitätssatz bleibt im Haupttext, Beweis
   in der Box) teile ich.
3. **Momentum-Vertiefung (S124):** Überschrift sagt „stark konvex", der zitierte
   Merksatz „strikt konvex". Logisch stimmig (gilt schon für die Teilklasse der
   stark konvexen nicht), aber vielleicht einheitlich formulieren.
4. **Altbestand, nicht angefasst:** S123 „Den Buchstaben L … wählen wir, weil
   @definition:lipschitz-stetigkeit zeigen wird, dass …" (eine Definition zeigt
   nichts; gemeint ist die Rolle von L in den Konvergenzsätzen).
5. **Folienpunkt nur implizit:** „Für multivariate Probleme heute:
   Gradientenverfahren" (Folie Newton-Raphson-Visualisierung) steht in 12.1 nur
   in der Fixpunkt-Vertiefung; der Haupttext sagt „Das ist teuer" und springt
   dann zu 12.2. Bei Bedarf ein Übergangssatz.
6. Drei Vertiefungstitel haben einen erläuternden Doppelpunkt („… Quadrik:
   Fehlerzerlegung und Zahlenbeispiel", „… Funktion: Zahlenbeispiel", „…: affine
   Invarianz"). Klartext, kein Drama; kürzer ginge.

## 5. Prüfergebnis (Brief §7, Endstand)

- `npm run typecheck:mdx`: 206 MDX-Dateien, ohne Fehler.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen; nur „Tabelle ist
  nicht aktuell" (erwartet).
- `npm run test:mdx`: 137/137 Fixtures, Inventory- und Orakel-Test bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich, „12-optim: alle
  Prüfungen bestanden" (die `\cbblue`-Zeile ist die bekannte Negativkontrolle).
- Zusätzlich `npm run lint:numbers`: Exit 0.
- Fehler in fremden Dateien: keine aufgetreten.
