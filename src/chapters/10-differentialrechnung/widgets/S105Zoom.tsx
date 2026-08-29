import { useMemo, useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Schaetzfrage,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  clamp,
  fmtDe,
  fmtInt,
  useDrag,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §10.5: Die EINE Einsicht — differenzierbar heißt „lokal linear": Zoomen wir
 * weit genug in eine differenzierbare Stelle hinein, wird der Graph von einer
 * Geraden ununterscheidbar. An einem Knick passiert das nie, egal wie weit wir
 * zoomen.
 *
 * Eigenbau, kein portierter Code; das Zoom-Muster ist die kanonische Figur zum
 * Ableitungsbegriff (Muster 2 aus design-patterns.md, Victor 2011). Ersetzt die
 * Interaktivität, die aus `S111Merkregel.tsx` herausgenommen wurde (dort steht
 * jetzt eine statische Tafel).
 *
 * Gemessen wird die Abweichung von der Geraden in Einheiten der halben
 * Fensterbreite w:
 *   D(w) = max_{|t| ≤ w} |f(x₀+t) − S(t)| / w,
 * mit der Sehne S durch die beiden Fensterränder. Genau das ist die Krümmung,
 * die im quadratischen Fenster SICHTBAR ist: Das Fenster ist [x₀−w, x₀+w] ×
 * [f(x₀)−w, f(x₀)+w], beim Zoomen skalieren also beide Achsen gleich.
 *
 * Bedienung: Die Tafel selbst ist der Griff (Klicken/Ziehen zentriert das
 * Fenster auf die angeklickte Stelle, `useDrag`-Flächengriff), Doppelpfad ist
 * der Regler „x₀"; die Zoomstufe ist ein Regler, weil das Halbieren des
 * Fensters die Lektion ist.
 *
 * Farbrollen Kapitel 10 (= Kapitel 10): Funktion blau, Gerade (der lineare
 * Term) grün, Abweichung rot.
 *
 * Deterministisch: drei fest verdrahtete Funktionen, kein Zufall, keine
 * Animationsschleife.
 *
 * Verifizierte Zahlen (scripts/verify/REV29/10-differentialrechnung-S105Zoom.mjs,
 * 2026-08-29), analytisch und numerisch übereinstimmend:
 *   f(x) = x²:  D(w) = w für JEDE Stelle x₀ — halbe Fensterbreite halbiert,
 *               Abweichung halbiert (Quotient 2,0000 auf allen Stufen);
 *   f(x) = |x|: bei x₀ = 0 ist D(w) = 1 für jedes w (auch für w = 10⁻⁶),
 *               der Quotient bleibt 1; bei x₀ = 0,5 und w < 0,5 ist D = 0
 *               (gemessen 10⁻¹⁵, reines Rundungsrauschen);
 *   f(x) = √|x|: bei x₀ = 0 ist D(w) = 1/√w, also 1 bei w = 1, 2 bei w = 0,25
 *               und 10 bei w = 0,01 — die Abweichung WÄCHST beim Hineinzoomen
 *               (Quotient 0,7071 = 1/√2), und der Graph verlässt das Fenster
 *               bei w = 0,01 um den Faktor 10 nach oben.
 * Die einseitigen Differenzenquotienten von |x| in 0 sind exakt +1 und −1
 * (geprüft für h = 0,5, 0,01, 10⁻⁸), passend zu Beispiel 10.5.3.
 * Auf der Zoomleiter des Reglers (w = 2^(−z), z = 0 … 12, x₀ = 0) steht bei x²
 * genau w (also 1; 0,5; 0,25; … 0,000244), bei |x| auf jeder Stufe 1,00000 und
 * bei √|x| 1; 1,414; 2; 2,828; 4; … 64 — dasselbe Skript, Abschnitt
 * „Zoomleiter". Das Skript rechnet D(w) mit demselben Raster wie das Widget
 * und prüft es gegen die analytischen Werte w, 1 und 1/√w.
 */

const BLAU = FMM_COLORS.blau; // Funktion
const GRUEN = FMM_COLORS.gruen; // Sehne, also der lineare Term
const ROT = FMM_COLORS.rot; // Abweichung von der Geraden

interface Kurve {
  id: string;
  label: string;
  f: (x: number) => number;
  /** Stellen, an denen die Funktion nicht differenzierbar ist */
  knick: number[];
  art: "glatt" | "knick" | "senkrecht";
}

const KURVEN: Kurve[] = [
  { id: "quadrat", label: "f(x) = x²", f: (x) => x * x, knick: [], art: "glatt" },
  { id: "betrag", label: "f(x) = |x|", f: (x) => Math.abs(x), knick: [0], art: "knick" },
  {
    id: "wurzel",
    label: "f(x) = √|x|",
    f: (x) => Math.sqrt(Math.abs(x)),
    knick: [0],
    art: "senkrecht",
  },
];

const SIZE = 260;
const PAD_L = 34;
const PAD_B = 18;
const PAD_R = 8;
/**
 * Zahl der Teilintervalle im Fenster. GERADE, damit die Fenstermitte t = 0
 * exakt auf dem Raster liegt (Muster wie `S101Sekante.tsx:104`): bei einer
 * ungeraden Zahl wird der Knick nie getroffen, und die gemessene Abweichung
 * fällt um den Faktor (1 − 1/N) zu klein aus.
 */
const N = 600;

const fmt = (v: number, d = 3) => fmtDe(v, d);

/**
 * Halbe Fensterbreite aus der Zoomstufe: w = 2^(−z). Zweierpotenzen, weil die
 * Lektion das Halbieren ist: Jeder Schritt am Regler halbiert das Fenster.
 * Voreingestellt ist z = 1 (w = 0,5); dort passt die Parabel samt Sehne
 * vollständig ins quadratische Fenster, ist aber noch sichtbar gekrümmt.
 */
const breite = (z: number) => 2 ** -z;
const Z_MAX = 12;

export function ZoomWidget() {
  const [kurveId, setKurveId] = useState("quadrat");
  const [x0, setX0] = useState(0);
  const [z, setZ] = useState(1);

  const kurve = KURVEN.find((k) => k.id === kurveId) ?? KURVEN[0];
  const w = breite(z);
  const f0 = kurve.f(x0);

  /** Sehne durch die beiden Fensterränder und die größte Abweichung davon. */
  const { sehne, dRel, tMax } = useMemo(() => {
    const a = kurve.f(x0 - w);
    const b = kurve.f(x0 + w);
    const linie = (t: number) => a + ((b - a) * (t + w)) / (2 * w);
    let m = 0;
    let arg = 0;
    const pruefe = (t: number) => {
      const d = Math.abs(kurve.f(x0 + t) - linie(t));
      if (d > m) {
        m = d;
        arg = t;
      }
    };
    for (let i = 0; i <= N; i++) pruefe(-w + (2 * w * i) / N);
    // Die Ausnahmestellen selbst kommen zusätzlich ins Raster: dort liegt das
    // Maximum, und bei krummen x₀ träfe es das gleichmäßige Raster nicht.
    for (const k of kurve.knick) if (Math.abs(k - x0) <= w) pruefe(k - x0);
    return { sehne: linie, dRel: m / w, tMax: arg };
  }, [kurve, x0, w]);

  const px = (x: number) => PAD_L + ((x - (x0 - w)) / (2 * w)) * SIZE;
  const py = (y: number) => SIZE / 2 - ((y - f0) / w) * (SIZE / 2);

  /**
   * Die ganze Tafel ist der Griff: Ein Klick zentriert das Fenster auf die
   * angeklickte Stelle. Wer die Taste gedrückt hält, schiebt die Stelle weiter,
   * solange der Zeiger neben der Mitte steht (das Fenster wird bei jedem
   * Zeigerereignis neu um x₀ zentriert, der Abstand zur Mitte wirkt also wie
   * eine Schiebegeschwindigkeit). Doppelpfad ist der
   * Regler „x₀" darunter (er rastet zusätzlich auf Vielfache von 0,05, sodass
   * die Ausnahmestelle 0 exakt getroffen werden kann).
   */
  const zieh = useDrag<"x0">({
    feld: { x0: PAD_L, y0: 0, w: SIZE, h: SIZE },
    welt: { x0: x0 - w, x1: x0 + w, y0: f0 - w, y1: f0 + w },
    clamp: ([x, y]) => [clamp(x, -1, 1), y],
    onDrag: ([x]) => setX0(x),
    flaechenCursor: "crosshair",
  });

  const pfad = useMemo(() => {
    const teile: string[] = [];
    let offen = true;
    for (let i = 0; i <= N; i++) {
      const t = -w + (2 * w * i) / N;
      const y = kurve.f(x0 + t);
      const yy = py(y);
      // Weit außerhalb des Fensters brechen wir den Pfad ab, statt eine
      // sinnlose Gerade quer durch das Bild zu ziehen.
      if (yy < -4 * SIZE || yy > 5 * SIZE) {
        offen = true;
        continue;
      }
      teile.push(`${offen ? "M" : "L"}${px(x0 + t).toFixed(2)},${yy.toFixed(2)}`);
      offen = false;
    }
    return teile.join(" ");
    // px/py hängen an denselben Zuständen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kurve, x0, w]);

  const imFenster = kurve.knick.some((k) => Math.abs(k - x0) <= w);
  const knickInMitte = kurve.knick.some((k) => Math.abs(k - x0) < 1e-9);

  let art: "neutral" | "ok" | "warn" | "fail" = "neutral";
  let verdikt: string;
  if (kurve.art === "glatt" || !imFenster) {
    art = dRel < 0.05 ? "ok" : "neutral";
    verdikt =
      `Die Abweichung von der grünen Geraden beträgt das ${fmt(dRel, 4)}-fache der halben ` +
      `Fensterbreite w. ` +
      `${dRel < 0.05 ? "Auf dieser Zoomstufe ist der Unterschied zwischen Kurve und Gerade kaum noch zu sehen. " : "Noch ist die Krümmung sichtbar. "}` +
      `Jeder Schritt am Zoomregler halbiert das Fenster und halbiert damit auch diese Zahl; im ` +
      `Grenzwert geht sie gegen null: ` +
      `Das ist die Aussage von ${ref("definition:differenzierbarkeit")}, dass der Rest o(h) ist. Die Gerade selbst hat ` +
      `die Steigung der Ableitung an dieser Stelle, und weil f dort differenzierbar ist, ist f ` +
      `nach ${ref("satz:stetigkeit-aus-differenzierbarkeit")} dort auch stetig.`;
  } else if (kurve.art === "knick" && knickInMitte) {
    art = "fail";
    verdikt =
      `Hier bleibt die Abweichung beim ${fmt(dRel, 4)}-fachen von w stehen, und zwar auf JEDER ` +
      `Zoomstufe: Der Knick sieht bei w = 2⁻¹² genauso aus wie bei w = 1. Eine Gerade, die den Graphen ` +
      `in der Nähe von 0 ersetzt, gibt es also nicht. In Zahlen ist das der Befund aus ` +
      `${ref("beispiel:die-betragsfunktion-am-nullpunkt")}: Der Differenzenquotient strebt von rechts gegen +1 und von links gegen −1, ` +
      `und ${ref("definition:differenzierbarkeit")} verlangt einen einzigen Wert. Stetig ist |x| in 0 trotzdem – die ` +
      `Umkehrung von ${ref("satz:stetigkeit-aus-differenzierbarkeit")} gilt eben nicht.`;
  } else if (kurve.art === "knick") {
    art = "warn";
    verdikt =
      `Der Knick liegt noch im Fenster, aber nicht in seiner Mitte: die Abweichung beträgt ` +
      `das ${fmt(dRel, 4)}-fache von w. Zoomen wir weiter hinein, so rutscht er hinaus, und übrig ` +
      `bleibt ein exakt gerades Stück. Genau das ist der Punkt: |x| ist an jeder Stelle außer 0 ` +
      `differenzierbar, die eine Ausnahmestelle steckt nicht in der Funktion, sondern in der Stelle.`;
  } else if (knickInMitte) {
    art = "fail";
    verdikt =
      `Hier läuft es in die andere Richtung: Die Abweichung wächst auf das ${fmt(dRel, 3)}-fache ` +
      `von w, und sie wächst weiter, je tiefer wir zoomen (sie verhält sich wie 1/√w). ` +
      `Der Graph steht am Ende senkrecht und verlässt das Bild nach oben. Auch das ist ein Fall ` +
      `von nicht differenzierbar, und zwar ein anderer als der Knick: Hier existiert der Grenzwert ` +
      `des Differenzenquotienten nicht, weil er über jede Grenze wächst. Stetig ist √|x| in 0 ` +
      `dennoch.`;
  } else {
    art = "warn";
    verdikt =
      `Die Stelle 0 liegt im Fenster, aber nicht in der Mitte; die Abweichung beträgt ` +
      `das ${fmt(dRel, 4)}-fache von w. Weiter hineingezoomt verschwindet sie aus dem Bild, und ` +
      `zurück bleibt eine glatte Kurve: Außerhalb der 0 ist √|x| differenzierbar.`;
  }

  const zoomfaktor = 2 ** z;

  return (
    <div className="space-y-3">
      <Aufgabe>
        Zoomen wir mit dem Regler „Zoomstufe“ in die Stelle x₀ hinein und achten darauf, wann die
        blaue Kurve von der grünen Geraden nicht mehr zu unterscheiden ist. Ein Klick ins Bild oder
        der Regler „x₀“ verschiebt die Stelle.
      </Aufgabe>
      <p className={`max-w-prose text-xs ${W_MUTED}`}>
        Blau: die Funktion. Grün: die Sehne durch die beiden Fensterränder, also die Gerade, die im
        Fenster am besten passt. Rot: die größte Abweichung zwischen beiden, gemessen in Vielfachen
        der halben Fensterbreite w. Das Fenster ist quadratisch, beide Achsen werden beim Zoomen
        gleich gestaucht.
      </p>

      <div className="flex flex-wrap gap-2">
        {KURVEN.map((k) => (
          <button
            key={k.id}
            type="button"
            aria-pressed={k.id === kurveId}
            className={k.id === kurveId ? W_BUTTON_AKTIV : W_BUTTON}
            onClick={() => setKurveId(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>

      <Slider
        label="x₀ (Stelle)"
        value={x0}
        onChange={(v) => setX0(Math.round(v * 20) / 20)}
        min={-1}
        max={1}
        step={0.05}
        fmt={(v) => fmt(v, 2)}
      />
      <Slider
        label="Zoomstufe z"
        value={z}
        onChange={(v) => setZ(Math.round(v))}
        min={0}
        max={Z_MAX}
        step={1}
        fmt={() => `${fmtInt(zoomfaktor)}×`}
      />

      <svg
        viewBox={`0 0 ${PAD_L + SIZE + PAD_R} ${SIZE + PAD_B}`}
        width={PAD_L + SIZE + PAD_R}
        height={SIZE + PAD_B}
        role="img"
        aria-label={`${kurve.label} im Fenster der halben Breite ${fmt(w, 4)} um x₀ = ${fmt(x0, 2)}; die Abweichung von der Geraden beträgt das ${fmt(dRel, 3)}-fache davon.`}
        className="h-auto max-w-full rounded border"
        {...zieh.svgProps}
        {...zieh.surfaceProps("x0")}
        style={{
          background: "var(--w-bg)",
          borderColor: "var(--w-border)",
          ...zieh.svgProps.style,
          ...zieh.surfaceProps("x0").style,
        }}
      >
        <defs>
          <clipPath id="s111-zoom-clip">
            <rect x={PAD_L} y={0} width={SIZE} height={SIZE} />
          </clipPath>
        </defs>
        {/* Achsenkreuz nur, wenn 0 im Fenster liegt: bei tiefem Zoom liegt es draußen. */}
        {Math.abs(x0) <= w && (
          <line x1={px(0)} x2={px(0)} y1={0} y2={SIZE} stroke="var(--w-grid-strong)" strokeWidth={0.8} />
        )}
        {Math.abs(f0) <= w && (
          <line x1={PAD_L} x2={PAD_L + SIZE} y1={py(0)} y2={py(0)} stroke="var(--w-grid-strong)" strokeWidth={0.8} />
        )}
        <g clipPath="url(#s111-zoom-clip)">
          <line
            x1={px(x0 - w)}
            y1={py(sehne(-w))}
            x2={px(x0 + w)}
            y2={py(sehne(w))}
            stroke={GRUEN}
            strokeWidth={2}
            strokeDasharray="6 4"
          />
          <path d={pfad} fill="none" stroke={BLAU} strokeWidth={2.4} />
          {dRel > 0.004 && (
            <line
              x1={px(x0 + tMax)}
              y1={py(sehne(tMax))}
              x2={px(x0 + tMax)}
              y2={py(kurve.f(x0 + tMax))}
              stroke={ROT}
              strokeWidth={3}
            />
          )}
          <circle cx={px(x0)} cy={py(f0)} r={4} fill={BLAU} />
        </g>
        <rect
          x={PAD_L}
          y={0}
          width={SIZE}
          height={SIZE}
          fill="none"
          stroke="var(--w-border)"
          strokeWidth={1}
        />
        <text x={PAD_L - 4} y={12} textAnchor="end" fill="var(--w-text)" fontSize={10}>
          {fmt(f0 + w, 3)}
        </text>
        <text x={PAD_L - 4} y={SIZE - 2} textAnchor="end" fill="var(--w-text)" fontSize={10}>
          {fmt(f0 - w, 3)}
        </text>
        <text x={PAD_L} y={SIZE + 12} textAnchor="start" fill="var(--w-text)" fontSize={10}>
          {fmt(x0 - w, 3)}
        </text>
        <text x={PAD_L + SIZE} y={SIZE + 12} textAnchor="end" fill="var(--w-text)" fontSize={10}>
          {fmt(x0 + w, 3)}
        </text>
      </svg>

      <div className="max-w-prose font-mono text-sm">
        <div>
          halbe Fensterbreite w = 2^(−{z}) = {fmt(w, 6)} (Zoomfaktor {fmtInt(zoomfaktor)}×)
        </div>
        <div style={{ color: ROT }}>Abweichung von der Geraden: {fmt(dRel, 4)} · w</div>
      </div>

      <Verdikt kind={art}>{verdikt}</Verdikt>
    </div>
  );
}

/**
 * Der Abschnitts-Baustein: erst tippen, dann zoomen. Verifiziert
 * (scripts/verify/REV29/10-differentialrechnung-S105Zoom.mjs, 2026-08-29):
 * D(w) → 0 nur bei x², bei |x| konstant 1, bei √|x| wachsend wie 1/√w.
 */
export function ZoomSchaetzung() {
  return (
    <Schaetzfrage
      frage="Welche der drei Kurven wird beim Hineinzoomen auf x₀ = 0 von einer Geraden ununterscheidbar?"
      variante="auswahl"
      loesung="quadrat"
      optionen={[
        { id: "quadrat", text: "nur x²" },
        { id: "betrag", text: "nur |x|" },
        { id: "alle", text: "alle drei" },
        { id: "keine", text: "keine" },
      ]}
      verdeckt={
        <p className="max-w-prose text-sm">
          Nur x². Die Abweichung von der Geraden fällt dort proportional zur Fensterbreite, halbiert
          sich also mit jeder Halbierung des Fensters. Bei |x| bleibt sie auf jeder Zoomstufe exakt
          gleich, bei √|x| wächst sie sogar, und der Graph stellt sich immer steiler.
        </p>
      }
    >
      <ZoomWidget />
    </Schaetzfrage>
  );
}
