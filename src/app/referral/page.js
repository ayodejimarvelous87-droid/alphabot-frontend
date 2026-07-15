"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Referral(){

const [code,setCode]=useState("");
const [copied,setCopied]=useState(false);


useEffect(()=>{

const saved=localStorage.getItem("user");

if(saved){

const user=JSON.parse(saved);

setCode(user.referralCode || "ALPHABOT");

}

},[]);



const copyCode=()=>{

navigator.clipboard.writeText(code);

setCopied(true);

setTimeout(()=>{
setCopied(false);
},2000);

};



return(

<main className="min-h-screen bg-black text-white px-5 py-8">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Referral 🎁
</h1>


<p className="text-zinc-400 mt-2">
Invite friends and earn rewards
</p>





<div className="mt-8 bg-gradient-to-br from-yellow-300 to-yellow-600 text-black rounded-3xl p-6">


<p className="font-semibold">
Your Referral Code
</p>


<h2 className="text-3xl font-bold mt-4">
{code}
</h2>



<button

onClick={copyCode}

className="mt-5 bg-black text-white px-5 py-3 rounded-xl font-bold"

>
{copied ? "Copied!" : "Copy Code"}
</button>


</div>







<div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Referral Earnings
</h2>


<p className="text-yellow-400 text-3xl font-bold mt-4">
₦0
</p>


<p className="text-zinc-400 mt-2">
Your rewards will appear here.
</p>


</div>







<div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<h2 className="text-xl font-bold">
How it works
</h2>


<ul className="text-zinc-400 mt-4 space-y-3">

<li>1. Share your referral code</li>

<li>2. Friends create an AlphaBot account</li>

<li>3. Earn rewards when they use services</li>


</ul>


</div>





<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-8"
>
← Back to Dashboard
</Link>


</div>


</main>

);

}
