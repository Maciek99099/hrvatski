// Geometria dzielnicy: poziomy (ulice) z przystankami-lekcjami, rozwidlenia, trasy.
// Jednostki logiczne: szerokość 320, kafel 16.
import { levelsOf } from './content.js';

export const T = 16, COLS = 20, MW = COLS * T;
export const C = 160, LX = 48, RX = 272;
const TOP = 2, BOT = 2;

// każda dzielnica ma własny, stały układ ulic (ziarno = id dzielnicy)
function rnd(seed) { let a = 2166136261; for (const ch of seed) a = Math.imul(a ^ ch.charCodeAt(0), 16777619) >>> 0; return () => ((a = (Math.imul(a, 1664525) + 1013904223) >>> 0) / 4294967296); }
const pick = (r, arr) => arr[Math.floor(r() * arr.length) % arr.length];

export function layoutDistrict(d) {
  let levels;
  if (d.ready) levels = levelsOf(d).map(lv => ({ lessons: lv.lessons }));
  else levels = [0, 1, 2, 3, 4].map(i => ({ lessons: [{ id: `${d.id}x${i}`, fake: true, boss: i === 4, scene: i === 4 ? d.scene : 'house', num: i + 1 }] }));
  const r = rnd(d.id + ':ulice'), n = levels.length;
  const isFork = k => !!levels[k] && levels[k].lessons.length > 1;
  const JUNC = [128, 160, 192];
  const start = isFork(0) ? pick(r, JUNC) : pick(r, [96, 128, 160, 192, 224]);
  let entry = start, bt = TOP;
  levels.forEach((lv, k) => {
    const g = 7 + Math.floor(r() * 3);           // różne odstępy między ulicami
    lv.k = k; lv.blockTop = bt; lv.roadY = (bt + g - 2) * T; lv.fork = isFork(k);
    if (lv.fork) {
      lv.entry = lv.exit = entry;                  // skrzyżowanie: w lewo albo w prawo
      const a = Math.max(52, Math.round(entry - 64 - r() * 40)), b = Math.min(268, Math.round(entry + 64 + r() * 40));
      lv.stops = [{ lesson: lv.lessons[0], x: a }, { lesson: lv.lessons[1], x: b }];
    } else {
      lv.entry = entry;
      if (k === n - 1) lv.exit = pick(r, [LX, 96, 160, 224, RX]);
      else if (isFork(k + 1)) lv.exit = pick(r, JUNC);
      else lv.exit = pick(r, [LX, 96, 224, RX].filter(x => Math.abs(x - entry) >= 64));
      const c = [];
      for (let x = 52; x <= 268; x += 4) if (Math.abs(x - lv.entry) >= 48 && Math.abs(x - lv.exit) >= 48) c.push(x);
      lv.stops = [{ lesson: lv.lessons[0], x: pick(r, c) }];
    }
    const xs = [lv.entry, lv.exit, ...lv.stops.map(s => s.x)];
    lv.x0 = Math.max(12, Math.min(...xs) - 28); lv.x1 = Math.min(MW - 12, Math.max(...xs) + 28);
    entry = lv.exit; bt += g;
  });
  const rows = bt + BOT;
  return { d, rows, H: rows * T, levels, TOP, start };
}

// Trasa (łamana) po ulicach między punktami {k: poziom (-1 = wejście od góry), x}
export function routeBetween(L, a, b) {
  const y = k => (k < 0 ? 0 : k >= L.levels.length ? L.H : L.levels[k].roadY);
  if (a.k === b.k) return [[a.x, y(a.k)], [b.x, y(b.k)]];
  if (a.k > b.k) return routeBetween(L, b, a).reverse();
  const pt = [[a.x, y(a.k)]];
  for (let k = a.k; k < b.k; k++) {
    const ex = k < 0 ? L.start : L.levels[k].exit;
    pt.push([ex, y(k)], [ex, y(k + 1)]);
  }
  pt.push([b.x, y(b.k)]);
  return pt.filter((p, i) => i === 0 || p[0] !== pt[i - 1][0] || p[1] !== pt[i - 1][1]);
}
