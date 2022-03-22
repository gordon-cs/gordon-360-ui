/**
 * ES-Lint warnings are disabled because there are functions/variables that are defined here but
 * referenced in another script and this script itself is referencing variables from another script.
 * Also, the global variable "location" is used instead of "window.location: because "window" is not
 * defined within this scope. ES-Lint dislikes "location" but accepts "window.location"
 */

/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */

/**
 * This file handles the caching of all static remote files needed for an authenticated user offline
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
 * (sw.js)                  | token                   | Holds the token of the authenticated user
 * (sw.js)                  | termCode                | Holds the current term code to retrieve user's attended chapel events
 */

// A list of all the links that belongs to the user
let userRemoteLinks = [];
// Used to determine all fetches that were canceled, failed, successful, or has a bad responose
let canceledUserFetches = [],
  failedUserFetches = [],
  successfulUserFetches = [],
  badResponseUserFetches = {},
  // Source needed to create user links
  userRequiredSource = `${API_URL}/profiles`;

/**
 * Creates the list of remote links to be fetched and cached for offline mode for an authenticated user
 */
async function createRemoteUserLinks() {
  // Used to determine if all links are created successfully
  let areLinksCreated = true;

  // Creates the headers for a request to have authentication
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  // Checks to make sure that the token and semester term code is available before attempting any fetches
  if (token && termCode) {
    userRemoteLinks = [
      `${API_URL}/cms/slider`,
      `${API_URL}/dining`,
      `${API_URL}/events/25Live/All`,
      userRequiredSource,
      `${API_URL}/profiles/Image`,
      `${API_URL}/sessions/daysLeft`,
      `${API_URL}/news/categories`,
      `${API_URL}/news/not-expired`,
      `${API_URL}/version`,
      `${API_URL}/events/chapel/${termCode}`,
      `${API_URL}/vpscore`,
      `${API_URL}/schedule`,
      `${API_URL}/news/personal-unapproved`,
    ];

    try {
      // Fetches the user's profile info to create the remote links. Their profile info is also cached
      let userProfile = await fetch(
        (request = new Request(`${API_URL}/profiles`, { method: 'GET', headers })),
      ).then(async (response) => {
        // Checks to make sure the response of the fetch is okay before adding links to the list
        // of remote links for the user
        if (response.ok && !isFetchCanceled) {
          // Adds user's profile info to cache
          await caches.open(cacheVersion).then((cache) => {
            cache.put(request.url, response.clone());
          });
          // Creates the user's remote links
          const profile = await response.json();
          userRemoteLinks.push(
            `${API_URL}/memberships/student/username/${profile.AD_Username}/`,
            `${API_URL}/profiles/${profile.AD_Username}/`,
            `${API_URL}/profiles/Image/${profile.AD_Username}/`,
            `${API_URL}/profiles/Advisors/${profile.AD_Username}/`,
            `${API_URL}/schedule/${profile.AD_Username}/`,
            `${API_URL}/myschedule/${profile.AD_Username}/`,
            `${API_URL}/schedulecontrol/${profile.AD_Username}/`,
            `${API_URL}/studentemployment/`,
          );
          saveSuccessfulUserLink(userRequiredSource);
          return profile;
        } else {
          // Response is not okay so creating the links failed
          areLinksCreated = false;
          if (!isFetchCanceled)
            saveBadResponse(
              userRequiredSource + ' (Needed source to create user links)',
              response.status,
            );
          else saveCanceledUserLink(userRequiredSource + ' (Needed source to create user links)');
        }
      });

      // Fetches the user's memberships to cache each membership's data
      await fetch(
        (request = new Request(`${API_URL}/memberships/student/${userProfile.ID}`, {
          method: 'GET',
          headers,
        })),
      ).then(async (response) => {
        // Adds the request to the links of remote user links
        userRemoteLinks.push(`${API_URL}/memberships/student/${userProfile.ID}`);
        // Checks to make sure the response of the fetch is okay before adding links to the list
        // of remote links for the user
        if (response.ok && !isFetchCanceled) {
          // Adds user's profile info to cache
          await caches.open(cacheVersion).then((cache) => {
            cache.put(request.url, response.clone());
          });
          // Creates the user's memberships links
          const memberships = await response.json();
          for (const activity of memberships) {
            userRemoteLinks.push(`${API_URL}/activities/${activity.ActivityCode}`);
          }
          saveSuccessfulUserLink(request.url);
        } else {
          // Response is not okay so creating the links failed
          areLinksCreated = false;
          if (!isFetchCanceled)
            saveBadResponse(request.url, +' (Needed source to create user links)', response.status);
          else saveCanceledUserLink(request.url, +' (Needed source to create user links)');
        }
      });
    } catch (error) {
      // Fetch has failed so creating the links failed
      areLinksCreated = false;

      if (!isFetchCanceled)
        saveFailedUserLink(request.url, +' (Needed source to create user links)');
      else saveCanceledUserLink(request.url, +' (Needed source to create user links)');
    }
  } else {
    // Since the token or term code is missing, the user's remote links cannot be created
    areLinksCreated = false;
  }
  return { areLinksCreated, headers };
}

/**
 * Caches all of the user's files
 *
 * The files cached are the remote files required for an authenticated user in offline mode.
 * If all files are cached successfuly, its success is console logged. Vice versa if it fails.
 */
async function cacheUserFiles() {
  /**
   * Checks to make sure that the token is available. It's availability determines if the user is
   * logged in and if any user files should be fetched and cached.
   */
  if (token) {
    // Determines if all the links were creted successfully and receives the headers required for a
    // request to have authentication
    let { areLinksCreated, headers } = await createRemoteUserLinks();

    // Used to determine if all files were cached successfully
    let cachedAllSuccessfully = true;

    // Attempts to fetch/cache all files if the links were created successfully, otherwise, no files are cached
    if (!areLinksCreated) {
      // Since the links failed to create successfully, caching is aborted and deemed as failed
      cachedAllSuccessfully = false;
    } else {
      // Links were created successfully
      for (const link of userRemoteLinks) {
        // Checks to see if fetching has been canceled before attempting to fetch
        if (!isFetchCanceled) {
          try {
            let cachedSuccess = await fetchUserFile(link, headers);
            if (!cachedSuccess) cachedAllSuccessfully = false;
          } catch (error) {
            cachedAllSuccessfully = false;
          }
        } else {
          saveCanceledUserLink(link);
          cachedAllSuccessfully = false;
        }
      }
    }

    // Console logs the status of all fetches made
    if (showDeveloperConsoleLog) {
      // Logs the status object of every fetch made if any fetch was unsuccessful
      if (
        Object.entries(badResponseUserFetches).length > 0 ||
        canceledUserFetches.length > 0 ||
        failedUserFetches.length > 0
      )
        console.log(`%c${warningEmoji} Status of User Fetches:`, warningLog, {
          badResponse: badResponseUserFetches,
          canceled: canceledUserFetches,
          failed: failedUserFetches,
          successful: successfulUserFetches,
        });
      // Resets the status lists and remote links
      badResponseUserFetches = {};
      canceledUserFetches = [];
      failedUserFetches = [];
      successfulUserFetches = [];
      // Console logs the result of attempting to cache all of the user's files
      cachedAllSuccessfully
        ? console.log(`%c${successfulEmoji} Cached All User Files Successfully`, successfulLog)
        : console.log(`%c${errorEmoji} Caching All User Files Failed`, errorLog);
    }
  }
}

/**
 * Does a fetch of a link and attempts to cache it.
 * @param {String} link The URL of the fetch
 * @param {Headers} headers The headers needed for the request to have authentication
 * @param {Number} attemptsLeft Determines how many times a fetch should retry if it fails
 * @returns {Boolean} Determines if the fetch was successful
 */
async function fetchUserFile(link, headers, attemptsLeft = 2) {
  // Attempts to do a fetch with the given link
  return await fetch(
    new Request(link, {
      method: 'GET',
      headers,
    }),
  )
    .then(async (response) => {
      // Checks to make sure the response of the fetch is okay. If so, attempts to add the response
      // to cache if fetch wasn't canceled
      if (response.ok && !isFetchCanceled) {
        await caches.open(cacheVersion).then((cache) => {
          cache.put(link, response.clone());
        });
        saveSuccessfulUserLink(response.url);
        return true;
      } else {
        // If the response status is not OK and the fetch was canceled, no more fetches are attempted.
        // Otherwise, the fetch is attempted again until there are no attempts left
        if (isFetchCanceled) {
          saveCanceledUserLink(response.url);
          return false;
        } else if (attemptsLeft === 0) {
          saveBadResponseUserLink(response.url, response.status);
          return false;
        }
        return fetchUserFile(response.url, headers, attemptsLeft - 1);
      }
    })
    .catch((error) => {
      // Since the fetch failed, if the fetch wasn't canceled, the fetch is attempted again until
      // there are no attempts left
      if (isFetchCanceled) {
        saveCanceledUserLink(request.url);
        return false;
      } else if (attemptsLeft === 0) {
        saveFailedUserLink(request.url);
        return false;
      }
      return fetchUserFile(request.url, headers, attemptsLeft - 1);
    });
}

/**
 * Cleans the cache to remove all of the user's data. If the API source located in
 * sw_global_variables.js is not the same with the API that the browser fetches from, all remote
 * data will be removed.
 */
async function removeUserCache() {
  // Opens the cache and parses through all data
  await caches
    .open(cacheVersion)
    .then((cache) => {
      cache.keys().then((items) => {
        items.forEach((item) => {
          /**
           * Checks to see if the item's URL is apart of the list of user's remote links. If so,
           * the link is removed from cache and from the list of the user's remote links
           */
          if (userRemoteLinks.includes(item.url)) {
            cache.delete(item);
            userRemoteLinks = userRemoteLinks.filter((link) => link !== item.url);
          } else if (
            /**
             * This is a fallback check if the statement above does not run. If the item's URL is not
             * apart of the list of the user's remote links, the other lists of links that are needed for
             * guest mode (and the font css) are checked to see if they contain the link. If not, the
             * item is removed from cache.
             */
            item.url !== FONT_URL &&
            !guestRemoteLinks.includes(item.url) &&
            !static360Cache.includes(item.url.replace(location.origin, ''))
          ) {
            cache.delete(item);
          }
        });
      });
    })
    .then(() => {
      // Re-caches all guest remote links if online (just in case if that data was removed)
      if (network === 'online') cacheGuestFiles();
      // Makes sure that the user's remote links is reset
      userRemoteLinks = [];
    });
}

/**
 * Saves the response's link by status number in order to have a list of links per
 * HTTP Status Code
 * @param {String} badLink The url of the bad response
 * @param {Number} statusNum The status number of the response
 */
function saveBadResponseUserLink(badLink, statusNum) {
  // If the list for the response's status number is non-existent, the list is created
  if (!badResponseUserFetches[statusNum]) {
    badResponseUserFetches = {
      ...badResponseUserFetches,
      [statusNum]: [badLink],
    };
  }
  // If the list for the response's status number has already been created and doesn't
  // contain the response's link (Prevents duplicated links in the same status)
  else if (
    badResponseUserFetches[statusNum] &&
    !badResponseUserFetches[statusNum].includes(badLink)
  ) {
    badResponseUserFetches = {
      ...badResponseUserFetches,
      [statusNum]: [...badResponseUserFetches[statusNum], badLink],
    };
  }
}

/**
 * Saves the link of a canceled fetch
 * @param {String} link The url of the canceled fetch
 */
function saveCanceledUserLink(link) {
  // Checks to make sure the link is not already in the list to prevent duplicates
  if (!canceledUserFetches.includes(link)) canceledUserFetches.push(link);
}

/**
 * Saves the link of a failed fetch
 * @param {String} link The url of the failed fetch
 */
function saveFailedUserLink(link) {
  // Checks to make sure the link is not already in the list to prevent duplicates
  if (!failedUserFetches.includes(link)) failedUserFetches.push(link);
}

/**
 * Saves the link of a successful fetch
 * @param {String} link The url of the successful fetch
 */
function saveSuccessfulUserLink(link) {
  // Checks to make sure the link is not already in the list to prevent duplicates
  if (!successfulUserFetches.includes(link)) successfulUserFetches.push(link);
}
