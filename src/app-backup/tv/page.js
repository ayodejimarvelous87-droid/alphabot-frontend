"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function Page(){

const [phone,setPhone]=useState("");
const [provider,setProvider]=useState("DSTV");
const [smartCardNumber,setSmartCardNumber]=useState("");
const [tvPackage,setTvPackage]=useState("Basic");
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);


const subscribeTV = async()=>{

try{

setLoading(true);
setMessage("Processing...");

const token = localStorage.getItem("token");


const res = await fetch(
"https://alphabot-i7p2.onrender.com/tv/subscribe",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`
},
body:JSON.stringify({
phone,
provider,
smartCardNumber,
package:tvPackage,
amount:Number(amount),
pin
})
}
);


const data = await res.json();


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

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">

<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
📺 TV
</h1>

<p className="text-zinc-400 mt-2">
Renew your TV subscription
</p>


<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>


<select
className="w-full mt-4 bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
value={provider}
onChange={(e)=>setProvider(e.target.value)}
>

<option>DSTV</option>
<option>GOTV</option>
<option>Startimes</option>

</select>


<input
className="w-full mt-4 bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
placeholder="Smart card / IUC number"
value={smartCardNumber}
onChange={(e)=>setSmartCardNumber(e.target.value)}
/>


<select
className="w-full mt-4 bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
value={tvPackage}
onChange={(e)=>setTvPackage(e.target.value)}
>

<option>Basic</option>
<option>Standard</option>
<option>Premium</option>

</select>


<input
className="w-full mt-4 bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
placeholder="Amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>


<input
className="w-full mt-4 bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
placeholder="Transaction PIN"
type="password"
maxLength="4"
value={pin}
onChange={(e)=>setPin(e.target.value)}
/>


<button
onClick={subscribeTV}
disabled={loading}
className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
{loading ? "Processing..." : "Subscribe TV"}
</button>


<p className="text-center text-zinc-300 text-sm mt-4">
{message}
</p>


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
