// Drobne narzędzia DOM + okna modalne.
import { t } from './i18n.js';
import { icon } from './art.js';
import { speak } from './speech.js';
import { esc } from './text.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function h(html) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

export function modal({ title = '', body = '', actions = [] }) {
  return new Promise(resolve => {
    const el = h(`<div class="modal-wrap" role="dialog" aria-modal="true">
      <div class="modal">${title ? `<h3>${title}</h3>` : ''}<div class="modal-body">${body}</div>
      <div class="modal-actions">${actions.map((a, i) => `<button class="btn ${a.cls || ''}" data-i="${i}">${a.label}</button>`).join('')}</div></div></div>`);
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    const close = v => { el.classList.remove('show'); setTimeout(() => el.remove(), 250); resolve(v); };
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-i]');
      if (b) close(actions[+b.dataset.i].value);
      else if (e.target === el) close(null);
    });
  });
}

export const confirmModal = (title, body, yes, no = t('cancel'), danger = false) =>
  modal({ title, body, actions: [{ label: no, value: false }, { label: yes, value: true, cls: danger ? 'danger' : 'primary' }] });

// przycisk odsłuchu dla tekstu chorwackiego
export const sayBtn = (text, cls = '') => `<button class="say ${cls}" data-say="${esc(text)}" aria-label="${t('listen')}">${icon('speaker', 20)}</button>`;
export const slowBtn = text => `<button class="say slow" data-say="${esc(text)}" data-slow="1" aria-label="${t('slow')}">${icon('turtle', 20)}</button>`;

// delegacja: każdy element z data-say odtwarza wymowę
document.addEventListener('click', e => {
  const b = e.target.closest('[data-say]');
  if (!b) return;
  e.stopPropagation();
  if (b.closest('summary')) e.preventDefault();
  b.classList.add('playing');
  speak(b.dataset.say, { slow: !!b.dataset.slow, onend: () => b.classList.remove('playing') });
});

// pasek chorwackich znaków do pól tekstowych
export function diacriticBar(input) {
  const bar = h(`<div class="dbar" role="toolbar" aria-label="č ć dž đ š ž">${['č', 'ć', 'dž', 'đ', 'š', 'ž', 'lj', 'nj'].map(c => `<button type="button" data-c="${c}">${c}</button>`).join('')}</div>`);
  bar.addEventListener('pointerdown', e => e.preventDefault()); // nie zabieraj fokusu
  bar.addEventListener('click', e => {
    const b = e.target.closest('[data-c]'); if (!b) return;
    const c = b.dataset.c;
    const s = input.selectionStart ?? input.value.length, en = input.selectionEnd ?? s;
    input.value = input.value.slice(0, s) + c + input.value.slice(en);
    input.setSelectionRange(s + c.length, s + c.length);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  });
  return bar;
}

export const stars = (n, max = 3) => `<span class="stars">${Array.from({ length: max }, (_, i) => `<span class="${i < n ? 'on' : ''}">${icon('star', 16)}</span>`).join('')}</span>`;

export function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = Math.round(sec % 60);
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : m ? `${m} min${s ? ` ${s} s` : ''}` : `${s} s`;
}
