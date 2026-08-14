"use client";

import {useEffect,useState} from "react";

export default function AdminTransactions(){

const [transactions,setTransactions]=useState([]);
const [search,setSearch]=useState("");
const [type,setType]=useState("");


useEffect(()=>{

const load=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://api.alphabothq.com/admin/transactions",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setTransactions(data);

};

load();

},[]);



const filtered=transactions.filter(tx=>

(tx.phone||"").includes(search)

&&

(type==="" || tx.type===type)

);



return(

<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
📜 Transactions
</h1>


<input
className="border border-zinc-800 p-2 mt-4"
placeholder="Search phone"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>


<select
className="border border-zinc-800 p-2 ml-2"
value={type}
onChange={(e)=>setType(e.target.value)}
>

<option value="">
All Types
</option>

<option value="credit">
Credit
</option>

<option value="debit">
Debit
</option>

<option value="admin_credit">
Admin Credit
</option>

<option value="admin_debit">
Admin Debit
</option>

</select>



<div className="mt-5">

{filtered.map(tx=>(

<div
key={tx._id}
className="border border-zinc-800 rounded-3xl p-4 mb-3"
>

<a
href={`/admin/users/${tx.phone}`}
className="underline"
>
👤 {tx.userName || "Unknown User"}
</a>

<p>
📱 {tx.phone}
</p>

<p>
Type: {tx.type}
</p>

<p>
Amount: ₦{tx.amount}
</p>

<p>
Status: {tx.status || "completed"}
</p>

<p>
Date: {
tx.createdAt
? new Date(tx.createdAt).toLocaleString()
:"Unknown"
}
</p>


</div>

))}


</div>


</div>

);

}
