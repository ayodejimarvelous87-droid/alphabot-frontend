"use client";

import {useState,useEffect} from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function RechargePin(){

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("MTN");
const [amount,setAmount]=useState("");
const [quantity,setQuantity]=useState(1);
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [epinResult,setEpinResult]=useState(null);
const [loading,setLoading]=useState(false);
const [beneficiaries,setBeneficiaries]=useState([]);


useEffect(()=>{

const loadData=async()=>{

try{

const user=JSON.parse(localStorage.getItem("user"));

if(!user?.phone)return;

setPhone(user.phone);


const res=await fetch(
`https://alphabot-1.onrender.com/beneficiaries/${user.phone}`,
{
headers:{
Authorization:"Bearer "+localStorage.getItem("token")
}
}
);


const data=await res.json();

setBeneficiaries(data);


}catch(error){

console.log(error);

}

};


loadData();


},[]);



const buyRechargePin=async()=>{

try{

setLoading(true);
setMessage("Processing...");
setEpinResult(null);


const res=await fetch(
"https://alphabot-1.onrender.com/epin/buy",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},

body:JSON.stringify({

phone,
network,
amount:Number(amount),
quantity:Number(quantity),
pin

})

}
);


const data=await res.json();


if(res.ok){

setMessage("✅ Recharge PIN purchased successfully");

setEpinResult(data.epin);


}else{

setMessage("❌ "+data.message);

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


<div>

<h1 className="text-3xl font-black">
💳 Recharge PIN
</h1>

<p className="text-zinc-400 mt-2">
Buy recharge PIN instantly for all networks
</p>

</div>



<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-5">



<div>

<p className="text-xs text-zinc-500 uppercase">
Network Provider
</p>

<select
className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white"
value={network}
onChange={(e)=>setNetwork(e.target.value)}
>

<option>MTN</option>
<option>AIRTEL</option>
<option>GLO</option>
<option>9MOBILE</option>

</select>

</div>



<div>

<p className="text-xs text-zinc-500 uppercase">
Receiver
</p>


<PhoneInput

value={phone}

onChange={setPhone}

beneficiaries={beneficiaries}

service="recharge-pin"

/>


</div>




<div>

<p className="text-xs text-zinc-500 uppercase">
Amount
</p>


<input

className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white"

placeholder="Enter amount"

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

/>

</div>



<div>

<p className="text-xs text-zinc-500 uppercase">
Quantity
</p>


<input

className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white"

type="number"

value={quantity}

onChange={(e)=>setQuantity(e.target.value)}

/>

</div>




<div>

<p className="text-xs text-zinc-500 uppercase">
Transaction PIN
</p>


<input

className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white"

placeholder="4 digit PIN"

type="password"

maxLength="4"

value={pin}

onChange={(e)=>setPin(e.target.value)}

/>


</div>


</div>




<button

onClick={buyRechargePin}

disabled={loading}

className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg"

>

{loading ? "Processing..." : "⚡ Buy Recharge PIN"}

</button>




{message && (

<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4 text-center text-sm">

{message}

</div>

)}




{epinResult && (

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5">

<h2 className="font-black text-xl">
🎉 Your Recharge PIN
</h2>


<p className="mt-3">
Network: {epinResult.network.toUpperCase()}
</p>


<p className="mt-2">
PIN:
</p>


<div className="text-xl font-black break-all">

{epinResult.pins.join(", ")}

</div>


<p className="text-zinc-400 mt-3 text-sm">

Dial *311*PIN# to recharge

</p>


</div>

)}




<Link

href="/dashboard"

className="block text-center text-zinc-400 mt-6"

>

← Dashboard

</Link>



</div>


</main>

)

}
