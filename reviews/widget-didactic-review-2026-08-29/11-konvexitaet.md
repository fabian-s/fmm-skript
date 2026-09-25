# Kapitel 11 — Konvexität: Widget-Didaktik-Review

Scope: `src/chapters/11-konvexitaet/` — 8 Widget-Dateien mit **10 exportierten
Widgets** in 5 MDX-Abschnitten; im Browser 9 `:::interaktiv`-Kästen plus zwei
statische Tafeln (`KonvexKonkavPanels`, `EpigraphSkizze`), die bewusst außerhalb
eines Kastens stehen.

Zwei Pässe je Widget: volle Quelltextlektüre und Render-Pass per CDP bei 1300 px
und 390 px mit den Pflicht-Interaktionssequenzen (Regler min / didaktisch
kritische Stelle / max, jeder Preset einmal, Schätzfrage vor **und** nach dem
Auflösen, Ziehgriffe an die Extreme). Kapitel-Farbrollen nachgeschlagen in
KONVENTIONEN.md, Abschnitt „KAPITEL 12 (Foliensatz 12-konvexitaet)" (ALTE
Zählung): konvexe/zulässige Mengen blau, Verbindungsstrecken und
Konvexkombinationen grün, Gegenbeispiele/Verletzungen rot, ausgezeichnete Punkte
orange. Alle acht Dateien halten diese Rollen ein; die beiden Abweichungen sind
im Header begründet (S113Projektion lässt Grün bewusst weg, S115 gibt Rot an das
nur lokale Minimum). Der Gradient als Zeilenvektor (Def. 10.2.1) ist Konvention
und wird nirgends als Fehler gemeldet.

Alle im Report genannten Zahlen habe ich mit `node` unabhängig nachgerechnet;
gefunden habe ich **keinen falschen Zahlenwert** — wohl aber ein Bild, das dem
eigenen Verdikt widerspricht (S112PsdKegel).

---

## S111Huelle.tsx (11.1)

HuellenSchaetzung / KonvexeHuellePunktwolke — KEEP — Sauberes
Predict-then-reveal mit drei sinnvoll getrennten Verdikt-Zweigen; die Auflösung
steht allerdings vollständig als Prosa im selben Kasten.

- [MAJOR] `src/chapters/11-konvexitaet/S111.mdx:268-273` — Die Konsolidierung im
  selben `:::interaktiv`-Kasten sagt wörtlich „Bei $k = 5, 6, 8, 9, 10, 11$ und
  $12$ fällt jeweils eine alte Ecke heraus" und „Am Ende tragen sieben der
  vierzehn Punkte die ganze Hülle". Das erste ist die Lösung der Schätzfrage
  (`S111Huelle.tsx:322`, „Ab welchem k verliert (1,5; 1,4) diesen Status?",
  `loesung={5}`), das zweite die Lösung der Selbsttest-Zahlfrage
  (`S111.mdx:448`, `loesung=7`). Im Render-Pass in Phase „tippen" per CDP
  bestätigt: beide Sätze stehen sichtbar über dem Eingabefeld, bevor der Leser
  tippt. C7 verletzt, und die Selbsttestfrage ist damit nicht mehr
  widget-abhängig (H4). Fix: beide Sätze in das `verdeckt`-Feld
  (`S111Huelle.tsx:327-333`) verschieben, in der Prosa nur die Frage stehen
  lassen.
- [MINOR] `src/chapters/11-konvexitaet/S111.mdx:238` — „Das zweite Widget unten
  führt das vor." Der Statuswechsel eines Extrempunkts wird vom **ersten**
  Widget des Abschnitts vorgeführt (`S111.mdx:266`); das zweite
  (Konvexkombinations-Explorer, `S111.mdx:345`) zeigt etwas anderes und liegt
  zudem in einer Vertiefung. Fix: „Das Widget im nächsten Kasten".
- [MINOR] `S111Huelle.tsx:327-333` — Der `verdeckt`-Text wiederholt die
  MDX-Konsolidierung fast wörtlich (H6). Nach dem Verschieben (siehe oben) bleibt
  nur eine Fassung übrig.
- [NOTE] `S111Huelle.tsx:113` — `start = 4` zeigt im toten Zustand den
  „alles bleibt"-Zweig; das Phänomen (eine Ecke fällt nach innen) beginnt erst
  bei k = 5. Für die Schätzfrage ist das richtig, für B2 („Voreinstellung zeigt
  das Phänomen") grenzwertig; ein Hinweispfeil auf (1,5; 1,4) würde beides
  bedienen.
- [NOTE] `S111Huelle.tsx:296-297` — Der Zusatz „und weitere" ist toter Code: über
  die eingebettete Punktliste fällt nie mehr als eine Ecke pro Schritt heraus
  (nachgerechnet: Verluste bei k = 5, 6, 8, 9, 10, 11, 12, jeweils genau einer).
- F1/F6: `S111Huelle.tsx:34-37` — „historische Notiz", **kein committetes
  Prüfskript**. Ich habe alle Headerzahlen nachgerechnet und bestätigt:
  Extrempunktzahlen 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 7 für k = 3 … 14, Flächen
  0,440 → 7,460 monoton, (1,5; 1,4) verliert den Status genau bei k = 5.

## S111Konvexkombination.tsx (11.1)

KonvexkombinationsExplorer — KEEP — Vorbildliche Objekt-Manipulation mit
Doppelpfad und vier erreichbaren Verdikt-Zuständen; die Regler tragen die
falschen Namen.

- [MINOR] `S111Konvexkombination.tsx:325` — Die drei Regler heißen
  „Regler x₁ / x₂ / x₃" (`label={\`Regler ${NAMEN[i]}\`}`), gesteuert werden aber
  die unnormierten Gewichte w₁, w₂, w₃; genau so heißen sie in der Prosa
  (`S111.mdx:351-354`) und in der Tabelle des Widgets (Z. 348). A7 verlangt
  dasselbe Symbol in Prosa und Bedienelement — hier sieht es aus, als bewege der
  Regler die Ecke x₁. Fix: „Gewicht w₁ (unnormiert)".
- [MINOR] `S111Konvexkombination.tsx:151, 394` — `istSchwerpunkt` ist eine
  Toleranzabfrage (`|wᵢ − 1/3| < 5e−3`), und der Titel lautet immer „Nahe am
  Schwerpunkt (1; 2/3)" — auch bei der Voreinstellung `w = [1,1,1]`, die den
  Schwerpunkt **exakt** trifft. Drei-Zustands-Regel: der exakte Fall ist über den
  kontrollierten Parameter erkennbar (`roh[0] === roh[1] === roh[2]`). Fix:
  dritter Titel „Genau der Schwerpunkt (1; 2/3)".
- [NOTE] `S111Konvexkombination.tsx:158-159` — `istAktiv` vergleicht die
  Rohwerte; nach dem Ziehen in die Mitte steht dort (1/3; 1/3; 1/3), der Knopf
  „Schwerpunkt" verliert also sein `aria-pressed`, obwohl der Zustand identisch
  ist.
- [NOTE] `S111.mdx:281-378` — Der Explorer ist das Kernwidget zu
  @definition:konvexkombination und @satz:konvexkombinationen-zweier-vektoren,
  sitzt aber in einer `::::vertiefung`. Vertretbar (die ausführliche
  Dreiecksrechnung ist optional), verdient aber eine bewusste Entscheidung.
- Gut: fünf Presets, die genau die Fallunterscheidung sind — einschließlich
  „alle Regler null" für den nicht definierten Normierungsfall; alle vier
  Verdikt-Zweige im Render-Pass erreicht (Ecke, Kante, innen, undefiniert).
- F1/F6: `S111Konvexkombination.tsx:42-47` — „historische Notiz", kein Skript.
  Dreiecksfläche 2 und Schwerpunkt (1; 2/3) nachgerechnet ✓.

## S112KonvexTest.tsx (11.2)

KonvexTest — REVISE — Vier vorbildlich getrennte Verdikt-Zustände, aber die
Mengenwahl setzt das Gegenbeispiel gleich mit und nimmt dem Widget seine Aufgabe.

- [MAJOR] `S112KonvexTest.tsx:281-286` — `mengenWahl` setzt beim Umschalten x und
  y auf `menge.paar`, und für Kreisring (Z. 137-140) sowie Parabelunterseite
  (Z. 192-195) **ist** dieses Paar das Gegenbeispiel. Per CDP bestätigt: ein
  Klick auf „Kreisring" liefert sofort „Geschafft: die Strecke verlässt die Menge
  … λ echt zwischen 0,380 und 0,620", ein Klick auf „Parabelunterseite" sofort
  „99,7 % der abgetasteten Strecke". Damit ist die Aufgabenzeile („Ziehen wir x
  und y so, dass die grüne Strecke die blaue Menge verlässt", Z. 312-314)
  erledigt, bevor der Leser etwas tut, und der eigens vorgesehene Knopf
  „Gegenbeispiel setzen" (Z. 455-464) ist redundant. Der sorgfältig gebaute
  Startzustand (Ring mit einem Paar, das die Probe *besteht*, Z. 256-260) lässt
  sich außerdem nie wiederherstellen. Fix: beim Mengenwechsel ein neutrales,
  bestehendes Paar setzen (wie im Startzustand) und das Gegenbeispiel dem Knopf
  überlassen.
- [MINOR] `S112.mdx:46-49` — Die Prosa vor dem Kasten nennt „vier Mengen", aber
  keine davon; Innen- und Außenradius des Rings (0,8 und 1,2) erfährt der Leser
  erst im Widget. A7: die Größen sollten vorher stehen, mindestens der Ring, an
  dem die ganze Konsolidierung hängt.
- [NOTE] `S112KonvexTest.tsx:217-251, 279` — `analysiere` läuft bei jedem Rendern
  neu (601 Abtastungen plus zweimal 40 Bisektionsschritte), ohne `useMemo`. Bei
  dieser Größe unkritisch, beim Ziehen aber unnötig.
- Gut: drei „das beweist nichts"-Zustände, alle im Render-Pass erreicht —
  Voraussetzung verletzt (x außerhalb), x = y entartet, Paar besteht die Probe;
  die Verdikttexte sagen ehrlich „abgetastete Strecke" statt „alle λ".
- [NOTE] Positiv gegen den Kapitel-Trend: die Selbsttest-Zahlfrage
  `S112.mdx:211-219` (ab welchem λ verlässt die Strecke den Ring, Lösung 0,38)
  wird von der Konsolidierung **nicht** verraten — sie nennt nur die
  Mittelpunktnorm 0,778. Diese Frage ist wirklich widget-abhängig.
- F1/F6: `S112KonvexTest.tsx:42-50` — „historische Notiz", kein Skript.
  Nachgerechnet: λ-Grenzen 0,3798 / 0,6202, Mittelpunktnorm 1,1/√2 = 0,7778,
  Startpaar bleibt mit minimaler Norm 1,0436 ganz im Ring ✓.

## S112PsdKegel.tsx (11.2)

PsdKegel — REVISE — Starke 2D/3D-Verknüpfung mit fünf Presets, aber für b = 0
zeichnet die Haupttafel die falsche Menge und widerspricht dem eigenen Verdikt.

- [CRITICAL] `S112PsdKegel.tsx:133-146` — Für b = 0 ist `a0 = 1e−6` und
  `b²/av = 0`, der „Rand" degeneriert also zur Linie c = 0 von a ≈ 0 bis a = 4.
  `schnittPolygon` hängt daran nur noch (4, 4) und schließt zum Startpunkt
  zurück; gezeichnet wird deshalb das **Dreieck {0 ≤ c ≤ a}** statt des ganzen
  Viertelraums {a ≥ 0, c ≥ 0}. Im Browser reproduziert: mit A = diag(1, 3)
  (a = 1, b = 0, c = 3, Eigenwerte 1 und 3) liegt der orange Punkt deutlich
  **außerhalb** der blauen Fläche, während das Verdikt „Der Punkt liegt im
  Inneren des blauen Schnitts" meldet (Z. 419-420) und die Bildunterschrift
  „Für b = 0 füllt er den ganzen Viertelraum" behauptet (Z. 349-353). Drei der
  fünf Voreinstellungen haben b = 0 (Einheitsmatrix, Nullzeile, negativ definit);
  bei der Einheitsmatrix sitzt der Punkt (1, 1) exakt auf der falschen
  Diagonalkante und sieht damit aus wie ein Randpunkt, also wie eine
  semidefinite, nicht invertierbare Matrix. Das Bild lehrt, diag(1, 3) sei nicht
  PSD. Fix: für |b| < 1e−9 das Polygon aus den Ecken (0,0), (A_HI,0),
  (A_HI,A_HI), (0,A_HI) bauen — allgemein den Punkt (a0, A_HI) voranstellen, so
  dass die Schlusskante entlang a = a0 läuft.
- [MINOR] `S112PsdKegel.tsx:104-114` — Zwei Zustände, wo die Mathematik drei
  kennt: `l1 > eps` heißt „definit", sonst „semidefinit". A = (1, 0,95; 0,95, 1)
  mit λ_min = 0,05 (per CDP bestätigt) bekommt denselben vorbehaltlosen Satz
  „Positiv definit" wie die Einheitsmatrix, obwohl das genau der schlecht
  konditionierte Fall ist, von dem der semidefinite Zweig (Z. 424-429) spricht.
  Fix: dritter Zweig „positiv definit, aber schlecht konditioniert — der kleinere
  Eigenwert ist … ; Cholesky läuft, verliert aber Stellen".
- [MINOR] `S112PsdKegel.tsx:376-382` — Sieben Zeilen Prosa im Widget (die
  Beschriftung der 3D-Tafel). README-widgets: „Mehr Prosa gehört NICHT ins
  Widget"; die Koordinatenerklärung gehört in den Absatz vor dem Kasten.
- [MINOR] `S112.mdx:465` — Die Konsolidierung nennt „die Rang-1-Matrix mit b = 1
  die Eigenwerte 0 und 2"; das ist wörtlich die Antwort der Selbsttest-Zahlfrage
  direkt darunter (`S112.mdx:477-484`, `loesung=0`). H4: die Frage lässt sich
  ohne das Widget beantworten.
- Gut: fünf Verdikt-Zweige, alle erreichbar und im Render-Pass erreicht
  (definit, semidefinit, indefinit, negativ semidefinit, Nullmatrix); die
  Entartung wird über die kontrollierten Parameter a, b, c erkannt (Rasterweite
  0,05, also |det| ≥ 0,0025 ≫ eps), nicht über einen Float-Vergleich.
- F1/F6: `S112PsdKegel.tsx:49-57` — „historische Notiz", kein Skript.
  Eigenwerte der fünf Presets nachgerechnet ✓ (1/1, 0/2, 0/2, −1/3, −1/−1).

## S113Projektion.tsx (11.3)

ProjektionsWidget — KEEP — Vier saubere Zustände inklusive Ecke und „x liegt
schon drin"; die Zahlen im Verdikt stimmen.

- [MINOR] `S113Projektion.tsx:478-483` — Vier Sätze Erklärprosa unterhalb des
  Verdikts, im Widget. Der Absatz erklärt die letzte Tabellenzeile und gehört
  entweder als eine Zeile in die Legende oder in die Prosa des Kastens (A5).
- [NOTE] `S113Projektion.tsx:469-476` — Das Verdikt begründet die Eindeutigkeit
  empirisch („unter 720 abgetasteten Randpunkten unterbietet keiner diesen
  Abstand"). Der Satz nennt zwar @satz:kriterium-des-stumpfen-winkels, aber die
  Reihenfolge stellt die Stichprobe vor den Grund; D5 will den mathematischen
  Grund zuerst.
- [NOTE] `S113Projektion.tsx:368` — Der Griff für x trägt `var(--w-text)` statt
  einer Palettenfarbe. Im Header begründet (Grün bleibt den
  Konvexkombinationen vorbehalten), also kein Farbdrift-Befund.
- Gut: alle vier Zweige im Render-Pass erreicht, mit den Headerzahlen
  d = 1,000 (Scheibe), 0,061 (nah am Rand), 1,294 (Dreieck, Kante), 1,172
  (Dreieck, Ecke) und „größtes abgetastetes Skalarprodukt 0,000"; die
  Ecken-Voreinstellung führt genau den beworbenen Fall vor (x läuft weiter, x̂
  bleibt stehen).
- F1/F6: `S113Projektion.tsx:42-50` — „historische Notiz", kein Skript.
  x̂ = (0,8; 0,6) mit d = 1 und die Ecke (1,2; −0,6) mit d = 1,1715
  nachgerechnet ✓.

## S113Sehne.tsx — SehnenTest (11.3)

SehnenTest — KEEP — Fünf Verdikt-Zweige, λ-Sonde mit Live-Anzeige, die
Asymmetrie zwischen Widerlegen und Beweisen wird ausdrücklich benannt.

- [MINOR] `S113Sehne.tsx:503` — Das Verdikt zitiert
  `ref("definition:strikte-konvexitaet")`, das ist **Definition 11.5.4**, also
  zwei Abschnitte später. In 11.3 ist strikte Konvexität nur informell in
  @bemerkung:wie-wir-die-ungleichung-lesen (11.3.9) eingeführt. Fix: hier 11.3.9
  zitieren, den Vorwärtsverweis höchstens als Zusatz.
- [MINOR] `S113.mdx:414-415` — Die Konsolidierung nennt den Wert 1,891 für die
  Voreinstellung; das ist die Antwort der Selbsttest-Zahlfrage
  `S113.mdx:524-533` (`loesung=1.891`). H4, wie in 11.1, 11.2 und 11.4.
- [NOTE] `S113Sehne.tsx:355` — `sehneAufGraph` prüft `groessteAbweichung < 1e−12`
  auf einem abgeleiteten Float. Beim Betrag wäre der kontrollierte Test „beide
  Endpunkte auf demselben Ast" (a·b ≥ 0). Praktisch unkritisch, weil die
  Reglerschrittweite 0,01 den nächsten erreichbaren Wert auf ≈ 2,5·10⁻³ hebt.
- [NOTE] `S113Sehne.tsx:68-99` — Die vier Kurvenknöpfe tragen als Beschriftung
  gleich das Ergebnis („nicht konvex", „strikt konvex"). Das ist die von Muster 5
  geforderte didaktische Benennung, nimmt der Aufgabenzeile aber die Spannung;
  eine Alternative wären neutrale Namen (Doppelmulde, Betrag, Parabel, Kuppel)
  mit dem Urteil erst im Verdikt.
- Gut: im Render-Pass alle fünf Zweige erreicht — verletzt, verletzt-und-konkav,
  Gleichheit auf dem Betrag, Doppelmulde-Paar besteht (mit korrekter Unterscheidung
  „im selben Ast" / „über den Höcker"), regulär; λ = 0 und λ = 1 melden korrekt
  Gleichheit.
- F1/F6: `S113Sehne.tsx:40-51` — „historische Notiz", kein Skript. Nachgerechnet:
  Voreinstellung 1,891, Tafelpaar 1,738 (auf 63,5 % der Strecke), Talgrundpaar
  −1,8 / −0,9 besteht exakt, Wendepunkte ±0,7071 ✓.

## S113Sehne.tsx — KonvexKonkavPanels (11.3)

KonvexKonkavPanels — STATIC — Richtig als statische Vierertafel gebaut; die
Beschriftung lebt allerdings nur außerhalb der Tafel.

- [MINOR] `S113Sehne.tsx:538-564` / `S113.mdx:395-404` — Die Tafel steht ohne
  Kasten und ohne eigene Legende; die Farbzuordnung (blau Graph, grün Sehne, rot
  Verletzung) steht nur in der Prosa danach. Eine Inline-Legende in der Tafel
  würde sie druckfähig machen (B3).
- [MINOR] `S113Sehne.tsx:546-548` — Feste 190 × 140 px bei jeder Breite: auf dem
  Desktop bleiben die vier Tafeln unnötig klein, auf dem Handy skalieren sie
  nicht mit (per CDP bei 1300 px und 390 px identisch gemessen). `max-w-full` ist
  gesetzt, aber ohne `grow` bleibt die Basis bei 190 px.

## S113Sehne.tsx — EpigraphSkizze (11.3)

EpigraphSkizze — STATIC — Eine korrekt gewählte einzelne Figur, die genau das
zeigt, was die Definition sagt.

- [NOTE] `S113Sehne.tsx:582-587` — Die Beschriftungen „epi(f)" und „f" sitzen auf
  festen Pixelkoordinaten. Bei der fest verdrahteten Kurve ist das ungefährlich,
  koppelt die Skizze aber an die Kurvenwahl.

## S114Jensen.tsx (11.4)

JensenExplorer — KEEP — Vier Verdikt-Zweige, die konkave Gegenprobe und der
Gleichheitsfall sind Presets; zwei Beschriftungen laufen aus dem Bild.

- [MINOR] `S114Jensen.tsx:239-260` — Beide Marken-Beschriftungen werden bei
  `px(xquer) + 8` gesetzt. Schiebt man alles Gewicht auf x₃ = 3,5 (per Regler
  erreichbar), stehen sie über dem rechten Rand und werden abgeschnitten: im
  Browser steht dort „Σ wᵢ f(xᵢ) = 12" statt „= 12,25". Im Gleichheitsfall liegen
  sie außerdem übereinander. Fix: `textAnchor="end"` spiegeln, sobald
  `xquer > 0,75·X_HI`, und im Gleichheitsfall nur eine Marke beschriften.
- [MINOR] `S114.mdx:355-362` — Die Konsolidierung nennt alle sechs Zahlen
  (3,3611 / 4,9167 / Lücke 1,5556 / 6,8273 / 1,2676 / 1,3540). Die
  Selbsttest-Zahlfrage `S114.mdx:902-910` (`loesung=1.5556`) ist damit ohne das
  Widget beantwortbar. H4.
- [NOTE] `S114Jensen.tsx:115` — Die Kurve wird auf `yMax*1.2` geklemmt und dann
  außerhalb der Tafel gezeichnet; für x² und eˣ läuft sie oben rechts über den
  Rahmen hinaus, bevor das SVG sie abschneidet.
- [NOTE] `S114.mdx:359-360` — Bei der Wurzel dreht die Prosa die Lesereihenfolge
  um („1,2676 gegen 1,3540"), während die beiden konvexen Fälle davor
  „f(Mischung) gegen Mischung der Werte" nennen. Die Umkehrung ist gewollt, wird
  aber nicht gesagt.
- Gut: fünf Presets, die die Fallunterscheidung sind, inklusive „alle Regler
  null" (Normierung undefiniert) und „x₁ und x₃ je zur Hälfte", das mit Lücke
  2,25 tatsächlich das Maximum über das Reglerraster trifft (nachgerechnet); der
  x²-Zweig nennt den mathematischen Grund (gewichtete Varianz) statt nur des
  Messwerts.
- F1/F6: `S114Jensen.tsx:40-48` — „historische Notiz", kein Skript. Alle
  Headerzahlen nachgerechnet ✓ (x̄ = 11/6, x²: 3,3611/4,9167, eˣ:
  6,2547/13,0820, √x: 1,3540/1,2675).

## S115Landschaften.tsx — Landschaften (11.5)

Landschaften — STATIC — Richtige Wahl (Nebeneinander-Vergleich statt
Interaktion), aber die Tafeln stehen nicht nebeneinander und der Kasten behauptet
Interaktivität.

- [MAJOR] `S115Landschaften.tsx:150` / `S115.mdx:302-309` — `basis-[19rem]`
  (304 px) passt dreimal nicht in die Inhaltsspalte: im Render bei **1300 px**
  stehen zwei Tafeln nebeneinander und die dritte darunter (im
  Startzustand-Screenshot `…-08-…-drei-landschaften-nebeneinander.png`
  nachgemessen). Der Kastentitel „Drei Landschaften nebeneinander" und die
  Ortsangaben der Konsolidierung („Die mittlere Tafel", „Links steht", „Rechts
  ist die Konvexität verletzt") passen damit nicht zum Bild — die „rechte" Tafel
  liegt unten links. Fix: `basis-[13rem]` oder ein `grid-cols-3`-Layout, sonst
  die Ortsangaben durch die Tafeltitel ersetzen.
- [MINOR] `S115Landschaften.tsx:133-134` — Der Unterschied zwischen „globales
  Minimum" und „nur lokales Minimum" wird ausschließlich über die Farbe
  transportiert (orange #E69F00 gegen rot #D55E00), zwei benachbarte Töne, an
  Punkten mit r ≈ 4 px. E3 verlangt ein zweites Merkmal. Fix: unterschiedliche
  Marker-Form oder ein Kürzel („lok." / „glob.") an den Punkten.
- [MINOR] `S115Landschaften.tsx:112-116` — Die Plateau-Tafel setzt drei einzelne
  orange Punkte bei −0,8, 0 und 0,8, obwohl das ganze Intervall minimiert. Das
  Bild suggeriert drei isolierte Minima; die Bildunterschrift muss das
  geraderücken. Fix: das Intervall als dickes orangefarbenes Segment zeichnen.
- [MINOR] `S115.mdx:296` — Der Kasten trägt das Etikett „INTERAKTIV", das Widget
  hat aber weder Regler noch Knopf noch Verdikt (im Browser nachgezählt: 0
  `input[type=range]`, 0 `button`, 0 `role="status"`). Fix: als statische Tafel
  ohne `:::interaktiv` setzen, wie `KonvexKonkavPanels` in 11.3.
- F1/F6: `S115Landschaften.tsx:40-52` — „historische Notiz", kein Skript.
  Nachgerechnet ✓: kritische Punkte −1,1309 (f = 1,9298), −0,1699 (Höcker),
  1,3008 (f = −0,5139); Plateau f(2,2) = 3,92; Schüssel f(2,2) = 3,872.

## S115Landschaften.tsx — AbstiegsBecken / AbstiegsBeckenSchaetzung (11.5)

AbstiegsBeckenSchaetzung — KEEP — Der Zweigwechsel sitzt exakt an der beworbenen
Stelle; die Auflösung steht wieder schon in der Prosa.

- [MAJOR] `S115.mdx:326` — „Wie das Widget zeigt, trennt der Höcker bei
  $-0{,}1699$ die beiden Einzugsbereiche." Das ist die Lösung der Schätzfrage
  (`S115Landschaften.tsx:323-329`, `loesung={DW_HOECKER}`), und der Satz steht im
  selben Kasten; per CDP in Phase „tippen" im Kastentext nachgewiesen. Das
  `verdeckt`-Feld (Z. 331-337) wiederholt ihn danach. C7 verletzt. Fix: Zahl nur
  in `verdeckt`, in der Prosa die Frage.
- [MINOR] `S115.mdx:584-592` — Die abschließende Selbsttestfrage („Im
  Abstiegs-Widget landet ein Lauf, der bei x₀ = −0,16 startet, im tiefen Tal
  rechts") ist sichtbar, das zugehörige Widget steckt aber in der
  `::::vertiefung` `S115.mdx:312-335`. A8: sichtbare Prosa darf nicht von
  eingeklapptem Inhalt abhängen. Fix: Frage in die Vertiefung verschieben oder
  das Widget in einen offenen Kasten heben.
- [MINOR] `S115Landschaften.tsx:229-237` — x₀ ist ein Punkt auf der gezeichneten
  Kurve, lässt sich aber nur über einen Regler bewegen; `Plot` bietet keinen
  Ziehpfad. C1 bevorzugt die direkte Manipulation, der Regler bleibt als
  Doppelpfad.
- Gut: der Zweigwechsel wurde per CDP an der Wasserscheide verifiziert
  (x₀ = −0,17 → „Im flachen Tal hängengeblieben", x₀ = −0,16 → „Im tiefen Tal
  gelandet"), und `nahAmHoecker` (Z. 219-221) blendet den Satz „ein einziger
  Reglerschritt kippt das Ergebnis" nur dort ein, wo er stimmt. Genau diese
  Zustandsklasse verlangt F8.
- F1/F6: „historische Notiz", kein Skript; nachgerechnet ✓: Endwerte −1,13090
  bzw. 1,30084, und über die 441 Reglerstellungen kippt das Ergebnis genau
  einmal.

---

## Kapitel-Fazit (H1–H6)

**H1 Widget-Dichte.** 9 Kästen auf 5 Abschnitte, höchstens zwei je Abschnitt, die
Zusatzstücke (Konvexkombinations-Explorer, Abstiegsbecken) liegen in
Vertiefungen. Kein Stapeln, kein Sandkasten. ✓

**H2 Dramaturgie.** Baustein (Konvexkombination) → Mengen → Projektion und
Funktionen → Rechenregeln → Landschaften; jede Mechanik wird isoliert eingeführt,
bevor sie kombiniert wird. ✓

**H3 Farbrollen.** Durchgehend nach dem Bauauftrag („KAPITEL 12" in
KONVENTIONEN.md). Eine Rolle ist unbenannt: In 11.5 trägt Rot das *nur lokale*
Minimum, während es im übrigen Kapitel „Gegenbeispiel/Verletzung" bedeutet. Das
ist verwandt, aber nicht dasselbe; ein Satz im Bauauftrag würde die Kollision
auflösen.

**H4 Selbsttest-Abdeckung.** Alle fünf Abschnitte schließen mit einem Quiz, vier
davon mit einer Widget-Frage — aber **in vier von fünf Fällen steht die Antwort
wörtlich in der sichtbaren Konsolidierung desselben Kastens** (7 Extrempunkte und
Fläche 7,46; Eigenwerte 0 und 2; Sehnenstreifen 1,891; Jensen-Lücke 1,5556). Die
Fragen sind damit nicht widget-abhängig. Einzige saubere Ausnahme:
`S112.mdx:211` (λ = 0,38 am Kreisring).

**H5 Ältere Generation.** Keine. Alle acht Dateien tragen einen vollständigen
`/** … */`-Header mit „DIE EINE EINSICHT", Farbrollen und Provenienz; kein
`Math.random`, keine Idle-Schleife, kein minifizierter Einzeiler, keine
hartcodierten Satznummern (durchgehend `num()`/`ref()`). Im Render-Pass bei
390 px kein kollabiertes SVG (alle Haupttafeln 282–316 px breit) und kein
horizontaler Seitenüberlauf (`scrollWidth == clientWidth == 390`); 0 `merror`.

**H6 Länge.** Die Konsolidierungen sind mit 4–8 Sätzen doppelt so lang wie die
geforderten 2–4 und wiederholen dabei genau die Sätze, die in den
`verdeckt`-Blöcken schon stehen (S111, S115) oder als Verdikttext im Widget
(S112, S114). Ein Kürzungsdurchgang, der die Auflösung nur an einer Stelle
stehen lässt, würde H4 und H6 in einem Zug reparieren.

### Die drei lohnendsten Sammelfixe

1. **Schätzfragen-Spoiler und Selbsttest-Spoiler** (S111, S113, S114, S115,
   S112): Auflösungszahlen aus der sichtbaren Konsolidierung in `verdeckt` bzw.
   in die Quiz-Antwort verschieben. Vier MAJOR/MINOR-Befunde in einem Handgriff.
2. **`S112PsdKegel.tsx:133-146`**: das b = 0-Polygon reparieren. Es ist der
   einzige Befund des Kapitels, der ein falsches mathematisches Bild lehrt.
3. **Presets, die den Zustandsraum abkürzen** (`S112KonvexTest.tsx:281-286`) und
   **Layout, das die Prosa Lügen straft** (`S115Landschaften.tsx:150`): beide
   nehmen dem Leser die Handlung, die das Widget rechtfertigt.

### Numerik-Ehrlichkeit (F1/F6) auf einen Blick

| Datei | Klassifikation |
|---|---|
| S111Huelle.tsx | historische Notiz, kein Skript — Zahlen von mir bestätigt |
| S111Konvexkombination.tsx | historische Notiz, kein Skript — bestätigt |
| S112KonvexTest.tsx | historische Notiz, kein Skript — bestätigt |
| S112PsdKegel.tsx | historische Notiz, kein Skript — Zahlen bestätigt, Bild falsch |
| S113Projektion.tsx | historische Notiz, kein Skript — bestätigt |
| S113Sehne.tsx | historische Notiz, kein Skript — bestätigt |
| S114Jensen.tsx | historische Notiz, kein Skript — bestätigt |
| S115Landschaften.tsx | historische Notiz, kein Skript — bestätigt |

**8 von 8** Dateien behaupten Zahlen ohne committetes Prüfskript unter
`scripts/verify/`. Inhaltlich ist keine dieser Zahlen falsch; es fehlt
ausschließlich der maschinelle Nachweis. Ein einziges Skript
`scripts/verify/K11/verify-konvexitaet.mjs`, das die acht Zahlenblöcke
nachrechnet (Hüllenfolge, Baryzentrik, λ-Grenzen, Eigenwerte der fünf Presets,
Projektionen, Sehnendefekte, Jensen-Lücken, Abstiegsendpunkte), würde die
Kapitelschuld auf einen Schlag tilgen — die Rechnungen dafür stehen alle schon
in den Headern.
