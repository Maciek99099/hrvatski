// Porównywanie odpowiedzi: tolerancja wielkości liter, interpunkcji, literówek i diakrytyków.

export const norm = s => String(s ?? '').toLowerCase().normalize('NFC').replace(/[’`]/g, "'").replace(/\s+/g, ' ').trim();

// usuwa interpunkcję (zostawia litery, cyfry, apostrof)
export const clean = s => norm(s).replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim();

// usuwa diakrytyki (chorwackie i polskie)
const MAP = { č: 'c', ć: 'c', š: 's', ž: 'z', đ: 'dj', ą: 'a', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
export const strip = s => clean(s).replace(/[čćšžđąęłńóśźż]/g, c => MAP[c]).replace(/dj/g, 'd');

export function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

// Typowe skróty angielskie
const EN = [[/\bwhat's\b/g, 'what is'], [/\bi'm\b/g, 'i am'], [/\byou're\b/g, 'you are'], [/\bit's\b/g, 'it is'], [/\bdon't\b/g, 'do not'], [/\bisn't\b/g, 'is not'], [/\bthat's\b/g, 'that is'], [/\bokay\b/g, 'ok'], [/\bthanks\b/g, 'thank you']];
const expand = s => EN.reduce((t, [r, v]) => t.replace(r, v), s);

/**
 * Sprawdza odpowiedź względem listy poprawnych.
 * @returns {{result:'ok'|'almost'|'wrong', best:string, note?:'diacritics'|'typo'}}
 */
export function check(input, accepted, { typo = true } = {}) {
  const list = accepted.filter(Boolean);
  const a = expand(clean(input));
  if (!a) return { result: 'wrong', best: list[0] };
  for (const c of list) if (expand(clean(c)) === a) return { result: 'ok', best: c };
  for (const c of list) if (expand(strip(c)) === expand(strip(input))) return { result: 'almost', best: c, note: 'diacritics' };
  if (typo) {
    for (const c of list) {
      const x = expand(strip(c)), y = expand(strip(input));
      const tol = x.length > 14 ? 2 : x.length > 4 ? 1 : 0;
      if (tol && lev(x, y) <= tol) return { result: 'almost', best: c, note: 'typo' };
    }
  }
  return { result: 'wrong', best: list[0] };
}

export const tokens = s => clean(s).split(' ').filter(Boolean);
// tokeny do kafelków z zachowaniem wielkich liter (bez interpunkcji)
export const tiles = s => String(s).replace(/[.,!?¿¡;:…–"“”„]/g, ' ').split(/\s+/).filter(Boolean);

export const shuffle = arr => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
export const sample = (arr, n) => shuffle(arr).slice(0, n);
export const pick = arr => arr[Math.floor(Math.random() * arr.length)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
