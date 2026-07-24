"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function ArenaRewards(){

const [rewards,setRewards]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{

const user=JSON.parse(localStorage.getItem("user"));

if(!user){
setLoading(false);
return;
}

fetch(
`https://alphabot-1.onrender.com/football/rewards/${user._id}`
)

.then(res=>res.json())

.then(data=>{

if(Array.isArray(data)){
setRewards(data);
}

setLoading(false);

})

.catch(()=>setLoading(false));


},[]);



  return(

<main className="min-h-screen bg-[#050505] text-white px-6 py-6 pb-24">

<div className="max-w-md mx-auto">


{/* HEADER */}

<div>

<p className="text-yellow-400 text-sm font-bold">
🎁 AlphaBot Arena+
</p>


<h1 className="text-3xl font-black mt-2">
Rewards
</h1>


<p className="text-zinc-400 mt-2 text-sm">
Your football prediction rewards.
</p>


</div>





{loading ? (

<p className="mt-8 text-zinc-400">
Loading rewards...
</p>


) : rewards.length===0 ? (


<div className="mt-8 bg-[#18181B] border border-zinc-800 rounded-3xl p-5 text-center">

No rewards yet ⚽

</div>


) : (


<div className="mt-6 space-y-4">


{rewards.map((item,index)=>(


<div
key={item._id || index}
className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5"
>


<h2 className="text-xl font-bold">
🏆 Position {item.position}
</h2>



<div className="mt-4 bg-[#050505] border border-zinc-800 rounded-2xl p-4">


<p className="text-yellow-400 text-2xl font-black">

{item.rewardType==="wallet"
? `₦${item.amount}`
: item.dataAmount}

</p>


<p className="text-zinc-400 text-sm mt-2">
Reward type: {item.rewardType}
</p>


</div>




<p className="text-zinc-400 mt-4">
Week: {item.week}
</p>


<p className="text-green-400 font-bold mt-2">
Status: {item.status}
</p>


<p className="text-zinc-500 text-sm mt-2">
{new Date(item.date).toLocaleDateString()}
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

