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
const [beneficiaryPickerOpen,setBeneficiaryPickerOpen]=useState(false);
const [purchaseStateRestored,setPurchaseStateRestored]=useState(false);
const [showConfirmation,setShowConfirmation]=useState(false);
const [walletBalance,setWalletBalance]=useState(null);
const [walletBalanceLoading,setWalletBalanceLoading]=useState(false);

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


useEffect(() => {
  const loadWalletBalance = async () => {
    try {
      setWalletBalanceLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );
      const token = localStorage.getItem("token");

      if (!user?.phone || !token) {
        setWalletBalance(null);
        return;
      }

      const res = await fetch(
        `https://api.alphabothq.com/wallet/balance/${user.phone}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.balance !== undefined) {
        setWalletBalance(Number(data.balance));
      } else {
        setWalletBalance(null);
      }
    } catch (error) {
      console.error("Wallet balance error:", error);
      setWalletBalance(null);
    } finally {
      setWalletBalanceLoading(false);
    }
  };

  loadWalletBalance();
}, []);

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


const confirmAirtimePurchase = () => {
  const purchaseAmount = Number(amount);

  if (!phone) {
    setShowConfirmation(false);
    setMessage("Enter a phone number.");
    return;
  }

  if (!Number.isFinite(purchaseAmount) || purchaseAmount <= 0) {
    setShowConfirmation(false);
    setMessage("Enter a valid airtime amount.");
    return;
  }

  if (walletBalance === null || walletBalance === undefined) {
    setMessage("Unable to verify your wallet balance.");
    return;
  }

  if (walletBalance < purchaseAmount) {
    setShowConfirmation(false);
    setMessage(
      `Insufficient wallet balance. You need ₦${purchaseAmount.toLocaleString()} but only have ₦${Number(walletBalance).toLocaleString()}.`
    );
    return;
  }

  sessionStorage.setItem(
    "alphaBotAirtimePurchaseState",
    JSON.stringify({
      phone: (() => {
        let digits = String(phone || "").replace(/\D/g, "");

        if (digits.startsWith("234")) {
          digits = digits.slice(3);
        }

        if (digits.startsWith("0")) {
          digits = digits.slice(1);
        }

        return digits
          ? "+234" + digits.slice(0, 10)
          : "";
      })(),
      network,
      amount: String(purchaseAmount)
    })
  );

  setShowConfirmation(false);

  router.push("/enter-pin?service=airtime&return=/airtime");
};

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


  <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white px-4 py-5 pb-24">

    <div className="max-w-md mx-auto space-y-4">

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-[#111113] dark:to-black p-5">

        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-between">

          <div>
            <p className="text-[9px] font-black tracking-[0.22em] text-yellow-400 uppercase">
              AlphaBot
            </p>

            <h1 className="text-2xl font-black mt-1">
              Airtime
            </h1>

            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
              Instant recharge across all networks
            </p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 dark:border-yellow-400/20 flex items-center justify-center text-xl">
            📱
          </div>

        </div>

      </div>


      {/* PURCHASE FORM */}
      <div className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#111113] p-4 space-y-4">

        {/* NETWORK */}
        <div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
              Network
            </p>

            <span className="text-[9px] text-zinc-500 dark:text-zinc-600">
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
                    : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#080809] dark:text-zinc-400 dark:hover:border-zinc-700"
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
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
              Receiver
            </p>

            <span className="text-[9px] text-zinc-500 dark:text-zinc-600">
              Phone number
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#080809] p-1">

            <PhoneInput
              value={phone}
              onChange={setPhone}
              beneficiaries={beneficiaries}
              service="airtime"
              showContactPicker
            />

          </div>

        </div>


        {/* BENEFICIARIES */}

        <button
          type="button"
          onClick={() => setBeneficiaryPickerOpen(true)}
          className="w-full flex items-center justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] px-4 py-3 active:scale-[0.99] transition"
        >
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
              Buy for beneficiary
            </p>
            <p className="text-[10px] text-zinc-400 mt-1">
              Choose from your recent numbers
            </p>
          </div>

          <span className="text-lg text-zinc-400">›</span>
        </button>

        {beneficiaryPickerOpen && (
          <div className="fixed inset-0 z-[100]">
            <button
              type="button"
              aria-label="Close beneficiary picker"
              onClick={() => setBeneficiaryPickerOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            />

            <div className="absolute bottom-0 left-0 right-0 max-h-[58vh] rounded-t-[28px] bg-white dark:bg-[#111113] border-t border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">

              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>

              <div className="px-5 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black">
                    Buy for beneficiary
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Select a recent number
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setBeneficiaryPickerOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 text-lg"
                >
                  ×
                </button>
              </div>

              <div className="px-4 pb-6 overflow-y-auto max-h-[45vh]">

                {beneficiaries.filter(
                  item => item.service === "airtime"
                ).length > 0 ? (

                  <div className="space-y-2">
                    {beneficiaries
                      .filter(item => item.service === "airtime")
                      .map((item, index) => {

                        const value =
                          item.beneficiary_phone?.startsWith("+234")
                            ? item.beneficiary_phone
                            : item.beneficiary_phone?.startsWith("0")
                              ? "+234" + item.beneficiary_phone.slice(1)
                              : "+234" + item.beneficiary_phone;

                        return (
                          <button
                            key={`${item.beneficiary_phone}-${index}`}
                            type="button"
                            onClick={() => {
                              setPhone(value);
                              setBeneficiaryPickerOpen(false);
                            }}
                            className="w-full flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#080809] px-3 py-3 text-left active:scale-[0.99] transition"
                          >
                            <div className="w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                              📱
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-black truncate">
                                {item.beneficiary_phone}
                              </p>

                              <p className="text-[10px] text-zinc-500 mt-0.5 truncate">
                                {item.name || "Beneficiary"}
                              </p>
                            </div>

                            <span className="text-zinc-400 text-lg">›</span>
                          </button>
                        );
                      })}
                  </div>

                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm font-bold text-zinc-500">
                      No recent purchases yet
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-1">
                      Your recent airtime beneficiaries will appear here
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* AMOUNT */}
        <div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
              Amount
            </p>

            <span className="text-[9px] text-zinc-500 dark:text-zinc-600">
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
                    : "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-[#080809] dark:text-zinc-500"
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
              className="w-full pl-9 pr-4 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-950 outline-none dark:bg-[#080809] dark:border-zinc-800 dark:text-white focus:border-yellow-400/60 transition"
              placeholder="Enter amount"
              type="number"
              value={amount}
              onChange={(e)=>setAmount(e.target.value)}
            />

          </div>

        </div>


        {/* PIN */}
        <div>

          <p className="text-[9px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-500 mb-2">
            Confirm Purchase
          </p>

          <button
            type="button"
            onClick={() => {
              setMessage("");
              setShowConfirmation(true);
            }}
            className="w-full flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-left dark:border-zinc-800 dark:bg-[#080809] active:scale-[0.98] transition"
          >

            <div>
              <p className="text-sm font-bold">
                Confirm Purchase
              </p>

              <p className="text-[9px] text-zinc-500 dark:text-zinc-500 mt-0.5">
                Choose PIN or fingerprint to confirm
              </p>
            </div>

            <span className="text-zinc-500 dark:text-zinc-500 text-lg">
              →
            </span>

          </button>

        </div>

      </div>


      {/* PURCHASE CONFIRMATION */}

      {showConfirmation && (() => {
        const purchaseAmount = Number(amount);
        const afterBalance =
          walletBalance !== null
            ? Number(walletBalance) - purchaseAmount
            : null;

        return (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4">

            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Confirm purchase
                  </p>

                  <h3 className="text-2xl font-black mt-1">
                    Review your order
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 text-lg"
                >
                  ×
                </button>
              </div>

              <div className="mt-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 p-4">

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-black">
                      Airtime
                    </p>

                    <p className="text-xs text-zinc-500 mt-1">
                      {network}
                    </p>
                  </div>

                  <p className="text-xl font-black text-yellow-500 whitespace-nowrap">
                    ₦{purchaseAmount.toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Recipient
                  </p>

                  <p className="font-bold mt-1">
                    {phone || "Not provided"}
                  </p>
                </div>

              </div>

              <div className="mt-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs text-zinc-500">
                    Wallet balance
                  </span>

                  {walletBalanceLoading ? (
                    <span className="text-xs font-bold text-zinc-500">
                      Checking...
                    </span>
                  ) : (
                    <span className="font-black">
                      {walletBalance === null
                        ? "Unavailable"
                        : `₦${Number(walletBalance).toLocaleString()}`}
                    </span>
                  )}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 py-3">
                  <span className="text-xs text-zinc-500">
                    After purchase
                  </span>

                  <span
                    className={`font-black ${
                      afterBalance !== null && afterBalance < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {afterBalance === null
                      ? "—"
                      : `₦${afterBalance.toLocaleString()}`}
                  </span>
                </div>

              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-4 leading-5">
                Confirming will take you to your transaction PIN.
                Your wallet will only be charged after the PIN is verified.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="rounded-2xl py-4 font-black bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 active:scale-95 transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmAirtimePurchase}
                  disabled={
                    walletBalanceLoading ||
                    walletBalance === null ||
                    walletBalance < purchaseAmount ||
                    !phone ||
                    !Number.isFinite(purchaseAmount) ||
                    purchaseAmount <= 0
                  }
                  className="rounded-2xl py-4 font-black bg-yellow-400 text-black active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm & continue
                </button>

              </div>

            </div>

          </div>
        );
      })()}

        


      {/* STATUS */}
      {message && (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-center text-xs text-zinc-700 dark:border-zinc-800 dark:bg-[#111113] dark:text-zinc-300">
          {message}
        </div>
      )}


      {/* BACK */}
      <Link
        href="/dashboard"
        className="flex items-center justify-center gap-2 text-[11px] font-bold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition py-2"
      >
        ← Dashboard
      </Link>

    </div>

  </main>

</>
);


}
