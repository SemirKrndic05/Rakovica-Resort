/* ============================================================
   PODESITE OVDJE  —  jedino mjesto koje treba mijenjati
   ============================================================ */
const PODACI = {
  telefon:     "061 488 588",                   // kako se ispisuje na stranici
  telefonPoziv: "+38761488588",                 // za klik na broj i pozive iz inostranstva
  instagram: "https://www.instagram.com/resort_rakovica/",
  facebook:  "https://www.facebook.com/",       // ← link na Facebook stranicu
  booking:   "https://www.booking.com/hotel/ba/rakovica-resort-sarajevo3.hr.html",
  // Promo video: naziv fajla pored stranice ILI YouTube link.
  // Fajl se nalazi u assets/video/. Za YouTube samo zalijepite link.
  video: "assets/video/promo.mp4"
};

/* ---------- popunjavanje kontakata ---------- */
(function popuni(){
  const tel = PODACI.telefon.trim();
  const href = "tel:" + (PODACI.telefonPoziv || tel).replace(/[^\d+]/g,"");
  document.querySelectorAll("[data-tel]").forEach(el => el.textContent = tel);
  document.querySelectorAll("a[data-tel]").forEach(el => el.setAttribute("href", href));
  document.querySelectorAll("[data-tel-href]").forEach(el => el.setAttribute("href", href));
  document.querySelectorAll("a[data-ig]").forEach(a => a.href = PODACI.instagram);
  document.getElementById("godina").textContent = new Date().getFullYear();
})();

/* ---------- galerija ---------- */
const PUT = "assets/img/";
const SLIKE = [{"k": "g26","opis": "Bazen sa pogledom na glavnu zgradu, ljetni dan","w": 900,"h": 506},{"k": "g01","opis": "Veliki bazen sa suncobranima i ležaljkama","w": 900,"h": 506},{"k": "g25","opis": "Bazen i sunčalište ispred zgrade resorta","w": 900,"h": 506},{"k": "g22","opis": "Kutak uz bazen sa crvenim suncobranom i ležaljkom","w": 900,"h": 506},{"k": "g02","opis": "Bazen i dječji dio na kamenoj terasi","w": 600,"h": 900},{"k": "g03","opis": "Bazen ispred zgrade sa apartmanima","w": 675,"h": 900},{"k": "g28","opis": "Ulazni luk „Dobro došli“ na ulazu u imanje","w": 900,"h": 506},{"k": "g10","opis": "Osvijetljeni ulazni luk u sumrak","w": 675,"h": 900},{"k": "g29","opis": "Imanje iz zraka — ulazni luk, bašta i bazen","w": 900,"h": 506},{"k": "g27","opis": "Bazen i bašta iz zraka, okruženi šumom","w": 900,"h": 506},{"k": "g08","opis": "Kružni tok sa fontanom i pogled na planine","w": 675,"h": 900},{"k": "g07","opis": "Prilaz i kružni tok, sa bazenom desno","w": 900,"h": 506},{"k": "g04","opis": "Glavna zgrada, kružni tok i bašta iz zraka","w": 900,"h": 506},{"k": "g05","opis": "Pogled iz zraka na cijelo imanje","w": 900,"h": 506},{"k": "g06","opis": "Raspored zgrada, bazena i vrtnog dijela","w": 900,"h": 506},{"k": "g21","opis": "Sjenica sa roštiljem i bazen među krošnjama","w": 900,"h": 506},{"k": "g09","opis": "Natkriveni drveni paviljon sa stolom i klupama","w": 675,"h": 900},{"k": "g23","opis": "Drveni paviljon sa velikim stolom za društvo","w": 900,"h": 506},{"k": "g24","opis": "Lux Pool Cafe — ljetna terasa uz bazen","w": 900,"h": 506},{"k": "g11","opis": "Svadbeni salon postavljen za proslavu","w": 900,"h": 506},{"k": "g12","opis": "Dio salona sa cvjetnim lukom za mladence","w": 900,"h": 506},{"k": "g13","opis": "Restoran sa drvenim stolovima","w": 900,"h": 449},{"k": "g14","opis": "Prostrani dnevni boravak u apartmanu","w": 900,"h": 506},{"k": "g15","opis": "Dnevni boravak sa trpezarijskim dijelom","w": 900,"h": 449},{"k": "g16","opis": "Dnevni boravak sa dva kauča i TV-om","w": 900,"h": 526},{"k": "g17","opis": "Unutrašnjost drvene vikendice","w": 900,"h": 506},{"k": "g18","opis": "Manji studio apartman","w": 900,"h": 506},{"k": "g19","opis": "Detalj apartmana — TV i radni kutak","w": 900,"h": 506},{"k": "g20","opis": "Potpuno opremljena kuhinja u apartmanu","w": 900,"h": 506}].map(s => ({
  malo:   PUT + s.k + "-xs.webp",
  veliko: PUT + s.k + ".webp",
  opis: s.opis, w: s.w, h: s.h
}));

(function izgradiGaleriju(){
  const mreza = document.getElementById("galerija-mreza");
  mreza.innerHTML = SLIKE.map((s,i) => `
    <figure>
      <button type="button" data-index="${i}" aria-label="Otvori sliku: ${s.opis}">
        <img src="${s.malo}" alt="${s.opis}" width="${s.w}" height="${s.h}" loading="lazy" decoding="async">
      </button>
      <figcaption>${s.opis}</figcaption>
    </figure>`).join("");
})();

/* ---------- svjetlosni okvir ---------- */
const okvir = document.getElementById("okvir");
const okvirSlika = document.getElementById("okvir-slika");
const okvirOpis = document.getElementById("okvir-opis");
const okvirBrojac = document.getElementById("okvir-brojac");
let trenutna = 0, pokretacOkvira = null;

function url(s, veliko){ return veliko ? (s.veliko || s.src) : (s.malo || s.src); }

/* susjedne slike se povuku unaprijed da strelice budu trenutne */
function prednapuni(i){
  [i - 1, i + 1].forEach(j => {
    const u = url(SLIKE[(j + SLIKE.length) % SLIKE.length], true);
    if (u && !u.startsWith("data:")) { const im = new Image(); im.src = u; }
  });
}

function prikaziSliku(i){
  trenutna = (i + SLIKE.length) % SLIKE.length;
  const s = SLIKE[trenutna];
  prednapuni(trenutna);
  okvirSlika.src = s.veliko;
  okvirSlika.alt = s.opis;
  okvirOpis.textContent = s.opis;
  okvirBrojac.textContent = (trenutna+1) + " / " + SLIKE.length;
}
function otvoriOkvir(i, pokretac){
  pokretacOkvira = pokretac || null;
  prikaziSliku(i);
  okvir.classList.add("otvoren");
  document.body.classList.add("zakljucano");
  document.getElementById("okvir-zatvori").focus();
}
function zatvoriOkvir(){
  okvir.classList.remove("otvoren");
  document.body.classList.remove("zakljucano");
  if (pokretacOkvira) pokretacOkvira.focus();
}
document.getElementById("galerija-mreza").addEventListener("click", e => {
  const b = e.target.closest("button[data-index]");
  if (b) otvoriOkvir(+b.dataset.index, b);
});
document.getElementById("okvir-zatvori").addEventListener("click", zatvoriOkvir);
document.getElementById("okvir-prethodna").addEventListener("click", () => prikaziSliku(trenutna-1));
document.getElementById("okvir-sljedeca").addEventListener("click", () => prikaziSliku(trenutna+1));
okvir.addEventListener("click", e => { if (e.target === okvir) zatvoriOkvir(); });

/* prelistavanje prstom */
let dodirX = null;
okvir.addEventListener("touchstart", e => dodirX = e.changedTouches[0].clientX, {passive:true});
okvir.addEventListener("touchend", e => {
  if (dodirX === null) return;
  const d = e.changedTouches[0].clientX - dodirX;
  if (Math.abs(d) > 55) prikaziSliku(trenutna + (d < 0 ? 1 : -1));
  dodirX = null;
}, {passive:true});

/* ---------- galerija se tiho povuče u pozadini nakon učitavanja ---------- */
(function preducitaj(){
  const red = SLIKE.map(s => url(s, false)).filter(u => u && !u.startsWith("data:"));
  if (!red.length) return;
  let i = 0;
  function sljedeca(){
    if (i >= red.length) return;
    const im = new Image();
    im.onload = im.onerror = () => setTimeout(sljedeca, 30);
    im.src = red[i++];
  }
  const kreni = () => ("requestIdleCallback" in window)
    ? requestIdleCallback(sljedeca, {timeout: 2000})
    : setTimeout(sljedeca, 700);
  if (document.readyState === "complete") kreni();
  else addEventListener("load", kreni);
})();

/* ---------- panel kontakt ---------- */
const panel = document.getElementById("panel");
const zastor = document.getElementById("zastor");
let pokretacPanela = null;

function otvoriPanel(pokretac){
  pokretacPanela = pokretac || null;
  zastor.hidden = false;
  requestAnimationFrame(() => {
    zastor.classList.add("otvoren");
    panel.classList.add("otvoren");
  });
  panel.setAttribute("aria-hidden","false");
  document.body.classList.add("zakljucano");
  history.replaceState(null,"","#kontakt");
  setTimeout(() => document.getElementById("zatvori-panel").focus(), 60);
}
function zatvoriPanel(){
  panel.classList.remove("otvoren");
  zastor.classList.remove("otvoren");
  panel.setAttribute("aria-hidden","true");
  document.body.classList.remove("zakljucano");
  history.replaceState(null,"",location.pathname + location.search);
  setTimeout(() => { zastor.hidden = true; }, 500);
  if (pokretacPanela) pokretacPanela.focus();
}
document.querySelectorAll("[data-otvori-kontakt]").forEach(b =>
  b.addEventListener("click", () => otvoriPanel(b)));
document.getElementById("zatvori-panel").addEventListener("click", zatvoriPanel);
zastor.addEventListener("click", zatvoriPanel);
if (location.hash === "#kontakt") setTimeout(() => otvoriPanel(null), 400);

/* zadržavanje fokusa u otvorenom panelu */
panel.addEventListener("keydown", e => {
  if (e.key !== "Tab") return;
  const f = panel.querySelectorAll('a[href], button:not([disabled])');
  if (!f.length) return;
  const prvi = f[0], zadnji = f[f.length-1];
  if (e.shiftKey && document.activeElement === prvi){ e.preventDefault(); zadnji.focus(); }
  else if (!e.shiftKey && document.activeElement === zadnji){ e.preventDefault(); prvi.focus(); }
});

/* ---------- tastatura ---------- */
document.addEventListener("keydown", e => {
  if (okvir.classList.contains("otvoren")){
    if (e.key === "Escape") zatvoriOkvir();
    if (e.key === "ArrowLeft") prikaziSliku(trenutna-1);
    if (e.key === "ArrowRight") prikaziSliku(trenutna+1);
    return;
  }
  if (e.key === "Escape" && panel.classList.contains("otvoren")) zatvoriPanel();
});

/* ---------- promo video ---------- */
(function video(){
  const ram = document.getElementById("video-okvir");
  const sloj = document.getElementById("video-sloj");
  const poruka = document.getElementById("video-poruka");
  const dugme = document.getElementById("pusti-video");
  const izvor = (PODACI.video || "").trim();

  if (!izvor){
    poruka.textContent = "Video se dodaje";
    dugme.addEventListener("click", () => document.getElementById("galerija").scrollIntoView({behavior:"smooth"}));
    return;
  }
  dugme.addEventListener("click", () => {
    const yt = izvor.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    let el;
    if (yt){
      el = document.createElement("iframe");
      el.src = "https://www.youtube-nocookie.com/embed/" + yt[1] + "?autoplay=1&rel=0";
      el.title = "Promo video Rakovica Resort";
      el.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
      el.allowFullscreen = true;
    } else {
      el = document.createElement("video");
      el.src = izvor; el.controls = true; el.autoplay = true; el.playsInline = true;
      el.addEventListener("error", () => {
        el.remove();
        ram.appendChild(sloj);
        poruka.textContent = "Video se ne može učitati. Provjerite postoji li " + izvor + ".";
      });
    }
    ram.appendChild(el);
    sloj.remove();
  }, {once:true});
})();

/* ---------- rezervni prikaz karte ---------- */
(function karta(){
  const okv = document.getElementById("karta-okvir");
  const rez = document.getElementById("karta-rezerva");
  let ucitano = false;
  okv.addEventListener("load", () => ucitano = true);
  setTimeout(() => { if (!ucitano) rez.classList.add("prikazi"); }, 4500);
})();

/* ---------- ljepljivo zaglavlje ---------- */
(function zaglavljeNaSkrol(){
  const z = document.getElementById("zaglavlje");
  const hero = document.getElementById("vrh");
  let cekam = false;
  function provjeri(){
    cekam = false;
    const prag = Math.max(240, hero.offsetHeight - 90);
    z.classList.toggle("vidljivo", window.scrollY > prag);
  }
  addEventListener("scroll", () => {
    if (!cekam){ cekam = true; requestAnimationFrame(provjeri); }
  }, {passive:true});
  addEventListener("resize", provjeri, {passive:true});
  provjeri();
})();

/* ---------- otkrivanje pri skrolu ---------- */
(function otkrivanje(){
  const mirno = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const meta = document.querySelectorAll(".otkrij, .zavjesa");
  if (mirno || !("IntersectionObserver" in window)){
    meta.forEach(el => el.classList.add("vidljivo"));
    return;
  }
  const posmatrac = new IntersectionObserver((unosi) => {
    unosi.forEach(u => {
      if (u.isIntersecting){ u.target.classList.add("vidljivo"); posmatrac.unobserve(u.target); }
    });
  }, {threshold:.14, rootMargin:"0px 0px -8% 0px"});
  meta.forEach(el => posmatrac.observe(el));
})();

/* ---------- ulazna animacija ---------- */
window.addEventListener("load", () => {
  requestAnimationFrame(() => document.getElementById("vrh").classList.add("spremno"));
});
setTimeout(() => document.getElementById("vrh").classList.add("spremno"), 900);
