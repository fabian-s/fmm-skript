# Straffung Kapitel 12, Gruppe 2 (S124, S125, S126) – Bericht

Grundlage: `BRIEF.md`, `12-optim-plan.md` §4. Vorgängerlauf hatte an diesen drei
Dateien nichts geändert (`git diff 21b998d` leer); alles hier ist aus diesem Lauf.

## 1. Zahlen (`zaehlen.mjs 12-optim`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S124 | 4 917 → 3 981 (−19,0 %) | 609 → 945 | 5 526 → 4 926 (−10,9 %) |
| S125 | 2 668 → 2 343 (−12,2 %) | 0 → 139 | 2 668 → 2 482 (−7,0 %) |
| S126 | 1 768 → 1 504 (−14,9 %) | 0 → 0 | 1 768 → 1 504 (−14,9 %) |
| Gruppe 2 | 9 353 → 7 828 (−16,3 %) | 609 → 1 084 | 9 962 → 8 912 (−10,5 %) |

Der Plan sah ≈ −1 850 bis −2 150 Haupttextwörter vor; es sind −1 525. Die Differenz
kommt vor allem von der Abweichung in S125 (Satz bleibt, siehe §5) und von kurzen
Ergänzungen fehlenden Folienstoffs (§5). Weitere Kürzungen hätten Folienstoff oder
Selbsttest-Grundlagen getroffen.

## 2. Verlagert in Vertiefungen

- **S124, @beispiel:newton-auf-einer-nicht-quadratischen** (x − 2 ln x, Tabelle,
  e_{k+1} = e_k²/2) → `::::vertiefung[Newton an einer nicht-quadratischen Funktion: Zahlenbeispiel]`.
  EXTRA: kein Folienbeispiel, die Folie zeigt nur das Bild. Überschrift „Wie schnell
  das geht" → „Newton Schritt für Schritt"; der Widget-Kasten nennt jetzt selbst die
  Funktion, das Minimum 2 und den Start 1 und verweist auf die Tabelle.
- **S124, @bemerkung:warum-newton-die-kondition-nicht-spuert**: der Vorbehalt
  „Schrittzahl, nicht Rechnung; das LGS bleibt mit κ schlecht konditioniert" und der
  Bezug auf @beispiel:ein-zug-statt-vieler → vorn in die bestehende Vertiefung, die
  jetzt „Warum Newton die Kondition nicht spürt: affine Invarianz" heißt. Im
  Haupttext bleiben ein Absatz (Schrittzahl hängt nicht an κ, Newton benutzt die
  Krümmung, Koordinatenwechsel) und der Kostenabsatz (Folie „Quasi-Newton",
  Klausur). Bemerkungstitel → „Kondition und Kosten des Newton-Schritts".
- **S124, @bemerkung:was-der-schwung-bewirkt**: optimale Parameter α\*, γ\*,
  √κ-Rate (0,98 gegen 0,82), Zyklus-Gegenbeispiel mit Nesterov-Schranke,
  Adagrad/RMSprop/ADAM → `:::vertiefung[Optimale Momentum-Parameter und ihre Grenzen]`.
  EXTRA: Anhangsfolie „Momentum: Zusammenfassung".
- **S124, Rückverlagerung (Regelverstoß behoben)**: @bemerkung:rauschen-mini-batches-und-lernraten
  stand in einer Vertiefung, obwohl Mini-Batches Folienstoff sind und Selbsttest Q6
  (√32 ≈ 5,7) daran hängt. Jetzt Bemerkung im Haupttext, Titel „Rauschen und
  Mini-Batches" (ID unverändert): Kosten und Gewinn, Mini-Batches, „Warum das wichtig
  ist". Die klassischen Lernratenbedingungen (Σγ = ∞, Σγ² < ∞, γ ~ 1/k) und das
  Mischen statt unabhängigen Ziehens → `:::vertiefung[Lernraten und Ziehen ohne Zurücklegen]`.
  Die alte Vertiefung „Mini-Batches, Lernraten und praktische Varianten" entfällt.
- **S125, Beweis und Asymmetrie-Beispiel zu @satz:kkt-und-konvexitaet** (min x unter
  x² ≤ 0) → `:::vertiefung[Beweis und Grenzen von KKT bei konvexen Problemen]`.
  EXTRA: Die Folien nennen KKT nur als notwendig. Der Satz selbst bleibt im Haupttext
  (Abweichung vom Plan, siehe §5).

Kein Label entfällt, keine ID geändert. Alle Widget-`ref()`-Ziele (satz:das-bfgs-update-erfuellt-die,
algorithmus:gradientenabstieg-mit-heavy-ball, algorithmus:newton-verfahren-fuer-die-optimierung,
satz:notwendige-bedingung-von-lagrange, satz:karush-kuhn-tucker-bedingungen,
bemerkung:falsche-konvergenz-und-keiner-warnt) stehen weiter im Haupttext.

## 3. Gestrichen

**S124**
- Übergangsabsatz vor dem Selbsttest („Damit sind die Verfahren … beisammen"); S125
  hat eine eigene Einleitung.
- Vorgeplänkel: „In @sec:… haben wir Newton-Raphson … kennengelernt …" (die Überschrift
  sagt dasselbe), „Nebeneinandergestellt sehen die beiden Fassungen so aus", „Beide
  Verfahren lassen sich an einem einfachen Fall gegenüberstellen", „Damit sind die
  vier Verfahren … beisammen. Nebeneinandergestellt:", „Dass die Formel die
  Sekantenbedingung erfüllt, rechnen wir nach" (der Satz folgt direkt), „Offen bleibt,
  was die Schrittweite damit zu tun hat", „Der nächste Unterabschnitt handelt davon …".
- Die Diskussion C² (Satz) gegen C³ (Korollar) bei der Taylorentwicklung auf einen Satz;
  der Verweis auf @korollar:taylorapproximation-fuer-vektor-zu entfällt (das Label in
  Kap. 10 bleibt).
- Der Namensexkurs „Dämpfungsfaktor"; der Folienpunkt „gedämpft wird mit 1 − α" bleibt
  als Reibungs-Satz.
- „dieselbe Abwägung wie bei den Splitting-Verfahren"; die Rückverweis-Klausel „wie
  @bemerkung:von-der-nullstelle-zum-minimum ihn schon einmal aufgeschrieben hat"; der
  Trust-Region-Satz „Für sehr kleines Vertrauen …"; die IWLS-Klammer auf einen Halbsatz.
- Selbsttest Q2: der Satz zu negativ definit/indefinit/singulär (passt nicht zur
  strikt konvexen Frage). Q4: Wiederholung des Beweises.

**S125**
- Absatz „lineares Programm" (ohne Behandlung, ohne Verweise).
- Zweites Lead-in vor dem Lagrange-Widget („Woran erkennen wir am Bild …?").
- „Am Regler des Widgets lassen sich beide Regime durchfahren" (der Kasten folgt).
- „An dieser Spitze der zulässigen Kurve greift der Satz von Lagrange nicht" (Dublette
  zum neuen Einleitungssatz des Absatzes).
- Ridge-Beispiel: Nebenbemerkung „ein größeres Budget kann dieselbe Lösung enthalten,
  ist dann aber inaktiv" und der Rückverweis auf @sec:nichtlineare-gleichungen (wäre
  jetzt zirkulär, weil S121 hierher verweist).
- Q4-Antwort: Schlusssatz „genau deshalb steht die Nichtnull-Voraussetzung im Selbsttest".
- Folienfehler-Bemerkung λ = 0: das Muster „Naheliegend wäre … Das wäre falsch".

**S126**
- Die Widget-Erklärung aus der Einleitung (sie steht im Kasten).
- Absatz „Ein verbreitetes Missverständnis dazu …" (Dublette zum Absatz unter dem
  ersten `optim()`-Block).
- Selbsttestfrage „Auf einer strikt konvexen quadratischen Funktion findet das
  Newton-Verfahren …" (wortgleich mit S124 Q2). Ersetzt durch die Folien-Self-Check-Frage 3,
  siehe §5.
- Lead-ins „Wie wirkt sich das aus? Wir probieren es …" und „Die Methodenwahl aus
  diesem Kapitel, zusammengefasst:".
- Testfunktion: Lagezahlen ±π/3 = ±1,047 und Talsohle ±1,036 (EXTRA-Detail; ±1,04
  mit f ≈ 0,11 stehen in der Bemerkung, ±1,0357 mit f = 0,1085 im Kasten und in der
  Zahlfrage).
- Zusammenfassung auf fünf Einzeiler; Punkt 1 ohne den Fixpunkt-Satz (Vertiefungsstoff
  in S121).

## 4. Reparierte Fehler

- **S124, Zahlfrage-Antwort**: „erst bei κ = 100 dreht sich das Verhältnis" war falsch;
  schon bei κ = 25 gewinnt Momentum (103 gegen 161). Jetzt: „bei schlechterer Kondition
  dreht sich das Verhältnis um, bei κ = 100 auf 121 gegen 608".
- **S124, Q5-Antwort**: „auf $\kappa = 5$ $106$ Schritte" las sich als „κ = 5 106";
  umgestellt.
- **S124, Momentum-Vertiefung**: „für allgemeine glatte, strikt konvexe Funktionen" →
  „stark konvexe"; das Zyklus-Gegenbeispiel und die Nesterov-Schranke betreffen stark
  konvexe Funktionen, so auch die Anhangsfolie. Der zitierte Merksatz mit „strikt"
  bleibt als Zitat.
- **S124, Voraussetzungen des Newton-Schritts**: „Gebraucht wird eine positiv definite
  Hesse-Matrix" im Absatz über Invertierbarkeit → „Invertierbarkeit, bei konvexem f also
  eine positiv definite Hesse-Matrix, ist eine eigene Annahme".
- **S124, BFGS-Eigenschaften**: „bergab … für jeden Gradienten" → „solange der Gradient
  nicht verschwindet".
- **S124, Momentum-Kasten**: Überaussage „Der Nutzen des Schwungs hängt allein an der
  Kondition" gestrichen.
- **S124, Q7**: „welchen Summanden … gezogen wird" → „welcher Summand".
- **S125, Box-Beispiel**: „Die beiden anderen Kandidaten scheitern an denselben
  Bedingungen" (tatsächlich einmal duale Zulässigkeit, einmal Zulässigkeit) → „an den
  KKT-Bedingungen".
- **S126**: „nicht auf `warnings()` verlassen" → „statt sich auf `warnings()` zu verlassen".
- Deslop-Posten: „Bemerkenswert", „wörtlich" (S124 von 2 auf 1), „rutschen",
  „Kippt", „zahlt", „Mittel der Wahl", „Der Preis und der Gewinn" → „Kosten und Gewinn",
  „stehen nicht zur Disposition" → „sind festgelegt", „gutartig", „ein bloß eindeutiges",
  „gilt genau das", „ewig", „gar nicht" (mehrfach), „Die Tafel zeigt, was …". Keine
  Gedankenstriche in den drei Dateien.

## 5. Ermessensentscheidungen und offene Fragen

- **Abweichung vom Plan, S125**: @satz:kkt-und-konvexitaet bleibt im Haupttext, nur
  Beweis und Asymmetrie-Beispiel wandern in die Vertiefung. Der Plan hätte die Aussage
  als Prosa im Haupttext wiederholt und zugleich als Satz in die Box gestellt, das wäre
  eine Dublette gewesen. So entspricht es dem Standardmuster aus Brief §4 („Satz im
  Haupttext, Beweis in der Vertiefung"). Q4 und Q5 bleiben aus dem Haupttext
  beantwortbar. Wenn der Dozent den Satz als EXTRA markiert sehen will, lässt er sich
  mit in die Box schieben (ein Satz Ersatz steht schon darunter).
- **Newton-Zahlenbeispiel (S124) in der Vertiefung**, wie im Plan zur Prüfung markiert.
- **Folienstoff ergänzt**, jeweils kurz und ohne neue Zahlen:
  - Nesterov-Momentum als Alternative mit Gradient am voraussichtlichen Punkt (Folie
    „Heavy-Ball Momentum"). Die einzige Erwähnung stand sonst nur noch in der Vertiefung.
  - Reibung 1 − α statt des Namensexkurses (Folie: „gedämpft wird mit 1 − α").
  - Lernratenplan mit Aufwärmphase und AdamW im Haupttext (Folie „SGD: Grundlage moderner
    AI"). Nur die Robbins-Monro-Bedingungen stehen in der Vertiefung. Der Plan hatte die
    Lernratenpläne ganz in die Box gelegt.
  - Lasso: ‖β‖₁ ist an den Ecken nicht differenzierbar, KKT gilt nur mit Subgradienten,
    Subgradienten- oder Proximal-Verfahren (Folie „Geometrie: Ridge vs. Lasso",
    „Achtung"). Der Verweis zeigt jetzt auf @definition:subgradient-und-subdifferential
    statt auf @sec:konvexitaet/eigenschaften.
  - Name „Brent-Verfahren" bei `optimize()` (Folie).
  - Tabellenzeile „Bisektion, Newton-Raphson | Nullstellen f(x) = 0; Bisektion nur
    univariat" (Folie „Wrap-up"). Die Folie sagt „univariat" für beide; das Skript
    behandelt Newton-Raphson auch multivariat, daher die Einschränkung auf die Bisektion.
  - Folien-Self-Check-Frage 3 (`convergence = 0`) als Selbsttestfrage in S126, anstelle
    der gestrichenen Newton-Dublette.
- **Offen**: Die Folie „SGD: Grundlage moderner AI" nennt Gradient Clipping und
  „Mini-Batch-Rauschen kann helfen, Sattelpunkte und Plateaus zu verlassen". Beides
  steht nirgends in Kapitel 12. Ich habe es nicht ergänzt; soll es als ein Satz in die
  Mini-Batch-Bemerkung?
- **Offen**: S124 Q5 nennt α\* ≈ 0,15, das jetzt nur in der Vertiefung hergeleitet wird
  (der Plan erlaubt es). Die Frage selbst ist aus Kasten und Bemerkung beantwortbar.
- **Nicht nachgerechnet**: In diesem Container gibt es kein `Rscript`. Die
  `optim()`-Aussagen in S126 (welcher Start in welcher Mulde endet) sind inhaltlich
  unverändert übernommen, nur umformuliert. Die neue Selbsttestfrage stützt sich auf
  keine dieser Einzelaussagen.

## 6. Prüfungen (Endstand, alle Dateien)

- `npm run typecheck:mdx`: 206 MDX-Dateien, ohne Fehler (nach jeder Datei und am Ende).
- `node scripts/gen-numbers.mjs --check`: keine `FEHLER`-Zeile, nur die erwartete Meldung
  „Tabelle ist nicht aktuell".
- `npm run test:mdx`: 137/137 Fixtures und der Inventory-Test bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, darunter „12-optim: alle
  Prüfungen bestanden". Die `\cbblue`-FEHLER-Zeile im Log ist die beabsichtigte
  Negativkontrolle des Makro-Checks.
- `npm run lint:numbers`: Exit 0, keine Treffer in S124–S126.
- Fehler aus anderen Dateien sind nicht aufgetreten.
