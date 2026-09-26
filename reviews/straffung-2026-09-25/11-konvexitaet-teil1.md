# Kapitel 11 (konvexitaet), Gruppe 1: S111, S112, S113 – Bericht

Grundlage: `BRIEF.md`, `11-konvexitaet-plan.md` (Gruppe 1), ORCHESTRATOR-Zeilen in
`LESSONS.md`. Ausgangsstand: Basis-Commit 21b998d; beim Start waren alle drei Dateien noch
unverändert (`git diff 21b998d` leer), es gab also keinen Vorgängerstand zu übernehmen.

## 1. Zahlen (`zaehlen.mjs 11-konvexitaet`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S111 | 2 188 → 1 735 (−20,7 %) | 739 → 596 | 2 927 → 2 331 (−20,4 %) |
| S112 | 4 209 → 3 222 (−23,4 %) | 1 199 → 1 363 | 5 408 → 4 585 (−15,2 %) |
| S113 | 3 181 → 2 244 (−29,5 %) | 1 320 → 1 768 | 4 501 → 4 012 (−10,9 %) |
| **Gruppe 1** | **9 578 → 7 201 (−24,8 %)** | **3 258 → 3 727** | **12 836 → 10 928 (−14,9 %)** |

Alle drei Dateien liegen in den Zielkorridoren des Plans (S111 1 700–1 850, S112
3 150–3 400, S113 2 050–2 300). Die S111-Vertiefung ist geschrumpft, weil das
Konvexkombinations-Widget aus ihr in den Haupttext zurückgekehrt ist.

## 2. In Vertiefungen verlagert (bzw. aus ihnen zurückgeholt)

- **S111, Kasten „Konvexkombinationen im Dreieck"** (vorher „… zum Schieben", in der
  Vertiefung „Die konvexe Hülle dreier Punkte ausführlich berechnet"): **zurück in den
  Haupttext**, ans Ende von „Zwei Punkte: das Liniensegment". KERN: Folien
  „Konvexkombinationen" (Definition, Liniensegment). Neues Lead-in (eine Frage, nennt die
  Ecken (0,0), (2,0), (1,2), damit die PDF-Fassung ohne Widget lesbar ist), Auswertung
  drei Sätze. Der Hilfsstrecken-Absatz mit der `\underbrace`-Formel bleibt in der
  Vertiefung, jetzt als Schlussabsatz nach @bemerkung:rand-und-inneres-an-den-gewichten,
  und verweist statt auf `@sec:konvexe-mengen` direkt auf
  @satz:konvexe-mengen-enthalten-alle (Induktionsschritt).
- **S112, Extrempunkte:** Beispiele offener Ball / euklidischer Ball / ∞-Norm-Quadrat
  (≈ 75 W) ans Ende der Vertiefung, Titel jetzt „Extrempunkte: beide Fassungen und
  Beispiele". EXTRA: auf keiner Folie. Der Satz „Ein Extrempunkt liegt also auf keiner
  Strecke …" bleibt im Haupttext, steht jetzt aber direkt hinter der Definition (vor der
  Box), weil er sie deutet.
- **S112, @beispiel:der-simplex:** Beweis der Extrempunkte in neue
  `:::vertiefung[Warum die Ecken des Simplex seine Extrempunkte sind]` direkt nach dem
  Beispiel (Plan: opt.). EXTRA: Folie nennt die Extrempunkte ohne Beweis. Im Beispiel
  bleiben Aussage und conv{e₁, …, e_N}.
- **S113, @bemerkung:jede-voraussetzung-wird-gebraucht** in die Beweis-Vertiefung des
  Projektionstheorems (Titel „Beweisskizze und Voraussetzungen des Projektionstheorems").
  EXTRA: Gegenbeispiele auf keiner Folie, Bemerkung rechnet mit „Schritt 5". Ersatz im
  Haupttext direkt nach dem Satz: „Der Satz gilt ebenso in jedem *vollständigen*
  Skalarproduktraum; wir brauchen nur den endlichdimensionalen Fall." (Folie/Wrap-up).
- **S113, Winkelkriterium:** Absätze „Abgeschlossenheit und endliche Dimension braucht
  dieses Kriterium nicht …" und „Ist 𝒳 = 𝒰 sogar ein Untervektorraum …"
  (Normalgleichungen) an den Anfang der Vertiefung, Titel „Winkelkriterium: Beweis,
  Normalgleichungen und Projektionsformeln", Einleitungssatz des Beweises angepasst
  („wie im Eindeutigkeitsbeweis des Projektionstheorems"). EXTRA: Kriterium auf keiner
  Folie. @satz:kriterium-des-stumpfen-winkels selbst bleibt im Haupttext
  (Projektions-Kasten und Widget-TSX brauchen ihn); der Lead behält den Halbsatz „für
  Untervektorräume wird daraus die bekannte Orthogonalität".
- **S113, @beispiel:eine-quadrik-ausgerechnet** in die Beweis-Vertiefung des
  Quadratik-Kriteriums (Titel „Quadratische Funktionen: Beweis und Zahlenbeispiel").
  EXTRA: stammt aus einer alten Folienfassung; keine Verweise darauf.

## 3. Gestrichen

S111
- Absatz „Vorsicht bei Formulierungen, die konvexen Problemen gleich *eindeutige* …"
  → ein Satz am Ende von „Warum sich das lohnt" (Eindeutigkeit/Existenz; Verweis auf
  @sec:konvexe-optimierung). Dublette zu S115. Der Hinweis auf die Konvergenzgarantien in
  @kap:optim entfällt dabei.
- „Dieser Abschnitt legt die Grundlagen dafür.", „Wir beginnen mit dem Grundbaustein."
  (Meta-Sätze). Die Vorkenntnisliste bleibt mit allen zehn `:k`-Links.
- Absatz „Eine Menge wird *konvex* heißen …" (Dublette zu S112
  @bemerkung:was-die-bedingung-verlangt).
- @bemerkung:ein-gewichteter-durchschnitt: „Zwei Bedingungen kommen hinzu.", Sonderfall
  k = 1; @bemerkung:warum-endlich-viele: „Drei Details …", Carathéodory (EXTRA ohne Folge);
  @bemerkung:extrempunkt-zu-sein-ist-keine, zweiter Absatz auf einen Satz;
  @bemerkung:die-kleinste-konvexe-obermenge auf Folienaussage + Verweise (Beweisidee
  doppelte S112).
- Selbsttestfrage „Ist ein Optimierungsproblem konvex, so besitzt es genau ein globales
  Minimum." (Dublette zu S115, Stoff in 11.1 noch nicht entwickelt).
- In der Vertiefung die innere Überschrift „### Beispiel im ℝ²: das Dreieck" (doppelte den
  Boxtitel und den Beispieltitel; ohne `:id`).
- Selbsttests: x₁ − x₂-Satz, „Für endliches 𝒳 reicht dagegen N = k" (steht in der
  Bemerkung), zahlfrage 7 auf drei Sätze (Zahl 7,46 bleibt).

S112
- @bemerkung:drei-feinheiten-zum-satz ganz (Label ohne Verweise im Repo; Relikt Folienfehler
  6, Dubletten zu `::why` in Beweisschritten 1 und 3). Ersatzsatz nach der Beweis-Box: „Die
  beliebige Indexmenge beim Schnitt brauchen wir für @satz:konvexe-huelle-als-durchschnitt …".
- @bemerkung:was-die-bedingung-verlangt, Absatz „Drei Details zur Definition …" (kaputter
  Satz, Dublette zur Quizfrage leere/einelementige Menge).
- Kegel-Kasten: Absatz „Eine weitere Beobachtung: Schneiden wir den Kegel mit der Ebene
  a + c = 2 …" (EXTRA).
- Kovarianz-Bemerkung: Einleitungsabsatz „Als Anwendung liest man häufig …" (Relikt
  Folienfehler 3) auf einen Satz; Satz „Im vollen ℝⁿˣⁿ hätte 𝒫ₙ dagegen gar kein Inneres …".
- @beispiel:offener-ball: Schlussabsatz „Der strikte Schritt kommt dabei immer …".
- @beispiel:ein-dreieck-als-schnitt-dreier: Satz zum Widget-Knopf „Dreieck".
- „Zum Abschluss eine Anwendung aus der Optimierung.", „Fünf Mengen, jeweils mit Rechnung."
  (Quiz-Intro), „Für die Anwendung des Satzes genügt seine Aussage." (Vertiefung).
- Gekürzt: Einleitung, Leads vor Satz/Extrempunkt/PSD/n = 2/Operationen/Hülle,
  Symmetrie-Absatz (ohne Cholesky-Halbsatz; steht in der Kovarianz-Bemerkung),
  Kasten-Auswertungen, Quiz-Antworten (Sphäre koordinatenfrei ein Satz, Parabel-Schluss ein
  Satz, zahlfrage 0,38 ohne 0,778-Wiederholung und Bisektion, Kegel-Quiz je ein Satz),
  Budget-Beispiel („Bemerkenswert" weg), @bemerkung:was-der-satz-leistet-und-was-nicht auf
  zwei Absätze à zwei Sätze, Beweis Schritt 4 und `::why` in Schritt 1 des Hüllensatzes.

S113
- Schlussabsatz „An der quadratischen Form hängt mehr …" (H_f = Q + Qᵀ rechnet S114 nach;
  Fisher-Information EXTRA). Damit fällt `:k[Hesse-Matrix]{#hessian-matrix}` in S113; die id
  bleibt in S114 verlinkt.
- Epigraph-Etymologie („wörtlich ‚darüber geschrieben'"), „Die Punkte darunter gehören nicht
  dazu."
- Absatz nach `<KonvexKonkavPanels />` und Sehnen-Kasten: die Betrags-Sätze (Gleichheit auf
  einem Ast) und der Parabel-Satz; „konvex, aber nicht strikt" steht einmal, nach dem
  Betrags-Beweis.
- @bemerkung:warum-der-symmetrische-anteil: „In der Praxis fällt das selten ins Gewicht …
  kostet aber nichts."
- Selbsttest: e^x-Satz „Standardbeispiel dafür, dass Konvexität allein noch kein Minimum
  liefert" (Dublette zu S115), Epigraph-Frage „nur, wenn sie affin ist", zahlfrage 1,891
  „Zum Vergleich …" (steht im Kasten).
- Gekürzt: Einleitung (Rückblick weg), Leads (Winkelkriterium, Epigraph, Ungleichung,
  Beispiele, Betrag), Geometrie-Absatz zum Winkelkriterium, Projektions- und Sehnen-Kasten,
  Definitionsbereich-Bemerkung (erster Absatz auf zwei Sätze), Betrags-Beweis Schritt 2,
  Norm-Beweis Schritt 2, „Strikt konvex ist keine Norm" auf zwei Sätze.

Kein Label entfällt außer `drei-feinheiten-zum-satz`. ID-Vergleich (sortiert, Basis gegen
jetzt): S111 identisch; S112 nur `[#drei-feinheiten-zum-satz` weg; S113 nur
`:k{#hessian-matrix}` weg (beides laut Plan erwartet).

## 4. Reparierte Fehler

- S111: „Die Log-Likelihood selbst ist in diesen Modellen konkav" war zu stark (Folie:
  *meist*) → „die Log-Likelihood selbst ist bei kanonischem Link konkav".
- S111: Zeilenumbruch „Kullback-Leibler-⏎Divergenz" renderte als „Kullback-Leibler-
  Divergenz" (Leerzeichen nach Bindestrich) → in eine Zeile gezogen.
- S112: „Die Randfälle λ = 0 und λ = 1 zugelassen;" (Verb fehlte) – erledigt mit dem
  gestrichenen Absatz.
- S112: `::why` in Schritt 3 des Induktionsbeweises mit doppeltem „macht" repariert.
- S112: @beispiel:offener-ball führte x, y nicht ein → „Seien x, y ∈ 𝒳 und λ ∈ [0,1]."
- S112: Boyd-Zeile widersprach sich (§2.2 und §2.3 … mit §2.1 …) → „§2.1 bis §2.3: …".
- S112: Halbsatz „ohne Symmetrie wäre A ⪰ 0 also gar keine Eigenschaft von A allein"
  (irreführend: xᵀAx ≥ 0 ist sehr wohl eine Eigenschaft von A) fiel mit dem gekürzten
  Symmetrie-Absatz weg.
- S113: Selbsttest x⁴ belegte mit f'' ≥ 0 nur Konvexität, nicht die behauptete strikte →
  „Konvex ist sie nach @sec:eigenschaften wegen f'' = 12x² ≥ 0, strikt konvex auch über den
  Nullpunkt hinweg, obwohl dort f''(0) = 0 ist." (S114 Haupttext belegt beides.)
- S113: Haupttext zeigte auf Beweisschritte in Vertiefungen („nach Schritt 5 des Beweises"
  im Projektions-Kasten, „wie Schritt 2 zeigt" in @bemerkung:warum-der-symmetrische-anteil)
  → auf die Aussage selbst umformuliert.
- S113 (Zuklapp-Lesetest): Der Projektions-Kasten sprach vom „Radius d", d war nur im
  Beweis (Vertiefung) definiert → „mit Radius d = ‖x − x̂‖".

## 5. Ermessensentscheidungen und offene Fragen

1. **Widget „Konvexkombinationen im Dreieck" im Haupttext** (Plan §6.1). Es steht im
   Abschnitt „Zwei Punkte", also vor der Hüllendefinition; seine Statustexte verweisen per
   `ref()` vorwärts auf Extrempunkt-Definition und Rand/Inneres-Bemerkung (Vertiefung).
2. **„bei kanonischem Link konkav" (S111):** präzise, aber „kanonischer Link" wird erst in
   S115 benutzt. Alternative wäre die Folienformulierung „meist konkav".
3. **S111, Vorsicht-Absatz:** der Pointer „in @kap:optim hängen daran die
   Konvergenzgarantien" ist mit dem Absatz weggefallen.
4. **S112, Kovarianz-Bemerkung:** Der erste Satz sagt jetzt „Kovarianzmatrizen … bilden die
   konvexe Menge 𝒫ₙ" (vorher: „Die konvexe Menge, die hier gemeint ist, ist also 𝒫ₙ" im
   Schlussabsatz; die Aussage ist gleich geblieben, nur zusammengezogen, weil ihr Bezug
   „liest man häufig" gestrichen war). Der Satz zu den positiv definiten Matrizen
   (S115 verweist) steht unverändert.
5. **S112, Extrempunkt-Beispiele in der Vertiefung:** @bemerkung:was-der-satz-leistet-und-was-nicht
   nennt „der offene Ball hat gar keine Extrempunkte" im Haupttext; die Begründung (jeder
   Punkt ist Mittelpunkt zweier anderer) steht jetzt nur in der Vertiefung. Ist aus der
   Definition direkt zu sehen.
6. **S113, e^x-Selbsttest:** statt nur zu kürzen, Begründung der Folienlösung ergänzt
   („denn f''(x) = e^x > 0", Verweis @sec:eigenschaften).
7. **S113, „nach oben geöffnet"** (Plan: opt.) als Halbsatz in
   @bemerkung:wie-wir-die-ungleichung-lesen ergänzt (Folie „Konvexe Funktionen").
8. **Nicht meine Dateien, zur Kenntnis:** (a) `widgets/S113Sehne.tsx`, Tafeltitel „konvex,
   nicht streng" – das Kapitel sagt durchgehend „strikt" (TSX nicht angefasst). (b) S115
   (Gruppe 2) sagt „Satz von Weierstraß, wie in @satz:projektionstheorem"; der
   Weierstraß-Schritt steht nur im Beweis in der Vertiefung.

Zahlen wurden nicht verändert; nachgerechnet habe ich stichprobenweise die λ-Grenzen
0,3798/0,6202 und 1,1/√2 ≈ 0,778 (Kreisring).

## 6. Prüfungen (Endstand)

- `npm run typecheck:mdx`: 206 MDX-Dateien, keine Fehler.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur „Tabelle ist nicht aktuell").
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich.
- Headless-MathJax (187 Makros, ohne `noundefined`, Negativtest greift) über S111–S113:
  923 Literale, 0 Fehler.
- Zuklapp-Lesetest (Vertiefungen ausgeblendet): kein Haupttext-Verweis auf eine
  Vertiefungs-ID; „Schritt n" im Haupttext nur noch innerhalb von Haupttext-Beweisen
  (Hüllensatz in S112, Norm-Beweis in S113). Gedankenstriche: keine. Getippte
  Kapitelnummern: keine (nur Boyd „Kapitel 3").
- Fehler in fremden Dateien: keine aufgetreten.
