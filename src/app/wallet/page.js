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


useEffect(()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


if(!user) return;


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

if(!user) return;

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


try{
setFunding(true);
setMessage("");

const res=await fetch(
"https://alphabot-1.onrender.com/funding/request",
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


setMessage(data.message || "Funding request submitted. Awaiting approval");


if(data.balance !== undefined){

setBalance(data.balance);

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



<div className="mt-8 bg-gradient-to-br from-yellow-300 to-yellow-600 text-black rounded-3xl p-6">


<p className="font-semibold">
Wallet Balance
</p>


<h2 className="text-4xl font-bold mt-3">
₦{balance.toLocaleString()}
</h2>



<div className="flex gap-3 mt-6">


<Link
href="/transactions"
className="bg-white text-black px-5 py-3 rounded-xl font-bold"
>
History
</Link>


<button
className="bg-white px-5 py-3 rounded-xl font-bold"
>
Withdraw
</button>


</div>


</div>




<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Fund Wallet
</h2>

<div className="mt-4 p-4 bg-yellow-100 rounded-xl text-black">
<p className="font-bold">Send payment to:</p>
<p>Bank: Moniepoint</p>
<p>Account Number: 9037120624</p>
<p>Account Name: Marvelous Oluwasegun Ayodeji</p>
<p className="mt-2 text-sm">After payment, enter the amount sent and submit. Your wallet will be credited after confirmation.</p>
</div>



<input

className="w-full mt-5 p-3 rounded-xl bg-white dark:bg-white text-black dark:bg-black dark:text-white border border-zinc-700"

placeholder="Enter amount"

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

/>



<button

onClick={fundWallet}

className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"
disabled={funding} >

{funding ? "Processing..." : "Fund Wallet"}
</button>



<Toast message={message} type="success" />


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