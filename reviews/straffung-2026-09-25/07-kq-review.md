# Gutachten Straffung Kapitel 07-kq (S71–S76)

Grundlage: `git diff 21b998d -- src/chapters/07-kq`, alle sechs Dateien im neuen Stand
vollständig gelesen (auch als Haupttext-Dump mit ausgeblendeten Vertiefungen), Folien
`slides-2627/slides/07-kq.qmd` Folie für Folie abgeglichen, Klausuren
(`ws2526-klausur-1` Aufgabe 5 QR/Givens, `questions/lgs/aufgabe1–2`,
`konzeptfragen-entwurf.qmd`) gegengeprüft, Bericht `07-kq.md` gelesen.

## 1. Zahlen (`zaehlen.mjs 07-kq`)

| | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| Ausgangsstand | 10 767 | 1 263 | 12 030 |
| nach Editor | 9 667 (−10,2 %) | 1 761 | 11 428 (−5,0 %) |
| nach Gutachten | 9 681 (−10,1 %) | 1 761 | 11 442 (−4,9 %) |

Der Richtwert (−15 bis −20 %) ist verfehlt. Die Begründung des Editors trägt: Die
Rückholungen sind Folien- bzw. Klausurstoff (S72 Best/Worst Case auf gezählter Folie
und Self-Check F3, S75 Givens-Beweis = Klausur WS25/26-1 Aufg. 5d, S76 Demo-Folien
mit Vorhersagefrage). Ich habe den Haupttext danach auf weiteres EXTRA-Material
abgesucht und keins gefunden, dessen Verlagerung nicht Kernstoff, einen Widget-Kasten
zu Kernthema oder einen Selbsttest träfe. Weiteres Kürzen ginge auf Kosten der
Lesbarkeit; ich habe deshalb nicht nachgelegt.

## 2. Eigene Änderungen (5)

1. **S71, Motivation:** „Die KQ-Methode ist *die* Grundlage von Statistik und Machine
   Learning: Jedes Mal, wenn wir ein lineares Modell an Daten anpassen …" →
   „gehört zu den Grundlagen … mit OLS an Daten anpassen …". Grund: Überbehauptung
   (GLM, robuste Regression sind keine KQ-Probleme); Deslop P0.
2. **S71, Kasten „Wie gut passt die Gerade?":** „an das Minimum über *alle* Paare aus
   Definition … heran" → „an das Minimum heran, das Definition … über *alle* Paare
   verlangt". Grund: Die Umstellung des Editors hatte „aus Definition" an „Paare"
   gehängt.
3. **S73, R-Aufgabe:** „*Aufgabe: Finde den Fehler in der Funktion.*" → „*Wo steckt der
   Fehler in dieser Funktion?*". Grund: du-Imperativ (STYLE: wir-Form); stand schon im
   Ausgangsstand und fiel deshalb im Diff nicht auf.
4. **S75, Eliminationsaufgabe:** „Gegeben $\ba$, finde ein orthogonales $\bQ$" →
   „Gesucht ist zu gegebenem $\ba$ ein orthogonales $\bQ$". Grund wie 3.
5. **S76, „SVD vs. Normalengleichungen":** „keine kleinen positiven Singulärwerte;
   diese verstärkt sie mit $1/\sigma_i$ sogar" → „…: Die Anteile längs der
   zugehörigen Singulärrichtungen verstärkt sie sogar um den Faktor $1/\sigma_i$".
   Grund: Die Pseudoinverse verstärkt nicht die Singulärwerte, sondern die Komponenten
   in deren Richtungen (Präzision; der alte Stand hatte dieselbe Unschärfe).

Keine Zahlen, IDs, Verweise, Widget-Tags oder Formeln verändert.

## 3. Prüfung nach Auftrag

**1. Haupttext-Vollständigkeit (Folien).** Jede gezählte Folie ist im Haupttext
abgedeckt: Vorkenntnisse, Opener F1/F2 (Satz Normalengleichungen, Residuum ⊥ col(A)),
KQ-Definition + Anmerkung, Motivation + Anwendungsliste, die drei Recap-Sätze, Quiz
(S71-Selbsttest), Konditionsdefinition, Kondition bzgl. b und A mit Interpretation
(best/worst/Normalfall), `kq_solve`-Frage mit `solve(M, c)`, Cholesky-Algorithmus mit
$\kappa_2^2\eps_{\text{mach}}$, Orthogonalmatrix-Recap inkl. Normrechnung und
$\sigma_i(\bQ)=1 \Rightarrow \kappa_2(\bQ)=1$, QR-Definition + Anmerkungen,
Gram-Schmidt-Beispiel mit Verifikation, QR-Satz mit Beweis, Givens (inkl.
$-\operatorname{atan2}$) und Householder, SVD-Lösung mit „Warum funktioniert das?",
Demo mit beiden R-Chunks und Vorhersagefrage, Vergleichstabelle, Wrap-up,
Self-Check F1–F4. Alle Vertiefungen gegen die Folien geprüft: Keine enthält Stoff einer
gezählten Folie (die Beweise von 7.1.4/7.1.7, die Minimalnorm-Aussage und der
Householder-Spiegelvektor stehen auf den Folien nur als Behauptung; der Beweis zu
Satz 7.2.3 steht im uncounted Anhang).

**Zuklapp-Test** (Skript `scratchpad/k7r/k7r_zuklapp.py`): Einzige Haupttext-Verweise
auf Vertiefungs-IDs sind die zwei auf @bemerkung:vorzeichenwahl (S75 Z. 304, Quiz
Z. 449); die Regel samt Begründung steht im Satz davor im Haupttext. Widget-`ref()`-Ziele
(u. a. `satz:symmetrie-und-orthogonalitaet`, `bemerkung:vorzeichenwahl` aus dem
Householder-/Auslöschungs-Widget) existieren alle; die Aussagen, die sie tragen, stehen
auch als Satz im Haupttext.

**Selbsttests:** Alle 24 Fragen einzeln gegen den Haupttext geprüft; jede ist ohne
Vertiefung lösbar. **MGS-Hinweis aus dem alten Bericht ist behoben:** MGS steht im
Haupttext (S74 nach dem Gram-Schmidt-Widget) samt der Wachstumsraten klassisch
$\kappa_2^2$ / modifiziert $\kappa_2$; die Selbsttestfrage „rechnen mathematisch
Verschiedenes aus" (Faktor $\kappa_2$) ist damit beantwortbar. Die Vertiefung enthält
nur noch das Läuchli-Widget. Fachlich korrekt (Björck 1967 für MGS, Giraud u. a. 2005
für CGS).

**2. Sinn und Fachlichkeit.** Jede geänderte Stelle mit dem alten Stand verglichen.
Keine verstümmelten Sätze, keine verlorenen Voraussetzungen. Die drei Fachkorrekturen
des Editors (S73 „bestenfalls O(κ²)" → „typischerweise κ²·ε_mach"; S73/Widget
fl(1+ε²)=1 ab ε² ≤ 2⁻⁵³; S76 „fast singulär ⇒ AᵀA singulär" gestrichen) sind richtig.
Die Ersatzsätze nach verlagerten Beweisen (S71 Zerlegung b = b̂ + r, S73
SPD-Argument mit „Spalten linear unabhängig") schließen die Lücken.

Nachgerechnet: Rechenbeispiele S71 (β̂ = (−25/3, 5)), S73 (Cholesky, x̂ = (1/3, 3/2),
Residuum), S76 (A⁺, x̂ = (1, 1)), Zahlfragen S72 (cot 6° = 9,51), S73 (k ≈ 8), S74
(2,2·sin 8° = 0,306), S76 (1,87). R-Demo über das Python-Nachbau-Skript des Editors
erneut ausgeführt: κ₂(A) = 6,6·10⁶, Fehler NE 6,3·10⁻³, QR 4,5·10⁻¹⁰, SVD 8,1·10⁻¹⁰;
die Prosa („etwa 10⁻²", „um 10⁻¹⁰", „7·10⁶") passt.

**3. Übereifer.** Nichts Gutes ersatzlos gestrichen. Die gestrichenen Stücke (zweite
A⁺-Einführung in S72, dritte Zusammenfassung „Für die Statistik ist das zentral" in S76,
Hinweis auf breite Matrizen in S74, die S75-Zahlfrage zu s bei a = (4, 3), die das
Beispiel direkt darüber vorrechnet) sind Dubletten oder EXTRA ohne Lernwert. Keine
Mini-Boxen: Die kleinste der elf Vertiefungen („Die Normalengleichungen aus der
Analysis“) liegt an der 60-Wörter-Grenze, alle sind thematisch geschlossen.

**4. Untereifer.** Grep-Regex aus `german-tells.md` über alle sechs Dateien: nur
„Preis" im Sinne von Kaufpreis (S71). „genau" kommt nur mathematisch vor („genau dann",
„genau eine"). Gedankenstriche: 0 im ganzen Kapitel. Keine getippten Kapitel- oder
Satznummern, keine „Schritt N"-Verweise aus dem Haupttext in Vertiefungs-Beweise,
keine Bindestrich-Zeilenumbrüche. Genau eine Kapitelzusammenfassung (S76).

**5. Syntax.** Fence-Stufen korrekt (äußere Box stets mehr Doppelpunkte). Titel
Klartext. Entfernte IDs: nur `bemerkung-7-2-5` (global gegrept: keine Verweise, auch
nicht in `scripts/verify/` oder Widget-TSX). Konzept-Links: `{#norm}` → `{#matrix-norm}`
(Orchestrator-Vorgabe), neu `{#machine-epsilon}` (S73); in S76 fällt ein
`{#linear-regression}`-Link mit dem gestrichenen Absatz weg, die id bleibt in S71/S73
verlinkt. Alle 51 verlinkten Konzept-ids haben eine Datei in `src/concepts/`.

## 4. Restpunkte und Fragen für den Dozenten

- **Richtwert verfehlt (−10 % statt −15 bis −20 %)**, siehe §1. Mit Begründung
  akzeptiert.
- **Vorzeichenwahl bei Householder** steht als Bemerkung + Auslöschungs-Widget in der
  Vertiefung, die Regel selbst als ein Satz im Haupttext. Soll sie prüfungsrelevant
  sein, gehört die Box zurück (+≈ 200 Wörter).
- **Demo-Beispiel S76** ist unnummeriert (`:::beispiel[(Ein KQ-Problem, drei
  Verfahren)]`), weil eine neue ID ohne `gen:numbers` den Typecheck bricht. Nach dem
  nächsten `gen:numbers` kann es eine ID bekommen.
- **Klausuraufgaben ohne Skriptstoff:** WS23/24-1 (`questions/lgs/aufgabe1`, QR in die
  Normalengleichungen einsetzen → Rx = Qᵀb) und WS23/24-2 (`aufgabe2`, dieselbe
  Reduktion mit der SVD) stehen weder auf den Folien noch im Skript (auch nicht im
  Ausgangsstand). Nicht ergänzt, weil neuer Stoff; ein Satz in S74 bzw. S76 wäre
  möglich, falls gewünscht.
- **Veraltetes Label im Prüfscript:** `scripts/verify/REV29/07-kq-S75Local.mjs` Z. 42
  nennt „Selbsttest S75" für s bei a = (4, 3); die Zahlfrage ist gestrichen, der Wert
  steht jetzt nur im Beispiel. Das Script prüft das TSX und läuft grün; nicht geändert.

## 5. Prüfergebnis (Endstand nach meinen Edits)

- `npm run typecheck:mdx`: grün (206 Dateien).
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`, nur das erwartete „Tabelle ist
  nicht aktuell".
- `npm run test:mdx`: grün (137/137 Fixtures, Orakeltest bestanden).
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte, alle sieben 07-kq-Scripte
  bestätigt (die `\cbblue`-Zeile ist der bekannte Negativtest).
- Headless-MathJax (187 Makros, ohne `noundefined`): 930 Literale in S71–S76,
  0 Fehler, Negativtest greift.
- `npm run lint:numbers`: in 07-kq nichts (einzige Warnung in 09-tensoren, fremde Datei).
