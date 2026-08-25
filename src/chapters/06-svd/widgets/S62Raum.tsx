import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  Surface3D,
  TransformCanvas,
  Verdikt,
  ViewControls,
  W_MUTED,
  fmtDe,
  type Kurve3D,
  type Pfeil3D,
  type Punkt3D,
  type Sicht3D,
  type Vec3,
} from "../../../lib";

/**
 * DIE EINE EINSICHT: Eine 3×2-Matrix schickt den Einheitskreis des R² auf eine
 * Ellipse, die flach in der Ebene col(A) des R³ liegt: zwei Dimensionen
 * hinein, zwei Dimensionen heraus, egal wie viele Zeilen A hat. Die Halbachsen
 * dieser Ellipse sind σ₁u₁ und σ₂u₂.
 *
 * Bauart nach Architektur-Entscheidung D7: Die linke 2D-Tafel (Urbild im R²)
 * ist die tot lesbare Hauptdarstellung, die 3D-Tafel steht daneben und zeigt
 * denselben Vektor. Alle Zahlen stehen im Verdikt, die Raumtafel behauptet
 * nichts Eigenes.
 *
 * FARBROLLEN (Kapitel 6): blau = rechte Singulärvektoren v im Urbild,
 * grün = linke Singulärvektoren u und die von ihnen aufgespannte Ebene col(A),
 * orange = die Streckfaktoren σ (Beschriftung der Halbachsen),
 * grau = laufendes x, violett = sein Bild Ax.
 *
 * PROVENIENZ: eigener Aufbau auf den lib-Bausteinen Surface3D/ViewControls
 * (Referenzaufrufer 10-differentialrechnung/widgets/S107Hesse.tsx) und
 * TransformCanvas v2. Kein übernommener Code, alle Texte neu.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen,
 * 2026-08-19) für die Voreinstellung A = (1 2; 2 1; 1 0):
 *   σ₁ = 3,0873, σ₂ = 1,2120; u₁ = (−0,672; −0,700; −0,243),
 *   u₂ = (−0,691; 0,474; 0,546); u₁ᵀu₂ = 0 (< 1e−12), ‖u₁‖ = ‖u₂‖ = 1;
 *   Rasterlauf über 360 000 Winkel: max‖Ax‖ = 3,0873, min‖Ax‖ = 1,2120,
 *   also genau die beiden Halbachsen; Ellipsenfläche πσ₁σ₂ = 11,755.
 */

export interface RaumDaten {
  /** die 3×2-Matrix, wie sie im Rechner steht */
  A: number[][];
  /** rechte Singulärvektoren v₁, v₂ (je 2 Komponenten), Vorzeichen wie gewählt */
  v: number[][];
  /** linke Singulärvektoren u₁, u₂ (je 3 Komponenten); null, wenn σ = 0 */
  u: (number[] | null)[];
  /** Singulärwerte σ₁ ≥ σ₂ */
  sig: number[];
}

const einheit = (w: number[] | null, ersatz: Vec3): Vec3 =>
  w && w.length === 3 ? [w[0], w[1], w[2]] : ersatz;

export function EllipseImRaum({ A, v, u, sig }: RaumDaten) {
  const [theta, setTheta] = useState(20);
  const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 24 });

  const t = (theta * Math.PI) / 180;
  const x: [number, number] = [Math.cos(t), Math.sin(t)];
  const bild = (p: [number, number]): Vec3 => [
    (A[0][0] || 0) * p[0] + (A[0][1] || 0) * p[1],
    (A[1][0] || 0) * p[0] + (A[1][1] || 0) * p[1],
    (A[2][0] || 0) * p[0] + (A[2][1] || 0) * p[1],
  ];
  const Ax = bild(x);
  const nAx = Math.hypot(...Ax);

  const ellipse = useMemo<Vec3[]>(() => {
    const pts: Vec3[] = [];
    for (let i = 0; i <= 96; i++) {
      const w = (2 * Math.PI * i) / 96;
      pts.push(bild([Math.cos(w), Math.sin(w)]));
    }
    return pts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [A[0][0], A[0][1], A[1][0], A[1][1], A[2][0], A[2][1]]);

  const halb = Math.max(
    1,
    1.05 * Math.max(...ellipse.map((p) => Math.max(Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2])))),
  );
  const fenster: [number, number] = [-halb, halb];

  const u1 = einheit(u[0], [1, 0, 0]);
  const u2 = einheit(u[1], [0, 1, 0]);
  const entartet = !(sig[1] > 1e-9);

  const kurven = useMemo<Kurve3D[]>(
    () => [{ pts: ellipse, color: FMM_COLORS.violett, width: 2.2, onTop: true }],
    [ellipse],
  );
  const pfeile = useMemo<Pfeil3D[]>(
    () => [
      {
        from: [0, 0, 0],
        to: [sig[0] * u1[0], sig[0] * u1[1], sig[0] * u1[2]],
        color: FMM_COLORS.gruen,
        label: "σ₁u₁",
        onTop: true,
      },
      ...(entartet
        ? []
        : [
            {
              from: [0, 0, 0] as Vec3,
              to: [sig[1] * u2[0], sig[1] * u2[1], sig[1] * u2[2]] as Vec3,
              color: FMM_COLORS.gruen,
              label: "σ₂u₂",
              onTop: true,
            },
          ]),
      {
        from: [0, 0, 0],
        to: Ax,
        color: FMM_COLORS.violett,
        label: "Ax",
        onTop: true,
      },
    ],
    [sig[0], sig[1], u1, u2, Ax, entartet],
  );
  const punkte = useMemo<Punkt3D[]>(
    () => [{ p: [0, 0, 0], color: FMM_COLORS.grau, r: 3, onTop: true }],
    [],
  );
  const ebenen = useMemo(
    () =>
      entartet
        ? []
        : [
            {
              p0: [0, 0, 0] as Vec3,
              u: u1,
              v: u2,
              su: halb,
              sv: halb,
              color: FMM_COLORS.gruen,
              opacity: 0.16,
            },
          ],
    [u1, u2, halb, entartet],
  );

  return (
    <div className="mt-4">
      <Aufgabe>
        Drehen wir <span className="font-mono">x</span> im linken Kreis und verfolgen wir sein
        Bild rechts; die Raumtafel lässt sich mit der Maus kippen.
      </Aufgabe>
      <div className="grid gap-4 sm:grid-cols-2">
        <figure className="m-0">
          <TransformCanvas
            matrix={[
              [1, 0],
              [0, 1],
            ]}
            showGrid={false}
            showUnitCircle
            size={230}
            worldHalf={1.5}
            readout={false}
            xLabel="x₁"
            yLabel="x₂"
            ariaLabel={`Einheitskreis im R² mit den rechten Singulärvektoren; der laufende Vektor steht bei ${fmtDe(theta, 0)} Grad.`}
            vectors={[
              { v: x, color: FMM_COLORS.grau, label: "x", draggable: true, dragConstraint: "unitCircle" },
              { v: [v[0][0], v[0][1]], color: FMM_COLORS.blau, label: "v₁" },
              { v: [v[1][0], v[1][1]], color: FMM_COLORS.blau, label: "v₂" },
            ]}
            onVectorChange={(i, w) => {
              if (i === 0) {
                const g = (Math.atan2(w[1], w[0]) * 180) / Math.PI;
                setTheta(((g % 360) + 360) % 360);
              }
            }}
          />
          <figcaption className={`mt-1 text-xs ${W_MUTED}`}>
            Urbild: der Einheitskreis im <span className="font-mono">R²</span>
          </figcaption>
        </figure>
        <figure className="m-0">
          <Surface3D
            size={260}
            xDomain={fenster}
            yDomain={fenster}
            zDomain={fenster}
            zScale={1}
            ticks={false}
            labels={{ x: "y₁", y: "y₂", z: "y₃" }}
            curves={kurven}
            arrows={pfeile}
            points={punkte}
            planes={ebenen}
            azimuth={sicht.azimuth}
            elevation={sicht.elevation}
            onViewChange={setSicht}
            ariaLabel={
              entartet
                ? "Bild des Einheitskreises im Raum: eine Strecke durch den Ursprung."
                : "Bild des Einheitskreises im Raum: eine Ellipse, die flach in der von u₁ und u₂ aufgespannten Ebene liegt."
            }
          />
          <ViewControls value={sicht} onChange={setSicht} reset={{ azimuth: 38, elevation: 24 }} />
          <figcaption className={`mt-1 text-xs ${W_MUTED}`}>
            Bild: die Ellipse in der Ebene <span className="font-mono">col(A)</span> des{" "}
            <span className="font-mono">R³</span>
          </figcaption>
        </figure>
      </div>
      <Slider
        label="Winkel θ"
        value={theta}
        onChange={setTheta}
        min={0}
        max={360}
        step={1}
        unit="°"
        accent={FMM_COLORS.grau}
        fmt={(g) => fmtDe(g, 0)}
      />
      {entartet ? (
        <Verdikt kind="warn" titel="Rang 1:">
          Wegen <span className="font-mono">σ₂ = 0</span> liegt das Bild auf einer Geraden statt
          in einer Ebene; <span className="font-mono">col(A)</span> ist eindimensional
          (Satz 6.2.11). Aus dem Kreis wird eine Strecke der halben Länge{" "}
          {fmtDe(sig[0], 3)}, die doppelt durchlaufen wird.
        </Verdikt>
      ) : (
        <Verdikt kind="neutral">
          Der Kreis landet als Ellipse in der Ebene <span className="font-mono">col(A)</span>,
          aufgespannt von <span className="font-mono">u₁</span> und{" "}
          <span className="font-mono">u₂</span> (Satz 6.2.11). Ihre Halbachsen sind{" "}
          <span className="font-mono">σ₁u₁</span> und <span className="font-mono">σ₂u₂</span> mit{" "}
          {fmtDe(sig[0], 3)} und {fmtDe(sig[1], 3)}; dazwischen läuft ‖Ax‖ hin und her, gerade
          jetzt bei {fmtDe(nAx, 3)}. Obwohl das Bild im{" "}
          <span className="font-mono">R³</span> liegt, ist es zweidimensional: Mehr als zwei
          Richtungen kann eine Matrix mit zwei Spalten nicht erzeugen.
        </Verdikt>
      )}
    </div>
  );
}
