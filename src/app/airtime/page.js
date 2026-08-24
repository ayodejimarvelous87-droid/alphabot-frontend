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
    status: "successful",
      returnPath: "/airtime"
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


  <main className="min-h-screen bg-[#050505] text-white px-4 py-5 pb-24">

    <div className="max-w-md mx-auto space-y-4">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-[#111113] to-black p-5">

        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-between">

          <div>
            <p className="text-[9px] font-black tracking-[0.22em] text-yellow-400 uppercase">
              AlphaBot
            </p>

            <h1 className="text-2xl font-black mt-1">
              Airtime
            </h1>

            <p className="text-[10px] text-zinc-400 mt-1">
              Instant recharge across all networks
            </p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-xl">
            📱
          </div>

        </div>

      </div>


      {/* PURCHASE FORM */}
      <div className="rounded-3xl border border-zinc-800 bg-[#111113] p-4 space-y-4">

        {/* NETWORK */}
        <div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500">
              Network
            </p>

            <span className="text-[9px] text-zinc-600">
              Select provider
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">

            {["MTN","AIRTEL","GLO","9MOBILE"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setNetwork(item)}
                className={`rounded-2xl border px-2 py-3 text-[10px] font-black transition active:scale-95 ${
                  network === item
                    ? "border-yellow-400 bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
                    : "border-zinc-800 bg-[#080809] text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </div>


        {/* RECEIVER */}
        <div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500">
              Receiver
            </p>

            <span className="text-[9px] text-zinc-600">
              Phone number
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#080809] p-1">

            <PhoneInput
              value={phone}
              onChange={setPhone}
              beneficiaries={beneficiaries}
              service="airtime"
            />

          </div>

        </div>


        {/* AMOUNT */}
        <div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500">
              Amount
            </p>

            <span className="text-[9px] text-zinc-600">
              Enter or choose
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-2">

            {[100,200,500,1000].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(String(value))}
                className={`rounded-xl border py-2 text-[10px] font-bold transition active:scale-95 ${
                  String(amount) === String(value)
                    ? "border-yellow-400/60 bg-yellow-400/10 text-yellow-400"
                    : "border-zinc-800 bg-[#080809] text-zinc-500"
                }`}
              >
                ₦{value.toLocaleString()}
              </button>
            ))}

          </div>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
              ₦
            </span>

            <input
              className="w-full pl-9 pr-4 py-4 rounded-2xl bg-[#080809] border border-zinc-800 text-white outline-none focus:border-yellow-400/60 transition"
              placeholder="Enter amount"
              type="number"
              value={amount}
              onChange={(e)=>setAmount(e.target.value)}
            />

          </div>

        </div>


        {/* PIN */}
        <div>

          <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-2">
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
            className="w-full flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#080809] px-4 py-4 text-left active:scale-[0.98] transition"
          >

            <div>
              <p className="text-sm font-bold">
                Enter transaction PIN
              </p>

              <p className="text-[9px] text-zinc-500 mt-0.5">
                Required before purchase
              </p>
            </div>

            <span className="text-zinc-500 text-lg">
              →
            </span>

          </button>

        </div>

      </div>


      {/* FINGERPRINT CTA */}
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
        className="relative w-full overflow-hidden rounded-2xl bg-yellow-400 text-black py-4 font-black text-base active:scale-[0.98] transition disabled:opacity-60"
      >

        <span className="relative z-10 flex items-center justify-center gap-2">

          {biometricLoading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
              Touch fingerprint...
            </>
          ) : (
            <>
              👆
              Confirm with Fingerprint
            </>
          )}

        </span>

      </button>


      {/* STATUS */}
      {message && (
        <div className="rounded-2xl border border-zinc-800 bg-[#111113] px-4 py-3 text-center text-xs text-zinc-300">
          {message}
        </div>
      )}


      {/* BACK */}
      <Link
        href="/dashboard"
        className="flex items-center justify-center gap-2 text-[11px] font-bold text-zinc-500 hover:text-white transition py-2"
      >
        ← Dashboard
      </Link>

    </div>

  </main>

</>
);


}
