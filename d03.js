// Dzielnica 3: Kafić (kawiarnia) – napoje i przekąski, htjeti/željeti, „Mogu li dobiti…?”, liczby 11–100, ceny w euro, rachunek.
// Rozwidlenie: Cukiernia (słodkości) ALBO Taras (uprzejme prośby, kelner). Lekcja 4 wymaga jednej z nich.
export default {
  id: 'd3',
  lessons: [
    // ───────────── Lekcja 1 ─────────────
    {
      id: 'd3l1',
      scene: 'cafe',
      place: { hr: 'Kafić', pl: 'Kawiarnia', en: 'Café' },
      title: { hr: 'Idemo na kavu!', pl: 'Napoje i „chcę”', en: 'Drinks and “I want”' },
      tags: ['present'],
      words: [
        { hr: 'kava', pl: 'kawa', en: 'coffee', pos: 'noun', g: 'f', cat: 'drinks', ico: '☕', ex: { hr: 'Želim kavu, molim.', pl: 'Poproszę kawę.', en: "I'd like a coffee, please." } },
        { hr: 'kava s mlijekom', pl: 'kawa z mlekiem', en: 'coffee with milk', pos: 'phrase', pic: true, cat: 'drinks', ico: '🥛', ex: { hr: 'Jednu kavu s mlijekom, molim.', pl: 'Poproszę jedną kawę z mlekiem.', en: 'One coffee with milk, please.' } },
        { hr: 'bijela kava', pl: 'biała kawa (dużo mleka)', en: 'white coffee (latte)', pos: 'phrase', pic: true, cat: 'drinks', ico: '🤍', ex: { hr: 'Htio bih bijelu kavu.', pl: 'Chciałbym białą kawę.', en: "I'd like a white coffee." } },
        { hr: 'čaj', pl: 'herbata', en: 'tea', pos: 'noun', g: 'm', cat: 'drinks', ico: '🍵', ex: { hr: 'Hoću čaj.', pl: 'Chcę herbatę.', en: 'I want tea.' } },
        { hr: 'sok', pl: 'sok', en: 'juice', pos: 'noun', g: 'm', cat: 'drinks', ico: '🧃', ex: { hr: 'Jedan sok, molim.', pl: 'Jeden sok, proszę.', en: 'One juice, please.' } },
        { hr: 'voda', pl: 'woda', en: 'water', pos: 'noun', g: 'f', cat: 'drinks', ico: '💧', ex: { hr: 'Jednu vodu, molim.', pl: 'Poproszę wodę.', en: 'A water, please.' } },
        { hr: 'pivo', pl: 'piwo', en: 'beer', pos: 'noun', g: 'n', cat: 'drinks', ico: '🍺', ex: { hr: 'Želiš li pivo?', pl: 'Chcesz piwo?', en: 'Do you want a beer?' } },
        { hr: 'vino', pl: 'wino', en: 'wine', pos: 'noun', g: 'n', cat: 'drinks', ico: '🍷', ex: { hr: 'Crno vino, molim.', pl: 'Czerwone wino, proszę.', en: 'Red wine, please.' } },
        { hr: 'mlijeko', pl: 'mleko', en: 'milk', pos: 'noun', g: 'n', cat: 'drinks', ico: '🍼', ex: { hr: 'Kava s mlijekom.', pl: 'Kawa z mlekiem.', en: 'Coffee with milk.' } },
        { hr: 'šećer', pl: 'cukier', en: 'sugar', pos: 'noun', g: 'm', cat: 'drinks', ico: '🧂', ex: { hr: 'Kava bez šećera, molim.', pl: 'Kawa bez cukru, proszę.', en: 'Coffee without sugar, please.' } },
        { hr: 'htjeti', pl: 'chcieć', en: 'to want', pos: 'verb', cat: 'verbs', ico: '🙏', ex: { hr: 'Hoću sok.', pl: 'Chcę sok.', en: 'I want juice.' } },
        { hr: 'željeti', pl: ['chcieć', 'życzyć sobie'], en: ['to want', 'to wish'], pos: 'verb', cat: 'verbs', ico: '✨', ex: { hr: 'Što želite?', pl: 'Co Pan sobie życzy?', en: 'What would you like?' } },
      ],
      grammar: {
        title: { pl: 'Chcę: hoću, želim, htio bih', en: 'I want: hoću, želim, htio bih' },
        body: {
          pl: `<table class="gtable"><tr><th></th><th>htjeti</th><th>željeti</th></tr>
<tr><td>ja</td><td>hoću</td><td>želim</td></tr><tr><td>ti</td><td>hoćeš</td><td>želiš</td></tr><tr><td>on/ona</td><td>hoće</td><td>želi</td></tr>
<tr><td>mi</td><td>hoćemo</td><td>želimo</td></tr><tr><td>vi</td><td>hoćete</td><td>želite</td></tr><tr><td>oni</td><td>hoće</td><td>žele</td></tr></table>
<p>Najgrzeczniej: <b>Htio bih…</b> (chciałbym) / <b>Htjela bih…</b> (chciałabym). W kawiarni słyszysz też <b>Ja ću…</b> = „ja wezmę…”.</p>
<p>Po „chcę” rzeczownik żeński zmienia <b>-a → -u</b>, jak po polsku: <i>kava → želim kav<b>u</b></i>, <i>voda → vod<b>u</b></i>. Męskie i nijakie bez zmian: <i>čaj, sok, pivo</i>.</p>
<p>☕ W Chorwacji „<b>idemo na kavu</b>” to zaproszenie na spotkanie – siedzi się długo i rozmawia.</p>`,
          en: `<table class="gtable"><tr><th></th><th>htjeti</th><th>željeti</th></tr>
<tr><td>ja</td><td>hoću</td><td>želim</td></tr><tr><td>ti</td><td>hoćeš</td><td>želiš</td></tr><tr><td>on/ona</td><td>hoće</td><td>želi</td></tr>
<tr><td>mi</td><td>hoćemo</td><td>želimo</td></tr><tr><td>vi</td><td>hoćete</td><td>želite</td></tr><tr><td>oni</td><td>hoće</td><td>žele</td></tr></table>
<p>Most polite: <b>Htio bih…</b> (man) / <b>Htjela bih…</b> (woman) = I would like. In cafés you also hear <b>Ja ću…</b> = “I'll have…”.</p>
<p>After “want”, feminine nouns change <b>-a → -u</b>: <i>kava → želim kav<b>u</b></i>. Masculine and neuter stay: <i>čaj, sok, pivo</i>.</p>
<p>☕ “<b>Idemo na kavu</b>” is an invitation to meet and chat – coffee is a long, social ritual.</p>`,
        },
        examples: [
          { hr: 'Želim kavu s mlijekom.', pl: 'Chcę kawę z mlekiem.', en: 'I want a coffee with milk.' },
          { hr: 'Htjela bih čaj.', pl: 'Chciałabym herbatę.', en: "I'd like tea (woman speaking)." },
          { hr: 'Ja ću pivo.', pl: 'Ja wezmę piwo.', en: "I'll have a beer." },
        ],
      },
      dialog: {
        title: { pl: 'Pierwsza kawa w Zagrzebiu', en: 'First coffee in Zagreb' },
        lines: [
          { who: 'Konobar', hr: 'Dobar dan! Izvolite, što želite?', pl: 'Dzień dobry! Słucham, co podać?', en: 'Hello! What would you like?' },
          { who: 'Ivana', hr: 'Ja ću kavu s mlijekom.', pl: 'Ja wezmę kawę z mlekiem.', en: "I'll have a coffee with milk." },
          { who: 'Marek', hr: 'Htio bih bijelu kavu, bez šećera.', pl: 'Chciałbym białą kawę, bez cukru.', en: "I'd like a white coffee, no sugar." },
          { who: 'Konobar', hr: 'Kava s mlijekom i bijela kava. Još nešto?', pl: 'Kawa z mlekiem i biała kawa. Coś jeszcze?', en: 'A coffee with milk and a white coffee. Anything else?' },
          { who: 'Marek', hr: 'Jednu vodu, molim.', pl: 'Poproszę jedną wodę.', en: 'One water, please.' },
          { who: 'Konobar', hr: 'Odmah!', pl: 'Już podaję!', en: 'Right away!' },
        ],
      },
      sentences: [
        { hr: 'Želim kavu, molim.', pl: ['Poproszę kawę.', 'Chcę kawę, proszę.'], en: ["I'd like a coffee, please.", 'I want a coffee, please.'], why: { pl: 'kava → kavu po „želim” (jak po polsku: kawę).', en: 'kava → kavu after “želim”.' } },
        { hr: 'Hoću čaj.', pl: ['Chcę herbatę.', 'Chcę herbaty.'], en: 'I want tea.' },
        { hr: 'Htio bih bijelu kavu.', pl: ['Chciałbym białą kawę.', 'Poproszę białą kawę.'], en: ["I'd like a white coffee.", 'I would like a white coffee.'], why: { pl: 'bijela kava → bijelu kavu: zmienia się i przymiotnik, i rzeczownik.', en: 'Both adjective and noun change: bijelu kavu.' } },
        { hr: 'Jedan sok, molim.', pl: ['Jeden sok, proszę.', 'Poproszę jeden sok.'], en: 'One juice, please.' },
        { hr: 'Kava bez šećera, molim.', pl: ['Kawa bez cukru, proszę.', 'Poproszę kawę bez cukru.'], en: 'Coffee without sugar, please.' },
        { hr: 'Želiš li pivo?', pl: ['Chcesz piwo?', 'Czy chcesz piwo?'], en: ['Do you want a beer?', 'Would you like a beer?'] },
        { hr: 'Idemo na kavu!', pl: ['Chodźmy na kawę!', 'Idziemy na kawę!'], en: ["Let's go for coffee!", "Let's go for a coffee!"] },
        { hr: 'Ja ću vodu.', pl: ['Ja wezmę wodę.', 'Dla mnie woda.'], en: ["I'll have water.", "I'll have a water."] },
      ],
      cloze: [
        { hr: 'Želim ___, molim.', answer: 'kavu', options: ['kavu', 'kava', 'kave'], pl: 'Poproszę kawę.', en: "I'd like a coffee, please.", why: { pl: 'Po „želim” żeński rzeczownik: -a → -u.', en: 'After “želim” feminine -a → -u.' } },
        { hr: 'Ja ___ čaj.', answer: 'hoću', options: ['hoću', 'hoće', 'hoćeš'], pl: 'Chcę herbatę.', en: 'I want tea.', why: { pl: 'ja → hoću.', en: 'ja → hoću.' } },
        { hr: 'Htio ___ sok.', answer: 'bih', options: ['bih', 'sam', 'je'], pl: 'Chciałbym sok.', en: "I'd like a juice.", why: { pl: '„Htio bih” = chciałbym (stały zwrot).', en: '“Htio bih” = I would like.' } },
        { hr: 'Kava ___ mlijekom.', answer: 's', options: ['s', 'i', 'bez'], pl: 'Kawa z mlekiem.', en: 'Coffee with milk.', why: { pl: '„s” = z (czymś): s mlijekom.', en: '“s” = with: s mlijekom.' } },
        { hr: 'Što ___? – Kavu, molim.', answer: 'želite', options: ['želite', 'želim', 'žele'], pl: 'Co Pan sobie życzy? – Kawę, proszę.', en: 'What would you like? – A coffee, please.', why: { pl: 'Kelner mówi grzecznie na „Vi”: želite.', en: 'The waiter is polite (Vi): želite.' } },
      ],
      replies: [
        { prompt: 'Izvolite, što želite?', ok: 'Kavu s mlijekom, molim.', bad: ['Kava je dobro.', 'Ja sam kava.'], why: { pl: 'Zamawiamy: „Kavu…, molim” (biernik!).', en: 'Order with “Kavu…, molim” (accusative).' } },
        { prompt: 'Želiš li pivo?', ok: 'Ne, hvala. Hoću sok.', bad: ['Da, ja sam pivo.', 'Pivo je iz Hrvatske.'], why: { pl: 'Odpowiadasz tak/nie i mówisz, co chcesz.', en: 'Answer yes/no and say what you want.' } },
        { prompt: 'Još nešto?', ok: 'Jednu vodu, molim.', bad: ['Jedna voda je.', 'Doviđenja, molim.'], why: { pl: '„Još nešto?” = coś jeszcze? → zamawiasz: „Jednu vodu, molim”.', en: '“Još nešto?” = anything else? → “Jednu vodu, molim”.' } },
      ],
      tf: [
        { pl: 'Ivana zamawia kawę z mlekiem.', en: 'Ivana orders a coffee with milk.', answer: true },
        { pl: 'Marek chce kawę z cukrem.', en: 'Marek wants coffee with sugar.', answer: false },
        { pl: 'Marek zamawia też wodę.', en: 'Marek also orders water.', answer: true },
      ],
    },

    // ───────────── Lekcja 2 (odnoga A) ─────────────
    {
      id: 'd3l2',
      after: ['d3l1'],
      scene: 'bakery',
      place: { hr: 'Slastičarnica', pl: 'Cukiernia', en: 'Pastry shop' },
      title: { hr: 'Nešto slatko', pl: 'Słodkości i przekąski', en: 'Sweets and snacks' },
      tags: ['akuzativ'],
      words: [
        { hr: 'kolač', pl: 'ciasto', en: 'cake', pos: 'noun', g: 'm', cat: 'sweets', ico: '🍰', ex: { hr: 'Ovaj kolač je ukusan.', pl: 'To ciasto jest smaczne.', en: 'This cake is tasty.' } },
        { hr: 'torta', pl: 'tort', en: 'gateau, layer cake', pos: 'noun', g: 'f', cat: 'sweets', ico: '🎂', ex: { hr: 'Želim tortu.', pl: 'Chcę tort.', en: 'I want some cake.' } },
        { hr: 'sladoled', pl: 'lody', en: 'ice cream', pos: 'noun', g: 'm', cat: 'sweets', ico: '🍦', ex: { hr: 'Hoću sladoled!', pl: 'Chcę lody!', en: 'I want ice cream!' } },
        { hr: 'kroasan', pl: 'rogalik (croissant)', en: 'croissant', pos: 'noun', g: 'm', cat: 'sweets', ico: '🥐', ex: { hr: 'Jedan kroasan, molim.', pl: 'Jednego rogalika, proszę.', en: 'One croissant, please.' } },
        { hr: 'sendvič', pl: 'kanapka', en: 'sandwich', pos: 'noun', g: 'm', cat: 'food', ico: '🥪', ex: { hr: 'Imate li sendvič?', pl: 'Macie kanapkę?', en: 'Do you have a sandwich?' } },
        { hr: 'burek', pl: 'burek (ciasto z nadzieniem)', en: 'burek (filled pastry)', pos: 'noun', g: 'm', cat: 'food', ico: '🥟', ex: { hr: 'Burek sa sirom, molim.', pl: 'Burek z serem, proszę.', en: 'Cheese burek, please.' } },
        { hr: 'palačinka', pl: 'naleśnik', en: 'pancake (crêpe)', pos: 'noun', g: 'f', cat: 'sweets', ico: '🥞', ex: { hr: 'Želim jednu palačinku.', pl: 'Chcę jednego naleśnika.', en: 'I want one crêpe.' } },
        { hr: 'čokolada', pl: 'czekolada', en: 'chocolate', pos: 'noun', g: 'f', cat: 'sweets', ico: '🍫', ex: { hr: 'Palačinka s čokoladom.', pl: 'Naleśnik z czekoladą.', en: 'A crêpe with chocolate.' } },
        { hr: 'ukusan', pl: 'smaczny', en: 'tasty', pos: 'adj', cat: 'adjectives', ico: '😋', ex: { hr: 'Burek je ukusan.', pl: 'Burek jest smaczny.', en: 'The burek is tasty.' } },
        { hr: 'sladak', pl: 'słodki', en: 'sweet', pos: 'adj', cat: 'adjectives', ico: '🍬', ex: { hr: 'Kolač je sladak.', pl: 'Ciasto jest słodkie.', en: 'The cake is sweet.' } },
        { hr: 'komad', pl: 'kawałek', en: 'piece', pos: 'noun', g: 'm', cat: 'food', ico: '🔪', ex: { hr: 'Jedan komad torte.', pl: 'Jeden kawałek tortu.', en: 'One piece of cake.' } },
      ],
      grammar: {
        title: { pl: 'Biernik (kogo? co?) – pierwszy krok', en: 'Accusative (whom? what?) – first step' },
        body: {
          pl: `<p>Po <i>hoću, želim, htio bih, ja ću</i> stoi <b>biernik</b> – tak jak po polsku „chcę <b>co?</b>”.</p>
<table class="gtable"><tr><th>rodzaj</th><th>mianownik</th><th>biernik</th></tr>
<tr><td>żeński -a</td><td>torta, palačinka, čokolada</td><td>tort<b>u</b>, palačink<b>u</b>, čokolad<b>u</b></td></tr>
<tr><td>męski (rzecz)</td><td>kolač, sladoled, burek</td><td>kolač, sladoled, burek</td></tr>
<tr><td>nijaki</td><td>pivo, vino</td><td>pivo, vino</td></tr></table>
<p>Przymiotnik też się zmienia: <i>jedn<b>u</b> palačink<b>u</b></i>, <i>bijel<b>u</b> kav<b>u</b></i>.</p>
<p>⚠️ <b>kolač</b> = ciasto (każde), a <b>torta</b> = tort. <b>Sladoled</b> = lody (liczba pojedyncza!): <i>sladoled je ukusan</i>.</p>
<p>⚠️ Przymiotniki z ruchomym <i>a</i>: <i>sladak</i> (m) → <i>slatka</i> (ż), <i>ukusan</i> → <i>ukusna</i>.</p>`,
          en: `<p>After <i>hoću, želim, htio bih, ja ću</i> comes the <b>accusative</b>.</p>
<table class="gtable"><tr><th>gender</th><th>nominative</th><th>accusative</th></tr>
<tr><td>fem. -a</td><td>torta, palačinka, čokolada</td><td>tort<b>u</b>, palačink<b>u</b>, čokolad<b>u</b></td></tr>
<tr><td>masc. (thing)</td><td>kolač, sladoled, burek</td><td>kolač, sladoled, burek</td></tr>
<tr><td>neut.</td><td>pivo, vino</td><td>pivo, vino</td></tr></table>
<p>Adjectives change too: <i>jedn<b>u</b> palačink<b>u</b></i>, <i>bijel<b>u</b> kav<b>u</b></i>.</p>
<p>⚠️ Adjectives with a mobile <i>a</i>: <i>sladak</i> (m) → <i>slatka</i> (f), <i>ukusan</i> → <i>ukusna</i>.</p>`,
        },
        examples: [
          { hr: 'Želim jednu palačinku.', pl: 'Chcę jednego naleśnika.', en: 'I want one crêpe.' },
          { hr: 'Hoću sladoled i kolač.', pl: 'Chcę lody i ciasto.', en: 'I want ice cream and cake.' },
          { hr: 'Torta je vrlo ukusna.', pl: 'Tort jest bardzo smaczny.', en: 'The cake is very tasty.' },
        ],
      },
      dialog: {
        title: { pl: 'W cukierni', en: 'At the pastry shop' },
        lines: [
          { who: 'Prodavač', hr: 'Izvolite!', pl: 'Słucham!', en: 'How can I help?' },
          { who: 'Marek', hr: 'Htio bih jedan kolač i jednu palačinku.', pl: 'Chciałbym jedno ciasto i jednego naleśnika.', en: "I'd like one cake and one crêpe." },
          { who: 'Prodavač', hr: 'Palačinku s čokoladom?', pl: 'Naleśnika z czekoladą?', en: 'A crêpe with chocolate?' },
          { who: 'Marek', hr: 'Da, molim. I sladoled za Ivanu.', pl: 'Tak, poproszę. I lody dla Ivany.', en: 'Yes, please. And ice cream for Ivana.' },
          { who: 'Ivana', hr: 'Mmm, ovaj sladoled je jako ukusan!', pl: 'Mmm, te lody są bardzo smaczne!', en: 'Mmm, this ice cream is really tasty!' },
          { who: 'Marek', hr: 'I kolač je sladak. Super!', pl: 'I ciasto jest słodkie. Super!', en: 'And the cake is sweet. Great!' },
        ],
      },
      sentences: [
        { hr: 'Hoću sladoled.', pl: ['Chcę lody.', 'Chcę loda.'], en: ['I want ice cream.', 'I want an ice cream.'] },
        { hr: 'Želim jednu palačinku.', pl: ['Chcę jednego naleśnika.', 'Poproszę jednego naleśnika.', 'Chcę jeden naleśnik.'], en: ['I want one crêpe.', 'I want one pancake.'], why: { pl: 'palačinka → jednu palačinku (biernik).', en: 'palačinka → jednu palačinku (accusative).' } },
        { hr: 'Torta je vrlo ukusna.', pl: ['Tort jest bardzo smaczny.'], en: ['The cake is very tasty.'], why: { pl: 'torta (ż.) → ukusna.', en: 'torta (f.) → ukusna.' } },
        { hr: 'Kolač je sladak.', pl: ['Ciasto jest słodkie.'], en: ['The cake is sweet.'] },
        { hr: 'Jedan kroasan i jednu kavu, molim.', pl: ['Jednego rogalika i jedną kawę, proszę.', 'Poproszę jednego rogalika i jedną kawę.', 'Jeden croissant i jedną kawę, proszę.'], en: ['One croissant and one coffee, please.', 'A croissant and a coffee, please.'] },
        { hr: 'Burek je ukusan.', pl: 'Burek jest smaczny.', en: 'The burek is tasty.' },
        { hr: 'Hoćeš li čokoladu?', pl: ['Chcesz czekoladę?', 'Czy chcesz czekoladę?'], en: ['Do you want chocolate?', 'Do you want some chocolate?'] },
        { hr: 'Jedan komad torte, molim.', pl: ['Jeden kawałek tortu, proszę.', 'Poproszę kawałek tortu.'], en: ['One piece of cake, please.', 'A piece of cake, please.'] },
      ],
      cloze: [
        { hr: 'Želim jednu ___.', answer: 'palačinku', options: ['palačinku', 'palačinka', 'palačinke'], pl: 'Chcę jednego naleśnika.', en: 'I want one crêpe.', why: { pl: 'Biernik żeński: -a → -u.', en: 'Feminine accusative: -a → -u.' } },
        { hr: 'Hoću ___.', answer: 'sladoled', options: ['sladoled', 'sladoleda', 'sladoledu'], pl: 'Chcę lody.', en: 'I want ice cream.', why: { pl: 'Męski (rzecz) w bierniku bez zmian.', en: 'Masculine (thing) accusative = nominative.' } },
        { hr: 'Torta je ___.', answer: 'slatka', options: ['slatka', 'sladak', 'slatko'], pl: 'Tort jest słodki.', en: 'The cake is sweet.', why: { pl: 'torta (ż.) → slatka (ruchome „a” znika).', en: 'torta (f.) → slatka.' } },
        { hr: '___ čokoladu, molim.', answer: 'Jednu', options: ['Jednu', 'Jedna', 'Jedan'], pl: 'Jedną czekoladę, proszę.', en: 'One chocolate, please.', why: { pl: 'jedna → jednu w bierniku (jak rzeczownik).', en: 'jedna → jednu in the accusative.' } },
      ],
      replies: [
        { prompt: 'Izvolite!', ok: 'Htio bih jedan kolač.', bad: ['Kolač je jedan.', 'Ja sam kolač.'], why: { pl: 'Zamawiasz: „Htio bih…” + to, czego chcesz.', en: 'Order with “Htio bih…”.' } },
        { prompt: 'Palačinku s čokoladom?', ok: 'Da, molim.', bad: ['Da, ja sam čokolada.', 'Nema na čemu.'], why: { pl: 'Potwierdzamy: „Da, molim.”', en: 'Confirm: “Da, molim.”' } },
        { prompt: 'Je li burek ukusan?', ok: 'Da, vrlo je ukusan!', bad: ['Da, vrlo je ukusna!', 'Burek je iz Poljske.'], why: { pl: 'burek (m.) → ukusan.', en: 'burek (m.) → ukusan.' } },
      ],
      tf: [
        { pl: 'Marek zamawia ciasto i naleśnika.', en: 'Marek orders cake and a crêpe.', answer: true },
        { pl: 'Naleśnik jest z serem.', en: 'The crêpe is with cheese.', answer: false },
        { pl: 'Ivanie smakują lody.', en: 'Ivana likes the ice cream.', answer: true },
      ],
    },

    // ───────────── Lekcja 3 (odnoga B) ─────────────
    {
      id: 'd3l3',
      after: ['d3l1'],
      scene: 'restaurant',
      place: { hr: 'Terasa', pl: 'Taras kawiarni', en: 'Café terrace' },
      title: { hr: 'Mogu li dobiti…?', pl: 'Uprzejme prośby', en: 'Polite requests' },
      tags: ['polite'],
      words: [
        { hr: 'konobar', pl: 'kelner', en: 'waiter', pos: 'noun', g: 'm', cat: 'people', ico: '🤵', ex: { hr: 'Konobar, molim vas!', pl: 'Proszę pana! (do kelnera)', en: 'Waiter, please!' } },
        { hr: 'konobarica', pl: 'kelnerka', en: 'waitress', pos: 'noun', g: 'f', cat: 'people', ico: '💁‍♀️', ex: { hr: 'Konobarica je ljubazna.', pl: 'Kelnerka jest miła.', en: 'The waitress is kind.' } },
        { hr: 'stol', pl: 'stół, stolik', en: 'table', pos: 'noun', g: 'm', cat: 'places', ico: '🪑', ex: { hr: 'Ovaj stol je slobodan.', pl: 'Ten stolik jest wolny.', en: 'This table is free.' } },
        { hr: 'jelovnik', pl: 'menu, karta dań', en: 'menu', pos: 'noun', g: 'm', cat: 'food', ico: '📋', ex: { hr: 'Mogu li dobiti jelovnik?', pl: 'Czy mogę dostać menu?', en: 'Can I have the menu?' } },
        { hr: 'mjesto', pl: 'miejsce', en: 'seat, place', pos: 'noun', g: 'n', cat: 'places', ico: '💺', ex: { hr: 'Je li ovo mjesto slobodno?', pl: 'Czy to miejsce jest wolne?', en: 'Is this seat free?' } },
        { hr: 'slobodan', pl: 'wolny', en: 'free', pos: 'adj', cat: 'adjectives', ico: '🟢', ex: { hr: 'Stol je slobodan.', pl: 'Stolik jest wolny.', en: 'The table is free.' } },
        { hr: 'zauzet', pl: 'zajęty', en: 'taken', pos: 'adj', cat: 'adjectives', ico: '🔴', ex: { hr: 'Ne, mjesto je zauzeto.', pl: 'Nie, miejsce jest zajęte.', en: 'No, the seat is taken.' } },
        { hr: 'mogu li…?', pl: 'czy mogę…?', en: 'can I…?', pos: 'phrase', cat: 'polite', ico: '🙋', ex: { hr: 'Mogu li dobiti vodu?', pl: 'Czy mogę dostać wodę?', en: 'Can I have some water?' } },
        { hr: 'dobiti', pl: 'dostać', en: 'to get', pos: 'verb', cat: 'verbs', ico: '🎁', ex: { hr: 'Mogu li dobiti račun?', pl: 'Czy mogę dostać rachunek?', en: 'Can I get the bill?' } },
        { hr: 'može', pl: ['może być', 'jasne', 'OK'], en: ['sure', 'OK'], pos: 'phrase', cat: 'polite', ico: '👌', ex: { hr: 'Još jedna kava? – Može!', pl: 'Jeszcze jedna kawa? – Jasne!', en: 'Another coffee? – Sure!' } },
        { hr: 'odmah', pl: ['zaraz', 'od razu'], en: ['right away', 'immediately'], pos: 'adv', cat: 'basics', ico: '⚡', ex: { hr: 'Odmah dolazim!', pl: 'Zaraz przyjdę!', en: "I'm coming right away!" } },
        { hr: 'još', pl: ['jeszcze', 'więcej'], en: ['more', 'another', 'still'], pos: 'adv', cat: 'basics', ico: '➕', ex: { hr: 'Još jednu kavu, molim.', pl: 'Jeszcze jedną kawę, proszę.', en: 'Another coffee, please.' } },
      ],
      grammar: {
        title: { pl: 'Mogu li…? i „Može”', en: 'Mogu li…? and “Može”' },
        body: {
          pl: `<p><b>Mogu li dobiti…?</b> = Czy mogę dostać…? – najwygodniejsza uprzejma prośba. Dalej biernik: <i>Mogu li dobiti kav<b>u</b> / jelovnik / vod<b>u</b>?</i></p>
<p><b>Može</b> (dosł. „może”) w Chorwacji znaczy „jasne, OK, chętnie”: <i>Još jedna kava? – <b>Može!</b></i></p>
<p>Do kelnera: <b>Konobar, molim vas!</b> albo po prostu <i>Oprostite!</i></p>
<p>Wolne / zajęte zgadza się z rodzajem: <i>stol je slobod<b>an</b></i>, <i>stolica je slobod<b>na</b></i>, <i>mjesto je slobod<b>no</b></i>; <i>zauzet / zauzeta / zauzeto</i>.</p>
<p>⚠️ <b>stol</b> = stół/stolik, ale <b>stolica</b> = krzesło (nie stolica kraju – ta to <i>glavni grad</i>)!</p>`,
          en: `<p><b>Mogu li dobiti…?</b> = Can I get…? – the handiest polite request. Then the accusative: <i>Mogu li dobiti kav<b>u</b> / jelovnik / vod<b>u</b>?</i></p>
<p><b>Može</b> (lit. “it can”) means “sure, OK, gladly”: <i>Još jedna kava? – <b>Može!</b></i></p>
<p>To call the waiter: <b>Konobar, molim vas!</b> or simply <i>Oprostite!</i></p>
<p>Free / taken agree with gender: <i>stol je slobod<b>an</b></i>, <i>mjesto je slobod<b>no</b></i>; <i>zauzet / zauzeta / zauzeto</i>.</p>
<p>⚠️ <b>stolica</b> = chair (the capital city is <i>glavni grad</i>).</p>`,
        },
        examples: [
          { hr: 'Je li ovo mjesto slobodno?', pl: 'Czy to miejsce jest wolne?', en: 'Is this seat free?' },
          { hr: 'Mogu li dobiti jelovnik?', pl: 'Czy mogę dostać menu?', en: 'Can I have the menu?' },
          { hr: 'Još jedna kava? – Može!', pl: 'Jeszcze jedna kawa? – Jasne!', en: 'Another coffee? – Sure!' },
        ],
      },
      dialog: {
        title: { pl: 'Na tarasie', en: 'On the terrace' },
        lines: [
          { who: 'Marek', hr: 'Oprostite, je li ovaj stol slobodan?', pl: 'Przepraszam, czy ten stolik jest wolny?', en: 'Excuse me, is this table free?' },
          { who: 'Konobarica', hr: 'Da, izvolite. Odmah dolazim!', pl: 'Tak, proszę. Zaraz podejdę!', en: "Yes, please. I'll be right with you!" },
          { who: 'Marek', hr: 'Mogu li dobiti jelovnik?', pl: 'Czy mogę dostać menu?', en: 'Can I have the menu?' },
          { who: 'Konobarica', hr: 'Izvolite. Što želite?', pl: 'Proszę. Co podać?', en: 'Here you are. What would you like?' },
          { who: 'Marek', hr: 'Jednu kavu s mlijekom i čašu vode, molim.', pl: 'Jedną kawę z mlekiem i szklankę wody, proszę.', en: 'A coffee with milk and a glass of water, please.' },
          { who: 'Konobarica', hr: 'Može!', pl: 'Jasne!', en: 'Sure!' },
        ],
      },
      sentences: [
        { hr: 'Je li ovo mjesto slobodno?', pl: ['Czy to miejsce jest wolne?', 'To miejsce jest wolne?'], en: ['Is this seat free?', 'Is this place free?'] },
        { hr: 'Mogu li dobiti jelovnik?', pl: ['Czy mogę dostać menu?', 'Mogę dostać menu?', 'Czy mogę prosić o menu?'], en: ['Can I have the menu?', 'Can I get the menu?', 'May I have the menu?'] },
        { hr: 'Ovaj stol je slobodan.', pl: ['Ten stolik jest wolny.', 'Ten stół jest wolny.'], en: 'This table is free.' },
        { hr: 'Ne, mjesto je zauzeto.', pl: ['Nie, miejsce jest zajęte.', 'Nie, to miejsce jest zajęte.'], en: ['No, the seat is taken.', 'No, the place is taken.'], why: { pl: 'mjesto (n.) → zauzeto.', en: 'mjesto (n.) → zauzeto.' } },
        { hr: 'Konobar, molim vas!', pl: ['Proszę pana!', 'Kelner, proszę!'], en: ['Waiter, please!', 'Excuse me, waiter!'] },
        { hr: 'Još jednu kavu, molim.', pl: ['Jeszcze jedną kawę, proszę.', 'Poproszę jeszcze jedną kawę.'], en: ['Another coffee, please.', 'One more coffee, please.'] },
        { hr: 'Mogu li dobiti vodu?', pl: ['Czy mogę dostać wodę?', 'Mogę dostać wodę?'], en: ['Can I have some water?', 'Can I get water?', 'Can I have water?'] },
        { hr: 'Odmah dolazim!', pl: ['Zaraz przyjdę!', 'Zaraz podejdę!', 'Już idę!'], en: ["I'm coming right away!", "I'll be right there!", 'Coming right away!'] },
      ],
      cloze: [
        { hr: '___ li dobiti jelovnik?', answer: 'Mogu', options: ['Mogu', 'Može', 'Moći'], pl: 'Czy mogę dostać menu?', en: 'Can I have the menu?', why: { pl: 'ja → mogu: „Mogu li…?” = Czy mogę…?', en: 'ja → mogu: “Mogu li…?”' } },
        { hr: 'Stol je ___.', answer: 'slobodan', options: ['slobodan', 'slobodna', 'slobodno'], pl: 'Stolik jest wolny.', en: 'The table is free.', why: { pl: 'stol (m.) → slobodan.', en: 'stol (m.) → slobodan.' } },
        { hr: 'Mjesto je ___.', answer: 'zauzeto', options: ['zauzeto', 'zauzet', 'zauzeta'], pl: 'Miejsce jest zajęte.', en: 'The seat is taken.', why: { pl: 'mjesto (n.) → zauzeto.', en: 'mjesto (n.) → zauzeto.' } },
        { hr: 'Još jedna kava? – ___!', answer: 'Može', options: ['Može', 'Mogu', 'Molim'], pl: 'Jeszcze jedna kawa? – Jasne!', en: 'Another coffee? – Sure!', why: { pl: '„Može!” = jasne, chętnie.', en: '“Može!” = sure, gladly.' } },
      ],
      replies: [
        { prompt: 'Je li ovo mjesto slobodno?', ok: 'Da, izvolite.', bad: ['Da, ja sam slobodan.', 'Odakle si?'], why: { pl: 'Pozwalamy usiąść: „Da, izvolite.”', en: 'Invite them to sit: “Da, izvolite.”' } },
        { prompt: 'Još jedna kava?', ok: 'Može, hvala!', bad: ['Mogu, hvala!', 'Ja sam kava.'], why: { pl: '„Može!” = chętnie, jasne.', en: '“Može!” = sure.' } },
        { prompt: 'Izvolite, što želite?', ok: 'Mogu li dobiti jelovnik?', bad: ['Jelovnik je slobodan.', 'Ja sam jelovnik.'], why: { pl: 'Prosisz o menu: „Mogu li dobiti jelovnik?”', en: 'Ask for the menu: “Mogu li dobiti jelovnik?”' } },
      ],
      tf: [
        { pl: 'Stolik na tarasie jest wolny.', en: 'The table on the terrace is free.', answer: true },
        { pl: 'Marek prosi o rachunek.', en: 'Marek asks for the bill.', answer: false },
        { pl: 'Marek zamawia kawę i wodę.', en: 'Marek orders coffee and water.', answer: true },
      ],
    },

    // ───────────── Lekcja 4 ─────────────
    {
      id: 'd3l4',
      after: ['d3l2', 'd3l3'],
      scene: 'shop',
      place: { hr: 'Šank', pl: 'Bar (kasa)', en: 'Bar counter' },
      title: { hr: 'Koliko košta?', pl: 'Liczby 11–100 i ceny', en: 'Numbers 11–100 and prices' },
      tags: ['numbers'],
      words: [
        { hr: 'jedanaest', pl: 'jedenaście', en: 'eleven', pos: 'num', cat: 'numbers', ico: '1️⃣', ex: { hr: 'Jedanaest eura.', pl: 'Jedenaście euro.', en: 'Eleven euros.' } },
        { hr: 'dvanaest', pl: 'dwanaście', en: 'twelve', pos: 'num', cat: 'numbers', ico: '🕛', ex: { hr: 'To je dvanaest eura.', pl: 'To dwanaście euro.', en: "That's twelve euros." } },
        { hr: 'petnaest', pl: 'piętnaście', en: 'fifteen', pos: 'num', cat: 'numbers', ico: '🔢', ex: { hr: 'Petnaest minuta.', pl: 'Piętnaście minut.', en: 'Fifteen minutes.' } },
        { hr: 'dvadeset', pl: 'dwadzieścia', en: 'twenty', pos: 'num', cat: 'numbers', ico: '🔢', ex: { hr: 'Dvadeset eura, izvolite.', pl: 'Dwadzieścia euro, proszę.', en: 'Twenty euros, here you are.' } },
        { hr: 'trideset', pl: 'trzydzieści', en: 'thirty', pos: 'num', cat: 'numbers', ico: '🔢', ex: { hr: 'Trideset centi.', pl: 'Trzydzieści centów.', en: 'Thirty cents.' } },
        { hr: 'pedeset', pl: 'pięćdziesiąt', en: 'fifty', pos: 'num', cat: 'numbers', ico: '🔢', ex: { hr: 'Dva eura i pedeset centi.', pl: 'Dwa euro pięćdziesiąt centów.', en: 'Two euros fifty.' } },
        { hr: 'sto', pl: 'sto', en: 'one hundred', pos: 'num', cat: 'numbers', ico: '💯', ex: { hr: 'Sto eura je puno.', pl: 'Sto euro to dużo.', en: 'A hundred euros is a lot.' } },
        { hr: 'euro', pl: 'euro', en: 'euro', pos: 'noun', g: 'm', cat: 'money', ico: '💶', ex: { hr: 'Kava košta dva eura.', pl: 'Kawa kosztuje dwa euro.', en: 'A coffee costs two euros.' } },
        { hr: 'cent', pl: 'cent', en: 'cent', pos: 'noun', g: 'm', cat: 'money', ico: '🪙', ex: { hr: 'Pedeset centi.', pl: 'Pięćdziesiąt centów.', en: 'Fifty cents.' } },
        { hr: 'koliko košta?', pl: 'ile kosztuje?', en: 'how much is it?', pos: 'phrase', cat: 'money', ico: '🏷️', ex: { hr: 'Koliko košta sok?', pl: 'Ile kosztuje sok?', en: 'How much is the juice?' } },
        { hr: 'račun', pl: 'rachunek', en: 'bill', pos: 'noun', g: 'm', cat: 'money', ico: '🧾', ex: { hr: 'Račun, molim.', pl: 'Rachunek, proszę.', en: 'The bill, please.' } },
        { hr: 'kartica', pl: 'karta (płatnicza)', en: 'card', pos: 'noun', g: 'f', cat: 'money', ico: '💳', ex: { hr: 'Mogu li platiti karticom?', pl: 'Czy mogę zapłacić kartą?', en: 'Can I pay by card?' } },
        { hr: 'gotovina', pl: 'gotówka', en: 'cash', pos: 'noun', g: 'f', cat: 'money', ico: '💵', ex: { hr: 'Plaćam gotovinom.', pl: 'Płacę gotówką.', en: "I'm paying cash." } },
      ],
      grammar: {
        title: { pl: 'Liczby 11–100 i euro', en: 'Numbers 11–100 and the euro' },
        body: {
          pl: `<p>Liczby są bardzo podobne do polskich:</p>
<table class="gtable"><tr><th>11–19 = -naest (-naście)</th><th>dziesiątki = -deset (-dzieści/-dziesiąt)</th></tr>
<tr><td>jedanaest, dvanaest, trinaest</td><td>dvadeset (20), trideset (30)</td></tr>
<tr><td>četrnaest, petnaest, šesnaest</td><td>četrdeset (40), pedeset (50)</td></tr>
<tr><td>sedamnaest, osamnaest, devetnaest</td><td>šezdeset, sedamdeset, osamdeset, devedeset</td></tr></table>
<p>Złożone: <i>dvadeset (i) pet</i> = 25, <i>sto</i> = 100.</p>
<p><b>Euro</b> (Chorwacja płaci euro od 2023 r.): <i>jedan euro</i>, <i>dva/tri/četiri eura</i>, <i>pet eura</i>… · <i>jedan cent, dva centa, pet centi</i>.</p>
<p>Cenę często mówi się krótko: <i>tri pedeset</i> = 3,50 €.</p>
<p><b>Koliko košta…?</b> = Ile kosztuje…? · <b>Račun, molim.</b> = Rachunek, proszę.</p>`,
          en: `<table class="gtable"><tr><th>11–19 = -naest</th><th>tens = -deset</th></tr>
<tr><td>jedanaest, dvanaest, trinaest</td><td>dvadeset (20), trideset (30)</td></tr>
<tr><td>četrnaest, petnaest, šesnaest</td><td>četrdeset (40), pedeset (50)</td></tr>
<tr><td>sedamnaest, osamnaest, devetnaest</td><td>šezdeset, sedamdeset, osamdeset, devedeset</td></tr></table>
<p>Compound: <i>dvadeset (i) pet</i> = 25, <i>sto</i> = 100.</p>
<p><b>Euro</b> (Croatia has used the euro since 2023): <i>jedan euro</i>, <i>dva/tri/četiri eura</i>, <i>pet eura</i>… · <i>jedan cent, dva centa, pet centi</i>.</p>
<p>Prices are often said briefly: <i>tri pedeset</i> = €3.50.</p>`,
        },
        examples: [
          { hr: 'Koliko košta kava? – Dva eura.', pl: 'Ile kosztuje kawa? – Dwa euro.', en: 'How much is a coffee? – Two euros.' },
          { hr: 'To je dvanaest eura i pedeset centi.', pl: 'To dwanaście euro pięćdziesiąt.', en: "That's twelve euros fifty." },
          { hr: 'Mogu li platiti karticom?', pl: 'Czy mogę zapłacić kartą?', en: 'Can I pay by card?' },
        ],
      },
      dialog: {
        title: { pl: 'Płacimy', en: 'Paying' },
        lines: [
          { who: 'Marek', hr: 'Račun, molim.', pl: 'Rachunek, proszę.', en: 'The bill, please.' },
          { who: 'Konobar', hr: 'Dvije kave i jedan sok – to je sedam eura.', pl: 'Dwie kawy i jeden sok – to siedem euro.', en: "Two coffees and a juice – that's seven euros." },
          { who: 'Marek', hr: 'Mogu li platiti karticom?', pl: 'Czy mogę zapłacić kartą?', en: 'Can I pay by card?' },
          { who: 'Konobar', hr: 'Naravno. Izvolite.', pl: 'Oczywiście. Proszę.', en: 'Of course. Here you go.' },
          { who: 'Ivana', hr: 'Koliko košta sladoled?', pl: 'Ile kosztują lody?', en: 'How much is the ice cream?' },
          { who: 'Konobar', hr: 'Dva eura i pedeset centi.', pl: 'Dwa euro pięćdziesiąt.', en: 'Two euros fifty.' },
        ],
      },
      sentences: [
        { hr: 'Koliko košta kava?', pl: 'Ile kosztuje kawa?', en: ['How much is the coffee?', 'How much does the coffee cost?', 'How much is a coffee?'] },
        { hr: 'Račun, molim.', pl: ['Rachunek, proszę.', 'Poproszę rachunek.'], en: ['The bill, please.', 'Bill, please.', 'The check, please.'] },
        { hr: 'To je dvanaest eura.', pl: ['To dwanaście euro.', 'To jest dwanaście euro.'], en: ["That's twelve euros.", 'That is twelve euros.', "It's twelve euros."] },
        { hr: 'Mogu li platiti karticom?', pl: ['Czy mogę zapłacić kartą?', 'Mogę zapłacić kartą?'], en: ['Can I pay by card?', 'Can I pay with a card?'] },
        { hr: 'Kava košta dva eura.', pl: 'Kawa kosztuje dwa euro.', en: ['A coffee costs two euros.', 'The coffee costs two euros.'], why: { pl: '2–4 → eura: dva eura.', en: '2–4 → eura.' } },
        { hr: 'Dvadeset eura, izvolite.', pl: ['Dwadzieścia euro, proszę.', 'Proszę, dwadzieścia euro.'], en: ['Twenty euros, here you are.', 'Here are twenty euros.'] },
        { hr: 'Pet eura i pedeset centi.', pl: ['Pięć euro pięćdziesiąt centów.', 'Pięć euro i pięćdziesiąt centów.'], en: ['Five euros fifty cents.', 'Five euros and fifty cents.'] },
        { hr: 'Sto eura je puno!', pl: ['Sto euro to dużo!', 'Sto euro to sporo!'], en: ['A hundred euros is a lot!', 'One hundred euros is a lot!'] },
      ],
      cloze: [
        { hr: 'Kava košta dva ___.', answer: 'eura', options: ['eura', 'euro', 'eure'], pl: 'Kawa kosztuje dwa euro.', en: 'Coffee costs two euros.', why: { pl: 'Po 2, 3, 4 → eura.', en: 'After 2, 3, 4 → eura.' } },
        { hr: 'Pedeset ___.', answer: 'centi', options: ['centi', 'centa', 'cent'], pl: 'Pięćdziesiąt centów.', en: 'Fifty cents.', why: { pl: 'Od 5 wzwyż → centi (jak polskie „centów”).', en: 'From 5 up → centi.' } },
        { hr: '___ košta sok?', answer: 'Koliko', options: ['Koliko', 'Kako', 'Gdje'], pl: 'Ile kosztuje sok?', en: 'How much is the juice?', why: { pl: '„koliko” = ile.', en: '“koliko” = how much.' } },
        { hr: '10 + 10 = ___', answer: 'dvadeset', options: ['dvadeset', 'dvanaest', 'trideset'], pl: '10 + 10 = dwadzieścia', en: '10 + 10 = twenty', why: { pl: 'dvadeset = 20, dvanaest = 12.', en: 'dvadeset = 20, dvanaest = 12.' } },
        { hr: '___, molim. – Sedam eura.', answer: 'Račun', options: ['Račun', 'Jelovnik', 'Stol'], pl: 'Rachunek, proszę. – Siedem euro.', en: 'The bill, please. – Seven euros.', why: { pl: '„račun” = rachunek.', en: '“račun” = bill.' } },
      ],
      replies: [
        { prompt: 'Koliko košta kava?', ok: 'Dva eura.', bad: ['Dvije eura.', 'Ja sam dva eura.'], why: { pl: 'euro jest rodzaju męskiego → dva eura.', en: 'euro is masculine → dva eura.' } },
        { prompt: 'To je dvanaest eura.', ok: 'Mogu li platiti karticom?', bad: ['Dvanaest je lijep.', 'Nema na čemu.'], why: { pl: 'Pytasz o płatność kartą.', en: 'Ask about paying by card.' } },
        { prompt: 'Gotovina ili kartica?', ok: 'Karticom, molim.', bad: ['Kartica je slobodna.', 'Gotovina je iz Poljske.'], why: { pl: 'Płacę kartą = „karticom” (narzędnik, jak po polsku „kartą”).', en: 'By card = “karticom”.' } },
      ],
      tf: [
        { pl: 'Dwie kawy i sok kosztują siedem euro.', en: 'Two coffees and a juice cost seven euros.', answer: true },
        { pl: 'Marek płaci gotówką.', en: 'Marek pays cash.', answer: false },
        { pl: 'Lody kosztują 2,50 €.', en: 'The ice cream costs €2.50.', answer: true },
      ],
    },

    // ───────────── Boss ─────────────
    {
      id: 'd3boss',
      boss: true,
      scene: 'cafe',
      place: { hr: 'Kafić na Cvjetnom', pl: 'Kawiarnia na placu Kwiatowym', en: 'Café on Flower Square' },
      title: { hr: 'Kava s Ivanom', pl: 'Kawa z Ivaną', en: 'Coffee with Ivana' },
      tags: ['present', 'akuzativ', 'polite', 'numbers'],
      words: [
        { hr: 'naravno', pl: 'oczywiście', en: 'of course', pos: 'adv', cat: 'basics', ico: '✔️', ex: { hr: 'Naravno, izvolite.', pl: 'Oczywiście, proszę.', en: 'Of course, here you are.' } },
        { hr: 'zadržite ostatak', pl: 'reszty nie trzeba', en: 'keep the change', pos: 'phrase', cat: 'money', ico: '🙂', ex: { hr: 'Hvala, zadržite ostatak.', pl: 'Dziękuję, reszty nie trzeba.', en: 'Thanks, keep the change.' } },
      ],
      intro: {
        pl: 'Ivana zaprasza: „Idemo na kavu!” Siadacie na placu Kwiatowym (Cvjetni trg). Zamówienie i rachunek – to twoje zadanie.',
        en: 'Ivana says: “Idemo na kavu!” You sit down on Flower Square (Cvjetni trg). Ordering and paying – that’s your job.',
      },
      story: [
        { narr: { pl: 'Taras jest pełny. Widzisz jeden wolny stolik.', en: 'The terrace is full. You spot one free table.' } },
        { who: 'Marek', hr: '…', pl: 'Jak zapytasz kelnerkę, czy stolik jest wolny?', en: 'How do you ask the waitress if the table is free?', options: ['Oprostite, je li ovaj stol slobodan?', 'Oprostite, je li ovaj stol slobodna?', 'Oprostite, gdje je kava?'], answer: 0, why: { pl: 'stol (m.) → slobodan.', en: 'stol (m.) → slobodan.' } },
        { who: 'Konobarica', hr: 'Da, izvolite! Što želite?', pl: 'Tak, proszę! Co podać?', en: 'Yes, please! What would you like?', options: ['Jednu bijelu kavu i jedan sok, molim.', 'Jedna bijela kava i jedan sok je.', 'Ja sam bijela kava.'], answer: 0, why: { pl: 'Zamówienie w bierniku: jednu bijelu kavu.', en: 'Order in the accusative: jednu bijelu kavu.' } },
        { who: 'Ivana', hr: 'Ja ću kavu s mlijekom. I nešto slatko?', pl: 'Ja wezmę kawę z mlekiem. I coś słodkiego?', en: "I'll have a coffee with milk. And something sweet?" },
        { who: 'Konobarica', hr: 'Imamo kolač i palačinke.', pl: 'Mamy ciasto i naleśniki.', en: 'We have cake and crêpes.', options: ['Može jedna palačinka s čokoladom!', 'Može jednu palačinka s čokoladom!', 'Palačinka je stol.'], answer: 0, why: { pl: '„Može…” + mianownik (bo to zgoda, nie „chcę”): jedna palačinka.', en: '“Može…” + nominative: jedna palačinka.' } },
        { who: 'Konobarica', hr: 'Odmah!', pl: 'Już podaję!', en: 'Right away!' },
        { narr: { pl: 'Kawa jest pyszna. Po godzinie rozmowy prosisz o rachunek.', en: 'The coffee is delicious. After an hour of chatting you ask for the bill.' } },
        { who: 'Marek', hr: '…', pl: 'Poproś o rachunek.', en: 'Ask for the bill.', options: ['Račun, molim.', 'Jelovnik, molim.', 'Stol, molim.'], answer: 0, why: { pl: 'Rachunek = račun.', en: 'Bill = račun.' } },
        { who: 'Konobarica', hr: 'To je osam eura i pedeset centi.', pl: 'To osiem euro pięćdziesiąt.', en: "That's eight euros fifty.", options: ['Mogu li platiti karticom?', 'Koliko košta?', 'Odakle ste?'], answer: 0, why: { pl: 'Cena już padła – pytasz o kartę.', en: 'You know the price – ask about card payment.' } },
        { who: 'Konobarica', hr: 'Nažalost, samo gotovina.', pl: 'Niestety, tylko gotówka.', en: 'Unfortunately, cash only.' },
        { who: 'Marek', hr: '…', pl: 'Dajesz 10 €. Co mówisz?', en: 'You give €10. What do you say?', options: ['Deset eura, izvolite. Zadržite ostatak.', 'Dvanaest eura, izvolite.', 'Deset centi, hvala.'], answer: 0, why: { pl: '10 = deset; „zadržite ostatak” = reszty nie trzeba.', en: '10 = deset; “zadržite ostatak” = keep the change.' } },
        { who: 'Konobarica', hr: 'Hvala lijepa! Doviđenja!', pl: 'Dziękuję bardzo! Do widzenia!', en: 'Thank you very much! Goodbye!' },
        { narr: { pl: 'Ivana się śmieje: „Govoriš kao pravi Zagrepčanin!” – mówisz jak prawdziwy zagrzebianin. ☕', en: 'Ivana laughs: “Govoriš kao pravi Zagrepčanin!” – you talk like a real local. ☕' } },
      ],
    },
  ],
};
