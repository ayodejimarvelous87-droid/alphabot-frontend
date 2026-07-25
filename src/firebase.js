import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyATICtGgw8c2N_5e1LpQmvSrUutVDY1Zzs",
  authDomain: "alphabot-7f397.firebaseapp.com",
  projectId: "alphabot-7f397",
  storageBucket: "alphabot-7f397.firebasestorage.app",
  messagingSenderId: "386543041470",
  appId: "1:386543041470:web:82f5d535efc46f8f6e17ef"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {

  const permission = await Notification.requestPermission();

  if(permission !== "granted"){
    return null;
  }

  const token = await getToken(messaging, {
    vapidKey: "BOjqXybfZjY6vS2EtJPbfu-ZVuBbp7UvMrqIfMdxWNdkgHRO3bKhk-sLsHZmj67LXABJdZGs_gyUM_0_b66FSe8"
  });

  return token;

};

onMessage(messaging, (payload)=>{

  console.log("Firebase notification:", payload);

});
