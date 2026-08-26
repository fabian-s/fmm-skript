binomial-coefficient — KEEP — Eigenständige Definition, korrektes Zählbeispiel und Pascal-Dreieck greifen sinnvoll ineinander.
- [NOTE] skript/src/concepts/binomial-coefficient.mdx:7-12 — Die Voraussetzungen $n\in\mathbb N$ und $0\le i\le n$ werden nicht genannt; ergänze sie kurz, damit Formel und Widget-Randfälle formal eingeordnet sind.

closed-bounded-set — KEEP — Die beiden Bedingungen, der Existenzsatz und der Endpunktvergleich sind fachlich und didaktisch tragfähig.
- [NOTE] skript/src/concepts/closed-bounded-set.mdx:21-28 — Die Formulierung „stirbt die Garantie“ kann präzisieren, dass jeweils nur diese konkrete Existenzgarantie ohne die Bedingung verloren geht (nicht jede stetige Funktion hat dann kein Minimum).

determinant — REVISE — Die Erklärung ist gut aufgebaut, aber der interaktive Singularitätsverdikt ist bei nahezu kollabierten, noch invertierbaren Matrizen falsch.
- [MAJOR] skript/src/concepts/widgets/DeterminantWidget.tsx:47-48,226-230 — `singulaer` wird bereits bei `|det| < 0.05` gesetzt, der Verdikt behauptet dann jedoch `det A = 0`, Rangverlust und fehlende Inverse. Verwende eine exakte/kleine numerische Sonderbehandlung mit „nahe an singulär“ oder verhindere den Zwischenbereich; nur bei det = 0 darf der Kollaps als Nichtinvertierbarkeit ausgegeben werden.

expected-value — REVISE — Die Erwartungswertdefinition ist korrekt, aber die zentrale Wette des Widgets ist ohne ihre Auszahlungen nicht selbstständig nachvollziehbar.
- [MAJOR] skript/src/concepts/widgets/ExpectedValueWidget.tsx:14,18-30,41-49 — Das Widget verwendet kommentarlos $E[X]=12p-2$ und beschriftet nur Gewinnwahrscheinlichkeit und Erwartungswert; die möglichen Ausgänge und damit die Herleitung der Schwelle $p=1/6$ fehlen. Definiere das beabsichtigte Wetten-Szenario sichtbar; falls +10 € bei Gewinn und −2 € sonst gemeint sind, lautet die Zerlegung $E[X]=10p-2(1-p)=12p-2$.
- [MINOR] skript/src/concepts/expected-value.mdx:32 — Der Nachsatz sagt nur, das Widget mache „gewichtete Ausgänge“ sichtbar, obwohl keine Ausgänge dargestellt werden; fasse die konkrete Schwellen-Einsicht zusammen oder passe die Visualisierung an.

gradient-descent — REVISE — Das 1D-Beispiel und die Pfadvisualisierung tragen, aber die Updateformel hat eine Dimensionsinkonsistenz und die Fallklassen werden nicht vollständig erklärt.
- [MAJOR] skript/src/concepts/gradient-descent.mdx:18-20 — Bei einem als Parametervektor geschriebenen Spaltenvektor ist `∇_θ L` bereits ein Spaltenvektor; die zusätzliche Transposition macht die rechte Seite zu einem Zeilenvektor. Entferne das `^\top` (oder definiere den Gradienten ausdrücklich als Zeilenvektor) und halte die Konvention mit dem restlichen Skript konsistent.
- [MINOR] skript/src/concepts/widgets/GradientDescentWidget.tsx:22-27 — Der Header verspricht den Fall „oszilliert“, das Verdikt unterscheidet aber nur schrumpfende, nicht kleiner werdende und wachsende Beträge. Benenne bei $1-2\gamma<0$ explizit das Vorzeichenwechseln/Oszillieren und erkläre die Grenze $\gamma=1$ für dieses konkrete $L(\theta)=\theta^2$.

inner-product-functions — REVISE — Das Integralbeispiel ist anschaulich, aber die Mini-Erklärung überdehnt die Positivitäts- und Orthogonalitätsaussagen.
- [MAJOR] skript/src/concepts/inner-product-functions.mdx:18-22 — $w\ge0$ allein garantiert kein Skalarprodukt: Für positive Definitheit muss die Gewichtsfunktion hinreichend überall positiv sein (z. B. $w>0$ fast überall, mit passenden Integrabilitätsannahmen). Ergänze diese Voraussetzung.
- [MAJOR] skript/src/concepts/inner-product-functions.mdx:32-34 — „Nur bei $p=q$ kann sich nichts aufheben“ ist außerhalb der drei kuratierten Widget-Polynome als allgemeine Aussage falsch; auch verschiedene Funktionen können ein überall nichtnegatives Produkt haben. Ersetze es durch die korrekte Aussage $\langle p,p\rangle=\int p^2w\ge0$ und erläutere, wann Gleichheit nur für die Nullfunktion gilt.

linear-least-squares — REVISE — Das konkrete Drei-Punkte-Beispiel stimmt, doch daraus wird fälschlich eine allgemeine Eindeutigkeitsgarantie abgeleitet.
- [MAJOR] skript/src/concepts/linear-least-squares.mdx:36-42,48-50 — Eine glatte konvexe Quadratschüssel besitzt bei rangdefizientem $A$ nicht notwendig einen eindeutigen Minimierer; $m>n$ reicht nicht für vollen Spaltenrang. Ergänze die Rangvoraussetzung (oder formuliere „ein Minimierer“, mit Pseudoinverse bei fehlendem Rang) und schränke „eindeutiges Minimum“ auf das konkrete Beispiel/vollen Spaltenrang ein.

matrix-inverse — KEEP — Definition, Probe und die reversible/nicht reversible Geometrie bilden eine verständliche Mini-Erklärung mit sinnvoller Interaktion.
- [NOTE] skript/src/concepts/matrix-inverse.mdx:34-38 — Der Schluss könnte die konkrete numerische Beobachtung (Konditionszahl bzw. Fehlerverstärkung) aus dem Widget explizit mit der Aussage „immer stärker“ verbinden; fachlich ist die Erklärung ansonsten tragfähig.

neural-network — KEEP — Die Schichtgleichung definiert die Rollen von Gewicht, Bias und Aktivierung; das statische Schema unterstützt genau diese Struktur.
- [NOTE] skript/src/concepts/neural-network.mdx:5-24 — Für die Mini-Erklärung wäre ein kurzer Hinweis hilfreich, dass die Größen der Vektoren/Matrix jeweils zur benachbarten Schicht passen; aktuell bleibt die Dimensionsrolle von $A_{k-1}$ implizit.

orthogonal-complement — REVISE — Definition, Zerlegung und Projektion sind stark, aber das Schlussverdikt behauptet eine nicht definierte Winkelinvarianz in Randfällen.
- [MAJOR] skript/src/concepts/orthogonal-complement.mdx:39-41 — Wenn $p=0$ oder $r=0$ (beide Fälle werden im Widget erreichbar und ausdrücklich behandelt), ist der Winkel zwischen den Vektoren nicht definiert; außerdem ist er nicht „was auch immer mit $b$“ stets derselbe, sondern für nichttriviale Komponenten 90°. Formuliere dies mit den Randfällen korrekt.
- [MINOR] skript/src/concepts/widgets/OrthogonalComplementWidget.tsx:226-232 — Das Widget erklärt die Nullvektor-Randfälle zwar, verwendet aber im allgemeinen Verdikt weiter „echter rechter Winkel“ ohne den Übergang zur degenerierten Darstellung zu benennen; ergänze eine kurze zugängliche Kennzeichnung, wenn ein Anteil null ist.

polynomial — KEEP — Definition, Gradbeispiel und die Koeffizienten-Interaktion vermitteln die Kernidee knapp und korrekt.
- [NOTE] skript/src/concepts/polynomial.mdx:7-18 — Die Domäne von $x$ und die Konvention für das Nullpolynom (dessen Grad nicht definiert ist) könnten knapp ergänzt werden; das Widget behandelt den Nullfall bereits separat.

rate-of-convergence — REVISE — Die lineare/quadratische Gegenüberstellung ist nützlich, aber Voraussetzungen und die sichtbare Reichweite des Widgets passen nicht zusammen.
- [MAJOR] skript/src/concepts/rate-of-convergence.mdx:28-34 — Die Aussagen zur Potenziteration und besonders zur kubischen Rayleigh-Quotienten-Iteration sind ohne Voraussetzungen über Eigenwertabstände, Startvektor und (typischerweise) Symmetrie/Hermiteschheit überbreit. Nenne den Gültigkeitsbereich oder verlinke eine präzise Version.
- [MAJOR] skript/src/concepts/widgets/RateOfConvergenceWidget.tsx:47-64 — Die Grafik zeigt nur Iterationen $k=0,\ldots,8$, während der Verdikt je nach $C$ bis zu 328 Schritte bis zum Boden behauptet; der zentrale Übergang ist damit für viele Reglerwerte außerhalb des Bildes. Erweitere die x-Skala dynamisch oder stelle die Zielschritte zusätzlich als sichtbare Tabelle/Markierung dar.
- [MINOR] skript/src/concepts/rate-of-convergence.mdx:18-26 — „konstante Anzahl neuer korrekter Stellen“ und „verdoppelt sich“ gelten asymptotisch und unter geeignetem Fehler-/Rundungsmodell; kennzeichne die Aussagen als Näherungsintuition statt als universelle Regel.

sherman-morrison-formula — KEEP — Formel, Nennerbedingung, Kostenvergleich und konkrete Probe sind als statische Erklärung ausreichend.
- [NOTE] skript/src/concepts/sherman-morrison-formula.mdx:9-27 — Ergänze explizit „$A$ invertierbar“ als Voraussetzung vor der Formel (der Text setzt es durch „kennen die Inverse“ zwar voraus, macht es aber nicht als mathematische Bedingung sichtbar).

spectral-theorem — KEEP — Der Spektralsatz wird korrekt auf reelle symmetrische Matrizen eingeschränkt und durch ein passendes Beispiel konkretisiert.
- [NOTE] skript/src/concepts/spectral-theorem.mdx:23-25 — „übernimmt die SVD ihre Rolle“ ist als Kurzform leicht missverständlich, weil die SVD keine orthogonale Diagonalisierung von $A$ im selben Sinn liefert; formuliere „liefert eine analoge Zerlegung für beliebige Matrizen“.

trace — KEEP — Definition, Eigenwertbezug und der Übergang zu komplexen Eigenwerten sind kompakt und fachlich konsistent; das Widget prüft die Invarianten anschaulich.
- [NOTE] skript/src/concepts/trace.mdx:24-30 — Der Zusammenhang „beide Tatsachen folgen aus dem charakteristischen Polynom“ ist hier nur für $2\times2$ explizit ausgeschrieben; kennzeichne den Geltungsbereich des angegebenen Polynoms noch klarer als Beispiel-/2D-Fall.
