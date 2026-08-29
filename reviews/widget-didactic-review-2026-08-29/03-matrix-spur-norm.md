# Kapitel 3 — Widget-Didaktik-Review (2026-08-29)

Nenner aus dem Quellbaum: **11 Widget-Dateien** (`src/chapters/03-matrix-spur-norm/widgets/`),
davon **7 echte Widgets** und **4 identische Kopien derselben Selbsttest-Hilfskomponente**;
**6 MDX-Abschnitte**, **7 `:::interaktiv`-Kästen**. Beide Pässe durchgeführt: alle elf
Dateien vollständig gelesen; Rendering bei 1300 px und 390 px selbst erzeugt und je Widget
eine Zustandssequenz durchgefahren — Regler von min über die kritische Stelle bis max,
jeder Preset einmal, Drag-Ziel an eine Extremlage, Schätzfrage vor und nach dem Auflösen.
Schüsse: `ix/03/03w0-a…f`, `03w1-a…e`, `03w2-a…c`, `03w3-a…e`, `03w4-a…d`, `03w5-a…d`,
`03w6-a…f`, `03m-*` (390 px). merror = 0, kein horizontaler Überlauf in keinem der sieben
Kästen bei 390 px (`scrollWidth == clientWidth == 348`).

**F1/F6-Überblick:** *Keine* der elf Dateien zitiert ein Prüfskript unter
`scripts/verify/`. Die sieben Widgets tragen den Header „historische Notiz … derzeit nicht
reproduzierbar nachgewiesen", die vier Hilfskomponenten zitieren `verify-hdr.mjs`, das
über sie nichts aussagt. Ich habe die Kernzahlen stichprobenartig nachgerechnet — die
Singulärwerte 2,288246 / 0,874032, κ = 2,618, ‖A‖₁ = 2, ‖A‖∞ = 3, die Winkelstelle 31,7°,
√10 = 3,162278 als Nuklearnorm, ‖x‖ = 2,1 / 1,5 / 1,2 und die Volumina 4/3, 4π/3, 8 sind
**alle korrekt**. Nachgewiesen ist keine.

---

## S31SpurWidget.tsx (Abschnitt 3.1, `:::interaktiv[Was macht ein Eintrag neben der Diagonale …]`)

S31SpurWidget — **KEEP** — Regler auf der Nebendiagonale als kontinuierlicher Hauptweg,
Matrixeingabe als Präzisionsweg, vier Voreinstellungen, die tatsächlich die
Fallunterscheidung sind (reell / doppelt / defekt / komplex — alle vier in der Sequenz
erreicht); das Verdikt schaltet in allen vier Fällen um und nennt jeweils den
mathematischen Grund, nicht nur die Zahl.

- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S31SpurWidget.tsx:109-111` —
  `doppelt` wird über `Math.abs(e.l1 - e.l2) < 1e-9` bestimmt, also über eine Toleranz auf
  einem *abgeleiteten* Float, und das Verdikt verkauft das als Gleichheit („Hier fallen
  beide Eigenwerte auf 2,00 zusammen", `:326`). Die Schwelle liegt zwar auf
  Rundungsrauschniveau, sodass praktisch kein echt getrenntes Paar falsch etikettiert wird
  — aber die dritte Zustandsklasse fehlt: Bei einer über die Matrixeingabe erzeugten,
  fast entarteten Matrix (Diskriminante klein, aber ungleich null) sagt das Widget
  kommentarlos „zwei getrennte Punkte", obwohl das die didaktisch interessante
  Zwischenlage ist. Fix: die exakte Entartung über die *kontrollierte* Größe
  `(a₁₁ − a₂₂)² + 4·a₁₂·a₂₁ === 0` erkennen und einen Zweig „fast zusammengefallen: die
  Eigenwerte reagieren hier extrem empfindlich auf die Einträge" ergänzen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S31SpurWidget.tsx:250-275` (gerendert:
  `ix/03/03w0-f-doppelt.png`) — Fallen die Eigenwerte zusammen, werden beide Kreise und
  beide Beschriftungen exakt übereinander gezeichnet; sichtbar bleibt nur „λ₂", λ₁
  verschwindet darunter. Der Leser sieht einen einfachen Eigenwert, während das Verdikt von
  einem doppelten spricht (G6). Fix: bei `doppelt` eine gemeinsame Beschriftung
  „λ₁ = λ₂" setzen und den Kreis mit doppeltem Rand zeichnen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S31SpurWidget.tsx:125-130,232-234`
  vs. `:134-137` (gerendert: `ix/03/03w0-d-komplex.png`) — Die Aufgabenzeile sagt
  „behalten wir dabei das Ende der blauen Summenleiste im Auge". Bei der Voreinstellung
  „Drehung um 90°" sind beide Realteile 0, beide Pfeile der Summenleiste haben Länge null,
  und die Leiste ist als Objekt verschwunden; gleichzeitig kollidieren die grüne
  „tr = 0,00"-Beschriftung und das λ₂-Label auf der Imaginärachse. Die Handlung, zu der die
  Aufgabe auffordert, geht in genau dem Preset ins Leere, der die interessanteste Aussage
  trägt (C8/G6). Fix: bei Länge null einen Marker statt eines Pfeils zeichnen und die
  tr-Beschriftung nach oben ausweichen lassen, wenn sie näher als ~20 px an einem
  Eigenwert liegt.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S31SpurWidget.tsx:315` — Für den
  komplexen Fall setzt das Verdikt `kind="warn"` (Zeichen „!", orange Kante). Komplexe
  Eigenwerte sind hier aber kein Problemfall, sondern eine der vier gleichberechtigten
  Lagen; das Warnzeichen suggeriert einen Fehler (E3/D1). Fix: `kind="neutral"`.
- [MINOR] `src/chapters/03-matrix-spur-norm/S31.mdx:282,332` — `[nächsten Abschnitt](#sec-3.2)`
  hartcodiert (zweimal). `src/chapters/03-matrix-spur-norm/S31.mdx:58,275` —
  nummernkodierte IDs `#beispiel-3-1-3`, `#bemerkung-3-1-9`.
- [NOTE] `src/chapters/03-matrix-spur-norm/S31.mdx:244-256` — Frage davor, Widget,
  Konsolidierung danach, alles im Kasten, drei Sätze; dazu eine widgetabhängige
  Selbsttestfrage (`:357-366`, „defekt (Jordan)" → 4). Das ist die Sollstruktur der Rubrik
  und im ganzen Kapitel die sauberste Umsetzung.

## S32NormBallWidget.tsx (Abschnitt 3.2, `:::interaktiv[Auffrischung: Was misst die Norm …]`)

S32NormBallWidget — **REVISE** — Direktmanipulation von x im Bild mit vollem Doppelpfad,
p-Regler mit `p = ∞`-Kästchen, 2D-Tafel als tot lesbare Hauptdarstellung und 3D-Tafel
daneben (D7 korrekt) — aber die vorangestellte Schätzfrage lässt sich mit dem Widget
nicht beantworten, und im Bereich p < 1 zerfällt die 3D-Fläche.

- [MAJOR] `src/chapters/03-matrix-spur-norm/widgets/S32NormBallWidget.tsx:344-358` und
  `:178-181` — Die `Schaetzfrage` fragt nach dem **Volumenverhältnis** von Würfel und
  Oktaeder im ℝ³. Im Widget gibt es keinen einzigen Volumenwert, keinen Regler, der
  Volumen sichtbar macht, und keine Vergleichsdarstellung; die Aufgabenzeile schickt den
  Leser stattdessen in eine ganz andere Handlung („Ziehen wir x im Bild umher und schieben
  wir danach p von 0,5 bis 6 durch"). Die Antwort erscheint beim Auflösen als
  Behauptungssatz im Verdikt (`:324-332`). Damit ist der Tipp reines Raten und das Widget
  hält seine eigene Frage nicht (C8, A3, Pflicht 1). Fix: entweder die Frage auf etwas
  Ablesbares umstellen (z. B. „Wie groß ist ‖x‖ für p = ∞ bei x = (−1,2; 0,9)?", was der
  Selbsttest ohnehin abfragt) — oder eine Volumenzeile ergänzen, die mit p mitläuft
  (numerisch integriert oder in geschlossener Form über die Gammafunktion), dann wird der
  Vergleich zur Ablesehandlung.
- [MAJOR] `src/chapters/03-matrix-spur-norm/widgets/S32NormBallWidget.tsx:113-137`
  (gerendert: `ix/03/03w1-b-p05.png`) — Für p < 1 zerfällt die `Surface3D`-Fläche in ein
  schwarzblaues Nadelbüschel; von der „nach innen gebeulten" Gestalt ist im Raum nichts zu
  erkennen, obwohl die 2D-Tafel daneben den Stern korrekt zeigt. Der Steilheitsabbruch in
  `:125` ist ausdrücklich auf p > 1 beschränkt („für p ≤ 1 läuft die Fläche flach in den
  Boden"), was für p < 1 gerade nicht gilt: Dort steht die Fläche an den Achsen senkrecht.
  Der Selbsttest (`S32.mdx:294-299`) schickt den Leser genau in diesen Bereich (G6).
  Fix: den Abbruch auch für p < 1 aktivieren (Steilheitskriterium symmetrisch formulieren)
  oder das 3D-Panel für p < 1 durch einen Hinweis ersetzen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S32NormBallWidget.tsx:306-317` — Im
  Zweig p < 1 wird ‖x‖ überhaupt nicht mehr angezeigt; der Leser verliert beim
  Durchschieben des Reglers genau die Zahl, um die es geht (D3). Fix: die Zeile
  „‖x‖_p = …" vor die Fallunterscheidung ziehen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S32NormBallWidget.tsx:300-303` — Die
  Bildunterschrift der 3D-Tafel sagt „genau die blaue Kurve **links**"; bei 390 px steht
  die 2D-Tafel darüber, nicht links (`ix/03/03m-w1.png`). Siehe H-Fazit, das betrifft
  mehrere Widgets. Fix: „in der Tafel daneben" bzw. „in der anderen Tafel".
- [NOTE] `src/chapters/03-matrix-spur-norm/widgets/S32NormBallWidget.tsx:163-174` — Die
  Gestaltklassifikation (`Math.abs(p - 1) < 0.03` usw.) liest den **kontrollierten**
  Parameter p ab, nicht ein abgeleitetes Ergebnis. Genau so verlangt es die
  Drei-Zustands-Regel; bitte als Muster für die anderen Widgets nehmen.

## S32VecNormWidget.tsx (Abschnitt 3.2, `:::interaktiv[Frobenius-, Summen- und Maximumsnorm …]`)

S32VecNormWidget — **KEEP** — Presets, die die Fallunterscheidung sind, ein Tauschknopf,
der die Blindheit zur Handlung macht, und drei live substituierte Formelzeilen in den
Farben der Prosa. MathJax setzt bei jeder Zustandsänderung korrekt neu
(`ix/03/03w2-c-getauscht.png`).

- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S32VecNormWidget.tsx:88,154-156` —
  `singulaer = |det| < 1e-9`, und das Verdikt sagt „Diese Matrix ist singulär". Die
  Matrixeingabe erlaubt beliebige Werte; eine fast singuläre Matrix (det = 0,001) fällt
  kommentarlos in den regulären Zweig, obwohl die schlechte Kondition genau das ist, was
  in @sec:eigenschaften folgt. Fehlende dritte Zustandsklasse (F3). Fix: Zweig „nahezu
  singulär (schlecht konditioniert)" mit einer an σ₂/σ₁ orientierten Schwelle.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S32VecNormWidget.tsx:24-27` vs.
  `src/chapters/03-matrix-spur-norm/S32.mdx:218-224` — Der Header beruft sich darauf, dass
  Blau/Orange/Violett dieselben Rollen wie im Fließtext tragen. Für die *Normen* stimmt
  das; im selben Abschnitt trägt Blau aber im Beispiel „Gleiche Frobenius-Norm, völlig
  verschiedene Abbildungen" die Matrix $\cblue{\bA_2}$. Blau hat damit auf einer
  Bildschirmseite zwei Rollen (E1). Fix: entweder A₁/A₂/A₃ im Beispiel unfarbig lassen
  (sie sind durch Indizes unterscheidbar) oder im Header die Kollision benennen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S32VecNormWidget.tsx:137` —
  `href="#sec-3.3"` hartcodiert, während der Linktext korrekt über
  `ref("sec:matrix-spur-norm/operatornormen")` läuft.
- [MINOR] `src/chapters/03-matrix-spur-norm/S32.mdx:193-196` vs.
  `src/chapters/03-matrix-spur-norm/widgets/S32VecNormWidget.tsx:130-141` — Die
  Konsolidierung wiederholt das Verdikt fast wörtlich („Alle drei Normen sehen nur die
  Multimenge der Einträge, nicht ihre Anordnung" ≈ „Als Abbildung ist das eine andere
  Matrix, für die Vektorisierungsnormen dieselbe"). H6. Fix: die Konsolidierung auf den
  Schritt nach vorn kürzen („Deshalb braucht es Normen, die die *Abbildung* messen").
- [NOTE] Das Widget ist rein numerisch/symbolisch; die entscheidende Behauptung („als
  Abbildung eine völlig andere Matrix") wird behauptet, nicht gezeigt. Ein kleines
  Einheitskreis-Bild neben der Matrix (dieselbe Tafel wie in 3.3, nur ohne Regler) würde
  dieselbe Einsicht sichtbar statt nur lesbar machen. Kein Defekt, aber die stärkste
  Verbesserungsmöglichkeit des Abschnitts.

## S33Local.tsx (Abschnitt 3.3, `<SelbsttestFrage />` ×2)

SelbsttestFrage — **KEEP** — funktionierendes `details`/`summary`-Muster.

- Siehe den Sammelbefund „vier identische Kopien" am Ende des Kapitels.

## S33OperatornormWidget.tsx (Abschnitt 3.3, `:::interaktiv[Wie schwankt der Streckfaktor …]`)

S33OperatornormWidget — **KEEP** — Das beste Widget des Kapitels: x wird direkt auf dem
Einheitskreis gezogen (`dragConstraint: "unitCircle"`), der Winkelregler ist der
Doppelpfad, die Matrixeingabe der Präzisionsweg, und zwei verknüpfte Darstellungen
(Kreis/Ellipse und Streckfaktorkurve über dem Winkel) bewegen sich gemeinsam. Erfolg auf
der eingebetteten Aufgabe wird erkannt (`getroffen`, `:141`) und im Verdikt quittiert. Die
vier Presets sind die Fallunterscheidung; alle Zweige in der Sequenz erreicht.

- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S33OperatornormWidget.tsx:139-142` —
  `singulaer = smin < 1e-9` und das Verdikt setzt „σ₂ = 0". Der Preset „singulär"
  ([[1,2],[0,5;1]]) ist exakt singulär, insofern trifft die Aussage dort zu. Es fehlt aber
  die mittlere Klasse: Eine über die Matrixeingabe leicht gestörte Matrix (σ₂ = 0,004)
  landet im generischen Zweig, obwohl gerade dort die Konditionszahl explodiert, die das
  Verdikt im singulären Fall erwähnt (`:258-262`). Fix: Zweig „schlecht konditioniert:
  σ₂ ist winzig, aber nicht null; κ₂(A) = … " mit einer Schwelle auf σ₂/σ₁.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S33OperatornormWidget.tsx:252-263`
  (gerendert: `ix/03/03w3-e-sing-max.png`) — Die Verdiktart wird nach `getroffen` gewählt,
  der Verdikttext aber nach `art`. Beim Preset „singulär" in der Maximalrichtung steht
  deshalb ein grünes „Passt ✓" über einem Text, der von einer entarteten Ellipse spricht,
  und die Erfolgsquittung („Getroffen: In dieser Richtung nimmt der Streckfaktor sein
  Maximum an") entfällt in genau den beiden Sonderfällen (D4). Fix: die Erfolgsmeldung als
  eigenen ersten Satz vor die Fallunterscheidung ziehen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S33OperatornormWidget.tsx:96` — Der
  erste Preset trägt als Beschriftung eine nackte Querverweisnummer („Beispiel 3.3.3",
  gerendert in `ix/03/03w3-a-start.png`). C4 verlangt den *didaktischen* Namen; die drei
  anderen Presets („Drehung", „zehnfach", „singulär") machen es richtig. Fix: „schiefe
  Streckung" o. Ä., Verweis in den `title`.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S33OperatornormWidget.tsx:259` —
  `href="#sec-3.5"` hartcodiert.
- [MINOR] `src/chapters/03-matrix-spur-norm/S33.mdx:113-124` — Die Konsolidierung ist fünf
  Sätze lang (H6) und spielt beide Sonderfälle bereits durch („Bei der Drehung ist die
  Kurve eine Waagrechte …; bei der singulären Matrix fällt die Kurve irgendwo auf null").
  Damit ist der Ertrag von zwei der vier Presets vorweggenommen, bevor der Leser sie
  drückt (C7). Fix: auf die ersten drei Sätze kürzen, die Sonderfälle den Presets und
  ihren Verdikten überlassen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S33OperatornormWidget.tsx:266` — Der
  isotrope Verdikttext sagt „Die Kurve **rechts** ist eine Waagrechte"; bei 390 px liegt
  sie darunter (`ix/03/03m-w3.png`). Siehe H-Fazit.

## S34Local.tsx (Abschnitt 3.4, `<SelbsttestFrage />` ×2)

SelbsttestFrage — **KEEP** — siehe Sammelbefund am Kapitelende.

## S34SchattenWidget.tsx (Abschnitt 3.4, `:::interaktiv[Was überlebt eine Drehung? …]`)

S34SchattenWidget — **KEEP** — Der Drehregler ist für eine Einparameterfamilie der
richtige Hauptweg, und die Invarianzmessung über den *bisher durchfahrenen* Bereich
(`:114-144`) ist eine originelle und ehrliche Idee: Sie beziffert die Abweichung, statt sie
zu behaupten, und nennt sie beim Namen („das ist Rundungsrauschen, keine Änderung",
`:325-326`) — genau die Sprache, die die Drei-Zustands-Regel verlangt. Verdikt, Tabelle
und Bild stimmen mit den Selbsttestwerten überein (bei 45° Summennorm 4,243, Maximumsnorm
1,414, Abweichung 0,586; nachgemessen in `ix/03/03w4-b-45.png`).

- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S34SchattenWidget.tsx:201-204` — Die
  Aufgabenzeile sagt „vergleichen wir, welche der Zahlen **rechts** sich mitbewegen"; bei
  390 px stehen die Zahlen unter dem Bild. Siehe H-Fazit.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S34SchattenWidget.tsx:108-113` — Das
  Widget bietet keine Voreinstellungen für A, nur die Matrixeingabe. Die Fallunterscheidung
  des Abschnitts (allgemeine Matrix / symmetrische Matrix / Orthogonalmatrix, bei der auch
  Summen- und Maximumsnorm zufällig stillstehen) muss der Leser selbst tippen (C4). Fix:
  drei Presets, u. a. eine Orthogonalmatrix als didaktischer Gegenfall.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S34SchattenWidget.tsx:35-42` —
  „historische Notiz" ohne Skript, obwohl die Behauptung „größte Abweichung 8,88e−16 über
  θ ∈ [0°, 360°] in 1°-Schritten" ein exakt so schreibbares Prüfskript ist (die Schleife
  steht bereits in `:128-144`). Fix: `scripts/verify/S34Schatten.mjs` mit genau dieser
  Schleife und `assert.ok(abw < 1e-14)` sowie `assert.ok(abwElement > 0.5)`.
- [NOTE] `src/chapters/03-matrix-spur-norm/S34.mdx:289-301` — Frage davor, Konsolidierung
  danach im Kasten, zwei widgetabhängige Selbsttestfragen (`:330-347`). Sollstruktur.

## S35Aequivalenz.tsx (Abschnitt 3.5, `:::interaktiv[Wie scharf sind die Äquivalenzkonstanten?]`)

S35AequivalenzWidget — **KEEP** — Der Punkt (σ₁, σ₂) wird im zulässigen Keil gezogen,
beide Regler liegen auf derselben Zustandsquelle, und der `clamp` hält σ₂ ≤ σ₁ (F3:
entartete Zustände sind wegkonstruiert statt nachträglich abgefangen). Die
Entartungsabfragen (`:104-105`) lesen die **kontrollierten** Größen σ₁, σ₂ mit Rasterweite
0,05 ab, treffen die Ränder also exakt — vorbildlich. Der Quotientenbalken auf der Skala
[1, √2] macht die Schärfe der Schranke zu einer Ablesehandlung.

- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S35Aequivalenz.tsx:190-213` — Die
  beiden Randbeschriftungen im Bild („σ₁ = σ₂: rechte Schranke scharf", „σ₂ = 0: linke
  Schranke scharf") stehen von Anfang an da und nehmen das Ergebnis vorweg, zu dem die
  Aufgabenzeile (`:114-117`) den Leser erst hinziehen will. Die Anfangsfigur ist damit tot
  lesbar (B1 ✓), enthält aber schon die ganze Pointe (Muster 11, Warnzeichen „die
  entscheidende Einsicht ist im Anfangsbild vollständig sichtbar"). Fix: die Randlabels
  neutral halten („σ₁ = σ₂" / „σ₂ = 0") und die Schärfe dem Verdikt überlassen, das sie
  ohnehin nennt.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S35Aequivalenz.tsx:40-47` —
  „historische Notiz" ohne Skript; die Claims (Quotient läuft von 1 bis √2, Preset
  (1,6; 0,8) → 1,118034) sind drei Zeilen Prüfcode. Fix: `scripts/verify/S35Aequivalenz.mjs`.
- [NOTE] `src/chapters/03-matrix-spur-norm/S35.mdx:123-137` — Frage davor („Sind die
  Konstanten nur bequeme Abschätzungen …?"), Konsolidierung danach im Kasten (`:132-137`),
  widgetabhängige Selbsttestfrage (`:539-548`). Sollstruktur.

## S35Local.tsx (Abschnitt 3.5, `<SelbsttestFrage />`)

SelbsttestFrage — **KEEP** — siehe Sammelbefund am Kapitelende.

## S35SubmultWidget.tsx (Abschnitt 3.5, `:::interaktiv[Gilt ‖AB‖ ≤ ‖A‖·‖B‖ für jede Matrixnorm?]`)

S35SubmultWidget — **REVISE** — Der geseedete Würfelknopf mit dem ausdrücklichen Hinweis,
dass alle Leser dieselbe Folge sehen (`:296-300`), ist genau die Ehrlichkeit, die Pflicht 5
fordert, und der Rahmen (Auflösen schaltet auf die Maximumsnorm um, `:326`) ist klug
gebaut. Zwei Dinge stehen dagegen: ein Verdikt, das in einem erreichbaren Zustand eine
falsche Aussage macht, und ein dreifach vorweggenommener Spoiler.

- [CRITICAL] `src/chapters/03-matrix-spur-norm/widgets/S35SubmultWidget.tsx:287-294`
  (reproduziert in `ix/03/03w6-f-luftfall.png`) — Der Zweig „Erfüllt, mit Luft" wählt
  seinen Begründungssatz über `norm.art === "operator" ? … : …`, kennt also nur zwei
  Fälle, obwohl `NORMS` drei Arten führt (`:72-104`, u. a. `art: "elementweise"`). Wählt
  man die **Maximumsnorm** und ein Paar, für das die Ungleichung strikt gilt (z. B.
  A = diag(1, 0), B = diag(0, 1), zwei Klicks plus vier Eingaben), steht dort:
  „Erfüllt, mit Luft: 0,000 ≤ 1,000 … **Für die Schattennormen halten wir das Resultat in
  Abschnitt 3.5.2 ohne Beweis fest.**" Die Maximumsnorm ist weder Operator- noch
  Schattennorm, und der ganze Abschnitt lebt davon, dass für sie **kein** solches Resultat
  gilt. Das Widget schreibt der Norm, deren Gegenbeispiel es gerade vorführt, einen Satz
  zu, der sie nicht abdeckt — und der Satz ist obendrein grammatisch unvollständig. Fix:
  dritten Zweig für `art === "elementweise"` ergänzen: „Hier gilt die Ungleichung zufällig
  — für die Maximumsnorm garantiert sie niemand; ein Gegenbeispiel liegt einen Klick
  entfernt (Einsermatrix)."
- [MAJOR] `src/chapters/03-matrix-spur-norm/widgets/S35SubmultWidget.tsx:181-184`,
  `:215` und `src/chapters/03-matrix-spur-norm/S35.mdx:223-225` — Die Auflösung der
  Schätzfrage („es gibt Normen, die sie reißen") steht **dreifach** sichtbar da, bevor
  der Leser tippt (`ix/03/03w6-a-start.png`): (a) die Aufgabenzeile „suchen wir ein Paar
  A, B, für das der Balken über die 1 hinausschießt" setzt die Existenz eines
  Gegenbeispiels voraus; (b) der Preset-Knopf heißt „Einsermatrix (Beispiel 3.5.7)" und
  benennt damit das Gegenbeispiel; (c) die Konsolidierung im selben Kasten sagt es
  wörtlich: „Es gibt sie, die Norm, die aus der Reihe tanzt, und es ist die elementweise
  Maximumsnorm." Fix: Aufgabenzeile vor dem Auflösen auf „Wählen wir eine Norm und
  probieren wir Paare durch: Bleibt der Balken immer links von der 1?" umstellen (und erst
  danach auf die Suchformulierung wechseln), den Preset-Knopf bis zum Auflösen
  „Einsermatrix" ohne Verweis nennen, und den Konsolidierungssatz in `verdeckt={…}` legen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S35SubmultWidget.tsx:158,280-286` —
  `scharf` wird über `nAB >= rhs * (1 - 1e-9)` bestimmt, das Verdikt sagt dann „Hier steht
  Gleichheit". Bei den Zufallspaaren liegt der Quotient laut Header stellenweise bei
  1,0000 (`:25-26`) — ob das exakt oder nur toleranzgleich ist, unterscheidet das Widget
  nicht (F3). Fix: die Formulierung auf „auf Anzeigegenauigkeit gleich" abschwächen oder
  Gleichheit nur für die kuratierten Fälle behaupten.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S35SubmultWidget.tsx:21-28` — Die
  „historische Notiz" behauptet Kennzahlen über die **40 Seeds** des Würfelknopfs
  (größter Quotient je Norm), und die Selbsttestfrage (`S35.mdx:561-568`) sowie das
  Verdikt (`:291`) berufen sich darauf („über die Zufallspaare dieses Widgets bleibt der
  Quotient in dieser Norm stets unter 1"). Das ist eine überprüfbare Aussage über den
  gesamten erreichbaren Zufallsraum ohne jeden Nachweis (F1/F8). Fix: ein Skript, das
  `mulberry32(seed * 7919)` für seed = 1…40 durchspielt und je Norm das Maximum asserted —
  es steht schon fast im Header.
- [NOTE] `src/chapters/03-matrix-spur-norm/widgets/S35SubmultWidget.tsx:162-175,296-300` —
  Geseedeter Zufall statt `Math.random`, Neuziehen nur per Knopf, und der Hinweis, dass
  alle Leser dieselbe Folge sehen. F2 mustergültig erfüllt; die Selbsttestfrage in
  `S35.mdx:561-568` macht die Determiniertheit sogar zum Prüfstoff.

## S36Local.tsx (Abschnitt 3.6, `<SelbsttestFrage />`)

SelbsttestFrage — **KEEP** — siehe Sammelbefund. Abschnitt 3.6 ist die Zusammenfassung und
enthält bewusst kein Widget (Bauauftrag: „schlank halten"); H1 dadurch nicht verletzt.

## Sammelbefund: vier Kopien derselben Komponente

- [MAJOR] `src/chapters/03-matrix-spur-norm/widgets/S33Local.tsx:21-33`,
  `S34Local.tsx:23-33`, `S35Local.tsx:23-33`, `S36Local.tsx:26-38` — Vier Dateien
  exportieren dieselbe Komponente `SelbsttestFrage`; S33Local, S34Local und S35Local sind
  in ihrem Implementierungsteil **zeichengleich**, S36Local unterscheidet sich nur durch
  `<div>` statt `<li>` und ein `space-y-2`. Alle vier sind zudem Kopien von
  `src/chapters/01-intro/widgets/S11Widgets.tsx:18-30` — zusammen fünf Exemplare desselben
  Codes im Repo (G5: Bibliothekskomponenten wiederverwenden statt nachbauen). Alle vier
  tragen hartcodierte Slate-Klassen statt `surface.ts` und decken die
  `.w-dark`-Oberfläche nicht ab (H5). Fix: eine Lib-Komponente
  `src/lib/widgets/SelbsttestFrage.tsx` mit einem `as`-Prop für `li`/`div`; die fünf
  Kopien löschen.
- [MINOR] `src/chapters/03-matrix-spur-norm/widgets/S33Local.tsx:7`, `S34Local.tsx:7`,
  `S35Local.tsx:7`, `S36Local.tsx:7` — Alle vier Header zitieren „Geprüft mit
  verify-hdr.mjs, 2026-08-20"; das Skript (`scripts/verify/HDR/verify-hdr.mjs`) prüft
  ausschließlich S101 und S141–S144 und sagt über diese Dateien nichts. Fix: Zeile
  streichen.

## Kapitel-Fazit (H1–H6)

**H1 Widget-Dichte:** Sieben Kästen auf sechs Abschnitte; 3.2 und 3.5 haben je zwei, und in
beiden Fällen sind es zwei verschiedene Fragen (3.2: Vektornorm-Auffrischung vs.
Vektorisierungsnormen; 3.5: Äquivalenzkonstanten vs. Submultiplikativität). 3.6 hat
keins. Angemessen, kein Befund.

**H2 Dramaturgie:** Sauber aufsteigend — Spur (eine Zahl) → Vektornorm-Auffrischung →
elementweise Matrixnormen und ihr blinder Fleck → Operatornorm als Maximum über Richtungen
→ Schattennormen und Invarianz → Eigenschaften. Jedes Widget setzt genau eine Mechanik
frei, keine Sandbox vorweg. Das ist die stärkste Kapitelstruktur der drei geprüften.

**H3 Farbrollen:** Alle sieben Widgets berufen sich im Header auf dieselbe
„Kapitel-3-Tabelle" (grün elementweise Größen · blau Eigen-/Singulärwertwelt und Bild
unter A · rot das angefasste Objekt bzw. σ₁ · orange skalierte Kugel/Summennorm · violett
Maximumsnorm · grau Achsen und Urbild) und sagen jeweils ausdrücklich, welche Farben
*unbelegt* bleiben. Das ist die beste Farbrollen-Dokumentation im Repo. Ein Riss:
Blau trägt in 3.2 gleichzeitig „Frobenius-Norm" (Widget) und „Matrix A₂" (Prosabeispiel).

**H4 Selbsttest-Abdeckung:** Jeder Abschnitt schließt mit Fragen, und in **jedem
Abschnitt mit Widget** ist mindestens eine nur mit dem Widget zu beantworten (3.1: Jordan
→ 4; 3.2: p = ∞ → 1,2; 3.3: „zehnfach" → 22,882 und der Fehlschluss zur singulären Matrix;
3.4: Nuklearnorm bei 90° → 3,162; 3.5: Quotient √2 bzw. 2). Zusätzlich prüft 3.5 sogar die
Determiniertheit des Zufallsgenerators ab. Vorbildlich.

**H5 Ältere Generation:** Die vier `*Local.tsx`-Dateien sind Migrationsreste vor
`surface.ts` und untereinander (und mit Kapitel 1) redundant. Die sieben echten Widgets
sind durchgehend auf dem aktuellen Stand: `viewBox` + `max-w-full h-auto`, CSS-Variablen
für SVG-Innenleben, `role="img"` mit aussagekräftigem `aria-label`, `aria-pressed` auf
allen Presets, keine eigenen Hexfarben, kein `Math.random`.

**H6 Länge:** Konsolidierungen sind meist 3–4 Sätze; die in 3.3 (`S33.mdx:113-124`) ist mit
fünf Sätzen zu lang und wiederholt, was die Presets zeigen sollen, die in 3.2
(`S32.mdx:193-196`) wiederholt das Verdikt. Null Geviertstriche in allen sechs
MDX-Dateien, deutsche Zahlformatierung durchgehend über `fmtDe`.

### Die drei wichtigsten Muster

1. **Ein Verdikt-Fallbaum, der eine Zustandsklasse nicht kennt, wird falsch.** Der einzige
   CRITICAL des Kapitels entsteht dadurch, dass `NORMS` drei Arten führt und der
   Verdikttext nur zwei abfragt. Dieselbe Lücke in schwächerer Form überall dort, wo die
   Drei-Zustands-Regel auf zwei Zustände zusammengefaltet ist (S31, S32VecNorm, S33: keine
   „nahe entartet"-Klasse). Fix-Muster: pro Widget die Zustandsklassen aufzählen und je
   Klasse einen Zweig erzwingen, statt mit Ternären zu arbeiten.
2. **Die Auflösung steht über der Schätzfrage.** In 3.2 und 3.5 nehmen Aufgabenzeile,
   Preset-Beschriftung und Konsolidierungsprosa die Antwort vorweg; in 3.5 gleich
   dreifach. `Schaetzfrage` hat mit `verdeckt={…}` den vorgesehenen Ort dafür, der im
   ganzen Kapitel nur einmal (S35SubmultWidget, für einen Nebensatz) benutzt wird. Dazu
   passt die zweite Hälfte desselben Musters: In 3.2 fragt die Schätzfrage nach einer
   Größe, die das Widget gar nicht anzeigt.
3. **Richtungsangaben brechen bei 390 px.** „die Kurve rechts" (S33), „die Zahlen rechts"
   (S34), „die blaue Kurve links" (S32NormBall) — bei Handybreite stapeln alle
   Zwei-Spalten-Gitter untereinander, und die Verdikte zeigen ins Leere. Betrifft drei der
   sieben Widgets und ist mit „in der Tafel daneben" bzw. „in der Werteliste" überall in
   einer Zeile behoben.
