import { useMemo, useState } from "react";
import { FMM_COLORS, LabeledPlot, Slider, Surface3D, ViewControls, fmtDe as fmt, niceTicks } from "../../../lib";
import type { Series, Sicht3D, Vec3 } from "../../../lib";

/**
 * §11.3: Hesse-Definitheits-Widget (Eigenbau).
 *
 * Gezeigt wird die quadratische Fläche f(x) = 1/2 x^T H x mit
 * H = R(phi) diag(lambda1, lambda2) R(phi)^T. Die beiden Eigenwerte und der
 * Drehwinkel der Eigenbasis sind Schieberegler; daraus folgen Höhenlinien,
 * Hauptachsen und die Klassifikation des kritischen Punktes x* = 0
 * (Minimum / Maximum / Sattel / halbdefinit).
 *
 * Grundlage ist die auskommentierte Folie „Hesse-Matrix: Intuition"
 * (11-ableitungen-II.Rmd Z. 436-442) mit f(x) = x1^2 + 4 x2^2: elliptische
 * Konturen, Hauptachsen = Eigenvektoren, Krümmung = Eigenwerte. Dieses
 * Beispiel liegt als Voreinstellung auf dem ersten Knopf (lambda = (2, 8),
 * phi = 0, denn 1/2 x^T diag(2,8) x = x1^2 + 4 x2^2).
 *
 * Die drei Tafeln zeigen dasselbe f und sind verlinkt (Muster 3, verbundene
 * Darstellungen): links die Höhenlinien mit den Hauptachsen (die tot lesbare
 * Hauptdarstellung, alle Zahlen stehen im Verdikt darunter), in der Mitte
 * dieselbe Funktion als Fläche über der Ebene (`Surface3D`, D7) mit denselben
 * Höhenlinien auf dem Boden, denselben orangen Hauptachsen und demselben
 * violetten kritischen Punkt, rechts die beiden Parabeln der Hauptachsen-
 * schnitte. Die 3D-Tafel behauptet keine eigenen Zahlen.
 *
 * Vier Voreinstellungen = die vier Zweige von Satz 11.3.9 samt Grenzfall,
 * mit didaktischem Namen und der Gestalt der Fläche: Minimum (Schale),
 * Sattel, Maximum (Kuppel), Rinne (halbdefinit).
 *
 * Der Höhenlinien-Code (Marching Squares, Achsenraster aus niceTicks) folgt
 * dem Muster von 10-ableitungen-1/widgets/S102Gradient.tsx; alle Texte,
 * Farbrollen und die gesamte Auswertung sind für diesen Abschnitt neu.
 *
 * Farbcode Kapitel 11: Funktionswerte/Höhenlinien blau, Ableitungsobjekte
 * (Hesse-Einträge, Eigenwerte, Hauptachsenpfeile) orange. Grün (Ableitungs-
 * term) und Rot (Restterm) sind in diesem Kapitel belegt, der kritische Punkt
 * und die daran hängende Klassifikation bekommen deshalb Violett, die in
 * Kapitel 11 freie Palettenfarbe (Muster: S61EllipseWidget in Kapitel 6).
 *
 * Per node nachgerechnet (Skript-Prüfskript check-math-s113.mjs):
 * H(2, 8, 0) = diag(2, 8) mit Spur 10 und Determinante 16;
 * H(3, -1, 30°) = (2 1,7321; 1,7321 0) mit Spur 2, det −3, Eigenwerten 3/−1;
 * H(−2, −5, 60°) = (−4,25 1,299; 1,299 −2,75) mit Spur −7, det 10;
 * f(t v_i) = 1/2 lambda_i t^2 auf acht Stellen (t = 1,7: 4,335 bzw. −1,445);
 * Halbachsen der Niveaumenge f = 4 im Folienbeispiel: 2 und 1.
 *
 * Die vier Voreinstellungen zusätzlich geprüft mit
 * scratchpad/check-s113-presets.mjs (2026-08-19): die Eigenwerte werden aus H
 * zurückgerechnet und treffen die Reglerwerte auf 1e−12, die Klassifikation
 * stimmt in allen vier Fällen, Spur = λ₁ + λ₂ und det = λ₁·λ₂ ebenfalls
 * (10/16, 2/−3, −7/10, 3/0). Wertebereich auf dem gezeigten Fenster
 * [−2,4; 2,4]²: 0 bis 28,8 (Schale), −4,32 bis 15,74 (Sattel), −27,64 bis 0
 * (Kuppel), 0 bis 14,19 (Rinne) — das ist der Höhenbereich der 3D-Tafel.
 * Die Projektion der 3D-Tafel selbst ist in
 * scratchpad/check-surface3d.mjs (2026-08-19) geprüft.
 */

const BLAU = FMM_COLORS.blau; // Funktion, Höhenlinien, Fläche
const VIOLETT = FMM_COLORS.violett; // kritischer Punkt x* und seine Klassifikation
const ORANGE = FMM_COLORS.orange; // Hesse-Objekte: Eigenwerte, Hauptachsen

/* ----------------------------------------------------------- Höhenlinien */

/**
 * Marching Squares: ein SVG-Pfad je Niveau, zusammengesetzt aus kurzen
 * Teilstrecken. Das Wertegitter entsteht einmal und trägt alle Niveaus.
 */
function konturPfade(
  f: (x1: number, x2: number) => number,
  niveaus: number[],
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  px: (x: number) => number,
  py: (y: number) => number,
  n = 80,
): string[] {
  const gitter: number[][] = [];
  for (let i = 0; i <= n; i++) {
    const zeile: number[] = [];
    for (let j = 0; j <= n; j++) {
      zeile.push(f(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * j) / n));
    }
    gitter.push(zeile);
  }
  const wx = (i: number) => x0 + ((x1 - x0) * i) / n;
  const wy = (j: number) => y0 + ((y1 - y0) * j) / n;

  return niveaus.map((niveau) => {
    let d = "";
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const v = [gitter[i][j], gitter[i + 1][j], gitter[i + 1][j + 1], gitter[i][j + 1]];
        const ex = [wx(i), wx(i + 1), wx(i + 1), wx(i)];
        const ey = [wy(j), wy(j), wy(j + 1), wy(j + 1)];
        const treffer: [number, number][] = [];
        for (let k = 0; k < 4; k++) {
          const l = (k + 1) % 4;
          const a = v[k] - niveau;
          const b = v[l] - niveau;
          if ((a < 0 && b >= 0) || (a >= 0 && b < 0)) {
            const t = a / (a - b);
            treffer.push([ex[k] + t * (ex[l] - ex[k]), ey[k] + t * (ey[l] - ey[k])]);
          }
        }
        const strecke = (p: [number, number], q: [number, number]) =>
          `M${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}L${px(q[0]).toFixed(1)},${py(q[1]).toFixed(1)}`;
        if (treffer.length === 2) d += strecke(treffer[0], treffer[1]);
        else if (treffer.length === 4) {
          d += strecke(treffer[0], treffer[1]) + strecke(treffer[2], treffer[3]);
        }
      }
    }
    return d;
  });
}

/* ------------------------------------------------------------- Geometrie */

const HALB = 2.4;
const SIZE = 300;
const PAD_L = 30;
const PAD_B = 16;
const PAD_R = 10;

/** H = R(phi) diag(l1, l2) R(phi)^T, symmetrisch nach Konstruktion. */
function hesse(l1: number, l2: number, phi: number): [[number, number], [number, number]] {
  const c = Math.cos(phi);
  const s = Math.sin(phi);
  return [
    [l1 * c * c + l2 * s * s, (l1 - l2) * c * s],
    [(l1 - l2) * c * s, l1 * s * s + l2 * c * c],
  ];
}

/**
 * Die vier Fälle als Knöpfe: jeder Knopf ist ein Zweig der Fallunterscheidung
 * aus Satz 11.3.9, das Label nennt den Fall und die Gestalt der Fläche.
 * Zahlen (Spur, Determinante, Eigenwerte) stehen nur im Verdikt.
 */
const VOREINSTELLUNGEN: { name: string; titel: string; l1: number; l2: number; grad: number }[] = [
  { name: "Minimum (Schale)", titel: "Folienbeispiel f(x) = x₁² + 4x₂²", l1: 2, l2: 8, grad: 0 },
  { name: "Sattel", titel: "ein Eigenwert positiv, einer negativ", l1: 3, l2: -1, grad: 30 },
  { name: "Maximum (Kuppel)", titel: "beide Eigenwerte negativ", l1: -2, l2: -5, grad: 60 },
  { name: "Rinne (halbdefinit)", titel: "ein Eigenwert genau null", l1: 3, l2: 0, grad: 20 },
];

/** Gestalt der Fläche je Klassifikation, für Legende und aria-label. */
const GESTALT: Record<string, string> = {
  minimum: "eine nach oben offene Schale",
  maximum: "eine Kuppel",
  sattel: "eine Sattelfläche",
  halb: "eine Rinne mit waagerechtem Boden",
  null: "eine waagerechte Ebene",
};

export function HesseDefinitheit() {
  const [l1, setL1] = useState(2);
  const [l2, setL2] = useState(8);
  const [grad, setGrad] = useState(0);

  const phi = (grad * Math.PI) / 180;
  const H = hesse(l1, l2, phi);
  const spur = H[0][0] + H[1][1];
  const det = H[0][0] * H[1][1] - H[0][1] * H[1][0];
  const v1: [number, number] = [Math.cos(phi), Math.sin(phi)];
  const v2: [number, number] = [-Math.sin(phi), Math.cos(phi)];

  const h11 = H[0][0];
  const h12 = H[0][1];
  const h22 = H[1][1];
  const f = useMemo(
    () => (x1: number, x2: number) =>
      0.5 * (h11 * x1 * x1 + 2 * h12 * x1 * x2 + h22 * x2 * x2),
    [h11, h12, h22],
  );

  // Niveaus als Bruchteile des größten Betrags im Fenster; bei indefinitem H
  // kommt das Niveau 0 dazu, das dort aus zwei sich kreuzenden Geraden besteht.
  const { niveausPos, niveausNeg, nullNiveau, vmax } = useMemo(() => {
    let m = 0;
    for (let i = 0; i <= 40; i++) {
      for (let j = 0; j <= 40; j++) {
        m = Math.max(m, Math.abs(f(-HALB + (i * HALB) / 20, -HALB + (j * HALB) / 20)));
      }
    }
    const anteile = [0.03, 0.08, 0.15, 0.25, 0.38, 0.53, 0.7, 0.9];
    const pos: number[] = [];
    const neg: number[] = [];
    if (m > 1e-9) {
      for (const a of anteile) {
        if (Math.max(l1, l2) > 1e-9) pos.push(a * m);
        if (Math.min(l1, l2) < -1e-9) neg.push(-a * m);
      }
    }
    return {
      niveausPos: pos,
      niveausNeg: neg,
      nullNiveau: l1 * l2 < -1e-9,
      vmax: m,
    };
  }, [f, l1, l2]);

  // Wertebereich auf dem Fenster; er legt den Höhenbereich der 3D-Tafel und
  // damit die Höhe des Bodens fest, auf dem Höhenlinien und Pfeile liegen.
  const [zLo, zHi] = useMemo((): [number, number] => {
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i <= 40; i++) {
      for (let j = 0; j <= 40; j++) {
        const w = f(-HALB + (i * HALB) / 20, -HALB + (j * HALB) / 20);
        lo = Math.min(lo, w);
        hi = Math.max(hi, w);
      }
    }
    return hi - lo < 1e-9 ? [-1, 1] : [lo, hi];
  }, [f]);

  const px = (x: number) => PAD_L + ((x + HALB) / (2 * HALB)) * SIZE;
  const py = (y: number) => SIZE - ((y + HALB) / (2 * HALB)) * SIZE;

  const pfadePos = useMemo(
    () => konturPfade(f, niveausPos, -HALB, HALB, -HALB, HALB, px, py),
    [f, niveausPos],
  );
  const pfadeNeg = useMemo(
    () => konturPfade(f, niveausNeg, -HALB, HALB, -HALB, HALB, px, py),
    [f, niveausNeg],
  );
  const pfadNull = useMemo(
    () => (nullNiveau ? konturPfade(f, [0], -HALB, HALB, -HALB, HALB, px, py)[0] : ""),
    [f, nullNiveau],
  );

  // Schnitte entlang der Hauptachsen: f(t v_i) = 1/2 lambda_i t^2
  const schnitt1 = (t: number) => 0.5 * l1 * t * t;
  const schnitt2 = (t: number) => 0.5 * l2 * t * t;
  const yGrenze = Math.max(1, 0.5 * Math.max(Math.abs(l1), Math.abs(l2)) * 4);
  const serien: Series[] = [
    { f: schnitt1, color: BLAU },
    { f: schnitt2, color: BLAU, dash: [6, 4] },
  ];

  const eps = 1e-9;
  const artDesPunktes =
    l1 > eps && l2 > eps
      ? "minimum"
      : l1 < -eps && l2 < -eps
        ? "maximum"
        : l1 * l2 < -eps
          ? "sattel"
          : Math.abs(l1) < eps && Math.abs(l2) < eps
            ? "null"
            : "halb";

  // Im Sattelfall darf der Text nicht behaupten, v₁ sei die Aufwärtsrichtung:
  // der Regler λ₁ kann auch der negative der beiden sein.
  const aufAchse = l1 > 0 ? "v₁" : "v₂";
  const aufLambda = l1 > 0 ? l1 : l2;
  const abAchse = l1 > 0 ? "v₂" : "v₁";
  const abLambda = l1 > 0 ? l2 : l1;

  const klassifikation: Record<string, { titel: string; farbe: string; text: string }> = {
    minimum: {
      titel: "positiv definit",
      farbe: VIOLETT,
      text: `Beide Regler stehen über null. Damit ist die quadratische Form hᵀH h für jedes h ≠ 0 positiv, und Satz 11.3.9(1) macht x* = 0 zu einem strikten lokalen Minimum. Wie steil es vom Nullpunkt weg bergauf geht, hängt an der Richtung: am flachsten mit Krümmung ${fmt(Math.min(l1, l2))}, am steilsten mit ${fmt(Math.max(l1, l2))}.`,
    },
    maximum: {
      titel: "negativ definit",
      farbe: VIOLETT,
      text: `Beide Regler stehen unter null, also ist hᵀH h für jedes h ≠ 0 negativ, und Satz 11.3.9(2) liefert ein striktes lokales Maximum. Am Bild der Höhenlinien ändert das nichts; was sich umkehrt, sind die Zahlen an ihnen, denn nach außen hin wird f kleiner statt größer.`,
    },
    sattel: {
      titel: "indefinit",
      farbe: VIOLETT,
      text: `Die beiden Regler tragen verschiedene Vorzeichen, H ist also indefinit, und Satz 11.3.9(3) meldet einen Sattelpunkt. Das rechte Schaubild zeigt, was das bedeutet: Entlang ${aufAchse} geht es mit Krümmung ${fmt(aufLambda)} bergauf, entlang ${abAchse} mit ${fmt(abLambda)} bergab, in jeder Umgebung von x* = 0 liegen also Werte über und unter f(0) = 0. Das dick gezeichnete Niveau 0 zerfällt dabei in zwei sich kreuzende Geraden.`,
    },
    halb: {
      titel: "semidefinit, nicht definit",
      farbe: VIOLETT,
      text: `Ein Regler steht auf null, damit ist det H = λ₁·λ₂ = 0 und H singulär. Entlang der zugehörigen Hauptachse bleibt f konstant bei 0, die Höhenlinien werden zu Parallelen, und statt eines isolierten kritischen Punktes liegt eine ganze Gerade davon vor. Für unser rein quadratisches f ist der Nullpunkt deshalb weiterhin ein ${Math.max(l1, l2) > eps ? "Minimum" : "Maximum"}, nur eben kein striktes. Bei allgemeinen Funktionen ist in diesem Grenzfall gar nichts mehr entschieden, wie Bemerkung 11.3.10 an x⁴, −x⁴ und x³ vorführt.`,
    },
    null: {
      titel: "H = 0",
      farbe: VIOLETT,
      text: "Beide Regler stehen auf null, H ist die Nullmatrix und f ≡ 0. Höhenlinien gibt es dann keine zu zeichnen, und kritisch ist nicht nur der Nullpunkt, sondern jede Stelle der Ebene.",
    },
  };
  const status = klassifikation[artDesPunktes];

  /* --------------------------------------------- verlinkte 3D-Tafel (D7) */
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 26 });
  const flaeche = useMemo(() => ({ f, nx: 28, ny: 28, color: BLAU, opacity: 0.85, wire: true }), [f]);
  const punkte3d = useMemo(
    () => [{ p: [0, 0, 0] as Vec3, color: VIOLETT, r: 4, label: "x*", onTop: true }],
    [],
  );
  // Dieselben Hauptachsen wie links, auf den Boden der Tafel gelegt. `onTop`,
  // weil eine Fläche über dem ganzen Fenster den Boden sonst vollständig
  // verdeckt (die Schale liegt mit ihrem Tiefpunkt selbst auf dem Boden).
  const pfeile3d = useMemo(
    () => [
      { from: [0, 0, zLo] as Vec3, to: [1.7 * Math.cos(phi), 1.7 * Math.sin(phi), zLo] as Vec3, color: ORANGE, label: "v₁", onTop: true },
      { from: [0, 0, zLo] as Vec3, to: [-1.7 * Math.sin(phi), 1.7 * Math.cos(phi), zLo] as Vec3, color: ORANGE, label: "v₂", onTop: true },
    ],
    [phi, zLo],
  );
  // Dieselben Niveaus wie in der Höhenlinientafel links.
  const kontur3d = useMemo(
    () => [...niveausNeg, ...(nullNiveau ? [0] : []), ...niveausPos],
    [niveausNeg, nullNiveau, niveausPos],
  );

  const gleicheEw = Math.abs(l1 - l2) < 1e-9 && Math.abs(l1) > eps;

  return (
    <div className="space-y-3">
      <p className="max-w-prose text-sm">
        Wir bauen die Hesse-Matrix aus ihren Eigenwerten: H = R(φ)·diag(λ₁, λ₂)·R(φ)ᵀ mit der
        Drehung R(φ), und dazu die quadratische Funktion f(x) = ½·xᵀH x. Ihr kritischer Punkt
        ist x* = 0 (violett), und ihre eigene Hesse-Matrix ist überall H, die Krümmung also an
        jeder Stelle dieselbe. Die Regler stellen die beiden Eigenwerte und die Lage der
        Eigenbasis ein; blau sind die Höhenlinien von f, orange die Hauptachsen v₁ und v₂.
      </p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {VOREINSTELLUNGEN.map((v) => {
          const aktiv = l1 === v.l1 && l2 === v.l2 && grad === v.grad;
          return (
            <button
              key={v.name}
              type="button"
              title={v.titel}
              aria-pressed={aktiv}
              className={
                aktiv
                  ? "rounded border border-sky-600 bg-sky-50 px-3 py-1 font-medium text-sky-900 dark:border-sky-400 dark:bg-sky-900/40 dark:text-sky-100"
                  : "rounded border border-slate-300 px-3 py-1 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
              }
              onClick={() => {
                setL1(v.l1);
                setL2(v.l2);
                setGrad(v.grad);
              }}
            >
              {v.name}
            </button>
          );
        })}
      </div>
      <Slider
        label="λ₁ (Achse v₁)"
        value={l1}
        onChange={(v) => setL1(Math.round(v * 2) / 2)}
        min={-8}
        max={8}
        step={0.5}
        fmt={(v) => fmt(v, 1)}
      />
      <Slider
        label="λ₂ (Achse v₂)"
        value={l2}
        onChange={(v) => setL2(Math.round(v * 2) / 2)}
        min={-8}
        max={8}
        step={0.5}
        fmt={(v) => fmt(v, 1)}
      />
      <Slider
        label="φ (Eigenbasis)"
        value={grad}
        onChange={(v) => setGrad(Math.round(v / 5) * 5)}
        min={0}
        max={175}
        step={5}
        fmt={(v) => `${fmt(v, 0)}°`}
      />
      <div className="flex flex-wrap gap-4">
        <div className="inline-block shrink-0 select-none text-[10px] text-slate-500 dark:text-slate-400">
          <div className="mb-0.5 text-[11px]" style={{ paddingLeft: PAD_L }}>
            x₂ ↑
          </div>
          <svg
            viewBox={`0 0 ${PAD_L + SIZE + PAD_R} ${SIZE + PAD_B}`}
            width={PAD_L + SIZE + PAD_R}
            height={SIZE + PAD_B}
            className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
          >
            <defs>
              <clipPath id="s113-clip">
                <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
              </clipPath>
              <marker id="s113-pfeil" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 z" fill={ORANGE} />
              </marker>
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
                  {fmt(t, 0)}
                </text>
                <line
                  y1={0}
                  y2={SIZE}
                  x1={px(t)}
                  x2={px(t)}
                  stroke="#e2e8f0"
                  strokeWidth={t === 0 ? 1.2 : 0.6}
                />
                <text x={px(t)} y={SIZE + 12} textAnchor="middle" fill="#64748b" fontSize={10}>
                  {fmt(t, 0)}
                </text>
              </g>
            ))}
            <g clipPath="url(#s113-clip)">
              {pfadePos.map((d, i) => (
                <path key={`p${i}`} d={d} stroke={BLAU} strokeWidth={1} opacity={0.45} fill="none" />
              ))}
              {pfadeNeg.map((d, i) => (
                <path
                  key={`n${i}`}
                  d={d}
                  stroke={BLAU}
                  strokeWidth={1}
                  opacity={0.45}
                  strokeDasharray="4 3"
                  fill="none"
                />
              ))}
              {pfadNull && <path d={pfadNull} stroke={BLAU} strokeWidth={2.2} fill="none" />}
              {[
                { v: v1, name: "v₁" },
                { v: v2, name: "v₂" },
              ].map(({ v, name }) => (
                <g key={name}>
                  <line
                    x1={px(0)}
                    y1={py(0)}
                    x2={px(1.7 * v[0])}
                    y2={py(1.7 * v[1])}
                    stroke={ORANGE}
                    strokeWidth={2.2}
                    markerEnd="url(#s113-pfeil)"
                  />
                  <text
                    x={px(1.85 * v[0])}
                    y={py(1.85 * v[1]) + 4}
                    textAnchor="middle"
                    fill={ORANGE}
                    fontSize={12}
                    stroke="#ffffff"
                    strokeWidth={2.5}
                    paintOrder="stroke"
                  >
                    {name}
                  </text>
                </g>
              ))}
              <circle cx={px(0)} cy={py(0)} r={6} fill="none" stroke={VIOLETT} strokeWidth={2} />
              <circle cx={px(0)} cy={py(0)} r={2.5} fill={VIOLETT} />
            </g>
          </svg>
          <div className="text-center text-[11px]" style={{ paddingLeft: PAD_L }}>
            x₁ →
          </div>
        </div>
        <div className="shrink-0">
          <Surface3D
            size={280}
            xDomain={[-HALB, HALB]}
            yDomain={[-HALB, HALB]}
            zDomain={[zLo, zHi]}
            surface={flaeche}
            contours={kontur3d}
            contourColor={BLAU}
            points={punkte3d}
            arrows={pfeile3d}
            dropLines
            labels={{ x: "x₁", y: "x₂", z: "f" }}
            azimuth={sicht.azimuth}
            elevation={sicht.elevation}
            onViewChange={setSicht}
            ariaLabel={`Die Funktion f als Fläche über der x₁-x₂-Ebene; im aktuellen Zustand ${GESTALT[artDesPunktes]}.`}
          />
          <div className="mt-1 max-w-[280px]">
            <ViewControls value={sicht} onChange={setSicht} />
          </div>
          <p className="mt-1 max-w-[280px] text-xs text-slate-600 dark:text-slate-300">
            Dieselbe Funktion als Fläche: {GESTALT[artDesPunktes]}. Auf dem Boden liegen die
            Höhenlinien der linken Tafel, die orangen Pfeile sind dieselben Hauptachsen, der
            violette Punkt ist derselbe kritische Punkt. Ziehen dreht die Ansicht.
          </p>
        </div>
        <div>
          <LabeledPlot
            xLabel="t"
            yLabel="f(t·vᵢ)"
            series={serien}
            xDomain={[-2, 2]}
            yDomain={[-yGrenze, yGrenze]}
            width={300}
            height={300}
          />
          <p className="mt-1 max-w-[330px] text-xs text-slate-600 dark:text-slate-300">
            Die Funktion entlang der beiden Hauptachsen: durchgezogen f(t·v₁) = ½λ₁t²,
            gestrichelt f(t·v₂) = ½λ₂t². Beide Kurven sind Parabeln, und ihre zweite Ableitung
            ist genau der zugehörige Eigenwert. Wo eine der beiden nach unten öffnet, kann im
            Nullpunkt kein Minimum liegen.
          </p>
        </div>
      </div>
      <div className="max-w-prose space-y-1 rounded border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/50">
        <p>
          <span className="font-mono" style={{ color: ORANGE }}>
            H = ({fmt(H[0][0])} {fmt(H[0][1])}; {fmt(H[1][0])} {fmt(H[1][1])})
          </span>
          , Spur <span className="font-mono">{fmt(spur)}</span> = λ₁ + λ₂, Determinante{" "}
          <span className="font-mono">{fmt(det)}</span> = λ₁·λ₂
        </p>
        <p>
          Eigenwerte{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            λ₁ = {fmt(l1, 1)}, λ₂ = {fmt(l2, 1)}
          </span>
          , Hauptachsen{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            v₁ = ({fmt(v1[0])}; {fmt(v1[1])}), v₂ = ({fmt(v2[0])}; {fmt(v2[1])})
          </span>
        </p>
        <p>
          <span className="font-semibold" style={{ color: status.farbe }}>
            {status.titel}.
          </span>{" "}
          {status.text}
        </p>
        {gleicheEw && (
          <p>
            Beide Eigenwerte sind gleich, H ist ein Vielfaches der Einheitsmatrix. Dann ist jede
            Richtung Eigenrichtung, die Höhenlinien sind Kreise, und der Regler φ ändert nichts
            an f.
          </p>
        )}
        {vmax > 1e-9 && (
          <p>
            Größter Betrag im gezeigten Ausschnitt: <span className="font-mono">{fmt(vmax)}</span>
            ; die dünnen Höhenlinien liegen bei festen Bruchteilen davon, gestrichelt die
            negativen Niveaus.
          </p>
        )}
      </div>
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-300">
        Drei Beobachtungen lohnen sich. Erstens läuft die längere Halbachse jeder Ellipse
        entlang des <em>kleineren</em> Eigenwertes: Beim Folienbeispiel λ = (2, 8) ist das
        Niveau f = 4 die Ellipse mit den Halbachsen 2 und 1, das Verhältnis ist √(λ₂/λ₁) = 2.
        Zweitens drehen sich mit φ die Höhenlinien und die Pfeile gemeinsam, während Spur und
        Determinante unverändert bleiben; die Eigenwerte hängen nicht davon ab, wie wir das
        Koordinatensystem legen. Drittens gehören die dicht liegenden Höhenlinien zur steilen
        Achse: Je größer der Eigenwert, desto schneller wächst f in dieser Richtung.
      </p>
    </div>
  );
}
