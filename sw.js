// Saraswati ED — Service Worker
// Caches the app shell for full offline use

const CACHE_NAME = 'saraswati-ed-v1';

// All files to cache on install
const PRECACHE_URLS = [
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ── Install: pre-cache app shell ──────────────────────────────────────────────
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      return self.skipWaiting(); // activate immediately
    })
  );
});

// ── Activate: clean up old caches ─────────────────────────────────────────────
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    }).then(function() {
      return self.clients.claim(); // take control immediately
    })
  );
});

// ── Fetch: cache-first strategy ───────────────────────────────────────────────
// Serve from cache first; fall back to network; cache new responses
self.addEventListener('fetch', function(event) {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        return cachedResponse; // serve from cache instantly
      }
      // Not in cache — fetch from network and cache for next time
      return fetch(event.request).then(function(networkResponse) {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
          return networkResponse;
        }
        var responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(function() {
        // Network failed and not in cache — return offline fallback
        return caches.match('/index.html');
      });
    })
  );
});

// ── Message: force update ─────────────────────────────────────────────────────
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
