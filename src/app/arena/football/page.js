"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";


export default function FootballArena(){

const [matches,setMatches]=useState([]);
const [loading,setLoading]=useState(true);
const [message,setMessage]=useState("");
const [predictions,setPredictions]=useState([]);
const [leaderboard,setLeaderboard]=useState([]);



useEffect(()=>{

fetch(
"https://alphabot-1.onrender.com/football/matches"
)

.then(res=>res.json())

.then(data=>{

if(Array.isArray(data)){

setMatches(data);

}

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

setLoading(false);

})

.catch(()=>{

setLoading(false);

});

fetch("https://alphabot-1.onrender.com/football/leaderboard")
.then(res=>res.json())
.then(data=>{
if(Array.isArray(data)){
setLeaderboard(data);
}
});

},[]);;



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


setMessage(
data.message || "Prediction submitted"
);

setPredictions(prev=>[
...prev,
{
matchId,
choice
}
]);


}catch(error){

setMessage("Prediction failed");

}


};




const hasPredicted=(matchId)=>predictions.some(p=>p.matchId===matchId || p.matchId?._id===matchId);

return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
⚽ Arena+ Football
</h1>


<p className="text-zinc-400 mt-2">
Predict matches and earn points.
</p>




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

{match.awayTeam}

</h2>




<div className="grid grid-cols-3 gap-2 mt-5">


<button
onClick={()=>predict(match._id,"home")}
disabled={hasPredicted(match._id)}
className="bg-yellow-400 text-black rounded-xl py-3 font-bold"
>
🏠 Home
</button>


<button
disabled={hasPredicted(match._id)}
onClick={()=>predict(match._id,"draw")}
className="bg-zinc-800 text-white rounded-xl py-3 font-bold"
>
🤝 Draw
</button>


<button
onClick={()=>predict(match._id,"away")}
className="bg-black text-white rounded-xl py-3 font-bold"
disabled={hasPredicted(match._id)}
>
✈️ Away
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

{leaderboard.map((player,index)=>(

<div key={player._id || index}
className="flex justify-between py-2 border-b border-zinc-300 dark:border-zinc-700">

<span>
#{index+1} {player.userName || "Player"}
</span>

<span className="font-bold">
{player.points} pts
</span>

</div>

))}

</div>

<BottomNav />


</main>

);

}
