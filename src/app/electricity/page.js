"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import SuccessCelebration from "@/components/success-celebration";
import { authenticateWithBiometric } from "@/lib/biometric";

export default function Page(){

const router=useRouter();
const searchParams=useSearchParams();

const [phone,setPhone]=useState("");
const [disco,setDisco]=useState("ikeja-electric");
const [meterNumber,setMeterNumber]=useState("");
const [meterType,setMeterType]=useState("prepaid");
const [amount,setAmount]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [showSuccess,setShowSuccess]=useState(false);
const [biometricLoading,setBiometricLoading]=useState(false);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);

useEffect(()=>{

const savedState =
sessionStorage.getItem("alphaBotElectricityPurchaseState");

if(savedState){

try{

const state=JSON.parse(savedState);

if(state.phone !== undefined)
setPhone(state.phone);

if(state.disco !== undefined)
setDisco(state.disco);

if(state.meterNumber !== undefined)
setMeterNumber(state.meterNumber);

if(state.meterType !== undefined)
setMeterType(state.meterType);

if(state.amount !== undefined)
setAmount(state.amount);

}catch(error){

console.log(
"Unable to restore electricity purchase state:",
error.message
);

}

}

setPurchaseStateRestored(true);

},[searchParams]);


const payElectricity = async()=>{

try{

setLoading(true);
setMessage("Processing...");

const token = localStorage.getItem("token");
const biometricToken =
localStorage.getItem("biometricToken");


const res = await fetch(
"https://api.alphabothq.com/electricity/pay",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`,
"Idempotency-Key":
typeof crypto !== "undefined" && crypto.randomUUID
? crypto.randomUUID()
: `${Date.now()}-${Math.random()}`
},
body:JSON.stringify({
phone,
disco,
meterNumber,
meterType,
amount:Number(amount),
biometricToken: biometricToken || undefined
})
}
);


const data = await res.json();


if(res.ok){

sessionStorage.removeItem(
"alphaBotElectricityPurchaseState"
);

setMessage(`✅ ${data.message}`);
setShowSuccess(true);
setTimeout(()=>setShowSuccess(false),3000);

}else{

setMessage(`❌ ${data.message}`);

}


}catch(error){

setMessage("❌ Connection error");

}finally{

localStorage.removeItem("biometricToken");

setLoading(false);

}

};


return(
<>
<SuccessCelebration
  show={showSuccess}
  message="🎉 Electricity payment successful!"
/>

<main className="min-h-screen bg-white text-black dark:bg-[#050505] dark:text-white px-4 py-6 pb-28">

<div className="max-w-md mx-auto space-y-5">

{/* HEADER */}

<header className="pt-2">

<Link
href="/dashboard"
className="inline-flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-5"
>
← Dashboard
</Link>

<p className="text-[10px] font-black tracking-[0.25em] text-yellow-500 uppercase">
AlphaBot Services
</p>

<h1 className="text-3xl font-black tracking-tight mt-1">
Electricity
</h1>

<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
Pay your electricity bill quickly and securely.
</p>

</header>


{/* PAYMENT CARD */}

<section className="relative overflow-hidden bg-white border border-zinc-200 dark:bg-gradient-to-br dark:from-[#1B1B1F] dark:via-[#111113] dark:to-[#080808] dark:border-zinc-800 rounded-[30px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

<div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-yellow-400/10 blur-3xl" />

<div className="relative">

{/* SERVICE TITLE */}

<div className="flex items-center gap-3 mb-6">

<div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-2xl">
⚡
</div>

<div>
<h2 className="font-black text-lg">
Electricity Payment
</h2>

<p className="text-xs text-zinc-500 dark:text-zinc-400">
Secure utility payment
</p>
</div>

</div>


{/* PHONE */}

<div className="mb-4">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Phone Number
</p>

<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>


{/* DISCO */}

<div className="mb-4">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Distribution Company
</p>

<select
className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-800 dark:text-white outline-none focus:border-yellow-400 transition"
value={disco}
onChange={(e)=>setDisco(e.target.value)}
>

<option value="ikeja-electric">Ikeja Electric (IKEDC)</option>
<option value="eko-electric">Eko Electric (EKEDC)</option>
<option value="abuja-electric">Abuja Electric (AEDC)</option>
<option value="ibadan-electric">Ibadan Electric (IBEDC)</option>
<option value="enugu-electric">Enugu Electric (EEDC)</option>
<option value="portharcourt-electric">Port Harcourt Electric (PHED)</option>
<option value="kaduna-electric">Kaduna Electric (KAEDCO)</option>
<option value="jos-electric">Jos Electric (JED)</option>
<option value="benin-electric">Benin Electric (BEDC)</option>
<option value="aba-electric">Aba Electric (ABEDC)</option>
<option value="yola-electric">Yola Electric (YEDC)</option>
<option value="kano-electric">Kano Electric (KEDCO)</option>

</select>

</div>


{/* METER NUMBER */}

<div className="mb-4">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Meter Number
</p>

<input
className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition"
placeholder="Enter meter number"
value={meterNumber}
onChange={(e)=>setMeterNumber(e.target.value)}
/>

</div>


{/* METER TYPE */}

<div className="mb-4">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Meter Type
</p>

<div className="grid grid-cols-2 gap-3">

<button
type="button"
onClick={()=>setMeterType("prepaid")}
className={`p-4 rounded-2xl border font-bold transition ${
meterType === "prepaid"
? "bg-yellow-400 text-black border-yellow-400"
: "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-[#050505] dark:text-zinc-400 dark:border-zinc-800"
}`}
>
Prepaid
</button>

<button
type="button"
onClick={()=>setMeterType("postpaid")}
className={`p-4 rounded-2xl border font-bold transition ${
meterType === "postpaid"
? "bg-yellow-400 text-black border-yellow-400"
: "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-[#050505] dark:text-zinc-400 dark:border-zinc-800"
}`}
>
Postpaid
</button>

</div>

</div>


{/* AMOUNT */}

<div className="mb-5">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Amount
</p>

<div className="relative">

<span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
₦
</span>

<input
className="w-full p-4 pl-9 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-800 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition"
placeholder="Enter amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

</div>

</div>


{/* SECURITY */}

<div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-green-500/5 border border-green-500/10 mb-5">

<span>🔒</span>

<p className="text-[10px] text-zinc-500">
Your payment is protected by AlphaBot secure transaction verification.
</p>

</div>


{/* PIN */}

<button
type="button"
onClick={()=>{

sessionStorage.setItem(
"alphaBotElectricityPurchaseState",
JSON.stringify({
phone,
disco,
meterNumber,
meterType,
amount
})
);

router.push(
"/enter-pin?return=/electricity&service=electricity"
);

}}
disabled={loading || biometricLoading}
className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black text-base active:scale-[0.98] transition disabled:opacity-50"
>

{loading ? "Processing..." : "🔐 Continue with PIN"}

</button>


{/* FINGERPRINT */}

<button
type="button"
onClick={async()=>{

try{

setBiometricLoading(true);
setMessage("Touch your fingerprint...");

await authenticateWithBiometric();

setMessage("Fingerprint verified.");

await payElectricity();

}catch(error){

localStorage.removeItem("biometricToken");

setMessage("❌ " + error.message);

}finally{

setBiometricLoading(false);

}

}}
disabled={loading || biometricLoading}
className="w-full mt-3 bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-800 dark:text-white py-4 rounded-2xl font-black text-base active:scale-[0.98] transition disabled:opacity-50"
>

{biometricLoading
? "Touch fingerprint..."
: "👆 Pay with Fingerprint"}

</button>


{/* MESSAGE */}

{message && (

<div className="mt-4 bg-white border border-zinc-200 text-zinc-700 dark:bg-[#050505] dark:border-zinc-800 dark:text-white rounded-2xl p-4 text-center text-sm">

{message}

</div>

)}

</div>

</section>


{/* TRUST CARDS */}

<div className="grid grid-cols-3 gap-2">

<div className="rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 p-3 text-center">

<p className="text-lg">⚡</p>

<p className="text-[9px] text-zinc-500 mt-1 font-bold">
FAST
</p>

</div>


<div className="rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 p-3 text-center">

<p className="text-lg">🔒</p>

<p className="text-[9px] text-zinc-500 mt-1 font-bold">
SECURE
</p>

</div>


<div className="rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 p-3 text-center">

<p className="text-lg">✓</p>

<p className="text-[9px] text-zinc-500 mt-1 font-bold">
RELIABLE
</p>

</div>

</div>

</div>

</main>

</>
);

}
