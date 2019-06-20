// Current cache version
let cacheVersion = 'cache-1.0';

// Static Files to cache upon installation of service worker
const preCacheStatic = [
  '/',
  //'https://cloud.typography.com/7763712/7294392/css/fonts.css',
  '/images/apple-touch-icon-144x144.png',
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/favicon.ico',
];

// Cleans cache to remove cacheVersion data that's no longer in use (outdated version)
function cleanedCache() {
  caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== cacheVersion && key.match('cache-')) {
        return caches.delete(key).then(() => {
          console.log('Previous cache has been removed (outdated cache version');
        });
      }
    });
  });
}

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

function preCacheFiles() {
  caches.open(cacheVersion).then(cache => {
    let preCachePromise = cache.addAll(preCacheStatic);
    preCachePromise
      .then(() => {
        console.log(' -\tPrecached Files successfully installed with Service Worker');
      })
      .catch(() => {
        console.log(' -\tPrecached Files failed to install with Service Worker');
      });
    return preCachePromise;
  });
}

self.addEventListener('install', event => {
  console.log('Installing Service Worker');
  let startupPromise = Promise.all([cleanedCache(), preCacheFiles()]);
  event.waitUntil(startupPromise);
});

self.addEventListener('activate', event => {
  console.log('Activating Service Worker');
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
