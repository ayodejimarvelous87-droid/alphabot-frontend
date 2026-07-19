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

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6 pb-24">

<div className="max-w-md mx-auto">

<h1 className="text-3xl font-bold">
🎁 Arena+ Rewards
</h1>

<p className="text-zinc-400 mt-2">
Your football prediction rewards.
</p>


{loading ? (

<p className="mt-8">
Loading rewards...
</p>

) : rewards.length===0 ? (

<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">
No rewards yet ⚽
</div>

) : (

<div className="mt-6 space-y-4">

{rewards.map((item,index)=>(

<div
key={item._id || index}
className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5"
>

<h2 className="text-xl font-bold">
🏆 Position {item.position}
</h2>


<p className="text-yellow-400 text-2xl font-bold mt-3">

{item.rewardType==="wallet"
? `₦${item.amount}`
: item.dataAmount}

</p>


<p className="mt-2">
Reward type: {item.rewardType}
</p>


<p className="text-zinc-400 mt-2">
Week: {item.week}
</p>


<p className="mt-2 text-green-400 font-bold">
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
