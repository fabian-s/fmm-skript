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
  | "sec:algos/aufwand"
  | "sec:algos/fibonacci"
  | "sec:algos/fibonacci-komplexitaet"
  | "sec:algos/landau"
  | "sec:algos/probleme-algorithmen"
  | "sec:differentialrechnung/gradient"
  | "sec:differentialrechnung/hoehere-ableitungen"
  | "sec:differentialrechnung/jacobi"
  | "sec:differentialrechnung/linearisierung"
  | "sec:differentialrechnung/matrixableitungen"
  | "sec:differentialrechnung/produkt-kettenregel"
  | "sec:differentialrechnung/stetigkeit"
  | "sec:differentialrechnung/taylor"
  | "sec:differentialrechnung/zusammenfassung"
  | "sec:fehler/fehlermasse"
  | "sec:fehler/kondition"
  | "sec:fehler/stabilitaet"
  | "sec:fehler/zusammenfassung"
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
  | "sec:optim/beschraenkt"
  | "sec:optim/nelder-mead-gradient"
  | "sec:optim/newton-sgd"
  | "sec:optim/nichtlineare-gleichungen"
  | "sec:optim/optim-in-r"
  | "sec:optim/optimalitaet"
  | "sec:svd/anwendungen"
  | "sec:svd/motivation"
  | "sec:svd/reduzierte-svd"
  | "sec:svd/singulaerwerte"
  | "sec:svd/zusammenfassung"
  | "sec:tensoren/multilinear"
  | "sec:tensoren/produkte"
  | "sec:tensoren/tensoren"
  | "sec:tensoren/tensorprodukt"
  | "sec:tensoren/zusammenfassung";

/** [Nummer, Verweistext] je Schlüssel. */
export const NUMBERS: Record<NumKey, readonly [string, string]> = {
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
  "sec:algos/aufwand": ["2.3", "Abschnitt 2.3"],
  "sec:algos/fibonacci": ["2.2", "Abschnitt 2.2"],
  "sec:algos/fibonacci-komplexitaet": ["2.5", "Abschnitt 2.5"],
  "sec:algos/landau": ["2.4", "Abschnitt 2.4"],
  "sec:algos/probleme-algorithmen": ["2.1", "Abschnitt 2.1"],
  "sec:differentialrechnung/gradient": ["10.2", "Abschnitt 10.2"],
  "sec:differentialrechnung/hoehere-ableitungen": ["10.7", "Abschnitt 10.7"],
  "sec:differentialrechnung/jacobi": ["10.3", "Abschnitt 10.3"],
  "sec:differentialrechnung/linearisierung": ["10.1", "Abschnitt 10.1"],
  "sec:differentialrechnung/matrixableitungen": ["10.4", "Abschnitt 10.4"],
  "sec:differentialrechnung/produkt-kettenregel": ["10.6", "Abschnitt 10.6"],
  "sec:differentialrechnung/stetigkeit": ["10.5", "Abschnitt 10.5"],
  "sec:differentialrechnung/taylor": ["10.8", "Abschnitt 10.8"],
  "sec:differentialrechnung/zusammenfassung": ["10.9", "Abschnitt 10.9"],
  "sec:fehler/fehlermasse": ["4.1", "Abschnitt 4.1"],
  "sec:fehler/kondition": ["4.2", "Abschnitt 4.2"],
  "sec:fehler/stabilitaet": ["4.3", "Abschnitt 4.3"],
  "sec:fehler/zusammenfassung": ["4.4", "Abschnitt 4.4"],
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
  "sec:optim/beschraenkt": ["12.5", "Abschnitt 12.5"],
  "sec:optim/nelder-mead-gradient": ["12.3", "Abschnitt 12.3"],
  "sec:optim/newton-sgd": ["12.4", "Abschnitt 12.4"],
  "sec:optim/nichtlineare-gleichungen": ["12.1", "Abschnitt 12.1"],
  "sec:optim/optim-in-r": ["12.6", "Abschnitt 12.6"],
  "sec:optim/optimalitaet": ["12.2", "Abschnitt 12.2"],
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
};

/** Nur die Nummer, z. B. num("satz:kkt") → "12.5.7". */
export function num(key: NumKey): string {
  return NUMBERS[key][0];
}

/** Verweistext mit Art, z. B. ref("satz:kkt") → "Satz 12.5.7", ref("eq:x") → "(12.5.3)". */
export function ref(key: NumKey): string {
  return NUMBERS[key][1];
}
