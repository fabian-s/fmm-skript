"""Erzeugt die Sprachspuren audio/<key>.wav und audio/durations.json.

Standard-Engine ist SVOX Pico (pico2wave, offline, Debian/Ubuntu-Paket
libttspico-utils). Andere Engines werden über --engine eingehängt; jede
Engine muss nur eine WAV-Datei zu einem Text schreiben.

    python tts.py                 # alle Segmente
    python tts.py --engine piper --piper-model de_DE-thorsten-high.onnx
    python tts.py --engine cmd --cmd 'mytts --text-file {textfile} --out {out}'
    python tts.py --durations-only   # WAVs schon in audio/, nur Längen messen
"""

import argparse
import json
import subprocess
from pathlib import Path

from narration import NARRATION

HERE = Path(__file__).parent
AUDIO = HERE / "audio"


def pico(text: str, out: Path, speed: int = 90) -> None:
    raw = out.with_suffix(".raw.wav")
    subprocess.run(
        ["pico2wave", "-l", "de-DE", "-w", str(raw),
         f'<speed level="{speed}">{text}</speed>'],
        check=True,
    )
    # auf 48 kHz hochrechnen, leicht glätten, 0,15 s Stille vorn und hinten
    subprocess.run(
        ["sox", str(raw), "-r", "48000", "-c", "1", str(out),
         "gain", "-6", "lowpass", "7000", "bass", "+3", "norm", "-3", "pad", "0.15", "0.15"],
        check=True,
    )
    raw.unlink()


def piper(text: str, out: Path, model: str) -> None:
    subprocess.run(
        ["piper", "--model", model, "--output_file", str(out)],
        input=text.encode(), check=True,
    )


def cmd(text: str, out: Path, template: str) -> None:
    """Beliebige Engine: {text}, {textfile} und {out} im Befehl werden ersetzt."""
    import shlex
    import tempfile
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as f:
        f.write(text)
    argv = [a.format(text=text, textfile=f.name, out=str(out))
            for a in shlex.split(template)]
    subprocess.run(argv, check=True)
    Path(f.name).unlink()


def duration(path: Path) -> float:
    res = subprocess.run(["soxi", "-D", str(path)], capture_output=True,
                         text=True, check=True)
    return float(res.stdout)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--engine", default="pico", choices=["pico", "piper", "cmd"])
    ap.add_argument("--piper-model")
    ap.add_argument("--cmd", help="Befehlsvorlage für --engine cmd")
    ap.add_argument("--durations-only", action="store_true")
    ap.add_argument("keys", nargs="*")
    args = ap.parse_args()

    AUDIO.mkdir(exist_ok=True)
    dur_file = AUDIO / "durations.json"
    durations = json.loads(dur_file.read_text()) if dur_file.exists() else {}
    for key, text in NARRATION.items():
        if args.keys and key not in args.keys:
            continue
        out = AUDIO / f"{key}.wav"
        if args.durations_only:
            pass
        elif args.engine == "pico":
            pico(text, out)
        elif args.engine == "piper":
            piper(text, out, args.piper_model)
        else:
            cmd(text, out, args.cmd)
        durations[key] = duration(out)
        print(f"{key}: {durations[key]:5.2f} s")
    dur_file.write_text(json.dumps(durations, indent=1))
    print(f"gesamt: {sum(durations.values()):.1f} s")


if __name__ == "__main__":
    main()
