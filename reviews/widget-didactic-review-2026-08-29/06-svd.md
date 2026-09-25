# Kapitel 6 (06-svd) — Widget-Didaktik-Review, 2026-08-29

Nenner: 8 Dateien in `src/chapters/06-svd/widgets/`, davon `S64Numerik.ts` reiner
Rechenkern (jacobiSVD, rankK, Testbild) ohne UI; 7 `:::interaktiv`-Kästen in
S61–S64, S65 widgetfrei. `S62Raum.tsx` (`EllipseImRaum`) ist kein eigener Kasten,
sondern hängt unten an `S62Rechner.tsx` an.

Render-Pass: eigene CDP-Läufe bei 1300 px und 390 px, je Widget eine
Zustandssequenz — Schätzfrage vor **und** nach dem Auflösen, jeder Preset,
Stepper bis ans Ende und zurück, Regler an beide Enden, eigene Matrizen über
`MatrixInput`. Die Batch-Screenshots unter `shots/06/` sind wie in Kap. 4/5
nicht durchgesetzt (MathJax-Lazy-Load, Skript-Artefakt); Befunde beruhen auf
eigenen Aufnahmen.

---

## S61EllipseWidget.tsx — EinheitskreisEllipse (§6.1, Kasten „Welche Richtung streckt die Matrix am stärksten?")

S1 — REVISE — Handwerklich das sauberste predict-then-reveal des Skripts
(vor dem Auflösen keine σ-Zahl, keine Extremmarke im Widget) — und daneben
steht die Antwort im Fließtext. Dazu ein Verdikt, das bei κ = 1,01 eine falsche
Charakterisierung behauptet.

- [CRITICAL] `src/chapters/06-svd/widgets/S61EllipseWidget.tsx:137` und
  `:297-303` / `:153-161` — `isotrop = smax / smin < 1.02`. Mit der frei
  eingebbaren Matrix A = diag(1; 1,01) (per CDP hergestellt, Shot) meldet das
  Widget: „Alle Richtungen gleich: Größte und kleinste Streckung fallen mit
  1,010 zusammen, die Kurve ist flach. Aus dem Kreis wird wieder ein Kreis, und
  jede Richtung ist Maximalstelle. Das passiert **genau für Vielfache einer
  Orthogonalmatrix**" — und die Auswertung der Schätzfrage ergänzt „Trickfrage:
  … alle werden um 1,010 gestreckt". Richtig ist: σ₁ = 1,01 ≠ σ₂ = 1, das Bild
  ist eine Ellipse (im linken Panel sichtbar), A ist kein Vielfaches einer
  Orthogonalmatrix, und der Readout eine Zeile darüber zeigt
  ‖Ax(θ)‖ = 1,003 bei θ = 32°, also gerade keinen konstanten Wert. Zusätzlich
  widerspricht die Standardleiste der `Schaetzfrage` („Tatsächlich 90,0°") dem
  eigenen Verdikt („keine eindeutige Antwort"). Eine 2-%-Toleranz wird hier als
  Gleichheit **und** als Strukturaussage über A verkauft. Fix: „isotrop" nur
  über den kontrollierten Weg erkennen (Preset „Drehung" bzw. symbolisch
  AᵀA = λI auf der Eingabematrix), dazwischen eine Stufe „σ₁ und σ₂ liegen dicht
  beieinander: die Ellipse ist fast, aber nicht ganz ein Kreis, und die
  Maximalstelle ist zwar eindeutig, aber schlecht abzulesen".
- [MAJOR] `src/chapters/06-svd/S61.mdx:127-146` — C7: Das
  `:::beispiel[#der-einheitskreis-wird-zur-ellipse]` steht im **selben
  interaktiven Kasten** direkt unter dem noch nicht aufgelösten
  `<Schaetzfrage>`-Block und nennt die Antwort dreifach: „2,288 = √(3+√5) ist
  die längste Halbachse", „x* ≈ (0,851; 0,526)", „ein Einheitsvektor, der rund
  31,7° über der x₁-Achse liegt". Im Rendershot der Tippphase ist der ganze
  Block sichtbar, bevor der Leser tippt. Der Header behauptet `:26-28` „vor dem
  Auflösen stehen im Widget keine Zahlen, die die Antwort verraten" — das
  stimmt für das Widget, nicht für die Seite. Fix: das Beispiel hinter den
  Kasten schieben oder in einen `<details>`/`verdeckt`-Block.
- [MAJOR] `S61EllipseWidget.tsx:136` und `:289-296` — F3: `entartet = smin < 1e-9`
  mit dem Verdikttext „Eine Matrix mit kleinstem Singulärwert null ist singulär".
  Der „singulär"-Preset trifft exakt null (ganzzahlige Matrix), eine frei
  eingegebene Matrix wie diag(1; 10⁻⁵) fällt dagegen in den regulären Zweig und
  bekommt „das Minimum 0,000" gemeldet (fmtDe mit drei Stellen) — nahezu
  entartet, als regulär ausgewiesen und mit einer als Null gedruckten Zahl.
  Der Drei-Zustands-Fall („nahe entartet: schlecht konditioniert") fehlt ganz,
  obwohl κ₂ = σ₁/σ₂ genau hier zu Hause ist. Fix: Zweig ergänzen und kleine σ
  wissenschaftlich formatieren.
- [MAJOR] `S61EllipseWidget.tsx:45-52` — F1/F6: „historische Notiz … derzeit
  nicht reproduzierbar nachgewiesen". Behauptet werden σ₁ = 2,2882 bei
  θ* = 31,72°, σ₂ = 0,8740 bei 121,72°, v₁ = (0,851; 0,526), u₁ᵀu₂ = 0,
  σ₁/σ₂ = 2,618 sowie die drei Preset-Spektren (1/1; 5/0 bei 63,43°; 2/0,5).
  Das committete `scripts/verify/R3/widgets-06.mjs` prüft davon **keinen
  einzigen Matrix-bezogenen Wert**: es assertiert nur √(3+√5) = 2,2882…,
  √(3−√5) = 0,8740… und deren Quotient 2,618, also arithmetische Identitäten,
  ohne A = (2 1; 0 1) je aufzustellen (dazu `:7` `Math.hypot(1,1) = √2`, reine
  Bibliotheks-Deko). Klassifikation: *Skript vorhanden, deckt die Claims aber
  nicht ab*. Fix: im Skript σ(A) aus A rechnen und gegen die Konstanten prüfen;
  Presets mitassertieren (F8).
- [NOTE] `S61EllipseWidget.tsx:218-246` — Die Kurve ‖Ax(θ)‖ ist schon vor dem
  Auflösen gezeichnet, ihr Maximum also grob ablesbar. Das ist hier gewollt (die
  Aufgabenzeile fordert genau das Suchen), sollte aber nicht als „verrät nichts"
  im Header stehen.
- [NOTE] Positiv: Die Auswertung `:164-174` behandelt die 180°-Periode korrekt
  (beide Maximalstellen gelten), die vier Presets sind die Fallunterscheidung,
  der Doppelpfad (Drag auf dem Einheitskreis + θ-Regler) ist da, und der
  Vor-Reveal-Zustand ist ein druckbares Bild.

## S62Rechner.tsx — SingulaerwertRechner (§6.2, Kasten „Die Rechnung Schritt für Schritt")

S2 — KEEP — Sechs Schritte mit je eigener Rechnung, echten Proben
(AᵀA v − λv, v₁ᵀv₂, ‖u‖, max |UΣVᵀ − A| in Exponentialschreibweise) und einem
Vorzeichen-Experiment, das Bemerkung 6.2.10 begreifbar macht.

- [MINOR] `src/chapters/06-svd/widgets/S62Rechner.tsx:322-323` — fehlendes
  Leerzeichen zwischen Text und `{ref(...)}`; gerendert steht „NachSatz 6.2.11"
  (Rendershot mit Rang-1-Matrix). Fix: `{" "}`.
- [MINOR] `S62Rechner.tsx:118` — `rang = sig.filter(s => s > 1e-9).length` und die
  daran hängenden Verdikte („σ₂ = … verschwindet") sind wieder eine Toleranz auf
  einem abgeleiteten Float. Für ganzzahlige Eingaben unkritisch; ein Zweig
  „numerisch rangdefizient: σ₂ ist winzig, aber nicht null" fehlt trotzdem und
  wäre die Brücke zu §6.4.
- [MINOR] `S62Rechner.tsx:158-162` — Bei det(AᵀA) = 0 druckt Schritt 2
  „… = λ² − 30λ + 0" (Rendershot). Fix: den Summanden bei 0 weglassen.
- [MINOR] `S62Rechner.tsx:27-36` — F1: „historische Notiz". Behauptet werden
  AᵀA = (6 4; 4 5), λ₁ = 9,531, λ₂ = 1,469, σ₁ = 3,087, σ₂ = 1,212,
  v₁/v₂, u₁/u₂, u₁ᵀu₂ = 0 und max |UΣVᵀ − A| = 2,2·10⁻¹⁶. `widgets-06.mjs` deckt
  nichts davon ab; an σ₁/σ₂ = 2,547 hängt die Zahlfrage `S62.mdx:729`.
- [NOTE] `S62Rechner.tsx:35-36` — Der Header legt offen, dass Beispiel 6.2.9 mit
  gerundeten v_i weiterrechnet und deshalb −2,074 statt −2,073 schreibt. Genau
  diese Art von Ehrlichkeit ist gemeint; sie sollte beim Nachziehen des
  Prüfskripts erhalten bleiben.
- [NOTE] A5/H1: Der Kasten enthält faktisch zwei Widgets mit zwei
  Aufgabenzeilen (`:290` und `S62Raum.tsx:154`) und zwei Verdiktstapeln. Das ist
  durch D7 (2D-Tafel als Hauptdarstellung, Raumtafel daneben) gedeckt, macht
  den Kasten aber zum längsten des Kapitels.

## S62Raum.tsx — EllipseImRaum (an S62Rechner angehängt)

S3 — KEEP — Vorbildliche Umsetzung der D7-Regel: links die tot lesbare
2D-Tafel, rechts dieselbe Sache im Raum, alle Zahlen im Verdikt, Doppelpfad über
`ViewControls`.

- [MINOR] `src/chapters/06-svd/widgets/S62Raum.tsx:94` und `:229-235` — F3: wie
  überall im Kapitel `!(sig[1] > 1e-9)` mit dem Text „Wegen σ₂ = 0". Toleranz als
  Gleichheit.
- [MINOR] `S62Raum.tsx:96-99, 100-129` — Im Rang-1-Fall (Rendershot mit
  A = (1 2; 2 4; 1 2)) bleibt die Raumtafel weitgehend leer: die entartete
  „Strecke der halben Länge 5,477", von der das Verdikt spricht, ist im Bild
  kaum auffindbar, während der leere Würfel den größten Teil der Fläche einnimmt.
  Fix: im entarteten Fall das Fenster an die Streckenlänge anpassen und die
  Strecke deutlich (violett, `onTop`, breiter) zeichnen.
- [MINOR] `S62Raum.tsx:31-34` gegen `:100-119` — Der Header vergibt Orange an
  „die Streckfaktoren σ (Beschriftung der Halbachsen)", tatsächlich werden die
  Pfeile samt Beschriftung „σ₁u₁"/„σ₂u₂" grün gezeichnet. Kleine E1-Drift gegen
  den eigenen Header.
- [MINOR] `S62Raum.tsx:40-45` — F1: „historische Notiz" für σ₁/σ₂, u₁/u₂,
  Rasterlauf über 360 000 Winkel und Ellipsenfläche πσ₁σ₂ = 11,755.
- [NOTE] Der reguläre Fall ist im Rendershot ausgezeichnet: grüne Ebene col(A),
  violette Bildellipse, beide Halbachsenpfeile, Ax, Tiefensortierung stimmt.

## S62Geometrie.tsx — SvdGeometrieExplorer (§6.2, Kasten „Drehen, Strecken, Drehen")

S4 — KEEP — Muster 4 richtig angewandt: vier Tafeln nebeneinander statt eines
Umschalters, fünf Verdiktstufen, inline-Farblegende in der Aufgabenzeile.

- [MINOR] `src/chapters/06-svd/widgets/S62Geometrie.tsx:173` gegen `:246-258` —
  `kappa` benutzt die Schwelle `s2 > 0`, die Verdikte `s2 < 1e-9`. Für
  0 < σ₂ < 10⁻⁹ zeigt der Readout oben „σ₁/σ₂ = 1,0·10¹²", das Verdikt darunter
  sagt „σ₂ = 0 … Das Verhältnis σ₁/σ₂ ist nicht mehr endlich". Eine Schwelle
  wählen und benennen.
- [MINOR] `S62Geometrie.tsx:243` — „größter Abstand zwischen UΣVᵀ und A:
  {fmt(rest)}" mit `fmt = fmtDe(v, 3)`; die Zahl steht deshalb immer auf
  „0,000" und könnte einen Fehler von 4·10⁻⁴ verstecken. Fix:
  Exponentialschreibweise wie in `S62Rechner.tsx:331`.
- [MINOR] `S62Geometrie.tsx:29-33` — F1: „historische Notiz" für σ₁ = 2,2882,
  σ₂ = 0,8740, σ₁/σ₂ = 2,618, v₁ = (0,851; 0,526) sowie die drei Preset-Spektren.
- [MINOR] E1 — `TransformCanvas` zeichnet die Bildellipse blau
  (Rendershots aller vier Tafeln); Blau ist im Kapitel-Farbcode aber für die
  rechten Singulärvektoren V vergeben, die in derselben Tafel ebenfalls blau
  sind. Fix: die Bildkurve neutral (`--w-axis`) oder violett zeichnen, wie
  `S62Raum.tsx:97` es tut.
- [NOTE] Die fünf Verdiktstufen (Nullmatrix / singulär / κ > 5 / κ > 1,5 /
  fast winkeltreu) decken die Fallunterscheidung sauber ab und nennen jeweils
  den Grund, nicht nur den Wert. Das ist die Referenz für die anderen Widgets.

## S63Bloecke.tsx — ReduzierteSvdBloecke (§6.3, Kasten „Welche Blöcke fallen weg?")

S5 — REVISE — Klare Blockgrafik, 250-ms-Übergang beim diskreten Umschalten
(Muster 12 korrekt), Speicherbilanz live — aber ohne Maus nicht bedienbar.

- [MAJOR] `src/chapters/06-svd/widgets/S63Bloecke.tsx:174` und `:334-335` — G3:
  Die sechs Blöcke sind `<g onClick=…>` ohne `tabIndex`, ohne `role="button"` und
  ohne `onKeyDown`, und das umgebende SVG trägt `role="img"`. Damit gibt es (a)
  keinen Tastaturweg zur Blockauswahl und (b) verstecken die
  `role="img"`-Semantik die Blöcke auch für Screenreader ganz. Die Aufgabenzeile
  `:255-257` („Klicken wir auf einen Block") und das gesamte Verdikt `:443-451`
  hängen an dieser Auswahl — für Tastaturnutzer ist das Widget also stumm.
  Fix: `role="group"` am SVG, `role="button" tabIndex={0} aria-pressed` an den
  Blöcken plus `onKeyDown` (Enter/Space), oder eine parallele Knopfreihe unter
  der Grafik.
- [MINOR] `S63Bloecke.tsx:29-33` — F1: „historische Notiz" für die
  Speicherbilanz. Die Zahlen sind nachgerechnet korrekt (m = 5, n = 4, r = 2:
  25 + 16 + 4 = 45 gegen 2·10 = 20 gegen 20; r = 1: 10; m = n = r = 4: 36/36/16;
  1000 × 50 mit r = 5: 1 002 550 gegen 5255), und an der ersten hängt die
  Zahlfrage `S63.mdx:623`. Kein Skript deckt sie ab. Fix: drei Zeilen in
  `widgets-06.mjs`.
- [NOTE] Alle drei Presets sind erreichbar und haben einen passenden
  Verdikt-Sonderfall — auch der Leerlauf-Fall r = m = n („fällt allerdings gar
  nichts weg", `:449`). F8 erfüllt.

## S63Pseudo.tsx — PseudoinverseExplorer (§6.3, Kasten „Die kürzeste unter unendlich vielen Lösungen")

S6 — KEEP — Zwei verknüpfte Ebenen, ziehbares b mit Reglern als Doppelpfad,
vier Presets, die die Fallunterscheidung sind, Erfolgserkennung bei t = 0.
Bestes Widget des Kapitels.

- [MINOR] `src/chapters/06-svd/widgets/S63Pseudo.tsx:154` (Zweig `rNorm < 1e-9`)
  — „Exakt lösbar, trotzdem mehrdeutig" wird über eine Toleranz auf dem
  Residuum entschieden. Für die Preset-Konfiguration ist die Bedingung exakt
  erfüllt; sauberer wäre der Test über die Projektion von b auf col(A).
- [MINOR] `S63Pseudo.tsx:33-42` — F1: „historische Notiz" für ‖A⁺b‖ = 2,1213,
  ‖r‖ = 2,8284, ‖x(1)‖ = 2,3452, A⁺ = ¼(1 1; 1 1) und die drei Preset-Werte. An
  2,121 hängt die Zahlfrage `S63.mdx:635`.
- [MINOR] Rendershot: Die col(A)-Gerade in der rechten Tafel läuft ohne
  `clipPath` über den Rahmen hinaus (dasselbe Muster wie in Kapitel 4).
- [MINOR] `src/chapters/06-svd/S63.mdx:609-617` — A4: Der Kasten endet direkt
  nach `<PseudoinverseExplorer />`; die konsolidierenden 2–4 Sätze („Wie das
  Widget zeigt, …") fehlen. Im Print-Export steht neben dem Platzhalter dann nur
  die Frage, nicht die Einsicht.
- [NOTE] Das Verdikt (`:162-172`) nennt Bild, Residuum und Normdifferenz mit
  Zahlen **und** Grund („Das Bild bleibt Ax = (3,00; 3,00), das ist nach
  Satz 6.3.8 der Punkt proj_col(A) b") — genau die von D5 geforderte Form.

## S64RangK.tsx — RangKExplorer (§6.4, Kasten „Bildkompression zum Schieben")

S7 — KEEP — Original/Rekonstruktion/Differenz, Spektrumbalken, beide
Fehlerkurven, Energiebalken, Speicherbilanz; die Auflösung nennt den Knick mit
Grund (σ₄/σ₃ = 0,19) statt nur mit Wert.

- [MINOR] `src/chapters/06-svd/widgets/S64RangK.tsx:131` — Der Startwert
  `useState(3)` ist identisch mit `KNICK`, also mit der Lösung der eigenen
  Schätzfrage (`:168`). Der Leser wird gebeten, die Zahl zu suchen, und steht
  beim Laden schon darauf. Fix: bei k = 1 starten; dann führt das Schieben auch
  wirklich durch die drei Bildstufen.
- [MINOR] `S64RangK.tsx` Spektrumbalken (Rendershot links neben dem Fehlerplot)
  — B3: Die Balken haben keine Achse, keine Skala und keine Tickbeschriftung;
  die Bildunterschrift nennt nur „σ₁ bis σ₂₄ in absteigender Größe". Für die
  Aussage „nach σ₃ fällt das Spektrum um den Faktor 0,19" braucht es eine
  (logarithmische) Skala.
- [MINOR] `S64RangK.tsx:31-40` — F1: „historische Notiz" für σ₁…σ₆, ‖A‖_F,
  die Nachbarquotienten des Spektrums, die Energieanteile (93,68 / 98,59 /
  99,80 %), 4,48 % gegen 3,21 % Frobenius-Fehler und die Kompressionsgrenze
  k ≤ 21. An 98,59 hängt die Zahlfrage `S64.mdx:572`. Das Testbild ist
  deterministisch erzeugt (`S64Numerik.ts`), ein Prüfskript wäre also
  unmittelbar schreibbar.
- [NOTE] `S64Numerik.ts:9-12` legt offen, dass dem Testbild ein feines
  deterministisches Rauschen zugesetzt wurde, weil die Matrix sonst exakt Rang 11
  hätte. Genau die richtige Offenlegung.
- [NOTE] `S64RangK.tsx:191` blendet die Reglermarke `[KNICK]` erst nach dem
  Auflösen ein — die Sperre ist sauber gebaut, und die Prosa danach
  (`S64.mdx:369-370`) verrät im Gegensatz zu S61 nichts.

## S64Empfehlung.tsx — EmpfehlungsExplorer (§6.4, Kasten „Rang-k-Glättung einer Bewertungsmatrix")

S8 — REVISE — Inhaltlich der Höhepunkt des Kapitels (Muster 8: eine
zurückgehaltene Bewertung wird zur echten Testgröße, Erfolg wird erkannt und
gedeutet); auf dem Handy ist die Tabelle abgeschnitten.

- [MAJOR] `src/chapters/06-svd/widgets/S64Empfehlung.tsx:213-219` und `:265-269`
  — G1/G6: Die beiden `overflow-x-auto`-Container sitzen als Kinder eines
  `flex flex-wrap justify-center`-Containers, deren Flex-Items kein `min-w-0`
  haben. Damit greift `min-width: auto`, der Scroll-Container wird nie
  eingeschränkt und die Überbreite fällt auf den Kasten zurück. Per CDP bei
  390 px gemessen: Kasten `clientWidth 348`, `scrollWidth 437`; die erste
  Tabelle hat `clientWidth 527` und liegt bei `left = −68 px`, `right = 458 px`
  — sie ist also **an beiden Rändern** abgeschnitten, und `justify-center`
  schiebt ausgerechnet die Namensspalte („Ada", „Bruno", …) aus dem Bild
  (Rendershot). Ohne die Zeilenbeschriftung ist das Widget unbenutzbar. Fix:
  `min-w-0` an die beiden Flex-Kinder (dann greift `overflow-x-auto`), Namen
  zusätzlich als `position: sticky`-Spalte.
- [MINOR] `S64Empfehlung.tsx:238-246` — G3: Die Bewertungszellen sind zwar
  `<button>` und damit tastaturerreichbar (gut), tragen aber nur die Zahl als
  zugänglichen Namen; die Aktion steht im `title` (per CDP: `aria-label` ist
  null). Screenreader hören „5", nicht „Bewertung 5 von Ada für Sternenstaub,
  zurückhalten". Fix: `aria-label` + `aria-pressed`.
- [MINOR] `S64Empfehlung.tsx` (Fließtextblock unter den Tabellen, Rendershot) —
  A5/H6: Unterhalb der beiden Tafeln stehen vier bis fünf Absätze
  Widget-interner Prosa (Füllregel, Gesamtmittel, Singulärwerte, Energieanteil,
  RMSE, „Kleines k glättet stark …"), bevor das Verdikt kommt. Die
  Widget-interne Prosa ist laut `README-widgets.md:14-16` auf Aufgabenzeile,
  Legende und Verdikt begrenzt. Fix: die Erklärsätze in die Prosa vor dem Kasten
  bzw. in das Verdikt ziehen, die Zahlen als Readout-Zeile setzen.
- [MINOR] `S64Empfehlung.tsx` Heatmap — B3: Die Blau-Sättigung der Zellen
  codiert den Bewertungswert, ohne Skala oder Legende.
- [MINOR] `S64Empfehlung.tsx:30-40` — F1: „historische Notiz" plus eine zweite,
  separate („historische Prüfung, Skript nicht mehr vorhanden") für die
  zurückgehaltene Bewertung. Behauptet werden Singulärwerte 15,574 / 2,844 /
  2,671 / 0,464 / 0, Energieanteile, RMSE 1,143 / 0,735 / 0,108 und die
  Vorhersagen für Ada. An 1,8 hängt die Zahlfrage `S64.mdx:585`. Die
  Rendershots bestätigen die Werte (k = 2: Vorhersage 1,8 gegen wahr 5), belegt
  ist keiner.
- [MINOR] `src/chapters/06-svd/S64.mdx:440-448` — A4: Der Kasten endet direkt
  nach dem Widget; die Konsolidierung („Ein Einwand bleibt …") steht außerhalb.

## S64Numerik.ts

S9 — KEEP — Kein Widget, sondern der geteilte Rechenkern (einseitiges
Jacobi-Verfahren, Rang-k-Partialsumme, Differenzmatrix, Testbild). Header
vorhanden, Provenienz (mml-ch4, nur Code) benannt, Rauschzusatz offengelegt.
Keine eigenen numerischen Claims.

---

## Kapitel-Fazit (H1–H6)

**H1 Dichte.** Sieben Kästen auf vier Abschnitte, je Unterabschnitt einer; die
Raumtafel hängt bewusst am Rechner statt einen eigenen Kasten zu bekommen. §6.5
bleibt widgetfrei. Passt.

**H2 Dramaturgie.** Die beste des geprüften Umfangs: Motivation (eine Matrix,
ein Kreis) → Rechenweg → Geometrie in vier Stationen → Struktur (Blöcke,
Pseudoinverse) → zwei Anwendungen. Mechaniken werden isoliert eingeführt, der
freieste Kasten (Empfehlungsmatrix) kommt zuletzt.

**H3 Farbrollen.** Der Bauauftrag (σ orange, V blau, U grün, Rest/Fehler rot)
wird von allen acht Dateien im Header zitiert und weitgehend eingehalten; alle
vier Header sagen ausdrücklich, wo Rot bewusst *nicht* vorkommt. Zwei Drifts:
`TransformCanvas` zeichnet die Bildellipse blau (kollidiert mit V), und
`S62Raum` beschriftet die orange deklarierten Halbachsen grün.

**H4 Selbsttests.** Jeder Abschnitt schließt mit einem Quiz, und in S61–S64
steht jeweils mindestens eine Zahlfrage, die ohne das Widget nicht zu
beantworten ist (`S61.mdx:253`, `S62.mdx:729`, `S63.mdx:623` und `:635`,
`S64.mdx:572` und `:585`). Vorbildlich, und deutlich besser als Kapitel 5.

**H5 Altbestand.** Keine minifizierten Dateien, kein `Math.random`, keine
Idle-Loops, alle Header vorhanden. Die Provenienzangaben (mml-ch4, heath-ch3)
sind je Datei differenziert — inklusive der Fälle, in denen ausdrücklich
*nichts* übernommen wurde (`S63Bloecke.tsx:25-27`,
`S61EllipseWidget.tsx:36-39`). Das ist der Standard, den F5 meint.

**H6 Länge.** Zwei Ausreißer: der S62-Rechnerkasten (zwei Widgets, zwei
Aufgabenzeilen, fünf Verdikte) und die vier Absätze Widget-interner Prosa im
Empfehlungs-Explorer. Umgekehrt fehlt in vier von sieben Kästen die
konsolidierende Prosa nach dem Widget (`S62.mdx:402`, `:722`, `S63.mdx:616`,
`S64.mdx:447`) — im Print-Export bleibt dort nur die Frage stehen.

### Die drei wichtigsten Muster

1. **Das committete Prüfskript prüft nicht die Claims.**
   `scripts/verify/R3/widgets-06.mjs` besteht aus vier Zeilen und assertiert
   arithmetische Identitäten (√(3+√5) = 2,2882…, `Math.hypot(1,1) = √2`), ohne
   je eine Matrix aufzustellen. Alle acht Widget-Header tragen daneben die
   „historische Notiz" mit zusammen über fünfzig behaupteten Zahlen, an denen
   sechs Zahlfragen hängen. Das ist formal kein `x − x`-Vergleich, aber
   wirkungsgleich: Die Assertions können nicht scheitern, wenn ein Widget falsch
   rechnet. Kapitel 6 hat damit die größte F1/F6-Lücke des geprüften Umfangs —
   und zugleich die besten Voraussetzungen, sie zu schließen, weil sämtliche
   Rechenkerne (`S64Numerik.ts`, `svd2x2`) deterministisch und portierbar sind.
2. **Toleranzen entscheiden über Strukturaussagen.** Vier Widgets erkennen
   Entartung über `< 1e-9` auf einem abgeleiteten Float, und in
   `S61EllipseWidget.tsx:137` wird eine 2-%-Toleranz sogar zur Behauptung „genau
   Vielfache einer Orthogonalmatrix" ausgebaut, während der Readout daneben das
   Gegenteil zeigt. Der mittlere Zustand („nahe entartet: schlecht
   konditioniert") fehlt durchgängig — ausgerechnet im Kapitel, das κ₂ = σ₁/σ₂
   einführt. `S62Geometrie.tsx:246-268` hat ihn als einziges Widget und ist
   deshalb die Vorlage.
3. **Der Kasten verrät, was das Widget verschweigt.** `S61EllipseWidget` sperrt
   vor dem Auflösen jede σ-Zahl, und drei Zentimeter darunter steht im selben
   Kasten Beispiel 6.1.2 mit 2,288, (0,851; 0,526) und „rund 31,7°". Dasselbe
   Muster wie in Kapitel 4 (Kehrwert, SGD) und 5 (LU-Kosten): Der
   Spoiler-Split ist im Widget umgesetzt, in der Prosa nicht. Bei `S64RangK`
   ist es dagegen richtig gemacht — dort steht die Auflösung nur im Verdikt nach
   dem Reveal.
