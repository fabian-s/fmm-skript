# Kapitel 2 — Widget-Didaktik-Review (2026-08-29)

Nenner aus dem Quellbaum: **9 Widget-Dateien** (`src/chapters/02-algos/widgets/`) mit
**11 exportierten Bausteinen**, **5 MDX-Abschnitte**, **5 `:::interaktiv`-Kästen**.
Beide Pässe durchgeführt: alle neun Dateien vollständig gelesen; Rendering bei 1300 px und
390 px selbst erzeugt und je Widget eine Zustandssequenz durchgefahren (Slider min →
kritische Stelle → max, jeder Preset, Stepper bis ans Ende und zurück, Schätzfrage vor und
nach dem Auflösen). Schüsse: `ix/02/02w0-a…j`, `02w1-a…e`, `02w2-a…e`, `02w3-a…g`,
`02w4-a…c`, `02m-*` (390 px).

Hinweis zu den Baseline-Shots unter `shots/02/`: dort steht in Verdikten und
Konsolidierungsprosa roher LaTeX-Quelltext (`\(22{,}5\)`). Das ist **kein Produktfehler** —
die Abschnitte tragen `content-visibility:auto`, MathJax setzt erst beim Sichtbarwerden.
Nach echtem Scrollen sind alle Formeln gesetzt (`mjx-container`-Zählung 0 → 11), merror = 0.

**F1/F6-Überblick für das ganze Kapitel:** *Keine* der neun Dateien zitiert ein Prüfskript
unter `scripts/verify/`. Sechs tragen den Header „historische Notiz … derzeit nicht
reproduzierbar nachgewiesen" (S21Demos, FibonacciStepper, S23Aufwand, S24WachstumWidget,
S25Aufrufbaum, S25FibVergleich), zwei zitieren `verify-hdr.mjs`, das ihre Inhalte nicht
abdeckt (S23Local, S24Local), eine hat einen Header ohne Skript (S21Local). Ich habe die
Zahlen der sechs stichprobenartig nachgerechnet: die Fibonacci-Tabellen (C, A,
Baumhäufigkeiten), die FLOP-Zahlen, die Schnittpunkte und die Modellzeiten stimmen
sämtlich — **bis auf einen Fall**, und der ist der schwerste Befund des Kapitels.

---

## S21Local.tsx (Abschnitt 2.1, `<RSelbsttest />`)

RSelbsttest — **KEEP** — Vier `Schaetzfrage`-Blöcke über R-Ausdrücke; predict-then-reveal
sauber umgesetzt, die R-Ausgabe erscheint erst nach dem Tipp.

**F1/F6:** Header ohne Skript („historische Prüfung, Skript nicht mehr vorhanden").

- [MINOR] `src/chapters/02-algos/widgets/S21Local.tsx:17-27` — Vier konkrete R-Ausgaben
  behauptet (u. a. `-2.775558e-17`, `-262144`), Nachweis fehlt. Fix: ein
  `scripts/verify/S21Local.mjs`, das die drei in JS reproduzierbaren Werte prüft und für
  den vierten (R-spezifisch) die Größenordnung `2^18` gegen die ULP bei 10²¹ rechnet.
- [NOTE] `src/chapters/02-algos/widgets/S21Local.tsx:22-26` — Der Header sagt offen, dass
  R und JS beim vierten Ausdruck verschiedene Werte liefern und warum. Genau diese
  Ehrlichkeit verlangt Pflicht 5; bitte beim Fixen erhalten.

## S21Demos.tsx (Abschnitt 2.1, `:::interaktiv[Zwei Gesichter derselben Auslöschung]`)

AusloeschungWidget — **REVISE** — Die Größenordnungsachse ist die beste Idee des Kapitels
(Auflösung gegen Zielgröße auf einer gemeinsamen Skala), aber der Regler führt in einen
Bereich, den weder Verdikt noch Selbsttest kennen — und dort wird ein Selbsttest falsch.

**F1/F6:** „historische Notiz"-Header ohne Skript; die Tabelle im Header endet bei k = 14,
der Regler geht bis k = 20.

- [CRITICAL] `src/chapters/02-algos/widgets/S21Demos.tsx:49` und
  `src/chapters/02-algos/S21.mdx:277-285` — Der Header behauptet „Die zweistufige Rechnung
  liefert für jedes k exakt 22,5", und die Selbsttestfrage in S21.mdx markiert die Aussage
  „Die zweistufige Varianzformel versagt bei genügend großer Verschiebung genauso wie die
  Verschiebungsformel" als **falsch**, mit der Begründung „Sie liefert im Widget für jedes
  k exakt 22,5". Beides ist im erreichbaren Zustandsraum des Widgets unwahr: `K_MAX = 20`
  (`S21Demos.tsx:70`), und die zweistufige Rechnung liefert
  k = 16 → **20**, k = 17 → **128**, k ≥ 18 → **0** (nachgerechnet, und in
  `ix/02/02w0-e-k18.png` in der grünen Zeile „zweistufig 0" zu sehen). Die Aufgabe stuft
  also eine *wahre* Aussage als falsch ein, und der Leser kann das mit dem Regler in zwei
  Sekunden widerlegen. Fix (eins von beiden): `K_MAX` auf 15 senken und die Quizbegründung
  auf „für jedes im Widget erreichbare k" einschränken — oder, didaktisch besser, den
  Bereich lassen, eine vierte Verdikt-Verzweigung „auch die zweistufige Formel bricht jetzt
  zusammen (die Abweichungen x_i − x̄ sind bei 10¹⁸ selbst nicht mehr darstellbar)"
  ergänzen und die Quizfrage umdrehen.
- [MAJOR] `src/chapters/02-algos/S21.mdx:206-210` — Die Konsolidierungsprosa steht im
  selben Kasten *unter* der noch unbeantworteten Schätzfrage und verrät deren Lösung
  wörtlich: „Die Verschiebungsformel verliert schon bei c = 10⁸ …" (Lösung der
  `Schaetzfrage` ist `"e8"`, `S21.mdx:201`). Im Rendering steht der Satz vollständig
  sichtbar über dem noch grauen „Auflösen"-Knopf (`ix/02/02w0-a-start-k6.png`). Fix: die
  Auflösung in `verdeckt={…}` der `Schaetzfrage` verschieben; im Kasten bleibt nur die
  Kriteriums-Formulierung („Solange die orange Auflösung links von der grünen Zielgröße
  steht, überlebt das Ergebnis").
- [MAJOR] `src/chapters/02-algos/widgets/S21Demos.tsx:307-319` — Die grüne Zeile
  „zweistufig" ist als exakte Referenz ausgewiesen (Header Z. 31-32: „grün die exakte
  Referenz"), zeigt aber ab k = 16 selbst kaputte Werte, ohne dass irgendein Verdikt das
  kommentiert (F8: erreichbare Zustandsklasse ohne Verdikt-Zweig). Fix: siehe CRITICAL.
- [MINOR] `src/chapters/02-algos/widgets/S21Demos.tsx:211-213` — Startwert k = 6 zeigt den
  intakten Fall (beide Wege 22,5). Für ein Predict-then-reveal-Widget ist das vertretbar,
  aber die *tote* Anfangsfigur zeigt damit nicht das Phänomen (B2). Fix: Startwert 7 —
  dort steht die orange Auflösung schon unmittelbar links neben der grünen Marke, die
  Spannung ist sichtbar, die Antwort noch nicht verraten.
- [MINOR] `src/chapters/02-algos/widgets/S21Demos.tsx:193-195` (Frage) vs. `:230-233` —
  Die Schätzfrage im MDX fragt nur nach der Verschiebungsformel, bleibt aber auch stehen,
  wenn der Leser auf „Assoziativität" umschaltet; dort passt sie nicht mehr
  (`ix/02/02w0-i-assoz-k0.png`). Fix: Frage in den Varianz-Modus einbetten oder beim
  Moduswechsel eine zweite Frage einblenden.
- [MINOR] `src/chapters/02-algos/widgets/S21Demos.tsx:254` — Geviertstrich „—" im Verdikt;
  STYLE.md verlangt „ – ". Einzige leserseitige Fundstelle im ganzen Kapitel.
- [MINOR] `src/chapters/02-algos/S21.mdx:86,235,301` — Getippte Kapitelnummern in der
  Prosa („Kapitel 4, nach den Normen aus Kapitel 3"). KONVENTIONEN.md verlangt `@kap:`.
- [NOTE] `src/chapters/02-algos/widgets/S21Demos.tsx:240,249` — `formel === 22.5` und
  `formel === 0` sind hier **korrekt** und kein Verstoß gegen die Drei-Zustands-Regel: Das
  Widget behauptet nichts über eine Toleranz, sondern zeigt genau das exakte Ergebnis der
  IEEE-Arithmetik, das der Gegenstand des Abschnitts ist. Bitte beim Fixen nicht
  „reparieren".

## FibonacciStepper.tsx (Abschnitt 2.2, `:::interaktiv[Wie oft rechnet die Rekursion doppelt?]`)

FibonacciStepper — **REVISE** — Zwei Darstellungen nebeneinander mit gemeinsamem Regler
(Muster 4 + 7), scrubbarer Lib-Stepper, korrekte Zähler; drei Dinge stehen dem im Weg.

**F1/F6:** „historische Notiz" ohne Skript. Alle Zahlen des Headers nachgerechnet
(C(3…15) = 3, 9, 41, 109, 287, 1219; A = 1, 4, 20, 54, 143, 609; Baum von x₈: x₁ 8-mal,
x₂ 13-mal, x₃ 8-mal, x₄ 5, x₅ 3, x₆ 2, x₇/x₈ je 1) — **alle korrekt**.

- [MAJOR] `src/chapters/02-algos/widgets/FibonacciStepper.tsx:114-115` — Startzustand
  n = 8, **k = 1**. Die tote Anfangsfigur zeigt einen Kasten mit „0", 0 Additionen, 1
  Aufruf und einen Aufrufbaum aus einem einzigen Knoten (`ix/02/02m-w1.png`). Als Figur in
  einer Druckfassung wäre das leer (Pflicht 2, B1/B2). Fix: `useState(8)` für `kRaw`, dann
  ist die Anfangsfigur der volle Achterbaum mit 41 Aufrufen gegen 6 Additionen — genau die
  Aussage des Abschnitts; der Stepper bleibt zum Zurückgehen da.
- [MAJOR] `src/chapters/02-algos/widgets/FibonacciStepper.tsx:89-92` und `:227-230` —
  Die Legende behauptet „gleiche Farbe = identische, mehrfach ausgeführte Teilrechnung",
  aber `shade(j) = base[j % 5]` hat nur fünf Töne. Im Standardbaum für x₈ tragen x₁ und
  x₆, x₂ und x₇, x₃ und x₈ jeweils dieselbe Farbe (in `ix/02/02w1-b-k8.png` deutlich
  sichtbar): Die Legende lädt zu einer falschen Lesart des Bildes ein. Fix: Farbe nur für
  die tatsächlich mehrfach vorkommenden Argumente vergeben (`counts[j] > 1`) und für
  j > 5 auf Helligkeitsstufen derselben Farbe ausweichen, oder die Legende auf „gleiche
  Zahl = identische Teilrechnung" ändern und die Farbe fallen lassen.
- [MAJOR] `src/chapters/02-algos/S22.mdx:121-125` — Konsolidierung im selben Kasten unter
  der offenen Schätzfrage: „… weil sie x₃ achtmal und x₂ dreizehnmal von vorn ausrechnet".
  Die Schätzfrage (`S22.mdx:112-117`) fragt exakt nach dieser 8. Spoiler wie in 2.1.
  Fix: Satz in `verdeckt={…}` verschieben.
- [MINOR] `src/chapters/02-algos/widgets/FibonacciStepper.tsx:151-154` — Die Aufgabenzeile
  („Scrubben wir den Schrittregler nach rechts und vergleichen die beiden Zähler") nennt
  nicht die Handlung, nach der die Schätzfrage fragt (Häufigkeit von x₃ ablesen). Der
  Zähler steht in einer Nebenzeile („Mehrfach berechnet: …", `:211-221`). Fix: Aufgabe auf
  „… und lesen wir ab, wie oft x₃ dabei mehrfach berechnet wird" umstellen.
- [MINOR] `src/chapters/02-algos/widgets/FibonacciStepper.tsx:268` — `href="#sec-2.5"`
  hartcodiert, während der Linktext korrekt über `ref("sec:algos/fibonacci-komplexitaet")`
  läuft. Der Anker kann still veralten. Fix: Ziel-URL ebenfalls aus der Nummerntabelle.
- [MINOR] `src/chapters/02-algos/S22.mdx:217-219` — `[nächsten Abschnitts](#sec-2.3)` sowie
  „Kapitel 4" / „Kapitel 3" getippt.
- [NOTE] `src/chapters/02-algos/widgets/FibonacciStepper.tsx:88-92` — Die Pastelltöne des
  Baums greifen dieselben fünf Kapitelfarben ab, die im selben Widget semantisch belegt
  sind (blau = letztes Element, grün = vorletztes, orange = neue Summe, rot = teuer). Zwei
  Farbsysteme im selben Bild (E1/E2). Fix zusammen mit dem MAJOR oben.

## S23Aufwand.tsx (Abschnitt 2.3) — drei Exporte

### S23FlopWidget (`:::interaktiv[FLOP-Zähler …]`)

S23FlopWidget — **REVISE** — Rechnet und vergleicht korrekt, aber die Frage, die es
beantwortet, steht in einem eingeklappten Block.

**F1/F6:** „historische Notiz" ohne Skript. Zahlen nachgerechnet (19 900 / 1 990 000,
Speicher 10 200 / 30 000, Faktoren 4,01 und 8,02) — **korrekt**.

- [MAJOR] `src/chapters/02-algos/S23.mdx:109-113` und `:118` — Die motivierende Frage
  („Verdoppeln wir alle Dimensionen, verdoppelt sich dann auch der Aufwand?") steht am
  Ende der `:::::vertiefung[Beweis durch genaues Zählen der Operationen]`, also in
  eingeklapptem Zusatzstoff. Der Kasten darunter beginnt ohne jede Frage direkt mit
  `<S23FlopWidget />`, und die Konsolidierung antwortet mit „Der Zähler zeigt: **Nein.**"
  auf eine Frage, die der Leser nie gesehen hat (A1 + A8: Sichtbares hängt an
  eingeklapptem Inhalt). Fix: die zwei Sätze aus der Vertiefung herausziehen und als
  Fragestellung an den Anfang des `:::interaktiv`-Kastens setzen.
- [MINOR] `src/chapters/02-algos/S23.mdx:118-121` — Die Konsolidierung nennt die Faktoren
  4 und 8, bevor der Leser den Knopf gedrückt hat; dieselbe Zahl fragt später der
  Selbsttest ab (`S23.mdx:332-337`). Hier hätte eine `Schaetzfrage variante="auswahl"`
  („doppelt / viermal / achtmal") die Pointe gerettet (C7).
- [MINOR] `src/chapters/02-algos/widgets/S23Aufwand.tsx:150-152` vs.
  `src/chapters/02-algos/S23.mdx:48-49` — Farbrollenkonflikt innerhalb desselben
  Abschnitts: Die Prosa verfolgt „$\cbred{\bA}$ in Rot und den Vektor $\cblue{\bx}$ in
  Blau, das Ergebnis $\cbgreen{\by}$ in Grün"; das Widget belegt Blau mit „Matrix-Vektor-
  Produkt" und Orange mit „Matrix-Matrix-Produkt". Blau trägt damit zwei Rollen auf einer
  Bildschirmseite (E1). Der Header dokumentiert die Widget-Rollen (Z. 36-39), erwähnt den
  Konflikt aber nicht. Fix: im Widget die beiden Panels über die Kopfzeile und nicht über
  Sliderfarben unterscheiden, oder die Rollen im Header ausdrücklich als Ausnahme
  begründen (wie es S21Demos vorbildlich tut).

### S23WachstumsBild

S23WachstumsBild — **KEEP (STATIC, korrekt so)** — Zwei feste Tafeln derselben drei Kurven,
links linear, rechts logarithmisch. Muster 4 + 11 richtig angewendet; der Header sagt
ausdrücklich, warum hier kein Widget steht (`S23Aufwand.tsx:25-28`). Beschriftung,
Inline-Legende und Farbcodierung vollständig.

- [NOTE] `src/chapters/02-algos/S23.mdx:297` — Steht ohne `:::interaktiv`-Kasten, mit
  Rahmenprosa davor (`:292-295`) und einer Bildunterschrift im Widget
  (`S23Aufwand.tsx:231-236`). Für eine statische Doppeltafel ist genau das richtig; kein
  Befund, nur zur Abgrenzung gegen H5 festgehalten.

### S23KonstantenWidget

S23KonstantenWidget — **REMOVE** — Wird nirgends importiert.

- [MINOR] `src/chapters/02-algos/widgets/S23Aufwand.tsx:248-336` — Der Export erscheint in
  keiner MDX-Datei (`grep` über `src/`: nur die Definition). Damit trägt der Header
  Zahlenclaims (Schnittpunkt 1009,90…, `S23Aufwand.tsx:47-50`) für Code, den kein Leser je
  sieht, und der Nenner „9 Widget-Dateien" überschätzt das ausgelieferte Material. Fix:
  entweder in 2.3 einsetzen (der Abschnitt hat mit `bemerkung:vorsicht-konstanten` genau
  die passende Stelle und mit `S23.mdx:323-330` sogar schon die Selbsttestfrage dazu) oder
  löschen.

## S23Local.tsx (Abschnitt 2.3, `<SelfTest />` ×2)

SelfTest — **KEEP** — Multiple-Choice mit Rückmeldung je Option und aufklappbarer Lösung;
inhaltlich sauber (beide Lösungen von Hand nachgerechnet: 2nd + d bzw. n + nd + 2d).

**F1/F6:** keine numerischen Claims; zitiert `verify-hdr.mjs`, das die Datei nicht abdeckt.

- [MINOR] `src/chapters/02-algos/widgets/S23Local.tsx:42-44,62-64` — Hartcodierte
  `emerald`/`red`-Tailwindklassen statt `W_BUTTON`/`W_PANEL`; deckt die
  `.w-dark`-Oberfläche nicht ab und benutzt Grün/Rot, während Rot im Kapitel „das teure
  Verfahren" bedeutet (H5/E1). Fix: `surface.ts`-Ketten und `Verdikt kind="ok"/"fail"`.
- [MINOR] `src/chapters/02-algos/widgets/S23Local.tsx:46-58` — Die Optionsknöpfe tragen
  weder `aria-pressed` noch eine Gruppenrolle; der Screenreader hört nur „Knopf a) …"
  (G3). Fix: `role="radiogroup"` auf dem Container, `aria-checked` je Knopf.
- [MINOR] `src/chapters/02-algos/widgets/S23Local.tsx:7` — Header zitiert `verify-hdr.mjs`
  ohne Deckung (wie S11Widgets).

## S24Local.tsx (Abschnitt 2.4, `<SelfTest />` ×4)

SelfTest — **KEEP** — `details`/`summary`-Muster, Frage sichtbar, Lösung eingeklappt.
Inhaltlich korrekt (alle vier Landau-Aussagen geprüft).

- [MINOR] `src/chapters/02-algos/widgets/S24Local.tsx:8` — Header zitiert `verify-hdr.mjs`
  ohne Deckung.
- [MINOR] `src/chapters/02-algos/widgets/S24Local.tsx:23-27` — Hartcodierte Slate-Klassen
  statt `surface.ts` (H5). Diese Komponente ist bis auf das Wurzel-Element identisch mit
  `S23Local`, `S11Widgets` und den vier Kopien in Kapitel 3 (siehe dort). Fix: eine
  Lib-Komponente.

## S24WachstumWidget.tsx (Abschnitt 2.4, `:::interaktiv[Wachstumsraten-Explorer …]`)

S24WachstumWidget — **KEEP** — Drei kuratierte Presets, die die Fallunterscheidung *sind*,
Skalenwechsel mit 300-ms-Überblendung statt Hartschnitt, reaktives Verdikt mit vier
Zweigen (alle vier im Rendering erreicht: `ix/02/02w3-a…g`). Das didaktisch stärkste
Widget des Kapitels.

**F1/F6:** „historische Notiz" ohne Skript; Schwellen c = 1 → 5 … c = 1000 → 19 in der
Sequenz reproduziert.

- [MINOR] `src/chapters/02-algos/widgets/S24WachstumWidget.tsx:181-183` — Der Verdikttext
  „liegt c·n² bis n = {nStar − 1} über 2ⁿ" ist für c = 1 falsch: bei n = 1 ist 2¹ = 2 > 1,
  bei n = 2 und n = 4 stehen beide gleich. Richtig ist nur die zweite Hälfte („ab n = 5
  gilt endgültig 2ⁿ > c·n²"). Fix: erste Teilaussage auf „spätestens ab n = {nStar} zieht
  2ⁿ endgültig davon; davor können beide Kurven mehrfach die Rollen tauschen" umstellen.
- [MINOR] `src/chapters/02-algos/widgets/S24WachstumWidget.tsx:311-327` — Der
  Skalen-Umschalter benutzt hartcodierte `bg-sky-600 text-white` / `bg-white` statt
  `W_BUTTON`/`W_BUTTON_AKTIV`; auf der `.w-dark`-Oberfläche bleibt der inaktive Knopf weiß.
  Fix: `surface.ts`-Ketten.
- [MINOR] `src/chapters/02-algos/widgets/S24WachstumWidget.tsx:113-114` — `fmtVal` gibt
  Werte < 100 mit einer Nachkommastelle aus: In der Tabelle steht „30,0" neben „900" und
  „1,1 · 10⁹" (E5, uneinheitliche Zahlenbreiten, `ix/02/02m-w3.png`). Fix: ganzzahlige
  Werte ohne Nachkommastelle.
- [MINOR] `src/chapters/02-algos/widgets/S24WachstumWidget.tsx:328-344` — Die sechs
  Klassen-Kästchen stehen ohne `fieldset`/`legend` und ohne gemeinsames `aria-label`; bei
  390 px laufen die Labels „n" und „n · log₂ n" optisch ineinander (G3/G6). Fix:
  `<fieldset>` mit `<legend className="sr-only">Sichtbare Komplexitätsklassen</legend>`.
- [NOTE] `src/chapters/02-algos/S24.mdx:280-285` — Die Konsolidierung nennt die Schwellen
  n = 5 und n = 19 fertig; die Selbsttestfrage (`:324-331`) fragt dafür nach c = 100 → 15
  und bleibt damit widgetabhängig. Vertretbar, aber eine `Schaetzfrage` um den Explorer
  wäre hier die stärkere Dramaturgie.
- [NOTE] `src/chapters/02-algos/widgets/S24WachstumWidget.tsx:22` — „Lemma 2.4.4 (Regel 3)
  zusammen mit Beispiel 2.4.6" als getippte Nummern im Header.

## S25Aufrufbaum.tsx (Abschnitt 2.5, in `:::beispiel[#der-aufrufbaum-fuer-n-5]`)

S25Aufrufbaum — **KEEP (STATIC, korrekt so)** — ASCII-Baum mit zwei rot markierten
Doppelberechnungen, `role="img"` + aussagekräftiges `aria-label`, `overflow-x-auto`. Der
Header begründet ausdrücklich, warum hier kein Widget steht und wo der parametrisierbare
Baum liegt (`S25Aufrufbaum.tsx:12-16`) — genau die Argumentation, die Muster 11 verlangt.

**F1/F6:** „historische Notiz" ohne Skript; T(5) = 15 und die Häufigkeiten 1/1/2/3/5/3
nachgerechnet — **korrekt**.

- [MINOR] `src/chapters/02-algos/widgets/S25Aufrufbaum.tsx:16` — „im Stepper in Abschnitt
  2.2" als getippte Nummer im Header.

## S25FibVergleich.tsx (Abschnitt 2.5, `:::interaktiv[Gezählte Schritte …]`)

S25FibVergleichWidget — **REVISE** — Log-Tafel mit gezählten Punkten gegen zwei
Vorhersage-Geraden, `Schaetzfrage` als Rahmen, φ-Gerade erst nach dem Auflösen: das ist
das Muster, wie es sein soll. Nur wird die Antwort zweimal vorweggenommen.

**F1/F6:** „historische Notiz" ohne Skript. T(20) = 21 891, T(30) = 2 692 537,
T(50) ≈ 4,07·10¹⁰, T(80) = 75 778 124 746 287 811 nachgerechnet — **korrekt**.

- [MAJOR] `src/chapters/02-algos/widgets/S25FibVergleich.tsx:216-220` — Das
  **Vor**-Auflösen-Verdikt sagt bereits: „Sie verläuft aber sichtbar flacher als die
  gestrichelte Schranke darüber". Damit ist die Option „auf der von 2ⁿ" ausgeschlossen und
  die Frage (`:87-93`, drei Optionen) faktisch beantwortet, bevor der Leser tippt
  (`ix/02/02w4-a-start.png`). Fix: das neutrale Verdikt auf eine Beobachtung ohne
  Vergleich reduzieren („Beide Punktfolgen liegen auf Geraden, die rote steigt deutlich
  steiler an") und den Vergleich mit der Schranke in den Auflösungszweig verschieben.
- [MAJOR] `src/chapters/02-algos/S25.mdx:231-234` — Dieselbe Vorwegnahme in der
  Konsolidierung im Kasten: „Die Steigung der roten Punkte liegt dabei sichtbar unter
  log₁₀ 2 ≈ 0,301." Fix: hinter die Auflösung.
- [MINOR] `src/chapters/02-algos/widgets/S25FibVergleich.tsx:112-114` — `T[n]` wird in
  `number` (float64) aufgebaut; ab n ≈ 54 überschreitet T(n) 2⁵³, die angezeigte Zahl ist
  dann keine exakte Zählung mehr, obwohl der Ablesekasten (`:193-203`) sie als „gezählte
  Aufrufe" ausweist und der Header „exakt per BigInt gegengerechnet" behauptet. Der
  angezeigte Wert stimmt in der Anzeigegenauigkeit (7,6 · 10¹⁶), die Aussage „exakt" nicht.
  Fix: T per `BigInt` rechnen und für die Anzeige konvertieren, oder den Kasten „gezählt
  (auf Anzeigegenauigkeit)" nennen.
- [MINOR] `src/chapters/02-algos/widgets/S25FibVergleich.tsx:38` vs. `:68-79` — Header:
  „n = 80 → 2,4 Jahre"; das Widget zeigt „≈ 2 Jahre", weil `fmtTime` auf ganze Jahre
  rundet. Die Selbsttestfrage (`S25.mdx:339-345`) verlangt genau die 2 und ist damit
  konsistent — der Header ist es nicht. Fix: Headerwert auf den angezeigten angleichen.
- [MINOR] `src/chapters/02-algos/S25.mdx:231-234` + `:237-272` — Der Kasten schließt mit
  „Woran liegt das?"; die Antwort steht ausschließlich in den beiden danach folgenden,
  eingeklappten `vertiefung`-Blöcken (A8). Fix: den einen Satz „Der wahre Wachstumsfaktor
  ist der goldene Schnitt φ ≈ 1,618" in den Kasten ziehen, die Herleitung bleibt in der
  Vertiefung.
- [NOTE] `src/chapters/02-algos/widgets/S25FibVergleich.tsx:22` — „(Satz 2.5.6, Bemerkung
  2.5.7)" als getippte Nummern im Header.

## Kapitel-Fazit (H1–H6)

**H1 Widget-Dichte:** Fünf `:::interaktiv`-Kästen auf fünf Abschnitte, dazu zwei statische
Tafeln und sechs `SelfTest`-Blöcke. In 2.1 stehen zwei interaktive Einheiten (RSelbsttest
und AusloeschungWidget), das ist die einzige Häufung und wegen der Auffrischungsrolle des
Selbsttests vertretbar. Kein Befund.

**H2 Dramaturgie:** Vorbildlich. Mechaniken kommen einzeln (2.1 Gleitkomma, 2.2
Aufwandzählen am Beispiel, 2.3 Zählregeln, 2.4 Landau-Sprache), erst 2.5 setzt alles
zusammen; die statische Doppeltafel in 2.3 geht dem parametrisierten Explorer in 2.4
absichtlich voraus (`S23Aufwand.tsx:25-28`). Genau die Reihenfolge, die Muster 9 verlangt.

**H3 Farbrollen:** Die Kapitelrampe (grün log n · blau n · grau n·log n · orange n² ·
violett n³ · rot 2ⁿ, rot = „das Teuerste") ist in S21Demos, S23Aufwand, S24WachstumWidget,
FibonacciStepper und S25FibVergleich identisch dokumentiert und eingehalten — und die eine
Abweichung in 2.1 ist im Header ausdrücklich als Ausnahme begründet
(`S21Demos.tsx:35-39`). Das ist der Umgang mit Farbrollen, den die Konventionen wollen.
Zwei Risse: der Blau-Konflikt in 2.3 (Prosa: blau = Vektor x; Widget: blau =
Matrix-Vektor-Produkt) und die Deko-Pastelltöne im Aufrufbaum.

**H4 Selbsttest-Abdeckung:** Der stärkste Punkt des Kapitels. Jeder der fünf Abschnitte
schließt mit Fragen, und in **jedem** ist mindestens eine nur mit dem Widget zu beantworten
(2.1: k = 16; 2.2: 54 Additionen; 2.3: Faktor 8; 2.4: c = 100 → 15; 2.5: 2 Jahre). Genau
so werden Widgets tragend. Der Wermutstropfen: In 2.1 ist die widgetabhängige Antwort im
selben Kasten schon vorweggenommen, und in 2.1 ist eine der Fragen sachlich falsch (siehe
CRITICAL).

**H5 Ältere Generation:** `S23Local.tsx` und `S24Local.tsx` sind Migrationsreste mit
hartcodierten Tailwind-Farben, ohne `surface.ts` und ohne `aria-pressed`. Sie sind zudem
Duplikate voneinander und der Komponente aus Kapitel 1.

**H6 Länge:** Konsolidierungen sind durchweg 2–4 Sätze, kein Kaveat wird vierfach
wiederholt, und die MDX-Dateien enthalten **null** Geviertstriche (STYLE.md). Einzige
leserseitige Ausnahme: `S21Demos.tsx:254`.

### Die drei wichtigsten Muster

1. **Der Spoiler-Split ist systematisch verletzt.** In vier von fünf Kästen (2.1, 2.2, 2.3,
   2.5) steht die Antwort auf die Schätz- oder Leitfrage sichtbar im selben Kasten, teils
   sogar im Vor-Auflösen-Verdikt des Widgets selbst. Die `Schaetzfrage`-Komponente hat mit
   `verdeckt={…}` genau dafür den richtigen Platz; er wird nirgends genutzt. Ein einziger
   Umbau-Durchgang würde vier MAJOR-Befunde auf einmal erledigen.
2. **Der erreichbare Zustandsraum ist größer als der geprüfte.** Der schwerste Befund
   (zweistufige Varianzformel ab k = 16) entsteht genau dort, wo der Regler weiter läuft
   als die Headertabelle und als der Verdikt-Fallbaum. Dieselbe Klasse: der Aufrufbaum mit
   mehr als fünf Farben, `T(n)` jenseits von 2⁵³. Ein Prüfskript, das *jeden erreichbaren
   Reglerwert* durchfährt und gegen die Verdikt-Verzweigung asserted (F8), findet alle drei.
3. **Kein einziges committetes Prüfskript.** Neun von neun Dateien tragen entweder die
   „historische Notiz" oder ein Zitat auf `verify-hdr.mjs`, das ihre Zahlen nicht
   berührt — und dessen Landkarten-Zusicherung `assert.equal(15, 15)` lautet. Die Zahlen
   sind (bis auf den CRITICAL) durchweg richtig; nachgewiesen ist keine.
