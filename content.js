// Rejestr treści: łączy metadane dzielnic z plikami lekcji, buduje indeks słów.
import { DISTRICTS_META, DISTRICT_FILES } from './data/curriculum.js';
import { state } from './store.js';
import { norm } from './text.js';

export const districts = [];
export const lessons = [];
export const lessonById = {};
export const wordById = {};

for (const meta of DISTRICTS_META) {
  const file = DISTRICT_FILES.find(f => f.id === meta.id);
  const d = { ...meta, lessons: file ? file.lessons : [], ready: !!file };
  d.index = districts.length;
  districts.push(d);
  d.lessons.forEach((l, i) => {
    l.district = d;
    l.index = lessons.length;
    l.num = i + 1;
    lessons.push(l);
    lessonById[l.id] = l;
    for (const w of l.words || []) {
      const id = w.id || norm(w.hr);
      w.id = id;
      if (!wordById[id]) wordById[id] = { ...w, lesson: l.id, district: d.id };
    }
  });
}

export const asArr = v => (Array.isArray(v) ? v : v == null ? [] : [v]);
export const first = v => asArr(v)[0];

export function isDone(id) { return !!state.lessons[id]?.done; }

// Wymagania lekcji:
//  • pierwsza lekcja dzielnicy → boss poprzedniej dzielnicy,
//  • boss → WSZYSTKIE pozostałe lekcje dzielnicy (także boczne odnogi),
//  • `after: [...]` → wystarczy JEDNA z wymienionych (rozwidlenie: obie odnogi mają to samo `after`),
//  • domyślnie → poprzednia lekcja.
export function prereq(lesson) {
  const d = lesson.district;
  if (lesson.index === 0) return { any: [] };
  if (lesson.num === 1) {
    const prev = districts[d.index - 1];
    return { all: prev?.lessons.length ? [prev.lessons[prev.lessons.length - 1].id] : ['__never'] };
  }
  if (lesson.boss) return { all: d.lessons.filter(x => !x.boss).map(x => x.id) };
  if (lesson.after) return { any: lesson.after };
  return { any: [d.lessons[lesson.num - 2].id] };
}

export function isUnlocked(lesson) {
  const p = prereq(lesson);
  if (p.all) return p.all.every(isDone);
  return !p.any.length || p.any.some(isDone);
}

export function missingFor(lesson) {
  const p = prereq(lesson);
  return (p.all || p.any).filter(id => !isDone(id)).map(id => lessonById[id]).filter(Boolean);
}

// Poziomy mapy: lekcje o identycznym `after` tworzą rozwidlenie (2 odnogi na jednym poziomie).
export function levelsOf(d) {
  const out = [];
  d.lessons.forEach(l => {
    const last = out[out.length - 1];
    const key = l.after ? l.after.join(',') : null;
    if (key && last && last.key === key) last.lessons.push(l);
    else out.push({ key, lessons: [l] });
  });
  return out;
}

export function lessonStatus(lesson) {
  const p = state.lessons[lesson.id];
  if (p?.done) return 'done';
  if (!isUnlocked(lesson)) return 'locked';
  if (p?.started) return 'progress';
  return 'open';
}

export function currentLesson() {
  return lessons.find(l => !isDone(l.id) && isUnlocked(l)) || lessons[lessons.length - 1];
}

export function isDistrictUnlocked(d) {
  return d.lessons.length > 0 && isUnlocked(d.lessons[0]);
}

// Słowa z ukończonych lekcji („poznane”).
export function learnedWords() {
  return Object.values(wordById).filter(w => isDone(w.lesson));
}

// Wszystkie zdania z ukończonych lekcji (do gier, powtórek).
export function learnedSentences() {
  return lessons.filter(l => isDone(l.id)).flatMap(l => (l.sentences || []).map(s => ({ ...s, lesson: l.id })));
}

// Słowa, których forma (bez diakrytyków, małe litery) występuje w tekście HR – do glosariusza i śledzenia opanowania.
const phraseIndex = () => Object.values(wordById)
  .map(w => ({ w, key: norm(w.hr).replace(/[…?.!,]/g, '').trim() }))
  .filter(x => x.key)
  .sort((a, b) => b.key.length - a.key.length);
let _pi = null;
export function wordsInText(hr) {
  _pi ||= phraseIndex();
  let t = ' ' + norm(hr).replace(/[^\p{L}\p{N} ]/gu, ' ').replace(/\s+/g, ' ') + ' ';
  const found = [];
  for (const { w, key } of _pi) {
    const k = ' ' + key + ' ';
    if (t.includes(k)) { found.push(w); t = t.replace(k, ' | '); }
  }
  return found;
}
