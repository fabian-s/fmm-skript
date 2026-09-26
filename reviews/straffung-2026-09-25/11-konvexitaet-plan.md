# Straffungsplan Kapitel 11 (konvexitaet) – Stand 2026-09-26

Umsetzung durch zwei Editoren parallel: **Gruppe 1** = S111, S112, S113;
**Gruppe 2** = S114, S115. Der Brief (`BRIEF.md`) und die ORCHESTRATOR-Zeile in
`LESSONS.md` gelten; dieser Plan konkretisiert sie für Kapitel 11. Posten sind über
Label-ID, Überschrift oder Satzanfang benannt, nie über Zeilennummern. Jeder Posten
betrifft genau eine Datei und damit genau eine Gruppe.

## 0. Ausgangslage und Ziel

`node reviews/straffung-2026-09-25/zaehlen.mjs 11-konvexitaet` (eingefroren):

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S111 | 2 188 | 739 | 2 927 |
| S112 | 4 209 | 1 199 | 5 408 |
| S113 | 3 181 | 1 320 | 4 501 |
| S114 | 3 250 | 2 617 | 5 867 |
| S115 | 3 265 | 845 | 4 110 |
| Summe | 16 093 | 6 720 | 22 813 |

Richtwert Brief: Haupttext −15 bis −25 %. Dieser Plan landet rechnerisch bei
**≈ −24 bis −30 % (Haupttext ≈ 11 200 bis 12 300)**, davon ≈ 1 100 Wörter nur
verlagert (Vertiefungen wachsen auf ≈ 7 700) und ≈ 3 000 bis 3 600 echt gestrafft;
Gesamtumfang ≈ −13 bis −15 %. Dass es etwas über dem Richtwert liegt, hat zwei Gründe: Das Kapitel
führt eine Aussage (lokal/global, Eindeutigkeit, Existenz) sechsmal und hat zwei
Zusammenfassungen hintereinander, und S113 trägt viel Stoff, der auf keiner Folie
steht. Die Zahlen je Datei (§5) sind Richtwerte. Unterschreitet eine Datei die
Untergrenze ihres Ziels, entfallen die mit **(opt.)** markierten Posten. Nichts über
den Plan hinaus ausreizen.

Reihenfolge je Datei wie im Brief: (1) besser schreiben, (2) straffen, (3) verlagern,
(4) streichen.

## 1. Verbindliche Rahmenbedingungen für beide Gruppen

**Folien** (read-only): `/home/user/slides-2627/slides/12-konvexitaet.qmd`. Gezählt sind
alle Folien bis „Self-Check: Klassifikation"; der „# Anhang" (`visibility="uncounted"`:
Dreieck im ℝ², Schnitt-Beispiel, Beweis Konvexitätserhaltung, Beweisskizze
Projektionstheorem, Beweise der C²-Charakterisierung, Beweis Eigenschaften (ii)+(iv)) ist
EXTRA. Für S115 zusätzlich `13-optim-I.qmd` (gezählt: „Konvexe Funktionen in der
Optimierung", „Strikt konvexe Funktionen", „Optimierungslandschaften", „(Non-)Konvexe
Optimierung in ML & Statistik", Callout in „Optimalitätsbedingungen: Zusammenfassung";
Anhang „Beweis: Globale Optimalität" ist EXTRA) und für den Subgradienten-Teil von S114
`14-optim-II.qmd`, Folie „Exkurs: Subgradienten" (**gezählt**: Existenz, Subgradient
nicht eindeutig, bei Differenzierbarkeit ∇f(x)ᵀ der einzige, LASSO und
Quantilregression, Abbildung |x| mit Subgradienten am Knick).

**ORCHESTRATOR (LESSONS.md, ersetzt den Satz „11.5 behält nur, was Folie
12-konvexitaet trägt"):** Folgender Folienstoff aus 13-optim-I/14-optim-II steht nur in
Kapitel 11, Kapitel 12 verweist nur darauf. Er bleibt im **Haupttext**, Beweise dürfen
Vertiefung sein: @satz:kritischer-punkt-und-globales-minimum,
@definition:strikte-konvexitaet, @satz:hoechstens-eine-minimalstelle, Kasten „Drei
Landschaften nebeneinander", @bemerkung:eine-landkarte-der-optimierungsprobleme, in S114
@definition:subgradient-und-subdifferential und
@satz:existenz-von-subgradienten-im-inneren. Kapitel 12 wird nicht editiert.

**Externe Verweise auf Kapitel 11** (grep über `src/` und `scripts/verify/`):
- Kap. 12 S122: @bemerkung:was-daraus-folgt-und-was-nicht (für „lokal ist global, ohne
  jede Differenzierbarkeit"), @satz:kritischer-punkt-und-globales-minimum,
  @satz:hoechstens-eine-minimalstelle, @satz:projektionstheorem, @eq:projektionstheorem,
  @satz:operationen-die-konvexitaet-erhalten, @definition:subgradient-und-subdifferential,
  @bemerkung:eine-landkarte-der-optimierungsprobleme, @sec:konvexitaet/konvexe-optimierung.
- Kap. 12 S124: @sec:konvexitaet/eigenschaften. Kap. 12 S125:
  @definition:subgradient-und-subdifferential, @sec:konvexitaet/konvexe-optimierung.
- Kap. 1, Kap. 10 und Kap. 12 S121: nur @kap:konvexitaet. Abschnitts-`key`s bleiben ohnehin.

**Widget-TSX-Verweisziele** (`ref()`/`num()` in `widgets/*.tsx`; dürfen in eine
Vertiefung wandern, dürfen nie wegfallen oder umbenannt werden):
`definition:konvexkombination`, `satz:konvexkombinationen-zweier-vektoren`,
`definition:konvexkombinationen-extrempunkt`, `bemerkung:extrempunkt-zu-sein-ist-keine`,
`beispiel:konvexe-huelle-dreier-punkte`, `bemerkung:ein-gewichteter-durchschnitt`,
`definition:konvexe-huelle`, `bemerkung:rand-und-inneres-an-den-gewichten`,
`definition:konvexe-menge`, `bemerkung:was-die-bedingung-verlangt`,
`definition:positiv-semidefinit`, `satz:die-positiv-semidefiniten-matrizen`,
`bemerkung:kovarianzmatrizen-sind-semidefinit-nicht`, `satz:projektionstheorem`,
`satz:kriterium-des-stumpfen-winkels`, `eq:konvexitaet-als-ungleichung`,
`satz:konvexitaet-als-ungleichung`, `bemerkung:wie-wir-die-ungleichung-lesen`,
`definition:strikte-konvexitaet`, `definition:konvexe-funktion`,
`satz:jensen-ungleichung`, `eq:jensen-ungleichung`,
`beispiel:der-erwartungswert-ist-eine`, `beispiel:die-varianz-ist-nicht-negativ`,
`satz:kritischer-punkt-und-globales-minimum`.

**Prüfscript** `scripts/verify/REV29/11-konvexitaet.mjs` liest nur Widget-TSX, keine
MDX. Die Lösungszahlen der `zahlfrage`-Blöcke (`loesung=7`, `0.38`, `0`, `1.891`,
`1.5556`) und alle Widget-Props bleiben unverändert.

**Klausur-Gegenprobe** (`fmm-lmu/exams/`): gefragt wurden Konvexität einer Menge aus der
Definition (genau das Dreieck x, y ≥ 0, x + y ≤ 1; Menge beschränkter Funktionen),
Konvexität einer Funktion aus der Definition (L²-Norm, Einschränkung auf Geraden),
Jensen-Anwendungen (quadratisches und harmonisches Mittel, konkave Umkehrung), strikte
Konvexität über positiv definite Hesse-Matrix, kritischer Punkt einer strikt konvexen
Funktion ist das eindeutige globale Minimum, PSD-Matrizen bilden eine konvexe Menge
(Konzeptfrage), Jensen-Skizze. Alles davon bleibt im Haupttext.

**`:k`-Links, die im Kapitel nur einmal vorkommen** (beim Kürzen erhalten oder mit dem
Absatz verlagern): `condition-number` (S113, κ-Absatz im KQ-Beispiel),
`covariance-matrix`, `symmetric-matrix`, `subspace` (S112), `orthonormal-basis` (S114,
Spektrum), `neighborhood` (S115, wandert mit V1 in die Vertiefung), `level-sets`,
`taylor-theorem` (schon in Vertiefungen), `gaussian-mixture-model`, `neural-network`
(S115, Übersicht).

**Fence-Stufen** (Muster aus dem Kapitel): `:::::vertiefung` > `::::beweis` >
`:::schritt`; `::::vertiefung` > `:::beispiel`/`:::bemerkung`/`:::interaktiv`; reine
Prosa: `:::vertiefung`. Quiz in einer Vertiefung (S115, V3): `:::::vertiefung` >
`::::quiz` > `:::frage{…}` (Muster: Fixpunkt-Vertiefung in `12-optim/S121.mdx`). Die
Öffnungszeile braucht die Titelklammer `[…]`, sonst zählt `zaehlen.mjs` falsch. Nach jeder
Datei `npm run typecheck:mdx` und `node scripts/gen-numbers.mjs --check` (nur
`FEHLER`-Zeilen zählen).

**Nicht anfassen:** IDs, `{#eq-…}` (auch das Altlabel `{#eq-eq-11-3-2}`), `:k[…]{#id}`-ids
(Linktext darf sich ändern), Imports, Widget-Tags und Props, Zahlen, Mathe. Env-Titel
(Text nach der ID) und Vertiefungstitel dürfen sich ändern. Keine getippten Nummern im
Kapitel (nur Boyd-Buchkapitel, die bleiben).

**Haupttext darf nicht auf Beweisschritte in Vertiefungen zeigen.** Betroffen sind
S113 (Projektions-Kasten „nach Schritt 5 des Beweises", Bemerkung zum symmetrischen
Anteil „wie Schritt 2 zeigt"), S114 (@bemerkung:wo-die-voraussetzungen-stecken, Absatz
nach der Subgradienten-Definition) und S115 (@bemerkung:was-daraus-folgt-und-was-nicht).
Die Posten unten reparieren das; danach mit `grep -n "Schritt [0-9]"` gegenprüfen, dass
jeder Treffer außerhalb einer Vertiefung auf einen Beweis im Haupttext zeigt.

**Stil:** Deslop-Profil „Lecture script"; Wir-Form; im Kapitel steht derzeit kein
Gedankenstrich, so lassen. Hauszeichen dieses Kapitels (vor Abschluss je Datei
greppen): „wörtlich" (9×, nur behalten, wo etwas wirklich wörtlich übereinstimmt),
„Zum Schluss/Zum Abschluss", „Drei Details/Zwei Fragen/Zwei Sonderfälle/Zwei
Einschränkungen"-Ankündigungen, „Baukasten", „Bemerkenswert". „genau" ist in diesem
Kapitel fast immer mathematisch („genau die Punkte") und bleibt dann. Je Widget ein
Lead-in; Auswertung im Kasten 2–4 Sätze, mit den Zahlen, die Selbsttests brauchen.

## 2. Abschnittsübergreifende Entscheidungen

| Thema | bleibt (einzige ausführliche Stelle) | andere Stellen | Gruppe |
| --- | --- | --- | --- |
| Lokal ist global / Eindeutigkeit nur bei strikter Konvexität / Existenz ist eigene Frage | S115: @satz:kritischer-punkt-und-globales-minimum, @satz:hoechstens-eine-minimalstelle, @bemerkung:drei-aussagen-die-auseinanderzuhalten (gekürzt) | S111 Absatz „Vorsicht bei Formulierungen …" → ein Satz mit Verweis; S111 Selbsttestfrage „Ist ein Optimierungsproblem konvex …" **streichen**; S113 Bemerkung „Wie wir die Ungleichung lesen", Schlusssatz → Verweis; S113 Selbsttest e^x, Existenzsatz **streichen** | G1 |
| dito | – | S115 @bemerkung:was-daraus-folgt-und-was-nicht Punkt „Nicht folgt …" → ein Satz mit Verweis; S115 Selbsttest „Jede strikt konvexe Funktion …" ohne Logistik-Satz | G2 |
| Varianz am fairen Würfel (91/6, 12,25, 35/12) | S111 @beispiel:der-erwartungswert-ist-eine (Widget S114Jensen zitiert dieses Beispiel mit 35/12) | S114 @beispiel:die-varianz-ist-nicht-negativ: Würfel auf einen Satz; S115 Selbsttest Jensen: Würfelzahlen durch Verweis ersetzen | G1 / G2 |
| Nachweis braucht alle Paare, Widerlegung ein Paar | S112 @bemerkung:was-die-bedingung-verlangt, dritter Absatz (Widget-TSX verweist) | S113 Sehnen-Kasten: ein Satz mit Verweis; S113 Lead „Nachweis von Hand" ohne Wiederholung; S113 Zahlfrage 1,891 ohne „Zum Vergleich …" | G1 |
| Betrag konvex, aber nicht strikt (Gleichheit bei gleichem Vorzeichen) | S113 Absatz nach dem Betrags-Beweis (Folien-Self-Check „Klassifikation") | S113 Absatz nach `<KonvexKonkavPanels />` und Sehnen-Kasten: Betrags-Satz streichen | G1 |
| „strikt konvex" einführen | informell S113 @bemerkung:wie-wir-die-ungleichung-lesen (mit dem Hinweis „strikt/streng", bleibt); formal S115 @definition:strikte-konvexitaet (Kap. 12) | S115 Absatz nach der Definition: Zweitbezeichnung weg, Verweis auf S113 | G1 hält / G2 kürzt |
| Q = (1 5; −5 1): nur der symmetrische Anteil zählt | S113 @bemerkung:warum-der-symmetrische-anteil (gekürzt) | S115 Selbsttest „Die quadratische Funktion f(x) = xᵀQx ist genau dann konvex …": Antwort zwei Sätze mit Verweis | G1 / G2 |
| Hesse-Matrix der Quadrik H = Q + Qᵀ | S114 @beispiel:quadratische-funktionen-mit-dem | S113 Schlussabsatz „An der quadratischen Form hängt mehr …" **streichen** | G1 |
| KQ konvex, strikt nur bei vollem Spaltenrang; Ridge strikt für λ > 0 | S113 @beispiel:kleinste-quadrate-und-ridge (Folie) | S114 Bausteine-Beispiel Ridge zwei Sätze; S115 drei-aussagen und Selbsttest „f₁ + f₂" je ein Satz; S115 Übersicht knapp mit Verweis | G2 |
| Subdifferential des Betrags, ∂\|x\|(0) = [−1, 1] | S114 Haupttext nach der Definition (Folienabbildung) + @beispiel:das-subdifferential-des-betrags (Vertiefung) | S115 „Und ohne Ableitung?" nur Verweis; S115 Selbsttest „Im Knick x = 0 …" **streichen** | G2 |
| Extrempunkt, zwei Fassungen | S111 @definition:konvexkombinationen-extrempunkt (Folie), S112 @definition:konvexe-mengen-extrempunkt (für Simplex und Extrempunkt-Satz) | S111 @bemerkung:extrempunkt-zu-sein-ist-keine, zweiter Absatz → ein Satz Vorverweis; S112 Lead → ein Satz Rückverweis | G1 |
| conv(X) als kleinste konvexe Obermenge | S112 @satz:konvexe-huelle-als-durchschnitt mit Beweis (Folie führt den Beweis) | S111 @bemerkung:die-kleinste-konvexe-obermenge → Folienaussage + Verweis; S112 Lead ein Satz | G1 |
| Strecke = Konvexkombination zweier Punkte → Definition konvexe Menge | S112 @bemerkung:was-die-bedingung-verlangt, erster Absatz | S111 Absatz „Eine Menge wird *konvex* heißen …" **streichen** | G1 |
| **Zusammenfassung** | **genau eine:** S115 Tabelle „Das Wichtigste in Kürze" (entspricht Folie „Wrap-up") | S115 „### Die Kernkonzepte des Kapitels" samt @bemerkung:fuenf-bausteine-die-bleiben und der Satz „Zusammengefasst: …" **streichen**; „### Nächstes Kapitel" auf zwei Sätze | G2 |

Keine Selbsttestfrage ist wortgleich mit einer anderen; gestrichen werden nur die drei
oben genannten Dubletten und eine Frage zu einem behobenen Folienfehler (S114).

## 3. Gruppe 1: S111, S112, S113

### S111.mdx (Konvexkombinationen und konvexe Hülle) – Haupttext 2 188 → Ziel ≈ 1 700–1 850

**VERLAGERN (hier: Kern zurückholen)**

- Kasten `:::interaktiv[Konvexkombinationen zum Schieben]` (`<KonvexkombinationsExplorer />`)
  aus der Vertiefung „Die konvexe Hülle dreier Punkte ausführlich berechnet" **in den
  Haupttext**, ans Ende von „### Zwei Punkte: das Liniensegment" (nach dem Absatz „Der
  Parameter λ misst …"). KERN: Folien „Konvexkombinationen" (Definition, gewichteter
  Durchschnitt) und „Konvexkombinationen" (Abbildung Liniensegment); `:::interaktiv`-Kästen
  zu Kernthemen gehören in den Haupttext. Titel → „Konvexkombinationen im Dreieck"
  („zum Schieben" ist ein Tell). Prosa im Kasten:
  - Lead-in ein Satz: welche Punkte der Ebene Konvexkombinationen der drei Ecken sind
    und woran die Gewichte zeigen, ob der Punkt innen, auf einer Kante oder in einer
    Ecke liegt.
  - Auswertung 2–3 Sätze: Der grüne Punkt verlässt das Dreieck nie, weil die Gewichte
    nichtnegativ sind. Wird ein Gewicht null, bleibt die Konvexkombination zweier Ecken,
    nach @satz:konvexkombinationen-zweier-vektoren also ihr Liniensegment. Die Regler
    geben unnormierte Werte, geteilt wird durch ihre Summe; nur alle drei auf null ist
    nicht definiert.
  - Der Absatz „Die gestrichelte Hilfsstrecke zeigt, warum …" mit der
    `\underbrace`-Formel und dem Satz „Vorausgesetzt ist dabei w₂ + w₃ > 0 … für die
    Hülle brauchen." bleibt in der Vertiefung, als Schlussabsatz nach
    @bemerkung:rand-und-inneres-an-den-gewichten, eingeleitet mit „Die gestrichelte
    Hilfsstrecke im Konvexkombinations-Widget zeigt, …" (EXTRA: Induktionsidee; Beweis
    steht in S112).
  - Die Vertiefung behält `::::vertiefung`, @beispiel:konvexe-huelle-dreier-punkte und
    @bemerkung:rand-und-inneres-an-den-gewichten (Anhangsfolie, Widget-TSX-Ziele).
    Titel darf bleiben.

**STRAFFEN**

- „### Wozu Konvexität":
  - Absatz „Der Begriff hat zwei eng verwandte Ausprägungen …": bleibt (Folie
    „Einführung"), höchstens ein Nebensatz kürzer.
  - Absatz „Warum sich das lohnt …": bleibt (Folie „Warum Konvexität wichtig ist"). Die
    beiden Sätze „Bei der Likelihood ist auf das Vorzeichen zu achten: … dasselbe, wie
    ihr Negatives zu minimieren." → ein Satz (siehe FEHLER).
  - Absatz „Vorsicht bei Formulierungen, die konvexen Problemen gleich *eindeutige* …"
    (≈ 85 W) → ein Satz: Eindeutig ist das Minimum damit noch nicht, und ob es überhaupt
    angenommen wird, ist eine eigene Frage; @sec:konvexe-optimierung trennt die drei
    Aussagen (§2).
  - Absatz zur Wahrscheinlichkeitstheorie mit E[X²] ≥ (E[X])²: bleibt (Folie).
  - „Dieser Abschnitt legt die Grundlagen dafür." streichen; die Vorkenntnisliste bleibt
    mit allen zehn `:k`-Links (Folie „Verwendete Vorkenntnisse").
- „Wir beginnen mit dem Grundbaustein." streichen.
- @bemerkung:ein-gewichteter-durchschnitt (≈ 160 → ≈ 120): „Zwei Bedingungen kommen
  hinzu." weg, die zwei Bedingungssätze zusammenziehen; von „Zwei Sonderfälle" bleibt
  nur der Fall gleicher Gewichte 1/k (S111Huelle.tsx zitiert die Bemerkung dafür), k = 1
  entfällt; „Lesart als Verschiebung" mit Formel bleibt, Schlusssatz auf einen Halbsatz.
- @beispiel:der-erwartungswert-ist-eine (≈ 195 → ≈ 150): „und das ist wörtlich
  @definition:…" → „und das ist @definition:…"; Würfel-Absatz bleibt; Absatz
  „Transformieren wir dagegen erst …" auf zwei Sätze, Zahlen 91/6, 12,25, 35/12 bleiben
  (§2).
- Nach @satz:konvexkombinationen-zweier-vektoren: Absatz „Der Parameter λ misst …"
  bleibt (Brücke Strecke/Gerade).
- „### Die konvexe Hülle", Lead „Bisher haben wir von einer festen, endlichen Punktliste …"
  auf einen Satz.
- @bemerkung:warum-endlich-viele (≈ 135 → ≈ 90): „Drei Details der Definition." weg;
  die drei Aussagen (𝒳 darf unendlich sein, N variiert; für endliches 𝒳 reicht N = k;
  𝒳 ⊆ conv(𝒳)) bleiben, Selbsttest und @bemerkung:die-kleinste-konvexe-obermenge brauchen
  sie. Carathéodory-Sätze „Im ℝⁿ genügen stets N ≤ n+1 … den wir hier nicht brauchen."
  streichen (EXTRA ohne Folge).
- @bemerkung:extrempunkt-zu-sein-ist-keine (≈ 135 → ≈ 75): erster Absatz bleibt
  (Widget-TSX). Zweiter Absatz → ein Satz: „Für konvexe Mengen allgemein führt
  @sec:konvexe-mengen eine gleichwertige Fassung ein (@definition:konvexe-mengen-extrempunkt)."
  „Im Dreiecksbeispiel unten …" entfällt (zeigt in eine Vertiefung).
- @bemerkung:die-kleinste-konvexe-obermenge (≈ 85 → ≈ 40): Folienaussage „conv(𝒳) ist
  die kleinste konvexe Menge, die 𝒳 enthält" plus ein Satz: 𝒳 ⊆ conv(𝒳) steht in
  @bemerkung:warum-endlich-viele, den Rest beweist @satz:konvexe-huelle-als-durchschnitt.
  „Das sind drei Behauptungen …" und die Beweisidee entfallen (Dublette zu S112).
- Kasten „Wie eine Punktwolke ihre Hülle aufspannt": Auswertung (≈ 110 → ≈ 75), drei
  bis vier Sätze: Fläche wächst monoton, die Extrempunkt-Liste nicht (eine alte Ecke
  fällt heraus, die Anzahl kann auch sinken), mit Verweis auf
  @bemerkung:extrempunkt-zu-sein-ist-keine; der grüne Mittelwert (Gewichte 1/k) bleibt
  in der Fläche, geometrisch dasselbe wie „E(X) zwischen 1 und 6".
- Selbsttest: Frage 1 ohne „Ebenso wenig tut es x₁ − x₂ …" (den Satz zu x₁ = 0 behalten);
  Frage „Der Erwartungswert … ist eine Konvexkombination" Antwort auf zwei Sätze; Frage
  „In der Definition der konvexen Hülle muss …" Antwort einen Satz kürzer.

**STREICHEN**

- Absatz „Eine Menge wird *konvex* heißen, wenn sie mit je zwei Punkten …" (≈ 60 W).
  Dublette: S112 @bemerkung:was-die-bedingung-verlangt; der Induktionssatz steht dort.
- Selbsttestfrage „Ist ein Optimierungsproblem konvex, so besitzt es genau ein globales
  Minimum." (≈ 80 W). Dublette zu S115 (Selbsttest „Jede strikt konvexe Funktion …" und
  „… mehrere kritische Punkte …", beide auf @bemerkung:drei-aussagen-die-auseinanderzuhalten);
  in 11.1 ist der Stoff noch nicht entwickelt.
- Die oben genannten Sätze. Kein Label entfällt.

**FEHLER**

- Einleitung: „Die Log-Likelihood selbst ist in diesen Modellen konkav" ist zu stark
  (Folie: „*meist* konkave Log-Likelihoods"; S115 sagt selbst, bei nicht-kanonischem Link
  sei das nicht automatisch). → „Konvex ist dabei die negative Log-Likelihood, die wir
  minimieren; die Log-Likelihood selbst ist bei kanonischem Link konkav."
- Sonst keine. Nachgerechnet: Schwerpunkt (1; 2/3), (1, 1) = ¼x₁ + ¼x₂ + ½x₃, Würfel;
  Hüllen-Zahlen (7 Extrempunkte, Fläche 7,46, (1,5; 1,4) bei k = 5) deckt REV29.

**NICHT ANFASSEN**

@definition:konvexkombination, @satz:konvexkombinationen-zweier-vektoren (Beweis bleibt
Vertiefung), @definition:konvexe-huelle, @definition:konvexkombinationen-extrempunkt
(alle Folie und Widget-TSX); Hüllen-Kasten mit `<HuellenSchaetzung />`; Selbsttest-Fragen
zu (1, 1), zum Extrempunkt bei (1,5; 1,4) und `zahlfrage{loesung=7}`; alle `:k`-Links;
Boyd-Zeile.

### S112.mdx (Konvexe Mengen) – Haupttext 4 209 → Ziel ≈ 3 150–3 400

**VERLAGERN**

- Extrempunkte, Beispiele zur allgemeinen Fassung: Im Absatz nach der Vertiefung „Warum
  beide Fassungen dieselben Punkte auswählen" bleibt der erste Satz („Ein Extrempunkt
  liegt also auf keiner Strecke, die ganz in der Menge verläuft und ihn im Inneren
  trifft.") im Haupttext; der Rest („Der offene Ball aus @beispiel:offener-ball hat
  deshalb gar keinen Extrempunkt … Extrem sind dort nur die vier Ecken.", ≈ 75 W) kommt
  ans Ende dieser bestehenden Vertiefung. Titel → „Extrempunkte: beide Fassungen und
  Beispiele". EXTRA: nicht auf den Folien. (@bemerkung:was-der-satz-leistet-und-was-nicht
  nennt den offenen Ball selbst, braucht den Absatz also nicht.)
- @beispiel:der-simplex, Beweis der Extrempunkte: „Dass e₁ extrem ist, zeigt folgende
  Rechnung: … und deshalb nicht extrem." (≈ 100 W) aus dem Beispiel in eine neue
  `:::vertiefung[Warum die Ecken des Simplex seine Extrempunkte sind]` direkt nach dem
  Beispiel. Im Beispiel bleiben „Die Extrempunkte von Δᴺ sind genau die
  Standard-Basisvektoren e₁, …, e_N." und „Dass die Ecken den Simplex auch aufspannen …
  = conv{e₁, …, e_N}.". EXTRA: Folie „Simplex" nennt die Extrempunkte ohne Beweis. **(opt.)**

**STRAFFEN**

- Einleitung „### Mengen, die ihre Verbindungsstrecken enthalten" (≈ 100 → ≈ 60):
  Rückblick auf einen Satz („Jetzt fragen wir umgekehrt, welche Mengen unter
  Konvexkombinationen abgeschlossen sind."); Motivation über die zulässige Menge bleibt,
  gekürzt.
- @bemerkung:was-die-bedingung-verlangt (≈ 160 → ≈ 100): erster Absatz bleibt (Folie:
  keine Einbuchtungen oder Löcher); zweiter Absatz „Drei Details zur Definition …"
  **streichen** (enthält einen kaputten Satz, siehe FEHLER, und doppelt die erste
  Selbsttestfrage zu leerer und einelementiger Menge); dritter Absatz (Nachweis gegen
  Widerlegung) bleibt, Widget-TSX und S113 verweisen darauf.
- Kasten „Welche Mengen sind konvex?": Lead-in bleibt; Auswertung (≈ 90 → ≈ 55):
  Scheibe und Dreieck ohne Paar, Ring und Parabelunterseite schnell; der Ring-Knopf mit
  1,1/√2 ≈ 0,778 < 0,8 bleibt (die Zahlfrage nutzt ihn); Parabel auf ganzer Länge;
  Schlusssatz → „Der Ring vertritt im Selbsttest die Einheitssphäre, die als Kurve ohne
  Dicke nicht anklickbar wäre."
- Lead vor @satz:konvexe-mengen-enthalten-alle auf einen Satz.
- „### Fünf Mengen im Selbsttest": Zeile „Fünf Mengen, jeweils mit Rechnung." streichen
  (Quiz-Intro). Antworten: Vektorraum-Frage letzter Satz kürzer; Sphäre: Koordinatenrechnung
  bleibt (Folie), das koordinatenfreie Argument (±x) auf einen Satz; Parabel:
  Schlussabsatz auf einen Satz mit Verweis auf @sec:projektion-konvexe-funktionen;
  Zahlfrage 0,38: λ-Grenzen 0,380/0,620 und „ein einziges λ genügt" bleiben, die
  Wiederholung von 0,778 und der Bisektions-Satz entfallen.
- @beispiel:offener-ball: Schlussabsatz „Der strikte Schritt kommt dabei immer von einem
  der beiden Summanden …" streichen; Einleitung siehe FEHLER.
- Lead „Der nächste Begriff beschreibt die Ecken einer konvexen Menge …" (≈ 55 → ≈ 25):
  ein Satz Rückverweis auf die Gewichts-Fassung in @sec:konvexkombinationen, ein Satz,
  warum hier die allgemeine Fassung nötig ist.
- @beispiel:der-simplex, *Bedeutung in der Statistik*: bleibt (Folie), Softmax-Formel
  bleibt; Zahlenbeispiel (1; 2; 0,5) ↦ (0,231; 0,629; 0,140) als ein Satz, Halbsatz
  „die Ecken werden also nie erreicht, sondern nur im Grenzwert angesteuert" streichen.
- „### Der Kegel der positiv semidefiniten Matrizen": Lead auf einen Satz. Absatz „Die
  Symmetrie ist dabei wesentlich …" (≈ 75 → ≈ 40): quadratische Form sieht nur
  (A + Aᵀ)/2, Äquivalenz zu nichtnegativen Eigenwerten nur für symmetrische Matrizen
  (Spektralsatz); die `:k`-Links bleiben, der Cholesky-Halbsatz entfällt (steht in der
  Kovarianz-Bemerkung).
- @bemerkung:kovarianzmatrizen-sind-semidefinit-nicht (≈ 250 → ≈ 170): erster Absatz
  („Als Anwendung liest man häufig, Kovarianzmatrizen seien SPD …", Relikt des
  behobenen Folienfehlers 3) → ein Satz: Kovarianzmatrizen sind stets symmetrisch und
  positiv semidefinit, bilden also eine konvexe Menge; positiv definit nur ohne lineare
  Degeneration (Folie). Var(aᵀX) ≥ 0, Gegenbeispiel (Z, Z) mit Eigenwerten 2 und 0,
  Praxis-Satz und Cholesky-Satz bleiben (Zahlfrage und Widget-TSX verweisen). Im letzten
  Absatz nur den Satz „Im vollen ℝⁿˣⁿ hätte 𝒫ₙ dagegen gar kein Inneres …" streichen.
- Lead „Für n = 2 lässt sich 𝒫₂ vollständig zeichnen …" (≈ 50 → ≈ 25).
- Kasten „Der Kegel im Fall zweier Dimensionen": Text vor dem Widget bleibt (drei
  Ungleichungen, gedrehte Koordinaten); Auswertung (≈ 140 → ≈ 90): Kegel (homogen), Rand
  = Determinante 0 = Rang ≤ 1, innen positiv definit, außen indefinit oder negativ
  semidefinit, Spur-2-Voreinstellungen b = 0, 1, 2 mit kleinerem Eigenwert positiv, null,
  negativ, Satz im Bild ein Satz. Absatz „Eine weitere Beobachtung: Schneiden wir den
  Kegel mit der Ebene a + c = 2 …" streichen (EXTRA).
- Quiz nach dem Kegel: Antworten je einen Satz kürzer; Props unverändert.
- „### Operationen, die Konvexität erhalten": Lead (≈ 40 → ≈ 20).
- @beispiel:ein-dreieck-als-schnitt-dreier: Satz „Genau diese Menge steckt hinter dem
  Knopf „Dreieck" im Widget oben …" streichen; sonst bleibt alles (Klausur ws2526-1).
- „### Die konvexe Hülle als kleinste konvexe Obermenge": Lead auf einen Satz. Beweis
  bleibt im Haupttext (die Folie führt ihn); Schritt 4 auf einen Satz, `::why` in
  Schritt 1 auf den ersten Halbsatz.
- „### Anwendung: lineare Ziele werden in Ecken angenommen": „Zum Abschluss eine Anwendung
  aus der Optimierung." streichen; „Das Elementzeichen ist beabsichtigt: …" auf einen
  Halbsatz (∈, weil das Argmax nicht eindeutig sein muss); in der Vertiefung den ersten
  Satz „Für die Anwendung des Satzes genügt seine Aussage." streichen.
- @beispiel:auswahl-unter-einer-budgetschranke: Absatz „Bemerkenswert ist der
  zweitbeste Punkt …" auf zwei Sätze ohne „Bemerkenswert"; Zahlen (12, 31, Mittelpunkt
  von (6, 0) und (0, 4)) bleiben.
- @bemerkung:was-der-satz-leistet-und-was-nicht (≈ 185 → ≈ 100): Absatz 1 auf zwei Sätze
  (der Satz liefert einen Extrem-Maximierer, nicht alle, Beispiel {(0,0), (1,0), (2,0)};
  Endlichkeit ist nötig, offener Ball); Absatz 2 auf zwei Sätze (nützt nur, wenn die Hülle
  beschreibbar ist, daran scheitert die ganzzahlige Optimierung; bei Polyedern ist die
  Eckensuche die Grundidee der linearen Programmierung, das Skript behandelt
  Nebenbedingungen in @sec:optim/beschraenkt).
- Deslop: „wörtlich" im Induktionsbeweis, Schritt 1 → „ist @definition:konvexe-menge".

**STREICHEN**

- @bemerkung:drei-feinheiten-zum-satz ganz (≈ 165 W, Label ohne Verweise im Repo).
  „Das Produkt heißt kartesisch" war Relikt des behobenen Folienfehlers 6 (die Folie sagt
  jetzt „Kartesisches Produkt"); „Die Abbildung ist affin" doppelt den `::why` in
  Beweisschritt 3; „Der Schnitt darf beliebig groß sein" steht im Satz und im `::why` von
  Schritt 1. Ersatz: an den Lead oder hinter den Satz ein Halbsatz „die beliebige
  Indexmenge in (1) brauchen wir für @satz:konvexe-huelle-als-durchschnitt".
- Die oben genannten Absätze und Sätze. Sonst entfällt kein Label.

**FEHLER**

- @bemerkung:was-die-bedingung-verlangt: „Die Randfälle λ = 0 und λ = 1 zugelassen;"
  (Verb fehlt). Erledigt sich mit dem gestrichenen Absatz.
- Vertiefung „Beweis per Induktion über die Zahl der Punkte", `::why` in Schritt 3:
  „… macht aus einer (N+1)-Kombination eine Zweierkombination von etwas schon Bekanntem
  macht" (doppeltes „macht") → „… macht aus einer (N+1)-Kombination eine
  Zweierkombination aus etwas schon Bekanntem".
- @beispiel:offener-ball: „Sei λ ∈ [0,1]." führt x, y nicht ein → „Seien x, y ∈ 𝒳 und
  λ ∈ [0,1]."
- Boyd-Zeile: „§2.2 und §2.3 behandeln dieselben Themen ausführlicher, mit §2.1 zu …"
  widerspricht sich → „Boyd und Vandenberghe, Convex Optimization, §2.1 bis §2.3: affine
  und konvexe Mengen, wichtige Beispiele einschließlich Simplex und semidefinitem Kegel,
  Operationen, die Konvexität erhalten."
- Nachgerechnet und korrekt: λ-Grenzen 0,3797/0,6203, Softmax-Werte, 19 Elemente und
  Eckenwerte 0/30/32 der Budgetmenge.

**NICHT ANFASSEN**

@definition:konvexe-menge; @satz:konvexe-mengen-enthalten-alle im Haupttext (Folie nennt
die Aussage; S114 Jensen-Beweis und der Hüllensatz brauchen sie), Beweis bleibt
Vertiefung; das Fünf-Mengen-Quiz (Folien-Quiz, alle fünf Fragen) und
`zahlfrage{loesung=0.38}`; @definition:positiv-semidefinit und
@satz:die-positiv-semidefiniten-matrizen **mit Beweis im Haupttext** (Folie führt ihn,
Klausur-Konzeptfrage); Kegel-Kasten und `zahlfrage{loesung=0}`;
@satz:konvexitaetserhaltung (Beweis bleibt Vertiefung); @beispiel:ein-dreieck-als-schnitt-dreier
(Klausur); @satz:konvexe-huelle-als-durchschnitt mit Beweis im Haupttext;
@satz:lineare-ziele-und-extrempunkte, Beweis-Vertiefung, @beispiel:auswahl-unter-einer-budgetschranke;
@definition:konvexe-mengen-extrempunkt (S111 und der Extrempunkt-Satz brauchen sie); in
der Kovarianz-Bemerkung der Satz „Die positiv definiten Matrizen bilden übrigens ebenfalls
eine konvexe Menge … *innerhalb des Raums der symmetrischen Matrizen*" (S115 verweist).

### S113.mdx (Projektion und konvexe Funktionen) – Haupttext 3 181 → Ziel ≈ 2 050–2 300

**VERLAGERN**

- @bemerkung:jede-voraussetzung-wird-gebraucht (≈ 175 W) in die bestehende
  `:::::vertiefung[Beweisskizze des Projektionstheorems]`, hinter den Beweis (schließende
  `:::::` nach unten). Titel → „Beweisskizze und Voraussetzungen des Projektionstheorems".
  EXTRA: die Gegenbeispiele stehen auf keiner Folie, und die Bemerkung rechnet mit
  „Schritt 5" des Beweises. **Ersatz im Haupttext**, direkt nach dem Satz, ein Satz aus
  dem letzten Absatz der Bemerkung: „Der Satz gilt ebenso in jedem *vollständigen*
  Skalarproduktraum; wir brauchen nur den endlichdimensionalen Fall." (Folie und
  Wrap-up sagen „vollständiger Skalarproduktraum", sonst stünde das nur in der
  Vertiefung.)
- Winkelkriterium, Folgeabsätze: @satz:kriterium-des-stumpfen-winkels **bleibt im
  Haupttext** (der Projektions-Kasten erklärt seine Trennlinie damit, Widget-TSX
  verweist). In die bestehende `:::::vertiefung[Der Beweis des Winkelkriteriums und zwei
  Projektionsformeln]` wandern, an ihren Anfang: der Absatz „Abgeschlossenheit und
  endliche Dimension braucht dieses Kriterium nicht …" (≈ 25 W) und der Absatz „Ist 𝒳 = 𝒰
  sogar ein Untervektorraum … und die reicht aus." (Normalgleichungen, ≈ 75 W). Titel →
  „Winkelkriterium: Beweis, Normalgleichungen und Projektionsformeln". Der erste Satz der
  Box („Der Beweis ist eine Rechnung …") wird entsprechend angepasst. EXTRA: das
  Kriterium steht auf keiner Folie.
- @beispiel:eine-quadrik-ausgerechnet (≈ 170 W) in die bestehende
  `:::::vertiefung[Beweis des Kriteriums für quadratische Funktionen]`, hinter den Beweis;
  das Beispiel steht danach vor @bemerkung:warum-der-symmetrische-anteil, die im Haupttext
  bleibt. Titel → „Quadratische Funktionen: Beweis und Zahlenbeispiel". EXTRA: das
  Quadrik-Beispiel (f(1, 2) = 6) stammt aus einer älteren, auskommentierten Folienfassung;
  der aktuelle Foliensatz hat es nicht. Keine Verweise darauf.

**STRAFFEN**

- „### Der nächste Punkt einer konvexen Menge" (≈ 125 → ≈ 80): Rückblick auf einen Satz;
  Motivation (Projektionsschritt, KQ als nächster Punkt im Spaltenraum, Existenz und
  Eindeutigkeit gefragt) bleibt.
- Lead „Der nächstgelegene Punkt lässt sich auch ohne Minimierung erkennen …" auf einen
  Satz. Absatz „Geometrisch sagt @eq:kriterium-des-stumpfen-winkels …" (≈ 80 → ≈ 45):
  Winkel mindestens 90°, die ganze Menge liegt auf einer Seite der Hyperebene durch x̂
  senkrecht zu x − x̂ (`:k[Hyperebene]` bleibt); Fall x ∈ 𝒳 ein Halbsatz.
- Kasten „Die Projektion mit beweglichem Punkt" (Auswertung ≈ 100 → ≈ 65): „Zwei Fragen
  lassen sich damit klären:" weg, die Fragen bleiben; „läge er auf dem Kreis, so wäre nach
  Schritt 5 des Beweises der Mittelpunkt der beiden näher" → „läge er auf dem Kreis, wäre
  der Mittelpunkt der beiden noch näher an x" (keine Abhängigkeit vom Beweis in der
  Vertiefung); Trennlinie aus @satz:kriterium-des-stumpfen-winkels bleibt; Verhalten an
  den Ecken ein Satz.
- „### Der Epigraph": Lead (≈ 40 → ≈ 20). Absatz „Der Name kommt aus dem Griechischen …"
  → nur der Folienpunkt: „Für f: ℝ → ℝ ist epi(f) die Fläche über der Kurve, den Graphen
  eingeschlossen."
- @bemerkung:der-definitionsbereich-muss-mitspielen (≈ 120 → ≈ 75): der Nachweis im
  ersten Absatz auf zwei Sätze (Folie: „𝒳 ist dann automatisch konvex"); zweiter Absatz
  bleibt.
- Lead „Die Epigraph-Fassung erklärt, warum …" auf einen Satz.
- @bemerkung:wie-wir-die-ungleichung-lesen (≈ 155 → ≈ 130): Sehne, konkav, strikt konvex
  und der Satz zu „strikt/streng" bleiben (Widget-TSX, S115); Schlusssatz „Warum das
  wichtig ist, sehen wir … eindeutig." → „Wozu, zeigt @sec:konvexe-optimierung." (§2).
  **(opt.)** Folienlücke: nach dem Sehnensatz ein Halbsatz „konvexe Funktionen sind in
  diesem Sinn nach oben geöffnet" (Folie „Konvexe Funktionen").
- Absatz nach `<KonvexKonkavPanels />` (≈ 95 → ≈ 45): konkave Tafel ganz rot,
  Doppelmulde teilweise, konkav nur die zweite; die Sätze zum Betrag (Gleichheit auf einem
  Ast) und zur Parabel entfallen (§2).
- Kasten „Konvexität mit einer beweglichen Sehne" (Auswertung ≈ 115 → ≈ 70): Asymmetrie
  als ein Satz mit Verweis auf @bemerkung:was-die-bedingung-verlangt; Voreinstellung
  (−1,55; 1,25) und Gegenprobe (−1,8; −0,9) bleiben; der Betrags-Satz entfällt (§2).
- „### Nachweis von Hand: der Betrag": Lead → „Wie ein Nachweis über alle Paare aussieht,
  zeigt der Betrag." Beweisschritt 2 auf einen Satz mit Verweis auf
  @satz:jede-norm-ist-konvex (`::why` bleibt). Schlussabsatz bleibt (einzige Stelle für
  „konvex, nicht strikt" beim Betrag; Knicke erlaubt).
- Selbsttest (Folien-Self-Check, alle Funktionen bleiben): x⁴ auf zwei Sätze (siehe
  FEHLER); e^x: zweiten Satz („… Standardbeispiel dafür, dass Konvexität allein noch kein
  Minimum liefert …") streichen (§2); Epigraph-Frage einen Satz kürzer; Zahlfrage 1,891:
  Schlusssatz „Zum Vergleich: Auf dem Paar x = −1,8 …" streichen (steht im Kasten).
- „### Beispiele konvexer Funktionen": „Zum Schluss drei Klassen, …" → „Drei Klassen, die
  in der Statistik häufig vorkommen."
- @bemerkung:warum-der-symmetrische-anteil (≈ 110 → ≈ 75): „wie Schritt 2 zeigt" →
  „denn der schiefsymmetrische Anteil liefert in der quadratischen Form null"; Beispiel
  Q = (1 5; −5 1) bleibt (S114 und S115 verweisen); Schlusssatz „In der Praxis fällt das
  selten ins Gewicht …" streichen.
- Beweis zu @satz:jede-norm-ist-konvex, Schritt 2 (≈ 70 → ≈ 30): Definitheit wird nicht
  gebraucht, der Beweis gilt für Halbnormen, für n = 1 ist es der Betragsbeweis;
  `::why` mit den Verweisen auf Kapitel 3 bleibt.
- Absatz „Strikt konvex ist keine dieser Normen …" auf zwei Sätze.
- Deslop: „wörtlich" (Epigraph-Etymologie entfällt ohnehin; Norm-Beweis Schritt 2).

**STREICHEN**

- Schlussabsatz „An der quadratischen Form hängt mehr als die Frage konvex oder nicht …
  klärt @sec:eigenschaften." (≈ 85 W). Dublette: H_f = Q + Qᵀ rechnet S114
  @beispiel:quadratische-funktionen-mit-dem nach; Fisher-Information ist EXTRA ohne Folge;
  `:k[Hesse-Matrix]` bleibt in S114 verlinkt.
- Die oben genannten Sätze. Kein Label entfällt.

**FEHLER**

- Selbsttest x⁴: „Ein kurzer Beweis folgt in @sec:eigenschaften aus f''(x) = 12x² ≥ 0."
  belegt nur Konvexität, nicht die behauptete strikte Konvexität. → „Konvex ist sie nach
  @sec:eigenschaften wegen f''(x) = 12x² ≥ 0; strikt konvex ist sie auch über den
  Nullpunkt hinweg, obwohl f''(0) = 0 ist." (Die Sehnenungleichung-Bemerkung darf bleiben.)
- Projektions-Kasten und @bemerkung:warum-der-symmetrische-anteil verweisen auf
  Beweisschritte in Vertiefungen (siehe STRAFFEN).
- Nachgerechnet und korrekt: (0,8; 0,6), √2 ≈ 1,414, ½ ln 4 ≈ 0,693 gegen ln 2,5 ≈ 0,916,
  AᵀA-Eigenwerte 28/0 und 29/1, κ₂ = 29.

**NICHT ANFASSEN**

@satz:projektionstheorem mit `{#eq-projektionstheorem}` (Folie; Kap. 12 verweist),
Beweis-Vertiefung; @satz:kriterium-des-stumpfen-winkels samt Gleichung im Haupttext;
Projektions-Kasten; @definition:epigraph, `<EpigraphSkizze />`,
@definition:konvexe-funktion; @satz:konvexitaet-als-ungleichung mit Gleichung
(Widget-TSX `num()`), Beweis bleibt Vertiefung; `<KonvexKonkavPanels />`,
Sehnen-Kasten; @beispiel:der-betrag-ist-konvex mit Beweis im Haupttext (Folie
„Verifikation"); Selbsttest (Folien-Self-Check) und `zahlfrage{loesung=1.891}`;
@beispiel:affine-funktionen, @satz:quadratische-funktionen; Beweisschritt 1 von
@satz:jede-norm-ist-konvex (Klausur ws2425-1: L²-Norm); @beispiel:kleinste-quadrate-und-ridge
mit Rangdefizit-Beispiel und κ-Absatz (Folie; einziger `:k[Konditionszahl]`-Link; S114/S115
verweisen); in @bemerkung:wie-wir-die-ungleichung-lesen der Satz „Gebräuchlich sind dafür
beide Namen …" (S115 kürzt seine Kopie im Vertrauen darauf); Boyd-Zeile.

## 4. Gruppe 2: S114, S115

### S114.mdx (Eigenschaften konvexer Funktionen) – Haupttext 3 250 → Ziel ≈ 2 300–2 500

**VERLAGERN**

- @bemerkung:wo-die-voraussetzungen-stecken: der Absatz „*Konvex* muss 𝒳 sein, damit in
  den Schritten 1 und 5 … mit Gegenbeispielen vor." (≈ 90 W; argumentiert mit
  Beweisschritten) ans Ende der `:::::vertiefung[Beweis der drei Charakterisierungen]`
  (nach `::::`, vor `:::::`), als Prosa. Im Haupttext bleibt die Bemerkung (Label!) mit:
  „Zweimal stetig differenzierbar …; für (1) ⇔ (2) genügt einfache Differenzierbarkeit."
  (S115 verweist genau darauf) und dem Absatz „Von zwei naheliegenden Verschärfungen …
  x⁴ …" (Klausuren ws2526-1 und -2: strikt konvex über positiv definite Hesse-Matrix).
  Einleitungssatz „Der Satz nennt drei Bedingungen …" streichen.
- @beispiel:quadratische-funktionen-mit-dem, zweiter Absatz ab
  „@bemerkung:warum-der-symmetrische-anteil hat eine Matrix gezeigt …" bis „… zeigt also
  nichts." (≈ 175 W) aus dem Beispiel heraus an den Anfang der
  `::::vertiefung[Die logistische Regression als konvexes Problem]` (Prosa vor dem
  `:::beispiel`). Titel → „Zwei weitere Beispiele zum Hesse-Kriterium". EXTRA: Die Folie
  verlangt nur den symmetrischen Anteil; das Gegenbeispiel mit positiven Eigenwerten steht
  auf keiner Folie. Zahlen (6,162; −0,162; −2; −0,25) unverändert. Im Haupttext bleibt vom
  Beispiel der erste Absatz (Gradient, H_f = Q + Qᵀ, „genau dann, wenn").

**STRAFFEN**

- „### Regeln statt Nachrechnen" (≈ 120 → ≈ 50): erster Absatz auf zwei Sätze
  (Zielfunktionen entstehen aus Bausteinen: Summe über Beobachtungen, Strafterm,
  Maximum, Grenzübergang); zweiter Absatz („Dieser Abschnitt liefert die Werkzeuge dafür.
  Zuerst … Zum Schluss …", Fahrplan) streichen.
- Satz nach @satz:operationen-die-konvexitaet-erhalten: „Wir führen die Beweise für (2)
  und (4) in der Vertiefung aus; (1) und (3) bleiben Übungen, die wir gleich im Anschluss
  lösen." → „(2) und (4) beweist die Vertiefung, (1) und (3) sind Übungen." „Jetzt die
  beiden Übungen." streichen. Die beiden Übungen bleiben im Haupttext (Klausuren verlangen
  Konvexitätsnachweise aus der Definition; die Lösungen sind ohnehin zugeklappt).
  Kürzen in der Lösung zu @beispiel:uebung-das-punktweise-maximum: Absatz „Der Index j hängt
  von z ab …" auf einen Satz; der Teil „Für unendlich viele Funktionen …" bleibt.
- In `:::::vertiefung[Beweise zu Skalarmultiplikation und Grenzwerten]`, Schritt 3 („Weil
  hier alle drei Folgen konvergieren …") auf den ersten Satz plus `::why` (Vertiefung,
  zählt nicht zum Haupttext). „kostet nichts" entfällt dabei, „kippt" im `::why` von
  Schritt 1 → „dreht sich".
- @beispiel:zielfunktionen-aus-bausteinen (≈ 285 → ≈ 170): Einleitung ein Satz; Ridge
  zwei Sätze (Regeln (1), (2) geben Konvexität, strikte Konvexität liefert erst
  @beispiel:kleinste-quadrate-und-ridge); LASSO zwei Sätze; Hinge zwei Sätze (Maximum
  zweier affiner Funktionen in β, Summe nach (1); „Den Umweg über eine Regel für
  Verkettungen brauchen wir nicht." weg); empirisches Risiko zwei Sätze.
- „### Die Jensen-Ungleichung": Lead auf einen Satz (Folie: verallgemeinert die
  Definition auf beliebig viele Punkte).
- @bemerkung:gewichte-als-wahrscheinlichkeiten (≈ 135 → ≈ 100): erster Absatz bleibt;
  zweiter ohne „Zwei Einschränkungen sind dabei zu beachten."; Inhalt (nur endlicher
  Träger; allgemeine X über Stützgeraden, Folie; für konkave f dreht sich die
  Ungleichung, Klausur) bleibt knapp.
- @beispiel:die-varianz-ist-nicht-negativ (≈ 115 → ≈ 90): Würfel-Absatz auf einen Satz
  mit Verweis: beim fairen Würfel aus @beispiel:der-erwartungswert-ist-eine steht
  E[X²] = 91/6 gegen (E[X])² = 12,25, die Lücke 35/12 ≈ 2,92 ist die Varianz (§2);
  Gleichheitsfall-Satz bleibt.
- Kasten „Die Jensen-Ungleichung mit Reglern" (Auswertung ≈ 130 → ≈ 80): grünes Dreieck
  = Hülle der Graphenpunkte, liegt nie unter der Kurve; bei x² ist die Lücke die gewichtete
  Varianz (Zahlfrage); e^x größere Lücke; √x als Gegenprobe (Plätze getauscht); ein
  Gewicht 1 gibt Gleichheit. „seine Ecken berühren sie ja" und „genau" weg.
- „### Konvexität an der Ableitung ablesen": Lead (≈ 40 → ≈ 20).
- Absatz nach @satz:konvexe-funktionen-von-vektoren-zu: „Alle drei Aussagen beschreiben
  dieselbe Krümmungseigenschaft." weg; die drei Lesarten bleiben (Folie).
- @bemerkung:eigenwerte-als-kruemmungen: Formel, Liste und Konvexitätsaussage bleiben
  (Folie „Konvexität & Spektrum"); Schlussabsatz „Der Gradiententerm darf in dieser
  Näherung nicht fehlen: …" (Relikt des behobenen Folienfehlers 2, ≈ 55 W) → ein Satz:
  „Ohne den Gradiententerm gilt die Näherung nur an kritischen Punkten." Der Verweis auf
  das Kap.-10-Widget entfällt.
- „### Stützgeraden und Subgradienten": Lead bleibt (der Halbsatz mit
  @bemerkung:was-die-vier-regeln-zusammen-hergeben darf weg). Absatz nach
  @definition:subgradient-und-subdifferential (≈ 100 → ≈ 80):
  - „Die Schritte 1 und 2 im Beweis von @satz:… brauchen dafür nur Differenzierbarkeit in
    diesem einen Punkt, nicht die C²-Voraussetzung des Satzes." streichen (zeigt in die
    Vertiefung).
  - „differenzierbar ⇒ ∇f(x)ᵀ ist der einzige Subgradient" und ∂|x|(0) = [−1, 1]
    bleiben (Folie „Exkurs: Subgradienten"); „(Herleitung in der Vertiefung
    @beispiel:das-subdifferential-des-betrags)" → „(@beispiel:das-subdifferential-des-betrags)".
  - **Kern zurückholen:** ein Satz aus dem Absatz „Algorithmisch sind Subgradienten …"
    der Vertiefungs-Bemerkung @bemerkung:randpunkte-und-wozu-subgradienten-gut in den
    Haupttext: Subgradienten sind damit das Werkzeug für konvexe, aber nicht
    differenzierbare Zielfunktionen wie LASSO und Quantilregression. Die gezählte Folie
    „Exkurs: Subgradienten" nennt genau diese Beispiele; im Haupttext fehlten sie.
- Selbsttest: Differenz-Frage um den letzten Halbsatz kürzen; Maximum-Frage Antwort
  ≈ 50 W; Minimum-Frage einen Satz kürzer; Jensen-N = 2-Frage Antwort zwei Sätze (Folie:
  „verallgemeinert die Definition"); Hesse-definit-Frage bleibt; Subgradient-Frage
  Antwort ≈ 45 W; Zahlfrage bleibt.
- Deslop: „wörtlich" (Jensen-Beweis Schritt 1, Beispiel quadratische Funktionen,
  Selbsttest), „Werkzeuge" (entfällt mit dem Fahrplan), „genau" in „genau die gewichtete
  Varianz" / „also genau die Definition".

**STREICHEN**

- Selbsttestfrage „In der Taylorentwicklung zweiter Ordnung von f(x + th) steht der
  Krümmungsterm t² hᵀH_f(x)h." (≈ 60 W). Relikt des behobenen Folienfehlers 1 (die
  Anhangsfolie hat jetzt t²/2); sie prüft Kap.-10-Stoff zu einem Beweisschritt in der
  Vertiefung; der Faktor ½ steht im Haupttext in @bemerkung:eigenwerte-als-kruemmungen.
  (Ermessensposten, §6.)
- Die oben genannten Sätze. Kein Label entfällt.

**FEHLER**

- Keine Fachfehler gefunden. Nachgerechnet: Eigenwerte 6,162/−0,162 von Q + Qᵀ,
  dᵀ(Q + Qᵀ)d = −2, f(±x) = −0,25; −√x am Rand (y = 1/(4c²), Wert −1/(4c); c = 10:
  −0,025 bei 0,0025); Jensen-Zahlfrage 4,9167 − 3,3611 = 1,5556 (Stützstellen 0,5; 1,5;
  3,5); Schwellenwertregel z = 2, λ = 0,5 ↦ 1,5.
- Haupttext-Abhängigkeiten von Beweisschritten in Vertiefungen: durch VERLAGERN
  (Voraussetzungs-Bemerkung) und STRAFFEN (Absatz nach der Subgradienten-Definition)
  behoben.

**NICHT ANFASSEN**

@satz:operationen-die-konvexitaet-erhalten (Kap. 12); beide Übungen samt `<details>`;
Vertiefungen „Beweise zu Skalarmultiplikation und Grenzwerten" (außer Schritt 3) und „Was
die vier Regeln zusammen hergeben" (Haupttext verweist hinein); @satz:jensen-ungleichung mit
`{#eq-jensen-ungleichung}` (Widget-TSX), Induktionsbeweis bleibt Vertiefung;
@beispiel:die-varianz-ist-nicht-negativ (Folie, Widget-TSX); Jensen-Kasten und
`zahlfrage{loesung=1.5556}`; @satz:konvexe-funktionen-von-vektoren-zu mit Gleichung;
die Haupttext-Reste von @bemerkung:wo-die-voraussetzungen-stecken (siehe VERLAGERN);
erster Absatz von @beispiel:quadratische-funktionen-mit-dem; logistische Regression (bleibt
Vertiefung, S115 verweist); **@definition:subgradient-und-subdifferential mit
`{#eq-subgradient-und-subdifferential}` und @satz:existenz-von-subgradienten-im-inneren
im Haupttext** (ORCHESTRATOR; Kap. 12 S122/S125); die Subgradienten-Vertiefung (Beweis,
@beispiel:das-subdifferential-des-betrags, @bemerkung:randpunkte-und-wozu-subgradienten-gut;
S115 und Selbsttest verweisen); Boyd-Zeile.

### S115.mdx (Konvexe Optimierung und Zusammenfassung) – Haupttext 3 265 → Ziel ≈ 2 000–2 250

**VERLAGERN**

- @bemerkung:was-daraus-folgt-und-was-nicht, Punkt „*Jedes lokale Minimum ist ein globales
  Minimum.*": Aussage bleibt im Haupttext mit einem Satz („Für differenzierbares f folgt
  das aus dem Satz; es gilt aber für jedes konvexe f auf einer konvexen Menge, ganz ohne
  Ableitung."). Der ableitungsfreie Beweis „Sei 𝒳 ⊆ ℝⁿ konvex, f: 𝒳 → ℝ konvex und x⋆
  ein lokales Minimum. Gäbe es … verhalten sich also genauso." (≈ 100 W; `:k[Umgebung]`
  wandert mit) in eine neue `:::vertiefung[Lokal ist global, auch ohne Ableitung]` direkt
  nach der Bemerkung. EXTRA: Folie 13-optim-I sagt nur „Jedes lokale Minimum ist ein
  globales Minimum", die Anhangsfolie beweist nur den differenzierbaren Fall. Kap. 12 S122
  zitiert die Bemerkung für „ohne jede Differenzierbarkeit": diese Aussage steht weiter im
  Haupttext.
- @bemerkung:drei-aussagen-die-auseinanderzuhalten, letzter Absatz „Ein statistisches
  Gegenbeispiel zeigt die Relevanz von Punkt 3. … liegt das Minimum bei β = 1,18."
  (≈ 130 W) in eine neue `:::vertiefung[Perfekt trennbare Daten in der logistischen
  Regression]` direkt nach der Bemerkung. EXTRA: auf keinem Foliensatz. Zahlen unverändert
  (nachgerechnet: ℓ(0) = 1,386, ℓ(10) ≈ 9,1·10⁻⁵, β = 1,18 erfüllt σ(β) = 1 − 0,2β).
- Selbsttestfrage „Im Abstiegs-Widget aus der Vertiefung „Ein Abstiegsverfahren auf der
  Doppelmulde" landet ein Lauf, der bei x₀ = −0,16 startet, …" (≈ 90 W) in diese
  Vertiefung, hinter den Kasten. Box-Fence von `::::vertiefung` auf `:::::vertiefung`
  (Öffnen und Schließen), darin `::::quiz` > `:::frage{wahr}` (Muster S121). Fragetext →
  „Im Abstiegs-Widget oben landet ein Lauf, …". Antwort siehe FEHLER.

**STRAFFEN**

- „### Warum konvexe Probleme leichter sind" (≈ 90 → ≈ 55): „Bis hierher haben wir
  Konvexität beschrieben. Jetzt geht es um die Folgen für die Optimierung." auf einen
  Halbsatz; Frage, Kap.-10-Verweis und „lokales Minimum weit über dem globalen" bleiben.
- @bemerkung:was-daraus-folgt-und-was-nicht (≈ 430 → ≈ 220 im Haupttext):
  - Punkt 1: „Das ist Schritt 2 des Beweises, wörtlich." → „Das ist die Richtung
    (2) ⇒ (1) des Satzes." Der Satz zur „vorsichtigeren Fassung" bleibt.
  - Punkt 2: siehe VERLAGERN.
  - Punkt 3 (keine Sattelpunkte, Folien-Callout): bleibt.
  - Punkt 4 „*Nicht folgt: Eindeutigkeit, und ebenso wenig Existenz.*" (≈ 75 → ≈ 40):
    ein Satz mit Verweis auf @bemerkung:drei-aussagen-die-auseinanderzuhalten; die Lesart
    des Merksatzes („*falls* wir eine Lösung finden, ist sie global") bleibt (Folie).
  - Punkt 5 „*Und ohne Ableitung?*" (≈ 135 → ≈ 65): `:k[Subdifferential]{#gradient}` →
    „das Subdifferential (@definition:subgradient-und-subdifferential)" (ORCHESTRATOR:
    das Gradienten-Pop-up erklärt Subgradienten nicht); Formel „x⋆ globales Minimum ⇔
    0 ∈ ∂f(x⋆)" bleibt; Begründung ein Satz (mit v = 0 lautet
    @eq:subgradient-und-subdifferential gerade f(y) ≥ f(x⋆)); Innerer-Punkt-Hinweis ein
    Halbsatz mit @satz:existenz-von-subgradienten-im-inneren; Betrag/LASSO ein Satz mit
    Verweis auf @beispiel:das-subdifferential-des-betrags, ohne „(Herleitung in der
    Vertiefung …)".
- Lead „Ist die Minimalstelle nicht eindeutig …": bleibt, leicht gekürzt.
- Absatz nach @definition:strikte-konvexitaet (≈ 65 → ≈ 35): die drei Änderungen
  (< statt ≤, x ≠ y, λ ∈ (0, 1)) in einem Satz; „Eingeführt ist der Begriff samt seiner
  Zweitbezeichnung „streng konvex" schon in @bemerkung:…; wir bleiben bei strikt." →
  „Informell kam der Begriff schon in @bemerkung:wie-wir-die-ungleichung-lesen vor." (§2)
- @bemerkung:drei-aussagen-die-auseinanderzuhalten (≈ 325 → ≈ 150 im Haupttext):
  Einleitungssatz bleibt; Liste 1–3 bleibt; e^x bleibt; Existenz über kompakte zulässige
  Menge (Weierstraß) oder Koerzivität bleibt, zwei Sätze; Absatz „Erst beides zusammen …
  auch dann, wenn die Designmatrix rangdefizient ist." → ein Satz (etwa: Beides zusammen,
  etwa Kleinste Quadrate bei vollem Spaltenrang oder Ridge mit λ > 0, gibt genau eine
  Lösung, @beispiel:kleinste-quadrate-und-ridge); letzter Absatz siehe VERLAGERN.
- „### Optimierungslandschaften": Lead → „Der Unterschied lässt sich in einer Variablen
  zeichnen." (Der Halbsatz „danach ein Verfahren, das in einem von ihnen scheitert" zeigt
  auf eine Vertiefung.)
- Kasten „Drei Landschaften nebeneinander" (Auswertung ≈ 105 → ≈ 75): je Tafel ein bis
  zwei Sätze; Plateau von −0,8 bis 0,8 bleibt (Selbsttest); Titel bleibt.
- „### Konvexe und nicht-konvexe Probleme in Statistik und maschinellem Lernen": Lead
  (≈ 35 → ≈ 20; „Zum Abschluss" weg).
- @bemerkung:eine-landkarte-der-optimierungsprobleme (≈ 610 → ≈ 430). Bleibt im
  Haupttext (ORCHESTRATOR; Folie „(Non-)Konvexe Optimierung in ML & Statistik"; Kap. 12
  S122 verweist). Jeder Folienpunkt bleibt als Aufzählungspunkt mit höchstens zwei Sätzen:
  - *Strikt konvex:* Einleitung zwei Sätze; KQ mit vollem Spaltenrang („Voller Rang
    allein genügt nicht …" als Halbsatz); GLM mit kanonischem Link ein bis zwei Sätze
    (Hesse XᵀWX, Verweis auf @beispiel:logistische-regression-ist-ein-konvexes), daran als
    Halbsatz der bisherige Punkt „Nicht-kanonische Links …": dort ist Konvexität nicht
    mehr automatisch, im Probit-Modell besteht sie trotzdem; SVM zwei Sätze (w eindeutig,
    b nicht, Folie); Ridge und Elastic Net ein Satz; Graphisches LASSO ein Satz (der
    Verweis auf @bemerkung:kovarianzmatrizen-sind-semidefinit-nicht darf bleiben oder
    entfallen).
  - *Konvex, nicht strikt:* Einleitung zwei Sätze; LASSO ein Satz; Quantilregression ein
    Satz; **Folienlücke:** neuer Punkt „Kleinste Quadrate ohne vollen Spaltenrang: entlang
    eines Kernvektors konstant (@beispiel:kleinste-quadrate-und-ridge)." (steht auf der
    Folie, fehlte in der Liste; Inhalt aus S113, nichts Neues).
  - *Nicht konvex:* Einleitung bleibt; neuronale Netze, Clusteranalyse, Bäume, latente
    Variablen, L₀/Best Subset, Einbettungen, Matrixvervollständigung je ein Satz;
    „Graphische Modelle, wenn … die Struktur selbst gesucht wird." streichen (nicht auf der
    Folie); Hyperparameter zwei Sätze (Folie).
- „### Nächstes Kapitel" (≈ 60 → ≈ 35): zwei Sätze (Folie „Nächste Vorlesung").
- Tabelle „Das Wichtigste in Kürze": bleibt die einzige Zusammenfassung; Zeile 4
  „Baukasten aus Summe, …" → „Regeln für Summe, …" (Deslop). `@num:`-Verweise unverändert.
- Selbsttest (≈ 835 → ≈ 560 im Haupttext):
  - Hülle der Sphäre: bleibt, Antwort ≈ 70 W (Mittelpunkt von e₁ und e₂; jeder
    Kugelpunkt liegt auf einer Sehne zwischen zwei Sphärenpunkten, das Zahlenbeispiel mit
    0,9798 und den Gewichten 0,6531/0,3469 darf als ein Satz bleiben).
  - mehrere kritische Punkte: bleibt.
  - „Jede strikt konvexe Funktion … genau ein globales Minimum": Satz zur logistischen
    Regression streichen (Stoff liegt jetzt in der Vertiefung).
  - „Ist f₁ konvex und f₂ strikt konvex …": Ridge-Passage auf einen Satz; Gegenbeispiel
    |x| + max{0, x} bleibt.
  - Jensen x² und √: Würfel-Varianzzahlen (15,1667; 12,25; 2,9167) durch Verweis auf
    @beispiel:die-varianz-ist-nicht-negativ ersetzen; √-Zahlen 1,8053/1,8708 bleiben.
  - quadratische Funktion f(x) = xᵀQx: Antwort zwei Sätze mit Verweis auf
    @bemerkung:warum-der-symmetrische-anteil; die Probe bei x = (2, 3) entfällt.
  - LASSO, zwei Lösungen: Antwort ≈ 65 W (konvex, also 0 ∈ ∂f ⇒ global; Lösungsmenge
    konvex, die ganze Strecke ist optimal); die Sätze „Zwei Softwareausgaben allein …" und
    zu k-means streichen.
- Deslop: „wörtlich" (Punkt 1 der Bemerkung und Merksatz), „Zum Abschluss", „Baukasten".

**STREICHEN**

- „### Die Kernkonzepte des Kapitels" mit @bemerkung:fuenf-bausteine-die-bleiben
  (≈ 205 W). Zweite Zusammenfassung (Brief: höchstens eine je Kapitel); Label ohne
  Verweise. Mit ihr fallen `:k[Epigraph]{#convexity}`, `:k[Normen]{#norm}`,
  `:k[Projektionstheorem]{#projection}`, `:k[Jensen-Ungleichung]{#expected-value}` und
  `:k[Subgradient]{#gradient}` (erledigt den zweiten ORCHESTRATOR-Punkt); jede dieser ids
  bleibt anderswo im Kapitel verlinkt.
- Satz „Zusammengefasst: Konvexität ersetzt die Gleichheit der Linearität …" (dritte
  Zusammenfassung; der Gedanke steht in S111 „Wozu Konvexität").
- Selbsttestfrage „Im Knick x = 0 hat f(x) = |x| keinen Subgradienten, weil dort die
  Ableitung fehlt." (≈ 90 W). Dublette: ∂|x|(0) = [−1, 1] steht in S114 im Haupttext, der
  Randfall in S114 Selbsttest „Jede konvexe Funktion besitzt in jedem Punkt …", das
  Kriterium 0 ∈ ∂f prüft die LASSO-Frage.
- Die oben genannten Sätze. Labels: nur `fuenf-bausteine-die-bleiben` entfällt.

**FEHLER**

- Vertiefung „Beweis: Kritische Punkte konvexer Funktionen sind global": Schlusssatz „Der
  Satz hat zwei Konsequenzen, die wir einzeln durchgehen." steht in der Box, kündigt aber
  die Haupttext-Bemerkung an, und die nennt fünf Punkte → streichen.
- Abstiegs-Frage (V3), Antwort: „der negative Gradient zeigt dort nach rechts, und die
  Folge rollt über den ganzen Höcker hinweg bis 1,30084" ist falsch: x₀ = −0,16 liegt
  rechts vom Höckerscheitel −0,1699 (f'(−0,16) ≈ −0,056 < 0), die Folge steigt über nichts,
  sie läuft den rechten Hang hinab. → „… zeigt dort nach rechts, und die Folge läuft den
  Hang hinab bis 1,30084." Die übrigen Zahlen stimmen (Start −0,17 endet bei −1,13090;
  Zielwerte 1,9298 und −0,5139, Differenz 2,44).
- @bemerkung:was-daraus-folgt-und-was-nicht verweist zweimal auf Beweisschritte in der
  Vertiefung („Schritt 2 des Beweises", „nach Schritt 1 … Schritt 2"); siehe STRAFFEN und
  VERLAGERN.
- `:k[Subdifferential]{#gradient}` und `:k[Subgradient]{#gradient}`: siehe STRAFFEN und
  STREICHEN.

**NICHT ANFASSEN** (ORCHESTRATOR und Kap.-12-Verweise)

@satz:kritischer-punkt-und-globales-minimum im Haupttext (Beweis bleibt Vertiefung);
@bemerkung:was-daraus-folgt-und-was-nicht mit den Haupttext-Aussagen „jeder kritische
Punkt ist global", „lokal ist global, auch ohne Differenzierbarkeit", „keine Sattelpunkte",
„0 ∈ ∂f"; @satz:die-minimalstellen-bilden-eine-konvexe (Beweis-Vertiefung mit
Subniveaumengen bleibt); @definition:strikte-konvexitaet mit `{#eq-strikte-konvexitaet}`
(Widget-TSX); @satz:hoechstens-eine-minimalstelle (Beweis bleibt Vertiefung); Kasten
„Drei Landschaften nebeneinander" mit `<Landschaften />`; Vertiefung mit
`<AbstiegsBeckenSchaetzung />`; @bemerkung:eine-landkarte-der-optimierungsprobleme (Label,
Haupttext, alle Folienpunkte); Tabelle „Das Wichtigste in Kürze"; Boyd-Zeile.

## 5. Einsparung je Datei gegen den Richtwert

| Datei | Haupttext vorher | Ziel | Δ | davon verlagert | davon gestrafft/gestrichen |
| --- | ---: | ---: | ---: | ---: | ---: |
| S111 | 2 188 | 1 700–1 850 | −15 bis −22 % | +90 (Widget zurück) | ≈ 550 |
| S112 | 4 209 | 3 150–3 400 | −19 bis −25 % | ≈ 175 | ≈ 900 |
| S113 | 3 181 | 2 050–2 300 | −28 bis −36 % | ≈ 420 (+25 Ersatzsatz) | ≈ 620 |
| S114 | 3 250 | 2 300–2 500 | −23 bis −29 % | ≈ 265 (+20 Folienhalbsatz) | ≈ 580 |
| S115 | 3 265 | 2 000–2 250 | −31 bis −39 % | ≈ 320 | ≈ 950 |
| **Summe** | **16 093** | **11 200–12 300** | **−24 bis −30 %** | ≈ 1 100 | ≈ 3 600 |

Richtwert Brief −15 bis −25 %. S113 und S115 liegen deutlich darüber: S113, weil das
Winkelkriterium, die Voraussetzungs-Gegenbeispiele und die Quadrik auf keiner Folie
stehen (verlagert, nicht gestrichen); S115, weil dort die zweite Zusammenfassung, eine
Selbsttestfrage und mehrere Dubletten zu S111, S113 und S114 (Existenz, Q-Matrix,
Würfel, Subdifferential des Betrags) wegfallen. Die Vertiefungen wachsen um
≈ 1 000 Wörter; der Gesamtumfang sinkt um ≈ 13–15 %.

## 6. Ermessensposten und offene Fragen für den Dozenten

1. **Widget „Konvexkombinationen im Dreieck" (S111) zurück in den Haupttext.** Frühere
   Durchgänge hatten es mit dem Anhang-Dreieck in die Vertiefung gelegt. Sein Thema
   (Definition, Liniensegment) ist Kern; das Beispiel, auf dem es rechnet, bleibt Vertiefung.
2. **Übungen (1) und (3) in S114 bleiben im Haupttext**, obwohl die Folien diese Regeln
   nicht beweisen: Die Klausuren verlangen Konvexitätsnachweise aus der Definition, und die
   Lösungen sind zugeklappt. Wer mehr kürzen will, legt sie in die Beweis-Vertiefung darüber
   (≈ 400 W Haupttext).
3. **Winkelkriterium (S113):** Satz bleibt im Haupttext, weil das Projektions-Widget seine
   Trennlinie zeigt; Normalgleichungs-Brücke zu Kapitel 7 wandert in die Vertiefung.
4. **Gestrichene Selbsttestfragen:** S111 „konvexes Problem ⇒ genau ein globales Minimum",
   S114 „Faktor ½ in der Taylorentwicklung" (Relikt eines behobenen Folienfehlers), S115
   „Subgradient im Knick von |x|". Alle drei Inhalte stehen anderswo im Haupttext.
5. **Quadrik-Beispiel f(1, 2) = 6 (S113)** stammt aus einer alten Folienfassung und zeigt
   nur eine Auswertung; es wandert in die Vertiefung. Streichen wäre vertretbar.
6. **Folienlücken geschlossen:** „vollständiger Skalarproduktraum" (S113), LASSO und
   Quantilregression als Einsatzgebiet der Subgradienten (S114), „KQ ohne vollen
   Spaltenrang" als konvex-nicht-strikter Fall (S115); optional „nach oben geöffnet" (S113).
7. **Altbestand, nicht angefasst:** Beweis von Regel (4) in S114 läuft über den Limes
   superior statt, wie die Anhangsfolie, über gewöhnliche Grenzwerte; korrekt, aber
   umständlicher als nötig (Vertiefung). S115 Übersicht, SVM-Punkt: „w nach
   @satz:hoechstens-eine-minimalstelle eindeutig" ist eine Kurzform (die Zielfunktion ist
   in (w, b) nicht strikt konvex; das Mittelpunktargument trägt trotzdem).

## 7. Prüfungen (je Gruppe nach jeder Datei, am Ende alle)

```
cd /home/user/fmm-skript && npm run typecheck:mdx
cd /home/user/fmm-skript && node scripts/gen-numbers.mjs --check
cd /home/user/fmm-skript && npm run test:mdx
cd /home/user/fmm-skript && npm run verify:numbers
cd /home/user/fmm-skript && node reviews/straffung-2026-09-25/zaehlen.mjs 11-konvexitaet
```

Zusätzlich je Datei: IDs vorher/nachher identisch (sortierter Vergleich von `[#…]`,
`{#…}`, `:id[…]`, `:k[…]{#…}`; erwartet ist nur der Wegfall von
`fuenf-bausteine-die-bleiben` und `drei-feinheiten-zum-satz` sowie der fünf `:k`-Links
aus S115 „Kernkonzepte" und `:k[Subdifferential]{#gradient}`); `grep -n "Schritt [0-9]"`
außerhalb von Vertiefungen (§1); Zuklapp-Lesetest: Vertiefungen ausblenden und prüfen, dass
kein Haupttextsatz, kein Kasten und keine Selbsttestantwort Stoff voraussetzt, der nur in
einer Vertiefung steht.
