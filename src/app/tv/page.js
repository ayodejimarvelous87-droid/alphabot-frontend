"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page(){

const [provider,setProvider]=useState("dstv");
const [smartCardNumber,setSmartCardNumber]=useState("");
const [tvPackage,setTvPackage]=useState("");
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [plans,setPlans]=useState([]);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);


useEffect(()=>{

const loadPlans = async()=>{

try{

const token = localStorage.getItem("token");

const res = await fetch(
"https://alphabot-1.onrender.com/tv/plans",
{
headers:{
"Authorization":`Bearer ${token}`
}
}
);

const data = await res.json();

if(data.success){
setPlans(data.plans);
        console.log("TV PLANS:", data.plans);
}

}catch(error){

console.log(error);

}

};

loadPlans();

},[]);



const subscribeTV = async()=>{

try{

setLoading(true);
setMessage("Processing...");

const token = localStorage.getItem("token");


const res = await fetch(
"https://alphabot-1.onrender.com/tv/subscribe",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`
},
body:JSON.stringify({
provider,
smartCardNumber,
variation_id:tvPackage,
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





<select
className="w-full mt-4 bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
value={provider}
onChange={(e)=>{
setProvider(e.target.value);
setTvPackage("");
setAmount("");
}}
>

<option value="dstv">DStv</option>
<option value="gotv">GOtv</option>
<option value="startimes">Startimes</option>

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
onChange={(e)=>{

const selected = plans.find(
p=>p.code === e.target.value
);

setTvPackage(e.target.value);

if(selected){
setAmount(selected.price);
}

}}
>

<option value="">
Select Package
</option>

{
plans
.filter(p=>p.provider === provider)
.map(plan=>(

<option
key={plan.code}
value={plan.code}
>
{plan.name} - ₦{plan.price}
</option>

))
}

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
