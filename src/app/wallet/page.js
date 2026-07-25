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
const [funding,setFunding]=useState(false);
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




const fundWallet=async()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


  if(!user){
    setMessage("User session expired");
    return;
  }


try{
setFunding(true);
setMessage("");

const res=await fetch(
"https://alphabot-1.onrender.com/wallet/fund",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({

phone:user.phone,
amount:Number(amount)

})
}
);


const data=await res.json();


setMessage(data.message || "Wallet funded successfully");

if(!res.ok){
  setFunding(false);
  return;
}

if(data.balance !== undefined){
  setBalance(data.balance);
}

await refreshWallet();

setAmount("");
setFunding(false);
}catch(error){

setMessage("Connection error");

setFunding(false);
}

};

const fundWithFlutterwave = async()=>{

const token=localStorage.getItem("token");

try{

setFunding(true);
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
setFunding(false);
return;
}

if(data.data && data.data.link){
window.location.href = data.data.link;
return;
}

setMessage("Unable to open payment page");
setFunding(false);

}catch(error){

setMessage("Connection error");
setFunding(false);

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

setFunding(true);
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

setFunding(false);

}catch(error){

setMessage("Connection error");
setFunding(false);

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

<div className="mt-4 p-4 bg-yellow-100 rounded-xl text-black">
<p className="font-bold">Manual Funding</p>
<p className="mt-2 text-sm">Below ₦2,000 - No Flutterwave charges.</p>
<p className="mt-2 text-sm">Send payment manually and wait for approval.</p>
</div>

<div className="mt-5 p-4 bg-blue-100 rounded-xl text-black">
<p className="font-bold">Flutterwave Instant Funding</p>
<p className="mt-2 text-sm">₦2,000 and above - Automatic wallet credit.</p>
</div>

<input
className="w-full mt-5 p-3 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-white placeholder:text-zinc-400 border border-zinc-700"
placeholder="Enter amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<button
onClick={Number(amount) >= 2000 ? fundWithFlutterwave : requestManualFunding}
className={`w-full mt-5 py-3 rounded-xl font-bold ${
funding || !amount || Number(amount) <= 0
? "bg-zinc-400 text-zinc-700 cursor-not-allowed"
: "bg-yellow-400 text-black"
}`}
disabled={funding || !amount || Number(amount) <= 0}>

{funding ? "Processing..." : Number(amount) >= 2000 ? "Pay with Flutterwave" : "Request Manual Funding"}

</button>



<Toast message={message} type={toastType} />


</div>




<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">


<h2 className="font-bold text-xl">
Recent Wallet Activity
</h2>


{

transactions.length === 0 ?

<p className="text-zinc-400 mt-4">
No transactions yet
</p>

:

<div className="mt-4 space-y-3">

{
transactions.map((item,index)=>(

<div
key={index}
className="bg-white dark:bg-black rounded-xl p-3 flex justify-between"
>


<div>

<p className="font-semibold">
{item.description || item.type}
</p>

<p className="text-xs text-zinc-500">
{item.status}
</p>

</div>


<p className="font-bold text-yellow-400">
₦{item.amount}
</p>


</div>

))
}

</div>

}


</div>




</div>


<BottomNav />


</main>

);

}