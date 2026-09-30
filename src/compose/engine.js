/* Deterministic timeline engine for frame-by-frame rendering in Chromium.
 * Everything is driven by Comp.seek(t): no requestAnimationFrame, no wall clock.
 */
(function () {
  const EASE = {
    linear: (t) => t,
    inQuad: (t) => t * t,
    outQuad: (t) => 1 - (1 - t) * (1 - t),
    inOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inCubic: (t) => t * t * t,
    inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    outQuart: (t) => 1 - Math.pow(1 - t, 4),
    outQuint: (t) => 1 - Math.pow(1 - t, 5),
    inOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2),
    outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    inExpo: (t) => (t <= 0 ? 0 : Math.pow(2, 10 * t - 10)),
    inOutExpo: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2),
    outBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    outBackSoft: (t) => { const c1 = 0.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  };

  const clamp01 = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);

  /** keys: [[t, value, easeName?], ...] sorted by t (seconds, relative to clip start). */
  function interp(keys, t, defEase) {
    if (!keys || !keys.length) return undefined;
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        const [t0, v0] = keys[i - 1];
        const [t1, v1, e] = keys[i];
        const u = t1 === t0 ? 1 : (t - t0) / (t1 - t0);
        const f = (EASE[e || defEase] || EASE.outCubic)(clamp01(u));
        return v0 + (v1 - v0) * f;
      }
    }
    return keys[keys.length - 1][1];
  }

  const clips = [];
  const state = { width: 1080, height: 1920, fps: 30, duration: 10, t: 0 };
  const preloads = [];
  const frameLoaders = [];

  function stage() { return document.getElementById('stage'); }

  function el(tag, cls, style) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (style) Object.assign(e.style, style);
    return e;
  }

  /** Register a clip. props tweened: x,y (px), scale, sx, sy, rot (deg), opacity, blur (px), bright, w,h (px), clipT/clipR/clipB/clipL (px inset), ry (mask reveal, %). */
  function clip(spec) {
    const c = Object.assign({ from: 0, to: state.duration, tweens: {}, ease: 'outCubic', z: 0 }, spec);
    if (!c.el.parentNode) (c.parent || stage()).appendChild(c.el);
    c.el.style.zIndex = String(c.z);
    c.el.style.willChange = 'transform, opacity';
    clips.push(c);
    return c;
  }

  function applyStyle(e, s) {
    const tr = [];
    if (s.x !== undefined || s.y !== undefined) tr.push(`translate(${(s.x || 0).toFixed(3)}px, ${(s.y || 0).toFixed(3)}px)`);
    if (s.rot !== undefined) tr.push(`rotate(${s.rot.toFixed(4)}deg)`);
    if (s.scale !== undefined) tr.push(`scale(${s.scale.toFixed(5)})`);
    if (s.sx !== undefined || s.sy !== undefined) tr.push(`scale(${(s.sx === undefined ? 1 : s.sx).toFixed(5)}, ${(s.sy === undefined ? 1 : s.sy).toFixed(5)})`);
    if (tr.length) e.style.transform = tr.join(' ');
    if (s.opacity !== undefined) e.style.opacity = clamp01(s.opacity).toFixed(4);
    const filters = [];
    if (s.blur !== undefined && s.blur > 0.01) filters.push(`blur(${s.blur.toFixed(2)}px)`);
    if (s.bright !== undefined) filters.push(`brightness(${s.bright.toFixed(3)})`);
    if (s.sat !== undefined) filters.push(`saturate(${s.sat.toFixed(3)})`);
    e.style.filter = filters.length ? filters.join(' ') : 'none';
    if (s.w !== undefined) e.style.width = `${s.w.toFixed(2)}px`;
    if (s.h !== undefined) e.style.height = `${s.h.toFixed(2)}px`;
    if (s.clipT !== undefined || s.clipR !== undefined || s.clipB !== undefined || s.clipL !== undefined) {
      e.style.clipPath = `inset(${(s.clipT || 0).toFixed(2)}px ${(s.clipR || 0).toFixed(2)}px ${(s.clipB || 0).toFixed(2)}px ${(s.clipL || 0).toFixed(2)}px round ${s.clipRadius !== undefined ? s.clipRadius : (e.dataset.radius || 0)}px)`;
    }
  }

  async function seek(t) {
    state.t = t;
    const pending = [];
    for (const c of clips) {
      const vis = t >= c.from && t < c.to;
      if (!vis) { c.el.style.visibility = 'hidden'; continue; }
      c.el.style.visibility = 'visible';
      const lt = t - c.from;
      const s = {};
      for (const p in c.tweens) s[p] = interp(c.tweens[p], lt, c.ease);
      applyStyle(c.el, s);
      if (c.onSeek) { const r = c.onSeek(lt, t, c.el, s); if (r && r.then) pending.push(r); }
    }
    if (pending.length) await Promise.all(pending);
    return true;
  }

  function preload(src) {
    const p = new Promise((res) => {
      const im = new Image();
      im.onload = () => im.decode().then(res, res);
      im.onerror = () => { console.warn('preload failed', src); res(); };
      im.src = src;
    });
    preloads.push(p);
    return p;
  }

  async function ready() {
    await document.fonts.ready;
    await Promise.all(preloads);
    return true;
  }

  window.Comp = { EASE, interp, clip, el, seek, ready, preload, state, clips, stage };
})();
