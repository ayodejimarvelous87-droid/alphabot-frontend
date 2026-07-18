"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Wallet(){

const [amount,setAmount]=useState("");
const [balance,setBalance]=useState(0);
const [transactions,setTransactions]=useState([]);
const [message,setMessage]=useState("");


useEffect(()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


if(!user) return;


fetch(
`https://alphabot-i7p2.onrender.com/wallet/balance/${user.phone}`,
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
`https://alphabot-i7p2.onrender.com/transactions/${user.phone}`,
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

});


},[]);



const fundWallet=async()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


try{

const res=await fetch(
"https://alphabot-i7p2.onrender.com/wallet/fund",
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


if(data.balance !== undefined){

setBalance(data.balance);

}


}catch(error){

setMessage("Connection error");

}

};



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

>
Fund Wallet
</button>



<p className="text-center text-zinc-400 mt-4">
{message}
</p>


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