"use client";

import { useState } from "react";
import { Bell, Wallet, Eye, EyeOff } from "lucide-react";

export default function DesignTest(){

const [show,setShow]=useState(true);

return (

<main className="min-h-screen bg-[#0A0A0A] text-white p-5 max-w-md mx-auto">


<header className="flex items-center justify-between">

<div>

<p className="text-xs text-zinc-500">
Welcome back 👋
</p>

<h1 className="text-lg font-bold mt-1">
Ayodeji Marvelous
</h1>

</div>


<button className="relative bg-[#1A1A1E] border border-zinc-800 p-3 rounded-xl">

<Bell size={18}/>

<span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"/>

</button>


</header>



{/* WALLET CARD */}

<section className="mt-8 relative overflow-hidden bg-[#1A1A1E] border border-zinc-800 rounded-3xl p-6">


<div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-400/10 blur-3xl rounded-full"/>


<div className="flex justify-between items-center relative">


<div className="flex items-center gap-3">

<div className="bg-zinc-900 p-3 rounded-xl">

<Wallet size={20}/>

</div>


<div>

<p className="text-xs text-zinc-500">
AlphaBot Wallet
</p>

<p className="text-sm font-bold">
Verified Account ✅
</p>

</div>

</div>



<button
onClick={()=>setShow(!show)}
className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl"
>

{show?<EyeOff size={16}/>:<Eye size={16}/>}

</button>


</div>



<div className="mt-6">

<p className="text-xs text-zinc-500">
Available Balance
</p>


<h2 className="text-3xl font-black mt-2">
{show ? "₦7,653,471.00" : "••••••••"}
</h2>


</div>



<div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-zinc-800">


<div>
<p className="text-[11px] text-zinc-500">
Transactions
</p>

<b>127</b>

</div>



<div>

<p className="text-[11px] text-zinc-500">
Referral
</p>

<b className="text-yellow-400">
₦4,500
</b>

</div>



<div>

<p className="text-[11px] text-zinc-500">
Level
</p>

<b>
Gold
</b>

</div>


</div>


</section>



{/* QUICK ACTIONS */}

<section className="mt-8">


<div className="flex justify-between items-center mb-4">

<h2 className="font-bold text-lg">
Quick Actions
</h2>

<span className="text-xs text-zinc-500">
Services
</span>

</div>



<div className="grid grid-cols-4 gap-3">


{[
["📱","Airtime"],
["🌐","Data"],
["💳","Fund"],
["💸","Withdraw"],
["🏦","Transfer"],
["🤖","AI"],
["👥","Beneficiary"],
["➕","More"]

].map((item)=>(


<div
key={item[1]}
className="bg-[#1A1A1E] border border-zinc-800 rounded-2xl p-3 flex flex-col items-center justify-center aspect-square hover:border-yellow-400/40 transition active:scale-95"
>


<div className="text-2xl">
{item[0]}
</div>


<p className="text-[11px] text-zinc-300 mt-2 font-medium">
{item[1]}
</p>


</div>


))}


</div>


</section>



{/* AI ASSISTANT CARD */}

<section className="mt-8 relative overflow-hidden bg-[#1A1A1E] border border-zinc-800 rounded-3xl p-5">


<div className="absolute -right-10 top-0 w-36 h-36 bg-yellow-400/10 blur-3xl rounded-full"/>


<div className="flex justify-between items-start">


<div>


<p className="text-xs font-bold text-yellow-400">
🤖 ALPHABOT AI
</p>


<h2 className="text-lg font-black mt-2">
Smart Assistant
</h2>


<p className="text-xs text-zinc-400 mt-2 leading-relaxed">
Get help, ask questions and manage AlphaBot services faster.
</p>


</div>


<div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-3">

<span className="text-3xl">
🤖
</span>

</div>


</div>



<button className="mt-5 w-full bg-white text-black rounded-xl py-3 font-bold text-sm">

Open AI Assistant

</button>


</section>




{/* POPULAR SERVICES */}

<section className="mt-8">


<div className="flex justify-between items-center mb-4">

<h2 className="font-bold text-lg">
Popular Services
</h2>


<span className="text-xs text-yellow-400">
View all →
</span>


</div>



<div className="flex gap-3 overflow-x-auto pb-2">


{[
["⚡","Electricity"],
["📺","TV"],
["🔁","Recurring"],
["🏆","Arena+"]
].map((item)=>(


<div
key={item[1]}
className="min-w-[120px] bg-[#1A1A1E] border border-zinc-800 rounded-2xl p-4"
>


<div className="text-2xl">
{item[0]}
</div>


<p className="text-sm font-semibold mt-3">
{item[1]}
</p>


<p className="text-[10px] text-zinc-500 mt-1">
AlphaBot Service
</p>


</div>


))}


</div>


</section>



{/* RECENT ACTIVITY */}

<section className="mt-8 mb-10">


<div className="flex justify-between items-center mb-4">

<h2 className="font-bold text-lg">
Recent Activity
</h2>


<span className="text-xs text-yellow-400">
History →
</span>


</div>



<div className="space-y-3">


{[
["💰","Wallet Funding","+₦150,000"],
["📱","Airtime Purchase","-₦2,000"],
["🌐","Data Purchase","-₦5,000"]
].map((item)=>(


<div
key={item[1]}
className="bg-[#1A1A1E] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between"
>


<div className="flex items-center gap-3">


<div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-xl">
{item[0]}
</div>


<div>

<p className="font-semibold text-sm">
{item[1]}
</p>

<p className="text-xs text-zinc-500">
Today
</p>

</div>


</div>



<p className={`font-bold text-sm ${
item[2].startsWith("+")
? "text-emerald-400"
: "text-red-400"
}`}>
{item[2]}
</p>


</div>


))}


</div>


</section>




{/* BOTTOM NAVIGATION */}

<nav className="fixed bottom-5 left-5 right-5 max-w-md mx-auto bg-[#1A1A1E]/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-3 flex justify-around items-center shadow-2xl">


{[
["🏠","Home"],
["⚡","Services"],
["🤖","AI"],
["👤","Profile"]
].map((item,index)=>(


<button
key={item[1]}
className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition ${
index === 0
? "bg-yellow-400 text-black"
: "text-zinc-400 hover:text-white"
}`}
>


<span className="text-lg">
{item[0]}
</span>


<span className="text-[10px] font-semibold">
{item[1]}
</span>


</button>


))}


</nav>


</main>

)

}
