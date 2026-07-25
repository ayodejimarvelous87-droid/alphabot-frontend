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
const toastType = message.startsWith("❌") || message.includes("error") || message.includes("valid") || message.includes("expired") ? "error" : "success";



useEffect(()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


  if(!user){
    setMessage("User session expired");
    return;
  }




fetch(
`https://alphabot-1.onrender.com/wallet/balance/${user.phone}`,
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
`https://alphabot-1.onrender.com/transactions/${user.phone}`,
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

const balanceRes=await fetch(`https://alphabot-1.onrender.com/wallet/balance/${user.phone}`,{
headers:{Authorization:`Bearer ${token}`}
});

const balanceData=await balanceRes.json();

if(balanceData.balance !== undefined){
setBalance(balanceData.balance);
}

const transactionRes=await fetch(`https://alphabot-1.onrender.com/transactions/${user.phone}`,{
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




const fundWithFlutterwave = async()=>{

const token=localStorage.getItem("token");

try{

setFlutterFunding(true);
setMessage("");

const res = await fetch(
"https://alphabot-1.onrender.com/flutterwave/pay",
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
"https://alphabot-1.onrender.com/funding/request",
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

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
My Wallet 💳
</h1>


<p className="text-zinc-400 mt-2">
Manage your AlphaBot balance
</p>



  <div className="mt-8 bg-gradient-to-br from-yellow-300 to-yellow-600 text-black rounded-2xl p-4">


<p className="font-semibold">
Wallet Balance
</p>


  <h2 className="text-2xl font-bold mt-2">
₦{balance.toLocaleString()}
</h2>



<div className="flex gap-3 mt-6">


<Link
href="/transactions"
className="bg-white text-black px-5 py-3 rounded-xl font-bold"
>
History
</Link>


<Link
href="/withdraw"
className="bg-white px-5 py-3 rounded-xl font-bold"
>
Withdraw
</Link>


</div>


</div>




<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Fund Wallet
</h2>

<label className="block mt-5 font-semibold text-sm">
Funding Amount (₦)
</label>

<input
className="w-full mt-2 p-3 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-white placeholder:text-zinc-400 border border-zinc-700"
placeholder="Enter amount e.g 5000"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

{(!amount || Number(amount)<=0) && (
<p className="mt-2 text-sm text-red-500">
Enter a valid amount to continue
</p>
)}

<div className="mt-5 p-4 bg-yellow-100 rounded-xl text-black">
<p className="font-bold">🏦 Manual Funding</p>
<p className="mt-2 text-sm">
Transfer funds to AlphaBot account.
</p>

<div className="mt-3 p-3 bg-white rounded-xl">
<p className="font-bold">Account Details</p>
<p>Bank: Moniepoint</p>
<p>Account Number: 9037120624</p>
<p>Name: Marvelous Oluwasegun Ayodeji</p>
</div>

<p className="mt-3 text-sm">
Your wallet will be credited after admin approval.
</p>

<p className="mt-2 text-sm font-semibold">
Didn't get approval within 5 minutes? Contact us on WhatsApp for assistance.
</p>

<button
onClick={requestManualFunding}
disabled={manualFunding || !amount || Number(amount)<=0}
className="w-full mt-4 py-3 rounded-xl font-bold bg-yellow-400 text-black active:scale-95 transition disabled:opacity-50">
{manualFunding ? "Processing..." : "Continue Manual Funding"}
</button>

</div>


<div className="mt-5 p-4 bg-blue-100 rounded-xl text-black">
<p className="font-bold">⚡ Flutterwave Instant Payment</p>
<p className="mt-2 text-sm">
Pay securely through Flutterwave.
</p>
<p className="mt-2 text-sm">
Wallet is credited automatically after successful payment.
</p>

<button
onClick={fundWithFlutterwave}
disabled={flutterFunding || !amount || Number(amount)<=0}
className="w-full mt-4 py-3 rounded-xl font-bold bg-blue-500 text-white active:scale-95 transition disabled:opacity-50">
{flutterFunding ? "Processing..." : "Pay with Flutterwave"}
</button>

</div>



<Toast message={message} type={toastType} />


</div>









</div>


<BottomNav />


</main>

);

}