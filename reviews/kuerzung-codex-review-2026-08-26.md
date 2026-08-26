Die gravierendste Änderung ist die Definition des Tensorprodukts: Die universelle Eigenschaft wurde aus der Definition entfernt und optional gemacht. Daneben verweisen mehrere sichtbare Abschnitte und Selbsttests auf eingeklappte Inhalte.

## Befunde

1. **[Kat. 3 – kritisch] [S94.mdx:18](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/09-tensoren/S94.mdx:18)** — Die neue Definition
   > „Das *Tensorprodukt* … ist der von ihren Bildern erzeugte Vektorraum“

   ist mathematisch nicht ausreichend. Spann plus beliebige bilineare Abbildung charakterisieren das Tensorprodukt nicht; die universelle Eigenschaft ist Teil der Definition, keine „zusätzliche Forderung“ in einer optionalen Vertiefung. Der Text widerlegt seine eigene Definition sogar in Zeile 54 mit der Nullabbildung. Dadurch stehen auch @satz:tensorproduktbasis und seine Dimensionsaussage auf einer im Haupttext falschen Grundlage.

2. **[Kat. 4 – hoch] [S121.mdx:676](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/12-optim/S121.mdx:676)** — Der gesamte Satz
   > `:::satz[#konvergenzrate-der-fixpunktiteration ...]`

   steht in `:::vertiefung[Fixpunktiteration erster Ordnung]`, wird aber im sichtbaren Selbsttest bei [S121.mdx:937](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/12-optim/S121.mdx:937) und [S121.mdx:951](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/12-optim/S121.mdx:951) vorausgesetzt. Dort werden sogar der affine Fall und die Lokalität seines Beweises abgefragt.

3. **[Kat. 1 – hoch] [S103.mdx:325](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/10-differentialrechnung/S103.mdx:325)** — Der sichtbare Widget-Text fragt
   > „Und trifft der Flächenfaktor aus @bemerkung:wie-stark-die-flaeche-verzerrt-wird wirklich zu …?“

   Die Bemerkung mit Definition und Herleitung des Flächenfaktors steckt nun in der geschlossenen Vertiefung ab Zeile 303. Auch die sichtbare Auswertung in Zeile 347 und der Selbsttest in Zeile 693 hängen daran.

4. **[Kat. 1 – hoch] [S103.mdx:676](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/10-differentialrechnung/S103.mdx:676)** — Der sichtbare Selbsttest verlangt den Kostenvergleich
   > „1200 und … 10 500 Multiplikationen“

   aus `@bemerkung:wie-die-kette-ausgewertet-wird`; diese Bemerkung und das zugehörige Backprop-Widget stehen vollständig in der Vertiefung ab Zeile 561.

5. **[Kat. 1 – hoch] [S92.mdx:422](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/09-tensoren/S92.mdx:422)** — Zwei sichtbare Selbsttests zitieren eingeklappte Beispiele:

   - `@beispiel:ein-farbbild-als-tensor-der-stufe-3` in Zeile 427,
   - `@beispiel:feature-maps-eine-abbildung-von-tensoren` in Zeile 441.

   Beide Ziele liegen in `:::vertiefung[Bilder, Stapel und Feature-Maps im Detail]` ab Zeile 285.

6. **[Kat. 1 – hoch] [S107.mdx:853](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/10-differentialrechnung/S107.mdx:853)** — Der sichtbare Selbsttest zur Voraussetzung „offen und konvex“ verweist in Zeile 861 auf `@bemerkung:warum-die-menge-offen-und-konvex-sein`; beide Gegenbeispiele wurden in die Vertiefung ab Zeile 526 verschoben.

7. **[Kat. 1 – hoch] [S107.mdx:864](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/10-differentialrechnung/S107.mdx:864)** — Der sichtbare Selbsttest zu Cramér–Rao und ML-Asymptotik zitiert in Zeile 872 `@bemerkung:cramer-rao-sauber-formuliert`, die nun in der Vertiefung ab Zeile 666 liegt. Ohne Aufklappen wird neues, im Haupttext nicht hergeleitetes Material geprüft.

8. **[Kat. 1 – hoch] [S114.mdx:687](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/11-konvexitaet/S114.mdx:687)** — Der sichtbare Haupttext behauptet
   > „Am Knick dagegen gibt es viele, wie @beispiel:das-subdifferential-des-betrags zeigt.“

   Das Beispiel liegt erst innerhalb der Vertiefung ab Zeile 702. Sichtbare Folgeabschnitte verwenden es weiter, etwa [S115.mdx:120](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/11-konvexitaet/S115.mdx:120) für die LASSO-Schwellenwertregel und [S115.mdx:542](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/11-konvexitaet/S115.mdx:542) im Selbsttest. Dasselbe gilt dort für die eingeklappte Randpunkt-Bemerkung.

9. **[Kat. 1 – mittel] [S108.mdx:730](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/10-differentialrechnung/S108.mdx:730)** — Die Lösung des sichtbaren Selbsttests sagt:
   > „Getragen wird der Schluss von der Stetigkeit … (@bemerkung:warum-hier-die-integralform-steht).“

   Genau diese Begründung steht jetzt innerhalb der Beweisvertiefung und ist ohne Aufklappen nicht verfügbar.

10. **[Kat. 1 – mittel] [S64.mdx:449](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/06-svd/S64.mdx:449)** — Sichtbarer Stoff und Selbsttest hängen von der eingeklappten Ellenbogen-Heuristik ab:

    - „Schnell abfallende Singulärwerte“ verweist in Zeile 453 darauf,
    - der Selbsttest in Zeile 615 verlangt ihre drei Falltypen,
    - [S65.mdx:94](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/06-svd/S65.mdx:94) erklärt, Kriterien und Heuristik stünden dort.

11. **[Kat. 1 – mittel] [S133.mdx:484](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/13-funktionsapproximation/S133.mdx:484)** — Der sichtbare Text
    > „Der Weg über die Knotenwahl setzt allerdings voraus … (@bemerkung:ein-ausweg-die-knoten-anders-legen)“

    verweist auf die unmittelbar davor geschlossene Chebyshev-Vertiefung. Auch die sichtbare Kapitelzusammenfassung [S139.mdx:491](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/13-funktionsapproximation/S139.mdx:491) setzt diese eingeklappte Bemerkung voraus.

12. **[Kat. 1 – mittel] [S104.mdx:269](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/10-differentialrechnung/S104.mdx:269)** — Das sichtbare Widget führt als Voreinstellung
    > „die Diagonalmatrix aus @beispiel:die-jacobi-formel-an-einem“

    an. Das Beispiel samt Erklärung der Singularität bei \(x=0\) wurde in die Vertiefung ab Zeile 194 verschoben; die Widget-Auswertung in Zeilen 278–282 baut darauf auf.

13. **[Kat. 4 – mittel] [S75.mdx:210](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/07-kq/S75.mdx:210)** — `@satz:symmetrie-und-orthogonalitaet` liegt in einer Vertiefung, wird aber im sichtbaren Householder-Widget aus [S75Local.tsx:423](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/07-kq/widgets/S75Local.tsx:423) zitiert.

14. **[Kat. 4 – mittel] [S104.mdx:479](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/10-differentialrechnung/S104.mdx:479)** — `@satz:gradienten-der-completion` liegt innerhalb der Matrix-Completion-Vertiefung und wird aus [S104Completion.tsx:291](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/10-differentialrechnung/widgets/S104Completion.tsx:291) und Zeile 332 referenziert. Damit zeigt die Widget-Ausgabe auf einen Satz in verborgenem Inhalt.

15. **[Kat. 2 – mittel] [S23.mdx:98](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/02-algos/S23.mdx:98)** — Der zusammengezogene `::why`-Text enthält einen klaren Satzbruch:
    > „… vernachlässigbar. der Speicheraufwand des Satzes zählt …“

    Nach dem Punkt ist `der` kleingeschrieben; außerdem wurden zwei vorher getrennte Beweisschritte ohne sauberen Übergang zusammengefügt.

16. **[Kat. 2 – niedrig] [S71.mdx:368](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/07-kq/S71.mdx:368)** — Durch die Kürzung fehlt das Verb:
    > „Zur Probe die angepassten Werte und das Residuum:“

    Vorher stand hier „Zur Probe berechnen wir …“.

17. **[Kat. 2 – niedrig] [S34.mdx:199](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/03-matrix-spur-norm/S34.mdx:199)** — Der Listeneintrag endet ungrammatisch vor der Displayformel:
    > „**Nuklearnorm** …: die Summe der Singulärwerte,“

    Hier braucht es einen Doppelpunkt oder einen vollständigen Satz.

18. **[Kat. 6 – niedrig] [S76.mdx:183](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/07-kq/S76.mdx:183)** — Englischer Begriff mitten im deutschen Satz:
    > „Verfahren wie truncated SVD“

    Im Skript wird sonst bereits „abgeschnittene SVD“ verwendet.

19. **[Kat. 6 – niedrig] [S124.mdx:439](/home/fabians/lehre/FMM/fmm-lmu/skript/src/chapters/12-optim/S124.mdx:439)** — Neu eingeführtes englisches Wort im Directive-Titel:
    > `:::vertiefung[Beweis: das Update erfüllt die Sekantenbedingung]`

    „Aktualisierung“ oder „BFGS-Aktualisierung“ hält den Titel deutsch.

Keine Befunde zu falsch geschlossenen oder versehentlich zu weit reichenden Fences. Ebenso keine neu eingeführten Em-Dashes `—` und keine Mathematik/Backticks in Directive-Labels.

## Zählung

- Kategorie 1, versteckte/dangling Abhängigkeiten: **10**
- Kategorie 2, grammatisch beschädigte Kürzungen: **3**
- Kategorie 3, mathematisch veränderte Aussage: **1**
- Kategorie 4, referenzierte Sätze/Definitionen in Vertiefungen: **3**
- Kategorie 5, falsche Fence-Nestung: **0**
- Kategorie 6, Stil: **2**

**Insgesamt: 19 Befunde.**

## Die 10 wichtigsten Korrekturen

1. Universelle Eigenschaft wieder in die Tensorproduktdefinition aufnehmen.
2. Fixpunktiteration und ihren Konvergenzsatz aus der Vertiefung holen oder die sichtbaren Selbsttests entfernen.
3. Flächenfaktor-Bemerkung vor das sichtbare Linearisierungs-Widget stellen.
4. Backprop-Kostenvergleich sichtbar machen oder den darauf beruhenden Selbsttest verschieben.
5. Farbbild-/Feature-Map-Selbsttests nicht auf eingeklappte Beispiele stützen.
6. Die beiden S107-Selbsttests samt benötigten Voraussetzungen gemeinsam sichtbar oder gemeinsam optional machen.
7. Subdifferential-des-Betrags und Randpunktmaterial sichtbar machen, da Kapitel 11 und der Selbsttest darauf aufbauen.
8. Ellenbogen-Heuristik sichtbar machen oder alle sichtbaren Verweise und Prüfungsfragen darauf entfernen.
9. Chebyshev-Knoten nicht nur eingeklappt erklären, wenn die sichtbare Kapitelbilanz sie als zentrale Alternative nennt.
10. Die drei referenzierten Sätze aus Vertiefungen holen, mindestens `@satz:konvergenzrate-der-fixpunktiteration`.