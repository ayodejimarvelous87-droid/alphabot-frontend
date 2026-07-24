"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Services(){

const [products,setProducts]=useState([]);
const [loading,setLoading]=useState(true);

const getServiceLink=(type)=>{

const routes={
"airtime":"/airtime",
"data":"/data",
"electricity":"/electricity",
"tv":"/tv",
"betting":"/betting",
"exam-pin":"/exam-pin",
"airtime-cash":"/airtime-cash",
"bank":"/bank",
"transfer":"/transfer",
"withdraw":"/withdraw",
"recurring":"/recurring",
"ai":"/ai",
"mifi":"/data"
};

return routes[type] || "/services";

};


useEffect(()=>{

fetch("https://alphabot-1.onrender.com/products")
.then(res=>res.json())
.then(data=>{
setProducts(data);
setLoading(false);
})
.catch(()=>{
setLoading(false);
});

},[]);

const getDisplayName=(product)=>{
if(product.type==="airtime") return "Airtime";
if(product.type==="data") return "Data Plan";
if(product.type==="airtime-cash") return "Airtime Cash";
if(product.type==="mifi") return "MiFi";
if(product.type==="bank") return "Bank Transfer";
return product.name;
};
const getIcon=(product)=>{
if(product.type==="airtime") return "📞";
if(product.type==="data") return "📶";
if(product.type==="mifi") return "📡";
if(product.type==="tv") return "📺";
if(product.type==="electricity") return "💡";
if(product.type==="exam-pin" || product.type==="epin" || product.type==="recharge-pin") return "🎓";
if(product.type==="betting") return "🎯";
if(product.type==="airtime-cash") return "💵";
if(product.type==="bank") return "🏦";
return "🛒";
};



const ServiceCard=({icon,title,link,desc})=>(

<Link
href={link}
className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 h-24 hover:border-yellow-400 active:scale-95 transition"
>

<div className="text-2xl">
{icon}
</div>

<h2 className="font-bold mt-1 text-sm">
{title}
</h2>

<p className="text-[9px] text-zinc-500">
{desc}
</p>

</Link>

);


return(

<main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white px-4 py-4 pb-24">

<div className="max-w-md mx-auto">

<h1 className="text-xl font-black">
Services 🛠️
</h1>

<section className="mt-6">
<h2 className="bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold">
📱 Mobile
</h2>
<div className="grid grid-cols-2 gap-3 mt-3">
{products.filter(p=>["airtime","data","mifi"].includes(p.type)).map(p=>(
<ServiceCard key={p._id} icon={getIcon(p)} title={getDisplayName(p)} link={getServiceLink(p.type)} desc={p.network || "Mobile service"} />
))}
</div>
</section>

<section className="mt-5">
<h2 className="bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold">
💡 Utilities
</h2>
<div className="grid grid-cols-2 gap-3 mt-3">
{products.filter(p=>["tv","electricity"].includes(p.type)).map(p=>(
<ServiceCard key={p._id} icon={getIcon(p)} title={getDisplayName(p)} link={getServiceLink(p.type)} desc="Utility service" />
))}
</div>
</section>

<section className="mt-5">
<h2 className="bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold">
🎓 Pins
</h2>
<div className="grid-cols-2 grid gap-3 mt-3">
{products.filter(p=>["exam-pin","epin","recharge-pin","waec","jamb","neco"].includes(p.type)).map(p=>(
<ServiceCard key={p._id} icon={getIcon(p)} title={getDisplayName(p)} link={getServiceLink(p.type)} desc="PIN service" />
))}
</div>
</section>

<section className="mt-5">
<h2 className="bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold">
🧾 Bills
</h2>
<div className="grid-cols-2 grid gap-3 mt-3">
{products.filter(p=>!["airtime","data","mifi","tv","electricity","exam-pin","epin","recharge-pin","waec","jamb","neco","bank"].includes(p.type)).map(p=>(
<ServiceCard key={p._id} icon={getIcon(p)} title={getDisplayName(p)} link={getServiceLink(p.type)} desc={p.type} />
))}
</div>
</section>

<section className="mt-5">
<h2 className="bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold">
🏆 Rewards
</h2>
<div className="grid grid-cols-2 gap-3 mt-3">
<ServiceCard icon="🏆" title="Arena+" link="/arena" desc="Predictions & rewards" />
</div>
</section>

<section className="mt-5">
<h2 className="bg-white dark:bg-[#1A1A1E] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold">
🏦 Finance
</h2>
<div className="grid grid-cols-2 gap-3 mt-3">
{products.filter(p=>["bank","airtime-cash"].includes(p.type)).map(p=>(
<ServiceCard key={p._id} icon={getIcon(p)} title={getDisplayName(p)} link={getServiceLink(p.type)} desc="Finance service" />
))}
</div>
</section>


{loading && (
<p className="text-zinc-500 mt-5">
Loading more services...
</p>
)}


</div>

<BottomNav />

</main>

);

}
