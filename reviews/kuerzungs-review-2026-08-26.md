# Kürzungs-Review der Skript-Kapitel

Stand: 2026-08-26, **review-only** – keine Kapitel geändert. 13 Agenten (einer pro Kapitel) haben
jeden Abschnitt gegen das zugehörige Foliendeck klassifiziert (KERN = auf den Folien, BRÜCKE = nötig
zum Lesen des Kerns, EXTRA = darüber hinaus) und konkrete Vorschläge mit Datei:Zeile, Label und Wortzahl
gemacht. Die Einzelreports liegen in [`kuerzung/`](kuerzung/). Anlass: ~215 000 Wörter / ~544 PDF-Seiten
für eine Vorlesung pro Woche.

## Zahlen

| Kap. | Wörter | KERN | BRÜCKE | EXTRA | STREICHEN | MARKIEREN | Summe | Anteil |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 01 intro | 2 075 | 51 % | 16 % | 33 % | 63 | 237 | 300 | 14 % |
| 02 algos | 9 258 | 59 % | 22 % | 19 % | 365 | 595 | 960 | 10 % |
| 03 spur/norm | 11 578 | 54 % | 29 % | 17 % | 400 | 1 064 | 1 464 | 13 % |
| 04 fehler | 8 013 | 54 % | 26 % | 20 % | 410 | 909 | 1 319 | 16 % |
| 05 lgs | 7 743 | 61 % | 24 % | 14 % | 450 | 965 | 1 415 | 18 % |
| 06 svd | 14 703 | 45 % | 33 % | 22 % | 1 100 | 1 360 | 2 460 | 17 % |
| 07 kq | 12 644 | 48 % | 30 % | 22 % | 900 | 240 | 1 140 | 9 % |
| 08 la-misc | 13 813 | 60 % | 19 % | 21 % | 425 | 1 630 | 2 055 | 15 % |
| 09 tensoren | 14 720 | 54 % | 25 % | 20 % | 1 000 | 2 350 | 3 350 | 23 % |
| 10 diff.rechnung | 36 861 | 39 % | 24 % | 37 % | 2 710 | 4 220 | 6 930 | 19 % |
| 11 konvexität | 24 616 | 47 % | 20 % | 33 % | 3 000 | 3 500 | 6 500 | 26 % |
| 12 optim | 27 740 | 52 % | 29 % | 19 % | 2 270 | 2 510 | 4 780 | 17 % |
| 13 fkt.approx | 31 109 | 57 % | 20 % | 24 % | 2 030 | 2 230 | 4 260 | 14 % |
| **Summe** | **214 873** | | | | **≈15 100** | **≈21 800** | **≈36 900** | **17 %** |

STREICHEN ≈ 7 % (≈ 38 PDF-Seiten), MARKIEREN ≈ 10 % (≈ 55 Seiten aus dem Pflicht-Lesefluss).
Der Hebel liegt in Kapitel 10–13 (≈ 22 500 der 36 900 Wörter); Kapitel 1–5 sind folientreu.

## Fünf kapitelübergreifende Befunde

1. **`:::vertiefung` ist kein Zusatzstoff-Signal, sondern ein Widget-Rahmen.** Praktisch alle 98 Blöcke
   im Skript enthalten nur ein Widget (Kap. 3: 5/6, Kap. 6: 5/5, Kap. 8: 6/6, Kap. 9: 7/7, Kap. 10: 14/14,
   Kap. 12: 11/11, Kap. 13: 13/13). Die Widgets sind das *Zentralste* des Skripts; der echte Zusatzstoff
   (Beweise, die die Folien nur zitieren; Anhangsfolien-Material; Exkurse) steht ungekennzeichnet in
   `:::bemerkung`/`:::satz`. `<ExpandedReading>` existiert in `src/lib`, wird in keinem Kapitel benutzt.
   Mehrfach gemeldet: die Widget-Auswertung („wie das Widget zeigt …") steht *hinter* dem schließenden `:::`
   und verweist auf Zustände, die eine Leserin bei zugeklappter Box nie sah (Kap. 4: 747 W, Kap. 10: ~1 500 W).
   **Vorschlag:** Widget-Boxen umbenennen (z. B. `:::interaktiv`), `:::vertiefung` für Zusatzstoff reservieren.
2. **Anhangsfolien wurden zu Hauptstrang.** Material, das im Deck `visibility="uncounted"` ist, erscheint
   im Skript als nummerierte Sätze mit Beweis: Cholesky-Induktion (5.4), Bsp. 9.2.7–9.2.11, universelle
   Eigenschaft (9.4), Matrix Completion, logistische Regression, Taylor-Beweise (10), Fixpunktiteration
   erster Ordnung (12.1, 1 577 W). Das ist der größte MARKIEREN-Posten.
3. **Dubletten über Kapitelgrenzen:** Abschnitt 11.5 ≈ Sätze 12.2.6/12.2.7 (+ Bem. 12.2.15, ~700 W);
   Bem. 12.1.18 und Satz 12.3.15 rechnen dieselbe Eigenzerlegung von I−γA; Rückwärtsstabilität in 3.5
   und Def. 4.3.1; Kettenregel zweimal bewiesen (10.3.9 vs. 10.6.8); Normalengleichungen dreimal
   hergeleitet (7.1.5, 7.1.6, 7.3.1) und dieselbe Regressionsgerade zweimal gerechnet (7.1.8/7.3.6).
4. **Zusammenfassungen verdreifacht:** Kap. 5 (Tabelle → Fazit → „Was wir mitnehmen"), Kap. 9 (zwei
   Zusammenfassungen in S95), Kap. 10 (10.9, 760 W), Kap. 13 (Bemerkung → Vertiefungsprosa → Selbsttest,
   sechs Zahlenreihen je dreimal). Selbsttests mit wortgleichen Wiederholungen früherer Fragen (10.9, 13).
5. **Widget-Nacherzählungen nicht streichen, nur kürzen:** `scripts/pdf/mdx-to-latex.mjs` ersetzt Widgets im
   PDF durch Platzhalter; die Prosa danach ist im Buch der einzige Träger (Kap. 3, 12: ~1 500 W → auf
   2–4 Sätze je Widget, ~700 W).

## Nebenbei gefundene Fehler (nicht Kürzung)

- `S72.mdx` Z. 196–199, 202–207, 273–275, 280–282: vier abgebrochene Sätze aus einer früheren Überarbeitung.
- `S93.mdx:571–574`: kaputter Satz („Der erste Warum steht in Satz 9.5.3 …").
- `S105.mdx:347`: „Den Beweis lassen wir als Übung stehen." direkt *nach* dem ausgeführten Beweis zu 10.5.5.
- `S107.mdx:388–392`: gegenläufige Indexkonvention zwischen Def. 10.7.3 und Bem. 10.7.8, im Text selbst als unsauber vermerkt.
- Kap. 2: Def. 2.3.1 (nur {+,−,·,/}) widerspricht der Zählung im Beweis 2.5.1; dort „2 Additionen pro Durchlauf" – es ist eine.
- `S11.mdx:113–115`: behauptet, die Landkarte sei eine Vertiefungsbox „oben" – Kap. 1 hat keine.
- Bsp. 7.1.8 rechnet per expliziter Inversion, die §7.3.2 zwei Seiten später verbietet.
- Kernstoff in Vertiefung versteckt: `S115:296–310` („Drei Landschaften", Folie 13-optim-I:258); Kap. 2 „Goldener Schnitt"
  (T(n)=2F_{n+1}−1 wird in Tabelle + Zusammenfassung gebraucht); Kap. 13 S134:262, S137:375, S138:399; Kap. 7: MGS nur in Vertiefung, 9 Selbsttests hängen daran.
- **Umgekehrt fehlende Folieninhalte:** Kap. 1 (Strassen-Tabelle, Selbsttest 5 Basis/Span), Kap. 5 (Hilbert-Matrix-Beleg zu „nie invertieren"),
  Kap. 9 (Sylvester-Beispiel zum vec-Trick, Kronecker-Designmatrix für Tensorprodukt-Splines).

## Empfohlene Reihenfolge

1. Entscheidung zu Befund 1 (Widget-Box vs. Vertiefung) – sie bestimmt, wie alle MARKIEREN-Posten umgesetzt werden.
2. Fehlerliste oben (klein, eindeutig).
3. Kap. 10–13: Anhangsfolien-Material markieren, Dubletten 11.5/12.2 und 12.1.18/12.3.15 auflösen, Zusammenfassungen entdreifachen.
4. Kap. 6–9: Beweise ohne Folienbezug markieren, Beispiel-Dubletten kürzen.
5. Kap. 1–5: nur die kleinen Streichungen; nicht anfassen, was die Reports als „unantastbar" nennen.

Die Einzelreports enthalten pro Vorschlag Datei:Zeile, Label, Wortzahl und die geprüften Abhängigkeiten
(`grep` auf Label-Verweise aus anderen Kapiteln) – sie sind als Arbeitslisten für Umsetzungs-Agenten gedacht.
