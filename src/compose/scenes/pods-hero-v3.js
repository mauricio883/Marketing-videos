/* Hero film v3 — Dune + Nest, 9:16, footage-led, curated shots, longer text holds, logo only at the end.
 * Cut to "Werq" (125 bpm). British English, sentence case. */
window.buildScene = function ({ W, H, media, UI, MG, Comp }) {
  const D = (p) => `${media}/../derived/${p}`;
  const F = (id) => `${media}/../../frames/${id}`;
  const M = (p) => `${media}/${p.split('/').map(encodeURIComponent).join('/')}`;
  const LIME = '#C6D644', BLACK = '#000', WHITE = '#fff';
  const BEAT = 0.4789, PH = 0.04;
  const b = (k) => PH + k * BEAT;
  const AR = { duneShadow: 0.542, duneOat: 0.542, duneOlive: 0.540, duneOlive2: 0.600, nestS: 0.568, nestM: 0.773, nestL: 0.980, nestXL: 1.145 };
  const R = { duneShadow: D('dune-shadow.png'), duneOat: D('dune-oat.png'), duneOlive: D('dune-olive.png'), duneOlive2: D('dune-olive-2.png'), nestS: D('nest-s.png'), nestM: D('nest-m.png'), nestL: D('nest-l.png'), nestXL: D('nest-xl.png') };
  const dB = (v) => `${Math.round(v)}<span style="font-size:0.42em;font-weight:600;letter-spacing:-0.02em;margin-left:0.12em">dB</span>`;
  let k = 0; // running beat cursor
  const S = {};
  const section = (name, beats) => { S[name] = [b(k), b(k + beats)]; k += beats; return S[name]; };

  // ---------- 1. Hook (8 beats) ----------
  {
    const [a, e] = section('hook', 8);
    UI.bg(BLACK, 0, e);
    UI.video(F('n_office'), { from: 0, to: e, count: 201, offset: 0.2, pan: [-360, -120], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.55], [0.6, 0.95]] } });
    UI.scrim({ from: 0, to: e, dir: 'bottom', alpha: 0.7, h: 1100 });
    UI.title(['Can\'t hear', 'yourself think?'], { from: a + 0.1, to: e, x: 80, y: 1080, size: 112, color: WHITE, outAt: b(7) - a, exit: 'up' });
    UI.title([{ text: 'Sorted', dot: true }], { from: b(3), to: e, x: 80, y: 1360, size: 150, color: LIME, inD: 0.5, outAt: b(7) - b(3) });
  }
  UI.wipe(LIME, b(7) + 0.1, b(8) + 0.45, { z: 95 });

  // ---------- 2. Meet Dune (8 beats) ----------
  {
    const [a, e] = section('dune', 8);
    UI.bg(BLACK, a, e);
    UI.video(F('ad_open_slow'), { from: a, to: e, count: 106, offset: 0.0, pan: [-120, -60], kb: { s0: 1.0, s1: 1.05 } });
    UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.62, h: 1150 });
    UI.title([{ text: 'Meet Dune', dot: true }], { from: a + 0.25, to: e, x: 80, y: 1120, size: 132, color: WHITE, outAt: e - a - 0.5 });
    UI.text('One person. Zero distractions.', { from: b(9), to: e, x: 80, y: 1290, size: 44, color: WHITE, weight: 500, outD: 0.3 });
    UI.chip('Single acoustic office pod', { from: b(10), to: e, x: 80, y: 1420, size: 32, style: 'lime' });
  }

  // ---------- 3. Dune features: 2 cuts x 5 beats ----------
  {
    const cuts = [
      { clip: 'ad_panel', count: 101, offset: 1.6, title: ['Everything at', 'your fingertips.'], chip: 'Touch-screen controls · dual GPO · USB-A · USB-C', pan: [-180, -180], kb: { s0: 1.0, s1: 1.07 } },
      { clip: 'ad_led_slow', count: 66, offset: 0.0, title: ['Light that\'s easy', 'on the eyes.'], chip: 'Flicker-free LED · CRI above 90', pan: [-180, -180], kb: { s0: 1.0, s1: 1.07 } },
    ];
    cuts.forEach((c, i) => {
      const [a, e] = section('duneF' + i, 5);
      UI.video(F(c.clip), { from: a, to: e + 0.02, count: c.count, offset: c.offset, pan: c.pan, kb: c.kb, z: i });
      UI.scrim({ from: a, to: e + 0.02, dir: 'bottom', alpha: 0.65, h: 1000, z: 5 + i });
      UI.title(c.title, { from: a + 0.05, to: e, x: 80, y: 1150, size: 78, color: WHITE, inD: 0.55, outAt: 99, z: 10 + i });
      UI.chip(c.chip, { from: a + 0.35, to: e, x: 80, y: 1370, size: 30, style: 'on-black', exit: 'none', z: 10 + i });
    });
  }

  // ---------- 4. Dune acoustics (8 beats) ----------
  {
    const [a, e] = section('duneA', 8);
    UI.bg(BLACK, a, e);
    UI.video(F('ad_sit'), { from: a, to: e, count: 126, offset: 1.5, pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.55], [1.0, 0.55], [1.8, 0.3]] } });
    UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.4 });
    UI.text('Sound insulation', { from: a + 0.1, to: e, x: 80, y: 520, size: 44, color: WHITE, weight: 500 });
    UI.counter({ from: a + 0.1, to: e, x: 68, y: 590, size: 330, a: 0, b: 29, inD: 1.4, color: WHITE, format: dB });
    MG.soundBars({ from: a, to: e, x: 80, y: 980, w: 920, h: 300, n: 30, color: '#ffffff', color2: LIME, calmAt: 1.1, calmDur: 0.9, delay: 0.05 });
    UI.text('Outside noise', { from: a + 0.2, to: a + 1.6, x: 80, y: 1310, size: 34, color: 'rgba(255,255,255,0.75)', weight: 500, outD: 0.3, inD: 0.3 });
    UI.text('Inside Dune', { from: a + 1.6, to: e, x: 80, y: 1310, size: 34, color: LIME, weight: 600, inD: 0.3 });
    UI.text('Tested to ISO 23351-1', { from: a + 1.4, to: e, x: 80, y: 1400, size: 36, color: WHITE, weight: 400 });
    UI.chip('Laminated glass · layered acoustic walls', { from: a + 1.7, to: e, x: 80, y: 1500, size: 30, style: 'on-black' });
  }

  // ---------- 5. Dune colours (white, 8 beats) ----------
  {
    const [a, e] = section('duneC', 8);
    UI.wipe(WHITE, a - 0.3, a + 0.3, { z: 95 });
    UI.bg(WHITE, a, e);
    UI.title(['Pick your colour.'], { from: a + 0.1, to: e, x: 80, y: 300, size: 96, color: BLACK, outAt: e - a - 0.45 });
    UI.text('Three fabrics. Natural timber.', { from: a + 0.4, to: e, x: 80, y: 430, size: 40, color: BLACK, weight: 400 });
    const pods = ['duneShadow', 'duneOat', 'duneOlive'];
    const ph = 1080, pw = Math.round(ph * 0.542), px = 540 - pw / 2 + 60, py = 530;
    const seg = (e - a - 0.5) / 3;
    pods.forEach((key, i) => {
      const s0 = a + i * seg, e0 = (i === 2) ? e : s0 + seg + 0.35;
      UI.product(R[key], { from: s0, to: e0, x: px, y: py, w: pw, h: ph, inD: 0.45, outD: 0.3, dy: 0, s0: 1.0, s1: 1.0, exit: i === 2 ? 'none' : undefined,
        tweens: { opacity: [[0, 0], [0.35, 1], [e0 - s0 - 0.35, 1], [e0 - s0, i === 2 ? 1 : 0]], x: [[0, 40], [0.6, 0, 'outExpo']], y: [[0, 0]], scale: [[0, 1]] } });
    });
    MG.swatches({ from: a + 0.3, to: e, x: 80, y: 1480, colours: ['#5B5B5B', '#D9CFC0', '#8E9B72'], size: 54, gap: 30, ringColor: BLACK, active: (lt) => Math.min(2, Math.floor(Math.max(0, lt - 0.3) / seg)) });
    UI.chip('Set up in under an hour', { from: a + 0.9, to: e, x: 80, y: 1580, size: 30, style: 'on-white' });
    UI.chip('Moves on concealed wheels', { from: a + 1.05, to: e, x: 80, y: 1666, size: 30, style: 'on-white' });
  }

  // ---------- 6. Need room for the team? -> Meet Nest (10 beats) ----------
  {
    const [a, e] = section('nest', 10);
    UI.wipe(BLACK, a - 0.3, a + 0.3, { z: 95 });
    UI.bg(BLACK, a, e);
    UI.video(F('n_orbit'), { from: a, to: e, count: 201, offset: 3.4, pan: [-180, -180], kb: { s0: 1.0, s1: 1.05 }, innerTweens: { bright: [[0, 0.55], [1.9, 0.55], [2.5, 1.0]] } });
    UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.62, h: 1150 });
    UI.title(['Need room', 'for the team?'], { from: a + 0.1, to: a + 2.3, x: 80, y: 1120, size: 104, color: WHITE, outAt: 1.85, outD: 0.35 });
    UI.title([{ text: 'Meet Nest', dot: true }], { from: a + 2.3, to: e, x: 80, y: 1120, size: 132, color: WHITE, outAt: e - a - 2.3 - 0.45 });
    UI.text('Phone booth to meeting room.', { from: a + 2.7, to: e, x: 80, y: 1290, size: 44, color: WHITE, weight: 500, outD: 0.3 });
    UI.chip('Acoustic office pod range', { from: a + 3.0, to: e, x: 80, y: 1420, size: 32, style: 'lime' });
  }

  // ---------- 7. Nest sizes (white, 4 x 3 beats) ----------
  {
    const [a, e] = section('sizes', 12);
    UI.wipe(WHITE, a - 0.3, a + 0.3, { z: 95 });
    UI.bg(WHITE, a, e);
    UI.title(['One to six people.'], { from: a + 0.1, to: e, x: 80, y: 300, size: 96, color: BLACK, outAt: e - a - 0.45 });
    UI.text('Four sizes. Same quiet.', { from: a + 0.4, to: e, x: 80, y: 430, size: 40, color: BLACK, weight: 400 });
    const sizes = [
      { key: 'nestS', label: 'Nest S', n: 1, mm: 'W 1080 mm' },
      { key: 'nestM', label: 'Nest M', n: 2, mm: 'W 1600 mm' },
      { key: 'nestL', label: 'Nest L', n: 4, mm: 'W 2300 mm' },
      { key: 'nestXL', label: 'Nest XL', n: 6, mm: 'W 2600 mm' },
    ];
    const ph = 780, each = 3 * BEAT;
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

  // ---------- 8. Nest features: 2 cuts x 5 beats ----------
  {
    const cuts = [
      { clip: 'n_ledpan', count: 151, offset: 3.0, title: ['Fresh air in', 'three minutes.'], chip: 'Low-noise turbo fan · adjustable light', pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, ring: { label: '3', sub: 'min' } },
      { clip: 'an_outlet', count: 101, offset: 0.8, title: ['Power where', 'you need it.'], chip: 'Dual GPO · USB-A · USB-C', pan: [-180, -180], kb: { s0: 1.0, s1: 1.07 } },
    ];
    cuts.forEach((c, i) => {
      const [a, e] = section('nestF' + i, 5);
      UI.video(F(c.clip), { from: a, to: e + 0.02, count: c.count, offset: c.offset, pan: c.pan, kb: c.kb, z: i });
      UI.scrim({ from: a, to: e + 0.02, dir: 'bottom', alpha: 0.65, h: 1000, z: 5 + i });
      UI.title(c.title, { from: a + 0.05, to: e, x: 80, y: 1150, size: 78, color: WHITE, inD: 0.55, outAt: 99, z: 10 + i });
      UI.chip(c.chip, { from: a + 0.35, to: e, x: 80, y: 1370, size: 30, style: 'on-black', exit: 'none', z: 10 + i });
      if (c.ring) {
        UI.scrim({ from: a, to: e + 0.02, dir: 'top', alpha: 0.45, h: 700, z: 5 + i });
        MG.ring({ from: a, to: e, x: 740, y: 260, size: 260, stroke: 16, color: LIME, delay: 0.1, fillDur: 1.6, label: c.ring.label, sub: c.ring.sub, fontSize: 84, subSize: 26, textColor: WHITE, z: 12 + i, exit: 'none' });
      }
    });
  }

  // ---------- 9. Nest acoustics (8 beats) ----------
  {
    const [a, e] = section('nestA', 8);
    UI.bg(BLACK, a, e);
    UI.video(F('n_lever'), { from: a, to: e, count: 151, offset: 0.5, pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.5], [1.0, 0.5], [1.8, 0.3]] } });
    UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.4 });
    UI.text('Noise reduction', { from: a + 0.1, to: e, x: 80, y: 520, size: 44, color: WHITE, weight: 500 });
    UI.counter({ from: a + 0.1, to: e, x: 68, y: 590, size: 330, a: 0, b: 30, inD: 1.4, color: WHITE, format: dB });
    MG.soundBars({ from: a, to: e, x: 80, y: 980, w: 920, h: 300, n: 30, seed: 11, color: '#ffffff', color2: LIME, calmAt: 1.1, calmDur: 0.9, delay: 0.05 });
    UI.text('Outside noise', { from: a + 0.2, to: a + 1.6, x: 80, y: 1310, size: 34, color: 'rgba(255,255,255,0.75)', weight: 500, outD: 0.3, inD: 0.3 });
    UI.text('Inside Nest', { from: a + 1.6, to: e, x: 80, y: 1310, size: 34, color: LIME, weight: 600, inD: 0.3 });
    UI.text('Sound-blocking door frames', { from: a + 1.4, to: e, x: 80, y: 1400, size: 36, color: WHITE, weight: 400 });
    UI.chip('Laminated glass · 5 + 5 mm', { from: a + 1.7, to: e, x: 80, y: 1500, size: 30, style: 'on-black' });
  }

  // ---------- 10. Built to last (6 beats) ----------
  {
    const [a, e] = section('trust', 6);
    UI.bg(BLACK, a, e);
    UI.video(F('n_stool'), { from: a, to: e, count: 151, offset: 0.5, pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.5]] } });
    UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.35 });
    UI.title(['Built to last.'], { from: a + 0.05, to: e, x: 80, y: 560, size: 96, color: WHITE, outAt: 99 });
    UI.text('Certified for safety, quality and low emissions.', { from: a + 0.4, to: e, x: 80, y: 690, size: 36, color: WHITE, weight: 400, width: 900, exit: 'none' });
    MG.badge({ from: a + 0.5, to: e, x: 80, y: 900, size: 250, line1: '5-year', line2: 'warranty', color: WHITE, fontSize: 44, subSize: 26, delay: 0 });
    MG.badge({ from: a + 0.5, to: e, x: 360, y: 900, size: 250, line1: 'GREENGUARD', line2: 'Gold certified', color: LIME, fontSize: 28, subSize: 24, delay: 0.2 });
    MG.badge({ from: a + 0.5, to: e, x: 640, y: 900, size: 250, line1: 'AS 2208', line2: 'safety glass', color: WHITE, fontSize: 36, subSize: 24, delay: 0.4 });
    UI.chip('Standard colours in stock · 5 to 7 business days', { from: a + 1.2, to: e, x: 80, y: 1230, size: 30, style: 'on-black', exit: 'none' });
  }

  // ---------- 11. Two pods (white, 8 beats) ----------
  {
    const [a, e] = section('both', 8);
    UI.wipe(LIME, a - 0.3, a + 0.3, { z: 95 });
    UI.bg(WHITE, a, e);
    UI.title(['Two pods.', 'One quiet office.'], { from: a + 0.1, to: e, x: 80, y: 300, size: 100, color: BLACK, outAt: e - a - 0.45 });
    const hD = 620, hN = Math.round(hD * 2326 / 2207);
    const wD = Math.round(hD * AR.duneOlive2), wN = Math.round(hN * AR.nestM);
    const gapX = 70, x0 = Math.round((W - (wD + gapX + wN)) / 2), baseline = 1240;
    UI.product(R.duneOlive2, { from: a + 0.2, to: e, x: x0, y: baseline - hD, w: wD, h: hD, inD: 0.7, dy: 50, exit: 'none' });
    UI.product(R.nestM, { from: a + 0.35, to: e, x: x0 + wD + gapX, y: baseline - hN, w: wN, h: hN, inD: 0.7, dy: 50, exit: 'none' });
    UI.rule({ from: a + 0.6, to: e, x: x0, y: 1290, w: 110, h: 10, exit: 'none' });
    UI.text('<b>Dune</b><br>Solo focus', { from: a + 0.7, to: e, x: x0, y: 1318, size: 38, color: BLACK, weight: 400, lineHeight: 1.2, exit: 'none' });
    UI.rule({ from: a + 0.75, to: e, x: x0 + wD + gapX, y: 1290, w: 110, h: 10, exit: 'none' });
    UI.text('<b>Nest</b><br>Teams of 1 to 6', { from: a + 0.85, to: e, x: x0 + wD + gapX, y: 1318, size: 38, color: BLACK, weight: 400, lineHeight: 1.2, exit: 'none' });
    UI.chip('Australian-owned', { from: a + 1.3, to: e, x: 80, y: 1500, size: 30, style: 'on-white', exit: 'none' });
    UI.chip('Nationwide delivery and assembly', { from: a + 1.42, to: e, x: 80, y: 1586, size: 30, style: 'on-white', exit: 'none' });
  }

  // ---------- 12. CTA (10 beats) ----------
  {
    const [a, e0] = section('cta', 10);
    const e = e0 + 0.3;
    UI.bg(BLACK, a, e);
    UI.video(F('ad_woman'), { from: a, to: e, count: 151, offset: 0.2, pan: [-180, -180], kb: { s0: 1.0, s1: 1.05 }, innerTweens: { bright: [[0, 0.45]] } });
    UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.4 });
    UI.title(['Need a', 'quiet space?'], { from: a + 0.1, to: e, x: 80, y: 560, size: 120, color: WHITE, exit: 'none' });
    UI.title([{ text: 'Let\'s talk', dot: true }], { from: a + 1.0, to: e, x: 80, y: 860, size: 120, color: WHITE, exit: 'none' });
    UI.chip('jasonl.com.au', { from: a + 1.5, to: e, x: 80, y: 1120, size: 40, style: 'lime', exit: 'none' });
    UI.text('Showrooms · Same-day metro delivery · Trade pricing', { from: a + 1.9, to: e, x: 80, y: 1260, size: 32, color: WHITE, weight: 400, exit: 'none' });
    UI.logo('white-slogan', { from: a + 0.6, to: e, x: 80, y: 1430, w: 440, exit: 'none' });
    S.end = e;
  }

  return { duration: S.end };
};
