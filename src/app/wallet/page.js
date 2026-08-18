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
<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8">
<div className="max-w-md mx-auto animate-pulse">
<div className="h-8 w-40 bg-zinc-300 dark:bg-zinc-800 rounded mb-6"></div>
<div className="h-40 bg-zinc-300 dark:bg-zinc-800 rounded-3xl"></div>
<div className="h-20 bg-zinc-300 dark:bg-zinc-800 rounded-2xl mt-6"></div>
<div className="h-20 bg-zinc-300 dark:bg-zinc-800 rounded-2xl mt-4"></div>
</div>
</main>
);
}


return(

<main className="min-h-screen bg-white text-black dark:bg-[#0A0A0A] dark:text-white px-4 py-8 pb-24">

<div className="max-w-md mx-auto space-y-6">


<header>

<h1 className="text-3xl font-black">
My Wallet 💳
</h1>

<p className="text-zinc-500 dark:text-zinc-400 mt-1">
Manage your AlphaBot balance
</p>

</header>




<section className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 rounded-2xl p-4 shadow-xl text-white">

<p className="text-xs text-zinc-400">
💳 AlphaBot Premium Wallet
</p>


<p className="mt-2 text-sm text-zinc-400">
Available Balance
</p>


<h2 className="text-2xl font-black mt-1">
₦{balance.toLocaleString()}
</h2>



<div className="flex gap-3 mt-4">

<Link
href="/transactions"
className="flex-1 text-center bg-zinc-800 text-white py-2.5 rounded-xl font-bold border border-zinc-700 active:scale-95 transition"
>
History
</Link>




</div>


</section>




<section className="bg-zinc-100 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5">

<h2 className="text-xl font-bold">
Fund Wallet
</h2>

<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
Add money to your wallet automatically or manually.
</p>


<div className="mt-5 bg-black rounded-2xl p-4 text-white border border-zinc-800">

<div className="flex items-start justify-between gap-3">

<div>
<p className="font-bold text-base">
🏦 Your AlphaBot Account
</p>

<p className="text-sm text-zinc-400 mt-1">
Transfer money directly to this account and your wallet will be credited automatically.
</p>
</div>

<span className="text-xs font-bold bg-green-500/10 text-green-400 px-2 py-1 rounded-lg whitespace-nowrap">
Automatic
</span>

</div>


{virtualAccountLoading ? (

<div className="mt-4 animate-pulse space-y-3">
<div className="h-12 bg-zinc-800 rounded-xl"></div>
<div className="h-12 bg-zinc-800 rounded-xl"></div>
<div className="h-12 bg-zinc-800 rounded-xl"></div>
</div>

) : virtualAccount ? (

<div className="mt-4 space-y-3">

<div className="bg-[#1A1A1E] rounded-xl p-3">

<p className="text-xs text-zinc-500 uppercase font-bold">
Bank
</p>

<p className="mt-1 font-bold">
{virtualAccount.bankName || "Flutterwave Bank"}
</p>

</div>


<div className="bg-[#1A1A1E] rounded-xl p-3">

<p className="text-xs text-zinc-500 uppercase font-bold">
Account Number
</p>

<div className="flex items-center justify-between gap-3">

<p className="mt-1 text-xl font-black tracking-wide">
{virtualAccount.accountNumber}
</p>

<button
onClick={copyVirtualAccount}
className="px-3 py-2 rounded-lg bg-zinc-800 text-xs font-bold active:scale-95 transition"
>
{copiedAccount ? "Copied ✓" : "Copy"}
</button>

</div>

</div>


<div className="bg-[#1A1A1E] rounded-xl p-3">

<p className="text-xs text-zinc-500 uppercase font-bold">
Account Name
</p>

<p className="mt-1 font-bold">
{virtualAccount.accountName || "AlphaBot User"}
</p>

</div>


<p className="text-xs text-zinc-400">
✓ Permanent account<br/>
✓ Automatic wallet funding after payment confirmation
</p>

</div>

) : (

<div className="mt-4 bg-[#1A1A1E] rounded-xl p-4">

<p className="font-bold">
Set up your personal account
</p>

<p className="text-xs text-zinc-400 mt-1">
Create your permanent AlphaBot account for automatic wallet funding.
</p>




<input
className="w-full mt-3 p-3 rounded-xl bg-black border border-zinc-700 text-white"
placeholder="Enter your BVN"
type="text"
inputMode="numeric"
value={identityNumber}
onChange={(e)=>setIdentityNumber(e.target.value)}
/>


<button
onClick={createVirtualAccount}
disabled={virtualAccountCreating || !identityNumber.trim()}
className="w-full mt-3 py-3 rounded-xl bg-white text-black font-bold disabled:opacity-50 active:scale-95 transition"
>
{virtualAccountCreating ? "Creating Account..." : "Create Personal Account"}
</button>

</div>

)}

</div>


<p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mt-6">
Other Funding Options
</p>


<label className="block mt-4 text-xs font-bold text-zinc-500 uppercase">
Funding Amount (₦)
</label>


<input

className="w-full mt-2 p-3.5 rounded-xl bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 text-black dark:text-white"

placeholder="Enter amount"

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

/>



{(!amount || Number(amount)<=0) && (

<p className="text-sm text-red-500 mt-2">
Enter a valid amount to continue
</p>

)}


<div className="grid grid-cols-2 mt-5 p-1 bg-zinc-200 dark:bg-black rounded-xl">


<button
onClick={()=>setPaymentMethod("instant")}
className={`py-3 rounded-xl text-sm font-bold active:scale-95 transition ${
paymentMethod==="instant"
?"bg-white dark:bg-zinc-800 shadow"
:"text-zinc-500"
}`}
>
⚡ Instant Pay
</button>



<button
onClick={()=>setPaymentMethod("manual")}
className={`py-3 rounded-xl text-sm font-bold active:scale-95 transition ${
paymentMethod==="manual"
?"bg-white dark:bg-zinc-800 shadow"
:"text-zinc-500"
}`}
>
🏦 Manual Funding
</button>


</div>





{paymentMethod==="instant" ? (

<div className="mt-5 bg-black rounded-2xl p-4 text-white">

<p className="font-bold">
⚡ Flutterwave
</p>


<p className="text-sm text-zinc-400 mt-2">
Secure payment and automatic wallet credit.
</p>


<button

onClick={fundWithFlutterwave}

disabled={flutterFunding || !amount || Number(amount)<=0}

className="w-full mt-4 py-3 rounded-xl bg-white text-black font-bold disabled:opacity-50 active:scale-95 transition"

>

{flutterFunding ? "Processing..." : "Pay with Flutterwave"}

</button>


</div>


) : (


<div className="mt-5 bg-black rounded-2xl p-4 text-white">


<p className="font-bold">
🏦 Manual Funding
</p>



<div className="mt-3 bg-[#1A1A1E] rounded-xl p-3 text-sm">

<p>Bank: Moniepoint</p>

<p>Account Number: 9037120624</p>

<p>Name: Marvelous Oluwasegun Ayodeji</p>

</div>



<p className="text-xs text-zinc-400 mt-3">
Wallet will be credited after approval.
</p>



<button

onClick={requestManualFunding}

disabled={manualFunding || !amount || Number(amount)<=0}

className="w-full mt-4 py-3 rounded-xl bg-yellow-400 text-black font-bold disabled:opacity-50 active:scale-95 transition"

>

{manualFunding ? "Processing..." : "Confirm Manual Transfer"}

</button>


</div>


)}



<Toast message={message} type={toastType} />


</section>


</div>


<BottomNav />


</main>

);

}
