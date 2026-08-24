/**
 * Konzept-Widget `gaussian-elimination`.
 *
 * DIE EINE EINSICHT: Jeder Eliminationsschritt räumt genau eine Pivotspalte,
 * und er tut das mit EINEM Multiplikator je Zeile — mehr passiert nicht.
 *
 * FARBROLLEN: orange = die Einträge, die dieser Schritt gerade verändert hat;
 * grün = die neu erzeugten Nullen; alle übrigen Einträge bleiben in der
 * Textfarbe (--w-text), weil sie unangetastet geblieben sind.
 *
 * PROVENIENZ: eigener Aufbau; Schrittsteuerung über `Stepper` aus der Lib.
 *
 * VERIFIZIERTE ZAHLEN (node, scripts/verify/QA-O0/check-o0.mjs, 2026-08-20),
 * A = [2 1 1; 4 5 1; 2 −2 0]:
 *   Schritt 1: m₂₁ = 4/2 = 2, m₃₁ = 2/2 = 1 → [2 1 1; 0 3 −1; 0 −3 −1].
 *   Schritt 2: m₃₂ = −3/3 = −1 → [2 1 1; 0 3 −1; 0 0 −2].
 * Alle drei Multiplikatoren und beide Zwischenmatrizen sind per Assertion
 * nachgerechnet.
 */
import { useState } from "react";
import { Aufgabe, FMM_COLORS, Stepper, Verdikt, W_PANEL, W_TEXT } from "../../lib";

const MATRIZEN = [
  [
    [2, 1, 1],
    [4, 5, 1],
    [2, -2, 0],
  ],
  [
    [2, 1, 1],
    [0, 3, -1],
    [0, -3, -1],
  ],
  [
    [2, 1, 1],
    [0, 3, -1],
    [0, 0, -2],
  ],
];

/** Welche Zeilen hat der Schritt k gerade verändert? */
const GEAENDERT: number[][] = [[], [1, 2], [2]];

const TEXTE = [
  "1. Pivot in Spalte 1 wählen: a₁₁ = 2.",
  "2. Z₂ ← Z₂ − 2·Z₁ und Z₃ ← Z₃ − 1·Z₁.",
  "3. Z₃ ← Z₃ + 1·Z₂; die Dreiecksform ist erreicht.",
];

const MULTIPLIKATOREN: (string | null)[][] = [
  [null, null, null],
  [null, "·2", "·1"],
  [null, null, "·(−1)"],
];

export function EliminationWidget() {
  const [step, setStep] = useState(0);
  const geaendert = GEAENDERT[step];
  return (
    <div className={`mt-2 p-2 ${W_PANEL}`}>
      <Aufgabe>Gehen wir die nummerierten Zeilenoperationen vor und zurück.</Aufgabe>
      <div className="my-2 flex items-center gap-2">
        <div
          className="inline-grid grid-cols-3 gap-x-4 rounded border-x-2 px-3 py-2 font-mono text-sm"
          style={{ borderColor: "var(--w-border)" }}
        >
          {MATRIZEN[step].flatMap((zeile, i) =>
            zeile.map((v, j) => {
              const neu = geaendert.includes(i);
              const farbe = neu
                ? v === 0
                  ? FMM_COLORS.gruen
                  : FMM_COLORS.orange
                : "var(--w-text)";
              return (
                <span key={`${i}-${j}`} className={neu ? "font-bold" : ""} style={{ color: farbe }}>
                  {v}
                </span>
              );
            }),
          )}
        </div>
        <div className="grid gap-y-1 font-mono text-xs" style={{ color: FMM_COLORS.orange }}>
          {MULTIPLIKATOREN[step].map((m, i) => (
            <span key={i} className="leading-6">
              {m ?? "\u00a0"}
            </span>
          ))}
        </div>
      </div>
      <p className={`text-xs ${W_TEXT}`}>
        Orange: die Einträge, die dieser Schritt verändert hat (rechts der benutzte
        Multiplikator); Grün: die dabei erzeugten Nullen.
      </p>
      <Stepper step={step} setStep={setStep} max={2} narration={TEXTE[step]} />
      <Verdikt kind={step === 2 ? "ok" : "neutral"}>
        {step === 0 ? (
          <>
            Noch ist nichts passiert: der Pivot a₁₁ = 2 ist ungleich null, also können wir durch
            ihn teilen und die beiden Multiplikatoren 4/2 und 2/2 bilden.
          </>
        ) : step === 1 ? (
          <>
            Die erste Spalte ist geräumt; dafür haben wir nur die Multiplikatoren 2 und 1
            gebraucht. Der neue Pivot ist a₂₂ = 3, und darunter steht −3.
          </>
        ) : (
          <>
            Die Einträge unter der Diagonale sind null. Aus den drei Multiplikatoren 2, 1 und −1
            wird die Matrix L; was hier steht, ist U. Jetzt folgt Rückwärtseinsetzen.
          </>
        )}
      </Verdikt>
    </div>
  );
}
