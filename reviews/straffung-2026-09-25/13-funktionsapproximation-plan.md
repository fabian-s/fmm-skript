# Straffungsplan Kapitel 13 (Funktionsapproximation), 2026-09-25

Planer hat gelesen: BRIEF.md, KONVENTIONEN.md (Technik, Nummerierung, Tooltips,
Lessons), STYLE.md, Deslop-Skill samt german-tells und long-document-procedure,
beide Decks (`15-funktionsapproximation-I.qmd`, `16-funktionsapproximation-II.qmd`),
alle neun Abschnittsdateien vollständig, den alten Bericht
`reviews/kuerzung/13-funktionsapproximation.md`, die Klausuren unter
`fmm-lmu/exams/` (ws2526-1 Konzeptfragen zu Polynominterpolation, Lokalität von
B-Splines, Basisdarstellung/Randbedingungen; ws2526-2 Bias-Varianz-Skizze;
`questions/interpolation/aufgabe1.tex` mit Monom- und Lagrange-Basis).

## 0. Ausgangszahlen und Ziel

```
S131  Haupttext 2082  Vertiefung 118   gesamt 2200
S132  Haupttext 2386  Vertiefung 157   gesamt 2543
S133  Haupttext 3217  Vertiefung 237   gesamt 3454
S134  Haupttext 3845  Vertiefung 462   gesamt 4307
S135  Haupttext 2621  Vertiefung 277   gesamt 2898
S136  Haupttext 2649  Vertiefung 372   gesamt 3021
S137  Haupttext 3153  Vertiefung 642   gesamt 3795
S138  Haupttext 2892  Vertiefung 592   gesamt 3484
S139  Haupttext 3913  Vertiefung 610   gesamt 4523
SUMME Haupttext 26758 Vertiefung 3467  gesamt 30225
```

Richtwert aus dem Brief: Haupttext −20 bis −30 %, also Ziel 18 700–21 400
Wörter Haupttext. Die Posten unten summieren sich auf geschätzt −7 000 bis
−7 800 Wörter Haupttext (≈ −26 bis −29 %), davon rund 2 500 verlagert und
4 500–5 300 gestrafft/gestrichen. Gesamtumfang soll um 5–10 % sinken.
**Qualität vor Menge:** Wer einen Posten beim Lesen für einen Fehlgriff
hält, lässt ihn und schreibt das in den Bericht.

Baseline der Prüfungen vor Beginn: `node scripts/gen-numbers.mjs --check`
meldet 0 FEHLER-Zeilen (nur „nicht aktuell" nach Edits ist normal).

## 1. Regeln, die für beide Editoren gelten

- **Editor-Gruppen:** Gruppe 1 = S131–S135, Gruppe 2 = S136–S139. Jeder Posten
  unten steht in genau einer Datei; abschnittsübergreifende Entscheidungen
  (§2) sind so zugeordnet, dass keine Gruppe in die Dateien der anderen
  schreiben muss.
- **Labels mit ID bleiben stehen**, auch wenn ihr Block verlagert wird; nur
  Label-*Titel* (Text in Klammern) dürfen sich ändern. Löschungen von Labels
  nur, wo unten ausdrücklich „refs=0" steht (ich habe jede ID über
  `src/` und `scripts/verify/` gegrept; die Zahl steht beim Posten).
- **Fence-Stufen** (Muster aus demselben Kapitel): Vertiefung mit Beweis
  `:::::vertiefung[…]` > `::::beweis` > `:::schritt` (S131/S132/S134/S136/S138/S139);
  Vertiefung mit Bemerkung `::::vertiefung[…]` > `:::bemerkung[…]` (S133/S135/S139).
  Vertiefung mit Widget-Kasten UND Bemerkung/Beispiel: `:::::vertiefung[…]`
  außen, darin `::::interaktiv[…]` und `:::bemerkung[…]`/`:::beispiel[…]`
  (der schließende Fence hat immer genau so viele Doppelpunkte wie der öffnende).
- **Vertiefungstitel**: Klartext, keine Mathe, keine Verweise, kein Drama.
- **Verweise auf Vertiefungs-Labels** funktionieren weiter (Box klappt auf).
  Formulierungen wie „(in der Vertiefung @bemerkung:… erklärt)" sind
  überflüssig und werden auf „(@bemerkung:…)" gekürzt.
- **Schaetzfrage-Props nicht anfassen** (`frage=`, `loesung=`, `toleranz=`,
  `einheit=`, `verdeckt=`): Das Prüfscript
  `scripts/verify/REV29/13-funktionsapproximation-S139Skalierung.mjs` liest
  die Props der S139-Schätzfrage per Regex aus der MDX-Datei (Zeilenfolge
  `frage=` / `loesung=` / `toleranz=` muss so bleiben). Prosa in `verdeckt`
  darf umformuliert werden, Zahlen nicht.
- **Getippte Nummern** auf Skript-Objekte sind verboten (KONVENTIONEN
  „Nummerierung"); Buchkapitel („Heath Kapitel 7") sind Literatur und bleiben.
  Drei Verstöße sind unten als FEHLER aufgeführt (S132, S137, S139).
- **Deslop-Profil** „Lecture script": Die Regex-Triage über das Kapitel ist
  fast sauber (keine Geviertstriche, Gedankenstrich-Budget überall
  eingehalten). Übrige Tics: „Zwei/Drei Beobachtungen."-, „Drei Punkte zur
  Definition."-, „Zwei Details der Definition."-, „Drei Details."-Ankündigungen
  vor Aufzählungen (S132, S134, S136, S137, S138) → streichen, direkt mit dem
  Inhalt beginnen; „Zu beachten ist, was … *nicht* sagt/gebraucht wird"
  (S135, S136) → einmal ist erlaubt, beim zweiten Mal umformulieren; „genau"
  als Füllwort (S131 „genau so viele", S132 „genau dieser Kurve", S136 „tut
  genau das", „Genau so rechnet das Widget", S139 „genau das additive
  Modell") → streichen; Titel-Tells: S131 `interaktiv[Landkarte der
  Funktionsapproximation]` → `[Konzeptkarte des Kapitels]`; S131 „Baukasten
  aus Sinusfunktionen" → „dieselben Sinus- und Kosinusfunktionen"; S133/S138
  „… und sein Preis", „der Preis für …" in Überschriften → sachlich
  („Der Rechenweg und sein Aufwand", „Bias: zu wenige Basisfunktionen",
  „Varianz: zu viele Basisfunktionen"); S139 „Der Preis." → „Die
  Einschränkung."; S139 „Messstationen auf einer Landkarte" ist wörtlich
  gemeint und bleibt. Meta-Sätze („In diesem Abschnitt …", „Das holen wir jetzt
  nach", „Dieser Abschnitt behebt das") streichen.
- **Selbsttests**: Fragen zu verlagertem Stoff bleiben, wenn der Haupttext
  sie noch beantwortet (Verweis auf das Vertiefungs-Label ist erlaubt);
  sonst fallen sie (unten je Datei genannt). Quiz-Einleitungszeilen fallen.
- Nach jeder Datei: `npm run typecheck:mdx`, `node scripts/gen-numbers.mjs
  --check` (nur FEHLER zählen); am Ende zusätzlich `npm run test:mdx` und
  `npm run verify:numbers`.

## 2. Abschnittsübergreifende Entscheidungen

| Dublette | bleibt in | fällt/kürzt in | Gruppe |
| --- | --- | --- | --- |
| Boundary.knots-Falle bei `bs()` | S134 `#b-splines-in-r` | S137 R-Beispiel, Detail 3 → ein Satz + `@bemerkung:b-splines-in-r` | 2 (S137) |
| Kolmogorow-Arnold-Netze | S131 (in neuer Vertiefung, §S131) | S139 Vertiefung „Splines im maschinellen Lernen": KAN-Absatz auf einen Satz + `@bemerkung:interpolation-im-maschinellen-lernen-und` | 2 (S139) |
| „K groß wählen und bestrafen" | S138 `#der-praktische-ausweg-gross-waehlen-und` (gekürzt, Folie „Praktisch verwendeter Ansatz") | S137: die Theorie (Kriterium, Grenzfälle, Ridge-Form) bleibt in der bestehenden Vertiefung, der Haupttext bekommt nur die Kriterienzeile (§S137) | 2 |
| Spline-Definition | S134 `#polynom-spline-vom-grad-q` | S135 `#spline` auf die Notationsumstellung ξ→x kürzen | 1 (S135) |
| Vorkenntnisse-Katalog | S131 „### Vorkenntnisse" (gekürzt) | S135 `#was-die-zweite-kapitelhaelfte` auf drei Sätze | 1 (S135) |
| Konditionszahlen 10^16 vs. 37, Faktor 4,03, O(Nq²) | S133 `#konditionszahlen-der-groessenordnung`, S134 `#konditionszahlen-eine-groessenordnung`, `#bandstruktur-und-aufwand` | S139 Kernkonzepte nennen sie nur noch einmal je Punkt (keine Tabelle mehr, gibt es schon nicht) | 2 |
| Bias fällt nicht monoton (0,0344 → 0,1174) | S138 `#der-bias-faellt-nicht-monoton` + S138 Quiz Q1 | S139 Kapitel-Selbsttest Q11 („Mit wachsendem K fällt der quadrierte Bias monoton und die Varianz wächst monoton") streichen | 2 |
| „Einsetzen ist nicht Vorwärtssubstitution" | S132 `#einsetzen-ist-hier-nicht` (zwei Sätze) | S132 Quiz Q5 streichen (wortgleiche Wiederholung) | 1 |
| Drei Regime der Glättung (starr/passend/überangepasst, σ̂ 0,278–0,306) | S137 Absatz „Die Tabelle zeigt drei Regime" (Haupttext) | S137 Interaktiv-Nachtext auf zwei Sätze | 2 |
| Lokalitäts-Zahlenreihe 1,732/0,464/… | S134 Interaktiv „Ein Datenpunkt wandert" + Quiz Q8 | S134 `#was-die-lokalitaet-praktisch-bedeutet` letzter Absatz streichen | 1 |

**Einzige Zusammenfassung des Kapitels:** S139 `#multivariat-kernkonzepte-des-kapitels`
(gekürzt auf ~350 Wörter). Abschnittsweise Zusammenfassungen werden gekürzt
oder aufgelöst: S133 „Bilanz"-Absatz (zwei Sätze Überleitung), S136
`#vier-staerken-auf-einen-blick` (steht so auf der Folie „Approximation:
Zusammenfassung", bleibt als Vier-Zeilen-Liste), S139
`#drei-stellschrauben-drei-wirkungen` (in die Kernkonzepte eingefaltet).

**Folienlücke (nicht schließen, nur melden):** Folie „Orthogonale Polynome:
Gram-Schmidt im Funktionenraum" (Skalarprodukt ∫fg, Legendre-P₂-Rechnung,
`poly()` orthogonalisiert diskret) hat im Skript nur die Nennung in
`#der-ausweg-orthogonalisierte-basen`. Brief §5: nichts Neues erfinden →
im Bericht als offene Frage an den Dozenten.

---

## S131 (Gruppe 1) · Haupttext 2082 → Ziel ≈ 1 700 (−18 %)

### VERLAGERN
- `#interpolation-im-maschinellen-lernen-und` (Bemerkung, refs=1 aus S139
  Vertiefung): Die Folie „Anwendungen in ML und Data Science" nennt vier
  Stichworte mit dem Zusatz „teils Interpolation im engeren Sinn, teils
  Analogien". KERN sind die vier Stichworte; EXTRA ist die Auseinandersetzung
  damit (Latent-Space-Formel, RoPE, KAN-Absatz). Umsetzung: Im Haupttext
  bleibt ein Absatz von vier Sätzen ohne Bemerkungs-Label: Computergrafik
  (Pixel beim Drehen/Skalieren) und Zeitreihen (Lücken füllen) sind
  Interpolation im Sinn von `@definition:interpolationsproblem`;
  Latent-Space-Interpolation und Positional Encodings werden oft dazugezählt,
  sind aber nur Analogien. Der ganze bisherige Bemerkungsblock samt Label
  wandert in `::::vertiefung[Interpolation im maschinellen Lernen, und was nur so aussieht]`
  direkt darunter (Muster S133 Chebyshev: `::::vertiefung` > `:::bemerkung`).
  KAN-Absatz bleibt dort (S139 verweist darauf).

### STRAFFEN
- Eröffnungsabsatz „Mit diesem Kapitel beginnt der dritte Block …": drei
  Sätze reichen (Aufgabe, Datenpunkte, manchmal Auswertungen einer teuren
  Funktion). Der Absatz „„Passt" lässt sich auf verschiedene Weisen
  verlangen …" wird auf einen Satz gekürzt und an den Anfang von „### Drei
  Varianten desselben Wunsches" gehängt (Ankündigung, auf die sofort der Inhalt folgt).
- `interaktiv[Landkarte der Funktionsapproximation]` → Titel
  `[Konzeptkarte des Kapitels]`; Vortext auf einen Satz („Die Karte zeigt, wie
  die Begriffe dieses Kapitels zusammenhängen und auf welche Bausteine der
  Kapitel zur linearen Algebra sie zurückgreifen; beim ersten Lesen genügt der
  Gesamteindruck."); Nachtext auf einen Satz. Den Halbsatz „Teil 2 wird hier
  nirgends gebraucht" streichen (stimmt nicht ganz: S135 nutzt
  Optimierungsbegriffe, S137-Vertiefung Ridge).
- „### Vorkenntnisse": Einleitungssatz streichen; jeder Punkt höchstens
  zwei Zeilen (Konditionszahl-Punkt auf einen Satz mit den beiden Verweisen;
  Normen-Punkt behält die Supremumsnorm-Definition, weil S133 sie braucht).
- `#daten-oder-funktion` (refs=0): auf drei Sätze kürzen (Folie hat den
  Hinweis als Kleingedrucktes). Label bleibt.
- `#approximation-ueber-interpolation` (refs=0): erster Absatz auf drei
  Sätze, zweiter Absatz auf zwei Sätze (Glättung ist die schwierigste, weil
  stochastisches Modell nötig; kommt in `@sec:glaettung`).
- „### Wozu wir das brauchen": den Schlusssatz „Auf diesem Umweg beruhen die
  klassischen Verfahren … nicht weiter verfolgt" streichen.
- `#vier-interpolanten-durch-drei-punkte`: Probe-Absatz auf zwei Sätze
  (f̂₁ vorrechnen, für die anderen „ebenso; bei f̂₄ verschwindet sin(2πx)
  an ganzen Zahlen"). Schlussabsatz „Zwischen den Stützstellen …" auf einen Satz.
- `#unendlich-viele-loesungen` (refs=1, Quiz Q1): erster Absatz bleibt
  (KERN, Quizantwort 1). Zweiter Absatz auf einen Satz: „Die Differenzen aus
  `@beispiel:…` sind von dieser Bauart: f̂₃−p = x(x−1)(x−2), f̂₄−p =
  0,5 sin(2πx), und auch f̂₂−p verschwindet an 0, 1 und 2." (die
  stückweise Formel für f̂₂−p entfällt).
- Absatz „Interpolation allein legt also nichts fest …" (Überleitung): auf
  zwei Sätze (Basissysteme mit K Funktionen → LGS in `@sec:basisdarstellung`;
  Basiswahl entscheidet über Kondition und Lokalität, `@sec:splines`). „genau so
  viele" → „so viele".
- Interaktiv „Die drei Aufgaben nebeneinander": Nachtext auf zwei Sätze.
- Selbsttest: alle fünf bleiben (kurz, Q1–Q3 = Folienquiz). Q4: „Im Widget zu
  den drei Aufgaben …" Satz streichen.

### STREICHEN
- nichts über das Obige hinaus.

### FEHLER
- Landkarten-Kasten: „Teil 2 wird hier nirgends gebraucht" (siehe oben).

### NICHT ANFASSEN
- Drei Definitionen (`#approximationsproblem`, `#interpolationsproblem`,
  `#glaettungsproblem`), Beispiel `#vier-interpolanten-durch-drei-punkte`
  (Zahlen), Satz `#gestalt-aller-interpolanten` (Widget S131Interpolanten.tsx
  referenziert ihn), die bestehende Beweis-Vertiefung, beide Schätzfragen und
  ihre Props, `@sec:intro/worum`-Verweis.

---

## S132 (Gruppe 1) · Haupttext 2386 → Ziel ≈ 1 850–1 950 (−19 bis −22 %)

### VERLAGERN
- `#unendlich-viele-freiheitsgrade-endlich` (Bemerkung, refs=0) samt dem
  Vorspann „Was heißt der Befund aus `@sec:approximation` in dieser Sprache?
  …": EXTRA (Folie sagt nur „unendlich-dimensional ⇒ unendlich viele
  Interpolanten"). Umsetzung: Haupttext behält nach `#der-vektorraum-der-funktionen`
  einen Satz: „Dieser Raum ist unendlichdimensional, und deshalb legen $n$
  Interpolationsbedingungen nichts fest (`@sec:approximation`)." Vorspann +
  Bemerkung wandern in `::::vertiefung[Die Auswertungsabbildung und der Rangsatz]`
  (`::::vertiefung` > `:::bemerkung`). Der letzte Absatz der Bemerkung („Es
  stehen also unendlich viele Freiheitsgrade …") ist mit dem neuen Haupttextsatz
  doppelt und entfällt.

### STRAFFEN
- Eröffnung: auf drei Sätze („Durch dieselben drei Punkte laufen … alle vier
  erfüllen die Bedingungen. Wir suchen den Interpolanten deshalb nur noch in
  einem endlichdimensionalen Ansatzraum; aus der Suche nach einer Funktion wird
  die Suche nach endlich vielen Zahlen."). „Dieser Abschnitt behebt das" fällt.
- „Der erste Schritt: Funktionen sind Vektoren." streichen (die Definition
  sagt es). Absatz „Nachzurechnen ist daran wenig …" auf zwei Sätze.
- `#das-wort-basisfunktion-traegt-eine` (refs=1): die ersten drei Sätze
  („Dass jedes … braucht `@satz:…`.") auf einen Satz; das Beispiel 1, x, 1+x
  bleibt vollständig (Folie, Quiz Q6).
- `#zwei-ansatzraeume`: Punkt 2 letzten Satz („Woher diese Zahl kommt …
  Vorschau mit") auf „(`@sec:splines`)".
- `#was-in-b-steckt-und-was-nicht` (refs=1): „Drei Beobachtungen dazu."
  streichen; Punkt 2 auf zwei Sätze; Punkt 3 auf zwei Sätze (n>K → Kleinste
  Quadrate, `@kap:kq`; n<K unterbestimmt).
- `#einsetzen-ist-hier-nicht` (refs=1, Quiz Q5): auf zwei Sätze („Der
  Rechenweg sieht aus wie Vorwärtssubstitution, ist aber Gauß-Elimination: In
  Zeile 2 steht rechts der Diagonalen φ₃(x₂) = 1 ≠ 0; nur x₁ = 0 macht die
  erste Zeile so einfach."). Label bleibt.
- `#dieselbe-funktion-andere-koeffizienten` (refs=3, S139 zweimal + Widget
  BasisRechner nutzt die Newton-Basis; Klausur `questions/interpolation`
  fragt genau den Basiswechsel Monom → Lagrange): bleibt im Haupttext. Kürzen:
  Satz „Dass es auch anders geht, zeigt ein zweiter Anlauf …" streichen; den
  Schlussabsatz „Anders sein kann sie auch nicht: … allgemein festhält." auf
  einen Satz mit Verweis `@sec:polynominterpolation`.
- Absatz „Der Ansatzraum bestimmt also den Interpolanten …": bleibt (drei
  Sätze), das ist die Aussage, auf die S133 und S139 verweisen.
- Interaktiv „Zwei Basen, ein Interpolant": Nachtext auf drei Sätze (Matrix
  bleibt stehen, weil nur y wandert; Schalter wechselt die Basis, Koeffizienten
  springen, Kurve nicht). „genau dieser Kurve" → „dieser Kurve".
- „### Woran sich Basissysteme unterscheiden": Einleitung auf einen Satz;
  jeder der vier Punkte höchstens drei Zeilen (Kondition: κ(B) wächst bei der
  Monombasis schnell; Stabilität: eine Messwertänderung soll nur lokal wirken;
  Lokalität: Bandmatrix; Effizienz: Band-/Dreieckssysteme linear statt kubisch).
  Den Halbsatz „Für eine quadratische invertierbare Matrix kontrolliert ‖B⁻¹‖
  …" streichen.

### STREICHEN
- Quiz Q5 („Weil sich das System … durch Einsetzen lösen lässt, ist B dort
  eine untere Dreiecksmatrix"): wortgleich mit der gekürzten Bemerkung.
  Q1–Q4, Q6 bleiben (Q1 = Folienquiz „Was sind B, a, y").

### FEHLER
- `#interpolation-durch-basisdarstellung` Schritt 4: handgeschriebener Link
  `([Kapitel 5](?k=05-lgs#sec-5.2))` → `(@sec:lgs/lgs)`.

### NICHT ANFASSEN
- Definitionen `#der-vektorraum-der-funktionen`, `#ansatzraum-basisdarstellung`,
  Satz `#wann-k-zahlen-eine-funktion-festlegen` samt Vertiefungsbeweis,
  Algorithmus, Satz `#das-interpolationsproblem-ist-ein` (10 Verweise,
  Klausur), Beispiel `#basisdarstellung-konkret` (Folie, Zahlen), Widget-Tag
  `<BasisRechner />`.

---

## S133 (Gruppe 1) · Haupttext 3217 → Ziel ≈ 2 550–2 650 (−18 bis −21 %)

### VERLAGERN
- Beweis zu `#zu-viele-nullstellen-erzwingen-das` (vier Schritte, ~150 W):
  Die Folie gibt die „Folgerung" ohne Beweis. Korollar bleibt im Haupttext,
  der `::::beweis` wandert in `:::::vertiefung[Beweis der Folgerung aus dem Fundamentalsatz]`
  (Muster S131). Label/refs (5) unberührt.

### STRAFFEN
- Eröffnung: letzten Satz „Numerisch dagegen hat derselbe Ansatz drei
  Probleme …" auf „Numerisch hat er drei Probleme: Kondition, Stabilität,
  Konvergenz."
- Absatz „Beide Fassungen gehen durch Polynomdivision auseinander hervor …":
  auf zwei Sätze; „Wir brauchen den Satz allerdings nicht in dieser Stärke"
  streichen.
- `#drei-nullstellen-bei-grad-hoechstens`: letzten Satz „Aus drei Nullstellen
  wird … und das brauchen wir gleich." streichen.
- „### Genau ein Polynom durch n Punkte": Vorspann „Wir halten zuerst … hier
  bekommen sie ihre Namen." auf einen Satz.
- „### Der Rechenweg und sein Preis" → Titel „Der Rechenweg und sein
  Aufwand". Absatz nach dem R-Code: auf zwei Sätze (outer/solve erklären;
  „dieses 10×10-System verliert etwa sieben der 16 Stellen, warum, zeigt der
  nächste Unterabschnitt").
- `#warum-die-spalten-fast-parallel-werden`: bleibt (Folie „Problem 1"),
  Winkelzahlen bleiben; zweiten Absatz auf zwei Sätze.
- `#konditionszahlen-der-groessenordnung`: Tabelle bleibt (Folie). Absatz „Die
  Werte sind illustrativ …" auf zwei Sätze (normabhängig; auf [−1,1] nur
  2,7·10⁸). Absatz „Entscheidend ist der Trend …" bleibt (Folie: „für n ≥ 20
  fast alle Genauigkeit verloren"), aber auf vier Sätze.
- `#der-ausweg-orthogonalisierte-basen` (refs=2): erster Absatz bleibt (Folie).
  Zweiter Absatz (`poly()`) auf drei Sätze: `poly(x, 3)` orthogonalisiert die
  Vandermonde-Spalten bezüglich der gegebenen Stellen; `cbind(1, poly(x, 3))`
  hat Konditionszahl √n statt 10¹⁶; die Feinheiten (κ = 1 nach Normierung der
  Einsspalte) entfallen.
- Interaktiv „Die Monombasis und ihre Kondition": Zwischentext „Diese
  Ähnlichkeit verschlechtert …" auf einen Satz; Nachtext bleibt (zwei Sätze).
- `#was-das-in-zahlen-heisst` (refs=1, Quiz Q7): erster Absatz bleibt
  (Zahlen 0,40 / 4,03 werden im Quiz zitiert). Zweiter Absatz auf zwei Sätze
  („Die Methode ist instabil und nicht lokal; beides liegt am Ansatzraum, nicht
  an der Basis. Abhilfe: Basisfunktionen mit kleinem Träger, `@sec:splines`.").
- `#divergenz-schon-aber-nicht-monoton` (Folie: „nicht monoton, Maxima wandern
  an den Rand"): Tabelle bleibt; Prosa vor und nach der Tabelle auf je zwei Sätze.
- Absatz nach der Chebyshev-Vertiefung („Chebyshev-Knoten vermeiden das
  Runge-Phänomen, setzen aber voraus …"): bleibt (Klausur ws2526-1 nennt
  Tschebyschow-Knoten als Ausweg), aber „(in der Vertiefung
  @bemerkung:… erklärt)" → „(@bemerkung:…)".
- Interaktiv „Runges Funktion, zwei Knotenfamilien": Vortext auf einen Satz
  („Wann wird der Fehler zum ersten Mal größer als die Funktion selbst?").
  Nachtext: Satz „Der Vergleich zeigt den nichtmonotonen Start … dominieren."
  streichen (steht in der Bemerkung); es bleibt der Satz zur zweiten Tafel.
- „Bilanz"-Absatz („Die Bilanz der Polynominterpolation ist gemischt …"):
  auf zwei Sätze Überleitung („Existenz und Eindeutigkeit sind geklärt; das
  globale Polynom hohen Grades ist trotzdem schlecht konditioniert, nicht lokal
  und konvergiert nicht einmal für glatte f. Der Rest des Kapitels nimmt statt
  eines Polynoms hohen Grades viele Polynome kleinen Grades: Splines,
  `@sec:splines`."). Das ist die einzige verbleibende Abschnittsbilanz-Stelle
  und wird bewusst nicht ganz gestrichen (sie trägt den Erzählbogen
  S133 → S134, den auch die Klausur abfragt).
- Selbsttest: alle sieben bleiben (Q1–Q2 Folie, Q4/Q5/Q6 Klausurstoff);
  Erklärungstexte auf höchstens drei Sätze.

### STREICHEN
- nichts über das Obige hinaus. (Der alte Bericht schlug vor, die
  Vandermonde-Determinante zu streichen; sie ist im aktuellen Text schon weg.)

### FEHLER
- keine gefunden.

### NICHT ANFASSEN
- `#fundamentalsatz-der-algebra`, `#monombasis-und-vandermonde-matrix`,
  `#existenz-und-eindeutigkeit-der` samt vollständigem Beweis (Folie führt die
  Beweisskizze; Schritte 3–4 liefern die Vandermonde-Invertierbarkeit, die das
  Quiz und die Klausur brauchen), `#ein-haeufiges-missverstaendnis` +
  `#drei-punkte-auf-einer-geraden` (Folie), Algorithmus + R-Code,
  `#wie-sich-eine-datenaenderung-fortpflanzt` samt Zwei-Schritte-Beweis
  (Lagrange-Grundpolynome sind Klausurstoff, `questions/interpolation`),
  `#runge-1901`, beide bestehenden Vertiefungen, Widget-Tags, Tabellen.

---

## S134 (Gruppe 1) · Haupttext 3845 → Ziel ≈ 2 800–2 950 (−23 bis −27 %)

### VERLAGERN
- `#warum-die-knotenfolge-so-lang-sein-muss` (Bemerkung, refs=2: Quiz Q8 und
  Widget S134BSplineBasis.tsx via `ref(…)`; Label muss bleiben) und
  `#grad-1-die-hutfunktionen` (Beispiel, refs=0): EXTRA (Folie: Rekursion
  „nur zur Referenz/Transparenz"). Beide Blöcke plus die bestehende Vertiefung
  „Ein Rekursionsschritt Stück für Stück" (Widget `<CoxDeBoorSchritt />`)
  werden zu EINER Vertiefung
  `:::::vertiefung[Die Cox-de-Boor-Rekursion von Hand]` an der Stelle der
  bisherigen Rekursionsschritt-Vertiefung (nach dem Interaktiv „Die
  B-Spline-Basis erkunden"). Reihenfolge darin: `:::bemerkung[#warum-die-knotenfolge…]`,
  `:::beispiel[#grad-1-die-hutfunktionen …]`, dann
  `::::interaktiv[Ein Rekursionsschritt Stück für Stück]` mit dem bisherigen
  Vortext (zwei Sätze) und `<CoxDeBoorSchritt />`. Import bleibt. Der
  Widget-`num("eq:erweiterte-knotenfolge-und-b-splines-2")` zeigt auf die
  Definition im Haupttext, unverändert.
  Im Haupttext bleibt in `#erweiterte-knotenfolge-und-b-splines` der Satz „Die
  Randknoten treten also (q+1)-fach auf …" (das ist die Abzählung m+2q+1).

### STRAFFEN
- Eröffnung (zwei Absätze): auf einen Absatz von vier Sätzen (globales Polynom
  → jede Messung wirkt überall; Ausweg: Intervall zerlegen, festen niedrigen
  Grad je Stück, an den Nahtstellen so viel Glattheit wie der Grad zulässt).
- `#was-in-dieser-definition-steckt` (refs=1, Quiz Q3): „Drei Punkte zur
  Definition." streichen; Punkt 1 auf einen Satz; Punkt 2 bleibt (Quiz Q3/Q4
  brauchen „C^{q−1} ist maximal"); Punkt 3 auf zwei Sätze.
- `#die-grade-0-1-und-3`: bleibt (Folienbilder); letzten Absatz „Höhere Grade
  sind möglich …" streichen.
- „### Wie viele Parameter hat ein Spline?": Vorspann auf einen Satz.
- `#die-parameterzaehlung-als-gegenprobe` (refs=0; KERN, Folie „Warum m+q
  Parameter?"): bleibt; die Sätze „Diese Rechnung setzt allerdings voraus …
  liefert das nach." auf einen Satz; letzter Absatz („Beide Wege stützen sich
  …") auf zwei Sätze.
- `#zwei-bedingungen-fehlen-randbedingungen` (refs=1): Tabelle und die
  Sätze davor bleiben (Folie). Der Absatz zum periodischen Fall („Im
  periodischen Fall ist die Wahl … macht sie regulär.", ~90 W, nicht auf der
  Folie, Rang-15-Nachrechnung) auf einen Satz: „Im periodischen Fall zählt
  s(a) = s(b) nicht als Bedingung: Bei periodischen Daten folgt es aus der
  Interpolation, sonst widerspricht es ihr." (Ermessen: die 16×16-Rangzählung
  hat keinen eigenen Lernwert; im Bericht nennen.)
- `#kubischer-spline-durch-vier-punkte`: bleibt (Folie), inklusive Lösung.
  Probe-Absatz auf einen Satz („Die Probe an der Naht x = 1 und an beiden
  Rändern geht auf; das Widget zeigt sie.").
- Interaktiv „Das Zwölf-mal-zwölf-System": „Zwei Beobachtungen." streichen;
  Nachtext auf drei Sätze (Naht unsichtbar; alle zwölf Koeffizienten ändern
  sich; `@bemerkung:bandstruktur-und-aufwand` zeigt, dass eine andere
  Darstellung anders ausgeht).
- „### B-Splines" Vorspann (zwei Absätze): auf einen Absatz von vier Sätzen
  (Monomdarstellung erbt schlechte Kondition, keine Struktur, jeder Koeffizient
  hängt an allen Daten; wir suchen eine bessere Basis mit m+q Funktionen;
  abgeschnittene Potenzen taugen nicht; B-Splines). „Ihr Name kommt von Basis,
  ihre Gestalt von der Rekursion" streichen.
- Absatz nach `#die-b-splines-sind-eine-basis` („Einen Beweis führen wir nicht
  …"): auf zwei Sätze; „(siehe die Vertiefungen)" → „(Vertiefung unten)".
- `#b-splines-in-r` (Folie): Code bleibt. Prosa auf vier Sätze; die
  Boundary.knots-Warnung bleibt HIER (S137 verweist darauf).
- „### Warum B-Splines? Kondition und Aufwand" →
  `#konditionszahlen-eine-groessenordnung` (refs=0; Folie): Tabelle bleibt;
  Prosa auf drei Sätze (illustrativ; κ₁ = 4,4·10¹⁶ gegen 37, gut fünfzehn
  Größenordnungen; bei 10¹⁶ ist keine Stelle sicher, bei 40 kostet es keine
  zwei).
- `#bandstruktur-und-aufwand` (Widget-ref): bleibt; den Absatz „Für die
  Elimination heißt das …" auf zwei Sätze; letzten Satz „Verglichen werden
  dabei Operationszahlen, keine gemessenen Laufzeiten." behalten (ehrlicher
  Vorbehalt).
- „### Eigenschaften": Vorspann auf einen Satz. Absatz nach dem Satz
  („Aussage 2 folgt direkt …") auf drei Sätze.
- `#vorsicht-bei-den-ableitungen` (refs=0; Folie Punkt 3): auf drei Sätze.
- `#was-die-lokalitaet-praktisch-bedeutet` (refs=0): auf einen Absatz von
  vier Sätzen (Messwert verschieben → nur eine rechte Seite und wenige
  Basisfunktionen betroffen; die Lösung koppelt weiter, die Inverse einer
  Bandmatrix ist dicht, der Einfluss fällt mit dem Abstand schnell ab; das
  globale Polynom wirkt dagegen überall, `@sec:polynominterpolation`). Den
  letzten Absatz „Wie stark die Kopplung mit dem Abstand abfällt …" streichen
  (Widget-Kasten und Quiz Q8 tragen die Zahlen).
- Interaktiv „Ein Datenpunkt wandert": bleibt; Nachtext höchstens vier Sätze
  (ist schon so).
- Selbsttest: Q1–Q6, Q8 bleiben (Q2 = Folien-Self-Check F1/F2). Q7 („Für m+q
  B-Splines genügt eine Knotenfolge mit m+q Gliedern"): Stoff verlagert →
  streichen.

### STREICHEN
- Quiz Q7 (siehe oben); letzter Absatz von `#was-die-lokalitaet-praktisch-bedeutet`.

### FEHLER
- keine im engeren Sinn. Der einzige Gedankenstrich der Datei (Interaktiv
  „Ein Datenpunkt wandert", „zu sehen – beim Polynom") ist erlaubt.

### NICHT ANFASSEN
- `#polynom-spline-vom-grad-q`, `#dimension-des-spline-raums` samt
  Vertiefungsbeweis (Truncated-Power-Basis bleibt als Satzaussage, die
  Vertiefung ist schon vorhanden), `#erweiterte-knotenfolge-und-b-splines`
  mit beiden Gleichungs-IDs, `#die-b-splines-sind-eine-basis`,
  `#eigenschaften-von-splines-und-b-splines` (Folie „(B-)Splines:
  Eigenschaften", Quiz Q6, S139 Q6), `#bandstruktur-und-aufwand`
  (Widget-ref), alle Widget-Tags und Imports, R-Code.

---

## S135 (Gruppe 1) · Haupttext 2621 → Ziel ≈ 1 750–1 850 (−30 bis −33 %)

Der höchste EXTRA-Anteil des Kapitels (alter Bericht: 32 %); die Zahl liegt
über dem Richtwert, weil hier zwei Migrationsartefakte (zweiter
Vorkenntniskatalog, Spline-Wiederholung) und eine 430-Wörter-Nachbetrachtung
des Beweises stehen. Der Beweis selbst bleibt vollständig im Haupttext.

### VERLAGERN
- `#was-die-randterme-wirklich-brauchen` (Bemerkung, 430 W, refs=1 aus Quiz
  Q2): Folie führt den Beweis, nicht die Nachbetrachtung. Ganzer Block
  (drei Punkte + Absatz zu a = x₁ und linearer Fortsetzung) in
  `::::vertiefung[Was der Beweis von den Randbedingungen braucht]`
  (`::::vertiefung` > `:::bemerkung`), direkt hinter dem Beweis, vor dem
  Korollar. Quiz Q2 bleibt (aus Schritt 5 des Beweises beantwortbar; der
  Verweis auf das Vertiefungs-Label ist erlaubt). Quiz Q3 bleibt (nur g ∈ C²
  wird gebraucht, steht im Beweis).

### STRAFFEN
- Eröffnung (zwei Absätze): auf einen Absatz von vier Sätzen (bisher linear:
  Basis wählen, System lösen; offene Frage: warum kubisch; Antwort:
  Optimalitätssatz, minimal wiggliness).
- `#was-die-zweite-kapitelhaelfte` (refs=0; zweiter Vorkenntniskatalog im
  selben Kapitel): auf drei Sätze ohne Aufzählung: Kleinste Quadrate und
  Pseudoinverse (`@sec:kq/problem`, `@sec:kq/pseudoinverse`) ab
  `@sec:glaettung`; Glattheitsklassen C² hier, C⁴ in
  `@sec:approximationsfehler`, dazu partielle Integration; Bias-Varianz-
  Zerlegung in `@sec:bias-varianz`. Label und Titel bleiben (Titel darf zu
  „Was von hier an gebraucht wird" werden).
- `#spline` (refs=0 außer Zählertabelle): Wiederholung von
  `@definition:polynom-spline-vom-grad-q`. Auf den Notationsabsatz kürzen:
  ein Satz Erinnerung mit Verweis auf `@sec:splines` (kubischer Spline =
  C²-Funktion aus kubischen Stücken), dann der Absatz „Zur Benennung, weil im
  Satz weiter unten andere Buchstaben stehen: …" unverändert (m = n−1,
  ξ_k = x_{k+1}). Label bleibt.
- „### Krümmung als Zielgröße": Vorspann auf zwei Sätze; Absatz nach der
  Definition („J ist eine Zielfunktion …") auf zwei Sätze; Absatz zur
  geometrischen Krümmung bleibt (Folie), aber auf drei Sätze; „Damit lässt
  sich die Ausgangsfrage präzise stellen." (Vorgeplänkel) streichen, der Rest
  des Absatzes auf zwei Sätze.
- Satz „Im Kern besteht der Beweis aus zwei partiellen Integrationen …"
  (Vorspann des Beweises): auf einen Satz.
- Absatz „@satz:… setzt voraus, dass ein natürlicher kubischer Spline durch
  die Punkte überhaupt existiert …" vor der Abzählungs-Vertiefung: auf zwei
  Sätze (er existiert und ist eindeutig; tridiagonales System, Vertiefung).
- `#drei-punkte-zwei-interpolanten` (Folie): bleibt vollständig inklusive
  Überschuss-Rechnung (Quiz Q4, Schätzfrage 6 + 2t²). Nur den Satz „Die drei
  Eigenschaften prüfen wir der Reihe nach." streichen und den Substitutions-
  Absatz („Im zweiten Integral haben wir u = 2 − x substituiert …") auf einen Satz.
- Interaktiv „Eine ganze Schar von Interpolanten": Vortext von sechs auf drei
  Sätze (Mischung g_t = s + t·h interpoliert für jedes t; t = 0 Spline, t = 1
  Parabel; Farben wie im Text). Nachtext bleibt (zwei Sätze).
- Absatz „Zu beachten ist, was @satz:… *nicht* sagt.": auf zwei Sätze
  (keine Aussage über Approximationsgüte; das klärt `@sec:approximationsfehler`).
- Selbsttest: alle fünf bleiben; Q1-Erklärung auf drei Sätze, Q5 auf zwei.

### STREICHEN
- nichts über das Obige hinaus.

### FEHLER
- Literaturhinweis am Ende: „steht als Satz 7.57 bei Deuflhard und Hohmann,
  Numerische Mathematik 1, @sec:kq/qr; dort findet sich …" – der Verweis
  `@sec:kq/qr` steht mitten in einer Buchangabe und rendert als „Abschnitt
  7.4" (Skript-Abschnitt über QR). Ersetzen durch „Numerische Mathematik 1;
  dort findet sich …" (Verweis streichen).

### NICHT ANFASSEN
- `#kruemmungsfunktional` + `{#eq-kruemmungsfunktional}`, Satz
  `#kubische-splines-haben-minimale` (Widget S135Kruemmung.tsx referenziert
  ihn) samt dem VOLLSTÄNDIGEN Beweis (sieben Schritte, `::why`-Texte,
  `{#eq-eq-13-5-2}`, `{#eq-eq-13-5-3}`) – er steht auf der Folie und ist
  Klausurstoff (ws2526-2 Self-Check F1), Korollar
  `#der-natuerliche-kubische-spline-ist-der`, bestehende Vertiefung
  `#existenz-die-abzaehlung-geht-auf`, Schätzfrage-Props, Widget-Tag.

---

## S136 (Gruppe 2) · Haupttext 2649 → Ziel ≈ 1 800–1 900 (−28 bis −32 %)

### VERLAGERN
- `#welcher-spline-die-konstante-traegt` (Bemerkung, ~330 W, refs=2: Quiz Q3
  und `#vier-staerken-auf-einen-blick` Punkt 4): Folie hat nur das
  Kleingedruckte „Berechnet für den eingespannten Spline-Interpolanten".
  Umsetzung: Im Haupttext bleibt direkt nach dem Satz ein Absatz von drei
  Sätzen ohne Label: Die Konstante 5/384 gilt für den *eingespannten*
  (vollständigen) Spline mit s′(a) = f′(a), s′(b) = f′(b); der *natürliche*
  Spline erzwingt s″(a) = s″(b) = 0, was zu f″ an den Rändern meist nicht
  passt, und erreicht die Ordnung h⁴ dann global nicht; das Beispiel unten
  rechnet deshalb mit dem eingespannten Spline. Der ganze Bemerkungsblock
  (e^x-Raten, x³, Vergleich bei 33/65 Knoten) wandert in
  `::::vertiefung[Natürlicher oder eingespannter Spline: wer die Konstante trägt]`
  (`::::vertiefung` > `:::bemerkung`). Quiz Q3 bleibt (aus dem
  Haupttextabsatz beantwortbar; die Zahl 0,018 darf mit Verweis stehen bleiben).
- `#das-muster-hinter-dem-exponenten` (Bemerkung, ~190 W, refs=0): EXTRA. In
  die bestehende Vertiefung „Wie die Schranke für Geradenstücke entsteht"
  hinter den Beweis anhängen (Fence: die Vertiefung ist `:::::`, die Bemerkung
  darin `:::bemerkung[…]`); Titel der Vertiefung →
  `[Beweis der linearen Schranke und das Muster hinter dem Exponenten]`. Im
  Haupttext bleibt nach dem Satz ein Satz: „Bei Polynomstücken vom Grad q steht
  am Ende h^{q+1} neben der (q+1)-ten Ableitung; für kubische Stücke also h⁴
  neben f⁽⁴⁾, und kein Schritt verlangt einen wachsenden Polynomgrad."

### STRAFFEN
- Eröffnung: „Das holen wir jetzt nach." streichen; auf vier Sätze.
- Absatz „Zwei Details der Definition." nach `#partition-und-gitterweite`:
  auf einen Satz („h ist ein Maximum: Ein einziges breites Teilintervall
  bestimmt die Gitterweite.").
- Absatz nach dem Satz („Die Voraussetzung f ∈ C⁴ verlangt … drei Faktoren
  mit verschiedener Bedeutung.") streichen; die Bemerkung
  `#wie-wir-die-schranke-lesen` beginnt direkt. Punkt 3 auf zwei Sätze.
- Absatz „Wie wichtig Punkt 3 ist, zeigt eine Rechnung mit sin(2πx) …"
  (Quiz Q4 zitiert die Zahlen): auf zwei Sätze.
- „### Woher der Exponent kommt": Vorspann auf zwei Sätze.
- `#buckel-auf-dem-einheitsintervall` (Folie): Tabelle und f⁽⁴⁾-Rechnung
  bleiben. „Zwei Beobachtungen." streichen; erste Beobachtung auf zwei
  Sätze, zweite auf drei Sätze (Faktor 16 stellt sich erst ein, wenn h klein
  gegen die Breite 1/√α ≈ 0,16 ist).
- `#schranke-und-messung-sind-zweierlei` (refs=0): auf einen Absatz von drei
  Sätzen (Schranke gilt für jedes f und jede Partition, Messung für eine
  Funktion auf einem Gitter; Landau-Schreibweise ‖f − s‖∞ = O(h⁴), „vierte
  Ordnung", dieselbe Sprechweise wie bei der Konvergenzordnung iterativer
  Verfahren). Die Verhältniszahlen 0,33 … 0,20 streichen.
- Interaktiv „Vom groben zum feinen Gitter": Vortext auf zwei Sätze;
  Nachtext auf zwei Sätze.
- `#vier-staerken-auf-einen-blick` (refs=0; Folie „Approximation:
  Zusammenfassung"): auf vier Zeilen à ein bis zwei Sätze (Effiziente
  Berechnung: Bandstruktur, tridiagonal, O(n); Stabilität/Lokalität: kompakter
  Träger, gute Kondition; minimale Krümmung: `@sec:minimale-kruemmung`;
  Approximationsfehler O(h⁴) bei passenden Randbedingungen). „Genau so rechnet
  das Widget oben." streichen. Vorspann „Damit sind die theoretischen
  Eigenschaften der Splines beisammen." streichen.
- Überleitungsabsatz „Alle vier Punkte gelten für Interpolation …": auf zwei Sätze.
- Selbsttest: alle sechs bleiben; Q2- und Q6-Erklärungen auf drei Sätze.

### STREICHEN
- nichts über das Obige hinaus.

### FEHLER
- keine gefunden. „Zu beachten ist, was *nicht* gebraucht wird" (in der zu
  verlagernden Bemerkung) bleibt dort, darf aber zu „Kein Schritt verlangt …"
  werden.

### NICHT ANFASSEN
- `#partition-und-gitterweite`, Satz `#approximationsfehler-kubischer-splines`
  (Widget S136Konvergenz.tsx referenziert ihn; 6 Verweise aus S138/S139),
  `#fehler-der-stueckweise-linearen` (Satzaussage, 7 Verweise), die
  bestehende Beweis-Vertiefung, Tabelle des Buckel-Beispiels, Schätzfrage-Props,
  Literaturhinweis.

---

## S137 (Gruppe 2) · Haupttext 3153 → Ziel ≈ 2 200–2 350 (−25 bis −30 %)

### VERLAGERN
- Beweis zu `#glaettung-ist-ein-lineares-kleinste` (sechs Schritte, ~250 W):
  Die Folie stellt das KQ-Problem hin; der Beweis zitiert Kapitel 7
  (Projektion, Normalengleichungen, Pseudoinverse). Satz bleibt, der
  `::::beweis` wandert in `:::::vertiefung[Beweis: Glättung als Kleinste-Quadrate-Problem]`
  (Muster S138). Quiz Q5 sagt „letzter Beweisschritt zu @satz:…" → „(Beweis
  zu @satz:…)". Label/refs (10) unberührt.

### STRAFFEN
- Eröffnung (zwei Absätze): auf einen Absatz von drei Sätzen; „In diesem
  Abschnitt rechnen wir …" streichen.
- `#was-in-der-fehlerannahme-steckt` (refs=0): auf zwei Punkte à zwei Sätze
  (1: f ist der bedingte Erwartungswert, ε reine Streuung; 3: über
  Abhängigkeit und Streuung sagt die Annahme nichts, σ² kommt in
  `@sec:bias-varianz`). Punkt 2 (Identifizierbarkeit über (g+c, ε−c)) auf
  einen Satz in Punkt 1 einfalten oder streichen.
- Absatz „Wie messen wir, ob ein Kandidat … passt?": „wie in Kapitel 7" →
  `@kap:kq` (FEHLER unten). Zwei Sätze nach der RSS-Formel bleiben.
- `#die-aufgabe-ist-so-noch-entartet` (Folie-Kleingedrucktes): auf einen
  Absatz von drei Sätzen plus die zwei Auswege-Punkte (je ein Satz).
- `#ansatzraum-und-designmatrix` (refs=0): Definition bleibt mit Formel;
  den Absatz „Ihre i-te Zeile sammelt …" streichen (steht in S132
  `#was-in-b-steckt-und-was-nicht`); stattdessen ein Halbsatz „(dieselbe
  Matrix wie in `@satz:das-interpolationsproblem-ist-ein`, hier Designmatrix
  genannt)". Der Absatz „Für Splines sind die φ_k die B-Splines … Wir halten
  die beiden Rollen auseinander: x_i Messstellen, ξ_j Knoten" bleibt (wichtig).
- `#wie-wir-das-system-wirklich-loesen` (refs=1): auf vier Sätze
  (Normalengleichungen quadrieren κ, deshalb QR wie in `@kap:kq`, R-Code nutzt
  `qr.solve`; für B-Splines ist der Schaden klein: κ₂ ≈ 5,6 bei K = 10,
  ≈ 65 bei K = 40; Bandstruktur macht BᵀB dünn besetzt).
- `#wann-die-designmatrix-vollen-spaltenrang` (refs=2): auf drei Sätze
  (K ≤ n nötig, aber nicht hinreichend; Schoenberg-Whitney: jede Basisfunktion
  braucht einen eigenen, passend geordneten Datenpunkt; Quantilsknoten
  erfüllen das bis K = n, so macht es `splines::bs()`). Vertiefung bleibt.
- „### Interpolation und Glättung sind derselbe Rahmen": Vorspann auf einen
  Satz. `#interpolation-und-glaettung-im` (refs=1 aus S139 Quiz): erster Teil
  (Residuen verschwinden ↔ Interpolation) bleibt; zweiten Absatz auf zwei Sätze
  (K = n mit invertierbarem B ist der Interpolationsfall; K < n mit vollem Rang
  der Glättungsfall; entscheidend sind Rang, rechte Seite und Strafterm, nicht
  K allein). Den Folgeabsatz „Bei K = n ist B quadratisch …" streichen (jetzt
  doppelt).
- `#warum-interpolation-das-rauschen-erbt` (Folie „f̂ modelliert auch das
  Rauschen"): erster Absatz bleibt; zweiter Absatz auf zwei Sätze (bei K < n
  mittelt jeder Koeffizient über mehrere Beobachtungen; Nachteil: der kleine
  Raum enthält f vielleicht nicht, `@sec:bias-varianz`).
- `#fuenfzig-verrauschte-punkte` (Folie-Beispiel): Tabelle bleibt. Prosa
  danach: σ̂-Erklärung auf einen Satz (ohne die Lack-of-fit-Klausel), „Abstand
  zu f"-Definition bleibt, Schlussabsatz auf zwei Sätze.
- Absatz „Die Tabelle zeigt drei Regime." bleibt (Kernaussage; alter Bericht
  §3), aber auf drei Sätze.
- `#die-residuen-fallen-nicht-immer` (refs=3): auf drei Sätze (geschachtelt:
  monoton; Quantilsknoten wandern → nicht geschachtelt; in unserem Lauf steigt
  RSS bei elf von 36 Schritten). „etwa von K = 6 auf K = 7" bleibt im Quiz Q6.
- Interaktiv „Ein Regler für die Flexibilität": Vortext auf einen Satz (die
  Implementierungsdetails „Cox-de-Boor für die Basis, Normalengleichungen mit
  Cholesky" streichen); Nachtext auf zwei Sätze (Residuen werden im Mittel
  kürzer, während die Kurve immer weniger mit f zu tun hat; untere Tafel
  zeigt die Basis).
- „### Der zweite Weg: strafen statt weglassen": Haupttextabsatz auf drei
  Sätze und dabei die Folienzeile hereinholen (aus der Vertiefung
  übernommen, nichts Neues): „Statt K klein zu halten, minimieren wir
  Σ(y_i − g(x_i))² + λ∫|g″|² dx über allen C²-Funktionen (Glättungsspline,
  Knoten in allen Datenpunkten) oder über einer großen B-Spline-Basis mit K < n
  (Penalized Splines, in R `mgcv::gam()`); der Strafterm ist das
  Krümmungsfunktional aus `@sec:minimale-kruemmung`, und gesteuert wird mit
  λ statt mit K." Die Vertiefung „Glättungssplines und Penalized Splines im
  Detail" bleibt wie sie ist (Definition, Schoenberg-Reinsch, Grenzfälle,
  Ridge-Form); nur `#was-der-strafterm-bewirkt` „Drei Beobachtungen ordnen das
  Kriterium ein." streichen.
- „### Wann welche Methode?": Tabelle bleibt (Folie); Absatz danach auf zwei
  Sätze (dritte Zeile: bei Vorhersage zählt der Abstand zu f, nicht RSS).
- „### Beispiel: Glättung in R": Code bleibt. „Drei Details." streichen;
  Detail 1 auf zwei Sätze; Detail 2 auf einen Satz; Detail 3 auf einen Satz +
  `(@bemerkung:b-splines-in-r)` (Dublette mit S134). Absatz „Ausgaben drucken
  wir hier keine ab …" streichen.
- Selbsttest: Q1–Q6 bleiben (Q2 Folie-Kleingedrucktes, Q6 dup mit Bemerkung,
  aber die Zahlen stehen nur hier → bleibt). Q7 („Für λ → ∞ nähert sich der
  Glättungsspline der KQ-Geraden"): Stoff steht nur in der Vertiefung →
  streichen (oder in die Vertiefung verschieben; Streichen ist einfacher).

### STREICHEN
- Absatz „Bei K = n ist B quadratisch …" (Dublette der Definition);
  Absatz „Ausgaben drucken wir hier keine ab"; Quiz Q7.

### FEHLER
- Getippte Kapitelnummern auf das Skript: „Mit derselben Größe wie in
  Kapitel 7" → „wie in `@kap:kq`"; „weshalb Kapitel 7 die QR-Zerlegung
  vorzieht" → „weshalb `@kap:kq` die QR-Zerlegung vorzieht". („Green und
  Silverman … Kapitel 2" ist Literatur, bleibt.)

### NICHT ANFASSEN
- `#regressionsmodell-mit-additivem-fehler` + Gleichung, RSS-Gleichung
  `{#eq-eq-13-7-2}`, Satz `#glaettung-ist-ein-lineares-kleinste` mit beiden
  Gleichungs-IDs (10 Verweise), Definition `#interpolation-und-glaettung-im`
  (S139 Quiz), Tabelle und Zahlen des Beispiels (Widget S137Glaettung.tsx
  rechnet sie), Schätzfrage-Props (`variante="auswahl"`, `optionen`), Vertiefung
  Schoenberg-Whitney, Vertiefung Penalized Splines (S138 verweist auf sie),
  R-Code, `ref("sec:funktionsapproximation/glaettung")` im Widget (Key bleibt).

---

## S138 (Gruppe 2) · Haupttext 2892 → Ziel ≈ 2 250–2 350 (−19 bis −22 %)

Keine großen Verlagerungen: die drei Beweise stehen schon in Vertiefungen,
und der Abschnitt ist Klausurstoff (ws2526-2: MSE/Varianz/Bias-Skizze, K* bei
wachsendem n und kleinerem σ²).

### VERLAGERN
- nichts.

### STRAFFEN
- Eröffnung: auf vier Sätze; „Dieser Abschnitt macht aus dieser Beobachtung
  zwei Sätze …" streichen.
- `#modell-designmatrix-schaetzer` (Folie): erster Absatz bleibt; zweiter
  Absatz („Zwei Eigenschaften …") auf drei Sätze; „Diese Aufteilung ist die
  Bias-Varianz-Zerlegung in Rohform." bleibt.
- Überschriften „### Bias: der Preis für zu wenige Basisfunktionen" → „Bias:
  zu wenige Basisfunktionen"; „### Varianz: der Preis für zu viele
  Basisfunktionen" → „Varianz: zu viele Basisfunktionen". Vorspann vor dem
  Bias-Satz auf einen Satz.
- `#woran-die-ordnung-haengt` (refs=0): auf drei Sätze (gleichmäßige Knoten,
  f ∈ C⁴, kubische Stücke; sonst andere Ordnung, `@satz:fehler-der-stueckweise-linearen`;
  der Satz mittelt und quadriert, daher K⁻⁸ statt K⁻⁴).
- Vorspann vor dem Varianz-Satz: auf zwei Sätze (der anschauliche Satz „Ziehen
  wir die Daten mehrfach neu …" bleibt, er trägt das Widget).
- `#was-die-varianzformel-erzaehlt` (refs=2): Absatz 1 auf zwei Sätze; Absatz 2
  (Hatmatrix, tr(H) = K, effektive Freiheitsgrade) bleibt (GCV braucht ihn),
  drei Sätze; Absatz 3 (punktweise vs. gemittelt, 5,04 statt 0,036) auf zwei
  Sätze (Quiz Q4 zitiert die Zahl).
- Absatz nach der MSE-Zerlegung („Setzen wir … ein") und `{#eq-eq-13-8-7}`:
  bleibt; den Nachsatz „Der tatsächliche Bias darf unter seiner Schranke
  liegen … an derselben Stelle." auf einen Satz.
- `#heuristisches-balance-modell-fuer-die` (refs=3, Widget): Folie „Die
  (theoretisch) optimale Wahl von K". Bleibt mit Rechnung; kürzen: den Satz
  „Der Exponent 1/9 entsteht aus 8 + 1 …" streichen; „Als rigorose
  Optimalitäts- oder Minimax-Aussage …" auf einen Halbsatz; Ein-Neuntel-Absatz
  auf einen Satz („Im Optimum dieses Modells trägt der quadrierte Bias ein
  Neuntel der Summe, eine Eigenschaft der Potenzform, nicht des MSE."; Quiz
  Q5 braucht ihn); letzter Absatz (n = 100 → K* = 1,67, „rein asymptotisch",
  Folie) auf drei Sätze.
- `#bias-und-varianz-beim-sinusbeispiel` (Folie-Tabelle): Vorspann auf drei
  Sätze; „Zwei Beobachtungen." streichen; Beobachtungen auf drei Sätze.
- `#der-bias-faellt-nicht-monoton` (refs=2): auf einen Absatz von vier
  Sätzen; den zweiten Absatz („Ein Widerspruch … liefen.") auf einen Satz.
- Interaktiv „Zwölf Kurven, drei Balken, ein Regler": Vortext auf zwei Sätze;
  Nachtext auf vier Sätze (Farblegende kurz, weil im PDF nur die Prosa trägt;
  den Satz „Grün steht in beiden Tafeln für dieselbe Sache …" streichen).
- „### Wie wählt man K in der Praxis?": Vorspann auf drei Sätze.
- `#drei-auswege` (Folie): bleibt; AIC/BIC-Formeln bleiben (kurz), „Beide
  gehen auf die Log-Likelihood zurück." streichen.
- `#generalisierte-kreuzvalidierung`: zweiten Absatz auf einen Satz.
- `#warum-der-nenner-noetig-ist` (refs=0): auf drei Sätze (Zähler fällt im
  Trend mit K; Nenner wirkt dem entgegen und stammt aus der Leave-one-out-
  Kreuzvalidierung; je näher K an n, desto stärker die Korrektur). Vertiefung
  „Woher der Nenner kommt" bleibt.
- `#was-die-kriterien-in-unserem-datensatz` (refs=1): auf vier Sätze (GCV
  wählt K = 10, AIC/BIC dasselbe; MSE-Optimum K = 12, Aufschlag rund 30 %;
  die Kriterien schätzen den Fehler, sie kennen ihn nicht).
- `#der-praktische-ausweg-gross-waehlen-und` (refs=0; Folie „Praktisch
  verwendeter Ansatz"): auf einen Absatz von vier Sätzen (K groß, Glattheit
  über Strafterm; P-Splines, additive Modelle, `mgcv::gam()`; Strafparameter
  ist stufenlos und lässt sich mit denselben Kriterien wählen; effektive
  Freiheitsgrade tr(H) sind dann keine ganze Zahl mehr; Details in der
  Vertiefung zu Penalized Splines in `@sec:glaettung`).
- Selbsttest: alle sechs bleiben (Q1 wird das einzige Vorkommen der
  Bias-Monotonie-Frage, S139 Q11 fällt); Erklärungen auf höchstens drei Sätze.

### STREICHEN
- nichts über das Obige hinaus.

### FEHLER
- `#der-praktische-ausweg-gross-waehlen-und`: „Wir wählen es groß, sodass der
  Bias sicher klein ist, und steuert die Glattheit" → „und steuern".

### NICHT ANFASSEN
- Alle drei Sätze (`#der-bias-ist-der-approximationsfehler`,
  `#gemittelte-varianz-eines-linearen` – Widget-ref –,
  `#zerlegung-des-mittleren-quadratischen`) mit ihren Gleichungs-IDs, die drei
  Beweis-Vertiefungen, `{#eq-eq-13-8-7}`, die Rechnung in
  `#heuristisches-balance-modell-fuer-die` (Widget-ref, S139-Verweise),
  Tabelle des Beispiels, `#generalisierte-kreuzvalidierung` mit Gleichung,
  Vertiefung „Woher der Nenner kommt", Schätzfrage-Props.

---

## S139 (Gruppe 2) · Haupttext 3913 → Ziel ≈ 2 900–3 050 (−22 bis −26 %)

### VERLAGERN
- „### Verstreute Punkte ohne Gitter": Der Haupttextabsatz („Tensor-Produkt-
  Basis und additives Modell haben eines gemeinsam … lassen.", ~80 W) leitet
  in ein reines Anhangsfolien-Thema ein (Deck 15, Ausblick `uncounted`:
  „radiale Basisfunktionen"). Überschrift streichen, Absatz als ersten Absatz
  in die bestehende Vertiefung `#radiale-basisfunktionen` verschieben
  (vor die Bemerkung, innerhalb `::::vertiefung`), Vertiefungstitel →
  `[Radiale Basisfunktionen für verstreute Punkte]`. Die Vertiefung rückt
  unter „### Additive Modelle statt voller Produkte" ans Ende dieses
  Unterabschnitts (vor „Splines im maschinellen Lernen").

### STRAFFEN
- Eröffnung: auf drei Sätze.
- `#was-kapitel-9-dazu-schon-gesagt-hat` (refs=0): Titel → „Was das
  Tensorkapitel dazu schon gesagt hat" (FEHLER unten); Inhalt auf drei Sätze
  (Tensorprodukt von Funktionenräumen aus `@sec:tensoren/tensorprodukt`,
  Dimensionen multiplizieren sich zu K^p, Name Fluch der Dimensionalität;
  anschaulich ein Gitter, das mit jeder Variablen um den Faktor K wächst).
- `#es-bleibt-ein-lineares-kleinste-quadrate` (Folie: „A kann wieder durch
  ein gewöhnliches KQ-Problem gefunden werden"): auf vier Sätze; das
  100 000-Beobachtungen-Beispiel bleibt (Quiz Q13).
- „### Der Fluch der Dimensionalität": Vorspann auf zwei Sätze.
- `#zehn-basisfunktionen-je-variable` (Folie-Tabelle): Tabelle bleibt; Prosa
  danach auf zwei Sätze (dezimale Präfixe; Sprung p = 5 → 10 ist Faktor 10⁵).
  GiB-Nebenrechnung streichen.
- Überleitung „Der statistische Preis ist derselbe." → „Der Datenbedarf wächst
  genauso." (Preis-Tell), ein Satz.
- `#was-die-rate-ueber-datenmengen-sagt` (refs=0; Folie-Tabelle): Tabelle
  bleibt; Prosa auf zwei Absätze à drei Sätze (Obergrenze bei K ≍ n^{1/(8+p)},
  nicht Fehler für jedes K; Konstante eins gesetzt, n ≥ 10^{(8+p)/4}; jede
  weitere Variable multipliziert den Datenbedarf mit 10^{1/4} ≈ 1,78). Den
  Rückverweis „in @bemerkung:heuristisches-balance-modell-fuer-die haben wir
  für p = 1 gesehen …" streichen.
- `#auch-die-auswertung-kostet` (refs=0; Folie-Klammer): auf drei Sätze.
- `#der-gewinn-und-was-er-kostet` (refs=1): die beiden Zähl-Absätze
  („*Skalierbar.* …" und „Die geläufige Kurzformel lautet pK …") zu EINEM
  Absatz von vier Sätzen zusammenziehen (pK + 1 Koeffizienten, nach
  Zentrierung p(K−1)+1, für p = K = 10 sind das 91 statt 10¹⁰; Zentrierung,
  weil Konstanten zwischen Komponenten verschiebbar sind). „*Der Preis.*" →
  „*Die Einschränkung.*"; dieser Absatz auf drei Sätze.
- Interaktiv „Zwei Kurven auf logarithmischer Achse": Nachtext auf drei
  Sätze (orange K^p ist im Log-Bild eine Gerade, grün p(K−1)+1 flach; der
  K-Regler kippt die Gerade, weil K in der Steigung sitzt; Werttafel rechnet
  Speicher, Mindest-n und Rate mit). Schätzfrage-Props unverändert lassen
  (Prüfscript, §1).
- Vertiefung „Splines im maschinellen Lernen": KAN-Absatz auf einen Satz mit
  `@bemerkung:interpolation-im-maschinellen-lernen-und` (Dublette mit S131;
  der Block dort bleibt); Normalizing-Flows-Absatz bleibt.
- „### Was vom Kapitel bleibt": Vorspann auf zwei Sätze.
- `#multivariat-kernkonzepte-des-kapitels` (refs=0; die EINZIGE
  Zusammenfassung des Kapitels): neun Punkte bleiben, jeder auf höchstens zwei
  Sätze mit einem Verweis; Ziel ≈ 350 Wörter statt ≈ 600. Konkret: Punkt 1
  ohne die Nebensätze zu „andere Verfahren"; Punkt 3 ohne den farbigen
  `<span>` (Runge-Phänomen als Klartext); Punkt 4 mit einer Zahl (O(Nq²) statt
  O(N³)); Punkt 6 ohne die Zwischenschritte; Punkt 7 auf zwei Sätze; Punkt 8
  auf zwei Sätze (Schranke C₁K⁻⁸, Varianz exakt σ²K/n; K ≍ n^{1/9} unter der
  Proxy-Annahme; Wahl in der Praxis über CV/AIC/BIC/GCV). Zusätzlich in Punkt
  2 einen Satz aus den Stellschrauben aufnehmen: „Der Ansatzraum bestimmt die
  Kurve, das Basissystem nur Koeffizienten, Kondition und Rechenweg, die
  Knotenlage die Güte zwischen den Daten (`@beispiel:dieselbe-funktion-andere-koeffizienten`,
  `@bemerkung:der-ausweg-orthogonalisierte-basen`, `@bemerkung:ein-ausweg-die-knoten-anders-legen`)."
- „### Selbsttest zum Kapitel": Einleitungssatz „Der Selbsttest geht quer
  durch das Kapitel …" streichen. Erklärungen auf höchstens drei Sätze.
- „### Wie es weitergeht" (Folie „Ausblick"): auf drei Sätze.
- „### Schluss": auf vier Sätze (bleibt, Skriptende).

### STREICHEN
- `#drei-stellschrauben-drei-wirkungen` (Bemerkung, refs=0): zweite
  Zusammenfassung; ihr Inhalt geht als ein Satz in Kernkonzepte Punkt 2
  (siehe oben). Block samt Label löschen (nichts verweist darauf; die
  Zählertabelle wird von gen-numbers neu erzeugt).
- Kapitel-Selbsttest Q11 („Mit wachsendem K fällt der quadrierte Bias monoton
  und die Varianz wächst monoton"): Dublette von S138 Q1 (gleiche Zahlen,
  gleiche Begründung). Q4/Q5 (Basiswechsel vs. Ansatzraumwechsel) bleiben,
  sie sind nicht wortgleich mit S132 Q4.
- Überschrift „### Verstreute Punkte ohne Gitter" (Inhalt in die Vertiefung,
  siehe VERLAGERN).

### FEHLER
- Label-Titel mit getippter Kapitelnummer: `(Was Kapitel 9 dazu schon gesagt hat)`
  → `(Was das Tensorkapitel dazu schon gesagt hat)`; ID
  `#was-kapitel-9-dazu-schon-gesagt-hat` bleibt.
- `#additives-modell`: „Für Gaußfehler und die Identitätslink" → „den
  Identitätslink".

### NICHT ANFASSEN
- `#tensor-produkt-basis` + Gleichung, Satz `#eine-mse-obergrenze-im-multivariaten`
  (Widget S139Skalierung.tsx referenziert ihn) mit beiden Gleichungs-IDs und
  seiner Beweis-Vertiefung, beide Tabellen (Folie), `#additives-modell` +
  Gleichung, Vertiefung „Additivität ist mehr als ein Verzicht" (Stone),
  Normalizing-Flows-Absatz, Schätzfrage-Props (Prüfscript-Regex), Kapitel-
  Selbsttest Q1–Q10, Q12–Q15, Literaturhinweis am Ende.

---

## 3. Geschätzte Einsparung am Haupttext

| Datei | vorher | verlagert | gestrafft/gestrichen | nachher (≈) | Δ |
| --- | ---: | ---: | ---: | ---: | ---: |
| S131 | 2082 | 200 | 180 | 1 700 | −18 % |
| S132 | 2386 | 150 | 350–450 | 1 850–1 900 | −20 bis −22 % |
| S133 | 3217 | 150 | 450–500 | 2 570–2 620 | −19 bis −20 % |
| S134 | 3845 | 360 | 550–650 | 2 850–2 950 | −23 bis −26 % |
| S135 | 2621 | 430 | 400–450 | 1 750–1 800 | −31 bis −33 % |
| S136 | 2649 | 520 | 300–350 | 1 780–1 830 | −31 bis −33 % |
| S137 | 3153 | 250 | 600–700 | 2 200–2 300 | −27 bis −30 % |
| S138 | 2892 | 0 | 550–650 | 2 250–2 350 | −19 bis −22 % |
| S139 | 3913 | 80 | 850–950 | 2 900–3 000 | −23 bis −26 % |
| Summe | 26 758 | ≈ 2 140 | ≈ 4 400–5 000 | ≈ 19 850–20 450 | −24 bis −26 % |

Innerhalb des Richtwerts (−20 bis −30 %). S135 und S136 liegen darüber, weil
dort die größten Nachbetrachtungen stehen; wer beim Umsetzen merkt, dass der
Haupttext dünn wird, lässt `#vier-staerken-auf-einen-blick` (S136) bei ~120
Wörtern und `#spline` (S135) bei ~80 Wörtern. Die Vertiefungen wachsen um
≈ 2 100 Wörter; der Gesamtumfang sinkt um ≈ 4 400–5 000 (≈ −15 %), das liegt
über der Vorgabe von 5–10 % Gesamtreduktion – die Editoren dürfen bei den
STRAFFEN-Posten großzügiger bleiben, wenn ein Satz Lesewert hat.

## 4. Offene Fragen für den Bericht an den Dozenten

1. Folienlücke Gram-Schmidt im Funktionenraum / Legendre P₂ (S133), siehe §2.
2. S134: 16×16-Rangzählung zum periodischen Spline gestrichen (Ermessen).
3. S135: Vorkenntnis-Bemerkung und Spline-Erinnerung stark gekürzt, obwohl
   Deck 16 beide Folien hat (im durchlaufenden Skript Migrationsartefakte).
4. S137: Quiz Q7 (λ → ∞) gestrichen, weil der Grenzfall nur in der Vertiefung
   steht; alternativ in die Vertiefung verschieben.
5. S139: `#drei-stellschrauben-drei-wirkungen` aufgelöst (zweite Zusammenfassung).
