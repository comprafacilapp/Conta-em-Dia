const CACHE_NAME = "conta-em-dia-v1";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function(event) {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(ARQUIVOS);
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
