"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function Transactions(){

const [transactions,setTransactions]=useState([]);


useEffect(()=>{

const token=localStorage.getItem("token");
const user=JSON.parse(localStorage.getItem("user"));


if(!user) return;


fetch(
`https://alphabot-main.onrender.com/transactions/${user.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(data=>{

if(Array.isArray(data)){

setTransactions(data);

}

});


},[]);



return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto">


<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold">
Transactions 📜
</h1>


<p className="text-zinc-400 mt-2">
View your wallet activities
</p>


</div>


<Link
href="/dashboard"
className="text-yellow-400"
>
Home
</Link>


</div>




<div className="mt-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-6">


<h2 className="text-xl font-bold">
Transaction History
</h2>



{

transactions.length === 0 ?

<p className="text-zinc-400 mt-5">
No transactions yet
</p>


:

<div className="mt-5 space-y-4">


{

transactions.map((item,index)=>(


<div
key={index}
className="bg-white dark:bg-black rounded-xl p-4"
>


<div className="flex justify-between">


<div>

<p className="font-bold">
{item.description || item.type}
</p>


<p className="text-xs text-zinc-500 mt-1">
{item.status}
</p>


</div>



<p className={`font-bold ${
item.direction==="credit"
?"text-green-400"
:"text-red-400"
}`}>

{item.direction==="credit" ? "+" : "-"}
₦{item.amount}

</p>


</div>



<p className="text-xs text-zinc-500 mt-3">
{item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
</p>


{

item.reference &&

<p className="text-xs text-zinc-500">
Ref: {item.reference}
</p>

}



</div>


))

}


</div>

}


</div>




<div className="mt-6 bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-5">


<h3 className="font-bold">
Transaction Types
</h3>


<ul className="text-zinc-400 mt-3 space-y-2">

<li>💰 Wallet funding</li>
<li>📱 Airtime purchase</li>
<li>🌐 Data purchase</li>
<li>⚡ Bill payments</li>
<li>🎁 Referral earnings</li>

</ul>


</div>



</div>


<BottomNav />


</main>

);

}
