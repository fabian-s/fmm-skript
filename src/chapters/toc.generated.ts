/* GENERIERT von scripts/gen-toc.mjs — nicht von Hand bearbeiten.
 * Neu erzeugen: npm run gen:toc (läuft auch vor dev und build).
 */
export interface TocSection {
  /** Abschnittsnummer, z. B. "3.4" — zugleich Anker-ID (#sec-3.4). */
  id: string;
  title: string;
}

/** Abschnitte je Kapitel-ID, in Reihenfolge der Registry. */
export const tocSections: Record<string, TocSection[]> = {
  "01-intro": [
    { id: "1.1", title: "Worum geht es in diesem Skript?" },
    { id: "1.2", title: "Landkarte des Skripts" },
  ],
  "02-algos": [
    { id: "2.1", title: "Numerische Probleme und Algorithmen" },
    { id: "2.2", title: "Algorithmen konkret: Fibonacci und Verwandte" },
    { id: "2.3", title: "Aufwand und Komplexität" },
    { id: "2.4", title: "Landau-Symbole und Rechenregeln" },
    { id: "2.5", title: "Fibonacci: Komplexitätsanalyse" },
  ],
  "03-matrix-spur-norm": [
    { id: "3.1", title: "Die Spur einer Matrix" },
    { id: "3.2", title: "Matrixnormen: Definition und Beispiele" },
    { id: "3.3", title: "Operatornormen" },
    { id: "3.4", title: "Schattennormen" },
    { id: "3.5", title: "Eigenschaften von Matrixnormen" },
    { id: "3.6", title: "Zusammenfassung" },
  ],
  "04-fehler": [
    { id: "4.1", title: "Fehlermaße und Fehlerzerlegung" },
    { id: "4.2", title: "Kondition" },
    { id: "4.3", title: "Stabilität von Algorithmen" },
    { id: "4.4", title: "Zusammenfassung" },
  ],
  "05-lgs": [
    { id: "5.1", title: "Numerische lineare Algebra: Grundlagen" },
    { id: "5.2", title: "Lineare Gleichungssysteme" },
    { id: "5.3", title: "Die LU-Zerlegung" },
    { id: "5.4", title: "Die Cholesky-Zerlegung" },
    { id: "5.5", title: "Zusammenfassung" },
  ],
  "06-svd": [
    { id: "6.1", title: "Motivation" },
    { id: "6.2", title: "Singulärwerte und Singulärvektoren" },
    { id: "6.3", title: "Reduzierte SVD und Pseudoinverse" },
    { id: "6.4", title: "Anwendungen" },
    { id: "6.5", title: "Zusammenfassung" },
  ],
  "07-kq": [
    { id: "7.1", title: "Kleinste Quadrate: Problem und Motivation" },
    { id: "7.2", title: "Kondition des Kleinste-Quadrate-Problems" },
    { id: "7.3", title: "Normalengleichungen und Cholesky-Zerlegung" },
    { id: "7.4", title: "QR-Zerlegung und Gram-Schmidt-Verfahren" },
    { id: "7.5", title: "Konstruktion von Q: Givens-Rotationen und Householder-Spiegelungen" },
    { id: "7.6", title: "Pseudoinverse, SVD-Lösung und Methodenvergleich" },
  ],
  "08-la-misc": [
    { id: "8.1", title: "Eigenwertprobleme: Potenzmethode und QR-Iteration" },
    { id: "8.2", title: "Anwendungen: PageRank, PCA und approximative SVD" },
    { id: "8.3", title: "Iterative Löser für lineare Gleichungssysteme" },
    { id: "8.4", title: "Probabilistische Methoden: Matrix-Sketching" },
    { id: "8.5", title: "Zusammenfassung" },
  ],
  "09-tensoren": [
    { id: "9.1", title: "Multilineare Abbildungen" },
    { id: "9.2", title: "Tensoren" },
    { id: "9.3", title: "Produkte von Tensoren" },
    { id: "9.4", title: "Tensorprodukt von Vektorräumen" },
    { id: "9.5", title: "Zusammenfassung" },
  ],
  "10-differentialrechnung": [
    { id: "10.1", title: "Ableitung als lineare Approximation" },
    { id: "10.2", title: "Der Gradient: Vektor zu Skalar" },
    { id: "10.3", title: "Die Jacobimatrix: Vektor zu Vektor" },
    { id: "10.4", title: "Ableitungen mit Matrizen" },
    { id: "10.5", title: "Stetigkeit und Linearität" },
    { id: "10.6", title: "Produkt- und Kettenregel" },
    { id: "10.7", title: "Ableitungen höheren Grades" },
    { id: "10.8", title: "Taylorapproximation" },
    { id: "10.9", title: "Zusammenfassung" },
  ],
  "11-konvexitaet": [
    { id: "11.1", title: "Konvexkombinationen und konvexe Hülle" },
    { id: "11.2", title: "Konvexe Mengen" },
    { id: "11.3", title: "Projektion und konvexe Funktionen" },
    { id: "11.4", title: "Eigenschaften konvexer Funktionen" },
    { id: "11.5", title: "Konvexe Optimierung und Zusammenfassung" },
  ],
  "12-optim": [
    { id: "12.1", title: "Nichtlineare Gleichungen" },
    { id: "12.2", title: "Optimalität und Sattelpunkte" },
    { id: "12.3", title: "Nelder-Mead und Gradientenabstieg" },
    { id: "12.4", title: "Newton, Quasi-Newton und SGD" },
    { id: "12.5", title: "Beschränkte Optimierung" },
    { id: "12.6", title: "Optimierung in R und Zusammenfassung" },
  ],
  "13-funktionsapproximation": [
    { id: "13.1", title: "Approximation, Interpolation, Glättung" },
    { id: "13.2", title: "Interpolation durch Basisdarstellung" },
    { id: "13.3", title: "Polynominterpolation" },
    { id: "13.4", title: "Splines und B-Splines" },
    { id: "13.5", title: "Minimale Krümmung" },
    { id: "13.6", title: "Approximationsfehler" },
    { id: "13.7", title: "Glättung und Regression" },
    { id: "13.8", title: "Bias-Varianz und Modellwahl" },
    { id: "13.9", title: "Multivariat und Zusammenfassung" },
  ],
};
