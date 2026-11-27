// Pixel-art: sprite'y z map znaków, czcionka 3×5 do szyldów, pikselizacja emoji, portrety NPC.

// ── czcionka 3×5 (szyldy na budynkach) ──
const F = {
  A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111', F: '111100110100100',
  G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010', K: '101101110101101', L: '100100100100111',
  M: '101111111101101', N: '110101101101101', O: '010101101101010', P: '110101110100100', R: '110101110101101', S: '011100010001110',
  T: '111010010010010', U: '101101101101111', V: '101101101101010', Z: '111001010100111', Y: '101101010010010', W: '101101111111101',
  Đ: '110101111101110', 0: '111101101101111', 1: '010110010010111', 2: '110001010100111', 3: '110001010001110', 4: '101101111001001',
  5: '111100110001110', 6: '011100110101010', 7: '111001010010010', 8: '010101010101010', 9: '010101011001110', ' ': '000000000000000', '-': '000000111000000', '.': '000000000000010',
};
const ACC = { Č: ['C', 'caron'], Ć: ['C', 'acute'], Š: ['S', 'caron'], Ž: ['Z', 'caron'] };

export function textWidth(s) { return [...s].length * 4 - 1; }
export function pixText(g, s, x, y, color) {
  g.fillStyle = color;
  [...s.toUpperCase()].forEach((ch, i) => {
    const acc = ACC[ch]; const base = acc ? acc[0] : ch;
    const gl = F[base] || F[' '];
    const ox = x + i * 4;
    for (let k = 0; k < 15; k++) if (gl[k] === '1') g.fillRect(ox + (k % 3), y + ((k / 3) | 0), 1, 1);
    if (acc?.[1] === 'caron') { g.fillRect(ox, y - 2, 1, 1); g.fillRect(ox + 2, y - 2, 1, 1); g.fillRect(ox + 1, y - 1, 1, 1); }
    if (acc?.[1] === 'acute') { g.fillRect(ox + 2, y - 2, 1, 1); g.fillRect(ox + 1, y - 1, 1, 1); }
  });
}

// ── sprite'y z map znaków ──
export function drawSprite(g, rows, pal, x, y, flip = false) {
  const w = rows[0].length;
  rows.forEach((r, j) => {
    for (let i = 0; i < w; i++) {
      const c = r[flip ? w - 1 - i : i];
      if (c === '.' || !pal[c]) continue;
      g.fillStyle = pal[c]; g.fillRect(x + i, y + j, 1, 1);
    }
  });
}

export function spriteCanvas(rows, pal, flip = false) {
  const c = document.createElement('canvas');
  c.width = rows[0].length; c.height = rows.length;
  drawSprite(c.getContext('2d'), rows, pal, 0, 0, flip);
  return c;
}

// Kiki – kuna, sprite 18×20, dwie klatki chodu
export const KIKI_PAL = { k: '#2b1a10', b: '#a0602c', d: '#6b3d1c', c: '#f4c97a', r: '#d7262f', w: '#ffffff', n: '#1a0f08', p: '#f08a6b', t: '#7a4420', T: '#3f220d' };
// Kiki w okularach przeciwsłonecznych
const KIKI_BASE = [
  '...kk.....kk......',
  '..kbck...kcbk.....',
  '..kbbkkkkkbbk.....',
  '.kbbbbbbbbbbbk....',
  'kgggggggggggggk...',
  '.kgsgggbbgsgggk...',
  '.kpgggbccbgggpk...',
  '..kbbccnnccbbk....',
  '...kkccccccbk..kk.',
  '...krwrwrwrwk.kttk',
  '..kbrcccccbbk.kttk',
  '..kbkcccccbkbkttk.',
  '.kbbkcccccbkbktk..',
  '.kdk.kcccbbkkttk..',
  '..k.kbcccbbbttk...',
  '....kbbbbbbbkk....',
  '....kbbbbbbbk.....',
];
KIKI_PAL.g = '#10141b'; KIKI_PAL.s = '#9fd8ff';
const LEGS_A = ['....kdk..kdk......', '....kdk..kdk......', '...kddk..kddk.....'];
const LEGS_B = ['....kdk...kdk.....', '...kdk....kdk.....', '...kdk....kddk....'];
export const KIKI_FRAMES = [[...KIKI_BASE, ...LEGS_A], [...KIKI_BASE, ...LEGS_B]];

let kikiURL = null;
export function kikiImg(scale = 4) {
  kikiURL ||= spriteCanvas(KIKI_FRAMES[0], KIKI_PAL).toDataURL();
  return `<img class="pix kiki" src="${kikiURL}" width="${18 * scale}" height="${20 * scale}" alt="">`;
}

// ── pikselizowane emoji (spójny styl ikon) ──
const emojiCache = new Map(), emojiCanv = new Map();
export function emojiCanvas(e, res = 18) {
  const key = e + res;
  if (!emojiCanv.has(key)) { pixEmoji(e, res); }
  return emojiCanv.get(key);
}
export function pixEmoji(e, res = 18) {
  const key = e + res;
  if (emojiCache.has(key)) return emojiCache.get(key);
  const c = document.createElement('canvas'); c.width = c.height = res;
  emojiCanv.set(key, c);
  const g = c.getContext('2d');
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `${res * 0.86}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
  g.fillText(e, res / 2, res / 2 + res * 0.06);
  // twarde krawędzie + lekka redukcja kolorów
  const im = g.getImageData(0, 0, res, res), d = im.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 110) { d[i + 3] = 0; continue; }
    d[i + 3] = 255;
    for (let k = 0; k < 3; k++) d[i + k] = Math.round(d[i + k] / 32) * 32;
  }
  // obrys 1 px
  const out = g.createImageData(res, res), o = out.data;
  const A = (x, y) => (x < 0 || y < 0 || x >= res || y >= res ? 0 : d[(y * res + x) * 4 + 3]);
  for (let y = 0; y < res; y++) for (let x = 0; x < res; x++) {
    const i = (y * res + x) * 4;
    if (d[i + 3]) { o[i] = d[i]; o[i + 1] = d[i + 1]; o[i + 2] = d[i + 2]; o[i + 3] = 255; }
    else if (A(x - 1, y) || A(x + 1, y) || A(x, y - 1) || A(x, y + 1)) { o[i] = 34; o[i + 1] = 30; o[i + 2] = 40; o[i + 3] = 255; }
  }
  g.putImageData(out, 0, 0);
  const url = c.toDataURL();
  emojiCache.set(key, url);
  return url;
}
export const pix = (e, size = 32, cls = '') => (e ? `<span class="emo ${cls}" style="font-size:${Math.round(size * 0.82)}px" aria-hidden="true">${e}</span>` : '');

// ── portrety NPC (12×12, zależne od imienia) ──
const SKIN = ['#f5d0b0', '#e8b98f', '#d19a6e', '#a8704a'];
const HAIR = ['#2b1a10', '#5a3216', '#a0602c', '#e0c060', '#1c1c24', '#8a8a8a', '#b8452f'];
const SHIRT = ['#1593d6', '#d7262f', '#3aa655', '#7a5cc9', '#e39b2d', '#2c4f8a', '#16a085'];
const FEM = /a$|ica$|ija$/i;
export function portrait(name) {
  let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const c = ['#d0694f', '#3d8bad', '#7cbf6e', '#b98bd6', '#e6b85c'][h % 5];
  return `<span class="av" style="background:${c}">${name[0].toUpperCase()}</span>`;
}
