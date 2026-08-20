import { useMemo, useState } from "react";
import { Aufgabe, FMM_COLORS, fmtDe, Slider, Verdikt } from "../../../lib";

/**
 * §13.5 — DIE EINE EINSICHT: Die Lasso-Raute hat ECKEN auf den Achsen, der
 * Ridge-Kreis nicht. Deshalb sitzt die Lasso-Lösung für kleine Budgets exakt in
 * einer Ecke und setzt einen Koeffizienten auf null, während die Ridge-Lösung
 * glatt über den Kreisrand wandert und nie exakt null wird.
 *
 * Ridge gegen Lasso als beschränkte Optimierung: dieselben
 * elliptischen KQ-Höhenlinien, einmal über der Kreisscheibe ||b||_2 <= c,
 * einmal über der Raute |b1|+|b2| <= c. Die Lösung ist der Punkt des
 * zulässigen Bereichs mit kleinstem Verlust; beim Lasso landet sie für
 * kleine c in einer Ecke (eine Koordinate exakt null).
 *
 * Verlust f(b) = (b - m)' A (b - m) mit A = [[2, 0.6],[0.6, 1]] und
 * KQ-Zentrum m = (1.6, 0.9). Die Loesungen entstehen im Code durch eine
 * feine deterministische Randsuche (kein Math.random); die vier Ecken der
 * Raute liegen exakt im Suchraster, ein Eckentreffer ist deshalb exakt.
 *
 * PRÜFSTATUS (historische Notiz: Das ursprüngliche Skript ist nicht mehr vorhanden; die folgenden Zahlen sind derzeit nicht reproduzierbar nachgewiesen, 2026-08-19;
 * aeltere Pruefungen rev135-ridgelasso.mjs, rev135-ecke.mjs bestaetigt):
 *  - c = 1 gibt Ridge (0,8891; 0,4578) mit f = 1,5837 und Lasso exakt (1; 0)
 *    mit f = 2,1780.
 *  - Die Lasso-Ecke (c; 0) ist optimal fuer c <= 1,342857 (bisektiert), auf
 *    dem Reglerraster also bis c = 1,30; bei c = 1,35 liegt die Loesung schon
 *    bei (1,3444; 0,0056), die Ecke also NICHT mehr.
 *  - Die Nebenbedingung ist inaktiv ab c >= 1,835756 = ||m||_2 (Ridge) bzw.
 *    c >= 2,500000 = ||m||_1 (Lasso); dort ist die Loesung der KQ-Punkt.
 *
 * Farbcode Kapitel 13: Höhenlinienschar grau wie in S133/S134, die
 * erreichte Höhenlinie und der KQ-Punkt violett, zulässiger Bereich rot,
 * Lösung grün; Blau bleibt den Iterierten vorbehalten.
 */

const A = [
  [2, 0.6],
  [0.6, 1],
];
const MITTE = [1.6, 0.9];

const HILFS = "#94a3b8"; // Höhenlinienschar
const VIOLETT = FMM_COLORS.violett; // erreichte Höhenlinie und KQ-Punkt
const GRUEN = FMM_COLORS.gruen; // beschränkte Lösung
const ROT = FMM_COLORS.rot; // zulässiger Bereich

/** Verifizierte Schwellen, siehe Kopfkommentar. */
const ECKE_BIS = 1.342857;
const RIDGE_INAKTIV_AB = 1.835756;
const LASSO_INAKTIV_AB = 2.5;

const fq = (p: [number, number]) => {
  const d = [p[0] - MITTE[0], p[1] - MITTE[1]];
  return (
    d[0] * (A[0][0] * d[0] + A[0][1] * d[1]) +
    d[1] * (A[1][0] * d[0] + A[1][1] * d[1])
  );
};

const fmt = (v: number, d = 2) => fmtDe(v, d);

/** Randpunkte des zulässigen Bereichs, Kreis oder Raute vom Radius c. */
function randpunkte(art: "kreis" | "raute", c: number): [number, number][] {
  const pts: [number, number][] = [];
  const N = 4000;
  for (let t = 0; t < N; t++) {
    if (art === "kreis") {
      const th = (2 * Math.PI * t) / N;
      pts.push([c * Math.cos(th), c * Math.sin(th)]);
    } else {
      const s = (4 * t) / N;
      if (s < 1) pts.push([c * (1 - s), c * s]);
      else if (s < 2) pts.push([-c * (s - 1), c * (2 - s)]);
      else if (s < 3) pts.push([-c * (3 - s), -c * (s - 2)]);
      else pts.push([c * (s - 3), -c * (4 - s)]);
    }
  }
  return pts;
}

/** Minimum des Verlusts über dem zulässigen Bereich (Rand oder Zentrum). */
function loesung(art: "kreis" | "raute", c: number) {
  const norm =
    art === "kreis"
      ? Math.hypot(MITTE[0], MITTE[1])
      : Math.abs(MITTE[0]) + Math.abs(MITTE[1]);
  if (norm <= c)
    return { p: [MITTE[0], MITTE[1]] as [number, number], f: 0, aktiv: false };
  let best: { p: [number, number]; f: number } | null = null;
  for (const p of randpunkte(art, c)) {
    const v = fq(p);
    if (!best || v < best.f) best = { p, f: v };
  }
  const b = best as { p: [number, number]; f: number };
  return { ...b, aktiv: true };
}

/** Ellipsen-Kontur von fq zum Niveau lvl als SVG-Pfad (Eigenzerlegung von A). */
function konturPfad(
  lvl: number,
  sx: (x: number) => number,
  sy: (y: number) => number,
) {
  const tr = A[0][0] + A[1][1];
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const l1 = tr / 2 + Math.sqrt((tr * tr) / 4 - det);
  const l2 = tr / 2 - Math.sqrt((tr * tr) / 4 - det);
  const th = Math.atan2(l1 - A[0][0], A[0][1]);
  const a = Math.sqrt(lvl / l1);
  const b = Math.sqrt(lvl / l2);
  let d = "";
  for (let t = 0; t <= 120; t++) {
    const ph = (2 * Math.PI * t) / 120;
    const u = a * Math.cos(ph);
    const v = b * Math.sin(ph);
    const x = MITTE[0] + u * Math.cos(th) - v * Math.sin(th);
    const y = MITTE[1] + u * Math.sin(th) + v * Math.cos(th);
    d += (t === 0 ? "M " : "L ") + sx(x) + " " + sy(y) + " ";
  }
  return d + "Z";
}

function Panel({
  art,
  c,
  titel,
}: {
  art: "kreis" | "raute";
  c: number;
  titel: string;
}) {
  const W = 260;
  const sx = (x: number) => Math.round(((x + 1.6) / 3.6) * W * 100) / 100;
  const syy = (y: number) => Math.round((1 - (y + 1.6) / 3.6) * W * 100) / 100;
  const sol = useMemo(() => loesung(art, c), [art, c]);
  // Ecke der Raute: eine Koordinate exakt null, die andere betragsgleich c.
  // Die vier Ecken liegen exakt im Suchraster, die Schranke darf also eng
  // sein: bei c = 1,35 liegt die Lösung schon 0,006 neben der Ecke, und das
  // soll der Readout nicht mehr als Ecke verkaufen.
  const inEcke =
    art === "raute" &&
    sol.aktiv &&
    ((Math.abs(sol.p[0]) < 1e-9 && Math.abs(Math.abs(sol.p[1]) - c) < 1e-9) ||
      (Math.abs(sol.p[1]) < 1e-9 && Math.abs(Math.abs(sol.p[0]) - c) < 1e-9));
  const bereich =
    art === "kreis" ? (
      <circle
        cx={sx(0)}
        cy={syy(0)}
        r={(c / 3.6) * W}
        fill={ROT}
        opacity={0.14}
        stroke={ROT}
        strokeWidth={1.5}
      />
    ) : (
      <polygon
        points={[
          [c, 0],
          [0, c],
          [-c, 0],
          [0, -c],
        ]
          .map(([x, y]) => `${sx(x)},${syy(y)}`)
          .join(" ")}
        fill={ROT}
        opacity={0.14}
        stroke={ROT}
        strokeWidth={1.5}
      />
    );
  return (
    <div>
      <p className="mb-1 text-center text-sm font-medium">{titel}</p>
      <svg
        viewBox={`0 0 ${W} ${W}`}
        width={W}
        height={W}
        role="img"
        aria-label={`${titel}: KQ-Höhenlinien über dem zulässigen Bereich, die Lösung liegt bei (${fmt(sol.p[0])}; ${fmt(sol.p[1])}).`}
        className="max-w-full h-auto rounded border border-slate-300 bg-white dark:border-slate-600"
      >
        <line x1={sx(-1.6)} y1={syy(0)} x2={sx(2)} y2={syy(0)} stroke="#cbd5e1" />
        <line x1={sx(0)} y1={syy(-1.6)} x2={sx(0)} y2={syy(2)} stroke="#cbd5e1" />
        {[0.35, sol.f > 0.05 ? sol.f : 0.9, 3.2].map((lvl, i) => (
          <path
            key={i}
            d={konturPfad(lvl, sx, syy)}
            fill="none"
            stroke={i === 1 && sol.f > 0.05 ? VIOLETT : HILFS}
            strokeWidth={i === 1 && sol.f > 0.05 ? 2 : 1}
            opacity={i === 1 && sol.f > 0.05 ? 0.9 : 0.7}
          />
        ))}
        {bereich}
        <circle cx={sx(MITTE[0])} cy={syy(MITTE[1])} r={3.5} fill={VIOLETT} />
        <text x={sx(MITTE[0]) + 6} y={syy(MITTE[1]) - 5} fontSize={11} fill={VIOLETT}>
          KQ
        </text>
        <circle cx={sx(sol.p[0])} cy={syy(sol.p[1])} r={5} fill={GRUEN} />
      </svg>
      <p className="mt-1 text-center font-mono text-xs">
        β̂ = ({fmt(sol.p[0])}; {fmt(sol.p[1])})
        {inEcke ? " · Ecke!" : ""}
        {sol.aktiv ? "" : " · NB inaktiv, μ = 0"}
      </p>
    </div>
  );
}

/** Ridge-Kreis gegen Lasso-Raute mit gemeinsamem Radius-Slider. */
export function RidgeLassoGeometrie() {
  const [c, setC] = useState(1.0);

  const ridge = useMemo(() => loesung("kreis", c), [c]);
  const lasso = useMemo(() => loesung("raute", c), [c]);
  const inEcke = c <= 1.3 + 1e-9;

  let art: "neutral" | "ok" | "warn";
  let titel: string;
  let text: string;
  if (inEcke) {
    art = "ok";
    titel = "Lasso sitzt in der Ecke";
    text = `Bei r = ${fmt(c)} liegt die Lasso-Lösung exakt auf (${fmt(c)}; 0): β₂ ist nicht klein, sondern null. Die Ridge-Lösung (${fmt(ridge.p[0])}; ${fmt(ridge.p[1])}) hat dagegen zwei von null verschiedene Koeffizienten. Der Unterschied steckt allein in der Form des zulässigen Bereichs: Die Raute hat Ecken auf den Achsen, der Kreis nicht. Die Ecke bleibt optimal bis r = ${fmt(ECKE_BIS, 4)}.`;
  } else if (lasso.aktiv) {
    art = "neutral";
    titel = "beide Lösungen liegen auf dem Rand";
    text = `Über der Eckenschwelle ${fmt(ECKE_BIS, 4)} rutscht die Lasso-Lösung von der Ecke auf eine Kante der Raute: (${fmt(lasso.p[0])}; ${fmt(lasso.p[1])}) statt (r; 0). Beide Nebenbedingungen binden noch, beide Multiplikatoren sind nach Satz 13.5.7 positiv, und die Höhenlinie berührt in beiden Tafeln den Rand. Der Sparsamkeitseffekt des Lasso ist damit weg.`;
  } else {
    art = "warn";
    titel = "die Nebenbedingung ist inaktiv";
    text = `Der Radius lässt den KQ-Schätzer selbst zu. Damit ist das Budget kein Zwang mehr: Die Lösung ist der KQ-Punkt, die Komplementarität aus Satz 13.5.7 erzwingt μ = 0, und die Schätzung wird nicht mehr geschrumpft. Die Schwellen liegen bei ‖β̂‖₂ = ${fmt(RIDGE_INAKTIV_AB, 4)} für Ridge und ‖β̂‖₁ = ${fmt(LASSO_INAKTIV_AB, 4)} für Lasso.`;
  }

  return (
    <div className="my-2 space-y-3">
      <Aufgabe>
        Schieben wir das Budget nach unten und achten auf β₂ in der rechten Tafel: Wann wird es
        exakt null?
      </Aufgabe>
      <div className="flex flex-wrap gap-5">
        <Panel art="kreis" c={c} titel="Ridge: ‖β‖₂ ≤ r" />
        <Panel art="raute" c={c} titel="Lasso: |β₁| + |β₂| ≤ r" />
      </div>
      <Slider label="Radius r" value={c} onChange={setC} min={0.4} max={2.6} step={0.05} accent={ROT} />
      <p className="max-w-prose text-xs text-slate-600 dark:text-slate-400">
        Beide Tafeln zeigen dieselben KQ-Höhenlinien (grau, Minimum im violetten Punkt „KQ") über
        ihrem zulässigen Bereich (rot). Violett hervorgehoben ist die niedrigste erreichbare
        Höhenlinie, der grüne Punkt darauf ist die beschränkte Lösung. Der Regler steuert den
        Radius r beider Mengen; beim quadrierten Ridge-Budget des Textes ist also c = r².
      </p>
      <Verdikt kind={art} titel={titel}>
        {text}
      </Verdikt>
    </div>
  );
}
