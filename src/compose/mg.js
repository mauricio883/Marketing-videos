/* Motion-graphics components (SVG/DOM driven by Comp.seek). */
(function () {
  const { clip, el, EASE } = Comp;
  const NS = 'http://www.w3.org/2000/svg';
  const svg = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const lerp = (a, b, u) => a + (b - a) * u;
  const clamp01 = (u) => Math.max(0, Math.min(1, u));
  // deterministic pseudo-random
  const rnd = (seed) => { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };

  /** Sound-level bars: n bars go from a loud, jittery outside pattern to a calm inside pattern.
   *  o: {from,to,x,y,w,h,n,color,color2,delay,calmAt (local s when bars settle), dur}
   */
  function soundBars(o) {
    const from = o.from, to = o.to, D = to - from;
    const n = o.n || 28, w = o.w || 920, h = o.h || 260, gap = o.gap ?? 10;
    const bw = (w - gap * (n - 1)) / n;
    const root = el('div', '', { left: (o.x ?? 80) + 'px', top: (o.y ?? 900) + 'px', width: w + 'px', height: h + 'px' });
    const s = svg('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}` });
    root.appendChild(s);
    const bars = [];
    const r = rnd(o.seed || 7);
    for (let i = 0; i < n; i++) {
      const rect = svg('rect', { x: i * (bw + gap), y: h / 2, width: bw, height: 0, rx: bw / 2, fill: o.color || '#fff' });
      s.appendChild(rect); bars.push({ rect, phase: r() * 6.28, amp: 0.55 + r() * 0.45, f: 0.8 + r() * 1.6 });
    }
    const calmAt = o.calmAt ?? 1.2, calmDur = o.calmDur ?? 1.0, delay = o.delay ?? 0;
    const tw = { opacity: [[delay, 0], [delay + 0.3, 1]] };
    if (o.exit !== 'none') tw.opacity.push([D - 0.35, 1], [D, 0]);
    return clip({ el: root, from, to, z: o.z ?? 20, tweens: tw, onSeek: (lt) => {
      const u = clamp01((lt - calmAt) / calmDur); const calm = EASE.inOutCubic(u);
      const grow = clamp01((lt - delay) / 0.5);
      bars.forEach((b, i) => {
        const centre = Math.exp(-Math.pow((i - (n - 1) / 2) / (n * 0.28), 2)); // louder in the middle
        const loud = h * (0.25 + 0.75 * centre) * (0.55 + 0.45 * Math.sin(lt * 9 * b.f + b.phase)) * b.amp;
        const quiet = h * (0.06 + 0.06 * centre) * (0.7 + 0.3 * Math.sin(lt * 4 * b.f + b.phase));
        const hh = Math.max(bw, lerp(loud, quiet, calm) * EASE.outCubic(grow));
        b.rect.setAttribute('height', hh.toFixed(2)); b.rect.setAttribute('y', (h / 2 - hh / 2).toFixed(2));
        if (o.color2) b.rect.setAttribute('fill', calm > 0.5 ? o.color2 : (o.color || '#fff'));
      });
    } });
  }

  /** Progress ring (timer). o: {from,to,x,y,size,stroke,color,track,delay,fillDur, label(html), sub(html)} */
  function ring(o) {
    const from = o.from, to = o.to, D = to - from;
    const size = o.size || 360, sw = o.stroke || 22, rr = (size - sw) / 2, C = 2 * Math.PI * rr;
    const root = el('div', '', { left: (o.x ?? 80) + 'px', top: (o.y ?? 800) + 'px', width: size + 'px', height: size + 'px' });
    const s = svg('svg', { width: size, height: size, viewBox: `0 0 ${size} ${size}` });
    s.appendChild(svg('circle', { cx: size / 2, cy: size / 2, r: rr, fill: 'none', stroke: o.track || 'rgba(255,255,255,0.18)', 'stroke-width': sw }));
    const arc = svg('circle', { cx: size / 2, cy: size / 2, r: rr, fill: 'none', stroke: o.color || '#C6D644', 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-dasharray': C, 'stroke-dashoffset': C, transform: `rotate(-90 ${size / 2} ${size / 2})` });
    s.appendChild(arc); root.appendChild(s);
    const label = el('div', 'title', { left: 0, top: 0, width: size + 'px', height: size + 'px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: o.textColor || '#fff', fontSize: (o.fontSize || 88) + 'px', lineHeight: 1, letterSpacing: '-0.03em' });
    label.innerHTML = `<div>${o.label || ''}</div>` + (o.sub ? `<div style="font-size:${o.subSize || 30}px;font-weight:500;letter-spacing:0;margin-top:0.35em">${o.sub}</div>` : '');
    root.appendChild(label);
    const delay = o.delay ?? 0, fillDur = o.fillDur ?? 1.4;
    const tw = { opacity: [[delay, 0], [delay + 0.3, 1]], scale: [[delay, 0.85], [delay + 0.7, 1, 'outBack']] };
    if (o.exit !== 'none') { tw.opacity.push([D - 0.35, 1], [D, 0]); }
    const ease = EASE[o.ease || 'inOutCubic'];
    return clip({ el: root, from, to, z: o.z ?? 20, tweens: tw, onSeek: (lt) => {
      const u = ease(clamp01((lt - delay - 0.2) / fillDur)) * (o.fill ?? 1);
      arc.setAttribute('stroke-dashoffset', (C * (1 - u)).toFixed(2));
      if (o.onProgress) o.onProgress(u, label);
    } });
  }

  /** Horizontal dimension line with end ticks and a label, drawn from the centre outwards. */
  function dimension(o) {
    const from = o.from, to = o.to, D = to - from;
    const w = o.w || 600, h = 60, col = o.color || '#000';
    const root = el('div', '', { left: (o.x ?? 80) + 'px', top: (o.y ?? 1200) + 'px', width: w + 'px', height: h + 'px' });
    const s = svg('svg', { width: w, height: h, viewBox: `0 0 ${w} ${h}` });
    const line = svg('line', { x1: w / 2, y1: h / 2, x2: w / 2, y2: h / 2, stroke: col, 'stroke-width': 4 });
    const t1 = svg('line', { x1: 0, y1: 8, x2: 0, y2: h - 8, stroke: col, 'stroke-width': 4, opacity: 0 });
    const t2 = svg('line', { x1: w, y1: 8, x2: w, y2: h - 8, stroke: col, 'stroke-width': 4, opacity: 0 });
    s.appendChild(line); s.appendChild(t1); s.appendChild(t2); root.appendChild(s);
    const lab = el('div', 'label', { left: 0, top: (h + 6) + 'px', width: w + 'px', textAlign: 'center', fontSize: (o.fontSize || 30) + 'px', color: col, whiteSpace: 'nowrap' });
    lab.innerHTML = o.label || ''; root.appendChild(lab);
    const delay = o.delay ?? 0, dur = o.dur ?? 0.6;
    const tw = { opacity: [[delay, 0], [delay + 0.15, 1]] };
    if (o.exit !== 'none') tw.opacity.push([D - 0.3, 1], [D, 0]);
    return clip({ el: root, from, to, z: o.z ?? 20, tweens: tw, onSeek: (lt) => {
      const u = EASE.outExpo(clamp01((lt - delay) / dur));
      line.setAttribute('x1', (w / 2 - (w / 2) * u).toFixed(2)); line.setAttribute('x2', (w / 2 + (w / 2) * u).toFixed(2));
      t1.setAttribute('opacity', u > 0.95 ? 1 : 0); t2.setAttribute('opacity', u > 0.95 ? 1 : 0);
      lab.style.opacity = clamp01((lt - delay - dur * 0.6) / 0.3).toFixed(3);
      lab.style.transform = `translateY(${(1 - clamp01((lt - delay - dur * 0.6) / 0.3)) * 10}px)`;
    } });
  }

  /** Row of person glyphs that pop in one by one. */
  function people(o) {
    const from = o.from, to = o.to, D = to - from, n = o.n || 1, size = o.size || 44, gap = o.gap ?? 10;
    const root = el('div', '', { left: (o.x ?? 80) + 'px', top: (o.y ?? 1400) + 'px', display: 'flex', gap: gap + 'px', alignItems: 'flex-end' });
    const glyphs = [];
    for (let i = 0; i < n; i++) {
      const g = svg('svg', { width: size, height: size * 1.3, viewBox: '0 0 40 52' });
      g.appendChild(svg('circle', { cx: 20, cy: 12, r: 10, fill: o.color || '#000' }));
      g.appendChild(svg('path', { d: 'M4 52 C4 34, 10 28, 20 28 C30 28, 36 34, 36 52 Z', fill: o.color || '#000' }));
      g.style.transformOrigin = '50% 100%'; root.appendChild(g); glyphs.push(g);
    }
    const delay = o.delay ?? 0, stagger = o.stagger ?? 0.1;
    const tw = { opacity: [[delay, 0], [delay + 0.1, 1]] };
    if (o.exit !== 'none') tw.opacity.push([D - 0.3, 1], [D, 0]);
    return clip({ el: root, from, to, z: o.z ?? 20, tweens: tw, onSeek: (lt) => {
      glyphs.forEach((g, i) => { const u = EASE.outBack(clamp01((lt - delay - i * stagger) / 0.45)); g.style.transform = `scale(${Math.max(0, u).toFixed(3)})`; g.style.opacity = u > 0 ? 1 : 0; });
    } });
  }

  /** Circular badge (certification seal) with two text lines; pops in with a spin. */
  function badge(o) {
    const from = o.from, to = o.to, D = to - from, size = o.size || 220;
    const root = el('div', '', { left: (o.x ?? 80) + 'px', top: (o.y ?? 1200) + 'px', width: size + 'px', height: size + 'px', borderRadius: '50%', border: `4px solid ${o.color || '#fff'}`, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: o.color || '#fff', background: o.bg || 'transparent' });
    root.innerHTML = `<div style="font-weight:700;font-size:${o.fontSize || 30}px;line-height:1.05;letter-spacing:-0.01em;padding:0 14px">${o.line1}</div>` + (o.line2 ? `<div style="font-weight:500;font-size:${o.subSize || 20}px;line-height:1.15;margin-top:8px;padding:0 16px;opacity:0.85">${o.line2}</div>` : '');
    const delay = o.delay ?? 0;
    const tw = { opacity: [[delay, 0], [delay + 0.2, 1]], scale: [[delay, 0.4], [delay + 0.6, 1, 'outBack']], rot: [[delay, -12], [delay + 0.6, 0, 'outCubic']] };
    if (o.exit !== 'none') { tw.opacity.push([D - 0.3, 1], [D, 0]); tw.scale.push([D - 0.3, 1], [D, 0.9]); }
    return clip({ el: root, from, to, z: o.z ?? 20, tweens: tw });
  }

  /** Colour swatch dots with an active indicator ring. */
  function swatches(o) {
    const from = o.from, to = o.to, D = to - from, cols = o.colours, size = o.size || 56, gap = o.gap ?? 26;
    const root = el('div', '', { left: (o.x ?? 80) + 'px', top: (o.y ?? 1500) + 'px', display: 'flex', gap: gap + 'px', alignItems: 'center' });
    const dots = cols.map((c) => { const d = el('div', '', { width: size + 'px', height: size + 'px', borderRadius: '50%', background: c, boxSizing: 'border-box', border: '0px solid #000', transition: 'none' }); root.appendChild(d); return d; });
    const delay = o.delay ?? 0;
    const tw = { opacity: [[delay, 0], [delay + 0.3, 1]] };
    if (o.exit !== 'none') tw.opacity.push([D - 0.3, 1], [D, 0]);
    return clip({ el: root, from, to, z: o.z ?? 20, tweens: tw, onSeek: (lt) => {
      const a = o.active ? o.active(lt) : 0;
      dots.forEach((d, i) => { const on = i === a; d.style.transform = `scale(${on ? 1.25 : 1})`; d.style.outline = on ? `4px solid ${o.ringColor || '#000'}` : 'none'; d.style.outlineOffset = '6px'; });
    } });
  }

  window.MG = { soundBars, ring, dimension, people, badge, swatches };
})();
