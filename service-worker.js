const CACHE_NAME = "conta-em-dia-v3";

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

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(function(resposta) {

        let copia = resposta.clone();

        caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, copia);
          });

        return resposta;

      })
      .catch(function() {
        return caches.match(event.request);
      })
  );

});
