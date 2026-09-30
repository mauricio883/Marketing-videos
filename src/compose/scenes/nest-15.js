/* Nest 15 s cutdown — 31 beats. */
window.buildScene = function (ctx) {
  const { S, b, LIME } = Pods.make(ctx);
  let k = 0; const sec = (n) => { const r = [b(k), b(k + n)]; k += n; return r; };
  let a, e;
  [a, e] = sec(8); S.meetNest(0, e, { question: true, wipe: false, qDur: 1.9 });
  [a, e] = sec(8); S.sizes(a, e);
  [a, e] = sec(5); S.feature(a, e, S.NEST_FEATURES[0], 0);
  [a, e] = sec(5); S.acoustics(a, e, S.NEST_AC, { short: true });
  [a, e] = sec(5); S.cta(a, e + 0.3, { clip: 'n_interior', count: 151, offset: 0.5 });
  return { duration: e + 0.3 };
};
