# Procedure for long, multi-file documents

Use this when the document is a book, lecture script, thesis, or a directory of
tooltip/concept texts: more than ~20k words, or more than a handful of files, or
anything with a build that must keep passing. The one-paragraph modes in `SKILL.md`
(detect / rewrite / iterate) still apply per file; this reference is about pacing,
safety, and not losing work. Calibrated on a 230k-word, 74-file MDX script plus 135
tooltip files, edited over one long session.

## 1. Read the house style first, once

Look for `STYLE.md`, `CONVENTIONS.md`, `KONVENTIONEN.md`, a `CLAUDE.md`, or a
contributing guide. It usually fixes register (wir-Form vs. Sie), dash budget, how
numbering and cross-references work (`@satz:…`, `@eq:…`, `{#anchors}`), and which
checks must pass. These rules outrank the generic lists in this skill.

## 2. Triage with grep before reading

Build a regex from the relevant list (`vocabulary.md`, `structural-tells.md`,
`german-tells.md`) and run it over every file:

```
grep -n -E '<pattern>' path/**/*.md   # count first, then list with -C1 for context
```

- Count hits per file to see where the density is.
- For short texts (tooltips, abstracts, README sections) the grep output plus one
  line of context is often enough to edit without reading the whole file.
- For long chapters, still read the whole file: the worst tells (uniform paragraph
  shape, drumroll structure, a lead-in before every widget) do not grep.

## 3. Read in chunks, edit surgically

- Read a file in ranges (`sed -n '1,330p'`) sized to a few tens of KB; do not dump
  several long files in one call.
- Never rewrite a file wholesale. Apply exact string replacements with a
  uniqueness check so a typo in the pattern cannot silently edit the wrong place:

```python
def sub(path, pairs):
    s = open(path, encoding="utf-8").read()
    for old, new in pairs:
        assert s.count(old) == 1, (path, old[:70])
        s = s.replace(old, new)
    open(path, "w", encoding="utf-8").write(s)
```

  Batch all edits for one file into one call; if any assertion fails nothing is
  written, so fix the pattern and rerun the whole batch. Backslashes in math must be
  doubled inside Python strings. Match across the actual line breaks of the source.
- Use absolute paths. A `cd` that persists (or fails) between calls has silently
  produced zero edits before; confirm with `git status` after each file batch.
- Do not touch: anchors and ids, `@ref` keys, equations, numbers, code fences,
  imports/exports, JSX props, quoted material. Renaming a *title* is fine; renaming
  the `#id` in front of it is not.

## 4. Verify after every unit, commit after every unit

- Run the project's checks (lint, typecheck, tests, number/reference generators)
  after each chapter or directory, not at the end. A typecheck once rejected math in
  a directive label; catching it per chapter costs seconds, at the end it costs a
  bisection.
- Note the pre-existing baseline of warnings before you start so you can tell your
  regressions from old ones.
- One commit per chapter/directory with a plain message („Kap. 7: Deslop-Durchgang"
  plus a one-line body naming the pattern classes removed). Push at least every few
  commits, and immediately when the user mentions rate limits or when a session is
  long; an unpushed local commit is lost with the container.
- If interrupted mid-chapter, commit the partial state as „(Teil 1)" rather than
  holding it.

## 5. Keep a running tic list per document

Every document has its own favourite phrases beyond the generic lists („Buchführung",
„Kleingedrucktes", „Landkarte", a pet widget lead-in). Add them to your grep after the
first two chapters and re-run over the chapters already done before declaring the pass
finished.

## 6. Report

Say what pattern classes were removed, which files got no line-by-line read (grep-only
edits), and any judgement calls that changed meaning even slightly (a claim you
weakened, a title you renamed, a sentence you cut for contradicting another section).
Those are the places the author should look.
