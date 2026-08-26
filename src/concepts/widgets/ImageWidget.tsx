/**
 * Konzept-Widget `image` (Bild / Spaltenraum).
 *
 * DIE EINE EINSICHT: Das Bild ist keine Rechenvorschrift, sondern eine Menge –
 * und bei dieser Rang-1-Matrix ist sie so klein wie möglich, ohne leer zu sein:
 * eine einzige Gerade, auf der jede Ausgabe landet, egal woher wir kommen.
 *
 * FARBROLLEN: rot = der Eingabevektor v, den wir ziehen; blau = seine Ausgabe
 * Av und die Bildgerade span{(1; 0,5)}, auf der sie immer liegt; grau =
 * die Spur der schon besuchten Ausgaben.
 *
 * PROVENIENZ: Aufbau aus dem Vorgängerwidget (Stand 2026-08-18); Achsen,
 * Ziehen und die Gerade als Unterraum kommen aus der Lib-`TransformCanvas`.
 * Umbau 2026-08-26 (Audit): Die Aufgabe lautete „suchen wir eine Ausgabe
 * abseits der blauen Geraden“ und war damit unlösbar. Jetzt ist es eine
 * Vorhersage-/Bestätigungsfigur: Die Spur der besuchten Ausgaben sammelt sich
 * mit, und der größte gemessene Abstand zur Bildgeraden steht als Zahl daneben.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/REV0/ImageWidget.mjs,
 * 2026-08-20), A = [[1, 2], [0,5, 1]]: det A = 0; Ae₁ = (1; 0,5),
 * Ae₂ = (2; 1) = 2·Ae₁, beide Spalten liegen also auf derselben Geraden;
 * A·(2, −1) = (0, 0). Über 12 566 Eingaberichtungen auf dem Kreis mit
 * Radius 1,8 ist der Abstand von Av zur Geraden span{(1; 0,5)} exakt 0.
 * Algebraisch: A(v₁, v₂)ᵀ = (v₁ + 2v₂)·(1; 0,5) für jedes v, der Abstand ist
 * also identisch null. Auch in Gleitkomma: Im gemessenen Abstand (Skalarprodukt
 * mit der Einheitsnormalen) heben sich −0,5(v₁ + 2v₂) und (0,5v₁ + v₂) exakt auf;
 * über 200 000 durchgerechnete Zustände (Richtung × Länge) ist er exakt 0
 * (node, 2026-08-26). Der angezeigte Höchstwert bleibt daher 0,00.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  TransformCanvas,
  Verdikt,
  fmtDe,
  fmtInt,
} from "../../lib";

const A: [[number, number], [number, number]] = [
  [1, 2],
  [0.5, 1],
];
const BILD: [number, number] = [1, 0.5];
/** Einheitsnormale der Bildgeraden: (1; 0,5) normiert, um 90° gedreht. */
const NORMALE: [number, number] = [-0.5 / Math.hypot(1, 0.5), 1 / Math.hypot(1, 0.5)];
const SPUR_MAX = 60;
/** Erst ab diesem Abstand kommt ein neuer Spurpunkt dazu (sonst Punktbrei). */
const SPUR_MIN_ABSTAND = 0.12;
/** Ab so vielen besuchten Ausgaben löst das Verdikt die Vorhersage auf. */
const GENUG = 8;

const bildAn = (v: [number, number]): [number, number] => [
  A[0][0] * v[0] + A[0][1] * v[1],
  A[1][0] * v[0] + A[1][1] * v[1],
];
/** Abstand eines Punktes von der Bildgeraden (Betrag der Normalkomponente). */
const abstandZurGeraden = (p: [number, number]) =>
  Math.abs(p[0] * NORMALE[0] + p[1] * NORMALE[1]);

export function ImageWidget() {
  const [v, setV] = useState<[number, number]>([1.5 * Math.cos(0.8), 1.5 * Math.sin(0.8)]);
  const [spur, setSpur] = useState<[number, number][]>([]);
  const [besucht, setBesucht] = useState(0);
  const [maxAbstand, setMaxAbstand] = useState(0);

  const Av = bildAn(v);
  const laengeAv = Math.hypot(Av[0], Av[1]);
  const winkel = Math.atan2(v[1], v[0]);
  const radius = Math.hypot(v[0], v[1]);

  const setzeV = (nv: [number, number]) => {
    setV(nv);
    const neu = bildAn(nv);
    setBesucht((alt) => alt + 1);
    setMaxAbstand((alt) => Math.max(alt, abstandZurGeraden(neu)));
    setSpur((alt) => {
      const letzter = alt[alt.length - 1];
      if (letzter && Math.hypot(neu[0] - letzter[0], neu[1] - letzter[1]) < SPUR_MIN_ABSTAND) {
        return alt;
      }
      return [...alt, neu].slice(-SPUR_MAX);
    });
  };
  const messwerte =
    besucht === 0
      ? "noch keine Ausgabe geprüft"
      : `${fmtInt(besucht)} Ausgaben geprüft, größter Abstand zur Bildgeraden ${fmtDe(maxAbstand, 2)}`;

  return (
    <div className="mt-2 rounded p-2 [background:var(--w-bg)]">
      <Aufgabe>
        Sagen wir zuerst vorher, wo Av landet, wenn wir v im Kreis herumziehen – und ziehen wir
        dann: die Spur sammelt jede besuchte Ausgabe mit.
      </Aufgabe>
      <TransformCanvas
        matrix={A}
        showGrid={false}
        showUnitCircle={false}
        size={280}
        worldHalf={3.2}
        xLabel="x₁"
        yLabel="x₂"
        vectors={[
          { v, color: FMM_COLORS.rot, label: "v", draggable: true },
          { v: Av, color: FMM_COLORS.blau, label: "Av" },
        ]}
        onVectorChange={(_i, nv) => setzeV([nv[0], nv[1]])}
        lines={[{ dir: BILD, color: FMM_COLORS.blau, label: "Bild(A)" }]}
        overlay={(toPx) => (
          <g aria-hidden="true">
            {spur.map((q, i) => {
              const [px, py] = toPx(q[0], q[1]);
              return <circle key={i} cx={px} cy={py} r={2.5} fill={FMM_COLORS.grau} />;
            })}
          </g>
        )}
        ariaLabel={`Der Eingabevektor v und sein Bild Av, aktuell bei (${fmtDe(Av[0], 2)}; ${fmtDe(Av[1], 2)}), dazu die Gerade durch (1; 0,5) und die Spur der schon besuchten Ausgaben: ${messwerte}.`}
      />
      <Slider
        label="Richtung von v"
        value={winkel}
        onChange={(w) => setzeV([radius * Math.cos(w), radius * Math.sin(w)])}
        min={-Math.PI}
        max={Math.PI}
        step={0.01}
        accent={FMM_COLORS.rot}
      />
      <Slider
        label="Länge von v"
        value={radius}
        onChange={(r) => setzeV([r * Math.cos(winkel), r * Math.sin(winkel)])}
        min={0.2}
        max={3}
        step={0.05}
        accent={FMM_COLORS.rot}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted)" }}>
        <span style={{ color: FMM_COLORS.rot }}>▮</span> Eingabe v ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> Ausgabe Av und die Bildgerade ·{" "}
        <span style={{ color: FMM_COLORS.grau }}>▮</span> Spur der letzten Ausgaben · {messwerte}
      </p>
      <Verdikt kind={besucht >= GENUG ? "ok" : "neutral"}>
        {besucht < GENUG ? (
          <>
            Av = ({fmtDe(Av[0], 2)}; {fmtDe(Av[1], 2)}), Abstand zur blauen Geraden{" "}
            {fmtDe(abstandZurGeraden(Av), 2)}. Prüfen wir noch ein paar Richtungen und Längen.
          </>
        ) : (
          <>
            {messwerte} – die Spur bleibt auf der Geraden: Ausmultipliziert ist
            Av = (v₁ + 2v₂)·(1; 0,5), das Bild also eindimensional und der Rang von A gleich 1.{" "}
            {laengeAv < 0.08 &&
              "Gerade jetzt ist Av auf den Ursprung zusammengefallen: v liegt im Kern, und auch die Null gehört zum Bild."}
          </>
        )}
      </Verdikt>
    </div>
  );
}
