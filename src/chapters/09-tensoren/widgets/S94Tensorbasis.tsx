import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * Tensorproduktbasis-Explorer für §9.4: bivariate Polynome aus P_1 ⊗ P_1.
 *
 * Vier Slider stellen die Koeffizienten der Tensorproduktbasis
 * {1⊗1, x⊗1, 1⊗y, x⊗y} ein. Links steht die Fläche über [0,1]², wahlweise als
 * Heatmap oder als isometrisches Gitternetz, rechts die vier Summanden auf
 * derselben Farbskala. Voreingestellt ist f(x,y) = 2 + 3x − y + 5xy aus dem
 * Abschnittsbeispiel; das Widget ersetzt die Abbildung der Folie.
 *
 * Eigenbau (kein Recycling aus fremden Apps): Aufbau, Rechnung und sämtliche
 * Texte sind für dieses Kapitel geschrieben. Farbcode wie im Kapitel: erster
 * Faktor blau, zweiter grün, Koeffizienten orange. Die Farbskala der Fläche
 * codiert dagegen den FUNKTIONSWERT (orange positiv, blau negativ); darauf
 * weist der Begleittext ausdrücklich hin.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ORANGE = "#E69F00";
const ROT = "#D55E00";
const GRAU = "#64748b";

type Koeff = { c11: number; c21: number; c12: number; c22: number };

const BEISPIEL: Koeff = { c11: 2, c21: 3, c12: -1, c22: 5 };

/** f(x,y) = c11 + c21 x + c12 y + c22 xy, die Entwicklung in der Tensorproduktbasis. */
const wert = (k: Koeff, x: number, y: number) =>
  k.c11 + k.c21 * x + k.c12 * y + k.c22 * x * y;

/**
 * Zahlformat mit deutschem Komma und U+2212; trennt NaN sauber von ±∞. Ganze
 * Zahlen bleiben ohne Nachkommastelle, damit die Formelzeile so aussieht wie im
 * Text (2 + 3x − y + 5xy).
 */
function fmt(v: number): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const g = Number(v.toFixed(2)) + 0; // + 0 beseitigt die negative Null
  const s = Number.isInteger(g) ? g.toFixed(0) : g.toFixed(1);
  return s.replace("-", "−").replace(".", ",");
}

/** Ausgeschriebene Kurzform, etwa „2 + 3x − y + 5xy". */
function formel(k: Koeff): string {
  const terme: Array<[number, string]> = [
    [k.c11, ""],
    [k.c21, "x"],
    [k.c12, "y"],
    [k.c22, "xy"],
  ];
  let s = "";
  for (const [c, t] of terme) {
    if (Math.abs(c) < 1e-9) continue;
    const betrag = Math.abs(c);
    const zahl = betrag === 1 && t !== "" ? "" : fmt(betrag);
    const stueck = zahl + t;
    if (s === "") s = (c < 0 ? "−" : "") + stueck;
    else s += (c < 0 ? " − " : " + ") + stueck;
  }
  return s === "" ? "0" : s;
}

/**
 * Divergierende Skala um die Null: orange für positive, blau für negative
 * Werte, Weiß in der Mitte. Das Paar Blau/Orange bleibt auch bei
 * Farbsehschwäche unterscheidbar.
 */
function farbe(v: number, maxAbs: number): string {
  if (!(maxAbs > 0) || !Number.isFinite(v)) return "#ffffff";
  const t = Math.max(-1, Math.min(1, v / maxAbs));
  const ziel = t >= 0 ? [230, 159, 0] : [0, 114, 178];
  const a = Math.abs(t);
  const r = Math.round(255 + (ziel[0] - 255) * a);
  const g = Math.round(255 + (ziel[1] - 255) * a);
  const b = Math.round(255 + (ziel[2] - 255) * a);
  return `rgb(${r}, ${g}, ${b})`;
}

/** Rasterbild der Funktion über [0,1]², Ursprung unten links. */
function Raster({
  k,
  groesse,
  n,
  maxAbs,
}: {
  k: Koeff;
  groesse: number;
  n: number;
  maxAbs: number;
}) {
  const z = groesse / n;
  const zellen = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = (i + 0.5) / n;
      const y = (j + 0.5) / n;
      zellen.push(
        <rect
          key={`${i}-${j}`}
          x={i * z}
          y={groesse - (j + 1) * z}
          width={z + 0.5}
          height={z + 0.5}
          fill={farbe(wert(k, x, y), maxAbs)}
        />,
      );
    }
  }
  return <g>{zellen}</g>;
}

const HEAT = 250;
const PAD_L = 30;
const PAD_R = 12;
const PAD_T = 10;
const PAD_B = 28;
const TICKS: Array<[number, string]> = [
  [0, "0"],
  [0.5, "0,5"],
  [1, "1"],
];

/** Heatmap mit beschrifteten Achsen. */
function Flaeche({ k, maxAbs }: { k: Koeff; maxAbs: number }) {
  const breite = PAD_L + HEAT + PAD_R;
  const hoehe = PAD_T + HEAT + PAD_B;
  return (
    <svg width={breite} height={hoehe} viewBox={`0 0 ${breite} ${hoehe}`}>
      <g transform={`translate(${PAD_L}, ${PAD_T})`}>
        <rect x={0} y={0} width={HEAT} height={HEAT} fill="#ffffff" />
        <Raster k={k} groesse={HEAT} n={25} maxAbs={maxAbs} />
        <rect x={0} y={0} width={HEAT} height={HEAT} fill="none" stroke={GRAU} />
        {TICKS.map(([t, s]) => (
          <g key={`x${t}`}>
            <line x1={t * HEAT} y1={HEAT} x2={t * HEAT} y2={HEAT + 4} stroke={GRAU} />
            <text
              x={t * HEAT}
              y={HEAT + 15}
              textAnchor="middle"
              fontSize={10}
              fill={GRAU}
            >
              {s}
            </text>
          </g>
        ))}
        {TICKS.map(([t, s]) => (
          <g key={`y${t}`}>
            <line x1={0} y1={(1 - t) * HEAT} x2={-4} y2={(1 - t) * HEAT} stroke={GRAU} />
            <text
              x={-7}
              y={(1 - t) * HEAT + 3}
              textAnchor="end"
              fontSize={10}
              fill={GRAU}
            >
              {s}
            </text>
          </g>
        ))}
        <text x={HEAT / 2} y={HEAT + 26} textAnchor="middle" fontSize={12} fill={BLAU}>
          x
        </text>
        <text x={-22} y={HEAT / 2} textAnchor="middle" fontSize={12} fill={GRUEN}>
          y
        </text>
      </g>
    </svg>
  );
}

const G_BREITE = 292;
const G_HOEHE = 250;
const G_AX = 92; // halbe Breite der Grundfläche
const G_AY = 44; // Tiefenversatz der Grundfläche
const G_ZH = 92; // Höhe des Wertebereichs in Pixeln
const G_CX = 146;
const G_CY = 202;
const G_M = 8; // Unterteilungen je Richtung

/** Isometrisches Gitternetz derselben Fläche, Höhe = Funktionswert. */
function Gitter({ k, vmin, vmax }: { k: Koeff; vmin: number; vmax: number }) {
  const spanne = vmax - vmin;
  const proj = (x: number, y: number, v: number): [number, number] => {
    const t = spanne > 1e-12 ? (v - vmin) / spanne : 0.5;
    return [G_CX + (x - y) * G_AX, G_CY - (x + y) * G_AY - t * G_ZH];
  };
  const punkt = (x: number, y: number) => proj(x, y, wert(k, x, y));
  const kette = (pts: Array<[number, number]>) =>
    pts.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

  const boden: Array<[number, number]> = [
    proj(0, 0, vmin),
    proj(1, 0, vmin),
    proj(1, 1, vmin),
    proj(0, 1, vmin),
  ];
  // Lotlinien an den vier Ecken: sie tragen die Fläche über der Grundebene.
  const ecken: Array<[number, number]> = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  const achseUnten = proj(0, 1, vmin);
  const achseOben = proj(0, 1, vmax);

  const linienX = [];
  const linienY = [];
  for (let i = 0; i <= G_M; i++) {
    const a: Array<[number, number]> = [];
    const b: Array<[number, number]> = [];
    for (let j = 0; j <= G_M; j++) {
      a.push(punkt(i / G_M, j / G_M));
      b.push(punkt(j / G_M, i / G_M));
    }
    linienX.push(
      <polyline key={`lx${i}`} points={kette(a)} fill="none" stroke={ORANGE} strokeWidth={1} />,
    );
    linienY.push(
      <polyline key={`ly${i}`} points={kette(b)} fill="none" stroke={ORANGE} strokeWidth={1} />,
    );
  }

  return (
    <svg width={G_BREITE} height={G_HOEHE} viewBox={`0 0 ${G_BREITE} ${G_HOEHE}`}>
      <polygon points={kette(boden)} fill={GRAU} fillOpacity={0.08} stroke={GRAU} />
      {ecken.map(([x, y]) => {
        const u = proj(x, y, vmin);
        const o = punkt(x, y);
        return (
          <line
            key={`d${x}${y}`}
            x1={u[0]}
            y1={u[1]}
            x2={o[0]}
            y2={o[1]}
            stroke={GRAU}
            strokeWidth={0.8}
            strokeDasharray="3 3"
          />
        );
      })}
      {linienX}
      {linienY}
      <line
        x1={achseUnten[0]}
        y1={achseUnten[1]}
        x2={achseOben[0]}
        y2={achseOben[1] - 6}
        stroke={GRAU}
      />
      <text x={achseUnten[0] - 5} y={achseUnten[1] + 4} textAnchor="end" fontSize={10} fill={GRAU}>
        {fmt(vmin)}
      </text>
      <text x={achseOben[0] - 5} y={achseOben[1] + 4} textAnchor="end" fontSize={10} fill={GRAU}>
        {fmt(vmax)}
      </text>
      <text x={achseOben[0] + 4} y={achseOben[1] - 10} textAnchor="start" fontSize={11} fill={ORANGE}>
        f(x, y)
      </text>
      {/* Achsenbeschriftung an die MITTE der beiden Grundkanten: am linken Eck
          stünde das y sonst auf der Werteachse samt ihren Zahlen. */}
      <text
        x={(boden[0][0] + boden[1][0]) / 2 + 10}
        y={(boden[0][1] + boden[1][1]) / 2 + 16}
        textAnchor="middle"
        fontSize={12}
        fill={BLAU}
      >
        x
      </text>
      <text
        x={(boden[0][0] + boden[3][0]) / 2 - 10}
        y={(boden[0][1] + boden[3][1]) / 2 + 16}
        textAnchor="middle"
        fontSize={12}
        fill={GRUEN}
      >
        y
      </text>
    </svg>
  );
}

/** Farbbalken der gemeinsamen Skala. */
function Skala({ maxAbs }: { maxAbs: number }) {
  const breite = 250;
  const streifen = 50;
  const felder = [];
  for (let i = 0; i < streifen; i++) {
    const v = (-1 + (2 * (i + 0.5)) / streifen) * maxAbs;
    felder.push(
      <rect
        key={i}
        x={(i * breite) / streifen}
        y={0}
        width={breite / streifen + 0.5}
        height={12}
        fill={farbe(v, maxAbs)}
      />,
    );
  }
  return (
    <svg width={breite} height={30} viewBox={`0 0 ${breite} 30`}>
      {felder}
      <rect x={0} y={0} width={breite} height={12} fill="none" stroke={GRAU} />
      <line x1={breite / 2} y1={0} x2={breite / 2} y2={16} stroke={GRAU} />
      <text x={0} y={26} fontSize={10} fill={GRAU}>
        {fmt(-maxAbs)}
      </text>
      <text x={breite / 2} y={26} textAnchor="middle" fontSize={10} fill={GRAU}>
        0
      </text>
      <text x={breite} y={26} textAnchor="end" fontSize={10} fill={GRAU}>
        {fmt(maxAbs)}
      </text>
    </svg>
  );
}

const NULL_KOEFF: Koeff = { c11: 0, c21: 0, c12: 0, c22: 0 };

export function TensorbasisExplorer() {
  const [k, setK] = useState<Koeff>(BEISPIEL);
  const [netz, setNetz] = useState(false);

  const setze = (feld: keyof Koeff) => (v: number) => setK({ ...k, [feld]: v });

  // f ist in jeder Variablen affin, die Extremwerte sitzen deshalb in den Ecken.
  const eckwerte = [wert(k, 0, 0), wert(k, 1, 0), wert(k, 0, 1), wert(k, 1, 1)];
  const vmin = Math.min(...eckwerte);
  const vmax = Math.max(...eckwerte);

  const terme: Array<{ feld: keyof Koeff; koeff: Koeff; erst: string; zweit: string; name: string }> = [
    { feld: "c11", koeff: { ...NULL_KOEFF, c11: k.c11 }, erst: "1", zweit: "1", name: "c₁₁" },
    { feld: "c21", koeff: { ...NULL_KOEFF, c21: k.c21 }, erst: "x", zweit: "1", name: "c₂₁" },
    { feld: "c12", koeff: { ...NULL_KOEFF, c12: k.c12 }, erst: "1", zweit: "y", name: "c₁₂" },
    { feld: "c22", koeff: { ...NULL_KOEFF, c22: k.c22 }, erst: "x", zweit: "y", name: "c₂₂" },
  ];

  const maxAbs = Math.max(
    1e-9,
    Math.abs(vmin),
    Math.abs(vmax),
    ...terme.map((t) => Math.max(Math.abs(wert(t.koeff, 0, 0)), Math.abs(wert(t.koeff, 1, 1)))),
  );

  const eben = Math.abs(k.c22) < 1e-9;
  const alleNull = [k.c11, k.c21, k.c12, k.c22].every((c) => Math.abs(c) < 1e-9);
  const steigung0 = k.c21;
  const steigung1 = k.c21 + k.c22;

  return (
    <div>
      <p className="text-sm">
        Vier Koeffizienten, eine Fläche: Die Schieberegler stellen die Entwicklung
        f = c₁₁ · (1 ⊗ 1) + c₂₁ · (x ⊗ 1) + c₁₂ · (1 ⊗ y) + c₂₂ · (x ⊗ y) ein. Links
        sehen wir f über dem Quadrat [0, 1]², rechts die vier Summanden auf derselben
        Skala. Die Farbe codiert hier den Funktionswert, orange für positive und blau
        für negative Werte; sie hat nichts mit der Faktorfarbe des Kapitels zu tun.
        {netz
          ? " Im Gitternetz übernimmt die Höhe diese Rolle: Dort sind alle Linien orange, das Vorzeichen lesen wir an der Werteachse ab."
          : ""}
      </p>

      <div className="my-3 max-w-md">
        <Slider
          label="c₁₁ (1 ⊗ 1)"
          value={k.c11}
          onChange={setze("c11")}
          min={-5}
          max={5}
          step={0.5}
          fmt={(v) => fmt(v)}
        />
        <Slider
          label="c₂₁ (x ⊗ 1)"
          value={k.c21}
          onChange={setze("c21")}
          min={-5}
          max={5}
          step={0.5}
          fmt={(v) => fmt(v)}
        />
        <Slider
          label="c₁₂ (1 ⊗ y)"
          value={k.c12}
          onChange={setze("c12")}
          min={-5}
          max={5}
          step={0.5}
          fmt={(v) => fmt(v)}
        />
        <Slider
          label="c₂₂ (x ⊗ y)"
          value={k.c22}
          onChange={setze("c22")}
          min={-5}
          max={5}
          step={0.5}
          fmt={(v) => fmt(v)}
        />
      </div>

      <div className="my-2 flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm"
          onClick={() => setNetz(!netz)}
        >
          {netz ? "Fläche als Heatmap" : "Fläche als Gitternetz"}
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm"
          onClick={() => setK(BEISPIEL)}
        >
          zurück zu f = 2 + 3x − y + 5xy
        </button>
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm"
          onClick={() => setK({ ...k, c22: 0 })}
        >
          c₂₂ auf 0 setzen
        </button>
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <div>
          <div className="overflow-x-auto">
            {netz ? <Gitter k={k} vmin={vmin} vmax={vmax} /> : <Flaeche k={k} maxAbs={maxAbs} />}
          </div>
          {/* Die Skala gehört auch zum Gitternetz: die vier Summanden rechts
              bleiben in beiden Ansichten eingefärbt. */}
          <div className="mt-1 overflow-x-auto" style={{ paddingLeft: netz ? 0 : PAD_L }}>
            <Skala maxAbs={maxAbs} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {terme.map((t) => (
            <div key={t.feld} className="text-center">
              <svg width={104} height={104} viewBox="0 0 104 104">
                <rect x={2} y={2} width={100} height={100} fill="#ffffff" />
                <g transform="translate(2, 2)">
                  <Raster k={t.koeff} groesse={100} n={20} maxAbs={maxAbs} />
                </g>
                <rect x={2} y={2} width={100} height={100} fill="none" stroke={GRAU} />
              </svg>
              <div className="text-xs" style={{ color: GRAU }}>
                <span style={{ color: ORANGE }}>
                  {t.name} = {fmt(k[t.feld])}
                </span>{" "}
                · (<span style={{ color: BLAU }}>{t.erst}</span> ⊗{" "}
                <span style={{ color: GRUEN }}>{t.zweit}</span>)
              </div>
            </div>
          ))}
        </div>
      </div>

      {alleNull ? (
        <p className="mt-3 text-sm" style={{ color: ROT }}>
          Alle vier Koeffizienten stehen auf null: f ist die Nullfunktion. Die Farbskala
          hat dann keinen Bezugswert, und die Fläche ist überall gleich hoch.
        </p>
      ) : null}

      <p className="mt-3 text-sm">
        {eben
          ? `Mit c₂₂ = 0 fehlt der vierte Basisvektor, und f ist eine Ebene. Die Steigung in x-Richtung beträgt überall ${fmt(steigung0)}, unabhängig davon, welchen Wert y gerade hat: Die beiden Variablen wirken rein additiv.`
          : `Der Summand c₂₂ · (x ⊗ y) macht aus der Ebene eine gekrümmte Fläche. Achsenparallele Schnitte bleiben trotzdem Geraden, ihre Steigung hängt aber vom festgehaltenen Wert ab: In x-Richtung ist sie ${fmt(steigung0)} bei y = 0 und ${fmt(steigung1)} bei y = 1. Diese Kopplung liefert der vierte Basisvektor.`}
      </p>

      <div className="mt-2 font-mono text-xs" style={{ color: GRAU }}>
        <p>
          f(x, y) = {fmt(k.c11)} · (1 ⊗ 1) {k.c21 < 0 ? "−" : "+"} {fmt(Math.abs(k.c21))} · (x ⊗ 1){" "}
          {k.c12 < 0 ? "−" : "+"} {fmt(Math.abs(k.c12))} · (1 ⊗ y) {k.c22 < 0 ? "−" : "+"}{" "}
          {fmt(Math.abs(k.c22))} · (x ⊗ y)
        </p>
        <p className="font-semibold">f(x, y) = {formel(k)}</p>
        <p>
          Ecken: f(0, 0) = {fmt(eckwerte[0])}; f(1, 0) = {fmt(eckwerte[1])}; f(0, 1) ={" "}
          {fmt(eckwerte[2])}; f(1, 1) = {fmt(eckwerte[3])}
        </p>
        <p>
          Wertebereich auf [0, 1]²: von {fmt(vmin)} bis {fmt(vmax)} (angenommen in den Ecken)
        </p>
        <p style={{ color: ORANGE }}>
          Rückrechnung der Koeffizienten aus den Ecken: c₂₂ = f(1,1) − f(1,0) − f(0,1) + f(0,0) ={" "}
          {fmt(eckwerte[3] - eckwerte[1] - eckwerte[2] + eckwerte[0])}
        </p>
      </div>
    </div>
  );
}
