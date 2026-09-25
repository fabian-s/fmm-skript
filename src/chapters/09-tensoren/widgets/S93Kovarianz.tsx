import { useState } from "react";
import { Aufgabe, FMM_COLORS, M, Slider, Verdikt, fmtDe } from "../../../lib";

/**
 * Einsicht: Eine separierbare Kovarianz ersetzt eine große mn×mn-Matrix durch
 * zwei kleine Faktoren und spart damit Parameter und gespeicherte Einträge.
 * Farbrollen: Zeitfaktor blau, Ortsfaktor grün, allgemeine Matrix orange,
 * separierbare Darstellung violett. Provenienz: Eigenbau.
 * Zahlen geprüft mit scripts/verify/KAP09/s93-kovarianz.mjs (2026-08-20):
 * m=10,n=50: 125250 vs. 1330 freie Parameter, 250000 vs. 2600 Einträge.
 */
const { blau: BLAU, gruen: GRUEN, orange: ORANGE, violett: VIOLETT } = FMM_COLORS;

export function SeparierbareKovarianzDemo() {
  const [orte, setOrte] = useState(10);
  const [zeiten, setZeiten] = useState(50);
  const dimension = orte * zeiten;
  const allgemein = (dimension * (dimension + 1)) / 2;
  const separierbar = (orte * (orte + 1)) / 2 + (zeiten * (zeiten + 1)) / 2;
  const allgemeinSpeicher = dimension ** 2;
  const faktorSpeicher = orte ** 2 + zeiten ** 2;
  const sparquote = 100 * (1 - separierbar / allgemein);
  const gross = dimension >= 100;

  return (
    <div>
      <Aufgabe>Verändern wir Orte und Zeitpunkte und vergleichen die beiden Modellgrößen.</Aufgabe>
      {/* Kein role="img": die beiden Karten sind Text, ihre Zahlen müssen für
          Hilfsmittel einzeln erreichbar bleiben. */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded border p-3" style={{ borderColor: ORANGE }}>
          <div className="text-sm font-semibold">
            allgemein: <M>{`\\bSigma \\in \\R^{${dimension} \\times ${dimension}}`}</M>
          </div>
          <div className="mt-2 font-mono text-2xl" style={{ color: ORANGE }}>{fmtDe(allgemein, 0)}</div>
          <div className="text-sm">freie Parameter</div>
          <div className="mt-2 font-mono text-sm">{fmtDe(allgemeinSpeicher, 0)} gespeicherte Einträge</div>
        </div>
        <div className="rounded border p-3" style={{ borderColor: VIOLETT }}>
          <div className="text-sm font-semibold"><span style={{ color: BLAU }}>Σ_T</span> ⊗_K <span style={{ color: GRUEN }}>Σ_S</span></div>
          <div className="mt-2 font-mono text-2xl" style={{ color: VIOLETT }}>{fmtDe(separierbar, 0)}</div>
          <div className="text-sm">freie Parameter in zwei Faktoren</div>
          <div className="mt-2 font-mono text-sm">{fmtDe(faktorSpeicher, 0)} gespeicherte Einträge</div>
        </div>
      </div>
      <div className="mt-3 max-w-md">
        <Slider label="Orte m" value={orte} onChange={setOrte} min={2} max={50} step={1} accent={GRUEN} />
        <Slider label="Zeitpunkte n" value={zeiten} onChange={setZeiten} min={2} max={50} step={1} accent={BLAU} />
      </div>
      <Verdikt kind={gross ? "ok" : "neutral"}>
        {gross
          ? `Für ${orte} Orte und ${zeiten} Zeitpunkte spart die separierbare Annahme ${fmtDe(sparquote, 1)} % der freien Parameter: zwei Muster statt einer ${dimension}×${dimension}-Matrix. Die allgemeine Zahl wächst wie (mn)²/2, die separierbare nur wie (m² + n²)/2 – der Abstand ist eine Größenordnung, keine Konstante.`
          : `Bei ${orte}×${zeiten} Messwerten sind es ${fmtDe(allgemein, 0)} gegen ${fmtDe(separierbar, 0)} freie Parameter. Auf einem so kleinen Gitter ist die separierbare Annahme also vor allem eine Modellannahme und noch keine Notwendigkeit; die Ersparnis lohnt den Verlust an Flexibilität erst weiter oben.`}
      </Verdikt>
    </div>
  );
}
