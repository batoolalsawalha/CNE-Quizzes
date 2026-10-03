const CACHE_NAME = 'cne-quizzes-v6';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css?v=6.0',
  '/js/api.js?v=6.0',
  '/js/app.js?v=6.0',
  '/js/student.js?v=6.0',
  '/js/results.js?v=6.0',
  '/js/admin.js?v=6.0',
  '/js/importer.js?v=6.0',
  '/quiz-print.html',
  '/manifest.json',
  '/icons/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First Strategy: always fetch fresh from server
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Bypass API requests and non-GET requests to network directly
  if (url.origin !== self.location.origin || req.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    fetch(req).then((networkRes) => {
      if (networkRes.ok) {
        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => cache.put(req, networkRes.clone()))
        );
      }
      return networkRes;
    }).catch(async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const fallback = await caches.match('/index.html');
        if (fallback) return fallback;
      }
      return Response.error();
    })
  );
});
