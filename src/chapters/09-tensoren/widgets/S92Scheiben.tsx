import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * Scheiben-Viewer für Tensoren der Stufe 2 und 3 (Skript §9.2).
 *
 * Der Stapel wird isometrisch angedeutet: jede Scheibe ist ein Gitter, die
 * Scheiben sind gegeneinander nach rechts oben versetzt, dünne Kanten
 * verbinden die Ecken der vordersten mit denen der hintersten Scheibe.
 * Slider oder Klick wählen den Scheibenindex k; daneben steht die gewählte
 * Scheibe als Matrix ausgedruckt.
 *
 * Eigenbau (Aufbau, Zahlen und alle Texte): die Abbildungen der Folien
 * stammen aus einem Buch und werden hier nicht übernommen. Farbcode wie im
 * Kapitel; kein Zufall zur Laufzeit, die Einträge sind fest eingebettet
 * bzw. aus einer deterministischen Formel berechnet.
 */

const RED = "#D55E00";
const GREEN = "#009E73";
const BLUE = "#0072B2";
const GREY = "#64748b";

/** Fester 4×4×4-Tensor, gespeichert als ZAHLEN[k][i][j]. */
const ZAHLEN: number[][][] = [
  [
    [-2, -5, -2, -4],
    [8, 8, 2, 1],
    [-6, 4, 6, -2],
    [0, 5, 8, -5],
  ],
  [
    [-2, 8, 9, -4],
    [9, 5, 8, -4],
    [-6, 2, 1, 1],
    [0, 1, 4, 9],
  ],
  [
    [-5, 6, 0, 1],
    [-5, -5, 0, -3],
    [-3, 9, 9, 3],
    [6, 1, -5, 4],
  ],
  [
    [7, -7, 0, -4],
    [5, -1, -6, -3],
    [-3, -3, -7, 4],
    [-1, -3, 1, -1],
  ],
];

const N_BILD = 8;

/** Deterministisches Miniaturbild: Verlauf plus heller Fleck, BILD[k][i][j]. */
const BILD: number[][][] = [0, 1, 2].map((k) =>
  Array.from({ length: N_BILD }, (_, i) =>
    Array.from({ length: N_BILD }, (_, j) => {
      const fleck = i >= 2 && i <= 4 && j >= 4 && j <= 6;
      let v: number;
      if (k === 0) v = fleck ? 245 : 24 + 26 * j;
      else if (k === 1) v = fleck ? 96 : 214 - 22 * i;
      else v = fleck ? 40 : 70 + 18 * ((i + j) % 7);
      return Math.max(0, Math.min(255, v));
    })
  )
);

const KANAL = [
  { name: "Rot", farbe: RED },
  { name: "Grün", farbe: GREEN },
  { name: "Blau", farbe: BLUE },
];

/** Pfeil mit Beschriftung für die Achsenlegende. */
function Achse({
  x1,
  y1,
  x2,
  y2,
  label,
  lx,
  ly,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  lx: number;
  ly: number;
}) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={GREY} strokeWidth={1} markerEnd="url(#s92pfeil)" />
      <text x={lx} y={ly} fontSize={11} fill={GREY} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

/** Die gewählte Scheibe als ausgedruckte Matrix, mit Zeilen- und Spaltenindex. */
function MatrixTafel({
  werte,
  farbe,
  titel,
}: {
  werte: number[][];
  farbe: string;
  titel: string;
}) {
  const n = werte[0].length;
  return (
    <div>
      <div className="mb-1 text-xs" style={{ color: GREY }}>
        {titel}
      </div>
      <div
        className="inline-grid gap-x-2 font-mono text-xs"
        style={{ gridTemplateColumns: `repeat(${n + 1}, auto)` }}
      >
        <span />
        {Array.from({ length: n }, (_, j) => (
          <span key={`kopf-${j}`} className="text-right" style={{ color: GREY }}>
            j={j + 1}
          </span>
        ))}
        {werte.flatMap((zeile, i) => [
          <span key={`zeile-${i}`} className="pr-1 text-right" style={{ color: GREY }}>
            i={i + 1}
          </span>,
          ...zeile.map((v, j) => (
            <span key={`${i}-${j}`} className="text-right" style={{ color: farbe }}>
              {v}
            </span>
          )),
        ])}
      </div>
    </div>
  );
}

export function TensorScheibenViewer() {
  const [modus, setModus] = useState<"zahlen" | "bild">("zahlen");
  const [stufe, setStufe] = useState(3);
  const [kZahl, setKZahl] = useState(1);
  const [kBild, setKBild] = useState(1);

  const bild = modus === "bild";
  const daten = bild ? BILD : ZAHLEN;
  const n = bild ? N_BILD : 4;
  const scheiben = bild ? 3 : stufe === 2 ? 1 : 4;
  const kRoh = bild ? kBild : kZahl;
  const k = Math.min(kRoh, scheiben);
  const setK = bild ? setKBild : setKZahl;

  const zelle = bild ? 15 : 26;
  const gitter = n * zelle;
  const dx = bild ? 30 : 26;
  const dy = bild ? 18 : 16;
  const padL = 46;
  const padT = 30;
  const tiefeX = (scheiben - 1) * dx;
  const tiefeY = (scheiben - 1) * dy;
  const breite = padL + tiefeX + gitter + 26;
  const hoehe = padT + tiefeY + gitter + 34;

  /** Ecke oben links der Scheibe s (1-basiert): k = 1 steht vorne unten. */
  const ecke = (s: number) => ({ x: padL + (s - 1) * dx, y: padT + (scheiben - s) * dy });

  const vorne = ecke(1);
  const hinten = ecke(scheiben);

  const eintraege = n * n * scheiben;
  const farbeAktiv = bild ? KANAL[k - 1].farbe : RED;

  /** Farbe einer Zelle: gewählte Scheibe farbig, die übrigen neutral grau. */
  const fuellung = (s: number) => {
    if (s !== k) return bild ? "#cbd5e1" : "#e2e8f0";
    return bild ? KANAL[s - 1].farbe : RED;
  };

  /** Deckkraft trägt den Zahlenwert: je größer der Betrag, desto kräftiger. */
  const deckkraft = (s: number, i: number, j: number) => {
    const wert = daten[s - 1][i][j];
    if (s !== k) return bild ? 0.3 : 0.5;
    return bild ? 0.12 + 0.88 * (wert / 255) : 0.18 + 0.06 * Math.abs(wert);
  };

  return (
    <div>
      <p className="text-sm">
        Stapeln wir Matrizen: Jede Scheibe ist ein Gitter aus Zahlen, der Stapel ist der
        Tensor. Wählen wir mit dem Schieber oder per Klick eine Scheibe aus, dann steht sie
        rechts als Matrix ausgeschrieben. Im zweiten Modus ist der Stapel ein winziges
        Farbbild, und die drei Scheiben sind seine Farbkanäle.
      </p>

      <div className="my-3 flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1"
          onClick={() => setModus(bild ? "zahlen" : "bild")}
        >
          {bild ? "Zahlen-Tensor zeigen" : "Farbbild zeigen"}
        </button>
        {bild ? null : (
          <button
            type="button"
            className="rounded border border-slate-400 px-3 py-1"
            onClick={() => setStufe(stufe === 3 ? 2 : 3)}
          >
            {stufe === 3 ? "auf Stufe 2 (Matrix) zurückgehen" : "auf Stufe 3 (Tensor) gehen"}
          </button>
        )}
      </div>

      {scheiben > 1 ? (
        <div className="my-2 max-w-md">
          <Slider
            label="Scheibe k"
            value={k}
            onChange={(v) => setK(Math.round(v))}
            min={1}
            max={scheiben}
            step={1}
            fmt={(v) => String(Math.round(v))}
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-start gap-6 overflow-x-auto">
        <svg width={breite} height={hoehe} viewBox={`0 0 ${breite} ${hoehe}`}>
          <defs>
            <marker
              id="s92pfeil"
              markerWidth={7}
              markerHeight={7}
              refX={6}
              refY={3}
              orient="auto"
            >
              <path d="M0,0 L7,3 L0,6 z" fill={GREY} />
            </marker>
          </defs>

          {/* Tiefenkanten von der vordersten zur hintersten Scheibe */}
          {scheiben > 1
            ? [
                [0, 0],
                [gitter, 0],
                [0, gitter],
                [gitter, gitter],
              ].map(([ox, oy], idx) => (
                <line
                  key={idx}
                  x1={vorne.x + ox}
                  y1={vorne.y + oy}
                  x2={hinten.x + ox}
                  y2={hinten.y + oy}
                  stroke={GREY}
                  strokeWidth={0.8}
                  strokeDasharray="3 3"
                />
              ))
            : null}

          {/* Scheiben von hinten nach vorne */}
          {Array.from({ length: scheiben }, (_, idx) => scheiben - idx).map((s) => {
            const { x, y } = ecke(s);
            const aktiv = s === k;
            return (
              <g key={s} onClick={() => setK(s)} style={{ cursor: "pointer" }}>
                <title>{bild ? `Kanal ${KANAL[s - 1].name}` : `Scheibe k = ${s}`}</title>
                <rect
                  x={x - 3}
                  y={y - 3}
                  width={gitter + 6}
                  height={gitter + 6}
                  fill="#ffffff"
                  fillOpacity={aktiv ? 0.96 : 0.88}
                  stroke={aktiv ? farbeAktiv : GREY}
                  strokeWidth={aktiv ? 2.2 : 0.8}
                />
                {daten[s - 1].map((zeile, i) =>
                  zeile.map((_, j) => (
                    <rect
                      key={`${i}-${j}`}
                      x={x + j * zelle}
                      y={y + i * zelle}
                      width={zelle - 1.5}
                      height={zelle - 1.5}
                      fill={fuellung(s)}
                      fillOpacity={deckkraft(s, i, j)}
                      stroke={aktiv ? farbeAktiv : "#94a3b8"}
                      strokeWidth={0.5}
                    />
                  ))
                )}
                <text
                  x={x + gitter + 6}
                  y={y - 6}
                  fontSize={11}
                  fill={aktiv ? farbeAktiv : GREY}
                  fontWeight={aktiv ? 700 : 400}
                >
                  k={s}
                </text>
              </g>
            );
          })}

          {/* Achsen am vorderen Gitter */}
          <Achse
            x1={vorne.x}
            y1={vorne.y + gitter + 12}
            x2={vorne.x + gitter}
            y2={vorne.y + gitter + 12}
            label="j (Spalte)"
            lx={vorne.x + gitter / 2}
            ly={vorne.y + gitter + 26}
          />
          <Achse
            x1={vorne.x - 12}
            y1={vorne.y}
            x2={vorne.x - 12}
            y2={vorne.y + gitter}
            label="i (Zeile)"
            lx={16}
            ly={vorne.y + gitter / 2}
          />
          {scheiben > 1 ? (
            <Achse
              x1={vorne.x + gitter / 2}
              y1={vorne.y - 10}
              x2={vorne.x + gitter / 2 + tiefeX}
              y2={vorne.y - 10 - tiefeY}
              label="k (Scheibe)"
              lx={vorne.x + gitter / 2 + tiefeX / 2}
              ly={vorne.y - 16 - tiefeY}
            />
          ) : null}
        </svg>

        <MatrixTafel
          werte={daten[k - 1]}
          farbe={farbeAktiv}
          titel={
            bild
              ? `Kanal ${KANAL[k - 1].name} (k = ${k}), Intensitäten von 0 bis 255`
              : scheiben === 1
                ? "Die Matrix selbst"
                : `Scheibe k = ${k}, also die Einträge a(i, j, ${k})`
          }
        />

        {bild ? (
          <div>
            <div className="mb-1 text-xs" style={{ color: GREY }}>
              Alle drei Kanäle übereinandergelegt
            </div>
            <svg width={N_BILD * 15} height={N_BILD * 15}>
              {Array.from({ length: N_BILD }, (_, i) =>
                Array.from({ length: N_BILD }, (_, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={j * 15}
                    y={i * 15}
                    width={15}
                    height={15}
                    fill={`rgb(${BILD[0][i][j]}, ${BILD[1][i][j]}, ${BILD[2][i][j]})`}
                  />
                ))
              )}
            </svg>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-sm" style={{ color: GREY }}>
        Zustand: {bild ? "Farbbild" : "Zahlen-Tensor"}, Stufe {bild ? 3 : stufe},{" "}
        {bild ? `${N_BILD} × ${N_BILD} × 3` : scheiben === 1 ? "4 × 4" : "4 × 4 × 4"} ={" "}
        {eintraege} Einträge; gewählt ist{" "}
        {bild ? `Kanal ${KANAL[k - 1].name} (k = ${k})` : scheiben === 1 ? "die einzige Ebene" : `k = ${k}`} mit{" "}
        {n * n} Einträgen.
      </p>

      <p className="mt-1 text-sm" style={{ color: GREY }}>
        {bild
          ? "Jeder Kanal ist für sich eine Matrix von Intensitäten; erst zusammen ergeben die drei Zahlen an einer Pixelposition eine Farbe. Der orangefarbene Fleck sitzt in allen drei Kanälen an derselben Stelle, ist aber nur im Rotkanal heller als seine Umgebung, in Grün und Blau dunkler."
          : scheiben === 1
            ? "Eine Scheibe allein ist nichts anderes als eine Matrix: zwei Indizes, 16 Zahlen. Der Schritt zur Stufe 3 legt drei weitere davon dahinter."
            : "Die nicht gewählten Scheiben sind blass gezeichnet, damit die Auswahl auch dann zu erkennen ist, wenn sie weiter hinten im Stapel liegt. Der Stapel hat viermal so viele Einträge wie eine einzelne Scheibe."}
      </p>
    </div>
  );
}
