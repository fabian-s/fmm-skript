import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  MatrixInput,
  Slider,
  Verdikt,
  clamp,
  fmtDe as fmt,
  useDrag,
} from "../../../lib";
import { W_BUTTON, W_BUTTON_AKTIV, W_MUTED } from "../../../lib/widgets/surface";

/**
 * §10.4, zweiter Teil (Matrix zu Skalar): einen Eintrag von X anstupsen und
 * sehen, wie f(X) reagiert.
 *
 * EINE EINSICHT: Der Eintrag (i,j) der Gradientenmatrix ist genau die Antwort
 * von f auf einen Stups an der Stelle (i,j) — die Gradientenmatrix ist die
 * Tafel dieser Einzelantworten (Satz 10.4.10).
 *
 * Der Rechenkern ist aus PokeAWidget in
 * /workspace/interactive/interactive/mml-ch5-1/src/sections/S54.tsx portiert:
 * dort wird ein Eintrag einer editierbaren Matrix gestört und die zentrale
 * Differenz gegen den Formelwert gestellt (perturb/fd-Muster, eps = 1e-4, dazu
 * die Gitteranzeige der Gradientenmatrix mit hervorgehobenem Eintrag).
 * Übernommen ist nur dieser Code; die Primärinteraktion (Zelle anfassen und
 * senkrecht ziehen = anstupsen), die Restterm-Zerlegung und sämtliche Texte
 * sind neu.
 *
 * FARBROLLEN (Kapitel 10): Funktionswerte blau, linearer Ableitungsterm grün,
 * Restterm rot, Gradientenmatrix orange, die vom Leser gewählte Zelle violett.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-10-ableitungen-1/
 * check-s101-s104.mjs, 2026-08-19), an der Startmatrix X = (1 0 2; −1 2 1):
 *   f(X) = aᵀXb = 2 mit ∂f/∂X = abᵀ = (2 1 3; −4 −2 −6);
 *   f(X) = ‖X‖_F² = 11 mit ∂f/∂X = 2X = (2 0 4; −2 4 2);
 *   f(X) = tr(AᵀX) = −4 mit ∂f/∂X = A = (1 0 −2; 3 1 0);
 *   alle drei Gradientenmatrizen stimmen mit zentralen Differenzen
 *   (eps = 1e−4) bis 6,4e−12 überein.
 * Restterm bei einem Stups am Eintrag (2,3): für aᵀXb und tr(AᵀX) exakt null
 * (1,8e−15 Maschinenrauschen), für ‖X‖_F² genau h² — 0,16 bei h = 0,4 und
 * 0,04 bei h = 0,2.
 */

const BLAU = FMM_COLORS.blau; // Funktionswerte
const GRUEN = FMM_COLORS.gruen; // lineare Approximation
const ROT = FMM_COLORS.rot; // Restterm
const ORANGE = FMM_COLORS.orange; // Gradientenmatrix
const VIOLETT = FMM_COLORS.violett; // die angefasste Zelle

type Mat = number[][];

const A_VEK = [1, -2]; // a in R^2
const B_VEK = [2, 1, 3]; // b in R^3
const A_MAT: Mat = [
  [1, 0, -2],
  [3, 1, 0],
]; // A in R^{2x3}

interface Funktion {
  name: string;
  tex: string;
  f: (X: Mat) => number;
  grad: (X: Mat) => Mat;
  regel: string;
  /** Ordnung des Restterms: 0 = exakt null, 2 = quadratisch in h */
  ordnung: 0 | 2;
}

const FUNKTIONEN: Funktion[] = [
  {
    name: "aᵀXb",
    tex: "f(X) = aᵀXb   mit a = (1; −2), b = (2; 1; 3)",
    f: (X) => A_VEK.reduce((s, ai, i) => s + ai * B_VEK.reduce((t, bj, j) => t + X[i][j] * bj, 0), 0),
    grad: () => A_VEK.map((ai) => B_VEK.map((bj) => ai * bj)),
    regel: "∂f/∂X = abᵀ (Beispiel 10.4.9)",
    ordnung: 0,
  },
  {
    name: "‖X‖_F²",
    tex: "f(X) = ‖X‖_F² = tr(XᵀX)",
    f: (X) => X.flat().reduce((s, v) => s + v * v, 0),
    grad: (X) => X.map((zeile) => zeile.map((v) => 2 * v)),
    regel: "∂f/∂X = 2X (Satz 10.4.10)",
    ordnung: 2,
  },
  {
    name: "tr(AᵀX)",
    tex: "f(X) = tr(AᵀX)   mit A = (1 0 −2; 3 1 0)",
    f: (X) => {
      const flach = X.flat();
      return A_MAT.flat().reduce((s, v, k) => s + v * flach[k], 0);
    },
    grad: () => A_MAT.map((zeile) => [...zeile]),
    regel: "∂f/∂X = A (Satz 10.4.10)",
    ordnung: 0,
  },
];

const START_X: Mat = [
  [1, 0, 2],
  [-1, 2, 1],
];

/* -------------------------------------------------- Tafel: X mit dem Stups */

const ZELLE_B = 78;
const ZELLE_H = 46;
const RAND = 10;
const KOPF = 16;
const TAFEL_B = 3 * ZELLE_B + 2 * RAND;
const TAFEL_H = 2 * ZELLE_H + 2 * RAND + KOPF;
const H_MAX = 1;

export function AnstupsWidget() {
  const [wahl, setWahl] = useState(0);
  const [X, setX] = useState<Mat>(START_X.map((zeile) => [...zeile]));
  const [i, setI] = useState(2);
  const [j, setJ] = useState(3);
  const [h, setH] = useState(0.4);
  const fn = FUNKTIONEN[wahl];

  // Ziehen auf einer Zelle: die Zelle wird gewählt, senkrechte Bewegung setzt
  // die Stärke des Stupses. Doppelpfad: der h-Regler darunter.
  const zieh = useDrag<string>({
    feld: { x0: RAND, y0: KOPF + RAND, w: 3 * ZELLE_B, h: 2 * ZELLE_H },
    // y-Skala so gewaehlt, dass ein Zug ueber die volle Tafelhoehe den ganzen
    // h-Bereich [-1, 1] durchfaehrt; gezogen wird relativ (greifPosition).
    welt: { x0: 0, x1: 3, y0: -1.1, y1: 1.1 },
    clamp: ([x, y]) => [x, clamp(y, -H_MAX, H_MAX)],
    snap: [0, 0.02],
    greifPosition: () => [0, h],
    onStart: (_p, id) => {
      const [zi, zj] = id.split("-").map(Number);
      setI(zi);
      setJ(zj);
    },
    onDrag: ([, y]) => setH(Math.round(y * 50) / 50),
  });

  const G = fn.grad(X);
  const eintrag = G[i - 1][j - 1];
  const ij = `${i}${j}`;

  // Zentrale Differenz aus zwei Auswertungen von f an der gestörten Matrix.
  const eps = 1e-4;
  const gestoert = (s: number) => {
    const Z = X.map((zeile) => [...zeile]);
    Z[i - 1][j - 1] += s;
    return fn.f(Z);
  };
  const differenz = (gestoert(eps) - gestoert(-eps)) / (2 * eps);

  // Zerlegung der endlichen Änderung in linearen Teil und Restterm.
  const f0 = fn.f(X);
  const fH = gestoert(h);
  const aenderung = fH - f0;
  const linear = eintrag * h;
  const rest = aenderung - linear;
  const probeFehler = Math.abs(differenz - eintrag);

  const art =
    probeFehler > 1e-6
      ? "abweichung"
      : Math.abs(h) < 1e-9
        ? "kein-stups"
        : fn.ordnung === 0
          ? "exakt"
          : Math.abs(rest) < 5e-4
            ? "rest-verschwindet"
            : "quadratisch";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className={`text-xs ${W_MUTED}`}>f wählen:</span>
        {FUNKTIONEN.map((fk, k) => (
          <button
            key={fk.name}
            type="button"
            aria-pressed={k === wahl}
            className={k === wahl ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setWahl(k)}
          >
            {fk.name}
          </button>
        ))}
      </div>
      <p className={`max-w-prose text-sm ${W_MUTED}`}>
        <span className="font-mono">{fn.tex}</span>, ausgewertet an X ∈ ℝ²ˣ³.{" "}
        <span style={{ color: ORANGE }}>{fn.regel}</span>
      </p>
      <Aufgabe>
        Fassen wir eine Zelle von X an und ziehen sie nach oben oder unten. Das ist der Stups
        h·E<sub>ij</sub>.
      </Aufgabe>

      <div className="flex flex-wrap items-start gap-6">
        <svg
          viewBox={`0 0 ${TAFEL_B} ${TAFEL_H}`}
          width={TAFEL_B}
          height={TAFEL_H}
          className="h-auto max-w-full select-none rounded"
          role="img"
          aria-label={`Die Matrix X als Tafel; die Zelle (${i}, ${j}) ist um ${fmt(h, 2)} ausgelenkt.`}
          {...zieh.svgProps}
          style={{
            border: "1px solid var(--w-border, #cbd5e1)",
            background: "var(--w-bg, #ffffff)",
            ...zieh.svgProps.style,
          }}
        >
          <defs>
            <marker id="s104-stups" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
              <path d="M0,0 L7,3 L0,6 z" fill={VIOLETT} />
            </marker>
          </defs>
          <text x={RAND} y={11} fontSize={10} fill="var(--w-text, #334155)">
            X + h·E{ij}: Zelle anfassen und senkrecht ziehen
          </text>
          {X.map((zeile, r) =>
            zeile.map((wert, c) => {
              const gewaehlt = r === i - 1 && c === j - 1;
              const x = RAND + c * ZELLE_B;
              const y = KOPF + RAND + r * ZELLE_H;
              const angezeigt = gewaehlt ? wert + h : wert;
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={x + 2}
                    y={y + 2}
                    width={ZELLE_B - 4}
                    height={ZELLE_H - 4}
                    rx={4}
                    fill={gewaehlt ? VIOLETT : "var(--w-grid, #e2e8f0)"}
                    fillOpacity={gewaehlt ? 0.14 : 0.5}
                    stroke={gewaehlt ? VIOLETT : "var(--w-border, #cbd5e1)"}
                    strokeWidth={gewaehlt ? 2 : 1}
                    {...zieh.handleProps(`${r + 1}-${c + 1}`)}
                  />
                  <text
                    x={x + ZELLE_B / 2}
                    y={y + ZELLE_H / 2 + 4}
                    textAnchor="middle"
                    fontSize={13}
                    fontFamily="ui-monospace, monospace"
                    fill={gewaehlt ? VIOLETT : "var(--w-text, #334155)"}
                    pointerEvents="none"
                  >
                    {fmt(angezeigt, 2)}
                  </text>
                  {gewaehlt && Math.abs(h) > 1e-9 && (
                    <line
                      x1={x + ZELLE_B - 14}
                      y1={y + ZELLE_H / 2 + (h > 0 ? 12 : -12)}
                      x2={x + ZELLE_B - 14}
                      y2={y + ZELLE_H / 2 - (h > 0 ? 12 : -12)}
                      stroke={VIOLETT}
                      strokeWidth={2}
                      markerEnd="url(#s104-stups)"
                      pointerEvents="none"
                    />
                  )}
                </g>
              );
            }),
          )}
        </svg>

        <div>
          <p className="mb-1 text-xs" style={{ color: ORANGE }}>
            ∂f(X)/∂X, Eintrag ({i},{j}) hervorgehoben
          </p>
          <div className="inline-grid grid-cols-3 gap-1">
            {G.map((zeile, r) =>
              zeile.map((v, c) => (
                <span
                  key={`${r}-${c}`}
                  className="w-14 rounded border px-1 py-0.5 text-center font-mono text-xs"
                  style={
                    r === i - 1 && c === j - 1
                      ? { borderColor: ORANGE, borderWidth: 2, color: ORANGE, fontWeight: 600 }
                      : { borderColor: "var(--w-border, #94a3b8)" }
                  }
                >
                  {fmt(v, 2)}
                </span>
              )),
            )}
          </div>
        </div>
      </div>

      <Slider
        label="Stups h"
        value={h}
        onChange={(v) => setH(Math.round(v * 100) / 100)}
        min={-1}
        max={1}
        step={0.01}
        accent={VIOLETT}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider label="Zeile i" value={i} onChange={setI} min={1} max={2} step={1} fmt={(v) => v.toFixed(0)} />
      <Slider label="Spalte j" value={j} onChange={setJ} min={1} max={3} step={1} fmt={(v) => v.toFixed(0)} />
      <div>
        <p className="mb-1 text-xs" style={{ color: BLAU }}>
          Grundmatrix X (auch tippbar)
        </p>
        <MatrixInput value={X} onChange={setX} />
      </div>

      <div className="max-w-prose space-y-1 text-sm">
        <p>
          Zentraler Differenzenquotient von f nach{" "}
          <span className="font-mono">
            x<sub>{ij}</sub>
          </span>
          : <span className="font-mono">{fmt(differenz, 4)}</span>. Vorhersage aus der
          Gradientenmatrix:{" "}
          <span className="font-mono" style={{ color: ORANGE }}>
            {fmt(eintrag, 4)}
          </span>
          .
        </p>
        <p>
          <span className="font-mono" style={{ color: BLAU }}>
            f(X + h·E) − f(X) = {fmt(aenderung, 4)}
          </span>
          {" = "}
          <span className="font-mono" style={{ color: GRUEN }}>
            {fmt(linear, 4)}
          </span>
          {" + "}
          <span className="font-mono" style={{ color: ROT }}>
            {fmt(rest, 4)}
          </span>
        </p>
      </div>

      <Verdikt
        kind={art === "abweichung" ? "fail" : art === "kein-stups" ? "neutral" : "ok"}
      >
        {art === "abweichung" &&
          `Formelwert und Differenzenquotient weichen um ${fmt(probeFehler, 6)} voneinander ab. Das darf nach Satz 10.4.10 nicht passieren; hier stimmt etwas im Widget nicht.`}
        {art === "kein-stups" &&
          `Ohne Stups ändert sich nichts. Der Eintrag (${i},${j}) der Gradientenmatrix sagt voraus, mit welcher Rate f reagiert, sobald wir an dieser Stelle wackeln: pro Einheit um ${fmt(eintrag, 3)}.`}
        {art === "exakt" &&
          `f ist linear in X. Der grüne Ableitungsterm D_X f(h·E) = h·[∂f/∂X]${ij} trifft die Änderung deshalb exakt, der rote Restterm bleibt für jedes h null. Nach Bemerkung 10.4.8 ist dieser Term das Skalarprodukt tr((∂f/∂X)ᵀ H); bei H = h·E bleibt davon genau ein Summand übrig.`}
        {art === "quadratisch" &&
          `f ist quadratisch in X, und der Restterm ist exakt h² = ${fmt(h * h, 4)}. Er fällt schneller als h selbst: halbieren wir den Stups, viertelt er sich. Genau das und nicht mehr verlangt Definition 10.1.5 vom o(‖H‖)-Term.`}
        {art === "rest-verschwindet" &&
          `Bei diesem kleinen Stups ist der Restterm h² = ${fmt(h * h, 5)} bereits unter der angezeigten Genauigkeit. Die lineare Vorhersage der Gradientenmatrix ist damit praktisch exakt: die Aussage von Satz 10.4.10 ist eine über kleine H, nicht über beliebige.`}
      </Verdikt>
    </div>
  );
}
