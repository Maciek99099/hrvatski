import { kikiImg, pix } from './pixel.js';
// Ustawienia + ekran pierwszego uruchomienia.
import { state, save, exportJSON, importJSON, resetAll, dayKey } from './store.js';
import { t } from './i18n.js';
import { hrVoices, hrVoice, onVoices, speak, hasSynth, canRecognize } from './speech.js';
import { h, $, confirmModal, modal } from './ui.js';

import { toast, sound } from './fx.js';
import { esc } from './text.js';

export function applyTheme() {
  const th = state.settings.theme;
  const dark = th === 'dark' || (th === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.lang = state.settings.lang;
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#1b2a31' : '#f4ecdc');
}
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);

export function voiceHelp() {
  return `<div class="voice-help">${t('voice.help')}</div>`;
}

function voiceStatus() {
  const v = hrVoice();
  if (!hasSynth()) return `<div class="warn-box">${t('voice.noSynth')}</div>`;
  if (v) return `<div class="ok-box">✔ ${t('voice.ok')}: <b>${esc(v.name)}</b></div>`;
  return `<div class="warn-box">${t('voice.missing')}${voiceHelp()}</div>`;
}

const toggle = (key, label, sub = '') => `<label class="setrow"><span>${label}${sub ? `<small>${sub}</small>` : ''}</span><input type="checkbox" class="switch" data-k="${key}" ${state.settings[key] ? 'checked' : ''}></label>`;
const seg = (key, opts) => `<div class="seg">${opts.map(([v, l]) => `<button data-k="${key}" data-v="${v}" class="${String(state.settings[key]) === String(v) ? 'on' : ''}">${l}</button>`).join('')}</div>`;

export function renderSettings(root, rerender) {
  const vs = hrVoices();
  const el = h(`<div class="page settings-page">
    <header class="pagehead"><h1>${t('nav.settings')}</h1></header>
    <section class="card"><h3>${t('set.lang')}</h3>${seg('lang', [['pl', '🇵🇱 Polski'], ['en', '🇬🇧 English']])}</section>
    <section class="card"><h3>${t('set.goal')}</h3>${seg('goal', [[5, '5 min'], [10, '10 min'], [15, '15 min'], [20, '20 min']])}</section>
    <section class="card"><h3>${t('set.audio')}</h3>
      <div class="voice-status">${voiceStatus()}</div>
      ${vs.length > 1 ? `<label class="setrow"><span>${t('set.voice')}</span><select data-voice>${vs.map(v => `<option value="${esc(v.voiceURI)}" ${hrVoice()?.voiceURI === v.voiceURI ? 'selected' : ''}>${esc(v.name)}</option>`).join('')}</select></label>` : ''}
      <div class="setrow"><span>${t('set.rate')}</span>${seg('rate', [['normal', t('set.rateNormal')], ['slow', t('set.rateSlow')]])}</div>
      <button class="btn ghost" data-test>🔊 ${t('set.test')}</button>
      ${toggle('listening', t('set.listening'), t('set.listeningSub'))}
      ${toggle('speaking', t('set.speaking'), canRecognize() ? t('set.speakingSub') : t('set.speakingNoSR'))}
      ${toggle('sound', t('set.sound'))}
      ${toggle('haptics', t('set.haptics'), t('set.hapticsSub'))}
    </section>
    <section class="card"><h3>${t('set.theme')}</h3>${seg('theme', [['auto', t('set.auto')], ['light', t('set.light')], ['dark', t('set.dark')]])}</section>
    <section class="card"><h3>${t('set.data')}</h3>
      <p class="muted">${t('set.dataInfo')}</p>
      <div class="row-btns wrap"><button class="btn" data-export>⬇️ ${t('set.export')}</button>
      <label class="btn">⬆️ ${t('set.import')}<input type="file" accept="application/json,.json" hidden data-import></label>
      <button class="btn danger" data-reset>🗑 ${t('set.reset')}</button></div>
    </section>
    <section class="card about">${kikiImg(3)}<p>${t('set.about')}</p><p class="muted small">v1.0 · offline ✓</p></section>
  </div>`);
  root.replaceChildren(el);

  el.addEventListener('click', async e => {
    const b = e.target.closest('[data-k][data-v]');
    if (b) {
      const k = b.dataset.k; let v = b.dataset.v;
      if (k === 'goal') v = +v;
      state.settings[k] = v; save(); sound('tap');
      applyTheme();
      return rerender();
    }
    if (e.target.closest('[data-test]')) speak('Dobar dan! Zovem se Kiki. Drago mi je!');
    if (e.target.closest('[data-export]')) doExport();
    if (e.target.closest('[data-reset]')) {
      if (await confirmModal(t('set.resetTitle'), t('set.resetBody'), t('set.reset'), t('cancel'), true)) { resetAll(); toast(t('set.resetDone')); rerender(); }
    }
  });
  el.addEventListener('change', async e => {
    const c = e.target;
    if (c.matches('.switch')) { state.settings[c.dataset.k] = c.checked; save(); sound('tap'); }
    if (c.matches('[data-voice]')) { state.settings.voiceURI = c.value; save(); speak('Bok!'); }
    if (c.matches('[data-import]') && c.files[0]) {
      try {
        const txt = await c.files[0].text();
        if (!(await confirmModal(t('set.importTitle'), t('set.importBody'), t('set.import')))) return;
        importJSON(txt); applyTheme(); toast('✔ ' + t('set.importDone')); rerender();
      } catch (err) { toast('✖ ' + t('set.importErr')); }
    }
  });
  const off = onVoices(() => { const vsEl = $('.voice-status', el); if (vsEl?.isConnected) vsEl.innerHTML = voiceStatus(); else off(); });
}

async function doExport() {
  const name = `hrvatski-backup-${dayKey()}.json`;
  const blob = new Blob([exportJSON()], { type: 'application/json' });
  const file = new File([blob], name, { type: 'application/json' });
  // iOS: arkusz udostępniania pozwala zapisać do Plików / iCloud
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: name }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// ── pierwsze uruchomienie ──
export function renderOnboarding(root, done) {
  let step = 0;
  const draw = () => {
    const el = h(`<div class="onboard"><div class="ob-in">
      ${step === 0 ? `${kikiImg(7)}<h1>Bok! 👋</h1><p>Wybierz język / Choose your language</p>
        <div class="ob-langs"><button class="btn big" data-lang="pl">🇵🇱 Polski</button><button class="btn big" data-lang="en">🇬🇧 English</button></div>`
      : step === 1 ? `${kikiImg(5)}<h2>${t('ob.hello')}</h2><p>${t('ob.intro')}</p><h3>${t('set.goal')}</h3>
        <div class="ob-goals">${[5, 10, 15, 20].map(g => `<button class="btn ${state.settings.goal === g ? 'primary' : ''}" data-goal="${g}"><b>${g} min</b><small>${t('ob.goal' + g)}</small></button>`).join('')}</div>
        <button class="btn primary big" data-next>${t('continue')}</button>`
      : `${kikiImg(5)}<h2>${t('ob.voiceTitle')}</h2><div class="voice-status">${voiceStatus()}</div>
        <button class="btn ghost" data-test>🔊 ${t('set.test')}</button>
        <p class="muted small">${t('ob.install')}</p>
        <button class="btn primary big" data-finish>${t('ob.start')}</button>`}
    </div></div>`);
    root.replaceChildren(el);
    el.addEventListener('click', e => {
      const l = e.target.closest('[data-lang]');
      if (l) { state.settings.lang = l.dataset.lang; save(); applyTheme(); step = 1; return draw(); }
      const g = e.target.closest('[data-goal]');
      if (g) { state.settings.goal = +g.dataset.goal; save(); return draw(); }
      if (e.target.closest('[data-next]')) { step = 2; return draw(); }
      if (e.target.closest('[data-test]')) speak('Dobar dan! Zovem se Kiki.');
      if (e.target.closest('[data-finish]')) { state.onboarded = true; save(true); done(); }
    });
    if (step === 2) { const off = onVoices(() => { const v = $('.voice-status', el); if (v?.isConnected) v.innerHTML = voiceStatus(); else off(); }); }
  };
  draw();
}
