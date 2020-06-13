/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
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
const cacheVersion = 'cache v1.2';
const apiSource = 'https://360api.gordon.edu';
/* Uncomment For Development Only (aka develop) */
// const fontKeySource = 'https://cloud.typography.com/7763712/6754392/css/fonts.css';
/* Uncomment For Production Only (aka master) */
const fontKeySource = 'https://cloud.typography.com/7763712/7294392/css/fonts.css';
// let failedDynamicCacheLinks = [];
let dynamicCache = [];
let token,
  termCode,
  cacheTimer,
  isSuccessful,
  isFetchCanceled,
  networkStatus,
  username,
  id,
  currentSession;

const showDeveloperConsoleLog = true;

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
  '/attended',
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/static/js/1.chunk.js',
  // Files needed to prevent blank pages occuring offline
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
  '/static/css/main.02025315.chunk.css',
  '/static/css/2.3fd9a278.chunk.css',
  '/static/js/2.8e1c3293.chunk.js',
  '/static/js/main.c192f25f.chunk.js',
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
  '/static/media/campus1366.e8fc7838.jpg',
  '/static/media/gordon-logo-vertical-white.a6586885.svg',
  '/static/media/NoConnection.68275814.svg',
  '/static/media/GordonFavicon.3e563128.ico',
  '/static/media/MyGordonFavicon.7433864b.ico',
  '/static/media/GoGordonFavicon.3e563128.ico',
  '/static/media/BbFavicon.ba837cb2.ico ',
];

/* Files that needed to be cached to view involvements and events page as guests.
 * 2 other links needed for involvements are added to this in cacheStaticFiles()
 */
const dynamicCacheTwo = [
  'https://360api.gordon.edu/api/events/25Live/Public',
  'https://360api.gordon.edu/api/sessions',
  'https://360api.gordon.edu/api/sessions/current',
];

/*********************************************** CACHING FUNCTIONS ***********************************************/
/**
 * Cleans the cache to remove data that's no longer in use (removes outdated cache version)
 * If there's cache with the correct cache version, it will just remove the dynamic files
 */
async function cleanCache() {
  // Checks to make sure the current session is available before removing cache
  if (currentSession) {
    // If the cache version is the same, we remove all dynamic files cached
    await caches.open(cacheVersion).then(cache => {
      cache.keys().then(items => {
        items.forEach(item => {
          // Removes all remote files except for the font key css, the involvements for the current term and the events
          if (
            !item.url.match(location.origin) &&
            item.url !== fontKeySource &&
            item.url !== 'https://360api.gordon.edu/api/events/25Live/Public' &&
            item.url !== 'https://360api.gordon.edu/api/sessions' &&
            item.url !== 'https://360api.gordon.edu/api/sessions/current' &&
            item.url !==
              `https://360api.gordon.edu/api/activities/session/${currentSession.SessionCode}` &&
            item.url !==
              `https://360api.gordon.edu/api/activities/session/${currentSession.SessionCode}/types`
          ) {
            cache.delete(item);
          }
          // Removes '/myprofile' and '/profile/firstName.lastName' since they were made when the user
          // was caching dynamic files but appears to be from location.origin instead of remote
          else if (
            item.url.match(location.origin) &&
            (item.url.includes('/profile/') || item.url.includes('/myprofile'))
          ) {
            cache.delete(item);
          }
        });
      });
    });
  }
  // If there's outdated cache
  await caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== cacheVersion) {
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
      if (request.url === fontKeySource || dynamicCache.includes(request.url)) {
        caches.open(cacheVersion).then(cache => {
          cache.put(request.url, fetchResponse.clone());
        });
        return fetchResponse.clone();
      }
      return fetchResponse.clone();
    })
    .catch(async () => {
      if (showDeveloperConsoleLog) {
        console.log(`%c- Getting ${request.url} from cache instead...`, cacheLog);
      }
      // const response = await caches.match(request.url);
      const response = await caches.open(cacheVersion).then(cache => {
        return cache.match(request.url).then(response => {
          return response;
        });
      });
      // If there's no response from cache, we console log that the request failed
      if (response) {
        return response;
      } else if (showDeveloperConsoleLog) {
        console.log(`%c${errorEmoji} Failed to get ${request.url} from cache`, errorLog);
      }
    });
}

/**
 * Caches all of the static files
 *
 * The files cached are the static files' links in the staticCache array and the Guest view data.
 * This data includes both events and involvements for the current session. If all files are cached
 * successfuly, its success is console logged. Vice versa if it fails.
 */
async function cacheStaticFiles() {
  // Determines if all files were successfully cached
  let cachedSuccessfully = true;

  // CACHES LOCAL FILES
  await caches.open(cacheVersion).then(cache => {
    cache.addAll(staticCache).catch(error => {
      cachedSuccessfully = false;
      if (showDeveloperConsoleLog) console.log(`%c${errorEmoji} Error: ${error.message}`, errorLog);
    });
  });

  // GETS THE CURRENT SESSION
  await fetch((request = new Request('https://360api.gordon.edu/api/sessions/current')))
    .then(async fetchResponse => {
      // Checks to make sure the response of the fetch is okay
      if (fetchResponse.statusText === 'OK') {
        // Adds fetch response to cache
        await caches.open(cacheVersion).then(cache => {
          cache.put(request.url, fetchResponse.clone());
        });

        return fetchResponse.json();
      } else {
        cachedSuccessfully = false;
        if (showDeveloperConsoleLog) {
          console.log(
            `%c${warningEmoji} Bad Response: Status - ${fetchResponse.status} \n\t\tURL: ${fetchResponse.url}`,
            warningLog,
          );
        }
      }
    })
    .then(session => {
      currentSession = session;
      dynamicCacheTwo.push(
        `https://360api.gordon.edu/api/activities/session/${session.SessionCode}`,
      );
      dynamicCacheTwo.push(
        `https://360api.gordon.edu/api/activities/session/${session.SessionCode}/types`,
      );
    })
    // Catches any errors from the fetch
    .catch(error => {
      cachedSuccessfully = false;
      if (showDeveloperConsoleLog)
        console.log(`%c${errorEmoji} Error: ${error.message} \n\t\tURL: ${request.url}`, errorLog);
    });

  // RETRIEVES All DATA
  dynamicCacheTwo.forEach(async item => {
    await fetch((request = new Request(item)))
      .then(async fetchResponse => {
        // Checks to make sure the response of the fetch is okay
        if (fetchResponse.statusText === 'OK') {
          // Adds fetch response to cache
          await caches.open(cacheVersion).then(cache => {
            cache.put(item, fetchResponse.clone());
          });
          return fetchResponse.json();
        } else {
          cachedSuccessfully = false;
          if (showDeveloperConsoleLog) {
            console.log(
              `%c${warningEmoji} Bad Response: Status - ${fetchResponse.status} \n\t\tURL: ${fetchResponse.url}`,
              warningLog,
            );
          }
        }
      })
      // Catches any errors from the fetch
      .catch(error => {
        cachedSuccessfully = false;
        if (showDeveloperConsoleLog)
          console.log(
            `%c${errorEmoji} Error: ${error.message} \n\t\tURL: ${request.url}`,
            errorLog,
          );
      });
  });

  // Console logs the result of the attempt to cache all static files
  cachedSuccessfully
    ? console.log(`%c${successfulEmoji} Cached All Static Files Successfully`, successfulLog)
    : console.log(`%c${errorEmoji} Caching All Static Files Failed`, errorLog);
}

// /**
//  * Re-Caches all of the dynamic files that failed to fetch
//  *
//  *  @return {Promise} A promise with the result of re-caching the failed dynamic files
//  */
// async function recacheFailedDynamicFiles() {
//   if (token && failedDynamicCacheLinks.length > 0) {
//     const cacheOne = await cacheDynamicFiles(token, failedDynamicCacheLinks);
//     console.log('Failed Links: ', cacheOne);
//     // If all failed dynamic files successfully cache, we then empty the array
//     if (cacheOne) failedDynamicCacheLinks = [];
//     // Checks to see if both all failed links successfully cached
//     if (cacheOne) {
//       console.log(`%c${successfulEmoji} Cached Failed Dynamic Files Successfully`, successfulLog);
//     }
//   }
// }

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
              cache.put(request.url, fetchResponse.clone());
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
                cache.put(request.url, fetchResponse.clone());
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
            if (!failedDynamicCacheLinks.includes(request.url))
              failedDynamicCacheLinks.push(request.url);
            // Returns the original failed request's response
            return error.message;
          }
          // IF THE FETCH FAILED AND WAS CANCELED
          else {
            /* If the fetch was canceled due to the user going offline, we will remember the
             * request's URL for future caching. Since we attempt to fetch a request
             * multiple times, we check to make sure we haven't saved the request's URL already
             */
            if (!failedDynamicCacheLinks.includes(request.url))
              failedDynamicCacheLinks.push(request.url);
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
      if (showDeveloperConsoleLog) {
        console.log(
          `%c${errorEmoji} Failed to fetch and cache Dynamic File: ${dynamicLinks[url]}`,
          errorLog,
        );
      }
    }

    // If the fetch resulted in a bad response
    else if (fetchSuccess.statusText && fetchSuccess.statusText !== 'OK') {
      isSuccessful = false;
      if (showDeveloperConsoleLog) {
        console.log(
          `%c${warningEmoji} Bad Response: Status - ${fetchSuccess.status} \n\t\tURL: ${dynamicLinks[url]}`,
          warningLog,
        );
      }
    }
  }

  // The promise to return with a boolean value determining if all links cached successfully
  operationSuccess = await new Promise((resolve, reject) => {
    isSuccessful === true ? resolve(true) : resolve(false);
  });

  return operationSuccess;
}

/**
 * Creates the list of Dynamic URLs to fetch
 *
 * Before the list is created, several fetches are made to retrieve the current user's info which is
 * used to create the list of URLs where their info is encapsulated within the URLs
 *
 * @param {String} token The token from Local Storage to authenticate each request made
 * @param {String} termCode The current semester term
 */
async function dynamicLinksThenCache(token, termCode) {
  // Checks to make sure that the token and termCode is available before trying to commit fetches
  if (token && termCode) {
    // Creates the header for the request to have authenitification
    let headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Gets the current user's profile info to access their firstname.lastname and ID#
    let profile = await fetch(new Request(`${apiSource}/api/profiles`, { method: 'GET', headers }))
      .then(response => {
        return response.json();
      })
      .catch(error => {
        return error.message;
      });

    // Checks to make sure that the current user's info exists
    username = profile ? profile.AD_Username : null;
    id = profile ? profile.ID : null;

    // Gets the current session term
    let currentSession = await fetch(
      new Request(`${apiSource}/api/sessions/current`, {
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

    /* Sets the URLs to the dynamicCache list variable. Instead of pushing the urls to the variable,
     * we create a new list every time to prevent duplicates and to always have an updated URL list
     * according to the current user
     */
    dynamicCache = [
      // Home Page Fetch URLs
      `${apiSource}/api/cms/slider`,
      `${apiSource}/api/dining`,
      `${apiSource}/api/events/25Live/All`,
      `${apiSource}/api/profiles`,
      `${apiSource}/api/profiles/Image`,
      `${apiSource}/api/sessions`,
      `${apiSource}/api/sessions/current`,
      `${apiSource}/api/activities/session/${currentSession.SessionCode}`, ////////
      `${apiSource}/api/activities/session/${currentSession.SessionCode}/types`, ///////
      `${apiSource}/api/sessions/daysLeft`,
      // `${apiSource}/api/studentemployment/`,
      `${apiSource}/api/version`,
      `${apiSource}/api/events/chapel/${termCode}`,
      `${apiSource}/api/memberships/student/${id}`,
      `${apiSource}/api/memberships/student/username/${username}/`,
      `${apiSource}/api/profiles/${username}/`,
      `${apiSource}/api/profiles/Image/${username}/`,
      // `${apiSource}/api/schedule/${username}/`,
      `${apiSource}/api/myschedule/${username}/`,
      `${apiSource}/api/schedulecontrol/${username}/`,
      `/profile/${username}`,
      `/myprofile`,
    ];

    // Waits until all URLs in the dynamicCache list created above has been attempted to be fetched
    let fetchResult = await cacheDynamicFiles(token, dynamicCache);

    /* If the result of attempting to fetch every URL in the list dynamicCache succeeded, it's logged
     * to the console. If not, there was an error with one or more fetches in which the error
     * message(s) has been logged to the console
     */
    if (fetchResult) {
      console.log(`%c${successfulEmoji} Cached All Dynamic Files Successfully`, successfulLog);
    } else {
      console.log(`%c${errorEmoji} Caching All Dynamic Files Failed`, errorLog);
    }
  }
}

/**
 * An interval function that will attempt to update the cache every hour
 */
function timerFunction() {
  cacheTimer = setInterval(() => {
    console.log('Attempting to update cache.');
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
  // if (event.request.url.match(location.origin) && showDeveloperConsoleLog) {
  //   console.log(`Fetching request from LOCAL: ${event.request.url}`);
  // }
  // // If request is from Remote, console log the URL
  // else {
  //   if (showDeveloperConsoleLog) {
  //     console.log(`Fetching request from REMOTE LOCATION: ${event.request.origin}`);
  //   }
  // }

  event.respondWith(fetchThenCache(event.request));
});

self.addEventListener('message', event => {
  // Sets variable to prevent the lost of this data when a new service worker installs
  token = event.data.token;
  termCode = event.data.termCode;

  // If the message is to cache all static/dynamic files or update the cache
  if (
    (event.data.message && event.data.message === 'cache-static-dynamic-files') ||
    event.data.message === 'update-cache-files'
  ) {
    // Console logs the current action depending on the message received
    event.data.message === 'cache-static-dynamic-files'
      ? console.log('Attempting to cache all files.')
      : console.log('Attempting to update cache.');
    // Caching All Files
    event.waitUntil(
      cleanCache(), // Cleans the cache before updating it
      cacheStaticFiles(), // Static Cache
      dynamicLinksThenCache(event.data.token, event.data.termCode), // Dynamic Cache
    );
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
  // If the message is to reset global variables due to signing out or lost of authentication
  else if (event.data && event.data === 'delete-global-variables') {
    token = null;
    termCode = null;
    dynamicCache = [];
    failedDynamicCacheLinks = [];
    username = null;
    id = null;
  }
  // If the message is to cancel all fetches
  else if (event.data === 'cancel-fetches') {
    // Since this event listener is invoked multiple times, this check prevents it from
    // console logging multiple times
    if (isFetchCanceled === false && isSuccessful === true) {
      console.log(`%c${errorEmoji} Canceling Any Currently Running Fetches.`, errorLog);
      isFetchCanceled = true;
      isSuccessful = false;
    }
  }
  // If the message is to remove all dynamic cache
  else if (event.data === 'remove-dynamic-cache') {
    event.waitUntil(cleanCache());
  }
  // If the message is to set network status as online
  else if (event.data === 'online') {
    event.waitUntil((networkStatus = 'online'));
  }
  // If the message is to set network status as offline
  else if (event.data === 'offline') {
    event.waitUntil((networkStatus = 'offline'));
  }
});
