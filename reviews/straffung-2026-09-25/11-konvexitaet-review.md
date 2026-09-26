# Gutachten Straffung Kapitel 11 (konvexitaet)

Grundlage: `BRIEF.md`, Plan `11-konvexitaet-plan.md`, Berichte `11-konvexitaet-teil1.md`
und `-teil2.md`, die ORCHESTRATOR-Zeilen in `LESSONS.md` (Kap.-12-Stoff aus 13-optim-I und
14-optim-II bleibt in 11.4/11.5 im Haupttext; sie ersetzt den Kapitelhinweis „11.5 behält nur,
was Folie 12-konvexitaet trägt"). Gelesen habe ich den vollständigen Diff gegen 21b998d, alle
fünf Dateien im neuen Stand, das Deck `12-konvexitaet.qmd` und dazu die Folien aus
13-optim-I („Konvexe Funktionen in der Optimierung" bis Callout „So wichtig") sowie
14-optim-II („Exkurs: Subgradienten"). Außerdem habe ich einen Zuklapp-Test per Skript laufen
lassen (`scratchpad/k11r/zuklapp.py`, blendet Vertiefungen aus und prüft `@typ:id` und `@eq:`
gegen IDs, die nur in Vertiefungen stehen) und die Klausuren gegengeprüft (WS23/24 bis WS25/26,
`questions/konvexitaet`).

## 1. Zahlen (`zaehlen.mjs 11-konvexitaet`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S111 | 2 188 → 1 749 (−20,1 %) | 739 → 629 | 2 927 → 2 378 (−18,8 %) |
| S112 | 4 209 → 3 250 (−22,8 %) | 1 199 → 1 374 | 5 408 → 4 624 (−14,5 %) |
| S113 | 3 181 → 2 245 (−29,4 %) | 1 320 → 1 768 | 4 501 → 4 013 (−10,8 %) |
| S114 | 3 250 → 2 475 (−23,8 %) | 2 617 → 2 853 | 5 867 → 5 328 (−9,2 %) |
| S115 | 3 265 → 2 125 (−34,9 %) | 845 → 1 121 | 4 110 → 3 246 (−21,0 %) |
| **Summe** | **16 093 → 11 844 (−26,4 %)** | **6 720 → 7 745** | **22 813 → 19 589 (−14,1 %)** |

Vor meinem Durchgang: Haupttext 11 801, gesamt 19 463. Meine Änderungen fügen dem Haupttext
43 und den Vertiefungen 83 Wörter hinzu (zwei Rückholungen, eine Präzisierung, siehe §2).
Der Haupttext liegt knapp über dem Richtwert (−15 bis −25 %). Der Plan hat das begründet: Die
Aussage „lokal ist global / Eindeutigkeit / Existenz" stand sechsmal im Kapitel, es gab zwei
Zusammenfassungen hintereinander, und S113 trug viel Stoff, der auf keiner Folie steht. Ich habe
geprüft, ob dabei Kernstoff verloren ging (§3), und keinen Verlust gefunden. Nachlegen ist
nicht nötig.

## 2. Meine Änderungen (9, je mit Grund)

1. **S111, Einleitung, Log-Likelihood.** Gruppe 1 hatte „ist in diesen Modellen konkav" zu
   „Konvex ist dabei die negative Log-Likelihood …; die Log-Likelihood selbst ist bei
   kanonischem Link konkav" zusammengezogen. Damit stand die Konvexität pauschal da und ihre
   Einschränkung im Nebensatz. Außerdem kommt „kanonischer Link" erst in S115 vor. Jetzt in der
   Fassung der Folie: „Meist ist die Log-Likelihood konkav (in verallgemeinerten linearen
   Modellen etwa bei kanonischem Link), konvex ist dann die *negative* Log-Likelihood, die wir
   minimieren." (Erledigt Frage 2 aus Teil 1.)
2. **S112, Einleitung.** Der Satz „Ist die zulässige Menge, also die Menge aller Punkte, die die
   Nebenbedingungen erfüllen, konvex, so darf …" war ein Schachtelsatz mit eingeschobener
   Apposition. Ich habe ihn in zwei Hauptsätze aufgelöst (STYLE: kurze Hauptsätze).
3. **S112, @bemerkung:kovarianzmatrizen-sind-semidefinit-nicht, Schluss.** Gestrichen war der
   Satz, der erklärt, warum *innerhalb des Raums der symmetrischen Matrizen* kursiv steht (im
   vollen ℝⁿˣⁿ gibt es kein Inneres). Ohne ihn war die Hervorhebung unbegründet. Ich habe ihn
   wiederhergestellt und dabei korrigiert: Die Aussage gilt erst für n ≥ 2, denn für n = 1 ist
   jede Matrix symmetrisch. Diese Einschränkung fehlte auch im Ausgangsstand.
4. **S112, Vertiefung „Warum die Ecken des Simplex seine Extrempunkte sind".** Die Stelle
   „Mittelpunkt von x ± ε(eⱼ − eₖ)" setzt voraus, dass beide Punkte im Simplex liegen. Ergänzt:
   „mit 0 < ε ≤ min{xⱼ, xₖ}, zweier Punkte von Δᴺ". Präzisierung eines Altbestands in der
   Vertiefung.
5. **S113, Text nach `<KonvexKonkavPanels />`.** Die Tafeln wurden über ihre Position
   angesprochen („rechts", „die zweite"). Jetzt stehen dort die Titel aus dem TSX, „konkav" und
   „weder noch" (Lesson Kap. 11 Gruppe 2).
6. **S114, Satz nach @satz:operationen-die-konvexitaet-erhalten.** „Die Teile (2) und (4) beweist
   die Vertiefung, (1) und (3) sind Übungen." Das ist der Hinweis „Beweis in der Vertiefung",
   den der Brief (§4) für überflüssig hält, weil die Box direkt darunter steht. Neu: „Die Teile
   (1) und (3) lösen wir unten als Übungen."
7. **S114, Vertiefung „Zwei weitere Beispiele zum Hesse-Kriterium", Ende von
   @beispiel:logistische-regression-ist-ein-konvexes. Übereifer rückgängig gemacht.** Gruppe 1
   hatte den S113-Schlussabsatz „An der quadratischen Form hängt mehr …" ganz gestrichen. Die
   Dublette H_f = Q + Qᵀ war richtig erkannt. Mit ihr fiel aber der einzige Hinweis des
   Kapitels, dass die Hesse-Matrix der negativen Log-Likelihood die beobachtete
   Fisher-Information ist und die Standardfehler liefert, und dass Eigenwerte nahe null
   schlecht bestimmte Richtungen bedeuten. Für Statistik-Studierende ist das gutes
   EXTRA-Material. Es steht jetzt als ein Absatz am Ende des Logistik-Beispiels (Vertiefung),
   bezogen auf H_ℓ an der Schätzung β̂.
8. **S111, Schluss der Vertiefung „Die konvexe Hülle dreier Punkte ausführlich berechnet".
   Übereifer rückgängig gemacht.** Der Satz von Carathéodory (Konvexkombinationen im ℝⁿ kommen
   mit höchstens n+1 Punkten aus) war aus @bemerkung:warum-endlich-viele gestrichen worden. Er ist
   EXTRA, hat aber Lernwert und passt an das Ende der Dreiecks-Vertiefung („in der Ebene also
   von dreien"). Dort steht er jetzt als ein Satz, nach dem Satz zum Induktionsschritt.
9. **S115, @bemerkung:drei-aussagen-die-auseinanderzuhalten.** „(Satz von Weierstraß, wie in
   @satz:projektionstheorem)" zeigte auf einen Satz, in dem Weierstraß nicht vorkommt. Er steht
   nur im Beweis, und der ist Vertiefung. Jetzt: „so auch im Beweis von
   @satz:projektionstheorem". Das erledigt Frage 8b aus Teil 1. Den Satz selbst erklärt das
   Pop-up `closed-bounded-set`, das an „kompakte" hängt.

Zahlen, Mathe-Inhalt, IDs, Widget-Tags und Props sind unverändert. Neue Mathe-Literale nutzen
nur Makros, die das Kapitel schon verwendet.

## 3. Geprüft und bestätigt (ohne Änderung)

- **Folien-Kernstoff im Haupttext (zugeklappt gelesen):** Alle gezählten Folien von
  12-konvexitaet sind abgedeckt, samt Vorkenntnisliste, Quiz „Konvexe Mengen" (fünf Mengen),
  Self-Check „Konvexe Funktionen" (fünf Funktionen) und Self-Check „Klassifikation". Den Betrag
  als „konvex, nicht strikt" behandelt der Absatz nach dem Betrags-Beweis. Die Folienbeweise
  (PSD-Kegel, Hülle als Durchschnitt, Betrag) stehen im Haupttext. Die Anhangsbeweise
  (Projektion, Konvexitätserhaltung, C²-Charakterisierung, (ii)+(iv)) stehen in Vertiefungen.
  Auch der Folienstoff aus 13-optim-I (kritischer Punkt ⇔ globales Minimum, „lokal ist global",
  strikte Konvexität, höchstens ein Minimum, Landschaften, Übersicht mit allen Folienpunkten
  einschließlich Hyperparameter und „KQ ohne vollen Spaltenrang", keine Sattelpunkte) und aus
  14-optim-II (Subgradient, Existenz, Eindeutigkeit bei Differenzierbarkeit, LASSO und
  Quantilregression, Knick von |x|) steht im Haupttext. Den Folienpunkt „Spezialfall
  Projektionstheorem: quadrierte Distanz strikt konvex" trägt Kap. 12 (S122), keine Dublette
  nötig.
- **Zuklapp-Test:** Keine Haupttextstelle setzt eine nur in Vertiefungen definierte ID voraus.
  Die fünf verbleibenden Treffer sind Belegverweise hinter Aussagen, die im Haupttext stehen
  (S114: Stützgeraden-Jensen, ∂|x|(0), −√x am Rand; S115: Schwellenwertregel, logistischer
  Fall). Treffer für „Schritt n" im Haupttext gibt es nur noch innerhalb von Haupttext-Beweisen
  (Hüllensatz S112, Norm S113). Kein Selbsttest braucht Vertiefungsstoff.
- **Selbsttests:** Jede Antwort passt als eigener Satz zu ihrer wahr/falsch-Marke. Die
  gestrichenen Fragen (S111 „konvex ⇒ genau ein Minimum", S114 „Faktor ½", S115 „Subgradient im
  Knick") sind Dubletten oder Relikte behobener Folienfehler. Ihr Inhalt steht jeweils an
  anderer Stelle im Haupttext.
- **Fachliche Änderungen der Editoren nachgeprüft:** Abstiegsfrage S115 (Startwert −0,16 rechts
  vom Höcker −0,1699, f′(−0,16) < 0, Endpunkt 1,30084; Differenz der Zielwerte 2,4437), „Ist f
  konvex und … differenzierbar, so ist ∇f(x)ᵀ der einzige Subgradient" (S114), x⁴-Antwort (S113),
  Quantorenreihenfolge in „Lokal ist global" (S115). Alle korrekt.
- **Klausur-Gegenprobe:** Dreieck als Schnitt, strikt konvex über positiv definite
  Hesse-Matrix, „kritischer Punkt einer strikt konvexen Funktion ist das eindeutige globale
  Minimum", Jensen-Anwendungen und Konvexität der Norm stehen alle im Haupttext.
- **Deslop:** Die Regex aus `german-tells.md` findet im Kapitel nur zwei Fehltreffer
  („entbehrlich", ein echtes „nicht nur" im `::why` einer Vertiefung). Das Kapitel enthält null
  Gedankenstriche. Die Haus-Tics („wörtlich", „Zum Schluss/Abschluss", „Baukasten",
  „Bemerkenswert", „Drei Details") sind vollständig entfernt. Wo „genau" steht, ist es
  mathematisch gemeint. Es gibt keine getippten Kapitelnummern (nur Boyd „Kapitel 3/4").
- **Syntax und IDs:** Alle Fence-Stufen sind korrekt (Quiz in der Abstiegs-Vertiefung als
  `:::::` > `::::quiz` > `:::frage`), und alle Titel sind Klartext. Entfallen sind nur
  `drei-feinheiten-zum-satz` und `fuenf-bausteine-die-bleiben`, beide nirgends im Repo
  verwiesen. Außerdem entfallen die sechs erwarteten `:k`-Links (S113 `hessian-matrix`, S115
  Kernkonzepte und `{#gradient}` am Subdifferential). Jede dieser IDs bleibt im Kapitel
  verlinkt.
- **Vertiefungen:** Es gibt keine Mini-Box unter 60 Wörtern (die kleinste hat 79 Wörter, „Lokal
  ist global, auch ohne Ableitung"). Die drei neuen Boxen haben je einen eigenen Gegenstand und
  stehen nicht neben einer passenderen Box.

## 4. Restpunkte und Fragen für den Dozenten

1. **Haupttext −26,4 %**, also leicht über dem Richtwert. Die Begründung steht in §1. Wer
   weniger kürzen will, holt am ehesten die Probe x = (2, 3) in der Q-Frage (S115) oder den
   ausführlichen Existenzabsatz in „Drei Aussagen" zurück. Beides ist BRÜCKE, nicht Kern.
2. **Widget-Titel „konvex, nicht streng"** (S113Sehne.tsx, KonvexKonkavPanels) gegen „strikt"
   im Text. Die Bemerkung nennt beide Namen, stimmig ist es also. Einheitlich wäre „strikt".
   Das betrifft eine TSX-Datei, die ich nicht anfasse.
3. **Kovarianz-Bemerkung (S112):** „Kovarianzmatrizen … bilden die konvexe Menge 𝒫ₙ" stimmt,
   denn jede psd-Matrix ist eine Kovarianzmatrix. Der „nämlich"-Satz belegt aber nur die
   Inklusion. Falls das stört, würde ich „liegen in der konvexen Menge 𝒫ₙ" schreiben.
4. **Übungen (1) und (3) in S114** bleiben im Haupttext (Plan §6.2). Das halte ich wegen der
   Klausuraufgaben „Konvexität aus der Definition" für richtig.
5. **Altbestand, nicht angefasst:** Die Vertiefung mit dem offenen Ball (S112) sagt „jeder Punkt
   ist Mittelpunkt zweier anderer", das stimmt nur für V ≠ {0}. Der Beweis zu Regel (4) (S114)
   läuft über den Limes superior statt über gewöhnliche Grenzwerte (Plan §6.7).

## 5. Prüfergebnis (Brief §7, Endstand)

- `npm run typecheck:mdx`: 206 MDX-Dateien, keine Fehler.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur „Tabelle nicht aktuell").
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich (dazu die bekannte
  `\cbblue`-Negativtestzeile).
- Headless-MathJax (187 Makros, `noundefined` aus, Negativtest greift): 1 591 Literale in
  S111 bis S115, 0 Fehler.
- Zuklapp-Test und ID-Vergleich wie in §3. Fehler in fremden Dateien sind nicht aufgetreten.
