# Folienfehler-Register (fmm-lmu/slides)

Sammelstelle für alle inhaltlichen Fehler, Tippfehler und irreführenden
Stellen, die bei der Skript-Arbeit in den Foliensätzen auffallen — damit
sie bei der nächsten Folien-Überarbeitung nicht verlorengehen.

Format je Eintrag: Foliensatz, Stelle (Zeile im .Rmd / Folientitel),
Befund, Status im Skript. Neue Funde bitte im passenden Abschnitt
anhängen; Autoren-/Review-Agenten tragen hier zusätzlich zur
Lesson-Zeile ein.

## 01-intro

- **Z. 84 („Warum so viel Mathe")**: n = 1.000 bei p = 10.000 — damit
  wäre XᵀX singulär und die naive KQ-Formel unanwendbar.
  *Skript §1.1 nutzt n = 100.000.*
- **Z. 126/130 (Beispiel 1)**: Störung ist 0,005 %, nicht „0.01%"
  (0,0001/2,0001 ≈ 5·10⁻⁵). *Im Skript korrigiert.*

## 03-matrix-spur-norm

- **Z. 82–87 („Eigenschaften der Spur")**: Eigenschaft 1 heißt „Linear",
  ist aber nur die Additivität (Homogenität steht separat als 2); das in
  Eigenschaft 4 benutzte P wird im Satzkopf nicht deklariert.
  *Skript Satz 3.1.4 schreibt „Additiv" und ergänzt „invertierbares
  P ∈ ℝⁿˣⁿ".*
- **Z. 221**: Die Vertauschungsmatrix (0 1; 1 0) ist KEINE „Rotation um
  90°", sondern eine Spiegelung an x₂ = x₁ (det = −1; Rotation wäre
  (0 −1; 1 0)). *Skript Beispiel 3.2.6 sagt Spiegelung.*
- **Z. 278 (p-Norm-Definition)**: Betrag fehlt (v_iᵖ statt |v_i|ᵖ).
  *Skript setzt |v_i|ᵖ.*
- **Z. 307–308 (Orthogonalmatrizen)**: Die Implikation
  „|λ(Q)| = 1 ⇒ κ₂(Q) = 1" gilt so nicht (Eigenwertbeträge bestimmen κ₂
  i. A. nicht). *Skript leitet κ₂(Q) = ‖Q‖₂‖Q⁻¹‖₂ = 1 über Q⁻¹ = Qᵀ her.*
- **„Visualisierung Operatornorm" (R-Chunk)**: `matrix(c(...))` füllt
  SPALTENWEISE — die zeilenweise gemeinte Matrix wird still zu Aᵀ; die
  Singulärwerte sind zufällig identisch, aber gedrucktes A und AᵀA sind
  falsch. *Skript-Codeblöcke nutzen `byrow = TRUE`, Output per Rscript
  verifiziert.*
- **„Schattennormen"**: Definitions-Satz verstümmelt („…mit AᵀA mit
  Eigenwerten…"); der „Beweis" von ‖A‖_F² = tr(AᵀA) setzt die Behauptung
  in der ersten Gleichung voraus und schreibt tr(PᵀΛP) statt tr(PΛPᵀ).
  *Skript Satz 3.4.3 beweist elementweise + Spur-Zyklizität.*
- **Z. 500 (Zusammenfassung)**: „Kondition = Verhältnis der extremen
  Eigen-/Singulärwerte" — für Eigenwerte nur im symmetrischen Fall und
  mit Beträgen richtig. *Skript übernimmt die Formulierung nur mit
  Einschränkung.*
- **Z. 534 (auskommentiert)**: Gegenbeispiel zu tr(AB) ≠ tr(A)·tr(B)
  falsch (vergleicht I₂ mit tr(I₁)·tr(I₁) = 1, wo sogar Gleichheit
  gälte). *Skript §3.6 nutzt A = B = I₂: tr(AB) = 2 ≠ 4 = tr(A)·tr(B).*
- **Lücke**: Maximumsnorm-Gegenbeispiel und Quiz-SOLUTIONs stehen nur in
  auskommentierten Blöcken. *Skript formuliert beides aus (nachgerechnet:
  A = Einsermatrix ⇒ ‖A²‖_M = 2 > 1 = ‖A‖_M²).*

## 04-fehler

- **Z. 174–175 („Beispiel: Fehlerzerlegung")**: Vorzeichenfehler in den
  Zwischenzeilen — der Algorithmusfehler ist −Σ_{n=3}^∞ 3ⁿ/n! bzw.
  8,5 − e³ (Folie schreibt e³ − (1+3+9/2) = +11,585); die Endwerte −11,6
  und −3 stimmen. *Skript Beispiel 4.1.6 rechnet korrekt
  (−11,586, −3,055, −14,641).*
- **Z. 191–200 (Kondition von f(x) = 1/x)**: Der Blow-up betrifft
  κ_abs = 1/x² bzw. relativ nicht-kleine Störungen; asymptotisch gilt
  κ_rel = 1. *Skript Beispiel 4.2.5 klärt das.*
- **Z. 240–246 (κ_rel für f(x) = A⁻¹x)**: Herleitung verdreht (behauptet
  κ_abs‖x‖/‖A⁻¹x‖ ≤ κ_rel und springt dann zur Gleichheit).
  *Skript Satz 4.2.6 leitet κ_rel = ‖A⁻¹‖‖x‖/‖A⁻¹x‖ sauber über den
  Gleichheitsfall der Operatornorm her.*
- **Z. 245/400**: κ(A) = ‖A‖‖A⁻¹‖ ist nur OBERE Schranke der relativen
  Kondition von x ↦ A⁻¹x, nicht „die" Kondition; außerdem schreibt die
  Übersicht Z. 400 Δ_v unfett, die Definition Z. 85 fett.
  *Skript schwächt die Formulierung ab und nutzt durchgehend \bDelta.*
- **Z. 291 (Aufgabe)**: Es gilt sogar κ_abs = √2 exakt
  (Cauchy-Schwarz-Gleichheitsfall), nicht nur ≤. *Im Skript vermerkt.*

## 05-lgs

- **Z. 108 („Matrixmultiplikation")**: „Alman & Williams (2020):
  ≈ O(n^2.37) (nichts besseres bekannt)" ist überholt — der Exponent
  wurde seit 2020 mehrfach gedrückt (Duan/Wu/Zhou 2022: 2,371866;
  Williams/Xu/Xu/Zhou 2023: 2,371552; Alman/Duan/Williams/Xu/Xu/Zhou
  2024: 2,371339). Der Wert ≈ 2,37 stimmt weiterhin, die Zuschreibung
  „nichts Besseres bekannt" nicht mehr. *Skript §5.1 schreibt
  „wesentlich Besseres ist bislang nicht bekannt".* Nebenbei: Z. 61
  „insbesonders" → „insbesondere"; die Abbildung Z. 109
  (`resources/deepmind`) steht ohne Quellenangabe und Bildunterschrift
  auf der Folie. *Skript übernimmt sie nicht (öffentliches Repo) und
  nennt AlphaTensor stattdessen im Text.*
- **Z. 232–233 (LU-Zerlegung)**: U = L_n⋯L_1·A und
  L = L_1⁻¹⋯L_n⁻¹ — es gibt aber nur n−1 nichttriviale
  Eliminationsschritte (L_n wäre I); sauber wäre L_{n−1}.
  *Skript §5.3 (Satz 5.3.3) indiziert mit L_{n−1} und merkt das an.*
  Dieselbe Off-by-one steht auf der Komplexitätsfolie (Z. 381:
  Σ_{k=1}^n statt Σ_{k=1}^{n−1}). *Skript Satz 5.3.10 summiert bis n−1.*
- **Z. 375 (Lösungskommentar zur Quiz-Folie)**: „nur die einträge in der
  rechten unteren (n−k−1)×(n−k−1) ecke ändern sich" ist um eins
  verschoben — im k-ten Schritt ändern sich die Zeilen k+1,…,n in den
  Spalten k+1,…,n, also ein (n−k)×(n−k)-Block, dazu die neue Null in
  Spalte k und die rechte Seite (zusammen (n−k)(n−k+1) Aktualisierungen).
  Die Antwort O((n−k)²) bleibt richtig, die Begründung stimmt so nicht.
  *Skript §5.3 (Quiz-Frage 2 und Beweis zu Satz 5.3.10) rechnet den Block
  explizit ab.*
- **Z. 288–298 (Theorem „LU-Zerlegung")**: „Jede invertierbare Matrix A
  hat eine Darstellung A = LU" ist FALSCH — Gegenbeispiel
  (0 1; 1 0): Pivot 0, keine LU-Zerlegung ohne Zeilentausch. Korrekt:
  PA = LU existiert für jede invertierbare Matrix (Pivotierung); A = LU
  ohne P genau dann, wenn die Elimination ohne Nullpivot durchläuft
  (führende Hauptminoren ≠ 0). *Skript §5.3: Satz 5.3.5 mit
  Warnbeispiel 5.3.6 (Widerspruchsbeweis für die Vertauschungsmatrix).*
- **Z. 410–416 (SPD-Definition)**: Doppelte Mengenklammern
  „x ∈ {ℝⁿ \ {0}}"; in der Semidefinit-Zeile ist der Ausschluss von 0
  zudem unnötig (für ≥ 0 unerheblich). *Skript schreibt
  x ∈ ℝⁿ, x ≠ 0.*
- **Z. 462–463 (Cholesky-Induktionsbeweis)**: Tippfehler \bc\top statt
  \bc^\top (fehlendes Dach) im Testvektor; außerdem fehlt der Quantor
  „für x ≠ 0" an der strikten Ungleichung. *Skript §5.4: Beweis zu
  Satz 5.4.2 setzt beides korrekt und führt den Quantor explizit mit.*
- **Z. 465 (Cholesky-Induktionsbeweis, Blockmatrix L)**: Der Block rechts
  oben ist als \bnull gesetzt, gebraucht wird der Zeilenvektor \bnull^⊤
  (1 × (n−1)); so wie gedruckt passen die Blockdimensionen nicht.
  *Skript §5.4 (Beweis zu Satz 5.4.2, letzter Schritt) schreibt \bnull^⊤.*
- **Z. 438 („Warum wichtig?")**: „Existenz und Eindeutigkeit der
  Cholesky-Zerlegung" — eindeutig ist die Zerlegung erst mit einer
  Normierung: Mit D = diag(±1) ist auch (LD)(LD)^⊤ = LL^⊤ eine Zerlegung
  in eine untere Dreiecksmatrix. Verlangt man positive Diagonaleinträge
  in L (genau das liefert die Induktion mit √a > 0), stimmt die Aussage.
  *Skript §5.4 nennt die Normierung sowohl in der Aufzählung als auch im
  Absatz nach dem Beweis.* Nebenbei: Z. 423 „Hauptkomponententanalyse" →
  „Hauptkomponentenanalyse"; Z. 429/430 setzen die Indexkomponenten fett
  (∂²/∂\bx_i∂\bx_j, ∂²/∂\btheta_i∂\btheta_j), gemeint sind die Skalare
  x_i bzw. θ_i. *Skript §5.4 setzt sie unfett.*
- **Z. 584 („Vergleich: LU und Cholesky")**: Der Fazit-Block ist als
  einziger Block des ganzen Foliensatzes um zwei Spalten eingerückt und
  zählt damit als Fortsetzungsabsatz des letzten Aufzählungspunkts
  („Pivotierte Variante"), statt eigenständig zu stehen; rein
  typografisch, aber die Zusammenfassung rutscht so in die Cholesky-Liste.
  *Skript §5.5 stellt das Fazit als eigene Bemerkung 5.5.1 dar.*

## 06-svd

- **Z. 84 („Geometrische Intuition")**: „Einheitssphäre in R³ → Ellipse
  in R²" ist für das gezeigte A ∈ R^{2×3} ungenau. Bei Rang 2 ist der
  Kern eindimensional, also enthält {Ax : ‖x‖ = 1} auch den Nullpunkt;
  das Bild ist die AUSGEFÜLLTE Ellipse, nicht die Ellipsenkurve. Erst
  für injektives A (m ≥ n, voller Spaltenrang) ist das Bild der
  Einheitssphäre wieder eine Sphäre/Ellipse ohne Inneres. *Skript §6.1
  sagt für den 2×2-Fall „Ellipse" und für die Abbildung von R³ in die
  Ebene ausdrücklich „ausgefüllte Ellipse"; die Hauptachsen sind in
  beiden Fällen dieselben.*
- **Z. 51 („Verwendete Vorkenntnisse")**: `\bA^T` statt `\bA^\top` (der
  ganze Foliensatz nutzt sonst `^\top`). Rein typografisch.
- **Z. 56–61 („Diagonalisierung ist limitiert")**, Lücke: Die Folie nennt
  als Grenzen nur „quadratisch" und „symmetrisch". Auch unter den
  quadratischen Matrizen hat aber nicht jede eine Eigenwertzerlegung —
  (0 1; 0 0) besitzt nur den Eigenwert 0 mit eindimensionalem Eigenraum,
  also keine Basis aus Eigenvektoren. Dieselbe Verwechslung von
  hinreichend und notwendig taucht im Lösungskommentar der Quiz-Folie
  (Z. 700) wieder auf. *Skript §6.1 ergänzt den Fall im Motivationstext
  und in Bemerkung 6.1.1.*
- **Z. 89 („Geometrische Intuition")**: Die Folie verlinkt eine
  interaktive Visualisierung auf einem fremden Hoster
  (`claude.ai/public/artifacts/…`) — nicht Teil des Foliensatzes und
  jederzeit tot. *Skript §6.1 ersetzt sie durch ein eigenes Widget
  (Einheitskreis → Ellipse mit Winkel-Slider und Streckfaktor-Kurve); die
  Folie kann darauf verweisen.*
- **Z. 121–123 („Die Matrix AᵀA", Beweis für (2))**: „Für jeden
  Eigenvektor v_i gilt 0 ≤ ‖Av_i‖² = v_iᵀ(AᵀA)v_i = v_iᵀ(λ_i v_i) = λ_i"
  — der letzte Schritt gilt nur für ‖v_i‖ = 1, sonst steht dort
  λ_i‖v_i‖². Die Aussage λ_i ≥ 0 bleibt richtig, die Rechnung so nicht.
  Ausserdem ist „positiv semidefinit" (Z. 118) eine Eigenschaft der
  quadratischen Form, xᵀ(AᵀA)x ≥ 0 für alle x; die Folie erklärt sie über
  die Eigenwerte, was den Spektralsatz voraussetzt, der erst als
  „Folgerung" darunter (Z. 125) auftaucht. *Skript Satz 6.2.1 nennt beide
  Formen; der Beweis zeigt zuerst xᵀ(AᵀA)x = ‖Ax‖² ≥ 0 direkt aus der
  quadratischen Form und normiert dann v_i, die Reihenfolge
  Spektralsatz/Eigenwerte steht im Anschlusstext.*
- **Z. 238 („Bsp: Singulärvektoren (2)")**: Vorzeichenfehler bei u₂. Zu
  dem auf Z. 231 gedruckten v₂ ≈ (0,662, −0,750)ᵀ gehört
  u₂ = Av₂/σ₂ ≈ (−0,691, 0,474, 0,546)ᵀ (nachgerechnet: Av₂ =
  (−0,838, 0,574, 0,662)ᵀ, σ₂ ≈ 1,212); die Folie druckt das Negative
  (0,691, −0,474, −0,546)ᵀ, das zu v₂ ≈ (−0,662, 0,750)ᵀ gehören würde.
  u₁ (Z. 237) passt dagegen zum dortigen v₁. Die Orthonormalitätsprobe
  auf Z. 242 rechnet mit der falschen Variante weiter; ihre drei
  Summanden haben deshalb alle das umgekehrte Vorzeichen, und dass die
  Summe trotzdem 0 ergibt, liegt allein daran, dass Negieren die
  Orthogonalität nicht ändert. *Skript §6.2 (Beispiel 6.2.9) behält die v_i der
  Folie und druckt u₂ ≈ (−0,691, 0,474, 0,546)ᵀ; Bemerkung 6.2.10
  erklärt die Vorzeichenfreiheit.*
- **Z. 252–256 („Fundamentale Unterräume")**: Die v_i sind orthoNORMAL,
  nicht bloß orthogonal; umgekehrt sind die Av_i in (2) tatsächlich nur
  orthogonal, ihre Längen sind σ_i. *Skript Satz 6.2.11 unterscheidet
  beides und normiert in (2) ausdrücklich zu den u_i.*
- **Z. 285 („Rechenbeispiel: Fundamentale Unterräume")**: u₂ und u₃
  stehen dort ohne Kommentar, obwohl die Definition u_i = Av_i/σ_i sie
  wegen σ₂ = 0 gar nicht liefert; sie entstehen erst durch Ergänzung von
  u₁ zu einer Orthonormalbasis des R³. *Skript Beispiel 6.2.12 sagt das
  dazu.*
- **Z. 377 („Reduzierte SVD: Motivation")**: „Σ enthält (m−r) Nullzeilen
  oder (n−r) Nullspalten" — beides gilt gleichzeitig, nicht alternativ
  (die Blockform Z. 323–326 zeigt es selbst). *Skript §6.3 schreibt
  ausdrücklich „und beides gilt gleichzeitig".*
- **Z. 415 („Moore-Penrose Pseudoinverse")**: „Für jede Matrix A ∈ ℝ^{m×n}
  mit Rang r und reduzierter SVD A = U_r Σ_r V_r^⊤" — für A = 0 ist r = 0,
  eine reduzierte SVD in dieser Form gibt es dann nicht, und Σ_r^{-1} ist
  undefiniert, obwohl 0⁺ = 0 sehr wohl existiert. *Skript §6.3 setzt in
  Definition 6.3.2 und 6.3.5 durchgehend r ≥ 1 voraus.*
- **Z. 472 („Spektralnorm und SVD")**: `‖A‖₂ := σ_max(A)` steht als
  Definition, obwohl die Folie zwei Zeilen darüber („Bisher: ‖A‖₂ =
  √λ_max(AᵀA)") die schon vergebene Definition zitiert; es ist eine
  Aussage, keine Festlegung. *Skript §6.4 formuliert sie als Satz 6.4.1
  mit Beweis und weist auf die Doppelbelegung hin.*
- **Z. 500–503 („Theorem: Optimale Approximation")**: `A_k = argmin …_F =
  argmin …₂` behauptet Eindeutigkeit der Minimalstelle. In der
  Frobeniusnorm gilt sie nur für σ_k > σ_{k+1}, in der Spektralnorm i. A.
  gar nicht: für A = diag(3, 2) und k = 1 hat jedes B = diag(b, 0) mit
  b ∈ [1, 5] den Fehler max(|3−b|, 2) = 2 = σ₂. *Skript Satz 6.4.4 sagt
  „löst beide Approximationsprobleme", Bemerkung 6.4.5 führt das
  Gegenbeispiel.*
- **Z. 561 („Anwendung - Datenkompression")**: „*Kompressionsrate*:
  ≈ 83% weniger Speicher" vermischt zwei Größen — 58.600/337.408 ≈ 17,4 %
  ist der Speicheranteil, die Ersparnis 82,63 %, die Kompressionsrate wäre
  337.408/58.600 ≈ 5,8. Der Zahlenwert 83 % stimmt als *Ersparnis*.
  *Skript Beispiel 6.4.8 rechnet beide Zahlen aus und nennt nur die
  Ersparnis; ergänzt ist die Break-even-Grenze k ≤ 287 (ab k = 288 kostet
  die Rang-k-Form mehr als das Bild selbst).*
- **Z. 572–581 („Beispiel - Datenkompression")**: Die vier
  `resources/gauss-*.jpg` (Porträt) und `gauss-singular-values.pdf` stehen
  ohne Quellen-, Lizenz- oder Urheberangabe auf der Folie; die
  `\caption` ist auskommentiert, die Abbildung damit ganz unbeschriftet.
  *Skript §6.4 übernimmt die Bilder nicht (öffentliches Repo) und ersetzt
  sie durch ein Rang-k-Widget mit synthetischem Graustufenbild; der
  Shiny-App-Link der Folie bleibt als eigenes Material erhalten.*
- **Z. 651 („SVD vs. Eigenwertzerlegung")**: Die Zeile „Singularität:
  Problem bei det(A) = 0" trifft nicht den Punkt — ein Eigenwert 0 ist
  harmlos, es scheitert an fehlender Diagonalisierbarkeit (zu wenige
  Eigenvektoren für eine Basis). *Skript §6.4 formuliert die Tabellenzeile
  entsprechend um und ergänzt einen Absatz dazu.*
- **Z. 646–649 (dieselbe Tabelle)**: Die Spalte heißt „Spektralzerlegung",
  die Zeile darunter behauptet aber „Orthogonale Zerlegung: Nur
  symmetrisch". Beides zusammen geht nicht: Die Spektralzerlegung
  A = PΛPᵀ hat orthogonale Faktoren per Definition; gemeint ist die
  allgemeine Eigenwertzerlegung A = PDP⁻¹ mit beliebigem invertierbarem P.
  *Skript §6.4 nennt die Spalte „Eigenwertzerlegung" und sagt im Absatz
  davor, dass daraus erst im symmetrischen Fall die Spektralzerlegung
  aus §3.3 wird.*
- **Z. 680 („Querverbindungen")**: „Fundamentale Unterräume: Explizite
  Orthogonalbasen" bleibt hinter dem zurück, was die SVD liefert — die
  Spalten von U und V sind orthoNORMAL, nicht bloß orthogonal (dieselbe
  Untertreibung wie auf Z. 252–256). Ausserdem sagt der Stichpunkt nicht,
  welcher Faktor welche Basis stellt. *Skript §6.5 schreibt
  „Orthonormalbasen" und benennt die Spaltenbereiche: die ersten r Spalten
  von U spannen col(A) auf, die ersten r Spalten von V den Zeilenraum, die
  übrigen Spalten von V den Kern (Satz 6.2.11).*
- **Z. 700 (Lösungskommentar der Quiz-Folie)**: Zu Aussage 4 („A ∈ ℝⁿˣⁿ
  ist immer diagonalisierbar") steht dort als Begründung „nur wenn
  symmetrisch". Symmetrie ist aber nur HINREICHEND: (2 1; 0 1) hat die
  verschiedenen Eigenwerte 2 und 1, ist diagonalisierbar und
  unsymmetrisch. Äquivalent ist Symmetrie erst zur ORTHOGONALEN
  Diagonalisierbarkeit. *Skript §6.5 begründet die Antwort mit dem
  Jordan-Block (0 1; 0 0), dessen Eigenraum zum einzigen Eigenwert 0 nur
  eindimensional ist, und stellt hinreichend/notwendig richtig.*
- **Z. 718 („Praktische Hinweise")**: `irlba::irlba(A, nv = k)` wird als
  „randomized (truncated) SVD … (stochastische Approximation)" geführt.
  IRLBA ist ein Krylov-Verfahren (implicitly restarted Lanczos
  bidiagonalization); zufällig ist allenfalls der Startvektor, die
  Genauigkeit ruht nicht auf Randomisierung. *Skript §6.5 nennt irlba als
  Weg zu den k größten Singulärwerten, ohne das Etikett „stochastisch".*

## 07-kq

- **Z. 372 („Beispiel: QR-Zerlegung (2)")**: Die gezeigte Matrix A ist
  ein Tippfehler; die gerechneten Werte gehören zu A = (1 2; 0 0; 0 2)
  von der Vorfolie. *Skript §7.4 nutzt durchgehend die korrekte Matrix.*

## 08-la-misc

- **Z. 95 („Potenzmethode", Idee)**: Die Eigenwertschätzung
  λ⁽ᵏ⁾ = ‖Ax⁽ᵏ⁾‖/‖Ax⁽ᵏ⁻¹⁾‖ passt nicht zu der direkt darüber definierten
  *normierten* Iteration: Mit Normierung in jedem Schritt haben Zähler und
  Nenner denselben Grenzwert |λ₁|, der Quotient strebt also gegen 1. Der
  Quotient gehört zur unnormierten Iteration z⁽ᵏ⁾ = Az⁽ᵏ⁻¹⁾; mit Normierung
  lautet die Schätzung λ⁽ᵏ⁾ = ‖Ax⁽ᵏ⁻¹⁾‖. *Skript Bemerkung 8.1.3 stellt beide
  Formen gegenüber und ergänzt den Rayleigh-Quotienten.*
- **Z. 154 („Beispiel", B = QAQᵀ)**: Die Folie liest die Diagonale von
  B = diag(4, 9) als „λ₁ = 4, λ₂ = 9" und widerspricht damit der
  Potenzmethoden-Folie (Z. 106: λ₁ = 9, λ₂ = 4). Die Reihenfolge auf der
  Diagonalen hängt allein von der Spaltenwahl von Qᵀ ab. *Skript sortiert
  durchgehend absteigend (λ₁ = 9 ≥ λ₂ = 4) und erklärt die Reihenfolge in
  Beispiel 8.1.8.*
- **Z. 183 („QR-Iteration", Ähnlichkeit)**: Die Kette endet mit
  A⁽ᵏ⁾ = (Q⁽ᵏ⁾⋯Q⁽¹⁾)⁻¹ A (Q⁽¹⁾⋯Q⁽ᵏ⁾); der linke Faktor hat die Produkte in
  der falschen Reihenfolge, denn (Q⁽ᵏ⁾⋯Q⁽¹⁾)⁻¹ = (Q⁽¹⁾)⁻¹⋯(Q⁽ᵏ⁾)⁻¹. Richtig
  ist (Q⁽¹⁾⋯Q⁽ᵏ⁾)⁻¹ = Q_kᵀ, wie die Folie zwei Zeilen später (Z. 186, 218)
  auch selbst schreibt. Für 2×2-Matrizen fällt das nicht auf, weil ebene
  Drehungen kommutieren; ab n = 3 sind beide Ausdrücke verschieden (per node
  an einer unsymmetrischen 3×3-Matrix nachgerechnet). *Skript Satz 8.1.11
  formuliert A⁽ᵏ⁾ = Q_kᵀ A Q_k mit Q_k = Q⁽¹⁾⋯Q⁽ᵏ⁾ und beweist es per
  Induktion.*
- **Z. 184 („QR-Iteration")**: „Für k → ∞ konvergiert A⁽ᵏ⁾ gegen eine obere
  Dreiecksmatrix (!)" gilt nicht ohne Voraussetzungen. Gegenbeispiel: die
  Drehung um 90° (0 −1; 1 0) mit Q⁽¹⁾ = A, R⁽¹⁾ = I, also A⁽¹⁾ = A und
  Stillstand; ihre Eigenwerte ±i sind komplex und betragsgleich. *Skript
  Bemerkung 8.1.14 nennt reelle, betragsmäßig getrennte Eigenwerte als
  Voraussetzung und führt das Gegenbeispiel vor.*
- **Z. 218 („QR-Iteration: Interpretation")**: Die Schlusskette
  Q_kᵀ A Q_k → VᵀAV = VᵀVΛVᵀV = Λ setzt A = VΛVᵀ voraus, also ein
  SYMMETRISCHES A mit orthogonalem V. Allgemein ist der Grenzwert die
  Schur-Form (obere Dreiecksmatrix), und von den Spalten des Grenz-Q ist nur
  die erste ein Eigenvektor. *Skript Bemerkung 8.1.14 trennt beide Fälle.*
- **Z. 248–249 („Anwendung: Google PageRank", Matrixform)**: „x = Ax ⟹
  Eigenwertproblem mit λ = 1!" setzt still voraus, dass A
  spaltenstochastisch ist, also dass JEDE Seite mindestens einen ausgehenden
  Link hat — sonst ist d_j = 0 und die Spalte gar nicht definiert. Und für
  die Potenzmethode (Z. 256) genügt „λ = 1 ist Eigenwert" nicht: Zerfällt
  der Graph in mehrere Teile, gehören zum Eigenwert 1 mehrere unabhängige
  Eigenvektoren, periodische Teilnetze liefern weitere Eigenwerte vom
  Betrag 1, und die Voraussetzung |λ₁| > |λ₂| ist verletzt. Der
  Dämpfungsfaktor, der beides repariert, kommt auf den Folien nicht vor.
  *Skript Bemerkung 8.2.1 leitet 1 = größter Eigenwert über ‖A‖₁ = 1 und
  ρ(A) ≤ ‖A‖ her, füllt leere Spalten gleichverteilt auf und führt
  αA + (1−α)/n·E ein (Eigenwert 1 einfach, alle übrigen ≤ α im Betrag).*
- **Z. 257 (dieselbe Folie)**: „Konvergiert in ~50 Iterationen (Web-Graph
  hat spezielle Struktur)" nennt die falsche Ursache. Ohne Dämpfung gibt es
  überhaupt keine Ratengarantie; mit dem klassischen α = 0,85 dagegen ist
  |λ₂| ≤ α und 0,85⁵⁰ ≈ 3·10⁻⁴, was die Zahl 50 gerade erklärt (per node
  nachgerechnet). *Skript §8.2 ergänzt diese Rechnung.*
- **Z. 304 („Anwendung: Approximative SVD (2)")**: „relative
  Frobenius-Fehler der niedrigrangigen Approximationen (zu X und
  zueinander)" beschreibt den Code nicht: Die zweite Zeile misst
  ‖X_r − X_irlba‖_F/‖X_r‖_F und ‖X_r − X_svdr‖_F/‖X_r‖_F, vergleicht die
  beiden iterativen Rekonstruktionen also mit der EXAKTEN Rang-50-Lösung
  X_r, nicht miteinander. *Skript §8.2 benennt beide Zeilen einzeln.*
- **Z. 339 („Iterative Eigenwertverfahren: Vergleich")**: „QR-Iteration oft
  mit quadratischer Konvergenz" gilt nur mit Shifts. Die reine QR-Iteration
  konvergiert linear, der Eintrag (i, j) unter der Diagonalen wie
  |λ_i/λ_j|ᵏ; quadratisch (im symmetrischen Fall mit Rayleigh-Shift sogar
  kubisch) wird sie erst durch die Verschiebungen, die in der Tabellenzeile
  darüber als „(shifted) QR" ja auch stehen. *Skript §8.2 schreibt „die
  QR-Iteration (mit Shifts) oft quadratisch".*
- **Z. 503–505 („Bsp: Richardson-Iteration")**: Iteration 3 ist
  verrechnet. Aus x⁽³⁾ = (7/64, 39/64) folgt mit γ = 0,25 exakt
  x⁽⁴⁾ = (25/256, 160/256) ≈ (0,098, 0,625); die Folie druckt
  (0,095, 0,628). Entsprechend ist der letzte Fehlerwert nicht 0,009,
  sondern ‖x⁽⁴⁾ − x‖₂ ≈ 0,013. Nebenbefund: die Fehlerzeile ist
  abgeschnitten statt gerundet (0,642 statt 0,643, 0,209 statt 0,210,
  0,032 statt 0,033), und x⁽³⁾ steht dort als (0,109, 0,610) statt
  (0,109, 0,609). *Skript Beispiel 8.3.11 rechnet korrekt (per node
  nachgerechnet), Bemerkung 8.3.12 benennt die Abweichung.*
- **Z. 566 („Beispiel", Sketching in R)**: Die Aussage „weniger als 1 %
  [3 %] Abweichung in Distanz [Winkel]" ist eine glückliche Ziehung, keine
  typische. Für Gauss-Skizzen ist ‖Sz‖²/‖z‖² exakt χ²_m/m-verteilt; bei
  m = 50 hat die relative Abweichung des Abstands damit die
  Standardabweichung 9,97 % (Faustregel 1/√(2m) = 10 %), und nur 7,94 %
  aller Ziehungen bleiben unter der 1 %-Marke, also knapp 8 %. (Die frühere
  Fassung dieses Eintrags schätzte aus 200 Monte-Carlo-Ziehungen „rund 6 %";
  eine unabhängige Nachrechnung mit 400 Ziehungen liefert 8,5 %, die exakte
  χ²-Rechnung 7,94 %.) Winkel: sd rund 14 %, rund 18 % der Ziehungen unter
  3 %. *Skript Beispiel 8.4.5 zitiert die Folienzahl als Bericht und
  ergänzt die exakte Streuung; das Widget führt sie vor.*
- **Z. 578 (Theorem „Zufälliges Einbetten von Unterräumen")**: Die
  Voraussetzung E[‖s_i‖⁴] ≤ K/m² passt nicht zum späteren Beispiel K = 3.
  Für s_i ~ N(0, I_n/m) ist E[‖s_i‖⁴] = (n² + 2n)/m², das zugehörige K
  wächst also wie n² (bei n = 10 000 rund 10⁸). Konsistent ist die
  Bedingung E[(s_iᵀv)⁴] ≤ K/m² für alle Einheitsvektoren v: Gauss exakt
  3/m², Rademacher (3 − 2Σ_j v_j⁴)/m² ≤ 3/m², Subsampling
  n(Σ_j v_j⁴)/m² (alle per Monte Carlo bestätigt). *Skript Satz 8.4.6
  formuliert mit dieser Bedingung, Bemerkung 8.4.7 benennt die
  Inkonsistenz, Beispiel 8.4.11 rechnet alle drei K aus.*
- **Z. 582 (dasselbe Theorem)**: Der Quantor „für alle x ∈ Rⁿ" steht
  INNERHALB der Wahrscheinlichkeit, der Beweis liefert die Aussage aber nur
  für jedes FESTE x. So formuliert ist sie sogar falsch: S hat höchstens
  Rang m < n, also gibt es x ≠ 0 mit Sx = 0. *Skript Satz 8.4.6 ist für
  festes x formuliert, Bemerkung 8.4.10 erklärt, warum gleichmäßige
  Aussagen über Unterräume Netzargument und Vereinigungsschranke brauchen.*
- **Z. 606–609 (Beweis, Schritt 3)**: Der Cauchy-Schwarz-Schritt
  E[(s_1ᵀx)⁴] ≤ E[‖s_1‖⁴] ist korrekt, aber grob; im Gauss-Fall
  verschenkt er den Faktor (n² + 2n)/3. *Skript schätzt var[‖Sx‖²] direkt
  über E[(s_1ᵀx)⁴] ab (Beweis zu Satz 8.4.6, Bemerkung 8.4.7).*
- **Z. 615 (Beweis, Schritt 4)**: Der Schluss von Erwartungswert und
  Varianz auf die Wahrscheinlichkeit ist die TSCHEBYSCHEFF-Ungleichung
  (Markov, angewandt auf die quadrierte Abweichung); die Folie nennt sie
  „Markov". *Skript benennt sie korrekt.*
- **Z. 631 („Anwendungen")**: „Wenn S m zufällige Zeilen aus x zieht" —
  x ist ein Vektor, gemeint sind m Komponenten (die Zeilen zieht S aus der
  Einheitsmatrix). *Skript spricht von Koordinaten.*
- **Z. 642 („Beispiel: Dimensionsreduktion")**: Rechenfehler um den Faktor
  10: m = K/(δε²) = 3/(0,05 · 0,01) = 6000, nicht 600. Damit stimmen auch
  die Folgezeilen nicht mehr: Die Kompression ist 10 000/6000 ≈ 1,7 statt
  „~17×" (Z. 650), und m = 600 garantiert bei δ = 0,05 nur
  ε = √(3/(0,05 · 600)) = √0,1 ≈ 0,32 bzw. bei ε = 0,1 nur δ = 0,5
  (Z. 646). *Skript Beispiel 8.4.14 rechnet mit 6000, Bemerkung 8.4.15
  benennt den Fehler und ordnet ein, warum die Praxis trotzdem mit kleinem
  m arbeitet (Tschebyscheff ist grob; schärfere Ungleichungen liefern
  m ~ ε⁻²log(1/δ)). Nachtrag Review 8.4: Für Gauss-Skizzen lässt sich das
  nötige m sogar exakt angeben, weil ‖Sx‖²/‖x‖² dann χ²_m/m-verteilt ist —
  für ε = 0,1 und δ = 0,05 genügen m = 768 Zeilen (Normalapproximation
  2·(1,96/ε)² = 768,3), Tschebyscheff fordert mit 6000 das Achtfache. Das
  steht jetzt in Bemerkung 8.4.15 und erklärt die „einige hundert" der
  Praxis.*
- **Z. 651 (dieselbe Folie)**: „Rechenzeit für Distanzberechnungen
  O(n²) → O(m²), Speed-up ~280×" ist irreführend. Eine einzelne
  euklidische Distanz kostet O(n), der Gewinn ist also der Faktor n/m;
  (n/m)² gilt nur für Verfahren, deren Kosten quadratisch in der Dimension
  sind. *Skript Bemerkung 8.4.15 formuliert den Faktor n/m.*
- **Z. 662 („Vergleich Sketching-Matrizen", Qualitätsspalte)**: Für
  Subsampling steht dort „Gut (bei strukturierter A)". Das Kriterium läuft
  andersherum: Subsampling ist gut, wenn die Information über viele
  Koordinaten VERTEILT ist (K = n·Σ_j v_j⁴ = 1 für v_j = ±1/√n), und
  schlecht, wenn sie in wenigen Koordinaten sitzt (K = n für v = e₁).
  Struktur im Sinne weniger dominanter Koordinaten ist gerade der schlechte
  Fall. Die Trade-off-Zeile Z. 669 („nur gut für spezielle Matrizen") ist
  dagegen unverfänglich. *Skript-Tabelle in §8.4 schreibt „gut bei
  gestreuten Daten", Beispiel 8.4.11 rechnet beide Extremfälle vor und
  benennt die Folienformulierung.*
- **Z. 663 (dieselbe Tabelle, SRHT-Speicher)**: Die Speicherspalte nennt
  O(m). Zur SRHT gehören neben den m gezogenen Zeilenindizes aber n
  Vorzeichen (die Diagonalmatrix vor der Hadamard-Transformation), also
  O(n), sofern man sie nicht aus einem Seed neu erzeugt. Nach demselben
  Maßstab käme auch Gauss mit O(1) aus. Die Folie erklärt zwar zwei Zeilen
  später, dass S nicht explizit gespeichert wird (Z. 672), aber das trifft
  nur die Hadamard-Matrix selbst. *Skript nennt die Tabellenangabe im
  SRHT-Punkt unter der Tabelle „optimistisch" und sagt, was wirklich zu
  halten ist.*

## 09-tensoren

- **Z. 91 („Intuition: Linear vs. Multilinear")**: Die Kette
  f(2x, 2y) = 4xy = 4f(x,y) ≠ 2f(x,y) stimmt nur für xy ≠ 0; auf den Achsen
  (x = 0 oder y = 0) sind beide Seiten null und damit gleich. *Skript
  Beispiel 9.1.3 nennt die Bedingung xy ≠ 0, das Widget zu §9.1 druckt den
  entarteten Fall als eigenen Zustand aus.*
- **Z. 113/115 (Beispiel Skalarprodukt)**: Auf derselben Folie stehen v₁, v₂
  erst für die beiden Argumente der Abbildung ((v₁, v₂) ↦ ⟨v₁, v₂⟩) und in der
  Bilinearitätsrechnung darunter für zwei Vektoren, die BEIDE im ersten Argument
  auftreten (⟨c v₁ + c' v₂, v₃⟩); die Argumentnummer kollidiert also mit dem
  Vektornamen. *Skript Beispiel 9.1.6 rechnet ⟨c v + c' v', w⟩ und trennt damit
  die erste (blau) von der zweiten (grün) Argumentposition.*
- **Z. 126 (Übung)**: Der Wert einer multilinearen Abbildung liegt in W, die
  Folie schreibt aber den Skalar 0 statt des Nullvektors. *Skript-Selbsttest
  in §9.1 setzt durchgehend den Nullvektor.*
- **Z. 149–151 („Tensoren")**: Die Gleichungskette für k = 1 wiederholt
  denselben Summenausdruck zweimal (`\sum_i \sum_j a_{i,j} x_i e_j` steht
  doppelt hintereinander); zudem laufen die Summen bis n_1, während der Text
  darüber n schreibt. *Skript §9.2 schreibt die Kette einmal sauber und
  benutzt durchgehend n.*
- **Z. 148/152 („Tensoren")**: Die Koeffizientenfamilie
  A = (a_{i,j}: 1 ≤ i ≤ n, 1 ≤ j ≤ m) wird unbesehen als Matrix in A x
  gelesen. Mit i als Zeilen- und j als Spaltenindex wäre A eine n×m-Matrix
  und A x für x ∈ ℝⁿ gar nicht definiert; gemeint ist A ∈ ℝ^{m×n} mit
  (A)_{j,i} = a_{i,j}. *Skript Bemerkung 9.2.1 stellt die Indexreihenfolge
  explizit richtig.*
- **Z. 184 (Def. Tensor)**: „geordnete Menge von reellen Zahlen" — eine Menge
  kennt weder Reihenfolge noch Vielfachheiten ({1,1,2} = {2,1}), der Begriff
  passt also nicht. *Skript Definition 9.2.3 formuliert als indizierte
  Familie (Abbildung Indextupel → Zahl), Bemerkung 9.2.4 benennt den
  Unterschied.*
- **Z. 241 (Batch von Bildern)**: `4\,8 \cdot 10^6` ist ein Tippfehler für
  4,8·10⁶ (nachgerechnet: 32·224·224·3 = 4 816 896). *Skript Beispiel 9.2.8
  setzt 4{,}8·10⁶ und druckt die exakte Zahl.*
- **Z. 202 gegen Z. 238–239**: Die Reihenfolge der Bildachsen ist zwischen
  zwei Folien inkonsistent — beim Bild „erste Dimension horizontal, zweite
  vertikal", beim Batch dagegen „2. Höhe, 3. Breite". *Skript Beispiel 9.2.7
  sagt, dass die Reihenfolge Verabredung ist und zwischen Bibliotheken
  differiert.*
- **Z. 154 („Tensoren")**: „Allgemeiner beschreibt jede solche Ansammlung von
  Koeffizienten mit k Indizes eine entsprechende multilineare Funktion" — nach
  dem Theorem der Vorfolie (Z. 135) hat die Familie a_{i_1,…,i_k,j} aber
  k + 1 Indizes; auf k Indizes schrumpft sie erst bei m = 1. Der Satz
  darüber (k = 1) hat gerade zwei. *Skript §9.2 schreibt „k + 1 Indizes, bei
  m = 1 also mit k" (so auch schon der Ausblick am Ende von §9.1).*
- **Z. 205–206 („Tensoren: Anwendungen")**: „Rechnungen auf Tensoren können
  durch spezielle Algorithmen besonders schnell durchgeführt werden (Google
  TPUs, NVIDIA Tensor Cores, …)" — TPUs und Tensor Cores sind keine
  Algorithmen, sondern Rechenwerke in Hardware. *Skript Bemerkung 9.2.11
  spricht von spezialisierten Rechenwerken für Blockoperationen.*
- **Z. 249 (Feature Maps)**: Die Faltungsschicht steht als
  `c: \R^{32×224×224×3} \mapsto \R^{32×56×56×64}`; `\mapsto` verbindet
  Elemente, zwischen den Räumen gehört `\to`. *Skript Beispiel 9.2.9 setzt
  `c \colon \R^{…} \to \R^{…}`.*
- **Z. 283/284/334 (dieselbe `\mapsto`-Verwechslung wie Z. 249)**: Äußeres
  Produkt, Skalarprodukt und Tensorprodukt werden als
  `\otimes: \R^m \times \R^n \mapsto \R^{m×n}` usw. eingeführt; `\mapsto`
  verbindet Elemente, zwischen den Räumen gehört `\to`. *Skript
  Bemerkung 9.3.2 und Definition 9.3.8 setzen `\colon … \to …`.*
- **Z. 305 („Bsp: Äußeres Produkt")**: Im Zeilenvektor steht
  wᵀ = (−2 3 −1), gemeint ist w = (−2, 3, −11)ᵀ von Z. 297; die
  Ergebnismatrix (−2 3 −11; −4 6 −22) gehört zur korrekten Fassung.
  *Skript Beispiel 9.3.3 setzt durchgehend −11, Zahlen per node bestätigt.*
- **Z. 328 („Anwendungsbeispiele", KI)**: Die Attention-Formel schreibt
  softmax(QK/√d_k)V mit dem Kronecker-/Tensorzeichen zwischen Q und K.
  Mit der folieneigenen ⊗-Definition wäre Q ⊗ K ein ganz anderes Objekt
  (Stufe-4-Tensor bzw. n_q·n_k × d_k² -Matrix); die Standardform ist
  softmax(QKᵀ/√d_k)V mit den Skalarprodukten ⟨q_i, k_j⟩ als Einträgen.
  *Skript Bemerkung 9.3.7 setzt die Standardform und erklärt den Bezug zum
  äußeren Produkt (QKᵀ = Σ_l q^(l) ⊗ k^(l), Rang ≤ d_k).*
- **Z. 336 (Def. Tensorprodukt)**: Die Indexschreibweise
  c_{i_1,…,i_{m_p}, j_1,…,j_{n_q}} verwechselt Indexanzahl und
  Dimensionsgröße; gemeint sind p bzw. q Indizes, also
  c_{i_1,…,i_p, j_1,…,j_q} = a_{i_1,…,i_p} b_{j_1,…,j_q}. *Skript
  Definition 9.3.8 indiziert sauber und nennt die Stufe p + q.*
- **Z. 371 („Bsp: Tensorprodukt")**: „Tensor der Form u ⊗ v ⊗ w hat Rang 1"
  lässt die Bedingung u, v, w ≠ 0 weg, die dieselben Folien für das äußere
  Produkt noch ausdrücklich verlangen (Z. 315); für u = 0 ist das Produkt der
  Nulltensor und hat Rang 0. *Skript Beispiel 9.3.11 argumentiert über
  Satz 9.3.4, der die Voraussetzung führt, und §9.5 behandelt den entarteten
  Fall eigens.*
- **Z. 443 („Bsp: Kroneckerprodukt")**: Die Warnung
  „A ⊗ B ≠ (Bᵀ ⊗ Aᵀ)ᵀ" ist redundant und irreführend: Wegen
  (X ⊗ Y)ᵀ = Xᵀ ⊗ Yᵀ ist (Bᵀ ⊗ Aᵀ)ᵀ = B ⊗ A, die Aussage wiederholt also
  nur die Nicht-Kommutativität und legt zugleich nahe, das Transponieren
  drehe wie beim Matrixprodukt die Reihenfolge um. *Skript
  Bemerkung 9.3.15 bringt stattdessen die Identität (A ⊗ B)ᵀ = Aᵀ ⊗ Bᵀ
  (am Beispiel per node verifiziert) und die Nicht-Kommutativität mit
  Gegenbeispiel (Eintrag (2,1): 0 gegen 6).*
- **Z. 527 (drei Faktoren)**: In der Kette
  (ℝᵐ ⊗ ℝⁿ) ⊗ ℝᵠ = ℝ^{m×n} × ℝᵠ = ℝ^{m×n×q} steht im mittleren Ausdruck das
  KARTESISCHE Produkt × statt ⊗. Das ist ein anderer Raum: dim(ℝ^{m×n} × ℝᵠ)
  = mn + q, während dim(ℝ^{m×n×q}) = mnq ist (m=2, n=3, q=4: 10 gegen 24).
  *Skript Beispiel 9.4.5 schreibt durchgehend ⊗ und nennt die Dimension mnq.*
- **Z. 574 (Tensorproduktbasis bivariater Polynome)**: Die Basis wird als
  B ⊗ B = {1⊗1, 1⊗x, y⊗1, x⊗y} angegeben, obwohl B = {1, x} ist: y kommt in
  der univariaten Basis gar nicht vor, also ist y⊗1 kein Element von B ⊗ B,
  und die Menge mischt zwei Benennungskonventionen für dieselbe Funktion.
  *Skript Beispiel 9.4.11 legt (f ⊗ g)(x,y) := f(x)g(y) fest, benennt die
  Variable des ersten Faktors x und die des zweiten y und erhält
  {1⊗1, x⊗1, 1⊗y, x⊗y}.*
- **Z. 576–577 (dieselbe Folie)**: Die Auswertungen widersprechen der
  Konvention (f ⊗ g)(x,y) = f(x)g(y): φ₂ = (1⊗x)(x,y) wird als 1·x = x
  gelesen (der zweite Faktor wird also an x statt an y ausgewertet; korrekt
  wäre y), und φ₄ steht als (y⊗x)(x,y), während die Menge darüber x⊗y nennt.
  *Skript Beispiel 9.4.11 wertet alle vier Basisfunktionen konsistent aus
  (1, x, y, xy) und rechnet in Beispiel 9.4.12 die Zerlegung
  f = 2 + 3x − y + 5xy nach, samt Rückrechnung der Koeffizienten aus den vier
  Eckwerten f(0,0)=2, f(1,0)=5, f(0,1)=1, f(1,1)=9 (per node verifiziert).*
- **Z. 583 (Dimension)**: `\dim(P_1 \otimes \P_1)` benutzt das Kursmakro \P,
  das als ℙ (Wahrscheinlichkeitsmaß) gesetzt ist; gedruckt steht also
  dim(P₁ ⊗ ℙ₁). Zudem heißt der Raum auf derselben Folie P_1 (Z. 570/583),
  drei Zeilen weiter aber 𝒫_d (Z. 586). *Skript §9.4 schreibt durchgehend
  𝒫_1 bzw. 𝒫_d.*
- **Z. 502–509 (Def. Tensorprodukt von Vektorräumen)**: Die Definition
  erklärt V ⊗ W als span{v ⊗ w} und setzt die bilineare Abbildung ⊗ dabei
  stillschweigend als gegeben voraus; ohne sie ist die Definition zirkulär,
  festgelegt wird der Raum erst durch die universelle Eigenschaft (bis auf
  Isomorphie). *Skript Definition 9.4.1 nennt ⊗ ausdrücklich als Gegebenes
  und Bemerkung 9.4.3 sagt, was die universelle Eigenschaft leistet.*
- **Z. 511 („Bilinearität bedeutet: …")**: Die Aufzählung nennt die
  Homogenität in beiden Argumenten und die Additivität nur im ERSTEN; die
  Additivität im zweiten Argument fehlt, obwohl „bedeutet" sie als
  vollständige Charakterisierung ausgibt. Die drei genannten Regeln reichen
  nicht: f(v, w) = ⟨v, g(w)⟩ mit einem homogenen, aber nicht additiven
  g: ℝ² → ℝ², g(w) = (w₁³/(w₁²+w₂²), w₂), erfüllt alle drei und ist trotzdem
  nicht bilinear (f(e₁,e₁) + f(e₁,e₂) = 1 gegen f(e₁, e₁+e₂) = 0,5; per node
  über 2·10⁵ Ziehungen bestätigt). *Skript Bemerkung 9.4.2 schreibt alle vier
  Regeln aus.*
- **Z. 524 (Beispiel mit drei Faktoren)**: „Seien V₁ = ℝᵐ, V₂ = ℝⁿ, V₃ = ℝᵠ
  und ⊗ das äußere Produkt" — das äußere Produkt ist auf denselben Folien
  (Z. 283) für zwei VEKTOREN erklärt, im zweiten Schritt der Kette steht
  aber das Produkt einer Matrix mit einem Vektor; gemeint ist das
  Tensorprodukt von Tensoren (Z. 334). *Skript Beispiel 9.4.5 nennt das
  Tensorprodukt aus §9.3 und rechnet die Einträge a_{ij} w_k aus.*
- **Z. 532 („Wichtige Unterscheidung")**: „v ⊗ w: Ein einzelnes
  Tensorprodukt (Rang-1-Matrix)" lässt wie schon Z. 371 die Bedingung
  v, w ≠ 0 weg; für v = 0 ist das Produkt die Nullmatrix vom Rang 0.
  *Skript §9.4 sagt „Matrizen vom Rang höchstens 1" und benennt den
  entarteten Fall.*
- **Z. 585–586 („Allgemein")**: „Für k-variate Polynome vom Grad ≤ d:
  dim(𝒫_d^{⊗k}) = (d+1)^k" — die Formel gilt für den Grad ≤ d in JEDER
  Variablen einzeln; beim Gesamtgrad ≤ d ist die Dimension C(d+k, k)
  (d = 3, k = 10: 4¹⁰ = 1 048 576 gegen C(13,10) = 286, per node bestätigt).
  Der Tensorproduktraum begrenzt gerade nicht den Gesamtgrad, wie schon die
  Basisfunktion xy mit Gesamtgrad 2 auf derselben Folie zeigt. *Skript
  Bemerkung 9.4.14 schreibt „Grad höchstens d in jeder Variablen" und stellt
  beide Zahlen nebeneinander; Bemerkung 9.4.13 und der Selbsttest greifen den
  Unterschied auf.*
- **Z. 618 („Kernkonzepte & Anwendungen")**: Die Hervorhebung
  `[*SVD*]{.marḱ}` trägt ein ḱ (U+1E31) statt eines k, die Klasse heißt also
  nicht `.mark`; die Auszeichnung fällt beim Setzen still aus, während alle
  übrigen Schlagworte derselben Folie hervorgehoben werden. *Rein
  typografisch, ohne Folgen für das Skript.*
- **Z. 621 („Kernkonzepte & Anwendungen")**: Die Identität
  vec(AXB) = (Bᵀ ⊗ A) vec(X) ist die einzige Stelle im ganzen Foliensatz, an
  der vec vorkommt — definiert wird der Operator nirgends. Die Formel gilt
  aber nur für die SPALTENweise Vektorisierung; bei zeilenweiser Stapelung
  lautet sie vec_r(AXB) = (A ⊗ Bᵀ) vec_r(X), die Folie wäre dann falsch (per
  node an A = (1 2; 0 1), X = (1 0; 2 3), B = (1 1; 0 2) geprüft: spaltenweise
  (5, 2, 17, 8)ᵀ, die vertauschte Fassung liefert (1, 17, 0, 6)ᵀ). *Skript
  Definition 9.5.2 legt die spaltenweise Konvention fest, Satz 9.5.3 beweist
  die Identität, Beispiel 9.5.4 rechnet beide Anordnungen gegeneinander.*
- **Z. 618/621 (Formatprobe)**: Die Folie sagt nicht, dass die Reihenfolge im
  Kroneckerprodukt nicht am Format zu erkennen ist — Bᵀ ⊗ A und A ⊗ Bᵀ haben
  IMMER dieselbe Zeilen- und Spaltenzahl (nm × qp bzw. mn × pq), und beide
  sind mit vec(X) ∈ ℝ^{pq} multiplizierbar (per node über alle Formate bis 6
  bestätigt). *Skript Beispiel 9.5.4 und der Selbsttest in §9.5 sagen das
  ausdrücklich.*

## 10-ableitungen-I

- **Z. 158 (Beispiel f(x) = x²)**: „|D_x f(h)| = |2xh| = 2|x|·|h| ≤ M|h| ∀x mit
  M = 2|x|" hat den falschen Quantor. M hängt von x ab, ein einziges M für
  alle x kann es also nicht geben (bei x = 100 wäre |D_x f(1)| = 200, die mit
  x = 1 gebildete Schranke M = 2 hält nicht). Richtig: Beschränktheit ist
  punktweise in x, bei FESTEM x gilt die Schranke für alle h.
  *Skript Beispiel 10.1.7 rechnet mit dem korrekten Quantor und sagt den
  Unterschied ausdrücklich; der Selbsttest in §10.1 greift ihn nochmals auf.*
- **Z. 129 (Definition (Fréchet-)differenzierbar)**: „f(x+h) = f(x) + D_x f(h)
  + o(‖h‖) für alle h → 0" vermischt zwei Dinge. Die Gleichung selbst gilt für
  jedes zulässige h, sie definiert bloß den Restterm; die Aussage steckt in
  ‖r(h)‖/‖h‖ → 0 für h → 0. *Skript Definition 10.1.5 schreibt „für h → 0",
  Bemerkung 10.1.6 löst die Formulierung auf.*
- **Z. 61 (Überblick)**: „Ableitungen in allgemeinen metrischen Räumen"
  verspricht zu viel und widerspricht Z. 114, wo (richtig) von normierten
  Räumen die Rede ist. Ohne Vektorraumstruktur gibt es weder x + h noch einen
  Begriff von linearer Abbildung, die Fréchet-Definition ist dort gar nicht
  formulierbar. *Skript §10.1 sagt durchgehend normierte Räume und begründet,
  warum eine Metrik allein nicht reicht.*
- **Z. 68 (Def. Differenzierbarkeit)**: „Sei f: S ⊆ ℝ → ℝ … an der Stelle
  x ∈ S" lässt offen, dass der beidseitige Grenzwert nur für innere Punkte von
  S sinnvoll ist. *Skript Definition 10.1.1 verlangt S offen.*
- **Z. 127 (Layout)**: „$D_{x} f$$\colon \D \to \E$" schließt und öffnet den
  Mathe-Modus mitten in der Zeile; der Doppelpunkt-Pfeil landet dadurch in
  einer eigenen Formel. *Rein typografisch, ohne Folgen für das Skript.*
- **Z. 230 und Z. 273 (Vektor zu Skalar, Beispiel und Übung)**: Beide Zeilen
  geben einem FUNKTIONSWERT einen Definitions- und Zielbereich:
  „$\nabla f(\bx)\colon \R^2 \to \R^{1 \times 2}$" bzw.
  „$f(\bx)\colon \R^n \to \R$". Werte sind aber Elemente von
  $\R^{1 \times 2}$ bzw. $\R$; die Abbildungen heißen $\nabla f$ und $f$.
  Nebenbei steht in Z. 230 innerhalb der `pmatrix` ein Komma VOR dem
  Spaltentrenner (`2x_1 + 3x_2, & 3x_1 + 4x_2`), das im Satz als überzähliges
  Zeichen erscheint. *Skript Definition 10.2.1 und Beispiel 10.2.6 schreiben
  durchgehend $f\colon \R^n \to \R$ und formulieren die Formataussage über
  $\nabla f$ statt über $\nabla f(\bx)$; die Zeile steht ohne Komma.*
- **Z. 217 und Z. 299 (Gradient als „Richtung")**: Z. 193 und die Anmerkung
  Z. 203 legen den Gradienten ausdrücklich als ZEILENvektor in
  $\R^{1 \times n}$ fest. Zwei Folien später heißt es dann, $\nabla f(\bx)$
  (der rote Pfeil der Abbildung) sei die „Richtung, in die $f$ am stärksten
  steigt", und bei Gradient Descent: „$-\nabla L(\btheta^{(t)})$: Negativer
  Gradient zeigt in Richtung des steilsten Abstiegs". Eine Zeile ist keine
  Richtung im $\R^n$; gemeint ist $\nabla f(\bx)^\top$, und genau dieses
  $^\top$ setzt die Folie im Update Z. 295 selbst. *Skript Satz 10.2.4
  formuliert die Aussage über $\bd^\ast = \nabla f(\bx)^\top /
  \left\|\nabla f(\bx)\right\|$, Bemerkung 10.2.11 begründet das $^\top$ im
  Update, und der Selbsttest in §10.2 fragt es ab.*
- **Z. 389 („Kettenregel mit Jacobimatrizen")**: Die Kette läuft bis
  $\bJ_{f_k}(\bz_{k-1})$ und multipliziert DANACH noch
  $\partial \bW_k(\btheta_k)/\partial\btheta_k$ — damit wird $\bW_k$ doppelt
  gezählt, denn $\bJ_{f_k}(\bz_{k-1})$ ist die Ableitung der Schicht $k$ nach
  ihrer EINGABE und enthält $\bW_k$ bereits (siehe die ReLU-Formel zwei Zeilen
  darunter). Richtig endet das Produkt bei $\bJ_{f_{k+1}}(\bz_k)$, letzter
  Faktor ist $\partial f_k(\bz_{k-1};\btheta_k)/\partial\btheta_k$.
  *Skript Bemerkung 10.3.10 setzt die korrigierte Kette als Gl. (10.3.3),
  Bemerkung 10.3.11 erklärt die Doppelzählung, der Selbsttest in §10.3 fragt
  sie ab.*
- **Z. 393–394 (ReLU-Beispiel)**: $\bJ_{f_k}(\bz_{k-1}) =
  \text{diag}(\mathbb{I}_{\bW_k\bz_{k-1} > 0})\cdot\bW_k$ steht ohne
  Einschränkung, gilt aber nur abseits der Knickstellen: Für
  $(\bW_k\bz_{k-1})_i = 0$ ist $\max(0,\cdot)$ nicht differenzierbar (links
  Steigung 0, rechts Steigung 1). Ausserdem wechselt die Zeile zwischen
  $f(\bz)$ und $\bJ_{f_k}$ den Index. *Skript Beispiel 10.3.12 nennt die
  Ausnahme, erklärt die Indikator-Diagonalmatrix und rechnet ein
  Zahlenbeispiel; der Selbsttest greift den Knick auf.*
- **Z. 332 (Identität $f(\bx) = \bx^\top\bA \impl \bJ_f = \bA^\top$)**: Der
  Output ist formal ein ZEILENvektor in $\R^{1\times m}$, die Definition der
  Jacobimatrix zwei Folien davor verlangt aber eine Spalte. Die Identität ist
  also über die Lesart $(\bx^\top\bA)^\top = \bA^\top\bx$ zu verstehen.
  *Skript Bemerkung 10.3.5 sagt das ausdrücklich.*
- **Z. 384 (Layout)**: $\sigma_k\bigl(\bW_k(\btheta_k) \bz_{k-1})$ öffnet mit
  `\bigl(` und schliesst mit einer normalen Klammer, die Klammergrössen passen
  deshalb nicht zusammen. *Rein typografisch, ohne Folgen für das Skript.*
- **Z. 339 und Z. 349 (Übung „Vektor zu Vektor")**: In Z. 339 klebt
  `\text{(komponentenweise)}` ohne Abstand an der Formel, gesetzt wird also
  „$\sum_j a_{ij}x_j$(komponentenweise)". In Z. 349 steht die lineare Näherung
  als $\bJ_f(\bx)(\bh)$, mit Funktionsklammer, obwohl $\bJ_f(\bx)$ eine Matrix
  ist und das Matrix-Vektor-Produkt $\bJ_f(\bx)\bh$ gemeint ist (zwei Zeilen
  weiter oben, Z. 318, steht es richtig ohne Klammer).
  *Typografisch bzw. notationell; Skript §10.3 schreibt im Beweis zu
  Satz 10.3.4 und in Korollar 10.3.6 beides sauber.*
- **Z. 480 („Beispiel: Ableitung der Determinante")**: In der Schlusszeile
  fehlt links das $\tr$: dort steht $\det(\bF)\cdot[\bF^{-1}\bF']$ statt
  $\det(\bF)\cdot\tr[\bF^{-1}\bF']$. Ohne die Spur wäre die rechte Seite
  das Produkt einer Zahl mit einer Matrix, die linke Seite ist aber eine Zahl;
  das Ergebnis $4x$ stimmt nur mit der Spur (per node bestätigt: $\bF^{-1}\bF'
  = \diag(1/x, 1/x)$, Spur $2/x$, mal $2x^2$ ergibt $4x$).
  *Skript Beispiel 10.4.5 rechnet mit $\tr$ und sagt ausdrücklich, warum es
  dort stehen muss.*
- **Z. 444–462 („Skalar zu Matrix: Wichtige Identitäten" samt Spur-Beweis)**:
  Der Foliensatz deklariert $\bF\colon \R \to \R^{m\times n}$, doch Spur,
  Determinante und Inverse sind nur für quadratische Matrizen erklärt; der
  Beweis summiert entsprechend $\sum_{i=1}^n f_{ii}$ über eine Diagonale, die
  es bei $m \neq n$ gar nicht gibt. *Skript Satz 10.4.4 setzt
  $\bF\colon \R \to \R^{n\times n}$ voraus und benennt die Einschränkung; nur
  Definition 10.4.1 bleibt beim allgemeinen Format $m \times n$.*
- **Z. 543 (Verlustfunktion der Matrix Completion)**: Zwischen $\bP_\Omega$
  und der Klammer steht ein gewöhnlicher Malpunkt, gemeint ist das
  ELEMENTWEISE (Hadamard-)Produkt. Ein Matrixprodukt passt dort schon von den
  Formaten her nicht ($\bP_\Omega$ und $\bY - \bU\bV^\top$ sind beide
  $m \times n$), und nur elementweise blendet die Maske die unbeobachteten
  Positionen aus. Dieselbe Stelle in den beiden Gradienten (Z. 547–548).
  *Skript Gl. (10.4.13) schreibt $\odot$ und definiert das Zeichen im
  Anschluss; Satz 10.4.12 nutzt es in beiden Gradienten.*
- **Z. 427–430 und Z. 438 (Übung „Skalar zu Matrix")**: Die Übungsmatrix
  enthält $\ln(x)$ und die Musterlösung $1/x$, die Folie nennt aber keinen
  Definitionsbereich; ohne $x > 0$ ist die Funktion an der Hälfte der reellen
  Achse gar nicht erklärt. Ausserdem schreibt die auskommentierte Lösung
  $\partial f(x)/\partial x$ statt $\partial \bF(x)/\partial x$ — abgeleitet
  wird eine Matrix, kein Skalar. *Skript Beispiel 10.4.3 setzt $x > 0$ und
  begründet die Einschränkung; die Lösung $\bigl(\begin{smallmatrix} 2x &
  2e^x & 0 \\ 0 & 1 & 1/x\end{smallmatrix}\bigr)$ ist nachgerechnet.*

## 11-ableitungen-II

- **Z. 97–99 („Wichtige Eigenschaften: Linearität")**: Der Satz behauptet
  nur die Identität $D_\bx(c_1f + c_2g) = c_1D_\bx f + c_2 D_\bx g$, sagt
  aber nicht, dass $c_1 f + c_2 g$ in $\bx$ überhaupt differenzierbar ist;
  ohne diese Aussage steht auf der linken Seite ein Objekt, dessen Existenz
  gerade erst zu zeigen ist. *Skript Satz 11.1.5 nimmt die
  Differenzierbarkeit der Linearkombination in die Behauptung auf.*
- **Z. 104–111 (auskommentierter Linearitätsbeweis)**: Die Unterklammer
  markiert $\left(c_1D_\bx f + c_2D_\bx g\right)(\bh)$ als
  $D_\bx(c_1f+c_2g)(\bh)$, bevor das begründet ist; der Schritt braucht die
  Eindeutigkeit der Fréchet-Ableitung, die der Foliensatz nirgends
  formuliert. *Skript führt den Beweis in vier Schritten und schliesst mit
  dem Eindeutigkeitsargument ($\bh = t\bu$, Quotient von $t$ unabhängig).*
- **Z. 68 („Wichtige Eigenschaften: Stetigkeit")**: Die Kette
  $\left\|D_\bx f(\bh)\right\| \le M\left\|\bh\right\| = O(\left\|\bh\right\|)$
  mischt Ungleichung und Gleichheit in einer Zeile, und der Foliensatz
  benutzt das grosse $O$ für kleine Argumente, ohne es je zu definieren.
  *Skript Bemerkung 11.1.1 definiert $O(\left\|\bh\right\|)$ für
  $\left\|\bh\right\| \to 0$ und trennt im Beweis zu Satz 11.1.2 die beiden
  Abschätzungen.*
- **Z. 131–136 („Bsp: Linearität der Ableitung")**: Der Buchstabe $h$ ist
  im ganzen Foliensatz der Zuwachs in $f(\bx+\bh)$, hier plötzlich ein
  Funktionsname. *Skript Beispiel 11.1.7 behält die Bezeichnung der Folie
  bei und sagt die Doppelbelegung ausdrücklich dazu.*
- **Z. 376 (Def. Hesse-Matrix)**: „einer differenzierbaren Funktion"
  reicht nicht — für die Einträge braucht es zweite partielle Ableitungen,
  für alles Weitere (Schwarz, $D^2$-Formel, Definitheitskriterium) sogar
  deren Stetigkeit. *Skript Definition 11.3.3 verlangt zweimal partiell
  differenzierbar und sagt im Anschluss, dass ab da $f \in \mathcal{C}^2$
  gilt.*
- **Z. 377 gegen Z. 384 (Indexkonvention)**: In $\bH_{i,j} = \partial^2
  f/\partial x_i \partial x_j$ läuft die Indexreihenfolge der
  Ableitungsreihenfolge entgegen, in $(D^3_\bx f)_{i,j,k} = \partial^3
  f/\partial x_k \partial x_j \partial x_i$ dagegen mit ihr. Unter
  $\mathcal{C}^2$ bzw. $\mathcal{C}^3$ folgenlos, aber uneinheitlich.
  *Skript Bemerkung 11.3.8 benennt die Abweichung.*
- **Z. 382/394 (Reihenfolge)**: Die Formel $D^2_\bx f(\bh_1,\bh_2) =
  \bh_1^\top \bH_f(\bx)\bh_2$ steht eine Folie VOR dem Satz von Schwarz,
  braucht dessen Symmetrie aber schon: Ohne sie liefert die Herleitung
  über den Gradienten $\bh_2^\top \bH_f(\bx)\bh_1$, also die Transponierte.
  *Skript zieht den Satz von Schwarz (Satz 11.3.4) vor und beweist ihn,
  bevor Satz 11.3.6 die Formel herleitet.*
- **Z. 421 (Konvexitätskriterium)**: „$f \in \mathcal{C}^2$ ist konvex auf
  $S \subseteq \R^n \iff \bH_f \succeq 0$ auf $S$" braucht ein KONVEXES und
  OFFENES $S$. Ohne Konvexität ist die linke Seite nicht definiert
  (Gegenbeispiel $S = (-2,-1)\cup(1,2)$, $f \equiv -5$ links, $f \equiv 0$
  rechts: $f'' \equiv 0$, aber keine konvexe Fortsetzung); ohne Offenheit
  scheitert „$\Longrightarrow$" (Gegenbeispiel: $S$ = die $x_1$-Achse im
  $\R^2$, $f = x_1^2 - x_2^2$ ist auf $S$ konvex, $\bH_f = \diag(2,-2)$ ist
  indefinit). *Skript Satz 11.3.11 setzt beides voraus,
  Bemerkung 11.3.12 führt die Gegenbeispiele aus.*
- **Z. 432 („Praxisrelevanz", ML-Punkt)**: Der Satz bricht nach „bzw." ab.
  *Skript Bemerkung 11.3.13 formuliert den Punkt aus (Kondition
  $\kappa = \lambda_{\max}/\lambda_{\min}$ der Hesse-Matrix, Konvergenzrate
  $(\kappa-1)/(\kappa+1)$ des Gradientenabstiegs).*
- **Z. 461 (Cramér-Rao)**: „Für ML-Schätzer $\wh\btheta$ gilt asymptotisch
  $\var(\wh\btheta) \to \bI(\btheta)^{-1}$" vermischt drei Dinge. Die
  Varianz eines konsistenten Schätzers geht gegen $\bnull$, die Formel
  trägt nur mit der Information der GANZEN Stichprobe
  ($\var(\wh\btheta) \approx \bI_n(\btheta)^{-1} = \bI_1(\btheta)^{-1}/n$);
  die saubere asymptotische Aussage ist
  $\sqrt n(\wh\btheta_n - \btheta) \to N(\bnull, \bI_1(\btheta)^{-1})$; und
  die Cramér-Rao-Schranke selbst ist eine Aussage bei festem $n$ über
  ERWARTUNGSTREUE Schätzer ($\var \succeq \bI_n^{-1}$), die der ML-Schätzer
  im Allgemeinen erst asymptotisch erreicht. *Skript Bemerkung 11.3.16
  trennt die drei Fassungen.*

- **Z. 320 („Anwendung: Logistische Regression")**: Die Fallunterscheidung
  vertauscht die Klassen. Aus $\ell(\bbeta) = -[y\log\sigma(\bbeta^\top\bx) +
  (1-y)\log(1-\sigma(\bbeta^\top\bx))]$ folgt für $y = 1$ der Term
  $-\log P(Y{=}1\mid\bx)$ und für $y = 0$ der Term $-\log P(Y{=}0\mid\bx)$;
  die Folie schreibt es genau andersherum. *Skript §11.2 setzt die
  Fallunterscheidung richtig und sagt die Vertauschung dazu.*
- **Z. 334 (Logistische Regression, Fall $y=0$)**: „analog für $y=0$:
  $\nabla\ell(\bbeta) = -\wh y\,\bx^\top$" hat das falsche Vorzeichen.
  Richtig ist $+\wh y\,\bx^\top = (\wh y - 0)\bx^\top$; erst damit stimmt die
  $(\wh y - y)$-Deutung der Vorzeile. Numerisch bestätigt (zentrale
  Differenzen, $\bx = (1, -2, 0{,}5)^\top$, $\bbeta = (0{,}3, -0{,}7,
  1{,}1)^\top$: Gradient $(0{,}905, -1{,}809, 0{,}452)$, die Folienfassung
  hat durchweg das umgekehrte Vorzeichen). *Skript Beispiel 11.2.10 rechnet
  beide Fälle und benennt den Fehler.*
- **Z. 155 (Theorem Produktregel)**: Vorausgesetzt wird nur eine „bilineare
  Abbildung". Der Beweis braucht die Beschränktheit
  $\left\|\langle u,v\rangle\right\| \le K\left\|u\right\|\left\|v\right\|$,
  sonst lässt sich der Kreuzterm $\langle D_\bx f(\bh), D_\bx g(\bh)\rangle$
  nicht als $O(\left\|\bh\right\|^2)$ abschätzen; der auskommentierte Block
  Z. 187 sagt es selbst. In endlicher Dimension ist die Bedingung automatisch
  erfüllt. *Skript Definition 11.2.1 fordert sie ausdrücklich,
  Bemerkung 11.2.2 erklärt, warum sie dort nichts kostet.*
- **Z. 208–209 (Produktregel, vierte Bauform)**: Die Folie deklariert
  $\E = \R^{m\times n}$ für BEIDE Faktoren und bildet dann $\tr[\bF(x)\bG(x)]$.
  Das Produkt ist nur für $\bG(x) \in \R^{n \times m}$ quadratisch, die Spur
  also nur dann erklärt (für $m = n$ passt die Folienfassung). *Skript
  Beispiel 11.2.4 setzt $\bF(x) \in \R^{m\times n}$, $\bG(x) \in
  \R^{n\times m}$ und rechnet den Fall an einem Zahlenbeispiel nach.*
- **Z. 246–249 (auskommentierte Ridge-Anwendung)**: Die Gleichungskette
  setzt in derselben Zeile den Zeilenvektor $-2(\by-\bX\bbeta)^\top\bX$ mit
  dem Spaltenvektor $-2\bX^\top(\by-\bX\bbeta)$ gleich, transponiert also
  stillschweigend. Ausserdem wird nur der KQ-Term abgeleitet, obwohl die
  Zielfunktion den Strafterm $\lambda\left\|\bbeta\right\|_2^2$ enthält, und
  das eingeführte $g$ ist gar nicht definiert (es ist wieder $f$). *Skript
  Beispiel 11.2.7 bleibt in der Zeilenkonvention, ergänzt den
  $\lambda$-Gradienten $2\lambda\bbeta^\top$ und den Gesamtgradienten
  $2(\bX^\top\bX\bbeta - \bX^\top\by + \lambda\bbeta)^\top$ (numerisch
  bestätigt).*
- **Z. 291–294 (Kettenregel-Beweis)**: In der zweiten Zeile wird der Restterm
  von $g$ sofort als $o(\left\|\bh\right\|)$ geschrieben. Klein ist er zunächst
  aber nur gemessen am weitergereichten Zuwachs
  $\bk = D_\bx f(\bh) + o(\left\|\bh\right\|)$; der Wechsel des Bezugspunkts
  braucht die Schranke $\left\|\bk\right\| \le (M_f+1)\left\|\bh\right\|$ für
  kleine $\bh$, die die Folie nirgends aufstellt. *Skript Satz 11.2.8 stellt sie
  als ersten Beweisschritt auf und benutzt sie im vierten.*
- **Z. 338–350 (Übung $\nabla\left\|\bx\right\|_2$)**: Die Lösung
  $\bx^\top/\left\|\bx\right\|$ ist richtig, gilt aber nur für
  $\bx \neq \bnull$; im Nullpunkt existiert die Fréchet-Ableitung nicht
  (einsetzen von $\bh = t\bd$ liefert für $t>0$ und $t<0$ widersprüchliche
  Werte). *Skript Beispiel 11.2.12 nennt den Vorbehalt und begründet ihn.*

- **Z. 496 (Theorem Taylorentwicklung I, Quantor)**: „Dann gilt für $h \in \R$"
  passt nicht zur Aussage: $f(x+h) = \dots + o(\left|h\right|^k)$ ist eine
  Aussage über das Verhalten für $h \to 0$, nicht eine für jedes einzelne $h$
  (dieselbe Verwechslung wie 10-ableitungen-I Z. 129). Ausserdem bleibt offen,
  dass $x+h$ im Definitionsbereich liegen muss. *Skript Satz 11.4.2 setzt
  $S \subseteq \R$ offen und schreibt „für $x \in S$ und $h \to 0$".*
- **Z. 618–619 (Beweisskizze Taylorentwicklung II, 1D-Schritt)**: „1D-Taylor
  für $\psi$ um $w = 0$ (nutzt $f \in \mathcal{C}^k$)" beruft sich auf das
  eigene Theorem von Z. 496, das aber $(k+1)$-mal stetige Differenzierbarkeit
  verlangt; mit $f \in \mathcal{C}^k$ ist $\psi$ nur $k$-mal stetig
  differenzierbar, der zitierte Satz also gar nicht anwendbar. Derselbe Schritt
  verschweigt, dass die Entwicklung von $\psi$ zunächst nur für eine FESTE
  Richtung $\bu$ gilt, während $o(\left\|\bh\right\|^k)$ Gleichmässigkeit über
  alle Richtungen verlangt. Beides erledigt dieselbe Rechnung: Lagrange-Restglied
  der Ordnung $k-1$ plus Stetigkeit von $D^k_\bx f$, mit der $\bu$-freien
  Schranke $\sup_{\left\|\bz-\bx\right\| \le s}\left\|D^k_\bz f - D^k_\bx
  f\right\|$. *Skript benennt beides im dritten Beweisschritt und führt die
  Rechnung in Bemerkung 11.4.8 aus.*
- **Z. 636 (Vektor-zu-Skalar, dritte Ordnung)**: Die Summe indiziert
  $\partial^3 f/\partial x_i \partial x_j \partial x_k$, die D³-Definition
  Z. 484 dagegen $\partial^3 f/\partial x_k \partial x_j \partial x_i$ — dritter
  Fall der Indexkonvention von Z. 377 gegen Z. 384, unter $\mathcal{C}^3$
  folgenlos. Zusätzlich kollidiert der Summationsindex $k$ mit dem Grad $k$ des
  Taylorpolynoms aus Z. 498/502. *Skript Korollar 11.4.9 summiert über
  $i, j, l$.*
- **Z. 589–597 (Beweisskizze Taylorentwicklung I)**: Die Hilfsfunktion muss
  $F(t) = \sum_{j=0}^k f^{(j)}(t)/j!\,(x-t)^j$ lauten; die Folie schreibt
  durchgehend $f^{(j)}(x)$. Mit konstanten Koeffizienten teleskopiert
  $F'$ nicht, und die behauptete Zeile
  $F'(t) = f^{(k+1)}(x)/k!\,(x-t)^k$ ist falsch (numerisch mit $f = \exp$,
  $x = 1$, $k = 2$, $t = 0{,}7$: die Folienfassung liefert $-3{,}534$, die
  korrekte Fassung $0{,}0906 = e^{0{,}7}/2!\cdot(1-0{,}7)^2$). Ebenso steht
  nach dem Cauchy-Mittelwertsatz $f^{(k+1)}(\xi)$ an der Zwischenstelle,
  nicht $f^{(k+1)}(x)$; sonst wäre der Rest exakt bekannt und der
  Mittelwertsatz überflüssig. Drittens trägt die Begründung des
  $o(\left|h\right|^k)$ nicht: „$f^{(k+1)}$ stetig in $x$, also beschränkt in
  $x$" liefert keine Schranke für die Werte an den Zwischenstellen, gebraucht
  wird Beschränktheit auf einer kompakten Umgebung. Nebenbei gilt
  $G'(t) = -(k+1)(x-t)^k \neq 0$ nur für $t \neq x$. *Skript Satz 11.4.2
  führt den Beweis in fünf Schritten korrekt und benennt alle drei Stellen in
  den Begründungen.*
- **Z. 502 und Z. 590 (Notation des Taylorpolynoms)**: Auf der Theoremfolie
  heißt es $T_k(x) := \sum_{j=0}^k 1/j!\,f^{(j)}(x)h^j$, das Argument ist
  aber der Zuwachs $h$ und nicht $x$; zwei Folien später vertauschen sich die
  Rollen der Buchstaben stillschweigend ($x$ ist dort die Auswertungsstelle,
  $a$ der Entwicklungspunkt, $h = x - a$). *Skript Definition 11.4.1 schreibt
  $T_k(h)$ bei festem Entwicklungspunkt, Bemerkung 11.4.4 stellt die
  $x_0$-Fassung daneben, und der Beweis benennt den Rollenwechsel.*
- **Z. 504 („Je höher der Grad $k$, desto besser/globaler die
  Approximation")**: Als Faustregel brauchbar, als Aussage falsch. Für
  $f(x) = 1/(1+x^2)$ um $0$ fallen die Fehler bei $x = 0{,}5$ von
  $5{,}0\cdot10^{-2}$ ($k=2$) auf $3{,}1\cdot10^{-6}$ ($k=16$), bei
  $x = 1{,}5$ wachsen sie dagegen von $1{,}6$ auf $455$ (Konvergenzradius 1).
  *Skript Bemerkung 11.4.5 nennt die Faustregel samt Gegenbeispiel.*
- **Z. 679–680 (Newton-Raphson, Idee)**: „$f(\bx) \approx T_2(\bx^{(k)})$" setzt
  den Entwicklungspunkt als Argument ein, obwohl die rechte Seite von $\bx$
  abhängt; gemeint ist $T_2(\bx)$, sonst stünde rechts eine Konstante und der
  folgende Schritt „minimiere $T_2(\bx)$ bzgl. $\bx$" wäre gegenstandslos.
  *Skript schreibt $T_2(\bx)$.*
- **Z. 362 (Def. $k$-mal differenzierbar, typografisch)**: Die Zeile schreibt
  `$D_{\bx}^j f$$\colon \D^j \to \E$` und schliesst den Mathe-Modus mitten
  im Ausdruck — dieselbe Sorte wie der registrierte Befund
  10-ableitungen-I Z. 127. *Skript Definition 11.3.1 setzt eine
  durchgehende Mathe-Spanne.*
- **Z. 429 gegen Z. 448 (Praxisrelevanz, Statistik-Punkt)**: Die
  Log-Likelihood wird als „wichtiger Spezialfall für $f\colon \R^n \to \R$"
  eingeführt, obwohl der Parameter neunzehn Zeilen später in $\R^p$ lebt und
  $n$ im ganzen Foliensatz die Dimension des Arguments bzw. den
  Stichprobenumfang bezeichnet. *Skript Bemerkung 11.3.13 und
  Definition 11.3.14 schreiben durchgehend $\R^p$.*
- **Z. 469/473–474 (Vektor-zu-Vektor, Score-Funktion und Notation)**: Als
  Beispiel für $f\colon \R^n \to \R^m$ steht dort die Score-Funktion
  $\nabla\ell(\btheta)$ — in der Zeilenkonvention des Kurses ist der
  Gradient aber eine Zeile, erst $\nabla\ell(\btheta)^\top$ bildet $\R^p$
  nach $\R^p$ ab (gleiche Sorte wie 10-ableitungen-I Z. 217/299). In der
  Formel darunter sind ausserdem die Zuwächse unfett gesetzt ($h_1, \dots,
  h_k$ statt $\bh_i$ wie in der Definition Z. 362), und der Ableitungsgrad
  heisst dort $k$ statt $j$. *Skript §11.3 („Vektor zu Vektor") schreibt
  $\nabla\ell(\btheta)^\top$, benennt die fehlende Transposition und führt
  den Grad durchgehend als $j$.*

## 12-konvexitaet

- **Z. 76 („Warum Konvexität wichtig ist")**: „Konvexe Optimierungsprobleme
  haben *eindeutige globale* Minima" verspricht zu viel. Konvexität liefert
  nur: jedes lokale Minimum ist global. Eindeutigkeit braucht STRIKTE
  Konvexität (die Folie sagt das selbst erst auf Z. 717; Gegenbeispiel: jede
  konstante Funktion), Existenz noch einmal eine eigene Voraussetzung
  (f(x) = e^x ist konvex und nimmt ihr Infimum 0 auf R nie an).
  *Skript §12.1 trennt die drei Aussagen in der Einführung und im Selbsttest
  und verweist für die Belege auf §12.5.*
- **Z. 78 („Warum Konvexität wichtig ist")**: „Maximum Likelihood (*meist*
  konvexe Log-Likelihoods)" dreht die Richtung um. Konvex ist die NEGATIVE
  Log-Likelihood, die wir minimieren; die Log-Likelihood selbst ist in diesen
  Modellen konkav und wird maximiert. *Skript §12.1 sagt das in der Einführung
  ausdrücklich dazu.*
- **Z. 96 gegen Z. 121/125 (Reichweite des Begriffs)**: Die Definition der
  Konvexkombination setzt ein ENDLICHES $\Xcal = \{\bx_1, \dots, \bx_k\}$
  voraus; die Hüllen-Definition wendet den Begriff drei Folien später auf ein
  beliebiges, ausdrücklich auch unendliches $\Xcal$ an („aller
  Konvexkombinationen von endlich vielen Vektoren aus $\Xcal$"). Gemeint ist,
  dass jede EINZELNE Kombination nur eine endliche Teilmenge benutzt, während
  $N$ von Punkt zu Punkt variieren darf. *Skript Bemerkung 12.1.6 hält beides
  fest (samt der Carathéodory-Schranke $N \le n+1$ im $\R^n$).*
- **Z. 105–107 (Beispiel Erwartungswert)**: Der Erwartungswert einer
  „diskreten Zufallsvariable" ist nur bei ENDLICHEM Träger eine
  Konvexkombination im Sinne der Definition von Z. 96 (dort ist
  $\Xcal = \{\bx_1, \dots, \bx_k\}$ endlich); bei abzählbar unendlichem
  Träger braucht es einen Grenzübergang. *Skript Beispiel 12.1.3 setzt
  endlichen Träger voraus.*
- **Z. 133 (Extrempunkte)**: „Extrempunkte sind Punkte, die nur mit einem
  $w_i = 1$ erreicht werden" lässt offen, aus welcher Menge kombiniert wird,
  und weicht stillschweigend von der üblichen Definition ab (x ist Extrempunkt
  einer konvexen Menge C, wenn x im Inneren keiner ganz in C verlaufenden
  Strecke liegt). *Skript Definition 12.1.7 formuliert die Folienfassung
  präzise, Bemerkung 12.1.8 stellt die Literaturfassung daneben und hält fest,
  dass die Eigenschaft an der ganzen Menge hängt.*
- **Z. 111 und Z. 125 (Tippfehler)**: „Die Menge alle Konvexkombinationen"
  (statt „aller") und „von endlichen vielen Vektoren" (statt „endlich vielen").
- **Z. 218 und Z. 233 (Simplex-Folie, Typo und Wortwahl)**: In
  „$x_1 + x_2 + x_3 = 1 = \|x\|_1$" steht das $x$ unfett, obwohl derselbe Satz
  zweimal $\bx$ schreibt. Und „$\Delta^2$ ist die Linie von $(1,0)$ nach
  $(0,1)$" meint die STRECKE zwischen den beiden Punkten; eine Linie/Gerade
  wäre unbeschränkt und läge nicht im Simplex. *Skript Beispiel 12.2.6 setzt
  $\left\|\bx\right\|_1 = 1$ und sagt Strecke.*
- **Z. 239 (Def. Positiv Semi-Definit)**: Die Definition verlangt keine
  Symmetrie. Die quadratische Form $\bx^\top\bA\bx$ sieht von $\bA$ aber nur
  den symmetrischen Anteil $(\bA+\bA^\top)/2$, „$\bA \succeq 0$" ist ohne
  Symmetrie also gar keine Eigenschaft von $\bA$ allein; ausserdem brauchen die
  Aussagen, für die Semidefinitheit gebraucht wird (Spektralsatz, Cholesky),
  die Symmetrie. *Skript Definition 12.2.7 führt PSD für symmetrische Matrizen
  und begründet die Präzisierung im Anschluss.*
- **Z. 255 (Anwendung zur PSD-Folie)**: „Kovarianzmatrizen sind SPD" ist
  allgemein falsch. Sie sind stets symmetrisch und positiv SEMIdefinit
  ($\ba^\top\bSigma\ba = \var(\ba^\top\bX) \ge 0$); positiv definit sind sie nur
  ohne lineare Degeneration. Gegenbeispiel $\bX = (Z,Z)^\top$ mit $\var(Z)=1$:
  $\bSigma = ((1,1),(1,1))$ hat die Eigenwerte 2 und 0, und für $\ba = (1,-1)^\top$
  ist $\ba^\top\bSigma\ba = 0$. *Skript Bemerkung 12.2.9 korrigiert das und
  nennt die Folge für Cholesky (§5.4).*
- **Z. 264 (Konvexitätserhaltung, Voraussetzungen)**: Der Satzkopf deklariert
  EINE Familie „$\Xcal, \Xcal_1, \Xcal_2, \dots$" und sagt über die Räume
  nichts, obwohl die vier Punkte Verschiedenes brauchen: Schnitt (Z. 266) und
  Summe (Z. 271) sind nur definiert, wenn alle beteiligten Mengen im SELBEN
  Vektorraum liegen, das kartesische Produkt (Z. 267) gerade nicht, und
  Punkt 3 (Z. 268–269) setzt zusätzlich $\Xcal \subseteq \R^n$ voraus. *Skript
  Satz 12.2.10 benennt die Räume in den Punkten 1, 2 und 4 einzeln.*
- **Z. 266 gegen Z. 321 (Konvexitätserhaltung, Schnitt)**: Der Satz deckt mit
  $\bigcap_{i=1}^\infty$ nur abzählbar viele Mengen ab (der Beweis Z. 278–279
  quantifiziert entsprechend über $i \in \N$), während die Hüllen-Proposition
  drei Folien später über ALLE konvexen Obermengen schneidet, im Allgemeinen
  also über überabzählbar viele. Der Beweis braucht die Abzählung nirgends.
  *Skript Satz 12.2.10(1) formuliert den Schnitt über eine beliebige
  Indexmenge, Bemerkung 12.2.11 hält die Lücke fest.*
- **Z. 267 (Konvexitätserhaltung, Terminologie)**: „Äußeres Produkt" meint hier
  das KARTESISCHE Produkt der Mengen. Der Begriff ist im Kurs anders belegt
  (09-tensoren: $\bv \otimes \bw = \bv\bw^\top$), die Kollision ist irreführend.
  *Skript Satz 12.2.10(2) schreibt kartesisches Produkt, Bemerkung 12.2.11
  nennt die Folien-Wortwahl.*
- **Z. 268–269 (Konvexitätserhaltung, Bildmenge)**: Der Punkt heisst „Lineare
  Abbildungen", die Formel darunter ist $f(\bx) = \bA\bx + \bb$ und damit AFFIN
  (linear nur für $\bb = \bnull$). Der Beweis benutzt tatsächlich nur die
  Affinität. *Skript Satz 12.2.10(3) sagt affin, Bemerkung 12.2.11 erklärt,
  warum gerade $\lambda + (1-\lambda) = 1$ den Verschiebungsanteil rettet.*
- **Z. 315 und Z. 328 (Konvexe Hülle: Eigenschaften)**: „Eine konvexe Hülle ist
  per Definition eine konvexe Menge" ist eine Behauptung, kein Beweis (die
  Definition von $\conv$ zählt Konvexkombinationen auf, sie sagt nichts über
  Konvexität der entstehenden Menge). Und der Beweisschritt „jede
  Konvexkombination von Punkten aus $\Xcal$ ist auch in jedem $\Ycal$" benutzt
  stillschweigend, dass konvexe Mengen ALLE endlichen Konvexkombinationen
  enthalten; die Definition gibt nur den Fall zweier Punkte her. *Skript
  Satz 12.2.3 holt die Induktion nach, Beweisschritt 1 zu Satz 12.2.13 rechnet
  die Konvexität von $\conv(\Xcal)$ nach.*
- **Z. 340 und Z. 343 (Konvexe Mengen: Anwendung)**: $\bx^\star = \max_{\bx \in
  \Xcal} \sum_i v_i x_i$ setzt die Maximalstelle gleich dem Maximalwert; gemeint
  ist das Argmax, das obendrein mehrdeutig sein kann. Und „$\bx^\star$ ist ein
  Extrempunkt von $\conv(\Xcal)$" gilt so nicht: Bei Gleichständen ist nicht
  jeder Maximierer extrem (Gegenbeispiel $\Xcal = \{(0,0),(1,0),(2,0)\}$,
  $\bv = (0,1)^\top$: alle drei Punkte maximieren, der mittlere ist der
  Mittelpunkt der beiden anderen), und für unendliches $\Xcal$ muss das Maximum
  gar nicht angenommen werden. *Skript Gleichung in §12.2 schreibt
  $\bx^\star \in \argmax$, Satz 12.2.14 setzt $\Xcal$ endlich voraus und
  behauptet nur die EXISTENZ eines extremen Maximierers, Bemerkung 12.2.16
  führt beide Grenzen vor.*
- **Z. 352 und Z. 363 (Projektionstheorem, Existenz)**: Der Satzkopf verlangt nur
  einen „Skalarproduktraum", die Beweisskizze begründet die Existenz mit
  „$\Xcal$ abgeschlossen $\implies$ konvergente Minimierungsfolge besitzt
  Grenzwert $\in \Xcal$". Dass eine Minimierungsfolge überhaupt konvergiert,
  folgt aber nicht aus der Abgeschlossenheit, sondern ist die eigentliche
  Arbeit: In endlicher Dimension liefert sie Bolzano-Weierstraß (die Folge ist
  beschränkt), im Allgemeinen braucht es die VOLLSTÄNDIGKEIT des Raums, und
  dort zeigt man mit der Parallelogrammgleichung, dass die Folge eine
  Cauchy-Folge ist. *Skript Satz 12.3.1 setzt endliche Dimension voraus und
  führt die Existenz über Kompaktheit plus Weierstraß; Bemerkung 12.3.2 nennt
  den Hilbertraum-Fall und je ein Gegenbeispiel zu „abgeschlossen" (offener
  Ball) und „konvex" (Einheitssphäre).*
- **Z. 365 (Beweisskizze, Tippfehler)**: „mit dem selben minimalem Abstand"
  (richtig: „mit demselben minimalen Abstand"). *Im Skript korrigiert.*
- **Z. 373 (Projektionstheorem, Eindeutigkeit)**: „Orthogonalität liefert
  $\langle \bx - \bz, \bz - \hat\bx_1\rangle = 0$" ist unbegründet: An dieser
  Stelle des Beweises ist über den Winkel zwischen den beiden Vektoren nichts
  bekannt, und für konvexe Mengen gibt es eine solche Orthogonalität im
  Allgemeinen gar nicht (bei einer Kreisscheibe etwa ist
  $\langle \bx - \hat\bx, \by - \hat\bx\rangle$ für Randpunkte
  $\by \neq \hat\bx$ echt negativ). Zur Verfügung steht nur die
  Variationsungleichung $\langle \bx - \hat\bx, \by - \hat\bx\rangle \le 0$;
  Gleichheit gibt es erst, wenn $\Xcal$ ein Untervektorraum ist (dann sind es
  die Normalgleichungen aus §7.1). *Skript beweist die Eindeutigkeit stattdessen
  über $g(\lambda) = \|\bx - (\hat\bx_1 + \lambda(\hat\bx_2 - \hat\bx_1))\|^2$:
  aus $g(0) = g(1) = d^2$ folgt $g(1/2) = d^2 - \tfrac14\|\hat\bx_2 -
  \hat\bx_1\|^2 < d^2$, Widerspruch zur Minimalität; Satz 12.3.3 stellt die
  Variationsungleichung als Kriterium daneben.*
- **Z. 397 (Def.-Block Epigraph, Markup)**: Der `:::{.block}` der
  Epigraph-Definition wird mit `::::` geschlossen statt mit `:::`, der Block
  bleibt also offen.
- **Z. 398 (Epigraph, Erläuterung)**: „Der Epigraph enthält alle Punkte in
  $\Xcal \times \R$ die über der Funktion liegen" lässt das Komma vor dem
  Relativsatz weg und ist eine Zeile zu eng: Die Definition darüber verlangt
  $t \ge f(\bx)$, der Graph selbst gehört also dazu, obwohl er nicht „über"
  der Funktion liegt. *Skript §12.3 sagt „die Fläche über der Kurve, den
  Graphen eingeschlossen".*
- **Z. 400–401 (Epigraph-Definition, Präzisierung)**: „(Dafür muss $\Xcal$
  konvex sein.)" liest sich wie eine Zusatzforderung, ist aber eine Folgerung:
  Ist $\epi(f)$ konvex, so ist $\Xcal$ als Menge der ersten Komponenten
  automatisch konvex. Gebraucht wird die Voraussetzung erst für die
  UNGLEICHUNGS-Fassung (Z. 419), damit $f(\lambda\bx + (1-\lambda)\by)$
  überhaupt definiert ist. *Skript Bemerkung 12.3.7 dreht die Aussage um.*
- **Z. 425–427 (Intuition zur Ungleichung)**: „das Liniensegment, das die
  Funktionswerte $f(\bx)$ und $f(\by)$ verbindet, liegt nie unter dem
  Funktionsgraphen" verbindet zwei ZAHLEN. Gemeint ist die Strecke zwischen den
  Graphenpunkten $(\bx, f(\bx))$ und $(\by, f(\by))$ im $\R^{n+1}$. *Skript
  Bemerkung 12.3.9 nennt die beiden Punkte.*
- **Z. 465 (Beispiele, Typo)**: $\bb \in \R^b$ statt $\R^n$. *Skript
  Beispiel 12.3.11 korrigiert und merkt es an.*
- **Z. 468 (Beispiele, quadratische Funktionen)**: Gleich drei Stellen.
  $\bQ \in \R^{m \times n}$ müsste $n \times n$ heißen (sonst ist
  $\bx^\top\bQ\bx$ nicht definiert), „$b \in \R$" meint den Absolutterm $a$,
  und die Bedingung „falls $\bQ$ positiv semidefinit ist" ist zu eng: Die
  quadratische Form sieht nur den symmetrischen Anteil, entscheidend ist also
  $(\bQ + \bQ^\top)/2 \succeq 0$. Gegenbeispiel $\bQ = ((1,5),(-5,1))$:
  $\bx^\top\bQ\bx = x_1^2 + x_2^2$ ist streng konvex, $\bQ$ selbst ist nicht
  einmal symmetrisch. *Skript Satz 12.3.12 formuliert das Kriterium über
  $\bQ_{\mathrm{sym}}$, Bemerkung 12.3.13 führt alle drei Punkte vor.*
- **Z. 470–473 (Beispiele, Normeigenschaften)**: Die Liste führt
  $f(\bx) \ge 0$ als eigene Forderung, obwohl sie aus den beiden anderen folgt
  ($0 = f(\bnull) = f(\bx + (-\bx)) \le f(\bx) + f(-\bx) = 2f(\bx)$); ausserdem
  steht die Null im Definitheitsteil unfett ($\bx = 0$), obwohl $\bx$ fett ist.
  *Skript Satz 12.3.15 hält fest, dass der Konvexitätsbeweis nur Homogenität
  und Dreiecksungleichung braucht, und verweist für die Axiome auf
  Definition 3.2.1.*
- **Z. 479 gegen Z. 705 (Terminologie)**: Die Ridge-Zeile nennt die Eigenschaft
  „streng konvex", die Definition 226 Zeilen später „strikt konvex". Beide
  Namen sind gebräuchlich, im selben Foliensatz sollte aber einer gewählt oder
  die Gleichsetzung gesagt werden. *Skript Bemerkung 12.3.9 führt „streng
  konvex" ein und nennt beide Folienwörter; §12.5 stellt im Anschluss an
  Definition 12.5.4 dieselbe Gleichsetzung noch einmal her.*
- **Z. 528 (Eigenschaften, Teil (iii))**: Über der Folge $f_1, f_2, \dots$ ist
  $\max_i f_i$ nicht garantiert: Ein Maximum über unendlich viele Werte muss
  weder angenommen noch endlich sein (für $f_i(x) = i\,x^2$ ist das Supremum
  in jedem $x \neq 0$ gleich $+\infty$). Tragfähig ist die Aussage für das
  punktweise SUPREMUM, sofern es überall endlich ist. *Skript Satz 12.4.1(3)
  formuliert sie so, Beispiel 12.4.3 beweist beide Fassungen (endliches
  Maximum über Argmax, Supremum ohne Fallunterscheidung).*
- **Z. 539 (Beweis (ii), Tippfehler)**: In der zweiten Zeile steht
  „$c(\lambda f_1(\bx) + (1-\lambda) f(\by))$"; gemeint ist $f_1(\by)$, denn
  $f$ ist erst das Ergebnis $c f_1$. *Skript Beweisschritt 1 zu Satz 12.4.1
  rechnet mit $f_1$ und merkt den Tippfehler an.*
- **Z. 549 (Beweis (iv), Begründung am Rand)**: Der Schritt
  $\limsup_k [\lambda f_k(\bx) + (1-\lambda) f_k(\by)] \le \lambda \limsup_k f_k(\bx)
  + (1-\lambda)\limsup_k f_k(\by)$ ist mit „Def. limsup" annotiert. Aus der
  Definition folgt er nicht; gebraucht werden die SUBADDITIVITÄT des Limes
  superior und seine positive Homogenität (letztere liefert
  $\lambda, 1-\lambda \ge 0$). *Skript ::why zu Beweisschritt 2 von Satz 12.4.1
  nennt die Subadditivität und die nichtnegativen Gewichte ausdrücklich.*
- **Z. 569 (Anwendung nichtnegative Varianz, Präzisierung)**: Die Folie wendet
  die Jensen-Ungleichung auf eine beliebige Zufallsvariable $X$ an, während der
  Satz darüber (Z. 558) nur endlich viele Punkte mit Gewichten abdeckt, also
  endlichen Träger. Für allgemeine integrierbare $X$ braucht es die
  Subgradienten-Fassung (dieselbe Lücke wie bei Z. 105–107). *Skript
  Bemerkung 12.4.7 trennt beide Fälle, Bemerkung 12.4.17 liefert den
  allgemeinen Beweis über die Stützgerade nach.*
- **Z. 584 (Theorem, Tippfehler)**: „$\bH_f(\bx)$ is positiv semidefinit"
  (englisches „is"). *Im Skript korrigiert.*
- **Z. 587–588 (Lesarten des Theorems, „immer über/unter")**: „das Segment
  zwischen zwei Punkten [liegt] immer über dem Funktionsgraphen" bzw. „die
  Tangente an $f$ [liegt] immer unter dem Funktionsgraphen" sind zu strikt: Für
  affines $f$ liegt die Sehne exakt AUF dem Graphen und die Tangente fällt mit
  ihm zusammen, und affine Funktionen erklärt Z. 464–466 selbst für konvex (und
  konkav). Richtig ist „nie unter" bzw. „nie über". Nebenbei ist „Segment" der
  englische Begriff; gemeint ist die Strecke bzw. Sehne (dieselbe Wortwahl-Sorte
  wie „Linie" in Z. 233). *Skript formuliert beide Lesarten von Satz 12.4.9 mit
  „verläuft nie unter" bzw. „verläuft nie über".*
- **Z. 611 (Beweis (ii) ⟹ (i), Tippfehler)**: „Summieren wir die beiden
  Gleichung, erhalten wir" — zum einen fehlt das Plural-n, zum anderen sind die
  beiden Zeilen darüber UNgleichungen, keine Gleichungen. *Skript
  Beweisschritt 3 zu Satz 12.4.9 addiert „beide Zeilen".*
- **Z. 622 (Beweis (ii) ⟹ (iii))**: Vor $\bh^\top\bH_f(\bx)\bh$ fehlt der
  Faktor $\tfrac12$. Die Taylorentwicklung liefert
  $\tfrac{t^2}{2}\bh^\top\bH_f(\bx)\bh$, die Folienkette ist um den Faktor 2
  daneben, und zwar in beiden Zeilen (auch im umgestellten Quotienten fehlt die
  2 im Zähler). Numerische Probe mit $f(x) = x^2$, $x = h = 1$, $t = 0{,}1$:
  Links steht $0{,}01$, die Folienformel gäbe $0{,}02$. Der Schluss
  $\bh^\top\bH_f\bh \ge 0$ bleibt richtig, weil ein positiver Faktor das
  Vorzeichen nicht ändert. *Skript Beweisschritt 4 zu Satz 12.4.9 führt die
  Kette korrekt und nennt den Fehler im ::why.*
- **Z. 640 (Spektrum der Hesse-Matrix)**: Die lokale Näherung
  $f(\bx + \bh) \approx f(\bx) + \tfrac12\bh^\top\bH_f(\bx)\bh$ lässt den
  Gradiententerm weg; das stimmt nur an kritischen Punkten. Für
  $\nabla f(\bx) \neq \bnull^\top$ ist der weggelassene Term für kleine $\bh$
  sogar der größere (linear statt quadratisch klein). *Skript
  Bemerkung 12.4.13 ergänzt $\nabla f(\bx)\bh$ in beiden Ausdrücken.*
- **Z. 647 (Herleitung der Subgradienten-Proposition)**: „Aus Teil
  $(i) \implies (ii)$ des Beweises (ohne $t \to 0$) folgt auch die folgende
  Aussage." Das trägt nur in $n = 1$. Der genannte Beweisschritt liefert je
  Richtung $\bh$ eine Ungleichung für den Differenzenquotienten, also für jede
  Richtung eine eigene Steigung; die Proposition behauptet dagegen EINEN Vektor
  $\bv$, der alle Richtungen gleichzeitig bedient. In $n = 1$ genügen dafür die
  beiden einseitigen Ableitungen (jedes
  $v \in [f'_-(x), f'_+(x)]$ tut es), in höherer Dimension braucht es eine
  Trennungsaussage am Epigraphen, die auf der Folie nirgends vorkommt. *Skript
  Satz 12.4.15 erledigt $n = 1$ vollständig über die Monotonie der
  Differenzenquotienten und deklariert den Fall $n > 1$ ausdrücklich als
  Trennungsargument, das dort nicht bewiesen wird.*
- **Z. 650 gegen Z. 659 und Z. 652 (Benennung, Tippfehler)**: Der Block ist als
  „Proposition" überschrieben, der Text darunter spricht zweimal vom „Lemma";
  und in „Dann gibt es für jedes $\bx \in \Xcal$, einen Vektor $\bv$" steht ein
  Komma zwischen Quantor und Objekt.
- **Z. 652 (Proposition Subgradienten, Präzisierung)**: „für jedes
  $\bx \in \Xcal$" ist zu stark. In Randpunkten kann der Subgradient fehlen:
  Auf $\Xcal = [0,\infty)$ ist $f(x) = -\sqrt{x}$ konvex, hat aber in $x = 0$
  keinen Subgradienten (für $v = -c < 0$ ist
  $\min_y (f(y) - vy) = -1/(4c) < 0$ bei $y = 1/(4c^2)$, für $v \ge 0$
  scheitert schon $y = 1$). Gebraucht wird $\bx \in \interior(\Xcal)$.
  Nebenbei nennt Z. 658 die Stützfunktion „linear", affin ist sie (dieselbe
  Wortwahl wie in Z. 268–269). *Skript Satz 12.4.15 setzt einen inneren Punkt
  voraus, Bemerkung 12.4.17 führt das Gegenbeispiel vor.*
- **Z. 674 gegen Z. 692–695 (Proposition „kritischer Punkt", Voraussetzung)**:
  Die Proposition verlangt nur eine „differenzierbare, konvexe" Funktion, der
  Beweisschritt $(ii) \implies (i)$ benutzt aber die Tangentenungleichung
  $f(\by) \ge f(\bx^\star) + \nabla f(\bx^\star)(\by - \bx^\star)$, die der
  Foliensatz nur als Teil (ii) des Theorems Z. 580–583 bereitstellt, und das
  setzt dort $f \in \Ccal^2$ voraus. Die Aussage stimmt, der Beleg im eigenen Foliensatz
  fehlt: Für die Äquivalenz Sehnen-/Tangentenbedingung genügt einfache
  Differenzierbarkeit, der Beweisschritt rechnet nur mit Differenzenquotienten.
  *Skript Satz 12.5.1 führt beide Richtungen aus, das ::why zu Schritt 2 nennt
  die Lücke und stützt sich auf Bemerkung 12.4.10.*
- **Z. 681 (Folgerungen, Tippfehler und zu schwache Aussage)**: „Jeder
  kritische Punkt ist ein lokales Mimimum" — zum einen der Tippfehler
  („Mimimum"), zum anderen bleibt die Zeile unter der Proposition eine Folie
  darüber: Aus $\nabla f(\bx^\star) = \bnull^\top$ folgt dort bereits ein
  GLOBALES Minimum, nicht nur ein lokales. *Skript Bemerkung 12.5.2 sagt
  „globales Minimum" und hält die vorsichtigere Folienfassung daneben.*
- **Z. 684 und Z. 717 (Merksätze zur Optimierung, Existenz)**: „Wenn wir ein
  konvexes Optimierungsproblem lösen, finden wir garantiert ein *globales*
  Optimum!" bzw. „… garantiert das *eindeutige globale* Optimum!" lesen sich
  als Existenzaussagen, sind aber nur bedingte Aussagen: Konvexität sichert
  weder, dass ein Minimum angenommen wird ($f(x) = e^x$ auf $\R$), noch
  Eindeutigkeit ohne Striktheit. Zutreffend ist: FALLS eine Lösung gefunden
  wird, ist sie global (bzw. bei strikter Konvexität die einzige). Dieselbe
  Vermischung wie in Z. 76, hier aber in der Optimierungs-Sektion.
  *Skript Bemerkung 12.5.2 („Nicht folgt: Eindeutigkeit … Ebenso wenig folgt:
  Existenz") und Bemerkung 12.5.6 sortieren die drei Versprechen.*
- **Z. 705 gegen Z. 714 (Def. Strikte Konvexität, Definitionsbereich)**: Die
  Definition schreibt nur $f\colon \Xcal \to \R$, ohne $\Xcal$ als konvex zu
  fordern; ohne das muss $\lambda\bx + (1-\lambda)\by$ gar nicht in $\Xcal$
  liegen und die linke Seite der Ungleichung ist undefiniert (dieselbe Lücke
  wie bei der Ungleichungsfassung Z. 419). Nebenbei wechselt die Proposition
  eine Folie später ohne Kommentar von $\Xcal$ auf $\R^n$. *Skript
  Definition 12.5.4 setzt $\Xcal$ konvex voraus und verweist auf
  Bemerkung 12.3.7.*
- **Z. 731 gegen Z. 738 (ML-Landkarte, SVM als „strikt konvexes Problem")**:
  Die SVM-Zielfunktion $\tfrac12\|\bw\|_2^2 + C\sum_i \max\{0, 1 -
  y_i(\bw^\top\bx_i + b)\}$ ist im Paar $(\bw, b)$ NICHT strikt konvex: Bei
  trennbaren Daten mit Sicherheitsabstand verschwinden alle Hinge-Terme in
  einer Umgebung, und die Zielfunktion hängt dort gar nicht von $b$ ab.
  Strikt konvex ist sie nur im Argument $\bw$; eindeutig ist deshalb der
  Trennvektor, nicht der Achsenabschnitt. *Skript Bemerkung 12.5.7 trennt
  beides und begründet die Eindeutigkeit von $\bw$ über den Mittelpunkt.*
- **Z. 736 (ML-Landkarte, KQ-Probleme)**: „für $\bX$ mit vollem Rang" ist zu
  ungenau. Bei $n > p$ ist der volle Rang $p$ gerade der SPALTENrang, und nur
  er macht $\bX^\top\bX$ positiv definit und das Problem strikt konvex; voller
  ZEILENrang (der Fall $p > n$) hilft gar nicht. *Skript Bemerkung 12.5.7
  schreibt Spaltenrang und nennt den Grund.*
- **Z. 751 (ML-Landkarte, LASSO)**: „Regularisierte, rang-defizitäre Modelle
  mit nicht-konkaver Penalty" beschreibt die Klasse falsch herum. Damit die
  Summe konvex bleibt, muss die Strafe KONVEX sein (Proposition zu den
  konvexitätserhaltenden Operationen, Z. 521–530); „nicht konkav" ist eine
  viel schwächere Bedingung und schließt etwa SCAD/MCP ein, die gerade nicht
  konvex sind. *Skript Bemerkung 12.5.7 sagt konvexe Strafe und merkt die
  Folienformulierung an.*
- **Z. 756 und Z. 763 (ML-Landkarte, Hyperparameter-Tuning)**: Die Kategorie
  ist mit „lokalen Minima und Sattelpunkten" überschrieben; beim Tuning ist
  die Zielfunktion (meist ein Kreuzvalidierungsfehler über diskreten
  Kandidaten wie einer Baumtiefe) oft nicht einmal stetig, geschweige denn
  differenzierbar. Von Sattelpunkten lässt sich dort nicht sprechen, und
  gesucht wird mit Gitter-, Zufalls- oder Bayesscher Suche statt mit
  Abstiegsverfahren. *Skript Bemerkung 12.5.7 hält das am Ende der Landkarte
  fest.*

## 13-optim

- **Z. 368–371 („Optimalitätsbedingungen: Zusammenfassung", hinreichende
  Bedingung 2. Ordnung)**: Der Block schreibt „$\nabla f(\bx^\star) = \bnull$
  und $\bH_f(\bx^\star) \succ 0$ $\iff$ $\bx^\star$ ist lokales Minimum". Der
  Doppelpfeil ist falsch, es gilt nur „$\implies$". Gegenbeispiel $f(x) = x^4$
  in $x = 0$: striktes globales Minimum, aber $f'(0) = f''(0) = 0$, die
  Hesse-Matrix $(0)$ ist nicht positiv definit. Aus einem lokalen Minimum
  folgt nur positive *Semi*definitheit. Zweite Ungenauigkeit derselben Zeile:
  rechts vom Gradienten steht $\bnull$ statt $\bnull^\top$, während die Folie
  sonst (Z. 231, Z. 365, Z. 373) korrekt transponiert.
  *Skript Satz 13.2.13 formuliert alle drei Bedingungen getrennt (notwendig
  1. und 2. Ordnung, hinreichend 2. Ordnung) und beweist die notwendige
  Bedingung zweiter Ordnung; Bemerkung 13.2.14 führt das Gegenbeispiel vor.*
- **Z. 250–252 (Eindeutigkeit / Projektionstheorem, Präzisierung)**: Die
  Eindeutigkeitszeile nennt die Konvexität der zulässigen Menge nur nebenbei,
  obwohl sie im Beweis genauso tragend ist wie die strikte Konvexität der
  Zielfunktion (Gegenbeispiel $\Xcal = \{-1, +1\}$ mit $f(y) = y^2$: beide
  Punkte optimal, der Mittelpunkt ist unzulässig). Der Zusatz „quadrierte
  Distanz ist streng konvex" braucht ausserdem die Skalarproduktstruktur: Die
  Dreiecksungleichung liefert nur die Konvexität der Norm, die strikte
  Konvexität der quadrierten Norm kommt aus der Parallelogrammgleichung und
  gilt in allgemeinen normierten Räumen nicht (Maximumsnorm im $\R^2$, Menge
  $\{(t; 1) : t \in [-1, 1]\}$: jeder Punkt hat vom Ursprung den Abstand 1).
  Dritte Ungenauigkeit derselben Zeile: „ist das Minimum *eindeutig*" verspricht
  Existenz *und* Eindeutigkeit; strikte Konvexität liefert nur die Eindeutigkeit
  ($f(x) = e^x$ ist auf $\R$ strikt konvex und hat kein Minimum). Gleiche Sorte
  wie 12-konvexitaet Z. 76.
  *Skript Sätze 13.2.6/13.2.7 nennen beide Bedingungen im Satzkopf, Satz 13.2.7
  sagt „höchstens einen Minimierer", und Bemerkung 13.2.8 formuliert den
  auskommentierten Exkurs Z. 254–311 aus.*
- **Z. 355 („Sattelpunkte: Analyse", Zählargument)**: „Lokales Minimum von
  $f\colon \R^n \to \R$ braucht $n$ positive Eigenwerte von $\bH_f$" macht eine
  hinreichende Bedingung zur notwendigen — dasselbe Missverständnis wie der
  Doppelpfeil in Z. 370. Gegenbeispiel wieder $f(x) = x^4$ in $0$: lokales
  (sogar globales) Minimum mit Eigenwert $0$. Richtig ist die Aussage nur für
  eine nicht ausgeartete Hesse-Matrix; notwendig ist bloß
  $\bH_f(\bx^\star) \succeq 0$. Nebenbei bleibt die Klammer
  „(Wahrscheinlichkeit $\xrightarrow{n\to\infty} 0$)" ohne
  Wahrscheinlichkeitsmodell. *Skript Bemerkung 13.2.12 setzt die
  Nichtausgeartetheit davor und nennt die Münzwurf-Zählung ausdrücklich eine
  Faustregel ($2^{-n}$ bzw. $2^{1-n}$, für $n = 100$ also
  $7{,}9\cdot10^{-31}$ und $1{,}6\cdot10^{-30}$).*
- **Z. 375–380 (Klassifikationstabelle)**: Die vierte Zeile „semidefinit ⟹
  unklar" überschneidet sich mit der ersten: Eine positiv definite Matrix ist
  auch positiv semidefinit, und für sie ist gerade nichts unklar. Gemeint ist
  „semidefinit, aber nicht definit". Ausserdem liefern die ersten beiden Zeilen
  jeweils ein *striktes* lokales Minimum bzw. Maximum, die Tabelle sagt nur
  „Lokales Minimum". *Skript Satz 13.2.13 und die Tabelle darunter schreiben
  „striktes lokales Minimum" bzw. „semidefinit, aber nicht definit" und
  ergänzen, dass ein einzelner Eigenwert $0$ dafür nicht genügt
  ($\diag(1,-1,0)$ ist indefinit).*
- **Z. 318 („Konvexe Verlustfunktionen", Notation)**: Die Zeile schreibt
  $L(\by, \hat{\by} = \bX\bbeta)$, also eine Zuweisung in der Argumentliste, und
  hängt in derselben Klammer $\bH_L = 2\bX^\top\bX$ an — diese Hesse-Matrix
  gehört aber zur Ableitung nach $\bbeta$, nicht nach den beiden genannten
  Argumenten. *Skript Beispiel 13.2.9 schreibt durchgehend $L(\bbeta)$.*
- **Z. 41 (Vorkenntnisse, Gradient)**: „$\nabla f(\bx)$ als Richtung des
  steilsten Anstiegs" ohne Transponiertes; in der Zeilenkonvention des Kurses
  ist erst $\nabla f(\bx)^\top$ eine Richtung im $\R^n$ (gleiche Sorte wie
  10-ableitungen-I Z. 217/299). *Skript §13.1 („Was wir mitbringen") sagt es
  dazu.*
- **Z. 46 (Vorkenntnisse, Analysis)**: „Hinreichende Bedingung für Minima:
  $f''(x^\star) > 0$" steht als eigener Punkt neben der notwendigen Bedingung.
  Für sich genommen ist positive Krümmung nicht hinreichend; gebraucht wird
  $f'(x^\star) = 0$ UND $f''(x^\star) > 0$. *Skript §13.1 formuliert die
  hinreichende Bedingung mit beiden Teilen.*
- **Z. 58/60 (Einführung, zwei Kleinigkeiten)**: Z. 58 schreibt
  „$\nabla f(\bx^\star) = \bnull$" ohne Transponiertes, während Z. 178 in
  derselben Foliensammlung korrekt $\bnull^\top$ setzt (dieselbe Sorte wie
  Z. 368–371). Und Z. 60 formuliert das beschränkte Problem als
  $\arg\max_{\bx \in S} f(\bx)$, obwohl der Punkt darüber beide Richtungen
  nennt und der ganze Rest des Foliensatzes minimiert; die Richtung wechselt
  hier ohne Grund. *Skript Definition 13.1.2 minimiert durchgehend,
  Bemerkung 13.1.3 begründet den Wechsel über
  $\argmax f = \argmin (-f)$ und setzt $\bnull^\top$.*
- **Z. 78/80 (Regularisierte Regression)**: Der Strafterm ist für beide Fälle
  als $\lambda\|\bbeta\|_p$ geschrieben. Die übliche Ridge-Regression
  bestraft die QUADRIERTE 2-Norm $\lambda\|\bbeta\|_2^2$; nur damit ergibt
  sich $\wh\bbeta = (\bX^\top\bX + \lambda\bI_p)^{-1}\bX^\top\by$
  (11-ableitungen-II, Ridge-Folie). Die unquadrierte Fassung ist ein anderes,
  ebenfalls konvexes Problem. Zusatz: Die Äquivalenz von Straf- und
  Nebenbedingungsform ist korrekt, aber die Übersetzung $\lambda
  \leftrightarrow c$ hängt von den Daten ab, es gibt keine Formel dafür.
  *Skript Beispiel 13.1.4 sagt beides.*
- **Z. 136–142 (`bisect()`)**: Zwei Fehler in acht Zeilen R. (a) `mid` entsteht
  erst im Schleifenrumpf; wird die Funktion mit einem Intervall aufgerufen, das
  die Toleranz schon erfüllt (`b - a <= eps`), läuft der Rumpf nie und
  `return(mid)` bricht mit „object 'mid' not found" ab. (b) Der Rückgabewert ist
  der LETZTE MITTELPUNKT, und der ist nach der Zuweisung stets ein Randpunkt des
  Endintervalls; statt der garantierten Genauigkeit $\epsilon/2$ bleibt so nur
  $\epsilon$, ein ganzer Halbierungsschritt verschenkt. Damit hält der Code auch
  die Zusage der Folie Z. 127 ($|x^\star - x^{(k)}| < \epsilon$) nur mit
  „$\le$" statt „$<$" ein. Nebenbei: $(a+b)/2$ kann gerundet aus $[a, b]$
  herausfallen und für große $a, b$ überlaufen ($a + (b-a)/2$ nicht), und das
  Produkt `f(a) * f(mid)` unter- bzw. überläuft, wo ein Vorzeichenvergleich
  genügt. *Skript Bemerkung 13.1.9 zeigt beide Fassungen nebeneinander und
  begründet die robuste.*
- **Z. 176 (Newton-Raphson, Konvergenzaussage)**: „Quadratisch nahe der Lösung
  (Fehler quadriert sich pro Schritt)" lässt die Konstante weg. Richtig ist
  $e_{k+1} \approx C e_k^2$ mit
  $C = |f''(x^\star)|/(2|f'(x^\star)|)$; ohne $C$ ist die Aussage nicht einmal
  qualitativ haltbar, denn bei $C > 1$ kann der Fehler wachsen. Am eigenen
  Beispiel der Folienreihe ($f(x) = x^2 - 2$, Start $2$, per node): $e_0 =
  0{,}5858$, $e_0^2 = 0{,}3431$, tatsächlich aber $e_1 = 0{,}0858 = 0{,}25\,
  e_0^2$ — Faktor 4 daneben. Zweitens fehlt die Voraussetzung einer EINFACHEN
  Nullstelle: bei $f'(x^\star) = 0$ konvergiert Newton nur noch linear.
  *Skript Bemerkung 13.1.13 nennt Konstante und Voraussetzung und rechnet
  $C = 1/(2\sqrt 2) = 0{,}354$ gegen die beobachtete Spalte
  $e_k/e_{k-1}^2$ (0,250 / 0,333 / 0,353 / 0,354).*
- **Z. 180 (Übergang zum Multivariaten)**: „Für multivariates $f$ verwenden wir
  Fixpunktiterationen" liest sich, als ende Newton-Raphson bei $n = 1$.
  Newton überträgt sich wörtlich ($\bJ_f(\bx^{(k)})\bd = -f(\bx^{(k)})$,
  $\bx^{(k+1)} = \bx^{(k)} + \bd$), und derselbe Foliensatz führt das in
  Z. 694–700 selbst vor ($g(\bx) := \nabla f(\bx)^\top$ mit $\bJ_g = \bH_f$).
  Der Grund für die Fixpunktiteration ist der PREIS des Newton-Schritts
  (eine ganze Jacobimatrix und eine Zerlegung pro Schritt), nicht seine
  Unmöglichkeit. *Skript §13.1 führt den multivariaten Newton-Schritt vor der
  Fixpunktiteration an und begründet den Wechsel mit dem Aufwand.*
- **Z. 185 (Fixpunktiteration, Voraussetzung)**: „$f\colon \R^n \to \R^n$
  monoton steigend" ist für $n > 1$ nicht definiert (im $\R^n$ gibt es keine
  Anordnung); gemeint ist ein monotoner Operator, $\langle f(\bx) - f(\by),
  \bx - \by\rangle \ge 0$, für differenzierbares $f$ also
  $\bJ_f + \bJ_f^\top$ positiv semidefinit. Auch im Fall $n = 1$ trägt
  Monotonie allein nicht: Bei $f'(x^\star) = 0$ ist $\rho = 1$ für JEDES
  $\gamma$. Was die Annahme leistet, ist die Existenz einer brauchbaren
  Schrittweite, nicht deren Angabe. *Skript Bemerkung 13.1.17 arbeitet das aus
  und beziffert die hinreichende Schranke $\gamma <
  \lambda_{\min}(\bJ_f+\bJ_f^\top)/\|\bJ_f\|_2^2$.*
- **Z. 190–196 (Konvergenzrate, Präzisierung)**: Die Herleitung führt eine
  Taylorapproximation mit „$\approx$" und lässt den Restterm kommentarlos
  fallen; die Folgerung $\|\bx^{(k)} - \bx^\star\| = O(\rho^k)$ gilt
  deshalb nur LOKAL (in einer Kugel um $\bx^\star$, deren Radius offenbleibt)
  und im nichtaffinen Fall nur mit einer Rate $\rho' \in (\rho, 1)$. Exakt mit
  $\rho$ und global gilt sie erst für affines $f$, wo der Restterm verschwindet.
  *Skript Satz 13.1.16 formuliert beide Fassungen und führt den Restterm im
  Beweis mit.*
- **Z. 545 (Lipschitz-stetiger Gradient, Präzisierung)**: „Äquivalent:
  $\|\bH_f(\bx)\| \le L$ mit $L = \sup_{\bx} \lambda_{\max}(\bH_f(\bx))$"
  unterschlägt den BETRAG. Gebraucht wird die Spektralnorm, also
  $L = \sup_{\bx} \max_i |\lambda_i(\bH_f(\bx))|$; nur bei konvexem $f$ ist
  $\bH_f$ positiv semidefinit und der größte Eigenwert zugleich der
  betragsgrößte. Gegenbeispiel $f(x) = -x^2$: $f'$ ist exakt $2$-Lipschitz,
  $\lambda_{\max}(\bH_f) = -2$ ist nicht einmal positiv (numerisch bestätigt,
  ebenso $\bH_f = \diag(0{,}5; -8)$ mit $L = 8$ gegen $\sup\lambda_{\max} =
  0{,}5$, also Faktor 16). Nebenbei braucht die Äquivalenz einen konvexen
  Definitionsbereich und zweimal stetige Differenzierbarkeit.
  *Skript Bemerkung 13.3.9 korrigiert das und führt beide Gegenbeispiele vor.*
- **Z. 472 (Gradientenabstieg, Kernidee)**: „Für konvexes $f$ ist
  $-\nabla f(\bx)$ immer eine Abstiegsrichtung hin zum globalen Minimum" ist
  doppelt zu großzügig. Abstiegsrichtung ist $-\nabla f(\bx)^\top$ für JEDES
  differenzierbare $f$, sobald $\nabla f(\bx) \neq \bnull^\top$ ist
  ($\nabla f(\bx)(-\nabla f(\bx)^\top) = -\|\nabla f(\bx)\|^2 < 0$);
  Konvexität wird dafür nicht gebraucht. Und „hin zum" Minimum zeigt die
  Richtung im Allgemeinen gerade nicht, wie das Zick-Zack auf schlecht
  konditionierten Quadriken auf derselben Foliensammlung vorführt. Was
  Konvexität beisteuert, ist, dass jeder stationäre Punkt global optimal ist.
  Zusätzlich fehlt das Transponierte ($-\nabla f(\bx)$ ist eine Zeile).
  *Skript Bemerkung 13.3.5 trennt die drei Aussagen.*
- **Z. 480 / Z. 618 (Iterationsvorschrift ohne Transponiertes)**: Auf der
  Bildfolie „Gradientenabstieg: $f: \R \to \R$" (Z. 480) und noch einmal in der
  Einleitungszeile der Abbruchkriterien (Z. 618) steht
  $\bx^{(k+1)} = \bx^{(k)} - \gamma \nabla f(\bx^{(k)})$ ohne Transponiertes,
  während Z. 464 korrekt $\nabla f(\bx^{(k)})^\top$ schreibt — dieselbe Sorte wie
  10-ableitungen-I Z. 217/299. Nebenbei trägt die Folie Z. 476 den Titel
  „$f: \R \to \R$", schreibt darunter aber fette $\bx^{(k)}$; im skalaren Fall
  wäre $x^{(k)}$ richtig und das Transponierte gegenstandslos. *Skript
  Algorithmus 13.3.4 setzt durchgehend das Transponierte und sagt den
  Unterschied dazu; Beispiel 13.3.6 rechnet skalar mit $x^{(k)}$.*
- **Z. 555–558 (Konvergenzrate bei konvexem $f$, fehlende Voraussetzung)**: Der
  Satz schreibt $f(\bx^\star)$, ohne zu fordern, dass das Minimum überhaupt
  ANGENOMMEN wird. Für $f(x) = \sqrt{1 + x^2} - x$ ist alles andere erfüllt
  ($f''(x) = (1+x^2)^{-3/2} \le 1$, also konvex mit $L = 1$), das Infimum $0$
  wird aber nirgends erreicht, und die rechte Seite der Schranke ist gar nicht
  definiert. *Skript Satz 13.3.10 nennt die Voraussetzung im Satzkopf,
  Bemerkung 13.3.11 führt das Gegenbeispiel vor.*
- **Z. 561–563 (Interpretation der $O(1/k)$-Rate)**: „GD-Fehler sinkt mit Rate
  $O(1/k)$ $\implies$ braucht $k \sim 1/\varepsilon$ Schritte für Fehler
  $< \varepsilon$" nennt den FUNKTIONSWERT-Abstand $f(\bx^{(k)}) - f(\bx^\star)$
  unqualifiziert „Fehler". Über $\left\|\bx^{(k)} - \bx^\star\right\|$ sagt die
  Schranke nichts, und beide können weit auseinanderliegen — die
  Abbruchkriterien-Folie Z. 630–631 warnt selbst davor. *Skript
  Bemerkung 13.3.11 trennt die beiden Fehlerbegriffe und beziffert den
  Unterschied in Bemerkung 13.3.17
  ($f = \tfrac12(x_1^2 + 10^{-8}x_2^2)$ in $(0; 10)^\top$: Gradientennorm
  $10^{-7}$, Funktionswertabstand $5\cdot 10^{-7}$, Abstand zum Minimum $10$).*
- **Z. 581 (Typografie)**: In der Schranke der starken Konvexität sind die
  `\left`/`\right`-Paare verschränkt
  (`\left(f\right(\bx^{(0)}\left) - f\left(\bx^\star\right)\right)`). Die Zahl
  der Delimiter stimmt, die Klammern erscheinen also an den richtigen Stellen,
  aber die Paarung ist eine andere als gemeint; sauber wäre
  `\left(f\left(\bx^{(0)}\right) - f\left(\bx^\star\right)\right)`.
- **Z. 575–580 (Konvergenzrate bei starker Konvexität, Lücke)**: Der Satz nennt
  keine Schrittweite. Die Rate $\rho = 1 - \mu/L$ gehört zu $\gamma = 1/L$;
  für $\gamma \le 1/L$ gilt die Aussage mit $\rho = 1 - \gamma\mu$, und für
  kleines $\gamma$ ist das deutlich schlechter. Numerisch auf
  $\bA = \diag(1, 10)$: mit $\gamma = 0{,}02$ fällt $f$ je Schritt auf das
  $0{,}9604$-fache, die Folienrate $0{,}9$ wäre also verletzt.
  *Skript Satz 13.3.13 formuliert beide Fassungen.*
- **Z. 590 (Konditionszahl einer Funktion, Präzisierung)**:
  $\kappa_f = \lambda_{\max}(\bH_f)/\lambda_{\min}(\bH_f)$ liest sich, als
  gäbe es EINE Hesse-Matrix. Für nichtquadratisches $f$ wandert sie mit $\bx$,
  gemeint ist $\sup_{\bx}\lambda_{\max}/\inf_{\bx}\lambda_{\min}$ passend zu
  den Definitionen von $L$ und $\mu$ zwei Folien vorher; der auskommentierte
  Block Z. 594–614 sagt es selbst richtig ($\mu\bI \preceq \bH_f(\bx) \preceq
  L\bI$). *Skript Bemerkung 13.3.14 schreibt Supremum und Infimum aus und
  formuliert den auskommentierten Block aus.*
- **Z. 567–571 / Z. 641 (Notation)**: Die Definition der starken Konvexität
  über $\bH_f(\bx) - \mu\bI \succeq 0$ setzt zweimalige Differenzierbarkeit
  stillschweigend voraus (die ableitungsfreie Fassung „$f - \tfrac{\mu}{2}
  \|\bx\|^2$ konvex" braucht sie nicht), und der Buchstabe $\rho$ ist im
  Foliensatz doppelt belegt: Konvergenzrate $\rho = 1 - \mu/L$ (Z. 580) gegen
  Verkleinerungsfaktor $\rho \in (0,1)$ der Backtracking-Liniensuche (Z. 641).
  *Skript Definition 13.3.12 nennt die Voraussetzung, und vor
  Algorithmus 13.3.18 steht ein Warnhinweis zur Doppelbelegung.*

- **Z. 672 (Newton-Idee, Minimierung der Näherung)**: Die Zeile
  $\nabla_{\bh}[\ldots] = \nabla f(\bx)^\top + \bH_f(\bx)\bh \overset{!}{=}
  \bnull^\top$ mischt Spalten- und Zeilenkonvention: Links stehen zwei
  Spaltenvektoren, rechts ein Zeilenvektor. Als Spaltengleichung gelesen ist die
  Zeile richtig (und liefert denselben Schritt), aber sie ist dann nicht der
  Gradient nach $\bh$, den die Kursnotation als Zeile führt.
  *Skript §13.4 rechnet wie Kapitel 11: $\nabla_{\bh} T_2 = \nabla f(\bx) +
  \bh^\top\bH_f(\bx) \overset{!}{=} \bnull^\top$, dann auflösen und
  transponieren.*
- **Z. 681 (Voraussetzung des Newton-Schritts)**: „bei konvexem $f$:
  $\bH_f \succ 0$" ist zu stark. Konvexität liefert nur positive
  Semidefinitheit, und selbst strikte Konvexität reicht nicht ($f(x) = x^4$ hat
  $f''(0) = 0$). Positive Definitheit ist eine eigene Annahme.
  *Skript Bemerkung 13.4.2 sagt es mit dem Gegenbeispiel.*
- **Z. 715 (Geometrische Intuition, zweite Tafel)**: Der Zahlenwert
  „$x^{(2)} \approx 2{,}44$" gehört zu einer Funktion, die nur als PDF-Grafik
  existiert und im Quelltext nicht steht; er ist damit nicht nachrechenbar.
  *Skript Beispiel 13.4.4 konstruiert ein eigenes Beispiel
  ($f(x) = x - 2\ln x$, Minimum $x^\star = 2$) mit exakter Fehlerrekursion
  $e_{k+1} = e_k^2/2$, per node verifiziert.*
- **Z. 760 (Fußnote zum BFGS-Verfahren)**: „Broyden-Fletcher-Goldfarb-**Shannon**"
  ist falsch. Der vierte Namensgeber ist David **Shanno** (nicht der
  Informationstheoretiker Claude Shannon). *Skript Definition 13.4.9 nennt Shanno
  und merkt die Verwechslung an.*
- **Z. 787/789 (Methodenvergleich, R-Zeilen)**: „Quasi-Newton (BFGS): Default in
  `R`s `optim()` mit Gradient" trifft nicht zu, und „Nelder-Mead: Default in `R`s
  `optim()`, wenn keine Ableitungen verfügbar" trägt eine Bedingung, die es nicht
  gibt. `optim()` benutzt ohne `method`-Angabe stets Nelder-Mead, auch wenn ein
  Gradient über `gr` mitgeliefert wird; BFGS muss mit `method = "BFGS"`
  angefordert werden. *Skript Bemerkung 13.4.12 stellt es richtig und verweist für
  die Einzelheiten auf §13.6.*
- **Z. 817 (Heavy-Ball, Parametername)**: $\alpha$ wird „Dämpfungsfaktor"
  genannt. In der mechanischen Analogie der Nachbarfolie ist gerade $1 - \alpha$
  die Reibung: Je größer $\alpha$, desto weniger Dämpfung der Bewegung und desto
  mehr Gedächtnis. Gedämpft wird nur die Oszillation quer zum Tal.
  *Skript Bemerkung 13.4.14 benennt $\alpha$ als Momentumparameter und erklärt
  den Unterschied.*
- **Z. 837/843 (Momentum, Zusammenfassung)**: „Bei streng konvexen
  Funktionen beschleunigt Momentum die Konvergenz signifikant" gilt als Satz nur
  für Quadriken (Rate $(\sqrt\kappa-1)/(\sqrt\kappa+1)$ mit
  $\alpha^\star = ((\sqrt\kappa-1)/(\sqrt\kappa+1))^2$). Für allgemeine
  glatte, strikt konvexe Funktionen gibt es Gegenbeispiele, auf denen Heavy-Ball
  mit genau diesen Parametern zyklisch wird und nicht konvergiert; die Garantie
  trägt erst die Nesterov-Variante. Auch „fast immer eine gute Idee" ist zu
  pauschal: Bei kleiner Konditionszahl ist $\alpha = 0{,}9$ LANGSAMER als der
  reine Gradientenabstieg (per node auf $f = \tfrac12(x_1^2 + 5x_2^2)$ mit
  $\gamma = 1/L$: 106 gegen 31 Schritte bis $f \le 10^{-6}f_0$; erst ab
  $\kappa \approx 25$ dreht sich das Bild).
  *Skript Bemerkung 13.4.14 und das Momentum-Widget führen beides vor.*
- **Z. 861–862 (SGD, Unverzerrtheit)**: $\E[\nabla L(y_i, p_\btheta(\bx_i))] =
  \nabla R(\btheta)$ steht ohne Angabe, worüber der Erwartungswert läuft.
  Gemeint ist allein die Ziehung des Index, $i \sim
  \text{Uniform}(\{1, \dots, N\})$, bei festem Datensatz und festem
  $\btheta$; über die Verteilung der Daten wird nichts vorausgesetzt.
  Nebenbei schreibt die Update-Formel Z. 864 den Gradienten an $p_\btheta$ statt
  an $p_{\btheta^{(k)}}$, obwohl er an der aktuellen Iterierten ausgewertet wird.
  *Skript Satz 13.4.15 formuliert die Voraussetzung und beweist die Aussage in
  einer Zeile; Algorithmus 13.4.16 indiziert den Parameter mit.*
- **Z. 753 (Quasi-Newton-Update ohne Schrittweite)**: Der Block schreibt
  $\bx^{(k+1)} = \bx^{(k)} - \bB_k \nabla f(\bx^{(k)})^\top$, also ohne
  Schrittweitenparameter, während Z. 658 zwei Folien vorher ankündigt, BFGS
  verwende „automatisch *Line Search*". Beides zusammen geht nicht: Ohne
  Schrittweite ist der erste Schritt aus $\bB_0 = \bI$ (Z. 765) ein
  ungebremster Gradientenschritt und kann den Funktionswert erhöhen (auf
  $f(\bx) = 0{,}5x_1^2 + 2{,}5x_2^2$ mit Start $(5; 1)$ springt $f$ von 15 auf
  40, per node). Der Standard-Quasi-Newton-Schritt trägt ein $\gamma_k$ aus der
  Liniensuche. *Skript Algorithmus 13.4.8 führt $\gamma_k$ mit und sagt die
  Abweichung von der Folie dazu; das BFGS-Widget führt beide Fassungen vor.*
- **Z. 762–763 (Sekantenbedingung, Kehrwert-Verwechslung)**: Unmittelbar
  untereinander stehen zwei Gleichungen, die beide „Sekantenbedingung" heißen,
  aber Kehrwerte voneinander sind: der eindimensionale Differenzenquotient
  $f''(x) \approx (f'(x_{k+1}) - f'(x_k))/(x_{k+1} - x_k)$ nähert die zweite
  Ableitung, die Matrixgleichung $\bB_{k+1}\by_k = \bs_k$ dagegen deren
  Inverses (Z. 754 sagt korrekt $\bB_k \approx \bH_f^{-1}$). In einer Dimension
  ist $b = s/y$ das Reziproke von $y/s$; ohne diesen Hinweis liest man
  $\bB_k \approx \bH_f$. *Skript sagt es in einem Halbsatz vor
  Definition 13.4.9 dazu.*
- **Z. 779–781 (Methodenvergleich, Tabellensatz)**: Die Zeile
  „Komplexität/Schritt" ist über zwei Quelltextzeilen gebrochen und erzeugt
  eine leere Tabellenzeile („| Komplexität/   ||||"), und in der
  Konvergenzzeile steht ein manuell getrennter Zellinhalt „Qua- dratisch", der
  im Satz als solcher stehen bleibt. Reine Satzfehler, kein Inhaltsfehler.
  *Skript §13.4 setzt die Tabelle sauber und schreibt „lokal quadratisch",
  weil die Rate nur in der Nähe des Minimums gilt.*
- **Z. 922 („Lagrange-Multiplikatoren: Idee", Multiplikatormenge)**: Die Folie
  schreibt „$\exists\, \lambda \in \R / \{0\}$". Das ist doppelt schief.
  Erstens meint die Notation die Mengendifferenz $\R \setminus \{0\}$;
  $\R / \{0\}$ wäre ein Quotient. Zweitens ist $\lambda = 0$ zu Unrecht
  ausgeschlossen: Liegt das unbeschränkte Minimum auf der Nebenbedingung, so
  ist dort schon $\nabla f(\bx^\star) = \bnull^\top$, und die
  Parallelitätsbedingung gilt genau mit $\lambda = 0$. Wirklich gebraucht wird
  stattdessen $\nabla g(\bx^\star) \neq \bnull^\top$, was die Folie nicht
  sagt. Dieselbe Zeile schreibt ausserdem $= \bnull$ ohne Transponiertes,
  während Z. 936 zwei Folien weiter korrekt $\bnull^\top$ setzt (gleiche
  Sorte wie Z. 58/60 und Z. 480/618). *Skript Bemerkung 13.5.3 korrigiert
  beides und setzt durchgehend $\bnull^\top$.*
- **Z. 935 und Z. 969 (Lagrange-Satz und KKT-Satz ohne
  Regularitätsbedingung)**: Beide Sätze behaupten die Existenz der
  Multiplikatoren ohne jede Voraussetzung an die Gradienten der
  Nebenbedingungen. Ohne sie sind beide falsch: $\min x$ unter
  $g(x, y) = y^2 - x^3 = 0$ erzwingt $x \ge 0$, hat also das Minimum in
  $(0, 0)$; dort ist $\nabla g(0,0) = \bnull^\top$ und
  $\nabla f = (1, 0) \neq \bnull^\top$, kein $\lambda$ löst die
  Stationaritätsgleichung. *Skript Satz 13.5.5 fordert lineare Unabhängigkeit
  der $\nabla g_i(\bx^\star)$ und führt das Gegenbeispiel im Absatz danach
  vor; Satz 13.5.7 fordert sie für die Gleichungen zusammen mit den aktiven
  Ungleichungen.*
- **Z. 952 (Beispielrechnung, Notation)**: In der dritten Zeile der
  notwendigen Bedingungen steht „$\frac{\partial \Lcal}{\partial \lambda} =
  g(x) = x + y - 1$" — $g$ hat auf dieser Folie zwei Argumente
  ($g(x, y)$, so Z. 943). *Skript Beispiel 13.5.6 lässt den Zwischenschritt
  weg und schreibt die Gleichung direkt aus.*
- **Z. 1023 / Z. 1029 (Regularisierte Regression, Äquivalenz der beiden
  Formen)**: „Für jedes $\lambda > 0$ existiert ein $c > 0$ (und umgekehrt)"
  gilt in der Umkehrrichtung nur, solange die Nebenbedingung bindet. Ist $c$
  so gross, dass der KQ-Schätzer selbst zulässig ist, erzwingt die
  Komplementarität $\mu = 0$, und das entspricht $\lambda = 0$, nicht einem
  $\lambda > 0$. Aus demselben Grund ist auch Z. 1029 („Kreisförmige
  Nebenbedingung $\to$ Lösung auf Kreisbogen") zu absolut. Ergänzend die
  schon zu Z. 78/80 registrierte Datenabhängigkeit der Zuordnung
  $\lambda \leftrightarrow c$. *Skript Beispiel 13.5.10 nennt beide
  Einschränkungen, Bemerkung 13.5.11 und das Ridge-Lasso-Widget führen den
  inaktiven Fall am Budget-Regler vor.*
- **Z. 1039 („KKT und Konvexität", Richtung der Aussage)**: „Sind $f$ und alle
  $h_j$ konvex und alle $g_i$ affin, dann sind die KKT-Bedingungen nicht nur
  notwendig, sondern auch hinreichend." Die beiden Richtungen haben sehr
  verschiedene Voraussetzungen: Hinreichend sind sie im konvexen Fall OHNE
  jede Regularitätsbedingung, notwendig dagegen nur mit einer (etwa Slater).
  Gegenbeispiel $\min x$ unter $h(x) = x^2 \le 0$: Ziel und Nebenbedingung
  konvex, einziger zulässiger und damit optimaler Punkt $x^\star = 0$, aber
  $1 + \mu \cdot 2x^\star = 1 \neq 0$ für jedes $\mu \ge 0$, also existiert
  gar kein KKT-Multiplikator. *Skript Satz 13.5.12 formuliert nur die
  hinreichende Richtung, beweist sie in drei Zeilen und stellt das
  Gegenbeispiel danach.*
- **Z. 1045 („Konsequenzen", Konvexität statistischer Probleme)**: „MLE für
  Exponentialfamilien" ist so kein konvexes Minimierungsproblem; konvex ist
  die NEGATIVE Log-Likelihood, und auch das nur in der kanonischen
  Parametrisierung (gleiche Sorte wie 12-konvexitaet Z. 78). *Skript sagt
  beides dazu.*
- **Z. 1046 („Konsequenzen", nicht-konvexer Fall)**: „Nicht-konvexe Probleme
  (z. B. neuronale Netze): KKT liefert nur lokale Optima" verspricht zu viel.
  Die KKT-Bedingungen sind auch dort nur notwendig; ein KKT-Punkt kann ein
  Sattelpunkt oder ein lokales Maximum sein, genau wie ein stationärer Punkt
  im unbeschränkten Fall (Folie Z. 329–357 sagt das dort selbst). *Skript
  spricht von Kandidaten und verweist auf §13.2.*
- **Z. 1108–1112 (`grad_f`, Klammerfehler)**: Die Hilfsgröße heißt
  `log1p_dx <- 1 / (1 + (x[1]^2 + sin(3*x[2])))^2`, gebraucht wird aber
  $1/(1 + u^2)$ mit $u = x_1^2 + \sin(3x_2)$: Die schließende Klammer steht
  eine Position zu früh, das Quadrat trifft $(1 + u)$ statt $u$, und weil `^`
  in R stärker bindet als `/`, greift es auch wirklich dort. Der übrige
  Bauplan ist korrekt (die inneren Ableitungen $4x_1u$ und $6\cos(3x_2)u$
  stehen davor), es ist also genau EIN Klammerfehler und kein fehlender
  Faktor. Am Startpunkt $(-1; -0{,}5)$ fällt er kaum auf, weil dort
  $u \approx 0{,}0025$ ist und beide Ausdrücke fast $1$ ergeben ($0{,}9950$
  gegen $0{,}99999$); an $(1; 0{,}5)$ mit $u \approx 2{,}00$ liefert der
  Folien-Code dagegen $(1{,}09; 0{,}19)$ statt $(1{,}80; 0{,}27)$ (zentraler
  Differenzenquotient bestätigt den korrekten Wert; setzt man allein die
  Klammer richtig, stimmen beide Komponenten wieder, per node 2026-08-13).
  Ausgerechnet die Folie darunter (Z. 1118) wirbt damit, der analytische
  Gradient sei „genauer" als finite Differenzen. *Skript Beispiel 13.6.3 zeigt
  den korrigierten R-Code, Bemerkung 13.6.4 stellt beide Fassungen samt Zahlen
  gegenüber.*
- **Z. 1059 (`optimize`, Verfahrensangabe)**: „Benutzt *Golden Section Search*"
  nennt nur den halben Algorithmus. `optimize()` implementiert Brents `fmin`,
  also eine Kombination aus goldenem Schnitt und sukzessiver parabolischer
  Interpolation; der goldene Schnitt greift erst, wenn der Parabelschritt aus
  der Einschachtelung führt oder zu wenig einbringt. *Skript Bemerkung 13.6.1
  erklärt die Golden Section Search und ergänzt den zweiten Baustein.*
- **Z. 1128 (Wrap-up-Tabelle, „Default!")**: Die BFGS-Zeile trägt „guter
  Kompromiss (Default!)". Für `optim()` stimmt das nicht: Ohne `method` läuft
  stets Nelder-Mead, auch mit einem über `gr` gelieferten Gradienten. Zweite
  Fundstelle desselben Missverständnisses wie Z. 787/789. *Skript §13.6 lässt
  die Klammer in der Tabelle weg und stellt es im Absatz darunter richtig;
  §13.4 (Bemerkung 13.4.12) sagt es schon vorher.*
- **Z. 1078 (Chunk-Optionen der Landkarten-Grafik)**: Der Chunk-Kopf
  `{r optim-example, echo = TRUE, warning = FALSE, fig.height = 3,
  fig.width = 3, echo = FALSE}` enthält `echo` ZWEIMAL mit gegensätzlichen
  Werten. Welche Angabe gewinnt, hängt davon ab, wie knitr die doppelte
  Option auflöst; gemeint ist offensichtlich `echo = FALSE` (die Nachbarspalte
  zeigt Code, diese Spalte die Grafik). Reine Quelltext-Altlast, kein
  Inhaltsfehler. *Im Skript ersetzt das Widget die Grafik.*

## 14-funktionsapproximation

- **Z. 63/66/69 („Einführung")**: Die drei Problemvarianten mischen die
  Datenlagen. Die Interpolationsbedingung steht dort als f(x_i) = f̂(x_i),
  alle späteren Folien (Z. 98, 172) schreiben y_i = f̂(x_i). Ohne den Zusatz
  „rauschfrei, also y_i = f(x_i)" verwischt das die Grenze zwischen
  Interpolation und Glättung (externes Review 14, Punkt 4).
  *Skript Bemerkung 14.1.4 klärt beide Schreibweisen; §14.1 arbeitet
  durchgehend mit (x_i, y_i).*
- **Z. 86–91 („Anwendungen in ML und Data Science")**: Latent-Space-
  Interpolation und Positional Encodings (RoPE) stehen unkommentiert neben
  echten Interpolationsanwendungen. Positional Encodings werten feste Sinus-
  und Kosinusfunktionen an den Token-Positionen aus, eine Bedingung
  f̂(x_i) = y_i kommt darin nicht vor (externes Review 14, Punkt 13).
  *Skript Bemerkung 14.1.6 trennt die zwei echten Anwendungen von den zwei
  Analogien und ordnet die auskommentierte KAN-Zeile (Z. 92) ein.*
- **Z. 88**: Tippfehler „beim Reformatierung/Rotation von Bildern" (richtig:
  „bei der Reformatierung"). *Im Skript ausformuliert.*
- **Z. 108–112 (Quiz)**: Die Musterlösung markiert Aussage 1 und Aussage 3
  als wahr, wörtlich gelesen widersprechen sie einander (unendlich viele
  Lösungen gegen Eindeutigkeit bei paarweise verschiedenen x_i). Aussage 3
  stimmt nur mit der stillschweigenden Einschränkung auf einen festen
  n-dimensionalen Ansatzraum, etwa Polynome vom Grad höchstens n−1
  (Folie Z. 261). Dazu Tippfehler in Z. 108: „Es gibt unendliche viele
  Funktionen" (richtig: „unendlich viele").
  *Skript-Selbsttest 14.1 nimmt die Einschränkung in die Aussage auf und
  benennt den Widerspruch.*
- **Z. 114–148 („Unendlich viele Lösungen: Beispiel")**: Die Folie zeigt vier
  Interpolanten, nennt aber ihren gemeinsamen Bauplan nicht: Mit jedem
  Interpolanten p und jeder Funktion g mit g(x_i) = 0 ist auch p + g einer
  (externes Review 14, Punkt 12). *Skript Satz 14.1.8 samt Beweis;
  Bemerkung 14.1.9 rechnet die drei Differenzen des Beispiels aus:
  x(x−1)(x−2), 0,5 sin(2πx) und die stückweise quadratische Differenz zu
  f̂_2.*

- **Z. 255 (Fundamentalsatz, Beispiel)**: Das Beispiel benutzt n für den GRAD
  („Ein quadratisches Polynom (n = 2)"), während die Folgerung drei Zeilen
  darüber n für die Zahl der Nullstellen benutzt (Grad ≤ n−1 mit n
  verschiedenen Nullstellen). In der Lesart der Folgerung ist das Beispiel
  der Fall n = 3. *Skript Beispiel 14.3.3 kommt ohne das zweite n aus.*
- **Z. 274 („Polynominterpolation", Monomialbasis)**: „Alle Polynome
  (n−1)-ten Grades können durch die Monomialbasis erzeugt werden" muss
  „höchstens (n−1)-ten Grades" heißen, sonst fehlen dem Ansatzraum gerade die
  Polynome kleineren Grades. Es ist genau die Unterscheidung, auf der die
  übernächste Folie (Z. 284) besteht. *Skript Definition 14.3.4 schreibt
  „höchstens", Bemerkung 14.3.7 und Beispiel 14.3.8 führen den Fall vor.*
- **Z. 332–339 („Kondition: Numerisches Beispiel")**: Die Tabelle nennt
  κ(B) ≈ 10³/10⁸/10¹²/10¹⁶ ohne Norm und ohne Angabe zur Knotenlage
  (externes Review 14, Punkt 11). Eigene Rechnung für n äquidistante Stellen
  in [0,1] (node, κ über die explizit berechnete Inverse):
  κ₂ = 6,9·10² / 1,5·10⁷ / 4,0·10¹¹ / 1,1·10¹⁶ und
  κ_∞ = 1,7·10³ / 4,8·10⁷ / 1,6·10¹² / 4,9·10¹⁶; dieselben Stellen auf
  [−1,1] gerechnet drücken κ₂ bei n = 20 auf 2,7·10⁸. Der Trend
  (exponentielles Wachstum) stimmt in jeder Norm, der Folienwert für n = 10
  ist großzügig aufgerundet. *Skript Beispiel 14.3.11 kennzeichnet die Reihe
  ausdrücklich als Größenordnungen, nennt beide Normen und die
  Knotenabhängigkeit.*
- **Z. 358/361 („Das Runge-Phänomen")**: Zwei Befunde. (a) Die Folie
  interpoliert „mit n äquidistanten Knoten durch p_n"; bei n Knoten ist der
  Grad n−1, wie die Folie Z. 261 selbst festhält. (b) „‖f − p_n‖_∞ → ∞ für
  n → ∞" stimmt im Limes, legt aber monotones Wachstum nahe (externes
  Review 14, Punkt 6). Nachgerechnet (node, Maximum über 2001 Gitterpunkte
  auf [−1,1]): 0,44 (n = 5), 0,30 (n = 10), 7,2 (n = 15), 8,6 (n = 20),
  257 (n = 25). Von n = 5 auf n = 10 FÄLLT der Fehler, und die Folge
  zickzackt zwischen geraden und ungeraden Knotenzahlen; die Fehlermaxima
  wandern dabei an den Rand (|x| ≈ 0,80 / 0,93 / 0,96 / 0,97). Chebyshev-
  Knoten drücken denselben Fehler auf 0,047 (n = 15) und 0,038 (n = 20).
  *Skript Beispiel 14.3.15 mit p_{n−1}, Bemerkung 14.3.16 mit der Tabelle
  der verifizierten Werte, Bemerkung 14.3.17 mit den Chebyshev-Knoten
  (Review-Punkt 6).*
- **Z. 380–392 („Def.: Polynom-Spline")**: „mit Polynomen q-ten Grades p_k"
  meint Grad HÖCHSTENS q (externes Review 14, Punkt 2). Wörtlich gelesen
  wäre nicht einmal die Nullfunktion ein Spline und die Menge kein
  Vektorraum. Ausserdem ist die Forderung s ∈ C^{q−1} Teil der Definition
  und keine Folgerung; für q = 0 bedeutet C^{−1} keine Stetigkeitsforderung.
  *Skript Definition 14.4.1 mit „höchstens q", Bemerkung 14.4.2 mit beiden
  Präzisierungen und dem Fall q = 0.*
- **Z. 403–411 und Z. 413–421 (Quiz-Folien) sowie Z. 423 („Warum m + q
  Parameter?")**: Die Zählung gilt nur für einfache innere Knoten und
  maximale Glattheit C^{q−1}; die Folie führt die Annahme mit, das Quiz
  darüber nicht (externes Review 14, Punkt 3). Ausserdem setzt das blosse
  Abziehen der (m−1)q Bedingungen deren lineare Unabhängigkeit voraus.
  Nachgerechnet (node): m(q+1) − (m−1)q = m+q, Folienbeispiel 20 − 12 = 8 ✓.
  *Skript Satz 14.4.4 beweist die Dimension m+q über die Basis der
  abgeschnittenen Potenzen; Bemerkung 14.4.5 führt die Folien-Abzählung als
  Gegenprobe und nennt beide Annahmen.*
- **Z. 450–454 („Randbedingungen für kubische Splines", Tabelle)**: Die
  periodische Zeile nennt s(a) = s(b) und s'(a) = s'(b). Das sind keine zwei
  brauchbaren Zusatzbedingungen: Bei periodischen Daten (y_0 = y_m) folgt
  s(a) = s(b) schon aus den Interpolationsbedingungen, bei nicht
  periodischen Daten widerspricht die Forderung ihnen. Nachgerechnet (node,
  q = 3, m = 4, 16 Unbekannte): mit {s(a)=s(b), s'(a)=s'(b)} hat die Matrix
  nur Rang 15 (ein Freiheitsgrad bleibt), mit {s'(a)=s'(b), s''(a)=s''(b)}
  ist sie regulär; bei y_0 ≠ y_m wird das System singulär.
  *Skript Bemerkung 14.4.6 setzt s'(a)=s'(b) und s''(a)=s''(b) und benennt
  den Befund.*
- **Z. 493–496 („B-Splines", Cox-de-Boor-Rekursion)**: Die erweiterte
  Knotenfolge ist doppelt fehlerhaft (externes Review 14, Punkt 1; auf der
  Folie nur halb repariert). (a) Die Indexbereiche überlappen: „τ_{q+1+i} =
  ξ_i" und „τ_{m+1} = … = τ_n = ξ_m" kollidieren, für q = 3, m = 5 bekäme
  τ_6 sowohl ξ_2 als auch ξ_5. (b) Die Folge ist zu kurz: n = m+q Knoten
  reichen nicht, die Rekursion greift für k = m+q auf τ_{k+q+1} = τ_{m+2q+1}
  zu. Der offene Knotenvektor zu m+q Basisfunktionen vom Grad q braucht
  m + 2q + 1 Knoten (τ_1 = … = τ_{q+1} = ξ_0; τ_{q+1+i} = ξ_i für
  i = 1, …, m−1; τ_{m+q+1} = … = τ_{m+2q+1} = ξ_m); für q = 3, m = 17 sind
  das 24 statt 20. (c) Der erste Nenner der Rekursion steht als
  ξ_{k+q} − τ_k, richtig ist τ_{k+q} − τ_k. Nachgerechnet (node): mit der
  korrigierten Folge summieren sich die m+q Basisfunktionen für q = 0,1,2,3
  auf [ξ_0, ξ_m) bis auf 4,4·10^−16 zu eins, und der numerisch bestimmte
  Träger von B_k stimmt mit [τ_k, τ_{k+q+1}] überein.
  *Skript Definition 14.4.8 mit der korrigierten Fassung, Bemerkung 14.4.9
  mit dem Befund, Beispiel 14.4.10 rechnet q = 1 vollständig aus.*
- **Z. 518–524 („Numerische Stabilität & Effizienz", Konditionstabelle)**:
  Die beiden Werte κ ≈ 10^16 und κ ≈ 10^2 stehen ohne Norm und ohne
  Knotenangabe da (externes Review 14, Punkt 11). Eigene Rechnung für 20
  äquidistante Punkte in [0,1]: die Vandermonde-Matrix hat in exakter
  rationaler Arithmetik κ_1 = 4,4·10^16, die kubische
  B-Spline-Kollokationsmatrix mit 20 Basisfunktionen (m = 17) κ_1 = 37, also
  Grössenordnung 10^1 bis 10^2 je nach Knotenwahl. Der Abstand sind gut
  fünfzehn Grössenordnungen, nicht vierzehn.
  *Skript Bemerkung 14.4.13 kennzeichnet die Tabelle als illustrativ und
  nennt die eigenen Werte.*
- **Z. 529–530 („LGS-Lösung in O(n q²) statt O(n³)")**: n bezeichnet auf
  denselben Folien die Zahl der Datenpunkte, hier aber die Systemgrösse
  (externes Review 14, Punkt 7). Die Speedup-Angabe „Faktor ≈ 100 000" für
  n = 1000, q = 3 ist als Grössenordnung richtig: n²/q² = 10^6/9 ≈ 111 000
  (node), verglichen werden allerdings Operationszahlen, keine Laufzeiten.
  *Skript Bemerkung 14.4.14 schreibt N für die Systemgrösse und sagt beides
  dazu.*
- **Z. 544 („Eigenschaften", Punkt 3)**: „Die Ableitungen bzw. das
  Integral eines Splines approximieren auch die Ableitungen bzw. das
  Integral der zu approximierenden Funktion" steht ohne Voraussetzung. Für
  das Integral folgt es direkt aus ‖f − s‖_∞ < ε, für die Ableitungen
  braucht es Glattheit von f, und die Konvergenz ist um eine Ordnung
  langsamer. *Skript Bemerkung 14.4.16.*
- **Z. 555–556 („Eigenschaften II", Punkt 5)**: Der Träger steht dort als
  [τ_k, τ_{k+q+1}] und ist damit korrekt (frühere Fassung mit ξ, externes
  Review 14, Punkt 9, ist repariert); die Aussage gilt allerdings nur mit
  der Knotenfolge aus (b) oben, die die Folie nicht liefert.
  *Skript Satz 14.4.11.*

## 15-funktionsapproximation-II

- **Z. 61 („Splines")**: Die Erinnerung definiert einen Spline als Funktion,
  „die Polynome an den Punkten ξ₁, …, ξ_{m−1} zusammensetzt" — die
  Glattheitsforderung (C^{q−1} an den Knoten) fehlt. Ohne sie wäre jede
  stückweise konstante Treppenfunktion ein kubischer Spline.
  *Skript Bemerkung 15.1.2 nimmt die Glattheit in die Beschreibung auf.*
- **Z. 93–95 (Krümmungssatz, Beweis)**: Die Zusatzforderung
  h″(a) = h″(b) = 0 an die Differenz h = g − s ist überflüssig und im
  Allgemeinen falsch: Wegen s″(a) = 0 ist h″(a) = g″(a), und ein beliebiger
  C²-Interpolant g hat dort keinen Grund zu verschwinden. Wer sie ernst
  nimmt, beweist den Satz nur für eine echte Teilmenge der Konkurrenten.
  Gebraucht wird allein s″(a) = s″(b) = 0 (natürlicher Spline).
  *Skript Satz 15.1.4 und Bemerkung 15.1.5 kommen ohne die Forderung aus.*
- **Z. 116 (Beweisende)**: „Gleichheit nur für h ≡ 0" ist nur behauptet. Die
  Kette braucht ∫(h″)² = 0 ⟹ h″ ≡ 0 (Stetigkeit des Integranden) ⟹ h affin
  ⟹ h ≡ 0, und der letzte Schritt braucht n ≥ 2 Stützstellen; bei n = 1 ist
  jede Gerade durch den Punkt ein Minimierer. *Skript: siebter Beweisschritt
  zu Satz 15.1.4, dazu Korollar 15.1.6 (Eindeutigkeit) und Bemerkung 15.1.5.*
- **Z. 79 (Satzkopf)**: Die Punkte liegen „in [a, b] × ℝ", ohne Ordnung,
  ohne paarweise Verschiedenheit und ohne a = x₁, x_n = b. Der Beweis
  summiert aber über die Knotenintervalle und setzt das Ergebnis mit dem
  Randterm an a und b gleich, was nur mit den äußersten Knoten als
  Intervallenden aufgeht. *Skript Satz 15.1.4 fordert
  a = x₁ < … < x_n = b; Bemerkung 15.1.5 leitet den allgemeinen Fall über
  die lineare Fortsetzung außerhalb von [x₁, x_n] her.*
- **Z. 102 (Beweis, Indizes)**: „Auf jedem Intervall [x_{i−1}, x_i]" nennt
  den Laufbereich nicht; bei Punkten x₁, …, x_n existiert x₀ nicht, i läuft
  von 2 bis n (dieselbe Sorte Lücke, die das externe Review als Punkt 3A für
  den Approximationssatz anmerkt). *Skript summiert explizit über
  i = 2, …, n.*
- **Z. 68/72 (Terminologie, Präzisierung)**: „Minimale Krümmung" meint
  ∫|f″|², nicht das Integral der geometrischen Krümmung
  κ = |f″|/(1+(f′)²)^{3/2}; die beiden fallen nur für flache Kurven mit
  |f′| ≪ 1 zusammen. Der Name ist eingebürgert, die Näherung sollte aber
  benannt werden (so bei Deuflhard/Hohmann, Numerische Mathematik 1, §7.4).
  *Skript sagt es im Absatz nach Definition 15.1.3.*

- **Z. 162–164 („Funktionenräume")**: „Wähle Basisfunktionen φ_1, …, φ_K" und
  der Schluss „Jedes f ∈ F_K ist durch K Koeffizienten eindeutig bestimmt"
  setzen die lineare Unabhängigkeit der φ_k stillschweigend voraus. In der
  Leserichtung Koeffizienten → Funktion ist die Zeile immer richtig; die
  gemeinte Gegenrichtung (und damit dim F_K = K) gilt nur für linear
  unabhängige φ_k. Gegenbeispiel: φ = (1, x, 1+x) hat K = 3, aber F_3 sind
  die Polynome vom Grad höchstens 1 mit Dimension 2, und f(x) = 1+x besitzt
  dort unendlich viele Koeffizientenvektoren, darunter (1,1,0) und (0,0,1).
  Nebenbefund in Z. 163: Die Mengenklammer beschreibt mit „f(x) = Σ a_k φ_k(x)"
  Funktionswerte, gemeint sind die Funktionen selbst.
  *Skript Satz 14.2.4 (Koordinatenabbildung bijektiv genau bei linearer
  Unabhängigkeit) samt Beweis und Bemerkung 14.2.5 mit diesem Gegenbeispiel.*

- **Z. 210 (Approximationssatz, Konstante)**: „z. B. C = 5/384 für natürliche
  Splines" schreibt die scharfe Konstante dem falschen Spline zu. 5/384 ist die
  Hall-Meyer-Schranke für den *vollständigen* kubischen Spline
  (s′(a) = f′(a), s′(b) = f′(b)); der natürliche Spline erfüllt sie nur, wenn
  zusätzlich f″(a) = f″(b) = 0 gilt. Sonst ist er am Rand nur O(h²) genau.
  Zwei eigene Gegenrechnungen (node): für f(x) = e^x auf [0,1] fällt sein
  Maximalfehler beim Halbieren von h nur auf ein Viertel (2,08·10⁻³ / 5,21·10⁻⁴
  / 1,30·10⁻⁴ / 3,26·10⁻⁵ bei n = 8/16/32/64, Fehlerspitze wandert gegen den
  rechten Rand), und für f(x) = x³ ist die rechte Seite der Schranke null
  (f⁽⁴⁾ ≡ 0), der natürliche Spline auf vier Teilintervallen weicht aber um
  0,018 ab. Die Satzaussage selbst („es GIBT einen kubischen Spline") bleibt
  richtig, weil x³ sein eigener Interpolant ist. *Skript Satz 15.2.2 sagt „mit
  passenden Randbedingungen", Bemerkung 15.2.4 führt beide Gegenrechnungen vor.*
- **Z. 234 (Beobachtung zur Tabelle)**: „Halbierung von h ⟹ Fehler wird
  2⁴ = 16-mal kleiner" gilt exakt nur für die SCHRANKE. Eigene Messung
  (natürlicher Spline, sin(2πx), Maximum über 200 001 Rasterpunkte): die
  Faktoren sind 18,78 / 16,89 / 16,23 und laufen von oben auf 16 zu; die
  Schranke wird dabei nur zu 25 / 22 / 20 / 20 % ausgeschöpft. *Skript
  Beispiel 15.2.7 und Bemerkung 15.2.8 trennen Schranke und Messung.*
- **Z. 200 gegen Z. 205 (Notation)**: Die Einleitung misst die Gitterweite an
  den Knoten ξ_k, der Satz eine Zeile später an der Partition x_0 < … < x_n.
  Beides meint dasselbe Gitter, die Doppelbenennung ist aber genau der
  Notationsdrift, den das externe Review als Punkt 9 anmerkt (x für Daten,
  ξ für Knoten). *Skript führt in Definition 15.2.1 nur die Partition
  x_0 < … < x_n.*
- **Z. 243 (Wrap-up, Tippfehler)**: „Approximationfehler O(h⁴)" — es fehlt das
  Fugen-s (Approximationsfehler). *Im Skript korrekt.*
- **Z. 350–352 (Beispiel, abgedruckter R-Code)**: Der gezeigte Block ruft
  `bs(x_new, knots = attr(B, "knots"), intercept = TRUE)` ohne
  `Boundary.knots` auf. Ohne dieses Argument setzt `bs()` die Randknoten auf
  den Bereich des NEUEN Gitters (hier [0, 2π]), während `B` sie auf range(x)
  gesetzt hat; die beiden Basen sind dann verschieden und `B_new %*% a_hat`
  mischt Koeffizienten der einen mit Funktionen der anderen. Der ausführende
  Chunk (Z. 326–328) übergibt `Boundary.knots` korrekt, der abgedruckte Code
  nicht — die vom externen Review (Punkt 4) angemahnte Reparatur ist also nur
  zur Hälfte angekommen (der falsche Argumentname `Boundary` ist behoben).
  *Skript zeigt die vollständige Fassung, Bemerkung 15.3.15 erklärt den
  Unterschied.*
- **Z. 257–258 gegen Z. 266–267 (Problemstellung)**: „Finde Funktion f̂ mit
  kleinem Fehler Σ(y_i − f̂(x_i))²" nennt keinen Suchraum. Über alle
  Funktionen ist das Minimum null und wird von JEDEM Interpolanten angenommen
  (unendlich viele, siehe 14-funktionsapproximation), die Aufgabe ist so also
  entartet. Die Gleichung min_{f̂} Σ(…)² = min_a ‖y − Ba‖² eine Folie später
  gilt entsprechend nur, wenn das linke Minimum über F_K läuft. *Skript
  Bemerkung 15.3.3 sagt es und nennt die beiden Auswege (kleiner Ansatzraum
  oder Strafterm), Satz 15.3.5 minimiert ausdrücklich über F_K.*
- **Z. 282–283/289 (Interpolation als K = n)**: „Interpolation: K = n" und
  „passt alle Datenpunkte exakt an: f̂(x_i) = y_i ∀i" gelten nur, wenn die
  Designmatrix invertierbar ist. Bei B-Splines ist das die Bedingung von
  Schoenberg und Whitney und nicht selbstverständlich: Mit den 50 Datenpunkten
  des Skript-Widgets und GLEICHMÄSSIGEN Knoten auf [0, 2π] hat B schon bei
  K = 35 keinen vollen Spaltenrang mehr (Cholesky von BᵀB bricht ab, sieben
  der 32 Knotenintervalle sind leer), obwohl jede Basisfunktion mindestens
  einen Datenpunkt im Träger hat; mit Quantilsknoten hält die Bedingung bis
  K = n. *Skript Bemerkung 15.3.7 mit beiden Rechnungen.*

- **Z. 387–388 und Z. 399 (Varianz- und MSE-Ordnung)**: Beide Zeilen schreiben
  die Rate PUNKTWEISE auf (var[f̂(x)] = O(K/n) bzw.
  E[(f̂(x) − f(x))²] = O(K⁻⁸ + K/n)). Als Aussage über den an den
  Entwurfsstellen GEMITTELTEN Fehler ist sie richtig und sogar exakt: Für
  einen KQ-Schätzer mit Designmatrix von vollem Spaltenrang ist
  (1/n)Σᵢ var[f̂(xᵢ)] = σ²K/n (Spur der Hutmatrix = K). Punktweise gilt sie
  nicht; eigene Rechnung im Folien-Setup (f(x) = sin(3x), n = 100, σ = 0,3):
  bei K = 40 ist die über ein feines Gitter auf [0, 2π] gemittelte Varianz
  5,04 statt 0,036, weil der Schätzer zwischen den Datenpunkten und an den
  Rändern viel stärker schwingt. Ebenfalls ungenannt bleibt die Voraussetzung,
  dass B vollen Spaltenrang hat (sonst existiert B⁺y zwar, aber nicht die
  benutzte Kovarianzform). *Skript Satz 15.4.4 beweist die exakte gemittelte
  Fassung, Bemerkung 15.4.5 nennt den punktweisen Vorbehalt samt Gegenzahl.*
- **Z. 413–417 (Beispieltabelle, Var-Spalte)**: Die drei Varianzwerte 0,02 /
  0,05 / 0,12 passen zu σ·K/n statt zu σ²·K/n: 0,3·5/100 = 0,015,
  0,3·15/100 = 0,045 und 0,3·40/100 = 0,12 ergeben gerundet genau die
  gedruckten Zahlen, während mit σ² = 0,09 dort 0,00 / 0,01 / 0,04 stehen
  müssten (eigene Simulation mit demselben Setup: 0,0044 / 0,0135 / 0,0358,
  jeweils auf zwei Prozent an σ²K/n). Die Bias-Spalte ist dagegen plausibel
  (0,42 gegen eigene 0,41 bei K = 5). Nachvollziehbar sind die Werte nicht:
  `resources/bias-variance-example.R` erzeugt nur die Abbildung daneben, die
  Tabelle steht ohne Quelle im Foliensatz. *Skript Beispiel 15.4.8 rechnet
  eigene Werte, Bemerkung 15.4.10 kennzeichnet die Folienzahlen als Zitat und
  führt den σ-gegen-σ²-Befund vor.*
- **Z. 425 (Interpretation, Tippfehler)**: „K = 15: Balanciert Bias and
  Varianz" — englisches „and" statt „und". *Im Skript korrekt.*
- **Z. 371 (Typografie)**: „Für kleinen Bias müssen wir also $\bK$ möglichst
  groß wählen" setzt die Basisfunktionszahl fett ($\bK$ ist das Makro für den
  Vektor K), obwohl K überall sonst im Foliensatz ein Skalar in normaler
  Schrift ist. *Skript schreibt durchgehend K.*
- **Z. 359/373/391/405 (Überschriften)**: Vier aufeinanderfolgende Folien
  heißen „Bias-variance Trade-off", „Bias-Varianz Trade-off",
  „Bias-variance Trade-off" und „Bias-Varianz: Beispiel" — die
  Sprachmischung und die Groß-/Kleinschreibung wechseln von Folie zu Folie.
  *Skript nutzt durchgehend „Bias-Varianz".*

- **Z. 497–502 (Konvergenztabelle, Ungenauigkeit)**: Die Spalte „n für
  MSE ≤ 0.01" ist mit der Rate der Nachbarspalte nicht konsistent gerundet.
  Aus n^(−8/(8+p)) ≤ 0,01 folgt bei versteckter Konstante 1 exakt
  n ≥ 10^((8+p)/4), also 10^2,25 ≈ 178 / 10^2,5 ≈ 316 / 10^3,25 ≈ 1778 /
  10^4,5 ≈ 31 623 für p = 1/2/5/10, während die Folie 10^2 / 10^2,5 / 10^4 /
  10^5 nennt: bei p = 1 zu klein (n = 10^2 liefert MSE = 0,0167 > 0,01), bei
  p = 5 und p = 10 um rund eine halbe Größenordnung zu groß, bei p = 2 exakt.
  Die nach dem externen Review (Punkt 7) ergänzte Fußnote „illustrative Werte"
  deckt das ab. *Skript Bemerkung 15.5.6 druckt beide Spalten nebeneinander,
  übernimmt die Fußnote und rechnet die eigenen Werte nach.*
- **Z. 481–487 (Speichertabelle, Einheiten/Typografie)**: „8 KB" und „800 KB"
  meinen 8000 bzw. 800 000 Bytes, also dezimale Präfixe (kB); mit dem binären
  KB/KiB wären es 7,81 bzw. 781 KiB, und die 80 GB der letzten Zeile sind
  binär 74,5 GiB. Dieselbe Tabelle setzt die Tausendertrennung englisch
  („1,000", „100,000"). Die Zahlen selbst stimmen (10^10 · 8 B = 80 GB).
  *Skript Beispiel 15.5.4 nennt die Präfix-Konvention und den binären Wert.*
- **Z. 519/524 (GAM-Parameterzahl, Präzisierung)**: „pK Koeffizienten" zählt
  den Achsenabschnitt β₀ aus der Formel derselben Zeile nicht mit und
  übergeht, dass die Komponenten f_i ohne Zentrierungsbedingung nur bis auf
  additive Konstanten bestimmt sind; genau sind es pK + 1 Koeffizienten
  beziehungsweise p(K−1) + 1 frei wählbare. Die Größenordnung O(pK) bleibt
  richtig. *Skript Bemerkung 15.5.9 rechnet die Buchführung vor.*
- **Z. 469 (Auswertungsaufwand, Präzisierung)**: „f̂ auswerten kostet O(K^p)"
  gilt für eine Basis ohne Trägerstruktur. Mit den B-Splines desselben
  Foliensatzes sind an einer festen Stelle je Variable höchstens q+1
  Basisfunktionen von null verschieden, pro Auswertung bleiben also nur
  (q+1)^p Summanden: für p = 10 und q = 3 sind das 4^10 = 1 048 576 statt
  10^10. Exponentiell in p ist beides. *Skript Bemerkung 15.5.7.*
- **Z. 536 (Typografie)**: „in Thomas Nagler's Vorlesungen" verwendet den
  englischen Apostroph-Genitiv; deutsch „Thomas Naglers Vorlesungen".
  *Im Skript korrekt.*

## Verwandtes (nicht Folien, aber Quellmaterial)

- **heath-ch3-App (privat)**: Die AᵀA-Kollaps-Schwelle „k ≈ 7,9" im
  Widget ist falsch — fl(1+ε²) = 1 erst ab ε ≤ 2^(−26,5) ≈ 1,05·10⁻⁸
  (k ≈ 8). *Skript-Portierung korrigiert.*
- **02-algos (Lücke)**: Der naive Rekursions-Code der Folie
  „Komplexitätsanalyse 2" fehlte im Kapitel, weil S22 nur den iterativen
  zeigt. *Review 2.5 hat ihn in §2.5 ergänzt.*
