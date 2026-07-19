"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";
import { useTheme } from "@/components/ThemeProvider";

export default function Dashboard(){

const [user,setUser]=useState(null);
const [toast,setToast]=useState("");
const [loading,setLoading]=useState(true);
const [balance,setBalance]=useState(0);
const [showBalance,setShowBalance]=useState(true);
const [transactions,setTransactions]=useState([]);
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


if(saved){

const data=JSON.parse(saved);

setUser(data);

fetch(`https://alphabot-main.onrender.com/users/profile/${data.phone}`,{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(profile=>{
if(profile && !profile.message){
setUser(profile);
localStorage.setItem("user",JSON.stringify(profile));
}
});




fetch(
`https://alphabot-main.onrender.com/wallet/balance/${data.phone}`,
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
`https://alphabot-main.onrender.com/transactions/${data.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(list=>{

if(Array.isArray(list)){

setTransactions(list.slice(0,5));

setTotalSpent(
list.reduce((sum,item)=>sum + Number(item.amount || 0),0)
);


}

})
.catch(()=>{
setToast("Unable to load transactions");
});



fetch(
`https://alphabot-main.onrender.com/referral-earnings/${data.phone}`,
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
`https://alphabot-main.onrender.com/notifications/${data.phone}`,
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
});


}


},[]);




useEffect(()=>{

const updateNotifications = () => {

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if(!user || !token) return;

fetch(`https://alphabot-main.onrender.com/notifications/${user.phone}`,{
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
["🎮","Betting","/betting"],
["🎓","Exam PIN","/exam-pin"],
["💵","Airtime Cash","/airtime-cash"],
["🏆","Arena+","/arena"],
["💬","Support","/support"],
["🏦","Bank","/bank"],
["🔁","Recurring","/recurring"]

];






if(loading){
return(
<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6">
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

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6 pb-24">

<Toast message={toast} type="error" />



<div className="flex justify-between items-center">



<div className="flex items-center gap-3">
<div>
<p className="text-zinc-400 text-sm">
{getGreeting()}
</p>

<h1 className="text-3xl font-bold">
{user?.name || "User"}
</h1>
</div>

</div>

<div className="flex gap-3 items-center">

<Link
href="/notifications"
className="bg-zinc-900 dark:bg-zinc-800 rounded-full p-3 relative hover:scale-105 transition"
>
🔔
{unreadCount > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 font-bold animate-bounce">
{unreadCount}
</span>
)}
</Link>

<button
onClick={toggleTheme}
className="bg-zinc-900 dark:bg-zinc-800 rounded-full p-3 hover:scale-105 transition"
>
{dark ? "☀️" : "🌙"}
</button>

<button
onClick={logout}
className="border border-zinc-700 rounded-xl px-3 hover:scale-105 transition"
>
Exit
</button>


</div>

</div>




<div className="mt-8 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 text-black rounded-3xl p-6 shadow-xl overflow-hidden relative">

<div className="flex justify-between items-start">
<div>
<p className="font-semibold text-sm opacity-70">
💳 AlphaBot Wallet
</p>

<p className="mt-2 font-bold">
Available Balance
</p>
</div>

<div className="text-4xl opacity-20">
₦
</div>
</div>

<div className="flex items-center justify-between mt-5">

<h2 className="text-4xl font-bold">
{showBalance ? `₦${balance.toLocaleString()}` : "₦••••••"}
</h2>

<button
onClick={()=>setShowBalance(!showBalance)}
className="bg-black/10 rounded-full p-2 text-2xl hover:scale-110 transition"
>
{showBalance ? "👁️" : "🙈"}
</button>

</div>

<div className="flex gap-3 mt-7">

<Link
href="/wallet"
className="flex-1 text-center bg-black text-white px-5 py-3 rounded-xl font-bold hover:scale-105 transition"
>
💳 Fund
</Link>

<button
className="flex-1 bg-white text-black px-5 py-3 rounded-xl font-bold hover:scale-105 transition"
>
💸 Withdraw
</button>

</div>

</div>






<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">
<h2 className="font-bold text-xl">
AlphaBot Activity 📊
</h2>

<div className="grid grid-cols-2 gap-4 mt-5">

<div className="bg-white dark:bg-black rounded-xl p-4">
<p className="text-zinc-400 text-sm">Transactions</p>
<p className="text-2xl font-bold mt-2">{transactions.length}</p>
</div>

<div className="bg-white dark:bg-black rounded-xl p-4">
<p className="text-zinc-400 text-sm">Total Spent</p>
  <p className="text-xl sm:text-2xl font-bold mt-2 text-yellow-400 break-all">₦{totalSpent.toLocaleString()}</p>
</div>

<div className="bg-white dark:bg-black rounded-xl p-4">
<p className="text-zinc-400 text-sm">Referral Earnings</p>
<p className="text-2xl font-bold mt-2 text-yellow-400">₦{referralEarnings.toLocaleString()}</p>
</div>

<div className="bg-white dark:bg-black rounded-xl p-4">
<p className="text-zinc-400 text-sm">Activity</p>
<p className="text-2xl font-bold mt-2">Active ✅</p>
</div>

</div>
</div>

<h2 className="text-xl font-bold mt-10">
Quick Actions
</h2>



<div className="grid grid-cols-4 gap-3 mt-5">


{services.map((item)=>(

<Link
href={item[2]}
key={item[1]}
className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 text-center hover:scale-105 hover:shadow-lg transition duration-200 active:scale-95"
>

<div className="w-11 h-11 mx-auto rounded-full bg-yellow-400/20 flex items-center justify-center">
<span className="text-2xl">
{item[0]}
</span>
</div>

<p className="text-xs mt-3 font-semibold">
{item[1]}
</p>

</Link>



))}


</div>




<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">


<div className="flex justify-between">

<h2 className="font-bold text-xl">
Recent Transactions
</h2>


<Link
href="/transactions"
className="text-yellow-400 text-sm"
>
View all
</Link>


</div>



{transactions.length === 0 ? (

<p className="text-zinc-400 mt-4">
No transactions yet 🚀
<br/>
Start by funding your wallet.
</p>

) : (

<div className="mt-4 space-y-3">


{transactions.map((item,index)=>(

<div
key={index}
className="bg-white dark:bg-black rounded-2xl p-4 flex items-center justify-between border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition"
>

<div className="flex items-center gap-3">

<div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
💳
</div>

<div>
<p className="font-semibold">
{item.type || item.service || "Transaction"}
</p>

<p className="text-xs text-zinc-500 mt-1">
{item.status || "Completed"} ✅
</p>

</div>

</div>

<p className="text-yellow-400 font-bold">
₦{item.amount}
</p>

</div>

))}




</div>

)}


<div className="mt-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800">

<div className="flex justify-between items-start">

<div>
<h2 className="font-bold text-xl">
🎁 Referral Rewards
</h2>

<p className="text-zinc-400 mt-2 text-sm">
Invite friends and earn AlphaBot rewards.
</p>
</div>

<div className="text-3xl">
💰
</div>

</div>

<p className="text-yellow-400 text-3xl font-bold mt-5">
₦{referralEarnings.toLocaleString()}
</p>

<Link
href="/referral"
className="inline-block mt-5 bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold hover:scale-105 transition"
>
Open Referral →
</Link>

</div>





<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">

<div className="flex justify-between items-center">
<h2 className="font-bold text-xl">
🔔 Notifications
</h2>

<Link
href="/notifications"
className="text-yellow-400 text-sm font-semibold"
>
View all
</Link>
</div>

{notifications.length === 0 ? (

<div className="text-center bg-white dark:bg-black rounded-2xl p-5 mt-4">
<p className="text-3xl">🔕</p>
<p className="font-semibold mt-2">No notifications yet</p>
<p className="text-zinc-400 text-sm mt-1">
AlphaBot updates and rewards will appear here.
</p>
</div>

) : (

<div className="mt-4 space-y-3">

{notifications.map((item,index)=>(

<div
key={index}
className="bg-white dark:bg-black rounded-2xl p-4 flex gap-3 items-start border border-zinc-200 dark:border-zinc-800"
>

<div className="text-2xl">🔔</div>

<div className="flex-1">
<p className="font-semibold">
{item.title || "Notification"}
</p>

<p className="text-sm text-zinc-400 mt-1">
{item.message}
</p>

{!item.read && (
<span className="inline-block text-xs text-yellow-400 mt-2 font-bold">
NEW
</span>
)}

</div>

</div>

))}

</div>

)}

</div>
</div>













<BottomNav />


</main>

);

}
