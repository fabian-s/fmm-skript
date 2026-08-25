# Sprach- und Stilrichtlinie für das FMM-Skript (verbindlich für alle Autoren-Agenten)

Vorbild: das LinAlg-Skript von T. Nagler (fmm-lmu/literature/nagler-linalg-2026.pdf)
— informelles, aber präzises Skript-Deutsch.
**Vom Dozenten am Pilotkapitel 7 abgenommen (2026-08-05): Stil beibehalten.**

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

## Manierismen (2026-08-06 nach Leserkritik ergänzt, verbindlich)

- **Gedankenstrich-Budget: höchstens einer pro ~300 Wörter**, nie zwei im
  selben Satz. Ungebremst landen Schreib-Agenten bei einem pro 70 Wörter,
  also einem pro Absatz; das ist der auffälligste LLM-Tell überhaupt.
  Greif zuerst zu Komma, Doppelpunkt, Punkt, Klammer oder Nebensatz und
  wechsle ab. Der Strich bleibt nur, wo der Einschub die Pointe ist.
- Wenn ein Strich bleibt: deutscher Halbgeviertstrich mit Leerzeichen
  „ – ", niemals der englische Geviertstrich „—".
  Prüfen: `grep -o '—' datei | wc -l` gegen die Wortzahl.
- **Keine Formelwendungen in Serie:** „Genau das …", „Genau deshalb …",
  „Das ist genau der Grund, warum …", „nicht nur X, sondern auch Y",
  Dreierlisten aus Gewohnheit, Absätze, die mit „Wichtig:" beginnen.
  Zweimal im Kapitel ist Stil, siebenmal ist ein Tick. Erst zählen,
  dann kürzen.
- **Kein Vorgeplänkel.** „Schauen wir uns das genauer an" kostet eine Zeile
  und sagt nichts. Direkt zur Sache.
- Satzlängen variieren. Lauter 18-Wort-Sätze lesen sich generiert, auch
  wenn jeder einzelne stimmt.

## Mathematischer Apparat

- Nummerierte Environments wie im Vorbild: Definition x.y, Theorem x.y,
  Beispiel x.y, Beweis. (Nummerierung: x = Kapitelnummer. Kapitel 1–9
  entsprechen dem gleichnamigen Foliensatz; ab Kapitel 10 fasst ein Kapitel
  mehrere Foliensätze zusammen, die Zuordnung steht im Feld `deck` der
  Registry `src/chapters/index.ts`.)
- Beweise: vollständig, aber schrittweise erzählt; jeder nichttriviale
  Schritt bekommt eine Begründung in Worten oder eine \expl{...}-Annotation.
- Farbcodierung (FMM-Palette; \cbred, \cblue, \cgreen, \cborange, \cpurp):
  EINE Farbe verfolgt EINEN Teilausdruck durch ALLE Zeilen einer
  Herleitung. Keine Deko-Farben.
- Notation exakt wie in den Folien (Makros aus _mathjax-macros.qmd;
  \bx, \bA, \wh{}, \R, …). Keine \mathbf-Übersetzungen.

## Bezug zu Folien und Büchern

- Struktur folgt den FOLIEN, nicht den Büchern (Kapitel 1–9 je ein
  Foliensatz, ab Kapitel 10 mehrere je Kapitel; siehe `deck` in der Registry).
  Das Skript nennt die Folien NICHT (kein `::quelle`, keine „wie auf der
  Folie"-Prosa): Es ist ein eigenständiger Text, Provenienz nur in Kommentaren.
- Heath/MML dienen als fachliche Referenz für Tiefe und Beweise. PROSA IST
  IMMER EIGENSTÄNDIG FORMULIERT — niemals übersetzte Buchpassagen
  (Übersetzungen sind abgeleitete Werke!). Das Skript wird veröffentlicht.
- Literaturhinweise am Abschnittsende: „Vertiefung: Heath §3.5; MML §7.1."
