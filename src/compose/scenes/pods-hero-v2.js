/* Hero film v2 — Dune + Nest, 9:16, footage-led, cut to "Werq" (125 bpm). British English, sentence case. */
window.buildScene = function ({ W, H, media, UI, MG, Comp }) {
  const D = (p) => `${media}/../derived/${p}`;
  const F = (id) => `${media}/../../frames/${id}`;
  const LIME = '#C6D644', BLACK = '#000', WHITE = '#fff';
  const BEAT = 0.4789, PH = 0.04;                 // music grid
  const b = (k) => PH + k * BEAT;                 // time of beat k
  const AR = { duneShadow: 0.542, duneOat: 0.542, duneOlive: 0.540, duneOlive2: 0.600, nestS: 0.568, nestM: 0.773, nestL: 0.980, nestXL: 1.145 };
  const R = { duneShadow: D('dune-shadow.png'), duneOat: D('dune-oat.png'), duneOlive: D('dune-olive.png'), duneOlive2: D('dune-olive-2.png'), nestS: D('nest-s.png'), nestM: D('nest-m.png'), nestL: D('nest-l.png'), nestXL: D('nest-xl.png') };
  const dB = (v) => `${Math.round(v)}<span style="font-size:0.42em;font-weight:600;letter-spacing:-0.02em;margin-left:0.12em">dB</span>`;
  const logoW = (a, bb) => UI.logo('white', { from: a, to: bb, x: 80, y: 150, w: 200, exit: 'none', inD: 0.01, z: 60 });
  const logoB = (a, bb) => UI.logo('black', { from: a, to: bb, x: 80, y: 150, w: 200, exit: 'none', inD: 0.01, z: 60 });

  // ---------- 1. Hook: busy office, beats 0-7 ----------
  {
    const a = 0, e = b(8);
    UI.bg(BLACK, a, e);
    UI.video(F('n_office'), { from: a, to: e, count: 201, offset: 0.2, pan: [-360, -120], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.5], [0.6, 0.85]] } });
    UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.7, h: 1100 });
    logoW(a + 0.2, e);
    UI.title(['Can\'t hear', 'yourself think?'], { from: b(0) + 0.1, to: e, x: 80, y: 1080, size: 112, color: WHITE, outAt: b(7) - b(0) - 0.1, exit: 'up' });
    UI.title([{ text: 'Sorted', dot: true }], { from: b(3), to: e, x: 80, y: 1360, size: 150, color: LIME, inD: 0.5, outAt: b(7) - b(3) - 0.1 });
  }
  UI.wipe(LIME, b(7) + 0.1, b(8) + 0.45, { z: 95 });

  // ---------- 2. Meet Dune: beats 8-15 ----------
  {
    const a = b(8), e = b(16);
    UI.bg(WHITE, a, e);
    UI.video(F('ad_open'), { from: a, to: e, count: 201, offset: 2.0, pan: [-240, -160], kb: { s0: 1.0, s1: 1.05 } });
    UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.62, h: 1150 });
    logoW(a, e);
    UI.title([{ text: 'Meet Dune', dot: true }], { from: a + 0.25, to: e, x: 80, y: 1120, size: 132, color: WHITE, outAt: b(15) - a - 0.1 });
    UI.text('One person. Zero distractions.', { from: b(9), to: e, x: 80, y: 1290, size: 44, color: WHITE, weight: 500, outD: 0.3 });
    UI.chip('Single acoustic office pod', { from: b(10), to: e, x: 80, y: 1420, size: 32, style: 'lime' });
  }

  // ---------- 3. Dune features: 4 cuts x 2 beats, beats 16-23 ----------
  {
    const cuts = [
      { clip: 'ad_panel', count: 101, offset: 1.7, title: 'Everything at your fingertips', chip: 'Touch-screen controls', pan: [-180, -180], kb: { s0: 1.0, s1: 1.08 } },
      { clip: 'dp_light', count: 101, offset: 0.6, title: 'Light that\'s easy on the eyes', chip: 'Flicker-free LED · CRI above 90', pan: [-180, -180], kb: { s0: 1.02, s1: 1.1 } },
      { clip: 'dp_seat', count: 101, offset: 2.1, title: 'Soft where it matters', chip: 'Natural timber · soft upholstery', pan: [-180, -180], kb: { s0: 1.0, s1: 1.08 } },
      { clip: 'ad_laptop', count: 126, offset: 0.3, title: 'Built for calls and deep work', chip: 'Dual GPO · USB-A · USB-C', pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 } },
    ];
    cuts.forEach((c, i) => {
      const a = b(16 + i * 2), e = b(18 + i * 2);
      UI.video(F(c.clip), { from: a, to: e + 0.02, count: c.count, offset: c.offset, pan: c.pan, kb: c.kb, z: i });
      UI.scrim({ from: a, to: e + 0.02, dir: 'bottom', alpha: 0.65, h: 900, z: 5 + i });
      logoW(a, e);
      UI.title([c.title], { from: a + 0.04, to: e, x: 80, y: 1230, size: 64, color: WHITE, inD: 0.5, outAt: 99, z: 10 + i });
      UI.chip(c.chip, { from: a + 0.2, to: e, x: 80, y: 1360, size: 32, style: 'on-black', exit: 'none', z: 10 + i });
      UI.dots(4, i, { from: a, to: e, x: 80, y: 1500, idle: 'rgba(255,255,255,0.35)', z: 10 + i });
    });
  }

  // ---------- 4. Dune acoustics: beats 24-31 ----------
  {
    const a = b(24), e = b(32);
    UI.bg(BLACK, a, e);
    UI.video(F('ad_sit'), { from: a, to: e, count: 126, offset: 1.5, pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.5], [1.2, 0.5], [2.0, 0.3]] } });
    UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.4 });
    logoW(a, e);
    UI.text('Sound insulation', { from: a + 0.1, to: e, x: 80, y: 520, size: 44, color: WHITE, weight: 500 });
    UI.counter({ from: a + 0.1, to: e, x: 68, y: 590, size: 330, a: 0, b: 29, inD: 1.4, color: WHITE, format: dB });
    MG.soundBars({ from: a, to: e, x: 80, y: 980, w: 920, h: 300, n: 30, color: '#ffffff', color2: LIME, calmAt: b(26) - a, calmDur: 0.9, delay: 0.05 });
    UI.text('Outside noise', { from: a + 0.2, to: b(26) + 0.5, x: 80, y: 1310, size: 34, color: 'rgba(255,255,255,0.75)', weight: 500, outD: 0.3, inD: 0.3 });
    UI.text('Inside Dune', { from: b(26) + 0.5, to: e, x: 80, y: 1310, size: 34, color: LIME, weight: 600, inD: 0.3 });
    UI.text('Tested to ISO 23351-1', { from: b(27), to: e, x: 80, y: 1400, size: 36, color: WHITE, weight: 400 });
    ['Layered acoustic walls', 'PVB laminated glass', 'PET acoustic felt inside'].forEach((ch, k) => UI.chip(ch, { from: b(28) + k * 0.16, to: e, x: 80, y: 1500 + k * 86, size: 30, style: 'on-black' }));
  }

  // ---------- 5. Dune colours (white): beats 32-39 ----------
  {
    const a = b(32), e = b(40);
    UI.wipe(WHITE, a - 0.3, a + 0.3, { z: 95 });
    UI.bg(WHITE, a, e);
    logoB(a, e);
    UI.title(['Pick your colour.'], { from: a + 0.1, to: e, x: 80, y: 300, size: 96, color: BLACK, outAt: b(39) - a });
    UI.text('Three fabrics. Natural timber.', { from: a + 0.4, to: e, x: 80, y: 430, size: 40, color: BLACK, weight: 400 });
    const pods = ['duneShadow', 'duneOat', 'duneOlive'];
    const ph = 1120, pw = Math.round(ph * 0.542), px = 540 - pw / 2 + 60, py = 520;
    const seg = (e - a - 0.6) / 3;
    pods.forEach((k, i) => {
      const s0 = a + i * seg, e0 = (i === 2) ? e : s0 + seg + 0.35;
      UI.product(R[k], { from: s0, to: e0, x: px, y: py, w: pw, h: ph, inD: 0.45, outD: 0.3, dy: 0, s0: 1.0, s1: 1.0, exit: i === 2 ? 'none' : undefined,
        tweens: { opacity: [[0, 0], [0.35, 1], [e0 - s0 - 0.35, 1], [e0 - s0, i === 2 ? 1 : 0]], x: [[0, 40], [0.6, 0, 'outExpo']], y: [[0, 0]], scale: [[0, 1]] } });
    });
    MG.swatches({ from: a + 0.3, to: e, x: 80, y: 1500, colours: ['#5B5B5B', '#D9CFC0', '#8E9B72'], size: 54, gap: 30, ringColor: BLACK, active: (lt) => Math.min(2, Math.floor(Math.max(0, lt - 0.3) / seg)) });
    UI.chip('Moves on concealed wheels', { from: b(36), to: e, x: 80, y: 1600, size: 30, style: 'on-white' });
  }

  // ---------- 6. Set up in under an hour: beats 40-43 ----------
  {
    const a = b(40), e = b(44);
    UI.bg(BLACK, a, e);
    UI.video(F('dp_arch'), { from: a, to: e, count: 151, offset: 0.9, pan: [-200, -160], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.75]] } });
    UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.6, h: 1000 });
    logoW(a, e);
    MG.ring({ from: a, to: e, x: 80, y: 540, size: 330, stroke: 20, color: LIME, delay: 0.05, fillDur: 1.1, label: '&lt;1h', fontSize: 84, sub: 'set-up', subSize: 26, textColor: WHITE });
    UI.title(['Set up in', 'under an hour.'], { from: a + 0.15, to: e, x: 80, y: 1180, size: 84, color: WHITE, outAt: 99 });
    UI.chip('Modular · fits through tight spaces', { from: a + 0.6, to: e, x: 80, y: 1400, size: 30, style: 'on-black', exit: 'none' });
  }

  // ---------- 7. Bridge: Need room for the team? beats 44-47 ----------
  {
    const a = b(44), e = b(48);
    UI.bg(BLACK, a, e);
    UI.video(F('n_desks'), { from: a, to: e, count: 151, offset: 0.5, pan: [-360, -240], kb: { s0: 1.0, s1: 1.05 }, innerTweens: { bright: [[0, 0.4]] } });
    UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.35 });
    UI.title(['Need room', 'for the team?'], { from: a + 0.1, to: e, x: 80, y: 760, size: 120, color: WHITE, outAt: b(47) - a - 0.05 });
  }
  UI.wipe(LIME, b(47) + 0.1, b(48) + 0.45, { z: 95 });

  // ---------- 8. Meet Nest: beats 48-55 ----------
  {
    const a = b(48), e = b(56);
    UI.bg(BLACK, a, e);
    UI.video(F('n_orbit'), { from: a, to: e, count: 201, offset: 4.0, pan: [-180, -180], kb: { s0: 1.0, s1: 1.05 } });
    UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.62, h: 1150 });
    logoW(a, e);
    UI.title([{ text: 'Meet Nest', dot: true }], { from: a + 0.25, to: e, x: 80, y: 1120, size: 132, color: WHITE, outAt: b(55) - a - 0.1 });
    UI.text('Phone booth to meeting room.', { from: b(49), to: e, x: 80, y: 1290, size: 44, color: WHITE, weight: 500, outD: 0.3 });
    UI.chip('Acoustic office pod range', { from: b(50), to: e, x: 80, y: 1420, size: 32, style: 'lime' });
  }

  // ---------- 9. Nest sizes (white): beats 56-63 ----------
  {
    const a = b(56), e = b(64);
    UI.wipe(WHITE, a - 0.3, a + 0.3, { z: 95 });
    UI.bg(WHITE, a, e);
    logoB(a, e);
    UI.title(['One to six people.'], { from: a + 0.1, to: e, x: 80, y: 300, size: 96, color: BLACK, outAt: b(63) - a });
    UI.text('Four sizes. Same quiet.', { from: a + 0.4, to: e, x: 80, y: 430, size: 40, color: BLACK, weight: 400 });
    const sizes = [
      { key: 'nestS', label: 'Nest S', n: 1, mm: 'W 1080 mm' },
      { key: 'nestM', label: 'Nest M', n: 2, mm: 'W 1600 mm' },
      { key: 'nestL', label: 'Nest L', n: 4, mm: 'W 2300 mm' },
      { key: 'nestXL', label: 'Nest XL', n: 6, mm: 'W 2600 mm' },
    ];
    const ph = 780, each = 2 * BEAT;
    sizes.forEach((s, i) => {
      const s0 = a + i * each, e0 = (i === 3) ? e : s0 + each + 0.15;
      const pw = Math.round(ph * AR[s.key]);
      const x = 540 - pw / 2;
      UI.product(R[s.key], { from: s0, to: e0, x, y: 560, w: pw, h: ph, inD: 0.45, outD: 0.2, dy: 20, s0: 0.9, s1: 1, exit: i === 3 ? 'none' : undefined });
      MG.dimension({ from: s0, to: e0, x, y: 1360, w: pw, label: s.mm, delay: 0.15, dur: 0.5, exit: i === 3 ? 'none' : undefined });
      UI.chip(`${s.label}`, { from: s0 + 0.05, to: e0, x: 80, y: 1480, size: 36, style: 'on-white', inD: 0.4, outD: 0.2, exit: i === 3 ? 'none' : undefined });
      MG.people({ from: s0, to: e0, x: 300, y: 1478, n: s.n, size: 34, gap: 6, delay: 0.2, stagger: 0.07, exit: i === 3 ? 'none' : undefined });
    });
  }

  // ---------- 10. Nest features: 4 cuts x 2 beats, beats 64-71 ----------
  {
    const cuts = [
      { clip: 'n_ledpan', count: 151, offset: 3.0, title: 'Fresh air in three minutes', chip: 'Low-noise turbo fan', pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, ring: { label: '3', sub: 'min' } },
      { clip: 'an_outlet', count: 101, offset: 1.0, title: 'Power where you need it', chip: 'Dual GPO · USB-A · USB-C', pan: [-180, -180], kb: { s0: 1.0, s1: 1.08 } },
      { clip: 'n_handle', count: 151, offset: 2.0, title: 'Sound-blocking door frames', chip: 'Laminated glass · 5 + 5 mm', pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 } },
      { clip: 'an_touch', count: 101, offset: 1.5, title: 'Swap panels. Swap colours.', chip: 'Replaceable acoustic panels', pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 } },
    ];
    cuts.forEach((c, i) => {
      const a = b(64 + i * 2), e = b(66 + i * 2);
      UI.video(F(c.clip), { from: a, to: e + 0.02, count: c.count, offset: c.offset, pan: c.pan, kb: c.kb, z: i });
      UI.scrim({ from: a, to: e + 0.02, dir: 'bottom', alpha: 0.65, h: 900, z: 5 + i });
      logoW(a, e);
      UI.title([c.title], { from: a + 0.04, to: e, x: 80, y: 1230, size: 64, color: WHITE, inD: 0.5, outAt: 99, z: 10 + i });
      UI.chip(c.chip, { from: a + 0.2, to: e, x: 80, y: 1360, size: 32, style: 'on-black', exit: 'none', z: 10 + i });
      UI.dots(4, i, { from: a, to: e, x: 80, y: 1500, idle: 'rgba(255,255,255,0.35)', z: 10 + i });
      if (c.ring) MG.ring({ from: a, to: e, x: 740, y: 1180, size: 260, stroke: 16, color: LIME, delay: 0.05, fillDur: 0.8, label: c.ring.label, sub: c.ring.sub, fontSize: 80, subSize: 24, textColor: WHITE, z: 12 + i, exit: 'none' });
    });
  }

  // ---------- 11. Nest acoustics + trust: beats 72-79 ----------
  {
    const a = b(72), e = b(80);
    UI.bg(BLACK, a, e);
    UI.video(F('an_open'), { from: a, to: e, count: 201, offset: 3.4, pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.5], [1.2, 0.5], [2.0, 0.3]] } });
    UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.45 });
    logoW(a, e);
    UI.text('Noise reduction', { from: a + 0.1, to: e, x: 80, y: 520, size: 44, color: WHITE, weight: 500 });
    UI.counter({ from: a + 0.1, to: e, x: 68, y: 590, size: 330, a: 0, b: 30, inD: 1.4, color: WHITE, format: dB });
    MG.soundBars({ from: a, to: e, x: 80, y: 980, w: 920, h: 300, n: 30, seed: 11, color: '#ffffff', color2: LIME, calmAt: b(74) - a, calmDur: 0.9, delay: 0.05 });
    UI.text('Outside noise', { from: a + 0.2, to: b(74) + 0.5, x: 80, y: 1310, size: 34, color: 'rgba(255,255,255,0.75)', weight: 500, outD: 0.3, inD: 0.3 });
    UI.text('Inside Nest', { from: b(74) + 0.5, to: e, x: 80, y: 1310, size: 34, color: LIME, weight: 600, inD: 0.3 });
    MG.badge({ from: b(75), to: e, x: 80, y: 1400, size: 230, line1: '5-year', line2: 'warranty', color: WHITE, fontSize: 40, subSize: 24, delay: 0 });
    MG.badge({ from: b(75), to: e, x: 340, y: 1400, size: 230, line1: 'GREENGUARD', line2: 'Gold certified', color: LIME, fontSize: 26, subSize: 22, delay: 0.18 });
    MG.badge({ from: b(75), to: e, x: 600, y: 1400, size: 230, line1: 'In stock', line2: '5 to 7 business days', color: WHITE, fontSize: 32, subSize: 20, delay: 0.36 });
  }

  // ---------- 12. Two pods (white): beats 80-87 ----------
  {
    const a = b(80), e = b(88);
    UI.wipe(LIME, a - 0.3, a + 0.3, { z: 95 });
    UI.bg(WHITE, a, e);
    logoB(a, e);
    UI.title(['Two pods.', 'One quiet office.'], { from: a + 0.1, to: e, x: 80, y: 300, size: 100, color: BLACK, outAt: b(87) - a });
    const hD = 620, hN = Math.round(hD * 2326 / 2207);
    const wD = Math.round(hD * AR.duneOlive2), wN = Math.round(hN * AR.nestM);
    const gapX = 70, x0 = Math.round((W - (wD + gapX + wN)) / 2), baseline = 1240;
    UI.product(R.duneOlive2, { from: a + 0.2, to: e, x: x0, y: baseline - hD, w: wD, h: hD, inD: 0.7, dy: 50, exit: 'none' });
    UI.product(R.nestM, { from: a + 0.35, to: e, x: x0 + wD + gapX, y: baseline - hN, w: wN, h: hN, inD: 0.7, dy: 50, exit: 'none' });
    UI.rule({ from: a + 0.6, to: e, x: x0, y: 1290, w: 110, h: 10, exit: 'none' });
    UI.text('<b>Dune</b><br>Solo focus', { from: a + 0.7, to: e, x: x0, y: 1318, size: 38, color: BLACK, weight: 400, lineHeight: 1.2, exit: 'none' });
    UI.rule({ from: a + 0.75, to: e, x: x0 + wD + gapX, y: 1290, w: 110, h: 10, exit: 'none' });
    UI.text('<b>Nest</b><br>Teams of 1 to 6', { from: a + 0.85, to: e, x: x0 + wD + gapX, y: 1318, size: 38, color: BLACK, weight: 400, lineHeight: 1.2, exit: 'none' });
    UI.chip('Australian-owned', { from: b(83), to: e, x: 80, y: 1500, size: 30, style: 'on-white', exit: 'none' });
    UI.chip('Nationwide delivery and assembly', { from: b(83) + 0.12, to: e, x: 80, y: 1586, size: 30, style: 'on-white', exit: 'none' });
  }

  // ---------- 13. CTA: beats 88-95 ----------
  {
    const a = b(88), e = b(96) + 0.4;
    UI.bg(BLACK, a, e);
    UI.video(F('ad_woman'), { from: a, to: e, count: 151, offset: 0.5, pan: [-180, -180], kb: { s0: 1.0, s1: 1.05 }, innerTweens: { bright: [[0, 0.45]] } });
    UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.4 });
    UI.title(['Need a', 'quiet space?'], { from: a + 0.1, to: e, x: 80, y: 560, size: 120, color: WHITE, exit: 'none' });
    UI.title([{ text: 'Let\'s talk', dot: true }], { from: b(90), to: e, x: 80, y: 860, size: 120, color: WHITE, exit: 'none' });
    UI.chip('jasonl.com.au', { from: b(91), to: e, x: 80, y: 1120, size: 40, style: 'lime', exit: 'none' });
    UI.text('Showrooms · Same-day metro delivery · Trade pricing', { from: b(92), to: e, x: 80, y: 1260, size: 32, color: WHITE, weight: 400, exit: 'none' });
    UI.logo('white-slogan', { from: b(89), to: e, x: 80, y: 1430, w: 440, exit: 'none' });
  }

  return { duration: b(96) + 0.4 };
};
