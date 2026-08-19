"use client";

import { useState,useEffect } from "react";
import {useSearchParams,useRouter} from "next/navigation";
import Link from "next/link";
import { authenticateWithBiometric } from "@/lib/biometric";
import PhoneInput from "@/components/PhoneInput";
import SuccessCelebration from "@/components/success-celebration";

export default function Airtime(){

const router=useRouter();

const searchParams = useSearchParams();

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("MTN");
const [amount,setAmount]=useState("");
const [biometricLoading,setBiometricLoading]=useState(false);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(false);
const [showSuccess,setShowSuccess]=useState(false);
const [beneficiaries,setBeneficiaries]=useState([]);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);

useEffect(()=>{

const savedState =
sessionStorage.getItem("alphaBotAirtimePurchaseState");
if(savedState){

try{

const state=JSON.parse(savedState);

if(state.phone !== undefined)
setPhone(state.phone);

if(state.network !== undefined)
setNetwork(state.network);

if(state.amount !== undefined)
setAmount(state.amount);

}catch(error){

console.log(
"Unable to restore airtime purchase state:",
error.message
);

}

}else{

const savedPhone=searchParams.get("phone");

if(savedPhone)
setPhone(savedPhone);

}
setPurchaseStateRestored(true);

},[searchParams]);


useEffect(()=>{
const savedPhone = searchParams.get("phone");

if(savedPhone){
setPhone(savedPhone);
}
const loadBeneficiaries=async()=>{
try{
const user=JSON.parse(localStorage.getItem("user"));
if(!user?.phone)return;

const res=await fetch(`https://api.alphabothq.com/beneficiaries/${user.phone}`,{
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

if(loading)return;

try{

setLoading(true);
setMessage("Processing...");

const token = localStorage.getItem("token");
const biometricToken = localStorage.getItem("biometricToken");


const res = await fetch(
"https://api.alphabothq.com/airtime/buy",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`,
"idempotency-key": crypto.randomUUID()
},
body:JSON.stringify({
phone,
network,
amount:Number(amount),
biometricToken: biometricToken || undefined
})
}
);


const data = await res.json();


if(res.ok){

sessionStorage.setItem(
  "alphaBotTransactionResult",
  JSON.stringify({
    ...data,
    status: data.status || "success"
  })
);
sessionStorage.removeItem(
"alphaBotAirtimePurchaseState"
);
router.push("/transaction-result");

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
message="🎉 Airtime purchase successful!"
/>


<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">

<div className="max-w-md mx-auto space-y-5">


<div>

<h1 className="text-3xl font-black">
📱 Airtime
</h1>

<p className="text-zinc-400 mt-2">
Instant airtime recharge for all networks
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

service="airtime"

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
Transaction PIN
</p>

<button
  type="button"
  onClick={() => {
    sessionStorage.setItem(
      "alphaBotAirtimePurchaseState",
      JSON.stringify({
        phone,
        network,
        amount
      })
    );

    router.push("/enter-pin?return=/airtime&service=airtime");
  }}
  className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white text-left active:scale-[0.98] active:opacity-70 transition-transform duration-100"
>
  Enter 4-digit PIN →
</button>

</div>


</div>





<button

onClick={async()=>{

try{

setBiometricLoading(true);
setMessage("Touch your fingerprint...");

await authenticateWithBiometric();

setMessage("Fingerprint verified.");

await buyAirtime();

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
{biometricLoading ? "Touch fingerprint..." : "FINGERPRINT 🫆"}

</button>





{message && (

<div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4 text-center text-sm">

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
