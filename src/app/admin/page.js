"use client";

import {useEffect,useState} from "react";
import Link from "next/link";

const API="https://alphabot-1.onrender.com";

export default function AdminDashboard(){

const [stats,setStats]=useState({
users:0,
wallets:0,
transactions:0,
orders:0,
notifications:0
});

const [pricing,setPricing]=useState({
airtimeProfit:20,
dataProfit:50,
electricityProfit:50,
tvProfit:50,
examPinProfit:50,
bettingProfit:20
});

const [message,setMessage]=useState("");
const [loading,setLoading]=useState(true);


useEffect(()=>{

const load=async()=>{

try{

const token=localStorage.getItem("adminToken");

const headers={
Authorization:`Bearer ${token}`
};


const [
users,
wallets,
transactions,
orders,
notifications
]=await Promise.all([

fetch(`${API}/admin/users`,{headers}).then(r=>r.json()),

fetch(`${API}/admin/wallets`,{headers}).then(r=>r.json()),

fetch(`${API}/admin/transactions`,{headers}).then(r=>r.json()),

fetch(`${API}/admin/orders`,{headers}).then(r=>r.json()),

fetch(`${API}/admin/notifications`,{headers}).then(r=>r.json())

]);


setStats({

users:Array.isArray(users)?users.length:0,

wallets:Array.isArray(wallets)?wallets.length:0,

transactions:Array.isArray(transactions)?transactions.length:0,

orders:Array.isArray(orders)?orders.length:0,

notifications:Array.isArray(notifications)?notifications.length:0

});


}catch(error){

console.log(error);

}finally{

setLoading(false);

}

};


load();

},[]);



const savePricing=async()=>{

try{

const token=localStorage.getItem("adminToken");

const res=await fetch(
`${API}/admin/pricing-settings`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify(pricing)
}
);


const data=await res.json();

setMessage(
res.ok
?"✅ Pricing saved"
:"❌ "+data.message
);


}catch(error){

setMessage("❌ Connection error");

}

};



return(

<main className="min-h-screen bg-black text-white p-6 pb-24">

<div className="max-w-5xl mx-auto">

<h1 className="text-4xl font-black">
👑 AlphaBot Admin
</h1>

<p className="text-zinc-400 mt-2">
Platform control dashboard
</p>


<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">


{[
["👥 Users",stats.users],
["💰 Wallets",stats.wallets],
["📜 Transactions",stats.transactions],
["📦 Orders",stats.orders],
["🔔 Notifications",stats.notifications]

].map(item=>(

<div
key={item[0]}
className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
>

<p className="text-sm text-zinc-400">
{item[0]}
</p>

<h2 className="text-3xl font-bold mt-3">
{loading?"...":item[1]}
</h2>

</div>

))}


</div>



<div className="grid gap-3 mt-10">


<Link className="bg-zinc-900 p-4 rounded-2xl" href="/admin/users">
👥 Users
</Link>


<Link className="bg-zinc-900 p-4 rounded-2xl" href="/admin/wallets">
💰 Wallet Management
</Link>


<Link className="bg-zinc-900 p-4 rounded-2xl" href="/admin/transactions">
📜 Transactions
</Link>


<Link className="bg-zinc-900 p-4 rounded-2xl" href="/admin/withdrawals">
💸 Withdrawals
</Link>


</div>



<div className="mt-10 bg-zinc-900 rounded-3xl p-6">

<h2 className="text-2xl font-bold">
⚙️ Service Pricing
</h2>


{Object.keys(pricing).map(key=>(

<div key={key} className="mt-4">

<label className="text-zinc-400">
{key}
</label>

<input
className="w-full mt-2 p-3 rounded-xl bg-black border border-zinc-700"
type="number"
value={pricing[key]}
onChange={(e)=>
setPricing({
...pricing,
[key]:e.target.value
})
}
/>

</div>

))}


<button
onClick={savePricing}
className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
>
Save Pricing
</button>


<p className="mt-3">
{message}
</p>


</div>


</div>

</main>

);

}
