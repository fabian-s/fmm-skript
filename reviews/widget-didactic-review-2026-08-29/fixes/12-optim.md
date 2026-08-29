# Fix-Log Kapitel 12 — Nichtlineare Gleichungen & Optimierung (2026-08-29)

Grundlage: `reviews/widget-didactic-review-2026-08-29/12-optim.md`.

Verifikation: ein neues konsolidiertes Prüfskript
`scripts/verify/REV29/12-optim.mjs` (grün, von `npm run verify:numbers` über die
Verzeichnisrekursion in `scripts/verify/run-all.mjs` automatisch erfasst) und
ein eigener CDP-Pass auf einem Dev-Server (Port 4185) bei 1300 px und 390 px,
mit Interaktionssequenzen je Kasten. Der Preview-Server auf 4179 zeigt einen
älteren Build und wurde nicht benutzt.

Der Report nennt drei Muster; alle drei sind abgearbeitet.

---

## Muster 1 — der Schätzfragen-Spoiler (elf von elf Kästen)

Im Render-Pass in der Phase „tippen" enthält jetzt **keiner** der elf Kästen
mehr die Antwort seiner eigenen Schätzfrage. Einzeln nachgewiesen (Kastentext
per CDP ausgelesen, jeweils vor der Eingabe):

| Kasten | Quelle des Spoilers | Fix |
|---|---|---|
| 1 Bisektion | `S121.mdx:392-394` (Satz **vor** dem Kasten) und `:501-503` | Rechnung ohne Ergebniszahl; die drei Schrittzahlen 10 / 20 / 34 stehen im `verdeckt` |
| 2 Newton | `S121.mdx:626-648` | „1,3917" und die Divergenzfolge wandern ins `verdeckt` |
| 3 Fixpunkt | `S121Fixpunkt.tsx:291-293` (Ablesetafel) + `S121.mdx:878-880` | neue Prop `zeigeGrenze`, aus der `Schaetzfrage` per Render-Prop (`children={({aufgeloest}) => …}`) durchgereicht: „Divergenz ab γ > …" und die beiden Verdikt-Sätze mit `sys.gammaMax` erscheinen erst nach dem Auflösen |
| 4 Sattel | Preset-Name `S122Sattel.tsx:108` + `S122.mdx:385-387, 408-411` | Presets heißen „erster Start" / „zweiter Start" / „Start für den Newton-Knopf"; die Auflösung steht im `verdeckt` |
| 5 Nelder-Mead | `S123.mdx:145-149` | die Statistik 23 / 13 / 4 steht im `verdeckt` |
| 6 GdStepper | `S123GdStepper.tsx:288` (Ablesetafel „also 1/L = 0,5 und 2/L = 1") | Zeile auf „L = f″ = 2" gekürzt; die abgeleiteten Schwellen stehen nur noch im Verdikt |
| 7 Canyon | `S123.mdx:699-701` | 35 / 88 / 336 ins `verdeckt` |
| 9 Newton-Parabel | `S124.mdx:214-224` | der Satz über x⁽⁰⁾ = 0,5 ins `verdeckt` |
| 11 Momentum | `S124.mdx:699-701` | 106 gegen 31 ins `verdeckt` |
| 13 Ridge/Lasso | `S125RidgeLasso.tsx:226` (Verdikt im **Startzustand**) + `S125.mdx:318-319` | Schlusssatz des Verdikts gestrichen (Beweismittel ist der „Ecke!"-Vermerk), Zahl ins `verdeckt` |
| 14 Landkarte | `S126.mdx:131` („Es sind genau drei.") | erste Zeile ins `verdeckt`, der Rest bleibt |

**Rationale:** Elf Kästen bauen ein Predict-then-reveal auf und beantworten die
Frage im selben Atemzug; das ist das Anti-Muster aus design-patterns §1 in
Reinform. Mit dem Verschieben werden zugleich drei Selbsttest-Zahlfragen
(`S121.mdx:957` → 1,39, `S124.mdx:914` → 31, `S126.mdx:280` → 0,1085) wieder
das, was sie sein sollen: nur mit dem Widget beantwortbar. Nach dem Auflösen
erscheint die Auflösung wirklich — für die Fixpunkt-, Nelder-Mead- und
Canyon-Kästen im Browser durchgespielt.

## Muster 2 — beworbene Zustände außerhalb des Zustandsraums (vier Stellen)

- `S121Newton.tsx:160`: **K_MAX von 8 auf 12** gehoben. Erst damit ist der
  beworbene Lauf ab x⁽⁰⁾ = 1,05 vollständig vorführbar (er kommt im 8. Schritt
  an). Die Prosa `S121.mdx:645` sagt jetzt „doppelt so viele Schritte wie aus
  einem gutmütigen Startpunkt" statt „zehn statt fünf" — das passt zur neuen,
  korrekten Schrittzählung (siehe Muster 3) und ist im Prüfskript asserted.
- `S122Sattel.tsx:70` (SCHRITTE = 8): hier war der **Text** falsch, nicht die
  Konstante. Die Konsolidierung `S122.mdx:409-411` behauptete „nach zwanzig
  Schritten bei 1,4·10⁻⁶"; das Widget rechnet acht. Der Satz ist gestrichen,
  die Auflösung steht im `verdeckt` und beschreibt, was der Leser sieht.
- `S122Sattel.tsx:409-417`: **γ-Regler von 0,45 auf 0,5** gehoben. Der
  didaktisch schönste Fall — der x-Faktor 1 − 2γ wird exakt null, ein Schritt
  genügt — ist jetzt einstellbar, und beide betroffenen Verdikt-Zweige sagen
  das dort auch. γ = 0,5 ist ein Rastwert des Reglers (Schrittweite 0,05), der
  Fall wird also über den kontrollierten Parameter erkannt.
- `S124Momentum.tsx:74`: **PRUEFE von 400 auf 1000** gehoben. Bei κ = 100 zeigt
  die Ablesezeile jetzt „ohne 608" statt „> 400" — genau die Zahl, die Prosa
  und Header nennen. Im Browser bestätigt.

## Muster 3 — Verdikte, die dem widersprechen, was daneben steht

- `S121Newton.tsx:267`: `titel = "am Ziel nach ${kk} Schritten"` gab die
  **Reglerstellung** aus, nicht den Ankunftsschritt. Neu: `ankunft` ist der
  erste Index mit Fehler < 10⁻¹⁰; im Browser geprüft (kubisch ab x⁽⁰⁾ = −2,
  Regler am Ende: „am Ziel nach 4 Schritten" statt „nach 12"). Die Headerzahlen
  sind auf dieselbe Definition umgestellt (4 / 4 / 5 statt 5 / 5 / 7, 1,05 → 8)
  und im Prüfskript einzeln asserted.
- `S125RidgeLasso.tsx:228-231`: Der mittlere Zweig behauptete „Beide
  Nebenbedingungen binden noch", während die Ablesezeile der Ridge-Tafel im
  selben Zustand „NB inaktiv, μ = 0" meldete — für die 13 Reglerstellungen
  zwischen r = 1,85 und r = 2,45. Neuer vierter Zweig „nur noch das
  Lasso-Budget bindet", der `ridge.aktiv` auswertet und den Widerspruch zur
  Lehraussage macht. Bei r = 1,90 im Browser nachgewiesen.

## Die einzelnen Widgets

### S121Bisektion.tsx — BisektionStepper (Kasten 1)
**Umgesetzt:** MAJOR `S121.mdx:392-394, 501-503` (siehe Muster 1).
**Offen:** NOTE `:225-229` (Legendenabsatz im Widget) — NOTE.

### S121Newton.tsx — NewtonNullstelle (Kasten 2)
**Umgesetzt:** MAJOR `:267` (Schrittzählung, Muster 3), MAJOR
`S121.mdx:626-648` (Muster 1), MINOR `S121.mdx:639-641` (die Konsolidierung
beschreibt jetzt den Lauf ab der **Voreinstellung** x⁽⁰⁾ = 3 mit den Fehlern
4,2·10⁻¹ / 4,8·10⁻² / 7,9·10⁻⁴ / 2,2·10⁻⁷, die der Leser in der Tabelle
wirklich findet), MINOR `:160` (K_MAX, Muster 2).
**Offen:** NOTE `:268` (der „am Ziel"-Text erklärt den Quotienten immer am
Beispiel x² − 2) — NOTE.

### S121Fixpunkt.tsx — FixpunktSpirale (Kasten 3)
**Umgesetzt:** MAJOR `:291-293` und `S121.mdx:878-880` (Muster 1).
**Offen:** MINOR `:155-164, 294-299` (geklemmte divergente Bahnen sehen wie
Konvergenz gegen eine Ecke aus; der Fix „geklemmte Punkte rot und ohne
Verbindungslinie" berührt die Bahnzeichnung als Ganzes und ist mehr als eine
lokale Änderung) — offen gelassen.

### S122Sattel.tsx — SattelpunktWidget (Kasten 4)
**Umgesetzt:** MAJOR `S122.mdx:385-387` / `:108` / `:408-411` (Muster 1),
MINOR `:70` und `:409-417` (Muster 2).
**Offen:** MINOR `:379-383, 399-404, 439-461` (drei Prosablöcke im Widget) —
das sind zusammen rund 15 Sätze, deren Verschiebung die MDX über das
Wortbudget hebt; offen gelassen. NOTE `:427-437` (der Newton-Knopf setzt hart
auf (0; 0)) — im Header begründet.

### S123NelderMead.tsx — NelderMeadSimplex (Kasten 5)
**Umgesetzt:** MAJOR `S123.mdx:145-149` (Muster 1), MINOR `:295-299` (der
Absatz über die Zielfunktion stand wörtlich schon in der MDX-Prosa vor dem
Kasten und ist auf die zwei Sätze gekürzt, die das Widget wirklich braucht).
**Offen:** NOTE `:216-220` (der Kontraktions-Zweig nennt den häufigsten Zug),
NOTE `:231` (Rahmen im Rahmen) — beides NOTE.

### S123GdStepper.tsx — GdStepper1D (Kasten 6)
**Umgesetzt:** MAJOR `:288` (Muster 1), MINOR `S123.mdx:250-265` (der Kasten
hatte gar keine Konsolidierung; vier Sätze über den Fehlerfaktor 1 − γL stehen
jetzt drin, die ausführliche Fallunterscheidung bleibt in der Bemerkung
danach).

### S123Canyon.tsx — CanyonWidget (Kasten 7)
**Umgesetzt:** MAJOR `S123.mdx:699-701` (Muster 1).
**Offen:** NOTE `:193-200` (zwei unerreichbare Verdikt-Zweige) — im Header
ausdrücklich als unerreichbar dokumentiert, also genau so gehandhabt, wie F8 es
verlangt; nichts zu tun.

### S123Armijo.tsx — ArmijoWidget (Kasten 8)
**Umgesetzt:** MINOR `:295-298` (die Bau-Erläuterung „warum der c-Regler bei
0,05 beginnt" steht jetzt als BAUENTSCHEIDUNG im Header statt auf der Seite).
**Offen:** MINOR `:264-268` (der erste Erklärabsatz erklärt γ* und die
Armijo-Gerade — er trägt die Lesart der Tafel und bleibt), NOTE `:62-65, 78`
und NOTE `:132-135` — beides NOTE, letzteres im Header dokumentiert.

### S124Newton.tsx — NewtonParabelLab (Kasten 9)
**Umgesetzt:** MAJOR `S124.mdx:214-224` (Muster 1).

### S124Bfgs.tsx — BfgsStepper (Kasten 10)
**Offen:** NOTE (Schrittregler ist ein `Slider` statt eines `Stepper`, G5) —
NOTE, und der Wechsel wäre ein Umbau der Bedienung.

### S124Momentum.tsx — MomentumVergleich (Kasten 11)
**Umgesetzt:** MAJOR `S124.mdx:699-701` (Muster 1), MINOR `:74` (PRUEFE,
Muster 2), MINOR `:196, 219` (Schweizer „ss" → „ß": „größere Schritte",
„schießen über das Tal hinaus", „Größenordnungen"; im Browser im Verdikttext
nachgeprüft).

### S125Lagrange.tsx — LagrangeGeometrie (Kasten 12)
**Umgesetzt:** MINOR `:473`. Die Verdikt-Art hing allein an `parallel`; im
Modus „x + y ≤ 1" stand deshalb im Punkt (0,5; 0,5) ein grünes ✓ über einem
Text, der erklärt, dass genau dieser Punkt **kein** KKT-Punkt ist. Neu:
`kkt = parallel && (modus === "eq" || multAusX > 0)` steuert Art und Titel mit,
im ≤-Modus also `warn` mit „parallel, aber μ < 0: kein KKT-Punkt". Im Browser
ausgelöst.
**Offen:** NOTE `:258-263` (vierzeilige Legende) — vertretbar, sie erklärt
fünf Farbrollen auf einmal.

### S125RidgeLasso.tsx — RidgeLassoGeometrie (Kasten 13)
**Umgesetzt:** MAJOR `:228-231` (vierter Zweig, Muster 3), MAJOR `:226` und
`S125.mdx:318-319` (Muster 1).
**Offen:** NOTE `:218` (der Schwellentest `c <= 1.3 + 1e-9` ist an das
0,05-Raster gebunden). Das ist bewusst so: Der Vergleich läuft über den
KONTROLLIERTEN Reglerwert, nicht über einen abgeleiteten Float, und das
Prüfskript belegt, dass beide Wege auf diesem Raster übereinstimmen
(r = 1,30 Ecke, r = 1,35 nicht mehr).

### S126Landkarte.tsx — OptimLandkarte (Kasten 14)
**Umgesetzt:** MAJOR `S126.mdx:131` (Muster 1), MINOR `:178-190` (vier Ticks je
Achse plus „x₁ →" und „x₂ ↑"; im Browser abgelesen: −1,0 / 0,0 / 1,0 / 1,5 an
beiden Achsen — die Koordinaten aus Verdikt und Preset-Namen lassen sich jetzt
im Bild verorten).
**Offen:** NOTE `:183-186` (`role="img"` auf einer Ziehfläche; `role="group"`
wäre korrekt). Das Muster steckt in vier Widgets des Kapitels und in weiteren
Kapiteln; ein einzelner Wechsel hier hilft niemandem — gehört in einen eigenen
A11y-Lauf.

---

## Entscheidung nötig

Keine STATIC/REMOVE-Empfehlungen in diesem Kapitel; alle vierzehn Widgets sind
im Review als KEEP oder REVISE geführt.

## lib-Befunde (nicht gefixt, `src/lib` ist tabu)

- `src/lib/widgets/Plot.tsx`: `PlotPolyline` hat keine `width`-Option; das
  orange Plateausegment in Kapitel 11 muss mit der Standardbreite 2 auskommen.
- `role="img"` auf ziehbaren SVGs (S121Newton, S122Sattel, S125Lagrange,
  S126Landkarte): der Doppelpfad über die Regler rettet die Tastaturbedienung,
  aber die Rolle ist falsch. Betrifft mehrere Kapitel.

## Nicht angefasst (eigener Lauf)

**H3 Violett-Rollen-Drift.** Violett ist im Kapitel-Bauauftrag frei und trägt
in fünf Widgets fünf verschiedene Rollen (Graph von f in S121Bisektion,
S121Newton, S123GdStepper, S123Armijo; stationärer Punkt in S122Sattel;
Momentum-Bahn in S124Momentum; KQ-Punkt und erreichte Höhenlinie in S125).
Jede Datei begründet ihre Wahl im Header, S124Momentum weist ausdrücklich auf
die Kollision hin — trotzdem ist „EINE Farbe = EIN Teilausdruck" auf
Kapitelebene verletzt. Der Fix wäre eine Zeile im Bauauftrag (KONVENTIONEN.md,
etwa „Violett = das zweite, verglichene Objekt") und ein kapitelweiter
Farbumbau; das ist ein eigener Lauf und hier bewusst nicht angefasst.

---

## Zusammenfassung

- **Umgesetzt:** 11 MAJOR (elf Spoiler-Kästen) + 2 MAJOR (Verdikt-Widersprüche)
  + 11 MINOR/NOTE.
- **Offen:** 4 MINOR (Bahnklemmung S121Fixpunkt, Prosablöcke S122Sattel,
  erster Erklärabsatz S123Armijo, Rasterbindung S125RidgeLasso als bewusste
  Entscheidung) und 8 NOTE.
- **Entscheidung nötig:** keine.
- **Neues Prüfskript:** `scripts/verify/REV29/12-optim.mjs` löst den Vermerk
  „historische Notiz" in allen **vierzehn** Dateien ab; alle vierzehn Header
  tragen jetzt Skriptpfad und Datum. Die toten Pfade `check-math-s131/2/3/4`,
  `check2-s134`, `check-fix-s131`, `rev135-*`, `rev136-*`, `s131newton-zweige`,
  `s133b`, `s133c` sind entfernt.
- **Wortzahl** (gegen `git show HEAD:<datei>`): S121 +0,80 %, S122 −0,47 %,
  S123 +1,24 %, S124 ±0 %, S125 ±0 %, S126 −0,11 %. Budget ≤ +3 % eingehalten.
