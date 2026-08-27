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
  
  "epin":"/recharge-pin",
"airtime-cash":"/airtime-cash",
"recurring":"/recurring",
"beneficiary":"/beneficiary",
"ai":"/ai",
};

return routes[type] || "/services";

};


useEffect(()=>{

fetch("https://api.alphabothq.com/products")
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
return product.name;
};
const getIcon=(product)=>{
if(product.type==="airtime") return "📞";
if(product.type==="data") return "📶";
if(product.type==="tv") return "📺";
if(product.type==="electricity") return "💡";
if(product.type==="exam-pin") return "🎓";
if(product.type==="epin") return "🎫";
if(product.type==="betting") return "🎯";
if(product.type==="airtime-cash") return "💵";
return "🛒";
};



const ServiceCard=({icon,title,link,desc})=>(

<Link
  href={link}
  className="group relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 h-24 hover:border-yellow-400/60 active:scale-[0.96] transition-all duration-200"
>

  <div className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:translate-x-[420%] transition-transform duration-700 pointer-events-none" />

  <div className="relative flex flex-col h-full justify-between">

    <div className="flex items-start justify-between">

      <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
        {icon}
      </div>

      <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-yellow-400 transition-colors">
        →
      </span>

    </div>

    <div className="min-w-0">

      <h2 className="font-bold text-sm truncate">
        {title}
      </h2>

      <p className="text-[9px] text-zinc-500 dark:text-zinc-500 truncate mt-0.5">
        {desc}
      </p>

    </div>

  </div>

</Link>

);


return(

<main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white px-4 py-4 pb-24">

<div className="max-w-md mx-auto">

<div className="relative">

  <div className="flex items-center justify-between">

    <div>
      <p className="text-[9px] font-black tracking-[0.2em] text-yellow-500 uppercase">
        AlphaBot
      </p>

      <h1 className="text-xl font-black mt-0.5">
        Services
      </h1>
    </div>

    <div className="flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>

      <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400">
        Live
      </span>
    </div>

  </div>

  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
    Everything you need, right here.
  </p>

</div>

  <section className="mt-6">

<div className="flex items-center gap-2 mb-3">

  <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-sm">
    📱
  </div>

  <div>
    <h2 className="text-sm font-black">
      Mobile
    </h2>

    <p className="text-[9px] text-zinc-500 dark:text-zinc-500">
      Airtime, data & automation
    </p>
  </div>

</div>

<div className="grid grid-cols-2 gap-3 mt-3">

<ServiceCard
icon="📞"
title="Airtime"
link="/airtime"
desc="Mobile service"
/>

<ServiceCard
icon="📶"
title="Data Plan"
link="/data"
desc="Mobile service"
/>

<ServiceCard
icon="🤖"
title="AB AutoPilot"
link="/autopilot"
desc="Daily data automation"
/>

</div>

</section>

<section className="mt-5">
<div className="flex items-center gap-2 mb-3">

  <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-sm">
    💡
  </div>

  <div>
    <h2 className="text-sm font-black">Utilities</h2>
    <p className="text-[9px] text-zinc-500">TV & electricity</p>
  </div>

</div>
<div className="grid grid-cols-2 gap-3 mt-3">
{products.filter(p=>["tv","electricity"].includes(p.type)).map(p=>(
<ServiceCard key={p._id} icon={getIcon(p)} title={getDisplayName(p)} link={getServiceLink(p.type)} desc="Utility service" />
))}
</div>
</section>

  <section className="mt-5">

  <div className="flex items-center gap-2 mb-3">
    <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-sm">
      🎓
    </div>

    <div>
      <h2 className="text-sm font-black">Pins</h2>
      <p className="text-[9px] text-zinc-500">Exams & recharge PINs</p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-3 mt-3">
  {products.filter(p=>["exam-pin","epin"].includes(p.type)).map(p=>(
  <ServiceCard key={p._id} icon={getIcon(p)} title={getDisplayName(p)} link={getServiceLink(p.type)} desc="PIN service" />
  ))}
  </div>

  </section>


  <section className="mt-5">

  <div className="flex items-center gap-2 mb-3">
    <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-sm">
      🧾
    </div>

    <div>
      <h2 className="text-sm font-black">Bills</h2>
      <p className="text-[9px] text-zinc-500">Everyday payments</p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-3 mt-3">
  {products.filter(p=>!["airtime","data","tv","electricity","exam-pin","epin","waec","jamb","neco","bank"].includes(p.type)).map(p=>(
  <ServiceCard key={p._id} icon={getIcon(p)} title={getDisplayName(p)} link={getServiceLink(p.type)} desc={p.type} />
  ))}
  </div>

  </section>


  <section className="mt-5">

  <div className="flex items-center gap-2 mb-3">
    <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-sm">
      🏆
    </div>

    <div>
      <h2 className="text-sm font-black">Rewards</h2>
      <p className="text-[9px] text-zinc-500">Predictions & rewards</p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-3 mt-3">
    <ServiceCard icon="🏆" title="Arena+" link="/arena" desc="Predictions & rewards" />
  </div>

  </section>


  <section className="mt-5">

  <div className="flex items-center gap-2 mb-3">
    <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-sm">
      ⚙️
    </div>

    <div>
      <h2 className="text-sm font-black">Account Services</h2>
      <p className="text-[9px] text-zinc-500">Manage your account</p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-3 mt-3">

    <ServiceCard
      icon="👥"
      title="Beneficiary"
      link="/beneficiary"
      desc="Manage saved users"
    />

    <ServiceCard
      icon="🔁"
      title="Recurring Payments"
      link="/recurring"
      desc="Automatic payments"
    />

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
