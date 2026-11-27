// Stan aplikacji + trwały zapis w localStorage, eksport/import JSON.
const KEY = 'hrvatski.progress.v1';

export const defaults = () => ({
  version: 1,
  createdAt: Date.now(),
  onboarded: false,
  settings: {
    lang: 'pl',          // 'pl' | 'en'
    sound: true,
    haptics: true,
    rate: 'normal',      // 'normal' | 'slow'
    speaking: false,     // ćwiczenia mówienia
    listening: true,     // ćwiczenia słuchania
    theme: 'dark',       // 'auto' | 'light' | 'dark'
    goal: 10,            // minut dziennie
    voiceURI: null,
  },
  xp: 0,
  lessons: {},   // id -> { stars, best, done, started, last }
  words: {},     // wordId -> { s, seen, ok, bad, last, srs: { ef, int, reps, due } | null }
  tags: {},      // tag -> { ok, bad }
  activity: {},  // 'YYYY-MM-DD' -> { xp, sec, lessons }
  streak: { count: 0, last: null, best: 0 },
  badges: {},    // id -> timestamp
  counters: { cards: 0, perfect: 0, lessons: 0, cases: 0, games: 0 },
  lastPos: null, // ostatnia pozycja gracza na mapie (do animacji)
});

function merge(base, obj) {
  for (const k of Object.keys(obj || {})) {
    if (obj[k] && typeof obj[k] === 'object' && !Array.isArray(obj[k]) && base[k] && typeof base[k] === 'object') {
      merge(base[k], obj[k]);
    } else base[k] = obj[k];
  }
  return base;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return merge(defaults(), JSON.parse(raw));
  } catch (e) { console.warn('load failed', e); }
  return defaults();
}

export const state = load();

// ── kopia w IndexedDB (drugi, niezależny magazyn – na wypadek wyczyszczenia localStorage) ──
function idb() {
  return new Promise((res, rej) => {
    if (!window.indexedDB) return rej(new Error('no idb'));
    const r = indexedDB.open('hrvatski', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function idbPut(val) {
  try { const db = await idb(); db.transaction('kv', 'readwrite').objectStore('kv').put(val, KEY); } catch (e) { /* brak IDB */ }
}
async function idbGet() {
  try { const db = await idb(); return await new Promise(res => { const q = db.transaction('kv').objectStore('kv').get(KEY); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); }); } catch { return null; }
}

// Gdy localStorage jest pusty (np. iOS wyczyścił dane strony), przywróć postęp z IndexedDB.
export async function restoreIfNeeded() {
  if (localStorage.getItem(KEY)) return false;
  const raw = await idbGet();
  if (!raw) return false;
  try {
    const fresh = merge(defaults(), JSON.parse(raw));
    for (const k of Object.keys(state)) delete state[k];
    Object.assign(state, fresh);
    localStorage.setItem(KEY, raw);
    return true;
  } catch { return false; }
}

let timer = null;
export function save(now = false) {
  clearTimeout(timer);
  const doSave = () => {
    state.savedAt = Date.now();
    const raw = JSON.stringify(state);
    try { localStorage.setItem(KEY, raw); } catch (e) { console.warn('save failed', e); }
    idbPut(raw);
  };
  if (now) doSave(); else timer = setTimeout(doSave, 250);
}
addEventListener('pagehide', () => save(true));
document.addEventListener('visibilitychange', () => { if (document.hidden) save(true); });

// Prośba o trwałe przechowywanie (Safari może czyścić dane nieużywanych stron).
if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});

export function exportJSON() {
  return JSON.stringify({ app: 'hrvatski', exportedAt: new Date().toISOString(), data: state }, null, 2);
}

export function importJSON(text) {
  const obj = JSON.parse(text);
  const data = obj && obj.app === 'hrvatski' ? obj.data : obj;
  if (!data || typeof data !== 'object' || !('lessons' in data)) throw new Error('bad file');
  const fresh = merge(defaults(), data);
  for (const k of Object.keys(state)) delete state[k];
  Object.assign(state, fresh);
  save(true);
}

export function resetAll() {
  const keepLang = state.settings.lang;
  for (const k of Object.keys(state)) delete state[k];
  Object.assign(state, defaults());
  state.settings.lang = keepLang;
  save(true);
}

// ── pomocnicze daty ──
export function dayKey(d = new Date()) {
  const z = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}
export function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + n));
}
export function today() {
  const k = dayKey();
  return state.activity[k] || (state.activity[k] = { xp: 0, sec: 0, lessons: 0 });
}
