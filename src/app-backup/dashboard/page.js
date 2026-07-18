"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useTheme } from "@/components/ThemeProvider";

export default function Dashboard(){

const [user,setUser]=useState(null);
const [balance,setBalance]=useState(0);
const [transactions,setTransactions]=useState([]);
const [referralEarnings,setReferralEarnings]=useState(0);
const [notifications,setNotifications]=useState([]);

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



fetch(
`https://alphabot-i7p2.onrender.com/wallet/balance/${data.phone}`,
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

});



fetch(
`https://alphabot-i7p2.onrender.com/transactions/${data.phone}`,
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

}

});



fetch(
`https://alphabot-i7p2.onrender.com/referral-earnings/${data.phone}`,
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

});



fetch(
`https://alphabot-i7p2.onrender.com/notifications/${data.phone}`,
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

}

});


}


},[]);



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
["🏦","Bank","/bank"]

];return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6 pb-24">


<div className="flex justify-between items-center">

<div>

<p className="text-zinc-400">
Good day 👋
</p>

<h1 className="text-3xl font-bold">
{user?.name || "User"}
</h1>

</div>


<div className="flex gap-3">

<button className="bg-zinc-900 rounded-full p-3">
🔔
</button>


<button
onClick={toggleTheme}
className="bg-zinc-900 rounded-full p-3"
>
{dark ? "☀️" : "🌙"}
</button>


<button
onClick={logout}
className="border border-zinc-700 rounded-xl px-3"
>
Exit
</button>


</div>

</div>




<div className="mt-8 bg-gradient-to-br from-yellow-300 to-yellow-600 text-black rounded-3xl p-6 shadow-xl">


<p className="font-semibold">
Available Balance
</p>


<h2 className="text-4xl font-bold mt-3">
₦{balance.toLocaleString()}
</h2>


<div className="flex gap-3 mt-6">


<Link
href="/wallet"
className="bg-black text-white px-5 py-3 rounded-xl font-bold"
>
+ Fund
</Link>


<button
className="bg-white px-5 py-3 rounded-xl font-bold"
>
Withdraw
</button>


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
className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 text-center"
>

<div className="text-2xl">
{item[0]}
</div>

<p className="text-xs mt-2">
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
No transactions yet
</p>

) : (

<div className="mt-4 space-y-3">


{transactions.map((item,index)=>(

<div
key={index}
className="bg-white dark:bg-black rounded-xl p-3 flex justify-between"
>


<div>

<p className="font-semibold">
{item.type || item.service || "Transaction"}
</p>


<p className="text-xs text-zinc-500">
{item.status}
</p>


</div>


<p className="text-yellow-400 font-bold">
₦{item.amount}
</p>


</div>


))}


</div>

)}


</div><div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">


<h2 className="font-bold text-xl">
Referral Earnings 🎁
</h2>


<p className="text-zinc-400 mt-2">
Invite friends and earn rewards.
</p>


<p className="text-yellow-400 text-2xl font-bold mt-3">
₦{referralEarnings.toLocaleString()}
</p>


<Link
href="/referral"
className="inline-block mt-4 text-yellow-400"
>
Open Referral →
</Link>


</div>





<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">


<h2 className="font-bold text-xl">
Notifications 🔔
</h2>


{
notifications.length === 0 ? (

<p className="text-zinc-400 mt-3">
No notifications
</p>

) : (

<div className="mt-3 space-y-3">

{
notifications.map((item,index)=>(

<div
key={index}
className="bg-white dark:bg-black rounded-xl p-3"
>

<p className="font-semibold">
{item.title || "Notification"}
</p>


<p className="text-sm text-zinc-400">
{item.message}
</p>


</div>

))
}

</div>

)

}


</div>





<div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-4">


<Link href="/dashboard">
🏠
</Link>


<Link href="/wallet">
💳
</Link>


<Link href="/transactions">
📜
</Link>


<Link href="/referral">
👥
</Link>


<Link href="/profile">
👤
</Link>


</div>



<BottomNav />


</main>

);

}
