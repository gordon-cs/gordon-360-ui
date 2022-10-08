/**
 * ES-Lint warnings are disabled because there are functions/variables that are defined here but
 * referenced in another script and this script itself is referencing variables from another script.
 * Also, the global variable "self" is used instead of "window.self" because "window" is not
 * defined within this scope. ES-Lint dislikes "self" but accepts "window.self"
 */

/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */

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

const urls = new URLSearchParams(location.search);
const API_URL = urls.get('API');
const FONT_URL = urls.get('FONT');

/**
 * Imports scripts into this file. Every file that's imported becomes apart of this file. In other
 * words, variables found in one script can and will be found in other scripts since they are all
 * connected to this service worker.
 */
importScripts('./sw_global_variables.js', './sw_guest_cache.js', './sw_user_cache.js');

/**
 * Imported Variables and functions
 *
 * (sw_global_variables.js) | cacheVersion            | The name of the cache that's used to cache all files
 * (sw_global_variables.js) | showDeveloperConsoleLog | Determines if any console logs should be made
 * (sw_global_variables.js) | cacheEmoji              | The emoji symbol used to display in the console log for cache related logs
 * (sw_global_variables.js) | cacheLog                | Console log styling for cache related logs
 * (sw_global_variables.js) | warningEmoji            | The emoji symbol used to display in the console log for warning related logs
 * (sw_global_variables.js) | warningLog              | Console log styling for warning related logs
 * (sw_global_variables.js) | errorEmoji              | The emoji symbol used to display in the console log for error related logs
 * (sw_global_variables.js) | errorLog                | Console log styling for cache related logs
 * (sw_global_variables.js) | statusLog               | Console log styling for status related logs
 * (sw_guest_cache.js)      | cacheGuestFiles()       | Function that caches all of the files needed for the guest in offline mode
 * (sw_guest_cache.js)      | static360Cache          | The URLs of every file that's locally cached
 * (sw_guest_cache.js)      | guestRemoteLinks        | The list of URLs used to cache files for the guest in offline mode
 * (sw_user_cache.js)       | userRemoteLinks         | The list of URLs used to cache files for the authenticated user in offline mode
 * (sw_user_cache.js)       | cacheUserFiles()        | Function that caches all of the files needed for the authenticated user in offline mode
 * (sw_user_cache.js)       | removeUserCache()       | Function that removes all data from cache associated with the authenticated user
 */

// Local Variables
let token, // Holds the token of the user
  termCode, // Holds the current semester term code
  cacheTimer, // Contains the timer that updates the cache after a specified interval
  isFetchCanceled, // Determines if fetches should be canceled
  network = 'online'; // Determines if the network is online or offline

/**
 * Removes all cache data. This includes data from the current cache version and any other cache
 * present. This may need to be modified in the future if the service worker isn't the only place
 * using the cache. If other functions outside of the service worker uses the cache, its cache data
 * will also be deleted when a new service worker installs and may cause a bug
 */
async function removeAllCache() {
  await caches.keys().then((keys) => {
    // Goes through each cache present and deletes it
    keys.forEach(async (key) => {
      await caches.delete(key).then(() => {
        if (showDeveloperConsoleLog) {
          key === cacheVersion
            ? // If the cache is the same as the current cache version
              console.log(`%cCurrent cache cleared: "${key}"`, statusLog)
            : // If the cache is not the same as the current cache version
              console.log(`%cPrevious cache has been removed: "${key}"`, statusLog);
        }
      });
    });
  });
}

/**
 * Does a fetch for each request received.
 *
 * If the network is available, it returns a response from the fetch.
 * Otherwise, it returns a response from the cache.
 *
 * @param {Request} request The request to be fetched from the network or cache
 * @returns {Response} A response served from the network or cache
 */
async function fetchThenCache(request) {
  // Attempts to do a fetch with the request if fetches have not been canceled
  if (!isFetchCanceled) {
    try {
      return await fetch(request).then(async (fetchResponse) => {
        // If the request is specifically Gordon 360's Font CSS or a file that's needed for offline
        // mode, it's cached before being returned
        if (
          request.url === FONT_URL ||
          static360Cache.includes(request.url) ||
          guestRemoteLinks.includes(request.url) ||
          userRemoteLinks.includes(request.url)
        ) {
          await caches.open(cacheVersion).then((cache) => {
            cache.put(request.url, fetchResponse.clone());
          });
          return fetchResponse.clone();
        }

        // Returns the fetch's response if it's not a file that's needed for offline mode
        return fetchResponse.clone();
      });
    } catch (error) {
      // Since the fetch failed, attempt to retrieve the response from cache
      if (showDeveloperConsoleLog)
        console.log(`%c${cacheEmoji} Getting ${request.url} from cache instead...`, cacheLog);
      let response;
      /**
       * Checks the URL to see if it's the events page or the attended events page that contains
       * query parameters. If there are any query parameters, the file "/events" is returned.
       * This is fine because the file that's requested is the same HTML file that "/events" is
       */

      if (request.url.includes('/events?') || request.url.includes('/attended?')) {
        response = await caches.open(cacheVersion).then(async (cache) => {
          const response = await cache.match(location.origin + '/events');
          return response;
        });
      } else {
        response = await caches.open(cacheVersion).then((cache) => {
          return cache.match(request.url).then((response) => {
            return response;
          });
        });
      }

      // If there's no response from cache, we console log that the request failed
      if (response) {
        return response;
      } else if (showDeveloperConsoleLog)
        console.log(`%c${errorEmoji} Failed to get ${request.url} from cache`, errorLog);
    }
  } else {
    // Console logs that the fetch has been canceled
    if (showDeveloperConsoleLog)
      console.log(`%c${warningEmoji} Request has been canceled: ${request.url}`, warningLog);
  }
}

/**
 * An interval function that will attempt to update the cache every hour
 */
function timerFunction() {
  cacheTimer = setInterval(() => {
    // if (showDeveloperConsoleLog) console.log('%cAttempting to update cache.', statusLog);
    // Caches all files if online
    if (network === 'online') {
      cacheGuestFiles(); // Guest Cache
      cacheUserFiles(); // User Cache
    }
    // Set interval to every hour
  }, 3600000);
}

/**************************************** EVENT LISTENERS *****************************************/
self.addEventListener('install', () => {
  self.skipWaiting();
  if (showDeveloperConsoleLog) console.log('%cInstalling Service Worker', statusLog);
});

self.addEventListener('activate', async (event) => {
  if (showDeveloperConsoleLog) console.log('%cActivating Service Worker', statusLog);
  self.clients.claim();
  // Removes outdated cache and starts timer to update the cache every hour
  await removeAllCache();
  timerFunction();
});

self.addEventListener('fetch', (event) => {
  /* FOR DEVELOPING PURPOSES: THIS CONSOLE LOGS EACH FETCH REQUEST MADE */
  // If request is from Local, console log the URL
  // if (event.request.url.match(location.origin) && showDeveloperConsoleLog) {
  //   console.log(`Fetching request from LOCAL: ${event.request.url}`);
  // }
  // // If request is from Remote, console log the URL
  // else {
  //   if (showDeveloperConsoleLog) {
  //     console.log(`Fetching request from REMOTE LOCATION: ${event.request.url}`);
  //   }
  // }
  event.respondWith(fetchThenCache(event.request));
});

self.addEventListener('message', async (event) => {
  // Gets the token and current semester term code
  token = event.data.token ? event.data.token : null;
  termCode = event.data.termCode ? event.data.termCode : null;

  // If the message is to update the cache
  if (event.data.message && event.data.message === 'update-cache-files') {
    if (showDeveloperConsoleLog) console.log('%cAttempting to update cache.', statusLog);
    await cacheGuestFiles();
    await cacheUserFiles();
  }

  // If the message is to remove the user's data due to signing out or lost of authentication
  else if (event.data && event.data === 'remove-user-data') {
    token = null;
    termCode = null;
    await removeUserCache();
  }
  // If the message is to cancel all fetches
  else if (event.data === 'cancel-fetches') {
    // Since this event listener is invoked multiple times, this check prevents it from
    // console logging multiple times
    if (isFetchCanceled === false && guestRemoteLinks.length > 0 && userRemoteLinks.length > 0) {
      isFetchCanceled = true;
    }
  }
  // If the message is that the network is offline
  else if (event.data === 'offline') {
    network = 'offline';
  }
  // If the message is that the network is online
  else if (event.data === 'online') {
    network = 'online';
  }
});
