"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";


export default function FootballArena(){

const [matches,setMatches]=useState([]);
const [loading,setLoading]=useState(true);
const [message,setMessage]=useState("");



useEffect(()=>{

fetch(
"https://alphabot-i7p2.onrender.com/football/matches"
)

.then(res=>res.json())

.then(data=>{

if(Array.isArray(data)){

setMatches(
data.filter(
item=>item.status==="Not Started"
)
);

}

setLoading(false);

})

.catch(()=>{

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

"https://alphabot-i7p2.onrender.com/football/predict",

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


}catch(error){

setMessage("Prediction failed");

}


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
className="bg-yellow-400 text-black rounded-xl py-3 font-bold"
>
🏠 Home
</button>


<button
onClick={()=>predict(match._id,"draw")}
className="bg-zinc-800 text-white rounded-xl py-3 font-bold"
>
🤝 Draw
</button>


<button
onClick={()=>predict(match._id,"away")}
className="bg-black text-white rounded-xl py-3 font-bold"
>
✈️ Away
</button>



</div>


</div>


))}


</div>


)}



</div>


<BottomNav />


</main>

);

}
