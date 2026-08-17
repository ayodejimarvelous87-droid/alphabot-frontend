"use client";

import {useEffect,useState} from "react";

const API="https://api.alphabothq.com";

export default function AdminEvents(){

const [events,setEvents]=useState([]);
const [loading,setLoading]=useState(true);
const [message,setMessage]=useState("");

const [form,setForm]=useState({
title:"",
description:"",
reward:"",
icon:"🎉",
type:"service_purchases",
pointsUnitAmount:"",
pointsPerUnit:"",
startsAt:"",
endsAt:""
});


const token=()=>localStorage.getItem("adminToken");


const loadEvents=async()=>{

try{

const res=await fetch(
`${API}/admin/events`,
{
headers:{
Authorization:`Bearer ${token()}`
}
}
);

const data=await res.json();

if(!res.ok){
throw new Error(
data?.message || "Failed to load events"
);
}

setEvents(
Array.isArray(data) ? data : []
);

}catch(error){

setMessage(`❌ ${error.message}`);

}finally{

setLoading(false);

}

};


useEffect(()=>{

loadEvents();

},[]);


const updateField=(name,value)=>{

setForm(prev=>({
...prev,
[name]:value
}));

};


const createEvent=async(e)=>{

e.preventDefault();

setMessage("Creating event...");

try{

const res=await fetch(
`${API}/admin/events`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token()}`
},
body:JSON.stringify(form)
}
);

const data=await res.json();

if(!res.ok){

throw new Error(
data?.message || "Failed to create event"
);

}

setMessage("✅ Event created successfully.");

setForm({
title:"",
description:"",
reward:"",
icon:"🎉",
type:"service_purchases",
pointsUnitAmount:"",
pointsPerUnit:"",
startsAt:"",
endsAt:""
});

await loadEvents();

}catch(error){

setMessage(`❌ ${error.message}`);

}

};


const updateStatus=async(id,status)=>{

setMessage("Updating event...");

try{

const res=await fetch(
`${API}/admin/events/${id}/status`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token()}`
},
body:JSON.stringify({status})
}
);

const data=await res.json();

if(!res.ok){

throw new Error(
data?.message || "Failed to update status"
);

}

setMessage("✅ Event status updated.");

await loadEvents();

}catch(error){

setMessage(`❌ ${error.message}`);

}

};


const resetLeaderboard=async(id)=>{

const confirmed=window.confirm(
"Reset this event leaderboard? Existing transactions will NOT be deleted."
);

if(!confirmed)return;

setMessage("Resetting leaderboard...");

try{

const res=await fetch(
`${API}/admin/events/${id}/reset-leaderboard`,
{
method:"POST",
headers:{
Authorization:`Bearer ${token()}`
}
}
);

const data=await res.json();

if(!res.ok){

throw new Error(
data?.message || "Failed to reset leaderboard"
);

}

setMessage("✅ Leaderboard reset successfully.");

await loadEvents();

}catch(error){

setMessage(`❌ ${error.message}`);

}

};


const formatDate=(value)=>{

if(!value)return "—";

return new Date(value).toLocaleString();

};


const statusClass=(status)=>{

if(status==="active"){
return "text-green-400";
}

if(status==="scheduled"){
return "text-yellow-400";
}

if(status==="ended"){
return "text-zinc-400";
}

if(status==="cancelled"){
return "text-red-400";
}

return "text-blue-400";

};


return(

<div className="p-4 md:p-6 space-y-8">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

<div>

<h1 className="text-3xl font-black">
🎉 Event Management
</h1>

<p className="text-zinc-500 mt-1">
Create and manage AlphaBot competitions and leaderboards.
</p>

</div>

<a
href="/admin"
className="w-fit px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700"
>
← Admin Dashboard
</a>

</div>


{message && (

<div className="bg-[#18181B] border border-zinc-800 rounded-xl p-4">
{message}
</div>

)}


{/* CREATE EVENT */}

<section className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">

<h2 className="text-xl font-black">
Create Event
</h2>

<p className="text-sm text-zinc-500 mt-1">
Set the event details and publish it when ready.
</p>


<form
onSubmit={createEvent}
className="grid md:grid-cols-2 gap-4 mt-6"
>


<div className="md:col-span-2">

<label className="block text-sm font-bold mb-2">
Event Title
</label>

<input
required
value={form.title}
onChange={e=>updateField("title",e.target.value)}
placeholder="Highest Service Purchases"
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
/>

</div>


<div>

<label className="block text-sm font-bold mb-2">
Icon
</label>

<input
value={form.icon}
onChange={e=>updateField("icon",e.target.value)}
placeholder="🎉"
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
/>

</div>


<div>

<label className="block text-sm font-bold mb-2">
Event Type
</label>

<select
value={form.type}
onChange={e=>updateField("type",e.target.value)}
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
>

<option value="service_purchases">
🛒 Service Purchases
</option>

<option value="referral_challenge">
Referral Challenge
</option>

<option value="ab_coins">
🪙 AB Coins
</option>

<option value="football_picks">
⚽ Football Picks
</option>

</select>

</div>


{form.type === "service_purchases" && (

<>

<div>

<label className="block text-sm font-bold mb-2">
Amount per Point Unit
</label>

<input
required
type="number"
min="1"
step="0.01"
value={form.pointsUnitAmount}
onChange={e=>updateField("pointsUnitAmount",e.target.value)}
placeholder="100"
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
/>

<p className="text-xs text-zinc-500 mt-1">
How much qualifying service spending earns one points unit.
</p>

</div>


<div>

<label className="block text-sm font-bold mb-2">
Points per Unit
</label>

<input
required
type="number"
min="1"
step="1"
value={form.pointsPerUnit}
onChange={e=>updateField("pointsPerUnit",e.target.value)}
placeholder="5"
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
/>

<p className="text-xs text-zinc-500 mt-1">
How many points that spending unit is worth.
</p>

</div>

</>

)}


<div className="md:col-span-2">

<label className="block text-sm font-bold mb-2">
Description
</label>

<textarea
value={form.description}
onChange={e=>updateField("description",e.target.value)}
placeholder="Compete with other AlphaBot users..."
rows={3}
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
/>

</div>


<div>

<label className="block text-sm font-bold mb-2">
Reward
</label>

<input
value={form.reward}
onChange={e=>updateField("reward",e.target.value)}
placeholder="10GB"
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
/>

<p className="text-xs text-zinc-500 mt-1">
Anything can be entered: 10GB, ₦10,000, Free Data, etc.
</p>

</div>


<div></div>


<div>

<label className="block text-sm font-bold mb-2">
Starts At
</label>

<input
required
type="datetime-local"
value={form.startsAt}
onChange={e=>updateField("startsAt",e.target.value)}
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
/>

</div>


<div>

<label className="block text-sm font-bold mb-2">
Ends At
</label>

<input
required
type="datetime-local"
value={form.endsAt}
onChange={e=>updateField("endsAt",e.target.value)}
className="w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 outline-none"
/>

</div>


<div className="md:col-span-2">

<button
type="submit"
className="w-full md:w-auto px-6 py-3 rounded-xl bg-yellow-400 text-black font-black hover:bg-yellow-300"
>
Create Event
</button>

</div>

</form>

</section>


{/* EXISTING EVENTS */}

<section>

<div className="flex items-center justify-between mb-4">

<div>

<h2 className="text-xl font-black">
Existing Events
</h2>

<p className="text-sm text-zinc-500">
Manage event status and leaderboards.
</p>

</div>

<span className="text-sm text-zinc-500">
{events.length} event{events.length===1?"":"s"}
</span>

</div>


{loading ? (

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 text-center">
Loading events...
</div>

) : events.length===0 ? (

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 text-center">

<div className="text-4xl">
🎉
</div>

<p className="font-black mt-3">
No events yet
</p>

<p className="text-sm text-zinc-500 mt-1">
Create your first event above.
</p>

</div>

) : (

<div className="space-y-4">

{events.map(event=>(

<div
key={event._id}
className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5"
>

<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">


<div className="min-w-0">

<div className="flex items-center gap-3">

<span className="text-2xl">
{event.icon || "🎉"}
</span>

<div>

<h3 className="font-black text-lg">
{event.title}
</h3>

<p className="text-xs text-zinc-500">
{event.type}
</p>

</div>

</div>


{event.description && (

<p className="text-sm text-zinc-400 mt-3">
{event.description}
</p>

)}


<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">

<div>
<p className="text-[10px] uppercase text-zinc-500 font-bold">
Reward
</p>

<p className="font-black text-yellow-400 mt-1">
{event.reward || "Not set"}
</p>
</div>


<div>
<p className="text-[10px] uppercase text-zinc-500 font-bold">
Starts
</p>

<p className="text-xs font-bold mt-1">
{formatDate(event.startsAt)}
</p>
</div>


<div>
<p className="text-[10px] uppercase text-zinc-500 font-bold">
Ends
</p>

<p className="text-xs font-bold mt-1">
{formatDate(event.endsAt)}
</p>
</div>


<div>
<p className="text-[10px] uppercase text-zinc-500 font-bold">
Users
</p>

<p className="font-black mt-1">
{Array.isArray(event.leaderboard)
? event.leaderboard.length
: 0}
</p>
</div>

</div>

</div>


<div className="shrink-0">

<p className={`text-sm font-black uppercase ${statusClass(event.status)}`}>
{event.status}
</p>

</div>

</div>


<div className="border-t border-zinc-800 mt-5 pt-4 flex flex-wrap gap-2">

{[
"draft",
"scheduled",
"active",
"ended",
"cancelled"
].map(status=>(

<button
key={status}
onClick={()=>updateStatus(event._id,status)}
className={`px-3 py-2 rounded-xl text-xs font-bold border ${
event.status===status
?"bg-yellow-400 text-black border-yellow-400"
:"bg-[#050505] border-zinc-800 text-zinc-300 hover:border-zinc-600"
}`}
>
{status}
</button>

))}


<button
onClick={()=>resetLeaderboard(event._id)}
className="px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
>
Reset Leaderboard
</button>

</div>

</div>

))}

</div>

)}

</section>

</div>

);

}
