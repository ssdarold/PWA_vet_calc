const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/zoo_calc.html',
  '/style.css',
  '/background.png',
  '/main-removebg-preview.png',
  '/main.png',
  '/icon-192x192.png',
  '/icon-256x256.png',
  '/icon-384x384.png',
  '/icon-512x512.png',
  '/splashscreens/iphonex_splash.png',
  '/splashscreens/iphonexr_splash.png',
  '/splashscreens/iphonexsmax_splash.png',
  '/main_iphone.png',
];

// событие install
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// событие activate
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// событие fetch
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});