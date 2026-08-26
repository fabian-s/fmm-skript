binomial-theorem — KEEP — Die Definition, das Differenzenquotienten-Beispiel und die n-Interaktion führen sauber zur Rolle des linearen h-Terms.

complex-numbers — KEEP — Algebraische Definition, geometrische Operationen und die direkte Manipulation bilden eine selbstständige Mini-Erklärung.
- [MINOR] skript/src/concepts/complex-numbers.mdx:22-27 — „Komplexe Eigenwerte signalisieren Drehung oder Schwingung“ ist nur eine Interpretation bestimmter dynamischer/normaler Situationen, keine allgemeine Eigenschaft beliebiger reeller Matrizen. Als typische Anwendung bzw. bei linearen Dynamiken qualifizieren.

diagonal-matrix — REVISE — Die Entkopplungsintuition ist stark, aber Aussagen über Eigenwerte und die Widget-Grenzfälle brauchen eine klare Dimensions-/Fallqualifikation.
- [MAJOR] skript/src/concepts/diagonal-matrix.mdx:17-19 — „ihre Eigenwerte sind genau die Diagonaleinträge“ gilt für quadratische Diagonalmatrizen, nicht für die später unmittelbar erwähnte rechteckige SVD-Matrix Σ. Den Geltungsbereich direkt auf den quadratischen Fall begrenzen.
- [MINOR] skript/src/concepts/widgets/DiagonalMatrixWidget.tsx:94-99 — Bei d₁ = d₂ = 0 fällt das Gitter auf den Ursprung, nicht auf „eine einzige Achse“; bei genau einem Nullfaktor gilt die Achsenaussage. Zwei Nullfaktoren als Punkt/Kollaps bezeichnen.

factorial — STATIC — Die feste Tabelle mit logarithmischer Darstellung ist für das multiplikative Wachstum die kleinste wirksame Medienform.
- [MAJOR] skript/src/concepts/factorial.mdx:20-23 — Dass das Wachstum von k! Taylor-Terme „zähmt“ und eine Reihe „zur Ruhe kommen kann“, ist ohne Bedingungen zur Ableitung bzw. zum Konvergenzradius keine allgemeine Konvergenzaussage. Als Motivation („liefert den passenden Nenner“) formulieren und Konvergenz nicht aus der Fakultät allein ableiten.
- [MINOR] skript/src/concepts/widgets/FactorialWidget.tsx:109-117 — Der Log-Plot zeigt nur k=0,…,6; „mehr als exponentielles Wachstum“ sollte als asymptotische Aussage oder als beobachtete endliche Folge gekennzeichnet werden, nicht als Schluss allein aus diesem Ausschnitt.

gradient — REVISE — Definition und Konturlinien-Widget sind tragfähig, aber notwendige und hinreichende Aussagen sowie die Richtungsbedingung sollten expliziter sein.
- [MAJOR] skript/src/concepts/gradient.mdx:21-25 — ∇φ(x)=0 ist für ein inneres, differenzierbares lokales Minimum notwendig, aber nicht hinreichend (Sattelpunkte/Maxima sind ebenfalls stationär); „jede Aufwärtsrichtung ist erloschen“ erklärt nur die Notwendigkeit. Gegenbeispiel oder „notwendig, nicht hinreichend“ ergänzen.
- [MINOR] skript/src/concepts/widgets/GradientWidget.tsx:173-188 — Die Aussage, der Gradient liefere den größtmöglichen Richtungsanstieg, gilt für Einheitsrichtungen u; der Widget-Slider verwendet zwar eine Einheitsrichtung, erklärt diese Voraussetzung aber nicht. In der Aufgabe/Legende nennen.

intermediate-value-theorem — KEEP — Vorzeichenwechsel, Stetigkeitsvoraussetzung und der Sprung-Gegenfall werden durch eine echte überprüfbare Variation verbunden.

linear-map — KEEP — Die Spaltenbilder werden direkt manipuliert und die Matrixrepräsentation wird samt Linearitätsfolgen selbstständig erklärt.

matrix-multiplication — KEEP — Regel, Zahlenbeispiel und fokussierbare Zeile-Spalte-Herkunft passen konsistent zusammen.
- [MINOR] skript/src/concepts/matrix-multiplication.mdx:16-20 — Der Linktext „lineare Abbildung“ zeigt auf `#linear-transformation`, während das Konzept hier `#linear-map` heißt; den Anker vereinheitlichen, damit die zentrale Voraussetzung erreichbar bleibt.

newtons-method — REVISE — Das Widget zeigt lokale quadratische Modelle, aber die Gradientenkonvention und die Konvergenzvoraussetzungen sind zwischen Pop-up und Skript nicht sauber abgestimmt.
- [MINOR] skript/src/concepts/newtons-method.mdx:20-25 — Die Formel schreibt ∇f(θ)^T, während das verlinkte Gradient-Pop-up ∇φ als Spaltenvektor definiert; im Kapitel wird der Gradient dagegen als Zeilenvektor verwendet (skript/src/chapters/10-differentialrechnung/S105.mdx:31-36). Eine Konvention festlegen und die Transposition entsprechend vereinheitlichen.
- [MAJOR] skript/src/concepts/newtons-method.mdx:25-28 — Newton minimiert nicht generell „direkt“ ein lokales Modell und konvergiert nicht automatisch schneller oder überhaupt; bei indefiniter/negativer Hesse-Matrix oder schlechtem Startpunkt kann es steigen oder divergieren. Voraussetzungen (lokal nahe geeignetem Minimum, reguläre positive Hesse-Matrix bzw. Dämpfung) und die Grenzen nennen.
- [MINOR] skript/src/concepts/widgets/NewtonsMethodWidget.tsx:84-87 — Das Verdikt „nahe beim Minimum schrumpft der Fehler sehr schnell“ prüft nur |x−1|<0,01 und erklärt keine quadratische Fehlerreduktion; auf die tatsächlich sichtbare lokale Konvergenz beziehen oder eine Fehlerquotienten-Anzeige ergänzen.

orthogonal-matrix — REVISE — Die 2D-Interaktion macht Längenerhaltung sichtbar, aber die allgemeine geometrische Aussage ist zu weit gefasst.
- [MAJOR] skript/src/concepts/orthogonal-matrix.mdx:18-24 — Eine lineare orthogonale Matrix ist eine starre Isometrie, die den Ursprung festhält; „starre Bewegungen“ umfasst im üblichen Sinn auch Translationen, die keine Matrixabbildungen sind. „Drehungen/Spiegelungen um den Ursprung“ schreiben.
- [MINOR] skript/src/concepts/orthogonal-matrix.mdx:41-44 — „erst die Determinante trennt Drehung und Spiegelung“ gilt für die hier gezeigten 2D-Fälle; in höheren Dimensionen klassifiziert det allein nicht jede orthogonale Bewegung. Dimension auf 2D begrenzen.

positive-definite — KEEP — Quadratische Form, Eigenwertgrenze und der verlinkte 2D/3D-Vergleich ergeben eine in sich stimmige Untersuchung über alle Richtungen.
- [MINOR] skript/src/concepts/positive-definite.mdx:17-20 — „SPD-Matrizen sind die gutartigsten linearen Gleichungssysteme überhaupt“ ist eine unbelegte Wertung und verschweigt, dass Cholesky numerisch weiterhin von Konditionierung abhängt. Als „ermöglichen effiziente/stabile Cholesky-Verfahren“ präzisieren.

real-coordinate-space — KEEP — Die Definition von ℝⁿ als geordnete Zahlenliste und die Verallgemeinerung über drei Dimensionen hinaus sind als statische Mini-Erklärung vollständig.

similar-matrices — KEEP — Definition, Koordinatenintuition, invariantes Spektrum und korrektes 2×2-Beispiel genügen ohne Widget.
- [MINOR] skript/src/concepts/similar-matrices.mdx:8-14 — Dass P „die Basiswechsel-Matrix“ ist, hängt von der Richtung der Koordinatenkonvention ab; als „eine Basiswechselmatrix (je nach Konvention P oder P⁻¹)“ qualifizieren.

subspace — REVISE — Die Beispiele und Varianten sind nützlich, aber das formale Kriterium lässt die leere Menge zu und die Handlungsanweisung ist teilweise unerfüllbar.
- [MAJOR] skript/src/concepts/subspace.mdx:9-16 — Ohne explizite Voraussetzung S ≠ ∅ erfüllt die Implikation für alle u,v∈S die leere Menge vacuously, obwohl sie kein Untervektorraum ist. S als nichtleere Teilmenge des Vektorraums voraussetzen (oder 0∈S ergänzen).
- [MINOR] skript/src/concepts/widgets/SpanWidget.tsx:105-107 — Die Aufgabe „damit w zu treffen“ ist im Modus „Gerade“ absichtlich unmöglich und im Ebenenmodus trivial; die jeweilige Vorhersagefrage (unerreichbar vs. erreichbar) vor dem Ziehen explizit machen, damit kein reines Treffer-Spiel entsteht.

transpose — KEEP — Definition, Matrixbeispiel, Vektorkonvention und Involution sind kurz und vollständig; eine Visualisierung ist nicht nötig.
