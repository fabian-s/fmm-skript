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

## 07-kq

- **Z. 372 („Beispiel: QR-Zerlegung (2)")**: Die gezeigte Matrix A ist
  ein Tippfehler; die gerechneten Werte gehören zu A = (1 2; 0 0; 0 2)
  von der Vorfolie. *Skript §7.4 nutzt durchgehend die korrekte Matrix.*

## Verwandtes (nicht Folien, aber Quellmaterial)

- **heath-ch3-App (privat)**: Die AᵀA-Kollaps-Schwelle „k ≈ 7,9" im
  Widget ist falsch — fl(1+ε²) = 1 erst ab ε ≤ 2^(−26,5) ≈ 1,05·10⁻⁸
  (k ≈ 8). *Skript-Portierung korrigiert.*
- **02-algos (Lücke)**: Der naive Rekursions-Code der Folie
  „Komplexitätsanalyse 2" fehlte im Kapitel, weil S22 nur den iterativen
  zeigt. *Review 2.5 hat ihn in §2.5 ergänzt.*
