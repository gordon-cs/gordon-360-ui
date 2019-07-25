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
const apiSource = 'https://360apitrain.gordon.edu';
let failedDynamicCacheLinks = [];
let failedDynamicImageLinks = [];
let dynamicCache = [];
let token,
  termCode,
  cacheTimer,
  isSuccessful,
  isFetchCanceled,
  networkStatus,
  username,
  id,
  currSessionCode;

// Console log decorations
const successfulLog = ['color: #17b534', 'margin-left: 20px'].join(';');
const successfulEmoji = `\u{2705}`;
const errorLog = ['color: #ff0b23', 'margin-left: 20px'].join(';');
const errorEmoji = `\u{1F6AB}`;
const warningLog = ['color: #edc02c', 'margin-left: 24px'].join(';');
const warningEmoji = `\u{26A0}`;
const cacheLog = ['margin-left: 24px'].join(';');

// Static Files to cache
const staticCache = [
  // Documents
  '/',
  '/events',
  '/involvements',
  '/feedback',
  '/people',
  '/favicon.ico',
  '/about',
  '/help',
  '/admin',
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/static/media/campus1366.e8fc7838.jpg',
  '/static/media/gordon-logo-vertical-white.a6586885.svg',
  '/static/media/NoConnection.68275814.svg',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/static/js/1.chunk.js',
  // Files needed to prevent unappealing screen from starting the app in offline mode on iOS
  '/main.89f23f7459ac700734a6.hot-update.js',
  '/static/css/2.d64d1e9d.chunk.css',
  '/static/css/2.d64d1e9d.chunk.css.map',
  '/static/css/main.01e33f3b.chunk.css',
  '/static/css/main.5e616716.chunk.css',
  '/static/css/main.5e616716.chunk.css.map',
  '/static/css/main.8e50f2fc.chunk.css',
  '/static/css/main.8e50f2fc.chunk.css.map',
  '/static/js/2.00596eb8.chunk.js',
  '/static/js/2.00596eb8.chunk.js.map',
  '/static/js/main.2f5d16ec.chunk.js',
  '/static/js/main.2f5d16ec.chunk.js.map',
  // Images
  '/images/android-icon-36x36.png',
  '/images/android-icon-48x48.png',
  '/images/android-icon-72x72.png',
  '/images/android-icon-96x96.png',
  '/images/android-icon-144x144.png',
  '/images/android-icon-192x192.png',
  '/images/apple-icon-72x72.png',
  '/images/apple-icon-76x76.png',
  '/images/apple-icon-114x114.png',
  '/images/apple-icon-120x120.png',
  '/images/apple-icon-144x144.png',
  '/images/apple-icon-152x152.png',
  '/images/apple-icon-180x180.png',
  '/images/apple-icon-precomposed.png',
  '/images/iphone5_splash.png',
  '/images/iphone6_splash.png',
  '/images/iphoneplus_splash.png',
  '/images/iphonex_splash.png',
  '/images/ipad_splash.png',
  '/images/ipadpro1_splash.png',
  '/images/ipadpro2_splash.png',
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
 * If there's cache with the correct cache version, it will just remove the dynamic files
 *
 * @return {Promise} A promise with the result of removing outdated cache
 */
async function cleanCache() {
  // If the cache version is the same, we remove all dynamic files cached
  await caches.open(cacheVersion).then(cache => {
    cache.keys().then(items => {
      items.map(item => {
        // Removes all remote files except for the font key css
        if (
          !item.url.match(location.origin) &&
          item.url !== 'https://cloud.typography.com/7763712/6754392/css/fonts.css'
        ) {
          cache.delete(item);
        }
        // Removes '/myprofile' and '/profile/firstName.lastName' since they were made when the user
        // was caching dynamic files but appears to be from location.origin instead of remote
        else if (
          item.url.match(location.origin) &&
          (item.url.includes(`/profile/${username}`) || item.url.includes('/myprofile'))
        ) {
          cache.delete(item);
        }
      });
    });
  });
  // If there's outdated cache
  await caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== cacheVersion && key.match('cache-')) {
        return caches.delete(key).then(() => {
          console.log(
            `%c${successfulEmoji} Previous cache has been removed (outdated cache version)`,
            successfulLog,
          );
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
      // If the request is specifically Gordon 360's Font CSS or a dynamic file that's needed for offline
      if (
        request.url === 'https://cloud.typography.com/7763712/6754392/css/fonts.css' ||
        dynamicCache.includes(request.url)
      ) {
        caches.open(cacheVersion).then(cache => {
          cache.put(request, fetchResponse.clone());
        });
        return fetchResponse.clone();
      }
      return fetchResponse.clone();
    })
    .catch(async () => {
      console.log(`%c- Getting ${request.url} from cache instead...`, cacheLog);
      const response = await caches.match(request);
      // If there's no response from cache, we console log that the request failed
      if (response) {
        return response;
      } else console.log(`%c${errorEmoji} Failed to get ${request.url} from cache`, errorLog);
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
        console.log(`%c${successfulEmoji} Cached Static Files Successfully`, successfulLog);
      })
      .catch(() => {
        console.log(`%c${errorEmoji} Caching Static Files Failed`, errorLog);
      });
  });
}

/**
 * Re-Caches all of the dynamic files that failed to fetch
 *
 *  @return {Promise} A promise with the result of re-caching the failed dynamic files
 */
async function recacheDynamicFiles() {
  if (token && (failedDynamicCacheLinks.length > 0 || failedDynamicImageLinks > 0)) {
    const cacheOne = await cacheDynamicFiles(token, failedDynamicCacheLinks);
    const cacheTwo = await cacheDynamicFiles(token, failedDynamicImageLinks, 'no-cors');
    // If all failed dynamic files successfully cache, we then empty the array
    if (cacheOne) failedDynamicCacheLinks = [];
    // If all failed image files successfully cache, we then empty the array
    if (cacheTwo) failedDynamicImageLinks = [];
    // Checks to see if both all failed links successfully cached
    if (cacheOne && cacheTwo) {
      console.log(`%c${successfulEmoji} Cached Failed Dynamic Files Successfully`, successfulLog);
    }
  }
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
  // Creates the header for the request to have authenitication
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  // Variables that determines the success of caching all links
  isSuccessful = true;
  let fetchSuccess;
  let operationSuccess;

  // Variable to control cancellation of fetches
  isFetchCanceled = false;

  // Attempt to fetch all links
  for (let url = 0; url < dynamicLinks.length; url++) {
    let request = new Request(dynamicLinks[url], {
      method: 'GET',
      mode,
      headers,
    });

    // We attempt to fetch a request multiple times if it failes
    for (let attempt = 1; attempt <= 3; attempt++) {
      fetchSuccess = await fetch(request)
        .then(fetchResponse => {
          // IF THE FETCH WAS SUCCESSFUL AND WAS NOT CANCELED
          if (isFetchCanceled === false) {
            // Adds fetch response to cache
            caches.open(cacheVersion).then(cache => {
              cache.put(request, fetchResponse.clone());
            });
            return fetchResponse;
          }
          // IF THE FETCH WAS SUCCESSFUL AND WAS CANCELED
          else {
            /* If the fetch was canceled due to the user going offline, we will still cache the
             * successful response
             */
            if (networkStatus === 'offline') {
              // Adds fetch response to cache
              caches.open(cacheVersion).then(cache => {
                cache.put(request, fetchResponse.clone());
              });
              return fetchResponse;
            }
            // Returns the response of an aborted request
            return 'The user aborted a request.';
          }
        })
        .catch(error => {
          // IF THE FETCH FAILED AND WAS NOT CANCELED
          if (isFetchCanceled === false) {
            /* We save the failed request's URL for future caching. Since we attempt to fetch a request
             * multiple times, we check to make sure we haven't saved the request's URL already
             */
            if (request.url.includes('https://wwwtrain.gordon.edu/images/2ColumnHero')) {
              if (!failedDynamicImageLinks.includes(request.url))
                failedDynamicImageLinks.push(request.url);
            } else {
              if (!failedDynamicCacheLinks.includes(request.url))
                failedDynamicCacheLinks.push(request.url);
            }
            // Returns the original failed request's response
            return error.message;
          }
          // IF THE FETCH FAILED AND WAS CANCELED
          else {
            /* If the fetch was canceled due to the user going offline, we will remember the
             * request's URL for future caching. Since we attempt to fetch a request
             * multiple times, we check to make sure we haven't saved the request's URL already
             */
            if (
              networkStatus === 'offline' &&
              request.url.includes('https://wwwtrain.gordon.edu/images/2ColumnHero')
            ) {
              if (!failedDynamicImageLinks.includes(request.url))
                failedDynamicImageLinks.push(request.url);
            } else if (networkStatus === 'offline') {
              if (!failedDynamicCacheLinks.includes(request.url))
                failedDynamicCacheLinks.push(request.url);
            }
            // Returns the response of an aborted request
            return 'The user aborted a request.';
          }
        });

      // If the fetch didn't fail, we stop retrying to fetch for the request
      if (fetchSuccess !== 'Failed to fetch') attempt = 4;
    }

    // If the fetch resulted in error
    if (fetchSuccess === 'Failed to fetch') {
      isSuccessful = false;
      console.log(
        `%c${errorEmoji} Failed to fetch and cache Dynamic File: ${dynamicLinks[url]}`,
        errorLog,
      );
    }

    // If the fetch resulted in a bad response
    else if (fetchSuccess.statusText && fetchSuccess.statusText !== 'OK') {
      isSuccessful = false;
      console.log(
        `%c${warningEmoji} Bad Response: Status - ${fetchSuccess.status} \n\t\tURL: ${dynamicLinks[url]}`,
        warningLog,
      );
    }
  }

  // The promise to return with a boolean value determining if all links cached successfully
  operationSuccess = await new Promise((resolve, reject) => {
    isSuccessful === true ? resolve(true) : reject(false);
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
  // Checks to make sure that the token and termCode is available before we try to fetch
  if (token && termCode) {
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

    let sessions = await fetch(
      new Request('https://360apitrain.gordon.edu/api/sessions', {
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

    username = profile ? profile.AD_Username : null;
    id = profile ? profile.ID : null;
    currSessionCode = currentSession ? currentSession.SessionCode : null;

    const imagesCache = [
      'https://wwwtrain.gordon.edu/images/2ColumnHero/Profile-1_2018_07_26_02_26_40_2018_10_09_08_52_16.jpg',
      'https://wwwtrain.gordon.edu/images/2ColumnHero/welcome1_2018_07_26_11_00_21_2018_10_09_08_51_52.jpg',
      'https://wwwtrain.gordon.edu/images/2ColumnHero/Help-1_2018_07_26_11_04_33_2018_10_09_08_51_12.jpg',
      'https://wwwtrain.gordon.edu/images/2ColumnHero/Events-1_2018_07_26_02_24_53_2018_10_09_08_51_24.jpg',
      'https://wwwtrain.gordon.edu/images/2ColumnHero/Feedback-1_2018_07_26_02_25_11_2018_10_09_08_50_45.jpg',
      'https://wwwtrain.gordon.edu/images/2ColumnHero/Home-1_2018_07_26_02_25_41_2018_10_09_08_51_41.jpg',
      'https://wwwtrain.gordon.edu/images/2ColumnHero/Involvements-1_2018_07_26_02_26_19_2018_10_09_08_52_02.jpg',
    ];

    dynamicCache = [
      // Home Page Fetch URLs
      `${apiSource}/api/cms/slider`,
      `${apiSource}/api/dining`,
      `${apiSource}/api/events/25Live/All`,
      `${apiSource}/api/profiles`,
      `${apiSource}/api/profiles/Image`,
      `${apiSource}/api/sessions`,
      `${apiSource}/api/sessions/current`,
      `${apiSource}/api/sessions/daysLeft`,
      `${apiSource}/api/studentemployment/`,
      `${apiSource}/api/version`,
      `${apiSource}/api/activities/session/${currSessionCode}`,
      `${apiSource}/api/activities/session/${currSessionCode}/types`,
      `${apiSource}/api/events/chapel/${termCode}`,
      `${apiSource}/api/memberships/student/${id}`,
      `${apiSource}/api/memberships/student/username/${username}/`,
      `${apiSource}/api/profiles/${username}/`,
      `${apiSource}/api/profiles/Image/${username}/`,
      `${apiSource}/api/requests/student/${id}`,
      `/profile/${username}`,
      `/myprofile`,
    ];

    sessions.forEach(session => {
      if (session.SessionCode > currSessionCode) {
        dynamicCache.push(
          `${apiSource}/api/activities/session/${session.SessionCode}`,
          `${apiSource}/api/activities/session/${session.SessionCode}/types`,
        );
      }
    });

    // // Gets the involvements of the current user for the Involvement Profiles
    // let involvements = await fetch(
    //   new Request(`https://360apitrain.gordon.edu/api/memberships/student/${id}`, {
    //     method: 'GET',
    //     headers,
    //   }),
    // )
    //   .then(response => {
    //     return response.json();
    //   })
    //   .catch(error => {
    //     involvement;
    //     return error.message;
    //   });

    // involvements.forEach(involvement => {
    //   let activityCode = involvement ? involvement.ActivityCode : null;
    //   let sessionCode = involvement ? involvement.SessionCode : null;
    //   dynamicCache.push(
    //     `${apiSource}/activities/${activityCode}`,
    //     `${apiSource}/api/activities/${sessionCode}/${activityCode}/status`,
    //     `${apiSource}/api/emails/activity/${activityCode}`,
    //     `${apiSource}/api/emails/activity/${activityCode}/advisors/session/${sessionCode}`,
    //     `${apiSource}/api/emails/activity/${activityCode}/group-admin/session/${sessionCode}`,
    //     `${apiSource}/api/memberships/activity/${activityCode}`,
    //     `${apiSource}/api/memberships/activity/${activityCode}/followers/${sessionCode}`,
    //     `${apiSource}/api/memberships/activity/${activityCode}/group-admin`,
    //     `${apiSource}/api/memberships/activity/${activityCode}/members/${sessionCode}`,
    //     `${apiSource}/api/requests/activity/${activityCode}`,
    //     `${apiSource}/api/sessions/${sessionCode}`,
    //   );
    // });

    fetchResultOne = await cacheDynamicFiles(token, imagesCache, 'no-cors');
    fetchResultTwo = await cacheDynamicFiles(token, dynamicCache);
    if (fetchResultOne && fetchResultTwo)
      console.log(`%c${successfulEmoji} Cached Dynamic Files Successfully`, successfulLog);
  }
}

// Set interval function that will try to update cache every hour
function timerFunction() {
  cacheTimer = setInterval(() => {
    console.log('Attempting To Update Cache.');
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
  // If request is from Local, console log the URL
  // if (event.request.url.match(location.origin)) {
  //   console.log(`Fetching request from LOCAL: ${event.request.url}`);
  // }
  // // If request is from Remote, console log the URL
  // else {
  //   console.log(`Fetching request from REMOTE LOCATION: ${event.request.url}`);
  // }

  event.respondWith(fetchThenCache(event.request));
});

self.addEventListener('message', event => {
  // If the message is to cache all static/dynamic files, all of those files are cached
  if (event.data.message && event.data.message === 'cache-static-dynamic-files') {
    console.log('Attempting to cache all files');
    // Sets variable to prevent the lost of this data when a new service worker installs
    token = event.data.token;
    termCode = event.data.termCode;
    // Caching All Files
    cacheStaticFiles(); // Static Cache
    dynamicLinksThenCache(event.data.token, event.data.termCode); // Dynamic Cache
  }
  // If the message is to update the cache
  else if (event.data.message && event.data.message === 'update-cache-files') {
    console.log('Attempting to update cache.');
    // Sets variable to prevent the lost of this data when a new service worker installs
    token = event.data.token;
    termCode = event.data.termCode;
    // Caching All Files
    cacheStaticFiles(); // Static Cache
    dynamicLinksThenCache(event.data.token, event.data.termCode); // Dynamic Cache
  }
  // If the message is to start the cache timer
  else if (event.data && event.data === 'start-cache-timer') {
    console.log('Starting timer to update cache.');
    event.waitUntil(timerFunction());
  }
  // If the message is to stop the cache timer
  else if (event.data && event.data === 'stop-cache-timer') {
    console.log('Stopping timer to update cache.');
    event.waitUntil(clearInterval(cacheTimer));
  }
  // If the message is to delete the token and current term code due to loss of authentification
  else if (event.data && event.data === 'delete-global-variables') {
    token = null;
    termCode = null;
    dynamicCache = [];
    failedDynamicCacheLinks = [];
    failedDynamicImageLinks = [];
    username = null;
    id = null;
    currSessionCode = null;
    dynamicCache = null;
  }
  // If the message is to cancel all fetches
  if (event.data === 'cancel-fetches') {
    // Since this event listener is invoked multiple times, this check prevents it from
    // console logging multiple times
    if (isFetchCanceled === false && isSuccessful === true) {
      console.log(`%c${errorEmoji} Canceling Any Currently Running Fetches.`, errorLog);
      isFetchCanceled = true;
      isSuccessful = false;
    }
  }
  // If the message is to remove all dynamic cache
  if (event.data === 'remove-dynamic-cache') {
    event.waitUntil(cleanCache());
  }
  // If the message is to set network status as online
  if (event.data === 'online') {
    event.waitUntil((networkStatus = 'online'), recacheDynamicFiles());
  }
  // If the message is to set network status as offline
  if (event.data === 'offline') {
    event.waitUntil((networkStatus = 'offline'));
  }
});
