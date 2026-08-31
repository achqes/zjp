// sw.js — Service Worker za offline mod
// VAŽNO: ovaj fajl se učitava samo ako app.js pozove navigator.serviceWorker.register(),
// a to se dešava SAMO kad je aplikacija otvorena kao instalirana (dodana na početni zaslon).
// U običnom pregledniku (tab) se ovaj fajl nikad ne registruje, pa offline mod tamo ne radi.

const CACHE_NAME = 'napokon-cache-v2';

const APP_SHELL = [
  '/',
  '/index.html',
  '/style.css',
  '/fonts.css',
  '/legal.css',
  '/app.js',
  '/data.js',
  '/obavijesti.js',
  '/site.webmanifest',
  '/privacy.html',
  '/terms.html',
  '/support.html',
  '/fonts/inter-400.woff2',
  '/fonts/inter-500.woff2',
  '/fonts/inter-600.woff2',
  '/fonts/inter-700.woff2',
  '/fonts/montserrat-400.woff2',
  '/fonts/montserrat-500.woff2',
  '/fonts/montserrat-600.woff2',
  '/fonts/montserrat-700.woff2',
  '/fonts/roboto-mono-400.woff2',
  '/fonts/roboto-mono-500.woff2',
  '/fonts/roboto-mono-600.woff2',
  '/fonts/roboto-mono-700.woff2'
];

// INSTALL — spremi osnovne fajlove aplikacije u cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(err => console.warn('SW cache addAll failed:', err))
  );
  self.skipWaiting();
});

// ACTIVATE — obriši stare verzije cache-a
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// FETCH — cache-first (brzo), uz tihi update u pozadini kad ima interneta
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // ne diraj fontove, GA, itd.

  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached || caches.match('/index.html'));

      return cached || networkFetch;
    })
  );
});
