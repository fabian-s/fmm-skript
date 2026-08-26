# Rubrik für den Audit der Konzept-Pop-ups

Stand: 2026-08-26. Gegenstand ist jeweils das **gesamte Konzept-Pop-up**:
`src/concepts/<id>.mdx`, ein gegebenenfalls importiertes Widget und die
Verwendung des Konzepts im Skript. Der Review-Pass produziert Befunde und
Empfehlungen, aber keine Implementierung.

## Pflichtablauf pro Konzept

1. Die komplette MDX-Datei lesen.
2. Bei einem Widget dessen komplette TSX-Datei lesen.
3. Mit `rg` mindestens eine tatsächliche Verwendung des Konzeptlinks im Skript
   ansehen. Prüfen, welches Vorwissen an dieser Stelle realistisch vorhanden
   ist.
4. Das Pop-up als eigenständige Mini-Erklärung beurteilen, nicht nur einzelne
   Sätze oder Controls.
5. Eine Medienentscheidung treffen: **KEEP**, **REVISE**, **STATIC** oder
   **REMOVE**.
6. Nur belegte Befunde mit Datei und Zeile melden. Keine Änderungen vornehmen.

## 1. Selbstständigkeit und fachliche Richtigkeit

- Der Begriff wird früh, knapp und korrekt definiert.
- Alle im Beispiel oder Widget benötigten Größen, Regeln und Szenarien sind vor
  ihrer Benutzung erklärt. Kein unsichtbares Spiel, keine unbekannte
  Verlustfunktion, kein plötzliches Symbol.
- Aussagen nennen nötige Voraussetzungen und ihren Gültigkeitsbereich. Faustregeln
  werden nicht als allgemeine Sätze verkauft.
- Formeln, Zahlen, Schwellen, Einheiten und Fallunterscheidungen stimmen mit dem
  Widget überein.
- Verweise wie „vgl. MML/Heath“ ergänzen die Erklärung, ersetzen sie aber nicht.
- Verlinkte Voraussetzungen helfen; sie dürfen keine unnötige Kette oder einen
  Zirkelschluss erzeugen.

## 2. Erklärstruktur und Textqualität

Bevorzugter Bogen: **Definition/Problem → konkretes Beispiel → Leitfrage →
Visualisierung oder Handlung → explizite Erkenntnis**.

- Der Einstieg beantwortet zuerst „Was ist das?“ und „Wozu brauche ich das?“.
- Abstraktion und Beispiel wechseln in einer sinnvollen Reihenfolge.
- Die Leitfrage vor der Visualisierung ist konkret und tatsächlich beantwortbar.
- Der Absatz danach fasst die gewonnene Einsicht zusammen, statt bloß zu sagen,
  das Widget „mache etwas sichtbar“.
- Das Pop-up bleibt kurz genug für seine Funktion; Nebenthemen und unmotivierte
  Spezialfälle werden gestrichen oder verlinkt.
- Begriffe, Farben und Bezeichnungen sind zwischen Prosa, Formel, Legende,
  Aufgabe und Verdikt konsistent.

## 3. Braucht dieses Konzept überhaupt eine Visualisierung?

Die kleinste wirksame Form gewinnt:

1. **keine Visualisierung**, wenn Definition plus Beispiel bereits genügen;
2. **statische Abbildung/Tabelle**, wenn eine kuratierte Ansicht die Einsicht
   vollständig zeigt;
3. **zwei statische Ansichten nebeneinander**, wenn ein Vergleich die Pointe ist;
4. **Interaktion**, nur wenn die Veränderung selbst lehrreich ist.

Interaktion verdient ihren Platz, wenn mindestens eines gilt:

- Die Leserin manipuliert das mathematische Objekt direkt und prüft eine
  Invariante oder Grenze.
- Mehrere didaktisch verschiedene Fälle müssen erkundet werden und ein statisches
  Paar wäre unübersichtlich.
- Kontinuierliches Variieren zeigt einen Übergang, eine Stabilitätsfrage oder ein
  asymptotisches Verhalten, das eine Einzelabbildung verschweigt.
- Eine echte Vorhersage kann durch die Handlung überprüft werden.

Warnzeichen für „Interaktivität um ihrer selbst willen“:

- Regler verändern nur dekorativ einen Graphen, ohne neue Schlussfolgerung.
- Die Aufgabe besteht im mühsamen Treffen einer vorgegebenen Zahl/Kurve.
- Viele Buttons zeigen Wiederholungen desselben Falls.
- Die entscheidende Einsicht ist bereits im Ausgangsbild vollständig sichtbar.
- Das Verdikt wiederholt nur den aktuellen Zahlenwert.

## 4. Widget-Didaktik (falls interaktiv)

- Eine einzige, im Header benannte Kerneinsicht.
- Der Ausgangszustand ist als statische Abbildung druckwürdig und zeigt keinen
  trivialen oder leeren Fall.
- Aufgabe in der Prosa bzw. als kurze Handlungsanweisung; keine unerklärte
  Motivation im Widget.
- Direkte Manipulation wird bevorzugt. Jeder Drag hat einen Slider- oder
  Zahleneingabe-Doppelpfad.
- Buttons stehen für diskrete Fälle; kontinuierliche Größen werden nicht durch
  Button-Klicken durchlaufen.
- Vergleiche erscheinen möglichst nebeneinander mit gemeinsamen Controls.
- Das zustandsabhängige Verdikt interpretiert alle erreichbaren Fallklassen und
  nennt den mathematischen Grund, nicht nur den Messwert.
- Überraschende Ergebnisse werden nicht vor einer Vorhersageaufgabe verraten.
- Degenerierte Fälle werden verhindert oder explizit erklärt.

## 5. Visuelle, technische und barrierefreie Ausführung

- Achsen, Einheiten, Legende und mathematische Rollen sind beschriftet.
- Farben tragen konstante Rollen und sind nicht der einzige Bedeutungsträger.
- Zahlen sind deutsch formatiert und springen beim Regeln nicht unnötig.
- Grafik und Controls funktionieren bei 380 px ohne abgeschnittene Inhalte;
  Touch-Ziele sind ausreichend groß.
- Grafik hat sinnvolles `aria-label`, Toggles `aria-pressed`, Verdikte eine
  zugängliche Rückmeldung; native Controls werden wiederverwendet.
- Kein ungesetztes `Math.random`; reproduzierbare Stichproben und belegte
  Zahlen. Header nennt Provenienz und Verifikation.
- Keine unnötigen Animationsschleifen oder teuren Neuberechnungen.

## Medienentscheidung

- **KEEP**: Form, Inhalt und Integration sind tragfähig; höchstens kleine
  Korrekturen.
- **REVISE**: Das Konzept oder die Interaktion ist wertvoll, braucht aber eine
  substanzielle Text-, Aufgaben-, Fall- oder Widget-Überarbeitung.
- **STATIC**: Die Einsicht ist visuell, aber Interaktion fügt kaum Erkenntnis
  hinzu; durch eine gezielte statische Abbildung oder Tabelle ersetzen.
- **REMOVE**: Visualisierung/Widget leistet keinen didaktischen Zusatz oder
  dupliziert eine bessere Erklärung. Das Pop-up selbst bleibt nur dann, wenn der
  Begriff als Voraussetzung gebraucht wird.

## Schweregrade

- **CRITICAL**: fachlich falsch oder numerisch unehrlich; führt sehr
  wahrscheinlich zu einer falschen Vorstellung.
- **MAJOR**: Pop-up ist nicht selbstständig verständlich, zentrale
  Voraussetzungen fehlen, Medienform verfehlt die Einsicht oder ein Widget ist
  praktisch unbrauchbar.
- **MINOR**: lokale Inkonsistenz, Beschriftungs-, Struktur-, Responsiveness- oder
  Accessibility-Mangel ohne Verlust der Kernaussage.
- **NOTE**: begründete Verbesserungsidee, kein Defekt.

## Ausgabeformat pro Konzept

```text
<concept-id> — <KEEP|REVISE|STATIC|REMOVE> — <ein Satz Gesamturteil>
- [SEVERITY] path:line — Befund. Konkreter Änderungsvorschlag.
```

Auch ein sauberer Eintrag bekommt einen kurzen KEEP-Satz. Keine Praise-Füllung,
keine Implementierung und keine Befunde ohne Zeilenbeleg.
