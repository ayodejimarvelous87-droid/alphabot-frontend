"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { requestNotificationPermission } from "@/firebase";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";
import { useTheme } from "@/components/ThemeProvider";
import { getCached, setCached } from "@/lib/cache";

export default function Dashboard(){

const [user,setUser]=useState(null);
const [toast,setToast]=useState("");
const [loading,setLoading]=useState(true);
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
const [notifications,setNotifications]=useState([]);
const [unreadCount,setUnreadCount]=useState(0);

const {dark,toggleTheme}=useTheme();


useEffect(()=>{

const token=localStorage.getItem("token");
const saved=localStorage.getItem("user");

if(!token){

window.location.href="/login";
return;

}

if(!saved){
setLoading(false);
return;
}

const data=JSON.parse(saved);

setUser(data);

const profileKey=`dashboard_profile_${data.phone}`;
const balanceKey=`dashboard_balance_${data.phone}`;
const transactionsKey=`dashboard_transactions_${data.phone}`;
const referralKey=`dashboard_referral_${data.phone}`;
const notificationsKey=`dashboard_notifications_${data.phone}`;

const cachedProfile=getCached(profileKey);
const cachedBalance=getCached(balanceKey);
const cachedTransactions=getCached(transactionsKey);
const cachedReferral=getCached(referralKey);
const cachedNotifications=getCached(notificationsKey);

if(cachedProfile){
setUser(cachedProfile);
}

if(cachedBalance !== null && cachedBalance !== undefined){
setBalance(cachedBalance);
}

if(Array.isArray(cachedTransactions)){

setTransactionCount(cachedTransactions.length);

setTotalSpent(
cachedTransactions.reduce(
(sum,item)=>sum + Number(item.amount || 0),
0
)
);

}

if(cachedReferral?.totalEarnings !== undefined){
setReferralEarnings(cachedReferral.totalEarnings);
}

if(Array.isArray(cachedNotifications)){

setNotifications(cachedNotifications.slice(0,3));

setUnreadCount(
cachedNotifications.filter(item=>!item.read).length
);

}

setLoading(false);

const headers={
Authorization:`Bearer ${token}`
};

const loadFreshData=async()=>{

const requests=await Promise.allSettled([

fetch(
`https://alphabot-1.onrender.com/users/profile/${data.phone}`,
{headers}
),

fetch(
`https://alphabot-1.onrender.com/wallet/balance/${data.phone}`,
{headers}
),

fetch(
`https://alphabot-1.onrender.com/transactions/${data.phone}`,
{headers}
),

fetch(
`https://alphabot-1.onrender.com/referral-earnings/${data.phone}`,
{headers}
),

fetch(
`https://alphabot-1.onrender.com/notifications/${data.phone}`,
{headers}
)

]);

const [profileRes,balanceRes,transactionsRes,referralRes,notificationsRes]=requests;

if(profileRes.status==="fulfilled" && profileRes.value.ok){

const profile=await profileRes.value.json();

if(profile && !profile.message){

setUser(profile);

setCached(profileKey,profile);

localStorage.setItem("user",JSON.stringify(profile));

}

}

if(balanceRes.status==="fulfilled" && balanceRes.value.ok){

const wallet=await balanceRes.value.json();

if(wallet.balance !== undefined){

setBalance(wallet.balance);

setCached(balanceKey,wallet.balance);

}

}

if(transactionsRes.status==="fulfilled" && transactionsRes.value.ok){

const list=await transactionsRes.value.json();

if(Array.isArray(list)){

setTransactionCount(list.length);

setTotalSpent(
list.reduce(
(sum,item)=>sum + Number(item.amount || 0),
0
)
);

setCached(transactionsKey,list);

}

}

if(referralRes.status==="fulfilled" && referralRes.value.ok){

const ref=await referralRes.value.json();

if(ref.totalEarnings !== undefined){

setReferralEarnings(ref.totalEarnings);

setCached(referralKey,ref);

}

}

if(notificationsRes.status==="fulfilled" && notificationsRes.value.ok){

const list=await notificationsRes.value.json();

if(Array.isArray(list)){

setNotifications(list.slice(0,3));

setUnreadCount(
list.filter(item=>!item.read).length
);

setCached(notificationsKey,list);

}

}

};

loadFreshData();

const registerNotifications=async()=>{

try{

const fcmToken=await requestNotificationPermission();

if(!fcmToken)return;

await fetch(
"https://alphabot-1.onrender.com/notifications/register-token",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+token
},
body:JSON.stringify({
token:fcmToken,
phone:data.phone
})
}
);

}catch(error){

console.log("Notification registration skipped:",error.message);

}

};

registerNotifications();

},[]);


useEffect(()=>{

const updateNotifications = () => {

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if(!user || !token) return;

fetch(`https://alphabot-1.onrender.com/notifications/${user.phone}`,{
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



const services=[

["📱","Airtime","/airtime"],
["🌐","Data","/data"],
["⚡","Electricity","/electricity"],
["📺","TV","/tv"],
["💵","Airtime Cash","/airtime-cash"],
["🤖","AI Assistant","/ai"],
["👥","Beneficiary","/beneficiary"],
["🔁","Recurring","/recurring"],
["🎮","Betting","/betting"],
["🎓","Exam PIN","/exam-pin"],
["💳","ePIN","/recharge-pin"],
["🏆","Arena+","/arena"],
["💬","Support","/support"],

];






if(loading){
return(
<main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white px-4 py-4 pb-24 overflow-x-hidden">
<div className="max-w-md mx-auto animate-pulse">
<div className="h-6 w-32 bg-zinc-300 dark:bg-zinc-800 rounded mb-4"></div>
<div className="h-10 w-48 bg-zinc-300 dark:bg-zinc-800 rounded mb-8"></div>
<div className="h-40 bg-zinc-300 dark:bg-zinc-800 rounded-3xl"></div>
<div className="grid grid-cols-4 gap-3 mt-6">
<div className="h-20 bg-zinc-300 dark:bg-zinc-800 rounded-2xl"></div>
<div className="h-20 bg-zinc-300 dark:bg-zinc-800 rounded-2xl"></div>
<div className="h-20 bg-zinc-300 dark:bg-zinc-800 rounded-2xl"></div>
<div className="h-20 bg-zinc-300 dark:bg-zinc-800 rounded-2xl"></div>
</div>
</div>
</main>
);
}

return(

<main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white px-4 py-4 pb-24 overflow-x-hidden">

<Toast message={toast} type="error" />




{/* MEGAZORD HEADER */}

<header className="flex justify-between items-center">

<div className="flex items-center gap-3">

<div className="w-11 h-11 rounded-full bg-gradient-to-br from-white to-zinc-300 flex items-center justify-center shadow-xl shadow-white/10">

<span className="text-xl font-black text-black">
A
</span>

</div>


<div>

<p className="text-xs text-zinc-600 dark:text-zinc-500">
{getGreeting()}
</p>


<h1 className="text-lg font-bold">
{user?.name || "User"}
</h1>

</div>

</div>



<div className="flex gap-2">


<Link
href="/transactions"
className="bg-[#1A1A1E] border border-zinc-800 rounded-xl p-3 hover:scale-105 active:scale-95 transition"
>
💳
</Link>



<Link
href="/notifications"
className="relative bg-[#1A1A1E] border border-zinc-800 rounded-xl p-3 hover:scale-105 active:scale-95 transition"
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
className="bg-[#1A1A1E] border border-zinc-800 rounded-xl p-3 active:scale-95 transition"
>
{dark ? "☀️" : "🌙"}
</button>


</div>


</header>



{/* MEGAZORD WALLET */}


<section className="mt-6 relative overflow-hidden bg-[#1A1A1E] border border-zinc-800 rounded-3xl p-4 shadow-xl shadow-black/30">


<div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 blur-3xl rounded-full pointer-events-none"/>



<div className="flex justify-between items-center relative">


<div>

<p className="text-xs text-zinc-600 dark:text-zinc-500">
💳 AlphaBot Wallet
</p>


<p className="font-bold mt-1">
Available Balance
</p>


</div>


<div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white to-zinc-300 flex items-center justify-center shadow-xl shadow-white/10">
<span className="font-black text-black">
A
</span>
</div>


</div>



<div className="flex items-center justify-between gap-3 mt-5">


<h2 className="text-2xl sm:text-3xl font-black text-white dark:text-white drop-shadow-lg truncate">

{showBalance ? `₦${balance.toLocaleString()}` : "₦••••••"}

</h2>



<button
onClick={()=>setShowBalance(!showBalance)}
className="bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm font-bold text-white"
>

{showBalance ? "Hide" : "Show"}

</button>


</div>



<div className="grid grid-cols-2 gap-3 mt-5">


<Link
href="/wallet"
className="min-w-0 text-center bg-white text-black py-3 rounded-xl font-bold hover:scale-105 hover:shadow-lg hover:shadow-white/10 active:scale-95 transition truncate"
>
💳 Fund
</Link>





<Link
href="/data"
className="min-w-0 text-center bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 py-3 rounded-xl font-bold text-white hover:scale-105 active:scale-95 transition truncate"
>
🌐 Data
</Link>

</div>


</section>



<h2 className="text-base font-bold mt-4">
Quick Actions
</h2>


<div className="grid grid-cols-4 gap-2 mt-3">

{services.slice(0,8).map((item)=>(

<Link
href={item[2]}
key={item[1]}
className="h-14 min-w-0 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center hover:scale-105 transition active:scale-95 overflow-hidden"
>


<div className="w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">

<span className="text-lg truncate grayscale-[20%]">
{item[0]}
</span>

</div>


<p className="text-[9px] mt-1 font-semibold text-center text-zinc-900 dark:text-white leading-tight truncate max-w-full px-1">
{item[1]}
</p>


</Link>

))}

</div>



<div className="mt-2 text-center">

<Link
href="/services"
className="text-yellow-400 font-semibold text-sm"
>
View all services →
</Link>
</div>



{/* ALPHABOT AI CARD */}

<section className="mt-2 relative overflow-hidden bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-3">

<div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-400/10 blur-3xl rounded-full"/>


<div className="flex justify-between items-start relative">

<div>

<div className="flex items-center gap-2">

<span className="text-lg">
🤖
</span>

<p className="text-xs font-bold text-yellow-500">
ALPHABOT AI
</p>

</div>


<h2 className="text-base font-black mt-2">
Smart Assistant
</h2>


<p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
Manage payments, ask questions and control AlphaBot services faster.
</p>


</div>


<div className="w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">

<span className="text-xl">
AI
</span>

</div>


</div>



<Link
href="/ai"
className="block mt-3 w-full text-center bg-black text-white dark:bg-white dark:text-black rounded-xl py-2 font-bold text-xs hover:scale-[1.02] transition"
>

Open AI Assistant

</Link>


</section>







{/* MEGAZORD POPULAR SERVICES */}

<section className="mt-3">

<div className="flex justify-between items-center mb-3">

<h2 className="font-bold text-base">
Popular
</h2>

<Link
href="/services"
className="text-yellow-500 text-xs font-semibold"
>
View all →
</Link>

</div>


<div className="grid grid-cols-4 gap-2">

{[
["⚡","Power","/electricity"],
["📺","TV","/tv"],
["🔁","Repeat","/recurring"],
["🏆","Arena","/arena"]
].map((item)=>(

<Link
href={item[2]}
key={item[1]}
className="h-16 bg-white dark:bg-[#151515] border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center hover:scale-105 transition"
>

<div className="text-xl">
{item[0]}
</div>

<p className="text-[9px] mt-1 font-semibold truncate text-zinc-900 dark:text-white">
{item[1]}
</p>

</Link>

))}

</div>

</section>


<BottomNav />


</main>

);

}
