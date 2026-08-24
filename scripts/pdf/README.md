# Druckfassung des Skripts

Erzeugt aus denselben MDX-Quellen wie die Web-App ein LaTeX-Buch ohne die
interaktiven Widgets.

```bash
npm run pdf                     # -> build/pdf/fmm-skript.pdf
npm run pdf -- --strict         # Konvertierungswarnungen sind Fehler
```

Voraussetzungen: `xelatex` (TinyTeX reicht) und die Makrodatei
`fmm-lmu/slides/defs-fmm.tex` im Elternverzeichnis — dieselbe Kopplung, die
`scripts/gen-macros.mjs` schon für die MathJax-Makros hat.

## Wie es funktioniert

`mdx-to-latex.mjs` parst die MDX-Dateien mit der kanonischen remark-Kette,
aber **ohne** `remark-fmm`: das Plugin bildet auf React-Komponenten ab, hier
werden die Direktiven roh gebraucht. Kapitel- und Abschnittsreihenfolge kommen
aus `src/chapters/index.ts` und den `index.ts` der Kapitel, nicht aus dem
Dateisystem.

| Quelle | Druck |
| --- | --- |
| `:::satz[3.1.4 (…)]` | farbig abgesetzter Kasten mit Beschriftung |
| `:::vertiefung[…]` | grauer Kasten, gestrichelter Rand, kleiner Satz |
| `::::beweis` / `:::schritt` / `::why[…]` | nummerierte Schritte, Begründung klein und grau |
| `::::quiz` / `:::frage` / `:::zahlfrage` | Selbsttest mit ausgeschriebener Antwort |
| `:k[Begriff]{#id}` | normaler Text (im Web ein Erklärfenster) |
| `<details><summary>Lösung</summary>` | Zwischenüberschrift, Inhalt aufgeklappt |
| `<SomeWidget />` | schmale Marke „Interaktives Element" |
| `$$ {#eq-2.3}` | `equation` mit `\tag{2.3}` |

Die Abschnittsnummern stehen im Quelltext und werden wörtlich übernommen
(`\section*` plus `\addcontentsline`), damit Verweise im Fließtext
(„Satz 3.1.4") garantiert stimmen. `#sec-…`-Links werden zu `\hyperref`.

## Fallen, die hier schon zugeschnappt sind

- **`shorthands=off` bei babel-german ist Pflicht.** babel macht `"` aktiv,
  und die Quellen schließen ihre `„…"`-Zitate mit einem geraden ASCII-Zeichen.
  Aus `„Krümmung" ist` wird sonst `„Krümmungïst` (`"i` → `ï`), aus `glatt" zu`
  wird `glattßu` (`"z` → `ß`) — stiller Textschaden mitten im Satz.
- **`amssymb` darf nicht neben `unicode-math` stehen** (`\eth already
  defined`). `\square`/`\blacksquare` deckt Libertinus Math nicht ab und
  werden deshalb aus Linien gebaut.
- **Die `\cb*`-Makros aus `defs-fmm.tex` setzen `\bfseries`**, also Textmodus,
  und brechen in einer Formel ab. MathJax ignoriert den Schalter still, LaTeX
  nicht — die Preambel definiert sie auf `\symbf` um.
- **MDX legt um Inline-JSX auf eigenen Zeilen einen `paragraph`.** Die `<td>`
  hängen darum nicht direkt am `<tr>`; ohne Auspacken entsteht eine Tabelle
  mit Zeilen, aber ohne Spalten.
- **MathJax erlaubt `\\` in `$$…$$`, LaTeX nicht.** Abgesetzte Formeln mit
  Zeilenumbruch werden in `aligned`/`gathered` gehüllt.
- **Tabellenspalten brauchen eine Mindestbreite.** Rein proportional gewichtet
  läuft ein langes Kompositum ohne Leerzeichen in die Nachbarspalte
  (`Operatornormemaximale Streckung`).

## Prüfungen

`mdx-to-latex.mjs` meldet jeden unbekannten Knoten, jede unbekannte Direktive
und jede unbekannte Komponente; `--strict` bricht dann ab. `build.sh` prüft
die Seitenzahl (ein leeres PDF sieht am Exitcode wie ein Erfolg aus) und
berichtet offene Querverweise, überbreite Zeilen und geschrumpfte Formeln.
