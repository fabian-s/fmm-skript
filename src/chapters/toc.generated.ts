/* GENERIERT von scripts/gen-toc.mjs — nicht von Hand bearbeiten.
 * Neu erzeugen: npm run gen:toc (läuft auch vor dev und build).
 */
export interface TocSection {
  /** Abschnittsnummer, z. B. "3.4" — zugleich Anker-ID (#sec-3.4). */
  id: string;
  /** stabiler Abschnittsschlüssel, z. B. "schattennormen" — Zweitanker #sec-<key>, @sec:<kap>/<key> */
  key: string;
  title: string;
}

/** Abschnitte je Kapitel-ID, in Reihenfolge der Registry. */
export const tocSections: Record<string, TocSection[]> = {
  "01-intro": [
    { id: "1.1", key: "worum", title: "Worum geht es in diesem Skript?" },
    { id: "1.2", key: "landkarte", title: "Landkarte des Skripts" },
  ],
  "02-algos": [
    { id: "2.1", key: "probleme-algorithmen", title: "Numerische Probleme und Algorithmen" },
    { id: "2.2", key: "fibonacci", title: "Algorithmen konkret: Fibonacci und Verwandte" },
    { id: "2.3", key: "aufwand", title: "Aufwand und Komplexität" },
    { id: "2.4", key: "landau", title: "Landau-Symbole und Rechenregeln" },
    { id: "2.5", key: "fibonacci-komplexitaet", title: "Fibonacci: Komplexitätsanalyse" },
  ],
  "03-matrix-spur-norm": [
    { id: "3.1", key: "spur", title: "Die Spur einer Matrix" },
    { id: "3.2", key: "matrixnormen", title: "Matrixnormen: Definition und Beispiele" },
    { id: "3.3", key: "operatornormen", title: "Operatornormen" },
    { id: "3.4", key: "schattennormen", title: "Schattennormen" },
    { id: "3.5", key: "eigenschaften", title: "Eigenschaften von Matrixnormen" },
    { id: "3.6", key: "zusammenfassung", title: "Zusammenfassung" },
  ],
  "04-fehler": [
    { id: "4.1", key: "fehlermasse", title: "Fehlermaße und Fehlerzerlegung" },
    { id: "4.2", key: "kondition", title: "Kondition" },
    { id: "4.3", key: "stabilitaet", title: "Stabilität von Algorithmen" },
    { id: "4.4", key: "zusammenfassung", title: "Zusammenfassung" },
  ],
  "05-lgs": [
    { id: "5.1", key: "grundlagen", title: "Numerische lineare Algebra: Grundlagen" },
    { id: "5.2", key: "lgs", title: "Lineare Gleichungssysteme" },
    { id: "5.3", key: "lu", title: "Die LU-Zerlegung" },
    { id: "5.4", key: "cholesky", title: "Die Cholesky-Zerlegung" },
    { id: "5.5", key: "zusammenfassung", title: "Zusammenfassung" },
  ],
  "06-svd": [
    { id: "6.1", key: "motivation", title: "Motivation" },
    { id: "6.2", key: "singulaerwerte", title: "Singulärwerte und Singulärvektoren" },
    { id: "6.3", key: "reduzierte-svd", title: "Reduzierte SVD und Pseudoinverse" },
    { id: "6.4", key: "anwendungen", title: "Anwendungen" },
    { id: "6.5", key: "zusammenfassung", title: "Zusammenfassung" },
  ],
  "07-kq": [
    { id: "7.1", key: "problem", title: "Kleinste Quadrate: Problem und Motivation" },
    { id: "7.2", key: "kondition", title: "Kondition des Kleinste-Quadrate-Problems" },
    { id: "7.3", key: "normalengleichungen", title: "Normalengleichungen und Cholesky-Zerlegung" },
    { id: "7.4", key: "qr", title: "QR-Zerlegung und Gram-Schmidt-Verfahren" },
    { id: "7.5", key: "givens-householder", title: "Konstruktion von Q: Givens-Rotationen und Householder-Spiegelungen" },
    { id: "7.6", key: "pseudoinverse", title: "Pseudoinverse, SVD-Lösung und Methodenvergleich" },
  ],
  "08-la-misc": [
    { id: "8.1", key: "eigenwerte", title: "Eigenwertprobleme: Potenzmethode und QR-Iteration" },
    { id: "8.2", key: "anwendungen", title: "Anwendungen: PageRank, PCA und approximative SVD" },
    { id: "8.3", key: "iterative-loeser", title: "Iterative Löser für lineare Gleichungssysteme" },
    { id: "8.4", key: "sketching", title: "Probabilistische Methoden: Matrix-Sketching" },
    { id: "8.5", key: "zusammenfassung", title: "Zusammenfassung" },
  ],
  "09-tensoren": [
    { id: "9.1", key: "multilinear", title: "Multilineare Abbildungen" },
    { id: "9.2", key: "tensoren", title: "Tensoren" },
    { id: "9.3", key: "produkte", title: "Produkte von Tensoren" },
    { id: "9.4", key: "tensorprodukt", title: "Tensorprodukt von Vektorräumen" },
    { id: "9.5", key: "zusammenfassung", title: "Zusammenfassung" },
  ],
  "10-differentialrechnung": [
    { id: "10.1", key: "linearisierung", title: "Ableitung als lineare Approximation" },
    { id: "10.2", key: "gradient", title: "Der Gradient: Vektor zu Skalar" },
    { id: "10.3", key: "jacobi", title: "Die Jacobimatrix: Vektor zu Vektor" },
    { id: "10.4", key: "matrixableitungen", title: "Ableitungen mit Matrizen" },
    { id: "10.5", key: "stetigkeit", title: "Stetigkeit und Linearität" },
    { id: "10.6", key: "produkt-kettenregel", title: "Produkt- und Kettenregel" },
    { id: "10.7", key: "hoehere-ableitungen", title: "Ableitungen höheren Grades" },
    { id: "10.8", key: "taylor", title: "Taylorapproximation" },
    { id: "10.9", key: "zusammenfassung", title: "Zusammenfassung" },
  ],
  "11-konvexitaet": [
    { id: "11.1", key: "konvexkombinationen", title: "Konvexkombinationen und konvexe Hülle" },
    { id: "11.2", key: "konvexe-mengen", title: "Konvexe Mengen" },
    { id: "11.3", key: "projektion-konvexe-funktionen", title: "Projektion und konvexe Funktionen" },
    { id: "11.4", key: "eigenschaften", title: "Eigenschaften konvexer Funktionen" },
    { id: "11.5", key: "konvexe-optimierung", title: "Konvexe Optimierung und Zusammenfassung" },
  ],
  "12-optim": [
    { id: "12.1", key: "nichtlineare-gleichungen", title: "Nichtlineare Gleichungen" },
    { id: "12.2", key: "optimalitaet", title: "Optimalität und Sattelpunkte" },
    { id: "12.3", key: "nelder-mead-gradient", title: "Nelder-Mead und Gradientenabstieg" },
    { id: "12.4", key: "newton-sgd", title: "Newton, Quasi-Newton und SGD" },
    { id: "12.5", key: "beschraenkt", title: "Beschränkte Optimierung" },
    { id: "12.6", key: "optim-in-r", title: "Optimierung in R und Zusammenfassung" },
  ],
  "13-funktionsapproximation": [
    { id: "13.1", key: "approximation", title: "Approximation, Interpolation, Glättung" },
    { id: "13.2", key: "basisdarstellung", title: "Interpolation durch Basisdarstellung" },
    { id: "13.3", key: "polynominterpolation", title: "Polynominterpolation" },
    { id: "13.4", key: "splines", title: "Splines und B-Splines" },
    { id: "13.5", key: "minimale-kruemmung", title: "Minimale Krümmung" },
    { id: "13.6", key: "approximationsfehler", title: "Approximationsfehler" },
    { id: "13.7", key: "glaettung", title: "Glättung und Regression" },
    { id: "13.8", key: "bias-varianz", title: "Bias-Varianz und Modellwahl" },
    { id: "13.9", key: "multivariat", title: "Multivariat und Zusammenfassung" },
  ],
};
