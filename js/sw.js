/* ═══════════════════════════════════════════════════
   SERVICE WORKER — SM Portfolio PWA
   Strategy: Cache First for assets, Network First for HTML
   ═══════════════════════════════════════════════════ */

// ── Auto-version ────────────────────────────────────
// Cloudflare Pages sets CF_PAGES_COMMIT_SHA at build time.
// Fallback: daily timestamp — cache auto-refreshes each day.
// You NEVER need to manually bump a version number again.
const BUILD_ID = (() => {
  try {
    // Cloudflare Pages build-time variable (injected as global)
    if (typeof __CF_PAGES_COMMIT_SHA__ !== 'undefined')
      return String(__CF_PAGES_COMMIT_SHA__).slice(0, 8); // e.g. "a1b2c3d4"
  } catch (_) {}
  // Fallback: YYYY-MM-DD — changes every day automatically
  return new Date().toISOString().slice(0, 10);           // e.g. "2026-03-12"
})();

const CACHE_NAME   = `sm-portfolio-${BUILD_ID}`;
const OFFLINE_PAGE = '/offline.html';

console.log(`[SW] Version: ${CACHE_NAME}`);

// ── Files to pre-cache on install ──────────────────
const PRE_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/skills.html',
  '/projects.html',
  '/dashboards.html',
  '/analytics-lab.html',
  '/resume.html',
  '/contact.html',
  '/offline.html',
  '/css/style.css',
  '/css/cyberpunk.css',
  '/js/animations.js',
  '/js/charts.js',
  '/js/script.js',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/site.webmanifest',
];

// ── MESSAGE — handle SKIP_WAITING from update toast ─
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    console.log('[SW] Skipping wait — activating new version');
    self.skipWaiting();
  }
});

// ── INSTALL — pre-cache all core files ─────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets');
      return cache.addAll(PRE_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE — clean up old caches ─────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH — serve from cache, fallback to network ──
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || url.origin !== location.origin) return;

  // HTML pages → Network First (always try fresh, fallback to cache)
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache the fresh response
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match(OFFLINE_PAGE))
        )
    );
    return;
  }

  // Assets (CSS, JS, images) → Cache First
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        // Only cache valid responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      });
    })
  );
});
