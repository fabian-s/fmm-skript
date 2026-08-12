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

## Verwandtes (nicht Folien, aber Quellmaterial)

- **heath-ch3-App (privat)**: Die AᵀA-Kollaps-Schwelle „k ≈ 7,9" im
  Widget ist falsch — fl(1+ε²) = 1 erst ab ε ≤ 2^(−26,5) ≈ 1,05·10⁻⁸
  (k ≈ 8). *Skript-Portierung korrigiert.*
- **02-algos (Lücke)**: Der naive Rekursions-Code der Folie
  „Komplexitätsanalyse 2" fehlte im Kapitel, weil S22 nur den iterativen
  zeigt. *Review 2.5 hat ihn in §2.5 ergänzt.*
