"use client";

import { useEffect } from "react";

export default function PWARegister(){

useEffect(()=>{

if("serviceWorker" in navigator){

window.addEventListener("load",()=>{

navigator.serviceWorker.register("/sw.js")
.then(()=>{
console.log("AlphaBot PWA registered");
})
.catch((error)=>{
console.log("PWA registration failed",error);
});

});

}

},[]);


return null;

}
