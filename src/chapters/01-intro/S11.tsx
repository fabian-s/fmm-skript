import type { ReactNode } from "react";
import { ConceptLink, EnvBlock, ExpandedReading, M, MD } from "../../lib";

/**
 * Abschnitt 1.1: Worum geht es in diesem Kurs?
 * Quelle: Folien 01-intro.Rmd (Motivation, Themen, Beispiele, Selbsttest).
 * Bewusst sehr kurz und rein konzeptionell (Dozentenvorgabe); keine
 * Organisation/Logistik. Prosa eigenständig aus den Folien formuliert.
 */

/** Selbsttest-Frage mit aufklappbarer Lösung. */
function Frage({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <li className="space-y-1">
      <div>{q}</div>
      <details className="rounded border border-slate-300 bg-white/60 px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900/40">
        <summary className="cursor-pointer select-none font-medium text-slate-600 dark:text-slate-300">
          Lösung anzeigen
        </summary>
        <div className="pt-1.5">{children}</div>
      </details>
    </li>
  );
}

/** Konzeptionelle SVG-Landkarte der drei Themenblöcke. */
function KursLandkarte() {
  const box = (x: number, color: string, title: string[], lines: string[]) => (
    <g>
      <rect
        x={x}
        y={28}
        width={224}
        height={150}
        rx={12}
        fill={color}
        fillOpacity={0.1}
        stroke={color}
        strokeWidth={2}
      />
      {title.map((t, i) => (
        <text
          key={t}
          x={x + 112}
          y={56 + i * 20}
          textAnchor="middle"
          fontSize={15}
          fontWeight={700}
          fill={color}
        >
          {t}
        </text>
      ))}
      {lines.map((l, i) => (
        <text
          key={l}
          x={x + 112}
          y={106 + i * 22}
          textAnchor="middle"
          fontSize={12.5}
          fill="currentColor"
        >
          {l}
        </text>
      ))}
    </g>
  );
  const arrow = (x1: number, x2: number) => (
    <g stroke="currentColor" strokeWidth={2} opacity={0.55}>
      <line x1={x1} y1={103} x2={x2 - 9} y2={103} />
      <path
        d={`M ${x2 - 10} 96 L ${x2} 103 L ${x2 - 10} 110 Z`}
        fill="currentColor"
        stroke="none"
      />
    </g>
  );
  return (
    <div className="text-slate-700 dark:text-slate-200">
      <svg
        viewBox="0 0 760 200"
        role="img"
        aria-label="Landkarte der drei Kursblöcke"
        className="w-full max-w-2xl"
      >
        {box(8, "#0072B2", ["Numerische", "Lineare Algebra"], [
          "Kondition & Komplexität",
          "Zerlegungen: LR, QR, SVD",
          "KQ-Probleme Ax ≈ b",
        ])}
        {box(268, "#009E73", ["Analysis &", "Optimierung"], [
          "Matrix-Kalkül: ∇L(W)",
          "Gradientenverfahren, Newton",
          "Training von ML-Modellen",
        ])}
        {box(528, "#E69F00", ["Funktions-", "approximation"], [
          "Taylor-Reihen",
          "Splines & Basisfunktionen",
          "Interpolieren & Glätten",
        ])}
        {arrow(232, 268)}
        {arrow(492, 528)}
      </svg>
    </div>
  );
}

export function S11() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Folien: 01-intro, „Motivation" bis „Selbsttest".
      </p>
      <p>
        Statistik war einmal Papier-und-Bleistift-Arbeit an kleinen Tabellen. Heute ist sie
        (genau wie das maschinelle Lernen) durch und durch <em>computational</em>: Jedes Modell,
        das wir fitten, jede Prognose, die wir berechnen, entsteht durch einen Algorithmus auf
        einem Rechner. In diesem Kurs lernen wir die mathematischen Konzepte, mit denen wir
        solche Algorithmen entwickeln, verstehen und beurteilen können. Es geht also nicht um
        neue Statistik, sondern um die Frage: <em>Wie rechnet man das eigentlich – schnell,
        sparsam und zuverlässig?</em>
      </p>

      <h3 className="mt-6 text-lg font-semibold">Warum Numerik?</h3>
      <p>
        Ein Beispiel zeigt, warum die Formeln aus den Statistik-Vorlesungen allein nicht
        reichen. Wir wollen ein{" "}
        <ConceptLink id="linear-regression">lineares Regressionsmodell</ConceptLink> mit{" "}
        <M>{"p = 10\\,000"}</M> Merkmalen auf <M>{"n = 100\\,000"}</M> Beobachtungen trainieren,
        also das <ConceptLink id="linear-least-squares">Kleinste-Quadrate-Problem</ConceptLink>
      </p>
      <MD>{"\\min_{\\bbeta \\in \\R^p} \\left\\| \\bX\\bbeta - \\by \\right\\|_2^2"}</MD>
      <p>
        lösen. Die Theorie liefert die Formel{" "}
        <M>{"\\wh{\\bbeta} = (\\bX^\\top\\bX)^{-1}\\bX^\\top\\by"}</M>. Wer sie wörtlich in
        den Rechner tippt, erlebt gleich drei Überraschungen. Erstens die <em>Kondition</em>: Die
        Matrix <M>{"\\bX^\\top\\bX"}</M> kann so empfindlich sein, dass winzige{" "}
        <ConceptLink id="rounding-error">Rundungsfehler</ConceptLink> das Ergebnis komplett
        verfälschen. Zweitens die <em>Komplexität</em>: Das{" "}
        <ConceptLink id="matrix-inverse">Invertieren</ConceptLink> kostet{" "}
        <ConceptLink id="big-o-notation"><M>{"O(p^3)"}</M></ConceptLink> Rechenoperationen, für{" "}
        <M>{"p = 10\\,000"}</M> rund <M>{"10^{12}"}</M> Gleitkommaoperationen. Drittens der{" "}
        <em>Speicher</em>: <M>{"\\bX^\\top\\bX"}</M> ist eine{" "}
        <M>{"p \\times p"}</M>-Matrix und belegt allein schon etwa 800 MB. Bessere Wege (die{" "}
        <ConceptLink id="qr-factorization">QR-Zerlegung</ConceptLink>, die{" "}
        <ConceptLink id="singular-value-decomposition">Singulärwertzerlegung</ConceptLink>,
        iterative Verfahren) sind genau der Stoff dieses Kurses.
      </p>
      <p>
        Wie dramatisch das erste Problem werden kann, zeigt schon ein{" "}
        <ConceptLink id="linear-system">Gleichungssystem</ConceptLink> mit zwei Unbekannten:
      </p>
      <EnvBlock kind="Beispiel" label="1.1.1 (Ein schlecht konditioniertes Problem)">
        <p>
          Wir lösen <M>{"\\bA\\bx = \\bb"}</M> mit
        </p>
        <MD>{"\\bA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1{,}0001 \\end{pmatrix}, \\qquad \\bb = \\begin{pmatrix} 2 \\\\ 2{,}0001 \\end{pmatrix}."}</MD>
        <p>
          Subtrahieren wir die erste Zeile von der zweiten, bleibt{" "}
          <M>{"0{,}0001\\,x_2 = 0{,}0001"}</M>, also <M>{"x_2 = 1"}</M> und damit{" "}
          <M>{"x_1 = 1"}</M>: Die exakte Lösung ist{" "}
          <M>{"\\cblue{\\bx} = \\cblue{(1, 1)^\\top}"}</M>. Nun stören wir die rechte Seite
          minimal (etwa so, wie es ein Rundungsfehler täte) im zweiten Eintrag:
        </p>
        <MD>{"\\cred{\\wt{\\bb}} = \\begin{pmatrix} 2 \\\\ \\cred{2{,}0002} \\end{pmatrix} \\quimpl 0{,}0001\\,x_2 = \\cred{0{,}0002} \\quimpl \\cred{\\wt{\\bx}} = \\cred{\\begin{pmatrix} 0 \\\\ 2 \\end{pmatrix}}."}</MD>
        <p>
          Die winzige Störung wird bei der Division durch <M>{"0{,}0001"}</M> massiv verstärkt:
          Aus <M>{"\\cblue{x_2 = 1}"}</M> wird <M>{"\\cred{\\wt{x}_2 = 2}"}</M>, aus{" "}
          <M>{"\\cblue{x_1 = 1}"}</M> wird <M>{"\\cred{\\wt{x}_1 = 0}"}</M> – ein Fehler von
          100 % in der Lösung, ausgelöst durch einen Datenfehler von 0,005 %. Solche Probleme
          heißen <em>schlecht konditioniert</em>; die{" "}
          <ConceptLink id="condition-number">Konditionszahl</ConceptLink> misst das präzise und
          begleitet uns durch das ganze erste Drittel des Kurses.
        </p>
      </EnvBlock>

      <h3 className="mt-6 text-lg font-semibold">Die drei Themenblöcke</h3>
      <p>
        Der Kurs besteht aus drei Blöcken, die aufeinander aufbauen. Der erste Block,{" "}
        <em>Numerische Lineare Algebra</em>, klärt zunächst, was einen guten Algorithmus
        ausmacht (Kondition, Stabilität, Komplexität), und entwickelt dann Matrix-Zerlegungen,
        mit denen wir Gleichungssysteme und KQ-Probleme <M>{"\\bA\\bx \\approx \\bb"}</M>{" "}
        zuverlässig lösen, statt naiv zu invertieren.
      </p>
      <p>
        Der zweite Block, <em>Analysis und Optimierung</em>, verallgemeinert die{" "}
        <ConceptLink id="derivative">Ableitung</ConceptLink> auf Funktionen mit Vektor-, Matrix-
        und Tensor-Argumenten. Wozu? Beim Training{" "}
        <ConceptLink id="neural-network">neuronaler Netze</ConceptLink> müssen wir
        Verlustfunktionen wie{" "}
        <M>{"L(\\bW) = \\tfrac{1}{2}\\left\\| \\bX\\bW - \\bY \\right\\|_F^2"}</M> nach einer
        ganzen Matrix <M>{"\\bW"}</M> ableiten. Naiv wären das so viele einzelne{" "}
        <ConceptLink id="partial-derivative">partielle Ableitungen</ConceptLink>, wie{" "}
        <M>{"\\bW"}</M> Einträge hat, bei <M>{"1000 \\times 10"}</M> schon{" "}
        <M>{"10\\,000"}</M>; der
        Matrix-Kalkül liefert stattdessen eine einzige Zeile,{" "}
        <M>{"\\partial L / \\partial \\bW = \\bX^\\top(\\bX\\bW - \\bY)"}</M>, und die ist auch
        noch effizient implementierbar. Darauf setzt die numerische Optimierung auf:{" "}
        <ConceptLink id="gradient-descent">Gradientenverfahren</ConceptLink> und ihre
        Verwandten finden Minima von Funktionen, die nicht{" "}
        <ConceptLink id="convex-function">konvex</ConceptLink>, hochdimensional (GPT-3:{" "}
        <M>{"1{,}75 \\cdot 10^{11}"}</M> Parameter!) und nur häppchenweise auswertbar sind.
      </p>
      <p>
        Der dritte Block, <em>Funktionsapproximation</em>, fragt: Wie ersetzen wir eine
        komplizierte Funktion durch eine einfache, mit der sich gut rechnen lässt? Das
        klassische Werkzeug ist die{" "}
        <ConceptLink id="taylor-series">Taylor-Approximation</ConceptLink>: Schon{" "}
        <M>{"e^x \\approx 1 + x + \\tfrac{x^2}{2}"}</M> liefert bei <M>{"x = 0{,}5"}</M> den
        Wert <M>{"1{,}625"}</M> statt <M>{"e^{0{,}5} = 1{,}6487\\ldots"}</M>, ein relativer
        Fehler von unter 2 %. Später kommen flexiblere Bausteine wie Splines dazu, mit denen
        die Statistik glatte Funktionen aus Daten schätzt.
      </p>
      <ExpandedReading title="Die drei Blöcke als Landkarte">
        <KursLandkarte />
        <p className="mt-2 max-w-prose text-sm">
          Die Blöcke bauen aufeinander auf: Die lineare Algebra liefert die Rechenkerne (jeder
          Newton-Schritt löst ein Gleichungssystem), die Analysis liefert Gradienten und lokale
          Modelle für die Optimierung, und die Funktionsapproximation nutzt beides, um aus
          Daten glatte Funktionen zu machen.
        </p>
      </ExpandedReading>

      <h3 className="mt-6 text-lg font-semibold">Wie dieses Skript funktioniert</h3>
      <p>
        Drei Elemente helfen beim Lesen. <em>Erstens:</em> Gestrichelt unterstrichene Begriffe
        wie <ConceptLink id="eigenvalue-eigenvector">Eigenwerte</ConceptLink> öffnen Tooltips,
        die das nötige Vorwissen auffrischen, oft mit weiteren Links darin, sodass wir uns bei
        Bedarf bis zu den Grundlagen durchhangeln können. <em>Zweitens:</em> Ausklappbare
        „Vertiefung"-Boxen (wie die Landkarte oben) enthalten Exkurse und interaktive Widgets
        zum Selbst-Ausprobieren; für den roten Faden sind sie optional. <em>Drittens:</em>{" "}
        Beweise sind als Stepper gebaut: Wir decken sie Schritt für Schritt auf, und jeder
        Schritt trägt seine Begründung. Am Ende jedes Abschnitts verweist eine
        „Vertiefung:"-Zeile auf Literatur zum Weiterlesen.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Selbsttest: Reicht das Vorwissen?</h3>
      <p>
        Der Kurs setzt Lineare Algebra I, Analysis I und etwas R-Programmierung voraus. Die
        folgenden Fragen sollten wir (zumindest nach kurzem Nachdenken) beantworten können.
        Wer hängt, klappt die Lösung auf und frischt das Thema per Tooltip auf; sehr zu
        empfehlen ist außerdem, die geometrische Intuition mit den Videos von{" "}
        <em>3blue1brown</em> („Essence of Linear Algebra") aufzubauen.
      </p>
      <p className="font-semibold">Lineare Algebra:</p>
      <ol className="max-w-prose list-decimal space-y-3 pl-5">
        <Frage q={<>Was ist der Rang einer Matrix? Wie berechnen wir ihn?</>}>
          Der <ConceptLink id="rank">Rang</ConceptLink> ist die Anzahl linear unabhängiger
          Spalten (gleichwertig: Zeilen), also die Dimension des{" "}
          <ConceptLink id="image">Bildes</ConceptLink> der zugehörigen Abbildung. Von Hand
          berechnen wir ihn z. B. per{" "}
          <ConceptLink id="gaussian-elimination">Gauß-Elimination</ConceptLink>: Rang = Anzahl
          der Nichtnullzeilen in der Stufenform.
        </Frage>
        <Frage q={<>Was bedeutet es, dass eine Matrix <M>{"\\bA"}</M> invertierbar ist?</>}>
          Es gibt eine Matrix <M>{"\\bA^{-1}"}</M> mit{" "}
          <M>{"\\bA\\bA^{-1} = \\bA^{-1}\\bA = \\bI"}</M> (
          <ConceptLink id="matrix-inverse">Inverse</ConceptLink>). Das setzt voraus, dass{" "}
          <M>{"\\bA"}</M> quadratisch ist und vollen Rang hat; gleichwertig: <M>{"0"}</M> ist
          kein Eigenwert, und <M>{"\\bA\\bx = \\bb"}</M> hat für jedes <M>{"\\bb"}</M> genau
          eine Lösung.
        </Frage>
        <Frage q={<>Was sind Eigenwerte und Eigenvektoren? Wie finden wir sie?</>}>
          Ein <ConceptLink id="eigenvalue-eigenvector">Eigenvektor</ConceptLink>{" "}
          <M>{"\\bv \\neq \\bnull"}</M> mit Eigenwert <M>{"\\lambda"}</M> erfüllt{" "}
          <M>{"\\bA\\bv = \\lambda\\bv"}</M>: Die Matrix skaliert <M>{"\\bv"}</M> nur, statt
          seine Richtung zu ändern. Von Hand finden wir Eigenwerte als Nullstellen des
          charakteristischen Polynoms <M>{"\\det(\\bA - \\lambda\\bI) = 0"}</M>; am Rechner mit
          numerischen Verfahren.
        </Frage>
        <Frage q={<>Was bedeutet das Matrix-Vektor-Produkt <M>{"\\bA\\bx"}</M> geometrisch?</>}>
          <M>{"\\bA\\bx"}</M> wendet die{" "}
          <ConceptLink id="linear-map">lineare Abbildung</ConceptLink> <M>{"\\bA"}</M> auf den
          Vektor <M>{"\\bx"}</M> an (
          <ConceptLink id="matrix-vector-product">Matrix-Vektor-Produkt</ConceptLink>): Je
          nach <M>{"\\bA"}</M> wird <M>{"\\bx"}</M> gestreckt, gedreht, gespiegelt, geschert
          oder in einen Unterraum projiziert.
        </Frage>
      </ol>
      <p className="font-semibold">Analysis:</p>
      <ol className="max-w-prose list-decimal space-y-3 pl-5">
        <Frage
          q={<>Was bedeutet es, dass eine Funktion <M>{"f: \\R \\to \\R"}</M> stetig ist?</>}
        >
          Kleine Änderungen im Argument führen zu kleinen Änderungen im Funktionswert (
          <ConceptLink id="continuity">Stetigkeit</ConceptLink>). Formal: Zu jedem{" "}
          <M>{"\\eps > 0"}</M> gibt es ein <M>{"\\delta > 0"}</M>, sodass{" "}
          <M>{"|x - x_0| < \\delta"}</M> stets <M>{"|f(x) - f(x_0)| < \\eps"}</M> erzwingt.
        </Frage>
        <Frage q={<>Was ist die Ableitung <M>{"f'(x_0)"}</M> geometrisch?</>}>
          Die Steigung der <ConceptLink id="tangent-line">Tangente</ConceptLink> an den Graphen
          von <M>{"f"}</M> im Punkt <M>{"x_0"}</M>, also die momentane Änderungsrate von{" "}
          <M>{"f"}</M> an dieser Stelle (<ConceptLink id="derivative">Ableitung</ConceptLink>).
        </Frage>
        <Frage q={<>Was unterscheidet ein lokales von einem globalen Minimum?</>}>
          Ein lokales Minimum <M>{"x_0"}</M> erfüllt <M>{"f(x_0) \\leq f(x)"}</M> nur für alle{" "}
          <M>{"x"}</M> in einer <ConceptLink id="neighborhood">Umgebung</ConceptLink> von{" "}
          <M>{"x_0"}</M>; ein globales Minimum für <em>alle</em> <M>{"x"}</M> im
          Definitionsbereich.{" "}
          <ConceptLink id="gradient-descent">Abstiegsverfahren</ConceptLink> finden im
          Allgemeinen nur lokale Minima – ein zentrales Thema des Optimierungs-Blocks.
        </Frage>
      </ol>

      <p className="italic">
        Vertiefung: Heath §1 (wissenschaftliches Rechnen: Näherungen, Fehler, Kondition im
        Überblick); MML, Vorwort und Teil I als Panorama der Mathematik hinter dem maschinellen
        Lernen.
      </p>
    </div>
  );
}
