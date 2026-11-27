// Dzielnica 1: Glavni kolodvor (Dworzec Główny) – przyjazd do Zagrzebia.
// Schemat lekcji opisany w README.md („Jak dodać lekcję”).
export default {
  id: 'd1',
  lessons: [
    // ───────────────────────────── Lekcja 1 ─────────────────────────────
    {
      id: 'd1l1',
      scene: 'platform',
      place: { hr: 'Peron 1', pl: 'Peron 1', en: 'Platform 1' },
      title: { hr: 'Bok! Dobar dan!', pl: 'Powitania i wymowa', en: 'Greetings & pronunciation' },
      tags: ['pronunciation', 'greetings'],
      words: [
        { hr: 'bok', pl: ['cześć', 'hej'], en: ['hi', 'bye', 'hello'], pos: 'phrase', cat: 'greetings', ico: '👋', ex: { hr: 'Bok, Ana!', pl: 'Cześć, Ana!', en: 'Hi, Ana!' } },
        { hr: 'dobro jutro', pl: 'dzień dobry (rano)', en: 'good morning', pos: 'phrase', pic: true, cat: 'greetings', ico: '🌅', ex: { hr: 'Dobro jutro, Marko!', pl: 'Dzień dobry, Marko!', en: 'Good morning, Marko!' } },
        { hr: 'dobar dan', pl: 'dzień dobry', en: ['hello', 'good day', 'good afternoon'], pos: 'phrase', pic: true, cat: 'greetings', ico: '☀️', ex: { hr: 'Dobar dan, gospodine!', pl: 'Dzień dobry panu!', en: 'Good afternoon, sir!' } },
        { hr: 'dobra večer', pl: 'dobry wieczór', en: 'good evening', pos: 'phrase', pic: true, cat: 'greetings', ico: '🌆', ex: { hr: 'Dobra večer, Ivana!', pl: 'Dobry wieczór, Ivana!', en: 'Good evening, Ivana!' } },
        { hr: 'laku noć', pl: 'dobranoc', en: 'good night', pos: 'phrase', pic: true, cat: 'greetings', ico: '🌙', ex: { hr: 'Laku noć i hvala!', pl: 'Dobranoc i dziękuję!', en: 'Good night and thank you!' } },
        { hr: 'doviđenja', pl: 'do widzenia', en: 'goodbye', pos: 'phrase', cat: 'greetings', ico: '🙋', ex: { hr: 'Hvala, doviđenja!', pl: 'Dziękuję, do widzenia!', en: 'Thank you, goodbye!' } },
        { hr: 'vidimo se', pl: 'do zobaczenia', en: 'see you', pos: 'phrase', cat: 'greetings', ico: '👀', ex: { hr: 'Bok, vidimo se!', pl: 'Cześć, do zobaczenia!', en: 'Bye, see you!' } },
        { hr: 'kako si?', pl: 'jak się masz?', en: 'how are you?', pos: 'phrase', cat: 'greetings', ico: '🙂', ex: { hr: 'Bok, Luka! Kako si?', pl: 'Cześć, Luka! Jak się masz?', en: 'Hi, Luka! How are you?' } },
        { hr: 'dobro', pl: 'dobrze', en: ['fine', 'good', 'well'], pos: 'adv', cat: 'greetings', ico: '👍', ex: { hr: 'Dobro, hvala.', pl: 'Dobrze, dziękuję.', en: 'Fine, thanks.' } },
        { hr: 'loše', pl: 'źle', en: 'bad', pos: 'adv', cat: 'greetings', ico: '👎', ex: { hr: 'Kako si? – Loše.', pl: 'Jak się masz? – Źle.', en: 'How are you? – Bad.' } },
        { hr: 'hvala', pl: 'dziękuję', en: ['thank you', 'thanks'], pos: 'phrase', cat: 'polite', ico: '🙏', ex: { hr: 'Dobro, hvala.', pl: 'Dobrze, dziękuję.', en: 'Fine, thank you.' } },
        { hr: 'a ti?', pl: 'a ty?', en: 'and you?', pos: 'phrase', cat: 'greetings', ico: '🫵', ex: { hr: 'Dobro, hvala. A ti?', pl: 'Dobrze, dziękuję. A ty?', en: 'Fine, thanks. And you?' } },
      ],
      grammar: {
        title: { pl: 'Alfabet i wymowa', en: 'Alphabet & pronunciation' },
        body: {
          pl: `<p>Chorwacki używa alfabetu łacińskiego (30 liter). Zasada złota: <b>jedna litera = jeden dźwięk</b>. Czytasz dokładnie tak, jak jest napisane.</p>
<table class="gtable">
<tr><th>Litera</th><th>Jak po polsku</th><th>Przykład</th></tr>
<tr><td>č</td><td>twarde „cz”</td><td><i>večer</i> – wieczór</td></tr>
<tr><td>ć</td><td>miękkie „ć”</td><td><i>noć</i> – noc</td></tr>
<tr><td>dž</td><td>twarde „dż”</td><td><i>džep</i> – kieszeń</td></tr>
<tr><td>đ</td><td>miękkie „dź”</td><td><i>doviđenja</i></td></tr>
<tr><td>š / ž</td><td>„sz” / „ż”</td><td><i>loše</i>, <i>željeznica</i></td></tr>
<tr><td>lj / nj</td><td>„l” zmiękczone / „ń”</td><td><i>ljudi</i>, <i>knjiga</i></td></tr>
<tr><td>c</td><td>„c”</td><td><i>ulica</i></td></tr>
<tr><td>h</td><td>„ch”</td><td><i>hvala</i></td></tr>
<tr><td>v / j</td><td>„w” / „j”</td><td><i>vidimo</i>, <i>jutro</i></td></tr>
</table>
<p><b>r</b> może tworzyć sylabę: <i>Hr-vat-ska</i>, <i>prst</i> (palec).</p>
<p>💡 <i>dobar dan</i>, <i>dobra večer</i>, <i>dobro jutro</i>: przymiotnik zmienia końcówkę jak w polskim <i>dobry / dobra / dobre</i>. Uwaga: <b>večer</b> jest po chorwacku rodzaju <b>żeńskiego</b> (po polsku „ten wieczór”), dlatego <i>dobra</i> večer.</p>`,
          en: `<p>Croatian uses the Latin alphabet (30 letters). Golden rule: <b>one letter = one sound</b>. You read exactly what is written.</p>
<table class="gtable">
<tr><th>Letter</th><th>Sounds like</th><th>Example</th></tr>
<tr><td>č</td><td>hard “ch” (church)</td><td><i>večer</i> – evening</td></tr>
<tr><td>ć</td><td>soft “ch” (cheese)</td><td><i>noć</i> – night</td></tr>
<tr><td>dž</td><td>hard “j” (jungle)</td><td><i>džep</i> – pocket</td></tr>
<tr><td>đ</td><td>soft “j” (jeep)</td><td><i>doviđenja</i></td></tr>
<tr><td>š / ž</td><td>“sh” / “s” in pleasure</td><td><i>loše</i>, <i>željeznica</i></td></tr>
<tr><td>lj / nj</td><td>“lli” in million / “ny” in canyon</td><td><i>ljudi</i>, <i>knjiga</i></td></tr>
<tr><td>c</td><td>“ts” (cats)</td><td><i>ulica</i></td></tr>
<tr><td>h</td><td>like Scottish “loch”</td><td><i>hvala</i></td></tr>
<tr><td>v / j</td><td>“v” / “y” (yes)</td><td><i>vidimo</i>, <i>jutro</i></td></tr>
</table>
<p><b>r</b> can form a syllable on its own: <i>Hr-vat-ska</i>, <i>prst</i> (finger).</p>
<p>💡 <i>dobar dan</i>, <i>dobra večer</i>, <i>dobro jutro</i>: the adjective “good” changes its ending to match the gender of the noun (dan = masculine, večer = feminine, jutro = neuter).</p>`,
        },
        examples: [
          { hr: 'Dobro jutro!', pl: 'Dzień dobry! (rano)', en: 'Good morning!' },
          { hr: 'Dobar dan!', pl: 'Dzień dobry!', en: 'Hello! / Good day!' },
          { hr: 'Dobra večer!', pl: 'Dobry wieczór!', en: 'Good evening!' },
          { hr: 'Laku noć!', pl: 'Dobranoc!', en: 'Good night!' },
        ],
      },
      dialog: {
        title: { pl: 'Spotkanie na peronie', en: 'Meeting on the platform' },
        lines: [
          { who: 'Ana', hr: 'Dobro jutro, Marko!', pl: 'Dzień dobry, Marko!', en: 'Good morning, Marko!' },
          { who: 'Marko', hr: 'Bok, Ana! Kako si?', pl: 'Cześć, Ana! Jak się masz?', en: 'Hi, Ana! How are you?' },
          { who: 'Ana', hr: 'Dobro, hvala. A ti?', pl: 'Dobrze, dziękuję. A ty?', en: 'Fine, thanks. And you?' },
          { who: 'Marko', hr: 'I ja sam dobro.', pl: 'Ja też dobrze.', en: "I'm fine too." },
          { who: 'Ana', hr: 'Super! Vidimo se!', pl: 'Super! Do zobaczenia!', en: 'Great! See you!' },
          { who: 'Marko', hr: 'Bok, vidimo se!', pl: 'Cześć, do zobaczenia!', en: 'Bye, see you!' },
        ],
      },
      sentences: [
        { hr: 'Dobar dan!', pl: 'Dzień dobry!', en: ['Hello!', 'Good day!', 'Good afternoon!'] },
        { hr: 'Bok, kako si?', pl: 'Cześć, jak się masz?', en: ['Hi, how are you?', 'Hello, how are you?'] },
        { hr: 'Dobro, hvala. A ti?', pl: ['Dobrze, dziękuję. A ty?', 'Dobrze, dzięki. A ty?'], en: ['Fine, thanks. And you?', 'Fine, thank you. And you?', 'Good, thanks. And you?'] },
        { hr: 'Laku noć, Marko!', pl: 'Dobranoc, Marko!', en: 'Good night, Marko!' },
        { hr: 'Doviđenja i hvala!', pl: ['Do widzenia i dziękuję!', 'Do widzenia i dzięki!'], en: ['Goodbye and thank you!', 'Goodbye and thanks!'] },
        { hr: 'Bok, vidimo se!', pl: ['Cześć, do zobaczenia!', 'Pa, do zobaczenia!'], en: ['Bye, see you!', 'Hi, see you!'] },
        { hr: 'Dobro jutro, Ivana!', pl: ['Dzień dobry, Ivana!', 'Dzień dobry, Ivano!'], en: 'Good morning, Ivana!' },
        { hr: 'Dobra večer, Ana!', pl: ['Dobry wieczór, Ana!', 'Dobry wieczór, Ano!'], en: 'Good evening, Ana!' },
      ],
      cloze: [
        { hr: '___ dan!', answer: 'Dobar', options: ['Dobar', 'Dobra', 'Dobro'], pl: 'Dzień dobry!', en: 'Hello!', why: { pl: '„dan” jest rodzaju męskiego → dobar (jak „dobry dzień”).', en: '“dan” (day) is masculine → dobar.' } },
        { hr: '___ večer!', answer: 'Dobra', options: ['Dobar', 'Dobra', 'Dobro'], pl: 'Dobry wieczór!', en: 'Good evening!', why: { pl: '„večer” jest po chorwacku rodzaju żeńskiego → dobra. Uwaga: po polsku „wieczór” jest męski!', en: '“večer” (evening) is feminine in Croatian → dobra.' } },
        { hr: '___ jutro!', answer: 'Dobro', options: ['Dobar', 'Dobra', 'Dobro'], pl: 'Dzień dobry! (rano)', en: 'Good morning!', why: { pl: '„jutro” (poranek) jest rodzaju nijakiego → dobro (jak „dobre rano”).', en: '“jutro” (morning) is neuter → dobro.' } },
        { hr: 'Bok, kako ___?', answer: 'si', options: ['si', 'je', 'sam'], pl: 'Cześć, jak się masz?', en: 'Hi, how are you?', why: { pl: '„kako si?” – dosłownie „jak (ty) jesteś?”. „si” = (ty) jesteś.', en: '“kako si?” – literally “how are you (sg.)?”. “si” = you are.' } },
        { hr: 'Laku ___!', answer: 'noć', options: ['noć', 'dan', 'jutro'], pl: 'Dobranoc!', en: 'Good night!', why: { pl: '„laku noć” to stały zwrot: dosłownie „lekkiej nocy”.', en: '“laku noć” is a fixed phrase, literally “easy night”.' } },
      ],
      replies: [
        { prompt: 'Bok! Kako si?', ok: 'Dobro, hvala. A ti?', bad: ['Doviđenja!', 'Laku noć!'], why: { pl: 'Na „Kako si?” odpowiadamy, jak się czujemy: „Dobro, hvala”.', en: 'To “Kako si?” you say how you are: “Dobro, hvala”.' } },
        { prompt: 'Dobro jutro!', ok: 'Dobro jutro!', bad: ['Dobra večer!', 'Laku noć!'], why: { pl: 'Na powitanie odpowiadamy tym samym zwrotem. Rano: „Dobro jutro”.', en: 'Reply to a greeting with the same phrase. In the morning: “Dobro jutro”.' } },
        { prompt: 'Laku noć!', ok: 'Laku noć! Vidimo se!', bad: ['Dobro jutro!', 'Kako si?'], why: { pl: '„Laku noć” mówimy na dobranoc – odpowiadamy tak samo.', en: '“Laku noć” means good night – answer the same way.' } },
        { prompt: 'Dobro, hvala. A ti?', ok: 'I ja sam dobro.', bad: ['Bok, kako si?', 'Dobar dan!'], why: { pl: '„A ti?” = „A ty?” – mówimy, jak my się czujemy: „I ja sam dobro” (ja też dobrze).', en: '“A ti?” = “And you?” – say how you are: “I ja sam dobro” (I’m fine too).' } },
      ],
      tf: [
        { pl: 'Ana wita Marka rano.', en: 'Ana greets Marko in the morning.', answer: true },
        { pl: 'Marko czuje się źle.', en: 'Marko feels bad.', answer: false },
        { pl: 'Na końcu mówią sobie „do zobaczenia”.', en: 'At the end they say “see you”.', answer: true },
        { pl: 'Marko mówi Anie „dobranoc”.', en: 'Marko says “good night” to Ana.', answer: false },
      ],
    },

    // ───────────────────────────── Lekcja 2 ─────────────────────────────
    {
      id: 'd1l2',
      after: ['d1l1'], // rozwidlenie: kiosk ALBO informacja
      scene: 'kiosk',
      place: { hr: 'Kiosk', pl: 'Kiosk', en: 'Kiosk' },
      title: { hr: 'Kako se zoveš?', pl: 'Przedstawianie się', en: 'Introducing yourself' },
      tags: ['enclitics', 'introductions'],
      words: [
        { hr: 'zovem se', pl: ['nazywam się', 'mam na imię'], en: ['my name is', 'I am called'], pos: 'phrase', cat: 'introductions', ico: '🏷️', ex: { hr: 'Zovem se Marek.', pl: 'Nazywam się Marek.', en: 'My name is Marek.' } },
        { hr: 'kako se zoveš?', pl: ['jak się nazywasz?', 'jak masz na imię?'], en: "what's your name?", pos: 'phrase', cat: 'introductions', ico: '❔', ex: { hr: 'Bok! Kako se zoveš?', pl: 'Cześć! Jak się nazywasz?', en: "Hi! What's your name?" } },
        { hr: 'ja sam', pl: 'jestem', en: 'I am', pos: 'phrase', cat: 'introductions', ico: '🙋', ex: { hr: 'Ja sam Ana.', pl: 'Jestem Ana.', en: 'I am Ana.' } },
        { hr: 'drago mi je', pl: 'miło mi', en: 'nice to meet you', pos: 'phrase', cat: 'introductions', ico: '🤝', ex: { hr: 'Drago mi je, Ivana.', pl: 'Miło mi, Ivana.', en: 'Nice to meet you, Ivana.' } },
        { hr: 'i meni', pl: 'mnie też', en: ['me too', 'likewise'], pos: 'phrase', cat: 'introductions', ico: '😊', ex: { hr: 'Drago mi je! – I meni!', pl: 'Miło mi! – Mnie też!', en: 'Nice to meet you! – Likewise!' } },
        { hr: 'ime', pl: 'imię', en: 'name', pos: 'noun', g: 'n', cat: 'introductions', ico: '🪪', ex: { hr: 'Moje ime je Marek.', pl: 'Moje imię to Marek.', en: 'My name is Marek.' } },
        { hr: 'da', pl: 'tak', en: 'yes', pos: 'other', cat: 'basics', ico: '✅', ex: { hr: 'Da, ja sam Marek.', pl: 'Tak, jestem Marek.', en: 'Yes, I am Marek.' } },
        { hr: 'ne', pl: 'nie', en: 'no', pos: 'other', cat: 'basics', ico: '❌', ex: { hr: 'Ne, ja sam Petar.', pl: 'Nie, jestem Petar.', en: 'No, I am Petar.' } },
        { hr: 'gospodin', pl: 'pan', en: ['Mr', 'sir', 'gentleman'], pos: 'noun', g: 'm', cat: 'people', ico: '👨‍💼', ex: { hr: 'Ovo je gospodin Horvat.', pl: 'To jest pan Horvat.', en: 'This is Mr Horvat.' } },
        { hr: 'gospođa', pl: 'pani', en: ['Mrs', 'madam', 'lady'], pos: 'noun', g: 'f', cat: 'people', ico: '👩‍💼', ex: { hr: 'Ovo je gospođa Kovač.', pl: 'To jest pani Kovač.', en: 'This is Mrs Kovač.' } },
        { hr: 'prijatelj', pl: ['przyjaciel', 'kolega'], en: 'friend', pos: 'noun', g: 'm', cat: 'people', ico: '🧑‍🤝‍🧑', ex: { hr: 'Luka je prijatelj.', pl: 'Luka jest przyjacielem.', en: 'Luka is a friend.' } },
        { hr: 'prijateljica', pl: ['przyjaciółka', 'koleżanka'], en: ['friend', 'girlfriend (friend)'], pos: 'noun', g: 'f', cat: 'people', ico: '👭', ex: { hr: 'Ivana je prijateljica.', pl: 'Ivana jest przyjaciółką.', en: 'Ivana is a friend.' } },
        { hr: 'ovo je', pl: 'to jest', en: 'this is', pos: 'phrase', cat: 'basics', ico: '👉', ex: { hr: 'Ovo je Luka.', pl: 'To jest Luka.', en: 'This is Luka.' } },
      ],
      grammar: {
        title: { pl: 'Małe słowa na 2. miejscu', en: 'Little words in 2nd position' },
        body: {
          pl: `<p>W chorwackim są krótkie, nieakcentowane słówka – <b>enklityki</b>: <i>se</i> (się), <i>sam / si / je</i> (jestem / jesteś / jest), <i>mi</i> (mi). Zawsze stoją na <b>drugim miejscu</b> w zdaniu.</p>
<p>✅ <i>Zovem <b>se</b> Marek.</i><br>✅ <i>Ja <b>se</b> zovem Marek.</i><br>❌ <i>Ja zovem se Marek.</i></p>
<p>Po polsku „się” może wędrować (<i>Marek się nazywam</i> brzmi dziwnie, ale ujdzie) – po chorwacku reguła jest ścisła.</p>
<p>⚠️ Fałszywy przyjaciel: <b>ja sam</b> znaczy „<b>jestem</b>”, a nie „ja sam (samodzielnie)”.<br><i>ja sam</i> – jestem · <i>ti si</i> – jesteś · <i>on/ona je</i> – jest.</p>
<p>💡 <i>Luka je prijatelj.</i> – po chorwacku po „biti” zostaje <b>mianownik</b>. Po polsku powiesz „Luka jest przyjaciel<b>em</b>” (narzędnik).</p>
<p>Grzecznie, do obcej osoby: <i>Kako se zovete?</i> (Jak się Pan/Pani nazywa?).</p>`,
          en: `<p>Croatian has short, unstressed words called <b>clitics</b>: <i>se</i> (reflexive), <i>sam / si / je</i> (am / are / is), <i>mi</i> (to me). They always sit in the <b>second position</b> of the sentence.</p>
<p>✅ <i>Zovem <b>se</b> Marek.</i><br>✅ <i>Ja <b>se</b> zovem Marek.</i><br>❌ <i>Ja zovem se Marek.</i></p>
<p><i>Zovem se</i> literally means “I call myself”.</p>
<p><i>ja sam</i> – I am · <i>ti si</i> – you are · <i>on/ona je</i> – he/she is.</p>
<p>💡 <i>Luka je prijatelj.</i> – after “to be” the noun stays in its basic form (nominative).</p>
<p>Politely, to a stranger: <i>Kako se zovete?</i> (What is your name, sir/madam?).</p>`,
        },
        examples: [
          { hr: 'Zovem se Marek.', pl: 'Nazywam się Marek.', en: 'My name is Marek.' },
          { hr: 'Ja se zovem Ana.', pl: 'Ja nazywam się Ana.', en: 'My name is Ana.' },
          { hr: 'Drago mi je!', pl: 'Miło mi!', en: 'Nice to meet you!' },
          { hr: 'Ja sam Luka.', pl: 'Jestem Luka.', en: 'I am Luka.' },
        ],
      },
      dialog: {
        title: { pl: 'Przy kiosku', en: 'At the kiosk' },
        lines: [
          { who: 'Luka', hr: 'Bok! Ja sam Luka. Kako se zoveš?', pl: 'Cześć! Jestem Luka. Jak się nazywasz?', en: "Hi! I'm Luka. What's your name?" },
          { who: 'Marek', hr: 'Bok, Luka! Zovem se Marek.', pl: 'Cześć, Luka! Nazywam się Marek.', en: 'Hi, Luka! My name is Marek.' },
          { who: 'Luka', hr: 'Drago mi je!', pl: 'Miło mi!', en: 'Nice to meet you!' },
          { who: 'Marek', hr: 'I meni!', pl: 'Mnie też!', en: 'Likewise!' },
          { who: 'Luka', hr: 'Ovo je Ivana. Ivana je prijateljica.', pl: 'To jest Ivana. Ivana jest przyjaciółką.', en: 'This is Ivana. Ivana is a friend.' },
          { who: 'Ivana', hr: 'Bok, Marek! Drago mi je.', pl: 'Cześć, Marek! Miło mi.', en: 'Hi, Marek! Nice to meet you.' },
        ],
      },
      sentences: [
        { hr: ['Zovem se Marek.', 'Ja se zovem Marek.'], pl: ['Nazywam się Marek.', 'Mam na imię Marek.'], en: ['My name is Marek.', "I'm called Marek."], why: { pl: '„se” musi stać na 2. miejscu: Zovem se… albo Ja se zovem…', en: '“se” must be in 2nd position: Zovem se… or Ja se zovem…' } },
        { hr: 'Kako se zoveš?', pl: ['Jak się nazywasz?', 'Jak masz na imię?'], en: ["What's your name?", 'What is your name?'] },
        { hr: 'Ja sam Ana.', pl: ['Jestem Ana.', 'Ja jestem Ana.'], en: ['I am Ana.', "I'm Ana."], why: { pl: '„ja sam” = jestem (nie „ja sam/sama”).', en: '“ja sam” = I am.' } },
        { hr: 'Drago mi je, Ivana!', pl: ['Miło mi, Ivana!', 'Miło mi, Ivano!'], en: 'Nice to meet you, Ivana!' },
        { hr: 'Ovo je gospodin Horvat.', pl: ['To jest pan Horvat.', 'To pan Horvat.'], en: 'This is Mr Horvat.' },
        { hr: 'Ovo je gospođa Kovač.', pl: ['To jest pani Kovač.', 'To pani Kovač.'], en: ['This is Mrs Kovač.', 'This is Ms Kovač.'] },
        { hr: 'Da, ja sam Marek.', pl: ['Tak, jestem Marek.', 'Tak, ja jestem Marek.'], en: ['Yes, I am Marek.', "Yes, I'm Marek."] },
        { hr: 'Ne, ja sam Petar.', pl: ['Nie, jestem Petar.', 'Nie, ja jestem Petar.'], en: ['No, I am Petar.', "No, I'm Petar."] },
        { hr: 'Luka je prijatelj.', pl: ['Luka jest przyjacielem.', 'Luka to przyjaciel.', 'Luka jest kolegą.'], en: 'Luka is a friend.', why: { pl: 'Po chorwacku po „je” jest mianownik (prijatelj), a po polsku narzędnik (przyjacielem).', en: 'After “je” Croatian uses the nominative: prijatelj.' } },
        { hr: 'Ivana je prijateljica.', pl: ['Ivana jest przyjaciółką.', 'Ivana to przyjaciółka.', 'Ivana jest koleżanką.'], en: 'Ivana is a friend.' },
      ],
      cloze: [
        { hr: 'Zovem ___ Marek.', answer: 'se', options: ['se', 'sam', 'mi'], pl: 'Nazywam się Marek.', en: 'My name is Marek.', why: { pl: '„zovem se” = nazywam się. „se” to polskie „się”.', en: '“zovem se” = I am called. “se” is the reflexive pronoun.' } },
        { hr: 'Ja ___ Ana.', answer: 'sam', options: ['sam', 'se', 'si'], pl: 'Jestem Ana.', en: 'I am Ana.', why: { pl: '„ja sam” = jestem. „si” = jesteś.', en: '“ja sam” = I am. “si” = you are.' } },
        { hr: 'Kako se ___?', answer: 'zoveš', options: ['zoveš', 'zovem', 'zove'], pl: 'Jak się nazywasz?', en: "What's your name?", why: { pl: 'Pytamy „ty”: zoveš (ty), zovem (ja), zove (on/ona).', en: 'We ask “you”: zoveš (you), zovem (I), zove (he/she).' } },
        { hr: 'Drago ___ je!', answer: 'mi', options: ['mi', 'ja', 'se'], pl: 'Miło mi!', en: 'Nice to meet you!', why: { pl: 'Dosłownie „miło mi jest” – „mi” jak po polsku.', en: 'Literally “dear to me it is” – “mi” = to me.' } },
        { hr: 'Ja se ___ Petar.', answer: 'zovem', options: ['zovem', 'zoveš', 'sam'], pl: 'Nazywam się Petar.', en: 'My name is Petar.', why: { pl: 'Mówimy o sobie (ja) → zovem.', en: 'Talking about yourself (I) → zovem.' } },
      ],
      replies: [
        { prompt: 'Kako se zoveš?', ok: 'Zovem se Marek.', bad: ['Ja sam dobro.', 'Laku noć!'], why: { pl: 'Pytanie o imię → „Zovem se…”.', en: 'A question about your name → “Zovem se…”.' } },
        { prompt: 'Drago mi je!', ok: 'I meni!', bad: ['Ne, hvala.', 'Dobro jutro!'], why: { pl: 'Na „Drago mi je” odpowiadamy „I meni!” (mnie też).', en: 'Reply to “Drago mi je” with “I meni!” (likewise).' } },
        { prompt: 'Ti si Marek?', ok: 'Da, ja sam Marek.', bad: ['Ne, ja sam Marek.', 'Ovo je gospođa Kovač.'], why: { pl: '„Ti si Marek?” = „Ty jesteś Marek?” → „Da, ja sam Marek.”', en: '“Ti si Marek?” = “Are you Marek?” → “Da, ja sam Marek.”' } },
      ],
      tf: [
        { pl: 'Luka pyta Marka o imię.', en: 'Luka asks Marek his name.', answer: true },
        { pl: 'Marek mówi Luce „do widzenia”.', en: 'Marek says “goodbye” to Luka.', answer: false },
        { pl: 'Luka przedstawia Ivanę.', en: 'Luka introduces Ivana.', answer: true },
        { pl: 'Ivana to pani Kovač.', en: 'Ivana is Mrs Kovač.', answer: false },
      ],
    },

    // ───────────────────────────── Lekcja 3 ─────────────────────────────
    {
      id: 'd1l3',
      after: ['d1l1'],
      scene: 'info',
      place: { hr: 'Informacije', pl: 'Informacja', en: 'Information desk' },
      title: { hr: 'Oprostite, gdje je…?', pl: 'Zwroty grzecznościowe', en: 'Polite phrases' },
      tags: ['polite'],
      words: [
        { hr: 'molim', pl: ['proszę', 'słucham?'], en: ['please', 'pardon?'], pos: 'phrase', cat: 'polite', ico: '🙏', ex: { hr: 'Karta, molim.', pl: 'Bilet, proszę.', en: 'A ticket, please.' } },
        { hr: 'hvala lijepa', pl: 'dziękuję bardzo', en: ['thank you very much', 'thanks a lot'], pos: 'phrase', cat: 'polite', ico: '💐', ex: { hr: 'Hvala lijepa, doviđenja!', pl: 'Dziękuję bardzo, do widzenia!', en: 'Thank you very much, goodbye!' } },
        { hr: 'nema na čemu', pl: 'nie ma za co', en: ["you're welcome", "don't mention it"], pos: 'phrase', cat: 'polite', ico: '😌', ex: { hr: 'Hvala! – Nema na čemu.', pl: 'Dziękuję! – Nie ma za co.', en: "Thanks! – You're welcome." } },
        { hr: 'oprostite', pl: 'przepraszam', en: ['excuse me', 'sorry'], pos: 'phrase', cat: 'polite', ico: '🙇', ex: { hr: 'Oprostite, gdje je izlaz?', pl: 'Przepraszam, gdzie jest wyjście?', en: 'Excuse me, where is the exit?' } },
        { hr: 'izvolite', pl: ['proszę bardzo', 'proszę (podając)'], en: ['here you are', 'go ahead'], pos: 'phrase', cat: 'polite', ico: '🤲', ex: { hr: 'Dobar dan, izvolite.', pl: 'Dzień dobry, słucham pana.', en: 'Hello, how can I help?' } },
        { hr: 'u redu', pl: ['w porządku', 'dobrze'], en: ['OK', 'all right'], pos: 'phrase', cat: 'polite', ico: '👌', ex: { hr: 'U redu, hvala.', pl: 'W porządku, dziękuję.', en: 'OK, thanks.' } },
        { hr: 'gdje je…?', pl: 'gdzie jest…?', en: 'where is…?', pos: 'phrase', cat: 'questions', ico: '📍', ex: { hr: 'Gdje je peron?', pl: 'Gdzie jest peron?', en: 'Where is the platform?' } },
        { hr: 'tamo', pl: 'tam', en: 'there', pos: 'adv', cat: 'directions', ico: '👉', ex: { hr: 'Izlaz je tamo.', pl: 'Wyjście jest tam.', en: 'The exit is there.' } },
        { hr: 'vlak', pl: 'pociąg', en: 'train', pos: 'noun', g: 'm', cat: 'transport', ico: '🚆', ex: { hr: 'Vlak je tamo.', pl: 'Pociąg jest tam.', en: 'The train is there.' } },
        { hr: 'karta', pl: 'bilet', en: 'ticket', pos: 'noun', g: 'f', cat: 'transport', ico: '🎫', ex: { hr: 'Karta, molim.', pl: 'Bilet, proszę.', en: 'A ticket, please.' } },
        { hr: 'kolodvor', pl: 'dworzec', en: 'station', pos: 'noun', g: 'm', cat: 'transport', ico: '🚉', ex: { hr: 'Gdje je kolodvor?', pl: 'Gdzie jest dworzec?', en: 'Where is the station?' } },
        { hr: 'peron', pl: 'peron', en: 'platform', pos: 'noun', g: 'm', cat: 'transport', ico: '🛤️', ex: { hr: 'Gdje je peron?', pl: 'Gdzie jest peron?', en: 'Where is the platform?' } },
        { hr: 'izlaz', pl: 'wyjście', en: 'exit', pos: 'noun', g: 'm', cat: 'transport', ico: '🚪', ex: { hr: 'Izlaz je tamo.', pl: 'Wyjście jest tam.', en: 'The exit is there.' } },
      ],
      grammar: {
        title: { pl: 'Na „ty” i na „Pan/Pani”', en: 'Informal and formal “you”' },
        body: {
          pl: `<p>Do znajomych mówimy na <b>ti</b>, do obcych, starszych i w urzędzie – na <b>Vi</b>. Formę grzeczną poznasz po końcówce <b>-te</b>:</p>
<table class="gtable">
<tr><th>do kolegi (ti)</th><th>grzecznie (Vi)</th><th>znaczenie</th></tr>
<tr><td>oprosti</td><td>oprost<b>ite</b></td><td>przepraszam</td></tr>
<tr><td>izvoli</td><td>izvol<b>ite</b></td><td>proszę (bardzo)</td></tr>
</table>
<p><b>molim</b> to słowo-scyzoryk: „proszę” (prośba), „Słucham?” (gdy nie usłyszałeś) i grzeczna odpowiedź na „hvala”.</p>
<p><b>izvolite</b> mówi sprzedawca, gdy coś podaje albo zaprasza: „Proszę bardzo / Słucham pana”.</p>
<p>💡 <i>hvala lijepa</i> = dziękuję bardzo (dosłownie „dzięki piękne”). Zwróć uwagę na <b>ije</b> – to chorwacka ijekawica: <i>lijepo, mlijeko</i>.</p>`,
          en: `<p>With friends use <b>ti</b>; with strangers, older people and officials use <b>Vi</b>. The polite form often ends in <b>-te</b>:</p>
<table class="gtable">
<tr><th>informal (ti)</th><th>formal (Vi)</th><th>meaning</th></tr>
<tr><td>oprosti</td><td>oprost<b>ite</b></td><td>excuse me</td></tr>
<tr><td>izvoli</td><td>izvol<b>ite</b></td><td>here you are</td></tr>
</table>
<p><b>molim</b> is a Swiss-army word: “please” (request), “Pardon?” (didn't hear) and a polite reply to “hvala”.</p>
<p><b>izvolite</b> is what a clerk says when handing something over or inviting you to speak: “Here you are / How can I help?”</p>
<p>💡 <i>hvala lijepa</i> = thank you very much (lit. “beautiful thanks”). Note the <b>ije</b> – the standard Croatian (ijekavian) form: <i>lijepo, mlijeko</i>.</p>`,
        },
        examples: [
          { hr: 'Oprostite, gdje je izlaz?', pl: 'Przepraszam, gdzie jest wyjście?', en: 'Excuse me, where is the exit?' },
          { hr: 'Molim?', pl: 'Słucham?', en: 'Pardon?' },
          { hr: 'Hvala lijepa! – Nema na čemu.', pl: 'Dziękuję bardzo! – Nie ma za co.', en: "Thank you very much! – You're welcome." },
        ],
      },
      dialog: {
        title: { pl: 'W informacji', en: 'At the information desk' },
        lines: [
          { who: 'Marek', hr: 'Oprostite!', pl: 'Przepraszam!', en: 'Excuse me!' },
          { who: 'Službenica', hr: 'Molim?', pl: 'Słucham?', en: 'Yes?' },
          { who: 'Marek', hr: 'Gdje je izlaz?', pl: 'Gdzie jest wyjście?', en: 'Where is the exit?' },
          { who: 'Službenica', hr: 'Izlaz je tamo.', pl: 'Wyjście jest tam.', en: 'The exit is over there.' },
          { who: 'Marek', hr: 'U redu. Hvala lijepa!', pl: 'W porządku. Dziękuję bardzo!', en: 'OK. Thank you very much!' },
          { who: 'Službenica', hr: 'Nema na čemu.', pl: 'Nie ma za co.', en: "You're welcome." },
        ],
      },
      sentences: [
        { hr: 'Oprostite, gdje je izlaz?', pl: 'Przepraszam, gdzie jest wyjście?', en: 'Excuse me, where is the exit?' },
        { hr: 'Gdje je peron?', pl: 'Gdzie jest peron?', en: 'Where is the platform?' },
        { hr: 'Izlaz je tamo.', pl: ['Wyjście jest tam.', 'Wyjście jest tamtędy.'], en: ['The exit is there.', 'The exit is over there.'] },
        { hr: 'Hvala lijepa!', pl: ['Dziękuję bardzo!', 'Bardzo dziękuję!'], en: ['Thank you very much!', 'Thanks a lot!'] },
        { hr: 'Nema na čemu.', pl: 'Nie ma za co.', en: ["You're welcome.", "Don't mention it."] },
        { hr: 'Karta, molim.', pl: ['Bilet, proszę.', 'Poproszę bilet.'], en: ['A ticket, please.', 'Ticket, please.'] },
        { hr: 'Oprostite, gdje je kolodvor?', pl: 'Przepraszam, gdzie jest dworzec?', en: 'Excuse me, where is the station?' },
        { hr: 'U redu, hvala.', pl: ['W porządku, dziękuję.', 'Dobrze, dziękuję.'], en: ['OK, thanks.', 'All right, thank you.', 'Okay, thanks.'] },
        { hr: 'Vlak je tamo.', pl: 'Pociąg jest tam.', en: ['The train is there.', 'The train is over there.'] },
      ],
      cloze: [
        { hr: 'Hvala ___!', answer: 'lijepa', options: ['lijepa', 'lijepo', 'lepa'], pl: 'Dziękuję bardzo!', en: 'Thank you very much!', why: { pl: 'Stały zwrot „hvala lijepa”. Standard chorwacki ma „ije” (lijepa), a nie „e” (lepa – to forma serbska).', en: 'Fixed phrase “hvala lijepa”. Standard Croatian uses “ije” (lijepa), not “e” (lepa is Serbian).' } },
        { hr: 'Nema na ___.', answer: 'čemu', options: ['čemu', 'tamo', 'redu'], pl: 'Nie ma za co.', en: "You're welcome.", why: { pl: '„nema na čemu” – dosłownie „nie ma na czym”. Stały zwrot.', en: '“nema na čemu” – literally “there is nothing for which”. A fixed phrase.' } },
        { hr: '___, gdje je izlaz?', answer: 'Oprostite', options: ['Oprostite', 'Izvolite', 'Nema na čemu'], pl: 'Przepraszam, gdzie jest wyjście?', en: 'Excuse me, where is the exit?', why: { pl: 'Zaczepiając obcą osobę mówimy „Oprostite” (przepraszam).', en: 'To get a stranger’s attention say “Oprostite” (excuse me).' } },
        { hr: 'Gdje ___ peron?', answer: 'je', options: ['je', 'sam', 'si'], pl: 'Gdzie jest peron?', en: 'Where is the platform?', why: { pl: '„je” = jest (on, ona, ono). Peron to „on”.', en: '“je” = is (he/she/it).' } },
      ],
      replies: [
        { prompt: 'Hvala lijepa!', ok: 'Nema na čemu.', bad: ['Dobro jutro!', 'Gdje je izlaz?'], why: { pl: 'Na podziękowanie: „Nema na čemu” albo „Molim”.', en: 'In reply to thanks: “Nema na čemu” or “Molim”.' } },
        { prompt: 'Oprostite!', ok: 'Molim?', bad: ['Nema na čemu.', 'Laku noć!'], why: { pl: 'Gdy ktoś nas zaczepia, mówimy „Molim?” (słucham?).', en: 'When someone calls for your attention, say “Molim?” (yes?).' } },
        { prompt: 'Gdje je izlaz?', ok: 'Izlaz je tamo.', bad: ['Zovem se Ana.', 'Hvala lijepa!'], why: { pl: 'Pytanie „gdzie?” → odpowiadamy miejscem: „tamo” (tam).', en: 'A “where?” question → answer with a place: “tamo” (there).' } },
        { prompt: 'Izvolite, karta.', ok: 'Hvala!', bad: ['Izvolite!', 'Kako se zoveš?'], why: { pl: 'Ktoś coś nam podaje („izvolite”) → dziękujemy.', en: 'Someone hands you something (“izvolite”) → say thanks.' } },
      ],
      tf: [
        { pl: 'Marek szuka wyjścia.', en: 'Marek is looking for the exit.', answer: true },
        { pl: 'Urzędniczka nie wie, gdzie jest wyjście.', en: "The clerk doesn't know where the exit is.", answer: false },
        { pl: 'Marek dziękuje urzędniczce.', en: 'Marek thanks the clerk.', answer: true },
        { pl: 'Marek pyta o peron.', en: 'Marek asks about the platform.', answer: false },
      ],
    },

    // ───────────────────────────── Lekcja 4 ─────────────────────────────
    {
      id: 'd1l4',
      after: ['d1l2', 'd1l3'], // wystarczy jedna z odnóg
      scene: 'ticket',
      place: { hr: 'Blagajna', pl: 'Kasa biletowa', en: 'Ticket office' },
      title: { hr: 'Brojevi 0–10', pl: 'Liczby 0–10', en: 'Numbers 0–10' },
      tags: ['numbers'],
      words: [
        { hr: 'nula', pl: 'zero', en: 'zero', pos: 'num', cat: 'numbers', ico: '0️⃣', ex: { hr: 'Nula, jedan, dva.', pl: 'Zero, jeden, dwa.', en: 'Zero, one, two.' } },
        { hr: 'jedan', pl: 'jeden', en: 'one', pos: 'num', cat: 'numbers', ico: '1️⃣', ex: { hr: 'Jedna karta, molim.', pl: 'Jeden bilet, proszę.', en: 'One ticket, please.' } },
        { hr: 'dva', pl: 'dwa', en: 'two', pos: 'num', cat: 'numbers', ico: '2️⃣', ex: { hr: 'Dvije karte, molim.', pl: 'Dwa bilety, proszę.', en: 'Two tickets, please.' } },
        { hr: 'tri', pl: 'trzy', en: 'three', pos: 'num', cat: 'numbers', ico: '3️⃣', ex: { hr: 'Tri karte, molim.', pl: 'Trzy bilety, proszę.', en: 'Three tickets, please.' } },
        { hr: 'četiri', pl: 'cztery', en: 'four', pos: 'num', cat: 'numbers', ico: '4️⃣', ex: { hr: 'Peron broj četiri.', pl: 'Peron numer cztery.', en: 'Platform number four.' } },
        { hr: 'pet', pl: 'pięć', en: 'five', pos: 'num', cat: 'numbers', ico: '5️⃣', ex: { hr: 'Peron broj pet.', pl: 'Peron numer pięć.', en: 'Platform number five.' } },
        { hr: 'šest', pl: 'sześć', en: 'six', pos: 'num', cat: 'numbers', ico: '6️⃣', ex: { hr: 'Gdje je peron broj šest?', pl: 'Gdzie jest peron numer sześć?', en: 'Where is platform number six?' } },
        { hr: 'sedam', pl: 'siedem', en: 'seven', pos: 'num', cat: 'numbers', ico: '7️⃣', ex: { hr: 'Broj sedam.', pl: 'Numer siedem.', en: 'Number seven.' } },
        { hr: 'osam', pl: 'osiem', en: 'eight', pos: 'num', cat: 'numbers', ico: '8️⃣', ex: { hr: 'Peron broj osam.', pl: 'Peron numer osiem.', en: 'Platform number eight.' } },
        { hr: 'devet', pl: 'dziewięć', en: 'nine', pos: 'num', cat: 'numbers', ico: '9️⃣', ex: { hr: 'Broj devet.', pl: 'Numer dziewięć.', en: 'Number nine.' } },
        { hr: 'deset', pl: 'dziesięć', en: 'ten', pos: 'num', cat: 'numbers', ico: '🔟', ex: { hr: 'Osam, devet, deset!', pl: 'Osiem, dziewięć, dziesięć!', en: 'Eight, nine, ten!' } },
        { hr: 'broj', pl: 'numer', en: 'number', pos: 'noun', g: 'm', cat: 'numbers', ico: '#️⃣', ex: { hr: 'Peron broj tri.', pl: 'Peron numer trzy.', en: 'Platform number three.' } },
        { hr: 'ili', pl: ['czy', 'lub', 'albo'], en: 'or', pos: 'other', cat: 'basics', ico: '🔀', ex: { hr: 'Jedna ili dvije?', pl: 'Jeden czy dwa?', en: 'One or two?' } },
      ],
      grammar: {
        title: { pl: 'Jedan, jedna, jedno · dva i dvije', en: 'Jedan, jedna, jedno · dva and dvije' },
        body: {
          pl: `<p>„Jeden” i „dwa” zmieniają formę zależnie od rodzaju rzeczownika – podobnie jak po polsku <i>jeden / jedna / jedno</i>, <i>dwa / dwie</i>.</p>
<table class="gtable">
<tr><th></th><th>męski</th><th>żeński</th><th>nijaki</th></tr>
<tr><td>1</td><td>jedan vlak</td><td>jedna karta</td><td>jedno ime</td></tr>
<tr><td>2</td><td>dva vlaka</td><td>dvije karte</td><td>dva imena</td></tr>
</table>
<p>Po 2, 3, 4 rzeczownik ma specjalną formę, podobnie jak po polsku „dwa bilet<b>y</b>”: <i>dvije / tri / četiri karte</i>.</p>
<p>⚠️ <b>karta</b> to po chorwacku „bilet” (np. na pociąg). Polskie „karta” (np. do gry, menu) to inne konteksty – w restauracji poznasz <i>jelovnik</i>.</p>
<p>🔢 0–10: nula, jedan, dva, tri, četiri, pet, šest, sedam, osam, devet, deset. Prawie jak po polsku!</p>`,
          en: `<p>“One” and “two” change with the gender of the noun.</p>
<table class="gtable">
<tr><th></th><th>masc.</th><th>fem.</th><th>neut.</th></tr>
<tr><td>1</td><td>jedan vlak</td><td>jedna karta</td><td>jedno ime</td></tr>
<tr><td>2</td><td>dva vlaka</td><td>dvije karte</td><td>dva imena</td></tr>
</table>
<p>After 2, 3, 4 the noun takes a special form: <i>dvije / tri / četiri karte</i> (two/three/four tickets).</p>
<p>⚠️ <b>karta</b> means “ticket” (for a train, bus, museum…).</p>
<p>🔢 0–10: nula, jedan, dva, tri, četiri, pet, šest, sedam, osam, devet, deset.</p>`,
        },
        examples: [
          { hr: 'Jedna karta, molim.', pl: 'Jeden bilet, proszę.', en: 'One ticket, please.' },
          { hr: 'Dvije karte, molim.', pl: 'Dwa bilety, proszę.', en: 'Two tickets, please.' },
          { hr: 'Jedan vlak, dva vlaka.', pl: 'Jeden pociąg, dwa pociągi.', en: 'One train, two trains.' },
        ],
      },
      dialog: {
        title: { pl: 'W kasie biletowej', en: 'At the ticket office' },
        lines: [
          { who: 'Blagajnica', hr: 'Dobar dan, izvolite.', pl: 'Dzień dobry, słucham.', en: 'Hello, how can I help?' },
          { who: 'Marek', hr: 'Dobar dan. Karte, molim.', pl: 'Dzień dobry. Poproszę bilety.', en: 'Hello. Tickets, please.' },
          { who: 'Blagajnica', hr: 'Jedna ili dvije?', pl: 'Jeden czy dwa?', en: 'One or two?' },
          { who: 'Marek', hr: 'Dvije, molim.', pl: 'Dwa, proszę.', en: 'Two, please.' },
          { who: 'Blagajnica', hr: 'Izvolite. Peron broj tri.', pl: 'Proszę. Peron numer trzy.', en: 'Here you are. Platform number three.' },
          { who: 'Marek', hr: 'Hvala lijepa. Doviđenja!', pl: 'Dziękuję bardzo. Do widzenia!', en: 'Thank you very much. Goodbye!' },
        ],
      },
      sentences: [
        { hr: 'Jedna karta, molim.', pl: ['Jeden bilet, proszę.', 'Poproszę jeden bilet.'], en: 'One ticket, please.', why: { pl: '„karta” jest rodzaju żeńskiego → jedna karta.', en: '“karta” is feminine → jedna karta.' } },
        { hr: 'Dvije karte, molim.', pl: ['Dwa bilety, proszę.', 'Poproszę dwa bilety.'], en: 'Two tickets, please.', why: { pl: 'Rodzaj żeński: dvije (nie dva) + forma „karte”.', en: 'Feminine: dvije (not dva) + the form “karte”.' } },
        { hr: 'Tri karte, molim.', pl: ['Trzy bilety, proszę.', 'Poproszę trzy bilety.'], en: 'Three tickets, please.' },
        { hr: 'Peron broj pet.', pl: 'Peron numer pięć.', en: 'Platform number five.' },
        { hr: 'Gdje je peron broj šest?', pl: 'Gdzie jest peron numer sześć?', en: 'Where is platform number six?' },
        { hr: 'Jedna ili dvije?', pl: ['Jeden czy dwa?', 'Jeden albo dwa?'], en: 'One or two?' },
        { hr: 'Osam, devet, deset!', pl: 'Osiem, dziewięć, dziesięć!', en: 'Eight, nine, ten!' },
        { hr: 'Gdje je vlak broj sedam?', pl: 'Gdzie jest pociąg numer siedem?', en: 'Where is train number seven?' },
      ],
      cloze: [
        { hr: '___ karta, molim.', answer: 'Jedna', options: ['Jedna', 'Jedan', 'Jedno'], pl: 'Jeden bilet, proszę.', en: 'One ticket, please.', why: { pl: '„karta” kończy się na -a, jest rodzaju żeńskiego → jedna.', en: '“karta” ends in -a and is feminine → jedna.' } },
        { hr: '___ karte, molim.', answer: 'Dvije', options: ['Dvije', 'Dva', 'Jedna'], pl: 'Dwa bilety, proszę.', en: 'Two tickets, please.', why: { pl: 'Z rzeczownikiem żeńskim: dvije (jak polskie „dwie”).', en: 'With a feminine noun: dvije.' } },
        { hr: '___ vlak', answer: 'Jedan', options: ['Jedan', 'Jedna', 'Jedno'], pl: 'jeden pociąg', en: 'one train', why: { pl: '„vlak” jest rodzaju męskiego → jedan.', en: '“vlak” is masculine → jedan.' } },
        { hr: 'Tri, četiri, ___', answer: 'pet', options: ['pet', 'šest', 'sedam'], pl: 'Trzy, cztery, pięć', en: 'Three, four, five', why: { pl: 'Po 4 (četiri) jest 5 – pet.', en: 'After 4 (četiri) comes 5 – pet.' } },
        { hr: 'Osam, devet, ___', answer: 'deset', options: ['deset', 'sedam', 'nula'], pl: 'Osiem, dziewięć, dziesięć', en: 'Eight, nine, ten', why: { pl: 'Po 9 (devet) jest 10 – deset.', en: 'After 9 (devet) comes 10 – deset.' } },
      ],
      replies: [
        { prompt: 'Dobar dan, izvolite.', ok: 'Dobar dan. Jedna karta, molim.', bad: ['Laku noć. Jedna karta.', 'Kako se zoveš?'], why: { pl: 'W kasie witamy się i prosimy o bilet: „Jedna karta, molim”.', en: 'At the counter: greet and ask for a ticket: “Jedna karta, molim”.' } },
        { prompt: 'Jedna ili dvije?', ok: 'Dvije, molim.', bad: ['Dva, hvala.', 'Peron broj dva.'], why: { pl: 'Mowa o biletach (karta – ż.) → dvije, nie dva.', en: 'We mean tickets (karta – fem.) → dvije, not dva.' } },
        { prompt: 'Izvolite. Peron broj tri.', ok: 'Hvala lijepa. Doviđenja!', bad: ['Nema na čemu.', 'Dobro jutro, tri!'], why: { pl: 'Dostajemy bilet → dziękujemy i żegnamy się.', en: 'You get the ticket → say thanks and goodbye.' } },
      ],
      tf: [
        { pl: 'Marek kupuje trzy bilety.', en: 'Marek buys three tickets.', answer: false },
        { pl: 'Pociąg odjeżdża z peronu numer trzy.', en: 'The train leaves from platform three.', answer: true },
        { pl: 'Marek mówi na koniec „do widzenia”.', en: 'Marek says “goodbye” at the end.', answer: true },
      ],
    },

    // ───────────────────────────── Boss ─────────────────────────────
    {
      id: 'd1boss',
      boss: true,
      scene: 'station',
      place: { hr: 'Glavni kolodvor', pl: 'Hala dworca', en: 'Station hall' },
      title: { hr: 'Dobro došli u Zagreb!', pl: 'Przyjazd do Zagrzebia', en: 'Arrival in Zagreb' },
      tags: ['greetings', 'introductions', 'polite', 'numbers'],
      words: [
        { hr: 'dobro došao', pl: 'witaj (do mężczyzny)', en: 'welcome (to a man)', pos: 'phrase', cat: 'greetings', ico: '🎉', ex: { hr: 'Bok, Marek! Dobro došao u Zagreb!', pl: 'Cześć, Marek! Witaj w Zagrzebiu!', en: 'Hi, Marek! Welcome to Zagreb!' } },
        { hr: 'dobro došla', pl: 'witaj (do kobiety)', en: 'welcome (to a woman)', pos: 'phrase', cat: 'greetings', ico: '🎊', ex: { hr: 'Dobro došla, Ana!', pl: 'Witaj, Ana!', en: 'Welcome, Ana!' } },
      ],
      intro: {
        pl: 'Pociąg wjeżdża na Glavni kolodvor. Na peronie czeka Ivana, twoja chorwacka znajoma. Poradzisz sobie sam?',
        en: 'Your train pulls into Glavni kolodvor. Ivana, your Croatian friend, is waiting on the platform. Can you manage on your own?',
      },
      story: [
        { narr: { pl: 'Wysiadasz z pociągu. Ivana macha do ciebie.', en: 'You get off the train. Ivana waves at you.' } },
        { who: 'Ivana', hr: 'Bok, Marek! Dobro došao u Zagreb!', pl: 'Cześć, Marek! Witaj w Zagrzebiu!', en: 'Hi, Marek! Welcome to Zagreb!', options: ['Bok, Ivana! Hvala!', 'Laku noć, Ivana!', 'Nema na čemu!'], answer: 0, why: { pl: 'Ivana cię wita – odpowiadasz powitaniem i dziękujesz.', en: 'Ivana welcomes you – greet her back and say thanks.' } },
        { who: 'Ivana', hr: 'Kako si?', pl: 'Jak się masz?', en: 'How are you?', options: ['Zovem se Marek.', 'Dobro, hvala. A ti?', 'Peron broj pet.'], answer: 1, why: { pl: '„Kako si?” → mówisz, jak się czujesz.', en: '“Kako si?” → say how you are.' } },
        { who: 'Ivana', hr: 'I ja sam dobro. Ovo je Luka.', pl: 'Ja też dobrze. To jest Luka.', en: "I'm fine too. This is Luka." },
        { who: 'Luka', hr: 'Bok! Ja sam Luka.', pl: 'Cześć! Jestem Luka.', en: "Hi! I'm Luka.", options: ['Doviđenja, Luka!', 'Oprostite, gdje je vlak?', 'Bok, zovem se Marek. Drago mi je!'], answer: 2, why: { pl: 'Ktoś się przedstawia → przedstawiasz się i mówisz „Drago mi je”.', en: 'Someone introduces himself → introduce yourself and say “Drago mi je”.' } },
        { who: 'Luka', hr: 'I meni!', pl: 'Mnie też!', en: 'Likewise!' },
        { narr: { pl: 'Chcecie od razu kupić bilety powrotne. Idziecie do kasy.', en: 'You want to buy return tickets right away. You go to the ticket office.' } },
        { who: 'Blagajnica', hr: 'Dobar dan, izvolite.', pl: 'Dzień dobry, słucham.', en: 'Hello, how can I help?', options: ['Dobar dan. Tri karte, molim.', 'Laku noć. Tri karte.', 'Kako se zoveš?'], answer: 0, why: { pl: 'Jest was troje: „Tri karte, molim”. W ciągu dnia – „Dobar dan”.', en: 'There are three of you: “Tri karte, molim”. During the day – “Dobar dan”.' } },
        { who: 'Blagajnica', hr: 'Tri karte. Izvolite!', pl: 'Trzy bilety. Proszę bardzo!', en: 'Three tickets. Here you are!', options: ['Izvolite!', 'Hvala lijepa!', 'Dobro jutro!'], answer: 1, why: { pl: 'Dostajesz bilety → dziękujesz: „Hvala lijepa!”.', en: 'You get the tickets → say “Hvala lijepa!”.' } },
        { who: 'Blagajnica', hr: 'Nema na čemu. Peron broj osam.', pl: 'Nie ma za co. Peron numer osiem.', en: "You're welcome. Platform number eight." },
        { narr: { pl: 'Na hali jest tłoczno. Szukasz wyjścia.', en: 'The hall is crowded. You look for the exit.' } },
        { who: 'Marek', hr: '…', pl: 'Jak zapytasz przechodnia o wyjście?', en: 'How do you ask a passer-by for the exit?', options: ['Oprostite, gdje je izlaz?', 'Izvolite, gdje je izlaz?', 'Hvala, izlaz je tamo.'], answer: 0, why: { pl: 'Zaczepiając obcego: „Oprostite”, potem pytanie „Gdje je izlaz?”.', en: 'To address a stranger: “Oprostite”, then ask “Gdje je izlaz?”.' } },
        { who: 'Gospodin', hr: 'Izlaz je tamo.', pl: 'Wyjście jest tam.', en: 'The exit is over there.', options: ['U redu, hvala!', 'Drago mi je!', 'Dobra večer!'], answer: 0, why: { pl: 'Dostałeś informację → „U redu, hvala!”.', en: 'You got the info → “U redu, hvala!”.' } },
        { narr: { pl: 'Wychodzisz z dworca. Zagrzeb czeka! 🎉', en: 'You walk out of the station. Zagreb awaits! 🎉' } },
      ],
    },
  ],
};
