# Sprach- und Stilrichtlinie für das FMM-Skript (verbindlich für alle Autoren-Agenten)

Vorbild: das LinAlg-Skript von T. Nagler (fmm-lmu/literature/nagler-linalg-2026.pdf)
— informelles, aber präzises Skript-Deutsch.

## Stimme

- **Wir-Form**, durchgehend: „Wir zeigen nun…", „Betrachten wir…",
  „Machen wir die Zeilenoperationen rückgängig, …". Kein „Sie", kein „man"
  als Dauerlösung, kein „ich".
- **Kurze Hauptsätze.** Ein Gedanke pro Satz. Schachtelsätze auflösen.
- **Didaktische Übergänge** statt formaler Floskeln: „Wie eingangs erwähnt…",
  „Es ist einfach zu sehen, dass…", „Das folgende Resultat verknüpft die
  bisher gelernten Konzepte.", „Statt nur der Anzahl von Lösungen wollen
  wir nun etwas über deren Gestalt lernen."
- Gelegentliche direkte Ansprache ist erwünscht, sparsam dosiert:
  „…ist als Übung überlassen", „Vorsicht: …", „Warum? Weil …".
- **Motivation vor Formalismus:** jedes Konzept beginnt mit dem Problem,
  das es löst — erst dann Definition/Theorem.
- Anführungszeichen: „deutsche". Fachbegriffe beim ersten Auftreten kursiv
  mit englischem Begriff in Klammern, wenn der englische Begriff in der
  Literatur dominiert: *Dünnbesetztheit* (sparsity).

## Mathematischer Apparat

- Nummerierte Environments wie im Vorbild: Definition x.y, Theorem x.y,
  Beispiel x.y, Beweis. (Nummerierung: Kapitel = Foliensatz-Nummer.)
- Beweise: vollständig, aber schrittweise erzählt; jeder nichttriviale
  Schritt bekommt eine Begründung in Worten oder eine \expl{...}-Annotation.
- Farbcodierung (FMM-Palette; \cbred, \cblue, \cgreen, \cborange, \cpurp):
  EINE Farbe verfolgt EINEN Teilausdruck durch ALLE Zeilen einer
  Herleitung. Keine Deko-Farben.
- Notation exakt wie in den Folien (Makros aus _mathjax-macros.qmd;
  \bx, \bA, \wh{}, \R, …). Keine \mathbf-Übersetzungen.

## Bezug zu Folien und Büchern

- Struktur folgt den FOLIEN (Kapitel = Foliensatz), nicht den Büchern.
  Jeder Abschnitt nennt die zugehörigen Folien („Folien 07-kq, S. 12–18").
- Heath/MML dienen als fachliche Referenz für Tiefe und Beweise. PROSA IST
  IMMER EIGENSTÄNDIG FORMULIERT — niemals übersetzte Buchpassagen
  (Übersetzungen sind abgeleitete Werke!). Das Skript wird veröffentlicht.
- Literaturhinweise am Abschnittsende: „Vertiefung: Heath §3.5; MML §7.1."
