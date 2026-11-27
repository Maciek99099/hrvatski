// Ekran lekcji: wprowadzenie (słówka, karta gramatyczna, dialog) → zadania → podsumowanie.
import { state, save } from './store.js';
import { t, L } from './i18n.js';
import { asArr, first, wordById } from './content.js';
import { buildFor, buildWeak } from './engine.js';
import { check, shuffle, esc, norm, clean, strip, lev } from './text.js';
import { speak, canRecognize, listen, hrVoice } from './speech.js';
import { recordWord, recordTag, addXP, addTime, finishLesson, checkBadges } from './progress.js';
import { feedback, sound, confetti, floatXP, haptic } from './fx.js';
import { h, $, $$, sayBtn, slowBtn, diacriticBar, confirmModal, stars, fmtTime } from './ui.js';
import { icon } from './art.js';
import { kikiImg, pix, portrait } from './pixel.js';
import { wordsInText, isDone } from './content.js';

const lang = () => state.settings.lang;
const l1 = obj => first(asArr(obj?.[lang()]));
const l1all = obj => asArr(obj?.[lang()]);
const HARD = new Set(['type', 'type-word', 'listen-type', 'order']);

export function grammarHTML(lesson) {
  const g = lesson.grammar;
  if (!g) return '';
  return `<div class="gcard"><div class="gcard-body">${L(g.body)}</div>
    ${g.examples?.length ? `<div class="gex">${g.examples.map(e => `<div class="gex-row">${sayBtn(e.hr, 'sm')}<div><b>${esc(e.hr)}</b><small>${esc(L(e))}</small></div></div>`).join('')}</div>` : ''}</div>`;
}

export function dialogHTML(lines, { translate = true } = {}) {
  const who = [...new Set(lines.map(l => l.who))];
  return `<div class="dialog">${lines.map(l => `<div class="bubble ${who.indexOf(l.who) % 2 ? 'right' : 'left'}">
    <div class="who">${esc(l.who)}</div>
    <div class="line">${sayBtn(l.hr, 'sm')}<span class="hrline">${esc(l.hr)}</span></div>
    ${translate ? `<div class="tr">${esc(L(l))}</div>` : ''}</div>`).join('')}</div>`;
}

/**
 * Uruchamia lekcję.
 * @param {object} lesson – obiekt lekcji lub {id:'weak', weak:true}
 * @param {function} onExit – wywoływane po wyjściu (result|null)
 */
export function runLesson(root, lesson, onExit) {
  const weak = lesson.weak;
  const replay = !weak && !!state.lessons[lesson.id]?.done;
  let queue = weak ? buildWeak() : buildFor(lesson, replay ? 'replay' : 'new');
  const intro = [];
  if (!weak) {
    if (lesson.boss) {
      intro.push({ type: 'boss-intro', ungraded: true });
      if (lesson.words?.length) intro.push({ type: 'intro-words', ungraded: true });
    } else {
      intro.push({ type: 'intro-words', ungraded: true });
      if (lesson.grammar) intro.push({ type: 'intro-grammar', ungraded: true });
      if (lesson.dialog) intro.push({ type: 'intro-dialog', ungraded: true });
    }
  }
  queue = [...intro, ...queue];

  if (!weak) {
    const p = state.lessons[lesson.id] || (state.lessons[lesson.id] = { stars: 0, best: 0, done: 0 });
    if (!p.done) p.started = true;
    save();
  }

  let idx = 0, graded = 0, good = 0, xp = 0, streakRun = 0;
  const t0 = Date.now();
  const title = weak ? t('weak.title') : L(lesson.title);

  const el = h(`<div class="lesson ${lesson.boss ? 'boss' : ''}">
    <header class="lhead">
      <button class="iconbtn" data-act="close" aria-label="${t('close')}">${icon('close')}</button>
      <div class="pbar" aria-hidden="true"><i></i></div>
      ${lesson.grammar ? `<button class="iconbtn" data-act="grammar" aria-label="${t('lesson.grammar')}">${icon('book')}</button>` : '<span class="iconbtn"></span>'}
    </header>
    <main class="lbody"><div class="ex-wrap"></div></main>
    <footer class="lfoot"><button class="btn primary big" data-act="check" disabled>${t('check')}</button></footer>
    <div class="sheet" aria-live="polite"></div>
  </div>`);
  root.replaceChildren(el);
  const wrap = $('.ex-wrap', el), btn = $('[data-act=check]', el), sheet = $('.sheet', el), bar = $('.pbar i', el);
  let cur = null; // { ex, api }

  el.addEventListener('click', async e => {
    const a = e.target.closest('[data-act]')?.dataset.act;
    if (a === 'close') {
      if (idx <= intro.length || await confirmModal(t('lesson.quitTitle'), t('lesson.quitBody'), t('lesson.quit'), t('lesson.stay'), true)) {
        addTime((Date.now() - t0) / 1000);
        speechSynthesis?.cancel?.();
        onExit(null);
      }
    } else if (a === 'grammar') {
      confirmModal(L(lesson.grammar.title), grammarHTML(lesson), t('ok'), t('close')).catch(() => {});
    }
  });

  btn.addEventListener('click', () => {
    if (!cur) return;
    if (btn.dataset.mode === 'next') return next();
    if (cur.ex.ungraded && !cur.r) return next();
    const res = cur.r.check?.();
    if (res) resolve(res);
  });

  function api(ex) {
    return {
      ready(v) { btn.disabled = !v; },
      done(res) { resolve(res); },
      submit() { if (!btn.disabled) btn.click(); },
    };
  }

  function progress() {
    bar.style.width = `${Math.round((idx / queue.length) * 100)}%`;
  }

  function show() {
    progress();
    if (idx >= queue.length) return finish();
    const ex = queue[idx];
    btn.dataset.mode = 'check';
    btn.textContent = ex.ungraded ? t('continue') : t('check');
    btn.className = 'btn primary big';
    btn.disabled = !ex.ungraded;
    sheet.className = 'sheet';
    const box = h('<div class="ex enter"></div>');
    wrap.replaceChildren(box);
    const R = RENDER[ex.type];
    const r = R ? R(ex, box, api(ex), { lesson, el }) : null;
    cur = { ex, r: ex.ungraded && !r?.check ? null : r };
    if (ex.ungraded && r?.check) btn.disabled = true;
    requestAnimationFrame(() => box.classList.remove('enter'));
    wrap.parentElement.scrollTop = 0;
  }

  function resolve(res) {
    const ex = cur.ex;
    if (btn.dataset.mode === 'next') return;
    if (ex.ungraded) {
      feedback(res.result);
      showSheet(res, ex);
    } else {
      const okish = res.result !== 'wrong';
      if (!ex.retry) { graded++; if (okish) good++; }
      const w = HARD.has(ex.type) ? 1.5 : 1;
      if (res.perWord) Object.entries(res.perWord).forEach(([id, v]) => recordWord(id, v, w));
      else (ex.words || []).forEach(id => recordWord(id, okish, w));
      recordTag(ex.tag, okish);
      save();
      const topic = ex.topic || lesson.tags?.[0];
      if (topic && topic !== ex.tag) recordTag(topic, okish);
      if (okish) {
        const gain = ex.retry ? 1 : res.result === 'ok' ? 2 : 1;
        xp += gain; addXP(gain); streakRun++;
        floatXP(gain, bar);
      } else {
        streakRun = 0;
        if (!ex.retry) queue.push({ ...ex, retry: true, options: ex.options ? shuffle(ex.options) : ex.options, bank: ex.bank ? shuffle(ex.bank) : ex.bank });
      }
      feedback(res.result);
      showSheet(res, ex);
    }
    btn.dataset.mode = 'next';
    btn.disabled = false;
    btn.textContent = t('continue');
  }

  function showSheet(res, ex) {
    const cls = res.result === 'ok' ? 'ok' : res.result === 'almost' ? 'almost' : 'bad';
    const head = res.result === 'ok' ? pickPraise(streakRun) : res.result === 'almost' ? t('fb.almost') : t('fb.wrong');
    const noteTxt = res.note === 'diacritics' ? t('fb.diacritics') : res.note === 'typo' ? t('fb.typo') : '';
    const showAns = res.result !== 'ok' && res.answer;
    const why = res.result !== 'ok' ? (res.why || autoWhy(ex)) : '';
    sheet.innerHTML = `<div class="sheet-in">
      <div class="fb-head">${res.result === 'ok' ? '✔' : res.result === 'almost' ? '≈' : '✖'} ${head}</div>
      ${noteTxt ? `<div class="fb-note">${noteTxt}</div>` : ''}
      ${showAns ? `<div class="fb-ans"><small>${t('fb.correct')}</small><div>${res.hrAnswer ? sayBtn(res.answer, 'sm') : ''}<b>${esc(res.answer)}</b></div></div>` : ''}
      ${res.extra ? `<div class="fb-extra">${res.extra}</div>` : ''}
      ${why ? `<div class="fb-why">💡 ${why}</div>` : ''}
    </div>`;
    sheet.className = `sheet show ${cls}`;
    btn.className = `btn big ${cls === 'ok' ? 'ok' : cls === 'almost' ? 'warn' : 'danger'}`;
    if (res.result === 'ok' && res.sayAfter) speak(res.sayAfter);
  }

  function next() { idx++; show(); }

  function finish() {
    speechSynthesis?.cancel?.();
    const secs = (Date.now() - t0) / 1000;
    const acc = graded ? good / graded : 1;
    let res = null, bonus = 0;
    if (!weak) { res = finishLesson(lesson, acc, secs); bonus = res.bonus; }
    else { addTime(secs); addXP(5); bonus = 5; }
    const badges = checkBadges();
    sound('win'); haptic();
    if (lesson.boss || (res && res.stars === 3)) confetti();
    const st = res ? res.stars : acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1;
    el.innerHTML = `<div class="finish">
      ${kikiImg(6)}
      <h2>${lesson.boss ? t('finish.boss') : t('finish.title')}</h2>
      <div class="finish-stars">${stars(st)}</div>
      <div class="finish-grid">
        <div><b>${xp + bonus}</b><small>XP</small></div>
        <div><b>${Math.round(acc * 100)}%</b><small>${t('finish.acc')}</small></div>
        <div><b>${fmtTime(secs)}</b><small>${t('finish.time')}</small></div>
      </div>
      ${lesson.boss && res?.firstTime ? `<p class="finish-msg">🎉 ${t('finish.unlocked')}</p>` : ''}
      ${badges.map(b => `<div class="badge-new">${pix(b.ico, 40)}<div><small>${t('badge.new')}</small><b>${b[lang()][0]}</b></div></div>`).join('')}
      <button class="btn primary big" data-act="done">${t('continue')}</button>
    </div>`;
    $('[data-act=done]', el).onclick = () => onExit({ stars: st, acc, lesson });
  }

  show();
}

// ── teksty pochwał ──
function pickPraise(run) {
  const list = t('fb.praise').split('|');
  if (run >= 5) return t('fb.streak').replace('{n}', run);
  return list[Math.floor(Math.random() * list.length)];
}

// automatyczne wyjaśnienie: słowniczek słów zdania
function autoWhy(ex) {
  const ids = ex.words || [];
  if (!ids.length) return '';
  const parts = ids.slice(0, 6).map(id => wordById[id]).filter(Boolean).map(w => `<b>${esc(w.hr)}</b> = ${esc(l1(w))}${w.g ? ` <i>(${t('g.' + w.g)})</i>` : ''}`);
  return parts.length ? parts.join(' · ') : '';
}

// ── renderery zadań ──
const P = (txt) => `<h2 class="prompt">${txt}</h2>`;
const whyOf = o => (o?.why ? L(o.why) : '');

function choiceList(box, options, { render, onPick, cls = '' }) {
  const list = h(`<div class="choices ${cls}"></div>`);
  options.forEach((o, i) => {
    const b = h(`<button class="choice" data-i="${i}">${render(o, i)}</button>`);
    b.onclick = e => {
      if (e.target.closest('[data-say]')) return;
      $$('.choice', list).forEach(x => x.classList.remove('sel'));
      b.classList.add('sel'); sound('tap');
      onPick(o, i, b);
    };
    list.appendChild(b);
  });
  box.appendChild(list);
  return list;
}

function tilesUI(box, bank, api) {
  const ans = h('<div class="tile-ans" aria-label="answer"></div>');
  const pool = h('<div class="tile-bank"></div>');
  const chosen = [];
  bank.forEach((w, i) => {
    const b = h(`<button class="tile" data-i="${i}">${esc(w)}</button>`);
    b.onclick = () => {
      sound('tap');
      if (b.parentElement === pool) {
        const ph = h(`<span class="tile ph" data-ph="${i}">${esc(w)}</span>`);
        b.replaceWith(ph); b._ph = ph; ans.appendChild(b); chosen.push(b);
      } else {
        b._ph.replaceWith(b); chosen.splice(chosen.indexOf(b), 1);
      }
      api.ready(chosen.length > 0);
    };
    pool.appendChild(b);
  });
  box.append(ans, pool);
  return () => chosen.map(b => b.textContent).join(' ');
}

function inputUI(box, api, { hr = true, multiline = false, placeholder = '' } = {}) {
  const inp = h(multiline
    ? `<textarea class="inp" rows="3" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="${esc(placeholder)}" lang="${hr ? 'hr' : lang()}"></textarea>`
    : `<input class="inp" type="text" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="${esc(placeholder)}" lang="${hr ? 'hr' : lang()}">`);
  inp.addEventListener('input', () => api.ready(inp.value.trim().length > 0));
  inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); api.submit(); } });
  box.appendChild(inp);
  if (hr) box.appendChild(diacriticBar(inp));
  setTimeout(() => inp.focus({ preventScroll: true }), 350);
  return inp;
}

const RENDER = {
  'intro-words'(ex, box, api, { lesson }) {
    const ws = lesson.words || [];
    // słowa z odnogi, której użytkownik jeszcze nie przeszedł, a które pojawiają się w tej lekcji
    const own = new Set(ws.map(w => w.id));
    const texts = [...(lesson.sentences || []).map(s => first(asArr(s.hr))), ...(lesson.dialog?.lines || []).map(l => l.hr), ...(lesson.replies || []).flatMap(r => [r.prompt, r.ok]), ...(lesson.story || []).filter(s => s.hr).map(s => s.hr)];
    const other = [...new Map(texts.flatMap(tx => wordsInText(tx)).filter(w => !own.has(w.id) && w.lesson !== lesson.id && !isDone(w.lesson)).map(w => [w.id, w])).values()];
    const li = w => `<li>${sayBtn(w.hr, 'sm')}<span class="wico">${pix(w.ico || '📍', 32)}</span><div><b>${esc(w.hr)}</b>${w.g ? ` <i class="gtag">${t('g.' + w.g)}</i>` : ''}<small>${esc(l1all(w).join(', '))}</small></div></li>`;
    box.innerHTML = `<div class="intro">
      <div class="intro-head">${kikiImg(3)}<div><small>${esc(L(lesson.place))}</small><h2>${t('intro.words')}</h2></div></div>
      ${!hrVoice() ? `<div class="warn-box">${t('voice.missingShort')}</div>` : ''}
      <ul class="wlist">${ws.map(li).join('')}</ul>
      ${other.length ? `<h3 class="other-path">⑂ ${t('intro.otherPath')}</h3><ul class="wlist other">${other.map(li).join('')}</ul>` : ''}</div>`;
  },
  'intro-grammar'(ex, box, api, { lesson }) {
    box.innerHTML = `<div class="intro"><div class="intro-head">${kikiImg(3)}<div><small>${t('lesson.grammar')}</small><h2>${esc(L(lesson.grammar.title))}</h2></div></div>${grammarHTML(lesson)}</div>`;
  },
  'intro-dialog'(ex, box, api, { lesson }) {
    const lines = lesson.dialog.lines;
    box.innerHTML = `<div class="intro"><div class="intro-head">${kikiImg(3)}<div><small>${t('intro.dialog')}</small><h2>${esc(L(lesson.dialog.title))}</h2></div></div>
      <button class="btn ghost" data-playall>${icon('play', 18)} ${t('intro.playAll')}</button>
      ${dialogHTML(lines)}</div>`;
    $('[data-playall]', box).onclick = () => {
      let i = 0; const bubbles = $$('.bubble', box);
      const step = () => {
        bubbles.forEach(b => b.classList.remove('active'));
        if (i >= lines.length) return;
        bubbles[i].classList.add('active'); bubbles[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        speak(lines[i].hr, { onend: () => { i++; setTimeout(step, 350); } });
      };
      step();
    };
  },
  'boss-intro'(ex, box, api, { lesson }) {
    box.innerHTML = `<div class="intro boss-intro">${kikiImg(5)}<div class="boss-tag">BOSS</div><h2>${esc(L(lesson.title))}</h2><p>${esc(L(lesson.intro))}</p><p class="muted">${t('boss.explain')}</p></div>`;
  },
  'story-start'(ex, box, api, { lesson }) {
    box.innerHTML = `<div class="intro boss-intro">${kikiImg(5)}<h2>${t('boss.story')}</h2><p>${esc(L(lesson.intro))}</p></div>`;
  },
  'story-narr'(ex, box) {
    box.innerHTML = `<div class="story-narr">📖 ${esc(L(ex.st.narr))}</div>`;
  },
  'story-line'(ex, box) {
    const st = ex.st;
    box.innerHTML = `<div class="npc"><div class="npc-ava">${portrait(st.who, 4)}</div><div class="bubble left"><div class="who">${esc(st.who)}</div><div class="line">${sayBtn(st.hr, 'sm')}<span class="hrline">${esc(st.hr)}</span></div><details class="tr"><summary>${t('showTr')}</summary>${esc(L(st))}</details></div></div>`;
    speak(st.hr);
  },
  story(ex, box, api) {
    const st = ex.st;
    const isMe = st.hr === '…';
    box.innerHTML = isMe
      ? P(esc(L(st)))
      : `${P(t('ex.reply'))}<div class="npc"><div class="npc-ava">${portrait(st.who, 4)}</div><div class="bubble left"><div class="who">${esc(st.who)}</div><div class="line">${sayBtn(st.hr, 'sm')}<span class="hrline">${esc(st.hr)}</span></div><details class="tr"><summary>${t('showTr')}</summary>${esc(L(st))}</details></div></div>`;
    if (!isMe) speak(st.hr);
    let sel = null;
    choiceList(box, ex.options, { cls: 'replies', render: o => `${esc(o.o)}`, onPick: o => { sel = o; speak(o.o); api.ready(true); } });
    const correct = ex.options.find(o => o.ok).o;
    return { check: () => ({ result: sel.ok ? 'ok' : 'wrong', answer: correct, hrAnswer: true, why: whyOf(st) }) };
  },

  'pick-img'(ex, box, api) {
    const w = ex.word;
    box.innerHTML = `${P(t('ex.pickImg'))}<div class="big-word">${sayBtn(w.hr)}<span>${esc(w.hr)}</span></div>`;
    speak(w.hr);
    let sel = null;
    choiceList(box, ex.options, { cls: 'grid pics', render: o => pix(o.ico, 72), onPick: o => { sel = o; api.ready(true); } });
    return { check: () => ({ result: sel.id === w.id ? 'ok' : 'wrong', answer: `${w.hr} = ${l1(w)}`, why: sel.id !== w.id ? `${pix(sel.ico, 22)} = <b>${esc(sel.hr)}</b> (${esc(l1(sel))})` : '' }) };
  },
  'pick-word'(ex, box, api) {
    const w = ex.word;
    box.innerHTML = `${P(t('ex.pickWord'))}<div class="big-emoji">${pix(w.ico, 112)}</div>`;
    let sel = null;
    choiceList(box, ex.options, { cls: 'grid', render: o => esc(o.hr), onPick: o => { sel = o; speak(o.hr); api.ready(true); } });
    return { check: () => ({ result: sel.id === w.id ? 'ok' : 'wrong', answer: w.hr, hrAnswer: true, sayAfter: w.hr, why: sel.id !== w.id ? `<b>${esc(sel.hr)}</b> = ${esc(l1(sel))}` : '' }) };
  },
  choose(ex, box, api) {
    const w = ex.word, toL1 = ex.dir === 'hr2l1';
    box.innerHTML = toL1
      ? `${P(t('ex.meaning'))}<div class="big-word">${sayBtn(w.hr)}<span>${esc(w.hr)}</span></div>`
      : `${P(t('ex.howSay'))}<div class="big-word l1">${pix(w.ico, 40)}<span>${esc(l1(w))}</span></div>`;
    if (toL1) speak(w.hr);
    let sel = null;
    choiceList(box, ex.options, { cls: 'grid', render: o => esc(toL1 ? l1(o) : o.hr), onPick: o => { sel = o; if (!toL1) speak(o.hr); api.ready(true); } });
    return { check: () => ({ result: sel.id === w.id ? 'ok' : 'wrong', answer: toL1 ? l1(w) : w.hr, hrAnswer: !toL1, sayAfter: toL1 ? null : w.hr, why: sel.id !== w.id ? `<b>${esc(sel.hr)}</b> = ${esc(l1(sel))}` : '' }) };
  },
  match(ex, box, api) {
    const pairs = ex.pairs;
    const limit = 40;
    box.innerHTML = `${P(t('ex.match'))}<div class="timer"><i></i><span></span></div><div class="match"><div class="col l"></div><div class="col r"></div></div>`;
    const L1c = $('.col.l', box), R1c = $('.col.r', box);
    shuffle(pairs).forEach(w => L1c.appendChild(h(`<button class="mbtn" data-id="${w.id}" data-side="hr">${esc(w.hr)}</button>`)));
    shuffle(pairs).forEach(w => R1c.appendChild(h(`<button class="mbtn" data-id="${w.id}" data-side="l1">${esc(l1(w))}</button>`)));
    const mistakes = {}; let left = null, right = null, done = 0, mist = 0;
    const tStart = Date.now();
    const timerBar = $('.timer i', box), timerTxt = $('.timer span', box);
    const tick = setInterval(() => {
      if (!box.isConnected) return clearInterval(tick);
      const el = (Date.now() - tStart) / 1000, rest = Math.max(0, limit - el);
      timerBar.style.width = `${(rest / limit) * 100}%`;
      timerTxt.textContent = `${Math.ceil(rest)} s`;
      box.querySelector('.timer').classList.toggle('late', rest < 10);
    }, 200);
    box.querySelector('.match').addEventListener('click', e => {
      const b = e.target.closest('.mbtn'); if (!b || b.disabled) return;
      if (b.dataset.side === 'hr') { speak(b.textContent); left?.classList.remove('sel'); left = b; }
      else { right?.classList.remove('sel'); right = b; }
      b.classList.add('sel'); sound('tap');
      if (left && right) {
        if (left.dataset.id === right.dataset.id) {
          [left, right].forEach(x => { x.classList.remove('sel'); x.classList.add('good'); x.disabled = true; });
          done++; haptic();
          if (done === pairs.length) {
            clearInterval(tick);
            const secs = (Date.now() - tStart) / 1000;
            const perWord = Object.fromEntries(pairs.map(w => [w.id, !mistakes[w.id]]));
            const result = mist <= 1 && secs <= limit ? 'ok' : mist <= 3 ? 'almost' : 'wrong';
            setTimeout(() => api.done({ result, perWord, extra: `⏱ ${secs.toFixed(1)} s · ${t('ex.mistakes')}: ${mist}`, why: result !== 'ok' ? Object.keys(mistakes).map(id => `<b>${esc(wordById[id].hr)}</b> = ${esc(l1(wordById[id]))}`).join(' · ') : '' }), 300);
          }
        } else {
          const a = left, c = right;
          mist++; mistakes[a.dataset.id] = 1; mistakes[c.dataset.id] = 1;
          [a, c].forEach(x => x.classList.add('shake'));
          sound('bad'); haptic('bad');
          setTimeout(() => [a, c].forEach(x => x.classList.remove('shake', 'sel')), 400);
        }
        left = right = null;
      }
    });
    return {};
  },
  'listen-pick'(ex, box, api) {
    box.innerHTML = `${P(t('ex.listenPick'))}<div class="listen">${sayBtn(ex.text, 'xl')}${slowBtn(ex.text)}</div>`;
    setTimeout(() => speak(ex.text), 300);
    let sel = null;
    choiceList(box, ex.options, { render: o => esc(o), onPick: o => { sel = o; api.ready(true); } });
    return { check: () => ({ result: norm(sel) === norm(ex.text) ? 'ok' : 'wrong', answer: ex.text, hrAnswer: true }) };
  },
  'listen-type'(ex, box, api) {
    box.innerHTML = `${P(t('ex.listenType'))}<div class="listen">${sayBtn(ex.text, 'xl')}${slowBtn(ex.text)}</div>`;
    setTimeout(() => speak(ex.text), 300);
    const inp = inputUI(box, api, { hr: true, multiline: true, placeholder: t('ex.typeHr') });
    return { check: () => ({ ...check(inp.value, ex.accepted), answer: ex.accepted[0], hrAnswer: true, why: whyOf(ex) }) };
  },
  tiles(ex, box, api) {
    const toL1 = ex.dir === 'hr2l1';
    const src = toL1 ? first(asArr(ex.s.hr)) : l1(ex.s);
    box.innerHTML = `${P(t('ex.translate'))}<div class="src">${toL1 ? sayBtn(src) : ''}<span>${esc(src)}</span></div>`;
    if (toL1) speak(src);
    const get = tilesUI(box, ex.bank, api);
    return {
      check: () => {
        const r = check(get(), ex.accepted, { typo: false });
        return { ...r, answer: r.result === 'ok' ? null : ex.accepted[0], hrAnswer: !toL1, sayAfter: toL1 ? null : ex.accepted[0], why: whyOf(ex) };
      },
    };
  },
  order(ex, box, api) {
    box.innerHTML = `${P(t('ex.order'))}<div class="src l1"><span>${esc(l1(ex.s))}</span></div>`;
    const get = tilesUI(box, ex.bank, api);
    return { check: () => { const r = check(get(), ex.accepted, { typo: false }); return { ...r, answer: ex.accepted[0], hrAnswer: true, sayAfter: ex.accepted[0], why: whyOf(ex) }; } };
  },
  type(ex, box, api) {
    const toHr = ex.dir === 'l12hr';
    const src = toHr ? l1(ex.s) : first(asArr(ex.s.hr));
    box.innerHTML = `${P(toHr ? t('ex.writeHr') : t('ex.writeL1'))}<div class="src">${!toHr ? sayBtn(src) : ''}<span>${esc(src)}</span></div>`;
    if (!toHr) speak(src);
    const inp = inputUI(box, api, { hr: toHr, multiline: true, placeholder: toHr ? t('ex.typeHr') : t('ex.typeL1') });
    return { check: () => { const r = check(inp.value, ex.accepted); return { ...r, answer: ex.accepted[0], hrAnswer: toHr, sayAfter: toHr ? ex.accepted[0] : null, why: whyOf(ex) }; } };
  },
  'type-word'(ex, box, api) {
    const w = ex.word;
    box.innerHTML = `${P(t('ex.writeHr'))}<div class="big-word l1">${pix(w.ico, 40)}<span>${esc(l1(w))}</span></div>`;
    const inp = inputUI(box, api, { hr: true, placeholder: t('ex.typeHr') });
    return { check: () => ({ ...check(inp.value, ex.accepted), answer: w.hr, hrAnswer: true, sayAfter: w.hr }) };
  },
  cloze(ex, box, api) {
    const c = ex.c;
    const [a, b] = c.hr.split('___');
    box.innerHTML = `${P(t('ex.cloze'))}<div class="cloze-s">${esc(a)}<span class="gap">&nbsp;</span>${esc(b)}</div><div class="cloze-tr">${esc(L(c))}</div>`;
    const gap = $('.gap', box);
    let sel = null;
    choiceList(box, shuffle(c.options), { cls: 'row', render: o => esc(o), onPick: o => { sel = o; gap.textContent = o; gap.classList.add('filled'); api.ready(true); } });
    const full = c.hr.replace('___', c.answer);
    return { check: () => ({ result: sel === c.answer ? 'ok' : 'wrong', answer: full, hrAnswer: true, sayAfter: full, why: whyOf(c) }) };
  },
  reply(ex, box, api) {
    const r = ex.r;
    box.innerHTML = `${P(t('ex.reply'))}<div class="npc"><div class="npc-ava">${portrait('Prolaznik', 4)}</div><div class="bubble left"><div class="line">${sayBtn(r.prompt, 'sm')}<span class="hrline">${esc(r.prompt)}</span></div></div></div>`;
    speak(r.prompt);
    let sel = null;
    choiceList(box, ex.options, { cls: 'replies', render: o => esc(o), onPick: o => { sel = o; speak(o); api.ready(true); } });
    return { check: () => ({ result: sel === r.ok ? 'ok' : 'wrong', answer: r.ok, hrAnswer: true, why: whyOf(r) }) };
  },
  tf(ex, box, api) {
    box.innerHTML = `${P(t('ex.tf'))}${dialogHTML(ex.lines, { translate: false })}<div class="statement">„${esc(L(ex.item))}”</div>`;
    let sel = null;
    choiceList(box, [true, false], { cls: 'row tf', render: o => (o ? `✔ ${t('true')}` : `✖ ${t('false')}`), onPick: o => { sel = o; api.ready(true); } });
    return { check: () => ({ result: sel === ex.item.answer ? 'ok' : 'wrong', answer: ex.item.answer ? t('true') : t('false'), why: t('ex.tfWhy') }) };
  },
  speak(ex, box, api) {
    const hr = first(asArr(ex.s.hr));
    box.innerHTML = `${P(t('ex.speak'))}<div class="src">${sayBtn(hr)}<span>${esc(hr)}</span></div><div class="cloze-tr">${esc(l1(ex.s))}</div>
      <div class="speak-area"><button class="mic" aria-label="${t('ex.mic')}">${icon('mic', 34)}</button><div class="heard"></div></div>
      <div class="row-btns"><button class="btn ghost" data-skip>${t('ex.skipSpeak')}</button></div>`;
    speak(hr);
    const heard = $('.heard', box), mic = $('.mic', box);
    $('[data-skip]', box).onclick = () => api.done({ result: 'ok', graded: false, extra: t('ex.skipped') });
    if (!canRecognize()) {
      heard.innerHTML = `<p class="muted">${t('ex.selfCheck')}</p><div class="row-btns"><button class="btn" data-self="0">${t('ex.notYet')}</button><button class="btn primary" data-self="1">${t('ex.gotIt')}</button></div>`;
      mic.onclick = () => speak(hr, { slow: true });
      box.addEventListener('click', e => { const s = e.target.closest('[data-self]'); if (s) api.done({ result: s.dataset.self === '1' ? 'ok' : 'almost', graded: false, answer: hr, hrAnswer: true }); });
      return {};
    }
    mic.onclick = () => {
      mic.classList.add('rec'); heard.textContent = t('ex.listening');
      listen({
        onresult: alts => {
          mic.classList.remove('rec');
          const target = strip(hr);
          const best = alts.map(a => ({ a, d: lev(strip(a), target) / Math.max(target.length, 1) })).sort((x, y) => x.d - y.d)[0];
          const score = Math.max(0, Math.round((1 - best.d) * 100));
          heard.innerHTML = `${t('ex.heard')}: <b>${esc(best.a)}</b> · ${score}%`;
          api.done({ result: score >= 80 ? 'ok' : score >= 55 ? 'almost' : 'wrong', graded: false, answer: hr, hrAnswer: true, extra: `${t('ex.match%')}: ${score}%` });
        },
        onerror: err => { mic.classList.remove('rec'); heard.textContent = t('ex.micErr'); },
        onend: () => mic.classList.remove('rec'),
      });
    };
    return {};
  },
};
