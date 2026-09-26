# Erklärvideo: Singulärwertzerlegung

Manim-Video (~4,5 min) zu Kap. 6: Kreis → Ellipse, drehen/strecken/drehen,
Kugel → Ellipsoid, Rangabfall und Kern (ℝ³ → ℝ²), Spektralnorm,
Kondition, Eckart–Young, Pseudoinverse.

| Datei | Inhalt |
| --- | --- |
| `narration.py` | Sprechertext, ein Eintrag pro Segment (Zahlen ausgeschrieben) |
| `narration.json`, `narration.txt` | Export davon (`python narration.py`) |
| `tts.py` | erzeugt `audio/<key>.wav` + `audio/durations.json` |
| `common.py` | Farben (Okabe-Ito wie im Skript), LaTeX-Makros, Matrixpfade, Timing |
| `scenes_2d.py` | Szenen 1, 2, 4, 5 |
| `scene_3d.py` | Szene 3 (3D) |
| `build.sh` | rendert alles und schneidet `svd.mp4` zusammen |

Die Animationen richten sich nach der Länge der Sprachspuren: Jedes Segment
startet seine Tonspur und wartet am Ende, bis sie ausgelaufen ist. Andere
Stimme → neue WAVs → neu rendern, am Code ändert sich nichts.

## Eigene Stimme / eigenes TTS-Modell

Entweder die WAVs selbst erzeugen (Dateiname = Segment-Key aus
`narration.json`, z. B. `audio/s1_01.wav`) und dann

    python tts.py --durations-only

oder das Modell direkt einhängen:

    python tts.py --engine cmd --cmd 'mytts --text-file {textfile} --out {out}'

Danach `./build.sh` (Entwurf, 720p) bzw. `./build.sh -qh` (1080p60).

## Abhängigkeiten

`pip install manim` (braucht cairo/pango-Header), LaTeX mit `standalone`,
`xcolor`, `dvisvgm`; ffmpeg, sox. Für den Pico-Entwurf: `libttspico-utils`.
