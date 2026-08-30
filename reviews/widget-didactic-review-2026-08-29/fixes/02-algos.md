# Kapitel 2 — Fix-Log (Umsetzung der Befunde aus `02-algos.md`)

Stand 2026-08-29. Verifikation: fünf neue Prüfskripte unter `scripts/verify/REV29/`
(`02-algos-S21Demos.mjs`, `02-algos-S21Local.mjs`, `02-algos-FibonacciStepper.mjs`,
`02-algos-S23Aufwand.mjs`, `02-algos-S24Wachstum.mjs`, `02-algos-S25FibVergleich.mjs`),
alle grün; Browser-Pass im Dev-Server (Port 4181) per CDP bei 1300 px und 390 px, mit
Reglerfahrt bis k = 16, Preset- und Auflösen-Klicks. Kein Kasten und kein Seitenkörper
läuft bei 390 px horizontal über (gemessen: 0 px).

---

## S21Demos.tsx / AusloeschungWidget (Abschnitt 2.1, Kasten 1)

**Umgesetzt**

- [CRITICAL] `S21Demos.tsx:49` + `S21.mdx:277-285` — Header und Selbsttest behaupteten,
  die zweistufige Varianzformel liefere „für jedes k exakt 22,5"; der Regler geht bis
  k = 20, und ab k = 16 liefert sie 20, bei k = 17 den Wert 128 und ab k = 18 null.
  Gewählt wurde die didaktisch stärkere der beiden Reparaturen des Reviews: Der
  Reglerbereich bleibt, das Widget bekommt einen **vierten Verdikt-Zweig** („Jetzt
  versagt auch der zweistufige Weg … die grüne Zeile ist hier keine exakte Referenz mehr,
  sondern selbst ein Rundungsartefakt"), der Header nennt die Werte für k = 16 … 20, und
  die Selbsttestfrage ist von `falsch` auf `wahr` gedreht und auf genau diese Beobachtung
  umformuliert. Damit ist die Frage weiterhin nur mit dem Widget zu beantworten und
  sachlich richtig.
  **Browser:** k = 16 → Verdikt „Jetzt versagt auch der zweistufige Weg: Er zeigt 20 statt
  22,5" (1300 px und 390 px).
- [MAJOR] `S21Demos.tsx:307-319` — Die als „exakte Referenz" ausgewiesene grüne Zeile
  zeigte ab k = 16 kommentarlos kaputte Werte. Erledigt durch denselben Verdikt-Zweig
  (erreichbare Zustandsklasse hat jetzt einen Zweig, F8).
- [MAJOR] `S21.mdx:206-210` — Die Konsolidierung verriet die Lösung der Schätzfrage
  (`loesung="e8"`) wörtlich über dem noch grauen Auflösen-Knopf. Der Satz steht jetzt in
  `verdeckt={…}`; im Kasten bleibt nur die Kriteriums-Formulierung.
  **Browser:** vor dem Auflösen ist der Satz nicht im DOM, nach dem Auflösen erscheint er
  im Kasten.
- [MINOR] `S21Demos.tsx:211-213` — Startwert k = 6 (intakter Fall) → k = 7: Die orange
  Auflösung steht dann dicht links neben der grünen Marke, die tote Anfangsfigur zeigt die
  Spannung, ohne die Antwort zu verraten.
- [MINOR] `S21Demos.tsx:254` — Geviertstrich „—" im Verdikt durch „ – " ersetzt (einzige
  leserseitige Fundstelle des Kapitels).
- [MINOR] `S21Demos.tsx:193-195` vs. `:230-233` — Die Schätzfrage passte nach dem Wechsel
  auf „Assoziativität" nicht mehr. Die Frage nennt jetzt ihren Modus („Im Rechenweg
  »Varianz«: …").
- [MINOR] `S21.mdx:86,235,301` — getippte Kapitelnummern durch `@kap:fehler` /
  `@kap:matrix-spur-norm` ersetzt.
- [F1/F6] „historische Notiz" raus, Header zitiert `scripts/verify/REV29/02-algos-S21Demos.mjs`.
  Das Skript fährt **jeden** erreichbaren Reglerwert k = 0 … K_MAX durch, hält die
  Gleitkommawerte gegen eine exakte BigInt-Bruchrechnung der wahren Varianz, liest K_MAX
  und den Startwert aus der TSX und erzwingt die Existenz des neuen Verdikt-Zweigs.

**Rationale.** Der Leser konnte die Musterlösung des Selbsttests mit zwei Sekunden am
Regler widerlegen — der teuerste Vertrauensverlust, den ein interaktives Skript
produzieren kann. Statt den Reglerbereich zu beschneiden, macht das Widget den
Zusammenbruch jetzt zur Pointe: Auch der robuste Weg hat eine Grenze, und man sieht, wo.

- [NOTE, bewusst nicht angefasst] `formel === 22.5` / `=== 0` bleiben stehen: Sie
  behaupten keine Toleranz, sondern zeigen das exakte IEEE-Ergebnis, das der Gegenstand
  des Abschnitts ist.

## S21Local.tsx / RSelbsttest (Abschnitt 2.1, kein `:::interaktiv`-Kasten)

**Umgesetzt**

- [MINOR] `S21Local.tsx:17-27` — Vier behauptete R-Ausgaben ohne Nachweis. Neu:
  `scripts/verify/REV29/02-algos-S21Local.mjs` prüft die drei in JS reproduzierbaren
  Werte (`1.0-1.0`, `1.0-0.9-0.1` = −2,775558e−17 = −2⁻⁵⁵, `100*0.58` = 57,999999999999992895)
  und für den vierten die Größenordnung: Bei Zwischensummen um 10²¹ ist der
  Maschinenzahlabstand 2¹⁷ = 131072, die R-Ausgabe −262144 also genau zwei Schritte.
  Header liest sich jetzt entsprechend.
- [NOTE] Die Ehrlichkeitspassage („R und JS liefern hier verschiedene Werte, und warum")
  ist unverändert erhalten.

## FibonacciStepper.tsx (Abschnitt 2.2, Kasten 2)

**Umgesetzt**

- [MAJOR] `FibonacciStepper.tsx:114-115` — Startzustand k = 1 zeigte einen leeren
  Ein-Knoten-Baum. Jetzt `useState(8)`: Die tote Anfangsfigur ist der volle Achterbaum,
  41 Aufrufe gegen 6 Additionen. **Browser bestätigt** (1300 px und 390 px).
- [MAJOR] `FibonacciStepper.tsx:89-92,227-230` — `shade(j) = base[j % 5]` gab x₁/x₆,
  x₂/x₇, x₃/x₈ dieselbe Farbe, während die Legende „gleiche Farbe = identische
  Teilrechnung" versprach. Die zyklische Pastellrampe ist ersatzlos weg; rot hinterlegt
  sind jetzt genau die Argumente mit `counts[j] > 1`, und die Legende sagt „gleiche Zahl
  heißt identische Teilrechnung". Damit ist zugleich das zweite Farbsystem im selben Bild
  verschwunden (NOTE `:88-92`).
- [MAJOR] `S22.mdx:121-125` — Konsolidierung verriet die 8, nach der die Schätzfrage
  fragt. Satz nach `verdeckt={…}` verschoben; im Kasten bleibt die Fortsetzung
  (609 gegen 13 bis x₁₅).
- [MINOR] `FibonacciStepper.tsx:151-154` — Aufgabenzeile nennt jetzt die Handlung, nach
  der gefragt wird („in der Zeile ‚Mehrfach berechnet' lesen wir ab, wie oft x₃ …").
- [MINOR] `FibonacciStepper.tsx:268` — `href="#sec-2.5"` läuft jetzt über
  `num("sec:algos/fibonacci-komplexitaet")`.
- [MINOR] `S22.mdx:217-219` — `[nächsten Abschnitts](#sec-2.3)` → `@sec:zeit-und-speicheraufwand`,
  „Kapitel 4"/„Kapitel 3" → `@kap:`.
- [F1/F6] Header zitiert `scripts/verify/REV29/02-algos-FibonacciStepper.mjs`. Das Skript
  führt die Rekursion mit echten Zählern aus (unabhängig von der geschlossenen Rekurrenz
  des Widgets), prüft C/A für k = 1 … 15, die Baumhäufigkeiten von x₈ und x₅ und beide
  Selbsttestlösungen aus `S22.mdx` (8 und 54).

**Rationale.** Eine Anfangsfigur mit einer „0" und einem einzigen Knoten sagt nichts;
jetzt steht die Aussage des Abschnitts im Bild, bevor man etwas anfasst. Und eine
Legende, die eine Farbgleichheit als Bedeutungsgleichheit verkauft, die es nicht gibt,
lehrt aktiv das Falsche.

## S23Aufwand.tsx / S23FlopWidget (Abschnitt 2.3, Kasten 3)

**Umgesetzt**

- [MAJOR] `S23.mdx:109-113,118` — Die motivierende Frage stand am Ende einer eingeklappten
  `vertiefung`, und die Konsolidierung antwortete „Der Zähler zeigt: **Nein.**" auf eine
  Frage, die der Leser nie gesehen hatte. Die Faustregel-Passage steht jetzt als
  Haupttext vor dem Kasten, die Frage im Kasten.
- [MINOR] `S23.mdx:118-121` — Zugleich die vom Review vorgeschlagene
  `Schaetzfrage variante="auswahl"` („doppelt / viermal / achtmal") eingebaut; die Faktoren
  4 und 8 stehen jetzt in `verdeckt={…}` statt offen über dem Knopf. Der spätere
  Selbsttest (`S23.mdx:332-337`) fragt dieselbe Zahl und bleibt widgetabhängig.
- [MINOR] `S23Aufwand.tsx:150-152` vs. `S23.mdx:48-49` — Blau trägt im Abschnitt zwei
  Rollen (Prosa: Vektor x; Widget: Matrix-Vektor-Produkt). Wir behalten die Klassenrampe
  des Kapitels bei und **benennen die Kollision im Header ausdrücklich als Ausnahme**
  (wie es S21Demos vorbildlich tut), mit dem Zusatz, dass die beiden Panels auch über
  ihre Kopfzeilen unterscheidbar sind.
- [F1/F6] `scripts/verify/REV29/02-algos-S23Aufwand.mjs`: FLOP-Zahlen durch echtes Zählen
  in ausgeführten Schleifen (nicht über die Formeln des Widgets), Speicherzahlen,
  Faktoren 4,01 und 8,02, Schnittpunkt 1009,9019513592784 mit der 1009/1010-Probe,
  2²⁰⁰ und die Modelljahre; dazu beide `zahlfrage`-Lösungen aus dem MDX.

**Rationale.** Eine Antwort ohne sichtbare Frage ist Dekoration; mit Frage, Tipp und erst
danach der Auflösung wird derselbe Kasten zum Experiment.

## S23WachstumsBild (Abschnitt 2.3, statische Doppeltafel)

Keine Befunde umgesetzt (KEEP/STATIC, korrekt so). Unverändert.

## S23Local.tsx / SelfTest (Abschnitt 2.3, kein Kasten)

**Umgesetzt**

- [MINOR] `:42-44,62-64` — hartcodierte `emerald`/`red`-Klassen durch `W_PANEL`,
  `W_BUTTON`, `W_BUTTON_AKTIV` und `<Verdikt kind="ok"/"fail">` ersetzt. Damit ist Rot
  nicht mehr doppelt belegt (im Kapitel bedeutet Rot „das teure Verfahren") und die
  `.w-dark`-Oberfläche ist abgedeckt.
- [MINOR] `:46-58` — Optionsknöpfe liegen jetzt in `role="radiogroup"` mit `aria-checked`
  je Knopf.
- [MINOR] `:7` — Header-Zitat auf `verify-hdr.mjs` gestrichen.

## S24Local.tsx / SelfTest (Abschnitt 2.4, kein Kasten)

**Umgesetzt**

- [MINOR] `:8` — Header-Zitat auf `verify-hdr.mjs` gestrichen.
- [MINOR] `:23-27` — Slate-Ketten durch `W_PANEL`/`W_MUTED` ersetzt.

## S24WachstumWidget.tsx (Abschnitt 2.4, Kasten 4)

**Umgesetzt**

- [MINOR] `:181-183` — Der Verdikttext „liegt c·n² bis n = {nStar−1} über 2ⁿ" ist für
  c = 1 falsch (bei n = 1 ist 2 > 1; bei n = 2 und n = 4 Gleichstand). Neu: „zieht 2ⁿ
  spätestens ab n = {nStar} endgültig davon; davor können beide Kurven die Rollen mehrfach
  tauschen." Das Prüfskript asserted die drei Gegenbeispiele.
- [MINOR] `:311-327` — Skalen-Umschalter benutzt `W_BUTTON`/`W_BUTTON_AKTIV` statt
  `bg-sky-600`/`bg-white`.
- [MINOR] `:113-114` — `fmtVal` gibt ganzzahlige Werte ohne Nachkommastelle aus („30"
  statt „30,0" neben „900"). **Browser bestätigt** bei 390 px.
- [MINOR] `:328-344` — Die sechs Klassen-Kästchen liegen jetzt in `<fieldset>` mit
  `<legend className="sr-only">Sichtbare Komplexitätsklassen</legend>`.
- [F1/F6] `scripts/verify/REV29/02-algos-S24Wachstum.mjs`: die Schwellentabelle c → n\*
  auf zwei unabhängigen Wegen (Potenzschleife wie im Widget, Logarithmen ohne 2ⁿ), dazu
  der Nachweis, dass ab n\* wirklich *alle* folgenden n die Ungleichung erfüllen und n\*−1
  sie noch nicht.

## S25Aufrufbaum.tsx (Abschnitt 2.5, statische ASCII-Tafel)

**Umgesetzt**

- [MINOR] `:16` — getippte Abschnittsnummer „im Stepper in Abschnitt 2.2" durch eine
  Benennung ohne Nummer ersetzt.
- [F1/F6] Header zitiert jetzt `02-algos-FibonacciStepper.mjs`, das T(5) = 15 und die
  Häufigkeiten 1/1/2/3/5/3 in der Nullbasis mitprüft.

## S25FibVergleich.tsx (Abschnitt 2.5, Kasten 5)

**Umgesetzt**

- [MAJOR] `:216-220` — Das Vor-Auflösen-Verdikt schloss die Antwortoption „auf der von 2ⁿ"
  bereits aus („verläuft aber sichtbar flacher als die gestrichelte Schranke darüber").
  Reduziert auf eine Beobachtung ohne Vergleich; der Vergleich steht im Auflösungszweig.
  Aus demselben Grund nennt die Aufgabenzeile jetzt „die gestrichelten Vorhersagen"
  statt „die gestrichelte Gerade **über ihnen**".
- [MAJOR] `S25.mdx:231-234` — Dieselbe Vorwegnahme in der Konsolidierung („Steigung … unter
  log₁₀ 2 ≈ 0,301") entfernt; der Kasten verweist auf das Verdikt nach dem Auflösen.
- [MINOR] `S25.mdx:231-234` + `:237-272` — Der Kasten endete mit „Woran liegt das?", die
  Antwort lag ausschließlich in zwei eingeklappten Vertiefungen (A8). Der Kasten schließt
  jetzt selbst („die rote Gerade hat eine eigene Basis, und woher die kommt, rechnen die
  beiden Vertiefungen nach"), die Basis φ nennt das Verdikt nach dem Auflösen.
- [MINOR] `:112-114` — `T[n]` wird jetzt in `BigInt` gezählt; die Ablesezeile zeigt damit
  die wirklich gezählten Aufrufe. Nachgemessen: ab n = 76 ist T(n) in `number` nicht mehr
  exakt darstellbar, und der Regler geht bis 80.
- [MINOR] `:38` — Header sagte „n = 80 → 2,4 Jahre", das Widget zeigt „≈ 2 Jahre".
  Der Header nennt jetzt beides und den Grund (`fmtTime` rundet Jahre ganzzahlig, und
  genau die 2 fragt der Selbsttest ab).
- [F1/F6] `scripts/verify/REV29/02-algos-S25FibVergleich.mjs`: T(n) über die geschlossene
  Form 2·F(n+1) − 1 gegen die Rekurrenz für n = 0 … 100, die fünf Headerwerte, die
  Modellzeiten, die drei Steigungen und die Prüfung, dass die gezählten Punkte wirklich
  auf der φ-Geraden liegen (Abstand zu log₁₀ 2 > 0,09).

**Rationale.** Ein Widget, das seine eigene Schätzfrage vor dem Tippen beantwortet, ist
eine Illustration mit Knopf. Nach dem Umbau bleibt vor dem Auflösen nur, was man wirklich
sieht („zwei Geraden, die rote steiler"), und die Pointe kommt, wenn der Leser sich
festgelegt hat.

---

## Offen gelassen

- [NOTE] `S24WachstumWidget.tsx:22` — getippte Nummern im Header-Kommentar. NOTE.
- [NOTE] `S24.mdx:280-285` — „eine Schaetzfrage um den Explorer wäre die stärkere
  Dramaturgie". Als NOTE formuliert und nicht umgesetzt; der Abschnitt hat mit den drei
  Presets und dem vierzweigigen Verdikt bereits die stärkste Struktur des Kapitels, und
  eine zweite Schätzfrage hätte den Wortetat gesprengt.

## Entscheidung nötig

- **S23KonstantenWidget (`S23Aufwand.tsx:248-336`) — REMOVE-Empfehlung des Reviews.**
  Der Export wird in keiner MDX-Datei importiert (`grep` über `src/`: nur die Definition),
  trägt aber Zahlenclaims für Code, den kein Leser sieht. Das Review nennt zwei Wege:
  in 2.3 einsetzen (die Stelle wäre `bemerkung:vorsicht-konstanten`, die passende
  Selbsttestfrage steht mit `S23.mdx:323-330` schon da) oder löschen. Beides ist eine
  Editorial-Entscheidung und wurde **nicht** ausgeführt. Der Code ist unverändert; seine
  Zahlen (Schnittpunkt 1009,90…, die 1009/1010-Probe, 2²⁰⁰) sind im neuen Prüfskript
  trotzdem abgedeckt, damit die Entscheidung nicht an fehlender Verifikation hängt.
- **Duplikate `S23Local.tsx` / `S24Local.tsx`** — sie sind bis auf das Wurzelelement mit
  den vier Kopien in Kapitel 3 und der Komponente in Kapitel 1 identisch. Die
  Zusammenlegung zu einer Lib-Komponente ist ein **lib-Befund** (`src/lib` in diesem Lauf
  tabu) und braucht eine Entscheidung im lib-Lauf. In diesem Lauf wurden nur die
  Oberflächenklassen und die Barrierefreiheit repariert.
