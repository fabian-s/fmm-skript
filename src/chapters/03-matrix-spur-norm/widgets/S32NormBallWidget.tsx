import { useMemo, useState } from "react";
import {
  Aufgabe,
  DragHandle,
  FMM_COLORS,
  M,
  Schaetzfrage,
  Slider,
  Surface3D,
  Verdikt,
  ViewControls,
  W_MUTED,
  W_PANEL,
  clamp,
  fmtDe,
  useDrag,
} from "../../../lib";
import type { Kurve3D, Sicht3D, Vec3 } from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §3.2 (Auffrischung): Einheitskugeln der p-Normen und die Norm als
 * Aufblähfaktor.
 *
 * DIE EINE EINSICHT: Die Norm eines Vektors ist der Faktor, mit dem wir die
 * Einheitskugel aufblasen müssen, damit sie durch seine Spitze läuft – und
 * welche Gestalt diese Kugel hat, entscheidet allein p (Raute, Kreis, Quadrat
 * in der Ebene; Oktaeder, Kugel, Würfel im Raum).
 *
 * FARBROLLEN (Kapitel-3-Tabelle): blau = die Einheitskugel selbst (in §3.3/§3.4
 * das Bild unter A), orange = die mit ‖x‖ skalierte Kugel, rot = der
 * angefasste Vektor x, grau = Achsen und Gitter.
 *
 * INTERAKTION: x wird im Bild gezogen (Doppelpfad: die beiden Regler x₁, x₂
 * auf derselben Zustandsquelle); p ist ein Regler, das Kästchen springt auf
 * p = ∞. Die 3D-Tafel rechts zeigt dieselbe Einheitskugel im R³, ihr
 * Bodenschnitt ist genau die Kurve der linken Tafel; sie behauptet keine
 * eigenen Zahlen (D7).
 *
 * PROVENIENZ: Der SVG-/Kurvencode der Einheitskugeln ist aus der internen
 * heath-ch2-App (S23.tsx) recycelt; Beschriftungen, Verdikt, Drag und die
 * 3D-Tafel sind für dieses Skript neu.
 *
 * PRÜFSTATUS (scripts/verify/REV29/03-matrix-spur-norm-S32NormBall.mjs,
 * 2026-08-29): Ausgangszustand x = (−1,2; 0,9):
 * ‖x‖ = 2,1 (p = 1), 1,5 (p = 2), 1,2 (p = ∞); ‖(−1,6; 1,2)‖ = 2,8 / 2,0 /
 * 1,6; für p = 0,5 ist ‖e₁ + e₂‖_p = 2^(1/p) = 4 > 2 = ‖e₁‖_p + ‖e₂‖_p,
 * die Dreiecksungleichung fällt also. Volumina der Einheitskugeln im R³:
 * Oktaeder 4/3 = 1,3333, Kugel 4π/3 = 4,1888, Würfel 8 – der Würfel ist genau
 * 3! = 6-mal so voluminös wie das Oktaeder (per Gitterintegration gegengeprüft:
 * 1,3333 und 4,1888). ‖(1, 1, 1)‖ = 3 / 1,7321 / 1 für p = 1 / 2 / ∞.
 * Das Widget zeigt dieses Volumen jetzt live unter der Raumtafel
 * (V_p = 8·Γ(1+1/p)³/Γ(1+3/p)), damit die Schätzfrage nach dem
 * Volumenverhältnis eine Ablesehandlung hat und nicht geraten werden muss.
 */

const BLAU = FMM_COLORS.blau; // Einheitskugel
const ORANGE = FMM_COLORS.orange; // skalierte Kugel
const ROT = FMM_COLORS.rot; // der Vektor x

/** p-Norm eines 2-Vektors; p = Infinity liefert die Maximumsnorm. */
function pNorm2d(x: number, y: number, p: number): number {
  if (!Number.isFinite(p)) return Math.max(Math.abs(x), Math.abs(y));
  return Math.pow(Math.pow(Math.abs(x), p) + Math.pow(Math.abs(y), p), 1 / p);
}

/** ln Γ(z) nach Lanczos (g = 7, n = 9); genügt hier auf ~1e-13 genau. */
function lnGamma(z: number): number {
  const g = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  let x = g[0];
  for (let i = 1; i < 9; i++) x += g[i] / (z - 1 + i);
  const t = z - 1 + 7.5;
  return 0.5 * Math.log(2 * Math.PI) + (z - 0.5) * Math.log(t) - t + Math.log(x);
}

/**
 * Volumen der Einheitskugel der p-Norm im R³:
 *   V_p = 8 · Γ(1 + 1/p)³ / Γ(1 + 3/p).
 * p = 1 → 4/3 (Oktaeder), p = 2 → 4π/3 (Kugel), p → ∞ → 8 (Würfel).
 * Nachgerechnet in scripts/verify/REV29/03-matrix-spur-norm-S32NormBall.mjs,
 * dort zusätzlich gegen eine Gitterintegration gehalten.
 */
function ballVolumen3d(p: number): number {
  if (!Number.isFinite(p)) return 8;
  return 8 * Math.exp(3 * lnGamma(1 + 1 / p) - lnGamma(1 + 3 / p));
}

/** Punkte der Kurve {x : ‖x‖_p = radius} in Weltkoordinaten. */
function ballPunkte(p: number, radius: number, n = 240): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = (2 * Math.PI * i) / n;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const r = radius / pNorm2d(c, s, p);
    pts.push([r * c, r * s]);
  }
  return pts;
}

/** Deutsche Dezimaldarstellung für MathJax-Strings: 1.25 -> "1{,}25". */
const de = (v: number, d = 2) => v.toFixed(d).replace(".", "{,}").replace(/^-/, "−");

const SIZE = 320;
const HALB = 3.2;
const SC = SIZE / (2 * HALB);
const GRENZE = 1.5; // Klemmung für x (identisch mit den Reglergrenzen)
const px = (x: number) => SIZE / 2 + x * SC;
const py = (y: number) => SIZE / 2 - y * SC;

function Normkugeln({ volumenZeigen }: { volumenZeigen: boolean }) {
  const [p, setP] = useState(2);
  const [inf, setInf] = useState(false);
  const [x1, setX1] = useState(-1.2);
  const [x2, setX2] = useState(0.9);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 22 });

  const pEff = inf ? Infinity : p;
  const nx = pNorm2d(x1, x2, pEff);
  const pLabel = inf ? "\\infty" : Number.isInteger(p) ? String(p) : de(p);

  const zieh = useDrag<"x">({
    feld: { x0: 0, y0: 0, w: SIZE, h: SIZE },
    welt: { x0: -HALB, x1: HALB, y0: -HALB, y1: HALB },
    clamp: ([a, b]) => [clamp(a, -GRENZE, GRENZE), clamp(b, -GRENZE, GRENZE)],
    greifPosition: () => [x1, x2],
    onDrag: ([a, b]) => {
      setX1(Math.round(a * 20) / 20);
      setX2(Math.round(b * 20) / 20);
    },
  });

  const kugel = ballPunkte(pEff, 1);
  const skaliert = ballPunkte(pEff, nx);
  const alsPfad = (pts: [number, number][]) =>
    pts.map(([a, b]) => `${px(a).toFixed(1)},${py(b).toFixed(1)}`).join(" ");

  /* ---------------------------------------------------------- 3D-Tafel */
  const flaeche = useMemo(
    () => ({
      f: (a: number, b: number) => {
        if (!Number.isFinite(pEff)) return Math.max(Math.abs(a), Math.abs(b)) <= 1 ? 1 : NaN;
        const r = 1 - Math.abs(a) ** pEff - Math.abs(b) ** pEff;
        if (!(r > 0)) return NaN;
        const z = Math.pow(r, 1 / pEff);
        // Nahe am Äquator steht die Fläche fast senkrecht; die Zellen des
        // Wertegitters werden dort nadeldünn und fransen den Rand aus. Wir
        // hören auf, sobald die Fläche steiler als etwa 70° läuft – den Rand
        // zeichnet ohnehin die blaue Kurve auf dem Boden.
        // Das Kriterium |dz/da| = (|a|/z)^(p−1) gilt für JEDES p: für p > 1 wird
        // es am Äquator groß, für p < 1 an der Spitze über der z-Achse. Die
        // frühere Fassung klammerte p ≤ 1 ausdrücklich aus („läuft flach in den
        // Boden"), was dort gerade falsch ist. Für p < 1 reicht der Abbruch
        // allein allerdings nicht: die Kugel läuft dann in echte Spitzen aus,
        // und statt eines unlesbaren Nadelbüschels zeigt das Widget in diesem
        // Bereich einen Hinweis (siehe unten).
        const steil = (Math.max(Math.abs(a), Math.abs(b)) / z) ** (pEff - 1);
        return steil < 3 ? z : NaN;
      },
      nx: 30,
      ny: 30,
      color: BLAU,
      opacity: 0.8,
      // Kein Gitternetz: am Äquator steht die Fläche senkrecht, die Zellen
      // werden dort nadeldünn und ihre Ränder wirken als Fransen.
      wire: false,
    }),
    [pEff],
  );
  const kurven3d = useMemo<Kurve3D[]>(() => {
    const aequator: Vec3[] = ballPunkte(pEff, 1, 160).map(([a, b]) => [a, b, 0] as Vec3);
    const halbbogen = (imXZ: boolean): Vec3[] => {
      const pts: Vec3[] = [];
      for (let i = 0; i <= 80; i++) {
        const t = (Math.PI * i) / 80;
        const c = Math.cos(t);
        const s = Math.sin(t);
        const r = 1 / pNorm2d(c, s, pEff);
        pts.push(imXZ ? [r * c, 0, r * s] : [0, r * c, r * s]);
      }
      return pts;
    };
    return [
      { pts: aequator, color: BLAU, width: 2, onTop: true },
      { pts: halbbogen(true), color: BLAU, width: 1.4 },
      { pts: halbbogen(false), color: BLAU, width: 1.4 },
    ];
  }, [pEff]);
  const pfeil3d = useMemo(
    () => [{ from: [0, 0, 0] as Vec3, to: [x1, x2, 0] as Vec3, color: ROT, label: "x", onTop: true }],
    [x1, x2],
  );

  /* ----------------------------------------------------------- Verdikt */
  const nichtKonvex = !inf && p < 1;
  const gestalt = inf
    ? "Würfel im Raum, Quadrat in der Ebene"
    : p < 1
      ? "nach innen gebeulter Stern"
      : Math.abs(p - 1) < 0.03
        ? "Oktaeder im Raum, Raute in der Ebene"
        : Math.abs(p - 2) < 0.03
          ? "Kugel im Raum, Kreis in der Ebene"
          : p < 2
            ? "zwischen Raute und Kreis"
            : "zwischen Kreis und Quadrat";

  return (
    <div className="space-y-3 text-sm">
      <Aufgabe>
        Ziehen wir <M>{"\\bx"}</M> im Bild umher, schieben wir danach <M>{"p"}</M> von 0,5 bis 6
        durch und lesen wir dabei das Volumen unter der Raumtafel ab – einmal bei{" "}
        <M>{"p = 1"}</M> und einmal mit dem Kästchen <M>{"p = \\infty"}</M>.
      </Aufgabe>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        <span style={{ color: BLAU }}>blau</span> die Einheitskugel{" "}
        <M>{"\\{\\bx : \\|\\bx\\|_p = 1\\}"}</M>,{" "}
        <span style={{ color: ORANGE }}>orange gestrichelt</span> dieselbe Kugel, skaliert mit{" "}
        <M>{"\\|\\bx\\|_p"}</M>, <span style={{ color: ROT }}>rot</span> der Vektor{" "}
        <M>{"\\bx"}</M>.
      </p>
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            width={SIZE}
            height={SIZE}
            className="max-w-full h-auto rounded"
            role="img"
            aria-label={`Einheitskugel der p-Norm in der Ebene, aktuell ein ${gestalt}; der Vektor x hat die Norm ${fmtDe(nx, 2)}.`}
            {...zieh.svgProps}
            style={{
              ...zieh.svgProps.style,
              background: "var(--w-bg)",
              border: "1px solid var(--w-border)",
            }}
          >
            <defs>
              <marker
                id="s32-ub-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={ROT} />
              </marker>
            </defs>
            <line x1={px(-HALB)} y1={py(0)} x2={px(HALB)} y2={py(0)} stroke="var(--w-axis)" />
            <line x1={px(0)} y1={py(-HALB)} x2={px(0)} y2={py(HALB)} stroke="var(--w-axis)" />
            {[-3, -2, -1, 1, 2, 3].map((t) => (
              <g key={`ubt${t}`}>
                <line x1={px(t)} y1={py(0) - 3} x2={px(t)} y2={py(0) + 3} stroke="var(--w-grid-strong)" />
                <line x1={px(0) - 3} y1={py(t)} x2={px(0) + 3} y2={py(t)} stroke="var(--w-grid-strong)" />
                {t > 0 && (
                  <text x={px(t)} y={py(0) + 14} fontSize="10" fill="var(--w-muted)" textAnchor="middle">
                    {t}
                  </text>
                )}
              </g>
            ))}
            <text x={px(HALB) - 16} y={py(0) - 6} fontSize="11" fill="var(--w-muted)" fontStyle="italic">
              x₁
            </text>
            <text x={px(0) + 6} y={py(HALB) + 12} fontSize="11" fill="var(--w-muted)" fontStyle="italic">
              x₂
            </text>
            <polygon points={alsPfad(kugel)} fill="none" stroke={BLAU} strokeWidth="2" />
            {nx > 1e-9 && (
              <polygon
                points={alsPfad(skaliert)}
                fill="none"
                stroke={ORANGE}
                strokeWidth="1.6"
                strokeDasharray="5 4"
              />
            )}
            <line
              x1={px(0)}
              y1={py(0)}
              x2={px(x1)}
              y2={py(x2)}
              stroke={ROT}
              strokeWidth="2.2"
              markerEnd="url(#s32-ub-arrow)"
            />
            <DragHandle
              x={px(x1)}
              y={py(x2)}
              r={5}
              farbe={ROT}
              aktiv={zieh.dragging === "x"}
              {...zieh.handleProps("x")}
            />
          </svg>
          <div className="mt-2 space-y-1">
            <Slider label="p" value={p} onChange={setP} min={0.5} max={6} step={0.05} disabled={inf} accent={BLAU} />
            <label className="my-1 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={inf}
                onChange={(e) => setInf(e.target.checked)}
                className="accent-sky-600"
              />
              <span>
                <M>{"p = \\infty"}</M> verwenden
              </span>
            </label>
            <Slider label="x₁" value={x1} onChange={setX1} min={-GRENZE} max={GRENZE} step={0.05} accent={ROT} />
            <Slider label="x₂" value={x2} onChange={setX2} min={-GRENZE} max={GRENZE} step={0.05} accent={ROT} />
          </div>
        </div>
        <div className="min-w-0 shrink-0">
          {/* Für p < 1 steht die Fläche an den Achsen senkrecht und läuft in
              Spitzen aus; das Wertegitter zerfällt dort in ein Nadelbüschel, in
              dem nichts mehr zu erkennen ist (die 2D-Tafel zeigt den Stern
              dagegen sauber). Statt eines irreführenden Bildes steht hier ein
              Hinweis – die Gestalt trägt in diesem Bereich die linke Tafel. */}
          {nichtKonvex ? (
            <div
              className={`flex h-[260px] w-[260px] max-w-full items-center rounded p-4 text-xs ${W_PANEL} ${W_MUTED}`}
            >
              <span>
                Für <M>{"p < 1"}</M> läuft die Einheitskugel im Raum in Spitzen entlang der
                Achsen aus; als Fläche gezeichnet bleibt davon nur ein Nadelbüschel übrig.
                Die Gestalt zeigt hier die Tafel daneben: ein nach innen gebeulter Stern.
              </span>
            </div>
          ) : (
            <>
              <Surface3D
                size={260}
                xDomain={[-1.3, 1.3]}
                yDomain={[-1.3, 1.3]}
                zDomain={[0, 1]}
                surface={flaeche}
                curves={kurven3d}
                arrows={pfeil3d}
                labels={{ x: "x₁", y: "x₂", z: "x₃" }}
                azimuth={sicht.azimuth}
                elevation={sicht.elevation}
                onViewChange={setSicht}
                ariaLabel={`Obere Hälfte der Einheitskugel im Raum für den aktuellen Exponenten: ${gestalt}.`}
              />
              <div className="mt-1 max-w-[260px]">
                <ViewControls value={sicht} onChange={setSicht} />
              </div>
            </>
          )}
          <p className="mt-1 max-w-[260px] text-sm">
            Volumen dieser Einheitskugel im <M>{"\\R^3"}</M>:{" "}
            <span className="font-mono tabular-nums">{fmtDe(ballVolumen3d(pEff), 2)}</span>
          </p>
          {!nichtKonvex && (
            <p className={`mt-1 max-w-[260px] text-xs ${W_MUTED}`}>
              Dieselbe Einheitskugel im <M>{"\\R^3"}</M>, obere Hälfte. Ihr Schnitt mit dem Boden
              ist genau die blaue Kurve in der Tafel daneben, der rote Pfeil derselbe Vektor.
              Ziehen dreht die Ansicht.
            </p>
          )}
        </div>
      </div>
      <Verdikt kind={nichtKonvex ? "fail" : "ok"} titel={`${gestalt}.`}>
        <M>{`\\|\\bx\\|_{${pLabel}} = ${de(nx, 3)}`}</M>.{" "}
        {nichtKonvex ? (
          <>
            Für <M>{"p < 1"}</M> beult sich die „Kugel" nach innen, und mit der Konvexität fällt die
            Dreiecksungleichung: Hier ist{" "}
            <M>
              {`\\left\\| \\be_1 + \\be_2 \\right\\|_{${de(p)}} = 2^{1/${de(p)}} = ${de(Math.pow(2, 1 / p))} > 2 = \\left\\| \\be_1 \\right\\|_{${de(p)}} + \\left\\| \\be_2 \\right\\|_{${de(p)}}`}
            </M>
            . Genau das fordert das dritte Normaxiom (für Matrizen steht es in {ref("definition:matrixnorm")},
            für Vektoren lautet es wörtlich gleich); die <M>{"\\,p"}</M>-Normen sind deshalb nur
            für <M>{"p \\ge 1"}</M> erklärt.
          </>
        ) : (
          <>
            Um genau diesen Faktor aufgeblasen läuft die Einheitskugel durch die Spitze von{" "}
            <M>{"\\bx"}</M>. Für <M>{"p \\ge 1"}</M> ist sie
            konvex, und diese Konvexität ist das geometrische Gesicht der Dreiecksungleichung,
            also des dritten Normaxioms ({ref("definition:matrixnorm")}).
            {volumenZeigen && (
              <>
                {" "}
                Im <M>{"\\R^3"}</M> haben die drei Standardkugeln die Volumina 4/3 ≈ 1,33
                (Oktaeder), 4π/3 ≈ 4,19 (Kugel) und 8 (Würfel): Der Würfel ist genau 6-mal so
                voluminös wie das Oktaeder, im <M>{"\\R^n"}</M> sogar <M>{"n!"}</M>-mal. So weit
                liegen dieselben drei Normen auseinander, sobald die Dimension wächst.
              </>
            )}
          </>
        )}
      </Verdikt>
    </div>
  );
}

/**
 * Der Abschnitts-Baustein: erst tippen, dann drehen. Die Schätzfrage zielt auf
 * den Volumenvergleich, den erst die 3D-Tafel plausibel macht.
 */
export function S32NormBallWidget() {
  return (
    <Schaetzfrage
      frage="Im Raum ist die Einheitskugel der Maximumsnorm ein Würfel, die der Summennorm ein Oktaeder. Um welchen Faktor ist der Würfel voluminöser?"
      variante="auswahl"
      loesung="sechs"
      optionen={[
        { id: "zwei", text: "etwa 2-mal" },
        { id: "sechs", text: "etwa 6-mal" },
        { id: "zwanzig", text: "etwa 20-mal" },
      ]}
    >
      {({ aufgeloest }) => <Normkugeln volumenZeigen={aufgeloest} />}
    </Schaetzfrage>
  );
}
