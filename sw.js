/* ============================================================
   EnglishWith_EK — Service Worker (PWA)
   ------------------------------------------------------------
   Makes the app installable and work offline:
   - Precaches the app shell on install (relative paths, so it
     works under the GitHub Pages sub-path).
   - Page navigations are network-first: a new deploy is always
     picked up, with the cached shell as offline fallback.
   - Static assets are stale-while-revalidate: served instantly
     from cache and refreshed in the background.
   Bump CACHE below when you change a precached file.
   ============================================================ */

const CACHE = "ek-shadowing-v4";

const PRECACHE = [
  "./",
  "./index.html",
  "./achievements.html",
  "./manifest.webmanifest",
  "./lessons.js",
  "./library.js",
  "./config.js",
  "./practice.js",
  "./i18n.js",
  "./wordpopup.js",
  "./headerui.js",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Cross-origin (YouTube iframe API, Firebase, ...): try cache first.
  if (url.origin !== self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  // Page navigations: network-first so every deploy shows immediately.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Static assets: stale-while-revalidate (offline + always fresh).
  event.respondWith(
    caches.match(req).then((cached) => {
      const refresh = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || refresh;
    })
  );
});
