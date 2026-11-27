// Geometria dzielnicy: poziomy (ulice) z przystankami-lekcjami, rozwidlenia, trasy.
// Jednostki logiczne: szerokość 320, kafel 16.
import { levelsOf } from './content.js';

export const T = 16, COLS = 20, MW = COLS * T;
export const C = 160, LX = 48, RX = 272;
const TOP = 2, BOT = 2;

export function layoutDistrict(d) {
  let levels;
  if (d.ready) levels = levelsOf(d).map(lv => ({ lessons: lv.lessons }));
  else levels = [0, 1, 2, 3, 4].map(i => ({ lessons: [{ id: `${d.id}x${i}`, fake: true, boss: i === 4, scene: i === 4 ? d.scene : 'house', num: i + 1 }] }));
  let entry = C;
  levels.forEach((lv, k) => {
    const bt = TOP + 8 * k;
    lv.k = k; lv.blockTop = bt; lv.roadY = (bt + 6) * T; lv.fork = lv.lessons.length > 1;
    const next = levels[k + 1];
    if (lv.fork) {
      lv.entry = C; lv.exit = C;
      lv.stops = [{ lesson: lv.lessons[0], x: 64 }, { lesson: lv.lessons[1], x: 256 }];
    } else {
      lv.entry = entry;
      lv.exit = !next || next.lessons.length > 1 ? C : entry === C ? (k % 2 ? LX : RX) : entry === RX ? LX : RX;
      let x;
      if (entry === C) x = lv.exit === RX ? 80 : lv.exit === LX ? 240 : 80;
      else if (entry === RX) x = lv.exit === LX ? 152 : 84;
      else x = lv.exit === RX ? 168 : 236;
      lv.stops = [{ lesson: lv.lessons[0], x }];
    }
    const xs = [lv.entry, lv.exit, ...lv.stops.map(s => s.x)];
    lv.x0 = Math.max(12, Math.min(...xs) - 28); lv.x1 = Math.min(MW - 12, Math.max(...xs) + 28);
    entry = lv.exit;
  });
  const rows = TOP + 8 * levels.length + BOT;
  return { d, rows, H: rows * T, levels, TOP };
}

// Trasa (łamana) po ulicach między punktami {k: poziom (-1 = wejście od góry), x}
export function routeBetween(L, a, b) {
  const y = k => (k < 0 ? 0 : k >= L.levels.length ? L.H : L.levels[k].roadY);
  if (a.k === b.k) return [[a.x, y(a.k)], [b.x, y(b.k)]];
  if (a.k > b.k) return routeBetween(L, b, a).reverse();
  const pt = [[a.x, y(a.k)]];
  for (let k = a.k; k < b.k; k++) {
    const ex = k < 0 ? C : L.levels[k].exit;
    pt.push([ex, y(k)], [ex, y(k + 1)]);
  }
  pt.push([b.x, y(b.k)]);
  return pt.filter((p, i) => i === 0 || p[0] !== pt[i - 1][0] || p[1] !== pt[i - 1][1]);
}
