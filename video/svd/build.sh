#!/usr/bin/env bash
# Rendert alle Szenen und setzt sie zu svd.mp4 zusammen.
#   ./build.sh            720p30 (Entwurf)
#   ./build.sh -qh        1080p60
# Voraussetzung: audio/<key>.wav + audio/durations.json (siehe tts.py)
set -euo pipefail
cd "$(dirname "$0")"
Q="${1:--qm}"
MANIM="${MANIM:-manim}"
test -f audio/durations.json || { echo "audio/durations.json fehlt – erst tts.py laufen lassen"; exit 1; }
"$MANIM" "$Q" scenes_2d.py S1Ellipse S2DrehenStrecken S4Ablesen S5Schluss &
"$MANIM" "$Q" scene_3d.py S3Raum &
wait
dir2d=$(ls -d media/videos/scenes_2d/*/ | head -1)
dir3d=$(ls -d media/videos/scene_3d/*/ | head -1)
: > concat.txt
for f in "$dir2d/S1Ellipse.mp4" "$dir2d/S2DrehenStrecken.mp4" "$dir3d/S3Raum.mp4" \
         "$dir2d/S4Ablesen.mp4" "$dir2d/S5Schluss.mp4"; do
  echo "file '$PWD/$f'" >> concat.txt
done
ffmpeg -v error -y -f concat -safe 0 -i concat.txt -c:v libx264 -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 48000 svd.mp4
rm concat.txt
echo "fertig: $(pwd)/svd.mp4"
