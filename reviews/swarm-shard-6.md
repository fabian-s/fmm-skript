cauchy-schwarz-inequality — KEEP — Definition, near-sharp numerical example, and angle manipulation explain both inequality and equality case self-sufficiently.

convergence — KEEP — The tolerance-band widget gives a direct, correctly indexed demonstration of the “eventually all” quantifier.
- [MINOR] skript/src/concepts/widgets/ConvergenceWidget.tsx:49-50 — Die aria-Beschreibung nennt die Toleranz ε als „Breite“ des Bands, obwohl das Band von 1−ε bis 1+ε und damit Breite 2ε reicht. „Halbbreite/Toleranz ε“ schreiben.

dimension — REVISE — Die Grundintuition stimmt, aber die Aussage über Funktionenräume ist als allgemeine Behauptung zu breit.
- [MAJOR] skript/src/concepts/dimension.mdx:21-25 — Nicht jeder Funktionenraum braucht unendlich viele unabhängige Richtungen; etwa Polynome bis zu festem Grad sind endlichdimensional. Auf „viele natürliche Funktionenräume (z. B. alle Polynome)“ qualifizieren und klarstellen, dass Matrizen endlichdimensionale Koordinatendarstellungen betreffen.

function-composition — KEEP — Zwischenwert, Reihenfolge und Definitionsbereich werden durch zwei nebeneinanderliegende Funktionsbilder anschaulich verknüpft.

hookes-law — KEEP — Das Feder-/Materialbeispiel erklärt Proportionalität samt Einheitenbedeutung und nennt den elastischen Gültigkeitsbereich.

likelihood — KEEP — Fixierte Daten, Parameterfunktion, Münzbeispiel und Vorhersageaufgabe bilden eine stimmige Einführung in die Likelihood.

linear-transformation — REVISE — Das direkte Spalten-Dragging ist wertvoll, aber die Widget-Kernaussage macht aus vier Presets eine falsche Vollständigkeitsbehauptung.
- [MAJOR] skript/src/concepts/widgets/LinearTransformationWidget.tsx:4-8 — „mehr Formen als diese vier Grundtypen gibt es in der Ebene nicht“ ist falsch: Es gibt unendlich viele lineare 2D-Abbildungen, und die vier Buttons sind nur repräsentative Beispiele. „Vier typische Beispiele“ schreiben und die gemeinsame Eigenschaft als eigentliche Einsicht markieren.
- [MINOR] skript/src/concepts/linear-transformation.mdx:16-20 — „keine Wechselwirkungen“ kann bei einer allgemeinen Matrix die Kopplung der Koordinaten missverständlich leugnen (Scherung mischt Koordinaten). Stattdessen sagen, dass Summe und Skalierung linear behandelt werden.

matrix-vector-product — KEEP — Zeilen- und Spaltensicht werden mit einem korrekt berechneten Beispiel und kontrollierbaren Gewichten zusammengeführt.

normal-equations — KEEP — Herleitung, orthogonale Projektion, Konditionswarnung und Ein-Spalten-Widget bilden einen fachlich korrekten Mini-Bogen.

outer-product — KEEP — Das Matrixbeispiel und die Eingabefelder machen die Rang-1-Struktur direkt überprüfbar; der Nullfall ist ausdrücklich behandelt.

pseudoinverse — REVISE — Die Kernformeln und der Rang-defiziente Beispielblick sind richtig, aber die „Inverse dort, wo es geht“-Metapher verschweigt die konkrete Lösungsrolle.
- [MINOR] skript/src/concepts/pseudoinverse.mdx:3-8 — „kehrt A dort um, wo das geht, und ignoriert den Rest“ ist für eine Pseudoinverse zu vage und kann eine echte Teilinverse suggerieren. Kurz als Moore-Penrose-Objekt mit Least-Squares-/Minimalnorm-Eigenschaft motivieren, bevor die SVD-Formel folgt.

rounding-error — REVISE — Die Auslöschungsdemonstration ist überzeugend, aber die einleitende Rundungsfehlerschranke wird als uneingeschränktes Gesetz dargestellt.
- [MAJOR] skript/src/concepts/rounding-error.mdx:5-16 — Die relative Schranke ungefähr εmach gilt im üblichen Floating-Point-Modell nur unter Voraussetzungen (normalisierte Zahlen, keine Über-/Unterläufe und korrekt gerundete Grundoperation); bei exakt null ist der relative Fehler zudem nicht definiert. Voraussetzungen und absolute Fehler-/Sonderfälle ergänzen.
- [MINOR] skript/src/concepts/widgets/RoundingErrorWidget.tsx:42-46 — „korrekte signifikante Stellen“ wird als −log₁₀(relative error) mit Dezimalwerten gleichgesetzt, ist aber keine formale Zählung signifikanter Stellen und kann nicht-ganzzahlig sein. Als logarithmisches Genauigkeitsmaß beschriften oder die Rundungsdefinition explizit machen.

slope — KEEP — Die Steigungsdefinition, gerichtete Einheitsschritt-Visualisierung und Sekante-Tangente-Brücke sind kurz und selbstständig.

symmetric-matrix — REVISE — Die 2D-Suchaufgabe funktioniert für die konkrete Matrixfamilie, während der allgemeine Text den Vielfachheitsfall auslässt.
- [MAJOR] skript/src/concepts/symmetric-matrix.mdx:21-27 — Bei mehrfachen Eigenwerten sind nicht beliebige Eigenvektoren paarweise orthogonal; nur eine orthonormale Eigenbasis lässt sich wählen. „lassen sich orthonormal wählen“ schreiben und die Schlussfolgerung „reine Streckung entlang Achsen“ entsprechend auf diese Basis beziehen.
- [MINOR] skript/src/concepts/symmetric-matrix.mdx:34-36 — „Es sind stets zwei Richtungen“ gilt für die gezeigte 2×2-Familie mit zwei verschiedenen Eigenwerten, nicht für jede symmetrische 2×2-Matrix (bei einem Vielfachen der Einheitsmatrix sind alle Richtungen Eigenrichtungen). Auf die konkrete Familie oder „mindestens eine orthonormale Eigenbasis“ einschränken.

triangular-solve — REVISE — Der Schritt-für-Schritt-Rückwärtslauf ist verständlich, aber die Existenz-/Pivotvoraussetzung des Lösens fehlt.
- [MINOR] skript/src/concepts/triangular-solve.mdx:5-15 — „lässt sich direkt lösen“ setzt bei einem eindeutigen Rück-/Vorwärtseinsetzen von nichtverschwindenden Diagonaleinträgen voraus; bei einem Nullpivot kann das System unlösbar oder nicht eindeutig sein. Diese Bedingung kurz ergänzen.
- [MINOR] skript/src/concepts/widgets/TriangularSolveWidget.tsx:68-76 — Das Verdikt stellt „keine Zeile musste umgeformt werden“ und die 9 Operationen als allgemeine Lösungspointe dar, obwohl nur das fest codierte reguläre 3×3-Beispiel gezeigt wird. Auf „für dieses Beispiel“ begrenzen und die Diagonalbedingung nennen.
