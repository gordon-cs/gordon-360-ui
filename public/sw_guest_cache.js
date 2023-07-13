/**
 * ES-Lint warnings are disabled because there are functions/variables that are defined here but
 * referenced in another script and this script itself is referencing variables from another script
 */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * This file handles the caching of all local files for 360 and remote files for guest mode offline
 *
 * @author Jahnuel Dorelus
 */

/**
 * Imported Variables
 *
 * (sw_global_variables.js) | cacheVersion            | The name of the cache that's used to cache all files
 * (sw_global_variables.js) | showDeveloperConsoleLog | Determines if any console logs should be made
 * (sw_global_variables.js) | warningEmoji            | The emoji symbol used to display in the console log for warning related logs
 * (sw_global_variables.js) | warningLog              | Console log styling for warning related logs
 * (sw_global_variables.js) | errorEmoji              | The emoji symbol used to display in the console log for error related logs
 * (sw_global_variables.js) | errorLog                | Console log styling for cache related logs
 * (sw_global_variables.js) | successfulEmoji         | The emoji symbol used to display in the console log for successful related logs
 * (sw_global_variables.js) | successfulLog           | Console log styling for successful related logs
 * (sw.js)                  | isFetchCanceled         | Determines if there's a cancelation of all fetches
 */

// Static links to fetch and cache
const static360Cache = [
  // Documents
  '/',
  '/events',
  '/events?CLW%20Credits',
  '/involvements',
  '/feedback',
  '/people',
  '/favicon.ico',
  '/about',
  '/help',
  '/admin',
  '/news',
  '/myprofile',
  '/transcript',
  '/attended',
  '/manifest.json',
  '/pwa.js',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/0.chunk.js.map',
  '/static/js/main.chunk.js',
  '/static/js/main.chunk.js.map',
  '/static/js/1.chunk.js',
  '/static/js/1.chunk.js.map',
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
  '/images/iphoneXR_splash.png',
  '/images/iphone11ProMax_splash.png',
  '/images/iphone12_splash.png',
  '/images/iphone12ProMax_splash.png',
  '/images/iphone14Pro_splash.png',
  '/images/iphone14ProMax_splash.png',
  '/images/ipad4_splash.png',
  '/images/ipad7_splash.png',
  '/images/ipadmini5_splash.png',
  '/images/ipadmini6_splash.png',
  '/images/ipadpro105_splash.png',
  '/images/ipadpro11_splash.png',
  '/images/ipadpro129_splash.png',
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
  '/static/media/BbFavicon.ba837cb2.ico',
  '/static/media/Off-CC.814b04da.svg',
  '/static/media/Off-IM.853ae19c.svg',
  '/static/media/Off-LS.c865b557.svg',
  '/static/media/Off-LW.4e6742d6.svg',
];
// A list of all the links that's needed for guest view
let guestRemoteLinks = [];
// Used to determine all fetches that were canceled, failed, successful, or has a bad responose
let canceledGuestFetches = [],
  failedGuestFetches = [],
  successfulGuestFetches = [],
  badResponseGuestFetches = {},
  // Source needed to create guest links
  guestRequiredSource = `${API_URL}/sessions/current`;

/**
 * Creates the list of remote links to be fetched and cached for offline mode for a guest
 */
async function createRemoteGuestLinks() {
  guestRemoteLinks = [
    `${API_URL}/events/25Live/Public`,
    `${API_URL}/sessions`,
    guestRequiredSource,
  ];

  // Used to determine if all links are created successfully
  let areLinksCreated = true;

  // Gets the current session to dynamically create links. The current session is also cached
  try {
    await fetch(guestRequiredSource).then(async (response) => {
      // Checks to make sure the response of the fetch is okay
      if (response.ok && !isFetchCanceled) {
        // Adds fetch response to cache
        await caches.open(cacheVersion).then((cache) => {
          cache.put(response.url, response.clone());
        });
        // Uses the data of the current session to create the dynamic links for the Involvements page
        response.json().then((currentSession) => {
          guestRemoteLinks.push(
            `${API_URL}/activities/session/${currentSession.SessionCode}`,
            `${API_URL}/activities/session/${currentSession.SessionCode}/types`,
          );
        });
        saveSuccessfulGuestLink(guestRequiredSource);
      } else {
        // Response is not okay so creating the links failed
        areLinksCreated = false;
        if (!isFetchCanceled)
          saveBadResponseGuestLink(
            guestRequiredSource + ' (Needed source to create guest links)',
            response.status,
          );
        else saveCanceledGuestLink(guestRequiredSource + ' (Needed source to create guest links)');
      }
    });
    // Catches any errors from the fetch
  } catch (error) {
    // Fetch has failed so creating the links failed
    areLinksCreated = false;
    if (!isFetchCanceled)
      saveFailedGuestLink(guestRequiredSource + ' (Needed source to create guest links)');
    else saveCanceledGuestLink(guestRequiredSource + ' (Needed source to create guest links)');
  }
  return areLinksCreated;
}

/**
 * Caches all of the guest files
 *
 * The files cached are both the local and remote files required for guest mode. If all files are
 * cached successfuly, its success is console logged. Vice versa if it fails.
 */
async function cacheGuestFiles() {
  // Determines if all the links were created successfully
  let areLinksCreated = await createRemoteGuestLinks();

  // Used to determine if all files were cached successfully
  let cachedAllSuccessfully = true;

  // Attempts to fetch/cache all files if the links were created successfully, otherwise, no files are cached
  if (!areLinksCreated) {
    // Since the links failed to create successfully, caching is aborted and deemed as failed
    cachedAllSuccessfully = false;
  }
  // Links were created successfully
  else {
    // Caches local files
    await caches.open(cacheVersion).then((cache) => {
      cache.addAll(static360Cache);
    });

    // Caches remote files. The list of the guest remote links is parsed through to fetch and
    // cache all files for guest view
    for (const item of guestRemoteLinks) {
      // Checks to see if fetching has been canceled before attempting to fetch.
      if (!isFetchCanceled) {
        try {
          let cachedSuccess = await fetchGuestFile(item);
          if (!cachedSuccess) cachedAllSuccessfully = false;
        } catch (error) {
          cachedAllSuccessfully = false;
        }
      }
      // Since fetching has been canceled, not all files have been cached successfully
      else {
        saveCanceledGuestLink(item);
        cachedAllSuccessfully = false;
      }
    }
  }

  // Console logs the status of all fetches made
  if (showDeveloperConsoleLog) {
    // Logs the status object of every fetch made if any fetch was unsuccessful
    if (
      Object.entries(badResponseGuestFetches).length > 0 ||
      canceledGuestFetches.length > 0 ||
      failedGuestFetches.length > 0
    )
      console.log(`%c${warningEmoji} Status of Guest Fetches:`, warningLog, {
        local: static360Cache,
        remote: {
          badResponse: badResponseGuestFetches,
          canceled: canceledGuestFetches,
          failed: failedGuestFetches,
          successful: successfulGuestFetches,
        },
      });
    // Resets the status lists and remote links
    badResponseGuestFetches = {};
    canceledGuestFetches = [];
    failedGuestFetches = [];
    successfulGuestFetches = [];
    guestRemoteLinks = [];
    // Console logs the result of attempting to cache all of the guest files
    cachedAllSuccessfully
      ? console.log(`%c${successfulEmoji} Cached All Guest Files Successfully`, successfulLog)
      : console.log(`%c${errorEmoji} Caching All Guest Files Failed`, errorLog);
  }
}

/**
 * Does a fetch of a link and attempts to cache it.
 * @param {String} link The URL of the fetch
 * @param {Number} attemptsLeft Determines how many times a fetch should retry if it fails
 * @returns {Boolean} Determines if the fetch was successful
 */
async function fetchGuestFile(link, attemptsLeft = 2) {
  // Attempts to do a fetch with the given link
  return await fetch(link)
    .then(async (response) => {
      // Checks to make sure the response of the fetch is okay. If so, attempts to add the response
      // to cache if the fetch wasn't canceled
      if (response.ok && !isFetchCanceled) {
        await caches.open(cacheVersion).then((cache) => {
          cache.put(response.url, response.clone());
        });
        saveSuccessfulGuestLink(response.url);
        return true;
      } else {
        // If the response status is not OK and the fetch was canceled, no more fetches are attempted.
        // Otherwise, the fetch is attempted again until there are no attempts left
        if (isFetchCanceled) {
          saveCanceledGuestLink(response.url);
          return false;
        } else if (attemptsLeft === 0) {
          saveBadResponseGuestLink(response.url, response.status);
          return false;
        }
        return fetchGuestFile(response.url, attemptsLeft - 1);
      }
    })
    .catch((error) => {
      // Since the fetch failed, if the fetch wasn't canceled, the fetch is attempted again until
      // there are no attempts left
      if (isFetchCanceled) {
        saveCanceledGuestLink(link);
        return false;
      } else if (attemptsLeft === 0) {
        saveFailedGuestLink(link);
        return false;
      }
      return fetchGuestFile(link, attemptsLeft - 1);
    });
}

/**
 * Saves the response's link by status number in order to have a list of links per
 * HTTP Status Code
 * @param {String} badLink The url of the bad response
 * @param {Number} statusNum The status number of the response
 */
function saveBadResponseGuestLink(badLink, statusNum) {
  // If the list for the response's status number is non-existent, the list is created
  if (!badResponseGuestFetches[statusNum]) {
    badResponseGuestFetches = {
      ...badResponseGuestFetches,
      [statusNum]: [badLink],
    };
  }
  // If the list for the response's status number has already been created and doesn't
  // contain the response's link (Prevents duplicated links in the same status)
  else if (
    badResponseGuestFetches[statusNum] &&
    !badResponseGuestFetches[statusNum].includes(badLink)
  ) {
    badResponseGuestFetches = {
      ...badResponseGuestFetches,
      [statusNum]: [...badResponseGuestFetches[statusNum], badLink],
    };
  }
}

/**
 * Saves the link of a canceled fetch
 * @param {String} link The url of the canceled fetch
 */
function saveCanceledGuestLink(link) {
  // Checks to make sure the link is not already in the list to prevent duplicates
  if (!canceledGuestFetches.includes(link)) canceledGuestFetches.push(link);
}

/**
 * Saves the link of a failed fetch
 * @param {String} link The url of the failed fetch
 */
function saveFailedGuestLink(link) {
  // Checks to make sure the link is not already in the list to prevent duplicates
  if (!failedGuestFetches.includes(link)) failedGuestFetches.push(link);
}

/**
 * Saves the link of a successful fetch
 * @param {String} link The url of the sucessful fetch
 */
function saveSuccessfulGuestLink(link) {
  // Checks to make sure the link is not already in the list to prevent duplicates
  if (!successfulGuestFetches.includes(link)) successfulGuestFetches.push(link);
}
