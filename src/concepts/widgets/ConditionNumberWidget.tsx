/**
 * Konzept-Widget `condition-number`.
 *
 * DIE EINE EINSICHT: cond₂(A) ist nichts Abstraktes, sondern das Verhältnis
 * der längsten zur kürzesten Halbachse der Ellipse, auf die A den
 * Einheitskreis abbildet. Wer x auf dem Kreis herumzieht, misst dieses
 * Verhältnis selbst ab: dieselbe Störung wird je nach Richtung ganz
 * unterschiedlich stark gestreckt.
 *
 * FARBROLLEN: rot = der Eingabevektor x auf dem Einheitskreis (das Objekt in
 * der Hand), blau = sein Bild Ax und die Bildellipse (so setzt es die Lib),
 * neutral gestrichelt = der Einheitskreis als Urbild.
 *
 * PROVENIENZ: Vorgängerwidget (Stand 2026-08-18) mit einem ε-Regler und einer
 * statischen Erklärzeile. Neu sind der ziehbare Vektor auf dem Einheitskreis
 * (Lib-`TransformCanvas`, `dragConstraint: "unitCircle"`), der logarithmische
 * ε-Regler und das dreistufige Verdikt mit Bezug auf Satz 4.2.6.
 *
 * VERIFIZIERTE ZAHLEN (node, scratchpad/verify-konzepte-C2/check-gruppeA1.mjs,
 * 2026-08-19), A = [[1, 1], [1, 1+ε]], det A = ε:
 *   ε = 1     : σmax = 2,6180  σmin = 0,381966  cond = 6,85   (0,84 Stellen)
 *   ε = 0,3   : σmax = 2,1612  σmin = 0,138813  cond = 15,57  (1,19 Stellen)
 *   ε = 0,1   : σmax = 2,0512  σmin = 0,048751  cond = 42,08  (1,62 Stellen)
 *   ε = 0,01  : σmax = 2,0050  σmin = 0,004988  cond = 402,01 (2,60 Stellen)
 *   ε = 0,001 : σmax = 2,0005  σmin = 0,000500  cond = 4002   (3,60 Stellen)
 * σmax und σmin stimmen mit dem numerisch über 200 000 Kreispunkte gesuchten
 * Maximum bzw. Minimum von ‖Ax‖ überein (Abweichung ≤ 1,8e−8). Der Regler
 * deckt ε ∈ [0,001; 1] ab, also cond ∈ [6,85; 4002] und damit alle drei
 * Verdiktklassen.
 */
import { useState } from "react";
import {
  Aufgabe,
  FMM_COLORS,
  Slider,
  LabeledTransformCanvas,
  Verdikt,
  fmtDe,
  sigmaMax,
  type Mat2,
} from "../../lib";

export function CondWidget() {
  // Voreinstellung ε = 0,3: die Ellipse ist schon deutlich länglich (cond ≈ 16),
  // aber noch nicht zur Nadel entartet – der Effekt ist sichtbar, nicht extrem.
  const [eps, setEps] = useState(0.3);
  const [winkel, setWinkel] = useState(60);

  const A: Mat2 = [
    [1, 1],
    [1, 1 + eps],
  ];
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0]; // = ε
  const s1 = sigmaMax(A);
  const s2 = Math.abs(det) / s1;
  const cond = s1 / s2;
  const stellen = Math.log10(cond);

  const th = (winkel * Math.PI) / 180;
  const x: [number, number] = [Math.cos(th), Math.sin(th)];
  const Ax: [number, number] = [
    A[0][0] * x[0] + A[0][1] * x[1],
    A[1][0] * x[0] + A[1][1] * x[1],
  ];
  const streckung = Math.hypot(Ax[0], Ax[1]);

  const klasse = cond < 10 ? "ok" : cond < 1000 ? "warn" : "fail";
  const condTxt = fmtDe(cond, cond < 100 ? 2 : 0);
  const worldHalf = Math.max(2.6, s1 * 1.15);

  return (
    <div className="mt-2 rounded bg-slate-700/60 p-2">
      <Aufgabe>
        Ziehen wir x auf dem Kreis herum und suchen die Richtung, in der Ax am
        kürzesten wird.
      </Aufgabe>
      <LabeledTransformCanvas
        matrix={A}
        size={280}
        worldHalf={worldHalf}
        showGrid={false}
        showUnitCircle
        vectors={[
          { v: x, color: FMM_COLORS.rot, label: "x", draggable: true, dragConstraint: "unitCircle" },
          { v: Ax, color: FMM_COLORS.blau, label: "Ax" },
        ]}
        onVectorChange={(_i, v) =>
          setWinkel(((Math.atan2(v[1], v[0]) * 180) / Math.PI + 360) % 360)
        }
        ariaLabel={`Der Einheitskreis und seine Bildellipse unter A; in der aktuellen Richtung wird x auf die Länge ${fmtDe(streckung, 2)} gestreckt.`}
      />
      <Slider
        label="Richtung von x"
        value={winkel}
        onChange={setWinkel}
        min={0}
        max={360}
        step={1}
        fmt={(v) => `${fmtDe(v, 0)}°`}
        accent={FMM_COLORS.rot}
      />
      <Slider
        label="ε"
        value={Math.log10(eps)}
        onChange={(v) => setEps(10 ** v)}
        min={-3}
        max={0}
        step={0.05}
        fmt={(v) => fmtDe(10 ** v, 10 ** v < 0.01 ? 4 : 3)}
      />
      <p className="mt-1 text-xs" style={{ color: "var(--w-muted, #64748b)" }}>
        A = [[1; 1], [1; {fmtDe(1 + eps, 2)}]] · gestrichelt der Einheitskreis ·{" "}
        <span style={{ color: FMM_COLORS.blau }}>▮</span> seine Bildellipse
      </p>
      <Verdikt kind={klasse}>
        σmax = {fmtDe(s1, 3)}, σmin = {fmtDe(s2, 4)}, also cond₂(A) ={" "}
        {condTxt}; in der eingestellten Richtung wird x auf{" "}
        {fmtDe(streckung, 3)} gestreckt.{" "}
        {cond < 10
          ? "Jede Richtung wird ähnlich stark gestreckt: Satz 4.2.6 schätzt den relativen Fehler der Lösung mit cond(A) mal dem relativen Datenfehler ab, hier also noch mit einem einstelligen Faktor."
          : cond < 1000
            ? `Längste und kürzeste Halbachse liegen schon spürbar auseinander. Nach Satz 4.2.6 wird ein relativer Datenfehler bis zum ${condTxt}-Fachen verstärkt: rund ${fmtDe(stellen, 1)} Dezimalstellen gehen verloren.`
            : `Die Ellipse ist zur Nadel entartet. Der Fehlerverstärkungsfaktor aus Satz 4.2.6 liegt bei ${condTxt}, wir verlieren also etwa ${fmtDe(stellen, 1)} Dezimalstellen: von den 16 Stellen doppelter Genauigkeit bleiben nur noch ${fmtDe(16 - stellen, 1)}.`}
      </Verdikt>
    </div>
  );
}
