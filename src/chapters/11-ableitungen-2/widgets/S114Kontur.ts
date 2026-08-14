/**
 * §11.4: Höhenlinien für die beiden Zweitafel-Widgets dieses Abschnitts
 * (Taylor2DWidget und NewtonStepper). Reiner Rechenkern ohne JSX.
 *
 * Verfahren: Wir legen ein Gitter über das Fenster, zerlegen jede Zelle in
 * zwei Dreiecke und schneiden jedes Dreieck mit der Ebene z = Niveau. Ein
 * Dreieck hat entweder keinen oder genau einen Schnitt, also entstehen keine
 * mehrdeutigen Sattelzellen wie beim üblichen Marching-Squares-Verfahren.
 *
 * Alles ist deterministisch: feste Gitterweite, keine Zufallszahlen.
 */

export interface Gitter {
  /** Stützstellen in x-Richtung, Länge n + 1 */
  x: number[];
  /** Stützstellen in y-Richtung, Länge n + 1 */
  y: number[];
  /** v[i][j] = f(x[i], y[j]); nicht-endliche Werte sind erlaubt */
  v: number[][];
  /** kleinster bzw. größter endlicher Wert auf dem Gitter */
  min: number;
  max: number;
}

export interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Wertegitter von f über [x0, x1] × [y0, y1] mit n Zellen je Richtung. */
export function gitter(
  f: (x: number, y: number) => number,
  xDom: [number, number],
  yDom: [number, number],
  n: number,
): Gitter {
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i <= n; i++) {
    x.push(xDom[0] + ((xDom[1] - xDom[0]) * i) / n);
    y.push(yDom[0] + ((yDom[1] - yDom[0]) * i) / n);
  }
  const v: number[][] = [];
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i <= n; i++) {
    const spalte: number[] = [];
    for (let j = 0; j <= n; j++) {
      const w = f(x[i], y[j]);
      spalte.push(w);
      if (Number.isFinite(w)) {
        if (w < min) min = w;
        if (w > max) max = w;
      }
    }
    v.push(spalte);
  }
  return { x, y, v, min, max };
}

/** Schnitt eines Dreiecks mit dem Niveau; hängt höchstens ein Segment an. */
function dreieck(
  p: [number, number, number][],
  niveau: number,
  raus: Segment[],
): void {
  const punkte: [number, number][] = [];
  for (let i = 0; i < 3; i++) {
    const a = p[i];
    const b = p[(i + 1) % 3];
    if (!Number.isFinite(a[2]) || !Number.isFinite(b[2])) return;
    const da = a[2] - niveau;
    const db = b[2] - niveau;
    if ((da <= 0 && db > 0) || (da > 0 && db <= 0)) {
      const t = da / (da - db);
      punkte.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
    }
  }
  if (punkte.length === 2) {
    raus.push({ x1: punkte[0][0], y1: punkte[0][1], x2: punkte[1][0], y2: punkte[1][1] });
  }
}

/** Alle Segmente der Höhenlinie zum gegebenen Niveau. */
export function hoehenlinie(g: Gitter, niveau: number): Segment[] {
  const raus: Segment[] = [];
  for (let i = 0; i + 1 < g.x.length; i++) {
    for (let j = 0; j + 1 < g.y.length; j++) {
      const a: [number, number, number] = [g.x[i], g.y[j], g.v[i][j]];
      const b: [number, number, number] = [g.x[i + 1], g.y[j], g.v[i + 1][j]];
      const c: [number, number, number] = [g.x[i + 1], g.y[j + 1], g.v[i + 1][j + 1]];
      const d: [number, number, number] = [g.x[i], g.y[j + 1], g.v[i][j + 1]];
      dreieck([a, b, c], niveau, raus);
      dreieck([a, c, d], niveau, raus);
    }
  }
  return raus;
}

/** Gleichmäßig verteilte Niveaus zwischen zwei Werten, Ränder ausgespart. */
export function niveaus(min: number, max: number, anzahl: number): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return [];
  const raus: number[] = [];
  for (let i = 1; i <= anzahl; i++) raus.push(min + ((max - min) * i) / (anzahl + 1));
  return raus;
}
