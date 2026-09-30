/* Hero film — Dune + Nest, 9:16 (1080x1920). Silent, text-led. British English, sentence case. */
window.buildScene = function ({ W, H, media, UI, Comp }) {
  const M = (p) => `${media}/${p.split('/').map(encodeURIComponent).join('/')}`;
  const D = (p) => `${media}/../derived/${p}`;
  // trimmed render aspect ratios (w/h)
  const AR = { duneShadow: 0.542, duneOat: 0.542, duneOlive: 0.540, duneOlive2: 0.600, nestS: 0.816, nestM: 0.773, nestL: 0.980, nestXL: 1.145 };
  const LIME = '#C6D644', BLACK = '#000', WHITE = '#fff';
  const IMG = {
    // Dune
    duneEnviro: M('Dune/Studio Images/dune-enviro-1.jpg'),          // 2400x1600 olive pod by window
    duneLoft: M('Dune/Studio Images/Enviro (2).jpg'),               // 1200x800 white pod in loft
    duneCall: M('Dune/Studio Images/Detail (8) 2.png'),             // 1200x800 man on a video call (photo)
    dunePanel: M('Dune/Studio Images/Detail (4).png'),              // 1200x800 touch panel + GPO
    duneLight: M('Dune/Studio Images/Detail (7).png'),              // 1200x800 arch LED
    duneFabric: M('Dune/Studio Images/Detail (1).png'),             // 1200x800 fabric + timber
    duneShadow: D('dune-shadow.png'), duneOat: D('dune-oat.png'), duneOlive: D('dune-olive.png'), duneOlive2: D('dune-olive-2.png'),
    // Nest
    nestDark: M('Nest/Enviro Images/Mailer #2.jpg'),                // 1858x2530 dark office, 3 booths
    nestPeople: M('Nest/Enviro Images/Mailer #1 w People.jpg'),     // 1900x2500 woman in Nest S
    nestBright: M('Nest/Enviro Images/Nest S Black.png'),           // 2528x1696 man in booth
    nestS: D('nest-s-hi.png'), nestM: D('nest-m.png'), nestL: D('nest-l.png'), nestXL: D('nest-xl.png'),
    photoSeat: M('Nest/Photos/photo-print-15.jpg'),                 // 5760x3842 teal seat curves
    photoLight: M('Nest/Photos/photo-print-12.jpg'),                // LED strip
    photoPower: M('Nest/Photos/photo-print-17.jpg'),                // outlet + phone + notebook
    photoHandle: M('Nest/Photos/photo-print-18.jpg'),               // door handle
  };

  const T = {}; // section start times
  let t = 0;
  const sec = (name, len) => { T[name] = t; t += len; return T[name]; };

  // ---------- 0. Hook (dark office) ----------
  sec('hook', 3.4);
  {
    const a = T.hook, b = a + 3.4;
    UI.bg('#000', a, b);
    UI.image(IMG.nestDark, { from: a, to: b, position: '50% 45%', kb: { s0: 1.12, s1: 1.0, x0: 0, y0: 30, x1: 0, y1: 0, ease: 'outCubic' }, innerTweens: { bright: [[0, 0.32], [1.2, 0.62, 'outCubic'], [3.0, 0.62], [3.4, 0.25]] } });
    UI.title(['Can\'t hear', 'yourself think?'], { from: a + 0.15, to: b, x: 80, y: 640, size: 112, color: WHITE, outAt: 2.85 });
    UI.title([{ text: 'Sorted', dot: true }], { from: a + 1.35, to: b, x: 80, y: 930, size: 148, color: LIME, outAt: 1.5 });
    UI.logo('white', { from: a + 0.3, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 0], [0.5, 1], [2.9, 1], [3.2, 0]] } });
  }
  UI.wipe(LIME, T.hook + 3.05, T.hook + 3.75);

  // ---------- 1. Meet Dune ----------
  sec('dune', 3.9);
  {
    const a = T.dune, b = a + 3.9;
    UI.bg(WHITE, a, b);
    UI.logo('black', { from: a, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 0], [0.4, 1], [3.6, 1], [3.9, 0]] } });
    UI.title([{ text: 'Meet Dune', dot: true }], { from: a + 0.2, to: b, x: 80, y: 300, size: 130, color: BLACK, outAt: 3.2 });
    UI.text('One person. Zero distractions.', { from: a + 0.55, to: b, x: 80, y: 470, size: 42, color: BLACK, weight: 500, outD: 0.35 });
    const box = { x: 80, y: 580, w: 920, h: 1130 };
    UI.image(IMG.duneEnviro, { from: a, to: b, box, radius: 40, position: '53% 50%', kb: { s0: 1.0, s1: 1.08, x0: 0, y0: 0, x1: -8, y1: 0 },
      tweens: { y: [[0, box.y + 260], [0.9, box.y, 'outExpo'], [3.5, box.y], [3.9, box.y + 120, 'inExpo']], x: [[0, box.x]], opacity: [[0, 0], [0.35, 1], [3.55, 1], [3.9, 0]] } });
    UI.chip('Single acoustic office pod', { from: a + 0.9, to: b, x: 120, y: 1590, size: 32, style: 'lime', z: 30 });
  }

  // ---------- 2. Dune detail cards ----------
  sec('duneCards', 4.8);
  {
    const a = T.duneCards, b = a + 4.8;
    UI.bg(WHITE, a, b);
    UI.logo('black', { from: a, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 1], [4.5, 1], [4.8, 0]] } });
    const cards = [
      { src: IMG.duneCall, title: ['Calls that', 'stay private.'], chips: ['Built for calls and deep work'] },
      { src: IMG.dunePanel, title: ['Everything at', 'your fingertips.'], chips: ['Touch-screen controls', 'Dual GPO + USB-A + USB-C'] },
      { src: IMG.duneLight, title: ['Light that\'s easy', 'on the eyes.'], chips: ['Flicker-free LED', 'CRI above 90'] },
    ];
    const each = 1.6;
    cards.forEach((c, i) => {
      const s = a + i * each, e = s + each + (i === cards.length - 1 ? 0 : 0.0);
      const box = { x: 80, y: 700, w: 920, h: 613 };
      UI.image(c.src, { from: s, to: e, box, radius: 36, position: '50% 50%', kb: { s0: 1.02, s1: 1.1 }, tweens: { x: [[0, W], [0.75, box.x, 'outExpo'], [each - 0.35, box.x], [each, -W - 40, 'inExpo']], y: [[0, box.y]] } });
      UI.title(c.title, { from: s + 0.1, to: e, x: 80, y: 330, size: 92, color: BLACK, outAt: each - 0.55 });
      c.chips.forEach((ch, k) => UI.chip(ch, { from: s + 0.35 + k * 0.12, to: e, x: 80, y: 1380 + k * 92, size: 32, style: 'on-white', outD: 0.3 }));
      UI.dots(3, i, { from: s, to: e, x: 80, y: 1640 });
    });
  }

  // ---------- 3. Dune spec (black) ----------
  sec('duneSpec', 3.2);
  {
    const a = T.duneSpec, b = a + 3.2;
    UI.wipe(BLACK, a - 0.35, a + 0.35, { z: 95 });
    UI.bg(BLACK, a, b);
    UI.logo('white', { from: a, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 1], [2.9, 1], [3.2, 0]] } });
    UI.text('Sound insulation', { from: a + 0.2, to: b, x: 80, y: 560, size: 44, color: WHITE, weight: 500 });
    UI.counter({ from: a + 0.2, to: b, x: 68, y: 630, size: 330, a: 0, b: 29, inD: 1.3, color: WHITE, format: (v) => `${Math.round(v)}<span style="font-size:0.42em;font-weight:600;letter-spacing:-0.02em;margin-left:0.12em">dB</span>` });
    UI.rule({ from: a + 0.4, to: b, x: 80, y: 1010, w: 300, h: 12 });
    UI.text('Tested to ISO 23351-1', { from: a + 0.6, to: b, x: 80, y: 1050, size: 40, color: WHITE, weight: 400 });
    ['Layered acoustic walls', 'PVB laminated glass', 'PET acoustic felt inside'].forEach((ch, k) => UI.chip(ch, { from: a + 0.9 + k * 0.14, to: b, x: 80, y: 1300 + k * 92, size: 32, style: 'on-black' }));
  }

  // ---------- 4. Dune colours (carousel) ----------
  sec('duneColours', 3.6);
  {
    const a = T.duneColours, b = a + 3.6;
    UI.wipe(WHITE, a - 0.35, a + 0.35, { z: 95 });
    UI.bg(WHITE, a, b);
    UI.logo('black', { from: a, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 1], [3.3, 1], [3.6, 0]] } });
    UI.title(['Pick your colour.'], { from: a + 0.15, to: b, x: 80, y: 330, size: 92, color: BLACK, outAt: 2.95 });
    UI.text('Three fabrics. Natural timber. One quiet corner.', { from: a + 0.45, to: b, x: 80, y: 460, size: 38, color: BLACK, weight: 400 });
    // carousel: starts on the first pod, glides left to end on the third
    const pods = [IMG.duneShadow, IMG.duneOat, IMG.duneOlive];
    const ph = 980, gap = 800;
    const Dc = 3.6, hold0 = 0.35, hold1 = 0.45;
    pods.forEach((src, i) => {
      const pw = Math.round(ph * AR[['duneShadow', 'duneOat', 'duneOlive'][i]]);
      const cx = 540 - pw / 2;
      UI.product(src, { from: a, to: b, x: 0, y: 600, w: pw, h: ph, exit: 'none', inD: 0.01, dy: 0,
        tweens: { x: [[0, cx + i * gap], [hold0, cx + i * gap], [Dc - hold1, cx + (i - 2) * gap, 'inOutQuint']], opacity: [[0, 0], [0.35, 1], [Dc - 0.3, 1], [Dc, 0]], y: [[0, 0]], scale: [[0, 1]] } });
    });
    UI.chip('Set up in under an hour', { from: a + 0.9, to: b, x: 80, y: 1480, size: 32, style: 'on-white' });
    UI.chip('Moves on concealed wheels', { from: a + 1.05, to: b, x: 80, y: 1572, size: 32, style: 'on-white' });
  }

  // ---------- 5. Need room for the team? -> Meet Nest ----------
  sec('nestQ', 1.7);
  {
    const a = T.nestQ, b = a + 1.7;
    UI.bg(BLACK, a, b);
    UI.wipe(BLACK, a - 0.35, a + 0.35, { z: 95 });
    UI.title(['Need room', 'for the team?'], { from: a + 0.1, to: b, x: 80, y: 700, size: 120, color: WHITE, outAt: 1.2, exit: 'none' });
  }
  sec('nest', 3.9);
  {
    const a = T.nest, b = a + 3.9;
    UI.bg(WHITE, a, b);
    UI.logo('black', { from: a, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 0], [0.4, 1], [3.6, 1], [3.9, 0]] } });
    UI.title([{ text: 'Meet Nest', dot: true }], { from: a + 0.2, to: b, x: 80, y: 300, size: 130, color: BLACK, outAt: 3.2 });
    UI.text('Phone booth to meeting room.', { from: a + 0.55, to: b, x: 80, y: 470, size: 42, color: BLACK, weight: 500, outD: 0.35 });
    const box = { x: 80, y: 580, w: 920, h: 1130 };
    UI.image(IMG.nestPeople, { from: a, to: b, box, radius: 40, position: '50% 35%', kb: { s0: 1.1, s1: 1.0, x0: 0, y0: 10, x1: 0, y1: 0, ease: 'outCubic' },
      tweens: { x: [[0, box.x + 300], [0.9, box.x, 'outExpo'], [3.5, box.x], [3.9, box.x - 120, 'inExpo']], y: [[0, box.y]], opacity: [[0, 0], [0.35, 1], [3.55, 1], [3.9, 0]] } });
    UI.chip('Acoustic office pod range', { from: a + 0.9, to: b, x: 120, y: 1590, size: 32, style: 'lime', z: 30 });
  }

  // ---------- 6. Nest sizes ----------
  sec('nestSizes', 4.4);
  {
    const a = T.nestSizes, b = a + 4.4;
    UI.wipe(WHITE, a - 0.35, a + 0.35, { z: 95 });
    UI.bg(WHITE, a, b);
    UI.logo('black', { from: a, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 1], [4.1, 1], [4.4, 0]] } });
    UI.title(['One to six people.'], { from: a + 0.1, to: b, x: 80, y: 330, size: 92, color: BLACK, outAt: 3.75 });
    UI.text('Four sizes. Same quiet.', { from: a + 0.4, to: b, x: 80, y: 460, size: 38, color: BLACK, weight: 400 });
    const sizes = [
      { key: 'nestS', label: 'Nest S', cap: '1 person' },
      { key: 'nestM', label: 'Nest M', cap: '1 to 2 people' },
      { key: 'nestL', label: 'Nest L', cap: 'Up to 4 people' },
      { key: 'nestXL', label: 'Nest XL', cap: '6 people' },
    ];
    const ph = 820, each = 1.0;
    sizes.forEach((s, i) => {
      const s0 = a + 0.15 + i * each, e0 = (i === sizes.length - 1) ? b : s0 + each + 0.25;
      const pw = Math.round(ph * AR[s.key]);
      UI.product(IMG[s.key], { from: s0, to: e0, x: 540 - pw / 2, y: 620, w: pw, h: ph, inD: 0.55, outD: 0.25, dy: 30, s0: 0.86, s1: 1, exit: i === sizes.length - 1 ? 'none' : undefined });
      UI.chip(`${s.label} &nbsp;·&nbsp; ${s.cap}`, { from: s0 + 0.08, to: e0, x: 80, y: 1500, size: 36, style: 'on-white', inD: 0.45, outD: 0.25, exit: i === sizes.length - 1 ? 'none' : undefined });
      UI.dots(4, i, { from: s0, to: e0, x: 80, y: 1640 });
    });
  }

  // ---------- 7. Nest details (real photos, full bleed) ----------
  sec('nestPhotos', 4.8);
  {
    const a = T.nestPhotos, b = a + 4.8;
    UI.bg(BLACK, a, b);
    const shots = [
      { src: IMG.photoSeat, pos: '55% 50%', title: ['Swap panels.', 'Swap colours.'], chip: 'Replaceable acoustic panels', dark: false },
      { src: IMG.photoLight, pos: '50% 45%', title: ['Fresh air in', 'three minutes.'], chip: 'Adjustable light and airflow', dark: false },
      { src: IMG.photoPower, pos: '45% 50%', title: ['Power where', 'you need it.'], chip: 'Dual GPO + USB-A + USB-C', dark: false },
    ];
    const each = 1.6;
    shots.forEach((s, i) => {
      const s0 = a + i * each, e0 = s0 + each;
      UI.image(s.src, { from: s0, to: e0 + 0.05, position: s.pos, kb: { s0: 1.0, s1: 1.09, x0: -10, y0: 0, x1: 12, y1: 0 }, tweens: { clipL: [[0, i === 0 ? 0 : W], [0.55, 0, 'outExpo']], x: [[0, 0]], y: [[0, 0]] }, z: i });
      UI.title(s.title, { from: s0 + 0.12, to: e0, x: 80, y: 1230, size: 92, color: WHITE, outAt: each - 0.5, z: 10 + i });
      UI.chip(s.chip, { from: s0 + 0.4, to: e0, x: 80, y: 1470, size: 32, style: 'on-black', outD: 0.3, z: 10 + i });
      UI.logo('white', { from: s0, to: e0, x: 80, y: 150, w: 210, exit: 'none', inD: 0.01, z: 20 + i });
      UI.dots(3, i, { from: s0, to: e0, x: 80, y: 1640, idle: 'rgba(255,255,255,0.35)', z: 20 + i });
    });
    // legibility gradient at the bottom of each photo
    const g = Comp.el('div', '', { width: W + 'px', height: '900px', top: (H - 900) + 'px', background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.7) 100%)' });
    Comp.clip({ el: g, from: a, to: b, z: 8, tweens: { y: [[0, H - 900]], opacity: [[0, 1]] } });
  }

  // ---------- 8. Nest spec (black) ----------
  sec('nestSpec', 3.3);
  {
    const a = T.nestSpec, b = a + 3.3;
    UI.wipe(LIME, a - 0.35, a + 0.35, { z: 95 });
    UI.bg(BLACK, a, b);
    UI.logo('white', { from: a, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 1], [3.0, 1], [3.3, 0]] } });
    UI.text('Noise reduction', { from: a + 0.2, to: b, x: 80, y: 560, size: 44, color: WHITE, weight: 500 });
    UI.counter({ from: a + 0.2, to: b, x: 68, y: 630, size: 330, a: 0, b: 30, inD: 1.3, color: WHITE, format: (v) => `${Math.round(v)}<span style="font-size:0.42em;font-weight:600;letter-spacing:-0.02em;margin-left:0.12em">dB</span>` });
    UI.rule({ from: a + 0.4, to: b, x: 80, y: 1010, w: 300, h: 12 });
    UI.text('Sound-blocking door frames and laminated glass', { from: a + 0.6, to: b, x: 80, y: 1050, size: 40, color: WHITE, weight: 400, width: 900 });
    ['5-year warranty', 'GREENGUARD Gold certified', 'Standard colours in stock'].forEach((ch, k) => UI.chip(ch, { from: a + 0.9 + k * 0.14, to: b, x: 80, y: 1300 + k * 92, size: 32, style: 'on-black' }));
  }

  // ---------- 9. Two pods ----------
  sec('both', 3.4);
  {
    const a = T.both, b = a + 3.4;
    UI.wipe(WHITE, a - 0.35, a + 0.35, { z: 95 });
    UI.bg(WHITE, a, b);
    UI.logo('black', { from: a, to: b, x: 80, y: 150, w: 210, exit: 'none', tweens: { opacity: [[0, 1], [3.1, 1], [3.4, 0]] } });
    UI.title(['Two pods.', 'One quiet office.'], { from: a + 0.1, to: b, x: 80, y: 330, size: 100, color: BLACK, outAt: 2.8 });
    const hD = 620, hN = Math.round(hD * 2326 / 2207);
    const wD = Math.round(hD * AR.duneOlive2), wN = Math.round(hN * AR.nestM);
    const gapX = 70, x0 = Math.round((W - (wD + gapX + wN)) / 2);
    const baseline = 1240;
    UI.product(IMG.duneOlive2, { from: a + 0.3, to: b, x: x0, y: baseline - hD, w: wD, h: hD, inD: 0.8, dy: 50 });
    UI.product(IMG.nestM, { from: a + 0.45, to: b, x: x0 + wD + gapX, y: baseline - hN, w: wN, h: hN, inD: 0.8, dy: 50 });
    UI.rule({ from: a + 0.7, to: b, x: x0, y: 1290, w: 110, h: 10 });
    UI.text('<b>Dune</b><br>Solo focus', { from: a + 0.8, to: b, x: x0, y: 1318, size: 38, color: BLACK, weight: 400, lineHeight: 1.2 });
    UI.rule({ from: a + 0.85, to: b, x: x0 + wD + gapX, y: 1290, w: 110, h: 10 });
    UI.text('<b>Nest</b><br>Teams of 1 to 6', { from: a + 0.95, to: b, x: x0 + wD + gapX, y: 1318, size: 38, color: BLACK, weight: 400, lineHeight: 1.2 });
    UI.chip('Australian-owned', { from: a + 1.2, to: b, x: 80, y: 1500, size: 30, style: 'on-white' });
    UI.chip('Nationwide delivery and assembly', { from: a + 1.32, to: b, x: 80, y: 1586, size: 30, style: 'on-white' });
  }

  // ---------- 10. CTA ----------
  sec('cta', 4.0);
  {
    const a = T.cta, b = a + 4.0;
    UI.wipe(LIME, a - 0.35, a + 0.35, { z: 95 });
    UI.bg(WHITE, a, b);
    UI.title(['Need a', 'quiet space?'], { from: a + 0.15, to: b, x: 80, y: 560, size: 120, color: BLACK, exit: 'none' });
    UI.title([{ text: 'Let\'s talk', dot: true }], { from: a + 0.9, to: b, x: 80, y: 860, size: 120, color: BLACK, exit: 'none' });
    UI.chip('jasonl.com.au', { from: a + 1.4, to: b, x: 80, y: 1120, size: 40, style: 'lime', exit: 'none' });
    UI.text('Showrooms · Same-day metro delivery · Trade pricing', { from: a + 1.7, to: b, x: 80, y: 1260, size: 32, color: BLACK, weight: 400, exit: 'none' });
    UI.logo('black-slogan', { from: a + 0.5, to: b, x: 80, y: 1430, w: 440, exit: 'none' });
  }

  return { duration: t };
};
