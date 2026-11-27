// Service worker: pełne cache'owanie → aplikacja działa offline po pierwszym uruchomieniu.
// Lista plików i wersja generowane przez: node tools/build-sw.mjs
const VERSION = '202611271242';
const CACHE = 'hrvatski-' + VERSION;
const ASSETS = [
  "./",
  "./css/app.css",
  "./fonts/nunito-latin-600-normal.woff2",
  "./fonts/nunito-latin-800-normal.woff2",
  "./fonts/nunito-latin-900-normal.woff2",
  "./fonts/nunito-latin-ext-600-normal.woff2",
  "./fonts/nunito-latin-ext-800-normal.woff2",
  "./fonts/nunito-latin-ext-900-normal.woff2",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./index.html",
  "./js/app.js",
  "./js/art.js",
  "./js/cards.js",
  "./js/content.js",
  "./js/data/curriculum.js",
  "./js/data/d01.js",
  "./js/data/d02.js",
  "./js/data/d03.js",
  "./js/data/d04.js",
  "./js/engine.js",
  "./js/fx.js",
  "./js/games.js",
  "./js/i18n.js",
  "./js/layout.js",
  "./js/lesson.js",
  "./js/map.js",
  "./js/pixel.js",
  "./js/progress.js",
  "./js/settings.js",
  "./js/speech.js",
  "./js/stats.js",
  "./js/store.js",
  "./js/text.js",
  "./js/ui.js",
  "./js/words.js",
  "./manifest.webmanifest"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('hrvatski-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// cache-first; nowe pliki (np. ekrany startowe) dopisywane do cache przy pierwszym pobraniu
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))
  );
});
