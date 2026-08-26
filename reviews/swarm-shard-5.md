cancellation — KEEP — Die Erklärung trennt korrekt die Verstärkung bereits vorhandener Eingabefehler von der Subtraktion naher Gleitkommazahlen selbst.
- [NOTE] skript/src/concepts/cancellation.mdx:9-14 — „Die Subtraktion selbst ist exakt“ ist für hinreichend nahe Gleitkommazahlen durch das Sterbenz-Lemma gerechtfertigt; ein kurzer Zusatz „für die hier betrachteten nahen Maschinenzahlen“ würde verhindern, dass der Satz als uneingeschränkte Behauptung über jede Gleitkomma-Subtraktion gelesen wird.

continuity — REVISE — Definition und Sprung-Visualisierung sind tragfähig, aber der Schluss macht aus einer hilfreichen Voraussetzung eine falsche Notwendigkeit.
- [MAJOR] skript/src/concepts/continuity.mdx:28-34,40-41 — Interpolation setzt Stetigkeit nicht allgemein voraus (durch endlich viele Daten kann man auch unstetige Funktionen interpolieren); Stetigkeit begründet lediglich, warum Werte zwischen Stützstellen plausibel eingeschränkt sind. Ersetze „voraussetzt“ durch „bei stetigen Ziel-/Interpolanten besonders sinnvoll ist“.

differential-equation — KEEP — Die kurze Definition, das Wachstumsbeispiel und die Diskretisierung erklären den Begriff ohne unnötige Formalismen.
- [NOTE] skript/src/concepts/differential-equation.mdx:1-26 — `rg` findet im Skript derzeit keine tatsächliche Verwendung des Konzeptlinks; falls das Pop-up nicht bewusst vorgehalten wird, verlinke es an der ersten Erwähnung oder entferne das ungenutzte Konzeptmodul.

floating-point — KEEP — Darstellung, Binadenintuition und Rundungsbeispiel bilden mit dem Zahlstrahl eine stimmige Mini-Erklärung.
- [NOTE] skript/src/concepts/floating-point.mdx:21-27 — Bei „übliche doppelte Genauigkeit hat $t=52$“ sollte klargestellt werden, dass 52 gespeicherte Nachkommabits plus das implizite führende Bit gemeint sind; so wird die Konvention zur Formel mit $1.b_1\ldots b_t$ eindeutig.

hessian-matrix — REVISE — Die quadratische Testtafel ist anschaulich, aber der semidefinite Fall wird als allgemeine Unentscheidbarkeit und zugleich als konkrete Rinne vermischt.
- [MAJOR] skript/src/concepts/hessian-matrix.mdx:29-35 — Für eine beliebige Funktion sagt eine semidefinite Hesse-Matrix am kritischen Punkt tatsächlich nicht notwendig „nichts“ (sie kann zusammen mit höheren Termen ein Minimum bestimmen), während sie für das Widget-Modell $q=ax^2+by^2$ die Rinne korrekt festlegt. Trenne ausdrücklich den allgemeinen Test (inconclusive) vom speziellen quadratischen Beispiel.
- [MINOR] skript/src/concepts/hessian-matrix.mdx:14-17 — „für glattes $\phi$ automatisch symmetrisch“ benötigt die hinreichende Regularität der gemischten zweiten Ableitungen (z. B. $C^2$); nenne diese Voraussetzung knapp.

level-sets — REVISE — Definition und Gradient-Tangente-Experiment sind gut, aber die Dimension und Regularitätsbedingungen werden zu pauschal formuliert.
- [MAJOR] skript/src/concepts/level-sets.mdx:20-25 — Eine reguläre Niveaumenge in $\R^n$ ist im Allgemeinen eine $(n-1)$-dimensionale Hyperfläche, nicht pauschal eine „Fläche“; bei kritischen Werten kann sie außerdem singulär oder von anderer Dimension sein. Formuliere die Aussage mit „typischerweise/regulär“.
- [MINOR] skript/src/concepts/level-sets.mdx:27-34 — Die Aussage „Gradient steht senkrecht“ gilt nur bei $\nabla f(\bx)\ne0$ an regulären Punkten; ergänze diese Bedingung schon hier, nicht erst im Verdikt nach dem Widget.

linear-system — REVISE — Das Geradenbild deckt die drei Fälle ab, aber die numerische Toleranz kann noch eindeutige Systeme als parallel ausgeben.
- [MAJOR] skript/src/concepts/widgets/LinearSystemWidget.tsx:20-22,47-55 — `parallel = |2b−3a|<0.03` klassifiziert auch nichtparallele Geraden mit kleinem, aber von null verschiedenem Determinanten als „parallel“ und behauptet dann keine Lösung; `same` hat denselben Toleranzfehler. Verwende für die didaktische Spielzeugdarstellung diskrete/exakte Fälle oder kennzeichne den Zwischenbereich als „nahezu parallel“ mit weiterhin eindeutigem Schnitt.
- [MINOR] skript/src/concepts/linear-system.mdx:25-29 — Die Determinantenentscheidung setzt eine quadratische Koeffizientenmatrix voraus; ergänze „im quadratischen $2\times2$-Fall“ bzw. verweise bei rechteckigen Systemen auf Rangbedingungen.

matrix-product — KEEP — Rechenregel, Kompositionsrichtung und Nichtkommutativität werden durch ein echtes Schritt-für-Schritt-Widget sinnvoll verbunden.
- [NOTE] skript/src/concepts/widgets/MatrixProductWidget.tsx:131-147 — Die Gleichheitsprüfung bezieht sich auf den einzelnen Testvektor $x=(1,1)$; wenn für diesen zufällig gleiche Bilder entstehen, ist das nicht gleichbedeutend mit $AB=BA$. Ergänze im Verdikt, dass die Interaktion die Matrizen mit diesem Testvektor vergleicht, oder prüfe zusätzlich einen Matrixeintrag.

norm — REVISE — Die Normdefinitionen und die Einheitskugel-Interaktion sind verständlich, aber die PageRank-Normalisierung wird als eindeutig verkauft.
- [MINOR] skript/src/concepts/norm.mdx:17-19 — Normieren auf Länge 1 legt einen Vektor nur bis auf Vorzeichen (bzw. allgemein Skalierungsrichtung) fest; beim PageRank kommt die Nichtnegativität/Normierung zusätzlich hinzu. Ergänze diese Bedingung, bevor von einem eindeutigen Repräsentanten gesprochen wird.

orthonormal-basis — KEEP — Definition, Koordinatenformel und Projektion werden durch die ziehbare Basis direkt überprüfbar gemacht.
- [NOTE] skript/src/concepts/orthonormal-basis.mdx:18-27 — Die Aussage „Koeffizient ... schlicht $q_i^T w$“ setzt voraus, dass $w$ im Spann der Basis liegt (bei einer Basis des gesamten Raums automatisch); ergänze den Geltungsbereich für eine Orthonormalbasis eines Unterraums.

projection — KEEP — Idempotenz, Lotfuß und die konkrete Einheitsrichtungsformel sind konsistent mit dem Widget.
- [NOTE] skript/src/concepts/projection.mdx:13-20 — Die Formel $P=bb^T$ gilt nur für den Einheitsvektor $b$, was zwar im Satz genannt wird; wiederhole „$\|b\|=1$“ direkt an der Formel, damit sie nicht als allgemeine Geradenprojektion missverstanden wird.

rotation-matrix — REVISE — Die Drehmatrix wird korrekt eingeführt, aber das Schlussargument unterschlägt die Orientierungswahl der zweiten Spalte.
- [MAJOR] skript/src/concepts/rotation-matrix.mdx:34-36 — Zu einem festgelegten Einheitsvektor $Qe_1$ gibt es zwei senkrechte Einheitsvektoren für $Qe_2$; erst die Forderung „Drehung“ bzw. $\det Q=+1$ wählt die in der Formel stehende Variante aus. Ergänze diese Bedingung, statt zu behaupten, $Qe_2$ sei ohne Weiteres festgelegt.

singular-value-decomposition — REVISE — Die Drehen–Strecken–Drehen-Erklärung ist stark, aber die rechteckige Diagonalformel und die Rangschwelle des Widgets sind problematisch.
- [MAJOR] skript/src/concepts/singular-value-decomposition.mdx:7-14 — Für rechteckiges $\Sigma\in\R^{m\times n}$ ist `diag(σ₁,…,σ_min)` wörtlich eine quadratische Matrix und nicht die angegebene rechteckige Matrix. Schreibe explizit „rechteckige Diagonalmatrix mit diesen Einträgen auf der Hauptdiagonalen und Nullen sonst“.
- [MAJOR] skript/src/concepts/widgets/SingularValueDecompositionWidget.tsx:109,153-177 — `rangverlust = s2 < 0.05` führt bei $0<s_2<0.05$ zum Verdikt „Rang 1“, $\det A=0$ und unendlicher Konditionszahl, obwohl die Matrix noch Rang 2 und endliche Konditionszahl besitzt. Trenne exakten Rangverlust ($s_2=0$) von „nahezu singulär“ und gib im Zwischenbereich die endliche Verstärkung aus.

supremum — REVISE — Supremum/Maximum werden klar unterschieden, aber die Existenzbehauptung ist für allgemeine Wertemengen zu weit.
- [MAJOR] skript/src/concepts/supremum.mdx:23-37 — Ein Supremum ist nicht für „jeden Fall“ eine wohldefinierte reelle Zahl oder $+\infty$: leere Mengen haben je nach Konvention Supremum $-\infty$/sind ausgeschlossen, und die relevante Voraussetzung ist eine nichtleere, nach oben beschränkte Menge. Schränke die Aussage entsprechend ein.
- [MINOR] skript/src/concepts/supremum.mdx:39-43 — Die Leitfrage nennt 0,99, während das Widget zusätzlich ein konkretes $f(x)=x/(1+x)$ einführt; nenne diese Funktion vor der Interaktion, damit klar ist, welche obere Schranke untersucht wird.

triangular-matrix — KEEP — Die statische Gegenüberstellung ist die kleinste passende Medienform und erklärt die entgegengesetzten Einsetzrichtungen.
- [NOTE] skript/src/concepts/triangular-matrix.mdx:15-29 — Die Aussage über „fast schon gelöst“ setzt Nichtnullen auf der Diagonale für eindeutige Rückwärtseinsetzung voraus; ergänze diese Bedingung oder erwähne, dass bei einer Nulldiagonale Sonderfälle entstehen.
