"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function Page(){

const [phone,setPhone]=useState("");
const [provider,setProvider]=useState("Bet9ja");
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);



const fundBetting=async()=>{

try{

setLoading(true);
setMessage("Processing...");


const token=localStorage.getItem("token");


const res=await fetch(
"https://alphabot-1.onrender.com/betting/fund",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone,
provider,
amount:Number(amount),
pin
})
}
);


const data=await res.json();


if(res.ok){

setMessage(`✅ ${data.message}`);

}else{

setMessage(`❌ ${data.message}`);

}


}catch(error){

setMessage("❌ Connection error");

}finally{

setLoading(false);

}

};



return(

<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto space-y-5">



<h1 className="text-3xl font-black">
🎮 Betting
</h1>


<p className="text-zinc-400">
Fund your betting wallet instantly
</p>




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">



<div>

<p className="text-xs text-zinc-500 mb-2">
Phone Number
</p>

<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>




<div>

<p className="text-xs text-zinc-500 mb-2">
Betting Platform
</p>


<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={provider}
onChange={(e)=>setProvider(e.target.value)}
>

<option>
Bet9ja
</option>

<option>
SportyBet
</option>

<option>
1xBet
</option>

</select>

</div>




<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>




<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Transaction PIN"
type="password"
maxLength="4"
value={pin}
onChange={(e)=>setPin(e.target.value)}
/>




<button
onClick={fundBetting}
disabled={loading}
className="w-full bg-white text-black py-3 rounded-xl font-bold hover:scale-105 transition"
>

{
loading
?"Processing..."
:"Fund Betting"
}

</button>



<p className="text-center text-sm text-zinc-400">
{message}
</p>



</div>




<Link
href="/dashboard"
className="block text-center text-zinc-400 mt-6"
>
← Dashboard
</Link>



</div>


</main>

);

}
