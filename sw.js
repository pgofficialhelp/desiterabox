// DesiTeraBox Service Worker v1.0
const CACHE_NAME = 'desiterabox-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate – clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch – Network first, fall back to cache
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, cross-origin API calls, and chrome-extension
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // API: network only (always fresh)
  if (url.hostname.includes('your-api.com')) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache successful responses for static assets
        if (response.ok && (request.destination === 'document' || request.destination === 'script' || request.destination === 'style')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Background sync for analytics (optional)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-analytics') {
    // Handle deferred analytics here
  }
});
