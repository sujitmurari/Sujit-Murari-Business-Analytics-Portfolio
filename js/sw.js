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
  '/code-lab.html',
  '/sql.html',
  '/python.html',
  '/case-study.html',
  '/resume.html',
  '/contact.html',
  '/offline.html',
  '/css/style.css',
  '/css/cyberpunk.css',
  '/js/animations.js',
  '/js/charts.js',
  '/js/script.js',
  '/js/resume-animations.js',
  '/js/register-sw.js',
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

// ── INSTALL — cache offline.html FIRST, then rest ──
// offline.html cached separately → guaranteed available
// even on very first install before any online visit.
// Promise.allSettled() → one failed asset won't block install.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        // 1. Cache offline page first — must never fail
        await cache.add(OFFLINE_PAGE);
        console.log('[SW] Offline page cached ✓');

        // 2. Cache everything else — ignore individual failures
        const results = await Promise.allSettled(
          PRE_CACHE.map(url => cache.add(url))
        );
        results.forEach((r, i) => {
          if (r.status === 'rejected')
            console.warn(`[SW] Skipped: ${PRE_CACHE[i]}`);
        });
        console.log(`[SW] Install complete — ${CACHE_NAME}`);
      })
      .then(() => self.skipWaiting())
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

  // Skip non-GET and cross-origin requests (CDN, analytics etc.)
  if (request.method !== 'GET' || url.origin !== location.origin) return;

  // HTML pages → Network First
  // Try network → cache fresh copy → on fail serve cache → last resort: offline.html
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone and store fresh copy in cache
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(async () => {
          // Try cached version of the exact page
          const cached = await caches.match(request);
          if (cached) return cached;

          // Try cached version of the root/index
          const root = await caches.match('/index.html');
          if (root) return root;

          // Guaranteed fallback — offline.html was cached on install
          return caches.match(OFFLINE_PAGE);
        })
    );
    return;
  }

  // Assets (CSS, JS, images, fonts) → Cache First
  // Serve from cache instantly, fetch+cache in background if missing
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => {
        // Asset missing offline — silently fail (page still renders from cache)
        console.warn('[SW] Asset unavailable offline:', request.url);
      });
    })
  );
});