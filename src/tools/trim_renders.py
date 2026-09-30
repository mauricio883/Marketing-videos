#!/usr/bin/env python3
"""Trim near-white margins from product renders so they can be sized precisely in the composition.
Writes PNGs with a transparent background? No: keeps white (renders are on white) but tight-cropped with a small padding."""
import sys, os
from PIL import Image, ImageChops
SRC = 'media/src'; DST = 'media/derived'
items = {
  'dune-shadow.png': 'Dune/Studio Images/Dune Small Acoustic Office Pod_Shadow 1.png',
  'dune-oat.png': 'Dune/Studio Images/Dune Small Acoustic Office Pod_Oat 1.png',
  'dune-olive.png': 'Dune/Studio Images/Dune Small Acoustic Office Pod - Olive 1.png',
  'dune-olive-2.png': 'Dune/Studio Images/Dune Small Acoustic Office Pod - Olive 2.png',
  'dune-shadow-2.png': 'Dune/Studio Images/Dune Small Acoustic Office Pod_Shadow 2.png',
  'dune-oat-2.png': 'Dune/Studio Images/Dune Small Acoustic Office Pod_Oat 2.png',
  'dune-blue-person.png': 'Dune/Studio Images/Dune Small Acoustic Office Pod_ Blue and person.png',
  'nest-s.png': 'Nest/Studio Images/Nest S - Phone Booth/Frame WH/1Booth-WH -DG -Grey1.jpg',
  'nest-m.png': 'Nest/Studio Images/Nest M - Meeting Booth/Frame WH/2Booth-WH -DG -Grey1.jpg',
  'nest-l.png': 'Nest/Studio Images/Nest L - Meeting Booth/Frame WH/4BoothWH-DG-Grey.jpg',
  'nest-xl.png': 'Nest/Studio Images/Nest XL - Meeting Booth/Frame WH/NestXL -DG -1.jpg',
  'nest-s-bk.png': 'Nest/Studio Images/Nest S - Phone Booth/Frame BK/1Booth-BK -DG -Grey1.jpg',
  'nest-m-bk.png': 'Nest/Studio Images/Nest M - Meeting Booth/Frame BK/2Booth-BK -DG -Grey1.jpg',
  'nest-l-bk.png': 'Nest/Studio Images/Nest L - Meeting Booth/Frame BK/4BoothBK-DG-Grey.jpg',
  'nest-xl-bk.png': 'Nest/Studio Images/Nest XL - Meeting Booth/Frame BK/NestXL -DG -2.jpg',
  'nest-s-hi.png': 'Nest/Enviro Images/Website Images/Nest S - Phone Booth/Frame WH/New/1.jpg',
  'nest-s-hi-2.png': 'Nest/Enviro Images/Website Images/Nest S - Phone Booth/Frame WH/New/2.jpg',
}
os.makedirs(DST, exist_ok=True)
pad = 12
for name, rel in items.items():
    p = os.path.join(SRC, rel)
    im = Image.open(p).convert('RGB')
    # anything darker than 246 counts as content
    bg = Image.new('RGB', im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 9 else 0)
    box = diff.getbbox()
    if not box: print('no content', name); continue
    l, t, r, b = box
    l = max(0, l - pad); t = max(0, t - pad); r = min(im.width, r + pad); b = min(im.height, b + pad)
    out = im.crop((l, t, r, b))
    out.save(os.path.join(DST, name), optimize=True)
    print(f"{name:22s} {im.width}x{im.height} -> {out.width}x{out.height}  aspect {out.width/out.height:.3f}")
