import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  useAnimatedValue,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * DIE EINE EINSICHT: Alles, was im Produkt UΣVᵀ auf einen Nullblock von Σ
 * trifft, trägt nichts bei, deshalb darf die Zerlegung auf U_r, Σ_r und V_rᵀ
 * schrumpfen, ohne dass sich A ändert (Satz 6.3.1).
 *
 * Der Umschalter ist ein diskreter Sprung und bekommt deshalb einen Übergang
 * von 250 ms (Muster 12): sonst ist nicht zu sehen, WELCHE Blöcke verschwinden.
 *
 * FARBROLLEN (Kapitel 6): grün = U und seine Teilblöcke, orange = Σ,
 * blau = V; grau = die Matrix A selbst und Nebenangaben. Rot bleibt Rest- und
 * Fehlertermen vorbehalten und kommt hier nicht vor.
 *
 * PROVENIENZ: Aus der privaten mml-ch4-App war hier nichts zu holen (dort
 * werden 2×2-Geometrie und 3D-Perspektive gezeichnet, kein Blockschema);
 * Aufbau, Farben und sämtliche Texte sind eigenes Material.
 *
 * PRÜFSTATUS (scripts/verify/REV29/06-svd-Widgets.mjs, 2026-08-29): Speicherbilanz m² + n² + min(m,n) gegen r(m + n + 1) gegen mn:
 * Voreinstellung m = 5, n = 4, r = 2: 45 gegen 20 gegen 20;
 * Preset r = 1: 45 gegen 10; Preset m = n = r = 4: 36 gegen 36 gegen 16;
 * das Beispiel aus dem Selbsttest (1000 × 50, r = 5): 1 002 550 gegen 5255.
 */

const GREEN = FMM_COLORS.gruen;
const BLUE = FMM_COLORS.blau;
const ORANGE = FMM_COLORS.orange;
const GREY = FMM_COLORS.grau;

const PRESETS: { id: string; name: string; m: number; n: number; r: number }[] = [
  { id: "klein", name: "r < min(m, n)", m: 5, n: 4, r: 2 },
  { id: "rang1", name: "r = 1", m: 5, n: 4, r: 1 },
  { id: "voll", name: "r = m = n", m: 4, n: 4, r: 4 },
];

const CELL = 22;

type BlockId = "Ur" | "Umr" | "Sr" | "S0" | "Vr" | "Vnr";

/** Erklärtext je Block; „bleibt" steuert zugleich die Darstellung. */
const BLOCKS: Record<BlockId, { name: string; bleibt: boolean; text: string }> = {
  Ur: {
    name: "U_r",
    bleibt: true,
    text: "Die ersten r Spalten von U. Sie sind eine Orthonormalbasis des Spaltenraums col(A), also genau die Richtungen, in denen A überhaupt etwas abliefert. Dieser Block bleibt.",
  },
  Umr: {
    name: "U_(m−r)",
    bleibt: false,
    text: "Die letzten m−r Spalten von U spannen den linken Kern auf. Im Produkt treffen sie auf die Nullzeilen von Σ, ihr Beitrag ist also die Nullmatrix. Dieser Block fällt weg.",
  },
  Sr: {
    name: "Σ_r",
    bleibt: true,
    text: "diag(σ₁, …, σ_r) mit lauter positiven Einträgen. Hier steckt die ganze Streckung, und weil kein Diagonaleintrag null ist, lässt sich dieser Block als einziger invertieren. Er bleibt.",
  },
  S0: {
    name: "Nullblöcke von Σ",
    bleibt: false,
    text: "Die letzten m−r Zeilen und die letzten n−r Spalten von Σ bestehen nur aus Nullen. Sie sind der Grund für die ganze Reduktion: Was auf sie trifft, verschwindet.",
  },
  Vr: {
    name: "V_rᵀ",
    bleibt: true,
    text: "Die ersten r Zeilen von Vᵀ, also die ersten r Spalten von V. Sie bilden eine Orthonormalbasis des Zeilenraums col(Aᵀ) und bleiben stehen.",
  },
  Vnr: {
    name: "V_(n−r)ᵀ",
    bleibt: false,
    text: "Die letzten n−r Zeilen von Vᵀ gehören zum Kern von A. Sie treffen auf die Nullspalten von Σ und fallen weg.",
  },
};

const spalten = (k: number) => (k === 1 ? "1 Spalte" : `${k} Spalten`);

/** Beschriftung mit tiefgestelltem Index (und optional hochgestelltem ᵀ). */
function BlockLabel({
  x,
  y,
  base,
  sub,
  hoch,
  fill,
}: {
  x: number;
  y: number;
  base: string;
  sub?: string;
  hoch?: string;
  fill: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={13}
      fontWeight={600}
      fill={fill}
      style={{ pointerEvents: "none" }}
    >
      {base}
      {sub ? (
        <tspan fontSize={9} dy={3}>
          {sub}
        </tspan>
      ) : null}
      {hoch ? (
        <tspan fontSize={9} dy={sub ? -7 : -4}>
          {hoch}
        </tspan>
      ) : null}
    </text>
  );
}

export function ReduzierteSvdBloecke() {
  const [m, setM] = useState(5);
  const [n, setN] = useState(4);
  const [rRoh, setR] = useState(2);
  const [reduziert, setReduziert] = useState(false);
  const [wahl, setWahl] = useState<BlockId>("S0");

  const r = Math.max(1, Math.min(rRoh, m, n));
  const mid = (Math.max(m, n) * CELL) / 2; // gemeinsame Mittellinie aller Matrizen
  // 0 = volle Zerlegung, 1 = reduziert; dazwischen fahren die Blöcke zusammen
  const q = useAnimatedValue(reduziert ? 1 : 0, 250);
  const zeigeVoll = q < 0.995;

  // Zahl der gespeicherten Einträge: volle Zerlegung (Σ nur als Diagonale)
  // gegen reduzierte Zerlegung.
  const speicherVoll = m * m + n * n + Math.min(m, n);
  const speicherRed = r * (m + n + 1);
  const speicherA = m * n;

  /** Ein Block als klickbares Rechteck plus Beschriftung. */
  const Block = ({
    id,
    x,
    y,
    w,
    h,
    farbe,
    base,
    sub,
    hoch,
    leer,
  }: {
    id: BlockId;
    x: number;
    y: number;
    w: number;
    h: number;
    farbe: string;
    base: string;
    sub?: string;
    hoch?: string;
    leer?: boolean;
  }) => {
    if (w <= 0 || h <= 0) return null;
    const aktiv = wahl === id;
    return (
      // Tastaturweg: role="button" + tabIndex + Enter/Leertaste. Ohne das war
      // die Blockauswahl – und damit das ganze Verdikt – nur mit der Maus
      // erreichbar, und das role="img" des SVG versteckte die Blöcke zusätzlich
      // vor Screenreadern.
      <g
        role="button"
        tabIndex={0}
        aria-pressed={aktiv}
        aria-label={BLOCKS[id].name}
        onClick={() => setWahl(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            setWahl(id);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <title>{BLOCKS[id].name}</title>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          fill={farbe}
          fillOpacity={leer ? (aktiv ? 0.14 : 0.04) : aktiv ? 0.55 : 0.22}
          stroke={farbe}
          strokeWidth={aktiv ? 2.5 : 1}
          strokeDasharray={leer ? "4 3" : undefined}
        />
        {w >= 30 && h >= 18 ? (
          <BlockLabel
            x={x + w / 2}
            y={y + h / 2 + 4}
            base={base}
            sub={sub}
            hoch={hoch}
            fill={farbe}
          />
        ) : null}
      </g>
    );
  };

  /** Formatzeile unter einer Matrix. */
  const Format = ({ x, y, text }: { x: number; y: number; text: string }) => (
    <text x={x} y={y} textAnchor="middle" fontSize={11} fill={GREY}>
      {text}
    </text>
  );

  const Op = ({ x, y, z }: { x: number; y: number; z: string }) => (
    <text x={x} y={y} textAnchor="middle" fontSize={15} fill={GREY}>
      {z}
    </text>
  );

  // Waagerechte Anordnung: A = U · Σ · Vᵀ, im reduzierten Modus mit den
  // geschrumpften Faktoren U_r · Σ_r · V_rᵀ.
  const misch = (klein: number, gross: number) => (klein + (gross - klein) * (1 - q)) * CELL;
  const wA = n * CELL;
  const hA = m * CELL;
  const wU = misch(r, m);
  const hU = m * CELL;
  const wS = misch(r, n);
  const hS = misch(r, m);
  const wV = n * CELL;
  const hV = misch(r, n);

  const gap = 26;
  const xA = 4;
  const xU = xA + wA + gap;
  const xS = xU + wU + gap;
  const xV = xS + wS + gap;
  const breite = xV + wV + 8;
  const yFormat = Math.max(m, n) * CELL + 18;
  const hoehe = yFormat + 12;

  const yA = mid - hA / 2;
  const yU = mid - hU / 2;
  const yS = mid - hS / 2;
  const yV = mid - hV / 2;

  const sel = BLOCKS[wahl];

  // Was genau die Reduktion streicht, aus dem Live-Zustand gezählt
  const weg: string[] = [];
  if (m - r > 0) weg.push(`${spalten(m - r)} von U`);
  if (n - r > 0) weg.push(`${spalten(n - r)} von V`);

  const umschalten = () => {
    const neu = !reduziert;
    if (neu && !BLOCKS[wahl].bleibt) setWahl("Sr");
    setReduziert(neu);
  };

  return (
    <div>
      <Aufgabe>
        Klicken wir auf einen Block und schalten wir dann auf die reduzierte Zerlegung um.
      </Aufgabe>
      <div className="my-2 flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={m === p.m && n === p.n && r === p.r ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={m === p.m && n === p.n && r === p.r}
            onClick={() => {
              setM(p.m);
              setN(p.n);
              setR(p.r);
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="my-3 max-w-md">
        <Slider
          label="Zeilen m"
          value={m}
          onChange={(v) => {
            const neu = Math.round(v);
            setM(neu);
            setR((alt) => Math.min(alt, neu, n));
          }}
          min={2}
          max={8}
          step={1}
          fmt={(v) => String(v)}
        />
        <Slider
          label="Spalten n"
          value={n}
          onChange={(v) => {
            const neu = Math.round(v);
            setN(neu);
            setR((alt) => Math.min(alt, m, neu));
          }}
          min={2}
          max={8}
          step={1}
          fmt={(v) => String(v)}
        />
        <Slider
          label="Rang r"
          value={r}
          onChange={(v) => setR(Math.round(v))}
          min={1}
          max={Math.min(m, n)}
          step={1}
          fmt={(v) => String(v)}
        />
      </div>

      <div className="my-2 flex flex-wrap items-center gap-3 text-sm">
        <button
          type="button"
          className={W_BUTTON}
          aria-pressed={reduziert}
          onClick={umschalten}
        >
          {reduziert ? "volle SVD zeigen" : "auf die reduzierte SVD schrumpfen"}
        </button>
        <span style={{ color: GREY }}>
          Zustand: m = {m}, n = {n}, r = {r}, {reduziert ? "reduzierte" : "volle"} Zerlegung
        </span>
      </div>

      <div className="overflow-x-auto">
        <svg
          width={breite}
          height={hoehe}
          viewBox={`0 0 ${breite} ${hoehe}`}
          className="h-auto max-w-full"
          role="group"
          aria-label={`Blockschema der ${reduziert ? "reduzierten" : "vollen"} Singulärwertzerlegung einer ${m} mal ${n}-Matrix vom Rang ${r}. Die Blöcke sind anwählbar.`}
        >
          {/* A selbst, von der Reduktion unberührt */}
          <rect x={xA} y={yA} width={wA} height={hA} fill={GREY} fillOpacity={0.12} stroke={GREY} />
          <BlockLabel x={xA + wA / 2} y={yA + hA / 2 + 4} base="A" fill={GREY} />
          <Format x={xA + wA / 2} y={yFormat} text={`A: ${m}×${n}`} />

          <Op x={xA + wA + gap / 2} y={mid + 5} z="=" />

          {/* U bzw. U_r */}
          <Block id="Ur" x={xU} y={yU} w={r * CELL} h={hU} farbe={GREEN} base="U" sub="r" />
          {zeigeVoll ? (
            <Block
              id="Umr"
              x={xU + r * CELL}
              y={yU}
              w={(m - r) * CELL * (1 - q)}
              h={hU}
              farbe={GREEN}
              base="U"
              sub="m−r"
            />
          ) : null}
          <Format
            x={xU + wU / 2}
            y={yFormat}
            text={reduziert ? `U_r: ${m}×${r}` : `U: ${m}×${m}`}
          />

          <Op x={xU + wU + gap / 2} y={mid + 5} z="·" />

          {/* Σ bzw. Σ_r */}
          <Block id="Sr" x={xS} y={yS} w={r * CELL} h={r * CELL} farbe={ORANGE} base="Σ" sub="r" />
          {zeigeVoll ? (
            <>
              <Block
                id="S0"
                x={xS + r * CELL}
                y={yS}
                w={(n - r) * CELL * (1 - q)}
                h={r * CELL}
                farbe={ORANGE}
                base="0"
                leer
              />
              <Block
                id="S0"
                x={xS}
                y={yS + r * CELL}
                w={r * CELL}
                h={(m - r) * CELL * (1 - q)}
                farbe={ORANGE}
                base="0"
                leer
              />
              <Block
                id="S0"
                x={xS + r * CELL}
                y={yS + r * CELL}
                w={(n - r) * CELL * (1 - q)}
                h={(m - r) * CELL * (1 - q)}
                farbe={ORANGE}
                base="0"
                leer
              />
            </>
          ) : null}
          <Format
            x={xS + wS / 2}
            y={yFormat}
            text={reduziert ? `Σ_r: ${r}×${r}` : `Σ: ${m}×${n}`}
          />

          <Op x={xS + wS + gap / 2} y={mid + 5} z="·" />

          {/* Vᵀ bzw. V_rᵀ */}
          <Block
            id="Vr"
            x={xV}
            y={yV}
            w={n * CELL}
            h={r * CELL}
            farbe={BLUE}
            base="V"
            sub="r"
            hoch="T"
          />
          {zeigeVoll ? (
            <Block
              id="Vnr"
              x={xV}
              y={yV + r * CELL}
              w={n * CELL}
              h={(n - r) * CELL * (1 - q)}
              farbe={BLUE}
              base="V"
              sub="n−r"
              hoch="T"
            />
          ) : null}
          <Format
            x={xV + wV / 2}
            y={yFormat}
            text={reduziert ? `V_rᵀ: ${r}×${n}` : `Vᵀ: ${n}×${n}`}
          />
        </svg>
      </div>

      <Verdikt kind={sel.bleibt ? "ok" : "fail"} titel={`${sel.name}:`}>
        {sel.bleibt
          ? "Bleibt in der reduzierten Zerlegung. "
          : "Fällt in der reduzierten Zerlegung weg. "}
        {sel.text}{" "}
        {weg.length === 0
          ? `Mit m = n = r = ${r} fällt allerdings gar nichts weg: U und V sind schon quadratisch, und Σ hat weder eine Nullzeile noch eine Nullspalte, die Reduktion aus ${ref("satz:reduzierte-darstellung")} ist dann leer.`
          : `Insgesamt fallen ${weg.join(" und ")} weg; Σ schrumpft von ${m}×${n} auf ${r}×${r}.`}
      </Verdikt>

      <p className="mt-2 font-mono text-xs" style={{ color: GREY }}>
        Gespeicherte Zahlen ({ref("bemerkung:was-die-reduzierte-form-spart-und-was")}), volle Zerlegung: m² + n² + min(m, n) ={" "}
        {speicherVoll}; reduzierte Zerlegung: r·(m + n + 1) = {speicherRed}; A selbst: m·n ={" "}
        {speicherA}
      </p>
    </div>
  );
}
