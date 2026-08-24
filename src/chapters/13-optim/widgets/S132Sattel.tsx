import { useMemo, useState } from "react";
import {
  Aufgabe,
  clamp,
  DragHandle,
  FMM_COLORS,
  fmtDe as fmt,
  LabeledPlot,
  Slider,
  Surface3D,
  useDrag,
  Verdikt,
  ViewControls,
  W_BUTTON,
  W_BUTTON_AKTIV,
} from "../../../lib";
import type { Kurve3D, Punkt3D, Series, Sicht3D, Vec3 } from "../../../lib";

/**
 * §13.2 — DIE EINE EINSICHT: Ein Newton-Schritt läuft in den Sattelpunkt
 * HINEIN, der Gradientenabstieg entkommt ihm — außer auf dem einen Startstrahl
 * y = 0, auf dem er selbst hineinläuft.
 *
 * Eigenbau zur Folie „Sattelpunkte" bzw. „Sattelpunkte: Analyse"
 * (13-optim.Rmd Z. 329–357); ersetzt resources/optim-saddle-point.pdf. Der
 * Höhenlinien-Code zeichnet die Hyperbeln von f(x, y) = x² − y² exakt:
 * f = c > 0 ist x = ±√(c + y²), f = c < 0 ist y = ±√(−c + x²), f = 0 sind die
 * beiden Geraden y = ±x. Kein portierter Code, kein Math.random.
 *
 * Drei Tafeln, verlinkt (Muster 3): links die tot lesbare Höhenlinientafel mit
 * dem ziehbaren Punkt (alle Zahlen stehen in ihrem Verdikt), in der Mitte
 * dieselbe Funktion als Fläche (`Surface3D`, D7) mit derselben Bahn und
 * demselben Punkt, rechts die beiden Achsenschnitte als Parabeln. Die 3D-Tafel
 * behauptet keine eigenen Zahlen.
 *
 * Farbrollen (Farbcode Kapitel 13): blau die Iterierten des Abstiegs, orange
 * die Suchrichtung −∇f, grün die x-Achse (Minimumsrichtung, dorthin läuft der
 * Abstieg), rot die y-Achse (Maximumsrichtung, dort laufen die Iterierten
 * davon), violett der stationäre Punkt — die im Kapitel freie Farbe, hier mit
 * genau dieser Rolle.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen, 2026-08-19;
 * ältere Prüfung check-math-s132.mjs bestätigt):
 *  - ∇f = (2x, −2y) und H = diag(2, −2) gegen zentrale Differenzen (in
 *    (1,7; −0,9): numerisch (3,400000; 1,800000) = analytisch).
 *  - Ein Newton-Schritt liefert aus JEDEM Punkt exakt (0; 0), denn
 *    a − 2a/2 = 0 und b − (−2b)/(−2) = 0.
 *  - Abstieg mit γ = 0,25 hat die Faktoren 0,500 (x) und 1,500 (y). Ab
 *    (1,5; 0,4): (0,75; 0,60), (0,375; 0,90), (0,1875; 1,35), nach acht
 *    Schritten (5,8594·10⁻³; 10,2516). Ab (1,5; 0) nach acht Schritten
 *    (5,8594·10⁻³; 0), nach zwanzig (1,431·10⁻⁶; 0).
 *  - γ = 0,45: Faktoren 0,100 / 1,900, nach acht Schritten (1,5·10⁻⁸; 67,93).
 *    γ = 0,05: Faktoren 0,900 / 1,100, nach acht Schritten (0,6457; 0,8574).
 *  - γ = 0,5 macht den x-Faktor exakt null (ein Schritt genügt), der y-Faktor
 *    steht dann bei 2,000.
 */

const BLAU = FMM_COLORS.blau; // Iterierte des Gradientenabstiegs
const GRUEN = FMM_COLORS.gruen; // x-Achse: Richtung, in der ein Minimum liegt
const ROT = FMM_COLORS.rot; // y-Achse: Richtung, in der f nach unten wegläuft
const ORANGE = FMM_COLORS.orange; // Suchrichtung −∇f
const VIOLETT = FMM_COLORS.violett; // stationärer Punkt

const HALB = 2;
const SIZE = 300;
const PAD_L = 30;
const PAD_B = 16;
const PAD_R = 10;
const SCHRITTE = 8;

const px = (x: number) => PAD_L + ((x + HALB) / (2 * HALB)) * SIZE;
const py = (y: number) => SIZE - ((y + HALB) / (2 * HALB)) * SIZE;

const f = (x: number, y: number) => x * x - y * y;

/**
 * Ein Ast einer Höhenlinie als SVG-Punktliste. Für c > 0 laufen wir über y und
 * lösen nach x auf, für c < 0 umgekehrt; Punkte ausserhalb des Fensters lassen
 * wir weg.
 */
function ast(c: number, vorzeichen: 1 | -1): string {
  const punkte: string[] = [];
  const n = 120;
  for (let i = 0; i <= n; i++) {
    const t = -HALB + (2 * HALB * i) / n;
    if (c > 0) {
      const x = vorzeichen * Math.sqrt(c + t * t);
      if (Math.abs(x) <= HALB) punkte.push(`${px(x).toFixed(1)},${py(t).toFixed(1)}`);
    } else {
      const y = vorzeichen * Math.sqrt(-c + t * t);
      if (Math.abs(y) <= HALB) punkte.push(`${px(t).toFixed(1)},${py(y).toFixed(1)}`);
    }
  }
  return punkte.join(" ");
}

const NIVEAUS_POS = [0.5, 1, 2, 3];
const NIVEAUS_NEG = [-0.5, -1, -2, -3];

/**
 * Die drei Voreinstellungen sind die drei Experimente des Abschnitts: der
 * gewöhnliche Start, der Sonderfall auf der Minimumsachse und ein Start, von
 * dem aus der Newton-Schritt gezeigt wird.
 */
const VOREINSTELLUNGEN: { name: string; x: number; y: number; gamma: number; bahn: boolean }[] = [
  { name: "Abstieg entkommt", x: 1.5, y: 0.4, gamma: 0.25, bahn: true },
  { name: "Startstrahl y = 0", x: 1.5, y: 0, gamma: 0.25, bahn: true },
  { name: "Newton von schräg", x: 1.7, y: -0.9, gamma: 0.25, bahn: false },
];

export function SattelpunktWidget() {
  const [x, setX] = useState(1.5);
  const [y, setY] = useState(0.4);
  const [gamma, setGamma] = useState(0.25);
  const [zeigeBahn, setZeigeBahn] = useState(true);
  const [newtonGenutzt, setNewtonGenutzt] = useState(false);

  const runden = (v: number) => Math.round(v * 20) / 20;
  const setzen = (nx: number, ny: number) => {
    setX(runden(nx));
    setY(runden(ny));
    setNewtonGenutzt(false);
  };

  const zieh = useDrag<"p">({
    feld: { x0: PAD_L, y0: 0, w: SIZE, h: SIZE },
    welt: { x0: -HALB, x1: HALB, y0: -HALB, y1: HALB },
    clamp: ([a, b]) => [clamp(a, -HALB, HALB), clamp(b, -HALB, HALB)],
    snap: 0.05,
    greifPosition: () => [x, y],
    onDrag: ([a, b]) => setzen(a, b),
  });

  const gx = 2 * x;
  const gy = -2 * y;
  const gnorm = Math.hypot(gx, gy);
  const wert = f(x, y);

  // Gradientenabstieg von (x, y) aus: x_{k+1} = (1−2γ)x_k, y_{k+1} = (1+2γ)y_k
  const bahn = useMemo(() => {
    const b: [number, number][] = [[x, y]];
    for (let k = 0; k < SCHRITTE; k++) {
      const [bx, by] = b[k];
      b.push([bx * (1 - 2 * gamma), by * (1 + 2 * gamma)]);
    }
    return b;
  }, [x, y, gamma]);
  const ende = bahn[SCHRITTE];
  const verlaesstFenster = bahn.some(([bx, by]) => Math.abs(bx) > HALB || Math.abs(by) > HALB);

  // Suchrichtung −∇f, auf eine gut sichtbare Länge skaliert
  const pfeilLaenge = gnorm > 1e-9 ? Math.min(0.9, 0.25 + 0.15 * gnorm) : 0;
  const pfeilZiel: [number, number] =
    gnorm > 1e-9 ? [x - (gx / gnorm) * pfeilLaenge, y - (gy / gnorm) * pfeilLaenge] : [x, y];

  const eps = 1e-9;
  const aufAchseX = Math.abs(y) < eps;
  const aufAchseY = Math.abs(x) < eps;
  const faktorX = Math.abs(1 - 2 * gamma);
  const faktorY = 1 + 2 * gamma;

  /* ------------------------------------------------- Verdikt: vier Zweige */

  let art: "stationaer" | "strahl" | "achseY" | "entkommt";
  if (aufAchseX && aufAchseY) art = "stationaer";
  else if (aufAchseX) art = "strahl";
  else if (aufAchseY) art = "achseY";
  else art = "entkommt";

  const verdikt: Record<typeof art, { kind: "neutral" | "ok" | "warn" | "fail"; titel: string; text: string }> = {
    stationaer: {
      kind: "neutral",
      titel: "im stationären Punkt",
      text: `Der Gradient ist null, es gibt also keinen Pfeil, und jedes Verfahren bleibt stehen, wo es steht. Trotzdem liegt hier weder ein Minimum noch ein Maximum: In jeder noch so kleinen Umgebung gibt es Punkte auf der grünen Achse mit größerem und Punkte auf der roten Achse mit kleinerem Funktionswert. Genau das meint Bemerkung 13.2.12 mit „Sattelpunkt".`,
    },
    strahl: {
      kind: "warn",
      titel: "der Sonderfall y = 0",
      text: `Auf der grünen Achse zeigt der Gradient nur in x-Richtung, und der Abstieg bleibt auf der Achse: y bleibt exakt null, x schrumpft mit dem Faktor ${fmt(faktorX)} pro Schritt und steht nach ${SCHRITTE} Schritten bei ${fmt(ende[0], 4)}. Hier läuft also auch der Gradientenabstieg in den Sattelpunkt hinein. Dieser eine Startstrahl ist die Ausnahme: Er hat in der Ebene Maß null, weshalb ihn ein zufälliger Startpunkt mit Wahrscheinlichkeit null trifft.`,
    },
    achseY: {
      kind: "fail",
      titel: "auf der Maximumsachse",
      text: `Auf der roten Achse ist f nach unten geöffnet, und der Abstieg folgt genau dieser Richtung: |y| wächst in jedem Schritt um den Faktor ${fmt(faktorY)} und steht nach ${SCHRITTE} Schritten bei ${fmt(ende[1], 3)}. Der Funktionswert fällt dabei zwar in jedem Schritt, nur eben ins Bodenlose. Ein Minimum findet das Verfahren so nie.`,
    },
    entkommt: {
      kind: "ok",
      titel: "der Abstieg entkommt",
      text: `Beide Komponenten sind besetzt, und der Abstieg behandelt sie gegenläufig: x drückt er mit dem Faktor ${fmt(faktorX)} pro Schritt gegen null, y bläst er mit dem Faktor ${fmt(faktorY)} auf. Nach ${SCHRITTE} Schritten steht er bei (${fmt(ende[0], 3)}; ${fmt(ende[1], 3)}), also praktisch auf der roten Achse und weit weg vom Sattel. Der Gradientenabstieg bleibt an einem Sattelpunkt nicht hängen (Bemerkung 13.2.12); dass er dabei überhaupt nichts findet, ist eine andere Geschichte.`,
    },
  };
  const status = verdikt[art];

  const schnitte: Series[] = [
    { f: (t: number) => t * t, color: GRUEN, label: "f(t, 0) = t²" },
    { f: (t: number) => -t * t, color: ROT, label: "f(0, t) = −t²" },
  ];

  /* --------------------------------------------- verlinkte 3D-Tafel (D7) */

  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 40, elevation: 24 });
  const flaeche = useMemo(
    () => ({ f, nx: 30, ny: 30, color: BLAU, opacity: 0.82, wire: true }),
    [],
  );
  const punkte3d = useMemo((): Punkt3D[] => {
    const ps: Punkt3D[] = [
      { p: [0, 0, 0] as Vec3, color: VIOLETT, r: 4.5, label: "x*", onTop: true },
      { p: [x, y, f(x, y)] as Vec3, color: BLAU, r: 4.5, onTop: true },
    ];
    return ps;
  }, [x, y]);
  // Dieselbe Bahn wie links, auf die Fläche gehoben; abgeschnitten am Fenster.
  const kurven3d = useMemo((): Kurve3D[] => {
    if (!zeigeBahn) return [];
    const pts = bahn
      .filter(([bx, by]) => Math.abs(bx) <= HALB && Math.abs(by) <= HALB)
      .map(([bx, by]) => [bx, by, f(bx, by)] as Vec3);
    return pts.length > 1 ? [{ pts, color: BLAU, width: 2, dash: "4 3", onTop: true }] : [];
  }, [bahn, zeigeBahn]);
  const GESTALT: Record<typeof art, string> = {
    stationaer: "der Punkt sitzt genau im Sattel",
    strahl: "der Punkt sitzt auf dem aufsteigenden Grat",
    achseY: "der Punkt sitzt auf dem abfallenden Grat",
    entkommt: "der Punkt sitzt auf einer der Flanken",
  };

  const knopf = (aktiv: boolean) => (aktiv ? W_BUTTON_AKTIV : W_BUTTON);

  return (
    <div className="space-y-3">
      <Aufgabe>
        Ziehen wir den blauen Punkt über die Fläche und lassen den Abstieg laufen: Von welchen
        Startpunkten aus landet er im Sattel?
      </Aufgabe>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {VOREINSTELLUNGEN.map((v) => {
          const aktiv = x === v.x && y === v.y && gamma === v.gamma;
          return (
            <button
              key={v.name}
              type="button"
              aria-pressed={aktiv}
              className={knopf(aktiv)}
              onClick={() => {
                setX(v.x);
                setY(v.y);
                setGamma(v.gamma);
                setZeigeBahn(v.bahn);
                setNewtonGenutzt(false);
              }}
            >
              {v.name}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="inline-block min-w-0 max-w-full select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            y ↑
          </div>
          <svg
            viewBox={`0 0 ${PAD_L + SIZE + PAD_R} ${SIZE + PAD_B}`}
            width={PAD_L + SIZE + PAD_R}
            height={SIZE + PAD_B}
            role="img"
            aria-label={`Höhenlinien von f(x, y) = x² − y² mit dem Punkt (${fmt(x)}; ${fmt(y)}); ${GESTALT[art]}.`}
            className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
            {...zieh.svgProps}
          >
            <defs>
              <clipPath id="s132-clip">
                <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
              </clipPath>
              <marker id="s132-pfeil" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} />
              </marker>
            </defs>
            {[-2, -1, 0, 1, 2].map((t) => (
              <g key={`t${t}`}>
                <text x={PAD_L - 4} y={py(t) + 3} textAnchor="end" fill="#64748b" fontSize={10}>
                  {fmt(t, 0)}
                </text>
                <text x={px(t)} y={SIZE + 12} textAnchor="middle" fill="#64748b" fontSize={10}>
                  {fmt(t, 0)}
                </text>
              </g>
            ))}
            <g clipPath="url(#s132-clip)">
              {NIVEAUS_POS.map((c) =>
                ([1, -1] as const).map((s) => (
                  <polyline
                    key={`p${c}${s}`}
                    points={ast(c, s)}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth={1}
                  />
                )),
              )}
              {NIVEAUS_NEG.map((c) =>
                ([1, -1] as const).map((s) => (
                  <polyline
                    key={`n${c}${s}`}
                    points={ast(c, s)}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth={1}
                    strokeDasharray="4 3"
                  />
                )),
              )}
              <line x1={px(-HALB)} y1={py(-HALB)} x2={px(HALB)} y2={py(HALB)} stroke="#475569" strokeWidth={1.8} />
              <line x1={px(-HALB)} y1={py(HALB)} x2={px(HALB)} y2={py(-HALB)} stroke="#475569" strokeWidth={1.8} />
              <line x1={px(-HALB)} y1={py(0)} x2={px(HALB)} y2={py(0)} stroke={GRUEN} strokeWidth={2.4} />
              <line x1={px(0)} y1={py(-HALB)} x2={px(0)} y2={py(HALB)} stroke={ROT} strokeWidth={2.4} />
              {zeigeBahn && (
                <>
                  <polyline
                    points={bahn.map(([bx, by]) => `${px(bx).toFixed(1)},${py(by).toFixed(1)}`).join(" ")}
                    fill="none"
                    stroke={BLAU}
                    strokeWidth={1.4}
                    strokeDasharray="3 3"
                  />
                  {bahn.slice(1).map(([bx, by], k) => (
                    <circle key={`b${k}`} cx={px(bx)} cy={py(by)} r={3} fill={BLAU} opacity={0.65} />
                  ))}
                </>
              )}
              {gnorm > 1e-9 && (
                <line
                  x1={px(x)}
                  y1={py(y)}
                  x2={px(pfeilZiel[0])}
                  y2={py(pfeilZiel[1])}
                  stroke={ORANGE}
                  strokeWidth={2.2}
                  markerEnd="url(#s132-pfeil)"
                />
              )}
              <circle cx={px(0)} cy={py(0)} r={7} fill="none" stroke={VIOLETT} strokeWidth={2} />
              <DragHandle
                x={px(x)}
                y={py(y)}
                farbe={BLAU}
                r={5}
                aktiv={zieh.dragging === "p"}
                {...zieh.handleProps("p")}
              />
            </g>
          </svg>
          <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
            x →
          </div>
        </div>
        <div className="min-w-0 max-w-full">
          <Surface3D
            size={280}
            xDomain={[-HALB, HALB]}
            yDomain={[-HALB, HALB]}
            zDomain={[-4, 4]}
            surface={flaeche}
            contours={[...NIVEAUS_NEG, 0, ...NIVEAUS_POS]}
            contourColor={BLAU}
            points={punkte3d}
            curves={kurven3d}
            labels={{ x: "x", y: "y", z: "f" }}
            azimuth={sicht.azimuth}
            elevation={sicht.elevation}
            onViewChange={setSicht}
            ariaLabel={`Die Sattelfläche f(x, y) = x² − y² über der Ebene; ${GESTALT[art]}.`}
          />
          <div className="mt-1 max-w-[280px]">
            <ViewControls value={sicht} onChange={setSicht} />
          </div>
          <p className="mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300">
            Dieselbe Funktion als Fläche. Der violette Punkt ist derselbe stationäre Punkt, der
            blaue derselbe wie links, die gestrichelte blaue Kurve dieselbe Bahn, nur auf die
            Fläche gehoben. Ziehen dreht die Ansicht.
          </p>
        </div>
        <div>
          <LabeledPlot
            xLabel="t"
            yLabel="f"
            series={schnitte}
            xDomain={[-2, 2]}
            yDomain={[-4, 4]}
            width={300}
            height={300}
            markers={[
              { x, y: x * x, color: GRUEN },
              { x: y, y: -y * y, color: ROT },
            ]}
          />
          <p className="mt-1 max-w-[300px] text-xs text-slate-600 dark:text-slate-300">
            Dieselbe Funktion, aber nur auf den beiden Achsen: grün mit dem Minimum in t = 0,
            rot mit dem Maximum dort. Die beiden Marken sitzen bei t = x beziehungsweise
            t = y. Ein und derselbe Punkt ist für die eine Richtung der tiefste und für die
            andere der höchste der Gegend.
          </p>
        </div>
      </div>
      <Slider label="x" value={x} onChange={(v) => setzen(v, y)} min={-2} max={2} step={0.05} accent={BLAU} />
      <Slider label="y" value={y} onChange={(v) => setzen(x, v)} min={-2} max={2} step={0.05} accent={BLAU} />
      <Slider
        label="γ (Schrittweite)"
        value={gamma}
        onChange={(v) => setGamma(Math.round(v * 20) / 20)}
        min={0.05}
        max={0.45}
        step={0.05}
        accent={ORANGE}
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          aria-pressed={zeigeBahn}
          className={knopf(zeigeBahn)}
          onClick={() => setZeigeBahn((b) => !b)}
        >
          {zeigeBahn ? "Abstieg ausblenden" : "Gradientenabstieg zeigen"}
        </button>
        <button
          type="button"
          className={W_BUTTON}
          onClick={() => {
            setX(0);
            setY(0);
            setNewtonGenutzt(true);
          }}
        >
          ein Newton-Schritt
        </button>
      </div>
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p>
          Punkt{" "}
          <span className="font-mono" style={{ color: BLAU }}>
            ({fmt(x)}; {fmt(y)})
          </span>
          , Funktionswert <span className="font-mono">{fmt(wert)}</span>, Gradient{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            ({fmt(gx)}; {fmt(gy)})
          </span>{" "}
          mit Norm <span className="font-mono">{fmt(gnorm)}</span>
        </p>
        <p>
          Hesse-Matrix <span className="font-mono">H = (2 0; 0 −2)</span>, überall dieselbe;
          Eigenwerte <span className="font-mono">λ₁ = 2</span> zur x-Richtung und{" "}
          <span className="font-mono">λ₂ = −2</span> zur y-Richtung, also{" "}
          <span className="font-semibold">indefinit</span>.
        </p>
        <p>
          Abstiegsfaktoren pro Schritt: <span className="font-mono">|1 − 2γ| = {fmt(faktorX)}</span> in
          x-Richtung, <span className="font-mono">1 + 2γ = {fmt(faktorY)}</span> in y-Richtung.
        </p>
      </div>
      <Verdikt kind={status.kind} titel={status.titel}>
        {status.text}
        {newtonGenutzt && (
          <>
            {" "}
            Der Newton-Schritt hat gerade auf (0; 0) gezeigt, und zwar von jedem Startpunkt aus:
            f ist quadratisch, seine Taylornäherung zweiten Grades also exakt, und der einzige
            stationäre Punkt dieser Näherung ist der Sattel. Newton sucht Nullstellen des
            Gradienten, nicht Minima.
          </>
        )}
        {zeigeBahn && verlaesstFenster && (
          <>
            {" "}
            Die gestrichelte Bahn verlässt das gezeigte Fenster; gerechnet wird sie weiter bis zu
            dem Endpunkt, den dieses Verdikt nennt.
          </>
        )}
      </Verdikt>
    </div>
  );
}
