# Straffung Kap. 1 (01-intro): Bericht

Dateien: `src/chapters/01-intro/S11.mdx`, `S12.mdx`. Ausgangsstand gegen
21b998d geprüft: Beide Dateien waren unverändert, kein Vorgängerstand zu
übernehmen.

## 1. Zahlen (`zaehlen.mjs 01-intro`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S11 | 1318 → 1336 (+1,4 %) | 0 → 0 | 1318 → 1336 |
| S12 | 227 → 202 (−11,0 %) | 642 → 595 | 869 → 797 (−8,3 %) |
| **Summe** | **1545 → 1538 (−0,5 %)** | **642 → 595** | **2187 → 2133 (−2,5 %)** |

Richtwert Kap. 1 war −0 bis −10 %. Das Kapitel war schon schlank; S11 wächst
leicht, weil das vom Dozenten verlangte Leitprinzip und zwei kleine
Folienlücken (Tensoren im Themenüberblick, det(A) ≠ 0 in der Selbsttestlösung)
dazukamen. Die Kürzung liegt in S12 und in beiden Vertiefungen.

## 2. Kapitelentscheidung und Verlagerungen

- KERN (Folien 01-intro): Motivation, KQ-Beispiel mit den drei Problemen,
  Beispiel 1 Kondition, Beispiel 2 Komplexität, Themen/Beispiele 3–5 (in
  „Die drei Teile des Skripts"), Vorkenntnisse samt 3blue1brown-Empfehlung,
  beide Selbsttestfolien (8 Fragen). Alles bleibt im Haupttext.
- BRÜCKE: Leseanleitung „Wie dieses Skript funktioniert", Landkarte (Kasten).
- EXTRA: die zwei schon bestehenden Vertiefungen in S12 („Die Kapitel im
  Detail", „Was sich durch das ganze Skript zieht"). Beide bleiben Vertiefung
  und bleiben getrennt (je > 60 Wörter, eigenes Thema).
- Nichts neu verlagert. Umgestellt: In S11 steht das Beispiel
  `#komplexitaet-matrixmultiplikation` jetzt HINTER
  `#ein-schlecht-konditioniertes-problem`, in Folienreihenfolge (Beispiel 1
  Kondition, Beispiel 2 Komplexität). Vorher stand das Komplexitätsbeispiel
  ohne Überleitung zwischen der Problemliste und dem Satz „Wie stark das
  erste Problem …". IDs unverändert; die Nummern 1.1.1/1.1.2 tauschen, sobald
  der Orchestrator `gen:numbers` laufen lässt. Kein `@`-Verweis und kein
  Widget zeigt auf die beiden Beispiele.

## 3. Gestrichen / gestrafft

- S11 Einleitung: „Es geht also nicht um neue Statistik, sondern um …"
  (negative Parallele, „man") → „Die Leitfrage lautet: *Wie berechnen wir das
  schnell, speichersparend und zuverlässig?*"
- S11 Beispiel Kondition: „sie begleitet uns durch den ganzen ersten Teil"
  gestrichen (sagt der Teil-1-Absatz).
- S11 Beispiel Komplexität: Schlusssatz zur Statistik auf einen Satz verkürzt.
- S11 Leseanleitung neu geordnet: zuerst das Leitprinzip (Haupttext deckt die
  Vorlesung vollständig ab; gelbe Boxen „Vertiefung · optional" gehen darüber
  hinaus und lassen sich überspringen), dann Tooltips, Interaktiv-Kästen,
  Beweise, Literaturzeile in einem Absatz. Nichts zur Klausurrelevanz.
- S11 Selbsttest „lokales/globales Minimum": zwei Zusatzsätze zu einem
  zusammengezogen.
- S12 Einleitung: Ankündigung „Die folgende Karte zeigt diese Struktur."
  (Kasten folgt direkt) gestrichen.
- S12 Vertiefung „Die Kapitel im Detail": Zwischenüberschrift „### Die drei
  Teile des Skripts" gestrichen (gleichlautende h3 steht schon in 1.1, der
  Boxtitel reicht); die drei „Die Leitfrage: …"-Sätze gestrichen (die zu Teil 3
  stand wortgleich in 1.1); dreimal „des Skripts" auf einmal reduziert.
- S12 Vertiefung „Was sich durch das ganze Skript zieht": „Kondition gibt das
  Problem vor, Stabilität der Algorithmus" stand fast wortgleich in der
  Nachbarbox, jetzt ein Satz; „Einmaleins …, das sich einzuprägen lohnt" →
  „Die typischen Größenordnungen".
- S12 Literaturzeile: 3blue1brown-Hinweis gestrichen (steht als
  Folienempfehlung schon im Selbsttest von 1.1).
- Drei Gedankenstriche in den fetten Teil-Überschriften der Vertiefung durch
  Doppelpunkte ersetzt; Kapitel 1 hat jetzt keinen Gedankenstrich mehr.

## 4. Reparierte Fehler

- S11 Teil 1: „was einen guten Algorithmus ausmacht (Kondition, Stabilität,
  Komplexität)": Kondition ist eine Eigenschaft des Problems (so sagt es das
  Skript selbst in S12 und Kap. 4). Jetzt: „wie empfindlich ein Problem auf
  Störungen reagiert (Kondition) und was einen guten Algorithmus ausmacht
  (Stabilität, Komplexität)".
- S11 Tabelle Matrixmultiplikation: „Bester bekannter Algorithmus … O(n^2,373)"
  ist veraltet (2,373 ist der Stand von 2014; seit 2022 liegt die beste
  bekannte Schranke bei 2,371…, aktuell etwa 2,3713). Zeilenlabel jetzt
  „Asymptotisch schnellere Verfahren"; Zahlen und Exponent unverändert.
- S11 Teil 2: „Gradientenverfahren … finden Minima von Funktionen, die nicht
  konvex, hochdimensional … und nur häppchenweise auswertbar sind" → zwei
  Sätze; „suchen" statt „finden" (bei nichtkonvexen Funktionen nicht
  garantiert), Minibatch statt „häppchenweise" (Folienbegriff), SGD genannt.
- S11 Leseanleitung: Tooltip-Begriffe sind gepunktet, nicht gestrichelt
  unterstrichen (`decoration-dotted` in src/lib/tooltip); die Literaturzeile
  „Vertiefung: …" war sprachlich nicht von den Vertiefungsboxen zu
  unterscheiden, jetzt „Die kursive Zeile „Vertiefung: …"". „Die erste steht
  am Ende von 1.2" war ungenau (zwei Boxen, vor dem Selbsttest) → „die ersten
  beiden stehen in @sec:landkarte".
- S11 Selbsttest Invertierbarkeit: „Das setzt voraus, dass A quadratisch ist
  und vollen Rang hat; gleichwertig: …" mischte notwendige Bedingung und
  Äquivalenz → „Das geht nur für quadratisches A, und zwar genau dann, wenn A
  vollen Rang hat. Gleichwertig: det(A) ≠ 0, …" (det aus der Folienlösung).
- S11 Selbsttest Stetigkeit: x₀ war in der ε-δ-Formulierung ungebunden →
  „Formal, in jedem Punkt x₀: …" (wie die Folienlösung).
- S12 Einleitung und Vertiefung: „braucht kein einziges Ergebnis aus Teil 2"
  bzw. „setzt Teil 2 *nicht* voraus" widersprach der Karte im selben
  Abschnitt, die eine Kante Konvexität → Funktionsapproximation zeigt (so auch
  in slides-2627/concept-map.qmd: CONV → FA2); Kap. 13 verweist außerdem auf
  @sec:optim/beschraenkt und @sec:differentialrechnung/jacobi. Jetzt „braucht
  aus Teil 2 wenig". Die Liste „stützt sich auf die Kapitel 1, 4, 5, 7 und 9"
  ist beibehalten (passt zu den Verweisen in Kap. 13), jetzt als @num-Verweise.
- S12 Vertiefung: „warum Polynominterpolation scheitert" → „mit hohem Grad
  scheitern kann" (Runge betrifft hohe Grade bei ungünstigen Stützstellen).
- S12 Vertiefung: du-Imperativ „Wähle Algorithmen, …" entfernt; der
  Ellipsensatz „und schlecht konditionierte Schritte so früh wie möglich" hat
  jetzt ein Verb (Regel steht so in 04-fehler.qmd Z. 366/445).
- S12 Vertiefung Rechenaufwand: K und p in O(K^p) und ε in
  O(n² log(1/ε)) waren undefiniert; je ein Halbsatz ergänzt.
- Getippte Kapitelnummern auf Verweise umgestellt (Orchestrator-Lesson):
  S12 „Kapitel 3/4" → @kap:matrix-spur-norm/@kap:fehler, „nach den Kriterien
  aus Kapitel 4" → @kap:fehler, „aus Kapitel 7" → @kap:kq, „(Kapitel 2–9)" →
  „(Kapitel @num:algos bis @num:tensoren)", ebenso Teil 2 und 3.
- S12 Literaturzeile: Leerzeichen vor dem Punkt („sortiert .") entfernt.
- Kleinkram: „Matrix-Kalkül" → „Matrixkalkül", „Matrix-Zerlegungen" →
  „Matrixzerlegungen" (Mehrheitsschreibweise im Skript), „Wer hängt" → „Wer
  hängen bleibt".

## 5. Für den Dozenten / offene Fragen

1. **Farbe der Vertiefungsboxen.** Der Leitsatz sagt, wie vorgegeben, „die
   gelben Boxen mit der Marke „Vertiefung · optional"". Im PDF ist der Kasten
   grau mit dem Label „Vertiefung (optional):" (scripts/pdf/preamble.tex).
   Die ganze Leseanleitung ist web-bezogen (Tooltips, aufdeckbare Beweise);
   wenn das PDF mitgedacht werden soll, „gelben" streichen.
2. **Zahlen der Matrixmultiplikations-Tabelle (Folie „Beispiel 2").** Die
   Operationszahlen folgen nicht aus den Exponenten: n^2,373 ergibt bei
   n = 1000 etwa 1,3·10⁷ (Tabelle 2·10⁸) und bei n = 10 000 etwa 3,1·10⁹
   (Text 2·10¹⁰); der Schritt 2·10⁸ → 2·10¹⁰ entspricht Exponent 2. Der
   „Faktor 50" hängt an diesen Zahlen. Nicht geändert (Folienzahlen, Brief
   §5); ggf. mit der Folie gemeinsam korrigieren oder die Spalte als „mit
   Konstanten, grob" kennzeichnen.
3. **Kap. 8, fremde Datei:** `src/chapters/08-la-misc/S85.mdx` Z. ~79 sagt
   „Mit diesem Kapitel endet der erste Block des Skripts, die numerische
   lineare Algebra (@sec:intro/worum)". Teil 1 umfasst laut 1.2, Registry und
   concept-map.qmd die Kapitel 2–9; Kap. 9 (Tensoren) gehört noch dazu. Nicht
   angefasst.
4. **Karte vs. Widget-Kommentar:** `S12Landkarte.tsx` kommentiert „Kap. 13
   setzt Teil 2 nicht voraus", enthält aber die Kante 11 → 13. Die Prosa folgt
   jetzt der Kante („wenig"); ob die Kante oder der Kommentar gemeint ist,
   entscheidet der Dozent.
5. Die Umstellung der beiden Beispiele tauscht ihre Nummern (s. §2).

## 6. Prüfungen (Endstand)

- `npm run typecheck:mdx`: Exit 0, 206 MDX-Dateien.
- `node scripts/gen-numbers.mjs --check`: 0 FEHLER-Zeilen; nur „Tabelle ist
  nicht aktuell" (erwartet, u. a. durch den Beispieltausch).
- `npm run test:mdx`: Exit 0.
- `npm run verify:numbers`: Exit 0, 124 Prüfscripte, darunter
  `REV29 01-intro-S12Landkarte: ok` (die Zahlfrage-Lösung 3 in S12 ist
  unverändert).
- Headless-MathJax über alle `$…$`-Literale in S11/S12 (187 Makros,
  `noundefined` entfernt, Negativtest greift): 98 Literale, 0 Fehler.
- Grep-Nachkontrolle: keine getippten Kapitelnummern, keine Gedankenstriche,
  keine du-Imperative, kein „man", keine „genau das"/„nicht nur … sondern".
- Keine Fehler in fremden Dateien beobachtet.
