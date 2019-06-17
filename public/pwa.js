// INSTALLING SERVICE WORKER
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}
