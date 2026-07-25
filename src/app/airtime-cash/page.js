"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";


export default function Page(){

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("MTN");
const [amount,setAmount]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [requests,setRequests]=useState([]);



const loadRequests=async()=>{

try{

const user=JSON.parse(localStorage.getItem("user"));

if(!user?.phone) return;


const res=await fetch(

`https://alphabot-1.onrender.com/airtime-cash/${user.phone}`,

{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}

);


const data=await res.json();

if(Array.isArray(data)){
setRequests(data);
}


}catch(error){

console.log(error);

}

};



useEffect(()=>{

loadRequests();

},[]);




const requestCash=async()=>{

try{

setLoading(true);
setMessage("Processing...");


const token=localStorage.getItem("token");


const res=await fetch(
"https://alphabot-1.onrender.com/airtime-cash",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone,
network,
amount:Number(amount)
})
}
);


const data=await res.json();


if(res.ok){

setMessage(`✅ ${data.message}`);

setAmount("");

loadRequests();

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
💵 Airtime Cash
</h1>


<p className="text-zinc-400">
Convert unused airtime into cash
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
Network Provider
</p>


<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={network}
onChange={(e)=>setNetwork(e.target.value)}
>

<option>MTN</option>
<option>AIRTEL</option>
<option>GLO</option>
<option>9MOBILE</option>

</select>

</div>




<input

className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"

placeholder="Airtime amount"

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

/>




<button

onClick={requestCash}

disabled={loading}

className="w-full bg-white text-black py-3 rounded-xl font-bold"

>

{
loading
?
"Processing..."
:
"Submit Request"
}

</button>



<p className="text-center text-sm text-zinc-400">
{message}
</p>


</div>




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5">

<h2 className="font-bold text-lg mb-4">
📄 My Airtime Cash Requests
</h2>


{
requests.length === 0
?
<p className="text-zinc-500 text-sm">
No requests yet
</p>
:
requests.map((item)=>(

<div
key={item._id}
className="border-b border-zinc-800 py-3"
>

<p>
{item.network} - ₦{item.amount}
</p>

<p className="text-sm text-zinc-400">
Cash Amount: ₦{item.cashAmount}
</p>

<p className="text-sm">
Status: {
item.status === "approved"
?
"✅ Approved"
:
"⏳ Pending"
}
</p>


</div>

))

}


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
