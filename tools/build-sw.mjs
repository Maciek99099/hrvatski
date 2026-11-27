// Generuje listę plików do cache'owania w sw.js i podbija wersję.
// Użycie (w katalogu projektu): node tools/build-sw.mjs
import fs from 'fs';
import path from 'path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const walk = d => fs.readdirSync(path.join(root, d), { withFileTypes: true }).flatMap(e => {
  const p = d ? `${d}/${e.name}` : e.name;
  return e.isDirectory() ? walk(p) : [p];
});
const files = ['./', ...walk('').filter(f =>
  /\.(html|css|js|webmanifest|svg|png|woff2)$/.test(f) && !f.startsWith('tools/') && !f.startsWith('icons/splash/') && f !== 'sw.js'
).map(f => './' + f)].sort();
const version = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12);
let sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
sw = sw.replace(/const VERSION = '[^']*';/, `const VERSION = '${version}';`)
       .replace(/const ASSETS = \[[\s\S]*?\];/, `const ASSETS = ${JSON.stringify(files, null, 2)};`);
fs.writeFileSync(path.join(root, 'sw.js'), sw);
console.log(`sw.js: ${files.length} plików, wersja ${version}`);
