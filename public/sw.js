importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyATICtGgw8c2N_5e1LpQmvSrUutVDY1Zzs",
  authDomain: "alphabot-7f397.firebaseapp.com",
  projectId: "alphabot-7f397",
  storageBucket: "alphabot-7f397.firebasestorage.app",
  messagingSenderId: "386543041470",
  appId: "1:386543041470:web:82f5d535efc46f8f6e17ef"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[AlphaBot SW] Background message:", payload);

  const title =
    payload.notification?.title ||
    payload.data?.title ||
    "AlphaBot";

  const body =
    payload.notification?.body ||
    payload.data?.body ||
    "";

  self.registration.showNotification(title, {
    body,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: {
      url: "/dashboard"
    }
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {

      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate("/dashboard");
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow("/dashboard");
      }

    })
  );
});

self.addEventListener("install", (event) => {
  console.log("AlphaBot PWA installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("AlphaBot PWA activated");

  event.waitUntil(
    self.clients.claim()
  );
});

self.addEventListener("fetch", (event) => {
});
