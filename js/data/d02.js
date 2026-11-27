// Dzielnica 2: Trg bana Jelačića (centrum) – zaimki, biti, pytania, kraje, narodowości, języki, rodzaj rzeczowników.
// Rozwidlenie: Hostel (kraje i narodowości) ALBO Sklep z pamiątkami (języki). Lekcja 4 wymaga jednej z nich, boss – wszystkich.
export default {
  id: 'd2',
  lessons: [
    // ───────────── Lekcja 1 ─────────────
    {
      id: 'd2l1',
      scene: 'square',
      place: { hr: 'Trg', pl: 'Plac (pod pomnikiem)', en: 'The square (by the statue)' },
      title: { hr: 'Tko si ti?', pl: 'Zaimki i czasownik biti', en: 'Pronouns and the verb biti' },
      tags: ['biti'],
      words: [
        { hr: 'ja', pl: 'ja', en: 'I', pos: 'pron', cat: 'pronouns', ico: '🙋', ex: { hr: 'Ja sam Marek.', pl: 'Jestem Marek.', en: 'I am Marek.' } },
        { hr: 'ti', pl: 'ty', en: 'you (informal)', pos: 'pron', cat: 'pronouns', ico: '🫵', ex: { hr: 'Ti si Ana?', pl: 'Ty jesteś Ana?', en: 'Are you Ana?' } },
        { hr: 'on', pl: 'on', en: 'he', pos: 'pron', cat: 'pronouns', ico: '👨', ex: { hr: 'On je Luka.', pl: 'On jest Luka.', en: 'He is Luka.' } },
        { hr: 'ona', pl: 'ona', en: 'she', pos: 'pron', cat: 'pronouns', ico: '👩', ex: { hr: 'Ona je Ivana.', pl: 'Ona jest Ivana.', en: 'She is Ivana.' } },
        { hr: 'mi', pl: 'my', en: 'we', pos: 'pron', cat: 'pronouns', ico: '👫', ex: { hr: 'Mi smo turisti.', pl: 'Jesteśmy turystami.', en: 'We are tourists.' } },
        { hr: 'vi', pl: ['wy', 'Pan / Pani'], en: ['you (plural)', 'you (formal)'], pos: 'pron', cat: 'pronouns', ico: '👥', ex: { hr: 'Vi ste studenti?', pl: 'Jesteście studentami?', en: 'Are you students?' } },
        { hr: 'oni', pl: 'oni', en: 'they', pos: 'pron', cat: 'pronouns', ico: '👨‍👩‍👦', ex: { hr: 'Oni su iz Zagreba.', pl: 'Oni są z Zagrzebia.', en: 'They are from Zagreb.' } },
        { hr: 'tko', pl: 'kto', en: 'who', pos: 'pron', cat: 'questions', ico: '❓', ex: { hr: 'Tko je to?', pl: 'Kto to jest?', en: 'Who is that?' } },
        { hr: 'što', pl: 'co', en: 'what', pos: 'pron', cat: 'questions', ico: '❔', ex: { hr: 'Što je to?', pl: 'Co to jest?', en: 'What is that?' } },
        { hr: 'turist', pl: 'turysta', en: 'tourist', pos: 'noun', g: 'm', cat: 'people', ico: '🧳', ex: { hr: 'On je turist.', pl: 'On jest turystą.', en: 'He is a tourist.' } },
        { hr: 'student', pl: 'student', en: 'student', pos: 'noun', g: 'm', cat: 'people', ico: '🎓', ex: { hr: 'Ja sam student.', pl: 'Jestem studentem.', en: 'I am a student.' } },
        { hr: 'studentica', pl: 'studentka', en: 'student (female)', pos: 'noun', g: 'f', cat: 'people', ico: '👩‍🎓', ex: { hr: 'Ana je studentica.', pl: 'Ana jest studentką.', en: 'Ana is a student.' } },
        { hr: 'ovdje', pl: 'tutaj', en: 'here', pos: 'adv', cat: 'directions', ico: '📍', ex: { hr: 'Mi smo ovdje.', pl: 'Jesteśmy tutaj.', en: 'We are here.' } },
      ],
      grammar: {
        title: { pl: 'Czasownik biti (być)', en: 'The verb biti (to be)' },
        body: {
          pl: `<p>Krótkie formy <b>biti</b> to enklityki – stoją na <b>2. miejscu</b> w zdaniu (jak <i>se</i>).</p>
<table class="gtable"><tr><th></th><th>biti</th><th>po polsku</th></tr>
<tr><td>ja</td><td>sam</td><td>jestem</td></tr><tr><td>ti</td><td>si</td><td>jesteś</td></tr><tr><td>on / ona / ono</td><td>je</td><td>jest</td></tr>
<tr><td>mi</td><td>smo</td><td>jesteśmy</td></tr><tr><td>vi</td><td>ste</td><td>jesteście / Pan(i) jest</td></tr><tr><td>oni / one / ona</td><td>su</td><td>są</td></tr></table>
<p>Zaimek często się pomija, tak jak po polsku: <i>Student sam.</i> = Jestem studentem.</p>
<p><b>Pytanie tak/nie:</b> <i>Jesi li ti student?</i> (Czy jesteś studentem?) · <i>Jeste li vi iz Zagreba?</i> – długa forma (<i>jesi, je li, jeste</i>) + <i>li</i>.</p>
<p>💡 Po <i>biti</i> zostaje <b>mianownik</b>: <i>Ana je studentica</i> (po polsku: studentk<b>ą</b>).</p>
<p><b>Przeczenie:</b> <i>nisam, nisi, nije, nismo, niste, nisu</i> – np. <i>Ivana nije turistica.</i> (Ivana nie jest turystką.)</p><p>⚠️ <b>tko</b> = kto, <b>što</b> = co (czytaj „szto”).</p>`,
          en: `<p>The short forms of <b>biti</b> are clitics – they sit in <b>2nd position</b> (like <i>se</i>).</p>
<table class="gtable"><tr><th></th><th>biti</th><th>English</th></tr>
<tr><td>ja</td><td>sam</td><td>I am</td></tr><tr><td>ti</td><td>si</td><td>you are</td></tr><tr><td>on / ona / ono</td><td>je</td><td>he/she/it is</td></tr>
<tr><td>mi</td><td>smo</td><td>we are</td></tr><tr><td>vi</td><td>ste</td><td>you are (pl./formal)</td></tr><tr><td>oni / one / ona</td><td>su</td><td>they are</td></tr></table>
<p>The pronoun is often dropped: <i>Student sam.</i> = I am a student.</p>
<p><b>Yes/no questions:</b> <i>Jesi li ti student?</i> · <i>Jeste li vi iz Zagreba?</i> – long form + <i>li</i>.</p>
<p>💡 After <i>biti</i> the noun stays in the nominative: <i>Ana je studentica</i>.</p><p><b>Negation:</b> <i>nisam, nisi, nije, nismo, niste, nisu</i> – e.g. <i>Ivana nije turistica.</i></p>`,
        },
        examples: [
          { hr: 'Mi smo turisti.', pl: 'Jesteśmy turystami.', en: 'We are tourists.' },
          { hr: 'Jesi li ti student?', pl: 'Czy jesteś studentem?', en: 'Are you a student?' },
          { hr: 'Oni su ovdje.', pl: 'Oni są tutaj.', en: 'They are here.' },
        ],
      },
      dialog: {
        title: { pl: 'Pod pomnikiem bana Jelačića', en: 'By the Ban Jelačić statue' },
        lines: [
          { who: 'Ivana', hr: 'Marek, ovo je Trg bana Jelačića!', pl: 'Marek, to jest plac bana Jelačicia!', en: "Marek, this is Ban Jelačić Square!" },
          { who: 'Marek', hr: 'Super! A tko je to?', pl: 'Super! A kto to jest?', en: 'Great! And who is that?' },
          { who: 'Ivana', hr: 'To je Luka. On je student.', pl: 'To Luka. Jest studentem.', en: 'That is Luka. He is a student.' },
          { who: 'Luka', hr: 'Bok! Jeste li vi turisti?', pl: 'Cześć! Jesteście turystami?', en: 'Hi! Are you tourists?' },
          { who: 'Marek', hr: 'Ja sam turist. Ivana nije, ona je iz Zagreba.', pl: 'Ja jestem turystą. Ivana nie, ona jest z Zagrzebia.', en: "I'm a tourist. Ivana isn't, she's from Zagreb." },
          { who: 'Luka', hr: 'Super. Mi smo ovdje svaki dan!', pl: 'Super. Jesteśmy tu codziennie!', en: "Great. We're here every day!" },
        ],
      },
      sentences: [
        { hr: 'Ja sam student.', pl: ['Jestem studentem.', 'Ja jestem studentem.'], en: ['I am a student.', "I'm a student."] },
        { hr: 'Ona je studentica.', pl: ['Ona jest studentką.', 'Ona to studentka.'], en: ['She is a student.', "She's a student."], why: { pl: 'Po „je” mianownik: studentica (po polsku narzędnik: studentką).', en: 'After “je” the noun stays in the nominative.' } },
        { hr: 'Mi smo turisti.', pl: ['Jesteśmy turystami.', 'My jesteśmy turystami.'], en: ['We are tourists.', "We're tourists."] },
        { hr: 'Tko je to?', pl: ['Kto to jest?', 'Kto to?'], en: ['Who is that?', 'Who is it?'] },
        { hr: 'Što je to?', pl: ['Co to jest?', 'Co to?'], en: ['What is that?', 'What is it?'] },
        { hr: 'Jesi li ti student?', pl: ['Czy jesteś studentem?', 'Jesteś studentem?', 'Czy ty jesteś studentem?'], en: ['Are you a student?'], why: { pl: 'Pytanie tak/nie: długa forma „jesi” + „li”.', en: 'Yes/no question: long form “jesi” + “li”.' } },
        { hr: 'Oni su ovdje.', pl: ['Oni są tutaj.', 'Oni są tu.'], en: ['They are here.', "They're here."] },
        { hr: 'Vi ste turisti?', pl: ['Jesteście turystami?', 'Wy jesteście turystami?'], en: ['Are you tourists?', 'You are tourists?'] },
        { hr: 'On je turist, a ona je studentica.', pl: ['On jest turystą, a ona jest studentką.', 'On jest turystą, a ona studentką.'], en: ['He is a tourist and she is a student.', 'He is a tourist, and she is a student.'] },
      ],
      cloze: [
        { hr: 'Mi ___ turisti.', answer: 'smo', options: ['smo', 'su', 'ste'], pl: 'Jesteśmy turystami.', en: 'We are tourists.', why: { pl: 'mi → smo (jesteśmy).', en: 'mi → smo (we are).' } },
        { hr: 'Oni ___ ovdje.', answer: 'su', options: ['su', 'smo', 'je'], pl: 'Oni są tutaj.', en: 'They are here.', why: { pl: 'oni → su (są).', en: 'oni → su (they are).' } },
        { hr: 'Vi ___ studenti?', answer: 'ste', options: ['ste', 'si', 'smo'], pl: 'Jesteście studentami?', en: 'Are you students?', why: { pl: 'vi → ste (jesteście / Pan jest).', en: 'vi → ste (you are).' } },
        { hr: '___ je to? – To je Luka.', answer: 'Tko', options: ['Tko', 'Što', 'Gdje'], pl: 'Kto to jest? – To Luka.', en: 'Who is that? – That is Luka.', why: { pl: 'O osobę pytamy „tko” (kto).', en: 'For a person ask “tko” (who).' } },
        { hr: '___ li ti student?', answer: 'Jesi', options: ['Jesi', 'Si', 'Je'], pl: 'Czy jesteś studentem?', en: 'Are you a student?', why: { pl: 'Na początku pytania stoi długa forma: jesi li…', en: 'A question starts with the long form: jesi li…' } },
      ],
      replies: [
        { prompt: 'Jesi li ti student?', ok: 'Da, ja sam student.', bad: ['Da, oni su studenti.', 'Mi smo ovdje.'], why: { pl: 'Pytanie do ciebie (ti) → odpowiadasz „ja sam…”.', en: 'A question to you (ti) → answer “ja sam…”.' } },
        { prompt: 'Tko je to?', ok: 'To je Ivana.', bad: ['To je kava.', 'Ja sam dobro.'], why: { pl: '„Tko” pyta o osobę.', en: '“Tko” asks about a person.' } },
        { prompt: 'Jeste li vi turisti?', ok: 'Da, mi smo turisti.', bad: ['Da, ti si turist.', 'Ne, on je turist.'], why: { pl: 'Pytanie do „vi” (was) → odpowiedź „mi smo…”.', en: 'Asked with “vi” → answer “mi smo…”.' } },
      ],
      tf: [
        { pl: 'Luka jest studentem.', en: 'Luka is a student.', answer: true },
        { pl: 'Ivana jest turystką.', en: 'Ivana is a tourist.', answer: false },
        { pl: 'Marek jest turystą.', en: 'Marek is a tourist.', answer: true },
      ],
    },

    // ───────────── Lekcja 2 (odnoga A) ─────────────
    {
      id: 'd2l2',
      after: ['d2l1'],
      scene: 'hotel',
      place: { hr: 'Hostel', pl: 'Hostel', en: 'Hostel' },
      title: { hr: 'Odakle si?', pl: 'Kraje i narodowości', en: 'Countries and nationalities' },
      tags: ['nationalities'],
      words: [
        { hr: 'Poljska', pl: 'Polska', en: 'Poland', pos: 'noun', g: 'f', cat: 'countries', ico: '🇵🇱', ex: { hr: 'Ja sam iz Poljske.', pl: 'Jestem z Polski.', en: 'I am from Poland.' } },
        { hr: 'Hrvatska', pl: 'Chorwacja', en: 'Croatia', pos: 'noun', g: 'f', cat: 'countries', ico: '🇭🇷', ex: { hr: 'Ivana je iz Hrvatske.', pl: 'Ivana jest z Chorwacji.', en: 'Ivana is from Croatia.' } },
        { hr: 'Njemačka', pl: 'Niemcy', en: 'Germany', pos: 'noun', g: 'f', cat: 'countries', ico: '🇩🇪', ex: { hr: 'On je iz Njemačke.', pl: 'On jest z Niemiec.', en: 'He is from Germany.' } },
        { hr: 'Italija', pl: 'Włochy', en: 'Italy', pos: 'noun', g: 'f', cat: 'countries', ico: '🇮🇹', ex: { hr: 'Marco je iz Italije.', pl: 'Marco jest z Włoch.', en: 'Marco is from Italy.' } },
        { hr: 'Engleska', pl: 'Anglia', en: 'England', pos: 'noun', g: 'f', cat: 'countries', ico: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ex: { hr: 'Ona je iz Engleske.', pl: 'Ona jest z Anglii.', en: 'She is from England.' } },
        { hr: 'odakle', pl: 'skąd', en: 'where from', pos: 'adv', cat: 'questions', ico: '🧭', ex: { hr: 'Odakle si?', pl: 'Skąd jesteś?', en: 'Where are you from?' } },
        { hr: 'iz', pl: 'z (skądś)', en: 'from', pos: 'prep', cat: 'basics', ico: '↩️', ex: { hr: 'Ja sam iz Krakova.', pl: 'Jestem z Krakowa.', en: 'I am from Kraków.' } },
        { hr: 'Poljak', pl: 'Polak', en: 'Pole (man)', pos: 'noun', g: 'm', cat: 'nationalities', ico: '🧔', ex: { hr: 'Marek je Poljak.', pl: 'Marek jest Polakiem.', en: 'Marek is Polish.' } },
        { hr: 'Poljakinja', pl: 'Polka', en: 'Pole (woman)', pos: 'noun', g: 'f', cat: 'nationalities', ico: '👱‍♀️', ex: { hr: 'Ana je Poljakinja.', pl: 'Ana jest Polką.', en: 'Ana is Polish.' } },
        { hr: 'Hrvat', pl: 'Chorwat', en: 'Croat (man)', pos: 'noun', g: 'm', cat: 'nationalities', ico: '👨', ex: { hr: 'Luka je Hrvat.', pl: 'Luka jest Chorwatem.', en: 'Luka is Croatian.' } },
        { hr: 'Hrvatica', pl: 'Chorwatka', en: 'Croat (woman)', pos: 'noun', g: 'f', cat: 'nationalities', ico: '👩', ex: { hr: 'Ivana je Hrvatica.', pl: 'Ivana jest Chorwatką.', en: 'Ivana is Croatian.' } },
        { hr: 'Nijemac', pl: 'Niemiec', en: 'German (man)', pos: 'noun', g: 'm', cat: 'nationalities', ico: '🧑', ex: { hr: 'Tom je Nijemac.', pl: 'Tom jest Niemcem.', en: 'Tom is German.' } },
      ],
      grammar: {
        title: { pl: '„Iz” + dopełniacz, narodowości', en: '“Iz” + genitive, nationalities' },
        body: {
          pl: `<p><b>Odakle si?</b> = Skąd jesteś? Odpowiedź: <b>iz</b> + kraj w dopełniaczu – jak po polsku „z Polsk<b>i</b>”.</p>
<table class="gtable"><tr><th>kraj</th><th>iz …</th></tr>
<tr><td>Poljska</td><td>iz Poljsk<b>e</b></td></tr><tr><td>Hrvatska</td><td>iz Hrvatsk<b>e</b></td></tr><tr><td>Njemačka</td><td>iz Njemačk<b>e</b></td></tr><tr><td>Italija</td><td>iz Italij<b>e</b></td></tr><tr><td>Zagreb / Krakov</td><td>iz Zagreb<b>a</b> / Krakov<b>a</b></td></tr></table>
<p>Reguła na teraz: rzeczowniki na <b>-a</b> → <b>-e</b>; męskie → <b>-a</b>.</p>
<p><b>Narodowość</b> ma formę męską i żeńską: <i>Poljak / Poljakinja</i>, <i>Hrvat / Hrvatica</i>, <i>Nijemac / Njemica</i>.</p>
<p>⚠️ Polskie „Niemcy” to kraj – po chorwacku <b>Njemačka</b>; <b>Nijemac</b> to jeden Niemiec.</p>`,
          en: `<p><b>Odakle si?</b> = Where are you from? Answer: <b>iz</b> + country in the genitive.</p>
<table class="gtable"><tr><th>country</th><th>iz …</th></tr>
<tr><td>Poljska</td><td>iz Poljsk<b>e</b></td></tr><tr><td>Hrvatska</td><td>iz Hrvatsk<b>e</b></td></tr><tr><td>Njemačka</td><td>iz Njemačk<b>e</b></td></tr><tr><td>Italija</td><td>iz Italij<b>e</b></td></tr><tr><td>Zagreb / Krakov</td><td>iz Zagreb<b>a</b> / Krakov<b>a</b></td></tr></table>
<p>Rule for now: nouns in <b>-a</b> → <b>-e</b>; masculine → <b>-a</b>.</p>
<p><b>Nationalities</b> have a male and a female form: <i>Poljak / Poljakinja</i>, <i>Hrvat / Hrvatica</i>, <i>Nijemac / Njemica</i>.</p>`,
        },
        examples: [
          { hr: 'Odakle si? – Iz Poljske.', pl: 'Skąd jesteś? – Z Polski.', en: 'Where are you from? – From Poland.' },
          { hr: 'Ja sam Poljak, a ona je Hrvatica.', pl: 'Jestem Polakiem, a ona Chorwatką.', en: "I'm Polish and she's Croatian." },
        ],
      },
      dialog: {
        title: { pl: 'W recepcji hostelu', en: 'At the hostel reception' },
        lines: [
          { who: 'Recepcionarka', hr: 'Dobar dan! Odakle ste?', pl: 'Dzień dobry! Skąd Pan jest?', en: 'Hello! Where are you from?' },
          { who: 'Marek', hr: 'Ja sam iz Poljske.', pl: 'Jestem z Polski.', en: "I'm from Poland." },
          { who: 'Recepcionarka', hr: 'A on? Je li on Poljak?', pl: 'A on? Czy on jest Polakiem?', en: 'And him? Is he Polish?' },
          { who: 'Marek', hr: 'Ne, on je Nijemac. On je iz Njemačke.', pl: 'Nie, on jest Niemcem. Jest z Niemiec.', en: "No, he's German. He's from Germany." },
          { who: 'Recepcionarka', hr: 'U redu. Ja sam Hrvatica, iz Splita.', pl: 'W porządku. Jestem Chorwatką, ze Splitu.', en: "OK. I'm Croatian, from Split." },
          { who: 'Marek', hr: 'Drago mi je!', pl: 'Miło mi!', en: 'Nice to meet you!' },
        ],
      },
      sentences: [
        { hr: 'Ja sam iz Poljske.', pl: ['Jestem z Polski.', 'Ja jestem z Polski.'], en: ["I'm from Poland.", 'I am from Poland.'], why: { pl: 'iz + dopełniacz: Poljska → iz Poljske.', en: 'iz + genitive: Poljska → iz Poljske.' } },
        { hr: 'Odakle si?', pl: 'Skąd jesteś?', en: 'Where are you from?' },
        { hr: 'Marek je Poljak.', pl: ['Marek jest Polakiem.', 'Marek to Polak.'], en: ['Marek is Polish.', 'Marek is a Pole.'] },
        { hr: 'Ivana je Hrvatica.', pl: ['Ivana jest Chorwatką.', 'Ivana to Chorwatka.'], en: ['Ivana is Croatian.', 'Ivana is a Croat.'] },
        { hr: 'On je iz Njemačke.', pl: 'On jest z Niemiec.', en: ["He's from Germany.", 'He is from Germany.'] },
        { hr: 'Ona je iz Italije.', pl: 'Ona jest z Włoch.', en: ["She's from Italy.", 'She is from Italy.'] },
        { hr: 'Luka je Hrvat iz Zagreba.', pl: ['Luka jest Chorwatem z Zagrzebia.', 'Luka to Chorwat z Zagrzebia.'], en: 'Luka is a Croat from Zagreb.' },
        { hr: 'Je li on Nijemac?', pl: ['Czy on jest Niemcem?', 'On jest Niemcem?'], en: 'Is he German?' },
      ],
      cloze: [
        { hr: 'Ja sam iz ___.', answer: 'Poljske', options: ['Poljske', 'Poljska', 'Poljak'], pl: 'Jestem z Polski.', en: "I'm from Poland.", why: { pl: 'Po „iz” dopełniacz: Poljska → Poljske.', en: 'After “iz” use the genitive: Poljska → Poljske.' } },
        { hr: 'Ana je ___.', answer: 'Poljakinja', options: ['Poljakinja', 'Poljak', 'Poljska'], pl: 'Ana jest Polką.', en: 'Ana is Polish.', why: { pl: 'Kobieta → forma żeńska: Poljakinja.', en: 'A woman → female form: Poljakinja.' } },
        { hr: '___ si? – Iz Hrvatske.', answer: 'Odakle', options: ['Odakle', 'Tko', 'Što'], pl: 'Skąd jesteś? – Z Chorwacji.', en: 'Where are you from? – From Croatia.', why: { pl: '„odakle” = skąd.', en: '“odakle” = where from.' } },
        { hr: 'Luka je ___.', answer: 'Hrvat', options: ['Hrvat', 'Hrvatica', 'Hrvatska'], pl: 'Luka jest Chorwatem.', en: 'Luka is Croatian.', why: { pl: 'Mężczyzna → Hrvat; Hrvatska to kraj.', en: 'A man → Hrvat; Hrvatska is the country.' } },
      ],
      replies: [
        { prompt: 'Odakle si?', ok: 'Ja sam iz Poljske.', bad: ['Ja sam Poljska.', 'Ja sam dobro.'], why: { pl: 'Odpowiadamy „iz” + kraj: iz Poljske.', en: 'Answer with “iz” + country: iz Poljske.' } },
        { prompt: 'Jesi li ti Hrvat?', ok: 'Ne, ja sam Poljak.', bad: ['Ne, ja sam Poljska.', 'Da, ja sam iz Poljske.'], why: { pl: 'Pytanie o narodowość → Poljak / Poljakinja.', en: 'A question about nationality → Poljak / Poljakinja.' } },
        { prompt: 'Je li Ivana iz Zagreba?', ok: 'Da, ona je iz Zagreba.', bad: ['Da, on je iz Zagreba.', 'Da, ona je Zagreb.'], why: { pl: 'Ivana to „ona”; „iz Zagreba”.', en: 'Ivana is “ona”; “iz Zagreba”.' } },
      ],
      tf: [
        { pl: 'Marek jest z Polski.', en: 'Marek is from Poland.', answer: true },
        { pl: 'Kolega Marka jest Chorwatem.', en: "Marek's friend is Croatian.", answer: false },
        { pl: 'Recepcjonistka jest ze Splitu.', en: 'The receptionist is from Split.', answer: true },
      ],
    },

    // ───────────── Lekcja 3 (odnoga B) ─────────────
    {
      id: 'd2l3',
      after: ['d2l1'],
      scene: 'shop',
      place: { hr: 'Suveniri', pl: 'Sklep z pamiątkami', en: 'Souvenir shop' },
      title: { hr: 'Govoriš li hrvatski?', pl: 'Języki i rozumienie', en: 'Languages and understanding' },
      tags: ['present'],
      words: [
        { hr: 'govoriti', pl: 'mówić', en: 'to speak', pos: 'verb', cat: 'languages', ico: '🗣️', ex: { hr: 'Govorim poljski.', pl: 'Mówię po polsku.', en: 'I speak Polish.' } },
        { hr: 'jezik', pl: ['język', 'język (mowa)'], en: 'language', pos: 'noun', g: 'm', cat: 'languages', ico: '💬', ex: { hr: 'Hrvatski je lijep jezik.', pl: 'Chorwacki to piękny język.', en: 'Croatian is a beautiful language.' } },
        { hr: 'poljski', pl: ['polski', 'po polsku'], en: 'Polish', pos: 'adj', cat: 'languages', ico: '🇵🇱', ex: { hr: 'Govoriš li poljski?', pl: 'Mówisz po polsku?', en: 'Do you speak Polish?' } },
        { hr: 'hrvatski', pl: ['chorwacki', 'po chorwacku'], en: 'Croatian', pos: 'adj', cat: 'languages', ico: '🇭🇷', ex: { hr: 'Učim hrvatski.', pl: 'Uczę się chorwackiego.', en: 'I am learning Croatian.' } },
        { hr: 'engleski', pl: ['angielski', 'po angielsku'], en: 'English', pos: 'adj', cat: 'languages', ico: '🇬🇧', ex: { hr: 'Govorim malo engleski.', pl: 'Mówię trochę po angielsku.', en: 'I speak a little English.' } },
        { hr: 'njemački', pl: ['niemiecki', 'po niemiecku'], en: 'German', pos: 'adj', cat: 'languages', ico: '🇩🇪', ex: { hr: 'Ne govorim njemački.', pl: 'Nie mówię po niemiecku.', en: "I don't speak German." } },
        { hr: 'malo', pl: ['trochę', 'mało'], en: ['a little', 'a bit'], pos: 'adv', cat: 'basics', ico: '🤏', ex: { hr: 'Govorim malo hrvatski.', pl: 'Mówię trochę po chorwacku.', en: 'I speak a little Croatian.' } },
        { hr: 'kako se kaže…?', pl: 'jak się mówi…?', en: 'how do you say…?', pos: 'phrase', cat: 'languages', ico: '🤔', ex: { hr: 'Kako se kaže „dziękuję” na hrvatskom?', pl: 'Jak się mówi „dziękuję” po chorwacku?', en: 'How do you say “thank you” in Croatian?' } },
        { hr: 'razumjeti', pl: 'rozumieć', en: 'to understand', pos: 'verb', cat: 'languages', ico: '💡', ex: { hr: 'Razumijem.', pl: 'Rozumiem.', en: 'I understand.' } },
        { hr: 'ne razumijem', pl: 'nie rozumiem', en: "I don't understand", pos: 'phrase', cat: 'languages', ico: '🤷', ex: { hr: 'Oprostite, ne razumijem.', pl: 'Przepraszam, nie rozumiem.', en: "Sorry, I don't understand." } },
        { hr: 'polako', pl: 'powoli', en: 'slowly', pos: 'adv', cat: 'languages', ico: '🐢', ex: { hr: 'Polako, molim.', pl: 'Powoli, proszę.', en: 'Slowly, please.' } },
        { hr: 'učiti', pl: 'uczyć się', en: 'to learn', pos: 'verb', cat: 'languages', ico: '📚', ex: { hr: 'Učim hrvatski.', pl: 'Uczę się chorwackiego.', en: 'I am learning Croatian.' } },
      ],
      grammar: {
        title: { pl: 'Czas teraźniejszy: govoriti', en: 'Present tense: govoriti' },
        body: {
          pl: `<p>Czasowniki na <b>-iti</b> odmieniają się z samogłoską <b>-i-</b>:</p>
<table class="gtable"><tr><th></th><th>govoriti</th><th>učiti</th></tr>
<tr><td>ja</td><td>govori<b>m</b></td><td>uči<b>m</b></td></tr><tr><td>ti</td><td>govori<b>š</b></td><td>uči<b>š</b></td></tr><tr><td>on/ona</td><td>govori</td><td>uči</td></tr>
<tr><td>mi</td><td>govori<b>mo</b></td><td>uči<b>mo</b></td></tr><tr><td>vi</td><td>govori<b>te</b></td><td>uči<b>te</b></td></tr><tr><td>oni</td><td>govor<b>e</b></td><td>uč<b>e</b></td></tr></table>
<p>Końcówki <b>-m, -š, -mo, -te</b> łatwo zapamiętać – w polskim „mówi<b>sz</b>, mówi<b>my</b>” są podobne.</p>
<p><b>Język:</b> <i>Govorim poljski</i> = mówię <b>po polsku</b> (bez „po”!). <i>Učim hrvatski</i> = uczę się chorwackiego (bez „się”!).</p>
<p>Przeczenie: <b>ne</b> przed czasownikiem: <i>Ne govorim njemački.</i> Wyjątek: <i>razumjeti → razumijem / ne razumijem</i>.</p>`,
          en: `<p>Verbs in <b>-iti</b> conjugate with <b>-i-</b>:</p>
<table class="gtable"><tr><th></th><th>govoriti</th><th>učiti</th></tr>
<tr><td>ja</td><td>govori<b>m</b></td><td>uči<b>m</b></td></tr><tr><td>ti</td><td>govori<b>š</b></td><td>uči<b>š</b></td></tr><tr><td>on/ona</td><td>govori</td><td>uči</td></tr>
<tr><td>mi</td><td>govori<b>mo</b></td><td>uči<b>mo</b></td></tr><tr><td>vi</td><td>govori<b>te</b></td><td>uči<b>te</b></td></tr><tr><td>oni</td><td>govor<b>e</b></td><td>uč<b>e</b></td></tr></table>
<p><b>Languages:</b> <i>Govorim poljski</i> = I speak Polish. <i>Učim hrvatski</i> = I'm learning Croatian.</p>
<p>Negation: <b>ne</b> before the verb: <i>Ne govorim njemački.</i> Note: <i>razumjeti → razumijem / ne razumijem</i>.</p>`,
        },
        examples: [
          { hr: 'Govoriš li engleski? – Malo.', pl: 'Mówisz po angielsku? – Trochę.', en: 'Do you speak English? – A little.' },
          { hr: 'Ne razumijem. Polako, molim.', pl: 'Nie rozumiem. Powoli, proszę.', en: "I don't understand. Slowly, please." },
        ],
      },
      dialog: {
        title: { pl: 'W sklepie z pamiątkami', en: 'In the souvenir shop' },
        lines: [
          { who: 'Prodavačica', hr: 'Dobar dan! Govorite li hrvatski?', pl: 'Dzień dobry! Mówi Pan po chorwacku?', en: 'Hello! Do you speak Croatian?' },
          { who: 'Marek', hr: 'Malo. Učim hrvatski.', pl: 'Trochę. Uczę się chorwackiego.', en: "A little. I'm learning Croatian." },
          { who: 'Prodavačica', hr: 'Super! Govorite dobro!', pl: 'Super! Dobrze Pan mówi!', en: 'Great! You speak well!' },
          { who: 'Marek', hr: 'Hvala! Ali polako, molim.', pl: 'Dziękuję! Ale powoli, proszę.', en: 'Thanks! But slowly, please.' },
          { who: 'Prodavačica', hr: 'Razumijete li engleski?', pl: 'Rozumie Pan po angielsku?', en: 'Do you understand English?' },
          { who: 'Marek', hr: 'Da, ali ne govorim njemački.', pl: 'Tak, ale nie mówię po niemiecku.', en: "Yes, but I don't speak German." },
        ],
      },
      sentences: [
        { hr: 'Govorim poljski.', pl: ['Mówię po polsku.', 'Ja mówię po polsku.'], en: 'I speak Polish.', why: { pl: 'Po chorwacku bez „po”: govorim poljski.', en: 'govorim + language name.' } },
        { hr: 'Govoriš li hrvatski?', pl: ['Czy mówisz po chorwacku?', 'Mówisz po chorwacku?'], en: 'Do you speak Croatian?' },
        { hr: 'Učim hrvatski.', pl: ['Uczę się chorwackiego.', 'Uczę się języka chorwackiego.'], en: ["I'm learning Croatian.", 'I am learning Croatian.', 'I learn Croatian.'], why: { pl: '„učiti” bez „się”: Učim hrvatski.', en: '“učiti” = to learn.' } },
        { hr: 'Ne razumijem.', pl: 'Nie rozumiem.', en: ["I don't understand.", 'I do not understand.'] },
        { hr: 'Polako, molim.', pl: ['Powoli, proszę.', 'Wolniej, proszę.'], en: ['Slowly, please.', 'Slower, please.'] },
        { hr: 'Govorim malo engleski.', pl: ['Mówię trochę po angielsku.', 'Trochę mówię po angielsku.'], en: 'I speak a little English.' },
        { hr: 'Ne govorim njemački.', pl: 'Nie mówię po niemiecku.', en: ["I don't speak German.", 'I do not speak German.'] },
        { hr: 'Mi učimo hrvatski.', pl: ['Uczymy się chorwackiego.', 'My uczymy się chorwackiego.'], en: ["We're learning Croatian.", 'We are learning Croatian.', 'We learn Croatian.'] },
        { hr: 'Hrvatski je lijep jezik.', pl: ['Chorwacki to piękny język.', 'Chorwacki jest pięknym językiem.'], en: 'Croatian is a beautiful language.' },
      ],
      cloze: [
        { hr: 'Ja ___ poljski.', answer: 'govorim', options: ['govorim', 'govoriš', 'govore'], pl: 'Mówię po polsku.', en: 'I speak Polish.', why: { pl: 'ja → -m: govorim.', en: 'ja → -m: govorim.' } },
        { hr: 'Mi ___ hrvatski.', answer: 'učimo', options: ['učimo', 'učim', 'uče'], pl: 'Uczymy się chorwackiego.', en: 'We are learning Croatian.', why: { pl: 'mi → -mo: učimo.', en: 'mi → -mo: učimo.' } },
        { hr: 'Oni ___ engleski.', answer: 'govore', options: ['govore', 'govori', 'govorimo'], pl: 'Oni mówią po angielsku.', en: 'They speak English.', why: { pl: 'oni → -e: govore.', en: 'oni → -e: govore.' } },
        { hr: 'Oprostite, ne ___.', answer: 'razumijem', options: ['razumijem', 'razumjeti', 'razumiješ'], pl: 'Przepraszam, nie rozumiem.', en: "Sorry, I don't understand.", why: { pl: 'ja → razumijem (ijekawica: -ije-).', en: 'ja → razumijem.' } },
        { hr: '___ li engleski?', answer: 'Govoriš', options: ['Govoriš', 'Govorim', 'Govore'], pl: 'Mówisz po angielsku?', en: 'Do you speak English?', why: { pl: 'Pytanie do „ti” → govoriš li…?', en: 'Asking “ti” → govoriš li…?' } },
      ],
      replies: [
        { prompt: 'Govoriš li hrvatski?', ok: 'Malo. Učim hrvatski.', bad: ['Ja sam iz Hrvatske.', 'Hvala, dobro.'], why: { pl: 'Pytanie o język → „Malo”, „Da”, „Ne”.', en: 'A question about language → “Malo”, “Da”, “Ne”.' } },
        { prompt: 'Razumiješ li?', ok: 'Ne razumijem. Polako, molim.', bad: ['Ne govorim, hvala.', 'Ja sam student.'], why: { pl: 'Jeśli nie rozumiesz: „Ne razumijem. Polako, molim.”', en: 'If you don’t understand: “Ne razumijem. Polako, molim.”' } },
        { prompt: 'Govorite dobro hrvatski!', ok: 'Hvala lijepa!', bad: ['Nema na čemu.', 'Doviđenja!'], why: { pl: 'Na komplement dziękujemy.', en: 'Thank people for a compliment.' } },
      ],
      tf: [
        { pl: 'Marek uczy się chorwackiego.', en: 'Marek is learning Croatian.', answer: true },
        { pl: 'Marek mówi po niemiecku.', en: 'Marek speaks German.', answer: false },
        { pl: 'Marek prosi, żeby mówić powoli.', en: 'Marek asks her to speak slowly.', answer: true },
      ],
    },

    // ───────────── Lekcja 4 ─────────────
    {
      id: 'd2l4',
      after: ['d2l2', 'd2l3'],
      scene: 'church',
      place: { hr: 'Katedrala', pl: 'Katedra', en: 'Cathedral' },
      title: { hr: 'Lijep grad', pl: 'Rodzaj rzeczownika i przymiotniki', en: 'Noun gender and adjectives' },
      tags: ['gender'],
      words: [
        { hr: 'grad', pl: 'miasto', en: 'city', pos: 'noun', g: 'm', cat: 'places', ico: '🏙️', ex: { hr: 'Zagreb je lijep grad.', pl: 'Zagrzeb to piękne miasto.', en: 'Zagreb is a beautiful city.' } },
        { hr: 'trg', pl: 'plac, rynek', en: 'square', pos: 'noun', g: 'm', cat: 'places', ico: '⛲', ex: { hr: 'Trg je velik.', pl: 'Plac jest duży.', en: 'The square is big.' } },
        { hr: 'ulica', pl: 'ulica', en: 'street', pos: 'noun', g: 'f', cat: 'places', ico: '🛣️', ex: { hr: 'Ova ulica je stara.', pl: 'Ta ulica jest stara.', en: 'This street is old.' } },
        { hr: 'crkva', pl: 'kościół', en: 'church', pos: 'noun', g: 'f', cat: 'places', ico: '⛪', ex: { hr: 'Crkva je stara.', pl: 'Kościół jest stary.', en: 'The church is old.' } },
        { hr: 'sat', pl: ['zegar', 'godzina'], en: ['clock', 'hour'], pos: 'noun', g: 'm', cat: 'places', ico: '🕰️', ex: { hr: 'Sat je na trgu.', pl: 'Zegar jest na placu.', en: 'The clock is on the square.' } },
        { hr: 'kip', pl: 'pomnik, posąg', en: 'statue', pos: 'noun', g: 'm', cat: 'places', ico: '🗽', ex: { hr: 'Kip je velik.', pl: 'Pomnik jest duży.', en: 'The statue is big.' } },
        { hr: 'velik', pl: ['duży', 'wielki'], en: ['big', 'large'], pos: 'adj', cat: 'adjectives', ico: '🐘', ex: { hr: 'Trg je velik.', pl: 'Plac jest duży.', en: 'The square is big.' } },
        { hr: 'malen', pl: 'mały', en: 'small', pos: 'adj', cat: 'adjectives', ico: '🐭', ex: { hr: 'Kiosk je malen.', pl: 'Kiosk jest mały.', en: 'The kiosk is small.' } },
        { hr: 'star', pl: 'stary', en: 'old', pos: 'adj', cat: 'adjectives', ico: '🏚️', ex: { hr: 'Grad je star.', pl: 'Miasto jest stare.', en: 'The city is old.' } },
        { hr: 'nov', pl: 'nowy', en: 'new', pos: 'adj', cat: 'adjectives', ico: '✨', ex: { hr: 'Tramvaj je nov.', pl: 'Tramwaj jest nowy.', en: 'The tram is new.' } },
        { hr: 'lijep', pl: 'piękny, ładny', en: ['beautiful', 'nice'], pos: 'adj', cat: 'adjectives', ico: '😍', ex: { hr: 'Zagreb je lijep.', pl: 'Zagrzeb jest piękny.', en: 'Zagreb is beautiful.' } },
        { hr: 'ovaj', pl: 'ten', en: 'this', pos: 'pron', cat: 'basics', ico: '👇', ex: { hr: 'Ovaj trg je velik.', pl: 'Ten plac jest duży.', en: 'This square is big.' } },
      ],
      grammar: {
        title: { pl: 'Rodzaj: on, ona, ono', en: 'Gender: masculine, feminine, neuter' },
        body: {
          pl: `<p>Rodzaj poznasz po końcówce – prawie jak po polsku:</p>
<table class="gtable"><tr><th>rodzaj</th><th>końcówka</th><th>przykład</th><th>przymiotnik</th></tr>
<tr><td>męski</td><td>spółgłoska</td><td>grad, trg, kip</td><td>velik, star, lijep</td></tr>
<tr><td>żeński</td><td>-a</td><td>ulica, crkva</td><td>velik<b>a</b>, star<b>a</b>, lijep<b>a</b></td></tr>
<tr><td>nijaki</td><td>-o / -e</td><td>jutro, more</td><td>velik<b>o</b>, star<b>o</b>, lijep<b>o</b></td></tr></table>
<p><b>Ten / ta / to:</b> <i>ovaj</i> trg · <i>ova</i> ulica · <i>ovo</i> jutro.</p>
<p>⚠️ <b>crkva</b> jest rodzaju <b>żeńskiego</b> (po polsku „kościół” – męski): <i>Crkva je stara.</i></p>
<p>⚠️ Fałszywi przyjaciele: <b>sat</b> = zegar / godzina (polski „czas” to <i>vrijeme</i>); <b>grad</b> = miasto.</p>`,
          en: `<p>You can tell the gender from the ending:</p>
<table class="gtable"><tr><th>gender</th><th>ending</th><th>example</th><th>adjective</th></tr>
<tr><td>masc.</td><td>consonant</td><td>grad, trg, kip</td><td>velik, star, lijep</td></tr>
<tr><td>fem.</td><td>-a</td><td>ulica, crkva</td><td>velik<b>a</b>, star<b>a</b>, lijep<b>a</b></td></tr>
<tr><td>neut.</td><td>-o / -e</td><td>jutro, more</td><td>velik<b>o</b>, star<b>o</b>, lijep<b>o</b></td></tr></table>
<p><b>This:</b> <i>ovaj</i> trg · <i>ova</i> ulica · <i>ovo</i> jutro.</p>
<p>⚠️ <b>sat</b> = clock / hour (time = <i>vrijeme</i>); <b>grad</b> = city.</p>`,
        },
        examples: [
          { hr: 'Ovaj trg je velik.', pl: 'Ten plac jest duży.', en: 'This square is big.' },
          { hr: 'Ova crkva je stara.', pl: 'Ten kościół jest stary.', en: 'This church is old.' },
          { hr: 'Zagreb je lijep grad.', pl: 'Zagrzeb to piękne miasto.', en: 'Zagreb is a beautiful city.' },
        ],
      },
      dialog: {
        title: { pl: 'Spacer do katedry', en: 'A walk to the cathedral' },
        lines: [
          { who: 'Ivana', hr: 'Ovo je katedrala. Crkva je stara i lijepa.', pl: 'To jest katedra. Kościół jest stary i piękny.', en: 'This is the cathedral. The church is old and beautiful.' },
          { who: 'Marek', hr: 'Da, vrlo lijepa! A ovaj kip?', pl: 'Tak, bardzo piękny! A ten pomnik?', en: 'Yes, very beautiful! And this statue?' },
          { who: 'Ivana', hr: 'To je ban Jelačić. Kip je velik, zar ne?', pl: 'To ban Jelačić. Pomnik jest duży, prawda?', en: "That's Ban Jelačić. The statue is big, isn't it?" },
          { who: 'Marek', hr: 'Jako velik! A ovaj sat?', pl: 'Bardzo duży! A ten zegar?', en: 'Very big! And this clock?' },
          { who: 'Ivana', hr: 'Sat je star. Ovdje se ljudi nalaze – ispod sata!', pl: 'Zegar jest stary. Tu ludzie się spotykają – pod zegarem!', en: 'The clock is old. People meet here – under the clock!' },
          { who: 'Marek', hr: 'Zagreb je lijep grad!', pl: 'Zagrzeb to piękne miasto!', en: 'Zagreb is a beautiful city!' },
        ],
      },
      sentences: [
        { hr: 'Zagreb je lijep grad.', pl: ['Zagrzeb to piękne miasto.', 'Zagrzeb jest pięknym miastem.'], en: 'Zagreb is a beautiful city.' },
        { hr: 'Ovaj trg je velik.', pl: ['Ten plac jest duży.', 'Ten plac jest wielki.'], en: ['This square is big.', 'This square is large.'] },
        { hr: 'Ova crkva je stara.', pl: 'Ten kościół jest stary.', en: 'This church is old.', why: { pl: 'crkva – rodzaj żeński → ova, stara.', en: 'crkva is feminine → ova, stara.' } },
        { hr: 'Ulica je nova.', pl: 'Ulica jest nowa.', en: ['The street is new.', 'Street is new.'] },
        { hr: 'Kip je star i velik.', pl: ['Pomnik jest stary i duży.', 'Posąg jest stary i duży.'], en: ['The statue is old and big.', 'The statue is old and large.'] },
        { hr: 'Kiosk je malen.', pl: 'Kiosk jest mały.', en: 'The kiosk is small.' },
        { hr: 'Sat je na trgu.', pl: ['Zegar jest na placu.', 'Zegar jest na rynku.'], en: 'The clock is on the square.', why: { pl: '„sat” = zegar (nie czas!).', en: '“sat” = clock.' } },
        { hr: 'Ovo jutro je lijepo.', pl: ['To rano jest piękne.', 'Ten poranek jest piękny.'], en: 'This morning is beautiful.', why: { pl: 'jutro – nijaki → ovo, lijepo.', en: 'jutro is neuter → ovo, lijepo.' } },
      ],
      cloze: [
        { hr: 'Ulica je ___.', answer: 'stara', options: ['stara', 'star', 'staro'], pl: 'Ulica jest stara.', en: 'The street is old.', why: { pl: 'ulica (ż.) → stara.', en: 'ulica (f.) → stara.' } },
        { hr: 'Trg je ___.', answer: 'velik', options: ['velik', 'velika', 'veliko'], pl: 'Plac jest duży.', en: 'The square is big.', why: { pl: 'trg (m.) → velik.', en: 'trg (m.) → velik.' } },
        { hr: '___ crkva je lijepa.', answer: 'Ova', options: ['Ova', 'Ovaj', 'Ovo'], pl: 'Ten kościół jest piękny.', en: 'This church is beautiful.', why: { pl: 'crkva jest żeńska (inaczej niż po polsku!) → ova.', en: 'crkva is feminine → ova.' } },
        { hr: 'Jutro je ___.', answer: 'lijepo', options: ['lijepo', 'lijep', 'lijepa'], pl: 'Poranek jest piękny.', en: 'The morning is beautiful.', why: { pl: 'jutro (n.) → lijepo.', en: 'jutro (n.) → lijepo.' } },
        { hr: 'Koliko je ___? – Deset.', answer: 'sati', options: ['sati', 'vremena', 'grada'], pl: 'Która godzina? – Dziesiąta.', en: 'What time is it? – Ten.', why: { pl: '„Koliko je sati?” = Która godzina? sat = godzina/zegar.', en: '“Koliko je sati?” = What time is it?' } },
      ],
      replies: [
        { prompt: 'Kakav je Zagreb?', ok: 'Zagreb je lijep grad.', bad: ['Zagreb je lijepa.', 'Zagreb je iz Poljske.'], why: { pl: 'grad (m.) → lijep.', en: 'grad (m.) → lijep.' } },
        { prompt: 'Je li crkva nova?', ok: 'Ne, crkva je stara.', bad: ['Ne, crkva je star.', 'Da, ovaj je crkva.'], why: { pl: 'crkva (ż.) → stara.', en: 'crkva (f.) → stara.' } },
        { prompt: 'Gdje je sat?', ok: 'Sat je tamo, na trgu.', bad: ['Sat je velika.', 'To je ban Jelačić.'], why: { pl: '„Gdje” pyta o miejsce: tamo, ovdje.', en: '“Gdje” asks about place: tamo, ovdje.' } },
      ],
      tf: [
        { pl: 'Katedra jest nowa.', en: 'The cathedral is new.', answer: false },
        { pl: 'Pomnik bana Jelačicia jest duży.', en: 'The Ban Jelačić statue is big.', answer: true },
        { pl: 'Ludzie umawiają się „pod zegarem”.', en: 'People meet “at the clock”.', answer: true },
      ],
    },

    // ───────────── Boss ─────────────
    {
      id: 'd2boss',
      boss: true,
      scene: 'square',
      place: { hr: 'Trg bana Jelačića', pl: 'Plac bana Jelačicia', en: 'Ban Jelačić Square' },
      title: { hr: 'Sastanak kod sata', pl: 'Spotkanie pod zegarem', en: 'Meeting at the clock' },
      tags: ['biti', 'nationalities', 'present', 'gender'],
      words: [
        { hr: 'ispod sata', pl: 'pod zegarem', en: 'under the clock', pos: 'phrase', cat: 'places', ico: '🕰️', ex: { hr: 'Vidimo se ispod sata!', pl: 'Widzimy się pod zegarem!', en: 'See you under the clock!' } },
        { hr: 'vrlo', pl: 'bardzo', en: 'very', pos: 'adv', cat: 'basics', ico: '💯', ex: { hr: 'Vrlo lijepo!', pl: 'Bardzo ładnie!', en: 'Very nice!' } },
      ],
      intro: {
        pl: 'Umówiłeś się z Ivaną „ispod sata” – pod słynnym zegarem na placu, gdzie zagrzebianie umawiają się na spotkania. Ivany jeszcze nie ma, ale podchodzą do ciebie turyści…',
        en: 'You agreed to meet Ivana “ispod sata” – under the famous clock on the square, Zagreb’s favourite meeting point. She isn’t here yet, but some tourists come up to you…',
      },
      story: [
        { narr: { pl: 'Na placu tłum. Dwie dziewczyny z mapą rozglądają się niepewnie.', en: 'The square is busy. Two girls with a map look around uncertainly.' } },
        { who: 'Giulia', hr: 'Oprostite, govorite li engleski?', pl: 'Przepraszam, mówi Pan po angielsku?', en: 'Excuse me, do you speak English?', options: ['Malo. I malo hrvatski.', 'Ja sam iz Engleske.', 'Laku noć!'], answer: 0, why: { pl: 'Pytanie o język → „Malo” (trochę).', en: 'A question about language → “Malo”.' } },
        { who: 'Giulia', hr: 'Super! Mi smo iz Italije. Odakle ste vi?', pl: 'Super! Jesteśmy z Włoch. A Pan skąd jest?', en: "Great! We're from Italy. Where are you from?", options: ['Ja sam Poljska.', 'Ja sam iz Poljske.', 'Vi ste iz Italije.'], answer: 1, why: { pl: '„iz” + dopełniacz: iz Poljske.', en: '“iz” + genitive: iz Poljske.' } },
        { who: 'Sara', hr: 'Jeste li vi turist?', pl: 'Jest Pan turystą?', en: 'Are you a tourist?', options: ['Da, ja sam turist.', 'Da, mi su turisti.', 'Da, on je turist.'], answer: 0, why: { pl: 'O sobie: ja sam (jestem).', en: 'About yourself: ja sam.' } },
        { who: 'Sara', hr: 'Gdje je katedrala?', pl: 'Gdzie jest katedra?', en: 'Where is the cathedral?', options: ['Katedrala je tamo. Vrlo je lijepa!', 'Katedrala je tamo. Vrlo je lijep!', 'Katedrala je iz Zagreba.'], answer: 0, why: { pl: 'katedrala (ż.) → lijepa.', en: 'katedrala (f.) → lijepa.' } },
        { who: 'Giulia', hr: 'Hvala! Što je ovo? Kip?', pl: 'Dziękujemy! Co to jest? Pomnik?', en: 'Thanks! What is this? A statue?', options: ['Da, to je ban Jelačić.', 'Da, to je Ivana.', 'Ne, to je sat.'], answer: 0, why: { pl: 'Pomnik na placu przedstawia bana Jelačicia.', en: 'The statue on the square is Ban Jelačić.' } },
        { who: 'Sara', hr: 'Hvala lijepa! Bok!', pl: 'Dziękujemy bardzo! Cześć!', en: 'Thank you very much! Bye!', options: ['Nema na čemu! Bok!', 'Hvala lijepa! Bok!', 'Odakle si?'], answer: 0, why: { pl: 'Na podziękowanie: „Nema na čemu”.', en: 'In reply to thanks: “Nema na čemu”.' } },
        { narr: { pl: 'Przychodzi Ivana z kolegą.', en: 'Ivana arrives with a friend.' } },
        { who: 'Ivana', hr: 'Bok, Marek! Ovo je Tomas. On je iz Njemačke.', pl: 'Cześć, Marek! To Tomas. Jest z Niemiec.', en: "Hi, Marek! This is Tomas. He's from Germany." },
        { who: 'Tomas', hr: 'Bok! Ja sam Tomas. Učim hrvatski.', pl: 'Cześć! Jestem Tomas. Uczę się chorwackiego.', en: "Hi! I'm Tomas. I'm learning Croatian.", options: ['I ja učim hrvatski! Drago mi je.', 'I ja učiš hrvatski!', 'On uči njemački.'], answer: 0, why: { pl: 'ja → učim: „I ja učim hrvatski!”', en: 'ja → učim: “I ja učim hrvatski!”' } },
        { who: 'Ivana', hr: 'Super! Idemo na kavu!', pl: 'Super! Chodźmy na kawę!', en: "Great! Let's go for coffee!" },
        { narr: { pl: 'Ruszacie razem w stronę kawiarni. 🎉', en: 'You all head off to a café. 🎉' } },
      ],
    },
  ],
};
