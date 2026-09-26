"""Gemeinsame Bausteine für die SVD-Szenen: Farben, Zahlen, Sprecher-Timing,
Animationen entlang von Matrixpfaden."""

import json
from pathlib import Path

import numpy as np
from manim import (ORIGIN, MathTex, Mobject, TexTemplate, Text,
                   UpdateFromAlphaFunc, config, smooth)
from scipy.linalg import expm, logm

HERE = Path(__file__).parent
AUDIO = HERE / "audio"

# Okabe-Ito wie im Skript (fmm-macros.ts), für dunklen Hintergrund aufgehellt
BG = "#101820"
V_BLUE = "#56B4E9"      # V, v_i   (Eingangsseite)
S_ORANGE = "#E69F00"    # Sigma, sigma_i
U_GREEN = "#2BC99A"     # U, u_i   (Ausgangsseite)
ERR_RED = "#E8743B"     # Fehler, Kern
INK = "#E6EDF3"
MUTED = "#7D8A97"
FONT = "Lato"

config.background_color = BG

TEX = TexTemplate()
TEX.add_to_preamble(r"""
\usepackage{xcolor}
\definecolor{cv}{HTML}{56B4E9}\definecolor{cs}{HTML}{E69F00}
\definecolor{cu}{HTML}{2BC99A}\definecolor{ce}{HTML}{E8743B}
\newcommand{\bA}{\mathbf{A}}
\newcommand{\bx}{\mathbf{x}}
\newcommand{\bU}{{\color{cu}\mathbf{U}}}
\newcommand{\bV}{{\color{cv}\mathbf{V}}}
\newcommand{\bSigma}{{\color{cs}\boldsymbol{\Sigma}}}
\newcommand{\bu}[1]{{\color{cu}\mathbf{u}_{#1}}}
\newcommand{\bv}[1]{{\color{cv}\mathbf{v}_{#1}}}
\newcommand{\bvt}[1]{{\color{cv}\mathbf{v}_{#1}^{\!\top}}}
\newcommand{\sig}[1]{{\color{cs}\sigma_{#1}}}
\newcommand{\cerr}[1]{{\color{ce}#1}}
""")


def tex(*parts, size: float = 40, **kw) -> MathTex:
    """MathTex mit den Skript-Makros (\\bU, \\bV, \\bSigma, \\sig{i}, ...)."""
    return MathTex(*parts, tex_template=TEX, font_size=size, **kw)


def txt(s: str, size: float = 30, color=INK, **kw) -> Text:
    return Text(s, font=FONT, font_size=size, color=color, **kw)


# --------------------------------------------------------------------------
# Beispielmatrizen und ihre SVD (Vorzeichen so gewählt, dass U, V Drehungen
# sind, det = +1; dann lassen sich beide als Drehung animieren)

def svd_rot(A: np.ndarray):
    U, s, Vt = np.linalg.svd(A)
    if np.linalg.det(U) < 0:
        U[:, -1] *= -1
        Vt[-1, :] *= -1
    assert np.linalg.det(U) > 0 and np.linalg.det(Vt) > 0
    assert np.allclose(U @ np.diag(s) @ Vt, A)
    return U, s, Vt


A2 = np.array([[2.0, 1.0], [0.0, 1.0]])          # Kap. 6, S61/S62
U2, S2, Vt2 = svd_rot(A2)
A3 = np.array([[1.0, 2.0, 0.0], [0.0, 1.0, 1.0], [1.0, 0.0, 2.0]])
U3, S3, Vt3 = svd_rot(A3)                          # sigma = 1+sqrt3, 2, sqrt3-1


def embed3(M: np.ndarray) -> np.ndarray:
    """2x2 -> 3x3 (z bleibt fest)."""
    if M.shape == (3, 3):
        return M
    E = np.eye(3)
    E[:2, :2] = M
    return E


# --------------------------------------------------------------------------
# Matrixpfade: t in [0,1] -> Matrix

def rot_path(R: np.ndarray):
    """Gleichmäßige Drehung von I nach R (geodätisch in SO(n))."""
    L = np.real(logm(R))
    return lambda t: np.real(expm(t * L))


def lin_path(M0: np.ndarray, M1: np.ndarray):
    return lambda t: (1 - t) * M0 + t * M1


def matrix_anim(mob: Mobject, path, about=ORIGIN, scale: float = 1.0,
                **kw) -> UpdateFromAlphaFunc:
    """Wendet path(alpha) auf die Ausgangspunkte von mob an.

    Alle Punkte (auch die von Tracker-Punkten in mob) werden mitgeführt.
    `about` ist der Ursprung des Koordinatensystems auf dem Bildschirm."""
    fam = [m for m in mob.get_family() if m.has_points()]
    orig = [m.points.copy() for m in fam]
    about = np.asarray(about)

    def upd(_m, alpha):
        M = embed3(path(alpha))
        for f, p in zip(fam, orig):
            f.points = (p - about) @ M.T + about

    kw.setdefault("rate_func", smooth)
    return UpdateFromAlphaFunc(mob, upd, **kw)


# --------------------------------------------------------------------------
# Sprecher-Timing

_DUR = None


def durations() -> dict:
    global _DUR
    if _DUR is None:
        _DUR = json.loads((AUDIO / "durations.json").read_text())
    return _DUR


class Voiced:
    """Mixin: self.say(key) startet eine Sprachspur, self.done() wartet, bis
    sie zu Ende ist. Dazwischen laufen die Animationen des Segments."""

    def say(self, key: str, pad: float = 0.35) -> float:
        d = durations()[key]
        self.add_sound(str(AUDIO / f"{key}.wav"))
        self._seg_end = self.renderer.time + d + pad
        return d

    def done(self, min_wait: float = 0.1):
        rest = self._seg_end - self.renderer.time
        self.wait(max(rest, min_wait))

    def remaining(self) -> float:
        return max(self._seg_end - self.renderer.time, 0.2)


def de_num(x: float, places: int = 2, size: float = 34, **kw) -> MathTex:
    """Zahl mit Dezimalkomma als MathTex."""
    return tex(f"{x:.{places}f}".replace(".", "{,}"), size=size, **kw)
