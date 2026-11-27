// Wymowa (speechSynthesis, hr-HR) i opcjonalne rozpoznawanie mowy.
import { state } from './store.js';

const synth = window.speechSynthesis;
let voices = [];
const listeners = new Set();

function refresh() {
  if (!synth) return;
  voices = synth.getVoices();
  listeners.forEach(fn => fn());
}
if (synth) {
  refresh();
  synth.addEventListener?.('voiceschanged', refresh);
  // iOS ładuje głosy z opóźnieniem
  setTimeout(refresh, 500); setTimeout(refresh, 1500);
}

export const onVoices = fn => { listeners.add(fn); return () => listeners.delete(fn); };
export const hasSynth = () => !!synth;
export const hrVoices = () => voices.filter(v => /^hr([-_]|$)/i.test(v.lang));

export function hrVoice() {
  const list = hrVoices();
  return list.find(v => v.voiceURI === state.settings.voiceURI) || list.find(v => /lana/i.test(v.name)) || list[0] || null;
}

export function speak(text, { slow = false, onend } = {}) {
  if (!synth || !text) { onend?.(); return; }
  synth.cancel();
  const u = new SpeechSynthesisUtterance(String(text).replace(/…/g, ''));
  const v = hrVoice();
  if (v) u.voice = v;
  u.lang = 'hr-HR';
  const base = state.settings.rate === 'slow' ? 0.7 : 0.92;
  u.rate = slow ? 0.55 : base;
  u.onend = () => onend?.();
  u.onerror = () => onend?.();
  synth.speak(u);
}

// ── rozpoznawanie mowy (Safari: webkitSpeechRecognition; w trybie PWA bywa niedostępne) ──
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canRecognize = () => !!SR;

export function listen({ onresult, onerror, onend }) {
  if (!SR) { onerror?.('unsupported'); return null; }
  const r = new SR();
  r.lang = 'hr-HR';
  r.interimResults = false;
  r.maxAlternatives = 3;
  r.onresult = e => onresult?.(Array.from(e.results[0]).map(a => a.transcript));
  r.onerror = e => onerror?.(e.error);
  r.onend = () => onend?.();
  try { r.start(); } catch (e) { onerror?.('start'); }
  return r;
}
