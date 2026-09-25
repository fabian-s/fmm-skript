# Fix-Log Kapitel 11 — Konvexität (2026-08-29)

Grundlage: `reviews/widget-didactic-review-2026-08-29/11-konvexitaet.md`.

Verifikation: ein neues konsolidiertes Prüfskript
`scripts/verify/REV29/11-konvexitaet.mjs` (grün, von `npm run verify:numbers`
über die Verzeichnisrekursion in `scripts/verify/run-all.mjs` automatisch
erfasst) und ein eigener CDP-Pass auf einem Dev-Server (Port 4185) bei 1300 px
und 390 px, mit Interaktionssequenzen je Kasten. Der Preview-Server auf 4179
zeigt einen älteren Build und wurde nicht benutzt.

Das Skript ist widerlegbar: Setzt man die b = 0-Randkurve auf den Stand vor dem
Fix zurück, schlägt „die gezeichnete Fläche muss das PSD-Kriterium treffen"
fehl (geprüft).

---

## S112PsdKegel.tsx — PsdKegel (Kasten 4) — der CRITICAL

**Umgesetzt:** CRITICAL `:133-146`. Für b = 0 entartet die Hyperbel c = b²/a zu
den beiden Achsen; das Widget tastete sie aber weiter als Kurve ab und bekam
nur die Strecke c = 0 von a ≈ 0 bis a = 4, aus der zusammen mit der Ecke (4, 4)
das Dreieck {0 ≤ c ≤ a} wurde. `randPunkte` bekommt jetzt einen eigenen
b = 0-Zweig mit dem L-förmigen Rand (0, A_HI) → (0, 0) → (A_HI, 0); die
Schlusskante des Polygons läuft damit in beiden Fällen entlang c = A_HI.
Zusätzlich MINOR `:104-114` (Drei-Zustands-Regel: neuer Zweig „positiv definit,
aber schlecht konditioniert" für κ = λ₂/λ₁ > 20, der die Einheitsmatrix nicht
und A = (1; 0,95; 0,95; 1) mit λ_min = 0,05 sehr wohl trifft), MINOR `:376-382`
(die Koordinatenerklärung der 3D-Tafel wandert in den Absatz vor dem Kasten,
im Widget bleibt eine Legendenzeile), MINOR `S112.mdx:465` (die Eigenwerte
0 und 2 stehen nicht mehr in der Konsolidierung, die Selbsttest-Zahlfrage
`S112.mdx:477` ist damit wieder widget-abhängig — die Tabelle im Widget führt
Determinante und Eigenwerte mit).

**Rationale:** Drei der fünf Voreinstellungen haben b = 0, und in allen dreien
zeigte das Bild eine falsche Menge — bei der Einheitsmatrix sah (1, 1) sogar
wie ein Randpunkt aus, also wie eine singuläre Matrix. Das war der einzige
Befund des Kapitels, der eine falsche Mathematik lehrt. Im Browser
nachgewiesen: A = diag(1, 3) liegt jetzt bei 1300 px und 390 px sichtbar im
blauen Gebiet (Punkt-in-Polygon auf den echten SVG-Koordinaten geprüft).

## S111Huelle.tsx — HuellenSchaetzung (Kasten 1)

**Umgesetzt:** MAJOR `S111.mdx:268-273` (die Liste „k = 5, 6, 8, 9, 10, 11
und 12" und der Satz „sieben der vierzehn Punkte" sind aus dem sichtbaren
Kastentext verschwunden; die k-Liste steht nur noch im `verdeckt`-Feld, die
Sieben gar nicht mehr — das Widget zeigt die Extrempunktzahl selbst), MINOR
`S111.mdx:238` („Das Widget im nächsten Kasten" statt „Das zweite Widget
unten"), MINOR `S111Huelle.tsx:327-333` (die Doppelung mit der MDX-Prosa ist
durch das Verschieben von selbst weg).

**Rationale:** Beide Auflösungen standen in der Phase „tippen" sichtbar über
dem Eingabefeld, und die Selbsttest-Zahlfrage (Lösung 7) war damit ohne das
Widget beantwortbar. Jetzt muss der Leser den Regler bis k = 14 schieben und
die Extrempunkte zählen — genau die Handlung, die der Kasten verspricht.

**Offen:** NOTE `:113` (Voreinstellung k = 4 zeigt den „alles bleibt"-Zweig)
und NOTE `:296-297` (toter Zweig „und weitere") — beides NOTE, nicht umgesetzt.
Der tote Zweig ist im Prüfskript ausdrücklich als solcher festgehalten (über
diese Punktliste fällt nie mehr als eine Ecke pro Schritt).

## S111Konvexkombination.tsx — KonvexkombinationsExplorer (Kasten 2)

**Umgesetzt:** MINOR `:325` (die Regler heißen jetzt „Gewicht w₁ (unnormiert)"
usw. statt „Regler x₁" — dasselbe Symbol wie in Prosa und Tabelle), MINOR
`:151, 394` (dritter Verdikt-Titel „Genau der Schwerpunkt (1; 2/3)", erkannt
über die KONTROLLIERTEN Rohwerte `roh[0] === roh[1] === roh[2]`, während die
Toleranzabfrage nur noch „Nahe am Schwerpunkt" trägt).

**Rationale:** Der Reglername ließ vermuten, man bewege die Ecke x₁ statt ihres
Gewichts. Und die Voreinstellung w = (1, 1, 1) trifft den Schwerpunkt exakt;
sie als „nahe" zu verkaufen war genau der Toleranz-als-Gleichheit-Fehler, den
die Drei-Zustands-Regel verbietet — nur in die andere Richtung.

**Offen:** NOTE `:158-159` (`istAktiv` auf Rohwerten), NOTE
`S111.mdx:281-378` (Kernwidget in einer Vertiefung) — beides NOTE.

## S112KonvexTest.tsx — KonvexTest (Kasten 3)

**Umgesetzt:** MAJOR `:281-286`. Jede der vier Mengen hat jetzt ein zusätzliches
`startPaar`, das der Mengenknopf setzt: ein Paar, dessen Strecke ganz in der
Menge bleibt. Das Gegenbeispiel liegt weiterhin hinter dem Knopf
„Gegenbeispiel setzen" (`paar`), und die sorgfältig gebaute Startlage
(Ring, Probe bestanden) ist damit über den Ring-Knopf wiederherstellbar. Dazu
MINOR `S112.mdx:46-49` (die Prosa vor dem Kasten nennt jetzt die vier Mengen
und die Ringradien 0,8 / 1,2).

**Rationale:** Ein Klick auf „Kreisring" erledigte die Aufgabenzeile, bevor der
Leser etwas tat, und machte den eigens gebauten Knopf redundant. Jetzt ist der
Mengenwechsel eine Startlage und das Gegenbeispiel eine Entscheidung. Im
Browser für alle vier Mengen geprüft: nach dem Umschalten steht „Dieses Paar
besteht die Probe", nach dem Knopf „Geschafft: die Strecke verlässt die Menge".

**Offen:** NOTE `:217-251, 279` (`analysiere` ohne `useMemo`) — NOTE, und ein
Performance-Punkt, kein didaktischer.

## S113Projektion.tsx — ProjektionsWidget (Kasten 5)

**Umgesetzt:** MINOR `:478-483` (aus vier Sätzen Erklärprosa unter dem Verdikt
wird eine Legendenzeile), NOTE `:469-476` (D5: das Verdikt nennt jetzt zuerst
den mathematischen Grund — die Stützgerade und
@satz:kriterium-des-stumpfen-winkels — und erst danach die Stichprobe).

**Rationale:** Die Reihenfolge „720 abgetastete Randpunkte, deshalb eindeutig"
lehrt, Eindeutigkeit sei eine empirische Frage. Sie ist es nicht; die
Stichprobe bestätigt nur.

## S113Sehne.tsx — SehnenTest (Kasten 6)

**Umgesetzt:** MINOR `:503` (das Verdikt zitiert jetzt
@bemerkung:wie-wir-die-ungleichung-lesen aus 11.3 und nennt Definition 11.5.4
nur noch als Vorwärtsverweis), MINOR `S113.mdx:414-415` (die Zahl 1,891 steht
nicht mehr in der Konsolidierung; das Widget misst den roten Streifen selbst,
die Selbsttest-Zahlfrage `S113.mdx:524` ist damit widget-abhängig).

**Offen:** NOTE `:355` (`sehneAufGraph` prüft `< 1e−12` auf einem abgeleiteten
Float; praktisch unkritisch, weil die Reglerschrittweite den nächsten
erreichbaren Wert auf ≈ 2,5·10⁻³ hebt — der kontrollierte Test „beide
Endpunkte auf demselben Ast" wäre der saubere, ist aber ein Umbau der
Kurvenverwaltung), NOTE `:68-99` (Kurvenknöpfe tragen das Ergebnis als Namen).

## S113Sehne.tsx — KonvexKonkavPanels (statische Tafel bei Kasten 6)

**Umgesetzt:** MINOR `:538-564` (Inline-Legende unter der Vierertafel: blau
Graph, grün Sehne, rot Verletzung — die Tafel ist damit ohne die Prosa danach
lesbar und druckfähig; die Farbaufzählung in `S113.mdx:396-398` ist im Gegenzug
gestrichen, sie stand jetzt zweimal), MINOR `:546-548` (`grow` plus `w-full`
und `max-w-[280px]`: bei 1300 px wachsen die Tafeln von 190 px auf 219–280 px,
bei 390 px füllen sie die Spalte — beide Breiten per `getBoundingClientRect`
nachgemessen).

## S113Sehne.tsx — EpigraphSkizze (statische Tafel)

**Offen:** NOTE `:582-587` (Beschriftungen auf festen Pixelkoordinaten) — NOTE.

## S114Jensen.tsx — JensenExplorer (Kasten 7)

**Umgesetzt:** MINOR `:239-260` (die beiden Marken-Beschriftungen klappen mit
`textAnchor="end"` nach links, sobald x̄ über 75 % der Achse liegt; im
Gleichheitsfall — erkannt über `nurEiner`, also den kontrollierten Reglerfall
„ein Gewicht ist 1" — wird nur noch eine Marke beschriftet, „beide Seiten =
…"), MINOR `S114.mdx:355-362` (die sechs Zahlen sind aus der Konsolidierung
raus; sie nennt jetzt die Struktur — Lücke = gewichtete Varianz, Vorzeichen
dreht bei der konkaven Wurzel — und lässt die Werte dem Widget), NOTE
`S114.mdx:359-360` (die Umkehrung der Lesereihenfolge bei der Wurzel wird jetzt
ausgesprochen).

**Rationale:** „Σ wᵢ f(xᵢ) = 12" statt „= 12,25" ist ein abgeschnittener
Zahlenwert, also genau das, was ein Widget nicht tun darf; und die
Selbsttest-Zahlfrage (Lösung 1,5556) stand wörtlich darüber.

## S115Landschaften.tsx — Landschaften (Kasten 8)

**Umgesetzt:** MAJOR `:150` (`flex flex-wrap` mit `basis-[19rem]` wird zu
`grid grid-cols-1 sm:grid-cols-3`: bei 1300 px stehen alle drei Tafeln in EINER
Zeile, per CDP nachgemessen — x = 456 / 680 / 905 bei gleichem y, je 205 px
breit; bei 390 px stapeln sie sauber. Zusätzlich sind die Ortsangaben in
`S115.mdx:302-309` und in der Bildunterschrift durch die Tafeltitel ersetzt,
damit die Prosa auch im gestapelten Fall stimmt), MINOR `:133-134` (zweites
Merkmal neben der Farbe: die Punkte tragen jetzt „glob." bzw. „lok."), MINOR
`:112-116` (das Plateau ist ein durchgezogenes oranges Segment von −0,8 bis 0,8
statt dreier isolierter Punkte, mit der Marke „alle glob." — die
Bildunterschrift verweist darauf).

**Rationale:** Der Kastentitel hieß „Drei Landschaften nebeneinander", und im
Browser standen zwei nebeneinander und eine darunter; jede Ortsangabe der
Konsolidierung war damit falsch. Drei isolierte Punkte auf einem Plateau
lehren außerdem, es gebe dort drei Minima statt eines Intervalls.

**Entscheidung nötig:** MINOR `S115.mdx:296` — der Kasten trägt das Etikett
„INTERAKTIV", das Widget hat aber weder Regler noch Knopf noch Verdikt (0
`input[type=range]`, 0 `button`, 0 `role="status"`). Der Reviewvorschlag ist,
die Tafel wie `KonvexKonkavPanels` aus dem `:::interaktiv`-Kasten zu heben.
Das ist eine STATIC-Empfehlung und damit eine Editorial-Entscheidung des
Dozenten — nicht ausgeführt.

## S115Landschaften.tsx — AbstiegsBeckenSchaetzung (Kasten 9)

**Umgesetzt:** MAJOR `S115.mdx:326` (die Zahl −0,1699 steht nicht mehr im
sichtbaren Kastentext; sie steht nur noch im `verdeckt`-Feld der Schätzfrage,
im Browser vor und nach dem Auflösen geprüft), MINOR `S115.mdx:584-592` (die
Selbsttestfrage nennt jetzt die Vertiefung, in der das Widget steckt).

**Offen:** MINOR `:229-237` (x₀ ist ein Punkt auf der gezeichneten Kurve, lässt
sich aber nur über den Regler bewegen). Ein Ziehpfad hieße, `Plot` um eine
Ziehfläche zu erweitern — das ist ein Eingriff in `src/lib` und damit tabu.
**lib-Befund:** `src/lib/widgets/Plot.tsx` hat keine `surfaceProps`/
`handleProps`-Anbindung wie die handgebauten SVG-Tafeln; solange das so ist,
bleibt bei jedem `Plot`-Widget nur der Regler.

---

## Entscheidung nötig (STATIC-Kandidaten, nicht ausgeführt)

Das Review führt drei Widgets als **STATIC**. Alle drei sind Editorial-Fragen
des Dozenten und wurden nach der Scope-Politik nicht ausgeführt:

1. **`Landschaften` (Kasten 8)** — das einzige echte Änderungsverlangen: Der
   Kasten trägt „INTERAKTIV", das Widget hat aber 0 Regler, 0 Knöpfe und 0
   `role="status"` (im Browser nachgezählt). Vorschlag des Reviews: aus dem
   `:::interaktiv`-Kasten heben, wie `KonvexKonkavPanels` in 11.3. Das ändert
   die Kastenzählung des Kapitels von 9 auf 8 und damit alle boxIndexe
   danach — deshalb hier nur notiert.
2. **`KonvexKonkavPanels` (11.3)** — bereits als statische Vierertafel außerhalb
   eines Kastens gebaut; das STATIC-Verdikt bestätigt nur die vorhandene Wahl.
   Die beiden konkreten MINOR daran (Inline-Legende, feste 190 × 140 px) sind
   umgesetzt, siehe oben.
3. **`EpigraphSkizze` (11.3)** — ebenfalls schon statisch und im Review als
   „korrekt gewählte einzelne Figur" bestätigt; nichts zu entscheiden außer,
   ob sie so bleiben soll. Der einzige Befund daran ist ein NOTE.

## Zusammenfassung

- **Umgesetzt:** 1 CRITICAL, 3 MAJOR, 14 MINOR/NOTE.
- **Offen:** 6 NOTE (nicht umzusetzen laut Scope-Politik) und 1 MINOR
  (Ziehpfad im `Plot`, blockiert durch das `src/lib`-Verbot).
- **Entscheidung nötig:** 3 STATIC-Kandidaten (`Landschaften`,
  `KonvexKonkavPanels`, `EpigraphSkizze`) — nur beim ersten steht eine echte
  Änderung an, siehe Abschnitt oben.
- **Neues Prüfskript:** `scripts/verify/REV29/11-konvexitaet.mjs` löst den
  Vermerk „historische Notiz" in allen **acht** Dateien ab. Alle acht Header
  tragen jetzt Skriptpfad und Datum; die toten Pfade `rev123-widget.mjs` und
  `check-math-s125.mjs` sind entfernt.
- **Wortzahl** (gegen `git show HEAD:<datei>`): S111 −0,62 %, S112 +0,85 %,
  S113 −0,50 %, S114 −0,05 %, S115 +0,28 %. Budget ≤ +3 % eingehalten.
