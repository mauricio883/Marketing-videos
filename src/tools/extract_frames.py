#!/usr/bin/env python3
"""Extract a segment of a source video as a JPEG frame sequence, pre-cropped for a vertical plate.

  python3 src/tools/extract_frames.py --src "media/video/Nest/Videos/Raw Material/MVI_0727.mov" \
      --out frames/nest_0727a --start 12.0 --dur 3.0 --fps 25 [--speed 1.0] [--cx 0.5] [--w 1440 --h 1920] [--zoom 1.0]

The crop window keeps the full source height (times 1/zoom) and a width of w/h of that, centred at cx (0..1) of the
source width; the result is scaled to w x h. Output frames: <out>/f00001.jpg ... plus <out>/meta.json.
--speed 0.5 = slow motion (uses the source's native frame rate when available).
"""
import argparse, subprocess, json, os, re, shutil
FF = os.environ.get('FFMPEG', '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2')
ap = argparse.ArgumentParser()
ap.add_argument('--src', required=True); ap.add_argument('--out', required=True)
ap.add_argument('--start', type=float, default=0); ap.add_argument('--dur', type=float, required=True)
ap.add_argument('--fps', type=int, default=25); ap.add_argument('--speed', type=float, default=1.0)
ap.add_argument('--cx', type=float, default=0.5); ap.add_argument('--cy', type=float, default=0.5)
ap.add_argument('--w', type=int, default=1440); ap.add_argument('--h', type=int, default=1920)
ap.add_argument('--zoom', type=float, default=1.0, help='>1 crops tighter (digital zoom)')
ap.add_argument('--q', type=int, default=2)
ap.add_argument('--eq', default='', help='extra filter e.g. eq=contrast=1.05:saturation=1.05')
a = ap.parse_args()

probe = subprocess.run([FF, '-hide_banner', '-i', a.src], capture_output=True, text=True).stderr
m = re.search(r'Video: .*?(\d{3,5})x(\d{3,5})', probe); sw, sh = int(m.group(1)), int(m.group(2))
ch = int(sh / a.zoom); cw = int(ch * a.w / a.h)
if cw > sw: cw = sw; ch = int(cw * a.h / a.w)
x = int(max(0, min(sw - cw, a.cx * sw - cw / 2))); y = int(max(0, min(sh - ch, a.cy * sh - ch / 2)))
# source-time span to read: dur * speed seconds of source
src_dur = a.dur * a.speed
vf = f"crop={cw}:{ch}:{x}:{y},scale={a.w}:{a.h}:flags=lanczos"
if a.eq: vf += ',' + a.eq
# setpts for speed, then constant output fps
vf = f"setpts=PTS/{a.speed}," + vf + f",fps={a.fps}"
if os.path.isdir(a.out): shutil.rmtree(a.out)
os.makedirs(a.out)
cmd = [FF, '-hide_banner', '-loglevel', 'error', '-y', '-ss', f'{a.start:.3f}', '-t', f'{src_dur + 0.2:.3f}', '-i', a.src,
       '-vf', vf, '-frames:v', str(int(round(a.dur * a.fps)) + 1), '-q:v', str(a.q), '-pix_fmt', 'yuvj420p', f'{a.out}/f%05d.jpg']
subprocess.run(cmd, check=True)
n = len([f for f in os.listdir(a.out) if f.endswith('.jpg')])
json.dump({'src': a.src, 'start': a.start, 'dur': a.dur, 'fps': a.fps, 'speed': a.speed, 'crop': [cw, ch, x, y], 'size': [a.w, a.h], 'frames': n}, open(f'{a.out}/meta.json', 'w'))
print(f"{a.out}: {n} frames  crop {cw}x{ch}+{x}+{y} -> {a.w}x{a.h}  speed {a.speed}")
