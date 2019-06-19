// Current cache version
let cacheVersion = 'cache-1.0';

// Cleans static cache to remove data that's no longer in use
let cleanedCache = caches.keys().then(keys => {
  keys.forEach(key => {
    if (key !== cacheVersion && key.match('cache-')) {
      return caches.delete(key);
    } else if (key === cacheVersion) {
      caches.open(key).then(cache => {
        cache.keys().then(listRequests => {
          console.log(listRequests);
        });
      });
    }
  });
});

/* Fetches for each request through the network
*  If the network is not available, it returns a response from
*  the cache.
*/
const fetchThenCache = request => {
  return fetch(request)
    .then(fetchResponse => {
      if (fetchResponse) {
        // Adds fetch response to cache
        caches.open(cacheVersion).then(cache => {
          cache.put(request, fetchResponse.clone());
        });

        return fetchResponse.clone();
      }
    })
    .catch(() => {
      console.log(`\tGetting "${request.url}" from cache instead...`);
      return caches.match(request);
    });
};

self.addEventListener('install', event => {
  console.log('Installing Service Worker');
});

self.addEventListener('activate', event => {
  console.log('Activating Service Worker');

  event.waitUntil(cleanedCache);
});

self.addEventListener('fetch', event => {
  // If request is from Local, console.log it
  if (event.request.url.match(location.origin)) {
    console.log('Fetching request from LOCAL:', event.request.url);
  } else {
    // If request is from Remote, console.log it
    console.log('Fetching request from REMOTE LOCATION:', event.request.url);
  }

  event.respondWith(fetchThenCache(event.request));
});
