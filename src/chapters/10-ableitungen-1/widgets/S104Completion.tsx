import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Plot,
  Schaetzfrage,
  Slider,
  Stepper,
  Verdikt,
  fmtDe as fmt,
} from "../../../lib";
import { W_BUTTON, W_BUTTON_AKTIV, W_MUTED } from "../../../lib/widgets/surface";

/**
 * §10.4, Anwendung: Matrix Completion auf einer 2x3-Matrix mit vier
 * beobachteten Einträgen. Der alternierende Gradientenabstieg benutzt genau
 * die beiden Gradienten aus Satz 10.4.12.
 *
 * EINE EINSICHT: Zwei Modelle können denselben Verlust null erreichen und
 * trotzdem völlig verschiedene Werte für die Lücken vorhersagen — mehr Rang
 * heißt nicht bessere Rekonstruktion. Deshalb laufen k = 1 und k = 2 hier
 * NEBENEINANDER mit demselben α (Muster 4, Vergleich statt Umschalter).
 *
 * Kein Zufall im Render: Start-U und Start-V sind fest eingebettet, und die
 * gesamte Bahn wird bei jedem Render deterministisch aus diesen Startwerten
 * nachgerechnet.
 *
 * FARBROLLEN (Kapitel 10): beobachtete Werte und f-Werte blau, die Vorhersagen
 * für die Lücken grün (das ist der Ausgabeteil des Modells), Residuen rot,
 * Gradienten orange, das Rang-2-Modell im Vergleichsplot violett.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-10-ableitungen-1/
 * check-s101-s104.mjs, 2026-08-19):
 *   k = 1, α = 0,05: L₀ = 18,8373, L(20) = 1,689e−4, L(200) = 1,233e−24,
 *     L(300) = 2,983e−30; Vorhersagen y₁₃ = 2,5 und y₂₂ = 2,4 (die exakte
 *     Rang-1-Antwort 2·5/4 bzw. 3·4/5);
 *   k = 2, α = 0,05: L(20) = 9,279e−6, L(200) = 2,958e−31; Vorhersagen
 *     y₁₃ = 1,5831 und y₂₂ = 0,9091 — gleicher Verlust, andere Antwort;
 *   α = 0,15: k = 1 pendelt bei L ≈ 1,11 (L(20) = 1,114, L(300) = 1,110),
 *     k = 2 kriecht (L(300) = 0,144);
 *   α = 0,3: beide Ränge laufen davon, L wird NaN.
 */

const BLAU = FMM_COLORS.blau; // beobachtete Werte
const GRUEN = FMM_COLORS.gruen; // Vorhersagen für die Lücken
const ROT = FMM_COLORS.rot; // Residuen
const ORANGE = FMM_COLORS.orange; // Gradienten
const VIOLETT = FMM_COLORS.violett; // das Rang-2-Modell im Vergleich

type Mat = number[][];

const Y: Mat = [
  [5, 3, 0],
  [4, 0, 2],
];
const P: Mat = [
  [1, 1, 0],
  [1, 0, 1],
];

const START: Record<number, { U: Mat; V: Mat }> = {
  1: { U: [[0.9], [0.5]], V: [[1.1], [0.4], [0.7]] },
  2: {
    U: [
      [0.9, -0.3],
      [0.5, 0.8],
    ],
    V: [
      [1.1, 0.2],
      [0.4, -0.6],
      [0.7, 0.5],
    ],
  },
};

const MAX_SCHRITTE = 200;

function transp(A: Mat): Mat {
  return A[0].map((_, j) => A.map((zeile) => zeile[j]));
}

function mul(A: Mat, B: Mat): Mat {
  return A.map((zeile) => B[0].map((_, j) => zeile.reduce((s, v, k) => s + v * B[k][j], 0)));
}

/** Elementweises (Hadamard-)Produkt. */
function hadamard(A: Mat, B: Mat): Mat {
  return A.map((zeile, i) => zeile.map((v, j) => v * B[i][j]));
}

function residuum(U: Mat, V: Mat): Mat {
  const S = mul(U, transp(V));
  return hadamard(
    P,
    Y.map((zeile, i) => zeile.map((v, j) => v - S[i][j])),
  );
}

function verlust(U: Mat, V: Mat): number {
  return 0.5 * residuum(U, V).flat().reduce((s, v) => s + v * v, 0);
}

function schrittWeiter(U: Mat, V: Mat, alpha: number): { U: Mat; V: Mat } {
  const R = residuum(U, V);
  const gU = mul(R, V).map((zeile) => zeile.map((v) => -v));
  const gV = mul(transp(R), U).map((zeile) => zeile.map((v) => -v));
  return {
    U: U.map((zeile, i) => zeile.map((v, j) => v - alpha * gU[i][j])),
    V: V.map((zeile, i) => zeile.map((v, j) => v - alpha * gV[i][j])),
  };
}

function bahnVon(k: number, alpha: number) {
  let U = START[k].U.map((zeile) => [...zeile]);
  let V = START[k].V.map((zeile) => [...zeile]);
  const punkte: { U: Mat; V: Mat; L: number }[] = [{ U, V, L: verlust(U, V) }];
  for (let s = 0; s < MAX_SCHRITTE; s++) {
    const naechst = schrittWeiter(U, V, alpha);
    U = naechst.U;
    V = naechst.V;
    punkte.push({ U, V, L: verlust(U, V) });
  }
  return punkte;
}

function Tafel({
  titel,
  A,
  spalten,
  farbe,
  zelle,
  stellen = 2,
}: {
  titel: string;
  A: Mat;
  spalten: number;
  farbe: string;
  zelle?: (i: number, j: number, v: number) => { text: string; farbe: string };
  stellen?: number;
}) {
  return (
    <div>
      <p className="mb-1 text-xs" style={{ color: farbe }}>
        {titel}
      </p>
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${spalten}, 3.5rem)` }}>
        {A.map((zeile, i) =>
          zeile.map((v, j) => {
            const z = zelle ? zelle(i, j, v) : { text: fmt(v, stellen), farbe: "" };
            return (
              <span
                key={`${i}-${j}`}
                className="rounded border border-slate-300 px-1 py-0.5 text-center font-mono text-xs dark:border-slate-600 [.w-dark_&]:border-slate-600"
                style={z.farbe ? { color: z.farbe } : undefined}
              >
                {z.text}
              </span>
            );
          }),
        )}
      </div>
    </div>
  );
}

function CompletionTafeln() {
  const [alpha, setAlpha] = useState(0.05);
  const [schritt, setSchritt] = useState(0);
  const [detail, setDetail] = useState(1);

  const bahn1 = useMemo(() => bahnVon(1, alpha), [alpha]);
  const bahn2 = useMemo(() => bahnVon(2, alpha), [alpha]);

  const modelle = [1, 2].map((k) => {
    const bahn = k === 1 ? bahn1 : bahn2;
    const jetzt = bahn[schritt];
    return { k, bahn, jetzt, S: mul(jetzt.U, transp(jetzt.V)) };
  });

  const detailModell = modelle[detail - 1];
  const R = residuum(detailModell.jetzt.U, detailModell.jetzt.V);
  const gU = mul(R, detailModell.jetzt.V).map((zeile) => zeile.map((v) => -v));
  const gV = mul(transp(R), detailModell.jetzt.U).map((zeile) => zeile.map((v) => -v));

  // Bei vielen Schritten nur jeden n-ten Punkt zeichnen, sonst verschmieren die
  // Marker zu einem Balken; der letzte Punkt ist immer dabei.
  const stride = Math.max(1, Math.ceil((schritt + 1) / 40));
  const reihe = (bahn: { L: number }[], farbe: string) =>
    bahn
      .slice(0, schritt + 1)
      .map((p, t) => ({ x: t, y: Math.log10(Math.max(p.L, 1e-12)), color: farbe }))
      .filter((_p, t) => t % stride === 0 || t === schritt)
      .filter((p) => Number.isFinite(p.y));
  const punkte = [...reihe(bahn1, BLAU), ...reihe(bahn2, VIOLETT)];
  const yWerte = punkte.map((p) => p.y);
  const yMin = yWerte.length ? Math.min(...yWerte) : -1;
  const yMax = yWerte.length ? Math.max(...yWerte) : 2;
  const yDomain: [number, number] =
    yMax - yMin < 1 ? [yMin - 0.5, yMin + 1.5] : [yMin - 0.3, yMax + 0.3];

  const explodiert = modelle.some((m) => !Number.isFinite(m.jetzt.L));
  const beideKlein = modelle.every((m) => Number.isFinite(m.jetzt.L) && m.jetzt.L < 1e-3);
  const y13 = modelle.map((m) => m.S[0][2]);
  const y22 = modelle.map((m) => m.S[1][1]);
  const unterschied = Math.abs(y13[0] - y13[1]);

  return (
    <div className="space-y-3">
      <Aufgabe>
        Lassen wir beide Modelle mit demselben α laufen und vergleichen die grünen Vorhersagen,
        sobald der Verlust bei beiden auf null gefallen ist.
      </Aufgabe>

      <Tafel
        titel="Y auf Ω (Lücken: ?)"
        A={Y}
        spalten={3}
        farbe={BLAU}
        zelle={(i, j, v) =>
          P[i][j] === 1 ? { text: fmt(v, 1), farbe: BLAU } : { text: "?", farbe: "var(--w-muted, #64748b)" }
        }
      />

      <div className="flex flex-wrap gap-6">
        {modelle.map((m) => (
          <div key={m.k} className="space-y-1">
            <p className="text-sm font-semibold">Rang k = {m.k}</p>
            <Tafel
              titel="UVᵀ (Lücken grün)"
              A={m.S}
              spalten={3}
              farbe={GRUEN}
              zelle={(i, j, v) => ({
                text: Number.isFinite(v) ? fmt(v, 3) : "–",
                farbe: P[i][j] === 1 ? BLAU : GRUEN,
              })}
            />
            <p className="font-mono text-xs">
              L ={" "}
              <span style={{ color: Number.isFinite(m.jetzt.L) ? BLAU : ROT }}>
                {fmt(m.jetzt.L, 6)}
              </span>
            </p>
          </div>
        ))}
        <div className="min-w-0 grow basis-56">
          <Plot
            xLabel="t (Schritt)"
            yLabel="log₁₀ L"
            series={[]}
            markers={punkte}
            xDomain={[0, Math.max(10, schritt)]}
            yDomain={yDomain}
            width={300}
            height={210}
            ariaLabel="Der Verlust beider Modelle je Schritt auf logarithmischer Skala."
          />
          <p className={`mt-1 text-xs ${W_MUTED}`}>
            <span style={{ color: BLAU }}>●</span> k = 1 &nbsp;
            <span style={{ color: VIOLETT }}>●</span> k = 2
          </p>
        </div>
      </div>

      <Slider
        label="α (Lernrate)"
        value={alpha}
        onChange={(v) => {
          setAlpha(Math.round(v * 1000) / 1000);
          setSchritt(0);
        }}
        min={0.01}
        max={0.3}
        step={0.005}
        accent={ORANGE}
        fmt={(v) => fmt(v, 3)}
      />
      <Stepper
        step={schritt}
        setStep={setSchritt}
        max={MAX_SCHRITTE}
        narration={
          <>
            t = {schritt}: L₍k=1₎ = {fmt(modelle[0].jetzt.L, 6)}, L₍k=2₎ ={" "}
            {fmt(modelle[1].jetzt.L, 6)}
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className={`text-xs ${W_MUTED}`}>Gradienten aus Satz 10.4.12 für:</span>
        {[1, 2].map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={detail === k}
            className={detail === k ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setDetail(k)}
          >
            k = {k}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        <Tafel
          titel="PΩ ⊙ (Y − UVᵀ)"
          A={R}
          spalten={3}
          farbe={ROT}
          zelle={(_i, _j, v) => ({ text: fmt(v, 3), farbe: ROT })}
        />
        <Tafel
          titel="∂L/∂U"
          A={gU}
          spalten={detail}
          farbe={ORANGE}
          zelle={(_i, _j, v) => ({ text: fmt(v, 3), farbe: ORANGE })}
        />
        <Tafel
          titel="∂L/∂V"
          A={gV}
          spalten={detail}
          farbe={ORANGE}
          zelle={(_i, _j, v) => ({ text: fmt(v, 3), farbe: ORANGE })}
        />
      </div>

      <Verdikt kind={explodiert ? "fail" : beideKlein ? "warn" : "neutral"}>
        {explodiert ? (
          <>
            Bei dieser Lernrate wachsen die Einträge von U und V über jede Grenze, das Produkt
            der Überläufe ist keine Zahl mehr und L wird undefiniert. Satz 10.4.12 liefert
            weiter die richtigen Gradienten, nur die Schrittweite ist zu groß. Zurücksetzen und α
            kleiner wählen.
          </>
        ) : beideKlein ? (
          <>
            Beide Modelle haben den Verlust praktisch auf null gedrückt (L ={" "}
            <span className="font-mono">{fmt(modelle[0].jetzt.L, 6)}</span> bzw.{" "}
            <span className="font-mono">{fmt(modelle[1].jetzt.L, 6)}</span>) und treffen die
            vier beobachteten Einträge exakt. Für die Lücken sagen sie trotzdem verschiedenes
            voraus:{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              y₁₃ = {fmt(y13[0], 3)}
            </span>{" "}
            gegen{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              {fmt(y13[1], 3)}
            </span>{" "}
            und{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              y₂₂ = {fmt(y22[0], 3)}
            </span>{" "}
            gegen{" "}
            <span className="font-mono" style={{ color: GRUEN }}>
              {fmt(y22[1], 3)}
            </span>
            . Mit k = 1 ist die Antwort eindeutig: drei Beobachtungen legen die Verhältnisse
            fest, die vierte fixiert den Rest. Mit k = 2 stehen zehn Parameter vier
            Beobachtungen gegenüber, und wohin die Vorhersage läuft, entscheidet allein der
            Startpunkt. Ein kleiner Verlust ist deshalb kein Gütesiegel für die Lücken.
          </>
        ) : (
          <>
            Nach {schritt} Schritten steht der Verlust bei{" "}
            <span className="font-mono">{fmt(modelle[0].jetzt.L, 6)}</span> (k = 1) und{" "}
            <span className="font-mono">{fmt(modelle[1].jetzt.L, 6)}</span> (k = 2). Die roten
            Residuen sind die Abweichungen auf den beobachteten Plätzen; auf den beiden Lücken
            steht dort null, weil PΩ sie ausblendet. Die orangen Gradienten sind die Bausteine
            des nächsten Schritts. Die beiden Vorhersagen für y₁₃ unterscheiden sich derzeit um{" "}
            <span className="font-mono">{fmt(unterschied, 3)}</span>.
          </>
        )}
      </Verdikt>
    </div>
  );
}

export function MatrixCompletionDemo() {
  return (
    <Schaetzfrage
      variante="auswahl"
      frage={
        <>
          Beide Modelle drücken den Verlust auf den beobachteten Einträgen auf null. Sagen sie
          dann auch dieselben Werte für die beiden Lücken voraus?
        </>
      }
      optionen={[
        { id: "ja", text: "ja, der Verlust bestimmt alles" },
        { id: "nein", text: "nein, die Lücken bleiben offen" },
      ]}
      loesung="nein"
      verdeckt={
        <p className="text-sm">
          Der Verlust misst nur die beobachteten Plätze. Was auf den Lücken steht, legt erst
          die Modellklasse fest, und k = 2 ist so groß, dass sie nichts mehr festlegt.
        </p>
      }
    >
      <CompletionTafeln />
    </Schaetzfrage>
  );
}
