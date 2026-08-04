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

<div className="p-6">

<h1 className="text-2xl font-bold">
💳 Payout Details
</h1>


<p className="mt-2">
{message}
</p>


<div className="space-y-4 mt-5">


<input
className="border p-3 rounded w-full"
placeholder="Bank Name"
value={form.bankName}
onChange={(e)=>setForm({...form,bankName:e.target.value})}
/>


<input
className="border p-3 rounded w-full"
placeholder="Account Number"
value={form.accountNumber}
onChange={(e)=>setForm({...form,accountNumber:e.target.value})}
/>


<input
className="border p-3 rounded w-full"
placeholder="Account Name"
value={form.accountName}
onChange={(e)=>setForm({...form,accountName:e.target.value})}
/>


<button
className="bg-black text-white px-5 py-3 rounded"
onClick={save}
>
Save Details
</button>


</div>

</div>

);

}
