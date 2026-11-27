import { kikiImg, pix } from './pixel.js';
// Statystyki, odznaki.
import { state, dayKey, addDays } from './store.js';
import { t } from './i18n.js';
import { lessons, isDone } from './content.js';
import { level, BADGES, streakAlive, mastery, MASTERY } from './progress.js';
import { knownWords } from './words.js';
import { h } from './ui.js';
import { fmtTime } from './ui.js';
import { esc } from './text.js';

const SKILLS = ['vocab', 'translation', 'listening', 'writing', 'syntax', 'dialog', 'reading'];

export function renderStats(root, nav) {
  const lang = state.settings.lang;
  const lv = level();
  const words = knownWords();
  const done = lessons.filter(l => isDone(l.id)).length;
  const totalSec = Object.values(state.activity).reduce((s, a) => s + (a.sec || 0), 0);
  const mcount = Object.fromEntries(MASTERY.map(m => [m, 0]));
  words.forEach(w => mcount[mastery(w.id)]++);

  // aktywność: ostatnie 14 dni
  const days = Array.from({ length: 14 }, (_, i) => addDays(dayKey(), i - 13));
  const vals = days.map(k => state.activity[k]?.xp || 0);
  const mx = Math.max(10, ...vals);
  const W = 320, H = 120, bw = W / 14;
  const chart = `<svg class="chart" viewBox="0 0 ${W} ${H + 18}" role="img" aria-label="${t('stats.activity')}">
    ${vals.map((v, i) => `<rect x="${i * bw + 3}" y="${H - (v / mx) * H}" width="${bw - 6}" height="${Math.max(2, (v / mx) * H)}" rx="3" class="${i === 13 ? 'today' : ''}"><title>${days[i]}: ${v} XP</title></rect>`).join('')}
    ${days.map((k, i) => (i % 2 === 1 ? `<text x="${i * bw + bw / 2}" y="${H + 14}" text-anchor="middle">${+k.slice(8)}</text>` : '')).join('')}
  </svg>`;

  // mocne / słabe strony
  const tags = Object.entries(state.tags).map(([k, v]) => ({ k, n: v.ok + v.bad, acc: v.ok / Math.max(1, v.ok + v.bad) })).filter(x => x.n >= 4);
  const named = tags.filter(x => !SKILLS.includes(x.k));
  const skills = tags.filter(x => SKILLS.includes(x.k));
  const tagLabel = k => t('tag.' + k) !== 'tag.' + k ? t('tag.' + k) : k;
  const bars = arr => arr.sort((a, b) => b.acc - a.acc).map(x => `<div class="sbar"><span>${esc(tagLabel(x.k))}</span><i style="--w:${Math.round(x.acc * 100)}%" class="${x.acc >= 0.85 ? 'good' : x.acc < 0.65 ? 'bad' : ''}"></i><b>${Math.round(x.acc * 100)}%</b></div>`).join('');

  const el = h(`<div class="page stats-page">
    <header class="pagehead"><h1>${t('nav.stats')}</h1></header>
    <div class="kpis">
      <div class="kpi"><b>${words.length}</b><small>${t('stats.words')}</small></div>
      <div class="kpi"><b>${done}/${lessons.length}</b><small>${t('stats.lessons')}</small></div>
      <div class="kpi"><b>${fmtTime(totalSec)}</b><small>${t('stats.time')}</small></div>
      <div class="kpi"><b>🔥 ${streakAlive()}</b><small>${t('stats.streak')} (${t('stats.best')} ${state.streak.best})</small></div>
      <div class="kpi"><b>${state.xp}</b><small>XP</small></div>
      <div class="kpi"><b>${lv.n}</b><small>${t('level')} · ${state.xp - lv.lo}/${lv.hi - lv.lo}</small></div>
    </div>
    <section class="card"><h3>${t('stats.activity')}</h3>${chart}</section>
    <section class="card"><h3>${t('stats.mastery')}</h3><div class="mrow">${MASTERY.map(m => `<div class="mpill ${m}">${t('m.' + m)}: <b>${mcount[m]}</b></div>`).join('')}</div></section>
    <section class="card"><h3>${t('stats.topics')}</h3>${named.length ? bars(named) : `<p class="muted">${t('stats.noData')}</p>`}</section>
    <section class="card"><h3>${t('stats.skills')}</h3>${skills.length ? bars(skills) : `<p class="muted">${t('stats.noData')}</p>`}</section>
    <section class="card"><h3>${t('stats.badges')} · ${Object.keys(state.badges).length}/${BADGES.length}</h3>
      <div class="badges">${BADGES.map(b => `<div class="badge ${state.badges[b.id] ? 'got' : ''}" title="${esc(b[lang][1])}">${pix(b.ico, 40)}<b>${esc(b[lang][0])}</b><small>${esc(b[lang][1])}</small></div>`).join('')}</div></section>
  </div>`);
  root.replaceChildren(el);
}
