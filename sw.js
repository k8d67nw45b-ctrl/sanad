const V="sanad-v2";
try{
 importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js","firebase-config.js");
 if(self.firebaseConfig&&!self.firebaseConfig.apiKey.startsWith("PASTE")){firebase.initializeApp(self.firebaseConfig);firebase.messaging()}
}catch(e){}
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./","index.html","manifest.json"])).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!="GET"||!e.request.url.startsWith(self.location.origin))return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow("./"))});
