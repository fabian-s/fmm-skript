# Gutachten: Konzept-Pop-ups, Batch 4 (rounding-error … vector)

Stand 2026-09-26. Geprüft wurde der Editor-Durchgang (Bericht `konzepte-4.md`) an 32 Dateien in
`src/concepts/` gegen den Ausgangsstand 21b998d. Der Editor-Stand liegt noch uncommittet im
Arbeitsbaum; meine Edits liegen darüber (9 Dateien, 14 Ersetzungen, nur Prosa).

Je Pop-up: alte und neue Fassung ganz gelesen, Widget-TSX auf Kopfkommentar (Einsicht,
verifizierte Zahlen), Aufgabe, Reglerbereich und Verdikt geprüft, Linktexte gezählt
(`grep -rhoE ':k\[[^]]*\]\{#<id>\}' | sort | uniq -c`) und die fachlich heiklen Linkstellen im
Kontext gelesen (S24, S41, S83, S113, S114, S122, S134, S136, S138 u. a.). Tell-Regex aus
`german-tells.md` erneut; Heath-Verweise (§2.1, §3.1, §3.4, §3.5) gegen `k3r/heath.txt`
stichprobenhaft bestätigt. Titel, Imports und Widget-Tags sind unverändert, die `{#id}`-Bilanz
gleicht dem Editor-Bericht (−`limit`, +`cancellation`, +`taylor-series` ×2, +`spectral-theorem`,
+`similar-matrices`); ich habe keinen Link hinzugefügt oder entfernt.

## 1. Zahlen (`zaehlen.mjs concepts`, Summe der 32 Dateien, inkl. Kommentarköpfe)

| Stand | Wörter | gegenüber Ausgang |
| --- | ---: | ---: |
| Ausgangsstand (Baseline) | 6 051 | |
| nach Editor | 5 876 | −2,9 % |
| nach Review | 5 805 | −4,1 % |

Median 184 → 183 → 183, Maximum 367 → 287 → 229. Vertiefung = 0. Über ~220 liegen noch
spectral-radius (229, davon ~25 Wörter Kommentarkopf), triangle-inequality (228), rounding-error,
supremum, taylor-series, taylor-theorem (224–225). Gesamtsumme aller Pop-ups: 26 003 → 24 895
(−4,3 %).

Von der Gutachterin geänderte Dateien (Baseline → Editor → Review):

| Pop-up | Wörter | Änderung der Gutachterin |
| --- | ---: | --- |
| taylor-theorem | 225 → 240 → 225 | **Scheinbarer Widerspruch:** Das Beispiel $n = 2$ ($|\sin t - t| \le |t|^3/6$, bei $t = 0{,}1$ zu 99,9 % ausgeschöpft) stand direkt vor dem Lead-out „bei kleinem $t$ ist die Schranke großzügig“ (gilt für die ungeraden $n$ des Widgets, 10 % bei $n = 3$). Zweites Beispiel samt Zahlen gestrichen, die allgemeine Sinus-Schranke $|R_n(t)| \le |t|^{n+1}/(n+1)!$ bleibt (sie ist das Band im Widget). Lead-out: „Die Kurve“ → „Die Sinuskurve … im Band um $p_n$“; $|f^{(n+1)}(\xi)| = |\sin\xi|$ ($f$ ist im Pop-up die allgemeine Funktion) → „die $(n+1)$-te Ableitung ist $\pm\sin$“. Keine Linkstelle (S108, S114, S122, S124, S134, S136) braucht das Beispiel. |
| triangle-inequality | 367 → 287 → 228 | Unter ~230 gekürzt: Eröffnungssatz „Der direkte Weg ist nie länger als der Umweg“ (derselbe Gedanke steht im Folgesatz als „Luftlinie … Umweg über die Ecke“), Zahlenbeispiel $(3,0)$/$(0,4)$ (das Widget liefert das Beispiel), Gleichheitsfall-Satz (der Lead-out sagt ihn für das Widget; S122 erklärt seinen Gleichheitsfall selbst), „dazwischen fällt es mit wachsendem Winkel“. Herleitungshinweis der umgekehrten Form verdichtet, nicht gestrichen. Lead-out „erreicht es“ (Bezug auf eine Formel) → „wird … erreicht“. Beide Formen, der Betragsfall (S113) und das Sandwich mit $\lVert\ba + \bb\rVert$ (Widget) bleiben. |
| taylor-series | 247 → 232 → 225 | **Zu allgemein:** „jeder weitere Term … passt das Polynom über einen breiteren Bereich an“ stand ohne die frühere Einschränkung „beim Sinus“ und wiederholte zugleich den Lead-out, der es für $\sin$ mit Zahlen belegt. Satzteil gestrichen; aus „verlangt eine Ableitung mehr (:k[Differenzierbarkeit]…)“ wird „verlangt, dass $f$ einmal mehr :k[differenzierbar]{#differentiability} ist“ (gleiche id). |
| spectral-radius | 235 → 226 → 229 | **Fachlich zu stark:** „$\bx_{k+1} = \bG\bx_k + \bc$ konvergiert genau dann für jeden Startwert, wenn $\rho(\bG) < 1$“ ist so falsch ($\bG = \bI$, $\bc = \bnull$: jede Folge ist konstant, also konvergent). → „für jeden Startwert und jedes $\bc$“. |
| triangular-solve | 222 → 215 → 216 | „einen Faktor $n$ weniger als die $\sim n^3/3$“ (der Faktor ist $n/3$) → „eine Potenz von $n$ weniger“. |
| sherman-morrison-formula | 218 → 207 → 213 | **Undefiniertes Symbol:** $\bx_i$ im neuen Satz zum Weglassen eines Datenpunkts → „ist $\bx_i^T$ seine Zeile in $\bX$“. |
| span | 160 → 146 → 148 | Lead-out „Zwei unabhängige Vektoren spannen die ganze Ebene auf“ gilt nur im $\R^2$ (die allgemeine Aussage des Altstands war vor das Widget gekürzt worden) → „Zwei unabhängige Vektoren des $\R^2$ …“. |
| supremum | 277 → 229 → 225 | „…, ein Maximum existiert nicht“ nach $\sup(1 - 1/n) = 1$ gestrichen (zwei Zeilen vorher: „hat kein größtes Element“). Die Folge bleibt als Beispiel, weil S24 genau für „Suprema der Restfolgen“ verlinkt. |
| rounding-error | 235 → 222 → 224 | „Wie stark eine solche Störung der Eingabe …“ (Bezug auf „diese Fehler“ des Vorsatzes, die Rundungsfehler von Operationen sind) → „eine Störung dieser Größe in der Eingabe“. |

## 2. Geprüft und bestätigt (Editor-Änderungen in Ordnung)

- **Fachkorrekturen des Editors, alle richtig:** trace (Leitfrage „Determinante bleibt gleich“
  widersprach der Widget-Aufgabe), taylor-theorem (Lead-out „großzügig bei größeren $t$“ war
  verkehrt; Widget-Kopf $n = 3$: 9,9 % bei $t = 0{,}5$, 36 % bei $t = 2$), spectral-radius
  ($\bG(\bx^*)$ undefiniert), rounding-error („höchstens“ $\varepsilon_{\text{mach}} = 2^{-52}$,
  passt zu machine-epsilon), SVD („Wurzeln von Eigenwerten“), supremum („niedrigste Höhe …“),
  spectral-theorem und symmetric-matrix (negative Eigenwerte spiegeln), tangent-line
  (differenzierbar statt glatt), unbiased-estimator („meist daneben“), set-builder-notation
  (Absatz mit „:“, du-Form), subspace (hängender Relativsatz), vector ($\bL\bu = \boldsymbol f$
  → $\bA\bx = \bb$).
- **Lead-outs gegen Widget-Kopf nachgerechnet, alle richtig:** rounding-error (8,28 Stellen bei
  $k = 4$, exakt $0$ ab $k = 8$), secant-line ($2 + h$, Abstand $h$), sequence ($a_1 = 1$,
  $a_{20} = 0{,}05$, rote Linie bei $0$), sine-cosine (Verdiktgrenze $|\cos x| < 0{,}08$, Regler
  0,05-Schritte, „etwa bei $\pi/2$“), SVD ($\bV^\top$ legt $\bv_1, \bv_2$ auf die Achsen),
  slope ($a = -1{,}5$ im Raster erreichbar), smooth-function (einseitige Steigungen $\mp 1$,
  $x^2/2$), sparse-matrix ($n(2b+1) - b(b+1)$ = 34 für $b = 1$; das Widget definiert die
  Bandbreite wie das Pop-up über $|i - j| \le b$), spectral-radius ($\bG = s\bR(\theta)$ ohne
  $\bc$, wie im Widget), subspace (drei Modi; $A + B = (2; 4)$ nicht auf der verschobenen
  Geraden), supremum ($f(99) = 0{,}99$, also $x > 99$), symmetric-matrix
  ($(3 \pm \sqrt{1 + 4c^2})/2$, Vorzeichenwechsel bei $|c| > \sqrt2$, Regler bis $\pm 2$),
  tangent-line ($w^2$; 1,1 % bei Zoom $2^5$), taylor-series (3,142 → 2,114·10⁻⁵ bei $\pi$;
  bei $2\pi$ 6,28 / 35,1 / 46,5, dann fallend), tensor (27 Zellen), trace
  ($\lambda = 3 \pm \sqrt{9 - \det}$), triangular-solve ($x = (1, 2, 3)$, $3 + 3 + 3 = 9$),
  unbiased-estimator (linke Wolke streut, trifft im Mittel), similar-matrices
  ($\bP^{-1}\bA\bP = \diag(2, 3)$ von Hand nachmultipliziert).
- **Ergänzungen des Editors, alle von Linkstellen gedeckt:** Ähnlichkeitstransformation
  $\bB = \bQ\bA\bQ^{-1}$ (S81 Z. 35), charakteristisches Polynom (S34 Z. 252),
  Spaltenraum (2× „Spaltenraum“), Stufe (Tensor-Links), Transponierregel (S33, S34),
  Linearität und Zyklizität der Spur, unverzerrt (S124), Rück-/Vorwärtssubstitution
  (1× bzw. 4× verlinkt), „beliebig oft differenzierbar“ (S133 Z. 435, S139 Z. 437),
  $\rho(\bA) \le \|\bA\|$ (S35 Z. 266, S82 Z. 60), lineare Iteration mit Iterationsmatrix
  (S83 Z. 385, dort $\bI - \bC\bA$), Funktionen- und Matrizenräume (vector-space).
- **Gestrichenes, von keiner Linkstelle gebraucht:** Broyden-Absatz (einziger Link S138 LOOCV),
  Householder-Detail (sparse-matrix), Normalengleichungs-Durchlauf mit unerklärtem $\bL$
  (triangular-solve), konvexe Konjugierte (supremum; S114 verlinkt für das punktweise Supremum),
  Interpolations-Exkurs (taylor-series), Geraden-Test (vector-space; steht in subspace).

## 3. Anmerkungen zum Editor-Bericht

- Zutreffend; Zahlen, Link-Bilanz und Prüfergebnisse stimmen. Übersehen hatte der Editor zwei
  Verallgemeinerungen, die beim Kürzen einer Einschränkung entstanden sind (taylor-series „beim
  Sinus“, span „im $\R^2$“), das neue undefinierte $\bx_i$ in sherman-morrison und die zu starke
  Konvergenzaussage in spectral-radius.
- Ermessensfragen 1, 2, 6, 7 teile ich: $x(t) \to f(t)$ ist reine Umbenennung (Widget-Achse und
  alle Linkstellen schreiben $f$); $\bA\bx = \bb$ statt $\bL\bu = \boldsymbol f$ ist richtig;
  Broyden als Nebensatz vertretbar; S121 verlinkt die nichtlineare Fixpunktiteration nicht hierher.
- Frage 4 (Rohzahlen über 220) ist mit diesem Review weitgehend erledigt: Maximum jetzt 229.

## 4. Offene Fragen für den Dozenten

1. **smooth-function:** Pop-up und Titel schreiben $C^k$/$C^\infty$, die Folien überwiegend
   $\mathcal C^k$ (10×, einmal $C^\infty$), das Skript $\Ccal^k$. Der Titel darf sich nicht
   ändern; den Fließtext allein umzustellen, erzeugt einen Bruch zum Titel. Nicht angeglichen.
2. **trace-Widget:** Die Leitfrage sagt „Die Spur bleibt $6$“; das `MatrixInput` lässt auch die
   Diagonale editierbar. Der Lead-out („symmetrisch um $3$“) gilt nur, solange die Diagonale
   3/3 bleibt. Eine Einschränkung im Widget wäre TSX-Arbeit, nicht Pop-up-Prosa.
3. **span:** 8 Linkstellen verlinken den Text „Spann“, das Pop-up nennt nur „lineare Hülle
   (span)“. Die Zuordnung ist offensichtlich; ein „(auch *Spann*)“ kostet zwei Wörter, falls
   gewünscht.
4. **taylor-theorem, Kontrollwert:** Der Widget-Kopf nennt als Kontrollwert noch
   $\sin(0{,}1) - 0{,}1 = -1{,}666 \cdot 10^{-4}$, das Beispiel steht nicht mehr im Pop-up.
   Harmlos (Kommentar), TSX nicht angefasst.

## 5. Prüfungen (nach allen Edits)

- `npm run typecheck:mdx`: 206 MDX-Dateien, Exit 0.
- `node scripts/gen-numbers.mjs --check`: 0 `FEHLER`-Zeilen (nur „Tabelle ist nicht aktuell“,
  erwartet bei parallelen Kapitel-Edits).
- `npm run test:mdx`: 137/137 Fixtures, Orakel-Regressionstest bestanden.
- `npm run verify:numbers`: 124 Prüfscripte erfolgreich, Exit 0 (die Zeile „FEHLER: Makroname
  erscheint als Literaltext“ ist der beabsichtigte `\cbblue`-Negativtest). Kein Prüfscript liest
  eine der 32 Konzeptdateien.
- Headless-MathJax (`k4r/k4r-checkmath.mjs`, 187 Kursmakros, `noundefined` entfernt, Negativtest
  `\foo` erkannt): 459 Literale der 32 Dateien, 0 Fehler; alle 1 798 Literale aller 134 Pop-ups,
  0 Fehler.
- Tell-Regex (`german-tells.md` plus „einfach|eigentlich|billig|wirklich|Buchführung|man|
  lediglich|ganz ohne|gutartig|elegant|sauber|ja|eben“): nur Kommentarkopf, `ZoomWidget`,
  „32-fachem Zoom“, „im einfachsten Fall“. Keine Gedankenstriche, keine getippten Skript-Nummern.
- Titel, Imports, Widget-Tags gegen 21b998d unverändert.
