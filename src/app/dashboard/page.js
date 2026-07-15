"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard(){

const [user,setUser]=useState(null);
const [balance,setBalance]=useState(0);

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

}

},[]);



const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

};



const services=[
["📱","Airtime"],
["🌐","Data"],
["⚡","Electricity"],
["📺","TV"],
["🎮","Betting"],
["🎓","Exam PIN"],
["💵","Airtime Cash"],
["🏦","Bank"]
];


return(

<main className="min-h-screen bg-black text-white px-5 py-6 pb-24">


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

<div
key={item[1]}
className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-center"
>

<div className="text-2xl">
{item[0]}
</div>

<p className="text-xs mt-2">
{item[1]}
</p>

</div>

))}


</div>





<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-5">


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


<p className="text-zinc-400 mt-4">
No transactions yet
</p>


</div>





<div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-5">


<h2 className="font-bold text-xl">
Referral Earnings 🎁
</h2>


<p className="text-zinc-400 mt-2">
Invite friends and earn rewards.
</p>


<p className="text-yellow-400 text-2xl font-bold mt-3">
₦0
</p>


<Link
href="/referral"
className="inline-block mt-4"
>
Open Referral →
</Link>


</div>





<div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex justify-around py-4">


<Link href="/dashboard">🏠</Link>

<Link href="/wallet">💳</Link>

<Link href="/transactions">📜</Link>

<Link href="/referral">👥</Link>

<Link href="/profile">👤</Link>


</div>


</main>

);

}
