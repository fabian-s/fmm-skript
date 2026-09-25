# Straffungs-Durchgang 2026-09-25: Brief für alle Agenten

Auftrag des Dozenten: ein weiterer Deslop- und Schreibdurchgang, der das Skript
zugleich **kürzer** macht und Zusatzstoff **deutlicher als optional** absetzt.
Das Skript wirkt auf Studierende (BSc Statistik, 3. Semester) erschlagend.
Maßgabe: **Qualität vor Mengenreduktion, nicht übertreiben.** Kapitel und
Konzept-Pop-ups.

Vor der Arbeit lesen: `KONVENTIONEN.md` (Abschnitte „Technik",
„Nummerierung und Verweise", „Tooltip-Konzepte" und die Lessons am Ende),
`STYLE.md`, dann `.claude/skills/deslop/SKILL.md` mit
`references/german-tells.md` und `references/long-document-procedure.md`.
Dieser Brief ist verbindlich, wo er von älteren Bauaufträgen abweicht.

## 1. Das Leitprinzip

**Der Haupttext** ist alles außerhalb von `:::vertiefung`. Er muss bei
zugeklappten Vertiefungen **vollständig und lückenlos lesbar** sein und den
Stoff der Vorlesung abdecken: jede Definition, jeder Satz, jedes Beispiel,
jeder Algorithmus und jede Quizfrage der Folien. Wer nur den Haupttext liest,
hat die Vorlesung.

**Die Vertiefung** (`:::vertiefung[Titel]`, eingeklappt, Marke
„Vertiefung · optional") nimmt auf, was darüber hinausgeht. Sie ist
ausdrücklich zum Überspringen da.

Die Marke in der Web-Oberfläche, der Hilfetext und das PDF-Label sagen jetzt
„optional"; das hat der Orchestrator bereits umgesetzt. Euer Teil ist der
Inhalt.

## 2. Was ist Kern, was Zusatz? Die Folien entscheiden.

Aktuelle Foliensätze (read-only): `/home/user/slides-2627/slides/*.qmd`.

| Kapitel | Deck(s) |
| --- | --- |
| 01-intro … 09-tensoren | gleichnamiges `.qmd` |
| 10-differentialrechnung | `10-ableitungen-I.qmd`, `11-ableitungen-II.qmd` |
| 11-konvexitaet | `12-konvexitaet.qmd` |
| 12-optim | `13-optim-I.qmd`, `14-optim-II.qmd` |
| 13-funktionsapproximation | `15-funktionsapproximation-I.qmd`, `16-funktionsapproximation-II.qmd` |

- **KERN**: steht auf einer gezählten Folie (inkl. Quizfolien, deren Lösungen
  oft in HTML-Kommentaren stehen). Bleibt im Haupttext.
- **BRÜCKE**: nötig, damit der Kern lesbar ist (Motivation in wenigen Sätzen,
  Übergänge, ein Zwischenschritt, den die Folie überspringt). Bleibt, so knapp
  wie möglich.
- **EXTRA**: alles andere. Typisch: Beweise, die die Folien nur zitieren oder
  gar nicht haben; Material von Anhangsfolien (`visibility="uncounted"`,
  `{.appendix}`); zweite und dritte Beispiele zum selben Punkt; Verallgemeinerungen,
  Ausblicke, historische Notizen, numerische Feinheiten jenseits der Folien;
  Querbezüge zu Nachbargebieten.
- Gegenprobe: Was in alten Klausuren gefragt wurde
  (`/home/user/fmm-lmu/exams/ws*-klausur-*/`, `exams/questions/`), bleibt im
  Haupttext.
- Frühere Klassifikation (Stand 2026-08-26, Zeilennummern veraltet, großteils
  schon umgesetzt): `reviews/kuerzung/<kapitel>.md`. Hinweise, nicht Auftrag.

## 3. Die vier Operationen, in dieser Reihenfolge der Wichtigkeit

1. **Besser schreiben (Deslop + Klarheit).** Deslop-Skill, Profil „Lecture
   script / interactive textbook". Dazu: kaputte oder unvollständige Sätze
   reparieren (aus früheren Durchgängen sind noch welche übrig), unklare
   Sätze klar machen, Fachfehler korrigieren, wenn sie eindeutig sind
   (sonst als offene Frage melden).
2. **Straffen.** Denselben Gedanken nur einmal sagen. Typische Posten:
   Rückblicke am Abschnittsanfang über mehr als ein, zwei Sätze;
   Widget-Nachbetrachtungen, die wiederholen, was der Kasten schon sagt;
   dreifache Begründungen; Meta-Sätze („In diesem Abschnitt werden wir …",
   „Wie wir gesehen haben …"); Ankündigungen, auf die sofort der angekündigte
   Inhalt folgt; Zusammenfassungen, die doppelt oder dreifach vorkommen
   (höchstens EINE knappe Zusammenfassung je Kapitel, keine je Abschnitt).
3. **Verlagern in eine Vertiefung.** EXTRA-Material, das gut ist, aber den
   Haupttext belastet. Siehe §4.
4. **Streichen.** Nur, was redundant ist oder keinen Lernwert hat. Gutes
   EXTRA-Material wird verlagert, nicht gestrichen.

**Richtwerte für den Haupttext** (keine Quote; ein schon schlanker Abschnitt
bleibt, wie er ist):

| Kapitel | Haupttext vorher | Richtwert |
| --- | ---: | --- |
| 01 intro | 1 545 | −0 bis −10 % (Dozentenvorgabe: sehr kurz, konzeptionell) |
| 02 algos | 7 460 | −10 bis −15 % |
| 03 matrix-spur-norm | 8 975 | −10 bis −15 % |
| 04 fehler | 7 112 | −10 bis −15 % |
| 05 lgs | 6 308 | −5 bis −10 % |
| 06 svd | 11 323 | −15 bis −20 % |
| 07 kq | 10 767 | −15 bis −20 % |
| 08 la-misc | 10 766 | −15 bis −20 % |
| 09 tensoren | 11 621 | −15 bis −20 % |
| 10 differentialrechnung | 27 078 | −20 bis −30 % |
| 11 konvexitaet | 16 093 | −15 bis −25 % |
| 12 optim | 22 458 | −20 bis −30 % |
| 13 funktionsapproximation | 26 758 | −20 bis −30 % |

Der Gesamtumfang (inkl. Vertiefungen) soll durch echtes Straffen um etwa
5–10 % sinken; die Vertiefungen dürfen wachsen. Messen:
`node reviews/straffung-2026-09-25/zaehlen.mjs <kapitel-verzeichnis>`
(vergleicht mit dem eingefrorenen Ausgangsstand).

## 4. Regeln für Vertiefungen

- **Wenige, zusammenhängende Boxen statt vieler kleiner.** Benachbartes
  EXTRA-Material in EINE Box mit sachlichem Titel („Beweis der Kettenregel",
  „Subgradienten", „Konvergenz der Potenzmethode"). Unter ~60 Wörtern lohnt
  keine Box: dann kürzen oder im Text lassen.
- **Satz im Haupttext, Beweis in der Vertiefung** ist das Standardmuster für
  Beweise, die die Folien nicht führen. Beweise, die auf den Folien stehen,
  bleiben im Haupttext.
- **Keine Definition verstecken, die der Haupttext später benutzt.** Vor
  jeder Verlagerung prüfen: Braucht ein späterer Satz, ein Beispiel, ein
  Widget-Kasten oder eine Selbsttestfrage im Haupttext genau dieses Material?
  Dann bleibt es (oder die Stelle bekommt einen Satz Ersatz).
- **Selbsttests** müssen aus dem Haupttext beantwortbar sein. Fragen zu
  verlagertem Stoff wandern mit in die Vertiefung oder fallen weg; wortgleiche
  Wiederholungen früherer Fragen fallen weg.
- **`:::interaktiv`-Kästen sind Kernstoff** und bleiben im Haupttext, wenn
  ihr Thema Kern ist. Ein Widget zu EXTRA-Stoff wandert mit in die
  Vertiefung, dann als `::::interaktiv` darin. Die Auswertungsprosa im
  Kasten auf 2–4 Sätze straffen, aber nicht streichen: Im PDF ersetzt ein
  Platzhalter das Widget, dort trägt allein die Prosa. Schaetzfrage-Auflösungen
  hinter `verdeckt` nicht nach vorn ziehen.
- **Fence-Stufen:** Der äußere Container hat mehr Doppelpunkte als der
  innere (`:::::vertiefung` > `::::beweis` > `:::schritt`). Vorhandene Muster
  im selben Kapitel kopieren; `npm run typecheck:mdx` meldet Fehler.
- Titel sind Klartext: keine Mathe, kein Markup, keine Verweise, kein Drama.
- Verweise (`@satz:…`) auf Material in einer Vertiefung funktionieren weiter
  und klappen die Box auf. Ein Hinweis im Haupttext („Beweis in der
  Vertiefung") ist meist überflüssig; die Box steht direkt darunter.

## 5. Nicht anfassen

- IDs und Anker (`#id`, `{#eq-…}`, `:id[…]`, `key:`), `@typ:id`-Verweise,
  `:k[Text]{#concept-id}`-Links (Text darf sich ändern, die id nicht),
  Imports/Exports, Widget-Tags und ihre Props, Code-Fences, Zahlen und
  Mathe-Inhalt (Umformulieren der Prosa drumherum ist erlaubt, Rechnungen
  nicht).
- **Ein Umgebungs-Label mit ID nur löschen, wenn nichts darauf verweist:**
  `grep -rn "<id>" src/ scripts/verify/` über das GANZE Repo (andere Kapitel,
  Konzepte, Widget-TSX mit `ref("satz:<id>")`/`num(…)`). Im Zweifel in die
  Vertiefung verlagern statt löschen.
- Keine TSX-Dateien, keine Registry (`src/chapters/index.ts`, Kapitel-`index.ts`),
  nichts unter `src/lib/`, keine `*.generated.*`-Dateien.
- Nur die eigenen Dateien bearbeiten (siehe Auftrag); andere Agenten
  arbeiten gleichzeitig im selben Verzeichnis.
- **Kein git außer lesend** (`git diff`, `git show HEAD:<pfad>`, `git log`).
  Niemals `stash`, `checkout`, `reset`, `restore`, `add`, `commit`.
  Eigene Fehler mit dem Edit-Werkzeug rückgängig machen. Commits macht der
  Orchestrator.
- Nicht `npm run gen:numbers`, `npm run dev`, `npm run build` ausführen (sie
  schreiben geteilte Dateien). Nichts Neues erfinden: keine neuen Sätze,
  Beispiele oder Zahlen, keine erfundenen Literaturstellen.

## 6. Arbeitsweise

- Chirurgische Edits (Edit-Werkzeug oder Python-`sub()` mit
  Eindeutigkeitsprüfung aus `long-document-procedure.md`), nie ganze Dateien
  neu schreiben. Absolute Pfade.
- Datei für Datei: lesen (ganz, in Stücken), entscheiden, editieren,
  nachlesen.
- Gedankenstrich-Budget: höchstens einer pro ~300 Wörter, „ – " statt „—".
- Wir-Form. Kein Gender-Doppelpunkt.

## 7. Prüfungen (nach jeder Datei die schnellen, am Ende alle)

```
cd /home/user/fmm-skript && npm run typecheck:mdx
cd /home/user/fmm-skript && node scripts/gen-numbers.mjs --check
cd /home/user/fmm-skript && npm run test:mdx
cd /home/user/fmm-skript && npm run verify:numbers
```

- `gen-numbers --check`: Nur `FEHLER`-Zeilen zählen (unbekannte ID, falsche
  Art). „Tabelle ist nicht aktuell" ist nach Edits erwartet und kein Fehler.
- Fehler in Dateien, die nicht zu eurem Auftrag gehören, stammen von
  parallel arbeitenden Agenten: ignorieren, nicht reparieren, im Bericht
  erwähnen.
- `verify:numbers` prüft teils Textstellen in MDX. Schlägt ein Prüfscript
  eures Kapitels wegen einer Umformulierung fehl: die Aussage wiederherstellen
  oder das Prüfscript minimal an den neuen Wortlaut anpassen, ohne die
  numerische Prüfung aufzuweichen (im Bericht nennen).

## 8. Bericht

Jeder Agent schreibt seinen Bericht nach `reviews/straffung-2026-09-25/`
(Dateiname steht im Auftrag), deutsch, knapp:

1. Zahlen aus `zaehlen.mjs` (vorher → nachher, Haupttext/Vertiefung/gesamt).
2. Verlagert in Vertiefungen: je Posten Datei, Label/Titel, Begründung (EXTRA
   weil …).
3. Gestrichen: je Posten, was und warum (Dublette von …, Wiederholung).
4. Reparierte Fehler (kaputte Sätze, Fachfehler).
5. Ermessensentscheidungen, die der Dozent ansehen sollte, und offene Fragen.
6. Ergebnis der Prüfungen.

## 9. Konzept-Pop-ups (`src/concepts/*.mdx`)

Ein Pop-up frischt Vorwissen an der Stelle auf, an der eine Leserin mitten im
Kapitel hängen bleibt. Es muss in einer halben Minute lesbar sein.

- Aufbau (Rubrik `reviews/concept-popup-audit-rubric.md`): Was ist das und
  wozu → präzise Aussage → EIN kleines Beispiel → ggf. Widget mit einem Satz
  Leitfrage davor und ein, zwei Sätzen Erkenntnis danach.
- Umfang: Prosa möglichst ≤ ~180 Wörter (Mathe zählt mit, grob). Heute
  Median 189, Maximum 367 Wörter. Pop-ups über ~220 Wörtern verlieren
  Nebenthemen, zweite Beispiele, Ketten von „vgl."-Querbezügen und Exkurse in
  andere Kapitel; das Kapitel behandelt sie ohnehin, ein verschachtelter
  `:k[…]{#id}`-Link kann eine Erklärung ersetzen. Kurze Pop-ups (< ~120
  Wörter) bekommen nur den Deslop-Pass.
- Vor dem Kürzen die Verwendung prüfen:
  `grep -rn "{#<id>}" src/chapters src/concepts`. Was die verlinkenden
  Stellen vom Pop-up erwarten, bleibt drin.
- Keine Vertiefungen in Pop-ups. `export const title`, Imports und
  Widget-Tags bleiben unverändert; ids verschachtelter Links ebenso.
- Fachliche Ungenauigkeiten korrigieren (Beispiel: „Konvexität lässt sich
  nie bestätigen" ist falsch, gemeint ist: nicht durch Ausprobieren
  endlich vieler Paare).
