/**
 * Numerischer Unterbau der Widgets zu §6.4: einseitiges Jacobi-Verfahren für
 * die SVD kleiner Matrizen, Rang-k-Partialsummen, Differenzmatrix und ein
 * synthetisch erzeugtes Graustufenbild als Testmatrix.
 *
 * Der Rechenkern (jacobiSVD, rankK, matSub, das Bildraster) ist aus der
 * privaten mml-ch4-App portiert (sections/widgets/svd.ts). Übernommen ist
 * ausschließlich Code; sämtliche Beschriftungen, Captions und Statustexte der
 * Widgets sind neu geschrieben. Ergänzt wurde ein feines deterministisches
 * Rauschen im Bild; ohne das ist die Testmatrix exakt Rang 11, und der
 * Singulärwert-Verlauf bricht nach dem Ellenbogen senkrecht auf null ab.
 */

export type Mat = number[][];

export interface SVD {
  /** u[i]: i-ter linker Singulärvektor (Länge m) */
  u: number[][];
  /** s[i]: Singulärwerte, absteigend sortiert */
  s: number[];
  /** v[i]: i-ter rechter Singulärvektor (Länge n) */
  v: number[][];
  m: number;
  n: number;
}

/** Einseitiges Jacobi-Verfahren für die SVD einer m×n-Matrix: A = Σ s_i u_i v_iᵀ. */
export function jacobiSVD(A: Mat): SVD {
  const m = A.length;
  const n = A[0].length;
  // gearbeitet wird auf den Spalten: B[j] ist die j-te Spalte von A
  const B: number[][] = Array.from({ length: n }, (_, j) => A.map((row) => row[j]));
  const V: number[][] = Array.from({ length: n }, (_, j) =>
    Array.from({ length: n }, (_, i) => (i === j ? 1 : 0))
  );
  const dot = (x: number[], y: number[]) => x.reduce((acc, xi, i) => acc + xi * y[i], 0);
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0;
    for (let p = 0; p < n - 1; p++) {
      for (let q = p + 1; q < n; q++) {
        const alpha = dot(B[p], B[p]);
        const beta = dot(B[q], B[q]);
        const gamma = dot(B[p], B[q]);
        const denom = Math.sqrt(alpha * beta);
        if (denom > 0) off = Math.max(off, Math.abs(gamma) / denom);
        if (denom === 0 || Math.abs(gamma) <= 1e-14 * denom) continue;
        const zeta = (beta - alpha) / (2 * gamma);
        const t = Math.sign(zeta) / (Math.abs(zeta) + Math.sqrt(1 + zeta * zeta));
        const c = 1 / Math.sqrt(1 + t * t);
        const s = c * t;
        for (let i = 0; i < m; i++) {
          const bp = B[p][i];
          B[p][i] = c * bp - s * B[q][i];
          B[q][i] = s * bp + c * B[q][i];
        }
        for (let i = 0; i < n; i++) {
          const vp = V[p][i];
          V[p][i] = c * vp - s * V[q][i];
          V[q][i] = s * vp + c * V[q][i];
        }
      }
    }
    if (off < 1e-12) break;
  }
  const sv = B.map((col) => Math.sqrt(dot(col, col)));
  const order = sv.map((_, i) => i).sort((a, b) => sv[b] - sv[a]);
  return {
    u: order.map((i) => (sv[i] > 1e-10 ? B[i].map((x) => x / sv[i]) : B[i].map(() => 0))),
    s: order.map((i) => sv[i]),
    v: order.map((i) => V[i]),
    m,
    n,
  };
}

/** Rang-k-Partialsumme A_k = Σ_{i=1..k} σ_i u_i v_iᵀ. */
export function rankK(svd: SVD, k: number): Mat {
  const R: Mat = Array.from({ length: svd.m }, () => Array(svd.n).fill(0));
  for (let i = 0; i < Math.min(k, svd.s.length); i++) {
    for (let r = 0; r < svd.m; r++) {
      const w = svd.s[i] * svd.u[i][r];
      for (let c = 0; c < svd.n; c++) R[r][c] += w * svd.v[i][c];
    }
  }
  return R;
}

export function matSub(A: Mat, B: Mat): Mat {
  return A.map((row, i) => row.map((x, j) => x - B[i][j]));
}

/** ‖·‖_F einer Matrix. */
export function frobenius(A: Mat): number {
  let s = 0;
  for (const row of A) for (const x of row) s += x * x;
  return Math.sqrt(s);
}

/** Anteil der ersten k Singulärwerte an Σ σ_i² („Energie"); NaN für die Nullmatrix. */
export function energieAnteil(s: number[], k: number): number {
  const ganz = s.reduce((a, x) => a + x * x, 0);
  if (ganz === 0) return NaN;
  return s.slice(0, k).reduce((a, x) => a + x * x, 0) / ganz;
}

/** deterministischer linearer Kongruenzgenerator, damit das Testbild fix bleibt */
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (1103515245 * s + 12345) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Synthetisches Graustufenbild (0 = schwarz, 1 = weiß): Himmelsverlauf,
 * Sonnenscheibe, texturierter Boden, drei Torbögen, darüber ein feines
 * Rauschen. Ein echtes Foto scheidet aus (Bildrechte, öffentliches Repo).
 */
export function testBild(m = 36, n = 54, rauschen = 0.07): Mat {
  const A: Mat = [];
  const horizont = Math.round(0.66 * m);
  const steinOben = Math.round(0.28 * m);
  const pfosten = [5, 12, 19, 28, 35, 44];
  const steinBreit = 3;
  const balken: [number, number][] = [
    [5, 15],
    [19, 31],
    [35, 47],
  ];
  const rnd = lcg(20260811);
  for (let i = 0; i < m; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      let w: number;
      if (i < horizont) {
        w = 0.88 - 0.2 * (i / horizont); // Himmel, oben heller
      } else {
        w = 0.5 - 0.18 * ((i - horizont) / (m - horizont)); // Boden
        w += 0.04 * Math.sin(0.7 * j + i); // Grasstruktur
      }
      // Sonnenscheibe rechts oben
      const d2 = (i - 0.12 * m) ** 2 + ((j - 0.85 * n) * 0.8) ** 2;
      w = Math.max(w, 0.98 * Math.exp(-d2 / 14));
      // stehende Pfosten
      if (i >= steinOben + 3 && i < horizont + 2) {
        for (const s of pfosten) {
          if (j >= s && j < s + steinBreit) w = 0.14 + 0.05 * Math.sin(3 * s + i);
        }
      }
      // Querbalken
      if (i >= steinOben && i < steinOben + 3) {
        for (const [a, b] of balken) {
          if (j >= a && j < b) w = 0.18;
        }
      }
      w += rauschen * (rnd() - 0.5);
      row.push(Math.min(1, Math.max(0, w)));
    }
    A.push(row);
  }
  return A;
}

let cache: { A: Mat; svd: SVD } | null = null;

/** Das Testbild und seine SVD, einmal berechnet und dann wiederverwendet. */
export function bildMitSVD(): { A: Mat; svd: SVD } {
  if (!cache) {
    const A = testBild();
    cache = { A, svd: jacobiSVD(A) };
  }
  return cache;
}
