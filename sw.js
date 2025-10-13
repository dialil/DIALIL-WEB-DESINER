// =========================
// SERVICE WORKER - CACHE
// =========================

const CACHE_NAME = 'dialil-dev-v1.0.0';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/assets/images/logo.jpg',
  '/assets/images/photo-coding.jpg',
  '/assets/images/projet-netflix.jpg',
  '/assets/images/projet-poulet.jpg',
  '/assets/images/logo-tuifoot2026.jpg',
  '/manifest.json',
  '/sitemap.xml',
  '/robots.txt'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(CACHE_URLS);
      })
      .catch(error => {
        console.log('Erreur lors de l\'ajout au cache:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner la réponse du cache si disponible
        if (response) {
          return response;
        }
        
        // Sinon, faire la requête réseau
        return fetch(event.request).then(response => {
          // Vérifier si la réponse est valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Cloner la réponse pour le cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(error => {
        console.log('Erreur de fetch:', error);
        // Retourner une page d'erreur personnalisée si nécessaire
        return new Response('Erreur de connexion', {
          status: 404,
          statusText: 'Not Found'
        });
      })
  );
});

// Gestion des messages
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Gestion des notifications push (pour usage futur)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle notification',
    icon: '/assets/images/logo.jpg',
    badge: '/assets/images/logo.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Voir le site',
        icon: '/assets/images/logo.jpg'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/assets/images/logo.jpg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Dialil Dev', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});