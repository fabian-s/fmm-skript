# Machbarkeitsstudie: automatische Nummerierung im FMM-Skript

Repo: `/home/fabians/lehre/FMM/fmm-lmu/skript` (React + Vite + MDX, 13 Kapitel,
72 Abschnitts-MDX, 117 Widget-TSX, 134 Konzept-MDX). Stand 2026-08-26, rein lesend
erhoben (grep/Read; keine Builds, keine Änderungen).

---

## 1. IST-Analyse: Wie fließen Nummern heute durch das System?

### 1.1 Die drei Nummernquellen

| Ebene | Quelle der Nummer | Wo verarbeitet |
|---|---|---|
| **Kapitel `K`** | Feld `num:` in der Registry `src/chapters/index.ts` (Z. 40–125), Reihenfolge = Array-Reihenfolge; Verzeichnisname `NN-slug` trägt die Nummer nur als Konvention | `chapterLabel()` (index.ts Z. 33), Sidebar, PDF (`mdx-to-latex.mjs` Z. 883–886) |
| **Abschnitt `K.k`** | Feld `id: "12.3"` in `src/chapters/<kap>/index.ts` (**von Hand** getippt, z. B. `12-optim/index.ts` Z. 12–17); Dateiname `S123.mdx` ist nur Konvention | `scripts/gen-toc.mjs` extrahiert `id`/`title` per Regex (Z. 34–36) → `toc.generated.ts`; `App.tsx` Z. 175 erzeugt `<section id="sec-12.3">`; `Sidebar.tsx` Z. 118 baut `#sec-K.k`/`?k=<kap>#sec-K.k`; PDF Z. 891 `\label{sec-K.k}` |
| **Env-/Gleichungs-/Unterabschnittsnummer `K.k.n`** | **von Hand im MDX**: `:::satz[12.5.7 (Name)]`, `$$ {#eq-12.5.3}`, `### 2.5.1 Titel` | `mdx/remark-fmm.mjs`: `takeLabel()` Z. 215–240 (Label = reiner Text, Mathe verboten), Env-Umbau Z. 456–470 → `<EnvBlock kind label="12.5.7 (Name)">`; Gleichungen Z. 537–571 → `<Eq tag="12.5.3">` (Duplikatprüfung nur **pro Datei**); Überschriften Z. 573–588 → `<h3 id="sec-2.5.1">` (ID **nur** aus führender Nummer) |

Es gibt **keinen** Zähler im System. Nirgends wird geprüft, ob eine Nummer zum
Abschnitt passt, lückenlos ist oder ob ein Verweis ein Ziel hat. Ein Zufalls-Check
(siehe 1.4) zeigt, dass der Bestand trotzdem konsistent ist – Verdienst der Autoren
und des Orakels, nicht der Werkzeugkette.

### 1.2 Zählkonvention (aus dem Bestand abgelesen, bestätigt in KONVENTIONEN.md Z. 109–113)

- **Ein laufender Zähler über ALLE Env-Typen pro Abschnitt** (`K.k.n`, n startet in jeder
  Datei bei 1): `12-optim/S125.mdx` hat `definition 12.5.1, bemerkung 12.5.2, bemerkung 12.5.3,
  definition 12.5.4, satz 12.5.5, …`. Alle 72 Dateien sind streng monoton ohne Lücke
  (geprüft), und der Präfix `K.k` stimmt überall mit dem Dateinamen überein.
- **Gleichungen zählen separat**, ebenfalls `K.k.n` pro Abschnitt, ebenfalls lückenlos
  monoton. Dadurch gibt es 150 Nummern, die **sowohl** als Env-Label als auch als
  Gleichungs-Tag existieren (z. B. `10.1.1` = Definition und Gleichung) – die Typangabe
  im Verweis („Satz“ vs. „( )“) ist also bedeutungstragend.
- **Nummerierte Unterüberschriften** (`### 2.5.1 Titel`, 50 Stück, v. a. Kap. 2/7) nutzen einen
  **dritten** Zähler `K.k.n` – dieselbe Nummer kann also Satz, Gleichung und Unterabschnitt sein.
  350 weitere `###`/`####` sind unnummeriert und bekommen keine ID (remark-fmm Z. 575–577,
  bewusst gegen Duplikate).
- Kapitel 8 zählt Gleichungen mit Kapitelnummer 8 (nicht mehr Foliensatz-Nummer, obwohl
  KONVENTIONEN.md Z. 46 noch „K = Foliensatz-Nummer“ sagt – veraltet).

### 1.3 Wo Nummern gerendert werden

- `src/lib/Math.tsx` Z. 342: `EnvBlock` zerlegt das Label per Regex `^([\d.]+)\s*\((.+)\)$`
  in Pille „SATZ 12.5.7“ + Beiname. 19 Labels sind nummer-only, **1 Label ist
  nummernlos** (`:::bemerkung[Konvention bei breiten Matrizen]`, wird als Pille „BEMERKUNG
  Konvention bei breiten Matrizen“ gerendert).
- `Eq` (Math.tsx Z. 297–306): Tag als absolut positionierter `<span>` „(12.5.3)“ – **kein**
  `\tag` in MathJax (0 Vorkommen von `\tag{}` im MDX).
- EnvBlocks haben **keine HTML-ID** → Verweise auf Sätze sind heute reiner Text ohne Link
  (nur 1 Verweis `[Beispiel 10.6.7](?k=…#sec-10.6)` ist verlinkt, auf den Abschnitt).
- PDF (`scripts/pdf/mdx-to-latex.mjs`): Env → `\begin{fmmenv}{Farbe}{Satz}{12.5.7 (Name)}`
  (Z. 555–561; Label wird als Text eskapiert, `preamble.tex` Z. 162–171 setzt ihn fett), Gleichung
  → `\begin{equation}\tag{12.5.3}\label{eq-12.5.3}` (Z. 149–156), Überschrift mit Nummer →
  `\phantomsection\label{sec-2.5.1}\subsection*{…}` (Z. 448–460), Abschnitt → `\label{sec-K.k}`
  + `\section*{K.k Titel}` (Z. 888–893, `secnumdepth 0`: **LaTeX zählt nichts**), Links →
  `\hyperref[sec-…]` (Z. 320–333). Der PDF-Export ist also ein reiner „Durchreicher“ der
  Handnummern – gut für die Migration (er hat bereits eine Dokument-Gesamtschleife über
  alle Kapitel/Abschnitte in Registry-Reihenfolge, Z. 880–895).
- Konzept-Popups (`src/concepts/*.mdx`, kompiliert über **dieselbe** remark-Kette via
  `import.meta.glob`, `src/mdx/concepts-mdx.tsx` Z. 27): laut KONVENTIONEN.md Z. 80–83 dürfen sie
  keine App-internen Verweise enthalten. Bestand: **1** echter Skriptverweis
  (`condition-number.mdx:40` „Satz 4.2.6“), 2 Widget-Kommentare (`GradientWidget.tsx:8`,
  `ConditionNumberWidget.tsx:17`), Rest sind Buchverweise („MML Definition 5.1“). 0 `#sec-`-Links.
- Widget-TSX (`src/chapters/*/widgets/`, 117 Dateien): **345 Zeilen** mit Verweisen
  `Satz/Bemerkung/… K.k.n`, davon ~85 in Kommentaren, **~260 in gerenderten Strings/JSX**
  in 80 Dateien (Statustexte, Verdikte, Captions; z. B. `S81Potenz.tsx` „…aus Satz 8.1.4“,
  `S113Sehne.tsx` „(11.3.4)“). Dazu 39 Gleichungsverweise „(K.k.n)“ in TSX. Diese Strings
  sieht **kein** remark-Plugin.
- `reviews/`: 0 Verweise (nur Konzept-Audits). `KONVENTIONEN.md`: 59 Verweiszeilen
  (Lessons/Folienfehler; Doku, kein Rendering – bleiben als historische Notizen).

### 1.4 Vollständige Zählung der Verweis-Syntaxen (nur `src/chapters/**/*.mdx`)

| # | Form | Beispiel | Anzahl |
|---|---|---|---|
| A1 | Env-Label mit Beiname | `:::satz[12.5.7 (KKT-Bedingungen)]` | 665 |
| A2 | Env-Label nur Nummer | `:::bemerkung[3.2.4]` | 19 |
| A3 | Env-Label ohne Nummer | `:::bemerkung[Konvention bei breiten Matrizen]` | 1 |
| A4 | `{label=…}`-Attributform | – | 0 |
| | **Env-Labels gesamt** (satz 126, bemerkung 276, beispiel 149, definition 92, algorithmus 26, korollar 9, lemma 7) | | **685** |
| B1 | Gleichungs-Tag | `$$ {#eq-12.5.3}` | 151 (alle `K.k.n`) |
| C1 | Env-Verweis Singular | `Satz 12.5.7`, `Bemerkung 8.1.6` | 1 159 (Satz 462, Bemerkung 292, Beispiel 183, Definition 159, Korollar 29, Algorithmus 25, Lemma 9) |
| C2 | Plural/Kette | `Sätze 7.1.5 und 7.1.7`, `Beispiele 9.2.7 bis 9.2.9`, `Beispielen 9.2.8 und 9.2.9` | 6 |
| C3 | Env-Verweis als Link | `[Beispiel 10.6.7](?k=10-…#sec-10.6)` | 1 |
| C4 | davon kapitelübergreifend (Kapitel des Ziels ≠ Datei) | „Satz 3.4.7“ in Kap. 7 | 46 |
| D1 | Gleichungsverweis Standardform | `($8.3.1$)` | 424 |
| D2 | Gleichungsverweis Klartext | `(7.1.1)` | 8 |
| D3 | „Gleichung $x$“ / „Gleichung (x)“ | `Gleichung $12.5.3$` | 14 |
| D4 | `\eqref`/`\ref` in Mathe | – | 0 |
| D5 | Nummer in `\text{…}` innerhalb Mathe | 1 | 1 |
| D6 | davon in `::why[…]`-Labels | `::why[($8.4.1$) mit …]` | 62 |
| D7 | kapitelübergreifende Gleichungsverweise | – | 0 |
| E1 | Abschnittslink intern | `[Abschnitt 12.3](#sec-12.3)` | 508 |
| E2 | Abschnittslink kapitelübergreifend | `[Abschnitt 10.2](?k=10-differentialrechnung#sec-10.2)` | 299 |
| E3 | Kapitellink | `[Kapitel 7](?k=07-kq)` | 17 |
| E4 | Abschnittsnennung ohne Link | `Abschnitt 4.2` (nackt) | ~15 (+ 10 „Abschnitte“, 5 „Abschnitten“) |
| E5 | Link auf Unterabschnitt | `(#sec-K.k.n)` | 1 |
| E6 | Wörtliche `<h3 id="sec-2.1-…">` (sprechende Anker, Migrationserbe) | 18 |
| E7 | `Kapitel N` im Text | 125 (Kapitelnummern sind stabil, unkritisch) |
| E8 | `§`-Form | 142, **alle Literatur** (Heath §4.5, MML §2.6) – nicht betroffen |
| F1 | Nummerierte Unterüberschrift | `### 2.5.1 Fibonacci` → `id="sec-2.5.1"` | 50 |
| F2 | Vertiefungstitel mit Nummer | 1 |
| G1 | Widget-TSX, gerenderte Strings | „…aus Satz 8.1.4“ | ~260 Zeilen / 80 Dateien |
| G2 | Widget-TSX, Kommentare | 85 |
| G3 | Widget-TSX `(K.k.n)` | 39 |
| H1 | Konzept-MDX/TSX | 1 Prosa + 2 Kommentare |

**Konsistenzbefund:** alle 424 Gleichungsverweise haben ein passendes Tag; alle
Env-Verweise (1 159) haben ein passendes Label; 0 Nummernlücken. Eine Prüfung
„Verweisart ≠ Labelart“ (z. B. „Satz 3.4.6“, aber Label ist Beispiel; KONVENTIONEN.md
Z. 742 nennt genau so einen Fall) lieferte per Skript 0 Treffer – mit Vorbehalt, die
Migrationsphase sollte das sauber nachrechnen.

### 1.5 Was heute „automatisch“ ist – und was nicht

Automatisch: Abschnittsliste in der Sidebar (`gen-toc`), Anker `sec-K.k` (App.tsx),
Duplikatprüfung von `eq-`-Tags **pro Datei**. Nicht automatisch: alles andere. Das Orakel
(`mdx/inventory.mjs`, `npm run test:mdx`) und `verify:numbers` (`scripts/verify/run-all.mjs`)
prüfen **keine** Verweise; `verify:numbers` sind reine Rechen-Nachprüfungen (numerische
Behauptungen), das Orakel vergleicht TSX-Alt gegen MDX-Neu und trägt dabei
`env <Kind> <Label>`, `eq(<tag>) <tex>`, `h<level>#<id>` (Z. 500–508) – **genau die
Fingerabdrücke, die eine Migration konstant halten muss**.

---

## 2. SOLL-Design

### 2.1 Ziele

1. Autor schreibt **stabile IDs**, nie Nummern. Einfügen/Umsortieren ändert keine Quelle außer der einen Datei.
2. Nummern entstehen in einem **build-time Pass in Dokumentreihenfolge** (Kapitel aus Registry-Reihenfolge, Abschnitt aus Registry-Position, `K.k.n`-Zähler wie heute: ein Zähler für alle Env-Typen pro Abschnitt, ein separater für Gleichungen, ein dritter für nummerierte Unterüberschriften – die heutige Konvention bleibt 1:1, dadurch ist „vorher == nachher“ prüfbar).
3. Verweise werden **aufgelöst und verlinkt** (Bonus: EnvBlocks bekommen Anker).
4. Kaputte Verweise brechen den Build (Prinzip von remark-fmm: „lieber laut scheitern“).
5. PDF, Sidebar, Konzept-Popups und Widget-TSX nutzen **dieselbe** Nummerntabelle.

### 2.2 Autorensyntax (Vorschlag)

```mdx
:::satz[#kkt (KKT-Bedingungen)]          ← ID statt Nummer; Beiname wie bisher
:::bemerkung[#breite-matrizen]            ← ohne Beiname
:::bemerkung[(Konvention bei breiten Matrizen)]  ← unnummeriert, explizit: kein #

$$ {#eq-kkt-stationaritaet}               ← bestehende Syntax, nur ID statt Nummer
…
$$

### Die Idee der Lagrange-Multiplikatoren :id[lagrange-idee]   ← nummerierte Unterüberschrift
### Selbsttest                                                  ← unnummeriert wie bisher

Nach @satz:kkt und @eq:kkt-stationaritaet gilt … (@sec:optim-beschraenkt, @kap:optim).
Die @Sätze:[kkt, lagrange] …            ← Plural: mehrere IDs, Ausgabe „Sätze 12.5.7 und 12.5.5“
Beispiele @num:bsp-a bis @num:bsp-b     ← nur die Nummer, Wortwahl beim Autor
```

- **ID-Namensraum**: `satz:`/`definition:`/… sind **nur Anzeigeart**; der ID-Raum ist
  global (ein Env-Register). `@satz:kkt` prüft zusätzlich, dass `kkt` wirklich ein Satz
  ist (fängt die Lesson aus KONVENTIONEN.md Z. 742 ab). Kurzform `@ref:kkt` gibt „Satz“
  automatisch aus.
- **Abschnitts-IDs**: `src/chapters/<kap>/index.ts` bekommt pro Sektion ein Feld
  `key: "beschraenkt"` (statt/zusätzlich zur Nummer); Nummer = Position + 1. Kapitel-Key =
  Verzeichnisname ohne Präfix (`optim`). `@sec:optim/beschraenkt` bzw. innerhalb des Kapitels
  `@sec:beschraenkt`. Rendering: `<a href="#sec-12.5">Abschnitt 12.5</a>` bzw. mit `?k=`.
  (Die alte `id: "12.3"` bleibt übergangsweise als Alias, damit `sectionAlias()`/Deep-Links
  und `#sec-K.k`-URLs weiter funktionieren – die **Anker bleiben nummernbasiert**, weil sie
  öffentlich verlinkt sind; zusätzlich bekommt jede Sektion `id="sec-<key>"` als stabilen Zweitanker.)
- **Syntaxwahl `@typ:id`** (Pandoc/Quarto-artig) statt Direktive `:ref[…]`: kürzer, in
  Fließtext, `::why[…]`-Labels, Tabellenzellen und Listen gleichermaßen gültig, und im
  Mathe-Modus unmöglich (dort steht kein Verweis, D4 = 0). Umsetzung als Regex-Pass über
  `text`-Knoten in remark-fmm (analog zum bestehenden Text-Scan Z. 250–270). Kollisionen:
  E-Mail-Adressen/`@`-Handles gibt es im Skript nicht (grep: 0 Vorkommen von `@[a-z]+:`).
  Fallback-Escape `\@`.
- **Env-Anker**: `<EnvBlock id="env-kkt">` → `@satz:kkt` rendert `<a href="#env-kkt">Satz 12.5.7</a>`
  (cross-chapter `?k=12-optim#env-kkt`; App.tsx-Hash-Scroll Z. 48–60 funktioniert unverändert).

### 2.3 Architektur: Wo wird gezählt und wo aufgelöst?

Vite/`@mdx-js/rollup` kompiliert **jede MDX-Datei isoliert**; ein remark-Plugin sieht nie
das Gesamtdokument. Deshalb drei Optionen:

| Option | Zählen | Auflösen | HMR | Orakel/PDF | Bewertung |
|---|---|---|---|---|---|
| **A. Generierte Tabelle + Auflösung zur Compile-Zeit** (remark) | `scripts/gen-numbers.mjs` scannt alle MDX (leichtgewichtiger Regex-/remark-Parse nur auf Labels), schreibt `src/chapters/numbers.generated.json` (+ `.ts`) | remark-fmm liest die JSON, ersetzt `#kkt` → Label-String „12.5.7 (KKT…)“ und `@satz:kkt` → `<a>`-Element mit fertigem Text | Vite-Plugin `handleHotUpdate`: bei MDX-Änderung Tabelle neu rechnen; **nur wenn sich Nummern ändern** alle MDX-Module invalidieren + Full-Reload (sonst normales HMR) | Orakel sieht weiterhin `env Satz 12.5.7 (…)` und `eq(12.5.3)` → **vorher==nachher-Diff funktioniert direkt**; PDF-Exporter nutzt dieselbe Tabelle | ✔ empfohlen |
| B. Runtime-Auflösung (React Context / Registry) | wie A | MDX emittiert `<EnvBlock id="kkt">`/`<Ref to="satz:kkt"/>`, Komponente schlägt in `numbers.generated.ts` nach | nur ein Modul ändert sich → schnellstes HMR | Orakel verliert das Label (muss Tabelle selbst anziehen); PDF muss ohnehin auflösen; TSX-Widgets profitieren (Helper `num()`) | gut, aber Orakel/PDF-Anpassung teurer; Nummern erst zur Laufzeit → SSR/Text-Diff schwieriger |
| C. Reines remark-Plugin ohne Tabelle (Zähler pro Datei, Abschnittspräfix aus Dateipfad) | im Plugin | nur dateilokal | trivial | – | ✘ kann Cross-Chapter-Verweise (46 Env, 299 Abschnitt) nicht auflösen; Duplikatprüfung nur lokal |

**Empfehlung: A, mit einem kleinen Stück B für TSX-Widgets**: `numbers.generated.ts`
exportiert `num("satz:kkt")`/`ref("eq:x")`, damit Widget-Strings (`…aus ${ref("satz:potenz-konvergenz")}`)
ebenfalls zählerfest werden. Begründung: (1) das Muster existiert schon
(`gen-toc.mjs` → `toc.generated.ts`, läuft vor `dev`/`build`, Ergebnis eingecheckt), (2) das
Orakel bleibt unverändert nutzbar als Migrations-Gate, (3) der PDF-Exporter hat bereits die
Gesamtschleife und braucht nur die Tabelle statt Handnummern, (4) Compile-Zeit-Auflösung
heißt: der ausgelieferte HTML-Text enthält die Nummern → Text-Diffs möglich.

**Zählpass (`gen-numbers.mjs`)** – deterministisch, ~100–200 ms:
1. Registry lesen (Kapitelreihenfolge, `num`), je Kapitel `index.ts` (Sektionen in Reihenfolge, `key`, Dateiname).
2. Je MDX: mit `remark-parse + remark-directive + remark-math` (dieselbe Kette aus `mdx/plugins.mjs` **ohne** remark-fmm) alle `containerDirective` mit ENV-Namen (Label `#id`), `math`-Knoten mit `{#eq-id}`, Headings mit `:id[…]` in Dokumentreihenfolge sammeln. Vertiefungen (`:::vertiefung`) zählen mit, wie heute (Envs in Vertiefungen tragen Nummern, z. B. in S125).
3. Zähler vergeben; globale Duplikatprüfung; Tabelle `{ "satz:kkt": { num: "12.5.7", kind: "Satz", chapter: "12-optim", section: "12.5", anchor: "env-kkt", name: "KKT-Bedingungen" }, "eq:…": …, "sec:optim/beschraenkt": … }`.
4. Schreiben nur bei Inhaltsänderung (mtime-stabil, damit Vite nicht grundlos neu lädt).

**HMR-Detail:** `vite.config.ts` bekommt ein Mini-Plugin: `buildStart` → gen-numbers;
`handleHotUpdate(ctx)` für `*.mdx`: gen-numbers erneut; wenn JSON-Hash unverändert → normal
weiter (Textedit); sonst `server.moduleGraph.invalidateAll()` + `ws.send({type:"full-reload"})`.
Die remark-Auflösung liest die JSON **synchron pro Datei** (`readFileSync`, gecacht per mtime),
damit der `remarkChain(root)`-Vertrag (4 Konsumenten: vite, inventory, typecheck, fixtures) gleich bleibt.
Unbekannte ID → `file.fail(...)` mit Regel `remark-fmm:unknown-ref` (rot im Dev-Overlay, Build bricht).

### 2.4 Auswirkungen je Komponente

| Komponente | Änderung |
|---|---|
| `mdx/remark-fmm.mjs` | `takeLabel()`: `#id`-Form erkennen, Nummer aus Tabelle einsetzen, `id`-Attribut an EnvBlock; Gleichungen: `{#eq-<id>}` beliebige IDs, Tag aus Tabelle, Duplikatprüfung global; Headings: `:id[…]`-Direktive; neuer Pass „@-Verweise“ über Textknoten (auch in `::why`-Labels: dort läuft `jsxAll()` über dieselben Knoten – Verweis wird zu `<a>`-Knoten, `WHY_OK` um `link` ist schon erlaubt) |
| `src/lib/Math.tsx` | `EnvBlock` bekommt optionales `id`; `Eq` optional `id` (Anker `eq-<id>`) |
| `src/chapters/*/index.ts` | `key:` je Sektion; `gen-toc.mjs` liest zusätzlich `key`, Nummer aus Position (Regex Z. 34 erweitern) |
| `scripts/gen-numbers.mjs` (neu) + `numbers.generated.{json,ts}` | s. o.; in `package.json` vor `dev`/`build` wie `gen:toc` |
| `scripts/pdf/mdx-to-latex.mjs` | Label/Tag/Heading aus Tabelle (Z. 436–441, 448–460, 555–561); `@`-Verweise → `\hyperref[env-kkt]{Satz 12.5.7}`; EnvBlock bekommt `\phantomsection\label{env-kkt}` in `fmmenv` (preamble.tex Z. 162). Alternativ LaTeX selbst zählen lassen – **nicht** empfohlen: `secnumdepth 0` + Starred Sections müssten umgebaut werden, und Web/PDF könnten divergieren |
| `mdx/inventory.mjs` | unverändert (Label-String kommt fertig an); optional: `env`-Fingerprint um `id` ergänzen |
| `src/concepts/*.mdx` | dürfen `@satz:…` nutzen (dieselbe remark-Kette); Rendering cross-chapter mit `?k=` |
| Widget-TSX | `import { ref } from "../../numbers.generated"` in ~80 Dateien; rein mechanisch |
| Sidebar/App | keine Pflichtänderung (Nummern-Anker bleiben); optional Anker `sec-<key>` |
| Tests `mdx/fixtures.test.mjs` | 5 Env- + 2 Eq-Fixtures anpassen; neue Fixtures: unbekannte ID, doppelte ID, Artmismatch, `@`-Escape |

---

## 3. Migration

### 3.1 Skript-Skizze `scripts/migrate-numbers.mjs` (einmalig, read-then-write-once)

```
1. Bestand parsen (remark-Kette ohne remark-fmm) → Tabelle ALT:
     "12.5.7" (env)  → {kind:"satz", name:"KKT-Bedingungen", file, line}
     "12.5.3" (eq)   → {file, line}
     "2.5.1"  (h3)   → {title}
     "12.5"   (sec)  → {key aus index.ts-Titel}
2. IDs ableiten (deterministisch, review-fähig als CSV):
     Env mit Beiname  → slug(Beiname) [kkt-bedingungen]; Kollision → Kapitel-/Abschnittspräfix
     Env ohne Beiname → <kind>-<K>-<k>-<n>  (z. B. bemerkung-3-2-4) — Autor kann später umbenennen
     Gleichung        → eq-<K>-<k>-<n>, außer ein Verweis-Kontext liefert ein Wort (manuell nachbessern)
     Unterüberschrift → slug(Titel)
     Sektion          → slug(Titel) gekürzt (Vorschlagsliste zur Freigabe)
   ⇒ CSV "alt-nummer,typ,id,datei" ins Repo (Nachschlagen für Autor + KONVENTIONEN)
3. Umschreiben (pro Datei alle Ersetzungen sammeln, assert alle Treffer, dann EIN Write):
     :::satz[12.5.7 (Name)]        → :::satz[#kkt-bedingungen (Name)]
     $$ {#eq-12.5.3}               → $$ {#eq-<id>}
     ### 2.5.1 Titel               → ### Titel :id[<id>]
     (Satz|Bemerkung|…) K.k.n      → @satz:<id>   (Art gegen Tabelle prüfen → Mismatch-Liste!)
     Sätze/Beispiele/… a und b     → Sätze @num:a und @num:b   (6 Fälle, Handarbeit ok)
     ($K.k.n$) | (K.k.n) | Gleichung $K.k.n$ → @eq:<id> | @eq:<id> | Gleichung @eq:<id>
     [Abschnitt K.k](#sec-K.k) / (?k=…#sec-K.k) → @sec:<kap>/<key>
     [Kapitel N](?k=…)             → @kap:<kap>
     nackte "Abschnitt K.k"        → @sec:… (15 Fälle; Report, dann Hand)
     <h3 id="sec-2.1-…">           → bleiben (Sonderanker, 18 Stück) oder → ### … :id[…]
   Widget-TSX: Strings mit "Satz K.k.n" → `${ref("satz:<id>")}` bzw. JSX {ref(...)};
     Kommentare unverändert. Konzept: condition-number.mdx 1 Stelle.
4. Nicht anfassen: KONVENTIONEN.md, FOLIENFEHLER.md, reviews/ (historische Notizen),
   `sectionAlias()`, `toc.generated.ts` (wird regeneriert).
```

### 3.2 Verifikation „gerenderte Nummer vorher == nachher“

Drei unabhängige, mechanische Gates (alle ohne Browser):

1. **Orakel-Diff (stärkstes, schon vorhanden):** `inventoryFromMdx()` (`mdx/inventory.mjs`)
   über alle 72 Dateien **vor** der Migration mit dem alten remark-fmm, **nach** der Migration mit
   dem neuen; die Fingerabdrücke `env <Kind> <Label>`, `eq(<tag>)`, `h3#sec-…` und die Prosa
   müssen bis auf die neuen `<a>`-Elemente um Verweise identisch sein (`diffInventories`).
   Die Link-Umhüllung ist vorhersehbar (Prosa „Satz 12.5.7“ → `link #env-kkt „Satz 12.5.7“`),
   Diff-Regeln dafür im Vergleichsskript whitelisten.
2. **LaTeX-Quelltext-Diff:** `node scripts/pdf/mdx-to-latex.mjs --out <dir>` vorher/nachher;
   `diff` nach Normalisierung von `\label{…}`/`\hyperref[…]` muss leer sein. Deterministisch,
   kein PDF-Build nötig, erfasst **alle** Nummern inkl. Cross-Chapter.
3. **HTML-Text-Diff:** `vite build` vorher/nachher, dann pro Kapitel-Chunk die JSX-Strings
   extrahieren (oder Headless-Chrome `innerText` der 13 Kapitelseiten) → `diff`; zusätzlich
   `grep -o 'Satz [0-9.]*' | sort | uniq -c` als Grobzählung.
4. **Widget-Strings:** Snapshot-Test: alle `ref()`-Aufrufe evaluieren und gegen die CSV aus 3.1 prüfen.

### 3.3 Inkrementelle Reihenfolge

1. Tabelle + Zählpass + Env-Labels mit `#id` (**Nummern werden generiert, Verweise bleiben Text**) → Orakel-Diff leer.
2. `@satz:`-Verweise + Env-Anker (1 165 Stellen) → Diff „Prosa → Link“ whitelisten.
3. Gleichungen (`#eq-id`, `@eq:`; 151 Tags, 446 Verweise, davon 62 in why-Labels).
4. Abschnitts-Keys + `@sec:`/`@kap:` (824 Links).
5. Unterüberschriften (50) + sprechende h3-Anker (18).
6. Widget-TSX (`ref()`), Konzepte.
7. Doku (KONVENTIONEN.md-Regelblock, STYLE.md), Skill `interactive-textbook` nachziehen.

Jede Stufe ist für sich buildbar und verifizierbar; Stufe 1 bringt schon den Hauptnutzen
(Einfügen verschiebt keine Labels mehr; Verweise bleiben aber noch bis Stufe 2 fragil).

---

## 4. Aufwand & Risiko

### 4.1 Schätzung (Agenten-Stunden, inkl. Tests + Council-Review)

| AP | Inhalt | Aufwand |
|---|---|---|
| AP1 | `gen-numbers.mjs`, `numbers.generated.*`, Vite-HMR-Plugin, package.json | 3–4 h |
| AP2 | remark-fmm: `#id`-Labels, `{#eq-id}`, `:id[…]`, `@typ:id`-Pass, Fehlerregeln, Fixtures | 4–6 h |
| AP3 | Math.tsx (`id`-Anker), Sektions-`key` in 13 `index.ts` + gen-toc | 1–2 h |
| AP4 | PDF-Exporter auf Tabelle + `\hyperref` für Env-Verweise, preamble | 2–3 h |
| AP5 | Migrationsskript + ID-Vorschlags-CSV + Mismatch-Report | 4–5 h |
| AP6 | Migrationslauf MDX (Stufen 1–5) mit den drei Gates, Nacharbeit der ~30 Handfälle (Plural, nackte Abschnitte, why-Labels mit Sonderfällen) | 4–6 h |
| AP7 | Widget-TSX (80 Dateien, ~260 Strings) + Konzepte | 3–4 h (mechanisch, aber jede Datei typecheck) |
| AP8 | ID-Benennung durch Autor (Slug-Vorschläge sichten, „bemerkung-3-2-4“ → sprechend) | 2–4 h Dozentenzeit, optional/jederzeit später |
| AP9 | Doku (KONVENTIONEN/STYLE/Skill), Council-Reviews R1/R2 | 2–3 h |
| **Summe** | | **≈ 25–37 Agenten-h** (+ 2–4 h Autor) |

### 4.2 Fallen (konkret)

1. **Widget-TSX-Strings** (~260 gerenderte Stellen in 80 Dateien, dazu 39 „(K.k.n)“): kein
   Parser sieht sie. Ohne AP7 zeigen Widgets nach der ersten Einfügung falsche Nummern –
   **stiller** Fehler. Gegenmittel: `ref()`-Helper + ein Lint (`grep -E '(Satz|…) [0-9]+\.[0-9]+\.[0-9]+' src/chapters --include=*.tsx` muss 0 gerenderte Treffer liefern; Kommentare per Vorzeichen `//` ausnehmen) als Teil von `npm run build`.
2. **Konzept-MDX in Tooltips**: verweist cross-chapter; heute 1 Stelle, aber die Regel
   „keine App-Verweise“ (KONVENTIONEN.md Z. 80) wird mit `@satz:` obsolet und muss neu formuliert werden (Link in dunklem Fenster + `?k=` Vollseitenwechsel = Tooltip schließt).
3. **Env-Labels ohne Mathe-Erlaubnis** (`takeLabel()` Z. 221–238): `#id (Name)` bleibt reiner
   Text – gut; aber ein Beiname darf weiterhin kein `$…$` enthalten. Migration ändert daran nichts.
4. **`::why[…]`-Labels**: 62 Gleichungsverweise dort; `jsxAll()` erzeugt aus dem
   Verweis-`link`-Knoten `<a href>` (WHY_OK erlaubt `link`, Z. 118). Das Orakel-Signal
   `PStep(why=…)` ändert sich damit für 62 Schritte → whitelisten (bekanntes Muster, Lesson 4.3).
5. **Dreifach belegte Nummern** (150 Nummern sind Env **und** Gleichung; einige auch h3):
   Migrationsskript muss die Verweisart aus dem Kontext nehmen („Satz“ vs. „( )“ vs. „Abschnitt“) – bei `(7.1.1)`-Klartext (8 Fälle) und „Gleichung $x$“ (14) Handkontrolle.
6. **Generierte Dateien**: `toc.generated.ts` ist eingecheckt; `numbers.generated.*` ebenso
   einchecken (blankes `vite build` muss laufen), aber parallel arbeitende Agenten dürfen sie
   **nicht** von Hand editieren (Lesson: Registry-Konflikte). Auto-Discovery macht das unnötig.
7. **HMR-Falle**: Ein Zähler-shift invalidiert **alle** Kapitelmodule → Full-Reload; Dev-Zustand
   (geöffnete Vertiefungen, Slider) geht verloren. Akzeptabel, aber dokumentieren; `mtime`-stabile Tabelle verhindert Reload-Schleifen.
8. **Vier Konsumenten der remark-Kette** (`vite.config.ts`, `inventory.mjs`, `typecheck.mjs`,
   `fixtures.test.mjs`): alle laufen über `remarkChain(root)`; die Tabelle muss aus `root`
   auffindbar sein, sonst kompiliert `typecheck:mdx` mit leerer Tabelle und meldet 1 000 unbekannte IDs.
9. **Öffentliche Deep-Links** `?k=…#sec-K.k`: Nummernanker müssen bleiben (Slides/Landing
   verlinken darauf); daher Anker doppelt (`sec-12.5` und `sec-beschraenkt`), niemals ersetzen.
10. **ID-Slugs aus Beinamen** kollidieren (z. B. „Zusammenfassung“, „Beispiel“ mehrfach):
    Skript muss Präfixe vergeben; 19 nummer-only-Labels + 151 Gleichungen bekommen
    Auto-IDs, die erst durch AP8 sprechend werden – das ist **kein** Blocker, nur Kosmetik.
11. **Batch-Edit-Disziplin** (CLAUDE.md): assert-all-then-write-once pro Datei, nach jedem
    Lauf `git diff --stat` und die drei Gates; parallele Agenten editieren gerade `src/concepts` –
    Stufe 6 (Konzepte) erst danach.
12. **`sectionAlias()`/`chapterAliases`** (index.ts Z. 128–155) rechnen mit numerischen
    Sektions-IDs; beim Einführen von `key` nicht anfassen, sie bedienen alte URLs.

### 4.3 Größtes Risiko

Nicht die MDX-Prosa (die drei Gates machen sie praktisch risikolos), sondern die **~300
Nummern in Widget-TSX-Strings** und in `::why`-Labels: sie sind vom Parser unsichtbar, werden
in Statusmeldungen dynamisch zusammengesetzt (Template-Strings, Ternaries) und geben nach der
ersten echten Einfügung still falsche Verweise aus. Deshalb AP7 + Build-Lint als Pflicht, nicht als Kür.
