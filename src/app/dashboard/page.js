"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { requestNotificationPermission, listenForMessages } from "@/firebase";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";
import { useTheme } from "@/components/ThemeProvider";

export default function Dashboard(){

const [user,setUser]=useState(null);
const [toast,setToast]=useState("");
const [loading,setLoading]=useState(true);
const [dashboardReady,setDashboardReady]=useState(false);
const [showProfileHint,setShowProfileHint]=useState(true);

useEffect(()=>{

  const dashboardReadyTimer=setTimeout(()=>{
    setDashboardReady(true);
  },120);

  return ()=>clearTimeout(dashboardReadyTimer);

},[]);

const [liveStatus,setLiveStatus]=useState("Checking your account…");
const [statusTyping,setStatusTyping]=useState(false);
const [balance,setBalance]=useState(0);
const [showBalance,setShowBalance]=useState(()=>{
return localStorage.getItem("showBalance") !== "false";
});
useEffect(()=>{
localStorage.setItem("showBalance", showBalance);
},[showBalance]);

const [transactionCount,setTransactionCount]=useState(0);
const [totalSpent,setTotalSpent]=useState(0);
const [referralEarnings,setReferralEarnings]=useState(0);
const [totalReferrals,setTotalReferrals]=useState(0);

const [coinSettings,setCoinSettings]=useState({
  target:1000,
  reward:200
});
const [notifications,setNotifications]=useState([]);
const [unreadCount,setUnreadCount]=useState(0);
const [eventData,setEventData]=useState(null);

const [lastViewedEvent,setLastViewedEvent]=useState(()=>{
  return localStorage.getItem("alphabotLastViewedEvent") || "";
});

const {dark,toggleTheme}=useTheme();

useEffect(()=>{

  const hideProfileHintTimer=setTimeout(()=>{
    setShowProfileHint(false);
  },3000);

  return ()=>clearTimeout(hideProfileHintTimer);

},[]);


useEffect(()=>{

  const statuses=[
    "Checking your account…",
    "Services are ready ⚡",
    "Your wallet is up to date",
    "Everything looks good ✓"
  ];

  let index=0;

  const liveStatusTimer=setInterval(()=>{

    setStatusTyping(true);

    setTimeout(()=>{

      index=(index+1)%statuses.length;

      setLiveStatus(statuses[index]);
      setStatusTyping(false);

    },450);

  },3500);

  return ()=>clearInterval(liveStatusTimer);

},[]);


useEffect(()=>{
  const timer=setTimeout(()=>{
    setShowProfileHint(false);
  },3000);

  return ()=>clearTimeout(timer);
},[]);


useEffect(()=>{

const token=localStorage.getItem("token");
const saved=localStorage.getItem("user");


if(!token){

window.location.href="/login";
return;

}


if(saved){

const data=JSON.parse(saved);

setUser(data);

fetch(`https://api.alphabothq.com/users/profile/${data.phone}`,{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(async(profile)=>{
if(profile && !profile.message){
setUser(profile);
localStorage.setItem("user",JSON.stringify(profile));

await listenForMessages();

const fcmToken = await requestNotificationPermission();

if(fcmToken){

await fetch(
"https://api.alphabothq.com/notifications/register-token",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+token
},
body:JSON.stringify({
token:fcmToken,
phone:profile.phone
})
}
);

}

}
});




fetch(
`https://api.alphabothq.com/referrals/${data.phone}`
)
.then(res=>res.json())
.then(referralData=>{

if(referralData && referralData.totalReferrals !== undefined){

setTotalReferrals(
Number(referralData.totalReferrals) || 0
);

}

})
.catch(()=>{
  // Keep dashboard stable if referral service is temporarily unavailable.
});


fetch(
`https://api.alphabothq.com/wallet/balance/${data.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(wallet=>{

if(wallet.balance !== undefined){

setBalance(wallet.balance);

}

})
.catch(()=>{
setToast("Unable to load wallet balance");
});



fetch(
`https://api.alphabothq.com/transactions/${data.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(list=>{

if(Array.isArray(list)){

setTransactionCount(list.length);

setTotalSpent(
list.reduce((sum,item)=>sum + Number(item.amount || 0),0)
);


}

})
.catch(()=>{
setToast("Unable to load transaction summary");
});



fetch(
  "https://api.alphabothq.com/settings",
  {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
)
.then(res=>res.json())
.then(settings=>{

  if(settings && !settings.message){

    setCoinSettings({
      target:Number(
        settings.abCoinsRedemptionTarget ?? 1000
      ),
      reward:Number(
        settings.abCoinsRedemptionReward ?? 200
      )
    });

  }

})
.catch(()=>{
  setToast("Unable to load AB Coin settings");
});


fetch(
`https://api.alphabothq.com/referral-earnings/${data.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(ref=>{

if(ref.totalEarnings !== undefined){

setReferralEarnings(ref.totalEarnings);

}

})
.catch(()=>{
setToast("Unable to load referral earnings");
});



fetch(
`https://api.alphabothq.com/notifications/${data.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(list=>{

if(Array.isArray(list)){

setNotifications(list.slice(0,3));

setUnreadCount(
list.filter(item=>!item.read).length
);


}

setLoading(false);

})
.catch(()=>{
setToast("Unable to load notifications");
  setLoading(false);
});


}


},[]);




useEffect(()=>{

const updateNotifications = () => {

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if(!user || !token) return;

fetch(`https://api.alphabothq.com/notifications/${user.phone}`,{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(list=>{

if(Array.isArray(list)){

setNotifications(list.slice(0,3));

setUnreadCount(
list.filter(item=>!item.read).length
);

}

});

};

window.addEventListener("focus", updateNotifications);

document.addEventListener("visibilitychange", ()=>{
if(document.visibilityState === "visible"){
updateNotifications();
}
});

return ()=>{
window.removeEventListener("focus", updateNotifications);
};

},[]);


useEffect(()=>{

const loadCurrentEvent = async () => {

try {

const res = await fetch(
"https://api.alphabothq.com/events",
{
  cache:"no-store"
}
);

const data = await res.json();

if(!res.ok){
throw new Error(
data?.message || "Failed to load events"
);
}

setEventData(
Array.isArray(data) && data.length > 0
? data[0]
: null
);

} catch(err) {

console.error("Failed to load dashboard event:",err);

setEventData(null);

}

};

loadCurrentEvent();

const interval = setInterval(
loadCurrentEvent,
30000
);

return ()=>clearInterval(interval);

},[]);


useEffect(()=>{
if(toast){
const timer=setTimeout(()=>{
setToast("");
},3000);

return ()=>clearTimeout(timer);
}
},[toast]);

const getGreeting = () => {

const hour = new Date().getHours();

if(hour < 12){
return "Good morning 👋";
}

if(hour < 18){
return "Good afternoon 👋";
}

return "Good evening 👋";

};


const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

};








const currentEvent = eventData
  ? {
      id: eventData._id,
      icon: eventData.icon || "🎉",
      label: "SERVICE ACTIVITY",
      title: eventData.title,
      description: eventData.description,
      reward: eventData.reward || "",
      first: {
        name: eventData.leaderboard?.[0]?.username || "—",
        points: eventData.leaderboard?.[0]?.points || 0
      },
      second: {
        name: eventData.leaderboard?.[1]?.username || "—",
        points: eventData.leaderboard?.[1]?.points || 0
      },
      endsAt: eventData.endsAt || null,
      unread: lastViewedEvent !== eventData._id
    }
  : null;



const openEvents = () => {

  if(!currentEvent){
    window.location.href="/events";
    return;
  }

  localStorage.setItem(
    "alphabotLastViewedEvent",
    currentEvent.id
  );

  setLastViewedEvent(currentEvent.id);

  window.location.href="/events";

};


  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white flex items-center justify-center px-6 overflow-hidden">
        <div className="w-full max-w-sm flex flex-col items-center text-center">

          <div className="relative w-28 h-28 flex items-center justify-center mb-8">

            <div className="absolute inset-0 rounded-[32px] border-2 border-yellow-400/20 border-t-yellow-400 animate-spin" />

            <div className="absolute inset-3 rounded-[26px] bg-yellow-400/10 blur-xl animate-pulse" />

            <div className="relative w-[72px] h-[72px] rounded-[24px] bg-yellow-400 flex items-center justify-center shadow-[0_0_45px_rgba(250,204,21,0.25)]">
              <div className="grid grid-cols-2 gap-[5px]">
                <span className="w-[9px] h-[9px] rounded-[3px] bg-black" />
                <span className="w-[9px] h-[9px] rounded-[3px] bg-black" />
                <span className="w-[9px] h-[9px] rounded-[3px] bg-black" />
                <span className="w-[9px] h-[9px] rounded-[3px] bg-black" />
              </div>
            </div>

          </div>

          <h1 className="text-2xl font-black tracking-tight">
            Alpha<span className="text-yellow-400">Bot</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Preparing your dashboard...
          </p>

          <div className="relative mt-8 w-48 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-yellow-400 animate-[loadingSlide_1.2s_ease-in-out_infinite]" />
          </div>

          <div className="flex items-center gap-1.5 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce" />
          </div>

        </div>

        <style jsx>{`
          @keyframes dashboardEntrance {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes profileHint {
  0% {
    opacity: 0;
    transform: translateX(-8px) scale(0.96);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes loadingSlide {
            0% {
              transform: translateX(-120%);
            }
            50% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(220%);
            }
          }
        `}</style>

      </main>
    );
  }
return(

<main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white px-4 py-4 pb-24 overflow-x-hidden">

<Toast message={toast} type="error" />




{/* MEGAZORD HEADER */}

<header className="relative flex justify-between items-center">

<div className="flex items-center gap-3">

<Link
  href="/profile"
  aria-label="Open Profile"
  className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-400/20 border-2 border-white/80 dark:border-zinc-900 hover:scale-105 active:scale-90 transition-all duration-200"
>
  <span className="text-lg font-black text-black">
    {(user?.name || "User").trim().charAt(0).toUpperCase()}
  </span>
</Link>

  {showProfileHint && (
    <div className="absolute left-16 top-1 z-40 animate-[profileHint_0.45s_ease-out]">
      <div className="relative rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black px-3 py-2 shadow-xl border border-zinc-800 dark:border-zinc-200">
        <p className="text-[10px] font-black whitespace-nowrap">
          Your Profile 👤
        </p>
        <p className="text-[9px] opacity-60 whitespace-nowrap">
          Tap here to view your account
        </p>
        <div className="absolute left-[-5px] top-4 w-2.5 h-2.5 rotate-45 bg-zinc-900 dark:bg-white border-l border-b border-zinc-800 dark:border-zinc-200" />
      </div>
    </div>
  )}


<div>

<p className="text-xs text-zinc-600 dark:text-zinc-500">
{getGreeting()}
</p>


<h1 className="text-lg font-bold">
{user?.name || "User"}
</h1>

<div className="flex items-center gap-1.5 mt-0.5 min-h-[14px]">

  <span className="relative flex h-1.5 w-1.5 shrink-0">
    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
  </span>

  <p className={`text-[9px] text-zinc-500 dark:text-zinc-400 transition-all duration-300 ${
    statusTyping
      ? "opacity-40 translate-x-1"
      : "opacity-100 translate-x-0"
  }`}>
    {liveStatus}
  </p>

  <span className="text-[8px] text-zinc-400 dark:text-zinc-600 whitespace-nowrap">
    • just now
  </span>

</div>

</div>

</div>



<div className="flex gap-2">


<Link
href="/transactions"
className="bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-white hover:scale-105 active:scale-95 transition"
>
💳
</Link>



<Link
href="/notifications"
className="relative bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-white hover:scale-105 active:scale-95 transition"
>

🔔

{unreadCount > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 font-bold">
{unreadCount}
</span>
)}

</Link>



<button
onClick={toggleTheme}
className="bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-white active:scale-95 transition"
>
{dark ? "☀️" : "🌙"}
</button>


</div>


</header>



{/* WALLET HUB */}

<section className="mt-5 relative overflow-hidden bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-xl shadow-black/10 dark:shadow-black/20">

  <div className="absolute -right-16 -top-16 w-44 h-44 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none" />

  <div className="relative">

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2.5">

        <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/10">
          <span className="text-lg">💳</span>
        </div>

        <div>
          <p className="text-[10px] font-black tracking-wider text-yellow-400 uppercase">
            AlphaBot Wallet
          </p>

          <p className="text-[9px] text-zinc-500 mt-0.5">
            Available balance
          </p>
        </div>

      </div>

      <div className="flex items-center gap-1.5">

        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </span>

        <span className="text-[9px] text-zinc-500">
          Wallet active
        </span>

      </div>

    </div>


    <div className="flex items-center justify-between gap-3 mt-5">

      <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white truncate">
        {showBalance ? `₦${balance.toLocaleString()}` : "₦••••••"}
      </h2>

      <button
        onClick={()=>setShowBalance(!showBalance)}
        aria-label={showBalance ? "Hide balance" : "Show balance"}
        className="shrink-0 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 active:scale-95 transition"
      >
        {showBalance ? "Hide" : "Show"}
      </button>

    </div>


    <div className="grid grid-cols-2 gap-2.5 mt-5">

      <Link
        href="/wallet"
        className="flex items-center justify-center gap-2 bg-yellow-400 text-black py-3 rounded-xl text-xs font-black active:scale-[0.97] transition"
      >
        <span>＋</span>
        Fund Wallet
      </Link>

      <Link
        href="/data"
        className="flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white py-3 rounded-xl text-xs font-bold active:scale-[0.97] transition"
      >
        <span>🌐</span>
        Data
      </Link>

    </div>


    <div className="flex items-center justify-center gap-2 mt-3">

      <span className="text-[9px] text-zinc-600">
        Secure wallet
      </span>

      <span className="w-1 h-1 rounded-full bg-zinc-700" />

      <span className="text-[9px] text-zinc-600">
        Instant payments
      </span>

    </div>

  </div>

</section>

{/* ALPHABOT COINS */}

<section className="mt-3 relative overflow-hidden bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-lg">

<div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none"/>

<div className="flex items-center justify-between relative">

<div className="flex items-center gap-3">

<div className="w-11 h-11 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/10">
<span className="text-xl">
🪙
</span>
</div>

<div>

<p className="text-xs text-yellow-400 font-bold">
AB COINS
</p>

<p className="text-sm font-bold mt-1 text-zinc-950 dark:text-white">
{Number(user?.abCoins || 0).toLocaleString()} / {coinSettings.target.toLocaleString()}
</p>

</div>

</div>

<Link
href="/coins"
className="text-xs bg-zinc-950 dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl font-bold active:scale-95 transition"
>
View
</Link>

</div>

<div className="mt-4">

<div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">

<div
className="h-full bg-yellow-400 rounded-full transition-all"
style={{
width:`${Math.min(
(Number(user?.abCoins || 0) / coinSettings.target) * 100,
100
)}%`
}}
/>

</div>

<p className="text-[10px] text-zinc-500 mt-2">
{coinSettings.target.toLocaleString()} AB Coins = ₦{coinSettings.reward.toLocaleString()} wallet credit
</p>

</div>

</section>


  {/* ALPHABOT EVENT */}

  {currentEvent && (
    <section className="mt-3">

      <button
        onClick={openEvents}
        className="w-full text-left relative overflow-hidden bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 active:scale-[0.99] transition-transform"
      >

        <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-400/10 blur-3xl rounded-full pointer-events-none"/>

        <div className="relative flex items-center gap-3">

          <div className="w-10 h-10 shrink-0 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-lg">
            {currentEvent.icon || "🏆"}
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex items-center gap-2">
              <p className="text-[9px] font-black tracking-[0.16em] text-yellow-500 uppercase">
                ALPHABOT EVENT
              </p>

              {currentEvent.unread && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"/>
              )}
            </div>

            <h2 className="text-sm font-black truncate mt-0.5">
              {currentEvent.title}
            </h2>

            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
              {currentEvent.reward || currentEvent.description || "Tap to view event"}
            </p>

          </div>

          <div className="shrink-0 w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-sm">
            →
          </div>

        </div>

      </button>

    </section>
  )}

{/* COMPETITIONS */}

  {/* COMPETITIONS */}

  <section className="mt-3">

    <Link
      href="/competitions"
      className="group flex items-center gap-3 w-full bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 active:scale-[0.99] transition-transform"
    >

      <div className="w-9 h-9 shrink-0 rounded-xl bg-yellow-400 text-black flex items-center justify-center text-lg">
        🏆
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-center gap-2">
          <p className="text-[9px] font-black tracking-[0.16em] text-yellow-500 uppercase">
            ALPHABOT
          </p>

          <span className="text-[8px] text-zinc-500">
            LIVE
          </span>
        </div>

        <h2 className="text-xs font-black mt-0.5">
          Competitions
        </h2>

      </div>

      <div className="shrink-0 w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-sm group-active:translate-x-0.5 transition-transform">
        →
      </div>

    </Link>

  </section>


  {/* YOUR OVERVIEW */}

  <section className="mt-4">

    <div className="flex items-center justify-between mb-2.5">

      <div>
        <p className="text-[9px] font-black tracking-[0.18em] text-yellow-500 uppercase">
          YOUR ACTIVITY
        </p>

        <h2 className="text-sm font-black mt-0.5">
          Your Overview
        </h2>
      </div>

      <Link
        href="/transactions"
        className="text-[10px] font-bold text-yellow-500 active:opacity-60"
      >
        View all →
      </Link>

    </div>


    <div className="grid grid-cols-3 gap-2">

      <div className="min-w-0 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3">

        <span className="text-sm">🧾</span>

        <p className="text-[9px] text-zinc-500 uppercase font-bold mt-2">
          Transactions
        </p>

        <p className="text-base font-black mt-0.5 truncate">
          {Number(transactionCount || 0).toLocaleString()}
        </p>

      </div>


      <div className="min-w-0 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3">

        <span className="text-sm">💰</span>

        <p className="text-[9px] text-zinc-500 uppercase font-bold mt-2">
          Spent
        </p>

        <p className="text-sm font-black text-yellow-500 mt-0.5 truncate">
          ₦{Number(totalSpent || 0).toLocaleString()}
        </p>

      </div>


      <div className="min-w-0 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3">

        <span className="text-sm">👥</span>

        <p className="text-[9px] text-zinc-500 uppercase font-bold mt-2">
          Referrals
        </p>

        <p className="text-sm font-black text-yellow-500 mt-0.5 truncate">
          {Number(totalReferrals || 0).toLocaleString()}
        </p>

      </div>

    </div>

  </section>


{/* FLOATING AI SUPPORT */}

  <Link
  href="/ai"
  aria-label="Open AlphaBot AI Support"
  className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-2xl border border-yellow-300 active:scale-90 hover:scale-105 transition-transform duration-150"
  >
    <span className="text-2xl">
      💬
    </span>
  </Link>


<BottomNav />


</main>

);

}
