# Konzept-Pop-ups, Batch 2 (gaussian-elimination … matrix-vector-product): Straffung und Deslop

Stand 2026-09-26. 34 Dateien in `src/concepts/`, nur Prosa geändert. `export const title`,
Imports, Widget-Tags und alle bestehenden `{#id}`-Links sind unverändert (geprüft gegen
`git show HEAD`); ein Link kam hinzu (`{#logarithm}` in likelihood). Formeln und Zahlen
unverändert bis auf Hausstil-Dezimalkommas (`0.5` → `0{,}5`, Tupel `(1; 0{,}5)`) und
Satzzeichen am Ende zweier Displays. Keine Vertiefungen, kein git, kein gen:numbers.

Pro Pop-up: Datei ganz gelesen, Linkstellen (`grep -rn "{#<id>}" src/chapters src/concepts`)
mit Linktext im Kontext angesehen, Widget-TSX (Kopf, Aufgabe, Verdikt) gelesen.

## 1. Zahlen (`zaehlen.mjs concepts`, Wörter inkl. Mathe, Imports und Kommentarkopf)

Summe der 34 Dateien: 6 563 → 6 357 (−3,1 %). Median 194 → 188, Maximum 253 → 239.
Über 220 Wörtern vorher 5, jetzt 2. Vertiefung = 0 (Pop-ups haben keine).

Der Rückgang ist kleiner als in Batch 1, weil diese Pop-ups kaum Exkurse hatten. Dazu
kamen einzelne Ergänzungen (siehe 5.1). Vor allem aber beantworten viele Lead-outs die
Leitfrage jetzt konkret, statt „macht sichtbar“ zu sagen.

| Pop-up | vorher → nachher | was raus / was repariert |
| --- | ---: | --- |
| gaussian-elimination | 218 → 183 | „gratis“, „winzig“, „erledigt den Rest“, „man“ raus; *Pivotisierung* → *Pivotierung* (Skriptbegriff, 20×); Lead-out „machen sichtbar“ → Multiplikatoren 2, 1, −1 aus dem Widget; KQ-Vorbehalt (Matrix $\bM$, Anzeige $\|\bM\bv\|_2 \ne \|\bv\|_2$) auf einen Satz, S73/S75 erklären ihn an der Linkstelle selbst |
| gaussian-mixture-model | 152 → 153 | Gedankenstrich-Paar → Klammer; „Die Parameter … maximieren die Likelihood“ (schief) → „schätzen wir, indem wir die Likelihood maximieren“ |
| geometric-series | 200 → 187 | Widget-Anweisung in Klammern raus; Taylor-„Prototyp“-Satz gekürzt; Lead-out „Die Beobachtung trennt …“ → Erkenntnis (Grenzwert $1/(1-r)$, nahe $\lvert r\rvert = 1$ langsam, ab $1$ kein Grenzwert) |
| gradient-descent | 184 → 179 | **Logikfehler:** „Deshalb steckt Backpropagation so viel Aufwand …“ hing ohne Bezug hinter dem $\theta^2$-Beispiel → „Jeder Schritt braucht den Gradienten; bei neuronalen Netzen liefert ihn Backpropagation“; „Das Rezept:“, „Alles hängt am“ raus |
| gradient | 207 → 211 | zwei Gedankenstriche raus; „jede Aufwärtsrichtung ist erloschen“ → Begründung („sonst ginge es entgegen dem Gradienten noch bergab“); „sagt erst die Hesse-Matrix“ → „zeigt oft“ (semidefinit entscheidet nicht, wie im hessian-Pop-up); Lead-out „greifbar“ → senkrecht zur Höhenlinie, tangential Steigung 0 |
| gram-schmidt | 168 → 165 | „ist ein Rezept, das“ raus; Eigenraum-Exkurs (MML §4.2) raus; Leitfrage „Schatten“ → „Projektion“; Lead-out „wie schief“ → Restlänge $\|\bv_2\|_2 \lvert\sin\alpha\rvert$ (Widget-Verdikt) |
| hessian-matrix | 201 → 185 | **Fachfehler:** positive Definitheit von $2\bA^T\bA$ ohne Voraussetzung → „bei vollem Spaltenrang von $\bA$“; „krümmt sich überall“ → „in jeder Richtung“; $q(x,y)$ jetzt vor dem Widget eingeführt; Wiederholungssatz im Lead-out raus |
| hyperplane | 219 → 197 | **Fachfehler:** Definition ohne $\ba \neq \bnull$ (der Lead-out sagte selbst, $\ba = \bnull$ zerstört die Hyperebene) → Bedingung in die Definition; „$\ba$ steht senkrecht auf ihr“ ergänzt (Widget-Einsicht; S93, S113, S114 verlinken genau dafür); „schwebt“, „Preis“, „vollkommen“, Gedankenstrich raus; Leitfrage konkret ($a_2 = 0$ wie Widget-Aufgabe); Lead-out „steht senkrecht“ (doppeldeutig neben Normalenvektor) → „vertikale Gerade $x_1 = b/a_1$“ |
| identity-matrix | 134 → 126 | nur Deslop: „Matrizenwelt“, „einfach“, „pickt“, „Tu-nichts-Rolle ist der Grund, warum“ |
| image | 180 → 180 | `0.5` → `0{,}5`, Tupel `(1; 0{,}5)`; Skript-Notation $\col(\bA)$ ergänzt (Kap. 6, 7, 9 schreiben so); zweimal „genau“ raus; „Wohin führt das die Ausgaben“ → klare Frage |
| infinite-series | 185 → 188 | „nie wirklich“, „klassisches“, Meta-Satz „Das Widget unten zeigt“ raus; „als Grenzwert … konvergieren“ entwirrt; Lead-out „verschwindet hier“ (unscharf: für endliches $n$ nie null) → Rest $2 - S_n = 2^{-n}$ (Widget-Verdikt) |
| inner-product-functions | 194 → 208 | Gedankenstrich, „Genauso behandeln“, „Kleines Beispiel“ raus; **unklarer Lead-out** („fehlt rote Fläche, heißt das umgekehrt nicht $p = q$. Sicher ist nur …“) neu geordnet: $q = p$ ⇒ keine Fläche unter der Achse, nicht umgekehrt (Beispiel $1$, $t^2$ aus dem Widget) |
| intermediate-value-theorem | 194 → 188 | `1.414` → `1{,}414`; „keine Dekoration“, „das gesamte Korrektheitsargument“ gestrafft; Großschreibung nach Doppelpunkt |
| kernel | 171 → 189 | **Fehler:** $n$ in $\dim\ker(\bA) = n - \operatorname{rk}(\bA)$ undefiniert → „für $\bA$ mit $n$ Spalten“; `0.5` → `0{,}5`; „Motor hinter Eigenräumen“ → „Auch Eigenräume sind Kerne“; Skript-Notation $\operatorname{Kern}(\bA)$ ergänzt (S62, S93); Lead-out „nicht eine, sondern eine ganze Gerade“ → Kerngerade durch $(2; -1)^\top$, $\dim = 2 - 1$ |
| level-sets | 231 → 210 | **Inkonsistenz:** $f\colon \R^2 \to \R$, Menge aber im $\R^n$ → $f\colon \R^n \to \R$; **Fachfehler:** Ellipsen nahe dem Minimum „einer glatten Funktion“ → „mit positiv definiter Hesse-Matrix“ (so auch S123); Wanderkarten-Einstieg, „zwei Fakten wichtig“, „entarten“ gestrafft; Lead-out „gilt lokal an jedem regulären Punkt“ → Widget-Einsicht (auch auf gestreckten Ellipsen, dort nicht radial) |
| likelihood | 159 → 192 | **Spoiler:** „und die ist am größten bei $p = 0.7$“ stand vor dem Widget, dessen Schaetzfrage genau danach fragt → in den Lead-out verschoben (mit $\hat p = h/10$ aus dem Widget-Kopf); **Bezugsfehler:** „Sie [die ML-Schätzung] ist die Zielfunktion“ → „Die Likelihood ist …“; **Lücke:** Log-Likelihood (ein Satz), weil 8 Linkstellen „Log-Likelihood“ bzw. „negative Log-Likelihood“ verlinken (S54, S104, S106, S107, S114, S122, S125, S138); „ML-Schätzung“ benannt (S121 verlinkt „ML-Schätzer“); Link `{#logarithm}` neu |
| limit | 207 → 201 | „Grenzwert-Notation … fragt“ → Definition; „Entscheidend:“, „rettet“, „sinnlose“ raus; `0.1, 0.01` → `0{,}1;\ 0{,}01`; Wege-Absatz gestrafft, Begriff *einseitige* Grenzwerte (S105 verlinkt „einseitigen Grenzwerte“); Lead-out „So trennt das Widget“ → Aussage |
| linear-combination | 182 → 160 | Rezept/Zutaten-Metapher raus; **zirkulärer Satz** („ist die Frage, ob irgendeine Wahl von Gewichten diese Spalten genau zu $\bb$ mischt“) → „dieselbe Frage wie die, ob $\bA\bx = \bb$ lösbar ist“; Leitfrage konkret (Ziel $(1; 3)$ wie Widget); Lead-out ohne Wiederholung, mit $c_1 = 4/3$, $c_2 = 5/3$ |
| linear-function | 149 → 157 | „Markenzeichen“ raus; Lead-out „Steigungsdreieck zeigt“ → Aussage (Widget-Verdikt) |
| linear-independence | 166 → 162 | „einfach“, „wirklich“ raus; Leitfrage „den Übergang“ (undefiniert) → konkrete Frage; **Fehler:** Parallelogrammfläche „ist genau die Determinante“ → „der Betrag der Determinante“ |
| linear-least-squares | 244 → 239 | Einstieg und Gedankenstrich gestrafft; „Parameter als Linearkombination der Spalten eingehen“ → „$\bA\bx$ ist Linearkombination der Spalten mit den Parametern als Gewichten“; **Fachfehler:** „Weil die Zielfunktion eine konvexe Schüssel ist, lässt sich ein Minimierer direkt berechnen“ → „quadratisch und konvex; deshalb direkt“ (Konvexität allein gibt keine geschlossene Lösung); „das ist der Punkt“ raus |
| linear-map | 166 → 155 | MML-Aufgaben-Exkurs („Trick hinter der Aufgabe, die Einheitsquadrat-zu-Parallelogramm-Transformation zu identifizieren“) auf die Kernaussage; Satz mit zwei Doppelpunkten aufgelöst; Begriff kursiv |
| linear-regression | 147 → 164 | Gedankenstrich raus; **Fachfehler:** „gleichbedeutend mit maximaler Likelihood unter einem Fehlermodell“ → „bei unabhängigen, normalverteilten Fehlern gleicher Varianz“; „Maschinerie“ → „Verfahren“; Lead-out beantwortet die Leitfrage (Minimum $\theta_0 = 0{,}28$, $\theta_1 = 0{,}93$, Quadratsumme $0{,}179$, verifiziert im Widget-Kopf) |
| linear-system | 207 → 212 | Einstieg gestrafft; „schrumpft“, „mechanisch“, „von selbst“ raus; Determinantensatz um „sonst keine oder unendlich viele“ ergänzt (verbindet mit den Widget-Fällen); Lead-out „entspricht unmittelbar“ → die drei Fälle. Ohm-Satz bleibt: einzige Linkstelle auf `{#ohms-law}` |
| linear-transformation | 188 → 154 | vager Satz „Deshalb ist eine Gleichung $\bL\bu = \boldsymbol{f}$ … so gut handhabbar“ raus; Leitfrage gestrafft; Lead-out-Wiederholung („Verbiegen kann … nur kippen, drehen …“) raus |
| logarithm | 177 → 183 | Gedankenstrich und Entropie-Exkurs („so angenehm zu differenzieren“) → „rechnen mit Log-Likelihoods statt Produkten“; „Vorsicht:“ raus; Monotonie für $b > 1$ ergänzt (S83 „logarithmieren“ und likelihood brauchen sie); Lead-out konkret (Nullpunkt, negativ für $x < 1$, konstanter Faktor) |
| low-rank-approximation | 213 → 207 | **Handgetippte Nummern** „Kapitel 6“, „Kapitel 7“ → „Satz von Eckart–Young“ bzw. ohne Kapitelangabe; „nicht irgendeine …, sondern“, „enorm“, „opfern … winzigen“, „riesige“ raus; Regularisierungsabsatz auf einen Satz (S76 erklärt es an der Linkstelle); „Energie“ in der Leitfrage erklärt; Lead-out mit Widget-Zahlen (95 %, $\sigma_3 = 2{,}5$) |
| lu-decomposition | 232 → 221 | „Buchführung“, „billige“, „teure … zahlen“, „Was bringt das?“, „eigentlich“ raus; **mehrdeutig:** „wird die Identität zu $\bP\bA = \bL\bU$“ (Identität = Einheitsmatrix?) → „wird daraus“; Lead-out ohne Gedankenstrich, beide Nullpivot-Fälle wie im Widget-Verdikt |
| machine-epsilon | 253 → 217 | „klafft“, „Konkrete Konsequenz“, „Genau nach diesem Prinzip wählt man“ raus; $\sqrt{\varepsilon}$-Absatz auf zwei Sätze (S65 braucht $\sqrt{\eps}$); „höchstens etwa $\varepsilon/2$“ → „höchstens“ (exakte Schranke); Skript-Notation $\eps$ genannt; Lead-out „relativer Preis … übersteigt nie die halbe Lücke“ (mischt absolut/relativ) → Lücke rechts $\varepsilon$, links $\varepsilon/2$, relativer Fehler unter $\varepsilon/2$ |
| matrix-inverse | 219 → 193 | Begriff *invertierbar* ergänzt (8 Linkstellen verlinken „invertierbar/invertieren/Matrixinversion“, das Pop-up sagte nur „regulär“); Leitfrage in einen Satz; Lead-out: Injektivitäts-Satz raus, „um genau diesen Faktor“ → „um bis zu“ ($\kappa$ ist Schranke) |
| matrix-multiplication | 229 → 218 | „merkwürdig aussehende … guten Grund“, „Vorsicht“, Handlungs-Analogie, „eigentlich“ raus; Lead-out „gleichgültig“ → sachlich |
| matrix-norm | 198 → 214 | ASCII-Schlusszeichen → „“; **Lücke:** Frobenius-Norm (ein Satz), weil low-rank-approximation „Frobenius-:k[Norm]{#matrix-norm}“ verlinkt und das Pop-up nur induzierte Normen kannte; Leitfrage konkret; Lead-out wiederholte die Abschätzung → Aussage zur kürzesten Halbachse (Widget-Verdikt) |
| matrix-product | 208 → 204 | „Ein kleines“, „Die tiefere Bedeutung“, „wunderbar“ raus; Ankündigung „Sehen wir uns … an“ → Leitfrage; Lead-out „keine Schrulle …, sondern der Grund für sie“ (schief) → $(\bA\bB)\bx = \bA(\bB\bx)$, andere Endlage bei getauschter Reihenfolge |
| matrix-vector-product | 181 → 155 | „Rezept“ (3×), „Genauso wichtig“, „Probieren wir es aus …“ raus; unklarer Satz zu „$\bA\bz \neq \bo$“ raus (keine Linkstelle braucht ihn); Lead-out konkret ($2 \cdot (1; 3)^\top + 1 \cdot (2; 4)^\top = (4; 10)^\top$) |

## 2. Verlagert in Vertiefungen

Keine (Brief §9: keine Vertiefungen in Pop-ups).

## 3. Gestrichen

Siehe Tabelle. Größere Posten: KQ-Vorbehalt mit $\bM$-Formel (gaussian-elimination),
Eigenraum-Satz (gram-schmidt), $\bL\bu = \boldsymbol f$-Satz (linear-transformation),
MML-Aufgabenexkurs (linear-map), $\bA\bz \neq \bo$-Satz (matrix-vector-product),
Entropie-Nebensatz (logarithm), Regularisierungsabsatz auf einen Satz (low-rank).
Kein `{#id}`-Link gestrichen.

## 4. Reparierte Fehler

- Fachlich: hessian-matrix (PD ohne vollen Spaltenrang), hyperplane (fehlendes
  $\ba \neq \bnull$), level-sets (Ellipsen ohne PD-Hesse-Matrix), linear-independence
  (Fläche = Betrag der Determinante), linear-least-squares (Konvexität ⇏ geschlossene
  Lösung), linear-regression („ein Fehlermodell“ → Normalverteilung), matrix-inverse
  („genau“ → „bis zu“ $\kappa$), machine-epsilon (Lead-out mischte absolute und relative Lücke).
- Logik/Bezug: gradient-descent (Backpropagation-„Deshalb“), likelihood („Sie“ = ML-Schätzung
  als Zielfunktion), linear-combination (zirkulärer Satz), lu-decomposition („die Identität“),
  matrix-product (Lead-out), kernel ($n$ undefiniert), level-sets ($\R^2$ vs. $\R^n$).
- Handgetippte Kapitelnummern: low-rank-approximation („Kapitel 6“, „Kapitel 7“).
- Spoiler vor Schaetzfrage: likelihood.
- Hausstil: Dezimalpunkte in image, kernel, likelihood, limit, IVT; ASCII-Anführungszeichen
  in matrix-norm; Gedankenstriche: 0 verbleibend in allen 34 Dateien.

## 5. Ermessensentscheidungen und offene Fragen

1. **Ergänzungen an Pop-ups** (je ein Satz oder Halbsatz, kein neuer Satz im Sinne eines
   Theorems, bitte ansehen): likelihood (Log-Likelihood, 8 Linkstellen), matrix-norm
   (Frobenius-Norm, Link aus low-rank-approximation), hyperplane (Normalenvektor $\ba$,
   S93/S113/S114), matrix-inverse („invertierbar“), limit („einseitige“ Grenzwerte, S105),
   logarithm (Monotonie), image/kernel/machine-epsilon (Skript-Notation $\col$,
   $\operatorname{Kern}$, $\eps$). Deshalb wachsen likelihood (+33), kernel (+18),
   matrix-norm (+16), linear-regression (+17, Lead-out mit Optimum).
2. **gradient** wird in S115 (Z. 107 „Subdifferential“, Z. 439 „Subgradient“) verlinkt; das
   Pop-up erklärt nur den Gradienten. Nicht ergänzt (neuer Stoff; Kap. 11 definiert beides
   selbst). Vorschlag an den Kapitel-Agenten: Link-Ziel dort prüfen oder den Link entfernen.
3. **Über 220 Wörtern** bleiben linear-least-squares (239) und lu-decomposition (221).
   Beide tragen ein Display-Beispiel (Designmatrix mit Lösung, LU-Produkt), die Prosa liegt
   bei rund 150–160 Wörtern. Weiter kürzen hieße das einzige Beispiel opfern.
4. **linear-least-squares:** Die Anzeige nennt die Lösung $\bx = (2/3, 1/2)$ vor dem Widget;
   dessen Schaetzfrage fragt nach der kleinsten Quadratsumme ($1/6$), nicht nach der Geraden.
   Nicht angefasst (Mathe). Falls gewünscht: „Lösung $\bx = …$“ aus der Anzeige nehmen.
5. **likelihood:** Auflösung $p = 0{,}7$ hinter das Widget verschoben (Ermessen; die Zahl steht
   jetzt im Lead-out).
6. **Widget-TSX (nicht angefasst):** MatrixNormWidget-Aufgabe sagt „beobachten die orange
   Halbachse“, gezeichnet wird sie violett (`FMM_COLORS.violett`, Legende „längste Halbachse“).
   GramSchmidt-Widget nennt die Vektoren $a_1, a_2$, das Pop-up $\bv_1, \bv_2$ (Lead-out daher
   „der erste Vektor“). Gradientenverfahren: Pop-up und Widget $\gamma$, Kap. 10 (S102) $\alpha$.
7. **Notation unverändert (Mathe):** `\mathbf{0}` statt `\bnull` in kernel; `^T` neben `^\top`
   in gradient, hessian-matrix, lu-decomposition; $\ker$ im Display von kernel,
   $\operatorname{Im}$ in image (Skript-Notation jetzt in der Prosa genannt).
8. Außerhalb meines Auftrags gesehen: `src/chapters/04-fehler/S41.mdx:33` tippt „(Kapitel 3, …“.

## 6. Prüfungen (nach allen Edits)

- `npm run typecheck:mdx`: 206 Dateien, ohne Befund (Exit 0).
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur „Tabelle ist nicht aktuell“).
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich (Exit 0); die Zeile „FEHLER:
  Makroname erscheint als Literaltext“ ist der beabsichtigte `\cbblue`-Negativtest.
- Headless-MathJax über alle 434 Mathe-Literale der 34 Dateien (mit Kursmakros, ohne
  `noundefined`; Negativtest `\foo` wird erkannt): 0 Fehler.
- Tell-Regex aus `german-tells.md` plus „einfach|winzig|wirklich|Rezept|man|sichtbar|greifbar|
  Vorsicht|eigentlich|billig|Trick|Motor|enorm|riesig|Kapitel [0-9]|[0-9]\.[0-9]“: nur noch
  sachliche Treffer („Genau dann“, „Genauigkeit“, „einfachste Potenzreihe“, Heath-§-Nummern).
- `{#id}`-Links, Imports, Titel, Widget-Tags gegen `git show HEAD` verglichen: unverändert
  bis auf den neuen Link `{#logarithm}` in likelihood.
