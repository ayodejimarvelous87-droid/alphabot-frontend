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
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body
    }
  );
});
