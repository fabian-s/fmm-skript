# Gutachten Straffung Kapitel 03-matrix-spur-norm (S31–S36)

Grundlage: `git diff 21b998d -- src/chapters/03-matrix-spur-norm`, alle sechs Dateien im
neuen Stand vollständig gelesen, dazu ein Haupttext-Dump mit ausgeblendeten Vertiefungen
(Skript `scratchpad/k03rev/k03rev_zuklapp.py`). Folien
`slides-2627/slides/03-matrix-spur-norm.qmd` Folie für Folie abgeglichen, Bericht
`03-matrix-spur-norm.md` gelesen, Klausuren gegengeprüft (WS25/26-1: Frobenius-Norm auf
Tensoren über die Normaxiome; Konzeptfrage Jacobi mit Operatornorm-Verträglichkeit; beides
im Haupttext).

## 1. Zahlen (`zaehlen.mjs 03-matrix-spur-norm`)

| | Haupttext | Vertiefung | gesamt |
| --- | ---: | ---: | ---: |
| Ausgangsstand | 8 975 | 1 972 | 10 947 |
| nach Editor | 7 846 (−12,6 %) | 1 691 | 9 537 (−12,9 %) |
| nach Gutachten | 7 843 (−12,6 %) | 1 691 | 9 534 (−12,9 %) |

Der Richtwert (−10 bis −15 %) ist getroffen. Der Gesamtumfang sinkt stärker als die
angepeilten 5–10 %. Ich habe jede Streichung gegen den alten Stand gelesen: Gestrichen
wurden Dubletten (R-Einzeiler und zweite AᵀA-Rechnung in S34, Beweisschritt (2) der
Verträglichkeit, Orthogonalmatrix-Selbsttest), Meta-Sätze, Rückblicke und eine Quizfrage zu
Widget-Interna. Die Vertiefungen schrumpfen vor allem, weil Folienstoff aus ihnen in den
Haupttext zurückkam (Beweis der unitären Invarianz, Schatten-Bemerkung, Kernidee Spur =
Σλ). Übereifer habe ich nicht gefunden.

## 2. Eigene Änderungen (7)

1. **S31, Einleitung:** „Jede dieser Fragen verdichtet eine Tabelle von Zahlen zu einer
   Kennzahl" → „Jede dieser Fragen verlangt, eine Tabelle von Zahlen zu einer Kennzahl zu
   verdichten". Grund: Die Kürzung hatte den Sinn verschoben (eine Frage verdichtet nichts;
   alter Stand: „verlangen, … zu verdichten").
2. **S31, Spur = Summe der Eigenwerte:** Der neue Einzeiler war ein Schachtelsatz mit
   doppelter Klammer vor der Formel („ist das ein Einzeiler. Mit einer Diagonalisierung …,
   in der …, liefert die Ähnlichkeitsinvarianz (…; …)"). Jetzt zwei Sätze: „folgt der Satz
   direkt aus der Ähnlichkeitsinvarianz (…). Ist A = PDP⁻¹ mit der Diagonalmatrix D der
   Eigenwerte, so gilt". Das entspricht der Folie („Kernidee"), dazu fällt das zweite
   „Einzeiler" des Abschnitts weg. Links `similar-matrices` und `diagonal-matrix` bleiben.
3. **S33, Einleitung:** Den Halbsatz „der Identität Iₙ gibt die Frobenius-Norm sogar den mit
   n wachsenden Wert √n" gestrichen. Grund: vierte Nennung desselben Punkts (S32 Beispiel,
   S32 Schlussabsatz, S33 Einleitung, S33 @beispiel:identitaetsmatrix); der Rückbezug bleibt
   im Identitätsmatrix-Beispiel. Der einzige `:k[…]{#identity-matrix}`-Link der Datei hing an
   diesem Halbsatz und steht jetzt dort („Für die :k[Identitätsmatrix]{#identity-matrix}
   Iₙ …"); die Konzept-id-Menge je Datei ist unverändert.
4. **S33, vor @satz:spektralnorm-und-spektralzerlegung:** „… eine orthogonale
   Eigenvektormatrix P. Ihre Eigenwerte sind nichtnegativ" → „Die Eigenwerte von AᵀA sind
   nichtnegativ". Grund: Nach der Verdichtung bezog sich „Ihre" grammatisch auf P (dessen
   Eigenwerte Betrag 1 haben und negativ sein können).
5. **S33, Kasten Operatornorm:** „berührt die Ellipse den roten Kreis von innen" → „… den
   roten Kreis mit Radius ‖A‖₂ von innen". Grund: Im PDF fehlt das Widget, „der rote Kreis"
   hatte dort keinen Bezug (im TSX: rot = Kreis vom Radius σ₁ = ‖A‖₂).
6. **S35, Kasten Äquivalenzkonstanten:** „Lässt sich der Faktor √min(m,n) aus
   @beispiel:explizite-aequivalenzkonstanten noch verbessern … Beide Normen hängen nur von
   den Singulärwerten ab" → „… in der ersten Kette aus … Spektral- und Frobenius-Norm hängen
   nur …". Grund: Der Faktor steht in zwei der drei Ketten, und „Beide Normen" hatte keinen
   Bezug (der alte Stand sprach von „allen drei beteiligten Normen").
7. **S35, nach @definition:eigenschaften-konditionszahl-einer-matrix:** Die zwei Absätze
   vertauscht. Vorher hieß es zuerst „Die geometrische Deutung als Verhältnis von
   Streckungsfaktoren gilt für Operatornormen", die Deutung selbst kam erst im Absatz danach.
   Jetzt steht zuerst κ₂ als Verhältnis der extremen Streckungsfaktoren (samt symmetrischem
   Fall), danach „Diese Deutung … gilt in jeder Operatornorm. In anderen submultiplikativen
   Normen kann schon die Normierung abweichen: κ_F(Iₙ) = n". Inhalt unverändert (für jede
   induzierte Norm ist ‖A⁻¹‖ = 1 / minimale Streckung).

Keine Zahlen, IDs, Anker, Verweise, Widget-Tags, Code-Fences oder Formeln verändert.

## 3. Prüfung nach Auftrag

**1. Haupttext-Vollständigkeit.** Jede gezählte Folie ist im Haupttext abgedeckt:
Vorkenntnisse; Spur-Definition, Bemerkungen, drei Beispiele; Eigenschaften-Satz mit
zyklischer Vertauschung und „Vorsicht"; Spur = Σλ mit Kernidee (jetzt Einzeiler im
Haupttext); Frobenius-Norm mit Bemerkungen und dem Spur-Beweis; Motivation mit den vier
Anlässen und der Folienformel ‖A‖_F² = Σⱼ‖Aeⱼ‖₂² (vom Editor ergänzt, nachgerechnet);
Matrixnorm-Axiome; Vektorisierungsnormen; Iₙ-Beispiel; Beispiel A₁/A₂/A₃; Operatornorm mit
Interpretation; Visualisierung mit R-Chunk (byrow = TRUE); die drei induzierten p-Normen;
Orthogonalmatrizen samt κ₂(Q) = 1; Spektralnorm-Satz mit Interpretation; beide
Operatornorm-Beispiele; Schatten-Definition mit Spezialfällen und „Überraschung";
Schatten-Folie (Namensgeber, unitäre Invarianz mit Folienbeweis, S2 = F, Anwendung);
Normenäquivalenz mit Konstanten und „Äquivalenz ≠ Gleichheit"; Submultiplikativität mit den
drei „Warum wichtig"-Punkten; Verträglichkeit; Konditionszahl mit Interpretation und
SVD-Bezug; Rückwärtsfehleranalyse; Zusammenfassung (inkl. Konditionszahl); beide Quizfolien
(S36). Alle Vertiefungen gegen die Folien geprüft: Keine enthält Stoff einer gezählten
Folie. Beweise stehen dort nur, wo die Folie sie gar nicht führt oder auf den Anhang
verweist (Spektralnorm), dazu Gesamtnorm (Anhang), Freiheitsgrade, max/sup, Rechenaufwand.

**Zuklapp-Test:** Kein Haupttext-Verweis zielt auf eine ID, die nur in einer Vertiefung
steht; keine „Schritt N"-Treffer. Einziger Widget-Verweis in eine Vertiefung:
`S35SubmultWidget.tsx:292` → @bemerkung:reparatur-die-gesamtnorm (klappt die Box auf,
zulässig). Selbsttests: alle 23 Fragen gegen den Haupttext geprüft, jede ist ohne
Vertiefung lösbar.

**2. Sinn und Fachlichkeit.** Jede geänderte Stelle mit dem alten Stand verglichen. Außer
den oben reparierten Punkten 1, 4, 6, 7 keine Sinnverschiebung, keine verlorene
Voraussetzung. Geprüft insbesondere: S32-Tauschknopf-Antwort (TSX: [[a,b],[c,d]] →
[[d,c],[a,b]], aus I₂ wird [[1,0],[1,0]], singulär), S33-Kasten („zweimal pro Umlauf, da x
und −x gleich gestreckt"; Voreinstellung „schiefe Streckung" ist die Default-Matrix), S35
Submultiplikativitäts-Kasten („höchstens 1", Lesson Review 3.5), ρ(A) ≤ ‖A‖ „ohne Beweis",
κ_F(Iₙ) = n, S35-Selbsttest „garantiert ist das nur für submultiplikative Normen" (die
Korrektur des Editors trägt).

**3. Übereifer.** Nichts wiederherzustellen. Die gestrichenen Stücke sind Dubletten oder
Meta-Sätze; der Kompaktheits-Halbsatz zum Äquivalenzbeweis (S35) war unter der
Box-Schwelle und ist als „Kompaktheitsargument" erhalten. Die Beweisskizze Spur = Σλ ist
inhaltlich vollständig im Einzeiler erhalten. Keine Mini-Boxen: 14 Vertiefungen, jede
entweder ein Beweis zu einem Haupttext-Satz oder ein geschlossener Exkurs.

**4. Untereifer.** Grep-Regex aus `german-tells.md` über S31–S36: nur Kommentarköpfe und
„nicht nur über die Einträge" (S36, echter Kontrast). Zusatzsuche (genau, ja, eben, gratis,
billig, man, sogar, tatsächlich, Imperative, getippte Nummern, Komposita mit Zeilenumbruch):
nur fachliche „genau einmal/einer" und zwei unauffällige „sogar/tatsächlich". Gedankenstriche
im Fließtext: 0. Eine Zusammenfassung (S36). Einzige gefundene Dublette war die √n-Wiederholung
(Änderung 3).

**5. Syntax.** Fence-Stufen korrekt (`:::::vertiefung` > `::::beweis` > `:::schritt`,
`::::vertiefung` > `:::bemerkung/beispiel`; der zurückgeholte Beweis der unitären Invarianz
steht als `::::beweis` wie die übrigen Top-Level-Beweise). Titel ohne `$…$` und Markup. Mengen
der Env-IDs, Gleichungs-IDs, `:id[…]` und `:k[…]{#id}` je Datei identisch mit 21b998d; die
sechs nur in Vertiefungen definierten IDs werden repo-weit nirgends referenziert, außer dem
genannten Widget-`ref` auf die Gesamtnorm.

## 4. Restpunkte und Fragen an den Dozenten

- **Folie „Ausblick: Normen in Machine Learning"** steht nach `# Anhang
  {visibility="uncounted"}`, trägt selbst aber kein `visibility="uncounted"` (anders als die
  drei Anhangsfolien davor). Ist sie gezählt, gehört Ridge/LASSO/Nuklearnorm-Regularisierung
  in den Haupttext von S36; ich habe sie als Anhangsmaterial gelesen und in der Vertiefung
  gelassen.
- **Interaktiv-Titel S35** „Gilt ‖AB‖ ≤ ‖A‖·‖B‖ für jede Matrixnorm?" enthält
  Unicode-Formelzeichen (kein `$…$`, baut fehlerfrei, Ausgangsstand). Falls Titel strikt
  formelfrei sein sollen: „Gilt die Submultiplikativität für jede Matrixnorm?".
- **Fremde Dateien (nicht geändert, zum Teil schon im Editor-Bericht):**
  `12-optim/S121.mdx:709` und `04-fehler/S42.mdx:209` verweisen für
  ‖Mv‖ ≤ ‖M‖‖v‖ auf @sec:matrix-spur-norm/operatornormen; ausformuliert steht sie als
  @bemerkung:operatornorm-hilfsungleichung in …/eigenschaften (bei S42 vertretbar, weil sie
  direkt aus der Definition folgt). `06-svd/S64.mdx:448`: κ(XᵀX) = κ(X)² wird Kap. 3
  zugeschrieben, steht dort aber nicht. `10-differentialrechnung/S106.mdx:61`:
  „Cauchy-Schwarz in der Frobenius-Norm (@sec:matrix-spur-norm/spur)"; Kap. 3 führt kein
  Frobenius-Skalarprodukt ein, Cauchy-Schwarz steht nur im Verträglichkeitsbeweis (Vertiefung
  in …/eigenschaften).
- **S33-Quiz „singulär"** nennt σ₂, bevor S34 Singulärwerte definiert; das Widget zeigt σ₂
  aber als beschriftete Anzeige („stärkste Stauchung"), deshalb belassen.

## 5. Prüfergebnis (Endstand)

- `npm run typecheck:mdx`: 206 MDX-Dateien geprüft, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen, nur „Tabelle ist nicht aktuell"
  (erwartet).
- `npm run test:mdx`: 137/137 Fixtures, Inventory- und Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0 (die `\cbblue`-Zeile ist
  der bekannte Negativtest). Kein Prüfscript liest MDX aus Kap. 3.
- Headless-MathJax (187 Makros, ohne `noundefined`): 675 Literale in S31–S36, 0 Fehler,
  Negativtest `\foo` erkannt.
- Fehler in fremden Dateien: keine aufgetreten.
