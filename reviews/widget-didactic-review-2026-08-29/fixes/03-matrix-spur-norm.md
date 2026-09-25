# Kapitel 3 — Fix-Log (Umsetzung der Befunde aus `03-matrix-spur-norm.md`)

Stand 2026-08-29. Verifikation: zwei neue Prüfskripte unter `scripts/verify/REV29/`
(`03-matrix-spur-norm-S35Submult.mjs`, `03-matrix-spur-norm-S32NormBall.mjs`) und ein
Sammelskript für die übrigen fünf Widgets (`03-matrix-spur-norm-normen.mjs`), alle grün;
Browser-Pass im Dev-Server (Port 4181) per CDP bei 1300 px und 390 px, mit allen Presets,
Matrixeingaben für die neuen Zwischenklassen und Auflösen-Klick. Kein Kasten und kein
Seitenkörper läuft bei 390 px horizontal über (gemessen: 0 px).

---

## S31SpurWidget.tsx (Abschnitt 3.1, Kasten 1)

**Umgesetzt**

- [MINOR] `:109-111` — `doppelt` hing an `Math.abs(e.l1 - e.l2) < 1e-9`, also an einer
  Toleranz auf einem abgeleiteten Float, und das Verdikt verkaufte das als Gleichheit.
  Die exakte Entartung kommt jetzt aus der **kontrollierten** Größe
  `(a₁₁ − a₂₂)² + 4·a₁₂·a₂₁ === 0`, und es gibt einen dritten Zweig „zwei fast
  zusammengefallene Punkte" mit eigener Deutung („die Eigenwerte reagieren hier extrem
  empfindlich auf die Einträge"). **Browser:** über die Matrixeingabe erreicht
  (A = (2 0,001; 0,001 2,0005) → „fast zusammengefallene Punkte … Die beiden Eigenwerte
  2,0013 …").
- [MINOR] `:250-275` — Bei doppeltem Eigenwert lagen zwei Kreise und zwei Beschriftungen
  exakt übereinander, sichtbar blieb nur „λ₂". Jetzt ein Punkt mit Doppelring und der
  gemeinsamen Beschriftung „λ₁ = λ₂". **Browser bestätigt** (Preset „defekt (Jordan)":
  SVG-Texte sind `… |tr = 4,00|λ₁ = λ₂`).
- [MINOR] `:125-130,232-234` — Bei „Drehung um 90°" hatten beide Pfeile der Summenleiste
  Länge null und die Leiste verschwand als Objekt; die Aufgabenzeile lief ins Leere.
  Jetzt zeichnet die Leiste bei Länge null einen Marker statt eines Pfeils (Browser:
  zwei Marker), und die grüne `tr`-Beschriftung weicht nach oben aus, wenn sie näher als
  22 px an einem Eigenwert steht.
- [MINOR] `:315` — Komplexe Eigenwerte sind kein Problemfall; Verdiktart von `warn` auf
  `neutral`. **Browser:** Preset „Drehung um 90°" zeigt jetzt „Beobachtung:" statt
  „Achtung:".
- [MINOR] `S31.mdx:282,332` — `[nächsten Abschnitt](#sec-3.2)` → `@sec:matrixnormen`.
- [F1/F6] „historische Notiz" raus; Header zitiert `03-matrix-spur-norm-normen.mjs`, das
  die Eigenwerte der vier Voreinstellungen zusätzlich durch Einsetzen ins
  charakteristische Polynom prüft.

**Rationale.** Das Widget kannte zwei Zustände, wo die Mathematik drei hat — und die
fehlende mittlere ist genau die, die man in der Numerik fürchtet. Sie ist jetzt
erreichbar, benannt und erklärt.

## S32NormBallWidget.tsx (Abschnitt 3.2, Kasten 2)

**Umgesetzt**

- [MAJOR] `:344-358` + `:178-181` — Die `Schaetzfrage` fragte nach dem Volumenverhältnis
  Würfel/Oktaeder, das im Widget nirgends vorkam; der Tipp war reines Raten. Gewählt
  wurde die stärkere der beiden Reparaturen: Unter der Raumtafel läuft jetzt eine
  **Volumenzeile** mit, in geschlossener Form über die Gammafunktion
  (V_p = 8·Γ(1+1/p)³/Γ(1+3/p)). **Browser gemessen:** p = 1 → 1,33 · p = 2 → 4,19 ·
  p = 3 → 5,70 · p = ∞ → 8,00, bei 1300 px und 390 px identisch. Die Aufgabenzeile
  schickt den Leser genau dorthin („einmal bei p = 1 und einmal mit dem Kästchen p = ∞").
  Damit ist der Vergleich 8 : 1,33 = 6 eine Ablesehandlung.
- [MAJOR] `:113-137` — Für p < 1 zerfiel die `Surface3D`-Fläche in ein Nadelbüschel; der
  Steilheitsabbruch war ausdrücklich auf p > 1 beschränkt, was dort gerade falsch ist.
  Zwei Änderungen: (a) das Kriterium |dz/da| = (|a|/z)^(p−1) gilt jetzt für **jedes** p
  (der alte Guard ist weg); (b) weil die Kugel für p < 1 in echte Spitzen ausläuft und
  auch mit Abbruch kein brauchbares Bild ergibt — im Browser gegengeprüft, altes und
  neues Rendering nebeneinander —, steht in diesem Bereich statt der Raumtafel ein
  Hinweis, der auf die 2D-Tafel verweist. **Browser bestätigt** (Screenshot bei p = 0,5).
- [MINOR] `:306-317` — Im Zweig p < 1 fehlte ‖x‖ ganz. Die Zeile steht jetzt **vor** der
  Fallunterscheidung und ist in allen Zuständen sichtbar.
- [MINOR] `:300-303` — „genau die blaue Kurve **links**" → „in der Tafel daneben".
- [F1/F6] Header zitiert `03-matrix-spur-norm-S32NormBall.mjs`; das Skript hält die
  geschlossene Volumenformel gegen eine unabhängige Gitterintegration über
  {x : ‖x‖_p ≤ 1} (auch für p = 1,5; 3; 4, nicht nur für die drei Standardfälle) und
  prüft, dass die beiden falschen Antwortoptionen wirklich widerlegt sind.
- [NOTE] Die Gestaltklassifikation über den kontrollierten Parameter p bleibt unverändert
  — sie war schon vorbildlich.

**Rationale.** Eine Schätzfrage, die das Widget nicht beantworten kann, macht aus
predict-then-reveal ein Glücksspiel. Mit der mitlaufenden Volumenzeile schiebt der Leser
p von 1 auf ∞ und liest 1,33 → 8 ab; die Antwort „etwa 6-mal" ist danach kein Tipp mehr,
sondern eine Beobachtung.

## S32VecNormWidget.tsx (Abschnitt 3.2, Kasten 3)

**Umgesetzt**

- [MINOR] `:88,154-156` — `singulaer = |det| < 1e-9` und „Diese Matrix ist singulär".
  Jetzt: exakte Singularität über den Produktvergleich der eingegebenen Einträge
  (`a₁₁·a₂₂ === a₁₂·a₂₁`) plus dritte Klasse „nahezu singulär (schlecht konditioniert)"
  mit einer Schwelle auf σ₂/σ₁ und dem konkreten Wert im Text.
- [MINOR] `:24-27` vs. `S32.mdx:218-224` — Der Blau-Konflikt (Norm im Widget, Matrix A₂
  in der Prosa) ist im Header **ausdrücklich als Kollision benannt** samt Begründung,
  warum die Kapitelfarbe im Widget gewinnt.
- [MINOR] `:137` — `href="#sec-3.3"` läuft jetzt über `num("sec:matrix-spur-norm/operatornormen")`.
- [MINOR] `S32.mdx:193-196` — Die Konsolidierung wiederholte das Verdikt fast wörtlich;
  sie ist auf den Schritt nach vorn gekürzt („Deshalb brauchen wir Normen, die nicht die
  Einträge, sondern die *Abbildung* messen.").

## S33OperatornormWidget.tsx (Abschnitt 3.3, Kasten 4)

**Umgesetzt**

- [MINOR] `:139-142` — `singulaer = smin < 1e-9`. Jetzt exakte Singularität aus den
  eingegebenen Einträgen (der Preset trifft sie exakt) und ein dritter Zweig „fast zu
  einer Strecke zusammengefallen … nicht singulär, sondern schlecht konditioniert" mit
  ausgeschriebener Konditionszahl. **Browser:** über die Matrixeingabe erreicht.
- [MINOR] `:252-263` — Die Verdiktart hing an `getroffen`, der Text an `art`; in den
  beiden Sonderfällen stand ein grünes „Passt ✓" über einem Text, der die Erfolgsmeldung
  gar nicht enthielt. Die Erfolgsmeldung ist jetzt der erste Satz **vor** der
  Fallunterscheidung. **Browser:** Preset „singulär", θ = 63° → „Passt: Getroffen: In
  dieser Richtung nimmt der Streckfaktor sein Maximum 2,500 an …", θ = 20°/117° →
  „Achtung: Die Bildellipse ist zu einer Strecke entartet".
- [MINOR] `:96` — Die nackte Querverweisnummer als Preset-Beschriftung heißt jetzt
  „schiefe Streckung", der Verweis steht im `title`.
- [MINOR] `:259` — `href="#sec-3.5"` über `num(...)`.
- [MINOR] `:266` — „Die Kurve **rechts** ist eine Waagrechte" → „Die Streckfaktorkurve".
- [MINOR] `S33.mdx:113-124` — Die fünfsätzige Konsolidierung spielte beide Sonderfälle
  durch, bevor der Leser sie drückt; auf die ersten drei Sätze gekürzt.

**Rationale.** Das beste Widget des Kapitels quittierte den Erfolg ausgerechnet in den
zwei Fällen nicht, in denen der Leser ihn am ehesten sucht — und verriet vorher in der
Prosa, was die Presets zeigen sollten.

## S34SchattenWidget.tsx (Abschnitt 3.4, Kasten 5)

**Umgesetzt**

- [MINOR] `:201-204` — „welche der Zahlen **rechts** sich mitbewegen" → „in der
  Werteliste"; bei 390 px stehen die Zahlen unter dem Bild.
- [MINOR] `:108-113` — Drei Voreinstellungen ergänzt, die die Fallunterscheidung des
  Abschnitts *sind*: „allgemein", „symmetrisch" und als didaktischer Gegenfall
  „Orthogonalmatrix" (beide Singulärwerte 1). **Browser bestätigt.**
- [MINOR/F1] `:35-42` — „historische Notiz" ersetzt. Das Sammelskript fährt genau die
  Schleife des Widgets: θ ∈ [0°, 360°] in 1°-Schritten, größte Abweichung der
  Schattennormen < 1e−14, größte Abweichung der elementweisen Normen > 0,5, dazu die
  45°-Werte (Summennorm 4,2426, Maximumsnorm 1,4142) und der Nachweis, dass 0/90/180/270
  nur zufällig stillstehen.
- [MINOR] `S34.mdx:88` — `[Spur](#sec-3.1)` → `@sec:spur`.

## S35Aequivalenz.tsx (Abschnitt 3.5, Kasten 6)

**Umgesetzt**

- [MINOR] `:190-213` — Die Randbeschriftungen („σ₁ = σ₂: rechte Schranke scharf",
  „σ₂ = 0: linke Schranke scharf") standen von Anfang an im Bild und nahmen die ganze
  Pointe vorweg. Sie heißen jetzt neutral „σ₁ = σ₂" und „σ₂ = 0"; die Deutung übernimmt
  das Verdikt, das sie ohnehin nennt.
- [F1] `:40-47` — „historische Notiz" ersetzt; das Sammelskript prüft den Quotienten über
  ein Raster des ganzen zulässigen Keils (bleibt in [1, √2]), die Voreinstellung
  (1,6; 0,8) → 1,118034 und die Vergleichsmatrix diag(1,2; 0).

## S35SubmultWidget.tsx (Abschnitt 3.5, Kasten 7)

**Umgesetzt**

- [CRITICAL] `:287-294` — Der Zweig „Erfüllt, mit Luft" wählte seinen Begründungssatz über
  `norm.art === "operator" ? … : …` und kannte damit nur zwei der drei Arten in `NORMS`.
  Mit der **Maximumsnorm** und einem Paar, für das die Ungleichung strikt gilt, schrieb
  das Widget der Norm, deren Gegenbeispiel der Abschnitt gerade vorführt, ein Resultat
  über Schattennormen zu (grammatisch unvollständig obendrein). Jetzt gibt es einen
  eigenen Zweig für `art === "elementweise"`: „Hier gilt die Ungleichung zufällig – für
  die Maximumsnorm garantiert sie niemand: Sie ist weder Operator- noch Schattennorm, und
  ein Gegenbeispiel liegt einen Klick entfernt (Einsermatrix)." Ebenso wird der
  Zufallspaar-Zusatz („bleibt stets unter 1") für die elementweise Norm nicht mehr
  behauptet — er ist dort falsch (größter Quotient 1,8235).
  **Browser reproduziert:** Maximumsnorm, A = diag(1, 0), B = diag(0, 1) → korrekter
  Zweig, kein Schattennorm-Satz mehr (1300 px und 390 px).
  Zusätzlich wurde der `scharf`-Zweig art-abhängig gemacht: „die Schranke aus Satz 3.5.5
  ist scharf" gilt für die Maximumsnorm nicht.
- [MAJOR] `:181-184`, `:215` und `S35.mdx:223-225` — Die Auflösung stand dreifach
  sichtbar da. Alle drei Stellen sind umgebaut: die Aufgabenzeile fragt vor dem Auflösen
  neutral („Bleibt der Balken immer links von der 1?") und wechselt danach auf die
  Suchformulierung; der Preset-Knopf heißt bis zum Auflösen nur „Einsermatrix"; der
  Konsolidierungssatz („Es gibt sie, die Norm, die aus der Reihe tanzt …") liegt in
  `verdeckt={…}`, und im Kasten steht stattdessen ein Satz über das *Verfahren* (ein
  einziges Paar entscheidet eine Allaussage). **Browser bestätigt** vor und nach dem
  Auflösen, bei beiden Breiten.
- [MINOR] `:158,280-286` — „Hier steht Gleichheit" bei einer 1e−9-Toleranz → „Hier stehen
  beide Seiten auf Anzeigegenauigkeit gleich".
- [MINOR/F1] `:21-28` — Die Kennzahlen über die 40 Seeds des Würfelknopfs sind jetzt
  bewiesen: `03-matrix-spur-norm-S35Submult.mjs` spielt `mulberry32(seed·7919)` für
  seed = 1 … 40 durch, asserted je Norm das Maximum (Spektral 0,9997 · Spalten- und
  Zeilensummen 1,0000 · Frobenius 0,9729 · Nuklear 0,7800 · Maximum 1,8235) und erzwingt
  für alle Nicht-Maximumsnormen Quotient ≤ 1. Singulärwerte werden gegen eine Abtastung
  des Einheitskreises gehalten, das Skript liest außerdem aus der Quelle, dass alle drei
  Normarten im Verdikt abgefragt werden.
- [NOTE] Der geseedete Zufall und der Hinweis darauf bleiben unverändert.

**Rationale.** Ein Verdikt-Fallbaum, der eine Zustandsklasse nicht kennt, sagt dort nicht
nichts, sondern etwas Falsches — und hier ausgerechnet über die Norm, deren
Gegenbeispiel der Abschnitt aufbaut. Zusammen mit dem dreifach vorweggenommenen Spoiler
war der Kasten vorher weder korrekt noch spannend; jetzt entscheidet der Leser selbst,
bevor irgendetwas verraten wird.

## S33Local / S34Local / S35Local / S36Local (Abschnitte 3.3–3.6, ohne Kasten)

**Umgesetzt**

- [MINOR] `:7` in allen vier Dateien — das Header-Zitat „Geprüft mit verify-hdr.mjs,
  2026-08-20" ist gestrichen; das Skript sagt über diese Dateien nichts.

---

## Offen gelassen

- [MINOR] `S32VecNormWidget.tsx` (NOTE) — „ein kleines Einheitskreis-Bild neben der
  Matrix wäre die stärkste Verbesserung des Abschnitts". Als NOTE formuliert und nicht
  umgesetzt: Das wäre ein neues Widget, nicht die kleinste Änderung, die einen Befund
  behebt.

## Entscheidung nötig

- **Sammelbefund „vier Kopien derselben Komponente" [MAJOR]** — `S33Local.tsx`,
  `S34Local.tsx`, `S35Local.tsx`, `S36Local.tsx` sind untereinander (und mit
  `01-intro/widgets/S11Widgets.tsx`, `02-algos/widgets/S23Local.tsx`,
  `02-algos/widgets/S24Local.tsx`) redundant. Der vom Review vorgeschlagene Fix ist eine
  **neue Lib-Komponente** `src/lib/widgets/SelbsttestFrage.tsx` mit `as`-Prop; `src/lib`
  ist in diesem Lauf tabu, deshalb **lib-Befund**: Entscheidung und Umsetzung gehören in
  den lib-Lauf. In diesem Lauf wurden nur die Header-Zitate ohne Deckung entfernt (und in
  Kapitel 1 und 2 zusätzlich die Oberflächenklassen repariert), damit die spätere
  Zusammenlegung auf sauberen Vorlagen aufsetzt.
- Sonst keine STATIC/REMOVE-Empfehlung in diesem Kapitel.
