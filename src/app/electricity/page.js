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
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [showSuccess,setShowSuccess]=useState(false);
const [biometricLoading,setBiometricLoading]=useState(false);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);

useEffect(()=>{

const savedState =
sessionStorage.getItem("alphaBotElectricityPurchaseState");

const savedPin =
sessionStorage.getItem("alphaBotTransactionPin");

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

if(savedPin)
setPin(savedPin);

setPurchaseStateRestored(true);

},[searchParams]);


/*
========================================
AUTO-SUBMIT AFTER ELECTRICITY PIN AUTHORIZATION
========================================
*/

useEffect(()=>{

const authorized = searchParams.get("authorized");
const service = searchParams.get("service");

if(
authorized !== "1" ||
service !== "electricity" ||
!purchaseStateRestored
){
return;
}

const pending =
sessionStorage.getItem(
  "alphaBotElectricityAuthorizationPending"
);

if(pending !== "1"){
return;
}

if(
!phone ||
!disco ||
!meterNumber ||
!amount ||
pin.length !== 4
){
return;
}

sessionStorage.removeItem(
  "alphaBotElectricityAuthorizationPending"
);

router.replace("/electricity");

payElectricity();

},[
searchParams,
router,
purchaseStateRestored,
phone,
disco,
meterNumber,
amount,
pin
]);


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
pin: biometricToken ? undefined : pin,
biometricToken: biometricToken || undefined
})
}
);


const data = await res.json();


if(res.ok){

sessionStorage.removeItem(
"alphaBotTransactionPin"
);

sessionStorage.removeItem(
"alphaBotElectricityPurchaseState"
);

setPin("");

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





</div>


</div>





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
  className="w-full bg-[#18181B] border border-zinc-800 text-white py-4 rounded-2xl font-black text-lg active:scale-95 transition"
>
  {pin ? "•••• PIN AUTHORIZED" : "🔐 Enter 4-digit PIN"}
</button>


<button

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

className="w-full bg-zinc-900 border border-zinc-700 text-white py-4 rounded-2xl font-black text-lg active:scale-95 transition"

>
{biometricLoading ? "Touch fingerprint..." : "👆 Use Fingerprint"}

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

</>
);


}
