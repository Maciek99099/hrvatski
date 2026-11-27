// Ilustracje SVG: maskotka (kuna Kiki), miejsca na mapie, dekoracje.

const CHECK = (id, s = 4) => `<pattern id="${id}" width="${s * 2}" height="${s * 2}" patternUnits="userSpaceOnUse"><rect width="${s * 2}" height="${s * 2}" fill="#fff"/><rect width="${s}" height="${s}" fill="#d7262f"/><rect x="${s}" y="${s}" width="${s}" height="${s}" fill="#d7262f"/></pattern>`;

let uid = 0;
export function mascot(mood = 'happy', size = 96) {
  const id = 'ck' + (++uid);
  const eyes = mood === 'happy' || mood === 'cheer'
    ? `<path d="M45 43q5-6 10 0M65 43q5-6 10 0" stroke="#2b1a10" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : mood === 'sad'
      ? `<circle cx="50" cy="44" r="3.6" fill="#2b1a10"/><circle cx="70" cy="44" r="3.6" fill="#2b1a10"/><path d="M44 36l10 3M76 36l-10 3" stroke="#6b3d1c" stroke-width="2.5" stroke-linecap="round"/>`
      : `<circle cx="50" cy="43" r="4" fill="#2b1a10"/><circle cx="70" cy="43" r="4" fill="#2b1a10"/><circle cx="51.3" cy="41.6" r="1.3" fill="#fff"/><circle cx="71.3" cy="41.6" r="1.3" fill="#fff"/>`;
  const mouth = mood === 'sad'
    ? `<path d="M55 63q5-4 10 0" stroke="#2b1a10" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
    : mood === 'cheer'
      ? `<path d="M54 59q6 8 12 0z" fill="#8a2b2b"/>`
      : `<path d="M55 60q5 4 10 0" stroke="#2b1a10" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const arms = mood === 'cheer'
    ? `<path d="M36 78q-14-10-12-26" stroke="#8d5128" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M84 78q14-10 12-26" stroke="#8d5128" stroke-width="9" fill="none" stroke-linecap="round"/>`
    : `<path d="M38 80q-8 6-6 14" stroke="#8d5128" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M82 80q8 6 6 14" stroke="#8d5128" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  return `<svg class="mascot ${mood}" width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true"><defs>${CHECK(id, 3)}</defs>
<path d="M74 104q40 6 42-34q1-22-14-34q-8-6-14-2q12 10 12 30q0 24-26 30z" fill="#7a4420"/><path d="M102 36q-8-6-14-2q6 4 9 10q5-2 5-8z" fill="#3f220d"/>
<path d="M38 90q-2-26 22-28q24 2 22 28q-2 22-22 22q-20 0-22-22z" fill="#8d5128"/>
<path d="M48 66q12 6 24 0q4 18-4 30q-8 6-16 0q-8-12-4-30z" fill="#f4c97a"/>
${arms}
<ellipse cx="48" cy="111" rx="9" ry="5" fill="#4f2c12"/><ellipse cx="72" cy="111" rx="9" ry="5" fill="#4f2c12"/>
<path d="M33 34q-2-14 10-14q6 2 6 10z" fill="#8d5128"/><path d="M36 31q0-7 6-7q3 1 3 6z" fill="#f4c97a"/>
<path d="M87 34q2-14-10-14q-6 2-6 10z" fill="#8d5128"/><path d="M84 31q0-7-6-7q-3 1-3 6z" fill="#f4c97a"/>
<path d="M32 46q0-22 28-22q28 0 28 22q0 12-10 18q-8 6-18 7q-10-1-18-7q-10-6-10-18z" fill="#a0602c"/>
<path d="M47 54q13-8 26 0q-2 12-13 15q-11-3-13-15z" fill="#f4c97a"/>
<ellipse cx="60" cy="54" rx="4.8" ry="3.4" fill="#2b1a10"/>
${eyes}${mouth}
<path d="M44 57l-10-2M44 60l-10 2M76 57l10-2M76 60l10 2" stroke="#5a3216" stroke-width="1.2" stroke-linecap="round" opacity=".6"/>
<circle cx="42" cy="51" r="3.5" fill="#f08a6b" opacity=".4"/><circle cx="78" cy="51" r="3.5" fill="#f08a6b" opacity=".4"/>
<rect x="37" y="66" width="46" height="10" rx="5" fill="url(#${id})" stroke="#b51f27" stroke-width="1.5"/>
<path d="M70 74l6 14l-8-2z" fill="url(#${id})" stroke="#b51f27" stroke-width="1.2"/>
</svg>`;
}

// ── budynki i miejsca ──
const win = (x, y, w = 7, h = 9, c = '#cfe9fb') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${c}"/>`;
function house(x, y, w, h, wall, roof = '#e0703a', rows = 2, cols = 3) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}" rx="2"/><path d="M${x - 4} ${y + 1}L${x + w / 2} ${y - h * 0.45}L${x + w + 4} ${y + 1}z" fill="${roof}"/>`;
  const gx = w / (cols + 1), gy = h / (rows + 1);
  for (let r = 1; r <= rows; r++) for (let c = 1; c <= cols; c++) s += win(x + gx * c - 3.5, y + gy * r - 5);
  return s;
}
const tree = (x, y, r = 11) => `<rect x="${x - 2}" y="${y}" width="4" height="${r}" fill="#7a4b26"/><circle cx="${x}" cy="${y - 2}" r="${r}" fill="#3aa655"/><circle cx="${x - r / 2.5}" cy="${y - r / 2}" r="${r / 2}" fill="#52c06c"/>`;
const ground = `<ellipse cx="60" cy="94" rx="56" ry="8" fill="rgba(0,0,0,.08)"/>`;

const SCENES = {
  station: () => `${ground}<rect x="10" y="40" width="100" height="52" rx="3" fill="#f3e3c3"/><path d="M6 42h108l-8-14H14z" fill="#e0703a"/><rect x="50" y="10" width="20" height="22" fill="#f3e3c3"/><circle cx="60" cy="21" r="7" fill="#fff" stroke="#2c4f8a" stroke-width="2"/><path d="M60 21v-4M60 21h3" stroke="#2c4f8a" stroke-width="1.6"/>${[18, 34, 74, 90].map(x => `<path d="M${x} 90v-24a7 7 0 0 1 14 0v24z" fill="#9fd3f5"/>`).join('')}<path d="M50 90v-30a10 10 0 0 1 20 0v30z" fill="#2c4f8a"/>`,
  kiosk: () => `${ground}<rect x="34" y="40" width="52" height="50" rx="4" fill="#1593d6"/><path d="M28 42h64l-6-14H34z" fill="#d7262f"/><rect x="40" y="50" width="40" height="18" rx="2" fill="#cfe9fb"/><rect x="44" y="72" width="10" height="14" fill="#fff"/><rect x="58" y="72" width="10" height="14" fill="#f4b400"/><rect x="72" y="72" width="8" height="14" fill="#3aa655"/>${tree(102, 80, 9)}`,
  info: () => `${ground}<rect x="24" y="44" width="72" height="46" rx="4" fill="#2c4f8a"/><circle cx="60" cy="28" r="16" fill="#1593d6"/><text x="60" y="35" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="system-ui">i</text><rect x="32" y="54" width="56" height="16" rx="2" fill="#cfe9fb"/><rect x="20" y="74" width="80" height="6" fill="#f3e3c3"/>`,
  ticket: () => `${ground}<rect x="18" y="36" width="84" height="54" rx="4" fill="#f3e3c3"/><rect x="18" y="30" width="84" height="12" rx="3" fill="#d7262f"/>${[26, 50, 74].map(x => `<rect x="${x}" y="50" width="20" height="18" rx="2" fill="#cfe9fb"/><rect x="${x}" y="70" width="20" height="4" fill="#a0632b"/>`).join('')}<rect x="44" y="12" width="32" height="14" rx="3" fill="#f4b400" transform="rotate(-8 60 19)"/><path d="M50 15v8M70 12v8" stroke="#fff" stroke-dasharray="2 2"/>`,
  square: () => `${ground}${house(4, 48, 30, 42, '#f7d9b9')}${house(86, 46, 30, 44, '#d9ecf7', '#c2452d')}<rect x="44" y="78" width="32" height="12" rx="2" fill="#bdbdbd"/><path d="M50 78v-12l8-10l10 4l2 18z" fill="#4b5563"/><circle cx="58" cy="50" r="5" fill="#4b5563"/><path d="M60 56l8-10" stroke="#4b5563" stroke-width="3"/>`,
  cafe: () => `${ground}${house(30, 44, 60, 46, '#fbe6c9', '#a0632b', 1, 3)}<path d="M26 66h68l-6 8H32z" fill="#d7262f"/><path d="M32 66h8l-2 8h-8zM48 66h8l-1 8h-8zM64 66h8v8h-8zM80 66h8l2 8h-8z" fill="#fff"/><path d="M10 78q12-14 24 0z" fill="#1593d6"/><rect x="21" y="78" width="2" height="12" fill="#555"/><rect x="14" y="88" width="16" height="3" fill="#555"/><text x="98" y="92" font-size="16">☕</text>`,
  market: () => `${ground}${[8, 40, 72].map((x, i) => `<path d="M${x} 52q20-22 40 0z" fill="#d7262f"/><rect x="${x + 19}" y="52" width="2" height="28" fill="#555"/><rect x="${x + 4}" y="72" width="32" height="18" rx="2" fill="#a0632b"/><circle cx="${x + 12}" cy="72" r="4" fill="${['#e53935', '#43a047', '#fb8c00'][i]}"/><circle cx="${x + 20}" cy="71" r="4" fill="${['#fb8c00', '#e53935', '#43a047'][i]}"/><circle cx="${x + 28}" cy="72" r="4" fill="${['#43a047', '#fdd835', '#e53935'][i]}"/>`).join('')}`,
  bakery: () => `${ground}${house(20, 44, 80, 46, '#fff1d6', '#e39b2d', 1, 2)}<rect x="48" y="66" width="24" height="24" rx="2" fill="#a0632b"/><ellipse cx="60" cy="38" rx="14" ry="7" fill="#e39b2d"/><path d="M52 36l3 4M59 35l2 5M66 36l1 4" stroke="#a0632b" stroke-width="2" stroke-linecap="round"/>`,
  shop: () => `${ground}${house(16, 46, 88, 44, '#e8f4ea', '#3aa655', 1, 3)}<rect x="22" y="66" width="76" height="24" fill="#cfe9fb"/><path d="M16 60h88v6H16z" fill="#3aa655"/>`,
  house: () => `${ground}${house(10, 46, 46, 44, '#f7d9b9')}${house(62, 38, 48, 52, '#e3dcf5', '#7a5cc9', 3, 3)}${tree(56, 84, 7)}`,
  tram: () => `${ground}<rect x="0" y="88" width="120" height="3" fill="#777"/><path d="M0 20h120" stroke="#555" stroke-width="1.5"/><path d="M60 20l-6 16M60 20l6 16" stroke="#555" stroke-width="1.5"/><rect x="12" y="36" width="96" height="48" rx="10" fill="#1f6fd1"/><rect x="12" y="68" width="96" height="6" fill="#fff"/>${[20, 42, 64, 86].map(x => `<rect x="${x}" y="44" width="16" height="18" rx="3" fill="#cfe9fb"/>`).join('')}<circle cx="32" cy="88" r="5" fill="#333"/><circle cx="88" cy="88" r="5" fill="#333"/>`,
  restaurant: () => `${ground}${house(16, 44, 88, 46, '#fbe2d9', '#c2452d', 1, 3)}<rect x="50" y="66" width="20" height="24" fill="#7a3a22"/><circle cx="96" cy="30" r="10" fill="#fff" stroke="#c2452d" stroke-width="2"/><path d="M92 25v10M100 25v10M92 30h8" stroke="#c2452d" stroke-width="2"/>`,
  pharmacy: () => `${ground}${house(16, 44, 88, 46, '#e6f6f1', '#16a085', 1, 3)}<rect x="50" y="66" width="20" height="24" fill="#cfe9fb"/><rect x="48" y="18" width="24" height="24" rx="4" fill="#16a085"/><path d="M60 22v16M52 30h16" stroke="#fff" stroke-width="5"/>`,
  hospital: () => `${ground}${house(10, 34, 100, 56, '#f2f6fb', '#9aa7b8', 3, 5)}<rect x="52" y="12" width="16" height="16" fill="#d7262f"/><path d="M60 14v12M54 20h12" stroke="#fff" stroke-width="4"/>`,
  park: () => `${ground}<ellipse cx="60" cy="84" rx="40" ry="8" fill="#7cc4f0"/>${tree(18, 70, 14)}${tree(98, 66, 16)}${tree(58, 54, 12)}<path d="M38 78q4-6 8 0" stroke="#fff" stroke-width="2" fill="none"/>`,
  church: () => `${ground}<rect x="24" y="48" width="72" height="42" fill="#f3e9d8"/><path d="M20 50L60 22L100 50z" fill="url(#roofck)"/><defs>${CHECK('roofck', 5)}</defs><rect x="78" y="10" width="14" height="40" fill="#f3e9d8"/><path d="M76 12l9-12l9 12z" fill="#2c4f8a"/><path d="M52 90v-18a8 8 0 0 1 16 0v18z" fill="#7a4b26"/>`,
  museum: () => `${ground}<path d="M12 40L60 16L108 40z" fill="#e8dcc7"/><rect x="14" y="40" width="92" height="6" fill="#d8c9ad"/>${[20, 38, 56, 74, 92].map(x => `<rect x="${x}" y="46" width="8" height="38" fill="#f3e9d8"/>`).join('')}<rect x="10" y="84" width="100" height="6" fill="#d8c9ad"/>`,
  hotel: () => `${ground}${house(28, 18, 64, 72, '#e1e8f5', '#2c4f8a', 5, 3)}<rect x="50" y="76" width="20" height="14" fill="#f4b400"/><rect x="40" y="6" width="40" height="10" rx="3" fill="#d7262f"/><text x="60" y="14" text-anchor="middle" font-size="8" font-weight="800" fill="#fff" font-family="system-ui">HOTEL</text>`,
  office: () => `${ground}<rect x="30" y="10" width="60" height="80" fill="#9fb8d9"/>${Array.from({ length: 6 }, (_, r) => [36, 52, 68].map(x => win(x, 16 + r * 12, 12, 8, '#e8f2ff')).join('')).join('')}`,
  sea: () => `<rect x="0" y="50" width="120" height="50" fill="#1593d6"/><path d="M0 60q10-6 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#bfe6fb" stroke-width="3" fill="none"/><circle cx="96" cy="24" r="12" fill="#f4b400"/><path d="M30 50l16-22v22z" fill="#fff"/><path d="M24 50h28l-4 6H28z" fill="#a0632b"/>`,
};
SCENES.cafe2 = SCENES.cafe;

export function scene(key, size = 96) {
  const f = SCENES[key] || SCENES.house;
  return `<svg width="${size}" height="${size * 100 / 120}" viewBox="0 0 120 100" aria-hidden="true">${f()}</svg>`;
}

export const sceneKeys = Object.keys(SCENES);

export function decoTree(size = 34) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 30 34" aria-hidden="true">${tree(15, 20, 10)}</svg>`;
}

export const ICONS = {
  map: '<path d="M9 4L3 6v14l6-2l6 2l6-2V4l-6 2zM9 4v14M15 6v14"/>',
  words: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h6"/>',
  cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  stats: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3a1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8a1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  speaker: '<path d="M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  turtle: '<path d="M4 15c0-4 3.5-7 8-7s8 3 8 7zM20 15h2M6 15l-1 3M18 15l1 3M9 8l1.5 7M15 8l-1.5 7M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  back: '<path d="M15 6l-6 6l6 6"/>',
  book: '<path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  star: '<path d="M12 2l3 7l7 .6l-5.3 4.7L18.2 22L12 18l-6.2 4l1.5-7.7L2 9.6L9 9z"/>',
  play: '<path d="M7 4l13 8l-13 8z"/>',
  games: '<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3M15 12h.01M18 13h.01"/>',
  dumbbell: '<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',
  train: '<rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14M8 19l-2 2M16 19l2 2M9 13h.01M15 13h.01"/>',
  news: '<path d="M4 5h12v14H6a2 2 0 0 1-2-2zM16 9h4v8a2 2 0 0 1-2 2M7 9h6M7 13h6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 0 4 2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 0 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
  building: '<path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-5h6v5M12 9v.01"/>',
  coffee: '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 9h1.5a2.5 2.5 0 0 1 0 5H17M7 3v2M11 3v2M15 3v2"/>',
  basket: '<path d="M3 10h18l-2 10H5zM8 10l4-6 4 6M9 14v3M15 14v3"/>',
  bread: '<path d="M5 11a7 4 0 0 1 14 0v8H5zM9 9l1 3M13 8l1 3"/>',
  home: '<path d="M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6"/>',
  tram: '<rect x="5" y="5" width="14" height="13" rx="3"/><path d="M5 12h14M9 2h6M12 2v3M8 21l1-3M16 21l-1-3"/>',
  fork2: '<path d="M7 3v5a3 3 0 0 0 6 0V3M10 3v18M17 3c-2 2-2 7 0 9v9"/>',
  pill: '<rect x="3" y="9" width="18" height="7" rx="3.5" transform="rotate(-35 12 12.5)"/><path d="M9.5 8.5l5 7"/>',
  tree: '<path d="M12 3a6 6 0 0 1 4 10.5A4 4 0 0 1 13 20h-2a4 4 0 0 1-3-6.5A6 6 0 0 1 12 3zM12 13v8"/>',
  church: '<path d="M12 2v4M10 4h4M7 21V11l5-5 5 5v10M3 21h18M10 21v-4a2 2 0 0 1 4 0v4"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  shop: '<path d="M4 9l1-5h14l1 5M4 9h16v11H4zM4 9a3 3 0 0 0 5 0 3 3 0 0 0 6 0 3 3 0 0 0 5 0M10 20v-5h4v5"/>',
  crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  fire: '<path d="M12 22c4 0 7-3 7-7 0-5-5-7-5-12-3 2-6 5-6 9-1-1-2-2-2-4-1 2-1 4-1 7 0 4 3 7 7 7z"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  fork: '<path d="M6 3v6a6 6 0 0 0 12 0V3M12 15v6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
export const icon = (name, size = 24, cls = '', sw = 2) => `<svg class="ico ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

// ikona miejsca lekcji (scena → ikona liniowa)
const SCENE_ICON = { platform: 'train', station: 'building', kiosk: 'news', info: 'info', ticket: 'ticket', square: 'building', cafe: 'coffee', market: 'basket', bakery: 'bread', shop: 'shop', house: 'home', tram: 'tram', restaurant: 'fork2', pharmacy: 'pill', hospital: 'pill', park: 'tree', church: 'church', museum: 'building', hotel: 'briefcase', office: 'briefcase' };
export const sceneIcon = s => SCENE_ICON[s] || 'building';
