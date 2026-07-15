"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard(){

const [user,setUser]=useState(null);
const [balance,setBalance]=useState(0);



useEffect(()=>{

const token=localStorage.getItem("token");
const saved=localStorage.getItem("user");


if(!token){
window.location.href="/login";
return;
}


if(saved){

const data=JSON.parse(saved);

setUser(data);


fetch(
`https://alphabot-i7p2.onrender.com/wallet/balance/${data.phone}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)
.then(res=>res.json())
.then(wallet=>{

if(wallet.balance !== undefined){
setBalance(wallet.balance);
}

});


}


},[]);



const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

window.location.href="/login";

};



return(

<main className="min-h-screen bg-black text-white px-6 py-8">


<div className="flex justify-between items-center">

<div>

<h1 className="text-3xl font-bold">
Hello, {user?.name || "User"}
</h1>

<p className="text-zinc-400">
{user?.phone}
</p>

</div>


<button
onClick={logout}
className="border border-zinc-700 px-4 py-2 rounded-xl"
>
Logout
</button>


</div>



<div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

<p className="text-zinc-400">
Wallet Balance
</p>

<h2 className="text-4xl font-bold text-yellow-400 mt-2">
₦{balance.toLocaleString()}
</h2>


<Link
href="/wallet"
className="inline-block mt-5 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
>
Fund Wallet
</Link>


</div>




<h2 className="text-2xl font-bold mt-10">
Quick Services
</h2>



<div className="grid grid-cols-2 gap-4 mt-5">


<Link
href="#"
className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800"
>
📱 Airtime
</Link>


<Link
href="#"
className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800"
>
🌐 Data
</Link>


<Link
href="#"
className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800"
>
💳 Transactions
</Link>


<Link
href="#"
className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800"
>
⚙️ Profile
</Link>


</div>



</main>

)

}
