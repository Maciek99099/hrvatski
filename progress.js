// XP, poziomy, seria, opanowanie słów, SM-2, odznaki.
import { state, save, today, dayKey, addDays } from './store.js';
import { wordById, learnedWords, lessonById, districts, isDone } from './content.js';

// ── poziomy gracza ──
export const levelFloor = n => 30 * n * (n - 1); // XP potrzebne do osiągnięcia poziomu n (n≥1)
export function level(xp = state.xp) {
  let n = 1; while (xp >= levelFloor(n + 1)) n++;
  const lo = levelFloor(n), hi = levelFloor(n + 1);
  return { n, lo, hi, frac: (xp - lo) / (hi - lo) };
}

export function addXP(n) {
  state.xp += n;
  today().xp += n;
  touchStreak();
  save();
}

export function addTime(sec) {
  if (sec > 0) today().sec += Math.min(sec, 3600);
  save();
}

function touchStreak() {
  const k = dayKey(), s = state.streak;
  if (s.last === k) return;
  s.count = s.last === addDays(k, -1) ? s.count + 1 : 1;
  s.last = k;
  s.best = Math.max(s.best, s.count);
}
export function streakAlive() {
  const s = state.streak, k = dayKey();
  return s.last === k || s.last === addDays(k, -1) ? s.count : 0;
}

// ── opanowanie słów ──
// s: 0..6 (siła). Poziomy: new / learning / known / mastered
export function mastery(id) {
  const w = state.words[id];
  if (!w || !w.seen) return 'new';
  if (w.s >= 4.5) return 'mastered';
  if (w.s >= 2) return 'known';
  return 'learning';
}
export const MASTERY = ['new', 'learning', 'known', 'mastered'];

function wrec(id) {
  return state.words[id] || (state.words[id] = { s: 0, seen: 0, ok: 0, bad: 0, last: 0, srs: null });
}

export function recordWord(id, ok, weight = 1) {
  if (!wordById[id]) return;
  const w = wrec(id);
  w.seen++; w.last = Date.now();
  if (ok) { w.ok++; w.s = Math.min(6, w.s + 0.5 * weight); }
  else { w.bad++; w.s = Math.max(0, w.s - 1); }
}

export function recordTag(tag, ok) {
  if (!tag) return;
  const t = state.tags[tag] || (state.tags[tag] = { ok: 0, bad: 0 });
  ok ? t.ok++ : t.bad++;
  if (ok && ['akuzativ', 'genitiv', 'lokativ', 'dativ', 'instrumental', 'cases'].includes(tag)) state.counters.cases++;
}

// ── SM-2 ──
export function srsAdd(ids) {
  const k = dayKey();
  for (const id of ids) {
    const w = wrec(id);
    if (!w.srs) w.srs = { ef: 2.5, int: 0, reps: 0, due: k };
  }
  save();
}

// q: 0 = nie wiem, 3 = trudne, 4 = dobrze, 5 = łatwe
export function srsReview(id, q) {
  const w = wrec(id);
  const r = w.srs || (w.srs = { ef: 2.5, int: 0, reps: 0, due: dayKey() });
  if (q < 3) { r.reps = 0; r.int = 0; }
  else {
    r.reps++;
    r.int = r.reps === 1 ? 1 : r.reps === 2 ? (q === 5 ? 4 : 3) : Math.round(r.int * r.ef * (q === 3 ? 0.8 : 1));
  }
  r.ef = Math.max(1.3, r.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  r.due = addDays(dayKey(), r.int);
  recordWord(id, q >= 3, q === 5 ? 1.5 : q === 3 ? 0.5 : 1);
  state.counters.cards++;
  save();
}

export function dueWords() {
  const k = dayKey();
  return learnedWords().filter(w => state.words[w.id]?.srs && state.words[w.id].srs.due <= k);
}

export function weakestWords(n = 12) {
  return learnedWords()
    .map(w => ({ w, r: state.words[w.id] }))
    .filter(x => x.r?.seen)
    .sort((a, b) => (a.r.s - a.r.bad * 0.3) - (b.r.s - b.r.bad * 0.3))
    .slice(0, n).map(x => x.w);
}

// ── ukończenie lekcji ──
export function finishLesson(lesson, accuracy, seconds) {
  const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : 1;
  const p = state.lessons[lesson.id] || (state.lessons[lesson.id] = { stars: 0, best: 0, done: 0 });
  const firstTime = !p.done;
  p.done++; p.started = false;
  p.stars = Math.max(p.stars, stars);
  p.best = Math.max(p.best, Math.round(accuracy * 100));
  p.last = Date.now();
  state.counters.lessons++;
  if (stars === 3) state.counters.perfect++;
  today().lessons++;
  const bonus = (lesson.boss ? 20 : 5) + (stars === 3 ? 5 : 0);
  addXP(bonus);
  addTime(seconds);
  srsAdd((lesson.words || []).map(w => w.id));
  save();
  return { stars, bonus, firstTime };
}

// ── odznaki ──
const cnt = () => learnedWords().length;
const distDone = i => { const d = districts[i]; return d?.lessons.length && isDone(d.lessons[d.lessons.length - 1].id); };
export const BADGES = [
  { id: 'first', ico: '👣', test: () => state.counters.lessons >= 1, pl: ['Pierwsze kroki', 'Ukończ pierwszą lekcję'], en: ['First steps', 'Finish your first lesson'] },
  { id: 'arrived', ico: '🚉', test: () => distDone(0), pl: ['Witaj w Zagrzebiu', 'Pokonaj bossa dworca'], en: ['Welcome to Zagreb', 'Beat the station boss'] },
  { id: 'coffee', ico: '☕', test: () => isDone('d3l1'), pl: ['Pierwsza kawa w Zagrzebiu', 'Ukończ pierwszą lekcję w kawiarni'], en: ['First coffee in Zagreb', 'Finish the first café lesson'] },
  { id: 'dolac', ico: '🍅', test: () => distDone(3), pl: ['Król Dolca', 'Ukończ dzielnicę targu'], en: ['King of Dolac', 'Finish the market district'] },
  { id: 'w50', ico: '📗', test: () => cnt() >= 50, pl: ['50 słów', 'Poznaj 50 słów'], en: ['50 words', 'Learn 50 words'] },
  { id: 'w100', ico: '📘', test: () => cnt() >= 100, pl: ['100 słów', 'Poznaj 100 słów'], en: ['100 words', 'Learn 100 words'] },
  { id: 'w250', ico: '📙', test: () => cnt() >= 250, pl: ['250 słów', 'Poznaj 250 słów'], en: ['250 words', 'Learn 250 words'] },
  { id: 'w500', ico: '📚', test: () => cnt() >= 500, pl: ['500 słów', 'Poznaj 500 słów'], en: ['500 words', 'Learn 500 words'] },
  { id: 'w800', ico: '🏛️', test: () => cnt() >= 800, pl: ['Poliglota', 'Poznaj 800 słów'], en: ['Polyglot', 'Learn 800 words'] },
  { id: 's3', ico: '🔥', test: () => state.streak.best >= 3, pl: ['3 dni z rzędu', 'Ucz się 3 dni pod rząd'], en: ['3-day streak', 'Study 3 days in a row'] },
  { id: 's7', ico: '🔥', test: () => state.streak.best >= 7, pl: ['7 dni z rzędu', 'Ucz się 7 dni pod rząd'], en: ['7-day streak', 'Study 7 days in a row'] },
  { id: 's30', ico: '🌋', test: () => state.streak.best >= 30, pl: ['30 dni z rzędu', 'Ucz się 30 dni pod rząd'], en: ['30-day streak', 'Study 30 days in a row'] },
  { id: 'perfect', ico: '⭐', test: () => state.counters.perfect >= 1, pl: ['Perfekcjonista', 'Zdobądź 3 gwiazdki w lekcji'], en: ['Perfectionist', 'Get 3 stars in a lesson'] },
  { id: 'perfect10', ico: '🌟', test: () => state.counters.perfect >= 10, pl: ['Gwiazda Zagrzebia', '3 gwiazdki w 10 lekcjach'], en: ['Star of Zagreb', '3 stars in 10 lessons'] },
  { id: 'cards50', ico: '🃏', test: () => state.counters.cards >= 50, pl: ['Fiszkomaniak', 'Powtórz 50 fiszek'], en: ['Flashcard fan', 'Review 50 flashcards'] },
  { id: 'cards500', ico: '🗂️', test: () => state.counters.cards >= 500, pl: ['Pamięć słonia', 'Powtórz 500 fiszek'], en: ['Elephant memory', 'Review 500 flashcards'] },
  { id: 'cases', ico: '🎓', test: () => state.counters.cases >= 50, pl: ['Mistrz przypadków', '50 poprawnych zadań z przypadków'], en: ['Master of cases', '50 correct case exercises'] },
  { id: 'gamer', ico: '🎮', test: () => (state.counters.games || 0) >= 10, pl: ['Gracz', 'Zagraj 10 mini-gier'], en: ['Gamer', 'Play 10 mini-games'] },
  { id: 'xp1000', ico: '💎', test: () => state.xp >= 1000, pl: ['1000 XP', 'Zdobądź 1000 XP'], en: ['1000 XP', 'Earn 1000 XP'] },
  { id: 'sea', ico: '🌊', test: () => distDone(11), pl: ['Nad Adriatyk!', 'Zdaj wielki egzamin końcowy'], en: ['To the Adriatic!', 'Pass the final exam'] },
];

export function checkBadges() {
  const fresh = [];
  for (const b of BADGES) {
    if (!state.badges[b.id] && b.test()) { state.badges[b.id] = Date.now(); fresh.push(b); }
  }
  if (fresh.length) save();
  return fresh;
}

export { lessonById };
