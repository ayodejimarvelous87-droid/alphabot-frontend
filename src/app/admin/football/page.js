"use client";

import {useEffect,useState} from "react";

export default function FootballSettings(){

const [settings,setSettings]=useState({
footballFirstPrize:1500,
footballSecondPrize:1000,
footballFirstMinimumPoints:200,
footballSecondMinimumPoints:180,
footballMinimumPredictions:20,
footballMinimumWins:10
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
footballFirstPrize:data.footballFirstPrize || 1500,
footballSecondPrize:data.footballSecondPrize || 1000,
footballFirstMinimumPoints:data.footballFirstMinimumPoints || 200,
footballSecondMinimumPoints:data.footballSecondMinimumPoints || 180,
footballMinimumPredictions:data.footballMinimumPredictions || 20,
footballMinimumWins:data.footballMinimumWins || 10
});

};


useEffect(()=>{
loadSettings();
},[]);



const saveSettings=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-1.onrender.com/admin/football-settings",
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
res.ok ? "✅ Football rewards updated" : data.message
);

};



const update=(key,value)=>{

setSettings({
...settings,
[key]:Number(value)
});

};



return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
⚽ Football Reward Settings
</h1>


<p className="mt-3">
{message}
</p>


<div className="space-y-4 mt-6">


<input
className="border border-zinc-800 rounded-3xl-xl p-3 w-full"
placeholder="First Prize"
value={settings.footballFirstPrize}
onChange={(e)=>update("footballFirstPrize",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl-xl p-3 w-full"
placeholder="Second Prize"
value={settings.footballSecondPrize}
onChange={(e)=>update("footballSecondPrize",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl-xl p-3 w-full"
placeholder="First Minimum Points"
value={settings.footballFirstMinimumPoints}
onChange={(e)=>update("footballFirstMinimumPoints",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl-xl p-3 w-full"
placeholder="Second Minimum Points"
value={settings.footballSecondMinimumPoints}
onChange={(e)=>update("footballSecondMinimumPoints",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl-xl p-3 w-full"
placeholder="Minimum Predictions"
value={settings.footballMinimumPredictions}
onChange={(e)=>update("footballMinimumPredictions",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl-xl p-3 w-full"
placeholder="Minimum Wins"
value={settings.footballMinimumWins}
onChange={(e)=>update("footballMinimumWins",e.target.value)}
/>


<button
className="bg-black text-white px-5 py-3 rounded-3xl"
onClick={saveSettings}
>
Save Football Rewards
</button>


</div>

</div>

);

}
