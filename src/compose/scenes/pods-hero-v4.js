/* Hero film v4 — same edit as v3, format-aware (9x16 / 1x1 / 16x9). */
window.buildScene = function (ctx) {
  const { S, b, LIME, BLACK, WHITE } = Pods.make(ctx);
  let k = 0; const sec = (n) => { const r = [b(k), b(k + n)]; k += n; return r; };
  let a, e;
  [a, e] = sec(8); S.hook(0, e);
  S.wipe(LIME, e - b(1) + b(0) + 0.1, e + 0.45);
  [a, e] = sec(8); S.meetDune(a, e);
  S.DUNE_FEATURES.forEach((c, i) => { [a, e] = sec(5); S.feature(a, e, c, i); });
  [a, e] = sec(8); S.acoustics(a, e, S.DUNE_AC);
  [a, e] = sec(8); S.colours(a, e);
  [a, e] = sec(10); S.meetNest(a, e);
  [a, e] = sec(12); S.sizes(a, e);
  S.NEST_FEATURES.forEach((c, i) => { [a, e] = sec(5); S.feature(a, e, c, i); });
  [a, e] = sec(8); S.acoustics(a, e, S.NEST_AC);
  [a, e] = sec(6); S.trust(a, e);
  [a, e] = sec(8); S.twoPods(a, e);
  [a, e] = sec(10); S.cta(a, e + 0.3);
  return { duration: e + 0.3 };
};
