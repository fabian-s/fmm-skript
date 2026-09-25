import { useState } from "react";
import type { ReactNode } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  clamp,
  fmtDe,
  fmtTick,
  niceTicks,
  useDrag,
} from "../../../lib";
import { num, ref } from "../../numbers.generated";

/**
 * §11.3: Sehnentest, Konvex-vs-konkav-Tafeln und Epigraph-Skizze.
 *
 * DIE EINE EINSICHT: Ein einziges Paar mit Sehne unter dem Graphen widerlegt
 * die Konvexität; Gleichheit auf einem geraden Stück trennt konvex von strikt
 * konvex (Satz 11.3.8, Gleichung 11.3.4).
 *
 * Der SVG-Rechenkern (Kurve, Sehne, Verletzungsflächen als Polygonzüge,
 * ziehbare Endpunkte, λ-Sonde) ist aus dem privaten Kursmaterial
 * heath-ch5-6/src/sections/S61.tsx (ChordSVG, ConvexityPanels, ChordWidget)
 * portiert; Funktionsauswahl, Farbrollen, Achsenbeschriftung, Zahlformat und
 * sämtliche Texte sind für diesen Abschnitt neu geschrieben. Das Ziehen läuft
 * seit 2026-08-19 über `useDrag` aus der Lib (kein touch-action auf dem ganzen
 * SVG mehr, damit die Seite am Widget vorbeiscrollen kann).
 *
 * Die drei Bausteine ersetzen die Folienbilder epigraph.png und
 * konvexitaet-convex-panels.pdf (11-konvexitaet.Rmd Z. 405 bzw. 410).
 *
 * FARBROLLEN (Kapitel 11): Epigraph/Funktionsgraph blau, Sehne und
 * Konvexkombinationen grün, Verletzungen rot, ausgezeichnete Punkte orange.
 *
 * PRÜFSTATUS (scripts/verify/REV29/11-konvexitaet.mjs, 2026-08-29): über alle 3081
 * Paare des 0,05-Rasters mit y − x ≥ 0,15 je Kurve: 0,6x²+0,3 besteht die
 * Sehnenprobe auf JEDEM Paar und deckt den Graphen nie (strikt konvex);
 * |x| besteht ebenfalls jedes Paar, bei 1482 davon fällt die Sehne mit dem
 * Graphen zusammen (beide Endpunkte auf demselben Ast) — konvex, nicht
 * strikt; 2−0,6x² verletzt (11.3.4) auf jedem der 3081 Paare, höchstens um
 * 2,400; x⁴−3x²−x+3 verletzt auf 1971 Paaren (höchstens um 2,246) und besteht
 * auf 1110, von denen nur 552 ganz in einem der beiden konvexen Äste liegen —
 * die Probe kann also auch über den Höcker hinweg gelingen. Einzelwerte: die
 * Voreinstellung x = −1,55 / y = 1,25 verletzt um 1,891, das Tafelpaar
 * a = −1,6 / b = 1,3 um 1,738 auf 63,7 % der Strecke, und x = −1,8 / y = −0,9
 * besteht exakt. Wendepunkte der Doppelmulde bei ±1/√2 = ±0,7071.
 */

const BLAU = FMM_COLORS.blau; // Graph und Epigraph
const GRUEN = FMM_COLORS.gruen; // Sehne, Konvexkombinationen
const ROT = FMM_COLORS.rot; // Stellen, an denen der Graph über der Sehne liegt

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
    name: "strikt konvex",
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

/** Zeichenfläche der interaktiven Tafel (auch für die Weltumrechnung). */
const B = 460;
const H = 290;
const PADL_T = 34;
const PADR_T = 10;
const PADT_T = 10;
const PADB_T = 30;

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
  ticks = false,
  epigraph = false,
  griff,
}: {
  f: (x: number) => number;
  a: number;
  b: number;
  yBereich: [number, number];
  breite: number;
  hoehe: number;
  lambda?: number;
  ticks?: boolean;
  epigraph?: boolean;
  /** Griff-Props aus useDrag; ohne sie ist die Tafel statisch. */
  griff?: (welcher: "a" | "b") => ReactNode;
}) {
  const PADL = ticks ? PADL_T : 10;
  const PADR = ticks ? PADR_T : 10;
  const PADT = ticks ? PADT_T : 10;
  const PADB = ticks ? PADB_T : 10;
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
      <rect
        x={0.5}
        y={0.5}
        width={breite - 1}
        height={hoehe - 1}
        rx={4}
        fill="var(--w-bg, #ffffff)"
        stroke="var(--w-border, #cbd5e1)"
      />
      {ticks && (
        <>
          {niceTicks(y0, y1, 4).map((t) => (
            <g key={`y${t}`}>
              <line
                x1={PADL}
                x2={breite - PADR}
                y1={py(t)}
                y2={py(t)}
                stroke={t === 0 ? "var(--w-grid-strong, #cbd5e1)" : "var(--w-grid, #e2e8f0)"}
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text
                x={PADL - 4}
                y={py(t) + 3}
                textAnchor="end"
                fill="var(--w-muted, #64748b)"
                fontSize={10}
              >
                {fmtTick(t)}
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
                stroke={t === 0 ? "var(--w-grid-strong, #cbd5e1)" : "var(--w-grid, #e2e8f0)"}
                strokeWidth={t === 0 ? 1.2 : 0.6}
              />
              <text
                x={px(t)}
                y={hoehe - PADB + 13}
                textAnchor="middle"
                fill="var(--w-muted, #64748b)"
                fontSize={10}
              >
                {fmtTick(t, 1)}
              </text>
            </g>
          ))}
        </>
      )}
      {!ticks && y0 < 0 && y1 > 0 && (
        <line
          x1={PADL}
          x2={breite - PADR}
          y1={py(0)}
          y2={py(0)}
          stroke="var(--w-grid, #e2e8f0)"
          strokeWidth={1}
        />
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
            stroke="var(--w-muted, #94a3b8)"
            strokeWidth={1.2}
            strokeDasharray="3 3"
          />
          <circle cx={px(xl)} cy={py(f(xl))} r={4} fill={BLAU} />
          <circle cx={px(xl)} cy={py(sehne(xl))} r={4} fill={GRUEN} />
        </>
      )}

      {(["a", "b"] as const).map((welcher) => {
        const x = welcher === "a" ? a : b;
        return griff ? (
          <g key={welcher}>{griff(welcher)}</g>
        ) : (
          <circle
            key={welcher}
            cx={px(x)}
            cy={py(f(x))}
            r={3.5}
            fill="var(--w-bg, #ffffff)"
            stroke={GRUEN}
            strokeWidth={2}
          />
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

  const kurve = KURVEN.find((k) => k.id === kurveId) ?? KURVEN[0];
  const { f } = kurve;

  const px = (x: number) => PADL_T + ((x + 2) / 4) * (B - PADL_T - PADR_T);
  const py = (y: number) =>
    PADT_T + (1 - (y - kurve.yBereich[0]) / (kurve.yBereich[1] - kurve.yBereich[0])) * (H - PADT_T - PADB_T);

  const zieh = useDrag<"a" | "b">({
    feld: { x0: PADL_T, y0: PADT_T, w: B - PADL_T - PADR_T, h: H - PADT_T - PADB_T },
    welt: { x0: -2, x1: 2, y0: kurve.yBereich[0], y1: kurve.yBereich[1] },
    // nur die x-Koordinate zählt; die Endpunkte sitzen auf dem Graphen
    clamp: ([x, y], id) => [id === "a" ? clamp(x, -2, b - 0.15) : clamp(x, a + 0.15, 2), y],
    greifPosition: (id) => (id === "a" ? [a, f(a)] : [b, f(b)]),
    onDrag: ([x], id) => (id === "a" ? setA(x) : setB(x)),
  });

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
  let groessteAbweichung = 0;
  for (let i = 0; i <= 400; i++) {
    const x = a + ((b - a) * i) / 400;
    const abw = f(x) - (fa + ((fb - fa) * (x - a)) / (b - a));
    groessteVerletzung = Math.max(groessteVerletzung, abw);
    groessteAbweichung = Math.max(groessteAbweichung, Math.abs(abw));
  }
  const verletzt = groessteVerletzung > 1e-9;
  // Sehne und Graph fallen zusammen: dann steht in (11.3.4) Gleichheit.
  // Nicht am aktuellen λ ablesen, dort ist bei λ = 0 oder λ = 1 immer Gleichheit.
  const sehneAufGraph = groessteAbweichung < 1e-12;
  // Wendepunkte der Doppelmulde bei ±1/sqrt(2): liegen beide Endpunkte in
  // einem der beiden konvexen Äste? (Bestehen kann das Paar auch sonst.)
  const WENDE = 1 / Math.SQRT2;
  const imSelbenAst = b <= -WENDE || a >= WENDE;

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir x und y auf der Doppelmulde in denselben Talgrund, bis das Paar die Probe
        besteht. Danach suchen wir eines, das sie sprengt.
      </Aufgabe>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {KURVEN.map((k) => (
          <button
            key={k.id}
            type="button"
            aria-pressed={k.id === kurveId}
            className={k.id === kurveId ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => kurveWaehlen(k.id)}
          >
            {k.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 grow basis-[320px]">
          <svg
            width={B}
            height={H}
            viewBox={`0 0 ${B} ${H}`}
            className="max-w-full h-auto rounded"
            role="img"
            aria-label={`Der Graph von ${kurve.formel} mit der Sehne zwischen x und y; die Sehne wird ${
              verletzt ? "unterschritten" : "nicht unterschritten"
            }.`}
            {...zieh.svgProps}
          >
            <SehnenSVG
              f={f}
              a={a}
              b={b}
              yBereich={kurve.yBereich}
              breite={B}
              hoehe={H}
              lambda={lambda}
              ticks
              griff={(welcher) => {
                const x = welcher === "a" ? a : b;
                return (
                  <DragHandle
                    x={px(x)}
                    y={py(f(x))}
                    r={4.5}
                    farbe={GRUEN}
                    aktiv={zieh.dragging === welcher}
                    label={welcher === "a" ? "x" : "y"}
                    {...zieh.handleProps(welcher)}
                  />
                );
              }}
            />
            <text x={PADL_T} y={9} fill="var(--w-muted, #64748b)" fontSize={10}>
              f(x) ↑
            </text>
            <text
              x={(PADL_T + B - PADR_T) / 2}
              y={H - 3}
              textAnchor="middle"
              fill="var(--w-muted, #64748b)"
              fontSize={10}
            >
              x →
            </text>
          </svg>
        </div>

        <div className="min-w-[15rem] grow basis-[15rem] space-y-1 text-sm">
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
            accent={GRUEN}
          />
          <Slider
            label="y"
            value={b}
            onChange={(v) => setB(Math.max(v, a + 0.15))}
            min={-2}
            max={2}
            step={0.01}
            accent={GRUEN}
          />
          <Slider label="λ" value={lambda} onChange={setLambda} min={0} max={1} step={0.01} />
          <table className="text-sm">
            <tbody>
              <tr>
                <td className="pr-3">λx + (1−λ)y</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {fmtDe(xl, 3)}
                </td>
              </tr>
              <tr>
                <td className="pr-3">f(λx + (1−λ)y)</td>
                <td className="font-mono text-xs" style={{ color: BLAU }}>
                  {fmtDe(links, 3)}
                </td>
              </tr>
              <tr>
                <td className="pr-3">λf(x) + (1−λ)f(y)</td>
                <td className="font-mono text-xs" style={{ color: GRUEN }}>
                  {fmtDe(rechts, 3)}
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ color: links <= rechts + 1e-12 ? GRUEN : ROT }}>
            {links <= rechts + 1e-12
              ? `An dieser Zwischenstelle stimmt (${num("eq:konvexitaet-als-ungleichung")}).`
              : `An dieser Zwischenstelle steht in (${num("eq:konvexitaet-als-ungleichung")}) das falsche Zeichen.`}
          </p>
        </div>
      </div>

      {verletzt && kurve.id === "konkav" ? (
        <Verdikt kind="fail" titel="Der Graph liegt über der ganzen Sehne.">
          An seiner dicksten Stelle misst der rote Streifen {fmtDe(groessteVerletzung, 3)}. So
          geht es dieser Funktion bei jedem Paar, ({num("eq:konvexitaet-als-ungleichung")}) ist also nirgends erfüllt. Mit
          umgedrehtem Zeichen stimmt die Ungleichung dafür immer, und genau so ist konkav erklärt
          ({ref("bemerkung:wie-wir-die-ungleichung-lesen")}): −f ist konvex.
        </Verdikt>
      ) : verletzt ? (
        <Verdikt kind="fail" titel="Sehne unterschritten: die Frage ist entschieden.">
          An seiner dicksten Stelle misst der rote Streifen {fmtDe(groessteVerletzung, 3)}. Dort
          steht in ({num("eq:konvexitaet-als-ungleichung")}) das falsche Zeichen. Weil {ref("satz:konvexitaet-als-ungleichung")} die Ungleichung für alle Paare
          fordert, genügt dieses eine Gegenbeispiel: f ist nicht konvex.
        </Verdikt>
      ) : sehneAufGraph ? (
        <Verdikt kind="warn" titel="Sehne und Graph fallen zusammen.">
          Zwischen x und y verläuft f geradlinig, deshalb deckt die Sehne den Graphen genau ab
          und in ({num("eq:konvexitaet-als-ungleichung")}) steht Gleichheit. Die Ungleichung ist erfüllt, die strikte Fassung
          nicht: Der Betrag ist konvex, aber nicht streng konvex
          ({ref("bemerkung:wie-wir-die-ungleichung-lesen")}; die formale Fassung folgt in {ref("definition:strikte-konvexitaet")}).
        </Verdikt>
      ) : kurve.id === "doppelmulde" ? (
        <Verdikt kind="ok" titel="Geschafft: dieses Paar besteht die Probe.">
          Zwischen x und y bleibt der Graph unter der Sehne.{" "}
          {imSelbenAst
            ? "Beide Endpunkte liegen im selben konvexen Ast; die Wendepunkte sitzen bei ±0,7071."
            : "Das Paar überspannt sogar den Höcker: die Sehne läuft dort schlicht hoch genug."}{" "}
          Bewiesen ist damit nichts, denn ({num("eq:konvexitaet-als-ungleichung")}) fordert alle Paare, und diese Funktion fällt
          anderswo durch. Genau darin liegt die Asymmetrie: Widerlegen kostet ein Paar, Beweisen
          eine Rechnung.
        </Verdikt>
      ) : (
        <Verdikt kind="ok" titel="Sehne liegt über dem Graphen.">
          Zwischen x und y bleibt der Graph unter der Sehne, und bei dieser Funktion gelingt das
          für jedes Paar
          {kurve.id === "parabel" ? ", im Inneren sogar mit strikter Ungleichung" : ""}.
        </Verdikt>
      )}
    </div>
  );
}

/* ------------------------------------------------------- statische Tafeln */

export function KonvexKonkavPanels() {
  // Die Endpunkte sind so gewählt, dass jede Tafel ihre Pointe zeigt: beim
  // Betrag müssen beide auf demselben Ast liegen, sonst steht dort echte
  // Ungleichung und die Tafel ist von der Parabel nicht zu unterscheiden.
  const tafeln: { id: string; a: number; b: number; titel: string }[] = [
    { id: "parabel", a: -1.4, b: 1.5, titel: "konvex" },
    { id: "konkav", a: -1.4, b: 1.5, titel: "konkav" },
    { id: "betrag", a: 0.2, b: 1.7, titel: "konvex, nicht streng" },
    { id: "doppelmulde", a: -1.6, b: 1.3, titel: "weder noch" },
  ];
  return (
    <div className="my-3">
      <div className="flex flex-wrap justify-center gap-4">
        {tafeln.map(({ id, a, b, titel }) => {
          const k = KURVEN.find((c) => c.id === id) ?? KURVEN[0];
          return (
            <div key={id} className="min-w-0 grow basis-[190px] max-w-[280px]">
              <svg
                width={190}
                height={140}
                viewBox="0 0 190 140"
                preserveAspectRatio="xMidYMid meet"
                className="w-full max-w-full h-auto rounded"
                role="img"
                aria-label={`${titel}: ${k.formel} mit einer Sehne.`}
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
      <p className="mx-auto mt-2 max-w-prose text-center text-xs text-slate-500 dark:text-slate-400">
        <span style={{ color: BLAU }}>Blau</span> der Graph,{" "}
        <span style={{ color: GRUEN }}>grün</span> die Sehne, solange sie nirgends unterschritten
        wird, <span style={{ color: ROT }}>rot</span> die Stellen, an denen der Graph über ihr
        liegt.
      </p>
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
        className="max-w-full h-auto rounded"
        role="img"
        aria-label="Der Epigraph von f(x) = 0,6x² + 0,3 als Fläche über dem Graphen, mit einer Sehne darin."
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
        Fläche; so ist Konvexität in {ref("definition:konvexe-funktion")} erklärt.
      </p>
    </div>
  );
}
