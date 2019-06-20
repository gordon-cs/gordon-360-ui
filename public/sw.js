// Current cache version
let cacheVersion = 'cache-1.0';

// Static Files to cache upon installation of service worker
const staticCache = [
  '/',
  //'https://cloud.typography.com/7763712/7294392/css/fonts.css',
  '/images/apple-touch-icon-144x144.png',
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/favicon.ico',
  '/static/media/gordon-logo-vertical-white.a6586885.svg',
  '/static/media/campus1366.e8fc7838.jpg',
  /***** Just for purposes of 360train. These do not appear on real 360 */
  '/images/2ColumnHero/Events-1_2018_07_26_02_24_53_2018_10_09_08_51_24.jpg',
  'images/2ColumnHero/Feedback-1_2018_07_26_02_25_11_2018_10_09_08_50_45.jpg',
  'images/2ColumnHero/Help-1_2018_07_26_11_04_33_2018_10_09_08_51_12.jpg',
  'images/2ColumnHero/Home-1_2018_07_26_02_25_41_2018_10_09_08_51_41.jpg',
  'images/2ColumnHero/Involvements-1_2018_07_26_02_26_19_2018_10_09_08_52_02.jpg',
  'images/2ColumnHero/Profile-1_2018_07_26_02_26_40_2018_10_09_08_52_16.jpg	',
  'images/2ColumnHero/welcome1_2018_07_26_11_00_21_2018_10_09_08_51_52.jpg	',
];

// Static Files to cache upon installation of service worker
const dynamicCache = [
  // Home Page Fetch URLs
  '/api/cms/slider',
  '/api/dining/student/50197321/201905', // Student.ID and Session.Code needed
  '/api/events/chapel/jahnuel.dorelus/18SP', // Student.Name and Semester.Code needed
  '/api/memberships/student/50197321', // Student.ID needed
  '/api/profiles',
  '/api/profiles/Image',
  '/api/requests/student/50197321', // Student.ID needed
  '/api/sessions/current',
  '/api/sessions/daysLeft',
  /************************************************************ */
  // Events Page Fetch URLs
  '/events',
  '/api/events/25Live/All',
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  /************************************************************ */
  // Help Page Fetch URLs
  '/help',
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  /************************************************************ */
  // About Page Fetch URLs
  '/about',
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  /************************************************************ */
  // Feedback Page Fetch URLs
  '/feedback',
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  /************************************************************ */
  // Profile Page Fetch URLs
  '/myprofile/jahnuel.dorelus', // Student.Name needed
  '/api/dining/student/50197321/201905', // Student.ID and SessionCode needed -- Already fetched in Home Page URLs
  '/api/events/chapel/jahnuel.dorelus/18SP', // Student.Name and Semester.Code needed -- Already fetched in Home Page URLs
  '/api/memberships/student/50197321', // Student.ID needed -- Already fetched in Home Page URLs
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  '/api/requests/student/50197321', // Student.ID needed -- Already fetched in Home Page URLs
  // '/api/sessions/current',                     -- Already fetched in Home Page URLs
  // '/api/sessions/daysLeft',                    -- Already fetched in Home Page URLs
];
/************************************************************************************************** */
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

// caches all of the static cache in the cacheStatic
function preCacheStatic() {
  caches.open(cacheVersion).then(cache => {
    let preCachePromise = cache.addAll(staticCache);
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
// caches all of the dynamic cache listed in the cacheDynamic
function preCacheDynamic() {
  dynamicCache.forEach(item => {
    let request = new Request(item);
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
        console.log(`-\tFailed to fetch and cache "${item}"`);
      });
  });
}

// Cleans cache to remove cacheVersion data that's no longer in use (outdated version)
function cleanCache() {
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
/************************************************************************************************ */
self.addEventListener('install', event => {
  console.log('Installing Service Worker');
  let startupPromise = Promise.all([cleanCache(), preCacheStatic()]);
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
  //event.respondWith(fetchThenCache(event.request));
});

// self.addEventListener('message', event => {
//   if (event.data === 'cache-dynamic-files') {
//     console.log('Received message from client. Fetching Dynamic Files');
//     preCacheDynamic();
//   }
// }); //
