# Straffungsplan Kapitel 12 (optim) – Stand 2026-09-25

Planer: Fable. Umsetzung durch zwei Editoren parallel:
**Gruppe 1** = S121, S122, S123; **Gruppe 2** = S124, S125, S126.
Der Brief (`BRIEF.md`) gilt; dieser Plan konkretisiert ihn für Kapitel 12.
Posten sind über Label-ID, Überschrift oder Satzanfang benannt, nie über
Zeilennummern.

## 0. Ausgangslage und Ziel

`node reviews/straffung-2026-09-25/zaehlen.mjs 12-optim` (eingefroren):

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S121 | 3 913 | 1 900 | 5 813 |
| S122 | 3 836 | 321 | 4 157 |
| S123 | 5 356 | 562 | 5 918 |
| S124 | 4 917 | 609 | 5 526 |
| S125 | 2 668 | 0 | 2 668 |
| S126 | 1 768 | 0 | 1 768 |
| Summe | 22 458 | 3 392 | 25 850 |

Richtwert Brief: Haupttext −20 bis −30 %. Ziel dieses Plans: **Haupttext
≈ −4 500 bis −5 600 Wörter (−20 bis −25 %)**, davon ≈ 2 000 verlagert und
≈ 2 500 bis 3 500 echt gestrafft; Vertiefungen wachsen auf ≈ 5 000;
Gesamtumfang ≈ −10 bis −13 %. Die Zahlen je Datei (§3, §4) sind Richtwerte,
keine Quoten: Im Zweifel verlagern statt streichen, und keine Straffung
ausreizen, die einen Gedanken unklarer macht.

Reihenfolge der Arbeit je Datei, wie im Brief: (1) besser schreiben,
(2) straffen, (3) verlagern, (4) streichen.

## 1. Verbindliche Rahmenbedingungen für beide Gruppen

**Folien** (read-only): `/home/user/slides-2627/slides/13-optim-I.qmd`
(S121–S123) und `14-optim-II.qmd` (S124–S126). KERN = steht auf einer
gezählten Folie; Anhangsfolien (`visibility="uncounted"`: Fixpunktiteration,
Beweis globale Optimalität, Momentum-Zusammenfassung) sind EXTRA.

**Externe Abhängigkeiten (geprüft, `grep -rn` über `src/` und
`scripts/verify/`):**

- Aus anderen Kapiteln zeigt nichts auf ein Label dieses Kapitels; nur
  `@kap:optim` und `@sec:optim/beschraenkt` (Abschnitts-`key` bleibt).
- **Widget-TSX** (`src/chapters/12-optim/widgets/*.tsx`) referenziert über
  `ref()/num()` diese Labels; sie dürfen in Vertiefungen wandern, aber nie
  gelöscht oder umbenannt werden:
  `bisektionsverfahren`, `schrittzahl-der-bisektion`,
  `newton-raphson-verfahren-fuer` (Satz + `eq-`), `quadratische-konvergenz`,
  `konvergenzrate-der-fixpunktiteration`, `was-sattelpunkte-fuer-die-verfahren`,
  `nelder-mead-simplexverfahren`, `zu-klein-zu-gross-gerade-richtig`,
  `konvergenzrate-bei-starker-konvexitaet`, `gradientenabstieg-auf-einer-quadrik`,
  `warum-der-satz-eine-schranke-ist-und`, `backtracking-liniensuche-nach-armijo`
  (Algorithmus + `eq-`), `newton-verfahren-fuer-die-optimierung`,
  `das-bfgs-update-erfuellt-die`, `gradientenabstieg-mit-heavy-ball`,
  `notwendige-bedingung-von-lagrange`, `karush-kuhn-tucker-bedingungen`,
  `falsche-konvergenz-und-keiner-warnt`.
- **Prüfscript** `scripts/verify/REV29/12-optim.mjs` liest aus der Prosa nur
  zwei Props: `loesung={0.2}` in S121.mdx und `loesung={336}` in S123.mdx.
  Schätzfrage-Props (`loesung`, `toleranz`, `optionen`, `min/max/schritt`)
  bleiben ohnehin unangetastet; der Prosa-Inhalt von `frage`/`verdeckt` darf
  sprachlich geglättet werden, Zahlen darin nicht.
- **Klausuren** (`fmm-lmu/exams/ws2526-*`, `questions/optimization`): gefragt
  wurden Zickzack/Konditionszahl der Hesse-Matrix, Momentum als Abhilfe,
  Newton löst Quadriken in einem Schritt (Beweis über Taylor 2. Ordnung),
  Newton konvergiert auch zu Sattelpunkten/Maxima, GD 1. Ordnung vs. Newton
  2. Ordnung, Quasi-Newton approximiert diag(H⁻¹) nicht diag(H), GD divergiert
  bei zu großem γ auch bei strikter Konvexität, Newton-Raphson-Herleitung
  (Tangente, Fixpunkt), Lagrange auf einer Geraden (Parallelität der
  Gradienten, Niveaulinien), Eigenwertvorzeichen der Hesse-Matrix,
  Newton vs. GD Kosten (O(n²) Speicher, LGS). Alles davon bleibt im Haupttext.

**Fence-Stufen** (Muster aus dem Kapitel kopieren):
`:::::vertiefung` > `::::beweis` > `:::schritt`; `::::vertiefung` >
`:::beispiel`/`:::satz`/`:::bemerkung`; Vertiefung nur mit Prosa:
`:::vertiefung`. Nach jeder Datei `npm run typecheck:mdx`.

**Nicht anfassen:** IDs, `{#eq-…}`, `:k[…]{#id}`-ids, Imports, Widget-Tags
und Props, Code-Fences, Zahlen, Mathe. Überschriften ohne `:id[…]` dürfen
umformuliert werden. Env-Titel (Text nach der ID) dürfen sich ändern.

**Stil:** Deslop-Profil „Lecture script"; Wir-Form; kein „—"; „ – " höchstens
eins je ~300 Wörter (derzeit null im Kapitel, so lassen); je Widget ein
Lead-in, Auswertung im Kasten 2–4 Sätze mit den Zahlen, die Selbsttests
brauchen; Quiz-Einleitungssätze („Vier Vorschläge.") weg.

## 2. Abschnittsübergreifende Entscheidungen

| Thema | bleibt (einzige ausführliche Stelle) | wird gekürzt auf einen Satz/Halbsatz |
| --- | --- | --- |
| Farbcode des Kapitels | S121 „Was wir mitbringen" (ein Absatz) | S122 Intro-Absatz „Der Farbcode des Kapitels …" **streichen** (Gruppe 1); der Halbsatz zu Violett wandert in @beispiel:der-standardsattel |
| λ ↔ c bei Ridge/Lasso (penalisiert vs. beschränkt) | S125 @beispiel:kkt-stationaritaet-fuer-ridge (selbst gestrafft, Gruppe 2) | S121 @beispiel:optimierungsprobleme-in-statistik-und: Absatz „Zwei Feinheiten" → ein Satz mit Verweis (Gruppe 1) |
| Warum Lasso Nullen erzeugt (Kreis gegen Raute) | S125 @bemerkung:kreis-gegen-raute-warum-lasso-nullen | S121 Beispiel: Geometrie-Absatz („Verletzt der KQ-Schätzer …") → ein Satz mit Verweis auf @sec:beschraenkt |
| `optim()`-Default ist Nelder-Mead, `gr` wechselt nichts | S126 Absatz „Ohne `method`-Argument verwendet `optim()` …" | S123 @bemerkung:wann-sich-nelder-mead-lohnt: R-Codeblock + Folgeabsatz → ein Satz; S124 Tabellen-Bemerkung behält den Halbsatz; S126 Absatz „Ein verbreitetes Missverständnis dazu …" **streichen** |
| Newton-Optimierung = Newton-Raphson für ∇f = 0 | S121 @bemerkung:von-der-nullstelle-zum-minimum (kurz) UND S124 @bemerkung:eine-vorschrift-zwei-spalten (Tabelle + J_g = H_f) – beide Decks bringen es, beides bleibt | S122/S123 nur Verweise |
| GD als Fixpunktiteration | S122 @bemerkung:optimieren-heisst-gleichungen-loesen (Folie 13) und S124 Tabellen-Bemerkung „Drei der vier sind Fixpunktiterationen" (Folie 14) | S123 „Drei Lesarten": Fixpunkt-Absatz auf zwei Sätze |
| Eigenzerlegung von I − γA, optimale Schrittweite, Divergenzgrenze | S123 neue gemeinsame Vertiefung (Satz + Beweis + Zahlenbeispiel) | S121 Fixpunkt-Vertiefung, @bemerkung:das-dilemma-der-schrittweite: Formeln bleiben, Prosa drumherum auf zwei Sätze + Verweis |
| Zickzack bei schlechter Kondition | Leitmotiv, steht auf beiden Decks: bleibt in S121-Widget, S123, S124-Momentum | – |
| Zusammenfassung | **genau eine:** S126 Tabelle „Wann welches Verfahren" (Folie) + @bemerkung:optim-in-r-kernkonzepte-des-kapitels, auf fünf Einzeiler gekürzt | S124 „Vier Verfahren nebeneinander" ist eine Vergleichstabelle der Folie, keine Zusammenfassung: bleibt |
| Selbsttest-Dubletten | S124 Q „Auf einer strikt konvexen quadratischen Funktion trifft Newton …" bleibt | S126 Q „Auf einer strikt konvexen quadratischen Funktion findet das Newton-Verfahren …" **streichen** (wortgleich, gleiche Rechnung 4 − 8/2) |
| Münzwurf-Heuristik für Sattelpunkte | Kapitel 10 (@sec:differentialrechnung/hoehere-ableitungen) | S122: Absatz „Eine hochdimensionale Vorzeichenheuristik" auf ~50 Wörter + Verweis; zugehörige Selbsttestfrage „Im Münzwurfmodell …" **streichen** |
| Folien-Quizfrage ohne Gegenstück im Skript | S123 Selbsttest bekommt die Self-Check-Frage 1 der Folie 13 (siehe §3, S123 FEHLER) | – |

## 3. Gruppe 1: S121, S122, S123

### S121.mdx (Nichtlineare Gleichungen) – Haupttext 3 913 → Ziel ≈ 2 900 (−900 bis −1 100)

**VERLAGERN**

- Beweis zu @satz:schrittzahl-der-bisektion (fünf `:::schritt`, ≈ 380 W) →
  neue `:::::vertiefung[Beweis der Schrittzahlformel]` direkt unter dem
  Satz, Muster wie die Fixpunkt-Vertiefung derselben Datei. EXTRA: Die
  Folie „Bisektionsverfahren" nennt nur die Formel ⌈log₂((b−a)/ε)⌉. Der
  Satz selbst bleibt (Widget-TSX `ref("satz:schrittzahl-der-bisektion")`,
  Selbsttest S121 und S126). Innerhalb des Beweises die `::why`-Texte um je
  einen Nebensatz kürzen.
- Innerhalb der bestehenden `:::::vertiefung[Fixpunktiteration erster Ordnung]`
  (bleibt Vertiefung, Anhangsfolie), Vertiefungs-interne Straffung ≈ −300 W:
  - @bemerkung:das-dilemma-der-schrittweite: Absatz „Wie eng das Fenster ist"
    behält die Formelzeile (γ*, ρ = (κ−1)/(κ+1)) und die Divergenzgrenze
    2/λ_max plus EINEN Verweissatz auf @satz:gradientenabstieg-auf-einer-quadrik;
    die Sätze „Beides steht in … wo hier die Jacobimatrix steht", „Schlechte
    Kondition heißt also wörtlich …" und der Verdopplungs-Satz („Und wer die
    optimale Schrittweite verdoppelt …") entfallen (die Quizfrage darunter
    führt die Verdopplung selbst vor). Absatz „Im Eindimensionalen ist die
    beste Wahl …" **streichen** (Newton mit eingefrorener Ableitung, ohne
    Folge im Skript). Absatz „In der Praxis wählen wir γ_k adaptiv …" auf
    einen Satz mit Verweis auf @sec:nelder-mead-gradient.
  - Absatz „Eine Voraussetzung ist dabei leicht zu übersehen …" auf ≈ 60 W
    (Kern: ρ < 1 verlangt f'(x*) > 0, sonst −f; deshalb „monoton steigend").
  - Widget-Kasten „Die Schrittweite als Regler", Auswertung nach dem Widget
    auf 3–4 Sätze (Eigenwerte 4,618/2,382 und ρ = 0,4045 dürfen weg; Optimum
    2/7 mit 0,319, komplexer Fall 0,894, drittes System ρ = 1,5 bei 0,25
    bleiben).
  - Quiz in der Vertiefung: drei Fragen bleiben, Antworten je um einen Satz
    kürzen.

**STRAFFEN**

- „### Was wir mitbringen" (≈ 330 W → ≈ 130): Streichen „Der zweite Block
  des Skripts … stellen sie kurz zusammen." und die Erläuterung „Beide Teile
  werden gebraucht: Ohne die notwendige Bedingung …". Bleiben: die drei
  Verweise (Gradient mit Zeilenkonvention, Hesse-Matrix, Konvexität) in je
  einem Satz, die Bausteine notwendig/hinreichend (Folie „Vorkenntnisse"),
  der Farbcode-Absatz (einzige Stelle im Kapitel, siehe §2).
- @bemerkung:zwei-probleme-ein-werkzeugkasten: Titel → „Zwei Probleme,
  dieselben Verfahren" (ID bleibt). Text ≈ 230 → ≈ 150: „Wer Nullstellen
  suchen kann … Deshalb steht die Nullstellensuche am Anfang." auf einen
  Satz; Potenzmethode/Splitting-Verweis bleibt.
- @beispiel:optimierungsprobleme-in-statistik-und (≈ 420 → ≈ 250): siehe §2,
  Geometrie-Absatz und „Zwei Feinheiten" auf je einen Satz. Der Hinweis
  auf die p-te Potenz im Strafterm auf einen Satz: „Im Strafterm steht die
  p-te Potenz der Norm; für p = 2 ist das λ‖β‖₂², die Form mit der
  geschlossenen Lösung aus @beispiel:ridge-regression." Mathe unverändert
  lassen (die Nebenbedingungsform steht hier mit ‖β‖_p ≤ c, in S125 mit
  ‖β‖_p^p ≤ c; das ist erklärt und bleibt).
- Quiz „Wann hat f(x) = 0 überhaupt eine Lösung?": Einleitung auf
  „Sei f: [a, b] → ℝ. Welche Aussagen stimmen?"; Antwort 3 ohne den
  Schlusssatz „Diese Aufteilung zeigt der folgende Satz."
- @bemerkung:hinreichend-aber-nicht-notwendig (≈ 100 → ≈ 60): erster Absatz
  bleibt, zweiter auf einen Satz.
- Absatz „Ein Beispiel, das im Rest des Abschnitts wiederkehrt …": bleibt
  (Träger der Zahlen 20 Schritte und 3,3 Schritte je Stelle), letzten Satz
  „Das Verfahren ist zuverlässig und langsam." behalten, Rest straffen.
- @bemerkung:umkehrfunktionen-binaersuche-und-die (≈ 230 → ≈ 110): Umkehr-
  funktion/Quantile zwei Sätze (Folie), Binärsuche ein Satz mit Verweis auf
  @sec:algos/aufwand (EXTRA), „Die Grenze" zwei Sätze (Folie: nur univariat).
- Lead-in vor dem Bisektions-Widget „Zwei Fragen bleiben offen …" auf einen
  Satz.
- Widget-Kasten „Halbieren, Schritt für Schritt": Auswertung (≈ 130 W) auf
  3 Sätze: Schranke exakt für jedes ε; kubisches Beispiel mit drei
  Nullstellen, erster Mittelpunkt entscheidet (f(0) = 1 wie f(2) = 3);
  Eindeutigkeit fehlt ohne strenge Monotonie. Die drei Nullstellen-Zahlen
  dürfen weg (sie stehen im Widget).
- Newton-Einleitung: „nicht nur … sondern auch" ist hier echter Kontrast,
  bleibt.
- @bemerkung:quadratische-konvergenz (≈ 330 → ≈ 200): **streichen** den Satz
  „Die Konstante C ist wesentlich: Zur Merkregel … e₀² = 0,343 steht gegen
  e₁ = 0,086" (hängt an Zahlen der Vertiefung; Haupttext darf nicht von einer
  Vertiefung abhängen). Die drei Vorbehalte auf ≈ 80 W ohne
  „drei Vorbehalte"-Ankündigung; „Wir kommen in @sec:newton-sgd darauf
  zurück" weg.
- Lead-in „Wie stark wirken sich diese Vorbehalte aus …" bleibt (ein Satz).
- Widget-Kasten „Die Tangente als Wegweiser": Auswertung (≈ 160 W) auf
  3–4 Sätze; behalten: Quotient 0,3536, Startpunkt 1,05 mit Sprung nach 4,28,
  Arkustangens-Divergenz jenseits einer Schwelle, „Die Bisektion divergiert
  nicht". Die Fehlerfolge 4,2·10⁻¹ … darf weg.
- @bemerkung:von-der-nullstelle-zum-minimum (≈ 120 → ≈ 80): Formel bleibt,
  „Das ist wörtlich …" → „Das ist @algorithmus:newton-raphson-verfahren aus
  …"; letzter Satz weg (S124 kommt ohnehin).
- Absatz nach der Fixpunkt-Vertiefung „Damit sind die Verfahren für
  Nullstellen beisammen. Für die Optimierung ist allerdings die Monotonie
  problematisch …" (spricht Vertiefungsinhalt an) → ein Satz:
  „@sec:optimalitaet fragt zuerst, was ein Minimum überhaupt auszeichnet."
- Selbsttest Q1 (Bisektion braucht Ableitung): letzten Satz „Dafür kostet
  jede weitere gültige Dezimalstelle …" streichen (Q2 fragt das).
- Deslop-Einzelposten: „wörtlich" (viermal in der Datei) auf höchstens
  einmal; „bezahlt sie mit" entfällt mit dem gestrichenen Absatz.

**STREICHEN**: nur die oben genannten Sätze (Dubletten zu S125, zur
Vertiefung und zum Quiz). Kein Label entfällt.

**FEHLER**: keine kaputten Sätze gefunden. Zahlen (20/10/34 Schritte, 3,32,
0,3536, arctan-Schwelle 1,3917) sind durch REV29 gedeckt, nicht anfassen.

**NICHT ANFASSEN**: Definitionen `nichtlineares-gleichungssystem`,
`unbeschraenktes-und-beschraenktes` (samt Absatz „Beschränkt bedeutet hier
mit Nebenbedingungen"; S122 verliert seine Kopie davon); Satz
`existenz-und-eindeutigkeit-einer` mit Beweis (steht auf der Folie);
Algorithmus `bisektionsverfahren`; Bemerkung `bisektion-robust-implementiert`
(Sieben-Zeiler ist Folienstoff); Vertiefung „Fließkomma-Fallen"; Algorithmus
`newton-raphson-verfahren-fuer`; Vertiefung „Newton-Raphson einmal
vollständig durchgerechnet"; der Absatz zum multivariaten Newton
(J_f-System, Brücke zur Fixpunkt-Vertiefung); Satz und Beweis der
Fixpunktiteration (Anhangsfolie führt die Rechnung); Schätzfragen; Heath-Zeile.

### S122.mdx (Optimalität und Sattelpunkte) – Haupttext 3 836 → Ziel ≈ 2 950 (−800 bis −1 000)

**VERLAGERN**

- Beweis zu @satz:notwendige-bedingung-erster-ordnung (drei `:::schritt`,
  ≈ 300 W) → `:::::vertiefung[Beweis der notwendigen Bedingung erster
  Ordnung]` direkt unter dem Satz. EXTRA: Folie 13 stellt die Bedingung nur
  auf. Satz bleibt (sieben interne Verweise). Die bestehende Vertiefung
  „Beweis der notwendigen Bedingung zweiter Ordnung" verweist mit „wie im
  Beweis von @satz:…" darauf; das funktioniert weiter (klappt die Box auf).
  Nicht zu einer Box zusammenlegen: die beiden Sätze stehen zu weit
  auseinander.

**STRAFFEN**

- „### Vom Nullstellen- zum Optimierungsproblem": die ersten beiden Absätze
  (Rückblick + Ankündigung, ≈ 150 W) auf ≈ 50 W: ein Satz Rückblick, ein Satz,
  was dieser Abschnitt klärt (Optimum, Bedingungen, Konvexität). Farbcode-
  Absatz **streichen** (§2); in @beispiel:der-standardsattel beim ersten
  $\cpurp{\bx^\star}$ ein Halbsatz „(violett: weder Iterierte noch Ziel)".
  „davonläuft" entfällt damit.
- Absätze nach @definition:lokales-und-globales-minimum („Das Problem … hat
  @sec:nichtlineare-gleichungen schon aufgeschrieben …" und „Zwei Hinweise zur
  Schreibweise …", zusammen ≈ 170 W) auf ≈ 60 W: Buchstabenwechsel S → 𝒳
  ein Satz; argmin als Menge ein Satz; die Erklärung „unbeschränkt = ohne
  Nebenbedingungen" **streichen** (steht in S121 bei der Definition); der
  Satz „Die Sätze zur Konvexität unten formulieren wir trotzdem für eine
  allgemeine zulässige Menge …" auf einen Halbsatz.
- @bemerkung:maximieren-ist-minimieren: bleibt (Folie), „die zweite Gleichung
  stand schon in @sec:…" weg.
- „### Die Bedingung erster Ordnung": Einleitung („… Bewiesen haben wir die
  Bedingung selbst an keiner der beiden Stellen … holen wir den Beweis hier
  nach.") nach der Verlagerung auf einen Satz.
- Absatz „Zwei Vorbehalte. Die Bedingung ist notwendig …" (≈ 130 W) auf
  ≈ 60 W ohne Zähl-Ankündigung: notwendig, nicht hinreichend; nur im Inneren,
  am Rand darf der Gradient ungleich null sein (Beispiel f(x) = x auf [0, 1]
  in einem Halbsatz), Rest in @sec:beschraenkt.
- @bemerkung:optimieren-heisst-gleichungen-loesen: bleibt (Folie), zweiten
  Absatz (Normalgleichungen) auf zwei Sätze.
- „### Lokal oder global" (≈ 350 W → ≈ 250): im Absatz „Höchstens eine
  Lösung" die Beweisnacherzählung „der Beweis dort nimmt den Mittelpunkt …"
  streichen; Beispiel e^x bleibt (Existenz).
- @bemerkung:beide-saetze-brauchen-zwei (≈ 200 → ≈ 130): {−1, +1}-Beispiel
  bleibt (Selbsttest hängt daran), Projektionstheorem-Absatz auf zwei Sätze
  (Folie: ein Bullet).
- @beispiel:vier-konvexe-verlustfunktionen (≈ 430 → ≈ 300): Zahlenbeispiele
  **streichen** (Designmatrix mit Eigenwerten 84,34/1,66; zwei identische
  Spalten mit 28/0 → 59/3); Aussagen bleiben: 2XᵀX psd, pd genau bei vollem
  Spaltenrang (Selbsttest), Ridge-Eigenwerte 2(μ_i + λ) > 0 unabhängig vom
  Rang, NLL konkav ⇒ konvexes Problem (Mischverteilung als Gegenbeispiel
  ein Satz), Hinge-Loss konvex, nicht strikt, Knick (Folie). Alles Folie
  „(Non-)Konvexe Optimierung"; die ausführliche Übersicht liegt in 11.5 und
  wird dort bearbeitet, hier nichts ergänzen.
- Absatz nach @definition:sattelpunkt („Ist f zweimal stetig
  differenzierbar … x³ …", ≈ 80 W) auf zwei Sätze.
- Widget-Kasten „Zwei Verfahren am Sattelpunkt": Auswertung ist mit vier
  Sätzen in Ordnung; im `verdeckt`-Text „kriecht in den Sattelpunkt hinein"
  → „läuft in den Sattelpunkt"; im `frage`/Lead-in „Drei Voreinstellungen
  decken die wichtigen Fälle ab." weg.
- @bemerkung:was-sattelpunkte-fuer-die-verfahren (≈ 480 → ≈ 300): „Newton
  läuft hinein" mit der Matrixrechnung bleibt (Selbsttest, Widget-TSX), Prosa
  davor/danach je ein Satz; „Der Gradientenabstieg entkommt" bleibt (Zahlfrage
  1,5 hängt an @eq:was-sattelpunkte-fuer-die-verfahren), „In der Praxis genügt
  schon Rundungsrauschen …" auf einen Satz; „Eine hochdimensionale
  Vorzeichenheuristik" (≈ 160 W) auf ≈ 50 W: Minimum verlangt alle Eigenwerte
  positiv, Sattel nur gemischte Vorzeichen, in hoher Dimension deshalb
  häufiger (Folie), Münzwurf-Faustregel in @sec:differentialrechnung/
  hoehere-ableitungen; der Verweis auf @bemerkung:warum-die-rueckrichtung-
  nicht-gilt darf bleiben oder entfallen.
- Lead-in „Der folgende Satz stellt die Bausteine zusammen …" ein Satz.
- @bemerkung:warum-die-rueckrichtung-nicht-gilt (≈ 150 → ≈ 70): Aussage,
  x⁴-Beispiel, Verweis auf @bemerkung:wenn-die-hesse-matrix-nichts-entscheidet;
  Label bleibt (interner Verweis).
- Absatz unter der Klassifikationstabelle („In der letzten Zeile entscheidet
  …") auf zwei Sätze; diag(1, −1, 0)-Beispiel bleibt als Halbsatz.
- @bemerkung:was-konvexitaet-aus-der-tabelle-macht (≈ 200 → ≈ 100): erster
  Absatz auf drei Sätze (keine Sattelpunkte; stationär ⇒ global, Folien-
  Callout), zweiter Absatz auf zwei Sätze (verschwindender vs. kleiner
  Gradient, Verweis Abbruchkriterien).
- Selbsttest: Frage „Im Münzwurfmodell für Hesse-Eigenwertvorzeichen …"
  **streichen** (§2). Übrige sieben bleiben; Antworten, die eine Bemerkung
  wörtlich wiederholen, um je einen Satz kürzen (Q „Newton umgeht
  Sattelpunkte", Q „strikt konvex, beliebige Menge").
- Deslop: „wo dabei wieder genau das Kleinste-Quadrate-Problem herauskommt"
  → ohne „genau"; „Zwei Hinweise"/„Zwei Vorbehalte"-Ankündigungen weg.

**STREICHEN**: Farbcode-Absatz (bleibt in S121); Zahlenbeispiele im
Verlustfunktionen-Beispiel; Münzwurf-Selbsttestfrage; Erklärung
„unbeschränkt ≠ unbeschränkte Funktion" (bleibt in S121). Kein Label entfällt.

**FEHLER**: keine. (Def. Sattelpunkt ist allgemeiner als die Folie und
korrekt; x³-Beispiel stimmt.)

**NICHT ANFASSEN**: @definition:lokales-und-globales-minimum,
@definition:stationaerer-punkt, @definition:sattelpunkt,
@beispiel:der-standardsattel (Folie, ganz), @satz:bedingungen-erster-und-
zweiter-ordnung samt Tabelle (Folie „Optimalitätsbedingungen: Zusammenfassung";
Teil 2 bleibt, Selbsttest und Rückrichtungs-Bemerkung hängen daran),
Vertiefungen „Warum die quadrierte Norm strikt konvex ist" und „Beweis der
notwendigen Bedingung zweiter Ordnung", Zahlfrage 1,5, Heath-Zeile.

### S123.mdx (Nelder-Mead und Gradientenabstieg) – Haupttext 5 356 → Ziel ≈ 4 000 (−1 200 bis −1 400)

**VERLAGERN**

- **Quadrik-Analyse in EINE Box.** Lead-in („Warum das so ist, lässt sich auf
  einer Quadrik vollständig ausrechnen …"), @satz:gradientenabstieg-auf-einer-
  quadrik, die bestehende Vertiefung „Beweis: Fehlerzerlegung nach
  Eigenrichtungen" und die bestehende Vertiefung „Schranke und tatsächliche
  Rate an einem Zahlenbeispiel" (@beispiel:warum-der-satz-eine-schranke-ist-und)
  → eine `:::::vertiefung[Gradientenabstieg auf einer Quadrik: Fehlerzerlegung,
  Rate und Zahlenbeispiel]` mit `:::satz`, `::::beweis`/`:::schritt`,
  `:::beispiel` darin. EXTRA: der Satz steht auf keiner Folie. Widget-TSX
  (Canyon) und S121-Vertiefung verweisen weiter darauf, Verweise in
  Vertiefungen funktionieren. **Ersatz im Haupttext** (Pflicht, damit das
  Zickzack erklärt bleibt): am Ende von @bemerkung:die-konditionszahl-einer-
  funktion zwei Sätze: „Auf einer Quadrik lässt sich das ausrechnen: Der
  Fehler zerfällt nach den Eigenrichtungen von H_f, jede Richtung hat ihren
  eigenen Faktor 1 − γλ_i. Die Schrittweite muss sich mit γ < 2/L nach der
  steilsten Richtung richten, vorankommen müssen wir aber in der flachsten,
  wo der Faktor 1 − γμ nahe eins liegt." Im Canyon-Kasten den Satz „Bei κ = 10
  und γ = 1/L stehen dieselben Zahlen auf der Tafel …" umschreiben zu: die
  Tafel zeigt den gemessenen Quotienten 0,81 gegen die gestrichelte Schranke
  ρ = 0,9 aus @satz:konvergenzrate-bei-starker-konvexitaet; der Satz ist eine
  obere Schranke. Damit bleibt Selbsttest Q1 (0,81 gegen 0,9) aus dem
  Haupttext beantwortbar.
- **Lipschitz-Feinheiten in EINE Box** nach @bemerkung:lipschitz-stetiger-
  gradient-und-die: `:::vertiefung[Lipschitz-Stetigkeit, Differenzierbarkeit
  und die Spektralnorm]` mit (a) dem Absatz nach @definition:lipschitz-
  stetigkeit ab „Lipschitz-Stetigkeit ist deutlich stärker als bloße
  Stetigkeit …" bis „… Lipschitz-stetig." (|x|, x², kompaktes Intervall),
  (b) dem Herleitungsabsatz „Denn für symmetrische Matrizen ist die
  Spektralnorm …" bis „… in @sec:matrix-spur-norm/eigenschaften.", (c) dem
  zweiten Gegenbeispiel „Im Mehrdimensionalen genügt schon eine
  Sattelrichtung: diag(0,5; −8) … Faktor 16 zu klein." Im Haupttext bleiben:
  die Definition mit dem Intuitionssatz „Die Funktionswerte ändern sich
  höchstens L-mal so schnell wie die Argumente", die Bemerkung mit der
  Gleichung @eq:lipschitz-stetiger-gradient-und-die und dem Absatz „Der Betrag
  ist wesentlich" mit dem Beispiel f(x) = −x² (Selbsttest Q4 hängt daran).
  EXTRA: Folie nennt nur die Äquivalenz mit sup max|λ_i|.

**STRAFFEN**

- „### Wie viel Ableitung darf es sein?" (≈ 150 W → ≈ 60): Rückblick auf zwei
  Sätze; „Diese Einteilung hat praktische Folgen …" in die Bemerkung ziehen.
- @bemerkung:taxonomie-nach-ableitungsordnung: letzten Absatz „Dieser
  Abschnitt behandelt die ersten beiden Zeilen …" **streichen** (Meta).
- Nelder-Mead-Einleitung (≈ 110 → ≈ 70); Absatz „Zwei Bewegungsmuster
  stecken in diesen vier Zügen …" auf zwei Sätze.
- @bemerkung:wann-sich-nelder-mead-lohnt: Tabelle und „Kosten" bleiben
  (Folie); „Garantien" auf einen Satz (McKinnon-Zitat darf als Klammer
  bleiben); „In R" auf einen Satz „Nelder-Mead ist die Voreinstellung von
  `optim()` (@sec:optim-in-r)", R-Codeblock und Folgeabsatz **streichen** (§2).
- Widget-Kasten „Der Simplex bei der Arbeit": Auswertung (≈ 130 W) auf
  3 Sätze (Zähler 23/13/4, kein Schrumpfschritt aus der Voreinstellung,
  Formanpassung ersetzt die Ableitung); alexdowad-Link bleibt.
- Absatz „Das Transponierte gehört dazu …" auf zwei Sätze (Lernrate-Name
  bleibt, Folie).
- @bemerkung:drei-lesarten-desselben-schritts (≈ 330 → ≈ 200): „Steilster
  Abstieg" zwei Sätze; „Abstiegsrichtung" mit Rechnung und den beiden
  Missverständnissen bleibt (Folie sagt das wörtlich); „Fixpunktiteration" zwei
  Sätze, „Alles, was dort über Schrittweiten … schärferer Form" weg.
- @beispiel:gradientenabstieg-von-hand: bleibt (Folie); Schlussabsatz auf
  zwei Sätze (Fehler 2,5/−0,5/0,1/−0,02, Faktor −0,2).
- Widget-Kasten „Die Schrittweite am eindimensionalen Beispiel": Auswertung
  (≈ 70 W) auf zwei Sätze; „Die nächste Bemerkung rechnet diese fünf Fälle
  einmal durch." weg.
- @bemerkung:zu-klein-zu-gross-gerade-richtig: Fallliste bleibt (Widget-TSX
  verweist); Schlussabsatz: die Aufzählung „Das sind genau die fünf Bilder,
  die das Widget oben liefert: bei γ = 0,2 … darüber die Divergenz."
  **streichen** (wiederholt Liste und Widget); Dilemma-Satz und R^n-Ausblick
  bleiben.
- „### Zwischenfrage: ein Schritt im ℝ²": „Vier Vorschläge." weg; Antworten
  bleiben (Folien-Quiz).
- @bemerkung:was-eine-rate-der-ordnung-1-k-praktisch (≈ 200 → ≈ 110): „Zwei
  Feinheiten" ohne Ankündigung; das Beispiel √(1+x²) − x auf den Satz „Der
  Satz setzt voraus, dass ein Minimierer existiert" kürzen (EXTRA, unter der
  Boxgrenze).
- Absätze nach @satz:konvergenzrate-bei-starker-konvexitaet: „Der Gewinn …
  ist groß" bleibt (Folie: exponentiell schneller); „Die Existenz von x* muss
  dieser Satz nicht mehr eigens voraussetzen …" **streichen** (EXTRA);
  „Die Schrittweite gehört dabei zur Rate …" auf einen Satz.
- @bemerkung:die-konditionszahl-einer-funktion: bleibt inkl. Schrittzahlen
  21,9/44,9/229,1 (Selbsttest Q7), plus die zwei Ersatzsätze von oben.
- Widget-Kasten „Zickzack im schmalen Tal": Auswertung auf 3–4 Sätze (siehe
  Umschreibung oben; „mit einem halben Anteil ist das Verfahren nach einem
  Schritt fertig" bleibt).
- „### Wann hören wir auf?": Einleitung auf zwei Sätze.
  @bemerkung:drei-abbruchkriterien-und-ihre-grenzen (≈ 330 → ≈ 220):
  „*Vorsicht.*"-Opener weg; die μ-Schranke und das 10⁻⁸-Beispiel bleiben
  (Selbsttest Q3, Folien-Achtung); „Das zweite Kriterium ist noch schwächer
  …" auf zwei Sätze.
- „### Schrittweitensuche": Einleitung (≈ 130 → ≈ 80), der ρ-Hinweis bleibt
  (Folie). @bemerkung:was-die-armijo-bedingung-fordert (≈ 400 → ≈ 230): „Das
  Vorzeichen" bleibt, „Die geometrische Lesart" drei Sätze, „Warum die
  Schleife endet" auf zwei Sätze (Taylor: linke Seite ≈ φ(0) + γφ'(0) liegt
  wegen c < 1 unter der rechten; endet nach endlich vielen Verkleinerungen),
  „Typische Parameter" bleibt (Folie), „Ausblick" ein Satz.
- Widget-Kasten „Die Armijo-Bedingung am Schnitt": Auswertung (≈ 110 W) auf
  3 Sätze (γ = 0,5 angenommen, exakt wäre 1/3; c = 0,3 braucht zweite
  Halbierung; höchstens 16 Halbierungen).
- Selbsttest: Q5 (Nelder-Mead-Zugzähler) Antwort um den letzten Satz kürzen;
  Q7 bleibt.
- Deslop: „bloße Stetigkeit" → „Stetigkeit" (wandert ohnehin in die Box);
  „nicht nur nach oben, sondern auch nach unten beschränkt" ist echter
  Kontrast, bleibt.

**STREICHEN**: R-Codeblock in der Nelder-Mead-Bemerkung (Dublette zu S126);
Fünf-Bilder-Aufzählung (Dublette zur Liste und zum Widget); Existenz-Absatz
nach dem stark-konvexen Satz; Meta-Absatz der Taxonomie. Kein Label entfällt.

**FEHLER / LÜCKE**

- Die Self-Check-Frage 1 der Folie 13 fehlt im Skript. Im Selbsttest als
  erste Frage ergänzen (nachgerechnet: ∇f(x) = (2x₁, 8x₂), ∇f(2, 1) = (4, 8),
  x⁽¹⁾ = (2, 1)ᵀ − 0,25·(4, 8)ᵀ = (1, −1)ᵀ):
  `:::frage{wahr}` „Für f(x) = x₁² + 4x₂² mit x⁽⁰⁾ = (2, 1)ᵀ und γ = 0,25 ist
  x⁽¹⁾ = (1, −1)ᵀ." mit dieser Rechnung als Antwort (≈ 45 W). Keine Zahl
  erfinden, nur diese.
- Keine kaputten Sätze gefunden.

**NICHT ANFASSEN**: @algorithmus:nelder-mead-simplexverfahren,
@algorithmus:nelder-mead-gradient-gradientenabstieg,
@definition:lipschitz-stetigkeit, @satz:konvergenzrate-bei-konvexem-f,
@definition:starke-konvexitaet mit dem ableitungsfreien Absatz,
@satz:konvergenzrate-bei-starker-konvexitaet,
@algorithmus:backtracking-liniensuche-nach-armijo, Zwischenfrage-Quiz (Folie),
alle Schätzfragen (`loesung={336}` wird geprüft), Heath-Zeile.

## 4. Gruppe 2: S124, S125, S126

### S124.mdx (Newton, Quasi-Newton, SGD) – Haupttext 4 917 → Ziel ≈ 3 700 (−1 100 bis −1 300)

**VERLAGERN**

- @beispiel:newton-auf-einer-nicht-quadratischen (x − 2 ln x, Tabelle,
  e_{k+1} = e_k²/2, ≈ 350 W) → `::::vertiefung[Newton an einer nicht-
  quadratischen Funktion: Zahlenbeispiel]` mit `:::beispiel` darin, unter der
  Überschrift „### Wie schnell das geht" (Überschrift umbenennen in
  „### Newton Schritt für Schritt", sie hat kein `:id`). EXTRA: kein
  Folienbeispiel; die Folie zeigt nur das Bild. Der Widget-Kasten darunter
  verweist zweimal auf das Beispiel; das bleibt (öffnet die Box). Im
  Lead-in des Kastens „sodass sich die Zahlen der Tabelle direkt
  wiederfinden lassen" → „(Zahlentabelle in der Vertiefung)".
- @bemerkung:warum-newton-die-kondition-nicht-spuert: die ersten beiden
  Absätze („In @sec:nelder-mead-gradient hing die Konvergenzrate … hat diese
  Eigenschaft nicht." und „Gemeint ist damit die Zahl der Schritte …
  (@sec:fehler/kondition).", ≈ 140 W) in die bestehende Vertiefung
  „Warum sich der Koordinatenwechsel im Newton-Schritt herauskürzt"
  vorn einfügen; Boxtitel → „Warum Newton die Kondition nicht spürt: affine
  Invarianz". In der Bemerkung bleiben: ein Satz („Newton benutzt die
  Krümmung, statt sie zu schätzen; sein Schritt ist gegen lineare
  Koordinatenwechsel unempfindlich, und schlechte Kondition ist ein
  ungünstiges Koordinatensystem.") und der Kostenabsatz (n(n+1)/2, n², n³,
  10⁸ Einträge: KERN, Folie „Quasi-Newton" und Klausur).
- @bemerkung:was-der-schwung-bewirkt: die Absätze „Aber nicht jedes α hilft"
  (α*, γ*, √κ-Rate, 0,98 gegen 0,82), „Und die Garantie gilt nicht überall"
  (Zyklus-Beispiel, Nesterov) und „Die Verwandtschaft" (Adagrad, RMSprop,
  ADAM) → `:::vertiefung[Optimale Momentum-Parameter und ihre Grenzen]`
  direkt nach der Bemerkung (≈ 250 W). EXTRA: Anhangsfolie „Momentum:
  Zusammenfassung". In der Bemerkung bleiben: „Gleichgerichtete Gradienten
  summieren sich auf" (Faktor 1/(1−α) = 10), „Wechselnde Gradienten mitteln
  sich weg" ohne den Exkurs zum Namen „Dämpfungsfaktor", „Größere Schritte
  sind erlaubt" auf zwei Sätze (Grenze 2(1+α); der Widget-Kasten nutzt sie),
  plus ein Satz: „Bei gut konditionierten Problemen ist der Standardwert
  α = 0,9 zu groß und macht das Verfahren langsamer; das Widget zeigt es."
  Selbsttest Q5 und die Zahlfrage 31 bleiben (aus Kasten und Bemerkung
  beantwortbar); in der Antwort von Q5 darf „Rechnerisch optimal wäre dort
  α* ≈ 0,15" stehen bleiben.
- **Rückverlagerung (Regelverstoß beheben):** @bemerkung:rauschen-mini-batches-
  und-lernraten steht in einer Vertiefung, aber Mini-Batches sind KERN (Folie
  „SGD: In der Praxis Mini-Batches 32–256") und Selbsttest Q6 (√32 ≈ 5,7)
  hängt daran. Neu: Bemerkung im Haupttext mit Titel „Rauschen und
  Mini-Batches" (ID bleibt) und den Absätzen „Kosten und Gewinn" (statt „Der
  Preis und der Gewinn", ≈ 60 W) und „Mini-Batches" (gestrafft auf ≈ 100 W:
  Stapelgröße b, Varianz /b, Standardabweichung /√b, 32 ⇒ 5,7, übliche
  Größen 32–256) sowie einem Satz aus „Warum das wichtig ist" (SGD mit
  Momentum bzw. AdamW als Grundlage des NN-Trainings, Lernratenpläne; Link
  zum MSc-Kurs). Danach `:::vertiefung[Lernraten und Ziehen ohne
  Zurücklegen]` mit dem Absatz „Lernraten" (Σγ = ∞, Σγ² < ∞, γ ~ 1/k,
  Schedules) und dem Absatz „Praxis" (Mischen statt Ziehen) in je zwei
  Sätzen (≈ 90 W). Die alte Vertiefung „Mini-Batches, Lernraten und
  praktische Varianten" entfällt.

**STRAFFEN**

- „### Krümmung statt nur Steigung" (≈ 330 W → ≈ 200): die Diskussion
  @satz:taylorentwicklung-ii vs. @korollar:taylorapproximation-fuer-vektor-zu
  (C² vs. C³) auf einen Satz mit einem Verweis; die Herleitung des
  Gradienten von T₂ bleibt (Folie), der Konventionen-Absatz „Beide Seiten sind
  Zeilenvektoren … ergibt keine Gleichung." auf einen Satz (Folienfehler-
  Korrektur, bleibt sichtbar).
- @bemerkung:was-der-schritt-voraussetzt-und-wie-wir: bleibt (Folie:
  invertierbar, LGS statt Inverse, „Invertiere niemals eine Matrix"), x⁴-
  Beispiel bleibt; um Füllsätze kürzen (≈ −30 W).
- @bemerkung:eine-vorschrift-zwei-spalten (≈ 200 → ≈ 130): Tabelle und
  J_g = H_f bleiben (Folie „Verbindung"); „wie @bemerkung:von-der-nullstelle-
  zum-minimum ihn schon einmal aufgeschrieben hat" weg; „wörtlich" zweimal →
  höchstens einmal.
- Widget-Kasten „Die Parabel am Startpunkt": Auswertung (≈ 90 W) auf 3 Sätze
  (x⁽⁰⁾ = 4 verlässt den Definitionsbereich; −2 → lokales, 2,5 → globales
  Minimum; 1,2 springt nach −25,2 und endet im lokalen Minimum);
  „Bemerkenswert ist" → „Bei x⁽⁰⁾ = 1,2 …".
- @bemerkung:newton-bei-nicht-konvexen-funktionen (≈ 280 → ≈ 180): „Zwei
  Dinge können schiefgehen" ohne Ankündigung; beide Fälle bleiben (Folie,
  Klausur); Absatz „Praktische Fassungen des Verfahrens …" auf zwei Sätze
  (μI addieren, Trust-Region oder Liniensuche erzwingen einen Abstieg; ein
  globales Optimum garantiert das bei nicht-konvexem f nicht).
- @beispiel:ein-zug-statt-vieler: Rechnung bleibt (Folien-Self-Check Q1,
  Klausur); Schlussabsatz auf ≈ 60 W.
- „### Quasi-Newton": die drei Absätze zwischen Algorithmus und Definition
  (≈ 270 W → ≈ 180): „Die Schrittweite γ_k ist dabei notwendig …" zwei Sätze;
  „Der Unterschied zu … ist die Matrix" zwei Sätze; Sekantenbedingung
  1-D → ℝⁿ bleibt (Folie), „unterbestimmt … möglichst wenig abweichen" zwei
  Sätze. Absätze nach der Definition (Krümmung in Richtung s_k; Rang 2)
  bleiben, Folie.
- @bemerkung:eigenschaften-kosten-und-l-bfgs (≈ 330 → ≈ 200): „Symmetrie und
  Definitheit bleiben erhalten" auf ≈ 50 W (Aussage + Krümmungsbedingung
  y_kᵀs_k > 0 sichert Abstiegsrichtung; Liniensuche erzwingt sie); „Kosten",
  „Konvergenz" bleiben; „L-BFGS" auf drei Sätze (Folie), das Zahlenbeispiel
  10⁸ gegen Hunderttausend ein Halbsatz.
- Widget-Kasten „BFGS Schritt für Schritt": Auswertung (≈ 140 W) auf 4 Sätze;
  behalten: Residuum auf Rundungsniveau, γ = 1: f von 15 auf 40 und B nach
  sechs Schritten noch 0,011 von diag(1; 0,2) entfernt (Selbsttest Q3),
  exakte Schrittweite: nach zwei Schritten fertig, n Schritte auf einer Quadrik.
- @bemerkung:wie-die-tabelle-zu-lesen-ist (≈ 330 → ≈ 220): drei Absätze
  bleiben (Folien-Fußnote und Bullets); „dieselbe Abwägung wie bei den
  Splitting-Verfahren" weg; IWLS-Klammer auf einen Halbsatz; R-Halbsatz
  bleibt (§2).
- „### Momentum": Einleitung (≈ 120 → ≈ 80), Kugel-Analogie bleibt (Folie,
  Klausur-Musterlösung).
- Widget-Kasten „Mit und ohne Schwung": Auswertung (≈ 110 W) auf 3–4 Sätze;
  Zahlen 106/31, 103/161, 121/608 und die Grenze 3,8 bleiben (Selbsttest);
  Shiny-Link bleibt.
- „### Stochastischer Gradientenabstieg": Einleitung (≈ 200 → ≈ 130); der
  Satz zu @beispiel:vier-konvexe-verlustfunktionen und Kreuzentropie auf
  einen Halbsatz. Absatz nach der Beweis-Vertiefung („Der Beweis ist kurz,
  aber die Voraussetzung …", ≈ 80 W) auf zwei Sätze (Erwartung nur über den
  Index, kein Modell-Annahme; Folie sagt das in einer Klammer).
- Übergangsabsatz „Damit sind die Verfahren für unbeschränkte Probleme
  beisammen …" **streichen** (S125 beginnt mit eigener Einleitung).
- Selbsttest: acht Fragen bleiben; Antworten Q2 und Q4 um je einen Satz
  kürzen (Q4 wiederholt den Beweis).
- Deslop: „Der Preis und der Gewinn" → „Kosten und Gewinn"; „Bemerkenswert";
  „wörtlich" ×2.

**STREICHEN**: Übergangsabsatz vor dem Selbsttest; Namensexkurs
„Dämpfungsfaktor"; Zahlenbeispiel-Sätze wie angegeben. Kein Label entfällt
(auch `rauschen-mini-batches-und-lernraten` bleibt, nur der Ort wechselt).

**FEHLER**: (1) Selbsttest Q6 hing an Vertiefungsstoff, siehe Rückverlagerung.
(2) Keine kaputten Sätze; Zahlen der Kästen sind durch REV29 gedeckt.

**NICHT ANFASSEN**: @eq:eq-12-4-1 (Alt-ID, so lassen),
@algorithmus:newton-verfahren-fuer-die-optimierung,
@algorithmus:quasi-newton-schritt, @definition:bfgs-update,
@satz:das-bfgs-update-erfuellt-die (bleibt im Haupttext, kurz; Widget-TSX
und Selbsttest) mit bestehender Beweis-Vertiefung, Tabelle „Vier Verfahren
nebeneinander", @algorithmus:gradientenabstieg-mit-heavy-ball,
@eq:eq-12-4-7, @satz:der-gradient-einer-zufaellig-gezogenen mit Beweis-
Vertiefung, @algorithmus:stochastischer-gradientenabstieg-sgd, Schätzfragen,
Heath-Zeile.

### S125.mdx (Beschränkte Optimierung) – Haupttext 2 668 → Ziel ≈ 2 200 (−400 bis −500)

Der Abschnitt ist nahe an den Folien; hier wenig, vor allem verlagern.

**VERLAGERN**

- @satz:kkt-und-konvexitaet mit dem Beweis-Absatz („Der Beweis ist kurz: …
  die letzte Gleichheit die Komplementarität.") und dem Asymmetrie-Absatz
  („Diese Richtung braucht also keine Regularitätsbedingung … steht links
  immer 1.") → `::::vertiefung[KKT-Bedingungen und Konvexität]` mit
  `:::satz` darin (≈ 280 W), an derselben Stelle. EXTRA: die Folien nennen
  KKT nur als notwendig unter Regularität. **Ersatz im Haupttext** vor der
  Box, ≈ 70 W: „Sind f und alle h_j konvex und alle g_i affin, so ist jeder
  KKT-Punkt bereits ein globales Minimum (@satz:kkt-und-konvexitaet), und zwar
  ohne Regularitätsbedingung; die Umkehrung aus @satz:karush-kuhn-tucker-
  bedingungen braucht sie weiterhin." Danach der bestehende Absatz „viele
  statistische Probleme sind konvex: … (@sec:optimalitaet)." gestrafft auf
  zwei Sätze. Selbsttest Q4 und Q5 verweisen auf den Satz (bleibt so); Q5
  („Bei einem konvexen Problem erfüllt das globale Minimum stets die KKT-
  Bedingungen") ist aus dem Ersatzsatz beantwortbar, die Antwort behält das
  x² ≤ 0-Beispiel in einem Satz mit Verweis auf die Vertiefung.

**STRAFFEN**

- @definition:beschraenktes-optimierungsproblem: den Vorspann „… hat das
  beschränkte Optimierungsproblem schon eingeführt. Wir schreiben es jetzt in
  der Form aus, mit der wir rechnen werden:" auf „In der Form von
  @definition:unbeschraenktes-und-beschraenktes, ausgeschrieben:".
- @bemerkung:auch-null-ist-ein-zulaessiger (≈ 110 → ≈ 80): bleibt (Folien-
  fehler-Korrektur), ohne „Naheliegend wäre … Das wäre falsch."-Aufbau:
  direkt: „λ = 0 ist erlaubt: Liegt das unbeschränkte Minimum auf der
  Nebenbedingung, …".
- Absatz „Die Unabhängigkeitsbedingung an die Gradienten ist notwendig …
  y² − x³ …" (≈ 100 → ≈ 70): bleibt (Selbsttest Q1), straffen.
- Widget-Kasten „Höhenlinien, Gerade und zwei Pfeile": Auswertung (≈ 140 W)
  auf 4 Sätze: Parallelität nur an einer Stelle, λ* = −1 in (0,5; 0,5),
  f* = 0,5; die beiden Ungleichungsmodi in je einem Satz (μ = 1 > 0 bindet;
  x + y ≤ 1: unbeschränktes Minimum gewinnt, μ = 0).
- @beispiel:kkt-stationaritaet-fuer-ridge (≈ 260 → ≈ 180): Rechnung bleibt
  (Folie); der λ↔c-Absatz („Das ist die Ridge-Lösung … auch wenn X keinen
  vollen Rang hat.") auf ≈ 80 W: zu jedem λ > 0 mit β̂(λ) ≠ 0 gehört das
  bindende Budget c = ‖β̂(λ)‖₂² mit derselben Lösung (Sonderfall β̂ = 0: c = 0);
  umgekehrt nur, solange die Nebenbedingung bindet, sonst erzwingt die
  Komplementarität μ = 0; die Zuordnung hängt von den Daten ab, eine Formel
  gibt es nicht; für μ > 0 ist XᵀX + μI positiv definit. Das ist die einzige
  ausführliche Stelle im Kapitel (§2); Selbsttest Q4 hängt daran.
- @bemerkung:kreis-gegen-raute-warum-lasso-nullen (≈ 200 → ≈ 140): „Am Regler
  des Widgets lassen sich beide Regime durchfahren." weg (Kasten folgt);
  Subdifferential-Verweis bleibt (Folie „Achtung: nicht differenzierbar").
- Widget-Kasten „Kreis gegen Raute": Auswertung auf 3 Sätze; Schwellen
  1,8358 und 2,5 bleiben.
- Absatz „Sind Ziel und alle Nebenbedingungen affin, heißt die Aufgabe
  lineares Programm … die dieses Skript nicht behandelt." **streichen**
  (kein Lernwert ohne Behandlung; keine Verweise).
- Selbsttest: sechs Fragen bleiben; Q4-Antwort um den letzten Satz kürzen
  („genau deshalb steht die Nichtnull-Voraussetzung im Selbsttest" →
  weg); „genau deshalb" entfällt damit.
- Deslop: Einleitungsabsatz des Abschnitts ist gut, nur „stehen nicht zur
  Disposition" → „sind festgelegt".

**STREICHEN**: LP-Absatz. Kein Label entfällt.

**FEHLER**: keine.

**NICHT ANFASSEN**: @bemerkung:das-optimum-liegt-oft-auf-der, Lagrange-Idee
(Absatz mit den zwei Bullets und der Existenz von λ ∈ ℝ),
@definition:lagrange-funktion, @satz:notwendige-bedingung-von-lagrange,
Heath-Verweis zu hinreichenden Bedingungen (Folie zitiert ihn),
@beispiel:minimieren-auf-einer-geraden (Folie, Klausur), Einleitung zu KKT
(aktiv/inaktiv), @satz:karush-kuhn-tucker-bedingungen,
@bemerkung:komplementaritaet-bindet-oder, @beispiel:eine-box-beschraenkung,
Formelblock penalisiert/beschränkt, Schätzfrage, Heath/Boyd-Zeile.

### S126.mdx (Optimierung in R und Zusammenfassung) – Haupttext 1 768 → Ziel ≈ 1 350 (−350 bis −450)

**VERLAGERN**: nichts (alles Folienstoff oder Zusammenfassung).

**STRAFFEN**

- Einleitungsabsatz: „Die Ausgaben der Aufrufe drucken wir hier nicht ab …
  nicht den Iterationsweg von R." auf einen Satz („Die Ausgaben drucken wir
  nicht ab; die Beispielfunktion rechnet das Widget selbst nach."); die
  Erklärung, dass das Widget mit Gradientenabstieg läuft, steht im
  Widget-Kasten und bleibt nur dort.
- @bemerkung:golden-section-search (≈ 230 → ≈ 120): erster Absatz auf vier
  Sätze (zwei innere Testpunkte im goldenen Schnitt, ein neuer Funktionswert
  je Schritt, Faktor 0,618, verlässlich für unimodale Funktionen mit einem
  Satz, was unimodal heißt); zweiter Absatz (parabolische Interpolation) auf
  zwei Sätze. „Ein bloß eindeutiges …" → „Ein eindeutiges globales Minimum
  allein genügt nicht".
- „### Multivariat: optim": Beschreibung der Testfunktion (≈ 150 → ≈ 80):
  globales Minimum (0; 0) mit f = 0 und zwei lokale Mulden; die Lagezahlen
  (±1,04, ±π/3, ±1,036, f ≈ 0,11) stehen in der Bemerkung darunter und im
  Kasten und bleiben dort. Absatz nach dem Codeblock bleibt (einzige
  ausführliche Stelle zum `optim()`-Default, §2).
- @bemerkung:falsche-konvergenz-und-keiner-warnt (≈ 250 → ≈ 180): „Lokale
  Minima" auf ≈ 70 W, „Abgebrochene Läufe" bleibt (Folie: convergence = 0
  heißt nur Abbruchkriterium erfüllt).
- Lead-in „Wie wirkt sich das aus? Wir probieren es an der Beispielfunktion
  aus." → ein Satz.
- Widget-Kasten: Auswertung (≈ 90 W) auf 3 Sätze (drei Startpunkte, drei
  Ziele; alle enden regulär; Abhilfe nur ein anderer Startpunkt).
- „### Der analytische Gradient": Einleitung auf zwei Sätze (finite
  Differenzen kosten n bzw. 2n Auswertungen und bringen Rundungsfehler mit);
  Beispiel bleibt (Folie).
- „### Wann welches Verfahren": Tabelle bleibt; Absatz „Ein verbreitetes
  Missverständnis dazu …" **streichen** (Dublette zum Absatz unter dem
  ersten `optim()`-Codeblock derselben Datei).
- @bemerkung:optim-in-r-kernkonzepte-des-kapitels (≈ 230 → ≈ 110): fünf
  Einzeiler, je ein Verweis; Formeln e_{k+1} ≈ C e_k², ρ = 1 − μ/L, κ_f = L/μ
  dürfen als Kurzform bleiben. Das ist die einzige Zusammenfassung des
  Kapitels (§2).
- Selbsttest: Frage „Auf einer strikt konvexen quadratischen Funktion findet
  das Newton-Verfahren …" **streichen** (wortgleich mit S124). Übrige sechs
  bleiben; Zahlfrage-Antwort „Beide Läufe enden …" auf einen Satz.
- Deslop: „gilt genau das" → „gilt das"; Kastentitel „Die Landkarte zur
  Beispielfunktion" ist hier wörtlich eine Karte und darf bleiben; wer will,
  nimmt „Die Beispielfunktion als Karte" (Widget-Name `OptimLandkarte`
  bleibt).

**STREICHEN**: Missverständnis-Absatz; Newton-Selbsttestfrage; Widget-
Erklärung in der Einleitung. Kein Label entfällt.

**FEHLER**: keine. (`.Machine$double.eps^0.25 ≈ 1,2·10⁻⁴` stimmt.)

**NICHT ANFASSEN**: beide R-Codeblöcke zu `optimize()`/`optim()`, die drei
„falsche Konvergenz"-Aufrufe, @eq:eq-12-6-1, @beispiel:kettenregel-fuer-die-
beispielfunktion samt `grad_f` (korrigierter Folien-Gradient), Tabelle „Wann
welches Verfahren" (Folie „Wrap-up"), Schätzfrage, Zahlfrage 0,1085,
Literaturzeile.

## 5. Prüfungen, Bericht, Rückgabe

Nach jeder Datei: `cd /home/user/fmm-skript && npm run typecheck:mdx` und
`node scripts/gen-numbers.mjs --check` (nur `FEHLER`-Zeilen zählen). Am Ende
zusätzlich `npm run test:mdx` und `npm run verify:numbers`; für dieses Kapitel
läuft `scripts/verify/REV29/12-optim.mjs` und prüft `loesung={0.2}` (S121) und
`loesung={336}` (S123). Zum Schluss
`node reviews/straffung-2026-09-25/zaehlen.mjs 12-optim`.

Bericht je Gruppe nach `reviews/straffung-2026-09-25/` (Dateiname laut eurem
Auftrag; Vorschlag `12-optim-gruppe1.md`, `12-optim-gruppe2.md`) mit den
sechs Punkten aus Brief §8. Ermessensentscheidungen, die der Dozent sehen
sollte, bitte ausdrücklich nennen: die Verlagerung des Quadrik-Satzes (S123),
des Newton-Zahlenbeispiels (S124) und des KKT-Konvexitäts-Satzes (S125) sowie
die ergänzte Folien-Quizfrage (S123).
