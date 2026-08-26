chain-rule — KEEP — The scalar rule, inner-point evaluation, Jacobian form, and sine-of-square example provide a compact self-contained explanation.

convexity — KEEP — The formal chord inequality, strict case, least-squares context, counterexample, and exploratory chord widget form a coherent mini-explanation.

domain-codomain — REVISE — Domain, codomain, image, and the x² example are clearly distinguished, but the only exploration mechanism is hover-dependent.
- [MINOR] skript/src/concepts/widgets/DomainCodomainWidget.tsx:99-104 — Input nodes expose only `onPointerEnter`/`onPointerLeave` and have no focusable or keyboard path, so the core arrow-tracing action is inaccessible without pointer hover; add focus/keyboard handling (or native selectable controls) and an explicit focus state.

function — KEEP — The definition, notation, x² example, and one-input/one-output widget are sufficient and consistent.

hyperplane — KEEP — The progression from line to plane to n-dimensional hyperplane is clear, and the zero-coefficient/degenerate case is explicitly handled by the widget.

limit — KEEP — The missing-value-versus-nearby-behaviour distinction and two-sided difference-quotient example are correct and well supported by the slider.

logarithm — KEEP — Inverse exponentiation, base change, domain restriction, slow growth, and the shared-zero-point plot are self-contained and consistent.

matrix — KEEP — The static definition gives dimensions, entry indexing, a concrete matrix, and the coefficient/vector interpretation without requiring interaction.

null-space — KEEP — The algebraic definition, subspace/rank relation, orthogonal-complement connection, and matrix example align with the direction-finding widget.

overfitting — REVISE — The central bias–variance explanation is useful, but the variance-rate claim is presented too generally for a short prerequisite tooltip.
- [MINOR] skript/src/concepts/overfitting.mdx:16-19 — “Die Varianz eines Basisschätzers wächst wie O(K/n)” depends on the basis, design, estimator, and sampling assumptions; either state those conditions or label it explicitly as a heuristic for a particular regularized basis model.

qr-factorization — REVISE — The Gram–Schmidt intuition and numerical-stability motivation are valuable, but the dimensions and meaning of “orthogonal Q” are ambiguous for the rectangular case.
- [MAJOR] skript/src/concepts/qr-factorization.mdx:7-13 — Calling Q an “orthogonale Matrix” without specifying square/full QR versus a rectangular Q with orthonormal columns makes A = QR ill-defined for the later m × n setting; state the dimensions (e.g. thin QR: Q ∈ R^{m×n}, QᵀQ = I, R ∈ R^{n×n}) or explicitly use full QR throughout.
- [MINOR] skript/src/concepts/qr-factorization.mdx:29-33 — “Die unteren m−n Zeilen von R null” describes full QR, whereas the preceding factorization suggests thin QR where those rows do not exist; reconcile the convention before explaining the least-squares solve.

scalar — KEEP — The static distinction between a single number, vector, and matrix is clear and the scaling example is sufficient.

smooth-function — KEEP — The C∞ definition, |x| comparison, and statement that writing the full formal Taylor series requires derivatives of every order are consistent.
- [NOTE] skript/src/concepts/smooth-function.mdx:26-28 — Optionally add that smoothness lets one form the Taylor series but does not by itself guarantee convergence to the function; the current text does not claim equality, so this is clarification rather than a correction.

tangent-line — KEEP — The tangent equation, x² example, local-linear interpretation, and zoomed quadratic error are mathematically consistent.

unbiased-estimator — REVISE — The dartboard comparison correctly separates bias from spread, but the statistical assumptions behind the examples are implicit.
- [MINOR] skript/src/concepts/unbiased-estimator.mdx:19-23 — The sample-mean unbiasedness statement assumes an iid sample with finite mean μ; add that condition so “erwartungstreu” is not read as automatic for arbitrary dependent or biased sampling.
- [MINOR] skript/src/concepts/unbiased-estimator.mdx:25-30 — The mini-batch gradient claim requires a specified sampling scheme (e.g. independent uniform sampling, or an appropriate weighting); state that condition before presenting it as generally unbiased.
