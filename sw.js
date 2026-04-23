/* sw.js — ArchiveStoreApps
   Intercepta todas las peticiones de archivos .html y .json
   y las fuerza a ir al servidor real, sin caché del CDN de GitHub Pages.
*/
const VERSION = 'asa-sw-v2';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Solo interceptar HTML y JSON del mismo dominio (GitHub Pages)
  const isHtml = url.endsWith('.html') || url.includes('.html?');
  const isJson = url.endsWith('.json') || url.includes('.json?');

  if (isHtml || isJson) {
    event.respondWith(
      fetch(event.request, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }).catch(() => fetch(event.request))
    );
  }
  // Todo lo demás (imágenes, fuentes, etc.) va normal
});
