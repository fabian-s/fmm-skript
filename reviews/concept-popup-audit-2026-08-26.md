# Audit der Konzept-Pop-ups

Stand: 2026-08-26. Dieser Pass war **review-only**: Es wurden keine Konzepte,
Widgets oder Kapitel geändert.

## Umfang und Methode

- 137 Konzept-Pop-ups (`src/concepts/*.mdx`)
- 113 Pop-ups mit Widget-Import, 24 rein textliche Pop-ups
- 109 Widget-Dateien; einzelne Widgets werden von mehreren Konzepten genutzt
- persönliche, reproduzierbare Stichprobe aus neun per Dateinamen-Hash gezogenen
  Konzepten plus dem gemeldeten Problem `expected-value`
- daraus abgeleitete [Audit-Rubrik](concept-popup-audit-rubric.md)
- neun deterministische Luna-Shards; für jedes Konzept wurden die vollständige
  MDX-Datei, das vollständige Widget und mindestens eine echte Verwendung geprüft
- anschließende manuelle Prüfung und Korrektur der hoch priorisierten
  Schwarmbefunde

Die Entscheidung bezieht sich auf die derzeitige Gesamtform des Pop-ups:

| Entscheidung | Anzahl | Bedeutung |
|---|---:|---|
| KEEP | 74 | tragfähig; höchstens lokale Hinweise |
| REVISE | 60 | fachliche, strukturelle oder didaktische Überarbeitung nötig |
| STATIC | 3 | statische Darstellung ist die richtige Medienform |
| REMOVE | 0 | kein inhaltlich notwendiges Pop-up sollte pauschal entfallen |

Die Befunde verteilen sich nach der manuellen Nachprüfung auf 2 CRITICAL,
55 MAJOR, 55 MINOR und 27 NOTE. Das ist kein Qualitätsurteil „60 schlechte
Pop-ups“: Viele REVISE-Einträge haben eine gute Grundidee, enthalten aber eine
zu allgemeine Aussage oder einen falsch behandelten Randfall.

## Gesamtbild

Die technische Widget-Basis ist deutlich besser als zunächst zu erwarten:

- 107 von 109 Widget-Dateien haben eine explizite Aufgabe,
- 108 von 109 verwenden ein zustandsabhängiges Verdikt,
- 107 von 109 dokumentieren nachgerechnete Werte,
- kein Widget verwendet ungesetztes `Math.random`,
- direkte Manipulation oder Drag-Unterstützung findet sich in 33 Widgets.

Die größten Risiken liegen deshalb nicht in fehlenden Reglern oder Animationen,
sondern in vier anderen Schichten:

1. **Spezialfall wird als allgemeiner Satz formuliert.** Das betrifft unter
   anderem Spektralradius, Konvergenzraten, Taylor-Aussagen, Regression,
   Überanpassung und numerische Rangentscheidungen.
2. **Das Widget kennt ein Beispiel, das die Prosa nicht eingeführt hat.** Die
   Wette beim Erwartungswert, die Zielfunktion bei Optimierung, die Daten bei
   linearer Regression und die Bandbreite der Dichteschätzung sind typische
   Fälle.
3. **Toleranz wird mit mathematischer Gleichheit verwechselt.** Mehrere Widgets
   nennen eine Matrix bereits singulär, ein System bereits parallel oder einen
   Rang bereits reduziert, obwohl die relevante Größe nur klein und nicht null
   ist.
4. **Interaktion ersetzt keine Erklärung.** Einige Controls lassen eine
   unbekannte Zielzahl suchen oder wiederholen diskrete Fälle, ohne die
   mathematische Struktur besser sichtbar zu machen.

## Priorität 0: zwei bestätigte fachliche Fehler

1. **Cholesky-Randfall:**
   `src/concepts/widgets/CholeskyWidget.tsx:172` behandelt
   $q=a_{22}-a_{21}^2/a_{11}=0$ wie den indefiniten Fall und nennt die
   Niveaumenge eine Hyperbel. Bei $q=0$ ist die Matrix positiv semidefinit;
   die Niveaumenge degeneriert zu parallelen Geraden. Der Fall braucht ein
   eigenes Verdikt.
2. **LU bei Nullpivot:**
   `src/concepts/widgets/LuDecompositionWidget.tsx:83` behauptet bei jedem
   Nullpivot, es gebe kein $A=LU$. Das stimmt für den im Auftrag erzeugten
   Zustand mit $a_{21}\ne0$, aber nicht für alle über die Matrixeingabe
   erreichbaren Matrizen, etwa bei ebenfalls $a_{21}=0$. Das Verdikt muss den
   konkreten Eliminationsschritt statt die Existenz jeder LU-Zerlegung
   beurteilen.

## Priorität 1: fachliche und strukturelle Revisionen

### Fehlende Voraussetzungen oder zu breite Aussagen

- `linear-function`: $f(x)=ax+b$ wird als linear statt affin bezeichnet und
  kollidiert damit mit dem linearen-Algebra-Begriff im Skript.
- `vector-space`: zwei Abschlussbedingungen werden als vollständige Definition
  präsentiert; Nichtleerheit/Null, Inverse und die übrige Struktur fehlen.
- `basis`: die Prosa erweckt den Eindruck, ein quadratisches Polynom könne
  beliebig viele Daten immer interpolieren.
- `linear-least-squares`: Eindeutigkeit wird ohne vollen Spaltenrang behauptet.
- `gradient-descent` und `quadratic-form`: die Gradiententransposition ist mit
  der Spaltenvektor-Konvention inkonsistent.
- `inner-product-functions`: $w\ge0$ reicht ohne weitere Positivitätsannahme
  nicht für ein Skalarprodukt; der Schlusssatz über $p=q$ gilt nur innerhalb
  der drei kuratierten Widget-Fälle.
- `change-of-basis`: die euklidische Koordinatenlänge bleibt nur bei
  orthonormalem Basiswechsel erhalten.
- `overfitting`: $K=n$ und die Varianzrate $O(K/n)$ brauchen Design-, Rang-
  und Modellannahmen.
- `machine-epsilon`, `rounding-error`, `spectral-radius`,
  `rate-of-convergence`, `newtons-method`, `taylor-theorem` und
  `taylor-series` benötigen jeweils einen klareren lokalen bzw.
  spezialfallbezogenen Gültigkeitsbereich.

### Unerklärte Beispiele und Größen

- `expected-value`: Das Widget benutzt $E[X]=12p-2$, ohne die Auszahlungen
  der Wette zu definieren. Falls +10 € bei Gewinn und −2 € sonst beabsichtigt
  sind, muss sichtbar $E[X]=10p-2(1-p)$ hergeleitet werden.
- `optimization`: Eine nichtkonvexe Quartik und der „bisher beste Fund“ tauchen
  erst im Widget auf.
- `density-estimation`: Kernel und Bandbreite $h$ werden vor dem
  Bandbreitenregler nicht erklärt.
- `linear-regression`: Datensatz und Schwelle SSE < 0,25 erscheinen ohne
  Vorbereitung.
- `norm`: Die verglichenen 1-, 2- und Unendlichnormen müssen vor oder direkt am
  Widget definiert sein; zusätzlich ist die PageRank-Eindeutigkeitsaussage zu
  präzisieren.
- `objective-function`: Die Prosa definiert SSE, das Widget zeigt MSE; die
  Minimierer stimmen überein, die angezeigten Werte nicht.

### Falsche Gleichheits-/Rangklassifikation durch Toleranzen

Diese Widgets brauchen drei statt zwei Zustände: **exakt degeneriert**, **nahe
degeneriert**, **regulär**.

- `determinant`: |det A| < 0,05 wird als det A = 0 und nichtinvertierbar
  ausgegeben.
- `linear-system`: Fast parallele Geraden werden als parallel und unlösbar
  bezeichnet.
- `singular-value-decomposition`: $0<\sigma_2<0,05$ wird als Rang 1,
  Determinante 0 und unendliche Kondition klassifiziert.
- `rank-nullity-theorem`: Der Regler erlaubt Rang 3 für eine Abbildung
  $\mathbb R^3\to\mathbb R^2$.
- `cholesky-factorization`: der semidefinite Grenzfall fehlt vollständig.

## Medienentscheidungen

### Interaktivität zu statisch zurückbauen

- **`permutation-matrix`**: Sechs Buttons wiederholen dieselbe Umordnungsidee.
  Eine beschriftete Matrix mit Pfeilen und ein kontrastierender zweiter Fall
  vermitteln Werteerhaltung, Positionswechsel und $P^{-1}=P^T$ schneller.

### Bereits gute statische Vorbilder

- **`factorial`** ist bewusst eine feste Tabelle plus Log-Plot. Das ist die
  richtige Form; zu korrigieren ist nur die zu breite Taylor-Konvergenz-
  Motivation.
- **`ohms-law`** wurde bereits von einem Regler auf zwei statische Geraden
  reduziert. Das ist ein gutes Muster; Text und Einheiten brauchen noch den
  Gültigkeitsbereich „ohmscher Widerstand“.

### Design-Review statt vorschneller Entfernung

- **`basis`**: Das exakte Treffen einer Zielkurve mit drei Reglern ist eher
  Fleißaufgabe als Einsicht. Entweder direkte Koeffizienten-Decomposition mit
  kuratierten Zuständen oder eine statische Zerlegung testen.
- **`polynomial`**: Das Regeln der Koeffizienten ist plausibel, aber der Plot
  zeigt nur die Summe. Einzelne Potenzbeiträge oder eine gute statische
  Vorher/Nachher-Gegenüberstellung könnten die Frage „Wie formen die
  Koeffizienten gemeinsam den Graphen?“ besser beantworten.
- **`image`**: Die aktuelle Aufgabe fordert eine Ausgabe außerhalb einer
  Rang-1-Bildgeraden und ist damit absichtlich oder unabsichtlich unlösbar.
  Als Vorhersage-/Bestätigungsfigur neu konzipieren, nicht ersatzlos löschen.

## Nicht erreichbare Konzeptmodule

Für diese vier IDs findet sich derzeit weder in Kapiteln noch in anderen
Konzepten ein Link:

- `bisection`
- `differential-equation`
- `hookes-law`
- `newtons-second-law`

Die Inhalte sind überwiegend brauchbar. Trotzdem sollten sie entweder an der
ersten echten Verwendung verlinkt oder als ungenutzter Bestand entfernt werden.

## Persönliche Stichprobe

Die zehn vor dem Schwarm gelesenen Pop-ups waren:

`expected-value`, `linear-transformation`, `basis`, `span`,
`linear-independence`, `polynomial`, `inner-product-functions`, `overfitting`,
`norm`, `permutation-matrix`.

Sie waren für die Rubrik besonders hilfreich: `linear-independence` zeigte die
positive Zielstruktur (Definition → geometrische Frage → direkte Manipulation
→ Flächenverdikt), während `expected-value` den fehlenden Szenarioaufbau und
`permutation-matrix` die wiederholende Button-Interaktion offenlegte. Der
Schwarm bestätigte die meisten Stichprobenbefunde; zwei zunächst plausibel
klingende Schwarmkritiken wurden bei der Synthese ausdrücklich verworfen:

- Die Subtraktion naher Gleitkommazahlen kann nach dem Sterbenz-Lemma exakt
  sein; `cancellation` ist daher nicht fachlich falsch.
- `smooth-function` sagt korrekt, dass die vollständige formale Taylor-Reihe
  Ableitungen jeder Ordnung benötigt; es behauptet nicht, dass $C^\infty$
  Konvergenz zur Funktion garantiere.

## Vollständige Einzelbefunde

Die neun Dateien bilden eine disjunkte, vollständige Partition aller 137
Konzepte:

- [Shard 0](swarm-shard-0.md)
- [Shard 1](swarm-shard-1.md)
- [Shard 2](swarm-shard-2.md)
- [Shard 3](swarm-shard-3.md)
- [Shard 4](swarm-shard-4.md)
- [Shard 5](swarm-shard-5.md)
- [Shard 6](swarm-shard-6.md)
- [Shard 7](swarm-shard-7.md)
- [Shard 8](swarm-shard-8.md)

## Empfohlene Umsetzungsreihenfolge

1. Die beiden CRITICAL-Randfälle korrigieren.
2. Definitions- und Voraussetzungfehler ohne Designumbau bereinigen.
3. Alle Toleranz-basierten Gleichheitsurteile in drei Zustände aufteilen.
4. Unerklärte Widget-Szenarien in der Prosa aufbauen.
5. `permutation-matrix` statisch neu setzen; `basis` und `polynomial` als kleine
   A/B-Designaufgabe prüfen.
6. Die vier nicht erreichbaren Module verlinken oder entfernen.
