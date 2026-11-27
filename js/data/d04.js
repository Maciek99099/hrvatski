// Dzielnica 4: Tržnica Dolac (targ) – owoce, warzywa, kolory, zgodność przymiotników, biernik, ilości i miary.
// Rozwidlenie: Warzywa ALBO Kwiaciarnia (kolory). Lekcja 4 wymaga jednej z nich.
export default {
  id: 'd4',
  lessons: [
    // ───────────── Lekcja 1 ─────────────
    {
      id: 'd4l1',
      scene: 'market',
      place: { hr: 'Voće', pl: 'Stragan z owocami', en: 'Fruit stall' },
      title: { hr: 'Svježe voće', pl: 'Owoce', en: 'Fruit' },
      tags: ['akuzativ'],
      words: [
        { hr: 'voće', pl: 'owoce', en: 'fruit', pos: 'noun', g: 'n', cat: 'fruit', ico: '🧺', ex: { hr: 'Voće je svježe.', pl: 'Owoce są świeże.', en: 'The fruit is fresh.' } },
        { hr: 'jabuka', pl: 'jabłko', en: 'apple', pos: 'noun', g: 'f', cat: 'fruit', ico: '🍎', ex: { hr: 'Jedna jabuka, molim.', pl: 'Jedno jabłko, proszę.', en: 'One apple, please.' } },
        { hr: 'kruška', pl: 'gruszka', en: 'pear', pos: 'noun', g: 'f', cat: 'fruit', ico: '🍐', ex: { hr: 'Kruška je slatka.', pl: 'Gruszka jest słodka.', en: 'The pear is sweet.' } },
        { hr: 'banana', pl: 'banan', en: 'banana', pos: 'noun', g: 'f', cat: 'fruit', ico: '🍌', ex: { hr: 'Hoću bananu.', pl: 'Chcę banana.', en: 'I want a banana.' } },
        { hr: 'naranča', pl: 'pomarańcza', en: 'orange', pos: 'noun', g: 'f', cat: 'fruit', ico: '🍊', ex: { hr: 'Sok od naranče.', pl: 'Sok pomarańczowy.', en: 'Orange juice.' } },
        { hr: 'limun', pl: 'cytryna', en: 'lemon', pos: 'noun', g: 'm', cat: 'fruit', ico: '🍋', ex: { hr: 'Čaj s limunom.', pl: 'Herbata z cytryną.', en: 'Tea with lemon.' } },
        { hr: 'jagoda', pl: 'truskawka', en: 'strawberry', pos: 'noun', g: 'f', cat: 'fruit', ico: '🍓', ex: { hr: 'Jagode su slatke.', pl: 'Truskawki są słodkie.', en: 'Strawberries are sweet.' } },
        { hr: 'trešnja', pl: 'czereśnia', en: 'cherry', pos: 'noun', g: 'f', cat: 'fruit', ico: '🍒', ex: { hr: 'Trešnje su crvene.', pl: 'Czereśnie są czerwone.', en: 'Cherries are red.' } },
        { hr: 'grožđe', pl: 'winogrona', en: 'grapes', pos: 'noun', g: 'n', cat: 'fruit', ico: '🍇', ex: { hr: 'Grožđe je slatko.', pl: 'Winogrona są słodkie.', en: 'The grapes are sweet.' } },
        { hr: 'lubenica', pl: 'arbuz', en: 'watermelon', pos: 'noun', g: 'f', cat: 'fruit', ico: '🍉', ex: { hr: 'Jednu lubenicu, molim.', pl: 'Jednego arbuza, proszę.', en: 'One watermelon, please.' } },
        { hr: 'breskva', pl: 'brzoskwinia', en: 'peach', pos: 'noun', g: 'f', cat: 'fruit', ico: '🍑', ex: { hr: 'Breskva je zrela.', pl: 'Brzoskwinia jest dojrzała.', en: 'The peach is ripe.' } },
        { hr: 'svjež', pl: 'świeży', en: 'fresh', pos: 'adj', cat: 'adjectives', ico: '🌿', ex: { hr: 'Sve je svježe.', pl: 'Wszystko jest świeże.', en: 'Everything is fresh.' } },
      ],
      grammar: {
        title: { pl: 'Fałszywi przyjaciele na targu + liczba mnoga', en: 'Plurals at the market' },
        body: {
          pl: `<p>⚠️ <b>jagoda</b> = <b>truskawka</b>! Polska jagoda (borówka) to po chorwacku <i>borovnica</i>.</p>
<p>⚠️ <b>voće</b> = owoce (rzeczownik zbiorowy, liczba pojedyncza: <i>voće je svježe</i>). Tak samo <b>grožđe</b> = winogrona: <i>grožđe je slatko</i>.</p>
<p><b>Liczba mnoga</b> rzeczowników żeńskich: <b>-a → -e</b>: <i>jabuka → jabuke, jagoda → jagode, trešnja → trešnje</i>.</p>
<p>Męskie: <b>+ -i</b> (często <b>-ovi</b> w krótkich słowach): <i>limun → limuni</i>.</p>
<p>W bierniku l.mn. żeńskie też mają <b>-e</b>: <i>Želim jabuke.</i> (Chcę jabłka.)</p>
<p>Ijekawica: <b>svjež</b> (świeży), <b>mlijeko</b>, <b>lijep</b> – w standardzie chorwackim <i>-je-/-ije-</i>.</p>`,
          en: `<p>⚠️ <b>voće</b> = fruit (collective, singular: <i>voće je svježe</i>). Likewise <b>grožđe</b> = grapes.</p>
<p><b>Plural</b> of feminine nouns: <b>-a → -e</b>: <i>jabuka → jabuke, jagoda → jagode</i>.</p>
<p>Masculine: <b>+ -i</b>: <i>limun → limuni</i>.</p>
<p>Feminine accusative plural also ends in <b>-e</b>: <i>Želim jabuke.</i> (I want apples.)</p>
<p>Standard Croatian uses <i>-je-/-ije-</i>: <b>svjež</b>, <b>mlijeko</b>, <b>lijep</b>.</p>`,
        },
        examples: [
          { hr: 'Jagode su slatke.', pl: 'Truskawki są słodkie.', en: 'The strawberries are sweet.' },
          { hr: 'Želim jabuke i kruške.', pl: 'Chcę jabłka i gruszki.', en: 'I want apples and pears.' },
          { hr: 'Voće je svježe.', pl: 'Owoce są świeże.', en: 'The fruit is fresh.' },
        ],
      },
      dialog: {
        title: { pl: 'Pod czerwonymi parasolami', en: 'Under the red umbrellas' },
        lines: [
          { who: 'Prodavačica', hr: 'Dobro jutro! Izvolite, svježe voće!', pl: 'Dzień dobry! Proszę, świeże owoce!', en: 'Good morning! Fresh fruit, here!' },
          { who: 'Marek', hr: 'Dobro jutro! Jesu li jagode slatke?', pl: 'Dzień dobry! Czy truskawki są słodkie?', en: 'Good morning! Are the strawberries sweet?' },
          { who: 'Prodavačica', hr: 'Jako slatke! I trešnje su lijepe.', pl: 'Bardzo słodkie! I czereśnie są piękne.', en: 'Very sweet! And the cherries are lovely.' },
          { who: 'Marek', hr: 'Želim jagode i jednu lubenicu.', pl: 'Chcę truskawki i jednego arbuza.', en: 'I want strawberries and one watermelon.' },
          { who: 'Prodavačica', hr: 'Može! Još nešto? Limun, naranče?', pl: 'Jasne! Coś jeszcze? Cytryna, pomarańcze?', en: 'Sure! Anything else? Lemon, oranges?' },
          { who: 'Marek', hr: 'Jedan limun, molim. Hvala!', pl: 'Jedną cytrynę, proszę. Dziękuję!', en: 'One lemon, please. Thanks!' },
        ],
      },
      sentences: [
        { hr: 'Jagode su slatke.', pl: 'Truskawki są słodkie.', en: ['Strawberries are sweet.', 'The strawberries are sweet.'], why: { pl: 'jagoda = truskawka (nie jagoda!).', en: 'jagoda = strawberry.' } },
        { hr: 'Želim jednu lubenicu.', pl: ['Chcę jednego arbuza.', 'Poproszę jednego arbuza.', 'Chcę jeden arbuz.'], en: ['I want one watermelon.', 'I want a watermelon.'] },
        { hr: 'Voće je svježe.', pl: 'Owoce są świeże.', en: ['The fruit is fresh.', 'Fruit is fresh.'], why: { pl: 'voće – l. pojedyncza, rodzaj nijaki → je svježe.', en: 'voće is singular neuter → je svježe.' } },
        { hr: 'Jedan limun, molim.', pl: ['Jedną cytrynę, proszę.', 'Poproszę jedną cytrynę.'], en: ['One lemon, please.', 'A lemon, please.'], why: { pl: '⚠️ limun jest rodzaju męskiego (cytryna – żeński).', en: 'limun is masculine.' } },
        { hr: 'Hoću bananu i krušku.', pl: ['Chcę banana i gruszkę.', 'Chcę banana i jedną gruszkę.'], en: ['I want a banana and a pear.'] },
        { hr: 'Trešnje su crvene.', pl: 'Czereśnie są czerwone.', en: ['Cherries are red.', 'The cherries are red.'] },
        { hr: 'Grožđe je slatko.', pl: ['Winogrona są słodkie.', 'Winogrono jest słodkie.'], en: ['The grapes are sweet.', 'Grapes are sweet.'] },
        { hr: 'Čaj s limunom, molim.', pl: ['Herbata z cytryną, proszę.', 'Poproszę herbatę z cytryną.'], en: 'Tea with lemon, please.' },
      ],
      cloze: [
        { hr: 'Jagode ___ slatke.', answer: 'su', options: ['su', 'je', 'smo'], pl: 'Truskawki są słodkie.', en: 'The strawberries are sweet.', why: { pl: 'Liczba mnoga → su.', en: 'Plural → su.' } },
        { hr: 'Voće ___ svježe.', answer: 'je', options: ['je', 'su', 'si'], pl: 'Owoce są świeże.', en: 'The fruit is fresh.', why: { pl: 'voće to l. pojedyncza → je (inaczej niż po polsku!).', en: 'voće is singular → je.' } },
        { hr: 'Želim jednu ___.', answer: 'lubenicu', options: ['lubenicu', 'lubenica', 'lubenice'], pl: 'Chcę jednego arbuza.', en: 'I want one watermelon.', why: { pl: 'Biernik l.poj. żeński: -a → -u.', en: 'Feminine accusative: -a → -u.' } },
        { hr: 'Jedna jabuka, dvije ___.', answer: 'jabuke', options: ['jabuke', 'jabuka', 'jabuku'], pl: 'Jedno jabłko, dwa jabłka.', en: 'One apple, two apples.', why: { pl: 'Po 2–4 forma na -e: dvije jabuke.', en: 'After 2–4: dvije jabuke.' } },
        { hr: 'Hoću ___ (= truskawki).', answer: 'jagode', options: ['jagode', 'borovnice', 'trešnje'], pl: 'Chcę truskawki.', en: 'I want strawberries.', why: { pl: 'truskawka = jagoda; borovnica = borówka (polska jagoda).', en: 'strawberry = jagoda.' } },
      ],
      replies: [
        { prompt: 'Izvolite, svježe voće!', ok: 'Želim jagode, molim.', bad: ['Jagode su ja.', 'Ja sam voće.'], why: { pl: 'Zamawiasz: „Želim…, molim”.', en: 'Order: “Želim…, molim”.' } },
        { prompt: 'Jesu li trešnje slatke?', ok: 'Da, jako su slatke!', bad: ['Da, jako je sladak!', 'Ne, ja sam trešnja.'], why: { pl: 'trešnje (l.mn.) → su slatke.', en: 'trešnje (pl.) → su slatke.' } },
        { prompt: 'Još nešto?', ok: 'Jedan limun, molim.', bad: ['Jedna limun, molim.', 'Limun je stol.'], why: { pl: 'limun – męski → jedan limun.', en: 'limun is masculine → jedan limun.' } },
      ],
      tf: [
        { pl: 'Marek kupuje truskawki.', en: 'Marek buys strawberries.', answer: true },
        { pl: 'Marek kupuje dwa arbuzy.', en: 'Marek buys two watermelons.', answer: false },
        { pl: 'Na końcu Marek bierze cytrynę.', en: 'At the end Marek takes a lemon.', answer: true },
      ],
    },

    // ───────────── Lekcja 2 (odnoga A) ─────────────
    {
      id: 'd4l2',
      after: ['d4l1'],
      scene: 'market',
      place: { hr: 'Povrće', pl: 'Stragan z warzywami', en: 'Vegetable stall' },
      title: { hr: 'Povrće s placa', pl: 'Warzywa', en: 'Vegetables' },
      tags: ['akuzativ'],
      words: [
        { hr: 'povrće', pl: 'warzywa', en: 'vegetables', pos: 'noun', g: 'n', cat: 'vegetables', ico: '🥬', ex: { hr: 'Povrće je s placa.', pl: 'Warzywa są z targu.', en: 'The vegetables are from the market.' } },
        { hr: 'rajčica', pl: 'pomidor', en: 'tomato', pos: 'noun', g: 'f', cat: 'vegetables', ico: '🍅', ex: { hr: 'Rajčice su crvene.', pl: 'Pomidory są czerwone.', en: 'The tomatoes are red.' } },
        { hr: 'krumpir', pl: 'ziemniak', en: 'potato', pos: 'noun', g: 'm', cat: 'vegetables', ico: '🥔', ex: { hr: 'Kila krumpira.', pl: 'Kilo ziemniaków.', en: 'A kilo of potatoes.' } },
        { hr: 'luk', pl: 'cebula', en: 'onion', pos: 'noun', g: 'm', cat: 'vegetables', ico: '🧅', ex: { hr: 'Crveni luk je sladak.', pl: 'Czerwona cebula jest słodka.', en: 'Red onion is sweet.' } },
        { hr: 'češnjak', pl: 'czosnek', en: 'garlic', pos: 'noun', g: 'm', cat: 'vegetables', ico: '🧄', ex: { hr: 'Treba mi češnjak.', pl: 'Potrzebuję czosnku.', en: 'I need garlic.' } },
        { hr: 'mrkva', pl: 'marchew', en: 'carrot', pos: 'noun', g: 'f', cat: 'vegetables', ico: '🥕', ex: { hr: 'Mrkva je slatka.', pl: 'Marchew jest słodka.', en: 'The carrot is sweet.' } },
        { hr: 'paprika', pl: 'papryka', en: 'pepper', pos: 'noun', g: 'f', cat: 'vegetables', ico: '🫑', ex: { hr: 'Jednu papriku, molim.', pl: 'Jedną paprykę, proszę.', en: 'One pepper, please.' } },
        { hr: 'krastavac', pl: 'ogórek', en: 'cucumber', pos: 'noun', g: 'm', cat: 'vegetables', ico: '🥒', ex: { hr: 'Krastavac je svjež.', pl: 'Ogórek jest świeży.', en: 'The cucumber is fresh.' } },
        { hr: 'salata', pl: 'sałata', en: 'lettuce, salad', pos: 'noun', g: 'f', cat: 'vegetables', ico: '🥗', ex: { hr: 'Salata je svježa.', pl: 'Sałata jest świeża.', en: 'The lettuce is fresh.' } },
        { hr: 'grah', pl: 'fasola', en: 'beans', pos: 'noun', g: 'm', cat: 'vegetables', ico: '🫘', ex: { hr: 'Grah je ukusan.', pl: 'Fasola jest smaczna.', en: 'The beans are tasty.' } },
        { hr: 'kupovati', pl: 'kupować', en: 'to buy', pos: 'verb', cat: 'verbs', ico: '🛍️', ex: { hr: 'Kupujem povrće.', pl: 'Kupuję warzywa.', en: "I'm buying vegetables." } },
        { hr: 'treba mi', pl: 'potrzebuję', en: 'I need', pos: 'phrase', cat: 'shopping', ico: '📝', ex: { hr: 'Treba mi luk.', pl: 'Potrzebuję cebuli.', en: 'I need an onion.' } },
      ],
      grammar: {
        title: { pl: 'Kupujem + biernik; fałszywi przyjaciele', en: 'Kupujem + accusative' },
        body: {
          pl: `<p><b>kupovati</b> (kupować): <i>kupujem, kupuješ, kupuje, kupujemo, kupujete, kupuju</i> – „-ova-” zmienia się w „-uj-”, zupełnie jak po polsku!</p>
<p>Po „kupujem” biernik: <i>Kupujem papriku, salatu</i> (ż. -u) · <i>krumpir, luk</i> (m. bez zmian).</p>
<p><b>Treba mi…</b> = potrzebuję… (dosł. „trzeba mi”): <i>Treba mi češnjak.</i></p>
<p>⚠️ Fałszywi przyjaciele:</p>
<table class="gtable"><tr><th>chorwacki</th><th>znaczy</th><th>uwaga</th></tr>
<tr><td>luk</td><td>cebula</td><td>nie „łuk”</td></tr><tr><td>grah</td><td>fasola</td><td>groch = <i>grašak</i></td></tr>
<tr><td>rajčica</td><td>pomidor</td><td>w Dalmacji też <i>pomidor</i></td></tr><tr><td>paprika</td><td>papryka (warzywo)</td><td>przyprawa: <i>mljevena paprika</i></td></tr></table>`,
          en: `<p><b>kupovati</b> (to buy): <i>kupujem, kupuješ, kupuje, kupujemo, kupujete, kupuju</i> – “-ova-” becomes “-uj-”.</p>
<p>After “kupujem” use the accusative: <i>Kupujem papriku, salatu</i> (f. -u) · <i>krumpir, luk</i> (m. unchanged).</p>
<p><b>Treba mi…</b> = I need… (lit. “it is needed to me”).</p>
<p>⚠️ <b>luk</b> = onion, <b>grah</b> = beans, <b>rajčica</b> = tomato (on the coast also <i>pomidor</i>).</p>`,
        },
        examples: [
          { hr: 'Kupujem rajčice i krastavac.', pl: 'Kupuję pomidory i ogórka.', en: "I'm buying tomatoes and a cucumber." },
          { hr: 'Treba mi luk i češnjak.', pl: 'Potrzebuję cebuli i czosnku.', en: 'I need onion and garlic.' },
        ],
      },
      dialog: {
        title: { pl: 'Na zupę', en: 'For a soup' },
        lines: [
          { who: 'Ivana', hr: 'Danas kuham grah. Treba mi povrće.', pl: 'Dziś gotuję fasolkę. Potrzebuję warzyw.', en: "I'm cooking beans today. I need vegetables." },
          { who: 'Marek', hr: 'Što kupujemo?', pl: 'Co kupujemy?', en: 'What are we buying?' },
          { who: 'Ivana', hr: 'Luk, češnjak, mrkvu i krumpir.', pl: 'Cebulę, czosnek, marchew i ziemniaki.', en: 'Onion, garlic, a carrot and potatoes.' },
          { who: 'Prodavač', hr: 'Izvolite! Mrkva je svježa, iz Zagorja.', pl: 'Proszę! Marchew jest świeża, z Zagoria.', en: 'Here you are! The carrots are fresh, from Zagorje.' },
          { who: 'Marek', hr: 'I jednu papriku za salatu, molim.', pl: 'I jedną paprykę do sałatki, proszę.', en: 'And one pepper for the salad, please.' },
          { who: 'Prodavač', hr: 'Može. Još nešto?', pl: 'Jasne. Coś jeszcze?', en: 'Sure. Anything else?' },
        ],
      },
      sentences: [
        { hr: 'Kupujem povrće.', pl: ['Kupuję warzywa.', 'Ja kupuję warzywa.'], en: ["I'm buying vegetables.", 'I buy vegetables.'], why: { pl: 'povrće – rzeczownik zbiorowy (l. poj.).', en: 'povrće is a collective noun (singular).' } },
        { hr: 'Treba mi luk.', pl: ['Potrzebuję cebuli.', 'Potrzebuję cebulę.'], en: ['I need an onion.', 'I need onion.', 'I need onions.'], why: { pl: '⚠️ luk = cebula, nie łuk.', en: 'luk = onion.' } },
        { hr: 'Rajčice su crvene.', pl: 'Pomidory są czerwone.', en: ['The tomatoes are red.', 'Tomatoes are red.'] },
        { hr: 'Jednu papriku, molim.', pl: ['Jedną paprykę, proszę.', 'Poproszę jedną paprykę.'], en: ['One pepper, please.', 'A pepper, please.'] },
        { hr: 'Krastavac je svjež.', pl: 'Ogórek jest świeży.', en: 'The cucumber is fresh.' },
        { hr: 'Mrkva je slatka.', pl: 'Marchew jest słodka.', en: ['The carrot is sweet.', 'Carrots are sweet.'] },
        { hr: 'Grah je ukusan.', pl: 'Fasola jest smaczna.', en: ['The beans are tasty.', 'Beans are tasty.'], why: { pl: '⚠️ grah = fasola (rodzaj męski), groch = grašak.', en: 'grah = beans.' } },
        { hr: 'Mi kupujemo salatu.', pl: ['Kupujemy sałatę.', 'My kupujemy sałatę.'], en: ["We're buying lettuce.", 'We are buying lettuce.', 'We buy lettuce.'] },
      ],
      cloze: [
        { hr: 'Ja ___ krumpir.', answer: 'kupujem', options: ['kupujem', 'kupovati', 'kupuju'], pl: 'Kupuję ziemniaki.', en: "I'm buying potatoes.", why: { pl: 'ja → kupujem (-ova- → -uj-).', en: 'ja → kupujem.' } },
        { hr: 'Kupujem ___.', answer: 'mrkvu', options: ['mrkvu', 'mrkva', 'mrkve'], pl: 'Kupuję marchew.', en: "I'm buying a carrot.", why: { pl: 'Biernik żeński: -a → -u.', en: 'Feminine accusative: -a → -u.' } },
        { hr: '___ mi češnjak.', answer: 'Treba', options: ['Treba', 'Trebam', 'Je'], pl: 'Potrzebuję czosnku.', en: 'I need garlic.', why: { pl: '„Treba mi…” = potrzebuję.', en: '“Treba mi…” = I need.' } },
        { hr: 'Salata je ___.', answer: 'svježa', options: ['svježa', 'svjež', 'svježe'], pl: 'Sałata jest świeża.', en: 'The lettuce is fresh.', why: { pl: 'salata (ż.) → svježa.', en: 'salata (f.) → svježa.' } },
      ],
      replies: [
        { prompt: 'Što kupujete?', ok: 'Kupujem luk i papriku.', bad: ['Kupujem luk i paprika.', 'Ja sam luk.'], why: { pl: 'Biernik: papriku.', en: 'Accusative: papriku.' } },
        { prompt: 'Treba li vam još nešto?', ok: 'Da, treba mi češnjak.', bad: ['Da, ja sam češnjak.', 'Ne, ja sam iz Poljske.'], why: { pl: '„Treba mi…” = potrzebuję.', en: '“Treba mi…” = I need.' } },
        { prompt: 'Je li mrkva svježa?', ok: 'Da, mrkva je svježa.', bad: ['Da, mrkva je svjež.', 'Da, ja sam svjež.'], why: { pl: 'mrkva (ż.) → svježa.', en: 'mrkva (f.) → svježa.' } },
      ],
      tf: [
        { pl: 'Ivana gotuje fasolkę.', en: 'Ivana is cooking beans.', answer: true },
        { pl: 'Kupują pomidory.', en: 'They buy tomatoes.', answer: false },
        { pl: 'Marchew jest z Zagoria.', en: 'The carrots are from Zagorje.', answer: true },
      ],
    },

    // ───────────── Lekcja 3 (odnoga B) ─────────────
    {
      id: 'd4l3',
      after: ['d4l1'],
      scene: 'park',
      place: { hr: 'Cvjećarnica', pl: 'Kwiaciarnia', en: 'Flower stall' },
      title: { hr: 'Koje boje?', pl: 'Kolory i zgodność', en: 'Colours and agreement' },
      tags: ['gender'],
      words: [
        { hr: 'boja', pl: 'kolor', en: 'colour', pos: 'noun', g: 'f', cat: 'colors', ico: '🎨', ex: { hr: 'Koje je boje?', pl: 'Jakiego jest koloru?', en: 'What colour is it?' } },
        { hr: 'crven', pl: 'czerwony', en: 'red', pos: 'adj', cat: 'colors', ico: '🔴', ex: { hr: 'Ruža je crvena.', pl: 'Róża jest czerwona.', en: 'The rose is red.' } },
        { hr: 'žut', pl: 'żółty', en: 'yellow', pos: 'adj', cat: 'colors', ico: '🟡', ex: { hr: 'Limun je žut.', pl: 'Cytryna jest żółta.', en: 'The lemon is yellow.' } },
        { hr: 'zelen', pl: 'zielony', en: 'green', pos: 'adj', cat: 'colors', ico: '🟢', ex: { hr: 'Salata je zelena.', pl: 'Sałata jest zielona.', en: 'The lettuce is green.' } },
        { hr: 'plav', pl: 'niebieski', en: 'blue', pos: 'adj', cat: 'colors', ico: '🔵', ex: { hr: 'Tramvaj je plav.', pl: 'Tramwaj jest niebieski.', en: 'The tram is blue.' } },
        { hr: 'bijel', pl: 'biały', en: 'white', pos: 'adj', cat: 'colors', ico: '⚪', ex: { hr: 'Bijela kava.', pl: 'Biała kawa.', en: 'White coffee.' } },
        { hr: 'crn', pl: 'czarny', en: 'black', pos: 'adj', cat: 'colors', ico: '⚫', ex: { hr: 'Crna kava, molim.', pl: 'Czarna kawa, proszę.', en: 'Black coffee, please.' } },
        { hr: 'narančast', pl: 'pomarańczowy', en: 'orange', pos: 'adj', cat: 'colors', ico: '🟠', ex: { hr: 'Mrkva je narančasta.', pl: 'Marchew jest pomarańczowa.', en: 'The carrot is orange.' } },
        { hr: 'ljubičast', pl: 'fioletowy', en: 'purple', pos: 'adj', cat: 'colors', ico: '🟣', ex: { hr: 'Ljubičasto cvijeće.', pl: 'Fioletowe kwiaty.', en: 'Purple flowers.' } },
        { hr: 'cvijeće', pl: 'kwiaty', en: 'flowers', pos: 'noun', g: 'n', cat: 'shopping', ico: '💐', ex: { hr: 'Cvijeće je lijepo.', pl: 'Kwiaty są piękne.', en: 'The flowers are beautiful.' } },
        { hr: 'ruža', pl: 'róża', en: 'rose', pos: 'noun', g: 'f', cat: 'shopping', ico: '🌹', ex: { hr: 'Jedna crvena ruža.', pl: 'Jedna czerwona róża.', en: 'One red rose.' } },
        { hr: 'koji', pl: 'który, jaki', en: 'which', pos: 'pron', cat: 'questions', ico: '🤔', ex: { hr: 'Koju ružu želite?', pl: 'Którą różę Pan chce?', en: 'Which rose would you like?' } },
      ],
      grammar: {
        title: { pl: 'Kolory zgadzają się z rzeczownikiem', en: 'Colours agree with the noun' },
        body: {
          pl: `<table class="gtable"><tr><th>m.</th><th>ż.</th><th>n.</th><th></th></tr>
<tr><td>crven / crveni</td><td>crvena</td><td>crveno</td><td>czerwony</td></tr>
<tr><td>žut / žuti</td><td>žuta</td><td>žuto</td><td>żółty</td></tr>
<tr><td>plav / plavi</td><td>plava</td><td>plavo</td><td>niebieski</td></tr>
<tr><td>bijel / bijeli</td><td>bijela</td><td>bijelo</td><td>biały</td></tr></table>
<p>Po „je” forma krótka: <i>Limun je žut.</i> Przed rzeczownikiem męskim zwykle forma na <b>-i</b>: <i>crven<b>i</b> luk, žut<b>i</b> limun</i>.</p>
<p>⚠️ <b>plav</b> = <b>niebieski</b> (Zagrzeb ma niebieskie tramwaje: <i>plavi tramvaj</i>). <i>Plavuša</i> to blondynka.</p>
<p>⚠️ <b>crno vino</b> = czerwone wino (dosł. „czarne”); <b>crna kava</b> = czarna kawa.</p>
<p><b>cvijeće</b> = kwiaty (zbiorowe, l. poj.): <i>cvijeće je lijepo</i>; jeden kwiat = <i>cvijet</i>.</p>`,
          en: `<table class="gtable"><tr><th>m.</th><th>f.</th><th>n.</th><th></th></tr>
<tr><td>crven / crveni</td><td>crvena</td><td>crveno</td><td>red</td></tr>
<tr><td>žut / žuti</td><td>žuta</td><td>žuto</td><td>yellow</td></tr>
<tr><td>plav / plavi</td><td>plava</td><td>plavo</td><td>blue</td></tr>
<tr><td>bijel / bijeli</td><td>bijela</td><td>bijelo</td><td>white</td></tr></table>
<p>After “je” use the short form: <i>Limun je žut.</i> Before a masculine noun usually <b>-i</b>: <i>crven<b>i</b> luk</i>.</p>
<p>⚠️ <b>crno vino</b> = red wine (lit. “black wine”).</p>
<p><b>cvijeće</b> = flowers (collective, singular); one flower = <i>cvijet</i>.</p>`,
        },
        examples: [
          { hr: 'Ruža je crvena, a limun je žut.', pl: 'Róża jest czerwona, a cytryna żółta.', en: 'The rose is red and the lemon is yellow.' },
          { hr: 'Zagrebački tramvaj je plav.', pl: 'Zagrzebski tramwaj jest niebieski.', en: 'The Zagreb tram is blue.' },
        ],
      },
      dialog: {
        title: { pl: 'Kwiaty dla Ivany', en: 'Flowers for Ivana' },
        lines: [
          { who: 'Cvjećarka', hr: 'Dobar dan! Cvijeće za nekoga?', pl: 'Dzień dobry! Kwiaty dla kogoś?', en: 'Hello! Flowers for someone?' },
          { who: 'Marek', hr: 'Da, za prijateljicu. Koje su boje ruže?', pl: 'Tak, dla przyjaciółki. Jakiego koloru są róże?', en: 'Yes, for a friend. What colours are the roses?' },
          { who: 'Cvjećarka', hr: 'Crvene, bijele i žute.', pl: 'Czerwone, białe i żółte.', en: 'Red, white and yellow.' },
          { who: 'Marek', hr: 'Hmm… koja je boja lijepa za prijateljicu?', pl: 'Hmm… który kolor jest ładny dla przyjaciółki?', en: 'Hmm… which colour is nice for a friend?' },
          { who: 'Cvjećarka', hr: 'Žuta! Crvena je za ljubav.', pl: 'Żółty! Czerwony jest na miłość.', en: 'Yellow! Red is for love.' },
          { who: 'Marek', hr: 'Onda jednu žutu ružu, molim.', pl: 'To jedną żółtą różę, proszę.', en: 'Then one yellow rose, please.' },
        ],
      },
      sentences: [
        { hr: 'Ruža je crvena.', pl: 'Róża jest czerwona.', en: 'The rose is red.' },
        { hr: 'Limun je žut.', pl: 'Cytryna jest żółta.', en: 'The lemon is yellow.', why: { pl: 'limun (m.) → žut (choć po polsku „cytryna” – żeńska).', en: 'limun (m.) → žut.' } },
        { hr: 'Tramvaj je plav.', pl: 'Tramwaj jest niebieski.', en: 'The tram is blue.', why: { pl: '⚠️ plav = niebieski.', en: 'plav = blue.' } },
        { hr: 'Salata je zelena.', pl: 'Sałata jest zielona.', en: ['The lettuce is green.', 'The salad is green.'] },
        { hr: 'Cvijeće je lijepo.', pl: 'Kwiaty są piękne.', en: ['The flowers are beautiful.', 'Flowers are beautiful.'], why: { pl: 'cvijeće – l. poj., nijaki → je lijepo.', en: 'cvijeće is singular neuter → je lijepo.' } },
        { hr: 'Jednu žutu ružu, molim.', pl: ['Jedną żółtą różę, proszę.', 'Poproszę jedną żółtą różę.'], en: 'One yellow rose, please.', why: { pl: 'Biernik: i przymiotnik, i rzeczownik na -u.', en: 'Accusative: both adjective and noun in -u.' } },
        { hr: 'Crno vino, molim.', pl: ['Czerwone wino, proszę.', 'Poproszę czerwone wino.'], en: ['Red wine, please.'], why: { pl: '⚠️ crno vino = czerwone wino.', en: 'crno vino = red wine.' } },
        { hr: 'Mrkva je narančasta.', pl: 'Marchew jest pomarańczowa.', en: ['The carrot is orange.', 'Carrots are orange.'] },
      ],
      cloze: [
        { hr: 'Ruža je ___.', answer: 'crvena', options: ['crvena', 'crven', 'crveno'], pl: 'Róża jest czerwona.', en: 'The rose is red.', why: { pl: 'ruža (ż.) → crvena.', en: 'ruža (f.) → crvena.' } },
        { hr: 'Cvijeće je ___.', answer: 'žuto', options: ['žuto', 'žut', 'žuta'], pl: 'Kwiaty są żółte.', en: 'The flowers are yellow.', why: { pl: 'cvijeće (n.) → žuto.', en: 'cvijeće (n.) → žuto.' } },
        { hr: 'Zagrebački tramvaj je ___.', answer: 'plav', options: ['plav', 'crven', 'zelen'], pl: 'Zagrzebski tramwaj jest niebieski.', en: 'The Zagreb tram is blue.', why: { pl: '⚠️ plav = niebieski (nie „płowy”).', en: 'plav = blue.' } },
        { hr: 'Jednu ___ ružu, molim.', answer: 'bijelu', options: ['bijelu', 'bijela', 'bijeli'], pl: 'Jedną białą różę, proszę.', en: 'One white rose, please.', why: { pl: 'Biernik żeński: przymiotnik też -u.', en: 'Feminine accusative: adjective in -u too.' } },
      ],
      replies: [
        { prompt: 'Koju ružu želite?', ok: 'Jednu žutu ružu, molim.', bad: ['Jedna žuta ruža je.', 'Žut, molim.'], why: { pl: 'Biernik: jednu žutu ružu.', en: 'Accusative: jednu žutu ružu.' } },
        { prompt: 'Koje je boje limun?', ok: 'Limun je žut.', bad: ['Limun je žuta.', 'Limun je plav.'], why: { pl: 'limun (m.) → žut.', en: 'limun (m.) → žut.' } },
        { prompt: 'Crno ili bijelo vino?', ok: 'Crno vino, molim.', bad: ['Crna vino, molim.', 'Plavo vino, molim.'], why: { pl: 'vino (n.) → crno.', en: 'vino (n.) → crno.' } },
      ],
      tf: [
        { pl: 'Marek kupuje kwiaty dla przyjaciółki.', en: 'Marek buys flowers for a friend.', answer: true },
        { pl: 'Kwiaciarka poleca czerwoną różę.', en: 'The florist recommends a red rose.', answer: false },
        { pl: 'Marek bierze jedną żółtą różę.', en: 'Marek takes one yellow rose.', answer: true },
      ],
    },

    // ───────────── Lekcja 4 ─────────────
    {
      id: 'd4l4',
      after: ['d4l2', 'd4l3'],
      scene: 'shop',
      place: { hr: 'Vaga', pl: 'Waga na targu', en: 'The scales' },
      title: { hr: 'Kilu jabuka, molim', pl: 'Ilości i miary', en: 'Quantities and measures' },
      tags: ['akuzativ'],
      words: [
        { hr: 'kila', pl: 'kilo', en: 'kilo', pos: 'noun', g: 'f', cat: 'shopping', ico: '⚖️', ex: { hr: 'Kilu jabuka, molim.', pl: 'Kilo jabłek, proszę.', en: 'A kilo of apples, please.' } },
        { hr: 'pola kile', pl: 'pół kilo', en: 'half a kilo', pos: 'phrase', cat: 'shopping', ico: '🌓', ex: { hr: 'Pola kile jagoda.', pl: 'Pół kilo truskawek.', en: 'Half a kilo of strawberries.' } },
        { hr: 'vrećica', pl: 'torebka, reklamówka', en: 'bag', pos: 'noun', g: 'f', cat: 'shopping', ico: '🛍️', ex: { hr: 'Trebate li vrećicu?', pl: 'Potrzebuje Pan torebki?', en: 'Do you need a bag?' } },
        { hr: 'cijena', pl: 'cena', en: 'price', pos: 'noun', g: 'f', cat: 'money', ico: '🏷️', ex: { hr: 'Cijena je dobra.', pl: 'Cena jest dobra.', en: 'The price is good.' } },
        { hr: 'puno', pl: 'dużo', en: 'a lot', pos: 'adv', cat: 'basics', ico: '📦', ex: { hr: 'To je puno!', pl: 'To dużo!', en: "That's a lot!" } },
        { hr: 'to je sve', pl: 'to wszystko', en: "that's all", pos: 'phrase', cat: 'shopping', ico: '✅', ex: { hr: 'Hvala, to je sve.', pl: 'Dziękuję, to wszystko.', en: "Thanks, that's all." } },
        { hr: 'zreo', pl: 'dojrzały', en: 'ripe', pos: 'adj', cat: 'adjectives', ico: '🍑', ex: { hr: 'Breskve su zrele.', pl: 'Brzoskwinie są dojrzałe.', en: 'The peaches are ripe.' } },
        { hr: 'jeftin', pl: 'tani', en: 'cheap', pos: 'adj', cat: 'adjectives', ico: '👍', ex: { hr: 'Krumpir je jeftin.', pl: 'Ziemniaki są tanie.', en: 'Potatoes are cheap.' } },
        { hr: 'skup', pl: 'drogi', en: 'expensive', pos: 'adj', cat: 'adjectives', ico: '💸', ex: { hr: 'Jagode su skupe.', pl: 'Truskawki są drogie.', en: 'Strawberries are expensive.' } },
        { hr: 'dajte mi', pl: 'proszę mi dać', en: 'give me', pos: 'phrase', cat: 'shopping', ico: '🤲', ex: { hr: 'Dajte mi kilu krušaka.', pl: 'Proszę mi dać kilo gruszek.', en: 'Give me a kilo of pears.' } },
        { hr: 'ukupno', pl: 'razem', en: 'in total', pos: 'adv', cat: 'money', ico: '➕', ex: { hr: 'Ukupno pet eura.', pl: 'Razem pięć euro.', en: 'Five euros in total.' } },
      ],
      grammar: {
        title: { pl: 'Ile? – kila, pola kile, komad', en: 'How much? – kila, pola kile, komad' },
        body: {
          pl: `<p>Na targu mówimy w <b>bierniku</b> i z miarą:</p>
<table class="gtable"><tr><th>chorwacki</th><th>polski</th></tr>
<tr><td>kil<b>u</b> jabuka</td><td>kilo jabłek</td></tr><tr><td>pola kile jagoda</td><td>pół kilo truskawek</td></tr>
<tr><td>dvije kile krumpira</td><td>dwa kilo ziemniaków</td></tr><tr><td>jedan komad lubenice</td><td>kawałek arbuza</td></tr></table>
<p>Po mierze rzeczownik idzie do <b>dopełniacza</b> – jak po polsku „kilo jabł<b>ek</b>”. Na razie zapamiętaj gotowe zwroty; całą regułę poznasz w dzielnicy 5.</p>
<p><b>kila</b> (potocznie) = kilogram; w bierniku <b>kilu</b>: <i>Dajte mi kilu…</i></p>
<p>⚠️ <b>skup</b> = <b>drogi</b> (nie „skąpy”!), <b>jeftin</b> = tani.</p>
<p>Przymiotniki z ruchomym <i>e/a</i>: <i>zreo → zrela, zrelo, zreli</i>.</p>`,
          en: `<p>At the market use the <b>accusative</b> with a measure:</p>
<table class="gtable"><tr><th>Croatian</th><th>English</th></tr>
<tr><td>kil<b>u</b> jabuka</td><td>a kilo of apples</td></tr><tr><td>pola kile jagoda</td><td>half a kilo of strawberries</td></tr>
<tr><td>dvije kile krumpira</td><td>two kilos of potatoes</td></tr><tr><td>jedan komad lubenice</td><td>a piece of watermelon</td></tr></table>
<p>After a measure the noun goes into the <b>genitive</b>. For now learn these as set phrases; the full rule comes in district 5.</p>
<p>⚠️ <b>skup</b> = expensive, <b>jeftin</b> = cheap.</p>`,
        },
        examples: [
          { hr: 'Dajte mi kilu jabuka.', pl: 'Proszę mi dać kilo jabłek.', en: 'Give me a kilo of apples.' },
          { hr: 'Pola kile jagoda, molim.', pl: 'Pół kilo truskawek, proszę.', en: 'Half a kilo of strawberries, please.' },
          { hr: 'Hvala, to je sve.', pl: 'Dziękuję, to wszystko.', en: "Thanks, that's all." },
        ],
      },
      dialog: {
        title: { pl: 'Przy wadze', en: 'At the scales' },
        lines: [
          { who: 'Prodavač', hr: 'Izvolite, što trebate?', pl: 'Słucham, czego Pan potrzebuje?', en: 'Yes, what do you need?' },
          { who: 'Marek', hr: 'Dajte mi kilu jabuka i pola kile jagoda.', pl: 'Proszę mi dać kilo jabłek i pół kilo truskawek.', en: 'Give me a kilo of apples and half a kilo of strawberries.' },
          { who: 'Prodavač', hr: 'Jagode su danas malo skupe, ali jako zrele.', pl: 'Truskawki są dziś trochę drogie, ale bardzo dojrzałe.', en: 'Strawberries are a bit expensive today, but very ripe.' },
          { who: 'Marek', hr: 'U redu. Koliko je ukupno?', pl: 'W porządku. Ile razem?', en: 'OK. How much in total?' },
          { who: 'Prodavač', hr: 'Ukupno šest eura. Trebate li vrećicu?', pl: 'Razem sześć euro. Potrzebuje Pan torebki?', en: 'Six euros in total. Do you need a bag?' },
          { who: 'Marek', hr: 'Ne, hvala. To je sve.', pl: 'Nie, dziękuję. To wszystko.', en: "No, thanks. That's all." },
        ],
      },
      sentences: [
        { hr: 'Kilu jabuka, molim.', pl: ['Kilo jabłek, proszę.', 'Poproszę kilo jabłek.'], en: ['A kilo of apples, please.', 'One kilo of apples, please.'] },
        { hr: 'Pola kile jagoda.', pl: 'Pół kilo truskawek.', en: 'Half a kilo of strawberries.' },
        { hr: 'Hvala, to je sve.', pl: ['Dziękuję, to wszystko.', 'Dzięki, to wszystko.'], en: ["Thanks, that's all.", "Thank you, that's all.", 'Thank you, that is all.'] },
        { hr: 'Jagode su skupe.', pl: 'Truskawki są drogie.', en: ['Strawberries are expensive.', 'The strawberries are expensive.'], why: { pl: '⚠️ skup = drogi.', en: 'skup = expensive.' } },
        { hr: 'Krumpir je jeftin.', pl: ['Ziemniaki są tanie.', 'Ziemniak jest tani.'], en: ['Potatoes are cheap.', 'The potatoes are cheap.'] },
        { hr: 'Breskve su zrele.', pl: 'Brzoskwinie są dojrzałe.', en: ['The peaches are ripe.', 'Peaches are ripe.'] },
        { hr: 'Koliko je ukupno?', pl: ['Ile razem?', 'Ile to jest razem?', 'Ile wszystko kosztuje?'], en: ['How much in total?', 'How much is it in total?', 'How much altogether?'] },
        { hr: 'Trebate li vrećicu?', pl: ['Potrzebuje Pan torebki?', 'Potrzebujesz torebki?', 'Czy potrzebuje Pan reklamówki?'], en: ['Do you need a bag?'] },
      ],
      cloze: [
        { hr: 'Dajte mi ___ jabuka.', answer: 'kilu', options: ['kilu', 'kila', 'kile'], pl: 'Proszę mi dać kilo jabłek.', en: 'Give me a kilo of apples.', why: { pl: '„dajte mi” + biernik: kila → kilu.', en: '“dajte mi” + accusative: kilu.' } },
        { hr: 'Jagode su ___ (= drogie).', answer: 'skupe', options: ['skupe', 'jeftine', 'zrele'], pl: 'Truskawki są drogie.', en: 'Strawberries are expensive.', why: { pl: '⚠️ skup = drogi, jeftin = tani.', en: 'skup = expensive.' } },
        { hr: 'Hvala, to je ___.', answer: 'sve', options: ['sve', 'malo', 'puno'], pl: 'Dziękuję, to wszystko.', en: "Thanks, that's all.", why: { pl: '„to je sve” = to wszystko.', en: '“to je sve” = that’s all.' } },
        { hr: 'Koliko je ___? – Šest eura.', answer: 'ukupno', options: ['ukupno', 'kila', 'skup'], pl: 'Ile razem? – Sześć euro.', en: 'How much in total? – Six euros.', why: { pl: '„ukupno” = razem.', en: '“ukupno” = in total.' } },
      ],
      replies: [
        { prompt: 'Što trebate?', ok: 'Dajte mi kilu krumpira.', bad: ['Kila je krumpir.', 'Ja sam kila.'], why: { pl: 'Prosisz: „Dajte mi kilu…”.', en: 'Ask: “Dajte mi kilu…”.' } },
        { prompt: 'Trebate li vrećicu?', ok: 'Ne, hvala. To je sve.', bad: ['Ne, ja sam vrećica.', 'Da, vrećica je skupa.'], why: { pl: 'Odpowiadasz tak/nie i kończysz zakupy.', en: 'Answer and finish shopping.' } },
        { prompt: 'Još nešto?', ok: 'Pola kile jagoda, molim.', bad: ['Pola kila jagoda je.', 'Jagode su pola.'], why: { pl: 'Stały zwrot: pola kile…', en: 'Set phrase: pola kile…' } },
      ],
      tf: [
        { pl: 'Marek kupuje kilo jabłek.', en: 'Marek buys a kilo of apples.', answer: true },
        { pl: 'Truskawki są dziś tanie.', en: 'Strawberries are cheap today.', answer: false },
        { pl: 'Marek bierze torebkę.', en: 'Marek takes a bag.', answer: false },
      ],
    },

    // ───────────── Boss ─────────────
    {
      id: 'd4boss',
      boss: true,
      scene: 'market',
      place: { hr: 'Dolac', pl: 'Targ Dolac', en: 'Dolac market' },
      title: { hr: 'Velika kupovina', pl: 'Wielkie zakupy', en: 'The big shopping trip' },
      tags: ['akuzativ', 'gender', 'numbers'],
      words: [
        { hr: 'popis', pl: 'lista', en: 'list', pos: 'noun', g: 'm', cat: 'shopping', ico: '📝', ex: { hr: 'Popis za kupovinu.', pl: 'Lista zakupów.', en: 'A shopping list.' } },
        { hr: 'borovnica', pl: 'jagoda (borówka)', en: 'blueberry', pos: 'noun', g: 'f', cat: 'fruit', ico: '🫐', ex: { hr: 'Borovnice su plave.', pl: 'Jagody są niebieskie.', en: 'Blueberries are blue.' } },
      ],
      intro: {
        pl: 'Ivana robi kolację dla przyjaciół i daje ci listę zakupów oraz 10 €. Na Dolcu musisz kupić wszystko – i nie pomylić jagód z truskawkami!',
        en: 'Ivana is making dinner for friends. She gives you a shopping list and €10. At Dolac you must buy everything – and not mix up the berries!',
      },
      story: [
        { narr: { pl: 'Lista Ivany: 🍅 rajčice, 🥒 krastavac, 🍓 pola kile jagoda, 🫐 borovnice, 💐 cvijeće.', en: 'Ivana’s list: 🍅 tomatoes, 🥒 cucumber, 🍓 half a kilo of strawberries, 🫐 blueberries, 💐 flowers.' } },
        { who: 'Prodavačica', hr: 'Dobro jutro! Izvolite, svježe povrće!', pl: 'Dzień dobry! Proszę, świeże warzywa!', en: 'Good morning! Fresh vegetables!', options: ['Dobro jutro! Kilu rajčica i jedan krastavac, molim.', 'Dobro jutro! Kila rajčica je krastavac.', 'Laku noć! Rajčice su plave.'], answer: 0, why: { pl: 'Rano: dobro jutro; „kilu rajčica, jedan krastavac”.', en: 'Morning greeting + “kilu rajčica, jedan krastavac”.' } },
        { who: 'Prodavačica', hr: 'Izvolite. Tri eura.', pl: 'Proszę. Trzy euro.', en: 'Here you are. Three euros.', options: ['Tri eura, izvolite.', 'Tri euro, izvolite.', 'Trideset eura, izvolite.'], answer: 0, why: { pl: '3 → tri eura.', en: '3 → tri eura.' } },
        { narr: { pl: 'Idziesz do straganu z owocami. Zostało ci 7 €.', en: 'You go to the fruit stall. You have €7 left.' } },
        { who: 'Prodavač', hr: 'Jagode ili trešnje? Sve je zrelo!', pl: 'Truskawki czy czereśnie? Wszystko dojrzałe!', en: 'Strawberries or cherries? Everything is ripe!', options: ['Pola kile jagoda, molim.', 'Pola kile borovnica, molim… to su jagode, zar ne?', 'Kilu trešnja je sve.'], answer: 0, why: { pl: 'Na liście są truskawki = jagode.', en: 'Strawberries = jagode.' } },
        { who: 'Prodavač', hr: 'Još nešto?', pl: 'Coś jeszcze?', en: 'Anything else?', options: ['Da, borovnice. One su plave, zar ne?', 'Da, jagode. One su plave, zar ne?', 'Ne, ja sam borovnica.'], answer: 0, why: { pl: 'Polska jagoda (borówka) = borovnica – niebieska.', en: 'Blueberry = borovnica.' } },
        { who: 'Prodavač', hr: 'Da, plave su. Ukupno pet eura.', pl: 'Tak, niebieskie. Razem pięć euro.', en: 'Yes, they are blue. Five euros in total.' },
        { narr: { pl: 'Zostały ci 2 €. Na końcu kwiaciarnia.', en: 'You have €2 left. Finally, the flower stall.' } },
        { who: 'Cvjećarka', hr: 'Ruža košta dva eura. Koju boju želite?', pl: 'Róża kosztuje dwa euro. Jaki kolor?', en: 'A rose costs two euros. Which colour?', options: ['Jednu žutu ružu, molim.', 'Jedna žut ruža, molim.', 'Dvije ruže, molim.'], answer: 0, why: { pl: 'Masz 2 € – jedna róża; biernik: jednu žutu ružu.', en: 'You have €2 – one rose; accusative: jednu žutu ružu.' } },
        { who: 'Cvjećarka', hr: 'Izvolite! Trebate li vrećicu?', pl: 'Proszę! Potrzebuje Pan torebki?', en: 'Here you are! Do you need a bag?', options: ['Ne, hvala. To je sve!', 'Da, ja sam vrećica.', 'Koliko je sati?'], answer: 0, why: { pl: 'Kończysz zakupy: „To je sve.”', en: 'Finish shopping: “To je sve.”' } },
        { narr: { pl: 'Wydałeś równo 10 €. Ivana: „Bravo! Sve je savršeno!” 🎉', en: 'You spent exactly €10. Ivana: “Bravo! Sve je savršeno!” 🎉' } },
      ],
    },
  ],
};
