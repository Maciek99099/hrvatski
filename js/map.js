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
import { streakAlive, level, dueWords, weakestWords } from './progress.js';

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
  const r = rng(Lo.d.id), H = Lo.H, lv = Lo.levels;
  let s = '';
  const block = (x0, y0, x1, y1) => {
    // kwartał podzielony na kilka bloków
    let x = x0;
    while (x < x1 - 20) {
      let w = 64 + r() * 70; if (x1 - (x + w) < 40) w = x1 - x;
      const bx = x, bw = Math.min(w, x1 - x) - 10;
      if (bw > 16) {
        const park = r() < 0.16;
        s += `<rect x="${bx}" y="${y0}" width="${bw}" height="${y1 - y0}" rx="9" class="${park ? 'park' : 'blk'}"/>`;
        if (park) {
          if (bw > 50 && r() < 0.6) s += `<circle cx="${bx + bw / 2}" cy="${(y0 + y1) / 2}" r="9" class="pond"/>`;
          for (let i = 0; i < bw / 14; i++) s += `<circle cx="${bx + 7 + r() * (bw - 14)}" cy="${y0 + 7 + r() * (y1 - y0 - 14)}" r="${2.5 + r() * 2.5}" class="tr"/>`;
        } else {
          const n = Math.max(1, Math.round(bw / 34));
          const fw = (bw - 8 - (n - 1) * 5) / n;
          for (let i = 0; i < n; i++) {
            const hh = (y1 - y0 - 8);
            if (r() < 0.5) { s += `<rect x="${bx + 4 + i * (fw + 5)}" y="${y0 + 4}" width="${fw}" height="${hh}" rx="4" class="fp"/>`; }
            else { const h1 = hh * (0.4 + r() * 0.2); s += `<rect x="${bx + 4 + i * (fw + 5)}" y="${y0 + 4}" width="${fw}" height="${h1}" rx="4" class="fp"/><rect x="${bx + 4 + i * (fw + 5)}" y="${y0 + 8 + h1}" width="${fw}" height="${hh - h1 - 4}" rx="4" class="fp"/>`; }
          }
        }
      }
      x += w;
    }
  };
  // pasy kwartałów między ulicami
  const ys = [0, ...lv.map(v => v.roadY), H];
  for (let i = 0; i < ys.length - 1; i++) {
    const y0 = i === 0 ? 8 : ys[i] + 20, y1 = i === ys.length - 2 ? H - 8 : ys[i + 1] - 20;
    if (y1 - y0 > 20) block(6, y0, MW - 2, y1);
  }
  // ulice (wycinają kwartały)
  const road = (x0, y0, x1, y1) => `<path d="M${x0} ${y0} L${x1} ${y1}" class="road"/>`;
  s += road(C, -10, C, lv[0].roadY);
  lv.forEach((v, k) => {
    s += road(Math.max(-10, v.x0 - 30), v.roadY, Math.min(MW + 10, v.x1 + 30), v.roadY);
    const ny = lv[k + 1] ? lv[k + 1].roadY : H + 10;
    s += road(v.exit, v.roadY, v.exit, ny);
  });
  // boczne uliczki dla wrażenia siatki
  for (let i = 0; i < lv.length; i++) { const x = [40, 120, 200, 280][(i * 3) % 4]; const y0 = lv[i].roadY, y1 = lv[i + 1] ? lv[i + 1].roadY : H; if (Math.abs(x - lv[i].exit) > 40) s += `<path d="M${x} ${y0} L${x} ${y1}" class="road thin"/>`; }
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
      ${locked ? `<div class="lockmsg">${icon('lock', 18)} ${d.ready ? t('map.lockedDistrict') : t('map.soonLong')}</div>` : ''}</div>
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
    const atPin = map.querySelector(`.pin[data-x="${x}"][data-y="${y}"]`) && Math.abs(x - C) > 1;
    const off = atPin ? (x < C ? 22 : -54) : -16;
    walker.style.transform = `translate(${x * scale + off}px, ${y * scale - 40}px)${dx < 0 ? ' scaleX(-1)' : ''}`;
  }
  if (target) {
    walkerCity = target.city;
    walker = h(`<img class="walker" src="${kikiFrames()[0]}" width="32" height="36" alt="">`);
    $('.city', walkerCity.sec).appendChild(walker);
  }
  fit();
  if (target) {
    const prev = state.lastPos ? locateId(state.lastPos, cities) : null;
    const same = prev && prev.city === target.city && prev.pt.k === target.pt.k && prev.pt.x === target.pt.x;
    const tY = target.pt.k < 0 ? 0 : target.city.Lo.levels[target.pt.k].roadY;
    if (!prev || same) placeWalker([target.pt.x, tY]);
    else walk(routeBetween(target.city.Lo, prev.city === target.city ? prev.pt : { k: -1, x: C }, target.pt));
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
  const x = both ? C : lv.stops.find(s => s.lesson === l).x;
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
