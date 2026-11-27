// Generator zadań: z danych lekcji (słowa, zdania, luki, dialog) buduje 15–25 mieszanych ćwiczeń
// o rosnącej trudności. Wplata słowa z wcześniejszych lekcji.
import { state } from './store.js';
import { lessons, wordById, learnedWords, asArr, first, wordsInText, isDone } from './content.js';
import { shuffle, sample, pick, tiles, norm } from './text.js';
import { weakestWords } from './progress.js';

const lang = () => state.settings.lang;
const l1 = obj => asArr(obj?.[lang()]);
const PIC_POS = new Set(['noun', 'num']);
const hasPic = w => !!w.ico && (PIC_POS.has(w.pos) || w.pic);

// ── dystraktory ──
function overlap(a, b) {
  const A = new Set(asArr(a[lang()]).map(norm));
  return asArr(b[lang()]).some(x => A.has(norm(x))) || norm(a.hr) === norm(b.hr);
}
function distractorWords(target, pool, n = 3, needPic = false) {
  const cands = pool.filter(w => w.id !== target.id && !overlap(target, w) && (!needPic || (w.ico && w.ico !== target.ico)));
  const same = shuffle(cands.filter(w => w.pos === target.pos));
  const rest = shuffle(cands.filter(w => w.pos !== target.pos));
  return [...same, ...rest].slice(0, n);
}

function wordPool(lesson) {
  const own = (lesson.words || []).map(w => wordById[w.id]);
  const prev = learnedWords().filter(w => w.lesson !== lesson.id);
  // przy pierwszej lekcji brak poprzednich – dociągamy słowa z lekcji tej samej dzielnicy / kolejnych
  const extra = prev.length < 12 ? Object.values(wordById).filter(w => w.lesson !== lesson.id).slice(0, 24) : [];
  return [...own, ...prev, ...extra];
}

function sentencePool(lesson) {
  const own = lesson.sentences || [];
  const prev = lessons.filter(l => l.index < lesson.index && isDone(l.id)).flatMap(l => l.sentences || []);
  return { own, prev, all: [...own, ...prev] };
}

const wordIdsIn = hr => wordsInText(first(asArr(hr))).map(w => w.id);

// ── pojedyncze typy ──
const mk = {
  pickImg: (w, pool) => ({ type: 'pick-img', word: w, options: shuffle([w, ...distractorWords(w, pool, 3, true)]), words: [w.id], tag: 'vocab' }),
  pickWord: (w, pool) => ({ type: 'pick-word', word: w, options: shuffle([w, ...distractorWords(w, pool, 3)]), words: [w.id], tag: 'vocab' }),
  choose: (w, pool, dir = 'hr2l1') => ({ type: 'choose', dir, word: w, options: shuffle([w, ...distractorWords(w, pool, 3)]), words: [w.id], tag: 'vocab' }),
  match: ws => ({ type: 'match', pairs: ws.slice(0, 5), words: ws.map(w => w.id), tag: 'vocab' }),
  listenPick: (s, pool) => {
    const hr = first(asArr(s.hr));
    const others = shuffle(pool.filter(x => norm(first(asArr(x.hr))) !== norm(hr))).slice(0, 3).map(x => first(asArr(x.hr)));
    return { type: 'listen-pick', text: hr, options: shuffle([hr, ...others]), words: wordIdsIn(hr), tag: 'listening' };
  },
  listenPickWord: (w, pool) => {
    const others = distractorWords(w, pool, 3).map(x => x.hr);
    return { type: 'listen-pick', text: w.hr, options: shuffle([w.hr, ...others]), words: [w.id], tag: 'listening' };
  },
  listenType: s => ({ type: 'listen-type', text: first(asArr(s.hr)), accepted: asArr(s.hr), words: wordIdsIn(s.hr), tag: 'listening', why: s.why }),
  tiles: (s, pool, dir) => {
    const target = dir === 'hr2l1' ? l1(s) : asArr(s.hr);
    const correct = tiles(target[0]);
    const lower = new Set(correct.map(x => norm(x)));
    const others = pool.filter(x => x !== s).flatMap(x => tiles(dir === 'hr2l1' ? first(l1(x)) : first(asArr(x.hr))));
    const extra = shuffle([...new Set(others.filter(t => !lower.has(norm(t))))]).slice(0, Math.min(4, Math.max(2, 7 - correct.length)));
    return { type: 'tiles', dir, s, accepted: target, bank: shuffle([...correct, ...extra]), words: wordIdsIn(s.hr), tag: 'translation', why: s.why };
  },
  order: s => {
    const hr = first(asArr(s.hr));
    const t = tiles(hr);
    let bank = shuffle(t);
    for (let i = 0; i < 5 && bank.join(' ') === t.join(' '); i++) bank = shuffle(t);
    return { type: 'order', s, accepted: asArr(s.hr), bank, words: wordIdsIn(hr), tag: 'syntax', why: s.why };
  },
  type: (s, dir) => ({ type: 'type', dir, s, accepted: dir === 'l12hr' ? asArr(s.hr) : l1(s), words: wordIdsIn(s.hr), tag: 'writing', why: s.why }),
  typeWord: (w, dir = 'l12hr') => ({ type: 'type-word', dir, word: w, accepted: dir === 'l12hr' ? [w.hr.replace(/[?…]/g, '')] : l1(w), words: [w.id], tag: 'writing' }),
  cloze: (c, lesson) => ({ type: 'cloze', c, words: wordIdsIn(c.hr.replace('___', c.answer)), tag: c.tag || lesson.tags?.[0] || 'grammar' }),
  reply: (r, lesson) => ({ type: 'reply', r, options: shuffle([r.ok, ...r.bad]), words: wordIdsIn(r.ok), tag: 'dialog' }),
  tf: (item, lesson) => ({ type: 'tf', item, lines: lesson.dialog?.lines || [], words: [], tag: 'reading' }),
  speak: s => ({ type: 'speak', s, words: wordIdsIn(s.hr), tag: 'speaking', ungraded: true }),
};

const fill = (arr, n, fn) => arr.slice(0, n).map(fn);

// ── lekcja zwykła ──
export function buildLesson(lesson) {
  const W = (lesson.words || []).map(w => wordById[w.id]);
  const pool = wordPool(lesson);
  const { own: S, all: SA } = sentencePool(lesson);
  const C = shuffle(lesson.cloze || []), R = shuffle(lesson.replies || []), TF = shuffle(lesson.tf || []);
  const listen = state.settings.listening !== false;
  const pics = W.filter(hasPic), nopics = W.filter(w => !hasPic(w));
  const ws = shuffle(W);
  const ss = shuffle(S);
  const review = shuffle(weakestWords(8).filter(w => w.lesson !== lesson.id)).slice(0, 2);

  const A = []; // łatwe
  // rozpoznawanie: obrazki lub wybór tłumaczenia dla pierwszych słów
  ws.slice(0, 3).forEach(w => A.push(hasPic(w) ? mk.pickImg(w, pool) : mk.choose(w, pool, 'hr2l1')));
  A.push(mk.match(ws.slice(0, 5)));
  ws.slice(3, 5).forEach(w => A.push(hasPic(w) && Math.random() < 0.5 ? mk.pickWord(w, pool) : mk.choose(w, pool, 'l12hr')));
  if (listen && ws[5]) A.push(mk.listenPickWord(ws[5], pool));
  else if (ws[5]) A.push(mk.choose(ws[5], pool, 'hr2l1'));
  if (ws.length > 5) A.push(mk.match(ws.slice(5, 10)));
  if (ws.length > 10) A.push(mk.match(ws.slice(-5)));

  const B = []; // średnie
  fill(C, 2, c => mk.cloze(c, lesson)).forEach(x => B.push(x));
  fill(ss, 2, s => mk.tiles(s, SA, 'hr2l1')).forEach(x => B.push(x));
  fill(R, 2, r => mk.reply(r, lesson)).forEach(x => B.push(x));
  review.forEach(w => B.push(hasPic(w) ? mk.pickImg(w, pool) : mk.choose(w, pool, 'l12hr')));
  if (listen && ss[2]) B.push(mk.listenPick(ss[2], SA));

  const Cc = []; // trudne
  fill(ss.slice(2), 2, s => mk.tiles(s, SA, 'l12hr')).forEach(x => Cc.push(x));
  const ord = ss.find(s => tiles(first(asArr(s.hr))).length >= 3);
  if (ord) Cc.push(mk.order(ord));
  if (C[2]) Cc.push(mk.cloze(C[2], lesson));
  if (TF[0]) Cc.push(mk.tf(TF[0], lesson));
  if (listen && ss[4]) Cc.push(mk.listenType(ss[4]));
  const typeW = nopics[0] || ws[ws.length - 1];
  if (typeW) Cc.push(mk.typeWord(typeW, 'l12hr'));
  if (ss[5] || ss[0]) Cc.push(mk.type(ss[5] || ss[0], 'l12hr'));
  if (ss[1]) Cc.push(mk.type(ss[1], 'hr2l1'));
  if (state.settings.speaking && ss[0]) Cc.push(mk.speak(ss[0]));

  // lekkie wymieszanie wewnątrz grup – trudność dalej rośnie
  const out = [...shuffleSoft(A), ...shuffleSoft(B), ...shuffleSoft(Cc)];
  return out.slice(0, 25);
}

// ── boss: rozgrzewka z całej dzielnicy + historia ──
export function buildBoss(lesson) {
  const d = lesson.district;
  const parts = d.lessons.filter(l => !l.boss);
  const pool = [...parts.flatMap(l => l.words.map(w => wordById[w.id])), ...(lesson.words || []).map(w => wordById[w.id])];
  const SA = parts.flatMap(l => l.sentences || []);
  const out = [];
  for (const l of parts) {
    const s = shuffle(l.sentences || []);
    if (l.cloze?.length) out.push(mk.cloze(pick(l.cloze), l));
    if (s[0]) out.push(mk.tiles(s[0], SA, 'l12hr'));
    if (s[1]) out.push(Math.random() < 0.5 ? mk.type(s[1], 'l12hr') : (state.settings.listening !== false ? mk.listenType(s[1]) : mk.order(s[1])));
  }
  out.push(mk.match(sample(pool, 5)));
  const warm = shuffle(out).slice(0, 10);
  const story = (lesson.story || []).map(st => st.narr
    ? { type: 'story-narr', st, ungraded: true, words: [] }
    : st.options ? { type: 'story', st, options: st.options.map((o, i) => ({ o, ok: i === st.answer })), words: wordIdsIn(st.options[st.answer]), tag: 'dialog' }
      : { type: 'story-line', st, ungraded: true, words: [] });
  return [...warm, { type: 'story-start', ungraded: true, words: [] }, ...story];
}

// ── trening słabych punktów ──
export function buildWeak() {
  const weak = weakestWords(10);
  if (weak.length < 4) return [];
  const pool = learnedWords();
  const lessonsUsed = [...new Set(weak.map(w => w.lesson))].map(id => lessons.find(l => l.id === id));
  const SA = lessonsUsed.flatMap(l => l.sentences || []);
  const weakIds = new Set(weak.map(w => w.id));
  const sents = shuffle(SA.filter(s => wordIdsIn(s.hr).some(id => weakIds.has(id))));
  // słabe tagi gramatyczne
  const tagScore = t => { const r = state.tags[t]; return r ? r.bad / (r.ok + r.bad + 1) : 0; };
  const clozes = shuffle(lessonsUsed.flatMap(l => (l.cloze || []).map(c => ({ c, l })))).sort((a, b) => tagScore(b.l.tags?.[0]) - tagScore(a.l.tags?.[0]));
  const out = [];
  weak.slice(0, 4).forEach(w => out.push(hasPic(w) ? mk.pickImg(w, pool) : mk.choose(w, pool, 'hr2l1')));
  out.push(mk.match(weak.slice(0, 5)));
  weak.slice(4, 7).forEach(w => out.push(mk.choose(w, pool, 'l12hr')));
  clozes.slice(0, 3).forEach(({ c, l }) => out.push(mk.cloze(c, l)));
  sents.slice(0, 2).forEach(s => out.push(mk.tiles(s, SA, 'l12hr')));
  if (sents[2]) out.push(mk.type(sents[2], 'l12hr'));
  weak.slice(7, 9).forEach(w => out.push(mk.typeWord(w, 'l12hr')));
  if (weak.length > 6) out.push(mk.match(weak.slice(5, 10)));
  return out;
}

// powtórka lekcji ukończonej → te same zasady, ale bez rozgrzewki z obrazkami (trudniej)
export function buildFor(lesson, mode) {
  if (lesson.boss) return buildBoss(lesson);
  const ex = buildLesson(lesson);
  if (mode === 'replay') return ex.filter((x, i) => !(i < 2 && x.type === 'pick-img'));
  return ex;
}

function shuffleSoft(arr) {
  // zamienia sąsiadów losowo – zachowuje ogólną kolejność trudności
  const a = arr.slice();
  for (let i = 0; i < a.length - 1; i++) if (Math.random() < 0.45) [a[i], a[i + 1]] = [a[i + 1], a[i]];
  // nie dwa „match” pod rząd
  for (let i = 1; i < a.length; i++) if (a[i].type === a[i - 1].type && a[i].type === 'match' && a[i + 1]) [a[i], a[i + 1]] = [a[i + 1], a[i]];
  return a;
}
