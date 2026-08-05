import { useState, type ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD, Proof, PStep } from "../../lib";
import { S23FlopWidget, S23GrowthWidget, S23KonstantenWidget } from "./widgets/S23Aufwand";

/**
 * Abschnitt 2.3 — Aufwand und Komplexität.
 * Quelle: Folien 02-algos.Rmd, Block „Aufwand und Komplexität" (inkl. der
 * beiden Quiz-Folien als Selbsttests). Prosa eigenständig aus den Folien
 * formuliert; Widgets eigenständig implementiert.
 */

/* ------------------------------------------------------------------ */
/* Selbsttest: Multiple-Choice mit aufklappbarer Lösung                */
/* ------------------------------------------------------------------ */

function SelfTest({
  frage,
  optionen,
  richtig,
  loesung,
}: {
  frage: ReactNode;
  optionen: ReactNode[];
  richtig: number;
  loesung: ReactNode;
}) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const answered = chosen !== null;
  const correct = answered && chosen === richtig;
  return (
    <div className="my-4 max-w-prose rounded border border-slate-200 p-4 dark:border-slate-700">
      <div className="mb-3">{frage}</div>
      <div className="flex flex-col gap-2">
        {optionen.map((opt, i) => {
          const isChosen = chosen === i;
          const cls = isChosen
            ? i === richtig
              ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40"
              : "border-red-600 bg-red-50 dark:bg-red-950/40"
            : "border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800";
          return (
            <button
              key={i}
              type="button"
              className={`rounded border px-3 py-1.5 text-left text-sm ${cls}`}
              onClick={() => setChosen(i)}
            >
              <span className="mr-2 font-mono text-xs text-slate-500">
                {String.fromCharCode(97 + i)})
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <p
          className={`mt-3 text-sm font-medium ${
            correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
          }`}
        >
          {correct
            ? "Richtig!"
            : "Leider nein — noch einmal probieren oder die Lösung ansehen."}
        </p>
      )}
      <button
        type="button"
        className="mt-3 rounded bg-slate-200 px-2 py-1 text-xs font-medium hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "Lösung verbergen" : "Lösung anzeigen"}
      </button>
      {open && <div className="mt-3 space-y-2 text-sm">{loesung}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Der Abschnitt                                                       */
/* ------------------------------------------------------------------ */

export function S23() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 02-algos, „Aufwand und Komplexität".
      </p>
      <p>
        In <a className="underline" href="#sec-2.2">Abschnitt 2.2</a> haben wir gesehen, dass
        zwei Algorithmen dasselbe Problem lösen und sich dabei dramatisch unterschiedlich
        anfühlen können: Der Aufruf-Zähler der naiven Fibonacci-Rekursion explodiert schon für
        kleine <M>{"n"}</M>, die iterative Variante ist sofort fertig. „Fühlt sich langsam an" ist aber kein
        mathematischer Begriff. In diesem Abschnitt machen wir daraus eine Größe, die wir{" "}
        <em>zählen</em> können — den Aufwand eines Algorithmus — und lernen dann, wie man
        Aufwände sinnvoll vergleicht: nicht über exakte Zahlen, sondern über ihr{" "}
        <em>Skalierungsverhalten</em>, die Komplexität.
      </p>

      <h3 id="sec-2.3.1" className="mb-2 mt-8 text-xl font-semibold">
        2.3.1 Zeit- und Speicheraufwand
      </h3>
      <p>
        Was kostet ein Algorithmus? Der Computer führt ihn letztlich als Folge{" "}
        <em>elementarer Rechenoperationen</em> aus — Additionen, Subtraktionen,
        Multiplikationen und Divisionen von{" "}
        <ConceptLink id="floating-point">Gleitkommazahlen</ConceptLink>. Jede dieser
        Operationen kostet ungefähr gleich viel Zeit, also ist ihre <em>Anzahl</em> ein gutes
        Maß für die Laufzeit. Genauso können wir zählen, wie viele Zahlen der Algorithmus
        unterwegs im Speicher halten muss.
      </p>
      <EnvBlock kind="Definition" label="2.3.1 (Zeit- und Speicheraufwand)">
        <p>
          Ein Algorithmus werde durch elementare Rechenoperationen{" "}
          <M>{"f_i \\in \\lbrace +, -, \\cdot, / \\rbrace"}</M> ausgeführt.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Der <em>Zeitaufwand</em> des Algorithmus ist die Anzahl dieser elementaren
            Operationen. Höherer Zeitaufwand bedeutet (ungefähr) längere Laufzeit.
          </li>
          <li>
            Der <em>Speicheraufwand</em> ist (in etwa) die Anzahl der gespeicherten und
            zwischengespeicherten Zahlen. Höherer Speicheraufwand bedeutet mehr benötigten
            Speicherplatz.
          </li>
        </ul>
      </EnvBlock>
      <p>
        Elementare Gleitkomma-Operationen heißen in der Numerik-Literatur auch <em>FLOPs</em>{" "}
        (engl. <em>floating point operations</em>) — „der Algorithmus braucht{" "}
        <M>{"2nd"}</M> FLOPs" ist also nur eine kompakte Sprechweise für unseren Zeitaufwand.
        Der Zusatz „ungefähr" in der Definition ist übrigens Absicht: Reale Laufzeiten hängen
        auch von Speicherzugriffen, Zwischenspeichern (Caches) und Parallelisierung ab. Für den
        Vergleich von Algorithmen ist das Zählen der Operationen trotzdem das richtige
        Werkzeug, wie wir gleich sehen werden.
      </p>

      <h3 id="sec-2.3.2" className="mb-2 mt-8 text-xl font-semibold">
        2.3.2 Beispiel: Matrix-Vektor-Multiplikation
      </h3>
      <p>
        Zählen wir das an einem Arbeitspferd der Statistik konkret durch: dem{" "}
        <ConceptLink id="matrix-vector-product">Matrix-Vektor-Produkt</ConceptLink>{" "}
        <M>{"\\by = \\bA\\bx"}</M>. Es steckt in jeder Vorhersage eines linearen Modells und
        in jeder Schicht eines neuronalen Netzes — sein Aufwand ist also alles andere als eine
        akademische Frage. Wir verfolgen die <ConceptLink id="matrix">Matrix</ConceptLink>{" "}
        <M>{"\\cbred{\\bA}"}</M> in Rot und den{" "}
        <ConceptLink id="vector">Vektor</ConceptLink> <M>{"\\cblue{\\bx}"}</M> in Blau durch
        die Rechnung; das Ergebnis <M>{"\\cbgreen{\\by}"}</M> erscheint in Grün.
      </p>
      <EnvBlock kind="Beispiel" label="2.3.2 (Matrix-Vektor-Multiplikation)">
        <p>
          Berechne <M>{"\\by = \\bA\\bx"}</M> für{" "}
          <M>{"\\bA \\in \\R^{3 \\times 2}"}</M>, <M>{"\\bx \\in \\R^2"}</M>, konkret
        </p>
        <MD>{"\\cbred{\\bA} = \\cbred{\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{pmatrix}}, \\qquad \\cblue{\\bx} = \\cblue{\\begin{pmatrix} 7 \\\\ 8 \\end{pmatrix}}."}</MD>
        <p>
          Jede Komponente von <M>{"\\cbgreen{\\by}"}</M> ist das Skalarprodukt einer Zeile von{" "}
          <M>{"\\cbred{\\bA}"}</M> mit <M>{"\\cblue{\\bx}"}</M>:
        </p>
        <MD>{"\\begin{aligned} \\cgreen{y_1} &= \\cred{1} \\cdot \\cblue{7} + \\cred{2} \\cdot \\cblue{8} = 7 + 16 = \\cgreen{23} && \\text{(2 Mult., 1 Add.)} \\\\ \\cgreen{y_2} &= \\cred{3} \\cdot \\cblue{7} + \\cred{4} \\cdot \\cblue{8} = 21 + 32 = \\cgreen{53} && \\text{(2 Mult., 1 Add.)} \\\\ \\cgreen{y_3} &= \\cred{5} \\cdot \\cblue{7} + \\cred{6} \\cdot \\cblue{8} = 35 + 48 = \\cgreen{83} && \\text{(2 Mult., 1 Add.)} \\end{aligned}"}</MD>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <em>Zeitaufwand:</em> <M>{"3 \\cdot 2 = 6"}</M> Multiplikationen und{" "}
            <M>{"3 \\cdot 1 = 3"}</M> Additionen, zusammen <M>{"9"}</M> Operationen.
          </li>
          <li>
            <em>Speicheraufwand:</em> <M>{"6"}</M> Zahlen für <M>{"\\cbred{\\bA}"}</M>,{" "}
            <M>{"2"}</M> für <M>{"\\cblue{\\bx}"}</M>, <M>{"3"}</M> für{" "}
            <M>{"\\cbgreen{\\by}"}</M> — zusammen <M>{"11"}</M> Zahlen.
          </li>
        </ul>
      </EnvBlock>
      <p>
        Das Muster aus dem Beispiel verallgemeinert sich direkt auf beliebige Dimensionen:
      </p>
      <EnvBlock kind="Satz" label="2.3.3 (Aufwand der Matrix-Vektor-Multiplikation)">
        <p>
          Sei <M>{"\\bA \\in \\R^{n \\times d}"}</M> und <M>{"\\bx \\in \\R^d"}</M>. Die
          Berechnung von <M>{"\\by = \\bA\\bx"}</M> hat
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Zeitaufwand <M>{"nd"}</M> Multiplikationen <M>{"+\\; n(d-1)"}</M> Additionen{" "}
            <M>{"= n(2d - 1) \\approx 2nd"}</M> Operationen,
          </li>
          <li>
            Speicheraufwand <M>{"nd + d + n"}</M> Zahlen (für <M>{"\\bA"}</M>,{" "}
            <M>{"\\bx"}</M> und <M>{"\\by"}</M>).
          </li>
        </ul>
      </EnvBlock>
      <Proof>
        <PStep
          why={
            <>
              Definition des{" "}
              <ConceptLink id="matrix-vector-product">Matrix-Vektor-Produkts</ConceptLink>,
              komponentenweise in{" "}
              <ConceptLink id="summation-notation">Summenschreibweise</ConceptLink>
            </>
          }
        >
          <MD>{"\\cgreen{y_i} = \\sum_{j=1}^{d} \\cred{a_{ij}}\\, \\cblue{x_j}, \\qquad i = 1, \\ldots, n"}</MD>
        </PStep>
        <PStep
          why={
            <>
              <M>{"d"}</M> Produkte <M>{"\\cred{a_{ij}}\\,\\cblue{x_j}"}</M>; um{" "}
              <M>{"d"}</M> Summanden aufzuaddieren, braucht es <M>{"d - 1"}</M> Additionen
            </>
          }
        >
          <p>
            Jede Komponente <M>{"\\cgreen{y_i}"}</M> kostet <M>{"d"}</M> Multiplikationen und{" "}
            <M>{"d - 1"}</M> Additionen.
          </p>
        </PStep>
        <PStep
          why={
            <>
              <M>{"n"}</M> Komponenten <M>{"\\cgreen{y_1}, \\ldots, \\cgreen{y_n}"}</M>, jede
              gleich teuer; für großes <M>{"d"}</M> ist der Term <M>{"-n"}</M> gegenüber{" "}
              <M>{"2nd"}</M> vernachlässigbar
            </>
          }
        >
          <MD>{"n \\cdot d + n \\cdot (d - 1) = n(2d - 1) = 2nd - n \\approx 2nd"}</MD>
        </PStep>
        <PStep
          why={
            <>
              die Eingaben <M>{"\\bA"}</M> (<M>{"nd"}</M> Einträge) und <M>{"\\bx"}</M> (
              <M>{"d"}</M> Einträge) müssen vorliegen, das Ergebnis <M>{"\\by"}</M> (
              <M>{"n"}</M> Einträge) wird gespeichert; die laufende Summe für{" "}
              <M>{"\\cgreen{y_i}"}</M> kann direkt im Eintrag <M>{"y_i"}</M> akkumuliert
              werden
            </>
          }
        >
          <p>
            Der Speicheraufwand ist <M>{"nd + d + n"}</M> Zahlen.
          </p>
        </PStep>
      </Proof>
      <p>
        Die Faustregel lautet also: <em>Matrix-Vektor kostet</em>{" "}
        <M>{"\\approx 2nd"}</M> <em>Operationen</em> — je zwei pro Matrixeintrag, eine
        Multiplikation und eine Addition. Dieselbe Zählung funktioniert für die{" "}
        <ConceptLink id="matrix-multiplication">Matrix-Matrix-Multiplikation</ConceptLink>{" "}
        <M>{"\\bC = \\bA\\bB"}</M> mit <M>{"\\bB \\in \\R^{d \\times m}"}</M>: Sie besteht aus{" "}
        <M>{"m"}</M> Matrix-Vektor-Produkten (eines pro Spalte von <M>{"\\bB"}</M>), kostet
        also <M>{"\\approx 2ndm"}</M> Operationen. Im folgenden Widget können wir beide Zähler
        mit den Dimensionen mitlaufen lassen.
      </p>
      <ExpandedReading title="FLOP-Zähler: Was kosten Matrix-Vektor- und Matrix-Matrix-Produkt?">
        <S23FlopWidget />
      </ExpandedReading>

      <h3 id="sec-2.3-quiz" className="mb-2 mt-8 text-xl font-semibold">
        Selbsttest: Operationen und Speicher zählen
      </h3>
      <p>
        Zeit für einen Selbsttest — versuchen wir uns an den beiden Quizfragen aus der
        Vorlesung. Gegeben sind{" "}
        <M>{"\\bA \\in \\R^{n \\times d}"}</M> und <M>{"\\bx, \\by \\in \\R^d"}</M>, und wir
        wollen
      </p>
      <MD>{"\\bz = f(\\bA, \\bx, \\by) = \\bA(\\bx - \\by) = \\sum_{i=1}^{d} (x_i - y_i)\\, \\bA_{\\cdot i}"}</MD>
      <p>
        berechnen, also eine{" "}
        <ConceptLink id="linear-combination">Linearkombination</ConceptLink> der Spalten{" "}
        <M>{"\\bA_{\\cdot i}"}</M> von <M>{"\\bA"}</M>. Der Algorithmus (auf den Folien als
        R-Schleife über die Spalten notiert) arbeitet die Summe spaltenweise ab:
      </p>
      <EnvBlock kind="Algorithmus" label="2.3.4 (Spaltenweise Auswertung)">
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Initialisiere <M>{"\\bz = \\bnull \\in \\R^n"}</M>.
          </li>
          <li>
            Für <M>{"i = 1, \\ldots, d"}</M>: berechne den Skalar <M>{"(x_i - y_i)"}</M> und
            aktualisiere <M>{"\\bz \\leftarrow \\bz + (x_i - y_i) \\cdot \\bA_{\\cdot i}"}</M>.
          </li>
        </ol>
      </EnvBlock>
      <SelfTest
        frage={
          <p>
            <strong>Quiz 1.</strong> Wie viele elementare Rechenoperationen benötigt
            Algorithmus 2.3.4?
          </p>
        }
        optionen={[
          <M>{"2n + d"}</M>,
          <M>{"2dn + d"}</M>,
          <M>{"dn^2"}</M>,
          <M>{"2(n + d)"}</M>,
        ]}
        richtig={1}
        loesung={
          <>
            <p>
              Der Zeitaufwand ist <M>{"2nd + d"}</M> Operationen. Zählen wir eine Iteration{" "}
              <M>{"i \\in \\lbrace 1, \\ldots, d \\rbrace"}</M> der Schleife durch:
            </p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                <em>Subtraktion:</em> <M>{"(x_i - y_i)"}</M> — <M>{"1"}</M> Operation.
              </li>
              <li>
                <em>Skalierung:</em> <M>{"(x_i - y_i) \\cdot \\bA_{\\cdot i}"}</M> — der
                Skalar trifft jeden der <M>{"n"}</M> Einträge der Spalte, also{" "}
                <M>{"n"}</M> Multiplikationen.
              </li>
              <li>
                <em>Aktualisierung:</em> <M>{"\\bz \\leftarrow \\bz + \\ldots"}</M> —{" "}
                <M>{"n"}</M> Additionen, eine pro Eintrag.
              </li>
            </ol>
            <p>
              Pro Iteration sind das <M>{"1 + n + n = 2n + 1"}</M> Operationen, und die
              Schleife läuft <M>{"d"}</M>-mal:
            </p>
            <MD>{"d \\cdot (2n + 1) = 2nd + d."}</MD>
            <p>
              Zum Vergleich: Das ist bis auf den kleinen Term <M>{"+\\,d"}</M> dasselbe{" "}
              <M>{"\\approx 2nd"}</M> wie beim gewöhnlichen Matrix-Vektor-Produkt aus Satz
              2.3.3 — kein Wunder, denn es <em>ist</em> ein Matrix-Vektor-Produkt, nur
              spaltenweise organisiert.
            </p>
          </>
        }
      />
      <SelfTest
        frage={
          <p>
            <strong>Quiz 2.</strong> Für wie viele Gleitkommazahlen braucht Algorithmus 2.3.4
            Speicherplatz?
          </p>
        }
        optionen={[
          <M>{"3n + d"}</M>,
          <M>{"4nd"}</M>,
          <M>{"2(n + d)"}</M>,
          <M>{"n + nd + 2d"}</M>,
        ]}
        richtig={3}
        loesung={
          <>
            <p>Wir zählen einfach alle Objekte, die im Speicher liegen müssen:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                das Ergebnis <M>{"\\bz \\in \\R^n"}</M>: <M>{"n"}</M> Zahlen,
              </li>
              <li>
                die Matrix <M>{"\\bA \\in \\R^{n \\times d}"}</M>: <M>{"nd"}</M> Zahlen,
              </li>
              <li>
                die Vektoren <M>{"\\bx, \\by \\in \\R^d"}</M>: je <M>{"d"}</M>, zusammen{" "}
                <M>{"2d"}</M> Zahlen.
              </li>
            </ul>
            <p>
              Insgesamt also <M>{"n + nd + 2d"}</M> Gleitkommazahlen. (Streng genommen kommt
              noch der eine Skalar <M>{"(x_i - y_i)"}</M> als Zwischenergebnis dazu — solche
              konstanten Zusatzterme spielen keine Rolle, wie der nächste Unterabschnitt
              zeigt.)
            </p>
          </>
        }
      />

      <h3 id="sec-2.3.3" className="mb-2 mt-8 text-xl font-semibold">
        2.3.3 Komplexität: Wie skaliert der Aufwand?
      </h3>
      <p>
        Beim Nachrechnen der Quizfragen ist vielleicht aufgefallen: Ob nun{" "}
        <M>{"2nd + d"}</M> oder <M>{"2nd - n"}</M> oder <M>{"2nd"}</M> herauskommt, hängt von
        Buchhaltungsdetails ab — zählt man die Initialisierung mit? Das Zwischenergebnis?
        Solche Details sind für den Vergleich von Algorithmen unwichtig. Die <em>exakte</em>{" "}
        Anzahl an Operationen und gespeicherten Zahlen interessiert uns nicht. Was uns
        interessiert, ist, <em>wie der Aufwand mit der Größe des Problems wächst</em>: Was
        passiert, wenn wir statt <M>{"1000"}</M> Datenpunkten <M>{"10\\,000"}</M> haben? Statt{" "}
        <M>{"10"}</M> Kovariablen <M>{"1000"}</M>?
      </p>
      <EnvBlock kind="Definition" label="2.3.5 (Komplexität)">
        <p>
          Wie der Zeit- bzw. Speicheraufwand eines Algorithmus mit der Größe des Problems{" "}
          <em>skaliert</em>, nennen wir die <em>Laufzeitkomplexität</em> bzw.{" "}
          <em>Speicherkomplexität</em> des Algorithmus.
        </p>
      </EnvBlock>
      <EnvBlock kind="Beispiel" label="2.3.6">
        <p>
          Ein Algorithmus benötige <M>{"4n^3 + 16n^2 + 239"}</M> Operationen. Für großes{" "}
          <M>{"n"}</M> ist <M>{"16n^2 + 239"}</M> gegenüber <M>{"4n^3"}</M> vernachlässigbar:
          Bei <M>{"n = 100"}</M> steuert der kubische Term{" "}
          <M>{"4 \\cdot 10^6"}</M> Operationen bei, die restlichen Terme nur{" "}
          <M>{"160\\,239"}</M> — rund <M>{"4\\,\\%"}</M> des Gesamtaufwands. Bei{" "}
          <M>{"n = 1000"}</M> sind es nur noch <M>{"0{,}4\\,\\%"}</M>. Der Algorithmus{" "}
          <em>skaliert</em> also wie <M>{"4n^3"}</M>; seine Komplexität ist von{" "}
          <em>kubischer Ordnung</em>, und wir schreiben kurz: „<M>{"O(n^3)"}</M>".
        </p>
      </EnvBlock>
      <p>
        Die Schreibweise <M>{"O(n^3)"}</M> lässt dabei bewusst auch den Vorfaktor{" "}
        <M>{"4"}</M> weg — es zählt allein die <em>Ordnung</em> des Wachstums. Was genau
        hinter dem großen <M>{"O"}</M> steckt, definieren wir sauber in{" "}
        <a className="underline" href="#sec-2.4">Abschnitt 2.4</a>; hier genügt uns die
        Lesart „wächst höchstens wie".
      </p>

      <h3 id="sec-2.3.4" className="mb-2 mt-8 text-xl font-semibold">
        2.3.4 Komplexitätsklassen
      </h3>
      <p>
        Die wichtigsten Wachstumsordnungen haben Namen, und es lohnt sich, für jede ein Gefühl
        zu entwickeln. Der Schlüssel dazu ist die Frage: <em>Was passiert mit dem Aufwand,
        wenn sich die Problemgröße verdoppelt?</em>
      </p>
      <EnvBlock kind="Bemerkung" label="2.3.7 (Interpretation der Komplexitätsklassen)">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <M>{"O(1)"}</M> <em>(konstant)</em>: Die Anzahl der Operationen ist unabhängig von{" "}
            <M>{"n"}</M>.
          </li>
          <li>
            <M>{"O(\\log n)"}</M> <em>(logarithmisch)</em>: Verdoppelt sich <M>{"n"}</M>,
            kommt (nur!) eine Operation hinzu — denn{" "}
            <M>{"\\log_2(2n) = \\log_2(n) + 1"}</M> (
            <ConceptLink id="logarithm">Logarithmus</ConceptLink>).
          </li>
          <li>
            <M>{"O(n)"}</M> <em>(linear)</em>: Verdoppelt sich <M>{"n"}</M>, verdoppeln sich
            die Operationen.
          </li>
          <li>
            <M>{"O(n^2)"}</M> <em>(quadratisch)</em>: Verdoppelt sich <M>{"n"}</M>,
            vervierfachen sich die Operationen.
          </li>
          <li>
            <M>{"O(2^n)"}</M> <em>(exponentiell)</em>: Verdoppelt sich <M>{"n"}</M>,{" "}
            <em>quadriert</em> sich die Anzahl der Operationen, denn{" "}
            <M>{"2^{2n} = \\left(2^n\\right)^2"}</M>. Schon ein einziger Schritt{" "}
            <M>{"n \\to n + 1"}</M> <em>verdoppelt</em> den Aufwand.
          </li>
        </ul>
      </EnvBlock>
      <p>
        Exponentielle Algorithmen sind damit für alle nicht winzigen Probleme praktisch
        unbrauchbar — genau das ist der naiven Fibonacci-Rekursion aus{" "}
        <a className="underline" href="#sec-2.2">Abschnitt 2.2</a> passiert, wie wir in{" "}
        <a className="underline" href="#sec-2.5">Abschnitt 2.5</a> genau nachrechnen werden.
        In der numerischen linearen Algebra bewegen wir uns dagegen meist zwischen{" "}
        <M>{"O(n)"}</M> (Vektoroperationen), <M>{"O(n^2)"}</M> (Matrix-Vektor-Produkte, siehe
        Satz 2.3.3 mit <M>{"d = n"}</M>) und <M>{"O(n^3)"}</M> (Matrix-Zerlegungen,
        Matrix-Matrix-Produkte).
      </p>
      <ExpandedReading title="Wachstumsraten-Plot: die Komplexitätsklassen im Vergleich">
        <S23GrowthWidget />
      </ExpandedReading>
      <EnvBlock kind="Bemerkung" label="2.3.8 (Vorsicht: Konstanten!)">
        <p>
          Die <M>{"O(\\cdot)"}</M>-Notation ignoriert konstante Faktoren und Terme niedrigerer
          Ordnung. Ein Algorithmus mit <M>{"1000n + 10\\,000"}</M> Operationen ist{" "}
          <M>{"O(n)"}</M>, aber trotzdem <em>langsamer</em> als ein{" "}
          <M>{"O(n^2)"}</M>-Algorithmus mit <M>{"n^2"}</M> Operationen, solange{" "}
          <M>{"n^2 < 1000n + 10\\,000"}</M> gilt — und das ist für alle{" "}
          <M>{"n \\le 1009"}</M> der Fall! Bei <M>{"n = 100"}</M> etwa stehen{" "}
          <M>{"110\\,000"}</M> Operationen gegen nur <M>{"10\\,000"}</M>. Die
          Komplexitätsklasse sagt, wer für <em>hinreichend große</em> Probleme gewinnt —
          nicht, wer bei <em>unserem konkreten</em> Problem gewinnt.
        </p>
      </EnvBlock>
      <ExpandedReading title="Konstanten-Demo: O(n) mit großen Konstanten gegen O(n²)">
        <S23KonstantenWidget />
      </ExpandedReading>

      <p className="italic">
        Vertiefung: Heath §1.1 (Kosten und Genauigkeit wissenschaftlichen Rechnens);
        Heath §2.4.5 (Operationen zählen am Beispiel des Gauß-Verfahrens).
      </p>
    </div>
  );
}
