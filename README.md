# JasonL — office pods video campaign (Dune + Nest)

Motion-graphics pipeline for social video (9:16, 1:1, 16:9) built from the product imagery
and footage in the shared Drive folder. No external video editor: compositions are HTML/CSS/JS
rendered frame by frame in Chromium and encoded with ffmpeg.

## Layout

- `src/compose/engine.js` — deterministic timeline: everything is driven by `Comp.seek(t)`.
- `src/compose/ui.js` — building blocks: backgrounds, image plates with Ken Burns, frame-sequence video plates,
  masked title reveals, chips, rules, logo, counters, wipes.
- `src/compose/scenes/*.js` — one file per film (storyboard + copy).
- `src/render.mjs` — Playwright renderer + ffmpeg encoder (`--sheet`, `--still` for QA).
- `src/tools/` — asset prep (render trimming, later: frame extraction from footage).
- `assets/brand/` — Poppins (4 weights) and official logo SVGs from the JasonL brand kit.
- `media/` — heavy media (git-ignored). `media/src` → source images, `media/derived` → trimmed renders.
- `out/` — renders (git-ignored).

## Render

```bash
node src/render.mjs --scene pods-hero --sheet 1            # contact sheet, one frame per second
node src/render.mjs --scene pods-hero --still 5.2          # single full-res frame
node src/render.mjs --scene pods-hero --workers 3 --out out/jasonl_pods_hero_9x16_v1.mp4
```

Output: H.264 High, yuv420p, CRF 17, 30 fps, silent AAC track for platform compatibility.

## Brand rules applied

Poppins only, sentence case, British English, 90/10 colour rule (white/black with lime accents),
official logo files untouched, no gradients on brand surfaces, safe zones kept clear for Reels/TikTok UI.
