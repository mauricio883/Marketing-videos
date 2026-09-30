#!/usr/bin/env python3
"""Extract every shot window listed in src/tools/shots.json into frames/<id>/ (skips ones already done)."""
import json, os, subprocess, sys, concurrent.futures as cf
cfg = json.load(open('src/tools/shots.json'))
FMTS = {'9x16': (1440, 1920, ''), '1x1': (1200, 1200, '@1x1'), '16x9': (2112, 1188, '@16x9')}
fmt = os.environ.get('FMT', '9x16'); FW, FH, SUF = FMTS[fmt]
only = set(sys.argv[1:])
def run(s):
    s = dict(s); s.update(s.get('fmt', {}).get(fmt, {}))
    out = f"frames/{s['id']}{SUF}"
    meta = os.path.join(out, 'meta.json')
    want = dict(start=s['start'], dur=s['dur'], fps=s.get('fps', 25), speed=s.get('speed', 1.0))
    if os.path.exists(meta):
        m = json.load(open(meta))
        if all(abs(m.get(k, -1) - v) < 1e-6 for k, v in want.items()) and m.get('crop_key') == f"{s.get('cx',0.5)}/{s.get('cy',0.5)}/{s.get('zoom',1.0)}": return f"skip {s['id']}"
    src = cfg.get(s['src'], s['src'])
    cmd = ['python3', 'src/tools/extract_frames.py', '--src', src, '--out', out, '--start', str(s['start']), '--dur', str(s['dur']), '--fps', str(want['fps']), '--speed', str(want['speed']), '--cx', str(s.get('cx', 0.5)), '--cy', str(s.get('cy', 0.5)), '--zoom', str(s.get('zoom', 1.0)), '--w', str(FW), '--h', str(FH)]
    if s.get('eq'): cmd += ['--eq', s['eq']]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0: return f"FAIL {s['id']}: {r.stderr[-300:]}"
    m = json.load(open(meta)); m['crop_key'] = f"{s.get('cx',0.5)}/{s.get('cy',0.5)}/{s.get('zoom',1.0)}"; json.dump(m, open(meta, 'w'))
    return r.stdout.strip()
shots = [s for s in cfg['shots'] if not only or s['id'] in only]
with cf.ThreadPoolExecutor(int(os.environ.get('JOBS', '2'))) as ex:
    for r in ex.map(run, shots): print(r, flush=True)
