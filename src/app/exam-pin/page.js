"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function Page(){

const [phone,setPhone]=useState("");
const [exam,setExam]=useState("WAEC");
const [quantity,setQuantity]=useState(1);
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);


const buyExamPin = async()=>{

try{

setLoading(true);
setMessage("Processing...");

const token=localStorage.getItem("token");


const res=await fetch(
"https://alphabot-1.onrender.com/exam-pin",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone,
exam,
quantity:Number(quantity),
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
🎓 Exam PIN
</h1>


<p className="text-zinc-400">
Get your examination PIN instantly
</p>



<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">



<div>
<p className="text-xs text-zinc-500 mb-2">
Candidate Phone
</p>

<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>




<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={exam}
onChange={(e)=>setExam(e.target.value)}
>

<option>WAEC</option>
<option>NECO</option>
<option>JAMB</option>

</select>




<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Quantity"
type="number"
min="1"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
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
onClick={buyExamPin}
disabled={loading}
className="w-full bg-white text-black py-3 rounded-xl font-bold hover:scale-105 transition"
>

{
loading
?"Processing..."
:"Buy Exam PIN"
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
