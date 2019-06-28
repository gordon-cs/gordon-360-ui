/*********************************************** VARIABLES ***********************************************/
// Current cache version
let cacheVersion = 'cache-1.0';

// Static Files to cache upon installation of service worker
const staticCache = [
  '/',
  //'https://cloud.typography.com/7763712/7294392/css/fonts.css', -- Doesn't work in Developlent
  '/images/apple-touch-icon-144x144.png',
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/favicon.ico',
  '/static/media/gordon-logo-vertical-white.a6586885.svg',
  '/static/media/campus1366.e8fc7838.jpg',
  // Icon Images
  '/public/images/apple-touch-icon-57x57.png',
  '/public/images/apple-touch-icon-60x60.png',
  '/public/images/apple-touch-icon-72x72.png',
  '/public/images/apple-touch-icon-76x76.png',
  '/public/images/apple-touch-icon-114x114.png',
  '/public/images/apple-touch-icon-120x120.png',
  '/public/images/apple-touch-icon-144x144.png',
  '/public/images/apple-touch-icon-152x152.png',
  '/public/images/favicon-16x16.png',
  '/public/images/favicon-32x32.png',
  '/public/images/favicon-96x96.png',
  '/public/images/favicon-128x128.png',
  '/public/images/favicon-196x196.png',
  '/public/images/mstile-70x70.png',
  '/public/images/mstile-144x144.png',
  '/public/images/mstile-150x150.png',
  '/public/images/mstile-310x310.png',
  '/public/android-chrome-144x144.png',
];

// Dynamic Files to cache upon logging in
const firstDynamicCache = [
  // Home Page Fetch URLs
  'https://360apitrain.gordon.edu/api/cms/slider',
  'https://360apitrain.gordon.edu/api/profiles',
  'https://360apitrain.gordon.edu/api/profiles/Image',
  'https://360apitrain.gordon.edu/api/sessions/current',
  'https://360apitrain.gordon.edu/api/sessions/daysLeft',
  'https://360apitrain.gordon.edu/api/dining',
  /************************************************************ */
  // Involvements Page Fetch URLs
  'https://360apitrain.gordon.edu/api/sessions',
  /************************************************************ */
  // Events Page Fetch URLs
  'https://360apitrain.gordon.edu/api/events/25Live/All',
];

/*********************************************** CACHING FUNCTIONS ***********************************************/
/* Fetches for each request through the network
 *  If the network is not available, it returns a response from
 *  the cache.
 */
async function fetchThenCache(request) {
  return await fetch(request)
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
      return caches.match(request).catch(() => {
        console.log(`\tFailed to get ${request.url} from cache`);
      });
    });
}

/* Caches all of the static files that are listed in
 *  the array staticCache
 *  @return A promise with the result of trying to cache the static files
 */
function preCacheStatic() {
  caches.open(cacheVersion).then(cache => {
    let preCachePromise = cache.addAll(staticCache);
    preCachePromise
      .then(() => {
        console.log(' -\tPrecached Static Files successfully installed');
      })
      .catch(() => {
        console.log(' -\tPrecached Static Files failed to install');
      });
    return preCachePromise;
  });
}

async function getUserInfoForLinks(token) {
  // Creates the header for the request to have authenitification
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  // Gets the user's profile object to access their firstname.lastname and ID#
  let profile = await new Promise((resolve, reject) => {
    fetch(new Request('https://360apitrain.gordon.edu/api/profiles', { method: 'GET', headers }))
      .then(response => {
        return resolve(response.json());
      })
      .catch(error => {
        return reject(error.message);
      });
  });
  // Gets the current session object to access the current session code
  let currentSession = await new Promise((resolve, reject) => {
    fetch(
      new Request('https://360apitrain.gordon.edu/api/sessions/current', {
        method: 'GET',
        headers,
      }),
    )
      .then(response => {
        return resolve(response.json());
      })
      .catch(error => {
        return reject(error.message);
      });
  });
  let username = profile ? profile.AD_Username : null;
  let id = profile ? profile.ID : null;
  let sessionCode = currentSession ? currentSession.SessionCode : null;
  const secondDynamicCache = [
    // Home Page Fetch URLs
    `https://360apitrain.gordon.edu/api/events/chapel/${username.toLowerCase()}/18SP`, // SEMESTER TERM NEEDED
    `https://360apitrain.gordon.edu/api/memberships/student/${id}`,
    `https://360apitrain.gordon.edu/api/requests/student/${id}`,
    /************************************************************ */
    // Involvements Page Fetch URLs
    `https://360apitrain.gordon.edu/api/activities/session/${sessionCode}`,
    `https://360apitrain.gordon.edu/api/activities/session/${sessionCode}/types`,
    /************************************************************ */
    // Profile Page Fetch URLs
    `https://360apitrain.gordon.edu/api/events/chapel/${username.toLowerCase()}/18SP`, // SEMESTER TERM NEEDED
    `https://360apitrain.gordon.edu/api/memberships/student/${id}`,
    `https://360apitrain.gordon.edu/api/profiles/${username}/`,
    /************************************************************ */
    // Public Profile Page Fetch URLs
    `https://360apitrain.gordon.edu/api//memberships/student/username/${username}/`,
    `https://360apitrain.gordon.edu/api/profiles/Image/${username}/`,
  ];
  preCacheDynamic(token, secondDynamicCache);
}

/* Caches all of the dynamic files that are listed in
 *  the array cacheDynamic
 */
function preCacheDynamic(token, dynamicUserCacheLinks) {
  // Creates the header for the request to have authenitification
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  // Caches each url in the list of dynamic files to cache
  dynamicUserCacheLinks.forEach(url => {
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

/* Cleans cache to remove cacheVersion data that's
 *  no longer in use (removes outdated cache version)
 */
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
});

self.addEventListener('activate', event => {
  console.log('Activating Service Worker');
  self.clients.claim();
  event.waitUntil(cleanCache());
});

self.addEventListener('fetch', event => {
  // If request is from Local, console.log the URL
  if (event.request.url.match(location.origin)) {
    console.log('Fetching request from LOCAL:', event.request.url);
  } else {
    // If request is from Remote, console.log the URL
    console.log('Fetching request from REMOTE LOCATION:', event.request.url);
  }

  event.respondWith(fetchThenCache(event.request));
});

self.addEventListener('message', event => {
  // If the message is to pre-cache static/dynamic files
  if (event.data.message && event.data.message === 'cache-dynamic-files') {
    console.log('Received message from client. Fetching Dynamic Files');
    preCacheStatic(); // Static Cache
    preCacheDynamic(event.data.token, firstDynamicCache); // First Dynamic Cache
    getUserInfoForLinks(event.data.token); // Second Dynamic Cache
  }
});
