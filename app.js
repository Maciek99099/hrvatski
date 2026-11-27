// Punkt wejścia: routing, nawigacja, rejestracja service workera.
import { state, save, restoreIfNeeded } from './store.js';
import { t } from './i18n.js';
import { lessonById, lessonStatus } from './content.js';
import { renderMap } from './map.js';
import { runLesson } from './lesson.js';
import { renderWords } from './words.js';
import { renderCards } from './cards.js';
import { renderStats } from './stats.js';
import { renderSettings, renderOnboarding, applyTheme } from './settings.js';
import { renderGames, runGame } from './games.js';
import { weakestWords, dueWords } from './progress.js';
import { icon } from './art.js';
import { h, $ } from './ui.js';
import { toast } from './fx.js';

const app = document.getElementById('app');
const TABS = [['map', 'map'], ['words', 'words'], ['cards', 'cards'], ['games', 'games'], ['stats', 'stats'], ['settings', 'settings']];

function shell() {
  const due = dueWords().length;
  app.innerHTML = `<div class="shell">
    <nav class="tabbar" aria-label="nav">${TABS.map(([r, ic]) => `<a href="#/${r}" data-r="${r}">${icon(ic, 24)}<span>${t('nav.' + r)}</span>${r === 'cards' && due ? `<em class="dot">${due > 99 ? '99+' : due}</em>` : ''}</a>`).join('')}</nav>
    <main class="view" id="view"></main></div>`;
}

const nav = r => { location.hash = '#/' + r; };

function route() {
  applyTheme();
  if (!state.onboarded) return renderOnboarding(app, () => { nav('map'); route(); });
  const [r, arg] = (location.hash.replace(/^#\/?/, '') || 'map').split('/');
  if (r === 'game' && arg) {
    document.body.classList.add('in-lesson');
    const box = h('<div class="lesson-host"></div>');
    app.replaceChildren(box);
    runGame(box, arg, x => { document.body.classList.remove('in-lesson'); nav(x); });
    return;
  }
  if (r === 'lesson' || r === 'weak') {
    const lesson = r === 'weak' ? { id: 'weak', weak: true, tags: [] } : lessonById[arg];
    if (r === 'weak' && weakestWords(10).length < 4) { toast(t('weak.notYet')); return nav('map'); }
    if (!lesson || (!lesson.weak && lessonStatus(lesson) === 'locked')) return nav('map');
    document.body.classList.add('in-lesson');
    const box = h('<div class="lesson-host"></div>');
    app.replaceChildren(box);
    runLesson(box, lesson, () => { document.body.classList.remove('in-lesson'); nav('map'); });
    return;
  }
  document.body.classList.remove('in-lesson');
  if (!$('.shell', app)) shell();
  else { // odśwież licznik fiszek i podpisy
    shell();
  }
  app.querySelectorAll('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.r === r));
  const view = $('#view', app);
  view.scrollTop = 0;
  const rerender = () => route();
  switch (r) {
    case 'words': renderWords(view); break;
    case 'cards': renderCards(view, nav); break;
    case 'stats': renderStats(view, nav); break;
    case 'games': renderGames(view, nav); break;
    case 'settings': renderSettings(view, rerender); break;
    default: renderMap(view, nav);
  }
}

addEventListener('hashchange', route);
restoreIfNeeded().then(() => route(), () => route());

// ── PWA ──
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw?.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) toast(t('pwa.updated'), 5000);
        });
      });
    }).catch(e => console.warn('SW', e));
  });
}
