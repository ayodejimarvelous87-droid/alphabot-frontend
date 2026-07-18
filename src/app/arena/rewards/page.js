"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";


export default function ArenaRewards(){

const [rewards,setRewards]=useState([]);
const [loading,setLoading]=useState(true);
const [message,setMessage]=useState("");



useEffect(()=>{


const user = JSON.parse(
localStorage.getItem("user")
);


if(!user){
setLoading(false);
return;
}



fetch(
`https://alphabot-i7p2.onrender.com/football/rewards/${user._id}`
)

.then(res=>res.json())

.then(data=>{

if(Array.isArray(data)){

setRewards(data);

}

setLoading(false);

})

.catch(()=>{

setLoading(false);

});


},[]);



const claimReward = async(id)=>{


const res = await fetch(

`https://alphabot-i7p2.onrender.com/football/rewards/claim/${id}`,

{

method:"POST"

}

);


const data = await res.json();


setMessage(
data.message || "Completed"
);


setRewards(prev=>

prev.map(item=>

item._id===id
?
{
...item,
status:"claimed"
}
:
item

)

);


};



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-6 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
🎁 Arena+ Rewards
</h1>


<p className="text-zinc-400 mt-2">
Your football prediction rewards.
</p>



{message && (

<div className="mt-5 bg-yellow-400 text-black rounded-xl p-3 font-bold">

{message}

</div>

)}





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


{rewards.map(item=>(


<div
key={item._id}
className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5"
>


<h2 className="text-xl font-bold">
🏆 Position {item.position}
</h2>


<p className="text-yellow-400 text-2xl font-bold mt-3">
{item.reward}
</p>


<p className="text-zinc-400 mt-2">
Week: {item.week}
</p>



{item.status==="pending" ? (

<button
onClick={()=>claimReward(item._id)}
className="mt-5 bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold"
>
Claim Reward
</button>

) : (

<p className="mt-5 text-green-400 font-bold">
✅ Claimed
</p>

)}



</div>


))}


</div>


)}



</div>


<BottomNav />


</main>

);

}
