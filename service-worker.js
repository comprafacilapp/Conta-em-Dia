const CACHE_NAME = "conta-em-dia-v2";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function(event) {
self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(ARQUIVOS);
      })
  );

});
self.addEventListener("activate", function(event) {
self.clients.claim();
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});

self.addEventListener("fetch", function(event) {

  event.respondWith(
    caches.match(event.request)
      .then(function(resposta) {
        return resposta || fetch(event.request);
      })
  );

});
