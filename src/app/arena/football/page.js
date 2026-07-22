"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";


export default function FootballArena(){

const [matches,setMatches]=useState([]);
const [loading,setLoading]=useState(true);
const [message,setMessage]=useState("");
const [predictions,setPredictions]=useState([]);
const [leaderboard,setLeaderboard]=useState([]);
  const [showRules,setShowRules]=useState(false);



useEffect(()=>{

fetch(
"https://alphabot-1.onrender.com/football/matches"
)

.then(res=>res.json())

.then(data=>{
if(Array.isArray(data)){
console.log("FRONTEND MATCH COUNT:", data.length);
setMatches(data);
}else{
console.log("INVALID DATA:", data);
}

  }).catch(()=>{
  setLoading(false);
  });

const user = JSON.parse(localStorage.getItem("user"));

if(user){

fetch(
`https://alphabot-1.onrender.com/football/my-predictions/${user._id}`
)

.then(res=>res.json())

.then(data=>{

if(Array.isArray(data)){

setPredictions(data);

}

});

}


fetch("https://alphabot-1.onrender.com/football/leaderboard")
.then(res=>res.json())
.then(data=>{
if(Array.isArray(data)){
setLeaderboard(data);
}
  setLoading(false);
});

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

"https://alphabot-1.onrender.com/football/predict",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:user._id,

matchId,

choice

})

}

);


const data = await res.json();

setMessage(data.message || "Prediction submitted");

setTimeout(()=>{
setMessage("");
},3000);

const updated = await fetch(`https://alphabot-1.onrender.com/football/my-predictions/${user._id}`);

const refreshed = await updated.json();

if(Array.isArray(refreshed)){
setPredictions(refreshed);
}


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

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
⚽ Arena+ Football
</h1>


<p className="text-zinc-400 mt-2">
Predict matches and earn points.
</p>

<button onClick={()=>setShowRules(!showRules)} className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold">📖 How to Play</button>

{showRules && (
<div className="mt-4 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">
<h2 className="text-xl font-bold mb-3">⚽ Arena+ Football Rules</h2>
<p className="text-sm leading-6">
• Predict the winner before kickoff.<br/>
• Home = home team wins.<br/>
• Draw = both teams finish equal.<br/>
• Away = away team wins.<br/><br/>
🏆 Scoring System:<br/>
• Correct win prediction = 2 points.<br/>
• Correct draw prediction = 2 points.<br/>
• Wrong prediction = 0 points.<br/>
• Points determine your weekly leaderboard rank.<br/><br/>
🎯 Competition Rules:<br/>
• Maximum 20 predictions daily.<br/>
• Minimum 20 predictions required to qualify.<br/>
• Minimum 10 correct predictions required to qualify.<br/>
• Top players are ranked by total points.<br/>
• 1st place requires 200 points.<br/>
• 2nd place requires 180 points.<br/><br/>
⚠️ Rules:<br/>
• One prediction per match only.<br/>
• Predictions close when the match starts.<br/>
• Rewards are paid every Sunday.
</p>
</div>
)}




{message && (

<div className="mt-5 bg-yellow-400 text-black rounded-xl p-3 font-bold">

{message}

</div>

)}




{loading ? (

<p className="mt-8">
Loading matches...
</p>


) : matches.length===0 ? (

<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">

<p className="text-3xl">
⚽
</p>

<p className="font-bold mt-2">
No matches available
</p>

</div>


) : (


<div className="mt-6 space-y-5">


{matches.map(match=>(


<div
key={match._id}
className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5"
>


<h2 className="font-bold text-center text-lg">

{match.homeTeam}

<span className="mx-3 text-yellow-400">
VS
</span>

{hasPredicted(match._id) && (
<p className="text-center mt-3 text-blue-500 font-bold">
Your pick: {getPredictionChoice(match._id).toUpperCase()}
</p>
)}

{match.awayTeam}

</h2>

<div className="text-center mt-3 text-sm text-zinc-500">
{match.status==="IN_PLAY" && <p className="text-red-500 font-bold">🔴 LIVE</p>}
<p>🕒 {new Date(match.matchDate).toLocaleString()}</p>
{match.homeGoals !== null && match.awayGoals !== null && (
<p className="text-xl font-bold mt-2">⚽ {match.homeGoals} - {match.awayGoals}</p>
)}
</div>




<div className="grid grid-cols-3 gap-2 mt-5">


<button
onClick={()=>predict(match._id,"home")}
disabled={hasPredicted(match._id)}
style={{opacity:hasPredicted(match._id)?0.7:1}}
className={hasPredicted(match._id) && getPredictionChoice(match._id)==="home" ? "bg-blue-500 text-white rounded-xl py-3 font-bold" : "bg-yellow-400 text-black rounded-xl py-3 font-bold"}
>
{hasPredicted(match._id) && getPredictionChoice(match._id)==="home" ? "✅ Picked" : "🏠 Home"}
</button>


<button
disabled={hasPredicted(match._id)}
style={{opacity:hasPredicted(match._id)?0.7:1}}
onClick={()=>predict(match._id,"draw")}
className={hasPredicted(match._id) && getPredictionChoice(match._id)==="draw" ? "bg-blue-500 text-white rounded-xl py-3 font-bold" : "bg-zinc-800 text-white rounded-xl py-3 font-bold"}
>
{hasPredicted(match._id) && getPredictionChoice(match._id)==="draw" ? "✅ Picked" : "🤝 Draw"}
</button>


<button
onClick={()=>predict(match._id,"away")}
className={hasPredicted(match._id) && getPredictionChoice(match._id)==="away" ? "bg-blue-500 text-white rounded-xl py-3 font-bold" : "bg-black text-white rounded-xl py-3 font-bold"}
disabled={hasPredicted(match._id)}
style={{opacity:hasPredicted(match._id)?0.7:1}}
>
{hasPredicted(match._id) && getPredictionChoice(match._id)==="away" ? "✅ Picked" : "✈️ Away"}
</button>



</div>


</div>


))}


</div>


)}



</div>



<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">

<h2 className="text-xl font-bold mb-4">
🏆 Football Leaderboard
</h2>

{leaderboard.length === 0 ? (

<p className="text-center text-zinc-500">
No predictions yet this week. Be the first player!
</p>

) : (

leaderboard.map((player,index)=>(

<div key={player._id || index} className="flex justify-between py-2 border-b border-zinc-300 dark:border-zinc-700">
<p>#{index+1} {player.userName}</p>
<p>{player.points || 0} pts</p>
</div>

))

)}

</div>

<BottomNav />


</main>

);

}
