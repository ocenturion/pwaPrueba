;
const CACHE_NAME='v1_cache_prueba',
urlToCache=[
'./',
'index.html',
'script.js',
'serviceworkers.js',
'manifest.json',
'img'
]



self.addEventListener('install', e=>{
	e.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache=>{
			return cache.addAll(urlToCache)
			.then(()=> self.skipWaiting())
		})
		.catch(err=> console.log('Fallo registro cache',err))
	)
	console.log("dentro del install");
})
self.addEventListener('activate', e=>{
	const cacheWhitelist=[CACHE_NAME]
	
	e.waitUntil(
		caches.keys()
		.then(cacheNames=>{
			return Promise.all(
				cacheNames.map(cacheName=>{
					if(cacheWhitelist.indexOf(cacheName)===-1){
						return caches.delete(cacheName)
					}
				})
			)
		})
		.then(()=>self.clients.claim())
	)
	console.log("dentro del activate");
})
self.addEventListener('fetch', e=>{
	e.respondWith(
		caches.match(e.request)
		.then(res=>{
			if(res){
				return res
			}
			return fetch(e.request)
		})
	)
	console.log("dentro del fetch");
})
let deferredPrompt;


// pregunta instalar la app?

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});