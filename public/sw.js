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

/*********************************************** VARIABLES ***********************************************/
// Current cache version
let cacheVersion = 'cache-1.0';

// Static Files to cache
const staticCache = [
  '/',
  '/favicon.ico',
  // 'https://cloud.typography.com/7763712/7294392/css/fonts.css', // Doesn't work in Developlent
  '/images/apple-touch-icon-144x144.png',
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/static/media/campus1366.e8fc7838.jpg',
  '/static/media/gordon-logo-vertical-white.a6586885.svg',
];

/**
 * First set out of three to cache dynamic files that requies a
   Request with its property mode set to "cors"
*/
const firstDynamicCache = [
  // Home Page Fetch URLs
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
];

/**
 * Second set out of three to cache dynamic files that requies a
   Request with its property mode set to "no-cors"
*/
const secondDynamicCache = [
  'https://www.gordon.edu/favicon.ico',
  'https://my.gordon.edu/ics/favicon.ico',
  'https://go.gordon.edu/favicon.ico',
  'https://blackboard.gordon.edu/favicon.ico',
  // 'https://360api.gordon.edu/browseable/uploads/Default/activityImage.png',
  // 'https://360apitrain.gordon.edu/browseable/uploads/ACD/canvasImage.jpeg',
  // 'https://360apitrain.gordon.edu/browseable/uploads/ASF/canvasImage.jpeg',
  // 'https://360apitrain.gordon.edu/browseable/uploads/BADM/canvasImage.jpeg',
  // 'https://360apitrain.gordon.edu/browseable/uploads/BARN/canvasImage.jpeg',
  // 'https://360apitrain.gordon.edu/browseable/uploads/CLAR/canvasImage.jpeg',
  // 'https://360apitrain.gordon.edu/browseable/uploads/REC/canvasImage.jpeg',
  // 'https://360apitrain.gordon.edu/browseable/uploads/SCOTTIE/canvasImage.png',
];

/*********************************************** CACHING FUNCTIONS ***********************************************/
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
      console.log(`Getting ${request.url} from cache instead...`);
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
async function cacheStatic() {
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
 * Pre-caches third set of dynamic files that requies a Request with its property mode set to "cors"
 *
 * Two fetches are done to have the user's info and the current session.
 * There are three variables that are obtained from these fetches which are the user's
 * username/id and the current session code. These variables are then used to create an array of
 * links that is passed into the function 'cacheDynamic()' to cache the last set of dynamic files
 *
 * @param {String} token The token from Local Storage to authenticate each request made
 * @param {String} termCode The current semester term
 */
async function getUserInfoForLinks(token, termCode) {
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
      return error.message;
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
      return error.message;
    });
  let username = profile ? profile.AD_Username : null;
  let id = profile ? profile.ID : null;
  let sessionCode = currentSession ? currentSession.SessionCode : null;
  const thirdDynamicCache = [
    `https://360apitrain.gordon.edu/api/activities/session/${sessionCode}`,
    `https://360apitrain.gordon.edu/api/activities/session/${sessionCode}/types`,
    `https://360apitrain.gordon.edu/api/events/chapel/${termCode}`,
    `https://360apitrain.gordon.edu/api/memberships/student/${id}`,
    `https://360apitrain.gordon.edu/api/memberships/student/username/${username}/`,
    `https://360apitrain.gordon.edu/api/profiles/${username}/`,
    `https://360apitrain.gordon.edu/api/profiles/Image/${username}/`,
    `https://360apitrain.gordon.edu/api/requests/student/${id}`,
  ];
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
    thirdDynamicCache.push(
      `https://360apitrain.gordon.edu/api/activities/${involvement.ActivityCode}`,
      `https://360apitrain.gordon.edu/api/activities/${involvement.SessionCode}/${
        involvement.ActivityCode
      }/status`,
      `https://360apitrain.gordon.edu/api/emails/activity/${involvement.ActivityCode}`,
      `https://360apitrain.gordon.edu/api/emails/activity/${
        involvement.ActivityCode
      }/advisors/session/${involvement.SessionCode}`,
      `https://360apitrain.gordon.edu/api/emails/activity/${
        involvement.ActivityCode
      }/group-admin/session/${involvement.SessionCode}`,
      `https://360apitrain.gordon.edu/api/memberships/activity/${involvement.ActivityCode}`,
      `https://360apitrain.gordon.edu/api/memberships/activity/${
        involvement.ActivityCode
      }/followers/${involvement.SessionCode}`,
      `https://360apitrain.gordon.edu/api/memberships/activity/${
        involvement.ActivityCode
      }/group-admin`,
      `https://360apitrain.gordon.edu/api/memberships/activity/${
        involvement.ActivityCode
      }/members/${involvement.SessionCode}`,
      `https://360apitrain.gordon.edu/api/requests/activity/${involvement.ActivityCode}`,
      `https://360apitrain.gordon.edu/api/sessions/${involvement.SessionCode}`,
    );
  });
  cacheDynamic(token, thirdDynamicCache);
}

/**
 * Fetches and caches all the dynamic files that are listed in the passed-in array
 *
 * For each URL in the passed-in array, a fetch is made. If the fetch is
 * successful, the response is then cached
 * Else, we console the specific URL that failed to fetch
 *
 * @param {String} token The token from Local Storage to authenticate each request made
 * @param {Array} dynamicUserCacheLinks An array of links to be fetched and cached
 * @param {String} mode [Set to 'cors' by default] Defines the type of request to be made
 */
async function cacheDynamic(token, dynamicUserCacheLinks, mode = 'cors') {
  // Creates the header for the request to have authenitification
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  // Caches each url in the list of dynamic files to cache
  dynamicUserCacheLinks.forEach(async url => {
    let request = new Request(url, {
      method: 'GET',
      mode,
      headers,
    });
    await fetch(request)
      .then(fetchResponse => {
        if (fetchResponse) {
          // Adds fetch response to cache
          caches.open(cacheVersion).then(cache => {
            cache.put(request, fetchResponse);
          });
        }
      })
      .catch(() => {
        console.log(`\t- Failed to fetch and cache Dynamic File: ${url}`);
      });
  });
}

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
  /* FOR DEVELOPING PURPOSES: THIS CONSOLE LOGS EACH FETCH REQUEST MADE */
  //If request is from Local, console.log the URL
  // if (event.request.url.match(location.origin)) {
  //   console.log('Fetching request from LOCAL:', event.request.url);
  // } else {
  //   // If request is from Remote, console.log the URL
  //   console.log('Fetching request from REMOTE LOCATION:', event.request.url);
  // }

  event.respondWith(fetchThenCache(event.request));
});

self.addEventListener('message', event => {
  // If the message is to cache all static/dynamic files, all of those files are cached
  if (event.data.message && event.data.message === 'cache-static-dynamic-files') {
    console.log('Received message from client. Attempting to cache all files');
    cacheStatic(); // Static Cache
    cacheDynamic(event.data.token, firstDynamicCache); // First Dynamic Cache
    cacheDynamic(event.data.token, secondDynamicCache, 'no-cors'); // Second Dynamic Cache
    getUserInfoForLinks(event.data.token, event.data.termCode); // Third Dynamic Cache
  }
});

// window.addEventListener('offline', function(e) { console.log('offline'); });

// window.addEventListener('online', function(e) { console.log('online'); });




// function hostReachable() {

//   // Handle IE and more capable browsers
//   var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
//   var status;

//   // Open new request as a HEAD to the root hostname with a random param to bust the cache
//   xhr.open( "HEAD", "//" + window.location.hostname + "/?rand=" + Math.floor((1 + Math.random()) * 0x10000), false );

//   // Issue request and handle response
//   try {
//     xhr.send();
//     return ( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 );
//   } catch (error) {
//     return false;
//   }

// }

