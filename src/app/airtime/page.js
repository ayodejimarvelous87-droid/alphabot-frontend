"use client";

import { useState,useEffect } from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function Airtime(){
const searchParams = useSearchParams();

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("MTN");
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
  const [beneficiaries,setBeneficiaries]=useState([]);


useEffect(()=>{
const savedPhone = searchParams.get("phone");

if(savedPhone){
setPhone(savedPhone);
}
const loadBeneficiaries=async()=>{
try{
const user=JSON.parse(localStorage.getItem("user"));
if(!user?.phone)return;

const res=await fetch(`https://alphabot-1.onrender.com/beneficiaries/${user.phone}`,{
headers:{Authorization:"Bearer "+localStorage.getItem("token")}
});

const data=await res.json();
setBeneficiaries(data);

}catch(error){
console.log(error);
}
};

loadBeneficiaries();

},[]);

const buyAirtime = async()=>{

try{

setLoading(true);
setMessage("Processing...");

const token = localStorage.getItem("token");


const res = await fetch(
"https://alphabot-1.onrender.com/airtime/buy",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`
},
body:JSON.stringify({
phone,
network,
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
📱 Airtime
</h1>


<p className="text-zinc-400 mt-2">
Buy airtime instantly
</p>



<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">


<select
className="w-full bg-white text-black dark:bg-black dark:text-white border border-zinc-700 rounded-xl p-3"
value={network}
onChange={(e)=>setNetwork(e.target.value)}
>

<option>MTN</option>
<option>Airtel</option>
<option>Glo</option>
<option>9mobile</option>

</select>



<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
beneficiaries={beneficiaries}
  service="airtime"
/>



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
onClick={buyAirtime}
disabled={loading}
className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"
>

{loading ? "Processing..." : "Buy Airtime"}

</button>



<p className="text-center mt-4 text-zinc-300 text-sm">
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
