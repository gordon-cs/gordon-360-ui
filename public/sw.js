// Current cache version
let cacheVersion = 'cache-1.0';

// Cleans static cache to remove data that's no longer in use
let cleanedCache = caches.keys().then(keys => {
  keys.forEach(key => {
    if (key !== cacheVersion && key.match('cache-')) {
      return caches.delete(key);
    }
  });
});

self.addEventListener('install', event => {
  console.log('Installing Service Worker');
});

self.addEventListener('activate', event => {
  console.log('Activating Service Worker');

  event.waitUntil(cleanedCache);
});

self.addEventListener('fetch', event => {
  // Sees if the request is from local
  if (event.request.url.match(location.origin))
    console.log('Fetching request from LOCAL:', event.request.url);
  else console.log('Fetching request from REMOTE LOCATION:', event.request.url);
  event.respondWith(fetchThenCache(event.request));
});

/* Fetches 
* 
*/
const fetchThenCache = req => {
  return fetch(req)
    .then(fetchRes => {
      if (fetchRes) {
        // Adds fetch response to cache
        caches.open(cacheVersion).then(cache => {
          cache.put(req, fetchRes.clone());
        });
        return fetchRes.clone();
      }
    })
    .catch(() => {
      // Returns a clone of the fetch response
      console.log(`\tGetting "${req.url}" from cache instead...`);
      return caches.match(req);
    });
};
