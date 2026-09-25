# German-language tells (Claudismen)

The English word lists in `vocabulary.md` do not transfer to German prose. This list is
calibrated on a full pass over a ~230k-word German statistics/numerics lecture script
plus its concept tooltips (September 2026). Same rule as always: cross-check every hit
against the firewall in `SKILL.md` §Step 0, judge by sense, and flag clustering, not
lone instances. Wir-Form is the register; „Sie"/„ich" only if the document uses them.

## Grep-first regex

Run this over the whole document before reading; it finds most hits at once:

```
 – |—|[Gg]enau (das|deshalb|dies|hier|so)|nicht nur|sondern auch|Erstens|Zweitens|Drittens|Wichtig:|Schauen wir|kein Zufall|Arbeitspferd|Notnagel|Kniff|dramatisch|verblüffend|erstaunlich|bemerkenswert|schlicht|bloß|Pointe|Herz|Zoo|zappel|brav|zahm|Ärgernis|Fußangel|harmlos|schön|hübsch|bequem|Preis|bezahl|Geschenk|geschenkt|Zierrat|Förmelei|Spitzfindigkeit|Haken|ehrlich|Kleingedruckt|Eintrittskarte|Gütesiegel|Landkarte|Werkzeugkasten|Superkraft
```

Expect false positives („Preis" as a price, „Herz" in an anatomy text, „schön" in a
quote); the regex is a triage tool, not an edit list.

## Emphasis and pointing tics

| Tell | Fix |
|---|---|
| „genau das / genau deshalb / genau diese(r,s) / genau hier / genau so" | drop „genau"; if the sentence loses nothing, it was filler |
| „nicht nur X, sondern auch Y" | „X und Y" or state Y alone; keep only for a genuine contrast |
| „das ist kein Zufall" / „nicht zufällig" | say the reason instead („Das ist die Matrixfassung von …") |
| „Wichtig:", „Vorsicht:" as openers | delete the flag, keep the fact; „Zu beachten ist" is acceptable once |
| „Erstens … Zweitens … Drittens" drumrolls | plain sequence, „Außerdem", or italic lead-ins („*Die Richtung.* … *Die Länge.* …") |
| „Zweierlei/Dreierlei ist zu sehen. Erstens …" | „Zwei Beobachtungen." then the sentences |
| „in einem Satz gesagt", „die kürzeste Fassung", „lässt sich in einer Zeile sagen" | delete the frame |
| „ein für alle Mal", „auf einen Schlag", „ohne Umweg", „in Reinform" | delete |
| „wortwörtlich / wörtlich" used as an intensifier | delete unless something is literally quoted |

## Vorgeplänkel (throat-clearing before the content)

„Schauen wir uns das genauer an", „Sehen wir zu", „Probieren wir es aus", „Rechnen wir
nach", „Fangen wir dort an, wo …", „Halten wir fest, worauf das hinausläuft", „Bevor wir
…, sollten wir wissen, wonach wir suchen", „Damit lässt sich die Frage präzise stellen"
→ start with the content. Exception: teaching material may keep one short lead-in per
widget or example; cut the second one.

Widget lead-outs: „Wie das Widget zeigt, …", „Die Vorhersage trifft:", „Das Widget führt
genau das vor" → state the observation directly.

## Metaphors and personification

Replace with the plain term; the metaphor carries no information a student needs.

| Metaphor | Plain |
|---|---|
| Arbeitspferd | Standardverfahren, wichtigstes Werkzeug |
| Notnagel | Rückfalloption |
| Werkzeugkasten, Baukasten | Verfahren, Bausteine |
| Landkarte (of a field) | Übersicht |
| Eintrittskarte, Preisschild, Gütesiegel, Kleingedrucktes | Voraussetzung, Kosten, Garantie, Vorbehalte |
| Canyon, Tal (for ill-conditioned level sets) | schmales Tal / Zickzack |
| Zoo (of methods) | Familie, Sammlung |
| Superkraft | Eigenschaft |
| Zierrat, Förmelei, Spitzfindigkeit, Haarspalten | verbindlich, hat Folgen, wesentlich |
| Haken, Fußangel, Falle | Einschränkung, Fehlerquelle |
| geschenkt, gratis, kostet nichts | ohne Rechnung, folgt direkt, automatisch |
| bezahlt wird mit, der Preis dafür | die Kosten sind, dafür |

Personified verbs for algorithms and numbers: „kriecht", „zappelt", „läuft davon",
„flieht aus dem Bild", „schaukelt sich voran", „rutscht", „kippt", „stürzt ab",
„explodiert" → kommt kaum voran, schwankt, divergiert, wächst, fällt steil. Keep the
domain verbs that are standard („konvergiert", „oszilliert", „überschießt").

## Evaluative adjectives and adverbs

„dramatisch", „spektakulär", „katastrophal" (except *katastrophale Auslöschung*, a
term), „verblüffend", „erstaunlich", „bemerkenswert(erweise)", „elegant", „hübsch",
„schön(ste)", „sauber", „harmlos", „unangenehm", „ernüchternd", „gutartig", „zahm",
„brav", „lehrreich", „sprechend", „bequem(ste)", „billig" (as praise), „schlicht",
„bloß", „eben", „ja" (modal particle in written prose), „ehrlicherweise", „ganze"
(„ganze $5000$") → delete, or replace with the measurable fact („sehr schnell",
„um zwölf Zehnerpotenzen"). „schlicht/bloß" → „nur" or nothing.

## Dashes

German prose uses „ – " (spaced en dash) never „—". Budget: at most one per ~300 words,
zero inside a single paragraph if two would land there. Paired dashes for parentheticals
→ commas or round brackets; a dash before an explanation → colon or semicolon; a dash
before a consequence → new sentence. Table cells with a lone „–" as a placeholder are
not prose; leave them.

## Titles and labels

- Section, widget, remark, and example titles carry the same tics in concentrated form
  („… zum Anfassen", „… live", „… zum Schieben", „Der Kegel zum Anfassen", „Finito",
  „Falsche Konvergenz, und keiner warnt", „Warum X voll davon ist"). Rename to the topic.
- In MDX/Markdown directive labels (`:::bemerkung[#id (Title)]`, `:::interaktiv[Title]`)
  the label is plain text: no `$math$`, no markup. A build typecheck will reject it.
- Never rename an `#anchor-id`; only the human-readable title after it.

## Quiz and self-test prose

„Beides ist zu viel versprochen", „So formuliert verspricht die Aussage zu viel", „Muss
es nicht", „Genau andersherum", „und alles ist in Ordnung", „das ist die Pointe von …"
→ „Beides gilt nicht", „Umgekehrt", „Das ist nicht nötig", drop the tail. Intro lines
like „Fünf Aussagen zu diesem Abschnitt. Welche davon stimmen?" before a quiz block are
redundant with the quiz UI; delete.

## What to keep in German teaching prose

- Wir-Form, rhetorical questions that a widget then answers, one didactic lead-in per
  example.
- Precise domain words that look evaluative: „gutartig" as a property of a matrix
  pencil, „konsistent", „effizient", „robust", „signifikant", „stabil", „hinreichend
  glatt".
- Numbers, „$0{,}5$"-style decimal commas, @refs, `:k[...]{#id}` concept links, code
  fences, R identifiers.
