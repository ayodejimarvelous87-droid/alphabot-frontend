"use client";

import {useEffect,useState} from "react";

export default function AdminSettings(){

const [settings,setSettings]=useState({
maintenanceMode:false,
announcement:"",
referralPercentage:1,
providerMinimumBalance:500
});

const [message,setMessage]=useState("");


const loadSettings=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/settings",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setSettings({
maintenanceMode:data.maintenanceMode || false,
announcement:data.announcement || "",
referralPercentage:data.referralPercentage || 1,
providerMinimumBalance:data.providerMinimumBalance || 500
});

};


useEffect(()=>{
loadSettings();
},[]);



const saveSettings=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/admin/system-settings",
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify(settings)
}
);


const data=await res.json();

setMessage(
res.ok ? "✅ Settings updated" : data.message
);

};



return(
<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
⚙️ System Settings
</h1>


<p className="mt-3">
{message}
</p>


<div className="mt-5 space-y-4">


<label className="flex gap-3">
<input
type="checkbox"
checked={settings.maintenanceMode}
onChange={(e)=>setSettings({
...settings,
maintenanceMode:e.target.checked
})}
/>

Maintenance Mode
</label>


<textarea
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="Announcement message"
value={settings.announcement}
onChange={(e)=>setSettings({
...settings,
announcement:e.target.value
})}
/>


<label className="font-bold block">
💰 Referral Percentage (%)
</label>

<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
type="number"
placeholder="Referral percentage"
value={settings.referralPercentage}
onChange={(e)=>setSettings({
...settings,
referralPercentage:e.target.value
})}
/>


<label className="font-bold block">
🏦 Provider Minimum Balance (NGN)
</label>

<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
type="number"
placeholder="Provider minimum balance"
value={settings.providerMinimumBalance}
onChange={(e)=>setSettings({
...settings,
providerMinimumBalance:e.target.value
})}
/>


<button
className="bg-black text-white px-5 py-3 rounded-3xl"
onClick={saveSettings}
>
Save Settings
</button>


</div>


</div>
);

}
