// Mapa: minimalistyczny plan miasta (ciemny), trasa po ulicach, przystanki-lekcje, rozwidlenia, Kiki.
import { state, save, today } from './store.js';
import { t, L } from './i18n.js';
import { districts, lessonStatus, isDone, isUnlocked, learnedWords, lessons, missingFor } from './content.js';
import { layoutDistrict, routeBetween, MW, C } from './layout.js';
import { KIKI_FRAMES, KIKI_PAL, spriteCanvas, kikiImg } from './pixel.js';
import { icon, sceneIcon } from './art.js';
import { h, $, stars, modal } from './ui.js';
import { esc } from './text.js';
import { toast, sound } from './fx.js';
import { streakAlive, level, dueWords, weakestWords, BADGES } from './progress.js';
import { pix } from './pixel.js';

export function goalInfo() {
  const sec = today().sec, goal = state.settings.goal * 60;
  return { min: Math.floor(sec / 60), goal: state.settings.goal, frac: Math.min(1, sec / goal) };
}

export function topStats() {
  const g = goalInfo(), lv = level();
  return `<div class="topstats">
    <span class="chip fire ${streakAlive() ? '' : 'off'}" title="${t('streak')}">${icon('fire', 17)}<b>${streakAlive()}</b></span>
    <span class="chip gold" title="XP">${icon('bolt', 17)}<b>${state.xp} XP</b></span>
    <span class="chip lvl" title="${t('level')}"><b>${t('level')} ${lv.n}</b></span>
    <span class="goal" title="${t('goal')}"><i style="width:${g.frac * 100}%"></i></span><span class="goal-t">${g.min}/${g.goal} min</span>
  </div>`;
}

const availableNow = () => lessons.filter(l => !isDone(l.id) && isUnlocked(l));

function tip() {
  const done = Object.values(state.lessons).filter(x => x.done).length;
  if (!done) return t('mascot.start');
  if (goalInfo().frac >= 1) return t('mascot.goalDone');
  const due = dueWords().length;
  if (due >= 10) return t('mascot.due').replace('{n}', due);
  if (availableNow().length > 1) return t('mascot.fork');
  const list = t('mascot.tips').split('|');
  const cur = availableNow()[0];
  return list[(done + new Date().getDate()) % list.length].replace('{place}', cur ? L(cur.place) : '');
}

function lessonCard(l) {
  const started = state.lessons[l.id]?.started;
  return `<button class="lcard2" data-go="lesson/${l.id}"><span class="lic">${icon(l.boss ? 'crown' : sceneIcon(l.scene), 22)}</span>
    <b>${esc(L(l.place))}</b><span>${esc(L(l.title))}</span><em>${started ? t('map.resume') : t('map.start')}</em></button>`;
}

export function sheet() {
  const av = availableNow();
  const due = dueWords().length, weak = weakestWords(10).length >= 4;
  const fork = av.length > 1 && av[0].after && av[1].after && av[0].after.join() === av[1].after.join();
  const head = fork ? `${icon('fork', 14)} ${t('map.choose')}` : av.length > 1 ? t('map.pick') : av.length ? t('map.next') : t('map.allDone');
  return `<div class="sheet-map"><div class="grab"></div>
    <small class="cap">${head}</small>
    <div class="nextl ${av.length > 1 ? 'two' : ''}">${av.slice(0, 2).map(lessonCard).join('')}</div>
    <div class="quick">
      <button class="q" data-go="cards">${icon('cards', 18)}<b>${due}</b><span>${t('cards.due')}</span></button>
      <button class="q" data-go="weak" ${weak ? '' : 'disabled'}>${icon('dumbbell', 18)}<b>${t('weak.short')}</b></button>
      <button class="q" data-go="words">${icon('words', 18)}<b>${learnedWords().length}</b><span>${t('words.count')}</span></button>
    </div></div>`;
}

// ── rysowanie dzielnicy (SVG, jednostki logiczne) ──
function rng(seed) { let a = 0; for (const ch of seed) a = (a * 31 + ch.charCodeAt(0)) >>> 0; return () => ((a = (a * 1103515245 + 12345) >>> 0) / 4294967296); }
const svgCache = new Map();

function cityBase(Lo) {
  const key = Lo.d.id + Lo.levels.length;
  if (svgCache.has(key)) return svgCache.get(key);
  const r = rng(Lo.d.id), H = Lo.H, lv = Lo.levels, P = n => n.toFixed(1);
  let s = '', bld = '';
  // ulice pionowe (główne i boczne) – kwartały omijają je, więc nic nie jest ucięte
  const vr = [{ x: Lo.start, y0: -10, y1: lv[0].roadY, w: 26 }];
  lv.forEach((v, k) => {
    const ny = lv[k + 1] ? lv[k + 1].roadY : H + 10;
    vr.push({ x: v.exit, y0: v.roadY, y1: ny, w: 26 });
    const x = [40, 120, 200, 280][(k * 3) % 4];
    if (Math.abs(x - v.exit) > 40) vr.push({ x, y0: v.roadY, y1: ny, w: 9, thin: 1 });
  });
  // budynek 2,5D: dach + widoczna ściana frontowa z oknami
  const building = (x, y, w, h) => {
    const ext = Math.min(7 + r() * 8, h * 0.4), fy = y + h - ext, top = 1 + Math.floor(r() * 5);
    let o = `<rect x="${P(x + 3)}" y="${P(y + 4)}" width="${P(w)}" height="${P(h)}" rx="2" class="bsh"/>`;
    o += `<rect x="${P(x)}" y="${P(fy)}" width="${P(w)}" height="${P(ext)}" class="bfr"/>`;
    const cols = Math.max(1, Math.floor(w / 6));
    for (let c = 0; c < cols; c++) o += `<rect x="${P(x + (c + 0.5) * w / cols - 1.3)}" y="${P(fy + ext / 2 - 1.6)}" width="2.6" height="3.2" class="${r() < 0.35 ? 'bwl' : 'bwd'}"/>`;
    o += `<rect x="${P(x)}" y="${P(y)}" width="${P(w)}" height="${P(h - ext)}" rx="2" class="bt${top}"/>`;
    o += `<rect x="${P(x + 2)}" y="${P(y + 2)}" width="${P(w - 4)}" height="1.5" class="bhl"/>`;
    if (r() < 0.4) o += `<rect x="${P(x + w * 0.6)}" y="${P(y + (h - ext) * 0.3)}" width="5" height="4" rx="1" class="bvent"/>`;
    return o;
  };
  const houses = (x0, y0, bw, bh) => {
    const n = Math.max(1, Math.round(bw / 32)), gap = 6, fw = (bw - 10 - (n - 1) * gap) / n;
    for (let i = 0; i < n; i++) {
      let y = y0 + 5; const x = x0 + 5 + i * (fw + gap), end = y0 + bh - 7;
      while (end - y >= 22) {
        let h = 26 + r() * 22; if (end - (y + h) < 28) h = end - y;
        bld += building(x, y, fw, h);
        y += h + 7;
      }
    }
  };
  // park 2,5D: trawnik z krawędzią, staw, drzewa z cieniem
  const park = (x0, y0, bw, bh) => {
    s += `<rect x="${x0}" y="${y0 + 5}" width="${bw}" height="${bh - 5}" rx="9" class="pkf"/><rect x="${x0}" y="${y0}" width="${bw}" height="${bh - 5}" rx="9" class="pkt"/>`;
    const ph = bh - 5;
    // ścieżka
    if (bw > 40) s += `<path d="M${P(x0 + 4)} ${P(y0 + ph * (0.3 + r() * 0.4))} Q${P(x0 + bw / 2)} ${P(y0 + ph * r())} ${P(x0 + bw - 4)} ${P(y0 + ph * (0.3 + r() * 0.4))}" class="pkp"/>`;
    let pond = null;
    if (bw > 46 && bh > 46 && r() < 0.7) {
      const rx = Math.min(18, bw / 4), ry = Math.min(11, ph / 4);
      pond = { x: x0 + rx + 8 + r() * (bw - 2 * rx - 16), y: y0 + ry + 8 + r() * (ph - 2 * ry - 16), rx, ry };
      s += `<ellipse cx="${P(pond.x)}" cy="${P(pond.y + 1.5)}" rx="${P(rx + 2)}" ry="${P(ry + 2)}" class="pnr"/><ellipse cx="${P(pond.x)}" cy="${P(pond.y)}" rx="${P(rx)}" ry="${P(ry)}" class="pnd"/><ellipse cx="${P(pond.x - rx * 0.35)}" cy="${P(pond.y - ry * 0.35)}" rx="${P(rx * 0.3)}" ry="${P(ry * 0.22)}" class="pnh"/>`;
    }
    const trees = [];
    for (let i = 0, tries = 0; i < Math.max(2, bw * ph / 420) && tries < 60; tries++) {
      const tr = 3.5 + r() * 3, tx = x0 + tr + 5 + r() * (bw - 2 * tr - 10), ty = y0 + tr + 6 + r() * (ph - 2 * tr - 12);
      if (pond && ((tx - pond.x) / (pond.rx + tr + 3)) ** 2 + ((ty - pond.y) / (pond.ry + tr + 3)) ** 2 < 1) continue;
      if (trees.some(q => Math.hypot(q[0] - tx, q[1] - ty) < q[2] + tr)) continue;
      trees.push([tx, ty, tr]); i++;
    }
    trees.sort((a, b) => a[1] - b[1]).forEach(([tx, ty, tr]) => {
      s += `<ellipse cx="${P(tx + 2)}" cy="${P(ty + tr + 1.5)}" rx="${P(tr)}" ry="${P(tr * 0.45)}" class="tsh"/><rect x="${P(tx - 0.9)}" y="${P(ty)}" width="1.8" height="${P(tr + 1.5)}" class="ttr"/><circle cx="${P(tx)}" cy="${P(ty - 1)}" r="${P(tr)}" class="tcr"/><circle cx="${P(tx - tr * 0.3)}" cy="${P(ty - 1 - tr * 0.3)}" r="${P(tr * 0.45)}" class="tch"/>`;
    });
  };
  const fill = (x0, x1, y0, y1) => {
    let x = x0;
    while (x1 - x >= 30) {
      let w = 64 + r() * 70; if (x1 - (x + w) < 44) w = x1 - x;
      const bw = w - (x + w >= x1 ? 0 : 10);
      if (r() < 0.16) park(x, y0, bw, y1 - y0);
      else { s += `<rect x="${P(x)}" y="${y0}" width="${P(bw)}" height="${y1 - y0}" rx="9" class="blk"/>`; houses(x, y0, bw, y1 - y0); }
      x += w;
    }
  };
  // pasy kwartałów między ulicami, pocięte przez ulice pionowe
  const ys = [0, ...lv.map(v => v.roadY), H];
  for (let i = 0; i < ys.length - 1; i++) {
    const y0 = i === 0 ? 8 : ys[i] + 20, y1 = i === ys.length - 2 ? H - 8 : ys[i + 1] - 20;
    if (y1 - y0 <= 24) continue;
    const mid = (y0 + y1) / 2;
    const cuts = vr.filter(v => v.y0 < mid && v.y1 > mid).map(v => [v.x - v.w / 2 - 7, v.x + v.w / 2 + 7]).sort((a, b) => a[0] - b[0]);
    let x = 6;
    for (const [a, b] of cuts) { if (a - x >= 30) fill(x, a, y0, y1); x = Math.max(x, b); }
    if (MW - 6 - x >= 30) fill(x, MW - 6, y0, y1);
  }
  // ulice
  const road = (x0, y0, x1, y1) => `<path d="M${x0} ${y0} L${x1} ${y1}" class="road"/>`;
  s += road(Lo.start, -10, Lo.start, lv[0].roadY);
  lv.forEach((v, k) => {
    s += road(Math.max(-10, v.x0 - 30), v.roadY, Math.min(MW + 10, v.x1 + 30), v.roadY);
    const ny = lv[k + 1] ? lv[k + 1].roadY : H + 10;
    s += road(v.exit, v.roadY, v.exit, ny);
  });
  vr.filter(v => v.thin).forEach(v => { s += `<path d="M${v.x} ${v.y0} L${v.x} ${v.y1}" class="road thin"/>`; });
  s += bld;
  if (Lo.d.id === 'd1') s += `<path d="M-5 6 H325" class="rail"/><path d="M-5 6 H325" class="rail-d"/>`;
  svgCache.set(key, s);
  return s;
}

function routes(Lo) {
  let s = '';
  const st = l => (l.fake ? 'locked' : lessonStatus(l));
  const cls = arr => (arr.some(x => x === 'done') ? 'done' : arr.some(x => x === 'open' || x === 'progress') ? 'next' : 'dim');
  const seg = (pts, c) => `<polyline points="${pts.map(p => p.join(',')).join(' ')}" class="rt ${c}"/>`;
  Lo.levels.forEach((v, k) => {
    const sts = v.stops.map(x => st(x.lesson));
    const prevY = k ? Lo.levels[k - 1].roadY : 0;
    s += seg([[v.entry, prevY], [v.entry, v.roadY]], cls(sts));
    v.stops.forEach((x, i) => { s += seg([[v.entry, v.roadY], [x.x, v.roadY]], cls([sts[i]])); });
    if (!v.stops.some(x => (x.x - v.entry) * (v.exit - v.entry) >= 0 && Math.abs(x.x - v.entry) >= Math.abs(v.exit - v.entry)))
      s += seg([[v.entry, v.roadY], [v.exit, v.roadY]], sts.includes('done') ? 'done' : 'dim');
  });
  const last = Lo.levels[Lo.levels.length - 1];
  s += seg([[last.exit, last.roadY], [last.exit, Lo.H]], last.stops.every(x => st(x.lesson) === 'done') ? 'done' : 'dim');
  return s;
}

let KIKI = null;
const kikiFrames = () => (KIKI ||= KIKI_FRAMES.map(f => spriteCanvas(f, KIKI_PAL).toDataURL()));

export function renderMap(root, nav) {
  const el = h(`<div class="map-screen">
    <header class="apphead">${topStats()}</header>
    <div class="map-layout">
      <div class="map-scroll"><div class="map"></div></div>
      <aside class="side"><div class="tip">${kikiImg(3)}<p>${esc(tip())}</p></div>${sheet()}</aside>
    </div></div>`);
  root.replaceChildren(el);
  const map = $('.map', el);
  const avail = availableNow();
  const cities = [];

  for (const d of districts) {
    const Lo = layoutDistrict(d);
    const doneN = d.lessons.filter(l => isDone(l.id)).length;
    const locked = !d.ready || lessonStatus(d.lessons[0]) === 'locked';
    const sec = h(`<section class="dist ${locked ? 'locked' : ''}" data-d="${d.id}">
      <div class="dhead"><span class="dnum">${d.index + 1}</span><div><b>${esc(d.hr)}</b><small>${esc(L(d))}</small></div>
        <span class="dprog">${d.ready ? `${doneN}/${d.lessons.length}` : t('map.soon')}</span></div>
      <div class="city"><svg class="citysvg" viewBox="0 0 ${MW} ${Lo.H}" preserveAspectRatio="xMidYMin meet">${cityBase(Lo)}${routes(Lo)}</svg><div class="pins"></div>
      ${locked ? `<div class="lockmsg" style="top:${(((Lo.levels[1] || Lo.levels[0]).roadY + (Lo.levels[2] || Lo.levels[0]).roadY) / 2 + 10) / Lo.H * 100}%">${icon('lock', 18)} ${d.ready ? t('map.lockedDistrict') : t('map.soonLong')}</div>` : ''}</div>
    </section>`);
    const pins = $('.pins', sec);
    Lo.levels.forEach(v => v.stops.forEach(sp => {
      const l = sp.lesson;
      const st = l.fake ? 'locked' : lessonStatus(l);
      const ic = st === 'done' ? 'check' : st === 'locked' ? 'lock' : l.boss ? 'crown' : sceneIcon(l.scene);
      const p = state.lessons[l.id];
      pins.appendChild(h(`<button class="pin ${st} ${l.boss ? 'boss' : ''} ${avail.includes(l) ? 'avail' : ''}" data-x="${sp.x}" data-y="${v.roadY}" ${l.fake ? 'disabled' : `data-l="${l.id}"`} aria-label="${l.fake ? '' : esc(L(l.title))}">
        <span class="drop">${icon(ic, l.boss ? 20 : 17, '', 2.4)}</span>${l.fake ? '' : `<em>${esc(L(l.place))}${p?.stars ? ` <i>${'★'.repeat(p.stars)}</i>` : ''}</em>`}</button>`));
    }));
    map.appendChild(sec);
    cities.push({ d, Lo, sec });
  }
  map.appendChild(h(`<section class="finale"><span>🌊</span><b>${t('map.finale')}</b></section>`));

  // skalowanie: pozycje pinezek w px
  let scale = 1;
  function fit() {
    const w = map.querySelector('.city')?.clientWidth || 360;
    scale = w / MW;
    map.querySelectorAll('.pin').forEach(p => { p.style.left = `${p.dataset.x * scale}px`; p.style.top = `${p.dataset.y * scale}px`; });
    if (walker && walkerPos) placeWalker(walkerPos);
  }

  // Kiki
  let walker = null, walkerPos = null, walkerCity = null;
  const target = locate(avail, cities);
  function placeWalker([x, y], dx = 0) {
    walkerPos = [x, y];
    // stoi obok pinezki (po stronie bliższej środka), na skrzyżowaniu – na środku
    const atPin = !!map.querySelector(`.pin[data-x="${x}"][data-y="${y}"]`);
    const off = atPin ? (x < MW / 2 ? 22 : -67) : -22;
    walker.style.transform = `translate(${x * scale + off}px, ${y * scale - 56}px)${dx < 0 ? ' scaleX(-1)' : ''}`;
  }
  if (target) {
    walkerCity = target.city;
    walker = h(`<img class="walker" src="${kikiFrames()[0]}" width="45" height="50" alt="Kiki" role="button">`);
    walker.addEventListener('click', e => { e.stopPropagation(); kikiProfile(); });
    $('.city', walkerCity.sec).appendChild(walker);
  }
  fit();
  if (target) {
    const prev = state.lastPos ? locateId(state.lastPos, cities) : null;
    const same = prev && prev.city === target.city && prev.pt.k === target.pt.k && prev.pt.x === target.pt.x;
    const tY = target.pt.k < 0 ? 0 : target.city.Lo.levels[target.pt.k].roadY;
    if (!prev || same) placeWalker([target.pt.x, tY]);
    else walk(routeBetween(target.city.Lo, prev.city === target.city ? prev.pt : { k: -1, x: target.city.Lo.start }, target.pt));
    state.lastPos = target.key; save();
  }
  function walk(pts) {
    const segs = []; let total = 0;
    for (let i = 1; i < pts.length; i++) { const len = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push({ a: pts[i - 1], b: pts[i], len }); total += len; }
    placeWalker(pts[0]);
    if (!total) return;
    let t0 = null;
    const step = now => {
      if (!walker.isConnected) return;
      t0 ??= now;
      let dist = Math.min(total, ((now - t0) / 1000) * 90), i = 0;
      while (i < segs.length - 1 && dist > segs[i].len) { dist -= segs[i].len; i++; }
      const sg = segs[i], f = sg.len ? Math.min(1, dist / sg.len) : 1;
      walker.src = kikiFrames()[((now / 170) | 0) % 2];
      placeWalker([sg.a[0] + (sg.b[0] - sg.a[0]) * f, sg.a[1] + (sg.b[1] - sg.a[1]) * f], sg.b[0] - sg.a[0]);
      if (((now - t0) / 1000) * 90 < total) requestAnimationFrame(step); else walker.src = kikiFrames()[0];
    };
    setTimeout(() => requestAnimationFrame(step), 400);
  }

  // przewiń do bieżącego miejsca
  const ms = $('.map-scroll', el);
  const scroller = () => (getComputedStyle(ms).overflowY === 'auto' || getComputedStyle(ms).overflowY === 'scroll' ? ms : el.closest('.view') || ms);
  requestAnimationFrame(() => {
    const node = map.querySelector('.pin.avail') || map.querySelector('.pin.open');
    if (!node) return;
    const s = scroller(), nr = node.getBoundingClientRect(), sr = s.getBoundingClientRect();
    s.scrollTop += nr.top - sr.top - s.clientHeight * 0.4;
  });

  let rt;
  const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { if (map.isConnected) fit(); else ro.disconnect(); }, 60); });
  ro.observe(map);

  el.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go && !go.disabled) return nav(go.dataset.go);
    const n = e.target.closest('.pin[data-l]');
    if (!n) return;
    const l = lessons.find(x => x.id === n.dataset.l);
    const st = lessonStatus(l);
    if (st === 'locked') {
      const miss = missingFor(l);
      toast(`🔒 ${l.boss && miss.length ? t('map.bossNeeds') + ' ' + miss.map(m => '„' + esc(L(m.place)) + '”').join(', ') : l.num === 1 ? t('map.lockedDistrict') : t('map.locked')}`, 3500);
      sound('bad'); return;
    }
    openLessonCard(l, st, nav);
  });
}

function locate(avail, cities) {
  if (!avail.length) return null;
  const l = avail[avail.length - 1];
  const c = cities.find(x => x.d === l.district);
  const lv = c.Lo.levels.find(v => v.stops.some(s => s.lesson === l));
  const both = avail.filter(a => lv.stops.some(s => s.lesson === a)).length > 1;
  const x = both ? lv.exit : lv.stops.find(s => s.lesson === l).x;
  return { city: c, pt: { k: lv.k, x }, key: `${l.district.id}:${lv.k}:${x}` };
}
function locateId(key, cities) {
  const [did, k, x] = String(key).split(':');
  const c = cities.find(v => v.d.id === did);
  return c && x != null ? { city: c, pt: { k: +k, x: +x } } : null;
}

async function openLessonCard(l, st, nav) {
  const p = state.lessons[l.id];
  const sibling = l.after && l.district.lessons.find(x => x !== l && x.after && x.after.join() === l.after.join());
  const body = `<div class="lcard"><span class="lic big">${icon(l.boss ? 'crown' : sceneIcon(l.scene), 30)}</span>
    <small>${esc(l.district.hr)} · ${esc(L(l.place))}</small>
    <p class="lc-title">${esc(L(l.title))}</p>
    <p class="muted">${l.boss ? t('map.bossInfo') : `${l.words.length} ${t('map.newWords')} · ${t('map.grammar')}: ${esc(L(l.grammar?.title) || '–')}`}</p>
    ${sibling && !isDone(sibling.id) ? `<p class="fork-note">${icon('fork', 14)} ${t('map.forkNote').replace('{other}', esc(L(sibling.place)))}</p>` : ''}
    ${p?.done ? `<div class="lc-best">${stars(p.stars)} <small>${t('map.best')}: ${p.best}%</small></div>` : ''}</div>`;
  const v = await modal({ body, actions: [{ label: t('close'), value: null }, { label: st === 'done' ? t('map.replay') : st === 'progress' ? t('map.resume') : t('map.start'), value: 'go', cls: 'primary' }] });
  if (v === 'go') nav(`lesson/${l.id}`);
}

// Profil Kiki – po stuknięciu postaci na mapie
export async function kikiProfile() {
  const lv = level(), lang = state.settings.lang;
  const done = Object.values(state.lessons).filter(x => x.done).length;
  const got = BADGES.filter(b => state.badges[b.id]).sort((a, b) => state.badges[b.id] - state.badges[a.id]);
  const cur = districts.find(d => d.lessons.some(l => !isDone(l.id))) || [...districts].reverse().find(d => d.lessons.length);
  const body = `<div class="kprof">${kikiImg(4)}<div style="flex:1">
      <h3>Kiki</h3><div class="lvl">${t('level')} ${lv.n} · ${state.xp} XP</div>
      <div class="kbar"><i style="width:${Math.round(lv.frac * 100)}%"></i></div>
      <div class="kbar-t">${t('kiki.next').replace('{n}', lv.hi - state.xp).replace('{l}', lv.n + 1)}</div></div></div>
    <div class="kgrid">
      <div>${pix('🔥', 24)}<span><b>${streakAlive()}</b><small>${t('stats.streak')} · ${t('stats.best')} ${state.streak.best || 0}</small></span></div>
      <div>${pix('📗', 24)}<span><b>${learnedWords().length}</b><small>${t('stats.words')}</small></span></div>
      <div>${pix('✅', 24)}<span><b>${done}</b><small>${t('stats.lessons')}</small></span></div>
      <div>${pix('📍', 24)}<span><b>${esc(cur ? cur.hr : '')}</b><small>${t('kiki.where')}</small></span></div>
    </div>
    <div class="kbadges"><h4>${t('kiki.badges')} · ${got.length}/${BADGES.length}</h4>
      ${got.length ? `<ul>${got.slice(0, 3).map(b => `<li>${pix(b.ico, 24)}<span><b>${esc(b[lang][0])}</b><small>${esc(b[lang][1])}</small></span></li>`).join('')}</ul>` : `<p>${t('kiki.noBadges')}</p>`}</div>`;
  const v = await modal({ body, actions: [{ label: t('close'), value: null }, { label: t('kiki.all'), value: 'stats', cls: 'primary' }] });
  if (v === 'stats') location.hash = '#/stats';
}
