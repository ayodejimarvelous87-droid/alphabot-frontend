"use client";

import { useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";

export default function Page(){

const [phone,setPhone]=useState("");
const [disco,setDisco]=useState("IKEDC");
const [meterNumber,setMeterNumber]=useState("");
const [meterType,setMeterType]=useState("prepaid");
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);


const payElectricity = async()=>{

try{

setLoading(true);
setMessage("Processing...");

const token = localStorage.getItem("token");


const res = await fetch(
"https://alphabot-1.onrender.com/electricity/pay",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`
},
body:JSON.stringify({
phone,
disco,
meterNumber,
meterType,
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

<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto space-y-5">


<div>

<h1 className="text-3xl font-black">
⚡ Electricity
</h1>

<p className="text-zinc-400 mt-2">
Pay your electricity bills securely
</p>

</div>




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-5">



<div>

<p className="text-xs text-zinc-500 uppercase">
Phone Number
</p>


<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>





<div>

<p className="text-xs text-zinc-500 uppercase">
Distribution Company
</p>


<select

className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white"

value={disco}

onChange={(e)=>setDisco(e.target.value)}

>

<option>IKEDC</option>
<option>EEDC</option>
<option>EKEDC</option>
<option>PHED</option>

</select>


</div>





<div>

<p className="text-xs text-zinc-500 uppercase">
Meter Number
</p>


<input

className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white"

placeholder="Enter meter number"

value={meterNumber}

onChange={(e)=>setMeterNumber(e.target.value)}

/>


</div>





<div>

<p className="text-xs text-zinc-500 uppercase">
Meter Type
</p>


<select

className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white"

value={meterType}

onChange={(e)=>setMeterType(e.target.value)}

>


<option value="prepaid">
Prepaid
</option>


<option value="postpaid">
Postpaid
</option>


</select>


</div>





<div>

<p className="text-xs text-zinc-500 uppercase">
Amount
</p>


<input

className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white"

placeholder="Amount"

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

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

onClick={payElectricity}

disabled={loading}

className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg"

>

{loading ? "Processing..." : "⚡ Pay Electricity"}

</button>





{message && (

<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4 text-center">

{message}

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

);


}
