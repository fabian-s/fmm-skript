import { useState } from "react";
import type { ReactNode } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  W_MUTED,
  W_PANEL,
  fmtDe,
} from "../../../lib";
import { ref } from "../../numbers.generated";

/**
 * §2.1: „Zwei Gesichter derselben Auslöschung" — die Varianz nach der
 * Verschiebungsformel (Beispiel 2.1.3) und die Klammerung einer Summe
 * (Beispiel 2.1.4) in EINEM Widget, mit gemeinsamem Exponenten k.
 *
 * DIE EINE EINSICHT: Beide Beispiele scheitern am selben Mechanismus. Sobald
 * der Abstand benachbarter Maschinenzahlen an der Rechenstelle (die ULP)
 * größer wird als die gesuchte Größe, ist die gesuchte Größe weg. Die Tafel
 * zeigt genau diese zwei Zahlen auf einer gemeinsamen Größenordnungsachse.
 *
 * FARBROLLEN (Kapitel 2, einheitlich in allen Widgets):
 *   rot             das teure/instabile Verfahren bzw. die teuerste
 *                   Wachstumsklasse (naive Rekursion, O(2ⁿ)),
 *   blau            das günstige Verfahren bzw. lineare Ordnung O(n),
 *   grün            die exakte Referenz (der Wert, der herauskommen soll)
 *                   bzw. die billigste Klasse O(log n),
 *   orange          die Maschinenauflösung (ULP) bzw. quadratische Ordnung,
 *   violett         kubische Ordnung, grau: n·log n und neutrale Teile.
 * AUSNAHME §2.1 (bewusst, STYLE.md verlangt dieselbe Farbe für denselben
 * Teilausdruck in Text UND Widget): In der Wertetabelle tragen rot und blau
 * die Teilausdrucksrollen der Beispiele 2.1.3/2.1.4 — rot das Mittel der
 * Quadrate bzw. x, blau das Quadrat des Mittels bzw. y. Grün bleibt in beiden
 * Fällen die gesuchte Größe (22,5 bzw. die 1).
 *
 * PRÜFSTATUS (scripts/verify/REV29/02-algos-S21Demos.mjs, 2026-08-29; naive
 * Summation in IEEE-Doppelpräzision, alle erreichbaren k = 0 … K_MAX geprüft):
 *   Varianz, x_i ∈ {4,7,13,16} + 10^k, wahrer Wert 22,5 —
 *     k ≤ 7: exakt 22,5 · k = 8: 22 · k = 9: −128 · k = 10: 16384 ·
 *     k = 11, 12, 14, 15, 16: 0 · k = 13: 17179869184 ·
 *     k = 17: 1,15 · 10^18 · k = 18, 19, 20: 0.
 *     ÜBERRASCHUNG, die wir offen zeigen: der Ausfall ist NICHT monoton. Ab
 *     k = 8 ist das Ergebnis kaputt, aber es pendelt zwischen 0, positiven
 *     Riesenwerten und negativen Werten – reiner Rundungszufall.
 *     Die zweistufige Rechnung hält deutlich länger durch, aber nicht ewig:
 *     k ≤ 15 exakt 22,5 · k = 16: 20 · k = 17: 128 · k ≥ 18: 0. Ab k = 16
 *     sind schon die Abweichungen x_i − x̄ nicht mehr darstellbar; das Widget
 *     bekommt dafür einen eigenen Verdikt-Zweig, damit die grüne Zeile nicht
 *     stillschweigend als „exakte Referenz" durchgeht.
 *   Assoziativität, x = 10^k, y = −10^k, z = 1 —
 *     bis k = 15 liefern beide Klammerungen 1, ab k = 16 liefert
 *     x + (y + z) den Wert 0 (ULP bei 10^16 ist 2 > 1).
 *     KORREKTUR gegenüber der Vorfassung: die kippte scheinbar bei k = 14,
 *     der Bruch liegt tatsächlich bei k = 16.
 *   ULP an der Rechenstelle: 10^18 → 128, 10^16 → 2, 10^15 → 0,125,
 *     10^30 → 2^47 ≈ 1,4 · 10^14.
 *
 * Provenienz: eigenständig implementiert, kein Code aus den privaten
 * Buch-Apps. Die Vorfassung bestand aus zwei getrennten Widgets
 * (AusloeschungDemo, AssoziativDemo); zusammengelegt 2026-08-19.
 */

const ROT = FMM_COLORS.rot;
const BLAU = FMM_COLORS.blau;
const GRUEN = FMM_COLORS.gruen;
const ORANGE = FMM_COLORS.orange;

type Modus = "varianz" | "assoziativ";

const K_MAX = 20;

function mittel(a: number[]): number {
  let s = 0;
  for (const v of a) s += v;
  return s / a.length;
}

/** Abstand benachbarter Maschinenzahlen bei |v| (Doppelpräzision, 52 Mantissenbits). */
function ulp(v: number): number {
  const a = Math.abs(v);
  if (!(a > 0) || !Number.isFinite(a)) return 0;
  return 2 ** (Math.floor(Math.log2(a)) - 52);
}

const HOCH = "⁰¹²³⁴⁵⁶⁷⁸⁹";
/** Exponent als Hochzahl, mit echtem Minuszeichen. */
function hoch(e: number): string {
  const s = Math.abs(e)
    .toString()
    .split("")
    .map((d) => HOCH[Number(d)])
    .join("");
  return e < 0 ? `⁻${s}` : s;
}

/** Zehnerpotenz-Kurzform, deutsch. */
function sci(v: number): string {
  const e = Math.floor(Math.log10(Math.abs(v)));
  return `${fmtDe(v / 10 ** e, 1)} · 10${hoch(e)}`;
}

/**
 * Zahl in der Wertetabelle: bis 10^21 mit allen Ziffern (nur so sieht man,
 * dass zwei Riesenterme sich erst in den letzten Stellen unterscheiden),
 * darüber und unterhalb von 10^-3 als Zehnerpotenz.
 */
function kompakt(v: number): string {
  if (!Number.isFinite(v)) return "–";
  if (v === 0) return "0";
  const a = Math.abs(v);
  if (a >= 1e21 || a < 1e-3) return sci(v);
  if (a >= 1e4) return v.toLocaleString("de-DE", { maximumFractionDigits: 1 }).replace(/^-/, "−");
  const s = fmtDe(v, a >= 100 ? 1 : a >= 1 ? 2 : 4);
  return s.includes(",") ? s.replace(/0+$/, "").replace(/,$/, "") : s;
}

/** Kurzform für Beschriftungen im SVG: nie mehr als ein paar Zeichen breit. */
function kurz(v: number): string {
  if (!Number.isFinite(v) || v === 0) return kompakt(v);
  const a = Math.abs(v);
  return a >= 1e4 || a < 1e-3 ? sci(v) : kompakt(v);
}

/* ------------------------------------------------------------------ */
/* Größenordnungsachse: Auflösung gegen gesuchte Größe                 */
/* ------------------------------------------------------------------ */

const E_MIN = -18;
const E_MAX = 22;
const B_W = 460;
const B_H = 104;
const B_L = 10;
const B_R = 10;
const ACHSE_Y = 62;

const xOf = (e: number) =>
  B_L + ((Math.min(E_MAX, Math.max(E_MIN, e)) - E_MIN) / (E_MAX - E_MIN)) * (B_W - B_L - B_R);

function GroessenAchse({
  aufloesung,
  ziel,
  zielName,
  ariaLabel,
}: {
  aufloesung: number;
  ziel: number;
  zielName: string;
  ariaLabel: string;
}) {
  const eU = aufloesung > 0 ? Math.log10(aufloesung) : E_MIN;
  const eZ = Math.log10(ziel);
  const xU = xOf(eU);
  const xZ = xOf(eZ);
  const verloren = aufloesung > ziel;
  const ticks = [-16, -8, 0, 8, 16];
  return (
    <svg
      viewBox={`0 0 ${B_W} ${B_H}`}
      className="h-auto max-w-full rounded border border-slate-300 dark:border-slate-600 [.w-dark_&]:border-slate-600"
      role="img"
      aria-label={ariaLabel}
    >
      <rect width={B_W} height={B_H} fill="var(--w-bg)" />
      {/* Verlustzone: alles rechts von der gesuchten Größe */}
      {verloren && (
        <rect x={xZ} y={ACHSE_Y - 10} width={Math.max(0, xU - xZ)} height={20} fill={ROT} fillOpacity={0.14} />
      )}
      <line x1={B_L} x2={B_W - B_R} y1={ACHSE_Y} y2={ACHSE_Y} stroke="var(--w-axis)" strokeWidth={1.5} />
      <g fill="var(--w-muted)" fontSize={11} fontFamily="ui-monospace, SFMono-Regular, monospace" aria-hidden="true">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={xOf(t)} x2={xOf(t)} y1={ACHSE_Y - 3} y2={ACHSE_Y + 3} stroke="var(--w-axis)" strokeWidth={1} />
            <text x={xOf(t)} y={ACHSE_Y + 14} textAnchor="middle">
              10{hoch(t)}
            </text>
          </g>
        ))}
      </g>
      {/* gesuchte Größe (grün), Beschriftung unter der Achse */}
      <line x1={xZ} x2={xZ} y1={ACHSE_Y} y2={B_H - 20} stroke={GRUEN} strokeWidth={2} />
      <circle cx={xZ} cy={ACHSE_Y} r={4} fill={GRUEN} />
      <text
        x={Math.min(xZ, B_W - 110)}
        y={B_H - 6}
        fill={GRUEN}
        fontSize={12}
        fontFamily="ui-sans-serif, sans-serif"
      >
        gesucht: {zielName}
      </text>
      {/* Auflösung (orange), Beschriftung über der Achse */}
      <line x1={xU} x2={xU} y1={16} y2={ACHSE_Y} stroke={ORANGE} strokeWidth={2} />
      <circle cx={xU} cy={ACHSE_Y} r={4} fill={ORANGE} />
      <text
        x={Math.min(Math.max(xU - 50, 2), B_W - 150)}
        y={12}
        fill={ORANGE}
        fontSize={12}
        fontFamily="ui-sans-serif, sans-serif"
      >
        Auflösung hier: {kurz(aufloesung)}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Das Widget                                                          */
/* ------------------------------------------------------------------ */

export function AusloeschungWidget({ startModus = "varianz" }: { startModus?: Modus } = {}) {
  const [modus, setModus] = useState<Modus>(startModus);
  // Startwert 7: die orange Auflösung steht schon dicht links neben der grünen
  // Marke, die Spannung ist in der toten Anfangsfigur sichtbar, die Antwort
  // (der Bruch bei k = 8) aber noch nicht verraten.
  const [k, setK] = useState(7);

  /* Varianz nach Verschiebungsformel */
  const c = 10 ** k;
  const daten = [4, 7, 13, 16].map((v) => v + c);
  const mw = mittel(daten);
  const zweistufig = mittel(daten.map((v) => (v - mw) ** 2));
  const mittelQuadrate = mittel(daten.map((v) => v * v));
  const quadratMittel = mw * mw;
  const formel = mittelQuadrate - quadratMittel;

  /* Assoziativität */
  const x = 10 ** k;
  const y = -(10 ** k);
  const links = x + y + 1;
  const rechts = x + (y + 1);

  const istVarianz = modus === "varianz";
  const aufloesung = istVarianz ? ulp(mittelQuadrate) : ulp(x);
  const ziel = istVarianz ? 22.5 : 1;
  const zielName = istVarianz ? "die Varianz 22,5" : "die 1";

  /* Verdikt */
  let art: "ok" | "warn" | "fail" = "ok";
  let verdikt: ReactNode;
  if (istVarianz) {
    const abweichung = Math.abs(formel - 22.5);
    if (zweistufig !== 22.5) {
      // Erreichbare Zustandsklasse ab k = 16: auch der zweistufige Weg bricht
      // zusammen, die grüne Zeile ist dann keine Referenz mehr.
      art = "fail";
      verdikt = (
        <>
          Jetzt versagt auch der zweistufige Weg: Er zeigt {kompakt(zweistufig)} statt{" "}
          <M>{"22{,}5"}</M>. Bei <M>{`10^{${k}}`}</M> liegen benachbarte Maschinenzahlen so weit
          auseinander, dass schon die Abweichungen <M>{"x_i - \\bar{x}"}</M> nicht mehr
          darstellbar sind – die grüne Zeile ist hier keine exakte Referenz mehr, sondern
          selbst ein Rundungsartefakt. Die Verschiebungsformel ist längst vorher gekippt.
        </>
      );
    } else if (formel === 22.5) {
      art = "ok";
      verdikt = (
        <>
          Beide Rechenwege liefern exakt <M>{"22{,}5"}</M>. Die Auflösung an der Rechenstelle
          liegt noch weit unter der gesuchten Varianz, die Subtraktion verliert also nichts
          Wesentliches ({ref("beispiel:katastrophale-ausloeschung")}).
        </>
      );
    } else if (formel === 0) {
      art = "fail";
      verdikt = (
        <>
          Totalausfall: Beide Terme werden auf dieselbe Maschinenzahl gerundet, ihre Differenz
          ist exakt <M>{"0"}</M>. Die gesamte Information über die Streuung ist ausgelöscht –
          genau der Fall, den {ref("beispiel:katastrophale-ausloeschung")} vorrechnet.
        </>
      );
    } else if (formel < 0) {
      art = "fail";
      verdikt = (
        <>
          Eine negative Varianz ({kompakt(formel)}): Die Rundungsfehler der beiden Riesenterme
          sind größer als deren wahre Differenz <M>{"22{,}5"}</M>, das Vorzeichen ist reiner
          Rundungszufall ({ref("beispiel:katastrophale-ausloeschung")}).
        </>
      );
    } else if (abweichung > 22.5) {
      art = "fail";
      verdikt = (
        <>
          Das Ergebnis ({kompakt(formel)}) ist um Größenordnungen daneben. Übrig geblieben sind
          nur noch die Rundungsreste der beiden Terme; welcher Wert dabei herauskommt, ist
          Zufall ({ref("beispiel:katastrophale-ausloeschung")}).
        </>
      );
    } else {
      art = "warn";
      verdikt = (
        <>
          Das Ergebnis kippt gerade: {kompakt(formel)} statt <M>{"22{,}5"}</M>. Von den
          führenden Ziffern der beiden Terme heben sich fast alle weg, und der Rest trägt
          bereits einen sichtbaren Rundungsfehler.
        </>
      );
    }
  } else if (links === rechts) {
    art = "ok";
    verdikt = (
      <>
        Beide Klammerungen liefern <M>{"1"}</M>. Die <M>{"1"}</M> ist noch größer als der
        Abstand benachbarter Maschinenzahlen bei <M>{`10^{${k}}`}</M>, die Zwischensumme{" "}
        <M>{"y + z"}</M> kann sie also festhalten ({ref("beispiel:verletzte-assoziativitaet")}).
      </>
    );
  } else {
    art = "fail";
    verdikt = (
      <>
        Die Klammerungen gehen auseinander: links <M>{"1"}</M>, rechts <M>{"0"}</M>. Bei{" "}
        <M>{`10^{${k}}`}</M> liegen benachbarte Maschinenzahlen {kompakt(aufloesung)}{" "}
        auseinander, <M>{"y + z"}</M> wird deshalb auf <M>{"y"}</M> zurückgerundet und die{" "}
        <M>{"1"}</M> verschwindet spurlos ({ref("beispiel:verletzte-assoziativitaet")}).
      </>
    );
  }

  const zeilen: { name: string; wert: string; farbe?: string }[] = istVarianz
    ? [
        { name: "Mittel der Quadrate", wert: kompakt(mittelQuadrate), farbe: ROT },
        { name: "Quadrat des Mittels", wert: kompakt(quadratMittel), farbe: BLAU },
        { name: "Verschiebungsformel", wert: kompakt(formel) },
        { name: "zweistufig", wert: kompakt(zweistufig), farbe: GRUEN },
      ]
    : [
        { name: "(x + y) + z", wert: kompakt(links), farbe: GRUEN },
        { name: "x + (y + z)", wert: kompakt(rechts) },
        { name: "Zwischensumme y + z", wert: kompakt(y + 1), farbe: BLAU },
        { name: "x = 10ᵏ", wert: kompakt(x), farbe: ROT },
      ];

  return (
    <div className="space-y-3">
      <Aufgabe>
        Schieben wir <M>{"k"}</M> nach oben und suchen die Stelle, an der die orange Auflösung
        die grüne gesuchte Größe überholt.
      </Aufgabe>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Rechenweg">
        {(
          [
            ["varianz", `Varianz (${ref("beispiel:katastrophale-ausloeschung")})`],
            ["assoziativ", `Assoziativität (${ref("beispiel:verletzte-assoziativitaet")})`],
          ] as [Modus, string][]
        ).map(([id, text]) => (
          <button
            key={id}
            type="button"
            className={modus === id ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={modus === id}
            onClick={() => setModus(id)}
          >
            {text}
          </button>
        ))}
      </div>

      <GroessenAchse
        aufloesung={aufloesung}
        ziel={ziel}
        zielName={istVarianz ? "22,5" : "1"}
        ariaLabel={
          `Größenordnungsachse: die Auflösung an der Rechenstelle liegt bei ${kurz(aufloesung)}, ` +
          `gesucht ist ${zielName}. ` +
          (aufloesung > ziel
            ? "Die Auflösung ist größer als die gesuchte Größe, das Ergebnis geht verloren."
            : "Die Auflösung ist kleiner als die gesuchte Größe, das Ergebnis überlebt.")
        }
      />

      <div className="max-w-md">
        <Slider
          label="Exponent k"
          value={k}
          onChange={(v) => setK(Math.round(v))}
          min={0}
          max={K_MAX}
          step={1}
          fmt={(v) => `10${hoch(Math.round(v))}`}
        />
      </div>

      {/* Kein <table>: bei 390 px sollen Name und Wert untereinander rutschen,
          statt dass der Wert aus einer breiten Tabelle herausscrollt. */}
      <div className={`space-y-1 p-3 font-mono text-xs sm:text-sm ${W_PANEL}`}>
        {zeilen.map((z, i) => (
          <div
            key={z.name}
            className={`flex flex-wrap items-baseline justify-between gap-x-4 ${
              i === 2 ? "border-t border-slate-300 pt-1 dark:border-slate-600" : ""
            }`}
          >
            <span>{z.name}</span>
            <span
              className="tabular-nums [overflow-wrap:anywhere]"
              style={z.farbe ? { color: z.farbe } : undefined}
            >
              {z.wert}
            </span>
          </div>
        ))}
      </div>

      <Verdikt kind={art}>{verdikt}</Verdikt>

      {istVarianz && (
        <p className={`max-w-prose text-xs ${W_MUTED}`}>
          Kleingedrucktes: Das Widget summiert naiv von vorne nach hinten, Rs{" "}
          <code>mean()</code> hängt einen Korrekturschritt an. Deshalb steht hier bei{" "}
          <M>{"k = 9"}</M> der Wert <M>{"-128"}</M>, wo {ref("beispiel:katastrophale-ausloeschung")} die R-Ausgabe{" "}
          <M>{"0"}</M> zitiert. Beides ist IEEE-Doppelpräzision.
        </p>
      )}
    </div>
  );
}
