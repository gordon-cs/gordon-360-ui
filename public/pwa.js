// INSTALLING SERVICE WORKER
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}

// CHECKS TO SEE IF THE NETWORK IS AVAILABLE
// If the internet cuts off during application
window.addEventListener('offline', () => {
  console.log('------------------------     NO INTERNET CONNECTION     ------------------------');
  alert('You are offline. Information might be not up to date.');
});

// If there is internet comes back during application
window.addEventListener('online', () => {
  console.log(
    '------------------------     INTERNET CONNECTION ESTABLISHED     ------------------------',
  );
  if (confirm("You've reconnected to internet. Would you like to reload this page?")) {
    location.reload();
  }
});

if (navigator.online === false) {
  console.log('------------------------     NO INTERNET CONNECTION     ------------------------');
  alert('You are in OFFLINE MODE. Information might be not up to date.');
}
