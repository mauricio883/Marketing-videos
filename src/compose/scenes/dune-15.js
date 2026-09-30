/* Dune 15 s cutdown — 31 beats. */
window.buildScene = function (ctx) {
  const { S, b, LIME } = Pods.make(ctx);
  let k = 0; const sec = (n) => { const r = [b(k), b(k + n)]; k += n; return r; };
  let a, e;
  [a, e] = sec(8); S.meetDune(0, e, { question: true, qDur: 1.9 });
  [a, e] = sec(5); S.feature(a, e, S.DUNE_FEATURES[0], 0);
  [a, e] = sec(5); S.acoustics(a, e, S.DUNE_AC, { short: true });
  [a, e] = sec(6); S.colours(a, e);
  S.wipe(LIME, e - 0.3, e + 0.3);
  [a, e] = sec(7); S.cta(a, e + 0.2);
  return { duration: e + 0.2 };
};
