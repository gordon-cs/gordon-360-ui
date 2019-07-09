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
  alert('You are offline. Information might be not up to date.');
  // Saves the network state as offline in local storage
  localStorage.setItem('network-status', JSON.stringify('offline'));
  window.postMessage('online');
  location.reload();
});

// If network connectivity re-enables during application run-time
window.addEventListener('online', () => {
  console.log('--------------------     INTERNET CONNECTION ESTABLISHED     --------------------');
  // Saves the network state as online in local storage
  localStorage.setItem('network-status', JSON.stringify('online'));
  if (confirm("You've reconnected to internet. Would you like to reload this page?")) {
    location.reload();
    window.postMessage('online');
  }
});
