"use client";

import {useEffect,useState} from "react";


export default function AdminServices(){

const [settings,setSettings]=useState({});
const [message,setMessage]=useState("");


const loadSettings=async()=>{

const res=await fetch(
"https://alphabot-1.onrender.com/admin/services",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
}
}
);


const data=await res.json();

setSettings(data);

};


useEffect(()=>{

loadSettings();

},[]);



const save=async(service)=>{

let payload={};


if(service==="electricity"){

payload={
electricityProfit:
settings.electricityProfit || 0
};

}


if(service==="tv"){

payload={
tvProfit:
settings.tvProfit || 0
};

}


if(service==="betting"){

payload={
bettingFee:
settings.bettingFee || 0
};

}


if(service==="recurring"){

payload={
recurringFee:
settings.recurringFee || 0
};

}


if(service==="airtime-cash"){

payload={
airtimeCashProfit:
settings.airtimeCashProfit || 0
};

}



const res=await fetch(
`https://alphabot-1.onrender.com/admin/services/${service}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:
`Bearer ${localStorage.getItem("adminToken")}`
},
body:JSON.stringify(payload)
}
);


setMessage(
res.ok
?"✅ Saved"
:"❌ Failed"
);


};


const field=(name,label)=>(
<div className="mt-3">

<label className="block font-bold">
{label}
</label>

<input
className="bg-[#050505] border border-zinc-800 rounded-xl p-3 w-full text-white outline-none"
type="number"
value={settings[name] || ""}
onChange={(e)=>
setSettings({
...settings,
[name]:Number(e.target.value)
})
}
/>

</div>
);



return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-3xl font-bold">
⚙️ Service Management
</h1>

<p>{message}</p>

<div className="grid md:grid-cols-3 gap-4 mt-6">

<a href="/admin/airtime"
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:shadow-md">
📱 Airtime
<p className="text-sm text-zinc-500">
Manage airtime pricing
</p>
</a>


<a href="/admin/products"
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:shadow-md">
📶 Data
<p className="text-sm text-zinc-500">
Manage data plans
</p>
</a>


<a href="/admin/electricity"
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:shadow-md">
⚡ Electricity
<p className="text-sm text-zinc-500">
Manage electricity settings
</p>
</a>


<a href="/admin/tv"
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:shadow-md">
📺 TV Subscription
<p className="text-sm text-zinc-500">
Manage TV services
</p>
</a>


<a href="/admin/betting"
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:shadow-md">
🎲 Betting
<p className="text-sm text-zinc-500">
Manage betting
</p>
</a>


<a href="/admin/recurring"
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 hover:shadow-md">
🔁 Recurring
<p className="text-sm text-zinc-500">
Manage recurring services
</p>
</a>

</div>



<div className="bg-[#18181B] border border-zinc-800 border rounded-2xl p-6 mt-5">

<h2 className="font-bold">
⚡ Electricity
</h2>

{field(
"electricityProfit",
"Profit Amount"
)}

<button
className="bg-[#18181B] text-white rounded-xl px-5 py-2 mt-4 hover:bg-zinc-800 transition"
onClick={()=>save("electricity")}
>
Save Electricity
</button>

</div>



<div className="bg-[#18181B] border border-zinc-800 border rounded-2xl p-6 mt-5">

<h2 className="font-bold">
📺 TV Subscription
</h2>

{field(
"tvProfit",
"Profit Amount"
)}

<button
className="bg-[#18181B] text-white rounded-xl px-5 py-2 mt-4 hover:bg-zinc-800 transition"
onClick={()=>save("tv")}
>
Save TV
</button>

</div>



<div className="bg-[#18181B] border border-zinc-800 border rounded-2xl p-6 mt-5">

<h2 className="font-bold">
🎲 Betting
</h2>

{field(
"bettingFee",
"Fee"
)}

<button
className="bg-[#18181B] text-white rounded-xl px-5 py-2 mt-4 hover:bg-zinc-800 transition"
onClick={()=>save("betting")}
>
Save Betting
</button>

</div>



<div className="bg-[#18181B] border border-zinc-800 border rounded-2xl p-6 mt-5">

<h2 className="font-bold">
🔁 Recurring
</h2>

{field(
"recurringFee",
"Fee"
)}

<button
className="bg-[#18181B] text-white rounded-xl px-5 py-2 mt-4 hover:bg-zinc-800 transition"
onClick={()=>save("recurring")}
>
Save Recurring
</button>

</div>


<div className="bg-[#18181B] border border-zinc-800 border rounded-2xl p-6 mt-5">

<h2 className="font-bold">
💳 Airtime Cash
</h2>

{field(
"airtimeCashProfit",
"AlphaBot Profit (%)"
)}

<button
className="bg-[#18181B] text-white rounded-xl px-5 py-2 mt-4 hover:bg-zinc-800 transition"
onClick={()=>save("airtime-cash")}
>
Save Airtime Cash
</button>

</div>


</div>

);

}
