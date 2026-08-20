/**
 * Konzept-Widget für `orthogonality` (Triage C3: KEEP + „Quadrate über den
 * Seiten flächig zeigen").
 *
 * DIE EINE EINSICHT: Der Satz des Pythagoras ist kein Sonderfall für Dreiecke
 * mit einem rechten Winkel, sondern die geometrische Übersetzung von uᵀv = 0.
 * Die beiden kleinen Quadrate füllen das große genau dann, wenn das
 * Skalarprodukt verschwindet; jeder andere Winkel liefert einen sichtbaren
 * Überschuss oder Fehlbetrag von 2uᵀv.
 *
 * FARBROLLEN (Batch-C3-Konvention):
 *   grün = u, der feste Vektor, und sein Kathetenquadrat
 *   rot  = v als Kathete von u nach u+v und sein Quadrat
 *   blau = u+v (das Objekt in der Hand) und das Hypotenusenquadrat
 * Gezogen wird die Spitze von u+v; v ergibt sich als Differenz, damit der
 * Griff genau auf der Dreiecksecke sitzt.
 *
 * PROVENIENZ: Idee des Vergleichs ‖u‖²+‖v‖² gegen ‖u+v‖² aus dem
 * Vorgängerwidget (Stand 2026-08-18); Quadratkonstruktion neu, Achsen und
 * Ziehen aus der Lib-`TransformCanvas`. Texte neu geschrieben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-L2/verify-qa-l2.mjs,
 * 2026-08-20), u = (1,2; 0,6), ‖v‖ ∈ [0,4; 1,2]:
 *   ‖u‖² = 1,8; Richtung von u = 26,565°;
 *   Default (60°, ‖v‖ = 1): uᵀv = 1,1196, ‖u‖²+‖v‖² = 2,8,
 *     ‖u+v‖² = 5,0392, Differenz 2,2392 = 2uᵀv;
 *   rechter Winkel bei 116,565°: uᵀv = 0, beide Seiten 2,8;
 *   bei 140°: uᵀv = −0,5336, ‖u+v‖² = 1,7328, Differenz −1,0672;
 *   ‖v‖ = 1,2 und 116,565°: beide Seiten 3,24 – die Gleichheit hängt nur am
 *     Winkel, nicht an der Länge;
 *   größte Koordinate aller Quadratecken über den ganzen Reglerbereich:
 *     3,4971, deshalb worldHalf = 3,6.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Slider, LabeledTransformCanvas, Verdikt, fmtDe } from "../../lib";

const U: [number, number] = [1.2, 0.6];
const NU2 = U[0] * U[0] + U[1] * U[1];
const HALB = 3.6;
const LMIN = 0.4;
const LMAX = 1.2;

type Pt = [number, number];

/** Quadrat über der Strecke P→Q, auf der von `weg` abgewandten Seite. */
function quadrat(P: Pt, Q: Pt, weg: Pt): Pt[] {
  const d: Pt = [Q[0] - P[0], Q[1] - P[1]];
  const L = Math.hypot(d[0], d[1]);
  if (L < 1e-9) return [P, Q];
  let n: Pt = [d[1] / L, -d[0] / L];
  if ((weg[0] - P[0]) * n[0] + (weg[1] - P[1]) * n[1] > 0) n = [-n[0], -n[1]];
  return [P, Q, [Q[0] + n[0] * L, Q[1] + n[1] * L], [P[0] + n[0] * L, P[1] + n[1] * L]];
}

export function PythagorasWidget() {
  const [deg, setDeg] = useState(60);
  const [laenge, setLaenge] = useState(1);

  const th = (deg * Math.PI) / 180;
  const v: [number, number] = [laenge * Math.cos(th), laenge * Math.sin(th)];
  const summe: [number, number] = [U[0] + v[0], U[1] + v[1]];
  const skalar = U[0] * v[0] + U[1] * v[1];
  const nv2 = v[0] * v[0] + v[1] * v[1];
  const ns2 = summe[0] * summe[0] + summe[1] * summe[1];
  const ortho = Math.abs(skalar) < 0.02;

  const felder: { pts: Pt[]; farbe: string; flaeche: number }[] = [
    { pts: quadrat([0, 0], U, summe), farbe: FMM_COLORS.gruen, flaeche: NU2 },
    { pts: quadrat(U, summe, [0, 0]), farbe: FMM_COLORS.rot, flaeche: nv2 },
    { pts: quadrat([0, 0], summe, U), farbe: FMM_COLORS.blau, flaeche: ns2 },
  ];

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2 text-sm">
      <Aufgabe>
        Ziehen wir die Spitze von u+v, bis die beiden kleinen Quadrate zusammen genau das große füllen.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={[
          [1, 0],
          [0, 1],
        ]}
        showGrid={false}
        showUnitCircle={false}
        size={310}
        worldHalf={HALB}
        vectors={[
          { v: U, color: FMM_COLORS.gruen, label: "u" },
          { v: summe, color: FMM_COLORS.blau, label: "u+v", draggable: true },
        ]}
        onVectorChange={(_i, p) => {
          const d: [number, number] = [p[0] - U[0], p[1] - U[1]];
          const L = Math.hypot(d[0], d[1]);
          if (L < 1e-6) return;
          const w = (Math.atan2(d[1], d[0]) * 180) / Math.PI;
          setDeg((w + 360) % 360);
          setLaenge(Math.min(LMAX, Math.max(LMIN, L)));
        }}
        overlay={(toPx) => (
          <g pointerEvents="none">
            {felder.map((feld, i) => {
              const punkte = feld.pts.map((p) => toPx(p[0], p[1]));
              const mx = punkte.reduce((a, p) => a + p[0], 0) / punkte.length;
              const my = punkte.reduce((a, p) => a + p[1], 0) / punkte.length;
              return (
                <g key={i}>
                  <polygon
                    points={punkte.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ")}
                    fill={feld.farbe}
                    fillOpacity={0.18}
                    stroke={feld.farbe}
                    strokeWidth={1.2}
                  />
                  <text
                    x={mx}
                    y={my + 3}
                    textAnchor="middle"
                    fill={feld.farbe}
                    style={{ fontSize: 10, fontFamily: "ui-monospace, monospace" }}
                  >
                    {fmtDe(feld.flaeche)}
                  </text>
                </g>
              );
            })}
            {/* v ist die Kathete von u nach u+v */}
            <line
              x1={toPx(U[0], U[1])[0]}
              y1={toPx(U[0], U[1])[1]}
              x2={toPx(summe[0], summe[1])[0]}
              y2={toPx(summe[0], summe[1])[1]}
              stroke={FMM_COLORS.rot}
              strokeWidth={2.5}
            />
            <text
              x={(toPx(U[0], U[1])[0] + toPx(summe[0], summe[1])[0]) / 2 + 7}
              y={(toPx(U[0], U[1])[1] + toPx(summe[0], summe[1])[1]) / 2 - 4}
              fill={FMM_COLORS.rot}
              style={{ fontSize: 12 }}
            >
              v
            </text>
          </g>
        )}
        ariaLabel={`Dreieck aus u, v und u+v mit den Quadraten über den drei Seiten; ihre Flächen sind ${fmtDe(NU2)}, ${fmtDe(nv2)} und ${fmtDe(ns2)}.`}
      />
      <Slider label="Richtung von v (°)" value={deg} onChange={setDeg} min={0} max={360} step={0.5} accent={FMM_COLORS.rot} />
      <Slider label="Länge ‖v‖" value={laenge} onChange={setLaenge} min={LMIN} max={LMAX} step={0.01} accent={FMM_COLORS.rot} />
      <p className="mt-1 font-mono text-xs tabular-nums" style={{ color: "var(--w-muted)" }}>
        {fmtDe(NU2)} + {fmtDe(nv2)} = {fmtDe(NU2 + nv2)} vs. {fmtDe(ns2)}
      </p>
      <Verdikt kind={ortho ? "ok" : "warn"}>
        {ortho ? (
          <>
            Getroffen: uᵀv = 0, und die beiden Kathetenquadrate ergeben zusammen exakt das
            Hypotenusenquadrat ({fmtDe(NU2)} + {fmtDe(nv2)} = {fmtDe(ns2)}). Genau das ist
            ‖u+v‖² = ‖u‖² + ‖v‖², und es hängt nur am Winkel: Auch mit einer anderen Länge von
            v bleibt die Gleichheit bestehen.
          </>
        ) : skalar > 0 ? (
          <>
            Das große Quadrat ist um {fmtDe(ns2 - NU2 - nv2)} zu groß. Der Überschuss ist genau
            2uᵀv = {fmtDe(2 * skalar)}: u und v zeigen noch in ähnliche Richtungen, der Winkel
            zwischen ihnen ist spitz.
          </>
        ) : (
          <>
            Jetzt fehlen dem großen Quadrat {fmtDe(NU2 + nv2 - ns2)}, denn 2uᵀv ={" "}
            {fmtDe(2 * skalar)} ist negativ: Der Winkel zwischen u und v ist stumpf. Die
            Gleichheit liegt dazwischen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
