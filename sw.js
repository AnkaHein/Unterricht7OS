/* Service Worker – Unterricht 7OS
   Seiten: erst Netz, dann Zwischenspeicher (Änderungen auf GitHub erscheinen sofort, sobald man online ist).
   Bilder & Co.: aus dem Zwischenspeicher, im Hintergrund aktualisiert. Offline funktioniert alles, was schon einmal geladen wurde. */
const CACHE = 'unterricht7os-v4';
const CORE = [
  "./",
  "index.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon.png",
  "icons/icon-maskable-192.png",
  "icons/icon-maskable-512.png",
  "img/kachel-englisch.png",
  "img/kachel-deutsch.png",
  "img/kachel-ablauf.png",
  "img/kachel-ballade.png",
  "img/kachel-zeichensetzung.png",
  "img/kachel-klartext.png",
  "img/kachel-klassenarbeiten.png",
  "img/kachel-erklaerungen.png",
  "img/kachel-uebungen.png",
  "img/header-bluetenrand.png",
  "img/ablauf-uebersicht.png",
  "img/bewertungsbogen.png",
  "img/erklaerung-woertliche-rede.png",
  "img/erklaerung-aufzaehlungen.png",
  "img/erklaerung-datumsangaben.png",
  "img/kachel-woertliche-rede.png",
  "img/kachel-aufzaehlungen.png",
  "img/kachel-datumsangaben.png",
  "img/legacy/aufgaben.webp",
  "img/legacy/chat.webp",
  "img/legacy/check.webp",
  "img/legacy/flourish.webp",
  "img/legacy/formel.webp",
  "img/legacy/kompass.webp",
  "img/legacy/plan-hero.webp",
  "img/legacy/planhilfe.webp",
  "img/legacy/postit.webp",
  "img/legacy/schritt-kennt.webp",
  "img/legacy/schritt-text.webp",
  "img/legacy/schritt.webp",
  "img/legacy/sort.webp",
  "img/legacy/sprachspeicher.webp",
  "img/legacy/streit.webp",
  "img/legacy/themen.webp",
  "img/legacy/weitere.webp",
  "img/legacy/zuordnen.webp"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => {
    const old = ks.filter(k => k !== CACHE);
    return Promise.all(old.map(k => caches.delete(k)))
      .then(() => self.clients.claim())
      .then(() => old.length ? self.clients.matchAll({type: 'window'}).then(cs => cs.forEach(c => c.navigate(c.url))) : null);
  }));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if(req.mode === 'navigate'){
    e.respondWith(fetch(req, {cache: 'no-cache'}).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put('index.html', cp)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req, {cache: 'no-cache'}).then(r => { if(r.ok){ const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
