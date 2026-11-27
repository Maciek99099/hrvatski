// Aktualizacje: porównanie wersji z serwerem i wymuszone pobranie świeżych plików.
import { VERSION } from './version.js';

async function serverSW() {
  const txt = await (await fetch('sw.js?t=' + Date.now(), { cache: 'no-store' })).text();
  const v = /const VERSION = '([^']+)'/.exec(txt)?.[1];
  let assets = [];
  try { assets = JSON.parse(/const ASSETS = (\[[\s\S]*?\]);/.exec(txt)[1]); } catch {}
  return { v, assets };
}

// czyści cache, pobiera wszystkie pliki prosto z serwera i przeładowuje
export async function forceUpdate(assets) {
  try { assets ||= (await serverSW()).assets; } catch { assets = []; }
  try { for (const k of await caches.keys()) await caches.delete(k); } catch {}
  try { for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister(); } catch {}
  await Promise.all(assets.map(u => fetch(u, { cache: 'reload' }).catch(() => {})));
  try { for (const k of await caches.keys()) await caches.delete(k); } catch {}
  location.reload();
}

// przy starcie: jeśli na serwerze jest nowsza wersja niż uruchomiona – napraw sam (raz na sesję)
export async function checkVersion(onStale) {
  if (!navigator.onLine || location.protocol === 'file:') return;
  try {
    const { v, assets } = await serverSW();
    if (!v || v === VERSION) return;
    // czy na serwerze są komplet nowych plików? (version.js leży w folderze js)
    let jsV = null;
    try { const r = await fetch('js/version.js?t=' + Date.now(), { cache: 'no-store' }); if (r.ok) jsV = /VERSION = '([^']+)'/.exec(await r.text())?.[1]; } catch {}
    if (jsV !== v) { onStale?.('server'); return; }
    if (sessionStorage.getItem('hv-fix') === v) { onStale?.('restart'); return; }
    sessionStorage.setItem('hv-fix', v);
    await forceUpdate(assets);
  } catch {}
}
export { VERSION };
