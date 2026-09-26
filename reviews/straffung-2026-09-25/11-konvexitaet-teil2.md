# Straffung Kapitel 11 (konvexitaet), Gruppe 2: S114, S115

Umsetzung des Plans `11-konvexitaet-plan.md` §4 samt ORCHESTRATOR-Zeile in `LESSONS.md`,
dazu ein vollständiger Deslop- und Schreibpass Zeile für Zeile. Ausgangsstand: Beide Dateien
waren gegen 21b998d noch unverändert (kein Vorgänger-Stand zu übernehmen).

## 1. Zahlen (`zaehlen.mjs 11-konvexitaet`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S114 | 3 250 → 2 478 (−23,8 %) | 2 617 → 2 814 | 5 867 → 5 292 (−9,8 %) |
| S115 | 3 265 → 2 122 (−35,0 %) | 845 → 1 121 | 4 110 → 3 243 (−21,1 %) |
| Summe G2 | 6 515 → 4 600 (−29,4 %) | 3 462 → 3 935 | 9 977 → 8 535 (−14,5 %) |

Beide Dateien liegen im Zielkorridor des Plans (S114 2 300–2 500, S115 2 000–2 250). S115
liegt über dem Brief-Richtwert (−15 bis −25 %); der Plan hat das begründet (zweite
Zusammenfassung, eine Selbsttestfrage und mehrere Dubletten zu S111/S113/S114 fallen weg).
Kapitel gesamt zum Zeitpunkt der Messung (mit dem Stand von Gruppe 1): Haupttext
16 093 → 11 801 (−26,7 %), gesamt 22 813 → 19 463 (−14,7 %).

## 2. Verlagert in Vertiefungen

**S114**
- `@bemerkung:wo-die-voraussetzungen-stecken`, Absatz „*Konvex* muss 𝒳 sein … *Offen* muss
  𝒳 sein … mit Gegenbeispielen vor" → ans Ende von „Beweis der drei Charakterisierungen"
  (eingeleitet mit „Beide Voraussetzungen an 𝒳 gehen in den Beweis ein."). EXTRA: argumentiert
  mit den Beweisschritten 1, 4, 5 der Vertiefung. Im Haupttext bleiben Label, der Satz zur
  einfachen Differenzierbarkeit (S115 verweist darauf) und „positiv definit ⇒ strikt konvex,
  nicht umgekehrt (x⁴)" (Klausuren WS25/26). Einleitungssatz „Der Satz nennt drei
  Bedingungen …" gestrichen; Titel → „Differenzierbarkeit und strikte Konvexität" (ID gleich).
- `@beispiel:quadratische-funktionen-mit-dem`, zweiter Absatz (Q = (2 3; 0 1), Eigenwerte
  6,162/−0,162, Richtung (2; −3), −0,25) → an den Anfang der bisherigen Vertiefung zur
  logistischen Regression, Titel → „Zwei weitere Beispiele zum Hesse-Kriterium". EXTRA: steht
  auf keiner Folie. Zahlen unverändert.

**S115**
- `@bemerkung:was-daraus-folgt-und-was-nicht`, ableitungsfreier Beweis von „lokal ist global"
  → neue `:::vertiefung[Lokal ist global, auch ohne Ableitung]` direkt nach der Bemerkung
  (`:k[Umgebung]{#neighborhood}` wandert mit). EXTRA: Folie 13-optim-I nennt nur die Aussage.
  Die Aussage selbst („gilt für jedes konvexe f auf einer konvexen Menge, ganz ohne Ableitung,
  also auch für Betrag und LASSO-Strafterm") bleibt im Haupttext (Kap. 12 S122 zitiert sie).
- `@bemerkung:drei-aussagen-die-auseinanderzuhalten`, letzter Absatz (perfekt trennbare Daten,
  ℓ(0) = 1,386, ℓ(10) ≈ 9,1·10⁻⁵, β = 1,18) → neue
  `:::vertiefung[Perfekt trennbare Daten in der logistischen Regression]`. EXTRA: auf keinem
  Foliensatz. Zahlen nachgerechnet.
- Selbsttestfrage zum Abstiegs-Widget (x₀ = −0,16) → in die Vertiefung „Ein Abstiegsverfahren
  auf der Doppelmulde", hinter den Kasten. Fence `::::vertiefung` → `:::::vertiefung`, darin
  `::::quiz` > `:::frage{wahr}` (Muster S121). Fragetext „Im Abstiegs-Widget oben …".

## 3. Gestrichen

**S114**
- Fahrplan-Absatz „Dieser Abschnitt liefert die Werkzeuge dafür. Zuerst … Zum Schluss …"
  (Ankündigung, Überschriften sagen dasselbe); „Jetzt die beiden Übungen."
- Selbsttestfrage „Faktor ½ in der Taylorentwicklung" (Relikt des behobenen Folienfehlers 1,
  prüft Kap.-10-Stoff eines Vertiefungs-Beweisschritts; ½ steht im Haupttext in
  `@bemerkung:eigenwerte-als-kruemmungen`).
- `@bemerkung:eigenwerte-als-kruemmungen`: Schlussabsatz zum Gradiententerm (Relikt Folienfehler
  2, Verweis auf Kap.-10-Widget) → ein Satz.
- Zielfunktionen-Beispiel: Ridge-/LASSO-/Hinge-/Risiko-Absätze je auf zwei Sätze, „Den Umweg
  über eine Regel für Verkettungen brauchen wir nicht." weg, die zweite Hinge-Formel in die
  erste Zeile eingezogen (ℓ(u) mit u = yᵢxᵢᵀβ).
- Varianz-Beispiel: Würfel-Absatz auf einen Satz (91/6, 12,25, 35/12 bleiben; Dublette zu
  S111), Satz „Die Jensen-Lücke misst hier direkt die Streuung." weg.
- Jensen-Kasten: Auswertung 130 → rund 80 Wörter.
- Absatz nach der Subgradienten-Definition: Satz über „Schritte 1 und 2 im Beweis" (zeigt in
  die Vertiefung); „(Herleitung in der Vertiefung …)" → bloßer Verweis.
- Leads (Jensen, Ableitung, Stützgeraden: Halbsatz mit Vertiefungsverweis), „Alle drei
  Aussagen beschreiben dieselbe Krümmungseigenschaft.", Übungslösung Maximum (Index-Absatz
  auf einen Satz), Selbsttest-Antworten (Differenz: letzter Halbsatz; Maximum, Minimum,
  Jensen N = 2, Subgradient je gekürzt).
- In Vertiefungen: Beweis-Schritt 3 („kostet nichts und ist robuster") auf zwei Sätze, in der
  Randpunkt-Bemerkung ein doppelter Satz zur Innerer-Punkt-Voraussetzung und der Satz „In
  beiden Fällen ist die Zielfunktion konvex, aber nicht differenzierbar" (steht jetzt im
  Haupttext).

**S115**
- „### Die Kernkonzepte des Kapitels" samt `@bemerkung:fuenf-bausteine-die-bleiben` (zweite
  Zusammenfassung; Label ohne Verweise im Repo). Mit ihr fallen `:k[Epigraph]{#convexity}`,
  `:k[Normen]{#norm}`, `:k[Projektionstheorem]{#projection}`,
  `:k[Jensen-Ungleichung]{#expected-value}`, `:k[Subgradient]{#gradient}`; jede dieser ids
  bleibt im Kapitel verlinkt (geprüft).
- Satz „Zusammengefasst: Konvexität ersetzt die Gleichheit …" (dritte Zusammenfassung).
- Selbsttestfrage „Im Knick x = 0 hat |x| keinen Subgradienten …" (Dublette zu S114).
- `@bemerkung:was-daraus-folgt-und-was-nicht`: Punkt „Nicht folgt" auf zwei Sätze mit Verweis
  (Beispiele konstante Funktion/Plateau/eˣ stehen in `drei-aussagen` bzw. im Landschaften-Kasten);
  Punkt „Und ohne Ableitung?" 135 → rund 70 Wörter.
- `@bemerkung:drei-aussagen-die-auseinanderzuhalten`: Einleitung (Rückbezug auf die
  S111-Einleitung, die Gruppe 1 kürzt) → „Drei Aussagen werden leicht verwechselt:"; Existenz-
  und „genau eine Lösung"-Absätze je auf einen bis zwei Sätze, `@kap:kq rechnet es aus` weg.
- Übersicht (`eine-landkarte-der-optimierungsprobleme`): alle Folienpunkte bleiben, je höchstens
  zwei Sätze; der Punkt „Nicht-kanonische Links" als Satz an den GLM-Punkt gehängt; „Graphische
  Modelle, wenn … die Struktur selbst gesucht wird" gestrichen (nicht auf der Folie); „Voller
  Rang allein genügt nicht" in „vollen *Spalten*rang; nur dann …" aufgegangen.
- Einleitung, Leads (Minimalstellen, Optimierungslandschaften, Übersicht ohne „Zum
  Abschluss"), Absatz nach der Definition strikter Konvexität (drei Änderungen in einem Satz,
  Zweitbezeichnung weg, Verweis auf S113), Landschaften-Auswertung, „Nächstes Kapitel" auf
  zwei Sätze, Tabellenzeile 4 („Baukasten" → „Regeln für …").
- Selbsttest: Sphäre (≈ 70 W), strikt-konvex-Frage ohne Logistik-Satz, f₁ + f₂ (Ridge ein
  Satz), Jensen (Würfel-Varianzzahlen durch Verweis ersetzt, √-Zahlen bleiben), xᵀQx (zwei
  Sätze, Probe x = (2, 3) weg), LASSO (≈ 60 W, „Zwei Softwareausgaben …" und k-means-Satz weg).

**Neu im Haupttext (Folienlücken, Inhalt aus dem Kapitel):** S114 „Weil sie keine Ableitung
brauchen, sind Subgradienten das Werkzeug für … LASSO oder Quantilregression" (Folie „Exkurs:
Subgradienten"); S115 Übersicht „Kleinste Quadrate ohne vollen Spaltenrang: entlang eines
Kernvektors konstant" (Folie 13-optim-I, Inhalt aus `@beispiel:kleinste-quadrate-und-ridge`).

## 4. Reparierte Fehler

- S115, Abstiegsfrage: „die Folge rollt über den ganzen Höcker hinweg bis 1,30084" war falsch;
  x₀ = −0,16 liegt rechts vom Höckerscheitel −0,1699 (f'(−0,16) = −0,0564 < 0), die Folge
  läuft den rechten Hang hinab. Dazu der Grammatikfehler „entscheidet über einen Zielwert, der
  um 2,44 auseinanderliegt" → „entscheidet zwischen zwei Endpunkten, deren Funktionswerte um
  2,44 auseinanderliegen" (1,9298 − (−0,5139) = 2,4437).
- S115, Beweis-Vertiefung: Schlusssatz „Der Satz hat zwei Konsequenzen, die wir einzeln
  durchgehen." stand in der Box, kündigte die Haupttext-Bemerkung an (die fünf Punkte hat)
  → gestrichen.
- Haupttext zeigte auf Beweisschritte in Vertiefungen: S114 Absatz nach der
  Subgradienten-Definition, S114 `wo-die-voraussetzungen-stecken`, S115 `was-daraus-folgt`
  („Schritt 2 des Beweises, wörtlich", „nach Schritt 1 … Schritt 2") → auf die Aussagen
  umgestellt. `grep "Schritt [0-9]"` außerhalb von Vertiefungen: keine Treffer mehr.
- S115 `:k[Subdifferential]{#gradient}` (Pop-up erklärt keine Subgradienten) → Klartext mit
  `@definition:subgradient-und-subdifferential` (ORCHESTRATOR); `:k[Subgradient]{#gradient}`
  fiel mit der Zusammenfassung.
- S114, Absatz nach der Subgradienten-Definition: „Ist f in einem inneren Punkt differenzierbar,
  so ist ∇f(x)ᵀ ein Subgradient" setzte stillschweigend Konvexität voraus (die Definition
  verlangt sie nicht) → „Ist f konvex und …".
- S115, Vertiefung „Lokal ist global": Quantorenreihenfolge „Für kleines λ liegt z_λ in jeder
  noch so kleinen Umgebung" → „Für hinreichend kleines λ liegt z_λ in jeder vorgegebenen
  Umgebung".
- Nachgerechnet und korrekt: ℓ(0) = 1,386, ℓ(10) = 9,1·10⁻⁵, σ(1,18) = 0,7649 ≈ 1 − 0,2·1,18;
  E[√X] = 1,8053 < √3,5 = 1,8708; Sphäre 0,9798 und Gewicht 0,6531.

## 5. Ermessensentscheidungen und offene Fragen

1. **Titel geändert** (IDs unverändert): Kasten „Die Jensen-Ungleichung mit Reglern" → „… an
   drei Stützstellen" (Tell wie „zum Schieben"); `wo-die-voraussetzungen-stecken` →
   „Differenzierbarkeit und strikte Konvexität" (die Voraussetzungen an 𝒳 stehen jetzt in der
   Vertiefung).
2. **Jensen-Selbsttest (S115)** verweist für die konkave Umkehrung jetzt auf
   `@bemerkung:gewichte-als-wahrscheinlichkeiten` (sagt f(E X) ≥ E f(X) wörtlich) statt auf
   `@bemerkung:wie-wir-die-ungleichung-lesen` (Sehnenungleichung).
3. **SVM-Punkt der Übersicht** (Plan §6.7, Altbestand): „w nach @satz:hoechstens-eine-minimalstelle
   eindeutig" minimal zu „mit dem Argument von @satz:… eindeutig" präzisiert, weil die
   Zielfunktion in (w, b) nicht strikt konvex ist.
4. **Graphisches LASSO:** Verweis auf `@bemerkung:kovarianzmatrizen-sind-semidefinit-nicht`
   behalten, der Zusatz „Innere des Kegels … innerhalb des Raums der symmetrischen Matrizen"
   auf „eine konvexe Menge" verkürzt (Gruppe 1 behält den Satz in S112).
5. **Schwellenwertregel (S115):** Der Haupttext nannte sie ohne Erklärung (die Regel steht nur
   in der S114-Vertiefung); ergänzt ist der Halbsatz „die Koeffizienten exakt auf null setzt"
   (aus S114, nichts Neues).
6. **Randpunkt-Selbsttest in S114** („Jede konvexe Funktion besitzt in jedem Punkt …") stützt
   sich auf das Gegenbeispiel −√x, das nur die Vertiefung entwickelt; die Antwort trägt das
   Gegenbeispiel selbst (Plan: bleibt). Wer strenger sein will, verlegt die Frage mit in die Box.
7. **Übungen (1) und (3)** in S114 bleiben im Haupttext (Plan §6.2).
8. `@bemerkung:was-die-vier-regeln-zusammen-hergeben` wird nach dem Wegfall des Halbsatzes im
   Stützgeraden-Lead von nirgends mehr verwiesen; Label bleibt (Vertiefung).
9. Zwei Plan-Abweichungen im Wortlaut: S115 Punkt 2 behält im Haupttext den Halbsatz „also auch
   für den Betrag oder den LASSO-Strafterm" (Plan wollte ihn mit dem Beweis verlagern; er ist
   Aussage, nicht Beweis); S114 „der LASSO" → „das LASSO" (einheitlich mit S115).

## 6. Prüfungen (Endstand, alle vier)

- `npm run typecheck:mdx`: 206 Dateien, keine Fehler.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur „Tabelle nicht aktuell").
- `npm run test:mdx`: 137/137 Fixtures, Inventar- und Orakeltest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich (die bekannte
  `\cbblue`-Negativtestzeile).
- IDs vorher/nachher (sortierter Vergleich `[#…]`, `{#eq-…}`, `:id[…]`, `:k{#…}`): nur
  `fuenf-bausteine-die-bleiben` und die sechs erwarteten `:k`-Links entfallen.
- Headless-MathJax (187 Makros, `noundefined` aus, Negativtest greift): 656 Literale in S114/S115,
  0 Fehler.
- Zuklapp-Test (`scratchpad/k11g2/k11g2_zuklapp.py`): Haupttext-Verweise in Vertiefungen nur
  als Belegverweise hinter im Haupttext stehenden Aussagen
  (`randpunkte-und-wozu-subgradienten-gut`, `das-subdifferential-des-betrags`,
  `logistische-regression-ist-ein-konvexes`); Gedankenstriche: keine.
- Fehler in fremden Dateien: keine beobachtet.
