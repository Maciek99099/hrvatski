// Mini-gierki. Korzystają WYŁĄCZNIE ze słów z ukończonych lekcji (learnedWords).
import { state, save } from './store.js';
import { t, L } from './i18n.js';
import { learnedWords, isDone, asArr } from './content.js';
import { recordWord, addXP, addTime, checkBadges } from './progress.js';
import { speak } from './speech.js';
import { h, $, $$, sayBtn } from './ui.js';
import { icon } from './art.js';
import { kikiImg, pix } from './pixel.js';
import { shuffle, sample, pick, esc, norm } from './text.js';
import { sound, haptic, toast, confetti } from './fx.js';

const lang = () => state.settings.lang;
const l1 = w => asArr(w[lang()])[0];
const words = () => learnedWords();
const withPic = ws => ws.filter(w => w.ico && !/[0-9]️⃣|🔟|#️⃣/.test(w.ico));
const single = ws => ws.filter(w => /^[a-zčćđšž]{3,10}$/i.test(w.hr));
const inCats = (...cats) => words().filter(w => cats.includes(w.cat));

// ── liczby i ceny po chorwacku ──
const U = ['nula', 'jedan', 'dva', 'tri', 'četiri', 'pet', 'šest', 'sedam', 'osam', 'devet', 'deset', 'jedanaest', 'dvanaest', 'trinaest', 'četrnaest', 'petnaest', 'šesnaest', 'sedamnaest', 'osamnaest', 'devetnaest'];
const TENS = ['', '', 'dvadeset', 'trideset', 'četrdeset', 'pedeset', 'šezdeset', 'sedamdeset', 'osamdeset', 'devedeset'];
export function numHr(n) {
  if (n < 20) return U[n];
  if (n === 100) return 'sto';
  const t10 = Math.floor(n / 10), u = n % 10;
  return TENS[t10] + (u ? ' ' + U[u] : '');
}
export const eura = n => `${numHr(n)} ${n % 10 === 1 && n % 100 !== 11 ? 'euro' : 'eura'}`;

// biernik do zamówień w kawiarni
const ACC = { 'kava s mlijekom': ['jednu', 'kavu s mlijekom'], 'bijela kava': ['jednu', 'bijelu kavu'] };
function orderForm(w) {
  if (ACC[w.hr]) return ACC[w.hr].join(' ');
  if (w.g === 'f' && w.hr.endsWith('a')) return `jednu ${w.hr.slice(0, -1)}u`;
  if (w.g === 'n') return `jedno ${w.hr}`;
  return `jedan ${w.hr}`;
}

// ── katalog ──
const GAMES = [
  { id: 'memory', ico: '🧠', need: () => withPic(words()).length >= 6, lock: 'games.lockFirst' },
  { id: 'race', ico: '⏱️', need: () => words().length >= 12, lock: 'games.lockD1' },
  { id: 'hangman', ico: '🔤', need: () => single(words()).length >= 6, lock: 'games.lockFirst' },
  { id: 'catch', ico: '🧺', need: () => catchCats().length > 0, lock: 'games.lockCatch' },
  { id: 'waiter', ico: '🤵', need: () => isDone('d3l1') && inCats('drinks', 'sweets', 'food').length >= 6, lock: 'games.lockD3' },
  { id: 'dolac', ico: '🍅', need: () => isDone('d4l1') && isDone('d3l4'), lock: 'games.lockD4' },
  { id: 'tram', ico: '🚋', need: () => false, lock: 'games.lockD7' },
];

function catchCats() {
  const by = {};
  for (const w of words()) if (w.cat) (by[w.cat] ||= []).push(w);
  return Object.entries(by).filter(([c, ws]) => ws.length >= 5 && !['basics', 'greetings', 'polite', 'questions'].includes(c)).map(([c]) => c);
}

export function renderGames(root, nav) {
  const el = h(`<div class="page games-page">
    <header class="pagehead"><h1>${t('nav.games')}</h1></header>
    <div class="tip">${kikiImg(3)}<p>${t('games.tip')}</p></div>
    <div class="glist">${GAMES.map(g => {
      const ok = g.need();
      return `<button class="gcard ${ok ? '' : 'locked'}" data-g="${g.id}" ${ok ? '' : 'aria-disabled="true"'}>
        <span class="gico">${g.ico}</span><div><b>${t('game.' + g.id)}</b><small>${ok ? t('game.' + g.id + '.d') : '🔒 ' + t(g.lock)}</small></div>
        ${ok ? `<span class="gbest">${state.gameBest?.[g.id] ? '★ ' + state.gameBest[g.id] : ''}</span>` : ''}</button>`;
    }).join('')}</div></div>`);
  root.replaceChildren(el);
  el.addEventListener('click', e => {
    const b = e.target.closest('[data-g]'); if (!b) return;
    const g = GAMES.find(x => x.id === b.dataset.g);
    if (!g.need()) { toast('🔒 ' + t(g.lock)); sound('bad'); return; }
    nav('game/' + g.id);
  });
}

// ── wspólna rama gry ──
function frame(root, id, onExit) {
  const el = h(`<div class="game">
    <header class="ghead"><button class="iconbtn" data-x aria-label="${t('close')}">${icon('close')}</button><b>${t('game.' + id)}</b><span class="gscore">0</span></header>
    <main class="gbody"></main></div>`);
  root.replaceChildren(el);
  const t0 = Date.now();
  let closed = false;
  const api = {
    body: $('.gbody', el),
    score(n) { $('.gscore', el).textContent = n; },
    finish(score, xp, line = '') {
      if (closed) return; closed = true;
      addTime((Date.now() - t0) / 1000);
      xp = Math.max(1, Math.round(xp));
      addXP(xp);
      state.counters.games = (state.counters.games || 0) + 1;
      state.gameBest ||= {};
      const best = state.gameBest[id] || 0;
      const record = score > best;
      if (record) state.gameBest[id] = score;
      save();
      const b = checkBadges();
      sound('win'); if (record && score > 0) confetti(90);
      api.body.innerHTML = `<div class="gend">${kikiImg(5)}<h2>${t('games.end')}</h2>
        <div class="finish-grid"><div><b>${score}</b><small>${t('games.points')}</small></div><div><b>${xp}</b><small>XP</small></div><div><b>${Math.max(score, best)}</b><small>${t('games.best')}</small></div></div>
        ${record && score > 0 ? `<p class="finish-msg">🏆 ${t('games.record')}</p>` : ''}${line ? `<p class="muted">${line}</p>` : ''}
        ${b.map(x => `<div class="badge-new">${pix(x.ico, 36)}<div><small>${t('badge.new')}</small><b>${x[lang()][0]}</b></div></div>`).join('')}
        <div class="row-btns"><button class="btn" data-again>${t('games.again')}</button><button class="btn primary" data-back>${t('games.back')}</button></div></div>`;
      $('[data-again]', api.body).onclick = () => onExit('again');
      $('[data-back]', api.body).onclick = () => onExit('back');
    },
    alive: () => !closed && el.isConnected,
  };
  $('[data-x]', el).onclick = () => { closed = true; speechSynthesis?.cancel?.(); onExit('back'); };
  return api;
}

export function runGame(root, id, nav) {
  const exit = how => (how === 'again' ? runGame(root, id, nav) : nav('games'));
  const g = frame(root, id, exit);
  ({ memory, race, hangman, catch: catchGame, waiter, dolac })[id]?.(g);
}

// ── 1. Memory ──
function memory(g) {
  const ws = sample(withPic(words()), 6);
  const cards = shuffle(ws.flatMap(w => [{ w, side: 'hr' }, { w, side: 'pic' }]));
  let open = [], pairs = 0, moves = 0, lock = false;
  g.body.innerHTML = `<p class="gtask">${t('game.memory.task')}</p><div class="mem">${cards.map((c, i) => `<button class="mcard" data-i="${i}"><span class="back">?</span><span class="front">${c.side === 'hr' ? `<b>${esc(c.w.hr)}</b>` : `${pix(c.w.ico, 40)}<small>${esc(l1(c.w))}</small>`}</span></button>`).join('')}</div><p class="gmoves"></p>`;
  const mv = $('.gmoves', g.body);
  g.body.querySelector('.mem').addEventListener('click', e => {
    const b = e.target.closest('.mcard'); if (!b || lock || b.classList.contains('up')) return;
    const c = cards[+b.dataset.i];
    b.classList.add('up'); sound('flip');
    if (c.side === 'hr') speak(c.w.hr);
    open.push([b, c]);
    if (open.length < 2) return;
    moves++; mv.textContent = `${t('games.moves')}: ${moves}`;
    const [[b1, c1], [b2, c2]] = open; open = [];
    if (c1.w.id === c2.w.id && c1.side !== c2.side) {
      pairs++; g.score(pairs); recordWord(c1.w.id, true, 0.5); haptic();
      setTimeout(() => { b1.classList.add('done'); b2.classList.add('done'); sound('ok'); }, 250);
      if (pairs === ws.length) setTimeout(() => g.finish(Math.max(1, 30 - moves), 8 + Math.max(0, 14 - moves)), 700);
    } else {
      lock = true;
      setTimeout(() => { b1.classList.remove('up'); b2.classList.remove('up'); lock = false; }, 900);
    }
  });
}

// ── 2. Wyścig z czasem (60 s) ──
function race(g) {
  const ws = words();
  let score = 0, left = 60, q = null, streak = 0;
  g.body.innerHTML = `<div class="timer big"><i></i><span></span></div><div class="rq"></div><div class="choices grid rch"></div><p class="gtask small">${t('game.race.task')}</p>`;
  const bar = $('.timer i', g.body), txt = $('.timer span', g.body), qEl = $('.rq', g.body), ch = $('.rch', g.body);
  const tick = setInterval(() => {
    if (!g.alive()) return clearInterval(tick);
    left -= 0.2; bar.style.width = `${(left / 60) * 100}%`; txt.textContent = `${Math.ceil(left)} s`;
    if (left <= 0) { clearInterval(tick); g.finish(score, score * 1.5, `${t('game.race.result').replace('{n}', score)}`); }
  }, 200);
  function next() {
    const w = pick(ws), toL1 = Math.random() < 0.6;
    const opts = shuffle([w, ...sample(ws.filter(x => x.id !== w.id && l1(x) !== l1(w)), 3)]);
    q = { w, toL1 };
    qEl.innerHTML = toL1 ? `<b>${esc(w.hr)}</b>` : `<span class="l1q">${esc(l1(w))}</span>`;
    ch.innerHTML = opts.map(o => `<button class="choice" data-id="${o.id}">${esc(toL1 ? l1(o) : o.hr)}</button>`).join('');
  }
  ch.addEventListener('click', e => {
    const b = e.target.closest('[data-id]'); if (!b || left <= 0) return;
    const ok = b.dataset.id === q.w.id;
    recordWord(q.w.id, ok, 0.5);
    if (ok) { score++; streak++; g.score(score); sound('ok'); b.classList.add('right'); if (streak % 5 === 0) { left = Math.min(60, left + 3); toast('+3 s 🔥', 900); } }
    else { streak = 0; sound('bad'); haptic('bad'); b.classList.add('wrong'); left -= 2; }
    setTimeout(next, ok ? 180 : 450);
  });
  next();
}

// ── 3. Zgadnij słowo (wisielec) ──
function hangman(g) {
  const pool = shuffle(single(words())).slice(0, 5);
  const KEYS = 'a b c č ć d đ e f g h i j k l m n o p r s š t u v z ž'.split(' ');
  let round = 0, total = 0;
  function play() {
    if (round >= pool.length) return g.finish(total, total * 1.2);
    const w = pool[round];
    const word = w.hr.toLowerCase();
    let lives = 6; const used = new Set();
    const draw = () => {
      const shown = [...word].map(c => (used.has(c) ? c : '_')).join(' ');
      const won = [...word].every(c => used.has(c));
      g.body.innerHTML = `<p class="gtask">${t('game.hangman.task')} (${round + 1}/${pool.length})</p>
        <div class="hhint">${pix(w.ico, 44)}<span>${esc(l1(w))}</span></div>
        <div class="hword">${shown}</div>
        <div class="lives">${'●'.repeat(lives)}<span>${'●'.repeat(6 - lives)}</span></div>
        <div class="keys">${KEYS.map(k => `<button class="key ${used.has(k) ? (word.includes(k) ? 'hit' : 'miss') : ''}" data-k="${k}" ${used.has(k) || won || !lives ? 'disabled' : ''}>${k}</button>`).join('')}</div>
        ${won || !lives ? `<div class="hres ${won ? 'ok' : 'bad'}">${won ? '✔ ' + t('fb.praise').split('|')[0] : '✖ ' + esc(w.hr)} ${sayBtn(w.hr, 'sm')}<button class="btn primary" data-next>${t('continue')}</button></div>` : ''}`;
      if (won || !lives) {
        if (won) { total += 2 + lives; sound('ok'); } else sound('bad');
        recordWord(w.id, won, 1); speak(w.hr); g.score(total);
        $('[data-next]', g.body).onclick = () => { round++; play(); };
      }
    };
    g.body.onclick = e => {
      const k = e.target.closest('[data-k]'); if (!k || k.disabled) return;
      const c = k.dataset.k; used.add(c);
      if (!word.includes(c)) { lives--; haptic('bad'); } else sound('tap');
      draw();
    };
    draw();
  }
  play();
}

// ── 4. Łapanie słów ──
function catchGame(g) {
  const cats = catchCats();
  const cat = pick(cats);
  const good = words().filter(w => w.cat === cat), bad = words().filter(w => w.cat !== cat);
  let score = 0, lives = 3, time = 45, alive = true;
  g.body.innerHTML = `<p class="gtask">${t('game.catch.task')} <b class="catname">${t('cat.' + cat)}</b></p>
    <div class="cstats"><span class="clives">❤️❤️❤️</span><span class="ctime">45 s</span></div><div class="field"></div>`;
  const field = $('.field', g.body);
  const spawn = () => {
    if (!alive || !g.alive()) return;
    const isGood = Math.random() < 0.5;
    const w = pick(isGood ? good : bad);
    const el = h(`<button class="drop-w ${isGood ? 'g' : 'b'}">${esc(w.hr)}</button>`);
    el.style.left = `${5 + Math.random() * 60}%`;
    const dur = Math.max(3.2, 6 - score * 0.12);
    el.style.animationDuration = `${dur}s`;
    el.onclick = () => {
      if (el.dataset.done) return; el.dataset.done = 1;
      if (isGood) { score++; g.score(score); sound('ok'); el.classList.add('caught'); recordWord(w.id, true, 0.5); }
      else { lives--; sound('bad'); haptic('bad'); el.classList.add('oops'); recordWord(w.id, false, 0.3); toast(`${esc(w.hr)} = ${esc(l1(w))}`, 1200); }
      upd(); setTimeout(() => el.remove(), 300);
    };
    el.addEventListener('animationend', () => {
      if (!el.dataset.done && isGood) { lives--; sound('bad'); toast(`↓ ${esc(w.hr)} = ${esc(l1(w))}`, 1200); upd(); }
      el.remove();
    });
    field.appendChild(el);
    setTimeout(spawn, Math.max(650, 1300 - score * 25));
  };
  const upd = () => { $('.clives', g.body).textContent = '❤️'.repeat(Math.max(0, lives)) + '🤍'.repeat(3 - Math.max(0, lives)); if (lives <= 0) end(); };
  const end = () => { if (!alive) return; alive = false; g.finish(score, score); };
  const tick = setInterval(() => { if (!g.alive() || !alive) return clearInterval(tick); time--; $('.ctime', g.body).textContent = `${time} s`; if (time <= 0) { clearInterval(tick); end(); } }, 1000);
  spawn();
}

// ── 5. Kelner (słuchanie) ──
function waiter(g) {
  const menu = inCats('drinks', 'sweets', 'food').filter(w => w.ico && !['htjeti', 'željeti', 'šećer', 'mlijeko', 'komad', 'ukusan', 'sladak', 'jelovnik'].includes(w.hr));
  let round = 0, score = 0;
  const NAMES = ['Ana', 'Luka', 'Petra', 'Ivan', 'Maja'];
  function play() {
    if (round >= 5) return g.finish(score, score * 2, t('game.waiter.result').replace('{n}', score));
    const n = Math.min(menu.length, 1 + Math.floor(round / 2) + (round > 2 ? 1 : 0));
    const order = sample(menu, Math.min(3, n));
    const text = order.map(orderForm).join(order.length > 2 ? ', ' : ' i ').replace(/, ([^,]*)$/, ' i $1');
    const sentence = `${text[0].toUpperCase()}${text.slice(1)}, molim.`;
    const chosen = new Set();
    g.body.innerHTML = `<p class="gtask">${t('game.waiter.task')} (${round + 1}/5)</p>
      <div class="npc"><span class="av" style="background:#3d8bad">${NAMES[round][0]}</span><div class="bubble left"><div class="who">${NAMES[round]}</div>
        <div class="line">${sayBtn(sentence, 'sm')}<span class="hrline hide">${esc(sentence)}</span></div><button class="link" data-show>${t('game.waiter.show')}</button></div></div>
      <div class="menu">${shuffle([...order, ...sample(menu.filter(w => !order.includes(w)), Math.max(0, 9 - order.length))]).map(w => `<button class="mi" data-id="${w.id}">${pix(w.ico, 34)}<span>${esc(w.hr)}</span></button>`).join('')}</div>
      <button class="btn big primary" data-serve>${t('game.waiter.serve')}</button>`;
    let peeked = false;
    setTimeout(() => speak(sentence), 400);
    g.body.onclick = e => {
      if (e.target.closest('[data-show]')) { peeked = true; $('.hrline', g.body).classList.remove('hide'); return; }
      const m = e.target.closest('.mi');
      if (m) { const id = m.dataset.id; chosen.has(id) ? chosen.delete(id) : chosen.add(id); m.classList.toggle('sel'); sound('tap'); return; }
      if (e.target.closest('[data-serve]')) {
        const ok = order.length === chosen.size && order.every(w => chosen.has(w.id));
        order.forEach(w => recordWord(w.id, ok, 1));
        if (ok) { score += peeked ? 1 : 2; sound('ok'); } else { sound('bad'); haptic('bad'); }
        g.score(score);
        g.body.innerHTML = `<div class="hres ${ok ? 'ok' : 'bad'}">${ok ? '✔ ' + t('game.waiter.ok') : '✖ ' + t('game.waiter.bad')}<p>${sayBtn(sentence, 'sm')} <b>${esc(sentence)}</b></p>
          <p>${order.map(w => `${pix(w.ico, 24)} ${esc(w.hr)} = ${esc(l1(w))}`).join('<br>')}</p><button class="btn primary" data-next>${t('continue')}</button></div>`;
        $('[data-next]', g.body).onclick = () => { round++; play(); };
      }
    };
  }
  play();
}

// ── 6. Zakupy na Dolcu ──
function dolac(g) {
  const goods = inCats('fruit', 'vegetables').filter(w => w.ico && !['voće', 'povrće'].includes(w.hr));
  let round = 0, score = 0;
  function play() {
    if (round >= 3) return g.finish(score, score * 2, t('game.dolac.result').replace('{n}', score));
    const list = sample(goods, 3);
    const stall = shuffle([...list, ...sample(goods.filter(w => !list.includes(w)), 3)]);
    const price = {}; stall.forEach(w => (price[w.id] = 1 + Math.floor(Math.random() * 4)));
    const budget = 15;
    const basket = new Set();
    let stage = 'pick';
    const render = () => {
      const spent = [...basket].reduce((s, id) => s + price[id], 0);
      g.body.innerHTML = `<p class="gtask">${t('game.dolac.task')} (${round + 1}/3)</p>
        <div class="slist"><b>📝 ${t('game.dolac.list')}</b> ${list.map(w => `<span class="${basket.has(w.id) ? 'got' : ''}">${esc(w.hr)}</span>`).join('')}</div>
        <div class="stall">${stall.map(w => `<button class="si ${basket.has(w.id) ? 'sel' : ''}" data-id="${w.id}">${pix(w.ico, 40)}<small>${eura(price[w.id])}</small></button>`).join('')}</div>
        <p class="muted small">${t('game.dolac.budget')}: ${eura(budget)}</p>
        <button class="btn big primary" data-pay ${basket.size ? '' : 'disabled'}>${t('game.dolac.pay')}</button>`;
      return spent;
    };
    render();
    g.body.onclick = e => {
      if (stage !== 'pick') return;
      const s = e.target.closest('.si');
      if (s) { const id = s.dataset.id; basket.has(id) ? basket.delete(id) : basket.add(id); sound('tap'); render(); return; }
      if (e.target.closest('[data-pay]')) {
        stage = 'pay';
        const rightItems = list.length === basket.size && list.every(w => basket.has(w.id));
        const total = [...basket].reduce((s2, id) => s2 + price[id], 0);
        const opts = shuffle([total, total + 1 + Math.floor(Math.random() * 3), Math.max(1, total - 1 - Math.floor(Math.random() * 2)), total + 10].filter((v, i, a) => a.indexOf(v) === i)).slice(0, 3);
        if (!opts.includes(total)) opts[0] = total;
        g.body.innerHTML = `<div class="npc"><span class="av" style="background:#d0694f">P</span><div class="bubble left"><div class="who">Prodavačica</div><div class="line">${sayBtn('Koliko je ukupno?', 'sm')}<span class="hrline">${t('game.dolac.howmuch')}</span></div></div></div>
          <div class="choices">${shuffle(opts).map(v => `<button class="choice" data-v="${v}">${eura(v)}</button>`).join('')}</div>`;
        g.body.onclick = ev => {
          const c = ev.target.closest('[data-v]'); if (!c) return;
          const okSum = +c.dataset.v === total;
          list.forEach(w => recordWord(w.id, basket.has(w.id), 1));
          score += (rightItems ? 2 : 0) + (okSum ? 1 : 0);
          g.score(score);
          (rightItems && okSum) ? sound('ok') : sound('bad');
          speak(eura(total));
          g.body.innerHTML = `<div class="hres ${rightItems && okSum ? 'ok' : 'bad'}">
            <p>${rightItems ? '✔' : '✖'} ${t('game.dolac.items')}: ${list.map(w => `${pix(w.ico, 22)} ${esc(w.hr)} = ${esc(l1(w))}`).join(', ')}</p>
            <p>${okSum ? '✔' : '✖'} ${t('game.dolac.total')}: <b>${eura(total)}</b> (${total} €)</p>
            <button class="btn primary" data-next>${t('continue')}</button></div>`;
          $('[data-next]', g.body).onclick = () => { round++; play(); };
        };
      }
    };
  }
  play();
}
