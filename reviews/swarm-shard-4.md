bisection — KEEP — Der statische Tooltip is self-contained and gives the assumptions, update rule, rate, and a checked square-root example without needing an interactive graphic.

condition-number — REVISE — The geometric explanation and direct manipulation are useful, but one prerequisite link is mis-targeted and the high-condition-number verdict overstates degeneration.
- [MINOR] skript/src/concepts/condition-number.mdx:7-9 — The text calls the object a matrix norm but links `#euclidean-norm`, the vector norm concept; link to `#matrix-norm` (or explicitly say which induced matrix norm is meant).
- [MINOR] skript/src/concepts/widgets/ConditionNumberWidget.tsx:119-123 — For every reachable ε > 0 the matrix is nonsingular and the ellipse is not actually “entartet”; describe it as very thin/needle-like, reserving degeneration for ε = 0 (which the control does not reach).

differentiability — KEEP — The C⁰/C¹/C² ladder, the |x| and x|x| counterexamples, and the selectable derivative plots form a coherent self-contained explanation.

fixed-point-iteration — REVISE — The definition and paired reformulations are excellent, but the global wording of the unstable case is mathematically false.
- [MAJOR] skript/src/concepts/fixed-point-iteration.mdx:18-22 — “Für |g'(x*)| > 1 läuft sie ... weg, egal wie gut der Startwert ist” is false for the exact fixed-point start x₀ = x* and overstates a local repulsion result; say that sufficiently nearby non-fixed starts are repelled, while exceptional/global basins require separate analysis.

gram-schmidt — REVISE — The projection calculation and draggable shadow are effective, but the result is described as a basis without specifying the spanned subspace.
- [MINOR] skript/src/concepts/gram-schmidt.mdx:23-28 — “wird ... eine Orthonormalbasis” should say “Orthonormalbasis des von den Ausgangsvektoren aufgespannten Raums”; otherwise a linearly independent subset of a larger space is incorrectly presented as a basis of the ambient space.

kernel — KEEP — The kernel is defined algebraically and geometrically, and the widget lets readers rotate and scale an input until its output vanishes while explaining the whole null line.

linear-regression — REVISE — The line-family definition and residual visualization are sound, but the widget’s dataset and numerical target appear without preparation.
- [MAJOR] skript/src/concepts/linear-regression.mdx:17-31 — The prose introduces a generic sum of squared vertical distances but never gives the five data points or explains why the widget asks for SSE < 0,25; add the displayed dataset and identify the threshold as an arbitrary exploration target before the widget.
- [MINOR] skript/src/concepts/widgets/LinearRegressionWidget.tsx:43-52 — The controls rename θ₁/θ₀ to `a`/`b` and label the intercept “Abschnitt b”, while the surrounding prose uses θ₀/θ₁; use consistent symbols (and “Achsenabschnitt”) in the controls.

matrix-norm — KEEP — The induced-norm definition, compatibility inequalities, and draggable singular direction align well; the visual maximum is genuinely worth interacting with.

newtons-second-law — KEEP — This is an appropriately static prerequisite tooltip: it defines F = ma, gives units and a numerical example, and states the intended linearity insight.

orthogonality — KEEP — The dot-product criterion, Pythagoras example, and angle-controlled square comparison are mutually reinforcing and technically consistent.

power-series — REVISE — The definition and cosine example are correct, but the current plotting window makes the low-order state largely clipped and obscures the claimed approximation interval.
- [MAJOR] skript/src/concepts/widgets/PowerSeriesWidget.tsx:26-35 — Plotting x ∈ [−7,7] with a fixed y-domain [−2.5, 2.5] clips the low-order Taylor polynomials severely (for n = 1, T₁(±7) = −23,5) and can make the starting visualization unreadable; narrow/adapt the domain or choose a scale/window where every selectable order remains interpretable.
- [MINOR] skript/src/concepts/power-series.mdx:15-18 — “Schneiden wir ... ab, bleibt ... ein gewöhnliches Polynom übrig” is correct, but the widget labels `n` as “Terme bis k” and the prose never says that n counts the highest even index; clarify the control’s indexing before the plot.

reflection — KEEP — Definition, matrix formula, fixed/negated eigendirections, and the twice-applied toggle make the invariants directly testable.

sine-cosine — KEEP — The unit-circle interpretation, periodicity, derivative cycle, and moving tangent provide a complete and consistent mini-explanation.

summation-notation — KEEP — Sigma, bounds, dummy-index renaming, and a valid index-shift example are explained sufficiently without a widget.

triangle-inequality — KEEP — Both ordinary and reverse inequalities are derived, equality cases are stated, and varying the angle genuinely explores the two bounds.
