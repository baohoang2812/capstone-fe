/* eslint-disable no-restricted-globals */

const CACHE_STATIC_NAME = "static-v2.0.0";
const CACHE_DYNAMIC_IMAGE = "dynamic-image-v2.0.0";
const STATIC_FILES = [
  "/manifest.json",
  "/assets/images/mapp-logo.png",
  "/assets/images/org_avatar.png",
  "/assets/images/no-avatar.png",
  "/assets/images/no-image.png",
  "/assets/icons/edit-tools.svg",
  "/assets/icons/image-not-found.svg",
  "/assets/icons/404.svg",
  "/assets/icons/500.svg",
];

function isInArray(string, array) {
  let cachePath;
  if (string.indexOf(self.origin) === 0) {
    // request targets domain where we serve the page from (i.e. NOT a CDN)
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.reduce((prev, key) => {
          if (key !== CACHE_STATIC_NAME) {
            console.log("Service Worker Removing old cache.", key);
            prev.push(caches.delete(key));
          }
          return prev;
        }, [])
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (isInArray(event.request.url, STATIC_FILES)) {
    event.respondWith(caches.match(event.request));
  } else if (
    event.request.destination === "image" &&
    !event.request.url.includes("/temp") && // don't cache temp image when upload
    (location.hostname === "localhost" ||
      event.request.url.indexOf("rubikbot.com") > -1) // only cache image on mapp domain
  ) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((res) => {
          return caches.open(CACHE_DYNAMIC_IMAGE).then((cache) => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      })
    );
  }
});
