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

- **Z. 232–233 (LU-Zerlegung)**: U = L_n⋯L_1·A und
  L = L_1⁻¹⋯L_n⁻¹ — es gibt aber nur n−1 nichttriviale
  Eliminationsschritte (L_n wäre I); sauber wäre L_{n−1}.
  *Wird im laufenden Kapitel-5-Lauf korrigiert.*
- **Z. 288–298 (Theorem „LU-Zerlegung")**: „Jede invertierbare Matrix A
  hat eine Darstellung A = LU" ist FALSCH — Gegenbeispiel
  (0 1; 1 0): Pivot 0, keine LU-Zerlegung ohne Zeilentausch. Korrekt:
  PA = LU existiert für jede invertierbare Matrix (Pivotierung); A = LU
  ohne P genau dann, wenn die Elimination ohne Nullpivot durchläuft
  (führende Hauptminoren ≠ 0). *Wird im laufenden Kapitel-5-Lauf als
  korrekter Satz formuliert.*
- **Z. 410–416 (SPD-Definition)**: Doppelte Mengenklammern
  „x ∈ {ℝⁿ \ {0}}"; in der Semidefinit-Zeile ist der Ausschluss von 0
  zudem unnötig (für ≥ 0 unerheblich). *Skript schreibt
  x ∈ ℝⁿ, x ≠ 0.*
- **Z. 462–463 (Cholesky-Induktionsbeweis)**: Tippfehler \bc\top statt
  \bc^\top (fehlendes Dach) im Testvektor; außerdem fehlt der Quantor
  „für x ≠ 0" an der strikten Ungleichung. *Wird im laufenden
  Kapitel-5-Lauf korrigiert.*

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
