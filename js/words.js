import { kikiImg, pix } from './pixel.js';
// Bank słówek: wyszukiwarka, filtry, poziomy opanowania.
import { state } from './store.js';
import { t, L } from './i18n.js';
import { wordById, districts, lessonById, asArr, isDone } from './content.js';
import { mastery, MASTERY } from './progress.js';
import { h, $, sayBtn } from './ui.js';
import { esc, strip } from './text.js';
import { icon } from './art.js';

export const knownWords = () => Object.values(wordById).filter(w => isDone(w.lesson) || state.words[w.id]?.seen);

const f = { q: '', d: '', cat: '', pos: '', m: '', sort: 'alpha' };

export function renderWords(root) {
  const all = knownWords();
  const lang = state.settings.lang;
  const cats = [...new Set(all.map(w => w.cat).filter(Boolean))].sort();
  const poss = [...new Set(all.map(w => w.pos).filter(Boolean))];
  const ds = districts.filter(d => all.some(w => w.district === d.id));
  const opt = (v, label, cur) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${esc(label)}</option>`;

  const el = h(`<div class="page words-page">
    <header class="pagehead"><h1>${t('nav.words')}</h1><span class="count">${all.length}</span></header>
    <div class="filters">
      <label class="search">${icon('search', 18)}<input type="search" placeholder="${t('words.search')}" value="${esc(f.q)}" autocapitalize="off" autocorrect="off" spellcheck="false"></label>
      <div class="frow">
        <select data-f="d">${opt('', t('words.allDistricts'), f.d)}${ds.map(d => opt(d.id, `${d.index + 1}. ${d.hr}`, f.d)).join('')}</select>
        <select data-f="cat">${opt('', t('words.allCats'), f.cat)}${cats.map(c => opt(c, t('cat.' + c), f.cat)).join('')}</select>
        <select data-f="pos">${opt('', t('words.allPos'), f.pos)}${poss.map(p => opt(p, t('pos.' + p), f.pos)).join('')}</select>
        <select data-f="m">${opt('', t('words.allLevels'), f.m)}${MASTERY.map(m => opt(m, t('m.' + m), f.m)).join('')}</select>
        <select data-f="sort">${opt('alpha', t('words.sortAlpha'), f.sort)}${opt('weak', t('words.sortWeak'), f.sort)}${opt('lesson', t('words.sortLesson'), f.sort)}</select>
      </div>
    </div>
    <ul class="wbank"></ul>
  </div>`);
  root.replaceChildren(el);
  const list = $('.wbank', el);

  function draw() {
    const q = strip(f.q);
    let ws = all.filter(w => (!f.d || w.district === f.d) && (!f.cat || w.cat === f.cat) && (!f.pos || w.pos === f.pos) && (!f.m || mastery(w.id) === f.m)
      && (!q || strip(w.hr).includes(q) || asArr(w[lang]).some(x => strip(x).includes(q))));
    const sc = w => { const r = state.words[w.id]; return r ? r.s - r.bad * 0.3 : 0; };
    if (f.sort === 'alpha') ws.sort((a, b) => a.hr.localeCompare(b.hr, 'hr'));
    if (f.sort === 'weak') ws.sort((a, b) => sc(a) - sc(b));
    if (f.sort === 'lesson') ws.sort((a, b) => lessonById[a.lesson].index - lessonById[b.lesson].index);
    if (!all.length) { list.innerHTML = `<li class="empty">${kikiImg(4)}<p>${t('words.empty')}</p></li>`; return; }
    if (!ws.length) { list.innerHTML = `<li class="empty"><p>${t('words.none')}</p></li>`; return; }
    list.innerHTML = ws.map(w => {
      const m = mastery(w.id), l = lessonById[w.lesson];
      return `<li class="witem"><details><summary>
        ${sayBtn(w.hr, 'sm')}<span class="wico">${pix(w.ico || '📍', 32)}</span>
        <div class="wmain"><b>${esc(w.hr)}</b>${w.g ? `<i class="gtag">${t('g.' + w.g)}</i>` : ''}<small>${esc(asArr(w[lang]).join(', '))}</small></div>
        <span class="mpill ${m}">${t('m.' + m)}</span></summary>
        <div class="wdetail">
          ${w.ex ? `<p>${sayBtn(w.ex.hr, 'sm')}<b>${esc(w.ex.hr)}</b><br><small>${esc(L(w.ex))}</small></p>` : ''}
          <p class="muted">${t('pos.' + w.pos)}${w.cat ? ` · ${t('cat.' + w.cat)}` : ''}</p>
          <p class="muted">📍 ${esc(l.district.hr)} → ${esc(L(l.place))} · ${t('words.lesson')} ${l.num}: ${esc(L(l.title))}</p>
          ${state.words[w.id]?.seen ? `<p class="muted">✔ ${state.words[w.id].ok} · ✖ ${state.words[w.id].bad}</p>` : ''}
        </div></details></li>`;
    }).join('');
  }
  draw();
  $('input', el).addEventListener('input', e => { f.q = e.target.value; draw(); });
  el.querySelectorAll('select').forEach(s => s.addEventListener('change', () => { f[s.dataset.f] = s.value; draw(); }));
}
