#!/usr/bin/env node
/* Frame-by-frame renderer: Chromium (Playwright) draws each frame of a composition, ffmpeg encodes.
 * Usage: node src/render.mjs --scene pods-hero [--w 1080 --h 1920 --fps 30 --zoom 1 --workers 3]
 *        [--out out/pods-hero.mp4] [--start 0 --end 10] [--still 4.2 --png out/still.png] [--sheet 1.0]
 */
import { createRequire } from 'module';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
const require = createRequire(import.meta.url);
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => a.startsWith('--') ? [a.slice(2), (arr[i + 1] && !arr[i + 1].startsWith('--')) ? arr[i + 1] : true] : []).filter(Boolean));
const scene = args.scene || 'pods-hero';
const W = +(args.w || 1080), H = +(args.h || 1920), fps = +(args.fps || 30), zoom = +(args.zoom || 1);
const workers = +(args.workers || Math.max(1, Math.min(4, os.cpus().length - 1)));
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const FF = process.env.FFMPEG || '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';
const pageUrl = `file://${root}/src/compose/index.html?scene=${scene}&w=${W}&h=${H}&fps=${fps}&media=${args.media || '../../media/src'}`;

async function openPage(browser) {
  const ctx = await browser.newContext({ viewport: { width: Math.round(W * zoom), height: Math.round(H * zoom) }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.error('[page]', m.text()); });
  await page.goto(pageUrl);
  await page.waitForFunction(() => window.__ready || window.__error, null, { timeout: 120000 });
  const err = await page.evaluate(() => window.__error);
  if (err) throw new Error('scene error: ' + err);
  if (zoom !== 1) await page.evaluate((z) => { document.getElementById('stage').style.zoom = String(z); }, zoom);
  const info = await page.evaluate(() => window.__info);
  return { page, ctx, info };
}

async function shot(page, t, file, type = 'png') {
  await page.evaluate((tt) => window.__seek(tt), t);
  await page.screenshot({ path: file, type, quality: type === 'jpeg' ? 95 : undefined, fullPage: false });
}

function run(cmd, argv) {
  return new Promise((res, rej) => { const p = spawn(cmd, argv, { stdio: ['ignore', 'inherit', 'inherit'] }); p.on('exit', (c) => (c === 0 ? res() : rej(new Error(cmd + ' exited ' + c)))); });
}

(async () => {
  const browser = await chromium.launch({ args: ['--font-render-hinting=none', '--disable-gpu', '--hide-scrollbars'] });
  try {
    const first = await openPage(browser);
    const dur = first.info.duration;
    console.log(`scene=${scene} duration=${dur}s size=${W}x${H}@${fps} zoom=${zoom} clips=${first.info.clips}`);

    if (args.still !== undefined) {
      const t = +args.still;
      const outFile = args.png || `out/still_${scene}_${t}.png`;
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      await shot(first.page, t, outFile);
      console.log('still ->', outFile);
      return;
    }
    if (args.sheet !== undefined) {
      // contact sheet: one frame every `sheet` seconds, tiled by ffmpeg
      const step = +args.sheet || 1;
      const dir = `out/sheet_${scene}`; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
      let n = 0;
      for (let t = 0; t < dur; t += step) { await shot(first.page, t, `${dir}/s${String(n++).padStart(4, '0')}.png`, 'png'); }
      const cols = +(args.cols || 6);
      const outFile = `out/sheet_${scene}.jpg`;
      await run(FF, ['-hide_banner', '-loglevel', 'error', '-y', '-framerate', '1', '-i', `${dir}/s%04d.png`, '-vf', `scale=${Math.round(W * zoom / 3)}:-1,tile=${cols}x${Math.ceil(n / cols)}:padding=6:color=0x333333`, '-frames:v', '1', '-q:v', '3', outFile]);
      console.log(`sheet (${n} frames, every ${step}s) ->`, outFile);
      return;
    }

    const start = +(args.start || 0), end = Math.min(dur, +(args.end || dur));
    const total = Math.round((end - start) * fps);
    const framesDir = path.join(root, 'frames', scene); fs.rmSync(framesDir, { recursive: true, force: true }); fs.mkdirSync(framesDir, { recursive: true });
    const pages = [first];
    for (let i = 1; i < workers; i++) pages.push(await openPage(browser));
    const t0 = Date.now(); let done = 0;
    await Promise.all(pages.map(async (p, k) => {
      for (let f = k; f < total; f += pages.length) {
        const t = start + f / fps;
        await shot(p.page, t, `${framesDir}/f${String(f + 1).padStart(5, '0')}.png`);
        done++;
        if (done % 60 === 0) process.stdout.write(`\r${done}/${total} frames (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
      }
    }));
    console.log(`\nrendered ${total} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    const outFile = args.out || `out/${scene}_${W}x${H}.mp4`;
    fs.mkdirSync(path.dirname(path.resolve(outFile)), { recursive: true });
    const crf = args.crf || '17';
    await run(FF, ['-hide_banner', '-loglevel', 'error', '-y', '-framerate', String(fps), '-i', `${framesDir}/f%05d.png`,
      '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
      '-c:v', 'libx264', '-preset', args.preset || 'slow', '-crf', crf, '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1',
      '-x264-params', 'keyint=60:min-keyint=30', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
      '-c:a', 'aac', '-b:a', '96k', '-shortest', '-movflags', '+faststart', outFile]);
    const sz = fs.statSync(outFile).size;
    console.log(`encoded -> ${outFile} (${(sz / 1e6).toFixed(1)} MB)`);
    if (!args.keepFrames) fs.rmSync(framesDir, { recursive: true, force: true });
  } finally { await browser.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
