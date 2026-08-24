import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  MatrixInput,
  Slider,
  TransformCanvas,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  fmtDe,
} from "../../../lib";

/**
 * DIE EINE EINSICHT: Ist A singulär, so hat das Kleinste-Quadrate-Problem eine
 * ganze Gerade von Lösungen. Alle liefern dasselbe Bild Ax und denselben
 * Residuenbetrag; A⁺b ist unter ihnen die eine mit der kleinsten Norm
 * (Satz 6.3.8, Bemerkung 6.3.12).
 *
 * FARBROLLEN (Kapitel 6): grün = Spaltenraum col(A) und alles, was in ihm
 * liegt (die Gerade, das Bild Ax); blau = die V-Seite, also der Kern als
 * Gerade im Urbildraum und die Minimalnorm-Lösung A⁺b; rot = Residuum;
 * violett = das gezogene b; grau = die laufende KQ-Lösung x und
 * Nebenangaben. Orange bleibt in diesem Kapitel den Singulärwerten
 * vorbehalten und kommt hier nicht vor.
 *
 * PROVENIENZ: eigener Aufbau auf TransformCanvas v2; der 2×2-Eigenlöser für
 * AᵀA ist derselbe wie in S62Geometrie.tsx (dort aus der privaten mml-ch4-App
 * portiert), die Pseudoinverse entsteht daraus über die reduzierte SVD
 * A⁺ = Σ_{σ_i > 0} v_i u_iᵀ / σ_i, also über Definition 6.3.5. Texte neu.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen,
 * 2026-08-19), Voreinstellung A = (1 1; 1 1), b = (1; 5):
 *   σ = 2 und 0, Rang 1; A⁺ = ¼(1 1; 1 1); A⁺b = (1,5; 1,5) mit ‖A⁺b‖ = 2,1213;
 *   Ax̂ = (3; 3) = proj_col(A) b (Abweichung < 1e−12); Residuum (−2; 2) mit
 *   ‖r‖ = 2,8284; ⟨A⁺b, v₂⟩ = 0; entlang der Lösungsgeraden ändert sich ‖r‖
 *   über t ∈ [−3, 3] um höchstens 4,4e−16, während ‖x(t)‖ genau bei t = 0
 *   minimal wird (‖x(1)‖ = 2,3452).
 * Presets: (1 2; 2 4) mit b = (1; 5): A⁺b = (0,44; 0,88), ‖A⁺b‖ = 0,9839,
 *   ‖r‖ = 1,3416; (2 1; 0 1): Rang 2, A⁺ = A⁻¹ = (0,5 −0,5; 0 1),
 *   x̂ = (−2; 5), Residuum 0.
 */

const GRUEN = FMM_COLORS.gruen;
const BLAU = FMM_COLORS.blau;
const ROT = FMM_COLORS.rot;
const VIOLETT = FMM_COLORS.violett;
const GRAU = FMM_COLORS.grau;

type Mat2 = [[number, number], [number, number]];

const fmt = (v: number, stellen = 3) => fmtDe(v, stellen);
const vecStr = (v: number[], stellen = 2) => `(${fmt(v[0], stellen)}; ${fmt(v[1], stellen)})`;

interface Zerlegung {
  v1: [number, number];
  v2: [number, number];
  u1: [number, number];
  u2: [number, number];
  s1: number;
  s2: number;
}

/** SVD einer 2×2-Matrix über die Eigenzerlegung von AᵀA (wie in S62Geometrie). */
function svd2x2(A: Mat2): Zerlegung {
  const [[a, b], [c, d]] = A;
  const E = a * a + c * c;
  const F = a * b + c * d;
  const G = b * b + d * d;
  const theta = 0.5 * Math.atan2(2 * F, E - G);
  const mitte = (E + G) / 2;
  const h = Math.hypot((E - G) / 2, F);
  const s1 = Math.sqrt(Math.max(mitte + h, 0));
  const s2 = Math.sqrt(Math.max(mitte - h, 0));
  const v1: [number, number] = [Math.cos(theta), Math.sin(theta)];
  const v2: [number, number] = [-Math.sin(theta), Math.cos(theta)];
  const mul = (v: [number, number]): [number, number] => [
    a * v[0] + b * v[1],
    c * v[0] + d * v[1],
  ];
  const i1 = mul(v1);
  const i2 = mul(v2);
  const u1: [number, number] = s1 > 1e-9 ? [i1[0] / s1, i1[1] / s1] : [1, 0];
  const u2: [number, number] = s2 > 1e-9 ? [i2[0] / s2, i2[1] / s2] : [-u1[1], u1[0]];
  return { v1, v2, u1, u2, s1, s2 };
}

/** A⁺ = Σ_{σ_i > 0} v_i u_iᵀ / σ_i, also Definition 6.3.5 für den 2×2-Fall. */
function pseudoinverse(z: Zerlegung): Mat2 {
  const P: Mat2 = [
    [0, 0],
    [0, 0],
  ];
  const addiere = (v: [number, number], u: [number, number], s: number) => {
    if (s <= 1e-9) return;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) P[i][j] += (v[i] * u[j]) / s;
  };
  addiere(z.v1, z.u1, z.s1);
  addiere(z.v2, z.u2, z.s2);
  return P;
}

const mv = (A: Mat2, x: [number, number]): [number, number] => [
  A[0][0] * x[0] + A[0][1] * x[1],
  A[1][0] * x[0] + A[1][1] * x[1],
];

/**
 * Größtes |t|, für das p + t·d noch im Fenster [−h, h]² liegt (Schlitzverfahren).
 * Nötig, weil die Overlay-Ebene von TransformCanvas nicht beschnitten wird.
 */
function fensterRadius(p: [number, number], d: [number, number], h: number): number {
  let t = Infinity;
  for (const k of [0, 1]) {
    if (Math.abs(d[k]) < 1e-9) {
      if (Math.abs(p[k]) > h) return 0;
      continue;
    }
    t = Math.min(t, Math.max((h - p[k]) / d[k], (-h - p[k]) / d[k]));
  }
  return Number.isFinite(t) ? Math.max(0, t) : 0;
}

const PRESETS: { id: string; name: string; A: number[][]; b: [number, number] }[] = [
  { id: "rang1", name: "Rang 1 (Beispiel 6.3.4)", A: [[1, 1], [1, 1]], b: [1, 5] },
  { id: "rang1b", name: "andere Rang-1-Matrix", A: [[1, 2], [2, 4]], b: [1, 5] },
  { id: "exakt", name: "b liegt in col(A)", A: [[1, 1], [1, 1]], b: [3, 3] },
  { id: "regulaer", name: "regulär", A: [[2, 1], [0, 1]], b: [1, 5] },
];

export function PseudoinverseExplorer() {
  const [Aroh, setAroh] = useState<number[][]>(PRESETS[0].A);
  const [b, setB] = useState<[number, number]>(PRESETS[0].b);
  const [t, setT] = useState(0);
  const [preset, setPreset] = useState("rang1");

  const A: Mat2 = [
    [Aroh[0][0] || 0, Aroh[0][1] || 0],
    [Aroh[1][0] || 0, Aroh[1][1] || 0],
  ];
  const z = svd2x2(A);
  const rang = (z.s1 > 1e-9 ? 1 : 0) + (z.s2 > 1e-9 ? 1 : 0);
  const Aplus = pseudoinverse(z);
  const xDach = mv(Aplus, b);
  // Kernrichtung: bei Rang 1 ist v₂ eine Basis des Kerns (Satz 6.2.11)
  const kern: [number, number] = z.s2 > 1e-9 ? [0, 0] : z.v2;
  const x: [number, number] =
    rang === 1 ? [xDach[0] + t * kern[0], xDach[1] + t * kern[1]] : xDach;
  const Ax = mv(A, x);
  const residuum: [number, number] = [b[0] - Ax[0], b[1] - Ax[1]];
  const rNorm = Math.hypot(...residuum);
  const xNorm = Math.hypot(...x);
  const xDachNorm = Math.hypot(...xDach);

  const halb = Math.max(3, 1.2 * Math.max(Math.abs(b[0]), Math.abs(b[1]), xDachNorm + 1.5));

  const setzePreset = (p: (typeof PRESETS)[number]) => {
    setPreset(p.id);
    setAroh(p.A);
    setB(p.b);
    setT(0);
  };

  /** Urbildraum: Lösungsgerade, Normkreis um den Ursprung, beide Punkte. */
  const overlayLinks = (toPx: (x: number, y: number) => [number, number]) => {
    const teile: React.ReactNode[] = [];
    if (rang === 1) {
      const tMax = fensterRadius(xDach, kern, halb);
      const tMin = -fensterRadius(xDach, [-kern[0], -kern[1]], halb);
      const [x1, y1] = toPx(xDach[0] + tMin * kern[0], xDach[1] + tMin * kern[1]);
      const [x2, y2] = toPx(xDach[0] + tMax * kern[0], xDach[1] + tMax * kern[1]);
      const [cx, cy] = toPx(0, 0);
      const [rx] = toPx(xDachNorm, 0);
      teile.push(
        <circle
          key="norm"
          cx={cx}
          cy={cy}
          r={Math.abs(rx - cx)}
          fill="none"
          stroke={GRAU}
          strokeWidth={1}
          strokeDasharray="3 3"
        />,
        <line
          key="loes"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={GRAU}
          strokeWidth={2}
          strokeDasharray="7 4"
        />
      );
    }
    const [px, py] = toPx(xDach[0], xDach[1]);
    teile.push(
      <g key="xdach">
        <circle cx={px} cy={py} r={5} fill={BLAU} />
        <text x={px + 8} y={py - 6} fontSize={11} fill={BLAU}>
          A⁺b
        </text>
      </g>
    );
    return <>{teile}</>;
  };

  /** Bildraum: b, seine Projektion Ax und das Residuum dazwischen. */
  const overlayRechts = (toPx: (x: number, y: number) => [number, number]) => {
    const [bx, by] = toPx(b[0], b[1]);
    const [ax, ay] = toPx(Ax[0], Ax[1]);
    return (
      <>
        <line x1={ax} y1={ay} x2={bx} y2={by} stroke={ROT} strokeWidth={2} strokeDasharray="5 4" />
        <circle cx={ax} cy={ay} r={5} fill={GRUEN} />
        <text x={ax + 8} y={ay + 14} fontSize={11} fill={GRUEN}>
          Ax
        </text>
        {rNorm > 1e-9 ? (
          <text x={(ax + bx) / 2 + 8} y={(ay + by) / 2} fontSize={11} fill={ROT}>
            r
          </text>
        ) : null}
      </>
    );
  };

  return (
    <div className="text-sm">
      <Aufgabe>
        Ziehen wir <M>{"\\bb"}</M> in der rechten Tafel und schieben wir <M>{"\\bx"}</M> danach
        auf der gestrichelten Lösungsgeraden entlang.
      </Aufgabe>

      <div className="my-2 flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={preset === p.id ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={preset === p.id}
            onClick={() => setzePreset(p)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="my-3 grid gap-4 sm:grid-cols-2">
        <figure className="m-0">
          <TransformCanvas
            matrix={[
              [1, 0],
              [0, 1],
            ]}
            showGrid
            showUnitCircle={false}
            size={230}
            worldHalf={halb}
            readout={false}
            transitionMs={250}
            xLabel="x₁"
            yLabel="x₂"
            lines={
              rang === 1
                ? [{ dir: kern, color: BLAU, label: "Kern" }]
                : []
            }
            vectors={
              rang === 1
                ? [{ v: x, color: GRAU, label: "x", draggable: true }]
                : [{ v: xDach, color: GRAU, label: "x̂" }]
            }
            onVectorChange={(i, p) => {
              if (i !== 0 || rang !== 1) return;
              // gezogen wird frei, gehalten wird die Lösungsgerade: der Punkt
              // wird auf sie projiziert, t ist seine Koordinate darauf.
              const neu = (p[0] - xDach[0]) * kern[0] + (p[1] - xDach[1]) * kern[1];
              setT(Math.max(-6, Math.min(6, neu)));
            }}
            overlay={overlayLinks}
            ariaLabel={
              rang === 1
                ? `Urbildraum: die Lösungsgerade der Kleinste-Quadrate-Aufgabe, darauf die Minimalnorm-Lösung mit Norm ${fmt(xDachNorm)} und die laufende Lösung mit Norm ${fmt(xNorm)}.`
                : `Urbildraum: die eindeutige Lösung der Kleinste-Quadrate-Aufgabe mit Norm ${fmt(xDachNorm)}.`
            }
          />
          <figcaption className={`mt-1 text-xs ${W_MUTED}`}>
            Urbildraum: Lösungsgerade (grau gestrichelt), Kern (blau) und der Kreis um den
            Ursprung durch <span className="font-mono">A⁺b</span>
          </figcaption>
        </figure>

        <figure className="m-0">
          <TransformCanvas
            matrix={A}
            showGrid={false}
            showUnitCircle={false}
            size={230}
            worldHalf={halb}
            readout={false}
            transitionMs={250}
            xLabel="b₁"
            yLabel="b₂"
            lines={
              rang === 1
                ? [{ dir: z.u1, color: GRUEN, label: "col(A)" }]
                : []
            }
            vectors={[{ v: b, color: VIOLETT, label: "b", draggable: true }]}
            onVectorChange={(i, p) => {
              if (i !== 0) return;
              setPreset("frei");
              setB([p[0], p[1]]);
            }}
            overlay={overlayRechts}
            ariaLabel={`Bildraum: der Datenvektor b, sein Bildpunkt Ax auf dem Spaltenraum und das Residuum der Länge ${fmt(rNorm)}.`}
          />
          <figcaption className={`mt-1 text-xs ${W_MUTED}`}>
            Bildraum: <span className="font-mono">b</span> (violett), sein nächster Punkt{" "}
            <span className="font-mono">Ax</span> in <span className="font-mono">col(A)</span>{" "}
            (grün) und das Residuum (rot)
          </figcaption>
        </figure>
      </div>

      <div className="my-2 max-w-md">
        <Slider
          label="b₁"
          value={b[0]}
          onChange={(v) => {
            setPreset("frei");
            setB([v, b[1]]);
          }}
          min={-6}
          max={6}
          step={0.1}
          accent={VIOLETT}
          fmt={(v) => fmt(v, 1)}
        />
        <Slider
          label="b₂"
          value={b[1]}
          onChange={(v) => {
            setPreset("frei");
            setB([b[0], v]);
          }}
          min={-6}
          max={6}
          step={0.1}
          accent={VIOLETT}
          fmt={(v) => fmt(v, 1)}
        />
        <Slider
          label="Position t auf der Lösungsgeraden"
          value={t}
          onChange={setT}
          min={-6}
          max={6}
          step={0.1}
          accent={GRAU}
          disabled={rang !== 1}
          fmt={(v) => fmt(v, 1)}
        />
      </div>

      <div className="my-2 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2">
          <M>{"\\bA ="}</M>
          <MatrixInput
            value={Aroh}
            onChange={(m) => {
              setPreset("frei");
              setAroh(m);
              setT(0);
            }}
          />
        </span>
        <span className="font-mono text-xs" style={{ color: GRAU }}>
          ‖x‖ = {fmt(xNorm)}, ‖A⁺b‖ = {fmt(xDachNorm)}, ‖b − Ax‖ = {fmt(rNorm)}
        </span>
      </div>

      {rang === 0 ? (
        <Verdikt kind="warn" titel="Nullmatrix:">
          Hier ist <M>{"\\bA\\pinv = \\bnull"}</M> und <M>{"\\bA\\pinv\\bb = \\bnull"}</M>. Jedes{" "}
          <M>{"\\bx"}</M> ist Lösung der Kleinste-Quadrate-Aufgabe, denn{" "}
          <M>{"\\bA\\bx = \\bnull"}</M> für alle <M>{"\\bx"}</M>; die kürzeste unter allen ist der
          Nullvektor. Das Residuum bleibt bei {fmt(rNorm)}, also bei <M>{"\\left\\|\\bb\\right\\|"}</M>.
        </Verdikt>
      ) : rang === 2 ? (
        <Verdikt kind="ok" titel="Regulärer Fall:">
          Der Kern ist <M>{"\\{\\bnull\\}"}</M>, die Lösungsmenge schrumpft auf einen einzigen
          Punkt, und <M>{"\\bA\\pinv = \\bA^{-1}"}</M> (Korollar 6.3.9). Das Residuum ist{" "}
          {fmt(rNorm)}: <M>{"\\bb"}</M> liegt in <M>{"\\col(\\bA)"}</M>, denn der Spaltenraum ist
          hier der ganze <M>{"\\R^2"}</M>. Von „kleinster Norm unter den Lösungen" bleibt nichts
          zu wählen.
        </Verdikt>
      ) : rNorm < 1e-9 ? (
        <Verdikt kind="ok" titel="Exakt lösbar, trotzdem mehrdeutig:">
          <M>{"\\bb"}</M> liegt auf <M>{"\\col(\\bA)"}</M>, das Residuum ist null. Lösungen gibt
          es dennoch unendlich viele, nämlich die ganze gestrichelte Gerade. Die Pseudoinverse
          greift daraus <M>{"\\bA\\pinv\\bb"}</M> mit der Norm {fmt(xDachNorm)} heraus; das
          gerade eingestellte <M>{"\\bx"}</M> hat die Norm {fmt(xNorm)}.
        </Verdikt>
      ) : (
        <Verdikt kind={Math.abs(t) < 0.05 ? "ok" : "neutral"}>
          <M>{"\\bA"}</M> hat den Rang 1, der Kern ist eine Gerade, und jeder Punkt der
          gestrichelten Geraden löst die Kleinste-Quadrate-Aufgabe gleich gut: Das Bild bleibt{" "}
          <M>{"\\bA\\bx = "}</M>
          {vecStr(Ax)}, das ist nach Satz 6.3.8 der Punkt{" "}
          <M>{"\\proj_{\\col(\\bA)}\\bb"}</M>, und das Residuum bleibt {fmt(rNorm)}, wie weit wir{" "}
          <M>{"\\bx"}</M> auch schieben.{" "}
          {Math.abs(t) < 0.05
            ? `Nur die Norm unterscheidet die Lösungen, und eingestellt ist gerade die kürzeste: ‖A⁺b‖ = ${fmt(xDachNorm)}, der kleinste Wert auf der ganzen Geraden. Die Lösungsgerade berührt den grauen Kreis genau hier, denn A⁺b steht senkrecht auf dem Kern (Bemerkung 6.3.12).`
            : `Nur die Norm unterscheidet die Lösungen: ${fmt(xNorm)} gegen ‖A⁺b‖ = ${fmt(xDachNorm)}, also ${fmt(xNorm - xDachNorm)} mehr. Zurück bei t = 0 steht die kürzeste.`}
        </Verdikt>
      )}
    </div>
  );
}
