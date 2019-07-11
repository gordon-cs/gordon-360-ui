/* Checking to see if the Cache API is available
*  If so, check to see if the Service Worker API is available
*/
if ('caches' in window) {
  // Checking to see if the Service Worker API is available
  // If so, we register our service worker and run all PWA operations
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);

    // If network connectivity disables during application run-time
    window.addEventListener('offline', event => {
      console.log('--------------------     NO INTERNET CONNECTION     --------------------');
      alert('You are offline. Information might be not up to date.');
      // Saves the network state as offline in local storage
      localStorage.setItem('network-status', JSON.stringify('offline'));
      window.postMessage('offline');
    });

    // If network connectivity re-enables during application run-time
    window.addEventListener('online', () => {
      console.log(
        '--------------------     INTERNET CONNECTION ESTABLISHED     --------------------',
      );
      // Saves the network state as online in local storage
      localStorage.setItem('network-status', JSON.stringify('online'));
      window.postMessage('online');
    });

    /* When a user exists out the app and re-opens it, this will check to see if they are
    *  connected to the internet so that:
    *     - If there's internet: Open in online mode if the current mode is offline
    *     - If there's no internet: Open in offline mode if the current mode is online
    */
    if (JSON.parse(localStorage.getItem('network-status')) === 'offline') {
      if (navigator.onLine) {
        localStorage.setItem('network-status', JSON.stringify('online'));
        location.reload();
      }
    } else {
      if (!navigator.onLine) {
        localStorage.setItem('network-status', JSON.stringify('offline'));
        location.reload();
        alert('You are offline. Information might be not up to date.');
      }
    }
  } else {
    console.log('SERVICE WORKER API IS NOT AVAILABLE: PWA NOT AVAILABLE');
  }
} else {
  console.log('CACHE API IS NOT AVAILABLE: PWA NOT AVAILABLE');
}
