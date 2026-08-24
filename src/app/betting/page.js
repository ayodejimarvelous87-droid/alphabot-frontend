"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState,useEffect } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import Toast from "@/components/Toast";
import SuccessCelebration from "@/components/success-celebration";
import { authenticateWithBiometric } from "@/lib/biometric";

const API = "https://api.alphabothq.com";

export default function Page(){

const router=useRouter();
const searchParams = useSearchParams();

const [phone,setPhone]=useState("");
const [provider,setProvider]=useState("");
const [customerId,setCustomerId]=useState("");
  const [services,setServices]=useState([]);
  const [servicesLoading,setServicesLoading]=useState(true);
const [amount,setAmount]=useState("");
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

if(savedState){

try{

const state=JSON.parse(savedState);

if(state.phone !== undefined)
setPhone(state.phone);

if(state.provider !== undefined)
setProvider(state.provider);

if(state.customerId !== undefined)
setCustomerId(state.customerId);

if(state.amount !== undefined)
setAmount(state.amount);

}catch(error){

console.log(
"Unable to restore betting purchase state:",
error.message
);

}

}

setPurchaseStateRestored(true);

},[]);

  useEffect(()=>{

    const loadServices = async()=>{

      try{

          const url = `${API}/betting/services`;

          

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



const fundBetting=async()=>{

try{

  const biometricToken =
localStorage.getItem("biometricToken");

if(
  !phone ||
  !customerId ||
  !provider ||
  !amount ||
  !biometricToken
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
`${API}/betting/fund`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`,
"Idempotency-Key":idempotencyKey
},
body:JSON.stringify({
customer_id:customerId,
service_id:provider,
amount:Number(amount),
biometricToken: biometricToken || undefined
})
}
);


const data=await res.json();


  if(res.ok){

    sessionStorage.removeItem(
      "alphaBotBettingPurchaseState"
    );

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
Betting
</h1>

<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
Fund your betting wallet quickly and securely.
</p>

</header>


{/* MAIN CARD */}

<section className="relative overflow-hidden bg-gradient-to-br from-[#1B1B1F] via-[#111113] to-[#080808] border border-zinc-800 rounded-[30px] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

<div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-yellow-400/10 blur-3xl" />

<div className="relative">

{/* HERO */}

<div className="flex items-center gap-3 mb-6">

<div className="w-12 h-12 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-2xl shadow-lg shadow-yellow-400/10">
🎮
</div>

<div>

<h2 className="font-black text-lg">
Betting Wallet
</h2>

<p className="text-xs text-zinc-500">
Instant wallet funding
</p>

</div>

</div>


{/* PHONE */}

<div className="mb-5">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Phone Number
</p>

<PhoneInput
value={phone}
onChange={(value)=>setPhone(value)}
/>

</div>


{/* BETTING ID */}

<div className="mb-5">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Betting ID
</p>

<input
type="text"
value={customerId}
onChange={(e)=>setCustomerId(e.target.value)}
placeholder="Enter your betting account ID"
className="w-full bg-[#050505] text-white border border-zinc-800 rounded-2xl p-4 outline-none focus:border-yellow-400 transition"
/>

<p className="text-[10px] text-zinc-600 mt-2">
Use the customer ID registered on your betting platform.
</p>

</div>


{/* PLATFORM */}

<div className="mb-5">

<div className="flex items-center justify-between mb-2">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
Betting Platform
</p>

{servicesLoading && (
<span className="text-[9px] text-yellow-500 animate-pulse">
Loading...
</span>
)}

</div>


{servicesLoading ? (

<div className="w-full h-14 rounded-2xl bg-[#050505] border border-zinc-800 animate-pulse" />

) : services.length > 0 ? (

<div className="grid grid-cols-2 gap-2">

{services.map((item)=>(

<button
key={item._id}
type="button"
onClick={()=>setProvider(item.service)}
className={`min-h-[56px] px-3 rounded-2xl border text-sm font-black transition active:scale-[0.97] ${
provider === item.service
? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/10"
: "bg-[#050505] text-zinc-300 border-zinc-800 hover:border-zinc-600"
}`}
>
{item.service}
</button>

))}

</div>

) : (

<div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-center">

<p className="text-xs text-red-400">
No betting platforms are currently available.
</p>

</div>

)}

</div>


{/* AMOUNT */}

<div className="mb-5">

<p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
Funding Amount
</p>


<div className="grid grid-cols-4 gap-2 mb-3">

{[100,200,500,1000].map((value)=>(

<button
key={value}
type="button"
onClick={()=>setAmount(String(value))}
className={`py-3 rounded-2xl border text-xs font-black transition active:scale-95 ${
Number(amount) === value
? "bg-yellow-400 text-black border-yellow-400"
: "bg-[#050505] text-zinc-400 border-zinc-800 hover:border-zinc-600"
}`}
>
₦{value.toLocaleString()}
</button>

))}

</div>


<div className="relative">

<span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-black">
₦
</span>

<input
className="w-full bg-[#050505] border border-zinc-800 rounded-2xl py-4 pl-9 pr-4 text-white font-bold outline-none focus:border-yellow-400 transition"
placeholder="Enter amount"
type="number"
min="1"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

</div>

</div>


{/* SECURITY */}

<div className="flex items-center gap-3 rounded-2xl bg-green-500/5 border border-green-500/10 p-3 mb-5">

<div className="w-8 h-8 rounded-xl bg-green-500/10 flex items-center justify-center">
🔒
</div>

<div>

<p className="text-xs font-bold text-zinc-300">
Secure transaction
</p>

<p className="text-[9px] text-zinc-600 mt-0.5">
Your payment requires transaction authorization.
</p>

</div>

</div>


{/* PIN */}

<button
type="button"
onClick={()=>{

sessionStorage.setItem(
"alphaBotBettingPurchaseState",
JSON.stringify({
phone,
customerId,
provider,
amount
})
);

router.push(
"/enter-pin?return=/betting&service=betting"
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

await fundBetting();

}catch(error){

localStorage.removeItem("biometricToken");

setMessage("❌ " + error.message);

}finally{

setBiometricLoading(false);

}

}}
disabled={loading || biometricLoading}
className="w-full mt-3 bg-[#050505] border border-zinc-800 text-white py-4 rounded-2xl font-black text-base active:scale-[0.98] transition disabled:opacity-50"
>

{biometricLoading
? "Touch fingerprint..."
: "👆 Fund with Fingerprint"}

</button>


{/* MESSAGE */}

{message && (

<div className="mt-4 bg-[#050505] border border-zinc-800 rounded-2xl p-4 text-center text-sm">

{message}

</div>

)}

</div>

</section>


{/* INFO */}

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

<p className="text-lg">🎮</p>

<p className="text-[9px] text-zinc-500 mt-1 font-bold">
BETTING
</p>

</div>

</div>


<Toast
message={toast}
type="success"
onClose={()=>setToast("")}
/>

</div>

</main>

</>
);

}
