"""3D-Szene: Kugel -> Ellipsoid, drei Schritte, Rangabfall und Kern."""

import numpy as np
from manim import (DEGREES, DOWN, LEFT, RIGHT, UL, UP, Arrow3D, Create,
                   FadeIn, FadeOut, Line3D, Surface, ThreeDAxes, ThreeDScene,
                   VGroup, VectorizedPoint, Write, always_redraw)

from common import (A3, ERR_RED, INK, MUTED, S3, S_ORANGE, U3, U_GREEN,
                    V_BLUE, Vt3, Voiced, lin_path, matrix_anim, rot_path, tex,
                    txt)

SC = 1.05          # Bildschirmeinheiten je Koordinateneinheit


def sphere():
    s = Surface(
        lambda u, v: SC * np.array([np.cos(u) * np.sin(v), np.sin(u) * np.sin(v),
                                    np.cos(v)]),
        u_range=[0, 2 * np.pi], v_range=[0, np.pi], resolution=(20, 12),
        fill_opacity=0.55, stroke_width=0.4, stroke_color=INK,
        checkerboard_colors=["#2C6E91", "#3D8DB8"])
    return s


def arrow3(p, color):
    return Arrow3D(start=np.zeros(3), end=p, color=color, thickness=0.025,
                   height=0.22, base_radius=0.07, resolution=6)


class S3Raum(Voiced, ThreeDScene):
    def construct(self):
        self.set_camera_orientation(phi=68 * DEGREES, theta=-50 * DEGREES,
                                    zoom=0.95)
        axes = ThreeDAxes(x_range=[-3, 3, 1], y_range=[-3, 3, 1], z_range=[-2.5, 2.5, 1],
                          x_length=6 * SC, y_length=6 * SC, z_length=5 * SC,
                          axis_config={"color": MUTED, "stroke_width": 1.5})
        ball = sphere()

        Amat = tex(r"\bA=\begin{pmatrix}1&2&0\\0&1&1\\1&0&2\end{pmatrix}", size=36)
        Amat.to_corner(UL, buff=0.4)
        sv = tex(r"\sig{1}\approx 2{,}73,\ \ \sig{2}=2,\ \ \sig{3}\approx 0{,}73",
                 size=32).next_to(Amat, DOWN, buff=0.3, aligned_edge=LEFT)
        self.add_fixed_in_frame_mobjects(Amat, sv)
        self.remove(Amat, sv)

        # ---- s3_01: Kugel -> Ellipsoid -> zurück ---------------------------
        self.say("s3_01")
        self.begin_ambient_camera_rotation(rate=0.05)
        self.play(Create(axes), FadeIn(ball), Write(Amat), run_time=2.0)
        self.play(matrix_anim(ball, lin_path(np.eye(3), A3), run_time=3.5))
        semi = VGroup(*[arrow3(SC * S3[i] * U3[:, i], U_GREEN) for i in range(3)])
        self.play(FadeIn(semi), Write(sv), run_time=1.5)
        self.wait(max(self.remaining() - 2.6, 0.2))
        self.play(FadeOut(semi), matrix_anim(ball, lambda t: lin_path(A3, np.eye(3))(t) @ np.linalg.inv(A3),
                                             run_time=2.2))
        self.done()

        # ---- s3_02: V^T dreht ------------------------------------------------
        pts = [VectorizedPoint(SC * Vt3[i]) for i in range(3)]
        col = {"c": V_BLUE}
        arrows = [always_redraw(lambda p=p: arrow3(p.get_center(), col["c"]))
                  for p in pts]
        movers = VGroup(ball, *pts)
        step = tex(r"\bV^\top", size=48).to_corner(UP + RIGHT, buff=0.5)
        self.add_fixed_in_frame_mobjects(step)
        self.remove(step)
        self.say("s3_02")
        self.play(*[FadeIn(a) for a in arrows], FadeIn(step), run_time=1.5)
        self.play(matrix_anim(movers, rot_path(Vt3), run_time=self.remaining() - 0.5))
        self.done()

        # ---- s3_03: Sigma streckt -------------------------------------------
        step2 = tex(r"\bSigma\bV^\top", size=48).to_corner(UP + RIGHT, buff=0.5)
        self.add_fixed_in_frame_mobjects(step2)
        self.remove(step2)
        self.say("s3_03")
        col["c"] = S_ORANGE
        self.play(FadeOut(step), FadeIn(step2), run_time=0.4)
        self.play(matrix_anim(movers, lin_path(np.eye(3), np.diag(S3)),
                              run_time=self.remaining() + 0.6))
        self.done(0.05)

        # ---- s3_04: U dreht ----------------------------------------------------
        step3 = tex(r"\bU\bSigma\bV^\top", size=48).to_corner(UP + RIGHT, buff=0.5)
        self.add_fixed_in_frame_mobjects(step3)
        self.remove(step3)
        self.say("s3_04")
        col["c"] = U_GREEN
        self.play(FadeOut(step2), FadeIn(step3), run_time=0.4)
        self.play(matrix_anim(movers, rot_path(U3), run_time=self.remaining() + 0.8))
        self.done(0.3)

        # ---- s3_05: sigma_3 -> 0 ------------------------------------------------
        sv0 = tex(r"\sig{1}\approx 2{,}73,\ \ \sig{2}=2,\ \ \sig{3}=0",
                  size=32).move_to(sv, aligned_edge=LEFT)
        rank = txt("Rang 2", 30, color=S_ORANGE).next_to(sv0, DOWN, buff=0.3,
                                                         aligned_edge=LEFT)
        self.add_fixed_in_frame_mobjects(sv0, rank)
        self.remove(sv0, rank)
        u3 = U3[:, 2]
        flatten = lambda t: np.eye(3) - t * np.outer(u3, u3)
        self.say("s3_05")
        self.wait(3.0)
        self.play(FadeOut(sv), FadeIn(sv0), run_time=1.0)
        self.play(matrix_anim(movers, flatten, run_time=4.0))
        self.play(FadeIn(rank), run_time=0.8)
        self.done()

        # ---- s3_06: Kern und R^3 -> R^2 -------------------------------------------
        v3 = Vt3[2]
        kern = Line3D(-2.2 * SC * v3, 2.2 * SC * v3, color=ERR_RED, thickness=0.02)
        kl = tex(r"\operatorname{Kern}(\bA)=\operatorname{span}(\bv{3})", size=32)
        kl.next_to(rank, DOWN, buff=0.3, aligned_edge=LEFT)
        self.add_fixed_in_frame_mobjects(kl)
        self.remove(kl)
        A_rank2 = U3 @ np.diag([S3[0], S3[1], 0]) @ Vt3
        self.say("s3_06")
        self.play(Create(kern), Write(kl), run_time=1.5)
        self.play(matrix_anim(kern, lin_path(np.eye(3), A_rank2), run_time=2.5))
        self.play(FadeOut(kern), run_time=0.4)
        # flache Ellipse in die (x,y)-Ebene drehen und von oben ansehen
        self.stop_ambient_camera_rotation()
        self.play(matrix_anim(movers, rot_path(U3.T), run_time=3.0))
        r32 = tex(r"\bA\in\mathbb{R}^{2\times 3}:\ \ \mathbb{R}^3\to\mathbb{R}^2",
                  size=36).to_edge(DOWN, buff=0.5)
        self.add_fixed_in_frame_mobjects(r32)
        self.remove(r32)
        self.move_camera(phi=0, theta=-90 * DEGREES, zoom=1.0, run_time=3.0,
                         added_anims=[FadeOut(axes.z_axis)])
        self.play(Write(r32), run_time=1.2)
        self.done()
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.8)
