# Kazokinė – kaimo turizmo sodyba

Statinė svetainė be priklausomybių ir be build žingsnio. Atsidaro tiesiai
naršyklėje (`index.html`) arba bet kuriame statiniame hostinge.

## Struktūra

```
index.html        Apie sodybą: mozaika, namai, veiklos, kainos, akcijos
namai.html        Kiekvienas namas su aprašymu ir nuotraukų tinkleliu
galerija.html     Visos 60 nuotraukų su filtru pagal grupę
kontaktai.html    Telefonai, el. paštas, žemėlapis, atvykimas

css/
  tokens.css      Spalvos, šriftai, tipografijos skalė, tarpai, spindulys
  base.css        Reset ir HTML elementų numatytieji stiliai
  layout.css      Konteineris, sekcijos, antraštė, poraštė
  components.css  Mygtukai, kortelės, tinkleliai, lightbox, tuščios būsenos

js/
  nav.js             Mobilaus meniu perjungiklis
  lightbox.js        Nuotraukų peržiūra per visą ekraną (<dialog>)
  gallery-filter.js  Galerijos filtras (tik galerija.html)

assets/img/
  aplinka/        Sodas, upė, baidarės, sporto aikštelės
  pirmas-namas/   14 vietų namas su pokylių sale
  antras-namas/   11 vietų namas su antresole
  pirties-namas/  Pirtis, kubilas, lieptas
  saslykine/      Lauko šašlykinė
```

## Dizaino taisyklės

- Tekstas lygiuojamas į kairę, eilutė ne ilgesnė nei 70 simbolių.
- Viena akcentinė spalva (`--color-accent`), vienas kampų spindulys (`--radius`).
- Šriftų pora: Newsreader (antraštės) ir Public Sans (tekstas).
- Visi teksto dydžiai – iš skalės `--step-*` (santykis 1.25).
- Ikonos – tik Phosphor. Jokių emoji, gradientų, šešėlių, animacijų
  ir užvedimo (hover) efektų.

## Nuotraukų pridėjimas

1. Įkelkite failą į atitinkamą `assets/img/<grupė>/` aplanką.
2. Nukopijuokite esamą `<figure class="photo">` bloką `namai.html` ir
   `galerija.html` faile, pakeiskite kelią ir `alt` tekstą.
3. Vertikaliai nuotraukai pridėkite klasę `is-tall`, horizontaliai per du
   stulpelius – `is-wide`. Tinklelyje neturi likti tuščių langelių.

Antraštė ir poraštė yra vienodos visuose keturiuose puslapiuose – keičiant
jas, pakeiskite visuose failuose.
