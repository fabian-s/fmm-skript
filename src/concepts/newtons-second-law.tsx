/** Konzept-Tooltip: Zweites Newtonsches Gesetz, F = ma, als Beispiel für Linearität. */
import { ConceptLink, M, MD, registerConcept } from "../lib";

registerConcept({
  id: "newtons-second-law",
  title: "Zweites Newtonsches Gesetz",
  body: (
    <>
      <p>
        Das zweite Newtonsche Gesetz der Mechanik sagt: Die Kraft, die auf
        einen Körper wirkt, und die Beschleunigung, die sie erzeugt, sind
        proportional zueinander:
      </p>
      <MD>{"F = m\\,a,"}</MD>
      <p>
        wobei die Masse <M>{"m"}</M> die Proportionalitätskonstante ist &mdash;
        sie misst, wie viel &bdquo;Zeug&ldquo; wir bewegen müssen. (Die
        Beschleunigung gibt an, wie schnell sich die Geschwindigkeit ändert,
        ist also die{" "}
        <ConceptLink id="derivative">Ableitung</ConceptLink> der
        Geschwindigkeit nach der Zeit.)
      </p>
      <p>
        Worauf es uns hier ankommt, ist die <em>Gestalt</em> des Gesetzes: Es
        ist linear. Drücken wir doppelt so stark, bekommen wir genau die
        doppelte Beschleunigung; wirken zwei Kräfte gleichzeitig, addieren
        sich die Beschleunigungen einfach. Ein Wagen mit 2&nbsp;kg, den wir
        mit 6&nbsp;N anschieben, beschleunigt mit 3&nbsp;m/s&sup2;; mit
        12&nbsp;N sind es 6&nbsp;m/s&sup2;. Viele der fundamentalsten
        physikalischen Gesetze haben genau diese Struktur &bdquo;doppelter
        Input, doppelter Output&ldquo; &mdash; deshalb begegnen uns lineare
        Zusammenhänge und lineare Gleichungssysteme im wissenschaftlichen
        Rechnen auf Schritt und Tritt.
      </p>
    </>
  ),
});
