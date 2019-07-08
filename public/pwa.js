// Checking to see if the Cache API is available
// If so, check to see if the Service Worker API is available
if ('caches' in window) {
  // Checking to see if the Service Worker API is available
  // If so, we register our service worker
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  } else {
    console.log('SERVICE WORKER API IS NOT AVAILABLE: PWA NOT AVAILABLE');
  }
} else {
  console.log('CACHE API IS NOT AVAILABLE: PWA NOT AVAILABLE');
}

// If network connectivity disables during application run-time
window.addEventListener('offline', event => {
  console.log('--------------------     NO INTERNET CONNECTION     --------------------');
  window.postMessage('offline');
  event.waitUntil(alert('You are offline. Information might be not up to date.'));
  location.reload();
});

// If network connectivity re-enables during application run-time
window.addEventListener('online', () => {
  console.log('--------------------     INTERNET CONNECTION ESTABLISHED     --------------------');
  //handleConnection();
  if (confirm("You've reconnected to internet. Would you like to reload this page?")) {
    location.reload();
    window.postMessage('online');
  }
});
