/** Konzept-Tooltip: Hookesches Gesetz, Spannung proportional zur Dehnung. */
import { M, MD, registerConcept } from "../lib";

registerConcept({
  id: "hookes-law",
  title: "Hookesches Gesetz",
  body: (
    <>
      <p>
        Das <em>Hookesche Gesetz</em> (Hooke&apos;s law) beschreibt elastische
        Materialien: Wie stark wir an etwas ziehen und wie weit es sich dehnt,
        sind zueinander proportional. In der einfachsten Federform braucht es,
        um eine Feder um die Länge <M>{"x"}</M> zu dehnen, eine Kraft{" "}
        <M>{"F = k\\,x"}</M>: doppelte Dehnung, doppelte Kraft. Für
        einen festen Werkstoff formuliert man es relativ:
      </p>
      <MD>{"\\text{Spannung} = E \\times \\text{Dehnung},"}</MD>
      <p>
        wobei die <em>Spannung</em> (stress) die Zugkraft pro
        Querschnittsfläche ist, die <em>Dehnung</em> (strain) die relative
        Verlängerung (ein 1&nbsp;m langer Stab, der sich um 2&nbsp;mm dehnt,
        hat Dehnung 0.002), und die Proportionalitätskonstante <M>{"E"}</M>{" "}
        der <em>Elastizitätsmodul</em> (Young&apos;s modulus), eine
        Zahl, die die Steifigkeit des Materials misst: riesig für Stahl, klein
        für Gummi.
      </p>
      <p>
        Wie <M>{"F = ma"}</M> und <M>{"V = iR"}</M> ist das ein lineares
        Gesetz: Ausgabe proportional zur Eingabe. (Es gilt nur bis zu einem
        gewissen Punkt: ziehen wir stark genug, verformt sich das
        Material dauerhaft. Aber im elastischen Bereich ist die lineare
        Beschreibung ausgezeichnet. Das ist das wiederkehrende Muster:
        Linearität als gute lokale Näherung.)
      </p>
    </>
  ),
});
