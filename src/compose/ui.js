/* Composition helpers built on Comp. All times in seconds; positions in px on the stage. */
(function () {
  const { clip, el, preload, state } = Comp;
  const W = () => state.width, H = () => state.height;

  const fx = {
    fadeIn: (d = 0.4, at = 0) => [[at, 0], [at + d, 1]],
    fade: (from, to, d = 0.4, hold = null) => { const total = to - from; const h = hold === null ? total - 2 * d : hold; return [[0, 0], [d, 1], [total - d, 1], [total, 0]]; },
  };

  /** Solid background. */
  function bg(color, from, to, opts = {}) {
    const e = el('div', 'bg', { background: color });
    return clip({ el: e, from, to, z: opts.z ?? -100, tweens: opts.tweens || {} });
  }

  /** Image plate with Ken Burns. box: {x,y,w,h}; kb: {s0,s1, x0,y0,x1,y1} (px offsets), radius. */
  function image(src, o) {
    const from = o.from, to = o.to;
    const box = o.box || { x: 0, y: 0, w: W(), h: H() };
    const wrap = el('div', 'imgwrap card', { width: box.w + 'px', height: box.h + 'px', borderRadius: (o.radius || 0) + 'px', background: o.bgColor || '#111' });
    wrap.dataset.radius = o.radius || 0;
    const im = el('img', 'img', { width: box.w + 'px', height: box.h + 'px', objectPosition: o.position || '50% 50%' });
    im.src = src; preload(src);
    wrap.appendChild(im);
    const D = to - from;
    const kb = Object.assign({ s0: 1.0, s1: 1.08, x0: 0, y0: 0, x1: 0, y1: 0, ease: 'linear' }, o.kb || {});
    const wtw = Object.assign({ x: [[0, box.x]], y: [[0, box.y]] }, o.tweens || {});
    const wrapClip = clip({ el: wrap, from, to, z: o.z ?? 0, ease: o.ease || 'outExpo', tweens: wtw });
    const inner = { scale: [[0, kb.s0], [D, kb.s1, kb.ease]], x: [[0, kb.x0], [D, kb.x1, kb.ease]], y: [[0, kb.y0], [D, kb.y1, kb.ease]] };
    if (o.innerTweens) Object.assign(inner, o.innerTweens);
    clip({ el: im, parent: wrap, from, to, tweens: inner });
    return wrapClip;
  }

  /** Multi-line title with masked line reveal. lines: array of strings or {text, dot:true, color}. */
  function title(lines, o) {
    const from = o.from, to = o.to;
    const size = o.size || 96;
    const box = el('div', 'title', { left: (o.x ?? 80) + 'px', top: (o.y ?? 200) + 'px', fontSize: size + 'px', color: o.color || '#000', fontWeight: o.weight || 700, textAlign: o.align || 'left', width: o.width ? o.width + 'px' : 'auto' });
    if (o.letterSpacing) box.style.letterSpacing = o.letterSpacing;
    const D = to - from;
    const inD = o.inD ?? 0.75, stagger = o.stagger ?? 0.09, outD = o.outD ?? 0.45;
    const outStart = o.outAt !== undefined ? o.outAt : D - outD;
    const out = [];
    lines.forEach((ln, i) => {
      const spec = typeof ln === 'string' ? { text: ln } : ln;
      const line = el('div', 'line');
      const span = el('span');
      span.innerHTML = spec.html || escapeHtml(spec.text);
      if (spec.dot) span.appendChild(el('i', 'dot'));
      if (spec.color) span.style.color = spec.color;
      if (spec.weight) span.style.fontWeight = spec.weight;
      line.appendChild(span); box.appendChild(line);
      const d0 = i * stagger;
      const tw = { y: [[d0, size * 1.15], [d0 + inD, 0, 'outExpo']], opacity: [[d0, 0], [d0 + inD * 0.35, 1]] };
      if (o.exit !== 'none') {
        const e0 = outStart + i * (o.outStagger ?? 0.04);
        tw.y.push([e0, 0], [e0 + outD, o.exit === 'down' ? size * 1.15 : -size * 1.15, 'inExpo']);
        tw.opacity.push([e0, 1], [e0 + outD * 0.8, 0]);
      }
      out.push(clip({ el: span, parent: line, from, to, tweens: tw }));
    });
    const boxTw = Object.assign({}, o.tweens || {});
    const c = clip({ el: box, from, to, z: o.z ?? 10, tweens: boxTw });
    c.lines = out;
    return c;
  }

  /** Simple text block (body copy), fades/slides in. */
  function text(html, o) {
    const from = o.from, to = o.to, D = to - from;
    const e = el('div', 'body', { left: (o.x ?? 80) + 'px', top: (o.y ?? 400) + 'px', fontSize: (o.size || 40) + 'px', color: o.color || '#000', width: o.width ? o.width + 'px' : 'auto', fontWeight: o.weight || 500, textAlign: o.align || 'left', lineHeight: o.lineHeight || 1.25 });
    e.innerHTML = html;
    const inD = o.inD ?? 0.6, outD = o.outD ?? 0.4, delay = o.delay ?? 0;
    const tw = { opacity: [[delay, 0], [delay + inD, 1]], y: [[delay, o.dy ?? 24], [delay + inD, 0, 'outExpo']] };
    if (o.exit !== 'none') { tw.opacity.push([D - outD, 1], [D, 0]); tw.y.push([D - outD, 0], [D, -(o.dy ?? 24), 'inCubic']); }
    return clip({ el: e, from, to, z: o.z ?? 10, tweens: Object.assign(tw, o.tweens || {}) });
  }

  /** Pill chip with a lime dot. */
  function chip(label, o) {
    const from = o.from, to = o.to, D = to - from;
    const e = el('div', 'chip ' + (o.style || 'on-white'), { left: (o.x ?? 80) + 'px', top: (o.y ?? 800) + 'px', fontSize: (o.size || 34) + 'px', padding: o.padding || '0.42em 0.95em 0.46em 0.8em' });
    if (o.dot !== false) e.appendChild(el('i', 'cd'));
    const s = el('span'); s.innerHTML = label; e.appendChild(s);
    const inD = o.inD ?? 0.55, outD = o.outD ?? 0.35, delay = o.delay ?? 0;
    const tw = { opacity: [[delay, 0], [delay + inD * 0.5, 1]], scale: [[delay, 0.6], [delay + inD, 1, 'outBack']], x: [[delay, -18], [delay + inD, 0, 'outExpo']] };
    if (o.exit !== 'none') { tw.opacity.push([D - outD, 1], [D, 0]); tw.scale.push([D - outD, 1], [D, 0.9, 'inCubic']); }
    return clip({ el: e, from, to, z: o.z ?? 20, tweens: Object.assign(tw, o.tweens || {}) });
  }

  /** Lime rule that grows from left. */
  function rule(o) {
    const from = o.from, to = o.to, D = to - from;
    const e = el('div', 'rule', { left: (o.x ?? 80) + 'px', top: (o.y ?? 300) + 'px', width: (o.w || 200) + 'px', height: (o.h || 10) + 'px', borderRadius: '999px', background: o.color || 'var(--lime)' });
    const inD = o.inD ?? 0.6, outD = o.outD ?? 0.3, delay = o.delay ?? 0;
    const tw = { sx: [[delay, 0], [delay + inD, 1, 'outExpo']] };
    if (o.exit !== 'none') tw.sx.push([D - outD, 1], [D, 0, 'inExpo']);
    return clip({ el: e, from, to, z: o.z ?? 15, tweens: tw });
  }

  /** Logo (SVG file). variant: black|white|lime|black-on-lime|white-slogan|black-slogan */
  function logo(variant, o) {
    const src = `../../assets/brand/logo/logo-${variant}.svg`;
    const e = el('img', 'logo', { left: (o.x ?? 80) + 'px', top: (o.y ?? 100) + 'px', width: (o.w || 300) + 'px' });
    e.src = src; preload(src);
    const from = o.from, to = o.to, D = to - from;
    const inD = o.inD ?? 0.6, outD = o.outD ?? 0.3, delay = o.delay ?? 0;
    const tw = { opacity: [[delay, 0], [delay + inD, 1]], y: [[delay, o.dy ?? 12], [delay + inD, 0, 'outExpo']] };
    if (o.exit !== 'none') { tw.opacity.push([D - outD, 1], [D, 0]); }
    return clip({ el: e, from, to, z: o.z ?? 50, tweens: Object.assign(tw, o.tweens || {}) });
  }

  /** Animated number: counts from a to b; format(v) -> html. */
  function counter(o) {
    const from = o.from, to = o.to, D = to - from;
    const e = el('div', 'title', { left: (o.x ?? 80) + 'px', top: (o.y ?? 600) + 'px', fontSize: (o.size || 260) + 'px', color: o.color || '#fff', letterSpacing: '-0.04em', lineHeight: 1 });
    const inD = o.inD ?? 1.2, outD = o.outD ?? 0.4, delay = o.delay ?? 0;
    const tw = { opacity: [[delay, 0], [delay + 0.3, 1]], y: [[delay, 40], [delay + 0.9, 0, 'outExpo']] };
    if (o.exit !== 'none') { tw.opacity.push([D - outD, 1], [D, 0]); tw.y.push([D - outD, 0], [D, -30, 'inCubic']); }
    const ease = Comp.EASE[o.ease || 'outQuint'];
    return clip({ el: e, from, to, z: o.z ?? 20, tweens: tw, onSeek: (lt) => { const u = Math.min(1, Math.max(0, (lt - delay) / inD)); const v = o.a + (o.b - o.a) * ease(u); e.innerHTML = o.format ? o.format(v) : Math.round(v); } });
  }

  /** Frame-sequence video plate: frames at `${dir}/f%05d.jpg` (natural size fw x fh, e.g. 1440x1920) shown in box (default full stage).
   *  offset = seconds into the extracted window at clip start; pan: [x0,x1] horizontal offset of the frame inside the box (px, <=0);
   *  kb: {s0,s1} scale push. speed: playback multiplier. count: number of frames available. */
  function video(dir, o) {
    const from = o.from, to = o.to, D = to - from;
    const box = o.box || { x: 0, y: 0, w: W(), h: H() };
    const fw = o.fw || 1440, fh = o.fh || 1920;
    const wrap = el('div', 'imgwrap card', { width: box.w + 'px', height: box.h + 'px', borderRadius: (o.radius || 0) + 'px', background: '#000' });
    wrap.dataset.radius = o.radius || 0;
    const im = el('img', 'img', { width: fw + 'px', height: fh + 'px', objectFit: 'fill' });
    wrap.appendChild(im);
    const fps = o.fps || 25, offset = o.offset || 0, count = o.count || 1e9, speed = o.speed || 1;
    const pad = (n) => String(n).padStart(5, '0');
    let last = -1;
    const kb = Object.assign({ s0: 1.0, s1: 1.0, ease: 'linear' }, o.kb || {});
    const pan = o.pan || [-(fw - box.w) / 2, -(fw - box.w) / 2];
    const py = o.py || [-(fh - box.h) / 2, -(fh - box.h) / 2];
    const wrapClip = clip({ el: wrap, from, to, z: o.z ?? 0, ease: o.ease || 'outExpo', tweens: Object.assign({ x: [[0, box.x]], y: [[0, box.y]] }, o.tweens || {}) });
    const inner = Object.assign({ scale: [[0, kb.s0], [D, kb.s1, kb.ease]], x: [[0, pan[0]], [D, pan[1], o.panEase || 'linear']], y: [[0, py[0]], [D, py[1], o.panEase || 'linear']] }, o.innerTweens || {});
    clip({ el: im, parent: wrap, from, to, tweens: inner, onSeek: (lt) => {
      const idx = Math.min(count - 1, Math.max(0, Math.floor((offset + lt * speed) * fps)));
      if (idx === last) return null;
      last = idx;
      im.src = `${dir}/f${pad(idx + 1)}.jpg`;
      return im.decode().catch(() => {});
    } });
    // transform origin at the box centre so scale pushes in around the visible centre
    im.style.transformOrigin = `${(-pan[0] + box.w / 2)}px ${(-py[0] + box.h / 2)}px`;
    return wrapClip;
  }

  /** Gradient scrim for text legibility over footage. dir: 'bottom' (dark at bottom) | 'top' | 'full'. */
  function scrim(o) {
    const from = o.from, to = o.to, D = to - from;
    const col = o.color || '0,0,0', a = o.alpha ?? 0.6;
    let bg;
    if (o.dir === 'top') bg = `linear-gradient(180deg, rgba(${col},${a}) 0%, rgba(${col},${a * 0.6}) 40%, rgba(${col},0) 100%)`;
    else if (o.dir === 'full') bg = `rgba(${col},${a})`;
    else bg = `linear-gradient(0deg, rgba(${col},${a}) 0%, rgba(${col},${a * 0.7}) 35%, rgba(${col},0) 100%)`;
    const h = o.h || (o.dir === 'full' ? H() : 1000);
    const top = o.dir === 'top' ? 0 : H() - h;
    const e = el('div', '', { width: W() + 'px', height: h + 'px', top: top + 'px', background: bg });
    const tw = { opacity: [[0, o.fadeIn ? 0 : 1], [o.fadeIn || 0.01, 1]] };
    if (o.fadeOut) tw.opacity.push([D - o.fadeOut, 1], [D, 0]);
    return clip({ el: e, from, to, z: o.z ?? 5, tweens: tw });
  }

  /** Product cut-out image (on white) that slides in; box {x,y,w,h}. */
  function product(src, o) {
    const from = o.from, to = o.to, D = to - from;
    const e = el('img', 'img', { width: o.w + 'px', height: (o.h || 'auto') === 'auto' ? 'auto' : o.h + 'px', objectFit: 'contain', left: o.x + 'px', top: o.y + 'px' });
    e.src = src; preload(src);
    const inD = o.inD ?? 0.8, outD = o.outD ?? 0.4, delay = o.delay ?? 0;
    const tw = { opacity: [[delay, 0], [delay + inD * 0.5, 1]], y: [[delay, o.dy ?? 60], [delay + inD, 0, 'outExpo']], scale: [[delay, o.s0 ?? 0.96], [delay + inD, o.s1 ?? 1, 'outExpo']] };
    if (o.exit !== 'none') { tw.opacity.push([D - outD, 1], [D, 0]); tw.y.push([D - outD, 0], [D, -(o.dy ?? 60) * 0.5, 'inCubic']); }
    return clip({ el: e, from, to, z: o.z ?? 5, tweens: Object.assign(tw, o.tweens || {}) });
  }

  /** Full-stage wipe transition: a coloured panel sweeps across between t0 and t1. dir: 'up'|'left'. */
  function wipe(color, t0, t1, o = {}) {
    const e = el('div', 'bg', { background: color });
    const dur = t1 - t0, half = dur / 2;
    const tw = o.dir === 'left'
      ? { x: [[0, W()], [half, 0, 'inOutExpo'], [dur, -W(), 'inOutExpo']] }
      : { y: [[0, H()], [half, 0, 'inOutExpo'], [dur, -H(), 'inOutExpo']] };
    return clip({ el: e, from: t0, to: t1, z: o.z ?? 90, tweens: tw });
  }

  /** Dot progress: n dots, active index highlighted. */
  function dots(n, active, o) {
    const from = o.from, to = o.to, D = to - from;
    const e = el('div', '', { left: (o.x ?? 80) + 'px', top: (o.y ?? 1800) + 'px', display: 'flex', gap: (o.gap || 14) + 'px' });
    for (let i = 0; i < n; i++) e.appendChild(el('i', '', { display: 'block', width: (o.size || 14) + 'px', height: (o.size || 14) + 'px', borderRadius: '50%', background: i === active ? 'var(--lime)' : (o.idle || 'rgba(0,0,0,0.18)') }));
    const tw = { opacity: [[0, 0], [0.4, 1], [D - 0.3, 1], [D, 0]] };
    return clip({ el: e, from, to, z: o.z ?? 40, tweens: tw });
  }

  function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  window.UI = { bg, image, video, scrim, title, text, chip, rule, logo, counter, product, wipe, dots, fx };
})();
