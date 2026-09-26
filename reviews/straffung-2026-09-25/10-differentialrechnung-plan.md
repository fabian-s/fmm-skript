# Straffungsplan Kapitel 10 „Differentialrechnung" (S101–S109)

Stand 2026-09-25. Grundlage: BRIEF.md (verbindlich), beide Decks
`/home/user/slides-2627/slides/10-ableitungen-I.qmd` und `11-ableitungen-II.qmd`
(vollständig gelesen), alle neun Abschnittsdateien (vollständig gelesen), Klausuren
und Fragenpool unter `/home/user/fmm-lmu/exams/`, Verweis-Grep über `src/` und
`scripts/verify/`. Der alte Bericht `reviews/kuerzung/10-differentialrechnung.md`
ist zu gut zwei Dritteln umgesetzt (Matrix Completion, Logistik, Schwarz-Beweis,
Taylor-Beweise, Backprop-Aufwand, Jacobi-Diagonalbeispiel, Cramér-Rao, Gegenbeispiele
sind schon Vertiefungen; das Selbsttest-Dublettenproblem in S109 ist behoben).

Posten sind über Label-ID (`#…`), Überschrift oder Satzanfang identifiziert, nie
über Zeilennummern. **Reihenfolge je Datei: erst Fehler, dann Straffen, dann
Verlagern, zuletzt Streichen** (Brief §3). Bei Zielkonflikt gilt: lieber einen
Ermessensposten auslassen als Substanz verlieren.

## 0. Ausgangszahlen (`zaehlen.mjs 10-differentialrechnung`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S101 | 2 393 | 278 | 2 671 |
| S102 | 3 282 | 137 | 3 419 |
| S103 | 3 093 | 938 | 4 031 |
| S104 | 2 670 | 1 414 | 4 084 |
| S105 | 2 231 | 699 | 2 930 |
| S106 | 3 606 | 848 | 4 454 |
| S107 | 3 703 | 1 650 | 5 353 |
| S108 | 3 421 | 895 | 4 316 |
| S109 | 2 679 | 670 | 3 349 |
| Summe | 27 078 | 7 529 | 34 607 |

Richtwert Brief: Haupttext −20 bis −30 % (→ 18 950–21 660), Gesamt etwa −5 bis −10 %.
Gedankenstriche: in allen neun Dateien null Treffer, kein Handlungsbedarf.

## 1. Befunde, die für alle Posten gelten

### 1.1 Folienabgleich (was KERN ist)

Deck 10 (gezählt): Vorkenntnisse; Opener-Quiz; Def. Differenzierbarkeit + Tangente;
Quiz (vier Aussagen zu f'); Fréchet-Definition mit Bullets (beschränkt, linear in h,
1D-Beispiel, o-Fehler); Beispiel f(x)=x²; Tabelle der Spezialfälle; Def. Gradient +
Zeilenvektor-Anmerkung; Richtung des stärksten Anstiegs/Tangentialebene (Bild);
Beispiel quadratische Funktion; Übung aᵀx; Übung xᵀAx mit Indexbeweis; Gradient
Descent; Def. Jacobimatrix + Zeilen = Gradienten; vier Identitäten; Übung J(Ax)=A mit
Beweis; Geometrie-Bilder; Skalar zu Matrix (Def., Übung 2×3, drei Identitäten, Beweis
Spur); Matrix zu Skalar (Def., Beispiel aᵀXb, drei Identitäten); Bemerkungen (leere
Fälle/Tensoren, Störungsanalyse h↦f(X+hE), Matrix Cookbook, Funktionenräume);
Wrap-up; Self-Check (drei Fragen). Anhang: Beweis (3)⇔(4), Determinantenbeispiel,
Matrix Completion.

Deck 11 (gezählt): Vorkenntnisse; Opener-Quiz; Stetigkeit aus Differenzierbarkeit
**mit Beweis** (drei Zeilen) + O-Notation; Beispiel |x|; Linearität (Beweis → Übung) +
fünf Formate + Zahlenbeispiel; Produktregel **mit kompaktem Beweis** + vier Bauformen
+ Übung quadratische Form; Kettenregel **mit Beweis** + fünf Bauformen; Anwendung
Kleinste Quadrate (vier Schritte, Normalengleichungen, Ridge → Übung); Backprop;
Übung ∇‖x‖; Def. k-mal differenzierbar; Hesse-Matrix konkret (Herleitung D²);
Def. Hesse + D³-Tensor; Satz von Schwarz (ohne Beweis, drei Bullets); Definitheit
im kritischen Punkt, Konvexität, quadratische Approximation, Eigenvektoren =
Hauptkrümmungen; Praxisrelevanz (vier Bullets); Fisher-Information (Def., Intuition,
Var(θ̂) ≈ I⁻¹, Cramér-Rao); Vektor-zu-Vektor (Score, allgemeine Formel, D¹, D²);
Taylor I (o-Form, lokal vs. global, Beweis → Anhang); exp-Plot; Taylor II; Vektor-zu-
Skalar in drei Ordnungen, beide Schreibweisen; 2D-Bilder + Shiny-App; Newton-Raphson;
Wrap-up; Self-Check (drei Fragen). Anhang: logistische Regression, Taylor-Beweise,
D³-Formeln.

### 1.2 Klausur-Gegenprobe (bleibt im Haupttext)

`exams/questions/diffrechnung/aufgabe1.tex`: (a) Ridge-Lösung β̂ = (XᵀX+λI)⁻¹Xᵀy über
Produktregel/quadratische Form herleiten; (b) Newton-Schritt aus dem Taylorpolynom
2. Ordnung herleiten. `ws2526-klausur-2/r2-to-r1_diff.qmd`: Jacobimatrix von R²→R²,
∇(h∘g) = ∇h·J_g, Hesse-Matrix, Konvexität über Definitheit (det = λ₁λ₂).
`ln1p-taylor_error.qmd`: T₂ und Lagrange-Restglied-Schranke. `gd_vs_newton.qmd`:
Newton sucht kritische Punkte (auch Sattel/Maxima), Ordnung der Verfahren.
Konzeptfragen: Jacobimatrix als beste lineare Approximation mit o(‖h‖)-Rest; Grenzen
der Taylorapproximation (lokal, nicht global); Eigenwerte der Hesse-Matrix
geometrisch; Konditionszahl der Hesse-Matrix und Gradientenabstieg; Newton vs. GD
(quadratische Konvergenz, Kosten der Hesse-Matrix und des LGS); Richtungsableitung.
Folge: **Ridge bleibt Haupttext** (anders als der alte Bericht nahelegt), ebenso
Lagrange-Restglied, κ-Argument, Newton-Vorbehalte.

### 1.3 Abhängigkeiten (Verweise von außerhalb der Datei)

| Label | zitiert aus | braucht |
| --- | --- | --- |
| `beispiel:ridge-regression` | 11-konvexitaet/S113, 12-optim/S121, **12-optim/S125 (nutzt X, y, λ = 1,5 und β̂ = (0,341; 0,578))** | Beispiel samt Zahlenbeispiel bleibt |
| `satz:richtung-des-staerksten-anstiegs` | 12-optim/S121, S109, Widget S102 | Aussage |
| `lemma:die-matrix-der-linearen-naeherung` | S102, S105, S109 | Aussage |
| `satz:erste-und-zweite-ableitung-in` | 11-konvexitaet/S114, S108, S109 | Aussage |
| `bemerkung:wenn-die-hesse-matrix-nichts-entscheidet` | 11-konvexitaet/S114 (x⁴, −x⁴), 12-optim/S122, S108, Widget S107 | x⁴/−x⁴/x³ und Rückrichtung |
| `bemerkung:warum-die-menge-offen-und-konvex-sein` | 11-konvexitaet/S114 | bleibt (schon Vertiefung) |
| Münzwurf-Faustregel in `bemerkung:praxisrelevanz-der-hesse-matrix` | 12-optim/S122 („Münzwurf-Faustregel aus @sec:…/hoehere-ableitungen") | Faustregel mit 2⁻ⁿ, 2¹⁻ⁿ bleibt im Haupttext |
| `bemerkung:ebene-und-quadrik` | 12-optim/S124 („für eine quadratische Funktion ist die Näherung exakt") | Sonderfall-Absatz bleibt |
| `bemerkung:warum-statistik-und-ml-voll-davon-sind` | 12-optim/S124 (IRLS) | bleibt |
| `beispiel:gradient-einer-quadratischen-form` | 12-optim/S124, S108, S109 | Rechnung |
| `bemerkung:zur-identitaet-fuer-x-a`, `bemerkung:die-zeilen-sind-gradienten`, `bemerkung:zeilenvektor-nicht-spaltenvektor`, `bemerkung:das-format-bleibt-erhalten`, `bemerkung:der-ableitungsterm-ist-ein-skalarprodukt`, `bemerkung:gross-o-und-klein-o-fuer-kleine`, `bemerkung:fuenf-spezialfaelle-derselben-aussage`, `bemerkung:beispiele-und-warum-die-schranke-selten` („Punkt 2 mit m = 1"), `bemerkung:die-merkregel-und-ihre-kontraposition`, `beispiel:die-betragsfunktion-am-nullpunkt`, `bemerkung:linearisierung-wie-die-definition-zu-lesen-ist`, `bemerkung:was-hier-eigentlich-linear-ist` | S109-Selbsttest | Labels bleiben, Inhalt darf gestrafft werden |
| Widget-TSX (`ref(...)`): `der-gradient-steht-senkrecht-auf-der`, `richtungsableitung`, `lineare-abbildungen-sind-ihre-eigene`, `wie-stark-die-flaeche-verzerrt-wird`, `quadrieren-in-der-ebene`, `wo-die-kette-aufhoert`, `jacobimatrix-eines-relu-layers`, `wie-die-kette-ausgewertet-wird`, `die-jacobi-formel-an-einem`, `ableitung-von-f-x-a-xb`, `gradienten-der-completion`, `die-betragsfunktion-am-nullpunkt`, `gradient-des-logistischen-verlusts`, `fehler-mal-merkmal`, `drei-vorbehalte` | Widgets | Labels bleiben |

Nur in der eigenen Datei zitiert (dürfen umgebaut oder aufgelöst werden):
`ausblick-andere-ableitungsbegriffe`, `drei-nachtraege-zu-satz-10-2-8`,
`warum-in-gleichung-10-2-4-ein`, `uebung-eine-2-3-matrixfunktion`,
`warum-das-in-der-statistik-gebraucht`, `probe-der-frobenius-identitaet`,
`linearitaet-an-einem-zahlenbeispiel`, `hoehere-ableitungen-wie-die-definition-zu-lesen-ist`,
`was-die-symmetrie-spart`, `gradient-und-hesse-matrix-einer`,
`die-dritte-ableitung-ist-ein-tensor`, `was-der-satz-sagt-und-was-nicht`,
`die-zweite-schreibweise`, `hoeher-ist-nicht-automatisch-besser`,
`taylorapproximation-der`, `warum-hier-die-integralform-steht`,
`fuenf-begriffe-die-bleiben`, `vier-bausteine-die-bleiben`, `die-drei-leeren-felder`,
`stoerungsanalyse-als-richtungsableitung`. Gleichungslabels `eq-eq-10-5-1`
(S105-Beweise), `eq-eq-10-2-1`, `eq-eq-10-3-1`, `eq-richtungsableitung` bleiben.

### 1.4 Prüfscripte

Die neun Scripte `scripts/verify/REV29/10-differentialrechnung-*.mjs` lesen nur
Widget-TSX, keine MDX. Umformulierungen im MDX brechen `verify:numbers` nicht. Die
Lösungszahlen der `zahlfrage`-Blöcke sind dort als Kommentar gepinnt: **keine
Lösungszahl und keine `loesung=`/`toleranz=`-Angabe ändern.**

### 1.5 Abschnittsübergreifende Entscheidungen

- **Die eine Zusammenfassung des Kapitels ist die Tabelle „Das Wichtigste in Kürze" in
  S109.** Die Bemerkungen „Fünf Begriffe, die bleiben" und „Vier Bausteine, die
  bleiben" und der Absatz „Zwei Anordnungen laufen dabei nebeneinander her" fallen weg
  (Gruppe 2). Die Rückblicke „Woran wir anknüpfen" (S105, Gruppe 1) und „Vom
  linearen Blick zum Polynom" (S108, Gruppe 2) werden auf je zwei bis vier Sätze
  gekürzt.
- **Dubletten, und wo sie bleiben:**
  - Kettenregel-Beweis: bleibt als Beweis zu `satz:kettenregel` in S106 (steht so auf
    den Folien). Die Vertiefung „Der Beweis in Koordinaten" in S103 wird gestrichen
    (Gruppe 1).
  - Beweisskizze zum Hesse-Kriterium: bleibt in S107 nach `satz:hesse-kriterium-fuer-kritische-punkte`;
    die Wiederholung in `bemerkung:ebene-und-quadrik` (S108) fällt weg (beides Gruppe 2).
  - „Ohne Symmetrie gilt xᵀ(A+Aᵀ)" mit Gegenbeispiel: bleibt in `bemerkung:drei-nachtraege-zu-satz-10-2-8`
    (S102) und in den Quiz-Antworten; das Zahlenbeispiel (6, 13) vs. (4, 14) in
    `beispiel:gradient-einer-quadratischen-form` (S106) fällt weg (Gruppe 2), es steht
    in der S106-Quizantwort weiter.
  - Eigenwerte 6,162/−0,162 der Sattelfunktion: bleiben in der S102-Quizantwort, im
    S107-Widgetkasten und in der S109-Quizantwort; in `bemerkung:drei-nachtraege-…`
    (S102) nur noch ein Satz ohne Eigenwerte (Gruppe 1).
  - Zeilen- vs. Spaltenkonvention: bleibt in `bemerkung:zeilenvektor-nicht-spaltenvektor`
    und `bemerkung:warum-in-gleichung-10-2-4-ein` (S102) sowie in „Zum Nachschlagen"
    (S109-Vertiefung); der Absatz „Beim Aufschreiben ist auf die Form zu achten" in
    `beispiel:ridge-regression` (S106) fällt weg; `bemerkung:zur-identitaet-fuer-x-a`
    (S103) wird auf zwei Sätze gekürzt.
  - Landau für kleine Argumente vs. Kapitel 2: bleibt in S101 („Was wir mitbringen");
    der Schlusssatz dazu in `bemerkung:gross-o-und-klein-o-fuer-kleine` (S105) fällt weg.
  - Konvergenzrate des Gradientenabstiegs: ρ(α) bleibt im S102-Widgetkasten (die
    zahlfrage α = 0,4 hängt daran); in `bemerkung:praxisrelevanz-der-hesse-matrix`
    (S107) bleibt nur κ = λmax/λmin und der Faktor (κ−1)/(κ+1), die Widget-Zahlen
    3,618/1,382/2,618/0,447 fallen dort weg.
  - Restterm-Demonstrationen „halbiere h, der Rest viertelt sich": bleiben als
    Sekanten-Widget (S101) und in `beispiel:quadrieren-in-der-ebene` (S103, ein Satz);
    die Tabelle in `beispiel:gradient-einer-quadratischen-funktion` (S102) fällt weg.
  - „Die drei leeren Zellen brauchen Tensoren": bleibt im Fahrplan (S102) und in der
    S109-Vertiefung; der Satz dazu am Ende von `bemerkung:fuenf-spezialfaelle-derselben-aussage`
    (S105) und die dritte Erwähnung in S108 („Ab der dritten Ordnung gibt es keine
    Matrixschreibweise mehr") werden auf einen Halbsatz gekürzt.
- **Titel** (nur Titel, nie IDs): Bemerkungstitel mit getippten Nummern verstoßen gegen
  KONVENTIONEN („Wir schreiben nie eine Nummer"): „Drei Nachträge zu Satz 10.2.8" →
  „Drei Nachträge zur quadratischen Form"; „Warum in Gleichung 10.2.4 ein
  Transponiertes steht" → „Warum im Update ein Transponiertes steht". Widget-Titel
  vom Muster „… zum Schieben/Verschieben/Verkleinern", „Der Kompass der …",
  „Unter der Lupe: …" auf das Thema umbenennen (Liste je Datei). Vertiefungstitel mit
  „wirklich", „und warum …" ebenso.
- **Deslop-Treffer** (Grep über die neun Dateien, alles Einzelfälle, keine Cluster):
  „nicht nur … sondern" (S101, S103 ×2, S108), „genau die/der/das/dies" (S101–S109,
  je 1–3), „schlicht/bloß" (S101, S104, S105, S106, S109), „Lehrreich" (S101),
  „kriechen/davonlaufen/Bezahlen" (S102), „Wie das Widget zeigt", „Vorsicht" (S103),
  „bequem", „Tür", „Genau deshalb" (S104), „harmlos", „reißen" ×2 (S106), „billig"
  (S108), „Landkarte" (S101-Titel, S102). Beim Straffen mit erledigen; keine
  gesonderte Runde nötig.
- **Fence-Stufen** wie im Bestand des Kapitels: `:::::vertiefung` > `::::beweis` >
  `:::schritt`; `::::vertiefung` > `:::beispiel`/`:::bemerkung`; `:::::vertiefung` >
  `::::quiz` > `:::frage`. Nach jeder Datei `npm run typecheck:mdx`.
- **Widget-Kästen** (`:::interaktiv`): Auswertungsprosa auf zwei bis vier Sätze, nie
  auf null (PDF-Platzhalter). Eine kurze Beschreibung, was der Kasten zeigt, darf
  bleiben, wenn die Prosa ohne sie im PDF unverständlich wäre.

---

## Gruppe 1: S101–S105

### S101.mdx (Haupttext 2 393 → Ziel ≈ 2 130, also ≈ −11 %)

Schlankster Abschnitt, nur leicht anfassen.

**FEHLER**
- Kasten „Landkarte für Analysis und Optimierung": „am Ende von Kapitel 12 lohnt sich
  ein zweiter Blick" enthält eine getippte Kapitelnummer → Satz streichen (oder
  `@kap:optim`). Titel → „Übersicht: Analysis und Optimierung" (Metapher). Prosa auf
  drei Sätze.

**STRAFFEN**
- „Was wir mitbringen": Absatz „Ableitungen und Differenzierbarkeit kennen wir aus der
  Analysis …" auf zwei bis drei Sätze (neu ist die Fréchet-Ableitung; Leitgedanke
  „Ableitung = lineare Approximation"; ein Halbsatz Fahrplan). Der Landau-Absatz
  bleibt (erste Stelle im Kapitel, S105 verweist darauf), nur „nicht nur … er
  verschwindet *schneller als h*" glätten.
- `bemerkung:wenn-es-keine-eindeutige-tangente-gibt`: die beiden Sätze „Daneben gibt
  es für jedes −1 ≤ m ≤ 1 eine Gerade … Subgradienten bezeichnet." streichen
  (Subgradienten kommen in @kap:konvexitaet; Rest der Bemerkung ist Folienstoff).
- Kasten „Sekante, Tangente und der Restterm": Auswertung auf vier Sätze. Streichen:
  „Lehrreich ist eine Stelle knapp neben dem Knick: … misst etwas anderes als die
  Ableitung." Behalten: relativer Fehler → 0 nach Satz (2); bei x² exakt |h|;
  Betragsfunktion: Sekanten trennen sich; Schlusssatz „Lineare Approximation ist eine
  lokale Aussage."
- „Der allgemeine Ableitungsbegriff": ersten Absatz („Sobald wir Ableitung als lineare
  Approximation lesen …") auf zwei Sätze (drei Zutaten: Verschieben, Länge messen,
  lineare Abbildung; normierter Vektorraum liefert sie).
- Absatz nach `definition:frechet-ableitung`: Satz „Die häufige Kurzschreibweise
  r(h)=o(‖h‖) meint genau … des E-wertigen Restes." streichen (Dublette mit dem Punkt
  *Der Restterm* in der folgenden Bemerkung). D/E-Notation und die zwei Normen bleiben.
- `bemerkung:linearisierung-wie-die-definition-zu-lesen-ist`: alle vier Punkte bleiben
  (alle stehen auf der Folie); *Der Restterm* auf zwei Sätze kürzen.
- `beispiel:frechet-ableitung-von-f-x-x`: „nicht nur klein, sondern exakt |h|" → „exakt
  |h|"; Absatz „Zum Quantor in der Beschränktheit" auf zwei Sätze (Schranke M hängt von
  x ab, Quantor gehört zum h). Rechnung unverändert.

**STREICHEN**
- `bemerkung:ausblick-andere-ableitungsbegriffe` (nur in S101 zitiert; Folie hat einen
  Bullet „Allgemeinere Definitionen: Gateaux-, Hadamard-Ableitungen"). Umgebung
  auflösen, einen Halbsatz in den Absatz „Die folgende Definition geht auf Maurice
  Fréchet zurück …" übernehmen: „…; schwächere Varianten (Gateaux-, Hadamard-Ableitung)
  brauchen wir in diesem Kapitel nicht."

**NICHT ANFASSEN**
- `definition:differenzierbarkeit`, `satz:ableitung-als-lineare-approximation` samt
  Vertiefungsbeweis (Anhangsfolie, schon Vertiefung), `definition:frechet-ableitung`,
  Rechnung in `beispiel:frechet-ableitung-von-f-x-x`, `bemerkung:was-hier-eigentlich-linear-ist`
  (Quizfolie Aussage 1 vs. 2; S105/S109 zitieren), Selbsttest (die ersten vier Fragen
  sind die Quizfolie; Frage 5/6 sind kurz und gut), zahlfrage 0,6, Literaturzeile.

### S102.mdx (Haupttext 3 282 → Ziel ≈ 2 830, also ≈ −14 %)

**FEHLER**
- Titel `bemerkung:drei-nachtraege-zu-satz-10-2-8` → „Drei Nachträge zur quadratischen
  Form"; Titel `bemerkung:warum-in-gleichung-10-2-4-ein` → „Warum im Update ein
  Transponiertes steht". IDs unverändert.

**STRAFFEN**
- Absatz „Dass dieser Zeilenvektor wirklich die Ableitung im Sinne von … ist, zeigt ein
  kurzes Argument." (bis „… es bleibt also keine andere Wahl."): auf zwei Sätze mit
  Verweis: die Formate passen, und `@lemma:die-matrix-der-linearen-naeherung` in
  `@sec:jacobi` zeigt für beliebige Ausgabeformate, dass keine andere lineare Abbildung
  in Frage kommt. (Dasselbe Argument steht dort ausgeführt.)
- `bemerkung:zeilenvektor-nicht-spaltenvektor`: letzten Absatz („Bezahlen müssen wir
  dafür …") auf einen Satz ohne „bezahlen" (Vorgriff auf den Gradientenabstieg reicht
  als Halbsatz; die eigene Bemerkung dazu folgt unten).
- `bemerkung:der-gradient-steht-senkrecht-auf-der`: Halbsatz „diese ist dort nach dem
  Satz über implizite Funktionen eine glatte Kurve oder Fläche," streichen; „das Bild
  einer Landkarte" → ohne Metapherwort („Beide Beobachtungen zusammen: Der Gradient
  steht senkrecht auf der Höhenlinie, zeigt bergauf, und …").
- `beispiel:gradient-einer-quadratischen-funktion`: Schritt 1/2 und die Formatbemerkung
  bleiben (Folie). „Probe an einer Stelle" auf die Rechnung 7,2 gegen 7,26 plus einen
  Satz „Der Restterm h₁²+3h₁h₂+2h₂² ist quadratisch in h und damit o(‖h‖)." kürzen;
  die dreizeilige Tabelle und den Absatz „Halbieren wir h, so viertelt er sich …"
  streichen (Demonstration bleibt im S101-Widget und in S103).
- Kasten „Gradient und Höhenlinie zum Verschieben" → Titel „Gradient und Höhenlinie";
  Beschreibung der zwei Tafeln auf einen Satz, Auswertung auf drei Sätze (Pfeil
  senkrecht auf der Tangente, lang wo Höhenlinien dicht; gilt auch für die
  nichtquadratische Funktion; im Nullpunkt verschwindet der Gradient, Geradenkreuz).
- Kasten „Der Kompass der Richtungen" → Titel „Richtungsableitung im Kompass" (das Wort
  „Kompass" muss bleiben, die zahlfrage sagt „Im Kompass-Widget"). Lead-in „Damit
  bleibt die zweite Behauptung …" auf einen Satz; Auswertung auf drei Sätze.
- `bemerkung:drei-nachtraege-zu-satz-10-2-8`: Punkt 1 (A = I) und Punkt 2 (ohne
  Symmetrie, Gegenbeispiel mit (1,1) gegen (0,2)) bleiben. Punkt 3 auf zwei Sätze:
  das Beispiel ist der Sonderfall A = (1 3/2; 3/2 2); im Nullpunkt liegt kein Minimum,
  sondern ein Sattel (im Widget oben kreuzen sich dort die Geraden zum Niveau 0), was
  `@sec:hoehere-ableitungen` mit der Hesse-Matrix klärt. Determinante, Eigenwerte
  3 ± √10 und die Erklärung der Eigenrichtungen fallen hier weg (die Quizantwort zu
  „Verschwindet der Gradient …" nennt die Eigenwerte selbst und bleibt beantwortbar).
- „Anwendung: Gradientenabstieg": Einleitung und der Absatz nach dem Algorithmus
  bleiben (Folie), je um einen Satz kürzen.
- Kasten „Gradientenabstieg auf einer konvexen quadratischen Funktion": Auswertung auf
  vier Sätze: ρ(α) = maxᵢ|1−αλᵢ| entscheidet (Formel bleibt, die zahlfrage 0,4 hängt
  daran); beste Wahl, wenn beide Eigenrichtungen gleich schnell schrumpfen; Grenzfall
  α = 2/λmax; ein Halbsatz Vorgriff auf `@sec:hoehere-ableitungen`/`@kap:optim`.
  Streichen: „Zu kleine Lernraten kriechen, zu große lassen die Iterierten
  davonlaufen" (Metaphern) und den Schlussteil „Für die Funktion aus … gäbe es dagegen
  gar kein brauchbares α …" (steht schon im Lead-in „an deren Sattel scheitert ein
  Abstiegsverfahren").

**VERLAGERN** – nichts (der Beweis zur Anstiegsrichtung ist schon Vertiefung).

**STREICHEN** – nur die oben genannte Tabelle.

**NICHT ANFASSEN**
- Fahrplan-Tabelle und ihre fünf Erläuterungspunkte (Folie „Wichtige Spezialfälle";
  der Tensor-Punkt ist die Folie „Bemerkungen"), `definition:gradient`,
  `eq-eq-10-2-1`, `definition:richtungsableitung` (Klausur-Konzeptfragen),
  `satz:richtung-des-staerksten-anstiegs` (S121 zitiert), `beispiel:gradient-einer-linearen-funktion`
  mit details-Lösung, `satz:gradient-der-quadratischen-form` **samt Beweis im
  Haupttext** (der Indexbeweis steht auf der Folie), `algorithmus:gradient-gradientenabstieg`,
  Selbsttest (deckt Self-Check F1/F2 des Decks ab), beide zahlfragen.

### S103.mdx (Haupttext 3 093 → Ziel ≈ 2 560, also ≈ −17 %; Vertiefung 938 → ≈ 820)

**FEHLER**
- Backpropagation ist im Haupttext nirgends benannt; der Folien-Satz „Backpropagation
  = effiziente Berechnung dieser Jacobimatrizen-Kette" steht nur in der Vertiefung.
  In `bemerkung:die-gradientenkette-eines-netzes` nach dem Format-Absatz einen Satz
  ergänzen: „*Backpropagation* ist die effiziente Auswertung dieser Kette: von links,
  also von der Ausgabe rückwärts Schicht für Schicht; was das spart, rechnet die
  Vertiefung unten vor." (Ersetzt den gestrichenen Regularisierungsabsatz, siehe unten.)
- Kasten „Linearisierung zum Verkleinern": „Wie das Widget zeigt, schrumpft …" →
  Beobachtung direkt formulieren.

**STRAFFEN**
- Einleitung (Residuum, Netzschicht, Koordinatentransformation): auf einen Absatz von
  vier Sätzen.
- Beweis zu `satz:jacobimatrizen-der-grundbausteine`: Schritte zu (1), (2), (4) auf je
  einen Satz plus why; die Schritte zu (3) bleiben (Folien-Übung).
- `bemerkung:zur-identitaet-fuer-x-a` auf zwei Sätze (Zeile als Spalte lesen, also
  Aᵀx; im Zeilenformat dieselben Zahlen transponiert). Label bleibt (S109 zitiert).
- Absatz „Was die Jacobimatrix geometrisch anstellt": bleibt, einen Satz kürzen.
- Kasten „Linearisierung zum Verkleinern" → Titel „Linearisierung bei schrumpfendem
  Fenster" (die zahlfragen sagen „Im Linearisierungs-Widget", das Wort bleibt).
  Beschreibung (Gitter, Lupe, Farben) auf zwei Sätze, Auswertung auf vier Sätze:
  Rest fällt beim Halbieren schneller als das Fenster; bei „linear" Rest exakt null
  (`@korollar:lineare-abbildungen-sind-ihre-eigene`) und Flächenverhältnis exakt
  |det J|; bei „Quadrieren" nähert sich das Verhältnis erst für kleines h dem Faktor
  (bei h = 0,075 auf drei Stellen); „Wirbel": det J = 1, Fläche bleibt, Gitter verbiegt
  sich trotzdem. Die Zahl 0,3 darf fallen.
- Absatz vor der Vertiefung zum Kettenregelbeweis („Der Beweis führt dieselbe
  Rechnung wie später … kann die folgende Vertiefung überspringen.") → ein Satz: „Der
  Beweis ist derselbe wie für die allgemeine Kettenregel, `@satz:kettenregel` in
  `@sec:produkt-kettenregel`, dort ohne Koordinaten."
- `bemerkung:wo-die-kette-aufhoert`: auf etwa 80 Wörter (Kette endet bei J_{f_{k+1}};
  weiterziehen zählt W_k doppelt; Merkregel). Label bleibt (Widget, Quiz).
- `beispiel:jacobimatrix-eines-relu-layers`: Formel, Diagonalmatrix-Erklärung und das
  2×2-Zahlenbeispiel bleiben. Absatz „Vorsicht an den Schaltstellen:" auf drei Sätze
  ohne „Vorsicht": Knick bei (W z)ᵢ = 0 mit Nichtnullzeile (Beispiel z = (1;1)),
  Nullzeile als Ausnahme, in der Praxis Ableitung null per Verabredung. Streichen: „Bei
  festen von null verschiedenen Zeilen und kontinuierlich verteilten Eingaben …
  exakt getroffen werden."
- Vertiefungstitel „Wie teuer die Kette ist, und warum sie von links ausgewertet wird"
  → „Aufwand der Jacobi-Kette und Backpropagation". Inhalt der Vertiefung bleibt.

**VERLAGERN**
- Beweis zu `lemma:die-matrix-der-linearen-naeherung` (zwei Schritte) in eine neue
  `:::::vertiefung[Warum die Matrix der linearen Näherung die Jacobimatrix ist]`
  direkt unter dem Lemma. Begründung: nicht auf den Folien (die Folie gibt nur
  D f(h) = J h an); die Aussage bleibt im Haupttext, weil S102, S105, S109 und die
  Klausur-Konzeptfrage „beste lineare Approximation" sie brauchen.
- `beispiel:quadrieren-in-der-ebene`: der Teil ab „Der Restterm lässt sich hier
  vollständig ausrechnen." bis „… kostet ein Hundertstel Fehler." wandert in die
  direkt folgende Vertiefung, die zu
  `::::vertiefung[Der exakte Restterm und die Jacobi-Determinante als Flächenfaktor]`
  umbenannt wird (Restterm-Rechnung als Prosa vor `bemerkung:wie-stark-die-flaeche-verzerrt-wird`).
  Im Haupttext bleibt nach J_f(x₀) ein Satz: „Der Restterm ist hier r(h) = f(h), seine
  Länge also exakt ‖h‖²: ein Zehntel Schrittweite kostet ein Hundertstel Fehler."
  Begründung: EXTRA (dritte Restterm-Demonstration, nicht auf den Folien); die
  zahlfrage „Faktor 4" bleibt mit dem Satz beantwortbar.

**STREICHEN**
- `:::::vertiefung[Der Beweis in Koordinaten]` komplett (≈ 350 Wörter). Dasselbe
  Argument in derselben Reihenfolge ist der Beweis zu `@satz:kettenregel` in S106,
  und der steht auf Deck 11. Kein Label, keine Verweise darauf.
- In `bemerkung:die-gradientenkette-eines-netzes` den Absatz „Enthält der
  Gesamtverlust zusätzlich einen direkten Parameterterm, etwa eine Regularisierung …"
  (nicht auf den Folien, wird nirgends gebraucht).

**NICHT ANFASSEN**
- `definition:jacobimatrix`, `eq-eq-10-3-1`, `bemerkung:die-zeilen-sind-gradienten`
  (Folie), Kasten „Welche Gestalt hat die Ableitung?" (kurz, illustriert die
  Folientabelle), Aussage von `satz:jacobimatrizen-der-grundbausteine`,
  `korollar:lineare-abbildungen-sind-ihre-eigene` (Folienbullet), Aussage und Formel
  in `satz:kettenregel-fuer-jacobimatrizen` (Klausur), `eq-die-gradientenkette-eines-netzes`
  (Folie, korrigierte Fassung), `eq-jacobimatrix-eines-relu-layers`, Inhalt der
  Backprop-Vertiefung samt Widget und Quiz, Selbsttest (Frage 1 = Self-Check F3),
  beide zahlfragen.

### S104.mdx (Haupttext 2 670 → Ziel ≈ 2 020, also ≈ −24 %; Vertiefung 1 414 → ≈ 1 730)

**STRAFFEN**
- Einleitung: bleibt, letzten Satz („Der Aufwand liegt im Sortieren …") behalten, den
  Rest um ein Drittel kürzen.
- `bemerkung:das-format-bleibt-erhalten`: „Drei Beobachtungen" → zwei. Punkt *Die
  Ableitung hat dieselbe Gestalt* (Werte vs. Steigungen; n = 1 ist Skalar zu Vektor)
  und Punkt *Warum die Ableitung eine Matrix sein darf* (D_x F(h) = h·D_x F(1)) auf
  zusammen etwa 90 Wörter. Punkt *Der Restterm* (Matrixnorm, Normäquivalenz)
  streichen. Label bleibt (S109 zitiert „Werte vs. Steigungen").
- `beispiel:uebung-eine-2-3-matrixfunktion`: „Ableiten heißt hier schlicht: sechsmal …"
  → „Sechsmal die Schulregeln anwenden und das Ergebnis an derselben Stelle notieren:";
  Satz „An der Stelle x = 2 etwa lauten die Einträge …" streichen.
- Unterüberschrift „Kennzahlen von F ableiten": Absatz auf drei Sätze; der Hinweis
  „Ab hier setzen wir F: R → R^{n×n} voraus" bleibt (Folienfehler-Korrektur).
- Absatz „Hinter dem Beweis steckt ein Prinzip …" auf zwei Sätze (Spur ist linear,
  lineare Abbildungen vertauschen mit dem Ableiten; Determinante und Inverse nicht).
- `bemerkung:warum-das-in-der-statistik-gebraucht`: letzten Satz „Das ist eine der
  meistbenutzten Formeln der Statistik." streichen; Rest bleibt (die log-det-Formel
  begründet die Folienbemerkung „wichtig für Likelihood-Funktionen").
- Lead-in „Stimmen diese drei Formeln wirklich, oder merken wir uns nur Muster?" →
  ein Satz. Kasten „Die drei Identitäten gegen numerische Ableitungen halten":
  Auswertung auf drei Sätze; die Sätze zur Drehmatrix (det = 1 ⇒ Spur 0) und zur Lücke
  bei x = 0 bleiben (Selbsttest verweist auf beides).
- `bemerkung:der-ableitungsterm-ist-ein-skalarprodukt`: Halbsatz „für A = B ergibt es
  das Quadrat der Frobenius-Norm aus …, was `@satz:frobenius-norm-ueber-die-spur` dort
  als … festhält" streichen; „Man nennt es das *Frobenius-Skalarprodukt*." bleibt.
  Rest (Doppelsumme, E_ij) bleibt.
- Kasten „Auslenkung in Richtung einer einzelnen Koordinate": Lead-in „Was sagt ein
  einzelner Eintrag …" auf zwei Sätze, Auswertung auf drei Sätze (Rate; lineare
  Funktionen Rest null; ‖X‖²_F Rest exakt h²). Titel darf bleiben.

**VERLAGERN**
- Neue `::::vertiefung[Woher die drei Identitäten kommen]` direkt nach
  `satz:identitaeten-fuer-matrix-zu-skalar`, bestehend aus (a) dem Absatz „Alle drei
  Formeln lassen sich als Muster lesen. …" bis „… Das ist die Matrixfassung von
  ∂x²/∂x = 2x." und (b) `beispiel:probe-der-frobenius-identitaet` (unverändert).
  Begründung: EXTRA. Deck 10 gibt die drei Identitäten ohne Herleitung; die
  Frobenius-Rechnung ist im Kapitel die dritte von fünf Fassungen desselben Falls
  (Satz (3), Anstups-Widget, Selbsttest, S109-Vertiefung). Die Anstups-Auswertung und
  die zahlfrage 0,16 sind ohne die Vertiefung beantwortbar (h² steht in der Antwort).
  `probe-der-frobenius-identitaet` wird nur aus S104 zitiert (Selbsttest verweist auf
  `@eq:identitaeten-fuer-matrix-zu-skalar-3`, das im Satz bleibt).

**STREICHEN** – nur die oben genannten Einzelsätze.

**NICHT ANFASSEN**
- `definition:ableitung-einer-matrixwertigen-funktion` mit beiden Gleichungen,
  `satz:identitaeten-fuer-skalar-zu-matrix` **samt Spur-Beweis im Haupttext** (Folie
  „Beweis: Ableitung der Spur"), Vertiefung Jacobi-Formel (Anhangsfolie),
  `definition:ableitung-nach-einer-matrix`, `beispiel:ableitung-von-f-x-a-xb`
  (Folie, Widget), `satz:identitaeten-fuer-matrix-zu-skalar`, Vertiefung Matrix
  Completion inklusive Widget und Quiz (Anhangsfolie; S115 verweist auf den Fall),
  Selbsttest, zahlfrage 0,16, Literaturzeile.

### S105.mdx (Haupttext 2 231 → Ziel ≈ 1 900, also ≈ −15 %; Vertiefung 699 → ≈ 400)

**FEHLER**
- Der Beweis zu `satz:stetigkeit-aus-differenzierbarkeit` steht auf Deck 11 (drei
  Zeilen), im Skript aber in einer Vertiefung. Nach Brief §4 gehört er in den
  Haupttext: Vertiefung „Warum Differenzierbarkeit Stetigkeit erzwingt" auflösen und
  den Beweis als `::::beweis` mit drei `:::schritt` direkt unter den Satz stellen, in
  Folienlänge: Schritt 1 = bisheriger Schritt 1 (D f beschränkt, also O(‖h‖));
  Schritt 2 = bisherige Schritte 2 und 3 zusammengelegt (Rest ist o(‖h‖), für kleine h
  unter ‖h‖, also ‖f(x+h) − f(x)‖ ≤ (M+1)‖h‖); Schritt 3 = bisheriger Schritt 4.
  Whys kürzen. Den Absatz „Üblicherweise fasst man die beiden Zusatzterme …" bis
  „… bricht der Beweis zusammen." streichen; die Beobachtung, dass nur die
  Beschränktheit gebraucht wird, in das why von Schritt 1 (ein Halbsatz). Netto
  +≈ 120 Wörter Haupttext, −≈ 300 Vertiefung. Muster für Beweis im Haupttext:
  S102 (`satz:gradient-der-quadratischen-form`).

**STRAFFEN**
- „Woran wir anknüpfen" (≈ 360 Wörter) auf ≈ 120: ein Satz Übergang („Ab hier geht es
  um das Rechnen mit der Ableitung"), dann „Ausgangspunkt für jeden Beweis dieses
  Abschnitts ist die Fréchet-Ableitung (`@definition:frechet-ableitung`):" mit der
  Gleichung `{#eq-eq-10-5-1}` unverändert, danach der Fahrplan-Absatz („Dieser
  Abschnitt klärt zwei allgemeine Eigenschaften …", zwei Sätze). Streichen: die
  D/E-Erwartungswert-Notiz (steht in S101), den Absatz „Die drei konkreten Gestalten
  …" und den Vorkenntnis-Absatz „Aus der Analysis setzen wir …" (Folie „Verwendete
  Vorkenntnisse" ist ein Vorlesungs-Recap; im Skript liegt S104 direkt davor).
- `bemerkung:gross-o-und-klein-o-fuer-kleine`: letzten Satz „Die Landau-Symbole kennen
  wir aus `@sec:algos/landau` …" streichen (steht in S101). Rest bleibt (Folie).
- `beispiel:die-betragsfunktion-am-nullpunkt`: bleibt (Folie), „sie sind bloß
  verschieden" → „nur".
- `bemerkung:die-merkregel-und-ihre-kontraposition`: die beiden Schlusssätze „Beides
  begegnet uns wieder, sobald wir … Jede Ableitungsstufe kostet eine Stufe Glattheit."
  streichen.
- Kursiv-Bildunterschrift nach `<MerkregelDiagramm />` auf zwei Sätze (grün liegt in
  blau = Satz; Ring = Betragsfunktion, außen = Sprungfunktion). Farbcode-Sätze
  streichen.
- Lead-in vor dem Lupen-Kasten: „Ein zweiter Blick auf denselben Sachverhalt lohnt
  sich, und er ist der anschaulichere." streichen; Rest auf zwei Sätze (unter der Lupe
  muss der Graph wie eine Gerade aussehen; bei welcher Funktion passiert das?). Kasten
  „Unter der Lupe: lokal linear oder nicht" → Titel „Lokale Linearität unter der Lupe"
  (Wort „Lupe" bleibt, die zahlfrage sagt „Im Lupen-Widget"); Auswertung auf drei
  Sätze (nur eine Funktion wird gerade; die anderen zeigen zwei Bauformen von
  Nichtdifferenzierbarkeit; x₀ weg von 0 macht auch den Betrag lokal linear).
- `bemerkung:fuenf-spezialfaelle-derselben-aussage`: Einleitung auf einen Satz; die
  fünf Formeln unverändert; Schlussabsatz auf zwei Sätze (eintragsweise Linearität;
  Gewinn: der Satz gilt in jedem normierten Raum). Satz zu den drei leeren Zellen
  streichen.
- `beispiel:linearitaet-an-einem-zahlenbeispiel`: Rechnung bleibt (Folie);
  Schlussabsatz nach dem ✓ („Bei diesem kleinen Beispiel sind beide Wege …") auf einen
  Satz.
- Vertiefungstitel „Warum die Ableitungsoperation linear ist" bleibt.

**VERLAGERN** – nichts Neues (Linearitätsbeweis ist zu Recht Vertiefung: Folie sagt
„Beweis → Übung").

**STREICHEN** – nur die genannten Sätze; keine Umgebung.

**NICHT ANFASSEN**
- `eq-eq-10-5-1` (Label und Formel; alle Beweise des Abschnitts zitieren sie),
  Aussage von `satz:stetigkeit-aus-differenzierbarkeit`, `satz:linearitaet-der-ableitungsoperation`
  samt Vertiefungsbeweis, die fünf Formeln, das Zahlenbeispiel (4, −10), Selbsttest
  (Frage 3 zu den einseitigen Grenzwerten und Frage 5 zu O/o sind gut), zahlfrage 1,
  `<MerkregelDiagramm />` und `<ZoomSchaetzung />`.

---

## Gruppe 2: S106–S109

### S106.mdx (Haupttext 3 606 → Ziel ≈ 2 810, also ≈ −22 %; Vertiefung 848 unverändert)

**FEHLER** – keine Fachfehler gefunden (Ridge-Zahlen, Spur-Produktregel-Zahl 4,2997,
Logistik-Gradienten und Norm-Gradienten nachgerechnet).

**STRAFFEN**
- „Warum zwei Regeln fehlen": auf einen Absatz von etwa 70 Wörtern (Linearität reicht
  nicht; Quadratsumme, Log-Likelihood, Netz als Produkt/Verkettung; bei der
  Produktregel ist erst „Produkt" zu klären).
- `bemerkung:beispiele-und-warum-die-schranke-selten` → Titel „Vier Multiplikationen
  und ihre Schranke". Die vier Punkte bleiben, je einen Satz; Schlussabsatz auf zwei
  Sätze (endlichdimensional automatisch beschränkt; der Beweis braucht die Schranke
  für den Kreuzterm). Label bleibt (Quiz hier und in S109 zitieren „Punkt 2").
- Beweis zu `satz:produktregel` (steht auf der Folie, bleibt im Haupttext): Schritt 3
  (Kreuzterm ≤ K M_f M_g ‖h‖²) und Schritt 5 (Ordnung ‖h‖² ist o(‖h‖)) zu einem
  Schritt zusammenlegen; Schritt 4 auf die Abschätzung plus einen Satz; Schritt 6 auf
  zwei Sätze. Mathematik unverändert, Ziel ≈ 300 statt ≈ 450 Wörter.
- `beispiel:die-produktregel-in-vier-bauformen`: die vier Bauformen bleiben; die
  Formatnotiz zur Spur bleibt; den Zahlencheck „Zur Kontrolle rechnen wir den Fall
  einmal mit Zahlen nach. … 4,2997." streichen (nirgends gebraucht; der S109-Selbsttest
  nutzt ein anderes F).
- `beispiel:gradient-einer-quadratischen-form`: Rechnung bleibt (Folienübung; S108,
  S109, S124 zitieren). Absatz „Die Unterscheidung hat Folgen. Für A = (2 1; 0 3) …
  (8, 14)." streichen (die Zahlen stehen in der S106-Quizantwort „Für jede Matrix A …"
  weiter). Schlussabsatz „In `@sec:gradient` haben wir denselben Gradienten …" auf
  einen Satz.
- `beispiel:ridge-regression` (Klausurstoff, bleibt Haupttext): Herleitung, Gleichung
  `{#eq-ridge-regression}`, Normalengleichungen-Satz und Zahlenbeispiel bleiben. Absatz
  „Der Zuschlag ist der eigentliche Gewinn …" auf zwei Sätze (für λ > 0 positiv
  definit und invertierbar, also eindeutig lösbar; ohne Strafterm bei Rangdefizit
  Lösungen, aber nicht eindeutig). Absatz „Beim Aufschreiben ist auf die Form zu
  achten …" streichen (Zeilenkonvention ist in S102 zweimal erklärt).
- Beweis zu `satz:kettenregel` (Folie, bleibt): Schritt 5 auf zwei Sätze; im Übrigen
  unverändert (Schritt 4 ist die Folien-Fußnote zu Zeile 2).
- `beispiel:die-kettenregel-in-fuenf-bauformen`: die fünf Formeln bleiben. Nach
  Bauform 2 den Kommentar „Ein Skalar mal ein Zeilenvektor. Solange … gleichgültig wie
  steil f dort ist." streichen; nach Bauform 3 der Satz mit `@satz:kettenregel-fuer-jacobimatrizen`
  bleibt; nach Bauform 5 den Kommentar auf einen Satz (Frobenius-Skalarprodukt aus
  `@sec:matrixableitungen`, eingesetzt wird H = ∂F/∂x).
- Kettenregel-Widget: Lead-in „Zwei der drei Voreinstellungen sind harmlos …" auf zwei
  Sätze ohne „harmlos"; Kasten → Titel „Die Kettenregel im Eindimensionalen"; die
  Erklärung, warum ein Produkt entsteht, auf zwei Sätze; Auswertung auf drei Sätze
  (bei √(x²) ist das Produkt das Vorzeichen von x; bei x = 0 ist die Voraussetzung
  verletzt, der numerische Differenzenquotient mittelt über den Knick; Verweis auf
  `@beispiel:gradient-der-euklidischen-norm`). Insgesamt ≈ 130 statt ≈ 280 Wörter.
- „Übung: Gradient der euklidischen Norm": Lead-in bleibt (zwei Sätze); im Beispiel den
  Absatz „*Der Vorbehalt.*" auf etwa 70 Wörter (nur x ≠ 0; im Nullpunkt gibt es keine
  Fréchet-Ableitung, denn h = t d und t → 0± lieferte L(d) = ±‖d‖; für n = 1 ist es der
  Knick des Betrags).
- In der Vertiefung zur logistischen Regression nur: Kastentitel „Der Gradient am
  Regler: eine Beobachtung, ein Merkmal" → „Der logistische Gradient an einer
  Beobachtung"; „reißen" (zweimal) durch „verschieben" ersetzen. Sonst unverändert
  (Anhangsfolie, schon Vertiefung).

**VERLAGERN** – nichts (Logistik ist schon Vertiefung; Ridge bleibt wegen Klausur und
S113/S121/S125 im Haupttext).

**STREICHEN** – nur die genannten Absätze; keine Umgebung.

**NICHT ANFASSEN**
- `definition:beschraenkte-bilineare-abbildung`, Aussage von `satz:produktregel`,
  alle Formeln der vier und fünf Bauformen, `satz:kettenregel` mit Formel,
  **die Zahlen in `beispiel:ridge-regression`** (X, y, λ = 1,5, Gradient (−0,7; −3,6),
  β̂ = (0,341; 0,578), (0,667; 0,500), Längen 0,833/0,671: 12-optim/S125 rechnet damit
  weiter), `eq-gradient-des-logistischen-verlusts(-2)`, Rechnung in
  `beispiel:gradient-der-euklidischen-norm`, Selbsttest (Frage 2 = Self-Check F1 des
  Decks), zahlfragen 0,693147 und 32,768.

### S107.mdx (Haupttext 3 703 → Ziel ≈ 2 650, also ≈ −28 %; Vertiefung 1 650 → ≈ 1 850)

**FEHLER**
- Die Folienaussage „Var(θ̂_ML) ≈ I(θ)⁻¹ für großes n; der MLE erreicht asymptotisch
  die Cramér-Rao-Schranke" fehlt im Haupttext (steht nur in der Vertiefung „Was die
  Merkregel … wirklich sagt"). Nach dem Interpretationsabsatz („Die Interpretation
  folgt aus der Krümmung …") einen Satz ergänzen: „Für den ML-Schätzer gilt unter
  Regularitätsbedingungen für großes n näherungsweise var(θ̂) ≈ I_n(θ)⁻¹; er erreicht
  damit asymptotisch die Cramér-Rao-Schranke: mehr Information, kleinere Varianz."
  (Inhalt aus der Vertiefung, dort bleibt die genaue Fassung.)
- Vertiefungstitel „Was die Merkregel zur Varianz des ML-Schätzers wirklich sagt" →
  „Die Varianz des ML-Schätzers und die Cramér-Rao-Schranke".

**STRAFFEN**
- „Wo die erste Ableitung aufhört": ersten Absatz behalten (kritischer Punkt, lineare
  Näherung konstant), den Ankündigungsabsatz „Der Ausweg ist derselbe wie in der
  Schule … führt sie direkt zur Fisher-Information." auf einen Satz („Wir leiten noch
  einmal ab.").
- `bemerkung:hoehere-ableitungen-wie-die-definition-zu-lesen-ist`: „Sechs
  Beobachtungen" → „Drei Beobachtungen". Im Haupttext bleiben: *Für j = 1 steht dort die
  alte Definition* (Folie), *Was hier wonach abgeleitet wird* mit dem Merksatz „Die
  j-te Ableitung ist die lineare Näherung an die Änderung der (j−1)-ten" (Folie), und
  *Die Objekte werden größer* (Folie: Tensoren, Stufe wächst) plus der eine Satz
  „Multilinear heißt: linear in jedem Argument". Siehe VERLAGERN für den Rest.
- Absatz nach `definition:hesse-matrix` („Bloße Differenzierbarkeit reicht hier nicht
  …") bleibt; „Unter dieser Bedingung ist die Hesse-Matrix symmetrisch … Wir stellen
  sie den Formeln … voran" auf einen Satz.
- Vertiefungstitel „Der Beweis: zweimal Mittelwertsatz an derselben doppelten
  Differenz" → „Beweis des Satzes von Schwarz".
- `bemerkung:was-die-symmetrie-spart`: erste beiden Absätze bleiben (Folienbullets;
  die Zahlen 5050, 500 500, 0,75, 0,5005 zitiert der Selbsttest). Dritten Absatz auf
  zwei Sätze: Symmetrie zahlt sich beim Rechnen und beim Lösen aus (bei positiver
  Definitheit Cholesky, `@sec:lgs/cholesky`); für symmetrische Matrizen gilt der
  Spektralsatz, darauf beruht alles Weitere. Den Einschub „Symmetrie allein reicht
  dafür nicht, denn `@satz:cholesky-zerlegung` verlangt …" streichen.
- `satz:erste-und-zweite-ableitung-in`: Deck 11 skizziert die Herleitung („Konkret:
  Hesse-Matrix (k = 2)"). Unter dem Satz drei Sätze Skizze in den Haupttext, aus
  Schritt 2/3 des Vertiefungsbeweises kondensiert: Die Definition fragt, wie sich ∇f
  ändert; weil jede Komponente des Gradienten differenzierbar ist, gilt
  ∇f(x+h) − ∇f(x) = hᵀH_f(x) + o(‖h‖); eingesetzt in `@eq:k-mal-frechet-differenzierbar`
  mit j = 2 ergibt das D²f(h₁,h) = hᵀH_f(x)h₁, nach Schwarz gleich h₁ᵀH_f(x)h. Der
  vollständige Beweis bleibt in der Vertiefung; deren Titel „Warum Gradient und
  Hesse-Matrix die ersten beiden Ableitungen darstellen" → „Beweis der
  Koordinatenformeln für die ersten beiden Ableitungen".
- `beispiel:gradient-und-hesse-matrix-einer`: bleibt (das Newton-Widget in S108 nutzt
  diese Funktion; Klausur verlangt Hesse-Rechnungen); Prosa um zwei Sätze kürzen, die
  beiden Differenzen −0,0373 und +0,0400 bleiben.
- `bemerkung:die-dritte-ableitung-ist-ein-tensor`: Formel bleibt (Folie); danach zwei
  Sätze (Tensor dritter Stufe, `@sec:tensoren/tensoren`; für f ∈ C³ symmetrisch).
  Absatz „Zur Notation: …" und den Speicherbedarf-Satz („eine Milliarde Zahlen")
  streichen.
- Beweisskizze nach `satz:hesse-kriterium-fuer-kritische-punkte` („Den Beweis liefert
  die Taylorentwicklung …"): bleibt, ist die kanonische Stelle (S108 wiederholt sie
  nicht mehr); um einen Satz kürzen.
- `bemerkung:wenn-die-hesse-matrix-nichts-entscheidet`: Satz „Ein Eigenwert null allein
  reicht dafür übrigens nicht; kommt ein gemischtes Vorzeichenmuster hinzu, etwa bei
  diag(1, −1, 0) …" streichen. x⁴/−x⁴/x³ und der Absatz zur Rückrichtung bleiben (S114,
  S122, S108 und das Widget hängen daran).
- Lead-in „Als Beispiel dient die Funktion x₁² + 4x₂² …" auf drei Sätze (H = R diag R ᵀ
  nach dem Spektralsatz; wir stellen Eigenwerte und Lage der Eigenbasis ein; f = ½xᵀHx
  hat überall dieselbe Hesse-Matrix, 0 ist kritischer Punkt). Kasten „Hesse-Kriterium
  zum Schieben" → Titel „Hesse-Kriterium und Höhenlinien"; die drei Leitfragen auf
  eine; Auswertung auf fünf Sätze (≈ 120 Wörter): erster Knopf ist x₁² + 4x₂²;
  Ellipsen ⇔ definit; Hauptachsen = Eigenvektoren, Krümmung längs einer Hauptachse =
  Eigenwert (f(t vᵢ) = ½λᵢt²), lange Halbachse zum kleinen Eigenwert; φ dreht, lässt
  Eigenwerte unverändert; ein Eigenwert unter null → Hyperbeln, Geradenkreuz, Sattel,
  dieselbe Situation wie im Gradientenfeld-Widget von `@sec:gradient` (Eigenwerte
  6,162 und −0,162 dürfen als Halbsatz bleiben).
- Konvexität: Satz und der Absatz danach bleiben (Folie); Vertiefungstitel „Zwei
  Gegenbeispiele zu den Voraussetzungen offen und konvex" bleibt.
- `bemerkung:praxisrelevanz-der-hesse-matrix` (Folie mit vier Bullets, bleibt): Absatz
  *Münzwurf* auf ≈ 90 Wörter (alle n Vorzeichen gleich; unabhängige Münzwürfe: 2⁻ⁿ und
  2¹⁻ⁿ, für n = 100 also 7,9·10⁻³¹ und 1,6·10⁻³⁰; Eigenwerte sind nicht unabhängig,
  Faustregel; Sattelpunkte in hoher Dimension deshalb häufig). Die SGD-Sätze „Auch das
  Rauschen … folgt aus der Münzwurfrechnung nicht." streichen (die Quizantwort sagt
  es). *Statistik* auf zwei Sätze. *Maschinelles Lernen* auf ≈ 70 Wörter: Hesse-Matrix
  bestimmt die Kondition; Konvergenzrate des Gradientenabstiegs hängt an
  κ = λmax/λmin, bei optimaler Lernrate Faktor (κ−1)/(κ+1) je Schritt; bei κ = 1000
  also 0,998. Die Widget-Zahlen 3,618/1,382/2,618/0,447 und den Satz „Für eine
  allgemeine Verlustfunktion … μI ⪯ H ⪯ LI" streichen. *Optimierung* bleibt.
- Fisher-Information: den Satz „Unter denselben Regularitätsbedingungen ist die
  erwartete Score-Funktion null und es gilt außerdem I(θ) = E[∇ℓᵀ∇ℓ]." streichen
  (nicht auf der Folie, nirgends gebraucht). Interpretationsabsatz um einen Satz
  kürzen.
- „Vektor zu Vektor": Einleitungsabsatz auf ≈ 60 Wörter (Score-Funktion ∇ℓᵀ ist von
  dieser Bauart, Jacobimatrix = Hesse-Matrix, daraus Fisher-Information;
  Momentengleichungen; Transponiertes wegen Zeilenkonvention). Die allgemeine Formel
  und der Satz bleiben (Folie). Schlussabsatz „Wie groß werden diese Objekte? …" auf
  einen Satz (zweite Ableitungen werden praktisch nur für skalarwertige Funktionen
  aufgestellt); die Zahlen 50/500/5000/275 streichen. Vertiefungstitel „Warum die
  höheren Ableitungen dieselbe Indexrechnung ausdrücken" → „Herleitung der drei
  Stufen".
- Selbsttest: Antwort zur Münzwurf-Frage auf ≈ 70 Wörter (sie wiederholt die
  Bemerkung fast vollständig). Übrige Fragen unverändert.

**VERLAGERN**
- Aus `bemerkung:hoehere-ableitungen-wie-die-definition-zu-lesen-ist` die Punkte
  *Warum eine Umgebung vorkommt*, *Warum die Operatornorm* und die
  Beschränktheits-Ungleichung aus *Multilinear und beschränkt* in eine neue
  `:::::vertiefung[Feinheiten der Definition: Umgebung, Operatornorm und Beschränktheit]`
  direkt hinter der Bemerkung (als Prosa, keine neue Umgebung mit Label). Begründung:
  EXTRA; die Folie hat eine kompaktere Definition ohne Operatornorm; im Haupttext
  wird die Operatornorm nirgends gebraucht (nur im Taylor-II-Beweis, der Vertiefung
  ist). Die Definition selbst bleibt unverändert (Mathe nicht anfassen).

**STREICHEN** – nur die genannten Sätze; keine Umgebung.

**NICHT ANFASSEN**
- `definition:k-mal-frechet-differenzierbar` mit `eq-k-mal-frechet-differenzierbar`
  (S108-Beweis nutzt die Operatornorm), `definition:hesse-matrix`, Aussage
  `satz:satz-von-schwarz` und sein Vertiefungsbeweis, Aussage
  `satz:erste-und-zweite-ableitung-in` (S114 zitiert), Zahlen in
  `bemerkung:was-die-symmetrie-spart`, `satz:hesse-kriterium-fuer-kritische-punkte`,
  x⁴/−x⁴/x³ in `bemerkung:wenn-die-hesse-matrix-nichts-entscheidet`,
  `satz:konvexitaet-und-positive-semidefinitheit`, Vertiefung Gegenbeispiele (S114
  zitiert), Münzwurf-Zahlen (S122 zitiert), `definition:fisher-informationsmatrix`,
  Vertiefungen Bernoulli und Cramér-Rao (nur Titel), `satz:die-ersten-drei-stufen-fuer-vektor-zu`
  mit Formel, Selbsttest-Fragen, zahlfrage 0, Literaturzeile.

### S108.mdx (Haupttext 3 421 → Ziel ≈ 2 530, also ≈ −26 %; Vertiefung 895 → ≈ 960)

**FEHLER**
- `bemerkung:hoeher-ist-nicht-automatisch-besser`: kaputter Satz „Bei x = 0,5 fallen die
  Fehler der Ordnungen k = 2, 4, 8, 16 sind 5,0·10⁻², 1,3·10⁻², 7,8·10⁻⁴ und 3,1·10⁻⁶
  ab." → „Bei x = 0,5 fallen die Fehler der Ordnungen k = 2, 4, 8, 16 von 5,0·10⁻² über
  1,3·10⁻² und 7,8·10⁻⁴ auf 3,1·10⁻⁶." (Zahlen unverändert.)
- Einleitung: „wir kommen in `@bemerkung:warum-statistik-und-ml-voll-davon-sind`
  darauf zurück" zeigt auf die Newton-Bemerkung, die Asymptotik steht aber in der
  Vertiefung danach. Verweis streichen (die Einleitung wird ohnehin gekürzt).
- Selbsttest-Frage „Der Beweis von `@satz:taylorentwicklung-ii` überträgt die
  eindimensionale Aussage einfach auf jede Gerade …" fragt Vertiefungsstoff ab. Sie
  wandert als `::::quiz` mit dieser einen `:::frage{falsch}` ans Ende der Vertiefung
  „Der Beweis: von der Verbindungsstrecke zum Integralrestglied", hinter
  `bemerkung:warum-hier-die-integralform-steht` (Muster: `::::quiz` in
  `:::::vertiefung` wie in S107). Antworttext unverändert.

**STRAFFEN**
- „Vom linearen Blick zum Polynom" (≈ 250 Wörter) auf ≈ 100: ein Satz Anschluss
  (lineare Näherung ist die erste Stufe, mit den höheren Ableitungen aus
  `@sec:hoehere-ableitungen` folgen quadratische, kubische …); zwei Verwendungen in
  zwei Sätzen (Rechnen mit dem Polynom statt mit f, etwa im Newton-Schritt; Werkzeug
  der Konvergenz- und Asymptotikanalyse, etwa asymptotische Normalität des
  ML-Schätzers, Folienbullet). Den Farbcode-Absatz auf einen Halbsatz („Farben wie
  bisher, Näherung T_k grün") oder ganz streichen.
- „Der eindimensionale Fall": die beiden Absätze nach `definition:taylorpolynom` („Wir
  lesen T_k als Funktion des Zuwachses …" und „Die Anschmiegebedingung steckt bereits
  …") zusammen auf ≈ 80 Wörter.
- Vertiefungstitel „Der Beweis: zwei Hilfsfunktionen, eine Teleskopsumme, der
  Cauchy-Mittelwertsatz" → „Beweis der eindimensionalen Taylorentwicklung".
- `bemerkung:was-der-satz-sagt-und-was-nicht` auf ≈ 140 Wörter: *Zwei Restglieder*
  (Lagrange liefert Schranken, Klausurstoff; o-Fassung ist die Arbeitsform, sie
  überträgt sich) auf drei Sätze; *Warum |h|^k und nicht |h|^{k+1}* auf zwei Sätze;
  *Der Grenzfall k = 1* auf zwei Sätze.
- `bemerkung:die-zweite-schreibweise` auf ≈ 60 Wörter (Formel bleibt; ein Satz, wann
  welche Fassung).
- `beispiel:taylorapproximation-der`: Ableitungen, Polynome und die Fehlertabelle
  bleiben (Folienbeispiel). Den Absatz „Jede Ordnung drückt den Fehler also auf etwa
  ein Sechstel bis ein Achtel. … zwischen 0 und 0,5." auf zwei Sätze (Restglied
  e^ξ·0,5^{k+1}/(k+1)!, beim Übergang von k auf k+1 etwa Faktor 0,5/(k+2)); die
  Auflösung nach ξ = 0,1738 streichen.
- Kasten „Drei Ordnungen an einem Regler" → Titel „Taylorpolynome der Ordnungen 1 bis
  3"; Lead-in auf einen Satz; Auswertung auf vier Sätze (nahe am Entwicklungspunkt
  Gewinn je Ordnung; links kehrt es sich um, e^x → 0 gegen Polynom → ±∞, bei x = −3
  wächst der Fehler von T₀ zu T₁ von 0,950 auf 2,050; Faustwert |x|/(k+1); das ist
  `@bemerkung:hoeher-ist-nicht-automatisch-besser` in Zahlen).
- „Der allgemeine Fall": Einleitungsabsatz auf zwei Sätze. Vertiefungstitel „Der
  Beweis: von der Verbindungsstrecke zum Integralrestglied" → „Beweis der allgemeinen
  Taylorentwicklung".
- Nach `korollar:taylorapproximation-fuer-vektor-zu`: die beiden Absätze („Dass hier
  Gradient und Hesse-Matrix auftauchen …", „Die Formate gehen auf …") zusammen auf
  ≈ 70 Wörter; den Tensor-Hinweis auf einen Halbsatz („die dritte Ordnung ist ein
  Tensor, `@sec:tensoren/tensoren`, deshalb die Summe"); „Praktisch verwendet werden
  fast nur die ersten beiden Zeilen." bleibt.
- `bemerkung:ebene-und-quadrik` (S109 und S124 zitieren; Folie „quadratische
  Approximation, Krümmung, Hauptkrümmungsrichtungen") auf ≈ 110 Wörter: T₁ ist die
  Tangentialebene mit Höhenlinien senkrecht zum Gradienten (`@sec:gradient`); T₂ ist
  eine Quadrik, ihre Höhenlinien zeigen die Definitheit (Ellipsen/Hyperbeln), das ist
  der Anschluss an `@satz:hesse-kriterium-fuer-kritische-punkte`; **Sonderfall
  Polynom zweiten Grades: T₂ = f exakt, darauf beruht das Newton-Verfahren (bleibt
  wörtlich, S124 zitiert genau das).** Streichen: die Passage über Niveaumengen von T₁
  im kritischen Punkt („Seine Niveaumenge zum konstanten Wert ist dann der ganze
  Definitionsraum …") und die Wiederholung der Hesse-Kriterium-Beweisskizze („Die
  zweite Zeile von … ist das Werkzeug, das der Beweis dieses Satzes braucht …", bleibt
  in S107).
- Lead-in vor dem 2D-Kasten auf zwei Sätze; Kasten „Tangentialebene und Quadrik im
  Höhenlinienbild": Beschreibung auf zwei Sätze (Shiny-Link bleibt), Auswertung auf
  vier Sätze (Geraden vs. gekrümmte Höhenlinien; Faustzahlen 4 und 8 setzen einen
  nicht verschwindenden führenden Restterm voraus; auf der Quadrik fällt der T₂-Fehler
  auf Rundungsniveau, das ist der eine exakte Newton-Schritt).
- Newton-Herleitung: bleibt (Klausur), den Satz „Den Gradienten dieser Funktion kennen
  wir aus … ist." um die Hälfte kürzen (Produktregel-Verweis und Schwarz reichen als
  Halbsätze).
- `bemerkung:drei-vorbehalte` (Klausur: Newton sucht kritische Punkte; Kosten der
  Hesse-Matrix und des LGS) auf ≈ 170 Wörter: jeder der drei Punkte zwei bis drei
  Sätze; die Cholesky-Bemerkung bleibt als Halbsatz.
- `bemerkung:warum-statistik-und-ml-voll-davon-sind` (Titel „Newton in Statistik und
  ML") bleibt wie sie ist (Folie; S124 zitiert IRLS).
- Kasten „Newton Schritt für Schritt": Lead-in „Wie schnell ist ‚quadratisch
  konvergent' in Zahlen? …" auf einen Satz; Beschreibung (Tafel, Tabelle, Regler,
  drei Versuche) auf drei Sätze; Auswertung auf vier Sätze (x₂-Richtung sofort exakt;
  Fehler wird quadriert, Quotient → 1/(2x*) = 0,5; Start mit x₁ < 0 landet im Sattel
  (−1; 0), `@bemerkung:drei-vorbehalte`; bei x₁ = 0 singuläre Hesse-Matrix; auf der
  Quadrik ein Schritt).
- Selbsttest: Self-Check F2 des Decks („Welche Ordnung hat der Approximationsfehler
  f(x+h) − T_k?") ist nicht abgedeckt. Eine `:::frage{wahr}` ergänzen: „Ist f (k+1)-mal
  stetig differenzierbar, so gilt f(x+h) − T_k(h) = o(|h|^k) für h → 0." mit
  zwei Sätzen Antwort (das ist `@satz:taylorentwicklung-i`; nach dem Lagrange-Restglied
  sogar von der Ordnung |h|^{k+1}). Kein neuer Stoff, nur die Folienfrage.

**VERLAGERN** – nur die genannte Quizfrage (siehe FEHLER). Beide Taylor-Beweise und
die ML-Asymptotik sind schon Vertiefungen (Anhangsfolien).

**STREICHEN** – nur die genannten Sätze; keine Umgebung.

**NICHT ANFASSEN**
- `definition:taylorpolynom`, `satz:taylorentwicklung-i` mit beiden Restgliedern
  (Klausur), `satz:taylorentwicklung-ii` (S124 zitiert), Zahlen in
  `beispiel:taylorapproximation-der` (0,1487/0,0237/0,0029, verifiziert),
  Zahlen in `bemerkung:hoeher-ist-nicht-automatisch-besser`, `korollar:taylorapproximation-fuer-vektor-zu`
  mit beiden Schreibweisen (Folie), Shiny-Link, Newton-Herleitung und
  `algorithmus:newton-raphson-verfahren` (Klausur), Sonderfall-Absatz in
  `bemerkung:ebene-und-quadrik`, Vertiefung ML-Asymptotik, Selbsttest-Fragen (außer
  der verlagerten), zahlfrage 5, Literaturzeile.

### S109.mdx (Haupttext 2 679 → Ziel ≈ 1 780, also ≈ −34 %; Vertiefung 670 → ≈ 900)

**FEHLER**
- Die gezählte Folie „Bemerkungen" (Deck 10: leere Fälle über Tensoren, Störungsanalyse
  h ↦ f(X+hE), Matrix Cookbook, Funktionenräume → Übung) ist im Haupttext nur zu einem
  Viertel abgedeckt (leere Zellen in S102). Vor der Vertiefung einen Haupttext-Absatz
  „### Was wir ausgelassen haben" von ≈ 100 Wörtern einfügen, aus den Sätzen der
  Vertiefung kondensiert: die drei leeren Zellen brauchen Tensoren der Stufe 3 oder 4
  (`@sec:tensoren/tensoren`) oder Vektorisierung; Störungsanalyse: für eine
  Störungsrichtung E ist φ(h) = f(X + hE) eine Funktion einer Variablen und
  φ'(0) = D_X f(E); Abbildungen zwischen Funktionenräumen bleiben Übung; weitere
  Formeln im Matrix Cookbook (Link wie in der Vertiefung). Die ausführlichen
  Bemerkungen bleiben in der Vertiefung; dort die Überschrift „### Was wir ausgelassen
  haben" entfernen (sonst doppelt) und den Vertiefungstitel zu „Leere Felder,
  Störungsanalyse und Nachschlagewerke im Detail" ändern.
- Handgeschriebener Link „[nächste Kapitel](?k=11-konvexitaet#sec-11.1)" → `@kap:konvexitaet`
  (KONVENTIONEN, Verweise); optional, tut nichts weh.

**STRAFFEN**
- Einleitungsabsatz auf zwei Sätze (Grundgedanke; was die Tabelle unten leistet).
- „Nächstes Kapitel" auf ≈ 80 Wörter (offene Frage lokal vs. global; für konvexe
  Funktionen ist jeder kritische Punkt ein globales Minimum, keine Sattelpunkte;
  das nächste Kapitel).
- Selbsttest: die beiden Ansage-Absätze („Zwei Runden. In der ersten stehen sechs
  Aussagen …" und „Die zweite Runde betrifft …") auf je eine kurze Zeile („*Erste
  Runde: Ableitungsbegriff und Formate.*" / „*Zweite Runde: Rechenregeln,
  Hesse-Matrix, Taylor.*"). Antworten kürzen: Kettenregel-Frage (Zahlenprobe mit A
  und (10, 42, 66) auf zwei Sätze), Produktregel-Frage (Zahlenprobe bei (0,4; −0,7)
  streichen), Newton-auf-Quadrik-Frage (auf ≈ 90 Wörter, die drei Startpunkte und
  (0,2; 0,6) bleiben), Konvexitäts-Frage um zwei Sätze. Keine Frage streichen: keine
  ist wortgleich mit einem Abschnitts-Selbsttest (die Kompass-Frage in S102 fragt 60°,
  hier die Höhenlinie; die Newton-Frage in S108 fragt T₂ = f, hier Ax = b).
- Tabelle „Das Wichtigste in Kürze": bleibt die einzige Zusammenfassung. Optional in
  der Jacobi-Zeile den Halbsatz „jede Matrix M mit f(x+h) = f(x) + Mh + o(‖h‖) ist
  schon die Jacobimatrix" ergänzen (einzige Aussage der gestrichenen Bemerkungen, die
  die Tabelle nicht trägt).

**VERLAGERN**
- Der Absatz „Die meisten Beweise dieser vier Abschnitte folgen demselben Muster. …
  verwendet statt einer skalaren Zwischenstelle die Integralform des Restglieds."
  (≈ 230 Wörter) in eine neue `:::::vertiefung[Das gemeinsame Muster der Beweise]`
  direkt vor der bestehenden Vertiefung. Begründung: EXTRA (Metareflexion, nicht auf
  den Folien), aber lesenswert; nichts verweist darauf.

**STREICHEN**
- Unterüberschrift „### Die Kernkonzepte" mit dem Satz davor, `bemerkung:fuenf-begriffe-die-bleiben`,
  den Absatz „Zwei Anordnungen laufen dabei nebeneinander her …", den Absatz „Die
  zweite Kapitelhälfte hat geklärt …" und `bemerkung:vier-bausteine-die-bleiben`
  (zusammen ≈ 810 Wörter). Derselbe Inhalt steht in der Tabelle „Das Wichtigste in
  Kürze" und in den jeweiligen Abschnitten; Brief §3.2: höchstens eine knappe
  Zusammenfassung je Kapitel. Beide Labels werden nur aus S109 zitiert (Verweise in
  `numbers.generated.*` regeneriert der Orchestrator).

**NICHT ANFASSEN**
- Tabelle (nur der optionale Halbsatz), alle Formeln in den Vertiefungs-Bemerkungen
  (`bemerkung:stoerungsanalyse-als-richtungsableitung` mit dem Beispiel φ(h) = 30 + 4h + h²,
  `bemerkung:die-drei-leeren-felder`), Cookbook-Link, Selbsttest-Fragen und ihre
  Lösungswerte, zahlfrage 0, Literaturzeile.

---

## 2. Geschätzte Wirkung

| Datei | Haupttext vorher | nachher (≈) | Δ | Vertiefung nachher (≈) |
| --- | ---: | ---: | ---: | ---: |
| S101 | 2 393 | 2 130 | −11 % | 278 |
| S102 | 3 282 | 2 830 | −14 % | 137 |
| S103 | 3 093 | 2 560 | −17 % | 820 |
| S104 | 2 670 | 2 020 | −24 % | 1 730 |
| S105 | 2 231 | 1 900 | −15 % | 400 |
| S106 | 3 606 | 2 810 | −22 % | 848 |
| S107 | 3 703 | 2 650 | −28 % | 1 850 |
| S108 | 3 421 | 2 530 | −26 % | 960 |
| S109 | 2 679 | 1 780 | −34 % | 900 |
| Summe | 27 078 | ≈ 21 200 | **≈ −22 %** | ≈ 7 900 |

Gesamt ≈ 34 600 → ≈ 29 100 (≈ −15 %). Das liegt über dem Gesamt-Richtwert von
−5 bis −10 %; getrieben wird es von zwei Posten, die der Brief ausdrücklich verlangt
(dreifache Zusammenfassung in S109, ≈ 810 Wörter; doppelter Kettenregelbeweis in
S103, ≈ 350 Wörter). Ohne diese beiden läge das Gesamt bei ≈ −11 %. Wer beim Editieren
merkt, dass eine Straffung Substanz kostet, lässt sie: der Haupttext-Richtwert
(−20 %) ist auch dann erreicht, wenn nur die als Dublette, Rückblick, Widget-Prosa
und Verlagerung markierten Posten umgesetzt werden.

## 3. Für beide Editoren

- Nach jeder Datei: `cd /home/user/fmm-skript && npm run typecheck:mdx` und
  `node scripts/gen-numbers.mjs --check` (nur `FEHLER`-Zeilen zählen). Am Ende
  zusätzlich `npm run test:mdx` und `npm run verify:numbers`.
- Nur die eigene Dateigruppe anfassen. Beide Gruppen haben keinen Posten, der eine
  Datei der anderen Gruppe verändert; alle gruppenübergreifenden Dubletten sind oben
  (§1.5) eindeutig zugeordnet.
- Bericht nach `reviews/straffung-2026-09-25/10-differentialrechnung-gruppe1.md`
  bzw. `…-gruppe2.md` im Format von Brief §8; Zahlen mit
  `node reviews/straffung-2026-09-25/zaehlen.mjs 10-differentialrechnung`.
- Ermessensentscheidungen für den Dozenten (im Bericht nennen): Stetigkeitsbeweis
  zurück in den Haupttext (S105); Streichung des Koordinatenbeweises der Kettenregel
  (S103); Tabelle statt Bemerkungen als einzige Zusammenfassung (S109); neue Sätze
  für Var ≈ I⁻¹ (S107), Backprop (S103), „Was wir ausgelassen haben" (S109) und die
  ergänzte Taylor-Quizfrage (S108), die jeweils Folieninhalt in den Haupttext holen.
