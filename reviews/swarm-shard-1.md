big-o-notation — REVISE — Tragfähige Zwei-Sinne-Erklärung mit einem nützlichen Schranken-Widget, aber die formale Restglied-Definition sollte die Betrags- und Positivitätsbedingungen explizit machen.
- [MINOR] skript/src/concepts/big-o-notation.mdx:9-11 — „unter C t²“ definiert die Landau-Schranke nicht eindeutig als Betragsungleichung und sagt nicht, dass C nichtnegativ ist; formuliere |R(t)| ≤ C|t|² für C > 0 (und analog den Aufwandsbegriff mit einer nichtnegativen Größe).
- [NOTE] skript/src/concepts/big-o-notation.mdx:21-27 — Die zwei Grenzregime werden direkt hintereinander eingeführt; eine kurze explizite Merkhilfe („t→0: Schrumpfgeschwindigkeit; n→∞: Wachstumsordnung“) würde die ansonsten korrekte Unterscheidung stabilisieren.

cholesky-factorization — REVISE — Die Verbindung von positiver Definitheit, reellen Wurzeln und Ellipse ist stark, aber der Widget-Fall an der Grenze ist fachlich falsch klassifiziert.
- [CRITICAL] skript/src/concepts/widgets/CholeskyWidget.tsx:172-177 — Für q = a₂₂ − a₂₁²/a₁₁ = 0 ist A positiv semidefinit und xᵀAx = 1 degeneriert (keine Hyperbel), während das Verdikt pauschal „Hyperbel“ behauptet; einen getrennten degenerierten Fall anzeigen bzw. die Hyperbel-Aussage auf q < 0 beschränken.

derivative — KEEP — Selbstständige Definition, konkretes x²-Beispiel und die positive h-Interaktion bilden einen konsistenten Weg von Sekante zu Tangente.

euclidean-norm — KEEP — Definition, 3-4-5-Beispiel, Vergleichsnormen und direkt manipulierbare Normalisierung sind verständlich und fachlich konsistent.

geometric-series — KEEP — Die Erklärung deckt Definition, Konvergenzgrenze und das Vorzeichenbeispiel ab; der Regler macht genau den relevanten Übergang |r| = 1 erkundbar.

infinite-series — KEEP — Partialsummen werden vor dem Widget sauber als Definition der unendlichen Summe eingeführt, und die Balkenansicht zeigt die verbleibende Lücke ohne unnötige Interaktion.

linear-independence — KEEP — Definition und Ebene-Beispiele sind eigenständig; Ziehen bis zur Ursprungsgeraden liefert eine tatsächlich prüfbare geometrische Invariante.

machine-epsilon — REVISE — Die Spielzeugdarstellung ist anschauungskräftig, aber zwei verschiedene Fehler-/Abstandsbegriffe werden im Text zu eng vermischt.
- [MAJOR] skript/src/concepts/machine-epsilon.mdx:18-23 — „relativer Fehler von höchstens etwa εmach“ steht ohne Rundungsmodus und ohne den später verwendeten Faktor 1/2; bei Rundung zur nächsten Zahl ist die Standardaussage (für normale Zahlen) eine Schranke von ungefähr εmach/2, also an dieser Stelle präzisieren und mit Zeile 45 konsistent machen.
- [MINOR] skript/src/concepts/machine-epsilon.mdx:28-36 — Das zweite ε bezeichnet zunächst εmach, danach eine frei gewählte Störung; benenne die Störung um (z. B. δ), damit die √εmach-Heuristik nicht wie eine neue Definition der Maschinengenauigkeit wirkt.

nelder-mead — KEEP — Als kurzer statischer Tooltip liefert der Text Definition, vier Operationen, Einsatzgrenze und Kosten; eine Visualisierung wäre für diese reine Verfahrensübersicht nicht erforderlich.

optimization — REVISE — Die Grundidee ist klar, aber das interaktive Beispiel verlangt Wissen über eine im Pop-up nicht erklärte Zielfunktion.
- [MAJOR] skript/src/concepts/widgets/OptimizationWidget.tsx:17-21 — Das Widget führt die konkrete nichtkonvexe Quartik `loss` und einen persistenten „bisher besten Fund“ ein, ohne ihre Form, zwei Mulden oder den Rekord-Mechanismus in der Prosa vorab zu erklären; nenne die Beispiel-Funktion und die Leitfrage (lokal gefundener Wert versus globales Minimum) vor dem Widget.
- [MINOR] skript/src/concepts/optimization.mdx:21-25 — „ohne die Form der Kurve vorwegzunehmen“ ist mit dem anschließend fest verdrahteten Funktionsplot missverständlich; als exploratives Gegenbeispiel („die Form ist sichtbar, der Algorithmus kennt sie nicht“) formulieren.

polynomial-roots — KEEP — Der Fundamentalsatz, Vielfachheiten, reelle/komplexe Fälle und die gekoppelte Darstellung im Widget sind konsistent.

rank — KEEP — Definition über unabhängige Spalten, drei Rangfälle und die manipulierbare Bilddimension ergeben eine selbstständige Mini-Erklärung.

set-builder-notation — KEEP — Muster, Lesart und zwei konkrete Mengenbeispiele reichen hier aus; eine interaktive Darstellung würde keinen zusätzlichen Erkenntnisgewinn liefern.

spectral-radius — REVISE — Die Definition ist korrekt und die Spirale visualisiert eine wichtige Schwelle, aber Text und Widget verallgemeinern das Spezialmodell zu stark.
- [MAJOR] skript/src/concepts/spectral-radius.mdx:28-36 — „Fehler klingen ungefähr wie ρ^k ab“ unterschlägt Jordan-/Nichtdiagonalisierbarkeit, mögliche polynomiale Faktoren und die Abhängigkeit vom Startvektor; Voraussetzungen nennen oder die Aussage ausdrücklich als Spezialfall (wie im Widget) markieren.
- [MAJOR] skript/src/concepts/widgets/SpectralRadiusWidget.tsx:4-6 — Das Widget zeigt ausschließlich G = s·Rot(θ), obwohl diese Matrixform in der Prosa nicht eingeführt wird; direkt am Widget erklären, dass die exakte Normkurve ‖xₖ‖ = sᵏ‖x₀‖ nur für diese skalierte Rotation gilt.
- [MINOR] skript/src/concepts/widgets/SpectralRadiusWidget.tsx:235-244 — Das Verdikt sagt für ρ = 1 pauschal, die Iterierte „dreht sich nur noch“; bei θ = 0 bleibt sie stehen, daher „bleibt normkonstant (und rotiert je nach θ)“ schreiben.

tensor — KEEP — Die Stapelmetapher führt von Vektor und Matrix zur dritten Indexposition; Auswahl von Schicht und Zelle prüft die Kernaussage direkt.

vector — KEEP — Definition, geometrische Interpretation, Ordnungsabhängigkeit und elementare Operationen sind als statischer Tooltip vollständig genug; Interaktion wäre hier nicht nötig.
