# Straffung Kap. 4 „Numerische Fehleranalyse" (S41–S44)

Stand vor dem Lauf: kein Vorgänger-Diff gegen 21b998d, Arbeit von Grund auf.
Foliensatz `04-fehler.qmd` vollständig gelesen, alter Bericht `reviews/kuerzung/04-fehler.md`
als Hinweis genutzt (R2, R4, R5, R7 teils schon umgesetzt, die Widgets stehen inzwischen
in `:::interaktiv`). Klausur-Gegenprobe: `questions/kondition/*`, `diverses*.tex`,
WS25/26-1 b), WS25/26-2 e) (κ_rel für x², 1/x, Konstante, yᵀx, Spur, LGS-Störung); alles
Benötigte (Definition, κ_rel = |f'||x|/|f|, Aufgabe Summe, Satz LGS, κ₂-Quiz) bleibt im
Haupttext.

## 1. Zahlen (`zaehlen.mjs 04-fehler`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | --- | --- | --- |
| S41 | 2108 → 1861 (−11,7 %) | 0 → 0 | 2108 → 1861 |
| S42 | 2439 → 2250 (−7,7 %) | 0 → 0 | 2439 → 2250 |
| S43 | 1896 → 1809 (−4,6 %) | 308 → 301 | 2204 → 2110 |
| S44 | 669 → 489 (−26,9 %) | 0 → 0 | 669 → 489 |
| **Summe** | **7112 → 6409 (−9,9 %)** | **308 → 301** | **7420 → 6710 (−9,6 %)** |

Das Kapitel ist fast vollständig Folienstoff; der Richtwert −10 % wird knapp erreicht,
fast ausschließlich durch echtes Straffen. S43 schrumpft wenig, weil eine Folienlücke
geschlossen und die Folien-Faustregel zurückgeholt wurde (siehe 4).

## 2. Verlagert in Vertiefungen

Nichts neu verlagert. Die vorhandenen Vertiefungen (S43: Vorwärts-/Rückwärtsstabilität;
Beweisdetails zu @lemma:kondition-der-differenz) gegen die Folien geprüft: beide EXTRA
(die Folie definiert Stabilität nur als „algorithmischer Fehler klein" und nennt die
Differenzformel ohne Beweis), bleiben. Der Beweis von @satz:fehlerfortpflanzung-in-einer-komposition
steht auf einer gezählten Folie und bleibt im Haupttext. Weitere EXTRA-Blöcke über
~60 Wörtern gibt es im Haupttext nicht; alle fünf Widget-Kästen gehören zu Kern-Themen.

## 3. Gestrichen / verdichtet

- **S41** Abschnittsschluss „Fehler messen wir also mit Normen … Die nächsten beiden
  Abschnitte …" (Abschnitts-Zusammenfassung + Ankündigung; Einleitung und
  @bemerkung:stabilitaet-und-kondition-ausblick sagen dasselbe).
- **S41** Satz nach der Ausblick-Bemerkung („Die Zerlegung trennt also …") und Überleitung
  „Diese Zerlegung ist nützlich, weil …" (dritte Fassung derselben Aussage).
- **S41** „Zur Probe … @lemma:fehlerschranken nachrechnen" aus dem Beispiel: Zahlen
  (4,6394 ≤ 5,3600 ≤ 5,3606) in einen Halbsatz der Kasten-Auswertung übernommen, wo der
  orange Ring genau das zeigt.
- **S41** Doppelter Widget-Vorlauf „Bleibt das so? …" in den Kasten gezogen (ein Lead-in).
- **S41** Einleitung: Meta-Satz „Dieses Kapitel entwickelt die Werkzeuge …"; Restatement
  „multiplikativ verzerrt um den Faktor …".
- **S42** Wiederholung „Die relative Kondition hängt also von der rechten Seite ab, aber
  die Schranke wird … angenommen" (wortgleich zu @bemerkung:kondition-konditionszahl-einer-matrix).
- **S42** Widget-Rückblick am Ende von @beispiel:der-kehrwert-aufgeloest (dupliziert die
  Kasten-Auswertung), Vorläufe „Ein bewusst extremes Beispiel:", „Die Konditionszahl
  sortiert Probleme …", „Zum Abschluss eine Aufgabe; erst selbst versuchen …",
  „Auf diesen Unterschied kommen wir gleich zurück."
- **S42** Rückblick-Absatz am Anfang auf einen Satz mit Verweis auf @eq:eq-4-1-1.
- **S43** Dritte Anzeige der Fehlerzerlegungsformel am Abschnittsanfang → Verweis auf
  @eq:eq-4-1-1; Rückblick auf zwei Sätze.
- **S43** „Rechnen wir sie aus.", „Erst selbst überlegen, dann aufklappen.",
  Hinweis auf die Demo in Kap. 2 („Dort können wir … nachspielen", der κ-Rechner direkt
  darunter leistet das), „(oder Gradient Clipping)" in der Quiz-Antwort (Begriff nirgends
  eingeführt; Folienblock dazu ist auskommentiert).
- **S44** Einleitungssatz (Meta), Abschnitt „Kondition und Stabilität: die Arbeitsteilung"
  (vierte Fassung der Fehlerzerlegung, wiederholt Tabelle und S43; die Aussage „nicht
  ungenauer, als das Problem es erzwingt" trägt weiter die Quiz-Antwort), Faustregel-Bemerkung
  auf Merksatz + zwei Sätze (Begründung steht jetzt in S43).
- Kasten-Auswertungen auf 2–4 Sätze gestrafft, Frames wie „Das Widget zeigt …",
  „Der Rechner übersetzt …", „Die Karte macht zwei Dinge sichtbar …" entfernt.
- Kasten-Titel entmanieriert: „Kondition-Spielwiese: …" (2×) → „Der Kehrwert unter
  Störungen", „Die Kondition der Summe in der Ebene"; „Die Lernrate als Stabilitätsregler:
  SGD zum Ausprobieren" → „SGD-Demo: Lernrate und Stabilität"; „Wie schlimm wird es? Der
  κ-Rechner …" → „Der κ-Rechner für den letzten Schritt" (Quiz-Stellen, die „SGD-Demo",
  „κ-Rechner", „Widget zur Kondition der Summe" sagen, passen dazu).
- Deslop-Einzelposten: „Bekanntlich", „wörtlich", „ja", „realistischerweise",
  „naturgemäß", „Vorsicht:"-Flags, „nicht nur … sondern", „exakt die", „schlicht",
  „harmlos", „Landkarte", „bläst … auf", „riesig/winzig" wo nicht quantitativ.

## 4. Reparierte Fehler

- **Widerspruch Faustregel (S43/S44), Folienstoff zurückgeholt.** Die Folie „Stabilität:
  Wichtigste Erkenntnis" und das Wrap-up sagen „schlecht konditionierte Schritte möglichst
  früh ausführen". S43 sagte in @bemerkung:was-folgt-daraus-und-was-nicht nur „daraus folgt
  keine allgemeine Regel", und der Varianz-Text berief sich trotzdem auf diese Bemerkung als
  Erklärung für die Reihenfolge. Jetzt: Bemerkung nennt die Faustregel (mit „Indiz" wie auf
  der Folie und dem Anfang/Ende-Argument aus der alten S44-Bemerkung) und danach die
  vorhandenen Einschränkungen; der Varianz-Text sagt „passt zur Faustregel aus …".
- **Folienlücke SGD (S43).** Die Zuordnung Problem f = Minimum finden, Algorithmus f̃ = SGD
  in endlicher Genauigkeit, algorithmischer Fehler = angesammelte Rundungs-/Schätzfehler
  (gezählte Folie „Beispiel: Stochastic Gradient Descent") fehlte; als ein Satz ergänzt.
  Der Vorsatz sagte „nicht dasselbe wie die eben definierte … Rückwärtsstabilität" – die
  Definition steht in einer Vertiefung; ersetzt durch die Folienformulierung (Analogie,
  numerische Fehler mischen sich mit der Konvergenzdynamik).
- **„rückwärtsstabil" im Haupttext (S43-Bemerkung)** nur in der Vertiefung definiert:
  Halbsatz Ersatz („deren Ergebnis die exakte Lösung eines nur geringfügig gestörten
  Problems ist").
- **Zahlaussage (S42, Summen-Kasten):** κ_rel ≈ 59 wurde „gut zwei verlorene
  Dezimalstellen" genannt; log₁₀ 59 = 1,77 → „knapp zwei".
- **Präzisierung (S42, @bemerkung:interpretation):** „schlecht gestellt: … Störungen können
  das Ergebnis beliebig stark verfälschen" → Folienfassung „Verstärkungsfaktor unbeschränkt:
  beliebig kleine Inputfehler können, gemessen an ihrer Größe, beliebig stark verstärkt
  werden".
- **Präzisierung (S41, Explorer-Kasten):** „jedes weitere Reihenglied kostet Rechenzeit,
  ohne den Gesamtfehler zu bewegen" stimmt nicht ganz (bei N = 6 noch −3,73 statt
  Grenzwert −3,06) → „bringt wenig".
- Getippte Kapitelnummern (S41: „Kapitel 2" 3×, „Kapitel 3" 2×) auf @kap:algos /
  @kap:matrix-spur-norm umgestellt, S44 „Im nächsten Kapitel" → @kap:lgs.
- Makro-Klammern: neu geschriebene `\wt h`, `\wt g` als `\wt{h}`, `\wt{g}`.

## 5. Ermessensentscheidungen / offene Fragen

- **Faustregel-Bemerkung S43:** Ich habe die Folien-Regel in die Bemerkung zurückgeholt,
  die Einschränkung (Umordnung verändert Zwischengrößen; besser umformulieren,
  rückwärtsstabil implementieren) aber stehen lassen. Der Dozent sollte prüfen, ob ihm diese
  Balance recht ist; der Titel „Was folgt daraus, und was nicht?" blieb.
- **S44** hat jetzt keine Prosa-Zusammenfassung mehr außer Tabelle, Faustregel-Merksatz und
  Ausblick; die „Arbeitsteilung" steckt in Tabelle, S43 und der ersten Quizfrage.
  Die Bemerkung @bemerkung:faustregel-mit-der-einschraenkung-aus (keine Verweise) blieb als
  Wrap-up-Merksatz erhalten.
- **Satz zur Komposition:** Das Skript formuliert asymptotisch mit o(1) und
  η_h = …/‖h(ỹ)‖, die Folie mit exakter Ungleichung und ‖h(y)‖ im Nenner. Nicht angefasst
  (Skriptfassung ist die sauberere); Folie ggf. angleichen.
- **Explorer-Kasten (S41):** „Dominanz wechselt zwischen N = 4 und N = 6" – der Wechsel
  liegt genau zwischen N = 4 (Verhältnis 1,21) und N = 5 (0,55); Zahlen nicht angefasst.
- Vorkenntnis-Bemerkung (gezählte Folie) und alle Quiz-/Aufgabenfolien stehen weiter im
  Haupttext; Kehrwert-Doppelspur (Warnbeispiel → aufgelöst) unverändert.

## 6. Prüfungen

- `npm run typecheck:mdx`: grün (206 Dateien).
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen (nur „Tabelle ist nicht aktuell").
  Keine ID gelöscht, keine neue ID.
- `npm run test:mdx`: grün (137/137 Fixtures, Orakel-Regressionstest bestanden).
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte erfolgreich (die Kap.-4-Skripte lesen
  nur Widget-TSX; Zahlen in Quiz-Lösungen unverändert).
- Headless-MathJax-Check über S41–S44 (187 Makros, `noundefined` aus): 442 Literale,
  0 Fehler, Negativtest greift.
- Gedankenstriche: 0 in allen vier Dateien. `lint:numbers`: keine Treffer in 04-fehler.
- Zuklapp-Test: kein Haupttext-Verweis auf nur in Vertiefungen definierte Begriffe/IDs.
