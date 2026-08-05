"use client";

import {useEffect,useState} from "react";

export default function PartnerLeaderboard(){

const [partners,setPartners]=useState([]);
const [loading,setLoading]=useState(true);


useEffect(()=>{

fetch(
"https://alphabot-1.onrender.com/blog-partner/leaderboard"
)
.then(res=>res.json())
.then(data=>{

if(Array.isArray(data)){
setPartners(data);
}

setLoading(false);

})
.catch(()=>{

setLoading(false);

});

},[]);



return(

<main className="
min-h-screen
bg-[#050505]
text-white
px-6
py-6
">

<div className="max-w-md mx-auto">


<div>

<div className="
w-14
h-14
rounded-2xl
bg-black
border
border-zinc-700
flex
items-center
justify-center
mb-5
">

<span className="
text-3xl
font-black
bg-gradient-to-br
from-white
to-zinc-400
bg-clip-text
text-transparent
">
A
</span>

</div>


<p className="text-yellow-400 text-sm font-bold">
🏆 AlphaBot Partners
</p>


<h1 className="
text-3xl
font-black
mt-2
">
Leaderboard
</h1>


<p className="
text-zinc-400
mt-2
text-sm
">
Top blog partners by successful referrals.
</p>


</div>



{loading ? (

<p className="mt-8 text-zinc-400">
Loading leaderboard...
</p>


) : partners.length===0 ? (

<div className="
mt-8
bg-[#18181B]
border
border-zinc-800
rounded-3xl
p-5
text-center
">
No partners yet
</div>


) : (


<div className="
mt-6
space-y-4
">


{partners.map((partner,index)=>(

<div
key={partner._id || index}
className="
bg-[#18181B]
border
border-zinc-800
rounded-2xl
p-5
flex
justify-between
items-center
"
>


<div className="
flex
items-center
gap-3
">


<div className="
w-10
h-10
rounded-xl
bg-[#050505]
border
border-zinc-800
flex
items-center
justify-center
">

{index===0 ? "🥇" : index===1 ? "🥈" : index===2 ? "🥉" : "🏅"}

</div>


<div>

<p className="font-bold">
{partner.name}
</p>


<p className="text-zinc-400 text-sm">
{partner.users || 0} referrals
</p>

</div>


</div>



<div className="text-right">
<p className="text-zinc-400 text-xs">
Rank #{index + 1}
</p>


<p className="
text-zinc-500
text-xs
">
earned
</p>


</div>


</div>


))}


</div>


)}


</div>

</main>

);

}
