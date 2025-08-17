const CACHE_NAME = 'sonic-flow-v1';
const urlsToCache = [
  '/',
  '/dashboard',
  '/static/js/bundle.js', // Example asset
  '/static/css/main.css', // Example asset
  // Add other critical assets here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Cache-first para assets estáticos, network-first para datos dinámicos
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    // Network first para APIs
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache
          return caches.match(event.request);
        })
    );
  } else {
    // Cache first para recursos estáticos
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});

// Background sync para clicks offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-clicks') {
    event.waitUntil(syncOfflineClicks());
  }
});

// Placeholder function to get offline clicks from storage (e.g., IndexedDB)
async function getOfflineClicks() {
    console.log('Getting offline clicks (placeholder)');
    // Implement logic to retrieve offline clicks from storage
    return []; // Return empty array for now
}

// Placeholder function to clear offline clicks from storage
async function clearOfflineClicks() {
     console.log('Clearing offline clicks (placeholder)');
    // Implement logic to clear offline clicks from storage
}

async function syncOfflineClicks() {
  try {
    const offlineClicks = await getOfflineClicks();
    if (offlineClicks.length > 0) {
      // Assuming you have an API endpoint to handle syncing offline clicks
      const response = await fetch('/api/sync-clicks', {
        method: 'POST',
        body: JSON.stringify({ clicks: offlineClicks }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
          throw new Error(`Failed to sync offline clicks: ${response.status}`);
      }

      await clearOfflineClicks();
      console.log('Offline clicks synced successfully');

    } else {
        console.log('No offline clicks to sync');
    }
  } catch (error) {
    console.error('Background sync failed:', error);
    // Implement retry mechanism or error logging if needed
  }
}