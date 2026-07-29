"use client";

import {useState} from "react";

export default function AdminWallets(){

const [phone,setPhone]=useState("");
const [wallet,setWallet]=useState(null);
const [amount,setAmount]=useState("");
const [reason,setReason]=useState("");
const [message,setMessage]=useState("");


const token=()=>localStorage.getItem("adminToken");


const searchWallet=async()=>{

const res=await fetch(
`https://alphabot-1.onrender.com/admin/wallet/${phone}`,
{
headers:{
Authorization:`Bearer ${token()}`
}
}
);

const data=await res.json();

if(res.ok){
setWallet(data);
}else{
setMessage(data.message);
}

};



const action=async(type)=>{

const res=await fetch(
`https://alphabot-1.onrender.com/admin/wallet/${type}`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token()}`
},
body:JSON.stringify({
phone,
amount,
reason
})
}
);


const data=await res.json();

setMessage(data.message);

if(data.wallet){
setWallet(data.wallet);
}

};



return(

<div className="p-6">

<h1 className="text-2xl font-bold">
💰 Wallet Control
</h1>


<input
className="border p-2 mt-4"
placeholder="User phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>


<button
className="bg-black text-white px-4 py-2 ml-2 rounded"
onClick={searchWallet}
>
Search
</button>


{wallet && (

<div className="border rounded-xl p-5 mt-5">

<h2 className="font-bold">
Wallet Found
</h2>


<p>
Phone: {wallet.phone}
</p>


<p className="text-xl">
Balance: ₦{Number(wallet.balance || 0).toLocaleString()}
</p>


<input
className="border p-2 block mt-3"
placeholder="Amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>


<input
className="border p-2 block mt-3"
placeholder="Reason"
value={reason}
onChange={(e)=>setReason(e.target.value)}
/>


<button
className="bg-green-600 text-white px-4 py-2 mt-3 mr-2 rounded"
onClick={()=>action("add")}
>
Add Funds
</button>


<button
className="bg-red-600 text-white px-4 py-2 mt-3 rounded"
onClick={()=>{
if(confirm("Are you sure you want to deduct this amount?")){
action("deduct");
}
}}
>
Deduct Funds
</button>


</div>

)}


<p className="mt-4">
{message}
</p>


</div>

);

}
