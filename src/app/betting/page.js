"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState,useEffect } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import Toast from "@/components/Toast";
import SuccessCelebration from "@/components/success-celebration";
import { authenticateWithBiometric } from "@/lib/biometric";

export default function Page(){

const router=useRouter();
const searchParams = useSearchParams();

const [phone,setPhone]=useState("");
const [provider,setProvider]=useState("");
  const [services,setServices]=useState([]);
  const [servicesLoading,setServicesLoading]=useState(true);
const [amount,setAmount]=useState("");
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [toast,setToast]=useState("");
const [loading,setLoading]=useState(false);
const [biometricLoading,setBiometricLoading]=useState(false);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);
const [purchaseIdempotencyKey,setPurchaseIdempotencyKey]=useState("");
const [showSuccess,setShowSuccess]=useState(false);

useEffect(()=>{

const savedState =
sessionStorage.getItem("alphaBotBettingPurchaseState");

const savedPin =
sessionStorage.getItem("alphaBotTransactionPin");

if(savedState){

try{

const state=JSON.parse(savedState);

if(state.phone !== undefined)
setPhone(state.phone);

if(state.provider !== undefined)
setProvider(state.provider);

if(state.amount !== undefined)
setAmount(state.amount);

}catch(error){

console.log(
"Unable to restore betting purchase state:",
error.message
);

}

}

if(savedPin)
setPin(savedPin);

setPurchaseStateRestored(true);

},[]);

  useEffect(()=>{

    const loadServices = async()=>{

      try{

          const url = `${process.env.NEXT_PUBLIC_API_URL}/betting/services`;

          

          const res = await fetch(url);

        const data = await res.json();

        if(Array.isArray(data)){
          setServices(data);

          if(data.length){
          }
        }else{
          setServices([]);
        }

      }catch(error){

        
        setServices([]);

      }finally{

        setServicesLoading(false);

      }

    };

    loadServices();

  },[]);



useEffect(()=>{

const authorized = searchParams.get("authorized");
const service = searchParams.get("service");

if(
authorized !== "1" ||
service !== "betting" ||
!purchaseStateRestored
){
return;
}

const pending =
sessionStorage.getItem(
"alphaBotBettingAuthorizationPending"
);

if(pending !== "1"){
return;
}

sessionStorage.removeItem(
"alphaBotBettingAuthorizationPending"
);

router.replace("/betting");

fundBetting();

},[
searchParams,
router,
purchaseStateRestored
]);
const fundBetting=async()=>{

try{

  const biometricToken =
localStorage.getItem("biometricToken");

if(
  !phone ||
  !provider ||
  !amount ||
  (!pin && !biometricToken)
){
  setMessage("❌ Please authorize the transaction");
  return;
}

  if(Number(amount) <= 0){
    setMessage("❌ Enter a valid amount");
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

if (!purchaseIdempotencyKey) {
  setPurchaseIdempotencyKey(idempotencyKey);
}


const res=await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/betting/fund`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`,
"Idempotency-Key":idempotencyKey
},
body:JSON.stringify({
customer_id:phone,
service_id:provider,
amount:Number(amount),
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
      "alphaBotBettingPurchaseState"
    );

    setPin("");

    setPurchaseIdempotencyKey("");

    setToast(`✅ ${data.message || "Betting wallet funded successfully"}`);
setShowSuccess(true);
setTimeout(()=>setShowSuccess(false),3000);
    setAmount("");

  }else{

    if(
      data.message &&
      data.message.toLowerCase().includes("wait for 3 minutes")
    ){
      setMessage("⏳ Please wait before trying another betting funding.");
    }else{
      setMessage(
        `❌ ${data.message || data.error || "Betting request failed"}`
      );
    }

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
message="🎉 Betting wallet funded successfully!"
/>


<main className="min-h-screen bg-[#050505] text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto space-y-5">



<h1 className="text-3xl font-black">
🎮 Betting
</h1>


<p className="text-zinc-400">
Fund your betting wallet instantly
</p>




<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 space-y-4">



<div>

<p className="text-xs text-zinc-500 mb-2">
Phone Number
</p>

<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>




<div>

<p className="text-xs text-zinc-500 mb-2">
Betting Platform
</p>


<select
  className="w-full bg-white text-black border border-zinc-700 rounded-xl p-3"
  value={provider}
  onChange={(e)=>setProvider(e.target.value)}
>

    <option value="">Select platform</option>

  {services.map((item)=>(
    <option
      key={item._id}
      value={item.service}
    >
      {item.service}
    </option>
  ))}
</select>

  <p className="text-xs text-red-500">

  </p>

</div>




  <div className="flex gap-2 flex-wrap">
    {[100,200,500,1000].map((value)=>(
      <button
      key={value}
      type="button"
      onClick={()=>setAmount(String(value))}
      className="bg-zinc-800 px-4 py-2 rounded-xl text-sm hover:bg-zinc-700"
      >
        ₦{value}
      </button>
    ))}
  </div>

  <input
  className="w-full bg-[#050505] border border-zinc-700 rounded-xl p-3"
  placeholder="Amount"
  type="number"
  value={amount}
  onChange={(e)=>setAmount(e.target.value)}
  />




<button
  type="button"
  onClick={()=>{

  sessionStorage.setItem(
    "alphaBotBettingPurchaseState",
    JSON.stringify({
      phone,
      provider,
      amount
    })
  );

  router.push(
    "/enter-pin?return=/betting&service=betting"
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

await fundBetting();

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

<Toast
message={toast}
type="success"
onClose={()=>setToast("")}
/>

</main>

</>
);

}
