"use client";

import {useEffect,useState} from "react";

export default function FootballSettings(){

const [settings,setSettings]=useState({
footballFirstPrize:1500,
footballSecondPrize:1000,
footballFirstMinimumPoints:200,
footballSecondMinimumPoints:180,
footballMinimumPredictions:20,
footballMinimumWins:10,

footballAIEnabled:true,
footballIdleChatEnabled:true,
footballIdleChatInterval:5,
footballAnalystStyle:"",
goalMasterStyle:""
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
footballMinimumWins:data.footballMinimumWins || 10,

footballAIEnabled:data.footballAIEnabled !== false,
footballIdleChatEnabled:data.footballIdleChatEnabled !== false,
footballIdleChatInterval:data.footballIdleChatInterval || 5,
footballAnalystStyle:data.footballAnalystStyle || "",
goalMasterStyle:data.goalMasterStyle || ""
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

const textFields=[
"footballAnalystStyle",
"goalMasterStyle"
];

setSettings({
...settings,
[key]:
typeof value === "boolean"
? value
: textFields.includes(key)
? value
: Number(value)
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
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="🏆 1st Position Prize Amount"
value={settings.footballFirstPrize}
onChange={(e)=>update("footballFirstPrize",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="🥈 2nd Position Prize Amount"
value={settings.footballSecondPrize}
onChange={(e)=>update("footballSecondPrize",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="⭐ 1st Position Minimum Points"
value={settings.footballFirstMinimumPoints}
onChange={(e)=>update("footballFirstMinimumPoints",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="⭐ 2nd Position Minimum Points"
value={settings.footballSecondMinimumPoints}
onChange={(e)=>update("footballSecondMinimumPoints",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="📊 Minimum Predictions Required"
value={settings.footballMinimumPredictions}
onChange={(e)=>update("footballMinimumPredictions",e.target.value)}
/>


<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="🎯 Minimum Wins Required"
value={settings.footballMinimumWins}
onChange={(e)=>update("footballMinimumWins",e.target.value)}
/>


<button
className="bg-black text-white px-5 py-3 rounded-3xl"
onClick={saveSettings}
>
Save Football Settings
</button>

<div className="mt-10 space-y-4">

<h2 className="text-xl font-bold">
🤖 Football AI Controls
</h2>


<label className="flex justify-between items-center">
Enable Football AI

<input
type="checkbox"
checked={settings.footballAIEnabled}
onChange={(e)=>update("footballAIEnabled",e.target.checked)}
/>

</label>


<label className="flex justify-between items-center">
Enable Idle Football Discussions

<input
type="checkbox"
checked={settings.footballIdleChatEnabled}
onChange={(e)=>update("footballIdleChatEnabled",e.target.checked)}
/>

</label>


<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="Idle Chat Interval (minutes)"
value={settings.footballIdleChatInterval}
onChange={(e)=>update("footballIdleChatInterval",e.target.value)}
/>


<textarea
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="⚽ Analyst Style"
value={settings.footballAnalystStyle}
onChange={(e)=>update("footballAnalystStyle",e.target.value)}
/>


<textarea
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="🔥 GoalMaster Style"
value={settings.goalMasterStyle}
onChange={(e)=>update("goalMasterStyle",e.target.value)}
/>


</div>




</div>

</div>

);

}
