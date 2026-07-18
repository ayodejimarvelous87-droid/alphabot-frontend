"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function Page(){

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("MTN");
const [amount,setAmount]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);


const requestCash = async()=>{

try{

setLoading(true);
setMessage("Processing...");

const token = localStorage.getItem("token");


const res = await fetch(
"https://alphabot-i7p2.onrender.com/airtime-cash",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`
},
body:JSON.stringify({
phone,
network,
amount:Number(amount)
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
💵 Airtime Cash
</h1>

<p className="text-zinc-400 mt-2">
Convert airtime to cash
</p>


<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>


<select
className="w-full mt-4 bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
value={network}
onChange={(e)=>setNetwork(e.target.value)}
>

<option>MTN</option>
<option>Airtel</option>
<option>Glo</option>
<option>9mobile</option>

</select>


<input
className="w-full mt-4 bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
placeholder="Airtime amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>


<button
onClick={requestCash}
disabled={loading}
className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"
>
{loading ? "Processing..." : "Submit Request"}
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
