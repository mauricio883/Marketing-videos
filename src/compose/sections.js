/* Format-aware section builders for the pods campaign (9x16, 1x1, 16x9). */
(function () {
  const LIME = '#C6D644', BLACK = '#000', WHITE = '#fff';
  const BEAT = 0.4789, PH = 0.04;
  const b = (k) => PH + k * BEAT;

  const LAYOUTS = {
    '9x16': { W: 1080, H: 1920, fw: 1440, fh: 1920, suf: '', x: 80,
      hook: { t1: { y: 1080, size: 112 }, t2: { y: 1360, size: 150 }, scrimH: 1100 },
      intro: { title: { y: 1120, size: 132 }, q: { y: 1120, size: 104 }, sub: { y: 1290, size: 44 }, chip: { y: 1420, size: 32 }, scrimH: 1150 },
      feat: { title: { y: 1150, size: 78 }, chip: { y: 1370, size: 30 }, scrimH: 1000, ring: { x: 740, y: 260, size: 260, stroke: 16, font: 84, sub: 26 }, topScrimH: 700 },
      ac: { label: { y: 520, size: 44 }, counter: { x: 68, y: 590, size: 330 }, bars: { x: 80, y: 980, w: 920, h: 300 }, tag: { x: 80, y: 1310, size: 34 }, note: { y: 1400, size: 36 }, chip: { y: 1500, size: 30 } },
      colours: { title: { y: 300, size: 96 }, sub: { y: 430, size: 40 }, pod: { h: 1080, cx: 600, y: 530 }, sw: { x: 80, y: 1480, size: 54 }, chips: { x: 80, ys: [1580, 1666], size: 30 } },
      sizes: { title: { y: 300, size: 96 }, sub: { y: 430, size: 40 }, pod: { h: 780, cx: 540, y: 560 }, dim: { y: 1360 }, chip: { x: 80, y: 1480, size: 36 }, people: { x: 300, y: 1478, size: 34 } },
      trust: { title: { y: 560, size: 96 }, sub: { y: 690, size: 36, width: 900 }, badges: { y: 900, size: 250, xs: [80, 360, 640] }, chip: { y: 1230, size: 30 } },
      both: { title: { y: 300, size: 100 }, hD: 620, baseline: 1240, gap: 70, cx: 540, label: { size: 38 }, chips: { x: 80, ys: [1500, 1586], size: 30 } },
      cta: { t1: { y: 560, size: 120 }, t2: { y: 860, size: 120 }, chip: { y: 1120, size: 40 }, text: { y: 1260, size: 32 }, logo: { y: 1430, w: 440 } } },
    '1x1': { W: 1080, H: 1080, fw: 1200, fh: 1200, suf: '@1x1', x: 80,
      hook: { t1: { y: 560, size: 84 }, t2: { y: 760, size: 112 }, scrimH: 650 },
      intro: { title: { y: 640, size: 104 }, q: { y: 660, size: 80 }, sub: { y: 780, size: 36 }, chip: { y: 880, size: 28 }, scrimH: 650 },
      feat: { title: { y: 660, size: 64 }, chip: { y: 840, size: 27 }, scrimH: 600, ring: { x: 800, y: 90, size: 200, stroke: 14, font: 66, sub: 22 }, topScrimH: 420 },
      ac: { label: { y: 170, size: 36 }, counter: { x: 70, y: 220, size: 230 }, bars: { x: 80, y: 520, w: 920, h: 190 }, tag: { x: 80, y: 740, size: 28 }, note: { y: 810, size: 30 }, chip: { y: 890, size: 26 } },
      colours: { title: { y: 110, size: 72 }, sub: { y: 205, size: 32 }, pod: { h: 760, cx: 790, y: 200 }, sw: { x: 80, y: 660, size: 46 }, chips: { x: 80, ys: [760, 836], size: 27 } },
      sizes: { title: { y: 110, size: 72 }, sub: { y: 205, size: 32 }, pod: { h: 540, cx: 700, y: 260 }, dim: { y: 820 }, chip: { x: 80, y: 500, size: 32 }, people: { x: 80, y: 590, size: 30 } },
      trust: { title: { y: 130, size: 72 }, sub: { y: 230, size: 30, width: 900 }, badges: { y: 380, size: 220, xs: [80, 350, 620] }, chip: { y: 660, size: 26 } },
      both: { title: { y: 110, size: 72 }, hD: 440, baseline: 760, gap: 60, cx: 540, label: { size: 32 }, chips: { x: 80, ys: [950, 950], size: 26, sideBySide: true } },
      cta: { t1: { y: 180, size: 88 }, t2: { y: 400, size: 88 }, chip: { y: 560, size: 34 }, text: { y: 680, size: 26 }, logo: { y: 800, w: 330 } } },
    '16x9': { W: 1920, H: 1080, fw: 2112, fh: 1188, suf: '@16x9', x: 100,
      hook: { t1: { y: 520, size: 100 }, t2: { y: 760, size: 130 }, scrimH: 700 },
      intro: { title: { y: 600, size: 120 }, q: { y: 620, size: 92 }, sub: { y: 760, size: 42 }, chip: { y: 870, size: 30 }, scrimH: 700 },
      feat: { title: { y: 640, size: 72 }, chip: { y: 840, size: 28 }, scrimH: 640, ring: { x: 1560, y: 100, size: 260, stroke: 16, font: 84, sub: 26 }, topScrimH: 480 },
      ac: { label: { y: 190, size: 40 }, counter: { x: 88, y: 240, size: 260 }, bars: { x: 1000, y: 360, w: 820, h: 300 }, tag: { x: 1000, y: 690, size: 32 }, note: { y: 560, size: 34 }, chip: { y: 650, size: 28 } },
      colours: { title: { y: 200, size: 84 }, sub: { y: 320, size: 36 }, pod: { h: 900, cx: 1420, y: 90 }, sw: { x: 100, y: 470, size: 50 }, chips: { x: 100, ys: [580, 660], size: 28 } },
      sizes: { title: { y: 200, size: 84 }, sub: { y: 320, size: 36 }, pod: { h: 740, cx: 1380, y: 130 }, dim: { y: 900 }, chip: { x: 100, y: 470, size: 34 }, people: { x: 100, y: 560, size: 32 } },
      trust: { title: { y: 200, size: 84 }, sub: { y: 320, size: 34, width: 900 }, badges: { y: 470, size: 230, xs: [100, 370, 640] }, chip: { y: 760, size: 28 } },
      both: { title: { y: 200, size: 84 }, hD: 560, baseline: 820, gap: 70, cx: 1360, label: { size: 34 }, chips: { x: 100, ys: [560, 640], size: 28 } },
      cta: { t1: { y: 200, size: 100 }, t2: { y: 450, size: 100 }, chip: { y: 610, size: 36 }, text: { y: 730, size: 30 }, logo: { y: 840, w: 380 } } },
  };

  function make({ W, H, media, UI, MG, Comp }) {
    const fmt = W === H ? '1x1' : (W > H ? '16x9' : '9x16');
    const L = LAYOUTS[fmt];
    const D = (p) => `${media}/../derived/${p}`;
    const F = (id) => `${media}/../../frames/${id}${L.suf}`;
    const AR = { duneShadow: 0.542, duneOat: 0.542, duneOlive: 0.540, duneOlive2: 0.600, nestS: 0.568, nestM: 0.773, nestL: 0.980, nestXL: 1.145 };
    const R = { duneShadow: D('dune-shadow.png'), duneOat: D('dune-oat.png'), duneOlive: D('dune-olive.png'), duneOlive2: D('dune-olive-2.png'), nestS: D('nest-s.png'), nestM: D('nest-m.png'), nestL: D('nest-l.png'), nestXL: D('nest-xl.png') };
    const dB = (v) => `${Math.round(v)}<span style="font-size:0.42em;font-weight:600;letter-spacing:-0.02em;margin-left:0.12em">dB</span>`;
    const x = L.x;
    // map a 9x16 pan value (frame 1440 wide in a 1080 box) to this format
    const panK = (L.fw - W) / 360, centre = -(L.fw - W) / 2;
    const pan9 = (p) => centre + (p + 180) * panK;
    const plate = (id, o) => UI.video(F(id), Object.assign({}, o, { fw: L.fw, fh: L.fh, pan: o.pan ? [pan9(o.pan[0]), pan9(o.pan[1])] : undefined }));

    const S = {};
    S.hook = (a, e, opts = {}) => {
      UI.bg(BLACK, a, e);
      plate('n_office', { from: a, to: e, count: 201, offset: 0.2, pan: [-360, -120], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.55], [0.6, 0.95]] } });
      UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.7, h: L.hook.scrimH });
      UI.title(['Can\'t hear', 'yourself think?'], { from: a + 0.1, to: e, x, y: L.hook.t1.y, size: L.hook.t1.size, color: WHITE, outAt: (e - a) - 0.5, exit: 'up' });
      UI.title([{ text: 'Sorted', dot: true }], { from: a + 3 * BEAT, to: e, x, y: L.hook.t2.y, size: L.hook.t2.size, color: LIME, inD: 0.5, outAt: (e - a) - 3 * BEAT - 0.5 });
    };
    S.meetDune = (a, e, { question = false, qDur = 2.3 } = {}) => {
      UI.bg(BLACK, a, e);
      plate('ad_open_slow', { from: a, to: e, count: 106, offset: 0.0, pan: [-120, -60], kb: { s0: 1.0, s1: 1.05 } });
      UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.62, h: L.intro.scrimH });
      let t0 = a + 0.25;
      if (question) {
        UI.title(['Can\'t hear', 'yourself think?'], { from: a + 0.1, to: a + qDur, x, y: L.intro.q.y, size: L.intro.q.size, color: WHITE, outAt: qDur - 0.45, outD: 0.35 });
        t0 = a + qDur;
      }
      UI.title([{ text: 'Meet Dune', dot: true }], { from: t0, to: e, x, y: L.intro.title.y, size: L.intro.title.size, color: WHITE, outAt: e - t0 - 0.45 });
      UI.text('One person. Zero distractions.', { from: t0 + 0.4, to: e, x, y: L.intro.sub.y, size: L.intro.sub.size, color: WHITE, weight: 500, outD: 0.3 });
      UI.chip('Single acoustic office pod', { from: t0 + 0.7, to: e, x, y: L.intro.chip.y, size: L.intro.chip.size, style: 'lime' });
    };
    S.feature = (a, e, c, z = 0) => {
      plate(c.clip, { from: a, to: e + 0.02, count: c.count, offset: c.offset, pan: c.pan || [-180, -180], kb: c.kb || { s0: 1.0, s1: 1.07 }, z });
      UI.scrim({ from: a, to: e + 0.02, dir: 'bottom', alpha: 0.65, h: L.feat.scrimH, z: 5 + z });
      UI.title(c.title, { from: a + 0.05, to: e, x, y: L.feat.title.y, size: L.feat.title.size, color: WHITE, inD: 0.55, outAt: 99, z: 10 + z });
      UI.chip(c.chip, { from: a + 0.35, to: e, x, y: L.feat.chip.y, size: L.feat.chip.size, style: 'on-black', exit: 'none', z: 10 + z });
      if (c.ring) {
        UI.scrim({ from: a, to: e + 0.02, dir: 'top', alpha: 0.45, h: L.feat.topScrimH, z: 5 + z });
        const r = L.feat.ring;
        MG.ring({ from: a, to: e, x: r.x, y: r.y, size: r.size, stroke: r.stroke, color: LIME, delay: 0.1, fillDur: 1.6, label: c.ring.label, sub: c.ring.sub, fontSize: r.font, subSize: r.sub, textColor: WHITE, z: 12 + z, exit: 'none' });
      }
    };
    S.acoustics = (a, e, { clip, count, offset, value, label, tagIn, note, chip, seed }, { short = false } = {}) => {
      UI.bg(BLACK, a, e);
      plate(clip, { from: a, to: e, count, offset, pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.55], [1.0, 0.55], [1.8, 0.3]] } });
      UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.4 });
      UI.text(label, { from: a + 0.1, to: e, x, y: L.ac.label.y, size: L.ac.label.size, color: WHITE, weight: 500 });
      UI.counter({ from: a + 0.1, to: e, x: L.ac.counter.x, y: L.ac.counter.y, size: L.ac.counter.size, a: 0, b: value, inD: 1.4, color: WHITE, format: dB });
      const B = L.ac.bars;
      MG.soundBars({ from: a, to: e, x: B.x, y: B.y, w: B.w, h: B.h, n: 30, seed: seed || 7, color: '#ffffff', color2: LIME, calmAt: 1.1, calmDur: 0.9, delay: 0.05 });
      UI.text('Outside noise', { from: a + 0.2, to: a + 1.6, x: L.ac.tag.x, y: L.ac.tag.y, size: L.ac.tag.size, color: 'rgba(255,255,255,0.75)', weight: 500, outD: 0.3, inD: 0.3 });
      UI.text(tagIn, { from: a + 1.6, to: e, x: L.ac.tag.x, y: L.ac.tag.y, size: L.ac.tag.size, color: LIME, weight: 600, inD: 0.3 });
      UI.text(note, { from: a + (short ? 1.0 : 1.4), to: e, x, y: L.ac.note.y, size: L.ac.note.size, color: WHITE, weight: 400 });
      if (!short) UI.chip(chip, { from: a + 1.7, to: e, x, y: L.ac.chip.y, size: L.ac.chip.size, style: 'on-black' });
    };
    S.colours = (a, e, { wipe = true } = {}) => {
      if (wipe) UI.wipe(WHITE, a - 0.3, a + 0.3, { z: 95 });
      UI.bg(WHITE, a, e);
      UI.title(['Pick your colour.'], { from: a + 0.1, to: e, x, y: L.colours.title.y, size: L.colours.title.size, color: BLACK, outAt: e - a - 0.45 });
      UI.text('Three fabrics. Natural timber.', { from: a + 0.4, to: e, x, y: L.colours.sub.y, size: L.colours.sub.size, color: BLACK, weight: 400 });
      const pods = ['duneShadow', 'duneOat', 'duneOlive'];
      const ph = L.colours.pod.h, pw = Math.round(ph * 0.542), px = L.colours.pod.cx - pw / 2, py = L.colours.pod.y;
      const seg = (e - a - 0.5) / 3;
      pods.forEach((key, i) => {
        const s0 = a + i * seg, e0 = (i === 2) ? e : s0 + seg + 0.35;
        UI.product(R[key], { from: s0, to: e0, x: px, y: py, w: pw, h: ph, inD: 0.45, outD: 0.3, dy: 0, s0: 1.0, s1: 1.0, exit: i === 2 ? 'none' : undefined,
          tweens: { opacity: [[0, 0], [0.35, 1], [e0 - s0 - 0.35, 1], [e0 - s0, i === 2 ? 1 : 0]], x: [[0, 40], [0.6, 0, 'outExpo']], y: [[0, 0]], scale: [[0, 1]] } });
      });
      MG.swatches({ from: a + 0.3, to: e, x: L.colours.sw.x, y: L.colours.sw.y, colours: ['#5B5B5B', '#D9CFC0', '#8E9B72'], size: L.colours.sw.size, gap: 30, ringColor: BLACK, active: (lt) => Math.min(2, Math.floor(Math.max(0, lt - 0.3) / seg)) });
      UI.chip('Set up in under an hour', { from: a + 0.9, to: e, x: L.colours.chips.x, y: L.colours.chips.ys[0], size: L.colours.chips.size, style: 'on-white' });
      UI.chip('Moves on concealed wheels', { from: a + 1.05, to: e, x: L.colours.chips.x, y: L.colours.chips.ys[1], size: L.colours.chips.size, style: 'on-white' });
    };
    S.meetNest = (a, e, { question = true, wipe = true, qDur = 2.3 } = {}) => {
      if (wipe) UI.wipe(BLACK, a - 0.3, a + 0.3, { z: 95 });
      UI.bg(BLACK, a, e);
      plate('n_orbit', { from: a, to: e, count: 201, offset: 3.4, pan: [-180, -180], kb: { s0: 1.0, s1: 1.05 }, innerTweens: { bright: question ? [[0, 0.55], [qDur - 0.4, 0.55], [qDur + 0.2, 1.0]] : [[0, 1.0]] } });
      UI.scrim({ from: a, to: e, dir: 'bottom', alpha: 0.62, h: L.intro.scrimH });
      let t0 = a + 0.25;
      if (question) {
        UI.title(['Need room', 'for the team?'], { from: a + 0.1, to: a + qDur, x, y: L.intro.q.y, size: L.intro.q.size, color: WHITE, outAt: qDur - 0.45, outD: 0.35 });
        t0 = a + qDur;
      }
      UI.title([{ text: 'Meet Nest', dot: true }], { from: t0, to: e, x, y: L.intro.title.y, size: L.intro.title.size, color: WHITE, outAt: e - t0 - 0.45 });
      UI.text('Phone booth to meeting room.', { from: t0 + 0.4, to: e, x, y: L.intro.sub.y, size: L.intro.sub.size, color: WHITE, weight: 500, outD: 0.3 });
      UI.chip('Acoustic office pod range', { from: t0 + 0.7, to: e, x, y: L.intro.chip.y, size: L.intro.chip.size, style: 'lime' });
    };
    S.sizes = (a, e, { wipe = true } = {}) => {
      if (wipe) UI.wipe(WHITE, a - 0.3, a + 0.3, { z: 95 });
      UI.bg(WHITE, a, e);
      UI.title(['One to six people.'], { from: a + 0.1, to: e, x, y: L.sizes.title.y, size: L.sizes.title.size, color: BLACK, outAt: e - a - 0.45 });
      UI.text('Four sizes. Same quiet.', { from: a + 0.4, to: e, x, y: L.sizes.sub.y, size: L.sizes.sub.size, color: BLACK, weight: 400 });
      const sizes = [
        { key: 'nestS', label: 'Nest S', n: 1, mm: 'W 1080 mm' },
        { key: 'nestM', label: 'Nest M', n: 2, mm: 'W 1600 mm' },
        { key: 'nestL', label: 'Nest L', n: 4, mm: 'W 2300 mm' },
        { key: 'nestXL', label: 'Nest XL', n: 6, mm: 'W 2600 mm' },
      ];
      const ph = L.sizes.pod.h, each = (e - a - 0.2) / 4;
      sizes.forEach((s, i) => {
        const s0 = a + i * each, e0 = (i === 3) ? e : s0 + each + 0.15;
        const pw = Math.round(ph * AR[s.key]);
        const px = L.sizes.pod.cx - pw / 2;
        const last = i === 3;
        UI.product(R[s.key], { from: s0, to: e0, x: px, y: L.sizes.pod.y, w: pw, h: ph, inD: 0.45, outD: 0.2, dy: 20, s0: 0.9, s1: 1, exit: last ? 'none' : undefined });
        MG.dimension({ from: s0, to: e0, x: px, y: L.sizes.dim.y, w: pw, label: s.mm, delay: 0.15, dur: 0.5, exit: last ? 'none' : undefined });
        UI.chip(`${s.label}`, { from: s0 + 0.05, to: e0, x: L.sizes.chip.x, y: L.sizes.chip.y, size: L.sizes.chip.size, style: 'on-white', inD: 0.4, outD: 0.2, exit: last ? 'none' : undefined });
        MG.people({ from: s0, to: e0, x: L.sizes.people.x, y: L.sizes.people.y, n: s.n, size: L.sizes.people.size, gap: 6, delay: 0.2, stagger: 0.07, exit: last ? 'none' : undefined });
      });
    };
    S.trust = (a, e) => {
      UI.bg(BLACK, a, e);
      plate('n_stool', { from: a, to: e, count: 151, offset: 0.5, pan: [-180, -180], kb: { s0: 1.0, s1: 1.06 }, innerTweens: { bright: [[0, 0.5]] } });
      UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.35 });
      UI.title(['Built to last.'], { from: a + 0.05, to: e, x, y: L.trust.title.y, size: L.trust.title.size, color: WHITE, outAt: 99 });
      UI.text('Certified for safety, quality and low emissions.', { from: a + 0.4, to: e, x, y: L.trust.sub.y, size: L.trust.sub.size, color: WHITE, weight: 400, width: L.trust.sub.width, exit: 'none' });
      const Bd = L.trust.badges;
      MG.badge({ from: a + 0.5, to: e, x: Bd.xs[0], y: Bd.y, size: Bd.size, line1: '5-year', line2: 'warranty', color: WHITE, fontSize: Bd.size * 0.176, subSize: Bd.size * 0.104, delay: 0 });
      MG.badge({ from: a + 0.5, to: e, x: Bd.xs[1], y: Bd.y, size: Bd.size, line1: 'GREENGUARD', line2: 'Gold certified', color: LIME, fontSize: Bd.size * 0.112, subSize: Bd.size * 0.096, delay: 0.2 });
      MG.badge({ from: a + 0.5, to: e, x: Bd.xs[2], y: Bd.y, size: Bd.size, line1: 'AS 2208', line2: 'safety glass', color: WHITE, fontSize: Bd.size * 0.144, subSize: Bd.size * 0.096, delay: 0.4 });
      UI.chip('Standard colours in stock · 5 to 7 business days', { from: a + 1.2, to: e, x, y: L.trust.chip.y, size: L.trust.chip.size, style: 'on-black', exit: 'none' });
    };
    S.twoPods = (a, e) => {
      UI.wipe(LIME, a - 0.3, a + 0.3, { z: 95 });
      UI.bg(WHITE, a, e);
      UI.title(['Two pods.', 'One quiet office.'], { from: a + 0.1, to: e, x, y: L.both.title.y, size: L.both.title.size, color: BLACK, outAt: e - a - 0.45 });
      const hD = L.both.hD, hN = Math.round(hD * 2326 / 2207);
      const wD = Math.round(hD * AR.duneOlive2), wN = Math.round(hN * AR.nestM);
      const gapX = L.both.gap, x0 = Math.round(L.both.cx - (wD + gapX + wN) / 2), baseline = L.both.baseline;
      UI.product(R.duneOlive2, { from: a + 0.2, to: e, x: x0, y: baseline - hD, w: wD, h: hD, inD: 0.7, dy: 50, exit: 'none' });
      UI.product(R.nestM, { from: a + 0.35, to: e, x: x0 + wD + gapX, y: baseline - hN, w: wN, h: hN, inD: 0.7, dy: 50, exit: 'none' });
      const ls = L.both.label.size;
      UI.rule({ from: a + 0.6, to: e, x: x0, y: baseline + 50, w: 110, h: 10, exit: 'none' });
      UI.text('<b>Dune</b><br>Solo focus', { from: a + 0.7, to: e, x: x0, y: baseline + 78, size: ls, color: BLACK, weight: 400, lineHeight: 1.2, exit: 'none' });
      UI.rule({ from: a + 0.75, to: e, x: x0 + wD + gapX, y: baseline + 50, w: 110, h: 10, exit: 'none' });
      UI.text('<b>Nest</b><br>Teams of 1 to 6', { from: a + 0.85, to: e, x: x0 + wD + gapX, y: baseline + 78, size: ls, color: BLACK, weight: 400, lineHeight: 1.2, exit: 'none' });
      const C = L.both.chips;
      UI.chip('Australian-owned', { from: a + 1.3, to: e, x: C.x, y: C.ys[0], size: C.size, style: 'on-white', exit: 'none' });
      UI.chip('Nationwide delivery and assembly', { from: a + 1.42, to: e, x: C.sideBySide ? C.x + 400 : C.x, y: C.ys[1], size: C.size, style: 'on-white', exit: 'none' });
    };
    S.cta = (a, e, { clip = 'ad_woman', count = 151, offset = 0.2 } = {}) => {
      UI.bg(BLACK, a, e);
      plate(clip, { from: a, to: e, count, offset, pan: [-180, -180], kb: { s0: 1.0, s1: 1.05 }, innerTweens: { bright: [[0, 0.45]] } });
      UI.scrim({ from: a, to: e, dir: 'full', alpha: 0.4 });
      UI.title(['Need a', 'quiet space?'], { from: a + 0.1, to: e, x, y: L.cta.t1.y, size: L.cta.t1.size, color: WHITE, exit: 'none' });
      UI.title([{ text: 'Let\'s talk', dot: true }], { from: a + 1.0, to: e, x, y: L.cta.t2.y, size: L.cta.t2.size, color: WHITE, exit: 'none' });
      UI.chip('jasonl.com.au', { from: a + 1.5, to: e, x, y: L.cta.chip.y, size: L.cta.chip.size, style: 'lime', exit: 'none' });
      UI.text('Showrooms · Same-day metro delivery · Trade pricing', { from: a + 1.9, to: e, x, y: L.cta.text.y, size: L.cta.text.size, color: WHITE, weight: 400, exit: 'none' });
      UI.logo('white-slogan', { from: a + 0.6, to: e, x, y: L.cta.logo.y, w: L.cta.logo.w, exit: 'none' });
    };
    S.wipe = (color, t0, t1) => UI.wipe(color, t0, t1, { z: 95 });

    S.DUNE_FEATURES = [
      { clip: 'ad_panel', count: 101, offset: 1.6, title: ['Everything at', 'your fingertips.'], chip: 'Touch-screen controls · dual GPO · USB-A · USB-C' },
      { clip: 'ad_led_slow', count: 66, offset: 0.0, title: ['Light that\'s easy', 'on the eyes.'], chip: 'Flicker-free LED · CRI above 90' },
    ];
    S.NEST_FEATURES = [
      { clip: 'n_ledpan', count: 151, offset: 3.0, title: ['Fresh air in', 'three minutes.'], chip: 'Low-noise turbo fan · adjustable light', kb: { s0: 1.0, s1: 1.06 }, ring: { label: '3', sub: 'min' } },
      { clip: 'an_outlet', count: 101, offset: 0.8, title: ['Power where', 'you need it.'], chip: 'Dual GPO · USB-A · USB-C' },
    ];
    S.DUNE_AC = { clip: 'ad_sit', count: 126, offset: 1.5, value: 29, label: 'Sound insulation', tagIn: 'Inside Dune', note: 'Tested to ISO 23351-1', chip: 'Laminated glass · layered acoustic walls', seed: 7 };
    S.NEST_AC = { clip: 'n_lever', count: 151, offset: 0.5, value: 30, label: 'Noise reduction', tagIn: 'Inside Nest', note: 'Sound-blocking door frames', chip: 'Laminated glass · 5 + 5 mm', seed: 11 };
    return { S, L, fmt, b, BEAT, LIME, BLACK, WHITE };
  }
  window.Pods = { make, LAYOUTS, b, BEAT };
})();
