"use client";

import {useState} from "react";
import Link from "next/link";

export default function AdminDashboard(){

const [pricing,setPricing]=useState({
airtimeProfit:20,
dataProfit:50,
electricityProfit:50,
tvProfit:50,
examPinProfit:50,
bettingProfit:20
});

const [message,setMessage]=useState("");

const savePricing=async()=>{

try{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://alphabot-2.onrender.com/admin/pricing-settings",
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
res.ok ? "✅ Saved" : "❌ "+data.message
);

}catch(error){

setMessage("❌ Connection error");

}

};


return(
<div style={{padding:"30px"}}>

<h1>👑 AlphaBot Admin Panel</h1>

<p>
Manage AlphaBot users, wallets, transactions and services.
</p>


<div style={{display:"grid",gap:"15px",marginTop:"30px"}}>

<Link href="/admin/users">👥 Users</Link>

<Link href="/admin/wallets">💰 Wallet Management</Link>

<Link href="/admin/transactions">📜 Transactions</Link>

<Link href="/admin/withdrawals">💸 Withdrawals</Link>

</div>


<hr style={{margin:"30px 0"}}/>


<h2>⚙️ Service Pricing</h2>

{
Object.keys(pricing).map(key=>(

<div key={key} style={{marginTop:"10px"}}>

<label>{key}</label>

<input
type="number"
value={pricing[key]}
onChange={(e)=>
setPricing({
...pricing,
[key]:e.target.value
})
}
style={{
display:"block",
padding:"8px",
marginTop:"5px"
}}
/>

</div>

))
}


<button
onClick={savePricing}
style={{
marginTop:"20px",
padding:"10px 20px"
}}
>
Save Pricing
</button>


<p>{message}</p>


</div>
);

}
