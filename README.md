# Rakovica Resort — web stranica

Statična stranica: nema baze, nema servera, samo fajlovi. Ubaci ih na bilo koji
hosting i radi odmah.

## Struktura

```
rakovica-resort/
├── index.html              ← sama stranica
├── robots.txt
├── README.md               ← ovo uputstvo
└── assets/
    ├── favicon.svg         ← ikonica u tabu browsera
    ├── css/style.css       ← sav izgled
    ├── js/script.js        ← galerija, kontakt panel, video, karta
    ├── img/                ← 29 slika u više veličina
    │   ├── g01.webp        ← velika (otvara se klikom u galeriji)
    │   ├── g01-xs.webp     ← sitna (mreža galerije)
    │   ├── g01-sm.webp     ← srednja (samo slike u sekcijama)
    │   ├── hero-wide.webp  ← naslovna, veliki ekrani
    │   ├── hero-wide-sm.webp
    │   ├── hero-tall.webp  ← naslovna, mobitel
    │   └── og-cover.jpg    ← slika koja se vidi kad se link dijeli
    └── video/promo.mp4
```

## Šta trebaš popuniti

Otvori `assets/js/script.js`. Na samom vrhu je:

```js
const PODACI = {
  telefon:   "+387 00 000 000",
  email:     "info@rakovicaresort.ba",
  instagram: "https://www.instagram.com/resort_rakovica/",
  booking:   "https://www.booking.com/hotel/ba/rakovica-resort-sarajevo3.hr.html",
  video: "assets/video/promo.mp4"
};
```

Zamijeni broj telefona, e-mail i link na Facebook (Instagram je već upisan). Ništa drugo
ne treba dirati — broj i mail se sami upisuju i u kontakt panel i u podnožje.

Ako video ikad prebaciš na YouTube, samo zalijepi link umjesto putanje:

```js
video: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
```

Skripta sama prepozna YouTube i ubaci player.

## Postavljanje na internet

**Najlakše (besplatno):** Netlify Drop — otvori https://app.netlify.com/drop i
prevuci cijeli `rakovica-resort` folder u prozor. Dobiješ link za par sekundi.
Isto radi i Cloudflare Pages ili GitHub Pages.

**Klasični hosting (cPanel, FTP):** ubaci sadržaj foldera u `public_html`.
Bitno je da `index.html` bude direktno u `public_html`, a `assets` pored njega.

Kad dobiješ domenu, u `index.html` odkomentariši blok pri vrhu i upiši punu
adresu (canonical, og:url, og:image). To pomaže kad se link dijeli na Viberu,
WhatsAppu i Facebooku.

## Mijenjanje sadržaja

- **Tekstovi** — sve je u `index.html`, na bosanskom, lako se nađe pretragom.
- **Udaljenosti do atrakcija** — sekcija `id="okolina"`.
- **Adresa i koordinate** — sekcija `id="lokacija"`. Koordinate `43.86697,
  18.21891` se pojavljuju na tri mjesta (karta, navigacija, kontakt panel).
- **Nova slika u galeriju** — ubaci `gXX.webp` (velika) i `gXX-xs.webp` (sitna,
  oko 620 px) u `assets/img/`, pa u `script.js` dodaj red u listu `SLIKE` sa
  `k`, `opis`, `w` i `h` (`w`/`h` su dimenzije sitne verzije).

## Tehnički detalji

- Slike su u WebP formatu, prošle kroz upscaling — rade u svim browserima
  novijim od 2020.
- Naslovna slika se povlači preko `<link rel="preload">`, i to samo ona verzija
  koja odgovara širini ekrana — mobitel ne skida verziju za desktop.
- Mreža galerije koristi sitne verzije (~45 KB), a čim se stranica učita, sve
  se tiho povuku u pozadini. Kad dođete do galerije, slike su već tu — nema
  iskakanja. U lightboxu se susjedne slike povlače unaprijed, pa su strelice
  trenutne.
- Fontovi su lokalni (`assets/fonts/`), ne povlače se sa Google Fontsa — sajt
  radi jednako brzo i bez vanjskih servisa. Jedino karta dolazi sa Google
  Mapsa; ako ne uspije da se učita, sama se zamijeni adresom i dugmetom.
- Naslovna slika je vaša upscalana verzija; mobilna naslovna i ostale su
  obrađene kroz EDSR/FSRCNN upscaling.
- Natpis u zaglavlju nije slika nego živi tekst: Poppins Bold + palma iz vašeg
  logotipa kao vektor (`#i-palma` u `index.html`) + Fraunces za „RESORT".
  Zato je oštar na svakom ekranu i može se obojiti kroz CSS varijablu
  `--palma` (`assets/css/style.css`).
- Stranica poštuje `prefers-reduced-motion`, ima vidljiv fokus za tastaturu i
  prilagođava se sve do uskih mobitela.
