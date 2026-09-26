# Straffung Kapitel 10, Teil 2 (S106–S109)

Grundlage: BRIEF.md, Plan `10-differentialrechnung-plan.md` (Gruppe 2), Decks
`10-ableitungen-I.qmd` (Folie „Bemerkungen") und `11-ableitungen-II.qmd`. Vorstand:
Beim Start gab es gegenüber `21b998d` in keiner der vier Dateien Änderungen; alle
Edits stammen aus diesem Lauf. Jede Datei wurde vollständig und Zeile für Zeile gelesen.

## 1. Zahlen (`zaehlen.mjs 10-differentialrechnung`)

| Datei | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| S106 | 3 606 → 3 024 (−16,1 %) | 848 → 834 | 4 454 → 3 858 (−13,4 %) |
| S107 | 3 703 → 2 913 (−21,3 %) | 1 650 → 1 755 | 5 353 → 4 668 (−12,8 %) |
| S108 | 3 421 → 2 705 (−20,9 %) | 895 → 957 | 4 316 → 3 662 (−15,2 %) |
| S109 | 2 679 → 1 940 (−27,6 %) | 670 → 835 | 3 349 → 2 775 (−17,1 %) |
| **Teil 2** | **13 409 → 10 582 (−21,1 %)** | 4 063 → 4 381 | 17 472 → 14 963 (−14,4 %) |

Gedankenstriche: in allen vier Dateien null.

## 2. In Vertiefungen verlagert

- **S107, neue `:::vertiefung[Feinheiten der Definition: Umgebung, Operatornorm und Beschränktheit]`**
  direkt hinter `bemerkung:hoehere-ableitungen-wie-die-definition-zu-lesen-ist`:
  die Punkte „Warum eine Umgebung vorkommt", „Warum die Operatornorm" und die
  Beschränktheits-Ungleichung. EXTRA, weil die Folie eine kompaktere Definition ohne
  Operatornorm hat und der Haupttext die Operatornorm nirgends braucht (nur der
  Taylor-II-Beweis, der selbst Vertiefung ist). Im Haupttext bleiben drei
  Beobachtungen (j = 1, „was wonach", „Objekte werden größer" samt „multilinear").
- **S108, Selbsttestfrage „Der Beweis von Satz Taylor II überträgt …"** als `::::quiz`
  ans Ende der Vertiefung „Beweis der allgemeinen Taylorentwicklung". Sie fragte
  Vertiefungsstoff ab. Antwort unverändert bis auf „(Herleitung in der Vertiefung …)"
  → bloßer Verweis.
- **S109, neue `:::::vertiefung[Das gemeinsame Muster der Beweise]`**: der Absatz „Die
  meisten Beweise … Integralform des Restglieds". Metareflexion, nicht auf den Folien;
  nichts verweist darauf. Der Bezug „dieser vier Abschnitte" (hing an einem
  gestrichenen Absatz) ist jetzt `@num:…/stetigkeit bis @num:…/taylor`.

## 3. Gestrichen (Dubletten, Wiederholungen, Meta-Sätze)

**S106**
- Zahlencheck zur Spur-Produktregel (4,2997) in `beispiel:die-produktregel-in-vier-bauformen`: wird nirgends gebraucht.
- Absatz „Die Unterscheidung hat Folgen" ((6, 13)/(4, 14)/(8, 14)) in `beispiel:gradient-einer-quadratischen-form`: Dublette zur Quizantwort. Der Konzeptlink `symmetric-matrix` hängt jetzt an „symmetrisches A".
- Absatz „Beim Aufschreiben ist auf die Form zu achten" in `beispiel:ridge-regression`: Die Zeilenkonvention ist in S102 schon zweimal erklärt.
- Kommentar nach Bauform 2 der Kettenregel sowie der Einleitungssatz der Bemerkung zu den vier Multiplikationen (den sagt schon der neue Titel).
- Beweis der Produktregel: die alten Schritte 3 und 5 zu einem Schritt zusammengelegt, Schritt 4 und der Schlussschritt gekürzt, Mathematik unverändert. Die Schrittnummer 3 für den Kreuzterm bleibt, die Selbsttests verweisen darauf.
- Gekürzt, Inhalt erhalten: Einleitung (ein Absatz), Schranken-Bemerkung (je Punkt ein Satz), Ridge-Absatz zur Definitheit, Kettenregelbeweis Schritt 4/5, Widget-Lead-in und -Auswertung, Vorbehalt im Normbeispiel.

**S107**
- Ankündigungsabsatz nach „Wir leiten noch einmal ab" (jetzt ein Satz, Konzeptlinks Hesse-Matrix/Eigenwerte behalten); „Die Definition sagt noch nichts darüber …"; „Jetzt können wir … ausrechnen"; „Vier Gründe …"; „Der nächste Satz macht daraus eine Regel".
- Einschub diag(1, −1, 0) in `bemerkung:wenn-die-hesse-matrix-nichts-entscheidet`.
- „Symmetrie allein reicht dafür nicht, denn Cholesky verlangt …" in `bemerkung:was-die-symmetrie-spart`.
- Bemerkung zur dritten Ableitung: Absatz „Zur Notation" und der Speicherbedarf-Satz (eine Milliarde Zahlen).
- `bemerkung:praxisrelevanz-der-hesse-matrix`: Widget-Zahlen 3,618/1,382/2,618/0,447 (stehen im S102-Kasten) und die Schranke μI ⪯ H ⪯ LI. Der SGD-Garantiesatz entfällt, die SGD-Aussage bleibt als Halbsatz (siehe §5).
- Fisher: der Satz „E[Score] = 0, I = E[∇ℓᵀ∇ℓ]" (nicht auf der Folie) und „Beides misst dieselbe zweite Ableitung".
- Vektor zu Vektor: das Größenbeispiel 50/500/5000/275, jetzt ein Satz.
- Hesse-Widget: drei Leitfragen auf eine, der Raumtafel-Satz, „Spur und Determinante".
- Selbsttest: Münzwurf-Antwort auf etwa 60 Wörter; Schwarz-Antwort ohne nacherzählten Vertiefungsbeweis.

**S108**
- Einleitung von etwa 250 auf etwa 100 Wörter. Der Farbcode-Absatz ist jetzt ein Satz; „billig" und „eines der meistbenutzten Werkzeuge" entfallen.
- Exp-Beispiel: gemessene Quotienten 6,3/8,2 und die Auflösung nach ξ = 0,1738.
- `bemerkung:ebene-und-quadrik`: Niveaumengen von T₁ im kritischen Punkt und die Wiederholung der Beweisskizze zum Hesse-Kriterium (bleibt in S107). Der Sonderfall-Absatz „T₂ = f" steht wörtlich weiter (S124 zitiert ihn).
- Gekürzt: die Absätze nach der Taylorpolynom-Definition, `was-der-satz-sagt-und-was-nicht`, `die-zweite-schreibweise`, Einleitung „Der allgemeine Fall", die Absätze nach dem Korollar, die Newton-Herleitung (Gradientensatz), `drei-vorbehalte` sowie alle drei Widget-Kästen (Lead-in, Beschreibung, Auswertung).
- Restglied-Quizantwort: Satz über den Mittelwertsatz im Beweis (Vertiefung).

**S109**
- „### Die Kernkonzepte" samt Satz, `bemerkung:fuenf-begriffe-die-bleiben`, Absatz „Zwei Anordnungen …", Absatz „Die zweite Kapitelhälfte …", `bemerkung:vier-bausteine-die-bleiben`. Das sind Dubletten zur Tabelle „Das Wichtigste in Kürze", die jetzt die einzige Zusammenfassung ist. Beide Labels werden nur in S109 selbst zitiert. Die einzige Aussage, die die Tabelle nicht trug (jede Matrix M mit f(x+h) = f(x) + Mh + o(‖h‖) ist schon die Jacobimatrix), steht jetzt in der Jacobi-Zeile.
- Selbsttest: beide Ansage-Absätze auf je eine Kurzzeile; Zahlenprobe der Produktregel-Frage gestrichen; Kettenregel-Probe auf zwei Sätze; Newton-Antwort ohne Cholesky-Satz; Konvexitäts-Antwort −2 Sätze; Schwarz-Antwort ohne „bloße Differenzierbarkeit"-Satz.
- „Nächstes Kapitel" auf etwa 75 Wörter.
- Konzeptlink `{#gradient}` ist dadurch im Kapitel nicht mehr verlinkt. Das Kapitel führt den Gradienten selbst ein, deshalb genügt der Abschnittsanker (KONVENTIONEN).

## 4. Reparierte Fehler

- **S108**, `bemerkung:hoeher-ist-nicht-automatisch-besser`: kaputter Satz „fallen die Fehler … sind … ab" → „fallen … von 5,0·10⁻² über 1,3·10⁻² und 7,8·10⁻⁴ auf 3,1·10⁻⁶" (Zahlen nachgerechnet, unverändert).
- **S108**, Einleitung: Verweis auf `bemerkung:warum-statistik-und-ml-voll-davon-sind` zeigte auf die falsche Stelle (die Asymptotik steht in der Vertiefung danach) → entfernt.
- **S108**, Taylor-1D-Kasten: „Die drei Näherungen T₁, T₂, T₃ hängen an einem Regler" war falsch, der Ordnungsregler läuft von 0 bis 8 (S108Taylor1D.tsx). Deshalb neu beschrieben und den Plantitel „Ordnungen 1 bis 3" nicht übernommen. Titel jetzt: „Taylorpolynome der Exponentialfunktion".
- **S108**, Selbsttest: Self-Check F2 aus Deck 11 fehlte → `:::frage{wahr}` „f(x+h) − T_k(h) = o(|h|^k)" mit zwei Sätzen Antwort.
- **S107**: Die Folienaussage „Var(θ̂_ML) ≈ I(θ)⁻¹, asymptotisch Cramér-Rao-Schranke" fehlte im Haupttext → Satz ergänzt, mit dem Zusatz, dass ℓ die Log-Likelihood der ganzen Stichprobe ist (sonst widerspräche er der Vertiefung zu I_n vs. I_1).
- **S107**: Die Folie „Konkret: Hesse-Matrix (k = 2)" fehlte im Haupttext → Drei-Satz-Skizze ∇f(x+h) − ∇f(x) = hᵀH + o(‖h‖) ⇒ D²f(h₁,h) = hᵀHh₁ unter `satz:erste-und-zweite-ableitung-in`.
- **S107**: „… symmetrisch, was etwa den halben Rechenaufwand spart" widersprach der Bemerkung „etwas *mehr* als die Hälfte" → Halbsatz gestrichen.
- **S107**, Konvexität: „übersetzt das in eine punktweise Bedingung …, und das ist der Grund, warum konvexe Probleme handhabbar sind" war eine schiefe Kausalität → zwei Aussagen getrennt.
- **S106**: „Für Jacobimatrizen haben wir die Regel in @sec:jacobi schon bewiesen" wird falsch, sobald Gruppe 1 den Koordinatenbeweis in S103 streicht (Plan) → „kennen wir aus @sec:jacobi".
- **S109**: Die Folie „Bemerkungen" (Deck 10) war im Haupttext nur zu einem Viertel abgedeckt → neuer Haupttext-Unterabschnitt „### Was wir ausgelassen haben" (≈ 95 Wörter: leere Zellen/Tensoren/Vektorisierung, Störungsanalyse φ'(0) = D_X f(E), Funktionenräume als Übung, Matrix Cookbook). Die gleichnamige Überschrift in der Vertiefung ist entfernt, die Vertiefung heißt jetzt „Leere Felder, Störungsanalyse und Nachschlagewerke im Detail".
- **S109**: handgeschriebener Link `?k=11-konvexitaet#sec-11.1` → `@kap:konvexitaet`.
- **Titel** (IDs unverändert):
  - S106: „Beispiele, und warum die Schranke selten etwas kostet" → „Vier Multiplikationen und ihre Schranke"; „Warum im Eindimensionalen ein Produkt herauskommt" → „Die Kettenregel im Eindimensionalen"; „Der Gradient am Regler: …" → „Der logistische Gradient an einer Beobachtung".
  - S107: „Hesse-Kriterium zum Schieben" → „Hesse-Kriterium und Höhenlinien"; die Vertiefungstitel zu Schwarz, zu den Koordinatenformeln, zu Cramér-Rao und zu den drei Stufen (alle nach Plan); Bemerkungstitel „Cramér-Rao, sauber formuliert" → „Cramér-Rao-Schranke und Asymptotik".
  - S108: beide Beweis-Vertiefungen umbenannt.
- **Deslop**: „reißen" (2×) → „verschieben"; „sauber", „harmlos", „schlicht", „bloß", „billig", „übrigens", „In einem Satz:", „Rechnen wir nach", „gutartige Funktionen" (→ „nahe am Entwicklungspunkt") entfernt.

## 5. Ermessensentscheidungen und offene Fragen

- **Abweichungen vom Plan:**
  - S106 Haupttext nur −16 % statt der geschätzten −22 %. Alle Planposten sind umgesetzt. Der Rest sind Folienbeweise, Bauformen und das Ridge-Beispiel (Klausur, S125 rechnet damit); weiter zu kürzen hätte Substanz gekostet.
  - S107: Der SGD-Halbsatz in der Praxisrelevanz bleibt, weil die Folie ihn trägt („⇒ SGD & co funktionieren"); gestrichen ist nur der Garantie-Nachsatz. Im Hesse-Kasten bleibt „(Niveau 4: Halbachsen 2 und 1)" als Klammer, die einzige konkrete Probe für „lange Halbachse = kleiner Eigenwert".
  - S108: Kastentitel anders als im Plan (siehe §4).
- **Neue Haupttext-Sätze, die Folienstoff nachholen** (bitte ansehen): S107 Var ≈ I⁻¹/Cramér-Rao; S107 Hesse-Skizze; S108 Taylor-Quizfrage (F2); S109 „Was wir ausgelassen haben".
- **S109:** Die Tabelle ist jetzt die einzige Kapitelzusammenfassung, rund 810 Wörter Bemerkungen sind gestrichen.
- **S107**, zahlfrage „Definitheits-Widget": Den Namen habe ich behalten, obwohl der Kasten jetzt „Hesse-Kriterium und Höhenlinien" heißt, weil 11-konvexitaet/S114 das Widget unter diesem Namen zitiert.
- **Offene Frage, Widget-TSX (nicht in meinem Auftrag):** `widgets/S108Taylor1D.tsx`, `verdeckt`-Text der Schaetzfrage: „Faustwert |x|/(k+1) = 0,5/3 = 0,167, also ein Sechstel, und dass es etwas besser läuft …" für den Schritt T₂ → T₃. Nach der Konvention des Widgets selbst (k = neue Ordnung, der Statustext rechnet `faust = |x|/(k+1)`, bei k = 3 also 0,125) und nach dem Restglied im Beispiel ist der Faustwert ein Achtel. Gemessen sind 8,2, das trifft den Faustwert also. Der verdeckte Text widerspricht dem eigenen Statustext und sollte „0,5/4 = 0,125, also ein Achtel" sagen.
- **Offene Frage, schon vorher so:** Die Fehlertabelle im Exp-Beispiel (0,0237 → 0,0029) und der Faktor 0,5/(k+2) im Text lassen die Schaetzfrage „Faktor 8" vor dem Widget ausrechnen. Ich habe die ausdrücklichen Quotienten (6,3/8,2, „ein Sechstel bis ein Achtel") gestrichen; die Tabelle ist Folienstoff und bleibt.

## 6. Prüfungen (Endstand)

- `npm run typecheck:mdx`: 206 MDX-Dateien geprüft, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur „Tabelle ist nicht aktuell", erwartet).
- `npm run test:mdx`: 137/137 Fixtures, Inventartest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0.
- Nach jeder Datei liefen typecheck und gen-numbers; keine Fehler, auch nicht in fremden Dateien.
