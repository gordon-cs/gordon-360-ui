/*********************************************** VARIABLES ***********************************************/
// Current cache version
let cacheVersion = 'cache-1.0';

let alreadyDynamic = false;

// Static Files to cache upon installation of service worker
const staticCache = [
  '/',
  '/events',
  '/help',
  '/about',
  '/feedback',
  '/involvements',
  //'https://cloud.typography.com/7763712/7294392/css/fonts.css', // Doesn't work in Developlent
  '/images/apple-touch-icon-144x144.png',
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/favicon.ico',
  '/static/media/gordon-logo-vertical-white.a6586885.svg',
  '/static/media/campus1366.e8fc7838.jpg',
];

// Static Files to cache upon installation of service worker
const dynamicCache = [
  // Home Page Fetch URLs
  'https://360apitrain.gordon.edu/api/cms/slider',
  'https://360apitrain.gordon.edu/api/dining/student/50197321/201905', // Student.ID and Session.Code needed
  'https://360apitrain.gordon.edu/api/events/chapel/jahnuel.dorelus/18SP', // Student.Name and Semester.Code needed
  'https://360apitrain.gordon.edu/api/memberships/student/50197321', // Student.ID needed
  'https://360apitrain.gordon.edu/api/profiles',
  'https://360apitrain.gordon.edu/api/profiles/Image',
  'https://360apitrain.gordon.edu/api/requests/student/50197321', // Student.ID needed
  'https://360apitrain.gordon.edu/api/sessions/current',
  'https://360apitrain.gordon.edu/api/sessions/daysLeft',
  /************************************************************ */
  // Involvements Page Fetch URLs
  'https://360apitrain.gordon.edu/api/activities/session/201905', // Session.Code needed
  'https://360apitrain.gordon.edu/api/activities/session/201905/types', // Session.Code needed
  'https://360apitrain.gordon.edu/api/sessions',
  // 'https://360apitrain.gordon.edu/api/memberships/student/50197321',  -- Already fetched in Home Page URLs
  // 'https://360apitrain.gordon.edu/api/profiles',                      -- Already fetched in Home Page URLs
  // 'https://360apitrain.gordon.edu/api/sessions/current',              -- Already fetched in Home Page URLs
  /************************************************************ */
  // Events Page Fetch URLs
  'https://360apitrain.gordon.edu/api/events/25Live/All',
  'https://360apitrain.gordon.edu/events',
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  /************************************************************ */
  // Help Page Fetch URLs
  'https://360apitrain.gordon.edu/help',
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  /************************************************************ */
  // About Page Fetch URLs
  'https://360apitrain.gordon.edu/about',
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  /************************************************************ */
  // Feedback Page Fetch URLs
  'https://360apitrain.gordon.edu/feedback',
  // '/api/profiles',                             -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                       -- Already fetched in Home Page URLs
  /************************************************************ */
  // Profile Page Fetch URLs
  'https://360apitrain.gordon.edu/myprofile/jahnuel.dorelus', // Student.Name needed
  'https://360apitrain.gordon.edu/api/dining/student/50197321/201905', // Student.ID and SessionCode needed -- Already fetched in Home Page URLs
  'https://360apitrain.gordon.edu/api/events/chapel/jahnuel.dorelus/18SP', // Student.Name and Semester.Code needed -- Already fetched in Home Page URLs
  'https://360apitrain.gordon.edu/api/memberships/student/50197321', // Student.ID needed -- Already fetched in Home Page URLs
  'https://360apitrain.gordon.edu/api/profiles/Jahnuel.Dorelus/', // Student.Name needed
  // 'https://360apitrain.gordon.edu/api/requests/student/50197321',  -- Already fetched in Home Page URLs
  // '/api/profiles',                                                 -- Already fetched in Home Page URLs
  // '/api/sessions/current',                                         -- Already fetched in Home Page URLs
  // '/api/sessions/daysLeft',                                        -- Already fetched in Home Page URLs
  // '/api/profiles/Image',                                           -- Already fetched in Home Page URLs
  /************************************************************ */
  // Public Profile Page Fetch URLs
  'https://360apitrain.gordon.edu/api//memberships/student/username/Jahnuel.Dorelus/', // Student.Name needed
  'https://360apitrain.gordon.edu/api/profiles/Image/Jahnuel.Dorelus/', // Student.Name needed
  // 'https://360apitrain.gordon.edu/api/profiles',                         -- Already fetched in Home Page URLs
  // 'https://360apitrain.gordon.edu/api/profiles/Image',                   -- Already fetched in Home Page URLs
  // 'https://360apitrain.gordon.edu/api/profiles/Jahnuel.Dorelus/',        -- Already fetched in Profile Page URLs
];

/*********************************************** CAHING FUNCTIONS ***********************************************/
/* Fetches for each request through the network
*  If the network is not available, it returns a response from
*  the cache.
*/
const fetchThenCache = request => {
  return fetch(request)
    .then(fetchResponse => {
      if (fetchResponse) {
        // Adds fetch response to cache
        // caches.open(cacheVersion).then(cache => {
        //   cache.put(request, fetchResponse.clone());
        // });
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
        console.log(' -\tPrecached Static Files successfully installed with Service Worker');
      })
      .catch(() => {
        console.log(' -\tPrecached Static Files failed to install with Service Worker');
      });
    return preCachePromise;
  });
}
// caches all of the dynamic cache listed in the cacheDynamic
function preCacheDynamic(token) {
  // Creates the header for the request to have authenitification
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  // Caches each url in the list of dynamic files to cache
  dynamicCache.forEach(url => {
    let request = new Request(url, {
      method: 'GET',
      headers,
    });
    fetch(request)
      .then(fetchResponse => {
        if (fetchResponse) {
          // Adds fetch response to cache
          caches.open(cacheVersion).then(cache => {
            cache.put(request, fetchResponse);
          });
        }
      })
      .catch(() => {
        console.log(` -\tFailed to fetch and cache Dynamic File: "${url}"`);
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

/*********************************************** EVENT LISTENERS ***********************************************/
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
  // If fetching for a static file, we serve automatically from the cache
  if (staticCache.includes(event.request.url)) {
    caches.open(cacheVersion).then(cache => {
      cache.match(event.request.url).then(cacheResponse => {
        console.log(`Getting "${event.request.url}" from cache instead...`);
        event.respondwith(cacheResponse);
      });
    });
  }

  event.respondWith(fetchThenCache(event.request));
});

self.addEventListener('message', event => {
  if (event.data.message && event.data.message === 'cache-dynamic-files') {
    console.log('Received message from client. Fetching Dynamic Files');
    preCacheDynamic(event.data.token);
  }
}); //
