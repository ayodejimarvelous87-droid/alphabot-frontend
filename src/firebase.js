import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATICtGgw8c2N_5e1LpQmvSrUutVDY1Zzs",
  authDomain: "alphabot-7f397.firebaseapp.com",
  projectId: "alphabot-7f397",
  storageBucket: "alphabot-7f397.firebasestorage.app",
  messagingSenderId: "386543041470",
  appId: "1:386543041470:web:82f5d535efc46f8f6e17ef"
};

const app = initializeApp(firebaseConfig);

export default app;


export const getFirebaseMessaging = async()=>{

  if(
    typeof window === "undefined" ||
    !("serviceWorker" in navigator)
  ){
    return null;
  }

  try{

    const {
      getMessaging
    } = await import("firebase/messaging");

    return getMessaging(app);

  }catch(error){

    console.log(
      "Firebase messaging unavailable:",
      error.message
    );

    return null;
  }

};


export const requestNotificationPermission = async()=>{

  const messaging = await getFirebaseMessaging();

  if(!messaging){
    return null;
  }

  const permission =
    await Notification.requestPermission();

  console.log("🔔 Notification permission:", permission);


  if(permission !== "granted"){
    return null;
  }


  const {
    getToken
  } = await import("firebase/messaging");


  const registration =
    await navigator.serviceWorker.register("/sw.js");

  await navigator.serviceWorker.ready;

  console.log("🔔 Getting Firebase token...");

  const token = await getToken(
    messaging,
    {
      vapidKey:
      "BOjqXybfZjY6sV2EtJPbfu-ZVuBbp7UvMrqIfMdxWNdkgHRO3bKhk-sLsHZmj67LXABJdZGs_gyUM_0_b66FSe8",
      serviceWorkerRegistration: registration
    }
  );

  console.log(
    "🔔 Firebase token result:",
    token ? token.slice(0, 20) + "..." : "NO TOKEN"
  );

  return token;

};


export const listenForMessages = async()=>{

  const messaging = await getFirebaseMessaging();

  if(!messaging){
    return;
  }

  const {
    onMessage
  } = await import("firebase/messaging");

  onMessage(messaging,(payload)=>{

    console.log(
      "Firebase notification:",
      payload
    );

    const title =
      payload.notification?.title ||
      payload.data?.title ||
      "AlphaBot";

    const body =
      payload.notification?.body ||
      payload.data?.body ||
      "";

    if(
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "granted"
    ){

      new Notification(title,{
        body,
        icon:"/icon-192.png",
        badge:"/icon-192.png"
      });

    }

  });

};
