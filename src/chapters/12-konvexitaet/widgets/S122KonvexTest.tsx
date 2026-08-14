import { useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { niceTicks } from "../../../lib";

/**
 * §12.2: Konvexitäts-Test (Eigenbau).
 *
 * Vier Mengen im R^2 stehen zur Wahl (Kreisscheibe, Kreisring, Dreieck als
 * Schnitt dreier Halbräume, Unterseite der Parabel y <= x^2). Zwei Klicks
 * setzen die Punkte x und y, das Widget zeichnet die Verbindungsstrecke
 * {lambda x + (1-lambda) y} und meldet, ob sie die Menge verlässt.
 *
 * Ersetzt die beiden Folienbilder convex-set.png / nonconvex-set.png
 * (12-konvexitaet.Rmd Z. 167-172), die im öffentlichen Repo nicht verwendet
 * werden dürfen. Der Aufbau (Achsenraster aus niceTicks, Klick-zu-Welt-
 * Umrechnung, Rasterung auf 0,05) folgt dem Muster von
 * 10-ableitungen-1/widgets/S102Gradient.tsx; Mengen, Auswertung, Farbrollen
 * und sämtliche Texte sind für diesen Abschnitt neu.
 *
 * Farbcode Kapitel 12: Menge blau, Verbindungsstrecke grün, der Teil der
 * Strecke außerhalb der Menge rot, Extrempunkte orange.
 *
 * Per node nachgerechnet (Scratchpad check-math-s122.mjs):
 * Kreisring 0,8 <= ||z|| <= 1,2 mit x = (1,1; 0), y = (0; 1,1): die Strecke
 * liegt für lambda in (0,380; 0,620) im Loch, ihr Mittelpunkt hat die Norm
 * 1,1/sqrt(2) = 0,7778 < 0,8; Parabelmenge mit x = (-1; 1), y = (1; 1):
 * z(lambda) = (1-2*lambda; 1) liegt für JEDES lambda in (0,1) außerhalb,
 * weil 1 <= (1-2*lambda)^2 nur für lambda <= 0 oder lambda >= 1 gilt.
 */

const BLAU = "#0072B2"; // die Menge selbst
const GRUEN = "#009E73"; // Verbindungsstrecke, gewählte Punkte
const ROT = "#D55E00"; // Stück der Strecke außerhalb der Menge
const ORANGE = "#E69F00"; // Extrempunkte
const NEUTRAL = "#64748b"; // Hinweise ohne Farbrolle im Kapitel-Farbcode

const HALB = 1.4;
const SIZE = 300;
const PAD_L = 30;
const PAD_B = 18;
const PAD_R = 10;

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const punktText = (p: Punkt) => `(${fmt(p[0])}; ${fmt(p[1])})`;

type Punkt = [number, number];

type Menge = {
  id: string;
  name: string;
  formel: string;
  /** Liegt z in der Menge? */
  drin: (z: Punkt) => boolean;
  /** blaue Fläche im Pixelraum */
  flaeche: (px: (x: number) => number, py: (y: number) => number) => ReactNode;
  /** Extrempunkte, soweit es endlich viele sind */
  extrem?: Punkt[];
  paar: [Punkt, Punkt];
  paarName: string;
};

/* ------------------------------------------------------------- die Mengen */

const kreisPfad = (px: (x: number) => number, py: (y: number) => number, r: number) => {
  const cx = px(0);
  const cy = py(0);
  const rp = px(r) - px(0);
  return `M${cx + rp},${cy} A${rp},${rp} 0 1 0 ${cx - rp},${cy} A${rp},${rp} 0 1 0 ${cx + rp},${cy} Z`;
};

const MENGEN: Menge[] = [
  {
    id: "scheibe",
    name: "Kreisscheibe",
    formel: "{ z : ‖z‖ ≤ 1,2 }",
    drin: (z) => Math.hypot(z[0], z[1]) <= 1.2 + 1e-12,
    flaeche: (px, py) => (
      <path d={kreisPfad(px, py, 1.2)} fill={BLAU} fillOpacity={0.16} stroke={BLAU} strokeWidth={1.4} />
    ),
    paar: [
      [-1, 0.5],
      [0.9, -0.6],
    ],
    paarName: "Testpaar setzen",
  },
  {
    id: "ring",
    name: "Kreisring",
    formel: "{ z : 0,8 ≤ ‖z‖ ≤ 1,2 }",
    drin: (z) => {
      const n = Math.hypot(z[0], z[1]);
      return n >= 0.8 - 1e-12 && n <= 1.2 + 1e-12;
    },
    flaeche: (px, py) => (
      <path
        d={`${kreisPfad(px, py, 1.2)} ${kreisPfad(px, py, 0.8)}`}
        fillRule="evenodd"
        fill={BLAU}
        fillOpacity={0.16}
        stroke={BLAU}
        strokeWidth={1.4}
      />
    ),
    paar: [
      [1.1, 0],
      [0, 1.1],
    ],
    paarName: "Gegenbeispiel setzen",
  },
  {
    id: "dreieck",
    name: "Dreieck",
    formel: "{ z : z₁ ≥ 0, z₂ ≥ 0, z₁ + z₂ ≤ 1 }",
    drin: (z) => z[0] >= -1e-12 && z[1] >= -1e-12 && z[0] + z[1] <= 1 + 1e-12,
    flaeche: (px, py) => (
      <polygon
        points={`${px(0)},${py(0)} ${px(1)},${py(0)} ${px(0)},${py(1)}`}
        fill={BLAU}
        fillOpacity={0.16}
        stroke={BLAU}
        strokeWidth={1.4}
      />
    ),
    extrem: [
      [0, 0],
      [1, 0],
      [0, 1],
    ],
    paar: [
      [0.05, 0.05],
      [0.8, 0.15],
    ],
    paarName: "Testpaar setzen",
  },
  {
    id: "parabel",
    name: "Parabelunterseite",
    formel: "{ z : z₂ ≤ z₁² }",
    drin: (z) => z[1] <= z[0] * z[0] + 1e-12,
    flaeche: (px, py) => {
      const n = 80;
      const oben: string[] = [];
      for (let i = 0; i <= n; i++) {
        const x = -HALB + (2 * HALB * i) / n;
        oben.push(`${px(x).toFixed(1)},${py(Math.min(x * x, HALB)).toFixed(1)}`);
      }
      return (
        <polygon
          points={`${oben.join(" ")} ${px(HALB)},${py(-HALB)} ${px(-HALB)},${py(-HALB)}`}
          fill={BLAU}
          fillOpacity={0.16}
          stroke={BLAU}
          strokeWidth={1.4}
        />
      );
    },
    paar: [
      [-1, 1],
      [1, 1],
    ],
    paarName: "Gegenbeispiel setzen",
  },
];

/* ------------------------------------------------------- Streckenanalyse */

type Befund = {
  /** Anteil der abgetasteten lambda-Werte außerhalb der Menge */
  anteil: number;
  /** kleinstes und größtes verletzendes lambda, per Bisektion nachgeschärft */
  von: number;
  bis: number;
  /** Stücke der Strecke, jeweils mit Angabe drin/außen */
  stuecke: { drin: boolean; a: number; b: number }[];
};

/**
 * Tastet die Strecke z(lambda) = lambda*x + (1-lambda)*y ab und fasst
 * gleichartige Nachbarn zu Stücken zusammen. Die Ränder der Verletzung
 * werden anschließend per Bisektion auf drei Nachkommastellen geschärft.
 */
function analysiere(menge: Menge, x: Punkt, y: Punkt, n = 600): Befund {
  const z = (l: number): Punkt => [l * x[0] + (1 - l) * y[0], l * x[1] + (1 - l) * y[1]];
  const flags: boolean[] = [];
  for (let i = 0; i <= n; i++) flags.push(menge.drin(z(i / n)));

  const stuecke: { drin: boolean; a: number; b: number }[] = [];
  let start = 0;
  for (let i = 1; i <= n; i++) {
    if (flags[i] !== flags[i - 1]) {
      stuecke.push({ drin: flags[start], a: start / n, b: (i - 0.5) / n });
      start = i;
    }
  }
  stuecke.push({ drin: flags[start], a: start / n, b: 1 });

  const draussen = flags.filter((f) => !f).length;
  if (draussen === 0) return { anteil: 0, von: NaN, bis: NaN, stuecke };

  // Rand schärfen: zwischen dem letzten Innen- und dem ersten Außenpunkt
  const grenze = (a: number, b: number) => {
    let lo = a;
    let hi = b;
    for (let k = 0; k < 40; k++) {
      const m = (lo + hi) / 2;
      if (menge.drin(z(m)) === menge.drin(z(a))) lo = m;
      else hi = m;
    }
    return (lo + hi) / 2;
  };
  const erst = flags.indexOf(false);
  const letzt = flags.lastIndexOf(false);
  const von = erst === 0 ? 0 : grenze((erst - 1) / n, erst / n);
  const bis = letzt === n ? 1 : grenze((letzt + 1) / n, letzt / n);
  return { anteil: draussen / (n + 1), von, bis, stuecke };
}

/* ------------------------------------------------------------- Komponente */

export function KonvexTest() {
  const [mengeId, setMengeId] = useState(MENGEN[0].id);
  const [x, setX] = useState<Punkt>(MENGEN[0].paar[0]);
  const [y, setY] = useState<Punkt>(MENGEN[0].paar[1]);
  const [naechster, setNaechster] = useState<"x" | "y">("x");

  const menge = MENGEN.find((m) => m.id === mengeId) ?? MENGEN[0];

  const px = (v: number) => PAD_L + ((v + HALB) / (2 * HALB)) * SIZE;
  const py = (v: number) => SIZE - ((v + HALB) / (2 * HALB)) * SIZE;

  const greifen = (e: ReactPointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = (e.clientX - r.left) * ((PAD_L + SIZE + PAD_R) / r.width);
    const sy = (e.clientY - r.top) * ((SIZE + PAD_B) / r.height);
    const wx = -HALB + ((sx - PAD_L) / SIZE) * 2 * HALB;
    const wy = -HALB + ((SIZE - sy) / SIZE) * 2 * HALB;
    const klemm = (v: number) => Math.min(HALB, Math.max(-HALB, v));
    const p: Punkt = [Math.round(klemm(wx) * 20) / 20, Math.round(klemm(wy) * 20) / 20];
    if (naechster === "x") {
      setX(p);
      setNaechster("y");
    } else {
      setY(p);
      setNaechster("x");
    }
  };

  const xDrin = menge.drin(x);
  const yDrin = menge.drin(y);
  const beideDrin = xDrin && yDrin;
  const befund = analysiere(menge, x, y);

  const mengenWahl = (id: string) => {
    const m = MENGEN.find((k) => k.id === id) ?? MENGEN[0];
    setMengeId(id);
    setX(m.paar[0]);
    setY(m.paar[1]);
    setNaechster("x");
  };

  const gleich = x[0] === y[0] && x[1] === y[1];

  let status: { farbe: string; kopf: string; text: string };
  if (!beideDrin) {
    const welche = !xDrin && !yDrin ? "Beide Punkte liegen" : !xDrin ? "Der Punkt x liegt" : "Der Punkt y liegt";
    status = {
      farbe: NEUTRAL,
      kopf: "Voraussetzung nicht erfüllt",
      text: `${welche} außerhalb der Menge. Definition 12.2.1 verlangt x, y ∈ 𝒳 und sagt über andere Paare nichts. Setzen wir den Punkt neu, oder greifen wir zum vorbereiteten Paar.`,
    };
  } else if (gleich) {
    status = {
      farbe: NEUTRAL,
      kopf: "Beide Punkte fallen zusammen",
      text: `x und y stehen auf derselben Stelle, die Strecke schrumpft zu einem Punkt. Für x = y ist λ·x + (1−λ)·y = x, die Bedingung aus Definition 12.2.1 also erfüllt, ohne dass wir etwas über die Menge erfahren. Setzen wir y an eine andere Stelle.`,
    };
  } else if (befund.anteil === 0) {
    status = {
      farbe: GRUEN,
      kopf: "Strecke bleibt drin",
      text: `Für alle abgetasteten λ liegt z(λ) = λ·x + (1−λ)·y in der Menge. Dieses eine Paar beweist noch nichts, aber ${
        menge.id === "scheibe" || menge.id === "dreieck"
          ? "hier gelingt kein Gegenbeispiel: die Menge ist konvex."
          : "hier lohnt die Suche, denn diese Menge ist nicht konvex."
      }`,
    };
  } else {
    status = {
      farbe: ROT,
      kopf: "Strecke verlässt die Menge",
      text: `Für λ echt zwischen ${fmt(befund.von, 3)} und ${fmt(befund.bis, 3)} liegt z(λ) = λ·x + (1−λ)·y außerhalb, das sind ${fmt(
        100 * befund.anteil,
        1,
      )} % der abgetasteten Strecke. Damit ist die Bedingung aus Definition 12.2.1 verletzt und die Menge nicht konvex.`,
    };
  }

  const zAt = (l: number): Punkt => [l * x[0] + (1 - l) * y[0], l * x[1] + (1 - l) * y[1]];
  const mitte = zAt(0.5);

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Wir wählen eine Menge, klicken zwei Punkte hinein und sehen nach, ob die Verbindungsstrecke
        drinbleibt. Blau ist die Menge, grün die Strecke zwischen den gewählten Punkten x und y, rot
        das Stück, das die Menge verlässt; die orangen Punkte des Dreiecks sind seine Extrempunkte.
        Ein Klick setzt abwechselnd x und y, die Koordinaten rasten auf Schritte von 0,05 ein.
        Liegt einer der beiden Punkte außerhalb der Menge, bleibt die Strecke grau: Über solche
        Paare sagt Definition 12.2.1 nichts, und ein Herausragen widerlegt dort nichts.
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {MENGEN.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`rounded border px-3 py-1 ${
              m.id === mengeId
                ? "border-sky-600 bg-sky-50 dark:bg-sky-900/40"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => mengenWahl(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          onClick={() => {
            setX(menge.paar[0]);
            setY(menge.paar[1]);
            setNaechster("x");
          }}
        >
          {menge.paarName}
        </button>
        <span className="text-slate-500 dark:text-slate-400">
          nächster Klick setzt {naechster === "x" ? "x" : "y"}
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            z₂ ↑
          </div>
          <svg
            width={PAD_L + SIZE + PAD_R}
            height={SIZE + PAD_B}
            className="cursor-crosshair rounded border border-slate-300 bg-white dark:border-slate-600"
            onPointerDown={greifen}
          >
            <defs>
              <clipPath id="s122-clip">
                <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
              </clipPath>
            </defs>
            {niceTicks(-HALB, HALB).map((t) => (
              <g key={`y${t}`}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + SIZE}
                  y1={py(t)}
                  y2={py(t)}
                  stroke="#e2e8f0"
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
                  {fmt(t, Math.abs(t) >= 1 || t === 0 ? 0 : 1)}
                </text>
              </g>
            ))}
            {niceTicks(-HALB, HALB).map((t) => (
              <g key={`x${t}`}>
                <line
                  y1={0}
                  y2={SIZE}
                  x1={px(t)}
                  x2={px(t)}
                  stroke="#e2e8f0"
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text x={px(t)} y={SIZE + 12} textAnchor="middle" fill="#64748b" fontSize={10}>
                  {fmt(t, Math.abs(t) >= 1 || t === 0 ? 0 : 1)}
                </text>
              </g>
            ))}
            <g clipPath="url(#s122-clip)">
              {menge.flaeche(px, py)}
              {befund.stuecke.map((s, i) => {
                const a = zAt(s.a);
                const b = zAt(s.b);
                return (
                  <line
                    key={i}
                    x1={px(a[0])}
                    y1={py(a[1])}
                    x2={px(b[0])}
                    y2={py(b[1])}
                    stroke={beideDrin ? (s.drin ? GRUEN : ROT) : NEUTRAL}
                    strokeWidth={beideDrin && !s.drin ? 3 : 2.2}
                  />
                );
              })}
              {(menge.extrem ?? []).map((e, i) => (
                <circle key={`e${i}`} cx={px(e[0])} cy={py(e[1])} r={4} fill={ORANGE} />
              ))}
              <circle cx={px(x[0])} cy={py(x[1])} r={5} fill={xDrin ? GRUEN : "#ffffff"} stroke={GRUEN} strokeWidth={2} />
              <circle cx={px(y[0])} cy={py(y[1])} r={5} fill={yDrin ? GRUEN : "#ffffff"} stroke={GRUEN} strokeWidth={2} />
              <text x={px(x[0]) + 8} y={py(x[1]) - 6} fill={GRUEN} fontSize={12}>
                x
              </text>
              <text x={px(y[0]) + 8} y={py(y[1]) - 6} fill={GRUEN} fontSize={12}>
                y
              </text>
            </g>
          </svg>
          <div className="mt-0.5 text-center text-[11px]" style={{ width: PAD_L + SIZE }}>
            z₁ →
          </div>
        </div>

        <div className="min-w-[15rem] grow space-y-2 text-sm">
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3 align-top">Menge</td>
                <td className="font-mono text-xs" style={{ color: BLAU }}>
                  {menge.formel}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">x</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {punktText(x)} {xDrin ? "∈ 𝒳" : "∉ 𝒳"}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">y</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {punktText(y)} {yDrin ? "∈ 𝒳" : "∉ 𝒳"}
                </td>
              </tr>
              <tr>
                <td className="pr-3 align-top">Mittelpunkt</td>
                <td className="font-mono text-xs">
                  {punktText(mitte)} {menge.drin(mitte) ? "∈ 𝒳" : "∉ 𝒳"}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="font-semibold" style={{ color: status.farbe }}>
            {status.kopf}
          </p>
          <p className="max-w-prose">{status.text}</p>
        </div>
      </div>
      <p className="max-w-prose text-xs text-slate-500 dark:text-slate-400">
        Der Kreisring vertritt hier die Einheitssphäre aus dem Selbsttest: Eine Kurve ohne Dicke
        lässt sich nicht anklicken, und für das Argument zählt ohnehin nur das Loch in der Mitte.
        Beachten wir die Asymmetrie zwischen den beiden Antworten. Ein einziges Paar mit
        heraushängender Strecke widerlegt die Konvexität, während noch so viele gelungene Versuche
        sie nicht beweisen. Dafür brauchen wir die Rechnungen aus dem Selbsttest (Kreisscheibe,
        Parabelmenge) und aus Beispiel 12.2.12 (Dreieck als Schnitt dreier Halbräume).
      </p>
    </div>
  );
}
