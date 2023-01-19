// Determines if the any console logs should be made
const showDeveloperConsoleLog = false;
// Console log decorations
const unavailableLog = ['color: #0066ff'].join(';');
const networkEmoji = `\u{1F4E1}`;
const normalLogCentered = ['color: #3498db', 'margin-left: 24px'].join(';');

export function register() {
  /**
   * Checks to see if the Cache and Service Worker API is available. If so, continue with PWA
   * operations. Otherwise, PWA is unavailable.
   */
  if ('caches' in window) {
    // Checking to see if the Service Worker API is available
    // If so, we register our service worker and run all PWA operations
    if (navigator.serviceWorker) {
      // If the new service worker is not up to date with the current worker, it will activate the new
      // service worker as its new current. Otherwise, it will automatically activate the service worker
      navigator.serviceWorker
        .register(
          `${import.meta.env.PUBLIC_URL}/sw.js?API=${encodeURIComponent(
            import.meta.env.VITE_API_URL,
          )}api&FONT=${encodeURIComponent(import.meta.env.VITE_FONT_URL)}`,
        )
        .then((reg) => {
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'activated') {
                localStorage.setItem('network-status', JSON.stringify('online'));
                // After the service worker is activated, a message is sent to start caching files
                navigator.serviceWorker.controller.postMessage({
                  message: 'update-cache-files',
                  token: JSON.parse(localStorage.getItem('token')),
                  termCode: JSON.parse(localStorage.getItem('currentTerm')),
                });
              }
            };
          };
        })
        .catch(console.error);

      /**
       * When a user exists out the app and re-opens it, this will check to see if they are
       * connected to the internet
       */
      // If there's an internet connection: Opens in online mode if the current mode is offline
      if (JSON.parse(localStorage.getItem('network-status')) === 'offline') {
        if (navigator.onLine) {
          navigator.serviceWorker.controller.postMessage('online');
          localStorage.setItem('network-status', JSON.stringify('online'));
          window.postMessage('online', window.location.origin);
        }
      }
      // If there's no internet connection: Opens in offline mode if the current mode is online
      else {
        if (!navigator.onLine) {
          navigator.serviceWorker.controller.postMessage('offline');
          localStorage.setItem('network-status', JSON.stringify('offline'));
          window.postMessage('offline', window.location.origin);
        }
      }

      // If network connectivity disables during application run-time
      window.addEventListener('offline', (event) => {
        if (showDeveloperConsoleLog) {
          console.log(`%c${networkEmoji} NO INTERNET CONNECTION`, normalLogCentered);
        }
        // Due to no network connection, all fetches are canceled and an offline message is sent
        // throughout all components
        navigator.serviceWorker.controller.postMessage('cancel-fetches');
        navigator.serviceWorker.controller.postMessage('offline');
        localStorage.setItem('network-status', JSON.stringify('offline'));
        window.postMessage('offline', window.location.origin);
      });

      // If network connectivity re-enables during application run-time
      window.addEventListener('online', (event) => {
        if (showDeveloperConsoleLog) {
          console.log(`%c${networkEmoji} INTERNET CONNECTION ESTABLISHED`, normalLogCentered);
        }
        // Due to the network coming back online, an attempt is made to cache all files and an
        // online message is sent throughout all components
        localStorage.setItem('network-status', JSON.stringify('online'));
        navigator.serviceWorker.controller.postMessage({
          message: 'update-cache-files',
          token: JSON.parse(localStorage.getItem('token')),
          termCode: JSON.parse(localStorage.getItem('currentTerm')),
        });
        navigator.serviceWorker.controller.postMessage('online');
        window.postMessage('online', window.location.origin);
      });
    } else {
      // Service Worker is not available in the browser
      if (showDeveloperConsoleLog) {
        console.log('%cSERVICE WORKER API IS NOT AVAILABLE: PWA NOT AVAILABLE', unavailableLog);
      }
    }
  } else {
    // Caching is not available in the browser
    if (showDeveloperConsoleLog) {
      console.log('%cCACHE API IS NOT AVAILABLE: PWA NOT AVAILABLE', unavailableLog);
    }
  }
}
