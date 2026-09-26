"""2D-Szenen: S1 Kreis -> Ellipse, S2 Drehen/Strecken/Drehen,
S4 Kenngrößen ablesen, S5 Schluss."""

import numpy as np
from manim import (DOWN, LEFT, ORIGIN, RIGHT, UP, UL, UR, Arrow, Axes, Circle, Ellipse,
                   Create, DashedVMobject, DecimalNumber, Dot, FadeIn,
                   FadeOut, Indicate, Line, NumberPlane, ParametricFunction,
                   Rectangle, ReplacementTransform, Scene, SurroundingRectangle,
                   Transform, ValueTracker, VGroup, VMobject, VectorizedPoint,
                   Write, always_redraw, linear, smooth)

from common import (A2, BG, ERR_RED, INK, MUTED, S2, S_ORANGE, U2, U_GREEN,
                    V_BLUE, Vt2, Voiced, de_num, lin_path, matrix_anim, rot_path,
                    tex, txt)

O = np.array([-2.7, -0.3, 0.0])     # Ursprung der Ebene auf dem Bildschirm
UNIT = 1.3
PANEL_X = 4.75                       # Mitte der rechten Spalte


def P(x, y=None):
    if y is None:
        x, y = x[0], x[1]
    return O + UNIT * np.array([x, y, 0.0])


def make_plane(opacity=0.35):
    return NumberPlane(
        x_range=[-5, 5, 1], y_range=[-4, 4, 1],
        x_length=10 * UNIT, y_length=8 * UNIT,
        background_line_style={"stroke_color": MUTED, "stroke_width": 1.2,
                               "stroke_opacity": opacity},
        axis_config={"stroke_color": MUTED, "stroke_opacity": 0.8},
        faded_line_ratio=1,
    ).move_to(O)


def panel():
    """Deckt die rechte Spalte ab, damit transformierte Gitter nicht
    unter die Formeln laufen."""
    r = Rectangle(width=5.0, height=8.4, fill_color=BG, fill_opacity=1,
                  stroke_width=0).move_to([PANEL_X, 0, 0])
    r.set_z_index(5)
    return r


def on_panel(m, y):
    m.move_to([PANEL_X, y, 0]).set_z_index(6)
    return m


def arrow(p0, p1, color, width=6):
    return Arrow(p0, p1, buff=0, color=color, stroke_width=width,
                 max_tip_length_to_length_ratio=0.18, tip_length=0.22)


def unit_circle(color=INK, width=4):
    return Circle(radius=UNIT, color=color, stroke_width=width).move_to(O)


def ellipse_curve(M, color=U_GREEN, width=5):
    return ParametricFunction(
        lambda t: P(M @ np.array([np.cos(t), np.sin(t)])),
        t_range=[0, 2 * np.pi], color=color, stroke_width=width)


def right_angle(d1, d2, color, size=0.22, at=None):
    at = O if at is None else at
    d1 = d1 / np.linalg.norm(d1) * size
    d2 = d2 / np.linalg.norm(d2) * size
    m = VMobject(color=color, stroke_width=3)
    m.set_points_as_corners([at + d1, at + d1 + d2, at + d2])
    return m


def vec3(v):
    return np.array([v[0], v[1], 0.0])


V1, V2 = Vt2[0], Vt2[1]
UU1, UU2 = U2[:, 0], U2[:, 1]


class S1Ellipse(Voiced, Scene):
    def construct(self):
        # ---- Titel -------------------------------------------------------
        title = txt("Singulärwertzerlegung", 64)
        sub = txt("Drehen, Strecken, Drehen", 34, color=MUTED)
        VGroup(title, sub).arrange(DOWN, buff=0.4)
        self.play(FadeIn(title, shift=UP * 0.2), run_time=1.2)
        self.play(FadeIn(sub), run_time=0.8)
        self.wait(1.5)
        self.play(FadeOut(title), FadeOut(sub), run_time=0.8)

        # ---- s1_01: Kreis -> Ellipse -------------------------------------
        base = make_plane(0.25)
        grid = make_plane(0.5)
        circle = unit_circle()
        cover = panel()
        Amat = on_panel(tex(r"\bA=\begin{pmatrix}2&1\\0&1\end{pmatrix}", size=44), 2.8)
        self.add(cover)

        d = self.say("s1_01")
        self.play(Create(base), Create(grid), run_time=1.5)
        self.play(Create(circle), Write(Amat), run_time=1.2)
        self.play(matrix_anim(VGroup(grid, circle), lin_path(np.eye(2), A2),
                              about=O, run_time=3))
        self.done()

        # ---- s1_02: Vektor läuft um den Kreis ------------------------------
        ell = ellipse_curve(A2)
        ghost = unit_circle(color=INK, width=2.5).set_stroke(opacity=0.55)
        self.say("s1_02")
        self.play(FadeOut(grid), FadeIn(ghost),
                  ReplacementTransform(circle, ell), run_time=1.2)

        th = ValueTracker(0.0)

        def x_of(t):
            return np.array([np.cos(np.radians(t)), np.sin(np.radians(t))])

        xa = always_redraw(lambda: arrow(O, P(x_of(th.get_value())), V_BLUE))
        axa = always_redraw(lambda: arrow(O, P(A2 @ x_of(th.get_value())), U_GREEN))
        xl = always_redraw(lambda: tex(r"\bx", size=36).set_color(V_BLUE).move_to(
            P(1.28 * x_of(th.get_value()))))
        axl = always_redraw(lambda: tex(r"\bA\bx", size=36).set_color(U_GREEN).move_to(
            P(A2 @ x_of(th.get_value())) + 0.35 * vec3(A2 @ x_of(th.get_value()))
            / np.linalg.norm(A2 @ x_of(th.get_value()))))

        axes = Axes(x_range=[0, 360, 90], y_range=[0, 2.5, 1], x_length=3.8,
                    y_length=2.0, tips=False,
                    axis_config={"color": MUTED, "stroke_width": 2,
                                 "include_ticks": True},
                    ).move_to([PANEL_X, 0.0, 0]).set_z_index(6)
        ylab = on_panel(tex(r"\|\bA\bx\|", size=30), 1.35).align_to(axes, LEFT)
        xlab = tex(r"\theta", size=30).next_to(axes, RIGHT, buff=0.1).set_z_index(6)
        norm_of = lambda t: np.linalg.norm(A2 @ x_of(t))
        trace = always_redraw(lambda: axes.plot(
            norm_of, x_range=[0, max(min(th.get_value(), 360), 0.5), 1],
            color=U_GREEN, stroke_width=3).set_z_index(6))
        rlab = on_panel(tex(r"\|\bA\bx\| =", size=34), -1.5).shift(0.45 * LEFT)
        rnum = always_redraw(lambda: de_num(norm_of(th.get_value())).next_to(
            rlab, RIGHT, buff=0.15).set_z_index(6))
        readout = VGroup(rlab, rnum)

        self.play(FadeIn(xa), FadeIn(axa), FadeIn(xl), FadeIn(axl),
                  Create(axes), FadeIn(ylab), FadeIn(xlab), FadeIn(readout),
                  run_time=1.0)
        self.add(trace)
        self.play(th.animate.set_value(360), run_time=self.remaining() - 0.3,
                  rate_func=linear)
        self.done()

        # ---- s1_03: Maximum ----------------------------------------------
        theta1 = np.degrees(np.arctan2(V1[1], V1[0]))    # 31.7°
        dot = always_redraw(lambda: Dot(
            axes.c2p(th.get_value() % 360, norm_of(th.get_value() % 360)),
            color=S_ORANGE, radius=0.07).set_z_index(7))
        self.remove(trace)
        full = axes.plot(norm_of, x_range=[0, 360, 1], color=U_GREEN,
                         stroke_width=3).set_z_index(6)
        self.add(full, dot)
        self.say("s1_03")
        self.play(th.animate.set_value(360 + theta1), run_time=2.5)
        v1a = arrow(O, P(V1), V_BLUE)
        s1a = arrow(O, P(S2[0] * UU1), U_GREEN)
        v1l = tex(r"\bv{1}", size=36).move_to(P(1.32 * V1) + 0.12 * UP)
        s1l = tex(r"\sig{1}\bu{1}", size=36).move_to(P(S2[0] * UU1) + 0.45 * RIGHT + 0.2 * UP)
        s1v = on_panel(tex(r"\sig{1} \approx 2{,}29", size=38), -2.5)
        self.play(Indicate(rlab, color=S_ORANGE), run_time=1.2)
        self.play(FadeOut(xl), FadeOut(axl), FadeIn(v1a), FadeIn(s1a),
                  Write(v1l), Write(s1l), Write(s1v), run_time=1.5)
        self.done()

        # ---- s1_04: Minimum ----------------------------------------------
        self.say("s1_04")
        self.play(th.animate.set_value(360 + theta1 + 90), run_time=2.5)
        v2a = arrow(O, P(V2), V_BLUE)
        s2a = arrow(O, P(S2[1] * UU2), U_GREEN)
        v2l = tex(r"\bv{2}", size=36).move_to(P(V2) + 0.4 * LEFT + 0.05 * DOWN)
        s2l = tex(r"\sig{2}\bu{2}", size=36).move_to(P(S2[1] * UU2) + 0.5 * RIGHT + 0.42 * UP)
        s2v = on_panel(tex(r"\sig{2} \approx 0{,}87", size=38), -3.2)
        self.play(FadeIn(v2a), FadeIn(s2a), Write(v2l), Write(s2l), Write(s2v),
                  run_time=1.5)
        self.done()

        # ---- s1_05: Bilder orthogonal ------------------------------------
        self.say("s1_05")
        self.play(FadeOut(xa), FadeOut(axa), FadeOut(dot), run_time=0.6)
        ra_in = right_angle(vec3(V1), vec3(V2), V_BLUE)
        ra_out = right_angle(vec3(UU1), vec3(UU2), U_GREEN, size=0.3)
        self.play(Create(ra_in), run_time=0.8)
        self.wait(1.0)
        self.play(Create(ra_out), run_time=0.8)
        self.play(Indicate(VGroup(s1a, s2a, ra_out), color=U_GREEN, scale_factor=1.08),
                  run_time=1.5)
        axes_ell = VGroup(
            DashedVMobject(Line(P(-S2[0] * UU1), P(S2[0] * UU1), color=U_GREEN,
                                stroke_width=2.5), num_dashes=24),
            DashedVMobject(Line(P(-S2[1] * UU2), P(S2[1] * UU2), color=U_GREEN,
                                stroke_width=2.5), num_dashes=10))
        self.play(Create(axes_ell), run_time=1.2)
        names = on_panel(VGroup(
            txt("rechte Singulärvektoren", 24, color=V_BLUE),
            tex(r"\bv{1},\ \bv{2}", size=34),
            txt("linke Singulärvektoren", 24, color=U_GREEN),
            tex(r"\bu{1},\ \bu{2}", size=34),
        ).arrange(DOWN, buff=0.18), 2.0)
        rnum.clear_updaters()
        self.play(FadeOut(VGroup(axes, full, ylab, xlab, readout)), run_time=0.6)
        on_panel(names, 0.0)
        self.play(FadeIn(names), run_time=1.0)
        self.done()
        self.play(*[FadeOut(m) for m in self.mobjects if m is not cover],
                  run_time=0.8)


class S2DrehenStrecken(Voiced, Scene):
    def construct(self):
        cover = panel()
        self.add(cover)
        base = make_plane(0.18)
        grid = make_plane(0.55)
        circle = unit_circle()
        p1, p2 = VectorizedPoint(P(V1)), VectorizedPoint(P(V2))
        state = {"c": V_BLUE}
        a1 = always_redraw(lambda: arrow(O, p1.get_center(), state["c"]))
        a2 = always_redraw(lambda: arrow(O, p2.get_center(), state["c"]))
        l1 = always_redraw(lambda: tex(r"\bv{1}" if state["c"] == V_BLUE else
                                       (r"\sig{1}\mathbf{e}_1" if state["c"] == S_ORANGE
                                        else r"\sig{1}\bu{1}"), size=34)
                           .move_to(p1.get_center() + 0.42 * _dir(p1)))
        l2 = always_redraw(lambda: tex(r"\bv{2}" if state["c"] == V_BLUE else
                                       (r"\sig{2}\mathbf{e}_2" if state["c"] == S_ORANGE
                                        else r"\sig{2}\bu{2}"), size=34)
                           .move_to(p2.get_center() + 0.45 * _dir(p2)))
        movers = VGroup(grid, circle, p1, p2)

        eq = on_panel(tex(r"\bA", "=", r"\bU", r"\bSigma", r"\bV^\top", size=60), 2.9)
        steps = VGroup(
            VGroup(txt("1. drehen", 30), tex(r"\bV^\top", size=40)).arrange(RIGHT, buff=0.3),
            VGroup(txt("2. strecken", 30), tex(r"\bSigma", size=40)).arrange(RIGHT, buff=0.3),
            VGroup(txt("3. drehen", 30), tex(r"\bU", size=40)).arrange(RIGHT, buff=0.3),
        ).arrange(DOWN, buff=0.45, aligned_edge=LEFT)
        on_panel(steps, 0.6)
        for s in steps:
            s.set_opacity(0.35)

        # ---- s2_01 --------------------------------------------------------
        self.say("s2_01")
        self.play(FadeIn(base), FadeIn(grid), Create(circle), run_time=1.2)
        self.play(FadeIn(a1), FadeIn(a2), FadeIn(l1), FadeIn(l2), Write(eq),
                  run_time=1.5)
        self.play(FadeIn(steps), run_time=1.0)
        self.done()

        # ---- s2_02: V^T ---------------------------------------------------
        self.say("s2_02")
        self.play(steps[0].animate.set_opacity(1), Indicate(eq[4], color=V_BLUE),
                  run_time=1.2)
        self.play(matrix_anim(movers, rot_path(Vt2), about=O,
                              run_time=self.remaining() - 0.8))
        self.done()

        # ---- s2_03: Sigma ---------------------------------------------------
        self.say("s2_03")
        self.play(steps[0].animate.set_opacity(0.5), steps[1].animate.set_opacity(1),
                  Indicate(eq[3], color=S_ORANGE), run_time=1.2)
        state["c"] = S_ORANGE
        self.play(matrix_anim(movers, lin_path(np.eye(2), np.diag(S2)), about=O,
                              run_time=4.0))
        sig_mat = on_panel(tex(r"\bSigma=\begin{pmatrix}\sig{1}&0\\0&\sig{2}\end{pmatrix}",
                               size=36), -1.9)
        circle.set_color(S_ORANGE)
        self.play(FadeIn(sig_mat), run_time=1.0)
        self.done()

        # ---- s2_04: U ------------------------------------------------------
        self.say("s2_04")
        self.play(steps[1].animate.set_opacity(0.5), steps[2].animate.set_opacity(1),
                  Indicate(eq[2], color=U_GREEN), run_time=1.2)
        state["c"] = U_GREEN
        circle.set_color(U_GREEN)
        self.play(matrix_anim(movers, rot_path(U2), about=O, run_time=3.5))
        check = DashedVMobject(ellipse_curve(A2, color=INK, width=3), num_dashes=60)
        self.play(Create(check), run_time=1.2)
        self.play(Indicate(eq, color=INK, scale_factor=1.1), run_time=1.5)
        self.done()

        # ---- s2_05: allgemeine Form ----------------------------------------
        self.say("s2_05")
        everything = [m for m in self.mobjects if m is not cover]
        self.play(*[FadeOut(m) for m in everything], run_time=0.8)
        self.remove(cover)
        blocks = svd_blocks()
        self.play(FadeIn(blocks[0]), run_time=1.0)
        self.play(FadeIn(blocks[1]), run_time=2.0)
        self.done()
        self.play(FadeOut(blocks), run_time=0.8)


def _dir(p):
    v = p.get_center() - O
    n = np.linalg.norm(v)
    return v / n if n > 1e-6 else RIGHT


def svd_blocks():
    """A (m x n) = U (m x m) Sigma (m x n) V^T (n x n), m=5, n=3."""
    s = 0.55
    m, n = 5, 3

    def block(w, h, color, label, dims):
        r = Rectangle(width=w * s, height=h * s, color=color, stroke_width=3,
                      fill_color=color, fill_opacity=0.18)
        lab = tex(label, size=44).move_to(r)
        dim = tex(dims, size=32).set_color(MUTED).next_to(r, DOWN, buff=0.15)
        return VGroup(r, lab, dim)

    A = block(n, m, INK, r"\bA", r"m\times n")
    U = block(m, m, U_GREEN, r"\bU", r"m\times m")
    S = block(n, m, S_ORANGE, "", r"m\times n")
    diag = Line(S[0].get_corner(UL), S[0].get_corner(UL) + np.array([n * s, -n * s, 0]),
                color=S_ORANGE, stroke_width=6)
    zero = tex("0", size=34).set_color(S_ORANGE).move_to(
        S[0].get_bottom() + UP * (m - n) * s / 2)
    S.add(diag, zero)
    Vt = block(n, n, V_BLUE, r"\bV^\top", r"n\times n")
    eq_sign = tex("=", size=50)
    row = VGroup(A, eq_sign, U, S, Vt).arrange(RIGHT, buff=0.35)
    Vt.align_to(U, UP)
    S.align_to(U, UP)
    A.align_to(U, UP)
    row.move_to(UP * 0.4)
    notes = VGroup(
        txt("orthogonal", 26, color=U_GREEN).next_to(U, DOWN, buff=0.7),
        txt("„diagonal“", 26, color=S_ORANGE).next_to(S, DOWN, buff=0.7),
        txt("orthogonal", 26, color=V_BLUE).next_to(Vt, DOWN, buff=0.7),
    )
    notes[2].align_to(notes[0], UP)
    notes[1].align_to(notes[0], UP)
    return VGroup(row, notes)


class S4Ablesen(Voiced, Scene):
    def construct(self):
        cover = panel()
        self.add(cover)
        base = make_plane(0.25)
        ghost = unit_circle(width=2.5).set_stroke(opacity=0.5)
        s1t, s2t = ValueTracker(S2[0]), ValueTracker(S2[1])

        def M():
            return U2 @ np.diag([s1t.get_value(), s2t.get_value()])

        ell = always_redraw(lambda: ellipse_curve(M()))
        ax1 = always_redraw(lambda: arrow(O, P(M() @ [1, 0]), U_GREEN))
        ax2 = always_redraw(lambda: arrow(O, P(M() @ [0, 1]), U_GREEN)
                            if s2t.get_value() > 0.08 else VectorizedPoint(O))

        # ---- s4_01 -----------------------------------------------------------
        self.say("s4_01")
        self.play(FadeIn(base), FadeIn(ghost), Create(ell), run_time=1.5)
        self.play(FadeIn(ax1), FadeIn(ax2), run_time=1.0)
        self.done()

        # ---- s4_02: Spektralnorm ---------------------------------------------
        norm = on_panel(tex(r"\|\bA\|_2=\sig{1}\approx 2{,}29", size=40), 2.6)
        long = Line(O, P(S2[0] * UU1), color=S_ORANGE, stroke_width=10)
        self.say("s4_02")
        self.play(Create(long), run_time=1.2)
        self.play(Write(norm), run_time=1.5)
        self.play(FadeOut(long), run_time=0.8)
        self.done()

        # ---- s4_03: Kondition --------------------------------------------------
        klab = on_panel(tex(r"\kappa_2(\bA)=\frac{\sig{1}}{\sig{2}}\approx", size=40),
                        1.2).shift(0.4 * LEFT)
        knum = always_redraw(lambda: de_num(
            s1t.get_value() / max(s2t.get_value(), 1e-3), 1, size=40).next_to(
            klab, RIGHT, buff=0.15).set_z_index(6))
        kap = VGroup(klab, knum)
        self.say("s4_03")
        self.play(Write(kap), run_time=1.5)
        self.wait(2.5)
        self.play(s2t.animate.set_value(0.23), run_time=3.5)
        self.wait(0.8)
        self.play(s2t.animate.set_value(S2[1]), run_time=2.5)
        self.done()

        # ---- s4_04: Rang-1-Approximation --------------------------------------
        a1 = on_panel(tex(r"\bA_1=\sig{1}\bu{1}\bvt{1}", size=40), -0.3)
        r1 = on_panel(txt("Rang 1", 28, color=S_ORANGE), -1.0)
        full = DashedVMobject(ellipse_curve(A2, color=INK, width=2.5), num_dashes=60)
        self.say("s4_04")
        kap.remove(knum)
        self.remove(knum)
        kap.add(de_num(S2[0] / S2[1], 1, size=40).move_to(knum).set_z_index(6))
        self.add(kap)
        self.play(FadeOut(kap), run_time=0.6)
        self.add(full)
        self.wait(1.0)
        self.play(s2t.animate.set_value(0.0), run_time=3.5)
        self.play(Write(a1), run_time=1.5)
        self.play(FadeIn(r1), run_time=0.8)
        self.done()

        # ---- s4_05: Eckart-Young ---------------------------------------------
        err = Line(P(-S2[1] * UU2), P(S2[1] * UU2), color=ERR_RED, stroke_width=8)
        ey = on_panel(tex(r"\|\bA-\bA_1\|_2=\sig{2}\approx 0{,}87", size=38), -2.0)
        eyl = on_panel(txt("Satz von Eckart und Young", 24, color=MUTED), -2.7)
        self.say("s4_05")
        self.play(Create(err), run_time=1.5)
        self.play(Write(ey), FadeIn(eyl), run_time=2.0)
        self.done()

        # ---- s4_06: Pseudoinverse ----------------------------------------------
        self.say("s4_06")
        self.play(FadeOut(VGroup(norm, a1, r1, ey, eyl, err, full)),
                  s2t.animate.set_value(S2[1]), run_time=1.2)
        pinv = on_panel(tex(r"\bA^{+}=\bV\bSigma^{+}\bU^\top", size=48), 2.4)
        spinv = on_panel(tex(r"\bSigma^{+}=\begin{pmatrix}1/\sig{1}&0\\0&1/\sig{2}\end{pmatrix}",
                             size=36), 1.0)
        zero = on_panel(tex(r"\sig{i}=0\ \Rightarrow\ \text{Eintrag bleibt }0", size=30), -0.1)
        self.play(Write(pinv), run_time=1.3)
        # Ellipse samt Halbachsen rückwärts: U^T, Sigma^+, V
        stat = VGroup(ellipse_curve(A2), arrow(O, P(S2[0] * UU1), U_GREEN),
                      arrow(O, P(S2[1] * UU2), U_GREEN))
        self.remove(ell, ax1, ax2)
        self.add(stat)
        back = VGroup(stat)
        self.play(matrix_anim(back, rot_path(U2.T), about=O, run_time=1.8))
        self.play(FadeIn(spinv), matrix_anim(back, lin_path(np.eye(2), np.diag(1 / S2)),
                                            about=O, run_time=2.0))
        self.play(matrix_anim(back, rot_path(Vt2.T), about=O, run_time=1.8),
                  FadeIn(zero))
        self.play(stat[0].animate.set_color(INK), stat[1:].animate.set_color(V_BLUE),
                  run_time=0.8)
        self.done()
        self.play(*[FadeOut(m) for m in self.mobjects if m is not cover],
                  run_time=0.8)


class S5Schluss(Voiced, Scene):
    def construct(self):
        s = tex(r"\bA", "=", r"\sig{1}\bu{1}\bvt{1}", "+",
                r"\sig{2}\bu{2}\bvt{2}", "+", r"\cdots", "+",
                r"\sig{r}\bu{r}\bvt{r}", size=54).shift(UP * 1.6)
        order = tex(r"\sig{1}\ge\sig{2}\ge\cdots\ge\sig{r}>0", size=36).next_to(
            s, DOWN, buff=0.5)

        # Mini-Leiste: Kreis -> gedreht -> Ellipse -> gedrehte Ellipse
        r = 0.55
        c0 = Circle(radius=r, color=INK, stroke_width=4)
        a0 = Line(ORIGIN, r * np.array([V1[0], V1[1], 0]), color=V_BLUE, stroke_width=5)
        stage0 = VGroup(c0, a0)
        stage1 = VGroup(Circle(radius=r, color=INK, stroke_width=4),
                        Line(ORIGIN, r * RIGHT, color=V_BLUE, stroke_width=5))
        e = Ellipse(width=2 * r * S2[0] / 1.4, height=2 * r * S2[1] / 1.4,
                    color=S_ORANGE, stroke_width=4)
        stage2 = VGroup(e, Line(ORIGIN, r * S2[0] / 1.4 * RIGHT, color=S_ORANGE,
                                stroke_width=5))
        stage3 = stage2.copy().set_color(U_GREEN).rotate(
            np.arctan2(UU1[1], UU1[0]), about_point=ORIGIN)
        stages = VGroup(stage0, stage1, stage2, stage3).arrange(RIGHT, buff=1.4)
        stages.shift(DOWN * 1.5)
        labs = VGroup()
        for i, lab in enumerate([r"\bV^\top", r"\bSigma", r"\bU"]):
            a = Arrow(stages[i].get_right(), stages[i + 1].get_left(), buff=0.15,
                      color=MUTED, stroke_width=3)
            t = tex(lab, size=36).next_to(a, UP, buff=0.1)
            labs.add(a, t)
        words = VGroup(*[txt(w, 26, color=c) for w, c in
                         [("drehen", V_BLUE), ("strecken", S_ORANGE),
                          ("drehen", U_GREEN)]])
        for i, w in enumerate(words):
            w.next_to(labs[2 * i], DOWN, buff=0.55)
        foot = txt("Skript Kap. 6 · Singulärwertzerlegung", 22, color=MUTED).to_edge(
            DOWN, buff=0.35)

        self.say("s5_01")
        self.play(Write(s), run_time=3.0)
        self.play(FadeIn(order), run_time=1.2)
        self.wait(2.0)
        self.play(FadeIn(stages[0]), run_time=0.6)
        for i in range(3):
            self.play(FadeIn(labs[2 * i]), FadeIn(labs[2 * i + 1]),
                      FadeIn(stages[i + 1]), FadeIn(words[i]), run_time=1.0)
        self.play(FadeIn(foot), run_time=0.8)
        self.done()
        self.wait(1.5)
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=1.2)
