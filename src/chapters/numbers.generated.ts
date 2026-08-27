/* GENERIERT von scripts/gen-numbers.mjs — nicht von Hand bearbeiten.
 * Neu erzeugen: npm run gen:numbers (läuft auch vor dev und build).
 *
 * Nummern für Widget-TSX: statt „… aus Satz 12.5.7" schreibe
 *   import { ref, num } from "../../numbers.generated";
 *   `… aus ${ref("satz:kkt")}`        → "… aus Satz 12.5.7"
 *   num("eq:kkt-stationaritaet")       → "12.5.3"
 * Schlüssel: <direktive>:<id> (satz:, definition:, …), eq:<id>, sec:<kap>/<key>,
 * sec:<überschriften-id>, kap:<kap>. Unbekannte Schlüssel sind ein Typfehler.
 */
export type NumKey =
  | "algorithmus:backtracking-liniensuche-nach-armijo"
  | "algorithmus:bisektionsverfahren"
  | "algorithmus:cholesky-verfahren-fuer-das-kq-problem"
  | "algorithmus:drei-klassische-wahlen-von-c"
  | "algorithmus:empfehlungen-ueber-eine-rang-k"
  | "algorithmus:fibonacci-schleifenbasiert"
  | "algorithmus:fixpunktiteration-erster-ordnung"
  | "algorithmus:gauss-elimination-mit-partieller"
  | "algorithmus:gradient-gradientenabstieg"
  | "algorithmus:gradientenabstieg-fuer-matrix-completion"
  | "algorithmus:gradientenabstieg-mit-heavy-ball"
  | "algorithmus:interpolation-durch-basisdarstellung"
  | "algorithmus:kompression-mit-der-svd"
  | "algorithmus:loesen-von-ax-b-mit-der-lu-zerlegung"
  | "algorithmus:nelder-mead-gradient-gradientenabstieg"
  | "algorithmus:nelder-mead-simplexverfahren"
  | "algorithmus:newton-raphson-verfahren"
  | "algorithmus:newton-raphson-verfahren-fuer"
  | "algorithmus:newton-verfahren-fuer-die-optimierung"
  | "algorithmus:polynominterpolation-in-der-monombasis"
  | "algorithmus:potenzmethode"
  | "algorithmus:qr-iteration"
  | "algorithmus:quasi-newton-schritt"
  | "algorithmus:sketching-fuer-ein-kq-problem"
  | "algorithmus:spaltenweise-auswertung"
  | "algorithmus:stochastischer-gradientenabstieg-sgd"
  | "beispiel:ableitung-von-f-x-a-xb"
  | "beispiel:addition-und-multiplikation"
  | "beispiel:aeusseres-produkt-zweier-vektoren"
  | "beispiel:affine-funktionen"
  | "beispiel:algorithmenarten-in-ml-und-statistik"
  | "beispiel:alle-unterraeume-einer-rang-1-matrix"
  | "beispiel:aufgabe-kondition-der-summe"
  | "beispiel:auswahl-unter-einer-budgetschranke"
  | "beispiel:basisdarstellung-konkret"
  | "beispiel:beispiel-2-3-6"
  | "beispiel:beispiel-2-4-3"
  | "beispiel:beispiel-3-1-3"
  | "beispiel:beispiel-3-3-8"
  | "beispiel:beispiel-3-4-6"
  | "beispiel:beispiel-7-3-6"
  | "beispiel:bias-und-varianz-beim-sinusbeispiel"
  | "beispiel:buckel-auf-dem-einheitsintervall"
  | "beispiel:cholesky-zerlegung-einer-2-2-matrix"
  | "beispiel:das-subdifferential-des-betrags"
  | "beispiel:das-tensorprodukt-von-und"
  | "beispiel:der-aufrufbaum-fuer-n-5"
  | "beispiel:der-betrag-ist-konvex"
  | "beispiel:der-einheitskreis-wird-zur-ellipse"
  | "beispiel:der-erwartungswert-ist-eine"
  | "beispiel:der-kehrwert-aufgeloest"
  | "beispiel:der-simplex"
  | "beispiel:der-standardsattel"
  | "beispiel:der-umweg-ueber-a-a"
  | "beispiel:diagonalisierung-durch-eine"
  | "beispiel:die-betragsfunktion-am-nullpunkt"
  | "beispiel:die-drei-wahlen-an-einem-2-2-system"
  | "beispiel:die-einheitsmatrix-ist-kein-elementarer"
  | "beispiel:die-ersten-6-fibonacci-zahlen"
  | "beispiel:die-gestalt-von"
  | "beispiel:die-grade-0-1-und-3"
  | "beispiel:die-identitaet-an-2-2-matrizen"
  | "beispiel:die-instabilitaet-in-r"
  | "beispiel:die-jacobi-formel-an-einem"
  | "beispiel:die-kettenregel-in-fuenf-bauformen"
  | "beispiel:die-matrix-a-a-einer-3-2-matrix"
  | "beispiel:die-maximumsnorm-ist-nicht"
  | "beispiel:die-produktregel-in-vier-bauformen"
  | "beispiel:die-tensorproduktbasis-von-p-p"
  | "beispiel:die-varianz-ist-nicht-negativ"
  | "beispiel:die-wurzel-aus-zwei"
  | "beispiel:dieselbe-funktion-andere-koeffizienten"
  | "beispiel:dimensionsreduktion-mit-matrix-sketching"
  | "beispiel:drei-faktoren"
  | "beispiel:drei-nullstellen-bei-grad-hoechstens"
  | "beispiel:drei-punkte-auf-einer-geraden"
  | "beispiel:drei-punkte-zwei-interpolanten"
  | "beispiel:ein-bild-mit-659-512-pixeln"
  | "beispiel:ein-dreieck-als-schnitt-dreier"
  | "beispiel:ein-farbbild-als-tensor-der-stufe-3"
  | "beispiel:ein-schlecht-konditioniertes-problem"
  | "beispiel:ein-stapel-bilder-als-tensor-der-stufe-4"
  | "beispiel:ein-zug-statt-vieler"
  | "beispiel:eine-bilineare-abbildung-auf-r2-mal-r2"
  | "beispiel:eine-bivariate-funktion-in-dieser-basis"
  | "beispiel:eine-box-beschraenkung"
  | "beispiel:eine-duenn-besetzte-bewertungsmatrix"
  | "beispiel:eine-quadrik-ausgerechnet"
  | "beispiel:explizite-aequivalenzkonstanten"
  | "beispiel:feature-maps-eine-abbildung-von-tensoren"
  | "beispiel:fehlermasse-fuer-vektoren"
  | "beispiel:fehlerzerlegung-berechnung-von-e"
  | "beispiel:fisher-information-im-bernoulli-modell"
  | "beispiel:flaeche-eines-rechtecks"
  | "beispiel:fortsetzung-die-pseudoinverse-der-rang-1"
  | "beispiel:fortsetzung-loesen-mit-der-zerlegung"
  | "beispiel:frechet-ableitung-von-f-x-x"
  | "beispiel:fuenfzig-verrauschte-punkte"
  | "beispiel:gauss-rademacher-subsampling"
  | "beispiel:givens-rotation-beispiel"
  | "beispiel:gleiche-frobenius-norm-voellig"
  | "beispiel:grad-1-die-hutfunktionen"
  | "beispiel:gradient-der-euklidischen-norm"
  | "beispiel:gradient-des-logistischen-verlusts"
  | "beispiel:gradient-einer-linearen-funktion"
  | "beispiel:gradient-einer-quadratischen-form"
  | "beispiel:gradient-einer-quadratischen-funktion"
  | "beispiel:gradient-und-hesse-matrix-einer"
  | "beispiel:gradientenabstieg-von-hand"
  | "beispiel:hilbert-matrix-inverse-vs-loesen"
  | "beispiel:householder-spiegelung-beispiel"
  | "beispiel:i-n-k-s-ist-blockdiagonal"
  | "beispiel:identitaet-in-wachsender-dimension"
  | "beispiel:identitaetsmatrix"
  | "beispiel:invertierbar-aber-keine-lu-zerlegung"
  | "beispiel:jacobimatrix-eines-relu-layers"
  | "beispiel:katastrophale-ausloeschung"
  | "beispiel:kehrwert-nahe-null"
  | "beispiel:kettenregel-fuer-die-beispielfunktion"
  | "beispiel:kkt-stationaritaet-fuer-ridge"
  | "beispiel:kleinste-quadrate-und-ridge"
  | "beispiel:komplexitaet-matrixmultiplikation"
  | "beispiel:konditionszahlen-der-groessenordnung"
  | "beispiel:konvexe-huelle-dreier-punkte"
  | "beispiel:kroneckerprodukt-zweier-kleiner-matrizen"
  | "beispiel:kubischer-spline-durch-vier-punkte"
  | "beispiel:lineare-regression"
  | "beispiel:linearitaet-an-einem-zahlenbeispiel"
  | "beispiel:logistische-regression-ist-ein-konvexes"
  | "beispiel:lu-zerlegung-einer-3-3-matrix"
  | "beispiel:matrix-vektor-multiplikation"
  | "beispiel:matrizenmultiplikation-als-bilineare"
  | "beispiel:minimieren-auf-einer-geraden"
  | "beispiel:newton-auf-einer-nicht-quadratischen"
  | "beispiel:offener-ball"
  | "beispiel:optimierungsprobleme-in-statistik-und"
  | "beispiel:potenzmethode-an-einer-2-2-matrix"
  | "beispiel:probe-der-frobenius-identitaet"
  | "beispiel:pseudoinverse-der-beispielmatrix"
  | "beispiel:qr-iteration-an-der-beispielmatrix"
  | "beispiel:qr-zerlegung-via-gram-schmidt"
  | "beispiel:quadratische-funktionen-mit-dem"
  | "beispiel:quadrieren-in-der-ebene"
  | "beispiel:rangdefizientes-kq-problem"
  | "beispiel:rechenbeispiel-regressionsgerade-durch"
  | "beispiel:reduzierte-svd-einer-rang-1-matrix"
  | "beispiel:richardson-iteration"
  | "beispiel:ridge-regression"
  | "beispiel:runge-1901"
  | "beispiel:s-k-i-n-verteilt-die-eintraege"
  | "beispiel:singulaervektoren-der-beispielmatrix"
  | "beispiel:singulaerwerte-der-beispielmatrix"
  | "beispiel:skalarprodukte-sind-bilinear"
  | "beispiel:sketching-zweier-vektoren-mit-10-000"
  | "beispiel:stochastic-gradient-descent"
  | "beispiel:sylvester-gleichung-per-vec-trick"
  | "beispiel:taylorapproximation-der"
  | "beispiel:tensorprodukt-dreier-vektoren"
  | "beispiel:uebung-das-punktweise-maximum"
  | "beispiel:uebung-die-summe-zweier-konvexer"
  | "beispiel:uebung-eine-2-3-matrixfunktion"
  | "beispiel:vektorisierungsnormen"
  | "beispiel:vereinfachung-eines-aufwandsausdrucks"
  | "beispiel:verletzte-assoziativitaet"
  | "beispiel:vier-interpolanten-durch-drei-punkte"
  | "beispiel:vier-konvexe-verlustfunktionen"
  | "beispiel:visualisierung"
  | "beispiel:warum-der-satz-eine-schranke-ist-und"
  | "beispiel:was-die-kriterien-in-unserem-datensatz"
  | "beispiel:wie-senkrecht-ist-fast-senkrecht"
  | "beispiel:zehn-basisfunktionen-je-variable"
  | "beispiel:zielfunktionen-aus-bausteinen"
  | "beispiel:zwei-algorithmen-fuer-die-varianz"
  | "beispiel:zwei-ansatzraeume"
  | "beispiel:zwei-orte-zwei-zeitpunkte"
  | "beispiel:zwei-projektionen-die-wir-hinschreiben"
  | "beispiel:zyklische-vertauschung-in-der-statistik"
  | "bemerkung:aequivalenz-ist-nicht-gleichheit"
  | "bemerkung:allgemeine-dimension-und-was-sie-kostet"
  | "bemerkung:analysis-perspektive"
  | "bemerkung:anmerkungen-zur-methodenwahl"
  | "bemerkung:approximation-ueber-interpolation"
  | "bemerkung:arten-von-algorithmen"
  | "bemerkung:auch-die-auswertung-kostet"
  | "bemerkung:auch-null-ist-ein-zulaessiger"
  | "bemerkung:ausblick-andere-ableitungsbegriffe"
  | "bemerkung:ausblick-kleinste-quadrate"
  | "bemerkung:ausblick-normen-als-regularisierer"
  | "bemerkung:b-splines-in-r"
  | "bemerkung:bandstruktur-und-aufwand"
  | "bemerkung:beide-saetze-brauchen-zwei"
  | "bemerkung:beispiele-und-warum-die-schranke-selten"
  | "bemerkung:bemerkung-3-1-9"
  | "bemerkung:bemerkung-3-2-2"
  | "bemerkung:bemerkung-3-3-2"
  | "bemerkung:bemerkung-3-4-2"
  | "bemerkung:bemerkung-7-1-2"
  | "bemerkung:bemerkung-7-2-2"
  | "bemerkung:bemerkung-7-2-5"
  | "bemerkung:bemerkung-7-4-3"
  | "bemerkung:bemerkung-7-4-5"
  | "bemerkung:bilinear-und-eine-warnung"
  | "bemerkung:bisektion-robust-implementiert"
  | "bemerkung:cramer-rao-sauber-formuliert"
  | "bemerkung:das-dilemma-der-schrittweite"
  | "bemerkung:das-format-bleibt-erhalten"
  | "bemerkung:das-muster-hinter-dem-exponenten"
  | "bemerkung:das-optimum-liegt-oft-auf-der"
  | "bemerkung:das-vierfache-geometrisch-gelesen"
  | "bemerkung:das-wort-basisfunktion-traegt-eine"
  | "bemerkung:daten-oder-funktion"
  | "bemerkung:der-ableitungsterm-ist-ein-skalarprodukt"
  | "bemerkung:der-ausweg-orthogonalisierte-basen"
  | "bemerkung:der-bias-faellt-nicht-monoton"
  | "bemerkung:der-definitionsbereich-muss-mitspielen"
  | "bemerkung:der-gewinn-und-was-er-kostet"
  | "bemerkung:der-gradient-steht-senkrecht-auf-der"
  | "bemerkung:der-praktische-ausweg-gross-waehlen-und"
  | "bemerkung:die-aufgabe-ist-so-noch-entartet"
  | "bemerkung:die-drei-kernideen"
  | "bemerkung:die-drei-leeren-felder"
  | "bemerkung:die-dritte-ableitung-ist-ein-tensor"
  | "bemerkung:die-fuenf-kernkonzepte"
  | "bemerkung:die-gradientenkette-eines-netzes"
  | "bemerkung:die-kleinste-konvexe-obermenge"
  | "bemerkung:die-konditionszahl-einer-funktion"
  | "bemerkung:die-merkregel-und-ihre-kontraposition"
  | "bemerkung:die-parameterzaehlung-als-gegenprobe"
  | "bemerkung:die-qr-iteration-ist-eine-simultane"
  | "bemerkung:die-residuen-fallen-nicht-immer"
  | "bemerkung:die-svd-als-summe-aeusserer-produkte"
  | "bemerkung:die-zeilen-sind-gradienten"
  | "bemerkung:die-zweite-schreibweise"
  | "bemerkung:divergenz-schon-aber-nicht-monoton"
  | "bemerkung:drei-abbruchkriterien-und-ihre-grenzen"
  | "bemerkung:drei-aussagen-die-auseinanderzuhalten"
  | "bemerkung:drei-auswege"
  | "bemerkung:drei-feinheiten-zum-satz"
  | "bemerkung:drei-kriterien-fuer-die-wahl-von-k"
  | "bemerkung:drei-lesarten-desselben-schritts"
  | "bemerkung:drei-nachtraege-zu-satz-10-2-8"
  | "bemerkung:drei-stellschrauben-drei-wirkungen"
  | "bemerkung:drei-vorbehalte"
  | "bemerkung:ebene-und-quadrik"
  | "bemerkung:eigenschaften-kosten-und-l-bfgs"
  | "bemerkung:eigenwerte-als-kruemmungen"
  | "bemerkung:eigenwerte-aufwand"
  | "bemerkung:ein-ausweg-die-knoten-anders-legen"
  | "bemerkung:ein-fester-vektor-ist-nicht-jeder-vektor"
  | "bemerkung:ein-gewichteter-durchschnitt"
  | "bemerkung:ein-haeufiges-missverstaendnis"
  | "bemerkung:eine-analogie"
  | "bemerkung:eine-feinheit"
  | "bemerkung:eine-landkarte-der-optimierungsprobleme"
  | "bemerkung:eine-vorschrift-zwei-spalten"
  | "bemerkung:einsetzen-ist-hier-nicht"
  | "bemerkung:es-bleibt-ein-lineares-kleinste-quadrate"
  | "bemerkung:existenz-die-abzaehlung-geht-auf"
  | "bemerkung:extrempunkt-zu-sein-ist-keine"
  | "bemerkung:falsche-konvergenz-und-keiner-warnt"
  | "bemerkung:faustregel-mit-der-einschraenkung-aus"
  | "bemerkung:fehler-mal-merkmal"
  | "bemerkung:fehlermasse-verwendete-vorkenntnisse"
  | "bemerkung:fixpunktform"
  | "bemerkung:fuenf-bausteine-die-bleiben"
  | "bemerkung:fuenf-begriffe-die-bleiben"
  | "bemerkung:fuenf-spezialfaelle-derselben-aussage"
  | "bemerkung:fuer-ein-lgs-keine-explizite-inverse"
  | "bemerkung:gesamtaufwand"
  | "bemerkung:gewichte-als-wahrscheinlichkeiten"
  | "bemerkung:givens-householder-aufwand"
  | "bemerkung:golden-section-search"
  | "bemerkung:grenzen-des-rechnens"
  | "bemerkung:gross-o-und-klein-o-fuer-kleine"
  | "bemerkung:hauptidee-der-randomisierung"
  | "bemerkung:heuristisches-balance-modell-fuer-die"
  | "bemerkung:hinreichend-aber-nicht-notwendig"
  | "bemerkung:hoeher-ist-nicht-automatisch-besser"
  | "bemerkung:hoehere-ableitungen-wie-die-definition-zu-lesen-ist"
  | "bemerkung:ideale-situationen-fuer-die-svd"
  | "bemerkung:inneres-und-aeusseres-produkt"
  | "bemerkung:interpolation-im-maschinellen-lernen-und"
  | "bemerkung:interpretation"
  | "bemerkung:interpretation-der-komplexitaetsklassen"
  | "bemerkung:interpretation-der-konditionszahl"
  | "bemerkung:jede-voraussetzung-wird-gebraucht"
  | "bemerkung:komplementaritaet-bindet-oder"
  | "bemerkung:kondition-der-grundoperationen"
  | "bemerkung:kondition-konditionszahl-einer-matrix"
  | "bemerkung:kondition-von-eigenwertproblemen"
  | "bemerkung:konditionszahlen-eine-groessenordnung"
  | "bemerkung:kovarianzmatrizen-sind-mittel-aeusserer"
  | "bemerkung:kovarianzmatrizen-sind-semidefinit-nicht"
  | "bemerkung:kreis-gegen-raute-warum-lasso-nullen"
  | "bemerkung:kronecker-designmatrix-tensorprodukt-splines"
  | "bemerkung:linearisierung-wie-die-definition-zu-lesen-ist"
  | "bemerkung:lipschitz-stetiger-gradient-und-die"
  | "bemerkung:maximieren-ist-minimieren"
  | "bemerkung:merkregel"
  | "bemerkung:merkregel-drehen-strecken-drehen"
  | "bemerkung:merkregel-ein-lgs-zwei-dreieckssysteme"
  | "bemerkung:modell-designmatrix-schaetzer"
  | "bemerkung:multivariat-kernkonzepte-des-kapitels"
  | "bemerkung:namensgeber-und-anwendung"
  | "bemerkung:newton-bei-nicht-konvexen-funktionen"
  | "bemerkung:notation"
  | "bemerkung:nuklearnorm-und-niedrigrang-probleme"
  | "bemerkung:operatornorm-hilfsungleichung"
  | "bemerkung:operatornormen-eigenschaften-von-orthogonalmatrizen"
  | "bemerkung:optim-in-r-kernkonzepte-des-kapitels"
  | "bemerkung:optimieren-heisst-gleichungen-loesen"
  | "bemerkung:penalized-splines-und-die-naehe-zu-ridge"
  | "bemerkung:praxisrelevanz-der-hesse-matrix"
  | "bemerkung:quadratische-konvergenz"
  | "bemerkung:radiale-basisfunktionen"
  | "bemerkung:rand-und-inneres-an-den-gewichten"
  | "bemerkung:randpunkte-und-wozu-subgradienten-gut"
  | "bemerkung:rauschen-mini-batches-und-lernraten"
  | "bemerkung:rechenaufwand"
  | "bemerkung:rechenregeln-aus-der-bilinearitaet"
  | "bemerkung:reparatur-die-gesamtnorm"
  | "bemerkung:schranke-und-messung-sind-zweierlei"
  | "bemerkung:sechs-begriffe-die-bleiben"
  | "bemerkung:singulaervektoren-sind-nicht-eindeutig"
  | "bemerkung:singulaerwerte-sind-streckungsfaktoren"
  | "bemerkung:spline"
  | "bemerkung:spur-verwendete-vorkenntnisse"
  | "bemerkung:stabilitaet-des-cholesky-verfahrens"
  | "bemerkung:stabilitaet-und-kondition-ausblick"
  | "bemerkung:staerken-schwaechen-ausblick"
  | "bemerkung:stoerungsanalyse-als-richtungsableitung"
  | "bemerkung:struktur-ausnutzen"
  | "bemerkung:stufe-und-dimension-sind-zwei"
  | "bemerkung:stufe-und-warum-eine-menge-es-nicht-tut"
  | "bemerkung:stufen-addieren-sich-eintraege"
  | "bemerkung:taxonomie-nach-ableitungsordnung"
  | "bemerkung:transponieren-und-reihenfolge"
  | "bemerkung:typische-singulaerwert-verlaeufe-und-der"
  | "bemerkung:umkehrfunktionen-binaersuche-und-die"
  | "bemerkung:unendlich-viele-freiheitsgrade-endlich"
  | "bemerkung:unendlich-viele-loesungen"
  | "bemerkung:verwandtschaft-mit-dem-gradientenabstieg"
  | "bemerkung:vier-bausteine-die-bleiben"
  | "bemerkung:vier-staerken-auf-einen-blick"
  | "bemerkung:voller-spaltenrang-eine-geschlossene"
  | "bemerkung:von-der-koeffizientenfamilie-zur-matrix"
  | "bemerkung:von-der-nullstelle-zum-minimum"
  | "bemerkung:von-quadraten-zu-laengen-und-abstaenden"
  | "bemerkung:vorsicht-bei-den-ableitungen"
  | "bemerkung:vorsicht-konstanten"
  | "bemerkung:vorsicht-was-die-spur-nicht-kann"
  | "bemerkung:vorzeichenwahl"
  | "bemerkung:wann-die-designmatrix-vollen-spaltenrang"
  | "bemerkung:wann-die-potenzmethode-versagt"
  | "bemerkung:wann-givens"
  | "bemerkung:wann-sich-nelder-mead-lohnt"
  | "bemerkung:warum-ausgerechnet-der-eigenwert-1"
  | "bemerkung:warum-das-charakteristische-polynom-kein"
  | "bemerkung:warum-das-in-der-statistik-gebraucht"
  | "bemerkung:warum-das-mehr-ist-als-eine-notloesung"
  | "bemerkung:warum-der-nenner-noetig-ist"
  | "bemerkung:warum-der-symmetrische-anteil"
  | "bemerkung:warum-die-knotenfolge-so-lang-sein-muss"
  | "bemerkung:warum-die-menge-offen-und-konvex-sein"
  | "bemerkung:warum-die-momentenbedingung-an-der"
  | "bemerkung:warum-die-rueckrichtung-nicht-gilt"
  | "bemerkung:warum-die-spalten-fast-parallel-werden"
  | "bemerkung:warum-endlich-viele"
  | "bemerkung:warum-hier-die-integralform-steht"
  | "bemerkung:warum-in-gleichung-10-2-4-ein"
  | "bemerkung:warum-interpolation-das-rauschen-erbt"
  | "bemerkung:warum-iterativ-die-lanczos-abkuerzung"
  | "bemerkung:warum-newton-die-kondition-nicht-spuert"
  | "bemerkung:warum-statistik-und-ml-voll-davon-sind"
  | "bemerkung:warum-wir-trotzdem-mit-o-nmk-rechnen"
  | "bemerkung:was-daraus-folgt-und-was-nicht"
  | "bemerkung:was-das-in-zahlen-heisst"
  | "bemerkung:was-der-produktbau-bedeutet"
  | "bemerkung:was-der-satz-leistet-und-was-nicht"
  | "bemerkung:was-der-satz-liefert-und-was-nicht"
  | "bemerkung:was-der-satz-sagt-und-was-nicht"
  | "bemerkung:was-der-schritt-voraussetzt-und-wie-wir"
  | "bemerkung:was-der-schwung-bewirkt"
  | "bemerkung:was-der-strafterm-bewirkt"
  | "bemerkung:was-die-annahme-spart-und-was-sie-kostet"
  | "bemerkung:was-die-armijo-bedingung-fordert"
  | "bemerkung:was-die-bedingung-verlangt"
  | "bemerkung:was-die-faktoren-bedeuten"
  | "bemerkung:was-die-lokalitaet-praktisch-bedeutet"
  | "bemerkung:was-die-randterme-wirklich-brauchen"
  | "bemerkung:was-die-rate-ueber-datenmengen-sagt"
  | "bemerkung:was-die-reduzierte-form-spart-und-was"
  | "bemerkung:was-die-symmetrie-spart"
  | "bemerkung:was-die-varianzformel-erzaehlt"
  | "bemerkung:was-die-vier-regeln-zusammen-hergeben"
  | "bemerkung:was-die-zweite-kapitelhaelfte"
  | "bemerkung:was-eine-rate-der-ordnung-1-k-praktisch"
  | "bemerkung:was-folgt-daraus-und-was-nicht"
  | "bemerkung:was-hier-eigentlich-linear-ist"
  | "bemerkung:was-in-b-steckt-und-was-nicht"
  | "bemerkung:was-in-der-fehlerannahme-steckt"
  | "bemerkung:was-in-dieser-definition-steckt"
  | "bemerkung:was-iterative-verfahren-leisten"
  | "bemerkung:was-kapitel-9-dazu-schon-gesagt-hat"
  | "bemerkung:was-konvexitaet-aus-der-tabelle-macht"
  | "bemerkung:was-sattelpunkte-fuer-die-verfahren"
  | "bemerkung:was-wird-hier-eigentlich-berechnet"
  | "bemerkung:welche-zielgestalt-welches-verfahren"
  | "bemerkung:welcher-spline-die-konstante-traegt"
  | "bemerkung:wenn-die-hesse-matrix-nichts-entscheidet"
  | "bemerkung:wenn-es-keine-eindeutige-tangente-gibt"
  | "bemerkung:wie-die-kette-ausgewertet-wird"
  | "bemerkung:wie-die-tabelle-zu-lesen-ist"
  | "bemerkung:wie-lesen-wir-das"
  | "bemerkung:wie-schlimm-ist-es-wirklich"
  | "bemerkung:wie-stark-die-flaeche-verzerrt-wird"
  | "bemerkung:wie-wir-das-system-wirklich-loesen"
  | "bemerkung:wie-wir-die-schranke-lesen"
  | "bemerkung:wie-wir-die-ungleichung-lesen"
  | "bemerkung:wo-die-diagonalisierung-aufhoert"
  | "bemerkung:wo-die-kette-aufhoert"
  | "bemerkung:wo-die-voraussetzungen-stecken"
  | "bemerkung:wo-skizzen-helfen"
  | "bemerkung:wogegen-die-qr-iteration-konvergiert"
  | "bemerkung:woran-die-ordnung-haengt"
  | "bemerkung:zaehlen-ist-konvention-die-ordnung-nicht"
  | "bemerkung:zeilenvektor-nicht-spaltenvektor"
  | "bemerkung:ziehen-aus-der-multivariaten"
  | "bemerkung:zu-klein-zu-gross-gerade-richtig"
  | "bemerkung:zum-bau-der-pseudoinversen"
  | "bemerkung:zur-identitaet-fuer-x-a"
  | "bemerkung:zwei-anforderungen-an-c"
  | "bemerkung:zwei-bedeutungen-zwei-zeichen"
  | "bemerkung:zwei-bedingungen-fehlen-randbedingungen"
  | "bemerkung:zwei-feinheiten-der-definition"
  | "bemerkung:zwei-nachtraege-zur-rechnung"
  | "bemerkung:zwei-probleme-ein-werkzeugkasten"
  | "bemerkung:zwei-regler-und-ihre-preise"
  | "bemerkung:zwei-schaetzungen-fuer-den-eigenwert"
  | "definition:ableitung-einer-matrixwertigen-funktion"
  | "definition:ableitung-nach-einer-matrix"
  | "definition:additives-modell"
  | "definition:aeusseres-produkt"
  | "definition:algorithmus"
  | "definition:ansatzraum-basisdarstellung"
  | "definition:ansatzraum-und-designmatrix"
  | "definition:approximationsproblem"
  | "definition:beschraenkte-bilineare-abbildung"
  | "definition:beschraenktes-optimierungsproblem"
  | "definition:bfgs-update"
  | "definition:definition-7-2-1"
  | "definition:der-vektorraum-der-funktionen"
  | "definition:differenzierbarkeit"
  | "definition:eigenschaften-konditionszahl-einer-matrix"
  | "definition:epigraph"
  | "definition:erweiterte-knotenfolge-und-b-splines"
  | "definition:fehlermass"
  | "definition:fibonacci-zahlen"
  | "definition:fisher-informationsmatrix"
  | "definition:frechet-ableitung"
  | "definition:frobenius-norm"
  | "definition:generalisierte-kreuzvalidierung"
  | "definition:givens-rotation-definition"
  | "definition:glaettungsproblem"
  | "definition:gradient"
  | "definition:hesse-matrix"
  | "definition:householder-spiegelung-definition"
  | "definition:interpolation-und-glaettung-im"
  | "definition:interpolationsproblem"
  | "definition:jacobimatrix"
  | "definition:k-mal-frechet-differenzierbar"
  | "definition:kleinste-quadrate-problem-kq-problem"
  | "definition:komplexitaet"
  | "definition:konditionszahl"
  | "definition:konvexe-funktion"
  | "definition:konvexe-huelle"
  | "definition:konvexe-menge"
  | "definition:konvexe-mengen-extrempunkt"
  | "definition:konvexkombination"
  | "definition:konvexkombinationen-extrempunkt"
  | "definition:korrekturiteration"
  | "definition:kroneckerprodukt"
  | "definition:kruemmungsfunktional"
  | "definition:lagrange-funktion"
  | "definition:landau-symbole"
  | "definition:lipschitz-stetigkeit"
  | "definition:lokales-und-globales-minimum"
  | "definition:lu-zerlegung"
  | "definition:matrixnorm"
  | "definition:matrixnormen-vektorisierung"
  | "definition:monombasis-und-vandermonde-matrix"
  | "definition:moore-penrose-pseudoinverse"
  | "definition:multilineare-abbildung"
  | "definition:nichtlineares-gleichungssystem"
  | "definition:numerisches-problem"
  | "definition:operatornorm"
  | "definition:operatornormen-orthogonalmatrix"
  | "definition:partition-und-gitterweite"
  | "definition:penalisiertes-kleinste-quadrate"
  | "definition:polynom-spline-vom-grad-q"
  | "definition:positiv-semidefinit"
  | "definition:qr-orthogonalmatrix"
  | "definition:qr-zerlegung"
  | "definition:rang-k-approximation"
  | "definition:rechte-und-linke-singulaervektoren"
  | "definition:reduzierte-svd"
  | "definition:regressionsmodell-mit-additivem-fehler"
  | "definition:residuum"
  | "definition:richtungsableitung"
  | "definition:sattelpunkt"
  | "definition:schatten-p-norm"
  | "definition:separierbare-kovarianz"
  | "definition:singulaerwerte"
  | "definition:sketching-matrix-und-skizze"
  | "definition:spd-matrix"
  | "definition:spur"
  | "definition:starke-konvexitaet"
  | "definition:stationaerer-punkt"
  | "definition:strikte-konvexitaet"
  | "definition:subgradient-und-subdifferential"
  | "definition:submultiplikative-matrixnorm"
  | "definition:taylorpolynom"
  | "definition:tensor"
  | "definition:tensor-produkt-basis"
  | "definition:tensorprodukt"
  | "definition:tensorprodukt-von-vektorraeumen"
  | "definition:unbeschraenktes-und-beschraenktes"
  | "definition:vertraegliche-norm"
  | "definition:vorwaerts-und-rueckwaertsstabilitaet"
  | "definition:zeit-und-speicheraufwand"
  | "definition:zusammenfassung-vektorisierung"
  | "eq:ableitung-einer-matrixwertigen-funktion"
  | "eq:ableitung-einer-matrixwertigen-funktion-2"
  | "eq:ableitung-nach-einer-matrix"
  | "eq:ableitung-nach-einer-matrix-2"
  | "eq:ableitung-von-f-x-a-xb"
  | "eq:additives-modell"
  | "eq:aeusseres-produkt"
  | "eq:approximationsfehler-kubischer-splines"
  | "eq:backtracking-liniensuche-nach-armijo"
  | "eq:beide-saetze-brauchen-zwei"
  | "eq:beschraenkte-bilineare-abbildung"
  | "eq:bfgs-update"
  | "eq:cholesky-zerlegung"
  | "eq:darstellung-multilinearer-abbildungen"
  | "eq:der-ableitungsterm-ist-ein-skalarprodukt"
  | "eq:der-bias-ist-der-approximationsfehler"
  | "eq:der-bias-ist-der-approximationsfehler-2"
  | "eq:die-b-splines-sind-eine-basis"
  | "eq:die-ersten-drei-stufen-fuer-vektor-zu"
  | "eq:die-gauss-elimination-liefert-eine-lu"
  | "eq:die-gradientenkette-eines-netzes"
  | "eq:die-iterierten-sind-aehnlich-zu-a"
  | "eq:die-qr-iteration-zerlegt-die-potenzen"
  | "eq:differenzierbarkeit"
  | "eq:dimension-des-spline-raums"
  | "eq:dimensionsreduktion-mit-matrix-sketching"
  | "eq:eckart-und-young-beste-approximation-von"
  | "eq:eine-box-beschraenkung"
  | "eq:eine-mse-obergrenze-im-multivariaten"
  | "eq:eine-mse-obergrenze-im-multivariaten-2"
  | "eq:elementarer-tensor-in-produktbasis"
  | "eq:eq-10-2-1"
  | "eq:eq-10-3-1"
  | "eq:eq-10-4-13"
  | "eq:eq-10-5-1"
  | "eq:eq-10-8-4"
  | "eq:eq-11-3-2"
  | "eq:eq-12-4-1"
  | "eq:eq-12-4-4"
  | "eq:eq-12-4-7"
  | "eq:eq-12-6-1"
  | "eq:eq-13-5-2"
  | "eq:eq-13-5-3"
  | "eq:eq-13-7-2"
  | "eq:eq-13-8-7"
  | "eq:eq-4-1-1"
  | "eq:eq-5-3-1"
  | "eq:eq-5-4-2"
  | "eq:eq-6-1-1"
  | "eq:eq-6-1-2"
  | "eq:eq-6-2-1"
  | "eq:eq-6-3-1"
  | "eq:eq-6-3-2"
  | "eq:eq-8-1-1"
  | "eq:eq-8-4-1"
  | "eq:eq-9-2-1"
  | "eq:eq-9-4-3"
  | "eq:erweiterte-knotenfolge-und-b-splines"
  | "eq:erweiterte-knotenfolge-und-b-splines-2"
  | "eq:fehler-der-stueckweise-linearen"
  | "eq:fixpunktform"
  | "eq:fixpunktiteration-erster-ordnung"
  | "eq:frechet-ableitung"
  | "eq:gauss-elimination-mit-partieller"
  | "eq:gemittelte-varianz-eines-linearen"
  | "eq:gemittelte-varianz-eines-linearen-2"
  | "eq:generalisierte-kreuzvalidierung"
  | "eq:gestalt-aller-interpolanten"
  | "eq:glaettung-ist-ein-lineares-kleinste"
  | "eq:glaettung-ist-ein-lineares-kleinste-2"
  | "eq:gradient-der-quadratischen-form"
  | "eq:gradient-des-logistischen-verlusts"
  | "eq:gradient-des-logistischen-verlusts-2"
  | "eq:gradient-gradientenabstieg"
  | "eq:gradienten-der-completion"
  | "eq:gradientenabstieg-auf-einer-quadrik"
  | "eq:gradientenabstieg-mit-heavy-ball"
  | "eq:identitaeten-fuer-matrix-zu-skalar"
  | "eq:identitaeten-fuer-matrix-zu-skalar-2"
  | "eq:identitaeten-fuer-matrix-zu-skalar-3"
  | "eq:identitaeten-fuer-skalar-zu-matrix"
  | "eq:identitaeten-fuer-skalar-zu-matrix-2"
  | "eq:identitaeten-fuer-skalar-zu-matrix-3"
  | "eq:interpolationsproblem"
  | "eq:jacobimatrix-eines-relu-layers"
  | "eq:jensen-ungleichung"
  | "eq:k-mal-frechet-differenzierbar"
  | "eq:kettenregel"
  | "eq:kettenregel-fuer-jacobimatrizen"
  | "eq:konvergenz-der-korrekturiteration"
  | "eq:konvergenzrate-bei-konvexem-f"
  | "eq:konvergenzrate-bei-starker-konvexitaet"
  | "eq:konvergenzrate-der-fixpunktiteration"
  | "eq:konvexe-funktionen-von-vektoren-zu"
  | "eq:konvexe-huelle-als-durchschnitt"
  | "eq:konvexitaet-als-ungleichung"
  | "eq:korrekturiteration"
  | "eq:kriterium-des-stumpfen-winkels"
  | "eq:kruemmungsfunktional"
  | "eq:linearitaet-der-ableitungsoperation"
  | "eq:lipschitz-stetiger-gradient-und-die"
  | "eq:lokales-und-globales-minimum"
  | "eq:modell-designmatrix-schaetzer"
  | "eq:moore-penrose-pseudoinverse"
  | "eq:nelder-mead-gradient-gradientenabstieg"
  | "eq:newton-raphson-verfahren"
  | "eq:newton-raphson-verfahren-fuer"
  | "eq:newton-verfahren-fuer-die-optimierung"
  | "eq:notwendige-bedingung-erster-ordnung"
  | "eq:optimieren-heisst-gleichungen-loesen"
  | "eq:penalisiertes-kleinste-quadrate"
  | "eq:problem-normalengleichungen"
  | "eq:produktregel"
  | "eq:projektionstheorem"
  | "eq:quasi-newton-schritt"
  | "eq:rang-k-approximation"
  | "eq:rechte-und-linke-singulaervektoren"
  | "eq:reduzierte-darstellung"
  | "eq:regressionsmodell-mit-additivem-fehler"
  | "eq:richtungsableitung"
  | "eq:ridge-regression"
  | "eq:separierbare-kovarianz"
  | "eq:singulaerwertzerlegung"
  | "eq:singulaerwertzerlegung-2"
  | "eq:spektralnorm-und-groesster-singulaerwert"
  | "eq:stochastischer-gradientenabstieg-sgd"
  | "eq:streckung-als-quadratische-form"
  | "eq:strikte-konvexitaet"
  | "eq:subgradient-und-subdifferential"
  | "eq:summenform-der-svd"
  | "eq:svd-loesung-des-kq-problems"
  | "eq:taylorapproximation-fuer-vektor-zu"
  | "eq:taylorentwicklung-i"
  | "eq:taylorentwicklung-i-2"
  | "eq:taylorentwicklung-ii"
  | "eq:taylorpolynom"
  | "eq:tensor-produkt-basis"
  | "eq:tensorprodukt"
  | "eq:tensorprodukt-von-vektorraeumen"
  | "eq:tensorproduktbasis"
  | "eq:vektorisierung-eines-matrixprodukts"
  | "eq:voller-spaltenrang-eine-geschlossene"
  | "eq:was-die-reduzierte-form-spart-und-was"
  | "eq:was-sattelpunkte-fuer-die-verfahren"
  | "eq:zahl-der-iterationen"
  | "eq:zerlegung-des-mittleren-quadratischen"
  | "eq:zu-klein-zu-gross-gerade-richtig"
  | "eq:zufaellige-einbettung-eines-festen"
  | "eq:zufaellige-einbettung-eines-festen-2"
  | "eq:zufaellige-einbettung-eines-festen-3"
  | "eq:zwei-bedeutungen-zwei-zeichen"
  | "kap:algos"
  | "kap:differentialrechnung"
  | "kap:fehler"
  | "kap:funktionsapproximation"
  | "kap:intro"
  | "kap:konvexitaet"
  | "kap:kq"
  | "kap:la-misc"
  | "kap:lgs"
  | "kap:matrix-spur-norm"
  | "kap:optim"
  | "kap:svd"
  | "kap:tensoren"
  | "korollar:a-a-ist-orthogonal-diagonalisierbar"
  | "korollar:der-natuerliche-kubische-spline-ist-der"
  | "korollar:lineare-abbildungen-sind-ihre-eigene"
  | "korollar:skalarprodukte-bleiben-erhalten"
  | "korollar:spezialfaelle"
  | "korollar:spezialfaelle-der-schatten-p-norm"
  | "korollar:taylorapproximation-fuer-vektor-zu"
  | "korollar:zahl-der-iterationen"
  | "korollar:zu-viele-nullstellen-erzwingen-das"
  | "lemma:die-matrix-der-linearen-naeherung"
  | "lemma:fehlerschranken"
  | "lemma:kondition-der-differenz"
  | "lemma:qr-eigenschaften-von-orthogonalmatrizen"
  | "lemma:rechenregeln-fuer-landau-symbole"
  | "lemma:rekurrenz-der-aufrufzahl"
  | "satz:ableitung-als-lineare-approximation"
  | "satz:aehnliche-matrizen-haben-dieselben"
  | "satz:alle-matrixnormen-sind-aequivalent"
  | "satz:approximationsfehler-kubischer-splines"
  | "satz:aufwand-der-matrix-vektor-multiplikation"
  | "satz:bedingungen-erster-und-zweiter-ordnung"
  | "satz:charakterisierung-der-fundamentalen"
  | "satz:cholesky-zerlegung"
  | "satz:darstellung-multilinearer-abbildungen"
  | "satz:das-bfgs-update-erfuellt-die"
  | "satz:das-interpolationsproblem-ist-ein"
  | "satz:das-tensorprodukt-ist-bilinear"
  | "satz:der-bias-ist-der-approximationsfehler"
  | "satz:der-gradient-einer-zufaellig-gezogenen"
  | "satz:der-raum-aller-tensoren-eines-formats"
  | "satz:die-b-splines-sind-eine-basis"
  | "satz:die-ersten-drei-stufen-fuer-vektor-zu"
  | "satz:die-gauss-elimination-liefert-eine-lu"
  | "satz:die-iterierten-sind-aehnlich-zu-a"
  | "satz:die-minimalstellen-bilden-eine-konvexe"
  | "satz:die-positiv-semidefiniten-matrizen"
  | "satz:die-qr-iteration-zerlegt-die-potenzen"
  | "satz:dimension-des-spline-raums"
  | "satz:eckart-und-young-beste-approximation-von"
  | "satz:eigenschaften-der-pseudoinversen"
  | "satz:eigenschaften-der-spur"
  | "satz:eigenschaften-des-aeusseren-produkts"
  | "satz:eigenschaften-von-a-a"
  | "satz:eigenschaften-von-splines-und-b-splines"
  | "satz:eindeutige-loesung-bei-vollem"
  | "satz:eine-mse-obergrenze-im-multivariaten"
  | "satz:erste-und-zweite-ableitung-in"
  | "satz:existenz-der-lu-zerlegung"
  | "satz:existenz-und-eindeutigkeit-der"
  | "satz:existenz-und-eindeutigkeit-einer"
  | "satz:existenz-von-subgradienten-im-inneren"
  | "satz:exponentielle-laufzeit-der-naiven"
  | "satz:fehler-der-stueckweise-linearen"
  | "satz:fehlerfortpflanzung-in-einer-komposition"
  | "satz:frobenius-norm-ueber-die-spur"
  | "satz:frobenius-norm-und-spur"
  | "satz:fundamentalsatz-der-algebra"
  | "satz:gemittelte-varianz-eines-linearen"
  | "satz:gestalt-aller-interpolanten"
  | "satz:glaettung-ist-ein-lineares-kleinste"
  | "satz:gradient-der-quadratischen-form"
  | "satz:gradienten-der-completion"
  | "satz:gradientenabstieg-auf-einer-quadrik"
  | "satz:hesse-kriterium-fuer-kritische-punkte"
  | "satz:hoechstens-eine-minimalstelle"
  | "satz:identitaeten-fuer-matrix-zu-skalar"
  | "satz:identitaeten-fuer-skalar-zu-matrix"
  | "satz:induzierte-p-normen"
  | "satz:jacobimatrizen-der-grundbausteine"
  | "satz:jede-matrix-ist-eine-kurze-summe"
  | "satz:jede-norm-ist-konvex"
  | "satz:jensen-ungleichung"
  | "satz:karush-kuhn-tucker-bedingungen"
  | "satz:kettenregel"
  | "satz:kettenregel-fuer-jacobimatrizen"
  | "satz:kkt-und-konvexitaet"
  | "satz:komplexitaet-der-iterativen-variante"
  | "satz:komplexitaet-der-lu-zerlegung"
  | "satz:kondition-der-loesung-eines-lgs"
  | "satz:konvergenz-der-korrekturiteration"
  | "satz:konvergenz-der-potenzmethode"
  | "satz:konvergenzrate-bei-konvexem-f"
  | "satz:konvergenzrate-bei-starker-konvexitaet"
  | "satz:konvergenzrate-der-fixpunktiteration"
  | "satz:konvexe-funktionen-von-vektoren-zu"
  | "satz:konvexe-huelle-als-durchschnitt"
  | "satz:konvexe-mengen-enthalten-alle"
  | "satz:konvexitaet-als-ungleichung"
  | "satz:konvexitaet-und-positive-semidefinitheit"
  | "satz:konvexitaetserhaltung"
  | "satz:konvexkombinationen-zweier-vektoren"
  | "satz:kovarianz-unter-dem-cholesky-faktor"
  | "satz:kq-loesung-als-projektion"
  | "satz:kq-loesung-ueber-die-qr-zerlegung"
  | "satz:kriterium-des-stumpfen-winkels"
  | "satz:kritischer-punkt-und-globales-minimum"
  | "satz:kubische-splines-haben-minimale"
  | "satz:lineare-ziele-und-extrempunkte"
  | "satz:linearitaet-der-ableitungsoperation"
  | "satz:notwendige-bedingung-erster-ordnung"
  | "satz:notwendige-bedingung-von-lagrange"
  | "satz:operationen-die-konvexitaet-erhalten"
  | "satz:operatornormen-sind-submultiplikativ"
  | "satz:orthogonalitaet-der-singulaervektoren"
  | "satz:problem-normalengleichungen"
  | "satz:produktregel"
  | "satz:projektionstheorem"
  | "satz:quadratische-funktionen"
  | "satz:reduzierte-darstellung"
  | "satz:richtung-des-staerksten-anstiegs"
  | "satz:rueckwaertsfehler-beim-linearen"
  | "satz:satz-3-2-4"
  | "satz:satz-7-2-3"
  | "satz:satz-von-schwarz"
  | "satz:schrittzahl-der-bisektion"
  | "satz:singulaerwertzerlegung"
  | "satz:spektralnorm-und-groesster-singulaerwert"
  | "satz:spektralnorm-und-spektralzerlegung"
  | "satz:spur-als-summe-der-eigenwerte"
  | "satz:stetigkeit-aus-differenzierbarkeit"
  | "satz:stoerung-der-designmatrix-erste-ordnung"
  | "satz:streckung-als-quadratische-form"
  | "satz:summenform-der-svd"
  | "satz:svd-loesung-des-kq-problems"
  | "satz:symmetrie-und-orthogonalitaet"
  | "satz:taylorentwicklung-i"
  | "satz:taylorentwicklung-ii"
  | "satz:tensorproduktbasis"
  | "satz:unitaere-invarianz"
  | "satz:vektorisierung-eines-matrixprodukts"
  | "satz:wahl-des-spiegelvektors"
  | "satz:wahl-von-c-und-s"
  | "satz:wann-k-zahlen-eine-funktion-festlegen"
  | "satz:wichtige-vertraeglichkeiten"
  | "satz:wie-sich-eine-datenaenderung-fortpflanzt"
  | "satz:zerlegung-des-mittleren-quadratischen"
  | "satz:zufaellige-einbettung-eines-festen"
  | "satz:zufallsrichtungen-stehen-fast-senkrecht"
  | "sec:absolute-und-relative-fehler"
  | "sec:algorithmenarten-in-ml-und-statistik"
  | "sec:algos/aufwand"
  | "sec:algos/fibonacci"
  | "sec:algos/fibonacci-komplexitaet"
  | "sec:algos/landau"
  | "sec:algos/probleme-algorithmen"
  | "sec:alternative-loesungswege-orthogonale"
  | "sec:anwendung-auf-den-dominanten-term"
  | "sec:aufgabe-die-kondition-einer-summe"
  | "sec:beispiel-fibonacci-zahlen"
  | "sec:beispiel-matrix-vektor-multiplikation"
  | "sec:beispiele"
  | "sec:das-cholesky-verfahren"
  | "sec:definition-und-erste-beispiele"
  | "sec:definition-und-interpretation"
  | "sec:der-vergleich-ordnung-schlaegt-konstante"
  | "sec:die-axiome"
  | "sec:die-drei-wichtigen-spezialfaelle"
  | "sec:die-frobenius-norm"
  | "sec:die-iterative-variante-linearer-aufwand"
  | "sec:die-naive-rekursion-exponentieller"
  | "sec:die-wichtigsten-operatornormen"
  | "sec:differentialrechnung/gradient"
  | "sec:differentialrechnung/hoehere-ableitungen"
  | "sec:differentialrechnung/jacobi"
  | "sec:differentialrechnung/linearisierung"
  | "sec:differentialrechnung/matrixableitungen"
  | "sec:differentialrechnung/produkt-kettenregel"
  | "sec:differentialrechnung/stetigkeit"
  | "sec:differentialrechnung/taylor"
  | "sec:differentialrechnung/zusammenfassung"
  | "sec:effizient-aber-moeglicherweise-instabil"
  | "sec:ein-warnbeispiel-der-kehrwert"
  | "sec:einschub-orthogonalmatrizen"
  | "sec:fehler/fehlermasse"
  | "sec:fehler/kondition"
  | "sec:fehler/stabilitaet"
  | "sec:fehler/zusammenfassung"
  | "sec:fehlermasse-und-fehlerschranken"
  | "sec:fehlerzerlegung"
  | "sec:fibonacci-selbsttest"
  | "sec:funktionsapproximation/approximation"
  | "sec:funktionsapproximation/approximationsfehler"
  | "sec:funktionsapproximation/basisdarstellung"
  | "sec:funktionsapproximation/bias-varianz"
  | "sec:funktionsapproximation/glaettung"
  | "sec:funktionsapproximation/minimale-kruemmung"
  | "sec:funktionsapproximation/multivariat"
  | "sec:funktionsapproximation/polynominterpolation"
  | "sec:funktionsapproximation/splines"
  | "sec:intro/landkarte"
  | "sec:intro/worum"
  | "sec:klein-o-und-gross-o"
  | "sec:komplexitaet-wie-skaliert-der-aufwand"
  | "sec:komplexitaetsklassen"
  | "sec:kondition-eines-linearen"
  | "sec:konditionszahlen"
  | "sec:konvexitaet/eigenschaften"
  | "sec:konvexitaet/konvexe-mengen"
  | "sec:konvexitaet/konvexe-optimierung"
  | "sec:konvexitaet/konvexkombinationen"
  | "sec:konvexitaet/projektion-konvexe-funktionen"
  | "sec:kq/givens-householder"
  | "sec:kq/kondition"
  | "sec:kq/normalengleichungen"
  | "sec:kq/problem"
  | "sec:kq/pseudoinverse"
  | "sec:kq/qr"
  | "sec:la-misc/anwendungen"
  | "sec:la-misc/eigenwerte"
  | "sec:la-misc/iterative-loeser"
  | "sec:la-misc/sketching"
  | "sec:la-misc/zusammenfassung"
  | "sec:landau-selbsttest"
  | "sec:lgs/cholesky"
  | "sec:lgs/grundlagen"
  | "sec:lgs/lgs"
  | "sec:lgs/lu"
  | "sec:lgs/zusammenfassung"
  | "sec:matrix-spur-norm/eigenschaften"
  | "sec:matrix-spur-norm/matrixnormen"
  | "sec:matrix-spur-norm/operatornormen"
  | "sec:matrix-spur-norm/schattennormen"
  | "sec:matrix-spur-norm/spur"
  | "sec:matrix-spur-norm/zusammenfassung"
  | "sec:matrixnormen-durch-vektorisierung"
  | "sec:matrixnormen-und-konditionierung"
  | "sec:normen-in-der-fehleranalyse"
  | "sec:normenaequivalenz"
  | "sec:optim/beschraenkt"
  | "sec:optim/nelder-mead-gradient"
  | "sec:optim/newton-sgd"
  | "sec:optim/nichtlineare-gleichungen"
  | "sec:optim/optim-in-r"
  | "sec:optim/optimalitaet"
  | "sec:rechenbeispiele"
  | "sec:rechenregeln"
  | "sec:rechenregeln-und-zyklische-vertauschung"
  | "sec:spektralnorm-und-spektralzerlegung"
  | "sec:spur-und-eigenwerte"
  | "sec:submultiplikativitaet"
  | "sec:svd/anwendungen"
  | "sec:svd/motivation"
  | "sec:svd/reduzierte-svd"
  | "sec:svd/singulaerwerte"
  | "sec:svd/zusammenfassung"
  | "sec:tensoren/multilinear"
  | "sec:tensoren/produkte"
  | "sec:tensoren/tensoren"
  | "sec:tensoren/tensorprodukt"
  | "sec:tensoren/zusammenfassung"
  | "sec:unitaere-invarianz"
  | "sec:vertraeglichkeit-von-normen"
  | "sec:vom-algorithmus-zum-programm"
  | "sec:von-eigenwerten-zu-singulaerwerten"
  | "sec:warum-matrixnormen"
  | "sec:warum-wir-niemals-invertieren"
  | "sec:was-elementweise-normen-nicht-sehen"
  | "sec:was-ist-ein-guter-algorithmus"
  | "sec:zeit-und-speicheraufwand";

/** [Nummer, Verweistext] je Schlüssel. */
export const NUMBERS: Record<NumKey, readonly [string, string]> = {
  "algorithmus:backtracking-liniensuche-nach-armijo": ["12.3.18", "Algorithmus 12.3.18"],
  "algorithmus:bisektionsverfahren": ["12.1.7", "Algorithmus 12.1.7"],
  "algorithmus:cholesky-verfahren-fuer-das-kq-problem": ["7.3.2", "Algorithmus 7.3.2"],
  "algorithmus:drei-klassische-wahlen-von-c": ["8.3.8", "Algorithmus 8.3.8"],
  "algorithmus:empfehlungen-ueber-eine-rang-k": ["6.4.11", "Algorithmus 6.4.11"],
  "algorithmus:fibonacci-schleifenbasiert": ["2.2.2", "Algorithmus 2.2.2"],
  "algorithmus:fixpunktiteration-erster-ordnung": ["12.1.15", "Algorithmus 12.1.15"],
  "algorithmus:gauss-elimination-mit-partieller": ["5.2.3", "Algorithmus 5.2.3"],
  "algorithmus:gradient-gradientenabstieg": ["10.2.10", "Algorithmus 10.2.10"],
  "algorithmus:gradientenabstieg-fuer-matrix-completion": ["10.4.13", "Algorithmus 10.4.13"],
  "algorithmus:gradientenabstieg-mit-heavy-ball": ["12.4.13", "Algorithmus 12.4.13"],
  "algorithmus:interpolation-durch-basisdarstellung": ["13.2.7", "Algorithmus 13.2.7"],
  "algorithmus:kompression-mit-der-svd": ["6.4.9", "Algorithmus 6.4.9"],
  "algorithmus:loesen-von-ax-b-mit-der-lu-zerlegung": ["5.3.7", "Algorithmus 5.3.7"],
  "algorithmus:nelder-mead-gradient-gradientenabstieg": ["12.3.4", "Algorithmus 12.3.4"],
  "algorithmus:nelder-mead-simplexverfahren": ["12.3.2", "Algorithmus 12.3.2"],
  "algorithmus:newton-raphson-verfahren": ["10.8.11", "Algorithmus 10.8.11"],
  "algorithmus:newton-raphson-verfahren-fuer": ["12.1.11", "Algorithmus 12.1.11"],
  "algorithmus:newton-verfahren-fuer-die-optimierung": ["12.4.1", "Algorithmus 12.4.1"],
  "algorithmus:polynominterpolation-in-der-monombasis": ["13.3.8", "Algorithmus 13.3.8"],
  "algorithmus:potenzmethode": ["8.1.2", "Algorithmus 8.1.2"],
  "algorithmus:qr-iteration": ["8.1.10", "Algorithmus 8.1.10"],
  "algorithmus:quasi-newton-schritt": ["12.4.8", "Algorithmus 12.4.8"],
  "algorithmus:sketching-fuer-ein-kq-problem": ["8.4.13", "Algorithmus 8.4.13"],
  "algorithmus:spaltenweise-auswertung": ["2.3.4", "Algorithmus 2.3.4"],
  "algorithmus:stochastischer-gradientenabstieg-sgd": ["12.4.16", "Algorithmus 12.4.16"],
  "beispiel:ableitung-von-f-x-a-xb": ["10.4.9", "Beispiel 10.4.9"],
  "beispiel:addition-und-multiplikation": ["2.4.5", "Beispiel 2.4.5"],
  "beispiel:aeusseres-produkt-zweier-vektoren": ["9.3.3", "Beispiel 9.3.3"],
  "beispiel:affine-funktionen": ["11.3.11", "Beispiel 11.3.11"],
  "beispiel:algorithmenarten-in-ml-und-statistik": ["2.2.4", "Beispiel 2.2.4"],
  "beispiel:alle-unterraeume-einer-rang-1-matrix": ["6.2.12", "Beispiel 6.2.12"],
  "beispiel:aufgabe-kondition-der-summe": ["4.2.8", "Beispiel 4.2.8"],
  "beispiel:auswahl-unter-einer-budgetschranke": ["11.2.15", "Beispiel 11.2.15"],
  "beispiel:basisdarstellung-konkret": ["13.2.10", "Beispiel 13.2.10"],
  "beispiel:beispiel-2-3-6": ["2.3.6", "Beispiel 2.3.6"],
  "beispiel:beispiel-2-4-3": ["2.4.3", "Beispiel 2.4.3"],
  "beispiel:beispiel-3-1-3": ["3.1.3", "Beispiel 3.1.3"],
  "beispiel:beispiel-3-3-8": ["3.3.8", "Beispiel 3.3.8"],
  "beispiel:beispiel-3-4-6": ["3.4.6", "Beispiel 3.4.6"],
  "beispiel:beispiel-7-3-6": ["7.3.3", "Beispiel 7.3.3"],
  "beispiel:bias-und-varianz-beim-sinusbeispiel": ["13.8.8", "Beispiel 13.8.8"],
  "beispiel:buckel-auf-dem-einheitsintervall": ["13.6.7", "Beispiel 13.6.7"],
  "beispiel:cholesky-zerlegung-einer-2-2-matrix": ["5.4.3", "Beispiel 5.4.3"],
  "beispiel:das-subdifferential-des-betrags": ["11.4.16", "Beispiel 11.4.16"],
  "beispiel:das-tensorprodukt-von-und": ["9.4.3", "Beispiel 9.4.3"],
  "beispiel:der-aufrufbaum-fuer-n-5": ["2.5.5", "Beispiel 2.5.5"],
  "beispiel:der-betrag-ist-konvex": ["11.3.10", "Beispiel 11.3.10"],
  "beispiel:der-einheitskreis-wird-zur-ellipse": ["6.1.2", "Beispiel 6.1.2"],
  "beispiel:der-erwartungswert-ist-eine": ["11.1.3", "Beispiel 11.1.3"],
  "beispiel:der-kehrwert-aufgeloest": ["4.2.5", "Beispiel 4.2.5"],
  "beispiel:der-simplex": ["11.2.6", "Beispiel 11.2.6"],
  "beispiel:der-standardsattel": ["12.2.9", "Beispiel 12.2.9"],
  "beispiel:der-umweg-ueber-a-a": ["6.5.2", "Beispiel 6.5.2"],
  "beispiel:diagonalisierung-durch-eine": ["8.1.8", "Beispiel 8.1.8"],
  "beispiel:die-betragsfunktion-am-nullpunkt": ["10.5.3", "Beispiel 10.5.3"],
  "beispiel:die-drei-wahlen-an-einem-2-2-system": ["8.3.9", "Beispiel 8.3.9"],
  "beispiel:die-einheitsmatrix-ist-kein-elementarer": ["9.4.5", "Beispiel 9.4.5"],
  "beispiel:die-ersten-6-fibonacci-zahlen": ["2.2.3", "Beispiel 2.2.3"],
  "beispiel:die-gestalt-von": ["6.2.14", "Beispiel 6.2.14"],
  "beispiel:die-grade-0-1-und-3": ["13.4.3", "Beispiel 13.4.3"],
  "beispiel:die-identitaet-an-2-2-matrizen": ["9.5.4", "Beispiel 9.5.4"],
  "beispiel:die-instabilitaet-in-r": ["4.3.7", "Beispiel 4.3.7"],
  "beispiel:die-jacobi-formel-an-einem": ["10.4.5", "Beispiel 10.4.5"],
  "beispiel:die-kettenregel-in-fuenf-bauformen": ["10.6.8", "Beispiel 10.6.8"],
  "beispiel:die-matrix-a-a-einer-3-2-matrix": ["6.2.3", "Beispiel 6.2.3"],
  "beispiel:die-maximumsnorm-ist-nicht": ["3.5.7", "Beispiel 3.5.7"],
  "beispiel:die-produktregel-in-vier-bauformen": ["10.6.4", "Beispiel 10.6.4"],
  "beispiel:die-tensorproduktbasis-von-p-p": ["9.4.9", "Beispiel 9.4.9"],
  "beispiel:die-varianz-ist-nicht-negativ": ["11.4.8", "Beispiel 11.4.8"],
  "beispiel:die-wurzel-aus-zwei": ["12.1.12", "Beispiel 12.1.12"],
  "beispiel:dieselbe-funktion-andere-koeffizienten": ["13.2.12", "Beispiel 13.2.12"],
  "beispiel:dimensionsreduktion-mit-matrix-sketching": ["8.4.14", "Beispiel 8.4.14"],
  "beispiel:drei-faktoren": ["9.4.4", "Beispiel 9.4.4"],
  "beispiel:drei-nullstellen-bei-grad-hoechstens": ["13.3.3", "Beispiel 13.3.3"],
  "beispiel:drei-punkte-auf-einer-geraden": ["13.3.7", "Beispiel 13.3.7"],
  "beispiel:drei-punkte-zwei-interpolanten": ["13.5.8", "Beispiel 13.5.8"],
  "beispiel:ein-bild-mit-659-512-pixeln": ["6.4.8", "Beispiel 6.4.8"],
  "beispiel:ein-dreieck-als-schnitt-dreier": ["11.2.12", "Beispiel 11.2.12"],
  "beispiel:ein-farbbild-als-tensor-der-stufe-3": ["9.2.7", "Beispiel 9.2.7"],
  "beispiel:ein-schlecht-konditioniertes-problem": ["1.1.2", "Beispiel 1.1.2"],
  "beispiel:ein-stapel-bilder-als-tensor-der-stufe-4": ["9.2.8", "Beispiel 9.2.8"],
  "beispiel:ein-zug-statt-vieler": ["12.4.6", "Beispiel 12.4.6"],
  "beispiel:eine-bilineare-abbildung-auf-r2-mal-r2": ["9.2.2", "Beispiel 9.2.2"],
  "beispiel:eine-bivariate-funktion-in-dieser-basis": ["9.4.10", "Beispiel 9.4.10"],
  "beispiel:eine-box-beschraenkung": ["12.5.9", "Beispiel 12.5.9"],
  "beispiel:eine-duenn-besetzte-bewertungsmatrix": ["6.4.10", "Beispiel 6.4.10"],
  "beispiel:eine-quadrik-ausgerechnet": ["11.3.14", "Beispiel 11.3.14"],
  "beispiel:explizite-aequivalenzkonstanten": ["3.5.2", "Beispiel 3.5.2"],
  "beispiel:feature-maps-eine-abbildung-von-tensoren": ["9.2.9", "Beispiel 9.2.9"],
  "beispiel:fehlermasse-fuer-vektoren": ["4.1.4", "Beispiel 4.1.4"],
  "beispiel:fehlerzerlegung-berechnung-von-e": ["4.1.6", "Beispiel 4.1.6"],
  "beispiel:fisher-information-im-bernoulli-modell": ["10.7.15", "Beispiel 10.7.15"],
  "beispiel:flaeche-eines-rechtecks": ["9.1.3", "Beispiel 9.1.3"],
  "beispiel:fortsetzung-die-pseudoinverse-der-rang-1": ["6.3.7", "Beispiel 6.3.7"],
  "beispiel:fortsetzung-loesen-mit-der-zerlegung": ["5.3.8", "Beispiel 5.3.8"],
  "beispiel:frechet-ableitung-von-f-x-x": ["10.1.7", "Beispiel 10.1.7"],
  "beispiel:fuenfzig-verrauschte-punkte": ["13.7.10", "Beispiel 13.7.10"],
  "beispiel:gauss-rademacher-subsampling": ["8.4.11", "Beispiel 8.4.11"],
  "beispiel:givens-rotation-beispiel": ["7.5.3", "Beispiel 7.5.3"],
  "beispiel:gleiche-frobenius-norm-voellig": ["3.2.6", "Beispiel 3.2.6"],
  "beispiel:grad-1-die-hutfunktionen": ["13.4.10", "Beispiel 13.4.10"],
  "beispiel:gradient-der-euklidischen-norm": ["10.6.11", "Beispiel 10.6.11"],
  "beispiel:gradient-des-logistischen-verlusts": ["10.6.9", "Beispiel 10.6.9"],
  "beispiel:gradient-einer-linearen-funktion": ["10.2.7", "Beispiel 10.2.7"],
  "beispiel:gradient-einer-quadratischen-form": ["10.6.5", "Beispiel 10.6.5"],
  "beispiel:gradient-einer-quadratischen-funktion": ["10.2.6", "Beispiel 10.2.6"],
  "beispiel:gradient-und-hesse-matrix-einer": ["10.7.7", "Beispiel 10.7.7"],
  "beispiel:gradientenabstieg-von-hand": ["12.3.6", "Beispiel 12.3.6"],
  "beispiel:hilbert-matrix-inverse-vs-loesen": ["5.2.2", "Beispiel 5.2.2"],
  "beispiel:householder-spiegelung-beispiel": ["7.5.8", "Beispiel 7.5.8"],
  "beispiel:i-n-k-s-ist-blockdiagonal": ["9.3.16", "Beispiel 9.3.16"],
  "beispiel:identitaet-in-wachsender-dimension": ["3.2.7", "Beispiel 3.2.7"],
  "beispiel:identitaetsmatrix": ["3.3.9", "Beispiel 3.3.9"],
  "beispiel:invertierbar-aber-keine-lu-zerlegung": ["5.3.6", "Beispiel 5.3.6"],
  "beispiel:jacobimatrix-eines-relu-layers": ["10.3.12", "Beispiel 10.3.12"],
  "beispiel:katastrophale-ausloeschung": ["2.1.3", "Beispiel 2.1.3"],
  "beispiel:kehrwert-nahe-null": ["4.2.1", "Beispiel 4.2.1"],
  "beispiel:kettenregel-fuer-die-beispielfunktion": ["12.6.3", "Beispiel 12.6.3"],
  "beispiel:kkt-stationaritaet-fuer-ridge": ["12.5.10", "Beispiel 12.5.10"],
  "beispiel:kleinste-quadrate-und-ridge": ["11.3.16", "Beispiel 11.3.16"],
  "beispiel:komplexitaet-matrixmultiplikation": ["1.1.1", "Beispiel 1.1.1"],
  "beispiel:konditionszahlen-der-groessenordnung": ["13.3.10", "Beispiel 13.3.10"],
  "beispiel:konvexe-huelle-dreier-punkte": ["11.1.10", "Beispiel 11.1.10"],
  "beispiel:kroneckerprodukt-zweier-kleiner-matrizen": ["9.3.13", "Beispiel 9.3.13"],
  "beispiel:kubischer-spline-durch-vier-punkte": ["13.4.7", "Beispiel 13.4.7"],
  "beispiel:lineare-regression": ["7.1.3", "Beispiel 7.1.3"],
  "beispiel:linearitaet-an-einem-zahlenbeispiel": ["10.5.7", "Beispiel 10.5.7"],
  "beispiel:logistische-regression-ist-ein-konvexes": ["11.4.12", "Beispiel 11.4.12"],
  "beispiel:lu-zerlegung-einer-3-3-matrix": ["5.3.4", "Beispiel 5.3.4"],
  "beispiel:matrix-vektor-multiplikation": ["2.3.2", "Beispiel 2.3.2"],
  "beispiel:matrizenmultiplikation-als-bilineare": ["9.1.6", "Beispiel 9.1.6"],
  "beispiel:minimieren-auf-einer-geraden": ["12.5.6", "Beispiel 12.5.6"],
  "beispiel:newton-auf-einer-nicht-quadratischen": ["12.4.4", "Beispiel 12.4.4"],
  "beispiel:offener-ball": ["11.2.4", "Beispiel 11.2.4"],
  "beispiel:optimierungsprobleme-in-statistik-und": ["12.1.4", "Beispiel 12.1.4"],
  "beispiel:potenzmethode-an-einer-2-2-matrix": ["8.1.5", "Beispiel 8.1.5"],
  "beispiel:probe-der-frobenius-identitaet": ["10.4.11", "Beispiel 10.4.11"],
  "beispiel:pseudoinverse-der-beispielmatrix": ["6.3.11", "Beispiel 6.3.11"],
  "beispiel:qr-iteration-an-der-beispielmatrix": ["8.1.15", "Beispiel 8.1.15"],
  "beispiel:qr-zerlegung-via-gram-schmidt": ["7.4.6", "Beispiel 7.4.6"],
  "beispiel:quadratische-funktionen-mit-dem": ["11.4.11", "Beispiel 11.4.11"],
  "beispiel:quadrieren-in-der-ebene": ["10.3.7", "Beispiel 10.3.7"],
  "beispiel:rangdefizientes-kq-problem": ["7.6.2", "Beispiel 7.6.2"],
  "beispiel:rechenbeispiel-regressionsgerade-durch": ["7.1.8", "Beispiel 7.1.8"],
  "beispiel:reduzierte-svd-einer-rang-1-matrix": ["6.3.4", "Beispiel 6.3.4"],
  "beispiel:richardson-iteration": ["8.3.11", "Beispiel 8.3.11"],
  "beispiel:ridge-regression": ["10.6.6", "Beispiel 10.6.6"],
  "beispiel:runge-1901": ["13.3.14", "Beispiel 13.3.14"],
  "beispiel:s-k-i-n-verteilt-die-eintraege": ["9.3.15", "Beispiel 9.3.15"],
  "beispiel:singulaervektoren-der-beispielmatrix": ["6.2.9", "Beispiel 6.2.9"],
  "beispiel:singulaerwerte-der-beispielmatrix": ["6.2.6", "Beispiel 6.2.6"],
  "beispiel:skalarprodukte-sind-bilinear": ["9.1.5", "Beispiel 9.1.5"],
  "beispiel:sketching-zweier-vektoren-mit-10-000": ["8.4.5", "Beispiel 8.4.5"],
  "beispiel:stochastic-gradient-descent": ["4.3.2", "Beispiel 4.3.2"],
  "beispiel:sylvester-gleichung-per-vec-trick": ["9.5.5", "Beispiel 9.5.5"],
  "beispiel:taylorapproximation-der": ["10.8.6", "Beispiel 10.8.6"],
  "beispiel:tensorprodukt-dreier-vektoren": ["9.3.10", "Beispiel 9.3.10"],
  "beispiel:uebung-das-punktweise-maximum": ["11.4.3", "Beispiel 11.4.3"],
  "beispiel:uebung-die-summe-zweier-konvexer": ["11.4.2", "Beispiel 11.4.2"],
  "beispiel:uebung-eine-2-3-matrixfunktion": ["10.4.3", "Beispiel 10.4.3"],
  "beispiel:vektorisierungsnormen": ["3.2.5", "Beispiel 3.2.5"],
  "beispiel:vereinfachung-eines-aufwandsausdrucks": ["2.4.6", "Beispiel 2.4.6"],
  "beispiel:verletzte-assoziativitaet": ["2.1.4", "Beispiel 2.1.4"],
  "beispiel:vier-interpolanten-durch-drei-punkte": ["13.1.7", "Beispiel 13.1.7"],
  "beispiel:vier-konvexe-verlustfunktionen": ["12.2.7", "Beispiel 12.2.7"],
  "beispiel:visualisierung": ["3.3.3", "Beispiel 3.3.3"],
  "beispiel:warum-der-satz-eine-schranke-ist-und": ["12.3.16", "Beispiel 12.3.16"],
  "beispiel:was-die-kriterien-in-unserem-datensatz": ["13.8.13", "Beispiel 13.8.13"],
  "beispiel:wie-senkrecht-ist-fast-senkrecht": ["8.4.3", "Beispiel 8.4.3"],
  "beispiel:zehn-basisfunktionen-je-variable": ["13.9.4", "Beispiel 13.9.4"],
  "beispiel:zielfunktionen-aus-bausteinen": ["11.4.5", "Beispiel 11.4.5"],
  "beispiel:zwei-algorithmen-fuer-die-varianz": ["4.3.5", "Beispiel 4.3.5"],
  "beispiel:zwei-ansatzraeume": ["13.2.6", "Beispiel 13.2.6"],
  "beispiel:zwei-orte-zwei-zeitpunkte": ["9.3.18", "Beispiel 9.3.18"],
  "beispiel:zwei-projektionen-die-wir-hinschreiben": ["11.3.4", "Beispiel 11.3.4"],
  "beispiel:zyklische-vertauschung-in-der-statistik": ["3.1.6", "Beispiel 3.1.6"],
  "bemerkung:aequivalenz-ist-nicht-gleichheit": ["3.5.3", "Bemerkung 3.5.3"],
  "bemerkung:allgemeine-dimension-und-was-sie-kostet": ["9.4.12", "Bemerkung 9.4.12"],
  "bemerkung:analysis-perspektive": ["7.1.6", "Bemerkung 7.1.6"],
  "bemerkung:anmerkungen-zur-methodenwahl": ["7.6.3", "Bemerkung 7.6.3"],
  "bemerkung:approximation-ueber-interpolation": ["13.1.5", "Bemerkung 13.1.5"],
  "bemerkung:arten-von-algorithmen": ["2.1.6", "Bemerkung 2.1.6"],
  "bemerkung:auch-die-auswertung-kostet": ["13.9.7", "Bemerkung 13.9.7"],
  "bemerkung:auch-null-ist-ein-zulaessiger": ["12.5.3", "Bemerkung 12.5.3"],
  "bemerkung:ausblick-andere-ableitungsbegriffe": ["10.1.8", "Bemerkung 10.1.8"],
  "bemerkung:ausblick-kleinste-quadrate": ["6.3.12", "Bemerkung 6.3.12"],
  "bemerkung:ausblick-normen-als-regularisierer": ["3.6.1", "Bemerkung 3.6.1"],
  "bemerkung:b-splines-in-r": ["13.4.12", "Bemerkung 13.4.12"],
  "bemerkung:bandstruktur-und-aufwand": ["13.4.14", "Bemerkung 13.4.14"],
  "bemerkung:beide-saetze-brauchen-zwei": ["12.2.6", "Bemerkung 12.2.6"],
  "bemerkung:beispiele-und-warum-die-schranke-selten": ["10.6.2", "Bemerkung 10.6.2"],
  "bemerkung:bemerkung-3-1-9": ["3.1.9", "Bemerkung 3.1.9"],
  "bemerkung:bemerkung-3-2-2": ["3.2.2", "Bemerkung 3.2.2"],
  "bemerkung:bemerkung-3-3-2": ["3.3.2", "Bemerkung 3.3.2"],
  "bemerkung:bemerkung-3-4-2": ["3.4.2", "Bemerkung 3.4.2"],
  "bemerkung:bemerkung-7-1-2": ["7.1.2", "Bemerkung 7.1.2"],
  "bemerkung:bemerkung-7-2-2": ["7.2.2", "Bemerkung 7.2.2"],
  "bemerkung:bemerkung-7-2-5": ["7.2.5", "Bemerkung 7.2.5"],
  "bemerkung:bemerkung-7-4-3": ["7.4.3", "Bemerkung 7.4.3"],
  "bemerkung:bemerkung-7-4-5": ["7.4.5", "Bemerkung 7.4.5"],
  "bemerkung:bilinear-und-eine-warnung": ["9.1.2", "Bemerkung 9.1.2"],
  "bemerkung:bisektion-robust-implementiert": ["12.1.9", "Bemerkung 12.1.9"],
  "bemerkung:cramer-rao-sauber-formuliert": ["10.7.16", "Bemerkung 10.7.16"],
  "bemerkung:das-dilemma-der-schrittweite": ["12.1.17", "Bemerkung 12.1.17"],
  "bemerkung:das-format-bleibt-erhalten": ["10.4.2", "Bemerkung 10.4.2"],
  "bemerkung:das-muster-hinter-dem-exponenten": ["13.6.6", "Bemerkung 13.6.6"],
  "bemerkung:das-optimum-liegt-oft-auf-der": ["12.5.2", "Bemerkung 12.5.2"],
  "bemerkung:das-vierfache-geometrisch-gelesen": ["9.1.4", "Bemerkung 9.1.4"],
  "bemerkung:das-wort-basisfunktion-traegt-eine": ["13.2.5", "Bemerkung 13.2.5"],
  "bemerkung:daten-oder-funktion": ["13.1.4", "Bemerkung 13.1.4"],
  "bemerkung:der-ableitungsterm-ist-ein-skalarprodukt": ["10.4.8", "Bemerkung 10.4.8"],
  "bemerkung:der-ausweg-orthogonalisierte-basen": ["13.3.11", "Bemerkung 13.3.11"],
  "bemerkung:der-bias-faellt-nicht-monoton": ["13.8.9", "Bemerkung 13.8.9"],
  "bemerkung:der-definitionsbereich-muss-mitspielen": ["11.3.7", "Bemerkung 11.3.7"],
  "bemerkung:der-gewinn-und-was-er-kostet": ["13.9.9", "Bemerkung 13.9.9"],
  "bemerkung:der-gradient-steht-senkrecht-auf-der": ["10.2.5", "Bemerkung 10.2.5"],
  "bemerkung:der-praktische-ausweg-gross-waehlen-und": ["13.8.14", "Bemerkung 13.8.14"],
  "bemerkung:die-aufgabe-ist-so-noch-entartet": ["13.7.3", "Bemerkung 13.7.3"],
  "bemerkung:die-drei-kernideen": ["8.5.1", "Bemerkung 8.5.1"],
  "bemerkung:die-drei-leeren-felder": ["10.9.3", "Bemerkung 10.9.3"],
  "bemerkung:die-dritte-ableitung-ist-ein-tensor": ["10.7.8", "Bemerkung 10.7.8"],
  "bemerkung:die-fuenf-kernkonzepte": ["6.5.1", "Bemerkung 6.5.1"],
  "bemerkung:die-gradientenkette-eines-netzes": ["10.3.10", "Bemerkung 10.3.10"],
  "bemerkung:die-kleinste-konvexe-obermenge": ["11.1.9", "Bemerkung 11.1.9"],
  "bemerkung:die-konditionszahl-einer-funktion": ["12.3.14", "Bemerkung 12.3.14"],
  "bemerkung:die-merkregel-und-ihre-kontraposition": ["10.5.4", "Bemerkung 10.5.4"],
  "bemerkung:die-parameterzaehlung-als-gegenprobe": ["13.4.5", "Bemerkung 13.4.5"],
  "bemerkung:die-qr-iteration-ist-eine-simultane": ["8.1.13", "Bemerkung 8.1.13"],
  "bemerkung:die-residuen-fallen-nicht-immer": ["13.7.11", "Bemerkung 13.7.11"],
  "bemerkung:die-svd-als-summe-aeusserer-produkte": ["9.3.5", "Bemerkung 9.3.5"],
  "bemerkung:die-zeilen-sind-gradienten": ["10.3.2", "Bemerkung 10.3.2"],
  "bemerkung:die-zweite-schreibweise": ["10.8.4", "Bemerkung 10.8.4"],
  "bemerkung:divergenz-schon-aber-nicht-monoton": ["13.3.15", "Bemerkung 13.3.15"],
  "bemerkung:drei-abbruchkriterien-und-ihre-grenzen": ["12.3.17", "Bemerkung 12.3.17"],
  "bemerkung:drei-aussagen-die-auseinanderzuhalten": ["11.5.6", "Bemerkung 11.5.6"],
  "bemerkung:drei-auswege": ["13.8.10", "Bemerkung 13.8.10"],
  "bemerkung:drei-feinheiten-zum-satz": ["11.2.11", "Bemerkung 11.2.11"],
  "bemerkung:drei-kriterien-fuer-die-wahl-von-k": ["6.4.6", "Bemerkung 6.4.6"],
  "bemerkung:drei-lesarten-desselben-schritts": ["12.3.5", "Bemerkung 12.3.5"],
  "bemerkung:drei-nachtraege-zu-satz-10-2-8": ["10.2.9", "Bemerkung 10.2.9"],
  "bemerkung:drei-stellschrauben-drei-wirkungen": ["13.9.13", "Bemerkung 13.9.13"],
  "bemerkung:drei-vorbehalte": ["10.8.12", "Bemerkung 10.8.12"],
  "bemerkung:ebene-und-quadrik": ["10.8.10", "Bemerkung 10.8.10"],
  "bemerkung:eigenschaften-kosten-und-l-bfgs": ["12.4.11", "Bemerkung 12.4.11"],
  "bemerkung:eigenwerte-als-kruemmungen": ["11.4.13", "Bemerkung 11.4.13"],
  "bemerkung:eigenwerte-aufwand": ["8.1.17", "Bemerkung 8.1.17"],
  "bemerkung:ein-ausweg-die-knoten-anders-legen": ["13.3.16", "Bemerkung 13.3.16"],
  "bemerkung:ein-fester-vektor-ist-nicht-jeder-vektor": ["8.4.10", "Bemerkung 8.4.10"],
  "bemerkung:ein-gewichteter-durchschnitt": ["11.1.2", "Bemerkung 11.1.2"],
  "bemerkung:ein-haeufiges-missverstaendnis": ["13.3.6", "Bemerkung 13.3.6"],
  "bemerkung:eine-analogie": ["2.2.5", "Bemerkung 2.2.5"],
  "bemerkung:eine-feinheit": ["9.4.8", "Bemerkung 9.4.8"],
  "bemerkung:eine-landkarte-der-optimierungsprobleme": ["11.5.7", "Bemerkung 11.5.7"],
  "bemerkung:eine-vorschrift-zwei-spalten": ["12.4.3", "Bemerkung 12.4.3"],
  "bemerkung:einsetzen-ist-hier-nicht": ["13.2.11", "Bemerkung 13.2.11"],
  "bemerkung:es-bleibt-ein-lineares-kleinste-quadrate": ["13.9.3", "Bemerkung 13.9.3"],
  "bemerkung:existenz-die-abzaehlung-geht-auf": ["13.5.7", "Bemerkung 13.5.7"],
  "bemerkung:extrempunkt-zu-sein-ist-keine": ["11.1.8", "Bemerkung 11.1.8"],
  "bemerkung:falsche-konvergenz-und-keiner-warnt": ["12.6.2", "Bemerkung 12.6.2"],
  "bemerkung:faustregel-mit-der-einschraenkung-aus": ["4.4.1", "Bemerkung 4.4.1"],
  "bemerkung:fehler-mal-merkmal": ["10.6.10", "Bemerkung 10.6.10"],
  "bemerkung:fehlermasse-verwendete-vorkenntnisse": ["4.1.1", "Bemerkung 4.1.1"],
  "bemerkung:fixpunktform": ["8.3.4", "Bemerkung 8.3.4"],
  "bemerkung:fuenf-bausteine-die-bleiben": ["11.5.8", "Bemerkung 11.5.8"],
  "bemerkung:fuenf-begriffe-die-bleiben": ["10.9.1", "Bemerkung 10.9.1"],
  "bemerkung:fuenf-spezialfaelle-derselben-aussage": ["10.5.6", "Bemerkung 10.5.6"],
  "bemerkung:fuer-ein-lgs-keine-explizite-inverse": ["5.2.1", "Bemerkung 5.2.1"],
  "bemerkung:gesamtaufwand": ["8.3.10", "Bemerkung 8.3.10"],
  "bemerkung:gewichte-als-wahrscheinlichkeiten": ["11.4.7", "Bemerkung 11.4.7"],
  "bemerkung:givens-householder-aufwand": ["7.5.10", "Bemerkung 7.5.10"],
  "bemerkung:golden-section-search": ["12.6.1", "Bemerkung 12.6.1"],
  "bemerkung:grenzen-des-rechnens": ["2.1.2", "Bemerkung 2.1.2"],
  "bemerkung:gross-o-und-klein-o-fuer-kleine": ["10.5.1", "Bemerkung 10.5.1"],
  "bemerkung:hauptidee-der-randomisierung": ["8.4.1", "Bemerkung 8.4.1"],
  "bemerkung:heuristisches-balance-modell-fuer-die": ["13.8.7", "Bemerkung 13.8.7"],
  "bemerkung:hinreichend-aber-nicht-notwendig": ["12.1.6", "Bemerkung 12.1.6"],
  "bemerkung:hoeher-ist-nicht-automatisch-besser": ["10.8.5", "Bemerkung 10.8.5"],
  "bemerkung:hoehere-ableitungen-wie-die-definition-zu-lesen-ist": ["10.7.2", "Bemerkung 10.7.2"],
  "bemerkung:ideale-situationen-fuer-die-svd": ["6.4.14", "Bemerkung 6.4.14"],
  "bemerkung:inneres-und-aeusseres-produkt": ["9.3.2", "Bemerkung 9.3.2"],
  "bemerkung:interpolation-im-maschinellen-lernen-und": ["13.1.6", "Bemerkung 13.1.6"],
  "bemerkung:interpretation": ["4.2.4", "Bemerkung 4.2.4"],
  "bemerkung:interpretation-der-komplexitaetsklassen": ["2.3.7", "Bemerkung 2.3.7"],
  "bemerkung:interpretation-der-konditionszahl": ["3.5.12", "Bemerkung 3.5.12"],
  "bemerkung:jede-voraussetzung-wird-gebraucht": ["11.3.2", "Bemerkung 11.3.2"],
  "bemerkung:komplementaritaet-bindet-oder": ["12.5.8", "Bemerkung 12.5.8"],
  "bemerkung:kondition-der-grundoperationen": ["5.1.1", "Bemerkung 5.1.1"],
  "bemerkung:kondition-konditionszahl-einer-matrix": ["4.2.7", "Bemerkung 4.2.7"],
  "bemerkung:kondition-von-eigenwertproblemen": ["8.1.16", "Bemerkung 8.1.16"],
  "bemerkung:konditionszahlen-eine-groessenordnung": ["13.4.13", "Bemerkung 13.4.13"],
  "bemerkung:kovarianzmatrizen-sind-mittel-aeusserer": ["9.3.6", "Bemerkung 9.3.6"],
  "bemerkung:kovarianzmatrizen-sind-semidefinit-nicht": ["11.2.9", "Bemerkung 11.2.9"],
  "bemerkung:kreis-gegen-raute-warum-lasso-nullen": ["12.5.11", "Bemerkung 12.5.11"],
  "bemerkung:kronecker-designmatrix-tensorprodukt-splines": ["9.4.13", "Bemerkung 9.4.13"],
  "bemerkung:linearisierung-wie-die-definition-zu-lesen-ist": ["10.1.6", "Bemerkung 10.1.6"],
  "bemerkung:lipschitz-stetiger-gradient-und-die": ["12.3.9", "Bemerkung 12.3.9"],
  "bemerkung:maximieren-ist-minimieren": ["12.2.2", "Bemerkung 12.2.2"],
  "bemerkung:merkregel": ["7.3.1", "Bemerkung 7.3.1"],
  "bemerkung:merkregel-drehen-strecken-drehen": ["6.2.15", "Bemerkung 6.2.15"],
  "bemerkung:merkregel-ein-lgs-zwei-dreieckssysteme": ["5.3.2", "Bemerkung 5.3.2"],
  "bemerkung:modell-designmatrix-schaetzer": ["13.8.1", "Bemerkung 13.8.1"],
  "bemerkung:multivariat-kernkonzepte-des-kapitels": ["13.9.12", "Bemerkung 13.9.12"],
  "bemerkung:namensgeber-und-anwendung": ["3.4.8", "Bemerkung 3.4.8"],
  "bemerkung:newton-bei-nicht-konvexen-funktionen": ["12.4.5", "Bemerkung 12.4.5"],
  "bemerkung:notation": ["6.1.4", "Bemerkung 6.1.4"],
  "bemerkung:nuklearnorm-und-niedrigrang-probleme": ["3.4.5", "Bemerkung 3.4.5"],
  "bemerkung:operatornorm-hilfsungleichung": ["3.5.6", "Bemerkung 3.5.6"],
  "bemerkung:operatornormen-eigenschaften-von-orthogonalmatrizen": ["3.3.6", "Bemerkung 3.3.6"],
  "bemerkung:optim-in-r-kernkonzepte-des-kapitels": ["12.6.4", "Bemerkung 12.6.4"],
  "bemerkung:optimieren-heisst-gleichungen-loesen": ["12.2.5", "Bemerkung 12.2.5"],
  "bemerkung:penalized-splines-und-die-naehe-zu-ridge": ["13.7.14", "Bemerkung 13.7.14"],
  "bemerkung:praxisrelevanz-der-hesse-matrix": ["10.7.13", "Bemerkung 10.7.13"],
  "bemerkung:quadratische-konvergenz": ["12.1.13", "Bemerkung 12.1.13"],
  "bemerkung:radiale-basisfunktionen": ["13.9.11", "Bemerkung 13.9.11"],
  "bemerkung:rand-und-inneres-an-den-gewichten": ["11.1.11", "Bemerkung 11.1.11"],
  "bemerkung:randpunkte-und-wozu-subgradienten-gut": ["11.4.17", "Bemerkung 11.4.17"],
  "bemerkung:rauschen-mini-batches-und-lernraten": ["12.4.17", "Bemerkung 12.4.17"],
  "bemerkung:rechenaufwand": ["6.4.15", "Bemerkung 6.4.15"],
  "bemerkung:rechenregeln-aus-der-bilinearitaet": ["9.4.2", "Bemerkung 9.4.2"],
  "bemerkung:reparatur-die-gesamtnorm": ["3.5.8", "Bemerkung 3.5.8"],
  "bemerkung:schranke-und-messung-sind-zweierlei": ["13.6.8", "Bemerkung 13.6.8"],
  "bemerkung:sechs-begriffe-die-bleiben": ["9.5.1", "Bemerkung 9.5.1"],
  "bemerkung:singulaervektoren-sind-nicht-eindeutig": ["6.2.10", "Bemerkung 6.2.10"],
  "bemerkung:singulaerwerte-sind-streckungsfaktoren": ["6.2.5", "Bemerkung 6.2.5"],
  "bemerkung:spline": ["13.5.2", "Bemerkung 13.5.2"],
  "bemerkung:spur-verwendete-vorkenntnisse": ["3.1.1", "Bemerkung 3.1.1"],
  "bemerkung:stabilitaet-des-cholesky-verfahrens": ["7.3.4", "Bemerkung 7.3.4"],
  "bemerkung:stabilitaet-und-kondition-ausblick": ["4.1.5", "Bemerkung 4.1.5"],
  "bemerkung:staerken-schwaechen-ausblick": ["6.4.13", "Bemerkung 6.4.13"],
  "bemerkung:stoerungsanalyse-als-richtungsableitung": ["10.9.4", "Bemerkung 10.9.4"],
  "bemerkung:struktur-ausnutzen": ["5.3.10", "Bemerkung 5.3.10"],
  "bemerkung:stufe-und-dimension-sind-zwei": ["9.2.6", "Bemerkung 9.2.6"],
  "bemerkung:stufe-und-warum-eine-menge-es-nicht-tut": ["9.2.4", "Bemerkung 9.2.4"],
  "bemerkung:stufen-addieren-sich-eintraege": ["9.3.8", "Bemerkung 9.3.8"],
  "bemerkung:taxonomie-nach-ableitungsordnung": ["12.3.1", "Bemerkung 12.3.1"],
  "bemerkung:transponieren-und-reihenfolge": ["9.3.14", "Bemerkung 9.3.14"],
  "bemerkung:typische-singulaerwert-verlaeufe-und-der": ["6.4.7", "Bemerkung 6.4.7"],
  "bemerkung:umkehrfunktionen-binaersuche-und-die": ["12.1.10", "Bemerkung 12.1.10"],
  "bemerkung:unendlich-viele-freiheitsgrade-endlich": ["13.2.2", "Bemerkung 13.2.2"],
  "bemerkung:unendlich-viele-loesungen": ["13.1.9", "Bemerkung 13.1.9"],
  "bemerkung:verwandtschaft-mit-dem-gradientenabstieg": ["8.3.2", "Bemerkung 8.3.2"],
  "bemerkung:vier-bausteine-die-bleiben": ["10.9.2", "Bemerkung 10.9.2"],
  "bemerkung:vier-staerken-auf-einen-blick": ["13.6.9", "Bemerkung 13.6.9"],
  "bemerkung:voller-spaltenrang-eine-geschlossene": ["6.3.10", "Bemerkung 6.3.10"],
  "bemerkung:von-der-koeffizientenfamilie-zur-matrix": ["9.2.1", "Bemerkung 9.2.1"],
  "bemerkung:von-der-nullstelle-zum-minimum": ["12.1.14", "Bemerkung 12.1.14"],
  "bemerkung:von-quadraten-zu-laengen-und-abstaenden": ["8.4.8", "Bemerkung 8.4.8"],
  "bemerkung:vorsicht-bei-den-ableitungen": ["13.4.16", "Bemerkung 13.4.16"],
  "bemerkung:vorsicht-konstanten": ["2.3.8", "Bemerkung 2.3.8"],
  "bemerkung:vorsicht-was-die-spur-nicht-kann": ["3.1.5", "Bemerkung 3.1.5"],
  "bemerkung:vorzeichenwahl": ["7.5.9", "Bemerkung 7.5.9"],
  "bemerkung:wann-die-designmatrix-vollen-spaltenrang": ["13.7.7", "Bemerkung 13.7.7"],
  "bemerkung:wann-die-potenzmethode-versagt": ["8.1.6", "Bemerkung 8.1.6"],
  "bemerkung:wann-givens": ["7.5.4", "Bemerkung 7.5.4"],
  "bemerkung:wann-sich-nelder-mead-lohnt": ["12.3.3", "Bemerkung 12.3.3"],
  "bemerkung:warum-ausgerechnet-der-eigenwert-1": ["8.2.1", "Bemerkung 8.2.1"],
  "bemerkung:warum-das-charakteristische-polynom-kein": ["8.1.1", "Bemerkung 8.1.1"],
  "bemerkung:warum-das-in-der-statistik-gebraucht": ["10.4.6", "Bemerkung 10.4.6"],
  "bemerkung:warum-das-mehr-ist-als-eine-notloesung": ["13.9.10", "Bemerkung 13.9.10"],
  "bemerkung:warum-der-nenner-noetig-ist": ["13.8.12", "Bemerkung 13.8.12"],
  "bemerkung:warum-der-symmetrische-anteil": ["11.3.13", "Bemerkung 11.3.13"],
  "bemerkung:warum-die-knotenfolge-so-lang-sein-muss": ["13.4.9", "Bemerkung 13.4.9"],
  "bemerkung:warum-die-menge-offen-und-konvex-sein": ["10.7.12", "Bemerkung 10.7.12"],
  "bemerkung:warum-die-momentenbedingung-an-der": ["8.4.7", "Bemerkung 8.4.7"],
  "bemerkung:warum-die-rueckrichtung-nicht-gilt": ["12.2.12", "Bemerkung 12.2.12"],
  "bemerkung:warum-die-spalten-fast-parallel-werden": ["13.3.9", "Bemerkung 13.3.9"],
  "bemerkung:warum-endlich-viele": ["11.1.6", "Bemerkung 11.1.6"],
  "bemerkung:warum-hier-die-integralform-steht": ["10.8.8", "Bemerkung 10.8.8"],
  "bemerkung:warum-in-gleichung-10-2-4-ein": ["10.2.11", "Bemerkung 10.2.11"],
  "bemerkung:warum-interpolation-das-rauschen-erbt": ["13.7.9", "Bemerkung 13.7.9"],
  "bemerkung:warum-iterativ-die-lanczos-abkuerzung": ["8.2.2", "Bemerkung 8.2.2"],
  "bemerkung:warum-newton-die-kondition-nicht-spuert": ["12.4.7", "Bemerkung 12.4.7"],
  "bemerkung:warum-statistik-und-ml-voll-davon-sind": ["10.8.13", "Bemerkung 10.8.13"],
  "bemerkung:warum-wir-trotzdem-mit-o-nmk-rechnen": ["5.1.2", "Bemerkung 5.1.2"],
  "bemerkung:was-daraus-folgt-und-was-nicht": ["11.5.2", "Bemerkung 11.5.2"],
  "bemerkung:was-das-in-zahlen-heisst": ["13.3.13", "Bemerkung 13.3.13"],
  "bemerkung:was-der-produktbau-bedeutet": ["9.4.11", "Bemerkung 9.4.11"],
  "bemerkung:was-der-satz-leistet-und-was-nicht": ["11.2.16", "Bemerkung 11.2.16"],
  "bemerkung:was-der-satz-liefert-und-was-nicht": ["6.4.5", "Bemerkung 6.4.5"],
  "bemerkung:was-der-satz-sagt-und-was-nicht": ["10.8.3", "Bemerkung 10.8.3"],
  "bemerkung:was-der-schritt-voraussetzt-und-wie-wir": ["12.4.2", "Bemerkung 12.4.2"],
  "bemerkung:was-der-schwung-bewirkt": ["12.4.14", "Bemerkung 12.4.14"],
  "bemerkung:was-der-strafterm-bewirkt": ["13.7.13", "Bemerkung 13.7.13"],
  "bemerkung:was-die-annahme-spart-und-was-sie-kostet": ["9.3.19", "Bemerkung 9.3.19"],
  "bemerkung:was-die-armijo-bedingung-fordert": ["12.3.19", "Bemerkung 12.3.19"],
  "bemerkung:was-die-bedingung-verlangt": ["11.2.2", "Bemerkung 11.2.2"],
  "bemerkung:was-die-faktoren-bedeuten": ["6.4.12", "Bemerkung 6.4.12"],
  "bemerkung:was-die-lokalitaet-praktisch-bedeutet": ["13.4.17", "Bemerkung 13.4.17"],
  "bemerkung:was-die-randterme-wirklich-brauchen": ["13.5.5", "Bemerkung 13.5.5"],
  "bemerkung:was-die-rate-ueber-datenmengen-sagt": ["13.9.6", "Bemerkung 13.9.6"],
  "bemerkung:was-die-reduzierte-form-spart-und-was": ["6.3.3", "Bemerkung 6.3.3"],
  "bemerkung:was-die-symmetrie-spart": ["10.7.5", "Bemerkung 10.7.5"],
  "bemerkung:was-die-varianzformel-erzaehlt": ["13.8.5", "Bemerkung 13.8.5"],
  "bemerkung:was-die-vier-regeln-zusammen-hergeben": ["11.4.4", "Bemerkung 11.4.4"],
  "bemerkung:was-die-zweite-kapitelhaelfte": ["13.5.1", "Bemerkung 13.5.1"],
  "bemerkung:was-eine-rate-der-ordnung-1-k-praktisch": ["12.3.11", "Bemerkung 12.3.11"],
  "bemerkung:was-folgt-daraus-und-was-nicht": ["4.3.4", "Bemerkung 4.3.4"],
  "bemerkung:was-hier-eigentlich-linear-ist": ["10.1.4", "Bemerkung 10.1.4"],
  "bemerkung:was-in-b-steckt-und-was-nicht": ["13.2.9", "Bemerkung 13.2.9"],
  "bemerkung:was-in-der-fehlerannahme-steckt": ["13.7.2", "Bemerkung 13.7.2"],
  "bemerkung:was-in-dieser-definition-steckt": ["13.4.2", "Bemerkung 13.4.2"],
  "bemerkung:was-iterative-verfahren-leisten": ["8.3.12", "Bemerkung 8.3.12"],
  "bemerkung:was-kapitel-9-dazu-schon-gesagt-hat": ["13.9.2", "Bemerkung 13.9.2"],
  "bemerkung:was-konvexitaet-aus-der-tabelle-macht": ["12.2.13", "Bemerkung 12.2.13"],
  "bemerkung:was-sattelpunkte-fuer-die-verfahren": ["12.2.10", "Bemerkung 12.2.10"],
  "bemerkung:was-wird-hier-eigentlich-berechnet": ["2.5.3", "Bemerkung 2.5.3"],
  "bemerkung:welche-zielgestalt-welches-verfahren": ["8.1.9", "Bemerkung 8.1.9"],
  "bemerkung:welcher-spline-die-konstante-traegt": ["13.6.4", "Bemerkung 13.6.4"],
  "bemerkung:wenn-die-hesse-matrix-nichts-entscheidet": ["10.7.10", "Bemerkung 10.7.10"],
  "bemerkung:wenn-es-keine-eindeutige-tangente-gibt": ["10.1.2", "Bemerkung 10.1.2"],
  "bemerkung:wie-die-kette-ausgewertet-wird": ["10.3.13", "Bemerkung 10.3.13"],
  "bemerkung:wie-die-tabelle-zu-lesen-ist": ["12.4.12", "Bemerkung 12.4.12"],
  "bemerkung:wie-lesen-wir-das": ["4.2.3", "Bemerkung 4.2.3"],
  "bemerkung:wie-schlimm-ist-es-wirklich": ["2.5.7", "Bemerkung 2.5.7"],
  "bemerkung:wie-stark-die-flaeche-verzerrt-wird": ["10.3.8", "Bemerkung 10.3.8"],
  "bemerkung:wie-wir-das-system-wirklich-loesen": ["13.7.6", "Bemerkung 13.7.6"],
  "bemerkung:wie-wir-die-schranke-lesen": ["13.6.3", "Bemerkung 13.6.3"],
  "bemerkung:wie-wir-die-ungleichung-lesen": ["11.3.9", "Bemerkung 11.3.9"],
  "bemerkung:wo-die-diagonalisierung-aufhoert": ["6.1.1", "Bemerkung 6.1.1"],
  "bemerkung:wo-die-kette-aufhoert": ["10.3.11", "Bemerkung 10.3.11"],
  "bemerkung:wo-die-voraussetzungen-stecken": ["11.4.10", "Bemerkung 11.4.10"],
  "bemerkung:wo-skizzen-helfen": ["8.4.12", "Bemerkung 8.4.12"],
  "bemerkung:wogegen-die-qr-iteration-konvergiert": ["8.1.14", "Bemerkung 8.1.14"],
  "bemerkung:woran-die-ordnung-haengt": ["13.8.3", "Bemerkung 13.8.3"],
  "bemerkung:zaehlen-ist-konvention-die-ordnung-nicht": ["2.5.2", "Bemerkung 2.5.2"],
  "bemerkung:zeilenvektor-nicht-spaltenvektor": ["10.2.2", "Bemerkung 10.2.2"],
  "bemerkung:ziehen-aus-der-multivariaten": ["5.4.5", "Bemerkung 5.4.5"],
  "bemerkung:zu-klein-zu-gross-gerade-richtig": ["12.3.7", "Bemerkung 12.3.7"],
  "bemerkung:zum-bau-der-pseudoinversen": ["6.3.6", "Bemerkung 6.3.6"],
  "bemerkung:zur-identitaet-fuer-x-a": ["10.3.5", "Bemerkung 10.3.5"],
  "bemerkung:zwei-anforderungen-an-c": ["8.3.7", "Bemerkung 8.3.7"],
  "bemerkung:zwei-bedeutungen-zwei-zeichen": ["9.3.12", "Bemerkung 9.3.12"],
  "bemerkung:zwei-bedingungen-fehlen-randbedingungen": ["13.4.6", "Bemerkung 13.4.6"],
  "bemerkung:zwei-feinheiten-der-definition": ["2.4.2", "Bemerkung 2.4.2"],
  "bemerkung:zwei-nachtraege-zur-rechnung": ["8.4.15", "Bemerkung 8.4.15"],
  "bemerkung:zwei-probleme-ein-werkzeugkasten": ["12.1.3", "Bemerkung 12.1.3"],
  "bemerkung:zwei-regler-und-ihre-preise": ["8.5.2", "Bemerkung 8.5.2"],
  "bemerkung:zwei-schaetzungen-fuer-den-eigenwert": ["8.1.3", "Bemerkung 8.1.3"],
  "definition:ableitung-einer-matrixwertigen-funktion": ["10.4.1", "Definition 10.4.1"],
  "definition:ableitung-nach-einer-matrix": ["10.4.7", "Definition 10.4.7"],
  "definition:additives-modell": ["13.9.8", "Definition 13.9.8"],
  "definition:aeusseres-produkt": ["9.3.1", "Definition 9.3.1"],
  "definition:algorithmus": ["2.1.5", "Definition 2.1.5"],
  "definition:ansatzraum-basisdarstellung": ["13.2.3", "Definition 13.2.3"],
  "definition:ansatzraum-und-designmatrix": ["13.7.4", "Definition 13.7.4"],
  "definition:approximationsproblem": ["13.1.1", "Definition 13.1.1"],
  "definition:beschraenkte-bilineare-abbildung": ["10.6.1", "Definition 10.6.1"],
  "definition:beschraenktes-optimierungsproblem": ["12.5.1", "Definition 12.5.1"],
  "definition:bfgs-update": ["12.4.9", "Definition 12.4.9"],
  "definition:definition-7-2-1": ["7.2.1", "Definition 7.2.1"],
  "definition:der-vektorraum-der-funktionen": ["13.2.1", "Definition 13.2.1"],
  "definition:differenzierbarkeit": ["10.1.1", "Definition 10.1.1"],
  "definition:eigenschaften-konditionszahl-einer-matrix": ["3.5.11", "Definition 3.5.11"],
  "definition:epigraph": ["11.3.5", "Definition 11.3.5"],
  "definition:erweiterte-knotenfolge-und-b-splines": ["13.4.8", "Definition 13.4.8"],
  "definition:fehlermass": ["4.1.2", "Definition 4.1.2"],
  "definition:fibonacci-zahlen": ["2.2.1", "Definition 2.2.1"],
  "definition:fisher-informationsmatrix": ["10.7.14", "Definition 10.7.14"],
  "definition:frechet-ableitung": ["10.1.5", "Definition 10.1.5"],
  "definition:frobenius-norm": ["3.1.8", "Definition 3.1.8"],
  "definition:generalisierte-kreuzvalidierung": ["13.8.11", "Definition 13.8.11"],
  "definition:givens-rotation-definition": ["7.5.1", "Definition 7.5.1"],
  "definition:glaettungsproblem": ["13.1.3", "Definition 13.1.3"],
  "definition:gradient": ["10.2.1", "Definition 10.2.1"],
  "definition:hesse-matrix": ["10.7.3", "Definition 10.7.3"],
  "definition:householder-spiegelung-definition": ["7.5.5", "Definition 7.5.5"],
  "definition:interpolation-und-glaettung-im": ["13.7.8", "Definition 13.7.8"],
  "definition:interpolationsproblem": ["13.1.2", "Definition 13.1.2"],
  "definition:jacobimatrix": ["10.3.1", "Definition 10.3.1"],
  "definition:k-mal-frechet-differenzierbar": ["10.7.1", "Definition 10.7.1"],
  "definition:kleinste-quadrate-problem-kq-problem": ["7.1.1", "Definition 7.1.1"],
  "definition:komplexitaet": ["2.3.5", "Definition 2.3.5"],
  "definition:konditionszahl": ["4.2.2", "Definition 4.2.2"],
  "definition:konvexe-funktion": ["11.3.6", "Definition 11.3.6"],
  "definition:konvexe-huelle": ["11.1.5", "Definition 11.1.5"],
  "definition:konvexe-menge": ["11.2.1", "Definition 11.2.1"],
  "definition:konvexe-mengen-extrempunkt": ["11.2.5", "Definition 11.2.5"],
  "definition:konvexkombination": ["11.1.1", "Definition 11.1.1"],
  "definition:konvexkombinationen-extrempunkt": ["11.1.7", "Definition 11.1.7"],
  "definition:korrekturiteration": ["8.3.3", "Definition 8.3.3"],
  "definition:kroneckerprodukt": ["9.3.11", "Definition 9.3.11"],
  "definition:kruemmungsfunktional": ["13.5.3", "Definition 13.5.3"],
  "definition:lagrange-funktion": ["12.5.4", "Definition 12.5.4"],
  "definition:landau-symbole": ["2.4.1", "Definition 2.4.1"],
  "definition:lipschitz-stetigkeit": ["12.3.8", "Definition 12.3.8"],
  "definition:lokales-und-globales-minimum": ["12.2.1", "Definition 12.2.1"],
  "definition:lu-zerlegung": ["5.3.1", "Definition 5.3.1"],
  "definition:matrixnorm": ["3.2.1", "Definition 3.2.1"],
  "definition:matrixnormen-vektorisierung": ["3.2.3", "Definition 3.2.3"],
  "definition:monombasis-und-vandermonde-matrix": ["13.3.4", "Definition 13.3.4"],
  "definition:moore-penrose-pseudoinverse": ["6.3.5", "Definition 6.3.5"],
  "definition:multilineare-abbildung": ["9.1.1", "Definition 9.1.1"],
  "definition:nichtlineares-gleichungssystem": ["12.1.1", "Definition 12.1.1"],
  "definition:numerisches-problem": ["2.1.1", "Definition 2.1.1"],
  "definition:operatornorm": ["3.3.1", "Definition 3.3.1"],
  "definition:operatornormen-orthogonalmatrix": ["3.3.5", "Definition 3.3.5"],
  "definition:partition-und-gitterweite": ["13.6.1", "Definition 13.6.1"],
  "definition:penalisiertes-kleinste-quadrate": ["13.7.12", "Definition 13.7.12"],
  "definition:polynom-spline-vom-grad-q": ["13.4.1", "Definition 13.4.1"],
  "definition:positiv-semidefinit": ["11.2.7", "Definition 11.2.7"],
  "definition:qr-orthogonalmatrix": ["7.4.1", "Definition 7.4.1"],
  "definition:qr-zerlegung": ["7.4.4", "Definition 7.4.4"],
  "definition:rang-k-approximation": ["6.4.3", "Definition 6.4.3"],
  "definition:rechte-und-linke-singulaervektoren": ["6.2.7", "Definition 6.2.7"],
  "definition:reduzierte-svd": ["6.3.2", "Definition 6.3.2"],
  "definition:regressionsmodell-mit-additivem-fehler": ["13.7.1", "Definition 13.7.1"],
  "definition:residuum": ["8.3.1", "Definition 8.3.1"],
  "definition:richtungsableitung": ["10.2.3", "Definition 10.2.3"],
  "definition:sattelpunkt": ["12.2.8", "Definition 12.2.8"],
  "definition:schatten-p-norm": ["3.4.1", "Definition 3.4.1"],
  "definition:separierbare-kovarianz": ["9.3.17", "Definition 9.3.17"],
  "definition:singulaerwerte": ["6.2.4", "Definition 6.2.4"],
  "definition:sketching-matrix-und-skizze": ["8.4.4", "Definition 8.4.4"],
  "definition:spd-matrix": ["5.4.1", "Definition 5.4.1"],
  "definition:spur": ["3.1.2", "Definition 3.1.2"],
  "definition:starke-konvexitaet": ["12.3.12", "Definition 12.3.12"],
  "definition:stationaerer-punkt": ["12.2.4", "Definition 12.2.4"],
  "definition:strikte-konvexitaet": ["11.5.4", "Definition 11.5.4"],
  "definition:subgradient-und-subdifferential": ["11.4.14", "Definition 11.4.14"],
  "definition:submultiplikative-matrixnorm": ["3.5.4", "Definition 3.5.4"],
  "definition:taylorpolynom": ["10.8.1", "Definition 10.8.1"],
  "definition:tensor": ["9.2.3", "Definition 9.2.3"],
  "definition:tensor-produkt-basis": ["13.9.1", "Definition 13.9.1"],
  "definition:tensorprodukt": ["9.3.7", "Definition 9.3.7"],
  "definition:tensorprodukt-von-vektorraeumen": ["9.4.1", "Definition 9.4.1"],
  "definition:unbeschraenktes-und-beschraenktes": ["12.1.2", "Definition 12.1.2"],
  "definition:vertraegliche-norm": ["3.5.9", "Definition 3.5.9"],
  "definition:vorwaerts-und-rueckwaertsstabilitaet": ["4.3.1", "Definition 4.3.1"],
  "definition:zeit-und-speicheraufwand": ["2.3.1", "Definition 2.3.1"],
  "definition:zusammenfassung-vektorisierung": ["9.5.2", "Definition 9.5.2"],
  "eq:ableitung-einer-matrixwertigen-funktion": ["10.4.1", "(10.4.1)"],
  "eq:ableitung-einer-matrixwertigen-funktion-2": ["10.4.2", "(10.4.2)"],
  "eq:ableitung-nach-einer-matrix": ["10.4.6", "(10.4.6)"],
  "eq:ableitung-nach-einer-matrix-2": ["10.4.7", "(10.4.7)"],
  "eq:ableitung-von-f-x-a-xb": ["10.4.9", "(10.4.9)"],
  "eq:additives-modell": ["13.9.4", "(13.9.4)"],
  "eq:aeusseres-produkt": ["9.3.1", "(9.3.1)"],
  "eq:approximationsfehler-kubischer-splines": ["13.6.1", "(13.6.1)"],
  "eq:backtracking-liniensuche-nach-armijo": ["12.3.7", "(12.3.7)"],
  "eq:beide-saetze-brauchen-zwei": ["12.2.4", "(12.2.4)"],
  "eq:beschraenkte-bilineare-abbildung": ["10.6.1", "(10.6.1)"],
  "eq:bfgs-update": ["12.4.5", "(12.4.5)"],
  "eq:cholesky-zerlegung": ["5.4.1", "(5.4.1)"],
  "eq:darstellung-multilinearer-abbildungen": ["9.1.1", "(9.1.1)"],
  "eq:der-ableitungsterm-ist-ein-skalarprodukt": ["10.4.8", "(10.4.8)"],
  "eq:der-bias-ist-der-approximationsfehler": ["13.8.2", "(13.8.2)"],
  "eq:der-bias-ist-der-approximationsfehler-2": ["13.8.3", "(13.8.3)"],
  "eq:die-b-splines-sind-eine-basis": ["13.4.4", "(13.4.4)"],
  "eq:die-ersten-drei-stufen-fuer-vektor-zu": ["10.7.2", "(10.7.2)"],
  "eq:die-gauss-elimination-liefert-eine-lu": ["5.3.2", "(5.3.2)"],
  "eq:die-gradientenkette-eines-netzes": ["10.3.3", "(10.3.3)"],
  "eq:die-iterierten-sind-aehnlich-zu-a": ["8.1.2", "(8.1.2)"],
  "eq:die-qr-iteration-zerlegt-die-potenzen": ["8.1.3", "(8.1.3)"],
  "eq:differenzierbarkeit": ["10.1.1", "(10.1.1)"],
  "eq:dimension-des-spline-raums": ["13.4.1", "(13.4.1)"],
  "eq:dimensionsreduktion-mit-matrix-sketching": ["8.4.5", "(8.4.5)"],
  "eq:eckart-und-young-beste-approximation-von": ["6.4.4", "(6.4.4)"],
  "eq:eine-box-beschraenkung": ["12.5.1", "(12.5.1)"],
  "eq:eine-mse-obergrenze-im-multivariaten": ["13.9.2", "(13.9.2)"],
  "eq:eine-mse-obergrenze-im-multivariaten-2": ["13.9.3", "(13.9.3)"],
  "eq:elementarer-tensor-in-produktbasis": ["9.4.3", "(9.4.3)"],
  "eq:eq-10-2-1": ["10.2.1", "(10.2.1)"],
  "eq:eq-10-3-1": ["10.3.1", "(10.3.1)"],
  "eq:eq-10-4-13": ["10.4.13", "(10.4.13)"],
  "eq:eq-10-5-1": ["10.5.1", "(10.5.1)"],
  "eq:eq-10-8-4": ["10.8.4", "(10.8.4)"],
  "eq:eq-11-3-2": ["11.3.2", "(11.3.2)"],
  "eq:eq-12-4-1": ["12.4.1", "(12.4.1)"],
  "eq:eq-12-4-4": ["12.4.4", "(12.4.4)"],
  "eq:eq-12-4-7": ["12.4.7", "(12.4.7)"],
  "eq:eq-12-6-1": ["12.6.1", "(12.6.1)"],
  "eq:eq-13-5-2": ["13.5.2", "(13.5.2)"],
  "eq:eq-13-5-3": ["13.5.3", "(13.5.3)"],
  "eq:eq-13-7-2": ["13.7.2", "(13.7.2)"],
  "eq:eq-13-8-7": ["13.8.7", "(13.8.7)"],
  "eq:eq-4-1-1": ["4.1.1", "(4.1.1)"],
  "eq:eq-5-3-1": ["5.3.1", "(5.3.1)"],
  "eq:eq-5-4-2": ["5.4.2", "(5.4.2)"],
  "eq:eq-6-1-1": ["6.1.1", "(6.1.1)"],
  "eq:eq-6-1-2": ["6.1.2", "(6.1.2)"],
  "eq:eq-6-2-1": ["6.2.1", "(6.2.1)"],
  "eq:eq-6-3-1": ["6.3.1", "(6.3.1)"],
  "eq:eq-6-3-2": ["6.3.2", "(6.3.2)"],
  "eq:eq-8-1-1": ["8.1.1", "(8.1.1)"],
  "eq:eq-8-4-1": ["8.4.1", "(8.4.1)"],
  "eq:eq-9-2-1": ["9.2.1", "(9.2.1)"],
  "eq:eq-9-4-3": ["9.4.4", "(9.4.4)"],
  "eq:erweiterte-knotenfolge-und-b-splines": ["13.4.2", "(13.4.2)"],
  "eq:erweiterte-knotenfolge-und-b-splines-2": ["13.4.3", "(13.4.3)"],
  "eq:fehler-der-stueckweise-linearen": ["13.6.2", "(13.6.2)"],
  "eq:fixpunktform": ["8.3.2", "(8.3.2)"],
  "eq:fixpunktiteration-erster-ordnung": ["12.1.2", "(12.1.2)"],
  "eq:frechet-ableitung": ["10.1.2", "(10.1.2)"],
  "eq:gauss-elimination-mit-partieller": ["5.2.1", "(5.2.1)"],
  "eq:gemittelte-varianz-eines-linearen": ["13.8.4", "(13.8.4)"],
  "eq:gemittelte-varianz-eines-linearen-2": ["13.8.5", "(13.8.5)"],
  "eq:generalisierte-kreuzvalidierung": ["13.8.8", "(13.8.8)"],
  "eq:gestalt-aller-interpolanten": ["13.1.2", "(13.1.2)"],
  "eq:glaettung-ist-ein-lineares-kleinste": ["13.7.3", "(13.7.3)"],
  "eq:glaettung-ist-ein-lineares-kleinste-2": ["13.7.4", "(13.7.4)"],
  "eq:gradient-der-quadratischen-form": ["10.2.3", "(10.2.3)"],
  "eq:gradient-des-logistischen-verlusts": ["10.6.5", "(10.6.5)"],
  "eq:gradient-des-logistischen-verlusts-2": ["10.6.6", "(10.6.6)"],
  "eq:gradient-gradientenabstieg": ["10.2.4", "(10.2.4)"],
  "eq:gradienten-der-completion": ["10.4.14", "(10.4.14)"],
  "eq:gradientenabstieg-auf-einer-quadrik": ["12.3.6", "(12.3.6)"],
  "eq:gradientenabstieg-mit-heavy-ball": ["12.4.6", "(12.4.6)"],
  "eq:identitaeten-fuer-matrix-zu-skalar": ["10.4.10", "(10.4.10)"],
  "eq:identitaeten-fuer-matrix-zu-skalar-2": ["10.4.11", "(10.4.11)"],
  "eq:identitaeten-fuer-matrix-zu-skalar-3": ["10.4.12", "(10.4.12)"],
  "eq:identitaeten-fuer-skalar-zu-matrix": ["10.4.3", "(10.4.3)"],
  "eq:identitaeten-fuer-skalar-zu-matrix-2": ["10.4.4", "(10.4.4)"],
  "eq:identitaeten-fuer-skalar-zu-matrix-3": ["10.4.5", "(10.4.5)"],
  "eq:interpolationsproblem": ["13.1.1", "(13.1.1)"],
  "eq:jacobimatrix-eines-relu-layers": ["10.3.4", "(10.3.4)"],
  "eq:jensen-ungleichung": ["11.4.1", "(11.4.1)"],
  "eq:k-mal-frechet-differenzierbar": ["10.7.1", "(10.7.1)"],
  "eq:kettenregel": ["10.6.4", "(10.6.4)"],
  "eq:kettenregel-fuer-jacobimatrizen": ["10.3.2", "(10.3.2)"],
  "eq:konvergenz-der-korrekturiteration": ["8.3.3", "(8.3.3)"],
  "eq:konvergenzrate-bei-konvexem-f": ["12.3.4", "(12.3.4)"],
  "eq:konvergenzrate-bei-starker-konvexitaet": ["12.3.5", "(12.3.5)"],
  "eq:konvergenzrate-der-fixpunktiteration": ["12.1.3", "(12.1.3)"],
  "eq:konvexe-funktionen-von-vektoren-zu": ["11.4.2", "(11.4.2)"],
  "eq:konvexe-huelle-als-durchschnitt": ["11.2.1", "(11.2.1)"],
  "eq:konvexitaet-als-ungleichung": ["11.3.4", "(11.3.4)"],
  "eq:korrekturiteration": ["8.3.1", "(8.3.1)"],
  "eq:kriterium-des-stumpfen-winkels": ["11.3.3", "(11.3.3)"],
  "eq:kruemmungsfunktional": ["13.5.1", "(13.5.1)"],
  "eq:linearitaet-der-ableitungsoperation": ["10.5.2", "(10.5.2)"],
  "eq:lipschitz-stetiger-gradient-und-die": ["12.3.3", "(12.3.3)"],
  "eq:lokales-und-globales-minimum": ["12.2.1", "(12.2.1)"],
  "eq:modell-designmatrix-schaetzer": ["13.8.1", "(13.8.1)"],
  "eq:moore-penrose-pseudoinverse": ["6.3.5", "(6.3.5)"],
  "eq:nelder-mead-gradient-gradientenabstieg": ["12.3.1", "(12.3.1)"],
  "eq:newton-raphson-verfahren": ["10.8.7", "(10.8.7)"],
  "eq:newton-raphson-verfahren-fuer": ["12.1.1", "(12.1.1)"],
  "eq:newton-verfahren-fuer-die-optimierung": ["12.4.2", "(12.4.2)"],
  "eq:notwendige-bedingung-erster-ordnung": ["12.2.2", "(12.2.2)"],
  "eq:optimieren-heisst-gleichungen-loesen": ["12.2.3", "(12.2.3)"],
  "eq:penalisiertes-kleinste-quadrate": ["13.7.5", "(13.7.5)"],
  "eq:problem-normalengleichungen": ["7.1.1", "(7.1.1)"],
  "eq:produktregel": ["10.6.2", "(10.6.2)"],
  "eq:projektionstheorem": ["11.3.1", "(11.3.1)"],
  "eq:quasi-newton-schritt": ["12.4.3", "(12.4.3)"],
  "eq:rang-k-approximation": ["6.4.3", "(6.4.3)"],
  "eq:rechte-und-linke-singulaervektoren": ["6.2.2", "(6.2.2)"],
  "eq:reduzierte-darstellung": ["6.3.3", "(6.3.3)"],
  "eq:regressionsmodell-mit-additivem-fehler": ["13.7.1", "(13.7.1)"],
  "eq:richtungsableitung": ["10.2.2", "(10.2.2)"],
  "eq:ridge-regression": ["10.6.3", "(10.6.3)"],
  "eq:separierbare-kovarianz": ["9.3.4", "(9.3.4)"],
  "eq:singulaerwertzerlegung": ["6.2.3", "(6.2.3)"],
  "eq:singulaerwertzerlegung-2": ["6.2.4", "(6.2.4)"],
  "eq:spektralnorm-und-groesster-singulaerwert": ["6.4.1", "(6.4.1)"],
  "eq:stochastischer-gradientenabstieg-sgd": ["12.4.8", "(12.4.8)"],
  "eq:streckung-als-quadratische-form": ["6.1.3", "(6.1.3)"],
  "eq:strikte-konvexitaet": ["11.5.1", "(11.5.1)"],
  "eq:subgradient-und-subdifferential": ["11.4.3", "(11.4.3)"],
  "eq:summenform-der-svd": ["6.4.2", "(6.4.2)"],
  "eq:svd-loesung-des-kq-problems": ["7.6.1", "(7.6.1)"],
  "eq:taylorapproximation-fuer-vektor-zu": ["10.8.6", "(10.8.6)"],
  "eq:taylorentwicklung-i": ["10.8.2", "(10.8.2)"],
  "eq:taylorentwicklung-i-2": ["10.8.3", "(10.8.3)"],
  "eq:taylorentwicklung-ii": ["10.8.5", "(10.8.5)"],
  "eq:taylorpolynom": ["10.8.1", "(10.8.1)"],
  "eq:tensor-produkt-basis": ["13.9.1", "(13.9.1)"],
  "eq:tensorprodukt": ["9.3.2", "(9.3.2)"],
  "eq:tensorprodukt-von-vektorraeumen": ["9.4.1", "(9.4.1)"],
  "eq:tensorproduktbasis": ["9.4.2", "(9.4.2)"],
  "eq:vektorisierung-eines-matrixprodukts": ["9.5.1", "(9.5.1)"],
  "eq:voller-spaltenrang-eine-geschlossene": ["6.3.6", "(6.3.6)"],
  "eq:was-die-reduzierte-form-spart-und-was": ["6.3.4", "(6.3.4)"],
  "eq:was-sattelpunkte-fuer-die-verfahren": ["12.2.5", "(12.2.5)"],
  "eq:zahl-der-iterationen": ["8.3.4", "(8.3.4)"],
  "eq:zerlegung-des-mittleren-quadratischen": ["13.8.6", "(13.8.6)"],
  "eq:zu-klein-zu-gross-gerade-richtig": ["12.3.2", "(12.3.2)"],
  "eq:zufaellige-einbettung-eines-festen": ["8.4.2", "(8.4.2)"],
  "eq:zufaellige-einbettung-eines-festen-2": ["8.4.3", "(8.4.3)"],
  "eq:zufaellige-einbettung-eines-festen-3": ["8.4.4", "(8.4.4)"],
  "eq:zwei-bedeutungen-zwei-zeichen": ["9.3.3", "(9.3.3)"],
  "kap:algos": ["2", "Kapitel 2"],
  "kap:differentialrechnung": ["10", "Kapitel 10"],
  "kap:fehler": ["4", "Kapitel 4"],
  "kap:funktionsapproximation": ["13", "Kapitel 13"],
  "kap:intro": ["1", "Kapitel 1"],
  "kap:konvexitaet": ["11", "Kapitel 11"],
  "kap:kq": ["7", "Kapitel 7"],
  "kap:la-misc": ["8", "Kapitel 8"],
  "kap:lgs": ["5", "Kapitel 5"],
  "kap:matrix-spur-norm": ["3", "Kapitel 3"],
  "kap:optim": ["12", "Kapitel 12"],
  "kap:svd": ["6", "Kapitel 6"],
  "kap:tensoren": ["9", "Kapitel 9"],
  "korollar:a-a-ist-orthogonal-diagonalisierbar": ["6.2.2", "Korollar 6.2.2"],
  "korollar:der-natuerliche-kubische-spline-ist-der": ["13.5.6", "Korollar 13.5.6"],
  "korollar:lineare-abbildungen-sind-ihre-eigene": ["10.3.6", "Korollar 10.3.6"],
  "korollar:skalarprodukte-bleiben-erhalten": ["8.4.9", "Korollar 8.4.9"],
  "korollar:spezialfaelle": ["6.3.9", "Korollar 6.3.9"],
  "korollar:spezialfaelle-der-schatten-p-norm": ["3.4.4", "Korollar 3.4.4"],
  "korollar:taylorapproximation-fuer-vektor-zu": ["10.8.9", "Korollar 10.8.9"],
  "korollar:zahl-der-iterationen": ["8.3.6", "Korollar 8.3.6"],
  "korollar:zu-viele-nullstellen-erzwingen-das": ["13.3.2", "Korollar 13.3.2"],
  "lemma:die-matrix-der-linearen-naeherung": ["10.3.3", "Lemma 10.3.3"],
  "lemma:fehlerschranken": ["4.1.3", "Lemma 4.1.3"],
  "lemma:kondition-der-differenz": ["4.3.6", "Lemma 4.3.6"],
  "lemma:qr-eigenschaften-von-orthogonalmatrizen": ["7.4.2", "Lemma 7.4.2"],
  "lemma:rechenregeln-fuer-landau-symbole": ["2.4.4", "Lemma 2.4.4"],
  "lemma:rekurrenz-der-aufrufzahl": ["2.5.4", "Lemma 2.5.4"],
  "satz:ableitung-als-lineare-approximation": ["10.1.3", "Satz 10.1.3"],
  "satz:aehnliche-matrizen-haben-dieselben": ["8.1.7", "Satz 8.1.7"],
  "satz:alle-matrixnormen-sind-aequivalent": ["3.5.1", "Satz 3.5.1"],
  "satz:approximationsfehler-kubischer-splines": ["13.6.2", "Satz 13.6.2"],
  "satz:aufwand-der-matrix-vektor-multiplikation": ["2.3.3", "Satz 2.3.3"],
  "satz:bedingungen-erster-und-zweiter-ordnung": ["12.2.11", "Satz 12.2.11"],
  "satz:charakterisierung-der-fundamentalen": ["6.2.11", "Satz 6.2.11"],
  "satz:cholesky-zerlegung": ["5.4.2", "Satz 5.4.2"],
  "satz:darstellung-multilinearer-abbildungen": ["9.1.7", "Satz 9.1.7"],
  "satz:das-bfgs-update-erfuellt-die": ["12.4.10", "Satz 12.4.10"],
  "satz:das-interpolationsproblem-ist-ein": ["13.2.8", "Satz 13.2.8"],
  "satz:das-tensorprodukt-ist-bilinear": ["9.3.9", "Satz 9.3.9"],
  "satz:der-bias-ist-der-approximationsfehler": ["13.8.2", "Satz 13.8.2"],
  "satz:der-gradient-einer-zufaellig-gezogenen": ["12.4.15", "Satz 12.4.15"],
  "satz:der-raum-aller-tensoren-eines-formats": ["9.2.5", "Satz 9.2.5"],
  "satz:die-b-splines-sind-eine-basis": ["13.4.11", "Satz 13.4.11"],
  "satz:die-ersten-drei-stufen-fuer-vektor-zu": ["10.7.17", "Satz 10.7.17"],
  "satz:die-gauss-elimination-liefert-eine-lu": ["5.3.3", "Satz 5.3.3"],
  "satz:die-iterierten-sind-aehnlich-zu-a": ["8.1.11", "Satz 8.1.11"],
  "satz:die-minimalstellen-bilden-eine-konvexe": ["11.5.3", "Satz 11.5.3"],
  "satz:die-positiv-semidefiniten-matrizen": ["11.2.8", "Satz 11.2.8"],
  "satz:die-qr-iteration-zerlegt-die-potenzen": ["8.1.12", "Satz 8.1.12"],
  "satz:dimension-des-spline-raums": ["13.4.4", "Satz 13.4.4"],
  "satz:eckart-und-young-beste-approximation-von": ["6.4.4", "Satz 6.4.4"],
  "satz:eigenschaften-der-pseudoinversen": ["6.3.8", "Satz 6.3.8"],
  "satz:eigenschaften-der-spur": ["3.1.4", "Satz 3.1.4"],
  "satz:eigenschaften-des-aeusseren-produkts": ["9.3.4", "Satz 9.3.4"],
  "satz:eigenschaften-von-a-a": ["6.2.1", "Satz 6.2.1"],
  "satz:eigenschaften-von-splines-und-b-splines": ["13.4.15", "Satz 13.4.15"],
  "satz:eindeutige-loesung-bei-vollem": ["7.1.7", "Satz 7.1.7"],
  "satz:eine-mse-obergrenze-im-multivariaten": ["13.9.5", "Satz 13.9.5"],
  "satz:erste-und-zweite-ableitung-in": ["10.7.6", "Satz 10.7.6"],
  "satz:existenz-der-lu-zerlegung": ["5.3.5", "Satz 5.3.5"],
  "satz:existenz-und-eindeutigkeit-der": ["13.3.5", "Satz 13.3.5"],
  "satz:existenz-und-eindeutigkeit-einer": ["12.1.5", "Satz 12.1.5"],
  "satz:existenz-von-subgradienten-im-inneren": ["11.4.15", "Satz 11.4.15"],
  "satz:exponentielle-laufzeit-der-naiven": ["2.5.6", "Satz 2.5.6"],
  "satz:fehler-der-stueckweise-linearen": ["13.6.5", "Satz 13.6.5"],
  "satz:fehlerfortpflanzung-in-einer-komposition": ["4.3.3", "Satz 4.3.3"],
  "satz:frobenius-norm-ueber-die-spur": ["3.1.10", "Satz 3.1.10"],
  "satz:frobenius-norm-und-spur": ["3.4.3", "Satz 3.4.3"],
  "satz:fundamentalsatz-der-algebra": ["13.3.1", "Satz 13.3.1"],
  "satz:gemittelte-varianz-eines-linearen": ["13.8.4", "Satz 13.8.4"],
  "satz:gestalt-aller-interpolanten": ["13.1.8", "Satz 13.1.8"],
  "satz:glaettung-ist-ein-lineares-kleinste": ["13.7.5", "Satz 13.7.5"],
  "satz:gradient-der-quadratischen-form": ["10.2.8", "Satz 10.2.8"],
  "satz:gradienten-der-completion": ["10.4.12", "Satz 10.4.12"],
  "satz:gradientenabstieg-auf-einer-quadrik": ["12.3.15", "Satz 12.3.15"],
  "satz:hesse-kriterium-fuer-kritische-punkte": ["10.7.9", "Satz 10.7.9"],
  "satz:hoechstens-eine-minimalstelle": ["11.5.5", "Satz 11.5.5"],
  "satz:identitaeten-fuer-matrix-zu-skalar": ["10.4.10", "Satz 10.4.10"],
  "satz:identitaeten-fuer-skalar-zu-matrix": ["10.4.4", "Satz 10.4.4"],
  "satz:induzierte-p-normen": ["3.3.4", "Satz 3.3.4"],
  "satz:jacobimatrizen-der-grundbausteine": ["10.3.4", "Satz 10.3.4"],
  "satz:jede-matrix-ist-eine-kurze-summe": ["9.4.6", "Satz 9.4.6"],
  "satz:jede-norm-ist-konvex": ["11.3.15", "Satz 11.3.15"],
  "satz:jensen-ungleichung": ["11.4.6", "Satz 11.4.6"],
  "satz:karush-kuhn-tucker-bedingungen": ["12.5.7", "Satz 12.5.7"],
  "satz:kettenregel": ["10.6.7", "Satz 10.6.7"],
  "satz:kettenregel-fuer-jacobimatrizen": ["10.3.9", "Satz 10.3.9"],
  "satz:kkt-und-konvexitaet": ["12.5.12", "Satz 12.5.12"],
  "satz:komplexitaet-der-iterativen-variante": ["2.5.1", "Satz 2.5.1"],
  "satz:komplexitaet-der-lu-zerlegung": ["5.3.9", "Satz 5.3.9"],
  "satz:kondition-der-loesung-eines-lgs": ["4.2.6", "Satz 4.2.6"],
  "satz:konvergenz-der-korrekturiteration": ["8.3.5", "Satz 8.3.5"],
  "satz:konvergenz-der-potenzmethode": ["8.1.4", "Satz 8.1.4"],
  "satz:konvergenzrate-bei-konvexem-f": ["12.3.10", "Satz 12.3.10"],
  "satz:konvergenzrate-bei-starker-konvexitaet": ["12.3.13", "Satz 12.3.13"],
  "satz:konvergenzrate-der-fixpunktiteration": ["12.1.16", "Satz 12.1.16"],
  "satz:konvexe-funktionen-von-vektoren-zu": ["11.4.9", "Satz 11.4.9"],
  "satz:konvexe-huelle-als-durchschnitt": ["11.2.13", "Satz 11.2.13"],
  "satz:konvexe-mengen-enthalten-alle": ["11.2.3", "Satz 11.2.3"],
  "satz:konvexitaet-als-ungleichung": ["11.3.8", "Satz 11.3.8"],
  "satz:konvexitaet-und-positive-semidefinitheit": ["10.7.11", "Satz 10.7.11"],
  "satz:konvexitaetserhaltung": ["11.2.10", "Satz 11.2.10"],
  "satz:konvexkombinationen-zweier-vektoren": ["11.1.4", "Satz 11.1.4"],
  "satz:kovarianz-unter-dem-cholesky-faktor": ["5.4.4", "Satz 5.4.4"],
  "satz:kq-loesung-als-projektion": ["7.1.4", "Satz 7.1.4"],
  "satz:kq-loesung-ueber-die-qr-zerlegung": ["7.4.7", "Satz 7.4.7"],
  "satz:kriterium-des-stumpfen-winkels": ["11.3.3", "Satz 11.3.3"],
  "satz:kritischer-punkt-und-globales-minimum": ["11.5.1", "Satz 11.5.1"],
  "satz:kubische-splines-haben-minimale": ["13.5.4", "Satz 13.5.4"],
  "satz:lineare-ziele-und-extrempunkte": ["11.2.14", "Satz 11.2.14"],
  "satz:linearitaet-der-ableitungsoperation": ["10.5.5", "Satz 10.5.5"],
  "satz:notwendige-bedingung-erster-ordnung": ["12.2.3", "Satz 12.2.3"],
  "satz:notwendige-bedingung-von-lagrange": ["12.5.5", "Satz 12.5.5"],
  "satz:operationen-die-konvexitaet-erhalten": ["11.4.1", "Satz 11.4.1"],
  "satz:operatornormen-sind-submultiplikativ": ["3.5.5", "Satz 3.5.5"],
  "satz:orthogonalitaet-der-singulaervektoren": ["6.2.8", "Satz 6.2.8"],
  "satz:problem-normalengleichungen": ["7.1.5", "Satz 7.1.5"],
  "satz:produktregel": ["10.6.3", "Satz 10.6.3"],
  "satz:projektionstheorem": ["11.3.1", "Satz 11.3.1"],
  "satz:quadratische-funktionen": ["11.3.12", "Satz 11.3.12"],
  "satz:reduzierte-darstellung": ["6.3.1", "Satz 6.3.1"],
  "satz:richtung-des-staerksten-anstiegs": ["10.2.4", "Satz 10.2.4"],
  "satz:rueckwaertsfehler-beim-linearen": ["3.5.13", "Satz 3.5.13"],
  "satz:satz-3-2-4": ["3.2.4", "Satz 3.2.4"],
  "satz:satz-7-2-3": ["7.2.3", "Satz 7.2.3"],
  "satz:satz-von-schwarz": ["10.7.4", "Satz 10.7.4"],
  "satz:schrittzahl-der-bisektion": ["12.1.8", "Satz 12.1.8"],
  "satz:singulaerwertzerlegung": ["6.2.13", "Satz 6.2.13"],
  "satz:spektralnorm-und-groesster-singulaerwert": ["6.4.1", "Satz 6.4.1"],
  "satz:spektralnorm-und-spektralzerlegung": ["3.3.7", "Satz 3.3.7"],
  "satz:spur-als-summe-der-eigenwerte": ["3.1.7", "Satz 3.1.7"],
  "satz:stetigkeit-aus-differenzierbarkeit": ["10.5.2", "Satz 10.5.2"],
  "satz:stoerung-der-designmatrix-erste-ordnung": ["7.2.4", "Satz 7.2.4"],
  "satz:streckung-als-quadratische-form": ["6.1.3", "Satz 6.1.3"],
  "satz:summenform-der-svd": ["6.4.2", "Satz 6.4.2"],
  "satz:svd-loesung-des-kq-problems": ["7.6.1", "Satz 7.6.1"],
  "satz:symmetrie-und-orthogonalitaet": ["7.5.6", "Satz 7.5.6"],
  "satz:taylorentwicklung-i": ["10.8.2", "Satz 10.8.2"],
  "satz:taylorentwicklung-ii": ["10.8.7", "Satz 10.8.7"],
  "satz:tensorproduktbasis": ["9.4.7", "Satz 9.4.7"],
  "satz:unitaere-invarianz": ["3.4.7", "Satz 3.4.7"],
  "satz:vektorisierung-eines-matrixprodukts": ["9.5.3", "Satz 9.5.3"],
  "satz:wahl-des-spiegelvektors": ["7.5.7", "Satz 7.5.7"],
  "satz:wahl-von-c-und-s": ["7.5.2", "Satz 7.5.2"],
  "satz:wann-k-zahlen-eine-funktion-festlegen": ["13.2.4", "Satz 13.2.4"],
  "satz:wichtige-vertraeglichkeiten": ["3.5.10", "Satz 3.5.10"],
  "satz:wie-sich-eine-datenaenderung-fortpflanzt": ["13.3.12", "Satz 13.3.12"],
  "satz:zerlegung-des-mittleren-quadratischen": ["13.8.6", "Satz 13.8.6"],
  "satz:zufaellige-einbettung-eines-festen": ["8.4.6", "Satz 8.4.6"],
  "satz:zufallsrichtungen-stehen-fast-senkrecht": ["8.4.2", "Satz 8.4.2"],
  "sec:absolute-und-relative-fehler": ["4.1.1", "Abschnitt 4.1.1"],
  "sec:algorithmenarten-in-ml-und-statistik": ["2.2.4", "Abschnitt 2.2.4"],
  "sec:algos/aufwand": ["2.3", "Abschnitt 2.3"],
  "sec:algos/fibonacci": ["2.2", "Abschnitt 2.2"],
  "sec:algos/fibonacci-komplexitaet": ["2.5", "Abschnitt 2.5"],
  "sec:algos/landau": ["2.4", "Abschnitt 2.4"],
  "sec:algos/probleme-algorithmen": ["2.1", "Abschnitt 2.1"],
  "sec:alternative-loesungswege-orthogonale": ["7.3.4", "Abschnitt 7.3.4"],
  "sec:anwendung-auf-den-dominanten-term": ["2.4.4", "Abschnitt 2.4.4"],
  "sec:aufgabe-die-kondition-einer-summe": ["4.2.4", "Abschnitt 4.2.4"],
  "sec:beispiel-fibonacci-zahlen": ["2.2.1", "Abschnitt 2.2.1"],
  "sec:beispiel-matrix-vektor-multiplikation": ["2.3.2", "Abschnitt 2.3.2"],
  "sec:beispiele": ["3.3.5", "Abschnitt 3.3.5"],
  "sec:das-cholesky-verfahren": ["7.3.2", "Abschnitt 7.3.2"],
  "sec:definition-und-erste-beispiele": ["3.1.1", "Abschnitt 3.1.1"],
  "sec:definition-und-interpretation": ["3.3.1", "Abschnitt 3.3.1"],
  "sec:der-vergleich-ordnung-schlaegt-konstante": ["2.5.3", "Abschnitt 2.5.3"],
  "sec:die-axiome": ["3.2.2", "Abschnitt 3.2.2"],
  "sec:die-drei-wichtigen-spezialfaelle": ["3.4.2", "Abschnitt 3.4.2"],
  "sec:die-frobenius-norm": ["3.1.4", "Abschnitt 3.1.4"],
  "sec:die-iterative-variante-linearer-aufwand": ["2.5.1", "Abschnitt 2.5.1"],
  "sec:die-naive-rekursion-exponentieller": ["2.5.2", "Abschnitt 2.5.2"],
  "sec:die-wichtigsten-operatornormen": ["3.3.2", "Abschnitt 3.3.2"],
  "sec:differentialrechnung/gradient": ["10.2", "Abschnitt 10.2"],
  "sec:differentialrechnung/hoehere-ableitungen": ["10.7", "Abschnitt 10.7"],
  "sec:differentialrechnung/jacobi": ["10.3", "Abschnitt 10.3"],
  "sec:differentialrechnung/linearisierung": ["10.1", "Abschnitt 10.1"],
  "sec:differentialrechnung/matrixableitungen": ["10.4", "Abschnitt 10.4"],
  "sec:differentialrechnung/produkt-kettenregel": ["10.6", "Abschnitt 10.6"],
  "sec:differentialrechnung/stetigkeit": ["10.5", "Abschnitt 10.5"],
  "sec:differentialrechnung/taylor": ["10.8", "Abschnitt 10.8"],
  "sec:differentialrechnung/zusammenfassung": ["10.9", "Abschnitt 10.9"],
  "sec:effizient-aber-moeglicherweise-instabil": ["7.3.3", "Abschnitt 7.3.3"],
  "sec:ein-warnbeispiel-der-kehrwert": ["4.2.1", "Abschnitt 4.2.1"],
  "sec:einschub-orthogonalmatrizen": ["3.3.3", "Abschnitt 3.3.3"],
  "sec:fehler/fehlermasse": ["4.1", "Abschnitt 4.1"],
  "sec:fehler/kondition": ["4.2", "Abschnitt 4.2"],
  "sec:fehler/stabilitaet": ["4.3", "Abschnitt 4.3"],
  "sec:fehler/zusammenfassung": ["4.4", "Abschnitt 4.4"],
  "sec:fehlermasse-und-fehlerschranken": ["4.1.2", "Abschnitt 4.1.2"],
  "sec:fehlerzerlegung": ["4.1.3", "Abschnitt 4.1.3"],
  "sec:fibonacci-selbsttest": ["2.2.3", "Abschnitt 2.2.3"],
  "sec:funktionsapproximation/approximation": ["13.1", "Abschnitt 13.1"],
  "sec:funktionsapproximation/approximationsfehler": ["13.6", "Abschnitt 13.6"],
  "sec:funktionsapproximation/basisdarstellung": ["13.2", "Abschnitt 13.2"],
  "sec:funktionsapproximation/bias-varianz": ["13.8", "Abschnitt 13.8"],
  "sec:funktionsapproximation/glaettung": ["13.7", "Abschnitt 13.7"],
  "sec:funktionsapproximation/minimale-kruemmung": ["13.5", "Abschnitt 13.5"],
  "sec:funktionsapproximation/multivariat": ["13.9", "Abschnitt 13.9"],
  "sec:funktionsapproximation/polynominterpolation": ["13.3", "Abschnitt 13.3"],
  "sec:funktionsapproximation/splines": ["13.4", "Abschnitt 13.4"],
  "sec:intro/landkarte": ["1.2", "Abschnitt 1.2"],
  "sec:intro/worum": ["1.1", "Abschnitt 1.1"],
  "sec:klein-o-und-gross-o": ["2.4.1", "Abschnitt 2.4.1"],
  "sec:komplexitaet-wie-skaliert-der-aufwand": ["2.3.3", "Abschnitt 2.3.3"],
  "sec:komplexitaetsklassen": ["2.3.4", "Abschnitt 2.3.4"],
  "sec:kondition-eines-linearen": ["4.2.3", "Abschnitt 4.2.3"],
  "sec:konditionszahlen": ["4.2.2", "Abschnitt 4.2.2"],
  "sec:konvexitaet/eigenschaften": ["11.4", "Abschnitt 11.4"],
  "sec:konvexitaet/konvexe-mengen": ["11.2", "Abschnitt 11.2"],
  "sec:konvexitaet/konvexe-optimierung": ["11.5", "Abschnitt 11.5"],
  "sec:konvexitaet/konvexkombinationen": ["11.1", "Abschnitt 11.1"],
  "sec:konvexitaet/projektion-konvexe-funktionen": ["11.3", "Abschnitt 11.3"],
  "sec:kq/givens-householder": ["7.5", "Abschnitt 7.5"],
  "sec:kq/kondition": ["7.2", "Abschnitt 7.2"],
  "sec:kq/normalengleichungen": ["7.3", "Abschnitt 7.3"],
  "sec:kq/problem": ["7.1", "Abschnitt 7.1"],
  "sec:kq/pseudoinverse": ["7.6", "Abschnitt 7.6"],
  "sec:kq/qr": ["7.4", "Abschnitt 7.4"],
  "sec:la-misc/anwendungen": ["8.2", "Abschnitt 8.2"],
  "sec:la-misc/eigenwerte": ["8.1", "Abschnitt 8.1"],
  "sec:la-misc/iterative-loeser": ["8.3", "Abschnitt 8.3"],
  "sec:la-misc/sketching": ["8.4", "Abschnitt 8.4"],
  "sec:la-misc/zusammenfassung": ["8.5", "Abschnitt 8.5"],
  "sec:landau-selbsttest": ["2.4.5", "Abschnitt 2.4.5"],
  "sec:lgs/cholesky": ["5.4", "Abschnitt 5.4"],
  "sec:lgs/grundlagen": ["5.1", "Abschnitt 5.1"],
  "sec:lgs/lgs": ["5.2", "Abschnitt 5.2"],
  "sec:lgs/lu": ["5.3", "Abschnitt 5.3"],
  "sec:lgs/zusammenfassung": ["5.5", "Abschnitt 5.5"],
  "sec:matrix-spur-norm/eigenschaften": ["3.5", "Abschnitt 3.5"],
  "sec:matrix-spur-norm/matrixnormen": ["3.2", "Abschnitt 3.2"],
  "sec:matrix-spur-norm/operatornormen": ["3.3", "Abschnitt 3.3"],
  "sec:matrix-spur-norm/schattennormen": ["3.4", "Abschnitt 3.4"],
  "sec:matrix-spur-norm/spur": ["3.1", "Abschnitt 3.1"],
  "sec:matrix-spur-norm/zusammenfassung": ["3.6", "Abschnitt 3.6"],
  "sec:matrixnormen-durch-vektorisierung": ["3.2.3", "Abschnitt 3.2.3"],
  "sec:matrixnormen-und-konditionierung": ["3.5.4", "Abschnitt 3.5.4"],
  "sec:normen-in-der-fehleranalyse": ["3.5.5", "Abschnitt 3.5.5"],
  "sec:normenaequivalenz": ["3.5.1", "Abschnitt 3.5.1"],
  "sec:optim/beschraenkt": ["12.5", "Abschnitt 12.5"],
  "sec:optim/nelder-mead-gradient": ["12.3", "Abschnitt 12.3"],
  "sec:optim/newton-sgd": ["12.4", "Abschnitt 12.4"],
  "sec:optim/nichtlineare-gleichungen": ["12.1", "Abschnitt 12.1"],
  "sec:optim/optim-in-r": ["12.6", "Abschnitt 12.6"],
  "sec:optim/optimalitaet": ["12.2", "Abschnitt 12.2"],
  "sec:rechenbeispiele": ["2.4.2", "Abschnitt 2.4.2"],
  "sec:rechenregeln": ["2.4.3", "Abschnitt 2.4.3"],
  "sec:rechenregeln-und-zyklische-vertauschung": ["3.1.2", "Abschnitt 3.1.2"],
  "sec:spektralnorm-und-spektralzerlegung": ["3.3.4", "Abschnitt 3.3.4"],
  "sec:spur-und-eigenwerte": ["3.1.3", "Abschnitt 3.1.3"],
  "sec:submultiplikativitaet": ["3.5.2", "Abschnitt 3.5.2"],
  "sec:svd/anwendungen": ["6.4", "Abschnitt 6.4"],
  "sec:svd/motivation": ["6.1", "Abschnitt 6.1"],
  "sec:svd/reduzierte-svd": ["6.3", "Abschnitt 6.3"],
  "sec:svd/singulaerwerte": ["6.2", "Abschnitt 6.2"],
  "sec:svd/zusammenfassung": ["6.5", "Abschnitt 6.5"],
  "sec:tensoren/multilinear": ["9.1", "Abschnitt 9.1"],
  "sec:tensoren/produkte": ["9.3", "Abschnitt 9.3"],
  "sec:tensoren/tensoren": ["9.2", "Abschnitt 9.2"],
  "sec:tensoren/tensorprodukt": ["9.4", "Abschnitt 9.4"],
  "sec:tensoren/zusammenfassung": ["9.5", "Abschnitt 9.5"],
  "sec:unitaere-invarianz": ["3.4.3", "Abschnitt 3.4.3"],
  "sec:vertraeglichkeit-von-normen": ["3.5.3", "Abschnitt 3.5.3"],
  "sec:vom-algorithmus-zum-programm": ["2.2.2", "Abschnitt 2.2.2"],
  "sec:von-eigenwerten-zu-singulaerwerten": ["3.4.1", "Abschnitt 3.4.1"],
  "sec:warum-matrixnormen": ["3.2.1", "Abschnitt 3.2.1"],
  "sec:warum-wir-niemals-invertieren": ["7.3.1", "Abschnitt 7.3.1"],
  "sec:was-elementweise-normen-nicht-sehen": ["3.2.4", "Abschnitt 3.2.4"],
  "sec:was-ist-ein-guter-algorithmus": ["2.2.5", "Abschnitt 2.2.5"],
  "sec:zeit-und-speicheraufwand": ["2.3.1", "Abschnitt 2.3.1"],
};

/** Nur die Nummer, z. B. num("satz:kkt") → "12.5.7". */
export function num(key: NumKey): string {
  return NUMBERS[key][0];
}

/** Verweistext mit Art, z. B. ref("satz:kkt") → "Satz 12.5.7", ref("eq:x") → "(12.5.3)". */
export function ref(key: NumKey): string {
  return NUMBERS[key][1];
}
