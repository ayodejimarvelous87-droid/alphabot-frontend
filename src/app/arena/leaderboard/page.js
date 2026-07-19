"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";


export default function ArenaLeaderboard(){

const [players,setPlayers]=useState([]);
const [loading,setLoading]=useState(true);


useEffect(()=>{

fetch(
"https://alphabot-1.onrender.com/football/leaderboard"
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

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
🏆 Arena+ Leaderboard
</h1>


<p className="text-zinc-400 mt-2">
Top football predictors this week.
</p>



{loading ? (

<p className="mt-8">
Loading leaderboard...
</p>

) : players.length===0 ? (

<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">

No players yet ⚽

</div>

) : (


<div className="mt-6 space-y-4">


{players.map((player,index)=>(


<div
key={player._id}
className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-5 flex justify-between items-center"
>


<div>

<p className="font-bold">

{index===0 ? "🥇" : index===1 ? "🥈" : index===2 ? "🥉" : "🏅"}

{" "}

{player.userName || "Player"}

</p>


</div>


<p className="text-yellow-400 font-bold">

{player.points} pts

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
