// Metadane wszystkich 12 dzielnic. Treść lekcji leży w plikach dXX.js.
// Aby dodać dzielnicę: utwórz plik dXX.js (patrz d01.js) i dopisz go do DISTRICT_FILES.
import d01 from './d01.js';
import d02 from './d02.js';
import d03 from './d03.js';
import d04 from './d04.js';

export const DISTRICT_FILES = [d01, d02, d03, d04];

export const DISTRICTS_META = [
  { id: 'd1',  hr: 'Glavni kolodvor',     pl: 'Dworzec Główny',        en: 'Main Station',           color: '#1593d6', scene: 'station' },
  { id: 'd2',  hr: 'Trg bana Jelačića',   pl: 'Centrum miasta',         en: 'City Centre',            color: '#d7262f', scene: 'square' },
  { id: 'd3',  hr: 'Kafić',               pl: 'Kawiarnia',              en: 'Café',                   color: '#a0632b', scene: 'cafe' },
  { id: 'd4',  hr: 'Tržnica Dolac',       pl: 'Targ Dolac',             en: 'Dolac Market',           color: '#e0473a', scene: 'market' },
  { id: 'd5',  hr: 'Pekara i trgovina',   pl: 'Piekarnia i sklep',      en: 'Bakery & Shop',          color: '#e39b2d', scene: 'bakery' },
  { id: 'd6',  hr: 'Stambena četvrt',     pl: 'Osiedle mieszkaniowe',   en: 'Residential Quarter',    color: '#7a5cc9', scene: 'house' },
  { id: 'd7',  hr: 'Tramvaj i ulice',     pl: 'Tramwaje i ulice',       en: 'Trams & Streets',        color: '#1f6fd1', scene: 'tram' },
  { id: 'd8',  hr: 'Restoran',            pl: 'Restauracja',            en: 'Restaurant',             color: '#c2452d', scene: 'restaurant' },
  { id: 'd9',  hr: 'Ljekarna i bolnica',  pl: 'Apteka i szpital',       en: 'Pharmacy & Hospital',    color: '#16a085', scene: 'pharmacy' },
  { id: 'd10', hr: 'Park Maksimir',       pl: 'Park Maksimir',          en: 'Maksimir Park',          color: '#3aa655', scene: 'park' },
  { id: 'd11', hr: 'Gornji grad',         pl: 'Górne Miasto',           en: 'Upper Town',             color: '#b8452f', scene: 'church' },
  { id: 'd12', hr: 'Hotel i ured',        pl: 'Hotel i biuro',          en: 'Hotel & Office',         color: '#2c4f8a', scene: 'hotel' },
];
