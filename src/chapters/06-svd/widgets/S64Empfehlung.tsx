import { useMemo, useState, type ReactNode } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  M,
  Slider,
  Verdikt,
  W_BUTTON,
  W_BUTTON_AKTIV,
  fmtDe,
} from "../../../lib";
import { energieAnteil, jacobiSVD, rankK, type Mat } from "./S64Numerik";

/**
 * DIE EINE EINSICHT: Ein zurückgehaltener Wert zeigt, wie viel von der
 * Vorhersage aus den Daten stammt und wie viel bloß die Füllregel ist. Genau
 * das ist der Einwand aus Bemerkung 6.4.13 gegen Algorithmus 6.4.11, hier zum
 * Selbst-Nachprüfen (Muster 8: Aufgabe mit Erfolgskontrolle).
 *
 * FARBROLLEN (Kapitel 6): orange = Singulärwerte σ, rot = Rest- und
 * Fehlerterme (Abweichung der Vorhersage, Markierung zurückgehaltener Werte),
 * blau = Sättigung der Bewertungszellen, grau = Nebenangaben.
 *
 * PROVENIENZ: Tabellen-/Heatmap-Renderer (MovieHeat) und SVD-Kern sind aus der
 * privaten mml-ch4-App portiert (widgets/S46Widgets.tsx, widgets/svd.ts); aus
 * widgets/MovieRatings.tsx ist nichts übernommen. Die Daten stammen von der
 * Folie, Nutzer- und Filmnamen sind frei erfunden, alle Texte neu.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-06-svd/verify-kap06.mjs,
 * 2026-08-19) für die Bewertungsmatrix aus Beispiel 6.4.10, aufgefüllt mit den
 * Spaltenmitteln 3,5 · 3 · 2,5 · 3,5 · 4,5 (Gesamtmittel 3,364, 11 bekannte
 * Einträge):
 *   Singulärwerte der aufgefüllten Matrix 15,574 · 2,844 · 2,671 · 0,464 · 0,
 *   Energie-Anteil 94,0 % (k=1), 97,2 % (k=2), 99,9 % (k=3);
 *   RMSE auf den 11 bekannten Bewertungen 1,143 (k=1), 0,735 (k=2), 0,108 (k=3);
 *   Vorhersage für Ada bei „Nachtzug" 3,07 (k=1), 3,34 (k=2), 3,02 (k=3).
 * Zurückgehaltene Bewertung (scratchpad/verify-06-svd/verify-empfehlung-test.mjs,
 * 2026-08-19): Ada bei „Sternenstaub" (wahr 5) wird zu 1,744 (k=1), 1,793 (k=2),
 * 1,950 (k=3) vorhergesagt, weil das Spaltenmittel ohne diese Bewertung von 3,5
 * auf 2,0 fällt.
 */

const ORANGE = FMM_COLORS.orange;
const ROT = FMM_COLORS.rot;
const GRAU = FMM_COLORS.grau;

const NUTZER = ["Ada", "Bruno", "Carla", "Deniz"];
const FILME = ["Sternenstaub", "Nachtzug", "Tiefsee", "Bergsommer", "Kaltes Licht"];

/** Bewertungsmatrix der Folie: 4 Nutzer (Zeilen) × 5 Filme (Spalten), null = nicht bewertet */
const R0: (number | null)[][] = [
  [5, null, 1, null, 4],
  [null, 3, null, 4, null],
  [2, 1, null, null, 5],
  [null, 5, 4, 3, null],
];

const ZEILEN = R0.length;
const SPALTEN = R0[0].length;

type Modus = "spalte" | "zeile" | "gesamt";

const MODUS_NAME: Record<Modus, string> = {
  spalte: "Filmmittel (Spalten)",
  zeile: "Nutzermittel (Zeilen)",
  gesamt: "Gesamtmittel",
};

/** Dativ-Formulierung für den Fließtext („Aufgefüllt haben wir mit …") */
const MODUS_SATZ: Record<Modus, string> = {
  spalte: "dem Mittel der jeweiligen Filmspalte",
  zeile: "dem Mittel der jeweiligen Nutzerzeile",
  gesamt: "dem Gesamtmittel",
};

const fmt = (v: number, stellen = 2) => fmtDe(v, stellen);

const prozent = (v: number) => (Number.isFinite(v) ? `${fmt(100 * v, 1)} %` : fmt(v));

/** Bewertungen 0…5 auf eine blaue Sättigung abbilden */
function zellFarbe(v: number): string {
  const t = Math.min(1, Math.max(0, v / 5));
  return `rgba(0, 114, 178, ${(0.08 + 0.62 * t).toFixed(3)})`;
}

function Kopf({ children }: { children: ReactNode }) {
  return (
    <th className="px-1 pb-1 text-center text-xs font-normal" style={{ color: GRAU }}>
      {children}
    </th>
  );
}

export function EmpfehlungsExplorer() {
  const [k, setK] = useState(2);
  const [modus, setModus] = useState<Modus>("spalte");
  const [versteckt, setVersteckt] = useState<boolean[][]>(() =>
    R0.map((row) => row.map(() => false))
  );

  const beobachtet = (i: number, j: number) => R0[i][j] !== null && !versteckt[i][j];

  /** Auffüllen der Lücken nach der gewählten Regel */
  const { F, fuellwert, gesamtMittel, anzahlBeobachtet } = useMemo(() => {
    const werte: number[] = [];
    for (let i = 0; i < ZEILEN; i++)
      for (let j = 0; j < SPALTEN; j++) if (beobachtet(i, j)) werte.push(R0[i][j] as number);
    const gesamt = werte.length > 0 ? werte.reduce((a, x) => a + x, 0) / werte.length : 0;

    const spaltenMittel = Array.from({ length: SPALTEN }, (_, j) => {
      const xs: number[] = [];
      for (let i = 0; i < ZEILEN; i++) if (beobachtet(i, j)) xs.push(R0[i][j] as number);
      return xs.length > 0 ? xs.reduce((a, x) => a + x, 0) / xs.length : gesamt;
    });
    const zeilenMittel = Array.from({ length: ZEILEN }, (_, i) => {
      const xs: number[] = [];
      for (let j = 0; j < SPALTEN; j++) if (beobachtet(i, j)) xs.push(R0[i][j] as number);
      return xs.length > 0 ? xs.reduce((a, x) => a + x, 0) / xs.length : gesamt;
    });

    const wert = (i: number, j: number) =>
      modus === "spalte" ? spaltenMittel[j] : modus === "zeile" ? zeilenMittel[i] : gesamt;

    const M0: Mat = Array.from({ length: ZEILEN }, (_, i) =>
      Array.from({ length: SPALTEN }, (_, j) => (beobachtet(i, j) ? (R0[i][j] as number) : wert(i, j)))
    );
    return {
      F: M0,
      fuellwert: wert,
      gesamtMittel: gesamt,
      anzahlBeobachtet: werte.length,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modus, versteckt]);

  const svd = useMemo(() => jacobiSVD(F), [F]);
  const Rk = useMemo(() => rankK(svd, k), [svd, k]);

  // Güte auf den Einträgen, die das Modell wirklich gesehen hat
  const { rmse, anzahl } = useMemo(() => {
    let s = 0;
    let c = 0;
    for (let i = 0; i < ZEILEN; i++)
      for (let j = 0; j < SPALTEN; j++)
        if (beobachtet(i, j)) {
          s += ((R0[i][j] as number) - Rk[i][j]) ** 2;
          c++;
        }
    return { rmse: c > 0 ? Math.sqrt(s / c) : NaN, anzahl: c };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Rk, versteckt]);

  // zurückgehaltene Bewertungen: echter Test der Vorhersage
  const tests = useMemo(() => {
    const out: { i: number; j: number; wahr: number; hut: number }[] = [];
    for (let i = 0; i < ZEILEN; i++)
      for (let j = 0; j < SPALTEN; j++)
        if (R0[i][j] !== null && versteckt[i][j])
          out.push({ i, j, wahr: R0[i][j] as number, hut: Rk[i][j] });
    return out;
  }, [Rk, versteckt]);

  const umschalten = (i: number, j: number) => {
    if (R0[i][j] === null) return;
    setVersteckt((v) => v.map((row, a) => row.map((x, b) => (a === i && b === j ? !x : x))));
  };

  const energie = energieAnteil(svd.s, k);
  const rang = svd.s.filter((s) => s > 1e-9).length;

  return (
    <div>
      <Aufgabe>
        Klicken wir in der linken Tabelle auf eine Bewertung: Sie wird zurückgehalten, und wir
        sehen, wie gut das Modell sie ohne diese Information trifft.
      </Aufgabe>

      <div className="mt-3 max-w-md">
        <Slider
          label="Rang k"
          value={k}
          onChange={(v) => setK(Math.round(v))}
          min={1}
          max={4}
          step={1}
          fmt={(v) => v.toFixed(0)}
        />
      </div>

      <div className="my-2 flex flex-wrap items-center gap-2 text-sm">
        <span style={{ color: GRAU }}>Lücken füllen mit:</span>
        {(Object.keys(MODUS_NAME) as Modus[]).map((mo) => (
          <button
            key={mo}
            type="button"
            className={modus === mo ? W_BUTTON_AKTIV : W_BUTTON}
            aria-pressed={modus === mo}
            onClick={() => setModus(mo)}
          >
            {MODUS_NAME[mo]}
          </button>
        ))}
        <button
          type="button"
          className={W_BUTTON}
          onClick={() => setVersteckt(R0.map((row) => row.map(() => false)))}
        >
          alle Bewertungen zurückholen
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-start justify-center gap-6">
        <div>
          <p className="mb-1 text-center text-sm font-medium">
            Bewertungen <M>{"\\bR"}</M> ({anzahlBeobachtet} von {ZEILEN * SPALTEN} bekannt)
          </p>
          <div className="overflow-x-auto">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th />
                  {FILME.map((f) => (
                    <Kopf key={f}>{f}</Kopf>
                  ))}
                </tr>
              </thead>
              <tbody>
                {R0.map((row, i) => (
                  <tr key={NUTZER[i]}>
                    <td className="pr-2 text-right text-xs" style={{ color: GRAU }}>
                      {NUTZER[i]}
                    </td>
                    {row.map((v, j) => (
                      <td key={j} className="p-0">
                        <button
                          type="button"
                          onClick={() => umschalten(i, j)}
                          disabled={v === null}
                          title={
                            v === null
                              ? "nie bewertet"
                              : versteckt[i][j]
                                ? "zurückgehalten; klicken, um sie wieder zu verwenden"
                                : "klicken, um diese Bewertung zurückzuhalten"
                          }
                          className="h-9 w-20 border border-slate-300 text-center font-mono text-xs disabled:cursor-default dark:border-slate-600"
                          style={{
                            backgroundColor: beobachtet(i, j) ? zellFarbe(v as number) : "transparent",
                            outline: versteckt[i][j] ? `2px dashed ${ROT}` : undefined,
                            outlineOffset: "-3px",
                          }}
                        >
                          {beobachtet(i, j) ? (v as number).toFixed(0) : "?"}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <p className="mb-1 text-center text-sm font-medium">
            Rang-{k}-Rekonstruktion <M>{`\\bR_{${k}}`}</M>
          </p>
          <div className="overflow-x-auto">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th />
                  {FILME.map((f) => (
                    <Kopf key={f}>{f}</Kopf>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Rk.map((row, i) => (
                  <tr key={NUTZER[i]}>
                    <td className="pr-2 text-right text-xs" style={{ color: GRAU }}>
                      {NUTZER[i]}
                    </td>
                    {row.map((v, j) => (
                      <td
                        key={j}
                        className="h-9 w-20 border border-slate-300 text-center font-mono text-xs dark:border-slate-600"
                        style={{
                          backgroundColor: zellFarbe(v),
                          outline: beobachtet(i, j) ? undefined : `2px dashed ${GRAU}`,
                          outlineOffset: "-3px",
                        }}
                      >
                        {fmt(v, 1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1 max-w-xs text-xs" style={{ color: GRAU }}>
            Gestrichelt umrandet sind die Felder, die das Modell selbst ergänzt hat.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-sm">
        <p>
          Aufgefüllt haben wir mit {MODUS_SATZ[modus]}; das Gesamtmittel aller bekannten
          Bewertungen liegt bei {fmt(gesamtMittel)}. Beispielhaft steht in der Lücke
          von {NUTZER[0]} bei „{FILME[1]}" vor der Zerlegung {fmt(fuellwert(0, 1))} und nach der
          Rang-{k}-Glättung {fmt(Rk[0][1], 1)}.
        </p>
        <p>
          Singulärwerte der aufgefüllten Matrix:{" "}
          <span style={{ color: ORANGE }}>
            {svd.s
              .slice(0, 4)
              .map((s) => fmt(s))
              .join(", ")}
          </span>
          . Die ersten {k} tragen {prozent(energie)} der Energie; der Rang der aufgefüllten
          Matrix ist {rang}.
        </p>
        <p>
          Wurzel der mittleren quadratischen Abweichung auf den {anzahl} verwendeten
          Bewertungen: {fmt(rmse)}.{" "}
          {k >= 4
            ? "Bei k = 4 gibt die Zerlegung die aufgefüllte Matrix exakt zurück, samt der Mittelwerte, die wir selbst hineingeschrieben haben. Nützlich ist das nicht: Erst das Abschneiden macht aus dem Auffüllen eine Vorhersage."
            : "Kleines k glättet stark, großes k bildet auch die eigenen Füllwerte nach."}
        </p>
      </div>

      {tests.length > 0 ? (
        <Verdikt
          kind={tests.every((t) => Math.abs(t.hut - t.wahr) < 1) ? "ok" : "warn"}
          titel="Echter Test:"
        >
          <ul className="ml-4 list-disc space-y-0.5">
            {tests.map((t) => (
              <li key={`${t.i}-${t.j}`}>
                {NUTZER[t.i]} bei „{FILME[t.j]}": vorhergesagt {fmt(t.hut, 1)}, tatsächlich{" "}
                {t.wahr}, Abweichung{" "}
                <span style={{ color: ROT }}>{fmt(Math.abs(t.hut - t.wahr), 1)}</span>.
              </li>
            ))}
          </ul>
          Diese Felder hat das Modell nicht gesehen; alles andere in seiner Vorhersage stammt
          aus den übrigen Bewertungen und aus der Füllregel selbst (Bemerkung 6.4.13).
        </Verdikt>
      ) : (
        <Verdikt kind="neutral">
          Noch ist keine Bewertung zurückgehalten. Solange das Modell jede Zahl kennt, prüft der
          RMSE nur, wie gut es die eigenen Eingaben nachbaut, und wächst mit kleinerem{" "}
          <M>{"k"}</M> allein deshalb.
        </Verdikt>
      )}
    </div>
  );
}
