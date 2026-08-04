"use client";

import {useEffect,useState} from "react";

export default function PayoutDetails(){

const [form,setForm]=useState({
bankName:"",
accountNumber:"",
accountName:""
});

const [message,setMessage]=useState("");




const save=async()=>{

const token=localStorage.getItem("partnerToken");


const res=await fetch(
"https://alphabot-1.onrender.com/blog-partner/payout-details",
{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify(form)
}
);


const data=await res.json();


setMessage(
res.ok ? "✅ Payout details saved" : data.message
);

};



return(

<main className="
min-h-screen
bg-[#050505]
text-white
px-6
py-10
">

<div className="
max-w-md
mx-auto
">

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
mb-6
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


<h1 className="text-3xl font-black">
💳 Payout Details
</h1>


<p className="mt-2">
{message}
</p>


<div className="space-y-4 mt-5">


<input
className="w-full p-3.5 rounded-xl bg-[#050505] border border-zinc-800 outline-none focus:border-zinc-400"
placeholder="Bank Name"
value={form.bankName}
onChange={(e)=>setForm({...form,bankName:e.target.value})}
/>


<input
className="w-full p-3.5 rounded-xl bg-[#050505] border border-zinc-800 outline-none focus:border-zinc-400"
placeholder="Account Number"
value={form.accountNumber}
onChange={(e)=>setForm({...form,accountNumber:e.target.value})}
/>


<input
className="w-full p-3.5 rounded-xl bg-[#050505] border border-zinc-800 outline-none focus:border-zinc-400"
placeholder="Account Name"
value={form.accountName}
onChange={(e)=>setForm({...form,accountName:e.target.value})}
/>


<button
className="w-full bg-white text-black py-3 rounded-xl font-bold"
onClick={save}
>
Save Details
</button>


</div>

</div>

</div>
</main>

);

}
