import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Slider, niceTicks } from "../../../lib";

/**
 * §12.3: Sehnentest, Konvex-vs-konkav-Tafeln und Epigraph-Skizze.
 *
 * Der SVG-Rechenkern (Kurve, Sehne, Verletzungsflächen als Polygonzüge,
 * ziehbare Endpunkte, λ-Sonde) ist aus dem privaten Kursmaterial
 * heath-ch5-6/src/sections/S61.tsx (ChordSVG, ConvexityPanels, ChordWidget)
 * portiert; Funktionsauswahl, Farbrollen, Achsenbeschriftung, Zahlformat und
 * sämtliche Texte sind für diesen Abschnitt neu geschrieben.
 *
 * Die drei Bausteine ersetzen die Folienbilder epigraph.png und
 * konvexitaet-convex-panels.pdf (12-konvexitaet.Rmd Z. 405 bzw. 410).
 *
 * Farbcode Kapitel 12: Epigraph/Funktionsgraph blau, Sehne und
 * Konvexkombinationen grün, Verletzungen rot, ausgezeichnete Punkte orange.
 *
 * Per node nachgerechnet (Scratchpad check-math-s123.mjs): die Sehnenprobe
 * über 200000 Zufallspaare bestätigt konvex für 0,6x²+0,3, |x|, 0,5x+1 und
 * e^x, konkav für 2−0,6x² und 0,5x+1; x⁴−3x²−x+3 ist weder das eine noch
 * das andere.
 */

const BLAU = "#0072B2"; // Graph und Epigraph
const GRUEN = "#009E73"; // Sehne, Konvexkombinationen
const ROT = "#D55E00"; // Stellen, an denen der Graph über der Sehne liegt
const ORANGE = "#E69F00"; // ausgezeichnete Punkte

/** Deutsche Dezimalzahl; unterscheidet undefiniert (–) von unendlich (∞). */
function fmt(v: number, d = 2): string {
  if (Number.isNaN(v)) return "–";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  const s = v.toFixed(d);
  const t = Number(s) === 0 ? (0).toFixed(d) : s;
  return t.replace(".", ",").replace(/^-/, "−");
}

const klemm = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Kurve = {
  id: string;
  name: string;
  formel: string;
  f: (x: number) => number;
  yBereich: [number, number];
  start: [number, number];
};

const KURVEN: Kurve[] = [
  {
    id: "doppelmulde",
    name: "nicht konvex",
    formel: "f(x) = x⁴ − 3x² − x + 3",
    f: (x) => x ** 4 - 3 * x * x - x + 3,
    yBereich: [-1, 9.6],
    start: [-1.55, 1.25],
  },
  {
    id: "betrag",
    name: "konvex, nicht streng",
    formel: "f(x) = |x|",
    f: (x) => Math.abs(x),
    yBereich: [-0.3, 2.3],
    start: [-1.6, -0.4],
  },
  {
    id: "parabel",
    name: "streng konvex",
    formel: "f(x) = 0,6x² + 0,3",
    f: (x) => 0.6 * x * x + 0.3,
    yBereich: [-0.2, 3],
    start: [-1.2, 1.5],
  },
  {
    id: "konkav",
    name: "konkav",
    formel: "f(x) = 2 − 0,6x²",
    f: (x) => 2 - 0.6 * x * x,
    yBereich: [-1, 2.4],
    start: [-1.4, 1.4],
  },
];

/**
 * Zeichnet Kurve, Sehne und die Stellen, an denen der Graph über der Sehne
 * liegt. Wird von den statischen Tafeln und vom interaktiven Test benutzt.
 */
function SehnenSVG({
  f,
  a,
  b,
  yBereich,
  breite,
  hoehe,
  lambda,
  ziehbar = false,
  ticks = false,
  epigraph = false,
  onZiehStart,
}: {
  f: (x: number) => number;
  a: number;
  b: number;
  yBereich: [number, number];
  breite: number;
  hoehe: number;
  lambda?: number;
  ziehbar?: boolean;
  ticks?: boolean;
  epigraph?: boolean;
  onZiehStart?: (welcher: "a" | "b", e: ReactPointerEvent) => void;
}) {
  const PADL = ticks ? 34 : 10;
  const PADR = 10;
  const PADT = 10;
  const PADB = ticks ? 22 : 10;
  const pw = breite - PADL - PADR;
  const ph = hoehe - PADT - PADB;
  const [y0, y1] = yBereich;
  const px = (x: number) => PADL + ((x + 2) / 4) * pw;
  const py = (y: number) => PADT + (1 - (y - y0) / (y1 - y0)) * ph;

  const N = 200;
  const stuetzen = Array.from({ length: N + 1 }, (_, i) => -2 + (4 * i) / N);
  const kurve = stuetzen.map((x) => `${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`).join(" ");
  const epiFlaeche = `${kurve} ${px(2).toFixed(1)},${py(y1).toFixed(1)} ${px(-2).toFixed(1)},${py(y1).toFixed(1)}`;

  const fa = f(a);
  const fb = f(b);
  const sehne = (x: number) => fa + ((fb - fa) * (x - a)) / (b - a);

  // zusammenhängende Stücke, auf denen der Graph über der Sehne liegt
  const M = 200;
  const proben = Array.from({ length: M + 1 }, (_, i) => {
    const x = a + ((b - a) * i) / M;
    return { x, fx: f(x), sx: sehne(x) };
  });
  const flecken: string[] = [];
  let lauf: { x: number; fx: number; sx: number }[] = [];
  let groessteVerletzung = 0;
  const schliessen = () => {
    if (lauf.length > 1) {
      flecken.push(
        lauf.map((p) => `${px(p.x).toFixed(1)},${py(p.fx).toFixed(1)}`).join(" ") +
          " " +
          [...lauf]
            .reverse()
            .map((p) => `${px(p.x).toFixed(1)},${py(p.sx).toFixed(1)}`)
            .join(" "),
      );
    }
    lauf = [];
  };
  for (const p of proben) {
    groessteVerletzung = Math.max(groessteVerletzung, p.fx - p.sx);
    if (p.fx > p.sx + 1e-9) lauf.push(p);
    else schliessen();
  }
  schliessen();
  const verletzt = groessteVerletzung > 1e-9;

  const xl = lambda !== undefined ? lambda * a + (1 - lambda) * b : undefined;

  return (
    <>
      {ticks && (
        <>
          {niceTicks(y0, y1, 4).map((t) => (
            <g key={`y${t}`}>
              <line
                x1={PADL}
                x2={breite - PADR}
                y1={py(t)}
                y2={py(t)}
                stroke="#e2e8f0"
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text x={PADL - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
                {fmt(t, Number.isInteger(t) ? 0 : 1)}
              </text>
            </g>
          ))}
          {[-2, -1, 0, 1, 2].map((t) => (
            <g key={`x${t}`}>
              <line
                y1={PADT}
                y2={hoehe - PADB}
                x1={px(t)}
                x2={px(t)}
                stroke="#e2e8f0"
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text x={px(t)} y={hoehe - PADB + 13} textAnchor="middle" fill="#64748b" fontSize={10}>
                {fmt(t, 0)}
              </text>
            </g>
          ))}
        </>
      )}
      {!ticks && y0 < 0 && y1 > 0 && (
        <line x1={PADL} x2={breite - PADR} y1={py(0)} y2={py(0)} stroke="#e2e8f0" strokeWidth={1} />
      )}

      {epigraph && <polygon points={epiFlaeche} fill={BLAU} fillOpacity={0.14} />}
      {flecken.map((pts, i) => (
        <polygon key={i} points={pts} fill={ROT} fillOpacity={0.3} />
      ))}
      <polyline points={kurve} fill="none" stroke={BLAU} strokeWidth={1.8} />
      <line
        x1={px(a)}
        y1={py(fa)}
        x2={px(b)}
        y2={py(fb)}
        stroke={verletzt ? ROT : GRUEN}
        strokeWidth={1.8}
      />

      {xl !== undefined && (
        <>
          <line
            x1={px(xl)}
            y1={py(f(xl))}
            x2={px(xl)}
            y2={py(sehne(xl))}
            stroke="#94a3b8"
            strokeWidth={1.2}
            strokeDasharray="3 3"
          />
          <circle cx={px(xl)} cy={py(f(xl))} r={4} fill={BLAU} />
          <circle cx={px(xl)} cy={py(sehne(xl))} r={4} fill={GRUEN} />
        </>
      )}

      {(["a", "b"] as const).map((welcher) => {
        const x = welcher === "a" ? a : b;
        return (
          <g key={welcher}>
            <circle
              cx={px(x)}
              cy={py(f(x))}
              r={ziehbar ? 7 : 3.5}
              fill="#ffffff"
              stroke={GRUEN}
              strokeWidth={2}
              style={ziehbar ? { cursor: "ew-resize", touchAction: "none" } : undefined}
              onPointerDown={ziehbar && onZiehStart ? (e) => onZiehStart(welcher, e) : undefined}
            />
            {ziehbar && (
              <text x={px(x) - 3} y={py(f(x)) - 12} fontSize={12} fill={GRUEN}>
                {welcher === "a" ? "x" : "y"}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------- interaktiver Test */

export function SehnenTest() {
  const [kurveId, setKurveId] = useState(KURVEN[0].id);
  const [a, setA] = useState(KURVEN[0].start[0]);
  const [b, setB] = useState(KURVEN[0].start[1]);
  const [lambda, setLambda] = useState(0.5);
  const svgRef = useRef<SVGSVGElement>(null);
  const zieht = useRef<"a" | "b" | null>(null);

  const kurve = KURVEN.find((k) => k.id === kurveId) ?? KURVEN[0];
  const { f } = kurve;

  const B = 460;
  const H = 290;
  const PADL = 34;
  const PADR = 10;

  const zurWelt = (clientX: number) => {
    const r = svgRef.current?.getBoundingClientRect();
    if (!r) return 0;
    const sx = ((clientX - r.left) / r.width) * B;
    return klemm(((sx - PADL) / (B - PADL - PADR)) * 4 - 2, -2, 2);
  };

  const kurveWaehlen = (id: string) => {
    const k = KURVEN.find((c) => c.id === id) ?? KURVEN[0];
    setKurveId(id);
    setA(k.start[0]);
    setB(k.start[1]);
  };

  const fa = f(a);
  const fb = f(b);
  const xl = lambda * a + (1 - lambda) * b;
  const links = f(xl);
  const rechts = lambda * fa + (1 - lambda) * fb;

  let groessteVerletzung = 0;
  for (let i = 0; i <= 400; i++) {
    const x = a + ((b - a) * i) / 400;
    groessteVerletzung = Math.max(groessteVerletzung, f(x) - (fa + ((fb - fa) * (x - a)) / (b - a)));
  }
  const verletzt = groessteVerletzung > 1e-9;

  let status: { farbe: string; kopf: string; text: string };
  if (verletzt) {
    status = {
      farbe: ROT,
      kopf: "Sehne unterschritten",
      text: `Zwischen x und y ragt der Graph um bis zu ${fmt(
        groessteVerletzung,
        3,
      )} über die Sehne (rote Fläche). Für diese beiden Punkte ist die Ungleichung aus Satz 12.3.8 also verletzt, und ein einziges solches Paar genügt: f ist nicht konvex.`,
    };
  } else if (kurve.id === "doppelmulde") {
    status = {
      farbe: ORANGE,
      kopf: "Dieses Paar besteht den Test",
      text: `Auf der ganzen Strecke bleibt der Graph unter der Sehne. Das beweist nichts, denn die Definition verlangt alle Paare. Schieben wir x über die linke Mulde hinaus, kippt der Befund.`,
    };
  } else if (kurve.id === "konkav") {
    status = {
      farbe: GRUEN,
      kopf: "Sehne liegt unter dem Graphen",
      text: `Hier ist die Ungleichung mit umgedrehtem Zeichen erfüllt: Die Sehne bleibt unter dem Graphen, und zwar für jedes Paar. So ist konkav erklärt (Bemerkung 12.3.9), gleichbedeutend damit, dass −f konvex ist.`,
    };
  } else if (kurve.id === "betrag" && Math.abs(links - rechts) < 1e-12) {
    status = {
      farbe: GRUEN,
      kopf: "Gleichheit auf der ganzen Strecke",
      text: `x und y liegen auf demselben Ast, dort ist f linear und die Sehne fällt mit dem Graphen zusammen: In der Ungleichung steht Gleichheit. Der Betrag ist deshalb konvex, aber nicht streng konvex.`,
    };
  } else {
    status = {
      farbe: GRUEN,
      kopf: "Sehne liegt über dem Graphen",
      text: `Auf der ganzen Strecke bleibt der Graph unter der Sehne, und das gelingt bei dieser Funktion für jedes Paar${
        kurve.id === "parabel" ? " sogar mit strikter Ungleichung im Inneren" : ""
      }.`,
    };
  }

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Die Definition prüft alle Punktpaare und alle Mischungen. Ziehen wir also die beiden
        Endpunkte über den Graphen und schieben wir λ: Der blaue Punkt zeigt den Funktionswert
        f(λx + (1−λ)y), der grüne den Wert λf(x) + (1−λ)f(y) auf der Sehne. Rot füllt sich, wo
        der Graph über der Sehne liegt.
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {KURVEN.map((k) => (
          <button
            key={k.id}
            type="button"
            className={`rounded border px-3 py-1 ${
              k.id === kurveId
                ? "border-sky-600 bg-sky-50 dark:bg-sky-900/40"
                : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
            }`}
            onClick={() => kurveWaehlen(k.id)}
          >
            {k.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: 34 }}>
            f(x) ↑
          </div>
          <svg
            ref={svgRef}
            width={B}
            height={H}
            viewBox={`0 0 ${B} ${H}`}
            className="max-w-full rounded border border-slate-300 bg-white dark:border-slate-600"
            style={{ touchAction: "none" }}
            onPointerMove={(e) => {
              if (!zieht.current) return;
              const x = zurWelt(e.clientX);
              if (zieht.current === "a") setA(Math.min(x, b - 0.15));
              else setB(Math.max(x, a + 0.15));
            }}
            onPointerUp={() => {
              zieht.current = null;
            }}
            onPointerLeave={() => {
              zieht.current = null;
            }}
          >
            <SehnenSVG
              f={f}
              a={a}
              b={b}
              yBereich={kurve.yBereich}
              breite={B}
              hoehe={H}
              lambda={lambda}
              ziehbar
              ticks
              onZiehStart={(welcher, e) => {
                zieht.current = welcher;
                (e.target as Element).setPointerCapture(e.pointerId);
              }}
            />
          </svg>
          <div className="mt-0.5 text-center text-[11px]" style={{ width: B }}>
            x →
          </div>
        </div>

        <div className="min-w-[15rem] grow space-y-2 text-sm">
          <p className="font-mono text-xs" style={{ color: BLAU }}>
            {kurve.formel}
          </p>
          <Slider
            label="x"
            value={a}
            onChange={(v) => setA(Math.min(v, b - 0.15))}
            min={-2}
            max={2}
            step={0.01}
            fmt={(v) => fmt(v)}
          />
          <Slider
            label="y"
            value={b}
            onChange={(v) => setB(Math.max(v, a + 0.15))}
            min={-2}
            max={2}
            step={0.01}
            fmt={(v) => fmt(v)}
          />
          <Slider label="λ" value={lambda} onChange={setLambda} min={0} max={1} step={0.01} fmt={(v) => fmt(v)} />
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3">λx + (1−λ)y</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {fmt(xl, 3)}
                </td>
              </tr>
              <tr>
                <td className="pr-3">f(λx + (1−λ)y)</td>
                <td className="font-mono text-xs" style={{ color: BLAU }}>
                  {fmt(links, 3)}
                </td>
              </tr>
              <tr>
                <td className="pr-3">λf(x) + (1−λ)f(y)</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {fmt(rechts, 3)}
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ color: links <= rechts + 1e-12 ? GRUEN : ROT }}>
            {links <= rechts + 1e-12
              ? "Bei diesem λ ist die Ungleichung erfüllt."
              : "Bei diesem λ ist die Ungleichung verletzt."}
          </p>
          <p className="font-semibold" style={{ color: status.farbe }}>
            {status.kopf}
          </p>
          <p className="max-w-prose">{status.text}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- statische Tafeln */

export function KonvexKonkavPanels() {
  const tafeln: { id: string; a: number; b: number; titel: string }[] = [
    { id: "parabel", a: -1.4, b: 1.5, titel: "konvex" },
    { id: "konkav", a: -1.4, b: 1.5, titel: "konkav" },
    { id: "betrag", a: -1.5, b: 1.5, titel: "konvex, nicht streng" },
    { id: "doppelmulde", a: -1.6, b: 1.3, titel: "weder noch" },
  ];
  return (
    <div className="my-3">
      <div className="flex flex-wrap justify-center gap-4">
        {tafeln.map(({ id, a, b, titel }) => {
          const k = KURVEN.find((c) => c.id === id) ?? KURVEN[0];
          return (
            <div key={id}>
              <svg
                width={190}
                height={140}
                viewBox="0 0 190 140"
                className="rounded border border-slate-300 bg-white dark:border-slate-600"
              >
                <SehnenSVG f={k.f} a={a} b={b} yBereich={k.yBereich} breite={190} hoehe={140} />
              </svg>
              <p className="text-center text-sm text-slate-600 dark:text-slate-300">{titel}</p>
              <p className="text-center font-mono text-[11px]" style={{ color: BLAU }}>
                {k.formel}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Epigraph-Bild */

export function EpigraphSkizze() {
  const k = KURVEN[2];
  return (
    <div className="my-3 flex flex-col items-center">
      <svg
        width={280}
        height={200}
        viewBox="0 0 280 200"
        className="rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        <SehnenSVG f={k.f} a={-1.3} b={1.6} yBereich={k.yBereich} breite={280} hoehe={200} epigraph />
        <text x={150} y={48} fontSize={12} fill={BLAU}>
          epi(f)
        </text>
        <text x={96} y={186} fontSize={12} fill={BLAU}>
          f
        </text>
      </svg>
      <p className="mt-1 max-w-prose text-center text-xs text-slate-500 dark:text-slate-400">
        Der Epigraph von f(x) = 0,6x² + 0,3 ist die blaue Fläche über dem Graphen, der Graph
        selbst gehört dazu. Die grüne Sehne verbindet zwei seiner Punkte und bleibt in der
        Fläche; so ist Konvexität in Definition 12.3.6 erklärt.
      </p>
    </div>
  );
}
