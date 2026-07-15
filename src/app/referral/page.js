"use client";

import { useEffect, useState } from "react";


export default function Referral(){


const [user,setUser]=useState(null);
const [copied,setCopied]=useState(false);



useEffect(()=>{

const saved=localStorage.getItem("user");
const token=localStorage.getItem("token");


if(!token || !saved){

window.location.href="/login";
return;

}


setUser(JSON.parse(saved));


},[]);



const copyLink=()=>{

const link =
`https://alphabot.com/register?ref=${user?.referralCode}`;


navigator.clipboard.writeText(link);


setCopied(true);


setTimeout(()=>{

setCopied(false);

},2000);


};



return(

<main className="min-h-screen bg-black text-white px-6 py-10">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Referral
</h1>


<p className="text-zinc-400 mt-2">
Invite friends and grow with AlphaBot
</p>



<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<p className="text-zinc-400">
Your Referral Code
</p>


<h2 className="text-3xl font-bold text-yellow-400 mt-2">
{user?.referralCode || "Loading..."}
</h2>



<button

onClick={copyLink}

className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"

>

Copy Referral Link

</button>



{
copied &&

<p className="text-green-400 text-center mt-3">
Copied!
</p>

}


</div>



<div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<h3 className="font-bold text-xl">
Referral Rewards
</h3>


<p className="text-zinc-400 mt-3">
Earn rewards when your friends join and use AlphaBot services.
</p>


</div>



</div>


</main>

)

}
