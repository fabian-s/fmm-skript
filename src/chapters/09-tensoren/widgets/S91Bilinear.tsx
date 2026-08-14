import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * Bilinearitäts-Demo für §9.1: die Rechtecksfläche f(x, y) = xy.
 *
 * Zwei Slider stellen die Seitenlängen ein, das SVG zeichnet das Rechteck samt
 * Achsen. Verdoppeln wir beide Seiten, zerfällt das grosse Rechteck sichtbar in
 * VIER Kopien des kleinen; halten wir das zweite Argument fest, sind es nur
 * ZWEI. Damit steht die Nichtlinearität neben der Linearität im einzelnen
 * Argument, ohne dass eine Formel nötig wäre.
 *
 * Eigenbau (kein Recycling aus fremden Apps): Aufbau, Rechnung und sämtliche
 * Texte sind für dieses Kapitel geschrieben. Farbcode wie im Kapitel: erstes
 * Argument blau, zweites grün, Funktionswert orange, Warnung rot.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ORANGE = "#E69F00";
const ROT = "#D55E00";
const GRAU = "#64748b";

const EINHEIT = 36; // Pixel je Längeneinheit
const SPANNE = 6.7; // sichtbarer Bereich beider Achsen
const PAD_L = 34;
const PAD_R = 18;
const PAD_T = 16;
const PAD_B = 30;
const FELD = SPANNE * EINHEIT;
const BREITE = PAD_L + FELD + PAD_R;
const HOEHE = PAD_T + FELD + PAD_B;
const TICKS = [0, 1, 2, 3, 4, 5, 6];

const sx = (v: number) => PAD_L + v * EINHEIT;
const sy = (v: number) => PAD_T + FELD - v * EINHEIT;

/** Zahlformat mit deutschem Komma; trennt NaN sauber von ±∞. */
function fmt(v: number, stellen = 2): string {
  if (Number.isNaN(v)) return "nicht definiert";
  if (!Number.isFinite(v)) return v > 0 ? "∞" : "−∞";
  return v.toFixed(stellen).replace(".", ",");
}

export function BilinearitaetsDemo() {
  const [x, setX] = useState(1.6);
  const [y, setY] = useState(1.1);
  const [yFest, setYFest] = useState(false);

  const flaeche = x * y;
  const gx = 2 * x; // die erste Seite wird immer verdoppelt
  const gy = yFest ? y : 2 * y; // die zweite nur, wenn sie nicht festgehalten ist
  const gflaeche = gx * gy;
  // Echter 0/0-Fall auf den Achsen: das Verhältnis ist dort nicht definiert.
  const verhaeltnis = gflaeche / flaeche;
  const entartet = Number.isNaN(verhaeltnis);

  const kopien = yFest ? 2 : 4;
  const skalenFarbe = yFest ? BLAU : ROT;
  const grosseFormel = yFest ? "f(2x, y) = 2 · f(x, y)" : "f(2x, 2y) = 4 · f(x, y)";

  return (
    <div>
      <p className="text-sm">
        Stellen wir die beiden Seitenlängen ein und sehen wir nach, was mit der Fläche
        passiert, wenn wir verdoppeln. Das gestrichelte Rechteck gehört zu den
        verdoppelten Argumenten; die dünnen Linien darin zerlegen es in Kopien des
        farbigen Ausgangsrechtecks. Der Knopf hält das zweite Argument{" "}
        <span style={{ color: GRUEN, fontWeight: 600 }}>y</span> fest, sodass nur noch{" "}
        <span style={{ color: BLAU, fontWeight: 600 }}>x</span> verdoppelt wird.
      </p>

      <div className="my-3 max-w-md">
        <Slider
          label="Seite x"
          value={x}
          onChange={setX}
          min={0}
          max={3}
          step={0.1}
          fmt={(v) => fmt(v, 1)}
        />
        <Slider
          label="Seite y"
          value={y}
          onChange={setY}
          min={0}
          max={3}
          step={0.1}
          fmt={(v) => fmt(v, 1)}
        />
      </div>

      <div className="my-2 flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          className="rounded border border-slate-400 px-3 py-1 text-sm"
          onClick={() => setYFest(!yFest)}
        >
          {yFest ? "y wieder mitverdoppeln" : "y festhalten, nur x verdoppeln"}
        </button>
        <span style={{ color: GRAU }}>
          Zustand: x = {fmt(x, 1)}, y = {fmt(y, 1)},{" "}
          {yFest ? "y festgehalten" : "beide Seiten werden verdoppelt"}
        </span>
      </div>

      <div className="overflow-x-auto">
        <svg width={BREITE} height={HOEHE} viewBox={`0 0 ${BREITE} ${HOEHE}`}>
          {/* Achsen mit Skala */}
          <line x1={sx(0)} y1={sy(0)} x2={sx(SPANNE)} y2={sy(0)} stroke={GRAU} />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(SPANNE)} stroke={GRAU} />
          {TICKS.map((t) => (
            <g key={`tx${t}`}>
              <line x1={sx(t)} y1={sy(0)} x2={sx(t)} y2={sy(0) + 4} stroke={GRAU} />
              <text x={sx(t)} y={sy(0) + 16} textAnchor="middle" fontSize={10} fill={GRAU}>
                {t}
              </text>
            </g>
          ))}
          {TICKS.filter((t) => t > 0).map((t) => (
            <g key={`ty${t}`}>
              <line x1={sx(0)} y1={sy(t)} x2={sx(0) - 4} y2={sy(t)} stroke={GRAU} />
              <text x={sx(0) - 8} y={sy(t) + 3} textAnchor="end" fontSize={10} fill={GRAU}>
                {t}
              </text>
            </g>
          ))}

          {/* Rechteck der verdoppelten Argumente */}
          {gflaeche > 0 ? (
            <rect
              x={sx(0)}
              y={sy(gy)}
              width={gx * EINHEIT}
              height={gy * EINHEIT}
              fill={ORANGE}
              fillOpacity={0.08}
              stroke={skalenFarbe}
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
          ) : null}

          {/* Zerlegung in Kopien des Ausgangsrechtecks */}
          {gflaeche > 0 ? (
            <line
              x1={sx(x)}
              y1={sy(0)}
              x2={sx(x)}
              y2={sy(gy)}
              stroke={skalenFarbe}
              strokeWidth={0.75}
            />
          ) : null}
          {gflaeche > 0 && !yFest ? (
            <line
              x1={sx(0)}
              y1={sy(y)}
              x2={sx(gx)}
              y2={sy(y)}
              stroke={skalenFarbe}
              strokeWidth={0.75}
            />
          ) : null}

          {/* Ausgangsrechteck: Fläche orange, Seiten in den Argumentfarben */}
          {flaeche > 0 ? (
            <rect
              x={sx(0)}
              y={sy(y)}
              width={x * EINHEIT}
              height={y * EINHEIT}
              fill={ORANGE}
              fillOpacity={0.3}
              stroke="none"
            />
          ) : null}
          <line x1={sx(0)} y1={sy(0)} x2={sx(x)} y2={sy(0)} stroke={BLAU} strokeWidth={4} />
          <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(y)} stroke={GRUEN} strokeWidth={4} />

          {/* Beschriftungen */}
          {x > 0 ? (
            <text x={sx(x / 2)} y={sy(0) + 16} textAnchor="middle" fontSize={12} fill={BLAU}>
              x
            </text>
          ) : null}
          {y > 0 ? (
            <text x={sx(0) - 10} y={sy(y / 2) + 4} textAnchor="end" fontSize={12} fill={GRUEN}>
              y
            </text>
          ) : null}
          {flaeche > 0 && x >= 0.7 && y >= 0.5 ? (
            <text
              x={sx(x / 2)}
              y={sy(y / 2) + 4}
              textAnchor="middle"
              fontSize={11}
              fill={ORANGE}
              fontWeight={600}
            >
              f(x, y)
            </text>
          ) : null}
          {gflaeche > 0 ? (
            <text
              x={sx(SPANNE) - 2}
              y={PAD_T + 11}
              textAnchor="end"
              fontSize={12}
              fill={skalenFarbe}
              fontWeight={600}
            >
              {grosseFormel}
            </text>
          ) : null}
        </svg>
      </div>

      <p className="mt-2 text-sm">
        {entartet
          ? `Mit x = ${fmt(x, 1)} und y = ${fmt(y, 1)} ist das Rechteck entartet: Die Fläche ist null, und beim Verdoppeln bleibt sie null. Auf den Achsen fallen der lineare und der bilineare Fall zusammen, das Verhältnis der beiden Flächen ist dort nicht definiert.`
          : yFest
            ? `Das gestrichelte Rechteck besteht aus ${kopien} Kopien des farbigen: Verdoppeln wir nur x, verdoppelt sich die Fläche. In diesem einen Argument verhält sich f also genau so, wie wir es von einer linearen Abbildung erwarten.`
            : `Das gestrichelte Rechteck besteht aus ${kopien} Kopien des farbigen: Verdoppeln wir beide Seiten, vervierfacht sich die Fläche. Eine lineare Abbildung würde hier das Doppelte liefern, nicht das Vierfache.`}
      </p>

      <div className="mt-2 font-mono text-xs" style={{ color: GRAU }}>
        <p>
          f(x, y) = x · y = {fmt(x, 1)} · {fmt(y, 1)} = {fmt(flaeche)}
        </p>
        <p className={yFest ? "" : "font-semibold"} style={yFest ? undefined : { color: ROT }}>
          f(2x, 2y) = {fmt(2 * x, 1)} · {fmt(2 * y, 1)} = {fmt(4 * flaeche)} = 4 · f(x, y)
        </p>
        <p className={yFest ? "font-semibold" : ""} style={yFest ? { color: BLAU } : undefined}>
          f(2x, y) = {fmt(2 * x, 1)} · {fmt(y, 1)} = {fmt(2 * flaeche)} = 2 · f(x, y)
        </p>
        <p>
          f(x, 2y) = {fmt(x, 1)} · {fmt(2 * y, 1)} = {fmt(2 * flaeche)} = 2 · f(x, y)
        </p>
        <p>
          {yFest ? "f(2x, y) / f(x, y)" : "f(2x, 2y) / f(x, y)"} = {fmt(verhaeltnis)}
        </p>
      </div>
    </div>
  );
}
