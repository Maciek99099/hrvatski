// Dźwięki (WebAudio, bez plików), haptyka, konfetti, toasty.
import { state } from './store.js';

let ctx = null;
function ac() {
  if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (C) ctx = new C(); }
  if (ctx?.state === 'suspended') ctx.resume();
  return ctx;
}
// odblokowanie audio na iOS przy pierwszym dotknięciu
addEventListener('pointerdown', () => ac(), { once: true });

function tone(freq, start, dur, type = 'sine', vol = 0.18) {
  const c = ac(); if (!c) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.value = freq;
  const t = c.currentTime + start;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t); o.stop(t + dur + 0.02);
}

export function sound(kind) {
  if (!state.settings.sound) return;
  switch (kind) {
    case 'ok': tone(660, 0, 0.12, 'triangle'); tone(990, 0.09, 0.2, 'triangle'); break;
    case 'almost': tone(620, 0, 0.14, 'triangle'); tone(740, 0.1, 0.18, 'triangle'); break;
    case 'bad': tone(220, 0, 0.18, 'sawtooth', 0.08); tone(180, 0.12, 0.25, 'sawtooth', 0.08); break;
    case 'tap': tone(880, 0, 0.05, 'sine', 0.06); break;
    case 'flip': tone(500, 0, 0.06, 'sine', 0.06); break;
    case 'win': [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.15)); break;
    case 'unlock': [392, 523, 784].forEach((f, i) => tone(f, i * 0.09, 0.25, 'square', 0.06)); break;
  }
}

// iOS Safari nie obsługuje navigator.vibrate. Od iOS 18 działa sztuczka z <input switch>.
let sw = null;
export function haptic(kind = 'light') {
  if (!state.settings.haptics) return;
  if (navigator.vibrate) { navigator.vibrate(kind === 'bad' ? [30, 40, 30] : 15); return; }
  try {
    if (!sw) {
      sw = document.createElement('label');
      sw.style.cssText = 'position:fixed;left:-9999px;opacity:0';
      sw.innerHTML = '<input type="checkbox" switch>';
      document.body.appendChild(sw);
    }
    sw.click();
    if (kind === 'bad') setTimeout(() => sw.click(), 90);
  } catch {}
}

export function feedback(result) {
  sound(result === 'ok' ? 'ok' : result === 'almost' ? 'almost' : 'bad');
  haptic(result === 'wrong' ? 'bad' : 'light');
}

export function confetti(n = 140) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = document.createElement('canvas');
  cv.className = 'confetti';
  const dpr = devicePixelRatio || 1;
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  document.body.appendChild(cv);
  const g = cv.getContext('2d'); g.scale(dpr, dpr);
  const colors = ['#d7262f', '#ffffff', '#1593d6', '#f4b400', '#3aa655', '#e0703a'];
  const ps = Array.from({ length: n }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 13, vy: -Math.random() * 13 - 4,
    r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
    w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, c: colors[(Math.random() * colors.length) | 0],
  }));
  let t = 0;
  (function frame() {
    g.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of ps) {
      p.vy += 0.32; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c;
      g.strokeStyle = 'rgba(0,0,0,.12)'; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
      g.restore();
    }
    if (++t < 200) requestAnimationFrame(frame); else cv.remove();
  })();
}

export function toast(html, ms = 2600) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = html;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, ms);
}

export function floatXP(n, anchor) {
  const el = document.createElement('div');
  el.className = 'xpfloat';
  el.textContent = `+${n} XP`;
  const r = anchor?.getBoundingClientRect?.() || { left: innerWidth / 2, top: innerHeight / 2, width: 0 };
  el.style.left = r.left + r.width / 2 + 'px';
  el.style.top = r.top + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}
