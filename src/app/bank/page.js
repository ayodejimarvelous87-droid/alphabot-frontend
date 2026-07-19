"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page(){

const [bank,setBank]=useState(null);
const [message,setMessage]=useState("Loading...");


useEffect(()=>{

const loadBank = async()=>{

try{

const res = await fetch(
"https://alphabot-main.onrender.com/bank/"
);


const data = await res.json();


if(res.ok){

setBank(data);
setMessage("");

}else{

setMessage(data.message);

}


}catch(error){

setMessage("Connection error");

}

};


loadBank();

},[]);



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
🏦 Bank
</h1>


<p className="text-zinc-400 mt-2">
AlphaBot payment details
</p>



<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


{bank ? (

<div className="space-y-4">


<div>
<p className="text-zinc-400 text-sm">
Bank Name
</p>
<p className="font-bold text-xl">
{bank.bankName}
</p>
</div>


<div>
<p className="text-zinc-400 text-sm">
Account Number
</p>
<p className="font-bold text-xl">
{bank.accountNumber}
</p>
</div>


<div>
<p className="text-zinc-400 text-sm">
Account Name
</p>
<p className="font-bold text-xl">
{bank.accountName}
</p>
</div>


<div>
<p className="text-zinc-400 text-sm">
Instructions
</p>
<p>
{bank.instructions}
</p>
</div>


</div>

):(


<p className="text-center text-zinc-400">
{message}
</p>


)}


</div>



<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-8"
>
← Dashboard
</Link>


</div>

</main>

);

}
