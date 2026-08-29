# Fix-Log — Kapitel 13 (Funktionsapproximation), 2026-08-29

Grundlage: `reviews/widget-didactic-review-2026-08-29/13-funktionsapproximation.md`
(4 CRITICAL, 39 MAJOR, 40 MINOR, 18 NOTE). Verifiziert per node (acht neue
REV29-Skripte) und im Browser über CDP gegen einen eigenen Dev-Server
(`npx vite --port 4186`) bei 1300 px und 390 px, jeweils auch im interagierten
Zustand (Regler-Rastwerte, Presets, Schätzfrage vor und nach dem Auflösen).

**Wortzahl-Delta der MDX-Dateien** (gegen `git show HEAD`): S131 +1,8 %,
S132 +1,3 %, S133 +2,6 %, S134 +0,1 %, S135 +0,7 %, S136 +0,1 %, S137 +1,0 %,
S138 +1,0 %, S139 +1,3 %; Kapitel gesamt 30 317 → 30 635 Wörter (**+1,0 %**).
`merror` bei beiden Breiten 0, kein waagerechtes Scrollen der Seite,
kein Geviertstrich mehr im Kapitel.

---

## Die vier CRITICALs

| # | Befund | Fix |
|---|---|---|
| 1 | `S133Monombasis.tsx:6-9` — Header behauptet Verifikation der κ₂-Werte und Spaltenwinkel durch `verify-hdr.mjs` und zwei nicht existierende Skripte | Neues `REV29/13-funktionsapproximation-S133Monombasis.mjs`: κ₂ über eine **einseitige Jacobi-SVD** (das Widget rechnet mit Potenzmethode und expliziter Inverse) für n = 5, 10, 15, 20 in allen drei Basen, dazu die drei Winkel bei n = 10 und die drei Verdikt-Schwellen. Header umgestellt. |
| 2 | `S134BSplineBasis.tsx:74-80` — bei x\* = 5 (Reglermaximum) zeigt das Widget gleichzeitig „Funktionswert 0", „Summe 1" und „1 von 5 Funktionen aktiv" und beruft sich auf einen Satz, den der Zustand nicht erfüllt | Regler endet bei `X_MAX = 4,95` (Konstante mit Begründungskommentar), der entartete Punkt ist damit weggeklemmt statt still überspielt; zusätzlich vier echte Lage-Klassen im Verdikt (Grad null / linker Rand / auf einem inneren Knoten / im Intervallinneren). Neues Skript `…-S134BSplineBasis.mjs` prüft die Klassen und dass an ξ_m die Summe wirklich 0 wäre. |
| 3 | `S134Stoerung.tsx:40-46` — „VERIFIZIERTE ZAHLEN" 1,000 / 2,320 / 0,037 und 1,732 … 0,010, gedeckt nur durch `assert.equal(9,9)` | Neues `…-S134Stoerung.mjs`: natürlicher kubischer Spline in der **Momentenform** (Thomas-Algorithmus, ganz ohne B-Splines) und das Polynom **baryzentrisch**; die B-Spline-Kollokation wird zusätzlich über eine iterative Cox-de-Boor-Auswertung und ein Householder-QR aufgebaut und punktweise gegen die Momentenform gehalten. Alle Header-Zahlen sind jetzt asserted. Dabei fiel auf, dass a₁ und a₁₁ **exakt** stehen bleiben (sie hängen am Randwert) – der Widget-Satz „auch die äußersten Koeffizienten bewegen sich noch" war falsch und ist korrigiert. |
| 4 | `S137Glaettung.tsx:32-35` — Wertetabelle und Zweigabdeckung „2 / 10 / 16 / 9" behauptet, beide zitierten Skripte fehlen | Neues `…-S137Glaettung.mjs`: derselbe Zufallsstrom, aber rekursive Cox-de-Boor-Auswertung, Householder-QR direkt auf der Designmatrix statt Cholesky auf BᵀB und Gauss-Legendre statt Simpson. Alle fünf Header-Zeilen bestätigt; die Zweigverteilung ist tatsächlich **2 / 9 / 16 / 10** (starr / verlässt Fenster / Ausschlag / passend) – der Header nannte sie in falscher Reihenfolge und ist korrigiert. |

---

## Je Widget

### S131Konzeptkarte.tsx — Kasten 1
Umgesetzt: MINOR (hartcodierte Abschnittsnummern in den Gruppenlabels →
„Interpolationsstrang" / „Glättungsstrang und Multivariates").
NOTE zur fehlenden Frage nicht umgesetzt (Orientierungskarte, A1 gilt nicht
streng – so auch im Befundtext).

*Rationale:* Die Karte ordnet, sie prüft nicht; die einzige harte
Regelverletzung waren die getippten Nummern neben korrekt gesetzten `ref()`.

### S131DreiProbleme.tsx — Kasten 2
Umgesetzt: MAJOR (Tafelreihe bei 390 px), MAJOR (zehn Zeilen Prosa im Widget),
MAJOR (fehlender Wortabstand), MINOR (rote Strecken nur bei σ > 0), MINOR
(`rms === 0` → `sigma === 0`), MINOR (dritte Zustandsklasse), MINOR
(`role="img"` je Tafel), MINOR (`bg-white` → `bg-[var(--w-bg)]`), MINOR
(Selbsttest-Verweis „Vertiefung" → „Widget zu den drei Aufgaben").

Die Tafelreihe ist jetzt `flex-wrap` statt `w-max` + `overflow-x-auto`; bei
390 px stehen alle drei Tafeln untereinander (gemessen: Reihe 316/316 statt
662/316), bei 1300 px nebeneinander wie bisher. Die Legendensätze nennen die
Tafeln beim Namen statt „links/Mitte/rechts", weil die Anordnung mit der
Breite wechselt. Der Deutungsabsatz steht jetzt als Konsolidierung hinter dem
Widget im Kasten.

*Rationale:* Der σ-Regler wirkt nur auf die Glättungstafel; solange die am
Handy hinter dem Rand lag, hatte die einzige Interaktion des Widgets dort
keine sichtbare Wirkung. Die dritte Verdikt-Klasse („Rauschen klein gegen die
Signalamplitude 0,28") macht aus zwei Zuständen den Übergang, den das Widget
zeigen soll.

### S131Interpolanten.tsx — Kasten 3
Umgesetzt: MAJOR (Beispiel über dem Kasten druckte 0,75 und 0,7499), MAJOR
(Konsolidierung unter der Schätzfrage), MAJOR (Startwert x\* = 1,3 = Stelle
der maximalen Spanne, Verdikt verriet sie), MINOR (462-Zeichen-Zeile), MINOR
(`kind="fail"` für den Normalfall), MINOR (rohes TeX in der `aria-live`-Region).

Startwert jetzt x\* = 1 (eine Stützstelle); über die Render-Prop-Form der
Schätzfrage bekommt das Widget `zeigeSpanne={aufgeloest}` und nennt die Zahl
erst nach dem Auflösen. Die beiden Zahlen aus dem Beispiel stehen im
`verdeckt`-Slot. `kind` ist jetzt `neutral` mit Titel „Nicht festgelegt:".

*Rationale:* Die Schätzfrage war dreifach beantwortet, bevor das Eingabefeld
berührt wurde. Nicht die Interpolation „scheitert" – sie legt zwischen den
Stützstellen nichts fest, und genau das ist die Einsicht des Widgets.

### S132Basisrechner.tsx — Kasten 4
Umgesetzt: MAJOR (Verdikt reagierte auf keinen der drei Regler), MAJOR
(Kasten lieferte die Auflösung vor dem Widget, danach nichts), MAJOR (derselbe
Absatz doppelt in MDX und Widget), MINOR (`toExponential` mit englischem
Punkt), MINOR (`|a₃| < 1e-12` als exakte Aussage), MINOR (`role="img"`),
MINOR (3 px Überstand bei 390 px).

Das Verdikt trägt jetzt die Basisform als `titel` und klassifiziert den
Zustand: Gerade (a₃ = 0, exakt über `y₁ − 2y₂ + y₃ === 0` auf dem
Reglerraster) / echte Parabel mit aufgehender Probe / Probe mit
Rundungsabweichung. Neuer deutscher Exponentialformatter `fmtExp` in
`S134BSpline.ts` (auch von S134Konstruktion benutzt). Die Prosa des Kastens
ist zur Frage geworden, der Erklärabsatz steht dahinter.

*Rationale:* Die Hauptinteraktion des Widgets sind die drei Messwertregler; ein
Verdikt, das allein am Basisschalter hängt, quittiert sie nicht. Die
interessante Fallunterscheidung stand daneben in einem gewöhnlichen `<p>`.

**Offen:** MINOR `useDrag` auf die drei Marker (C1). Kein lokaler Fix, das
Kapitel hat kein einziges `useDrag`; als eigener Arbeitsschritt sinnvoll.

### S133Monombasis.tsx — Kasten 5 (MonombasisFigur, VandermondeKondition)
Umgesetzt: **CRITICAL** (siehe oben), MAJOR (drei orange Kurven ohne Legende),
MAJOR (Prosablock nahm das Ergebnis vollständig vorweg), MAJOR („10^16" als
Literaltext in Achse, Kacheln, Readout und Fließtext), MINOR (`kind` und Text
an verschiedenen Schwellen), MINOR (hartcodiertes Hex in `S133.mdx`).

Die drei Kacheln tragen jetzt Strichmuster-Swatches nach dem Vorbild aus
`S131Interpolanten.tsx`, `hochzahl()` setzt echte Hochzahlen (1,5 · 10⁷,
Achse 10⁰ … 10¹⁶), und `kind` wird aus derselben `verlorene`-Schwelle
abgeleitet wie der Text (neutral / warn / fail). Der Deutungsabsatz steht als
Konsolidierung hinter dem Widget. Der Ehrlichkeitshinweis zu κ₂ ≈ 10¹⁶ ist
unverändert erhalten.

*Rationale:* Die zahlenreichste Grafik des Kapitels war die einzige mit
Caret-Notation und ohne Legende – man konnte nicht entscheiden, welche der
drei gleichfarbigen Linien Chebyshev ist, und das Verdikt-Zeichen widersprach
seinem eigenen Text.

### S133Runge.tsx — Kasten 6
Umgesetzt: MAJOR (Schätzfrage war in der Bemerkung 40 Zeilen darüber bewiesen),
MAJOR (Konsolidierung nannte die Antwort erneut), MAJOR (Fehlerkurven-Tafel
zeigte die Antwort im Startzustand), MINOR (Bemerkungssatz auch an
Chebyshev-Verdikte angehängt), MINOR (Chebyshev-Wert bei n = 60, Regler endet
bei 21).

Die Schätzfrage fragt jetzt nach etwas, das die Prosa **nicht** ausschreibt und
das nur eine Reglerfahrt zeigt: ab welcher Knotenzahl der äquidistante Fehler
erstmals über 1 liegt (n = 9). Die Fehlerkurven-Tafel erscheint über
`zeigeFehlerkurve={aufgeloest}` erst nach dem Auflösen. Der
Bemerkungs-Nachsatz hängt nur noch am `modus === "aequi"`-Zweig. Die
Vertiefung nennt statt n = 60 den erreichbaren Wert bei n = 21.
Neues Skript `…-S133Runge.mjs` (Newton-Form statt baryzentrisch) belegt die
Tabelle, die neue Antwort und die Ungerade/Gerade-Struktur dahinter.

*Rationale:* Die Nichtmonotonie ist im Skript ein Lehrsatz mit Tabelle – als
Rätsel taugt sie nicht mehr. Der Zickzack zwischen geraden und ungeraden
Knotenzahlen steht dagegen nirgends im Text und ist genau die Sorte Zustand,
die nur das Widget zeigt.

### S134Konstruktion.tsx — Kasten 7
Umgesetzt: MAJOR (konstantes Verdikt mit unerreichbarem `warn`-Zweig), MAJOR
(bei 390 px abgeschnittene Koeffiziententabelle), MAJOR (Deutungsabsatz doppelt
in Widget und Kasten), MINOR (falscher Verweis „dieselbe Funktion weiter
unten"), MINOR (`toExponential`), MINOR (Kasten beschrieb statt zu fragen).

Das Verdikt klassifiziert jetzt natürlich gegen eingespannt: welche beiden
Zeilen die Randbedingung stellt und was an den Enden dadurch frei wird
(Steigung bzw. Krümmung, mit Zahl). Der Nahtsprung bleibt als Readout stehen,
weil er konstruktionsbedingt Rundungsrauschen ist. Tabelle in einem
`overflow-x-auto`-Wrapper, Flex-Kinder mit `min-w-0` (gemessen: Tabelle 356 px
scrollt in 316 px Container statt rechts abgeschnitten zu werden).

*Rationale:* Über die vier Regler und beide Randbedingungen hinweg stand
immer derselbe Satz; die einzige Unterscheidung, die das Widget wirklich
anbietet, war in einen `<p>` daneben ausgelagert.

### S134BSplineBasis.tsx — Kasten 8
Umgesetzt: **CRITICAL** (siehe oben), MAJOR (Verdikt wiederholte nur das
Readout), MAJOR (rohes `<details>` mit dem Cox-de-Boor-Schritt, auf das
sichtbare Prosa verwies), MINOR („1 Funktionen"), MINOR (fehlende Legende).

`CoxDeBoorSchritt` steht jetzt als eigener `:::::vertiefung`-Block auf
MDX-Ebene direkt hinter dem Kasten; die Konsolidierung verweist nicht mehr auf
zugeklappten Inhalt. Inline-Legende für hervorgehobene Funktion, übrige
Basisfunktionen und Summenkurve. Singular/Plural unterschieden.

*Rationale:* Sichtbare Prosa darf nicht von zugeklapptem Inhalt abhängen (A8),
und die Screenshot-Pipeline klappt nur `:::vertiefung` auf. Die vier
Lage-Klassen sagen jetzt jeweils, *warum* dort so viele Funktionen tragen.

### S134CoxDeBoor.tsx — Vertiefung hinter Kasten 8
Umgesetzt: MAJOR (`kind="ok"` fest verdrahtet, x\*-Regler ohne Rückmeldung),
MAJOR (fünf Serien ohne Legende, zwei Rampen optisch identisch), MINOR
(Regler-Klemmung beim Gradwechsel), MINOR (rohes TeX im Verdikt).

Drei Zustandsklassen (Überlappungsbereich beider Nachbarn / nur ein Nachbar
trägt / außerhalb des Trägers) mit den eingesetzten Rampengewichten. Die
beiden Rampen tragen verschiedene Strichmuster (`[9,4]` gegen `[1,4]`), dazu
eine fünfzeilige Inline-Legende. Beim Gradwechsel zieht `setX` mit.

*Rationale:* Die ganze Erklärung beruht darauf, „links wächst, rechts fällt"
auseinanderhalten zu können – bei identischer Farbe und identischem Dash ging
das nicht. Und der x\*-Regler ist die Hauptinteraktion; sein Verdikt darf nicht
konstant sein.

### S134Stoerung.tsx — Kasten 9
Umgesetzt: **CRITICAL** (siehe oben), MAJOR (Flankensatz zustandsunabhängig
behauptet), MAJOR (`warn`-Zweig als Debug-Aufforderung), MINOR (drei
Prosablöcke), MINOR (14 Zeilen nacherzählende Konsolidierung).

Der Balkensatz-Satz ist aus dem statischen Absatz ins Verdikt gewandert und
hängt jetzt an `j` und `delta` (Spitzenindex, ein oder zwei Flanken,
gemessener Abfallfaktor). Der Gegenzustand nennt seinen Grund: Am Gitterrand
hat das Polynom vom Grad 8 wenig Hebel, und das „ferne" Gebiet |x − x_j| > 2
deckt fast das ganze Intervall ab. Per node über alle 9 × 16 Reglerzustände
geprüft: dieser Zweig feuert **genau** bei j = 1 und j = 9. Die beiden Tafeln
stehen wieder nebeneinander (310 statt 330 px je Tafel), die Konsolidierung
im Kasten ist auf drei Sätze gekürzt und um die korrigierte Randaussage
ergänzt.

*Rationale:* Ein Verdikt, das den Leser auffordert, den Zustand zu verlassen,
erklärt nichts – gerade der Randfall ist lehrreich, weil er zeigt, dass
Lokalität eine Aussage über das Innere ist.

**Offen:** MINOR „Besetzungsmuster als eigene statische Figur beim
Bandstruktur-Absatz" (H1, drei Einsichten in einem Widget). Das ist ein Umbau
mit eigener Figur und eigener Kasten-Rahmung, keine lokale Änderung.

### S135Kruemmung.tsx — Kasten 10
Umgesetzt: MAJOR („Minimum bei t = 0" wörtlich vier Zeilen über der
Schätzfrage), MAJOR (vollständige Auflösung vor dem Widget, nichts danach),
MINOR (`bg-white` ohne Dark-Variante), MINOR (zwei Schwellen für denselben
Zustand), MINOR (unvollständige Inline-Legende).

Die Herleitung von J(g_t) = 6 + 2t² steht jetzt im `verdeckt`-Slot, die
Deutung der zweiten Ansicht als Konsolidierung hinter der Schätzfrage.
`deckungsgleich` hängt nur noch am kontrollierten Parameter (`tPromille === 0`)
und steuert zugleich `kind`. Legende um Knoten und Datenpunkte ergänzt.
Neues Skript `…-S135Kruemmung.mjs` rechnet den natürlichen Spline symbolisch
und alle Integrale exakt über Stammfunktionen (das Widget integriert per
Simpson) und deckt damit die bisher unbelegten Header-Aussagen ab.

*Rationale:* Der schwerste Spoiler des Kapitels – die Antwort stand fett im
Satz unmittelbar über der Frage.

### S136Konvergenz.tsx — Kasten 11
Umgesetzt: MAJOR (die „asymptotische 16" in der Kastenprosa), MAJOR
(Faktorspalte und Verdikt sichtbar über dem leeren Eingabefeld), MAJOR (drittes
SVG ohne `width`, 2,18-fach vergrößert), MINOR (acht Zeilen, die den
Interaktionsverlauf vorwegnehmen), MINOR (vier Geviertstriche, zwei davon im
selben Satz).

Faktorspalte und Faktor-Verdikt hängen an `zeigeFaktor={aufgeloest}`; vor dem
Auflösen zeigt das Verdikt nur Schranke, Fehler und Ausschöpfung. Das dritte
SVG hat `width={WK}` und ist jetzt 300 statt 654 px breit (gemessen), also so
groß wie geplant neben seinen 420-px-Geschwistern.

*Rationale:* Die Tabelle mit der Faktorspalte beantwortete die Frage, bevor
sie gestellt war, und die Nebentafel dominierte die Hauptdarstellung.

**Offen:** Die Bemerkung `#wie-wir-die-schranke-lesen` oberhalb des Kastens
nennt den Faktor 16 weiterhin. Der Befundtext lässt das ausdrücklich zu,
solange die Kastenprosa ihn nicht wiederholt; eine vollständige Entkopplung
würde eine Umstellung des ganzen Abschnitts erfordern (Kasten vor die
Bemerkung) und ist Editorial-Entscheidung.

### S137Glaettung.tsx — Kasten 12
Umgesetzt: **CRITICAL** (siehe oben), MAJOR (Preset-Label „passend"
beantwortete die Schätzfrage), MAJOR (klassenlose Knöpfe, 28 px hoch), MAJOR
(vier Absätze Auflösung vor dem Widget), MINOR (`kind` und Textzweig an
verschiedenen Schwellen), MINOR (unlesbare SVG-Bildunterschrift).

Presets heißen jetzt „Sprungmarken: 4 · 11 · 40" und tragen `W_BUTTON` /
`W_BUTTON_AKTIV`; die Wertung steht ausschließlich im Verdikt. Die
Aufgabenzeile nennt keine Wertung mehr. `kind` wird aus demselben Zweigbaum
abgeleitet wie der Text (`passend` → ok, Singulär → fail, sonst warn). Die
Bildunterschrift ist ein DOM-`<p>` unter dem SVG statt 6,7-px-SVG-Text.
Die Auflösungsabsätze stehen hinter dem Widget.

*Rationale:* Die Antwortmöglichkeiten und die Presets standen unmittelbar
übereinander; die Wertung „passend" war die Lösung als Knopfbeschriftung. Die
neuen Labels sind zugleich von den Antwortknöpfen unterscheidbar (geprüft: die
Knopfleiste liest sich als „4 11 40" gegen „K = 4 / K = 11 / K = 40").

### S138BiasVarianz.tsx — Kasten 13
Umgesetzt: MAJOR (vierfacher Spoiler), MAJOR (Grün in zwei Rollen), MAJOR
(drei SVGs ohne `width`, gestapelt entgegen der Prosa), MAJOR (Header-Tabelle
ohne Skript), MINOR (Label-Kollision „x2π"), MINOR (unlesbares Balkenlabel).

Startwert K = 6 statt 12; Ring auf dem MSE-Minimum, die Nennung des Minimums
und die `ok`-Markierung hängen an `zeigeOptimum={aufgeloest}`. Die Zeile
„Minimum bei K = 12" und die zugehörige Tabellenzeile sind aus dem sichtbaren
Text in den `verdeckt`-Slot gewandert; die sichtbare Tabelle nennt jetzt
K = 5, 8, 9, 15, 40 und beschreibt nur noch, dass das Optimum dazwischen
liegt. Alle drei SVGs tragen `width`/`height` (430, 300, 300 statt dreimal
654 gemessen), die Prosa nennt die Tafeln beim Namen statt „rechts/darunter".
Das x-Achsenlabel sitzt jetzt über der Nulllinie statt auf dem „2π"-Tick.
Balkenzahlen stehen außerhalb kurzer Balken und nur in langen Balken hell.

*Rationale:* Die Schätzfrage war in keinem erreichbaren Zustand unbeantwortet;
jetzt ist sie es bis zum Auflösen in jedem.

**Zur Farbrolle (MAJOR, bewusst anders gelöst als vorgeschlagen):** Grün ist
nicht umgefärbt worden. Der Fließtext des Abschnitts schreibt die Varianz
selbst als `\var[\cgreen{\wh f}]` – Grün markiert dort wie im Widget genau
ein Objekt, den Schätzer, und die Varianz ist dessen Streuung. Ein Umfärben
hätte Widget und Text auseinandergezogen, und im Kapitel ist keine Farbe frei
(Violett trägt hier f). Stattdessen: Die Rolle steht jetzt ausdrücklich im
Header, die Beschriftung der Verlaufstafel lautet „MSE (grau) = Bias² (rot) +
Varianz des grünen Schätzers", und die Konsolidierung sagt denselben Satz.
Falls der Dozent dennoch eine eigene Farbe für die Varianz will, ist das eine
Editorial-Entscheidung mit Folgen für die Prosa – siehe unten.

### S139Skalierung.tsx — Kasten 14
Umgesetzt: MAJOR (Tabellenzeile 220 Zeilen über der Schätzfrage enthielt die
Lösung 80 GB), MINOR (unauffälliger Startzustand), MINOR (`kind` an anderer
Bedingung als der Text), MINOR (377-Zeichen-Zeile), MINOR (zwei Absätze vor
dem Widget, keiner danach).

Die Schätzfrage fragt jetzt nach einer Konfiguration, die **nicht** in der
Tabelle steht (K = 20, p = 8 → 204,8 GB); der Toleranzbereich schließt die
80 GB der Tabelle aus, wer sie abschreibt, liegt daneben. Startzustand p = 8
statt p = 5, `kind` aus derselben Speicherschwelle wie der Text, Statustexte
umgebrochen, Beschreibung hinter das Widget. Neues Skript
`…-S139Skalierung.mjs` rechnet K^p exakt über BigInt (das Widget über
`Math.pow`) und liest Lösung und Toleranz aus der MDX-Quelle.

*Rationale:* Die Frage war eine Leseübung an einer Tabelle 220 Zeilen weiter
oben. Die neue Konfiguration verlangt eine Reglerfahrt und trägt zugleich die
Pointe des Abschnitts: eine Variable weniger, dafür doppelt so fein aufgelöst,
kostet mehr, nicht weniger.

---

## Prüfskripte (F1/F6/F8)

Neu unter `scripts/verify/REV29/` (von `npm run verify:numbers` automatisch
erfasst, `run-all.mjs` sammelt rekursiv):

| Skript | deckt | unabhängiger Rechenweg |
|---|---|---|
| `13-funktionsapproximation-S133Monombasis.mjs` | κ₂ für n = 5/10/15/20 in drei Basen, drei Spaltenwinkel, drei Verdikt-Schwellen | einseitige Jacobi-SVD statt Potenzmethode + Inverse |
| `13-funktionsapproximation-S133Runge.mjs` | Fehlertabelle, erste Überschreitung von 1 bei n = 9, Chebyshev bis n = 21 | Newton-Form statt baryzentrisch |
| `13-funktionsapproximation-S134BSplineBasis.mjs` | Lage-Klassen, Partition der Eins, Zweigabdeckung von CoxDeBoor, X_MAX aus der Quelle | aufsteigende Stufenrekursion + dividierte Differenzen abgeschnittener Potenzen |
| `13-funktionsapproximation-S134Stoerung.mjs` | 1,000 / 2,320 / 0,037, Koeffizientenprofil, Besetzungsmuster, Randfälle | Momentenform (Thomas) + baryzentrische Lagrange-Form + Householder-QR |
| `13-funktionsapproximation-S135Kruemmung.mjs` | C²/natürlich/interpolierend, J(s) = 6, J(p) = 8, Kreuzterm 0, J(g_t) auf allen 61 Rastwerten | symbolisch über Stammfunktionen, ohne Quadratur |
| `13-funktionsapproximation-S137Glaettung.mjs` | fünf Header-Zeilen, bester RMS bei K = 11, Zweigabdeckung 2/9/16/10 | rekursive Cox-de-Boor + Householder-QR + Gauss-Legendre |
| `13-funktionsapproximation-S138BiasVarianz.mjs` | sechs Header-Zeilen, Spur(H) = K, Zerlegung, Minimum K = 12, Plateau 12–14 | Householder-QR statt Cholesky, dazu ein analytischer Gegenweg über die Hutmatrix |
| `13-funktionsapproximation-S139Skalierung.mjs` | Beispieltabelle, 204,8 GB, additive Zählformel, Verdikt-Klassen | BigInt-Potenzen statt `Math.pow`, Lösung/Toleranz aus der MDX-Quelle gelesen |

Geändert: `scripts/verify/HDR/verify-hdr.mjs` — die beiden Tautologien sind
ersetzt. `assert.equal(3*4,12)` (S134Konstruktion) baut jetzt die zwölf
Bedingungszeilen wie das Widget auf, setzt die dokumentierten Polynome ein und
prüft per Gauss mit Spaltenpivotierung, dass kein Pivot unter 1e-9 fällt.
`assert.equal(9,9)` (S134Stoerung) zählt die 81 Nichtnullen der
9 × 9-Vandermonde-Matrix und hält sie gegen höchstens 4 je
B-Spline-Kollokationszeile. Zeile 7 (Kapitel 10) blieb unberührt.

Tote Skriptpfade in Headern, deren Widgets ohnehin angefasst wurden, sind
umgestellt: `gen-noise-s141.mjs`, `verify-values.mjs`, `check-math-s141.mjs`,
`check-s143.mjs`, `check2-s143.mjs`, `check3-s143.mjs`, `s151.mjs`,
`s153.mjs`, `s154.mjs`, `s155.mjs`, `check-s153-widget.mjs` — alle elf
Nennungen zeigen jetzt auf existierende Skripte.

---

## lib-Befunde (nicht gefixt, `src/lib` ist tabu)

1. **`Schaetzfrage.tsx:287` rendert `children` in beiden Phasen.** Im Kapitel
   über die Render-Prop-Variante gelöst: die vier betroffenen Widgets bekommen
   ein `zeige…`-Flag aus `aufgeloest`. Eine Hüllen-Option „children erst nach
   dem Auflösen" gäbe es billiger, gehört aber in den lib-Lauf.
2. **Die dokumentierte Render-Prop-Schreibweise ist in MDX nicht benutzbar.**
   `Schaetzfrage.tsx:25-34` zeigt
   `<Schaetzfrage …>{({aufgeloest}) => <X/>}</Schaetzfrage>`; das
   `remark-fmm`-Lint „keine freien Ausdrücke im Fließtext"
   (`mdx/remark-fmm.mjs:744-757`) weist genau diese Form zurück. In MDX
   funktioniert nur `children={({ aufgeloest }) => <X/>}` als Attribut. Der
   Doc-Kommentar sollte das nachziehen.
   **Hinweis an den Orchestrator:** `src/chapters/12-optim/S121.mdx:869` (nicht
   mein Scope) benutzt aktuell die kompilierende-nicht-Form; die Datei bricht
   den MDX-Build ab.
3. `src/chapters/numbers.generated.json` ist im Arbeitsverzeichnis geändert.
   Der Diff enthält ausschließlich `"line"`-Felder (auch für Kapitel 02, 07,
   08, 11), keine geänderte Nummer oder Bezeichnung; das ist die
   Neugenerierung durch die laufenden Dev-Server, nicht eine inhaltliche
   Änderung.

## Entscheidung nötig

- **STATIC/REMOVE:** In Kapitel 13 gab es keine solchen Verdikte, und ich habe
  auch keine erwogen. Alle 16 Komponenten tragen ihre Leitersprosse.
- **Farbe der Varianz in S138** (siehe oben): beibehalten mit ausdrücklicher
  Rollendeklaration statt umgefärbt. Wenn eine eigene Farbe gewünscht ist,
  muss auch die Prosa mitziehen, die die Varianz heute über
  `\var[\cgreen{\wh f}]` grün führt.
- **H3, die wahre Funktion f:** grau in S131DreiProbleme und S133Runge,
  violett in S136/S137/S138. Eine kapitelweite Festlegung ist sinnvoll, aber
  eine Editorial-Entscheidung über fünf Widgets und ihre Legenden hinweg.
- **H4, Selbsttest:** 13.3, 13.5, 13.6 und 13.8 haben keine widget-abhängige
  Quizfrage. Je eine Frage zu ergänzen ist Inhaltsarbeit, kein Fix.
- **H1, S134Stoerung** bündelt drei Einsichten; das Besetzungsmuster wäre eine
  eigene statische Figur beim Bandstruktur-Absatz.

## Browser-Nachweis

Eigener Dev-Server auf Port 4186 (Preview 4179 zeigt den alten Build), CDP
9333, Muster aus `scripts/dev/shot-widgets.mjs`; Server nach dem Lauf beendet,
alle geöffneten Targets geschlossen.

- **1300 px und 390 px:** 14 Kästen, `merror` = 0,
  `documentElement.scrollWidth` = `window.innerWidth` (1300 bzw. 415), keine
  Elemente mit `overflow-x: visible`, die über ihren Container hinauslaufen
  (außer den unsichtbaren MathJax-`<math>`-Knoten).
- **S131DreiProbleme:** bei 390 px drei Tafeln 210 × 151 untereinander
  (Reihe 316/316 statt vorher 662/316), bei 1300 px nebeneinander.
- **S134Konstruktion:** Koeffiziententabelle 356 px scrollt im 316-px-Container
  statt am Kastenrand abgeschnitten zu werden.
- **S136/S138:** Nebentafeln jetzt 300 px statt 654 px.
- **S134Stoerung:** beide Tafeln wieder nebeneinander (310 px @ x = 456 und 782).
- **S137:** Preset-Knöpfe mit Rahmen, 30 px hoch, Beschriftung „4 · 11 · 40",
  von den Antwortknöpfen „K = 4 / K = 11 / K = 40" unterscheidbar.
- **Schätzfragen (alle sieben), Sequenz vor und nach dem Auflösen:** vor dem
  Tippen enthält kein Kasten mehr die Lösung (geprüft auf „0,75"/„0,7499",
  „Minimum bei t", „16,91", „passend", „K = 12", „80 GB"); nach Eingabe und
  Klick erscheinen `verdeckt`-Inhalt, Faktorspalte (S136), Fehlerkurve (S133),
  MSE-Ring (S138, `circle[fill=none]` von 0 auf 1) und das
  Vergleichs-Verdikt.
- **S134BSplineBasis, Reglersequenz:** x\* = 0 → „Linker Rand", x\* = 3 → „Auf
  einem Knoten", x\* = 4,95 (Maximum) → „Im Intervallinneren, genau 4 von 8";
  der widersprüchliche Zustand bei x\* = 5 ist nicht mehr erreichbar.
