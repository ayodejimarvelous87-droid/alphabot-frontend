"use client";

import {useEffect,useState} from "react";

export default function PartnerPayoutHistory(){

const [history,setHistory]=useState([]);
const [message,setMessage]=useState("");

const load=async()=>{

const token=localStorage.getItem("partnerToken");

if(!token){
setMessage("Please login");
return;
}

const res=await fetch(
"https://alphabot-1.onrender.com/blog-partner/payout-history",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

if(res.ok){
setHistory(data);
}else{
setMessage(data.message);
}

};


useEffect(()=>{
load();
},[]);


return(

<main className="
min-h-screen
bg-[#050505]
text-white
px-6
py-10
">

<div className="max-w-md mx-auto">


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
📜 Payout History
</h1>

<p>{message}</p>

<div className="mt-5 space-y-4">

{history.length===0 && (
<p>No payout history</p>
)}

{history.map(item=>(

<div
key={item._id}
className="
bg-gradient-to-b
from-[#18181B]
to-[#101012]
border
border-zinc-800
rounded-3xl
p-5
"
>

<p className="text-zinc-400">
Amount
</p>

<p className="text-2xl font-bold">
₦{item.commissionAmount}
</p>

<p className="mt-3 text-zinc-400">
Status
</p>

<p className="font-bold">
{item.status}
</p>

<p className="mt-3 text-zinc-400">
Period
</p>

<p>
{new Date(item.weekStart).toLocaleDateString()}
-
{new Date(item.weekEnd).toLocaleDateString()}
</p>

<p>
Date: {new Date(item.paidAt).toLocaleString()}
</p>

</div>

))}

</div>

</div>

</main>

);

}
