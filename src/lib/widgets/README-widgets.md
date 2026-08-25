# Widget-Bausteine (`src/lib/widgets/`) — Kurzanleitung

Alles hier wird über `src/lib` importiert: `import { Verdikt, useDrag } from "../../../lib";`
Getippte Beispiele zum Abschreiben: `__examples__.tsx` (wird nirgends importiert).

## Die drei Pflichtteile jedes Widgets

```tsx
<Aufgabe>Ziehen wir x auf die Antidiagonale.</Aufgabe>   {/* EINE Zeile, Wir-Form */}
<svg viewBox={…} className="max-w-full h-auto" {...zieh.svgProps}> … </svg>
<Verdikt kind="fail">Hier scheitert (12.3): f ist nicht konvex.</Verdikt>
```

Mehr Prosa gehört NICHT ins Widget. Motivation steht im Absatz davor, die
Auflösung im Absatz danach (Spoiler-Split). `Verdikt kind`: `neutral | ok |
warn | fail`; die Art trägt immer ein Zeichen (→ ✓ ! ✗), nie nur Farbe.

## Ziehen (`useDrag`, `DragHandle`)

```tsx
const zieh = useDrag<"a" | "b">({
  feld: { x0: PAD_L, y0: 0, w: SIZE, h: SIZE },     // SVG-Nutzerkoordinaten
  welt: { x0: -3, x1: 3, y0: -2, y1: 2 },           // Datenfenster
  clamp: ([x, y], id) => [clamp(x, -3, 3), clamp(y, -2, 2)],
  snap: 0.05,                     // nur wenn die Lektion diskret ist
  greifPosition: (id) => (id === "a" ? a : b),      // kein Sprung unter den Cursor
  onDrag: (p, id) => (id === "a" ? setA(p) : setB(p)),
});
<DragHandle x={px(a[0])} y={py(a[1])} farbe={FMM_COLORS.blau}
            aktiv={zieh.dragging === "a"} {...zieh.handleProps("a")} />
```

`svgProps` gehört immer ans `<svg>` (PointerMove/Up/Leave/Cancel, touch-action).
Ist die ganze Fläche der Griff (Landkarte, Klick setzt Punkt), zusätzlich
`{...zieh.surfaceProps("p")}` ans `<svg>`. Eigene Umrechnung statt `feld/welt`:
`toWorld: (cx, cy, svg) => …` bzw. der Helfer `svgWorldMapper(svg, feld, welt)`.

**Doppelpfad-Regel (hart):** jedes ziehbare Objekt braucht zusätzlich einen
`<Slider>` oder ein Zahlenfeld auf derselben Zustandsquelle. Kein Drag-only-Widget.

## Schritte (`Stepper`) und Übergänge (`useAnimatedValue`)

`<Stepper step={k} setStep={setK} max={6} playable narration={…} />` — Regler,
◀ ▶ ⏮, optional ⏵/⏸ (startet nie von selbst, hält am Ende an). Der Zustand
gehört dem Aufrufer und wird deterministisch aus `k` gerechnet (`useMemo`).
`useAnimatedValue(ziel, 250)` / `useAnimatedMatrix(M)` nur für DISKRETE Sprünge
(Preset-Wechsel); im Ruhezustand läuft kein rAF.

## Erst tippen, dann auflösen (`Schaetzfrage`)

```tsx
<Schaetzfrage frage="Ab welchem γ divergiert es?" loesung={2} toleranz={0.2}
              einheit="γ" verdeckt={<Marke />}>
  <MeinWidget />
</Schaetzfrage>
```

Varianten `zahl` (Default) · `auswahl` (`optionen={[{id,text},…]}`) · `bereich`
(Regler) · `klick`. Für `klick` sind die `children` eine Funktion und bekommen
`{ phase, aufgeloest, guess, setGuess }`. `verdeckt` erscheint erst nach dem
Auflösen, `auswertung(guess, loesung)` ersetzt das Standard-Verdikt.

## Oberflächen: hell, dunkel, Tooltip-Panel

SVG-Innenleben zeichnet mit den CSS-Variablen `--w-bg`, `--w-grid`,
`--w-grid-strong`, `--w-axis`, `--w-text`, `--w-muted`, `--w-border`
(`src/index.css`; das Tooltip-Panel trägt `.w-dark` und setzt sie um).
DOM-Bedienelemente nutzen die Klassenketten aus `surface.ts` (`W_PANEL`,
`W_TEXT`, `W_MUTED`, `W_BUTTON`, `W_BUTTON_AKTIV`, `W_INPUT`) — sie decken
hell, `dark:` und `.w-dark` ab. Kein `tickClass`, keine festen Pixelbreiten,
keine eigenen Hexfarben außerhalb von `FMM_COLORS`. Zufall nur über
`useSeed`/`mulberry32`, Zahlen nur über `fmtDe`/`fmtInt`/`fmtTick`.

## Flächen im Raum (`Surface3D`, `ViewControls`)

Einsatzregel (D7): Die 2D-Höhenlinientafel bleibt die tot lesbare
Hauptdarstellung, die Fläche steht **daneben** und zeigt denselben Punkt,
denselben Pfeil, dieselbe Kurve. Alle Zahlen bleiben im Verdikt der 2D-Tafel;
die 3D-Tafel behauptet nichts Eigenes.

```tsx
const [sicht, setSicht] = useState<Sicht3D>({ azimuth: 38, elevation: 26 });
const flaeche = useMemo(() => ({ f, nx: 28, ny: 28, color: FMM_COLORS.blau,
                                 opacity: 0.85, wire: true }), [f]);
<Surface3D
  size={280} xDomain={[-2.4, 2.4]} yDomain={[-2.4, 2.4]} zDomain={[zLo, zHi]}
  surface={flaeche} contours={niveaus} contourColor={FMM_COLORS.blau}
  points={punkte} arrows={pfeile} dropLines labels={{ x: "x₁", y: "x₂", z: "f" }}
  azimuth={sicht.azimuth} elevation={sicht.elevation} onViewChange={setSicht}
  ariaLabel={`… im aktuellen Zustand ${gestalt}.`}
/>
<ViewControls value={sicht} onChange={setSicht} />
```

Overlays in WELTkoordinaten, alle tiefensortiert: `points` (`{p, color, r,
label, onTop}`), `arrows` (`{from, to, color, label, onTop}`), `curves`
(`{pts, color, dash, width, onTop}`), `planes` (`{p0, u, v, su, sv, color,
opacity}` — Tangential- oder Schnittebene), `dropLines` (Lot auf den Boden).

Drei Fallen:

1. **`onTop` für alles, was auf dem Boden liegt.** Eine Fläche über dem ganzen
   Fenster verdeckt den Boden aus jeder Blickrichtung von oben vollständig —
   Höhenlinien auf dem Boden sieht man nur durch eine halbdurchsichtige Fläche
   (`opacity` ≈ 0,85), Pfeile und Punkte brauchen `onTop: true`.
2. **`surface`/`points`/`arrows`/… in `useMemo`**, sonst wird das Wertegitter
   bei jedem Rendern neu gerechnet (die Fenster-Arrays dürfen Literale sein,
   die merkt sich die Komponente über ihre Zahlen).
3. **`zDomain` selbst setzen**, wenn Overlays auf dem Boden liegen sollen —
   nur dann kennt der Aufrufer die Bodenhöhe (`z = zDomain[0]`).

Ziehen im Bild dreht die Kamera (Dualpfad: `<ViewControls>`, zwei Regler +
Rücksetzknopf). Gitter höchstens 40 × 40, keine Animationsschleife. Referenz-
Aufrufer: `src/chapters/10-differentialrechnung/widgets/S107Hesse.tsx`.
