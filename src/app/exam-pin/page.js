"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import PhoneInput from "@/components/PhoneInput";
import Link from "next/link";
import SuccessCelebration from "@/components/success-celebration";
import { authenticateWithBiometric } from "@/lib/biometric";

export default function Page(){

const router=useRouter();
const searchParams=useSearchParams();

const [phone,setPhone]=useState("");
const [exam,setExam]=useState("WAEC");
const [quantity,setQuantity]=useState(1);
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [biometricLoading,setBiometricLoading]=useState(false);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);
const [purchaseIdempotencyKey,setPurchaseIdempotencyKey]=useState("");
const [showSuccess,setShowSuccess]=useState(false);

useEffect(()=>{

const savedState =
sessionStorage.getItem("alphaBotExamPinPurchaseState");

const savedPin =
sessionStorage.getItem("alphaBotTransactionPin");

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

if(savedPin)
setPin(savedPin);

setPurchaseStateRestored(true);

},[]);


useEffect(()=>{

const authorized = searchParams.get("authorized");
const service = searchParams.get("service");

if(
  authorized !== "1" ||
  service !== "exam-pin" ||
  !purchaseStateRestored
){
  return;
}

const pending =
sessionStorage.getItem(
  "alphaBotExamPinAuthorizationPending"
);

if(pending !== "1"){
  return;
}

sessionStorage.removeItem(
  "alphaBotExamPinAuthorizationPending"
);

router.replace("/exam-pin");

buyExamPin();

},[
searchParams,
router,
purchaseStateRestored
]);



const buyExamPin = async()=>{

try{

const biometricToken =
localStorage.getItem("biometricToken");

if(
  !phone ||
  !exam ||
  !quantity ||
  (!pin && !biometricToken)
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
pin: biometricToken ? undefined : pin,
biometricToken: biometricToken || undefined
})
}
);

const data=await res.json();

if(res.ok){

sessionStorage.removeItem(
"alphaBotTransactionPin"
);

sessionStorage.removeItem(
"alphaBotExamPinPurchaseState"
);

setPin("");

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


<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto space-y-5">


<h1 className="text-3xl font-black">
🎓 Exam PIN
</h1>


<p className="text-zinc-400">
Get your examination PIN instantly
</p>



<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">



<div>
<p className="text-xs text-zinc-500 mb-2">
Candidate Phone
</p>

<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>




<select
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
value={exam}
onChange={(e)=>setExam(e.target.value)}
>

<option>WAEC</option>
<option>NECO</option>
<option>JAMB</option>

</select>




<input
className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
placeholder="Quantity"
type="number"
min="1"
value={quantity}
onChange={(e)=>setQuantity(e.target.value)}
/>




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
  className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3 text-left active:scale-[0.98] active:opacity-70 transition-transform duration-100"
>
  {pin ? "••••" : "Enter 4 digit PIN"} →
</button>


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
className="w-full bg-zinc-900 border border-zinc-700 text-white py-3 rounded-xl font-bold active:scale-95 transition disabled:opacity-50"
>

{biometricLoading
  ? "Touch fingerprint..."
  : "👆 Use Fingerprint"}

</button>


<p className="text-center text-sm text-zinc-400">
{message}
</p>



</div>



<Link
href="/dashboard"
className="block text-center text-zinc-400 mt-6"
>
← Dashboard
</Link>



</div>


</main>

</>
);

}
