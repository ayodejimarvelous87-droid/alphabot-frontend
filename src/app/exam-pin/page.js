"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import PhoneInput from "@/components/PhoneInput";
import Link from "next/link";
import SuccessCelebration from "@/components/success-celebration";
import { authenticateWithBiometric } from "@/lib/biometric";

export default function Page(){

const router=useRouter();
const [phone,setPhone]=useState("");
const [exam,setExam]=useState("WAEC");
const [quantity,setQuantity]=useState(1);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [biometricLoading,setBiometricLoading]=useState(false);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);
const [purchaseIdempotencyKey,setPurchaseIdempotencyKey]=useState("");
const [showSuccess,setShowSuccess]=useState(false);

useEffect(()=>{

const savedState =
sessionStorage.getItem("alphaBotExamPinPurchaseState");

if(savedState){

try{

const state=JSON.parse(savedState);

if(state.phone !== undefined)
setPhone(state.phone);

if(state.exam !== undefined)
setExam(state.exam);

if(state.quantity !== undefined)
setQuantity(state.quantity);

}catch(error){

console.log(
"Unable to restore exam PIN purchase state:",
error.message
);

}

}

setPurchaseStateRestored(true);

},[]);


const buyExamPin = async()=>{

try{

const biometricToken =
localStorage.getItem("biometricToken");

if(
  !phone ||
  !exam ||
  !quantity ||
  !biometricToken
){
  setMessage("❌ Please authorize the transaction");
  return;
}

if(Number(quantity) <= 0){
  setMessage("❌ Enter a valid quantity");
  return;
}

setLoading(true);
setMessage("Processing...");

const token=localStorage.getItem("token");

const idempotencyKey =
purchaseIdempotencyKey ||
(
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`
);

if(!purchaseIdempotencyKey){
  setPurchaseIdempotencyKey(idempotencyKey);
}

const res=await fetch(
"https://api.alphabothq.com/exam-pin",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`,
"Idempotency-Key":idempotencyKey
},
body:JSON.stringify({
phone,
exam,
quantity:Number(quantity),
biometricToken: biometricToken || undefined
})
}
);

const data=await res.json();

if(res.ok){

sessionStorage.removeItem(
"alphaBotExamPinPurchaseState"
);

setPurchaseIdempotencyKey("");

setMessage(`✅ ${data.message}`);

setShowSuccess(true);

setTimeout(
()=>setShowSuccess(false),
3000
);

setQuantity(1);

}else{

setMessage(
`❌ ${data.message || data.error || "Exam PIN purchase failed"}`
);

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
  message="🎉 Exam PIN purchase successful!"
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
Exam PIN
</h1>

<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
Get examination PINs instantly and securely.
</p>

</header>


{/* HERO */}

<section className="relative overflow-hidden bg-white border border-zinc-200 dark:bg-gradient-to-br dark:from-[#1B1B1F] dark:via-[#111113] dark:to-[#080808] dark:border-zinc-800 rounded-[30px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

<div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-yellow-400/10 blur-3xl" />

<div className="relative">

<div className="flex items-center gap-3 mb-6">

<div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-2xl">
🎓
</div>

<div>
<h2 className="font-black text-lg">
Examination PIN
</h2>

<p className="text-xs text-zinc-500">
Instant digital delivery
</p>
</div>

</div>


{/* PHONE */}

<div className="mb-4">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Candidate Phone
</p>

<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>


{/* EXAM TYPE */}

<div className="mb-5">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Examination
</p>

<div className="grid grid-cols-3 gap-2">

{["WAEC","NECO","JAMB"].map((item)=>(

<button
key={item}
type="button"
onClick={()=>setExam(item)}
className={`py-3.5 rounded-2xl border font-black text-sm transition ${
exam === item
? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/10"
: "bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-[#050505] dark:text-zinc-400 dark:border-zinc-800 active:scale-95"
}`}
>
{item}
</button>

))}

</div>

</div>


{/* QUANTITY */}

<div className="mb-5">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Quantity
</p>

<div className="flex items-center gap-3">

<button
type="button"
onClick={()=>setQuantity(Math.max(1, Number(quantity) - 1))}
className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-800 dark:text-white text-xl font-black active:scale-90 transition"
>
−
</button>

<div className="flex-1 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 dark:bg-[#050505] dark:border-zinc-800 flex items-center justify-center">

<span className="text-xl font-black">
{quantity}
</span>

<span className="text-xs text-zinc-600 ml-2">
PIN{Number(quantity) === 1 ? "" : "s"}
</span>

</div>

<button
type="button"
onClick={()=>setQuantity(Number(quantity) + 1)}
className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 dark:bg-[#050505] dark:border-zinc-800 dark:text-white text-xl font-black active:scale-90 transition"
>
+
</button>

</div>

</div>


{/* SECURITY */}

<div className="flex items-center gap-2 px-3 py-3 rounded-2xl bg-green-500/5 border border-green-500/10 mb-5">

<span>🔒</span>

<p className="text-[10px] text-zinc-500">
Secure transaction verification protects every purchase.
</p>

</div>


{/* PIN */}

<button
type="button"
onClick={()=>{

sessionStorage.setItem(
"alphaBotExamPinPurchaseState",
JSON.stringify({
phone,
exam,
quantity
})
);

router.push(
"/enter-pin?return=/exam-pin&service=exam-pin"
);

}}
disabled={loading || biometricLoading}
className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black text-base active:scale-[0.98] transition disabled:opacity-50"
>
{loading ? "Processing..." : "🔐 Continue with PIN"}
</button>


{/* BIOMETRIC */}

<button
type="button"
onClick={async()=>{

try{

setBiometricLoading(true);
setMessage("Touch your fingerprint...");

await authenticateWithBiometric();

setMessage("Fingerprint verified.");

await buyExamPin();

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
: "👆 Buy with Fingerprint"}

</button>


{/* MESSAGE */}

{message && (

<div className="mt-4 bg-white border border-zinc-200 text-zinc-700 dark:bg-[#050505] dark:border-zinc-800 dark:text-white rounded-2xl p-4 text-center text-sm">

{message}

</div>

)}

</div>

</section>


{/* INFO CARDS */}

<div className="grid grid-cols-3 gap-2">

<div className="rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 p-3 text-center">

<p className="text-lg">⚡</p>

<p className="text-[9px] text-zinc-500 mt-1 font-bold">
INSTANT
</p>

</div>

<div className="rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 p-3 text-center">

<p className="text-lg">🔒</p>

<p className="text-[9px] text-zinc-500 mt-1 font-bold">
SECURE
</p>

</div>

<div className="rounded-2xl bg-zinc-100 dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-800 p-3 text-center">

<p className="text-lg">🎓</p>

<p className="text-[9px] text-zinc-500 mt-1 font-bold">
EXAMS
</p>

</div>

</div>

</div>

</main>

</>
);

}
