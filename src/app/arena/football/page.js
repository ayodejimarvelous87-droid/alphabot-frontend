"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";


export default function FootballArena(){

const router = useRouter();

const [matches,setMatches]=useState([]);
const [loading,setLoading]=useState(true);
const [message,setMessage]=useState("");
const [predictions,setPredictions]=useState([]);
const [leaderboard,setLeaderboard]=useState([]);
  const [rewardSettings,setRewardSettings]=useState({
    footballFirstPrize:1500,
    footballSecondPrize:1000
  });
  const [showRules,setShowRules]=useState(false);

const currentWeek = Math.ceil((((new Date()-new Date(new Date().getFullYear(),0,1))/86400000+1)/7));



useEffect(()=>{

fetch(
"https://api.alphabothq.com/football/matches"
)

.then(res=>res.json())

.then(data=>{
if(Array.isArray(data)){
setMatches(data);
}else{
console.log("INVALID DATA:", data);
}

  }).catch(()=>{
  setLoading(false);
  });

  fetch("https://api.alphabothq.com/settings")
  .then(res=>res.json())
  .then(data=>{
    setRewardSettings({
      footballFirstPrize:data.footballFirstPrize || 1500,
      footballSecondPrize:data.footballSecondPrize || 1000
    });
  });

const user = JSON.parse(localStorage.getItem("user"));

if(user){

fetch(
`https://api.alphabothq.com/football/my-predictions/${user._id}`
)

.then(res=>res.json())

.then(data=>{

if(Array.isArray(data)){

setPredictions(data);

}

});

}


fetch("https://api.alphabothq.com/football/leaderboard")
.then(res=>res.json())
.then(data=>{
if(Array.isArray(data)){
setLeaderboard(data);
}
  setLoading(false);
});


const refreshMatches = setInterval(()=>{
fetch("https://api.alphabothq.com/football/matches")
.then(res=>res.json())
.then(data=>{
if(Array.isArray(data)){
setMatches(data);
}
});
},60000);

return ()=>clearInterval(refreshMatches);
  },[]);


const predict = async(matchId,choice)=>{


const user = JSON.parse(
localStorage.getItem("user")
);


if(!user){

setMessage("Please login first");

return;

}



try{


const res = await fetch(

"https://api.alphabothq.com/football/predict",

{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${localStorage.getItem("token")}`
},

body:JSON.stringify({

userId:user._id,

matchId,

choice

})

}

);


const data = await res.json();

if(!res.ok){
throw new Error(data.message || "Prediction failed");
}

setMessage(data.message || "Prediction submitted");

if(data.prediction){
setPredictions(prev => [
...prev,
data.prediction
]);
}

setTimeout(()=>{
setMessage("");
},3000);

// Refresh in background
fetch(
`https://api.alphabothq.com/football/my-predictions/${user._id}`
)
.then(res => res.json())
.then(refreshed => {
if(Array.isArray(refreshed)){
setPredictions(refreshed);
}
})
.catch(()=>{});


}catch(error){

setMessage("Prediction failed");

}


};




const hasPredicted=(matchId)=>predictions.some(p=>p.matchId===matchId || p.matchId?._id===matchId);

const getPredictionChoice=(matchId)=>{
const p=predictions.find(x=>x.matchId===matchId || x.matchId?._id===matchId);
return p?.choice;
};


  return(

<main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white px-6 py-6 pb-24">

<div className="max-w-md mx-auto">


{/* HERO */}

<div className="bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl">


<p className="text-yellow-400 text-xs font-bold">
⚽ AlphaBot Arena+
</p>


<h1 className="text-3xl font-black mt-3">
Football Predictions
</h1>


<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed">
Week {currentWeek} • Predict matches • Earn points • Climb the leaderboard
</p>


<button
onClick={()=>setShowRules(!showRules)}
className="mt-5 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
📖 {showRules ? "Hide Rules" : "How To Play"}
</button>


<button
onClick={()=>router.push("/arena/football/chat")}
className="mt-3 w-full bg-zinc-50 dark:bg-[#050505] border border-zinc-300 dark:border-zinc-700 py-3 rounded-xl font-bold"
>
💬 Football Chat Arena
</button>

{showRules && (

<div className="mt-4 bg-zinc-50 dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-sm text-zinc-500 dark:text-zinc-400">

<p className="font-bold text-zinc-950 dark:text-white mb-3">
🏆 Arena+ Competition Rules
</p>

<ul className="space-y-3">

<li>
⚽ <b className="text-zinc-950 dark:text-white">Make predictions:</b> Choose Home, Draw, or Away for each football match.
</li>

<li>
🎯 <b className="text-zinc-950 dark:text-white">Daily limit:</b> Each player can submit a maximum of 20 predictions per day.
</li>

<li>
1️⃣ <b className="text-zinc-950 dark:text-white">One prediction per match:</b> Only one outcome can be selected for each match.
</li>

<li>
⏰ <b className="text-zinc-950 dark:text-white">Prediction deadline:</b> Predictions close automatically when the match starts.
</li>

<li>
⭐ <b className="text-zinc-950 dark:text-white">Scoring:</b> Correct predictions earn 2 points. Wrong predictions earn 0 points.
</li>

<li>
📊 <b className="text-zinc-950 dark:text-white">Leaderboard:</b> Players are ranked based on their total points.
</li>

<li>
🎁 <b className="text-zinc-950 dark:text-white">Rewards:</b> Top-performing players qualify for Arena+ rewards.
</li>

<li>
🚫 <b className="text-zinc-950 dark:text-white">No changes:</b> Predictions cannot be edited after submission.
</li>

<li>
🔥 <b className="text-zinc-950 dark:text-white">Compete fairly:</b> Stay consistent and climb the Arena+ rankings.
</li>

</ul>

</div>

)}


</div>





{/* WEEKLY REWARDS */}
<div className="mt-6 bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-[#18181B] dark:to-[#101012] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5">

<p className="text-yellow-400 font-black text-sm mb-4">
🏆 Weekly Arena+ Rewards
</p>

<div className="grid grid-cols-2 gap-4">

<div className="bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-center">
<p className="text-2xl">🥇</p>
<p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2">
1st Place
</p>
<p className="font-black text-xl mt-1">
₦{rewardSettings.footballFirstPrize}
</p>
</div>

<div className="bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-center">
<p className="text-2xl">🥈</p>
<p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2">
2nd Place
</p>
<p className="font-black text-xl mt-1">
₦{rewardSettings.footballSecondPrize}
</p>
</div>

</div>

</div>


{/* MATCHES */}


<div className="mt-6 space-y-5">


{matches.map(match=>(


<div
key={match._id}
className="bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5"
>


<h2 className="font-bold text-center text-lg">

{match.homeTeam}

<span className="mx-3 text-yellow-400">
VS
</span>

{match.awayTeam}


</h2>


{hasPredicted(match._id) && (

<p className="text-center mt-3 text-yellow-400 font-bold">

Your pick: {getPredictionChoice(match._id).toUpperCase()}

</p>

)}



<div className="text-center mt-4 text-sm text-zinc-500 dark:text-zinc-400">


{match.status==="IN_PLAY" && (

<p className="text-red-400 font-bold">
🔴 LIVE
</p>

)}


<p>
🕒 {new Date(match.matchDate).toLocaleString()}
</p>


{match.homeGoals !== null && match.awayGoals !== null && (

<p className="text-xl font-black mt-2">
⚽ {match.homeGoals} - {match.awayGoals}
</p>

)}


</div>




<div className="grid grid-cols-3 gap-3 mt-6">


<button
onClick={()=>predict(match._id,"home")}
disabled={hasPredicted(match._id)}
className={
hasPredicted(match._id) && getPredictionChoice(match._id)==="home"
?
"bg-yellow-400 text-black rounded-2xl py-4 font-black shadow-lg"
:
"bg-zinc-50 dark:bg-[#050505] border border-zinc-300 dark:border-zinc-700 rounded-2xl py-4 font-bold hover:border-yellow-400 transition"
}
>
<p className="text-xl">🏠</p>
<p className="text-xs mt-1">
{hasPredicted(match._id) && getPredictionChoice(match._id)==="home"
?
"Picked"
:
"Home"}
</p>
</button>


<button
onClick={()=>predict(match._id,"draw")}
disabled={hasPredicted(match._id)}
className={
hasPredicted(match._id) && getPredictionChoice(match._id)==="draw"
?
"bg-yellow-400 text-black rounded-2xl py-4 font-black shadow-lg"
:
"bg-zinc-50 dark:bg-[#050505] border border-zinc-300 dark:border-zinc-700 rounded-2xl py-4 font-bold hover:border-yellow-400 transition"
}
>
<p className="text-xl">🤝</p>
<p className="text-xs mt-1">
{hasPredicted(match._id) && getPredictionChoice(match._id)==="draw"
?
"Picked"
:
"Draw"}
</p>
</button>


<button
onClick={()=>predict(match._id,"away")}
disabled={hasPredicted(match._id)}
className={
hasPredicted(match._id) && getPredictionChoice(match._id)==="away"
?
"bg-yellow-400 text-black rounded-2xl py-4 font-black shadow-lg"
:
"bg-zinc-50 dark:bg-[#050505] border border-zinc-300 dark:border-zinc-700 rounded-2xl py-4 font-bold hover:border-yellow-400 transition"
}
>
<p className="text-xl">✈️</p>
<p className="text-xs mt-1">
{hasPredicted(match._id) && getPredictionChoice(match._id)==="away"
?
"Picked"
:
"Away"}
</p>
</button>


</div>


</div>


))}


</div>




{/* LEADERBOARD */}


<div className="mt-8 bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5">


<h2 className="text-xl font-bold mb-4">
🏆 Football Leaderboard
</h2>



{leaderboard.length === 0 ? (

<p className="text-center text-zinc-500">
No predictions yet this week. Be the first player!
</p>

) : (


leaderboard.map((player,index)=>(


<div
key={player._id || index}
className="flex justify-between py-3 border-b border-zinc-200 dark:border-zinc-800"
>

<p>
#{index+1} {player.userName}
</p>


<p className="text-yellow-400 font-bold">
{player.points || 0} pts
</p>


</div>


))


)}


</div>



</div>


<BottomNav />


</main>

);

}

