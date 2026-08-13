import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * §13.1: Fixpunktiteration x^(k) = x^(k-1) - gamma * f(x^(k-1)) in der Ebene.
 *
 * Widget-CODE (Ebenen-Panel mit Achsenkreuz, Spiralpfad, abnehmende Deckkraft
 * der Iterierten, rho-Ablesung neben dem Bild) portiert aus
 * heath-ch5-6/src/sections/widgets/S56Widgets.tsx (FixedPointSpiralWidget).
 * ALLE Texte, die drei Beispielsysteme, die gamma-Steuerung und die
 * Statuszweige sind neu und gehoeren zu diesem Skript.
 *
 * Farbrollen nach dem Kapitel-13-Code: Iterierte und ihr Weg blau, Fixpunkt
 * gruen, Divergenzwarnung rot.
 *
 * Alles ist linear: f(x) = A(x - x*), also J_f = A ueberall und
 * rho = ||I - gamma A||_2 exakt. Nachgerechnet (node, check-fix-s131.mjs):
 * - A = (4 1; 1 3): Eigenwerte 4,618034 / 2,381966, gamma_opt = 2/7 mit
 *   rho = sqrt(5)/7 = 0,3194, Divergenz ab gamma > 2/lambda_max = 0,4331;
 *   bei gamma = 0,25 ist rho = 0,4045 (dieselbe Zahl wie in §8.3).
 * - A = (1 -2; 2 1): Eigenwerte 1 +- 2i, rho(gamma) = sqrt((1-g)^2 + 4g^2),
 *   Minimum 2/sqrt(5) = 0,8944 bei gamma = 0,2, Divergenz ab gamma = 0,4.
 * - A = diag(1, 10): rho = max(|1-g|, |1-10g|), gamma_opt = 2/11 = 0,1818
 *   mit rho = 9/11 = 0,8182, Divergenz ab gamma = 0,2.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ROT = "#D55E00";
const ACHSE = "#94a3b8";

type M2 = [[number, number], [number, number]];

interface System {
  id: string;
  label: string;
  A: M2;
  /** Startpunkt relativ zum Fixpunkt */
  x0: [number, number];
  gammaOpt: number;
  /** kleinstmoegliches rho, angenommen bei gammaOpt */
  rhoOpt: number;
  gammaMax: number;
  kurz: string;
}

const SYSTEME: System[] = [
  {
    id: "gutartig",
    label: "A = (4 1; 1 3)",
    A: [
      [4, 1],
      [1, 3],
    ],
    x0: [1.7, 0.6],
    gammaOpt: 2 / 7,
    rhoOpt: Math.sqrt(5) / 7,
    gammaMax: 2 / ((7 + Math.sqrt(5)) / 2),
    kurz: "symmetrisch, Eigenwerte 4,618 und 2,382",
  },
  {
    id: "drehung",
    label: "A = (1 −2; 2 1)",
    A: [
      [1, -2],
      [2, 1],
    ],
    x0: [1.7, 0.6],
    gammaOpt: 0.2,
    rhoOpt: 2 / Math.sqrt(5),
    gammaMax: 0.4,
    kurz: "komplexe Eigenwerte 1 ± 2i, also ein Drehanteil",
  },
  {
    id: "kondition",
    label: "A = diag(1, 10)",
    A: [
      [1, 0],
      [0, 10],
    ],
    x0: [1.8, 1.4],
    gammaOpt: 2 / 11,
    rhoOpt: 9 / 11,
    gammaMax: 0.2,
    kurz: "Eigenwerte 1 und 10, Kondition 10",
  },
];

const K_MAX = 30;
const W = 290;
const R_SICHT = 2.4;

/** Spektralnorm einer 2x2-Matrix: groesster Singulaerwert. */
function spektralnorm(M: M2): number {
  const b11 = M[0][0] ** 2 + M[1][0] ** 2;
  const b12 = M[0][0] * M[0][1] + M[1][0] * M[1][1];
  const b22 = M[0][1] ** 2 + M[1][1] ** 2;
  const spur = b11 + b22;
  const det = b11 * b22 - b12 * b12;
  return Math.sqrt(spur / 2 + Math.sqrt(Math.max(0, (spur * spur) / 4 - det)));
}

function fmt(v: number, d = 3): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  return (Number(s) === 0 ? Math.abs(Number(s)).toFixed(d) : s)
    .replace(".", ",")
    .replace(/^-/, "−");
}

const HOCH: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻",
};

function fmtE(v: number): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return "∞";
  if (v === 0) return "0";
  const [mant, ex] = v.toExponential(2).split("e");
  const hoch = String(Number(ex))
    .split("")
    .map((c) => HOCH[c] ?? c)
    .join("");
  return `${mant.replace(".", ",")}·10${hoch}`;
}

export function FixpunktSpirale() {
  const [id, setId] = useState("gutartig");
  const [gamma, setGamma] = useState(0.25);

  const sys = SYSTEME.find((s) => s.id === id) ?? SYSTEME[0];
  const A = sys.A;
  const G: M2 = [
    [1 - gamma * A[0][0], -gamma * A[0][1]],
    [-gamma * A[1][0], 1 - gamma * A[1][1]],
  ];
  const rho = spektralnorm(G);

  const punkte: Array<[number, number]> = [sys.x0];
  for (let k = 0; k < K_MAX; k++) {
    const [x, y] = punkte[punkte.length - 1];
    const nx = G[0][0] * x + G[0][1] * y;
    const ny = G[1][0] * x + G[1][1] * y;
    if (!Number.isFinite(nx) || !Number.isFinite(ny)) break;
    punkte.push([nx, ny]);
  }
  const letzter = punkte[punkte.length - 1];
  const abstand = Math.hypot(letzter[0], letzter[1]);
  const start = Math.hypot(sys.x0[0], sys.x0[1]);
  const nSchritte = punkte.length - 1;

  const q = (v: number) =>
    ((Math.max(-R_SICHT, Math.min(R_SICHT, v)) + R_SICHT) / (2 * R_SICHT)) * W;
  let pfad = "";
  punkte.forEach((p, i) => {
    pfad += `${i === 0 ? "M" : "L"}${q(p[0]).toFixed(1)} ${(W - q(p[1])).toFixed(1)}`;
  });

  const ausserhalb = punkte.some(
    (p) => Math.abs(p[0]) > R_SICHT || Math.abs(p[1]) > R_SICHT,
  );

  let status: string;
  if (rho >= 1) {
    // Bei rho = 1 exakt bleibt der Abstand stehen; ein Promille Toleranz haelt
    // Rundungsdrift aus dem Wachstums-Zweig heraus.
    const gewachsen = abstand > 1.001 * start;
    status =
      `ρ = ${fmt(rho)} ist nicht kleiner als 1, damit sagt Satz 13.1.16 nichts mehr zu. Nach ` +
      `${nSchritte} Schritten steht der Abstand zum Fixpunkt bei ${fmtE(abstand)}, gestartet sind ` +
      `wir bei ${fmt(start)}. ` +
      (gewachsen
        ? `Der Fehler wächst also, und der Zuwachs pro Schritt nähert sich dem Faktor ρ. `
        : `Gewachsen ist er nicht: Bei ρ = 1 hält die Iteration den Fehler in mindestens einer ` +
          `Richtung genau fest, und weiter als bis dorthin kommt sie nicht. `) +
      `Zusammen läuft die Iteration nur für γ < ${fmt(sys.gammaMax)}.`;
  } else if (Math.abs(gamma - sys.gammaOpt) < 0.011 && rho <= 1.05 * sys.rhoOpt) {
    status =
      `Das ist ungefähr die beste Schrittweite für dieses System: ρ = ${fmt(rho)} liegt höchstens ` +
      `fünf Prozent über dem erreichbaren Minimum ${fmt(sys.rhoOpt)}, das bei ` +
      `γ* ≈ ${fmt(sys.gammaOpt)} steht. Nach ${nSchritte} Schritten ist der Abstand von ` +
      `${fmt(start)} auf ${fmtE(abstand)} gefallen. Weiter weg von γ* wird es in beide ` +
      `Richtungen schlechter, nach links wegen zu kleiner Schritte, nach rechts wegen des ` +
      `Überschießens.`;
  } else if (gamma < sys.gammaOpt) {
    status =
      `ρ = ${fmt(rho)} < 1, die Folge läuft also zusammen, aber gemächlich: Nach ${nSchritte} Schritten ` +
      `steht der Abstand bei ${fmtE(abstand)}, gestartet sind wir bei ${fmt(start)}. Jeder Schritt ` +
      `korrigiert nur einen Bruchteil γ des Residuums; das ist der Fall „γ zu klein“. Bis ` +
      `γ ≈ ${fmt(sys.gammaOpt)} lohnt sich jedes Stück nach rechts.`;
  } else {
    status =
      `γ liegt bereits über der besten Wahl γ* ≈ ${fmt(sys.gammaOpt)}, und das kostet: ρ ist mit ` +
      `${fmt(rho)} wieder größer als das erreichbare Minimum ${fmt(sys.rhoOpt)}. Die Folge läuft ` +
      `noch zusammen, nach ${nSchritte} Schritten steht der Abstand bei ${fmtE(abstand)}. Jenseits ` +
      `von γ = ${fmt(sys.gammaMax)} kippt sie ganz.`;
  }

  const knopf = (aktiv: boolean) =>
    `rounded border px-2 py-1 text-sm ${
      aktiv
        ? "border-slate-500 bg-slate-200 font-semibold dark:bg-slate-700"
        : "border-slate-300 dark:border-slate-600"
    }`;

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Für ein affines f(x) = A(x − x*) hängt die Jacobimatrix nicht vom Ort ab, sie ist an
        jeder Stelle A. Deshalb greift hier Schritt 5 des Beweises von Satz 13.1.16: Die Schranke
        ‖x⁽ᵏ⁾ − x*‖ ≤ ρ‖x⁽ᵏ⁻¹⁾ − x*‖ mit ρ = ‖I − γA‖₂ trägt ohne Restterm und ab dem ersten
        Schritt. Alle drei A sind so gewählt, dass I − γA normal ist, also fallen Spektralnorm und
        größter Eigenwertbetrag zusammen. Blau ist der Weg der ersten 30 Schritte, grün der
        Fixpunkt x* = 0.
      </p>
      <div className="flex flex-wrap gap-2">
        {SYSTEME.map((s) => (
          <button key={s.id} type="button" className={knopf(s.id === id)} onClick={() => setId(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <Slider
        label="γ"
        value={gamma}
        onChange={setGamma}
        min={0.01}
        max={0.6}
        step={0.01}
        fmt={(v) => fmt(v, 2)}
      />

      <div className="flex flex-wrap items-start gap-4">
        <svg
          width={W}
          height={W}
          viewBox={`0 0 ${W} ${W}`}
          className="max-w-full overflow-hidden rounded border border-slate-300 bg-white dark:border-slate-600"
        >
          <line x1={0} y1={W / 2} x2={W} y2={W / 2} stroke={ACHSE} strokeWidth={0.8} />
          <line x1={W / 2} y1={0} x2={W / 2} y2={W} stroke={ACHSE} strokeWidth={0.8} />
          {[-2, -1, 1, 2].map((t) => (
            <g key={`t${t}`}>
              <text x={q(t)} y={W / 2 + 12} fontSize={9} fill={ACHSE} textAnchor="middle">
                {String(t).replace("-", "−")}
              </text>
              <text x={W / 2 + 5} y={W - q(t) + 3} fontSize={9} fill={ACHSE}>
                {String(t).replace("-", "−")}
              </text>
            </g>
          ))}
          <text x={W - 6} y={W / 2 - 6} fontSize={10} fill="#64748b" textAnchor="end">
            x₁
          </text>
          <text x={W / 2 + 6} y={12} fontSize={10} fill="#64748b">
            x₂
          </text>
          <path d={pfad} fill="none" stroke={BLAU} strokeWidth={1.3} opacity={0.75} />
          {punkte.map((p, i) => (
            <circle
              key={i}
              cx={q(p[0])}
              cy={W - q(p[1])}
              r={i === 0 ? 4.5 : 2.6}
              fill={BLAU}
              opacity={Math.max(0.25, 1 - i * 0.025)}
            />
          ))}
          <circle cx={W / 2} cy={W / 2} r={5} fill="none" stroke={GRUEN} strokeWidth={2.2} />
        </svg>

        <div className="min-w-56 grow space-y-1 text-sm">
          <p className="text-xs text-slate-600 dark:text-slate-400">{sys.kurz}</p>
          <p className="font-mono text-xs">
            I − γA = ({fmt(G[0][0], 2)} {fmt(G[0][1], 2)}; {fmt(G[1][0], 2)} {fmt(G[1][1], 2)})
          </p>
          <p className="font-mono text-xs">ρ = ‖I − γA‖₂ = {fmt(rho)}</p>
          <p className="font-mono text-xs">
            ‖x⁽⁰⁾ − x*‖ = {fmt(start)} · nach {nSchritte} Schritten {fmtE(abstand)}
          </p>
          <p className="font-mono text-xs">
            bestes γ ≈ {fmt(sys.gammaOpt)} · Divergenz ab γ &gt; {fmt(sys.gammaMax)}
          </p>
          <p
            className="pt-1 font-semibold"
            style={{ color: rho < 1 ? GRUEN : ROT }}
          >
            {rho < 1 ? "ρ < 1: Satz 13.1.16 greift" : "ρ ≥ 1: die Schranke trägt nicht mehr"}
          </p>
          {ausserhalb && (
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ein Teil des Weges liegt außerhalb des gezeigten Fensters [−2,4; 2,4]²; diese Punkte
              sind an den Rand gelegt.
            </p>
          )}
        </div>
      </div>

      <p className="max-w-prose text-sm text-slate-700 dark:text-slate-300">{status}</p>
    </div>
  );
}
