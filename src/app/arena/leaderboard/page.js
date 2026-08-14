"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";


export default function ArenaLeaderboard(){

const [players,setPlayers]=useState([]);
const [loading,setLoading]=useState(true);


useEffect(()=>{

fetch(
"https://api.alphabothq.com/football/leaderboard"
)

.then(res=>res.json())

.then(data=>{

if(Array.isArray(data)){

setPlayers(data);

}

setLoading(false);

})

.catch(()=>{

setLoading(false);

});


},[]);




  return(

<main className="min-h-screen bg-[#050505] text-white px-6 py-6 pb-24">

<div className="max-w-md mx-auto">


{/* HEADER */}

<div>

<p className="text-yellow-400 text-sm font-bold">
🏆 AlphaBot Arena+
</p>


<h1 className="text-3xl font-black mt-2">
Leaderboard
</h1>


<p className="text-zinc-400 mt-2 text-sm">
Top football predictors this week.
</p>


</div>




{loading ? (

<p className="mt-8 text-zinc-400">
Loading leaderboard...
</p>


) : players.length===0 ? (


<div className="mt-8 bg-[#18181B] border border-zinc-800 rounded-3xl p-5 text-center">

No players yet ⚽

</div>


) : (


<div className="mt-6 space-y-4">


{players.map((player,index)=>(


<div
key={player._id}
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 flex justify-between items-center"
>


<div className="flex items-center gap-3">


<div className="w-10 h-10 rounded-xl bg-[#050505] border border-zinc-800 flex items-center justify-center">

{index===0 ? "🥇" : index===1 ? "🥈" : index===2 ? "🥉" : "🏅"}

</div>


<p className="font-bold">
{player.userName || "Player"}
</p>


</div>



<p className="text-yellow-400 font-black">
{player.points || 0} pts
</p>


</div>


))}


</div>


)}


</div>


<BottomNav />


</main>

);

}

