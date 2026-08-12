import { useState } from "react";
import { Slider } from "../../../lib";

/**
 * Separierbare Kovarianz für Skript §9.3.
 *
 * Zwei 2×2-Faktoren (Zeit und Ort) mit je einer Varianz und einer
 * Korrelation, daraus die 4×4-Kovarianzmatrix Sigma_T ⊗ Sigma_S als
 * Wärmekarte mit ausgeschriebenen Zahlen. Ein Klick auf eine Zelle
 * erklärt, welche zwei Beobachtungen sie verbindet und aus welchen beiden
 * Faktoren ihr Wert entsteht.
 *
 * Eigenbau (Aufbau, Rechenkern und alle Texte). Farben wie im Kapitel:
 * Zeitfaktor blau, Ortsfaktor grün, Einträge des Produkts orange; negative
 * Einträge violett, damit Blau und Grün den Faktoren vorbehalten bleiben.
 */

const BLAU = "#0072B2";
const GRUEN = "#009E73";
const ORANGE = "#E69F00";
const ROT = "#D55E00";
const VIOLETT = "#9E57D5";
const GRAU = "#64748b";

function fmt(v: number, stellen = 2): string {
  if (!Number.isFinite(v)) return Number.isNaN(v) ? "n. d." : v > 0 ? "∞" : "−∞";
  return v.toFixed(stellen).replace("-", "−").replace(".", ",");
}

/** Index 0..3 → (Zeitpunkt, Ort), beide 0-basiert: Ort läuft schnell. */
const zeit = (k: number) => Math.floor(k / 2);
const ort = (k: number) => k % 2;
const marke = (k: number) => `Ort ${ort(k) + 1}, Zeit ${zeit(k) + 1}`;
const kurz = (k: number) => `O${ort(k) + 1} Z${zeit(k) + 1}`;

export function SeparierbareKovarianzDemo() {
  const [varT, setVarT] = useState(1);
  const [rhoT, setRhoT] = useState(0.8);
  const [varS, setVarS] = useState(2);
  const [rhoS, setRhoS] = useState(0.25);
  const [wahl, setWahl] = useState<[number, number]>([0, 2]);

  const SigT = [
    [varT, varT * rhoT],
    [varT * rhoT, varT],
  ];
  const SigS = [
    [varS, varS * rhoS],
    [varS * rhoS, varS],
  ];
  const Sig = Array.from({ length: 4 }, (_, k) =>
    Array.from({ length: 4 }, (_, l) => SigT[zeit(k)][zeit(l)] * SigS[ort(k)][ort(l)])
  );

  const maxBetrag = Math.max(...Sig.flat().map(Math.abs), 1e-9);
  const [zk, zl] = wahl;
  const wert = Sig[zk][zl];
  const faktorT = SigT[zeit(zk)][zeit(zl)];
  const faktorS = SigS[ort(zk)][ort(zl)];
  const korr = wert / Math.sqrt(Sig[zk][zk] * Sig[zl][zl]);

  /** Eigenwerte des Produkts sind die Produkte der Eigenwerte der Faktoren. */
  const ewT = [varT * (1 + rhoT), varT * (1 - rhoT)];
  const ewS = [varS * (1 + rhoS), varS * (1 - rhoS)];
  const ew = ewT.flatMap((a) => ewS.map((b) => a * b)).sort((a, b) => b - a);
  const definit = ew[3] > 1e-12;

  const zelle = (v: number, k: number, l: number) => {
    const gewaehlt = k === zk && l === zl;
    return (
      <button
        key={`${k}-${l}`}
        type="button"
        onClick={() => setWahl([k, l])}
        className="px-2 py-1 text-right font-mono text-xs"
        style={{
          backgroundColor: `${v < 0 ? VIOLETT : ORANGE}${Math.round(
            18 + 200 * (Math.abs(v) / maxBetrag)
          )
            .toString(16)
            .padStart(2, "0")}`,
          outline: gewaehlt ? `2px solid ${ROT}` : "1px solid #cbd5e1",
          outlineOffset: gewaehlt ? "-2px" : "-1px",
          color: "#1e293b",
        }}
        title={`${marke(k)} mit ${marke(l)}`}
      >
        {fmt(v)}
      </button>
    );
  };

  return (
    <div>
      <p className="text-sm">
        Links stehen die beiden Faktoren, rechts ihr Kroneckerprodukt. Die vier Beobachtungen
        sind so angeordnet, dass der Ort schnell und die Zeit langsam läuft; die 2×2-Blöcke der
        großen Matrix gehören deshalb zu Zeitpaaren, die Einträge innerhalb eines Blocks zu
        Ortspaaren. Ein Klick auf eine Zelle sagt, welche zwei Beobachtungen sie verbindet.
      </p>

      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <div>
          <div className="mb-1 font-mono text-xs" style={{ color: BLAU }}>
            Zeit: Σ_T ∈ ℝ<sup>2×2</sup>
          </div>
          <Slider
            label="Varianz Zeit"
            value={varT}
            onChange={setVarT}
            min={0.2}
            max={3}
            step={0.1}
            fmt={(v) => fmt(v, 1)}
          />
          <Slider
            label="Korrelation ρ_T"
            value={rhoT}
            onChange={setRhoT}
            min={-0.95}
            max={0.95}
            step={0.05}
            fmt={(v) => fmt(v)}
          />
        </div>
        <div>
          <div className="mb-1 font-mono text-xs" style={{ color: GRUEN }}>
            Ort: Σ_S ∈ ℝ<sup>2×2</sup>
          </div>
          <Slider
            label="Varianz Ort"
            value={varS}
            onChange={setVarS}
            min={0.2}
            max={3}
            step={0.1}
            fmt={(v) => fmt(v, 1)}
          />
          <Slider
            label="Korrelation ρ_S"
            value={rhoS}
            onChange={setRhoS}
            min={-0.95}
            max={0.95}
            step={0.05}
            fmt={(v) => fmt(v)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-6 overflow-x-auto">
        <div className="flex flex-col gap-3">
          <div>
            <div className="mb-1 text-xs" style={{ color: BLAU }}>
              Σ_T (Zeitpunkte)
            </div>
            <div className="inline-grid gap-x-3 rounded border-x-2 px-2 py-1 font-mono text-xs"
              style={{
                gridTemplateColumns: "repeat(2, minmax(2.6rem, auto))",
                borderColor: BLAU,
                backgroundColor: "#ffffff",
              }}>
              {SigT.flatMap((r, i) =>
                r.map((v, j) => (
                  <span key={`t-${i}-${j}`} className="text-right" style={{ color: BLAU }}>
                    {fmt(v)}
                  </span>
                ))
              )}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs" style={{ color: GRUEN }}>
              Σ_S (Orte)
            </div>
            <div className="inline-grid gap-x-3 rounded border-x-2 px-2 py-1 font-mono text-xs"
              style={{
                gridTemplateColumns: "repeat(2, minmax(2.6rem, auto))",
                borderColor: GRUEN,
                backgroundColor: "#ffffff",
              }}>
              {SigS.flatMap((r, i) =>
                r.map((v, j) => (
                  <span key={`s-${i}-${j}`} className="text-right" style={{ color: GRUEN }}>
                    {fmt(v)}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs" style={{ color: GRAU }}>
            Σ = Σ_T ⊗ Σ_S ∈ ℝ<sup>4×4</sup>
          </div>
          <div
            className="inline-grid gap-px rounded p-1"
            style={{
              gridTemplateColumns: "auto repeat(4, minmax(3.2rem, auto))",
              backgroundColor: "#ffffff",
            }}
          >
            <span />
            {[0, 1, 2, 3].map((l) => (
              <span key={`kopf-${l}`} className="px-1 text-center text-[10px]" style={{ color: GRAU }}>
                {kurz(l)}
              </span>
            ))}
            {Sig.flatMap((r, k) => [
              <span
                key={`zeile-${k}`}
                className="pr-2 text-right text-[10px] leading-6"
                style={{ color: GRAU }}
              >
                {kurz(k)}
              </span>,
              ...r.map((v, l) => zelle(v, k, l)),
            ])}
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm" style={{ color: GRAU }}>
        Gewählt ist Eintrag ({zk + 1}, {zl + 1}), also {marke(zk)} mit {marke(zl)}:{" "}
        {zk === zl ? "eine Varianz" : "eine Kovarianz"} vom Wert {fmt(wert)} ={" "}
        <span style={{ color: BLAU }}>{fmt(faktorT)}</span> ·{" "}
        <span style={{ color: GRUEN }}>{fmt(faktorS)}</span>. Der{" "}
        <span style={{ color: BLAU }}>Zeitfaktor</span> steht für das Paar (Zeit{" "}
        {zeit(zk) + 1}, Zeit {zeit(zl) + 1}), der{" "}
        <span style={{ color: GRUEN }}>Ortsfaktor</span> für (Ort {ort(zk) + 1}, Ort{" "}
        {ort(zl) + 1}). Als Korrelation gelesen: {fmt(korr)} ={" "}
        {fmt(zeit(zk) === zeit(zl) ? 1 : rhoT)} · {fmt(ort(zk) === ort(zl) ? 1 : rhoS)}.
      </p>

      <p className="mt-1 text-sm" style={{ color: GRAU }}>
        Zustand: Varianz Zeit {fmt(varT, 1)}, ρ_T = {fmt(rhoT)}, Varianz Ort {fmt(varS, 1)},
        ρ_S = {fmt(rhoS)}. Die vier Eigenwerte von Σ sind die Produkte der Eigenwerte beider
        Faktoren: {ew.map((e) => fmt(e)).join("; ")}. Σ ist damit{" "}
        {definit ? "positiv definit" : "nur positiv semidefinit"}. Die Schieber halten die beiden
        Varianzen innerhalb eines Faktors gleich und fahren so 4 der 6 Parameter des
        separierbaren Modells ab; eine beliebige symmetrische 4×4-Matrix hätte 10.
      </p>

      <p className="mt-1 text-xs" style={{ color: GRAU }}>
        Farben: Σ_T blau, Σ_S grün, Einträge des Produkts orange, negative Einträge violett.
        Die Deckkraft trägt den Betrag, gemessen am größten Eintrag der aktuellen Matrix.
      </p>
    </div>
  );
}
