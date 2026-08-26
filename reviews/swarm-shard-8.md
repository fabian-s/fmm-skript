change-of-basis — REVISE — Der Basiswechsel und die Ähnlichkeitstransformation sind klar, aber die behauptete Längeninvarianz gilt nur für orthonormale Basiswechsel.
- [MAJOR] skript/src/concepts/change-of-basis.mdx:17-22,27-28 — Unter einem beliebigen Basiswechsel bleibt der geometrische Vektor derselbe, aber die euklidische Norm seiner Koordinaten nicht; die Aussage „jede Größe ... etwa Determinante und Spur“ ist korrekt, „Länge“ jedoch nur bei orthogonalen $S$. Schränke die Schlussaussage auf die im Widget verwendeten gedrehten Orthonormalbasen ein oder erkläre die Unterscheidung zwischen geometrischer Länge und Koordinatennorm.

covariance-matrix — KEEP — Definition, positive Semidefinitheit und die 2D-Punktwolke verbinden statistische und geometrische Rollen überzeugend.
- [NOTE] skript/src/concepts/covariance-matrix.mdx:28-35 — Cholesky-Faktorisierung und das Ziehen von $Lz$ für singuläre Kovarianzmatrizen benötigen ggf. eine semidefinite Variante (nicht jede Standard-Cholesky-Routine akzeptiert Rangdefizienz); ergänze diesen praktischen Vorbehalt.

dot-product — KEEP — Algebraische Definition, Winkelinterpretation und Schatten-Interaktion sind selbstständig und konsistent.
- [NOTE] skript/src/concepts/dot-product.mdx:20-24 — Die Winkelgleichung setzt $x,y\ne0$ voraus; ergänze den Nichtnull-Vorbehalt, da der Widget-Regler zwar $y\ge0,3$ erzwingt, die Definition allgemein formuliert ist.

gaussian-elimination — KEEP — Eliminationsidee, Pivotisierung und der Kontrast zu orthogonalen Transformationen bilden eine tragfähige Erklärung.
- [NOTE] skript/src/concepts/gaussian-elimination.mdx:16-19 — „durch ein sicher großes Pivotelement“ ist als numerische Leitidee verständlich, aber Pivotisierung garantiert nicht generell ein großes absolutes Pivot ohne Skalierungs-/Wachstumsbetrachtung; formuliere vorsichtiger als „vermeidet sehr kleine Pivots, soweit möglich“.

identity-matrix — KEEP — Die Definition und die Analogie zur Zahl 1 sind knapp und korrekt.
- [NOTE] skript/src/concepts/identity-matrix.mdx:7-9 — Das Beispiel ist auf $3\times3$ festgelegt, während die nachfolgenden Aussagen allgemeine quadratische Dimensionen meinen; kennzeichne es explizit als Beispiel und ergänze ggf. $I_n$.

linear-combination — KEEP — Rezeptmetapher, konkretes Rechenbeispiel und die Verbindung zu $A x=b$ tragen die Kernidee.
- [NOTE] skript/src/concepts/linear-combination.mdx:28-30 — Eindeutige Gewichte für jedes Ziel gelten nur, wenn die beiden Vektoren eine Basis des betrachteten $\R^2$ bilden (insbesondere unabhängig); „in verschiedene Richtungen“ sollte als linear unabhängig/präziser formuliert werden.

low-rank-approximation — REVISE — Die SVD-Rangtrunkierung ist gut motiviert, aber Rang- und Fehleraussagen fehlen an den Randfällen die nötigen Einschränkungen.
- [MAJOR] skript/src/concepts/low-rank-approximation.mdx:7-19 — $\operatorname{rang}(A_k)=k$ und der Ausdruck $\sigma_{k+1}$ setzen $0\le k<r$ (bzw. die Konvention $\sigma_{r+1}=0$) voraus; ergänze diese Bedingung und schreibe bei $k>r$ die Trunkierung mit $\min(k,r)$.
- [MINOR] skript/src/concepts/low-rank-approximation.mdx:20-22 — Die Speicherschätzung $k(m+n+1)$ setzt die Speicherung der beiden Faktorbasen und Singulärwerte ohne zusätzliche Struktur voraus; kennzeichne sie als grobe dichte-Faktoren-Schätzung.

mean-value-theorem — REVISE — Satz, Fahrtintuition und Widget stimmen im regulären Intervallfall überein, doch das Schlussverdikt überdehnt die Endpunktwahl.
- [MINOR] skript/src/concepts/mean-value-theorem.mdx:35-36 — „Zu jeder Wahl von $a$ und $b$“ ist ohne $a<b$ bzw. $a\ne b$ falsch/undefiniert, da der Differenzenquotient bei $a=b$ nicht definiert ist. Nenne ausdrücklich $a<b$ (wie in den Voraussetzungen des Satzes).

objective-function — REVISE — Die Parameterkopplung ist anschaulich, aber die im Text definierte Verlustfunktion stimmt numerisch nicht mit dem Widget überein.
- [MAJOR] skript/src/concepts/objective-function.mdx:18-23 — Der Text definiert die Summe der quadrierten Fehler, während `ObjectiveWidget` in `skript/src/concepts/widgets/ObjectiveFunctionWidget.tsx:16-19` durch `d.length` teilt und damit die MSE darstellt. Die Minimierer sind gleich, die angezeigten Verlustwerte aber nicht; vereinheitliche die Definition oder benenne im Text ausdrücklich die Normierung.

partial-derivative — KEEP — Einfrieren einer Variable, Rechenbeispiel und Schnittkurven-Widget vermitteln die lokale Bedeutung gut.
- [NOTE] skript/src/concepts/partial-derivative.mdx:25-34 — Die Tangenteninterpretation ist auf differenzierbare Funktionen am betrachteten Punkt beschränkt; ergänze diese Voraussetzung knapp, bevor die Tangente als allgemeine Beschreibung verwendet wird.

quadratic-form — REVISE — Matrix-Sandwich und Richtungsvisualisierung sind nützlich, aber die im Text angegebene Gradientenorientierung ist nicht konsistent.
- [MAJOR] skript/src/concepts/quadratic-form.mdx:25-29 — Für einen als Spaltenvektor notierten Gradienten ist $\nabla_x(x^T Bx)=(B+B^T)x$ eine Spalte; der Text schreibt $x^T(B+B^T)$ als Gradient, also einen Zeilenvektor. Entscheide eine Konvention und passe Formel sowie verlinkte Gradient-Notation daran an.

secant-line — KEEP — Definition, Differenzenquotient und das Annähern an die Tangente werden durch den Regler direkt erfahrbar.
- [NOTE] skript/src/concepts/secant-line.mdx:7-19 — Die Formel setzt $h\ne0$ voraus; nenne dies kurz, weil das Widget bewusst bei $h=0,05$ stoppt und den Grenzübergang nur als Annäherung zeigt.

span — KEEP — Die Mengendefinition, Ursprungs-/Ebenenintuition und der Unterraum-Gegenfall werden sinnvoll visualisiert.
- [NOTE] skript/src/concepts/span.mdx:23-30 — Die Aussage „zwei unabhängige Vektoren eine Ebene“ gilt im jeweiligen Umgebungsraum als zweidimensionaler Unterraum; ergänze „zweidimensionale Ebene durch den Ursprung“, um eine affine Ebene nicht zu suggerieren.

taylor-series — REVISE — Lokale Taylor-Näherung, konkretes Sinusbeispiel und der Gradregler sind überzeugend, aber das Schlussverdikt macht eine nicht allgemeine Behauptung.
- [MAJOR] skript/src/concepts/taylor-series.mdx:41-42 — „Jeder Term verbreitert das Fenster guter Übereinstimmung“ gilt nicht monoton für beliebige Funktionen, Entwicklungszentren oder Fehlerschwellen; selbst bei Taylorpolynomen kann ein höherer Grad außerhalb des lokalen Bereichs schlechter sein. Schränke die Aussage auf das gezeigte $\sin$-Beispiel und die gewählte Schwelle ein.
- [MINOR] skript/src/concepts/taylor-series.mdx:7-14 — Die Existenz der Ableitungen bis Ordnung $n$ reicht für ein Taylorpolynom, aber nicht automatisch für eine gute Näherung über einen „breiteren Bereich“; kennzeichne diese Reichweite als empirische Beobachtung im Beispiel.

variance — REVISE — Definition, Verschiebungssatz und Münzwurfbeispiel sind korrekt, aber die Momentvoraussetzung fehlt.
- [MAJOR] skript/src/concepts/variance.mdx:9-17 — Die Gleichheit $\operatorname{Var}(X)=E[X^2]-(E[X])^2$ und die Jensen-Aussage setzen insbesondere einen endlichen zweiten Moment voraus. Ergänze $E[X^2]<\infty$ (oder beschränke den Abschnitt auf Zufallsvariablen mit endlichem zweiten Moment).
