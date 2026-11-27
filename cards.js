import { kikiImg, pix } from './pixel.js';
// Fiszki z powtórkami SM-2.
import { state, save } from './store.js';
import { t, L } from './i18n.js';
import { asArr, first } from './content.js';
import { dueWords, srsReview, addTime, addXP, checkBadges } from './progress.js';
import { knownWords } from './words.js';
import { h, $, sayBtn } from './ui.js';
import { esc, shuffle } from './text.js';
import { speak } from './speech.js';

import { sound, haptic, toast } from './fx.js';

export function renderCards(root, nav) {
  const lang = state.settings.lang;
  const dir = state.settings.cardDir || 'mixed';
  const due = dueWords();
  const el = h(`<div class="page cards-page">
    <header class="pagehead"><h1>${t('nav.cards')}</h1><span class="count">${due.length}</span></header>
    <div class="seg" role="radiogroup">${['hr2l1', 'l12hr', 'mixed'].map(d => `<button class="${d === dir ? 'on' : ''}" data-dir="${d}">${t('cards.' + d)}</button>`).join('')}</div>
    <div class="cards-body"></div></div>`);
  root.replaceChildren(el);
  el.querySelectorAll('[data-dir]').forEach(b => b.onclick = () => { state.settings.cardDir = b.dataset.dir; save(); renderCards(root, nav); });
  const body = $('.cards-body', el);

  const known = knownWords().filter(w => state.words[w.id]?.srs);
  if (!known.length) {
    body.innerHTML = `<div class="empty">${kikiImg(5)}<p>${t('cards.empty')}</p><button class="btn primary" data-go="map">${t('nav.map')}</button></div>`;
    body.querySelector('[data-go]').onclick = () => nav('map');
    return;
  }
  if (!due.length) {
    body.innerHTML = `<div class="empty">${kikiImg(5)}<p>${t('cards.allDone')}</p><button class="btn primary" data-extra>${t('cards.extra')}</button></div>`;
    body.querySelector('[data-extra]').onclick = () => session(shuffle(known).slice(0, 15), true);
    return;
  }
  session(shuffle(due).slice(0, 40), false);

  function session(list, extra) {
    let i = 0, flipped = false, t0 = Date.now(), reviewed = 0;
    const queue = list.slice();
    body.innerHTML = `<div class="cprog"><span></span></div>
      <div class="flash" tabindex="0"><div class="flash-in"><div class="face front"></div><div class="face back"></div></div></div>
      <p class="hint muted">${t('cards.hint')}</p>
      <div class="rate" hidden>${[[0, 'again'], [3, 'hard'], [4, 'good'], [5, 'easy']].map(([q, k]) => `<button class="btn r-${k}" data-q="${q}">${t('cards.' + k)}</button>`).join('')}</div>`;
    const card = $('.flash', body), inner = $('.flash-in', body), front = $('.front', body), back = $('.back', body), rate = $('.rate', body), prog = $('.cprog span', body), hint = $('.hint', body);

    function draw() {
      if (i >= queue.length) return end();
      const w = queue[i];
      const d = dir === 'mixed' ? (Math.random() < 0.5 ? 'hr2l1' : 'l12hr') : dir;
      const l1 = esc(asArr(w[lang]).join(', '));
      const hr = `${esc(w.hr)}${w.g ? ` <i class="gtag">${t('g.' + w.g)}</i>` : ''}`;
      front.innerHTML = `<span class="emoji">${d === 'l12hr' && w.ico ? pix(w.ico, 64) : ''}</span><div class="fw">${d === 'hr2l1' ? hr : l1}</div>${d === 'hr2l1' ? sayBtn(w.hr) : ''}`;
      back.innerHTML = `<span class="emoji">${pix(w.ico, 56)}</span><div class="fw">${hr}</div><div class="fl1">${l1}</div>${sayBtn(w.hr)}
        ${w.ex ? `<div class="fex"><b>${esc(w.ex.hr)}</b><small>${esc(L(w.ex))}</small></div>` : ''}`;
      inner.classList.remove('flipped'); flipped = false; rate.hidden = true; hint.hidden = false;
      prog.style.width = `${(i / queue.length) * 100}%`;
      if (d === 'hr2l1') speak(w.hr);
    }
    function flip() {
      if (flipped) return;
      flipped = true; inner.classList.add('flipped'); rate.hidden = false; hint.hidden = true; sound('flip'); haptic();
      if (dir !== 'hr2l1') speak(queue[i].hr);
    }
    function grade(q) {
      const w = queue[i];
      srsReview(w.id, q); reviewed++;
      if (q === 0) queue.push(w); // wraca w tej sesji
      card.classList.add(q >= 3 ? 'fly-r' : 'fly-l');
      setTimeout(() => { card.classList.remove('fly-r', 'fly-l'); i++; draw(); }, 260);
    }
    function end() {
      addTime((Date.now() - t0) / 1000);
      addXP(Math.min(20, reviewed));
      const b = checkBadges();
      b.forEach(x => toast(`${x.ico} ${t('badge.new')}: <b>${x[lang][0]}</b>`));
      body.innerHTML = `<div class="empty">${kikiImg(5)}<h2>${t('cards.sessionDone')}</h2><p>${t('cards.reviewed').replace('{n}', reviewed)}</p><button class="btn primary" data-back>${t('continue')}</button></div>`;
      body.querySelector('[data-back]').onclick = () => renderCards(root, nav);
      sound('win');
    }

    card.addEventListener('click', e => { if (!e.target.closest('[data-say]')) flip(); });
    card.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
    rate.addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (b) grade(+b.dataset.q); });
    // gesty: przesunięcie w górę/dół = odwróć; po odwróceniu w prawo = dobrze, w lewo = nie wiem
    let sx = 0, sy = 0, active = false;
    card.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; active = true; });
    card.addEventListener('pointermove', e => { if (!active || !flipped) return; const dx = e.clientX - sx; card.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`; });
    const up = e => {
      if (!active) return; active = false; card.style.transform = '';
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!flipped && Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx)) return flip();
      if (!flipped && Math.abs(dx) > 50) return flip();
      if (flipped && Math.abs(dx) > 80) grade(dx > 0 ? 4 : 0);
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', () => { active = false; card.style.transform = ''; });
    draw();
  }
}
