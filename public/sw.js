/**
 * Caches files and responds to network requests when offline.
 *
 * This service worker fetches and caches necessary files to enable Gordon 360 to work offline.
 * If the network is lost, all requests will be handled by the cache. A response from the cache
 * will be served if a request was succussfully fetched and cached when the network was available.
 *
 * @file   This file defines the Service Worker for Gordon 360
 * @author Jake Moon and Jahnuel Dorelus.
 */

///*********************************************** VARIABLES ***********************************************/
// Current cache version
let cacheVersion = 'cache-1.0';
let token, termCode, resetTimer;

// Static Files to cache
const staticCache = [
  // Documents
  '/',
  '/events',
  '/involvements',
  '/feedback',
  '/people',
  '/about',
  '/help',
  '/admin',
  '/myprofile',
  // 'https://cloud.typography.com/7763712/7294392/css/fonts.css', // Doesn't work in Developlent
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/main.52e38ba435b249dc2bff.hot-update.js',
  '/static/media/campus1366.e8fc7838.jpg',
  '/static/js/0.chunk.js',
  '/static/js/1.chunk.js',
  '/static/js/main.chunk.js',
  '/static/media/gordon-logo-vertical-white.a6586885.svg',
  '/static/media/NoConnection.68275814.svg',
  // Images
  '/favicon.ico',
  '/images/android-icon-36x36.png',
  '/images/android-icon-48x48.png',
  '/images/android-icon-72x72.png',
  '/images/android-icon-96x96.png',
  '/images/android-icon-144x144.png',
  '/images/android-icon-192x192.png',
  '/images/apple-icon-57x57.png',
  '/images/apple-icon-60x60.png',
  '/images/apple-icon-72x72.png',
  '/images/apple-icon-76x76.png',
  '/images/apple-icon-114x114.png',
  '/images/apple-icon-120x120.png',
  '/images/apple-icon-144x144.png',
  '/images/apple-icon-152x152.png',
  '/images/apple-icon-180x180.png',
  '/images/apple-icon-precomposed.png',
  '/images/apple-icon.png',
  '/images/favicon-16x16.png',
  '/images/favicon-32x32.png',
  '/images/favicon-96x96.png',
  '/images/ms-icon-70x70.png',
  '/images/ms-icon-144x144.png',
  '/images/ms-icon-150x150.png',
  '/images/ms-icon-310x310.png',
];

/*********************************************** CACHING FUNCTIONS ***********************************************/
/**
 * Cleans the cache to remove data that's no longer in use (removes outdated cache version)
 *
 * @return {Promise} A promise with the result of removing outdated cache
 */
async function cleanCache() {
  await caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== cacheVersion && key.match('cache-')) {
        return caches.delete(key).then(() => {
          console.log('\t- Previous cache has been removed (outdated cache version)');
        });
      }
    });
  });
}

/**
 * Does a fetch for each request received.
 *
 * If the network is available, it returns a response from the fetch
 * Else, it returns a response from the cache.
 *
 * @param {Request} request A request made to be fetched from the network or cache
 * @return {Promise<Response>} A response wrapped in a promise that's served from the network or cache
 */
async function fetchThenCache(request) {
  return await fetch(request)
    .then(fetchResponse => {
      if (fetchResponse) {
        /* FOR DEVELOPING PURPOSES: THIS CACHES EACH FETCH MADE */
        // caches.open(cacheVersion).then(cache => {
        //   cache.put(request, fetchResponse.clone());
        // });
        return fetchResponse.clone();
      }
    })
    .catch(async () => {
      console.log(`   Getting ${request.url} from cache instead...`);
      const response = await caches.match(request);
      // If there's no response from cache, we console log that the request failed
      if (response) {
        return response;
      } else console.log(`\t- Failed to get ${request.url} from cache`);
    });
}

/**
 * Caches all of the static files that are listed in the array staticCache
 *
 * If all files are cached successfuly, its success is console logged
 * Else, console log that caching all files failed
 *
 *  @return {Promise} A promise with the result of caching the static files
 */
async function cacheStaticFiles() {
  return await caches.open(cacheVersion).then(cache => {
    cache
      .addAll(staticCache)
      .then(() => {
        console.log('\t- Cached Static Files Successfully');
      })
      .catch(() => {
        console.log('\t- Caching Static Files Failed');
      });
  });
}

/**
 * Fetches and caches all the dynamic files that are listed in the passed-in array
 *
 * For each URL in the passed-in array, a fetch is made. If the fetch is
 * successful, the response is then cached.
 * Else, we console log the specific URL that failed to fetch
 *
 * @param {String} token The token from Local Storage to authenticate each request made
 * @param {Array} dynamicLinks An array of links to be fetched and cached
 * @param {String} mode [Set to 'cors' by default] Defines the type of request to be made
 *
 * @return {Promise<Boolean>} A boolean that determines if all links given cached successfully
 */
async function cacheDynamicFiles(token, dynamicLinks, mode = 'cors') {
  // A controller and signal to stop fetch requests
  let fetchController = new AbortController();
  let signal = fetchController.signal;

  // A message event listener specifically made for cancelation of fetch requests
  self.addEventListener('message', event => {
    // If the message is to stop all fetches
    if (event.data === 'cancel-fetches') {
      console.log('Received Message. Canceling All Fetch Requests.');
      fetchController.abort();
    }
  });

  // Creates the header for the request to have authenitification
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  // Variable that determines if all links successfully cached
  let status = true;

  // Attempts to fetch all links
  for (let url = 0; url < dynamicLinks.length; url++) {
    let request = new Request(dynamicLinks[url], {
      method: 'GET',
      mode,
      headers,
      signal,
    });
    let fetchSuccess = await fetch(request)
      .then(fetchResponse => {
        if (fetchResponse) {
          // Adds fetch response to cache
          caches.open(cacheVersion).then(cache => {
            cache.put(request, fetchResponse.clone());
          });
          return fetchResponse;
        }
      })
      .catch(error => {
        return error.message;
      });

    // If the fetch resulted in error
    if (fetchSuccess === 'Failed to fetch') {
      status = false;
      console.log(`\t- Failed to fetch and cache Dynamic File: ${dynamicLinks[url]}`);
    }
    // If the fetch resulted in a bad response
    else if (fetchSuccess.statusText !== 'OK') {
      status = false;
      // Checks to see if the request was aborted. If so, we do not console log all the fetch errors
      if (fetchSuccess !== 'The user aborted a request.') {
        console.log(
          `\t- Bad Response: Status - ${fetchSuccess.status} \n\t\tURL: ${dynamicLinks[url]}`,
        );
      }
    }
  }

  // The promise to return with a boolean value determining if all links cached successfully
  let operationSuccess = await new Promise((resolve, reject) => {
    status === true ? resolve(true) : reject(false);
  });

  return operationSuccess;
}

/**
 * Pre-caches main set of dynamic files that requies a Request with its property mode set to "cors"
 *
 * @param {String} token The token from Local Storage to authenticate each request made
 * @param {String} termCode The current semester term
 */
async function dynamicLinksThenCache(token, termCode) {
  // Creates the header for the request to have authenitification
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  // Gets the user's profile object to access their firstname.lastname and ID#
  let profile = await fetch(
    new Request('https://360apitrain.gordon.edu/api/profiles', { method: 'GET', headers }),
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      return error.Message;
    });

  // Gets the current session object to access the current session code
  let currentSession = await fetch(
    new Request('https://360apitrain.gordon.edu/api/sessions/current', {
      method: 'GET',
      headers,
    }),
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      return error.Message;
    });

  let username = profile ? profile.AD_Username : null;
  let id = profile ? profile.ID : null;
  let sessionCode = currentSession ? currentSession.SessionCode : null;

  const dynamicCache = [
    'https://360apitrain.gordon.edu/api/cms/slider',
    'https://360apitrain.gordon.edu/api/dining',
    'https://360apitrain.gordon.edu/api/events/25Live/All',
    'https://360apitrain.gordon.edu/api/profiles',
    'https://360apitrain.gordon.edu/api/profiles/Image',
    'https://360apitrain.gordon.edu/api/sessions',
    'https://360apitrain.gordon.edu/api/sessions/current',
    'https://360apitrain.gordon.edu/api/sessions/daysLeft',
    'https://360apitrain.gordon.edu/api/studentemployment/',
    'https://360apitrain.gordon.edu/api/version',
    'https://360apitrain.gordon.edu/api/activities/session/201809',
    `https://360apitrain.gordon.edu/api/activities/session/${sessionCode}`,
    `https://360apitrain.gordon.edu/api/activities/session/${sessionCode}/types`,
    `https://360apitrain.gordon.edu/api/events/chapel/${termCode}`,
    `https://360apitrain.gordon.edu/api/memberships/student/${id}`,
    `https://360apitrain.gordon.edu/api/memberships/student/username/${username}/`,
    `https://360apitrain.gordon.edu/api/profiles/${username}/`,
    `https://360apitrain.gordon.edu/api/profiles/Image/${username}/`,
    `https://360apitrain.gordon.edu/api/requests/student/${id}`,
    `/profile/${username}`,
  ];

  /* ONLY UNCOMMENT IF YOU WANT TO ADD THE USER'S INVOLVEMENTS' PROFILES TO THE PWA
  // Gets the involvements of the current user for the Involvement Profiles
  let involvements = await fetch(
    new Request(`https://360apitrain.gordon.edu/api/memberships/student/${id}`, {
      method: 'GET',
      headers,
    }),
  )
    .then(response => {
      return response.json();
    })
    .catch(error => {
      involvement;
      return error.message;
    });

  involvements.forEach(involvement => {
    let activityCode = involvement ? involvement.ActivityCode : null;
    let sessionCode = involvement ? involvement.SessionCode : null;
    /dynamicCache.push(
      `https://360apitrain.gordon.edu/api/activities/${activityCode}`,
      `https://360apitrain.gordon.edu/api/activities/${sessionCode}/${activityCode}/status`,
      `https://360apitrain.gordon.edu/api/emails/activity/${activityCode}`,
      `https://360apitrain.gordon.edu/api/emails/activity/${activityCode}/advisors/session/${sessionCode}`,
      `https://360apitrain.gordon.edu/api/emails/activity/${activityCode}/group-admin/session/${sessionCode}`,
      `https://360apitrain.gordon.edu/api/memberships/activity/${activityCode}`,
      `https://360apitrain.gordon.edu/api/memberships/activity/${activityCode}/followers/${sessionCode}`,
      `https://360apitrain.gordon.edu/api/memberships/activity/${activityCode}/group-admin`,
      `https://360apitrain.gordon.edu/api/memberships/activity/${activityCode}/members/${sessionCode}`,
      `https://360apitrain.gordon.edu/api/requests/activity/${activityCode}`,
      `https://360apitrain.gordon.edu/api/sessions/${sessionCode}`,
    );
  });
  */

  fetchResult = await cacheDynamicFiles(token, dynamicCache);
  if (fetchResult) console.log('\t- Cached Dynamic Files Successfully');
}

// Set interval function that will try to update cache every hour
function timerFunction() {
  resetTimer = setInterval(() => {
    console.log('Received Message. Attempting To Update Cache.');
    // Caching All Files
    cacheStaticFiles(); // Static Cache
    dynamicLinksThenCache(token, termCode); // Dynamic Cache
    // Set interval to every hour
  }, 3600000);
}

/*********************************************** EVENT LISTENERS ***********************************************/
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Installing Service Worker');
});

self.addEventListener('activate', event => {
  console.log('Activating Service Worker');
  self.clients.claim();
  event.waitUntil(cleanCache(), timerFunction());
});

self.addEventListener('fetch', event => {
  /* FOR DEVELOPING PURPOSES: THIS CONSOLE LOGS EACH FETCH REQUEST MADE */
  //If request is from Local, console.log the URL
  // if (event.request.url.match(location.origin)) {
  //   console.log('\tFetching request from LOCAL:', event.request.url);
  // } else {
  //   // If request is from Remote, console.log the URL
  //   console.log('\tFetching request from REMOTE LOCATION:', event.request.url);
  // }//

  event.respondWith(fetchThenCache(event.request));
});

self.addEventListener('message', event => {
  // If the message is to cache all static/dynamic files, all of those files are cached
  if (event.data.message && event.data.message === 'cache-static-dynamic-files') {
    console.log('Received Message. Attempting To Cache All Files.');
    token = event.data.token;
    termCode = event.data.termCode;
    // Caching All Files
    cacheStaticFiles(); // Static Cache
    dynamicLinksThenCache(token, termCode); // Dynamic Cache
  }
  // // If the message is to update the cache
  // else if (event.data.message && event.data.message === 'update-cache-files') {

  // }
});
