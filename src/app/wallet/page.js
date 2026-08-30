"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Toast from "@/components/Toast";

export default function Wallet(){

const [amount,setAmount]=useState("");
const [balance,setBalance]=useState(0);
const [transactions,setTransactions]=useState([]);
const [message,setMessage]=useState("");
const [loading,setLoading]=useState(true);
const [manualFunding,setManualFunding]=useState(false);
const [flutterFunding,setFlutterFunding]=useState(false);
const [paymentMethod,setPaymentMethod]=useState("instant");
const [virtualAccount,setVirtualAccount]=useState(null);
const [virtualAccountLoading,setVirtualAccountLoading]=useState(true);
const [virtualAccountCreating,setVirtualAccountCreating]=useState(false);
const [identityNumber,setIdentityNumber]=useState("");
const [copiedAccount,setCopiedAccount]=useState(false);

const toastType = message.startsWith("❌") || message.includes("error") || message.includes("valid") || message.includes("expired") ? "error" : "success";



useEffect(()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


  if(!user){
    setMessage("User session expired");
    return;
  }




fetch(
`https://api.alphabothq.com/wallet/balance/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(data=>{

if(data.balance !== undefined){

setBalance(data.balance);

}

});



fetch(
`https://api.alphabothq.com/transactions/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(data=>{

if(Array.isArray(data)){

setTransactions(data.slice(0,5));

}

  setLoading(false);
});

fetch(
"https://api.alphabothq.com/virtual-account",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(data=>{

if(data.exists && data.account){
setVirtualAccount(data.account);
}

setVirtualAccountLoading(false);

})
.catch(()=>{
setVirtualAccountLoading(false);
});


},[]);

useEffect(()=>{

let startY=0;

const handleTouchStart=(e)=>{
startY=e.touches[0].clientY;
};

const handleTouchEnd=(e)=>{
const endY=e.changedTouches[0].clientY;

if(endY-startY>100){
refreshWallet();
}
};

window.addEventListener("touchstart",handleTouchStart);
window.addEventListener("touchend",handleTouchEnd);

return()=>{
window.removeEventListener("touchstart",handleTouchStart);
window.removeEventListener("touchend",handleTouchEnd);
};

},[]);


async function refreshWallet(){

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


  if(!user){
    setMessage("User session expired");
    return;
  }


try{

const balanceRes=await fetch(`https://api.alphabothq.com/wallet/balance/${user.phone}`,{
headers:{Authorization:`Bearer ${token}`}
});

const balanceData=await balanceRes.json();

if(balanceData.balance !== undefined){
setBalance(balanceData.balance);
}

const transactionRes=await fetch(`https://api.alphabothq.com/transactions/${user.phone}`,{
headers:{Authorization:`Bearer ${token}`}
});

const transactionData=await transactionRes.json();

if(Array.isArray(transactionData)){
setTransactions(transactionData.slice(0,5));
}

}catch(error){
setMessage("Unable to refresh wallet");
}

};




const createVirtualAccount = async()=>{

const token=localStorage.getItem("token");

if(!identityNumber.trim()){
setMessage("Enter your BVN");
return;
}

try{

setVirtualAccountCreating(true);
setMessage("");

const res=await fetch(
"https://api.alphabothq.com/virtual-account/create",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
bvn:identityNumber.trim()
})
}
);

const data=await res.json();

if(!res.ok){
setMessage(data.message || "Unable to create virtual account");
setVirtualAccountCreating(false);
return;
}

if(data.account){
setVirtualAccount(data.account);
setIdentityNumber("");
setMessage("Personal account created successfully");
}

setVirtualAccountCreating(false);

}catch(error){

setMessage("Connection error");
setVirtualAccountCreating(false);

}

};

const copyVirtualAccount=async()=>{

if(!virtualAccount?.accountNumber){
return;
}

try{

await navigator.clipboard.writeText(
String(virtualAccount.accountNumber)
);

setCopiedAccount(true);

setTimeout(()=>{
setCopiedAccount(false);
},2000);

}catch(error){

setMessage("Unable to copy account number");

}

};


const fundWithFlutterwave = async()=>{

const token=localStorage.getItem("token");

try{

setFlutterFunding(true);
setMessage("");

const res = await fetch(
"https://api.alphabothq.com/flutterwave/pay",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
amount:Number(amount)
})
}
);

const data = await res.json();

if(!res.ok){
setMessage(data.message || "Flutterwave payment failed");
setFlutterFunding(false);
return;
}

if(data.data && data.data.link){
window.location.href = data.data.link;
return;
}

setMessage("Unable to open payment page");
setFlutterFunding(false);

}catch(error){

setMessage("Connection error");
setFlutterFunding(false);

}

};






const requestManualFunding = async()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));

if(!user){
setMessage("User session expired");
return;
}

try{

setManualFunding(true);
setMessage("");

const res = await fetch(
"https://api.alphabothq.com/funding/request",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
phone:user.phone,
amount:Number(amount),
reference:null
})
}
);

const data = await res.json();

setMessage(data.message || "Funding request submitted");

if(res.ok){
setAmount("");

setTimeout(()=>{
setMessage("");
},2500);
}

setManualFunding(false);

}catch(error){

setMessage("Connection error");
setManualFunding(false);

}

};

if(loading){
return(
<main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white px-5 py-8">
<div className="max-w-md mx-auto animate-pulse">
<div className="h-8 w-40 bg-zinc-200 dark:bg-zinc-800 rounded mb-6"></div>
<div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-3xl"></div>
<div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-2xl mt-6"></div>
<div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-2xl mt-4"></div>
</div>
</main>
);
}


  return(
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-white px-4 py-6 pb-28">

      <div className="max-w-md mx-auto space-y-4">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-100 via-white to-zinc-50 dark:from-zinc-900 dark:via-[#111113] dark:to-[#050505] p-5">

          <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

          <div className="relative flex items-center justify-between">

            <div>
              <p className="text-[9px] font-black tracking-[0.22em] text-yellow-400 uppercase">
                AlphaBot
              </p>

              <h1 className="text-2xl font-black mt-1">
                My Wallet
              </h1>

              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                Fund your wallet and manage your balance
              </p>
            </div>

            <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-xl">
              💳
            </div>

          </div>
        </div>


        {/* WARNING / MESSAGE — ALWAYS AT THE TOP */}
        {message && (
          <div
            className={`rounded-2xl border px-4 py-3 text-center text-xs font-bold ${
              message.startsWith("❌") ||
              message.includes("error") ||
              message.includes("valid") ||
              message.includes("expired")
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-yellow-400/10 border-yellow-400/20 text-yellow-400"
            }`}
          >
            {message}
          </div>
        )}


        {/* BALANCE */}
        <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 p-5 text-black shadow-xl shadow-yellow-400/10">

          <div className="absolute -right-10 -bottom-12 w-32 h-32 rounded-full bg-white/20 blur-2xl" />

          <div className="relative">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] opacity-60">
                  Available Balance
                </p>

                <h2 className="text-4xl font-black tracking-tight mt-2">
                  ₦{Number(balance || 0).toLocaleString("en-NG")}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center text-2xl">
                ₦
              </div>

            </div>

            <div className="flex gap-2 mt-5">

              <Link
                href="/transactions"
                className="flex-1 text-center bg-zinc-950 dark:bg-black text-white py-3 rounded-2xl text-xs font-black active:scale-95 transition"
              >
                Transaction History
              </Link>

              <button
                type="button"
                onClick={refreshWallet}
                className="w-12 bg-black/10 rounded-2xl flex items-center justify-center text-lg active:scale-90 transition"
                aria-label="Refresh wallet"
              >
                ↻
              </button>

            </div>

          </div>
        </section>


        {/* FUND WALLET */}
        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-4 space-y-4">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-500">
                Add Money
              </p>

              <h2 className="text-lg font-black mt-1">
                Fund Wallet
              </h2>

              <p className="text-[10px] text-zinc-500 mt-0.5">
                Choose how you want to fund your account
              </p>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[8px] font-black text-green-400">
              SECURE
            </span>

          </div>


          {/* AMOUNT */}
          <div>

            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-2">
              Amount
            </p>

            <div className="grid grid-cols-4 gap-2 mb-2">

              {[1000,2000,5000,10000].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(String(value))}
                  className={`rounded-xl border py-2.5 text-[10px] font-black transition active:scale-95 ${
                    String(amount) === String(value)
                      ? "border-yellow-400 bg-yellow-400 text-black"
                      : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#080809] text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  ₦{value.toLocaleString("en-NG")}
                </button>
              ))}

            </div>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">
                ₦
              </span>

              <input
                className="w-full pl-9 pr-4 py-4 rounded-2xl bg-zinc-50 dark:bg-[#080809] border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white outline-none focus:border-yellow-400/60 transition"
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

            </div>

          </div>


          {/* PAYMENT METHOD */}
          <div>

            <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500 mb-2">
              Funding Method
            </p>

            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={() => setPaymentMethod("instant")}
                className={`rounded-2xl border p-3 text-left transition active:scale-[0.98] ${
                  paymentMethod === "instant"
                    ? "border-yellow-400/60 bg-yellow-400/10"
                    : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#080809]"
                }`}
              >
                <div className="text-lg">⚡</div>

                <p className="text-xs font-black mt-1">
                  Instant
                </p>

                <p className="text-[9px] text-zinc-500 mt-0.5">
                  Pay online
                </p>
              </button>


              <button
                type="button"
                onClick={() => setPaymentMethod("manual")}
                className={`rounded-2xl border p-3 text-left transition active:scale-[0.98] ${
                  paymentMethod === "manual"
                    ? "border-yellow-400/60 bg-yellow-400/10"
                    : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#080809]"
                }`}
              >
                <div className="text-lg">🏦</div>

                <p className="text-xs font-black mt-1">
                  Bank Transfer
                </p>

                <p className="text-[9px] text-zinc-500 mt-0.5">
                  Use your account
                </p>
              </button>

            </div>

          </div>


          {/* INSTANT PAYMENT */}
          {paymentMethod === "instant" && (
            <button
              type="button"
              onClick={fundWithFlutterwave}
              disabled={flutterFunding || !amount}
              className="w-full rounded-2xl bg-yellow-400 text-black py-4 font-black text-sm active:scale-[0.98] disabled:opacity-50 transition"
            >
              {flutterFunding
                ? "Opening payment..."
                : "⚡ Fund Wallet Instantly"}
            </button>
          )}


          {/* MANUAL FUNDING */}
          {paymentMethod === "manual" && (
            <div className="space-y-3">

              {/* MANUAL BANK ACCOUNT */}
              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4">

                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-yellow-400">
                      Transfer To
                    </p>

                    <p className="text-lg font-black mt-1">
                      Moniepoint
                    </p>
                  </div>

                  <span className="px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-[8px] font-black text-green-400">
                    MANUAL
                  </span>

                </div>

                <div className="mt-3 rounded-2xl bg-zinc-50 dark:bg-[#080809] border border-zinc-200 dark:border-zinc-800 p-3">

                  <p className="text-[8px] uppercase font-black tracking-wider text-zinc-500">
                    Account Number
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-1">

                    <p className="text-2xl font-black tracking-wider">
                      9037120624
                    </p>

                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText("9037120624");
                          setMessage("Account number copied");
                        } catch {
                          setMessage("Unable to copy account number");
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-yellow-400 text-black text-[9px] font-black active:scale-95 transition"
                    >
                      Copy
                    </button>

                  </div>

                </div>

                <div className="mt-2 rounded-2xl bg-zinc-50 dark:bg-[#080809] border border-zinc-200 dark:border-zinc-800 p-3">

                  <p className="text-[8px] uppercase font-black tracking-wider text-zinc-500">
                    Account Name
                  </p>

                  <p className="text-sm font-black mt-1">
                    Marvelous Oluwasegun Ayodeji
                  </p>

                </div>

                <p className="text-[9px] text-zinc-500 mt-3 leading-relaxed">
                  Transfer the exact amount you entered above to this account,
                  then submit your funding request below.
                </p>

              </div>

              <button
                type="button"
                onClick={requestManualFunding}
                disabled={manualFunding || !amount}
                className="w-full rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-white py-4 font-black text-sm active:scale-[0.98] disabled:opacity-50 transition"
              >
                {manualFunding
                  ? "Submitting request..."
                  : "🏦 Request Manual Funding"}
              </button>

            </div>
          )}

        </section>


        {/* VIRTUAL ACCOUNT */}
        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-4">

          <div className="flex items-start justify-between gap-3">

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-yellow-400">
                Personal Account
              </p>

              <h2 className="text-lg font-black mt-1">
                Your AlphaBot Bank Account
              </h2>

              <p className="text-[10px] text-zinc-500 mt-1">
                Transfer money here and your wallet is credited automatically.
              </p>
            </div>

            <span className="px-2 py-1 rounded-lg bg-green-500/10 text-green-400 text-[8px] font-black whitespace-nowrap">
              AUTO
            </span>

          </div>


          {virtualAccountLoading ? (

            <div className="mt-4 animate-pulse space-y-2">
              <div className="h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
              <div className="h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
              <div className="h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
            </div>

          ) : virtualAccount ? (

            <div className="mt-4 space-y-2">

              <div className="rounded-2xl bg-zinc-50 dark:bg-[#080809] border border-zinc-200 dark:border-zinc-800 p-3">

                <p className="text-[8px] uppercase font-black tracking-wider text-zinc-500">
                  Bank
                </p>

                <p className="text-sm font-black mt-1">
                  {virtualAccount.bankName || "Flutterwave Bank"}
                </p>

              </div>


              <div className="rounded-2xl bg-zinc-50 dark:bg-[#080809] border border-zinc-200 dark:border-zinc-800 p-3">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[8px] uppercase font-black tracking-wider text-zinc-500">
                      Account Number
                    </p>

                    <p className="text-xl font-black tracking-wider mt-1">
                      {virtualAccount.accountNumber}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={copyVirtualAccount}
                    className="px-3 py-2 rounded-xl bg-yellow-400 text-black text-[9px] font-black active:scale-95 transition"
                  >
                    {copiedAccount ? "Copied!" : "Copy"}
                  </button>

                </div>

              </div>


              <div className="rounded-2xl bg-yellow-400/5 border border-yellow-400/10 p-3">

                <p className="text-[9px] text-yellow-400 font-bold">
                  💡 Transfer directly to this account. Your wallet balance will update automatically.
                </p>

              </div>

            </div>

          ) : (

            <div className="mt-4 rounded-2xl bg-zinc-50 dark:bg-[#080809] border border-zinc-200 dark:border-zinc-800 p-4">

              <p className="text-sm font-bold">
                Create your personal account
              </p>

              <p className="text-[10px] text-zinc-500 mt-1">
                Enter your BVN to generate your dedicated funding account.
              </p>

              <input
                type="text"
                inputMode="numeric"
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
                placeholder="Enter BVN"
                className="w-full mt-3 bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 text-sm outline-none focus:border-yellow-400/60"
              />

              <button
                type="button"
                onClick={createVirtualAccount}
                disabled={virtualAccountCreating}
                className="w-full mt-2 rounded-2xl bg-yellow-400 text-black py-3 font-black text-xs disabled:opacity-50 active:scale-[0.98] transition"
              >
                {virtualAccountCreating
                  ? "Creating account..."
                  : "Create Personal Account"}
              </button>

            </div>

          )}

        </section>


        {/* RECENT TRANSACTIONS */}
        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-4">

          <div className="flex items-center justify-between mb-3">

            <div>
              <p className="text-[9px] font-black uppercase tracking-wider text-zinc-500">
                Activity
              </p>

              <h2 className="text-lg font-black mt-1">
                Recent Transactions
              </h2>
            </div>

            <Link
              href="/transactions"
              className="text-[9px] font-black text-yellow-400"
            >
              View All →
            </Link>

          </div>


          {transactions.length === 0 ? (

            <div className="rounded-2xl bg-zinc-50 dark:bg-[#080809] border border-zinc-200 dark:border-zinc-800 p-6 text-center">

              <div className="text-2xl mb-2">
                🧾
              </div>

              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                No transactions yet
              </p>

            </div>

          ) : (

            <div className="space-y-2">

              {transactions.map((transaction, index) => (

                <div
                  key={transaction.id || transaction.reference || index}
                  className="flex items-center justify-between rounded-2xl bg-zinc-50 dark:bg-[#080809] border border-zinc-200 dark:border-zinc-800 p-3"
                >

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-9 h-9 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                      💳
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-bold truncate">
                        {transaction.description ||
                          transaction.service ||
                          transaction.type ||
                          "Transaction"}
                      </p>

                      <p className="text-[9px] text-zinc-600 mt-0.5">
                        {transaction.createdAt ||
                          transaction.date ||
                          transaction.created_at ||
                          ""}
                      </p>

                    </div>

                  </div>

                  <p className="text-xs font-black whitespace-nowrap ml-2">
                    ₦{Number(
                      transaction.amount || 0
                    ).toLocaleString("en-NG")}
                  </p>

                </div>

              ))}

            </div>

          )}

        </section>


        <Link
          href="/dashboard"
          className="block text-center text-zinc-500 text-xs py-2"
        >
          ← Dashboard
        </Link>

      </div>

    </main>
  )

}
