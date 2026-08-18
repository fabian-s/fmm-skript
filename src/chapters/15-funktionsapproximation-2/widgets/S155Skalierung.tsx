import { useMemo, useState } from "react";

/**
 * §15.5: Wie die Zahl der Koeffizienten mit der Dimension waechst.
 *
 * Eigenbau, rein deterministisch (kein Zufall, keine R-Ausgabe uebernommen).
 * Verglichen werden die volle Tensor-Produkt-Basis mit K^p Koeffizienten und
 * das additive Modell mit p*K + 1 Koeffizienten; dazu Speicherbedarf bei
 * 8 Byte pro Koeffizient und die Konvergenzrate 8/(8+p).
 *
 * Farbrollen nach dem Kapitel-15-Code: Basis/Koeffizienten orange, der
 * Schaetzer des additiven Modells gruen.
 *
 * Nachgerechnet (node, check-s155.mjs):
 *   K = 10, p = 10:  10^10 Koeffizienten, 10^10 * 8 B = 80 GB (74,5 GiB)
 *   K = 10, p =  5:  10^5 Koeffizienten, 800 kB
 *   additiv p = 10:  91 freie Parameter nach Zentrierung, 728 Bytes
 *   n fuer MSE <= 0,01 bei Konstante 1: 10^((8+p)/4)
 *
 * Achtung fuer spaetere Aenderungen: py() normiert mit loMax = log10(K^10),
 * die orange Gerade liegt deshalb fuer JEDES K auf denselben Bildpunkten
 * (log10(K^q)/loMax = q/10). Nur die Achsenbeschriftung und die relative Lage
 * der gruenen Kurve haengen an K; die Vertiefung in S155.mdx sagt das so.
 */

const GRUEN = "#009E73";
const ORANGE = "#E69F00";
const ACHSE = "#64748b";
const RAHMEN = "#cbd5e1";

const P_MAX = 10;
const BYTE_PRO_KOEFFIZIENT = 8;

const HOCH = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];

function hochzahl(n: number): string {
  return String(n)
    .split("")
    .map((z) => HOCH[Number(z)] ?? z)
    .join("");
}

function komma(x: number, stellen: number): string {
  const s = x.toFixed(stellen);
  const gekuerzt = s.includes(".") ? s.replace(/0+$/, "").replace(/\.$/, "") : s;
  return gekuerzt.replace(".", ",");
}

/** Ganze Zahlen bis 99999 ausgeschrieben, darueber als Zehnerpotenz. */
function fmtAnzahl(x: number): string {
  if (!Number.isFinite(x)) return "nicht darstellbar";
  if (x < 1e5) return Math.round(x).toLocaleString("de-DE");
  const e = Math.floor(Math.log10(x));
  const m = x / Math.pow(10, e);
  const vorn = Math.abs(m - 1) < 1e-9 ? "" : `${komma(m, 2)} · `;
  return `${vorn}10${hochzahl(e)}`;
}

/** Dezimale Praefixe wie auf der Folie: 1 kB = 1000 Bytes. */
function fmtSpeicher(bytes: number): string {
  if (!Number.isFinite(bytes)) return "nicht darstellbar";
  const stufen: Array<[number, string]> = [
    [1e15, "PB"],
    [1e12, "TB"],
    [1e9, "GB"],
    [1e6, "MB"],
    [1e3, "kB"],
  ];
  for (const [teiler, name] of stufen) {
    if (bytes >= teiler) {
      const wert = bytes / teiler;
      return `${wert >= 100 ? komma(wert, 0) : komma(wert, wert >= 10 ? 1 : 2)} ${name}`;
    }
  }
  return `${Math.round(bytes)} Bytes`;
}

const W = 380;
const H = 240;
const PAD = { l: 46, r: 14, t: 14, b: 34 };

export function SkalierungTensorGam() {
  const [p, setP] = useState(5);
  const [K, setK] = useState(10);

  const daten = useMemo(() => {
    const zeilen = [];
    for (let q = 1; q <= P_MAX; q++) {
      zeilen.push({
        p: q,
        tensor: Math.pow(K, q),
        additiv: q * K + 1,
        // nach Zentrierung jeder Komponente frei waehlbar (Bemerkung 15.5.9)
        zentriert: q * (K - 1) + 1,
      });
    }
    return zeilen;
  }, [K]);

  const aktuell = daten[p - 1];
  const rate = 8 / (8 + p);
  const nFuerZiel = Math.pow(10, (8 + p) / 4);

  const loMax = Math.max(1, Math.log10(daten[P_MAX - 1].tensor));
  const schritt = loMax > 9 ? 3 : loMax > 5 ? 2 : 1;
  const ticks: number[] = [];
  for (let l = 0; l <= loMax + 1e-9; l += schritt) ticks.push(l);

  const px = (q: number) => PAD.l + ((q - 1) / (P_MAX - 1)) * (W - PAD.l - PAD.r);
  const py = (lo: number) => H - PAD.b - (lo / loMax) * (H - PAD.t - PAD.b);
  const linie = (wert: (z: (typeof daten)[number]) => number) =>
    daten.map((z, i) => `${i === 0 ? "M" : "L"}${px(z.p)},${py(Math.log10(wert(z)))}`).join(" ");

  const speicherTensor = aktuell.tensor * BYTE_PRO_KOEFFIZIENT;
  const status =
    p === 1
      ? `Bei p = 1 gibt es nichts zu vergleichen: ${fmtAnzahl(aktuell.tensor)} gegen ${fmtAnzahl(aktuell.additiv)} Koeffizienten, und der eine Unterschied ist der Achsenabschnitt, den eine B-Spline-Basis wegen der Zerlegung der Eins ohnehin schon enthält. Beide Ansätze sind dieselbe univariate Anpassung; der Fluch beginnt erst mit der zweiten Variablen.`
      : speicherTensor < 1e6
        ? `Mit p = ${p} und K = ${K} kostet die Tensor-Produkt-Basis ${fmtAnzahl(aktuell.tensor)} Koeffizienten (${fmtSpeicher(speicherTensor)}). Das passt noch bequem in den Speicher, und wir brauchen mindestens ebenso viele Beobachtungen, damit die Designmatrix vollen Spaltenrang haben kann.`
        : speicherTensor < 1e9
          ? `Mit p = ${p} und K = ${K} sind es ${fmtAnzahl(aktuell.tensor)} Koeffizienten (${fmtSpeicher(speicherTensor)}). Der Speicher reicht noch, die geforderten ${fmtAnzahl(aktuell.tensor)} Beobachtungen sind in den meisten Anwendungen aber schon die härtere Schranke. Das additive Modell käme nach Zentrierung mit ${fmtAnzahl(aktuell.zentriert)} freien Parametern aus.`
          : `Mit p = ${p} und K = ${K} verlangt die Tensor-Produkt-Basis ${fmtAnzahl(aktuell.tensor)} Koeffizienten, also ${fmtSpeicher(speicherTensor)} allein für den Koeffizienten-Tensor. Praktikabel ist das nicht mehr; das additive Modell braucht nach Zentrierung nur ${fmtAnzahl(aktuell.zentriert)} freie Parameter (${fmtSpeicher(aktuell.zentriert * BYTE_PRO_KOEFFIZIENT)}).`;

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Orange die volle Tensor-Produkt-Basis mit K<sup>p</sup> Koeffizienten, grün das additive
        Modell mit p · (K − 1) + 1 freien Parametern nach Zentrierung. Die senkrechte Achse ist logarithmisch; eine Gerade
        darin bedeutet exponentielles Wachstum. Alle Zahlen rechnet dieses Widget selbst.
      </p>

      <label className="my-1 flex items-center gap-3 text-sm">
        <span className="w-40 shrink-0 text-right">Dimension p</span>
        <input
          type="range"
          className="grow accent-sky-600"
          min={1}
          max={P_MAX}
          step={1}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
        />
        <span className="w-14 shrink-0 font-mono text-xs">{p}</span>
      </label>

      <label className="my-1 flex items-center gap-3 text-sm">
        <span className="w-40 shrink-0 text-right">Basisfunktionen K je Variable</span>
        <input
          type="range"
          className="grow accent-sky-600"
          min={4}
          max={20}
          step={1}
          value={K}
          onChange={(e) => setK(Number(e.target.value))}
        />
        <span className="w-14 shrink-0 font-mono text-xs">{K}</span>
      </label>

      <div className="flex flex-wrap gap-4">
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <rect
            x={PAD.l}
            y={PAD.t}
            width={W - PAD.l - PAD.r}
            height={H - PAD.t - PAD.b}
            fill="none"
            stroke={RAHMEN}
            strokeWidth={0.8}
          />
          {ticks.map((l) => (
            <g key={`y${l}`}>
              <line x1={PAD.l - 3} x2={W - PAD.r} y1={py(l)} y2={py(l)} stroke={RAHMEN} />
              <text x={PAD.l - 5} y={py(l) + 3} textAnchor="end" fontSize={9} fill={ACHSE}>
                10{hochzahl(l)}
              </text>
            </g>
          ))}
          {daten.map((z) => (
            <text
              key={`x${z.p}`}
              x={px(z.p)}
              y={H - PAD.b + 14}
              textAnchor="middle"
              fontSize={9}
              fill={ACHSE}
            >
              {z.p}
            </text>
          ))}
          <text x={(PAD.l + W - PAD.r) / 2} y={H - 4} textAnchor="middle" fontSize={9} fill={ACHSE}>
            Dimension p
          </text>
          <text
            x={12}
            y={(PAD.t + H - PAD.b) / 2}
            textAnchor="middle"
            fontSize={9}
            fill={ACHSE}
            transform={`rotate(-90 12 ${(PAD.t + H - PAD.b) / 2})`}
          >
            Koeffizienten
          </text>
          <line
            x1={px(p)}
            x2={px(p)}
            y1={PAD.t}
            y2={H - PAD.b}
            stroke={ACHSE}
            strokeWidth={0.8}
            strokeDasharray="3 3"
          />
          <path d={linie((z) => z.tensor)} fill="none" stroke={ORANGE} strokeWidth={2.2} />
          <path d={linie((z) => z.additiv)} fill="none" stroke={GRUEN} strokeWidth={2.2} />
          <circle cx={px(p)} cy={py(Math.log10(aktuell.tensor))} r={4} fill={ORANGE} />
          <circle cx={px(p)} cy={py(Math.log10(aktuell.additiv))} r={4} fill={GRUEN} />
          <text x={PAD.l + 6} y={PAD.t + 12} fontSize={9} fill={ORANGE}>
            Tensorprodukt
          </text>
          <text x={PAD.l + 6} y={PAD.t + 24} fontSize={9} fill={GRUEN}>
            additiv
          </text>
        </svg>

        <div className="grow overflow-x-auto rounded border border-slate-300 dark:border-slate-600">
          <table className="w-full text-right font-mono text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr className="text-slate-600 dark:text-slate-300">
                <th className="px-2 py-1 text-left">p = {p}, K = {K}</th>
                <th className="px-2 py-1">Tensorprodukt</th>
                <th className="px-2 py-1">additiv</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-0.5 text-left">Zahl im Modell</td>
                <td className="px-2 py-0.5">{fmtAnzahl(aktuell.tensor)}</td>
                <td className="px-2 py-0.5">{fmtAnzahl(aktuell.additiv)}</td>
              </tr>
              <tr>
                <td className="px-2 py-0.5 text-left">Speicher (8 Byte)</td>
                <td className="px-2 py-0.5">{fmtSpeicher(speicherTensor)}</td>
                <td className="px-2 py-0.5">
                  {fmtSpeicher(aktuell.additiv * BYTE_PRO_KOEFFIZIENT)}
                </td>
              </tr>
              <tr>
                <td className="px-2 py-0.5 text-left">Beobachtungen mindestens</td>
                <td className="px-2 py-0.5">{fmtAnzahl(aktuell.tensor)}</td>
                <td className="px-2 py-0.5">{fmtAnzahl(aktuell.zentriert)}</td>
              </tr>
              <tr>
                <td className="px-2 py-0.5 text-left">balancierte MSE-Obergrenze</td>
                <td className="px-2 py-0.5" colSpan={2}>
                  n<sup>−{komma(rate, 3)}</sup> = n<sup>−8/{8 + p}</sup>
                </td>
              </tr>
              <tr>
                <td className="px-2 py-0.5 text-left">Proxy-n (Konstante 1)</td>
                <td className="px-2 py-0.5" colSpan={2}>
                  {fmtAnzahl(nFuerZiel)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="max-w-prose text-sm text-slate-700 dark:text-slate-300">{status}</p>
    </div>
  );
}
