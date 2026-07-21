"use client";

import {useEffect,useState} from "react";
import Link from "next/link";

export default function Beneficiary(){

const [name,setName]=useState("");
const [beneficiaryPhone,setBeneficiaryPhone]=useState("");
const [service,setService]=useState("airtime");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [list,setList]=useState([]);


const API="https://alphabot-1.onrender.com";


const serviceIcon=(type)=>{

if(type==="airtime") return "📱";
if(type==="data") return "🌐";
if(type==="electricity") return "⚡";
if(type==="tv") return "📺";

return "🛒";

};



const loadBeneficiaries=async()=>{

try{

const token=localStorage.getItem("token");

const res=await fetch(
`${API}/beneficiary/all`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setList(data || []);


}catch(error){

console.log(error);

}

};



useEffect(()=>{

loadBeneficiaries();

},[]);




const saveBeneficiary=async()=>{


if(!name || !beneficiaryPhone){

setMessage("Enter beneficiary name and phone");
return;

}


try{

setLoading(true);


const res=await fetch(
`${API}/beneficiary/add`,
{
method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},

body:JSON.stringify({

name,
beneficiary_phone:beneficiaryPhone,
service

})

}
);


const data=await res.json();


if(!res.ok){

throw new Error(data.message || "Failed");

}


setMessage("✅ Beneficiary saved");


setName("");
setBeneficiaryPhone("");

loadBeneficiaries();


}catch(error){

setMessage("❌ "+error.message);


}finally{

setLoading(false);

}


};



return(

<main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
👥 Beneficiaries
</h1>


<p className="text-zinc-500 mt-2">
Save numbers for faster purchases
</p>



<div className="mt-8 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black rounded-3xl p-6 shadow-xl space-y-4">

<h2 className="font-bold text-xl">
➕ Add New Beneficiary
</h2>

<p className="text-sm text-zinc-500">
Save a number for faster airtime, data and bill payments
</p>

<input
className="w-full p-4 rounded-2xl bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-yellow-400 outline-none"
placeholder="Beneficiary name"
value={name}
onChange={e=>setName(e.target.value)}
/>

<input
className="w-full p-4 rounded-2xl bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-yellow-400 outline-none"
placeholder="Phone number"
value={beneficiaryPhone}
onChange={e=>setBeneficiaryPhone(e.target.value)}
/>

<select
className="w-full p-4 rounded-2xl bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700"
value={service}
onChange={e=>setService(e.target.value)}
>
<option value="airtime">📱 Airtime</option>
<option value="data">🌐 Data</option>
<option value="electricity">⚡ Electricity</option>
<option value="tv">📺 TV</option>
</select>

<button
disabled={loading}
onClick={saveBeneficiary}
className="w-full bg-yellow-400 text-black p-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
>
{loading ? "Saving..." : "Save Beneficiary 🚀"}
</button>

</div>



<p className="mt-4 font-semibold text-center">
{message}
</p>




<h2 className="text-xl font-bold mt-10">
Saved Numbers
</h2>



<div className="space-y-4 mt-5">


{list.length===0 ? (

<div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6 text-center text-zinc-500">
No beneficiaries saved yet 🚀
</div>

) : (


list.map((item,index)=>(


<div
key={index}
className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-lg"
>

<div className="flex items-center justify-between">

<div>
<h3 className="font-bold text-xl">
{item.name}
</h3>

<p className="text-zinc-500 mt-2">
📞 {item.beneficiary_phone}
</p>

<p className="text-sm mt-2 font-semibold">
{serviceIcon(item.service)} {item.service.toUpperCase()}
</p>

</div>

<div className="text-4xl bg-yellow-400 rounded-2xl p-3">
{serviceIcon(item.service)}
</div>

</div>

<Link
href={
item.service==="airtime"
? `/airtime?phone=${item.beneficiary_phone}`
: item.service==="data"
? `/data?phone=${item.beneficiary_phone}`
: item.service==="tv"
? `/tv?phone=${item.beneficiary_phone}`
: `/electricity?phone=${item.beneficiary_phone}`
}
className="block mt-5 text-center bg-yellow-400 text-black py-3 rounded-2xl font-bold shadow-md hover:scale-105 transition"
>
Buy Again 🚀
</Link>

</div>


))


)}



</div>



<Link
href="/dashboard"
className="block text-center text-yellow-400 mt-10"
>
← Dashboard
</Link>


</div>


</main>

)

}
