import { M, MD, EnvBlock, Proof, PStep } from "../../lib";

/**
 * Machbarkeits-Demo: Formeln 1:1 aus den Vorlesungsfolien (07-kq.Rmd),
 * gesetzt mit den ECHTEN Kursmakros aus _mathjax-macros.qmd — keine
 * Übersetzung nach \mathbf & Co. nötig.
 */
export function SDemo() {
  return (
    <div className="space-y-4 [&>p]:max-w-prose">
      <p>
        Gegeben sei eine Matrix <M>{"\\bA \\in \\R^{m \\times n}"}</M> und ein Vektor{" "}
        <M>{"\\bb \\in \\R^m"}</M>. Das Kleinste-Quadrate-Problem sucht{" "}
        <M>{"\\wh{\\bx} = \\argmin_{\\bx} \\| \\bA\\bx - \\bb \\|_2^2"}</M>; seine Lösung
        charakterisieren die <em>Normalengleichungen</em>
      </p>
      <MD>{"\\bA^\\top\\bA\\,\\bx = \\bA^\\top \\bb\\,."}</MD>
      <p>
        Die SVD <M>{"\\bA = \\bU\\bSigma\\bV^\\top"}</M> liefert die Pseudoinverse{" "}
        <M>{"\\bA\\pinv"}</M> und die Konditionszahl <M>{"\\kappa(\\bA)"}</M>. Auch
        Operatoren (<M>{"\\tr, \\spann, \\diag, \\sumin x_i"}</M>) und Logik
        (<M>{"\\bA \\text{ regulär} \\quimpl \\bA\\bx=\\bb \\text{ eindeutig lösbar}"}</M>)
        kommen direkt aus den Folienmakros.
      </p>
      <EnvBlock kind="Definition" label="(Farbcodierung)">
        <p>Farbcodierte Herleitung mit der FMM-Palette:</p>
        <MD>
          {"\\cbred{\\bA^\\top\\bA}\\,\\cblue{\\bx} = \\cbred{\\bA^\\top}\\bb \\quimpl \\cblue{\\bx} = (\\cbred{\\bA^\\top\\bA})^{-1}\\cbred{\\bA^\\top}\\bb"}
        </MD>
        <p>
          … und Inline: <M>{"\\cgreen{\\wh{\\by}} = \\bA\\cblue{\\wh{\\bx}}"}</M>,{" "}
          <M>{"\\cpurp{\\br} = \\bb - \\cgreen{\\wh{\\by}}"}</M>,{" "}
          <M>{"\\corange{\\kappa(\\bA)} = \\sigma_{\\max}/\\sigma_{\\min}"}</M>.
        </p>
      </EnvBlock>
      <EnvBlock kind="Satz" label="(Demo: Normalengleichungen)">
        <p>
          <M>{"\\wh{\\bx}"}</M> minimiert <M>{"g(\\bx) = \\|\\bA\\bx - \\bb\\|_2^2"}</M>{" "}
          genau dann, wenn <M>{"\\bA^\\top\\bA\\,\\wh{\\bx} = \\bA^\\top\\bb"}</M>.
        </p>
      </EnvBlock>
      <Proof>
        <PStep why={<>Ausmultiplizieren des Skalarprodukts</>}>
          <MD>{"g(\\bx) = (\\bA\\bx - \\bb)^\\top(\\bA\\bx - \\bb) = \\bx^\\top\\bA^\\top\\bA\\bx - 2\\,\\bb^\\top\\bA\\bx + \\bb^\\top\\bb"}</MD>
        </PStep>
        <PStep why={<>Gradient bilden; <M>{"\\bA^\\top\\bA"}</M> ist symmetrisch</>}>
          <MD>{"\\nabla g(\\bx) = 2\\,\\bA^\\top\\bA\\bx - 2\\,\\bA^\\top\\bb"}</MD>
        </PStep>
        <PStep why={<>notwendige Bedingung <M>{"\\nabla g = \\bnull"}</M>; wegen Konvexität von <M>{"g"}</M> auch hinreichend</>}>
          <MD>{"\\nabla g(\\wh{\\bx}) = \\bnull \\quequiv \\bA^\\top\\bA\\,\\wh{\\bx} = \\bA^\\top\\bb"}</MD>
        </PStep>
      </Proof>
    </div>
  );
}
