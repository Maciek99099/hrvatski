# Hrvatski 🇭🇷

Aplikacja do nauki chorwackiego od zera (A0 → A1/A2): trasa lekcji po planie Zagrzebia, rozwidlenia, fiszki SM-2, statystyki.
Działa offline, bez reklam i kont. Interfejs PL / EN. Przetestowana na rozmiarach iPhone 12 (390×844) i iPad 5. gen (768×1024, pion i poziom).

> **Stan: dzielnice 1–4 kompletne** (16 lekcji + 4 bossy, ~200 słów) + 6 mini-gier. Dzielnice 5–12 są na mapie jako „wkrótce”.

## Program dzielnic 1–4

| Dzielnica | Lekcje (⑂ = rozwidlenie) | Gramatyka |
|---|---|---|
| 1 Glavni kolodvor | Powitania · ⑂ Kiosk (przedstawianie się) / Informacja (grzeczności) · Liczby 0–10 · Boss | alfabet, enklityki, ti/Vi, jedan/dva |
| 2 Trg bana Jelačića | Zaimki i biti · ⑂ Hostel (kraje, narodowości) / Pamiątki (języki) · Rodzaj i przymiotniki · Boss „Ispod sata” | biti + przeczenia, iz + dopełniacz, czas teraźniejszy -iti, rodzaj |
| 3 Kafić | Napoje · ⑂ Cukiernia / Taras (Mogu li…?) · Liczby 11–100 i ceny w euro · Boss „Kava s Ivanom” | htjeti/željeti, biernik l.poj., Može!, euro/eura, centi |
| 4 Tržnica Dolac | Owoce · ⑂ Warzywa / Kwiaciarnia (kolory) · Ilości i miary · Boss „Velika kupovina” | l. mnoga, kupovati, zgodność kolorów, kila/pola kile |

Zasady dydaktyczne: 11–13 nowych słów na lekcję, gramatyka zawsze w kontekście miejsca, porównania z polskim
i „fałszywi przyjaciele” (jagoda = truskawka, luk = cebula, grah = fasola, skup = drogi, plav = niebieski, sat = zegar),
powtórki rozłożone w czasie (fiszki SM-2) i mieszanie typów zadań; w lekcjach wracają słowa z poprzednich.

## Mini-gry (zakładka „Gry”)

Memory · Wyścig 60 s · Zgadnij słowo (wisielec) · Łapanie słów · Kelner (słuchanie zamówień) · Zakupy na Dolcu (liczenie w euro).
Gry używają **tylko słów z ukończonych lekcji** i odblokowują się z postępem. Nawigacja tramwajem dojdzie z dzielnicą 7.

## 1. Publikacja na GitHub Pages (za darmo, ok. 5 minut)

1. Załóż konto na <https://github.com>.
2. **New repository** → nazwa `hrvatski` → **Public** → **Create repository**.
3. **uploading an existing file** (albo *Add file → Upload files*) → przeciągnij **zawartość** rozpakowanego folderu `hrvatski`
   (`index.html`, `sw.js`, `manifest.webmanifest`, `README.md` oraz foldery `css`, `js`, `fonts`, `icons`, `tools`) → **Commit changes**.
   Plik `index.html` musi być w głównym katalogu repozytorium.
4. **Settings → Pages** → *Source*: **Deploy from a branch** → *Branch*: `main` / `(root)` → **Save**.
5. Po 1–2 minutach aplikacja jest pod adresem `https://TWOJ-LOGIN.github.io/hrvatski/`.

## 2. Instalacja na iPadzie i iPhonie

1. Otwórz adres w **Safari**.
2. **Udostępnij** (kwadrat ze strzałką) → **Do ekranu początkowego** → nazwa „Hrvatski” → **Dodaj**.
3. Uruchom z ikony z Kiki. Pierwsze uruchomienie (z internetem) zapisuje całą aplikację w pamięci – potem działa bez sieci.

Zrób to na obu urządzeniach. **iPad 5. generacji** działa na iPadOS 16 (to jego ostatni system) – aplikacja jest do niego dostosowana.

### Wymowa (głos chorwacki)
Ustawienia → **Dostępność → Treść mówiona → Głosy → Chorwacki → Lana** (pobierz), potem zamknij i otwórz aplikację.
Na starszych iPadOS ścieżka bywa: Ustawienia → Dostępność → Mowa → Głosy.

## 3. Zapisywanie postępu

- Postęp zapisuje się **automatycznie po każdym zadaniu** – nic nie trzeba klikać.
- Zapis jest **podwójny** (localStorage + IndexedDB): jeśli iOS wyczyści jeden magazyn, aplikacja odtworzy postęp z drugiego.
- Używaj aplikacji **z ikony na ekranie początkowym** – wtedy iOS nie usuwa jej danych (strony otwierane tylko w Safari mogą zostać wyczyszczone po 7 dniach nieużywania).
- iPhone i iPad mają **osobne** postępy – aplikacja nie ma serwera, więc nie synchronizuje się sama. Żeby przenieść postęp:
  *Ustawienia → Twoje dane → Eksportuj* → zapisz w iCloud Drive → na drugim urządzeniu *Importuj*.
- Eksport warto robić co jakiś czas jako kopię zapasową.

## Aktualizacja aplikacji

Po każdej zmianie plików uruchom (wymaga Node.js):

```
node tools/build-sw.mjs
```

Skrypt odświeża listę plików w `sw.js` i podbija wersję – urządzenia pobiorą nową wersję przy następnym uruchomieniu z internetem.

## Struktura

```
index.html              powłoka PWA, ikony, ekrany startowe iOS
manifest.webmanifest    instalacja (standalone)
sw.js                   service worker – offline (cache-first)
css/app.css             motyw „plan miasta” (ciemny/jasny, iPhone/iPad, Safari 16+)
fonts/                  Nunito (licencja OFL)
js/
  app.js                routing, zakładki
  store.js              stan, localStorage, eksport/import
  content.js            rejestr treści, odblokowywanie, rozwidlenia
  engine.js             generator zadań z danych lekcji
  lesson.js             ekran lekcji, 15 typów zadań, informacja zwrotna
  map.js                mapa: plan miasta (SVG), trasa, przystanki, panel lekcji, chodząca Kiki
  layout.js             geometria dzielnicy: ulice, rozwidlenia, trasy
  pixel.js              pikselowa Kiki w okularach (sprite)
  words.js / cards.js   bank słówek / fiszki SM-2
  stats.js / progress.js statystyki, XP, seria, odznaki, opanowanie słów
  speech.js             wymowa hr-HR, rozpoznawanie mowy
  i18n.js               teksty PL/EN
  data/curriculum.js    lista 12 dzielnic
  data/d01–d04.js       dzielnice 1–4 (lekcje, dialogi, gramatyka, bossy)
  games.js              mini-gry
tools/build-sw.mjs      generator listy cache
```

## Jak dodać lekcję / dzielnicę

Treść to czyste dane – silnik sam generuje z nich 15–25 zadań.

```js
{
  id: 'd2l1',
  scene: 'cafe',                 // ikona miejsca na mapie: platform, station, kiosk, info, ticket, square, cafe, market,
                                 // bakery, shop, house, tram, restaurant, pharmacy, hospital, park, church, museum, hotel, office
  place: { hr, pl, en },
  title: { hr, pl, en },
  tags: ['biti'],                // temat gramatyczny – do statystyk „mocne/słabe strony”
  after: ['d1l4'],               // opcjonalnie (patrz „Rozwidlenia”)
  words: [{ hr, pl, en, pos, g, cat, ico, ex: { hr, pl, en } }],   // pl/en może być tablicą wariantów
  grammar: { title: { pl, en }, body: { pl, en }, examples: [{ hr, pl, en }] },
  dialog: { title: { pl, en }, lines: [{ who, hr, pl, en }] },
  sentences: [{ hr, pl, en, why? }],              // każde pole może być tablicą poprawnych wariantów
  cloze: [{ hr: 'Ja ___ Ana.', answer, options, pl, en, why }],
  replies: [{ prompt, ok, bad: [..], why }],      // „wybierz właściwą odpowiedź rozmówcy”
  tf: [{ pl, en, answer }],                       // prawda/fałsz do dialogu
}
```

Boss: `boss: true`, `intro: { pl, en }`, `story: [...]` (kroki narracji `{ narr }`, kwestie `{ who, hr, pl, en }`, wybory `{ …, options, answer, why }`).

Nowy plik dzielnicy dopisz w `js/data/curriculum.js` (import + `DISTRICT_FILES`).

### Rozwidlenia
Dwie lekcje z identycznym `after` tworzą na mapie rozwidlenie: ulica rozchodzi się do dwóch budynków.
Użytkownik wybiera jedną; kolejna lekcja (z `after: [obie]`) odblokowuje się po **dowolnej** z nich.
Boss dzielnicy wymaga **wszystkich** lekcji, więc do drugiej odnogi trzeba wrócić przed bossem.
Jeśli późniejsza lekcja używa słów z nieprzerobionej odnogi, ekran „Nowe słówka” pokazuje je jako przypomnienie.
