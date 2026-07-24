"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const API="https://alphabot-1.onrender.com";

export default function RecurringPage(){

const [payments,setPayments]=useState([]);
const [service,setService]=useState("data");
const [amount,setAmount]=useState("");
const [targetPhone,setTargetPhone]=useState("");
const [frequency,setFrequency]=useState("daily");
const [loading,setLoading]=useState(false);
const [message,setMessage]=useState("");

const user =
typeof window !== "undefined"
? JSON.parse(localStorage.getItem("user") || "{}")
: {};

const token =
typeof window !== "undefined"
? localStorage.getItem("token")
: null;


const loadPayments=async()=>{

try{

if(!user.phone) return;

const res=await fetch(
`${API}/recurring/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setPayments(data || []);

}catch(error){

console.log(error);

}

};


useEffect(()=>{

loadPayments();

},[]);



const createPayment=async()=>{

if(!targetPhone || !amount){

setMessage("❌ Enter phone number and amount");
return;

}


try{

setLoading(true);
setMessage("Processing...");


const res=await fetch(
`${API}/recurring`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone:user.phone,
targetPhone,
service,
amount:Number(amount),
frequency
})
}
);


const data=await res.json();


if(!res.ok){

setMessage("❌ "+(data.message || "Failed"));

return;

}


setMessage("✅ Recurring payment activated");

setAmount("");

loadPayments();


}catch(error){

setMessage("❌ Connection error");

}finally{

setLoading(false);

}

};



const cancelPayment=async(id)=>{

try{

await fetch(
`${API}/recurring/${id}`,
{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
}
);

setMessage("✅ Payment cancelled");

loadPayments();


}catch(error){

setMessage("❌ Error cancelling payment");

}

};



return(

<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto space-y-5">


<h1 className="text-3xl font-black">
🔁 Recurring Payments
</h1>


<p className="text-zinc-400">
Automate your airtime and data subscriptions
</p>



<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">


<div>

<p className="text-xs text-zinc-500 mb-2">
Service
</p>

<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={service}
onChange={(e)=>setService(e.target.value)}
>

<option value="data">
🌐 Data
</option>

<option value="airtime">
📱 Airtime
</option>

</select>

</div>



<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Phone number"
type="tel"
value={targetPhone}
onChange={(e)=>setTargetPhone(e.target.value)}
/>



<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>



<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={frequency}
onChange={(e)=>setFrequency(e.target.value)}
>

<option value="daily">
Daily
</option>

<option value="weekly">
Weekly
</option>

<option value="monthly">
Monthly
</option>

</select>



<button
onClick={createPayment}
disabled={loading}
className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>

{loading ? "Activating..." : "Activate Schedule"}

</button>


<p className="text-center text-sm text-zinc-400">
{message}
</p>


</div>




<h2 className="text-xl font-bold">
Active Payments
</h2>



<div className="space-y-3">

{

payments.map(item=>(

<div
key={item._id}
className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4"
>

<p className="font-bold">
{item.service.toUpperCase()}
</p>

<p className="text-zinc-400 mt-1">
₦{item.amount} • {item.frequency}
</p>


<button
onClick={()=>cancelPayment(item._id)}
className="mt-3 bg-red-600 text-white px-4 py-2 rounded-xl"
>

Cancel

</button>


</div>

))

}


</div>



<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-6"
>
← Dashboard
</Link>


</div>


<BottomNav />

</main>

);

}
