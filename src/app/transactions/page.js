"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const API = "https://api.alphabothq.com";

export default function Transactions(){

const [transactions,setTransactions] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState("");

useEffect(()=>{

const loadTransactions = async()=>{

try{

const token = localStorage.getItem("token");
const saved = localStorage.getItem("user");

if(!token || !saved){
window.location.href="/login";
return;
}

const user = JSON.parse(saved);

const res = await fetch(
`${API}/transactions/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data = await res.json();

if(res.ok && Array.isArray(data)){
setTransactions(data);
}else{
setError(data.message || "Unable to load transactions");
}

}catch(error){

console.log(error);
setError("Unable to load transaction history");

}finally{

setLoading(false);

}

};

loadTransactions();

},[]);


const formatAmount = (amount)=>{

return Number(amount || 0).toLocaleString("en-NG",{
minimumFractionDigits:2,
maximumFractionDigits:2
});

};


const getTypeIcon = (item)=>{

const text = `${item.description || ""} ${item.type || ""}`.toLowerCase();

if(text.includes("airtime")) return "📱";
if(text.includes("data")) return "⚡";
if(text.includes("electric")) return "💡";
if(text.includes("tv")) return "📺";
if(text.includes("fund") || text.includes("deposit")) return "💰";
if(text.includes("referral")) return "🎁";
if(text.includes("transfer")) return "↗️";

return "◈";

};


return(

<main className="min-h-screen bg-[#050505] text-white px-5 py-7 pb-24">

<div className="max-w-md mx-auto space-y-5">

{/* HEADER */}

<div>

<Link
href="/profile"
className="text-sm text-zinc-500 hover:text-white transition"
>
← Back to Profile
</Link>

<p className="text-xs text-zinc-500 uppercase tracking-widest mt-6">
AlphaBot Account
</p>

<h1 className="text-3xl font-black mt-2">
Transaction History
</h1>

<p className="text-zinc-400 mt-2">
View your wallet and payment activities
</p>

</div>


{/* SUMMARY */}

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5">

<div className="flex items-center justify-between">

<div>

<p className="text-xs text-zinc-500 uppercase tracking-widest">
Total Activities
</p>

<p className="text-2xl font-black mt-2">
{transactions.length}
</p>

</div>

<div className="w-12 h-12 rounded-2xl bg-[#050505] border border-zinc-800 flex items-center justify-center text-xl">
📜
</div>

</div>

</div>


{/* TRANSACTIONS */}

<div>

<p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
Recent Activity
</p>

<div className="space-y-3">

{loading && (

<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5">

<p className="text-zinc-400">
Loading transactions...
</p>

</div>

)}


{!loading && error && (

<div className="bg-[#18181B] border border-red-900 rounded-2xl p-5">

<p className="text-red-400">
{error}
</p>

</div>

)}


{!loading && !error && transactions.length === 0 && (

<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-6 text-center">

<div className="text-3xl mb-3">
📭
</div>

<p className="font-bold">
No transactions yet
</p>

<p className="text-sm text-zinc-500 mt-2">
Your wallet activities will appear here.
</p>

</div>

)}


{!loading && transactions.map((item,index)=>{

const credit = item.direction === "credit";

return(

<div
key={item._id || item.id || item.reference || index}
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4"
>

<div className="flex items-start gap-3">

<div className="w-11 h-11 shrink-0 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">
{getTypeIcon(item)}
</div>


<div className="flex-1 min-w-0">

<p className="font-bold truncate">
{item.description || item.type || "Transaction"}
</p>

<p className="text-xs text-zinc-500 mt-1">
{item.status || "Completed"}
</p>

{item.createdAt && (

<p className="text-xs text-zinc-600 mt-2">
{new Date(item.createdAt).toLocaleString("en-NG")}
</p>

)}

{item.reference && (

<p className="text-xs text-zinc-600 mt-1 truncate">
Ref: {item.reference}
</p>

)}

</div>


<div className="text-right shrink-0">

<p className={`font-black ${
credit
? "text-green-400"
: "text-white"
}`}>

{credit ? "+" : "-"}₦{formatAmount(item.amount)}

</p>

</div>

</div>

</div>

);

})}

</div>

</div>


{/* INFO */}

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5">

<p className="font-bold">
Transaction Types
</p>

<div className="mt-4 space-y-3 text-sm text-zinc-400">

<div className="flex gap-3">
<span>💰</span>
<span>Wallet funding</span>
</div>

<div className="flex gap-3">
<span>📱</span>
<span>Airtime purchases</span>
</div>

<div className="flex gap-3">
<span>⚡</span>
<span>Data purchases</span>
</div>

<div className="flex gap-3">
<span>💡</span>
<span>Bill payments</span>
</div>

<div className="flex gap-3">
<span>🎁</span>
<span>Referral earnings</span>
</div>

</div>

</div>

</div>

<BottomNav />

</main>

);

}
