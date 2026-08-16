"use client";

import {useState,useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import SuccessCelebration from "@/components/success-celebration";

export default function RechargePin(){

const router=useRouter();

const [phone,setPhone]=useState("");
const [network,setNetwork]=useState("MTN");
const [amount,setAmount]=useState("");
const [quantity,setQuantity]=useState(1);
const [pin,setPin]=useState("");
const [message,setMessage]=useState("");
const [epinResult,setEpinResult]=useState(null);
const [loading,setLoading]=useState(false);
const [showSuccess,setShowSuccess]=useState(false);
const [beneficiaries,setBeneficiaries]=useState([]);
const [epinReference,setEpinReference]=useState("");
const [polling,setPolling]=useState(false);
const [copyMessage,setCopyMessage]=useState("");


useEffect(()=>{

const savedState =
sessionStorage.getItem("alphaBotRechargePinPurchaseState");

const savedPin =
sessionStorage.getItem("alphaBotTransactionPin");

if(savedState){

try{

const state=JSON.parse(savedState);

if(state.phone !== undefined)
setPhone(state.phone);

if(state.network !== undefined)
setNetwork(state.network);

if(state.amount !== undefined)
setAmount(state.amount);

if(state.quantity !== undefined)
setQuantity(state.quantity);

}catch(error){

console.log(error);

}

}

if(savedPin){

setPin(savedPin);

}

sessionStorage.removeItem("alphaBotTransactionPin");



const loadData=async()=>{

try{

const user=JSON.parse(localStorage.getItem("user"));

if(!user?.phone)return;

setPhone(user.phone);


const res=await fetch(
`https://api.alphabothq.com/beneficiaries/${user.phone}`,
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




const checkEPinStatus = async(reference)=>{

  if(!reference) return;

  try{

    const res = await fetch(
      `https://api.alphabothq.com/epin/status/${encodeURIComponent(reference)}`,
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    const data = await res.json();

    if(!res.ok){
      return;
    }

    if(data.epin){

      setEpinResult(data.epin);

    }

    const pins =
      Array.isArray(data.epin?.pins)
      ? data.epin.pins.filter(Boolean)
      : [];

    if(
      data.status === "successful" &&
      pins.length > 0
    ){

      setPolling(false);

      setMessage(
        "✅ Recharge PIN is ready!"
      );

      setShowSuccess(true);

      setTimeout(
        ()=>setShowSuccess(false),
        3000
      );

      return true;

    }

    if(
      data.status === "failed" ||
      data.status === "refunded"
    ){

      setPolling(false);

      setMessage(
        data.status === "refunded"
        ? "↩️ Your ePIN order was refunded."
        : "❌ Your ePIN order failed."
      );

      return true;

    }

  }catch(error){

    console.log(
      "EPIN STATUS CHECK ERROR:",
      error.message
    );

  }

  return false;

};


const startEPinPolling = (reference)=>{

  if(!reference) return;

  setEpinReference(reference);
  setPolling(true);

  let attempts = 0;

  const maxAttempts = 60;

  const poll = async()=>{

    attempts++;

    const finished =
      await checkEPinStatus(reference);

    if(
      finished ||
      attempts >= maxAttempts
    ){

      setPolling(false);

      if(attempts >= maxAttempts && !finished){

        setMessage(
          "⏳ Your ePIN is still processing. You can leave this page and check again later."
        );

      }

      return;

    }

    setTimeout(
      poll,
      3000
    );

  };

  poll();

};


const copyPin = async(pin)=>{

  try{

    await navigator.clipboard.writeText(
      String(pin)
    );

    setCopyMessage(
      "PIN copied!"
    );

    setTimeout(
      ()=>setCopyMessage(""),
      2000
    );

  }catch(error){

    setCopyMessage(
      "Unable to copy PIN"
    );

    setTimeout(
      ()=>setCopyMessage(""),
      2000
    );

  }

};


const buyRechargePin=async()=>{

try{

setLoading(true);
setMessage("Processing...");
setEpinResult(null);


const idempotencyKey =
sessionStorage.getItem("alphaBotEPinIdempotencyKey") ||
(
  globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `EPIN-${Date.now()}-${Math.random().toString(36).slice(2)}`
);

sessionStorage.setItem(
"alphaBotEPinIdempotencyKey",
idempotencyKey
);

const res=await fetch(
"https://api.alphabothq.com/epin/buy",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`,
"Idempotency-Key":idempotencyKey
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

sessionStorage.removeItem(
"alphaBotTransactionPin"
);

sessionStorage.removeItem(
"alphaBotRechargePinPurchaseState"
);

sessionStorage.removeItem(
"alphaBotEPinIdempotencyKey"
);

setPin("");



setMessage(
data.status === "processing"
? "⏳ Recharge PIN order is processing"
: "✅ Recharge PIN purchased successfully"
);

if(data.status !== "processing"){
  setShowSuccess(true);
  setTimeout(()=>setShowSuccess(false),3000);
}

setEpinResult(data.epin);

const reference =
  data.epin?.reference ||
  data.transaction?.reference ||
  data.reference;

if(reference){

  setEpinReference(reference);

  if(
    data.status === "processing" ||
    !data.epin?.pins?.length
  ){

    setMessage(
      "⏳ Recharge PIN order is processing. Waiting for the PIN..."
    );

    startEPinPolling(reference);

  }

}


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
<>
<SuccessCelebration
show={showSuccess}
message="🎉 Recharge PIN purchased successfully!"
/>


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


<button
  type="button"
  onClick={()=>{

    sessionStorage.setItem(
      "alphaBotRechargePinPurchaseState",
      JSON.stringify({
        phone,
        network,
        amount,
        quantity
      })
    );

    router.push("/enter-pin?return=/recharge-pin&service=recharge-pin");

  }}
  className="w-full mt-2 p-4 rounded-2xl bg-[#050505] border border-zinc-800 text-white text-left active:scale-[0.98] active:opacity-70 transition-transform duration-100"
>
  {pin ? "••••" : "Enter 4 digit PIN"} →
</button>


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




{polling && (

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5 text-center">

<div className="text-4xl mb-3">
⏳
</div>

<h2 className="font-black text-xl">
Your Recharge PIN is Processing
</h2>

<p className="text-zinc-400 mt-3 text-sm">
Your payment was received and the PIN is being generated.
</p>

<p className="text-zinc-500 mt-2 text-xs">
This page will automatically update when your PIN arrives.
</p>

<div className="mt-4 animate-pulse text-sm font-bold">
Waiting for PIN...
</div>

</div>

)}


{epinResult &&
  Array.isArray(epinResult.pins) &&
  epinResult.pins.length > 0 && (

<div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5">

  {/* ALPHABOT HQ */}

  <div className="text-center pb-4 border-b border-zinc-800">

    <p className="text-xs font-black tracking-[0.3em] text-white">
      ALPHABOT HQ
    </p>

    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
      Recharge PIN
    </p>

  </div>


  {/* PURCHASE DETAILS */}

  <div className="flex items-center justify-between gap-4 mt-4">

    <div className="min-w-0">

      <p className="text-xs text-zinc-500 uppercase tracking-wider">
        Network
      </p>

      <p className="font-black text-lg mt-1 truncate">
        {epinResult.network?.toUpperCase() || "N/A"}
      </p>

    </div>

    <span className="shrink-0 text-xs text-emerald-400 font-bold">
      READY
    </span>

  </div>


  {/* PIN LIST */}

  <div className="mt-4 space-y-3">

    {epinResult.pins.map((item, index) => (

      <div
        key={`${String(item)}-${index}`}
        className="bg-[#050505] border border-zinc-800 rounded-2xl p-4"
      >

        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
          PIN {index + 1}
        </p>

        <div className="flex items-center justify-between gap-3">

          <div className="text-xl font-black break-all min-w-0">
            {item}
          </div>

          <button
            type="button"
            onClick={() => copyPin(item)}
            className="shrink-0 bg-white text-black px-4 py-2 rounded-xl font-bold text-sm"
          >
            Copy
          </button>

        </div>

      </div>

    ))}

  </div>


  <p className="text-center text-[10px] text-zinc-600 mt-4">
    Issued by ALPHABOT HQ
  </p>

</div>

)}


<p className="text-zinc-400 mt-4 text-sm">

Dial *311*PIN# to recharge

</p>







<Link

href="/dashboard"

className="block text-center text-zinc-400 mt-6"

>

← Dashboard

</Link>



</div>


</main>

</>
)

}
