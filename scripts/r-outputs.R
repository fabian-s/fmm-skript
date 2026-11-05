# Fuehrt die ```r-Bloecke der Kapitel aus und schreibt ihre Ausgabe als #>-Zeilen
# direkt hinter den erzeugenden Ausdruck. Die Bloecke einer MDX-Datei teilen sich
# eine Umgebung; alles, was nicht mit "#>" beginnt, bleibt unveraendert.
#
#   OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 Rscript scripts/r-outputs.R         # alle
#   ... Rscript scripts/r-outputs.R S52 S126   # nur Dateien, deren Pfad passt
#   ... Rscript scripts/r-outputs.R check      # nichts schreiben, Abweichungen melden
#
# S82 laedt ein Foto von Wikimedia (bricht bei HTTP 429 mit Fehler ab), misst
# Rechenzeiten und nutzt svdr ohne Seed: `check` meldet dort immer eine Abweichung,
# und ein neuer Lauf aendert die Werte. Im Zweifel die Dateien einzeln nennen.

args <- commandArgs(trailingOnly = TRUE)
check_only <- "check" %in% args
patterns <- setdiff(args, "check")

# digits = 3: knappe Ausgaben, explizit gesetzt, damit das Ergebnis nicht von einer
# ~/.Rprofile abhaengt. Braucht ein Ausdruck mehr Stellen, schreibt er das selbst
# (print(x, digits = 7)). width: schmal genug fuer den Codekasten im PDF (dazu "#> ").
options(digits = 3, scipen = 0, width = 70)

# Bloecke, die auf Daten aus dem Fliesstext oder aus einem frueheren Abschnitt
# aufbauen. Das Setup laeuft unsichtbar und erscheint nicht im Skript.
setup <- list(
  S134 = "f <- function(x) sin(2 * pi * x); x <- seq(0, 1, length = 10)",
  S137 = "set.seed(1); x <- sort(c(0, 2 * pi, runif(48, 0, 2 * pi)))
          y <- sin(x) + sin(2 * x) / 2 + rnorm(50, sd = 0.3)"
)

# Abbildungen, die ein Block erzeugt (ggplot2::last_plot() nach dem Lauf der Datei);
# die MDX-Datei bindet sie als <figure> ein.
plots <- list(S133 = "interpolation-monombasis.png")

as_output_lines <- function(chunk) {
  if (inherits(chunk, "error"))
    stop("R-Fehler: ", conditionMessage(chunk), call. = FALSE)
  text <- if (is.character(chunk)) {
    chunk
  } else if (inherits(chunk, "warning")) {
    paste("Warning:", conditionMessage(chunk))
  } else if (inherits(chunk, "message")) {
    conditionMessage(chunk)
  } else {
    return(character()) # Grafiken: im Text nicht darstellbar
  }
  lines <- strsplit(
    sub("\n$", "", paste(text, collapse = "")),
    "\n",
    fixed = TRUE
  )[[1]]
  trimws(paste("#>", lines), which = "right")
}

run_block <- function(code, env) {
  exprs <- parse(text = code, keep.source = TRUE)
  ends <- vapply(attr(exprs, "srcref"), function(s) s[3], integer(1))
  outputs <- rep(list(character()), length(code))
  for (i in seq_along(exprs)) {
    text <- as.character(attr(exprs, "srcref")[[i]])
    chunks <- evaluate::evaluate(paste(text, collapse = "\n"), envir = env)
    chunks <- Filter(function(ch) !inherits(ch, "source"), chunks)
    printed <- as.character(unlist(lapply(chunks, as_output_lines)))
    outputs[[ends[i]]] <- c(outputs[[ends[i]]], printed)
  }
  unlist(Map(c, as.list(code), outputs), use.names = FALSE)
}

process_file <- function(path) {
  lines <- readLines(path, encoding = "UTF-8", warn = FALSE)
  opening <- which(lines == "```r")
  if (length(opening) == 0) {
    return(invisible(FALSE))
  }
  env <- new.env(parent = globalenv())
  key <- sub("\\.mdx$", "", basename(path))
  if (!is.null(setup[[key]])) eval(parse(text = setup[[key]]), env)

  result <- character()
  position <- 1L
  for (start in opening) {
    fences <- which(lines == "```")
    end <- fences[fences > start][1]
    code <- lines[(start + 1):(end - 1)]
    code <- code[!startsWith(code, "#>")]
    message(sprintf("  %s:%d", path, start))
    result <- c(result, lines[position:start], run_block(code, env))
    position <- end
  }
  result <- c(result, lines[position:length(lines)])

  if (!is.null(plots[[key]]) && !check_only) {
    ggplot2::ggsave(
      file.path(dirname(path), plots[[key]]),
      width = 6,
      height = 3,
      dpi = 200
    )
  }

  plot_missing <- !is.null(plots[[key]]) &&
    !file.exists(file.path(dirname(path), plots[[key]]))
  changed <- !identical(result, lines) || plot_missing
  if (changed && !check_only) writeLines(result, path, useBytes = TRUE)
  if (changed)
    message(if (check_only) "ABWEICHUNG: " else "geschrieben: ", path)
  invisible(changed)
}

files <- sort(list.files(
  "src/chapters",
  "\\.mdx$",
  recursive = TRUE,
  full.names = TRUE
))
if (length(patterns) > 0) {
  files <- files[Reduce(`|`, lapply(patterns, grepl, x = files, fixed = TRUE))]
}
if (length(files) == 0)
  stop(
    "Keine passende MDX-Datei gefunden (Aufruf aus dem Repo-Wurzelverzeichnis?)"
  )
changed <- vapply(files, process_file, logical(1))
if (check_only && any(changed)) quit(status = 1)
