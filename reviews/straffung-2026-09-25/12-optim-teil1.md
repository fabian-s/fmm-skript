# Straffung Kapitel 12 (optim), Gruppe 1: S121, S122, S123

Stand 2026-09-26. Grundlage: `BRIEF.md`, `12-optim-plan.md` §2/§3, Folien
`13-optim-I.qmd`. Vorgängerlauf hatte nichts geändert (git diff gegen 21b998d leer).

## 1. Zahlen (`zaehlen.mjs 12-optim`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S121 | 3 913 → 3 058 (−21,9 %) | 1 900 → 1 924 | 5 813 → 4 982 (−14,3 %) |
| S122 | 3 836 → 2 710 (−29,4 %) | 321 → 587 | 4 157 → 3 297 (−20,7 %) |
| S123 | 5 356 → 4 422 (−17,4 %) | 562 → 813 | 5 918 → 5 235 (−11,5 %) |
| Gruppe 1 | 13 105 → 10 190 (−22,2 %) | 2 783 → 3 324 | 15 888 → 13 514 (−14,9 %) |

S123 bleibt über dem Planwert (≈ 4 000). Was übrig ist, steht auf den Folien
(Zwischenfrage, Kondition, Abbruchkriterien, Armijo) oder trägt einen Selbsttest;
weiter kürzen hätte Klarheit gekostet.

## 2. Verlagert in Vertiefungen

- **S121, Beweis zu @satz:schrittzahl-der-bisektion** → neue
  `:::::vertiefung[Beweis der Schrittzahlformel]` direkt unter dem Satz. EXTRA: Die
  Folie nennt nur die Formel. Der Satz bleibt im Haupttext (Widget-TSX, Selbsttests).
  `::why`-Texte gekürzt.
- **S122, Beweis zu @satz:notwendige-bedingung-erster-ordnung** → neue
  `:::::vertiefung[Beweis der notwendigen Bedingung erster Ordnung]`. EXTRA: Die
  Folie stellt die Bedingung nur auf. Der Rückverweis aus der Vertiefung zur
  zweiten Ordnung („wie im Beweis von …“) funktioniert weiter.
- **S123, Quadrik-Analyse in EINER Box**:
  `:::::vertiefung[Gradientenabstieg auf einer Quadrik: Fehlerzerlegung und Zahlenbeispiel]`
  mit Einleitungssatz, @satz:gradientenabstieg-auf-einer-quadrik, Beweis (vorher
  eigene Vertiefung) und @beispiel:warum-der-satz-eine-schranke-ist-und (vorher
  eigene Vertiefung). EXTRA: Der Satz steht auf keiner Folie. **Ersatz im
  Haupttext:** zwei Sätze am Ende von @bemerkung:die-konditionszahl-einer-funktion
  (Zerfall nach Eigenrichtungen, γ < 2/L richtet sich nach der steilsten Richtung,
  Fortschritt in der flachsten) und die umgeschriebene Auswertung im Kasten
  „Zickzack im schmalen Tal“ (0,81 gegen Schranke ρ = 0,9, obere Schranke).
  Selbsttest Q2 (0,81 gegen 0,9) ist damit aus dem Haupttext beantwortbar.
  Widget-TSX (`S123Canyon`) und die S121-Vertiefung verweisen weiter auf die Labels.
- **S123, Lipschitz-Feinheiten** → neue
  `:::vertiefung[Lipschitz-Stetigkeit, Differenzierbarkeit und die Spektralnorm]`
  nach @bemerkung:lipschitz-stetiger-gradient-und-die: (a) |x| und x² gegen
  Differenzierbarkeit, (b) Herleitung Spektralnorm = betragsgrößter Eigenwert,
  (c) Sattelrichtung diag(0,5; −8), Faktor 16. EXTRA: Die Folie nennt nur die
  Äquivalenz mit sup max|λᵢ|. Im Haupttext bleiben Definition, Intuition, Gleichung
  und „Der Betrag ist wesentlich“ mit f(x) = −x² (Selbsttest).

## 3. Gestrichen oder gekürzt (Auswahl, nach Datei)

**S121.** Vorspann „Der zweite Block des Skripts …“; Erläuterung „Beide Teile werden
gebraucht …“; Satz zur Voraussetzung ∇f ≠ 0 (die Bedingung steht weiter im
Nebensatz); „Wichtiger ist der zweite Zusammenhang“. Im Beispiel
Optimierungsprobleme: Geometrie-Absatz und „Zwei Feinheiten“ je auf einen Satz
(Dublette zu S125), Satz „die unquadrierte Fassung wäre ein anderes Problem“ weg.
Quiz-Einleitung auf eine Zeile, Schlusssatz Antwort 3 weg. Bemerkung
„Hinreichend, aber nicht notwendig“: zweiter Absatz ersetzt (siehe §5).
Umkehrfunktionen/Binärsuche/Grenze auf ≈ 110 Wörter. Lead-in vor dem
Bisektions-Widget auf einen Satz; Nullstellenzahlen aus der Auswertung (stehen im
Widget). Bemerkung „Quadratische Konvergenz“: C-Merkregel-Satz mit
e₀² = 0,343 (hing an der Vertiefung), „drei Vorbehalte“-Ankündigung, Lipschitz-
Nebensatz, „Wir kommen … zurück“. Newton-Kasten: Fehlerfolge 4,2·10⁻¹ … weg.
„Von der Nullstelle zum Minimum“: letzter Satz weg. In der Fixpunkt-Vertiefung:
„Beides steht in …“, „Schlechte Kondition heißt wörtlich …“, Verdopplungssatz,
Absatz „Im Eindimensionalen ist die beste Wahl …“, γₖ-Absatz auf einen Satz,
Eigenwerte 4,618/2,382 und ρ = 0,4045 aus der Kasten-Auswertung, Quiz-Antworten je
ein Satz. Übergangsabsatz „Damit sind die Verfahren … beisammen“ auf einen Satz.
Selbsttest Q1 letzter Satz (Q2 fragt das). „wörtlich“ 4× → 0×.

**S122.** Einleitung (Rückblick + Ankündigung) von ≈ 150 auf ≈ 55 Wörter;
Farbcode-Absatz (bleibt nur in S121, „davonläuft“ entfällt damit); im
Standardsattel „(violett: weder Iterierte noch Ziel)“ ergänzt. Absätze nach der
Minimum-Definition auf ≈ 60 Wörter, Erklärung „unbeschränkt ≠ unbeschränkte
Funktion“ weg (steht in S121). „die zweite Gleichung stand schon …“ weg. Einleitung
„Die Bedingung erster Ordnung“ auf einen Satz. „Zwei Vorbehalte“ ohne Ankündigung
auf ≈ 60 Wörter (Richtungsbedingung ∇f·d ≥ 0 am Rand weg, steht in 12.5).
Normalgleichungen auf zwei Sätze. Beweisnacherzählung „Mittelpunkt zweier
Minimierer“ weg; „Beide Aussagen haben dieselben Voraussetzungen“ weg (Titel der
folgenden Bemerkung sagt es). Projektionstheorem auf zwei Sätze. Verlustfunktionen:
Zahlenbeispiele (84,34/1,66; 28/0 → 59/3) weg. Absatz nach Def. Sattelpunkt auf
zwei Sätze. Kasten: „Drei Voreinstellungen …“ und Verweis-Schlusssatz weg,
„kriecht“ → „läuft“. Sattel-Bemerkung: Newton-Prosa je ein Satz, Münzwurf-Absatz
(≈ 160 W) auf ≈ 45 W mit Verweis auf @bemerkung:praxisrelevanz-der-hesse-matrix.
Rückrichtungs-Bemerkung auf ≈ 60 W, Tabellen-Absatz auf zwei Sätze,
Konvexitäts-Bemerkung auf ≈ 100 W. Selbsttest: Münzwurf-Frage gestrichen (§2 des
Plans), Antworten Max/Min, strikt konvex, Newton je ein Satz kürzer.

**S123.** Einleitung auf zwei Sätze, der „praktische Folgen“-Satz in die
Taxonomie-Bemerkung gezogen; Meta-Absatz „Dieser Abschnitt behandelt …“ weg.
Nelder-Mead-Einleitung und Bewegungsmuster gekürzt. Bemerkung „Wann sich
Nelder-Mead lohnt“: R-Codeblock und Folgeabsatz weg (Dublette zu S126),
„Garantien“ gestrafft (McKinnon bleibt), „Kosten“ um einen Satz kürzer.
Simplex-Kasten: Auswertung auf drei Sätze. Transponiert-Absatz auf zwei Sätze.
„Drei Lesarten“: Steilster Abstieg zwei Sätze, Fixpunkt-Lesart zwei Sätze.
Beispiel von Hand: Schluss auf zwei Sätze. Lead-ins „Der Faktor −0,2 hat einen
einfachen Grund …“, „Die nächste Bemerkung rechnet …“, „Die Beobachtungen ordnen
sich …“ weg. „Zu klein, zu groß“: Fünf-Bilder-Aufzählung weg (Newton-Hinweis in die
Liste gezogen). „Vier Vorschläge.“ weg. Rate 1/k: „Zwei Feinheiten“ ohne
Ankündigung, √(1+x²) − x-Beispiel auf den Existenzsatz gekürzt. Nach dem stark
konvexen Satz: Existenz-Absatz weg, Schrittweiten-Absatz auf einen Satz.
Abbruchkriterien: „*Vorsicht.*“ weg, Einleitung und „zweites Kriterium“ je zwei
Sätze. Schrittweitensuche: Einleitung auf ≈ 85 W. Armijo-Bemerkung auf ≈ 230 W
(Vorzeichen, drei Sätze Geometrie, zwei Sätze Schleifenende, Ausblick ein Satz).
Armijo-Kasten auf drei Sätze. Selbsttest: Q3 ohne zweite Schranke, Q5 ohne
Schlusssatz, Q2 und Q6 je ein Satz kürzer; „Canyon-Widget“ → Kastentitel.

## 4. Reparierte Fehler

- **Handgetippte Skript-Verweise** auf `@…` umgestellt: S121 (Kapitel 11,
  Potenzmethode, Splitting-Verfahren), S122 (3× Kapitel 10, 4× Kapitel 11), S123
  (1× Kapitel 11). Der S122-Link „Kapitel 11 … hat die beiden Antworten schon
  bewiesen“ zeigte auf 11.3; die Sätze stehen in 11.5 → jetzt
  @sec:konvexitaet/konvexe-optimierung. Hinge-Loss/Subgradient jetzt auf
  @satz:operationen-die-konvexitaet-erhalten und
  @definition:subgradient-und-subdifferential, Projektion auf @satz:projektionstheorem.
- S121 „Quadratische Konvergenz“ begann mit „Die letzte Spalte zeigt …“ und
  „der beobachtete Wert“, beides aus der Tabelle in der Vertiefung. Jetzt direkte
  Aussage; eₖ wird im Haupttext definiert.
- S121 Bemerkung „Zwei Probleme“: „Das ist ein nichtlineares Gleichungssystem“ bezog
  sich nach einem Einschub auf die falsche Bedingung; Satzfolge repariert.
- S121 „Sobald f nichtlinear ist, gibt es keine Formel mehr …“ →
  „im Allgemeinen kein Verfahren, das … in endlich vielen Schritten liefert“.
- S121 „Die Iteration divergiert“ (Newton weit weg) → „kann divergieren“.
- Grammatik: S121 „Zwei Details … Die erste/Die zweite“ → „Das erste/Das zweite“;
  „ein voller Halbierungsschritt verschenkt“ → „wäre verschenkt“; „sie lässt sich
  hinschreiben“ (lineare Gleichung) → Auflösen; Kommas „gleichgültig, wo/wie“.
- S122 „hat das Volumen null“ (Gerade im ℝ²) → „hat Maß null“; zwei Doppelpunkte in
  einem Satz der Sattel-Auswertung.
- S123 „derselbe Unterschied wie zwischen linearer und exponentieller
  Fehlerreduktion“ war irreführend (O(ρᵏ) *ist* lineare Konvergenz mit
  exponentiellem Abfall) → Satz erklärt, warum die Rate „linear“ heißt (Folientitel
  und Folienquiz verwenden das Wort).
- S123 Kasten „Schrittweite am eindimensionalen Beispiel“ benutzte L vor seiner
  Definition → „mit der Krümmung L = f″ = 2“.
- S123 Fixpunkt-Lesart verwies auf Vertiefungsstoff aus 12.1 → jetzt auf
  @eq:optimieren-heisst-gleichungen-loesen (Haupttext 12.2) plus Satzverweis.
- **Lücke geschlossen:** Folien-Self-Check 1 (x⁽¹⁾ = (1, −1)ᵀ für x₁² + 4x₂²,
  γ = 0,25) als erste Selbsttestfrage in S123, nur mit der Rechnung der Folie.

## 5. Ermessensentscheidungen und offene Fragen

- **Verlagerung des Quadrik-Satzes (S123)** samt Beweis und Zahlenbeispiel in eine
  Box, mit Ersatzsätzen im Haupttext (siehe §2). Bitte ansehen.
- **Ergänzte Folien-Quizfrage (S123)**, siehe §4.
- S121 „Hinreichend, aber nicht notwendig“: Statt den zweiten Absatz auf einen Satz
  zu kürzen, steht dort jetzt „Für die Verfahren zählt vor allem die
  Existenzhälfte: Stetigkeit und Vorzeichenwechsel garantieren eine Nullstelle;
  Monotonie braucht nur, wer Eindeutigkeit will.“ Das übernimmt die Aussage aus
  Schritt 2 des jetzt verlagerten Schrittzahl-Beweises in den Haupttext.
- S121 Fixpunkt-Vertiefung, Bemerkung „Dilemma“: Der Plan wollte den γₖ-Absatz auf
  einen Satz; dabei entfiel die Korrektur zur Anhangsfolie („in der Praxis
  γₖ → 0“: akzeptierte Liniensuche-Schrittweiten müssen nicht gegen null gehen).
  Die Folie behauptet das weiter; bei Bedarf einen Halbsatz zurückholen.
- S122 Münzwurf: Verweis auf @bemerkung:praxisrelevanz-der-hesse-matrix statt auf
  den Abschnitt (präziser). Die Aussage „Sattelpunkte in hoher Dimension meist
  häufiger“ steht jetzt ohne Zahlen, wie auf der Folie.
- S121 („Wir reden ab jetzt nur noch über Minima“) und S122 (Bemerkung „Maximieren
  ist Minimieren“) sagen dasselbe; beide Folien-Decks bzw. Folienpunkte, deshalb
  beide belassen.
- S123 Armijo-Kasten: „Lehrbuchwert c = 0,3“ auf „c = 0,3“ gekürzt (Quelle für
  „Lehrbuch“ unklar).
- S123 Vertiefungstitel mit Doppelpunkt („Gradientenabstieg auf einer Quadrik:
  Fehlerzerlegung und Zahlenbeispiel“) nach Plan; der Kapitelbestand hatte schon
  „Beweis: Fehlerzerlegung …“.

## 6. Prüfungen (Ende)

- `npm run typecheck:mdx`: 206 Dateien, ohne Fehler.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen, nur „Tabelle ist nicht
  aktuell“ (erwartet). Envs gesamt 669 → 666 zu Beginn/Ende des Laufs; das stammt
  nicht aus diesen Dateien: Labels in S121/S122/S123 vorher und nachher identisch
  (20/18/26), ebenso alle `{#…}`-, `:id`- und Widget-Tags.
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich; „12-optim: alle Prüfungen
  bestanden“ (`loesung={0.2}` in S121, `loesung={336}` in S123 unverändert).
- Gedankenstriche in den drei Dateien: 0.
