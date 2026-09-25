# Fix-Log Kapitel 10 — Differentialrechnung

Umgesetzt am 2026-08-29 auf Branch `claude/widget-didactic-review-fgj2pk`.
Grundlage: `reviews/widget-didactic-review-2026-08-29/10-differentialrechnung.md`
(CRITICAL 2 · MAJOR 22 · MINOR 20 · NOTE 19).

**Bilanz:** 2 CRITICAL, 21 MAJOR und 16 MINOR umgesetzt; 1 MAJOR und 3 MINOR
offen (Begründung unten); 1 STATIC-Empfehlung als „Entscheidung nötig"
weitergereicht. Neun neue Prüfskripte unter `scripts/verify/REV29/10-*`; danach
zitiert kein Header des Kapitels mehr ein Skript, das es nicht gibt, und keiner
trägt mehr die Notiz „Skript nicht mehr vorhanden".

Wortzahl je MDX gegen `HEAD` (Ziel ≤ +3 %):
S101 −0,7 % · S102 +0,3 % · S103 −0,2 % · S104 −0,3 % · S105 −0,7 % ·
S106 −0,2 % · S107 ±0 % · S108 −1,1 % · S109 ±0 %.

---

## S101Konzeptkarte.tsx (10.1) — Kasten 1

- Umgesetzt: MINOR (hartcodierte Hexfarben → `FMM_COLORS.blau/violett/orange/rot`,
  Header-Farbrollen entsprechend). Der MAJOR zur Kantenzahl war vorab erledigt
  (Header + `HDR/verify-hdr.mjs`) und wurde nicht angefasst.
- Offen: NOTE zu den Gruppen-Keys `k10…k13` aus der alten Kapitelzählung —
  reine Umbenennung, berührt aber jeden Knoteneintrag; ohne Nutzen für den
  Leser.

Rationale: Die Karte hält sich jetzt an die Palette des Skripts, statt vier
Sonderfarben zu führen, die in keiner Legende auftauchen.

## S101Sekante.tsx (10.1) — Kasten 2

- Umgesetzt: MAJOR (`S101.mdx:248` — der Satz „halbieren wir die Schrittweite,
  so fällt der Restterm auf ein Viertel" ist ersatzlos gestrichen; er stand
  wörtlich schon im `verdeckt` der Schätzfrage). MINOR (Faktorzeile erscheint
  nur noch, wenn **beide** Restterme über dem Rauschen liegen — der Unsinn
  „Faktor 0,00" an der Stelle x = −h/3 ist weg). MINOR (fehlendes Leerzeichen
  vor `ref()`).
- Offen: NOTE zur `1e-12`-Erkennung — die nächste erreichbare Reglerstellung
  liegt sechzehn Größenordnungen darüber, praktisch folgenlos.
- F1/F6: neues Skript `10-differentialrechnung-S101S103S104.mjs`; es hat dabei
  eine falsche Headerzahl gefunden (Faktor beim Halbieren der kubischen Kurve:
  4,571 statt der behaupteten 4,4) und der Header ist korrigiert.

Rationale: Beim Tippen steht die Antwort nicht mehr daneben, und die Auflösung
zeigt keine sinnlose Kennzahl mehr an der einen Stelle, an der der Restterm
zufällig verschwindet.

## S102Gradient.tsx — Gradientenfeld (10.2) — Kasten 3

- Umgesetzt: MAJOR (Preset „Maximum" auf `Math.SQRT1_2` gesetzt; der kritische
  Punkt der zweiten Funktion ist damit **exakt** erreichbar — am Regler bleibt
  er es nicht, das Raster 0,05 trifft 0,70710678 nicht, deshalb der Knopf).
  MINOR (dritter Verdikt-Zweig „Gradient sehr klein": Richtung noch definiert,
  aber numerisch heikel, Höhenlinien weit auseinander; Schwelle relativ als
  0,05·‖∇f‖_max des Ausschnitts). MINOR (Höhenlinien bei 390 px: Opazität
  0,35 → 0,55, Strichbreite 0,9 → 1,1).

Rationale: Der beworbene Sonderfall „Gradient verschwindet" ist jetzt wirklich
erreichbar, und der Bereich davor bekommt eine eigene, ehrliche Beschreibung
statt derselben Aussage wie ein steiler Punkt.

## S102Gradient.tsx — RichtungsWidget (10.2) — Kasten 4

- Umgesetzt: **CRITICAL** (`:819-827`: die „Nulllinie" hatte identische y1/y2
  und wurde immer waagerecht gezeichnet. Jetzt ±(−g₂; g₁)/‖∇f‖, also ein
  echter Durchmesser senkrecht zum Gradientenpfeil; im Browser nachgemessen,
  Skalarprodukt exakt 0 für ∇f = (5;7), (0;−0,2), (−3;1), (2;0)). MAJOR
  (`S102.mdx:286`: die 50-%-Auflösung aus der Prosa entfernt, sie steht im
  `verdeckt`). MINOR (radiale Skala: gestrichelter Halbring bei ½‖∇f‖ plus
  Beschriftung ‖∇f(x)‖₂ mit Zahlenwert am Rand).

Rationale: An genau der Stelle, an der Bem. 10.2.5 anschaulich werden soll, sah
der Leser bisher ein falsches geometrisches Objekt. Der Kompass zeigt jetzt die
Senkrechte, die das Verdikt behauptet, und der Abstand vom Mittelpunkt ist
beschriftet.

## S102Gradient.tsx — AbstiegStepper (10.2) — Kasten 5

- Umgesetzt: MAJOR (der α*-Hinweis erscheint erst ab `aufgeloest`; die
  Komponente bekam das Flag ohnehin). MAJOR (`S102.mdx:465`: „hier α = 0,4" aus
  der Konsolidierung genommen). MAJOR (ρ ≈ 1 war unerreichbar: neuer Knopf
  „Grenzfall α = 2/λ_max" mit dem exakten Wert; das Verdikt hat jetzt vier
  Zweige — exakt ρ = 1 nur über den Knopf, „nahe am Grenzfall" für
  0,98 < ρ < 1,02, regulär, divergent).

Rationale: Die Schätzfrage lässt sich wieder schätzen, und der beworbene
Grenzfall ist erreichbar statt ein toter Zweig — exakt über den kontrollierten
Parameter, nicht über eine Toleranz auf einer abgeleiteten Zahl.

## S103Jacobi.tsx — JacobiFormWidget (10.3) — Kasten 6

- **Entscheidung nötig:** Das Review urteilt STATIC (vier Zustände, die eine
  2×2-Tafel gleichzeitig zeigen könnte; die Prosa verweist unmittelbar davor
  auf dieselbe Übersichtstabelle). STATIC/REMOVE führen wir nicht aus.

## S103Jacobi.tsx — LinearisierungsWidget (10.3) — Kasten 7

- Umgesetzt: MAJOR (`S103.mdx:340`: „auf ungefähr ein Viertel" ersetzt durch
  „schrumpft schneller als das Fenster selbst"; die Determinantenwerte 1,65 und
  5 sind aus der Prosa genommen — der Leser liest sie im Widget ab, und beide
  `zahlfrage`n bleiben widgetabhängig lösbar). MINOR (`:774`: der redundante
  Float-Zweig `restQuotient < 1e-9` im Verdikt-`kind` gestrichen; der exakte
  Fall läuft über `abb.linear`).
- Offen: MINOR zum abgeschnittenen `<M>`-Ausdruck bei 390 px — die Umstellung
  auf zwei Zeilen berührt den Formelsatz; der Wert steht ohnehin noch einmal im
  Verdikt, es geht nichts verloren.

Rationale: Die Schätzfrage („Faktor 4") und beide Selbsttestfragen sind wieder
Fragen; die Zahlen holt sich der Leser aus dem Widget.

## S103Backprop.tsx (10.3) — Kasten 8

- Umgesetzt: MINOR (der Knickhinweis ersetzt den Schrittkommentar nicht mehr,
  sondern hängt als zweiter Absatz daran — im Browser bei x₁ = 2 geprüft).
- Offen: NOTE zur `1e-12`-Erkennung des Knicks.

Rationale: Wer der Prosa folgt und x₁ = 2 einstellt, verliert nicht mehr die
Schritt-für-Schritt-Erzählung, um derentwillen das Widget gebaut ist.

## S104Identitaeten.tsx (10.4) — Kasten 9

- Umgesetzt: MINOR/Zustandsraum (Drei-Zustands-Regel: exakt singulär jetzt über
  den **kontrollierten** Reglerwert — neues Feld `singulaerBei` je Beispiel,
  x = 0 liegt auf dem 0,01-Raster —, dazu ein eigener Zweig „schlecht
  konditioniert" für |det F| < 0,05, der die Auslöschung benennt, statt sie wie
  einen regulären Punkt zu behandeln).
- F1/F6: neues Skript `10-differentialrechnung-S104Identitaeten.mjs`.

Rationale: Der Bereich zwischen „singulär" und „harmlos" hat jetzt eine eigene
Stimme, und die Erkennung hängt nicht mehr an einer Schwelle auf einem
gerechneten Float.

## S104Anstupsen.tsx (10.4) — Kasten 10

- Umgesetzt: MINOR (Grundmatrix auf [−20; 20] begrenzt und der Text von „hier
  stimmt etwas im Widget nicht" auf die wahre Ursache umgeschrieben: der
  zentrale Differenzenquotient löscht sich aus; `kind` von `fail` auf `warn`).

Rationale: Das Widget beschuldigt sich nicht mehr selbst, wo in Wahrheit
Auslöschung vorliegt — und der Fall lässt sich am Text lernen statt nur
auslösen.

## S104Completion.tsx (10.4, Vertiefung) — Kasten 11

- Umgesetzt: MAJOR (vierter Verdikt-Zweig „Der Verlust fällt nicht mehr, er
  pendelt" mit Erkennung über Schwankung und ausbleibenden Abstieg im Fenster
  der letzten zwanzig Schritte; im Browser bei α = 0,15, t = 200 geprüft: „L
  springt zwischen 1,110 und 1,812"). MAJOR (`S104.mdx:640`: die vier Zahlen
  2,5 / 2,4 / 1,583 / 0,909 aus der Konsolidierung genommen). MAJOR (A8: die
  beiden widgetabhängigen Selbsttestfragen sind in einen `::::quiz`-Block
  **innerhalb** der Vertiefung gewandert — dasselbe Muster wie in
  `S107.mdx:553`).
- Offen: MINOR zur Farbrolle der k = 2-Tafel (violett nur im Vergleichsplot).
  Betrifft die generische `Tafel`-Komponente des Widgets, nicht lokal billig.
- F1/F6: neues Skript `10-differentialrechnung-S104Completion.mjs`; es prüft
  die drei α-Regime, die Rang-1-Vorhersagen zusätzlich in geschlossener Form
  und das Pendel-Kriterium in beide Richtungen.

Rationale: Der Fall, den der Kasten ausdrücklich bewirbt, wird jetzt auch
erklärt; und Sichtbares hängt nicht mehr an Eingeklapptem.

## S105Merkregel.tsx (10.5) — statische Tafel, kein Kasten

- Umgesetzt: MINOR (die Vorschaukurven tragen die Farbe ihres eigenen Falls;
  die Sprungfunktion ist damit grau statt blau — Blau ist im Kapitel für
  Stetigkeit reserviert, und H ist in 0 gerade nicht stetig). Header:
  der Verweis auf `check-r4-claims.mjs` ist raus, der ±1-Nachweis zeigt auf das
  neue Zoom-Skript.

Rationale: Eine Farbe = eine Rolle gilt jetzt auch in den drei kleinen
Vorschaubildern.

## S105Zoom.tsx (10.5) — Kasten 12

- Umgesetzt: **CRITICAL** (`N = 601` → `600`, plus die Ausnahmestellen
  `kurve.knick` explizit in die Auswertungspunkte. Vorher zeigte das Widget bei
  |x| „0,9983 · w" statt 1 und bei √|x|, z = 12 „61,3894" statt 64; die
  `:::zahlfrage{loesung=1 toleranz=0.001}` war damit nicht lösbar. Im Browser
  nachgestellt: |x|, x₀ = 0, z = 12 zeigt jetzt „1,0000", und das Verdikt sagt
  „beim 1,0000-fachen"). MAJOR (`S105.mdx:211`: die vollständige Auflösung für
  alle drei Kurven aus der Prosa genommen; sie steht im `verdeckt`). MAJOR
  (toter Skriptverweis `check-s111.mjs` → neues Skript). MINOR (`width`/`height`
  am SVG: die Tafel misst jetzt 302 × 278 px statt gestreckter 654 px).
- F1/F6: `10-differentialrechnung-S105Zoom.mjs` rechnet D(w) für alle drei
  Kurven über die ganze Zoomleiter gegen die analytischen Werte w, 1 und 1/√w,
  prüft die Lösbarkeit der `zahlfrage` auf jeder Stufe und belegt als
  Gegenprobe, dass ein ungerades N genau den behobenen Fehler erzeugt.

Rationale: Die kanonische Zoom-Figur zeigt endlich die Zahl, um die es geht —
und der Selbsttest, an dem sie hängt, ist wieder lösbar.

## S106Kettenregel.tsx (10.6) — Kasten 13

- Umgesetzt: MINOR (`width`/`height` am SVG; die Tafel misst jetzt 384 × 249 px
  statt gestreckter 654 px). Header: `check-r4-claims.mjs` → neues Skript.
- Offen: zwei NOTE (kein predict-then-reveal; Erkennung des entarteten Falls
  ist bereits vorbildlich).

## S106Logistik.tsx (10.6, Vertiefung) — Kasten 14

- Umgesetzt: MAJOR (A8: die `zahlfrage{loesung=0,693147}` ist in den
  `::::quiz`-Block **innerhalb** der Vertiefung gewandert, wo das Widget steht).
  MAJOR (`S106.mdx:691`: „auf der Höhe log 2 = 0,693147" aus der Konsolidierung
  genommen; der Leser liest den Wert im Widget ab). MINOR (durchgängig „β" statt
  „beta": Reglerbeschriftung, Achsentitel, Readouts, Verdikttexte, aria-label).
- F1/F6: gemeinsames Skript `10-differentialrechnung-S106Kettenregel.mjs`
  (Kettenregel gegen Differenzenquotienten der verketteten Funktion, logistischer
  Gradient gegen den Differenzenquotienten von ℓ, Schranke |∇ℓ| < |x| auf einem
  Gitter).

Rationale: Prosa und Widget benutzen dasselbe Symbol, und die Selbsttestfrage
steht dort, wo das Widget steht, das sie voraussetzt.

## S107Hesse.tsx (10.7) — Kasten 15

- Umgesetzt: MAJOR (**Kollaps behoben**: `width`/`height` am `<svg>`,
  `min-w-0 grow basis-60` am Flex-Item. Per CDP nachgemessen: **340 × 316 px**
  bei 1300 px und **316 × 294 px** bei 390 px — vorher 51 × 47 px bei jeder
  Breite. Die drei Fragen der Prosa lassen sich damit am Widget beantworten).
  MAJOR (toter Verweis `check-math-s113.mjs` und der leere
  `assert.deepEqual([2,8],[2,8])` → neues Skript).
- Ausdrücklich erhalten: die mustergültige Drei-Zustands-Logik (`:274-284`) und
  die Sattel-Achsenbenennung.
- F1/F6: `10-differentialrechnung-S107Hesse.mjs` baut H über die
  Doppelwinkelformeln (nicht als Matrixprodukt wie das Widget), rechnet die
  Eigenwerte über die charakteristische Gleichung zurück, misst die Krümmungen
  entlang der Hauptachsen per zweiter Differenz und prüft Klassifikation,
  Halbachsen und Wertebereiche aller vier Presets.

Rationale: Die als „tot lesbare Hauptdarstellung" deklarierte Tafel ist wieder
lesbar; damit funktioniert das didaktisch stärkste Widget des Kapitels.

## S108Taylor1D.tsx (10.8) — Kasten 16

- Umgesetzt: MAJOR (`S108.mdx:294`: „um den Faktor 8,2" aus der Konsolidierung
  genommen). MINOR (das Verdikt nennt jetzt beide Formen: „auf ein 0,122-faches
  gedrückt, das ist der Faktor 8,2" — der Leser muss nicht mehr invertieren).
  Tote Verweise `rev-s114-a/d.mjs`, `check-s114.mjs` → neues Skript.
- Offen: NOTE zu `maxFehler` ohne `useMemo` (Kosten hier vernachlässigbar).

## S108Taylor2D.tsx (10.8) — Kasten 17

- Umgesetzt: MAJOR (das Widget verriet die Antwort im Grundzustand: Quotient im
  Readout und Merksatz „auf ein Viertel / auf ein Achtel" im Verdikt erscheinen
  jetzt erst ab `aufgeloest`. Im Browser geprüft: vorher steht dort nur
  „r = 0,80 → 0,26721, r/2 → 0,06155", nach dem Auflösen ergänzt um „Quotient
  4,34" samt Merksatz). MAJOR (`S108.mdx:513`: „Faktor 4,34 … und 8,07" aus der
  Konsolidierung genommen; die Faustzahl-Passage nennt jetzt ihre Quelle statt
  eines Zahlenwerts). Tote Verweise `rev-s114-b/f.mjs`, `check-s114.mjs` → neues
  Skript.
- F1/F6: `10-differentialrechnung-S108Taylor.mjs` deckt Taylor1D und Taylor2D
  ab; Gradient und Hesse-Matrix kommen aus zentralen Differenzen, T₂ auf der
  Quadrik zusätzlich aus der symbolischen Entwicklung. Die im Header behauptete
  Spanne des Quotienten (2,70 … 7,28 für T₁, 5,79 … 15,98 für T₂) wird als
  Hülle über den ganzen Reglerbereich geprüft.

Rationale: Aus einer Frage, deren Antwort schon dastand, wird wieder eine Frage.

## S108Newton.tsx (10.8) — Kasten 18

- Umgesetzt: MAJOR (**Kollaps behoben**, gleiches Muster: gemessen **282 × 266 px**
  bei 1300 px und ebenso bei 390 px — vorher 47 × 44 px. Der Weg der Iterierten,
  das grüne Ziel und die Höhenlinien sind wieder zu sehen). MAJOR
  (`S108.mdx:659`: „im fünften Schritt steht 1,1·10⁻¹⁵" und die Fehlerreihe aus
  der Konsolidierung genommen — beides war die Lösung von Schätzfrage und
  `zahlfrage{loesung=5 toleranz=0}`). MINOR (`aktuell.fehler === 0` durch eine
  Schwelle relativ zu ‖x*‖ ersetzt; die Zweiggrenzen bleiben dieselben:
  Schritt 5 zeigt weiter die Quadratik, Schritt 6 die Maschinengrenze).
  Tote Verweise `rev-s114-c.mjs`, `check-s114.mjs` → neues Skript.
- Offen: MINOR zur Fehlertabelle bei 390 px (die Spalte eₖ/eₖ₋₁² liegt im
  eigenen Scrollcontainer außerhalb des Bildes). Ein Spaltenwechsel für schmale
  Breiten ist mehr als ein lokaler Eingriff; der Befund bleibt offen.
- F1/F6: `10-differentialrechnung-S108Newton.mjs` löst das Newton-System mit der
  Cramerschen Regel aus numerisch bestimmten Ableitungen, prüft die Iterierten
  zusätzlich gegen die Heron-Folge, die Fehlerordnung, den Sattel-, den
  Singulär- und den Quadrik-Fall.

---

## Entscheidung nötig (nicht ausgeführt)

- `S103Jacobi.tsx:78-144` / `S103.mdx:130-141` — Review-Urteil **STATIC**:
  JacobiFormWidget durch eine statische Vierertafel ersetzen (n und m
  entscheiden die Gestalt; vier Zustände passen nebeneinander, und die Prosa
  verweist direkt davor auf dieselbe Übersichtstabelle). Editorial-Entscheidung
  des Dozenten.

## lib-Befunde

- Keine. Der `role="img"`-Befund über den Ziehflächen ist im Review bereits als
  unkritisch eingestuft (`useDrag`/`DragHandle` erzeugen keine fokussierbaren
  Ziele), und `src/lib` wurde nicht angefasst.

## Neue Prüfskripte (alle laufen grün, von `npm run verify:numbers` erfasst)

```
scripts/verify/REV29/10-differentialrechnung-S101S103S104.mjs
scripts/verify/REV29/10-differentialrechnung-S102Gradient.mjs
scripts/verify/REV29/10-differentialrechnung-S104Completion.mjs
scripts/verify/REV29/10-differentialrechnung-S104Identitaeten.mjs
scripts/verify/REV29/10-differentialrechnung-S105Zoom.mjs
scripts/verify/REV29/10-differentialrechnung-S106Kettenregel.mjs
scripts/verify/REV29/10-differentialrechnung-S107Hesse.mjs
scripts/verify/REV29/10-differentialrechnung-S108Newton.mjs
scripts/verify/REV29/10-differentialrechnung-S108Taylor.mjs
```

Zwei davon prüfen nicht nur Zahlen, sondern Quelltext: Das Zoom-Skript liest
`const N` und besteht auf einer geraden Zahl; das Gradienten-Skript liest die
vier Koordinatenausdrücke der Kompass-Nulllinie aus dem TSX und testet sie als
Vektor gegen den Gradienten (Skalarprodukt null). Beide hätten die zugehörigen
CRITICALs gefunden.

## Browser-Nachweis (eigener Dev-Server auf 4184, CDP 9333)

Gemessen und interagiert bei 1300 px und 390 px:
Tafelgrößen S107Hesse 340 × 316 / 316 × 294 px und S108Newton 282 × 266 /
282 × 266 px (vorher 51 × 47 bzw. 47 × 44 px bei jeder Breite); kein
horizontaler Überlauf der Seite bei 390 px; Kompass-Nulllinie senkrecht zum
Gradientenpfeil (Skalarprodukt 0, Mittelpunkt getroffen); Zoom-Widget |x|,
x₀ = 0, z = 12 zeigt 1,0000; Abstiegs-Verdikt ohne α*-Hinweis vor dem Auflösen
und mit exaktem ρ = 1 am neuen Knopf; Gradientenfeld-Presets „fast flach" und
„Maximum" liefern die beiden neuen Zweige; Completion bei α = 0,15 und t = 200
den Pendel-Zweig; Taylor2D-Readout ohne Quotient vor und mit Quotient nach dem
Auflösen; Backprop bei x₁ = 2 Schrittkommentar **plus** Knickhinweis;
Identitäten bei x = 0 / 0,05 / 1 die drei Zustände; Merkregel-Sprungkurve grau.
Keine `merror`-Knoten. In den betroffenen Kästen war in der Phase „tippen"
keine der neun Auflösungen mehr sichtbar.

`npx tsc --noEmit` läuft ohne Fehler; kein `.mdx-check.tsx` zurückgelassen.
